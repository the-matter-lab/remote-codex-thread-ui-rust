import {
  validateViewerRequest,
  validateViewerAcknowledgement,
  type ExtensionDiscovery,
  type JsonValue,
  type ScientificTarget,
  type ViewerAcknowledgement,
  type ViewerRequest,
} from '@remote-codex/shared';

export type ViewerStyle =
  | 'ball-stick'
  | 'stick'
  | 'spacefill'
  | 'cartoon'
  | 'surface';
export type ViewerAnnotation = { id: string; text: string; atomId: string };
export type ViewerCommand =
  | { type: 'selection'; selectedIds: string[] }
  | { type: 'style'; style: ViewerStyle }
  | { type: 'camera'; view: number[] }
  | { type: 'annotations'; annotations: ViewerAnnotation[] }
  | { type: 'unit-cell'; visible: boolean };

export function sameScientificTarget(
  a: ScientificTarget | undefined,
  b: ScientificTarget | undefined,
): boolean {
  return Boolean(
    a &&
    b &&
    [
      'artifactId',
      'objectId',
      'sourceRevision',
      'checksum',
      'streamId',
      'frameId',
      'frameIndex',
    ].every(
      (key) =>
        a[key as keyof ScientificTarget] === b[key as keyof ScientificTarget],
    ),
  );
}

export function validateViewerCommands(
  value: unknown,
  atomIds: string[],
  styles: ViewerStyle[],
): ViewerCommand[] {
  if (!Array.isArray(value) || value.length > 128)
    throw new Error('Command batch must contain at most 128 commands');
  const ids = new Set(atomIds);
  return value.map((raw) => {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw))
      throw new Error('Invalid viewer command');
    const cmd = raw as Record<string, unknown>;
    const keys: Record<string, string[]> = {
      selection: ['type', 'selectedIds'],
      style: ['type', 'style'],
      camera: ['type', 'view'],
      annotations: ['type', 'annotations'],
      'unit-cell': ['type', 'visible'],
    };
    if (
      typeof cmd.type !== 'string' ||
      !keys[cmd.type] ||
      Object.keys(cmd).some((key) => !keys[cmd.type as string]!.includes(key))
    )
      throw new Error('Unsupported viewer command');
    switch (cmd.type) {
      case 'selection':
        if (
          !Array.isArray(cmd.selectedIds) ||
          cmd.selectedIds.length > 10000 ||
          cmd.selectedIds.some(
            (id) => typeof id !== 'string' || !ids.has(id),
          ) ||
          new Set(cmd.selectedIds).size !== cmd.selectedIds.length
        )
          throw new Error('Selection refers to invalid atoms');
        break;
      case 'style':
        if (!styles.includes(cmd.style as ViewerStyle))
          throw new Error('Unsupported representation');
        break;
      case 'camera':
        if (
          !Array.isArray(cmd.view) ||
          cmd.view.length !== 8 ||
          cmd.view.some(
            (v) =>
              typeof v !== 'number' || !Number.isFinite(v) || Math.abs(v) > 1e9,
          ) ||
          cmd.view.slice(4).every((value) => value === 0)
        )
          throw new Error('Invalid camera');
        break;
      case 'unit-cell':
        if (typeof cmd.visible !== 'boolean')
          throw new Error('Invalid cell visibility');
        break;
      case 'annotations':
        if (
          !Array.isArray(cmd.annotations) ||
          cmd.annotations.length > 256 ||
          cmd.annotations.some(
            (a) =>
              !a ||
              typeof a !== 'object' ||
              Object.keys(a).some(
                (k) => !['id', 'text', 'atomId'].includes(k),
              ) ||
              typeof a.id !== 'string' ||
              !a.id ||
              a.id.length > 160 ||
              typeof a.text !== 'string' ||
              a.text.length > 1024 ||
              !ids.has(a.atomId),
          ) ||
          new Set(cmd.annotations.map((a) => a.id)).size !==
            cmd.annotations.length
        )
          throw new Error('Invalid annotations');
        break;
    }
    return structuredClone(cmd) as ViewerCommand;
  });
}

/** The executor receives reviewed data commands, never source or a viewer object. */
export function createViewerCommandExecutor(
  getState: () => {
    target?: ScientificTarget;
    discovery?: ExtensionDiscovery;
    atomIds: string[];
    styles: ViewerStyle[];
    ready: boolean;
    cellAvailable?: boolean;
  },
  apply: (commands: ViewerCommand[]) => void | Promise<void>,
) {
  const history = new Map<
    string,
    { request: string; acknowledgement: Promise<ViewerAcknowledgement> }
  >();
  let applying = false;
  return async (request: ViewerRequest): Promise<ViewerAcknowledgement> => {
    const state = getState();
    const reject = (code: string, message: string): ViewerAcknowledgement => ({
      version: 1,
      requestId: request.requestId,
      operationId: request.operationId,
      actionId: request.actionId,
      target: request.target,
      status: 'rejected',
      error: { code, message },
    });
    if (!sameScientificTarget(state.target, request.target))
      return reject(
        'STALE_TARGET',
        'The source revision or inspected frame has changed.',
      );
    if (!state.ready)
      return reject('VIEWER_UNAVAILABLE', 'The target is not rendered.');
    if (!state.discovery)
      return reject(
        'UNSUPPORTED_CAPABILITY',
        'Viewer actions are not advertised.',
      );
    const identity = JSON.stringify(request);
    const previous = history.get(request.operationId);
    if (previous)
      return previous.request === identity
        ? previous.acknowledgement
        : reject(
            'OPERATION_CONFLICT',
            'Operation identity was reused with different input.',
          );
    let commands: ViewerCommand[], acknowledgement: ViewerAcknowledgement;
    try {
      validateViewerRequest(request, state.discovery);
      if (
        state.discovery.actions.find((action) => action.id === request.actionId)
          ?.execution !== 'browser'
      )
        return reject(
          'UNSUPPORTED_CAPABILITY',
          'Native actions must be submitted to the host.',
        );
      const payload = request.payload as Record<string, JsonValue>;
      commands = validateViewerCommands(
        request.actionId === 'elagente.viewer.style'
          ? [{ type: 'style', style: payload.style }]
          : payload.commands,
        state.atomIds,
        state.styles,
      );
      if (
        commands.some(
          (command) => command.type === 'unit-cell' && command.visible,
        ) &&
        state.cellAvailable === false
      )
        return reject(
          'UNSUPPORTED_CAPABILITY',
          'This structure has no unit cell.',
        );
      acknowledgement = {
        version: 1,
        requestId: request.requestId,
        operationId: request.operationId,
        actionId: request.actionId,
        target: structuredClone(request.target),
        status: 'applied',
        result: {},
      };
      validateViewerAcknowledgement(acknowledgement, request, state.discovery);
    } catch (error) {
      return reject(
        'INVALID_VIEWER_ACTION',
        error instanceof Error ? error.message : String(error),
      );
    }
    if (applying)
      return reject(
        'VIEWER_BUSY',
        'Another viewer command is still rendering.',
      );
    if (history.size >= 128)
      return reject(
        'VIEWER_QUOTA_EXCEEDED',
        'This viewer has reached its command operation quota.',
      );
    applying = true;
    // Publish the promise before executing, so duplicate in-flight requests share
    // completion. Retain failures too: a failed renderer must not replay effects.
    const completion = Promise.resolve().then(async () => {
      try {
        if (
          !sameScientificTarget(getState().target, request.target) ||
          !getState().ready
        )
          return reject(
            'STALE_TARGET',
            'The inspected target changed before rendering.',
          );
        await apply(commands);
        if (
          !sameScientificTarget(getState().target, request.target) ||
          !getState().ready
        )
          return reject(
            'STALE_TARGET',
            'The inspected target changed during rendering.',
          );
        return acknowledgement;
      } catch (error) {
        return reject(
          'VIEWER_RENDER_FAILED',
          error instanceof Error ? error.message : String(error),
        );
      } finally {
        applying = false;
      }
    });
    history.set(request.operationId, {
      request: identity,
      acknowledgement: completion,
    });
    return completion;
  };
}

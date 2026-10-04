import {
  validateViewerRequest,
  validateViewerAcknowledgement,
  type ExtensionDiscovery,
  type JsonValue,
  type ScientificTarget,
  type ViewerAcknowledgement,
  type ViewerRequest,
  type ActionDefinition,
} from '@remote-codex/shared';

/** Reviewed data schema; the native adapter advertises the same versioned action. */
export const VIEWER_COMMAND_BATCH_ACTION: ActionDefinition = {
  id: 'elagente.viewer.command-batch',
  label: 'Apply viewer commands',
  execution: 'browser',
  completion: 'applied',
  inputSchema: {
    type: 'object',
    additionalProperties: false,
    required: ['version', 'commands'],
    properties: {
      version: { type: 'integer', minimum: 1, maximum: 1 },
      commands: {
        type: 'array',
        maxItems: 128,
        items: {
          type: 'object',
          additionalProperties: false,
          required: ['type'],
          properties: {
            type: {
              type: 'string',
              enum: [
                'selection',
                'camera',
                'annotations',
                'style',
                'unit-cell',
              ],
            },
            selectedIds: {
              type: 'array',
              maxItems: 10000,
              items: { type: 'string', maxLength: 160 },
            },
            color: { type: 'string', maxLength: 32 },
            radius: { type: 'number', minimum: 0, maximum: 1000 },
            view: {
              type: 'array',
              maxItems: 8,
              items: { type: 'number', minimum: -1e9, maximum: 1e9 },
            },
            style: {
              type: 'string',
              enum: ['ball-stick', 'stick', 'spacefill', 'surface', 'cartoon'],
            },
            visible: { type: 'boolean' },
            annotations: {
              type: 'array',
              maxItems: 256,
              items: {
                type: 'object',
                additionalProperties: false,
                required: ['id', 'text', 'atomId'],
                properties: {
                  id: { type: 'string', maxLength: 160 },
                  text: { type: 'string', maxLength: 1024 },
                  atomId: { type: 'string', maxLength: 160 },
                  color: { type: 'string', maxLength: 32 },
                },
              },
            },
          },
        },
      },
    },
  },
  resultSchema: {
    type: 'object',
    additionalProperties: false,
    required: ['commandCount', 'durationMs'],
    properties: {
      commandCount: { type: 'integer', minimum: 0, maximum: 128 },
      durationMs: { type: 'integer', minimum: 0 },
    },
  },
};

export type ViewerStyle =
  | 'ball-stick'
  | 'stick'
  | 'spacefill'
  | 'cartoon'
  | 'surface';
export type ViewerAnnotation = {
  id: string;
  text: string;
  atomId: string;
  color?: string;
};
export type ViewerCommand =
  | {
      type: 'selection';
      selectedIds: string[];
      color?: string;
      radius?: number;
    }
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
  const validColor = (value: unknown) =>
    typeof value === 'string' &&
    (/^#[0-9a-fA-F]{6}$/.test(value) ||
      [
        'black',
        'white',
        'red',
        'green',
        'blue',
        'yellow',
        'orange',
        'purple',
        'cyan',
        'magenta',
        'gray',
        'grey',
      ].includes(value));
  return value.map((raw) => {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw))
      throw new Error('Invalid viewer command');
    const cmd = raw as Record<string, unknown>;
    const keys: Record<string, string[]> = {
      selection: ['type', 'selectedIds', 'color', 'radius'],
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
        if (
          (cmd.color !== undefined && !validColor(cmd.color)) ||
          (cmd.radius !== undefined &&
            (typeof cmd.radius !== 'number' ||
              !Number.isFinite(cmd.radius) ||
              cmd.radius <= 0 ||
              cmd.radius > 1000))
        )
          throw new Error('Invalid selection color or radius');
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
                (k) => !['id', 'text', 'atomId', 'color'].includes(k),
              ) ||
              typeof a.id !== 'string' ||
              !a.id ||
              a.id.length > 160 ||
              typeof a.text !== 'string' ||
              a.text.length > 1024 ||
              (a.color !== undefined && !validColor(a.color)) ||
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
    // Detach the in-flight fence and commands from mutable transport objects.
    request = structuredClone(request);
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
        ? structuredClone(await previous.acknowledgement)
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
      if (
        request.actionId === VIEWER_COMMAND_BATCH_ACTION.id &&
        payload.version !== 1
      )
        throw new Error('Unsupported viewer command batch version');
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
        result:
          request.actionId === VIEWER_COMMAND_BATCH_ACTION.id
            ? { commandCount: commands.length, durationMs: 0 }
            : {},
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
      const startedAt = performance.now();
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
        if (request.actionId === VIEWER_COMMAND_BATCH_ACTION.id)
          acknowledgement.result = {
            commandCount: commands.length,
            durationMs: Math.max(0, Math.round(performance.now() - startedAt)),
          };
        validateViewerAcknowledgement(
          acknowledgement,
          request,
          state.discovery!,
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
    return structuredClone(await completion);
  };
}

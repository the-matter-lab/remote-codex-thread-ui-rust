/** @vitest-environment jsdom */
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import {
  GraphMoleculeViewer,
  type GraphMoleculeViewerHandle,
} from './GraphMoleculeViewer';
import type {
  RenderModel,
  RenderViewer,
} from './GraphMoleculeViewerRenderTypes';
import {
  EXTENSION_FIXTURES,
  type ScientificTarget,
} from '@remote-codex/shared';

const runtime = vi.hoisted(() => ({
  viewer: null as unknown as RenderViewer,
  click: null as unknown as (
    atom: object,
    viewer: object,
    event?: object,
  ) => void,
}));
vi.mock('./load3Dmol', () => ({
  load3Dmol: async () => ({ createViewer: () => runtime.viewer }),
}));
const first = '2\nfirst\nO 0 0 0\nH 1 0 0\n';
const png =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/l9sAAAAASUVORK5CYII=';
const target: ScientificTarget = {
  artifactId: 'a',
  objectId: 'o',
  sourceRevision: 'r',
  checksum: 'a'.repeat(64),
  streamId: 's',
  frameId: 'f0',
  frameIndex: 0,
};
let root: Root;
let node: HTMLDivElement;
let model: RenderModel;
let camera: number[];
let handle: GraphMoleculeViewerHandle;
const onReady = (value: GraphMoleculeViewerHandle) => {
  handle = value;
};
function button(label: string) {
  return node.querySelector<HTMLButtonElement>(
    `button[aria-label="${label}"]`,
  )!;
}
async function click(label: string) {
  await act(async () => button(label).click());
}

beforeEach(() => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      disconnect() {}
    },
  );
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(
    {} as never,
  );
  camera = [0, 0, 0, 1, 0, 0, 0, 1];
  const atoms = [
    { index: 0, serial: 9, elem: 'O', x: 0, y: 0, z: 0 },
    { index: 1, serial: 10, elem: 'H', x: 1, y: 0, z: 0 },
  ];
  model = {
    selectedAtoms: () => atoms.map((atom) => ({ ...atom })),
    getCrystData: () => undefined,
    setStyle: vi.fn(),
    setClickable: (_sel, _bool, callback) => {
      runtime.click = callback as typeof runtime.click;
    },
    setHoverable: vi.fn(),
  };
  runtime.viewer = {
    addModel: vi.fn(() => model),
    removeAllModels: vi.fn(),
    removeAllShapes: vi.fn(),
    removeAllLabels: vi.fn(),
    removeAllSurfaces: vi.fn(),
    removeUnitCell: vi.fn(),
    addUnitCell: vi.fn(),
    addLine: vi.fn(() => ({})),
    removeShape: vi.fn(),
    addLabel: vi.fn(),
    addSurface: vi.fn(),
    render: vi.fn(),
    resize: vi.fn(),
    setBackgroundColor: vi.fn(),
    setCameraParameters: vi.fn(),
    getView: () => camera,
    setView: vi.fn((view) => {
      camera = view;
    }),
    zoom: vi.fn(),
    zoomTo: vi.fn(),
    pngURI: () => png,
  };
  node = document.createElement('div');
  document.body.append(node);
  root = createRoot(node);
});
afterEach(async () => {
  await act(async () => root.unmount());
  node.remove();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

it('local selection remains personal; explicit selection and PNG callbacks carry stable atom/frame provenance', async () => {
  const local = vi.fn(),
    submit = vi.fn(),
    screenshot = vi.fn();
  await act(async () => {
    root.render(
      <GraphMoleculeViewer
        source={{ content: [first], target, frameTargets: [target] }}
        onReady={onReady}
        onSelectionChange={local}
        onSelectionSubmit={submit}
        onScreenshot={screenshot}
      />,
    );
  });
  await act(async () =>
    runtime.click(
      { index: 0, serial: 9, elem: 'O', x: 0, y: 0, z: 0 },
      runtime.viewer,
    ),
  );
  expect(submit).not.toHaveBeenCalled();
  expect(local.mock.lastCall?.[0]).toMatchObject({
    atoms: [0],
    selectedIds: ['0'],
    target,
  });
  await click('Send selection');
  expect(submit).toHaveBeenCalledExactlyOnceWith({
    selections: [
      expect.objectContaining({ atoms: [0], selectedIds: ['0'], target }),
    ],
  });
  await act(async () =>
    Array.from(node.querySelectorAll('button'))
      .find((b) => b.textContent === 'Send screenshot')!
      .click(),
  );
  expect(screenshot).toHaveBeenCalledExactlyOnceWith(
    expect.objectContaining({
      target,
      trajectoryIndex: 0,
      image: png,
      camera,
    }),
  );
  expect(
    button('Distance: unavailable; requires an agent contribution').disabled,
  ).toBe(true);
});

it('keeps agent controls mounted but inert while a new source is verified', async () => {
  const props = {
    source: { content: [first], target, frameTargets: [target] },
    onReady,
    toolbar: () => <input aria-label="Agent annotation" defaultValue="draft" />,
  };
  await act(async () => root.render(<GraphMoleculeViewer {...props} />));
  const input = node.querySelector<HTMLInputElement>(
    'input[aria-label="Agent annotation"]',
  )!;
  input.value = 'personal draft';
  const controls = node.querySelector<HTMLElement>(
    '[aria-label="Viewer contributions"]',
  )!;
  expect(controls.hasAttribute('inert')).toBe(false);
  await act(async () =>
    root.render(<GraphMoleculeViewer {...props} loading />),
  );
  expect(node.querySelector('input[aria-label="Agent annotation"]')).toBe(
    input,
  );
  expect(input.value).toBe('personal draft');
  expect(controls.hasAttribute('inert')).toBe(true);
  expect(controls.style.visibility).toBe('hidden');
  expect(handle.isAvailable()).toBe(false);
  await act(async () =>
    root.render(<GraphMoleculeViewer {...props} loading={false} />),
  );
  expect(node.querySelector('input[aria-label="Agent annotation"]')).toBe(
    input,
  );
  expect(controls.hasAttribute('inert')).toBe(false);
  expect(controls.style.visibility).toBe('');
  expect(handle.isAvailable()).toBe(true);
});

it('stages separate molecules and preserves each target rather than relabeling them on submission', async () => {
  const submit = vi.fn();
  const render = async (next: ScientificTarget) => {
    await act(async () =>
      root.render(
        <GraphMoleculeViewer
          moleculeId={next.objectId}
          source={{ content: [first], target: next }}
          onSelectionSubmit={submit}
        />,
      ),
    );
  };
  await render(target);
  await act(async () => runtime.click({ index: 0 }, runtime.viewer));
  await click('Stage current selection');
  const other = { ...target, objectId: 'other', artifactId: 'b' };
  await render(other);
  await act(async () => runtime.click({ index: 1 }, runtime.viewer));
  await click('Stage current selection');
  await click('Send staged selections');
  expect(submit).toHaveBeenCalledExactlyOnceWith({
    selections: [
      expect.objectContaining({ target, selectedIds: ['0'] }),
      expect.objectContaining({ target: other, selectedIds: ['1'] }),
    ],
  });
});

it('keeps the camera and scrubbed frame while a stream appends, and resumes following through LIVE', async () => {
  const f1 = { ...target, frameId: 'f1', frameIndex: 1 },
    f2 = { ...target, frameId: 'f2', frameIndex: 2 };
  const render = async (frames: string[], targets: ScientificTarget[]) => {
    await act(async () =>
      root.render(
        <GraphMoleculeViewer
          source={{
            content: frames,
            target: targets.at(-1),
            frameTargets: targets,
            uuid: 'o',
          }}
          onReady={onReady}
        />,
      ),
    );
  };
  await render([first, first.replace('first', 'second')], [target, f1]);
  camera = [1, 2, 3, 4, 0, 0, 0, 1];
  await click('First frame');
  const oldHandle = handle;
  await render(
    [first, first.replace('first', 'second'), first.replace('first', 'third')],
    [target, f1, f2],
  );
  expect(handle.target).toEqual(target);
  expect(runtime.viewer.zoomTo).toHaveBeenCalledTimes(1);
  expect(camera).toEqual([1, 2, 3, 4, 0, 0, 0, 1]);
  await act(async () =>
    Array.from(node.querySelectorAll('button'))
      .find((b) => b.textContent === 'LIVE')!
      .click(),
  );
  expect(handle.target).toEqual(f2);
  expect(() => oldHandle.captureScreenshot()).toThrow('target changed');
});

it('applies browser commands, rejects stale targets, and retains immutable coordinates', async () => {
  const source = { content: [first], target };
  await act(async () =>
    root.render(
      <GraphMoleculeViewer
        source={source}
        onReady={onReady}
        extensionHost={{ discovery: EXTENSION_FIXTURES.grafico.discovery }}
      />,
    ),
  );
  const request = {
    version: 1 as const,
    requestId: 'req',
    operationId: 'op',
    actionId: 'elagente.viewer.style',
    target,
    payload: { style: 'stick' },
  };
  let acknowledgement;
  await act(async () => {
    acknowledgement = await handle.execute(request);
  });
  expect(acknowledgement).toMatchObject({ status: 'applied', target });
  expect(source.content).toEqual([first]);
  expect(
    (
      await handle.execute({
        ...request,
        target: { ...target, sourceRevision: 'old' },
      })
    ).status,
  ).toBe('rejected');
  await act(async () =>
    root.render(
      <GraphMoleculeViewer
        source={source}
        loading
        onReady={onReady}
        extensionHost={{ discovery: EXTENSION_FIXTURES.grafico.discovery }}
      />,
    ),
  );
  expect((await handle.execute(request)).error?.code).toBe(
    'VIEWER_UNAVAILABLE',
  );
});

it('disabled submission without a callback and rejected submissions provide visible feedback', async () => {
  await act(async () =>
    root.render(<GraphMoleculeViewer source={{ content: [first], target }} />),
  );
  await act(async () => runtime.click({ index: 0 }, runtime.viewer));
  expect(button('Send selection').disabled).toBe(true);
  await act(async () =>
    root.render(
      <GraphMoleculeViewer
        source={{ content: [first], target }}
        onSelectionSubmit={async () => {
          throw new Error('Stale native revision');
        }}
      />,
    ),
  );
  await click('Send selection');
  expect(node.querySelector('[role="status"]')?.textContent).toBe(
    'Stale native revision',
  );
});

it.each(['provided', 'none'] as const)(
  'picks, highlights, hovers and submits actual EXTXYZ parser atoms with %s bonds',
  async (bonding) => {
    Object.defineProperty(window.URL, 'createObjectURL', {
      value: () => 'blob:worker',
      configurable: true,
    });
    const library = (await import('3dmol')) as unknown as {
      GLModel: new (id: number) => RenderModel & {
        addMolData(text: string, format: string, options: object): void;
      };
    };
    const content = '2\nProperties=species:S:1:pos:R:3\nO 0 0 0\nH 1 0 0\n';
    const actualModel = new library.GLModel(0);
    actualModel.addMolData(content, 'xyz', { assignBonds: false });
    expect(actualModel.selectedAtoms({}).map((atom) => atom.index)).toEqual([
      undefined,
      undefined,
    ]);
    vi.mocked(runtime.viewer.addModel).mockReturnValue(actualModel);
    const submit = vi.fn(),
      local = vi.fn();
    const editedTarget = {
      ...target,
      sourceRevision: 'edited-r2',
      frameId: 'edited-frame',
    };
    const metadata = {
      version: 1 as const,
      objectId: editedTarget.objectId,
      sourceRevision: editedTarget.sourceRevision,
      checksum: editedTarget.checksum,
      format: 'extxyz',
      atoms: [
        { id: 'canonical-O', element: 'O' },
        { id: 'canonical-H', element: 'H' },
      ],
      bonds: [
        {
          atomIds: ['canonical-O', 'canonical-H'] as [string, string],
          order: 1,
        },
      ],
      render: { coordinateUnit: 'angstrom' as const, bonding },
    };
    const before = JSON.stringify(metadata);
    await act(async () =>
      root.render(
        <GraphMoleculeViewer
          source={{
            content: [content],
            format: 'extxyz',
            target: editedTarget,
            metadata,
          }}
          onSelectionChange={local}
          onSelectionSubmit={submit}
        />,
      ),
    );
    type PickedAtom = ReturnType<RenderModel['selectedAtoms']>[number] & {
      callback: (atom: object, viewer: object, event?: MouseEvent) => void;
      hover_callback: (atom: object, viewer: object, event: MouseEvent) => void;
      style: { sphere?: { color: string } };
    };
    const atoms = actualModel.selectedAtoms({}) as PickedAtom[];
    expect(atoms.map((atom) => atom.index)).toEqual([0, 1]);
    await act(async () => atoms[0]!.callback(atoms[0]!, runtime.viewer));
    expect(local.mock.lastCall?.[0]).toMatchObject({
      atoms: [0],
      selectedIds: ['canonical-O'],
      target: editedTarget,
    });
    expect(atoms[0]!.style.sphere?.color).toBe('yellow');
    await act(async () =>
      atoms[1]!.callback(
        atoms[1]!,
        runtime.viewer,
        new MouseEvent('click', { shiftKey: true }),
      ),
    );
    await act(async () =>
      atoms[1]!.hover_callback(
        atoms[1]!,
        runtime.viewer,
        new MouseEvent('mousemove', { clientX: 20, clientY: 30 }),
      ),
    );
    expect(node.textContent).toContain('H (1)');
    await click('Stage current selection');
    await click('Send staged selections');
    expect(submit).toHaveBeenCalledExactlyOnceWith({
      selections: [
        expect.objectContaining({
          atoms: [0, 1],
          selectedIds: ['canonical-O', 'canonical-H'],
          target: editedTarget,
        }),
      ],
    });
    expect(JSON.stringify(metadata)).toBe(before);
    expect(
      actualModel.selectedAtoms({}).map((atom) => [atom.x, atom.y, atom.z]),
    ).toEqual([
      [0, 0, 0],
      [1, 0, 0],
    ]);
  },
);

it('captures live personal camera/selection through a retained ready handle and detaches provenance', async () => {
  const active = vi.fn();
  await act(async () =>
    root.render(
      <GraphMoleculeViewer
        source={{ content: [first], target }}
        onReady={onReady}
        onActive={active}
      />,
    ),
  );
  const retained = handle;
  camera = [7, 8, 9, 4, 0, 0, 0, 1];
  await act(async () => runtime.click({ index: 1 }, runtime.viewer));
  expect(retained.isAvailable()).toBe(true);
  const captured = retained.captureView();
  expect(captured).toMatchObject({
    version: 1,
    image: png,
    mediaType: 'image/png',
    width: 1,
    height: 1,
    target,
    trajectoryIndex: 0,
    camera,
    selectedIds: ['1'],
  });
  captured.camera[0] = 999;
  captured.selectedIds[0] = 'foreign';
  captured.target!.objectId = 'foreign';
  expect(retained.captureView()).toMatchObject({
    target,
    camera: [7, 8, 9, 4, 0, 0, 0, 1],
    selectedIds: ['1'],
  });
  await act(async () =>
    node
      .querySelector('.thread-graph-molecule-stage')!
      .dispatchEvent(new Event('pointerdown', { bubbles: true })),
  );
  expect(active).toHaveBeenCalledExactlyOnceWith(retained);
  await act(async () =>
    Array.from(node.querySelectorAll('button'))
      .find((b) => b.textContent?.startsWith('LIVE'))!
      .focus(),
  );
  expect(active).toHaveBeenCalledTimes(2);
  await act(async () =>
    root.render(
      <GraphMoleculeViewer
        source={{ content: [first], target }}
        onReady={onReady}
        loading
      />,
    ),
  );
  expect(retained.isAvailable()).toBe(false);
  expect(() => retained.captureView()).toThrow('unavailable');
  await act(async () =>
    root.render(
      <GraphMoleculeViewer
        source={{ content: [first], target }}
        onReady={onReady}
      />,
    ),
  );
  const current = handle;
  await act(async () => root.render(null));
  expect(current.isAvailable()).toBe(false);
  expect(() => current.captureView()).toThrow('unavailable');
});

it('reports screenshot upload/native rejection and rejects invalid PNG/camera without emitting input', async () => {
  const submit = vi
    .fn()
    .mockRejectedValue(new Error('PNG native input rejected'));
  await act(async () =>
    root.render(
      <GraphMoleculeViewer
        source={{ content: [first], target }}
        onScreenshot={submit}
        onReady={onReady}
      />,
    ),
  );
  const send = () =>
    Array.from(node.querySelectorAll('button'))
      .find((b) => b.textContent === 'Send screenshot')!
      .click();
  await act(async () => send());
  expect(node.querySelector('[role="status"]')?.textContent).toBe(
    'PNG native input rejected',
  );
  expect(submit).toHaveBeenCalledTimes(1);
  submit.mockClear();
  runtime.viewer.pngURI = () => 'data:image/png;base64,AA==';
  await act(async () => send());
  expect(node.querySelector('[role="status"]')?.textContent).toContain(
    'valid PNG',
  );
  expect(submit).not.toHaveBeenCalled();
  runtime.viewer.pngURI = () => png;
  camera = [NaN];
  expect(() => handle.captureView()).toThrow('camera is unavailable');
});

it('captures the applied batch camera and selection before React commits and renders annotations before ACK', async () => {
  const { VIEWER_COMMAND_BATCH_ACTION } =
    await import('./GraphMoleculeViewerCommands');
  const discovery = structuredClone(EXTENSION_FIXTURES.grafico.discovery);
  discovery.capabilities[VIEWER_COMMAND_BATCH_ACTION.id] = true;
  discovery.actions.push(VIEWER_COMMAND_BATCH_ACTION);
  await act(async () =>
    root.render(
      <GraphMoleculeViewer
        source={{ content: [first], target }}
        onReady={onReady}
        extensionHost={{ discovery }}
      />,
    ),
  );
  await act(async () => {
    const acknowledgement = await handle.execute({
      version: 1,
      requestId: 'batch',
      operationId: 'batch',
      actionId: VIEWER_COMMAND_BATCH_ACTION.id,
      target,
      payload: {
        version: 1,
        commands: [
          { type: 'selection', selectedIds: ['1'], color: 'red', radius: 0.5 },
          { type: 'camera', view: [4, 5, 6, 7, 0, 0, 0, 1] },
          {
            type: 'annotations',
            annotations: [
              { id: 'label', text: 'hydrogen', atomId: '1', color: 'blue' },
            ],
          },
        ],
      },
    });
    expect(acknowledgement).toMatchObject({
      status: 'applied',
      result: { commandCount: 3 },
    });
    expect(runtime.viewer.addLabel).toHaveBeenCalledWith(
      'hydrogen',
      expect.objectContaining({ fontColor: 'blue' }),
      undefined,
      true,
    );
    expect(model.setStyle).toHaveBeenCalledWith(
      { index: [1] },
      expect.objectContaining({ sphere: { radius: 0.5, color: 'red' } }),
    );
    expect(handle.captureView()).toMatchObject({
      selectedIds: ['1'],
      camera: [4, 5, 6, 7, 0, 0, 0, 1],
    });
  });
});

it('a retained unmounted handle rejects commands before renderer effects', async () => {
  await act(async () =>
    root.render(
      <GraphMoleculeViewer
        source={{ content: [first], target }}
        onReady={onReady}
        extensionHost={{ discovery: EXTENSION_FIXTURES.grafico.discovery }}
      />,
    ),
  );
  const retained = handle;
  await act(async () => root.render(null));
  const before = vi.mocked(runtime.viewer.render).mock.calls.length;
  expect(
    await retained.execute({
      version: 1,
      requestId: 'unmounted',
      operationId: 'unmounted',
      actionId: 'elagente.viewer.style',
      target,
      payload: { style: 'stick' },
    }),
  ).toMatchObject({
    status: 'rejected',
    error: { code: 'VIEWER_UNAVAILABLE' },
  });
  expect(runtime.viewer.render).toHaveBeenCalledTimes(before);
});

it('rebinds append identities without drawing/reparsing a pinned unchanged frame; renders real frame and metadata changes', async () => {
  const frames = [
    first,
    first.replace('first', 'second').replace('H 1 0 0', 'H 2 0 0'),
  ];
  const makeSource = (
    count: number,
    revision: string,
    bonds?: { atomIds: [string, string]; order: number }[],
  ) => {
    const nextTarget = {
      ...target,
      artifactId: 'artifact-' + revision,
      sourceRevision: revision,
      checksum: revision.padEnd(64, 'a'),
    };
    return {
      content: [...frames, ...Array(count - 2).fill(first)],
      target: nextTarget,
      frameTargets: Array.from({ length: count }, (_, i) => ({
        ...nextTarget,
        frameId: 'frame-' + i,
        frameIndex: i,
      })),
      metadata: {
        version: 1 as const,
        objectId: 'o',
        sourceRevision: revision,
        checksum: nextTarget.checksum,
        format: 'xyz',
        atoms: [
          { id: 'O', element: 'O' },
          { id: 'H', element: 'H' },
        ],
        ...(bonds ? { bonds } : {}),
        render: {
          coordinateUnit: 'angstrom' as const,
          bonding: 'provided' as const,
        },
      },
      uuid: 'o',
    };
  };
  // Provided metadata always supplies bonds, even an explicitly empty list.
  let source = makeSource(2, 'r1', []);
  const render = async (loading = false) =>
    act(async () =>
      root.render(
        <GraphMoleculeViewer
          source={source}
          onReady={onReady}
          loading={loading}
        />,
      ),
    );
  await render();
  await click('First frame');
  await act(async () => runtime.click({ index: 0 }, runtime.viewer));
  camera = [3, 4, 5, 6, 0, 0, 0, 1];
  const old = handle;
  for (const fn of [
    runtime.viewer.addModel,
    runtime.viewer.removeAllLabels,
    runtime.viewer.removeAllSurfaces,
    runtime.viewer.setBackgroundColor,
    runtime.viewer.render,
    model.setStyle,
  ])
    vi.mocked(fn).mockClear();
  for (let count = 3; count <= 6; count++) {
    source = makeSource(count, 'r' + count, []);
    await render(true);
    expect(handle.isAvailable()).toBe(false);
    await render();
    expect(handle.target).toMatchObject({
      artifactId: 'artifact-r' + count,
      frameIndex: 0,
    });
    expect(runtime.viewer.render).not.toHaveBeenCalled();
    expect(handle.captureView().selectedIds).toEqual(['O']);
    vi.mocked(runtime.viewer.render).mockClear();
  }
  // captureView above intentionally renders; appends themselves do not.
  expect(runtime.viewer.addModel).not.toHaveBeenCalled();
  expect(runtime.viewer.removeAllLabels).not.toHaveBeenCalled();
  expect(runtime.viewer.removeAllSurfaces).not.toHaveBeenCalled();
  expect(runtime.viewer.setBackgroundColor).not.toHaveBeenCalled();
  expect(model.setStyle).not.toHaveBeenCalled();
  expect(camera).toEqual([3, 4, 5, 6, 0, 0, 0, 1]);
  expect(old.isAvailable()).toBe(false);
  await click('Next frame');
  expect(runtime.viewer.addModel).toHaveBeenCalledTimes(1);
  expect(vi.mocked(runtime.viewer.addModel).mock.calls[0]![0]).toContain(
    'H 2 0 0',
  );
  expect(runtime.viewer.render).toHaveBeenCalledTimes(1);
  vi.mocked(runtime.viewer.addModel).mockClear();
  vi.mocked(runtime.viewer.render).mockClear();
  source = makeSource(6, 'r7', [{ atomIds: ['O', 'H'], order: 1 }]);
  await render();
  expect(runtime.viewer.addModel).toHaveBeenCalledTimes(1);
  expect(runtime.viewer.render).toHaveBeenCalledTimes(1);
});

it('clears actual surfaces and labels when changing representations/annotations, while batching label additions', async () => {
  const { VIEWER_COMMAND_BATCH_ACTION } =
    await import('./GraphMoleculeViewerCommands');
  const discovery = structuredClone(EXTENSION_FIXTURES.grafico.discovery);
  discovery.actions.push(VIEWER_COMMAND_BATCH_ACTION);
  discovery.capabilities[VIEWER_COMMAND_BATCH_ACTION.id] = true;
  await act(async () =>
    root.render(
      <GraphMoleculeViewer
        source={{ content: [first], target }}
        onReady={onReady}
        extensionHost={{ discovery }}
      />,
    ),
  );
  const execute = async (operationId: string, commands: unknown[]) =>
    act(async () => {
      const result = await handle.execute({
        version: 1,
        requestId: operationId,
        operationId,
        actionId: VIEWER_COMMAND_BATCH_ACTION.id,
        target,
        payload: { version: 1, commands } as never,
      });
      expect(result.status).toBe('applied');
    });
  expect(runtime.viewer.removeAllSurfaces).not.toHaveBeenCalled();
  expect(runtime.viewer.removeAllLabels).not.toHaveBeenCalled();
  await execute('surface', [{ type: 'style', style: 'surface' }]);
  expect(runtime.viewer.addSurface).toHaveBeenCalledTimes(1);
  await execute('stick', [{ type: 'style', style: 'stick' }]);
  expect(runtime.viewer.removeAllSurfaces).toHaveBeenCalledTimes(1);
  await execute('annotations', [
    {
      type: 'annotations',
      annotations: [
        { id: 'a', atomId: '0', text: 'first' },
        { id: 'b', atomId: '1', text: 'second' },
      ],
    },
  ]);
  expect(runtime.viewer.removeAllLabels).not.toHaveBeenCalled();
  expect(runtime.viewer.addLabel).toHaveBeenCalledWith(
    'first',
    expect.any(Object),
    undefined,
    true,
  );
  expect(runtime.viewer.addLabel).toHaveBeenCalledWith(
    'second',
    expect.any(Object),
    undefined,
    true,
  );
  await execute('clear-annotations', [
    { type: 'annotations', annotations: [] },
  ]);
  expect(runtime.viewer.removeAllLabels).toHaveBeenCalledTimes(1);
});

it('binds a LIVE append directly to its latest verified frame before exposing ready handles', async () => {
  const frames = [
    first,
    first.replace('first', 'second'),
    first.replace('first', 'third'),
  ];
  const sourceFor = (count: number) => {
    const latest = {
      ...target,
      artifactId: 'revision-' + count,
      sourceRevision: 'r' + count,
    };
    return {
      content: frames.slice(0, count),
      target: latest,
      frameTargets: frames.slice(0, count).map((_, frameIndex) => ({
        ...latest,
        frameId: 'f' + frameIndex,
        frameIndex,
      })),
    };
  };
  const ready = vi.fn(onReady);
  await act(async () =>
    root.render(<GraphMoleculeViewer source={sourceFor(2)} onReady={ready} />),
  );
  ready.mockClear();
  vi.mocked(runtime.viewer.addModel).mockClear();
  const before = [...camera];
  await act(async () =>
    root.render(<GraphMoleculeViewer source={sourceFor(3)} onReady={ready} />),
  );
  expect(ready.mock.calls.map(([value]) => value.trajectoryIndex)).toEqual([2]);
  expect(handle.target).toMatchObject({
    artifactId: 'revision-3',
    frameId: 'f2',
    frameIndex: 2,
  });
  expect(runtime.viewer.addModel).toHaveBeenCalledTimes(1);
  expect(vi.mocked(runtime.viewer.addModel).mock.calls[0]![0]).toBe(frames[2]);
  expect(camera).toEqual(before);
});

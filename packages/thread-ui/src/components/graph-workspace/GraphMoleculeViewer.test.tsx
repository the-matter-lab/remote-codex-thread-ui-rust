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
    pngURI: () => 'data:image/png;base64,AA==',
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
      image: 'data:image/png;base64,AA==',
      camera,
    }),
  );
  expect(
    button('Distance: unavailable; requires an agent contribution').disabled,
  ).toBe(true);
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

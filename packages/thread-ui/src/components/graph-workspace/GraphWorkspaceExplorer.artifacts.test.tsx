// @vitest-environment jsdom
import { act, useEffect, useState, type ReactNode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { ThreadArtifactDto, ThreadDetailDto } from '@remote-codex/shared';
import type { ThreadWorkspaceAdapter } from '../../adapters';
import { createDefaultPluginContextValue } from '../../plugins/plugin-context';
import { GraphWorkspaceExplorer } from './GraphWorkspaceExplorer';
import { collectWorkspaceItems } from './workspaceTree';

vi.mock('./GraphResizablePanels', () => ({
  ResizablePanelGroup: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
  ResizablePanel: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
  ResizableHandle: () => null,
}));
const detail = {
  thread: {
    id: 'thread',
    workspaceId: 'workspace',
    activeTurnId: null,
    status: 'idle',
  },
  workspace: { id: 'workspace', label: 'Workspace', absPath: '/workspace' },
  turns: [],
  liveItems: null,
} as unknown as ThreadDetailDto;
function artifact(
  id: string,
  stream = 'stream',
  object = 'object',
): ThreadArtifactDto {
  const checksum = id.padStart(64, '0');
  const metadata = {
    version: 1 as const,
    objectId: object,
    sourceRevision: id,
    checksum,
    format: 'xyz',
    stream: { id: stream, frameId: `frame-${id}`, frameIndex: 1 },
  };
  return {
    id,
    type: 'chem.structure',
    pluginId: 'reviewed',
    title: 'same.xyz',
    workspacePath: 'same.xyz',
    createdAt: '2026-10-04T00:00:00Z',
    metadata,
    payload: {
      url: `/artifacts/${id}`,
      checksum,
      target: {
        artifactId: id,
        objectId: object,
        sourceRevision: id,
        checksum,
        streamId: stream,
        frameId: `frame-${id}`,
        frameIndex: 1,
      },
    },
  };
}
let root: Root, host: HTMLDivElement, mounts: number;
function Inspector({ value }: { value: ThreadArtifactDto }) {
  const [camera, setCamera] = useState('initial');
  useEffect(() => {
    mounts++;
  }, []);
  return (
    <section data-testid="reviewed-inspector" data-artifact={value.id}>
      <canvas />
      <button onClick={() => setCamera('personal')}>Camera {camera}</button>
    </section>
  );
}
const renderArtifact = vi.fn(
  (
    context: Parameters<
      ReturnType<typeof createDefaultPluginContextValue>['renderArtifact']
    >[0],
  ) => (
    <Inspector
      key={context.artifact.metadata?.stream?.id ?? context.artifact.id}
      value={context.artifact}
    />
  ),
);
const plugins = { ...createDefaultPluginContextValue(), renderArtifact };
function nativeAdapter() {
  const listTree = vi.fn<ThreadWorkspaceAdapter['listTree']>(
    async ({ path }) => ({
      name: path || 'Workspace',
      path: path ?? '',
      kind: 'directory',
      childrenLoaded: true,
      children: [
        { name: 'same.xyz', path: 'same.xyz', kind: 'file' },
        {
          name: 'artifacts',
          path: 'artifacts',
          kind: 'directory',
          childrenLoaded: true,
          children: [],
        },
        {
          name: 'live',
          path: 'live',
          kind: 'directory',
          childrenLoaded: true,
          children: [],
        },
      ],
    }),
  );
  const readFile = vi.fn<ThreadWorkspaceAdapter['readFile']>(
    async ({ path }) => ({
      path,
      name: path,
      content: 'file',
      language: 'text',
      size: 4,
      truncated: false,
      nextOffset: 4,
    }),
  );
  return {
    adapter: { listTree, readFile } satisfies ThreadWorkspaceAdapter,
    listTree,
    readFile,
  };
}
async function render(
  adapter: ThreadWorkspaceAdapter,
  artifacts: ThreadArtifactDto[],
  focus?: { path: string; requestId: number; artifactId?: string },
  live = false,
) {
  const value = live
    ? ({
        ...detail,
        liveItems: {
          items: artifacts.map((value) => ({
            id: `structure_${value.metadata?.stream?.id}`,
            kind: 'artifact',
            artifact: value,
          })),
        },
      } as unknown as ThreadDetailDto)
    : detail;
  await act(async () =>
    root.render(
      <GraphWorkspaceExplorer
        activeView="chat"
        detail={value}
        artifacts={artifacts}
        plugins={plugins}
        status={null}
        workspaceAdapter={adapter}
        focusPathRequest={focus}
      />,
    ),
  );
}
beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: vi.fn(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  });
  window.requestAnimationFrame = vi.fn((callback) => {
    callback(0);
    return 1;
  });
  Element.prototype.scrollIntoView = vi.fn();
  host = document.createElement('div');
  document.body.append(host);
  root = createRoot(host);
  mounts = 0;
  renderArtifact.mockClear();
});
afterEach(() => {
  act(() => root.unmount());
  host.remove();
  localStorage.clear();
  vi.restoreAllMocks();
});
describe('native files alongside immutable artifact inspection', () => {
  it('keeps exact artifact/live nodes after adapter admission and routes explicit artifactId through the real preview pane', async () => {
    const { adapter, listTree, readFile } = nativeAdapter(),
      value = artifact('a');
    await render(
      adapter,
      [value],
      { artifactId: 'a', path: 'same.xyz', requestId: 1 },
      true,
    );
    expect(listTree).toHaveBeenCalled();
    expect(host.textContent).toContain('same.xyz');
    expect(
      host
        .querySelector('[data-testid="reviewed-inspector"]')
        ?.getAttribute('data-artifact'),
    ).toBe('a');
    expect(renderArtifact.mock.calls.at(-1)?.[0]).toMatchObject({
      artifact: value,
      presentation: 'workspace',
      expanded: true,
    });
    expect(renderArtifact.mock.calls.at(-1)?.[0].artifact).toBe(value);
    expect(readFile).not.toHaveBeenCalled();
    expect(listTree.mock.calls.every(([input]) => !input.path)).toBe(true);
    // Native directories cannot be swallowed by the synthetic live/artifact groups.
    expect(host.querySelector('[data-explorer-path="live"]')).not.toBeNull();
  });
  it('retains exact selected object and personal renderer state across immutable stream appends', async () => {
    const { adapter, readFile } = nativeAdapter(),
      first = artifact('a'),
      other = artifact('b', 'other', 'other');
    await render(adapter, [first, other], {
      artifactId: 'a',
      path: 'same.xyz',
      requestId: 2,
    });
    const canvas = host.querySelector('canvas');
    await act(async () =>
      [...host.querySelectorAll('button')]
        .find((button) => button.textContent === 'Camera initial')
        ?.click(),
    );
    const next = artifact('c');
    await render(adapter, [next, other], {
      artifactId: 'a',
      path: 'same.xyz',
      requestId: 2,
    });
    expect(host.querySelector('canvas')).toBe(canvas);
    expect(host.textContent).toContain('Camera personal');
    expect(
      host
        .querySelector('[data-testid="reviewed-inspector"]')
        ?.getAttribute('data-artifact'),
    ).toBe('c');
    expect(renderArtifact.mock.calls.at(-1)?.[0].artifact).toBe(next);
    expect(readFile).not.toHaveBeenCalled();
    expect(mounts).toBe(1);
  });
  it('keeps live selection and restores the same object stream with the adapter present', async () => {
    const { adapter, readFile } = nativeAdapter(),
      first = artifact('a'),
      other = artifact('b', 'other', 'other');
    await render(adapter, [first, other], undefined, true);
    await act(async () =>
      host
        .querySelector<HTMLButtonElement>(
          '[data-testid="live-molecule-item"][data-molecule-id="b"]',
        )!
        .click(),
    );
    const canvas = host.querySelector('canvas');
    const next = artifact('c', 'other', 'other');
    await render(adapter, [first, next], undefined, true);
    expect(
      host.querySelector(
        '[data-testid="live-molecule-item"][data-molecule-id="c"]',
      )?.className,
    ).toContain('is-selected');
    expect(host.querySelector('canvas')).toBe(canvas);
    expect(
      host
        .querySelector('[data-testid="reviewed-inspector"]')
        ?.getAttribute('data-artifact'),
    ).toBe('c');
    await act(async () => root.unmount());
    root = createRoot(host);
    await render(adapter, [first, next], undefined, true);
    expect(
      host.querySelector(
        '[data-testid="live-molecule-item"][data-molecule-id="c"]',
      )?.className,
    ).toContain('is-selected');
    expect(
      host
        .querySelector('[data-testid="reviewed-inspector"]')
        ?.getAttribute('data-artifact'),
    ).toBe('c');
    expect(readFile).not.toHaveBeenCalled();
  });
  it('shows unavailable for unknown exact artifacts and never falls back to same-name files or other artifacts', async () => {
    const { adapter, readFile } = nativeAdapter();
    await render(adapter, [artifact('a')], {
      artifactId: 'missing',
      path: 'same.xyz',
      requestId: 3,
    });
    expect(host.textContent).toContain('Artifact unavailable: missing');
    expect(host.querySelector('[data-testid="reviewed-inspector"]')).toBeNull();
    expect(readFile).not.toHaveBeenCalled();
    expect(renderArtifact).not.toHaveBeenCalled();
  });
  it('uses distinct virtual paths for same-title objects and rejects shared identity from malformed metadata', () => {
    const first = artifact('a'),
      next = artifact('b'),
      other = artifact('c', 'other');
    const tree = collectWorkspaceItems(
      detail,
      [first, next, other],
      null,
      'chat',
    );
    const nodes = tree.children.find(
      (node) => node.id === 'artifacts',
    )!.children;
    expect(nodes).toHaveLength(2);
    expect(nodes[0].path).not.toBe(nodes[1].path);
    expect(nodes.find((node) => node.artifact?.id === 'b')?.artifact).toBe(
      next,
    );
    const invalid = {
      ...first,
      metadata: { ...first.metadata, version: 9 },
    } as unknown as ThreadArtifactDto;
    const invalidNext = {
      ...next,
      metadata: { ...next.metadata, version: 9 },
    } as unknown as ThreadArtifactDto;
    expect(
      collectWorkspaceItems(
        detail,
        [invalid, invalidNext],
        null,
        'chat',
      ).children.find((node) => node.id === 'artifacts')!.children,
    ).toHaveLength(2);
  });
});

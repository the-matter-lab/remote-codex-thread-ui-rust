// @vitest-environment jsdom

import { act, type ReactNode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import type { ThreadDetailDto } from '@remote-codex/shared';
import type {
  ThreadWorkspaceAdapter,
  ThreadWorkspaceFilePreview,
  ThreadWorkspaceTreeNode,
} from '../../adapters';
import { createDefaultPluginContextValue } from '../../plugins/plugin-context';
import { GraphWorkspaceExplorer } from './GraphWorkspaceExplorer';

vi.mock('./GraphWorkspacePreviewPane', () => ({
  graphWorkspacePreviewTargetFromNode: (
    node: { kind: string; path: string } | null,
  ) => (node ? { kind: node.kind, node } : null),
  GraphWorkspacePreviewPane: ({
    focusLine,
    onCollapse,
    onExpandExplorer,
    previewFile,
    downloadOnly,
  }: {
    focusLine?: number | null;
    onCollapse?: () => void;
    onExpandExplorer?: () => void;
    previewFile?: ThreadWorkspaceFilePreview | null;
    downloadOnly?: boolean;
  }) => (
    <div data-testid="preview-file" data-focus-line={focusLine ?? undefined} data-content={previewFile?.content} data-download-only={downloadOnly}>
      {previewFile?.path ?? 'none'}
      {onCollapse ? (
        <button type="button" aria-label="Hide Editor" onClick={onCollapse} />
      ) : null}
      {onExpandExplorer ? (
        <button
          type="button"
          aria-label="Show Explorer"
          onClick={onExpandExplorer}
        />
      ) : null}
    </div>
  ),
}));

vi.mock('./GraphResizablePanels', () => ({
  ResizablePanelGroup: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
  ResizablePanel: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
  ResizableHandle: () => <div role="separator" />,
}));

const detail = {
  thread: {
    id: 'thread-1',
    workspaceId: 'workspace-1',
    activeTurnId: null,
    status: 'idle',
  },
  workspace: {
    id: 'workspace-1',
    label: 'Demo workspace',
    absPath: '/workspace/demo',
  },
  turns: [],
  liveItems: null,
} as unknown as ThreadDetailDto;

function directory(
  path: string,
  children: ThreadWorkspaceTreeNode[] = [],
  childrenLoaded = true,
): ThreadWorkspaceTreeNode {
  return {
    name: path.split('/').at(-1) || 'Demo workspace',
    path,
    kind: 'directory',
    children,
    childrenLoaded,
    hasChildren: children.length > 0 || !childrenLoaded,
  };
}

function file(path: string): ThreadWorkspaceTreeNode {
  return {
    name: path.split('/').at(-1) ?? path,
    path,
    kind: 'file',
    size: 18,
  };
}

function filePreview(path: string): ThreadWorkspaceFilePreview {
  return {
    path,
    name: path.split('/').at(-1) ?? path,
    content: `content:${path}`,
    language: 'typescript',
    size: 18,
    truncated: false,
    nextOffset: 18,
  };
}

function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((nextResolve) => {
    resolve = nextResolve;
  });
  return { promise, resolve };
}

function createAdapter() {
  const rootTree = directory('', [
    directory('src', [], false),
    file('README.md'),
  ]);
  const srcTree = directory('src', [file('src/index.ts')]);
  const listTree = vi.fn<ThreadWorkspaceAdapter['listTree']>(
    async ({ path }) => (path === 'src' ? srcTree : rootTree),
  );
  const readFile = vi.fn<ThreadWorkspaceAdapter['readFile']>(async ({ path }) =>
    filePreview(path),
  );
  return {
    adapter: { listTree, readFile } satisfies ThreadWorkspaceAdapter,
    listTree,
    readFile,
  };
}

let root: Root | null = null;
let host: HTMLDivElement | null = null;
let mobileViewport = false;

async function renderExplorer(
  adapter: ThreadWorkspaceAdapter,
  focusPathRequest?: { path: string; line?: number; requestId: number } | null,
) {
  await act(async () => {
    root?.render(
      <GraphWorkspaceExplorer
        activeView="chat"
        detail={detail}
        artifacts={[]}
        plugins={createDefaultPluginContextValue()}
        status={null}
        workspaceAdapter={adapter}
        focusPathRequest={focusPathRequest}
      />,
    );
  });
}

function buttonNamed(name: string) {
  return [...(host?.querySelectorAll<HTMLButtonElement>('button') ?? [])].find(
    (button) => button.textContent?.trim() === name,
  );
}

describe('GraphWorkspaceExplorer', () => {
  beforeEach(() => {
    mobileViewport = false;
    (
      globalThis as typeof globalThis & {
        IS_REACT_ACT_ENVIRONMENT: boolean;
      }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn(() => ({
        matches: mobileViewport,
        media: '(max-width: 639px)',
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
    window.requestAnimationFrame = vi.fn((callback) => {
      callback(0);
      return 1;
    });
    host = document.createElement('div');
    document.body.append(host);
    root = createRoot(host);
  });

  afterEach(() => {
    if (root) {
      act(() => root?.unmount());
    }
    root = null;
    host?.remove();
    host = null;
    window.localStorage.clear();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('loads all XYZ pages before publishing a molecular preview', async () => {
    const path = 'trajectory.xyz';
    const tail = deferred<ThreadWorkspaceFilePreview>();
    const readFile = vi.fn<ThreadWorkspaceAdapter['readFile']>(async ({offset}) =>
      offset ? tail.promise : {...filePreview(path), content: 'first frame\n', size: 48_000, truncated: true, nextOffset: 24_000});
    await renderExplorer({listTree: vi.fn(async () => directory('', [file(path)])), readFile});
    await vi.waitFor(() => expect(readFile).toHaveBeenCalledTimes(2));
    expect(readFile.mock.calls[1]?.[0]).toMatchObject({path, offset: 24_000, limit: 256 * 1024});
    expect(host?.querySelector('[data-testid="preview-file"]')?.getAttribute('data-content')).toBeNull();
    await act(async () => tail.resolve({...filePreview(path), content: 'last frame\n', size: 48_000, nextOffset: 48_000}));
    await vi.waitFor(() => expect(host?.querySelector('[data-testid="preview-file"]')?.getAttribute('data-content')).toBe('first frame\nlast frame\n'));
  });

  it('offers download instead of a partial molecular preview above the size limit', async () => {
    const path = 'large.xyz';
    const readFile = vi.fn<ThreadWorkspaceAdapter['readFile']>(async () =>
      ({...filePreview(path), size: 11 * 1024 * 1024, truncated: true, nextOffset: 24_000}));
    await renderExplorer({listTree: vi.fn(async () => directory('', [file(path)])), readFile});
    await vi.waitFor(() => expect(host?.querySelector('[data-testid="preview-file"]')?.getAttribute('data-download-only')).toBe('true'));
    expect(readFile).toHaveBeenCalledTimes(1);
    expect(host?.querySelector('[data-testid="preview-file"]')?.getAttribute('data-content')).toBeNull();
  });

  it('loads the root, previews the first file, and preserves expanded directories on refresh', async () => {
    const { adapter, listTree, readFile } = createAdapter();
    await renderExplorer(adapter);

    await vi.waitFor(() => {
      expect(listTree).toHaveBeenCalledWith({
        threadId: 'thread-1',
        workspaceId: 'workspace-1',
        path: '',
      });
      expect(readFile).toHaveBeenCalledWith({
        threadId: 'thread-1',
        workspaceId: 'workspace-1',
        path: 'README.md',
        limit: 24_000,
      });
    });
    expect(
      host?.querySelector('[data-testid="preview-file"]')?.textContent,
    ).toBe('README.md');

    await act(async () => {
      host
        ?.querySelector<HTMLButtonElement>('[aria-label="Expand src"]')
        ?.click();
    });
    await vi.waitFor(() => {
      expect(
        listTree.mock.calls.filter(([input]) => input.path === 'src'),
      ).toHaveLength(1);
      expect(buttonNamed('index.ts')).not.toBeUndefined();
    });

    await act(async () =>
      host
        ?.querySelector<HTMLButtonElement>('[aria-label="Refresh workspace"]')
        ?.click(),
    );
    await vi.waitFor(() => {
      expect(
        listTree.mock.calls.filter(([input]) => input.path === ''),
      ).toHaveLength(2);
      expect(
        listTree.mock.calls.filter(([input]) => input.path === 'src'),
      ).toHaveLength(2);
      expect(buttonNamed('index.ts')).not.toBeUndefined();
    });
    expect(
      host?.querySelector('[data-testid="preview-file"]')?.textContent,
    ).toBe('README.md');
  });

  it('does not preview a fallback file while opening a deep link and ignores stale root refreshes', async () => {
    const staleRoot = deferred<ThreadWorkspaceTreeNode>();
    const targetRoot = directory('', [directory('src', [], false), file('WRONG.md')]);
    let rootReads = 0;
    const readFile = vi.fn<ThreadWorkspaceAdapter['readFile']>(async ({path})=>filePreview(path));
    const adapter: ThreadWorkspaceAdapter = {
      listTree: vi.fn(async ({path}) => path === 'src' ? directory('src', [file('src/index.ts')]) : ++rootReads === 1 ? staleRoot.promise : targetRoot),
      readFile,
    };
    await renderExplorer(adapter);
    await renderExplorer(adapter, {path:'/workspace/demo/src/index.ts', requestId:1});
    await vi.waitFor(()=>expect(host?.querySelector('[data-testid="preview-file"]')?.textContent).toBe('src/index.ts'));
    await act(async()=>staleRoot.resolve(directory('', [file('OLDER.md')])));
    expect(host?.querySelector('[data-testid="preview-file"]')?.textContent).toBe('src/index.ts');
    expect(readFile.mock.calls.map(([input])=>input.path)).toEqual(['src/index.ts']);
  });

  it('the newest link wins when ancestor loads finish out of order', async () => {
    const slow = deferred<ThreadWorkspaceTreeNode>();
    const readFile = vi.fn<ThreadWorkspaceAdapter['readFile']>(async ({path})=>filePreview(path));
    const adapter: ThreadWorkspaceAdapter = {
      listTree: vi.fn(async ({path}) => path === 'src' ? slow.promise : path === 'docs' ? directory('docs',[file('docs/new.md')]) : directory('',[directory('src',[],false),directory('docs',[],false)])), readFile,
    };
    await renderExplorer(adapter, {path:'src/old.md',requestId:1});
    await renderExplorer(adapter, {path:'docs/new.md',requestId:2});
    await vi.waitFor(()=>expect(host?.querySelector('[data-testid="preview-file"]')?.textContent).toBe('docs/new.md'));
    await act(async()=>slow.resolve(directory('src',[file('src/old.md')])));
    expect(host?.querySelector('[data-testid="preview-file"]')?.textContent).toBe('docs/new.md');
    expect(readFile.mock.calls.map(([input])=>input.path)).toEqual(['docs/new.md']);
  });

  it('loads missing ancestors and selects a deep focus request', async () => {
    const { adapter, listTree, readFile } = createAdapter();
    await renderExplorer(adapter);
    await vi.waitFor(() => expect(readFile).toHaveBeenCalled());

    await renderExplorer(adapter, {
      path: '/workspace/demo/src/index.ts',
      line: 7,
      requestId: 1,
    });

    await vi.waitFor(() => {
      expect(listTree.mock.calls.some(([input]) => input.path === 'src')).toBe(
        true,
      );
      expect(
        readFile.mock.calls.some(([input]) => input.path === 'src/index.ts'),
      ).toBe(true);
      expect(
        host?.querySelector('[data-testid="preview-file"]')?.textContent,
      ).toBe('src/index.ts');
      expect(
        host
          ?.querySelector('[data-testid="preview-file"]')
          ?.getAttribute('data-focus-line'),
      ).toBe('7');
    });
  });

  it('ignores a stale root response after a newer refresh completes', async () => {
    const firstRoot = deferred<ThreadWorkspaceTreeNode>();
    let rootRequestCount = 0;
    const listTree = vi.fn<ThreadWorkspaceAdapter['listTree']>(async () => {
      rootRequestCount += 1;
      if (rootRequestCount === 1) {
        return firstRoot.promise;
      }
      return directory('', [file('latest.ts')]);
    });
    const readFile = vi.fn<ThreadWorkspaceAdapter['readFile']>(
      async ({ path }) => filePreview(path),
    );
    const adapter = { listTree, readFile } satisfies ThreadWorkspaceAdapter;

    act(() => {
      root?.render(
        <GraphWorkspaceExplorer
          activeView="chat"
          detail={detail}
          artifacts={[]}
          plugins={createDefaultPluginContextValue()}
          status={null}
          workspaceAdapter={adapter}
        />,
      );
    });
    expect(listTree).toHaveBeenCalledTimes(1);

    await act(async () => {
      host
        ?.querySelector<HTMLButtonElement>('[aria-label="Refresh workspace"]')
        ?.click();
    });
    await vi.waitFor(() => {
      expect(host?.textContent).toContain('latest.ts');
      expect(readFile).toHaveBeenCalledWith(
        expect.objectContaining({ path: 'latest.ts' }),
      );
    });

    await act(async () => {
      firstRoot.resolve(directory('', [file('stale.ts')]));
    });
    expect(host?.textContent).not.toContain('stale.ts');
    expect(
      readFile.mock.calls.some(([request]) => request.path === 'stale.ts'),
    ).toBe(false);
  });

  it('forwards upload and download capabilities through the adapter', async () => {
    const { adapter, listTree } = createAdapter();
    const uploadFile = vi.fn<NonNullable<ThreadWorkspaceAdapter['uploadFile']>>(
      async ({ file: uploadedFile }) => ({
        kind: 'file',
        file: {
          path: uploadedFile.name,
          name: uploadedFile.name,
          size: uploadedFile.size,
        },
      }),
    );
    const downloadNode =
      vi.fn<NonNullable<ThreadWorkspaceAdapter['downloadNode']>>();
    const capableAdapter = { ...adapter, uploadFile, downloadNode };
    await renderExplorer(capableAdapter);
    await vi.waitFor(() => expect(listTree).toHaveBeenCalled());

    await act(async () => {
      host
        ?.querySelector<HTMLButtonElement>('[aria-label="Download README.md"]')
        ?.click();
    });
    expect(downloadNode).toHaveBeenCalledWith({
      threadId: 'thread-1',
      workspaceId: 'workspace-1',
      path: 'README.md',
      kind: 'file',
    });

    const input = host?.querySelector<HTMLInputElement>(
      '[data-testid="workspace-upload-file-input"]',
    );
    const uploadedFile = new File(['hello'], 'notes.txt', {
      type: 'text/plain',
    });
    Object.defineProperty(input, 'files', {
      configurable: true,
      value: [uploadedFile],
    });
    await act(async () => {
      input?.dispatchEvent(new Event('change', { bubbles: true }));
    });

    expect(uploadFile).toHaveBeenCalledWith({
      threadId: 'thread-1',
      workspaceId: 'workspace-1',
      path: 'notes.txt',
      file: uploadedFile,
    });
    expect(
      listTree.mock.calls.filter(([request]) => request.path === ''),
    ).toHaveLength(2);
  });

  it('opens the mobile Viewer when a file row is selected', async () => {
    mobileViewport = true;
    const { adapter, readFile } = createAdapter();
    await renderExplorer(adapter);
    await vi.waitFor(() => expect(readFile).toHaveBeenCalled());

    expect(host?.querySelector('[data-testid="preview-file"]')).toBeNull();
    await act(async () => buttonNamed('README.md')?.click());
    expect(
      host?.querySelector('[data-testid="preview-file"]')?.textContent,
    ).toBe('README.md');
  });

  it('restores split view after either pane is hidden', async () => {
    const { adapter, readFile } = createAdapter();
    await renderExplorer(adapter);
    await vi.waitFor(() => expect(readFile).toHaveBeenCalled());

    await act(async () => {
      host
        ?.querySelector<HTMLButtonElement>('[aria-label="Hide Explorer"]')
        ?.click();
    });
    expect(host?.querySelector('[role="tree"]')).toBeNull();
    expect(
      host?.querySelector('[aria-label="Show Explorer"]'),
    ).toBeTruthy();

    await act(async () => {
      host
        ?.querySelector<HTMLButtonElement>('[aria-label="Show Explorer"]')
        ?.click();
    });
    expect(host?.querySelector('[role="tree"]')).toBeTruthy();
    expect(host?.querySelector('[data-testid="preview-file"]')).toBeTruthy();

    await act(async () => {
      host
        ?.querySelector<HTMLButtonElement>('[aria-label="Hide Editor"]')
        ?.click();
    });
    expect(host?.querySelector('[data-testid="preview-file"]')).toBeNull();
    expect(host?.querySelector('[aria-label="Show Editor"]')).toBeTruthy();

    await act(async () => {
      host
        ?.querySelector<HTMLButtonElement>('[aria-label="Show Editor"]')
        ?.click();
    });
    expect(host?.querySelector('[role="tree"]')).toBeTruthy();
    expect(host?.querySelector('[data-testid="preview-file"]')).toBeTruthy();
  });

  it('collapses folders and filters across loaded descendants', async () => {
    const { adapter } = createAdapter();
    await renderExplorer(adapter);
    await act(async () => {
      host
        ?.querySelector<HTMLButtonElement>('[aria-label="Expand src"]')
        ?.click();
    });
    await vi.waitFor(() => expect(buttonNamed('index.ts')).not.toBeUndefined());

    await act(async () => {
      host
        ?.querySelector<HTMLButtonElement>('[aria-label="Collapse folders"]')
        ?.click();
    });
    expect(buttonNamed('index.ts')).toBeUndefined();

    await act(async () => {
      host
        ?.querySelector<HTMLButtonElement>('[aria-label="Filter workspace"]')
        ?.click();
    });
    const filter = host?.querySelector<HTMLInputElement>(
      '[aria-label="Filter workspace files"]',
    );
    await act(async () => {
      if (filter) {
        const valueSetter = Object.getOwnPropertyDescriptor(
          HTMLInputElement.prototype,
          'value',
        )?.set;
        valueSetter?.call(filter, 'index');
        filter.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });

    expect(buttonNamed('index.ts')).not.toBeUndefined();
    expect(host?.textContent).toContain('1 match');
  });

  it('coalesces workspace change notifications into a refresh', async () => {
    vi.useFakeTimers();
    const { adapter, listTree } = createAdapter();
    let notifyChanged: (() => void) | null = null;
    const unsubscribe = vi.fn();
    const subscribedAdapter: ThreadWorkspaceAdapter = {
      ...adapter,
      subscribeWorkspaceChanged(_identity, onChanged) {
        notifyChanged = onChanged;
        return unsubscribe;
      },
    };
    await renderExplorer(subscribedAdapter);
    expect(listTree).toHaveBeenCalledTimes(1);

    act(() => {
      notifyChanged?.();
      notifyChanged?.();
    });
    await act(async () => {
      await vi.advanceTimersByTimeAsync(180);
    });
    expect(listTree).toHaveBeenCalledTimes(2);

    act(() => root?.unmount());
    root = null;
    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });

  it('shows a directory-scoped retry after lazy loading fails', async () => {
    let srcRequests = 0;
    const listTree = vi.fn<ThreadWorkspaceAdapter['listTree']>(
      async ({ path }) => {
        if (path !== 'src') {
          return directory('', [directory('src', [], false)]);
        }
        srcRequests += 1;
        if (srcRequests === 1) {
          throw new Error('Directory unavailable');
        }
        return directory('src', [file('src/index.ts')]);
      },
    );
    const adapter = {
      listTree,
      readFile: vi.fn<ThreadWorkspaceAdapter['readFile']>(async ({ path }) =>
        filePreview(path),
      ),
    } satisfies ThreadWorkspaceAdapter;
    await renderExplorer(adapter);

    await act(async () => {
      host
        ?.querySelector<HTMLButtonElement>('[aria-label="Expand src"]')
        ?.click();
    });
    await vi.waitFor(() =>
      expect(
        host?.querySelector('[aria-label="Retry loading src"]'),
      ).not.toBeNull(),
    );

    await act(async () => {
      host
        ?.querySelector<HTMLButtonElement>('[aria-label="Retry loading src"]')
        ?.click();
    });
    await vi.waitFor(() => expect(buttonNamed('index.ts')).not.toBeUndefined());
  });
});

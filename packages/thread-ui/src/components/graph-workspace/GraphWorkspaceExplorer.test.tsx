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
import type {
  WorkspaceExplorerAdapter,
  WorkspaceExplorerCapabilities,
} from './explorer/workspaceExplorerTypes';

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
    <div
      data-testid="preview-file"
      data-focus-line={focusLine ?? undefined}
      data-content={previewFile?.content}
      data-download-only={downloadOnly}
    >
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
  threadDetail: ThreadDetailDto = detail,
) {
  await act(async () => {
    root?.render(
      <GraphWorkspaceExplorer
        activeView="chat"
        detail={threadDetail}
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

  const archiveCapabilities: WorkspaceExplorerCapabilities = {
    download: { file: true, directory: 'tar' },
    archiveImport: 'tar',
    delete: 'file',
    move: 'file-new-destination',
    maxFileBytes: 20,
    maxArchiveBytes: 100,
    maxArchiveEntries: 10,
  };

  async function chooseFile(testId: string, chosen: File) {
    const input = host!.querySelector<HTMLInputElement>(
      `[data-testid="${testId}"]`,
    )!;
    Object.defineProperty(input, 'files', {
      configurable: true,
      value: [chosen],
    });
    await act(async () =>
      input.dispatchEvent(new Event('change', { bubbles: true })),
    );
  }

  const r4Capabilities: WorkspaceExplorerCapabilities = {
    ...archiveCapabilities,
    archives: { version: 1, formats: ['tar', 'zip'] },
    trash: { version: 1, files: true, restore: true, empty: true },
  };
  const trashEntry = { trashId: 'trash-1', path: 'README.md', revision: 'source-revision-1', size: 18, trashedAt: '2026-10-04T20:00:00.000Z' };
  function dialogButton(name: string) {
    return [...document.querySelectorAll<HTMLButtonElement>('[role="dialog"] button')].find((button) => button.textContent?.trim() === name)!;
  }

  it('imports advertised ZIP, reports committed paths, and opens its nested firstFile in the mobile viewer', async () => {
    mobileViewport = true;
    let imported = false;
    const listTree = vi.fn(async ({ path }: { path?: string | null }) => path === 'bundle' ? directory('bundle', [file('bundle/first.txt')]) : directory('', imported ? [directory('bundle', [], false)] : []));
    const importArchive = vi.fn(async () => {
      imported = true;
      return { kind: 'archive' as const, archiveName: 'bundle.zip', extractedCount: 2, paths: ['bundle', 'bundle/first.txt'], firstFile: 'bundle/first.txt' };
    });
    const uploadFile = vi.fn();
    await renderExplorer({ listTree, readFile: async ({ path }) => filePreview(path), capabilities: r4Capabilities, importArchive, uploadFile });
    expect(host?.querySelector('[data-testid="preview-file"]')).toBeNull();
    expect(host?.querySelector<HTMLInputElement>('[data-testid="workspace-archive-import-input"]')?.accept).toBe('.tar,.zip');
    const archive = new File(['ZIP bytes delegated unchanged'], 'bundle.zip');
    await chooseFile('workspace-archive-import-input', archive);
    expect(importArchive).toHaveBeenCalledWith({ threadId: 'thread-1', workspaceId: 'workspace-1', path: '', file: archive, format: 'zip' });
    expect(uploadFile).not.toHaveBeenCalled();
    expect(host?.querySelector('[data-testid="preview-file"]')?.textContent).toContain('bundle/first.txt');
    expect(listTree).toHaveBeenCalledWith({ threadId: 'thread-1', workspaceId: 'workspace-1', path: 'bundle' });
    expect(host?.querySelector('[role="status"]')?.textContent).toContain('Committed 2 paths: bundle, bundle/first.txt');
  });

  it('downloads advertised ZIP from the folder row and root with exact paths and a visible result', async () => {
    const downloadNode = vi.fn();
    await renderExplorer({ ...createAdapter().adapter, capabilities: r4Capabilities, downloadNode });
    await act(async () => host?.querySelector<HTMLButtonElement>('[aria-label="Download src (ZIP)"]')?.click());
    expect(downloadNode).toHaveBeenLastCalledWith({ threadId: 'thread-1', workspaceId: 'workspace-1', path: 'src', kind: 'directory', format: 'zip' });
    expect(host?.querySelector('[role="status"]')?.textContent).toContain('Downloaded src as a ZIP archive');
    await act(async () => buttonNamed('Download Workspace (ZIP)')?.click());
    expect(downloadNode).toHaveBeenLastCalledWith({ threadId: 'thread-1', workspaceId: 'workspace-1', path: '', kind: 'directory', format: 'zip' });
    await act(async () => host?.querySelector<HTMLButtonElement>('[aria-label="Download src"]')?.click());
    expect(downloadNode).toHaveBeenLastCalledWith({ threadId: 'thread-1', workspaceId: 'workspace-1', path: 'src', kind: 'directory' });
    expect(host?.querySelector('[role="status"]')?.textContent).toContain('TAR archive');
  });

  it.each(['archives', 'trash'] as const)('fails visibly and disables operations for an unknown %s capability version', async (extension) => {
    const capabilities = { ...r4Capabilities, [extension]: { ...r4Capabilities[extension], version: 2 } } as unknown as WorkspaceExplorerCapabilities;
    const importArchive = vi.fn();
    const downloadNode = vi.fn();
    const trashFile = vi.fn();
    await renderExplorer({ ...createAdapter().adapter, capabilities, importArchive, downloadNode, trashFile });
    expect(host?.querySelector('[role="alert"]')?.textContent).toContain('capability is unsupported');
    expect(buttonNamed('Import TAR archive')?.disabled).toBe(true);
    expect(buttonNamed('Download Workspace (TAR)')?.disabled).toBe(true);
    expect(buttonNamed('Trash selected file')).toBeUndefined();
    expect(importArchive).not.toHaveBeenCalled();
    expect(trashFile).not.toHaveBeenCalled();
  });

  it('trashes and restores the selected file using the captured entry revision and original destination', async () => {
    let present = true;
    const trashFile = vi.fn(async () => { present = false; return trashEntry; });
    const listTrash = vi.fn(async () => ({ version: 1 as const, revision: present ? 'empty-list' : 'trashed-list', entries: present ? [] : [trashEntry] }));
    const restoreTrash = vi.fn(async () => { present = true; });
    const readFile = vi.fn(async ({ path }: { path: string }) => filePreview(path));
    await renderExplorer({ listTree: async () => directory('', present ? [file('README.md')] : []), readFile, capabilities: r4Capabilities, trashFile, listTrash, restoreTrash });
    expect(buttonNamed('Delete selected file…')).toBeUndefined();
    await act(async () => { buttonNamed('Trash selected file')?.click(); buttonNamed('Trash selected file')?.click(); });
    expect(trashFile).toHaveBeenCalledTimes(1);
    expect(trashFile).toHaveBeenCalledWith({ threadId: 'thread-1', workspaceId: 'workspace-1', path: 'README.md', operationId: expect.any(String) });
    expect(host?.querySelector('[role="status"]')?.textContent).toContain('Moved README.md to trash');
    await act(async () => buttonNamed('Trash')?.click());
    expect(document.querySelector('[role="dialog"]')?.textContent).toContain('Immutable artifacts, artifact downloads and thread history are retained');
    await act(async () => document.querySelector<HTMLButtonElement>('[aria-label="Restore README.md"]')?.click());
    expect(restoreTrash).toHaveBeenCalledWith({ threadId: 'thread-1', workspaceId: 'workspace-1', trashId: 'trash-1', expectedRevision: 'source-revision-1', expectedDestinationRevision: null, operationId: expect.any(String) });
    expect(host?.querySelector('[data-testid="preview-file"]')?.textContent).toContain('README.md');
    expect(document.querySelector('[role="dialog"] [role="status"]')?.textContent).toContain('Restored README.md');
  });

  it('keeps captured empty-trash revision, confirmation and operation identity across rejected retries', async () => {
    const sourceList = { version: 1 as const, revision: 'captured-list-revision', entries: [{ ...trashEntry }] };
    const listTrash = vi.fn(async () => sourceList);
    const emptyTrash = vi.fn().mockRejectedValueOnce(new Error('FILE_CONFLICT: trash changed; refresh the list.')).mockResolvedValue(undefined);
    await renderExplorer({ ...createAdapter().adapter, capabilities: r4Capabilities, listTrash, emptyTrash });
    await act(async () => buttonNamed('Trash')?.click());
    await act(async () => dialogButton('Empty trash…').click());
    expect(document.querySelector('[role="dialog"]')?.textContent).toContain('This cannot be undone');
    // A later host update cannot replace the visible confirmation's snapshot.
    sourceList.revision = 'new-unreviewed-revision';
    await act(async () => dialogButton('Empty trash permanently').click());
    expect(listTrash).toHaveBeenCalledTimes(1);
    expect(document.querySelector('[role="dialog"] [role="alert"]')?.textContent).toContain('FILE_CONFLICT');
    const first = emptyTrash.mock.calls[0]![0];
    expect(first).toEqual({ threadId: 'thread-1', workspaceId: 'workspace-1', expectedRevision: 'captured-list-revision', operationId: expect.any(String) });
    await act(async () => dialogButton('Empty trash permanently').click());
    expect(emptyTrash.mock.calls[1]![0]).toEqual(first);
    expect(document.querySelector('[role="dialog"] [role="status"]')?.textContent).toContain('Trash emptied permanently');
    expect(listTrash).toHaveBeenCalledTimes(2);
  });

  it.each(['throw', 'reject'])('surfaces trash %s failure without permanent deletion fallback and preserves operation identity', async (failure) => {
    const trashFile = vi.fn<NonNullable<ThreadWorkspaceAdapter['trashFile']>>(() => { if (failure === 'throw') throw new Error('TURN_BUSY: file operation unavailable.'); return Promise.reject(new Error('TURN_BUSY: file operation unavailable.')); });
    const deleteFile = vi.fn();
    await renderExplorer({ ...createAdapter().adapter, capabilities: r4Capabilities, trashFile, listTrash: async () => ({ version: 1, revision: 'list-r1', entries: [] }), deleteFile });
    await act(async () => buttonNamed('Trash selected file')?.click());
    expect(host?.querySelector('[role="alert"]')?.textContent).toContain('TURN_BUSY');
    const first = trashFile.mock.calls[0]![0];
    await act(async () => buttonNamed('Trash selected file')?.click());
    expect(trashFile.mock.calls[1]![0]).toEqual(first);
    await act(async () => host?.querySelector<HTMLButtonElement>('[aria-label="Refresh workspace"]')?.click());
    await act(async () => buttonNamed('Trash selected file')?.click());
    expect(trashFile.mock.calls[2]![0]?.operationId).not.toBe((first as { operationId?: string }).operationId);
    expect(deleteFile).not.toHaveBeenCalled();
    expect(buttonNamed('Delete selected file…')).toBeUndefined();
  });

  it('disables unadvertised trash mutations and fences a late list response after a thread switch', async () => {
    const list = deferred<import('../../adapters').ThreadWorkspaceTrashList>();
    const trashFile = vi.fn();
    const restoreTrash = vi.fn();
    const emptyTrash = vi.fn();
    const adapter = { ...createAdapter().adapter, capabilities: { ...r4Capabilities, trash: { version: 1 as const, files: false, restore: false, empty: false } }, listTrash: () => list.promise, trashFile, restoreTrash, emptyTrash };
    await renderExplorer(adapter);
    expect(buttonNamed('Trash selected file')?.disabled).toBe(true);
    await act(async () => buttonNamed('Trash')?.click());
    await renderExplorer(adapter, null, { ...detail, thread: { ...detail.thread, id: 'thread-2' } });
    await act(async () => list.resolve({ version: 1, revision: 'old-thread-list', entries: [trashEntry] }));
    expect(document.querySelector('[role="dialog"]')).toBeNull();
    expect(trashFile).not.toHaveBeenCalled();
    expect(restoreTrash).not.toHaveBeenCalled();
    expect(emptyTrash).not.toHaveBeenCalled();
  });

  async function filterWorkspace(query: string) {
    await act(async () => host?.querySelector<HTMLButtonElement>('[aria-label="Filter workspace"]')?.click());
    const input = host!.querySelector<HTMLInputElement>('input[placeholder]')!;
    await act(async () => {
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')!.set!.call(input, query);
      input.dispatchEvent(new Event('input', { bubbles: true }));
    });
  }

  it('expands a filtered native directory to reveal its loaded children, then finds a child by name', async () => {
    const path = 'W11-20261004-round3-folder-41588b22';
    const listTree = vi.fn(async ({ path: requested }: { path?: string | null }) =>
      requested === path ? directory(path, [file(`${path}/marker.txt`)]) : directory('', [directory(path, [], false)]),
    );
    await renderExplorer({ listTree, readFile: async ({ path }) => filePreview(path) });
    await filterWorkspace('folder-41588b22');
    const row = () => host!.querySelector<HTMLElement>(`[role="treeitem"][data-explorer-path="${path}"]`)!;
    expect(row()).not.toBeNull();
    expect(row().getAttribute('aria-expanded')).toBe('false');
    await act(async () => row().querySelector<HTMLButtonElement>(`[aria-label="Expand ${path}"]`)!.click());
    expect(listTree).toHaveBeenCalledWith({ threadId: 'thread-1', workspaceId: 'workspace-1', path });
    expect(host!.querySelector(`[data-explorer-path="${path}/marker.txt"]`)).not.toBeNull();
    await filterWorkspace('marker.txt');
    expect(host!.querySelector(`[data-explorer-path="${path}/marker.txt"]`)).not.toBeNull();
    expect(row().getAttribute('aria-expanded')).toBe('true');
    await filterWorkspace('no-such-file');
    expect(host!.querySelector(`[data-explorer-path="${path}/marker.txt"]`)).toBeNull();
  });

  it('disables folder/root downloads until per-thread capability discovery finishes', async () => {
    const discovery = deferred<WorkspaceExplorerCapabilities>();
    const adapter: WorkspaceExplorerAdapter = {
      ...createAdapter().adapter,
      getCapabilities: vi.fn(() => discovery.promise),
      downloadNode: vi.fn(),
    };
    await renderExplorer(adapter);
    expect(buttonNamed('Download Workspace (TAR)')?.disabled).toBe(true);
    expect(
      host?.querySelector<HTMLButtonElement>('[aria-label="Download src"]')
        ?.disabled,
    ).toBe(true);
    await act(async () => discovery.resolve(archiveCapabilities));
    expect(buttonNamed('Download Workspace (TAR)')?.disabled).toBe(false);
    await act(async () => buttonNamed('Download Workspace (TAR)')?.click());
    expect(adapter.downloadNode).toHaveBeenCalledWith({
      threadId: 'thread-1',
      workspaceId: 'workspace-1',
      path: '',
      kind: 'directory',
    });
    expect(host?.querySelector('[role="status"]')?.textContent).toContain(
      'TAR archive',
    );
  });

  it.each(['throw', 'reject'])(
    'shows directory download %s errors while the viewer is collapsed',
    async (failure) => {
      const downloadNode = vi.fn(() => {
        if (failure === 'throw')
          throw new Error('Archive conflict: refresh and retry.');
        return Promise.reject(
          new Error('Archive conflict: refresh and retry.'),
        );
      });
      await renderExplorer({
        ...createAdapter().adapter,
        capabilities: archiveCapabilities,
        downloadNode,
      } as WorkspaceExplorerAdapter);
      await act(async () =>
        host
          ?.querySelector<HTMLButtonElement>('[aria-label="Hide Editor"]')
          ?.click(),
      );
      await act(async () => buttonNamed('Download Workspace (TAR)')?.click());
      expect(host?.querySelector('[role="alert"]')?.textContent).toContain(
        'Archive conflict',
      );
      expect(downloadNode).toHaveBeenCalledTimes(1);
    },
  );

  it('keeps directory downloads disabled for handler-only connections', async () => {
    const downloadNode = vi.fn();
    await renderExplorer({ ...createAdapter().adapter, downloadNode });
    const button = host?.querySelector<HTMLButtonElement>(
      '[aria-label="Download src"]',
    );
    expect(button?.disabled).toBe(true);
    await act(async () => button?.click());
    expect(downloadNode).not.toHaveBeenCalled();
    expect(
      host?.querySelector<HTMLButtonElement>(
        '[aria-label="Download README.md"]',
      )?.disabled,
    ).toBe(false);
  });

  it('resets capabilities on thread change and ignores old discovery results', async () => {
    const first = deferred<WorkspaceExplorerCapabilities>();
    const second = deferred<WorkspaceExplorerCapabilities>();
    const adapter: WorkspaceExplorerAdapter = {
      ...createAdapter().adapter,
      downloadNode: vi.fn(),
      getCapabilities: vi.fn((id) =>
        id === 'thread-1' ? first.promise : second.promise,
      ),
    };
    await renderExplorer(adapter);
    await act(async () =>
      root?.render(
        <GraphWorkspaceExplorer
          activeView="chat"
          detail={{ ...detail, thread: { ...detail.thread, id: 'thread-2' } }}
          artifacts={[]}
          plugins={createDefaultPluginContextValue()}
          status={null}
          workspaceAdapter={adapter}
        />,
      ),
    );
    await act(async () => first.resolve(archiveCapabilities));
    expect(buttonNamed('Download Workspace (TAR)')?.disabled).toBe(true);
    await act(async () =>
      second.resolve({
        ...archiveCapabilities,
        download: { file: true, directory: false },
        archiveImport: false,
      }),
    );
    expect(buttonNamed('Download Workspace (TAR)')?.disabled).toBe(true);
  });

  it('shows synchronous capability errors and retries discovery on refresh', async () => {
    const getCapabilities = vi.fn(() => {
      throw new Error('Capability discovery unavailable');
    });
    await renderExplorer({
      ...createAdapter().adapter,
      getCapabilities,
    } as WorkspaceExplorerAdapter);
    expect(host?.querySelector('[role="alert"]')?.textContent).toContain(
      'Capability discovery unavailable',
    );
    await act(async () =>
      host
        ?.querySelector<HTMLButtonElement>('[aria-label="Refresh workspace"]')
        ?.click(),
    );
    expect(getCapabilities).toHaveBeenCalledTimes(2);
  });

  it('imports TAR separately from upload, selects its first extracted file, and keeps inputs after collapse', async () => {
    const importArchive = vi.fn(async () => ({
      kind: 'archive' as const,
      archiveName: 'bundle.tar',
      extractedCount: 1,
      paths: ['README.md'],
    }));
    const uploadFile = vi.fn();
    const { adapter, listTree } = createAdapter();
    await renderExplorer({
      ...adapter,
      capabilities: archiveCapabilities,
      importArchive,
      uploadFile,
    } as WorkspaceExplorerAdapter);
    await act(async () =>
      host
        ?.querySelector<HTMLButtonElement>('[aria-label="Hide Editor"]')
        ?.click(),
    );
    const archive = new File(['tar bytes'], 'bundle.tar');
    await chooseFile('workspace-archive-import-input', archive);
    expect(importArchive).toHaveBeenCalledWith({
      threadId: 'thread-1',
      workspaceId: 'workspace-1',
      path: '',
      file: archive,
    });
    expect(uploadFile).not.toHaveBeenCalled();
    expect(
      listTree.mock.calls.filter(([request]) => request.path === '').length,
    ).toBe(2);
    expect(host?.querySelector('[role="status"]')?.textContent).toContain(
      'Imported bundle.tar',
    );
  });

  it.each([
    ['bundle.zip', 'uncompressed .tar'],
    ['large.tar', 'byte import limit'],
  ])(
    'rejects invalid or oversized archive %s visibly before transport',
    async (name, message) => {
      const importArchive = vi.fn();
      await renderExplorer({
        ...createAdapter().adapter,
        capabilities: { ...archiveCapabilities, maxArchiveBytes: 3 },
        importArchive,
      } as WorkspaceExplorerAdapter);
      await chooseFile(
        'workspace-archive-import-input',
        new File([name === 'large.tar' ? 'x'.repeat(12000) : '1234'], name),
      );
      expect(importArchive).not.toHaveBeenCalled();
      expect(host?.querySelector('[role="alert"]')?.textContent).toContain(
        message,
      );
    },
  );

  it.each([
    'FILE_CONFLICT: workspace changed. Retry import.',
    'INVALID_ARCHIVE: symlinks and traversal rejected.',
    'ARCHIVE_LIMIT: expanded size or entry count exceeded.',
  ])(
    'shows server archive failure %s without success or refresh',
    async (message) => {
      const { adapter, listTree } = createAdapter();
      const importArchive = vi.fn(() => Promise.reject(new Error(message)));
      await renderExplorer({
        ...adapter,
        capabilities: archiveCapabilities,
        importArchive,
      } as WorkspaceExplorerAdapter);
      await chooseFile(
        'workspace-archive-import-input',
        new File(['1234'], 'bundle.tar'),
      );
      expect(host?.querySelector('[role="alert"]')?.textContent).toContain(
        message,
      );
      expect(host?.querySelector('[role="status"]')).toBeNull();
      expect(listTree).toHaveBeenCalledTimes(1);
    },
  );

  it.each(['throw', 'reject'])(
    'reports clipboard %s failures visibly',
    async (failure) => {
      Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: {
          writeText: vi.fn(() => {
            if (failure === 'throw') throw new Error('Clipboard denied');
            return Promise.reject(new Error('Clipboard denied'));
          }),
        },
      });
      await renderExplorer(createAdapter().adapter);
      await act(async () =>
        host
          ?.querySelector<HTMLButtonElement>(
            '[aria-label="Copy path for README.md"]',
          )
          ?.click(),
      );
      expect(host?.querySelector('[role="alert"]')?.textContent).toContain(
        'Clipboard denied',
      );
    },
  );

  it('reports a synchronous upload picker failure without an uncaught exception', async () => {
    await renderExplorer({
      ...createAdapter().adapter,
      uploadFile: vi.fn(),
      pickUploadFile: () => {
        throw new Error('Picker failed');
      },
    });
    await act(async () => buttonNamed('Upload file')?.click());
    expect(host?.querySelector('[role="alert"]')?.textContent).toContain(
      'Picker failed',
    );
  });

  it('confirms permanent file deletion and forwards a new move destination', async () => {
    const deleteFile = vi.fn(async () => {});
    const moveFile = vi.fn(async () => {});
    await renderExplorer({
      ...createAdapter().adapter,
      capabilities: archiveCapabilities,
      deleteFile,
      moveFile,
    } as WorkspaceExplorerAdapter);
    await act(async () => buttonNamed('Delete selected file…')?.click());
    expect(host?.querySelector('[role="dialog"]')?.textContent).toContain(
      'no reversible trash',
    );
    expect(deleteFile).not.toHaveBeenCalled();
    await act(async () => buttonNamed('Delete permanently')?.click());
    expect(deleteFile).toHaveBeenCalledWith({
      threadId: 'thread-1',
      workspaceId: 'workspace-1',
      path: 'README.md',
    });
    await act(async () => buttonNamed('Move selected file')?.click());
    const input = host?.querySelector<HTMLInputElement>(
      '[aria-label="New file path"]',
    );
    await act(async () => {
      Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        'value',
      )?.set?.call(input, 'renamed.md');
      input?.dispatchEvent(new Event('input', { bubbles: true }));
    });
    await act(async () => buttonNamed('Move file')?.click());
    expect(moveFile).toHaveBeenCalledWith({
      threadId: 'thread-1',
      workspaceId: 'workspace-1',
      path: 'README.md',
      destination: 'renamed.md',
    });
  });

  it.each(['xyz', 'sdf', 'mol', 'cif', 'pdb'])(
    'loads all %s pages before publishing a molecular preview',
    async (extension) => {
      const path = `structure.${extension}`;
      const tail = deferred<ThreadWorkspaceFilePreview>();
      const readFile = vi.fn<ThreadWorkspaceAdapter['readFile']>(
        async ({ offset }) =>
          offset
            ? tail.promise
            : {
                ...filePreview(path),
                content: 'first frame\n',
                size: 48_000,
                truncated: true,
                nextOffset: 24_000,
              },
      );
      await renderExplorer({
        listTree: vi.fn(async () => directory('', [file(path)])),
        readFile,
      });
      await vi.waitFor(() => expect(readFile).toHaveBeenCalledTimes(2));
      expect(readFile.mock.calls[1]?.[0]).toMatchObject({
        path,
        offset: 24_000,
        limit: 256 * 1024,
      });
      expect(
        host
          ?.querySelector('[data-testid="preview-file"]')
          ?.getAttribute('data-content'),
      ).toBeNull();
      await act(async () =>
        tail.resolve({
          ...filePreview(path),
          content: 'last frame\n',
          size: 48_000,
          nextOffset: 48_000,
        }),
      );
      await vi.waitFor(() =>
        expect(
          host
            ?.querySelector('[data-testid="preview-file"]')
            ?.getAttribute('data-content'),
        ).toBe('first frame\nlast frame\n'),
      );
    },
  );

  it('offers download instead of a partial molecular preview above the size limit', async () => {
    const path = 'large.xyz';
    const readFile = vi.fn<ThreadWorkspaceAdapter['readFile']>(async () => ({
      ...filePreview(path),
      size: 11 * 1024 * 1024,
      truncated: true,
      nextOffset: 24_000,
    }));
    await renderExplorer({
      listTree: vi.fn(async () => directory('', [file(path)])),
      readFile,
    });
    await vi.waitFor(() =>
      expect(
        host
          ?.querySelector('[data-testid="preview-file"]')
          ?.getAttribute('data-download-only'),
      ).toBe('true'),
    );
    expect(readFile).toHaveBeenCalledTimes(1);
    expect(
      host
        ?.querySelector('[data-testid="preview-file"]')
        ?.getAttribute('data-content'),
    ).toBeNull();
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
    const targetRoot = directory('', [
      directory('src', [], false),
      file('WRONG.md'),
    ]);
    let rootReads = 0;
    const readFile = vi.fn<ThreadWorkspaceAdapter['readFile']>(
      async ({ path }) => filePreview(path),
    );
    const adapter: ThreadWorkspaceAdapter = {
      listTree: vi.fn(async ({ path }) =>
        path === 'src'
          ? directory('src', [file('src/index.ts')])
          : ++rootReads === 1
            ? staleRoot.promise
            : targetRoot,
      ),
      readFile,
    };
    await renderExplorer(adapter);
    await renderExplorer(adapter, {
      path: '/workspace/demo/src/index.ts',
      requestId: 1,
    });
    await vi.waitFor(() =>
      expect(
        host?.querySelector('[data-testid="preview-file"]')?.textContent,
      ).toBe('src/index.ts'),
    );
    await act(async () => staleRoot.resolve(directory('', [file('OLDER.md')])));
    expect(
      host?.querySelector('[data-testid="preview-file"]')?.textContent,
    ).toBe('src/index.ts');
    expect(readFile.mock.calls.map(([input]) => input.path)).toEqual([
      'src/index.ts',
    ]);
  });

  it('the newest link wins when ancestor loads finish out of order', async () => {
    const slow = deferred<ThreadWorkspaceTreeNode>();
    const readFile = vi.fn<ThreadWorkspaceAdapter['readFile']>(
      async ({ path }) => filePreview(path),
    );
    const adapter: ThreadWorkspaceAdapter = {
      listTree: vi.fn(async ({ path }) =>
        path === 'src'
          ? slow.promise
          : path === 'docs'
            ? directory('docs', [file('docs/new.md')])
            : directory('', [
                directory('src', [], false),
                directory('docs', [], false),
              ]),
      ),
      readFile,
    };
    await renderExplorer(adapter, { path: 'src/old.md', requestId: 1 });
    await renderExplorer(adapter, { path: 'docs/new.md', requestId: 2 });
    await vi.waitFor(() =>
      expect(
        host?.querySelector('[data-testid="preview-file"]')?.textContent,
      ).toBe('docs/new.md'),
    );
    await act(async () => slow.resolve(directory('src', [file('src/old.md')])));
    expect(
      host?.querySelector('[data-testid="preview-file"]')?.textContent,
    ).toBe('docs/new.md');
    expect(readFile.mock.calls.map(([input]) => input.path)).toEqual([
      'docs/new.md',
    ]);
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
    expect(host?.querySelector('[aria-label="Show Explorer"]')).toBeTruthy();

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

// @vitest-environment jsdom
import { act, useMemo } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type {
  ThreadWorkspaceAdapter,
  ThreadWorkspaceFilePreview,
} from '../../../adapters';
import { useWorkspaceFilePreview } from './useWorkspaceFilePreview';

function preview(
  path = 'notes.txt',
  extra: Partial<ThreadWorkspaceFilePreview> = {},
): ThreadWorkspaceFilePreview {
  return {
    path,
    name: path,
    content: 'first',
    language: 'text',
    size: 10,
    truncated: false,
    nextOffset: 5,
    ...extra,
  };
}
function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((r) => {
    resolve = r;
  });
  return { promise, resolve };
}
let host: HTMLDivElement;
let root: Root;
let result: ReturnType<typeof useWorkspaceFilePreview>;
let adapter: ThreadWorkspaceAdapter;
const onError = vi.fn();
const refreshTree = vi.fn(async () => {});
function Harness({ threadId, path }: { threadId: string; path: string }) {
  const identity = useMemo(() => ({ threadId, workspaceId: null }), [threadId]);
  result = useWorkspaceFilePreview({
    activeNode: {
      id: `workspace:${path}`,
      path,
      name: path,
      kind: 'file',
      children: [],
    },
    adapter,
    identity,
    onError,
    refreshTree,
  });
  return <span>{result.previewFile?.content}</span>;
}
async function render(threadId = 'one', path = 'notes.txt') {
  await act(async () =>
    root.render(<Harness threadId={threadId} path={path} />),
  );
}
beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  host = document.createElement('div');
  document.body.append(host);
  root = createRoot(host);
  onError.mockReset();
  refreshTree.mockClear();
  adapter = {
    listTree: vi.fn(),
    readFile: vi.fn(async ({ path }) => preview(path)),
  };
});
afterEach(() => {
  act(() => root.unmount());
  host.remove();
});

describe('workspace preview recovery', () => {
  it('catches load-more rejections and retains the current content', async () => {
    adapter.readFile = vi.fn(async ({ offset }) => {
      if (offset) throw new Error('FILE_CONFLICT: reopen this file.');
      return preview('notes.txt', { truncated: true });
    });
    await render();
    await act(async () => result.loadMore());
    expect(onError).toHaveBeenLastCalledWith(
      'FILE_CONFLICT: reopen this file.',
    );
    expect(result.previewFile?.content).toBe('first');
    expect(result.loadingMore).toBe(false);
  });
  it('ignores a load-more result after switching threads with the same filename', async () => {
    const chunk = deferred<ThreadWorkspaceFilePreview>();
    adapter.readFile = vi.fn(async ({ threadId, offset }) =>
      offset
        ? chunk.promise
        : preview('notes.txt', { content: threadId, truncated: true }),
    );
    await render();
    let pending!: Promise<void>;
    await act(async () => {
      pending = result.loadMore();
    });
    await render('two');
    await act(async () => {
      chunk.resolve(preview('notes.txt', { content: 'stale', nextOffset: 10 }));
      await pending;
    });
    expect(result.previewFile?.content).toBe('two');
    expect(result.loadingMore).toBe(false);
  });
  it('deduplicates load-more clicks and reports a stalled read', async () => {
    const chunk = deferred<ThreadWorkspaceFilePreview>();
    adapter.readFile = vi.fn(async ({ offset }) =>
      offset ? chunk.promise : preview('notes.txt', { truncated: true }),
    );
    await render();
    let pending!: Promise<void>;
    await act(async () => {
      pending = result.loadMore();
      void result.loadMore();
    });
    expect(adapter.readFile).toHaveBeenCalledTimes(2);
    await act(async () => {
      chunk.resolve(preview('notes.txt', { truncated: true }));
      await pending;
    });
    expect(onError).toHaveBeenLastCalledWith(
      expect.stringContaining('made no progress'),
    );
  });
  it('does not publish a save result into the next thread', async () => {
    const write = deferred<void>();
    adapter.writeFile = vi.fn(() => write.promise);
    adapter.readFile = vi.fn(async ({ threadId }) =>
      preview('notes.txt', { content: threadId }),
    );
    await render();
    let pending!: Promise<void>;
    await act(async () => {
      pending = result.saveFile({ path: 'notes.txt', content: 'changed' });
    });
    await render('two');
    await act(async () => {
      write.resolve();
      await pending;
    });
    expect(result.previewFile?.content).toBe('two');
    expect(refreshTree).not.toHaveBeenCalled();
  });
  it('propagates revision conflicts to the editor and reloads latest bytes', async () => {
    adapter.writeFile = vi.fn(async () => {
      throw new Error('FILE_CONFLICT');
    });
    await render();
    await act(async () => {
      await expect(
        result.saveFile({ path: 'notes.txt', content: 'draft' }),
      ).rejects.toThrow('FILE_CONFLICT');
    });
    expect(result.previewFile?.content).toBe('first');
    adapter.readFile = vi.fn(async () =>
      preview('notes.txt', { content: 'latest' }),
    );
    await act(async () => result.reloadFile());
    expect(result.previewFile?.content).toBe('latest');
  });
});

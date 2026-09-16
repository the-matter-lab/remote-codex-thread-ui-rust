import type { ThreadWorkspaceAdapter } from '@remote-codex/thread-ui';
type ThreadWorkspaceTreeNode = Awaited<ReturnType<ThreadWorkspaceAdapter['listTree']>>;

export async function rpc<T>(method: string, params: Record<string, unknown> = {}): Promise<T> {
  const response = await fetch('/rpc', {method: 'POST', headers: {'content-type': 'application/json'},
    body: JSON.stringify({jsonrpc: '2.0', id: crypto.randomUUID(), method, params})});
  if (!response.ok) throw new Error(`App-server connection failed (${response.status})`);
  const value = await response.json();
  if (value.error) throw Object.assign(new Error(value.error.message), {code: value.error.data?.code});
  return value.result as T;
}

export interface AppEvent {method: string; params: {threadId: string; seq: number; [key: string]: unknown}}
const listeners = new Set<(event: AppEvent) => void>();
export function subscribe(threadId: string, afterSeq: number, onEvent: (event: AppEvent) => void,
  onConnection: (connected: boolean) => void): () => void {
  let closed = false;
  let cursor = afterSeq;
  let socket: WebSocket;
  let timer: ReturnType<typeof setTimeout>;
  const connect = () => {
    socket = new WebSocket(`${location.protocol === 'https:' ? 'wss:' : 'ws:'}//${location.host}/ws`);
    socket.onopen = () => {
      socket.send(JSON.stringify({jsonrpc: '2.0', id: 'subscribe', method: 'thread/subscribe', params: {threadId, afterSeq: cursor}}));
      onConnection(true);
    };
    socket.onmessage = message => {
      const event = JSON.parse(message.data) as AppEvent & {error?: {message: string}};
      if (event.error) { socket.close(); return; }
      if (!event.method || event.params.threadId !== threadId || event.params.seq <= cursor) return;
      cursor = event.params.seq;
      onEvent(event);
      for (const listener of listeners) listener(event);
    };
    socket.onerror = () => socket.close();
    socket.onclose = () => { onConnection(false); if (!closed) timer = setTimeout(connect, 1000); };
  };
  connect();
  return () => { closed = true; clearTimeout(timer); socket.close(); };
}

const revisions = new Map<string, string>();
export const fileUrl = (threadId: string, path: string) => `/files/${encodeURIComponent(threadId)}?path=${encodeURIComponent(path)}`;
export const artifactUrl = (threadId: string, id: string) => `/artifacts/${encodeURIComponent(threadId)}/${encodeURIComponent(id)}`;
export async function upload(threadId: string, path: string, file: File) {
  const response = await fetch(fileUrl(threadId, path), {method: 'PUT', body: file});
  const saved = await response.json();
  if (!response.ok) throw new Error(saved.message || 'Upload failed');
  revisions.set(`${threadId}:${path}`, saved.revision);
  return saved as {path: string; name: string; size: number; revision: string};
}

export const workspace: ThreadWorkspaceAdapter = {
  async listTree({threadId, path}) {
    const result = await rpc<ThreadWorkspaceTreeNode & {nextCursor: number | null}>('file/list', {threadId, path: path ?? ''});
    while (result.nextCursor !== null) {
      const page = await rpc<typeof result>('file/list', {threadId, path: path ?? '', cursor: result.nextCursor});
      result.children = [...(result.children ?? []), ...(page.children ?? [])];
      result.nextCursor = page.nextCursor;
    }
    return {...result, truncated: false};
  },
  async readFile({threadId, path, offset, limit}) {
    const file = await rpc<{path: string; name: string; content: string; language: string; size: number; truncated: boolean; nextOffset: number; revision: string}>('file/read', {threadId, path, offset, limit});
    if (offset && revisions.get(`${threadId}:${path}`) !== file.revision) {
      throw new Error('This file changed while loading. Close and reopen it to read the current version.');
    }
    revisions.set(`${threadId}:${path}`, file.revision);
    return file;
  },
  getRawFileUrl: ({threadId, path}) => fileUrl(threadId, path),
  async uploadFile({threadId, path, file}) { return {kind: 'file', file: await upload(threadId, path, file)}; },
  async writeFile({threadId, path, content}) {
    const expectedRevision = revisions.get(`${threadId}:${path}`);
    if (!expectedRevision) throw new Error('Open the current file before saving edits');
    const saved = await rpc<{revision: string}>('file/write', {threadId, path, content, expectedRevision}).catch(reason => {
      if (reason.code === 'FILE_CONFLICT') throw new Error('This file changed since you opened it. Your edits are still here; copy them, then close and reopen the file before saving.');
      throw reason;
    });
    revisions.set(`${threadId}:${path}`, saved.revision);
  },
  downloadNode({threadId, path, kind}) {
    if (kind === 'directory') throw new Error('Download individual files; directory archives are not available yet');
    const anchor = document.createElement('a'); anchor.href = `${fileUrl(threadId, path)}&download=1`; anchor.download = path.split('/').at(-1) ?? 'file'; anchor.click();
  },
  subscribeWorkspaceChanged({threadId}, onChanged) {
    const listener = (event: AppEvent) => { if (event.params.threadId === threadId && event.method === 'workspace/changed') onChanged(); };
    listeners.add(listener); return () => { listeners.delete(listener); };
  },
};

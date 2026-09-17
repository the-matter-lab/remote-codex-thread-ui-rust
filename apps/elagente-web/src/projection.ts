import type { AgentProviderCapabilitiesDto, ThreadDetailDto, ThreadDto, ThreadHistoryItemDto } from '@remote-codex/shared';
import { artifactUrl } from './api';

export interface Agent {id: string; name: string; release: string; mode: string; capabilities: {images: boolean; files: boolean; interrupt: boolean}}
export interface NativeThread {id: string; agentId: string; release: string; title: string; status: string; activeTurnId: string | null; createdAt: string; updatedAt: string; options: {model?: string}}
export interface Artifact {id: string; path: string; name: string; kind: string; checksum: string; createdAt: string}
export interface Interaction {id: string; turnId: string; status: string; title: string; kind: string; request: {action?: string; artifactId?: string; revision?: string; path?: string; [key: string]: unknown}}
export interface Snapshot {thread: NativeThread; seq: number; turns: {id: string; status: string; error: string | null; startedAt: string; completedAt: string | null; items: (Omit<ThreadHistoryItemDto, 'artifact'> & {artifact?: Artifact})[]}[]; interactions: Interaction[]; artifacts: Artifact[]; executions: {id: string; status: string; purpose?: string; cancelRequested?: boolean}[]}
export const capabilities: AgentProviderCapabilitiesDto = {
  sessions: {list: true, read: true, resume: true, importLocal: false},
  turns: {start: true, streamInput: false, steer: false, interrupt: true, compact: false},
  branching: {fork: false, forkAt: false, hardRollback: false, resumeAt: false, rewindFiles: false},
  controls: {planMode: false, permissionRequests: true, sandboxMode: false, performanceMode: false, goals: false},
  management: {models: false, mcpStatus: false, skills: false, hooks: false, hookTrust: false, hostConfigFiles: false, providerSettings: false},
  usage: {contextWindow: false, tokenUsage: false, costUsd: false},
};
export function projectThread(thread: NativeThread): ThreadDto {
  return {id: thread.id, workspaceId: thread.id, provider: 'elagente', providerSessionId: thread.id, source: 'supervisor',
    title: thread.title, model: thread.options.model ?? null, reasoningEffort: null, collaborationMode: 'default', approvalMode: 'guarded',
    status: thread.status === 'recoveryRequired' ? 'recovering' : thread.activeTurnId ? 'running' : 'idle', summaryText: thread.agentId,
    lastError: null, activeTurnId: thread.activeTurnId, isLoaded: true, isPinned: false, createdAt: thread.createdAt, updatedAt: thread.updatedAt,
    lastTurnStartedAt: null, lastTurnCompletedAt: null};
}
export function project(snapshot: Snapshot, agent?: Agent): ThreadDetailDto {
  const thread = projectThread(snapshot.thread);
  return {thread, workspace: {id: thread.id, hostId: 'elagente', label: snapshot.thread.agentId, absPath: '.', isFavorite: false, createdAt: thread.createdAt, lastOpenedAt: null},
    workspacePathStatus: 'present', pendingRequests: [], pendingSteers: [],
    turns: snapshot.turns.map(turn => ({...turn,
      model: agent?.mode && agent.mode !== 'native' ? agent.mode === 'adapter-contract-test' ? 'Contract fixture' : 'Offline validation' : snapshot.thread.options.model ?? 'Agent default',
      status: turn.status === 'recoveryRequired' ? 'recovering' : ['completed', 'failed', 'interrupted'].includes(turn.status) ? turn.status as 'completed' | 'failed' | 'interrupted' : 'inProgress',
      items: turn.items.map(item => {
        const {artifact, ...rest} = item;
        if (!artifact) return rest;
        return {...rest, artifact: {id: artifact.id, type: artifact.kind, pluginId: artifact.kind === 'chem.structure' ? 'elagente.xyz' : '', title: artifact.name, workspacePath: artifact.path, createdAt: artifact.createdAt,
          payload: {url: artifactUrl(thread.id, artifact.id), checksum: artifact.checksum, name: artifact.name, format: artifact.name.endsWith('.extxyz') ? 'extxyz' : 'xyz'}}};
      }),
    }))};
}

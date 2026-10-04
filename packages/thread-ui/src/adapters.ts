import type {
  ShellEventEnvelope,
  ShellSessionDto,
  ThreadDto,
  ThreadHistoryItemDetailDto,
  ThreadShellStateDto,
  ThreadTurnDto,
  UpdateShellInput,
  UpdateThreadSettingsInput,
} from '@remote-codex/shared';
import type { ReactNode } from 'react';
import type { SendPromptInput } from './types';

export interface ThreadTimelineAdapter {
  workspaceRootPath?: string | undefined;
  getImageAssetUrl?: (input: { threadId: string; path: string }) => string;
  resolveHref?: (href: string) => string;
  onOpenLinkedThread?: (threadId: string) => void;
  onOpenWorkspaceFile?: (input: { path: string; line?: number }) => void;
  cancelPendingSteer?: (
    threadId: string,
    pendingSteerId: string,
  ) => Promise<void> | void;
  onLoadHistoryItemDetail?: (
    itemId: string,
  ) => Promise<ThreadHistoryItemDetailDto> | ThreadHistoryItemDetailDto;
  onLoadTurnDetail?: (
    turnId: string,
  ) => Promise<ThreadTurnDto> | ThreadTurnDto;
}

export interface ShellSocketHandlers {
  onConnected?: (event: unknown) => void;
  onShellEvent?: (event: ShellEventEnvelope) => void;
}

export interface ShellSocketConnection {
  socket: WebSocket;
  send(message: unknown): void;
  close?: () => void;
}

export interface ThreadWorkspaceTreeNode {
  name: string;
  path: string;
  kind: 'file' | 'directory';
  size?: number;
  hasChildren?: boolean;
  childrenLoaded?: boolean;
  truncated?: boolean;
  children?: ThreadWorkspaceTreeNode[];
}

export interface ThreadWorkspaceFilePreview {
  path: string;
  name: string;
  content: string;
  language: string;
  size: number;
  truncated: boolean;
  nextOffset: number;
}

export type ThreadWorkspaceUploadResult =
  | {
      kind: 'file';
      file: {
        path: string;
        name: string;
        size: number;
      };
    }
  | {
      kind: 'archive';
      archiveName: string;
      extractedCount: number;
      paths: string[];
    };

export interface ThreadWorkspaceCapabilities {
  download: {file: boolean; directory: false | 'tar'};
  archiveImport: false | 'tar';
  create?: boolean;
  mkdir?: boolean;
  delete?: 'file' | false;
  move?: 'file-new-destination' | false;
  maxFileBytes?: number;
  maxArchiveBytes?: number;
  maxArchiveEntries?: number;
}

export interface ThreadWorkspaceAdapter {
  capabilities?: ThreadWorkspaceCapabilities;
  getCapabilities?: (threadId: string) => Promise<ThreadWorkspaceCapabilities>;
  importArchive?: (input: {threadId: string; workspaceId?: string | null; path: string; file: File}) => Promise<Extract<ThreadWorkspaceUploadResult, {kind: 'archive'}>>;
  deleteFile?: (input: {threadId: string; workspaceId?: string | null; path: string}) => Promise<void> | void;
  moveFile?: (input: {threadId: string; workspaceId?: string | null; path: string; destination: string}) => Promise<void> | void;
  /** Owner-only, read-only host files explicitly opened from a thread link. */
  statLinkedFile?: (input: { threadId: string; path: string }) => Promise<ThreadWorkspaceTreeNode>;
  listTree(input: {
    threadId: string;
    workspaceId?: string | null;
    path?: string | null;
  }): Promise<ThreadWorkspaceTreeNode>;
  readFile(input: {
    threadId: string;
    workspaceId?: string | null;
    path: string;
    offset?: number;
    limit?: number;
  }): Promise<ThreadWorkspaceFilePreview>;
  getRawFileUrl?: (input: {
    threadId: string;
    workspaceId?: string | null;
    path: string;
  }) => string;
  uploadFile?: (input: {
    threadId: string;
    workspaceId?: string | null;
    path: string;
    file: File;
  }) => Promise<ThreadWorkspaceUploadResult>;
  pickUploadFile?: (input: {
    threadId: string;
    workspaceId?: string | null;
    defaultPick: () => void;
    upload: (file: File) => Promise<void>;
  }) => Promise<void> | void;
  writeFile?: (input: {
    threadId: string;
    workspaceId?: string | null;
    path: string;
    content: string;
  }) => Promise<void> | void;
  downloadNode?: (input: {
    threadId: string;
    workspaceId?: string | null;
    path: string;
    kind: 'file' | 'directory';
  }) => Promise<void> | void;
  listGarbage?: (input: {
    threadId: string;
    workspaceId?: string | null;
  }) => Promise<string[]>;
  emptyGarbage?: (input: {
    threadId: string;
    workspaceId?: string | null;
  }) => Promise<void> | void;
  subscribeWorkspaceChanged?: (
    input: {
      threadId: string;
      workspaceId?: string | null;
    },
    onChanged: () => void,
  ) => (() => void) | void;
}

export interface ThreadShellAdapter {
  fetchState(threadId: string): Promise<ThreadShellStateDto>;
  createShell(
    threadId: string,
    input?: { cols?: number; rows?: number; label?: string },
  ): Promise<ThreadShellStateDto>;
  terminateShell(shellId: string): Promise<ShellSessionDto>;
  updateShell(
    shellId: string,
    input: UpdateShellInput,
  ): Promise<ShellSessionDto>;
  connectSocket(handlers: ShellSocketHandlers): ShellSocketConnection;
}

export interface ThreadDetailUiAdapter {
  openThread(threadId: string): void;
  getThreadHref?: (threadId: string) => string;
  getNewThreadHref?: (workspaceId?: string | null) => string;
  renderNewThreadDialogContent?: (input: {
    close: () => void;
    closeNavigation: () => void;
    currentWorkspaceId?: string | null;
  }) => ReactNode;
  renameThread?: (threadId: string, title: string) => Promise<void> | void;
  deleteThread?: (thread: ThreadDto) => Promise<void> | void;
  cancelPendingSteer?: (
    threadId: string,
    pendingSteerId: string,
  ) => Promise<void> | void;
  steerPendingPrompt?: (
    threadId: string,
    pendingSteerId: string,
  ) => Promise<void> | void;
  sendPrompt(input: SendPromptInput): Promise<boolean | void> | boolean | void;
  interrupt?: () => Promise<void> | void;
  compact?: () => Promise<void> | void;
  updateSettings?: (input: UpdateThreadSettingsInput) => Promise<void> | void;
  loadHistoryItemDetail?: (
    itemId: string,
  ) => Promise<ThreadHistoryItemDetailDto> | ThreadHistoryItemDetailDto;
  loadTurnDetail?: (
    turnId: string,
  ) => Promise<ThreadTurnDto> | ThreadTurnDto;
  getImageAssetUrl?: (path: string) => string;
  openWorkspaceFile?: (input: { path: string; line?: number }) => void;
  workspace?: ThreadWorkspaceAdapter | null;
  shell?: ThreadShellAdapter | null;
}

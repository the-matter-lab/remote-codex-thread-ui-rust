import * as react from 'react';
import { ReactNode } from 'react';
import * as _remote_codex_shared from '@remote-codex/shared';
import { PromptAttachmentManifestEntryDto, ThreadHistoryItemDetailDto, ThreadTurnDto, ShellEventEnvelope, ThreadDto, UpdateThreadSettingsInput, ThreadShellStateDto, ShellSessionDto, UpdateShellInput, PluginDto, ImportPluginInput, ThreadArtifactDto, ThreadDetailDto, AgentRuntimeStatusDto } from '@remote-codex/shared';
import { F as FrontendPluginModule, E as ExtensionHostAdapter, b as ViewerToolbarContribution, T as ThreadPanelContribution, a as ExtensionRenderContext, A as ArtifactRenderContext, I as InlineCodeRenderContext } from './plugin-types-Bjl4gyeh.js';

interface PromptAttachmentUpload extends PromptAttachmentManifestEntryDto {
    file: File;
}
type SendPromptInput = {
    prompt: string;
    attachments?: PromptAttachmentUpload[];
};
interface ThreadShellControlState {
    status: _remote_codex_shared.ShellStatusDto;
    connectionButtonDisabled: boolean;
    connectionButtonLabel: string;
    shellInputEnabled: boolean;
    isConnecting: boolean;
    isCommandRunning: boolean;
    promptLabel: string | null;
    isMobileShell: boolean;
    hasShell: boolean;
    busy: boolean;
    loading: boolean;
    error: string | null;
}

interface ThreadTimelineAdapter {
    workspaceRootPath?: string | undefined;
    getImageAssetUrl?: (input: {
        threadId: string;
        path: string;
    }) => string;
    resolveHref?: (href: string) => string;
    onOpenLinkedThread?: (threadId: string) => void;
    onOpenWorkspaceFile?: (input: {
        path: string;
        line?: number;
    }) => void;
    cancelPendingSteer?: (threadId: string, pendingSteerId: string) => Promise<void> | void;
    onLoadHistoryItemDetail?: (itemId: string) => Promise<ThreadHistoryItemDetailDto> | ThreadHistoryItemDetailDto;
    onLoadTurnDetail?: (turnId: string) => Promise<ThreadTurnDto> | ThreadTurnDto;
}
interface ShellSocketHandlers {
    onConnected?: (event: unknown) => void;
    onShellEvent?: (event: ShellEventEnvelope) => void;
}
interface ShellSocketConnection {
    socket: WebSocket;
    send(message: unknown): void;
    close?: () => void;
}
interface ThreadWorkspaceTreeNode {
    name: string;
    path: string;
    kind: 'file' | 'directory';
    size?: number;
    hasChildren?: boolean;
    childrenLoaded?: boolean;
    truncated?: boolean;
    children?: ThreadWorkspaceTreeNode[];
}
interface ThreadWorkspaceFilePreview {
    path: string;
    name: string;
    content: string;
    language: string;
    size: number;
    truncated: boolean;
    nextOffset: number;
}
type ThreadWorkspaceUploadResult = {
    kind: 'file';
    file: {
        path: string;
        name: string;
        size: number;
    };
} | {
    kind: 'archive';
    archiveName: string;
    extractedCount: number;
    paths: string[];
    /** First committed file (paths can also contain directory entries). */
    firstFile?: string | null;
};
type ThreadWorkspaceArchiveFormat = 'tar' | 'zip';
interface ThreadWorkspaceTrashEntry {
    trashId: string;
    path: string;
    revision: string;
    size: number;
    trashedAt: string;
}
interface ThreadWorkspaceTrashList {
    version: 1;
    revision: string;
    entries: ThreadWorkspaceTrashEntry[];
}
interface ThreadWorkspaceCapabilities {
    download: {
        file: boolean;
        directory: false | 'tar';
    };
    archiveImport: false | 'tar';
    create?: boolean;
    mkdir?: boolean;
    delete?: 'file' | false;
    move?: 'file-new-destination' | false;
    maxFileBytes?: number;
    maxArchiveBytes?: number;
    maxArchiveEntries?: number;
    archives?: {
        version: 1;
        formats: ThreadWorkspaceArchiveFormat[];
    };
    trash?: {
        version: 1;
        files: boolean;
        restore: boolean;
        empty: boolean;
    };
}
interface ThreadWorkspaceAdapter {
    capabilities?: ThreadWorkspaceCapabilities;
    getCapabilities?: (threadId: string) => Promise<ThreadWorkspaceCapabilities>;
    importArchive?: (input: {
        threadId: string;
        workspaceId?: string | null;
        path: string;
        file: File;
        format?: ThreadWorkspaceArchiveFormat;
    }) => Promise<Extract<ThreadWorkspaceUploadResult, {
        kind: 'archive';
    }>>;
    /** Host freezes the source revision and binds it to the supplied operationId. */
    trashFile?: (input: {
        threadId: string;
        workspaceId?: string | null;
        path: string;
        operationId?: string;
    }) => Promise<ThreadWorkspaceTrashEntry>;
    listTrash?: (input: {
        threadId: string;
        workspaceId?: string | null;
    }) => Promise<ThreadWorkspaceTrashList>;
    restoreTrash?: (input: {
        threadId: string;
        workspaceId?: string | null;
        trashId: string;
        expectedRevision: string;
        expectedDestinationRevision: null;
        operationId?: string;
    }) => Promise<void> | void;
    emptyTrash?: (input: {
        threadId: string;
        workspaceId?: string | null;
        expectedRevision: string;
        operationId?: string;
    }) => Promise<void> | void;
    deleteFile?: (input: {
        threadId: string;
        workspaceId?: string | null;
        path: string;
    }) => Promise<void> | void;
    moveFile?: (input: {
        threadId: string;
        workspaceId?: string | null;
        path: string;
        destination: string;
    }) => Promise<void> | void;
    /** Owner-only, read-only host files explicitly opened from a thread link. */
    statLinkedFile?: (input: {
        threadId: string;
        path: string;
    }) => Promise<ThreadWorkspaceTreeNode>;
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
        format?: ThreadWorkspaceArchiveFormat;
    }) => Promise<void> | void;
    listGarbage?: (input: {
        threadId: string;
        workspaceId?: string | null;
    }) => Promise<string[]>;
    emptyGarbage?: (input: {
        threadId: string;
        workspaceId?: string | null;
    }) => Promise<void> | void;
    subscribeWorkspaceChanged?: (input: {
        threadId: string;
        workspaceId?: string | null;
    }, onChanged: () => void) => (() => void) | void;
}
interface ThreadShellAdapter {
    fetchState(threadId: string): Promise<ThreadShellStateDto>;
    createShell(threadId: string, input?: {
        cols?: number;
        rows?: number;
        label?: string;
    }): Promise<ThreadShellStateDto>;
    terminateShell(shellId: string): Promise<ShellSessionDto>;
    updateShell(shellId: string, input: UpdateShellInput): Promise<ShellSessionDto>;
    connectSocket(handlers: ShellSocketHandlers): ShellSocketConnection;
}
interface ThreadDetailUiAdapter {
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
    cancelPendingSteer?: (threadId: string, pendingSteerId: string) => Promise<void> | void;
    steerPendingPrompt?: (threadId: string, pendingSteerId: string) => Promise<void> | void;
    sendPrompt(input: SendPromptInput): Promise<boolean | void> | boolean | void;
    interrupt?: () => Promise<void> | void;
    compact?: () => Promise<void> | void;
    updateSettings?: (input: UpdateThreadSettingsInput) => Promise<void> | void;
    loadHistoryItemDetail?: (itemId: string) => Promise<ThreadHistoryItemDetailDto> | ThreadHistoryItemDetailDto;
    loadTurnDetail?: (turnId: string) => Promise<ThreadTurnDto> | ThreadTurnDto;
    getImageAssetUrl?: (path: string) => string;
    openWorkspaceFile?: (input: {
        path: string;
        line?: number;
    }) => void;
    workspace?: ThreadWorkspaceAdapter | null;
    shell?: ThreadShellAdapter | null;
}

/** Only reviewed, imported modules participate. Wire contribution IDs are data. */
declare function extensionModuleAvailable(module: FrontendPluginModule, host?: ExtensionHostAdapter): boolean;
declare function createExtensionPluginApi(modules: FrontendPluginModule[], adapter?: ExtensionHostAdapter): {
    extensionHost: ExtensionHostAdapter | undefined;
    hasCapability: (id: string) => boolean;
    getViewerToolbar: () => ViewerToolbarContribution[];
    getExtensionPanels: () => ThreadPanelContribution[];
    renderExtension: (context: ExtensionRenderContext) => string | number | bigint | boolean | react.ReactElement<unknown, string | react.JSXElementConstructor<any>> | Iterable<react.ReactNode> | Promise<string | number | bigint | boolean | react.ReactPortal | react.ReactElement<unknown, string | react.JSXElementConstructor<any>> | Iterable<react.ReactNode> | null | undefined> | null;
};
type ExtensionPluginApi = ReturnType<typeof createExtensionPluginApi>;

interface PluginContextValue {
    extensions?: ExtensionPluginApi;
    plugins: PluginDto[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
    importPluginManifest: (input: ImportPluginInput) => Promise<void>;
    setPluginEnabled: (pluginId: string, enabled: boolean) => Promise<void>;
    uninstallPlugin: (pluginId: string) => Promise<void>;
    renderArtifact: (context: ArtifactRenderContext) => ReactNode | null;
    renderInlineCode: (context: InlineCodeRenderContext) => ReactNode | null;
    hasRendererForArtifact: (artifact: ThreadArtifactDto) => boolean;
    getThreadPanels: () => ThreadPanelContribution[];
}
declare function mergePluginState(modules: FrontendPluginModule[], serverPlugins: PluginDto[]): PluginDto[];
declare function createDefaultPluginContextValue(modules?: FrontendPluginModule[], extensionHost?: ExtensionHostAdapter): PluginContextValue;
declare const PluginContext: react.Context<PluginContextValue>;

interface ThreadGraphWorkspacePanelProps {
    detail: ThreadDetailDto;
    status: AgentRuntimeStatusDto | null;
    plugins: PluginContextValue;
    workspaceAdapter?: ThreadWorkspaceAdapter | null;
    metaContent?: ReactNode;
    settingsContent?: ReactNode;
    activeView?: 'chat' | 'shell';
    features?: ThreadGraphWorkspaceFeatures;
    focusPathRequest?: {
        path: string;
        line?: number;
        requestId: number;
        artifactId?: string;
    } | null;
}
type WorkspaceTab = 'workspace' | 'tools' | 'guide' | 'graph' | 'extensions';
interface ThreadGraphWorkspaceFeatures {
    workspace?: boolean;
    toolUsage?: boolean;
    guide?: boolean;
    threadGraph?: boolean;
    extensions?: boolean;
    defaultTab?: WorkspaceTab;
}
declare function ThreadGraphWorkspacePanel({ detail, status, plugins, workspaceAdapter, metaContent, settingsContent, activeView, features: featureConfig, focusPathRequest, }: ThreadGraphWorkspacePanelProps): react.JSX.Element | null;
declare const MemoizedThreadGraphWorkspacePanel: react.MemoExoticComponent<typeof ThreadGraphWorkspacePanel>;

export { type ExtensionPluginApi as E, MemoizedThreadGraphWorkspacePanel as M, type PromptAttachmentUpload as P, type SendPromptInput as S, type ThreadShellControlState as T, type WorkspaceTab as W, type ThreadTimelineAdapter as a, type ThreadShellAdapter as b, type ThreadGraphWorkspacePanelProps as c, type PluginContextValue as d, type ThreadDetailUiAdapter as e, type ThreadGraphWorkspaceFeatures as f, PluginContext as g, type ShellSocketConnection as h, type ShellSocketHandlers as i, type ThreadWorkspaceAdapter as j, type ThreadWorkspaceArchiveFormat as k, type ThreadWorkspaceCapabilities as l, type ThreadWorkspaceTrashEntry as m, type ThreadWorkspaceTrashList as n, createDefaultPluginContextValue as o, createExtensionPluginApi as p, extensionModuleAvailable as q, mergePluginState as r, ThreadGraphWorkspacePanel as s };

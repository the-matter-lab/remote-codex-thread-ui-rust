import { T as ThreadShellControlState$1, P as PromptAttachmentUpload, a as ThreadTimelineAdapter, b as ThreadShellAdapter, c as ThreadGraphWorkspacePanelProps, d as PluginContextValue, e as ThreadDetailUiAdapter, f as ThreadGraphWorkspaceFeatures } from './workspace-panel-DfgtENI4.js';
export { g as PluginContext, S as SendPromptInput, h as ShellSocketConnection, i as ShellSocketHandlers, j as ThreadWorkspaceAdapter, W as WorkspaceTab, k as createDefaultPluginContextValue, m as mergePluginState } from './workspace-panel-DfgtENI4.js';
import * as react from 'react';
import { Dispatch, SetStateAction, ReactNode, RefObject, Ref, ComponentType, ForwardRefExoticComponent, RefAttributes, ComponentProps } from 'react';
import { ReasoningEffortDto, CollaborationModeDto, SandboxModeDto, ModelOptionDto, ThreadContextUsageDto, AgentProviderCapabilitiesDto, AgentBackendToolboxItemSchemaDto, AgentBackendHookCommandTemplateDto, AgentBackendManagementSchemaDto, PromptAttachmentKindDto, ThreadSkillsDto, ThreadMcpServersDto, ThreadHooksDto, ThreadForkTurnOptionDto, ThreadGoalDto, CreateThreadHookInput, UpdateThreadHookInput, ThreadGoalStatusDto, ProviderHostFileDto, AgentSubscriptionUsageDto, UpdateThreadSettingsInput, AgentBackendIdDto, ThreadDto, AgentRuntimeStatusDto, ThreadTurnDto, ThreadActionRequestDto, ThreadHistoryItemDto, RespondThreadActionRequestInput, ThreadAnsweredRequestNoteDto, ThreadActivityNoteDto, ThreadPendingSteerDto, ThreadHistoryItemDetailDto, ShellStatusDto, ThreadExportTurnOptionsDto, ThreadExportFormatDto, ExportThreadTranscriptInput, ThreadDetailDto, PluginDto, ImportPluginInput, UpdatePluginInput } from '@remote-codex/shared';
import { F as FrontendPluginModule } from './plugin-types-ZVSGf8y8.js';
export { A as ArtifactRenderContext, I as InlineCodeRenderContext, T as ThreadPanelContribution } from './plugin-types-ZVSGf8y8.js';
import * as DialogPrimitive from '@radix-ui/react-dialog';

interface SlashPanelState<T> {
    status: 'idle' | 'loading' | 'ready' | 'failed';
    data: T | null;
    error: string | null;
}

type ThreadComposerAttachmentPicker = (input: {
    kind: PromptAttachmentKindDto;
    appendAttachments: (files: FileList | null, kind?: PromptAttachmentKindDto) => boolean;
    defaultPick: () => void;
}) => void;
interface ThreadComposerProps {
    activeView: 'chat' | 'shell';
    edgeToEdgeMobile?: boolean;
    busy?: boolean;
    settingsBusy?: boolean;
    compactBusy?: boolean;
    error?: string | null;
    model?: string | null;
    agentLabel?: string | null;
    reasoningEffort?: ReasoningEffortDto | null;
    fastMode?: boolean;
    collaborationMode?: CollaborationModeDto;
    sandboxMode?: SandboxModeDto | null;
    hideSandboxModeControl?: boolean;
    modelOptions?: ModelOptionDto[];
    contextUsage?: ThreadContextUsageDto | null | undefined;
    capabilities?: AgentProviderCapabilitiesDto | null | undefined;
    toolboxItems?: AgentBackendToolboxItemSchemaDto[] | null | undefined;
    hookCommandTemplates?: AgentBackendHookCommandTemplateDto[] | null | undefined;
    mcpConfigFormat?: AgentBackendManagementSchemaDto['mcpConfigFormat'] | null | undefined;
    followTail?: boolean;
    threadConnected?: boolean;
    shellAvailable?: boolean;
    disabled?: boolean;
    disabledPlaceholder?: string | undefined;
    shellControlState?: ThreadShellControlState$1 | null;
    draftPrompt?: string | undefined;
    draftAttachments?: PromptAttachmentUpload[] | undefined;
    onPickAttachment?: ThreadComposerAttachmentPicker | undefined;
    skillsState?: SlashPanelState<ThreadSkillsDto>;
    mcpState?: SlashPanelState<ThreadMcpServersDto>;
    hooksState?: SlashPanelState<ThreadHooksDto>;
    forkTurnOptionsState?: SlashPanelState<ThreadForkTurnOptionDto[]>;
    goalState?: SlashPanelState<ThreadGoalDto | null | undefined>;
    goalHistory?: ThreadGoalDto[];
    onDraftChange?: Dispatch<SetStateAction<{
        prompt: string;
        attachments: PromptAttachmentUpload[];
    }>> | undefined;
    onSubmit: (input: {
        prompt: string;
        attachments?: PromptAttachmentUpload[];
    }) => Promise<boolean | void> | boolean | void;
    onInterrupt?: () => Promise<void> | void;
    onCompact?: () => Promise<void> | void;
    onOpenSkills?: () => Promise<void> | void;
    onOpenMcp?: () => Promise<void> | void;
    onOpenHarness?: () => Promise<void> | void;
    onOpenHooks?: () => Promise<void> | void;
    onCreateHook?: (input: CreateThreadHookInput) => Promise<void> | void;
    onUpdateHook?: (input: UpdateThreadHookInput) => Promise<void> | void;
    onTrustHook?: (input: {
        key: string;
        currentHash: string;
    }) => Promise<void> | void;
    onUntrustHook?: (input: {
        key: string;
    }) => Promise<void> | void;
    onOpenGoal?: () => Promise<void> | void;
    onPrepareGoalSubmit?: (input: {
        objective: string;
        tokenBudget: number | null;
    }) => Promise<boolean | void> | boolean | void;
    onUpdateGoal?: (input: {
        objective?: string | null;
        status?: ThreadGoalStatusDto | null;
        tokenBudget?: number | null;
    }) => Promise<void> | void;
    onOpenForkTurns?: () => Promise<void> | void;
    onForkLatest?: () => Promise<void> | void;
    onForkTurn?: (turnId: string) => Promise<void> | void;
    onReadProviderConfig?: (() => Promise<ProviderHostFileDto> | ProviderHostFileDto) | undefined;
    onWriteProviderConfig?: ((content: string) => Promise<ProviderHostFileDto> | ProviderHostFileDto) | undefined;
    onToggleFollow?: () => void;
    canJumpToPreviousTurn?: boolean;
    onJumpToPreviousTurn?: () => void;
    canJumpToNextTurn?: boolean;
    onJumpToNextTurn?: () => void;
    subscriptionUsage?: AgentSubscriptionUsageDto | null;
    onUpdateSettings?: (input: UpdateThreadSettingsInput) => Promise<void> | void;
    onToggleView?: () => void;
    onShellCopy?: () => Promise<void> | void;
    onShellControl?: (action: 'ctrl_c' | 'ctrl_d' | 'esc' | 'tab' | 'up' | 'down' | 'clear') => Promise<void> | void;
    canInterrupt?: boolean;
    pendingPrompts?: Array<{
        id: string;
        prompt: string;
        optimistic?: boolean;
    }>;
    onSteerPendingPrompt?: (pendingPromptId: string) => Promise<void> | void;
    onCancelPendingPrompt?: (pendingPromptId: string) => Promise<void> | void;
}
declare function ThreadComposer({ activeView, edgeToEdgeMobile, busy, settingsBusy, compactBusy, error, model, reasoningEffort, fastMode, collaborationMode, sandboxMode, hideSandboxModeControl, modelOptions, contextUsage, capabilities, toolboxItems, hookCommandTemplates, mcpConfigFormat, followTail, threadConnected, shellAvailable, disabled, disabledPlaceholder, shellControlState, draftPrompt, draftAttachments, onPickAttachment, skillsState, mcpState, hooksState, goalState, goalHistory, forkTurnOptionsState, onDraftChange, onSubmit, onInterrupt, onCompact, onOpenSkills, onOpenMcp, onOpenHooks, onOpenHarness, onCreateHook, onUpdateHook, onTrustHook, onUntrustHook, onOpenGoal, onPrepareGoalSubmit, onUpdateGoal, onOpenForkTurns, onForkLatest, onForkTurn, onReadProviderConfig, onWriteProviderConfig, onToggleFollow, canJumpToPreviousTurn, onJumpToPreviousTurn, canJumpToNextTurn, onJumpToNextTurn, subscriptionUsage, onUpdateSettings, onToggleView, onShellCopy, onShellControl, canInterrupt, pendingPrompts, onSteerPendingPrompt, onCancelPendingPrompt, }: ThreadComposerProps): react.JSX.Element;

type SettingsSection = {
    id: string;
    label: string;
    description?: string;
    content: ReactNode;
};
declare function SettingsPanels({ sections, initialId }: {
    sections: SettingsSection[];
    initialId?: string;
}): react.JSX.Element | null;

interface WorkbenchThread {
    key: string;
    title: string;
    subtitle: string;
    href: string;
    status: string;
    favorite: boolean;
}
interface WorkbenchNotification {
    id: string;
    title: string;
    href: string;
    occurredAt: string;
    summary?: string;
}
interface MatterWorkbenchOptions {
    /** Optional host integration; defaults preserve Remote Codex behavior. */
    brandName?: string;
    hideRail?: boolean;
    showShortcuts?: boolean;
    showNotifications?: boolean;
    showSearch?: boolean;
    searchLabel?: string;
    sidebarFooter?: ReactNode;
    renderNavigationHeader?: (input: {
        collapsed: boolean;
        closeNavigation: () => void;
    }) => ReactNode;
    emptyWorkspace?: boolean;
    navigationReady?: boolean;
    harnessSessionId?: string | null;
    harnessSessionUrl?: string | null;
    threads: WorkbenchThread[];
    workspaceThreads?: WorkbenchThread[];
    currentKey: string;
    favorite: boolean;
    favoriteBusy?: boolean;
    error?: string | null;
    workspacePath: string;
    activeView: 'chat' | 'shell';
    terminalEnabled: boolean;
    onViewChange: (view: 'chat' | 'shell') => void;
    onToggleFavorite: () => void;
    onNavigate: (href: string) => void;
    onSearch: () => void;
    notifications: WorkbenchNotification[];
    unreadCount: number;
    onReadNotifications: () => void;
    renderThreadMenu?: (thread: WorkbenchThread) => ReactNode;
}
declare function MatterWorkbench({ options: o, title, homeHref, settings, newThread, actions, threadMenu, connection, explorer, revealExplorer, children, }: {
    options: MatterWorkbenchOptions;
    title: string;
    homeHref: string;
    settings: ReactNode;
    newThread: ReactNode;
    actions: ReactNode;
    threadMenu: ReactNode;
    connection: ReactNode;
    explorer: ReactNode;
    revealExplorer: number;
    children: ReactNode;
}): react.JSX.Element;

type ThemeMode = 'system' | 'light' | 'dark';
type AgentBackendId = AgentBackendIdDto;
interface AppShellNavContextValue {
    navOpen: boolean;
    openNav: () => void;
    toggleNav: () => void;
    closeNav: () => void;
    settingsOpen: boolean;
    openSettings: () => void;
    closeSettings: () => void;
    themeMode: ThemeMode;
    setThemeMode: (mode: ThemeMode) => void;
    effectiveTheme: 'light' | 'dark';
    defaultBackend: AgentBackendId;
    setDefaultBackend: (backend: AgentBackendId) => void;
    autoCollapseCompletedTurns?: boolean;
    setAutoCollapseCompletedTurns?: (enabled: boolean) => void;
    showReasoningSummaries?: boolean;
    setShowReasoningSummaries?: (enabled: boolean) => void;
}
declare const AppShellNavContext: react.Context<AppShellNavContextValue | null>;
declare function useAppShellNav(): AppShellNavContextValue | null;

interface ThreadWorkspaceLayoutProps {
    workbench?: MatterWorkbenchOptions;
    threads: ThreadDto[];
    status?: AgentRuntimeStatusDto | null;
    loading?: boolean;
    error?: string | null;
    viewportConstrained?: boolean;
    layoutMode?: "desktop" | "responsive" | "mobile";
    effectiveTheme?: "light" | "dark";
    themeMode?: ThemeMode;
    onThemeModeChange?: (mode: ThemeMode) => void;
    showMobileAppMenu?: boolean;
    showMobileThreadNavToggle?: boolean;
    showMobileNewThreadShortcut?: boolean;
    hideRoomsRail?: boolean;
    navigationTitle?: string;
    renderNavigationHeader?: (input: {
        collapsed: boolean;
        closeNavigation: () => void;
    }) => ReactNode;
    settingsDialogOpen?: boolean;
    onSettingsDialogOpenChange?: (open: boolean) => void;
    mobileHeaderAction?: ReactNode;
    currentThreadId?: string | undefined;
    currentThreadLabel?: string | null | undefined;
    currentWorkspaceId?: string | null | undefined;
    currentWorkspaceLabel?: string | null | undefined;
    harnessLabel?: string | null | undefined;
    sessionLabel?: string | null | undefined;
    usageLabel?: string | null | undefined;
    threadActionsButton?: ReactNode;
    topbarActions?: ReactNode;
    workspaceLabels?: Record<string, string>;
    metaContent?: ReactNode;
    settingsContent?: ReactNode;
    globalSettingsContent?: ReactNode;
    settingsSections?: SettingsSection[];
    appMenuButton?: ReactNode;
    appNavigationMenu?: ReactNode;
    workspaceReturnHref?: string;
    onWorkspaceReturn?: () => void;
    getThreadHref?: (threadId: string) => string;
    onOpenThread?: (threadId: string) => void;
    getNewThreadHref?: (workspaceId?: string | null) => string;
    newThreadHref?: string;
    newThreadLabel?: string;
    onNewThread?: () => void;
    onNewThreadTitle?: (title: string) => Promise<void> | void;
    renderNewThreadDialogContent?: (input: {
        close: () => void;
        closeNavigation: () => void;
        currentWorkspaceId?: string | null;
    }) => ReactNode;
    renderThreadLink?: (input: {
        thread: ThreadDto;
        children: ReactNode;
        className: string;
        onClick: () => void;
    }) => ReactNode;
    onCloseAppNavigation?: () => void;
    onRenameThread?: ((threadId: string, title: string) => Promise<void> | void) | undefined;
    onDeleteThread?: ((thread: ThreadDto) => void) | undefined;
    workspaceContent?: ReactNode;
    workspaceTitle?: string;
    workspaceActions?: ReactNode;
    workspaceRevealRequestKey?: number;
    children: ReactNode;
}
interface ThreadCardsProps {
    threads: ThreadDto[];
    currentThreadId?: string | undefined;
    currentWorkspaceId?: string | null | undefined;
    workspaceLabels?: Record<string, string>;
    onOpenThread: (threadId: string) => void;
    getThreadHref?: ((threadId: string) => string) | undefined;
    renderThreadLink?: ThreadWorkspaceLayoutProps["renderThreadLink"] | undefined;
    onBeginRenameThread?: ((thread: ThreadDto) => void) | undefined;
    onDeleteThread?: ((thread: ThreadDto) => void) | undefined;
    scrollable?: boolean;
    maxHeightClassName?: string;
    showDeleteButton?: boolean;
    showSessionCopyButton?: boolean;
    collapsed?: boolean;
}
declare function ThreadCards({ threads, currentThreadId, currentWorkspaceId, workspaceLabels, onOpenThread, getThreadHref, renderThreadLink, onBeginRenameThread, onDeleteThread, scrollable, maxHeightClassName, showDeleteButton, showSessionCopyButton, collapsed, }: ThreadCardsProps): react.JSX.Element;
declare function ThreadWorkspaceLayout({ workbench, threads, status, loading, error, viewportConstrained, layoutMode, effectiveTheme: effectiveThemeProp, themeMode: themeModeProp, onThemeModeChange, showMobileNewThreadShortcut, hideRoomsRail, navigationTitle, renderNavigationHeader, settingsDialogOpen, onSettingsDialogOpenChange, mobileHeaderAction, currentThreadId, currentThreadLabel, currentWorkspaceId, currentWorkspaceLabel, harnessLabel, sessionLabel, usageLabel, threadActionsButton, topbarActions, metaContent, settingsContent, globalSettingsContent, settingsSections, workspaceLabels, workspaceReturnHref, onWorkspaceReturn, getThreadHref, onOpenThread, getNewThreadHref, newThreadHref: explicitNewThreadHref, newThreadLabel, onNewThread, onNewThreadTitle, renderNewThreadDialogContent, renderThreadLink, onCloseAppNavigation, onRenameThread, onDeleteThread, workspaceContent, workspaceTitle, workspaceActions, workspaceRevealRequestKey, children, }: ThreadWorkspaceLayoutProps): react.JSX.Element;

type TimelineTurn = Omit<ThreadTurnDto, "status"> & {
    status: ThreadTurnDto["status"] | "sending";
};

interface ThreadTimelineProps {
    threadId?: string | undefined;
    turns: ThreadTurnDto[];
    totalTurnCount?: number;
    pendingRequests?: ThreadActionRequestDto[];
    activeTurnId?: string | null;
    threadRunning?: boolean;
    livePlan?: {
        turnId: string;
        explanation: string | null;
        plan: Array<{
            step: string;
            status: string;
        }>;
        updatedAt?: string | null;
    } | null;
    liveItems?: {
        turnId: string;
        items: ThreadHistoryItemDto[];
        updatedAt?: string | null;
    } | null;
    respondingRequestId?: string | null;
    onRespondToRequest?: (requestId: string, input: RespondThreadActionRequestInput) => Promise<void> | void;
    liveOutput: string;
    scrollRequestKey?: number;
    searchTarget?: {
        turnId: string;
        itemId: string;
        key: number;
    };
    previousTurnScrollRequestKey?: number;
    nextTurnScrollRequestKey?: number;
    bottomSpacer?: number;
    className?: string;
    onTailVisibilityChange?: (isVisible: boolean) => void;
    onPreviousTurnAvailabilityChange?: (available: boolean) => void;
    onNextTurnAvailabilityChange?: (available: boolean) => void;
    loadingEarlier?: boolean;
    onLoadEarlier?: () => void;
    ephemeralUserNote?: string | null;
    answeredRequestNotes?: ThreadAnsweredRequestNoteDto[];
    activityNotes?: ThreadActivityNoteDto[];
    pendingSteers?: ThreadPendingSteerDto[];
    optimisticSteers?: Array<{
        id: string;
        clientRequestId: string;
        turnId: string;
        prompt: string;
        createdAt: string;
        status: 'steering' | 'accepted';
    }>;
    optimisticTurn?: TimelineTurn | null;
    onLoadHistoryItemDetail?: (itemId: string) => Promise<ThreadHistoryItemDetailDto> | ThreadHistoryItemDetailDto;
    onLoadTurnDetail?: (turnId: string) => Promise<ThreadTurnDto> | ThreadTurnDto;
    onOpenThread?: (threadId: string) => void;
    onSelectArtifact?: (input: {
        item: ThreadHistoryItemDto & {
            kind: 'artifact';
        };
        artifact: NonNullable<ThreadHistoryItemDto['artifact']>;
    }) => void;
    onSelectHistoryItemDetail?: (input: {
        item: ThreadHistoryItemDto;
        detail: ThreadHistoryItemDetailDto;
    }) => void;
    adapter?: ThreadTimelineAdapter | undefined;
    autoCollapseCompletedTurns?: boolean;
}
declare function ThreadTimelineComponent({ threadId, turns, totalTurnCount, pendingRequests, activeTurnId, threadRunning, pendingSteers, livePlan, liveItems, respondingRequestId, onRespondToRequest, liveOutput, scrollRequestKey, searchTarget, previousTurnScrollRequestKey, nextTurnScrollRequestKey, bottomSpacer, className, onTailVisibilityChange, onPreviousTurnAvailabilityChange, onNextTurnAvailabilityChange, loadingEarlier, onLoadEarlier, ephemeralUserNote, answeredRequestNotes, activityNotes, optimisticSteers, optimisticTurn, onLoadHistoryItemDetail, onLoadTurnDetail, onOpenThread, onSelectArtifact, onSelectHistoryItemDetail, adapter, autoCollapseCompletedTurns, }: ThreadTimelineProps): react.JSX.Element;
declare const ThreadTimeline: react.MemoExoticComponent<typeof ThreadTimelineComponent>;

interface ThreadShellControlState {
    status: ShellStatusDto;
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

interface ThreadShellPanelProps {
    threadId: string;
    shellAdapter: ThreadShellAdapter;
    isVisible?: boolean;
    showHeader?: boolean;
    onBackToChat?: (() => void) | undefined;
    showFloatingToolbox?: boolean;
    effectiveTheme?: 'light' | 'dark';
    loadSplitRatio?: (threadId: string) => number | null | undefined;
    saveSplitRatio?: (threadId: string, ratio: number) => void;
    onStateChange?: (state: ThreadShellControlState) => void;
}
interface ThreadShellPanelHandle {
    toggleConnection: () => Promise<void>;
    sendInput: (data: string) => boolean;
    sendCommand: (command: string) => boolean;
    sendControl: (action: 'ctrl_c' | 'ctrl_d' | 'esc' | 'tab' | 'up' | 'down' | 'clear') => boolean;
    copyLastCommandOutput: () => Promise<boolean>;
    terminate: () => Promise<void>;
    focus: () => void;
    refreshLayout: (options?: {
        focus?: boolean;
        syncBackendSize?: boolean;
    }) => void;
}
declare const ThreadShellPanel: react.ForwardRefExoticComponent<ThreadShellPanelProps & react.RefAttributes<ThreadShellPanelHandle>>;

declare function ThreadGraphWorkspacePanel(props: ThreadGraphWorkspacePanelProps): react.JSX.Element;
declare const MemoizedThreadGraphWorkspacePanel: react.MemoExoticComponent<typeof ThreadGraphWorkspacePanel>;

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    description: string;
    confirmLabel?: string;
    busyLabel?: string;
    busy?: boolean;
    onCancel: () => void;
    onConfirm: () => void | Promise<void>;
}
declare function ConfirmDialog({ open, title, description, confirmLabel, busyLabel, busy, onCancel, onConfirm, }: ConfirmDialogProps): react.ReactPortal | null;

type ThreadActionMode = ThreadExportFormatDto | 'share' | 'link';
type RelayThreadAccess = 'read' | 'control';
type RelayWorkspaceAccess = 'none' | 'read' | 'write';
interface ExportTurnsState {
    status: 'idle' | 'loading' | 'ready' | 'failed';
    data: ThreadExportTurnOptionsDto | null;
    error: string | null;
}
interface CreateThreadShareInput {
    scope?: 'thread' | 'device';
    targetIdentifier: string;
    threadAccess: RelayThreadAccess;
    workspaceAccess: RelayWorkspaceAccess;
    label?: string | null;
}
interface ThreadShareSummary {
    scope?: 'thread' | 'device';
    id: string;
    targetUsername: string;
    label: string | null;
    threadAccess?: RelayThreadAccess;
    workspaceAccess?: RelayWorkspaceAccess;
    createdAt?: string | null;
}
interface ShareState {
    status: 'idle' | 'loading' | 'ready' | 'failed';
    shares: ThreadShareSummary[];
    error: string | null;
}
interface ThreadActionsDialogProps {
    appearance?: 'default' | 'matter';
    open: boolean;
    busy?: boolean;
    turnsState: ExportTurnsState;
    shareAvailable?: boolean;
    shareUnavailableMessage?: string;
    shareState?: ShareState;
    initialMode?: ThreadActionMode;
    onCancel: () => void;
    onLoadTurns: () => void | Promise<void>;
    onExport: (input: ExportThreadTranscriptInput) => void | Promise<void>;
    onCreateShare?: (input: CreateThreadShareInput) => void | Promise<void>;
    onRevokeShare?: (shareId: string) => void | Promise<void>;
    onOpenDeviceSharing?: () => void;
    deviceShareAvailable?: boolean;
    linkContent?: ReactNode;
    onUpdateShare?: (id: string, input: CreateThreadShareInput) => void | Promise<void>;
}
declare function ThreadActionsDialog({ appearance, open, busy, turnsState, shareAvailable, shareUnavailableMessage, shareState, initialMode, onCancel, onLoadTurns, onExport, onCreateShare, onRevokeShare, deviceShareAvailable, linkContent, onUpdateShare, }: ThreadActionsDialogProps): react.ReactPortal | null;
declare const ExportTranscriptDialog: typeof ThreadActionsDialog;

interface LongTextDialogProps {
    open: boolean;
    title: string;
    text: string;
    kind?: string | undefined;
    onClose: () => void;
}
declare function LongTextDialog({ open, title, text, kind, onClose, }: LongTextDialogProps): react.ReactPortal | null;

declare function formatShortTimestamp(value: string | null): string;
declare function formatLongTimestamp(value: string | null): string;
declare function threadStatusLabel(status: ThreadDto['status']): "Confirming status" | "Idle" | "Running" | "Interrupted" | "Failed" | "Not Loaded" | "System Error";
declare function threadStatusClassName(status: ThreadDto['status']): "ui-status-warning" | "ui-status-neutral" | "ui-status-info" | "ui-status-danger";
declare function turnStatusLabel(status: ThreadTurnDto['status'] | 'sending'): "Confirming status" | "Running" | "Interrupted" | "Failed" | "Sending" | "Completed";
declare function historyItemAccentClassName(kind: ThreadHistoryItemDto['kind']): "ui-status-neutral" | "timeline-kind-user" | "timeline-kind-agent" | "timeline-kind-action" | "timeline-kind-command" | "timeline-kind-search" | "timeline-kind-file-read" | "timeline-kind-reasoning" | "timeline-kind-agent-tool" | "timeline-kind-skill-tool" | "timeline-kind-plan" | "timeline-kind-file";
declare function historyItemLabel(kind: ThreadHistoryItemDto['kind']): "User" | "Agent" | "Artifact" | "Image" | "Context" | "Command" | "Web Search" | "File Read" | "Reasoning" | "Skill" | "Tool" | "Plan" | "File Change" | "Hook" | "Other";

declare function hasLikelyMarkdownSyntax(text: string): boolean;

interface ThreadDetailSurfaceProps {
    threads: ThreadDto[];
    detail: ThreadDetailDto | null;
    loading: boolean;
    error: string | null;
    status?: AgentRuntimeStatusDto | null;
    capabilities?: AgentProviderCapabilitiesDto | null;
    managementSchema?: AgentBackendManagementSchemaDto | null;
    plugins?: PluginContextValue;
    adapter: ThreadDetailUiAdapter;
    metaContent?: ReactNode;
    settingsContent?: ReactNode;
    globalSettingsContent?: ReactNode;
    settingsSections?: SettingsSection[];
    settingsDialogOpen?: boolean;
    onSettingsDialogOpenChange?: (open: boolean) => void;
    mobileHeaderAction?: ReactNode;
    appMenuButton?: ReactNode;
    appNavigationMenu?: ReactNode;
    navigationTitle?: string;
    renderNavigationHeader?: (input: {
        collapsed: boolean;
        closeNavigation: () => void;
    }) => ReactNode;
    workspaceReturnHref?: string;
    onWorkspaceReturn?: () => void;
    threadActionsButton?: ReactNode;
    surfaceActions?: ReactNode;
    workbench?: MatterWorkbenchOptions;
    floatingPanel?: ReactNode;
    workspaceContent?: ReactNode;
    workspaceTitle?: string;
    workspaceActions?: ReactNode;
    workspaceFeatures?: ThreadGraphWorkspaceFeatures;
    workspaceFocusPathRequest?: {
        path: string;
        line?: number;
        requestId: number;
    } | null;
    onNewThreadTitle?: (title: string) => Promise<void> | void;
    beforeTimelineContent?: ReactNode;
    errorContent?: ReactNode;
    workspaceMissingContent?: ReactNode;
    dialogs?: ReactNode;
    currentThreadId?: string;
    /** null shows all supplied navigation threads, regardless of their file workspace. */
    currentWorkspaceId?: string | null;
    currentWorkspaceLabel?: string | null;
    onCloseAppNavigation?: () => void;
    presentation?: "workspace" | "embedded-single-thread";
    className?: string;
    activeView?: "chat" | "shell";
    liveOutput?: string;
    timelineProps?: Partial<Omit<ThreadTimelineProps, "threadId" | "turns" | "liveOutput" | "adapter">>;
    composerProps?: Omit<ThreadComposerProps, "activeView" | "onSubmit">;
    shellComposerProps?: Omit<ThreadComposerProps, "activeView" | "onSubmit">;
    useFloatingMobileComposer?: boolean;
    floatingMobileComposerBottomOffset?: number;
    composerHostRef?: RefObject<HTMLDivElement | null>;
    shellPanelRef?: Ref<ThreadShellPanelHandle>;
    shellEffectiveTheme?: "light" | "dark";
    shellThemeMode?: ThemeMode;
    onShellThemeModeChange?: (mode: ThemeMode) => void;
    onShellStateChange?: (state: ThreadShellControlState) => void;
    shellUnavailableContent?: ReactNode;
    shellDisconnectedContent?: ReactNode;
    timelineComponent?: ComponentType<ThreadTimelineProps>;
    shellPanelComponent?: ForwardRefExoticComponent<{
        threadId: string;
        shellAdapter: NonNullable<ThreadDetailUiAdapter["shell"]>;
        isVisible?: boolean;
        showHeader?: boolean;
        showFloatingToolbox?: boolean;
        onBackToChat?: (() => void) | undefined;
        effectiveTheme?: "light" | "dark";
        onStateChange?: (state: ThreadShellControlState) => void;
    } & RefAttributes<ThreadShellPanelHandle>>;
    shellContent?: ReactNode;
    loadingContent?: ReactNode;
    emptyContent?: ReactNode;
}
declare function ThreadDetailSurface({ threads, detail: rawDetail, loading, error, status, plugins: providedPlugins, adapter, metaContent, settingsContent, globalSettingsContent, settingsSections, settingsDialogOpen, onSettingsDialogOpenChange, mobileHeaderAction, appMenuButton, appNavigationMenu, navigationTitle, renderNavigationHeader, workspaceReturnHref, onWorkspaceReturn, threadActionsButton, surfaceActions, workbench, floatingPanel, workspaceContent, workspaceTitle, workspaceActions, workspaceFeatures, workspaceFocusPathRequest, onNewThreadTitle, beforeTimelineContent, errorContent, workspaceMissingContent, dialogs, currentThreadId, currentWorkspaceId, currentWorkspaceLabel, onCloseAppNavigation, presentation, className, activeView, liveOutput, timelineProps, composerProps, shellComposerProps, useFloatingMobileComposer, floatingMobileComposerBottomOffset, composerHostRef, shellPanelRef, shellEffectiveTheme, shellThemeMode, onShellThemeModeChange, onShellStateChange, shellUnavailableContent, shellDisconnectedContent, timelineComponent: TimelineComponent, shellPanelComponent: ShellPanelComponent, shellContent, loadingContent, emptyContent, }: ThreadDetailSurfaceProps): react.JSX.Element;

interface PluginProviderAdapter {
    fetchPlugins?: () => Promise<PluginDto[]> | PluginDto[];
    importPlugin?: (input: ImportPluginInput) => Promise<PluginDto> | PluginDto;
    updatePlugin?: (pluginId: string, input: UpdatePluginInput) => Promise<PluginDto> | PluginDto;
    deletePlugin?: (pluginId: string) => Promise<PluginDto> | PluginDto;
}
declare function PluginProvider({ adapter, builtinPlugins, children, }: {
    adapter?: PluginProviderAdapter;
    builtinPlugins?: FrontendPluginModule[];
    children: ReactNode;
}): react.JSX.Element;

declare function usePlugins(): PluginContextValue;

interface AppShellNavigationItem {
    label: string;
    href: string;
}
interface AppShellNavigationMenuProps {
    className?: string;
    currentPath?: string;
    items?: AppShellNavigationItem[];
    onNavigate?: (href: string) => void;
}
declare function AppShellMenuButton({ className }: {
    className?: string;
}): react.JSX.Element | null;
declare function AppShellNavigationMenu({ className, currentPath, items, onNavigate, }: AppShellNavigationMenuProps): react.JSX.Element | null;
interface AppShellSettingsDialogProps {
    extraContent?: ReactNode;
    importPluginInput?: (draft: string) => ImportPluginInput;
}
declare function AppShellSettingsDialog({ extraContent, importPluginInput, }?: AppShellSettingsDialogProps): react.JSX.Element | null;

interface PublicTranscriptMessage {
    role: 'user' | 'assistant';
    text: string;
    createdAt?: string | null;
}
interface PublicTranscriptTurn {
    messages: PublicTranscriptMessage[];
    startedAt?: string | null;
    completedAt?: string | null;
    model?: ThreadTurnDto['model'];
    reasoningEffort?: ThreadTurnDto['reasoningEffort'];
    tokenUsage?: ThreadTurnDto['tokenUsage'];
    priceEstimate?: ThreadTurnDto['priceEstimate'];
}
interface PublicTranscriptSnapshot {
    title: string;
    createdAt: string;
    turnCount: number;
    turns: PublicTranscriptTurn[];
    theme?: 'light' | 'dark';
    images?: Record<string, string>;
    live?: boolean;
    stale?: boolean;
    updatedAt?: string;
}
declare function transcriptSnapshot(title: string, turns: ThreadTurnDto[], theme: 'light' | 'dark'): PublicTranscriptSnapshot;
declare function PublicTranscript({ snapshot }: {
    snapshot: PublicTranscriptSnapshot;
}): react.JSX.Element;

declare function Dialog({ ...props }: ComponentProps<typeof DialogPrimitive.Root>): react.JSX.Element;
declare function DialogContent({ children, className, showCloseButton, overlayClassName, ...props }: ComponentProps<typeof DialogPrimitive.Content> & {
    showCloseButton?: boolean;
    overlayClassName?: string;
}): react.JSX.Element;
declare function DialogHeader({ className, ...props }: ComponentProps<'div'>): react.JSX.Element;
declare function DialogTitle({ className, ...props }: ComponentProps<typeof DialogPrimitive.Title>): react.JSX.Element;
declare function DialogDescription({ className, ...props }: ComponentProps<typeof DialogPrimitive.Description>): react.JSX.Element;

export { type AgentBackendId, AppShellMenuButton, AppShellNavContext, type AppShellNavContextValue, type AppShellNavigationItem, AppShellNavigationMenu, type AppShellNavigationMenuProps, AppShellSettingsDialog, type AppShellSettingsDialogProps, ConfirmDialog, type CreateThreadShareInput, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, ExportTranscriptDialog, FrontendPluginModule, LongTextDialog, MatterWorkbench, type MatterWorkbenchOptions, MemoizedThreadGraphWorkspacePanel, PluginContextValue, PluginProvider, PromptAttachmentUpload, PublicTranscript, type PublicTranscriptSnapshot, SettingsPanels, type SettingsSection, type ThemeMode, ThreadActionsDialog, type ThreadActionsDialogProps, ThreadCards, ThreadComposer, type ThreadComposerProps, ThreadDetailSurface, type ThreadDetailSurfaceProps, ThreadDetailUiAdapter, ThreadGraphWorkspaceFeatures, ThreadGraphWorkspacePanel, ThreadGraphWorkspacePanelProps, type ThreadShareSummary, ThreadShellAdapter, ThreadShellControlState$1 as ThreadShellControlState, ThreadShellPanel, type ThreadShellPanelHandle, ThreadTimeline, ThreadTimelineAdapter, type ThreadTimelineProps, ThreadWorkspaceLayout, type WorkbenchNotification, type WorkbenchThread, formatLongTimestamp, formatShortTimestamp, hasLikelyMarkdownSyntax, historyItemAccentClassName, historyItemLabel, threadStatusClassName, threadStatusLabel, transcriptSnapshot, turnStatusLabel, useAppShellNav, usePlugins };

declare const agentBackendIds: readonly ["codex", "claude", "opencode", "elagente"];
type AgentBackendIdDto = (typeof agentBackendIds)[number];
declare const defaultAgentBackendId: AgentBackendIdDto;
interface AgentBackendMetadata {
    displayName: string;
    description: string;
    defaultTransport: 'stdio' | 'sdk' | 'none';
    homeEnvVar: string;
    commandEnvVar: string;
    defaultHomeDir: string;
    defaultCommand: string;
}
declare const agentBackendMetadata: Record<AgentBackendIdDto, AgentBackendMetadata>;
declare function isAgentBackendId(value: unknown): value is AgentBackendIdDto;
declare function normalizeAgentBackendId(value: unknown): AgentBackendIdDto | null;

type ApiErrorCode = 'bad_request' | 'not_found' | 'conflict' | 'provider_goal_error' | 'forbidden' | 'goal_feature_disabled' | 'internal_error' | 'service_unavailable';
interface ApiErrorShape {
    code: ApiErrorCode;
    message: string;
    details?: Record<string, unknown>;
}
declare function truncateAutoThreadTitle(value: string): string;
interface RuntimeConfigDto {
    appName: string;
    appVersion: string;
    host: string;
    port: number;
    workspaceRoot: string;
    environment: string;
}
interface AgentRuntimeStatusDto {
    state: 'starting' | 'ready' | 'degraded' | 'stopped' | 'failed';
    transport: 'stdio' | 'sdk' | 'none';
    lastStartedAt: string | null;
    lastError: string | null;
    restartCount: number;
}
interface AgentSubscriptionUsageWindowDto {
    id: string;
    durationMinutes: number | null;
    label: string;
    usedPercent: number;
    resetsAt: string | null;
}
interface AgentSubscriptionUsageDto {
    provider: 'codex' | 'claude' | 'grok';
    authKind: 'subscription' | 'apiKey' | 'unknown';
    observedAt: string;
    stale: boolean;
    windows: AgentSubscriptionUsageWindowDto[];
}
interface AgentProviderCapabilitiesDto {
    sessions: {
        list: boolean;
        read: boolean;
        resume: boolean;
        importLocal: boolean;
    };
    turns: {
        start: boolean;
        streamInput: boolean;
        steer: boolean;
        interrupt: boolean;
        compact: boolean;
    };
    branching: {
        fork: boolean;
        forkAt?: boolean;
        hardRollback: boolean;
        resumeAt: boolean;
        rewindFiles: boolean;
    };
    controls: {
        planMode: boolean;
        permissionRequests: boolean;
        sandboxMode: boolean;
        performanceMode: boolean;
        goals: boolean;
    };
    management: {
        models: boolean;
        mcpStatus: boolean;
        skills: boolean;
        hooks: boolean;
        hookTrust: boolean;
        hostConfigFiles: boolean;
        providerSettings: boolean;
    };
    usage: {
        contextWindow: boolean;
        tokenUsage: boolean;
        costUsd: boolean;
    };
}
interface AgentBackendDto {
    provider: AgentBackendIdDto;
    displayName: string;
    description: string;
    enabled: boolean;
    isDefault: boolean;
    status: AgentRuntimeStatusDto;
    capabilities: AgentProviderCapabilitiesDto;
    managementSchema: AgentBackendManagementSchemaDto;
    installation: AgentBackendInstallationDto;
}
interface AgentBackendInstallationDto {
    packageName: string | null;
    installed: boolean;
    installedVersion: string | null;
    latestVersion: string | null;
    installCommand: string | null;
    updateCommand: string | null;
    busy: boolean;
    lastError: string | null;
}
interface AgentBackendConfigFileSchemaDto {
    name: string;
    label: string;
    description: string;
    roles?: Array<'runtime' | 'auth' | 'mcp' | 'hooks' | 'providerSettings'>;
}
type AgentBackendToolboxActionDto = 'fast' | 'compact' | 'goal' | 'fork' | 'skills' | 'mcp' | 'hooks' | 'prompt' | 'harness' | 'unsupported';
interface AgentBackendToolboxItemSchemaDto {
    action: AgentBackendToolboxActionDto;
    command: string;
    label: string;
    description?: string | null;
    panel?: 'fork' | 'skills' | 'mcp' | 'hooks' | null;
}
interface AgentBackendHookCommandTemplateDto {
    eventName: AgentHookEventNameDto;
    command: string;
}
interface AgentBackendManagementSchemaDto {
    hostConfigFiles: AgentBackendConfigFileSchemaDto[];
    toolboxItems: AgentBackendToolboxItemSchemaDto[];
    hookCommandTemplates: AgentBackendHookCommandTemplateDto[];
    providerConfigFormat: 'toml' | 'json' | 'none';
    mcpConfigFormat: 'codex-toml' | 'claude-json' | 'none';
    configArchives: boolean;
    buildRestart: boolean;
}
interface ModelOptionDto {
    id: string;
    model: string;
    displayName: string;
    description: string;
    isDefault: boolean;
    hidden: boolean;
    supportsPerformanceMode?: boolean;
    supportedReasoningEfforts: ReasoningEffortOptionDto[];
    defaultReasoningEffort: ReasoningEffortDto | null;
}
interface VersionDto {
    name: string;
    version: string;
}
interface HealthDto {
    status: 'ok';
    timestamp: string;
}
type ProviderHostFileNameDto = string;
interface ProviderHostFileDto {
    name: ProviderHostFileNameDto;
    path: string;
    exists: boolean;
    content: string;
}
interface UpdateProviderHostFileInput {
    content: string;
}
interface ProviderHostConfigArchiveFileDto {
    name: ProviderHostFileNameDto;
    exists: boolean;
}
interface ProviderHostConfigArchiveDto {
    id: string;
    label: string;
    createdAt: string;
    updatedAt: string;
    files: Record<string, ProviderHostConfigArchiveFileDto>;
}
interface CreateProviderHostConfigArchiveInput {
    label?: string;
}
interface RenameProviderHostConfigArchiveInput {
    label: string;
}
interface ApplyProviderHostConfigArchiveResultDto {
    archive: ProviderHostConfigArchiveDto;
    status: AgentRuntimeStatusDto;
}
interface WorkspaceDto {
    id: string;
    hostId: string;
    label: string;
    absPath: string;
    isFavorite: boolean;
    createdAt: string;
    lastOpenedAt: string | null;
}
interface CreateWorkspaceFromPathInput {
    absPath: string;
    label?: string;
}
interface CreateWorkspaceFromGitInput {
    gitUrl: string;
    label?: string;
}
type CreateWorkspaceInput = CreateWorkspaceFromPathInput | CreateWorkspaceFromGitInput;
interface WorkspaceSettingsDto {
    workspaceRoot: string;
    devHome: string;
    defaultBackend: AgentBackendIdDto;
}
interface UpdateWorkspaceSettingsInput {
    devHome: string;
    defaultBackend?: AgentBackendIdDto;
}
interface UpdateWorkspaceInput {
    label: string;
}
type ThreadSourceDto = 'supervisor' | 'local_codex_import';
interface UpdateWorkspaceFavoriteInput {
    isFavorite: boolean;
}
interface WorkspaceTreeNodeDto {
    name: string;
    absPath: string;
    kind: 'file' | 'directory';
    hasChildren: boolean;
    isHidden: boolean;
}
interface WorkspaceTreeDto {
    rootPath: string;
    currentPath: string;
    nodes: WorkspaceTreeNodeDto[];
}
type ApprovalMode = 'yolo' | 'guarded';
type ReasoningEffortDto = 'none' | 'minimal' | 'low' | 'medium' | 'high' | 'xhigh' | 'max' | 'ultra' | (string & {});
type CollaborationModeDto = 'default' | 'plan';
type SandboxModeDto = 'read-only' | 'workspace-write' | 'danger-full-access';
interface ReasoningEffortOptionDto {
    reasoningEffort: ReasoningEffortDto;
    description: string;
}
type ThreadStatusDto = 'recovering' | 'idle' | 'running' | 'interrupted' | 'failed' | 'not_loaded' | 'system_error';
interface ThreadContextUsageDto {
    availability: 'available' | 'unavailable';
    remainingPercent: number | null;
    tokensInContextWindow: number | null;
    modelContextWindow: number | null;
    updatedAt: string | null;
}
interface ThreadDto {
    id: string;
    workspaceId: string;
    provider: AgentBackendIdDto;
    providerSessionId: string | null;
    source: ThreadSourceDto;
    title: string;
    model: string | null;
    reasoningEffort: ReasoningEffortDto | null;
    fastMode?: boolean;
    collaborationMode: CollaborationModeDto;
    approvalMode: ApprovalMode;
    sandboxMode?: SandboxModeDto | null;
    status: ThreadStatusDto;
    summaryText: string | null;
    lastError: string | null;
    activeTurnId: string | null;
    isLoaded: boolean;
    isPinned: boolean;
    createdAt: string;
    updatedAt: string;
    lastTurnStartedAt: string | null;
    lastTurnCompletedAt: string | null;
    contextUsage?: ThreadContextUsageDto;
}
interface ThreadHistoryItemDto {
    id: string;
    kind: 'userMessage' | 'agentMessage' | 'artifact' | 'image' | 'plan' | 'contextCompaction' | 'reasoning' | 'commandExecution' | 'webSearch' | 'fileRead' | 'fileChange' | 'hook' | 'agentToolCall' | 'skillToolCall' | 'toolCall' | 'other';
    text: string;
    previewText?: string;
    detailText?: string | null;
    hasDeferredDetail?: boolean | null;
    sequence?: number | null;
    transcriptOrder?: number | null;
    sourceTurnId?: string | null;
    createdAt?: string | null;
    updatedAt?: string | null;
    status?: string | null;
    assetPath?: string | null;
    changedFiles?: number | null;
    addedLines?: number | null;
    removedLines?: number | null;
    hookEventName?: string | null;
    hookEventLabel?: string | null;
    hookHandlerType?: string | null;
    hookScope?: string | null;
    hookSource?: string | null;
    hookSourcePath?: string | null;
    hookStatusMessage?: string | null;
    hookOutputEntries?: Array<{
        kind: string;
        text: string;
    }> | null;
    artifact?: ThreadArtifactDto | null;
}
interface ThreadHistoryItemDetailDto {
    id: string;
    kind: ThreadHistoryItemDto['kind'];
    title: string;
    text: string;
}
interface ThreadArtifactDto {
    id: string;
    pluginId: string;
    type: string;
    title: string;
    summaryText?: string | null;
    payload: unknown;
    assets?: Array<{
        id: string;
        mediaType: string;
        url: string;
        name?: string | null;
    }> | null;
    sourceTurnId?: string | null;
    sourceItemId?: string | null;
    createdAt: string;
}
interface PluginArtifactTypeDto {
    type: string;
    title: string;
    fileExtensions?: string[];
}
interface PluginThreadPanelDto {
    id: string;
    label: string;
    kind?: 'artifact' | 'terminal' | string;
    artifactTypes: string[];
}
interface PluginModelHintDto {
    id: string;
    text: string;
}
interface PluginMcpServerDto {
    id: string;
    name: string;
    command: string;
    args?: string[];
    env?: Record<string, string>;
}
interface PluginCapabilitiesDto {
    artifactTypes: PluginArtifactTypeDto[];
    timelineRenderers: string[];
    threadPanels: PluginThreadPanelDto[];
    modelHints?: PluginModelHintDto[];
    mcpServers?: PluginMcpServerDto[];
    frontend?: {
        entry?: string;
        style?: string;
    };
    backend?: {
        entry?: string;
    };
}
interface PluginManifestDto {
    id: string;
    name: string;
    version: string;
    description: string;
    remoteCodex: string;
    capabilities: PluginCapabilitiesDto;
}
interface PluginDto extends PluginManifestDto {
    enabled: boolean;
    source?: 'builtin' | 'imported' | null;
}
interface UpdatePluginInput {
    enabled: boolean;
}
interface ImportPluginInput {
    manifest?: unknown;
    manifestJson?: string;
    enabled?: boolean;
}
interface ThreadTurnTokenBreakdownDto {
    totalTokens: number;
    inputTokens: number;
    cachedInputTokens: number;
    cacheWriteInputTokens?: number;
    outputTokens: number;
    reasoningOutputTokens: number;
}
interface ThreadTurnTokenUsageDto {
    total: ThreadTurnTokenBreakdownDto;
    last: ThreadTurnTokenBreakdownDto;
    modelContextWindow: number | null;
}
type ThreadTurnPricingTierDto = 'standard' | 'fast';
interface ThreadTurnPriceEstimateDto {
    pricingModelKey: string;
    pricingTierKey: ThreadTurnPricingTierDto;
    currency: 'USD';
    inputUsd: number;
    cachedInputUsd: number;
    cacheWriteInputUsd?: number;
    outputUsd: number;
    totalUsd: number;
}
interface ThreadTurnDto {
    id: string;
    startedAt: string | null;
    completedAt?: string | null;
    status: 'completed' | 'interrupted' | 'failed' | 'inProgress' | 'recovering';
    error: string | null;
    model?: string | null;
    reasoningEffort?: ReasoningEffortDto | null;
    reasoningEffortAvailable?: boolean | null;
    tokenUsage?: ThreadTurnTokenUsageDto | null;
    priceEstimate?: ThreadTurnPriceEstimateDto | null;
    hasDeferredItems?: boolean | null;
    deferredItemCount?: number | null;
    items: ThreadHistoryItemDto[];
}
interface ThreadActionQuestionOptionDto {
    label: string;
    description: string;
}
interface ThreadActionQuestionDto {
    id: string;
    header: string;
    question: string;
    multiSelect?: boolean;
    isOther: boolean;
    isSecret: boolean;
    options: ThreadActionQuestionOptionDto[] | null;
}
interface ThreadActionRequestDto {
    id: string;
    kind: 'requestUserInput' | 'permissionRequest' | 'planDecision';
    title: string;
    description: string | null;
    turnId: string | null;
    itemId: string | null;
    createdAt: string;
    questions: ThreadActionQuestionDto[];
}
interface ThreadAnsweredRequestNoteDto {
    id: string;
    turnId: string | null;
    title: string;
    summaryLines: string[];
    createdAt: string;
}
interface ThreadActivityNoteDto {
    id: string;
    kind: 'fastMode' | 'goal' | 'forkCreated' | 'forkSource';
    createdAt: string;
    text?: string;
    anchorTurnId?: string | null;
    linkedThreadId?: string;
    linkedThreadTitle?: string | null;
    turnIndex?: number | null;
}
type AgentSkillScopeDto = 'user' | 'repo' | 'system' | 'admin';
interface AgentSkillInterfaceDto {
    displayName?: string;
    shortDescription?: string;
    brandColor?: string;
    defaultPrompt?: string;
}
interface AgentSkillDto {
    name: string;
    description: string;
    shortDescription?: string;
    interface?: AgentSkillInterfaceDto;
    path: string;
    scope: AgentSkillScopeDto;
    enabled: boolean;
}
interface AgentSkillErrorDto {
    path: string;
    message: string;
}
interface ThreadSkillsDto {
    cwd: string;
    skills: AgentSkillDto[];
    errors: AgentSkillErrorDto[];
}
type AgentMcpAuthStatusDto = 'unsupported' | 'notLoggedIn' | 'bearerToken' | 'oAuth';
interface AgentMcpToolDto {
    name: string;
    title: string | null;
    description: string | null;
}
interface AgentMcpServerDto {
    name: string;
    authStatus: AgentMcpAuthStatusDto;
    tools: AgentMcpToolDto[];
    resourceCount: number;
    resourceTemplateCount: number;
}
interface ThreadMcpServersDto {
    servers: AgentMcpServerDto[];
}
type AgentHookEventNameDto = 'preToolUse' | 'permissionRequest' | 'postToolUse' | 'preCompact' | 'postCompact' | 'sessionStart' | 'userPromptSubmit' | 'stop';
type AgentHookHandlerTypeDto = 'command' | 'prompt' | 'agent';
type AgentHookSourceDto = 'system' | 'user' | 'project' | 'mdm' | 'sessionFlags' | 'plugin' | 'cloudRequirements' | 'legacyManagedConfigFile' | 'legacyManagedConfigMdm' | 'unknown';
type AgentHookTrustStatusDto = 'managed' | 'untrusted' | 'trusted' | 'modified';
interface AgentHookDto {
    key: string;
    eventName: AgentHookEventNameDto;
    handlerType: AgentHookHandlerTypeDto;
    matcher: string | null;
    command: string | null;
    timeoutSec: number;
    statusMessage: string | null;
    sourcePath: string;
    source: AgentHookSourceDto;
    pluginId: string | null;
    displayOrder: number;
    enabled: boolean;
    isManaged: boolean;
    currentHash: string;
    trustStatus: AgentHookTrustStatusDto;
}
interface AgentHookErrorDto {
    path: string;
    message: string;
}
interface ThreadHooksDto {
    cwd: string;
    hooks: AgentHookDto[];
    warnings: string[];
    errors: AgentHookErrorDto[];
    globalHooksPath: string;
    projectHooksPath: string;
}
interface CreateThreadHookInput {
    scope: 'global' | 'project';
    eventName: AgentHookEventNameDto;
    matcher?: string | null;
    command: string;
    timeoutSec?: number | null;
    statusMessage?: string | null;
}
interface ThreadHookTargetInput {
    scope: 'global' | 'project';
    eventName: AgentHookEventNameDto;
    matcher?: string | null;
    command: string;
    timeoutSec?: number | null;
    statusMessage?: string | null;
}
interface UpdateThreadHookInput extends CreateThreadHookInput {
    target: ThreadHookTargetInput;
}
interface TrustThreadHookInput {
    key: string;
    currentHash: string;
}
interface UntrustThreadHookInput {
    key: string;
}
type ThreadGoalStatusDto = 'active' | 'paused' | 'budgetLimited' | 'complete' | 'terminated';
interface ThreadGoalDto {
    threadId: string;
    localGoalId?: string | null;
    objective: string;
    status: ThreadGoalStatusDto;
    tokenBudget: number | null;
    tokensUsed: number;
    timeUsedSeconds: number;
    createdAt: string;
    updatedAt: string;
    completedAt?: string | null;
}
interface UpdateThreadGoalInput {
    objective?: string | null;
    status?: ThreadGoalStatusDto | null;
    tokenBudget?: number | null;
}
interface ThreadLivePlanDto {
    turnId: string;
    explanation: string | null;
    plan: Array<{
        step: string;
        status: string;
    }>;
    updatedAt: string;
}
interface ThreadPendingSteerDto {
    id: string;
    clientRequestId: string | null;
    turnId: string;
    prompt: string;
    delivery: "steer" | "continuation";
    createdAt: string;
}
interface ThreadLiveItemsDto {
    turnId: string;
    items: ThreadHistoryItemDto[];
    updatedAt: string;
}
interface ThreadDetailDto {
    thread: ThreadDto;
    workspace: WorkspaceDto;
    workspacePathStatus: 'present' | 'missing';
    turns: ThreadTurnDto[];
    totalTurnCount?: number;
    pendingRequests: ThreadActionRequestDto[];
    pendingSteers: ThreadPendingSteerDto[];
    answeredRequestNotes?: ThreadAnsweredRequestNoteDto[];
    activityNotes?: ThreadActivityNoteDto[];
    goal?: ThreadGoalDto | null;
    goalHistory?: ThreadGoalDto[];
    livePlan?: ThreadLivePlanDto | null;
    liveItems?: ThreadLiveItemsDto | null;
}
interface ThreadExportTurnOptionDto {
    turnId: string;
    turnNumber: number;
    startedAt: string | null;
    status: ThreadTurnDto['status'];
    userPromptPreview: string;
}
interface ThreadExportTurnOptionsDto {
    turns: ThreadExportTurnOptionDto[];
    totalTurnCount: number;
}
type ThreadExportPdfModeDto = 'latest' | 'selected';
type ThreadExportPdfProfileDto = 'review' | 'technical';
type ThreadExportFormatDto = 'html';
interface ExportThreadTranscriptInput {
    format?: ThreadExportFormatDto;
    mode: ThreadExportPdfModeDto;
    limit?: number;
    turnIds?: string[];
    profile?: ThreadExportPdfProfileDto;
    options?: {
        includeTokenAndPrice?: boolean;
        includeCommandOutput?: boolean;
        includeAbsolutePaths?: boolean;
    };
}
interface ThreadForkTurnOptionDto {
    turnId: string;
    turnIndex: number;
    startedAt: string | null;
    status: ThreadTurnDto['status'];
}
interface ForkThreadInput {
    mode: 'latest' | 'turn';
    turnId?: string;
}
interface ThreadForkResultDto {
    thread: ThreadDetailDto;
    sourceThreadId: string;
    sourceTurnId: string | null;
    sourceTurnIndex: number | null;
}
type ShellStatusDto = 'not_created' | 'creating' | 'running' | 'attached' | 'detached' | 'exited' | 'not_found' | 'workspace_missing';
interface ShellSessionDto {
    id: string;
    threadId: string;
    workspaceId: string;
    label: string | null;
    tmuxSessionName: string;
    backend: 'pty' | 'tmux' | string;
    cwd: string;
    status: Exclude<ShellStatusDto, 'not_created' | 'workspace_missing'>;
    attachedViewerId: string | null;
    createdAt: string;
    updatedAt: string;
    lastActivityAt: string | null;
}
interface ThreadShellStateDto {
    threadId: string;
    workspaceId: string;
    workspacePathStatus: 'present' | 'missing';
    state: ShellStatusDto;
    shell: ShellSessionDto | null;
    shells: ShellSessionDto[];
    activeShellId: string | null;
}
interface ShellCreateInput {
    cols?: number;
    rows?: number;
    label?: string;
}
interface UpdateShellInput {
    label?: string | null;
}
interface ShellAttachInput {
    cols: number;
    rows: number;
}
interface ShellDetachInput {
    viewerId: string;
}
interface ShellInputInput {
    viewerId: string;
    data: string;
}
interface ShellResizeInput {
    viewerId: string;
    cols: number;
    rows: number;
}
interface CreateThreadInput {
    workspaceId: string;
    title?: string;
    provider?: AgentBackendIdDto;
    model: string;
    approvalMode: ApprovalMode;
}
interface UpdateThreadSettingsInput {
    model?: string;
    reasoningEffort?: ReasoningEffortDto | null;
    fastMode?: boolean;
    collaborationMode?: CollaborationModeDto;
    sandboxMode?: SandboxModeDto | null;
}
interface UpdateThreadInput {
    title: string;
}
interface ImportThreadInput {
    sessionId: string;
}
interface SendThreadPromptInput {
    prompt: string;
    clientRequestId?: string;
    model?: string;
    reasoningEffort?: ReasoningEffortDto | null;
    collaborationMode?: CollaborationModeDto;
    sandboxMode?: SandboxModeDto | null;
}
type PromptAttachmentKindDto = 'photo' | 'file';
interface PromptAttachmentManifestEntryDto {
    clientId: string;
    kind: PromptAttachmentKindDto;
    originalName: string;
    placeholder: string;
}
interface InterruptTurnInput {
    turnId?: string;
}
interface ResumeThreadInput {
    model?: string;
    sandboxMode?: SandboxModeDto | null;
}
interface ThreadActionRequestAnswerDto {
    answers: string[];
}
interface RespondThreadActionRequestInput {
    answers: Record<string, ThreadActionRequestAnswerDto>;
}
interface ThreadEventPayloadMap {
    'thread.updated': {
        status?: ThreadStatusDto | string | null;
        title?: string | null;
        reason?: string;
        turnId?: string;
        model?: string | null;
        reasoningEffort?: ReasoningEffortDto | string | null;
        fastMode?: boolean;
        collaborationMode?: CollaborationModeDto | string | null;
        sandboxMode?: SandboxModeDto | string | null;
    };
    'thread.context.updated': {
        contextUsage: ThreadContextUsageDto;
    };
    'thread.goal.updated': {
        turnId?: string | null;
        goal: ThreadGoalDto | null;
        goalHistory: ThreadGoalDto[];
    };
    'thread.goal.cleared': {
        goalHistory: ThreadGoalDto[];
    };
    'thread.turn.token.updated': {
        turnId: string;
        tokenUsage: ThreadTurnTokenUsageDto;
        priceEstimate: ThreadTurnPriceEstimateDto | null;
    };
    'thread.turn.started': {
        turnId: string;
    };
    'thread.item.started': {
        turnId: string;
        item: ThreadHistoryItemDto;
    };
    'thread.item.completed': {
        turnId: string;
        item: ThreadHistoryItemDto;
    };
    'thread.plan.updated': {
        turnId: string;
        explanation: string | null;
        plan: ThreadLivePlanDto['plan'];
    };
    'thread.request.created': {
        request: ThreadActionRequestDto;
    };
    'thread.request.resolved': {
        requestId: string;
    };
    'thread.output.delta': {
        turnId: string;
        itemId: string;
        sequence: number;
        delta: string;
    };
    'thread.turn.completed': {
        turnId: string;
        status: ThreadTurnDto['status'];
        error: string | null;
    };
    'thread.turn.failed': {
        turnId: string;
        error: string | null;
        willRetry?: boolean;
    };
}
type ThreadEventEnvelope = {
    [Type in keyof ThreadEventPayloadMap]: {
        type: Type;
        threadId: string;
        timestamp: string;
        payload: ThreadEventPayloadMap[Type];
    };
}[keyof ThreadEventPayloadMap];
interface ShellEventPayloadMap {
    'shell.connected': {
        viewerId: string;
    };
    'shell.status': {
        threadId: string;
        state: ShellStatusDto;
        viewerId?: string;
    };
    'shell.output': {
        data: string;
        replace?: boolean;
        cursorX?: number;
        cursorY?: number;
        paneHeight?: number;
        cwdBaseName?: string;
        envPrefix?: string;
        isCommandRunning?: boolean;
    };
    'shell.detached': {
        threadId: string;
        state: Extract<ShellStatusDto, 'detached'>;
        viewerId: string;
        reason?: string;
    };
    'shell.exited': {
        threadId: string;
        state: Extract<ShellStatusDto, 'exited' | 'not_found'>;
    };
    'shell.error': {
        code: string;
        message: string;
    };
}
type ShellEventEnvelope = {
    [Type in keyof ShellEventPayloadMap]: {
        type: Type;
        shellId: string;
        timestamp: string;
        payload: ShellEventPayloadMap[Type];
    };
}[keyof ShellEventPayloadMap];
interface SupervisorConnectedEnvelope {
    type: 'supervisor.connected';
    timestamp: string;
}
interface SupervisorPongEnvelope {
    type: 'supervisor.pong';
    timestamp: string;
    payload: {
        requestTimestamp: string | null;
    };
}
type SupervisorSocketServerEnvelope = SupervisorConnectedEnvelope | SupervisorPongEnvelope | ThreadEventEnvelope | ShellEventEnvelope;
type SupervisorSocketClientEnvelope = {
    type: 'supervisor.ping';
    timestamp: string;
} | {
    type: 'shell.attach';
    shellId: string;
    cols: number;
    rows: number;
} | {
    type: 'shell.detach';
    shellId: string;
    viewerId: string;
} | {
    type: 'shell.input';
    shellId: string;
    viewerId: string;
    data: string;
} | {
    type: 'shell.resize';
    shellId: string;
    viewerId: string;
    cols: number;
    rows: number;
} | {
    type: 'shell.clear';
    shellId: string;
    viewerId: string;
};
/** Text can arrive as a shorter summary; operation lifecycle must still advance. */
declare function mergeThreadHistoryItem(current: ThreadHistoryItemDto | undefined, incoming: ThreadHistoryItemDto): ThreadHistoryItemDto;

export { type AgentBackendConfigFileSchemaDto, type AgentBackendDto, type AgentBackendHookCommandTemplateDto, type AgentBackendIdDto, type AgentBackendInstallationDto, type AgentBackendManagementSchemaDto, type AgentBackendMetadata, type AgentBackendToolboxActionDto, type AgentBackendToolboxItemSchemaDto, type AgentHookDto, type AgentHookErrorDto, type AgentHookEventNameDto, type AgentHookHandlerTypeDto, type AgentHookSourceDto, type AgentHookTrustStatusDto, type AgentMcpAuthStatusDto, type AgentMcpServerDto, type AgentMcpToolDto, type AgentProviderCapabilitiesDto, type AgentRuntimeStatusDto, type AgentSkillDto, type AgentSkillErrorDto, type AgentSkillInterfaceDto, type AgentSkillScopeDto, type AgentSubscriptionUsageDto, type AgentSubscriptionUsageWindowDto, type ApiErrorCode, type ApiErrorShape, type ApplyProviderHostConfigArchiveResultDto, type ApprovalMode, type CollaborationModeDto, type CreateProviderHostConfigArchiveInput, type CreateThreadHookInput, type CreateThreadInput, type CreateWorkspaceFromGitInput, type CreateWorkspaceFromPathInput, type CreateWorkspaceInput, type ExportThreadTranscriptInput, type ForkThreadInput, type HealthDto, type ImportPluginInput, type ImportThreadInput, type InterruptTurnInput, type ModelOptionDto, type PluginArtifactTypeDto, type PluginCapabilitiesDto, type PluginDto, type PluginManifestDto, type PluginMcpServerDto, type PluginModelHintDto, type PluginThreadPanelDto, type PromptAttachmentKindDto, type PromptAttachmentManifestEntryDto, type ProviderHostConfigArchiveDto, type ProviderHostConfigArchiveFileDto, type ProviderHostFileDto, type ProviderHostFileNameDto, type ReasoningEffortDto, type ReasoningEffortOptionDto, type RenameProviderHostConfigArchiveInput, type RespondThreadActionRequestInput, type ResumeThreadInput, type RuntimeConfigDto, type SandboxModeDto, type SendThreadPromptInput, type ShellAttachInput, type ShellCreateInput, type ShellDetachInput, type ShellEventEnvelope, type ShellEventPayloadMap, type ShellInputInput, type ShellResizeInput, type ShellSessionDto, type ShellStatusDto, type SupervisorConnectedEnvelope, type SupervisorPongEnvelope, type SupervisorSocketClientEnvelope, type SupervisorSocketServerEnvelope, type ThreadActionQuestionDto, type ThreadActionQuestionOptionDto, type ThreadActionRequestAnswerDto, type ThreadActionRequestDto, type ThreadActivityNoteDto, type ThreadAnsweredRequestNoteDto, type ThreadArtifactDto, type ThreadContextUsageDto, type ThreadDetailDto, type ThreadDto, type ThreadEventEnvelope, type ThreadEventPayloadMap, type ThreadExportFormatDto, type ThreadExportPdfModeDto, type ThreadExportPdfProfileDto, type ThreadExportTurnOptionDto, type ThreadExportTurnOptionsDto, type ThreadForkResultDto, type ThreadForkTurnOptionDto, type ThreadGoalDto, type ThreadGoalStatusDto, type ThreadHistoryItemDetailDto, type ThreadHistoryItemDto, type ThreadHookTargetInput, type ThreadHooksDto, type ThreadLiveItemsDto, type ThreadLivePlanDto, type ThreadMcpServersDto, type ThreadPendingSteerDto, type ThreadShellStateDto, type ThreadSkillsDto, type ThreadSourceDto, type ThreadStatusDto, type ThreadTurnDto, type ThreadTurnPriceEstimateDto, type ThreadTurnPricingTierDto, type ThreadTurnTokenBreakdownDto, type ThreadTurnTokenUsageDto, type TrustThreadHookInput, type UntrustThreadHookInput, type UpdatePluginInput, type UpdateProviderHostFileInput, type UpdateShellInput, type UpdateThreadGoalInput, type UpdateThreadHookInput, type UpdateThreadInput, type UpdateThreadSettingsInput, type UpdateWorkspaceFavoriteInput, type UpdateWorkspaceInput, type UpdateWorkspaceSettingsInput, type VersionDto, type WorkspaceDto, type WorkspaceSettingsDto, type WorkspaceTreeDto, type WorkspaceTreeNodeDto, agentBackendIds, agentBackendMetadata, defaultAgentBackendId, isAgentBackendId, mergeThreadHistoryItem, normalizeAgentBackendId, truncateAutoThreadTitle };

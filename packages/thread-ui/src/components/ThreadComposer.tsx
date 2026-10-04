import {
  ClipboardEvent,
  type Dispatch,
  DragEvent,
  FormEvent,
  KeyboardEvent,
  useCallback,
  type SetStateAction,
  useMemo,
  useRef,
  useState,
} from 'react';

import type {
  AgentBackendHookCommandTemplateDto,
  AgentBackendManagementSchemaDto,
  AgentBackendToolboxItemSchemaDto,
  AgentSubscriptionUsageDto,
  AgentProviderCapabilitiesDto,
  CollaborationModeDto,
  PromptAttachmentKindDto,
  ProviderHostFileDto,
  CreateThreadHookInput,
  ThreadHooksDto,
  ThreadMcpServersDto,
  ThreadSkillsDto,
  ThreadForkTurnOptionDto,
  ThreadGoalDto,
  ThreadGoalStatusDto,
  ModelOptionDto,
  ThreadContextUsageDto,
  ReasoningEffortDto,
  SandboxModeDto,
  UpdateThreadHookInput,
  UpdateThreadSettingsInput,
} from '@remote-codex/shared';
import type { ThreadShellControlState } from '../types';
import type { PromptAttachmentUpload } from '../types';
import type {
  McpPanelMode,
  SettingsMenu,
  SlashPanelView,
  SlashPanelState,
} from './composer/types';
import {
  buildComposerSubmitInput,
  derivePromptDropAction,
  derivePromptFileDragAction,
  derivePromptKeyDownAction,
  derivePromptPasteAction,
  extractFilesFromTransfer,
  formatModelContextTitle,
  hasTransferFiles,
  normalizePromptText,
  tokenizePrompt,
  type ComposerAttachmentDraft,
} from './composer/composerUtils';
import {
  buildComposerClassNames,
  buildComposerControlState,
} from './composer/composerPresentation';
import {
  filterToolboxItemsForCapabilities,
  toolboxItemActionDecision,
} from './composer/composerToolbox';
import {
  editorContainsStyledRichText,
  restoreEditorSelection,
  serializeEditorPrompt as serializePromptEditor,
  snapshotEditorSelection,
  textFromClipboardHtml,
} from './composer/contentEditablePrompt';
import { ComposerFrame } from './composer/ComposerFrame';
import { ComposerPendingQueue } from './composer/ComposerPendingQueue';
import { ComposerToolbar } from './composer/ComposerToolbar';
import { useComposerAttachments } from './composer/useComposerAttachments';
import { useAttachmentPreviewUrls } from './composer/useAttachmentPreviewUrls';
import { useComposerDraft } from './composer/useComposerDraft';
import { useComposerForkActions } from './composer/useComposerForkActions';
import { useComposerGoal } from './composer/useComposerGoal';
import { useComposerHookConfig } from './composer/useComposerHookConfig';
import { useComposerMcpConfig } from './composer/useComposerMcpConfig';
import { useComposerMenuLifecycle } from './composer/useComposerMenuLifecycle';
import { useComposerPromptDomSync } from './composer/useComposerPromptDomSync';
import { useComposerPromptSlots } from './composer/useComposerPromptSlots';
import { useComposerSettingsActions } from './composer/useComposerSettingsActions';
import { useComposerToolbarProps } from './composer/useComposerToolbarProps';

export type ThreadComposerAttachmentPicker = (input: {
  kind: PromptAttachmentKindDto;
  appendAttachments: (
    files: FileList | null,
    kind?: PromptAttachmentKindDto,
  ) => boolean;
  defaultPick: () => void;
}) => void;

export interface ThreadComposerProps {
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
  hookCommandTemplates?:
    | AgentBackendHookCommandTemplateDto[]
    | null
    | undefined;
  mcpConfigFormat?:
    | AgentBackendManagementSchemaDto['mcpConfigFormat']
    | null
    | undefined;
  followTail?: boolean;
  threadConnected?: boolean;
  shellAvailable?: boolean;
  disabled?: boolean;
  disabledPlaceholder?: string | undefined;
  shellControlState?: ThreadShellControlState | null;
  draftPrompt?: string | undefined;
  draftAttachments?: PromptAttachmentUpload[] | undefined;
  onPickAttachment?: ThreadComposerAttachmentPicker | undefined;
  /** Omitted flags retain the generic composer's existing attachment behavior. */
  attachmentCapabilities?: { files: boolean; images: boolean };
  skillsState?: SlashPanelState<ThreadSkillsDto>;
  mcpState?: SlashPanelState<ThreadMcpServersDto>;
  hooksState?: SlashPanelState<ThreadHooksDto>;
  forkTurnOptionsState?: SlashPanelState<ThreadForkTurnOptionDto[]>;
  goalState?: SlashPanelState<ThreadGoalDto | null | undefined>;
  goalHistory?: ThreadGoalDto[];
  onDraftChange?:
    | Dispatch<
        SetStateAction<{
          prompt: string;
          attachments: PromptAttachmentUpload[];
        }>
      >
    | undefined;
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
  onUntrustHook?: (input: { key: string }) => Promise<void> | void;
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
  onReadProviderConfig?:
    | (() => Promise<ProviderHostFileDto> | ProviderHostFileDto)
    | undefined;
  onWriteProviderConfig?:
    | ((content: string) => Promise<ProviderHostFileDto> | ProviderHostFileDto)
    | undefined;
  onToggleFollow?: () => void;
  canJumpToPreviousTurn?: boolean;
  onJumpToPreviousTurn?: () => void;
  canJumpToNextTurn?: boolean;
  onJumpToNextTurn?: () => void;
  subscriptionUsage?: AgentSubscriptionUsageDto | null;
  onUpdateSettings?: (input: UpdateThreadSettingsInput) => Promise<void> | void;
  onToggleView?: () => void;
  onShellCopy?: () => Promise<void> | void;
  onShellControl?: (
    action: 'ctrl_c' | 'ctrl_d' | 'esc' | 'tab' | 'up' | 'down' | 'clear',
  ) => Promise<void> | void;
  canInterrupt?: boolean;
  pendingPrompts?: Array<{
    id: string;
    prompt: string;
    optimistic?: boolean;
  }>;
  onSteerPendingPrompt?: (pendingPromptId: string) => Promise<void> | void;
  onCancelPendingPrompt?: (pendingPromptId: string) => Promise<void> | void;
}

export function ThreadComposer({
  activeView,
  edgeToEdgeMobile = false,
  busy = false,
  settingsBusy = false,
  compactBusy = false,
  error,
  model = null,
  reasoningEffort = null,
  fastMode = false,
  collaborationMode = 'default',
  sandboxMode = null,
  hideSandboxModeControl = false,
  modelOptions = [],
  contextUsage = null,
  capabilities = null,
  toolboxItems = null,
  hookCommandTemplates = null,
  mcpConfigFormat = 'none',
  followTail = false,
  threadConnected = true,
  shellAvailable = true,
  disabled = false,
  disabledPlaceholder,
  shellControlState = null,
  draftPrompt,
  draftAttachments,
  onPickAttachment,
  attachmentCapabilities,
  skillsState = {
    status: 'idle',
    data: null,
    error: null,
  },
  mcpState = {
    status: 'idle',
    data: null,
    error: null,
  },
  hooksState = {
    status: 'idle',
    data: null,
    error: null,
  },
  goalState = {
    status: 'idle',
    data: null,
    error: null,
  },
  goalHistory = [],
  forkTurnOptionsState = {
    status: 'idle',
    data: null,
    error: null,
  },
  onDraftChange,
  onSubmit,
  onInterrupt,
  onCompact,
  onOpenSkills,
  onOpenMcp,
  onOpenHooks,
  onOpenHarness,
  onCreateHook,
  onUpdateHook,
  onTrustHook,
  onUntrustHook,
  onOpenGoal,
  onPrepareGoalSubmit,
  onUpdateGoal,
  onOpenForkTurns,
  onForkLatest,
  onForkTurn,
  onReadProviderConfig,
  onWriteProviderConfig,
  onToggleFollow,
  canJumpToPreviousTurn,
  onJumpToPreviousTurn,
  canJumpToNextTurn,
  onJumpToNextTurn,
  subscriptionUsage,
  onUpdateSettings,
  onToggleView,
  onShellCopy,
  onShellControl,
  canInterrupt = false,
  pendingPrompts = [],
  onSteerPendingPrompt,
  onCancelPendingPrompt,
}: ThreadComposerProps) {
  const [openMenu, setOpenMenu] = useState<SettingsMenu>(null);
  const [attachmentError, setAttachmentError] = useState<string | null>(null);
  const attachmentCapabilitiesRef = useRef(attachmentCapabilities);
  attachmentCapabilitiesRef.current = attachmentCapabilities;
  const canAttach = attachmentCapabilities === undefined ||
    attachmentCapabilities.files || attachmentCapabilities.images;
  const [slashPanelView, setSlashPanelView] = useState<SlashPanelView>('root');
  const submitInFlightRef = useRef(false);
  const [mcpPanelMode, setMcpPanelMode] = useState<McpPanelMode>('list');
  const slashCapabilities = useMemo(
    () => ({
      fast: capabilities?.controls.performanceMode ?? false,
      compact: capabilities?.turns.compact ?? false,
      goal: capabilities?.controls.goals ?? false,
      fork: Boolean(capabilities?.branching.fork && onForkLatest),
      forkFromTurn: Boolean((capabilities?.branching.forkAt ?? capabilities?.branching.resumeAt) && onForkTurn && onOpenForkTurns),
      skills: capabilities?.management.skills ?? false,
      mcp: capabilities?.management.mcpStatus ?? false,
      hooks: capabilities?.management.hooks ?? false,
      hostConfigFiles: capabilities?.management.hostConfigFiles ?? false,
      mcpConfigEditing:
        mcpConfigFormat === 'codex-toml' &&
        Boolean(capabilities?.management.hostConfigFiles) &&
        Boolean(onReadProviderConfig) &&
        Boolean(onWriteProviderConfig),
      hookTrust: capabilities?.management.hookTrust ?? false,
      planMode: capabilities?.controls.planMode ?? false,
      sandboxMode: capabilities?.controls.sandboxMode ?? false,
    }),
    [
      capabilities,
      onForkLatest,
      onForkTurn,
      onOpenForkTurns,
      mcpConfigFormat,
      onReadProviderConfig,
      onWriteProviderConfig,
    ],
  );
  const availableToolboxItems = useMemo(
    () => filterToolboxItemsForCapabilities(toolboxItems, slashCapabilities),
    [slashCapabilities, toolboxItems],
  );
  const menuRef = useRef<HTMLFormElement | null>(null);
  const promptRef = useRef<HTMLDivElement | null>(null);
  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const pendingSelectionRef = useRef<{ start: number; end: number } | null>(
    null,
  );
  const pendingInsertedAttachmentIdsRef = useRef<string[]>([]);
  const selectionSnapshotRef = useRef<{ start: number; end: number } | null>(
    null,
  );
  const renderedPreviewSignatureRef = useRef('');
  const renderedSanitizeNonceRef = useRef(0);
  const isShellView = activeView === 'shell';
  const canToggleShellView = shellAvailable || isShellView;
  const isMobileShell = Boolean(
    isShellView && shellControlState?.isMobileShell,
  );
  const shellPromptLabel = shellControlState?.promptLabel ?? null;
  const [isDragTargetActive, setIsDragTargetActive] = useState(false);
  const [editorSanitizeNonce, setEditorSanitizeNonce] = useState(0);
  const {
    prompt,
    attachments,
    isDraftControlled,
    updateDraft,
    flushControlledDraftToHost,
  } = useComposerDraft({
    isShellView,
    draftPrompt,
    draftAttachments,
    onDraftChange,
  });
  const attachmentPreviewUrls = useAttachmentPreviewUrls({
    attachments,
    isShellView,
  });
  const {
    displayedCollaborationMode,
    updateSettings: handleUpdateSettings,
  } = useComposerSettingsActions({
    collaborationMode,
    onUpdateSettings,
    closeMenu: () => setOpenMenu(null),
  });
  const { forkBusy, forkError, forkLatest, forkTurn } = useComposerForkActions({
    slashPanelView,
    onForkLatest,
    onForkTurn,
    closeMenu: () => setOpenMenu(null),
  });
  const {
    hooksPanelMode,
    hookScope,
    hookEventName,
    hookMatcher,
    hookCommand,
    hookTimeoutSec,
    hookStatusMessage,
    editingHookTarget,
    hookConfigBusy,
    hookConfigError,
    hookConfigSuccess,
    setHooksPanelMode,
    setEditingHookTarget,
    setHookScope,
    setHookEventName,
    setHookMatcher,
    setHookCommand,
    setHookTimeoutSec,
    setHookStatusMessage,
    clearHookConfigStatus,
    resetHookForm,
    startEditingHook,
    saveHook,
    trustHook,
    untrustHook,
  } = useComposerHookConfig({
    slashPanelView,
    hookCommandTemplates,
    onCreateHook,
    onUpdateHook,
    onTrustHook,
    onUntrustHook,
  });
  const {
    goalComposeMode,
    goalTokenBudget,
    goalBusy,
    goalLocalError,
    setGoalTokenBudget,
    submitGoal,
    enterGoalComposeMode,
    exitGoalComposeMode,
  } = useComposerGoal({
    prompt,
    goalTokenBudgetSource: goalState.data,
    promptRef,
    onOpenGoal,
    onPrepareGoalSubmit,
    onUpdateGoal,
    updateDraft,
    closeMenu: () => setOpenMenu(null),
    resetSlashPanel: () => setSlashPanelView('root'),
  });
  const {
    mcpHttpName,
    mcpHttpUrl,
    mcpRawBlock,
    mcpConfigPath,
    mcpConfigBusy,
    mcpConfigError,
    mcpConfigSuccess,
    setMcpHttpName,
    setMcpHttpUrl,
    setMcpRawBlock,
    clearMcpConfigStatus,
    prepareRawMcpBlock,
    saveHttpMcp,
    saveRawMcpBlock,
  } = useComposerMcpConfig({
    hostConfigFilesAvailable: slashCapabilities.hostConfigFiles,
    onReadProviderConfig,
    onWriteProviderConfig,
    setMcpPanelMode,
    onOpenMcp,
  });
  const { copiedSkillName, copySkillInvokeName } = useComposerMenuLifecycle({
    openMenu,
    setOpenMenu,
    slashPanelView,
    setSlashPanelView,
    setMcpPanelMode,
    clearMcpConfigStatus,
    clearHookConfigStatus,
  });

  const setPrompt = useCallback((
    next:
      | string
      | ((
          current: string,
          attachments: ComposerAttachmentDraft[],
        ) => {
          prompt: string;
          attachments?: ComposerAttachmentDraft[];
        }),
  ) => {
    updateDraft((current) => {
      if (typeof next === 'function') {
        const resolved = next(current.prompt, current.attachments);
        return {
          prompt: resolved.prompt,
          attachments: resolved.attachments ?? current.attachments,
        };
      }

      return {
        prompt: next,
        attachments: current.attachments,
      };
    });
  }, [updateDraft]);

  const currentModel = useMemo(
    () => modelOptions.find((entry) => entry.model === model) ?? null,
    [model, modelOptions],
  );
  const modelContextTitle = formatModelContextTitle(model, contextUsage);
  const supportedEfforts = currentModel?.supportedReasoningEfforts ?? [];
  const promptSegments = useMemo(
    () => tokenizePrompt(prompt, attachments),
    [attachments, prompt],
  );
  const previewSignature = useMemo(
    () =>
      Object.entries(attachmentPreviewUrls)
        .sort(([leftId], [rightId]) => leftId.localeCompare(rightId))
        .map(([clientId, previewUrl]) => `${clientId}:${previewUrl}`)
        .join('|'),
    [attachmentPreviewUrls],
  );

  function handleToolboxItemClick(
    item: AgentBackendToolboxItemSchemaDto,
    event: React.MouseEvent<HTMLButtonElement>,
  ) {
    event.stopPropagation();
    const decision = toolboxItemActionDecision(item, {
      fastMode,
      goalComposeMode,
    });
    switch (decision.type) {
      case 'toggleFast':
        void handleUpdateSettings({
          fastMode: decision.fastMode,
        });
        break;
      case 'runCompact':
        setOpenMenu(null);
        void onCompact?.();
        break;
      case 'enterGoalCompose':
        enterGoalComposeMode();
        break;
      case 'exitGoalCompose':
        exitGoalComposeMode();
        setOpenMenu(null);
        break;
      case 'openPanel':
        setSlashPanelView(decision.panel);
        if (decision.panel === 'skills') {
          void onOpenSkills?.();
        } else if (decision.panel === 'mcp') {
          void onOpenMcp?.();
        } else if (decision.panel === 'hooks') {
          void onOpenHooks?.();
        }
        break;
      case 'insertPrompt':
        insertPlainTextIntoPrompt(decision.text);
        setSlashPanelView('root');
        setOpenMenu(null);
        break;
      case 'openHarness':
        setOpenMenu(null);
        void onOpenHarness?.();
        break;
      case 'noop':
        break;
    }
  }

  function snapshotSelection() {
    const editor = promptRef.current;
    return editor ? snapshotEditorSelection(editor) : null;
  }

  const restoreSelection = useCallback(
    (selection: { start: number; end: number } | null) => {
      const editor = promptRef.current;
      if (!editor || !selection) {
        return;
      }

      restoreEditorSelection(editor, selection);
    },
    [],
  );

  const serializeEditorPrompt = useCallback(() => {
    const editor = promptRef.current;
    return editor ? serializePromptEditor(editor) : prompt;
  }, [prompt]);

  const { appendAttachments, appendDroppedAttachments } =
    useComposerAttachments({
      prompt,
      attachments,
      updateDraft,
      getSelection: snapshotSelection,
      selectionSnapshotRef,
      pendingSelectionRef,
      pendingInsertedAttachmentIdsRef,
      attachmentCapabilities,
      onRejected: setAttachmentError,
      onInserted: () => {
        setAttachmentError(null);
        setOpenMenu(null);
      },
    });
  const pickAttachment = useCallback(
    (
      kind: PromptAttachmentKindDto,
      inputRef: typeof photoInputRef | typeof fileInputRef,
    ) => {
      const capabilities = attachmentCapabilitiesRef.current;
      if (capabilities && !(kind === 'photo' ? capabilities.images : capabilities.files)) {
        return;
      }
      dismissPromptFocus();
      if (onPickAttachment) {
        onPickAttachment({
          kind,
          appendAttachments: (files, overrideKind = kind) =>
            appendAttachments(files, overrideKind),
          defaultPick: () => {
            const current = attachmentCapabilitiesRef.current;
            if (!current || (kind === 'photo' ? current.images : current.files)) {
              inputRef.current?.click();
            }
          },
        });
        return;
      }
      inputRef.current?.click();
    },
    [appendAttachments, dismissPromptFocus, onPickAttachment],
  );

  function insertPlainTextIntoPrompt(text: string) {
    if (!text) {
      return;
    }

    const selection = snapshotSelection() ?? selectionSnapshotRef.current;
    const start = selection?.start ?? prompt.length;
    const end = selection?.end ?? start;
    const normalizedText = normalizePromptText(text);
    const nextPrompt = `${prompt.slice(0, start)}${normalizedText}${prompt.slice(end)}`;

    updateDraft((current) => ({
      prompt: nextPrompt,
      attachments: current.attachments,
    }));

    const nextCaret = start + normalizedText.length;
    pendingSelectionRef.current = {
      start: nextCaret,
      end: nextCaret,
    };
    selectionSnapshotRef.current = {
      start: nextCaret,
      end: nextCaret,
    };
  }

  useComposerPromptDomSync({
    promptRef,
    isShellView,
    prompt,
    promptSegments,
    attachmentPreviewUrls,
    previewSignature,
    editorSanitizeNonce,
    pendingSelectionRef,
    pendingInsertedAttachmentIdsRef,
    selectionSnapshotRef,
    renderedPreviewSignatureRef,
    renderedSanitizeNonceRef,
    serializeEditorPrompt,
    restoreSelection,
  });

  function dismissPromptFocus() {
    promptRef.current?.blur();
    if (
      document.activeElement instanceof HTMLElement &&
      document.activeElement !== document.body
    ) {
      document.activeElement.blur();
    }
  }

  async function pasteClipboardIntoPrompt() {
    dismissPromptFocus();
    setOpenMenu(null);

    if (!navigator.clipboard?.readText) {
      return;
    }

    try {
      const clipboardText = await navigator.clipboard.readText();
      insertPlainTextIntoPrompt(clipboardText);
    } catch {
      return;
    }
  }

  async function submitPrompt() {
    if (submitInFlightRef.current) {
      return;
    }
    submitInFlightRef.current = true;

    try {
      if (isDraftControlled) {
        flushControlledDraftToHost();
      }

      if (goalComposeMode && !isShellView) {
        await submitGoal();
        return;
      }

      const submitInput = buildComposerSubmitInput({
        prompt,
        attachments,
        isShellView,
      });
      if (!submitInput) {
        return;
      }

      const submitted = await onSubmit(submitInput);
      if (submitted === false) {
        return;
      }
      updateDraft(() => ({
        prompt: '',
        attachments: [],
      }));
    } finally {
      submitInFlightRef.current = false;
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await submitPrompt();
  }

  function handlePromptInput() {
    // The browser owns the composition text and selection until it commits.
    if (promptRef.current?.dataset.imeComposing === 'true') return;
    const nextPrompt = serializeEditorPrompt();
    const nextSelection = snapshotSelection();
    selectionSnapshotRef.current = nextSelection;
    const editor = promptRef.current;
    const needsPlainTextDomSync = editor
      ? editorContainsStyledRichText(editor)
      : false;

    if (needsPlainTextDomSync) {
      pendingSelectionRef.current = nextSelection;
      setEditorSanitizeNonce((current) => current + 1);
    }

    updateDraft((current) => ({
      prompt: nextPrompt,
      attachments: current.attachments.filter((attachment) =>
        nextPrompt.includes(attachment.placeholder),
      ),
    }), 'deferred');
  }

  function handlePromptPaste(event: ClipboardEvent<HTMLDivElement>) {
    const files = extractFilesFromTransfer(
      event.clipboardData?.items,
      event.clipboardData?.files,
    );
    const pasteAction = derivePromptPasteAction({
      files,
      plainText: event.clipboardData?.getData('text/plain') ?? '',
      htmlText: event.clipboardData?.getData('text/html') ?? '',
      htmlToText: textFromClipboardHtml,
    });

    if (pasteAction.preventDefault) {
      event.preventDefault();
    }

    if (pasteAction.type === 'insert-text') {
      insertPlainTextIntoPrompt(pasteAction.text);
    } else if (pasteAction.type === 'append-files') {
      appendDroppedAttachments(pasteAction.files);
    }
  }

  function handlePromptDragEnter(event: DragEvent<HTMLDivElement>) {
    const dragAction = derivePromptFileDragAction(
      hasTransferFiles(event.dataTransfer?.items, event.dataTransfer?.files),
    );

    if (dragAction.preventDefault) {
      event.preventDefault();
    }
    if (dragAction.activateDragTarget && canAttach) {
      setIsDragTargetActive(true);
    }
  }

  function handlePromptDragOver(event: DragEvent<HTMLDivElement>) {
    const dragAction = derivePromptFileDragAction(
      hasTransferFiles(event.dataTransfer?.items, event.dataTransfer?.files),
    );

    if (dragAction.preventDefault) {
      event.preventDefault();
    }
    if (dragAction.activateDragTarget && event.dataTransfer) {
      event.dataTransfer.dropEffect = canAttach ? 'copy' : 'none';
    }
    if (dragAction.activateDragTarget && canAttach) {
      setIsDragTargetActive(true);
    }
  }

  function handlePromptDragLeave(event: DragEvent<HTMLDivElement>) {
    if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
      return;
    }
    setIsDragTargetActive(false);
  }

  function handlePromptDrop(event: DragEvent<HTMLDivElement>) {
    const files = extractFilesFromTransfer(
      event.dataTransfer?.items,
      event.dataTransfer?.files,
    );
    const dropAction = derivePromptDropAction(files);

    if (dropAction.preventDefault) {
      event.preventDefault();
    }
    if (dropAction.type === 'accept-files') {
      setIsDragTargetActive(false);
      appendDroppedAttachments(dropAction.files ?? []);
    }
  }

  function handlePromptKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Enter' && event.repeat) {
      event.preventDefault();
      return;
    }
    if (
      activeView === 'chat' &&
      event.key === '/' &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.altKey &&
      !busy &&
      !disabled &&
      availableToolboxItems.length > 0 &&
      serializeEditorPrompt().trim().length === 0
    ) {
      event.preventDefault();
      setSlashPanelView('root');
      setOpenMenu('slash');
      return;
    }

    const keyAction = derivePromptKeyDownAction({
      key: event.key,
      metaKey: event.metaKey,
      ctrlKey: event.ctrlKey,
      busy,
      disabled,
    });

    if (keyAction.preventDefault) {
      event.preventDefault();
    }
    if (keyAction.submit) {
      void submitPrompt();
    }
  }

  const {
    promptPlaceholder,
    interruptLabel,
    sendButtonLabel,
    sendButtonClassName,
    modelControlsDisabled,
    effortControlsDisabled,
    effortControlTitle,
  } = buildComposerControlState({
    goalComposeMode,
    goalBusy,
    threadConnected,
    busy,
    isShellView,
    disabledPlaceholder,
    settingsBusy,
    supportedEffortCount: supportedEfforts.length,
    fastMode,
  });
  const {
    composerLayerClassName,
    formClassName,
    composerShellClassName,
    composerToolbarClassName,
    composerIconButtonClassName,
    composerMenuClassName,
    composerMenuItemClassName,
    composerInlineToggleClassName,
    composerPanelButtonClassName,
    composerChipButtonClassName,
    composerSendButtonClassName,
    composerPromptRegionClassName,
    promptInputClassName,
    graphChatInputGroupClassName,
    graphChatInputClassName,
  } = buildComposerClassNames({
    isShellView,
    edgeToEdgeMobile,
    isMobileShell,
    openMenu: openMenu !== null,
    isDragTargetActive,
    busy,
  });
  const toolbarProps = useComposerToolbarProps({
    attachmentCapabilities,
    isShellView,
    canToggleShellView,
    isMobileShell,
    shellPromptLabel,
    openMenu,
    toolbarClassName: composerToolbarClassName,
    iconButtonClassName: composerIconButtonClassName,
    menuClassName: composerMenuClassName,
    menuItemClassName: composerMenuItemClassName,
    panelButtonClassName: composerPanelButtonClassName,
    chipButtonClassName: composerChipButtonClassName,
    inlineToggleClassName: composerInlineToggleClassName,
    sendButtonBaseClassName: composerSendButtonClassName,
    slashPanelView,
    availableToolboxItems,
    busy,
    settingsBusy,
    compactBusy,
    forkBusy,
    forkError,
    fastMode,
    goalComposeMode,
    goalBusy,
    goalStatus: goalState.data?.status,
    activeView,
    disabled,
    model,
    modelOptions,
    modelContextTitle,
    contextUsage,
    reasoningEffort,
    supportedEfforts,
    displayedCollaborationMode,
    sandboxMode,
    sendButtonLabel,
    sendButtonClassName,
    modelControlsDisabled,
    effortControlsDisabled,
    effortControlTitle,
    forkTurnOptionsState,
    skillsState,
    goalState,
    goalHistory,
    copiedSkillName,
    hooksPanelMode,
    hooksState,
    hookConfigBusy,
    hookConfigError,
    hookConfigSuccess,
    editingHookTarget,
    hookScope,
    hookEventName,
    hookMatcher,
    hookCommand,
    hookTimeoutSec,
    hookStatusMessage,
    mcpPanelMode,
    mcpState,
    mcpConfigPath,
    mcpConfigError,
    mcpConfigSuccess,
    mcpConfigBusy,
    mcpHttpName,
    mcpHttpUrl,
    mcpRawBlock,
    capabilities: {
      hostConfigFiles: slashCapabilities.hostConfigFiles,
      hookTrust: slashCapabilities.hookTrust,
      mcpConfigEditing: slashCapabilities.mcpConfigEditing,
      planMode: slashCapabilities.planMode,
      forkFromTurn: slashCapabilities.forkFromTurn,
      sandboxMode: hideSandboxModeControl ? false : slashCapabilities.sandboxMode,
    },
    shellControlState,
    onToggleView,
    onDismissPromptFocus: dismissPromptFocus,
    onSetOpenMenu: setOpenMenu,
    onToolboxItemClick: handleToolboxItemClick,
    onSetSlashPanelView: setSlashPanelView,
    onViewGoals: onOpenGoal,
    onUpdateGoal,
    onOpenForkTurns: () => onOpenForkTurns?.(),
    onForkLatest: forkLatest,
    onForkTurn: forkTurn,
    onCopySkillInvokeName: copySkillInvokeName,
    onResetHookForm: resetHookForm,
    onSetHooksPanelMode: setHooksPanelMode,
    onClearHookConfigStatus: clearHookConfigStatus,
    onSetEditingHookTarget: setEditingHookTarget,
    onSetHookScope: setHookScope,
    onSetHookEventName: setHookEventName,
    onSetHookMatcher: setHookMatcher,
    onSetHookCommand: setHookCommand,
    onSetHookTimeoutSec: setHookTimeoutSec,
    onSetHookStatusMessage: setHookStatusMessage,
    onSaveHook: saveHook,
    onStartEditingHook: startEditingHook,
    onTrustHook: trustHook,
    onUntrustHook: untrustHook,
    onSetMcpPanelMode: setMcpPanelMode,
    onClearMcpConfigStatus: clearMcpConfigStatus,
    onSetMcpHttpName: setMcpHttpName,
    onSetMcpHttpUrl: setMcpHttpUrl,
    onSetMcpRawBlock: setMcpRawBlock,
    onPrepareRawMcpBlock: prepareRawMcpBlock,
    onSaveHttpMcp: saveHttpMcp,
    onSaveRawMcpBlock: saveRawMcpBlock,
    onPickPhoto: () => pickAttachment('photo', photoInputRef),
    onPickFile: () => pickAttachment('file', fileInputRef),
    onUpdateSettings: (input) => void handleUpdateSettings(input),
    onPasteShell: () => void pasteClipboardIntoPrompt(),
    onCopyShell: () => {
      dismissPromptFocus();
      setOpenMenu(null);
      void onShellCopy?.();
    },
    onClearShell: () => {
      dismissPromptFocus();
      setOpenMenu(null);
      void onSubmit({ prompt: 'clear' });
    },
    onShellControl: (action) => {
      dismissPromptFocus();
      setOpenMenu(null);
      void onShellControl?.(action);
    },
  });
  const {
    promptSlot,
    goalSlot,
    shellPromptSlot,
  } = useComposerPromptSlots({
    isShellView,
    promptRef,
    prompt,
    disabled,
    promptPlaceholder,
    canInterrupt,
    interruptLabel,
    composerPromptRegionClassName,
    graphChatInputClassName,
    promptInputClassName,
    goalComposeMode,
    goalTokenBudget,
    goalLocalError,
    goalBusy,
    busy,
    sendButtonLabel,
    sendButtonClassName,
    onInterrupt,
    onPromptInput: handlePromptInput,
    onPromptPaste: handlePromptPaste,
    onPromptKeyDown: handlePromptKeyDown,
    onPromptKeyUp: () => {
      selectionSnapshotRef.current = snapshotSelection();
    },
    onPromptMouseUp: () => {
      selectionSnapshotRef.current = snapshotSelection();
    },
    onPromptBlur: () => {
      selectionSnapshotRef.current = snapshotSelection();
      setIsDragTargetActive(false);
      if (isDraftControlled) {
        flushControlledDraftToHost();
      }
    },
    onPromptDragEnter: handlePromptDragEnter,
    onPromptDragOver: handlePromptDragOver,
    onPromptDragLeave: handlePromptDragLeave,
    onPromptDrop: handlePromptDrop,
    onGoalTokenBudgetChange: setGoalTokenBudget,
    onCancelGoal: exitGoalComposeMode,
    onShellPromptChange: setPrompt,
  });

  return (
    <ComposerFrame
      activeView={activeView}
      layerClassName={composerLayerClassName}
      formClassName={formClassName}
      shellClassName={composerShellClassName}
      inputGroupClassName={graphChatInputGroupClassName}
      error={error ?? attachmentError}
      followTail={followTail}
      attachmentCapabilities={attachmentCapabilities}
      photoInputRef={photoInputRef}
      fileInputRef={fileInputRef}
      onAppendAttachments={appendAttachments}
      onToggleFollow={onToggleFollow}
      canJumpToPreviousTurn={canJumpToPreviousTurn}
      onJumpToPreviousTurn={onJumpToPreviousTurn}
      canJumpToNextTurn={canJumpToNextTurn}
      onJumpToNextTurn={onJumpToNextTurn}
      subscriptionUsage={subscriptionUsage}
      onSubmit={handleSubmit}
      formRef={menuRef}
      promptSlot={promptSlot}
      pendingQueueSlot={
        !isShellView && pendingPrompts.length > 0 ? (
          <ComposerPendingQueue
            prompts={pendingPrompts}
            onSteer={onSteerPendingPrompt}
            onCancel={onCancelPendingPrompt}
          />
        ) : null
      }
      toolbarSlot={
        <ComposerToolbar {...toolbarProps} />
      }
      goalSlot={goalSlot}
      shellPromptSlot={shellPromptSlot}
    />
  );
}

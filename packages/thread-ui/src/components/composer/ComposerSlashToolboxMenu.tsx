import { ComposerMenuSurface } from './ComposerMenuSurface';
import type {
  AgentBackendToolboxItemSchemaDto,
  AgentHookDto,
  AgentHookEventNameDto,
  CollaborationModeDto,
  ThreadForkTurnOptionDto,
  ThreadHooksDto,
  ThreadMcpServersDto,
  ThreadSkillsDto,
  ThreadGoalDto,
  UpdateThreadHookInput,
  UpdateThreadGoalInput,
  UpdateThreadSettingsInput,
} from '@remote-codex/shared';
import type { MouseEvent } from 'react';

import { InputGroupButton } from '../graph-ui/InputGroup';
import { SlashIcon } from './composerPresentation';
import {
  ComposerForkPanel,
  ComposerForkTurnsPanel,
} from './ComposerForkPanels';
import { ComposerHooksPanel } from './ComposerHooksPanel';
import { ComposerGoalsPanel } from './ComposerGoalsPanel';
import { ComposerMcpPanel } from './ComposerMcpPanel';
import { ComposerSkillsPanel } from './ComposerSkillsPanel';
import type {
  HookScope,
  HooksPanelMode,
  McpPanelMode,
  SlashPanelState,
  SlashPanelView,
} from './types';

export function ComposerSlashToolboxMenu({
  open,
  slashPanelView,
  availableToolboxItems,
  planModeAvailable,
  forkFromTurnAvailable,
  displayedCollaborationMode,
  settingsBusy,
  busy,
  forkBusy,
  forkError,
  forkTurnOptionsState,
  skillsState,
  goalState,
  goalHistory,
  goalBusy,
  copiedSkillName,
  hooksPanelMode,
  hooksState,
  hostConfigFilesAvailable,
  hookTrustAvailable,
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
  mcpConfigEditing,
  mcpConfigPath,
  mcpConfigError,
  mcpConfigSuccess,
  mcpConfigBusy,
  mcpHttpName,
  mcpHttpUrl,
  mcpRawBlock,
  iconButtonClassName,
  menuClassName,
  menuItemClassName,
  panelButtonClassName,
  chipButtonClassName,
  onToggle,
  onToolboxItemClick,
  onUpdateSettings,
  toolboxItemDisabled,
  toolboxItemClassName,
  toolboxItemStatus,
  onSetSlashPanelView,
  onViewGoals,
  onUpdateGoal,
  onOpenForkTurns,
  onForkLatest,
  onForkTurn,
  onCopySkillInvokeName,
  onResetHookForm,
  onSetHooksPanelMode,
  onClearHookConfigStatus,
  onSetEditingHookTarget,
  onSetHookScope,
  onSetHookEventName,
  onSetHookMatcher,
  onSetHookCommand,
  onSetHookTimeoutSec,
  onSetHookStatusMessage,
  onSaveHook,
  onStartEditingHook,
  onTrustHook,
  onUntrustHook,
  onSetMcpPanelMode,
  onClearMcpConfigStatus,
  onSetMcpHttpName,
  onSetMcpHttpUrl,
  onSetMcpRawBlock,
  onPrepareRawMcpBlock,
  onSaveHttpMcp,
  onSaveRawMcpBlock,
}: {
  open: boolean;
  slashPanelView: SlashPanelView;
  availableToolboxItems: AgentBackendToolboxItemSchemaDto[];
  planModeAvailable: boolean;
  forkFromTurnAvailable: boolean;
  displayedCollaborationMode: CollaborationModeDto;
  settingsBusy: boolean;
  busy: boolean;
  forkBusy: boolean;
  forkError?: string | null;
  forkTurnOptionsState: SlashPanelState<ThreadForkTurnOptionDto[]>;
  skillsState: SlashPanelState<ThreadSkillsDto>;
  goalState: SlashPanelState<ThreadGoalDto | null | undefined>;
  goalHistory: ThreadGoalDto[];
  goalBusy: boolean;
  copiedSkillName: string | null;
  hooksPanelMode: HooksPanelMode;
  hooksState: SlashPanelState<ThreadHooksDto>;
  hostConfigFilesAvailable: boolean;
  hookTrustAvailable: boolean;
  hookConfigBusy: boolean;
  hookConfigError: string | null;
  hookConfigSuccess: string | null;
  editingHookTarget: UpdateThreadHookInput['target'] | null;
  hookScope: HookScope;
  hookEventName: AgentHookEventNameDto;
  hookMatcher: string;
  hookCommand: string;
  hookTimeoutSec: string;
  hookStatusMessage: string;
  mcpPanelMode: McpPanelMode;
  mcpState: SlashPanelState<ThreadMcpServersDto>;
  mcpConfigEditing: boolean;
  mcpConfigPath: string | null;
  mcpConfigError: string | null;
  mcpConfigSuccess: string | null;
  mcpConfigBusy: boolean;
  mcpHttpName: string;
  mcpHttpUrl: string;
  mcpRawBlock: string;
  iconButtonClassName: string;
  menuClassName: string;
  menuItemClassName: string;
  panelButtonClassName: string;
  chipButtonClassName: string;
  onToggle: () => void;
  onToolboxItemClick: (
    item: AgentBackendToolboxItemSchemaDto,
    event: MouseEvent<HTMLButtonElement>,
  ) => void;
  onUpdateSettings: (input: UpdateThreadSettingsInput) => void;
  toolboxItemDisabled: (item: AgentBackendToolboxItemSchemaDto) => boolean;
  toolboxItemClassName: (item: AgentBackendToolboxItemSchemaDto) => string;
  toolboxItemStatus: (item: AgentBackendToolboxItemSchemaDto) => string;
  onSetSlashPanelView: (view: SlashPanelView) => void;
  onViewGoals?: () => Promise<void> | void;
  onUpdateGoal?: (input: UpdateThreadGoalInput) => Promise<void> | void;
  onOpenForkTurns: () => Promise<void> | void;
  onForkLatest: () => Promise<void> | void;
  onForkTurn: (turnId: string) => Promise<void> | void;
  onCopySkillInvokeName: (skillName: string) => Promise<void> | void;
  onResetHookForm: () => void;
  onSetHooksPanelMode: (mode: HooksPanelMode) => void;
  onClearHookConfigStatus: () => void;
  onSetEditingHookTarget: (
    target: UpdateThreadHookInput['target'] | null,
  ) => void;
  onSetHookScope: (scope: HookScope) => void;
  onSetHookEventName: (eventName: AgentHookEventNameDto) => void;
  onSetHookMatcher: (value: string) => void;
  onSetHookCommand: (value: string) => void;
  onSetHookTimeoutSec: (value: string) => void;
  onSetHookStatusMessage: (value: string) => void;
  onSaveHook: () => Promise<void> | void;
  onStartEditingHook: (hook: AgentHookDto) => void;
  onTrustHook: (hook: AgentHookDto) => Promise<void> | void;
  onUntrustHook: (hook: AgentHookDto) => Promise<void> | void;
  onSetMcpPanelMode: (mode: McpPanelMode) => void;
  onClearMcpConfigStatus: () => void;
  onSetMcpHttpName: (value: string) => void;
  onSetMcpHttpUrl: (value: string) => void;
  onSetMcpRawBlock: (value: string) => void;
  onPrepareRawMcpBlock: () => Promise<void> | void;
  onSaveHttpMcp: () => Promise<void> | void;
  onSaveRawMcpBlock: () => Promise<void> | void;
}) {
  return (
    <div className="relative">
      <InputGroupButton
        type="button"
        variant="ghost"
        size="icon-xs"
        data-composer-menu-trigger="true"
        aria-label="Open slash toolbox"
        title="Open slash toolbox"
        onClick={onToggle}
        className={`${iconButtonClassName} h-9 w-9 rounded-full sm:h-8 sm:w-8`}
      >
        <SlashIcon />
      </InputGroupButton>

      {open && (
        <ComposerMenuSurface
          align="start"
          className={`${menuClassName} w-72 rounded-2xl border bg-stone-900/72 shadow-2xl shadow-stone-950/20 backdrop-blur-xl`}
          onClick={(event) => {
            event.stopPropagation();
          }}
          onMouseDown={(event) => {
            event.stopPropagation();
          }}
          onPointerDown={(event) => {
            event.stopPropagation();
          }}
          onTouchStart={(event) => {
            event.stopPropagation();
          }}
        >
          {slashPanelView === 'root' ? (
            <div className="p-2">
              {planModeAvailable ? (
                <button
                  type="button"
                  aria-pressed={displayedCollaborationMode === 'plan'}
                  disabled={settingsBusy}
                  onClick={() =>
                    onUpdateSettings({
                      collaborationMode:
                        displayedCollaborationMode === 'plan'
                          ? 'default'
                          : 'plan',
                    })
                  }
                  className={`${
                    displayedCollaborationMode === 'plan'
                      ? 'ui-status-warning'
                      : menuItemClassName
                  } block w-full rounded-xl px-3 py-2 text-left text-sm transition disabled:cursor-not-allowed disabled:opacity-60`}
                  title="Toggle plan mode"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span>/plan</span>
                    <span className="text-[11px] uppercase tracking-[0.16em] text-stone-400">
                      {displayedCollaborationMode === 'plan' ? 'On' : 'Off'}
                    </span>
                  </div>
                </button>
              ) : null}
              {availableToolboxItems.map((item, index) =>
                item.action === 'goal' ? (
                  <div
                    key={`${item.action}:${item.command}`}
                    className={`mt-1 flex min-h-11 overflow-hidden rounded-xl border border-[var(--theme-border)] ${index === 0 && !planModeAvailable ? 'mt-0' : ''}`}
                    title={item.description ?? item.label}
                  >
                    <button
                      type="button"
                      disabled={toolboxItemDisabled(item)}
                      onClick={() => {
                        onSetSlashPanelView('goals');
                        void onViewGoals?.();
                      }}
                      className="min-w-0 flex-1 px-3 py-2.5 text-left text-sm text-[var(--theme-fg)] transition hover:bg-[var(--theme-hover)] focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--theme-accent-border)] disabled:cursor-not-allowed disabled:opacity-45"
                      aria-label="View goals"
                    >
                      <span>{item.command}</span>
                    </button>
                    <button
                      type="button"
                      disabled={toolboxItemDisabled(item)}
                      onClick={(event) => onToolboxItemClick(item, event)}
                      className="min-w-14 border-l border-[var(--theme-border)] px-3 text-xs font-semibold text-[var(--theme-fg-muted)] transition hover:bg-[var(--theme-hover)] hover:text-[var(--theme-fg)] focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--theme-accent-border)] disabled:cursor-not-allowed disabled:opacity-45"
                      aria-label="Open goal composer"
                    >
                      Open
                    </button>
                  </div>
                ) : (
                  <button
                    key={`${item.action}:${item.command}`}
                    type="button"
                    disabled={toolboxItemDisabled(item)}
                    onClick={(event) => onToolboxItemClick(item, event)}
                    className={`${toolboxItemClassName(item)} ${index === 0 && !planModeAvailable ? 'mt-0' : ''}`}
                    title={item.description ?? item.label}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span>{item.command}</span>
                      <span className="text-[11px] uppercase tracking-[0.16em] text-stone-400">
                        {toolboxItemStatus(item)}
                      </span>
                    </div>
                  </button>
                ),
              )}
              {availableToolboxItems.length === 0 && !planModeAvailable ? (
                <p className="px-3 py-2 text-sm text-stone-400">
                  No backend tools are available for this thread.
                </p>
              ) : null}
            </div>
          ) : (
            <div className="flex min-h-0 max-h-80 flex-col">
              {forkBusy && (slashPanelView === 'fork' || slashPanelView === 'forkTurns') ? (
                <p role="status" className="shrink-0 px-3 py-2 text-sm text-[var(--theme-fg-muted)]">
                  Creating fork… You will be taken to the new thread when it is ready.
                </p>
              ) : null}
              {forkError && (slashPanelView === 'fork' || slashPanelView === 'forkTurns') ? (
                <p role="alert" className="m-2 shrink-0 rounded-xl border border-[var(--status-danger-border)] bg-[var(--status-danger-bg)] px-3 py-3 text-sm text-[var(--status-danger-fg)]">
                  {forkError}
                </p>
              ) : null}
              <div className="min-h-0 overflow-auto">
              {slashPanelView === 'goals' ? (
                <ComposerGoalsPanel
                  goalState={goalState}
                  goalHistory={goalHistory}
                  busy={goalBusy}
                  onBack={() => onSetSlashPanelView('root')}
                  onUpdateGoal={onUpdateGoal}
                />
              ) : slashPanelView === 'fork' ? (
                <ComposerForkPanel
                  busy={busy}
                  forkBusy={forkBusy}
                  forkFromTurnAvailable={forkFromTurnAvailable}
                  composerMenuItemClassName={menuItemClassName}
                  onForkLatest={onForkLatest}
                  onSelectForkTurnPanel={() => {
                    onSetSlashPanelView('forkTurns');
                    return onOpenForkTurns();
                  }}
                />
              ) : slashPanelView === 'forkTurns' ? (
                <ComposerForkTurnsPanel
                  forkTurnOptionsState={forkTurnOptionsState}
                  forkBusy={forkBusy}
                  composerPanelButtonClassName={panelButtonClassName}
                  onForkTurn={onForkTurn}
                />
              ) : slashPanelView === 'skills' ? (
                <ComposerSkillsPanel
                  skillsState={skillsState}
                  copiedSkillName={copiedSkillName}
                  composerChipButtonClassName={chipButtonClassName}
                  onCopySkillInvokeName={onCopySkillInvokeName}
                />
              ) : slashPanelView === 'hooks' ? (
                <ComposerHooksPanel
                  hooksPanelMode={hooksPanelMode}
                  hooksState={hooksState}
                  hostConfigFilesAvailable={hostConfigFilesAvailable}
                  hookTrustAvailable={hookTrustAvailable}
                  hookConfigBusy={hookConfigBusy}
                  hookConfigError={hookConfigError}
                  hookConfigSuccess={hookConfigSuccess}
                  editingHookTarget={editingHookTarget}
                  hookScope={hookScope}
                  hookEventName={hookEventName}
                  hookMatcher={hookMatcher}
                  hookCommand={hookCommand}
                  hookTimeoutSec={hookTimeoutSec}
                  hookStatusMessage={hookStatusMessage}
                  composerChipButtonClassName={chipButtonClassName}
                  onResetHookForm={onResetHookForm}
                  onSetHooksPanelMode={onSetHooksPanelMode}
                  onClearHookConfigStatus={onClearHookConfigStatus}
                  onSetEditingHookTarget={onSetEditingHookTarget}
                  onSetHookScope={onSetHookScope}
                  onSetHookEventName={onSetHookEventName}
                  onSetHookMatcher={onSetHookMatcher}
                  onSetHookCommand={onSetHookCommand}
                  onSetHookTimeoutSec={onSetHookTimeoutSec}
                  onSetHookStatusMessage={onSetHookStatusMessage}
                  onSaveHook={onSaveHook}
                  onStartEditingHook={onStartEditingHook}
                  onTrustHook={onTrustHook}
                  onUntrustHook={onUntrustHook}
                />
              ) : (
                <ComposerMcpPanel
                  mcpPanelMode={mcpPanelMode}
                  mcpState={mcpState}
                  mcpConfigEditing={mcpConfigEditing}
                  mcpConfigPath={mcpConfigPath}
                  mcpConfigError={mcpConfigError}
                  mcpConfigSuccess={mcpConfigSuccess}
                  mcpConfigBusy={mcpConfigBusy}
                  mcpHttpName={mcpHttpName}
                  mcpHttpUrl={mcpHttpUrl}
                  mcpRawBlock={mcpRawBlock}
                  composerPanelButtonClassName={panelButtonClassName}
                  composerChipButtonClassName={chipButtonClassName}
                  onSetMcpPanelMode={onSetMcpPanelMode}
                  onClearMcpConfigStatus={onClearMcpConfigStatus}
                  onSetMcpHttpName={onSetMcpHttpName}
                  onSetMcpHttpUrl={onSetMcpHttpUrl}
                  onSetMcpRawBlock={onSetMcpRawBlock}
                  onPrepareRawMcpBlock={onPrepareRawMcpBlock}
                  onSaveHttpMcp={onSaveHttpMcp}
                  onSaveRawMcpBlock={onSaveRawMcpBlock}
                />
              )}
              </div>
            </div>
          )}
        </ComposerMenuSurface>
      )}
    </div>
  );
}

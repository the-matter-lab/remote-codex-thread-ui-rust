import { Users, Link2, FileCode, Pencil } from 'lucide-react';
import { useEffect, useMemo, useState, type ReactNode, type FormEvent } from 'react';
import { createPortal } from 'react-dom';

import type {
  ExportThreadTranscriptInput,
  ThreadExportFormatDto,
  ThreadExportTurnOptionDto,
  ThreadExportTurnOptionsDto,
} from '@remote-codex/shared';

type TurnSelectionMode = 'latest-3' | 'latest-10' | 'latest-20' | 'all-loaded' | 'custom';
type ThreadActionMode = ThreadExportFormatDto | 'share' | 'link';
type RelayThreadAccess = 'read' | 'control';
type RelayWorkspaceAccess = 'none' | 'read' | 'write';

interface ExportTurnsState {
  status: 'idle' | 'loading' | 'ready' | 'failed';
  data: ThreadExportTurnOptionsDto | null;
  error: string | null;
}

export interface CreateThreadShareInput {
  scope?: 'thread' | 'device';
  targetIdentifier: string;
  threadAccess: RelayThreadAccess;
  workspaceAccess: RelayWorkspaceAccess;
  label?: string | null;
}

export interface ThreadShareSummary {
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

export interface ThreadActionsDialogProps {
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

function formatTurnTime(value: string | null) {
  if (!value) {
    return 'No time';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}

function statusLabel(status: ThreadExportTurnOptionDto['status']) {
  switch (status) {
    case 'inProgress':
      return 'running';
    case 'completed':
      return 'completed';
    case 'interrupted':
      return 'interrupted';
    case 'failed':
      return 'failed';
  }
}

function turnSelectionLabel(mode: TurnSelectionMode) {
  switch (mode) {
    case 'latest-3':
      return 'Latest 3';
    case 'latest-10':
      return 'Latest 10';
    case 'latest-20':
      return 'Latest 20';
    case 'all-loaded':
      return 'All loaded';
    case 'custom':
      return 'Custom';
  }
}

function latestLimit(mode: TurnSelectionMode) {
  switch (mode) {
    case 'latest-3':
      return 3;
    case 'latest-10':
      return 10;
    case 'latest-20':
      return 20;
    default:
      return null;
  }
}

function shareThreadAccessLabel(access: RelayThreadAccess | undefined) {
  return access === 'read' ? 'View only' : 'Collaborator';
}

function shareWorkspaceAccessLabel(access: RelayWorkspaceAccess | undefined) {
  switch (access) {
    case 'write':
      return 'Workspace write';
    case 'read':
      return 'Workspace read';
    case 'none':
    default:
      return 'No workspace';
  }
}

export function ThreadActionsDialog({
  appearance = 'default',
  open,
  busy = false,
  turnsState,
  shareAvailable = false,
  shareUnavailableMessage = 'Relay sharing will be enabled after the relay permission model is connected.',
  shareState,
  initialMode = 'html',
  onCancel,
  onLoadTurns,
  onExport,
  onCreateShare,
  onRevokeShare,
  deviceShareAvailable = false,
  linkContent, onUpdateShare,
}: ThreadActionsDialogProps) {
  const turns = useMemo(() => turnsState.data?.turns ?? [], [turnsState.data?.turns]);
  const [actionMode, setActionMode] = useState<ThreadActionMode>(initialMode);
  const [turnSelection, setTurnSelection] = useState<TurnSelectionMode>('latest-10');
  const [selectedTurnIds, setSelectedTurnIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [includeTokenAndPrice, setIncludeTokenAndPrice] = useState(true);
  const [targetIdentifier, setTargetIdentifier] = useState('');
  const [threadAccess, setThreadAccess] = useState<RelayThreadAccess>('read');
  const [workspaceAccess, setWorkspaceAccess] = useState<RelayWorkspaceAccess>('none');
  const [shareLabel, setShareLabel] = useState('');
  const [shareDevice, setShareDevice] = useState(false);
  const [editingShare, setEditingShare] = useState<string | null>(null);
  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>(() =>
    typeof document !== 'undefined' &&
    !document.documentElement.classList.contains('dark')
      ? 'light'
      : 'dark',
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    setActionMode(initialMode);
    setTurnSelection('latest-10');
    setIncludeTokenAndPrice(true);
    setTargetIdentifier('');
    setThreadAccess('read');
    setWorkspaceAccess('none');
    setShareLabel(''); setEditingShare(null); setShareDevice(false);
    void onLoadTurns();
  }, [initialMode, onLoadTurns, open]);

  useEffect(() => {
    if (open && turns.length > 0) {
      setSelectedTurnIds(new Set(turns.slice(0, 10).map((turn) => turn.turnId)));
    }
  }, [open, turns]);

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && !busy) {
        onCancel();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [busy, onCancel, open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const shell = document.querySelector<HTMLElement>('.thread-ui-shell');
    const readTheme = () => {
      if (!shell) {
        return document.documentElement.classList.contains('dark')
          ? 'dark'
          : 'light';
      }
      return shell.getAttribute('data-theme-effective') === 'dark' ||
        shell.classList.contains('dark') ||
        shell.classList.contains('thread-ui-theme-dark')
        ? 'dark'
        : 'light';
    };

    setEffectiveTheme(readTheme());
    if (!shell) {
      return;
    }

    const observer = new MutationObserver(() => setEffectiveTheme(readTheme()));
    observer.observe(shell, {
      attributes: true,
      attributeFilter: ['class', 'data-theme-effective'],
    });
    return () => observer.disconnect();
  }, [open]);

  if (!open) {
    return null;
  }

  const latestSelectedLimit = latestLimit(turnSelection);
  const selectedCount =
    latestSelectedLimit !== null
      ? Math.min(latestSelectedLimit, turnsState.data?.totalTurnCount ?? latestSelectedLimit)
      : turnSelection === 'all-loaded'
        ? turns.length
        : selectedTurnIds.size;
  const canExport =
    !busy &&
    actionMode !== 'share' && actionMode !== 'link' &&
    (latestSelectedLimit !== null ||
      turnSelection === 'all-loaded' ||
      selectedTurnIds.size > 0);
  const canShare =
    !busy &&
    shareAvailable &&
    Boolean(editingShare ? onUpdateShare : onCreateShare) &&
    targetIdentifier.trim().length > 0;

  function toggleTurn(turnId: string) {
    setSelectedTurnIds((current) => {
      const next = new Set(current);
      if (next.has(turnId)) {
        next.delete(turnId);
      } else {
        next.add(turnId);
      }
      return next;
    });
  }

  function handleExport() {
    if (actionMode === 'share' || actionMode === 'link') {
      return;
    }

    const input: ExportThreadTranscriptInput = {
      format: actionMode,
      ...(latestSelectedLimit !== null
        ? { mode: 'latest', limit: latestSelectedLimit }
        : turnSelection === 'all-loaded'
          ? { mode: 'selected', turnIds: turns.map((turn) => turn.turnId) }
          : { mode: 'selected', turnIds: [...selectedTurnIds] }),
      profile: 'review',
      options: {
        includeTokenAndPrice,
      },
    };
    void onExport(input);
  }

  function handleShare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canShare) {
      return;
    }
    const submit = editingShare ? (input: CreateThreadShareInput) => onUpdateShare?.(editingShare, input) : onCreateShare;
    void Promise.resolve(submit?.({
      targetIdentifier: targetIdentifier.trim(),
      scope: shareDevice ? 'device' : 'thread',
      threadAccess,
      workspaceAccess,
      label: shareLabel.trim() || null,
    })).then(() => {setEditingShare(null);setTargetIdentifier('');}).catch(() => {});
  }

  const actionTabs: Array<{ mode: ThreadActionMode; label: string }> = [
    { mode: 'share', label: 'People' },
    ...(linkContent ? [{mode: 'link' as const, label: 'Share as link'}] : []),
    { mode: 'html', label: 'HTML' },
  ];
  const matter = appearance === 'matter';
  const title = actionMode === 'link' ? 'Share read-only link' : actionMode === 'share' ? 'Sharing permissions' : 'Download HTML';
  const description = actionMode === 'link' ? 'Choose what to share and whether it stays up to date.' : actionMode === 'share' ? 'Choose who can view or collaborate on this thread.' : 'Save a readable copy of your conversation.';

  return createPortal(
    <div
      className={`thread-export-dialog-root ${matter ? 'matter-actions-dialog' : ''} thread-ui-theme-${effectiveTheme} fixed inset-0 z-[96] flex items-end justify-center p-0 sm:items-center sm:p-6`}
      data-theme-effective={effectiveTheme}
    >
      <button
        type="button"
        aria-label="Close thread actions"
        onClick={onCancel}
        disabled={busy}
        className="thread-export-dialog-backdrop absolute inset-0 backdrop-blur-sm disabled:cursor-not-allowed"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Thread actions"
        className="thread-export-dialog-panel relative z-[1] flex max-h-[min(48rem,calc(100vh-1rem))] w-full max-w-2xl flex-col rounded-t-[1.6rem] border shadow-2xl sm:rounded-[1.6rem]"
      >
        <div className="thread-export-dialog-header flex items-start justify-between gap-3 border-b px-5 py-4">
          <div className="min-w-0">
            <p className="thread-export-dialog-title text-sm font-semibold">{matter ? title : 'Share & export'}</p>
            <p className="thread-export-dialog-subtitle mt-1 text-xs">
              {matter ? description : 'Manage access or save a copy.'}
            </p>
          </div>
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onCancel}
            disabled={busy}
            className="thread-export-dialog-icon-button inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 fill-current">
              <path d="M3.22 2.47 8 7.25l4.78-4.78 1.06 1.06L9.06 8.31l4.78 4.78-1.06 1.06L8 9.37l-4.78 4.78-1.06-1.06 4.78-4.78-4.78-4.78 1.06-1.06Z" />
            </svg>
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-auto px-5 py-4">
          {!matter && <div className="thread-export-dialog-segment inline-flex rounded-full border p-1">
            {actionTabs.map((tab) => (
              <button
                key={tab.mode}
                type="button"
                onClick={() => setActionMode(tab.mode)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition ${
                  actionMode === tab.mode
                    ? 'ui-status-warning'
                    : 'thread-export-dialog-muted-action'
                }`}
              >
                {tab.mode === 'share' ? <Users size={16}/> : tab.mode === 'link' ? <Link2 size={16}/> : <FileCode size={16}/>}<span>{tab.label}</span>
              </button>
            ))}
          </div>}

          {actionMode === 'link' ? linkContent : actionMode === 'share' && matter && !shareAvailable ? (
            <p className="matter-sharing-unavailable" role="status"><Users size={20} />{shareUnavailableMessage}</p>
          ) : actionMode === 'share' ? (
            <form id="thread-actions-share-form" className="mt-4 space-y-4" onSubmit={handleShare}>
              <div className="thread-export-dialog-box rounded-2xl border">
                <div className="thread-export-dialog-box-header flex items-center justify-between border-b px-3 py-2.5">
                  <p className="thread-export-dialog-strong text-sm font-medium">People with access</p>
                  <span className="thread-export-dialog-status-pill rounded-full border px-2 py-0.5 text-[10px]">
                    {shareState?.shares.length ?? 0}
                  </span>
                </div>
                {shareState?.status === 'failed' ? (
                  <p className="px-3 py-3 text-sm text-rose-500 dark:text-rose-200">{shareState.error}</p>
                ) : shareState?.shares.length ? (
                  <div className="divide-y">
                    {shareState.shares.map((share) => (
                      <div key={share.id} className="flex flex-wrap items-center justify-between gap-2 px-3 py-2.5 text-sm">
                        <div className="min-w-0">
                          <p className="thread-export-dialog-strong truncate font-medium">
                            {share.targetUsername}
                          </p>
                          <p className="thread-export-dialog-subtitle mt-0.5 text-xs">
                            {share.scope === 'device' ? 'Whole device · ' : ''}{share.label ? `${share.label} · ` : ''}
                            {shareThreadAccessLabel(share.threadAccess)} / {shareWorkspaceAccessLabel(share.workspaceAccess)}
                          </p>
                        </div>
                        {onUpdateShare && <button type="button" aria-label={`Edit permissions for ${share.targetUsername}`} className="thread-export-dialog-secondary-button ml-auto flex items-center gap-1 rounded-lg border px-2 py-1.5 text-xs" disabled={busy} onClick={() => {setEditingShare(share.id);setShareDevice(share.scope === 'device');setTargetIdentifier(share.targetUsername);setThreadAccess(share.threadAccess ?? 'read');setWorkspaceAccess(share.workspaceAccess ?? 'none');setShareLabel(share.label ?? '');}}><Pencil size={13}/>Edit</button>}
                        {onRevokeShare ? (
                          <button
                            type="button"
                            className="thread-export-dialog-secondary-button rounded-full border px-3 py-1.5 text-xs transition"
                            disabled={busy}
                            onClick={() => void onRevokeShare(share.id)}
                          >
                            Revoke
                          </button>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="thread-export-dialog-subtitle px-3 py-3 text-sm">
                    No active shares for this thread.
                  </p>
                )}
              </div>

              {!shareAvailable ? (
                <p className="thread-export-dialog-box thread-export-dialog-subtitle rounded-2xl border px-3 py-3 text-sm">
                  {shareUnavailableMessage}
                </p>
              ) : null}
              {shareAvailable && deviceShareAvailable ? (
                <label className="matter-share-scope">
                  <input type="checkbox" checked={shareDevice} disabled={busy || Boolean(editingShare)} onChange={event => setShareDevice(event.target.checked)} />
                  <span><strong>Share whole device</strong><small>{shareDevice ? 'Applies to all threads on this device, with the permissions below.' : 'Off: only this conversation is shared.'}</small></span>
                </label>
              ) : null}

              <label className="thread-export-dialog-body-text block text-sm">
                {editingShare ? 'Edit member permissions' : 'Invite someone'}
                <input
                  className="thread-export-dialog-box mt-2 w-full rounded-xl border bg-transparent px-3 py-2 outline-none"
                  disabled={!shareAvailable || busy}
                  onChange={(event) => setTargetIdentifier(event.target.value)}
                  readOnly={Boolean(editingShare)}
                  placeholder="username or email"
                  value={targetIdentifier}
                />
              </label>

              {editingShare && <button type="button" className="thread-export-dialog-muted-action text-xs" onClick={() => {setEditingShare(null);setTargetIdentifier('');setThreadAccess('read');setWorkspaceAccess('none');setShareLabel('');}}>Cancel editing</button>}
              <fieldset className="thread-export-dialog-box rounded-2xl border p-3">
                <legend className="thread-export-dialog-subtitle px-1 text-xs">Thread access</legend>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {[
                    ['read', 'View only'],
                    ['control', 'Collaborator'],
                  ].map(([value, label]) => (
                    <label key={value} className="thread-export-dialog-turn-row flex items-center gap-2 rounded-xl px-2.5 py-2 text-sm">
                      <input
                        type="radio"
                        checked={threadAccess === value}
                        disabled={!shareAvailable || busy}
                        onChange={() => setThreadAccess(value as RelayThreadAccess)}
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset className="thread-export-dialog-box rounded-2xl border p-3">
                <legend className="thread-export-dialog-subtitle px-1 text-xs">Workspace</legend>
                <div className="mt-2 grid gap-2 sm:grid-cols-3">
                  {[
                    ['none', 'No access'],
                    ['read', 'Read files'],
                    ['write', 'Read and edit'],
                  ].map(([value, label]) => (
                    <label key={value} className="thread-export-dialog-turn-row flex items-center gap-2 rounded-xl px-2.5 py-2 text-sm">
                      <input
                        type="radio"
                        checked={workspaceAccess === value}
                        disabled={!shareAvailable || busy}
                        onChange={() => setWorkspaceAccess(value as RelayWorkspaceAccess)}
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="thread-export-dialog-body-text block text-sm">
                Label
                <input
                  className="thread-export-dialog-box mt-2 w-full rounded-xl border bg-transparent px-3 py-2 outline-none"
                  disabled={!shareAvailable || busy}
                  onChange={(event) => setShareLabel(event.target.value)}
                  placeholder="optional"
                  value={shareLabel}
                />
              </label>

            </form>
          ) : (
            <>
              <label className="thread-export-dialog-body-text mt-4 block text-sm">
                Turns
                <select
                  className="thread-export-dialog-box mt-2 w-full rounded-xl border bg-transparent px-3 py-2 outline-none"
                  value={turnSelection}
                  onChange={(event) => setTurnSelection(event.target.value as TurnSelectionMode)}
                >
                  {(['latest-3', 'latest-10', 'latest-20', 'all-loaded', 'custom'] as TurnSelectionMode[]).map((entry) => (
                    <option key={entry} value={entry}>
                      {turnSelectionLabel(entry)}
                    </option>
                  ))}
                </select>
              </label>

              {turnSelection === 'custom' ? (
                <div className="thread-export-dialog-box mt-4 rounded-2xl border">
                  <div className="thread-export-dialog-box-header flex flex-wrap items-center justify-between gap-2 border-b px-3 py-2.5">
                    <p className="thread-export-dialog-subtitle text-xs">
                      Selected {selectedTurnIds.size} of {turnsState.data?.totalTurnCount ?? turns.length}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedTurnIds(new Set(turns.map((turn) => turn.turnId)))}
                        className="thread-export-dialog-secondary-button rounded-full border px-2.5 py-1 text-xs transition"
                      >
                        Select all
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedTurnIds(new Set())}
                        className="thread-export-dialog-secondary-button rounded-full border px-2.5 py-1 text-xs transition"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                  {turnsState.status === 'loading' ? (
                    <p className="thread-export-dialog-subtitle px-3 py-6 text-sm">Loading turns...</p>
                  ) : turnsState.status === 'failed' ? (
                    <p className="px-3 py-6 text-sm text-rose-500 dark:text-rose-200">{turnsState.error}</p>
                  ) : (
                    <div className="max-h-80 overflow-auto p-2">
                      {turns.map((turn) => (
                        <label
                          key={turn.turnId}
                          className="thread-export-dialog-turn-row flex cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 text-sm transition"
                        >
                          <input
                            type="checkbox"
                            checked={selectedTurnIds.has(turn.turnId)}
                            onChange={() => toggleTurn(turn.turnId)}
                            className="thread-export-dialog-checkbox h-4 w-4"
                          />
                          <span className="thread-export-dialog-strong shrink-0 text-xs font-medium">
                            Turn {turn.turnNumber}
                          </span>
                          <span className="thread-export-dialog-subtitle shrink-0 text-xs">
                            {formatTurnTime(turn.startedAt)}
                          </span>
                          <span className="thread-export-dialog-body-text min-w-0 flex-1 truncate text-left">
                            {turn.userPromptPreview}
                          </span>
                          <span className="thread-export-dialog-status-pill hidden shrink-0 rounded-full border px-2 py-0.5 text-[10px] sm:inline">
                            {statusLabel(turn.status)}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ) : null}

              <div className={`thread-export-dialog-body-text mt-4 ${matter ? 'matter-export-options' : 'grid gap-2 text-sm sm:grid-cols-2'}`}>
                <label className="thread-export-dialog-box flex items-center gap-2 rounded-xl border px-3 py-2">
                  <input
                    type="checkbox"
                    checked={includeTokenAndPrice}
                    onChange={(event) => setIncludeTokenAndPrice(event.target.checked)}
                    className="thread-export-dialog-checkbox h-4 w-4"
                  />
                  Token and price
                </label>
                <p className="thread-export-dialog-box thread-export-dialog-subtitle flex items-center rounded-xl border px-3 py-2 text-xs">
                  HTML keeps the chat styling and omits tool activity.
                </p>
              </div>
            </>
          )}
        </div>

        <div className="thread-export-dialog-footer flex items-center justify-between gap-3 border-t px-5 py-4">
          <p className="thread-export-dialog-subtitle min-w-0 text-xs">
            {actionMode === 'link' ? 'Read-only · No login required' : actionMode === 'share'
              ? shareAvailable
                ? shareDevice ? 'Access applies to all threads on this device.' : 'Only invited members can access this thread.'
                : 'Sharing is unavailable in this connection.'
              : `${selectedCount} ${selectedCount === 1 ? 'turn' : 'turns'} selected.`}
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={busy}
              className="thread-export-dialog-secondary-button rounded-full border px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60"
            >
              {matter ? 'Close' : 'Cancel'}
            </button>
            {actionMode === 'link' || (matter && actionMode === 'share' && !shareAvailable) ? null : actionMode === 'share' ? (
              <button
                type="submit"
                form="thread-actions-share-form"
                disabled={!canShare}
                className={`${matter ? 'matter-dialog-primary' : 'ui-status-warning'} rounded-full px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60`}
              >
                {busy ? 'Saving...' : editingShare ? 'Save permissions' : shareDevice ? 'Share device' : 'Share this thread'}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleExport}
                disabled={!canExport}
                className={`${matter ? 'matter-dialog-primary' : 'ui-status-warning'} rounded-full px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60`}
              >
                {busy ? 'Exporting...' : `Export ${actionMode.toUpperCase()}`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export const ExportTranscriptDialog = ThreadActionsDialog;

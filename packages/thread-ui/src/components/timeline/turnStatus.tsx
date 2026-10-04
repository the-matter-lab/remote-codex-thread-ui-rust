import { useEffect, useState } from 'react';

import type { ThreadHistoryItemDto } from '@remote-codex/shared';

import {
  isActiveTurnStatus,
  type TimelineTurn,
} from './timelineItems';
import { formatTurnRuntimeSummary, TurnUsageInline } from './TurnUsageInline';
import {
  formatLongTimestamp,
  formatShortTimestamp,
  turnStatusLabel,
} from '../threadPresentation';

function RunningDots({
  tone = 'amber',
}: {
  tone?: 'amber' | 'emerald' | 'sky';
}) {
  const dotClassName =
    tone === 'emerald'
      ? 'bg-sky-200/90'
      : tone === 'sky'
        ? 'bg-sky-300/90'
        : 'bg-amber-200/90';

  return (
    <span className="ml-1.5 inline-flex items-center gap-1" aria-hidden="true">
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className={`h-1.5 w-1.5 rounded-full animate-pulse ${dotClassName}`}
          style={{ animationDelay: `${index * 180}ms` }}
        />
      ))}
    </span>
  );
}

export function normalizePlanStepStatus(status: string) {
  const normalized = status.trim().toLowerCase();

  if (
    normalized === 'completed' ||
    normalized === 'done' ||
    normalized === 'complete'
  ) {
    return 'completed' as const;
  }

  if (
    normalized === 'in_progress' ||
    normalized === 'in progress' ||
    normalized === 'inprogress' ||
    normalized === 'running' ||
    normalized === 'active'
  ) {
    return 'in_progress' as const;
  }

  if (
    normalized === 'pending' ||
    normalized === 'todo' ||
    normalized === 'not_started' ||
    normalized === 'not started' ||
    normalized === 'queued'
  ) {
    return 'pending' as const;
  }

  if (normalized === 'failed' || normalized === 'error') {
    return 'failed' as const;
  }

  return 'other' as const;
}

// Tool activity is not evidence that a particular plan step completed.
export function deriveDisplayedLivePlan(
  livePlan: {
    turnId: string;
    explanation: string | null;
    plan: Array<{ step: string; status: string }>;
  } | null,
  _items: ThreadHistoryItemDto[],
  _turnStatus: TimelineTurn['status'],
) {
  return livePlan;
}

function useSecondClock(enabled: boolean) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!enabled) {
      return;
    }

    setNow(Date.now());
    const interval = window.setInterval(() => setNow(Date.now()), 1_000);
    return () => window.clearInterval(interval);
  }, [enabled]);

  return now;
}

function formatElapsedDuration(
  startedAt: string | null | undefined,
  now: number,
) {
  const startedAtMillis = Date.parse(startedAt ?? '');
  if (!Number.isFinite(startedAtMillis)) {
    return null;
  }

  const totalSeconds = Math.max(0, Math.floor((now - startedAtMillis) / 1_000));
  const hours = Math.floor(totalSeconds / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
  }
  if (minutes > 0) {
    return `${minutes}m ${String(seconds).padStart(2, '0')}s`;
  }
  return `${seconds}s`;
}

function TurnStatusIndicator({
  status,
}: {
  status: TimelineTurn['status'];
}) {
  const label = turnStatusLabel(status);

  if (status === 'completed') {
    return (
      <span
        aria-label={label}
        title={label}
        className="timeline-status-icon timeline-status-icon-success inline-flex h-4 w-4 items-center justify-center"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="h-3.5 w-3.5 fill-none stroke-current"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3.75 8.25 2.5 2.5 6-6" />
        </svg>
      </span>
    );
  }

  if (status === 'failed') {
    return (
      <span
        aria-label={label}
        title={label}
        className="timeline-status-icon timeline-status-icon-failed inline-flex h-4 w-4 items-center justify-center"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="h-3.5 w-3.5 fill-none stroke-current"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m5 5 6 6M11 5l-6 6" />
        </svg>
      </span>
    );
  }

  if (status === 'interrupted') {
    return (
      <span
        aria-label={label}
        title={label}
        className="timeline-status-icon timeline-status-icon-warning inline-flex h-4 w-4 items-center justify-center"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="h-3.5 w-3.5 fill-none stroke-current"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 4.5v7M10 4.5v7" />
        </svg>
      </span>
    );
  }

  return (
    <span
      aria-label={label}
      title={label}
      className="inline-flex min-w-[1.25rem] items-center justify-center text-sky-200"
    >
      <RunningDots tone="emerald" />
    </span>
  );
}

export function TurnStatusBar({
  turn,
  variant = 'header',
  lastActivityAt = null,
}: {
  turn: TimelineTurn;
  variant?: 'header' | 'footer';
  lastActivityAt?: string | null;
}) {
  const label = turnStatusLabel(turn.status);
  const runtimeSummary = formatTurnRuntimeSummary(turn);
  const active = isActiveTurnStatus(turn.status);
  const now = useSecondClock(active && variant === 'footer');
  const elapsedLabel = active ? formatElapsedDuration(turn.startedAt, now) : null;
  const effectiveLastActivityAt = lastActivityAt ?? turn.startedAt;
  const toneClassName =
    turn.status === 'failed'
      ? 'border-rose-300/20 bg-rose-300/[0.06] text-rose-100'
      : active
        ? 'border-sky-300/22 bg-sky-300/[0.08] text-sky-100'
        : 'border-stone-700/90 bg-stone-900/70 text-stone-200';

  if (variant === 'footer') {
    return (
      <div className="thread-graph-turn-footer flex w-full items-center justify-between gap-3 text-xs">
        <div className="thread-graph-turn-footer-runtime flex min-w-0 items-center gap-2">
          <TurnStatusIndicator status={turn.status} />
          <TurnUsageInline turn={turn} />
        </div>
        <div className="thread-graph-turn-footer-meta timeline-meta-text flex min-w-0 shrink items-center justify-end gap-1 whitespace-nowrap">
          {effectiveLastActivityAt ? (
            <time
              dateTime={effectiveLastActivityAt}
              title={`Last activity ${formatLongTimestamp(effectiveLastActivityAt)}`}
            >
              {formatShortTimestamp(effectiveLastActivityAt)}
            </time>
          ) : null}
          {elapsedLabel ? (
            <span aria-label={`Running for ${elapsedLabel}`}>· {elapsedLabel}</span>
          ) : null}
        </div>
      </div>
    );
  }

  const title = `${label} · ${runtimeSummary}`;

  return (
    <span
      className={`inline-flex min-w-0 items-center gap-1.5 rounded-full border px-2 py-1 text-[10px] sm:text-[11px] ${toneClassName}`}
      title={title}
    >
      <TurnStatusIndicator status={turn.status} />
      <span className="timeline-meta-text min-w-0 truncate">
        {runtimeSummary}
      </span>
    </span>
  );
}

import { useState } from 'react';
import { formatLongTimestamp, formatShortTimestamp } from '../threadPresentation';
function formatRelativeTurnTime(
  startedAt: string | null | undefined,
  timestamp: string | null | undefined,
) {
  const startMillis = Date.parse(startedAt ?? '');
  const itemMillis = Date.parse(timestamp ?? '');
  if (!Number.isFinite(startMillis) || !Number.isFinite(itemMillis)) {
    return timestamp ? formatShortTimestamp(timestamp) : 'Time unavailable';
  }

  const totalSeconds = Math.max(
    0,
    Math.round((itemMillis - startMillis) / 1000),
  );
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
}

export function TimelineTimeToggle({
  absoluteLabel,
  className = '',
  timestamp,
  endTimestamp,
  turnStartedAt,
}: {
  absoluteLabel: string;
  endTimestamp?: string | null | undefined;
  className?: string;
  timestamp: string | null | undefined;
  turnStartedAt: string | null | undefined;
}) {
  const [showAbsolute, setShowAbsolute] = useState(false);
  if (!timestamp) {
    return null;
  }

  const absoluteTitle = formatLongTimestamp(timestamp);
  const relativeLabel = formatRelativeTurnTime(turnStartedAt, timestamp);
  const hasRange = endTimestamp && endTimestamp !== timestamp;
  const label = showAbsolute
    ? absoluteLabel + (hasRange ? ` – ${formatShortTimestamp(endTimestamp)}` : '')
    : relativeLabel + (hasRange ? ` – ${formatRelativeTurnTime(turnStartedAt, endTimestamp)}` : '');

  return (
    <span
      role="button"
      tabIndex={0}
      className={`thread-graph-relative-time rounded-full px-1.5 py-0.5 ${className}`}
      title={showAbsolute ? relativeLabel : absoluteTitle}
      aria-label={`Toggle timestamp, currently ${label}`}
      onClick={(event) => {
        event.stopPropagation();
        setShowAbsolute((value) => !value);
      }}
      onKeyDown={(event) => {
        if (event.key !== 'Enter' && event.key !== ' ') {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        setShowAbsolute((value) => !value);
      }}
    >
      <time dateTime={timestamp}>{label}</time>
    </span>
  );
}

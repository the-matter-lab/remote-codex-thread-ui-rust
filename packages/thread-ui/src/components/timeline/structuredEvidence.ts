import {
  validateProgress,
  validateUsage,
  type StructuredProgress,
  type StructuredUsage,
  type ThreadHistoryItemDto,
} from "@remote-codex/shared";

export function progressEvidence(item: ThreadHistoryItemDto): {
  data?: StructuredProgress;
  error?: string;
} {
  const value =
    item.progress ??
    (item.extension?.type === "elagente.progress"
      ? item.extension.data
      : undefined);
  if (value === undefined) return {};
  try {
    if (
      item.extension?.type === "elagente.progress" &&
      item.extension.version !== 1
    ) {
      throw new Error("Unsupported progress version");
    }
    return { data: validateProgress(value) };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Invalid tool evidence",
    };
  }
}

export function usageEvidenceResult(item: ThreadHistoryItemDto): {
  data?: StructuredUsage;
  error?: string;
} {
  const value =
    item.usage ??
    (item.extension?.type === "elagente.usage"
      ? item.extension.data
      : undefined);
  if (value === undefined) return {};
  try {
    if (
      item.extension?.type === "elagente.usage" &&
      item.extension.version !== 1
    ) {
      throw new Error("Unsupported usage version");
    }
    return { data: validateUsage(value) };
  } catch (caught) {
    return {
      error: caught instanceof Error ? caught.message : "Invalid usage report",
    };
  }
}

export function usageEvidence(item: ThreadHistoryItemDto) {
  return usageEvidenceResult(item).data;
}

// Observations are snapshots of a scope, not increments to sum together.
export function latestUsage(
  items: ThreadHistoryItemDto[],
  scope: StructuredUsage["scope"],
  scopeId?: string,
) {
  let latest: StructuredUsage | undefined;
  for (const item of items) {
    const usage = usageEvidence(item);
    if (
      usage?.scope !== scope ||
      (scopeId !== undefined && usage.scopeId !== scopeId)
    )
      continue;
    if (
      !latest ||
      Date.parse(usage.observedAt) >= Date.parse(latest.observedAt)
    )
      latest = usage;
  }
  return latest;
}

export function mergeTimelineItem(
  current: ThreadHistoryItemDto,
  incoming: ThreadHistoryItemDto,
  merge: (
    current: ThreadHistoryItemDto,
    incoming: ThreadHistoryItemDto,
  ) => ThreadHistoryItemDto,
) {
  const merged = merge(current, incoming);
  const previous = progressEvidence(current).data;
  const next = progressEvidence(incoming).data;
  if (!previous || !next || previous.callId !== next.callId) return merged;
  const terminal = (status: StructuredProgress["status"]) =>
    ["completed", "failed", "interrupted"].includes(status);
  // Reconnects may replay a running update after the durable terminal event.
  const progress =
    terminal(previous.status) && !terminal(next.status)
      ? previous
      : { ...previous, ...next };
  return { ...merged, progress };
}

// The host projector retains usage/updated params in this additive carrier.
export function scopeUsageItems(turn: {
  id: string;
  items: ThreadHistoryItemDto[];
  usageByScope?: Record<string, { usage?: StructuredUsage }>;
}): ThreadHistoryItemDto[] {
  return [
    ...turn.items,
    ...Object.entries(turn.usageByScope ?? {}).map(([key, entry]) => ({
      id: `usage:${turn.id}:${key}`,
      kind: "other" as const,
      text: "",
      ...(entry?.usage ? { usage: entry.usage } : {}),
    })),
  ];
}

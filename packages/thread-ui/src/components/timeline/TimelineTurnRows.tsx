import {
  memo,
  useCallback,
  useMemo,
  useState,
  type RefCallback,
  type ReactNode,
  type RefObject,
} from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

import type { ThreadHistoryItemDto } from '@remote-codex/shared';

import type { ThreadTimelineAdapter } from '../../adapters';
import {
  formatLongTimestamp,
  formatMessageTimestamp,
  formatPreciseMessageTimestamp,
  formatShortTimestamp,
} from '../threadPresentation';
import { GraphChatHistoryEntries } from '../graph-chat/GraphChatHistoryEntries';
import {
  GraphChatAgentToolCallItem as AgentToolCallItem,
  GraphChatAgentActivityGroupItem as AgentActivityGroupItem,
  GraphChatArtifactHistoryItem as ArtifactHistoryItem,
  GraphChatCommandGroupItem as CommandGroupItem,
  GraphChatCommandItem as CommandItem,
  GraphChatContextCompactionItem as ContextCompactionItem,
  GraphChatFileChangeGroupItem as FileChangeGroupItem,
  GraphChatFileChangeItem as FileChangeItem,
  GraphChatFileReadGroupItem as FileReadGroupItem,
  GraphChatFileReadItem as FileReadItem,
  GraphChatGenericHistoryItem as GenericHistoryItem,
  GraphChatHookItem as HookItem,
  GraphChatImageItem as ImageItem,
  GraphChatPlanHistoryItem as PlanHistoryItem,
  GraphChatSearchGroupItem as SearchGroupItem,
  GraphChatSkillToolCallItem as SkillToolCallItem,
  GraphChatToolCallItem as ToolCallItem,
  GraphChatToolCallGroupItem as ToolCallGroupItem,
  GraphChatWebSearchItem as WebSearchItem,
} from '../graph-chat/GraphChatHistoryItems';
import { GraphChatCompactMessageItem as CompactMessageItem } from '../graph-chat/GraphChatCompactMessageItem';
import { MessageExpansionScope } from '../graph-chat/MessageExpansionScope';
import { GraphChatTurnBody } from '../graph-chat/GraphChatTurnBody';
import { GraphChatTurnFrame } from '../graph-chat/GraphChatTurnFrame';
import {
  getLiveOutputTailForTurn,
  groupTimelineHistoryItems,
  isActiveTurnStatus,
  isCompactChatItem,
  mergeLiveTurnItems,
  parseHookPromptText,
  prepareTurnItemsForRendering,
  type TimelineHistoryEntry,
  type TimelineTurn,
} from './timelineItems';
import { TurnTokenSummary } from './tokenFormatting';
import { deriveDisplayedLivePlan, TurnStatusBar } from './turnStatus';
import { TurnUsageInline } from './TurnUsageInline';

type LivePlan = {
  turnId: string;
  explanation: string | null;
  plan: Array<{ step: string; status: string }>;
};

type SelectArtifactHandler = (input: {
  item: ThreadHistoryItemDto & { kind: 'artifact' };
  artifact: NonNullable<ThreadHistoryItemDto['artifact']>;
}) => void;

type OpenExpandedTextHandler = (title: string, text: string) => void;

type OpenCommandDetailHandler = (
  item: ThreadHistoryItemDto & { kind: 'commandExecution' },
  title: string,
) => void;

type OpenToolCallDetailHandler = (
  item: ThreadHistoryItemDto & {
    kind: 'toolCall' | 'agentToolCall' | 'skillToolCall';
  },
  title: string,
) => void;

type OpenDeferredHistoryItemDetailHandler = (
  item: ThreadHistoryItemDto,
  title: string,
  fallbackText: string,
  loadingText: string,
  errorText: string,
) => void;

function timestampForHistoryItem(
  item: ThreadHistoryItemDto,
  fallback: string | null,
) {
  return item.createdAt ?? fallback;
}

interface HistoryItemRowProps {
  threadId: string | undefined;
  item: ThreadHistoryItemDto;
  scrollRootRef: RefObject<HTMLDivElement | null>;
  timeLabel?: ReactNode;
  timeTitle?: string | null | undefined;
  timeMeta?: ReactNode;
  autoOpenToolDetails?: boolean;
  onOpenExpandedText: OpenExpandedTextHandler;
  onOpenCommandDetail: OpenCommandDetailHandler;
  onOpenToolCallDetail: OpenToolCallDetailHandler;
  onOpenDeferredHistoryItemDetail: OpenDeferredHistoryItemDetailHandler;
  onSelectArtifact?: SelectArtifactHandler;
  onBeforeMessageResize?: () => void;
  adapter?: ThreadTimelineAdapter | undefined;
}

export const HistoryItemRow = memo(function HistoryItemRow({
  threadId,
  item,
  scrollRootRef,
  onOpenExpandedText,
  onOpenCommandDetail,
  onOpenToolCallDetail,
  onOpenDeferredHistoryItemDetail,
  onSelectArtifact,
  onBeforeMessageResize,
  adapter,
  timeLabel,
  timeTitle,
  timeMeta,
  autoOpenToolDetails = false,
}: HistoryItemRowProps) {
  if (isCompactChatItem(item.kind)) {
    return (
      <CompactMessageItem
        threadId={threadId}
        item={
          item as ThreadHistoryItemDto & {
            kind: 'userMessage' | 'agentMessage';
          }
        }
        scrollRootRef={scrollRootRef}
        timeLabel={timeLabel}
        timeTitle={timeTitle}
        {...(onBeforeMessageResize ? { onBeforeMessageResize } : {})}
        {...(adapter ? { adapter } : {})}
      />
    );
  }

  if (item.kind === 'reasoning') {
    return (
      <CompactMessageItem
        item={{
          ...item,
          kind: 'agentMessage',
          status: item.status ?? null,
        }}
        scrollRootRef={scrollRootRef}
        timeLabel={timeLabel}
        timeTitle={timeTitle}
        {...(onBeforeMessageResize ? { onBeforeMessageResize } : {})}
      />
    );
  }

  if (item.kind === 'artifact') {
    return (
      <ArtifactHistoryItem
        {...(adapter?.onOpenWorkspaceFile ? {onOpenWorkspaceFile: adapter.onOpenWorkspaceFile} : {})}
        item={
          item as ThreadHistoryItemDto & {
            kind: 'artifact';
          }
        }
        timeMeta={timeMeta}
        {...(onSelectArtifact
          ? {
              onSelect: (nextItem, artifact) =>
                onSelectArtifact({ item: nextItem, artifact }),
            }
          : {})}
      />
    );
  }

  if (item.kind === 'commandExecution') {
    return (
      <CommandItem
        autoOpen={autoOpenToolDetails}
        item={
          item as ThreadHistoryItemDto & {
            kind: 'commandExecution';
          }
        }
        onOpen={onOpenCommandDetail}
        timeMeta={timeMeta}
      />
    );
  }

  if (item.kind === 'toolCall') {
    return (
      <ToolCallItem
        autoOpen={autoOpenToolDetails}
        item={
          item as ThreadHistoryItemDto & {
            kind: 'toolCall';
          }
        }
        onOpen={onOpenToolCallDetail}
        timeMeta={timeMeta}
      />
    );
  }

  if (item.kind === 'agentToolCall') {
    return (
      <AgentToolCallItem
        autoOpen={autoOpenToolDetails}
        item={
          item as ThreadHistoryItemDto & {
            kind: 'agentToolCall';
          }
        }
        onOpen={onOpenToolCallDetail}
        timeMeta={timeMeta}
      />
    );
  }

  if (item.kind === 'skillToolCall') {
    return (
      <SkillToolCallItem
        autoOpen={autoOpenToolDetails}
        item={
          item as ThreadHistoryItemDto & {
            kind: 'skillToolCall';
          }
        }
        onOpen={onOpenToolCallDetail}
        timeMeta={timeMeta}
      />
    );
  }

  if (item.kind === 'webSearch') {
    const typedItem = item as ThreadHistoryItemDto & {
      kind: 'webSearch';
    };
    const detailText =
      typedItem.detailText?.trim() || typedItem.text || 'Web search';
    return (
      <WebSearchItem
        autoOpen={autoOpenToolDetails}
        item={typedItem}
        timeMeta={timeMeta}
        onOpen={() =>
          onOpenDeferredHistoryItemDetail(
            typedItem,
            'Web Search Details',
            detailText,
            'Loading full web search details...',
            'Unable to load full web search details.',
          )
        }
      />
    );
  }

  if (item.kind === 'fileRead') {
    const typedItem = item as ThreadHistoryItemDto & {
      kind: 'fileRead';
    };
    const detailText =
      typedItem.detailText?.trim() || typedItem.text || 'File read';
    return (
      <FileReadItem
        autoOpen={autoOpenToolDetails}
        item={typedItem}
        timeMeta={timeMeta}
        onOpen={() =>
          onOpenDeferredHistoryItemDetail(
            typedItem,
            'File Read Details',
            detailText,
            'Loading full file read details...',
            'Unable to load full file read details.',
          )
        }
      />
    );
  }

  if (item.kind === 'image') {
    return (
      <ImageItem
        threadId={threadId}
        item={
          item as ThreadHistoryItemDto & {
            kind: 'image';
          }
        }
        onOpen={onOpenExpandedText}
        getImageAssetUrl={adapter?.getImageAssetUrl}
        timeMeta={timeMeta}
      />
    );
  }

  if (item.kind === 'plan') {
    return (
      <PlanHistoryItem
        item={
          item as ThreadHistoryItemDto & {
            kind: 'plan';
          }
        }
        scrollRootRef={scrollRootRef}
        timeMeta={timeMeta}
        {...(onBeforeMessageResize
          ? { onBeforeResize: onBeforeMessageResize }
          : {})}
      />
    );
  }

  if (item.kind === 'fileChange') {
    const typedItem = item as ThreadHistoryItemDto & {
      kind: 'fileChange';
    };
    const detailText =
      typedItem.detailText?.trim() || typedItem.text || 'File change';
    return (
      <FileChangeItem
        item={typedItem}
        timeMeta={timeMeta}
        onOpen={() =>
          onOpenDeferredHistoryItemDetail(
            typedItem,
            'File Change Details',
            detailText,
            'Loading full file change details...',
            'Unable to load full file change details.',
          )
        }
      />
    );
  }

  if (item.kind === 'contextCompaction') {
    return (
      <ContextCompactionItem
        item={
          item as ThreadHistoryItemDto & {
            kind: 'contextCompaction';
          }
        }
        timeMeta={timeMeta}
      />
    );
  }

  if (item.kind === 'hook') {
    return (
      <HookItem
        item={
          item as ThreadHistoryItemDto & {
            kind: 'hook';
          }
        }
        timeMeta={timeMeta}
      />
    );
  }

  return <GenericHistoryItem item={item} timeMeta={timeMeta} />;
});

interface ThreadTurnRowProps {
  threadId: string | undefined;
  adapter?: ThreadTimelineAdapter | undefined;
  turn: TimelineTurn;
  absoluteIndex: number;
  isCollapsed: boolean;
  livePlan: LivePlan | null;
  liveItems: ThreadHistoryItemDto[] | null;
  liveActivityAt?: string | null;
  liveOutput: string;
  forceActive?: boolean;
  onToggleCollapse: (turn: TimelineTurn, currentCollapsed: boolean) => void;
  deferredItemsLoading?: boolean;
  deferredItemsError?: string | undefined;
  onOpenExpandedText: OpenExpandedTextHandler;
  onOpenCommandDetail: OpenCommandDetailHandler;
  onOpenToolCallDetail: OpenToolCallDetailHandler;
  onOpenDeferredHistoryItemDetail: OpenDeferredHistoryItemDetailHandler;
  onSelectArtifact?: SelectArtifactHandler;
  onBeforeMessageResize?: () => void;
  scrollRootRef: RefObject<HTMLDivElement | null>;
  articleRef?: RefCallback<HTMLElement> | undefined;
  isLatestVisibleTurn?: boolean;
}

function isTerminalTurnStatus(status: TimelineTurn['status']) {
  return (
    status === 'completed' || status === 'failed' || status === 'interrupted'
  );
}

function itemCreatedAtMillis(item: ThreadHistoryItemDto) {
  const millis = Date.parse(item.createdAt ?? '');
  return Number.isFinite(millis) ? millis : null;
}

function latestItemTimestamp(items: ThreadHistoryItemDto[]) {
  let latest: number | null = null;
  for (const item of items) {
    const millis = itemCreatedAtMillis(item);
    if (millis === null) {
      continue;
    }
    latest = latest === null ? millis : Math.max(latest, millis);
  }
  return latest;
}

function latestActivityTimestamp(
  startedAt: string | null | undefined,
  items: ThreadHistoryItemDto[],
  liveActivityAt: string | null | undefined,
) {
  const candidates = [
    Date.parse(startedAt ?? ''),
    latestItemTimestamp(items) ?? Number.NaN,
    Date.parse(liveActivityAt ?? ''),
  ].filter(Number.isFinite);

  return candidates.length > 0
    ? new Date(Math.max(...candidates)).toISOString()
    : null;
}

export function formatWorkedDuration(
  startedAt: string | null | undefined,
  completedAt: string | null | undefined,
  items: ThreadHistoryItemDto[],
) {
  const startMillis = Date.parse(startedAt ?? '');
  const completedMillis = Date.parse(completedAt ?? '');
  const endMillis = Number.isFinite(completedMillis)
    ? completedMillis
    : latestItemTimestamp(items);
  if (
    !Number.isFinite(startMillis) ||
    endMillis === null ||
    endMillis < startMillis
  ) {
    return 'Worked';
  }

  const totalSeconds = Math.max(
    1,
    Math.round((endMillis - startMillis) / 1000),
  );
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `Worked for ${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `Worked for ${minutes}m ${seconds}s`;
  }
  return `Worked for ${seconds}s`;
}

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

function TimelineTimeToggle({
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

function firstHistoryEntryTimestamp(
  entry: TimelineHistoryEntry,
): string | null {
  if (entry.kind === 'item') {
    return entry.item.createdAt ?? null;
  }
  if (entry.kind === 'agentActivityGroup') {
    return entry.entries[0]
      ? firstHistoryEntryTimestamp(entry.entries[0])
      : null;
  }
  return entry.items.find((item) => item.createdAt)?.createdAt ?? null;
}

function lastHistoryEntryTimestamp(entry: TimelineHistoryEntry): string | null {
  if (entry.kind === 'item') return entry.item.updatedAt ?? entry.item.createdAt ?? null;
  if (entry.kind === 'agentActivityGroup') {
    const timestamps = entry.entries.map(lastHistoryEntryTimestamp).filter((value): value is string => Boolean(value));
    return timestamps.sort((a,b)=>Date.parse(a)-Date.parse(b)).at(-1) ?? null;
  }
  return entry.items.map(item=>item.updatedAt ?? item.createdAt).filter((value): value is string => Boolean(value)).sort((a,b)=>Date.parse(a)-Date.parse(b)).at(-1) ?? null;
}

function collapsedSummaryMessages(entries: TimelineHistoryEntry[], active: boolean) {
  const itemEntries = entries.filter(
    (entry): entry is TimelineHistoryEntry & { kind: 'item' } =>
      entry.kind === 'item',
  );
  const users = itemEntries
    .map((entry) => entry.item)
    .filter(
      (item): item is ThreadHistoryItemDto & { kind: 'userMessage' } =>
        item.kind === 'userMessage',
    );
  const last = entries.at(-1);
  const latestAgent = itemEntries
    .map((entry) => entry.item)
    .reverse()
    .find(
      (item): item is ThreadHistoryItemDto & { kind: 'agentMessage' } =>
        item.kind === 'agentMessage' && item.text.trim().length > 0,
    );
  const finalAgent = active && !(last?.kind === 'item' && last.item.kind === 'agentMessage') ? undefined : latestAgent;
  const hiddenEntries = entries.filter((entry) => {
    if (entry.kind !== 'item') {
      return true;
    }

    return (
      entry.item.kind !== 'userMessage' && entry.item.id !== finalAgent?.id
    );
  });

  return {
    users,
    latestAgent,
    finalAgent,
    hiddenEntries,
  };
}

export const ThreadTurnRow = memo(function ThreadTurnRow({
  threadId,
  adapter,
  turn,
  absoluteIndex,
  isCollapsed,
  livePlan,
  liveItems,
  liveActivityAt = null,
  liveOutput,
  forceActive = false,
  onToggleCollapse,
  deferredItemsLoading = false,
  deferredItemsError,
  onOpenExpandedText,
  onOpenCommandDetail,
  onOpenToolCallDetail,
  onOpenDeferredHistoryItemDetail,
  onSelectArtifact,
  onBeforeMessageResize,
  scrollRootRef,
  articleRef,
  isLatestVisibleTurn = false,
}: ThreadTurnRowProps) {
  const hasLiveActivity =
    Boolean(livePlan) ||
    Boolean(liveOutput) ||
    Boolean(liveItems && liveItems.length > 0);
  const activeForRendering =
    forceActive ||
    isActiveTurnStatus(turn.status) ||
    hasLiveActivity ||
    isLatestVisibleTurn;
  const activeFooterTurn: TimelineTurn =
    activeForRendering && !isActiveTurnStatus(turn.status)
      ? {
          ...turn,
          status: 'inProgress',
        }
      : turn;
  const mergedItems = useMemo(
    () => mergeLiveTurnItems(turn.items, liveItems),
    [liveItems, turn.items],
  );
  const lastActivityAt = useMemo(
    () => latestActivityTimestamp(turn.startedAt, mergedItems, liveActivityAt),
    [liveActivityAt, mergedItems, turn.startedAt],
  );
  const displayedLivePlan = useMemo(
    () => deriveDisplayedLivePlan(livePlan, mergedItems, turn.status),
    [livePlan, mergedItems, turn.status],
  );
  const visibleLiveOutput = useMemo(
    () => getLiveOutputTailForTurn(liveOutput, mergedItems),
    [liveOutput, mergedItems],
  );
  const preparedItems = useMemo(
    () => prepareTurnItemsForRendering(mergedItems, activeForRendering),
    [activeForRendering, mergedItems],
  );
  const groupedItems = useMemo(
    // Published results belong below the reply, outside the work disclosure.
    // Separate them before grouping so a tool/activity group cannot hide them.
    () => groupTimelineHistoryItems(preparedItems.filter((item) => item.kind !== 'artifact')),
    [preparedItems],
  );
  const outputItems = preparedItems.filter(
    (item): item is ThreadHistoryItemDto & { kind: 'artifact' } => item.kind === 'artifact',
  );
  const autoOpenLatestToolDetails =
    forceActive || isActiveTurnStatus(turn.status) || hasLiveActivity;
  const turnTimeLabel = formatShortTimestamp(turn.startedAt);
  const turnTimeTitle = formatLongTimestamp(turn.startedAt);
  const visibleLiveHookPrompt = useMemo(
    () => parseHookPromptText(visibleLiveOutput),
    [visibleLiveOutput],
  );
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {},
  );

  const toggleGroupedItem = useCallback((groupKey: string) => {
    setExpandedGroups((current) => ({
      ...current,
      [groupKey]: !current[groupKey],
    }));
  }, []);

  const renderHistoryEntries = (entries: TimelineHistoryEntry[]) => (
    <TimelineHistoryEntries
      entries={entries}
      expandedGroups={expandedGroups}
      onToggleGroupedItem={toggleGroupedItem}
      threadId={threadId}
      scrollRootRef={scrollRootRef}
      onOpenExpandedText={onOpenExpandedText}
      onOpenCommandDetail={onOpenCommandDetail}
      onOpenToolCallDetail={onOpenToolCallDetail}
      onOpenDeferredHistoryItemDetail={onOpenDeferredHistoryItemDetail}
      {...(onBeforeMessageResize ? { onBeforeMessageResize } : {})}
      fallbackTimestamp={turn.startedAt}
      fallbackTimeLabel={turnTimeLabel}
      fallbackTimeTitle={turnTimeTitle}
      turnStartedAt={turn.startedAt}
      autoOpenLatestToolDetails={autoOpenLatestToolDetails && entries.at(-1)?.key === groupedItems.at(-1)?.key}
      {...(onSelectArtifact ? { onSelectArtifact } : {})}
      {...(adapter ? { adapter } : {})}
    />
  );
  const historyNode = renderHistoryEntries(groupedItems);
  const liveHookPromptNode = visibleLiveHookPrompt ? (
    <HistoryItemRow
      threadId={threadId}
      item={visibleLiveHookPrompt}
      scrollRootRef={scrollRootRef}
      onOpenExpandedText={onOpenExpandedText}
      onOpenCommandDetail={onOpenCommandDetail}
      onOpenToolCallDetail={onOpenToolCallDetail}
      onOpenDeferredHistoryItemDetail={onOpenDeferredHistoryItemDetail}
      timeLabel={
        turn.startedAt
          ? formatPreciseMessageTimestamp(turn.startedAt)
          : turnTimeLabel
      }
      timeTitle={turnTimeTitle}
      timeMeta={null}
      {...(onSelectArtifact ? { onSelectArtifact } : {})}
      {...(adapter ? { adapter } : {})}
    />
  ) : null;
  const liveOutputNode =
    !visibleLiveHookPrompt && visibleLiveOutput ? (
      <CompactMessageItem
        item={{
          id: 'live-agent-message',
          kind: 'agentMessage',
          text: visibleLiveOutput,
        }}
        scrollRootRef={scrollRootRef}
        timeLabel={
          turn.startedAt
            ? formatPreciseMessageTimestamp(turn.startedAt)
            : turnTimeLabel
        }
        timeTitle={turnTimeTitle}
        streaming
        {...(adapter ? { adapter } : {})}
        {...(onBeforeMessageResize ? { onBeforeMessageResize } : {})}
      />
    ) : null;
  const footerNode = activeForRendering ? (
    <TurnStatusBar
      turn={activeFooterTurn}
      variant="footer"
      lastActivityAt={lastActivityAt}
    />
  ) : null;
  const collapsedSummary = useMemo(
    () => collapsedSummaryMessages(groupedItems, activeForRendering),
    [groupedItems, activeForRendering],
  );
  const workedLabel = useMemo(
    () => turn.status === 'recovering' ? 'Confirming status' : activeForRendering ? 'Working' : formatWorkedDuration(turn.startedAt, turn.completedAt, mergedItems),
    [activeForRendering, mergedItems, turn.completedAt, turn.startedAt, turn.status],
  );
  const interruptedLabel =
    turn.status === 'interrupted' ? (
      <span className="thread-graph-worked-interrupted shrink-0 text-[11px]">
        Interrupted
      </span>
    ) : null;
  const hasCollapsedHiddenItems =
    collapsedSummary.hiddenEntries.length > 0 || Boolean(turn.hasDeferredItems);
  const effectiveCollapsed = isCollapsed && hasCollapsedHiddenItems;
  const visibleSummaryAgent = effectiveCollapsed ? collapsedSummary.latestAgent : collapsedSummary.finalAgent;
  const canToggleWorkedSummary =
    hasCollapsedHiddenItems;
  const terminalWorkedNode =
    isTerminalTurnStatus(turn.status) && !hasCollapsedHiddenItems ? (
      <div className="thread-graph-worked-summary flex w-full items-center gap-2 py-2 text-sm">
        <span className="thread-graph-worked-label shrink-0">
          {workedLabel}
        </span>
        {interruptedLabel}
        <TurnUsageInline turn={turn} />
        <span
          className="thread-graph-worked-rule h-px min-w-0 flex-1"
          aria-hidden="true"
        />
      </div>
    ) : null;
  const collapsedSummaryNode =
    hasCollapsedHiddenItems ? (
      <div className="thread-graph-turn-collapsed-summary space-y-2">
        {collapsedSummary.users.map((item) => (
          <CompactMessageItem
            key={item.id}
            threadId={threadId}
            item={item}
            scrollRootRef={scrollRootRef}
            timeLabel={
              item.createdAt
                ? formatMessageTimestamp(item.createdAt)
                : formatMessageTimestamp(turn.startedAt)
            }
            timeTitle={
              item.createdAt
                ? formatLongTimestamp(item.createdAt)
                : turnTimeTitle
            }
            {...(onBeforeMessageResize ? { onBeforeMessageResize } : {})}
            {...(adapter ? { adapter } : {})}
          />
        ))}
        <div className="thread-graph-worked-summary flex w-full items-center gap-2 py-2 text-sm">
          <button
            type="button"
            className="group flex shrink-0 items-center gap-2 text-left transition"
          onClick={() => onToggleCollapse(turn, effectiveCollapsed)}
          disabled={deferredItemsLoading}
          aria-label={`${workedLabel}. ${effectiveCollapsed ? 'Expand' : 'Collapse'} turn ${absoluteIndex}`}
          aria-expanded={!effectiveCollapsed}
        >
          <span className="thread-graph-worked-label shrink-0">
            {deferredItemsLoading
              ? 'Loading complete history...'
              : deferredItemsError
                ? 'History unavailable, retry'
                : workedLabel}
          </span>
          {interruptedLabel}
          <ChevronRight className={`h-4 w-4 shrink-0 transition ${effectiveCollapsed ? '' : 'rotate-90'}`} />
          </button>
          <TurnUsageInline turn={turn} />
          <span
            className="thread-graph-worked-rule h-px min-w-0 flex-1"
            aria-hidden="true"
          />
        </div>
        {!effectiveCollapsed ? renderHistoryEntries(collapsedSummary.hiddenEntries) : null}
        {visibleSummaryAgent ? (
          <CompactMessageItem
            threadId={threadId}
            item={visibleSummaryAgent}
            scrollRootRef={scrollRootRef}
            timeLabel={
              visibleSummaryAgent.createdAt
                ? formatPreciseMessageTimestamp(
                    visibleSummaryAgent.createdAt,
                  )
                : formatPreciseMessageTimestamp(turn.startedAt)
            }
            timeTitle={
              visibleSummaryAgent.createdAt
                ? formatLongTimestamp(visibleSummaryAgent.createdAt)
                : turnTimeTitle
            }
            {...(onBeforeMessageResize ? { onBeforeMessageResize } : {})}
            {...(adapter ? { adapter } : {})}
          />
        ) : null}
        {activeForRendering ? <GraphChatTurnBody
          footer={footerNode}
          history={null}
          liveHookPrompt={liveHookPromptNode}
          liveOutput={liveOutputNode}
          livePlan={displayedLivePlan}
        /> : null}
      </div>
    ) : null;
  const turnBody = (
    <GraphChatTurnBody
      footer={footerNode}
      history={<>{historyNode}{terminalWorkedNode}</>}
      liveHookPrompt={liveHookPromptNode}
      liveOutput={liveOutputNode}
      livePlan={displayedLivePlan}
    />
  );
  const visibleBody = (
    <>
      {canToggleWorkedSummary ? collapsedSummaryNode : turnBody}
      {outputItems.length > 0 ? (
        <div className="thread-graph-turn-outputs mt-3 space-y-3" role="group" aria-label="Agent artifacts">
          {outputItems.map((item) => (
            <ArtifactHistoryItem
              {...(adapter?.onOpenWorkspaceFile ? {onOpenWorkspaceFile: adapter.onOpenWorkspaceFile} : {})}
              key={item.id}
              item={item}
              presentation="output"
              {...(onSelectArtifact
                ? { onSelect: (selectedItem, artifact) => onSelectArtifact({ item: selectedItem, artifact }) }
                : {})}
            />
          ))}
        </div>
      ) : null}
    </>
  );

  return (
    <MessageExpansionScope key={`${threadId ?? ''}:${turn.id}`}>
    <GraphChatTurnFrame
      absoluteIndex={absoluteIndex}
      body={visibleBody}
      collapsed={effectiveCollapsed}
      collapsedBody={visibleBody}
      error={turn.error}
      headerStatus={<TurnStatusBar turn={turn} />}
      isActive={activeForRendering}
      refCallback={articleRef}
      startedAt={turn.startedAt}
      timeLabel={turnTimeLabel}
      timeTitle={turnTimeTitle}
      tokenSummary={<TurnTokenSummary turn={turn} />}
    />
    </MessageExpansionScope>
  );
});

interface TimelineHistoryEntriesProps {
  entries: TimelineHistoryEntry[];
  expandedGroups: Record<string, boolean>;
  onToggleGroupedItem: (groupKey: string) => void;
  threadId: string | undefined;
  scrollRootRef: RefObject<HTMLDivElement | null>;
  fallbackTimestamp?: string | null | undefined;
  fallbackTimeLabel?: string | null | undefined;
  fallbackTimeTitle?: string | null | undefined;
  turnStartedAt?: string | null | undefined;
  autoOpenLatestToolDetails?: boolean;
  onOpenExpandedText: OpenExpandedTextHandler;
  onOpenCommandDetail: OpenCommandDetailHandler;
  onOpenToolCallDetail: OpenToolCallDetailHandler;
  onOpenDeferredHistoryItemDetail: OpenDeferredHistoryItemDetailHandler;
  onSelectArtifact?: SelectArtifactHandler;
  onBeforeMessageResize?: () => void;
  adapter?: ThreadTimelineAdapter | undefined;
}

function TimelineHistoryEntries({
  entries,
  expandedGroups,
  onToggleGroupedItem,
  threadId,
  scrollRootRef,
  onOpenExpandedText,
  onOpenCommandDetail,
  onOpenToolCallDetail,
  onOpenDeferredHistoryItemDetail,
  onSelectArtifact,
  onBeforeMessageResize,
  adapter,
  fallbackTimestamp,
  fallbackTimeLabel,
  fallbackTimeTitle,
  turnStartedAt,
  autoOpenLatestToolDetails = false,
}: TimelineHistoryEntriesProps) {
  const latestEntryKey = entries.at(-1)?.key ?? null;
  const relativeTimeMeta = useCallback(
    (timestamp: string | null | undefined, endTimestamp?: string | null) =>
      timestamp ? (
        <TimelineTimeToggle
          absoluteLabel={formatShortTimestamp(timestamp)}
          timestamp={timestamp}
          endTimestamp={endTimestamp}
          turnStartedAt={turnStartedAt ?? fallbackTimestamp}
        />
      ) : null,
    [fallbackTimestamp, turnStartedAt],
  );

  return (
    <GraphChatHistoryEntries<TimelineHistoryEntry>
      entries={entries}
      expandedGroups={expandedGroups}
      onToggleGroupedItem={onToggleGroupedItem}
      renderCommandGroup={(entry, expanded, onToggleExpanded) => (
        <CommandGroupItem
          key={entry.key}
          items={entry.items}
          expanded={expanded}
          onToggleExpanded={onToggleExpanded}
          onOpen={onOpenCommandDetail}
          timeMeta={relativeTimeMeta(firstHistoryEntryTimestamp(entry), lastHistoryEntryTimestamp(entry))}
        />
      )}
      renderFileChangeGroup={(entry, expanded, onToggleExpanded) => (
        <FileChangeGroupItem
          key={entry.key}
          items={entry.items}
          expanded={expanded}
          onToggleExpanded={onToggleExpanded}
          onOpen={onOpenExpandedText}
          timeMeta={relativeTimeMeta(firstHistoryEntryTimestamp(entry), lastHistoryEntryTimestamp(entry))}
        />
      )}
      renderSearchGroup={(entry, expanded, onToggleExpanded) => (
        <SearchGroupItem
          key={entry.key}
          items={entry.items}
          expanded={expanded}
          onToggleExpanded={onToggleExpanded}
          onOpen={onOpenExpandedText}
          timeMeta={relativeTimeMeta(firstHistoryEntryTimestamp(entry), lastHistoryEntryTimestamp(entry))}
        />
      )}
      renderFileReadGroup={(entry, expanded, onToggleExpanded) => (
        <FileReadGroupItem
          key={entry.key}
          items={entry.items}
          expanded={expanded}
          onToggleExpanded={onToggleExpanded}
          onOpen={onOpenExpandedText}
          timeMeta={relativeTimeMeta(firstHistoryEntryTimestamp(entry), lastHistoryEntryTimestamp(entry))}
        />
      )}
      renderToolCallGroup={(entry, expanded, onToggleExpanded) => (
        <ToolCallGroupItem
          key={entry.key}
          items={entry.items}
          expanded={expanded}
          onToggleExpanded={onToggleExpanded}
          onOpen={onOpenToolCallDetail}
          timeMeta={relativeTimeMeta(firstHistoryEntryTimestamp(entry), lastHistoryEntryTimestamp(entry))}
        />
      )}
      renderAgentActivityGroup={(entry, expanded, onToggleExpanded) => (
        <AgentActivityGroupItem
          key={entry.key}
          itemCount={entry.itemCount}
          running={autoOpenLatestToolDetails && entry.key === latestEntryKey}
          expanded={expanded}
          onToggleExpanded={onToggleExpanded}
          timeMeta={relativeTimeMeta(
            firstHistoryEntryTimestamp(entry), lastHistoryEntryTimestamp(entry),
          )}
        >
          <TimelineHistoryEntries
            entries={entry.entries}
            expandedGroups={expandedGroups}
            onToggleGroupedItem={onToggleGroupedItem}
            threadId={threadId}
            scrollRootRef={scrollRootRef}
            onOpenExpandedText={onOpenExpandedText}
            onOpenCommandDetail={onOpenCommandDetail}
            onOpenToolCallDetail={onOpenToolCallDetail}
            onOpenDeferredHistoryItemDetail={onOpenDeferredHistoryItemDetail}
            {...(onBeforeMessageResize ? { onBeforeMessageResize } : {})}
            fallbackTimestamp={fallbackTimestamp}
            fallbackTimeLabel={fallbackTimeLabel}
            fallbackTimeTitle={fallbackTimeTitle}
            turnStartedAt={turnStartedAt}
            autoOpenLatestToolDetails={false}
            {...(onSelectArtifact ? { onSelectArtifact } : {})}
            {...(adapter ? { adapter } : {})}
          />
        </AgentActivityGroupItem>
      )}
      renderItem={(entry) => {
        const timestamp = timestampForHistoryItem(
          entry.item,
          fallbackTimestamp ?? null,
        );
        const isUserMessage = entry.item.kind === 'userMessage';
        const isAgentMessage =
          entry.item.kind === 'agentMessage' || entry.item.kind === 'reasoning';
        const timeLabel = isUserMessage
          ? formatMessageTimestamp(timestamp)
          : isAgentMessage
            ? formatPreciseMessageTimestamp(timestamp)
            : fallbackTimeLabel;
        return (
          <HistoryItemRow
            key={entry.key}
            threadId={threadId}
            item={entry.item}
            scrollRootRef={scrollRootRef}
            timeLabel={timeLabel}
            timeTitle={
              entry.item.createdAt
                ? formatLongTimestamp(timestamp)
                : fallbackTimeTitle
            }
            timeMeta={relativeTimeMeta(timestamp)}
            autoOpenToolDetails={
              autoOpenLatestToolDetails && entry.key === latestEntryKey
            }
            onOpenExpandedText={onOpenExpandedText}
            onOpenCommandDetail={onOpenCommandDetail}
            onOpenToolCallDetail={onOpenToolCallDetail}
            onOpenDeferredHistoryItemDetail={onOpenDeferredHistoryItemDetail}
            {...(onBeforeMessageResize ? { onBeforeMessageResize } : {})}
            {...(onSelectArtifact ? { onSelectArtifact } : {})}
            {...(adapter ? { adapter } : {})}
          />
        );
      }}
    />
  );
}

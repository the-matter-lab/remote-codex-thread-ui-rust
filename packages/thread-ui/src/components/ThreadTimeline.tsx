import { mergeThreadHistoryItem } from '@remote-codex/shared';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type {
  RespondThreadActionRequestInput,
  ThreadActionRequestDto,
  ThreadActivityNoteDto,
  ThreadAnsweredRequestNoteDto,
  ThreadHistoryItemDetailDto,
  ThreadHistoryItemDto,
  ThreadPendingSteerDto,
  ThreadTurnDto,
} from '@remote-codex/shared';
import { useAppShellNav } from '../app-shell/AppShellNavContext';
import { LongTextDialog } from './LongTextDialog';
import type { ThreadTimelineAdapter } from '../adapters';
import { GraphChatCompactMessageItem as CompactMessageItem } from './graph-chat/GraphChatCompactMessageItem';
import {
  isRunningHistoryStatus,
  parseHookPromptText,
  type TimelineTurn,
} from './timeline/timelineItems';
import {
  buildActivityNoteAnchors,
  buildRequestEntryAnchors,
} from './timeline/timelineAnchors';
import {
  ActivityNoteSection,
  ActivityRequestEntrySection,
  RequestEntrySection,
  RequestEntrySectionForTurn,
} from './timeline/TimelineRequestCards';
import {
  HistoryItemRow,
  ThreadTurnRow,
} from './timeline/TimelineTurnRows';
import {
  buildSyntheticLiveTurn,
} from './timeline/timelineScroll';
import { useDeferredHistoryDetail } from './timeline/useDeferredHistoryDetail';
import { useTimelineScroll } from './timeline/useTimelineScroll';

export interface ThreadTimelineProps {
  threadId?: string | undefined;
  turns: ThreadTurnDto[];
  totalTurnCount?: number;
  pendingRequests?: ThreadActionRequestDto[];
  activeTurnId?: string | null;
  threadRunning?: boolean;
  livePlan?: {
    turnId: string;
    explanation: string | null;
    plan: Array<{ step: string; status: string }>;
    updatedAt?: string | null;
  } | null;
  liveItems?: {
    turnId: string;
    items: ThreadHistoryItemDto[];
    updatedAt?: string | null;
  } | null;
  respondingRequestId?: string | null;
  onRespondToRequest?: (
    requestId: string,
    input: RespondThreadActionRequestInput,
  ) => Promise<void> | void;
  liveOutput: string;
  scrollRequestKey?: number;
  searchTarget?: { turnId: string; itemId: string; key: number };
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
  onLoadHistoryItemDetail?: (
    itemId: string,
  ) => Promise<ThreadHistoryItemDetailDto> | ThreadHistoryItemDetailDto;
  onLoadTurnDetail?: (
    turnId: string,
  ) => Promise<ThreadTurnDto> | ThreadTurnDto;
  onOpenThread?: (threadId: string) => void;
  onSelectArtifact?: (input: {
    item: ThreadHistoryItemDto & { kind: 'artifact' };
    artifact: NonNullable<ThreadHistoryItemDto['artifact']>;
  }) => void;
  onSelectHistoryItemDetail?: (input: {
    item: ThreadHistoryItemDto;
    detail: ThreadHistoryItemDetailDto;
  }) => void;
  adapter?: ThreadTimelineAdapter | undefined;
  autoCollapseCompletedTurns?: boolean;
}

function isTerminalTurnStatus(status: TimelineTurn['status']) {
  return status === 'completed' || status === 'failed' || status === 'interrupted';
}

function latestTimestamp(...timestamps: Array<string | null | undefined>) {
  let latest: { timestamp: string; millis: number } | null = null;
  for (const timestamp of timestamps) {
    if (!timestamp) {
      continue;
    }
    const millis = Date.parse(timestamp);
    if (Number.isFinite(millis) && (!latest || millis > latest.millis)) {
      latest = { timestamp, millis };
    }
  }
  return latest?.timestamp ?? null;
}

function mergeOptimisticTurnItems(
  turn: TimelineTurn,
  optimisticTurn: TimelineTurn | null,
) {
  if (!optimisticTurn || optimisticTurn.id !== turn.id || optimisticTurn.items.length === 0) {
    return turn;
  }

  const materializedItemIds = new Set(turn.items.map((item) => item.id));
  const optimisticOnlyItems = optimisticTurn.items.filter(
    (item) => !materializedItemIds.has(item.id),
  );

  if (optimisticOnlyItems.length === 0) {
    return turn;
  }

  return {
    ...turn,
    items: [...optimisticOnlyItems, ...turn.items],
  };
}

function ThreadTimelineComponent({
  threadId,
  turns,
  totalTurnCount,
  pendingRequests = [],
  activeTurnId = null,
  threadRunning = false,
  pendingSteers = [],
  livePlan = null,
  liveItems = null,
  respondingRequestId = null,
  onRespondToRequest,
  liveOutput,
  scrollRequestKey = 0,
  searchTarget,
  previousTurnScrollRequestKey = 0,
  nextTurnScrollRequestKey = 0,
  bottomSpacer = 0,
  className = '',
  onTailVisibilityChange,
  onPreviousTurnAvailabilityChange,
  onNextTurnAvailabilityChange,
  loadingEarlier = false,
  onLoadEarlier,
  ephemeralUserNote = null,
  answeredRequestNotes = [],
  activityNotes = [],
  optimisticSteers = [],
  optimisticTurn = null,
  onLoadHistoryItemDetail,
  onLoadTurnDetail,
  onOpenThread,
  onSelectArtifact,
  onSelectHistoryItemDetail,
  adapter,
  autoCollapseCompletedTurns,
}: ThreadTimelineProps) {
  const shellNav = useAppShellNav();
  const effectiveAutoCollapseCompletedTurns =
    autoCollapseCompletedTurns ??
    shellNav?.autoCollapseCompletedTurns ??
    false;
  const [collapsedTurnOverrides, setCollapsedTurnOverrides] = useState<Record<string, boolean>>(
    {},
  );
  const [cancelingSteerIds, setCancelingSteerIds] = useState<Set<string>>(
    () => new Set(),
  );
  const navigationTargetRef = useRef<string | null>(null);
  const pendingPreviousNavigationRef = useRef(false);
  const navigationResetRef = useRef({ threadId, scrollRequestKey, searchKey: searchTarget?.key });
  const handledNavigationRef = useRef({ previous: previousTurnScrollRequestKey, next: nextTurnScrollRequestKey });
  const lastSearchKeyRef = useRef<number | null>(null);
  const loadHistoryItemDetail =
    adapter?.onLoadHistoryItemDetail ?? onLoadHistoryItemDetail;
  const loadTurnDetail = adapter?.onLoadTurnDetail ?? onLoadTurnDetail;
  const [loadedTurnDetails, setLoadedTurnDetails] = useState<
    Record<string, ThreadTurnDto>
  >({});
  const [loadingTurnDetailIds, setLoadingTurnDetailIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [turnDetailErrors, setTurnDetailErrors] = useState<
    Record<string, string | undefined>
  >({});
  const openLinkedThread = adapter?.onOpenLinkedThread;
  useEffect(() => {
    if (searchTarget) setCollapsedTurnOverrides(current => ({ ...current, [searchTarget.turnId]: false }));
  }, [searchTarget]);
  const {
    expandedText,
    openExpandedText: handleOpenExpandedText,
    openCommandDetail: handleOpenCommandDetail,
    openToolCallDetail: handleOpenToolCallDetail,
    openDeferredHistoryItemDetail: handleOpenDeferredHistoryItemDetail,
    closeExpandedText,
  } = useDeferredHistoryDetail({
    loadHistoryItemDetail,
    onSelectHistoryItemDetail,
  });
  const {
    scrollContainerRef,
    scrollContentRef,
    tailSentinelRef,
    topSentinelRef,
    handleScroll,
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    preserveScrollPositionForResize,
    serverManagedHistory,
    effectiveTotalTurnCount,
    startIndex,
    visibleTurnAbsoluteOffset,
    hiddenCount,
    loadedHiddenCount,
    unloadedHiddenCount,
    showLoadAll,
    handleLoadEarlierClick,
    handleLoadAllClick,
  } = useTimelineScroll({
    threadId,
    turnsLength: turns.length,
    totalTurnCount,
    loadingEarlier,
    onLoadEarlier,
    scrollRequestKey,
    bottomSpacer,
    onTailVisibilityChange,
    contentRevisionInputs: [
      turns,
      pendingRequests,
      pendingSteers,
      optimisticSteers,
      liveOutput,
      livePlan,
      liveItems,
      optimisticTurn,
      answeredRequestNotes,
      activityNotes,
      ephemeralUserNote,
      bottomSpacer,
    ],
  });

  useEffect(() => {
    setCollapsedTurnOverrides({});
    setLoadedTurnDetails({});
    setLoadingTurnDetailIds(new Set());
    setTurnDetailErrors({});
  }, [threadId]);

  useEffect(() => {
    if (!searchTarget || lastSearchKeyRef.current === searchTarget.key || collapsedTurnOverrides[searchTarget.turnId] !== false) return;
    preserveScrollPositionForResize();
    const frame = requestAnimationFrame(() => {
      const container = scrollContainerRef.current;
      const turn = Array.from(container?.querySelectorAll<HTMLElement>('[data-turn-id]') ?? []).find(node => node.dataset.turnId === searchTarget.turnId);
      const message = Array.from(turn?.querySelectorAll<HTMLElement>('[data-message-id]') ?? []).find(node => node.dataset.messageId === searchTarget.itemId);
      const target = message ?? turn;
      if (!container || !target) return;
      lastSearchKeyRef.current = searchTarget.key;
      container.scrollTo({ top: container.scrollTop + target.getBoundingClientRect().top - container.getBoundingClientRect().top - 24, behavior: 'instant' });
      target.animate([{ backgroundColor: 'var(--theme-accent-soft)' }, { backgroundColor: 'transparent' }], { duration: 1400 });
    });
    return () => cancelAnimationFrame(frame);
  }, [searchTarget, collapsedTurnOverrides, preserveScrollPositionForResize]);

  const handleToggleCollapse = useCallback((
    turn: TimelineTurn,
    currentCollapsed: boolean,
  ) => {
    preserveScrollPositionForResize();
    if (
      !currentCollapsed ||
      !turn.hasDeferredItems ||
      !loadTurnDetail ||
      (loadedTurnDetails[turn.id] && isTerminalTurnStatus(loadedTurnDetails[turn.id]!.status)
        && loadedTurnDetails[turn.id]!.status === turn.status)
    ) {
      setCollapsedTurnOverrides((current) => ({
        ...current,
        [turn.id]: !currentCollapsed,
      }));
      return;
    }

    if (loadingTurnDetailIds.has(turn.id)) {
      return;
    }

    setLoadingTurnDetailIds((current) => new Set(current).add(turn.id));
    setTurnDetailErrors((current) => ({ ...current, [turn.id]: undefined }));
    void Promise.resolve(loadTurnDetail(turn.id))
      .then((loadedTurn) => {
        if (loadedTurn.id !== turn.id) {
          throw new Error('Loaded turn detail did not match the requested turn.');
        }
        setLoadedTurnDetails((current) => ({
          ...current,
          [turn.id]: loadedTurn,
        }));
        setCollapsedTurnOverrides((current) => ({
          ...current,
          [turn.id]: false,
        }));
      })
      .catch((caught: unknown) => {
        setTurnDetailErrors((current) => ({
          ...current,
          [turn.id]:
            caught instanceof Error
              ? caught.message
              : 'Unable to load complete turn history.',
        }));
      })
      .finally(() => {
        setLoadingTurnDetailIds((current) => {
          const next = new Set(current);
          next.delete(turn.id);
          return next;
        });
      });
  }, [loadTurnDetail, loadedTurnDetails, loadingTurnDetailIds, preserveScrollPositionForResize]);

  useEffect(() => {
    if (!loadTurnDetail) return;
    // Finish an expanded live history with the authoritative final operation
    // states. Collapsed turns never trigger this additional request.
    for (const turn of turns) {
      const loaded = loadedTurnDetails[turn.id];
      if (collapsedTurnOverrides[turn.id] !== false || !loaded ||
          loaded.status !== 'inProgress' || !isTerminalTurnStatus(turn.status) ||
          loadingTurnDetailIds.has(turn.id) || turnDetailErrors[turn.id]) continue;
      setLoadingTurnDetailIds((current) => new Set(current).add(turn.id));
      void Promise.resolve().then(() => loadTurnDetail(turn.id)).then((detail) => {
        if (detail.id !== turn.id) throw new Error('Loaded turn detail did not match the requested turn.');
        setLoadedTurnDetails((current) => ({ ...current, [turn.id]: detail }));
      }).catch((error: unknown) => {
        setTurnDetailErrors((current) => ({ ...current, [turn.id]: error instanceof Error ? error.message : 'Unable to load complete turn history.' }));
      }).finally(() => {
        setLoadingTurnDetailIds((current) => { const next = new Set(current); next.delete(turn.id); return next; });
      });
    }
  }, [turns, loadTurnDetail, loadedTurnDetails, collapsedTurnOverrides, loadingTurnDetailIds, turnDetailErrors]);

  const collapsedStateForTurn = useCallback((
    turn: TimelineTurn,
    input: {
      forceActive: boolean;
      hasLiveActivity: boolean;
    },
  ) => {
    const override = collapsedTurnOverrides[turn.id];
    if (override !== undefined) {
      return override;
    }

    return Boolean(
      (loadTurnDetail && turn.status === 'inProgress') || turn.hasDeferredItems ||
        (effectiveAutoCollapseCompletedTurns &&
          isTerminalTurnStatus(turn.status) &&
          !input.forceActive &&
          !input.hasLiveActivity),
    );
  }, [collapsedTurnOverrides, effectiveAutoCollapseCompletedTurns, loadTurnDetail]);

  const visibleTurns = serverManagedHistory ? turns : turns.slice(startIndex);
  const optimisticAbsoluteIndex = effectiveTotalTurnCount + 1;
  const forceLatestTurnActive =
    threadRunning &&
    (
      !activeTurnId ||
      (
        !visibleTurns.some((turn) => turn.id === activeTurnId) &&
        optimisticTurn?.id !== activeTurnId
      )
    );
  const latestVisibleTurnId =
    optimisticTurn?.id ?? visibleTurns.at(-1)?.id ?? null;
  const shouldForceLatestVisibleTurnActive =
    forceLatestTurnActive && latestVisibleTurnId !== null;
  const liveItemsAttachedToVisibleTurn =
    !!liveItems &&
    (visibleTurns.some((turn) => turn.id === liveItems.turnId) ||
      optimisticTurn?.id === liveItems.turnId);
  const liveItemsTargetTurnId =
    liveItems && liveItemsAttachedToVisibleTurn
      ? liveItems.turnId
      : liveItems && shouldForceLatestVisibleTurnActive
        ? latestVisibleTurnId
        : null;
  const optimisticLiveItems =
    optimisticTurn && liveItemsTargetTurnId === optimisticTurn.id
      ? liveItems?.items ?? null
      : null;
  const hasStructuredLiveItems = (liveItems?.items.length ?? 0) > 0;
  const unattachedLiveItems =
    liveItems && liveItemsTargetTurnId === null ? liveItems.items : null;
  const unattachedLiveTurn = useMemo(
    () =>
      liveItems && liveItemsTargetTurnId === null && liveItems.items.length > 0
        ? buildSyntheticLiveTurn(liveItems.turnId, liveItems.items)
        : null,
    [liveItems, liveItemsTargetTurnId],
  );
  const unattachedLiveTurnIndex = Math.max(
    1,
    effectiveTotalTurnCount + (optimisticTurn ? 1 : 0),
  );
  const liveOutputAttachedToOptimisticTurn =
    !!liveOutput &&
    !!optimisticTurn &&
    optimisticTurn.status !== 'failed' &&
    !optimisticLiveItems;
  const liveOutputTargetTurnId =
    liveOutput && visibleTurns.length > 0
      ? (
          activeTurnId && visibleTurns.some((turn) => turn.id === activeTurnId)
            ? activeTurnId
            : visibleTurns.findLast((turn) => isRunningHistoryStatus(turn.status))?.id ??
              (shouldForceLatestVisibleTurnActive ? latestVisibleTurnId : null)
        )
      : null;
  const liveOutputAttachedToVisibleTurn = Boolean(liveOutputTargetTurnId);
  const liveOutputActivityAt = useMemo(
    () => (liveOutput ? new Date().toISOString() : null),
    [liveOutput],
  );
  const unattachedLiveHookPromptItem = useMemo(
    () => parseHookPromptText(liveOutput),
    [liveOutput],
  );
  const queuedSteers = [
    ...pendingSteers.filter((steer) => !turns.some((turn) =>
      turn.items.some((item) => item.id === `steer:${steer.id}`),
    )).map((steer) => ({
      id: steer.id,
      prompt: steer.prompt,
      status: 'Accepted',
      createdAt: steer.createdAt,
      canCancel: true,
    })),
    ...optimisticSteers.map((steer) => ({
      id: steer.id,
      prompt: steer.prompt,
      status: steer.status === 'steering' ? 'Steering' : null,
      createdAt: steer.createdAt,
      canCancel: false,
    })),
  ].sort((left, right) => left.createdAt.localeCompare(right.createdAt));
  const requestEntryAnchors = useMemo(
    () =>
      buildRequestEntryAnchors({
        answeredRequestNotes,
        pendingRequests,
        visibleTurns,
        optimisticTurn,
      }),
    [answeredRequestNotes, optimisticTurn, pendingRequests, visibleTurns],
  );
  const activityNoteAnchors = useMemo(
    () =>
      buildActivityNoteAnchors({
        activityNotes,
        visibleTurns,
        optimisticTurn,
      }),
    [activityNotes, optimisticTurn, visibleTurns],
  );

  const findTurn = useCallback((direction: -1 | 1) => {
    const container = scrollContainerRef.current;
    if (!container) return null;
    const elements = Array.from(container.querySelectorAll<HTMLElement>('[data-timeline-turn]'));
    const selected = elements.findIndex(element => element.dataset.turnId === navigationTargetRef.current);
    if (selected >= 0) return elements[selected + direction] ?? null;
    const anchor = container.getBoundingClientRect().top + 8;
    return direction < 0
      ? elements.findLast(element => element.getBoundingClientRect().top < anchor - 10) ?? null
      : elements.find(element => element.getBoundingClientRect().top > anchor + 2) ?? null;
  }, [scrollContainerRef]);
  const updateNavigationAvailability = useCallback(() => {
    onPreviousTurnAvailabilityChange?.(!loadingEarlier && (Boolean(findTurn(-1)) || hiddenCount > 0));
    onNextTurnAvailabilityChange?.(Boolean(findTurn(1)));
  }, [findTurn, hiddenCount, loadingEarlier, onPreviousTurnAvailabilityChange, onNextTurnAvailabilityChange]);
  const resetNavigation = useCallback(() => {
    navigationTargetRef.current = null;
    pendingPreviousNavigationRef.current = false;
    updateNavigationAvailability();
  }, [updateNavigationAvailability]);
  const handleTimelineScroll = useCallback(() => {
    handleScroll();
    updateNavigationAvailability();
  }, [handleScroll, updateNavigationAvailability]);
  useEffect(() => {
    const previous = navigationResetRef.current;
    if (previous.threadId === threadId && previous.scrollRequestKey === scrollRequestKey && previous.searchKey === searchTarget?.key) return;
    navigationResetRef.current = { threadId, scrollRequestKey, searchKey: searchTarget?.key };
    resetNavigation();
  }, [threadId, scrollRequestKey, searchTarget?.key, resetNavigation]);
  useEffect(() => { updateNavigationAvailability(); }, [visibleTurns, updateNavigationAvailability]);
  const navigateToTurn = useCallback((target: HTMLElement) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    navigationTargetRef.current = target.dataset.turnId ?? null;
    preserveScrollPositionForResize();
    const top = container.scrollTop + target.getBoundingClientRect().top - container.getBoundingClientRect().top - 8;
    container.scrollTo({ top, behavior: 'smooth' });
    updateNavigationAvailability();
  }, [scrollContainerRef, preserveScrollPositionForResize, updateNavigationAvailability]);
  useEffect(() => {
    if (!pendingPreviousNavigationRef.current || loadingEarlier) return;
    const target = findTurn(-1);
    if (!target) return;
    pendingPreviousNavigationRef.current = false;
    navigateToTurn(target);
  }, [visibleTurns, loadingEarlier, findTurn, navigateToTurn]);
  useEffect(() => {
    const previousChanged = handledNavigationRef.current.previous !== previousTurnScrollRequestKey;
    const nextChanged = handledNavigationRef.current.next !== nextTurnScrollRequestKey;
    handledNavigationRef.current = { previous: previousTurnScrollRequestKey, next: nextTurnScrollRequestKey };
    if (!previousChanged && !nextChanged) return;
    const target = findTurn(previousChanged ? -1 : 1);
    const container = scrollContainerRef.current;
    if (!target && previousChanged && hiddenCount > 0 && !loadingEarlier && container) {
      navigationTargetRef.current = container.querySelector<HTMLElement>('[data-timeline-turn]')?.dataset.turnId ?? null;
      pendingPreviousNavigationRef.current = true;
      handleLoadEarlierClick();
      return;
    }
    if (!target || !container) return;
    pendingPreviousNavigationRef.current = false;
    navigateToTurn(target);
  }, [previousTurnScrollRequestKey, nextTurnScrollRequestKey, findTurn, scrollContainerRef, hiddenCount, loadingEarlier, handleLoadEarlierClick, navigateToTurn]);
  return (
    <>
      <section className={`flex min-h-0 flex-1 flex-col ${className}`.trim()}>
        <div
          ref={scrollContainerRef}
          data-testid="thread-scroll-container"
          onScroll={handleTimelineScroll}
          onWheel={(event) => { resetNavigation(); handleWheel(event); }}
          onTouchStart={(event) => { resetNavigation(); handleTouchStart(event); }}
          onPointerDown={resetNavigation}
          onKeyDown={(event) => { if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) resetNavigation(); }}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          className="thread-graph-scroll-container min-h-0 flex-1 overflow-y-auto overscroll-contain"
          style={bottomSpacer > 0 ? { paddingBottom: bottomSpacer } : undefined}
        >
          <div ref={scrollContentRef} className="thread-graph-scroll-content">
          <div ref={topSentinelRef} aria-hidden="true" className="h-px" />
          {turns.length > 0 && (
            <div className="thread-graph-history-control px-3 pb-1 pt-2 sm:px-5 sm:pb-1.5 sm:pt-3">
              <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm">
                {hiddenCount > 0 && (
                  <button
                    type="button"
                    onClick={handleLoadEarlierClick}
                    disabled={loadingEarlier}
                    aria-busy={loadingEarlier}
                    className="thread-history-earlier flex items-center gap-2 px-2 py-2 text-xs transition"
                  >
                    <span className="thread-history-arrow" aria-hidden="true">↑</span>
                    {loadingEarlier ? 'Loading earlier…' : 'Earlier messages'}
                  </button>
                )}
                {showLoadAll && (
                  <button
                    type="button"
                    onClick={handleLoadAllClick}
                    className="rounded-full border border-amber-300/40 px-2.5 py-1.5 text-amber-200 transition hover:bg-amber-300/10"
                  >
                    Load full history
                  </button>
                )}
                <p className="timeline-meta-text">
                  Showing {visibleTurns.length} of {effectiveTotalTurnCount} turns
                  {hiddenCount > 0
                    ? ` · ${hiddenCount} earlier hidden${
                        loadedHiddenCount > 0 && unloadedHiddenCount > 0
                          ? ` (${loadedHiddenCount} loaded)`
                          : ''
                      }`
                    : ''}
                </p>
              </div>
            </div>
          )}

          {turns.length === 0 && !liveOutput && !optimisticTurn && (
            <div className="thread-graph-empty-state px-3 py-8 text-sm sm:px-5">
              Send the first prompt to start the thread.
            </div>
          )}

          {(visibleTurns.length > 0 ||
            optimisticTurn ||
            activityNoteAnchors.leading.length > 0 ||
            activityNoteAnchors.trailing.length > 0) && (
            <div className="thread-graph-message-list">
              {activityNoteAnchors.leading.length > 0 ? (
                <ActivityNoteSection
                  notes={activityNoteAnchors.leading}
                  onOpenThread={onOpenThread}
                  onOpenLinkedThread={openLinkedThread}
                />
              ) : null}
              {visibleTurns.map((turn, visibleIndex) => (
                <div key={turn.id} data-timeline-turn data-turn-id={turn.id}>
                  {(activityNoteAnchors.beforeTurnId.get(turn.id)?.length ?? 0) > 0 ? (
                    <ActivityNoteSection
                      notes={activityNoteAnchors.beforeTurnId.get(turn.id) ?? []}
                      onOpenThread={onOpenThread}
                      onOpenLinkedThread={openLinkedThread}
                    />
                  ) : null}
                  {(requestEntryAnchors.beforeTurnId.get(turn.id)?.length ?? 0) > 0 ? (
                    <RequestEntrySection
                      entries={requestEntryAnchors.beforeTurnId.get(turn.id) ?? []}
                      respondingRequestId={respondingRequestId}
                      onRespondToRequest={onRespondToRequest ?? undefined}
                    />
                  ) : null}
                  {(() => {
                    const loadedTurn = loadedTurnDetails[turn.id];
                    // A summary refresh must update messages/usage without dropping the
                    // operations explicitly loaded earlier or restoring stale text.
                    const mergedItems = new Map(loadedTurn?.items.map((item) => [item.id, item]));
                    for (const item of turn.items) mergedItems.set(item.id, mergeThreadHistoryItem(mergedItems.get(item.id), item));
                    const hydratedTurn = loadedTurn
                      ? { ...loadedTurn, ...turn, items: [...mergedItems.values()] }
                      : turn;
                    const displayTurn = mergeOptimisticTurnItems(
                      hydratedTurn,
                      optimisticTurn,
                    );
                    const rowLivePlan = livePlan?.turnId === turn.id ? livePlan : null;
                    const rowLiveItems =
                      liveItemsTargetTurnId === turn.id ? liveItems?.items ?? null : null;
                    const rowLiveOutput =
                      liveOutputTargetTurnId === turn.id ? liveOutput : '';
                    const rowLiveActivityAt = latestTimestamp(
                      rowLivePlan?.updatedAt,
                      liveItemsTargetTurnId === turn.id ? liveItems?.updatedAt : null,
                      rowLiveOutput ? liveOutputActivityAt : null,
                    );
                    const rowForceActive =
                      activeTurnId === turn.id ||
                      (
                        shouldForceLatestVisibleTurnActive &&
                        latestVisibleTurnId === turn.id
                      );
                    const rowHasLiveActivity =
                      Boolean(rowLivePlan) ||
                      Boolean(rowLiveOutput) ||
                      Boolean(rowLiveItems && rowLiveItems.length > 0);
                    const rowCollapsed = collapsedStateForTurn(displayTurn, {
                      forceActive: rowForceActive,
                      hasLiveActivity: rowHasLiveActivity,
                    });

                    return (
                  <ThreadTurnRow
                    threadId={threadId}
                    {...(adapter ? { adapter } : {})}
                    turn={displayTurn}
                    absoluteIndex={visibleTurnAbsoluteOffset + visibleIndex + 1}
                    isCollapsed={rowCollapsed}
                    livePlan={rowLivePlan}
                    liveItems={rowLiveItems}
                    liveActivityAt={rowLiveActivityAt}
                    liveOutput={rowLiveOutput}
                    forceActive={rowForceActive}
                    onToggleCollapse={handleToggleCollapse}
                    deferredItemsLoading={loadingTurnDetailIds.has(turn.id)}
                    deferredItemsError={turnDetailErrors[turn.id]}
                    onOpenExpandedText={handleOpenExpandedText}
                    onOpenCommandDetail={handleOpenCommandDetail}
                    onOpenToolCallDetail={handleOpenToolCallDetail}
                    onOpenDeferredHistoryItemDetail={handleOpenDeferredHistoryItemDetail}
                    onBeforeMessageResize={preserveScrollPositionForResize}
                    {...(onSelectArtifact ? { onSelectArtifact } : {})}
                    scrollRootRef={scrollContainerRef}
                    articleRef={undefined}
                  />
                    );
                  })()}
                  {(activityNoteAnchors.afterTurnId.get(turn.id)?.length ?? 0) > 0 ? (
                    <ActivityNoteSection
                      notes={activityNoteAnchors.afterTurnId.get(turn.id) ?? []}
                      onOpenThread={onOpenThread}
                      onOpenLinkedThread={openLinkedThread}
                    />
                  ) : null}
                  {(requestEntryAnchors.notesByTurnId.get(turn.id)?.length || requestEntryAnchors.pendingRequestsByTurnId.get(turn.id)?.length) ? (
                    <RequestEntrySectionForTurn
                      notes={requestEntryAnchors.notesByTurnId.get(turn.id) ?? []}
                      requests={requestEntryAnchors.pendingRequestsByTurnId.get(turn.id) ?? []}
                      respondingRequestId={respondingRequestId}
                      onRespondToRequest={onRespondToRequest ?? undefined}
                    />
                  ) : null}
                </div>
              ))}
              {optimisticTurn && visibleTurns.every((turn) => turn.id !== optimisticTurn.id) && (
                <>
                  {(activityNoteAnchors.beforeTurnId.get(optimisticTurn.id)?.length ?? 0) > 0 ? (
                    <ActivityNoteSection
                      notes={activityNoteAnchors.beforeTurnId.get(optimisticTurn.id) ?? []}
                      onOpenThread={onOpenThread}
                      onOpenLinkedThread={openLinkedThread}
                    />
                  ) : null}
                  {(requestEntryAnchors.beforeTurnId.get(optimisticTurn.id)?.length ?? 0) > 0 ? (
                    <RequestEntrySection
                      entries={
                        requestEntryAnchors.beforeTurnId.get(optimisticTurn.id) ??
                        []
                      }
                      respondingRequestId={respondingRequestId}
                      onRespondToRequest={onRespondToRequest ?? undefined}
                    />
                  ) : null}
                  {(() => {
                    const rowLiveOutput = liveOutputAttachedToOptimisticTurn ? liveOutput : '';
                    const rowLiveActivityAt = latestTimestamp(
                      liveItemsTargetTurnId === optimisticTurn.id
                        ? liveItems?.updatedAt
                        : null,
                      rowLiveOutput ? liveOutputActivityAt : null,
                    );
                    const rowForceActive =
                      activeTurnId === optimisticTurn.id ||
                      (
                        shouldForceLatestVisibleTurnActive &&
                        latestVisibleTurnId === optimisticTurn.id
                      );
                    const rowHasLiveActivity =
                      Boolean(optimisticLiveItems && optimisticLiveItems.length > 0) ||
                      Boolean(rowLiveOutput);
                    const rowCollapsed = collapsedStateForTurn(optimisticTurn, {
                      forceActive: rowForceActive,
                      hasLiveActivity: rowHasLiveActivity,
                    });

                    return (
                  <ThreadTurnRow
                    threadId={threadId}
                    {...(adapter ? { adapter } : {})}
                    turn={optimisticTurn}
                    absoluteIndex={optimisticAbsoluteIndex}
                    isCollapsed={rowCollapsed}
                    livePlan={null}
                    liveItems={optimisticLiveItems}
                    liveActivityAt={rowLiveActivityAt}
                    liveOutput={rowLiveOutput}
                    forceActive={rowForceActive}
                    onToggleCollapse={handleToggleCollapse}
                    onOpenExpandedText={handleOpenExpandedText}
                    onOpenCommandDetail={handleOpenCommandDetail}
                    onOpenToolCallDetail={handleOpenToolCallDetail}
                    onOpenDeferredHistoryItemDetail={handleOpenDeferredHistoryItemDetail}
                    onBeforeMessageResize={preserveScrollPositionForResize}
                    {...(onSelectArtifact ? { onSelectArtifact } : {})}
                    scrollRootRef={scrollContainerRef}
                  />
                    );
                  })()}
                  {(activityNoteAnchors.afterTurnId.get(optimisticTurn.id)?.length ?? 0) > 0 ? (
                    <ActivityNoteSection
                      notes={activityNoteAnchors.afterTurnId.get(optimisticTurn.id) ?? []}
                      onOpenThread={onOpenThread}
                      onOpenLinkedThread={openLinkedThread}
                    />
                  ) : null}
                </>
              )}
            </div>
          )}

          {queuedSteers.length > 0 && (
            <div className="thread-graph-message-section space-y-3 px-3 py-4 sm:px-5">
              {queuedSteers.map((steer) => (
                <div key={steer.id} className="space-y-1.5">
                  <CompactMessageItem
                    threadId={threadId}
                    item={{
                      id: steer.id,
                      kind: 'userMessage',
                      text: steer.prompt,
                      status: steer.status,
                    }}
                    scrollRootRef={scrollContainerRef}
                    onBeforeMessageResize={preserveScrollPositionForResize}
                    {...(adapter ? { adapter } : {})}
                  />
                  {threadId && steer.canCancel && adapter?.cancelPendingSteer ? (
                    <div className="flex justify-end px-1">
                      <button
                        type="button"
                        className="thread-graph-history-button rounded-full border px-2.5 py-1 text-xs transition disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={cancelingSteerIds.has(steer.id)}
                        onClick={() => {
                          setCancelingSteerIds((current) => new Set(current).add(steer.id));
                          void Promise.resolve(adapter.cancelPendingSteer?.(threadId, steer.id))
                            .catch(() => undefined)
                            .finally(() => {
                              setCancelingSteerIds((current) => {
                                const next = new Set(current);
                                next.delete(steer.id);
                                return next;
                              });
                            });
                        }}
                      >
                        {cancelingSteerIds.has(steer.id) ? 'Canceling...' : 'Cancel'}
                      </button>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          )}

          {(requestEntryAnchors.trailing.length > 0 ||
            activityNoteAnchors.trailing.length > 0) && (
            <ActivityRequestEntrySection
              entries={[
                ...activityNoteAnchors.trailing.map((note) => ({
                  kind: 'activity' as const,
                  id: note.id,
                  createdAt: note.createdAt,
                  note,
                })),
                ...requestEntryAnchors.trailing,
              ]}
              respondingRequestId={respondingRequestId}
              onRespondToRequest={onRespondToRequest ?? undefined}
              onOpenThread={onOpenThread}
              onOpenLinkedThread={openLinkedThread}
            />
          )}

          {ephemeralUserNote && (
            <div className="thread-graph-message-section px-3 py-2.5 sm:px-5">
              <CompactMessageItem
                threadId={threadId}
                item={{
                  id: 'ephemeral-plan-decision-note',
                  kind: 'userMessage',
                  text: ephemeralUserNote,
                }}
                scrollRootRef={scrollContainerRef}
                onBeforeMessageResize={preserveScrollPositionForResize}
              />
            </div>
          )}

          {unattachedLiveTurn && unattachedLiveItems && unattachedLiveItems.length > 0 && (
            <ThreadTurnRow
              threadId={threadId}
              {...(adapter ? { adapter } : {})}
              turn={unattachedLiveTurn}
              absoluteIndex={unattachedLiveTurnIndex}
              isCollapsed={collapsedTurnOverrides[unattachedLiveTurn.id] ?? false}
              livePlan={livePlan?.turnId === unattachedLiveTurn.id ? livePlan : null}
              liveItems={unattachedLiveItems}
              liveActivityAt={latestTimestamp(
                livePlan?.turnId === unattachedLiveTurn.id ? livePlan.updatedAt : null,
                liveItems?.turnId === unattachedLiveTurn.id ? liveItems.updatedAt : null,
              )}
              liveOutput=""
              forceActive
              onToggleCollapse={handleToggleCollapse}
              onOpenExpandedText={handleOpenExpandedText}
              onOpenCommandDetail={handleOpenCommandDetail}
              onOpenToolCallDetail={handleOpenToolCallDetail}
              onOpenDeferredHistoryItemDetail={handleOpenDeferredHistoryItemDetail}
              onBeforeMessageResize={preserveScrollPositionForResize}
              {...(onSelectArtifact ? { onSelectArtifact } : {})}
              scrollRootRef={scrollContainerRef}
            />
          )}

          {liveOutput &&
            !liveOutputAttachedToVisibleTurn &&
            !liveOutputAttachedToOptimisticTurn &&
            !hasStructuredLiveItems && (
            <div className="thread-graph-message-section px-3 py-2.5 sm:px-5">
              {unattachedLiveHookPromptItem ? (
                <HistoryItemRow
                  threadId={threadId}
                  item={unattachedLiveHookPromptItem}
                  scrollRootRef={scrollContainerRef}
                  onOpenExpandedText={handleOpenExpandedText}
                  onOpenCommandDetail={handleOpenCommandDetail}
                  onOpenToolCallDetail={handleOpenToolCallDetail}
                  onOpenDeferredHistoryItemDetail={handleOpenDeferredHistoryItemDetail}
                  onBeforeMessageResize={preserveScrollPositionForResize}
                  {...(onSelectArtifact ? { onSelectArtifact } : {})}
                  {...(adapter ? { adapter } : {})}
                />
              ) : (
                <CompactMessageItem
                  threadId={threadId}
                  item={{
                    id: 'live-agent-message-fallback',
                    kind: 'agentMessage',
                    text: liveOutput,
                  }}
                  scrollRootRef={scrollContainerRef}
                  streaming
                  onBeforeMessageResize={preserveScrollPositionForResize}
                  {...(adapter ? { adapter } : {})}
                />
              )}
            </div>
          )}

          <div
            ref={tailSentinelRef}
            aria-hidden="true"
            className="h-px w-full"
          />
          </div>
        </div>
      </section>

      <LongTextDialog
        open={expandedText !== null}
        title={expandedText?.title ?? 'Full text'}
        text={expandedText?.text ?? ''}
        kind={expandedText?.kind}
        onClose={closeExpandedText}
      />
    </>
  );
}

export const ThreadTimeline = memo(ThreadTimelineComponent);

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import type {
  TouchEvent,
  WheelEvent,
} from 'react';

import {
  FOLLOW_TAIL_THRESHOLD_PX,
  INITIAL_VISIBLE_TURNS,
  LOAD_STEP,
  isElementVisible,
  isNearBottom,
} from './timelineScroll';

function useChangeRevision(inputs: readonly unknown[]) {
  const previousInputsRef = useRef<readonly unknown[] | null>(null);
  const revisionRef = useRef(0);
  const previousInputs = previousInputsRef.current;
  const changed =
    previousInputs === null ||
    previousInputs.length !== inputs.length ||
    inputs.some((input, index) => !Object.is(input, previousInputs[index]));

  if (changed) {
    revisionRef.current += 1;
    previousInputsRef.current = inputs;
  }

  return revisionRef.current;
}

export function useTimelineScroll({
  threadId,
  turnsLength,
  totalTurnCount,
  loadingEarlier,
  onLoadEarlier,
  scrollRequestKey,
  bottomSpacer,
  onTailVisibilityChange,
  contentRevisionInputs,
}: {
  threadId?: string | undefined;
  turnsLength: number;
  totalTurnCount?: number | undefined;
  loadingEarlier: boolean;
  onLoadEarlier?: (() => void) | undefined;
  scrollRequestKey: number;
  bottomSpacer: number;
  onTailVisibilityChange?: ((isVisible: boolean) => void) | undefined;
  contentRevisionInputs: readonly unknown[];
}) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollContentRef = useRef<HTMLDivElement | null>(null);
  const lastHandledScrollRequestKeyRef = useRef(scrollRequestKey);
  const previousContentRevisionRef = useRef<number | null>(null);
  const previousBottomSpacerRef = useRef(bottomSpacer);
  const lastObservedScrollHeightRef = useRef(0);
  const lastScrollTopRef = useRef(0);
  const scrollIntentRevisionRef = useRef(0);
  const pendingPrependScrollRef = useRef<{
    scrollHeight: number;
    scrollTop: number;
  } | null>(null);
  const tailSentinelRef = useRef<HTMLDivElement | null>(null);
  const topSentinelRef = useRef<HTMLDivElement | null>(null);
  const isTailVisibleRef = useRef(true);
  const shouldStickToBottomRef = useRef(true);
  const userScrolledAwayFromTailRef = useRef(false);
  const userScrolledHistoryRef = useRef(false);
  const autoLoadedEarlierRef = useRef(false);
  const topLoadArmedRef = useRef(false);
  const lastTouchYRef = useRef<number | null>(null);
  const touchPullDistanceRef = useRef(0);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_TURNS);
  const [loadMoreClicks, setLoadMoreClicks] = useState(0);
  const [isTailVisible, setIsTailVisible] = useState(true);
  const contentRevision = useChangeRevision(contentRevisionInputs);
  const serverManagedHistory =
    typeof onLoadEarlier === 'function' || totalTurnCount !== undefined;
  const effectiveTotalTurnCount = totalTurnCount ?? turnsLength;
  const startIndex = serverManagedHistory
    ? 0
    : Math.max(0, turnsLength - visibleCount);
  const loadedTurnAbsoluteOffset = serverManagedHistory
    ? Math.max(0, effectiveTotalTurnCount - turnsLength)
    : 0;
  const visibleTurnAbsoluteOffset = loadedTurnAbsoluteOffset + startIndex;
  const visibleTurnsLength = serverManagedHistory
    ? turnsLength
    : turnsLength - startIndex;
  const loadedHiddenCount = serverManagedHistory
    ? 0
    : turnsLength - visibleTurnsLength;
  const unloadedHiddenCount = serverManagedHistory
    ? Math.max(0, effectiveTotalTurnCount - turnsLength)
    : 0;
  const hiddenCount = serverManagedHistory
    ? unloadedHiddenCount + loadedHiddenCount
    : loadedHiddenCount;
  const showLoadAll =
    !serverManagedHistory && hiddenCount > 0 && loadMoreClicks >= 2;
  const canLoadEarlierFromServer =
    serverManagedHistory &&
    unloadedHiddenCount > 0 &&
    loadedHiddenCount === 0 &&
    typeof onLoadEarlier === 'function';

  const rememberPrependScrollPosition = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) {
      pendingPrependScrollRef.current = null;
      return;
    }

    pendingPrependScrollRef.current = {
      scrollHeight: container.scrollHeight,
      scrollTop: container.scrollTop,
    };
  }, []);

  const triggerServerLoadEarlier = useCallback(() => {
    if (
      !canLoadEarlierFromServer ||
      loadingEarlier ||
      autoLoadedEarlierRef.current
    ) {
      return false;
    }

    rememberPrependScrollPosition();
    autoLoadedEarlierRef.current = true;
    topLoadArmedRef.current = false;
    touchPullDistanceRef.current = 0;
    onLoadEarlier?.();
    return true;
  }, [
    canLoadEarlierFromServer,
    loadingEarlier,
    onLoadEarlier,
    rememberPrependScrollPosition,
  ]);

  const recomputeTailVisibility = useCallback(() => {
    const container = scrollContainerRef.current;
    const tailSentinel = tailSentinelRef.current;
    if (!container) {
      return;
    }

    const nextIsTailVisible = tailSentinel
      ? isElementVisible(container, tailSentinel)
      : isNearBottom(container);
    isTailVisibleRef.current = nextIsTailVisible;
    setIsTailVisible((current) =>
      current === nextIsTailVisible ? current : nextIsTailVisible,
    );
  }, []);

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      userScrolledHistoryRef.current = true;
      const nextScrollTop = container.scrollTop;
      const previousScrollTop = lastScrollTopRef.current;
      const delta = nextScrollTop - previousScrollTop;
      lastScrollTopRef.current = nextScrollTop;

      if (isNearBottom(container, 1)) {
        userScrolledAwayFromTailRef.current = false;
        shouldStickToBottomRef.current = true;
      } else if (delta < -1) {
        userScrolledAwayFromTailRef.current = true;
        shouldStickToBottomRef.current = false;
      } else if (delta > 1) {
        shouldStickToBottomRef.current =
          !userScrolledAwayFromTailRef.current &&
          isNearBottom(container, FOLLOW_TAIL_THRESHOLD_PX);
      }

      if (nextScrollTop <= 0 && userScrolledHistoryRef.current) {
        topLoadArmedRef.current = true;
      } else if (nextScrollTop > 0) {
        topLoadArmedRef.current = false;
        touchPullDistanceRef.current = 0;
      }
    }
    recomputeTailVisibility();
  }, [recomputeTailVisibility]);

  const scrollToBottom = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }

    container.scrollTop = container.scrollHeight;
    lastScrollTopRef.current = container.scrollTop;
    lastObservedScrollHeightRef.current = container.scrollHeight;
    isTailVisibleRef.current = true;
    setIsTailVisible((current) => (current ? current : true));
    userScrolledAwayFromTailRef.current = false;
    shouldStickToBottomRef.current = true;
  }, []);

  const preserveScrollPositionForResize = useCallback(() => {
    scrollIntentRevisionRef.current += 1;
    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }
    lastScrollTopRef.current = container.scrollTop;
    lastObservedScrollHeightRef.current = container.scrollHeight;
    shouldStickToBottomRef.current = false;
    userScrolledAwayFromTailRef.current = true;
  }, []);

  const handleLoadEarlierClick = useCallback(() => {
    if (serverManagedHistory && loadedHiddenCount === 0) {
      triggerServerLoadEarlier();
      return;
    }

    setVisibleCount((current) => Math.min(turnsLength, current + LOAD_STEP));
    setLoadMoreClicks((current) => current + 1);
  }, [
    loadedHiddenCount,
    serverManagedHistory,
    triggerServerLoadEarlier,
    turnsLength,
  ]);

  const handleWheel = useCallback((event: WheelEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current;
    if (
      !container ||
      event.deltaY >= -8 ||
      container.scrollTop > 0 ||
      !canLoadEarlierFromServer
    ) {
      return;
    }

    if (!topLoadArmedRef.current) {
      topLoadArmedRef.current = true;
      return;
    }

    triggerServerLoadEarlier();
  }, [canLoadEarlierFromServer, triggerServerLoadEarlier]);

  const handleTouchStart = useCallback((event: TouchEvent<HTMLDivElement>) => {
    lastTouchYRef.current = event.touches.item(0)?.clientY ?? null;
    touchPullDistanceRef.current = 0;
  }, []);

  const handleTouchMove = useCallback((event: TouchEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current;
    const nextY = event.touches.item(0)?.clientY ?? null;
    const previousY = lastTouchYRef.current;
    lastTouchYRef.current = nextY;

    if (
      !container ||
      nextY === null ||
      previousY === null ||
      container.scrollTop > 0 ||
      !canLoadEarlierFromServer
    ) {
      touchPullDistanceRef.current = 0;
      return;
    }

    const deltaY = nextY - previousY;
    if (deltaY <= 0) {
      touchPullDistanceRef.current = 0;
      return;
    }

    if (!topLoadArmedRef.current) {
      topLoadArmedRef.current = true;
      touchPullDistanceRef.current = 0;
      return;
    }

    touchPullDistanceRef.current += deltaY;
    if (touchPullDistanceRef.current >= 28) {
      triggerServerLoadEarlier();
    }
  }, [canLoadEarlierFromServer, triggerServerLoadEarlier]);

  const handleTouchEnd = useCallback(() => {
    lastTouchYRef.current = null;
    touchPullDistanceRef.current = 0;
  }, []);

  const handleLoadAllClick = useCallback(() => {
    setVisibleCount(turnsLength);
  }, [turnsLength]);

  useLayoutEffect(() => {
    const intent = scrollIntentRevisionRef.current;
    const frame = window.requestAnimationFrame(() => {
      if (intent === scrollIntentRevisionRef.current) scrollToBottom();
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [threadId, scrollToBottom]);

  useEffect(() => {
    autoLoadedEarlierRef.current = false;
    userScrolledHistoryRef.current = false;
    topLoadArmedRef.current = false;
    pendingPrependScrollRef.current = null;
  }, [threadId]);

  useEffect(() => {
    if (!loadingEarlier) {
      autoLoadedEarlierRef.current = false;
    }
  }, [loadingEarlier, turnsLength]);

  useLayoutEffect(() => {
    const anchor = pendingPrependScrollRef.current;
    const container = scrollContainerRef.current;
    if (!anchor || !container || loadingEarlier) {
      return;
    }

    pendingPrependScrollRef.current = null;
    const addedHeight = container.scrollHeight - anchor.scrollHeight;
    if (addedHeight <= 0) {
      lastObservedScrollHeightRef.current = container.scrollHeight;
      lastScrollTopRef.current = container.scrollTop;
      return;
    }

    const nextScrollTop = anchor.scrollTop + addedHeight;
    container.scrollTop = nextScrollTop;
    lastScrollTopRef.current = nextScrollTop;
    lastObservedScrollHeightRef.current = container.scrollHeight;
    userScrolledAwayFromTailRef.current = true;
    shouldStickToBottomRef.current = false;
    topLoadArmedRef.current = false;
  }, [loadingEarlier, turnsLength]);

  useEffect(() => {
    setVisibleCount((current) => {
      if (current >= turnsLength - 1) {
        return turnsLength;
      }

      return Math.max(current, INITIAL_VISIBLE_TURNS);
    });
  }, [turnsLength]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      lastObservedScrollHeightRef.current = container.scrollHeight;
      lastScrollTopRef.current = container.scrollTop;
      if (isNearBottom(container, 1)) {
        userScrolledAwayFromTailRef.current = false;
        shouldStickToBottomRef.current = true;
      } else if (
        userScrolledAwayFromTailRef.current ||
        !isNearBottom(container, FOLLOW_TAIL_THRESHOLD_PX)
      ) {
        shouldStickToBottomRef.current = false;
      }
    }
    recomputeTailVisibility();
  }, [contentRevision, recomputeTailVisibility, visibleCount]);

  useEffect(() => {
    const shouldForceScroll =
      scrollRequestKey !== lastHandledScrollRequestKeyRef.current;
    const contentChanged =
      previousContentRevisionRef.current !== contentRevision;
    previousContentRevisionRef.current = contentRevision;
    const shouldAutoScroll =
      shouldForceScroll ||
      (contentChanged &&
        shouldStickToBottomRef.current &&
        !userScrolledAwayFromTailRef.current);

    if (!shouldAutoScroll) {
      return;
    }

    const intent = scrollIntentRevisionRef.current;
    const frame = window.requestAnimationFrame(() => {
      if (intent === scrollIntentRevisionRef.current) scrollToBottom();
    });

    if (scrollRequestKey !== lastHandledScrollRequestKeyRef.current) {
      lastHandledScrollRequestKeyRef.current = scrollRequestKey;
    }

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [contentRevision, isTailVisible, scrollToBottom, scrollRequestKey]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const content = scrollContentRef.current;
    if (!container || !content || typeof ResizeObserver === 'undefined') {
      return;
    }

    lastObservedScrollHeightRef.current = container.scrollHeight;
    const observer = new ResizeObserver(() => {
      const nextScrollHeight = container.scrollHeight;
      const previousScrollHeight = lastObservedScrollHeightRef.current;
      lastObservedScrollHeightRef.current = nextScrollHeight;

      if (nextScrollHeight <= previousScrollHeight) {
        return;
      }

      const wasAtBottomBeforeResize =
        previousScrollHeight > 0 &&
        previousScrollHeight - container.scrollTop - container.clientHeight <=
          1;
      if (
        userScrolledAwayFromTailRef.current ||
        !(
          shouldStickToBottomRef.current ||
          wasAtBottomBeforeResize ||
          isTailVisibleRef.current
        )
      ) {
        return;
      }

      window.requestAnimationFrame(() => {
        if (!userScrolledAwayFromTailRef.current) scrollToBottom();
      });
    });

    observer.observe(content);
    return () => {
      observer.disconnect();
    };
  }, [scrollToBottom]);

  useEffect(() => {
    if (!shouldStickToBottomRef.current || userScrolledAwayFromTailRef.current) {
      previousBottomSpacerRef.current = bottomSpacer;
      return;
    }

    if (bottomSpacer === previousBottomSpacerRef.current) {
      return;
    }

    previousBottomSpacerRef.current = bottomSpacer;
    const frame = window.requestAnimationFrame(() => {
      if (!userScrolledAwayFromTailRef.current) scrollToBottom();
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [bottomSpacer, scrollToBottom]);

  useEffect(() => {
    onTailVisibilityChange?.(isTailVisible);
  }, [isTailVisible, onTailVisibilityChange]);

  return {
    scrollContainerRef,
    scrollContentRef,
    tailSentinelRef,
    topSentinelRef,
    isTailVisible,
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
  };
}

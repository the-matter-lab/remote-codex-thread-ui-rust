import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from 'react';

import type { ThreadDetailDto } from '@remote-codex/shared';
import type {
  ThreadDetailUiAdapter,
  ThreadTimelineAdapter,
} from '../../adapters';
import { ThreadComposer, type ThreadComposerProps } from '../ThreadComposer';
import {
  ThreadTimeline,
  type ThreadTimelineProps,
} from '../ThreadTimeline';

export interface GraphChatThreadUsageSummary {
  input: number;
  output: number;
  cache: number;
  cacheWrite: number;
  priceUsd: number;
  pricedTurns: number;
  turns: number;
}

interface GraphChatThreadChatPanelProps {
  detail: ThreadDetailDto;
  adapter: ThreadDetailUiAdapter;
  timelineAdapter: ThreadTimelineAdapter;
  TimelineComponent?: ComponentType<ThreadTimelineProps>;
  liveOutput?: string;
  beforeTimelineContent?: ReactNode;
  composerProps?: Omit<ThreadComposerProps, 'activeView' | 'onSubmit'>;
  timelineProps?: Partial<
    Omit<ThreadTimelineProps, 'threadId' | 'turns' | 'liveOutput' | 'adapter'>
  >;
  transcriptItemCount: number;
  useFloatingMobileComposer?: boolean;
  floatingDesktopComposer?: boolean;
  floatingMobileComposerBottomOffset?: number;
  composerHostRef?: RefObject<HTMLDivElement | null>;
}

export function GraphChatThreadChatPanel({
  detail,
  adapter,
  timelineAdapter,
  TimelineComponent = ThreadTimeline,
  liveOutput = '',
  beforeTimelineContent,
  composerProps,
  timelineProps,
  transcriptItemCount,
  useFloatingMobileComposer = false,
  floatingDesktopComposer = false,
  floatingMobileComposerBottomOffset = 0,
  composerHostRef,
}: GraphChatThreadChatPanelProps) {
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [mobileComposerHeight, setMobileComposerHeight] = useState(0);
  const [mobileComposerOverlap, setMobileComposerOverlap] = useState(0);
  const [mobileKeyboardInset, setMobileKeyboardInset] = useState(0);
  const [mobilePromptFocused, setMobilePromptFocused] = useState(false);
  const internalComposerHostRef = useRef<HTMLDivElement | null>(null);
  const timelineTailVisibilityChange = timelineProps?.onTailVisibilityChange;
  const hasPendingRequests = detail.pendingRequests.length > 0;
  const queuedPrompts = useMemo(() => {
    const pendingSteers = detail.pendingSteers ?? [];
    const materializedClientRequestIds = new Set(
      pendingSteers
        .map((prompt) => prompt.clientRequestId)
        .filter((value): value is string => Boolean(value)),
    );
    return [
      ...pendingSteers
        .filter((prompt) => prompt.delivery === "continuation")
        .map((prompt) => ({
          id: prompt.id,
          prompt: prompt.prompt,
          ...(prompt.id.startsWith("optimistic-") ? { optimistic: true } : {}),
        })),
      ...(timelineProps?.optimisticSteers ?? [])
        .filter(
          (prompt) => !materializedClientRequestIds.has(prompt.clientRequestId),
        )
        .map((prompt) => ({
          id: prompt.id,
          prompt: prompt.prompt,
          optimistic: true,
        })),
    ];
  }, [detail.pendingSteers, timelineProps?.optimisticSteers]);
  const steeredPrompts = useMemo(
    () =>
      (detail.pendingSteers ?? []).filter(
        (prompt) => prompt.delivery === "steer",
      ),
    [detail.pendingSteers],
  );
  const resolvedComposerProps = useMemo(
    () =>
      composerProps
        ? {
            ...composerProps,
            pendingPrompts: queuedPrompts,
            ...(adapter.steerPendingPrompt &&
            composerProps.capabilities?.turns.steer
              ? {
                  onSteerPendingPrompt: (pendingPromptId: string) =>
                    adapter.steerPendingPrompt?.(
                      detail.thread.id,
                      pendingPromptId,
                    ),
                }
              : {}),
            ...(adapter.cancelPendingSteer
              ? {
                  onCancelPendingPrompt: (pendingPromptId: string) =>
                    adapter.cancelPendingSteer?.(
                      detail.thread.id,
                      pendingPromptId,
                    ),
                }
              : {}),
          }
        : null,
    [
      adapter.cancelPendingSteer,
      adapter.steerPendingPrompt,
      composerProps,
      detail.thread.id,
      queuedPrompts,
    ],
  );

  const handleTailVisibilityChange = useCallback(
    (nextIsTailVisible: boolean) => {
      timelineTailVisibilityChange?.(nextIsTailVisible);
    },
    [timelineTailVisibilityChange],
  );

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function'
    ) {
      return;
    }

    const mediaQuery = window.matchMedia('(max-width: 639px)');
    const updateViewport = () => setIsMobileViewport(mediaQuery.matches);
    updateViewport();
    mediaQuery.addEventListener('change', updateViewport);
    return () => {
      mediaQuery.removeEventListener('change', updateViewport);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const updateKeyboardInset = () => {
      const viewport = window.visualViewport;
      const keyboardInset = viewport
        ? Math.max(
            0,
            Math.round(window.innerHeight - viewport.height - viewport.offsetTop),
          )
        : 0;
      const viewportDelta = viewport
        ? Math.max(0, Math.round(window.innerHeight - viewport.height))
        : keyboardInset;
      const correctedInset = Math.min(keyboardInset, viewportDelta);
      const maxReasonableInset = Math.max(0, Math.round(window.innerHeight * 0.52));
      setMobileKeyboardInset(Math.min(correctedInset, maxReasonableInset));
    };

    updateKeyboardInset();
    window.visualViewport?.addEventListener('resize', updateKeyboardInset);
    window.visualViewport?.addEventListener('scroll', updateKeyboardInset);
    window.addEventListener('resize', updateKeyboardInset);

    return () => {
      window.visualViewport?.removeEventListener('resize', updateKeyboardInset);
      window.visualViewport?.removeEventListener('scroll', updateKeyboardInset);
      window.removeEventListener('resize', updateKeyboardInset);
    };
  }, []);

  useLayoutEffect(() => {
    const node = internalComposerHostRef.current;
    if (!node || (!isMobileViewport && !floatingDesktopComposer)) {
      setMobileComposerHeight(0);
      return;
    }

    const updateHeight = () => {
      setMobileComposerHeight(Math.ceil(node.getBoundingClientRect().height));
    };

    updateHeight();
    if (typeof ResizeObserver === 'undefined') {
      return;
    }

    const observer = new ResizeObserver(updateHeight);
    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [isMobileViewport, floatingDesktopComposer, composerProps, hasPendingRequests]);

  useLayoutEffect(() => {
    const node = internalComposerHostRef.current;
    if (!node || !isMobileViewport) {
      setMobileComposerOverlap(0);
      return;
    }

    const updateOverlap = () => {
      const rect = node.getBoundingClientRect();
      setMobileComposerOverlap(
        Math.max(0, Math.ceil(window.innerHeight - rect.top)),
      );
    };

    updateOverlap();
    window.addEventListener('resize', updateOverlap);
    window.visualViewport?.addEventListener('resize', updateOverlap);
    window.visualViewport?.addEventListener('scroll', updateOverlap);

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(updateOverlap);
      observer.observe(node);
    }

    return () => {
      window.removeEventListener('resize', updateOverlap);
      window.visualViewport?.removeEventListener('resize', updateOverlap);
      window.visualViewport?.removeEventListener('scroll', updateOverlap);
      observer?.disconnect();
    };
  }, [
    isMobileViewport,
    mobileKeyboardInset,
    mobilePromptFocused,
    composerProps,
    hasPendingRequests,
  ]);

  useEffect(() => {
    if (!isMobileViewport) {
      setMobilePromptFocused(false);
      return;
    }

    const handleFocusIn = (event: FocusEvent) => {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        internalComposerHostRef.current?.contains(target)
      ) {
        setMobilePromptFocused(true);
      }
    };
    const handleFocusOut = (event: FocusEvent) => {
      const nextTarget = event.relatedTarget;
      if (
        nextTarget instanceof HTMLElement &&
        internalComposerHostRef.current?.contains(nextTarget)
      ) {
        return;
      }
      setMobilePromptFocused(false);
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);
    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, [isMobileViewport]);

  const setComposerHostRefs = useCallback(
    (node: HTMLDivElement | null) => {
      internalComposerHostRef.current = node;
      if (composerHostRef) {
        (
          composerHostRef as RefObject<HTMLDivElement | null>
        ).current = node;
      }
    },
    [composerHostRef],
  );

  const mobileComposerBottomOffset =
    isMobileViewport && mobilePromptFocused
      ? Math.max(0, mobileKeyboardInset - floatingMobileComposerBottomOffset)
      : 0;
  const effectiveMobileComposerHeight = Math.max(mobileComposerHeight, 144);
  const effectiveMobileComposerOverlap = Math.max(
    mobileComposerOverlap,
    effectiveMobileComposerHeight + mobileComposerBottomOffset,
  );
  const chatScrollBottomSpacer = isMobileViewport
    ? effectiveMobileComposerOverlap + 12
    : floatingDesktopComposer ? mobileComposerHeight + 32 : 0;
  const panelStyle: CSSProperties | undefined =
    chatScrollBottomSpacer > 0
      ? ({
          '--thread-graph-chat-scroll-bottom-spacer': `${chatScrollBottomSpacer}px`,
          '--thread-composer-keyboard-inset': `${mobileComposerBottomOffset}px`,
        } as CSSProperties)
      : undefined;
  const floatingComposerStyle: CSSProperties | undefined =
    useFloatingMobileComposer && isMobileViewport
      ? {
          bottom: `${
            floatingMobileComposerBottomOffset + mobileComposerBottomOffset
          }px`,
          paddingBottom:
            'max(env(safe-area-inset-bottom), var(--android-safe-area-bottom, 0px))',
        }
      : undefined;
  const timelineElement = useMemo(() => {
    const threadRunning =
      detail.thread.status === 'running' || detail.thread.activeTurnId !== null;

    return (
      <TimelineComponent
        threadId={detail.thread.id}
        turns={detail.turns}
        totalTurnCount={detail.totalTurnCount ?? detail.turns.length}
        pendingRequests={detail.pendingRequests}
        activeTurnId={detail.thread.activeTurnId}
        threadRunning={threadRunning}
        liveOutput={liveOutput}
        className="thread-timeline-surface min-h-0 flex-1"
        {...timelineProps}
        pendingSteers={steeredPrompts}
        optimisticSteers={[]}
        adapter={timelineAdapter}
        onOpenThread={timelineProps?.onOpenThread ?? adapter.openThread}
        onTailVisibilityChange={handleTailVisibilityChange}
      />
    );
  }, [
    TimelineComponent,
    adapter.openThread,
    detail.pendingRequests,
    detail.thread.activeTurnId,
    detail.thread.id,
    detail.thread.status,
    detail.totalTurnCount,
    detail.turns,
    handleTailVisibilityChange,
    liveOutput,
    timelineAdapter,
    timelineProps,
    steeredPrompts,
  ]);

  return (
    <div
      data-testid="chat-panel"
      className="thread-graph-chat-panel relative flex h-full min-h-0 flex-col"
      style={panelStyle}
    >
      {beforeTimelineContent}
      {timelineElement}
      <div className="thread-chat-usage-footer hidden shrink-0 items-center px-4 py-1 text-[10px] leading-4 sm:flex">
        <span className="min-w-0">
          {detail.turns.length} turn{detail.turns.length !== 1 ? 's' : ''}
          <span className="mx-1 text-[var(--theme-border-contrast)]">|</span>
          {transcriptItemCount} item{transcriptItemCount !== 1 ? 's' : ''}
        </span>
      </div>
      {resolvedComposerProps ? (
        useFloatingMobileComposer ? (
          <div
            ref={setComposerHostRefs}
            className="fixed inset-x-0 bottom-0 z-50 overflow-visible sm:hidden"
            style={
              floatingComposerStyle ?? {
                bottom: `${floatingMobileComposerBottomOffset}px`,
                paddingBottom:
                  'max(env(safe-area-inset-bottom), var(--android-safe-area-bottom, 0px))',
              }
            }
          >
            <ThreadComposer
              {...resolvedComposerProps}
              activeView="chat"
              edgeToEdgeMobile
              onSubmit={adapter.sendPrompt}
            />
          </div>
        ) : (
          <div
            ref={setComposerHostRefs}
            className="thread-graph-composer-host shrink-0"
          >
            <ThreadComposer
              {...resolvedComposerProps}
              activeView="chat"
              onSubmit={adapter.sendPrompt}
            />
          </div>
        )
      ) : null}
    </div>
  );
}

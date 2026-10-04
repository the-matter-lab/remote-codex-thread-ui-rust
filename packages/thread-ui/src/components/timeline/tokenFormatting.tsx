import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import type { TimelineTurn } from './timelineItems';

export interface TurnTokenDetail {
  id: string;
  label: string;
  tokenCompactValue: string;
  tokenRawValue: number;
  usdCompactValue: string;
  usdRawValue: number | null;
  className: string;
  icon: ReactNode | null;
}

export interface TurnTokenBadge {
  id: string;
  label: string;
  title: string;
  className: string;
  icon: ReactNode | null;
}

export interface TurnPriceBadge {
  label: string;
  title: string;
  className: string;
}

function TokenInIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 fill-none stroke-current"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2.75v8" />
      <path d="m4.75 7.5 3.25 3.25L11.25 7.5" />
    </svg>
  );
}

function TokenOutIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 fill-none stroke-current"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 13.25v-8" />
      <path d="m11.25 8.5-3.25-3.25L4.75 8.5" />
    </svg>
  );
}

function TokenCacheIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 fill-none stroke-current"
      strokeWidth="1.45"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.25 5.25 8 2.75l4.75 2.5L8 7.75l-4.75-2.5Z" />
      <path d="M3.25 8 8 10.5 12.75 8" />
      <path d="M3.25 10.75 8 13.25l4.75-2.5" />
      <path d="M3.25 5.25v5.5" />
      <path d="M12.75 5.25v5.5" />
    </svg>
  );
}

function TokenReasonIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 fill-none stroke-current"
      strokeWidth="1.45"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6.2 3.2a2.3 2.3 0 0 0-2.95 3.5A2.4 2.4 0 0 0 4.5 11h.2c.25 1.1 1.1 1.8 2.3 1.8h1.8c1.2 0 2.05-.7 2.3-1.8h.2A2.4 2.4 0 0 0 12.75 6.7 2.3 2.3 0 0 0 9.8 3.2" />
      <path d="M6.3 6.15c.45-.42 1.02-.65 1.7-.65s1.25.23 1.7.65" />
      <path d="M8 5.5v4.75" />
      <path d="M6.75 9.05 8 10.25l1.25-1.2" />
    </svg>
  );
}

export function formatCompactTokenCount(value: number) {
  if (!Number.isFinite(value) || value < 0) {
    return 'unavailable';
  }

  if (value >= 1_000_000) {
    const rounded =
      value >= 10_000_000 ? Math.round(value / 1_000_000) : value / 1_000_000;
    return `${String(rounded.toFixed(1)).replace(/\.0$/, '')}m`;
  }

  if (value >= 1_000) {
    const rounded =
      value >= 10_000 ? Math.round(value / 1_000) : value / 1_000;
    return `${String(rounded.toFixed(1)).replace(/\.0$/, '')}k`;
  }

  return String(Math.round(value));
}

export function formatCompactUsd(value: number) {
  if (!Number.isFinite(value) || value < 0) {
    return 'unavailable';
  }
  if (value === 0) {
    return '$0';
  }

  if (value >= 100) {
    return `$${Math.round(value)}`;
  }

  if (value >= 10) {
    return `$${String(value.toFixed(1)).replace(/\.0$/, '')}`;
  }

  if (value >= 1) {
    return `$${String(value.toFixed(2)).replace(/0$/, '').replace(/\.$/, '')}`;
  }

  if (value >= 0.1) {
    return `$${value.toFixed(2)}`;
  }

  if (value >= 0.01) {
    return `$${value.toFixed(3)}`;
  }

  if (value >= 0.001) {
    return `$${value.toFixed(4)}`;
  }

  return '<$0.001';
}

export function formatDetailedUsd(value: number) {
  if (!Number.isFinite(value) || value < 0) {
    return 'unavailable';
  }

  return `$${value.toFixed(4)}`;
}

function proportionalOutputUsd(
  totalOutputUsd: number | null | undefined,
  outputTokens: number,
  sliceTokens: number,
) {
  const outputUsdValue = totalOutputUsd ?? null;
  if (
    !Number.isFinite(outputUsdValue ?? NaN) ||
    outputUsdValue === null ||
    outputTokens <= 0 ||
    sliceTokens <= 0
  ) {
    return null;
  }

  return (outputUsdValue * sliceTokens) / outputTokens;
}

export function buildTurnTokenDetails(turn: TimelineTurn) {
  const usage = turn.tokenUsage?.total;
  if (!usage) {
    return [];
  }

  const nonCachedInputTokens = Math.max(
    usage.inputTokens -
      usage.cachedInputTokens -
      (usage.cacheWriteInputTokens ?? 0),
    0,
  );
  const cachedInputTokens = Math.max(usage.cachedInputTokens, 0);
  const cacheWriteInputTokens = Math.max(
    usage.cacheWriteInputTokens ?? 0,
    0,
  );
  const reasoningOutputTokens = Math.max(usage.reasoningOutputTokens, 0);
  const nonReasoningOutputTokens = Math.max(
    usage.outputTokens - reasoningOutputTokens,
    0,
  );

  const details: Array<TurnTokenDetail | null> = [
    nonCachedInputTokens > 0
      ? {
          id: 'in',
          label: 'Input',
          tokenCompactValue: formatCompactTokenCount(nonCachedInputTokens),
          tokenRawValue: nonCachedInputTokens,
          usdCompactValue: turn.priceEstimate
            ? formatDetailedUsd(turn.priceEstimate.inputUsd)
            : '--',
          usdRawValue: turn.priceEstimate?.inputUsd ?? null,
          className: 'token-badge-in',
          icon: <TokenInIcon />,
        }
      : null,
    cachedInputTokens > 0
      ? {
          id: 'cache',
          label: 'Cached input',
          tokenCompactValue: formatCompactTokenCount(cachedInputTokens),
          tokenRawValue: cachedInputTokens,
          usdCompactValue: turn.priceEstimate
            ? formatDetailedUsd(turn.priceEstimate.cachedInputUsd)
            : '--',
          usdRawValue: turn.priceEstimate?.cachedInputUsd ?? null,
          className: 'token-badge-cache',
          icon: <TokenCacheIcon />,
        }
      : null,
    cacheWriteInputTokens > 0
      ? {
          id: 'cache-write',
          label: 'Cache write',
          tokenCompactValue: formatCompactTokenCount(cacheWriteInputTokens),
          tokenRawValue: cacheWriteInputTokens,
          usdCompactValue: turn.priceEstimate
            ? formatDetailedUsd(turn.priceEstimate.cacheWriteInputUsd ?? NaN)
            : '--',
          usdRawValue: turn.priceEstimate?.cacheWriteInputUsd ?? null,
          className: 'token-badge-cache',
          icon: <TokenCacheIcon />,
        }
      : null,
    nonReasoningOutputTokens > 0
      ? {
          id: 'out',
          label: 'Output',
          tokenCompactValue: formatCompactTokenCount(nonReasoningOutputTokens),
          tokenRawValue: nonReasoningOutputTokens,
          usdCompactValue: turn.priceEstimate
            ? formatDetailedUsd(
                proportionalOutputUsd(
                  turn.priceEstimate.outputUsd,
                  Math.max(usage.outputTokens, 0),
                  nonReasoningOutputTokens,
                ) ?? NaN,
              )
            : '--',
          usdRawValue: proportionalOutputUsd(
            turn.priceEstimate?.outputUsd,
            Math.max(usage.outputTokens, 0),
            nonReasoningOutputTokens,
          ),
          className: 'token-badge-out',
          icon: <TokenOutIcon />,
        }
      : null,
    reasoningOutputTokens > 0
      ? {
          id: 'reason',
          label: 'Reasoning',
          tokenCompactValue: formatCompactTokenCount(reasoningOutputTokens),
          tokenRawValue: reasoningOutputTokens,
          usdCompactValue: turn.priceEstimate
            ? formatDetailedUsd(
                proportionalOutputUsd(
                  turn.priceEstimate.outputUsd,
                  Math.max(usage.outputTokens, 0),
                  reasoningOutputTokens,
                ) ?? NaN,
              )
            : '--',
          usdRawValue: proportionalOutputUsd(
            turn.priceEstimate?.outputUsd,
            Math.max(usage.outputTokens, 0),
            reasoningOutputTokens,
          ),
          className: 'token-badge-reason',
          icon: <TokenReasonIcon />,
        }
      : null,
  ];

  return details.filter((detail): detail is TurnTokenDetail => detail !== null);
}

export function buildTurnTokenBadges(turn: TimelineTurn): TurnTokenBadge[] {
  return buildTurnTokenDetails(turn).map((detail) => ({
    id: detail.id,
    label: detail.tokenCompactValue,
    title: `${detail.label}: ${detail.tokenRawValue} tokens`,
    className: detail.className,
    icon: detail.icon,
  }));
}

export function buildTurnPriceBadge(turn: TimelineTurn): TurnPriceBadge {
  return {
    label: turn.priceEstimate
      ? formatCompactUsd(turn.priceEstimate.totalUsd)
      : '--',
    title:
      turn.priceEstimate === null || turn.priceEstimate === undefined
        ? 'Price estimate unavailable for this model.'
        : `Estimated cost: ${formatDetailedUsd(turn.priceEstimate.totalUsd)}`,
    className: turn.priceEstimate
      ? 'token-badge-total'
      : 'token-badge-empty',
  };
}

const TURN_HEADER_BADGE_CLASS_NAME =
  'inline-flex shrink-0 items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-normal leading-none sm:text-[11px]';

export function TurnTokenSummary({ turn }: { turn: TimelineTurn }) {
  const details = buildTurnTokenDetails(turn);
  const priceBadge = buildTurnPriceBadge(turn);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopOpen, setIsDesktopOpen] = useState(false);
  const [mobilePopoverShift, setMobilePopoverShift] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const desktopPriceRef = useRef<HTMLDivElement | null>(null);
  const mobilePopoverRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!isMobileOpen || details.length === 0) {
      setMobilePopoverShift(0);
      return;
    }

    const updatePopoverShift = () => {
      const anchor = containerRef.current;
      const popover = mobilePopoverRef.current;
      if (!anchor || !popover) {
        return;
      }

      const anchorRect = anchor.getBoundingClientRect();
      const popoverWidth =
        popover.offsetWidth || popover.getBoundingClientRect().width;
      if (popoverWidth <= 0) {
        return;
      }

      const viewportWidth =
        window.innerWidth || document.documentElement.clientWidth;
      const viewportPadding = 12;
      const desiredLeft =
        anchorRect.left + anchorRect.width / 2 - popoverWidth / 2;
      const minLeft = viewportPadding;
      const maxLeft = Math.max(
        minLeft,
        viewportWidth - viewportPadding - popoverWidth,
      );
      const clampedLeft = Math.min(Math.max(desiredLeft, minLeft), maxLeft);
      setMobilePopoverShift(Math.round(clampedLeft - desiredLeft));
    };

    updatePopoverShift();
    window.addEventListener('resize', updatePopoverShift);
    return () => {
      window.removeEventListener('resize', updatePopoverShift);
    };
  }, [details.length, isMobileOpen]);

  useEffect(() => {
    if (!isMobileOpen && !isDesktopOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!(event.target instanceof Node)) {
        return;
      }

      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsMobileOpen(false);
      }

      if (
        desktopPriceRef.current &&
        !desktopPriceRef.current.contains(event.target)
      ) {
        setIsDesktopOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isDesktopOpen, isMobileOpen]);

  if (!priceBadge && details.length === 0) {
    return null;
  }

  const renderBreakdownPopover = () => (
    <div className="thread-token-popover min-w-[12rem] rounded-2xl border p-2.5 shadow-2xl shadow-black/20 backdrop-blur">
      <div className="space-y-1">
        {details.map((detail) => (
          <div
            key={detail.id}
            className="thread-token-popover-row flex items-center justify-between gap-3 rounded-xl border px-2.5 py-1.5 text-[11px]"
            title={`${detail.label}: ${detail.tokenRawValue} tokens`}
          >
            <span className="thread-token-popover-text inline-flex min-w-0 items-center gap-2">
              <span className="inline-flex shrink-0">{detail.icon}</span>
              <span className="thread-token-popover-strong font-medium">
                {detail.usdCompactValue}
              </span>
            </span>
            <span className="thread-token-popover-text shrink-0 font-medium">
              {detail.tokenCompactValue}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden shrink-0 items-center gap-1.5 md:inline-flex">
        {priceBadge ? (
          <div
            ref={desktopPriceRef}
            className="relative shrink-0"
            onMouseEnter={() => setIsDesktopOpen(true)}
            onMouseLeave={() => setIsDesktopOpen(false)}
          >
            <button
              type="button"
              aria-label="Show token and price details"
              aria-expanded={isDesktopOpen}
              onFocus={() => setIsDesktopOpen(true)}
              onBlur={() => setIsDesktopOpen(false)}
              className={`${TURN_HEADER_BADGE_CLASS_NAME} appearance-none whitespace-nowrap bg-transparent !text-[10px] !font-normal !leading-none transition hover:bg-[var(--theme-hover)] sm:!text-[11px] ${priceBadge.className}`}
              title={priceBadge.title}
            >
              {priceBadge.label}
            </button>
            {isDesktopOpen && details.length > 0 ? (
              <div className="absolute left-1/2 top-full z-30 mt-1.5 -translate-x-1/2">
                {renderBreakdownPopover()}
              </div>
            ) : null}
          </div>
        ) : null}
        {details.map((detail) => (
          <span
            key={detail.id}
            className={`${TURN_HEADER_BADGE_CLASS_NAME} ${detail.className}`}
            title={`${detail.label}: ${detail.usdCompactValue}, ${detail.tokenRawValue} tokens`}
          >
            {detail.icon}
            <span className="thread-token-badge-value font-medium">
              {detail.tokenCompactValue}
            </span>
          </span>
        ))}
      </div>
      <div ref={containerRef} className="relative shrink-0 md:hidden">
        {priceBadge ? (
          <button
            type="button"
            aria-label="Show token and price details"
            aria-expanded={isMobileOpen}
            onClick={() => setIsMobileOpen((current) => !current)}
            className={`${TURN_HEADER_BADGE_CLASS_NAME} appearance-none whitespace-nowrap bg-transparent !text-[10px] !font-normal !leading-none transition hover:bg-[var(--theme-hover)] sm:!text-[11px] ${priceBadge.className}`}
            title={priceBadge.title}
          >
            {priceBadge.label}
          </button>
        ) : null}
        {isMobileOpen && details.length > 0 ? (
          <div
            ref={mobilePopoverRef}
            className="absolute left-1/2 top-full z-30 mt-1.5"
            style={{
              transform: `translateX(${mobilePopoverShift}px) translateX(-50%)`,
            }}
          >
            {renderBreakdownPopover()}
          </div>
        ) : null}
      </div>
    </>
  );
}

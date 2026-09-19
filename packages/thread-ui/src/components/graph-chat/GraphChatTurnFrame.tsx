import { type ReactNode, type RefCallback } from 'react';

export interface GraphChatTurnFrameProps {
  absoluteIndex: number;
  body: ReactNode;
  collapsed: boolean;
  collapsedBody?: ReactNode;
  error?: string | null;
  footer?: ReactNode;
  headerStatus?: ReactNode;
  isActive?: boolean;
  refCallback?: RefCallback<HTMLElement> | undefined;
  startedAt?: string | null;
  timeLabel: string;
  timeTitle: string;
  tokenSummary?: ReactNode;
}

export function GraphChatTurnFrame({
  absoluteIndex,
  body,
  collapsed,
  collapsedBody,
  error,
  footer,
  headerStatus,
  isActive = false,
  refCallback,
  startedAt,
  timeLabel,
  timeTitle,
  tokenSummary,
}: GraphChatTurnFrameProps) {
  return (
    <article
      ref={refCallback}
      data-testid="chat-turn"
      data-turn-active={isActive ? 'true' : 'false'}
      className="thread-graph-turn px-3 py-2 sm:px-5 sm:py-3"
    >
      <div className="thread-graph-turn-header flex items-start justify-between gap-2">
        <div className="min-w-0 flex flex-1 items-start gap-1.5">
          <div className="min-w-0 flex flex-1 items-center gap-1.5 overflow-hidden">
            <span className="thread-graph-turn-index rounded-[0.6rem] border px-1.5 py-0.5 text-[10px] uppercase tracking-[0.16em]">
              Turn {absoluteIndex}
            </span>
            <time
              dateTime={startedAt ?? undefined}
              title={timeTitle}
              className="thread-graph-turn-time shrink-0 text-[10px] sm:text-[11px]"
            >
              {timeLabel}
            </time>
            {headerStatus}
          </div>
          {tokenSummary}
        </div>
      </div>

      <div className="thread-graph-turn-body mt-2 space-y-2">
        {collapsed ? collapsedBody : body}
        {!collapsed ? footer : null}
        {error ? <div className="thread-graph-turn-error" role="alert">
          <strong>Run needs attention</strong>
          <p>{error}</p>
        </div> : null}
      </div>
    </article>
  );
}

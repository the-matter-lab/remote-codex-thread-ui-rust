import { useState, type MouseEvent, type ReactNode } from 'react';
import { CheckCircle2, Circle, Loader2, XCircle } from 'lucide-react';

type GraphChatMessageKind = 'userMessage' | 'agentMessage';

function GraphChatRunningDots() {
  return (
    <span className="ml-1.5 inline-flex items-center gap-1" aria-hidden="true">
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-200/90"
          style={{ animationDelay: `${index * 180}ms` }}
        />
      ))}
    </span>
  );
}

export function GraphChatMessageStatusBadge({
  status,
}: {
  status: string | null | undefined;
}) {
  if (!status) {
    return null;
  }

  const normalized = status.toLowerCase();
  const isRunning =
    normalized.includes('running') ||
    normalized.includes('generating') ||
    normalized.includes('steering');
  const isFailed =
    normalized.includes('failed') || normalized.includes('error');
  const isCompleted =
    normalized.includes('accepted') || normalized.includes('complete');
  const className = isRunning
    ? 'ui-status-warning'
    : isFailed
      ? 'ui-status-danger'
      : isCompleted
        ? 'ui-status-success'
        : 'ui-status-neutral';
  const icon = isRunning ? (
    <Loader2 className="h-3.5 w-3.5 animate-spin" />
  ) : isFailed ? (
    <XCircle className="h-3.5 w-3.5" />
  ) : isCompleted ? (
    <CheckCircle2 className="h-3.5 w-3.5" />
  ) : (
    <Circle className="h-3.5 w-3.5" />
  );

  return (
    <span
      className={`thread-graph-message-status inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-normal ${className}`}
      title={status}
      aria-label={`Status: ${status}`}
    >
      <span className="thread-graph-message-status-icon inline-flex shrink-0">
        {isRunning ? <GraphChatRunningDots /> : icon}
      </span>
      <span className="thread-graph-status-label">{status}</span>
    </span>
  );
}

export function GraphChatMessageFrame({
  children,
  copyButton,
  kind,
  metaControl,
  reasoning,
  status,
  timeLabel,
  timeTitle,
  messageId,
}: {
  children: ReactNode;
  messageId?: string;
  copyButton?: ReactNode;
  kind: GraphChatMessageKind;
  metaControl?: ReactNode;
  reasoning?: ReactNode;
  status?: string | null | undefined;
  timeLabel?: ReactNode;
  timeTitle?: string | null | undefined;
}) {
  const isUser = kind === 'userMessage';
  const [touchActionsVisible, setTouchActionsVisible] = useState(false);
  const normalizedStatus = status?.trim().toLowerCase() ?? '';
  const showStatus = Boolean(
    status &&
    normalizedStatus !== 'complete' &&
    normalizedStatus !== 'completed',
  );
  const timeNode = timeLabel ? (
    <span
      title={timeTitle ?? undefined}
      className="thread-graph-message-time text-[10px] leading-none sm:text-[11px]"
    >
      {timeLabel}
    </span>
  ) : null;
  function handleMessageClick(event: MouseEvent<HTMLDivElement>) {
    if (
      event.target instanceof Element &&
      event.target.closest('a, button, input, summary, pre, .thread-graph-code-block')
    ) {
      return;
    }
    setTouchActionsVisible((visible) => !visible);
  }

  return (
    <div
      data-testid="chat-message"
      data-message-id={messageId}
      data-role={isUser ? 'user' : 'assistant'}
      className={`thread-graph-message flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`thread-graph-message-stack min-w-0 ${isUser ? 'is-user' : 'is-assistant'}`}
      >
        {timeNode ? <div className={`thread-graph-message-time-row ${isUser ? 'is-user' : ''}`}>{timeNode}</div> : null}
        <div
          data-touch-actions={touchActionsVisible ? 'true' : 'false'}
          className={`thread-graph-message-bubble relative min-w-0 ${isUser ? 'is-user' : 'is-assistant'}`}
          onClick={handleMessageClick}
        >
          {!isUser && metaControl ? (
            <div className="thread-graph-message-leading-actions">
              {metaControl}
            </div>
          ) : null}
          {reasoning}
          <div
            className={`thread-graph-message-content min-w-0 ${isUser ? 'is-user' : 'is-assistant'}`}
          >
            {children}
          </div>
          {copyButton ? (
            <div className="thread-graph-message-copy-desktop">
              {copyButton}
            </div>
          ) : null}
        </div>
        {isUser && showStatus ? (
          <div
            className={`thread-graph-message-user-meta flex items-center justify-end gap-2 ${showStatus || timeNode ? 'has-persistent-meta' : ''}`}
          >
            {showStatus ? (
              <GraphChatMessageStatusBadge status={status} />
            ) : null}

          </div>
        ) : null}
        {!isUser && showStatus ? (
          <div
            className={`thread-graph-message-assistant-actions flex items-center gap-1 ${showStatus ? 'has-status' : ''}`}
          >

            {showStatus ? (
              <GraphChatMessageStatusBadge status={status} />
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

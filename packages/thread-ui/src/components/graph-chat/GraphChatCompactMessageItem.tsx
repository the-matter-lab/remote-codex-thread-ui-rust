import {
  memo,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';
import { Brain, Check, Copy } from 'lucide-react';

import type { ThreadHistoryItemDto } from '@remote-codex/shared';
import type { ThreadTimelineAdapter } from '../../adapters';
import {
  GraphChatAgentMessageBody,
  GraphChatLinkifiedPlainText,
  GraphChatUserMessageBody,
} from './GraphChatMessageBody';
import { GraphChatMessageFrame } from './GraphChatMessageFrame';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '../graph-workspace/GraphAccordion';

type GraphChatCompactMessageKind = Extract<
  ThreadHistoryItemDto['kind'],
  'userMessage' | 'agentMessage'
>;

type GraphChatReasoningItem = ThreadHistoryItemDto & { kind: 'reasoning' };

type GraphChatCompactMessage = ThreadHistoryItemDto & {
  kind: GraphChatCompactMessageKind;
  reasoningItems?: GraphChatReasoningItem[] | undefined;
  attachmentPreviewUrls?: Record<string, string> | undefined;
};

function isGraphChatRunningStatus(status?: string | null) {
  if (!status) {
    return false;
  }

  const normalized = status.toLowerCase();
  return (
    normalized.includes('running') ||
    normalized.includes('inprogress') ||
    normalized.includes('in_progress')
  );
}

function GraphChatRunningDots({ tone = 'amber' }: { tone?: 'amber' | 'sky' }) {
  const dotClassName = tone === 'sky' ? 'bg-sky-300/90' : 'bg-amber-200/90';

  return (
    <span className="ml-1.5 inline-flex items-center gap-1" aria-hidden="true">
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className={`h-1.5 w-1.5 animate-pulse rounded-full ${dotClassName}`}
          style={{ animationDelay: `${index * 180}ms` }}
        />
      ))}
    </span>
  );
}

export const GraphChatCompactMessageItem = memo(
  function GraphChatCompactMessageItem({
    threadId,
    item,
    scrollRootRef,
    streaming = false,
    adapter,
    timeLabel,
    timeTitle,
    onBeforeMessageResize,
  }: {
    threadId?: string | undefined;
    item: GraphChatCompactMessage;
    scrollRootRef: RefObject<HTMLDivElement | null>;
    streaming?: boolean;
    adapter?: ThreadTimelineAdapter;
    timeLabel?: ReactNode;
    timeTitle?: string | null | undefined;
    onBeforeMessageResize?: () => void;
  }) {
    const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>(
      'idle',
    );
    const [reasoningOpen, setReasoningOpen] = useState(false);
    const resetTimerRef = useRef<number | null>(null);
    const reasoningItems =
      item.kind === 'agentMessage' ? (item.reasoningItems ?? []) : [];
    const reasoningText = reasoningItems
      .map((entry) => entry.text.trim())
      .filter(Boolean)
      .join('\n\n');
    const queuedLikeStatus =
      item.kind === 'userMessage' &&
      (item.status === 'Steering' ||
        item.status === 'Accepted' ||
        item.status === 'Awaiting response');

    useEffect(() => {
      return () => {
        if (resetTimerRef.current !== null) {
          window.clearTimeout(resetTimerRef.current);
        }
      };
    }, []);

    async function handleCopy() {
      try {
        await navigator.clipboard.writeText(item.text);
        setCopyState('copied');
        if (resetTimerRef.current !== null) {
          window.clearTimeout(resetTimerRef.current);
        }
        resetTimerRef.current = window.setTimeout(
          () => setCopyState('idle'),
          1200,
        );
      } catch {
        setCopyState('failed');
        if (resetTimerRef.current !== null) {
          window.clearTimeout(resetTimerRef.current);
        }
        resetTimerRef.current = window.setTimeout(
          () => setCopyState('idle'),
          1600,
        );
      }
    }

    function toggleReasoning() {
      onBeforeMessageResize?.();
      setReasoningOpen((value) => !value);
    }

    const copyLabel = item.kind === 'agentMessage' ? 'agent reply' : 'prompt';
    const copyButton = (
      <button
        type="button"
        aria-label={`Copy ${copyLabel}`}
        title={
          copyState === 'copied'
            ? 'Copied'
            : copyState === 'failed'
              ? 'Copy failed'
              : `Copy ${copyLabel}`
        }
        onClick={() => void handleCopy()}
        className={`thread-graph-message-copy inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border transition ${
          copyState === 'copied'
            ? 'ui-status-info'
            : copyState === 'failed'
              ? 'ui-status-danger'
              : ''
        }`}
      >
        {copyState === 'copied' ? (
          <Check className="h-3.5 w-3.5" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
    );

    const hasRunningReasoning = reasoningItems.some((entry) =>
      isGraphChatRunningStatus(entry.status),
    );
    const reasoningToggle =
      item.kind === 'agentMessage' && reasoningText ? (
        <button
          type="button"
          aria-label={
            reasoningOpen ? 'Hide chain of thought' : 'Show chain of thought'
          }
          aria-expanded={reasoningOpen}
          title={reasoningOpen ? 'Hide CoT' : 'Show CoT'}
          onClick={toggleReasoning}
          className={`thread-graph-thinking-toggle inline-flex h-7 shrink-0 items-center gap-1.5 rounded-md border px-2 text-xs font-medium transition ${
            reasoningOpen ? 'is-open' : ''
          }`}
        >
          <Brain
            className={`h-3.5 w-3.5 ${hasRunningReasoning ? 'animate-pulse' : ''}`}
          />
          <span>CoT</span>
          {hasRunningReasoning ? <GraphChatRunningDots tone="sky" /> : null}
        </button>
      ) : null;

    const reasoning =
      item.kind === 'agentMessage' && reasoningText ? (
        <div className="thread-graph-message-thinking mb-3">
          <Accordion
            type="single"
            collapsible
            value={reasoningOpen ? 'thoughts' : ''}
            className="thread-graph-thinking-accordion w-full border-none"
            onValueChange={(value) => setReasoningOpen(Boolean(value))}
          >
            <AccordionItem value="thoughts" className="border-b-0">
              <AccordionContent className="thread-graph-thinking-content pb-0">
                <pre className="thread-graph-thinking-body my-1 max-h-56 overflow-auto whitespace-pre-wrap break-words rounded-xl border p-3 text-[12px] leading-5">
                  <GraphChatLinkifiedPlainText text={reasoningText} />
                </pre>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ) : null;

    return (
      <GraphChatMessageFrame
        messageId={item.id}
        kind={item.kind}
        status={
          queuedLikeStatus
            ? item.status
            : item.kind === 'agentMessage' && !isGraphChatRunningStatus(item.status)
              ? item.status
              : null
        }
        copyButton={copyButton}
        metaControl={reasoningToggle}
        reasoning={reasoning}
        timeLabel={timeLabel}
        timeTitle={timeTitle}
      >
        {item.kind === 'agentMessage' ? (
          <GraphChatAgentMessageBody
            workspaceRootPath={adapter?.workspaceRootPath}
            messageId={item.id}
            text={item.text}
            scrollRootRef={scrollRootRef}
            streaming={streaming}
            {...(onBeforeMessageResize
              ? { onBeforeResize: onBeforeMessageResize }
              : {})}
            {...(adapter?.onOpenWorkspaceFile
              ? { onOpenWorkspaceFile: adapter.onOpenWorkspaceFile }
              : {})}
            {...(adapter?.resolveHref
              ? { resolveHref: adapter.resolveHref }
              : {})}
          />
        ) : (
          <GraphChatUserMessageBody
            threadId={threadId}
            text={item.text}
            attachmentPreviewUrls={item.attachmentPreviewUrls}
            getImageAssetUrl={adapter?.getImageAssetUrl}
          />
        )}
      </GraphChatMessageFrame>
    );
  },
);

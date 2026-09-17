import {
  memo,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';
import {
  Archive,
  Bot,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  ExternalLink,
  FilePenLine,
  FileText,
  Image as ImageIconLucide,
  Info,
  Loader2,
  PackageOpen,
  Search,
  Sparkles,
  Terminal,
  Webhook,
  Wrench,
  XCircle,
} from 'lucide-react';

import type { ThreadHistoryItemDto } from '@remote-codex/shared';
import { WorkspaceFileLink } from '../WorkspaceFileLink';
import type { ThreadTimelineAdapter } from '../../adapters';
import { usePlugins } from '../../plugins/usePlugins';
import {
  GraphChatLinkifiedPlainText,
  GraphChatMarkdownAwareBody,
} from './GraphChatMessageBody';
import { GraphChatHistoryGroupFrame } from './GraphChatHistoryGroupFrame';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../graph-workspace/GraphAccordion';
import { Badge } from '../graph-ui/Badge';

interface ContextCompactionHistoryItem extends ThreadHistoryItemDto {
  kind: 'contextCompaction';
}

type GetImageAssetUrl = (input: { threadId: string; path: string }) => string;

interface CommandHistoryItem extends ThreadHistoryItemDto {
  kind: 'commandExecution';
}

interface FileChangeHistoryItem extends ThreadHistoryItemDto {
  kind: 'fileChange';
}

interface SearchHistoryItem extends ThreadHistoryItemDto {
  kind: 'webSearch';
}

interface FileReadHistoryItem extends ThreadHistoryItemDto {
  kind: 'fileRead';
}

type ToolActivityHistoryItem = ThreadHistoryItemDto & {
  kind: 'toolCall' | 'agentToolCall' | 'skillToolCall';
};

function isRunningHistoryStatus(status?: string | null) {
  if (!status) return false;
  const normalized = status.trim().toLowerCase();
  return (
    normalized === 'running' ||
    normalized === 'in_progress' ||
    normalized === 'in progress' ||
    normalized === 'pending'
  );
}

function FileChangeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 fill-none stroke-current"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 2.75h4l2 2v6.5a1.5 1.5 0 0 1-1.5 1.5h-4A1.5 1.5 0 0 1 4 11.25v-7A1.5 1.5 0 0 1 5.5 2.75Z" />
      <path d="M9 2.75v2h2" />
      <path d="M6.2 8h3.6" />
      <path d="M6.2 10h1.7" />
    </svg>
  );
}

function FileReadIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 fill-none stroke-current"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 2.75h4l2 2v6.5a1.5 1.5 0 0 1-1.5 1.5h-4A1.5 1.5 0 0 1 4 11.25v-7A1.5 1.5 0 0 1 5.5 2.75Z" />
      <path d="M9 2.75v2h2" />
      <path d="M6.15 7.25h3.7" />
      <path d="M6.15 9.25h2.8" />
      <path d="m10.4 10.7 1.2 1.2" />
      <circle cx="9.25" cy="9.55" r="1.45" />
    </svg>
  );
}

function CommandBatchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 fill-none stroke-current"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2.75" y="3" width="8.5" height="3" rx="1.1" />
      <rect x="4.25" y="6.5" width="8.5" height="3" rx="1.1" />
      <rect x="5.75" y="10" width="7.5" height="3" rx="1.1" />
      <path d="m6.25 4.5 1 1-1 1" />
      <path d="M7.9 5.5h1.7" />
      <path d="m7.75 8 1 1-1 1" />
      <path d="M9.4 9h1.7" />
    </svg>
  );
}

function SearchBatchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 fill-none stroke-current"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="6" cy="6" r="2.3" />
      <path d="m8 8 1.6 1.6" />
      <circle cx="9.3" cy="8.8" r="2" />
      <path d="m10.75 10.25 1.65 1.65" />
      <circle cx="11.2" cy="4.75" r="1.8" />
      <path d="m12.45 6 1.1 1.1" />
    </svg>
  );
}

function projectRelativePathLabel(label: string) {
  const normalized = label.trim();
  if (!normalized) {
    return '';
  }

  const suffixMatch = normalized.match(/(, \+\d+ more.*)$/);
  const suffix = suffixMatch?.[1] ?? '';
  const base = suffix ? normalized.slice(0, -suffix.length) : normalized;
  const slashNormalized = base.replace(/\\/g, '/');
  if (!slashNormalized.startsWith('/')) {
    return `${slashNormalized.replace(/^\.\//, '')}${suffix}`;
  }

  const markers = [
    '/apps/',
    '/packages/',
    '/src/',
    '/test/',
    '/tests/',
    '/docs/',
    '/config/',
    '/scripts/',
    '/e2e/',
    '/.agents/',
    '/.codex/',
  ];
  for (const marker of markers) {
    const markerIndex = slashNormalized.indexOf(marker);
    if (markerIndex >= 0) {
      return `${slashNormalized.slice(markerIndex + 1)}${suffix}`;
    }
  }

  return normalized;
}

function formatTrailingPathLabel(label: string, maxLength = 42) {
  const normalized = projectRelativePathLabel(label);
  if (!normalized) {
    return '';
  }

  const suffixMatch = normalized.match(/(, \+\d+ more.*)$/);
  const suffix = suffixMatch?.[1] ?? '';
  const base = suffix ? normalized.slice(0, -suffix.length) : normalized;
  if (base.length <= maxLength) {
    return `${base}${suffix}`;
  }

  const normalizedSeparators = base.replace(/\\/g, '/');
  const segments = normalizedSeparators.split('/').filter(Boolean);
  if (segments.length > 1) {
    const keptSegments: string[] = [];
    let currentLength = suffix.length + 4;

    for (let index = segments.length - 1; index >= 0; index -= 1) {
      const candidate = segments[index]!;
      const nextLength =
        currentLength + candidate.length + (keptSegments.length > 0 ? 1 : 0);
      if (keptSegments.length > 0 && nextLength > maxLength) {
        break;
      }
      keptSegments.unshift(candidate);
      currentLength = nextLength;
    }

    if (keptSegments.length > 0) {
      return `.../${keptSegments.join('/')}${suffix}`;
    }
  }

  return `...${base.slice(-(maxLength - suffix.length - 3))}${suffix}`;
}

function fileChangeSummarySegments(
  item: ThreadHistoryItemDto & { kind: 'fileChange' },
) {
  const segments: string[] = [];

  if (typeof item.changedFiles === 'number' && item.changedFiles > 0) {
    segments.push(
      `${item.changedFiles} ${item.changedFiles === 1 ? 'file' : 'files'}`,
    );
  }
  if (typeof item.addedLines === 'number' && item.addedLines > 0) {
    segments.push(`+${item.addedLines}`);
  }
  if (typeof item.removedLines === 'number' && item.removedLines > 0) {
    segments.push(`-${item.removedLines}`);
  }

  if (segments.length > 0) {
    return segments;
  }

  const fallback = item.previewText?.trim();
  if (!fallback) {
    return [];
  }

  return fallback
    .replace(/\bfiles changed\b/gi, 'files')
    .replace(/\bfile changed\b/gi, 'file')
    .split('·')
    .map((segment) => segment.trim())
    .filter(Boolean);
}

function RunningDots({
  tone = 'amber',
}: {
  tone?: 'amber' | 'emerald' | 'sky';
}) {
  const dotClassName =
    tone === 'emerald'
      ? 'bg-sky-200/90'
      : tone === 'sky'
        ? 'bg-sky-300/90'
        : 'bg-amber-200/90';

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

function normalizeLines(text: string) {
  const lines = text.replace(/\r\n/g, '\n').split('\n');

  while (lines.length > 1 && lines.at(-1)?.trim() === '') {
    lines.pop();
  }

  return lines;
}

function summarizeInlinePreviewText(text: string) {
  const lines = normalizeLines(text);

  if (lines.length === 1) {
    return {
      firstLine: lines[0] ?? '',
      showGap: false,
      isTruncated: false,
    };
  }

  return {
    firstLine: lines[0] ?? '',
    showGap: true,
    isTruncated: true,
  };
}

type GraphHistoryToolTone =
  | 'command'
  | 'tool'
  | 'agent'
  | 'skill'
  | 'search'
  | 'fileRead';

type GraphHistoryEventTone =
  | 'plan'
  | 'context'
  | 'generic'
  | 'image'
  | 'fileChange'
  | 'artifact'
  | 'hook';

function graphHistoryStatusConfig(status?: string | null) {
  const normalized = status?.trim().toLowerCase() ?? '';

  if (
    normalized === 'completed' ||
    normalized === 'complete' ||
    normalized === 'success' ||
    normalized === 'succeeded'
  ) {
    return {
      className: 'is-completed',
      icon: <CheckCircle2 className="h-3.5 w-3.5" />,
      label: 'Completed',
    };
  }

  if (
    normalized === 'failed' ||
    normalized === 'failure' ||
    normalized === 'error' ||
    normalized === 'errored'
  ) {
    return {
      className: 'is-failed',
      icon: <XCircle className="h-3.5 w-3.5" />,
      label: 'Failed',
    };
  }

  if (isRunningHistoryStatus(status)) {
    return {
      className: 'is-pending',
      icon: <Loader2 className="h-3.5 w-3.5 animate-spin" />,
      label: status?.trim() || 'Running',
    };
  }

  return {
    className: 'is-neutral',
    icon: null,
    label: status?.trim() || 'Event',
  };
}

function graphHistoryToneClassName(tone: GraphHistoryToolTone) {
  switch (tone) {
    case 'command':
      return 'is-command';
    case 'tool':
      return 'is-tool';
    case 'agent':
      return 'is-agent';
    case 'skill':
      return 'is-skill';
    case 'search':
      return 'is-search';
    case 'fileRead':
      return 'is-file-read';
  }
}

function graphHistoryEventToneClassName(tone: GraphHistoryEventTone) {
  switch (tone) {
    case 'plan':
      return 'is-plan';
    case 'context':
      return 'is-context';
    case 'generic':
      return 'is-generic';
    case 'image':
      return 'is-image';
    case 'fileChange':
      return 'is-file-change';
    case 'artifact':
      return 'is-artifact';
    case 'hook':
      return 'is-hook';
  }
}

function GraphChatHistoryEventFrame({
  actions,
  children,
  className,
  headerMeta,
  icon,
  item,
  timeMeta,
  title,
  tone,
}: {
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
  headerMeta?: ReactNode;
  icon: ReactNode;
  item: ThreadHistoryItemDto;
  timeMeta?: ReactNode;
  title: string;
  tone: GraphHistoryEventTone;
}) {
  const statusConfig = graphHistoryStatusConfig(item.status);
  const showStatus = Boolean(
    item.status && statusConfig.className !== 'is-completed',
  );

  return (
    <div
      className={`thread-graph-event thread-graph-history-event ${graphHistoryEventToneClassName(
        tone,
      )} ${className ?? ''}`}
    >
      <div className="thread-graph-history-event-icon" aria-hidden="true">
        {icon}
      </div>
      <div className="thread-graph-history-event-card">
        <div className="thread-graph-history-event-header">
          <div className="thread-graph-history-event-heading flex min-w-0 items-center gap-2">
            <span className="thread-graph-history-event-title min-w-0 truncate font-mono text-sm font-semibold">
              {title}
            </span>
            {item.status && showStatus ? (
              <Badge
                variant="outline"
                className={`thread-graph-tool-badge ${statusConfig.className} rounded-full px-2 py-0.5 text-xs font-normal`}
                title={statusConfig.label}
                aria-label={`Status: ${statusConfig.label}`}
              >
                {statusConfig.icon}
                <span className="thread-graph-status-label">
                  {statusConfig.label}
                </span>
              </Badge>
            ) : null}
            {headerMeta}
          </div>
          {actions || timeMeta ? (
            <div className="thread-graph-history-event-actions">
              {actions}
              {timeMeta}
            </div>
          ) : null}
        </div>
        {children ? (
          <div className="thread-graph-history-event-body">{children}</div>
        ) : null}
      </div>
    </div>
  );
}

function GraphChatHistoryToolFrame({
  actionLabel = 'Open details',
  actionTitle,
  autoOpen = false,
  className,
  details,
  icon,
  item,
  onOpen,
  preview,
  timeMeta,
  title,
  tone,
}: {
  actionLabel?: string;
  actionTitle: string;
  autoOpen?: boolean;
  className?: string;
  details?: ReactNode;
  icon: ReactNode;
  item: ThreadHistoryItemDto;
  onOpen: () => void;
  preview: ReturnType<typeof summarizeInlinePreviewText>;
  timeMeta?: ReactNode;
  title: string;
  tone: GraphHistoryToolTone;
}) {
  const statusConfig = graphHistoryStatusConfig(item.status);
  const showStatus = Boolean(
    item.status && statusConfig.className !== 'is-completed',
  );
  const [openItem, setOpenItem] = useState<string | undefined>(
    autoOpen ? 'item-1' : undefined,
  );
  const previousAutoOpenRef = useRef(autoOpen);

  useLayoutEffect(() => {
    if (autoOpen) {
      setOpenItem('item-1');
    } else if (previousAutoOpenRef.current) {
      setOpenItem(undefined);
    }
    previousAutoOpenRef.current = autoOpen;
  }, [autoOpen, item.id]);

  return (
    <div
      className={`thread-graph-event thread-graph-history-tool ${graphHistoryToneClassName(tone)} ${className ?? ''}`}
    >
      <Accordion
        type="single"
        collapsible
        onValueChange={(value) => {
          setOpenItem(value || undefined);
        }}
        className="thread-graph-tool-accordion thread-graph-history-tool-accordion w-full overflow-hidden rounded-lg border"
        value={openItem ?? ''}
      >
        <AccordionItem value="item-1" className="border-0">
          <AccordionTrigger
            aria-label={`${openItem === 'item-1' ? 'Collapse' : 'Expand'} ${title} history item`}
            className="thread-graph-tool-trigger thread-graph-history-tool-trigger px-4 py-3 hover:no-underline"
          >
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <span className="thread-graph-history-tool-icon shrink-0">
                {icon}
              </span>
              <span className="thread-graph-history-tool-label shrink-0 text-sm font-medium">
                {title}
              </span>
              <span className="thread-graph-history-tool-preview min-w-0 truncate text-sm">
                {preview.firstLine}
              </span>
              {preview.showGap ? (
                <span
                  className="thread-graph-history-tool-preview-ellipsis"
                  aria-hidden="true"
                >
                  ...
                </span>
              ) : null}
              {showStatus ? (
                <Badge
                  variant="outline"
                  className={`thread-graph-tool-badge ${statusConfig.className} rounded-full px-2 py-0.5 text-xs font-normal`}
                  title={statusConfig.label}
                  aria-label={`Status: ${statusConfig.label}`}
                >
                  {statusConfig.icon}
                  <span className="thread-graph-status-label">
                    {statusConfig.label}
                  </span>
                </Badge>
              ) : null}
            </div>
            {timeMeta ? (
              <span className="thread-graph-history-tool-time shrink-0">
                {timeMeta}
              </span>
            ) : null}
          </AccordionTrigger>

          <AccordionContent className="thread-graph-tool-content thread-graph-history-tool-content px-4 pb-4 pt-1">
            <section>
              <h4>Summary</h4>
              <div className="thread-graph-history-tool-summary">
                <GraphChatLinkifiedPlainText text={preview.firstLine} />
                {preview.showGap ? (
                  <span className="thread-graph-history-tool-ellipsis">
                    ...
                  </span>
                ) : null}
              </div>
            </section>

            {details ? <section>{details}</section> : null}

            <button
              type="button"
              aria-label={actionLabel}
              onClick={onOpen}
              className="thread-graph-history-tool-open inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              {actionTitle}
            </button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export const GraphChatPlanHistoryItem = memo(function GraphChatPlanHistoryItem({
  item,
  scrollRootRef,
  onBeforeResize,
  timeMeta,
}: {
  item: ThreadHistoryItemDto & { kind: 'plan' };
  scrollRootRef: RefObject<HTMLDivElement | null>;
  onBeforeResize?: () => void;
  timeMeta?: ReactNode;
}) {
  return (
    <GraphChatHistoryEventFrame
      className="thread-graph-event-plan"
      icon={<ClipboardList className="h-4 w-4" />}
      item={item}
      timeMeta={timeMeta}
      title="Planned"
      tone="plan"
    >
      <div className="thread-graph-history-event-prose">
        <GraphChatMarkdownAwareBody
          text={item.text}
          scrollRootRef={scrollRootRef}
          plainTextClassName="thread-graph-plain-text whitespace-pre-wrap break-words text-sm leading-6"
          markdownClassName="thread-graph-markdown text-sm"
          {...(onBeforeResize ? { onBeforeResize } : {})}
        />
      </div>
    </GraphChatHistoryEventFrame>
  );
});

export const GraphChatContextCompactionItem = memo(
  function GraphChatContextCompactionItem({
    item,
    timeMeta,
  }: {
    item: ContextCompactionHistoryItem;
    timeMeta?: ReactNode;
  }) {
    const isRunning =
      isRunningHistoryStatus(item.status) || item.text === 'Compacting context';
    const primaryText = isRunning ? 'Compacting context' : 'Context compacted';
    const secondaryText =
      item.detailText && item.detailText !== primaryText
        ? item.detailText
        : null;

    return (
      <GraphChatHistoryEventFrame
        className="thread-graph-event-context"
        icon={<Archive className="h-4 w-4" />}
        item={item}
        timeMeta={timeMeta}
        title={isRunning ? 'Compacting' : 'Compacted'}
        tone="context"
      >
        <div className="thread-graph-history-event-line">
          <span className="thread-graph-history-event-primary">
            {primaryText}
          </span>
          {isRunning ? <RunningDots tone="emerald" /> : null}
        </div>
        {secondaryText ? (
          <p
            className="thread-graph-history-event-secondary"
            title={secondaryText}
          >
            {secondaryText}
          </p>
        ) : null}
      </GraphChatHistoryEventFrame>
    );
  },
);

export const GraphChatGenericHistoryItem = memo(
  function GraphChatGenericHistoryItem({
    item,
    timeMeta,
  }: {
    item: ThreadHistoryItemDto;
    timeMeta?: ReactNode;
  }) {
    return (
      <GraphChatHistoryEventFrame
        className="thread-graph-event-generic"
        icon={<Info className="h-4 w-4" />}
        item={item}
        timeMeta={timeMeta}
        title="Noted"
        tone="generic"
      >
        <pre className="thread-graph-history-event-pre">
          <GraphChatLinkifiedPlainText text={item.text} />
        </pre>
      </GraphChatHistoryEventFrame>
    );
  },
);

export const GraphChatCommandItem = memo(function GraphChatCommandItem({
  autoOpen,
  item,
  onOpen,
  timeMeta,
}: {
  autoOpen?: boolean;
  item: ThreadHistoryItemDto & { kind: 'commandExecution' };
  onOpen: (
    item: ThreadHistoryItemDto & { kind: 'commandExecution' },
    title: string,
  ) => void;
  timeMeta?: ReactNode;
}) {
  const summary = summarizeInlinePreviewText(item.previewText ?? item.text);

  return (
    <GraphChatHistoryToolFrame
      actionLabel="Open full command"
      actionTitle="Command Output"
      autoOpen={autoOpen}
      className="thread-graph-event-command"
      icon={<Terminal className="h-4 w-4" />}
      item={item}
      onOpen={() => onOpen(item, 'Command Output')}
      preview={summary}
      timeMeta={timeMeta}
      title="Ran"
      tone="command"
    />
  );
});

export const GraphChatToolCallItem = memo(function GraphChatToolCallItem({
  autoOpen,
  item,
  onOpen,
  timeMeta,
}: {
  autoOpen?: boolean;
  item: ThreadHistoryItemDto & { kind: 'toolCall' };
  onOpen: (
    item: ThreadHistoryItemDto & { kind: 'toolCall' },
    title: string,
  ) => void;
  timeMeta?: ReactNode;
}) {
  const summary = summarizeInlinePreviewText(item.text);

  return (
    <GraphChatHistoryToolFrame
      actionLabel="Open full tool call"
      actionTitle="Tool Call Details"
      autoOpen={autoOpen}
      className="thread-graph-event-tool"
      icon={<Wrench className="h-4 w-4" />}
      item={item}
      onOpen={() => onOpen(item, 'Tool Call Details')}
      preview={summary}
      timeMeta={timeMeta}
      title="Used"
      tone="tool"
    />
  );
});

export const GraphChatAgentToolCallItem = memo(
  function GraphChatAgentToolCallItem({
    autoOpen,
    item,
    onOpen,
    timeMeta,
  }: {
    autoOpen?: boolean;
    item: ThreadHistoryItemDto & { kind: 'agentToolCall' };
    onOpen: (
      item: ThreadHistoryItemDto & { kind: 'agentToolCall' },
      title: string,
    ) => void;
    timeMeta?: ReactNode;
  }) {
    const summary = summarizeInlinePreviewText(item.text);

    return (
      <GraphChatHistoryToolFrame
        actionLabel="Open agent details"
        actionTitle="Agent Details"
        autoOpen={autoOpen}
        className="thread-graph-event-agent-tool"
        icon={<Bot className="h-4 w-4" />}
        item={item}
        onOpen={() => onOpen(item, 'Agent Details')}
        preview={summary}
        timeMeta={timeMeta}
        title="Delegated"
        tone="agent"
      />
    );
  },
);

export const GraphChatSkillToolCallItem = memo(
  function GraphChatSkillToolCallItem({
    autoOpen,
    item,
    onOpen,
    timeMeta,
  }: {
    autoOpen?: boolean;
    item: ThreadHistoryItemDto & { kind: 'skillToolCall' };
    onOpen: (
      item: ThreadHistoryItemDto & { kind: 'skillToolCall' },
      title: string,
    ) => void;
    timeMeta?: ReactNode;
  }) {
    const summary = summarizeInlinePreviewText(item.text);

    return (
      <GraphChatHistoryToolFrame
        actionLabel="Open skill details"
        actionTitle="Skill Details"
        autoOpen={autoOpen}
        className="thread-graph-event-skill-tool"
        icon={<Sparkles className="h-4 w-4" />}
        item={item}
        onOpen={() => onOpen(item, 'Skill Details')}
        preview={summary}
        timeMeta={timeMeta}
        title="Loaded"
        tone="skill"
      />
    );
  },
);

export const GraphChatWebSearchItem = memo(function GraphChatWebSearchItem({
  autoOpen,
  item,
  onOpen,
  timeMeta,
}: {
  autoOpen?: boolean;
  item: ThreadHistoryItemDto & { kind: 'webSearch' };
  onOpen: (title: string, text: string) => void;
  timeMeta?: ReactNode;
}) {
  const previewText = item.previewText?.trim() || item.text || 'Web search';
  const detailText = item.detailText?.trim() || item.text || 'Web search';
  const summary = summarizeInlinePreviewText(previewText);

  return (
    <GraphChatHistoryToolFrame
      actionLabel="Open full web search"
      actionTitle="Web Search Details"
      autoOpen={autoOpen}
      className="thread-graph-event-search"
      icon={<Search className="h-4 w-4" />}
      item={item}
      onOpen={() => onOpen('Web Search Details', detailText)}
      preview={summary}
      timeMeta={timeMeta}
      title="Searched"
      tone="search"
    />
  );
});

export const GraphChatFileReadItem = memo(function GraphChatFileReadItem({
  autoOpen,
  item,
  onOpen,
  timeMeta,
}: {
  autoOpen?: boolean;
  item: ThreadHistoryItemDto & { kind: 'fileRead' };
  onOpen: (title: string, text: string) => void;
  timeMeta?: ReactNode;
}) {
  const previewText = item.previewText?.trim() || item.text || 'File read';
  const detailText = item.detailText?.trim() || item.text || 'File read';
  const summary = summarizeInlinePreviewText(previewText);

  return (
    <GraphChatHistoryToolFrame
      actionLabel="Open full file read"
      actionTitle="File Read Details"
      autoOpen={autoOpen}
      className="thread-graph-event-file-read"
      icon={<FileText className="h-4 w-4" />}
      item={item}
      onOpen={() => onOpen('File Read Details', detailText)}
      preview={summary}
      timeMeta={timeMeta}
      title="Read"
      tone="fileRead"
    />
  );
});

export const GraphChatImageItem = memo(function GraphChatImageItem({
  threadId,
  item,
  onOpen,
  getImageAssetUrl,
  timeMeta,
}: {
  threadId: string | undefined;
  item: ThreadHistoryItemDto & { kind: 'image' };
  onOpen: (title: string, text: string) => void;
  getImageAssetUrl?: GetImageAssetUrl | undefined;
  timeMeta?: ReactNode;
}) {
  const assetPath = item.assetPath ?? item.detailText ?? null;
  const imageUrl =
    threadId && assetPath
      ? (getImageAssetUrl?.({ threadId, path: assetPath }) ?? null)
      : null;

  return (
    <GraphChatHistoryEventFrame
      className="thread-graph-event-image"
      icon={<ImageIconLucide className="h-4 w-4" />}
      item={item}
      timeMeta={timeMeta}
      title="Generated"
      tone="image"
    >
      {imageUrl ? (
        <button
          type="button"
          onClick={() => onOpen('Image Path', assetPath ?? item.text)}
          className="block w-full text-left"
        >
          <img
            src={imageUrl}
            alt={item.text || 'Image preview'}
            className="thread-graph-history-event-image"
            loading="lazy"
          />
        </button>
      ) : (
        <div className="thread-graph-history-event-summary">{item.text}</div>
      )}
      {assetPath ? (
        <button
          type="button"
          onClick={() => onOpen('Image Path', assetPath)}
          className="thread-graph-history-event-path"
          title={assetPath}
        >
          {assetPath}
        </button>
      ) : null}
    </GraphChatHistoryEventFrame>
  );
});

export const GraphChatFileChangeItem = memo(function GraphChatFileChangeItem({
  item,
  onOpen,
  timeMeta,
}: {
  item: ThreadHistoryItemDto & { kind: 'fileChange' };
  onOpen: (title: string, text: string) => void;
  timeMeta?: ReactNode;
}) {
  const pathSummary =
    item.previewText?.trim() && item.text.trim() !== item.previewText.trim()
      ? item.text.trim()
      : null;
  const detailText = item.detailText?.trim() || null;
  const displayedPath = formatTrailingPathLabel(
    pathSummary ?? item.previewText?.trim() ?? item.text,
    48,
  );
  const summarySegments = fileChangeSummarySegments(item);
  const canOpen = Boolean(detailText || item.hasDeferredDetail);
  const summaryContent = (
    <div className="thread-graph-event-line thread-graph-file-change-inline flex min-w-0 items-center gap-2">
      <span
        className="thread-graph-history-detail-text min-w-0 flex-1 overflow-hidden whitespace-nowrap text-clip text-sm"
        title={pathSummary ?? displayedPath}
      >
        {displayedPath}
      </span>
      {summarySegments.length > 0 && (
        <div className="inline-flex shrink-0 items-center justify-end gap-1.5 text-xs">
          {summarySegments.map((segment) => (
            <span
              key={segment}
              className={`thread-graph-history-delta-badge ${
                segment.startsWith('+')
                  ? 'is-add'
                  : segment.startsWith('-')
                    ? 'is-remove'
                    : 'is-neutral'
              }`}
            >
              {segment}
            </span>
          ))}
        </div>
      )}
    </div>
  );
  const inlineSummary = canOpen ? (
    <button
      type="button"
      aria-label="Open file change details"
      onClick={() => onOpen('File Change Details', detailText ?? item.text)}
      className="thread-graph-file-change-inline-button min-w-0 flex-1 text-left"
      title={pathSummary ?? displayedPath}
    >
      {summaryContent}
    </button>
  ) : (
    summaryContent
  );

  return (
    <GraphChatHistoryEventFrame
      className="thread-graph-event-file-change"
      headerMeta={inlineSummary}
      icon={<FilePenLine className="h-4 w-4" />}
      item={item}
      timeMeta={timeMeta}
      title="Changed"
      tone="fileChange"
    />
  );
});

export const GraphChatArtifactHistoryItem = memo(
  function GraphChatArtifactHistoryItem({
    item,
    onSelect,
    timeMeta,
    onOpenWorkspaceFile,
  }: {
    item: ThreadHistoryItemDto & { kind: 'artifact' };
    onSelect?: (
      item: ThreadHistoryItemDto & { kind: 'artifact' },
      artifact: NonNullable<ThreadHistoryItemDto['artifact']>,
    ) => void;
    timeMeta?: ReactNode;
    presentation?: 'activity' | 'output';
    onOpenWorkspaceFile?: ThreadTimelineAdapter['onOpenWorkspaceFile'];
  }) {
    const plugins = usePlugins();
    const artifact = item.artifact;
    const [expanded, setExpanded] = useState(false);
    const rendered = expanded && artifact
      ? plugins.renderArtifact({
          artifact,
          expanded,
          presentation: 'timeline',
          ...(artifact.workspacePath && onOpenWorkspaceFile ? {onOpenFile: () => onOpenWorkspaceFile({path: artifact.workspacePath!})} : {}),
          onToggleExpanded: () => setExpanded((current) => !current),
        })
      : null;

    return (
      <GraphChatHistoryEventFrame
        actions={
          <span className="inline-flex items-center gap-2">
            {artifact && !plugins.hasRendererForArtifact(artifact) ? (
              <span className="thread-graph-history-event-secondary">
                No renderer
              </span>
            ) : null}
            {artifact && onSelect ? (
              <button
                type="button"
                aria-label={`Open artifact inspector for ${artifact.title}`}
                onClick={() => onSelect(item, artifact)}
                className="thread-graph-history-event-action"
              >
                <PackageOpen className="h-3.5 w-3.5" />
                Inspect
              </button>
            ) : null}
          </span>
        }
        className="thread-graph-event-artifact"
        headerMeta={
          <div className="flex min-w-0 flex-1 items-center gap-2">
            {artifact?.workspacePath && onOpenWorkspaceFile ? (
              <WorkspaceFileLink path={artifact.workspacePath} onOpen={onOpenWorkspaceFile}
                className="thread-graph-artifact-file-link min-w-0 truncate text-sm">
                {artifact.workspacePath}
              </WorkspaceFileLink>
            ) : <span className="thread-graph-history-detail-text min-w-0 truncate text-sm">{artifact?.title ?? item.text}</span>}
            <span className="thread-graph-history-event-secondary min-w-0 truncate">{artifact?.summaryText ?? item.previewText ?? artifact?.type ?? ''}</span>
            <button type="button" aria-expanded={expanded}
              aria-label={`${expanded ? 'Collapse' : 'Expand'} artifact ${artifact?.title ?? item.text}`}
              onClick={() => setExpanded(current => !current)}
              className="thread-graph-artifact-inline-toggle inline-flex shrink-0 items-center justify-center p-2">
              {expanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
            </button>
          </div>
        }
        icon={<PackageOpen className="h-4 w-4" />}
        item={item}
        timeMeta={timeMeta}
        title="Created"
        tone="artifact"
      >
        {expanded
          ? rendered ?? (
              <pre className="thread-graph-history-event-pre max-h-80 overflow-auto">
                {JSON.stringify(artifact?.payload ?? item, null, 2)}
              </pre>
            )
          : null}
      </GraphChatHistoryEventFrame>
    );
  },
);

export const GraphChatHookItem = memo(function GraphChatHookItem({
  item,
  timeMeta,
}: {
  item: ThreadHistoryItemDto & { kind: 'hook' };
  timeMeta?: ReactNode;
}) {
  const outputText =
    item.hookOutputEntries
      ?.map((entry) => entry.text.trim())
      .filter(Boolean)
      .join('\n')
      .trim() ?? '';
  const hookLabel = item.hookEventLabel
    ? `${item.hookEventLabel} hook`
    : item.text;
  const fallbackText =
    item.hookStatusMessage?.trim() ||
    (item.previewText && item.previewText !== item.hookStatusMessage
      ? item.previewText.trim()
      : '') ||
    item.text.trim();
  const summaryText =
    outputText ||
    (fallbackText && fallbackText !== hookLabel ? fallbackText : hookLabel);
  const summary = summarizeInlinePreviewText(summaryText);
  const showGap = Boolean(outputText && summary.showGap);

  return (
    <GraphChatHistoryEventFrame
      className="thread-graph-event-hook"
      icon={<Webhook className="h-4 w-4" />}
      item={item}
      timeMeta={timeMeta}
      title="Ran hook"
      tone="hook"
    >
      <div className="thread-graph-history-event-line">
        <p className="thread-graph-history-detail-text min-w-0 flex-1 overflow-hidden whitespace-nowrap text-clip">
          {outputText ? (
            <>
              <span className="thread-graph-history-event-secondary mr-2 font-sans text-[11px] uppercase">
                {hookLabel}
              </span>
              <GraphChatLinkifiedPlainText text={summary.firstLine} />
            </>
          ) : (
            <GraphChatLinkifiedPlainText
              text={
                summary.firstLine && summary.firstLine !== hookLabel
                  ? `${hookLabel} · ${summary.firstLine}`
                  : hookLabel
              }
            />
          )}
        </p>
        {showGap ? (
          <span className="thread-graph-history-detail-meta shrink-0 text-[11px] font-medium tracking-[0.28em]">
            ...
          </span>
        ) : null}
      </div>
    </GraphChatHistoryEventFrame>
  );
});

export const GraphChatCommandGroupItem = memo(
  function GraphChatCommandGroupItem({
    items,
    expanded,
    onToggleExpanded,
    onOpen,
    timeMeta,
  }: {
    items: CommandHistoryItem[];
    expanded: boolean;
    onToggleExpanded: () => void;
    onOpen: (item: CommandHistoryItem, title: string) => void;
    timeMeta?: ReactNode;
  }) {
    const runningCount = items.filter((item) =>
      isRunningHistoryStatus(item.status),
    ).length;
    const countLabel =
      items.length === 1 ? '1 command' : `${items.length} commands`;

    return (
      <GraphChatHistoryGroupFrame
        className="thread-graph-history-group-command"
        count={items.length}
        countBadgeClassName="border-amber-200/35 text-amber-100"
        desktopIconClassName="border-amber-300/30 bg-amber-300/[0.14] text-amber-100"
        expanded={expanded}
        expandedListClassName="border-amber-300/12"
        icon={<CommandBatchIcon />}
        onToggleExpanded={onToggleExpanded}
        runningIndicator={runningCount > 0 ? <RunningDots /> : null}
        summary={
          <>
            <span className="thread-graph-history-group-verb">Ran</span>
            <span className="thread-graph-history-group-description">
              {countLabel}
            </span>
            {runningCount > 0 ? (
              <span className="inline-flex items-center text-xs text-amber-100/90">
                <RunningDots />
              </span>
            ) : null}
          </>
        }
        timeMeta={timeMeta}
        toggleAriaLabel={`${expanded ? 'Collapse' : 'Expand'} ${items.length} command entries`}
      >
        {items.map((item, index) => {
          const summary = summarizeInlinePreviewText(item.text);
          return (
            <button
              key={item.id}
              type="button"
              aria-label={`Open grouped command ${index + 1}`}
              onClick={() => onOpen(item, `Command Output ${index + 1}`)}
              className="thread-graph-history-detail-row block w-full rounded-md border px-3 py-2 text-left transition"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-amber-300/18 bg-amber-300/[0.07] px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-amber-100">
                  Step {index + 1}
                </span>
                {item.status && (
                  <span className="thread-graph-history-detail-meta text-xs">
                    {item.status}
                  </span>
                )}
              </div>
              <div className="mt-1 flex min-w-0 items-center gap-2 text-sm leading-6">
                <p className="thread-graph-history-detail-text min-w-0 flex-1 overflow-hidden whitespace-nowrap text-clip">
                  {summary.firstLine}
                </p>
                {summary.showGap ? (
                  <span className="thread-graph-history-detail-meta shrink-0 text-[11px] font-medium tracking-[0.28em]">
                    ...
                  </span>
                ) : null}
              </div>
            </button>
          );
        })}
      </GraphChatHistoryGroupFrame>
    );
  },
);

export const GraphChatToolCallGroupItem = memo(
  function GraphChatToolCallGroupItem({
    items,
    expanded,
    onToggleExpanded,
    onOpen,
    timeMeta,
  }: {
    items: ToolActivityHistoryItem[];
    expanded: boolean;
    onToggleExpanded: () => void;
    onOpen: (item: ToolActivityHistoryItem, title: string) => void;
    timeMeta?: ReactNode;
  }) {
    const runningCount = items.filter((item) =>
      isRunningHistoryStatus(item.status),
    ).length;
    const firstKind = items[0]?.kind ?? 'toolCall';
    const label =
      firstKind === 'agentToolCall'
        ? 'agent action'
        : firstKind === 'skillToolCall'
          ? 'skill call'
          : 'tool call';
    const countLabel =
      items.length === 1 ? `1 ${label}` : `${items.length} ${label}s`;

    return (
      <GraphChatHistoryGroupFrame
        className="thread-graph-history-group-tool"
        count={items.length}
        countBadgeClassName="border-teal-200/35 text-teal-100"
        desktopIconClassName="border-teal-300/30 bg-teal-300/[0.14] text-teal-100"
        expanded={expanded}
        expandedListClassName="border-teal-300/12"
        icon={
          firstKind === 'agentToolCall' ? (
            <Bot className="h-3.5 w-3.5" />
          ) : (
            <Wrench className="h-3.5 w-3.5" />
          )
        }
        onToggleExpanded={onToggleExpanded}
        runningIndicator={runningCount > 0 ? <RunningDots /> : null}
        summary={
          <>
            <span className="thread-graph-history-group-verb">
              {firstKind === 'agentToolCall'
                ? 'Delegated'
                : firstKind === 'skillToolCall'
                  ? 'Loaded'
                  : 'Used'}
            </span>
            <span className="thread-graph-history-group-description">
              {countLabel}
            </span>
          </>
        }
        timeMeta={timeMeta}
        toggleAriaLabel={`${expanded ? 'Collapse' : 'Expand'} ${countLabel}`}
      >
        {items.map((item, index) => {
          const summary = summarizeInlinePreviewText(item.text);
          return (
            <button
              key={item.id}
              type="button"
              aria-label={`Open ${label} ${index + 1}`}
              onClick={() => onOpen(item, `${label} ${index + 1}`)}
              className="thread-graph-history-detail-row block w-full rounded-md border px-3 py-2 text-left transition"
            >
              <div className="flex min-w-0 items-center gap-2 text-sm leading-6">
                <p className="thread-graph-history-detail-text min-w-0 flex-1 overflow-hidden whitespace-nowrap text-clip">
                  {summary.firstLine}
                </p>
                {item.status ? (
                  <span className="thread-graph-history-detail-meta shrink-0 text-xs">
                    {item.status}
                  </span>
                ) : null}
              </div>
            </button>
          );
        })}
      </GraphChatHistoryGroupFrame>
    );
  },
);

export const GraphChatAgentActivityGroupItem = memo(
  function GraphChatAgentActivityGroupItem({
    itemCount,
    running = false,
    expanded,
    onToggleExpanded,
    timeMeta,
    children,
  }: {
    itemCount: number;
    running?: boolean;
    expanded: boolean;
    onToggleExpanded: () => void;
    timeMeta?: ReactNode;
    children: ReactNode;
  }) {
    const countLabel =
      itemCount === 1 ? '1 operation' : `${itemCount} operations`;
    return (
      <GraphChatHistoryGroupFrame
        className={`thread-graph-history-group-activity ${running ? 'is-running-batch' : ''}`}
        count={itemCount}
        countBadgeClassName="border-slate-200/35 text-slate-100"
        desktopIconClassName="border-slate-300/30 bg-slate-300/[0.14] text-slate-100"
        expanded={expanded}
        expandedListClassName="border-slate-300/12"
        icon={<Bot className="h-3.5 w-3.5" />}
        onToggleExpanded={onToggleExpanded}
        summary={
          <>
            <span className="thread-graph-history-group-verb">
              Worked
            </span>
            <span className="thread-graph-history-group-description">
              {countLabel}
            </span>
          </>
        }
        timeMeta={timeMeta}
        toggleAriaLabel={`${expanded ? 'Collapse' : 'Expand'} ${countLabel}`}
      >
        {children}
      </GraphChatHistoryGroupFrame>
    );
  },
);

export const GraphChatSearchGroupItem = memo(function GraphChatSearchGroupItem({
  items,
  expanded,
  onToggleExpanded,
  onOpen,
  timeMeta,
}: {
  items: SearchHistoryItem[];
  expanded: boolean;
  onToggleExpanded: () => void;
  onOpen: (title: string, text: string) => void;
  timeMeta?: ReactNode;
}) {
  const countLabel =
    items.length === 1 ? '1 search' : `${items.length} searches`;

  return (
    <GraphChatHistoryGroupFrame
      className="thread-graph-history-group-search"
      count={items.length}
      countBadgeClassName="border-sky-200/35 text-sky-100"
      desktopIconClassName="border-sky-300/30 bg-sky-300/[0.14] text-sky-100"
      expanded={expanded}
      expandedListClassName="border-sky-300/12"
      icon={<SearchBatchIcon />}
      onToggleExpanded={onToggleExpanded}
      summary={
        <>
          <span className="thread-graph-history-group-verb">
            Searched
          </span>
          <span className="thread-graph-history-group-description">
            {countLabel}
          </span>
        </>
      }
      timeMeta={timeMeta}
      toggleAriaLabel={`${expanded ? 'Collapse' : 'Expand'} ${items.length} web search entries`}
    >
      {items.map((item, index) => {
        const previewText =
          item.previewText?.trim() || item.text || 'Web search';
        const summary = summarizeInlinePreviewText(previewText);
        const detailText = item.detailText?.trim() || item.text || 'Web search';

        return (
          <button
            key={item.id}
            type="button"
            aria-label={`Open grouped web search ${index + 1}`}
            onClick={() => onOpen(`Web Search ${index + 1}`, detailText)}
            className="thread-graph-history-detail-row block w-full rounded-md border px-3 py-2 text-left transition"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-sky-300/18 bg-sky-300/[0.07] px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-sky-100">
                Search {index + 1}
              </span>
              {item.status && (
                <span className="thread-graph-history-detail-meta text-xs">
                  {item.status}
                </span>
              )}
            </div>
            <div className="mt-1 flex min-w-0 items-center gap-2 text-sm leading-6">
              <p className="thread-graph-history-detail-text min-w-0 flex-1 overflow-hidden whitespace-nowrap text-clip">
                {summary.firstLine}
              </p>
              {summary.showGap ? (
                <span className="thread-graph-history-detail-meta shrink-0 text-[11px] font-medium tracking-[0.28em]">
                  ...
                </span>
              ) : null}
            </div>
          </button>
        );
      })}
    </GraphChatHistoryGroupFrame>
  );
});

export const GraphChatFileReadGroupItem = memo(
  function GraphChatFileReadGroupItem({
    items,
    expanded,
    onToggleExpanded,
    onOpen,
    timeMeta,
  }: {
    items: FileReadHistoryItem[];
    expanded: boolean;
    onToggleExpanded: () => void;
    onOpen: (title: string, text: string) => void;
    timeMeta?: ReactNode;
  }) {
    const countLabel =
      items.length === 1 ? '1 file read' : `${items.length} file reads`;

    return (
      <GraphChatHistoryGroupFrame
        className="thread-graph-history-group-file-read"
        count={items.length}
        countBadgeClassName="border-cyan-200/35 text-cyan-100"
        desktopIconClassName="border-cyan-300/30 bg-cyan-300/[0.14] text-cyan-100"
        expanded={expanded}
        expandedListClassName="border-cyan-300/12"
        icon={<FileReadIcon />}
        onToggleExpanded={onToggleExpanded}
        summary={
          <>
            <span className="thread-graph-history-group-verb">
              Read
            </span>
            <span className="thread-graph-history-group-description">
              {countLabel}
            </span>
          </>
        }
        timeMeta={timeMeta}
        toggleAriaLabel={`${expanded ? 'Collapse' : 'Expand'} ${items.length} file read entries`}
      >
        {items.map((item, index) => {
          const previewText =
            item.previewText?.trim() || item.text || 'File read';
          const summary = summarizeInlinePreviewText(previewText);
          const detailText =
            item.detailText?.trim() || item.text || 'File read';

          return (
            <button
              key={item.id}
              type="button"
              aria-label={`Open grouped file read ${index + 1}`}
              onClick={() => onOpen(`File Read ${index + 1}`, detailText)}
              className="thread-graph-history-detail-row block w-full rounded-md border px-3 py-2 text-left transition"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-cyan-300/18 bg-cyan-300/[0.07] px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-cyan-100">
                  Read {index + 1}
                </span>
                {item.status && (
                  <span className="thread-graph-history-detail-meta text-xs">
                    {item.status}
                  </span>
                )}
              </div>
              <div className="mt-1 flex min-w-0 items-center gap-2 text-sm leading-6">
                <p className="thread-graph-history-detail-text min-w-0 flex-1 overflow-hidden whitespace-nowrap text-clip">
                  {summary.firstLine}
                </p>
                {summary.showGap ? (
                  <span className="thread-graph-history-detail-meta shrink-0 text-[11px] font-medium tracking-[0.28em]">
                    ...
                  </span>
                ) : null}
              </div>
            </button>
          );
        })}
      </GraphChatHistoryGroupFrame>
    );
  },
);

export const GraphChatFileChangeGroupItem = memo(
  function GraphChatFileChangeGroupItem({
    items,
    expanded,
    onToggleExpanded,
    onOpen,
    timeMeta,
  }: {
    items: FileChangeHistoryItem[];
    expanded: boolean;
    onToggleExpanded: () => void;
    onOpen: (title: string, text: string) => void;
    timeMeta?: ReactNode;
  }) {
    const changedFiles = items.reduce(
      (sum, item) => sum + (item.changedFiles ?? 0),
      0,
    );
    const addedLines = items.reduce(
      (sum, item) => sum + (item.addedLines ?? 0),
      0,
    );
    const removedLines = items.reduce(
      (sum, item) => sum + (item.removedLines ?? 0),
      0,
    );
    const batchLabel =
      items.length === 1 ? '1 file change' : `${items.length} file changes`;

    return (
      <GraphChatHistoryGroupFrame
        className="thread-graph-history-group-file-change"
        count={items.length}
        countBadgeClassName="border-lime-200/35 text-lime-100"
        desktopIconClassName="border-lime-300/30 bg-lime-300/[0.14] text-lime-100"
        expanded={expanded}
        expandedListClassName="border-lime-300/12"
        icon={<FileChangeIcon />}
        onToggleExpanded={onToggleExpanded}
        summary={
          <>
            <span className="thread-graph-history-group-verb">
              Changed
            </span>
            <span className="thread-graph-history-group-description">
              {batchLabel}
            </span>
            {changedFiles > 0 ? (
              <span className="thread-graph-history-detail-meta text-xs">
                {changedFiles} files
              </span>
            ) : null}
          </>
        }
        timeMeta={timeMeta}
        toggleAriaLabel={`${expanded ? 'Collapse' : 'Expand'} ${items.length} file change entries`}
        trailingSummary={
          <span className="inline-flex shrink-0 items-center gap-1.5">
            {addedLines > 0 ? (
              <span className="thread-graph-history-delta-badge is-add">
                +{addedLines}
              </span>
            ) : null}
            {removedLines > 0 ? (
              <span className="thread-graph-history-delta-badge is-remove">
                -{removedLines}
              </span>
            ) : null}
          </span>
        }
      >
        {items.map((item, index) => {
          const detailText =
            item.detailText?.trim() || item.previewText?.trim() || item.text;
          const pathSummary =
            item.previewText?.trim() &&
            item.text.trim() !== item.previewText.trim()
              ? item.text.trim()
              : item.previewText?.trim() || item.text;
          return (
            <button
              key={item.id}
              type="button"
              aria-label={`Open grouped file change ${index + 1}`}
              onClick={() => onOpen(`File Change ${index + 1}`, detailText)}
              className="thread-graph-history-detail-row block w-full rounded-md border px-3 py-2 text-left transition"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className="thread-graph-history-detail-text min-w-0 flex-1 text-sm leading-6"
                  title={pathSummary}
                >
                  {formatTrailingPathLabel(pathSummary, 34)}
                </span>
                <span className="inline-flex shrink-0 items-center gap-1.5">
                  {(item.addedLines ?? 0) > 0 ? (
                    <span className="thread-graph-history-delta-badge is-add">
                      +{item.addedLines}
                    </span>
                  ) : null}
                  {(item.removedLines ?? 0) > 0 ? (
                    <span className="thread-graph-history-delta-badge is-remove">
                      -{item.removedLines}
                    </span>
                  ) : null}
                </span>
              </div>
            </button>
          );
        })}
      </GraphChatHistoryGroupFrame>
    );
  },
);

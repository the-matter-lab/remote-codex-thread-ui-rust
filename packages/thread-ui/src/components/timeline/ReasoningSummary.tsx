import { useState, type RefObject } from 'react';
import type { ThreadHistoryItemDto } from '@remote-codex/shared';
import type { ThreadTimelineAdapter } from '../../adapters';
import { GraphChatMarkdownAwareBody } from '../graph-chat/GraphChatMessageBody';

/** A provider summary is a separate disclosure, never part of the final reply. */
export function ReasoningSummary({
  item,
  scrollRootRef,
  adapter,
  onBeforeResize,
}: {
  item: ThreadHistoryItemDto & { kind: 'reasoning' };
  scrollRootRef: RefObject<HTMLDivElement | null>;
  adapter?: ThreadTimelineAdapter | undefined;
  onBeforeResize?: (() => void) | undefined;
}) {
  const [open, setOpen] = useState(false);
  if (!item.text.trim()) return null;

  return (
    <details
      className="thread-graph-message-thinking my-2 min-w-0 rounded-lg border p-3"
      data-reasoning-item-id={item.id}
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary className="cursor-pointer text-sm" onClick={onBeforeResize}>
        Reasoning summary
      </summary>
      {open ? (
        <div className="min-w-0 pt-3">
          <GraphChatMarkdownAwareBody
            text={item.text}
            messageId={item.id}
            scrollRootRef={scrollRootRef}
            onBeforeResize={onBeforeResize}
            onOpenWorkspaceFile={adapter?.onOpenWorkspaceFile}
            workspaceRootPath={adapter?.workspaceRootPath}
            resolveHref={adapter?.resolveHref}
          />
        </div>
      ) : null}
    </details>
  );
}

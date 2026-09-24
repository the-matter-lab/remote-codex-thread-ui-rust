import { useEffect } from 'react';
import { ThemedPortal } from './ThemedPortal';
import { DiffDetail } from './DiffDetail';
import { GraphChatMessageContent } from './graph-chat/GraphChatMessageContent';
import type {ThreadTimelineAdapter} from '../adapters';

interface LongTextDialogProps {
  open: boolean;
  title: string;
  text: string;
  kind?: string | undefined;
  onClose: () => void;
  onOpenWorkspaceFile?: ThreadTimelineAdapter['onOpenWorkspaceFile'];
  workspaceRootPath?: string;
  resolveHref?: ThreadTimelineAdapter['resolveHref'];
}

export function LongTextDialog({
  open,
  title,
  text,
  kind,
  onClose,
  onOpenWorkspaceFile, workspaceRootPath, resolveHref,
}: LongTextDialogProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <ThemedPortal>
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close full text"
        onClick={onClose}
        style={{backgroundColor: "var(--overlay-scrim)", border: 0}}
        className="absolute inset-0 bg-[var(--overlay-scrim)] backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="thread-detail-dialog relative z-[1] flex max-h-[min(82vh,52rem)] w-full max-w-4xl flex-col overflow-hidden rounded-xl border border-[var(--theme-border)] bg-[var(--theme-panel)] text-[var(--theme-fg)] shadow-2xl"
      >
        <div className="flex items-center justify-between gap-3 border-b border-[var(--theme-border)] px-4 py-3 sm:px-5">
          <p className="truncate text-sm font-medium">{title}</p>
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[var(--theme-fg-muted)] transition hover:bg-[var(--theme-hover)]"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              className="h-4 w-4 fill-current"
            >
              <path d="M3.22 2.47 8 7.25l4.78-4.78 1.06 1.06L9.06 8.31l4.78 4.78-1.06 1.06L8 9.37l-4.78 4.78-1.06-1.06 4.78-4.78-4.78-4.78 1.06-1.06Z" />
            </svg>
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-auto px-4 py-4 sm:px-5">
          {kind === 'fileChange' && /^@@ /m.test(text) ? <DiffDetail text={text} /> : ['toolCall', 'agentToolCall', 'skillToolCall'].includes(kind ?? '') ? <GraphChatMessageContent content={text} readOnly onOpenWorkspaceFile={onOpenWorkspaceFile} workspaceRootPath={workspaceRootPath} resolveHref={resolveHref} /> : <pre className="whitespace-pre-wrap break-words text-sm leading-6">
            {text}
          </pre>}
        </div>
      </div>
    </div></ThemedPortal>
  );
}

import { Maximize2, X } from 'lucide-react';
import { useLayoutEffect, useRef, type ReactNode } from 'react';

/** The native top layer moves the existing canvas without a React remount. */
export function GraphMoleculeFigureFrame({
  expanded,
  onExpandedChange,
  onEscape,
  title,
  children,
  presentation,
  className = '',
}: {
  expanded: boolean;
  onExpandedChange: (open: boolean) => void;
  title: string;
  onEscape: () => void;
  presentation: 'timeline' | 'workspace';
  children: ReactNode;
  className?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const placeholder = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  useLayoutEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (expanded && !element.open) {
      const bounds = element.getBoundingClientRect();
      returnFocus.current =
        document.activeElement instanceof HTMLElement &&
        document.activeElement !== document.body
          ? document.activeElement
          : opener.current;
      if (placeholder.current)
        placeholder.current.style.height = `${bounds.height}px`;
      element.showModal();
      element
        .querySelector<HTMLElement>('.thread-graph-molecule-viewer')
        ?.focus({ preventScroll: true });
      const fullBounds = element.getBoundingClientRect();
      if (!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
        const transform = `translate(${bounds.left + bounds.width / 2 - fullBounds.left - fullBounds.width / 2}px, ${bounds.top + bounds.height / 2 - fullBounds.top - fullBounds.height / 2}px) scale(${bounds.width / fullBounds.width || 0.97},${bounds.height / fullBounds.height || 0.97})`;
        element.animate?.(
          [
            { opacity: 0, transform },
            { opacity: 1, transform: 'none' },
          ],
          { duration: 300, easing: 'cubic-bezier(.22,1,.36,1)' },
        );
      }
    } else if (!expanded && element.open) {
      element.close();
      (returnFocus.current?.isConnected
        ? returnFocus.current
        : opener.current
      )?.focus({ preventScroll: true });
      if (!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
        element.animate?.(
          [
            { opacity: 0.4, transform: 'scale(.99)' },
            { opacity: 1, transform: 'none' },
          ],
          { duration: 240, easing: 'cubic-bezier(.4,0,.2,1)' },
        );
    }
  }, [expanded]);
  return (
    <div
      className={`molecule-figure-frame is-${presentation} ${expanded ? 'is-expanded' : ''}`}
    >
      <div
        ref={placeholder}
        className="molecule-figure-placeholder"
        aria-hidden="true"
      />
      <dialog
        ref={dialog}
        className={`molecule-figure ${className}`}
        role={expanded ? 'dialog' : 'region'}
        aria-modal={expanded || undefined}
        aria-label={`${title}${expanded ? ', full view' : ', structure preview'}`}
        onCancel={(event) => {
          event.preventDefault();
          onEscape();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget && expanded) {
            const b = event.currentTarget.getBoundingClientRect();
            if (
              event.clientX < b.left ||
              event.clientX > b.right ||
              event.clientY < b.top ||
              event.clientY > b.bottom
            )
              onExpandedChange(false);
          }
        }}
      >
        <button
          ref={opener}
          type="button"
          className="molecule-expand"
          aria-label={expanded ? 'Close full view' : 'Open full view'}
          title={expanded ? 'Close full view (Esc)' : 'Open full view'}
          onClick={() => onExpandedChange(!expanded)}
        >
          {expanded ? <X size={16} /> : <Maximize2 size={16} />}
        </button>
        {children}
      </dialog>
    </div>
  );
}

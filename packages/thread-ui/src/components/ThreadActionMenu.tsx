import { Children, cloneElement, isValidElement, useLayoutEffect, useRef, useState, type ReactNode, type HTMLAttributes } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { ThemedPortal } from './ThemedPortal';

export function ThreadActionMenu({ label, children }: { label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const close = (restoreFocus = false) => { setOpen(false); if (restoreFocus) trigger.current?.focus(); };
  useLayoutEffect(() => {
    if (!open) return;
    const position = () => {
      if (!trigger.current || !menu.current) return;
      const anchor = trigger.current.getBoundingClientRect();
      const bounds = menu.current.getBoundingClientRect();
      const viewport = window.visualViewport;
      const left = (viewport?.offsetLeft ?? 0) + 8;
      const top = (viewport?.offsetTop ?? 0) + 8;
      const right = left + (viewport?.width ?? window.innerWidth) - 16;
      const bottom = top + (viewport?.height ?? window.innerHeight) - 16;
      menu.current.style.left = `${Math.max(left, Math.min(anchor.right - bounds.width, right - bounds.width))}px`;
      const preferredTop = anchor.bottom + 4 + bounds.height <= bottom ? anchor.bottom + 4 : anchor.top - bounds.height - 4;
      menu.current.style.top = `${Math.max(top, Math.min(preferredTop, bottom - bounds.height))}px`;
    };
    const outside = (event: PointerEvent) => {
      if (!menu.current?.contains(event.target as Node) && !trigger.current?.contains(event.target as Node)) close();
    };
    position();
    menu.current?.querySelector<HTMLButtonElement>('button:not(:disabled)')?.focus();
    document.addEventListener('pointerdown', outside);
    window.addEventListener('resize', position);
    window.addEventListener('scroll', position, true);
    return () => {
      document.removeEventListener('pointerdown', outside);
      window.removeEventListener('resize', position);
      window.removeEventListener('scroll', position, true);
    };
  }, [open]);
  return <div className="matter-thread-menu" onClick={event => event.stopPropagation()}>
    <button ref={trigger} type="button" aria-label={label} title={label} aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen(value => !value)}><MoreHorizontal size={16} /></button>
    {open && <ThemedPortal><div ref={menu} className="thread-action-menu" role="menu" aria-label={label}
      onClick={event => { if ((event.target as HTMLElement).closest('button:not(:disabled)')) close(); }}
      onKeyDown={event => {
        if (event.key === 'Escape') { event.preventDefault(); close(true); }
        if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
          event.preventDefault();
          const items = Array.from(menu.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') ?? []);
          const current = items.indexOf(document.activeElement as HTMLButtonElement);
          const index = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (current + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
          items[index]?.focus();
        }
        if (event.key === 'Tab') close();
      }}>
      {Children.map(children, child => isValidElement<HTMLAttributes<HTMLButtonElement>>(child) && child.type === 'button' ? cloneElement(child, { role: 'menuitem', tabIndex: -1 }) : child)}
    </div></ThemedPortal>}
  </div>;
}

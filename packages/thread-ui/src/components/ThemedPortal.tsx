import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

/** Portals escape clipping while retaining the originating workspace theme. */
export function ThemedPortal({ children }: { children: ReactNode }) {
  const anchor = useRef<HTMLSpanElement>(null);
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const source = anchor.current?.closest<HTMLElement>('.thread-ui-shell, .thread-graph-dialog');
    const target = root.current;
    if (!target) return;
    const update = () => {
      const style = getComputedStyle(source ?? document.documentElement);
      target.dataset.themeEffective = source?.dataset.themeEffective ?? document.documentElement.dataset.themeEffective ?? 'light';
      for (let i = 0; i < style.length; i++) {
        const key = style[i]!;
        if (/^--(?:theme-|thread-|matter-|overlay-)/.test(key)) target.style.setProperty(key, style.getPropertyValue(key));
      }
    };
    update();
    const observer = new MutationObserver(update);
    for (const node of new Set([source, document.documentElement])) {
      if (node) observer.observe(node, { attributes: true, attributeFilter: ['class', 'style', 'data-theme-effective', 'data-theme-mode'] });
    }
    return () => observer.disconnect();
  }, []);
  return <><span ref={anchor} hidden />{createPortal(
    <div ref={root} className="thread-ui-shell thread-ui-portal" style={{ background: 'transparent', isolation: 'auto' }}>{children}</div>,
    document.body,
  )}</>;
}

import { useLayoutEffect, useRef, useState } from 'react';

/** Keep the home/root and nearest directories visible, including on narrow screens. */
export function WorkbenchPath({ path }: { path: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [label, setLabel] = useState(path);
  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    const normalized = path.replace(/\\/g, '/')
      .replace(/^(?:\/home\/[^/]+|\/Users\/[^/]+|[A-Za-z]:\/Users\/[^/]+|\/root)(?=\/|$)/, '~');
    const measure = document.createElement('canvas').getContext('2d');
    const update = () => {
      if (!measure) return;
      measure.font = getComputedStyle(node).font;
      const fits = (text: string) => measure.measureText(text).width <= node.clientWidth;
      if (fits(normalized)) { setLabel(normalized); return; }
      const parts = normalized.split('/');
      const root = `${parts[0]}/`;
      for (let keep = Math.min(3, parts.length - 2); keep >= 1; keep--) {
        const tail = parts.slice(-keep).join('/');
        const withFirst = `${root}${parts[1]}/…/${tail}`;
        if (parts.length > keep + 2 && fits(withFirst)) { setLabel(withFirst); return; }
        const compact = `${root}…/${tail}`;
        if (fits(compact)) { setLabel(compact); return; }
      }
      const name = parts.at(-1) ?? '';
      for (let keep = name.length; keep > 1; keep--) {
        const candidate = `${root}…/${name.slice(0, Math.ceil(keep / 2))}…${name.slice(-Math.floor(keep / 2))}`;
        if (fits(candidate)) { setLabel(candidate); return; }
      }
      setLabel(`${root}…`);
    };
    const observer = new ResizeObserver(update);
    observer.observe(node);
    update();
    void document.fonts.ready.then(update);
    return () => observer.disconnect();
  }, [path]);
  return <span ref={ref} className="matter-workspace-path" title={path} aria-label={path}>{label}</span>;
}

import { useEffect, useMemo, useState } from 'react';
import type { HighlighterCore } from 'shiki/core';
import { getGraphChatHighlighter } from './graph-chat/graphChatShiki';
import { languageForPath } from './graph-workspace/workspaceTree';
import { useAppShellNav } from '../app-shell/AppShellNavContext';

export function DiffDetail({ text }: { text: string }) {
  const [highlighter, setHighlighter] = useState<HighlighterCore | null>(null);
  const theme = useAppShellNav()?.effectiveTheme ?? (document.documentElement.dataset.themeEffective === 'light' ? 'light' : 'dark');
  useEffect(() => {
    let active = true;
    void getGraphChatHighlighter().then(value => { if (active) setHighlighter(value); }).catch(() => {});
    return () => { active = false; };
  }, []);
  const rows = useMemo(() => {
    let oldLine = 0, newLine = 0, path = '', inHunk = false;
    return text.split('\n').map(line => {
      if (line.startsWith('+++ ')) path = line.slice(4).replace(/^b\//, '');
      const hunk = line.match(/^@@ -(\d+)(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
      if (hunk) { oldLine = Number(hunk[1]); newLine = Number(hunk[2]); inHunk = true; }
      else if (/^(?:diff |--- |\+\+\+ )/.test(line)) inHunk = false;
      const kind = !hunk && inHunk ? (line.startsWith('+') ? 'add' : line.startsWith('-') ? 'remove' : line.startsWith(' ') ? 'context' : 'meta') : 'meta';
      const code = kind === 'meta' ? line : line.slice(1);
      const oldNumber = kind === 'remove' || kind === 'context' ? oldLine++ : null;
      const newNumber = kind === 'add' || kind === 'context' ? newLine++ : null;
      const language = languageForPath(path);
      const lang = language && highlighter?.getLoadedLanguages().includes(language) ? language : 'text';
      const tokens = kind !== 'meta' ? highlighter?.codeToTokens(code, { lang, theme: theme === 'light' ? 'ayu-light' : 'ayu-dark' }).tokens[0] : undefined;
      return { line, kind, code, oldNumber, newNumber, tokens };
    });
  }, [text, highlighter, theme]);
  return <pre className="thread-diff" aria-label="File changes" data-highlighted={Boolean(highlighter)}>
    {rows.map((row, index) => <div key={index} className={`thread-diff-line is-${row.kind}`}>
      <span className="thread-diff-number">{row.oldNumber}</span><span className="thread-diff-number">{row.newNumber}</span>
      <span className="thread-diff-sign">{row.kind === 'add' ? '+' : row.kind === 'remove' ? '−' : ' '}</span>
      <code>{row.tokens?.map((token, i) => <span key={i} style={{ color: theme === 'light' && token.color ? `color-mix(in oklch, ${token.color} 65%, var(--theme-fg))` : token.color }}>{token.content}</span>) ?? row.code}</code>
    </div>)}
  </pre>;
}

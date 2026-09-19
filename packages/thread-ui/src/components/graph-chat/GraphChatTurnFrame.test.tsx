import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { GraphChatTurnFrame } from './GraphChatTurnFrame';

describe('turn failures', () => {
  for (const collapsed of [true, false]) it(`keeps the failure outside the hidden header (collapsed=${collapsed})`, () => {
    const html=renderToStaticMarkup(<GraphChatTurnFrame absoluteIndex={1} body={<p>activity</p>} collapsedBody={<p>summary</p>}
      collapsed={collapsed} error="PermissionError: runtime cannot write a log" timeLabel="now" timeTitle="now"/>);
    expect(html).toContain('role="alert"');
    expect(html.indexOf('role="alert"')).toBeGreaterThan(html.indexOf('thread-graph-turn-body'));
    expect(html).toContain('Run needs attention');
    expect(html.match(/PermissionError/g)).toHaveLength(1);
  });
  it('does not show an error for successful turns', () => {
    const html=renderToStaticMarkup(<GraphChatTurnFrame absoluteIndex={1} body={<p>reply</p>} collapsed={false} timeLabel="now" timeTitle="now"/>);
    expect(html).not.toContain('role="alert"');
  });
});

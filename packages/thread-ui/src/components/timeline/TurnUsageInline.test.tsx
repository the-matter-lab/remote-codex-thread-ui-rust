/** @vitest-environment jsdom */
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { describe, expect, it } from 'vitest';
import type { ThreadTurnDto } from '@remote-codex/shared';
import { ThreadTimeline } from '../ThreadTimeline';

const total = {
  totalTokens: 3500,
  inputTokens: 1500,
  outputTokens: 2000,
  cachedInputTokens: 500,
  reasoningOutputTokens: 800,
};
const turn: ThreadTurnDto = {
  id: 'turn-usage',
  startedAt: '2026-09-05T10:00:00.000Z',
  completedAt: '2026-09-05T10:01:12.000Z',
  status: 'completed',
  error: null,
  model: 'gpt-6-astra',
  reasoningEffort: 'high',
  tokenUsage: { total, last: total, modelContextWindow: 1050000 },
  priceEstimate: {
    pricingModelKey: 'gpt-6-astra',
    pricingTierKey: 'standard',
    currency: 'USD',
    inputUsd: 0.01,
    cachedInputUsd: 0.0005,
    outputUsd: 0.1,
    totalUsd: 0.1105,
  },
  items: [
    { id: 'user-1', kind: 'userMessage', text: 'Check the fix.' },
    {
      id: 'command-1',
      kind: 'commandExecution',
      text: 'cargo test',
      status: 'completed',
    },
    { id: 'agent-1', kind: 'agentMessage', text: 'Fixed.' },
  ],
};

describe('turn usage in the visible timeline', () => {
  it.each([true, false])(
    'keeps usage on the Worked row when collapsed=%s',
    (collapsed) => {
      const container = document.createElement('div');
      document.body.append(container);
      const root = createRoot(container);
      try {
        flushSync(() =>
          root.render(
            <ThreadTimeline
              turns={[turn]}
              liveOutput=""
              autoCollapseCompletedTurns={collapsed}
            />,
          ),
        );
        const summary = container.querySelector('.thread-graph-worked-summary');
        expect(summary?.textContent).toContain('Worked for 1m 12s');
        expect(summary?.textContent).toContain('gpt-6-astra · high');
        expect(summary?.textContent).toContain('3.5k tok');
        expect(summary?.textContent).toContain('1.5k in');
        expect(summary?.textContent).toContain('2k out');
        expect(summary?.textContent).toContain('500 cached');
        expect(summary?.textContent).toContain('$0.11');
        expect(summary?.querySelector('button button')).toBeNull();
      } finally {
        flushSync(() => root.unmount());
        container.remove();
      }
    },
  );

  it('shows a completed summary even with no hidden tool activities', () => {
    const container = document.createElement('div');
    const root = createRoot(container);
    try {
      flushSync(() =>
        root.render(
          <ThreadTimeline
            turns={[
              {
                ...turn,
                items: turn.items.filter(
                  (item) => item.kind !== 'commandExecution',
                ),
              },
            ]}
            liveOutput=""
          />,
        ),
      );
      expect(
        container.querySelector('.thread-graph-worked-summary')?.textContent,
      ).toContain('gpt-6-astra · high');
    } finally {
      flushSync(() => root.unmount());
    }
  });
});

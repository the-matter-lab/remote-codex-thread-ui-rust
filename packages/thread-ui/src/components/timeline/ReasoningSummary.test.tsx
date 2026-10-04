/** @vitest-environment jsdom */
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';
import type { ThreadHistoryItemDto, ThreadTurnDto } from '@remote-codex/shared';
import { ThreadTimeline, type ThreadTimelineProps } from '../ThreadTimeline';
import { AppShellNavContext, type AppShellNavContextValue } from '../../app-shell/AppShellNavContext';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const summary: ThreadHistoryItemDto = {
  id: 'reasoning_turn-1', kind: 'reasoning', text: '**Inspecting geometry** before answering.',
};
const turn: ThreadTurnDto = {
  id: 'turn-1', status: 'completed', error: null,
  startedAt: '2026-10-04T16:00:00Z', completedAt: '2026-10-04T16:00:10Z',
  items: [
    { id: 'user-1', kind: 'userMessage', text: 'Inspect the geometry.' },
    summary,
    { id: 'tool-1', kind: 'commandExecution', text: 'inspect geometry', status: 'completed' },
    { id: 'reply-1', kind: 'agentMessage', text: 'Final answer.' },
  ],
};

let root: Root;
let container: HTMLDivElement;
async function render(props: Partial<ThreadTimelineProps> = {}, inherited?: boolean) {
  if (!container) {
    container = document.createElement('div');
    document.body.append(container);
    root = createRoot(container);
  }
  const shell = inherited === undefined ? null : { showReasoningSummaries: inherited } as AppShellNavContextValue;
  await act(async () => root.render(
    <AppShellNavContext.Provider value={shell}>
      <ThreadTimeline turns={[turn]} liveOutput="" autoCollapseCompletedTurns {...props} />
    </AppShellNavContext.Provider>,
  ));
}
async function openSummary() {
  const details = container.querySelector<HTMLDetailsElement>('[data-reasoning-item-id]')!;
  // jsdom does not implement the browser's summary activation behavior.
  await act(async () => {
    details.open = true;
    details.dispatchEvent(new Event('toggle'));
  });
  return details;
}
afterEach(async () => {
  if (root) await act(async () => root.unmount());
  container?.remove();
  container = undefined!;
});

describe('provider reasoning in the timeline (G10)', () => {
  it('is reachable with work collapsed, closed initially, and separate from the final reply', async () => {
    await render();
    const disclosure = container.querySelector<HTMLDetailsElement>('[data-reasoning-item-id]')!;
    expect(disclosure).not.toBeNull();
    expect(disclosure.open).toBe(false);
    expect(disclosure.closest('.thread-execution-timeline')).toBeNull();
    expect(container.textContent).not.toContain('Inspecting geometry');
    expect(container.textContent).toContain('Final answer.');
    expect(container.querySelector('[aria-label="Copy agent reply"]')).not.toBeNull();
    await openSummary();
    expect(disclosure.querySelector('strong')?.textContent).toBe('Inspecting geometry');
    expect(container.querySelector('.thread-graph-message-bubble.is-assistant')?.textContent).toBe('Final answer.');
  });

  it('preserves one open disclosure across cumulative live updates, work toggling, and persistence', async () => {
    const active = { ...turn, status: 'inProgress' as const, completedAt: null, items: turn.items.slice(0, 3) };
    await render({ turns: [active], activeTurnId: turn.id, threadRunning: true });
    const disclosure = await openSummary();
    const updated = { ...summary, text: '**Inspecting geometry** before answering. Checked the bond lengths.' };
    await render({ turns: [active], activeTurnId: turn.id, threadRunning: true,
      liveItems: { turnId: turn.id, items: [updated] }, autoCollapseCompletedTurns: false });
    expect(container.querySelector('[data-reasoning-item-id]')).toBe(disclosure);
    expect(container.querySelectorAll('[data-reasoning-item-id]')).toHaveLength(1);
    expect(disclosure.open).toBe(true);
    expect(disclosure.textContent).toContain('Checked the bond lengths.');
    await render({ turns: [{ ...turn, items: turn.items.map(item => item.id === summary.id ? updated : item) }] });
    expect(container.querySelector('[data-reasoning-item-id]')).toBe(disclosure);
    expect(disclosure.open).toBe(true);
    expect(disclosure.textContent).toContain('Checked the bond lengths.');
    expect(container.querySelector('[data-turn-active]')?.getAttribute('data-turn-active')).toBe('false');
    const workToggle = container.querySelector<HTMLButtonElement>('.thread-graph-worked-summary button')!;
    const wasExpanded = workToggle.getAttribute('aria-expanded');
    await act(async () => workToggle.click());
    expect(workToggle.getAttribute('aria-expanded')).not.toBe(wasExpanded);
    expect(container.querySelector('[data-reasoning-item-id]')).toBe(disclosure);
    expect(disclosure.open).toBe(true);
  });

  it('replays persisted reasoning without a tool or final reply and resets to collapsed on reload', async () => {
    await render({ turns: [{ ...turn, items: [turn.items[0]!, summary] }] });
    await openSummary();
    await act(async () => root.unmount());
    root = createRoot(container);
    await render({ turns: [{ ...turn, items: [turn.items[0]!, summary] }] });
    expect(container.querySelector<HTMLDetailsElement>('[data-reasoning-item-id]')?.open).toBe(false);
    expect(container.textContent).not.toContain('Inspecting geometry');
    const disclosure = await openSummary();
    expect(disclosure.querySelector('strong')?.textContent).toBe('Inspecting geometry');
  });

  it.each(['', '   '])('does not invent a summary for empty provider text %j', async text => {
    await render({ turns: [{ ...turn, items: [{ ...summary, text }, turn.items[3]!] }] });
    expect(container.textContent).not.toContain('Reasoning summary');
    expect(container.textContent).toContain('Final answer.');
  });

  it('has no reasoning disclosure when the provider emits none', async () => {
    await render({ turns: [{ ...turn, items: turn.items.filter(item => item.kind !== 'reasoning') }] });
    expect(container.querySelector('[data-reasoning-item-id]')).toBeNull();
  });

  it('hides reasoning with the explicit prop and honors inherited preference unless overridden', async () => {
    await render({ showReasoningSummaries: false });
    expect(container.querySelector('[data-reasoning-item-id]')).toBeNull();
    expect(container.textContent).toContain('Final answer.');
    await render({}, false);
    expect(container.querySelector('[data-reasoning-item-id]')).toBeNull();
    await render({ showReasoningSummaries: true }, false);
    expect(container.querySelectorAll('[data-reasoning-item-id]')).toHaveLength(1);
  });
});

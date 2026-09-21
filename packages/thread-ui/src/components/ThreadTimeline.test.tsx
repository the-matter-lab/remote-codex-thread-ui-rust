/**
 * @vitest-environment jsdom
 */
import type { ReactNode } from 'react';
import { flushSync } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

import type { ThreadTurnDto } from '@remote-codex/shared';

import { ThreadTimeline } from './ThreadTimeline';
import { createDefaultPluginContextValue, PluginContext } from '../plugins/plugin-context';
vi.mock('../app-shell/AppShellNavContext', () => ({ useAppShellNav: () => ({ showReasoningSummaries: true }) }));
import {
  formatPreciseMessageTimestamp,
  formatShortTimestamp,
} from './threadPresentation';

let root: Root | null = null;
let container: HTMLDivElement | null = null;

function render(node: ReactNode) {
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
  flushSync(() => {
    root?.render(node);
  });
  return container;
}

afterEach(() => {
  if (root) {
    flushSync(() => {
      root?.unmount();
    });
  }
  root = null;
  container?.remove();
  container = null;
  vi.useRealTimers();
});

function completedTurn(items: ThreadTurnDto['items']): ThreadTurnDto {
  return {
    id: 'turn-1',
    startedAt: new Date(Date.UTC(2026, 6, 3, 20, 10, 59)).toISOString(),
    status: 'completed',
    error: null,
    items,
  };
}

describe('ThreadTimeline', () => {
  it.each(['completed', 'inProgress', 'failed'] as const)(
    'keeps rendered artifacts below the reply and mounted while toggling %s work',
    (status) => {
      const plugins = {
        ...createDefaultPluginContextValue(),
        hasRendererForArtifact: () => true,
        renderArtifact: () => <div data-testid="structure-view">Interactive structure</div>,
      };
      const turn = {
        ...completedTurn([
          {id: 'prompt', kind: 'userMessage', text: 'Show the molecule'},
          {id: 'tool', kind: 'commandExecution', text: 'generate_structure', status: 'completed'},
          // Native streams may publish an artifact either before or after the answer.
          {id: 'structure', kind: 'artifact', text: 'water.xyz', artifact: {
            id: 'water', type: 'chem.structure', pluginId: 'xyz', title: 'water.xyz',
            createdAt: '2026-07-03T20:11:00.000Z', payload: {},
          }},
          {id: 'answer', kind: 'agentMessage', text: 'Here is your molecule.'},
        ]),
        status,
      };
      const element = render(
        <PluginContext.Provider value={plugins}>
          <ThreadTimeline autoCollapseCompletedTurns liveOutput="" turns={[turn]} />
        </PluginContext.Provider>,
      );
      expect(element.querySelector('[data-testid="structure-view"]')).toBeNull();
      flushSync(() => element.querySelector<HTMLButtonElement>('[aria-label="Expand artifact water.xyz"]')!.click());
      const viewer = element.querySelector('[data-testid="structure-view"]');
      expect(viewer).not.toBeNull();
      expect(element.textContent!.indexOf('Here is your molecule.')).toBeLessThan(
        element.textContent!.indexOf('Interactive structure'),
      );
      expect(viewer?.closest('.thread-graph-turn-collapsed-summary')).toBeNull();
      const toggle = element.querySelector<HTMLButtonElement>('[aria-label*="turn 1"]')!;
      expect(toggle.getAttribute('aria-expanded')).toBe(status === 'inProgress' ? 'true' : 'false');
      flushSync(() => toggle.click());
      expect(element.querySelector('[data-testid="structure-view"]')).toBe(viewer);
      expect(element.querySelectorAll('[data-testid="structure-view"]')).toHaveLength(1);
      flushSync(() => toggle.click());
      expect(element.querySelector('[data-testid="structure-view"]')).toBe(viewer);
    },
  );

  it('opens the backing workspace path from both artifact filename and plugin without collapsing', () => {
    const onOpenWorkspaceFile = vi.fn();
    const plugins = {
      ...createDefaultPluginContextValue(),
      hasRendererForArtifact: () => true,
      renderArtifact: ({ onOpenFile }: { onOpenFile?: () => void }) =>
        <button data-testid="structure-view" onClick={onOpenFile}>Open structure</button>,
    };
    const element = render(<PluginContext.Provider value={plugins}>
      <ThreadTimeline liveOutput="" adapter={{onOpenWorkspaceFile}} turns={[
        completedTurn([{ id: 'structure', kind: 'artifact', text: 'trajectory.xyz', artifact: {
          id: 'trajectory', type: 'chem.structure', pluginId: 'xyz', title: 'trajectory.xyz',
          workspacePath: 'results/trajectory.xyz', createdAt: '2026-07-03T20:11:00.000Z', payload: {},
        }}]),
      ]} />
    </PluginContext.Provider>);
    expect(element.querySelector('[data-testid="structure-view"]')).toBeNull();
    flushSync(() => element.querySelector<HTMLButtonElement>('[aria-label="Expand artifact trajectory.xyz"]')!.click());
    const viewer = element.querySelector<HTMLButtonElement>('[data-testid="structure-view"]')!;
    flushSync(() => element.querySelector<HTMLAnchorElement>('.thread-graph-artifact-file-link')!.click());
    expect(onOpenWorkspaceFile).toHaveBeenLastCalledWith({path: 'results/trajectory.xyz'});
    expect(element.querySelector('[data-testid="structure-view"]')).toBe(viewer);
    flushSync(() => viewer.click());
    expect(onOpenWorkspaceFile).toHaveBeenCalledTimes(2);
    flushSync(() => element.querySelector<HTMLButtonElement>('[aria-label="Collapse artifact trajectory.xyz"]')!.click());
    expect(element.querySelector('[data-testid="structure-view"]')).toBeNull();
    expect(onOpenWorkspaceFile).toHaveBeenCalledTimes(2);
  });

  it('does not add Created rows when toggling same-name files from different directories', () => {
    const renderArtifact = vi.fn(() => <div data-testid="structure-view">Viewer</div>);
    const plugins = {...createDefaultPluginContextValue(), hasRendererForArtifact: () => true, renderArtifact};
    const element = render(<PluginContext.Provider value={plugins}>
      <ThreadTimeline liveOutput="" adapter={{onOpenWorkspaceFile: vi.fn()}} turns={[
        completedTurn(['stage03_cis.xyz', 'published/stage03_cis.xyz'].map((path, index) => ({
          id: `item-${index}`, kind: 'artifact' as const, text: 'stage03_cis.xyz', artifact: {
            id: `artifact-${index}`, type: 'chem.structure', pluginId: 'xyz', title: 'stage03_cis.xyz',
            workspacePath: path, createdAt: '2026-07-03T20:11:00.000Z', payload: {},
          },
        }))),
      ]} />
    </PluginContext.Provider>);
    expect(renderArtifact).not.toHaveBeenCalled();
    const rows = [...element.querySelectorAll('.thread-graph-event-artifact')];
    expect(rows).toHaveLength(2);
    expect(rows[1]?.textContent).toContain('published/stage03_cis.xyz');
    for (let iteration = 0; iteration < 6; iteration++) {
      flushSync(() => rows[0]!.querySelector<HTMLButtonElement>('.thread-graph-artifact-inline-toggle')!.click());
      expect([...element.querySelectorAll('.thread-graph-event-artifact')]).toEqual(rows);
      expect(element.querySelectorAll('[data-testid="structure-view"]')).toHaveLength(iteration % 2 === 0 ? 1 : 0);
      expect(rows[1]!.querySelector('[data-testid="structure-view"]')).toBeNull();
    }
  });

  it('shows an artifact without a final reply and keeps unknown payloads inspectable', () => {
    const element = render(<ThreadTimeline autoCollapseCompletedTurns liveOutput="" turns={[
      completedTurn([{id: 'unknown', kind: 'artifact', text: 'Result', artifact: {
        id: 'result', type: 'custom.result', pluginId: 'custom', title: 'Result',
        createdAt: '2026-07-03T20:11:00.000Z', payload: {result: 'retained payload'},
      }}]),
    ]} />);
    expect(element.querySelector('[aria-label="Agent artifacts"]')?.textContent).toContain('No renderer');
    expect(element.textContent).not.toContain('retained payload');
    flushSync(() => element.querySelector<HTMLButtonElement>('[aria-label="Expand artifact Result"]')!.click());
    expect(element.textContent).toContain('retained payload');
  });

  it('lazy-loads a complete collapsed turn and keeps Worked below the user message', async () => {
    let resolveTurn!: (turn: ThreadTurnDto) => void;
    const onLoadTurnDetail = vi.fn(
      () =>
        new Promise<ThreadTurnDto>((resolve) => {
          resolveTurn = resolve;
        }),
    );
    const summaryTurn: ThreadTurnDto = {
      ...completedTurn([
        {
          id: 'user-1',
          kind: 'userMessage',
          text: 'Keep the original prompt.',
          createdAt: '2026-07-03T20:10:59.000Z',
        },
        {
          id: 'agent-final',
          kind: 'agentMessage',
          text: 'Final answer.',
          createdAt: '2026-07-03T21:19:00.000Z',
        },
      ]),
      hasDeferredItems: true,
      deferredItemCount: 3,
    };
    const element = render(
      <ThreadTimeline
        autoCollapseCompletedTurns={false}
        liveOutput=""
        onLoadTurnDetail={onLoadTurnDetail}
        turns={[summaryTurn]}
      />,
    );

    expect(element.textContent).toContain('Keep the original prompt.');
    expect(element.textContent).toContain('Final answer.');
    expect(element.textContent).not.toContain('Intermediate checkpoint.');
    const initialText = element.textContent ?? '';
    expect(initialText.indexOf('Keep the original prompt.')).toBeLessThan(
      initialText.indexOf('Worked for'),
    );

    const expandButton = Array.from(element.querySelectorAll('button')).find(
      (button) => button.getAttribute('aria-label')?.includes('Expand turn 1'),
    );
    flushSync(() => expandButton?.click());
    expect(onLoadTurnDetail).toHaveBeenCalledWith('turn-1');
    expect(element.textContent).toContain('Loading complete history...');

    resolveTurn({
      ...summaryTurn,
      hasDeferredItems: false,
      deferredItemCount: 0,
      items: [
        summaryTurn.items[0]!,
        {
          id: 'agent-progress',
          kind: 'agentMessage',
          text: 'Intermediate checkpoint.',
          createdAt: '2026-07-03T20:20:00.000Z',
        },
        {
          id: 'reasoning-1',
          kind: 'reasoning',
          text: 'Reasoning retained after hydration.',
          createdAt: '2026-07-03T20:21:00.000Z',
        },
        {
          id: 'command-1',
          kind: 'commandExecution',
          text: 'pnpm test',
          status: 'completed',
          createdAt: '2026-07-03T20:22:00.000Z',
        },
        summaryTurn.items[1]!,
      ],
    });

    await vi.waitFor(() => {
      expect(element.textContent).toContain('Intermediate checkpoint.');
    });
    const expandedText = element.textContent ?? '';
    expect(expandedText.indexOf('Keep the original prompt.')).toBeLessThan(
      expandedText.indexOf('Worked for'),
    );
    expect(expandedText.indexOf('Worked for')).toBeLessThan(
      expandedText.indexOf('Intermediate checkpoint.'),
    );
    expect(expandedText).toContain('Final answer.');

    const collapseButton = Array.from(element.querySelectorAll('button')).find(
      (button) => button.getAttribute('aria-label')?.includes('Collapse turn 1'),
    );
    flushSync(() => collapseButton?.click());
    const cachedExpandButton = Array.from(element.querySelectorAll('button')).find(
      (button) => button.getAttribute('aria-label')?.includes('Expand turn 1'),
    );
    flushSync(() => cachedExpandButton?.click());
    expect(onLoadTurnDetail).toHaveBeenCalledTimes(1);
    expect(element.textContent).toContain('Intermediate checkpoint.');
  });

  it('defers running operations until expansion and merges later summary messages', async () => {
    const summary: ThreadTurnDto = {
      ...completedTurn([{ id: 'prompt', kind: 'userMessage', text: 'Live prompt' },
        { id: 'answer', kind: 'agentMessage', text: 'First checkpoint' }]),
      status: 'inProgress', hasDeferredItems: true, deferredItemCount: 1,
    };
    const full = {...summary, hasDeferredItems:false, items:[summary.items[0]!,
      {id:'operation',kind:'commandExecution',text:'unique-hidden-command',status:'completed'}, summary.items[1]!]};
    const onLoadTurnDetail = vi.fn().mockResolvedValue(full);
    const props = {onLoadTurnDetail, liveOutput:'', threadRunning:true, activeTurnId:'turn-1'};
    const element = render(<ThreadTimeline {...props} turns={[summary]} />);
    expect(onLoadTurnDetail).not.toHaveBeenCalled();
    expect(element.textContent).toContain('First checkpoint');
    const toggle = () => Array.from(element.querySelectorAll('button')).find(button => /Expand turn 1/.test(button.getAttribute('aria-label') ?? ''))!;
    expect(toggle()).toBeTruthy();
    flushSync(() => toggle().click());
    await vi.waitFor(() => expect(element.querySelector('[aria-label*="Collapse turn 1"]')).not.toBeNull());
    expect(onLoadTurnDetail).toHaveBeenCalledTimes(1);
    flushSync(() => root?.render(<ThreadTimeline {...props} turns={[{...summary, items:[summary.items[0]!, {...summary.items[1]!, text:'Later checkpoint'}]}]} />));
    expect(element.textContent).toContain('Later checkpoint');
    expect(element.textContent).not.toContain('First checkpoint');
    onLoadTurnDetail.mockResolvedValue({...full, status:'completed', items:[...full.items.slice(0,-1), {...summary.items[1]!,text:'Final checkpoint'}]});
    flushSync(() => root?.render(<ThreadTimeline {...props} threadRunning={false} activeTurnId={null} turns={[{...summary,status:'completed',items:[summary.items[0]!, {...summary.items[1]!,text:'Final checkpoint'}]}]} />));
    await vi.waitFor(() => expect(onLoadTurnDetail).toHaveBeenCalledTimes(2));
    expect(element.textContent).toContain('Final checkpoint');
  });

  it('shows Worked when reasoning is the collapsed middle agent bubble', () => {
    const element = render(
      <ThreadTimeline
        autoCollapseCompletedTurns={true}
        liveOutput=""
        turns={[
          completedTurn([
            {
              id: 'user-1',
              kind: 'userMessage',
              text: 'reply me a 3',
              createdAt: new Date(
                Date.UTC(2026, 6, 3, 20, 10, 59),
              ).toISOString(),
            },
            {
              id: 'reasoning-1',
              kind: 'reasoning',
              text: 'The user asked for the exact number 3.',
              createdAt: new Date(
                Date.UTC(2026, 6, 3, 20, 10, 59),
              ).toISOString(),
            },
            {
              id: 'agent-1',
              kind: 'agentMessage',
              text: '3',
              createdAt: new Date(
                Date.UTC(2026, 6, 3, 20, 10, 59),
              ).toISOString(),
            },
          ]),
        ]}
      />,
    );

    expect(element.textContent).toContain('reply me a 3');
    expect(element.textContent).toContain('3');
    expect(element.textContent).toContain('Worked');
    expect(element.textContent).not.toContain(
      'The user asked for the exact number 3.',
    );
    expect(
      Array.from(element.querySelectorAll('button')).some((button) =>
        button.getAttribute('aria-label')?.includes('Expand turn 1'),
      ),
    ).toBe(true);
  });

  it('shows Worked when an actual middle message bubble is collapsed', () => {
    const element = render(
      <ThreadTimeline
        autoCollapseCompletedTurns={true}
        liveOutput=""
        turns={[
          completedTurn([
            {
              id: 'user-1',
              kind: 'userMessage',
              text: 'Keep prompt visible.',
              createdAt: new Date(
                Date.UTC(2026, 6, 3, 20, 10, 0),
              ).toISOString(),
            },
            {
              id: 'agent-intermediate-1',
              kind: 'agentMessage',
              text: 'Intermediate note should collapse.',
              createdAt: new Date(
                Date.UTC(2026, 6, 3, 20, 10, 20),
              ).toISOString(),
            },
            {
              id: 'agent-1',
              kind: 'agentMessage',
              text: 'Final reply stays visible.',
              createdAt: new Date(
                Date.UTC(2026, 6, 3, 20, 11, 21),
              ).toISOString(),
            },
          ]),
        ]}
      />,
    );

    expect(element.textContent).toContain('Keep prompt visible.');
    expect(element.textContent).toContain('Final reply stays visible.');
    expect(element.textContent).toContain('Worked');
    expect(element.textContent).not.toContain(
      'Intermediate note should collapse.',
    );
  });

  it('keeps the Worked control available after expanding so the turn can collapse again', () => {
    const element = render(
      <ThreadTimeline
        autoCollapseCompletedTurns={true}
        liveOutput=""
        turns={[
          completedTurn([
            {
              id: 'user-1',
              kind: 'userMessage',
              text: 'Keep prompt visible.',
              createdAt: new Date(
                Date.UTC(2026, 6, 3, 20, 10, 0),
              ).toISOString(),
            },
            {
              id: 'agent-intermediate-1',
              kind: 'agentMessage',
              text: 'Intermediate note can be toggled.',
              createdAt: new Date(
                Date.UTC(2026, 6, 3, 20, 10, 20),
              ).toISOString(),
            },
            {
              id: 'agent-1',
              kind: 'agentMessage',
              text: 'Final reply stays visible.',
              createdAt: new Date(
                Date.UTC(2026, 6, 3, 20, 11, 21),
              ).toISOString(),
            },
          ]),
        ]}
      />,
    );

    const expandWorkedButton = Array.from(
      element.querySelectorAll('button'),
    ).find((button) =>
      button.getAttribute('aria-label')?.includes('Expand turn 1'),
    );
    expect(expandWorkedButton).toBeTruthy();
    flushSync(() => {
      expandWorkedButton?.click();
    });

    expect(element.textContent).toContain('Intermediate note can be toggled.');
    const collapseWorkedButton = Array.from(
      element.querySelectorAll('button'),
    ).find(
      (button) =>
        button.getAttribute('aria-label')?.includes('Collapse turn 1') &&
        button.textContent?.includes('Worked'),
    );
    expect(collapseWorkedButton?.textContent).toContain('Worked');

    flushSync(() => {
      collapseWorkedButton?.click();
    });

    expect(element.textContent).toContain('Worked');
    expect(element.textContent).not.toContain(
      'Intermediate note can be toggled.',
    );
  });

  it('shows relative tool time and a permanent precise agent timestamp', () => {
    const startedAt = new Date(Date.UTC(2026, 6, 3, 20, 10, 0)).toISOString();
    const agentAt = new Date(Date.UTC(2026, 6, 3, 20, 11, 21)).toISOString();
    const element = render(
      <ThreadTimeline
        autoCollapseCompletedTurns={false}
        liveOutput=""
        turns={[
          {
            ...completedTurn([
              {
                id: 'user-1',
                kind: 'userMessage',
                text: 'Inspect.',
                createdAt: startedAt,
              },
              {
                id: 'command-1',
                kind: 'commandExecution',
                text: 'pwd',
                createdAt: new Date(
                  Date.UTC(2026, 6, 3, 20, 10, 5),
                ).toISOString(),
                status: 'completed',
              },
              {
                id: 'agent-1',
                kind: 'agentMessage',
                text: 'Done.',
                createdAt: agentAt,
              },
            ]),
            startedAt,
          },
        ]}
      />,
    );

    expect(element.textContent).toContain('5s');
    expect(element.textContent).toContain(
      formatPreciseMessageTimestamp(agentAt),
    );

    const agentTime = Array.from(
      element.querySelectorAll('.thread-graph-message-time-row'),
    ).find(
      (node) => node.textContent === formatPreciseMessageTimestamp(agentAt),
    );
    expect(agentTime).toBeTruthy();

  });

  it('shows the latest activity time and a second-precision running duration', () => {
    vi.useFakeTimers();
    const startedAt = new Date(Date.UTC(2026, 6, 3, 20, 10, 0)).toISOString();
    const activityAt = new Date(Date.UTC(2026, 6, 3, 20, 10, 7)).toISOString();
    vi.setSystemTime(new Date(Date.UTC(2026, 6, 3, 20, 10, 10)));

    const element = render(
      <ThreadTimeline
        autoCollapseCompletedTurns={false}
        activeTurnId="turn-1"
        threadRunning
        liveOutput=""
        liveItems={{
          turnId: 'turn-1',
          updatedAt: activityAt,
          items: [
            {
              id: 'command-1',
              kind: 'commandExecution',
              text: 'pnpm test',
              status: 'running',
              createdAt: new Date(
                Date.UTC(2026, 6, 3, 20, 10, 5),
              ).toISOString(),
            },
          ],
        }}
        turns={[
          {
            id: 'turn-1',
            startedAt,
            status: 'inProgress',
            error: null,
            items: [],
          },
        ]}
      />,
    );

    expect(element.textContent).toContain(formatShortTimestamp(activityAt));
    expect(element.textContent).toContain('10s');

    flushSync(() => {
      vi.advanceTimersByTime(1_000);
    });
    expect(element.textContent).toContain('11s');
  });

  it('uses the completion time and labels an interrupted turn', () => {
    const startedAt = new Date(Date.UTC(2026, 6, 3, 20, 10, 0)).toISOString();
    const completedAt = new Date(
      Date.UTC(2026, 6, 3, 20, 22, 30),
    ).toISOString();
    const element = render(
      <ThreadTimeline
        autoCollapseCompletedTurns
        liveOutput=""
        turns={[
          {
            id: 'turn-1',
            startedAt,
            completedAt,
            status: 'interrupted',
            error: null,
            items: [
              {
                id: 'user-1',
                kind: 'userMessage',
                text: 'Run the long task.',
                createdAt: startedAt,
              },
            ],
          },
        ]}
      />,
    );

    expect(element.textContent).toContain('Worked for 12m 30s');
    expect(element.textContent).toContain('Interrupted');
  });

  it('renders a command batch without redundant activity or batch labels', () => {
    const element = render(
      <ThreadTimeline
        autoCollapseCompletedTurns={false}
        liveOutput=""
        turns={[
          completedTurn([
            ...['pwd', 'pnpm test', 'git status'].map((text, index) => ({
              id: `command-${index + 1}`,
              kind: 'commandExecution' as const,
              text,
              createdAt: new Date(
                Date.UTC(2026, 6, 3, 20, 10, index + 1),
              ).toISOString(),
              status: 'completed',
            })),
            {
              id: 'agent-1',
              kind: 'agentMessage',
              text: 'All commands completed.',
              createdAt: new Date(
                Date.UTC(2026, 6, 3, 20, 10, 5),
              ).toISOString(),
            },
          ]),
        ]}
      />,
    );

    expect(element.textContent).toContain('3 commands');
    expect(element.textContent).not.toContain('Agent activity');
    expect(element.textContent).not.toContain('Batch');
    expect(element.textContent).toContain('All commands completed.');
  });

  it('folds imported reasoning summaries into activity and omits empty assistant rows', () => {
    const element = render(
      <ThreadTimeline
        autoCollapseCompletedTurns={false}
        liveOutput=""
        turns={[
          completedTurn([
            {
              id: 'agent-before',
              kind: 'agentMessage',
              text: 'The first finding is ready.',
            },
            {
              id: 'reasoning-1',
              kind: 'reasoning',
              text: '**Planning concurrent browser inspection**',
            },
            {
              id: 'reasoning-empty',
              kind: 'reasoning',
              text: '  ',
            },
            {
              id: 'command-1',
              kind: 'commandExecution',
              text: 'pnpm test',
              status: 'completed',
            },
            {
              id: 'reasoning-2',
              kind: 'reasoning',
              text: '**Checking item timestamps, statuses, and duplicates**',
            },
            {
              id: 'agent-after',
              kind: 'agentMessage',
              text: 'The imported session now reads cleanly.',
            },
          ]),
        ]}
      />,
    );

    expect(element.textContent).toContain('The first finding is ready.');
    expect(element.textContent).toContain('Worked');
    expect(element.textContent).toContain('3 operations');
    expect(element.textContent).toContain(
      'The imported session now reads cleanly.',
    );
    expect(element.textContent).not.toContain(
      'Planning concurrent browser inspection',
    );
    expect(
      Array.from(element.querySelectorAll('[data-role="assistant"]')),
    ).toHaveLength(2);

    const expandButton = Array.from(element.querySelectorAll('button')).find(
      (button) => button.getAttribute('aria-label') === 'Expand 3 operations',
    );
    expect(expandButton).toBeTruthy();
    flushSync(() => {
      expandButton?.click();
    });
    expect(element.textContent).toContain(
      'Planning concurrent browser inspection',
    );
    expect(element.textContent).toContain(
      'Checking item timestamps, statuses, and duplicates',
    );
  });

  it('preserves activity and command expansion choices as live entries arrive', () => {
    const activeTurn: ThreadTurnDto = {
      ...completedTurn([]),
      status: 'inProgress',
    };
    const initialItems: ThreadTurnDto['items'] = [
      { id: 'reason-1', kind: 'reasoning', text: 'Inspecting the first issue.' },
      { id: 'command-1', kind: 'commandExecution', text: 'pwd', status: 'completed' },
      { id: 'command-2', kind: 'commandExecution', text: 'git status', status: 'running' },
    ];
    const timeline = (items: ThreadTurnDto['items']) => (
      <ThreadTimeline
        autoCollapseCompletedTurns={false}
        activeTurnId={activeTurn.id}
        threadRunning
        liveOutput=""
        liveItems={{ turnId: activeTurn.id, items, updatedAt: activeTurn.startedAt }}
        turns={[activeTurn]}
      />
    );
    const element = render(timeline(initialItems));
    const activityToggle = () => element.querySelector<HTMLButtonElement>(
      '.thread-graph-history-group-activity button[aria-expanded]',
    );
    const commandToggle = () => element.querySelector<HTMLButtonElement>(
      '.thread-graph-history-group-command button[aria-expanded]',
    );

    flushSync(() => activityToggle()?.click());
    flushSync(() => commandToggle()?.click());
    expect(activityToggle()?.getAttribute('aria-expanded')).toBe('true');
    expect(commandToggle()?.getAttribute('aria-expanded')).toBe('true');

    const nextItems: ThreadTurnDto['items'] = [
      ...initialItems,
      { id: 'command-3', kind: 'commandExecution', text: 'pnpm test', status: 'running' },
      { id: 'reason-2', kind: 'reasoning', text: 'Reviewing the new result.' },
    ];
    flushSync(() => root?.render(timeline(nextItems)));
    expect(activityToggle()?.getAttribute('aria-expanded')).toBe('true');
    expect(commandToggle()?.getAttribute('aria-expanded')).toBe('true');
    expect(element.textContent).toContain('Inspecting the first issue.');
    expect(element.textContent).toContain('Reviewing the new result.');
    expect(element.querySelector('[aria-label="Open grouped command 3"]')?.textContent)
      .toContain('pnpm test');

    flushSync(() => activityToggle()?.click());
    flushSync(() => root?.render(timeline([
      ...nextItems,
      { id: 'reason-3', kind: 'reasoning', text: 'Preparing the next step.' },
    ])));
    expect(activityToggle()?.getAttribute('aria-expanded')).toBe('false');
    expect(element.textContent).not.toContain('Preparing the next step.');
    flushSync(() => activityToggle()?.click());
    expect(element.textContent).toContain('Preparing the next step.');
    expect(commandToggle()?.getAttribute('aria-expanded')).toBe('true');
  });

  it('shows file paths directly without opening a summary or details pane', () => {
    const startedAt = new Date(Date.UTC(2026, 6, 3, 20, 10, 0)).toISOString();
    const fileReadAt = new Date(Date.UTC(2026, 6, 3, 20, 10, 5)).toISOString();
    const laterAgentAt = new Date(
      Date.UTC(2026, 6, 3, 20, 10, 8),
    ).toISOString();
    const activeTurn: ThreadTurnDto = {
      ...completedTurn([
        {
          id: 'user-1',
          kind: 'userMessage',
          text: 'Inspect the source.',
          createdAt: startedAt,
        },
        {
          id: 'file-read-1',
          kind: 'fileRead',
          text: 'Read file: src/agent-runtime.ts',
          previewText: 'Read file: src/agent-runtime.ts',
          createdAt: fileReadAt,
          status: 'running',
        },
      ]),
      startedAt,
      status: 'inProgress',
    };
    const element = render(
      <ThreadTimeline
        autoCollapseCompletedTurns={false}
        liveOutput=""
        turns={[activeTurn]}
      />,
    );

    expect(element.textContent).toContain('Read');
    expect(element.textContent).toContain('Read file: src/agent-runtime.ts');
    expect(
      Array.from(element.querySelectorAll('button'))
        .find((button) =>
          button.getAttribute('aria-label') === 'Show full file path',
        )
        ?.getAttribute('aria-expanded'),
    ).toBe('false');

    flushSync(() => {
      root?.render(
        <ThreadTimeline
          autoCollapseCompletedTurns={false}
          liveOutput=""
          turns={[
            {
              ...activeTurn,
              items: [
                ...activeTurn.items.map((item) =>
                  item.id === 'file-read-1'
                    ? { ...item, status: 'completed' }
                    : item,
                ),
                {
                  id: 'agent-1',
                  kind: 'agentMessage',
                  text: 'I found the next step.',
                  createdAt: laterAgentAt,
                },
              ],
            },
          ]}
        />,
      );
    });

    expect(element.textContent).toContain('Read');
    expect(
      Array.from(element.querySelectorAll('button'))
        .find((button) =>
          button.getAttribute('aria-label') === 'Show full file path',
        )
        ?.getAttribute('aria-expanded'),
    ).toBe('false');
    expect(element.textContent).toContain('I found the next step.');
  });

  it('advances across turns on repeated clicks while smooth scrolling is pending', () => {
    const turns = [1, 2, 3].map((index) => ({
      ...completedTurn([
        {
          id: `user-${index}`,
          kind: 'userMessage' as const,
          text: `Prompt ${index}`,
        },
      ]),
      id: `turn-${index}`,
    }));
    const element = render(
      <ThreadTimeline
        liveOutput=""
        turns={turns}
        nextTurnScrollRequestKey={0}
      />,
    );
    const scrollContainer = element.querySelector<HTMLElement>(
      '[data-testid="thread-scroll-container"]',
    )!;
    Object.defineProperty(scrollContainer, 'scrollTop', {
      configurable: true,
      value: 0,
    });
    scrollContainer.getBoundingClientRect = () =>
      ({ top: 0, bottom: 300, height: 300 }) as DOMRect;
    const turnElements = Array.from(
      element.querySelectorAll<HTMLElement>('[data-timeline-turn]'),
    );
    turnElements.forEach((turn, index) => {
      turn.getBoundingClientRect = () =>
        ({
          top: index * 200,
          bottom: index * 200 + 100,
          height: 100,
        }) as DOMRect;
    });
    const scrollTo = vi.fn();
    scrollContainer.scrollTo = scrollTo;

    flushSync(() => {
      root?.render(
        <ThreadTimeline
          liveOutput=""
          turns={turns}
          nextTurnScrollRequestKey={1}
        />,
      );
    });
    flushSync(() => {
      root?.render(
        <ThreadTimeline
          liveOutput=""
          turns={turns}
          nextTurnScrollRequestKey={2}
        />,
      );
    });

    expect(scrollTo).toHaveBeenNthCalledWith(1, {
      top: 192,
      behavior: 'smooth',
    });
    expect(scrollTo).toHaveBeenNthCalledWith(2, {
      top: 392,
      behavior: 'smooth',
    });
  });

  it('moves backward across turns on repeated clicks while smooth scrolling is pending', () => {
    const turns = [1, 2, 3].map((index) => ({
      ...completedTurn([
        {
          id: `user-${index}`,
          kind: 'userMessage' as const,
          text: `Prompt ${index}`,
        },
      ]),
      id: `turn-${index}`,
    }));
    const element = render(
      <ThreadTimeline
        liveOutput=""
        turns={turns}
        previousTurnScrollRequestKey={0}
      />,
    );
    const scrollContainer = element.querySelector<HTMLElement>(
      '[data-testid="thread-scroll-container"]',
    )!;
    Object.defineProperty(scrollContainer, 'scrollTop', {
      configurable: true,
      value: 600,
    });
    scrollContainer.getBoundingClientRect = () =>
      ({ top: 0, bottom: 300, height: 300 }) as DOMRect;
    const turnElements = Array.from(
      element.querySelectorAll<HTMLElement>('[data-timeline-turn]'),
    );
    turnElements.forEach((turn, index) => {
      turn.getBoundingClientRect = () =>
        ({
          top: -400 + index * 200,
          bottom: -300 + index * 200,
          height: 100,
        }) as DOMRect;
    });
    const scrollTo = vi.fn();
    scrollContainer.scrollTo = scrollTo;

    flushSync(() => {
      root?.render(
        <ThreadTimeline
          liveOutput=""
          turns={turns}
          previousTurnScrollRequestKey={1}
        />,
      );
    });
    flushSync(() => {
      root?.render(
        <ThreadTimeline
          liveOutput=""
          turns={turns}
          previousTurnScrollRequestKey={2}
        />,
      );
    });

    expect(scrollTo).toHaveBeenNthCalledWith(1, {
      top: 392,
      behavior: 'smooth',
    });
    expect(scrollTo).toHaveBeenNthCalledWith(2, {
      top: 192,
      behavior: 'smooth',
    });
  });
});

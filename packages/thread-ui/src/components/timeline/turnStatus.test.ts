import { describe, expect, it } from 'vitest';

import {
  deriveDisplayedLivePlan,
  normalizePlanStepStatus,
} from './turnStatus';
import type { ThreadHistoryItemDto } from '@remote-codex/shared';

const basePlan = {
  turnId: 'turn-1',
  explanation: null,
  plan: [
    { step: 'Inspect', status: 'in_progress' },
    { step: 'Patch', status: 'pending' },
    { step: 'Verify', status: 'pending' },
  ],
};

describe('turn status helpers', () => {
  it('normalizes common plan step statuses', () => {
    expect(normalizePlanStepStatus('done')).toBe('completed');
    expect(normalizePlanStepStatus('in progress')).toBe('in_progress');
    expect(normalizePlanStepStatus('queued')).toBe('pending');
    expect(normalizePlanStepStatus('error')).toBe('failed');
    expect(normalizePlanStepStatus('custom')).toBe('other');
  });

  it('retains explicit plan statuses when unrelated execution evidence appears', () => {
    const result = deriveDisplayedLivePlan(
      basePlan,
      [
        {
          id: 'change-1',
          kind: 'fileChange',
          text: 'changed file',
        } as ThreadHistoryItemDto,
      ],
      'inProgress',
    );

    expect(result?.plan.map((step) => step.status)).toEqual([
      'in_progress',
      'pending',
      'pending',
    ]);
  });

  it('does not advance inactive plans or running tool calls', () => {
    expect(
      deriveDisplayedLivePlan(
        basePlan,
        [
          {
            id: 'tool-1',
            kind: 'toolCall',
            text: 'running',
            status: 'running',
          } as ThreadHistoryItemDto,
        ],
        'inProgress',
      ),
    ).toBe(basePlan);
    expect(
      deriveDisplayedLivePlan(
        basePlan,
        [
          {
            id: 'change-1',
            kind: 'fileChange',
            text: 'changed file',
          } as ThreadHistoryItemDto,
        ],
        'completed',
      ),
    ).toBe(basePlan);
  });
});

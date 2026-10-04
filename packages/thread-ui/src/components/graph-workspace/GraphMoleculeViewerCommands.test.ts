import { describe, expect, it, vi } from 'vitest';
import {
  EXTENSION_FIXTURES,
  type ExtensionDiscovery,
  type ViewerRequest,
} from '@remote-codex/shared';
import {
  createViewerCommandExecutor,
  validateViewerCommands,
} from './GraphMoleculeViewerCommands';

const target = {
  artifactId: 'a',
  objectId: 'o',
  sourceRevision: 'r',
  checksum: 'a'.repeat(64),
  streamId: 's',
  frameId: 'f',
  frameIndex: 0,
};
const request: ViewerRequest = {
  version: 1,
  requestId: 'request',
  operationId: 'operation',
  actionId: 'elagente.viewer.style',
  target,
  payload: { style: 'stick' },
};
const discovery = EXTENSION_FIXTURES.grafico.discovery as ExtensionDiscovery;
function setup() {
  const state = {
    target,
    discovery,
    atomIds: ['O', 'H'],
    styles: ['ball-stick', 'stick'] as ('ball-stick' | 'stick')[],
    ready: true,
  };
  const apply = vi.fn();
  return {
    state,
    apply,
    execute: createViewerCommandExecutor(() => state, apply),
  };
}
describe('targeted declarative viewer commands', () => {
  it('applies advertised commands once and returns the same matching acknowledgement on replay', async () => {
    const { execute, apply } = setup();
    const acknowledgement = await execute(request);
    expect(acknowledgement).toMatchObject({
      target,
      status: 'applied',
      requestId: 'request',
      operationId: 'operation',
      result: {},
    });
    expect(await execute(request)).toEqual(acknowledgement);
    expect(apply).toHaveBeenCalledExactlyOnceWith([
      { type: 'style', style: 'stick' },
    ]);
    expect(
      (await execute({ ...request, payload: { style: 'ball-stick' } })).error
        ?.code,
    ).toBe('OPERATION_CONFLICT');
  });
  it.each([
    'artifactId',
    'objectId',
    'sourceRevision',
    'checksum',
    'streamId',
    'frameId',
    'frameIndex',
  ] as const)(
    'rejects stale %s before mutation, including replay',
    async (key) => {
      const { state, execute, apply } = setup();
      await execute(request);
      state.target = { ...target, [key]: key === 'frameIndex' ? 1 : 'changed' };
      expect((await execute(request)).error?.code).toBe('STALE_TARGET');
      expect(apply).toHaveBeenCalledTimes(1);
    },
  );
  it('rejects unadvertised, native, invalid and unavailable actions', async () => {
    const { state, execute, apply } = setup();
    expect(
      (await execute({ ...request, actionId: 'agent.missing' })).status,
    ).toBe('rejected');
    expect(
      (
        await execute({
          ...request,
          actionId: 'elagente.viewer.select',
          payload: { selectedIds: ['O'] },
        })
      ).error?.code,
    ).toBe('UNSUPPORTED_CAPABILITY');
    expect(
      (await execute({ ...request, payload: { style: 'javascript' } })).status,
    ).toBe('rejected');
    state.ready = false;
    expect((await execute(request)).error?.code).toBe('VIEWER_UNAVAILABLE');
    expect(apply).not.toHaveBeenCalled();
  });
  it('deduplicates in-flight rendering and only acknowledges completion after rendering finishes', async () => {
    let finish: () => void = () => {};
    const { state } = setup();
    const apply = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          finish = resolve;
        }),
    );
    const execute = createViewerCommandExecutor(() => state, apply);
    const original = execute(request),
      duplicate = execute(request);
    await Promise.resolve();
    expect(apply).toHaveBeenCalledTimes(1);
    expect(
      (await execute({ ...request, requestId: 'other', operationId: 'other' }))
        .error?.code,
    ).toBe('VIEWER_BUSY');
    finish();
    expect((await original).status).toBe('applied');
    expect(await duplicate).toEqual(await original);
  });
  it('does not acknowledge stale asynchronous rendering and never replays failed effects', async () => {
    let finish: () => void = () => {};
    const { state } = setup();
    const apply = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          finish = resolve;
        }),
    );
    const execute = createViewerCommandExecutor(() => state, apply);
    const result = execute(request);
    await Promise.resolve();
    state.target = { ...target, sourceRevision: 'changed' };
    finish();
    expect((await result).error?.code).toBe('STALE_TARGET');
    const failedApply = vi.fn(() => {
      throw new Error('GPU failed');
    });
    const failed = createViewerCommandExecutor(
      () => ({ ...state, target }),
      failedApply,
    );
    expect((await failed(request)).error?.code).toBe('VIEWER_RENDER_FAILED');
    expect((await failed(request)).error?.code).toBe('VIEWER_RENDER_FAILED');
    expect(failedApply).toHaveBeenCalledTimes(1);
  });
  it('bounds commands and validates all atom, annotation and camera fields', () => {
    const valid = [
      { type: 'selection', selectedIds: ['O'] },
      {
        type: 'annotations',
        annotations: [{ id: 'a', atomId: 'O', text: 'oxygen' }],
      },
      { type: 'camera', view: [0, 0, 0, 1, 0, 0, 0, 1] },
      { type: 'unit-cell', visible: true },
    ];
    expect(validateViewerCommands(valid, ['O'], ['stick'])).toEqual(valid);
    for (const invalid of [
      Array(129).fill(valid[0]),
      [{ type: 'selection', selectedIds: ['unknown'] }],
      [{ type: 'camera', view: [0, 0, 0, NaN, 0, 0, 0, 1] }],
      [
        {
          type: 'annotations',
          annotations: [{ id: 'a', atomId: 'O', text: 'x'.repeat(1025) }],
        },
      ],
      [{ type: 'selection', selectedIds: ['O'], source: 'fetch()' }],
    ])
      expect(() => validateViewerCommands(invalid, ['O'], ['stick'])).toThrow();
  });
});

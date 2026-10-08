/** @vitest-environment jsdom */
import { expect, it, vi } from 'vitest';
import { createMoleculeRenderViewer } from './GraphMoleculeViewerLifetime';
import type { ThreeDmolApi } from './load3Dmol';

it('releases constructor global listeners, observers, animation and WebGL context on actual unmount', () => {
  const host = document.createElement('div'),
    canvas = document.createElement('canvas');
  host.append(canvas);
  const resize = vi.fn(),
    mouseup = vi.fn(),
    disconnect = vi.fn(),
    clear = vi.fn(),
    stopAnimate = vi.fn(),
    loseContext = vi.fn();
  const getContext = vi
    .spyOn(canvas, 'getContext')
    .mockReturnValue({ getExtension: () => ({ loseContext }) } as never);
  const windowAdd = window.addEventListener,
    bodyAdd = document.body.addEventListener;
  const managed = createMoleculeRenderViewer(
    {
      createViewer: () => {
        window.addEventListener('resize', resize);
        document.body.addEventListener('mouseup', mouseup);
        return {
          divwatcher: { disconnect },
          intwatcher: { disconnect },
          clear,
          stopAnimate,
          spin: vi.fn(),
        } as never;
      },
    } as ThreeDmolApi,
    host,
  );
  expect(window.addEventListener).toBe(windowAdd);
  expect(document.body.addEventListener).toBe(bodyAdd);
  window.dispatchEvent(new Event('resize'));
  expect(resize).toHaveBeenCalledOnce();
  managed.release();
  window.dispatchEvent(new Event('resize'));
  document.body.dispatchEvent(new Event('mouseup'));
  expect(resize).toHaveBeenCalledOnce();
  expect(mouseup).not.toHaveBeenCalled();
  expect(disconnect).toHaveBeenCalledTimes(2);
  expect(clear).toHaveBeenCalledOnce();
  expect(stopAnimate).toHaveBeenCalledOnce();
  expect(loseContext).toHaveBeenCalledOnce();
  expect(host.querySelector('canvas')).toBeNull();
  getContext.mockRestore();
});

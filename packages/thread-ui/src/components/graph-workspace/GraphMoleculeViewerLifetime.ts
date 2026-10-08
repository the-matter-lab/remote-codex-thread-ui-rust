import type { ThreeDmolApi } from './load3Dmol';
import type { RenderViewer } from './GraphMoleculeViewerRenderTypes';

/** 3Dmol 2.x exposes clear(), but no destructor for its bound global listeners.
 * Record only registrations made by its synchronous constructor, then restore
 * the native methods before returning. A figure expansion never calls release.
 */
export function createMoleculeRenderViewer(
  api: ThreeDmolApi,
  host: HTMLElement,
) {
  const registrations: {
    target: EventTarget;
    type: string;
    listener: EventListenerOrEventListenerObject;
    options?: boolean | AddEventListenerOptions;
  }[] = [];
  const restores = ([window, document.body] as EventTarget[]).map((target) => {
    const original = target.addEventListener;
    target.addEventListener = function (type, listener, options) {
      if (listener)
        registrations.push({ target: this, type, listener, options });
      original.call(this, type, listener, options);
    };
    return () => {
      target.addEventListener = original;
    };
  });
  const releaseListeners = () =>
    registrations.forEach(({ target, type, listener, options }) =>
      target.removeEventListener(type, listener, options),
    );
  let viewer: RenderViewer;
  try {
    viewer = api.createViewer(host, {}) as RenderViewer;
  } catch (error) {
    releaseListeners();
    throw error;
  } finally {
    restores.forEach((restore) => restore());
  }
  return {
    viewer,
    release() {
      releaseListeners();
      viewer.spin?.(false);
      viewer.stopAnimate?.();
      const observed = viewer as RenderViewer & {
        divwatcher?: ResizeObserver;
        intwatcher?: IntersectionObserver;
      };
      observed.divwatcher?.disconnect();
      observed.intwatcher?.disconnect();
      viewer.clear?.();
      host.querySelectorAll('canvas').forEach((canvas) => {
        // Intentional context loss must not run 3Dmol's context recovery path.
        canvas.addEventListener(
          'webglcontextlost',
          (event) => event.stopImmediatePropagation(),
          { capture: true, once: true },
        );
        const context =
          canvas.getContext('webgl2') || canvas.getContext('webgl');
        context?.getExtension?.('WEBGL_lose_context')?.loseContext();
        canvas.remove();
      });
    },
  };
}

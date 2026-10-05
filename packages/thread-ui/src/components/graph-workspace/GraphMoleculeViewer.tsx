import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  ChevronLeft,
  ChevronRight,
  PanelRightOpen,
} from 'lucide-react';
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type {
  ArtifactMetadata,
  ScientificTarget,
  ViewerRequest,
  ViewerAcknowledgement,
} from '@remote-codex/shared';
import type { ExtensionHostAdapter } from '../../plugins/plugin-types';
import {
  createViewerCommandExecutor,
  sameScientificTarget,
  type ViewerCommand,
  type ViewerStyle,
  type ViewerAnnotation,
} from './GraphMoleculeViewerCommands';
import GraphMoleculeViewerLowerButtonGroup from './GraphMoleculeViewerLowerButtonGroup';
import GraphMoleculeViewerUpperButtonGroup from './GraphMoleculeViewerUpperButtonGroup';
import type { GraphMoleculeCameraInfo } from './GraphMoleculeViewerControls';
import type {
  RenderModel,
  RenderViewer,
} from './GraphMoleculeViewerRenderTypes';
import { load3Dmol, type GLViewer } from './load3Dmol';
import { Button } from '../graph-ui/Button';
import {
  readGraphMoleculeViewerData,
  applyStructureMetadata,
  readExtXyzCell,
  frameTarget,
  structureRenderFrame,
  type GraphMoleculeViewerSource,
} from './GraphMoleculeViewerData';

type HoveredAtom = {
  x: number;
  y: number;
  label: string;
  coords: {
    x: string;
    y: string;
    z: string;
  };
};

type ThreeDmolAtom = {
  atom?: string;
  elem?: string;
  index?: number;
  serial?: number;
  x: number;
  y: number;
  z: number;
};

export type GraphMoleculeScreenshot = {
  version: 1;
  moleculeId: string | null;
  image: string;
  mediaType: 'image/png';
  width: number;
  height: number;
  target?: ScientificTarget;
  trajectoryIndex: number;
  camera: number[];
  selectedIds: string[];
};
export type GraphMoleculeAtomSelection = {
  moleculeId: string | null;
  atoms: number[];
  selectedIds: string[];
  target?: ScientificTarget;
};
export type GraphMoleculeSelectionSubmission = {
  selections: GraphMoleculeAtomSelection[];
};
export type GraphMoleculeViewerHandle = {
  captureScreenshot: () => string;
  /** A detached snapshot of this mounted viewer's live personal state. */
  captureView: () => GraphMoleculeScreenshot;
  isAvailable: () => boolean;
  trajectoryIndex: number;
  target?: ScientificTarget;
  execute: (request: ViewerRequest) => Promise<ViewerAcknowledgement>;
};
export type GraphMoleculeViewerProps = {
  className?: string;
  presentation?: 'timeline' | 'workspace';
  onOpenFile?: () => void;
  moleculeId?: string | null;
  onScreenshot?: (screenshot: GraphMoleculeScreenshot) => void | Promise<void>;
  onSelectionChange?: (selection: GraphMoleculeAtomSelection) => void;
  onSelectionSubmit?: (
    selection: GraphMoleculeSelectionSubmission,
  ) => void | Promise<void>;
  onReady?: (view: GraphMoleculeViewerHandle) => void;
  /** Personal inspection signal; never a durable input or shared camera event. */
  onActive?: (view: GraphMoleculeViewerHandle) => void;
  source: GraphMoleculeViewerSource;
  title?: string | null;
  extensionHost?: ExtensionHostAdapter;
  /** Build-time reviewed UI slots. Runtime data never selects executable code. */
  toolbar?: (context: {
    target?: ScientificTarget;
    selectedIds: string[];
  }) => ReactNode;
  rendererSlot?: (context: {
    target?: ScientificTarget;
    selectedIds: string[];
  }) => ReactNode;
  onDownloadSource?: () => void;
  loading?: boolean;
};

export function GraphMoleculeViewer({
  className = '',
  moleculeId = null,
  onScreenshot,
  onSelectionChange,
  onSelectionSubmit,
  onReady,
  onActive,
  source,
  title = 'Molecular structure',
  presentation = 'workspace',
  onOpenFile,
  extensionHost,
  toolbar,
  rendererSlot,
  onDownloadSource,
  loading = false,
}: GraphMoleculeViewerProps) {
  const viewerHostRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<RenderViewer | null>(null);
  const modelRef = useRef<RenderModel | null>(null);
  const [viewerReady, setViewerReady] = useState(false);
  const loadingRef = useRef(loading);
  loadingRef.current = loading;
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;
  const readyHandleRef = useRef<GraphMoleculeViewerHandle | null>(null);
  const captureRef = useRef<() => GraphMoleculeScreenshot>(() => {
    throw new Error('Screenshot is unavailable');
  });
  const zoomedRef = useRef(false);
  const viewportScaleRef = useRef(1);
  const unitCellPreferenceRef = useRef(true);

  const [cameraInfo, setCameraInfo] = useState<GraphMoleculeCameraInfo | null>(
    null,
  );
  const [requestedIndex, setCurrentIndex] = useState(0);
  const [hoveredAtom, setHoveredAtom] = useState<HoveredAtom | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAtomLabels, setSelectedAtomLabels] = useState<
    Record<number, string>
  >({});
  const [selectedSerials, setSelectedSerials] = useState<number[]>([]);
  const selectedSerialsRef = useRef(selectedSerials);
  selectedSerialsRef.current = selectedSerials;
  const selectionStyleRef = useRef<{ color: string; radius?: number }>({
    color: 'yellow',
  });
  const [stagedSelections, setStagedSelections] = useState<
    Record<string, GraphMoleculeAtomSelection>
  >({});
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);
  const [live, setLive] = useState(true);
  const [style, setStyle] = useState<ViewerStyle>(
    (typeof source === 'object' && source?.metadata?.render?.style) ||
      'ball-stick',
  );
  const [cartoonAvailable, setCartoonAvailable] = useState(false);
  const applyingCommandRef = useRef(false);
  const [annotations, setAnnotations] = useState<ViewerAnnotation[]>([]);
  const atomIdsRef = useRef<string[]>([]);
  const cellRef = useRef<ArtifactMetadata['cell']>(undefined);
  const renderedTargetRef = useRef<ScientificTarget | undefined>(undefined);
  const [unitCellAvailable, setUnitCellAvailable] = useState(false);
  const [unitCellVisible, setUnitCellVisible] = useState(false);
  const [viewerInitError, setViewerInitError] = useState<string | null>(null);

  const viewerData = useMemo(
    () => readGraphMoleculeViewerData(source),
    [source],
  );
  const xyzArray = viewerData.frames;
  const xyzFormat = viewerData.format;
  // LIVE's displayed frame belongs to this verified revision immediately.
  // Synchronizing the personal index in an effect must not first draw the
  // preceding frame with the new revision's controls/identity.
  const currentIndex = live
    ? Math.max(0, xyzArray.length - 1)
    : Math.min(requestedIndex, Math.max(0, xyzArray.length - 1));
  const xyzContent = xyzArray[currentIndex] ?? null;
  const snapshot = typeof source === 'object' && source ? source : undefined;
  const target = frameTarget(snapshot, currentIndex, xyzArray.length);
  const currentFrameRef = useRef('');
  currentFrameRef.current = `${currentIndex}:${xyzFormat}:${xyzContent}`;
  const renderedFrameRef = useRef('');
  const renderedModelKeyRef = useRef<string | null>(null);
  const surfaceActiveRef = useRef(false);
  const labelsActiveRef = useRef(false);
  const backgroundRef = useRef<string | null>(null);
  const styledRef = useRef('');
  const cellDrawRef = useRef('');
  const renderedReadyRef = useRef(false);
  const targetKey = JSON.stringify(target);
  const targetRef = useRef(target);
  targetRef.current = target;
  const activeObject =
    snapshot?.target?.objectId ?? snapshot?.uuid ?? moleculeId;
  const modelDataKey = useMemo(
    () =>
      JSON.stringify([
        activeObject,
        xyzFormat,
        xyzContent,
        snapshot?.metadata?.atoms,
        snapshot?.metadata?.bonds,
        snapshot?.metadata?.cell,
        snapshot?.metadata?.render,
      ]),
    [
      activeObject,
      xyzFormat,
      xyzContent,
      snapshot?.metadata?.atoms,
      snapshot?.metadata?.bonds,
      snapshot?.metadata?.cell,
      snapshot?.metadata?.render,
    ],
  );
  const objectRef = useRef(activeObject);
  const selectedIds = selectedSerials
    .map((index) => atomIdsRef.current[index]!)
    .filter(Boolean);
  const supportedStyles: ViewerStyle[] = [
    'ball-stick',
    'stick',
    'spacefill',
    'surface',
    ...(cartoonAvailable ? ['cartoon' as const] : []),
  ];
  const selection = (): GraphMoleculeAtomSelection => ({
    moleculeId,
    atoms: [...selectedSerials],
    selectedIds: selectedSerials
      .map((index) => atomIdsRef.current[index]!)
      .filter(Boolean),
    ...(target ? { target } : {}),
  });
  const cellShapesRef = useRef<ReturnType<RenderViewer['addLine']>[]>([]);
  function drawCell(visible: boolean) {
    const viewer = viewerRef.current,
      model = modelRef.current;
    if (!viewer || !model) return;
    const key = JSON.stringify([visible, cellRef.current]);
    if (cellDrawRef.current === key) return;
    cellDrawRef.current = key;
    cellShapesRef.current.forEach((shape) => viewer.removeShape(shape));
    cellShapesRef.current = [];
    try {
      viewer.removeUnitCell(model);
    } catch {
      /* No cell yet. */
    }
    const cell = cellRef.current;
    if (visible && cell) {
      const factor = cell.unit === 'bohr' ? 0.529177210903 : 1;
      const point = (bits: number) => ({
        x: cell.vectors.reduce(
          (v, row, i) => v + ((bits >> i) & 1) * row[0] * factor,
          0,
        ),
        y: cell.vectors.reduce(
          (v, row, i) => v + ((bits >> i) & 1) * row[1] * factor,
          0,
        ),
        z: cell.vectors.reduce(
          (v, row, i) => v + ((bits >> i) & 1) * row[2] * factor,
          0,
        ),
      });
      for (let bits = 0; bits < 8; bits++)
        for (let axis = 0; axis < 3; axis++)
          if (!(bits & (1 << axis)))
            cellShapesRef.current.push(
              viewer.addLine({
                start: point(bits),
                end: point(bits | (1 << axis)),
                color: 'black',
              }),
            );
    } else if (visible) viewer.addUnitCell(model, {});
  }
  function applyStyle(next: ViewerStyle, indices = selectedSerials) {
    const viewer = viewerRef.current,
      model = modelRef.current;
    if (!viewer || !model) return;
    const key = JSON.stringify([next, indices, selectionStyleRef.current]);
    if (styledRef.current === key) return;
    styledRef.current = key;
    // 3Dmol clears draw immediately, even for empty collections.
    if (surfaceActiveRef.current) {
      viewer.removeAllSurfaces();
      surfaceActiveRef.current = false;
    }
    model.setStyle(
      {},
      next === 'spacefill'
        ? { sphere: { scale: 1 } }
        : next === 'stick'
          ? { stick: { radius: 0.2 } }
          : next === 'cartoon'
            ? { cartoon: { color: 'spectrum' } }
            : next === 'surface'
              ? {}
              : { stick: { radius: 0.2 }, sphere: { scale: 0.3 } },
    );
    const surface =
      next === 'surface'
        ? viewer.addSurface('VDW', { opacity: 0.8 }, {})
        : undefined;
    surfaceActiveRef.current = next === 'surface';
    if (indices.length)
      model.setStyle(
        { index: indices },
        {
          stick: { radius: 0.3, color: selectionStyleRef.current.color },
          sphere: {
            ...(selectionStyleRef.current.radius
              ? { radius: selectionStyleRef.current.radius }
              : { scale: 0.4 }),
            color: selectionStyleRef.current.color,
          },
        },
      );
    return surface;
  }
  function drawAnnotations(next: ViewerAnnotation[]) {
    const viewer = viewerRef.current,
      model = modelRef.current;
    if (!viewer || !model) return;
    if (labelsActiveRef.current) viewer.removeAllLabels();
    labelsActiveRef.current = next.length > 0;
    const atoms = model.selectedAtoms({});
    next.forEach((annotation) => {
      const atom = atoms[atomIdsRef.current.indexOf(annotation.atomId)];
      if (atom)
        viewer.addLabel(
          annotation.text,
          {
            position: atom,
            backgroundColor: 'white',
            fontColor: annotation.color ?? 'black',
            fontSize: 12,
          },
          undefined,
          // Batch label additions into the caller's final render.
          true,
        );
    });
  }
  const commandState = useRef({
    target,
    discovery: extensionHost?.discovery,
    atomIds: atomIdsRef.current,
    styles: supportedStyles,
    cellAvailable: unitCellAvailable,
    ready: false,
  });
  commandState.current = {
    target,
    discovery: extensionHost?.discovery,
    atomIds: atomIdsRef.current,
    styles: supportedStyles,
    cellAvailable: unitCellAvailable,
    ready:
      !loading &&
      !viewerInitError &&
      Boolean(
        viewerRef.current &&
        modelRef.current &&
        renderedReadyRef.current &&
        currentFrameRef.current === renderedFrameRef.current &&
        sameScientificTarget(renderedTargetRef.current, target),
      ),
  };
  const applyCommandsRef = useRef<
    (commands: ViewerCommand[]) => void | Promise<void>
  >(() => {});
  applyCommandsRef.current = async (commands) => {
    applyingCommandRef.current = true;
    try {
      let nextStyle = style,
        nextSelection = selectedSerialsRef.current;
      commands.forEach((command) => {
        switch (command.type) {
          case 'selection':
            selectionStyleRef.current = {
              color: command.color ?? 'yellow',
              ...(command.radius === undefined
                ? {}
                : { radius: command.radius }),
            };
            nextSelection = command.selectedIds.map((id) =>
              atomIdsRef.current.indexOf(id),
            );
            selectedSerialsRef.current = nextSelection;
            setSelectedSerials(nextSelection);
            break;
          case 'style':
            nextStyle = command.style;
            setStyle(nextStyle);
            break;
          case 'camera':
            viewerRef.current!.setView(command.view);
            break;
          case 'annotations':
            setAnnotations(command.annotations);
            drawAnnotations(command.annotations);
            break;
          case 'unit-cell':
            unitCellPreferenceRef.current = command.visible;
            setUnitCellVisible(command.visible);
            drawCell(command.visible);
            break;
        }
      });
      const viewer = viewerRef.current!;
      await applyStyle(nextStyle, nextSelection);
      viewer.render();
    } finally {
      applyingCommandRef.current = false;
    }
  };
  const executorRef = useRef<ReturnType<
    typeof createViewerCommandExecutor
  > | null>(null);
  executorRef.current ??= createViewerCommandExecutor(
    () => commandState.current,
    (commands) => applyCommandsRef.current(commands),
  );
  const runOperation = async (
    operation: () => void | Promise<void>,
    message: string,
  ) => {
    if (busyRef.current || loadingRef.current) return;
    busyRef.current = true;
    setBusy(true);
    setStatus(null);
    try {
      await operation();
      setStatus(message);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : String(error));
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  };
  useEffect(() => {
    if (objectRef.current !== activeObject) {
      objectRef.current = activeObject;
      zoomedRef.current = false;
      setCurrentIndex(0);
      setLive(true);
      setAnnotations([]);
      setSelectedSerials([]);
      setStyle(snapshot?.metadata?.render?.style ?? 'ball-stick');
    }
  }, [activeObject]);
  const stagedAtoms = Object.values(stagedSelections).reduce(
    (sum, entry) => sum + entry.atoms.length,
    0,
  );
  const stagedMolecules = Object.keys(stagedSelections).length;

  useEffect(() => {
    if (xyzArray.length === 0) {
      setCurrentIndex(0);
      return;
    }
    setCurrentIndex((previous) =>
      live ? xyzArray.length - 1 : Math.min(previous, xyzArray.length - 1),
    );
  }, [xyzArray.length, live]);

  useEffect(() => {
    if (!isPlaying || xyzArray.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setCurrentIndex((previous) => {
        if (previous >= xyzArray.length - 1) {
          window.clearInterval(interval);
          setIsPlaying(false);
          return previous;
        }
        return previous + 1;
      });
    }, 200);

    return () => window.clearInterval(interval);
  }, [isPlaying, xyzArray.length]);

  useEffect(() => {
    const host = viewerHostRef.current;
    if (!host || viewerRef.current) {
      return;
    }

    let cancelled = false;

    try {
      const canvas = document.createElement('canvas');
      const webGl =
        canvas.getContext('webgl2') ||
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl');
      if (!webGl) {
        setViewerInitError(
          'WebGL is unavailable in this browser environment. Unable to render 3D viewer.',
        );
        return;
      }
    } catch {
      setViewerInitError(
        'WebGL is unavailable in this browser environment. Unable to render 3D viewer.',
      );
      return;
    }

    const resizeViewer = () => {
      if (cancelled || !host.clientWidth || !host.clientHeight) return;
      const scale = Math.min(1, host.clientWidth / host.clientHeight);
      // 3Dmol owns canvas sizing and draws on resize. Only adjust horizontal
      // framing here when the container's aspect ratio actually changes.
      if (zoomedRef.current && scale !== viewportScaleRef.current) {
        viewerRef.current?.zoom(scale / viewportScaleRef.current);
      }
      viewportScaleRef.current = scale;
    };
    const resizeObserver = new ResizeObserver(resizeViewer);
    resizeObserver.observe(host);

    load3Dmol()
      .then(($3Dmol) => {
        if (cancelled || viewerRef.current) {
          return;
        }

        try {
          const viewer = $3Dmol.createViewer(host, {}) as RenderViewer;
          viewerRef.current = viewer;
          setViewerReady(true);
          window.setTimeout(resizeViewer, 100);
        } catch (error) {
          console.error('Failed to initialize 3Dmol viewer:', error);
          setViewerInitError(
            'Failed to initialize 3D viewer. Please refresh or try another browser.',
          );
        }
      })
      .catch((error: unknown) => {
        console.error('Failed to load 3Dmol viewer runtime:', error);
        setViewerInitError(
          'Failed to load 3D viewer runtime. Please refresh or try another browser.',
        );
      });

    return () => {
      cancelled = true;
      resizeObserver.disconnect();
      viewerRef.current = null;
      modelRef.current = null;
      renderedReadyRef.current = false;
      commandState.current.ready = false;
      readyHandleRef.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !xyzContent) {
      return;
    }

    try {
      renderedReadyRef.current = false;
      commandState.current.ready = false;
      // Publication identity and verification state may change while a pinned
      // historical frame/render metadata stays identical. Rebind its exact
      // handle below without rebuilding or drawing the unchanged model.
      if (renderedModelKeyRef.current !== modelDataKey) {
        viewer.removeAllModels();
        viewer.removeAllShapes();
        styledRef.current = '';
        cellDrawRef.current = '';
        if (labelsActiveRef.current) {
          viewer.removeAllLabels();
          labelsActiveRef.current = false;
        }

        setViewerInitError(null);
        const renderFrame = structureRenderFrame(xyzContent, xyzFormat);
        const model = viewer.addModel(renderFrame.content, renderFrame.format, {
          keepH: true,
          doAssembly: false,
          assignBonds:
            snapshot?.metadata?.render?.bonding !== 'none' &&
            snapshot?.metadata?.render?.bonding !== 'provided',
        });
        setCartoonAvailable(
          model
            .selectedAtoms({})
            .some((atom) => atom.atom === 'CA' || atom.atom === 'P'),
        );
        const oldIds = atomIdsRef.current;
        atomIdsRef.current = applyStructureMetadata(model, snapshot?.metadata);
        const previous = selectedSerialsRef.current;
        const remapped = previous
          .map((index) => atomIdsRef.current.indexOf(oldIds[index]!))
          .filter((index) => index >= 0);
        selectedSerialsRef.current = remapped;
        setSelectedSerials(
          previous.length === remapped.length &&
            previous.every((value, index) => value === remapped[index])
            ? previous
            : remapped,
        );
        const background = snapshot?.metadata?.render?.background ?? '#f8fafc';
        if (backgroundRef.current !== background) {
          viewer.setBackgroundColor(background, 0.8);
          backgroundRef.current = background;
        }
        cellRef.current =
          snapshot?.metadata?.cell ??
          (xyzFormat === 'extxyz' || xyzFormat === 'xyz'
            ? readExtXyzCell(xyzContent)
            : undefined);
        renderedTargetRef.current = target;
        commandState.current.atomIds = atomIdsRef.current;

        cellShapesRef.current = [];
        modelRef.current = model;
        applyStyle(style, remapped);

        const crystalData = model.getCrystData();
        const hasUnitCell = Boolean(
          cellRef.current ||
          (crystalData &&
            typeof crystalData === 'object' &&
            Object.keys(crystalData).length),
        );
        commandState.current.cellAvailable = hasUnitCell;
        setUnitCellAvailable(hasUnitCell);
        setUnitCellVisible(hasUnitCell ? unitCellPreferenceRef.current : false);
        setSelectedAtomLabels(
          Object.fromEntries(
            model
              .selectedAtoms({})
              .map((atom, index) => [index, atom.elem ?? 'Atom']),
          ),
        );

        const frameAtomLabels = xyzContent
          .split('\n')
          .slice(2)
          .map((line) => line.trim())
          .filter(Boolean)
          .map((line) => line.split(/\s+/)[0] ?? 'Atom');

        if (!zoomedRef.current) {
          viewer.zoomTo();
          const host = viewerHostRef.current;
          const scale = host?.clientHeight
            ? Math.min(1, host.clientWidth / host.clientHeight)
            : 1;
          // 3Dmol fits vertically; a tall, narrow Explorer also needs a
          // horizontal fit. Keep this framing across trajectory frames.
          viewer.zoom((hasUnitCell ? 0.5 : 0.85) * scale);
          viewportScaleRef.current = scale;
          zoomedRef.current = true;
        }

        model.setClickable(
          {},
          true,
          (atom: ThreeDmolAtom, _viewer: GLViewer, event?: MouseEvent) => {
            const serial = atom.index;
            if (serial === undefined) {
              return;
            }
            selectionStyleRef.current = { color: 'yellow' };
            const label =
              atom.atom || atom.elem || frameAtomLabels[serial] || 'Atom';

            setSelectedSerials((previous) => {
              const isMulti = Boolean(
                event?.shiftKey || event?.metaKey || event?.ctrlKey,
              );
              const next = !isMulti
                ? previous.length === 1 && previous[0] === serial
                  ? []
                  : [serial]
                : previous.includes(serial)
                  ? previous.filter((entry) => entry !== serial)
                  : [...previous, serial];

              setSelectedAtomLabels((current) => {
                if (next.length === 0) {
                  return {};
                }
                const labelsBySerial: Record<number, string> = {};
                next.forEach((entry) => {
                  labelsBySerial[entry] =
                    current[entry] || frameAtomLabels[entry] || label;
                });
                return labelsBySerial;
              });
              return next;
            });
          },
        );

        model.setHoverable(
          {},
          true,
          (atom: ThreeDmolAtom, _viewer: GLViewer, event?: MouseEvent) => {
            if (!event || !atom) {
              return;
            }
            setHoveredAtom({
              x: event.clientX,
              y: event.clientY,
              label: `${atom.atom || atom.elem || 'Atom'} (${
                atom.index ?? atom.serial ?? '?'
              })`,
              coords: {
                x: atom.x.toFixed(2),
                y: atom.y.toFixed(2),
                z: atom.z.toFixed(2),
              },
            });
          },
          () => setHoveredAtom(null),
        );

        drawCell(hasUnitCell && unitCellPreferenceRef.current);
        drawAnnotations(annotations);
        viewer.render();
        renderedModelKeyRef.current = modelDataKey;
      }
      renderedTargetRef.current = target;
      renderedReadyRef.current = true;
      commandState.current.ready = !loading;
      const readyFrame = currentFrameRef.current;
      renderedFrameRef.current = readyFrame;
      const readyTarget = target ? structuredClone(target) : undefined;
      const isAvailable = () =>
        Boolean(
          viewerHostRef.current?.isConnected &&
          viewerRef.current === viewer &&
          renderedReadyRef.current &&
          readyFrame === currentFrameRef.current &&
          !loadingRef.current &&
          (sameScientificTarget(readyTarget, targetRef.current) ||
            (!readyTarget && !targetRef.current)),
        );
      const captureView = () => {
        if (!isAvailable())
          throw new Error('The inspected target changed or is unavailable.');
        return captureRef.current();
      };
      const handle: GraphMoleculeViewerHandle = {
        captureScreenshot: () => captureView().image,
        captureView,
        isAvailable,
        trajectoryIndex: target?.frameIndex ?? currentIndex,
        target: readyTarget ? structuredClone(readyTarget) : undefined,
        execute: async (request) => {
          if (!isAvailable())
            return {
              version: 1,
              requestId: request.requestId,
              operationId: request.operationId,
              actionId: request.actionId,
              target: structuredClone(request.target),
              status: 'rejected',
              error: {
                code: sameScientificTarget(request.target, targetRef.current)
                  ? 'VIEWER_UNAVAILABLE'
                  : 'STALE_TARGET',
                message: 'The inspected viewer changed or is unavailable.',
              },
            };
          return executorRef.current!(request);
        },
      };
      readyHandleRef.current = handle;
      onReadyRef.current?.(handle);
    } catch (error) {
      renderedReadyRef.current = false;
      commandState.current.ready = false;
      console.error('Failed to render molecule:', error);
      setViewerInitError('Unable to render this molecular structure.');
    }
  }, [
    xyzContent,
    xyzFormat,
    viewerReady,
    currentIndex,
    snapshot?.metadata,
    targetKey,
    activeObject,
    loading,
  ]);

  useEffect(() => {
    if (!viewerReady) return;
    const visible = unitCellVisible && unitCellAvailable;
    if (cellDrawRef.current !== JSON.stringify([visible, cellRef.current])) {
      drawCell(visible);
      viewerRef.current?.render();
    }
  }, [unitCellAvailable, unitCellVisible, viewerReady]);

  useEffect(() => {
    if (!viewerReady || applyingCommandRef.current) return;
    const next = JSON.stringify([
      style,
      selectedSerials,
      selectionStyleRef.current,
    ]);
    if (styledRef.current !== next) {
      applyStyle(style);
      viewerRef.current?.render();
    }
    onSelectionChange?.(selection());
  }, [moleculeId, selectedSerials, style, viewerReady, xyzContent]);

  useEffect(() => {
    if (!xyzContent) {
      return;
    }

    let animationFrame = 0;
    const tick = () => {
      const view = viewerRef.current?.getView?.();
      if (Array.isArray(view) && view.length >= 8) {
        const [x, y, z, zoom, qx, qy, qz, qw] = view;
        if (
          typeof x === 'number' &&
          typeof y === 'number' &&
          typeof z === 'number' &&
          typeof zoom === 'number' &&
          typeof qx === 'number' &&
          typeof qy === 'number' &&
          typeof qz === 'number' &&
          typeof qw === 'number'
        ) {
          const magnitude = Math.sqrt(qx * qx + qy * qy + qz * qz);
          const lookAt =
            magnitude > 0
              ? { x: qx / magnitude, y: qy / magnitude, z: qz / magnitude }
              : { x: 0, y: 0, z: 0 };
          setCameraInfo({
            position: { x, y, z, qx, qy, qz, qw },
            lookAt,
            zoom,
          });
        }
      }
      animationFrame = window.setTimeout(tick, 200);
    };

    animationFrame = window.setTimeout(tick, 200);
    return () => window.clearTimeout(animationFrame);
  }, [xyzContent]);

  const capture = (): GraphMoleculeScreenshot => {
    const viewer = viewerRef.current;
    if (
      !readyHandleRef.current?.isAvailable() ||
      !viewer?.pngURI ||
      applyingCommandRef.current
    )
      throw new Error('Screenshot is unavailable');
    viewer.render();
    const image = viewer.pngURI();
    if (!image.startsWith('data:image/png;base64,'))
      throw new Error('Viewer did not produce a PNG');
    const header = Uint8Array.from(atob(image.slice(22, 66)), (c) =>
      c.charCodeAt(0),
    );
    if (
      header.length < 24 ||
      ![137, 80, 78, 71, 13, 10, 26, 10].every(
        (byte, index) => header[index] === byte,
      ) ||
      String.fromCharCode(...header.slice(12, 16)) !== 'IHDR'
    )
      throw new Error('Viewer did not produce a valid PNG');
    const dimensions = new DataView(header.buffer);
    const width = dimensions.getUint32(16),
      height = dimensions.getUint32(20);
    if (!width || !height) throw new Error('Viewer produced an empty PNG');
    const camera = [...viewer.getView()];
    if (camera.length !== 8 || camera.some((value) => !Number.isFinite(value)))
      throw new Error('Viewer camera is unavailable');
    return {
      version: 1,
      moleculeId,
      image,
      mediaType: 'image/png',
      width,
      height,
      target: target ? structuredClone(target) : undefined,
      trajectoryIndex: target?.frameIndex ?? currentIndex,
      camera,
      selectedIds: selectedSerialsRef.current
        .map((index) => atomIdsRef.current[index]!)
        .filter(Boolean),
    };
  };
  captureRef.current = capture;
  const handleScreenshot = async () => {
    const screenshot = capture();
    const blob = await (await fetch(screenshot.image)).blob();
    await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
  };
  function assertSubmissionTargets(entries: GraphMoleculeAtomSelection[]) {
    if (loading) throw new Error('Wait for the verified structure to load.');
    entries.forEach((entry) => {
      if (
        entry.target?.objectId === target?.objectId &&
        !snapshot?.frameTargets?.some((frame) =>
          sameScientificTarget(frame, entry.target),
        ) &&
        (entry.target?.sourceRevision !== target?.sourceRevision ||
          entry.target?.checksum !== target?.checksum)
      )
        throw new Error(
          'A staged selection refers to an older source revision. Select its atoms again.',
        );
    });
  }
  function handleToggleUnitCell() {
    if (!unitCellAvailable) {
      return;
    }
    setUnitCellVisible((previous) => {
      const next = !previous;
      unitCellPreferenceRef.current = next;
      return next;
    });
  }

  function handleStageSelection() {
    if (selectedSerials.length === 0) {
      return;
    }
    const entry = selection();
    const key = JSON.stringify(
      entry.target ?? { moleculeId, frameIndex: currentIndex },
    );
    setStagedSelections((current) => ({ ...current, [key]: entry }));
  }

  return (
    <div
      className={`thread-graph-molecule-viewer is-${presentation} flex h-full min-h-0 flex-col bg-white ${className}`}
      onPointerDownCapture={() => {
        const handle = readyHandleRef.current;
        if (handle?.isAvailable()) onActive?.(handle);
      }}
      onFocusCapture={() => {
        const handle = readyHandleRef.current;
        if (handle?.isAvailable()) onActive?.(handle);
      }}
    >
      <div className="thread-graph-molecule-header flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 px-3 py-2 sm:px-4 sm:py-3">
        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold text-slate-900">
            {onOpenFile ? (
              <button
                type="button"
                onClick={onOpenFile}
                className="thread-graph-molecule-file-link"
                title="Open in workspace"
              >
                <span className="truncate">{title}</span>
                <PanelRightOpen className="size-4 shrink-0" />
              </button>
            ) : (
              title
            )}
          </h2>
          <p className="mt-1 hidden text-[11px] text-slate-400 sm:block">
            Structure and trajectory
          </p>
        </div>
        <span className="shrink-0 text-[11px] text-slate-400">
          {presentation === 'timeline' ? '3D structure' : 'workspace preview'}
        </span>
      </div>

      <div className="thread-graph-molecule-body min-h-0 flex-1">
        <div
          ref={viewerHostRef}
          data-testid="molecule-viewer"
          className="thread-graph-molecule-stage relative min-h-0 flex-1 overflow-hidden"
        >
          {viewerInitError ? (
            <div
              data-testid="molecule-viewer-error"
              className="thread-graph-molecule-error absolute inset-0 flex items-center justify-center bg-red-50 p-4 text-sm text-red-700"
            >
              {viewerInitError}
            </div>
          ) : null}
          {!viewerInitError && !xyzContent ? (
            <div className="thread-graph-molecule-empty absolute inset-0 flex items-center justify-center p-4 text-sm text-slate-400">
              No molecule data available.
            </div>
          ) : null}
          {hoveredAtom ? (
            <div
              className="thread-graph-molecule-tooltip pointer-events-none fixed z-[1000] rounded-md border border-gray-300 bg-white/95 px-2 py-1.5 text-[10px] text-gray-800 shadow-md"
              style={{ left: hoveredAtom.x - 20, top: hoveredAtom.y - 50 }}
            >
              <div className="mb-0.5 font-semibold text-gray-900">
                {hoveredAtom.label}
              </div>
              <div className="space-x-2 text-gray-600">
                <span>x: {hoveredAtom.coords.x}</span>
                <span>y: {hoveredAtom.coords.y}</span>
                <span>z: {hoveredAtom.coords.z}</span>
              </div>
            </div>
          ) : null}
        </div>

        <div className="thread-graph-molecule-controls shrink-0">
          <div className="thread-graph-molecule-control-row">
            <div className="min-w-0">
              <label>
                Representation{' '}
                <select
                  aria-label="Representation"
                  value={style}
                  onChange={(event) =>
                    setStyle(event.target.value as ViewerStyle)
                  }
                >
                  {supportedStyles.map((entry) => (
                    <option key={entry} value={entry}>
                      {entry}
                    </option>
                  ))}
                </select>
              </label>
              <p className="thread-graph-molecule-control-subtitle">
                XYZ / PDB / CIF preview
              </p>
            </div>
            <GraphMoleculeViewerUpperButtonGroup
              currentIndex={currentIndex}
              exportContent={viewerData.exportContent}
              moleculeId={moleculeId}
              onScreenshot={() =>
                void runOperation(handleScreenshot, 'PNG copied to clipboard.')
              }
              onDownloadSource={onDownloadSource}
              onFeedback={setStatus}
              viewerRef={viewerRef}
              viewerHostRef={viewerHostRef}
              hasUnitCell={unitCellAvailable}
              xyzContent={xyzContent}
              xyzFormat={xyzFormat}
            />
          </div>

          {xyzArray.length > 1 ? (
            <div
              className="thread-graph-molecule-trajectory"
              role="group"
              aria-label="Trajectory controls"
            >
              <div className="thread-graph-molecule-playback-row">
                <Button
                  type="button"
                  variant="ghost"
                  className="thread-graph-molecule-play-button"
                  aria-label={
                    isPlaying ? 'Pause trajectory' : 'Play trajectory'
                  }
                  onClick={() => {
                    setLive(false);
                    if (!isPlaying && currentIndex === xyzArray.length - 1)
                      setCurrentIndex(0);
                    setIsPlaying((current) => !current);
                  }}
                >
                  {isPlaying ? (
                    <Pause className="size-4" />
                  ) : (
                    <Play className="size-4" />
                  )}
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
                <span className="thread-graph-molecule-frame-count">
                  Frame <strong>{currentIndex + 1}</strong> / {xyzArray.length}
                </span>
                <div className="thread-graph-molecule-frame-buttons">
                  {[
                    {
                      label: 'First frame',
                      index: 0,
                      Icon: SkipBack,
                      disabled: currentIndex === 0,
                    },
                    {
                      label: 'Previous frame',
                      index: currentIndex - 1,
                      Icon: ChevronLeft,
                      disabled: currentIndex === 0,
                    },
                    {
                      label: 'Next frame',
                      index: currentIndex + 1,
                      Icon: ChevronRight,
                      disabled: currentIndex === xyzArray.length - 1,
                    },
                    {
                      label: 'Last frame',
                      index: xyzArray.length - 1,
                      Icon: SkipForward,
                      disabled: currentIndex === xyzArray.length - 1,
                    },
                  ].map(({ label, index, Icon, disabled }) => (
                    <Button
                      key={label}
                      type="button"
                      variant="ghost"
                      className="thread-graph-molecule-button"
                      aria-label={label}
                      title={label}
                      disabled={disabled}
                      onClick={() => {
                        setLive(false);
                        setIsPlaying(false);
                        setCurrentIndex(index);
                      }}
                    >
                      <Icon className="size-4" />
                    </Button>
                  ))}
                </div>
              </div>
              <input
                type="range"
                className="thread-graph-molecule-scrubber"
                min={1}
                max={xyzArray.length}
                step={1}
                value={currentIndex + 1}
                aria-label="Trajectory frame"
                aria-valuetext={`Frame ${currentIndex + 1} of ${xyzArray.length}`}
                style={{
                  backgroundSize: `${(currentIndex / (xyzArray.length - 1)) * 100}% 6px`,
                }}
                onChange={(event) => {
                  setLive(false);
                  setIsPlaying(false);
                  setCurrentIndex(Number(event.target.value) - 1);
                }}
              />
              <div
                className="thread-graph-molecule-frame-scale"
                aria-hidden="true"
              >
                <span>1</span>
                <span>{xyzArray.length} frames</span>
              </div>
            </div>
          ) : null}

          <div role="group" aria-label="Viewer contributions">
            {!loading && !viewerInitError && toolbar?.({ target, selectedIds })}
          </div>
          {rendererSlot?.({ target, selectedIds })}
          <Button
            type="button"
            onClick={() => {
              setLive(true);
              setIsPlaying(false);
            }}
            aria-pressed={live}
          >
            LIVE{live ? ' following' : ''}
          </Button>
          {onScreenshot && (
            <Button
              type="button"
              disabled={
                loading ||
                busy ||
                !viewerReady ||
                !target ||
                !renderedReadyRef.current ||
                Boolean(viewerInitError)
              }
              onClick={() =>
                void runOperation(
                  () => onScreenshot(capture()),
                  'PNG submitted.',
                )
              }
            >
              Send screenshot
            </Button>
          )}
          {status && <p role="status">{status}</p>}
          <GraphMoleculeViewerLowerButtonGroup
            cameraInfo={cameraInfo}
            onClearSelection={() => setSelectedSerials([])}
            onClearStaged={() => setStagedSelections({})}
            canSubmit={
              Boolean(onSelectionSubmit && target) &&
              !loading &&
              !busy &&
              !viewerInitError &&
              renderedReadyRef.current
            }
            onSendSelection={() =>
              void runOperation(async () => {
                const entries = [selection()];
                assertSubmissionTargets(entries);
                await onSelectionSubmit?.({ selections: entries });
              }, 'Selection submitted.')
            }
            onSendStaged={() =>
              void runOperation(async () => {
                const entries = Object.values(stagedSelections);
                assertSubmissionTargets(entries);
                await onSelectionSubmit?.({ selections: entries });
                setStagedSelections({});
              }, 'Staged selections submitted.')
            }
            onStageSelection={handleStageSelection}
            onToggleUnitCell={handleToggleUnitCell}
            selectedAtomLabels={selectedAtomLabels}
            selectedSerials={selectedSerials}
            stagedAtoms={stagedAtoms}
            stagedMolecules={stagedMolecules}
            unitCellAvailable={unitCellAvailable}
            unitCellVisible={unitCellVisible}
          />
        </div>
      </div>
    </div>
  );
}

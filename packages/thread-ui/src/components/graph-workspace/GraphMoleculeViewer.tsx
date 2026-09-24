import { Pause, Play, SkipBack, SkipForward, ChevronLeft, ChevronRight, PanelRightOpen } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import GraphMoleculeViewerLowerButtonGroup from './GraphMoleculeViewerLowerButtonGroup';
import GraphMoleculeViewerUpperButtonGroup from './GraphMoleculeViewerUpperButtonGroup';
import type { GraphMoleculeCameraInfo } from './GraphMoleculeViewerControls';
import { load3Dmol, type GLModel, type GLViewer } from './load3Dmol';
import { Button } from '../graph-ui/Button';
import {
  readGraphMoleculeViewerData,
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
  moleculeId: string | null;
  image: string;
};

export type GraphMoleculeAtomSelection = {
  moleculeId: string | null;
  atoms: number[];
};

export function GraphMoleculeViewer({
  className = '',
  moleculeId = null,
  onScreenshot,
  onSelectionChange,
  onReady,
  source,
  title = 'Molecular structure',
  presentation = 'workspace',
  onOpenFile,
}: {
  className?: string;
  presentation?: 'timeline' | 'workspace';
  onOpenFile?: () => void;
  moleculeId?: string | null;
  onScreenshot?: (screenshot: GraphMoleculeScreenshot) => void;
  onSelectionChange?: (selection: GraphMoleculeAtomSelection) => void;
  onReady?: (view: { captureScreenshot: () => string; trajectoryIndex: number }) => void;
  source: GraphMoleculeViewerSource;
  title?: string | null;
}) {
  const viewerHostRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<GLViewer | null>(null);
  const modelRef = useRef<GLModel | null>(null);
  const [viewerReady, setViewerReady] = useState(false);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;
  const zoomedRef = useRef(false);
  const viewportScaleRef = useRef(1);
  const unitCellPreferenceRef = useRef(true);

  const [cameraInfo, setCameraInfo] = useState<GraphMoleculeCameraInfo | null>(
    null,
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredAtom, setHoveredAtom] = useState<HoveredAtom | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAtomLabels, setSelectedAtomLabels] = useState<
    Record<number, string>
  >({});
  const [selectedSerials, setSelectedSerials] = useState<number[]>([]);
  const [stagedSelections, setStagedSelections] = useState<
    Record<string, number[]>
  >({});
  const [unitCellAvailable, setUnitCellAvailable] = useState(false);
  const [unitCellVisible, setUnitCellVisible] = useState(false);
  const [viewerInitError, setViewerInitError] = useState<string | null>(null);

  const viewerData = useMemo(() => readGraphMoleculeViewerData(source), [source]);
  const xyzArray = viewerData.frames;
  const xyzFormat = viewerData.format;
  const xyzContent = xyzArray[currentIndex] ?? null;
  const moleculeKey = moleculeId ?? 'current';
  const stagedAtoms = Object.values(stagedSelections).reduce(
    (sum, atoms) => sum + atoms.length,
    0,
  );
  const stagedMolecules = Object.keys(stagedSelections).length;

  useEffect(() => {
    if (xyzArray.length === 0) {
      setCurrentIndex(0);
      return;
    }
    setCurrentIndex(xyzArray.length - 1);
  }, [xyzArray.length]);

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
      viewerRef.current?.resize();
      const scale = Math.min(1, host.clientWidth / host.clientHeight);
      if (zoomedRef.current && scale !== viewportScaleRef.current) {
        viewerRef.current?.zoom(scale / viewportScaleRef.current);
      }
      viewportScaleRef.current = scale;
      viewerRef.current?.render();
    };
    const resizeObserver = new ResizeObserver(resizeViewer);
    resizeObserver.observe(host);

    load3Dmol()
      .then(($3Dmol) => {
        if (cancelled || viewerRef.current) {
          return;
        }

        try {
          const viewer = $3Dmol.createViewer(host, {});
          viewerRef.current = viewer;
          setViewerReady(true);
          viewer.setBackgroundColor('#f8fafc', 0.8);
          window.addEventListener('resize', resizeViewer);
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
      window.removeEventListener('resize', resizeViewer);
      viewerRef.current = null;
      modelRef.current = null;
    };
  }, []);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !xyzContent) {
      return;
    }

    try {
      viewer.removeAllModels();
      viewer.removeAllShapes();
      viewer.removeAllLabels();

      const model = viewer.addModel(xyzContent, xyzFormat || 'xyz');
      modelRef.current = model;
      model.setStyle({}, { stick: { radius: 0.2 }, sphere: { scale: 0.3 } });

      const crystalData = model.getCrystData();
      const hasUnitCell = Boolean(
        crystalData &&
          typeof crystalData === 'object' &&
          Object.keys(crystalData).length,
      );
      setUnitCellAvailable(hasUnitCell);
      setUnitCellVisible(hasUnitCell ? unitCellPreferenceRef.current : false);
      setSelectedSerials([]);
      setSelectedAtomLabels({});

      const frameAtomLabels = xyzContent
        .split('\n')
        .slice(2)
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => line.split(/\s+/)[0] ?? 'Atom');

      if (!zoomedRef.current) {
        viewer.zoomTo();
        const host = viewerHostRef.current;
        const scale = host?.clientHeight ? Math.min(1, host.clientWidth / host.clientHeight) : 1;
        // 3Dmol fits vertically; a tall, narrow Explorer also needs a
        // horizontal fit. Keep this framing across trajectory frames.
        viewer.zoom(0.85 * scale);
        viewportScaleRef.current = scale;
        zoomedRef.current = true;
      }

      model.setClickable(
        {},
        true,
        (atom: ThreeDmolAtom, _viewer: GLViewer, event?: MouseEvent) => {
          const serial = atom.serial ?? atom.index;
          if (serial === undefined) {
            return;
          }
          const label = atom.atom || atom.elem || frameAtomLabels[serial] || 'Atom';

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
              atom.serial ?? atom.index ?? '?'
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

      viewer.render();
      onReadyRef.current?.({ captureScreenshot: () => {
        viewer.render();
        if (!viewer.pngURI) throw new Error('Screenshot is unavailable');
        return viewer.pngURI();
      }, trajectoryIndex: currentIndex });
    } catch (error) {
      console.error('Failed to render molecule:', error);
      setViewerInitError('Unable to render this molecular structure.');
    }
  }, [xyzContent, xyzFormat, viewerReady, currentIndex]);

  useEffect(() => {
    const viewer = viewerRef.current;
    const model = modelRef.current;
    if (!viewer || !model) {
      return;
    }

    try {
      viewer.removeUnitCell(model);
    } catch {
      // 3Dmol can throw before a unit cell has been created.
    }

    if (unitCellVisible && unitCellAvailable) {
      try {
        viewer.addUnitCell(model, {
          box: { color: 'black', opacity: 1, linewidth: 5 },
          astyle: { radius: 0.12, mid: 0.85, color: 'red', opacity: 0.6 },
          bstyle: { radius: 0.12, mid: 0.85, color: 'green', opacity: 0.6 },
          cstyle: { radius: 0.12, mid: 0.85, color: 'blue', opacity: 0.6 },
          alabel: 'a',
          blabel: 'b',
          clabel: 'c',
        });
      } catch {
        setUnitCellAvailable(false);
        setUnitCellVisible(false);
      }
    }

    viewer.render();
  }, [unitCellAvailable, unitCellVisible, xyzContent, xyzFormat]);

  useEffect(() => {
    const viewer = viewerRef.current;
    const model = modelRef.current;
    if (!viewer || !model || !xyzContent) {
      return;
    }

    model.setStyle({}, { stick: { radius: 0.2 }, sphere: { scale: 0.3 } });
    if (selectedSerials.length > 0) {
      model.setStyle(
        { serial: selectedSerials as unknown as number },
        {
          stick: { radius: 0.3, color: 'yellow' },
          sphere: { scale: 0.4, color: 'yellow' },
        },
      );
    }

    viewer.render();
    onSelectionChange?.({ moleculeId, atoms: selectedSerials });
  }, [moleculeId, onSelectionChange, selectedSerials, xyzContent]);

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
      animationFrame = window.requestAnimationFrame(tick);
    };

    animationFrame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [xyzContent]);

  const handleScreenshot = useCallback(async () => {
    const viewer = viewerRef.current;
    if (!viewer?.pngURI) {
      return;
    }

    viewer.render();
    const image = viewer.pngURI();
    if (!image) {
      return;
    }

    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const clipboardItem = new ClipboardItem({
        [blob.type || 'image/png']: blob,
      });
      await navigator.clipboard.write([clipboardItem]);
    } catch {
      // Clipboard image writes are not supported in every host browser.
    }

    onScreenshot?.({ moleculeId, image });
  }, [moleculeId, onScreenshot]);

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
    setStagedSelections((current) => {
      const existing = current[moleculeKey] ?? [];
      return {
        ...current,
        [moleculeKey]: Array.from(new Set([...existing, ...selectedSerials])),
      };
    });
  }

  return (
    <div
      className={`thread-graph-molecule-viewer is-${presentation} flex h-full min-h-0 flex-col bg-white ${className}`}
    >
      <div className="thread-graph-molecule-header flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 px-3 py-2 sm:px-4 sm:py-3">
        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold text-slate-900">
            {onOpenFile ? <button type="button" onClick={onOpenFile} className="thread-graph-molecule-file-link" title="Open in workspace">
              <span className="truncate">{title}</span><PanelRightOpen className="size-4 shrink-0" />
            </button> : title}
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
              <p className="thread-graph-molecule-control-title">Ball & Stick</p>
              <p className="thread-graph-molecule-control-subtitle">
                XYZ / PDB / CIF preview
              </p>
            </div>
            <GraphMoleculeViewerUpperButtonGroup
              currentIndex={currentIndex}
              exportContent={viewerData.exportContent}
              moleculeId={moleculeId}
              onScreenshot={() => void handleScreenshot()}
              viewerRef={viewerRef}
              viewerHostRef={viewerHostRef}
              xyzContent={xyzContent}
              xyzFormat={xyzFormat}
            />
          </div>

          {xyzArray.length > 1 ? (
            <div className="thread-graph-molecule-trajectory" role="group" aria-label="Trajectory controls">
              <div className="thread-graph-molecule-playback-row">
                <Button type="button" variant="ghost" className="thread-graph-molecule-play-button"
                  aria-label={isPlaying ? 'Pause trajectory' : 'Play trajectory'}
                  onClick={() => {
                    if (!isPlaying && currentIndex === xyzArray.length - 1) setCurrentIndex(0);
                    setIsPlaying(current => !current);
                  }}>
                  {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
                <span className="thread-graph-molecule-frame-count">Frame <strong>{currentIndex + 1}</strong> / {xyzArray.length}</span>
                <div className="thread-graph-molecule-frame-buttons">
                  {[
                    {label: 'First frame', index: 0, Icon: SkipBack, disabled: currentIndex === 0},
                    {label: 'Previous frame', index: currentIndex - 1, Icon: ChevronLeft, disabled: currentIndex === 0},
                    {label: 'Next frame', index: currentIndex + 1, Icon: ChevronRight, disabled: currentIndex === xyzArray.length - 1},
                    {label: 'Last frame', index: xyzArray.length - 1, Icon: SkipForward, disabled: currentIndex === xyzArray.length - 1},
                  ].map(({label, index, Icon, disabled}) => <Button key={label} type="button" variant="ghost"
                    className="thread-graph-molecule-button" aria-label={label} title={label} disabled={disabled}
                    onClick={() => {setIsPlaying(false); setCurrentIndex(index);}}><Icon className="size-4" /></Button>)}
                </div>
              </div>
              <input type="range" className="thread-graph-molecule-scrubber"
                min={1} max={xyzArray.length} step={1} value={currentIndex + 1}
                aria-label="Trajectory frame" aria-valuetext={`Frame ${currentIndex + 1} of ${xyzArray.length}`}
                style={{backgroundSize: `${currentIndex / (xyzArray.length - 1) * 100}% 6px`}}
                onChange={event => {setIsPlaying(false); setCurrentIndex(Number(event.target.value) - 1);}} />
              <div className="thread-graph-molecule-frame-scale" aria-hidden="true"><span>1</span><span>{xyzArray.length} frames</span></div>
            </div>
          ) : null}

          {presentation === 'workspace' && <GraphMoleculeViewerLowerButtonGroup
            cameraInfo={cameraInfo}
            onClearSelection={() => setSelectedSerials([])}
            onClearStaged={() => setStagedSelections({})}
            onSendSelection={() =>
              onSelectionChange?.({ moleculeId, atoms: selectedSerials })
            }
            onSendStaged={() => {
              Object.entries(stagedSelections).forEach(([key, atoms]) => {
                onSelectionChange?.({
                  moleculeId: key === 'current' ? moleculeId : key,
                  atoms,
                });
              });
            }}
            onStageSelection={handleStageSelection}
            onToggleUnitCell={handleToggleUnitCell}
            selectedAtomLabels={selectedAtomLabels}
            selectedSerials={selectedSerials}
            stagedAtoms={stagedAtoms}
            stagedMolecules={stagedMolecules}
            unitCellAvailable={unitCellAvailable}
            unitCellVisible={unitCellVisible}
          />}
        </div>
      </div>
    </div>
  );
}

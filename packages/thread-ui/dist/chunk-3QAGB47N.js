import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  cn
} from "./chunk-TZBWAOOO.js";

// src/components/graph-workspace/GraphMoleculeViewerData.ts
function normalizeFormat(format) {
  const normalized = format?.trim().toLowerCase();
  if (!normalized || normalized === "extxyz") {
    return "xyz";
  }
  return normalized;
}
function splitXyzTrajectory(content) {
  const lines = content.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  const frames = [];
  let cursor = 0;
  while (cursor < lines.length) {
    while (cursor < lines.length && lines[cursor]?.trim() === "") {
      cursor += 1;
    }
    if (cursor >= lines.length) {
      break;
    }
    const atomCount = Number.parseInt(lines[cursor]?.trim() ?? "", 10);
    if (!Number.isFinite(atomCount) || atomCount < 0) {
      return [content];
    }
    const frameLineCount = atomCount + 2;
    if (cursor + frameLineCount > lines.length) {
      return [content];
    }
    frames.push(`${lines.slice(cursor, cursor + frameLineCount).join("\n")}
`);
    cursor += frameLineCount;
  }
  return frames.length > 0 ? frames : [content];
}
function normalizeSnapshotFrames(content, format) {
  if (format !== "xyz") {
    return content;
  }
  return content.flatMap((frame) => splitXyzTrajectory(frame));
}
function joinFramesForExport(content) {
  return content.map((frame) => `${frame.replace(/\s+$/g, "")}
`).join("");
}
function readGraphMoleculeViewerData(source) {
  if (!source) {
    return {
      format: "xyz",
      frames: [],
      exportContent: ""
    };
  }
  if (typeof source === "string") {
    const frames2 = normalizeSnapshotFrames([source], "xyz");
    return {
      frames: frames2,
      format: "xyz",
      exportContent: joinFramesForExport(frames2)
    };
  }
  const format = normalizeFormat(source.format);
  const content = source.content.filter((frame) => frame.trim().length > 0);
  const frames = normalizeSnapshotFrames(content, format);
  return {
    frames,
    format,
    exportContent: joinFramesForExport(content)
  };
}

// src/components/graph-workspace/GraphMoleculeViewer.tsx
import { Pause, Play, SkipBack, SkipForward, ChevronLeft, ChevronRight, PanelRightOpen } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// src/components/graph-workspace/GraphMoleculeViewerLowerButtonGroup.tsx
import {
  AlignVerticalDistributeCenter,
  ArrowUpRight,
  Box,
  Boxes,
  Bubbles,
  CircleX,
  Eraser,
  Rotate3d,
  Send,
  Share2,
  Spline,
  Trash2,
  Waypoints
} from "lucide-react";

// src/components/graph-ui/ButtonGroup.tsx
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

// src/components/graph-ui/Separator.tsx
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { jsx } from "react/jsx-runtime";
function Separator({
  className,
  decorative = true,
  orientation = "horizontal",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    SeparatorPrimitive.Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}

// src/components/graph-ui/ButtonGroup.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var buttonGroupVariants = cva(
  "flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-2 [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-md",
  {
    variants: {
      orientation: {
        horizontal: "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
        vertical: "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none"
      }
    },
    defaultVariants: {
      orientation: "horizontal"
    }
  }
);
function ButtonGroup({
  className,
  orientation,
  ...props
}) {
  return /* @__PURE__ */ jsx2(
    "div",
    {
      role: "group",
      "data-slot": "button-group",
      "data-orientation": orientation,
      className: cn(buttonGroupVariants({ orientation }), className),
      ...props
    }
  );
}
function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsx2(
    Separator,
    {
      "data-slot": "button-group-separator",
      orientation,
      className: cn(
        "relative !m-0 self-stretch bg-input data-[orientation=vertical]:h-auto",
        className
      ),
      ...props
    }
  );
}

// src/components/graph-workspace/GraphMoleculeViewerControls.tsx
import { jsx as jsx3, jsxs } from "react/jsx-runtime";
function moleculeSlug(value) {
  const normalized = value?.trim().replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "");
  return normalized || "molecule";
}
function downloadTextFile(content, filename) {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
function GraphMoleculeIconButton({
  children,
  disabled,
  label,
  onClick
}) {
  return /* @__PURE__ */ jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsx3(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx3(
      Button,
      {
        type: "button",
        variant: "outline",
        size: "icon",
        className: "thread-graph-molecule-button size-8",
        disabled,
        onClick,
        title: label,
        "aria-label": label,
        children
      }
    ) }),
    /* @__PURE__ */ jsx3(TooltipContent, { children: /* @__PURE__ */ jsx3("p", { children: label }) })
  ] });
}
function GraphMoleculeButtonGroup({
  children,
  className = ""
}) {
  return /* @__PURE__ */ jsx3(ButtonGroup, { className: `thread-graph-molecule-button-group ${className}`, children });
}

// src/components/graph-workspace/GraphMoleculeViewerLowerButtonGroup.tsx
import { Fragment, jsx as jsx4, jsxs as jsxs2 } from "react/jsx-runtime";
function GraphMoleculeViewerLowerButtonGroup({
  cameraInfo,
  onClearSelection,
  onClearStaged,
  onSendSelection,
  onSendStaged,
  onStageSelection,
  onToggleUnitCell,
  selectedAtomLabels,
  selectedSerials,
  stagedAtoms,
  stagedMolecules,
  unitCellAvailable,
  unitCellVisible
}) {
  const hasSelection = selectedSerials.length > 0;
  const hasStaged = stagedAtoms > 0;
  return /* @__PURE__ */ jsxs2(Fragment, { children: [
    /* @__PURE__ */ jsxs2("div", { className: "flex w-full justify-between gap-2 overflow-x-auto", children: [
      /* @__PURE__ */ jsxs2(GraphMoleculeButtonGroup, { children: [
        /* @__PURE__ */ jsx4(GraphMoleculeIconButton, { label: "Distance", children: /* @__PURE__ */ jsx4(AlignVerticalDistributeCenter, { className: "size-4" }) }),
        /* @__PURE__ */ jsx4(GraphMoleculeIconButton, { label: "Connectivity", children: /* @__PURE__ */ jsx4(Share2, { className: "size-4" }) }),
        /* @__PURE__ */ jsx4(GraphMoleculeIconButton, { label: "Angle", children: /* @__PURE__ */ jsx4(Waypoints, { className: "size-4" }) }),
        /* @__PURE__ */ jsx4(GraphMoleculeIconButton, { label: "Dihedral", children: /* @__PURE__ */ jsx4(Spline, { className: "size-4" }) }),
        /* @__PURE__ */ jsx4(GraphMoleculeIconButton, { label: "Add dummy atoms", children: /* @__PURE__ */ jsx4(Bubbles, { className: "size-4" }) }),
        /* @__PURE__ */ jsx4(GraphMoleculeIconButton, { label: "Delete atoms", children: /* @__PURE__ */ jsx4(CircleX, { className: "size-4" }) }),
        /* @__PURE__ */ jsx4(GraphMoleculeIconButton, { label: "Rotate", children: /* @__PURE__ */ jsx4(Rotate3d, { className: "size-4" }) })
      ] }),
      /* @__PURE__ */ jsxs2(GraphMoleculeButtonGroup, { children: [
        /* @__PURE__ */ jsx4(
          GraphMoleculeIconButton,
          {
            label: unitCellVisible ? "Hide unit cell" : "Show unit cell",
            disabled: !unitCellAvailable,
            onClick: onToggleUnitCell,
            children: /* @__PURE__ */ jsx4(Boxes, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsx4(
          GraphMoleculeIconButton,
          {
            label: "Clear selection",
            disabled: !hasSelection,
            onClick: onClearSelection,
            children: /* @__PURE__ */ jsx4(Trash2, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsx4(
          GraphMoleculeIconButton,
          {
            label: "Send selection",
            disabled: !hasSelection,
            onClick: onSendSelection,
            children: /* @__PURE__ */ jsx4(Send, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsx4(
          GraphMoleculeIconButton,
          {
            label: "Stage current selection",
            disabled: !hasSelection,
            onClick: onStageSelection,
            children: /* @__PURE__ */ jsx4(Box, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsx4(
          GraphMoleculeIconButton,
          {
            label: "Clear staged selections",
            disabled: !hasStaged,
            onClick: onClearStaged,
            children: /* @__PURE__ */ jsx4(Eraser, { className: "size-4" })
          }
        ),
        /* @__PURE__ */ jsx4(
          GraphMoleculeIconButton,
          {
            label: "Send staged selections",
            disabled: !hasStaged,
            onClick: onSendStaged,
            children: /* @__PURE__ */ jsx4(ArrowUpRight, { className: "size-4" })
          }
        )
      ] })
    ] }),
    cameraInfo ? /* @__PURE__ */ jsxs2("div", { className: "thread-graph-molecule-camera", children: [
      /* @__PURE__ */ jsxs2("div", { children: [
        /* @__PURE__ */ jsx4("strong", { children: "XYZ: " }),
        "x=",
        cameraInfo.position.x.toFixed(1),
        " y=",
        cameraInfo.position.y.toFixed(1),
        " z=",
        cameraInfo.position.z.toFixed(1),
        /* @__PURE__ */ jsx4("br", {}),
        /* @__PURE__ */ jsx4("strong", { children: "Quat: " }),
        "qx=",
        cameraInfo.position.qx.toFixed(2),
        " qy=",
        cameraInfo.position.qy.toFixed(2),
        " qz=",
        cameraInfo.position.qz.toFixed(2),
        " qw=",
        cameraInfo.position.qw.toFixed(2)
      ] }),
      /* @__PURE__ */ jsx4("div", { className: "thread-graph-molecule-camera-divider" }),
      /* @__PURE__ */ jsxs2("div", { className: "flex flex-col gap-1 text-[10px]", children: [
        /* @__PURE__ */ jsxs2("div", { children: [
          "Selected atoms:",
          " ",
          selectedSerials.length > 0 ? selectedSerials.map(
            (serial) => `${selectedAtomLabels[serial] ?? "Atom"}(${serial})`
          ).join(", ") : "None"
        ] }),
        /* @__PURE__ */ jsxs2("div", { children: [
          "Staged: ",
          stagedMolecules,
          " molecule(s), ",
          stagedAtoms,
          " atom(s)"
        ] })
      ] })
    ] }) : null
  ] });
}

// src/components/graph-workspace/GraphMoleculeViewerUpperButtonGroup.tsx
import { Box as Box2, Camera, Copy, Download, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
function GraphMoleculeViewerUpperButtonGroup({
  currentIndex,
  exportContent,
  moleculeId,
  onScreenshot,
  viewerRef,
  viewerHostRef,
  xyzContent,
  xyzFormat
}) {
  const slug = moleculeSlug(moleculeId);
  async function handleCopyXYZ() {
    if (!xyzContent) {
      return;
    }
    await navigator.clipboard.writeText(xyzContent);
  }
  function handleDownloadXYZ() {
    if (!xyzContent) {
      return;
    }
    downloadTextFile(
      xyzContent,
      `${slug}_step_${currentIndex + 1}.${xyzFormat || "xyz"}`
    );
  }
  function handleDownloadAllXYZ() {
    if (!exportContent) {
      return;
    }
    downloadTextFile(exportContent, `${slug}_trajectory.${xyzFormat || "xyz"}`);
  }
  function handleZoomIn() {
    if (!viewerRef.current) {
      return;
    }
    viewerRef.current.zoom(1.2);
    viewerRef.current.render();
  }
  function handleZoomOut() {
    if (!viewerRef.current) {
      return;
    }
    viewerRef.current.zoom(0.8);
    viewerRef.current.render();
  }
  function handleReset() {
    if (!viewerRef.current) {
      return;
    }
    viewerRef.current.zoomTo();
    const host = viewerHostRef.current;
    viewerRef.current.zoom(0.85 * (host?.clientHeight ? Math.min(1, host.clientWidth / host.clientHeight) : 1));
    viewerRef.current.setCameraParameters({});
    viewerRef.current.render();
  }
  return /* @__PURE__ */ jsxs3(GraphMoleculeButtonGroup, { className: "ml-auto justify-end", children: [
    /* @__PURE__ */ jsx5(
      GraphMoleculeIconButton,
      {
        label: "Copy current structure",
        onClick: () => void handleCopyXYZ(),
        disabled: !xyzContent,
        children: /* @__PURE__ */ jsx5(Copy, { className: "size-3.5" })
      }
    ),
    /* @__PURE__ */ jsx5(
      GraphMoleculeIconButton,
      {
        label: "Download current structure",
        onClick: handleDownloadXYZ,
        disabled: !xyzContent,
        children: /* @__PURE__ */ jsx5(Download, { className: "size-3.5" })
      }
    ),
    /* @__PURE__ */ jsx5(
      GraphMoleculeIconButton,
      {
        label: "Download full trajectory",
        onClick: handleDownloadAllXYZ,
        disabled: !exportContent,
        children: /* @__PURE__ */ jsx5(Box2, { className: "size-3.5" })
      }
    ),
    /* @__PURE__ */ jsx5(
      GraphMoleculeIconButton,
      {
        label: "Copy screenshot",
        onClick: onScreenshot,
        disabled: !viewerRef.current || !xyzContent,
        children: /* @__PURE__ */ jsx5(Camera, { className: "size-3.5" })
      }
    ),
    /* @__PURE__ */ jsx5(ButtonGroupSeparator, { className: "thread-graph-molecule-button-divider" }),
    /* @__PURE__ */ jsx5(
      GraphMoleculeIconButton,
      {
        label: "Zoom in",
        onClick: handleZoomIn,
        disabled: !viewerRef.current || !xyzContent,
        children: /* @__PURE__ */ jsx5(ZoomIn, { className: "size-3.5" })
      }
    ),
    /* @__PURE__ */ jsx5(
      GraphMoleculeIconButton,
      {
        label: "Zoom out",
        onClick: handleZoomOut,
        disabled: !viewerRef.current || !xyzContent,
        children: /* @__PURE__ */ jsx5(ZoomOut, { className: "size-3.5" })
      }
    ),
    /* @__PURE__ */ jsx5(
      GraphMoleculeIconButton,
      {
        label: "Reset camera",
        onClick: handleReset,
        disabled: !viewerRef.current || !xyzContent,
        children: /* @__PURE__ */ jsx5(RotateCcw, { className: "size-3.5" })
      }
    )
  ] });
}

// src/components/graph-workspace/load3Dmol.ts
var threeDmolPromise = null;
async function load3Dmol() {
  if (typeof window === "undefined") {
    throw new Error("3Dmol is only available in a browser environment.");
  }
  if (window["3Dmol"]) {
    return window["3Dmol"];
  }
  if (!threeDmolPromise) {
    threeDmolPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector(
        'script[data-remote-codex-3dmol="true"]'
      );
      const handleLoad = () => {
        if (window["3Dmol"]) {
          resolve(window["3Dmol"]);
          return;
        }
        reject(new Error("3Dmol loaded without exposing the expected global."));
      };
      if (existingScript) {
        existingScript.addEventListener("load", handleLoad, { once: true });
        existingScript.addEventListener(
          "error",
          () => reject(new Error("Unable to load 3Dmol viewer runtime.")),
          { once: true }
        );
        return;
      }
      const script = document.createElement("script");
      script.src = "/vendor/3Dmol-min.js";
      script.async = true;
      script.dataset.remoteCodex3dmol = "true";
      script.addEventListener("load", handleLoad, { once: true });
      script.addEventListener(
        "error",
        () => reject(new Error("Unable to load 3Dmol viewer runtime.")),
        { once: true }
      );
      document.head.appendChild(script);
    });
  }
  return threeDmolPromise;
}

// src/components/graph-workspace/GraphMoleculeViewer.tsx
import { jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
function GraphMoleculeViewer({
  className = "",
  moleculeId = null,
  onScreenshot,
  onSelectionChange,
  onReady,
  source,
  title = "Molecular structure",
  presentation = "workspace",
  onOpenFile
}) {
  const viewerHostRef = useRef(null);
  const viewerRef = useRef(null);
  const modelRef = useRef(null);
  const [viewerReady, setViewerReady] = useState(false);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;
  const zoomedRef = useRef(false);
  const viewportScaleRef = useRef(1);
  const unitCellPreferenceRef = useRef(true);
  const [cameraInfo, setCameraInfo] = useState(
    null
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredAtom, setHoveredAtom] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAtomLabels, setSelectedAtomLabels] = useState({});
  const [selectedSerials, setSelectedSerials] = useState([]);
  const [stagedSelections, setStagedSelections] = useState({});
  const [unitCellAvailable, setUnitCellAvailable] = useState(false);
  const [unitCellVisible, setUnitCellVisible] = useState(false);
  const [viewerInitError, setViewerInitError] = useState(null);
  const viewerData = useMemo(() => readGraphMoleculeViewerData(source), [source]);
  const xyzArray = viewerData.frames;
  const xyzFormat = viewerData.format;
  const xyzContent = xyzArray[currentIndex] ?? null;
  const moleculeKey = moleculeId ?? "current";
  const stagedAtoms = Object.values(stagedSelections).reduce(
    (sum, atoms) => sum + atoms.length,
    0
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
      const canvas = document.createElement("canvas");
      const webGl = canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!webGl) {
        setViewerInitError(
          "WebGL is unavailable in this browser environment. Unable to render 3D viewer."
        );
        return;
      }
    } catch {
      setViewerInitError(
        "WebGL is unavailable in this browser environment. Unable to render 3D viewer."
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
    load3Dmol().then(($3Dmol) => {
      if (cancelled || viewerRef.current) {
        return;
      }
      try {
        const viewer = $3Dmol.createViewer(host, {});
        viewerRef.current = viewer;
        setViewerReady(true);
        viewer.setBackgroundColor("#f8fafc", 0.8);
        window.addEventListener("resize", resizeViewer);
        window.setTimeout(resizeViewer, 100);
      } catch (error) {
        console.error("Failed to initialize 3Dmol viewer:", error);
        setViewerInitError(
          "Failed to initialize 3D viewer. Please refresh or try another browser."
        );
      }
    }).catch((error) => {
      console.error("Failed to load 3Dmol viewer runtime:", error);
      setViewerInitError(
        "Failed to load 3D viewer runtime. Please refresh or try another browser."
      );
    });
    return () => {
      cancelled = true;
      resizeObserver.disconnect();
      window.removeEventListener("resize", resizeViewer);
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
      const model = viewer.addModel(xyzContent, xyzFormat || "xyz");
      modelRef.current = model;
      model.setStyle({}, { stick: { radius: 0.2 }, sphere: { scale: 0.3 } });
      const crystalData = model.getCrystData();
      const hasUnitCell = Boolean(
        crystalData && typeof crystalData === "object" && Object.keys(crystalData).length
      );
      setUnitCellAvailable(hasUnitCell);
      setUnitCellVisible(hasUnitCell ? unitCellPreferenceRef.current : false);
      setSelectedSerials([]);
      setSelectedAtomLabels({});
      const frameAtomLabels = xyzContent.split("\n").slice(2).map((line) => line.trim()).filter(Boolean).map((line) => line.split(/\s+/)[0] ?? "Atom");
      if (!zoomedRef.current) {
        viewer.zoomTo();
        const host = viewerHostRef.current;
        const scale = host?.clientHeight ? Math.min(1, host.clientWidth / host.clientHeight) : 1;
        viewer.zoom(0.85 * scale);
        viewportScaleRef.current = scale;
        zoomedRef.current = true;
      }
      model.setClickable(
        {},
        true,
        (atom, _viewer, event) => {
          const serial = atom.serial ?? atom.index;
          if (serial === void 0) {
            return;
          }
          const label = atom.atom || atom.elem || frameAtomLabels[serial] || "Atom";
          setSelectedSerials((previous) => {
            const isMulti = Boolean(
              event?.shiftKey || event?.metaKey || event?.ctrlKey
            );
            const next = !isMulti ? previous.length === 1 && previous[0] === serial ? [] : [serial] : previous.includes(serial) ? previous.filter((entry) => entry !== serial) : [...previous, serial];
            setSelectedAtomLabels((current) => {
              if (next.length === 0) {
                return {};
              }
              const labelsBySerial = {};
              next.forEach((entry) => {
                labelsBySerial[entry] = current[entry] || frameAtomLabels[entry] || label;
              });
              return labelsBySerial;
            });
            return next;
          });
        }
      );
      model.setHoverable(
        {},
        true,
        (atom, _viewer, event) => {
          if (!event || !atom) {
            return;
          }
          setHoveredAtom({
            x: event.clientX,
            y: event.clientY,
            label: `${atom.atom || atom.elem || "Atom"} (${atom.serial ?? atom.index ?? "?"})`,
            coords: {
              x: atom.x.toFixed(2),
              y: atom.y.toFixed(2),
              z: atom.z.toFixed(2)
            }
          });
        },
        () => setHoveredAtom(null)
      );
      viewer.render();
      onReadyRef.current?.({ captureScreenshot: () => {
        viewer.render();
        if (!viewer.pngURI) throw new Error("Screenshot is unavailable");
        return viewer.pngURI();
      }, trajectoryIndex: currentIndex });
    } catch (error) {
      console.error("Failed to render molecule:", error);
      setViewerInitError("Unable to render this molecular structure.");
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
    }
    if (unitCellVisible && unitCellAvailable) {
      try {
        viewer.addUnitCell(model, {
          box: { color: "black", opacity: 1, linewidth: 5 },
          astyle: { radius: 0.12, mid: 0.85, color: "red", opacity: 0.6 },
          bstyle: { radius: 0.12, mid: 0.85, color: "green", opacity: 0.6 },
          cstyle: { radius: 0.12, mid: 0.85, color: "blue", opacity: 0.6 },
          alabel: "a",
          blabel: "b",
          clabel: "c"
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
        { serial: selectedSerials },
        {
          stick: { radius: 0.3, color: "yellow" },
          sphere: { scale: 0.4, color: "yellow" }
        }
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
        if (typeof x === "number" && typeof y === "number" && typeof z === "number" && typeof zoom === "number" && typeof qx === "number" && typeof qy === "number" && typeof qz === "number" && typeof qw === "number") {
          const magnitude = Math.sqrt(qx * qx + qy * qy + qz * qz);
          const lookAt = magnitude > 0 ? { x: qx / magnitude, y: qy / magnitude, z: qz / magnitude } : { x: 0, y: 0, z: 0 };
          setCameraInfo({
            position: { x, y, z, qx, qy, qz, qw },
            lookAt,
            zoom
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
        [blob.type || "image/png"]: blob
      });
      await navigator.clipboard.write([clipboardItem]);
    } catch {
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
        [moleculeKey]: Array.from(/* @__PURE__ */ new Set([...existing, ...selectedSerials]))
      };
    });
  }
  return /* @__PURE__ */ jsxs4(
    "div",
    {
      className: `thread-graph-molecule-viewer is-${presentation} flex h-full min-h-0 flex-col bg-white ${className}`,
      children: [
        /* @__PURE__ */ jsxs4("div", { className: "thread-graph-molecule-header flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 px-3 py-2 sm:px-4 sm:py-3", children: [
          /* @__PURE__ */ jsxs4("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx6("h2", { className: "truncate text-sm font-semibold text-slate-900", children: onOpenFile ? /* @__PURE__ */ jsxs4("button", { type: "button", onClick: onOpenFile, className: "thread-graph-molecule-file-link", title: "Open in workspace", children: [
              /* @__PURE__ */ jsx6("span", { className: "truncate", children: title }),
              /* @__PURE__ */ jsx6(PanelRightOpen, { className: "size-4 shrink-0" })
            ] }) : title }),
            /* @__PURE__ */ jsx6("p", { className: "mt-1 hidden text-[11px] text-slate-400 sm:block", children: "Structure and trajectory" })
          ] }),
          /* @__PURE__ */ jsx6("span", { className: "shrink-0 text-[11px] text-slate-400", children: presentation === "timeline" ? "3D structure" : "workspace preview" })
        ] }),
        /* @__PURE__ */ jsxs4("div", { className: "thread-graph-molecule-body min-h-0 flex-1", children: [
          /* @__PURE__ */ jsxs4(
            "div",
            {
              ref: viewerHostRef,
              "data-testid": "molecule-viewer",
              className: "thread-graph-molecule-stage relative min-h-0 flex-1 overflow-hidden",
              children: [
                viewerInitError ? /* @__PURE__ */ jsx6(
                  "div",
                  {
                    "data-testid": "molecule-viewer-error",
                    className: "thread-graph-molecule-error absolute inset-0 flex items-center justify-center bg-red-50 p-4 text-sm text-red-700",
                    children: viewerInitError
                  }
                ) : null,
                !viewerInitError && !xyzContent ? /* @__PURE__ */ jsx6("div", { className: "thread-graph-molecule-empty absolute inset-0 flex items-center justify-center p-4 text-sm text-slate-400", children: "No molecule data available." }) : null,
                hoveredAtom ? /* @__PURE__ */ jsxs4(
                  "div",
                  {
                    className: "thread-graph-molecule-tooltip pointer-events-none fixed z-[1000] rounded-md border border-gray-300 bg-white/95 px-2 py-1.5 text-[10px] text-gray-800 shadow-md",
                    style: { left: hoveredAtom.x - 20, top: hoveredAtom.y - 50 },
                    children: [
                      /* @__PURE__ */ jsx6("div", { className: "mb-0.5 font-semibold text-gray-900", children: hoveredAtom.label }),
                      /* @__PURE__ */ jsxs4("div", { className: "space-x-2 text-gray-600", children: [
                        /* @__PURE__ */ jsxs4("span", { children: [
                          "x: ",
                          hoveredAtom.coords.x
                        ] }),
                        /* @__PURE__ */ jsxs4("span", { children: [
                          "y: ",
                          hoveredAtom.coords.y
                        ] }),
                        /* @__PURE__ */ jsxs4("span", { children: [
                          "z: ",
                          hoveredAtom.coords.z
                        ] })
                      ] })
                    ]
                  }
                ) : null
              ]
            }
          ),
          /* @__PURE__ */ jsxs4("div", { className: "thread-graph-molecule-controls shrink-0", children: [
            /* @__PURE__ */ jsxs4("div", { className: "thread-graph-molecule-control-row", children: [
              /* @__PURE__ */ jsxs4("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx6("p", { className: "thread-graph-molecule-control-title", children: "Ball & Stick" }),
                /* @__PURE__ */ jsx6("p", { className: "thread-graph-molecule-control-subtitle", children: "XYZ / PDB / CIF preview" })
              ] }),
              /* @__PURE__ */ jsx6(
                GraphMoleculeViewerUpperButtonGroup,
                {
                  currentIndex,
                  exportContent: viewerData.exportContent,
                  moleculeId,
                  onScreenshot: () => void handleScreenshot(),
                  viewerRef,
                  viewerHostRef,
                  xyzContent,
                  xyzFormat
                }
              )
            ] }),
            xyzArray.length > 1 ? /* @__PURE__ */ jsxs4("div", { className: "thread-graph-molecule-trajectory", role: "group", "aria-label": "Trajectory controls", children: [
              /* @__PURE__ */ jsxs4("div", { className: "thread-graph-molecule-playback-row", children: [
                /* @__PURE__ */ jsxs4(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    className: "thread-graph-molecule-play-button",
                    "aria-label": isPlaying ? "Pause trajectory" : "Play trajectory",
                    onClick: () => {
                      if (!isPlaying && currentIndex === xyzArray.length - 1) setCurrentIndex(0);
                      setIsPlaying((current) => !current);
                    },
                    children: [
                      isPlaying ? /* @__PURE__ */ jsx6(Pause, { className: "size-4" }) : /* @__PURE__ */ jsx6(Play, { className: "size-4" }),
                      isPlaying ? "Pause" : "Play"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs4("span", { className: "thread-graph-molecule-frame-count", children: [
                  "Frame ",
                  /* @__PURE__ */ jsx6("strong", { children: currentIndex + 1 }),
                  " / ",
                  xyzArray.length
                ] }),
                /* @__PURE__ */ jsx6("div", { className: "thread-graph-molecule-frame-buttons", children: [
                  { label: "First frame", index: 0, Icon: SkipBack, disabled: currentIndex === 0 },
                  { label: "Previous frame", index: currentIndex - 1, Icon: ChevronLeft, disabled: currentIndex === 0 },
                  { label: "Next frame", index: currentIndex + 1, Icon: ChevronRight, disabled: currentIndex === xyzArray.length - 1 },
                  { label: "Last frame", index: xyzArray.length - 1, Icon: SkipForward, disabled: currentIndex === xyzArray.length - 1 }
                ].map(({ label, index, Icon, disabled }) => /* @__PURE__ */ jsx6(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    className: "thread-graph-molecule-button",
                    "aria-label": label,
                    title: label,
                    disabled,
                    onClick: () => {
                      setIsPlaying(false);
                      setCurrentIndex(index);
                    },
                    children: /* @__PURE__ */ jsx6(Icon, { className: "size-4" })
                  },
                  label
                )) })
              ] }),
              /* @__PURE__ */ jsx6(
                "input",
                {
                  type: "range",
                  className: "thread-graph-molecule-scrubber",
                  min: 1,
                  max: xyzArray.length,
                  step: 1,
                  value: currentIndex + 1,
                  "aria-label": "Trajectory frame",
                  "aria-valuetext": `Frame ${currentIndex + 1} of ${xyzArray.length}`,
                  style: { backgroundSize: `${currentIndex / (xyzArray.length - 1) * 100}% 6px` },
                  onChange: (event) => {
                    setIsPlaying(false);
                    setCurrentIndex(Number(event.target.value) - 1);
                  }
                }
              ),
              /* @__PURE__ */ jsxs4("div", { className: "thread-graph-molecule-frame-scale", "aria-hidden": "true", children: [
                /* @__PURE__ */ jsx6("span", { children: "1" }),
                /* @__PURE__ */ jsxs4("span", { children: [
                  xyzArray.length,
                  " frames"
                ] })
              ] })
            ] }) : null,
            presentation === "workspace" && /* @__PURE__ */ jsx6(
              GraphMoleculeViewerLowerButtonGroup,
              {
                cameraInfo,
                onClearSelection: () => setSelectedSerials([]),
                onClearStaged: () => setStagedSelections({}),
                onSendSelection: () => onSelectionChange?.({ moleculeId, atoms: selectedSerials }),
                onSendStaged: () => {
                  Object.entries(stagedSelections).forEach(([key, atoms]) => {
                    onSelectionChange?.({
                      moleculeId: key === "current" ? moleculeId : key,
                      atoms
                    });
                  });
                },
                onStageSelection: handleStageSelection,
                onToggleUnitCell: handleToggleUnitCell,
                selectedAtomLabels,
                selectedSerials,
                stagedAtoms,
                stagedMolecules,
                unitCellAvailable,
                unitCellVisible
              }
            )
          ] })
        ] })
      ]
    }
  );
}

export {
  readGraphMoleculeViewerData,
  GraphMoleculeViewer
};

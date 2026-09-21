// src/components/graph-workspace/GraphResizablePanels.tsx
import { GripVerticalIcon } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";
import { jsx } from "react/jsx-runtime";
function classNames(...values) {
  return values.filter(Boolean).join(" ");
}
function ResizablePanelGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ResizablePrimitive.PanelGroup,
    {
      "data-slot": "resizable-panel-group",
      className: classNames(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className
      ),
      ...props
    }
  );
}
function ResizablePanel({
  ...props
}) {
  return /* @__PURE__ */ jsx(ResizablePrimitive.Panel, { "data-slot": "resizable-panel", ...props });
}
function ResizableHandle({
  withHandle,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ResizablePrimitive.PanelResizeHandle,
    {
      "data-slot": "resizable-handle",
      className: classNames(
        "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        className
      ),
      ...props,
      children: withHandle ? /* @__PURE__ */ jsx("div", { className: "bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border", children: /* @__PURE__ */ jsx(GripVerticalIcon, { className: "size-2.5" }) }) : null
    }
  );
}

// src/components/workspacePaths.ts
function normalizeFileSystemPath(value) {
  return value.trim().replace(/\\/g, "/").replace(/^\/([a-z]:\/)/i, "$1");
}
var APP_LOCAL_PATH_PREFIXES = [
  "/api/",
  "/assets/",
  "/control-plane",
  "/devices/",
  "/relay/",
  "/relay-account",
  "/relay-admin",
  "/relay-devices",
  "/relay-portal",
  "/threads",
  "/workspaces"
];
function localFileHref(value, origin) {
  let candidate = value.trim();
  if (!candidate || candidate.startsWith("#") || candidate.startsWith("//")) return null;
  if (/^(https?:|file:)/i.test(candidate)) {
    try {
      const url = new URL(candidate);
      if (url.protocol !== "file:" && url.origin !== origin) return null;
      candidate = (url.protocol === "file:" && url.hostname ? `//${url.hostname}` : "") + url.pathname + url.hash;
    } catch {
      return null;
    }
  } else {
    candidate = candidate.split("?")[0] ?? "";
  }
  try {
    candidate = decodeURIComponent(candidate);
  } catch {
  }
  candidate = normalizeFileSystemPath(candidate);
  if (/^[a-z][a-z+.-]*:/i.test(candidate) && !/^[a-z]:\//i.test(candidate)) return null;
  if (APP_LOCAL_PATH_PREFIXES.some((prefix) => candidate === prefix || candidate.startsWith(prefix))) return null;
  return candidate || null;
}
function relativeWorkspacePath(value, workspaceRoot) {
  let path = normalizeFileSystemPath(value);
  const root = normalizeFileSystemPath(workspaceRoot).replace(/\/+$/, "");
  const absolute = path.startsWith("/") || /^[a-z]:\//i.test(path);
  if (absolute) {
    const windows = /^[a-z]:\//i.test(root) || root.startsWith("//");
    const comparePath = windows ? path.toLowerCase() : path;
    const compareRoot = windows ? root.toLowerCase() : root;
    if (comparePath === compareRoot) return "";
    if (!comparePath.startsWith(`${compareRoot}/`)) return null;
    path = path.slice(root.length + 1);
  }
  const segments = [];
  for (const part of path.split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") {
      if (!segments.length) return null;
      segments.pop();
    } else segments.push(part);
  }
  return segments.join("/");
}
function workspaceDisplayPath(path, root) {
  const relative = relativeWorkspacePath(path, root);
  return relative === null ? null : `./${relative}`;
}

// src/components/graph-workspace/workspaceTree.ts
var MOLECULAR_EXTENSIONS = /* @__PURE__ */ new Set(["xyz", "extxyz", "cif", "pdb", "sdf", "mol"]);
var IMAGE_EXTENSIONS = /* @__PURE__ */ new Set([
  "png",
  "jpg",
  "jpeg",
  "gif",
  "webp",
  "svg"
]);
var PDF_EXTENSIONS = /* @__PURE__ */ new Set(["pdf"]);
function collectArtifacts(detail) {
  const artifacts = [];
  for (const turn of detail.turns) {
    for (const item of turn.items) {
      if (item.kind === "artifact" && item.artifact) {
        artifacts.push(item.artifact);
      }
    }
  }
  for (const item of detail.liveItems?.items ?? []) {
    if (item.kind === "artifact" && item.artifact) {
      artifacts.push(item.artifact);
    }
  }
  return artifacts;
}
function sanitizePathSegment(value) {
  return value.trim().replace(/^\/+|\/+$/g, "").replace(/[^\w.-]+/g, "-").replace(/^-+|-+$/g, "").toLowerCase();
}
function extensionOf(path) {
  return path.split(".").pop()?.toLowerCase() || "";
}
function fileNameFromPath(path) {
  return path.split("/").filter(Boolean).at(-1) ?? path;
}
function workspaceTreeNodeToGraphNode(node) {
  const kind = node.kind === "directory" ? "directory" : "file";
  const normalized = normalizeFileSystemPath(node.path);
  const path = normalized.startsWith("/") || /^[a-z]:\//i.test(normalized) ? normalized : relativeWorkspacePath(normalized, "") ?? normalized;
  const children = (node.children ?? []).map(workspaceTreeNodeToGraphNode);
  return {
    id: `workspace:${path}`,
    name: node.name,
    path,
    kind,
    ...node.size !== void 0 ? { size: node.size } : {},
    ...node.hasChildren !== void 0 ? { hasChildren: node.hasChildren } : kind === "directory" ? { hasChildren: children.length > 0 } : {},
    ...node.childrenLoaded !== void 0 ? { childrenLoaded: node.childrenLoaded } : kind === "directory" ? { childrenLoaded: node.children !== void 0 } : {},
    ...node.truncated !== void 0 ? { truncated: node.truncated } : {},
    workspaceNode: { ...node, path },
    children
  };
}
function findFirstWorkspaceFile(node) {
  if (node.kind === "file") {
    return node;
  }
  for (const child of node.children) {
    const found = findFirstWorkspaceFile(child);
    if (found) {
      return found;
    }
  }
  return null;
}
function normalizeWorkspacePath(path) {
  return path.trim().replace(/\\/g, "/").replace(/^\.\/+/, "").replace(/^\/+/, "");
}
function workspaceRelativeFocusPath(path, workspaceRootPath) {
  return relativeWorkspacePath(path, workspaceRootPath) ?? normalizeFileSystemPath(path);
}
function ancestorDirectoryPaths(path) {
  const normalized = normalizeWorkspacePath(path);
  const segments = normalized.split("/").filter(Boolean);
  segments.pop();
  const paths = [];
  let current = "";
  for (const segment of segments) {
    current = current ? `${current}/${segment}` : segment;
    paths.push(current);
  }
  return paths;
}
function hasWorkspacePath(node, targetPath) {
  if (!node || !targetPath) {
    return false;
  }
  if (node.path === targetPath) {
    return true;
  }
  return node.children.some((child) => hasWorkspacePath(child, targetPath));
}
function buildMoleculePreviewSnapshot(file) {
  if (!file) {
    return null;
  }
  const extension = extensionOf(file.path);
  if (!MOLECULAR_EXTENSIONS.has(extension)) {
    return null;
  }
  return {
    content: [file.content.endsWith("\n") ? file.content : `${file.content}
`],
    format: extension === "extxyz" ? "xyz" : extension,
    name: file.name,
    uuid: file.path
  };
}
function languageForPath(path) {
  const extension = extensionOf(path);
  if (extension === "tsx" || extension === "jsx") {
    return "tsx";
  }
  if (extension === "yml") {
    return "yaml";
  }
  return extension || "text";
}
function ensureDirectory(root, segments) {
  let current = root;
  let path = "";
  for (const segment of segments) {
    path = path ? `${path}/${segment}` : segment;
    let child = current.children.find(
      (node) => node.kind === "directory" && node.name === segment
    );
    if (!child) {
      child = {
        id: `dir:${path}`,
        name: segment,
        path,
        kind: "directory",
        children: []
      };
      current.children.push(child);
    }
    current = child;
  }
  return current;
}
function addPathNode(root, path, node) {
  const segments = path.split("/").filter(Boolean);
  const fileName = segments.pop() ?? node.name;
  const parent = ensureDirectory(root, segments);
  parent.children.push({
    ...node,
    name: node.name || fileName,
    path
  });
}
function compareWorkspaceNodes(left, right) {
  if (left.kind === "directory" && right.kind !== "directory") {
    return -1;
  }
  if (left.kind !== "directory" && right.kind === "directory") {
    return 1;
  }
  return left.name.localeCompare(right.name);
}
function sortWorkspaceTree(node) {
  node.children.sort(compareWorkspaceNodes);
  for (const child of node.children) {
    sortWorkspaceTree(child);
  }
  return node;
}
function collectWorkspaceItems(detail, artifacts, status, activeView) {
  const root = {
    id: "root",
    name: detail.workspace.label ?? "Workspace",
    path: "",
    kind: "directory",
    children: []
  };
  const artifactRoot = {
    id: "artifacts",
    name: "artifacts",
    path: "artifacts",
    kind: "directory",
    children: []
  };
  for (const artifact of artifacts) {
    const title = artifact.title || artifact.id;
    const safeName = sanitizePathSegment(title) || artifact.id;
    artifactRoot.children.push({
      id: `artifact:${artifact.id}`,
      name: `${safeName}.artifact`,
      path: `artifacts/${safeName}.artifact`,
      kind: "artifact",
      artifact,
      preview: artifact.summaryText ?? artifact.type,
      detail: JSON.stringify(artifact.payload, null, 2),
      children: []
    });
  }
  const eventRoot = {
    id: "thread-events",
    name: "thread-events",
    path: "thread-events",
    kind: "directory",
    children: []
  };
  const liveRoot = {
    id: "live",
    name: "live",
    path: "live",
    kind: "directory",
    children: []
  };
  let sequence = 0;
  const addEventNode = (turnId, item, live = false) => {
    sequence += 1;
    const label = item.kind.replace(/([A-Z])/g, "-$1").toLowerCase();
    const eventPath = `${live ? "live" : `thread-events/${turnId}`}/${String(
      sequence
    ).padStart(3, "0")}-${label}.json`;
    const preview = "text" in item && typeof item.text === "string" ? item.text.slice(0, 160) : item.kind;
    const artifact = item.kind === "artifact" && item.artifact ? item.artifact : null;
    const node = artifact && live ? {
      id: `live-artifact:${artifact.id}`,
      name: artifact.title || artifact.id,
      path: eventPath,
      kind: "live-artifact",
      artifact,
      item,
      preview: artifact.summaryText ?? artifact.type,
      detail: JSON.stringify(artifact.payload, null, 2),
      children: []
    } : {
      id: `event:${item.id}`,
      name: fileNameFromPath(eventPath),
      path: eventPath,
      kind: "event",
      item,
      preview,
      detail: JSON.stringify(item, null, 2),
      children: []
    };
    if (live) {
      liveRoot.children.push(node);
      return;
    }
    addPathNode(eventRoot, eventPath.replace(/^thread-events\//, ""), node);
  };
  for (const turn of detail.turns) {
    for (const item of turn.items) {
      if (item.kind === "commandExecution" || item.kind === "webSearch" || item.kind === "fileRead" || item.kind === "fileChange" || item.kind === "agentToolCall" || item.kind === "skillToolCall" || item.kind === "toolCall" || item.kind === "hook" || item.kind === "plan" || item.kind === "reasoning") {
        addEventNode(turn.id, item);
      }
    }
  }
  for (const item of detail.liveItems?.items ?? []) {
    addEventNode(detail.thread.activeTurnId ?? "live", item, true);
  }
  void status;
  void activeView;
  root.children.push(artifactRoot, eventRoot, liveRoot);
  return sortWorkspaceTree(root);
}
function flattenWorkspaceNodes(root) {
  const map = /* @__PURE__ */ new Map();
  const visit = (node) => {
    map.set(node.id, node);
    for (const child of node.children) {
      visit(child);
    }
  };
  visit(root);
  return map;
}
function findFirstPreviewNode(node) {
  if (node.kind === "artifact" || node.kind === "live-artifact" || node.kind === "event" || node.kind === "file") {
    return node;
  }
  for (const child of node.children) {
    const found = findFirstPreviewNode(child);
    if (found) {
      return found;
    }
  }
  return null;
}
function collectAncestorPaths(path) {
  const segments = path.split("/").filter(Boolean);
  const paths = [];
  for (let index = 1; index <= segments.length; index += 1) {
    paths.push(segments.slice(0, index).join("/"));
  }
  return paths;
}

// src/components/ZoomableImage.tsx
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Minus, Plus, RotateCcw, X } from "lucide-react";
import { Fragment, jsx as jsx2, jsxs } from "react/jsx-runtime";
var IMAGE_LIGHTBOX_MIN_SCALE = 0.5;
var IMAGE_LIGHTBOX_MAX_SCALE = 5;
var IMAGE_LIGHTBOX_SCALE_STEP = 0.25;
function clampImageLightboxScale(scale) {
  return Math.min(
    IMAGE_LIGHTBOX_MAX_SCALE,
    Math.max(IMAGE_LIGHTBOX_MIN_SCALE, scale)
  );
}
function GraphWorkspaceImageLightbox({
  alt,
  onClose,
  src
}) {
  const viewportRef = useRef(null);
  const closeButtonRef = useRef(null);
  const dragRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);
  function resetView() {
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }
  function updateScale(nextScale, clientX, clientY) {
    const clampedScale = clampImageLightboxScale(nextScale);
    if (clampedScale === scale) {
      return;
    }
    if (typeof clientX === "number" && typeof clientY === "number" && viewportRef.current) {
      const rect = viewportRef.current.getBoundingClientRect();
      const anchorX = clientX - (rect.left + rect.width / 2);
      const anchorY = clientY - (rect.top + rect.height / 2);
      const ratio = clampedScale / scale;
      setOffset((current) => ({
        x: anchorX - (anchorX - current.x) * ratio,
        y: anchorY - (anchorY - current.y) * ratio
      }));
    }
    setScale(clampedScale);
  }
  function handleWheel(event) {
    event.preventDefault();
    const direction = event.deltaY < 0 ? 1 : -1;
    updateScale(
      scale + direction * IMAGE_LIGHTBOX_SCALE_STEP,
      event.clientX,
      event.clientY
    );
  }
  function handlePointerDown(event) {
    if (scale <= 1 || event.button !== 0) {
      return;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startOffsetX: offset.x,
      startOffsetY: offset.y
    };
    setDragging(true);
  }
  function handlePointerMove(event) {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }
    setOffset({
      x: drag.startOffsetX + event.clientX - drag.startClientX,
      y: drag.startOffsetY + event.clientY - drag.startClientY
    });
  }
  function handlePointerEnd(event) {
    if (dragRef.current?.pointerId !== event.pointerId) {
      return;
    }
    dragRef.current = null;
    setDragging(false);
  }
  return createPortal(
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "thread-graph-image-lightbox",
        role: "dialog",
        "aria-modal": "true",
        "aria-label": `Image preview: ${alt || "workspace image"}`,
        children: [
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "thread-graph-image-lightbox-toolbar",
              role: "toolbar",
              "aria-label": "Image zoom controls",
              children: [
                /* @__PURE__ */ jsx2(
                  "button",
                  {
                    type: "button",
                    onClick: () => updateScale(scale - IMAGE_LIGHTBOX_SCALE_STEP),
                    disabled: scale <= IMAGE_LIGHTBOX_MIN_SCALE,
                    title: "Zoom out",
                    "aria-label": "Zoom out",
                    children: /* @__PURE__ */ jsx2(Minus, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: resetView,
                    className: "thread-graph-image-lightbox-scale",
                    title: "Reset zoom",
                    "aria-label": `Reset zoom, currently ${Math.round(scale * 100)}%`,
                    children: [
                      /* @__PURE__ */ jsx2(RotateCcw, { className: "h-3.5 w-3.5" }),
                      /* @__PURE__ */ jsxs("span", { children: [
                        Math.round(scale * 100),
                        "%"
                      ] })
                    ]
                  }
                ),
                /* @__PURE__ */ jsx2(
                  "button",
                  {
                    type: "button",
                    onClick: () => updateScale(scale + IMAGE_LIGHTBOX_SCALE_STEP),
                    disabled: scale >= IMAGE_LIGHTBOX_MAX_SCALE,
                    title: "Zoom in",
                    "aria-label": "Zoom in",
                    children: /* @__PURE__ */ jsx2(Plus, { className: "h-4 w-4" })
                  }
                ),
                /* @__PURE__ */ jsx2(
                  "span",
                  {
                    className: "thread-graph-image-lightbox-divider",
                    "aria-hidden": "true"
                  }
                ),
                /* @__PURE__ */ jsx2(
                  "button",
                  {
                    ref: closeButtonRef,
                    type: "button",
                    onClick: onClose,
                    title: "Close image preview",
                    "aria-label": "Close image preview",
                    children: /* @__PURE__ */ jsx2(X, { className: "h-4 w-4" })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx2(
            "div",
            {
              ref: viewportRef,
              className: "thread-graph-image-lightbox-viewport",
              onClick: (event) => {
                if (event.target === event.currentTarget) {
                  onClose();
                }
              },
              onWheel: handleWheel,
              children: /* @__PURE__ */ jsx2(
                "img",
                {
                  src,
                  alt,
                  draggable: false,
                  className: dragging ? "is-dragging" : "",
                  onPointerDown: handlePointerDown,
                  onPointerMove: handlePointerMove,
                  onPointerUp: handlePointerEnd,
                  onPointerCancel: handlePointerEnd,
                  style: {
                    transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`
                  }
                }
              )
            }
          )
        ]
      }
    ),
    document.body
  );
}
function ZoomableImage({
  alt,
  className,
  loading,
  src
}) {
  const triggerRef = useRef(null);
  const [open, setOpen] = useState(false);
  function closeLightbox() {
    setOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx2(
      "button",
      {
        ref: triggerRef,
        type: "button",
        className: "thread-graph-zoomable-image-trigger",
        onClick: () => setOpen(true),
        title: "Open image preview",
        "aria-label": `Open image preview: ${alt || "workspace image"}`,
        children: /* @__PURE__ */ jsx2("img", { src, alt, className, loading })
      }
    ),
    open ? /* @__PURE__ */ jsx2(
      GraphWorkspaceImageLightbox,
      {
        src,
        alt,
        onClose: closeLightbox
      }
    ) : null
  ] });
}

// src/components/graph-chat/graphChatShiki.ts
var graphChatHighlighterPromise = null;
function getGraphChatHighlighter() {
  graphChatHighlighterPromise ??= Promise.all([
    import("shiki/core"),
    import("shiki/engine/javascript"),
    import("shiki/themes/ayu-light.mjs"),
    import("shiki/themes/ayu-dark.mjs"),
    import("shiki/langs/javascript.mjs"),
    import("shiki/langs/typescript.mjs"),
    import("shiki/langs/tsx.mjs"),
    import("shiki/langs/jsx.mjs"),
    import("shiki/langs/python.mjs"),
    import("shiki/langs/json.mjs"),
    import("shiki/langs/bash.mjs"),
    import("shiki/langs/shellscript.mjs"),
    import("shiki/langs/yaml.mjs"),
    import("shiki/langs/toml.mjs"),
    import("shiki/langs/markdown.mjs"),
    import("shiki/langs/html.mjs"),
    import("shiki/langs/css.mjs"),
    import("shiki/langs/sql.mjs"),
    import("shiki/langs/csv.mjs"),
    import("shiki/langs/ruby.mjs"),
    import("shiki/langs/rust.mjs"),
    import("shiki/langs/go.mjs"),
    import("shiki/langs/java.mjs"),
    import("shiki/langs/c.mjs"),
    import("shiki/langs/cpp.mjs"),
    import("shiki/langs/csharp.mjs"),
    import("shiki/langs/xml.mjs")
  ]).then(
    ([
      { createHighlighterCore },
      { createJavaScriptRegexEngine },
      ayuLight,
      ayuDark,
      javascript,
      typescript,
      tsx,
      jsx4,
      python,
      json,
      bash,
      shellscript,
      yaml,
      toml,
      markdown,
      html,
      css,
      sql,
      csv,
      ruby,
      rust,
      go,
      java,
      c,
      cpp,
      csharp,
      xml
    ]) => createHighlighterCore({
      engine: createJavaScriptRegexEngine(),
      themes: [ayuLight.default, ayuDark.default],
      langs: [
        javascript.default,
        typescript.default,
        tsx.default,
        jsx4.default,
        python.default,
        json.default,
        bash.default,
        shellscript.default,
        yaml.default,
        toml.default,
        markdown.default,
        html.default,
        css.default,
        sql.default,
        csv.default,
        ruby.default,
        rust.default,
        go.default,
        java.default,
        c.default,
        cpp.default,
        csharp.default,
        xml.default
      ]
    })
  );
  return graphChatHighlighterPromise;
}

// src/components/externalLinkProps.ts
function externalLinkProps(href) {
  if (!href) return {};
  try {
    const origin = typeof window === "undefined" ? void 0 : window.location.origin;
    const url = new URL(href, origin);
    if ((url.protocol === "http:" || url.protocol === "https:") && url.origin !== origin) {
      return { target: "_blank", rel: "noopener noreferrer" };
    }
  } catch {
  }
  return {};
}

// src/components/WorkspaceFileLink.tsx
import { useEffect as useEffect2, useRef as useRef2, useState as useState2 } from "react";
import { createPortal as createPortal2 } from "react-dom";
import { Fragment as Fragment2, jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function WorkspaceFileLink({ path, line, children, onOpen, className = "thread-inline-link" }) {
  const [menu, setMenu] = useState2(null);
  const [copyError, setCopyError] = useState2(false);
  const menuRef = useRef2(null);
  const displayPath = path.startsWith("/") || /^[a-z]:/i.test(path) ? path : `./${path.replace(/^\.\//, "")}`;
  const address = displayPath + (line ? `#L${line}` : "");
  useEffect2(() => {
    if (!menu) return;
    const dismiss = (event) => {
      if (!menuRef.current?.contains(event.target)) setMenu(null);
    };
    const key = (event) => {
      if (event.key === "Escape") setMenu(null);
    };
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", key);
    window.addEventListener("scroll", dismiss, true);
    menuRef.current?.querySelector("button")?.focus();
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", key);
      window.removeEventListener("scroll", dismiss, true);
    };
  }, [menu]);
  const open = () => {
    setMenu(null);
    onOpen({ path, ...line ? { line } : {} });
  };
  return /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsx3(
      "a",
      {
        href: displayPath.split("/").map(encodeURIComponent).join("/") + (line ? `#L${line}` : ""),
        title: address,
        className,
        onClick: (event) => {
          event.preventDefault();
          open();
        },
        onContextMenu: (event) => {
          event.preventDefault();
          setCopyError(false);
          setMenu({ x: Math.min(event.clientX, window.innerWidth - 190), y: Math.min(event.clientY, window.innerHeight - 100) });
        },
        children
      }
    ),
    menu && createPortal2(/* @__PURE__ */ jsxs2("div", { ref: menuRef, role: "menu", "aria-label": "File link", className: "thread-workspace-link-menu", style: { left: Math.max(8, menu.x), top: Math.max(8, menu.y) }, children: [
      /* @__PURE__ */ jsx3("button", { role: "menuitem", onClick: open, children: "Open file" }),
      /* @__PURE__ */ jsx3("button", { role: "menuitem", onClick: () => {
        void navigator.clipboard.writeText(address).then(() => setMenu(null)).catch(() => setCopyError(true));
      }, children: "Copy link address" }),
      copyError && /* @__PURE__ */ jsx3("span", { role: "alert", children: "Could not copy path" })
    ] }), document.body)
  ] });
}

export {
  GraphWorkspaceImageLightbox,
  ZoomableImage,
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
  getGraphChatHighlighter,
  normalizeFileSystemPath,
  localFileHref,
  relativeWorkspacePath,
  workspaceDisplayPath,
  MOLECULAR_EXTENSIONS,
  IMAGE_EXTENSIONS,
  PDF_EXTENSIONS,
  collectArtifacts,
  extensionOf,
  workspaceTreeNodeToGraphNode,
  findFirstWorkspaceFile,
  workspaceRelativeFocusPath,
  ancestorDirectoryPaths,
  hasWorkspacePath,
  buildMoleculePreviewSnapshot,
  languageForPath,
  collectWorkspaceItems,
  flattenWorkspaceNodes,
  findFirstPreviewNode,
  collectAncestorPaths,
  externalLinkProps,
  WorkspaceFileLink
};

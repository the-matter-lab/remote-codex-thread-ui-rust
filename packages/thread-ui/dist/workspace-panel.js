import {
  IMAGE_EXTENSIONS,
  MOLECULAR_EXTENSIONS,
  PDF_EXTENSIONS,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  WorkspaceFileLink,
  ZoomableImage,
  ancestorDirectoryPaths,
  buildMoleculePreviewSnapshot,
  collectAncestorPaths,
  collectArtifacts,
  collectWorkspaceItems,
  extensionOf,
  externalLinkProps,
  findFirstPreviewNode,
  findFirstWorkspaceFile,
  flattenWorkspaceNodes,
  getGraphChatHighlighter,
  hasWorkspacePath,
  languageForPath,
  localFileHref,
  normalizeFileSystemPath,
  relativeWorkspacePath,
  workspaceDisplayPath,
  workspaceRelativeFocusPath,
  workspaceTreeNodeToGraphNode
} from "./chunk-32RNZQEK.js";
import {
  GraphMoleculeViewer
} from "./chunk-KHNRBZ77.js";
import "./chunk-TZBWAOOO.js";

// src/components/ThreadGraphWorkspacePanel.tsx
import { memo as memo2, useEffect as useEffect8, useMemo as useMemo7, useState as useState9 } from "react";
import {
  GitBranch,
  Paperclip,
  Terminal,
  Trash2 as Trash22,
  Wrench
} from "lucide-react";

// src/components/graph-workspace/GraphWorkspaceExplorer.tsx
import * as Dialog2 from "@radix-ui/react-dialog";
import { useEffect as useEffect6, useLayoutEffect as useLayoutEffect2, useRef as useRef7, useState as useState8 } from "react";

// src/components/graph-workspace/explorer/useWorkspaceExplorerController.ts
import { useCallback, useEffect, useMemo as useMemo2, useRef, useState } from "react";

// src/components/graph-workspace/explorer/workspaceExplorerModel.ts
function sourceWithoutChildren(node) {
  const source = { ...node };
  delete source.children;
  return source;
}
function childrenStateForNode(node) {
  if (node.kind !== "directory") {
    return "resolved";
  }
  if (node.childrenLoaded === true || node.children.length > 0) {
    return "resolved";
  }
  if (node.childrenLoaded === false || node.hasChildren) {
    return "unresolved";
  }
  return "resolved";
}
function copyPreviousSubtree(previous, nodeId, parentId, nodes, pathToId) {
  const previousNode = previous.nodes.get(nodeId);
  if (!previousNode) {
    return;
  }
  const copy = {
    ...previousNode,
    parentId,
    childIds: [...previousNode.childIds]
  };
  nodes.set(copy.id, copy);
  pathToId.set(copy.path, copy.id);
  for (const childId of copy.childIds) {
    copyPreviousSubtree(previous, childId, copy.id, nodes, pathToId);
  }
}
function createWorkspaceExplorerModel(root, previous = null) {
  const nodes = /* @__PURE__ */ new Map();
  const pathToId = /* @__PURE__ */ new Map();
  const visit = (node, parentId) => {
    const previousId = previous?.pathToId.get(node.path);
    const previousNode = previousId ? previous?.nodes.get(previousId) : void 0;
    const incomingChildrenState = childrenStateForNode(node);
    const canPreserveResolvedChildren = node.kind === "directory" && incomingChildrenState === "unresolved" && previousNode?.kind === "directory" && previousNode.childrenState === "resolved";
    const childIds = canPreserveResolvedChildren ? [...previousNode.childIds] : node.children.map((child) => child.id);
    const record = {
      id: node.id,
      parentId,
      name: node.name,
      path: node.path,
      kind: node.kind,
      childIds,
      childrenState: canPreserveResolvedChildren ? "resolved" : incomingChildrenState,
      hasChildren: node.hasChildren ?? (canPreserveResolvedChildren ? previousNode.hasChildren : childIds.length > 0),
      truncated: node.truncated ?? previousNode?.truncated ?? false,
      requestGeneration: previousNode?.requestGeneration ?? 0,
      source: sourceWithoutChildren(node)
    };
    nodes.set(record.id, record);
    pathToId.set(record.path, record.id);
    if (canPreserveResolvedChildren && previous) {
      for (const childId of childIds) {
        copyPreviousSubtree(previous, childId, record.id, nodes, pathToId);
      }
      return;
    }
    for (const child of node.children) {
      visit(child, record.id);
    }
  };
  visit(root, null);
  return { rootId: root.id, nodes, pathToId };
}
function workspaceExplorerModelToTree(model) {
  const visit = (nodeId) => {
    const record = model.nodes.get(nodeId);
    if (!record) {
      throw new Error(`Workspace explorer node is missing: ${nodeId}`);
    }
    const tree = {
      ...record.source,
      children: record.childIds.map(visit)
    };
    if (record.kind === "directory") {
      tree.childrenLoaded = record.childrenState === "resolved";
      tree.hasChildren = record.hasChildren;
    } else if (record.source.hasChildren !== void 0) {
      tree.hasChildren = record.hasChildren;
    }
    if (record.truncated || record.source.truncated !== void 0) {
      tree.truncated = record.truncated;
    }
    return tree;
  };
  return visit(model.rootId);
}
function findWorkspaceExplorerNodeByPath(model, path) {
  if (!model || path === null) {
    return null;
  }
  const id = model.pathToId.get(path);
  return id ? model.nodes.get(id) ?? null : null;
}
function hasWorkspaceExplorerPath(model, path) {
  return Boolean(model && path !== null && model.pathToId.has(path));
}
function replaceTreeNodeByPath(node, path, replacement) {
  if (node.path === path) {
    return replacement;
  }
  let changed = false;
  const children = node.children.map((child) => {
    const next = replaceTreeNodeByPath(child, path, replacement);
    changed ||= next !== child;
    return next;
  });
  return changed ? { ...node, children } : node;
}
function mergeWorkspaceExplorerSubtree(model, subtree) {
  const existing = findWorkspaceExplorerNodeByPath(model, subtree.path);
  if (!existing) {
    return model;
  }
  subtree = { ...subtree, id: existing.id, name: existing.name, path: existing.path };
  const root = workspaceExplorerModelToTree(model);
  return createWorkspaceExplorerModel(
    replaceTreeNodeByPath(root, subtree.path, subtree),
    model
  );
}

// src/components/graph-workspace/explorer/useWorkspaceExplorerPersistence.ts
import { useMemo } from "react";
var STORAGE_PREFIX = "remote-codex:graphchat:workspace:expanded:";
var MAX_PERSISTED_EXPANDED_PATHS = 500;
function storageKey(identity) {
  return `${STORAGE_PREFIX}${identity.workspaceId ?? "workspace"}:${identity.threadId}`;
}
function readWorkspaceExplorerState(identity) {
  const fallback = {
    version: 2,
    expandedPaths: []
  };
  if (typeof window === "undefined") {
    return fallback;
  }
  try {
    const raw = window.localStorage.getItem(storageKey(identity));
    if (!raw) {
      return fallback;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return {
        version: 2,
        expandedPaths: parsed.filter((value) => typeof value === "string").slice(0, MAX_PERSISTED_EXPANDED_PATHS)
      };
    }
    if (!parsed || typeof parsed !== "object") {
      return fallback;
    }
    const candidate = parsed;
    if (candidate.version !== 2 || !Array.isArray(candidate.expandedPaths)) {
      return fallback;
    }
    const selectedPath = typeof candidate.selectedPath === "string" ? candidate.selectedPath : void 0;
    const filterMode = candidate.filterMode === "filter" || candidate.filterMode === "highlight" ? candidate.filterMode : void 0;
    return {
      version: 2,
      expandedPaths: candidate.expandedPaths.filter((value) => typeof value === "string").slice(0, MAX_PERSISTED_EXPANDED_PATHS),
      ...selectedPath ? { selectedPath } : {},
      ...filterMode ? { filterMode } : {}
    };
  } catch {
    return fallback;
  }
}
function writeWorkspaceExplorerState(identity, state) {
  if (typeof window === "undefined") {
    return;
  }
  const expandedPaths = [...new Set(state.expandedPaths)].filter((path) => path.length > 0).slice(0, MAX_PERSISTED_EXPANDED_PATHS);
  const value = {
    version: 2,
    expandedPaths,
    ...state.selectedPath ? { selectedPath: state.selectedPath } : {},
    ...state.filterMode ? { filterMode: state.filterMode } : {}
  };
  try {
    window.localStorage.setItem(storageKey(identity), JSON.stringify(value));
  } catch {
  }
}
function useWorkspaceExplorerPersistence(identity) {
  return useMemo(
    () => ({
      key: storageKey(identity),
      read: () => readWorkspaceExplorerState(identity),
      write: (state) => writeWorkspaceExplorerState(identity, state)
    }),
    [identity]
  );
}

// src/components/graph-workspace/explorer/workspaceOperationCapabilities.ts
function validateWorkspaceOperationCapabilities(capabilities) {
  const { archives, trash } = capabilities;
  if (archives !== void 0 && (archives.version !== 1 || !Array.isArray(archives.formats) || archives.formats.length > 2 || archives.formats.some((format) => format !== "tar" && format !== "zip") || new Set(archives.formats).size !== archives.formats.length)) {
    throw new Error(
      "Archive capability is unsupported. Refresh the workspace to retry discovery."
    );
  }
  if (trash !== void 0 && (trash.version !== 1 || ["files", "restore", "empty"].some(
    (key) => typeof trash[key] !== "boolean"
  ))) {
    throw new Error(
      "Trash capability is unsupported. Refresh the workspace to retry discovery."
    );
  }
  return capabilities;
}
function workspaceArchiveFormats(capabilities, operation) {
  if (!capabilities) return [];
  try {
    validateWorkspaceOperationCapabilities(capabilities);
  } catch {
    return [];
  }
  if (capabilities.archives) return capabilities.archives.formats;
  return (operation === "import" ? capabilities.archiveImport : capabilities.download.directory) === "tar" ? ["tar"] : [];
}
function workspaceTrashCapabilities(capabilities) {
  if (!capabilities) return null;
  try {
    validateWorkspaceOperationCapabilities(capabilities);
  } catch {
    return null;
  }
  return capabilities.trash ?? null;
}

// src/components/graph-workspace/explorer/useWorkspaceExplorerController.ts
function selectedPathForId(selectedId, nodeMap) {
  if (!selectedId) {
    return null;
  }
  const mappedPath = nodeMap.get(selectedId)?.path;
  if (mappedPath !== void 0) {
    return mappedPath;
  }
  return selectedId.startsWith("workspace:") ? selectedId.slice("workspace:".length) : null;
}
function useWorkspaceExplorerController({
  activeView,
  detail,
  artifacts,
  status,
  focusPathRequest = null,
  workspaceAdapter
}) {
  const workspaceIdentity = useMemo2(
    () => ({
      threadId: detail.thread.id,
      workspaceId: detail.workspace.id ?? detail.thread.workspaceId ?? null
    }),
    [detail.thread.id, detail.thread.workspaceId, detail.workspace.id]
  );
  const capabilityAdapter = workspaceAdapter;
  const [capabilityState, setCapabilityState] = useState(null);
  const discoveredCapabilities = capabilityState?.adapter === capabilityAdapter && capabilityState?.threadId === workspaceIdentity.threadId ? capabilityState.capabilities : capabilityAdapter?.getCapabilities ? null : capabilityAdapter?.capabilities ?? null;
  const capabilities = useMemo2(() => {
    if (!discoveredCapabilities) return null;
    try {
      return validateWorkspaceOperationCapabilities(discoveredCapabilities);
    } catch {
      return null;
    }
  }, [discoveredCapabilities]);
  const [capabilityEpoch, setCapabilityEpoch] = useState(0);
  const [capabilityError, setCapabilityError] = useState(null);
  useEffect(() => {
    let cancelled = false;
    setCapabilityState(null);
    setCapabilityError(null);
    if (!capabilityAdapter?.getCapabilities && capabilityAdapter?.capabilities) {
      try {
        validateWorkspaceOperationCapabilities(capabilityAdapter.capabilities);
      } catch (error) {
        setCapabilityError(error instanceof Error ? error.message : "Unsupported workspace capabilities.");
      }
    }
    if (capabilityAdapter?.getCapabilities) {
      void (async () => {
        try {
          const result = await capabilityAdapter.getCapabilities(
            workspaceIdentity.threadId
          );
          validateWorkspaceOperationCapabilities(result);
          if (!cancelled)
            setCapabilityState({
              adapter: capabilityAdapter,
              threadId: workspaceIdentity.threadId,
              capabilities: result
            });
        } catch (error) {
          if (!cancelled)
            setCapabilityError(
              error instanceof Error ? error.message : "Failed to discover file operations. Refresh the workspace to retry."
            );
        }
      })();
    }
    return () => {
      cancelled = true;
    };
  }, [capabilityAdapter, workspaceIdentity.threadId, capabilityEpoch]);
  const persistence = useWorkspaceExplorerPersistence(workspaceIdentity);
  const fallbackTree = useMemo2(
    () => collectWorkspaceItems(detail, artifacts, status, activeView),
    [activeView, artifacts, detail, status]
  );
  const fallbackFirstSelectableNode = findFirstPreviewNode(fallbackTree);
  const initialPersistedState = useRef(persistence.read());
  const [adapterModel, setAdapterModel] = useState(null);
  const adapterTree = useMemo2(
    () => adapterModel ? workspaceExplorerModelToTree(adapterModel) : null,
    [adapterModel]
  );
  const [linkedFiles, setLinkedFiles] = useState([]);
  const tree = useMemo2(() => {
    const root = adapterTree ? {
      ...adapterTree,
      children: [...adapterTree.children, ...fallbackTree.children]
    } : fallbackTree;
    return linkedFiles.length ? {
      ...root,
      children: [
        ...root.children,
        {
          id: "linked-files",
          path: "linked-files:",
          name: "Linked files",
          kind: "directory",
          children: linkedFiles,
          childrenLoaded: true,
          hasChildren: true
        }
      ]
    } : root;
  }, [adapterTree, fallbackTree, linkedFiles]);
  const nodeMap = useMemo2(() => flattenWorkspaceNodes(tree), [tree]);
  const [selectedNodeId, setSelectedNodeId] = useState(() => {
    const selectedPath = focusPathRequest ? workspaceRelativeFocusPath(
      focusPathRequest.path,
      detail.workspace.absPath
    ) : initialPersistedState.current.selectedPath;
    const virtualNode = [...flattenWorkspaceNodes(fallbackTree).values()].find(
      (node) => focusPathRequest?.artifactId !== void 0 ? node.artifact?.id === focusPathRequest.artifactId : node.path === selectedPath
    );
    return focusPathRequest?.artifactId !== void 0 ? virtualNode?.id ?? null : virtualNode?.id ?? (selectedPath ? `workspace:${selectedPath}` : fallbackFirstSelectableNode?.id ?? null);
  });
  const [expandedPaths, setExpandedPaths] = useState(
    () => /* @__PURE__ */ new Set([
      "",
      "artifacts:",
      "thread-events:",
      "live:",
      ...initialPersistedState.current.expandedPaths,
      ...collectAncestorPaths(fallbackFirstSelectableNode?.path ?? "")
    ])
  );
  const [filterQuery, setFilterQuery] = useState("");
  const [filterMode, setFilterMode] = useState(
    () => initialPersistedState.current.filterMode ?? "filter"
  );
  const [loadingTree, setLoadingTree] = useState(false);
  const [loadingDirectoryPaths, setLoadingDirectoryPaths] = useState(() => /* @__PURE__ */ new Set());
  const [directoryErrors, setDirectoryErrors] = useState(
    () => /* @__PURE__ */ new Map()
  );
  const [workspaceError, setWorkspaceError] = useState(null);
  const activeNode = selectedNodeId === null ? null : nodeMap.get(selectedNodeId) ?? null;
  const liveNodes = useMemo2(
    () => tree.children.find((node) => node.id === "live")?.children ?? [],
    [tree]
  );
  const adapterModelRef = useRef(adapterModel);
  const nodeMapRef = useRef(nodeMap);
  const treeRef = useRef(tree);
  const activeNodeRef = useRef(activeNode);
  const expandedPathsRef = useRef(expandedPaths);
  const loadingDirectoryPathsRef = useRef(loadingDirectoryPaths);
  const fallbackFirstSelectableNodeRef = useRef(fallbackFirstSelectableNode);
  const fallbackTreeRef = useRef(fallbackTree);
  const artifactFocusRef = useRef(null);
  adapterModelRef.current = adapterModel;
  nodeMapRef.current = nodeMap;
  treeRef.current = tree;
  activeNodeRef.current = activeNode;
  expandedPathsRef.current = expandedPaths;
  loadingDirectoryPathsRef.current = loadingDirectoryPaths;
  fallbackFirstSelectableNodeRef.current = fallbackFirstSelectableNode;
  fallbackTreeRef.current = fallbackTree;
  const refreshGenerationRef = useRef(0);
  const focusGenerationRef = useRef(0);
  const focusPendingRef = useRef(false);
  const handledFocusRequestRef = useRef(null);
  const workspaceGenerationRef = useRef(0);
  const directoryRequestGenerationsRef = useRef(/* @__PURE__ */ new Map());
  const skipPersistenceWriteRef = useRef(true);
  const refreshWorkspaceTree = useCallback(
    async (preferredPath) => {
      if (!workspaceAdapter) {
        return;
      }
      const workspaceGeneration = workspaceGenerationRef.current;
      const refreshGeneration = refreshGenerationRef.current + 1;
      refreshGenerationRef.current = refreshGeneration;
      const currentSelectedPath = preferredPath ?? activeNodeRef.current?.path ?? null;
      setLoadingTree(true);
      setWorkspaceError(null);
      try {
        const refreshedTree = workspaceTreeNodeToGraphNode(
          await workspaceAdapter.listTree({ ...workspaceIdentity, path: "" })
        );
        if (workspaceGenerationRef.current !== workspaceGeneration || refreshGenerationRef.current !== refreshGeneration) {
          return;
        }
        const currentModel = adapterModelRef.current;
        let nextModel = createWorkspaceExplorerModel(
          refreshedTree,
          currentModel
        );
        if (currentModel) {
          const expandedDirectories = [...expandedPathsRef.current].filter((path) => path).sort(
            (left, right) => left.split("/").length - right.split("/").length
          );
          for (const path of expandedDirectories) {
            const previousNode = findWorkspaceExplorerNodeByPath(
              currentModel,
              path
            );
            if (previousNode?.kind !== "directory" || previousNode.childrenState !== "resolved") {
              continue;
            }
            const refreshedNode = workspaceTreeNodeToGraphNode(
              await workspaceAdapter.listTree({ ...workspaceIdentity, path })
            );
            if (workspaceGenerationRef.current !== workspaceGeneration || refreshGenerationRef.current !== refreshGeneration) {
              return;
            }
            nextModel = mergeWorkspaceExplorerSubtree(nextModel, refreshedNode);
          }
        }
        const nextTree = workspaceExplorerModelToTree(nextModel);
        adapterModelRef.current = nextModel;
        setAdapterModel(nextModel);
        const firstFile = findFirstWorkspaceFile(nextTree);
        setSelectedNodeId((current) => {
          const virtualNodes = flattenWorkspaceNodes(fallbackTreeRef.current);
          if (current && virtualNodes.has(current)) return current;
          if (artifactFocusRef.current) return null;
          const fallbackPath = currentSelectedPath ?? selectedPathForId(current, nodeMapRef.current);
          const virtualNode = [...virtualNodes.values()].find(
            (node) => node.path === fallbackPath
          );
          if (virtualNode) return virtualNode.id;
          if (fallbackPath !== null && hasWorkspaceExplorerPath(nextModel, fallbackPath)) {
            return `workspace:${fallbackPath}`;
          }
          return firstFile?.id ?? null;
        });
      } catch (error) {
        if (workspaceGenerationRef.current !== workspaceGeneration || refreshGenerationRef.current !== refreshGeneration) {
          return;
        }
        setWorkspaceError(
          error instanceof Error ? error.message : "Failed to load workspace"
        );
        setAdapterModel(null);
      } finally {
        if (workspaceGenerationRef.current === workspaceGeneration && refreshGenerationRef.current === refreshGeneration) {
          setLoadingTree(false);
        }
      }
    },
    [workspaceAdapter, workspaceIdentity]
  );
  const loadDirectoryChildren = useCallback(
    async (path) => {
      if (!workspaceAdapter || !adapterModelRef.current) {
        return;
      }
      const workspaceGeneration = workspaceGenerationRef.current;
      const generation = (directoryRequestGenerationsRef.current.get(path) ?? 0) + 1;
      directoryRequestGenerationsRef.current.set(path, generation);
      setLoadingDirectoryPaths((current) => {
        if (current.has(path)) {
          return current;
        }
        const next = new Set(current);
        next.add(path);
        return next;
      });
      setWorkspaceError(null);
      setDirectoryErrors((current) => {
        if (!current.has(path)) {
          return current;
        }
        const next = new Map(current);
        next.delete(path);
        return next;
      });
      try {
        const loadedNode = workspaceTreeNodeToGraphNode(
          await workspaceAdapter.listTree({ ...workspaceIdentity, path })
        );
        if (workspaceGenerationRef.current !== workspaceGeneration || directoryRequestGenerationsRef.current.get(path) !== generation) {
          return;
        }
        setAdapterModel(
          (current) => current ? mergeWorkspaceExplorerSubtree(current, loadedNode) : current
        );
        setDirectoryErrors((current) => {
          if (!current.has(path)) {
            return current;
          }
          const next = new Map(current);
          next.delete(path);
          return next;
        });
      } catch (error) {
        if (workspaceGenerationRef.current !== workspaceGeneration || directoryRequestGenerationsRef.current.get(path) !== generation) {
          return;
        }
        const message = error instanceof Error ? error.message : "Failed to load directory";
        setWorkspaceError(message);
        setDirectoryErrors((current) => new Map(current).set(path, message));
      } finally {
        if (workspaceGenerationRef.current === workspaceGeneration && directoryRequestGenerationsRef.current.get(path) === generation) {
          setLoadingDirectoryPaths((current) => {
            if (!current.has(path)) {
              return current;
            }
            const next = new Set(current);
            next.delete(path);
            return next;
          });
        }
      }
    },
    [workspaceAdapter, workspaceIdentity]
  );
  const focusWorkspacePath = useCallback(
    async (path) => {
      artifactFocusRef.current = null;
      const virtualNode = [
        ...flattenWorkspaceNodes(fallbackTreeRef.current).values()
      ].find((node) => node.path === path && node.kind !== "directory");
      if (virtualNode) {
        ++focusGenerationRef.current;
        focusPendingRef.current = false;
        setSelectedNodeId(virtualNode.id);
        setFilterQuery("");
        setWorkspaceError(null);
        setExpandedPaths(
          (current) => /* @__PURE__ */ new Set([...current, ...collectAncestorPaths(virtualNode.path)])
        );
        return;
      }
      const targetPath = workspaceRelativeFocusPath(
        path,
        detail.workspace.absPath
      );
      if (!targetPath) {
        return;
      }
      const workspaceGeneration = workspaceGenerationRef.current;
      const generation = ++focusGenerationRef.current;
      ++refreshGenerationRef.current;
      focusPendingRef.current = true;
      const isCurrent = () => workspaceGenerationRef.current === workspaceGeneration && focusGenerationRef.current === generation;
      setSelectedNodeId(`workspace:${targetPath}`);
      setFilterQuery("");
      const external = relativeWorkspacePath(path, detail.workspace.absPath) === null;
      const ancestors = external ? ["linked-files:"] : ancestorDirectoryPaths(targetPath);
      setExpandedPaths((current) => {
        const next = new Set(current);
        next.add("");
        for (const ancestor of ancestors) {
          next.add(ancestor);
        }
        return next;
      });
      if (!workspaceAdapter) {
        if (hasWorkspacePath(treeRef.current, targetPath)) {
          setSelectedNodeId(`workspace:${targetPath}`);
        }
        return;
      }
      setLoadingTree(true);
      setWorkspaceError(null);
      try {
        let nextModel = adapterModelRef.current ?? createWorkspaceExplorerModel(
          workspaceTreeNodeToGraphNode(
            await workspaceAdapter.listTree({
              ...workspaceIdentity,
              path: ""
            })
          )
        );
        if (!isCurrent()) {
          return;
        }
        if (external) {
          if (!workspaceAdapter.statLinkedFile)
            throw new Error(
              "Only the device owner can preview files outside this workspace."
            );
          const node = await workspaceAdapter.statLinkedFile({
            ...workspaceIdentity,
            path: targetPath
          });
          if (!isCurrent()) return;
          const linked = workspaceTreeNodeToGraphNode({
            ...node,
            path: targetPath
          });
          setLinkedFiles((current) => [
            ...current.filter((item) => item.path !== targetPath),
            linked
          ]);
          adapterModelRef.current = nextModel;
          setAdapterModel(nextModel);
          return;
        }
        for (const ancestor of ancestors) {
          const existing = findWorkspaceExplorerNodeByPath(nextModel, ancestor);
          if (existing?.kind === "directory" && existing.childrenState === "resolved") {
            continue;
          }
          const loadedNode = workspaceTreeNodeToGraphNode(
            await workspaceAdapter.listTree({
              ...workspaceIdentity,
              path: ancestor
            })
          );
          if (!isCurrent()) {
            return;
          }
          nextModel = mergeWorkspaceExplorerSubtree(nextModel, loadedNode);
        }
        adapterModelRef.current = nextModel;
        setAdapterModel(nextModel);
        if (!hasWorkspaceExplorerPath(nextModel, targetPath)) {
          throw new Error(`File not found: ./${targetPath}`);
        }
        setSelectedNodeId(`workspace:${targetPath}`);
      } catch (error) {
        if (!isCurrent()) {
          return;
        }
        setWorkspaceError(
          error instanceof Error ? error.message : `Failed to open ${targetPath}`
        );
      } finally {
        if (isCurrent()) {
          focusPendingRef.current = false;
          setLoadingTree(false);
        }
      }
    },
    [detail.workspace.absPath, workspaceAdapter, workspaceIdentity]
  );
  const focusArtifact = useCallback((artifactId) => {
    artifactFocusRef.current = artifactId;
    ++focusGenerationRef.current;
    focusPendingRef.current = false;
    const node = [
      ...flattenWorkspaceNodes(fallbackTreeRef.current).values()
    ].find((value) => value.artifact?.id === artifactId);
    setSelectedNodeId(node?.id ?? null);
    setLoadingTree(false);
    setFilterQuery("");
    setWorkspaceError(node ? null : `Artifact unavailable: ${artifactId}`);
    if (node)
      setExpandedPaths(
        (current) => /* @__PURE__ */ new Set([...current, ...collectAncestorPaths(node.path)])
      );
  }, []);
  const toggleDirectory = useCallback(
    (path) => {
      if (!path) {
        return;
      }
      const node = nodeMapRef.current.get(`workspace:${path}`);
      const isExpanded = expandedPathsRef.current.has(path);
      const shouldLoad = node?.kind === "directory" && node.hasChildren && !node.childrenLoaded && !loadingDirectoryPathsRef.current.has(path);
      setExpandedPaths((current) => {
        const next = new Set(current);
        if (next.has(path)) {
          next.delete(path);
        } else {
          next.add(path);
        }
        return next;
      });
      if (!isExpanded && shouldLoad) {
        void loadDirectoryChildren(path);
      }
    },
    [loadDirectoryChildren]
  );
  const collapseAll = useCallback(() => {
    setExpandedPaths(/* @__PURE__ */ new Set([""]));
  }, []);
  useEffect(() => {
    setLinkedFiles([]);
    artifactFocusRef.current = null;
    skipPersistenceWriteRef.current = true;
    const persisted = persistence.read();
    const fallbackNode = fallbackFirstSelectableNodeRef.current;
    const selectedPath = focusPathRequest ? workspaceRelativeFocusPath(
      focusPathRequest.path,
      detail.workspace.absPath
    ) : persisted.selectedPath;
    const virtualNode = [
      ...flattenWorkspaceNodes(fallbackTreeRef.current).values()
    ].find(
      (node) => focusPathRequest?.artifactId !== void 0 ? node.artifact?.id === focusPathRequest.artifactId : node.path === selectedPath
    );
    const nextSelectedId = focusPathRequest?.artifactId !== void 0 ? virtualNode?.id ?? null : virtualNode?.id ?? (selectedPath ? `workspace:${selectedPath}` : fallbackNode?.id ?? null);
    setExpandedPaths(
      /* @__PURE__ */ new Set([
        "",
        "artifacts:",
        "thread-events:",
        "live:",
        ...persisted.expandedPaths,
        ...collectAncestorPaths(fallbackNode?.path ?? "")
      ])
    );
    setSelectedNodeId(nextSelectedId);
    setFilterQuery("");
    setFilterMode(persisted.filterMode ?? "filter");
  }, [persistence]);
  useEffect(() => {
    if (skipPersistenceWriteRef.current) {
      skipPersistenceWriteRef.current = false;
      return;
    }
    persistence.write({
      expandedPaths: [...expandedPaths],
      ...selectedPathForId(selectedNodeId, nodeMap) ? { selectedPath: selectedPathForId(selectedNodeId, nodeMap) } : {},
      filterMode
    });
  }, [expandedPaths, filterMode, nodeMap, persistence, selectedNodeId]);
  useEffect(() => {
    if (!workspaceAdapter || !adapterModel || focusPendingRef.current) {
      return;
    }
    for (const node of nodeMap.values()) {
      if (node.path && node.kind === "directory" && expandedPaths.has(node.path) && node.hasChildren && !node.childrenLoaded && !loadingDirectoryPaths.has(node.path) && !directoryErrors.has(node.path)) {
        void loadDirectoryChildren(node.path);
      }
    }
  }, [
    adapterModel,
    directoryErrors,
    expandedPaths,
    loadDirectoryChildren,
    loadingDirectoryPaths,
    nodeMap,
    workspaceAdapter
  ]);
  useEffect(() => {
    workspaceGenerationRef.current += 1;
    refreshGenerationRef.current += 1;
    directoryRequestGenerationsRef.current.clear();
    adapterModelRef.current = null;
    setAdapterModel(null);
    setLoadingDirectoryPaths(/* @__PURE__ */ new Set());
    setDirectoryErrors(/* @__PURE__ */ new Map());
    setWorkspaceError(null);
    handledFocusRequestRef.current = null;
    if (!focusPathRequest || focusPathRequest.artifactId !== void 0) {
      const persistedPath = persistence.read().selectedPath;
      if (persistedPath && !focusPathRequest) {
        const virtual = [
          ...flattenWorkspaceNodes(fallbackTreeRef.current).values()
        ].some((node) => node.path === persistedPath);
        void focusWorkspacePath(persistedPath);
        if (virtual) void refreshWorkspaceTree();
      } else void refreshWorkspaceTree();
    }
  }, [refreshWorkspaceTree]);
  useEffect(() => {
    if (focusPathRequest) {
      const key = `${workspaceIdentity.threadId}:${focusPathRequest.requestId}`;
      if (handledFocusRequestRef.current === key) return;
      handledFocusRequestRef.current = key;
      if (focusPathRequest.artifactId !== void 0)
        focusArtifact(focusPathRequest.artifactId);
      else void focusWorkspacePath(focusPathRequest.path);
    }
  }, [focusPathRequest, focusWorkspacePath, focusArtifact]);
  useEffect(() => {
    if (!workspaceAdapter?.subscribeWorkspaceChanged) {
      return;
    }
    let refreshTimer = null;
    const unsubscribe = workspaceAdapter.subscribeWorkspaceChanged(
      workspaceIdentity,
      () => {
        if (refreshTimer !== null) {
          window.clearTimeout(refreshTimer);
        }
        refreshTimer = window.setTimeout(() => {
          refreshTimer = null;
          void refreshWorkspaceTree(activeNodeRef.current?.path ?? null);
        }, 180);
      }
    );
    return () => {
      if (refreshTimer !== null) {
        window.clearTimeout(refreshTimer);
      }
      unsubscribe?.();
    };
  }, [refreshWorkspaceTree, workspaceAdapter, workspaceIdentity]);
  return {
    capabilities,
    capabilityError,
    refreshCapabilities: () => setCapabilityEpoch((current) => current + 1),
    activeNode,
    adapterModel,
    collapseAll,
    directoryErrors,
    expandedPaths,
    filterMode,
    filterQuery,
    focusWorkspacePath,
    liveNodes,
    loadingDirectoryPaths,
    loadingTree,
    nodeMap,
    refreshWorkspaceTree,
    retryDirectory: loadDirectoryChildren,
    selectedNodeId,
    setFilterMode,
    setFilterQuery,
    setLoadingTree,
    setSelectedNodeId: (id) => {
      artifactFocusRef.current = null;
      ++focusGenerationRef.current;
      ++refreshGenerationRef.current;
      focusPendingRef.current = false;
      setLoadingTree(false);
      setWorkspaceError(null);
      setSelectedNodeId(id);
    },
    setWorkspaceError,
    toggleDirectory,
    tree,
    workspaceError,
    workspaceIdentity
  };
}

// src/components/graph-workspace/explorer/useWorkspaceExplorerActions.ts
import { useEffect as useEffect2, useRef as useRef2, useState as useState2 } from "react";
function useWorkspaceExplorerActions({
  activeNode,
  adapter,
  capabilities,
  identity,
  onError,
  onLoadingChange,
  refreshTree,
  focusFile,
  workspaceRootPath
}) {
  const fileInputRef = useRef2(null);
  const archiveInputRef = useRef2(null);
  const [notice, setNotice] = useState2(null);
  const [pending, setPending] = useState2(false);
  const [showGarbageDialog, setShowGarbageDialog] = useState2(false);
  const [garbageFiles, setGarbageFiles] = useState2([]);
  const [trashList, setTrashList] = useState2(
    null
  );
  const [showTrash, setShowTrash] = useState2(false);
  const [confirmTrashEmpty, setConfirmTrashEmpty] = useState2(false);
  const trashOperations = useRef2(/* @__PURE__ */ new Map());
  const trashInFlight = useRef2(false);
  const generation = useRef2(0);
  useEffect2(() => {
    ++generation.current;
    setPending(false);
    setNotice(null);
    setShowGarbageDialog(false);
    setGarbageFiles([]);
    setTrashList(null);
    setShowTrash(false);
    setConfirmTrashEmpty(false);
    trashOperations.current.clear();
    trashInFlight.current = false;
    return () => {
      ++generation.current;
    };
  }, [adapter, identity.threadId, identity.workspaceId]);
  const importFormats = workspaceArchiveFormats(capabilities, "import");
  const downloadFormats = workspaceArchiveFormats(capabilities, "download");
  const trashCapabilities = workspaceTrashCapabilities(capabilities);
  async function run(operation, success) {
    const request = generation.current;
    setPending(true);
    setNotice(null);
    onError(null);
    try {
      await operation();
      if (request === generation.current && success) setNotice(success);
    } catch (error) {
      if (request === generation.current) {
        const message = error instanceof Error ? error.message : "File operation failed. Please try again.";
        onError(message);
      }
    } finally {
      if (request === generation.current) setPending(false);
    }
  }
  function canDownload(node, format) {
    if (!adapter?.downloadNode || !["file", "directory"].includes(node.kind))
      return false;
    if (node.kind === "directory") {
      if (!node.id.startsWith("workspace:")) return false;
      return format ? downloadFormats.includes(format) : downloadFormats.length > 0;
    }
    return capabilities ? capabilities.download.file : !adapter.getCapabilities && !adapter.capabilities;
  }
  async function uploadFile(file) {
    if (!adapter?.uploadFile) return;
    await run(async () => {
      if (capabilities?.maxFileBytes && file.size > capabilities.maxFileBytes) {
        throw new Error(
          `File exceeds the ${capabilities.maxFileBytes.toLocaleString()} byte upload limit.`
        );
      }
      const request = generation.current;
      onLoadingChange(true);
      try {
        const result = await adapter.uploadFile({
          ...identity,
          path: file.name,
          file
        });
        if (request !== generation.current) return;
        await refreshTree(
          result.kind === "archive" ? result.paths[0] ?? null : result.file.path
        );
      } finally {
        if (request === generation.current) onLoadingChange(false);
      }
    }, `Uploaded ${file.name}.`);
  }
  async function handleUpload(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (file) await uploadFile(file);
  }
  async function handleArchiveImport(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    await run(async () => {
      if (!importFormats.length || !adapter?.importArchive)
        throw new Error(
          "Archive extraction is unavailable for this connection."
        );
      const format = /\.zip$/i.test(file.name) ? "zip" : /\.tar$/i.test(file.name) ? "tar" : null;
      if (!format || !importFormats.includes(format))
        throw new Error(
          `Import requires ${importFormats.includes("zip") ? "an uncompressed .tar or .zip archive" : "an uncompressed .tar archive"}. This archive format is unsupported. Use Upload file to store an archive without extracting it.`
        );
      if (capabilities?.maxArchiveBytes !== void 0 && capabilities?.maxArchiveEntries !== void 0 && file.size > capabilities.maxArchiveBytes + capabilities.maxArchiveEntries * 1024 + 1024)
        throw new Error(
          `Archive exceeds the ${capabilities.maxArchiveBytes.toLocaleString()} byte import limit plus bounded archive headers.`
        );
      const request = generation.current;
      const result = await adapter.importArchive({
        ...identity,
        path: "",
        file,
        ...format === "zip" ? { format } : {}
      });
      if (request !== generation.current) return;
      const firstFile = result.firstFile === void 0 ? result.paths[0] : result.firstFile;
      await refreshTree(firstFile ?? null);
      if (request !== generation.current) return;
      if (firstFile) await focusFile(firstFile);
      if (request === generation.current)
        setNotice(
          `Imported ${file.name}. Committed ${result.paths.length} paths: ${result.paths.join(", ") || "(empty archive)"}.`
        );
    }, "");
  }
  async function pickUploadFile() {
    if (!adapter?.uploadFile) return;
    if (adapter.pickUploadFile) {
      await run(
        () => adapter.pickUploadFile({
          ...identity,
          defaultPick: () => fileInputRef.current?.click(),
          upload: uploadFile
        }),
        ""
      );
    } else fileInputRef.current?.click();
  }
  async function downloadNode(node, requestedFormat) {
    const format = requestedFormat ?? (downloadFormats.includes("tar") ? "tar" : downloadFormats[0]);
    await run(
      async () => {
        if (!canDownload(node, node.kind === "directory" ? format : void 0))
          throw new Error(
            node.kind === "directory" ? "Folder downloads are unavailable for this connection." : "File downloads are unavailable for this connection."
          );
        await adapter.downloadNode({
          ...identity,
          path: node.path,
          kind: node.kind === "directory" ? "directory" : "file",
          ...node.kind === "directory" && format === "zip" ? { format } : {}
        });
      },
      `Downloaded ${node.name}${node.kind === "directory" ? ` as a ${format?.toUpperCase()} archive` : ""}.`
    );
  }
  async function copyPath(node) {
    await run(async () => {
      if (!node.path || !navigator.clipboard)
        throw new Error("Clipboard access is unavailable.");
      await navigator.clipboard.writeText(
        workspaceDisplayPath(node.path, workspaceRootPath) ?? node.path
      );
    }, "File path copied.");
  }
  const mutableFile = activeNode?.kind === "file" && relativeWorkspacePath(activeNode.path, workspaceRootPath) !== null;
  const canDelete = Boolean(
    mutableFile && capabilities?.delete === "file" && adapter?.deleteFile
  );
  const canMove = Boolean(
    mutableFile && capabilities?.move === "file-new-destination" && adapter?.moveFile
  );
  const canTrash = Boolean(
    mutableFile && trashCapabilities?.files && adapter?.trashFile
  );
  const canListTrash = Boolean(trashCapabilities && adapter?.listTrash);
  const canRestoreTrash = Boolean(
    trashCapabilities?.restore && adapter?.restoreTrash
  );
  const canEmptyTrash = Boolean(
    trashCapabilities?.empty && adapter?.emptyTrash
  );
  async function runTrash(key, operation, success) {
    if (trashInFlight.current) return;
    const request = generation.current;
    trashInFlight.current = true;
    let operationId = trashOperations.current.get(key);
    if (!operationId) {
      operationId = crypto.randomUUID();
      trashOperations.current.set(key, operationId);
    }
    await run(async () => {
      try {
        await operation(operationId, request);
        if (request === generation.current) trashOperations.current.delete(key);
      } finally {
        if (request === generation.current) trashInFlight.current = false;
      }
    }, success);
  }
  async function loadTrash(request) {
    const list = await adapter.listTrash(identity);
    if (request === generation.current) setTrashList(structuredClone(list));
  }
  async function openTrash() {
    await run(async () => {
      if (!canListTrash)
        throw new Error("Trash is unavailable for this connection.");
      const request = generation.current;
      await loadTrash(request);
      if (request === generation.current) {
        setShowTrash(true);
        setConfirmTrashEmpty(false);
      }
    }, "");
  }
  async function trashFile() {
    const node = activeNode;
    if (!canTrash || !node) return;
    await runTrash(
      JSON.stringify(["trash", node.path]),
      async (operationId, request) => {
        await adapter.trashFile({
          ...identity,
          path: node.path,
          operationId
        });
        if (request === generation.current) await refreshTree();
      },
      `Moved ${node.name} to trash. Restore it from Trash.`
    );
  }
  async function restoreTrash(entry) {
    if (!canRestoreTrash) return;
    await runTrash(
      JSON.stringify(["restore", entry.trashId, entry.revision]),
      async (operationId, request) => {
        await adapter.restoreTrash({
          ...identity,
          trashId: entry.trashId,
          expectedRevision: entry.revision,
          expectedDestinationRevision: null,
          operationId
        });
        if (request !== generation.current) return;
        await loadTrash(request);
        if (request !== generation.current) return;
        await refreshTree(entry.path);
        if (request === generation.current) await focusFile(entry.path);
      },
      `Restored ${entry.path}.`
    );
  }
  async function emptyTrash() {
    const list = trashList;
    if (!canEmptyTrash || !list) return;
    await runTrash(
      JSON.stringify(["empty", list.revision]),
      async (operationId, request) => {
        await adapter.emptyTrash({
          ...identity,
          expectedRevision: list.revision,
          operationId
        });
        if (request !== generation.current) return;
        setConfirmTrashEmpty(false);
        await loadTrash(request);
      },
      "Trash emptied permanently. Immutable artifacts and history are retained."
    );
  }
  async function deleteFile() {
    const node = activeNode;
    await run(
      async () => {
        if (!canDelete || !node)
          throw new Error("File deletion is unavailable for this connection.");
        const request = generation.current;
        await adapter.deleteFile({ ...identity, path: node.path });
        if (request === generation.current) await refreshTree();
      },
      `Deleted ${node?.name ?? "file"}.`
    );
  }
  async function moveFile(destination) {
    const node = activeNode;
    await run(
      async () => {
        if (!canMove || !node)
          throw new Error("File moves are unavailable for this connection.");
        const path = relativeWorkspacePath(
          destination.trim(),
          workspaceRootPath
        );
        if (!path || path === node.path)
          throw new Error(
            "Enter a new destination inside the workspace. Existing destinations cannot be replaced."
          );
        const request = generation.current;
        await adapter.moveFile({
          ...identity,
          path: node.path,
          destination: path
        });
        if (request === generation.current) await refreshTree(path);
      },
      `Moved ${node?.name ?? "file"}.`
    );
  }
  async function openGarbage() {
    if (!adapter?.emptyGarbage) return;
    await run(async () => {
      if (!adapter.listGarbage)
        throw new Error(
          "Cannot safely empty garbage without listing its contents."
        );
      const request = generation.current;
      const files = await adapter.listGarbage(identity);
      if (request !== generation.current) return;
      setGarbageFiles(files.map((file) => `garbage/${file}`));
      setShowGarbageDialog(true);
    }, "");
  }
  async function confirmEmptyGarbage() {
    if (!adapter?.emptyGarbage) return;
    setShowGarbageDialog(false);
    await run(async () => {
      const request = generation.current;
      await adapter.emptyGarbage(identity);
      if (request === generation.current)
        await refreshTree(activeNode?.path ?? null);
    }, "Garbage emptied.");
  }
  return {
    canDownload,
    canDelete,
    canMove,
    canTrash,
    canListTrash,
    canRestoreTrash,
    canEmptyTrash,
    trashFile,
    openTrash,
    restoreTrash,
    emptyTrash,
    showTrash,
    setShowTrash,
    trashList,
    confirmTrashEmpty,
    setConfirmTrashEmpty,
    importFormats,
    downloadFormats,
    resetTrashRetry: () => trashOperations.current.clear(),
    deleteFile,
    moveFile,
    pending,
    notice,
    archiveInputRef,
    handleArchiveImport,
    confirmEmptyGarbage,
    copyPath,
    downloadNode,
    fileInputRef,
    garbageFiles,
    handleUpload,
    openGarbage,
    pickUploadFile,
    setShowGarbageDialog,
    showGarbageDialog
  };
}

// src/components/graph-workspace/explorer/WorkspaceTrashDialog.tsx
import * as Dialog from "@radix-ui/react-dialog";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function WorkspaceTrashDialog({
  open,
  list,
  pending,
  error,
  notice,
  canRestore,
  canEmpty,
  confirming,
  onClose,
  onRefresh,
  onRestore,
  onConfirmingChange,
  onEmpty
}) {
  return /* @__PURE__ */ jsx(
    Dialog.Root,
    {
      open,
      onOpenChange: (value) => {
        if (!value && !pending) onClose();
      },
      children: /* @__PURE__ */ jsxs(Dialog.Portal, { children: [
        /* @__PURE__ */ jsx(Dialog.Overlay, { className: "fixed inset-0 z-50 bg-black/40" }),
        /* @__PURE__ */ jsxs(
          Dialog.Content,
          {
            className: "thread-graph-dialog fixed left-1/2 top-1/2 z-50 max-h-[85dvh] w-[calc(100%_-_2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border bg-[var(--theme-panel)] p-5 shadow-xl",
            onOpenAutoFocus: (event) => {
              event.preventDefault();
              document.querySelector('[aria-label="Close trash"]')?.focus();
            },
            children: [
              /* @__PURE__ */ jsx(Dialog.Title, { className: "text-base font-semibold", children: confirming ? "Empty trash" : "Trash" }),
              /* @__PURE__ */ jsxs(Dialog.Description, { className: "mt-2 text-sm", children: [
                confirming ? "Permanently delete these recoverable workspace copies? This cannot be undone. " : "Trashed files can be restored to their original paths while those paths are empty. ",
                "Immutable artifacts, artifact downloads and thread history are retained. Workspace file links can stop working when a file is in trash or permanently deleted."
              ] }),
              error ? /* @__PURE__ */ jsx(
                "p",
                {
                  role: "alert",
                  className: "my-2 text-sm text-rose-700 dark:text-rose-200",
                  children: error
                }
              ) : null,
              notice ? /* @__PURE__ */ jsx("p", { role: "status", className: "my-2 text-sm", children: notice }) : null,
              /* @__PURE__ */ jsx("ul", { className: "my-3 max-h-48 overflow-y-auto text-sm", children: list?.entries.map((entry) => /* @__PURE__ */ jsxs(
                "li",
                {
                  className: "flex flex-wrap items-center justify-between gap-2 border-b py-2",
                  children: [
                    /* @__PURE__ */ jsxs("span", { className: "min-w-0 break-all", children: [
                      entry.path,
                      " (",
                      entry.size.toLocaleString(),
                      " bytes)"
                    ] }),
                    !confirming ? /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        "aria-label": `Restore ${entry.path}`,
                        disabled: pending || !canRestore,
                        onClick: () => onRestore(entry),
                        className: "rounded border px-3 py-2 disabled:opacity-50",
                        children: "Restore"
                      }
                    ) : null
                  ]
                },
                entry.trashId
              )) }),
              !list?.entries.length ? /* @__PURE__ */ jsx("p", { className: "my-2 text-sm", children: "Trash is empty." }) : null,
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-end gap-2", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    "aria-label": "Close trash",
                    disabled: pending,
                    onClick: () => confirming ? onConfirmingChange(false) : onClose(),
                    className: "rounded border px-3 py-2",
                    children: confirming ? "Cancel" : "Close"
                  }
                ),
                confirming ? /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    disabled: pending || !canEmpty || !list?.entries.length,
                    onClick: onEmpty,
                    className: "rounded border px-3 py-2 text-rose-700 disabled:opacity-50",
                    children: "Empty trash permanently"
                  }
                ) : /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      disabled: pending,
                      onClick: onRefresh,
                      className: "rounded border px-3 py-2",
                      children: "Refresh trash"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      disabled: pending || !canEmpty || !list?.entries.length,
                      onClick: () => onConfirmingChange(true),
                      className: "rounded border px-3 py-2 text-rose-700 disabled:opacity-50",
                      children: "Empty trash\u2026"
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      ] })
    }
  );
}

// src/components/graph-workspace/explorer/useWorkspaceFilePreview.ts
import { useLayoutEffect, useRef as useRef3, useState as useState3 } from "react";

// src/components/graph-workspace/explorer/filePreviewPolicy.ts
var DOWNLOAD_EXTENSIONS = /* @__PURE__ */ new Set([
  "zip",
  "7z",
  "rar",
  "tar",
  "gz",
  "tgz",
  "bz2",
  "xz",
  "zst",
  "br",
  "exe",
  "dll",
  "so",
  "dylib",
  "dmg",
  "iso",
  "pkg",
  "deb",
  "rpm",
  "msi",
  "bin",
  "wasm",
  "class",
  "jar",
  "pyc",
  "o",
  "a",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "odt",
  "ods",
  "odp",
  "db",
  "sqlite",
  "sqlite3",
  "parquet",
  "arrow",
  "npy",
  "npz",
  "h5",
  "hdf5",
  "mp3",
  "wav",
  "flac",
  "ogg",
  "m4a",
  "mp4",
  "mov",
  "mkv",
  "webm",
  "avi",
  "psd",
  "ai",
  "sketch",
  "heic",
  "tif",
  "tiff",
  "woff",
  "woff2",
  "ttf",
  "otf"
]);
function isDownloadOnlyPath(path) {
  return DOWNLOAD_EXTENSIONS.has(extensionOf(path));
}
function isBinaryPreview(content) {
  if (content.includes("\0")) return true;
  const sample = content.slice(0, 8e3);
  const suspicious = sample.match(/[\x01-\x08\x0e-\x1f\ufffd]/g)?.length ?? 0;
  return suspicious >= 3 && suspicious / sample.length > 0.02;
}

// src/components/graph-workspace/explorer/useWorkspaceFilePreview.ts
var PREVIEW_CHUNK_BYTES = 24e3;
var MAX_MOLECULAR_PREVIEW_BYTES = 10 * 1024 * 1024;
function useWorkspaceFilePreview({
  activeNode,
  adapter,
  identity,
  onError,
  refreshTree
}) {
  const generation = useRef3(0);
  const loadingMoreRef = useRef3(false);
  const [previewFile, setPreviewFile] = useState3(null);
  const [downloadOnly, setDownloadOnly] = useState3(false);
  const [imageUrl, setImageUrl] = useState3(null);
  const [pdfUrl, setPdfUrl] = useState3(null);
  const [previewLoading, setPreviewLoading] = useState3(false);
  const [loadingMore, setLoadingMore] = useState3(false);
  useLayoutEffect(() => {
    ++generation.current;
    loadingMoreRef.current = false;
    setLoadingMore(false);
    const selectedPath = activeNode?.kind === "file" ? activeNode.path : null;
    if (!adapter || !selectedPath) {
      setDownloadOnly(false);
      setPreviewFile(null);
      setImageUrl(null);
      setPdfUrl(null);
      setPreviewLoading(false);
      return;
    }
    const currentAdapter = adapter;
    const currentPath = selectedPath;
    let cancelled = false;
    async function loadPreview() {
      setPreviewLoading(true);
      onError(null);
      setDownloadOnly(false);
      setPreviewFile(null);
      setImageUrl(null);
      setPdfUrl(null);
      try {
        if (isDownloadOnlyPath(currentPath)) {
          setDownloadOnly(true);
          return;
        }
        const extension = extensionOf(currentPath);
        const rawUrl = currentAdapter.getRawFileUrl?.({
          ...identity,
          path: currentPath
        });
        if (rawUrl && IMAGE_EXTENSIONS.has(extension)) {
          if (!cancelled) {
            setImageUrl(rawUrl);
          }
          return;
        }
        if (rawUrl && PDF_EXTENSIONS.has(extension)) {
          if (!cancelled) {
            setPdfUrl(rawUrl);
          }
          return;
        }
        let file = await currentAdapter.readFile({
          ...identity,
          path: currentPath,
          limit: PREVIEW_CHUNK_BYTES
        });
        if (MOLECULAR_EXTENSIONS.has(extension)) {
          while (!cancelled) {
            if (file.size > MAX_MOLECULAR_PREVIEW_BYTES || file.truncated && file.nextOffset >= MAX_MOLECULAR_PREVIEW_BYTES) {
              if (!cancelled) setDownloadOnly(true);
              return;
            }
            if (!file.truncated) break;
            const chunk = await currentAdapter.readFile({
              ...identity,
              path: currentPath,
              offset: file.nextOffset,
              limit: Math.min(
                256 * 1024,
                MAX_MOLECULAR_PREVIEW_BYTES - file.nextOffset
              )
            });
            if (chunk.nextOffset <= file.nextOffset) {
              throw new Error(
                "Unable to load the complete molecular file: the read made no progress."
              );
            }
            file = { ...chunk, content: file.content + chunk.content };
          }
        }
        if (!cancelled) {
          if (isBinaryPreview(file.content)) setDownloadOnly(true);
          else setPreviewFile(file);
        }
      } catch (error) {
        if (!cancelled) {
          onError(
            error instanceof Error ? error.message : "Failed to read file"
          );
        }
      } finally {
        if (!cancelled) {
          setPreviewLoading(false);
        }
      }
    }
    void loadPreview();
    return () => {
      cancelled = true;
      ++generation.current;
    };
  }, [
    activeNode?.id,
    activeNode?.kind,
    activeNode?.path,
    adapter,
    identity,
    onError
  ]);
  async function loadMore() {
    if (!adapter || !previewFile?.truncated || loadingMoreRef.current) return;
    const request = generation.current;
    const file = previewFile;
    loadingMoreRef.current = true;
    setLoadingMore(true);
    onError(null);
    try {
      const chunk = await adapter.readFile({
        ...identity,
        path: file.path,
        offset: file.nextOffset,
        limit: PREVIEW_CHUNK_BYTES
      });
      if (request !== generation.current) return;
      if (chunk.nextOffset <= file.nextOffset && chunk.truncated)
        throw new Error(
          "Unable to load more: the read made no progress. Download the file or reopen it."
        );
      setPreviewFile(
        (current) => current?.path === file.path && current.nextOffset === file.nextOffset ? { ...chunk, content: current.content + chunk.content } : current
      );
    } catch (error) {
      if (request === generation.current)
        onError(
          error instanceof Error ? error.message : "Failed to load more. Reopen or download the file."
        );
    } finally {
      if (request === generation.current) {
        loadingMoreRef.current = false;
        setLoadingMore(false);
      }
    }
  }
  async function saveFile(input) {
    if (!adapter?.writeFile)
      throw new Error("Editing is unavailable for this connection.");
    const request = generation.current;
    onError(null);
    await adapter.writeFile({ ...identity, ...input });
    if (request !== generation.current) return;
    await refreshTree(input.path);
    if (request !== generation.current) return;
    const file = await adapter.readFile({
      ...identity,
      path: input.path,
      limit: PREVIEW_CHUNK_BYTES
    });
    if (request === generation.current) setPreviewFile(file);
  }
  async function reloadFile() {
    if (!adapter || activeNode?.kind !== "file") return;
    const request = generation.current;
    onError(null);
    try {
      const file = await adapter.readFile({
        ...identity,
        path: activeNode.path,
        limit: PREVIEW_CHUNK_BYTES
      });
      if (request === generation.current) setPreviewFile(file);
    } catch (error) {
      if (request === generation.current)
        onError(
          error instanceof Error ? error.message : "Failed to reload file."
        );
    }
  }
  return {
    downloadOnly,
    imageUrl,
    loadingMore,
    loadMore,
    pdfUrl,
    previewFile,
    previewLoading,
    saveFile,
    reloadFile
  };
}

// src/components/graph-workspace/explorer/WorkspaceExplorerPanel.tsx
import {
  FileCode2 as FileCode22,
  ListCollapse,
  MoreHorizontal,
  RefreshCw,
  Search,
  PanelLeftClose,
  PanelRightOpen,
  Trash2,
  Upload,
  X
} from "lucide-react";
import {
  useCallback as useCallback3,
  useEffect as useEffect4,
  useMemo as useMemo4,
  useRef as useRef5,
  useState as useState5
} from "react";

// src/components/graph-workspace/explorer/WorkspaceExplorerTree.tsx
import { useVirtualizer } from "@tanstack/react-virtual";
import {
  useCallback as useCallback2,
  useEffect as useEffect3,
  useMemo as useMemo3,
  useRef as useRef4,
  useState as useState4
} from "react";

// src/components/graph-workspace/explorer/workspaceExplorerFilter.ts
function mergeMatchIndexes(indexes) {
  const ranges = [];
  for (const index of indexes) {
    const previous = ranges.at(-1);
    if (previous && previous.end === index) {
      previous.end = index + 1;
    } else {
      ranges.push({ start: index, end: index + 1 });
    }
  }
  return ranges;
}
function matchWorkspaceExplorerNode(node, rawQuery) {
  const query = rawQuery.trim().toLocaleLowerCase();
  if (!query) {
    return { score: 0, ranges: [] };
  }
  const candidate = (query.includes("/") ? node.path : node.name).toLocaleLowerCase();
  const indexes = [];
  let cursor = 0;
  let consecutive = 0;
  let segmentStarts = 0;
  for (const character of query) {
    const index = candidate.indexOf(character, cursor);
    if (index < 0) {
      return null;
    }
    indexes.push(index);
    if (indexes.length > 1 && index === indexes[indexes.length - 2] + 1) {
      consecutive += 1;
    }
    if (index === 0 || candidate[index - 1] === "/" || candidate[index - 1] === "-") {
      segmentStarts += 1;
    }
    cursor = index + 1;
  }
  const first = indexes[0] ?? 0;
  const prefixBonus = first === 0 ? 200 : 0;
  const exactBonus = candidate === query ? 500 : 0;
  return {
    score: exactBonus + prefixBonus + consecutive * 20 + segmentStarts * 30 - first - candidate.length,
    ranges: mergeMatchIndexes(indexes)
  };
}

// src/components/graph-workspace/explorer/workspaceExplorerProjection.ts
function sortedChildIds(model, childIds) {
  return [...childIds].sort((leftId, rightId) => {
    const left = model.nodes.get(leftId);
    const right = model.nodes.get(rightId);
    if (!left || !right) {
      return left ? -1 : right ? 1 : 0;
    }
    if (left.kind === "directory" && right.kind !== "directory") {
      return -1;
    }
    if (left.kind !== "directory" && right.kind === "directory") {
      return 1;
    }
    return left.name.localeCompare(right.name);
  });
}
function projectWorkspaceExplorerRows(model, expandedPaths, options = {}) {
  const rows = [];
  const indexById = /* @__PURE__ */ new Map();
  const matches = /* @__PURE__ */ new Map();
  const includedIds = /* @__PURE__ */ new Set();
  const query = options.filterQuery?.trim() ?? "";
  const includeExpandedChildren = (nodeId) => {
    const node = model.nodes.get(nodeId);
    if (!node || !expandedPaths.has(node.path)) return;
    for (const childId of node.childIds) {
      includedIds.add(childId);
      includeExpandedChildren(childId);
    }
  };
  if (query) {
    for (const node of model.nodes.values()) {
      const match = matchWorkspaceExplorerNode(node, query);
      if (!match) {
        continue;
      }
      matches.set(node.id, match);
      if (node.kind === "directory") includeExpandedChildren(node.id);
      let current = node;
      while (current) {
        includedIds.add(current.id);
        current = current.parentId ? model.nodes.get(current.parentId) : void 0;
      }
    }
  }
  const filtering = Boolean(query && options.filterMode === "filter");
  const hasUnresolvedDirectories = [...model.nodes.values()].some(
    (node) => node.kind === "directory" && node.childrenState !== "resolved"
  );
  const visit = (nodeId, depth, posInSet, setSize) => {
    const node = model.nodes.get(nodeId);
    if (!node || filtering && !includedIds.has(node.id)) {
      return;
    }
    let projectedNode = node;
    const compactPathSegments = [node.name];
    if (options.compactFolders && !query && depth > 0 && node.kind === "directory") {
      while (projectedNode.kind === "directory" && projectedNode.childrenState === "resolved" && !projectedNode.truncated && projectedNode.childIds.length === 1) {
        const child = model.nodes.get(projectedNode.childIds[0]);
        if (!child || child.kind !== "directory") {
          break;
        }
        compactPathSegments.push(child.name);
        projectedNode = child;
      }
    }
    const expanded = projectedNode.kind === "directory" ? projectedNode.path === "" || expandedPaths.has(projectedNode.path) || filtering && projectedNode.childIds.some((id) => includedIds.has(id)) : void 0;
    indexById.set(projectedNode.id, rows.length);
    const match = matches.get(projectedNode.id);
    rows.push({
      id: projectedNode.id,
      parentId: node.parentId,
      depth,
      posInSet,
      setSize,
      expanded,
      ...compactPathSegments.length > 1 ? { compactPathSegments } : {},
      ...match?.ranges.length && !query.includes("/") ? { matchRanges: match.ranges } : {},
      node: projectedNode
    });
    if (!expanded) {
      return;
    }
    const childIds = sortedChildIds(model, projectedNode.childIds).filter(
      (childId) => !filtering || includedIds.has(childId)
    );
    childIds.forEach((childId, index) => {
      visit(childId, depth + 1, index + 1, childIds.length);
    });
  };
  visit(model.rootId, 0, 1, 1);
  return {
    rows,
    indexById,
    matchCount: matches.size,
    hasUnresolvedDirectories
  };
}

// src/components/graph-workspace/explorer/workspaceExplorerCommands.ts
function workspaceExplorerCommandForKey(input) {
  const currentIndex = input.focusedId ? input.rows.findIndex((row) => row.id === input.focusedId) : -1;
  const current = currentIndex >= 0 ? input.rows[currentIndex] : null;
  const focusAt = (index) => {
    const row = input.rows[index];
    return row ? { type: "focus", id: row.id } : null;
  };
  if ((input.metaKey || input.ctrlKey) && input.key.toLowerCase() === "f") {
    return { type: "open-filter" };
  }
  switch (input.key) {
    case "ArrowDown":
      return focusAt(Math.min(input.rows.length - 1, currentIndex + 1));
    case "ArrowUp":
      return focusAt(Math.max(0, currentIndex < 0 ? 0 : currentIndex - 1));
    case "Home":
      return focusAt(0);
    case "End":
      return focusAt(input.rows.length - 1);
    case "ArrowRight": {
      if (!current) {
        return focusAt(0);
      }
      if (current.node.kind === "directory" && current.expanded === false) {
        return { type: "expand", path: current.node.path };
      }
      const next = input.rows[currentIndex + 1];
      return next?.parentId === current.id ? { type: "focus", id: next.id } : null;
    }
    case "ArrowLeft":
      if (!current) {
        return null;
      }
      if (current.node.kind === "directory" && current.expanded) {
        return { type: "collapse", path: current.node.path };
      }
      return current.parentId ? { type: "focus", id: current.parentId } : null;
    case "Enter":
      return current ? { type: "activate", id: current.id } : null;
    case " ":
      return current ? { type: "select", id: current.id } : null;
    default:
      return null;
  }
}

// src/components/graph-workspace/explorer/WorkspaceExplorerRow.tsx
import {
  ChevronDown,
  ChevronRight,
  CircleAlert,
  Copy,
  Download,
  Eye,
  File,
  FileArchive,
  FileCode2,
  FileImage,
  Folder,
  FolderOpen,
  LoaderCircle
} from "lucide-react";
import { Fragment as Fragment2, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function iconForNode(node, expanded) {
  if (node.kind === "directory") {
    return expanded ? /* @__PURE__ */ jsx2(FolderOpen, { className: "h-4 w-4 text-slate-500 dark:text-slate-400" }) : /* @__PURE__ */ jsx2(Folder, { className: "h-4 w-4 text-slate-500 dark:text-slate-400" });
  }
  const extension = extensionOf(node.name);
  if (extension === "zip") {
    return /* @__PURE__ */ jsx2(FileArchive, { className: "h-4 w-4 text-amber-600" });
  }
  if (node.kind === "file" && ["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(extension)) {
    return /* @__PURE__ */ jsx2(FileImage, { className: "h-4 w-4 text-sky-500" });
  }
  if (node.kind === "artifact" || [
    "xyz",
    "extxyz",
    "cif",
    "pdf",
    "json",
    "ts",
    "tsx",
    "js",
    "jsx",
    "md",
    "yaml",
    "yml",
    "py"
  ].includes(extension)) {
    return /* @__PURE__ */ jsx2(FileCode2, { className: "h-4 w-4 text-emerald-600" });
  }
  return /* @__PURE__ */ jsx2(File, { className: "h-4 w-4 text-slate-400 dark:text-slate-500" });
}
function WorkspaceExplorerRow({
  row,
  selected,
  focused,
  loading,
  error,
  rowRef,
  onFocus,
  onKeyDown,
  onSelect,
  onToggle,
  onPreview,
  onPin,
  onRetry,
  onDownload,
  onDownloadZip,
  canDownload,
  onCopyPath
}) {
  const node = {
    ...row.node.source,
    children: []
  };
  const isDirectory = node.kind === "directory";
  const canToggleDirectory = isDirectory && Boolean(node.path);
  const expanded = Boolean(row.expanded);
  const paddingLeft = `${row.depth * 0.5 + 0.5}rem`;
  const displayName = row.compactPathSegments?.join("/") ?? node.name;
  const label = row.matchRanges?.length ? /* @__PURE__ */ jsx2(Fragment2, { children: row.matchRanges.reduce((parts, range, index) => {
    const previousEnd = row.matchRanges?.[index - 1]?.end ?? 0;
    if (range.start > previousEnd) {
      parts.push(displayName.slice(previousEnd, range.start));
    }
    parts.push(
      /* @__PURE__ */ jsx2(
        "span",
        {
          className: "font-semibold text-[var(--theme-fg)]",
          children: displayName.slice(range.start, range.end)
        },
        `${range.start}:${range.end}`
      )
    );
    if (index === row.matchRanges.length - 1 && range.end < displayName.length) {
      parts.push(displayName.slice(range.end));
    }
    return parts;
  }, []) }) : displayName;
  return /* @__PURE__ */ jsxs2(
    "div",
    {
      ref: rowRef,
      role: "treeitem",
      "aria-label": displayName,
      "aria-level": row.depth + 1,
      "aria-posinset": row.posInSet,
      "aria-setsize": row.setSize,
      "aria-selected": selected,
      ...isDirectory ? { "aria-expanded": expanded } : {},
      tabIndex: focused ? 0 : -1,
      "data-explorer-node-id": node.id,
      "data-explorer-path": node.path,
      className: `thread-graph-tree-row group relative flex min-w-0 items-center text-sm transition ${selected ? "is-selected" : ""} ${focused ? "is-focused" : ""}`,
      style: { paddingLeft },
      onFocus,
      onKeyDown,
      onDoubleClick: () => {
        if (isDirectory && node.path) {
          onToggle(node.path);
        } else if (!isDirectory) {
          onPin?.(node);
        }
      },
      children: [
        row.depth > 0 ? /* @__PURE__ */ jsx2(
          "span",
          {
            className: "thread-graph-tree-indent-guides pointer-events-none absolute inset-y-0 left-0",
            "aria-hidden": "true",
            children: Array.from({ length: row.depth }, (_, index) => /* @__PURE__ */ jsx2(
              "span",
              {
                className: "absolute inset-y-0 border-l",
                style: { left: `${index * 0.5 + 0.75}rem` }
              },
              index
            ))
          }
        ) : null,
        canToggleDirectory ? /* @__PURE__ */ jsx2(
          "button",
          {
            type: "button",
            tabIndex: -1,
            "aria-label": `${expanded ? "Collapse" : "Expand"} ${node.name}`,
            className: "inline-flex h-7 w-7 shrink-0 items-center justify-center sm:h-6 sm:w-6",
            onClick: () => {
              if (node.path) {
                onToggle(node.path);
              }
            },
            children: loading ? /* @__PURE__ */ jsx2(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin text-slate-400 motion-reduce:animate-none" }) : expanded ? /* @__PURE__ */ jsx2(ChevronDown, { className: "h-3.5 w-3.5 text-slate-400" }) : /* @__PURE__ */ jsx2(ChevronRight, { className: "h-3.5 w-3.5 text-slate-400" })
          }
        ) : /* @__PURE__ */ jsx2("span", { className: "h-7 w-7 shrink-0 sm:h-6 sm:w-6", "aria-hidden": "true" }),
        /* @__PURE__ */ jsxs2(
          "button",
          {
            type: "button",
            tabIndex: -1,
            className: "flex min-h-11 min-w-0 flex-1 items-center gap-2 py-2 pr-2 text-left sm:min-h-7 sm:py-1",
            onClick: () => onSelect(node),
            children: [
              iconForNode(node, expanded),
              /* @__PURE__ */ jsx2("span", { className: "min-w-0 flex-1 truncate", title: displayName, children: label })
            ]
          }
        ),
        isDirectory && error && onRetry ? /* @__PURE__ */ jsx2(
          "button",
          {
            type: "button",
            tabIndex: -1,
            onClick: () => onRetry(node.path),
            className: "mr-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded text-rose-600 hover:bg-rose-500/10 dark:text-rose-300",
            title: `${error}. Retry ${node.name}`,
            "aria-label": `Retry loading ${node.name}`,
            children: /* @__PURE__ */ jsx2(CircleAlert, { className: "h-3.5 w-3.5" })
          }
        ) : null,
        node.id !== "linked-files" && (onDownload || onCopyPath && node.path || !isDirectory && onPreview) ? /* @__PURE__ */ jsxs2("div", { className: "thread-graph-tree-actions absolute inset-y-0 right-1 flex items-center gap-0.5 pl-1", children: [
          !isDirectory && onPreview ? /* @__PURE__ */ jsx2(
            "button",
            {
              type: "button",
              tabIndex: -1,
              onClick: () => onPreview(node),
              className: "thread-graph-tree-action flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition sm:h-7 sm:w-7",
              title: `Preview ${node.name}`,
              "aria-label": `Preview ${node.name}`,
              children: /* @__PURE__ */ jsx2(Eye, { className: "h-3.5 w-3.5" })
            }
          ) : null,
          onDownload ? /* @__PURE__ */ jsx2(
            "button",
            {
              type: "button",
              tabIndex: -1,
              disabled: canDownload ? !canDownload(node) : false,
              onClick: () => onDownload(node),
              className: "thread-graph-tree-action flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition sm:h-7 sm:w-7",
              title: canDownload && !canDownload(node) ? `Downloads are unavailable for this ${isDirectory ? "folder" : "file"} connection.` : `Download ${node.name}`,
              "aria-label": `Download ${node.name}`,
              children: /* @__PURE__ */ jsx2(Download, { className: "h-3.5 w-3.5" })
            }
          ) : null,
          isDirectory && row.depth > 0 && onDownloadZip ? /* @__PURE__ */ jsx2("button", { type: "button", tabIndex: -1, disabled: canDownload ? !canDownload(node) : false, onClick: () => onDownloadZip(node), className: "thread-graph-tree-action flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition sm:h-7 sm:w-7", title: `Download ${node.name} (ZIP)`, "aria-label": `Download ${node.name} (ZIP)`, children: /* @__PURE__ */ jsx2(FileArchive, { className: "h-3.5 w-3.5" }) }) : null,
          onCopyPath ? /* @__PURE__ */ jsx2(
            "button",
            {
              type: "button",
              tabIndex: -1,
              onClick: () => onCopyPath(node),
              className: "thread-graph-tree-action flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition sm:h-7 sm:w-7",
              title: `Copy path for ${node.name}`,
              "aria-label": `Copy path for ${node.name}`,
              children: /* @__PURE__ */ jsx2(Copy, { className: "h-3.5 w-3.5" })
            }
          ) : null
        ] }) : null
      ]
    }
  );
}

// src/components/graph-workspace/explorer/WorkspaceExplorerTree.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
function WorkspaceExplorerTree({
  tree,
  expandedPaths,
  filterMode = "filter",
  filterQuery = "",
  compactFolders = false,
  directoryErrors,
  loadingPaths,
  selectedNodeId,
  revealRequestKey,
  scrollerRef,
  scrollTopRef,
  onCopyPath,
  onDownload,
  onDownloadZip,
  canDownload,
  onOpenFilter,
  onFilterResultsChange,
  onPreview,
  onPin,
  onRetryDirectory,
  onSelect,
  onToggle,
  virtualize = true
}) {
  const model = useMemo3(() => createWorkspaceExplorerModel(tree), [tree]);
  const projection = useMemo3(
    () => projectWorkspaceExplorerRows(model, expandedPaths, {
      filterMode,
      filterQuery,
      compactFolders
    }),
    [compactFolders, expandedPaths, filterMode, filterQuery, model]
  );
  const { rows } = projection;
  const [focusedId, setFocusedId] = useState4(
    () => selectedNodeId ?? rows[0]?.id ?? null
  );
  const rowElementsRef = useRef4(/* @__PURE__ */ new Map());
  const canVirtualize = virtualize && typeof window !== "undefined" && "ResizeObserver" in window;
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollerRef.current,
    getItemKey: (index) => rows[index]?.id ?? index,
    estimateSize: () => typeof window !== "undefined" && window.matchMedia?.("(max-width: 639px)").matches ? 44 : 28,
    overscan: 6,
    enabled: canVirtualize,
    useFlushSync: false
  });
  useEffect3(() => {
    onFilterResultsChange?.({
      matchCount: projection.matchCount,
      hasUnresolvedDirectories: projection.hasUnresolvedDirectories
    });
  }, [
    onFilterResultsChange,
    projection.hasUnresolvedDirectories,
    projection.matchCount
  ]);
  useEffect3(() => {
    if (focusedId && projection.indexById.has(focusedId)) {
      return;
    }
    setFocusedId(
      selectedNodeId && projection.indexById.has(selectedNodeId) ? selectedNodeId : rows[0]?.id ?? null
    );
  }, [focusedId, projection.indexById, rows, selectedNodeId]);
  const focusRow = useCallback2(
    (id) => {
      setFocusedId(id);
      const index = projection.indexById.get(id);
      if (canVirtualize && index !== void 0) {
        virtualizer.scrollToIndex(index, { align: "auto" });
      }
      window.requestAnimationFrame(
        () => rowElementsRef.current.get(id)?.focus()
      );
    },
    [canVirtualize, projection.indexById, virtualizer]
  );
  const revealedSelectionRef = useRef4(null);
  useEffect3(() => {
    const key = `${selectedNodeId}:${revealRequestKey ?? 0}`;
    if (!selectedNodeId || revealedSelectionRef.current === key) return;
    const index = projection.indexById.get(selectedNodeId);
    if (index === void 0) return;
    revealedSelectionRef.current = key;
    setFocusedId(selectedNodeId);
    if (canVirtualize) virtualizer.scrollToIndex(index, { align: "auto" });
    else
      rowElementsRef.current.get(selectedNodeId)?.scrollIntoView?.({ block: "nearest" });
  }, [
    selectedNodeId,
    revealRequestKey,
    projection.indexById,
    canVirtualize,
    virtualizer
  ]);
  const handleKeyDown = useCallback2(
    (event) => {
      const command = workspaceExplorerCommandForKey({
        key: event.key,
        metaKey: event.metaKey,
        ctrlKey: event.ctrlKey,
        focusedId,
        rows
      });
      if (!command) {
        return;
      }
      event.preventDefault();
      switch (command.type) {
        case "focus":
          focusRow(command.id);
          break;
        case "expand":
        case "collapse":
          onToggle(command.path);
          break;
        case "activate": {
          const row = model.nodes.get(command.id);
          if (!row) {
            break;
          }
          if (row.kind === "directory" && row.path) {
            onToggle(row.path);
          } else {
            onSelect({ ...row.source, children: [] });
          }
          break;
        }
        case "select": {
          const row = model.nodes.get(command.id);
          if (row) {
            onSelect({ ...row.source, children: [] });
          }
          break;
        }
        case "open-filter":
          onOpenFilter?.();
          break;
      }
    },
    [focusRow, focusedId, model.nodes, onOpenFilter, onSelect, onToggle, rows]
  );
  const virtualItems = canVirtualize ? virtualizer.getVirtualItems() : [];
  const renderedRows = canVirtualize ? virtualItems.map((item) => ({
    index: item.index,
    key: item.key,
    start: item.start
  })) : rows.map((row, index) => ({ index, key: row.id, start: 0 }));
  return /* @__PURE__ */ jsx3(
    "div",
    {
      ref: scrollerRef,
      role: "tree",
      "aria-label": "Workspace files",
      className: "thread-graph-workspace-tree-scroll min-h-0 flex-1 overflow-y-auto py-1 outline-none",
      onScroll: (event) => {
        if (scrollTopRef) {
          scrollTopRef.current = event.currentTarget.scrollTop;
        }
      },
      children: /* @__PURE__ */ jsx3(
        "div",
        {
          style: canVirtualize ? {
            height: `${virtualizer.getTotalSize()}px`,
            position: "relative",
            width: "100%"
          } : void 0,
          children: renderedRows.map((rendered) => {
            const row = rows[rendered.index];
            if (!row) {
              return null;
            }
            return /* @__PURE__ */ jsx3(
              "div",
              {
                role: "none",
                "data-index": rendered.index,
                ref: canVirtualize ? virtualizer.measureElement : void 0,
                style: canVirtualize ? {
                  left: 0,
                  position: "absolute",
                  top: 0,
                  transform: `translateY(${rendered.start}px)`,
                  width: "100%"
                } : void 0,
                children: /* @__PURE__ */ jsx3(
                  WorkspaceExplorerRow,
                  {
                    row,
                    selected: selectedNodeId === row.id,
                    focused: focusedId === row.id,
                    loading: loadingPaths.has(row.node.path),
                    ...directoryErrors?.get(row.node.path) ? { error: directoryErrors.get(row.node.path) } : {},
                    rowRef: (element) => {
                      if (element) {
                        rowElementsRef.current.set(row.id, element);
                      } else {
                        rowElementsRef.current.delete(row.id);
                      }
                    },
                    onFocus: () => setFocusedId(row.id),
                    onKeyDown: handleKeyDown,
                    onSelect,
                    onToggle,
                    ...onPreview ? { onPreview } : {},
                    ...onPin ? { onPin } : {},
                    ...onRetryDirectory ? { onRetry: onRetryDirectory } : {},
                    ...onDownload ? { onDownload } : {},
                    ...onDownloadZip ? { onDownloadZip } : {},
                    ...canDownload ? { canDownload } : {},
                    ...onCopyPath ? { onCopyPath } : {}
                  }
                )
              },
              rendered.key
            );
          })
        }
      )
    }
  );
}

// src/components/graph-workspace/explorer/WorkspaceExplorerPanel.tsx
import { Fragment as Fragment3, jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var iconButtonClassName = "thread-graph-explorer-icon-button flex h-6 w-6 items-center justify-center rounded transition disabled:cursor-not-allowed disabled:opacity-40";
var collapseButtonClassName = "thread-graph-explorer-collapse-button flex h-6 w-6 items-center justify-center rounded text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-[#222733] dark:hover:text-slate-100";
function WorkspaceExplorerPanel({
  canEmptyGarbage,
  canUpload,
  pending,
  canImportArchive,
  archiveLimits,
  onImportArchive,
  onDownloadWorkspace,
  onDownloadWorkspaceZip,
  importFormats = ["tar"],
  downloadFormats = ["tar"],
  canTrash,
  onTrashFile,
  onOpenTrash,
  canDelete,
  canMove,
  onDeleteFile,
  onMoveFile,
  compactFolders,
  directoryErrors,
  expandedPaths,
  filterMode,
  filterQuery,
  initialLoading,
  loadingPaths,
  loading,
  liveNodes = [],
  onCollapse,
  onCollapseAll,
  onCopyPath,
  onDownload,
  onDownloadZip,
  canDownload,
  onEmptyGarbage,
  onExpandViewer,
  onFilterModeChange,
  onFilterQueryChange,
  onPreview,
  onPin,
  onRefresh,
  onRetryDirectory,
  onSelect,
  onSelectNode,
  onToggle,
  onUpload,
  explorerScrollTopRef,
  explorerScrollerRef,
  selectedNodeId,
  revealRequestKey,
  tree,
  rootError
}) {
  const visibleTree = useMemo4(
    () => ({
      ...tree,
      children: tree.children.filter((node) => node.id !== "live")
    }),
    [tree]
  );
  const [filterOpen, setFilterOpen] = useState5(Boolean(filterQuery));
  const [filterResult, setFilterResult] = useState5({
    matchCount: 0,
    hasUnresolvedDirectories: false
  });
  const filterInputRef = useRef5(null);
  const openFilter = useCallback3(() => setFilterOpen(true), []);
  const handleFilterResultsChange = useCallback3(
    (result) => setFilterResult(result),
    []
  );
  useEffect4(() => {
    if (filterOpen) {
      window.requestAnimationFrame(() => filterInputRef.current?.focus());
    }
  }, [filterOpen]);
  function closeFilter() {
    onFilterQueryChange("");
    setFilterOpen(false);
  }
  return /* @__PURE__ */ jsxs3("aside", { className: "thread-graph-explorer flex h-full min-h-0 flex-col overflow-hidden rounded-md", children: [
    /* @__PURE__ */ jsxs3("div", { className: "thread-graph-explorer-header flex h-9 shrink-0 items-center justify-between border-b px-2", children: [
      /* @__PURE__ */ jsx4("h2", { className: "text-[11px] font-semibold uppercase text-slate-600 dark:text-slate-300", children: "Explorer" }),
      /* @__PURE__ */ jsxs3("div", { className: "thread-graph-explorer-toolbar flex items-center gap-1", children: [
        /* @__PURE__ */ jsx4(
          "button",
          {
            type: "button",
            onClick: openFilter,
            className: iconButtonClassName,
            title: "Filter workspace",
            "aria-label": "Filter workspace",
            "aria-pressed": filterOpen,
            children: /* @__PURE__ */ jsx4(Search, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsx4(
          "button",
          {
            type: "button",
            onClick: onCollapseAll,
            className: iconButtonClassName,
            title: "Collapse folders",
            "aria-label": "Collapse folders",
            children: /* @__PURE__ */ jsx4(ListCollapse, { className: "h-4 w-4" })
          }
        ),
        /* @__PURE__ */ jsx4(
          "button",
          {
            type: "button",
            onClick: onRefresh,
            disabled: !onRefresh || pending,
            className: iconButtonClassName,
            title: "Refresh workspace",
            "aria-label": "Refresh workspace",
            children: /* @__PURE__ */ jsx4(
              RefreshCw,
              {
                className: `h-4 w-4 motion-reduce:animate-none ${loading ? "animate-spin" : ""}`
              }
            )
          }
        ),
        canUpload || onDownloadWorkspace || onEmptyGarbage || onOpenTrash ? /* @__PURE__ */ jsxs3("details", { className: "thread-graph-explorer-more relative", children: [
          /* @__PURE__ */ jsx4(
            "summary",
            {
              className: `${iconButtonClassName} list-none cursor-pointer`,
              title: "More Explorer actions",
              "aria-label": "More Explorer actions",
              children: /* @__PURE__ */ jsx4(MoreHorizontal, { className: "h-4 w-4" })
            }
          ),
          /* @__PURE__ */ jsxs3("div", { className: "absolute right-0 top-7 z-40 max-h-[min(50dvh,14rem)] min-w-44 overflow-y-auto rounded-md border border-[var(--theme-border)] bg-[var(--theme-panel)] p-1 shadow-lg", children: [
            canUpload ? /* @__PURE__ */ jsxs3(
              "button",
              {
                type: "button",
                onClick: onUpload,
                disabled: pending,
                className: "flex h-9 w-full items-center gap-2 rounded px-2 text-left text-sm hover:bg-[var(--theme-hover)]",
                children: [
                  /* @__PURE__ */ jsx4(Upload, { className: "h-4 w-4" }),
                  "Upload file"
                ]
              }
            ) : null,
            onDownloadWorkspace && (downloadFormats.includes("tar") || downloadFormats.length === 0) ? /* @__PURE__ */ jsx4(
              "button",
              {
                type: "button",
                onClick: onDownloadWorkspace,
                disabled: pending || !canDownload?.(tree),
                title: canDownload?.(tree) ? "Download the workspace as a TAR archive" : "Folder downloads are unavailable for this connection.",
                className: "flex h-9 w-full items-center rounded px-2 text-left text-sm disabled:opacity-50",
                children: "Download Workspace (TAR)"
              }
            ) : null,
            onDownloadWorkspaceZip && downloadFormats.includes("zip") ? /* @__PURE__ */ jsx4("button", { type: "button", onClick: onDownloadWorkspaceZip, disabled: pending || !canDownload?.(tree), className: "flex h-9 w-full items-center rounded px-2 text-left text-sm disabled:opacity-50", children: "Download Workspace (ZIP)" }) : null,
            onImportArchive ? /* @__PURE__ */ jsxs3(Fragment3, { children: [
              /* @__PURE__ */ jsx4(
                "button",
                {
                  type: "button",
                  onClick: onImportArchive,
                  disabled: pending || !canImportArchive,
                  title: canImportArchive ? `Extract ${importFormats.map((format) => format.toUpperCase()).join(" or ")} into the workspace root` : "Archive extraction is unavailable for this connection.",
                  className: "flex h-9 w-full items-center rounded px-2 text-left text-sm disabled:opacity-50",
                  children: importFormats.includes("zip") ? "Import archive" : "Import TAR archive"
                }
              ),
              /* @__PURE__ */ jsxs3("p", { className: "max-w-64 px-2 py-1 text-xs", children: [
                canImportArchive ? `${importFormats.map((format) => format.toUpperCase()).join(" / ")}. ${archiveLimits ?? "Extraction limits are enforced by the server."}` : "Archive extraction is unsupported.",
                " ",
                "Regular uploads store archive bytes without extraction."
              ] })
            ] }) : null,
            onTrashFile ? /* @__PURE__ */ jsx4("button", { type: "button", onClick: onTrashFile, disabled: pending || !canTrash, className: "flex h-9 w-full items-center rounded px-2 text-left text-sm disabled:opacity-50", children: "Trash selected file" }) : null,
            onOpenTrash ? /* @__PURE__ */ jsx4("button", { type: "button", onClick: onOpenTrash, disabled: pending, className: "flex h-9 w-full items-center rounded px-2 text-left text-sm disabled:opacity-50", children: "Trash" }) : null,
            onMoveFile ? /* @__PURE__ */ jsx4(
              "button",
              {
                type: "button",
                onClick: onMoveFile,
                disabled: pending || !canMove,
                title: canMove ? "Move selected file to a new path" : "Select a workspace file; this connection must support file moves.",
                className: "flex h-9 w-full items-center rounded px-2 text-left text-sm disabled:opacity-50",
                children: "Move selected file"
              }
            ) : null,
            onDeleteFile ? /* @__PURE__ */ jsxs3(Fragment3, { children: [
              /* @__PURE__ */ jsx4(
                "button",
                {
                  type: "button",
                  onClick: onDeleteFile,
                  disabled: pending || !canDelete,
                  title: canDelete ? "Confirm permanent deletion of selected file" : "Select a workspace file; this connection must support file deletion.",
                  className: "flex h-9 w-full items-center rounded px-2 text-left text-sm disabled:opacity-50",
                  children: "Delete selected file\u2026"
                }
              ),
              !onEmptyGarbage ? /* @__PURE__ */ jsx4("p", { className: "max-w-64 px-2 py-1 text-xs", children: "Reversible trash and empty-trash are unsupported for this connection." }) : null
            ] }) : null,
            onEmptyGarbage ? /* @__PURE__ */ jsxs3(
              "button",
              {
                type: "button",
                onClick: onEmptyGarbage,
                disabled: pending || !canEmptyGarbage,
                className: "flex h-9 w-full items-center gap-2 rounded px-2 text-left text-sm text-rose-600 hover:bg-rose-500/10 disabled:opacity-50 dark:text-rose-300",
                children: [
                  /* @__PURE__ */ jsx4(Trash2, { className: "h-4 w-4" }),
                  "Empty garbage"
                ]
              }
            ) : null
          ] })
        ] }) : null,
        onExpandViewer ? /* @__PURE__ */ jsx4(
          "button",
          {
            type: "button",
            "data-testid": "expand-viewer",
            onClick: onExpandViewer,
            className: collapseButtonClassName,
            title: "Show Editor",
            "aria-label": "Show Editor",
            children: /* @__PURE__ */ jsx4(PanelRightOpen, { className: "h-4 w-4" })
          }
        ) : onCollapse ? /* @__PURE__ */ jsx4(
          "button",
          {
            type: "button",
            "data-testid": "collapse-explorer",
            onClick: onCollapse,
            className: collapseButtonClassName,
            title: "Hide Explorer",
            "aria-label": "Hide Explorer",
            children: /* @__PURE__ */ jsx4(PanelLeftClose, { className: "h-4 w-4" })
          }
        ) : null
      ] })
    ] }),
    filterOpen ? /* @__PURE__ */ jsxs3("div", { className: "thread-graph-explorer-filter shrink-0 border-b border-[var(--theme-border)] px-3 py-2", children: [
      /* @__PURE__ */ jsxs3("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ jsxs3("div", { className: "flex w-full min-w-0 items-center gap-2 rounded-md border border-[var(--theme-border)] bg-[var(--theme-surface-strong)] px-2", children: [
          /* @__PURE__ */ jsx4(Search, { className: "h-3.5 w-3.5 shrink-0 text-[var(--theme-fg-muted)]" }),
          /* @__PURE__ */ jsx4(
            "input",
            {
              ref: filterInputRef,
              value: filterQuery,
              onChange: (event) => onFilterQueryChange(event.currentTarget.value),
              onKeyDown: (event) => {
                if (event.key === "Escape") {
                  event.preventDefault();
                  if (filterQuery) {
                    onFilterQueryChange("");
                  } else {
                    closeFilter();
                  }
                }
              },
              className: "h-8 min-w-0 flex-1 bg-transparent text-sm text-[var(--theme-fg)] outline-none",
              placeholder: "Filter loaded files",
              "aria-label": "Filter workspace files"
            }
          ),
          /* @__PURE__ */ jsx4(
            "button",
            {
              type: "button",
              onClick: closeFilter,
              className: "inline-flex h-7 w-7 items-center justify-center rounded text-[var(--theme-fg-muted)] hover:bg-[var(--theme-hover)] hover:text-[var(--theme-fg)]",
              title: "Close filter",
              "aria-label": "Close filter",
              children: /* @__PURE__ */ jsx4(X, { className: "h-3.5 w-3.5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx4(
          "div",
          {
            className: "thread-graph-explorer-filter-mode inline-flex shrink-0 self-end rounded-md border border-[var(--theme-border)] p-0.5",
            role: "group",
            "aria-label": "Explorer filter mode",
            children: ["filter", "highlight"].map((mode) => /* @__PURE__ */ jsx4(
              "button",
              {
                type: "button",
                onClick: () => onFilterModeChange(mode),
                className: `h-7 rounded px-2 text-xs ${filterMode === mode ? "is-active" : ""}`,
                "aria-pressed": filterMode === mode,
                title: mode === "filter" ? "Show matches only" : "Highlight matches",
                children: mode === "filter" ? "Filter" : "Highlight"
              },
              mode
            ))
          }
        )
      ] }),
      filterQuery ? /* @__PURE__ */ jsxs3(
        "div",
        {
          className: "mt-1.5 text-xs text-[var(--theme-fg-muted)]",
          "aria-live": "polite",
          children: [
            filterResult.matchCount,
            " ",
            filterResult.matchCount === 1 ? "match" : "matches",
            filterResult.hasUnresolvedDirectories ? " in loaded folders" : ""
          ]
        }
      ) : null
    ] }) : null,
    liveNodes.length > 0 ? /* @__PURE__ */ jsxs3("div", { className: "shrink-0 border-b border-slate-200 py-2 dark:border-[#2a2f3a]", children: [
      /* @__PURE__ */ jsx4("div", { className: "thread-graph-workspace-label px-3 pb-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400", children: "Live" }),
      liveNodes.map((node) => /* @__PURE__ */ jsxs3(
        "button",
        {
          type: "button",
          "data-testid": "live-molecule-item",
          "data-molecule-id": node.artifact?.id ?? node.id,
          onClick: () => onSelect(node.id),
          className: `thread-graph-tree-row flex min-h-11 w-full items-center gap-2 px-3 py-2 text-left text-sm transition sm:min-h-7 sm:py-1 ${selectedNodeId === node.id ? "is-selected" : ""}`,
          children: [
            /* @__PURE__ */ jsx4(FileCode22, { className: "h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-300" }),
            /* @__PURE__ */ jsx4("span", { className: "min-w-0 flex-1 truncate", children: node.name })
          ]
        },
        node.id
      ))
    ] }) : null,
    initialLoading ? /* @__PURE__ */ jsx4(
      "div",
      {
        className: "flex-1 space-y-1 px-3 py-2",
        role: "status",
        "aria-label": "Loading workspace files",
        children: [0, 1, 2, 3, 4].map((index) => /* @__PURE__ */ jsx4(
          "div",
          {
            className: "h-7 animate-pulse rounded bg-[var(--theme-surface-strong)] motion-reduce:animate-none",
            style: { width: `${72 - index * 6}%` }
          },
          index
        ))
      }
    ) : rootError ? /* @__PURE__ */ jsxs3("div", { className: "mx-3 mt-2 rounded-md border border-rose-500/25 bg-rose-500/10 px-3 py-3 text-sm text-rose-700 dark:text-rose-200", children: [
      /* @__PURE__ */ jsx4("p", { children: rootError }),
      /* @__PURE__ */ jsx4(
        "button",
        {
          type: "button",
          onClick: onRefresh,
          className: "mt-2 h-8 rounded px-2 font-medium hover:bg-rose-500/10",
          children: "Retry"
        }
      )
    ] }) : /* @__PURE__ */ jsx4(
      WorkspaceExplorerTree,
      {
        tree: visibleTree,
        expandedPaths,
        filterMode,
        filterQuery,
        compactFolders,
        directoryErrors,
        loadingPaths,
        selectedNodeId,
        revealRequestKey,
        scrollerRef: explorerScrollerRef,
        scrollTopRef: explorerScrollTopRef,
        ...onCopyPath ? { onCopyPath } : {},
        ...onDownload ? { onDownload } : {},
        ...onDownloadZip ? { onDownloadZip } : {},
        ...canDownload ? { canDownload } : {},
        onOpenFilter: openFilter,
        onFilterResultsChange: handleFilterResultsChange,
        ...onPreview ? { onPreview } : {},
        ...onPin ? { onPin } : {},
        ...onRetryDirectory ? { onRetryDirectory } : {},
        onSelect: (node) => {
          onSelect(node.id);
          onSelectNode?.(node);
        },
        onToggle
      }
    ),
    !initialLoading && !rootError && filterQuery && filterMode === "filter" && filterResult.matchCount === 0 ? /* @__PURE__ */ jsx4("p", { className: "thread-graph-workspace-empty mx-4 mb-4 rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-4 text-sm text-slate-500 dark:border-[#303642] dark:bg-[#1b1f29] dark:text-slate-400", children: "No matches in loaded folders." }) : visibleTree.children.length === 0 ? /* @__PURE__ */ jsx4("p", { className: "thread-graph-workspace-empty mx-4 mb-4 rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-4 text-sm text-slate-500 dark:border-[#303642] dark:bg-[#1b1f29] dark:text-slate-400", children: "This workspace is empty. Agent tool runs execute inside the thread workspace, so files should appear here as the session works." }) : null
  ] });
}

// src/components/graph-workspace/GraphWorkspacePreviewPane.tsx
import {
  lazy,
  memo,
  Suspense,
  useEffect as useEffect5,
  useMemo as useMemo5,
  useRef as useRef6,
  useState as useState7
} from "react";
import {
  BookOpen,
  ChevronRight as ChevronRight2,
  Code2,
  Download as Download2,
  Pencil,
  PanelLeftOpen,
  PanelRightClose,
  Save,
  X as X3
} from "lucide-react";
import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import remarkGfm from "remark-gfm";

// src/components/graph-workspace/GraphWorkspaceCards.tsx
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
function WorkspaceInfoCard({
  label,
  children
}) {
  return /* @__PURE__ */ jsxs4("section", { className: "thread-workspace-card rounded-lg border p-3", children: [
    /* @__PURE__ */ jsx5("p", { className: "text-xs font-medium uppercase tracking-[0.14em] text-[var(--theme-fg-muted)]", children: label }),
    /* @__PURE__ */ jsx5("div", { className: "mt-2 text-sm text-[var(--theme-fg)]", children })
  ] });
}

// src/components/graph-workspace/WorkspaceFileTabs.tsx
import { Circle, FileCode2 as FileCode23, X as X2 } from "lucide-react";
import { useState as useState6 } from "react";
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
function WorkspaceFileTabs({
  activePath,
  dirtyPaths,
  onClose,
  onSelect,
  tabs,
  trailingAction
}) {
  const [pendingClosePath, setPendingClosePath] = useState6(null);
  const pendingTab = tabs.find((tab) => tab.path === pendingClosePath) ?? null;
  if (tabs.length === 0) {
    return null;
  }
  function requestClose(path) {
    if (dirtyPaths.has(path)) {
      setPendingClosePath(path);
      return;
    }
    onClose(path);
  }
  return /* @__PURE__ */ jsxs5("div", { className: "thread-graph-editor-tabs-shell shrink-0", children: [
    /* @__PURE__ */ jsxs5("div", { className: "flex min-w-0 border-b border-[var(--theme-border)]", children: [
      /* @__PURE__ */ jsx6(
        "div",
        {
          className: "thread-graph-editor-tabs flex min-w-0 flex-1 overflow-x-auto",
          role: "tablist",
          "aria-label": "Open workspace files",
          children: tabs.map((tab) => {
            const active = tab.path === activePath;
            const dirty = dirtyPaths.has(tab.path);
            return /* @__PURE__ */ jsxs5(
              "div",
              {
                className: `thread-graph-editor-tab group/tab flex h-8 min-w-0 max-w-52 shrink-0 items-center border-r ${active ? "is-active" : ""} ${tab.pinned ? "is-pinned" : "is-preview"}`,
                role: "presentation",
                children: [
                  /* @__PURE__ */ jsxs5(
                    "button",
                    {
                      type: "button",
                      role: "tab",
                      "aria-selected": active,
                      title: tab.path,
                      onClick: () => onSelect(tab.path),
                      className: `flex h-full min-w-0 flex-1 items-center gap-1.5 px-2.5 text-left text-xs ${tab.pinned ? "" : "italic"}`,
                      children: [
                        /* @__PURE__ */ jsx6(FileCode23, { className: "h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" }),
                        /* @__PURE__ */ jsx6("span", { className: "truncate", children: tab.name })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx6(
                    "button",
                    {
                      type: "button",
                      onClick: () => requestClose(tab.path),
                      className: "thread-graph-editor-tab-close mr-1 flex h-5 w-5 shrink-0 items-center justify-center rounded",
                      title: `Close ${tab.name}`,
                      "aria-label": `Close ${tab.name}`,
                      children: dirty ? /* @__PURE__ */ jsx6(Circle, { className: "h-2.5 w-2.5 fill-current" }) : /* @__PURE__ */ jsx6(X2, { className: "h-3.5 w-3.5" })
                    }
                  )
                ]
              },
              tab.path
            );
          })
        }
      ),
      trailingAction ? /* @__PURE__ */ jsx6("div", { className: "thread-graph-editor-tabs-action flex h-8 shrink-0 items-center px-1", children: trailingAction }) : null
    ] }),
    pendingTab ? /* @__PURE__ */ jsxs5(
      "div",
      {
        className: "thread-graph-editor-close-confirm flex min-h-10 items-center justify-between gap-3 border-b px-3 py-1.5 text-xs",
        role: "alert",
        children: [
          /* @__PURE__ */ jsxs5("span", { className: "min-w-0 truncate", children: [
            "Discard unsaved changes in ",
            pendingTab.name,
            "?"
          ] }),
          /* @__PURE__ */ jsxs5("div", { className: "flex shrink-0 items-center gap-1", children: [
            /* @__PURE__ */ jsx6(
              "button",
              {
                type: "button",
                onClick: () => setPendingClosePath(null),
                className: "h-7 rounded px-2 hover:bg-[var(--theme-hover)]",
                children: "Keep editing"
              }
            ),
            /* @__PURE__ */ jsx6(
              "button",
              {
                type: "button",
                onClick: () => {
                  setPendingClosePath(null);
                  onClose(pendingTab.path);
                },
                className: "h-7 rounded bg-rose-500/15 px-2 text-rose-700 hover:bg-rose-500/25 dark:text-rose-200",
                children: "Discard"
              }
            )
          ] })
        ]
      }
    ) : null
  ] });
}

// src/components/graph-workspace/GraphWorkspacePreviewPane.tsx
import { Fragment as Fragment4, jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
var GraphWorkspaceMonacoEditor = lazy(
  () => import("./GraphWorkspaceMonacoEditor-THUABSPG.js")
);
function DownloadFilePreview({
  node,
  onDownload
}) {
  const [pending, setPending] = useState7(false);
  const [error, setError] = useState7(null);
  const size = node.size;
  const sizeLabel = size === void 0 ? null : size < 1024 ? `${size} B` : size < 1024 * 1024 ? `${(size / 1024).toFixed(1)} KB` : `${(size / (1024 * 1024)).toFixed(1)} MB`;
  return /* @__PURE__ */ jsxs6("div", { className: "thread-graph-download-preview", children: [
    /* @__PURE__ */ jsx7(
      Download2,
      {
        "aria-hidden": "true",
        className: "thread-graph-download-preview-icon"
      }
    ),
    /* @__PURE__ */ jsx7("strong", { children: node.name }),
    sizeLabel ? /* @__PURE__ */ jsx7("span", { children: sizeLabel }) : null,
    /* @__PURE__ */ jsx7("p", { children: "This file is available to download." }),
    onDownload ? /* @__PURE__ */ jsxs6(
      "button",
      {
        type: "button",
        disabled: pending,
        "aria-label": `Download ${node.name}`,
        onClick: async () => {
          setPending(true);
          setError(null);
          try {
            await onDownload();
          } catch (caught) {
            setError(
              caught instanceof Error ? caught.message : "Download failed. Please try again."
            );
          } finally {
            setPending(false);
          }
        },
        children: [
          /* @__PURE__ */ jsx7(Download2, { "aria-hidden": "true", size: 16 }),
          pending ? "Downloading\u2026" : "Download file"
        ]
      }
    ) : /* @__PURE__ */ jsx7("span", { children: "Downloads are unavailable for this connection." }),
    error ? /* @__PURE__ */ jsx7("p", { role: "alert", children: error }) : null
  ] });
}
var SMALL_TEXT_FILE_MAX_BYTES = 50 * 1024;
var SMALL_TEXT_FILE_MAX_LINES = 1e3;
var MARKDOWN_EXTENSIONS = /* @__PURE__ */ new Set(["md", "markdown"]);
var CODE_LANGUAGE_ALIASES = {
  cs: "csharp",
  jsonl: "json",
  md: "markdown",
  rb: "ruby",
  rs: "rust",
  sh: "bash",
  yml: "yaml"
};
function transparentHighlightBackground(html) {
  return html.replace(/background-color:[^;"]+;?/g, "background-color: transparent;").replace(/background:[^;"]+;?/g, "background: transparent;");
}
function resolveWorkspaceMarkdownPath({
  markdownPath,
  resourceUrl,
  workspaceRootPath = ""
}) {
  const raw = localFileHref(
    resourceUrl,
    typeof window === "undefined" ? void 0 : window.location.origin
  );
  if (!raw) return null;
  const path = raw.split("#")[0] ?? "";
  if (path.startsWith("/") || /^[a-z]:\//i.test(path)) {
    return workspaceRootPath ? relativeWorkspacePath(path, workspaceRootPath) : path.replace(/^\/+/, "");
  }
  const base = workspaceRootPath ? relativeWorkspacePath(markdownPath, workspaceRootPath) : normalizeFileSystemPath(markdownPath);
  if (base === null) return null;
  const directory = base.slice(0, Math.max(0, base.lastIndexOf("/")));
  return relativeWorkspacePath(
    directory ? `${directory}/${path}` : path,
    workspaceRootPath
  );
}
function isSmallEditableTextFile(file) {
  return !file.truncated && file.size <= SMALL_TEXT_FILE_MAX_BYTES && file.content.split("\n").length <= SMALL_TEXT_FILE_MAX_LINES;
}
function previewTargetTitle(target) {
  if (!target) {
    return null;
  }
  return target.node.path || target.node.name || null;
}
function graphWorkspacePreviewTargetFromNode(node) {
  if (!node) {
    return null;
  }
  switch (node.kind) {
    case "live-artifact":
      return { kind: "live-molecule", node };
    case "file":
      return { kind: "workspace-file", node };
    case "artifact":
      return { kind: "artifact", node };
    case "event":
      return { kind: "event", node };
    case "meta":
      return { kind: "meta", node };
    case "directory":
      return null;
  }
}
var GraphWorkspaceCodePreview = memo(function GraphWorkspaceCodePreview2({
  content,
  focusLine,
  language = "text"
}) {
  const rootRef = useRef6(null);
  const [highlighter, setHighlighter] = useState7(null);
  const [dark, setDark] = useState7(false);
  useEffect5(() => {
    let alive = true;
    getGraphChatHighlighter().then((loadedHighlighter) => {
      if (alive) {
        setHighlighter(loadedHighlighter);
      }
    }).catch(() => void 0);
    return () => {
      alive = false;
    };
  }, []);
  useEffect5(() => {
    const shell = rootRef.current?.closest(".thread-ui-shell");
    const readDark = () => shell ? shell.getAttribute("data-theme-effective") === "dark" || shell.classList.contains("dark") || shell.classList.contains("thread-ui-theme-dark") : document.documentElement.classList.contains("dark");
    setDark(readDark());
    if (!shell) {
      return;
    }
    const observer = new MutationObserver(() => setDark(readDark()));
    observer.observe(shell, {
      attributes: true,
      attributeFilter: ["class", "data-theme-effective"]
    });
    return () => observer.disconnect();
  }, []);
  const highlightedHtml = useMemo5(() => {
    if (!highlighter) {
      return "";
    }
    const loadedLanguages = highlighter.getLoadedLanguages?.() ?? [];
    const normalizedLanguage = CODE_LANGUAGE_ALIASES[language] ?? language;
    const resolvedLanguage = loadedLanguages.includes(normalizedLanguage) ? normalizedLanguage : "text";
    try {
      return transparentHighlightBackground(
        highlighter.codeToHtml(content, {
          lang: resolvedLanguage,
          theme: dark ? "ayu-dark" : "ayu-light"
        })
      );
    } catch {
      return transparentHighlightBackground(
        highlighter.codeToHtml(content, {
          lang: "text",
          theme: dark ? "ayu-dark" : "ayu-light"
        })
      );
    }
  }, [content, dark, highlighter, language]);
  useEffect5(() => {
    const root = rootRef.current;
    root?.querySelectorAll(".is-focused-line").forEach((element) => element.classList.remove("is-focused-line"));
    if (!root || !focusLine || focusLine < 1) {
      return;
    }
    const target = root.querySelector(`[data-line="${focusLine}"]`) ?? root.querySelector(`.line:nth-child(${focusLine})`);
    target?.classList.add("is-focused-line");
    target?.scrollIntoView?.({ block: "center" });
  }, [focusLine, highlightedHtml]);
  const lines = content.split("\n");
  return /* @__PURE__ */ jsx7(
    "div",
    {
      ref: rootRef,
      className: "thread-graph-code-preview min-h-0 flex-1 overflow-auto",
      role: "region",
      "aria-label": "Source code",
      children: highlightedHtml ? /* @__PURE__ */ jsx7(
        "div",
        {
          className: "thread-graph-highlighted-code-preview",
          dangerouslySetInnerHTML: { __html: highlightedHtml }
        }
      ) : /* @__PURE__ */ jsx7("pre", { className: "thread-graph-plain-code-preview", children: /* @__PURE__ */ jsx7("code", { children: lines.map((line, index) => /* @__PURE__ */ jsxs6(
        "span",
        {
          className: `thread-graph-code-line ${focusLine === index + 1 ? "is-focused-line" : ""}`,
          "data-line": index + 1,
          children: [
            /* @__PURE__ */ jsx7(
              "span",
              {
                className: "thread-graph-code-line-number",
                "aria-hidden": "true",
                children: index + 1
              }
            ),
            /* @__PURE__ */ jsx7("span", { children: line || " " })
          ]
        },
        index
      )) }) })
    }
  );
});
var GraphWorkspaceMarkdownPreview = memo(
  function GraphWorkspaceMarkdownPreview2({
    content,
    markdownPath,
    onOpenWorkspaceFile,
    resolveWorkspaceFileUrl,
    workspaceRootPath
  }) {
    const resolvePath = (resourceUrl) => resourceUrl ? resolveWorkspaceMarkdownPath({
      markdownPath,
      resourceUrl,
      workspaceRootPath: workspaceRootPath ?? ""
    }) : null;
    return /* @__PURE__ */ jsx7("div", { className: "thread-graph-markdown thread-graph-markdown-preview min-h-0 flex-1 overflow-auto px-5 py-4 sm:px-7 sm:py-6", children: /* @__PURE__ */ jsx7(
      ReactMarkdown,
      {
        urlTransform: (url) => localFileHref(
          url,
          typeof window === "undefined" ? void 0 : window.location.origin
        ) ? url : defaultUrlTransform(url),
        remarkPlugins: [remarkGfm],
        components: {
          a({ href, children, ...props }) {
            const workspacePath = resolvePath(href);
            if (workspacePath && onOpenWorkspaceFile) {
              return /* @__PURE__ */ jsx7(
                WorkspaceFileLink,
                {
                  path: workspacePath,
                  onOpen: ({ path }) => onOpenWorkspaceFile(path),
                  children
                }
              );
            }
            if (href && localFileHref(
              href,
              typeof window === "undefined" ? void 0 : window.location.origin
            ))
              return /* @__PURE__ */ jsx7("span", { children });
            return /* @__PURE__ */ jsx7("a", { ...props, ...externalLinkProps(href), href, children });
          },
          img({ src, alt, ...props }) {
            const workspacePath = resolvePath(src);
            const local = src && localFileHref(
              src,
              typeof window === "undefined" ? void 0 : window.location.origin
            );
            const resolvedSrc = local ? workspacePath ? resolveWorkspaceFileUrl?.(workspacePath) : null : src;
            if (!resolvedSrc) {
              return null;
            }
            return /* @__PURE__ */ jsx7(
              ZoomableImage,
              {
                src: resolvedSrc,
                alt: alt ?? "",
                loading: "lazy",
                className: props.className
              }
            );
          }
        },
        children: content
      }
    ) });
  }
);
function GraphWorkspacePreviewPane({
  activeFilePath,
  dirtyFilePaths = /* @__PURE__ */ new Set(),
  error,
  fileTabs = [],
  focusLine,
  downloadOnly,
  onDownloadFile,
  imageUrl,
  loadingMore,
  onSaveFile,
  onCloseFileTab,
  onDirtyChange,
  onExpandExplorer,
  onOpenWorkspaceFile,
  onLoadMore,
  onReloadFile,
  onSelectFileTab,
  onCollapse,
  pdfUrl,
  previewFile,
  previewLoading,
  plugins,
  resolveWorkspaceFileUrl,
  selectedTarget,
  workspaceRootPath
}) {
  const surfaceRef = useRef6(null);
  const drafts = useRef6(/* @__PURE__ */ new Map());
  const previousTabs = useRef6(fileTabs);
  const currentPath = useRef6(previewFile?.path);
  currentPath.current = previewFile?.path;
  const [editing, setEditing] = useState7(false);
  const [draftContent, setDraftContent] = useState7("");
  const [saveNotice, setSaveNotice] = useState7(null);
  const [downloadError, setDownloadError] = useState7(null);
  const [saveError, setSaveError] = useState7(null);
  const [saving, setSaving] = useState7(false);
  const [markdownView, setMarkdownView] = useState7(
    "preview"
  );
  const [compactViewer, setCompactViewer] = useState7(
    () => typeof window === "undefined" || typeof window.matchMedia !== "function" || window.matchMedia("(max-width: 639px)").matches
  );
  const [dark, setDark] = useState7(false);
  const activeNode = selectedTarget?.node ?? null;
  const renderedArtifact = activeNode?.artifact ? plugins.renderArtifact({
    artifact: activeNode.artifact,
    expanded: true,
    presentation: "workspace",
    onToggleExpanded: () => void 0
  }) : null;
  const moleculeSnapshot = buildMoleculePreviewSnapshot(previewFile ?? null);
  const fileLanguage = previewFile?.language || languageForPath(previewFile?.path ?? "");
  const extension = previewFile ? extensionOf(previewFile.path) : "";
  const isMarkdownFile = MARKDOWN_EXTENSIONS.has(extension);
  const title = previewTargetTitle(selectedTarget);
  const canEditFile = Boolean(previewFile && onSaveFile) && !(previewFile && MOLECULAR_EXTENSIONS.has(extension)) && isSmallEditableTextFile(previewFile);
  const isLiveArtifactPreview = selectedTarget?.kind === "live-molecule";
  const isArtifactPreview = Boolean(activeNode?.artifact && renderedArtifact);
  const isMoleculePreview = Boolean(moleculeSnapshot) || isArtifactPreview;
  useEffect5(() => {
    if (typeof window.matchMedia !== "function") {
      return;
    }
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const update = () => setCompactViewer(mediaQuery.matches);
    update();
    mediaQuery.addEventListener?.("change", update);
    return () => mediaQuery.removeEventListener?.("change", update);
  }, []);
  useEffect5(() => {
    const shell = surfaceRef.current?.closest(".thread-ui-shell");
    const update = () => setDark(
      shell?.getAttribute("data-theme-effective") === "dark" || shell?.classList.contains("dark") || shell?.classList.contains("thread-ui-theme-dark") || false
    );
    update();
    if (!shell) {
      return;
    }
    const observer = new MutationObserver(update);
    observer.observe(shell, {
      attributes: true,
      attributeFilter: ["class", "data-theme-effective"]
    });
    return () => observer.disconnect();
  }, []);
  useEffect5(() => {
    setSaveNotice(null);
  }, [previewFile?.path]);
  useEffect5(() => {
    setSaving(false);
    setDownloadError(null);
    const draft = previewFile ? drafts.current.get(previewFile.path) : void 0;
    setEditing(draft !== void 0);
    setDraftContent(draft ?? previewFile?.content ?? "");
    setSaveError(null);
    setMarkdownView("preview");
  }, [previewFile?.path, previewFile?.content]);
  useEffect5(() => {
    for (const tab of previousTabs.current) {
      if (!fileTabs.some((current) => current.path === tab.path))
        drafts.current.delete(tab.path);
    }
    previousTabs.current = fileTabs;
  }, [fileTabs]);
  function updateDraft(content) {
    setDraftContent(content);
    if (previewFile) drafts.current.set(previewFile.path, content);
  }
  useEffect5(() => {
    if (!previewFile) {
      return;
    }
    onDirtyChange?.(
      previewFile.path,
      editing && draftContent !== previewFile.content
    );
  }, [draftContent, editing, onDirtyChange, previewFile]);
  async function handleSaveFile() {
    if (!previewFile || !onSaveFile) {
      return;
    }
    const path = previewFile.path;
    setSaveNotice(null);
    setSaving(true);
    setSaveError(null);
    try {
      await onSaveFile({
        path: previewFile.path,
        content: draftContent
      });
      drafts.current.delete(path);
      if (currentPath.current === path) {
        setEditing(false);
        setSaveNotice(`Saved ${previewFile.name}.`);
      }
    } catch (error2) {
      if (currentPath.current !== path) return;
      setSaveError(
        error2 instanceof Error ? error2.message : "Failed to save file."
      );
    } finally {
      if (currentPath.current === path) setSaving(false);
    }
  }
  const breadcrumbSegments = previewFile ? previewFile.path.replace(workspaceRootPath ?? "", "").split("/").filter(Boolean) : [];
  const fileToolbar = previewFile && (isMarkdownFile || canEditFile) ? /* @__PURE__ */ jsxs6("div", { className: "flex shrink-0 items-center gap-1", children: [
    isMarkdownFile && !editing ? /* @__PURE__ */ jsxs6(
      "div",
      {
        className: "thread-graph-markdown-view-switch inline-flex items-center rounded border p-px",
        role: "group",
        "aria-label": "Markdown view",
        children: [
          /* @__PURE__ */ jsx7(
            "button",
            {
              type: "button",
              onClick: () => setMarkdownView("preview"),
              className: `inline-flex h-5 w-5 items-center justify-center rounded transition ${markdownView === "preview" ? "is-active" : ""}`,
              "aria-pressed": markdownView === "preview",
              title: "Markdown preview",
              "aria-label": "Markdown preview",
              children: /* @__PURE__ */ jsx7(BookOpen, { className: "h-3 w-3" })
            }
          ),
          /* @__PURE__ */ jsx7(
            "button",
            {
              type: "button",
              onClick: () => setMarkdownView("source"),
              className: `inline-flex h-5 w-5 items-center justify-center rounded transition ${markdownView === "source" ? "is-active" : ""}`,
              "aria-pressed": markdownView === "source",
              title: "Markdown source",
              "aria-label": "Markdown source",
              children: /* @__PURE__ */ jsx7(Code2, { className: "h-3 w-3" })
            }
          )
        ]
      }
    ) : null,
    canEditFile ? /* @__PURE__ */ jsx7("div", { className: "flex shrink-0 items-center gap-0.5", children: editing ? /* @__PURE__ */ jsxs6(Fragment4, { children: [
      /* @__PURE__ */ jsx7(
        "button",
        {
          type: "button",
          onClick: () => {
            drafts.current.delete(previewFile.path);
            setDraftContent(previewFile.content);
            setEditing(false);
            setSaveError(null);
          },
          disabled: saving,
          className: "thread-graph-editor-toolbar-button flex h-6 w-6 items-center justify-center rounded transition disabled:cursor-not-allowed disabled:opacity-40",
          title: "Cancel edits",
          "aria-label": "Cancel edits",
          children: /* @__PURE__ */ jsx7(X3, { className: "h-3.5 w-3.5" })
        }
      ),
      /* @__PURE__ */ jsx7(
        "button",
        {
          type: "button",
          onClick: () => void handleSaveFile(),
          disabled: saving || draftContent === previewFile.content,
          className: "thread-graph-editor-toolbar-button flex h-6 w-6 items-center justify-center rounded transition disabled:cursor-not-allowed disabled:opacity-40",
          title: "Save file",
          "aria-label": "Save file",
          children: /* @__PURE__ */ jsx7(Save, { className: "h-3.5 w-3.5" })
        }
      )
    ] }) : /* @__PURE__ */ jsx7(
      "button",
      {
        type: "button",
        onClick: () => {
          setDraftContent(previewFile.content);
          setMarkdownView("source");
          setEditing(true);
          setSaveError(null);
        },
        className: "thread-graph-editor-toolbar-button flex h-6 w-6 items-center justify-center rounded transition",
        title: "Edit file",
        "aria-label": "Edit file",
        children: /* @__PURE__ */ jsx7(Pencil, { className: "h-3.5 w-3.5" })
      }
    ) }) : null
  ] }) : null;
  const viewerPaneToggle = onExpandExplorer ? /* @__PURE__ */ jsx7(
    "button",
    {
      type: "button",
      onClick: onExpandExplorer,
      "data-testid": "expand-explorer",
      className: "flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--theme-fg-muted)] transition hover:bg-[var(--theme-hover)] hover:text-[var(--theme-fg)]",
      title: "Show Explorer",
      "aria-label": "Show Explorer",
      children: /* @__PURE__ */ jsx7(PanelLeftOpen, { className: "h-3.5 w-3.5" })
    }
  ) : onCollapse ? /* @__PURE__ */ jsx7(
    "button",
    {
      type: "button",
      onClick: onCollapse,
      "data-testid": "collapse-viewer",
      className: "flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--theme-fg-muted)] transition hover:bg-[var(--theme-hover)] hover:text-[var(--theme-fg)]",
      title: "Hide Editor",
      "aria-label": "Hide Editor",
      children: /* @__PURE__ */ jsx7(PanelRightClose, { className: "h-3.5 w-3.5" })
    }
  ) : null;
  return /* @__PURE__ */ jsxs6(
    "section",
    {
      ref: surfaceRef,
      className: "thread-graph-viewer flex h-full min-h-0 flex-col overflow-hidden rounded-md",
      "data-preview-target-kind": selectedTarget?.kind ?? "none",
      children: [
        selectedTarget?.kind !== "workspace-file" ? /* @__PURE__ */ jsxs6("div", { className: "thread-graph-viewer-header flex h-9 shrink-0 items-center justify-between gap-2 border-b px-2.5", children: [
          /* @__PURE__ */ jsx7("span", { className: "min-w-0 truncate text-xs font-medium text-[var(--theme-fg)]", children: title ?? "Preview" }),
          viewerPaneToggle
        ] }) : null,
        fileTabs.length > 0 && onCloseFileTab && onSelectFileTab ? /* @__PURE__ */ jsx7(
          WorkspaceFileTabs,
          {
            activePath: activeFilePath ?? null,
            dirtyPaths: dirtyFilePaths,
            onClose: onCloseFileTab,
            onSelect: onSelectFileTab,
            tabs: fileTabs,
            trailingAction: fileToolbar || viewerPaneToggle ? /* @__PURE__ */ jsxs6(Fragment4, { children: [
              fileToolbar,
              viewerPaneToggle
            ] }) : null
          }
        ) : null,
        /* @__PURE__ */ jsxs6("div", { className: "flex min-h-0 flex-1 flex-col overflow-hidden", children: [
          error ? /* @__PURE__ */ jsx7(
            "div",
            {
              role: "alert",
              className: "border-b border-rose-200 bg-rose-50 px-5 py-3 text-sm text-rose-700 dark:border-rose-400/25 dark:bg-rose-400/10 dark:text-rose-200",
              children: error
            }
          ) : null,
          saveNotice ? /* @__PURE__ */ jsx7("p", { role: "status", children: saveNotice }) : null,
          downloadError ? /* @__PURE__ */ jsx7("p", { role: "alert", children: downloadError }) : null,
          !selectedTarget ? /* @__PURE__ */ jsx7("div", { className: "flex min-h-0 flex-1 items-center justify-center px-5 text-center text-sm text-slate-400 dark:text-slate-500", children: "Pick a live molecule, workspace file, artifact, or thread event to preview it." }) : selectedTarget.kind === "workspace-file" && previewLoading ? /* @__PURE__ */ jsx7("div", { className: "flex min-h-0 flex-1 items-center justify-center px-5 text-center text-sm text-slate-400 dark:text-slate-500", children: "Loading file preview..." }) : selectedTarget.kind === "workspace-file" && downloadOnly ? /* @__PURE__ */ jsx7(
            DownloadFilePreview,
            {
              node: selectedTarget.node,
              onDownload: onDownloadFile
            },
            selectedTarget.node.path
          ) : selectedTarget.kind === "workspace-file" && moleculeSnapshot ? /* @__PURE__ */ jsx7("div", { className: "thread-graph-molecule-preview min-h-0 flex-1 overflow-hidden", children: /* @__PURE__ */ jsx7(
            GraphMoleculeViewer,
            {
              source: moleculeSnapshot,
              moleculeId: moleculeSnapshot.uuid ?? selectedTarget.node.path,
              title: selectedTarget.node.name
            }
          ) }) : selectedTarget.kind === "workspace-file" && imageUrl ? /* @__PURE__ */ jsx7("div", { className: "flex min-h-0 flex-1 items-center justify-center overflow-auto p-5", children: /* @__PURE__ */ jsx7(
            ZoomableImage,
            {
              src: imageUrl,
              alt: selectedTarget.node.path || selectedTarget.node.name,
              className: "max-h-full max-w-full object-contain"
            }
          ) }) : selectedTarget.kind === "workspace-file" && pdfUrl ? /* @__PURE__ */ jsx7("div", { className: "thread-graph-file-preview-frame min-h-0 flex-1 overflow-hidden", children: /* @__PURE__ */ jsx7(
            "iframe",
            {
              src: pdfUrl,
              referrerPolicy: "no-referrer",
              title: `PDF preview: ${selectedTarget.node.path || selectedTarget.node.name}`,
              className: "h-full w-full border-0"
            }
          ) }) : selectedTarget.kind === "workspace-file" && previewFile ? /* @__PURE__ */ jsxs6("div", { className: "flex min-h-0 flex-1 flex-col", children: [
            breadcrumbSegments.length > 1 || fileTabs.length === 0 && fileToolbar ? /* @__PURE__ */ jsxs6("div", { className: "thread-graph-editor-breadcrumbs flex h-7 shrink-0 items-center border-b px-2 text-[11px]", children: [
              /* @__PURE__ */ jsx7("div", { className: "flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto", children: breadcrumbSegments.map((segment, index, segments) => /* @__PURE__ */ jsxs6(
                "span",
                {
                  className: "flex shrink-0 items-center gap-0.5",
                  children: [
                    /* @__PURE__ */ jsx7(
                      "span",
                      {
                        className: index === segments.length - 1 ? "text-[var(--theme-fg)]" : "",
                        children: segment
                      }
                    ),
                    index < segments.length - 1 ? /* @__PURE__ */ jsx7(
                      ChevronRight2,
                      {
                        "aria-hidden": "true",
                        className: "h-3 w-3 text-[var(--theme-fg-muted)]"
                      }
                    ) : null
                  ]
                },
                `${segment}:${index}`
              )) }),
              fileTabs.length === 0 ? fileToolbar : null
            ] }) : null,
            saveError ? /* @__PURE__ */ jsxs6(
              "div",
              {
                role: "alert",
                className: "border-b border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-700 dark:border-rose-400/25 dark:bg-rose-400/10 dark:text-rose-200",
                children: [
                  saveError,
                  /* @__PURE__ */ jsx7("p", { children: "Your unsaved text is still in the editor. Copy it before reloading the latest file if the revision changed." }),
                  onReloadFile ? /* @__PURE__ */ jsx7(
                    "button",
                    {
                      type: "button",
                      disabled: saving,
                      onClick: () => {
                        if (!window.confirm(
                          "Discard unsaved edits and reload the latest file? Copy your changes first."
                        ))
                          return;
                        drafts.current.delete(previewFile.path);
                        setEditing(false);
                        setSaveError(null);
                        onReloadFile();
                      },
                      children: "Reload latest file"
                    }
                  ) : null
                ]
              }
            ) : null,
            editing && compactViewer ? /* @__PURE__ */ jsx7(
              "textarea",
              {
                value: draftContent,
                onChange: (event) => updateDraft(event.currentTarget.value),
                spellCheck: false,
                "aria-label": "Workspace file editor",
                className: "thread-graph-file-editor min-h-0 flex-1 resize-none border-0 bg-transparent p-4 font-mono text-[12px] leading-5 text-slate-900 outline-none dark:text-slate-100"
              }
            ) : isMarkdownFile && markdownView === "preview" && !editing ? /* @__PURE__ */ jsx7(
              GraphWorkspaceMarkdownPreview,
              {
                content: previewFile.content,
                markdownPath: previewFile.path,
                ...onOpenWorkspaceFile ? { onOpenWorkspaceFile } : {},
                ...resolveWorkspaceFileUrl ? { resolveWorkspaceFileUrl } : {},
                ...workspaceRootPath ? { workspaceRootPath } : {}
              }
            ) : compactViewer ? /* @__PURE__ */ jsx7(
              GraphWorkspaceCodePreview,
              {
                content: previewFile.content,
                focusLine,
                language: fileLanguage
              }
            ) : /* @__PURE__ */ jsx7(
              Suspense,
              {
                fallback: /* @__PURE__ */ jsx7("div", { className: "flex min-h-0 flex-1 items-center justify-center text-sm text-[var(--theme-fg-muted)]", children: "Loading editor..." }),
                children: /* @__PURE__ */ jsx7(
                  GraphWorkspaceMonacoEditor,
                  {
                    content: editing ? draftContent : previewFile.content,
                    dark,
                    focusLine,
                    language: fileLanguage,
                    onChange: updateDraft,
                    onSave: () => void handleSaveFile(),
                    path: previewFile.path,
                    readOnly: !editing
                  },
                  previewFile.path
                )
              }
            ),
            onSaveFile && !canEditFile && !MOLECULAR_EXTENSIONS.has(extension) ? /* @__PURE__ */ jsx7("p", { className: "px-4 py-2 text-xs", children: "Editing requires the complete text file, at most 50 KiB and 1,000 lines." }) : null,
            previewFile.truncated ? /* @__PURE__ */ jsx7("p", { className: "px-4 py-2 text-xs", children: "Text previews load in 24,000-byte chunks. Load more to continue, or download the complete file." }) : null,
            onDownloadFile ? /* @__PURE__ */ jsx7(
              "button",
              {
                type: "button",
                onClick: async () => {
                  try {
                    setDownloadError(null);
                    await onDownloadFile();
                  } catch (error2) {
                    setDownloadError(
                      error2 instanceof Error ? error2.message : "Download failed."
                    );
                  }
                },
                "aria-label": `Download ${previewFile.name}`,
                children: "Download complete file"
              }
            ) : null,
            previewFile.truncated && onLoadMore ? /* @__PURE__ */ jsx7("div", { className: "thread-graph-file-preview-footer flex justify-center border-t px-4 py-3", children: /* @__PURE__ */ jsx7(
              "button",
              {
                type: "button",
                onClick: onLoadMore,
                disabled: loadingMore,
                title: "Load more workspace preview",
                "aria-label": "Load more workspace preview",
                className: "thread-graph-load-more-button rounded-md px-4 py-1.5 text-xs disabled:opacity-50",
                children: loadingMore ? "Loading..." : `Load more (${(previewFile.size - previewFile.nextOffset).toLocaleString()} bytes remaining)`
              }
            ) }) : null
          ] }) : (selectedTarget.kind === "live-molecule" || selectedTarget.kind === "artifact") && selectedTarget.node.artifact ? /* @__PURE__ */ jsx7(
            "div",
            {
              className: isMoleculePreview || isLiveArtifactPreview ? "min-h-0 flex-1 overflow-hidden" : "min-h-0 flex-1 overflow-auto p-3",
              children: renderedArtifact
            }
          ) : selectedTarget.kind === "meta" ? /* @__PURE__ */ jsx7("div", { className: "min-h-0 flex-1 overflow-auto p-3", children: /* @__PURE__ */ jsx7("div", { className: "grid gap-3", children: /* @__PURE__ */ jsx7(WorkspaceInfoCard, { label: "Workspace Data", children: /* @__PURE__ */ jsx7(
            GraphWorkspaceCodePreview,
            {
              content: selectedTarget.node.detail ?? ""
            }
          ) }) }) }) : /* @__PURE__ */ jsxs6("div", { className: "flex min-h-0 flex-1 flex-col", children: [
            /* @__PURE__ */ jsx7("div", { className: "thread-graph-file-preview-header border-b px-4 py-3 text-xs uppercase tracking-[0.12em]", children: selectedTarget.node.kind }),
            /* @__PURE__ */ jsx7(
              GraphWorkspaceCodePreview,
              {
                content: selectedTarget.node.detail ?? selectedTarget.node.preview ?? selectedTarget.node.name
              }
            )
          ] })
        ] })
      ]
    }
  );
}

// src/components/graph-workspace/GraphEmptyGarbageDialog.tsx
import { jsx as jsx8, jsxs as jsxs7 } from "react/jsx-runtime";
function GraphEmptyGarbageDialog({
  files,
  onCancel,
  onConfirm
}) {
  return /* @__PURE__ */ jsx8("div", { className: "thread-graph-dialog-backdrop fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4", children: /* @__PURE__ */ jsxs7("div", { className: "thread-graph-dialog w-full max-w-sm rounded-xl border bg-[var(--theme-panel)] p-6 shadow-xl", children: [
    /* @__PURE__ */ jsx8("h3", { className: "text-base font-semibold text-[var(--theme-fg)]", children: "Empty garbage?" }),
    /* @__PURE__ */ jsxs7("p", { className: "mt-1 text-sm leading-5 text-[var(--theme-fg-muted)]", children: [
      "Permanently delete all files in the",
      " ",
      /* @__PURE__ */ jsx8("code", { className: "rounded bg-[var(--theme-muted)] px-1 text-xs text-[var(--theme-fg-soft)]", children: "garbage/" }),
      " ",
      "folder."
    ] }),
    files.length === 0 ? /* @__PURE__ */ jsx8("p", { className: "mt-3 text-sm text-[var(--theme-fg-muted)]", children: "Garbage is empty." }) : /* @__PURE__ */ jsx8("ul", { className: "mt-3 max-h-40 overflow-y-auto rounded-md border border-[var(--theme-border)] bg-[var(--theme-surface)] p-2 text-xs text-[var(--theme-fg-soft)]", children: files.map((file) => /* @__PURE__ */ jsx8("li", { className: "truncate py-0.5", title: file, children: file }, file)) }),
    /* @__PURE__ */ jsxs7("div", { className: "mt-4 flex justify-end gap-2", children: [
      /* @__PURE__ */ jsx8(
        "button",
        {
          type: "button",
          onClick: onCancel,
          className: "thread-secondary-action rounded-md px-3 py-1.5 text-sm",
          children: "Cancel"
        }
      ),
      files.length > 0 ? /* @__PURE__ */ jsx8(
        "button",
        {
          type: "button",
          onClick: onConfirm,
          className: "ui-action-danger rounded-md px-3 py-1.5 text-sm font-medium",
          children: "Yes, empty garbage"
        }
      ) : null
    ] })
  ] }) });
}

// src/components/graph-workspace/GraphWorkspaceExplorer.tsx
import { jsx as jsx9, jsxs as jsxs8 } from "react/jsx-runtime";
function GraphWorkspaceExplorer({
  activeView,
  detail,
  artifacts,
  plugins,
  status,
  focusPathRequest,
  workspaceAdapter
}) {
  const {
    activeNode,
    capabilities,
    capabilityError,
    refreshCapabilities,
    adapterModel,
    collapseAll,
    directoryErrors,
    expandedPaths,
    filterMode,
    filterQuery,
    focusWorkspacePath,
    liveNodes,
    loadingDirectoryPaths,
    loadingTree,
    refreshWorkspaceTree,
    retryDirectory,
    setLoadingTree,
    setFilterMode,
    setFilterQuery,
    setSelectedNodeId,
    setWorkspaceError,
    toggleDirectory,
    tree,
    workspaceError,
    workspaceIdentity
  } = useWorkspaceExplorerController({
    activeView,
    detail,
    artifacts,
    status,
    focusPathRequest,
    workspaceAdapter
  });
  const [collapsedPanel, setCollapsedPanel] = useState8(
    () => typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(max-width: 639px)").matches ? "viewer" : null
  );
  const [focusedLine, setFocusedLine] = useState8(null);
  const [fileTabs, setFileTabs] = useState8([]);
  const [dirtyFilePaths, setDirtyFilePaths] = useState8(
    () => /* @__PURE__ */ new Set()
  );
  const [isMobileViewport, setIsMobileViewport] = useState8(false);
  const explorerScrollerRef = useRef7(null);
  const explorerScrollTopRef = useRef7(0);
  const restoredRevealRef = useRef7(null);
  const scrollRestoreGenerationRef = useRef7(0);
  useLayoutEffect2(() => {
    ++scrollRestoreGenerationRef.current;
    return () => {
      ++scrollRestoreGenerationRef.current;
    };
  }, [focusPathRequest]);
  const pendingExplorerScrollRestoreRef = useRef7(null);
  const {
    downloadOnly,
    imageUrl,
    loadingMore,
    loadMore: handleLoadMore,
    pdfUrl,
    previewFile,
    previewLoading,
    saveFile: handleSaveFile,
    reloadFile
  } = useWorkspaceFilePreview({
    activeNode,
    adapter: workspaceAdapter,
    identity: workspaceIdentity,
    onError: setWorkspaceError,
    refreshTree: refreshWorkspaceTree
  });
  const [fileOperation, setFileOperation] = useState8(
    null
  );
  const [destination, setDestination] = useState8("");
  const {
    canDownload,
    canDelete,
    canMove,
    canTrash,
    canListTrash,
    canRestoreTrash,
    canEmptyTrash,
    trashFile,
    openTrash,
    restoreTrash,
    emptyTrash,
    showTrash,
    setShowTrash,
    trashList,
    confirmTrashEmpty,
    setConfirmTrashEmpty,
    importFormats,
    downloadFormats,
    resetTrashRetry,
    deleteFile,
    moveFile,
    notice,
    pending,
    archiveInputRef,
    handleArchiveImport,
    confirmEmptyGarbage: handleConfirmEmptyGarbage,
    copyPath: handleCopyPath,
    downloadNode: handleDownload,
    fileInputRef,
    garbageFiles,
    handleUpload,
    openGarbage: handleOpenGarbage,
    pickUploadFile,
    setShowGarbageDialog,
    showGarbageDialog
  } = useWorkspaceExplorerActions({
    activeNode,
    adapter: workspaceAdapter,
    capabilities,
    identity: workspaceIdentity,
    onError: setWorkspaceError,
    onLoadingChange: setLoadingTree,
    refreshTree: refreshWorkspaceTree,
    focusFile: (path) => {
      setCollapsedPanel(null);
      return focusWorkspacePath(path);
    },
    workspaceRootPath: detail.workspace.absPath
  });
  useEffect6(() => {
    setFileOperation(null);
  }, [activeNode?.path]);
  useEffect6(() => {
    explorerScrollTopRef.current = 0;
    pendingExplorerScrollRestoreRef.current = null;
    setFileOperation(null);
    setDestination("");
    setFocusedLine(null);
    ++scrollRestoreGenerationRef.current;
    setFileTabs([]);
    setDirtyFilePaths(/* @__PURE__ */ new Set());
  }, [workspaceIdentity.threadId, workspaceIdentity.workspaceId]);
  useEffect6(() => {
    if (activeNode?.kind !== "file" || !activeNode.path) {
      return;
    }
    setFileTabs((current) => {
      if (current.some((tab) => tab.path === activeNode.path)) {
        return current;
      }
      const previewIndex = current.findIndex((tab) => !tab.pinned);
      const nextTab = {
        name: activeNode.name,
        path: activeNode.path,
        pinned: false
      };
      if (previewIndex < 0) {
        return [...current, nextTab];
      }
      return current.map(
        (tab, index) => index === previewIndex ? nextTab : tab
      );
    });
  }, [activeNode]);
  useEffect6(() => {
    if (focusPathRequest) {
      setFocusedLine(focusPathRequest.line ?? null);
      setCollapsedPanel(null);
    }
  }, [focusPathRequest]);
  function rememberExplorerScroll() {
    const currentScrollTop = explorerScrollerRef.current?.scrollTop ?? explorerScrollTopRef.current;
    explorerScrollTopRef.current = currentScrollTop;
    pendingExplorerScrollRestoreRef.current = currentScrollTop;
  }
  function restoreExplorerScroll() {
    const generation = ++scrollRestoreGenerationRef.current;
    const target = pendingExplorerScrollRestoreRef.current ?? explorerScrollTopRef.current;
    const scroller = explorerScrollerRef.current;
    if (!scroller) {
      return;
    }
    let frame = 0;
    const restore = () => {
      const current = explorerScrollerRef.current;
      if (!current || generation !== scrollRestoreGenerationRef.current) {
        return;
      }
      current.scrollTop = Math.min(
        target,
        Math.max(0, current.scrollHeight - current.clientHeight)
      );
      explorerScrollTopRef.current = current.scrollTop;
      frame += 1;
      if (frame < 8) {
        window.requestAnimationFrame(restore);
      } else {
        pendingExplorerScrollRestoreRef.current = null;
      }
    };
    window.requestAnimationFrame(restore);
  }
  useLayoutEffect2(() => {
    if (collapsedPanel === "explorer" || focusPathRequest && restoredRevealRef.current !== focusPathRequest.requestId) {
      return;
    }
    restoreExplorerScroll();
  }, [collapsedPanel]);
  useLayoutEffect2(() => {
    if (focusPathRequest && !loadingTree && activeNode) {
      restoredRevealRef.current = focusPathRequest.requestId;
    }
  }, [focusPathRequest, loadingTree, activeNode]);
  useEffect6(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobileViewport(mediaQuery.matches);
    update();
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", update);
      return () => mediaQuery.removeEventListener("change", update);
    }
    mediaQuery.addListener(update);
    return () => mediaQuery.removeListener(update);
  }, []);
  function handlePreview(node) {
    if (node.kind !== "file") {
      return;
    }
    rememberExplorerScroll();
    setFocusedLine(null);
    setSelectedNodeId(node.id);
    setCollapsedPanel("explorer");
  }
  function handlePin(node) {
    if (node.kind !== "file" || !node.path) {
      return;
    }
    setSelectedNodeId(node.id);
    setFileTabs((current) => {
      const existing = current.find((tab) => tab.path === node.path);
      if (existing) {
        return current.map(
          (tab) => tab.path === node.path ? { ...tab, pinned: true } : tab
        );
      }
      return [...current, { name: node.name, path: node.path, pinned: true }];
    });
  }
  function handleCloseTab(path) {
    const closingIndex = fileTabs.findIndex((tab) => tab.path === path);
    const nextTabs = fileTabs.filter((tab) => tab.path !== path);
    setFileTabs(nextTabs);
    setDirtyFilePaths((current) => {
      if (!current.has(path)) {
        return current;
      }
      const next = new Set(current);
      next.delete(path);
      return next;
    });
    if (activeNode?.path !== path) {
      return;
    }
    const replacement = nextTabs[Math.min(closingIndex, nextTabs.length - 1)] ?? null;
    if (replacement) {
      void focusWorkspacePath(replacement.path);
    } else {
      setSelectedNodeId(null);
    }
  }
  const explorerActions = {
    onCopyPath: handleCopyPath,
    ...workspaceAdapter?.downloadNode ? { onDownload: (node, format) => void handleDownload(node, format) } : {},
    canDownload: (node) => !pending && canDownload(node),
    ...workspaceAdapter?.downloadNode && downloadFormats.includes("zip") ? { onDownloadZip: (node) => void handleDownload(node, "zip") } : {},
    ...workspaceAdapter?.emptyGarbage ? { onEmptyGarbage: handleOpenGarbage } : {},
    ...workspaceAdapter ? {
      onRefresh: () => {
        if (pending) return;
        resetTrashRetry();
        refreshCapabilities();
        void refreshWorkspaceTree(activeNode?.path ?? null);
      }
    } : {},
    ...workspaceAdapter?.uploadFile ? { onUpload: pickUploadFile } : {}
  };
  const explorerPanel = /* @__PURE__ */ jsx9(
    WorkspaceExplorerPanel,
    {
      canEmptyGarbage: Boolean(workspaceAdapter?.emptyGarbage),
      canUpload: Boolean(workspaceAdapter?.uploadFile),
      pending,
      canImportArchive: importFormats.length > 0 && Boolean(workspaceAdapter?.importArchive),
      importFormats,
      downloadFormats,
      archiveLimits: capabilities ? `${capabilities.maxArchiveBytes?.toLocaleString() ?? "bounded"} bytes expanded, ${capabilities.maxArchiveEntries?.toLocaleString() ?? "bounded"} entries; no symlinks or paths outside the workspace.` : void 0,
      onImportArchive: () => archiveInputRef.current?.click(),
      onDownloadWorkspace: () => void handleDownload(tree),
      onDownloadWorkspaceZip: () => void handleDownload(tree, "zip"),
      canTrash,
      onTrashFile: canListTrash ? () => void trashFile() : void 0,
      onOpenTrash: canListTrash ? () => void openTrash() : void 0,
      canDelete,
      canMove,
      onDeleteFile: capabilities?.trash ? void 0 : () => setFileOperation("delete"),
      onMoveFile: () => {
        setDestination(activeNode?.path ?? "");
        setFileOperation("move");
      },
      compactFolders: !isMobileViewport,
      directoryErrors,
      filterMode,
      filterQuery,
      initialLoading: Boolean(workspaceAdapter && !adapterModel && loadingTree),
      rootError: workspaceAdapter && !adapterModel ? workspaceError : null,
      ...collapsedPanel === "viewer" ? { onExpandViewer: () => setCollapsedPanel(null) } : {
        onCollapse: () => {
          rememberExplorerScroll();
          setCollapsedPanel("explorer");
        }
      },
      expandedPaths,
      loadingPaths: loadingDirectoryPaths,
      loading: loadingTree,
      explorerScrollTopRef,
      explorerScrollerRef,
      ...explorerActions,
      onCollapseAll: collapseAll,
      onFilterModeChange: setFilterMode,
      onFilterQueryChange: setFilterQuery,
      onRetryDirectory: (path) => void retryDirectory(path),
      onPreview: handlePreview,
      onPin: handlePin,
      onSelect: (nodeId) => {
        setSelectedNodeId(nodeId);
      },
      onSelectNode: (node) => {
        setFocusedLine(null);
        if (isMobileViewport && node.kind !== "directory") {
          rememberExplorerScroll();
          setCollapsedPanel("explorer");
        }
      },
      onToggle: toggleDirectory,
      selectedNodeId: activeNode?.id ?? null,
      revealRequestKey: focusPathRequest?.requestId,
      tree,
      liveNodes
    }
  );
  const viewerPanel = /* @__PURE__ */ jsx9(
    GraphWorkspacePreviewPane,
    {
      activeFilePath: activeNode?.kind === "file" ? activeNode.path : null,
      dirtyFilePaths,
      error: null,
      fileTabs,
      downloadOnly,
      ...activeNode?.kind === "file" && canDownload(activeNode) ? { onDownloadFile: () => handleDownload(activeNode) } : {},
      imageUrl,
      loadingMore,
      focusLine: focusedLine,
      onOpenWorkspaceFile: (path) => {
        setFocusedLine(null);
        setCollapsedPanel(null);
        void focusWorkspacePath(path);
      },
      onLoadMore: () => void handleLoadMore(),
      onCloseFileTab: handleCloseTab,
      onDirtyChange: (path, dirty) => {
        if (dirty) {
          setFileTabs(
            (current) => current.map(
              (tab) => tab.path === path ? { ...tab, pinned: true } : tab
            )
          );
        }
        setDirtyFilePaths((current) => {
          if (current.has(path) === dirty) {
            return current;
          }
          const next = new Set(current);
          if (dirty) {
            next.add(path);
          } else {
            next.delete(path);
          }
          return next;
        });
      },
      onSelectFileTab: (path) => void focusWorkspacePath(path),
      ...workspaceAdapter?.writeFile && activeNode && relativeWorkspacePath(activeNode.path, detail.workspace.absPath) !== null ? { onSaveFile: handleSaveFile } : {},
      ...collapsedPanel === "explorer" ? { onExpandExplorer: () => setCollapsedPanel(null) } : {
        onCollapse: () => {
          rememberExplorerScroll();
          setCollapsedPanel("viewer");
        }
      },
      pdfUrl,
      previewFile,
      previewLoading,
      onReloadFile: () => void reloadFile(),
      plugins,
      ...workspaceAdapter?.getRawFileUrl ? {
        resolveWorkspaceFileUrl: (path) => workspaceAdapter.getRawFileUrl?.({
          ...workspaceIdentity,
          path
        }) ?? null
      } : {},
      selectedTarget: graphWorkspacePreviewTargetFromNode(activeNode),
      workspaceRootPath: detail.workspace.absPath
    },
    `${workspaceIdentity.threadId}:${workspaceIdentity.workspaceId}`
  );
  function renderWorkspace(content) {
    return /* @__PURE__ */ jsxs8("div", { className: "flex h-full min-h-0 flex-col", children: [
      workspaceError || capabilityError ? /* @__PURE__ */ jsx9(
        "div",
        {
          role: "alert",
          className: "px-3 py-2 text-sm text-rose-700 dark:text-rose-200",
          children: workspaceError || capabilityError
        }
      ) : null,
      notice && !showTrash ? /* @__PURE__ */ jsx9("div", { role: "status", className: "max-h-28 shrink-0 overflow-auto break-words px-3 py-2 text-sm", children: notice }) : null,
      showGarbageDialog ? /* @__PURE__ */ jsx9(
        GraphEmptyGarbageDialog,
        {
          files: garbageFiles,
          onCancel: () => setShowGarbageDialog(false),
          onConfirm: () => void handleConfirmEmptyGarbage()
        }
      ) : null,
      /* @__PURE__ */ jsx9(
        WorkspaceTrashDialog,
        {
          open: showTrash,
          list: trashList,
          pending,
          error: workspaceError,
          notice,
          canRestore: canRestoreTrash,
          canEmpty: canEmptyTrash,
          confirming: confirmTrashEmpty,
          onClose: () => {
            setShowTrash(false);
            setConfirmTrashEmpty(false);
          },
          onRefresh: () => void openTrash(),
          onRestore: (entry) => void restoreTrash(entry),
          onConfirmingChange: setConfirmTrashEmpty,
          onEmpty: () => void emptyTrash()
        }
      ),
      /* @__PURE__ */ jsxs8(
        Dialog2.Root,
        {
          open: fileOperation !== null,
          onOpenChange: (open) => {
            if (!open) setFileOperation(null);
          },
          children: [
            /* @__PURE__ */ jsx9(Dialog2.Overlay, { className: "fixed inset-0 z-50 bg-black/40" }),
            /* @__PURE__ */ jsxs8(
              Dialog2.Content,
              {
                className: "fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-[var(--theme-panel)] p-6 shadow-xl",
                onOpenAutoFocus: (event) => {
                  if (fileOperation === "delete") {
                    event.preventDefault();
                    document.querySelector(
                      '[aria-label="Cancel file operation"]'
                    )?.focus();
                  }
                },
                children: [
                  /* @__PURE__ */ jsx9(Dialog2.Title, { children: fileOperation === "delete" ? "Permanently delete file" : "Move file" }),
                  /* @__PURE__ */ jsx9(Dialog2.Description, { children: fileOperation === "delete" ? `Permanently delete ${activeNode?.name}? This connection has no reversible trash. Immutable artifacts are retained, but workspace file links can stop working.` : "Move the selected file to a new workspace path. Existing files cannot be replaced." }),
                  fileOperation === "move" ? /* @__PURE__ */ jsx9(
                    "input",
                    {
                      "aria-label": "New file path",
                      value: destination,
                      onChange: (event) => setDestination(event.currentTarget.value)
                    }
                  ) : null,
                  /* @__PURE__ */ jsx9(
                    "button",
                    {
                      type: "button",
                      "aria-label": "Cancel file operation",
                      disabled: pending,
                      onClick: () => setFileOperation(null),
                      children: "Cancel"
                    }
                  ),
                  /* @__PURE__ */ jsx9(
                    "button",
                    {
                      type: "button",
                      disabled: pending || (fileOperation === "delete" ? !canDelete : !canMove),
                      onClick: () => {
                        const operation = fileOperation;
                        setFileOperation(null);
                        if (operation === "delete") void deleteFile();
                        else void moveFile(destination);
                      },
                      children: fileOperation === "delete" ? "Delete permanently" : "Move file"
                    }
                  )
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsx9("div", { className: "min-h-0 flex-1", children: content }),
      /* @__PURE__ */ jsx9(
        "input",
        {
          ref: fileInputRef,
          type: "file",
          "aria-label": "Workspace upload file input",
          "data-testid": "workspace-upload-file-input",
          className: "hidden",
          onChange: (event) => void handleUpload(event)
        }
      ),
      /* @__PURE__ */ jsx9(
        "input",
        {
          ref: archiveInputRef,
          type: "file",
          accept: importFormats.map((format) => `.${format}`).join(","),
          "aria-label": "Workspace archive import input",
          "data-testid": "workspace-archive-import-input",
          className: "hidden",
          onChange: (event) => void handleArchiveImport(event)
        }
      )
    ] });
  }
  if (collapsedPanel === "explorer") {
    return renderWorkspace(
      /* @__PURE__ */ jsx9(
        "div",
        {
          "data-testid": "workspace-panel",
          className: "relative h-full min-h-0 w-full overflow-hidden p-1",
          children: viewerPanel
        }
      )
    );
  }
  if (collapsedPanel === "viewer") {
    return renderWorkspace(
      /* @__PURE__ */ jsx9(
        "div",
        {
          "data-testid": "workspace-panel",
          className: "relative h-full min-h-0 w-full overflow-hidden p-1",
          children: explorerPanel
        }
      )
    );
  }
  return renderWorkspace(
    /* @__PURE__ */ jsx9(
      "div",
      {
        "data-testid": "workspace-panel",
        className: "flex h-full min-h-0 w-full overflow-hidden bg-transparent p-1",
        children: isMobileViewport ? /* @__PURE__ */ jsxs8(
          ResizablePanelGroup,
          {
            direction: "vertical",
            autoSaveId: `workspace-explorer-mobile:${workspaceIdentity.threadId}`,
            className: "thread-graph-workspace-mobile-stack",
            children: [
              /* @__PURE__ */ jsx9(ResizablePanel, { defaultSize: 42, minSize: 18, children: /* @__PURE__ */ jsx9("div", { className: "thread-graph-workspace-mobile-explorer h-full min-h-0 overflow-hidden", children: explorerPanel }) }),
              /* @__PURE__ */ jsx9(ResizableHandle, { className: "thread-graph-workspace-resize-handle h-1 bg-transparent after:h-px after:bg-slate-200/80 after:transition-colors hover:after:bg-slate-300 dark:after:bg-[#303642] dark:hover:after:bg-[#475063]" }),
              /* @__PURE__ */ jsx9(ResizablePanel, { defaultSize: 58, minSize: 18, children: /* @__PURE__ */ jsx9("div", { className: "thread-graph-workspace-mobile-viewer h-full min-h-0 overflow-hidden", children: viewerPanel }) })
            ]
          }
        ) : /* @__PURE__ */ jsxs8(
          ResizablePanelGroup,
          {
            direction: "horizontal",
            autoSaveId: `workspace-explorer-desktop:${workspaceIdentity.threadId}`,
            className: "thread-graph-workspace-resizable",
            children: [
              /* @__PURE__ */ jsx9(ResizablePanel, { defaultSize: 28, minSize: 18, children: /* @__PURE__ */ jsx9("div", { className: "thread-graph-workspace-explorer-pane h-full min-h-0 overflow-hidden", children: explorerPanel }) }),
              /* @__PURE__ */ jsx9(ResizableHandle, { className: "thread-graph-workspace-resize-handle w-1 bg-transparent after:w-px after:bg-slate-200/80 after:transition-colors hover:after:bg-slate-300 dark:after:bg-[#303642] dark:hover:after:bg-[#475063]" }),
              /* @__PURE__ */ jsx9(ResizablePanel, { defaultSize: 72, minSize: 40, children: /* @__PURE__ */ jsx9("div", { className: "thread-graph-workspace-viewer-pane h-full min-h-0 overflow-hidden", children: viewerPanel }) })
            ]
          }
        )
      }
    )
  );
}

// src/components/graph-chat/GraphVisualization.tsx
import { useCallback as useCallback4, useEffect as useEffect7, useMemo as useMemo6 } from "react";
import {
  addEdge,
  Background,
  Controls,
  Handle,
  MarkerType as MarkerType2,
  Position as Position4,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// src/components/graph-chat/FloatingConnectionLine.tsx
import { getBezierPath } from "@xyflow/react";

// src/components/graph-chat/FloatingHelper.tsx
import { MarkerType, Position } from "@xyflow/react";
import { jsx as jsx10, jsxs as jsxs9 } from "react/jsx-runtime";
function getNodeIntersection(intersectionNode, targetNode) {
  const intersectionNodeWidth = Math.max(intersectionNode.measured.width ?? 1, 1);
  const intersectionNodeHeight = Math.max(
    intersectionNode.measured.height ?? 1,
    1
  );
  const intersectionNodePosition = intersectionNode.internals.positionAbsolute;
  const targetPosition = targetNode.internals.positionAbsolute;
  const targetNodeWidth = Math.max(targetNode.measured.width ?? 1, 1);
  const targetNodeHeight = Math.max(targetNode.measured.height ?? 1, 1);
  const w = intersectionNodeWidth / 2;
  const h = intersectionNodeHeight / 2;
  const x2 = intersectionNodePosition.x + w;
  const y2 = intersectionNodePosition.y + h;
  const x1 = targetPosition.x + targetNodeWidth / 2;
  const y1 = targetPosition.y + targetNodeHeight / 2;
  const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h);
  const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h);
  const a = 1 / (Math.abs(xx1) + Math.abs(yy1));
  const xx3 = a * xx1;
  const yy3 = a * yy1;
  const x = w * (xx3 + yy3) + x2;
  const y = h * (-xx3 + yy3) + y2;
  return { x, y };
}
function getEdgePosition(node, intersectionPoint) {
  const n = { ...node.internals.positionAbsolute, ...node };
  const nx = Math.round(n.x);
  const ny = Math.round(n.y);
  const px = Math.round(intersectionPoint.x);
  const py = Math.round(intersectionPoint.y);
  if (px <= nx + 1) {
    return Position.Left;
  }
  if (px >= nx + (node.measured.width ?? 1) - 1) {
    return Position.Right;
  }
  if (py <= ny + 1) {
    return Position.Top;
  }
  if (py >= n.y + (node.measured.height ?? 1) - 1) {
    return Position.Bottom;
  }
  return Position.Top;
}
function getEdgeParams(source, target) {
  const sourceIntersectionPoint = getNodeIntersection(source, target);
  const targetIntersectionPoint = getNodeIntersection(target, source);
  const sourcePos = getEdgePosition(source, sourceIntersectionPoint);
  const targetPos = getEdgePosition(target, targetIntersectionPoint);
  return {
    sx: sourceIntersectionPoint.x,
    sy: sourceIntersectionPoint.y,
    tx: targetIntersectionPoint.x,
    ty: targetIntersectionPoint.y,
    sourcePos,
    targetPos
  };
}
function buildGraph(inputNodes, width = 900, height = 620) {
  if (!inputNodes || !Array.isArray(inputNodes)) {
    return { nodes: [], edges: [] };
  }
  const forceLayout = (nodes2, edges2, layoutWidth, layoutHeight) => {
    const nodePositions = /* @__PURE__ */ new Map();
    const nodeCount = nodes2.length;
    nodes2.forEach((node, index) => {
      const hash = node.id.split("").reduce((value, character) => {
        const nextValue = (value << 5) - value + character.charCodeAt(0);
        return nextValue & nextValue;
      }, 0);
      nodePositions.set(node.id, {
        x: Math.abs(hash) % layoutWidth + index * 100 % layoutWidth,
        y: Math.abs(hash >> 16) % layoutHeight + index * 150 % layoutHeight,
        vx: 0,
        vy: 0
      });
    });
    for (let iteration = 0; iteration < 200; iteration += 1) {
      for (let i = 0; i < nodeCount; i += 1) {
        for (let j = i + 1; j < nodeCount; j += 1) {
          const firstNode = nodes2[i];
          const secondNode = nodes2[j];
          if (!firstNode || !secondNode) {
            continue;
          }
          const pos1 = nodePositions.get(firstNode.id);
          const pos2 = nodePositions.get(secondNode.id);
          if (!pos1 || !pos2) {
            continue;
          }
          const dx = pos1.x - pos2.x;
          const dy = pos1.y - pos2.y;
          const distance = Math.sqrt(dx * dx + dy * dy) || 1;
          const optimalDistance = 200;
          const force = (optimalDistance - distance) * 0.5;
          const fx = dx / distance * force;
          const fy = dy / distance * force;
          pos1.vx += fx;
          pos1.vy += fy;
          pos2.vx -= fx;
          pos2.vy -= fy;
        }
      }
      edges2.forEach((edge) => {
        const pos1 = nodePositions.get(edge.source);
        const pos2 = nodePositions.get(edge.target);
        if (!pos1 || !pos2) {
          return;
        }
        const dx = pos2.x - pos1.x;
        const dy = pos2.y - pos1.y;
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;
        const targetLength = 120;
        const springForce = (distance - targetLength) * 0.3;
        const fx = dx / distance * springForce;
        const fy = dy / distance * springForce;
        pos1.vx += fx;
        pos1.vy += fy;
        pos2.vx -= fx;
        pos2.vy -= fy;
      });
      nodePositions.forEach((position) => {
        position.x += position.vx * 0.1;
        position.y += position.vy * 0.1;
        position.vx *= 0.9;
        position.vy *= 0.9;
        position.x = Math.max(80, Math.min(layoutWidth - 80, position.x));
        position.y = Math.max(80, Math.min(layoutHeight - 80, position.y));
      });
    }
    return nodePositions;
  };
  const inputIds = new Set(inputNodes.map((node) => node.id));
  const edges = [];
  inputNodes.forEach((node) => {
    if (!node.out_node_id) {
      return;
    }
    const outNodes = Array.isArray(node.out_node_id) ? node.out_node_id : [node.out_node_id];
    outNodes.forEach((outNodeId) => {
      if (!inputIds.has(outNodeId)) {
        return;
      }
      edges.push({
        id: `${node.id}-${outNodeId}`,
        source: node.id,
        target: outNodeId,
        type: "floating",
        sourceHandle: null,
        targetHandle: null,
        markerEnd: { type: MarkerType.Arrow }
      });
    });
  });
  const positions = forceLayout(inputNodes, edges, width, height);
  const nodes = inputNodes.map((node) => ({
    id: node.id,
    type: "styledNode",
    position: positions.get(node.id) ?? { x: 100, y: 100 },
    data: {
      label: /* @__PURE__ */ jsxs9("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx10("div", { className: "text-sm font-semibold", children: node.name }),
        node.description ? /* @__PURE__ */ jsx10("div", { className: "mt-1 max-w-32 overflow-hidden text-ellipsis text-xs text-slate-500 dark:text-slate-400", children: node.description }) : null
      ] })
    }
  }));
  return { nodes, edges };
}

// src/components/graph-chat/FloatingConnectionLine.tsx
import { jsx as jsx11, jsxs as jsxs10 } from "react/jsx-runtime";
function FloatingConnectionLine({
  toX,
  toY,
  fromPosition,
  toPosition,
  fromNode
}) {
  if (!fromNode) {
    return null;
  }
  const targetNode = {
    id: "connection-target",
    measured: {
      width: 1,
      height: 1
    },
    internals: {
      positionAbsolute: { x: toX, y: toY }
    }
  };
  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    fromNode,
    targetNode
  );
  const [edgePath] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos || fromPosition,
    targetPosition: targetPos || toPosition,
    targetX: tx || toX,
    targetY: ty || toY
  });
  return /* @__PURE__ */ jsxs10("g", { children: [
    /* @__PURE__ */ jsx11(
      "path",
      {
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.5,
        className: "animated",
        d: edgePath
      }
    ),
    /* @__PURE__ */ jsx11(
      "circle",
      {
        cx: tx || toX,
        cy: ty || toY,
        fill: "var(--theme-panel)",
        r: 3,
        stroke: "currentColor",
        strokeWidth: 1.5
      }
    )
  ] });
}

// src/components/graph-chat/FloatingEdge.tsx
import { getBezierPath as getBezierPath2, useInternalNode } from "@xyflow/react";
import { jsx as jsx12 } from "react/jsx-runtime";
function FloatingEdge({
  id,
  source,
  target,
  markerEnd,
  style
}) {
  const sourceNode = useInternalNode(source);
  const targetNode = useInternalNode(target);
  if (!sourceNode || !targetNode) {
    return null;
  }
  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode
  );
  const [edgePath] = getBezierPath2({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetPosition: targetPos,
    targetX: tx,
    targetY: ty
  });
  return /* @__PURE__ */ jsx12(
    "path",
    {
      id,
      className: "react-flow__edge-path",
      d: edgePath,
      markerEnd,
      style
    }
  );
}

// src/components/graph-chat/GraphVisualization.tsx
import { jsx as jsx13, jsxs as jsxs11 } from "react/jsx-runtime";
function GraphVisualization({ nodes: inputNodes }) {
  const [flowNodes, setFlowNodes, onNodesChange] = useNodesState([]);
  const [flowEdges, setFlowEdges, onEdgesChange] = useEdgesState([]);
  const graph = useMemo6(() => buildGraph(inputNodes), [inputNodes]);
  const edgeTypes = useMemo6(() => ({ floating: FloatingEdge }), []);
  const nodeTypes = useMemo6(
    () => ({
      styledNode: ({ data, isConnectable }) => /* @__PURE__ */ jsxs11("div", { className: "thread-graph-flow-node", children: [
        data.label,
        /* @__PURE__ */ jsx13(
          Handle,
          {
            type: "target",
            position: Position4.Top,
            isConnectable,
            style: { opacity: 0, pointerEvents: "none" }
          }
        ),
        /* @__PURE__ */ jsx13(
          Handle,
          {
            type: "source",
            position: Position4.Bottom,
            isConnectable,
            style: { opacity: 0, pointerEvents: "none" }
          }
        )
      ] })
    }),
    []
  );
  useEffect7(() => {
    setFlowNodes(graph.nodes);
    setFlowEdges(graph.edges);
  }, [graph.edges, graph.nodes, setFlowEdges, setFlowNodes]);
  const onConnect = useCallback4(
    (params) => setFlowEdges(
      (edges) => addEdge(
        {
          ...params,
          type: "floating",
          sourceHandle: null,
          targetHandle: null,
          markerEnd: { type: MarkerType2.Arrow }
        },
        edges
      )
    ),
    [setFlowEdges]
  );
  return /* @__PURE__ */ jsx13("div", { className: "thread-graph-flow h-full min-h-0", children: /* @__PURE__ */ jsx13(ReactFlowProvider, { children: /* @__PURE__ */ jsxs11(
    ReactFlow,
    {
      nodes: flowNodes,
      edges: flowEdges,
      onNodesChange,
      onEdgesChange,
      onConnect,
      fitView: true,
      nodeTypes,
      edgeTypes,
      connectionLineComponent: FloatingConnectionLine,
      children: [
        /* @__PURE__ */ jsx13(Controls, {}),
        /* @__PURE__ */ jsx13(Background, { gap: 16 })
      ]
    }
  ) }) });
}

// src/components/ThreadGraphWorkspacePanel.tsx
import { jsx as jsx14, jsxs as jsxs12 } from "react/jsx-runtime";
var DEFAULT_WORKSPACE_FEATURES = {
  workspace: true,
  toolUsage: false,
  guide: false,
  threadGraph: true,
  extensions: true
};
function resolveWorkspaceFeatures(features) {
  return {
    ...DEFAULT_WORKSPACE_FEATURES,
    ...features
  };
}
function firstEnabledWorkspaceTab(features, preferred) {
  const isEnabled = (tab) => {
    switch (tab) {
      case "workspace":
        return features.workspace;
      case "tools":
        return false;
      case "guide":
        return false;
      case "graph":
        return features.threadGraph;
      case "extensions":
        return features.extensions;
    }
  };
  if (preferred && isEnabled(preferred)) {
    return preferred;
  }
  return [
    "workspace",
    "graph",
    "extensions"
  ].find(isEnabled) ?? null;
}
function isWorkspaceTabEnabled(features, tab) {
  switch (tab) {
    case "workspace":
      return features.workspace;
    case "tools":
      return false;
    case "guide":
      return false;
    case "graph":
      return features.threadGraph;
    case "extensions":
      return features.extensions;
  }
}
function collectToolEvents(detail) {
  const events = [];
  const toolKinds = /* @__PURE__ */ new Set([
    "toolCall",
    "commandExecution",
    "webSearch",
    "fileRead",
    "fileChange",
    "agentToolCall",
    "skillToolCall",
    "hook"
  ]);
  let sequence = 0;
  for (const turn of detail.turns) {
    for (const item of turn.items) {
      if (!toolKinds.has(item.kind)) {
        continue;
      }
      events.push({
        id: item.id,
        kind: item.kind,
        label: formatToolKind(item.kind),
        preview: item.previewText ?? item.text ?? item.kind,
        detail: item.detailText ?? item.text ?? item.previewText ?? item.kind,
        turnId: item.sourceTurnId ?? turn.id,
        status: item.status ?? null,
        sequence
      });
      sequence += 1;
    }
  }
  for (const item of detail.liveItems?.items ?? []) {
    if (!toolKinds.has(item.kind)) {
      continue;
    }
    events.push({
      id: item.id,
      kind: item.kind,
      label: formatToolKind(item.kind),
      preview: item.previewText ?? item.text ?? item.kind,
      detail: item.detailText ?? item.text ?? item.previewText ?? item.kind,
      turnId: item.sourceTurnId ?? null,
      status: item.status ?? null,
      sequence
    });
    sequence += 1;
  }
  return events;
}
function formatToolKind(value) {
  switch (value) {
    case "toolCall":
      return "Tool call";
    case "agentToolCall":
      return "Agent tool";
    case "skillToolCall":
      return "Skill tool";
    case "commandExecution":
      return "Command";
    case "webSearch":
      return "Search";
    case "fileRead":
      return "File read";
    case "fileChange":
      return "File change";
    case "hook":
      return "Hook";
    default:
      return value.replace(/([A-Z])/g, " $1").replace(/^./, (letter) => letter.toUpperCase());
  }
}
function itemGraphLabel(item) {
  switch (item.kind) {
    case "userMessage":
      return "User";
    case "agentMessage":
      return "Agent";
    default:
      return formatToolKind(item.kind);
  }
}
function itemGraphDescription(item) {
  const source = item.previewText ?? item.text ?? item.detailText ?? item.kind;
  return source.replace(/\s+/g, " ").slice(0, 96);
}
function collectGraphNodes(detail, toolEvents) {
  const nodes = [
    {
      id: `thread:${detail.thread.id}`,
      name: detail.thread.title || "Thread",
      description: detail.thread.model ?? detail.thread.status
    },
    {
      id: `workspace:${detail.workspace.id}`,
      name: detail.workspace.label ?? "Workspace",
      description: detail.workspace.absPath,
      out_node_id: `thread:${detail.thread.id}`
    }
  ];
  let previousTurnId = null;
  for (const turn of detail.turns) {
    const turnId = `turn:${turn.id}`;
    nodes.push({
      id: turnId,
      name: `Turn ${nodes.filter((node) => node.id.startsWith("turn:")).length + 1}`,
      description: turn.status,
      out_node_id: previousTurnId ? [`thread:${detail.thread.id}`, previousTurnId] : `thread:${detail.thread.id}`
    });
    previousTurnId = turnId;
    let previousItemId = null;
    for (const item of turn.items) {
      const itemId = `item:${item.id}`;
      const outNodeIds = [turnId];
      if (previousItemId) {
        outNodeIds.push(previousItemId);
      }
      nodes.push({
        id: itemId,
        name: itemGraphLabel(item),
        description: itemGraphDescription(item),
        out_node_id: outNodeIds
      });
      previousItemId = itemId;
      if (item.kind === "artifact" && item.artifact) {
        nodes.push({
          id: `artifact:${item.artifact.id}`,
          name: item.artifact.title || item.artifact.type,
          description: item.artifact.summaryText ?? item.artifact.type,
          out_node_id: itemId
        });
      }
    }
  }
  const toolNodeIds = new Set(nodes.map((node) => node.id));
  for (const event of toolEvents) {
    const eventId = `tool:${event.id}`;
    if (toolNodeIds.has(eventId) || toolNodeIds.has(`item:${event.id}`)) {
      continue;
    }
    nodes.push({
      id: eventId,
      name: event.label,
      description: event.preview,
      out_node_id: event.turnId ? `turn:${event.turnId}` : `thread:${detail.thread.id}`
    });
  }
  return nodes.slice(0, 120);
}
function ThreadGraphWorkspacePanel({
  detail,
  status,
  plugins,
  workspaceAdapter,
  metaContent,
  settingsContent,
  activeView = "chat",
  features: featureConfig,
  focusPathRequest = null
}) {
  const features = useMemo7(
    () => resolveWorkspaceFeatures(featureConfig),
    [featureConfig]
  );
  const initialTab = firstEnabledWorkspaceTab(features, featureConfig?.defaultTab);
  const [activeTab, setActiveTab] = useState9(initialTab);
  const artifacts = useMemo7(() => collectArtifacts(detail), [detail]);
  const toolEvents = useMemo7(() => collectToolEvents(detail), [detail]);
  const threadPanels = plugins.getThreadPanels();
  const graphNodes = useMemo7(
    () => collectGraphNodes(detail, toolEvents),
    [detail, toolEvents]
  );
  const primaryTabs = useMemo7(() => {
    const tabs = [];
    if (features.workspace) {
      tabs.push({ id: "workspace", label: "Workspace", icon: null });
    }
    return tabs;
  }, [features.workspace]);
  const secondaryTabs = useMemo7(() => {
    const tabs = [];
    if (features.threadGraph) {
      tabs.push({ id: "graph", label: "Thread graph", icon: GitBranch });
    }
    if (features.extensions) {
      tabs.push({ id: "extensions", label: "Remote Codex extensions", icon: Wrench });
    }
    return tabs;
  }, [features.extensions, features.threadGraph]);
  useEffect8(() => {
    if (!activeTab || !isWorkspaceTabEnabled(features, activeTab)) {
      setActiveTab(firstEnabledWorkspaceTab(features, featureConfig?.defaultTab));
    }
  }, [activeTab, featureConfig?.defaultTab, features]);
  useEffect8(() => {
    if (focusPathRequest && features.workspace) {
      setActiveTab("workspace");
    }
  }, [features.workspace, focusPathRequest?.requestId]);
  if (!activeTab) {
    return null;
  }
  return /* @__PURE__ */ jsxs12("div", { className: "thread-graph-right-panel flex h-full min-h-0 flex-col overflow-hidden", children: [
    /* @__PURE__ */ jsxs12("div", { className: "thread-graph-right-tabs flex h-9 shrink-0 items-center gap-0 overflow-hidden border-b px-1", children: [
      primaryTabs.map((tab) => {
        const Icon = tab.icon;
        return /* @__PURE__ */ jsxs12(
          "button",
          {
            type: "button",
            onClick: () => setActiveTab(tab.id),
            className: `thread-graph-right-tab inline-flex h-9 shrink-0 items-center gap-1.5 px-2.5 text-xs font-medium transition ${activeTab === tab.id ? "is-active" : ""}`,
            children: [
              Icon ? /* @__PURE__ */ jsx14(Icon, { className: "h-3.5 w-3.5" }) : null,
              tab.label
            ]
          },
          tab.id
        );
      }),
      secondaryTabs.length ? /* @__PURE__ */ jsx14(
        "div",
        {
          className: "thread-graph-right-tab-secondary ml-auto flex h-6 min-w-0 shrink items-center gap-0.5 border-l pl-1",
          "aria-label": "Remote Codex workspace extensions",
          children: secondaryTabs.map((tab) => {
            const Icon = tab.icon;
            return /* @__PURE__ */ jsx14(
              "button",
              {
                type: "button",
                onClick: () => setActiveTab(tab.id),
                className: `thread-graph-right-tab inline-flex h-8 w-8 shrink-0 items-center justify-center text-xs font-medium transition ${activeTab === tab.id ? "is-active" : ""}`,
                title: tab.label,
                "aria-label": tab.label,
                children: /* @__PURE__ */ jsx14(Icon, { className: "h-3.5 w-3.5" })
              },
              tab.id
            );
          })
        }
      ) : null
    ] }),
    /* @__PURE__ */ jsxs12("div", { className: "min-h-0 flex-1 overflow-hidden", children: [
      activeTab === "workspace" ? /* @__PURE__ */ jsx14(
        GraphWorkspaceExplorer,
        {
          activeView,
          detail,
          artifacts,
          plugins,
          status,
          focusPathRequest,
          workspaceAdapter: workspaceAdapter ?? null
        }
      ) : null,
      activeTab === "graph" ? /* @__PURE__ */ jsx14("div", { className: "thread-graph-visualization-panel h-full min-h-0 p-3", children: /* @__PURE__ */ jsx14(GraphVisualization, { nodes: graphNodes }) }) : null,
      activeTab === "extensions" ? /* @__PURE__ */ jsx14("div", { className: "h-full min-h-0 overflow-y-auto p-3", children: /* @__PURE__ */ jsxs12("div", { className: "grid gap-3", children: [
        /* @__PURE__ */ jsx14(WorkspaceInfoCard, { label: "Plugin Panels", children: threadPanels.length ? /* @__PURE__ */ jsx14("div", { className: "flex flex-wrap gap-2", children: threadPanels.map((panel) => /* @__PURE__ */ jsx14(
          "span",
          {
            className: "rounded-full border border-[var(--theme-border)] px-2 py-1 text-xs text-[var(--theme-fg-soft)]",
            children: panel.label
          },
          panel.id
        )) }) : /* @__PURE__ */ jsx14("p", { className: "text-[var(--theme-fg-muted)]", children: "No thread panels are enabled." }) }),
        /* @__PURE__ */ jsx14(WorkspaceInfoCard, { label: "Enabled Renderers", children: /* @__PURE__ */ jsx14("div", { className: "flex flex-wrap gap-2", children: plugins.plugins.filter((plugin) => plugin.enabled).map((plugin) => /* @__PURE__ */ jsx14(
          "span",
          {
            className: "rounded-full border border-[var(--theme-border)] px-2 py-1 text-xs text-[var(--theme-fg-soft)]",
            children: plugin.name
          },
          plugin.id
        )) }) }),
        /* @__PURE__ */ jsx14(WorkspaceInfoCard, { label: "Remote Codex Tools", children: /* @__PURE__ */ jsxs12("div", { className: "grid gap-2 text-[var(--theme-fg-muted)]", children: [
          /* @__PURE__ */ jsxs12("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx14(Terminal, { className: "mt-0.5 h-4 w-4 shrink-0" }),
            /* @__PURE__ */ jsx14("p", { children: "Terminal stays available when the Terminal plugin and shell adapter are attached." })
          ] }),
          /* @__PURE__ */ jsxs12("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx14(Paperclip, { className: "mt-0.5 h-4 w-4 shrink-0" }),
            /* @__PURE__ */ jsx14("p", { children: "Composer attachments, slash panels, hooks, MCP, goals, and fork controls remain part of the chat surface." })
          ] }),
          /* @__PURE__ */ jsxs12("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsx14(Trash22, { className: "mt-0.5 h-4 w-4 shrink-0" }),
            /* @__PURE__ */ jsx14("p", { children: "Destructive actions stay explicit: delete thread, interrupt, compact, and hook trust controls remain host governed." })
          ] })
        ] }) }),
        metaContent ? /* @__PURE__ */ jsx14(WorkspaceInfoCard, { label: "Thread Meta", children: metaContent }) : null,
        settingsContent ? /* @__PURE__ */ jsx14(WorkspaceInfoCard, { label: "Settings", children: settingsContent }) : null
      ] }) }) : null
    ] })
  ] });
}
var MemoizedThreadGraphWorkspacePanel = memo2(
  ThreadGraphWorkspacePanel
);
export {
  MemoizedThreadGraphWorkspacePanel,
  ThreadGraphWorkspacePanel
};

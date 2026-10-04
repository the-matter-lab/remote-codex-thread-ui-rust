import { relativeWorkspacePath } from '../../workspacePaths';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type {
  AgentRuntimeStatusDto,
  ThreadArtifactDto,
  ThreadDetailDto,
} from '@remote-codex/shared';
import type { ThreadWorkspaceAdapter } from '../../../adapters';
import {
  ancestorDirectoryPaths,
  collectAncestorPaths,
  collectWorkspaceItems,
  findFirstPreviewNode,
  findFirstWorkspaceFile,
  flattenWorkspaceNodes,
  hasWorkspacePath,
  workspaceRelativeFocusPath,
  workspaceTreeNodeToGraphNode,
  type WorkspaceTreeNode,
} from '../workspaceTree';
import {
  createWorkspaceExplorerModel,
  findWorkspaceExplorerNodeByPath,
  hasWorkspaceExplorerPath,
  mergeWorkspaceExplorerSubtree,
  workspaceExplorerModelToTree,
} from './workspaceExplorerModel';
import type {
  WorkspaceExplorerModel,
  WorkspaceExplorerAdapter,
  WorkspaceExplorerCapabilities,
} from './workspaceExplorerTypes';
import { useWorkspaceExplorerPersistence } from './useWorkspaceExplorerPersistence';

export interface UseWorkspaceExplorerControllerInput {
  activeView: 'chat' | 'shell';
  detail: ThreadDetailDto;
  artifacts: ThreadArtifactDto[];
  status: AgentRuntimeStatusDto | null;
  focusPathRequest?: { path: string; line?: number; requestId: number } | null;
  workspaceAdapter?: ThreadWorkspaceAdapter | null;
}

function selectedPathForId(
  selectedId: string | null,
  nodeMap: Map<string, WorkspaceTreeNode>,
) {
  if (!selectedId) {
    return null;
  }
  const mappedPath = nodeMap.get(selectedId)?.path;
  if (mappedPath !== undefined) {
    return mappedPath;
  }
  return selectedId.startsWith('workspace:')
    ? selectedId.slice('workspace:'.length)
    : null;
}

export function useWorkspaceExplorerController({
  activeView,
  detail,
  artifacts,
  status,
  focusPathRequest = null,
  workspaceAdapter,
}: UseWorkspaceExplorerControllerInput) {
  const workspaceIdentity = useMemo(
    () => ({
      threadId: detail.thread.id,
      workspaceId: detail.workspace.id ?? detail.thread.workspaceId ?? null,
    }),
    [detail.thread.id, detail.thread.workspaceId, detail.workspace.id],
  );
  const capabilityAdapter = workspaceAdapter as
    | WorkspaceExplorerAdapter
    | null
    | undefined;
  const [capabilityState, setCapabilityState] = useState<{
    adapter: WorkspaceExplorerAdapter;
    threadId: string;
    capabilities: WorkspaceExplorerCapabilities;
  } | null>(null);
  const capabilities =
    capabilityState?.adapter === capabilityAdapter &&
    capabilityState?.threadId === workspaceIdentity.threadId
      ? capabilityState.capabilities
      : capabilityAdapter?.getCapabilities
        ? null
        : (capabilityAdapter?.capabilities ?? null);
  const [capabilityEpoch, setCapabilityEpoch] = useState(0);
  const [capabilityError, setCapabilityError] = useState<string | null>(null);
  useEffect(() => {
    let cancelled = false;
    setCapabilityState(null);
    setCapabilityError(null);
    if (capabilityAdapter?.getCapabilities) {
      void (async () => {
        try {
          const result = await capabilityAdapter.getCapabilities!(
            workspaceIdentity.threadId,
          );
          if (!cancelled)
            setCapabilityState({
              adapter: capabilityAdapter,
              threadId: workspaceIdentity.threadId,
              capabilities: result,
            });
        } catch (error) {
          if (!cancelled)
            setCapabilityError(
              error instanceof Error
                ? error.message
                : 'Failed to discover file operations. Refresh the workspace to retry.',
            );
        }
      })();
    }
    return () => {
      cancelled = true;
    };
  }, [capabilityAdapter, workspaceIdentity.threadId, capabilityEpoch]);
  const persistence = useWorkspaceExplorerPersistence(workspaceIdentity);
  const fallbackTree = useMemo(
    () => collectWorkspaceItems(detail, artifacts, status, activeView),
    [activeView, artifacts, detail, status],
  );
  const fallbackFirstSelectableNode = findFirstPreviewNode(fallbackTree);
  const initialPersistedState = useRef(persistence.read());
  const [adapterModel, setAdapterModel] =
    useState<WorkspaceExplorerModel | null>(null);
  const adapterTree = useMemo(
    () => (adapterModel ? workspaceExplorerModelToTree(adapterModel) : null),
    [adapterModel],
  );
  const [linkedFiles, setLinkedFiles] = useState<WorkspaceTreeNode[]>([]);
  const tree = useMemo(() => {
    const root = adapterTree ?? fallbackTree;
    return linkedFiles.length
      ? {
          ...root,
          children: [
            ...root.children,
            {
              id: 'linked-files',
              path: 'linked-files:',
              name: 'Linked files',
              kind: 'directory' as const,
              children: linkedFiles,
              childrenLoaded: true,
              hasChildren: true,
            },
          ],
        }
      : root;
  }, [adapterTree, fallbackTree, linkedFiles]);
  const nodeMap = useMemo(() => flattenWorkspaceNodes(tree), [tree]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(() => {
    const selectedPath = focusPathRequest
      ? workspaceRelativeFocusPath(
          focusPathRequest.path,
          detail.workspace.absPath,
        )
      : initialPersistedState.current.selectedPath;
    return selectedPath
      ? `workspace:${selectedPath}`
      : (fallbackFirstSelectableNode?.id ?? null);
  });
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(
    () =>
      new Set([
        '',
        'artifacts',
        'thread-events',
        'live',
        ...initialPersistedState.current.expandedPaths,
        ...collectAncestorPaths(fallbackFirstSelectableNode?.path ?? ''),
      ]),
  );
  const [filterQuery, setFilterQuery] = useState('');
  const [filterMode, setFilterMode] = useState<'highlight' | 'filter'>(
    () => initialPersistedState.current.filterMode ?? 'filter',
  );
  const [loadingTree, setLoadingTree] = useState(false);
  const [loadingDirectoryPaths, setLoadingDirectoryPaths] = useState<
    Set<string>
  >(() => new Set());
  const [directoryErrors, setDirectoryErrors] = useState<Map<string, string>>(
    () => new Map(),
  );
  const [workspaceError, setWorkspaceError] = useState<string | null>(null);

  const activeNode =
    selectedNodeId === null ? null : (nodeMap.get(selectedNodeId) ?? null);
  const liveNodes = useMemo(
    () => tree.children.find((node) => node.path === 'live')?.children ?? [],
    [tree],
  );

  const adapterModelRef = useRef(adapterModel);
  const nodeMapRef = useRef(nodeMap);
  const treeRef = useRef(tree);
  const activeNodeRef = useRef(activeNode);
  const expandedPathsRef = useRef(expandedPaths);
  const loadingDirectoryPathsRef = useRef(loadingDirectoryPaths);
  const fallbackFirstSelectableNodeRef = useRef(fallbackFirstSelectableNode);
  adapterModelRef.current = adapterModel;
  nodeMapRef.current = nodeMap;
  treeRef.current = tree;
  activeNodeRef.current = activeNode;
  expandedPathsRef.current = expandedPaths;
  loadingDirectoryPathsRef.current = loadingDirectoryPaths;
  fallbackFirstSelectableNodeRef.current = fallbackFirstSelectableNode;

  const refreshGenerationRef = useRef(0);
  const focusGenerationRef = useRef(0);
  const focusPendingRef = useRef(false);
  const handledFocusRequestRef = useRef<string | null>(null);
  const workspaceGenerationRef = useRef(0);
  const directoryRequestGenerationsRef = useRef(new Map<string, number>());
  const skipPersistenceWriteRef = useRef(true);

  const refreshWorkspaceTree = useCallback(
    async (preferredPath?: string | null) => {
      if (!workspaceAdapter) {
        return;
      }
      const workspaceGeneration = workspaceGenerationRef.current;
      const refreshGeneration = refreshGenerationRef.current + 1;
      refreshGenerationRef.current = refreshGeneration;
      const currentSelectedPath =
        preferredPath ?? activeNodeRef.current?.path ?? null;
      setLoadingTree(true);
      setWorkspaceError(null);
      try {
        const refreshedTree = workspaceTreeNodeToGraphNode(
          await workspaceAdapter.listTree({ ...workspaceIdentity, path: '' }),
        );
        if (
          workspaceGenerationRef.current !== workspaceGeneration ||
          refreshGenerationRef.current !== refreshGeneration
        ) {
          return;
        }
        const currentModel = adapterModelRef.current;
        let nextModel = createWorkspaceExplorerModel(
          refreshedTree,
          currentModel,
        );
        if (currentModel) {
          const expandedDirectories = [...expandedPathsRef.current]
            .filter((path) => path)
            .sort(
              (left, right) => left.split('/').length - right.split('/').length,
            );
          for (const path of expandedDirectories) {
            const previousNode = findWorkspaceExplorerNodeByPath(
              currentModel,
              path,
            );
            if (
              previousNode?.kind !== 'directory' ||
              previousNode.childrenState !== 'resolved'
            ) {
              continue;
            }
            const refreshedNode = workspaceTreeNodeToGraphNode(
              await workspaceAdapter.listTree({ ...workspaceIdentity, path }),
            );
            if (
              workspaceGenerationRef.current !== workspaceGeneration ||
              refreshGenerationRef.current !== refreshGeneration
            ) {
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
          const fallbackPath =
            currentSelectedPath ??
            selectedPathForId(current, nodeMapRef.current);
          if (
            fallbackPath !== null &&
            hasWorkspaceExplorerPath(nextModel, fallbackPath)
          ) {
            return `workspace:${fallbackPath}`;
          }
          return firstFile?.id ?? null;
        });
      } catch (error) {
        if (
          workspaceGenerationRef.current !== workspaceGeneration ||
          refreshGenerationRef.current !== refreshGeneration
        ) {
          return;
        }
        setWorkspaceError(
          error instanceof Error ? error.message : 'Failed to load workspace',
        );
        setAdapterModel(null);
      } finally {
        if (
          workspaceGenerationRef.current === workspaceGeneration &&
          refreshGenerationRef.current === refreshGeneration
        ) {
          setLoadingTree(false);
        }
      }
    },
    [workspaceAdapter, workspaceIdentity],
  );

  const loadDirectoryChildren = useCallback(
    async (path: string) => {
      if (!workspaceAdapter || !adapterModelRef.current) {
        return;
      }
      const workspaceGeneration = workspaceGenerationRef.current;
      const generation =
        (directoryRequestGenerationsRef.current.get(path) ?? 0) + 1;
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
          await workspaceAdapter.listTree({ ...workspaceIdentity, path }),
        );
        if (
          workspaceGenerationRef.current !== workspaceGeneration ||
          directoryRequestGenerationsRef.current.get(path) !== generation
        ) {
          return;
        }
        setAdapterModel((current) =>
          current
            ? mergeWorkspaceExplorerSubtree(current, loadedNode)
            : current,
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
        if (
          workspaceGenerationRef.current !== workspaceGeneration ||
          directoryRequestGenerationsRef.current.get(path) !== generation
        ) {
          return;
        }
        const message =
          error instanceof Error ? error.message : 'Failed to load directory';
        setWorkspaceError(message);
        setDirectoryErrors((current) => new Map(current).set(path, message));
      } finally {
        if (
          workspaceGenerationRef.current === workspaceGeneration &&
          directoryRequestGenerationsRef.current.get(path) === generation
        ) {
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
    [workspaceAdapter, workspaceIdentity],
  );

  const focusWorkspacePath = useCallback(
    async (path: string) => {
      const targetPath = workspaceRelativeFocusPath(
        path,
        detail.workspace.absPath,
      );
      if (!targetPath) {
        return;
      }
      const workspaceGeneration = workspaceGenerationRef.current;
      const generation = ++focusGenerationRef.current;
      ++refreshGenerationRef.current;
      focusPendingRef.current = true;
      const isCurrent = () =>
        workspaceGenerationRef.current === workspaceGeneration &&
        focusGenerationRef.current === generation;
      setSelectedNodeId(`workspace:${targetPath}`);
      setFilterQuery('');
      const external =
        relativeWorkspacePath(path, detail.workspace.absPath) === null;
      const ancestors = external
        ? ['linked-files:']
        : ancestorDirectoryPaths(targetPath);
      setExpandedPaths((current) => {
        const next = new Set(current);
        next.add('');
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
        let nextModel =
          adapterModelRef.current ??
          createWorkspaceExplorerModel(
            workspaceTreeNodeToGraphNode(
              await workspaceAdapter.listTree({
                ...workspaceIdentity,
                path: '',
              }),
            ),
          );
        if (!isCurrent()) {
          return;
        }
        if (external) {
          if (!workspaceAdapter.statLinkedFile)
            throw new Error(
              'Only the device owner can preview files outside this workspace.',
            );
          const node = await workspaceAdapter.statLinkedFile({
            ...workspaceIdentity,
            path: targetPath,
          });
          if (!isCurrent()) return;
          const linked = workspaceTreeNodeToGraphNode({
            ...node,
            path: targetPath,
          });
          setLinkedFiles((current) => [
            ...current.filter((item) => item.path !== targetPath),
            linked,
          ]);
          adapterModelRef.current = nextModel;
          setAdapterModel(nextModel);
          return;
        }
        for (const ancestor of ancestors) {
          const existing = findWorkspaceExplorerNodeByPath(nextModel, ancestor);
          if (
            existing?.kind === 'directory' &&
            existing.childrenState === 'resolved'
          ) {
            continue;
          }
          const loadedNode = workspaceTreeNodeToGraphNode(
            await workspaceAdapter.listTree({
              ...workspaceIdentity,
              path: ancestor,
            }),
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
          error instanceof Error
            ? error.message
            : `Failed to open ${targetPath}`,
        );
      } finally {
        if (isCurrent()) {
          focusPendingRef.current = false;
          setLoadingTree(false);
        }
      }
    },
    [detail.workspace.absPath, workspaceAdapter, workspaceIdentity],
  );

  const toggleDirectory = useCallback(
    (path: string) => {
      if (!path) {
        return;
      }
      const node = nodeMapRef.current.get(`workspace:${path}`);
      const isExpanded = expandedPathsRef.current.has(path);
      const shouldLoad =
        node?.kind === 'directory' &&
        node.hasChildren &&
        !node.childrenLoaded &&
        !loadingDirectoryPathsRef.current.has(path);
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
    [loadDirectoryChildren],
  );

  const collapseAll = useCallback(() => {
    setExpandedPaths(new Set(['']));
  }, []);

  useEffect(() => {
    setLinkedFiles([]);
    skipPersistenceWriteRef.current = true;
    const persisted = persistence.read();
    const fallbackNode = fallbackFirstSelectableNodeRef.current;
    const selectedPath = focusPathRequest
      ? workspaceRelativeFocusPath(
          focusPathRequest.path,
          detail.workspace.absPath,
        )
      : persisted.selectedPath;
    const nextSelectedId = selectedPath
      ? `workspace:${selectedPath}`
      : (fallbackNode?.id ?? null);
    setExpandedPaths(
      new Set([
        '',
        'artifacts',
        'thread-events',
        'live',
        ...persisted.expandedPaths,
        ...collectAncestorPaths(fallbackNode?.path ?? ''),
      ]),
    );
    setSelectedNodeId(nextSelectedId);
    setFilterQuery('');
    setFilterMode(persisted.filterMode ?? 'filter');
  }, [persistence]);

  useEffect(() => {
    if (skipPersistenceWriteRef.current) {
      skipPersistenceWriteRef.current = false;
      return;
    }
    persistence.write({
      expandedPaths: [...expandedPaths],
      ...(selectedPathForId(selectedNodeId, nodeMap)
        ? { selectedPath: selectedPathForId(selectedNodeId, nodeMap)! }
        : {}),
      filterMode,
    });
  }, [expandedPaths, filterMode, nodeMap, persistence, selectedNodeId]);

  useEffect(() => {
    if (!workspaceAdapter || !adapterModel || focusPendingRef.current) {
      return;
    }
    for (const node of nodeMap.values()) {
      if (
        node.path &&
        node.kind === 'directory' &&
        expandedPaths.has(node.path) &&
        node.hasChildren &&
        !node.childrenLoaded &&
        !loadingDirectoryPaths.has(node.path) &&
        !directoryErrors.has(node.path)
      ) {
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
    workspaceAdapter,
  ]);

  useEffect(() => {
    workspaceGenerationRef.current += 1;
    refreshGenerationRef.current += 1;
    directoryRequestGenerationsRef.current.clear();
    adapterModelRef.current = null;
    setAdapterModel(null);
    setLoadingDirectoryPaths(new Set());
    setDirectoryErrors(new Map());
    setWorkspaceError(null);
    handledFocusRequestRef.current = null;
    if (!focusPathRequest) {
      const persistedPath = persistence.read().selectedPath;
      if (persistedPath) void focusWorkspacePath(persistedPath);
      else void refreshWorkspaceTree();
    }
  }, [refreshWorkspaceTree]);

  useEffect(() => {
    if (focusPathRequest) {
      const key = `${workspaceIdentity.threadId}:${focusPathRequest.requestId}`;
      if (handledFocusRequestRef.current === key) return;
      handledFocusRequestRef.current = key;
      void focusWorkspacePath(focusPathRequest.path);
    }
  }, [focusPathRequest, focusWorkspacePath]);

  useEffect(() => {
    if (!workspaceAdapter?.subscribeWorkspaceChanged) {
      return;
    }
    let refreshTimer: number | null = null;
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
      },
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
    setSelectedNodeId: (id: string | null) => {
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
    workspaceIdentity,
  };
}

import { useVirtualizer } from '@tanstack/react-virtual';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type MutableRefObject,
} from 'react';

import type { WorkspaceTreeNode } from '../workspaceTree';
import { createWorkspaceExplorerModel } from './workspaceExplorerModel';
import { projectWorkspaceExplorerRows } from './workspaceExplorerProjection';
import { workspaceExplorerCommandForKey } from './workspaceExplorerCommands';
import { WorkspaceExplorerRow } from './WorkspaceExplorerRow';

export function WorkspaceExplorerTree({
  tree,
  expandedPaths,
  filterMode = 'filter',
  filterQuery = '',
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
  virtualize = true,
}: {
  tree: WorkspaceTreeNode;
  expandedPaths: ReadonlySet<string>;
  filterMode?: 'highlight' | 'filter';
  filterQuery?: string;
  compactFolders?: boolean;
  directoryErrors?: ReadonlyMap<string, string>;
  loadingPaths: ReadonlySet<string>;
  selectedNodeId: string | null;
  revealRequestKey?: number | undefined;
  scrollerRef: MutableRefObject<HTMLDivElement | null>;
  scrollTopRef?: MutableRefObject<number>;
  onCopyPath?: (node: WorkspaceTreeNode) => void;
  onDownload?: (node: WorkspaceTreeNode) => void;
  onDownloadZip?: (node: WorkspaceTreeNode) => void;
  canDownload?: (node: WorkspaceTreeNode) => boolean;
  onOpenFilter?: () => void;
  onFilterResultsChange?: (input: {
    matchCount: number;
    hasUnresolvedDirectories: boolean;
  }) => void;
  onPreview?: (node: WorkspaceTreeNode) => void;
  onPin?: (node: WorkspaceTreeNode) => void;
  onRetryDirectory?: (path: string) => void;
  onSelect: (node: WorkspaceTreeNode) => void;
  onToggle: (path: string) => void;
  virtualize?: boolean;
}) {
  const model = useMemo(() => createWorkspaceExplorerModel(tree), [tree]);
  const projection = useMemo(
    () =>
      projectWorkspaceExplorerRows(model, expandedPaths, {
        filterMode,
        filterQuery,
        compactFolders,
      }),
    [compactFolders, expandedPaths, filterMode, filterQuery, model],
  );
  const { rows } = projection;
  const [focusedId, setFocusedId] = useState<string | null>(
    () => selectedNodeId ?? rows[0]?.id ?? null,
  );
  const rowElementsRef = useRef(new Map<string, HTMLDivElement>());
  const canVirtualize =
    virtualize && typeof window !== 'undefined' && 'ResizeObserver' in window;
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollerRef.current,
    getItemKey: (index) => rows[index]?.id ?? index,
    estimateSize: () =>
      typeof window !== 'undefined' &&
      window.matchMedia?.('(max-width: 639px)').matches
        ? 44
        : 28,
    overscan: 6,
    enabled: canVirtualize,
    useFlushSync: false,
  });

  useEffect(() => {
    onFilterResultsChange?.({
      matchCount: projection.matchCount,
      hasUnresolvedDirectories: projection.hasUnresolvedDirectories,
    });
  }, [
    onFilterResultsChange,
    projection.hasUnresolvedDirectories,
    projection.matchCount,
  ]);

  useEffect(() => {
    if (focusedId && projection.indexById.has(focusedId)) {
      return;
    }
    setFocusedId(
      selectedNodeId && projection.indexById.has(selectedNodeId)
        ? selectedNodeId
        : (rows[0]?.id ?? null),
    );
  }, [focusedId, projection.indexById, rows, selectedNodeId]);

  const focusRow = useCallback(
    (id: string) => {
      setFocusedId(id);
      const index = projection.indexById.get(id);
      if (canVirtualize && index !== undefined) {
        virtualizer.scrollToIndex(index, { align: 'auto' });
      }
      window.requestAnimationFrame(() =>
        rowElementsRef.current.get(id)?.focus(),
      );
    },
    [canVirtualize, projection.indexById, virtualizer],
  );

  const revealedSelectionRef = useRef<string | null>(null);
  useEffect(() => {
    const key = `${selectedNodeId}:${revealRequestKey ?? 0}`;
    if (!selectedNodeId || revealedSelectionRef.current === key) return;
    const index = projection.indexById.get(selectedNodeId);
    if (index === undefined) return;
    revealedSelectionRef.current = key;
    setFocusedId(selectedNodeId);
    if (canVirtualize) virtualizer.scrollToIndex(index, { align: 'auto' });
    else
      rowElementsRef.current
        .get(selectedNodeId)
        ?.scrollIntoView?.({ block: 'nearest' });
  }, [
    selectedNodeId,
    revealRequestKey,
    projection.indexById,
    canVirtualize,
    virtualizer,
  ]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const command = workspaceExplorerCommandForKey({
        key: event.key,
        metaKey: event.metaKey,
        ctrlKey: event.ctrlKey,
        focusedId,
        rows,
      });
      if (!command) {
        return;
      }
      event.preventDefault();
      switch (command.type) {
        case 'focus':
          focusRow(command.id);
          break;
        case 'expand':
        case 'collapse':
          onToggle(command.path);
          break;
        case 'activate': {
          const row = model.nodes.get(command.id);
          if (!row) {
            break;
          }
          if (row.kind === 'directory' && row.path) {
            onToggle(row.path);
          } else {
            onSelect({ ...row.source, children: [] });
          }
          break;
        }
        case 'select': {
          const row = model.nodes.get(command.id);
          if (row) {
            onSelect({ ...row.source, children: [] });
          }
          break;
        }
        case 'open-filter':
          onOpenFilter?.();
          break;
      }
    },
    [focusRow, focusedId, model.nodes, onOpenFilter, onSelect, onToggle, rows],
  );

  const virtualItems = canVirtualize ? virtualizer.getVirtualItems() : [];
  const renderedRows = canVirtualize
    ? virtualItems.map((item) => ({
        index: item.index,
        key: item.key,
        start: item.start,
      }))
    : rows.map((row, index) => ({ index, key: row.id, start: 0 }));

  return (
    <div
      ref={scrollerRef}
      role="tree"
      aria-label="Workspace files"
      className="thread-graph-workspace-tree-scroll min-h-0 flex-1 overflow-y-auto py-1 outline-none"
      onScroll={(event) => {
        if (scrollTopRef) {
          scrollTopRef.current = event.currentTarget.scrollTop;
        }
      }}
    >
      <div
        style={
          canVirtualize
            ? {
                height: `${virtualizer.getTotalSize()}px`,
                position: 'relative',
                width: '100%',
              }
            : undefined
        }
      >
        {renderedRows.map((rendered) => {
          const row = rows[rendered.index];
          if (!row) {
            return null;
          }
          return (
            <div
              key={rendered.key}
              role="none"
              data-index={rendered.index}
              ref={canVirtualize ? virtualizer.measureElement : undefined}
              style={
                canVirtualize
                  ? {
                      left: 0,
                      position: 'absolute',
                      top: 0,
                      transform: `translateY(${rendered.start}px)`,
                      width: '100%',
                    }
                  : undefined
              }
            >
              <WorkspaceExplorerRow
                row={row}
                selected={selectedNodeId === row.id}
                focused={focusedId === row.id}
                loading={loadingPaths.has(row.node.path)}
                {...(directoryErrors?.get(row.node.path)
                  ? { error: directoryErrors.get(row.node.path)! }
                  : {})}
                rowRef={(element) => {
                  if (element) {
                    rowElementsRef.current.set(row.id, element);
                  } else {
                    rowElementsRef.current.delete(row.id);
                  }
                }}
                onFocus={() => setFocusedId(row.id)}
                onKeyDown={handleKeyDown}
                onSelect={onSelect}
                onToggle={onToggle}
                {...(onPreview ? { onPreview } : {})}
                {...(onPin ? { onPin } : {})}
                {...(onRetryDirectory ? { onRetry: onRetryDirectory } : {})}
                {...(onDownload ? { onDownload } : {})}
                {...(onDownloadZip ? { onDownloadZip } : {})}
                {...(canDownload ? { canDownload } : {})}
                {...(onCopyPath ? { onCopyPath } : {})}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

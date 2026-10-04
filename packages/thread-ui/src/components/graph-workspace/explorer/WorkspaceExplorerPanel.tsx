import {
  FileCode2,
  ListCollapse,
  MoreHorizontal,
  RefreshCw,
  Search,
  PanelLeftClose,
  PanelRightOpen,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
} from 'react';

import type { WorkspaceTreeNode } from '../workspaceTree';
import type { ThreadWorkspaceArchiveFormat } from '../../../adapters';
import { WorkspaceExplorerTree } from './WorkspaceExplorerTree';

const iconButtonClassName =
  'thread-graph-explorer-icon-button flex h-6 w-6 items-center justify-center rounded transition disabled:cursor-not-allowed disabled:opacity-40';
const collapseButtonClassName =
  'thread-graph-explorer-collapse-button flex h-6 w-6 items-center justify-center rounded text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-[#222733] dark:hover:text-slate-100';

export function WorkspaceExplorerPanel({
  canEmptyGarbage,
  canUpload,
  pending,
  canImportArchive,
  archiveLimits,
  onImportArchive,
  onDownloadWorkspace,
  onDownloadWorkspaceZip,
  importFormats = ['tar'],
  downloadFormats = ['tar'],
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
  rootError,
}: {
  canEmptyGarbage?: boolean;
  canUpload?: boolean;
  pending?: boolean;
  canImportArchive?: boolean;
  archiveLimits?: string | undefined;
  onImportArchive?: () => void;
  onDownloadWorkspace?: () => void;
  onDownloadWorkspaceZip?: () => void;
  importFormats?: ThreadWorkspaceArchiveFormat[];
  downloadFormats?: ThreadWorkspaceArchiveFormat[];
  canTrash?: boolean;
  onTrashFile?: (() => void) | undefined;
  onOpenTrash?: (() => void) | undefined;
  canDelete?: boolean;
  canMove?: boolean;
  onDeleteFile?: (() => void) | undefined;
  onMoveFile?: () => void;
  compactFolders?: boolean;
  directoryErrors?: ReadonlyMap<string, string>;
  expandedPaths: ReadonlySet<string>;
  filterMode: 'highlight' | 'filter';
  filterQuery: string;
  initialLoading?: boolean;
  loadingPaths: ReadonlySet<string>;
  loading?: boolean;
  liveNodes?: WorkspaceTreeNode[];
  onCollapse?: () => void;
  onCollapseAll: () => void;
  onCopyPath?: (node: WorkspaceTreeNode) => void;
  onDownload?: (node: WorkspaceTreeNode) => void;
  onDownloadZip?: (node: WorkspaceTreeNode) => void;
  canDownload?: (node: WorkspaceTreeNode) => boolean;
  onEmptyGarbage?: () => void;
  onExpandViewer?: () => void;
  onFilterModeChange: (mode: 'highlight' | 'filter') => void;
  onFilterQueryChange: (query: string) => void;
  onPreview?: (node: WorkspaceTreeNode) => void;
  onPin?: (node: WorkspaceTreeNode) => void;
  onRefresh?: () => void;
  onRetryDirectory?: (path: string) => void;
  onSelect: (nodeId: string) => void;
  onSelectNode?: (node: WorkspaceTreeNode) => void;
  onToggle: (path: string) => void;
  onUpload?: () => void;
  explorerScrollTopRef: MutableRefObject<number>;
  explorerScrollerRef: MutableRefObject<HTMLDivElement | null>;
  selectedNodeId: string | null;
  revealRequestKey?: number | undefined;
  tree: WorkspaceTreeNode;
  rootError?: string | null;
}) {
  const visibleTree = useMemo(
    () => ({
      ...tree,
      children: tree.children.filter((node) => node.id !== 'live'),
    }),
    [tree],
  );
  const [filterOpen, setFilterOpen] = useState(Boolean(filterQuery));
  const [filterResult, setFilterResult] = useState({
    matchCount: 0,
    hasUnresolvedDirectories: false,
  });
  const filterInputRef = useRef<HTMLInputElement | null>(null);
  const openFilter = useCallback(() => setFilterOpen(true), []);
  const handleFilterResultsChange = useCallback(
    (result: { matchCount: number; hasUnresolvedDirectories: boolean }) =>
      setFilterResult(result),
    [],
  );

  useEffect(() => {
    if (filterOpen) {
      window.requestAnimationFrame(() => filterInputRef.current?.focus());
    }
  }, [filterOpen]);

  function closeFilter() {
    onFilterQueryChange('');
    setFilterOpen(false);
  }

  return (
    <aside className="thread-graph-explorer flex h-full min-h-0 flex-col overflow-hidden rounded-md">
      <div className="thread-graph-explorer-header flex h-9 shrink-0 items-center justify-between border-b px-2">
        <h2 className="text-[11px] font-semibold uppercase text-slate-600 dark:text-slate-300">
          Explorer
        </h2>
        <div className="thread-graph-explorer-toolbar flex items-center gap-1">
          <button
            type="button"
            onClick={openFilter}
            className={iconButtonClassName}
            title="Filter workspace"
            aria-label="Filter workspace"
            aria-pressed={filterOpen}
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onCollapseAll}
            className={iconButtonClassName}
            title="Collapse folders"
            aria-label="Collapse folders"
          >
            <ListCollapse className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onRefresh}
            disabled={!onRefresh || pending}
            className={iconButtonClassName}
            title="Refresh workspace"
            aria-label="Refresh workspace"
          >
            <RefreshCw
              className={`h-4 w-4 motion-reduce:animate-none ${loading ? 'animate-spin' : ''}`}
            />
          </button>
          {canUpload || onDownloadWorkspace || onEmptyGarbage || onOpenTrash ? (
            <details className="thread-graph-explorer-more relative">
              <summary
                className={`${iconButtonClassName} list-none cursor-pointer`}
                title="More Explorer actions"
                aria-label="More Explorer actions"
              >
                <MoreHorizontal className="h-4 w-4" />
              </summary>
              <div className="absolute right-0 top-7 z-40 max-h-[min(50dvh,14rem)] min-w-44 overflow-y-auto rounded-md border border-[var(--theme-border)] bg-[var(--theme-panel)] p-1 shadow-lg">
                {canUpload ? (
                  <button
                    type="button"
                    onClick={onUpload}
                    disabled={pending}
                    className="flex h-9 w-full items-center gap-2 rounded px-2 text-left text-sm hover:bg-[var(--theme-hover)]"
                  >
                    <Upload className="h-4 w-4" />
                    Upload file
                  </button>
                ) : null}
                {onDownloadWorkspace && (downloadFormats.includes('tar') || downloadFormats.length === 0) ? (
                  <button
                    type="button"
                    onClick={onDownloadWorkspace}
                    disabled={pending || !canDownload?.(tree)}
                    title={
                      canDownload?.(tree)
                        ? 'Download the workspace as a TAR archive'
                        : 'Folder downloads are unavailable for this connection.'
                    }
                    className="flex h-9 w-full items-center rounded px-2 text-left text-sm disabled:opacity-50"
                  >
                    Download Workspace (TAR)
                  </button>
                ) : null}
                {onDownloadWorkspaceZip && downloadFormats.includes('zip') ? (
                  <button type="button" onClick={onDownloadWorkspaceZip} disabled={pending || !canDownload?.(tree)} className="flex h-9 w-full items-center rounded px-2 text-left text-sm disabled:opacity-50">Download Workspace (ZIP)</button>
                ) : null}
                {onImportArchive ? (
                  <>
                    <button
                      type="button"
                      onClick={onImportArchive}
                      disabled={pending || !canImportArchive}
                      title={
                        canImportArchive
                          ? `Extract ${importFormats.map((format) => format.toUpperCase()).join(' or ')} into the workspace root`
                          : 'Archive extraction is unavailable for this connection.'
                      }
                      className="flex h-9 w-full items-center rounded px-2 text-left text-sm disabled:opacity-50"
                    >
                      {importFormats.includes('zip') ? 'Import archive' : 'Import TAR archive'}
                    </button>
                    <p className="max-w-64 px-2 py-1 text-xs">
                      {canImportArchive
                        ? `${importFormats.map((format) => format.toUpperCase()).join(' / ')}. ${archiveLimits ?? 'Extraction limits are enforced by the server.'}`
                        : 'Archive extraction is unsupported.'}{' '}
                      Regular uploads store archive bytes without extraction.
                    </p>
                  </>
                ) : null}
                {onTrashFile ? <button type="button" onClick={onTrashFile} disabled={pending || !canTrash} className="flex h-9 w-full items-center rounded px-2 text-left text-sm disabled:opacity-50">Trash selected file</button> : null}
                {onOpenTrash ? <button type="button" onClick={onOpenTrash} disabled={pending} className="flex h-9 w-full items-center rounded px-2 text-left text-sm disabled:opacity-50">Trash</button> : null}
                {onMoveFile ? (
                  <button
                    type="button"
                    onClick={onMoveFile}
                    disabled={pending || !canMove}
                    title={
                      canMove
                        ? 'Move selected file to a new path'
                        : 'Select a workspace file; this connection must support file moves.'
                    }
                    className="flex h-9 w-full items-center rounded px-2 text-left text-sm disabled:opacity-50"
                  >
                    Move selected file
                  </button>
                ) : null}
                {onDeleteFile ? (
                  <>
                    <button
                      type="button"
                      onClick={onDeleteFile}
                      disabled={pending || !canDelete}
                      title={
                        canDelete
                          ? 'Confirm permanent deletion of selected file'
                          : 'Select a workspace file; this connection must support file deletion.'
                      }
                      className="flex h-9 w-full items-center rounded px-2 text-left text-sm disabled:opacity-50"
                    >
                      Delete selected file…
                    </button>
                    {!onEmptyGarbage ? (
                      <p className="max-w-64 px-2 py-1 text-xs">
                        Reversible trash and empty-trash are unsupported for
                        this connection.
                      </p>
                    ) : null}
                  </>
                ) : null}
                {onEmptyGarbage ? (
                  <button
                    type="button"
                    onClick={onEmptyGarbage}
                    disabled={pending || !canEmptyGarbage}
                    className="flex h-9 w-full items-center gap-2 rounded px-2 text-left text-sm text-rose-600 hover:bg-rose-500/10 disabled:opacity-50 dark:text-rose-300"
                  >
                    <Trash2 className="h-4 w-4" />
                    Empty garbage
                  </button>
                ) : null}
              </div>
            </details>
          ) : null}
          {onExpandViewer ? (
            <button
              type="button"
              data-testid="expand-viewer"
              onClick={onExpandViewer}
              className={collapseButtonClassName}
              title="Show Editor"
              aria-label="Show Editor"
            >
              <PanelRightOpen className="h-4 w-4" />
            </button>
          ) : onCollapse ? (
            <button
              type="button"
              data-testid="collapse-explorer"
              onClick={onCollapse}
              className={collapseButtonClassName}
              title="Hide Explorer"
              aria-label="Hide Explorer"
            >
              <PanelLeftClose className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>

      {filterOpen ? (
        <div className="thread-graph-explorer-filter shrink-0 border-b border-[var(--theme-border)] px-3 py-2">
          <div className="flex flex-col gap-1.5">
            <div className="flex w-full min-w-0 items-center gap-2 rounded-md border border-[var(--theme-border)] bg-[var(--theme-surface-strong)] px-2">
              <Search className="h-3.5 w-3.5 shrink-0 text-[var(--theme-fg-muted)]" />
              <input
                ref={filterInputRef}
                value={filterQuery}
                onChange={(event) =>
                  onFilterQueryChange(event.currentTarget.value)
                }
                onKeyDown={(event) => {
                  if (event.key === 'Escape') {
                    event.preventDefault();
                    if (filterQuery) {
                      onFilterQueryChange('');
                    } else {
                      closeFilter();
                    }
                  }
                }}
                className="h-8 min-w-0 flex-1 bg-transparent text-sm text-[var(--theme-fg)] outline-none"
                placeholder="Filter loaded files"
                aria-label="Filter workspace files"
              />
              <button
                type="button"
                onClick={closeFilter}
                className="inline-flex h-7 w-7 items-center justify-center rounded text-[var(--theme-fg-muted)] hover:bg-[var(--theme-hover)] hover:text-[var(--theme-fg)]"
                title="Close filter"
                aria-label="Close filter"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <div
              className="thread-graph-explorer-filter-mode inline-flex shrink-0 self-end rounded-md border border-[var(--theme-border)] p-0.5"
              role="group"
              aria-label="Explorer filter mode"
            >
              {(['filter', 'highlight'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => onFilterModeChange(mode)}
                  className={`h-7 rounded px-2 text-xs ${filterMode === mode ? 'is-active' : ''}`}
                  aria-pressed={filterMode === mode}
                  title={
                    mode === 'filter'
                      ? 'Show matches only'
                      : 'Highlight matches'
                  }
                >
                  {mode === 'filter' ? 'Filter' : 'Highlight'}
                </button>
              ))}
            </div>
          </div>
          {filterQuery ? (
            <div
              className="mt-1.5 text-xs text-[var(--theme-fg-muted)]"
              aria-live="polite"
            >
              {filterResult.matchCount}{' '}
              {filterResult.matchCount === 1 ? 'match' : 'matches'}
              {filterResult.hasUnresolvedDirectories
                ? ' in loaded folders'
                : ''}
            </div>
          ) : null}
        </div>
      ) : null}

      {liveNodes.length > 0 ? (
        <div className="shrink-0 border-b border-slate-200 py-2 dark:border-[#2a2f3a]">
          <div className="thread-graph-workspace-label px-3 pb-1 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            Live
          </div>
          {liveNodes.map((node) => (
            <button
              key={node.id}
              type="button"
              data-testid="live-molecule-item"
              data-molecule-id={node.artifact?.id ?? node.id}
              onClick={() => onSelect(node.id)}
              className={`thread-graph-tree-row flex min-h-11 w-full items-center gap-2 px-3 py-2 text-left text-sm transition sm:min-h-7 sm:py-1 ${selectedNodeId === node.id ? 'is-selected' : ''}`}
            >
              <FileCode2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-300" />
              <span className="min-w-0 flex-1 truncate">{node.name}</span>
            </button>
          ))}
        </div>
      ) : null}

      {initialLoading ? (
        <div
          className="flex-1 space-y-1 px-3 py-2"
          role="status"
          aria-label="Loading workspace files"
        >
          {[0, 1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="h-7 animate-pulse rounded bg-[var(--theme-surface-strong)] motion-reduce:animate-none"
              style={{ width: `${72 - index * 6}%` }}
            />
          ))}
        </div>
      ) : rootError ? (
        <div className="mx-3 mt-2 rounded-md border border-rose-500/25 bg-rose-500/10 px-3 py-3 text-sm text-rose-700 dark:text-rose-200">
          <p>{rootError}</p>
          <button
            type="button"
            onClick={onRefresh}
            className="mt-2 h-8 rounded px-2 font-medium hover:bg-rose-500/10"
          >
            Retry
          </button>
        </div>
      ) : (
        <WorkspaceExplorerTree
          tree={visibleTree}
          expandedPaths={expandedPaths}
          filterMode={filterMode}
          filterQuery={filterQuery}
          compactFolders={compactFolders}
          directoryErrors={directoryErrors}
          loadingPaths={loadingPaths}
          selectedNodeId={selectedNodeId}
          revealRequestKey={revealRequestKey}
          scrollerRef={explorerScrollerRef}
          scrollTopRef={explorerScrollTopRef}
          {...(onCopyPath ? { onCopyPath } : {})}
          {...(onDownload ? { onDownload } : {})}
          {...(onDownloadZip ? { onDownloadZip } : {})}
          {...(canDownload ? { canDownload } : {})}
          onOpenFilter={openFilter}
          onFilterResultsChange={handleFilterResultsChange}
          {...(onPreview ? { onPreview } : {})}
          {...(onPin ? { onPin } : {})}
          {...(onRetryDirectory ? { onRetryDirectory } : {})}
          onSelect={(node) => {
            onSelect(node.id);
            onSelectNode?.(node);
          }}
          onToggle={onToggle}
        />
      )}
      {!initialLoading &&
      !rootError &&
      filterQuery &&
      filterMode === 'filter' &&
      filterResult.matchCount === 0 ? (
        <p className="thread-graph-workspace-empty mx-4 mb-4 rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-4 text-sm text-slate-500 dark:border-[#303642] dark:bg-[#1b1f29] dark:text-slate-400">
          No matches in loaded folders.
        </p>
      ) : visibleTree.children.length === 0 ? (
        <p className="thread-graph-workspace-empty mx-4 mb-4 rounded-lg border border-dashed border-slate-200 bg-slate-50 px-3 py-4 text-sm text-slate-500 dark:border-[#303642] dark:bg-[#1b1f29] dark:text-slate-400">
          This workspace is empty. Agent tool runs execute inside the thread
          workspace, so files should appear here as the session works.
        </p>
      ) : null}
    </aside>
  );
}

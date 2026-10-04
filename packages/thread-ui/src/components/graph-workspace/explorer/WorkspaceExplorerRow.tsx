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
  LoaderCircle,
} from 'lucide-react';
import type { KeyboardEvent, ReactNode, Ref } from 'react';

import { extensionOf, type WorkspaceTreeNode } from '../workspaceTree';
import type { WorkspaceExplorerRowProjection } from './workspaceExplorerTypes';

function iconForNode(node: WorkspaceTreeNode, expanded: boolean) {
  if (node.kind === 'directory') {
    return expanded ? (
      <FolderOpen className="h-4 w-4 text-slate-500 dark:text-slate-400" />
    ) : (
      <Folder className="h-4 w-4 text-slate-500 dark:text-slate-400" />
    );
  }
  const extension = extensionOf(node.name);
  if (extension === 'zip') {
    return <FileArchive className="h-4 w-4 text-amber-600" />;
  }
  if (
    node.kind === 'file' &&
    ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(extension)
  ) {
    return <FileImage className="h-4 w-4 text-sky-500" />;
  }
  if (
    node.kind === 'artifact' ||
    [
      'xyz',
      'extxyz',
      'cif',
      'pdf',
      'json',
      'ts',
      'tsx',
      'js',
      'jsx',
      'md',
      'yaml',
      'yml',
      'py',
    ].includes(extension)
  ) {
    return <FileCode2 className="h-4 w-4 text-emerald-600" />;
  }
  return <File className="h-4 w-4 text-slate-400 dark:text-slate-500" />;
}

export function WorkspaceExplorerRow({
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
  onCopyPath,
}: {
  row: WorkspaceExplorerRowProjection;
  selected: boolean;
  focused: boolean;
  loading: boolean;
  error?: string;
  rowRef?: Ref<HTMLDivElement>;
  onFocus: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
  onSelect: (node: WorkspaceTreeNode) => void;
  onToggle: (path: string) => void;
  onPreview?: (node: WorkspaceTreeNode) => void;
  onPin?: (node: WorkspaceTreeNode) => void;
  onRetry?: (path: string) => void;
  onDownload?: (node: WorkspaceTreeNode) => void;
  onDownloadZip?: (node: WorkspaceTreeNode) => void;
  canDownload?: (node: WorkspaceTreeNode) => boolean;
  onCopyPath?: (node: WorkspaceTreeNode) => void;
}) {
  const node: WorkspaceTreeNode = {
    ...row.node.source,
    children: [],
  };
  const isDirectory = node.kind === 'directory';
  const canToggleDirectory = isDirectory && Boolean(node.path);
  const expanded = Boolean(row.expanded);
  const paddingLeft = `${row.depth * 0.5 + 0.5}rem`;
  const displayName = row.compactPathSegments?.join('/') ?? node.name;
  const label = row.matchRanges?.length ? (
    <>
      {row.matchRanges.reduce<ReactNode[]>((parts, range, index) => {
        const previousEnd = row.matchRanges?.[index - 1]?.end ?? 0;
        if (range.start > previousEnd) {
          parts.push(displayName.slice(previousEnd, range.start));
        }
        parts.push(
          <span
            key={`${range.start}:${range.end}`}
            className="font-semibold text-[var(--theme-fg)]"
          >
            {displayName.slice(range.start, range.end)}
          </span>,
        );
        if (
          index === row.matchRanges!.length - 1 &&
          range.end < displayName.length
        ) {
          parts.push(displayName.slice(range.end));
        }
        return parts;
      }, [])}
    </>
  ) : (
    displayName
  );

  return (
    <div
      ref={rowRef}
      role="treeitem"
      aria-label={displayName}
      aria-level={row.depth + 1}
      aria-posinset={row.posInSet}
      aria-setsize={row.setSize}
      aria-selected={selected}
      {...(isDirectory ? { 'aria-expanded': expanded } : {})}
      tabIndex={focused ? 0 : -1}
      data-explorer-node-id={node.id}
      data-explorer-path={node.path}
      className={`thread-graph-tree-row group relative flex min-w-0 items-center text-sm transition ${
        selected ? 'is-selected' : ''
      } ${focused ? 'is-focused' : ''}`}
      style={{ paddingLeft }}
      onFocus={onFocus}
      onKeyDown={onKeyDown}
      onDoubleClick={() => {
        if (isDirectory && node.path) {
          onToggle(node.path);
        } else if (!isDirectory) {
          onPin?.(node);
        }
      }}
    >
      {row.depth > 0 ? (
        <span
          className="thread-graph-tree-indent-guides pointer-events-none absolute inset-y-0 left-0"
          aria-hidden="true"
        >
          {Array.from({ length: row.depth }, (_, index) => (
            <span
              key={index}
              className="absolute inset-y-0 border-l"
              style={{ left: `${index * 0.5 + 0.75}rem` }}
            />
          ))}
        </span>
      ) : null}
      {canToggleDirectory ? (
        <button
          type="button"
          tabIndex={-1}
          aria-label={`${expanded ? 'Collapse' : 'Expand'} ${node.name}`}
          className="inline-flex h-7 w-7 shrink-0 items-center justify-center sm:h-6 sm:w-6"
          onClick={() => {
            if (node.path) {
              onToggle(node.path);
            }
          }}
        >
          {loading ? (
            <LoaderCircle className="h-3.5 w-3.5 animate-spin text-slate-400 motion-reduce:animate-none" />
          ) : expanded ? (
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          )}
        </button>
      ) : (
        <span className="h-7 w-7 shrink-0 sm:h-6 sm:w-6" aria-hidden="true" />
      )}
      <button
        type="button"
        tabIndex={-1}
        className="flex min-h-11 min-w-0 flex-1 items-center gap-2 py-2 pr-2 text-left sm:min-h-7 sm:py-1"
        onClick={() => onSelect(node)}
      >
        {iconForNode(node, expanded)}
        <span className="min-w-0 flex-1 truncate" title={displayName}>
          {label}
        </span>
      </button>
      {isDirectory && error && onRetry ? (
        <button
          type="button"
          tabIndex={-1}
          onClick={() => onRetry(node.path)}
          className="mr-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded text-rose-600 hover:bg-rose-500/10 dark:text-rose-300"
          title={`${error}. Retry ${node.name}`}
          aria-label={`Retry loading ${node.name}`}
        >
          <CircleAlert className="h-3.5 w-3.5" />
        </button>
      ) : null}
      {node.id !== 'linked-files' &&
      (onDownload ||
        (onCopyPath && node.path) ||
        (!isDirectory && onPreview)) ? (
        <div className="thread-graph-tree-actions absolute inset-y-0 right-1 flex items-center gap-0.5 pl-1">
          {!isDirectory && onPreview ? (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => onPreview(node)}
              className="thread-graph-tree-action flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition sm:h-7 sm:w-7"
              title={`Preview ${node.name}`}
              aria-label={`Preview ${node.name}`}
            >
              <Eye className="h-3.5 w-3.5" />
            </button>
          ) : null}
          {onDownload ? (
            <button
              type="button"
              tabIndex={-1}
              disabled={canDownload ? !canDownload(node) : false}
              onClick={() => onDownload(node)}
              className="thread-graph-tree-action flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition sm:h-7 sm:w-7"
              title={
                canDownload && !canDownload(node)
                  ? `Downloads are unavailable for this ${isDirectory ? 'folder' : 'file'} connection.`
                  : `Download ${node.name}`
              }
              aria-label={`Download ${node.name}`}
            >
              <Download className="h-3.5 w-3.5" />
            </button>
          ) : null}
          {isDirectory && row.depth > 0 && onDownloadZip ? (
            <button type="button" tabIndex={-1} disabled={canDownload ? !canDownload(node) : false} onClick={() => onDownloadZip(node)} className="thread-graph-tree-action flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition sm:h-7 sm:w-7" title={`Download ${node.name} (ZIP)`} aria-label={`Download ${node.name} (ZIP)`}>
              <FileArchive className="h-3.5 w-3.5" />
            </button>
          ) : null}
          {onCopyPath ? (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => onCopyPath(node)}
              className="thread-graph-tree-action flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition sm:h-7 sm:w-7"
              title={`Copy path for ${node.name}`}
              aria-label={`Copy path for ${node.name}`}
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

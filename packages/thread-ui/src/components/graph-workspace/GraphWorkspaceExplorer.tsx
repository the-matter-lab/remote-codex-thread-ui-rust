import { relativeWorkspacePath } from '../workspacePaths';
import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import type {
  AgentRuntimeStatusDto,
  ThreadArtifactDto,
  ThreadDetailDto,
} from '@remote-codex/shared';
import type { ThreadWorkspaceAdapter } from '../../adapters';
import type { WorkspaceExplorerAdapter } from './explorer/workspaceExplorerTypes';
import type { PluginContextValue } from '../../plugins/plugin-context';
import { type WorkspaceTreeNode } from './workspaceTree';
import { useWorkspaceExplorerController } from './explorer/useWorkspaceExplorerController';
import { useWorkspaceExplorerActions } from './explorer/useWorkspaceExplorerActions';
import { WorkspaceTrashDialog } from './explorer/WorkspaceTrashDialog';
import { useWorkspaceFilePreview } from './explorer/useWorkspaceFilePreview';
import { WorkspaceExplorerPanel } from './explorer/WorkspaceExplorerPanel';
import type { WorkspaceFileTab } from './WorkspaceFileTabs';
import {
  GraphWorkspacePreviewPane,
  graphWorkspacePreviewTargetFromNode,
} from './GraphWorkspacePreviewPane';
import { GraphEmptyGarbageDialog } from './GraphEmptyGarbageDialog';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './GraphResizablePanels';

export function GraphWorkspaceExplorer({
  activeView,
  detail,
  artifacts,
  plugins,
  status,
  focusPathRequest,
  workspaceAdapter,
}: {
  activeView: 'chat' | 'shell';
  detail: ThreadDetailDto;
  artifacts: ThreadArtifactDto[];
  plugins: PluginContextValue;
  status: AgentRuntimeStatusDto | null;
  focusPathRequest?: { path: string; line?: number; requestId: number; artifactId?: string } | null;
  workspaceAdapter?: ThreadWorkspaceAdapter | null;
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
    workspaceIdentity,
  } = useWorkspaceExplorerController({
    activeView,
    detail,
    artifacts,
    status,
    focusPathRequest,
    workspaceAdapter,
  });
  const [collapsedPanel, setCollapsedPanel] = useState<
    'explorer' | 'viewer' | null
  >(() =>
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(max-width: 639px)').matches
      ? 'viewer'
      : null,
  );
  const [focusedLine, setFocusedLine] = useState<number | null>(null);
  const [fileTabs, setFileTabs] = useState<WorkspaceFileTab[]>([]);
  const [dirtyFilePaths, setDirtyFilePaths] = useState<Set<string>>(
    () => new Set(),
  );
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const explorerScrollerRef = useRef<HTMLDivElement | null>(null);
  const explorerScrollTopRef = useRef(0);
  const restoredRevealRef = useRef<number | null>(null);
  const scrollRestoreGenerationRef = useRef(0);
  useLayoutEffect(() => {
    ++scrollRestoreGenerationRef.current;
    return () => {
      ++scrollRestoreGenerationRef.current;
    };
  }, [focusPathRequest]);
  const pendingExplorerScrollRestoreRef = useRef<number | null>(null);
  const {
    downloadOnly,
    imageUrl,
    loadingMore,
    loadMore: handleLoadMore,
    pdfUrl,
    previewFile,
    previewLoading,
    saveFile: handleSaveFile,
    reloadFile,
  } = useWorkspaceFilePreview({
    activeNode,
    adapter: workspaceAdapter,
    identity: workspaceIdentity,
    onError: setWorkspaceError,
    refreshTree: refreshWorkspaceTree,
  });
  const [fileOperation, setFileOperation] = useState<'delete' | 'move' | null>(
    null,
  );
  const [destination, setDestination] = useState('');
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
    showGarbageDialog,
  } = useWorkspaceExplorerActions({
    activeNode,
    adapter: workspaceAdapter as WorkspaceExplorerAdapter,
    capabilities,
    identity: workspaceIdentity,
    onError: setWorkspaceError,
    onLoadingChange: setLoadingTree,
    refreshTree: refreshWorkspaceTree,
    focusFile: (path) => { setCollapsedPanel(null); return focusWorkspacePath(path); },
    workspaceRootPath: detail.workspace.absPath,
  });

  useEffect(() => {
    setFileOperation(null);
  }, [activeNode?.path]);

  useEffect(() => {
    explorerScrollTopRef.current = 0;
    pendingExplorerScrollRestoreRef.current = null;
    setFileOperation(null);
    setDestination('');
    setFocusedLine(null);
    ++scrollRestoreGenerationRef.current;
    setFileTabs([]);
    setDirtyFilePaths(new Set());
  }, [workspaceIdentity.threadId, workspaceIdentity.workspaceId]);

  useEffect(() => {
    if (activeNode?.kind !== 'file' || !activeNode.path) {
      return;
    }
    setFileTabs((current) => {
      if (current.some((tab) => tab.path === activeNode.path)) {
        return current;
      }
      const previewIndex = current.findIndex((tab) => !tab.pinned);
      const nextTab: WorkspaceFileTab = {
        name: activeNode.name,
        path: activeNode.path,
        pinned: false,
      };
      if (previewIndex < 0) {
        return [...current, nextTab];
      }
      return current.map((tab, index) =>
        index === previewIndex ? nextTab : tab,
      );
    });
  }, [activeNode]);

  useEffect(() => {
    if (focusPathRequest) {
      setFocusedLine(focusPathRequest.line ?? null);
      setCollapsedPanel(null);
    }
  }, [focusPathRequest]);

  function rememberExplorerScroll() {
    const currentScrollTop =
      explorerScrollerRef.current?.scrollTop ?? explorerScrollTopRef.current;
    explorerScrollTopRef.current = currentScrollTop;
    pendingExplorerScrollRestoreRef.current = currentScrollTop;
  }

  function restoreExplorerScroll() {
    const generation = ++scrollRestoreGenerationRef.current;
    const target =
      pendingExplorerScrollRestoreRef.current ?? explorerScrollTopRef.current;
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
        Math.max(0, current.scrollHeight - current.clientHeight),
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

  useLayoutEffect(() => {
    if (
      collapsedPanel === 'explorer' ||
      (focusPathRequest &&
        restoredRevealRef.current !== focusPathRequest.requestId)
    ) {
      return;
    }
    restoreExplorerScroll();
    // Restore after panel changes. These transitions can
    // remount the scroller or let WebView apply delayed scroll anchoring.
  }, [collapsedPanel]);
  useLayoutEffect(() => {
    if (focusPathRequest && !loadingTree && activeNode) {
      restoredRevealRef.current = focusPathRequest.requestId;
    }
  }, [focusPathRequest, loadingTree, activeNode]);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function'
    ) {
      return;
    }
    const mediaQuery = window.matchMedia('(max-width: 639px)');
    const update = () => setIsMobileViewport(mediaQuery.matches);
    update();
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', update);
      return () => mediaQuery.removeEventListener('change', update);
    }
    mediaQuery.addListener(update);
    return () => mediaQuery.removeListener(update);
  }, []);

  function handlePreview(node: WorkspaceTreeNode) {
    if (node.kind !== 'file') {
      return;
    }
    rememberExplorerScroll();
    setFocusedLine(null);
    setSelectedNodeId(node.id);
    setCollapsedPanel('explorer');
  }

  function handlePin(node: WorkspaceTreeNode) {
    if (node.kind !== 'file' || !node.path) {
      return;
    }
    setSelectedNodeId(node.id);
    setFileTabs((current) => {
      const existing = current.find((tab) => tab.path === node.path);
      if (existing) {
        return current.map((tab) =>
          tab.path === node.path ? { ...tab, pinned: true } : tab,
        );
      }
      return [...current, { name: node.name, path: node.path, pinned: true }];
    });
  }

  function handleCloseTab(path: string) {
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
    const replacement =
      nextTabs[Math.min(closingIndex, nextTabs.length - 1)] ?? null;
    if (replacement) {
      void focusWorkspacePath(replacement.path);
    } else {
      setSelectedNodeId(null);
    }
  }

  const explorerActions = {
    onCopyPath: handleCopyPath,
    ...(workspaceAdapter?.downloadNode
      ? { onDownload: (node: WorkspaceTreeNode, format?: import('../../adapters').ThreadWorkspaceArchiveFormat) => void handleDownload(node, format) }
      : {}),
    canDownload: (node: WorkspaceTreeNode) => !pending && canDownload(node),
    ...(workspaceAdapter?.downloadNode && downloadFormats.includes('zip')
      ? { onDownloadZip: (node: WorkspaceTreeNode) => void handleDownload(node, 'zip') }
      : {}),
    ...(workspaceAdapter?.emptyGarbage
      ? { onEmptyGarbage: handleOpenGarbage }
      : {}),
    ...(workspaceAdapter
      ? {
          onRefresh: () => {
            if (pending) return;
            resetTrashRetry();
            refreshCapabilities();
            void refreshWorkspaceTree(activeNode?.path ?? null);
          },
        }
      : {}),
    ...(workspaceAdapter?.uploadFile ? { onUpload: pickUploadFile } : {}),
  };

  const explorerPanel = (
    <WorkspaceExplorerPanel
      canEmptyGarbage={Boolean(workspaceAdapter?.emptyGarbage)}
      canUpload={Boolean(workspaceAdapter?.uploadFile)}
      pending={pending}
      canImportArchive={
        importFormats.length > 0 &&
        Boolean((workspaceAdapter as WorkspaceExplorerAdapter)?.importArchive)
      }
      importFormats={importFormats}
      downloadFormats={downloadFormats}
      archiveLimits={
        capabilities
          ? `${capabilities.maxArchiveBytes?.toLocaleString() ?? 'bounded'} bytes expanded, ${capabilities.maxArchiveEntries?.toLocaleString() ?? 'bounded'} entries; no symlinks or paths outside the workspace.`
          : undefined
      }
      onImportArchive={() => archiveInputRef.current?.click()}
      onDownloadWorkspace={() => void handleDownload(tree)}
      onDownloadWorkspaceZip={() => void handleDownload(tree, 'zip')}
      canTrash={canTrash}
      onTrashFile={canListTrash ? () => void trashFile() : undefined}
      onOpenTrash={canListTrash ? () => void openTrash() : undefined}
      canDelete={canDelete}
      canMove={canMove}
      onDeleteFile={capabilities?.trash ? undefined : () => setFileOperation('delete')}
      onMoveFile={() => {
        setDestination(activeNode?.path ?? '');
        setFileOperation('move');
      }}
      compactFolders={!isMobileViewport}
      directoryErrors={directoryErrors}
      filterMode={filterMode}
      filterQuery={filterQuery}
      initialLoading={Boolean(workspaceAdapter && !adapterModel && loadingTree)}
      rootError={workspaceAdapter && !adapterModel ? workspaceError : null}
      {...(collapsedPanel === 'viewer'
        ? { onExpandViewer: () => setCollapsedPanel(null) }
        : {
            onCollapse: () => {
              rememberExplorerScroll();
              setCollapsedPanel('explorer');
            },
          })}
      expandedPaths={expandedPaths}
      loadingPaths={loadingDirectoryPaths}
      loading={loadingTree}
      explorerScrollTopRef={explorerScrollTopRef}
      explorerScrollerRef={explorerScrollerRef}
      {...explorerActions}
      onCollapseAll={collapseAll}
      onFilterModeChange={setFilterMode}
      onFilterQueryChange={setFilterQuery}
      onRetryDirectory={(path) => void retryDirectory(path)}
      onPreview={handlePreview}
      onPin={handlePin}
      onSelect={(nodeId) => {
        setSelectedNodeId(nodeId);
      }}
      onSelectNode={(node) => {
        setFocusedLine(null);
        if (isMobileViewport && node.kind !== 'directory') {
          rememberExplorerScroll();
          setCollapsedPanel('explorer');
        }
      }}
      onToggle={toggleDirectory}
      selectedNodeId={activeNode?.id ?? null}
      revealRequestKey={focusPathRequest?.requestId}
      tree={tree}
      liveNodes={liveNodes}
    />
  );

  const viewerPanel = (
    <GraphWorkspacePreviewPane
      key={`${workspaceIdentity.threadId}:${workspaceIdentity.workspaceId}`}
      activeFilePath={activeNode?.kind === 'file' ? activeNode.path : null}
      dirtyFilePaths={dirtyFilePaths}
      error={null}
      fileTabs={fileTabs}
      downloadOnly={downloadOnly}
      {...(activeNode?.kind === 'file' && canDownload(activeNode)
        ? { onDownloadFile: () => handleDownload(activeNode) }
        : {})}
      imageUrl={imageUrl}
      loadingMore={loadingMore}
      focusLine={focusedLine}
      onOpenWorkspaceFile={(path) => {
        setFocusedLine(null);
        setCollapsedPanel(null);
        void focusWorkspacePath(path);
      }}
      onLoadMore={() => void handleLoadMore()}
      onCloseFileTab={handleCloseTab}
      onDirtyChange={(path, dirty) => {
        if (dirty) {
          setFileTabs((current) =>
            current.map((tab) =>
              tab.path === path ? { ...tab, pinned: true } : tab,
            ),
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
      }}
      onSelectFileTab={(path) => void focusWorkspacePath(path)}
      {...(workspaceAdapter?.writeFile &&
      activeNode &&
      relativeWorkspacePath(activeNode.path, detail.workspace.absPath) !== null
        ? { onSaveFile: handleSaveFile }
        : {})}
      {...(collapsedPanel === 'explorer'
        ? { onExpandExplorer: () => setCollapsedPanel(null) }
        : {
            onCollapse: () => {
              rememberExplorerScroll();
              setCollapsedPanel('viewer');
            },
          })}
      pdfUrl={pdfUrl}
      previewFile={previewFile}
      previewLoading={previewLoading}
      onReloadFile={() => void reloadFile()}
      plugins={plugins}
      {...(workspaceAdapter?.getRawFileUrl
        ? {
            resolveWorkspaceFileUrl: (path: string) =>
              workspaceAdapter.getRawFileUrl?.({
                ...workspaceIdentity,
                path,
              }) ?? null,
          }
        : {})}
      selectedTarget={graphWorkspacePreviewTargetFromNode(activeNode)}
      workspaceRootPath={detail.workspace.absPath}
    />
  );

  function renderWorkspace(content: import('react').ReactNode) {
    return (
      <div className="flex h-full min-h-0 flex-col">
        {workspaceError || capabilityError ? (
          <div
            role="alert"
            className="px-3 py-2 text-sm text-rose-700 dark:text-rose-200"
          >
            {workspaceError || capabilityError}
          </div>
        ) : null}
        {notice && !showTrash ? (
          <div role="status" className="max-h-28 shrink-0 overflow-auto break-words px-3 py-2 text-sm">
            {notice}
          </div>
        ) : null}
        {showGarbageDialog ? (
          <GraphEmptyGarbageDialog
            files={garbageFiles}
            onCancel={() => setShowGarbageDialog(false)}
            onConfirm={() => void handleConfirmEmptyGarbage()}
          />
        ) : null}
        <WorkspaceTrashDialog
          open={showTrash}
          list={trashList}
          pending={pending}
          error={workspaceError}
          notice={notice}
          canRestore={canRestoreTrash}
          canEmpty={canEmptyTrash}
          confirming={confirmTrashEmpty}
          onClose={() => { setShowTrash(false); setConfirmTrashEmpty(false); }}
          onRefresh={() => void openTrash()}
          onRestore={(entry) => void restoreTrash(entry)}
          onConfirmingChange={setConfirmTrashEmpty}
          onEmpty={() => void emptyTrash()}
        />
        <Dialog.Root
          open={fileOperation !== null}
          onOpenChange={(open) => {
            if (!open) setFileOperation(null);
          }}
        >
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
          <Dialog.Content
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-[var(--theme-panel)] p-6 shadow-xl"
            onOpenAutoFocus={(event) => {
              if (fileOperation === 'delete') {
                event.preventDefault();
                document
                  .querySelector<HTMLButtonElement>(
                    '[aria-label="Cancel file operation"]',
                  )
                  ?.focus();
              }
            }}
          >
            <Dialog.Title>
              {fileOperation === 'delete'
                ? 'Permanently delete file'
                : 'Move file'}
            </Dialog.Title>
            <Dialog.Description>
              {fileOperation === 'delete'
                ? `Permanently delete ${activeNode?.name}? This connection has no reversible trash. Immutable artifacts are retained, but workspace file links can stop working.`
                : 'Move the selected file to a new workspace path. Existing files cannot be replaced.'}
            </Dialog.Description>
            {fileOperation === 'move' ? (
              <input
                aria-label="New file path"
                value={destination}
                onChange={(event) => setDestination(event.currentTarget.value)}
              />
            ) : null}
            <button
              type="button"
              aria-label="Cancel file operation"
              disabled={pending}
              onClick={() => setFileOperation(null)}
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={
                pending || (fileOperation === 'delete' ? !canDelete : !canMove)
              }
              onClick={() => {
                const operation = fileOperation;
                setFileOperation(null);
                if (operation === 'delete') void deleteFile();
                else void moveFile(destination);
              }}
            >
              {fileOperation === 'delete' ? 'Delete permanently' : 'Move file'}
            </button>
          </Dialog.Content>
        </Dialog.Root>
        <div className="min-h-0 flex-1">{content}</div>
        <input
          ref={fileInputRef}
          type="file"
          aria-label="Workspace upload file input"
          data-testid="workspace-upload-file-input"
          className="hidden"
          onChange={(event) => void handleUpload(event)}
        />
        <input
          ref={archiveInputRef}
          type="file"
          accept={importFormats.map((format) => `.${format}`).join(',')}
          aria-label="Workspace archive import input"
          data-testid="workspace-archive-import-input"
          className="hidden"
          onChange={(event) => void handleArchiveImport(event)}
        />
      </div>
    );
  }

  if (collapsedPanel === 'explorer') {
    return renderWorkspace(
      <div
        data-testid="workspace-panel"
        className="relative h-full min-h-0 w-full overflow-hidden p-1"
      >
        {viewerPanel}
      </div>,
    );
  }

  if (collapsedPanel === 'viewer') {
    return renderWorkspace(
      <div
        data-testid="workspace-panel"
        className="relative h-full min-h-0 w-full overflow-hidden p-1"
      >
        {explorerPanel}
      </div>,
    );
  }

  return renderWorkspace(
    <div
      data-testid="workspace-panel"
      className="flex h-full min-h-0 w-full overflow-hidden bg-transparent p-1"
    >
      {isMobileViewport ? (
        <ResizablePanelGroup
          direction="vertical"
          autoSaveId={`workspace-explorer-mobile:${workspaceIdentity.threadId}`}
          className="thread-graph-workspace-mobile-stack"
        >
          <ResizablePanel defaultSize={42} minSize={18}>
            <div className="thread-graph-workspace-mobile-explorer h-full min-h-0 overflow-hidden">
              {explorerPanel}
            </div>
          </ResizablePanel>
          <ResizableHandle className="thread-graph-workspace-resize-handle h-1 bg-transparent after:h-px after:bg-slate-200/80 after:transition-colors hover:after:bg-slate-300 dark:after:bg-[#303642] dark:hover:after:bg-[#475063]" />
          <ResizablePanel defaultSize={58} minSize={18}>
            <div className="thread-graph-workspace-mobile-viewer h-full min-h-0 overflow-hidden">
              {viewerPanel}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        <ResizablePanelGroup
          direction="horizontal"
          autoSaveId={`workspace-explorer-desktop:${workspaceIdentity.threadId}`}
          className="thread-graph-workspace-resizable"
        >
          <ResizablePanel defaultSize={28} minSize={18}>
            <div className="thread-graph-workspace-explorer-pane h-full min-h-0 overflow-hidden">
              {explorerPanel}
            </div>
          </ResizablePanel>
          <ResizableHandle className="thread-graph-workspace-resize-handle w-1 bg-transparent after:w-px after:bg-slate-200/80 after:transition-colors hover:after:bg-slate-300 dark:after:bg-[#303642] dark:hover:after:bg-[#475063]" />
          <ResizablePanel defaultSize={72} minSize={40}>
            <div className="thread-graph-workspace-viewer-pane h-full min-h-0 overflow-hidden">
              {viewerPanel}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
    </div>,
  );
}

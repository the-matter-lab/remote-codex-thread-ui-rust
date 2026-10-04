import { useEffect, useRef, useState, type ChangeEvent } from 'react';

import {
  workspaceDisplayPath,
  relativeWorkspacePath,
} from '../../workspacePaths';
import type { WorkspaceTreeNode } from '../workspaceTree';
import type { WorkspaceExplorerIdentity } from './useWorkspaceExplorerPersistence';
import type {
  WorkspaceExplorerAdapter,
  WorkspaceExplorerCapabilities,
} from './workspaceExplorerTypes';

export function useWorkspaceExplorerActions({
  activeNode,
  adapter,
  capabilities,
  identity,
  onError,
  onLoadingChange,
  refreshTree,
  workspaceRootPath,
}: {
  activeNode: WorkspaceTreeNode | null;
  adapter?: WorkspaceExplorerAdapter | null;
  capabilities: WorkspaceExplorerCapabilities | null;
  identity: WorkspaceExplorerIdentity;
  onError: (error: string | null) => void;
  onLoadingChange: (loading: boolean) => void;
  refreshTree: (preferredPath?: string | null) => Promise<void>;
  workspaceRootPath: string;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const archiveInputRef = useRef<HTMLInputElement | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [showGarbageDialog, setShowGarbageDialog] = useState(false);
  const [garbageFiles, setGarbageFiles] = useState<string[]>([]);
  const generation = useRef(0);
  useEffect(() => {
    ++generation.current;
    setPending(false);
    setNotice(null);
    setShowGarbageDialog(false);
    setGarbageFiles([]);
    return () => {
      ++generation.current;
    };
  }, [adapter, identity.threadId, identity.workspaceId]);

  async function run(operation: () => Promise<void> | void, success: string) {
    const request = generation.current;
    setPending(true);
    setNotice(null);
    onError(null);
    try {
      await operation();
      if (request === generation.current && success) setNotice(success);
    } catch (error) {
      if (request === generation.current) {
        const message =
          error instanceof Error
            ? error.message
            : 'File operation failed. Please try again.';
        onError(message);
      }
    } finally {
      if (request === generation.current) setPending(false);
    }
  }

  function canDownload(node: WorkspaceTreeNode) {
    if (!adapter?.downloadNode || !['file', 'directory'].includes(node.kind))
      return false;
    if (node.kind === 'directory')
      return capabilities?.download.directory === 'tar';
    return capabilities ? capabilities.download.file : !adapter.getCapabilities;
  }

  async function uploadFile(file: File) {
    if (!adapter?.uploadFile) return;
    await run(async () => {
      if (capabilities?.maxFileBytes && file.size > capabilities.maxFileBytes) {
        throw new Error(
          `File exceeds the ${capabilities.maxFileBytes.toLocaleString()} byte upload limit.`,
        );
      }
      // This is a regular upload, never a promise of extraction.
      const request = generation.current;
      onLoadingChange(true);
      try {
        const result = await adapter.uploadFile!({
          ...identity,
          path: file.name,
          file,
        });
        if (request !== generation.current) return;
        await refreshTree(
          result.kind === 'archive'
            ? (result.paths[0] ?? null)
            : result.file.path,
        );
      } finally {
        if (request === generation.current) onLoadingChange(false);
      }
    }, `Uploaded ${file.name}.`);
  }

  async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (file) await uploadFile(file);
  }

  async function handleArchiveImport(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    await run(async () => {
      if (capabilities?.archiveImport !== 'tar' || !adapter?.importArchive)
        throw new Error(
          'Archive extraction is unavailable for this connection.',
        );
      if (!/\.tar$/i.test(file.name))
        throw new Error(
          'Import requires an uncompressed .tar archive. ZIP and compressed TAR extraction are unsupported. Use Upload file to store an archive without extracting it.',
        );
      if (
        capabilities.maxArchiveBytes !== undefined &&
        capabilities.maxArchiveEntries !== undefined &&
        file.size >
          capabilities.maxArchiveBytes +
            capabilities.maxArchiveEntries * 1024 +
            1024
      )
        throw new Error(
          `Archive exceeds the ${capabilities.maxArchiveBytes.toLocaleString()} byte import limit plus bounded TAR headers.`,
        );
      const request = generation.current;
      const result = await adapter.importArchive({
        ...identity,
        path: '',
        file,
      });
      if (request === generation.current)
        await refreshTree(result.paths[0] ?? null);
    }, `Imported ${file.name} into the workspace.`);
  }

  async function pickUploadFile() {
    if (!adapter?.uploadFile) return;
    if (adapter.pickUploadFile) {
      // Hosts may throw before returning a promise.
      await run(
        () =>
          adapter.pickUploadFile!({
            ...identity,
            defaultPick: () => fileInputRef.current?.click(),
            upload: uploadFile,
          }),
        '',
      );
    } else fileInputRef.current?.click();
  }

  async function downloadNode(node: WorkspaceTreeNode) {
    await run(
      async () => {
        if (!canDownload(node))
          throw new Error(
            node.kind === 'directory'
              ? 'Folder downloads are unavailable for this connection.'
              : 'File downloads are unavailable for this connection.',
          );
        await adapter!.downloadNode!({
          ...identity,
          path: node.path,
          kind: node.kind === 'directory' ? 'directory' : 'file',
        });
      },
      `Downloaded ${node.name}${node.kind === 'directory' ? ' as a TAR archive' : ''}.`,
    );
  }

  async function copyPath(node: WorkspaceTreeNode) {
    await run(async () => {
      if (!node.path || !navigator.clipboard)
        throw new Error('Clipboard access is unavailable.');
      await navigator.clipboard.writeText(
        workspaceDisplayPath(node.path, workspaceRootPath) ?? node.path,
      );
    }, 'File path copied.');
  }

  const mutableFile =
    activeNode?.kind === 'file' &&
    relativeWorkspacePath(activeNode.path, workspaceRootPath) !== null;
  const canDelete = Boolean(
    mutableFile && capabilities?.delete === 'file' && adapter?.deleteFile,
  );
  const canMove = Boolean(
    mutableFile &&
    capabilities?.move === 'file-new-destination' &&
    adapter?.moveFile,
  );
  async function deleteFile() {
    const node = activeNode;
    await run(
      async () => {
        if (!canDelete || !node)
          throw new Error('File deletion is unavailable for this connection.');
        const request = generation.current;
        await adapter!.deleteFile!({ ...identity, path: node.path });
        if (request === generation.current) await refreshTree();
      },
      `Deleted ${node?.name ?? 'file'}.`,
    );
  }
  async function moveFile(destination: string) {
    const node = activeNode;
    await run(
      async () => {
        if (!canMove || !node)
          throw new Error('File moves are unavailable for this connection.');
        const path = relativeWorkspacePath(
          destination.trim(),
          workspaceRootPath,
        );
        if (!path || path === node.path)
          throw new Error(
            'Enter a new destination inside the workspace. Existing destinations cannot be replaced.',
          );
        const request = generation.current;
        await adapter!.moveFile!({
          ...identity,
          path: node.path,
          destination: path,
        });
        if (request === generation.current) await refreshTree(path);
      },
      `Moved ${node?.name ?? 'file'}.`,
    );
  }

  async function openGarbage() {
    if (!adapter?.emptyGarbage) return;
    await run(async () => {
      if (!adapter.listGarbage)
        throw new Error(
          'Cannot safely empty garbage without listing its contents.',
        );
      const request = generation.current;
      const files = await adapter.listGarbage(identity);
      if (request !== generation.current) return;
      setGarbageFiles(files.map((file) => `garbage/${file}`));
      setShowGarbageDialog(true);
    }, '');
  }
  async function confirmEmptyGarbage() {
    if (!adapter?.emptyGarbage) return;
    setShowGarbageDialog(false);
    await run(async () => {
      const request = generation.current;
      await adapter.emptyGarbage!(identity);
      if (request === generation.current)
        await refreshTree(activeNode?.path ?? null);
    }, 'Garbage emptied.');
  }

  return {
    canDownload,
    canDelete,
    canMove,
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
    showGarbageDialog,
  };
}

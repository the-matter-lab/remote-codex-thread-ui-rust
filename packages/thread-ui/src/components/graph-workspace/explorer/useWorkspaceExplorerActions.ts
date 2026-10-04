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
import type {
  ThreadWorkspaceArchiveFormat,
  ThreadWorkspaceTrashEntry,
  ThreadWorkspaceTrashList,
} from '../../../adapters';
import {
  workspaceArchiveFormats,
  workspaceTrashCapabilities,
} from './workspaceOperationCapabilities';

export function useWorkspaceExplorerActions({
  activeNode,
  adapter,
  capabilities,
  identity,
  onError,
  onLoadingChange,
  refreshTree,
  focusFile,
  workspaceRootPath,
}: {
  activeNode: WorkspaceTreeNode | null;
  adapter?: WorkspaceExplorerAdapter | null;
  capabilities: WorkspaceExplorerCapabilities | null;
  identity: WorkspaceExplorerIdentity;
  onError: (error: string | null) => void;
  onLoadingChange: (loading: boolean) => void;
  refreshTree: (preferredPath?: string | null) => Promise<void>;
  focusFile: (path: string) => Promise<void>;
  workspaceRootPath: string;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const archiveInputRef = useRef<HTMLInputElement | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [showGarbageDialog, setShowGarbageDialog] = useState(false);
  const [garbageFiles, setGarbageFiles] = useState<string[]>([]);
  const [trashList, setTrashList] = useState<ThreadWorkspaceTrashList | null>(
    null,
  );
  const [showTrash, setShowTrash] = useState(false);
  const [confirmTrashEmpty, setConfirmTrashEmpty] = useState(false);
  const trashOperations = useRef(new Map<string, string>());
  const trashInFlight = useRef(false);
  const generation = useRef(0);
  useEffect(() => {
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

  const importFormats = workspaceArchiveFormats(capabilities, 'import');
  const downloadFormats = workspaceArchiveFormats(capabilities, 'download');
  const trashCapabilities = workspaceTrashCapabilities(capabilities);

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

  function canDownload(
    node: WorkspaceTreeNode,
    format?: ThreadWorkspaceArchiveFormat,
  ) {
    if (!adapter?.downloadNode || !['file', 'directory'].includes(node.kind))
      return false;
    if (node.kind === 'directory') {
      if (!node.id.startsWith('workspace:')) return false;
      return format
        ? downloadFormats.includes(format)
        : downloadFormats.length > 0;
    }
    return capabilities
      ? capabilities.download.file
      : !adapter.getCapabilities && !adapter.capabilities;
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
      if (!importFormats.length || !adapter?.importArchive)
        throw new Error(
          'Archive extraction is unavailable for this connection.',
        );
      const format = /\.zip$/i.test(file.name)
        ? 'zip'
        : /\.tar$/i.test(file.name)
          ? 'tar'
          : null;
      if (!format || !importFormats.includes(format))
        throw new Error(
          `Import requires ${importFormats.includes('zip') ? 'an uncompressed .tar or .zip archive' : 'an uncompressed .tar archive'}. This archive format is unsupported. Use Upload file to store an archive without extracting it.`,
        );
      if (
        capabilities?.maxArchiveBytes !== undefined &&
        capabilities?.maxArchiveEntries !== undefined &&
        file.size >
          capabilities.maxArchiveBytes +
            capabilities.maxArchiveEntries * 1024 +
            1024
      )
        throw new Error(
          `Archive exceeds the ${capabilities.maxArchiveBytes.toLocaleString()} byte import limit plus bounded archive headers.`,
        );
      const request = generation.current;
      const result = await adapter.importArchive({
        ...identity,
        path: '',
        file,
        ...(format === 'zip' ? { format } : {}),
      });
      if (request !== generation.current) return;
      const firstFile =
        result.firstFile === undefined ? result.paths[0] : result.firstFile;
      await refreshTree(firstFile ?? null);
      if (request !== generation.current) return;
      if (firstFile) await focusFile(firstFile);
      if (request === generation.current)
        setNotice(
          `Imported ${file.name}. Committed ${result.paths.length} paths: ${result.paths.join(', ') || '(empty archive)'}.`,
        );
    }, '');
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

  async function downloadNode(
    node: WorkspaceTreeNode,
    requestedFormat?: ThreadWorkspaceArchiveFormat,
  ) {
    const format =
      requestedFormat ??
      (downloadFormats.includes('tar') ? 'tar' : downloadFormats[0]);
    await run(
      async () => {
        if (!canDownload(node, node.kind === 'directory' ? format : undefined))
          throw new Error(
            node.kind === 'directory'
              ? 'Folder downloads are unavailable for this connection.'
              : 'File downloads are unavailable for this connection.',
          );
        await adapter!.downloadNode!({
          ...identity,
          path: node.path,
          kind: node.kind === 'directory' ? 'directory' : 'file',
          ...(node.kind === 'directory' && format === 'zip' ? { format } : {}),
        });
      },
      `Downloaded ${node.name}${node.kind === 'directory' ? ` as a ${format?.toUpperCase()} archive` : ''}.`,
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
  const canTrash = Boolean(
    mutableFile && trashCapabilities?.files && adapter?.trashFile,
  );
  const canListTrash = Boolean(trashCapabilities && adapter?.listTrash);
  const canRestoreTrash = Boolean(
    trashCapabilities?.restore && adapter?.restoreTrash,
  );
  const canEmptyTrash = Boolean(
    trashCapabilities?.empty && adapter?.emptyTrash,
  );

  async function runTrash(
    key: string,
    operation: (operationId: string, request: number) => Promise<void>,
    success: string,
  ) {
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
        await operation(operationId!, request);
        if (request === generation.current) trashOperations.current.delete(key);
      } finally {
        if (request === generation.current) trashInFlight.current = false;
      }
    }, success);
  }

  async function loadTrash(request: number) {
    const list = await adapter!.listTrash!(identity);
    if (request === generation.current) setTrashList(structuredClone(list));
  }

  async function openTrash() {
    await run(async () => {
      if (!canListTrash)
        throw new Error('Trash is unavailable for this connection.');
      const request = generation.current;
      await loadTrash(request);
      if (request === generation.current) {
        setShowTrash(true);
        setConfirmTrashEmpty(false);
      }
    }, '');
  }

  async function trashFile() {
    const node = activeNode;
    if (!canTrash || !node) return;
    await runTrash(
      JSON.stringify(['trash', node.path]),
      async (operationId, request) => {
        await adapter!.trashFile!({
          ...identity,
          path: node.path,
          operationId,
        });
        if (request === generation.current) await refreshTree();
      },
      `Moved ${node.name} to trash. Restore it from Trash.`,
    );
  }

  async function restoreTrash(entry: ThreadWorkspaceTrashEntry) {
    if (!canRestoreTrash) return;
    await runTrash(
      JSON.stringify(['restore', entry.trashId, entry.revision]),
      async (operationId, request) => {
        await adapter!.restoreTrash!({
          ...identity,
          trashId: entry.trashId,
          expectedRevision: entry.revision,
          expectedDestinationRevision: null,
          operationId,
        });
        if (request !== generation.current) return;
        await loadTrash(request);
        if (request !== generation.current) return;
        await refreshTree(entry.path);
        if (request === generation.current) await focusFile(entry.path);
      },
      `Restored ${entry.path}.`,
    );
  }

  async function emptyTrash() {
    const list = trashList;
    if (!canEmptyTrash || !list) return;
    await runTrash(
      JSON.stringify(['empty', list.revision]),
      async (operationId, request) => {
        await adapter!.emptyTrash!({
          ...identity,
          expectedRevision: list.revision,
          operationId,
        });
        if (request !== generation.current) return;
        setConfirmTrashEmpty(false);
        await loadTrash(request);
      },
      'Trash emptied permanently. Immutable artifacts and history are retained.',
    );
  }
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
    showGarbageDialog,
  };
}

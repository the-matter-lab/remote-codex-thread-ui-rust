import { useLayoutEffect, useRef, useState } from 'react';

import type {
  ThreadWorkspaceAdapter,
  ThreadWorkspaceFilePreview,
} from '../../../adapters';
import {
  IMAGE_EXTENSIONS,
  MOLECULAR_EXTENSIONS,
  PDF_EXTENSIONS,
  extensionOf,
} from '../workspaceTree';
import type { WorkspaceTreeNode } from '../workspaceTree';
import type { WorkspaceExplorerIdentity } from './useWorkspaceExplorerPersistence';

import { isBinaryPreview, isDownloadOnlyPath } from './filePreviewPolicy';

const PREVIEW_CHUNK_BYTES = 24_000;
const MAX_MOLECULAR_PREVIEW_BYTES = 10 * 1024 * 1024;

export function useWorkspaceFilePreview({
  activeNode,
  adapter,
  identity,
  onError,
  refreshTree,
}: {
  activeNode: WorkspaceTreeNode | null;
  adapter?: ThreadWorkspaceAdapter | null;
  identity: WorkspaceExplorerIdentity;
  onError: (error: string | null) => void;
  refreshTree: (preferredPath?: string | null) => Promise<void>;
}) {
  const generation = useRef(0);
  const loadingMoreRef = useRef(false);
  const [previewFile, setPreviewFile] =
    useState<ThreadWorkspaceFilePreview | null>(null);
  const [downloadOnly, setDownloadOnly] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  useLayoutEffect(() => {
    ++generation.current;
    loadingMoreRef.current = false;
    setLoadingMore(false);
    const selectedPath = activeNode?.kind === 'file' ? activeNode.path : null;
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
          path: currentPath,
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
          limit: PREVIEW_CHUNK_BYTES,
        });
        // Molecular parsers need complete frames, not a partial text preview.
        if (MOLECULAR_EXTENSIONS.has(extension)) {
          while (!cancelled) {
            if (
              file.size > MAX_MOLECULAR_PREVIEW_BYTES ||
              (file.truncated && file.nextOffset >= MAX_MOLECULAR_PREVIEW_BYTES)
            ) {
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
                MAX_MOLECULAR_PREVIEW_BYTES - file.nextOffset,
              ),
            });
            if (chunk.nextOffset <= file.nextOffset) {
              throw new Error(
                'Unable to load the complete molecular file: the read made no progress.',
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
            error instanceof Error ? error.message : 'Failed to read file',
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
    onError,
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
        limit: PREVIEW_CHUNK_BYTES,
      });
      if (request !== generation.current) return;
      if (chunk.nextOffset <= file.nextOffset && chunk.truncated)
        throw new Error(
          'Unable to load more: the read made no progress. Download the file or reopen it.',
        );
      setPreviewFile((current) =>
        current?.path === file.path && current.nextOffset === file.nextOffset
          ? { ...chunk, content: current.content + chunk.content }
          : current,
      );
    } catch (error) {
      if (request === generation.current)
        onError(
          error instanceof Error
            ? error.message
            : 'Failed to load more. Reopen or download the file.',
        );
    } finally {
      if (request === generation.current) {
        loadingMoreRef.current = false;
        setLoadingMore(false);
      }
    }
  }

  async function saveFile(input: { path: string; content: string }) {
    if (!adapter?.writeFile)
      throw new Error('Editing is unavailable for this connection.');
    const request = generation.current;
    onError(null);
    await adapter.writeFile({ ...identity, ...input });
    if (request !== generation.current) return;
    await refreshTree(input.path);
    if (request !== generation.current) return;
    const file = await adapter.readFile({
      ...identity,
      path: input.path,
      limit: PREVIEW_CHUNK_BYTES,
    });
    if (request === generation.current) setPreviewFile(file);
  }

  async function reloadFile() {
    if (!adapter || activeNode?.kind !== 'file') return;
    const request = generation.current;
    onError(null);
    try {
      const file = await adapter.readFile({
        ...identity,
        path: activeNode.path,
        limit: PREVIEW_CHUNK_BYTES,
      });
      if (request === generation.current) setPreviewFile(file);
    } catch (error) {
      if (request === generation.current)
        onError(
          error instanceof Error ? error.message : 'Failed to reload file.',
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
    reloadFile,
  };
}

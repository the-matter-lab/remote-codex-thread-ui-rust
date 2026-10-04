import { useCallback, useRef, type MutableRefObject } from 'react';

import type { PromptAttachmentKindDto } from '@remote-codex/shared';

import {
  buildAttachmentInsertionDraft,
  classifyAttachmentKind,
  type ComposerAttachmentDraft,
  type ComposerDraft,
  type PromptSelectionRange,
} from './composerUtils';

type DraftUpdater = (update: (current: ComposerDraft) => ComposerDraft) => void;

export interface UseComposerAttachmentsInput {
  prompt: string;
  attachments: ComposerAttachmentDraft[];
  updateDraft: DraftUpdater;
  getSelection: () => PromptSelectionRange | null;
  selectionSnapshotRef: MutableRefObject<PromptSelectionRange | null>;
  pendingSelectionRef: MutableRefObject<PromptSelectionRange | null>;
  pendingInsertedAttachmentIdsRef: MutableRefObject<string[]>;
  onInserted?: () => void;
  onRejected?: (message: string) => void;
  attachmentCapabilities?: { files: boolean; images: boolean };
  buildClientId?: () => string;
}

function defaultBuildClientId() {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID();
  }

  return `attachment-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function isImageAttachment(file: File) {
  return (
    classifyAttachmentKind(file) === 'photo' ||
    /\.(png|jpe?g|gif|webp|svg|avif|bmp|heic|heif|tiff?)$/i.test(file.name)
  );
}

export function orderDroppedAttachmentFiles(files: File[]) {
  return [
    ...files.filter((file) => classifyAttachmentKind(file) === 'photo'),
    ...files.filter((file) => classifyAttachmentKind(file) === 'file'),
  ];
}

export function useComposerAttachments({
  prompt,
  attachments,
  updateDraft,
  getSelection,
  selectionSnapshotRef,
  pendingSelectionRef,
  pendingInsertedAttachmentIdsRef,
  onInserted,
  onRejected,
  attachmentCapabilities,
  buildClientId = defaultBuildClientId,
}: UseComposerAttachmentsInput) {
  const capabilitiesRef = useRef(attachmentCapabilities);
  capabilitiesRef.current = attachmentCapabilities;
  const applyFiles = useCallback(
    (files: File[], kindForFile: (file: File) => PromptAttachmentKindDto) => {
      const capabilities = capabilitiesRef.current;
      const originalKindForFile = kindForFile;
      const admitted = capabilities
        ? files.filter((file) => {
            const image = isImageAttachment(file);
            return image
              ? capabilities.images
              : originalKindForFile(file) !== 'photo' && capabilities.files;
          })
        : files;
      const rejected = admitted.length !== files.length;
      const rejectionMessage =
        'Some attachments were not added. Image or file attachments are unavailable for the selected model or connection.';
      files = admitted;
      if (capabilities)
        kindForFile = (file) => (isImageAttachment(file) ? 'photo' : 'file');
      if (files.length === 0) {
        if (rejected) onRejected?.(rejectionMessage);
        return false;
      }

      const insertion = buildAttachmentInsertionDraft({
        prompt,
        attachments,
        files,
        selection: getSelection() ?? selectionSnapshotRef.current,
        kindForFile,
        buildClientId,
      });

      updateDraft(() => insertion.draft);
      pendingSelectionRef.current = insertion.selection;
      selectionSnapshotRef.current = insertion.selection;
      pendingInsertedAttachmentIdsRef.current = insertion.insertedAttachmentIds;
      onInserted?.();
      if (rejected) onRejected?.(rejectionMessage);
      return true;
    },
    [
      attachments,
      buildClientId,
      getSelection,
      onInserted,
      onRejected,
      pendingInsertedAttachmentIdsRef,
      pendingSelectionRef,
      prompt,
      selectionSnapshotRef,
      updateDraft,
    ],
  );

  const appendAttachments = useCallback(
    (files: FileList | null, kind: PromptAttachmentKindDto) => {
      if (!files || files.length === 0) {
        return false;
      }

      return applyFiles(Array.from(files), () => kind);
    },
    [applyFiles],
  );

  const appendDroppedAttachments = useCallback(
    (files: File[]) =>
      applyFiles(orderDroppedAttachmentFiles(files), classifyAttachmentKind),
    [applyFiles],
  );

  return {
    appendAttachments,
    appendDroppedAttachments,
  };
}

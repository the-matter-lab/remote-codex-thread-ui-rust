import type { ChangeEvent, RefObject } from 'react';

import type { PromptAttachmentKindDto } from '@remote-codex/shared';

export function ComposerHiddenAttachmentInputs({
  attachmentCapabilities,
  photoInputRef,
  fileInputRef,
  onAppendAttachments,
}: {
  attachmentCapabilities?: { files: boolean; images: boolean } | undefined;
  photoInputRef: RefObject<HTMLInputElement | null>;
  fileInputRef: RefObject<HTMLInputElement | null>;
  onAppendAttachments: (
    files: FileList | null,
    kind: PromptAttachmentKindDto,
  ) => void;
}) {
  function handleInputChange(
    event: ChangeEvent<HTMLInputElement>,
    kind: PromptAttachmentKindDto,
  ) {
    onAppendAttachments(event.target.files, kind);
    event.target.value = '';
  }

  return (
    <>
      <input
        ref={photoInputRef}
        disabled={
          attachmentCapabilities ? !attachmentCapabilities.images : false
        }
        type="file"
        accept="image/*"
        multiple
        tabIndex={-1}
        className="sr-only"
        onChange={(event) => handleInputChange(event, 'photo')}
      />
      <input
        ref={fileInputRef}
        disabled={
          attachmentCapabilities ? !attachmentCapabilities.files : false
        }
        type="file"
        multiple
        tabIndex={-1}
        className="sr-only"
        onChange={(event) => handleInputChange(event, 'file')}
      />
    </>
  );
}

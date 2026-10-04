// @vitest-environment jsdom
import { act, useState } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ThreadComposer, type ThreadComposerProps } from './ThreadComposer';
import type { PromptAttachmentUpload } from '../types';

let root: Root, host: HTMLDivElement;
let draft: { prompt: string; attachments: PromptAttachmentUpload[] };
const submit = vi.fn();
function Harness({
  caps,
  initial,
  picker,
}: {
  caps?: ThreadComposerProps['attachmentCapabilities'];
  initial?: { prompt: string; attachments: PromptAttachmentUpload[] };
  picker?: ThreadComposerProps['onPickAttachment'];
}) {
  const [value, setValue] = useState(
    initial ?? { prompt: '', attachments: [] },
  );
  draft = value;
  return (
    <ThreadComposer
      activeView="chat"
      onSubmit={submit}
      attachmentCapabilities={caps}
      onPickAttachment={picker}
      draftPrompt={value.prompt}
      draftAttachments={value.attachments}
      onDraftChange={setValue}
    />
  );
}
async function render(
  caps?: ThreadComposerProps['attachmentCapabilities'],
  initial?: { prompt: string; attachments: PromptAttachmentUpload[] },
  picker?: ThreadComposerProps['onPickAttachment'],
) {
  await act(async () =>
    root.render(<Harness caps={caps} initial={initial} picker={picker} />),
  );
}
function image(type = 'image/png') {
  return new File(['image'], 'image.png', { type });
}
function text() {
  return new File(['text'], 'notes.txt', { type: 'text/plain' });
}
async function transfer(kind: 'paste' | 'drop', files: File[]) {
  const event = new Event(kind, { bubbles: true, cancelable: true });
  Object.defineProperty(
    event,
    kind === 'paste' ? 'clipboardData' : 'dataTransfer',
    { value: { files, items: [], getData: () => '' } },
  );
  await act(async () =>
    host.querySelector('[contenteditable="true"]')?.dispatchEvent(event),
  );
  return event;
}
async function chooseFile(index: number, files: File[]) {
  const input =
    host.querySelectorAll<HTMLInputElement>('input[type="file"]')[index];
  Object.defineProperty(input, 'files', { configurable: true, value: files });
  await act(async () =>
    input.dispatchEvent(new Event('change', { bubbles: true })),
  );
}
beforeEach(() => {
  (
    globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  host = document.createElement('div');
  document.body.append(host);
  root = createRoot(host);
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    value: vi.fn(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  });
  URL.createObjectURL = vi.fn(() => 'blob:preview');
  URL.revokeObjectURL = vi.fn();
  submit.mockReset();
});
afterEach(() => {
  act(() => root.unmount());
  host.remove();
  vi.restoreAllMocks();
});

describe('composer attachment capability admission', () => {
  it('omission preserves the generic photo and file menu', async () => {
    await render();
    await act(async () =>
      host
        .querySelector<HTMLButtonElement>('[aria-label="Add attachment"]')
        ?.click(),
    );
    expect(document.body.textContent).toContain('Photo');
    expect(document.body.textContent).toContain('File');
    await transfer('paste', [image()]);
    expect(draft.attachments[0]?.kind).toBe('photo');
  });
  it.each([
    { files: true, images: false },
    { files: false, images: true },
    { files: false, images: false },
  ])('gates menu and hidden inputs for %j', async (caps) => {
    await render(caps);
    const add = host.querySelector<HTMLButtonElement>(
      '[aria-label="Add attachment"]',
    );
    expect(Boolean(add)).toBe(caps.files || caps.images);
    await act(async () => add?.click());
    const labels = [...document.querySelectorAll('button')].map((button) =>
      button.textContent?.trim(),
    );
    expect(labels.includes('Photo')).toBe(caps.images);
    expect(labels.includes('File')).toBe(caps.files);
    const inputs =
      host.querySelectorAll<HTMLInputElement>('input[type="file"]');
    expect(inputs[0].disabled).toBe(!caps.images);
    expect(inputs[1].disabled).toBe(!caps.files);
  });
  it.each(['paste', 'drop'] as const)(
    'rejects image %s visibly while admitting ordinary files',
    async (kind) => {
      await render({ files: true, images: false });
      const event = await transfer(kind, [image(), text()]);
      expect(event.defaultPrevented).toBe(true);
      expect(draft.attachments.map((value) => value.originalName)).toEqual([
        'notes.txt',
      ]);
      expect(host.querySelector('[role="alert"]')?.textContent).toContain(
        'unavailable',
      );
    },
  );
  it('does not admit disabled images through the ordinary file picker or an empty MIME', async () => {
    await render({ files: true, images: false });
    await chooseFile(1, [image(), image('')]);
    expect(draft.attachments).toEqual([]);
    expect(host.querySelector('[role="alert"]')).not.toBeNull();
  });
  it('admits only photos when ordinary files are disabled', async () => {
    await render({ files: false, images: true });
    await transfer('drop', [text(), image()]);
    expect(draft.attachments.map((value) => value.kind)).toEqual(['photo']);
    expect(host.querySelector('[role="alert"]')).not.toBeNull();
  });
  it('keeps existing photo previews and removal after the model disables images', async () => {
    const photo: PromptAttachmentUpload = {
      clientId: 'old',
      kind: 'photo',
      originalName: 'image.png',
      placeholder: '[PHOTO image.png]',
      file: image(),
    };
    await render(
      { files: true, images: true },
      { prompt: photo.placeholder, attachments: [photo] },
    );
    await render({ files: true, images: false });
    expect(draft.attachments).toEqual([photo]);
    expect(host.querySelector('img')?.getAttribute('src')).toBe('blob:preview');
    const editor = host.querySelector<HTMLElement>('[contenteditable="true"]')!;
    vi.useFakeTimers();
    await act(async () => {
      editor.replaceChildren();
      editor.dispatchEvent(new Event('input', { bubbles: true }));
    });
    await act(async () => {
      vi.runOnlyPendingTimers();
    });
    vi.useRealTimers();
    expect(draft.attachments).toEqual([]);
  });
  it('checks the current gate when a prior custom picker returns after model switch', async () => {
    let append!: (files: FileList | null) => boolean;
    const picker: ThreadComposerProps['onPickAttachment'] = (input) => {
      append = input.appendAttachments;
    };
    await render({ files: true, images: true }, undefined, picker);
    await act(async () =>
      host
        .querySelector<HTMLButtonElement>('[aria-label="Add attachment"]')
        ?.click(),
    );
    const photoButton = [
      ...document.querySelectorAll<HTMLButtonElement>('button'),
    ].find((button) => button.textContent === 'Photo');
    await act(async () => photoButton?.click());
    expect(append).toBeTypeOf('function');
    await render({ files: true, images: false }, undefined, picker);
    await act(async () =>
      expect(append([image()] as unknown as FileList)).toBe(false),
    );
    expect(draft.attachments).toEqual([]);
    expect(host.querySelector('[role="alert"]')).not.toBeNull();
  });
});

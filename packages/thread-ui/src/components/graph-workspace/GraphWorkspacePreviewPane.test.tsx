// @vitest-environment jsdom

import { act, type ReactNode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { createDefaultPluginContextValue } from '../../plugins/plugin-context';
import {
  GraphWorkspacePreviewPane,
  resolveWorkspaceMarkdownPath,
} from './GraphWorkspacePreviewPane';
import type { WorkspaceTreeNode } from './workspaceTree';

vi.mock('../graph-chat/graphChatShiki', () => ({
  getGraphChatHighlighter: () => new Promise(() => undefined),
}));

let root: Root | null = null;
let container: HTMLDivElement | null = null;

function render(node: ReactNode) {
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
  act(() => {
    root?.render(node);
  });
  return container;
}

afterEach(() => {
  if (root) {
    act(() => {
      root?.unmount();
    });
  }
  root = null;
  container?.remove();
  container = null;
  document.body.style.overflow = '';
});

describe('resolveWorkspaceMarkdownPath', () => {
  it('resolves relative, parent, and workspace-absolute resources', () => {
    expect(
      resolveWorkspaceMarkdownPath({
        markdownPath: 'docs/guides/setup.md',
        resourceUrl: './images/flow chart.png?raw=1',
      }),
    ).toBe('docs/guides/images/flow chart.png');
    expect(
      resolveWorkspaceMarkdownPath({
        markdownPath: '/home/u/treer/docs/guides/setup.md',
        resourceUrl: '../assets/diagram.png',
        workspaceRootPath: '/home/u/treer',
      }),
    ).toBe('docs/assets/diagram.png');
    expect(
      resolveWorkspaceMarkdownPath({
        markdownPath: 'docs/guides/setup.md',
        resourceUrl: '/home/u/treer/screenshots/result.png',
        workspaceRootPath: '/home/u/treer',
      }),
    ).toBe('screenshots/result.png');
  });

  it('keeps external URLs outside the workspace adapter', () => {
    expect(
      resolveWorkspaceMarkdownPath({
        markdownPath: 'docs/setup.md',
        resourceUrl: 'https://example.com/image.png',
      }),
    ).toBeNull();
    expect(
      resolveWorkspaceMarkdownPath({
        markdownPath: 'README.md',
        resourceUrl: '../outside.png',
      }),
    ).toBeNull();
    expect(
      resolveWorkspaceMarkdownPath({
        markdownPath: '/home/u/treer/docs/setup.md',
        resourceUrl: '/etc/passwd',
        workspaceRootPath: '/home/u/treer',
      }),
    ).toBeNull();
    expect(
      resolveWorkspaceMarkdownPath({
        markdownPath: '/tmp/outside.md',
        resourceUrl: './image.png',
        workspaceRootPath: '/home/u/treer',
      }),
    ).toBeNull();
  });

  it('resolves complete same-origin workspace URLs', () => {
    expect(
      resolveWorkspaceMarkdownPath({
        markdownPath: 'docs/setup.md',
        resourceUrl: `${window.location.origin}/home/u/treer/assets/relay.png`,
        workspaceRootPath: '/home/u/treer',
      }),
    ).toBe('assets/relay.png');
  });
});

describe('GraphWorkspacePreviewPane', () => {
  const markdownNode: WorkspaceTreeNode = {
    id: 'workspace:docs/architecture.md',
    name: 'architecture.md',
    path: '/home/u/treer/docs/architecture.md',
    kind: 'file',
    children: [],
  };

  it('shows recoverable save conflicts while preserving the draft', async () => {
    (
      globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }
    ).IS_REACT_ACT_ENVIRONMENT = true;
    const save = vi.fn(async () => {
      throw new Error('FILE_CONFLICT: reopen the file.');
    });
    const reload = vi.fn();
    const element = render(
      <GraphWorkspacePreviewPane
        plugins={createDefaultPluginContextValue()}
        selectedTarget={{ kind: 'workspace-file', node: markdownNode }}
        onSaveFile={save}
        onReloadFile={reload}
        previewFile={{
          path: markdownNode.path,
          name: markdownNode.name,
          content: 'original',
          language: 'markdown',
          size: 8,
          truncated: false,
          nextOffset: 8,
        }}
      />,
    );
    await act(async () =>
      element
        .querySelector<HTMLButtonElement>('[aria-label="Edit file"]')
        ?.click(),
    );
    const editor = element.querySelector<HTMLTextAreaElement>(
      '[aria-label="Workspace file editor"]',
    );
    await act(async () => {
      Object.getOwnPropertyDescriptor(
        HTMLTextAreaElement.prototype,
        'value',
      )?.set?.call(editor, 'my unsaved draft');
      editor?.dispatchEvent(new Event('input', { bubbles: true }));
    });
    await act(async () =>
      element
        .querySelector<HTMLButtonElement>('[aria-label="Save file"]')
        ?.click(),
    );
    expect(save).toHaveBeenCalledWith({
      path: markdownNode.path,
      content: 'my unsaved draft',
    });
    expect(element.querySelector('[role="alert"]')?.textContent).toContain(
      'FILE_CONFLICT',
    );
    expect(editor?.value).toBe('my unsaved draft');
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(false);
    const reloadButton = [
      ...element.querySelectorAll<HTMLButtonElement>('button'),
    ].find((button) => button.textContent === 'Reload latest file');
    await act(async () => reloadButton?.click());
    expect(reload).not.toHaveBeenCalled();
    confirm.mockReturnValue(true);
    await act(async () => reloadButton?.click());
    expect(reload).toHaveBeenCalledTimes(1);
    confirm.mockRestore();
  });

  it('preserves unsaved drafts when selecting another file tab', async () => {
    const first = {
      path: markdownNode.path,
      name: markdownNode.name,
      content: 'original',
      language: 'markdown',
      size: 8,
      truncated: false,
      nextOffset: 8,
    };
    const second = {
      ...first,
      path: 'other.md',
      name: 'other.md',
      content: 'other',
    };
    const tabs = [
      { path: first.path, name: first.name, pinned: true },
      { path: second.path, name: second.name, pinned: true },
    ];
    const pane = (file: typeof first) => (
      <GraphWorkspacePreviewPane
        plugins={createDefaultPluginContextValue()}
        selectedTarget={{
          kind: 'workspace-file',
          node: { ...markdownNode, path: file.path, name: file.name },
        }}
        previewFile={file}
        fileTabs={tabs}
        onCloseFileTab={vi.fn()}
        onSelectFileTab={vi.fn()}
        onSaveFile={vi.fn()}
      />
    );
    const element = render(pane(first));
    await act(async () =>
      element
        .querySelector<HTMLButtonElement>('[aria-label="Edit file"]')
        ?.click(),
    );
    const editor = element.querySelector<HTMLTextAreaElement>(
      '[aria-label="Workspace file editor"]',
    );
    await act(async () => {
      Object.getOwnPropertyDescriptor(
        HTMLTextAreaElement.prototype,
        'value',
      )?.set?.call(editor, 'retained draft');
      editor?.dispatchEvent(new Event('input', { bubbles: true }));
    });
    await act(async () => root?.render(pane(second)));
    expect(
      element.querySelector('[aria-label="Workspace file editor"]'),
    ).toBeNull();
    await act(async () => root?.render(pane(first)));
    expect(
      element.querySelector<HTMLTextAreaElement>(
        '[aria-label="Workspace file editor"]',
      )?.value,
    ).toBe('retained draft');
  });

  it.each(['throw', 'reject'])(
    'reports complete-file download %s errors',
    async (failure) => {
      const download = () => {
        if (failure === 'throw') throw new Error('Download unavailable');
        return Promise.reject(new Error('Download unavailable'));
      };
      const element = render(
        <GraphWorkspacePreviewPane
          plugins={createDefaultPluginContextValue()}
          selectedTarget={{ kind: 'workspace-file', node: markdownNode }}
          onDownloadFile={download}
          previewFile={{
            path: markdownNode.path,
            name: markdownNode.name,
            content: 'text',
            language: 'markdown',
            size: 4,
            truncated: false,
            nextOffset: 4,
          }}
        />,
      );
      await act(async () =>
        element
          .querySelector<HTMLButtonElement>(
            '[aria-label="Download architecture.md"]',
          )
          ?.click(),
      );
      expect(element.querySelector('[role="alert"]')?.textContent).toContain(
        'Download unavailable',
      );
    },
  );

  it('explains preview and edit limits and provides load-more/download controls', () => {
    const element = render(
      <GraphWorkspacePreviewPane
        plugins={createDefaultPluginContextValue()}
        selectedTarget={{ kind: 'workspace-file', node: markdownNode }}
        onSaveFile={vi.fn()}
        onLoadMore={vi.fn()}
        onDownloadFile={vi.fn()}
        previewFile={{
          path: markdownNode.path,
          name: markdownNode.name,
          content: 'partial',
          language: 'markdown',
          size: 100000,
          truncated: true,
          nextOffset: 24000,
        }}
      />,
    );
    expect(element.textContent).toContain('50 KiB and 1,000 lines');
    expect(element.textContent).toContain('24,000-byte chunks');
    expect(element.querySelector('[aria-label="Edit file"]')).toBeNull();
    expect(
      element.querySelector('[aria-label="Load more workspace preview"]'),
    ).not.toBeNull();
    expect(
      element.querySelector('[aria-label="Download architecture.md"]'),
    ).not.toBeNull();
  });

  it('renders untrusted HTML as text and blocks local resources outside the workspace', () => {
    const element = render(
      <GraphWorkspacePreviewPane
        plugins={createDefaultPluginContextValue()}
        selectedTarget={{ kind: 'workspace-file', node: markdownNode }}
        workspaceRootPath="/home/u/treer"
        resolveWorkspaceFileUrl={vi.fn((path) => `/files?path=${path}`)}
        onOpenWorkspaceFile={vi.fn()}
        previewFile={{
          path: markdownNode.path,
          name: markdownNode.name,
          content:
            '<script>alert(1)</script>\n\n[Outside](/etc/passwd)\n\n![Outside](/etc/password.png)',
          language: 'markdown',
          size: 80,
          truncated: false,
          nextOffset: 80,
        }}
      />,
    );
    expect(element.querySelector('script')).toBeNull();
    expect(element.querySelector('a[href="/etc/passwd"]')).toBeNull();
    expect(element.querySelector('img')).toBeNull();
  });

  it('keeps the native PDF preview URL and suppresses referrers', () => {
    const element = render(
      <GraphWorkspacePreviewPane
        plugins={createDefaultPluginContextValue()}
        selectedTarget={{
          kind: 'workspace-file',
          node: { ...markdownNode, name: 'report.pdf', path: 'report.pdf' },
        }}
        pdfUrl="/files/report.pdf"
      />,
    );
    expect(element.querySelector('iframe')?.getAttribute('src')).toBe('/files/report.pdf');
    expect(element.querySelector('iframe')?.hasAttribute('sandbox')).toBe(false);
    expect(
      element.querySelector('iframe')?.getAttribute('referrerpolicy'),
    ).toBe('no-referrer');
  });

  it('renders Markdown by default and resolves workspace images through the adapter', () => {
    const resolveWorkspaceFileUrl = vi.fn(
      (path: string) => `/relay/files/raw?path=${encodeURIComponent(path)}`,
    );
    const onOpenWorkspaceFile = vi.fn();
    const element = render(
      <GraphWorkspacePreviewPane
        plugins={createDefaultPluginContextValue()}
        selectedTarget={{ kind: 'workspace-file', node: markdownNode }}
        previewFile={{
          path: markdownNode.path,
          name: markdownNode.name,
          content:
            '# Architecture\n\n![Diagram](../assets/system.png)\n\n[Details](./details.md)',
          language: 'markdown',
          size: 96,
          truncated: false,
          nextOffset: 96,
        }}
        resolveWorkspaceFileUrl={resolveWorkspaceFileUrl}
        onOpenWorkspaceFile={onOpenWorkspaceFile}
        workspaceRootPath="/home/u/treer"
      />,
    );

    expect(element.querySelector('h1')?.textContent).toBe('Architecture');
    expect(element.querySelector('img')?.getAttribute('src')).toBe(
      '/relay/files/raw?path=assets%2Fsystem.png',
    );
    expect(resolveWorkspaceFileUrl).toHaveBeenCalledWith('assets/system.png');
    expect(element.querySelector('[aria-label="Source code"]')).toBeNull();

    act(() => {
      element
        .querySelector<HTMLButtonElement>(
          '[aria-label="Open image preview: Diagram"]',
        )
        ?.click();
    });
    const dialog = document.body.querySelector<HTMLElement>('[role="dialog"]');
    expect(dialog?.getAttribute('aria-label')).toBe('Image preview: Diagram');
    expect(dialog?.querySelector('img')?.getAttribute('src')).toBe(
      '/relay/files/raw?path=assets%2Fsystem.png',
    );

    act(() => {
      dialog
        ?.querySelector<HTMLElement>('.thread-graph-image-lightbox-viewport')
        ?.dispatchEvent(
          new WheelEvent('wheel', {
            bubbles: true,
            cancelable: true,
            clientX: 320,
            clientY: 240,
            deltaY: -100,
          }),
        );
    });
    expect(document.body.textContent).toContain('125%');
    expect(dialog?.querySelector('img')?.style.transform).toContain(
      'translate3d(-80px, -60px, 0) scale(1.25)',
    );

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    expect(document.body.querySelector('[role="dialog"]')).toBeNull();

    act(() => {
      element
        .querySelector<HTMLAnchorElement>('a')
        ?.dispatchEvent(
          new MouseEvent('click', { bubbles: true, cancelable: true }),
        );
    });
    expect(onOpenWorkspaceFile).toHaveBeenCalledWith('docs/details.md');
  });

  it('opens direct image files in the same lightbox and closes from the toolbar', () => {
    const imageNode: WorkspaceTreeNode = {
      id: 'workspace:images/diagram.png',
      name: 'diagram.png',
      path: '/home/u/treer/images/diagram.png',
      kind: 'file',
      children: [],
    };
    const element = render(
      <GraphWorkspacePreviewPane
        plugins={createDefaultPluginContextValue()}
        selectedTarget={{ kind: 'workspace-file', node: imageNode }}
        imageUrl="/relay/files/raw?path=images%2Fdiagram.png"
      />,
    );

    act(() => {
      element
        .querySelector<HTMLButtonElement>(
          '[aria-label="Open image preview: /home/u/treer/images/diagram.png"]',
        )
        ?.click();
    });
    expect(document.body.querySelector('[role="dialog"]')).toBeTruthy();

    act(() => {
      document.body
        .querySelector<HTMLButtonElement>('[aria-label="Close image preview"]')
        ?.click();
    });
    expect(document.body.querySelector('[role="dialog"]')).toBeNull();
  });

  it('switches Markdown to highlighted source with line numbers', () => {
    const element = render(
      <GraphWorkspacePreviewPane
        plugins={createDefaultPluginContextValue()}
        selectedTarget={{ kind: 'workspace-file', node: markdownNode }}
        focusLine={3}
        previewFile={{
          path: markdownNode.path,
          name: markdownNode.name,
          content: '# Architecture\n\nText',
          language: 'markdown',
          size: 20,
          truncated: false,
          nextOffset: 20,
        }}
      />,
    );

    const sourceButton = element.querySelector<HTMLButtonElement>(
      '[aria-label="Markdown source"]',
    );
    act(() => {
      sourceButton?.click();
    });

    expect(element.querySelector('[aria-label="Source code"]')).toBeTruthy();
    expect(
      [...element.querySelectorAll('.thread-graph-code-line-number')].map(
        (line) => line.textContent,
      ),
    ).toEqual(['1', '2', '3']);
    expect(
      element
        .querySelector('[data-line="3"]')
        ?.classList.contains('is-focused-line'),
    ).toBe(true);
  });
});

it('resolves Windows Markdown resources with case-insensitive roots and browser drive prefixes', () => {
  for (const resourceUrl of [
    'C:/WORK/demo/assets/a.png',
    '/C:/Work/demo/assets/a.png',
    'file:///C:/work/demo/assets/a.png',
    `${window.location.origin}/C%3A/Work/demo/assets/a.png`,
    '../assets/a.png',
  ]) {
    expect(
      resolveWorkspaceMarkdownPath({
        markdownPath: 'C:\\Work\\demo\\docs\\readme.md',
        resourceUrl,
        workspaceRootPath: 'c:\\work\\demo',
      }),
    ).toBe('assets/a.png');
  }
});

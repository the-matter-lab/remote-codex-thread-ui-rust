import { externalLinkProps } from '../externalLinkProps';
import { WorkspaceFileLink } from '../WorkspaceFileLink';
import { ZoomableImage as GraphWorkspaceZoomableImage } from '../ZoomableImage';
import {
  lazy,
  memo,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  BookOpen,
  ChevronRight,
  Code2,
  Download,
  Pencil,
  PanelLeftOpen,
  PanelRightClose,
  Save,
  X,
} from 'lucide-react';
import ReactMarkdown, { defaultUrlTransform } from 'react-markdown';
import { localFileHref, relativeWorkspacePath, normalizeFileSystemPath } from '../workspacePaths';
import remarkGfm from 'remark-gfm';
import type { HighlighterCore } from 'shiki/core';

import type { ThreadWorkspaceFilePreview } from '../../adapters';
import type { PluginContextValue } from '../../plugins/plugin-context';
import { getGraphChatHighlighter } from '../graph-chat/graphChatShiki';
import {
  MOLECULAR_EXTENSIONS,
  buildMoleculePreviewSnapshot,
  extensionOf,
  languageForPath,
  type WorkspaceTreeNode,
} from './workspaceTree';
import { WorkspaceInfoCard } from './GraphWorkspaceCards';
import { GraphMoleculeViewer } from './GraphMoleculeViewer';
import {
  WorkspaceFileTabs,
  type WorkspaceFileTab,
} from './WorkspaceFileTabs';

const GraphWorkspaceMonacoEditor = lazy(
  () => import('./GraphWorkspaceMonacoEditor'),
);

export type GraphWorkspacePreviewTarget =
  | { kind: 'live-molecule'; node: WorkspaceTreeNode }
  | { kind: 'workspace-file'; node: WorkspaceTreeNode }
  | { kind: 'artifact'; node: WorkspaceTreeNode }
  | { kind: 'event'; node: WorkspaceTreeNode }
  | { kind: 'meta'; node: WorkspaceTreeNode }
  | null;

function DownloadFilePreview({ node, onDownload }: {
  node: WorkspaceTreeNode;
  onDownload?: () => Promise<void> | void;
}) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const size = node.size;
  const sizeLabel = size === undefined ? null : size < 1024 ? `${size} B`
    : size < 1024 * 1024 ? `${(size / 1024).toFixed(1)} KB`
    : `${(size / (1024 * 1024)).toFixed(1)} MB`;
  return (
    <div className="thread-graph-download-preview">
      <Download aria-hidden="true" className="thread-graph-download-preview-icon" />
      <strong>{node.name}</strong>
      {sizeLabel ? <span>{sizeLabel}</span> : null}
      <p>This file is available to download.</p>
      {onDownload ? (
        <button type="button" disabled={pending} aria-label={`Download ${node.name}`}
          onClick={async () => {
            setPending(true);
            setError(null);
            try { await onDownload(); }
            catch (caught) { setError(caught instanceof Error ? caught.message : 'Download failed. Please try again.'); }
            finally { setPending(false); }
          }}>
          <Download aria-hidden="true" size={16} />
          {pending ? 'Downloading…' : 'Download file'}
        </button>
      ) : <span>Downloads are unavailable for this connection.</span>}
      {error ? <p role="alert">{error}</p> : null}
    </div>
  );
}

const SMALL_TEXT_FILE_MAX_BYTES = 50 * 1024;
const SMALL_TEXT_FILE_MAX_LINES = 1000;
const MARKDOWN_EXTENSIONS = new Set(['md', 'markdown']);
const CODE_LANGUAGE_ALIASES: Record<string, string> = {
  cs: 'csharp',
  jsonl: 'json',
  md: 'markdown',
  rb: 'ruby',
  rs: 'rust',
  sh: 'bash',
  yml: 'yaml',
};

function transparentHighlightBackground(html: string) {
  return html
    .replace(/background-color:[^;"]+;?/g, 'background-color: transparent;')
    .replace(/background:[^;"]+;?/g, 'background: transparent;');
}

export function resolveWorkspaceMarkdownPath({ markdownPath, resourceUrl, workspaceRootPath = '' }: {
  markdownPath: string; resourceUrl: string; workspaceRootPath?: string;
}) {
  const raw = localFileHref(resourceUrl, typeof window === 'undefined' ? undefined : window.location.origin);
  if (!raw) return null;
  const path = raw.split('#')[0] ?? '';
  if (path.startsWith('/') || /^[a-z]:\//i.test(path)) {
    return workspaceRootPath ? relativeWorkspacePath(path, workspaceRootPath) : path.replace(/^\/+/, '');
  }
  const base = workspaceRootPath ? relativeWorkspacePath(markdownPath, workspaceRootPath) : normalizeFileSystemPath(markdownPath);
  if (base === null) return null;
  const directory = base.slice(0, Math.max(0, base.lastIndexOf('/')));
  return relativeWorkspacePath(directory ? `${directory}/${path}` : path, workspaceRootPath);
}

function isSmallEditableTextFile(file: ThreadWorkspaceFilePreview) {
  return (
    !file.truncated &&
    file.size <= SMALL_TEXT_FILE_MAX_BYTES &&
    file.content.split('\n').length <= SMALL_TEXT_FILE_MAX_LINES
  );
}

function previewTargetTitle(target: GraphWorkspacePreviewTarget) {
  if (!target) {
    return null;
  }
  return target.node.path || target.node.name || null;
}

export function graphWorkspacePreviewTargetFromNode(
  node: WorkspaceTreeNode | null,
): GraphWorkspacePreviewTarget {
  if (!node) {
    return null;
  }

  switch (node.kind) {
    case 'live-artifact':
      return { kind: 'live-molecule', node };
    case 'file':
      return { kind: 'workspace-file', node };
    case 'artifact':
      return { kind: 'artifact', node };
    case 'event':
      return { kind: 'event', node };
    case 'meta':
      return { kind: 'meta', node };
    case 'directory':
      return null;
  }
}

const GraphWorkspaceCodePreview = memo(function GraphWorkspaceCodePreview({
  content,
  focusLine,
  language = 'text',
}: {
  content: string;
  focusLine?: number | null;
  language?: string;
}) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [highlighter, setHighlighter] = useState<HighlighterCore | null>(null);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    let alive = true;
    getGraphChatHighlighter()
      .then((loadedHighlighter) => {
        if (alive) {
          setHighlighter(loadedHighlighter);
        }
      })
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const shell = rootRef.current?.closest<HTMLElement>('.thread-ui-shell');
    const readDark = () =>
      shell
        ? shell.getAttribute('data-theme-effective') === 'dark' ||
          shell.classList.contains('dark') ||
          shell.classList.contains('thread-ui-theme-dark')
        : document.documentElement.classList.contains('dark');

    setDark(readDark());
    if (!shell) {
      return;
    }
    const observer = new MutationObserver(() => setDark(readDark()));
    observer.observe(shell, {
      attributes: true,
      attributeFilter: ['class', 'data-theme-effective'],
    });
    return () => observer.disconnect();
  }, []);

  const highlightedHtml = useMemo(() => {
    if (!highlighter) {
      return '';
    }
    const loadedLanguages = highlighter.getLoadedLanguages?.() ?? [];
    const normalizedLanguage = CODE_LANGUAGE_ALIASES[language] ?? language;
    const resolvedLanguage = loadedLanguages.includes(normalizedLanguage)
      ? normalizedLanguage
      : 'text';
    try {
      return transparentHighlightBackground(
        highlighter.codeToHtml(content, {
          lang: resolvedLanguage,
          theme: dark ? 'ayu-dark' : 'ayu-light',
        }),
      );
    } catch {
      return transparentHighlightBackground(
        highlighter.codeToHtml(content, {
          lang: 'text',
          theme: dark ? 'ayu-dark' : 'ayu-light',
        }),
      );
    }
  }, [content, dark, highlighter, language]);

  useEffect(() => {
    const root = rootRef.current;
    root
      ?.querySelectorAll('.is-focused-line')
      .forEach((element) => element.classList.remove('is-focused-line'));
    if (!root || !focusLine || focusLine < 1) {
      return;
    }
    const target =
      root.querySelector<HTMLElement>(`[data-line="${focusLine}"]`) ??
      root.querySelector<HTMLElement>(`.line:nth-child(${focusLine})`);
    target?.classList.add('is-focused-line');
    target?.scrollIntoView?.({ block: 'center' });
  }, [focusLine, highlightedHtml]);

  const lines = content.split('\n');
  return (
    <div
      ref={rootRef}
      className="thread-graph-code-preview min-h-0 flex-1 overflow-auto"
      role="region"
      aria-label="Source code"
    >
      {highlightedHtml ? (
        <div
          className="thread-graph-highlighted-code-preview"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      ) : (
        <pre className="thread-graph-plain-code-preview">
          <code>
            {lines.map((line, index) => (
              <span
                className={`thread-graph-code-line ${
                  focusLine === index + 1 ? 'is-focused-line' : ''
                }`}
                data-line={index + 1}
                key={index}
              >
                <span
                  className="thread-graph-code-line-number"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <span>{line || ' '}</span>
              </span>
            ))}
          </code>
        </pre>
      )}
    </div>
  );
});

const GraphWorkspaceMarkdownPreview = memo(
  function GraphWorkspaceMarkdownPreview({
    content,
    markdownPath,
    onOpenWorkspaceFile,
    resolveWorkspaceFileUrl,
    workspaceRootPath,
  }: {
    content: string;
    markdownPath: string;
    onOpenWorkspaceFile?: (path: string) => void;
    resolveWorkspaceFileUrl?: (path: string) => string | null;
    workspaceRootPath?: string;
  }) {
    const resolvePath = (resourceUrl: string | undefined) =>
      resourceUrl
        ? resolveWorkspaceMarkdownPath({
            markdownPath,
            resourceUrl,
            workspaceRootPath: workspaceRootPath ?? '',
          })
        : null;

    return (
      <div className="thread-graph-markdown thread-graph-markdown-preview min-h-0 flex-1 overflow-auto px-5 py-4 sm:px-7 sm:py-6">
        <ReactMarkdown
          urlTransform={url => localFileHref(url, typeof window === 'undefined' ? undefined : window.location.origin) ? url : defaultUrlTransform(url)}
          remarkPlugins={[remarkGfm]}
          components={{
            a({ href, children, ...props }) {
              const workspacePath = resolvePath(href);
              if (workspacePath && onOpenWorkspaceFile) {
                return (
                  <WorkspaceFileLink path={workspacePath} onOpen={({path})=>onOpenWorkspaceFile(path)}>{children}</WorkspaceFileLink>
                );
              }
              return (
                <a {...props} {...externalLinkProps(href)} href={href}>
                  {children}
                </a>
              );
            },
            img({ src, alt, ...props }) {
              const workspacePath = resolvePath(src);
              const resolvedSrc = workspacePath
                ? (resolveWorkspaceFileUrl?.(workspacePath) ?? src)
                : src;
              if (!resolvedSrc) {
                return null;
              }
              return (
                <GraphWorkspaceZoomableImage
                  src={resolvedSrc}
                  alt={alt ?? ''}
                  loading="lazy"
                  className={props.className}
                />
              );
            },
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  },
);

export function GraphWorkspacePreviewPane({
  activeFilePath,
  dirtyFilePaths = new Set(),
  error,
  fileTabs = [],
  focusLine,
  downloadOnly,
  onDownloadFile,
  imageUrl,
  loadingMore,
  onSaveFile,
  onCloseFileTab,
  onDirtyChange,
  onExpandExplorer,
  onOpenWorkspaceFile,
  onLoadMore,
  onSelectFileTab,
  onCollapse,
  pdfUrl,
  previewFile,
  previewLoading,
  plugins,
  resolveWorkspaceFileUrl,
  selectedTarget,
  workspaceRootPath,
}: {
  activeFilePath?: string | null;
  dirtyFilePaths?: ReadonlySet<string>;
  error?: string | null;
  fileTabs?: WorkspaceFileTab[];
  focusLine?: number | null;
  downloadOnly?: boolean;
  onDownloadFile?: () => Promise<void> | void;
  imageUrl?: string | null;
  loadingMore?: boolean;
  onSaveFile?: (input: {
    path: string;
    content: string;
  }) => Promise<void> | void;
  onCloseFileTab?: (path: string) => void;
  onDirtyChange?: (path: string, dirty: boolean) => void;
  onExpandExplorer?: () => void;
  onOpenWorkspaceFile?: (path: string) => void;
  onLoadMore?: () => void;
  onSelectFileTab?: (path: string) => void;
  onCollapse?: () => void;
  pdfUrl?: string | null;
  previewFile?: ThreadWorkspaceFilePreview | null;
  previewLoading?: boolean;
  plugins: PluginContextValue;
  resolveWorkspaceFileUrl?: (path: string) => string | null;
  selectedTarget: GraphWorkspacePreviewTarget;
  workspaceRootPath?: string;
}) {
  const surfaceRef = useRef<HTMLElement | null>(null);
  const [editing, setEditing] = useState(false);
  const [draftContent, setDraftContent] = useState('');
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [markdownView, setMarkdownView] = useState<'preview' | 'source'>(
    'preview',
  );
  const [compactViewer, setCompactViewer] = useState(
    () =>
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function' ||
      window.matchMedia('(max-width: 639px)').matches,
  );
  const [dark, setDark] = useState(false);
  const activeNode = selectedTarget?.node ?? null;
  const renderedArtifact = activeNode?.artifact
    ? plugins.renderArtifact({
        artifact: activeNode.artifact,
        expanded: true,
        onToggleExpanded: () => undefined,
      })
    : null;
  const moleculeSnapshot = buildMoleculePreviewSnapshot(previewFile ?? null);
  const fileLanguage =
    previewFile?.language || languageForPath(previewFile?.path ?? '');
  const extension = previewFile ? extensionOf(previewFile.path) : '';
  const isMarkdownFile = MARKDOWN_EXTENSIONS.has(extension);
  const title = previewTargetTitle(selectedTarget);
  const canEditFile =
    Boolean(previewFile && onSaveFile) &&
    !(previewFile && MOLECULAR_EXTENSIONS.has(extension)) &&
    isSmallEditableTextFile(previewFile!);
  const isLiveArtifactPreview = selectedTarget?.kind === 'live-molecule';
  const isArtifactPreview = Boolean(activeNode?.artifact && renderedArtifact);
  const isMoleculePreview = Boolean(moleculeSnapshot) || isArtifactPreview;

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') {
      return;
    }
    const mediaQuery = window.matchMedia('(max-width: 639px)');
    const update = () => setCompactViewer(mediaQuery.matches);
    update();
    mediaQuery.addEventListener?.('change', update);
    return () => mediaQuery.removeEventListener?.('change', update);
  }, []);

  useEffect(() => {
    const shell = surfaceRef.current?.closest<HTMLElement>('.thread-ui-shell');
    const update = () =>
      setDark(
        shell?.getAttribute('data-theme-effective') === 'dark' ||
          shell?.classList.contains('dark') ||
          shell?.classList.contains('thread-ui-theme-dark') ||
          false,
      );
    update();
    if (!shell) {
      return;
    }
    const observer = new MutationObserver(update);
    observer.observe(shell, {
      attributes: true,
      attributeFilter: ['class', 'data-theme-effective'],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setEditing(false);
    setDraftContent(previewFile?.content ?? '');
    setSaveError(null);
    setMarkdownView('preview');
  }, [previewFile?.path, previewFile?.content]);

  useEffect(() => {
    if (!previewFile) {
      return;
    }
    onDirtyChange?.(
      previewFile.path,
      editing && draftContent !== previewFile.content,
    );
  }, [draftContent, editing, onDirtyChange, previewFile]);

  async function handleSaveFile() {
    if (!previewFile || !onSaveFile) {
      return;
    }

    setSaving(true);
    setSaveError(null);
    try {
      await onSaveFile({
        path: previewFile.path,
        content: draftContent,
      });
      setEditing(false);
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : 'Failed to save file.',
      );
    } finally {
      setSaving(false);
    }
  }

  const breadcrumbSegments = previewFile
    ? previewFile.path
        .replace(workspaceRootPath ?? '', '')
        .split('/')
        .filter(Boolean)
    : [];
  const fileToolbar =
    previewFile && (isMarkdownFile || canEditFile) ? (
      <div className="flex shrink-0 items-center gap-1">
        {isMarkdownFile && !editing ? (
          <div
            className="thread-graph-markdown-view-switch inline-flex items-center rounded border p-px"
            role="group"
            aria-label="Markdown view"
          >
            <button
              type="button"
              onClick={() => setMarkdownView('preview')}
              className={`inline-flex h-5 w-5 items-center justify-center rounded transition ${
                markdownView === 'preview' ? 'is-active' : ''
              }`}
              aria-pressed={markdownView === 'preview'}
              title="Markdown preview"
              aria-label="Markdown preview"
            >
              <BookOpen className="h-3 w-3" />
            </button>
            <button
              type="button"
              onClick={() => setMarkdownView('source')}
              className={`inline-flex h-5 w-5 items-center justify-center rounded transition ${
                markdownView === 'source' ? 'is-active' : ''
              }`}
              aria-pressed={markdownView === 'source'}
              title="Markdown source"
              aria-label="Markdown source"
            >
              <Code2 className="h-3 w-3" />
            </button>
          </div>
        ) : null}
        {canEditFile ? (
          <div className="flex shrink-0 items-center gap-0.5">
            {editing ? (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setDraftContent(previewFile.content);
                    setEditing(false);
                    setSaveError(null);
                  }}
                  disabled={saving}
                  className="thread-graph-editor-toolbar-button flex h-6 w-6 items-center justify-center rounded transition disabled:cursor-not-allowed disabled:opacity-40"
                  title="Cancel edits"
                  aria-label="Cancel edits"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => void handleSaveFile()}
                  disabled={saving || draftContent === previewFile.content}
                  className="thread-graph-editor-toolbar-button flex h-6 w-6 items-center justify-center rounded transition disabled:cursor-not-allowed disabled:opacity-40"
                  title="Save file"
                  aria-label="Save file"
                >
                  <Save className="h-3.5 w-3.5" />
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setDraftContent(previewFile.content);
                  setMarkdownView('source');
                  setEditing(true);
                  setSaveError(null);
                }}
                className="thread-graph-editor-toolbar-button flex h-6 w-6 items-center justify-center rounded transition"
                title="Edit file"
                aria-label="Edit file"
              >
                <Pencil className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        ) : null}
      </div>
    ) : null;
  const viewerPaneToggle = onExpandExplorer ? (
    <button
      type="button"
      onClick={onExpandExplorer}
      data-testid="expand-explorer"
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--theme-fg-muted)] transition hover:bg-[var(--theme-hover)] hover:text-[var(--theme-fg)]"
      title="Show Explorer"
      aria-label="Show Explorer"
    >
      <PanelLeftOpen className="h-3.5 w-3.5" />
    </button>
  ) : onCollapse ? (
    <button
      type="button"
      onClick={onCollapse}
      data-testid="collapse-viewer"
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[var(--theme-fg-muted)] transition hover:bg-[var(--theme-hover)] hover:text-[var(--theme-fg)]"
      title="Hide Editor"
      aria-label="Hide Editor"
    >
      <PanelRightClose className="h-3.5 w-3.5" />
    </button>
  ) : null;

  return (
    <section
      ref={surfaceRef}
      className="thread-graph-viewer flex h-full min-h-0 flex-col overflow-hidden rounded-md"
      data-preview-target-kind={selectedTarget?.kind ?? 'none'}
    >
      {selectedTarget?.kind !== 'workspace-file' ? (
        <div className="thread-graph-viewer-header flex h-9 shrink-0 items-center justify-between gap-2 border-b px-2.5">
          <span className="min-w-0 truncate text-xs font-medium text-[var(--theme-fg)]">
            {title ?? 'Preview'}
          </span>
          {viewerPaneToggle}
        </div>
      ) : null}
      {fileTabs.length > 0 && onCloseFileTab && onSelectFileTab ? (
        <WorkspaceFileTabs
          activePath={activeFilePath ?? null}
          dirtyPaths={dirtyFilePaths}
          onClose={onCloseFileTab}
          onSelect={onSelectFileTab}
          tabs={fileTabs}
          trailingAction={
            fileToolbar || viewerPaneToggle ? (
              <>
                {fileToolbar}
                {viewerPaneToggle}
              </>
            ) : null
          }
        />
      ) : null}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {error ? (
          <div className="border-b border-rose-200 bg-rose-50 px-5 py-3 text-sm text-rose-700 dark:border-rose-400/25 dark:bg-rose-400/10 dark:text-rose-200">
            {error}
          </div>
        ) : null}
        {!selectedTarget ? (
          <div className="flex min-h-0 flex-1 items-center justify-center px-5 text-center text-sm text-slate-400 dark:text-slate-500">
            Pick a live molecule, workspace file, artifact, or thread event to
            preview it.
          </div>
        ) : selectedTarget.kind === 'workspace-file' && previewLoading ? (
          <div className="flex min-h-0 flex-1 items-center justify-center px-5 text-center text-sm text-slate-400 dark:text-slate-500">
            Loading file preview...
          </div>
        ) : selectedTarget.kind === 'workspace-file' && downloadOnly ? (
          <DownloadFilePreview key={selectedTarget.node.path} node={selectedTarget.node} onDownload={onDownloadFile} />
        ) : selectedTarget.kind === 'workspace-file' && moleculeSnapshot ? (
          <div className="thread-graph-molecule-preview min-h-0 flex-1 overflow-hidden">
            <GraphMoleculeViewer
              source={moleculeSnapshot}
              moleculeId={moleculeSnapshot.uuid ?? selectedTarget.node.path}
              title={selectedTarget.node.name}
            />
          </div>
        ) : selectedTarget.kind === 'workspace-file' && imageUrl ? (
          <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto p-5">
            <GraphWorkspaceZoomableImage
              src={imageUrl}
              alt={selectedTarget.node.path || selectedTarget.node.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ) : selectedTarget.kind === 'workspace-file' && pdfUrl ? (
          <div className="thread-graph-file-preview-frame min-h-0 flex-1 overflow-hidden">
            <iframe
              src={pdfUrl}
              title={`PDF preview: ${
                selectedTarget.node.path || selectedTarget.node.name
              }`}
              className="h-full w-full border-0"
            />
          </div>
        ) : selectedTarget.kind === 'workspace-file' && previewFile ? (
          <div className="flex min-h-0 flex-1 flex-col">
            {breadcrumbSegments.length > 1 ||
            (fileTabs.length === 0 && fileToolbar) ? (
              <div className="thread-graph-editor-breadcrumbs flex h-7 shrink-0 items-center border-b px-2 text-[11px]">
                <div className="flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto">
                  {breadcrumbSegments.map((segment, index, segments) => (
                    <span
                      key={`${segment}:${index}`}
                      className="flex shrink-0 items-center gap-0.5"
                    >
                      <span
                        className={
                          index === segments.length - 1
                            ? 'text-[var(--theme-fg)]'
                            : ''
                        }
                      >
                        {segment}
                      </span>
                      {index < segments.length - 1 ? (
                        <ChevronRight
                          aria-hidden="true"
                          className="h-3 w-3 text-[var(--theme-fg-muted)]"
                        />
                      ) : null}
                    </span>
                  ))}
                </div>
                {fileTabs.length === 0 ? fileToolbar : null}
              </div>
            ) : null}
            {saveError ? (
              <div className="border-b border-rose-200 bg-rose-50 px-4 py-2 text-sm text-rose-700 dark:border-rose-400/25 dark:bg-rose-400/10 dark:text-rose-200">
                {saveError}
              </div>
            ) : null}
            {editing && compactViewer ? (
              <textarea
                value={draftContent}
                onChange={(event) => setDraftContent(event.currentTarget.value)}
                spellCheck={false}
                aria-label="Workspace file editor"
                className="thread-graph-file-editor min-h-0 flex-1 resize-none border-0 bg-transparent p-4 font-mono text-[12px] leading-5 text-slate-900 outline-none dark:text-slate-100"
              />
            ) : isMarkdownFile && markdownView === 'preview' && !editing ? (
              <GraphWorkspaceMarkdownPreview
                content={previewFile.content}
                markdownPath={previewFile.path}
                {...(onOpenWorkspaceFile ? { onOpenWorkspaceFile } : {})}
                {...(resolveWorkspaceFileUrl
                  ? { resolveWorkspaceFileUrl }
                  : {})}
                {...(workspaceRootPath ? { workspaceRootPath } : {})}
              />
            ) : compactViewer ? (
              <GraphWorkspaceCodePreview
                content={previewFile.content}
                focusLine={focusLine}
                language={fileLanguage}
              />
            ) : (
              <Suspense
                fallback={
                  <div className="flex min-h-0 flex-1 items-center justify-center text-sm text-[var(--theme-fg-muted)]">
                    Loading editor...
                  </div>
                }
              >
                <GraphWorkspaceMonacoEditor
                  key={previewFile.path}
                  content={editing ? draftContent : previewFile.content}
                  dark={dark}
                  focusLine={focusLine}
                  language={fileLanguage}
                  onChange={setDraftContent}
                  onSave={() => void handleSaveFile()}
                  path={previewFile.path}
                  readOnly={!editing}
                />
              </Suspense>
            )}
            {previewFile.truncated && onLoadMore ? (
              <div className="thread-graph-file-preview-footer flex justify-center border-t px-4 py-3">
                <button
                  type="button"
                  onClick={onLoadMore}
                  disabled={loadingMore}
                  title="Load more workspace preview"
                  aria-label="Load more workspace preview"
                  className="thread-graph-load-more-button rounded-md px-4 py-1.5 text-xs disabled:opacity-50"
                >
                  {loadingMore
                    ? 'Loading...'
                    : `Load more (${(
                        previewFile.size - previewFile.nextOffset
                      ).toLocaleString()} bytes remaining)`}
                </button>
              </div>
            ) : null}
          </div>
        ) : (selectedTarget.kind === 'live-molecule' ||
            selectedTarget.kind === 'artifact') &&
          selectedTarget.node.artifact ? (
          <div
            className={
              isMoleculePreview || isLiveArtifactPreview
                ? 'min-h-0 flex-1 overflow-hidden'
                : 'min-h-0 flex-1 overflow-auto p-3'
            }
          >
            {renderedArtifact}
          </div>
        ) : selectedTarget.kind === 'meta' ? (
          <div className="min-h-0 flex-1 overflow-auto p-3">
            <div className="grid gap-3">
              <WorkspaceInfoCard label="Workspace Data">
                <GraphWorkspaceCodePreview
                  content={selectedTarget.node.detail ?? ''}
                />
              </WorkspaceInfoCard>
            </div>
          </div>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="thread-graph-file-preview-header border-b px-4 py-3 text-xs uppercase tracking-[0.12em]">
              {selectedTarget.node.kind}
            </div>
            <GraphWorkspaceCodePreview
              content={
                selectedTarget.node.detail ??
                selectedTarget.node.preview ??
                selectedTarget.node.name
              }
            />
          </div>
        )}
      </div>
    </section>
  );
}

import './styles/base.css';
import './styles/timeline-shell.css';
import './styles/layout-workspace.css';
import './styles/history-markdown.css';
import './styles/composer-plan.css';
import './styles/export-dialog.css';
import './styles/matter-workbench.css';

export type {
  ShellSocketConnection,
  ShellSocketHandlers,
  ThreadDetailUiAdapter,
  ThreadShellAdapter,
  ThreadTimelineAdapter,
  ThreadWorkspaceAdapter,
} from './adapters';
export type {
  PromptAttachmentUpload,
  SendPromptInput,
  ThreadShellControlState,
} from './types';

export {
  ThreadComposer,
  type ThreadComposerProps,
} from './components/ThreadComposer';
export {
  ThreadCards,
  ThreadWorkspaceLayout,
} from './components/ThreadWorkspaceLayout';
export {
  ThreadTimeline,
  type ThreadTimelineProps,
} from './components/ThreadTimeline';
export {
  ThreadShellPanel,
  type ThreadShellPanelHandle,
} from './components/ThreadShellPanel';
export {
  MemoizedThreadGraphWorkspacePanel,
  ThreadGraphWorkspacePanel,
  type ThreadGraphWorkspaceFeatures,
  type ThreadGraphWorkspacePanelProps,
  type WorkspaceTab,
} from './components/ThreadGraphWorkspacePanelLazy';
export { ConfirmDialog } from './components/ConfirmDialog';
export {
  ExportTranscriptDialog,
  ThreadActionsDialog,
  type CreateThreadShareInput,
  type ThreadActionsDialogProps,
  type ThreadShareSummary,
} from './components/ExportTranscriptDialog';
export { LongTextDialog } from './components/LongTextDialog';
export {
  formatLongTimestamp,
  formatShortTimestamp,
  historyItemAccentClassName,
  historyItemLabel,
  threadStatusClassName,
  threadStatusLabel,
  turnStatusLabel,
} from './components/threadPresentation';
export { hasLikelyMarkdownSyntax } from './components/markdownHeuristics';
export {
  ThreadDetailSurface,
  type ThreadDetailSurfaceProps,
} from './ThreadDetailSurface';

export {
  createDefaultPluginContextValue,
  PluginContext,
  mergePluginState,
  type PluginContextValue,
} from './plugins/plugin-context';
export { PluginProvider } from './plugins/PluginProvider';
export { usePlugins } from './plugins/usePlugins';
export type {
  ArtifactRenderContext,
  FrontendPluginModule,
  InlineCodeRenderContext,
  ThreadPanelContribution,
} from './plugins/plugin-types';
export {
  AppShellNavContext,
  useAppShellNav,
  type AgentBackendId,
  type AppShellNavContextValue,
  type ThemeMode,
} from './app-shell/AppShellNavContext';
export {
  AppShellMenuButton,
  AppShellNavigationMenu,
  AppShellSettingsDialog,
  type AppShellNavigationItem,
  type AppShellNavigationMenuProps,
  type AppShellSettingsDialogProps,
} from './app-shell/AppShellNavigation';
export type { MatterWorkbenchOptions, WorkbenchThread, WorkbenchNotification } from './components/MatterWorkbench';
export { MatterWorkbench } from './components/MatterWorkbench';
export { PublicTranscript, transcriptSnapshot, type PublicTranscriptSnapshot } from './components/PublicTranscript';

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./components/graph-ui/Dialog";
export { SettingsPanels, type SettingsSection } from './components/SettingsPanels';

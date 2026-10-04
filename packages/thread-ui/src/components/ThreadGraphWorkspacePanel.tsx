import { memo, useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  GitBranch,
  Paperclip,
  Terminal,
  Trash2,
  Wrench,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import type {
  AgentRuntimeStatusDto,
  ThreadDetailDto,
  ThreadHistoryItemDto,
} from '@remote-codex/shared';
import type { ThreadWorkspaceAdapter } from '../adapters';
import type { PluginContextValue } from '../plugins/plugin-context';
import { GraphWorkspaceExplorer } from './graph-workspace/GraphWorkspaceExplorer';
import { WorkspaceInfoCard } from './graph-workspace/GraphWorkspaceCards';
import type { GraphToolEventSummary } from './graph-workspace/GraphToolUsagePanel';
import { collectArtifacts } from './graph-workspace/workspaceTree';
import { GraphVisualization } from './graph-chat/GraphVisualization';
import type { GraphChatInputNode } from './graph-chat/FloatingHelper';

export interface ThreadGraphWorkspacePanelProps {
  detail: ThreadDetailDto;
  status: AgentRuntimeStatusDto | null;
  plugins: PluginContextValue;
  workspaceAdapter?: ThreadWorkspaceAdapter | null;
  metaContent?: ReactNode;
  settingsContent?: ReactNode;
  activeView?: 'chat' | 'shell';
  features?: ThreadGraphWorkspaceFeatures;
  focusPathRequest?: { path: string; line?: number; requestId: number; artifactId?: string } | null;
}

export type WorkspaceTab =
  | 'workspace'
  | 'tools'
  | 'guide'
  | 'graph'
  | 'extensions';

type PrimaryWorkspaceTab = {
  id: 'workspace';
  label: string;
  icon: LucideIcon | null;
};

type SecondaryWorkspaceTab = {
  id: 'graph' | 'extensions';
  label: string;
  icon: LucideIcon;
};

export interface ThreadGraphWorkspaceFeatures {
  workspace?: boolean;
  toolUsage?: boolean;
  guide?: boolean;
  threadGraph?: boolean;
  extensions?: boolean;
  defaultTab?: WorkspaceTab;
}

const DEFAULT_WORKSPACE_FEATURES: Required<
  Omit<ThreadGraphWorkspaceFeatures, 'defaultTab'>
> = {
  workspace: true,
  toolUsage: false,
  guide: false,
  threadGraph: true,
  extensions: true,
};

function resolveWorkspaceFeatures(
  features: ThreadGraphWorkspaceFeatures | undefined,
) {
  return {
    ...DEFAULT_WORKSPACE_FEATURES,
    ...features,
  };
}

function firstEnabledWorkspaceTab(
  features: ReturnType<typeof resolveWorkspaceFeatures>,
  preferred?: WorkspaceTab,
): WorkspaceTab | null {
  const isEnabled = (tab: WorkspaceTab) => {
    switch (tab) {
      case 'workspace':
        return features.workspace;
      case 'tools':
        return false;
      case 'guide':
        return false;
      case 'graph':
        return features.threadGraph;
      case 'extensions':
        return features.extensions;
    }
  };

  if (preferred && isEnabled(preferred)) {
    return preferred;
  }

  return (
    ([
      'workspace',
      'graph',
      'extensions',
    ] as WorkspaceTab[]).find(isEnabled) ?? null
  );
}

function isWorkspaceTabEnabled(
  features: ReturnType<typeof resolveWorkspaceFeatures>,
  tab: WorkspaceTab,
) {
  switch (tab) {
    case 'workspace':
      return features.workspace;
    case 'tools':
      return false;
    case 'guide':
      return false;
    case 'graph':
      return features.threadGraph;
    case 'extensions':
      return features.extensions;
  }
}

function collectToolEvents(detail: ThreadDetailDto): GraphToolEventSummary[] {
  const events: GraphToolEventSummary[] = [];
  const toolKinds = new Set<ThreadHistoryItemDto['kind']>([
    'toolCall',
    'commandExecution',
    'webSearch',
    'fileRead',
    'fileChange',
    'agentToolCall',
    'skillToolCall',
    'hook',
  ]);
  let sequence = 0;

  for (const turn of detail.turns) {
    for (const item of turn.items) {
      if (!toolKinds.has(item.kind)) {
        continue;
      }
      events.push({
        id: item.id,
        kind: item.kind,
        label: formatToolKind(item.kind),
        preview: item.previewText ?? item.text ?? item.kind,
        detail: item.detailText ?? item.text ?? item.previewText ?? item.kind,
        turnId: item.sourceTurnId ?? turn.id,
        status: item.status ?? null,
        sequence,
      });
      sequence += 1;
    }
  }

  for (const item of detail.liveItems?.items ?? []) {
    if (!toolKinds.has(item.kind)) {
      continue;
    }
    events.push({
      id: item.id,
      kind: item.kind,
      label: formatToolKind(item.kind),
      preview: item.previewText ?? item.text ?? item.kind,
      detail: item.detailText ?? item.text ?? item.previewText ?? item.kind,
      turnId: item.sourceTurnId ?? null,
      status: item.status ?? null,
      sequence,
    });
    sequence += 1;
  }

  return events;
}

function formatToolKind(value: ThreadHistoryItemDto['kind']) {
  switch (value) {
    case 'toolCall':
      return 'Tool call';
    case 'agentToolCall':
      return 'Agent tool';
    case 'skillToolCall':
      return 'Skill tool';
    case 'commandExecution':
      return 'Command';
    case 'webSearch':
      return 'Search';
    case 'fileRead':
      return 'File read';
    case 'fileChange':
      return 'File change';
    case 'hook':
      return 'Hook';
    default:
      return value
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (letter) => letter.toUpperCase());
  }
}

function itemGraphLabel(item: ThreadHistoryItemDto) {
  switch (item.kind) {
    case 'userMessage':
      return 'User';
    case 'agentMessage':
      return 'Agent';
    default:
      return formatToolKind(item.kind);
  }
}

function itemGraphDescription(item: ThreadHistoryItemDto) {
  const source = item.previewText ?? item.text ?? item.detailText ?? item.kind;
  return source.replace(/\s+/g, ' ').slice(0, 96);
}

function collectGraphNodes(
  detail: ThreadDetailDto,
  toolEvents: GraphToolEventSummary[],
): GraphChatInputNode[] {
  const nodes: GraphChatInputNode[] = [
    {
      id: `thread:${detail.thread.id}`,
      name: detail.thread.title || 'Thread',
      description: detail.thread.model ?? detail.thread.status,
    },
    {
      id: `workspace:${detail.workspace.id}`,
      name: detail.workspace.label ?? 'Workspace',
      description: detail.workspace.absPath,
      out_node_id: `thread:${detail.thread.id}`,
    },
  ];

  let previousTurnId: string | null = null;
  for (const turn of detail.turns) {
    const turnId = `turn:${turn.id}`;
    nodes.push({
      id: turnId,
      name: `Turn ${nodes.filter((node) => node.id.startsWith('turn:')).length + 1}`,
      description: turn.status,
      out_node_id: previousTurnId
        ? [`thread:${detail.thread.id}`, previousTurnId]
        : `thread:${detail.thread.id}`,
    });
    previousTurnId = turnId;

    let previousItemId: string | null = null;
    for (const item of turn.items) {
      const itemId = `item:${item.id}`;
      const outNodeIds = [turnId];
      if (previousItemId) {
        outNodeIds.push(previousItemId);
      }
      nodes.push({
        id: itemId,
        name: itemGraphLabel(item),
        description: itemGraphDescription(item),
        out_node_id: outNodeIds,
      });
      previousItemId = itemId;

      if (item.kind === 'artifact' && item.artifact) {
        nodes.push({
          id: `artifact:${item.artifact.id}`,
          name: item.artifact.title || item.artifact.type,
          description: item.artifact.summaryText ?? item.artifact.type,
          out_node_id: itemId,
        });
      }
    }
  }

  const toolNodeIds = new Set(nodes.map((node) => node.id));
  for (const event of toolEvents) {
    const eventId = `tool:${event.id}`;
    if (toolNodeIds.has(eventId) || toolNodeIds.has(`item:${event.id}`)) {
      continue;
    }
    nodes.push({
      id: eventId,
      name: event.label,
      description: event.preview,
      out_node_id: event.turnId ? `turn:${event.turnId}` : `thread:${detail.thread.id}`,
    });
  }

  return nodes.slice(0, 120);
}

export function ThreadGraphWorkspacePanel({
  detail,
  status,
  plugins,
  workspaceAdapter,
  metaContent,
  settingsContent,
  activeView = 'chat',
  features: featureConfig,
  focusPathRequest = null,
}: ThreadGraphWorkspacePanelProps) {
  const features = useMemo(
    () => resolveWorkspaceFeatures(featureConfig),
    [featureConfig],
  );
  const initialTab = firstEnabledWorkspaceTab(features, featureConfig?.defaultTab);
  const [activeTab, setActiveTab] = useState<WorkspaceTab | null>(initialTab);
  const artifacts = useMemo(() => collectArtifacts(detail), [detail]);
  const toolEvents = useMemo(() => collectToolEvents(detail), [detail]);
  const threadPanels = plugins.getThreadPanels();
  const graphNodes = useMemo(
    () => collectGraphNodes(detail, toolEvents),
    [detail, toolEvents],
  );
  const primaryTabs = useMemo(() => {
    const tabs: PrimaryWorkspaceTab[] = [];
    if (features.workspace) {
      tabs.push({ id: 'workspace', label: 'Workspace', icon: null });
    }
    return tabs;
  }, [features.workspace]);
  const secondaryTabs = useMemo(() => {
    const tabs: SecondaryWorkspaceTab[] = [];
    if (features.threadGraph) {
      tabs.push({ id: 'graph', label: 'Thread graph', icon: GitBranch });
    }
    if (features.extensions) {
      tabs.push({ id: 'extensions', label: 'Remote Codex extensions', icon: Wrench });
    }
    return tabs;
  }, [features.extensions, features.threadGraph]);

  useEffect(() => {
    if (!activeTab || !isWorkspaceTabEnabled(features, activeTab)) {
      setActiveTab(firstEnabledWorkspaceTab(features, featureConfig?.defaultTab));
    }
  }, [activeTab, featureConfig?.defaultTab, features]);

  useEffect(() => {
    if (focusPathRequest && features.workspace) {
      setActiveTab('workspace');
    }
  }, [features.workspace, focusPathRequest?.requestId]);

  if (!activeTab) {
    return null;
  }

  return (
    <div className="thread-graph-right-panel flex h-full min-h-0 flex-col overflow-hidden">
      <div className="thread-graph-right-tabs flex h-9 shrink-0 items-center gap-0 overflow-hidden border-b px-1">
        {primaryTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`thread-graph-right-tab inline-flex h-9 shrink-0 items-center gap-1.5 px-2.5 text-xs font-medium transition ${
                activeTab === tab.id ? 'is-active' : ''
              }`}
            >
              {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
              {tab.label}
            </button>
          );
        })}
        {secondaryTabs.length ? (
          <div
            className="thread-graph-right-tab-secondary ml-auto flex h-6 min-w-0 shrink items-center gap-0.5 border-l pl-1"
            aria-label="Remote Codex workspace extensions"
          >
            {secondaryTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`thread-graph-right-tab inline-flex h-8 w-8 shrink-0 items-center justify-center text-xs font-medium transition ${
                    activeTab === tab.id ? 'is-active' : ''
                  }`}
                  title={tab.label}
                  aria-label={tab.label}
                >
                  <Icon className="h-3.5 w-3.5" />
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="min-h-0 flex-1 overflow-hidden">
        {activeTab === 'workspace' ? (
          <GraphWorkspaceExplorer
            activeView={activeView}
            detail={detail}
            artifacts={artifacts}
            plugins={plugins}
            status={status}
            focusPathRequest={focusPathRequest}
            workspaceAdapter={workspaceAdapter ?? null}
          />
        ) : null}

        {activeTab === 'graph' ? (
          <div className="thread-graph-visualization-panel h-full min-h-0 p-3">
            <GraphVisualization nodes={graphNodes} />
          </div>
        ) : null}

        {activeTab === 'extensions' ? (
          <div className="h-full min-h-0 overflow-y-auto p-3">
            <div className="grid gap-3">
              <WorkspaceInfoCard label="Plugin Panels">
                {threadPanels.length ? (
                  <div className="flex flex-wrap gap-2">
                    {threadPanels.map((panel) => (
                      <span
                        key={panel.id}
                        className="rounded-full border border-[var(--theme-border)] px-2 py-1 text-xs text-[var(--theme-fg-soft)]"
                      >
                        {panel.label}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-[var(--theme-fg-muted)]">
                    No thread panels are enabled.
                  </p>
                )}
              </WorkspaceInfoCard>
              <WorkspaceInfoCard label="Enabled Renderers">
                <div className="flex flex-wrap gap-2">
                  {plugins.plugins
                    .filter((plugin) => plugin.enabled)
                    .map((plugin) => (
                      <span
                        key={plugin.id}
                        className="rounded-full border border-[var(--theme-border)] px-2 py-1 text-xs text-[var(--theme-fg-soft)]"
                      >
                        {plugin.name}
                      </span>
                    ))}
                </div>
              </WorkspaceInfoCard>
              <WorkspaceInfoCard label="Remote Codex Tools">
                <div className="grid gap-2 text-[var(--theme-fg-muted)]">
                  <div className="flex items-start gap-2">
                    <Terminal className="mt-0.5 h-4 w-4 shrink-0" />
                    <p>
                      Terminal stays available when the Terminal plugin and
                      shell adapter are attached.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Paperclip className="mt-0.5 h-4 w-4 shrink-0" />
                    <p>
                      Composer attachments, slash panels, hooks, MCP, goals,
                      and fork controls remain part of the chat surface.
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <Trash2 className="mt-0.5 h-4 w-4 shrink-0" />
                    <p>
                      Destructive actions stay explicit: delete thread,
                      interrupt, compact, and hook trust controls remain host
                      governed.
                    </p>
                  </div>
                </div>
              </WorkspaceInfoCard>
              {metaContent ? (
                <WorkspaceInfoCard label="Thread Meta">
                  {metaContent}
                </WorkspaceInfoCard>
              ) : null}
              {settingsContent ? (
                <WorkspaceInfoCard label="Settings">
                  {settingsContent}
                </WorkspaceInfoCard>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export const MemoizedThreadGraphWorkspacePanel = memo(
  ThreadGraphWorkspacePanel,
);

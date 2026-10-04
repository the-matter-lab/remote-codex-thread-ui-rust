import type { WorkspaceNodeKind, WorkspaceTreeNode } from '../workspaceTree';

export type WorkspaceExplorerChildrenState =
  | 'unresolved'
  | 'loading'
  | 'resolved'
  | 'error';

export type WorkspaceExplorerNodeSource = Omit<WorkspaceTreeNode, 'children'>;

export interface WorkspaceExplorerNodeRecord {
  id: string;
  parentId: string | null;
  name: string;
  path: string;
  kind: WorkspaceNodeKind;
  childIds: string[];
  childrenState: WorkspaceExplorerChildrenState;
  hasChildren: boolean;
  truncated: boolean;
  requestGeneration: number;
  error?: string;
  source: WorkspaceExplorerNodeSource;
}

export interface WorkspaceExplorerModel {
  rootId: string;
  nodes: Map<string, WorkspaceExplorerNodeRecord>;
  pathToId: Map<string, string>;
}

export interface WorkspaceExplorerRowProjection {
  id: string;
  parentId: string | null;
  depth: number;
  posInSet: number;
  setSize: number;
  expanded: boolean | undefined;
  compactPathSegments?: string[];
  matchRanges?: Array<{ start: number; end: number }>;
  node: WorkspaceExplorerNodeRecord;
}

export interface WorkspaceExplorerProjection {
  rows: WorkspaceExplorerRowProjection[];
  indexById: Map<string, number>;
  matchCount: number;
  hasUnresolvedDirectories: boolean;
}

export type WorkspaceExplorerCapabilities =
  import('../../../adapters').ThreadWorkspaceCapabilities;
export type WorkspaceExplorerAdapter =
  import('../../../adapters').ThreadWorkspaceAdapter;

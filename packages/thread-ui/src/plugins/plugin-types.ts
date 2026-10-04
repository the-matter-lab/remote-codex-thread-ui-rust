import type { ReactNode } from 'react';

import type {
  PluginManifestDto,
  ThreadArtifactDto,
  ExtensionDiscovery,
  ExtensionEnvelope,
  ScientificTarget,
  ViewerInput,
  ViewerRequest,
  ViewerAcknowledgement,
} from '@remote-codex/shared';

/** Host-owned callbacks. Runtime JSON cannot install frontend code. */
export interface ExtensionHostAdapter {
  discovery: ExtensionDiscovery;
  submitInput?: (input: ViewerInput) => Promise<ViewerAcknowledgement>;
  acknowledgeAction?: (request: ViewerRequest, acknowledgement: ViewerAcknowledgement) => Promise<void>;
}

export interface ExtensionRenderContext {
  extension: ExtensionEnvelope<unknown>;
  host?: ExtensionHostAdapter;
}

export interface ViewerToolbarContext {
  target: ScientificTarget;
  selectedIds: string[];
  host?: ExtensionHostAdapter;
}

export interface ViewerToolbarContribution {
  id: string;
  label: string;
  capabilityId: string;
  render: (context: ViewerToolbarContext) => ReactNode;
}

export interface ArtifactRenderContext {
  artifact: ThreadArtifactDto;
  expanded: boolean;
  presentation?: 'timeline' | 'workspace';
  onOpenFile?: () => void;
  onToggleExpanded: () => void;
  extensionHost?: ExtensionHostAdapter;
}

export interface InlineCodeRenderContext {
  code: string;
  isIncomplete: boolean;
  language: string;
  meta?: string;
}

export interface ThreadPanelContribution {
  id: string;
  kind: string;
  label: string;
  capabilityId?: string;
  render?: (context: ExtensionRenderContext) => ReactNode;
}

export interface FrontendPluginModule {
  manifest: PluginManifestDto;
  threadPanels?: ThreadPanelContribution[];
  viewerToolbar?: ViewerToolbarContribution[];
  renderExtension?: (context: ExtensionRenderContext) => ReactNode;
  renderArtifact?: (context: ArtifactRenderContext) => ReactNode;
  inlineCodeRenderers?: Array<{
    languages: string[];
    render: (context: InlineCodeRenderContext) => ReactNode | null;
  }>;
}

import { ReactNode } from 'react';
import { PluginManifestDto, ExtensionEnvelope, ExtensionDiscovery, ViewerInput, ViewerAcknowledgement, ViewerRequest, ScientificTarget, ThreadArtifactDto } from '@remote-codex/shared';

/** Host-owned callbacks. Runtime JSON cannot install frontend code. */
interface ExtensionHostAdapter {
    discovery: ExtensionDiscovery;
    submitInput?: (input: ViewerInput) => Promise<ViewerAcknowledgement>;
    acknowledgeAction?: (request: ViewerRequest, acknowledgement: ViewerAcknowledgement) => Promise<void>;
}
interface ExtensionRenderContext {
    extension: ExtensionEnvelope<unknown>;
    host?: ExtensionHostAdapter;
}
interface ViewerToolbarContext {
    target: ScientificTarget;
    selectedIds: string[];
    host?: ExtensionHostAdapter;
}
interface ViewerToolbarContribution {
    id: string;
    label: string;
    capabilityId: string;
    render: (context: ViewerToolbarContext) => ReactNode;
}
interface ArtifactRenderContext {
    artifact: ThreadArtifactDto;
    expanded: boolean;
    presentation?: 'timeline' | 'workspace';
    onOpenFile?: () => void;
    onToggleExpanded: () => void;
    extensionHost?: ExtensionHostAdapter;
}
interface InlineCodeRenderContext {
    code: string;
    isIncomplete: boolean;
    language: string;
    meta?: string;
}
interface ThreadPanelContribution {
    id: string;
    kind: string;
    label: string;
    capabilityId?: string;
    render?: (context: ExtensionRenderContext) => ReactNode;
}
interface FrontendPluginModule {
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

export type { ArtifactRenderContext as A, ExtensionHostAdapter as E, FrontendPluginModule as F, InlineCodeRenderContext as I, ThreadPanelContribution as T, ViewerToolbarContext as V, ExtensionRenderContext as a, ViewerToolbarContribution as b };

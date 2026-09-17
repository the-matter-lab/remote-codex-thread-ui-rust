import { ReactNode } from 'react';
import { PluginManifestDto, ThreadArtifactDto } from '@remote-codex/shared';

interface ArtifactRenderContext {
    artifact: ThreadArtifactDto;
    expanded: boolean;
    presentation?: 'timeline' | 'workspace';
    onOpenFile?: () => void;
    onToggleExpanded: () => void;
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
}
interface FrontendPluginModule {
    manifest: PluginManifestDto;
    threadPanels?: ThreadPanelContribution[];
    renderArtifact?: (context: ArtifactRenderContext) => ReactNode;
    inlineCodeRenderers?: Array<{
        languages: string[];
        render: (context: InlineCodeRenderContext) => ReactNode | null;
    }>;
}

export type { ArtifactRenderContext as A, FrontendPluginModule as F, InlineCodeRenderContext as I, ThreadPanelContribution as T };

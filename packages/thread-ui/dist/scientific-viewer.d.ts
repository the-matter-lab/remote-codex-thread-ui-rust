import * as react from 'react';
import { ReactNode } from 'react';
import { ArtifactMetadata, ScientificTarget, ViewerRequest, ViewerAcknowledgement, ExtensionDiscovery } from '@remote-codex/shared';
import { E as ExtensionHostAdapter } from './plugin-types-Bjl4gyeh.js';
import { GLViewer } from '3dmol';

type ThreeDmolApi = {
    createViewer(element: HTMLElement, options?: Record<string, unknown>): GLViewer;
};
declare global {
    interface Window {
        '3Dmol'?: ThreeDmolApi;
    }
}

type GraphMoleculeViewerSnapshot = {
    content: string[];
    format?: string | null;
    uuid?: string | null;
    name?: string | null;
    metadata?: ArtifactMetadata;
    target?: ScientificTarget;
    /** Immutable targets supplied by the producer, in trajectory order. */
    frameTargets?: ScientificTarget[];
};
type GraphMoleculeViewerSource = GraphMoleculeViewerSnapshot | string | null | undefined;
type GraphMoleculeViewerData = {
    format: string;
    frames: string[];
    exportContent: string;
};
declare function readGraphMoleculeViewerData(source: GraphMoleculeViewerSource): GraphMoleculeViewerData;

type GraphMoleculeScreenshot = {
    version: 1;
    moleculeId: string | null;
    image: string;
    mediaType: 'image/png';
    width: number;
    height: number;
    target?: ScientificTarget;
    trajectoryIndex: number;
    camera: number[];
    selectedIds: string[];
};
type GraphMoleculeAtomSelection = {
    moleculeId: string | null;
    atoms: number[];
    selectedIds: string[];
    target?: ScientificTarget;
};
type GraphMoleculeSelectionSubmission = {
    selections: GraphMoleculeAtomSelection[];
};
type GraphMoleculeViewerHandle = {
    captureScreenshot: () => string;
    /** A detached snapshot of this mounted viewer's live personal state. */
    captureView: () => GraphMoleculeScreenshot;
    isAvailable: () => boolean;
    trajectoryIndex: number;
    target?: ScientificTarget;
    execute: (request: ViewerRequest) => Promise<ViewerAcknowledgement>;
};
type GraphMoleculeViewerProps = {
    className?: string;
    presentation?: 'timeline' | 'workspace';
    onOpenFile?: () => void;
    moleculeId?: string | null;
    onScreenshot?: (screenshot: GraphMoleculeScreenshot) => void | Promise<void>;
    onSelectionChange?: (selection: GraphMoleculeAtomSelection) => void;
    onSelectionSubmit?: (selection: GraphMoleculeSelectionSubmission) => void | Promise<void>;
    onReady?: (view: GraphMoleculeViewerHandle) => void;
    /** Personal inspection signal; never a durable input or shared camera event. */
    onActive?: (view: GraphMoleculeViewerHandle) => void;
    source: GraphMoleculeViewerSource;
    title?: string | null;
    extensionHost?: ExtensionHostAdapter;
    /** Build-time reviewed UI slots. Runtime data never selects executable code. */
    toolbar?: (context: {
        target?: ScientificTarget;
        selectedIds: string[];
    }) => ReactNode;
    rendererSlot?: (context: {
        target?: ScientificTarget;
        selectedIds: string[];
    }) => ReactNode;
    onDownloadSource?: () => void;
    loading?: boolean;
};
declare function GraphMoleculeViewer({ className, moleculeId, onScreenshot, onSelectionChange, onSelectionSubmit, onReady, onActive, source, title, presentation, onOpenFile, extensionHost, toolbar, rendererSlot, onDownloadSource, loading, }: GraphMoleculeViewerProps): react.JSX.Element;

type ViewerStyle = 'ball-stick' | 'stick' | 'spacefill' | 'cartoon' | 'surface';
type ViewerAnnotation = {
    id: string;
    text: string;
    atomId: string;
    color?: string;
};
type ViewerCommand = {
    type: 'selection';
    selectedIds: string[];
    color?: string;
    radius?: number;
} | {
    type: 'style';
    style: ViewerStyle;
} | {
    type: 'camera';
    view: number[];
} | {
    type: 'annotations';
    annotations: ViewerAnnotation[];
} | {
    type: 'unit-cell';
    visible: boolean;
};
declare function sameScientificTarget(a: ScientificTarget | undefined, b: ScientificTarget | undefined): boolean;
declare function validateViewerCommands(value: unknown, atomIds: string[], styles: ViewerStyle[]): ViewerCommand[];
/** The executor receives reviewed data commands, never source or a viewer object. */
declare function createViewerCommandExecutor(getState: () => {
    target?: ScientificTarget;
    discovery?: ExtensionDiscovery;
    atomIds: string[];
    styles: ViewerStyle[];
    ready: boolean;
    cellAvailable?: boolean;
}, apply: (commands: ViewerCommand[]) => void | Promise<void>): (request: ViewerRequest) => Promise<ViewerAcknowledgement>;

export { type GraphMoleculeAtomSelection, type GraphMoleculeScreenshot, type GraphMoleculeSelectionSubmission, GraphMoleculeViewer, type GraphMoleculeViewerHandle, type GraphMoleculeViewerProps, type ViewerAnnotation, type ViewerCommand, type ViewerStyle, createViewerCommandExecutor, readGraphMoleculeViewerData, sameScientificTarget, validateViewerCommands };

import * as react from 'react';

type GraphMoleculeViewerSnapshot = {
    content: string[];
    format?: string | null;
    uuid?: string | null;
    name?: string | null;
};
type GraphMoleculeViewerSource = GraphMoleculeViewerSnapshot | string | null | undefined;
type GraphMoleculeViewerData = {
    format: string;
    frames: string[];
    exportContent: string;
};
declare function readGraphMoleculeViewerData(source: GraphMoleculeViewerSource): GraphMoleculeViewerData;

type GraphMoleculeScreenshot = {
    moleculeId: string | null;
    image: string;
};
type GraphMoleculeAtomSelection = {
    moleculeId: string | null;
    atoms: number[];
};
declare function GraphMoleculeViewer({ className, moleculeId, onScreenshot, onSelectionChange, onReady, source, title, presentation, onOpenFile, }: {
    className?: string;
    presentation?: 'timeline' | 'workspace';
    onOpenFile?: () => void;
    moleculeId?: string | null;
    onScreenshot?: (screenshot: GraphMoleculeScreenshot) => void;
    onSelectionChange?: (selection: GraphMoleculeAtomSelection) => void;
    onReady?: (view: {
        captureScreenshot: () => string;
        trajectoryIndex: number;
    }) => void;
    source: GraphMoleculeViewerSource;
    title?: string | null;
}): react.JSX.Element;

export { type GraphMoleculeAtomSelection, type GraphMoleculeScreenshot, GraphMoleculeViewer, readGraphMoleculeViewerData };

import type { GLViewer } from '3dmol';
import { Box, Camera, Copy, Download, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import type { RefObject } from 'react';

import { ButtonGroupSeparator } from '../graph-ui/ButtonGroup';
import {
  downloadTextFile,
  GraphMoleculeButtonGroup,
  GraphMoleculeIconButton,
  moleculeSlug,
} from './GraphMoleculeViewerControls';

export default function GraphMoleculeViewerUpperButtonGroup({
  currentIndex,
  exportContent,
  moleculeId,
  onScreenshot,
  viewerRef,
  viewerHostRef,
  hasUnitCell,
  xyzContent,
  xyzFormat,
}: {
  currentIndex: number;
  exportContent: string;
  moleculeId?: string | null;
  onScreenshot: () => void;
  viewerRef: RefObject<GLViewer | null>;
  viewerHostRef: RefObject<HTMLDivElement | null>;
  hasUnitCell: boolean;
  xyzContent: string | null;
  xyzFormat: string;
}) {
  const slug = moleculeSlug(moleculeId);

  async function handleCopyXYZ() {
    if (!xyzContent) {
      return;
    }
    await navigator.clipboard.writeText(xyzContent);
  }

  function handleDownloadXYZ() {
    if (!xyzContent) {
      return;
    }
    downloadTextFile(
      xyzContent,
      `${slug}_step_${currentIndex + 1}.${xyzFormat || 'xyz'}`,
    );
  }

  function handleDownloadAllXYZ() {
    if (!exportContent) {
      return;
    }
    downloadTextFile(exportContent, `${slug}_trajectory.${xyzFormat || 'xyz'}`);
  }

  function handleZoomIn() {
    if (!viewerRef.current) {
      return;
    }
    viewerRef.current.zoom(1.2);
    viewerRef.current.render();
  }

  function handleZoomOut() {
    if (!viewerRef.current) {
      return;
    }
    viewerRef.current.zoom(0.8);
    viewerRef.current.render();
  }

  function handleReset() {
    if (!viewerRef.current) {
      return;
    }
    viewerRef.current.zoomTo();
    const host = viewerHostRef.current;
    viewerRef.current.zoom((hasUnitCell ? 0.5 : 0.85) * (host?.clientHeight ? Math.min(1, host.clientWidth / host.clientHeight) : 1));
    viewerRef.current.setCameraParameters({});
    viewerRef.current.render();
  }

  return (
    <GraphMoleculeButtonGroup className="ml-auto justify-end">
      <GraphMoleculeIconButton
        label="Copy current structure"
        onClick={() => void handleCopyXYZ()}
        disabled={!xyzContent}
      >
        <Copy className="size-3.5" />
      </GraphMoleculeIconButton>
      <GraphMoleculeIconButton
        label="Download current structure"
        onClick={handleDownloadXYZ}
        disabled={!xyzContent}
      >
        <Download className="size-3.5" />
      </GraphMoleculeIconButton>
      <GraphMoleculeIconButton
        label="Download full trajectory"
        onClick={handleDownloadAllXYZ}
        disabled={!exportContent}
      >
        <Box className="size-3.5" />
      </GraphMoleculeIconButton>
      <GraphMoleculeIconButton
        label="Copy screenshot"
        onClick={onScreenshot}
        disabled={!viewerRef.current || !xyzContent}
      >
        <Camera className="size-3.5" />
      </GraphMoleculeIconButton>
      <ButtonGroupSeparator className="thread-graph-molecule-button-divider" />
      <GraphMoleculeIconButton
        label="Zoom in"
        onClick={handleZoomIn}
        disabled={!viewerRef.current || !xyzContent}
      >
        <ZoomIn className="size-3.5" />
      </GraphMoleculeIconButton>
      <GraphMoleculeIconButton
        label="Zoom out"
        onClick={handleZoomOut}
        disabled={!viewerRef.current || !xyzContent}
      >
        <ZoomOut className="size-3.5" />
      </GraphMoleculeIconButton>
      <GraphMoleculeIconButton
        label="Reset camera"
        onClick={handleReset}
        disabled={!viewerRef.current || !xyzContent}
      >
        <RotateCcw className="size-3.5" />
      </GraphMoleculeIconButton>
    </GraphMoleculeButtonGroup>
  );
}

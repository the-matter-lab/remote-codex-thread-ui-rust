import {
  AlignVerticalDistributeCenter,
  ArrowUpRight,
  Box,
  Boxes,
  Bubbles,
  CircleX,
  Eraser,
  Rotate3d,
  Send,
  Share2,
  Spline,
  Trash2,
  Waypoints,
} from 'lucide-react';

import {
  GraphMoleculeButtonGroup,
  type GraphMoleculeCameraInfo,
  GraphMoleculeIconButton,
} from './GraphMoleculeViewerControls';

export default function GraphMoleculeViewerLowerButtonGroup({
  cameraInfo,
  canSubmit = false,
  onClearSelection,
  onClearStaged,
  onSendSelection,
  onSendStaged,
  onStageSelection,
  onToggleUnitCell,
  selectedAtomLabels,
  selectedSerials,
  stagedAtoms,
  stagedMolecules,
  unitCellAvailable,
  unitCellVisible,
}: {
  canSubmit?: boolean;
  cameraInfo: GraphMoleculeCameraInfo | null;
  onClearSelection: () => void;
  onClearStaged: () => void;
  onSendSelection: () => void;
  onSendStaged: () => void;
  onStageSelection: () => void;
  onToggleUnitCell: () => void;
  selectedAtomLabels: Record<number, string>;
  selectedSerials: number[];
  stagedAtoms: number;
  stagedMolecules: number;
  unitCellAvailable: boolean;
  unitCellVisible: boolean;
}) {
  const hasSelection = selectedSerials.length > 0;
  const hasStaged = stagedAtoms > 0;

  return (
    <>
      <div className="flex w-full justify-between gap-2 overflow-x-auto">
        <GraphMoleculeButtonGroup>
          <GraphMoleculeIconButton
            label="Distance: unavailable; requires an agent contribution"
            disabled
          >
            <AlignVerticalDistributeCenter className="size-4" />
          </GraphMoleculeIconButton>
          <GraphMoleculeIconButton
            label="Connectivity: unavailable; requires an agent contribution"
            disabled
          >
            <Share2 className="size-4" />
          </GraphMoleculeIconButton>
          <GraphMoleculeIconButton
            label="Angle: unavailable; requires an agent contribution"
            disabled
          >
            <Waypoints className="size-4" />
          </GraphMoleculeIconButton>
          <GraphMoleculeIconButton
            label="Dihedral: unavailable; requires an agent contribution"
            disabled
          >
            <Spline className="size-4" />
          </GraphMoleculeIconButton>
          <GraphMoleculeIconButton
            label="Add dummy atoms: unavailable; requires an agent contribution"
            disabled
          >
            <Bubbles className="size-4" />
          </GraphMoleculeIconButton>
          <GraphMoleculeIconButton
            label="Delete atoms: unavailable; requires an agent contribution"
            disabled
          >
            <CircleX className="size-4" />
          </GraphMoleculeIconButton>
          <GraphMoleculeIconButton
            label="Rotate: unavailable; requires an agent contribution"
            disabled
          >
            <Rotate3d className="size-4" />
          </GraphMoleculeIconButton>
        </GraphMoleculeButtonGroup>

        <GraphMoleculeButtonGroup>
          <GraphMoleculeIconButton
            label={unitCellVisible ? 'Hide unit cell' : 'Show unit cell'}
            disabled={!unitCellAvailable}
            onClick={onToggleUnitCell}
          >
            <Boxes className="size-4" />
          </GraphMoleculeIconButton>
          <GraphMoleculeIconButton
            label="Clear selection"
            disabled={!hasSelection}
            onClick={onClearSelection}
          >
            <Trash2 className="size-4" />
          </GraphMoleculeIconButton>
          <GraphMoleculeIconButton
            label="Send selection"
            disabled={!hasSelection || !canSubmit}
            onClick={onSendSelection}
          >
            <Send className="size-4" />
          </GraphMoleculeIconButton>
          <GraphMoleculeIconButton
            label="Stage current selection"
            disabled={!hasSelection}
            onClick={onStageSelection}
          >
            <Box className="size-4" />
          </GraphMoleculeIconButton>
          <GraphMoleculeIconButton
            label="Clear staged selections"
            disabled={!hasStaged}
            onClick={onClearStaged}
          >
            <Eraser className="size-4" />
          </GraphMoleculeIconButton>
          <GraphMoleculeIconButton
            label="Send staged selections"
            disabled={!hasStaged || !canSubmit}
            onClick={onSendStaged}
          >
            <ArrowUpRight className="size-4" />
          </GraphMoleculeIconButton>
        </GraphMoleculeButtonGroup>
      </div>

      {cameraInfo ? (
        <div className="thread-graph-molecule-camera">
          <div>
            <strong>XYZ: </strong>x={cameraInfo.position.x.toFixed(1)} y=
            {cameraInfo.position.y.toFixed(1)} z=
            {cameraInfo.position.z.toFixed(1)}
            <br />
            <strong>Quat: </strong>qx=
            {cameraInfo.position.qx.toFixed(2)} qy=
            {cameraInfo.position.qy.toFixed(2)} qz=
            {cameraInfo.position.qz.toFixed(2)} qw=
            {cameraInfo.position.qw.toFixed(2)}
          </div>
          <div className="thread-graph-molecule-camera-divider" />
          <div className="flex flex-col gap-1 text-[10px]">
            <div>
              Selected atoms:{' '}
              {selectedSerials.length > 0
                ? selectedSerials
                    .map(
                      (serial) =>
                        `${selectedAtomLabels[serial] ?? 'Atom'}(${serial})`,
                    )
                    .join(', ')
                : 'None'}
            </div>
            <div>
              Staged: {stagedMolecules} molecule(s), {stagedAtoms} atom(s)
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

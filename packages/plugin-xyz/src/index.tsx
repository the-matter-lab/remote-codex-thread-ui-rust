import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  usePlugins,
  type ExtensionHostAdapter,
  type FrontendPluginModule,
} from '@remote-codex/thread-ui';
import {
  GraphMoleculeViewer,
  readGraphMoleculeViewerData,
} from '@remote-codex/thread-ui/scientific-viewer';
import {
  validateArtifactMetadata,
  validateScientificTarget,
  validateViewerInput,
  validateViewerAcknowledgement,
  type ArtifactMetadata,
  type ScientificTarget,
  type ViewerInput,
  type JsonValue,
} from '@remote-codex/shared';

type ViewerProps = React.ComponentProps<typeof GraphMoleculeViewer>;
export interface StructureAsset {
  url: string;
  checksum: string;
  format: 'xyz' | 'extxyz' | 'cif' | 'pdb' | 'sdf' | 'mol';
  name: string;
  artifactId?: string;
  metadata?: ArtifactMetadata;
  target?: ScientificTarget;
  frameTargets?: ScientificTarget[];
  /** Optional canonical file when url points to a distinct render representation. */
  source?: {
    url: string;
    checksum: string;
    format: StructureAsset['format'];
    name: string;
  };
  streamId?: string;
  frameCount?: number;
  streaming?: boolean;
}

async function verifiedBytes(
  asset: { url: string; checksum: string },
  signal: AbortSignal,
): Promise<ArrayBuffer> {
  const url = new URL(asset.url, window.location.href);
  if (url.origin !== window.location.origin)
    throw new Error('Structure assets must come from this app-server');
  if (!/^[a-f0-9]{64}$/.test(asset.checksum))
    throw new Error('Invalid structure checksum');
  const response = await fetch(url, { signal, redirect: 'error' });
  if (!response.ok)
    throw new Error(`Structure download failed (${response.status})`);
  const bytes = await response.arrayBuffer();
  const digest = Array.from(
    new Uint8Array(await crypto.subtle.digest('SHA-256', bytes)),
    (value) => value.toString(16).padStart(2, '0'),
  ).join('');
  if (digest !== asset.checksum)
    throw new Error('Structure checksum differs from the published artifact');
  return bytes;
}

function sourceTarget(asset: StructureAsset): ScientificTarget | undefined {
  if (asset.metadata) validateArtifactMetadata(asset.metadata);
  const canonicalChecksum = asset.source?.checksum ?? asset.checksum;
  if (asset.metadata && asset.metadata.checksum !== canonicalChecksum)
    throw new Error(
      'Canonical metadata checksum differs from its immutable source',
    );
  const target =
    asset.target ??
    (asset.metadata && asset.artifactId
      ? {
          artifactId: asset.artifactId,
          objectId: asset.metadata.objectId,
          sourceRevision: asset.metadata.sourceRevision,
          checksum: canonicalChecksum,
          ...(asset.metadata.stream
            ? {
                streamId: asset.metadata.stream.id,
                frameId: asset.metadata.stream.frameId,
                frameIndex: asset.metadata.stream.frameIndex,
              }
            : {}),
        }
      : undefined);
  if (target) {
    validateScientificTarget(target);
    if (
      target.checksum !== canonicalChecksum ||
      (asset.metadata &&
        (target.objectId !== asset.metadata.objectId ||
          target.sourceRevision !== asset.metadata.sourceRevision))
    )
      throw new Error('Viewer target differs from verified source identity');
  }
  asset.frameTargets?.forEach((frame) => {
    validateScientificTarget(frame);
    if (!target || frame.objectId !== target.objectId)
      throw new Error(
        'Trajectory target differs from verified source identity',
      );
  });
  return target;
}

export function StructureView({
  asset,
  onReady,
  onOpenFile,
  presentation = 'timeline',
  extensionHost,
  onSelectionSubmit,
  onSelectionChange,
  onScreenshot,
  toolbar,
  rendererSlot,
  submissionActions,
}: {
  asset: StructureAsset;
  presentation?: 'timeline' | 'workspace';
  onOpenFile?: () => void;
  onReady?: ViewerProps['onReady'];
  extensionHost?: ExtensionHostAdapter;
  onSelectionSubmit?: ViewerProps['onSelectionSubmit'];
  onSelectionChange?: ViewerProps['onSelectionChange'];
  onScreenshot?: ViewerProps['onScreenshot'];
  toolbar?: ViewerProps['toolbar'];
  rendererSlot?: ViewerProps['rendererSlot'];
  submissionActions?: { selection?: string; screenshot?: string };
}) {
  const plugins = usePlugins();
  const host = extensionHost ?? plugins.extensions?.extensionHost;
  const [loaded, setLoaded] = useState<{
    asset: StructureAsset;
    content: string;
    bytes: ArrayBuffer;
    key: string;
    target?: ScientificTarget;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const assetKey = JSON.stringify(asset);
  const latestAsset = useRef(assetKey);
  latestAsset.current = assetKey;
  useEffect(() => {
    const controller = new AbortController();
    setError(null);
    void (async () => {
      const target = sourceTarget(asset);
      const renderBytes = await verifiedBytes(asset, controller.signal);
      const bytes = asset.source
        ? await verifiedBytes(asset.source, controller.signal)
        : renderBytes;
      const content = new TextDecoder('utf-8', { fatal: true }).decode(
        renderBytes,
      );
      if (asset.frameTargets) {
        const frames = readGraphMoleculeViewerData({
          content: [new TextDecoder('utf-8', { fatal: true }).decode(bytes)],
          format: asset.source?.format ?? asset.format,
        }).frames;
        if (asset.frameTargets.length !== frames.length)
          throw new Error(
            'Frame identity count differs from the source trajectory',
          );
        for (let index = 0; index < frames.length; index++) {
          const frame = asset.frameTargets[index]!;
          if (frame.frameIndex !== index || !frame.frameId || !frame.streamId)
            throw new Error(
              'Frame identity does not match its trajectory position',
            );
          if (frame.checksum !== (asset.source?.checksum ?? asset.checksum)) {
            const hash = Array.from(
              new Uint8Array(
                await crypto.subtle.digest(
                  'SHA-256',
                  new TextEncoder().encode(frames[index]),
                ),
              ),
              (value) => value.toString(16).padStart(2, '0'),
            ).join('');
            if (hash !== frame.checksum)
              throw new Error(
                'Frame checksum differs from verified immutable bytes',
              );
          }
        }
      }
      if (!controller.signal.aborted)
        setLoaded({ asset, target, bytes, key: assetKey, content });
    })().catch((reason) => {
      if (!controller.signal.aborted) setError(String(reason));
    });
    return () => controller.abort();
  }, [assetKey]);
  const source = useMemo(
    () =>
      loaded
        ? {
            content: [loaded.content],
            format: loaded.asset.format,
            uuid:
              loaded.target?.objectId ??
              loaded.asset.streamId ??
              loaded.asset.checksum,
            metadata: loaded.asset.metadata,
            target: loaded.target,
            frameTargets: loaded.asset.frameTargets,
          }
        : null,
    [loaded],
  );
  const loading = loaded?.key !== assetKey || Boolean(error);
  const selectionAction =
    submissionActions?.selection ?? 'elagente.viewer.select';
  const screenshotAction =
    submissionActions?.screenshot ?? 'elagente.viewer.screenshot';
  const available = (id: string) =>
    Boolean(
      host?.submitInput &&
      host.discovery.capabilities[id] &&
      host.discovery.actions.some(
        (action) => action.id === id && action.execution === 'native',
      ),
    );
  const pendingInputs = useRef(new Map<string, ViewerInput>());
  const pendingGroups = useRef(new Map<string, Set<number>>());
  async function submit(
    kind: ViewerInput['kind'],
    actionId: string,
    target: ScientificTarget | undefined,
    payload: JsonValue,
  ) {
    if (
      !host?.submitInput ||
      !target ||
      loading ||
      latestAsset.current !== loaded?.key
    )
      throw new Error(
        'An immutable current target and host submission callback are required.',
      );
    const key = JSON.stringify({ kind, actionId, target, payload });
    let input = pendingInputs.current.get(key);
    if (!input) {
      if (pendingInputs.current.size >= 128)
        throw new Error('Viewer submission retry quota reached.');
      const id = crypto.randomUUID();
      input = {
        version: 1,
        requestId: id,
        operationId: id,
        actionId,
        kind,
        submission: 'explicit',
        target,
        payload,
      };
      pendingInputs.current.set(key, input);
    }
    validateViewerInput(input, host.discovery);
    const acknowledgement = await host.submitInput(input);
    validateViewerAcknowledgement(acknowledgement, input, host.discovery);
    if (acknowledgement.status === 'rejected') {
      pendingInputs.current.delete(key);
      throw new Error(
        acknowledgement.error?.message ?? 'Viewer input rejected.',
      );
    }
    pendingInputs.current.delete(key);
  }
  const selectionCallback: ViewerProps['onSelectionSubmit'] =
    onSelectionSubmit ??
    (available(selectionAction) && loaded?.target
      ? async ({ selections }) => {
          // Validate the entire group before the first network operation; each object
          // carries its own immutable target. Native submission is per object.
          selections.forEach((selection) => {
            if (!selection.target)
              throw new Error('Selection has no immutable target');
            const input: ViewerInput = {
              version: 1,
              requestId: 'validation',
              operationId: 'validation',
              actionId: selectionAction,
              kind: 'selection',
              submission: 'explicit',
              target: selection.target,
              payload: { selectedIds: selection.selectedIds },
            };
            validateViewerInput(input, host!.discovery);
          });
          const groupKey = JSON.stringify(selections);
          let completed = pendingGroups.current.get(groupKey);
          if (!completed) {
            if (pendingGroups.current.size >= 128)
              throw new Error('Staged selection retry quota reached.');
            completed = new Set<number>();
            pendingGroups.current.set(groupKey, completed);
          }
          for (let index = 0; index < selections.length; index++) {
            if (completed.has(index)) continue;
            const selection = selections[index]!;
            await submit('selection', selectionAction, selection.target, {
              selectedIds: selection.selectedIds,
            });
            completed.add(index);
          }
          pendingGroups.current.delete(groupKey);
        }
      : undefined);
  const screenshotCallback: ViewerProps['onScreenshot'] =
    onScreenshot ??
    (available(screenshotAction) && loaded?.target
      ? (screenshot) =>
          submit('screenshot', screenshotAction, screenshot.target, {
            image: screenshot.image,
            mediaType: 'image/png',
            trajectoryIndex: screenshot.trajectoryIndex,
            camera: screenshot.camera,
          })
      : undefined);
  function downloadSource() {
    if (!loaded) return;
    const url = URL.createObjectURL(
      new Blob([loaded.bytes], { type: 'application/octet-stream' }),
    );
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = loaded.asset.source?.name ?? loaded.asset.name;
    anchor.click();
    URL.revokeObjectURL(url);
  }
  if (!loaded)
    return error ? (
      <p role="alert">{error}</p>
    ) : (
      <p>Loading molecular structure…</p>
    );
  return (
    <div className="xyz-plugin" data-testid="xyz-plugin">
      {error && <p role="alert">{error}</p>}
      {loading && !error && <p role="status">Verifying updated structure…</p>}
      <GraphMoleculeViewer
        source={source}
        moleculeId={loaded.target?.objectId ?? loaded.asset.name}
        title={loaded.asset.name}
        presentation={presentation}
        onOpenFile={onOpenFile}
        onReady={onReady}
        extensionHost={host}
        loading={loading}
        onSelectionChange={onSelectionChange}
        onSelectionSubmit={selectionCallback}
        onScreenshot={screenshotCallback}
        onDownloadSource={downloadSource}
        toolbar={(context) => (
          <>
            {context.target &&
              (plugins.extensions?.getViewerToolbar() ?? []).map(
                (contribution) => (
                  <React.Fragment key={contribution.id}>
                    {contribution.render({
                      target: context.target!,
                      selectedIds: context.selectedIds,
                      host,
                    })}
                  </React.Fragment>
                ),
              )}
            {toolbar?.(context)}
          </>
        )}
        rendererSlot={rendererSlot}
      />
      {!selectionCallback && (
        <p>
          Selection submission is unavailable: the host must advertise an action
          and provide an immutable target.
        </p>
      )}
      {!screenshotCallback && (
        <p>
          PNG submission is unavailable: the host must provide an upload
          callback or advertise a PNG input action.
        </p>
      )}
    </div>
  );
}

export const xyzPlugin: FrontendPluginModule = {
  manifest: {
    id: 'elagente.xyz',
    name: 'Molecular structures',
    version: '0.1.1',
    description:
      'Molecular and crystal structures, trajectories, atom selection and screenshots.',
    remoteCodex: '*',
    capabilities: {
      artifactTypes: [
        {
          type: 'chem.structure',
          title: 'Molecular structure',
          fileExtensions: ['xyz', 'extxyz', 'cif', 'pdb', 'sdf', 'mol'],
        },
      ],
      timelineRenderers: ['chem.structure'],
      threadPanels: [],
    },
  },
  renderArtifact: ({ artifact, presentation, onOpenFile, extensionHost }) => (
    <StructureView
      asset={{
        ...(artifact.payload as StructureAsset),
        artifactId: artifact.id,
        metadata:
          artifact.metadata ?? (artifact.payload as StructureAsset).metadata,
      }}
      presentation={presentation}
      onOpenFile={onOpenFile}
      extensionHost={extensionHost}
    />
  ),
};

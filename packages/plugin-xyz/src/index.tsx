import { useEffect, useState } from 'react';
import type { FrontendPluginModule } from '@remote-codex/thread-ui';
import { GraphMoleculeViewer } from '@remote-codex/thread-ui/scientific-viewer';

export interface StructureAsset {
  url: string;
  checksum: string;
  format: 'xyz' | 'extxyz';
  name: string;
}

export function StructureView({ asset, onReady }: {
  asset: StructureAsset;
  onReady?: (view: { captureScreenshot: () => string; trajectoryIndex: number }) => void;
}) {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selection, setSelection] = useState<number[]>([]);
  useEffect(() => {
    const controller = new AbortController();
    setContent(null); setError(null);
    void (async () => {
      const url = new URL(asset.url, window.location.href);
      if (url.origin !== window.location.origin) throw new Error('Structure assets must come from this app-server');
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) throw new Error(`Structure download failed (${response.status})`);
      const bytes = await response.arrayBuffer();
      const digest = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', bytes)), value => value.toString(16).padStart(2, '0')).join('');
      if (digest !== asset.checksum) throw new Error('Structure checksum differs from the published artifact');
      if (!controller.signal.aborted) setContent(new TextDecoder().decode(bytes));
    })().catch(reason => { if (!controller.signal.aborted) setError(String(reason)); });
    return () => controller.abort();
  }, [asset.url, asset.checksum]);
  if (error) return <p role="alert">{error}</p>;
  if (content === null) return <p>Loading molecular structure…</p>;
  return <div className="xyz-plugin" data-testid="xyz-plugin">
    <GraphMoleculeViewer source={{content: [content], format: asset.format, uuid: asset.checksum}}
      moleculeId={asset.name} title={asset.name} className="h-[420px] min-h-[320px]"
      onReady={onReady} onSelectionChange={value => setSelection(value.atoms)} />
    {selection.length > 0 && <p className="text-xs">Selected atom serials: {selection.join(', ')}</p>}
    <a href={asset.url} download={asset.name}>Download published structure</a>
  </div>;
}

export const xyzPlugin: FrontendPluginModule = {
  manifest: {
    id: 'elagente.xyz', name: 'Molecular structures', version: '0.1.0',
    description: 'XYZ and extXYZ structures, trajectories, atom selection and screenshots.', remoteCodex: '*',
    capabilities: {artifactTypes: [{type: 'chem.structure', title: 'Molecular structure', fileExtensions: ['xyz', 'extxyz']}], timelineRenderers: ['chem.structure'], threadPanels: []},
  },
  renderArtifact: ({artifact}) => <StructureView asset={artifact.payload as StructureAsset} />,
};

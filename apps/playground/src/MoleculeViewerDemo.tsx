import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  GraphMoleculeViewer,
  type GraphMoleculeViewerHandle,
} from '@remote-codex/thread-ui/scientific-viewer';
import '@remote-codex/thread-ui/styles.css';
import './styles.css';
import './molecule-viewer-demo.css';

// Explicit demonstration geometries, with no simulated jobs or provenance.
const water =
  '3\nWater demonstration geometry, angstrom\nO 0 0 0\nH 0.9572 0 0\nH -0.239987 0.927297 0\n';
const methane =
  '5\nMethane demonstration geometry, angstrom\nC 0 0 0\nH 0.63 0.63 0.63\nH -0.63 -0.63 0.63\nH -0.63 0.63 -0.63\nH 0.63 -0.63 -0.63\n';
function MoleculeViewerDemo() {
  const [dark, setDark] = useState(false);
  const [frames, setFrames] = useState([
    water,
    water.replace('0.9572', '1.0572'),
  ]);
  const [inspected, setInspected] = useState<GraphMoleculeViewerHandle | null>(
    null,
  );
  const [message, setMessage] = useState('');
  return (
    <main
      data-theme={dark ? 'dark' : 'light'}
      className="thread-ui-shell molecule-demo"
    >
      <header>
        <h1>Molecules in chat</h1>
        <p>Local geometry fixtures · real 3Dmol and production viewer</p>
        <div>
          <button onClick={() => setDark(!dark)}>
            Switch to {dark ? 'light' : 'dark'} theme
          </button>
          <button
            onClick={() =>
              setFrames((current) => [
                ...current,
                water.replace('0.9572', String(0.9572 + current.length * 0.1)),
              ])
            }
          >
            Append trajectory frame
          </button>
          <button
            disabled={!inspected}
            onClick={() => {
              try {
                const snapshot = inspected!.captureView();
                setMessage(
                  `Captured ${snapshot.width} × ${snapshot.height} PNG · frame ${snapshot.trajectoryIndex + 1} · selected ${snapshot.selectedIds.join(', ') || 'none'}`,
                );
              } catch (error) {
                setMessage(String(error));
              }
            }}
          >
            Capture inspected viewer
          </button>
        </div>
        <p role="status">{message}</p>
      </header>
      <article>
        <p>
          Water trajectory. Open full view to measure, change display, or
          inspect coordinates. Personal camera and historical frame remain when
          appending.
        </p>
        <GraphMoleculeViewer
          title="water-trajectory.xyz"
          presentation="timeline"
          source={{ content: frames, uuid: 'demo-water' }}
          onActive={setInspected}
        />
        <p>Methane provides a second independent figure.</p>
        <GraphMoleculeViewer
          title="methane.xyz"
          presentation="timeline"
          source={{ content: [methane], uuid: 'demo-methane' }}
          onActive={setInspected}
        />
      </article>
    </main>
  );
}
createRoot(document.getElementById('root')!).render(<MoleculeViewerDemo />);

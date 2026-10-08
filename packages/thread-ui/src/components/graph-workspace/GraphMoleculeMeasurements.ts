import type { RenderAtom } from './GraphMoleculeViewerRenderTypes';

export type MoleculeMeasurement = { id: number; atomIds: string[] };
export function measureAtoms(atoms: RenderAtom[]): string | null {
  if (atoms.length === 2)
    return `${Math.hypot(atoms[0]!.x - atoms[1]!.x, atoms[0]!.y - atoms[1]!.y, atoms[0]!.z - atoms[1]!.z).toFixed(3)} Å`;
  if (atoms.length !== 3) return null;
  const [a, b, c] = atoms as [RenderAtom, RenderAtom, RenderAtom];
  const u = [a.x - b.x, a.y - b.y, a.z - b.z],
    v = [c.x - b.x, c.y - b.y, c.z - b.z];
  const norm = Math.hypot(...u) * Math.hypot(...v);
  if (!norm) return null;
  return `${((Math.acos(Math.max(-1, Math.min(1, u.reduce((n, x, i) => n + x * v[i]!, 0) / norm))) * 180) / Math.PI).toFixed(1)}°`;
}

/** Hill formula from the rendered atoms, including hidden hydrogens. */
export function moleculeFormula(atoms: RenderAtom[]) {
  const counts = new Map<string, number>();
  for (const atom of atoms)
    if (atom.elem) counts.set(atom.elem, (counts.get(atom.elem) ?? 0) + 1);
  const order = [...counts.keys()].sort();
  if (counts.has('C')) {
    order.splice(order.indexOf('C'), 1);
    if (counts.has('H')) order.splice(order.indexOf('H'), 1);
    order.unshift(...(counts.has('H') ? ['C', 'H'] : ['C']));
  }
  return order.map((element) => ({ element, count: counts.get(element)! }));
}

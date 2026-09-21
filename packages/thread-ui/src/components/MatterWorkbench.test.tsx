/** @vitest-environment jsdom */
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, expect, it, vi } from 'vitest';
import { MatterWorkbench, type MatterWorkbenchOptions } from './MatterWorkbench';

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;
let cleanup = () => {};
afterEach(() => cleanup());
const options: MatterWorkbenchOptions = {
  brandName: 'ElAgente', hideRail: true, showShortcuts: false, showNotifications: false,
  showSearch: false, threads: [], currentKey: '', workspacePath: 'Grafico', favorite: false,
  activeView: 'chat', terminalEnabled: false, notifications: [], unreadCount: 0,
  onViewChange: vi.fn(), onToggleFavorite: vi.fn(), onNavigate: vi.fn(), onSearch: vi.fn(), onReadNotifications: vi.fn(),
};
function mount(extra: Partial<MatterWorkbenchOptions> = {}) {
  Object.defineProperty(window, 'matchMedia', { writable: true, value: vi.fn(() => ({matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn()})) });
  Element.prototype.scrollIntoView = vi.fn();
  const host = document.createElement('div'); document.body.append(host);
  const root = createRoot(host);
  const render = (reveal = 0) => act(() => root.render(<MatterWorkbench options={{...options, ...extra}} title="Molecule" homeHref="/home" settings={<button>Settings</button>} newThread={null} actions={null} threadMenu={null} connection={null} explorer={<span>Files</span>} revealExplorer={reveal}><p>Conversation</p></MatterWorkbench>));
  render(); cleanup = () => {act(() => root.unmount()); host.remove();};
  return { host, render };
}
it('uses host branding and one rail, hiding unsupported capabilities', () => {
  const {host} = mount();
  expect(host.textContent).toContain('ElAgente');
  expect(host.textContent).not.toContain('Remote Codex');
  expect(host.querySelector('.matter-rail')).toBeNull();
  expect(host.querySelector('[aria-label="Notifications"]')).toBeNull();
  expect(host.querySelector('[data-testid="shortcuts"]')).toBeNull();
  expect(host.textContent).toContain('Settings');
});
it('keeps agent navigation usable when collapsed', () => {
  const {host} = mount({renderNavigationHeader: ({collapsed}) => <button title="Grafico">{collapsed ? 'G' : 'Grafico'}</button>});
  act(() => (host.querySelector('[aria-label="Toggle navigation sidebar"]') as HTMLButtonElement).click());
  expect(host.querySelector('[title="Grafico"]')?.textContent).toBe('G');
  expect(host.querySelector('.has-host-navigation.is-sidebar-hidden')).not.toBeNull();
});
it('reveals the workspace on a file-link request and navigates threads via the host', () => {
  const onNavigate = vi.fn();
  const {host, render} = mount({threads: [{key:'t1',title:'Cyclohexane',subtitle:'Grafico',href:'/chat?thread=t1',status:'idle',favorite:false}],onNavigate});
  act(() => (host.querySelector('.matter-thread-row') as HTMLAnchorElement).click());
  expect(onNavigate).toHaveBeenCalledWith('/chat?thread=t1');
  expect(host.querySelector('[aria-label="Explorer"]')).toBeNull();
  render(1);
  expect(host.querySelector('[aria-label="Explorer"]')?.textContent).toContain('Files');
});

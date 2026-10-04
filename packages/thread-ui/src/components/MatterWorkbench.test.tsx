/** @vitest-environment jsdom */
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { MatterWorkbench, type MatterWorkbenchOptions } from './MatterWorkbench';

(globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true;
let cleanup = () => {};
afterEach(() => { cleanup(); vi.restoreAllMocks(); });
beforeEach(() => localStorage.clear());
const options: MatterWorkbenchOptions = {
  brandName: 'ElAgente', hideRail: true, showShortcuts: false, showNotifications: false,
  showSearch: false, threads: [], currentKey: '', workspacePath: 'Grafico', favorite: false,
  activeView: 'chat', terminalEnabled: false, notifications: [], unreadCount: 0,
  onViewChange: vi.fn(), onToggleFavorite: vi.fn(), onNavigate: vi.fn(), onSearch: vi.fn(), onReadNotifications: vi.fn(),
};
function mount(extra: Partial<MatterWorkbenchOptions> = {}, mobile = false) {
  Object.defineProperty(window, 'matchMedia', { writable: true, value: vi.fn(() => ({matches: mobile, addEventListener: vi.fn(), removeEventListener: vi.fn()})) });
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
  expect(host.querySelector('[aria-label="Explorer"]')).not.toBeNull();
  render(1);
  expect(host.querySelector('[aria-label="Explorer"]')?.textContent).toContain('Files');
});

it('retains workspace state across desktop collapse and mobile chat switches', () => {
  const {host} = mount({}, true);
  expect(host.querySelector('[aria-label="Explorer"]')).toBeNull();
  act(() => (host.querySelector('[aria-label="Show workspace"]') as HTMLButtonElement).click());
  const explorer = host.querySelector('[aria-label="Explorer"]') as HTMLElement;
  expect(explorer.hidden).toBe(false);
  expect((host.querySelector('.matter-chat') as HTMLElement).hidden).toBe(true);
  act(() => (host.querySelector('[aria-label="Show chat"]') as HTMLButtonElement).click());
  expect(host.querySelector('[aria-label="Explorer"]')).toBe(explorer);
  expect(explorer.hidden).toBe(true);
  expect(explorer.hasAttribute('inert')).toBe(true);
  act(() => (host.querySelector('[aria-label="Show workspace"]') as HTMLButtonElement).click());
  expect(explorer.hidden).toBe(false);
});
it('persists bounded keyboard resizing and desktop collapse preferences', () => {
  localStorage.setItem('remote-codex.explorer-width', '99999');
  const {host} = mount();
  const resize = host.querySelector('[aria-label="Resize Explorer"]')!;
  const press = (key: string) => act(() => resize.dispatchEvent(new KeyboardEvent('keydown', {key, bubbles:true})));
  expect(resize.getAttribute('aria-valuenow')).toBe('640');
  press('Home');
  expect(resize.getAttribute('aria-valuenow')).toBe('260');
  press('ArrowLeft');
  expect(localStorage.getItem('remote-codex.explorer-width')).toBe('284');
  press('End');
  expect(resize.getAttribute('aria-valuenow')).toBe(resize.getAttribute('aria-valuemax'));
  const workspace = host.querySelector('[aria-label="Explorer"]');
  act(() => (host.querySelector('[aria-label="Toggle Explorer"]') as HTMLButtonElement).click());
  expect((workspace as HTMLElement).hidden).toBe(true);
  expect(localStorage.getItem('remote-codex.explorer-open')).toBe('false');
  cleanup();
  const remount = mount();
  expect(remount.host.querySelector('[aria-label="Toggle Explorer"]')?.getAttribute('aria-expanded')).toBe('false');
});
it('makes mobile navigation modal, cycles focus and restores its opener on Escape and selection', () => {
  const {host} = mount({renderNavigationHeader: ({closeNavigation}) => <button onClick={closeNavigation}>Select agent</button>}, true);
  const toggle = host.querySelector('[aria-label="Toggle navigation sidebar"]') as HTMLButtonElement;
  const sidebar = host.querySelector('.matter-sidebar')!;
  expect(sidebar.hasAttribute('inert')).toBe(true);
  toggle.focus();
  act(() => toggle.click());
  const close = host.querySelector('[aria-label="Close sidebar"]') as HTMLButtonElement;
  expect(document.activeElement).toBe(close);
  expect(sidebar.getAttribute('aria-modal')).toBe('true');
  expect(host.querySelector('main')?.hasAttribute('inert')).toBe(true);
  act(() => close.dispatchEvent(new KeyboardEvent('keydown', {key:'Tab', shiftKey:true, bubbles:true})));
  expect(document.activeElement?.textContent).toContain('Recent chats');
  act(() => sidebar.dispatchEvent(new KeyboardEvent('keydown', {key:'Escape', bubbles:true})));
  expect(document.activeElement).toBe(toggle);
  act(() => toggle.click());
  act(() => Array.from(sidebar.querySelectorAll('button')).find(button => button.textContent === 'Select agent')!.click());
  expect(document.activeElement).toBe(toggle);
});
it('reopens a hidden desktop workspace on an artifact reveal request', () => {
  const {host, render} = mount({defaultExplorerOpen:false});
  expect(host.querySelector('[aria-label="Explorer"]')).toBeNull();
  render(2);
  expect((host.querySelector('[aria-label="Explorer"]') as HTMLElement).hidden).toBe(false);
});

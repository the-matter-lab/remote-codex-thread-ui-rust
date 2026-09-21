import { useEffect, useState, useRef, type ReactNode, type CSSProperties } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  ChevronDown,
  ChevronRight,
  Home,
  MessageSquare,
  PanelLeft,
  PanelRight,
  Search,
  SlidersHorizontal,
  Star,
  Terminal,
  X,
} from 'lucide-react';
import { WorkbenchContext } from './WorkbenchContext';
import { WorkbenchPath } from './WorkbenchPath';

const statusLabels: Record<string, string> = {
  running: 'Running', unread: 'Completed, unread', idle: 'Idle, read',
  failed: 'Failed', interrupted: 'Interrupted', unknown: 'Status unavailable',
};

export interface WorkbenchThread {
  key: string;
  title: string;
  subtitle: string;
  href: string;
  status: string;
  favorite: boolean;
}
export interface WorkbenchNotification {
  id: string;
  title: string;
  href: string;
  occurredAt: string;
  summary?: string;
}
export interface MatterWorkbenchOptions {
  /** Optional host integration; defaults preserve Remote Codex behavior. */
  brandName?: string;
  hideRail?: boolean;
  showShortcuts?: boolean;
  showNotifications?: boolean;
  showSearch?: boolean;
  searchLabel?: string;
  sidebarFooter?: ReactNode;
  renderNavigationHeader?: (input: { collapsed: boolean; closeNavigation: () => void }) => ReactNode;
  emptyWorkspace?: boolean;
  navigationReady?: boolean;
  harnessSessionId?: string | null;
  harnessSessionUrl?: string | null;
  threads: WorkbenchThread[];
  workspaceThreads?: WorkbenchThread[];
  currentKey: string;
  favorite: boolean;
  favoriteBusy?: boolean;
  error?: string | null;
  workspacePath: string;
  activeView: 'chat' | 'shell';
  terminalEnabled: boolean;
  onViewChange: (view: 'chat' | 'shell') => void;
  onToggleFavorite: () => void;
  onNavigate: (href: string) => void;
  onSearch: () => void;
  notifications: WorkbenchNotification[];
  unreadCount: number;
  onReadNotifications: () => void;
  renderThreadMenu?: (thread: WorkbenchThread) => ReactNode;
}

export function MatterWorkbench({
  options: o,
  title,
  homeHref,
  settings,
  newThread,
  actions,
  threadMenu,
  connection,
  explorer,
  revealExplorer,
  children,
}: {
  options: MatterWorkbenchOptions;
  title: string;
  homeHref: string;
  settings: ReactNode;
  newThread: ReactNode;
  actions: ReactNode;
  threadMenu: ReactNode;
  connection: ReactNode;
  explorer: ReactNode;
  revealExplorer: number;
  children: ReactNode;
}) {
  const tabs = o.workspaceThreads ?? o.threads.filter(thread => thread.key === o.currentKey);
  const tabsRef = useRef<HTMLElement>(null);
  useEffect(() => {
    tabsRef.current?.querySelector('[aria-current="page"]')?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [o.currentKey, tabs.length]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [mobile, setMobile] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 639px)').matches,
  );
  useEffect(() => {
    const query = window.matchMedia('(max-width: 639px)');
    const change = () => setMobile(query.matches);
    query.addEventListener('change', change);
    return () => query.removeEventListener('change', change);
  }, []);
  const [shortcutsOpen, setShortcutsOpen] = useState(true);
  const [recentsOpen, setRecentsOpen] = useState(true);
  const [bellOpen, setBellOpen] = useState(false);
  const [toolbarOpen, setToolbarOpen] = useState(false);
  const [explorerOpen, setExplorerOpen] = useState(false);
  const [explorerWidth, setExplorerWidth] = useState(() => {
    try { return Math.max(260, Math.min(800, Number(localStorage.getItem('remote-codex.explorer-width')) || 360)); } catch { return 360; }
  });
  const contentRef = useRef<HTMLDivElement>(null);
  const resizeOrigin = useRef<{ x: number; width: number } | null>(null);
  const resizeExplorer = (width: number) => {
    const max = Math.max(260, (contentRef.current?.clientWidth ?? 1000) - 320);
    const next = Math.round(Math.max(260, Math.min(max, width)));
    setExplorerWidth(next);
    try { localStorage.setItem('remote-codex.explorer-width', String(next)); } catch { /* Optional preference. */ }
  };
  const [lastReveal, setLastReveal] = useState(revealExplorer);
  if (lastReveal !== revealExplorer) {
    setLastReveal(revealExplorer);
    if (revealExplorer > 0) setExplorerOpen(true);
  }
  const navigate = (href: string) => {
    setSidebarOpen(false);
    setBellOpen(false);
    o.onNavigate(href);
  };
  const renderThread = (thread: WorkbenchThread) => (
    <div key={thread.key} className="matter-thread-entry">
    <a
      href={thread.href}
      onClick={(e) => {
        e.preventDefault();
        navigate(thread.href);
      }}
      className="matter-thread-row"
      aria-current={thread.key === o.currentKey ? 'page' : undefined}
      title={`${thread.title}\n${thread.subtitle} · ${statusLabels[thread.status] ?? thread.status}`}
    >
      <span
        className="matter-status-dot"
        data-status={thread.status}
        role="img"
        aria-label={statusLabels[thread.status] ?? thread.status}
      />
      <span className="matter-thread-copy">
        <span>{thread.title}</span>
        <small>{thread.subtitle}</small>
      </span>
    </a>
    {o.renderThreadMenu?.(thread)}
    </div>
  );
  return (
    <div
      className={`matter-workbench ${sidebarHidden ? 'is-sidebar-hidden' : ''} ${o.hideRail ? 'has-host-rail' : ''} ${o.renderNavigationHeader ? 'has-host-navigation' : ''}`}
      onClick={(e) => {
        if (
          e.target instanceof Element &&
          !e.target.closest('.matter-thread-menu')
        ) {
          e.currentTarget
            .querySelector('.matter-thread-menu[open]')
            ?.removeAttribute('open');
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          setBellOpen(false);
          setSidebarOpen(false);
          e.currentTarget
            .querySelector('.matter-thread-menu[open]')
            ?.removeAttribute('open');
        }
      }}
    >
      {!mobile && !o.hideRail && <nav className="matter-rail" aria-label="Workspace tools">
        <a
          className="matter-brand"
          href={homeHref}
          aria-label={`${o.brandName ?? "Remote Codex"} home`}
        >
          {o.brandName ? o.brandName.slice(0, 1) : <>r<span>c</span></>}
        </a>
        <button
          aria-label="Chat"
          aria-pressed={o.activeView === 'chat'}
          onClick={() => o.onViewChange('chat')}
        >
          <MessageSquare />
        </button>
        {o.terminalEnabled && (
          <button
            aria-label="Terminal"
            aria-pressed={o.activeView === 'shell'}
            onClick={() => o.onViewChange('shell')}
          >
            <Terminal />
          </button>
        )}
        <div className="matter-rail-bottom">{settings}</div>
      </nav>}
      <header className="matter-topbar">
        <button
          aria-label="Toggle navigation sidebar"
          aria-expanded={mobile ? sidebarOpen : !sidebarHidden}
          onClick={() => {
            if (mobile) setSidebarOpen(!sidebarOpen);
            else setSidebarHidden(!sidebarHidden);
          }}
        >
          <PanelLeft />
        </button>
        <span className="matter-topbar-brand">{o.brandName ?? "Remote Codex"}</span>
        <span className="matter-topbar-separator" />
        <button aria-label="Go back" onClick={() => history.back()}>
          <ArrowLeft />
        </button>
        <button aria-label="Go forward" onClick={() => history.forward()}>
          <ArrowRight />
        </button>
        <a href={homeHref} aria-label="Back to workspaces" title="Workspaces">
          <Home />
        </a>
        {o.showSearch !== false && <button
          className="matter-search-trigger"
          aria-label={o.searchLabel ?? "Search conversation"}
          disabled={o.emptyWorkspace}
          onClick={o.onSearch}
        >
          <Search />
          <span>{o.searchLabel ?? "Search conversation"}</span>
        </button>}
        <div className="matter-topbar-end">
          {mobile && <>
            <button aria-label="Chat" aria-pressed={o.activeView === 'chat'} onClick={() => o.onViewChange('chat')}><MessageSquare /></button>
            {o.terminalEnabled && <button aria-label="Terminal" aria-pressed={o.activeView === 'shell'} onClick={() => o.onViewChange('shell')}><Terminal /></button>}
          </>}
          {(mobile || o.hideRail) && settings}
          <div className="matter-connection">{connection}</div>
          {o.showNotifications !== false && <button
            aria-label="Notifications"
            aria-expanded={bellOpen}
            onClick={() => {
              setBellOpen(!bellOpen);
              o.onReadNotifications();
            }}
          >
            <Bell />
            {o.unreadCount > 0 && <span className="matter-unread" />}
          </button>}
        </div>
      </header>
      {sidebarOpen && (
        <button
          className="matter-sidebar-scrim"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside
        className={`matter-sidebar ${sidebarOpen ? 'is-open' : ''}`}
        aria-label="Thread navigation"
      >
        <div className="matter-sidebar-heading">
          <span>Workspace</span>
          <button
            className="matter-mobile-close"
            aria-label="Close sidebar"
            onClick={() => setSidebarOpen(false)}
          >
            <X />
          </button>
        </div>
        {o.renderNavigationHeader?.({ collapsed: !mobile && sidebarHidden, closeNavigation: () => setSidebarOpen(false) })}
        {o.error && (
          <p className="matter-sidebar-error" role="alert">
            {o.error}
          </p>
        )}
        {o.showShortcuts !== false && <button
          className="matter-section-heading"
          aria-expanded={shortcutsOpen}
          onClick={() => setShortcutsOpen(!shortcutsOpen)}
        >
          {shortcutsOpen ? <ChevronDown /> : <ChevronRight />}
          <span>Shortcuts</span>
          <Star />
        </button>}
        {o.showShortcuts !== false && shortcutsOpen && (
          <div className="matter-thread-section" data-testid="shortcuts">
            {o.threads.filter((t) => t.favorite).map(renderThread)}
            {!o.threads.some((t) => t.favorite) && (
              <p className="matter-sidebar-hint">
                Star a thread to keep it close.
                <br />
                Across workspaces and devices.
              </p>
            )}
          </div>
        )}
        <button
          className="matter-section-heading"
          aria-expanded={recentsOpen}
          onClick={() => setRecentsOpen(!recentsOpen)}
        >
          {recentsOpen ? <ChevronDown /> : <ChevronRight />}
          <span>Recent chats</span>
          <span className="matter-section-count">{o.threads.length}</span>
        </button>
        {recentsOpen && (
          <div className="matter-thread-section" data-testid="recent-chats">
            {o.threads.map(renderThread)}
          </div>
        )}
        <div className="matter-sidebar-footer">
          {o.sidebarFooter ?? "Your conversations, together."}
        </div>
      </aside>
      <main className="matter-main">
        <div className="matter-tabs-row">
        <nav ref={tabsRef} className="matter-thread-tabs" aria-label="Workspace threads">
          {tabs.map((t) => (
            <a
              key={t.key}
              href={t.href}
              aria-current={t.key === o.currentKey ? 'page' : undefined}
              onClick={(e) => {
                e.preventDefault();
                navigate(t.href);
              }}
              title={t.title}
            >
              <span className="matter-status-dot" data-status={t.status} role="img" aria-label={statusLabels[t.status] ?? t.status} />
              <span>{t.title}</span>
            </a>
          ))}
          {newThread}
        </nav>
        {!o.emptyWorkspace && <button className="matter-toolbar-toggle" aria-label="Thread tools" aria-expanded={toolbarOpen} aria-controls="matter-thread-tools" onClick={() => setToolbarOpen(open => !open)} title={toolbarOpen ? 'Hide thread tools' : 'Show thread tools'}><SlidersHorizontal /></button>}
        {toolbarOpen && <div className="matter-breadcrumb" id="matter-thread-tools">
          <WorkbenchPath path={o.workspacePath} />
          <ChevronRight />
          <span className="matter-current-title" title={title}>
            {title}
          </span>
          {o.showShortcuts !== false && <button
            aria-label={o.favorite ? 'Remove shortcut' : 'Add shortcut'}
            aria-pressed={o.favorite}
            disabled={o.favoriteBusy}
            onClick={o.onToggleFavorite}
          >
            <Star fill={o.favorite ? 'currentColor' : 'none'} />
          </button>}
          <div className="matter-thread-actions">
            {actions}
            {threadMenu}
            <button
              aria-label="Toggle Explorer"
              aria-expanded={explorerOpen}
              onClick={() => setExplorerOpen(!explorerOpen)}
            >
              <PanelRight />
            </button>
          </div>
        </div>}
        </div>
        <div ref={contentRef} style={{ '--explorer-width': `${explorerWidth}px` } as CSSProperties} className={`matter-content ${explorerOpen ? 'has-explorer' : ''}`}>
          <div className="matter-chat">
            <WorkbenchContext.Provider value={true}>
              {children}
            </WorkbenchContext.Provider>
          </div>
          {explorerOpen && (
            <aside className="matter-explorer" aria-label="Explorer">
              {!mobile && <div role="separator" aria-label="Resize Explorer" aria-orientation="vertical" aria-valuemin={260} aria-valuemax={Math.max(260, (contentRef.current?.clientWidth ?? 1000) - 320)} aria-valuenow={explorerWidth} tabIndex={0} className="matter-explorer-resize"
                onPointerDown={e => { e.preventDefault(); e.currentTarget.setPointerCapture(e.pointerId); resizeOrigin.current = { x: e.clientX, width: explorerWidth }; }}
                onPointerMove={e => { if (resizeOrigin.current) resizeExplorer(resizeOrigin.current.width + resizeOrigin.current.x - e.clientX); }}
                onPointerUp={e => { resizeOrigin.current = null; e.currentTarget.releasePointerCapture(e.pointerId); }}
                onLostPointerCapture={() => { resizeOrigin.current = null; }}
                onKeyDown={e => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); resizeExplorer(explorerWidth + (e.key === 'ArrowLeft' ? 24 : -24)); } }}
              />}
              <div className="matter-explorer-heading">
                Explorer
                <button
                  aria-label="Close Explorer"
                  onClick={() => setExplorerOpen(false)}
                >
                  <X />
                </button>
              </div>
              {explorer}
            </aside>
          )}
        </div>
      </main>
      {bellOpen && (
        <>
          <button
            className="matter-popover-scrim"
            aria-label="Close notifications"
            onClick={() => setBellOpen(false)}
          />
          <section
            className="matter-notifications"
            aria-label="Notifications"
            onKeyDown={(e) => {
              if (e.key === 'Escape') setBellOpen(false);
            }}
          >
            <div className="matter-notifications-heading">
              Notifications
              <button
                aria-label="Close notification panel"
                onClick={() => setBellOpen(false)}
              >
                <X />
              </button>
            </div>
            {o.notifications.length ? (
              [...o.notifications].sort((a, b) => Date.parse(b.occurredAt) - Date.parse(a.occurredAt)).slice(0, 10).map((n) => (
                <a
                  key={n.id}
                  href={n.href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(n.href);
                  }}
                >
                  <span className="matter-status-dot" data-status="completed" />
                  <span>
                    {n.title}
                    {n.summary && <p className="matter-notification-summary">{n.summary}</p>}
                    <small>{new Date(n.occurredAt).toLocaleString()}</small>
                  </span>
                </a>
              ))
            ) : (
              <p>All caught up. Completed threads will appear here.</p>
            )}
          </section>
        </>
      )}
    </div>
  );
}

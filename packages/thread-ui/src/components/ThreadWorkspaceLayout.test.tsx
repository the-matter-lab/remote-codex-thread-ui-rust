/**
 * @vitest-environment jsdom
 */
import { act, type ReactNode } from 'react';
import { flushSync } from 'react-dom';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { ThreadWorkspaceLayout } from './ThreadWorkspaceLayout';

let root: Root | null = null;
let container: HTMLDivElement | null = null;

function mockViewport(mobile: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn((query: string) => ({
      matches: query.includes('max-width') ? mobile : false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

function mockViewportWidth(width: number) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn((query: string) => {
      const maxWidth = /max-width:\s*(\d+)px/.exec(query)?.[1];
      return {
        matches: maxWidth ? width <= Number(maxWidth) : false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn(),
      };
    }),
  });
}

function render(node: ReactNode) {
  container = document.createElement('div');
  document.body.append(container);
  root = createRoot(container);
  flushSync(() => {
    root?.render(node);
  });
  return container;
}

function renderLayout() {
  return render(
    <ThreadWorkspaceLayout
      threads={[]}
      status={{
        state: 'ready',
        transport: 'sdk',
        lastStartedAt: null,
        lastError: null,
        restartCount: 0,
      }}
      workspaceContent={<div data-testid="workspace-content">Workspace</div>}
    >
      <div data-testid="chat-content">Chat</div>
    </ThreadWorkspaceLayout>,
  );
}

function renderLayoutWithActions() {
  return render(
    <ThreadWorkspaceLayout
      threads={[]}
      status={{
        state: 'ready',
        transport: 'sdk',
        lastStartedAt: null,
        lastError: null,
        restartCount: 0,
      }}
      threadActionsButton={
        <button type="button" aria-label="Thread actions">
          Actions
        </button>
      }
      workspaceContent={<div data-testid="workspace-content">Workspace</div>}
    >
      <div data-testid="chat-content">Chat</div>
    </ThreadWorkspaceLayout>,
  );
}

describe('ThreadWorkspaceLayout', () => {
  beforeEach(() => {
    mockViewport(false);
  });

  afterEach(() => {
    if (root) {
      flushSync(() => {
        root?.unmount();
      });
    }
    root = null;
    container?.remove();
    container = null;
    vi.restoreAllMocks();
  });

  it('defaults desktop thread entry to chat with workspace collapsed', () => {
    const element = renderLayout();

    expect(element.querySelector('[data-testid="chat-content"]')).toBeTruthy();
    expect(
      element.querySelector('[data-testid="workspace-content"]'),
    ).toBeNull();
    expect(
      element.querySelector('[aria-label="Expand workspace"]'),
    ).toBeTruthy();
  });

  it('keeps host navigation in the sidebar and supplies its collapsed state', () => {
    const element = render(
      <ThreadWorkspaceLayout threads={[]} navigationTitle="ElAgente"
        renderNavigationHeader={({collapsed}) => <nav aria-label="Agents">{collapsed ? 'G' : 'Grafico'}</nav>}>
        <div>Chat</div>
      </ThreadWorkspaceLayout>,
    );
    expect(element.querySelector('.thread-topbar-row [aria-label="Agents"]')).toBeNull();
    expect(element.querySelector('[aria-label="Agents"]')?.textContent).toBe('Grafico');
    flushSync(() => element.querySelector<HTMLButtonElement>('[aria-label="Collapse rooms"]')!.click());
    expect(element.querySelector('[aria-label="Agents"]')?.textContent).toBe('G');
  });

  it('lets host navigation close the mobile drawer', () => {
    mockViewport(true);
    const selectAgent = vi.fn();
    const element = render(
      <ThreadWorkspaceLayout threads={[]} renderNavigationHeader={({closeNavigation}) => (
        <button onClick={() => {selectAgent(); closeNavigation();}}>Choose Grafico</button>
      )}><div>Chat</div></ThreadWorkspaceLayout>,
    );
    const open = element.querySelector<HTMLButtonElement>('[aria-label="Open rooms"]')!;
    expect(element.querySelector('aside')?.hasAttribute('inert')).toBe(true);
    open.focus();
    flushSync(() => open.click());
    expect(element.querySelector('aside')?.hasAttribute('inert')).toBe(false);
    expect(document.activeElement?.getAttribute('aria-label')).toBe('Close rooms');
    const agent = Array.from(element.querySelectorAll('button')).find(button => button.textContent === 'Choose Grafico')!;
    flushSync(() => agent.click());
    expect(selectAgent).toHaveBeenCalledOnce();
    expect(open.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(open);
  });

  it('reveals the desktop workspace when a file focus request arrives', async () => {
    const status = {
      state: 'ready' as const,
      transport: 'sdk' as const,
      lastStartedAt: null,
      lastError: null,
      restartCount: 0,
    };
    const layout = (workspaceRevealRequestKey?: number) => (
      <ThreadWorkspaceLayout
        threads={[]}
        status={status}
        workspaceContent={<div data-testid="workspace-content">Workspace</div>}
        {...(workspaceRevealRequestKey !== undefined
          ? { workspaceRevealRequestKey }
          : {})}
      >
        <div data-testid="chat-content">Chat</div>
      </ThreadWorkspaceLayout>
    );
    const element = render(layout());

    expect(
      element.querySelector('[data-testid="workspace-content"]'),
    ).toBeNull();

    await act(async () => {
      root?.render(layout(1));
    });

    expect(
      element.querySelector('[data-testid="workspace-content"]'),
    ).toBeTruthy();
    expect(element.querySelector('[aria-label="Expand workspace"]')).toBeNull();
  });

  it('defaults mobile thread entry to chat while keeping workspace switchable', () => {
    mockViewport(true);
    const element = renderLayout();

    expect(element.querySelector('[data-testid="chat-content"]')).toBeTruthy();
    expect(
      element.querySelector('[data-testid="workspace-content"]'),
    ).toBeNull();
    expect(element.querySelector('.thread-mobile-chat-hidden')).toBeNull();
    expect(
      element.querySelector('.thread-mobile-workspace-hidden'),
    ).toBeTruthy();
    const showWorkspace = element.querySelector<HTMLButtonElement>('[aria-label="Show workspace"]');
    expect(showWorkspace).toBeTruthy();
    flushSync(() => showWorkspace!.click());
    expect(element.querySelector('[data-testid="workspace-content"]')).toBeTruthy();
    expect(element.querySelector('.thread-mobile-chat-hidden')).toBeTruthy();
  });

  it('renders thread actions in the mobile topbar', () => {
    mockViewport(true);
    const element = renderLayoutWithActions();

    expect(element.querySelector('[aria-label="Thread actions"]')).toBeTruthy();
  });

  it('puts mobile navigation first and settings in the expanded rail header', () => {
    mockViewport(true);
    const element = render(
      <ThreadWorkspaceLayout threads={[]} currentThreadLabel="A long thread title" globalSettingsContent={<div>Host settings</div>}>
        <div>Chat</div>
      </ThreadWorkspaceLayout>,
    );
    const topbar = element.querySelector('.thread-topbar-row')!;
    const open = topbar.querySelector<HTMLButtonElement>('[aria-label="Open rooms"]')!;
    expect(topbar.querySelector('button')).toBe(open);
    expect(topbar.querySelector('[aria-label="Open settings"]')).toBeNull();
    expect(topbar.querySelector('h1 button')).toBeNull();
    expect(topbar.querySelector('h1')?.textContent).toBe('A long thread title');
    expect(element.querySelector('.thread-rooms-rail-header [aria-label="Open settings"]')).toBeTruthy();
    flushSync(() => open.click());
    expect(open.getAttribute('aria-expanded')).toBe('true');
    flushSync(() => element.querySelector<HTMLButtonElement>('[aria-label="Close rooms"]')!.click());
    expect(open.getAttribute('aria-expanded')).toBe('false');
  });

  it('keeps desktop settings in the topbar', () => {
    const element = render(
      <ThreadWorkspaceLayout threads={[]} globalSettingsContent={<div>Host settings</div>}>
        <div>Chat</div>
      </ThreadWorkspaceLayout>,
    );
    expect(element.querySelector('.thread-topbar-row [aria-label="Open settings"]')).toBeTruthy();
    expect(element.querySelector('.thread-rooms-rail-header [aria-label="Open settings"]')).toBeNull();
    expect(element.querySelector('[aria-label="Open rooms"]')).toBeNull();
  });

  it('uses a switchable workspace focus view at tablet widths', () => {
    mockViewportWidth(900);
    const element = renderLayout();

    expect(element.querySelector('[data-testid="chat-content"]')).toBeTruthy();
    // The workspace is lazy-mounted on first use, on mobile and tablet alike.
    expect(element.querySelector('[data-testid="workspace-content"]')).toBeNull();

    flushSync(() => {
      element
        .querySelector<HTMLButtonElement>('[aria-label="Show workspace"]')
        ?.click();
    });

    expect(
      element
        .querySelector('[data-testid="workspace-content"]')
        ?.closest('.block'),
    ).toBeTruthy();
    expect(
      element
        .querySelector('[data-testid="chat-content"]')
        ?.closest('.hidden'),
    ).toBeTruthy();
  });

  it('shows the complete usage summary without truncating it', () => {
    const usage =
      'in 143k / out 27 / cache read 119k / cache write 23.9k / cost $0.072';
    const element = render(
      <ThreadWorkspaceLayout
        threads={[]}
        currentWorkspaceLabel="el-agente-cloud-infrastructure"
        harnessLabel="Grok Build"
        sessionLabel="session-1"
        usageLabel={usage}
        status={{
          state: 'ready',
          transport: 'sdk',
          lastStartedAt: null,
          lastError: null,
          restartCount: 0,
        }}
      >
        <div>Chat</div>
      </ThreadWorkspaceLayout>,
    );

    const topbarMetadata = element.querySelector<HTMLButtonElement>(
      '[title="Session and usage"]',
    );
    expect(topbarMetadata?.textContent).toContain(
      'Grok Build·el-agente-cloud-infrastructure',
    );
    expect(topbarMetadata?.textContent).not.toContain('Room');

    flushSync(() => {
      element
        .querySelector<HTMLButtonElement>('[title="Session and usage"]')
        ?.click();
    });
    const usageValue = element.querySelector(
      '[title="Session token usage and estimated cost"] span:last-child',
    );
    expect(usageValue?.textContent).toBe(usage);
    expect(usageValue?.className).toContain('whitespace-normal');
    expect(usageValue?.className).not.toContain('truncate');
  });

  it('renders host-provided new chat dialog content', () => {
    const element = render(
      <ThreadWorkspaceLayout
        threads={[]}
        status={{
          state: 'ready',
          transport: 'sdk',
          lastStartedAt: null,
          lastError: null,
          restartCount: 0,
        }}
        currentWorkspaceId="workspace-1"
        workspaceContent={<div data-testid="workspace-content">Workspace</div>}
        renderNewThreadDialogContent={({ currentWorkspaceId }) => (
          <div data-testid="host-new-thread-form">
            Host form for {currentWorkspaceId}
          </div>
        )}
      >
        <div data-testid="chat-content">Chat</div>
      </ThreadWorkspaceLayout>,
    );

    const button = element.querySelector('[title="New Chat"]');
    expect(button).toBeTruthy();
    flushSync(() => {
      button?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(
      document.querySelector('[data-testid="host-new-thread-form"]')
        ?.textContent,
    ).toContain('workspace-1');
    expect(document.querySelector('[aria-label="Chat name"]')).toBeNull();
  });

  it('hides multi-thread navigation in embedded single-thread layouts', () => {
    mockViewport(true);
    const element = render(
      <ThreadWorkspaceLayout
        threads={[]}
        status={{
          state: 'ready',
          transport: 'sdk',
          lastStartedAt: null,
          lastError: null,
          restartCount: 0,
        }}
        hideRoomsRail
        workspaceContent={<div data-testid="workspace-content">Workspace</div>}
      >
        <div data-testid="chat-content">Chat</div>
      </ThreadWorkspaceLayout>,
    );

    expect(element.querySelector('.thread-rooms-rail')).toBeNull();
    expect(element.querySelector('[aria-label="Open rooms"]')).toBeNull();
    expect(element.querySelector('[title="New Chat"]')).toBeNull();
    expect(element.querySelector('.thread-shell-frame')?.className).toContain(
      'is-rail-hidden',
    );
  });
});

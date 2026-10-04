/**
 * @vitest-environment jsdom
 */
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";

import { GraphChatCompactMessageItem } from "./GraphChatCompactMessageItem";

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;

let cleanup: (() => void) | null = null;

afterEach(() => {
  cleanup?.();
  cleanup = null;
  vi.restoreAllMocks();
});

describe("GraphChatCompactMessageItem", () => {
  it("does not put running dots on already emitted agent messages", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    cleanup = () => { root.unmount(); container.remove(); };
    await act(async () => root.render(<GraphChatCompactMessageItem item={{id:'old',kind:'agentMessage',text:'Previous checkpoint',status:'running'}} scrollRootRef={{current:null}} />));
    expect(container.textContent).toContain('Previous checkpoint');
    expect(container.querySelector('.thread-graph-message-status')).toBeNull();
  });

  it("does not mount reasoning-summary content until its toggle is opened", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    cleanup = () => {
      root.unmount();
      container.remove();
    };

    await act(async () => {
      root.render(
        <GraphChatCompactMessageItem
          item={{
            id: "agent-1",
            kind: "agentMessage",
            text: "Done",
            reasoningItems: [
              {
                id: "reasoning-1",
                kind: "reasoning",
                text: "Inspect the failing command first.",
              },
            ],
          }}
          scrollRootRef={{ current: null }}
        />,
      );
    });

    expect(container.textContent).not.toContain(
      "Inspect the failing command first.",
    );
    const toggle = container.querySelector<HTMLButtonElement>(
      '[aria-label="Show reasoning summary"]',
    );
    expect(toggle).toBeTruthy();

    await act(async () => {
      toggle?.click();
    });

    expect(container.textContent).toContain(
      "Inspect the failing command first.",
    );
  });

  it("replaces the copy icon with a check after copying an agent reply", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    cleanup = () => {
      root.unmount();
      container.remove();
    };

    await act(async () => {
      root.render(
        <GraphChatCompactMessageItem
          threadId="thread-1"
          item={{
            id: "agent-1",
            kind: "agentMessage",
            text: "Done",
            createdAt: null,
          }}
          scrollRootRef={{ current: null }}
        />,
      );
    });

    const copyButton = container.querySelector<HTMLButtonElement>(
      '[aria-label="Copy agent reply"]',
    );
    expect(copyButton?.querySelector(".lucide-copy")).toBeTruthy();
    await act(async () => {
      copyButton?.click();
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("Done");
    expect(copyButton?.querySelector(".lucide-check")).toBeTruthy();
  });

  it("shares one floating copy control across desktop and mobile", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    cleanup = () => {
      root.unmount();
      container.remove();
    };

    await act(async () => {
      root.render(
        <GraphChatCompactMessageItem
          item={{
            id: "user-1",
            kind: "userMessage",
            text: "line one\nline two",
          }}
          scrollRootRef={{ current: null }}
          timeLabel="11:28 AM"
          timeTitle="September 2, 2026 at 11:28:00 AM"
        />,
      );
    });

    const copyButtons = Array.from(
      container.querySelectorAll<HTMLButtonElement>(
        '[aria-label="Copy prompt"]',
      ),
    );
    expect(copyButtons).toHaveLength(1);
    expect(
      copyButtons[0]?.closest(".thread-graph-message-copy-desktop"),
    ).not.toBeNull();
    expect(
      container.querySelector(".thread-graph-message-bubble.is-user")
        ?.textContent,
    ).toBe("line one\nline two");

    await act(async () => {
      copyButtons[0]?.click();
    });
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      "line one\nline two",
    );
  });

  it("keeps timestamp visible and reveals actions after touch", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    cleanup = () => {
      root.unmount();
      container.remove();
    };

    await act(async () => {
      root.render(
        <GraphChatCompactMessageItem
          item={{ id: "agent-1", kind: "agentMessage", text: "Done" }}
          scrollRootRef={{ current: null }}
          timeLabel="11:28:07 AM"
          timeTitle="September 2, 2026 at 11:28:07 AM"
        />,
      );
    });

    const bubble = container.querySelector<HTMLElement>(
      ".thread-graph-message-bubble.is-assistant",
    );
    const timestamp = container.querySelector<HTMLElement>(
      ".thread-graph-message-time-row",
    );
    const touchEvent = new MouseEvent("click", { bubbles: true });
    Object.defineProperty(touchEvent, "pointerType", { value: "touch" });

    await act(async () => {
      bubble?.dispatchEvent(touchEvent);
    });

    expect(timestamp?.textContent).toBe("11:28:07 AM");
    expect(bubble?.dataset.touchActions).toBe("true");
  });
});

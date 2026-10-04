/** @vitest-environment jsdom */
import { act } from "react";
import { createRoot } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import {
  EXTENSION_FIXTURES,
  type ThreadHistoryItemDto,
  type ThreadTurnDto,
  type StructuredUsage,
} from "@remote-codex/shared";
import { ThreadTimeline } from "../ThreadTimeline";
import { mergeLiveTurnItems, type TimelineUsageByScope } from "./timelineItems";
import { latestUsage, progressEvidence } from "./structuredEvidence";
import { StructuredUsageInline } from "./StructuredUsageInline";
import { TurnUsageInline } from "./TurnUsageInline";

(
  globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;
let cleanup: (() => Promise<void>) | undefined;
afterEach(async () => {
  await cleanup?.();
  cleanup = undefined;
});

function item(agent: "grafico" | "cuantico" = "grafico"): ThreadHistoryItemDto {
  return {
    id: "tool-fixture-1",
    kind: "toolCall",
    text: "Scientific calculation",
    progress: EXTENSION_FIXTURES[agent].progress,
  };
}
function turn(
  items: ThreadHistoryItemDto[],
  status: ThreadTurnDto["status"] = "completed",
): ThreadTurnDto {
  return {
    id: "turn-fixture-1",
    status,
    startedAt: "2026-10-04T00:00:00.000Z",
    completedAt: status === "inProgress" ? null : "2026-10-04T00:00:01.000Z",
    error: null,
    items,
  };
}
type UsageTurn = ThreadTurnDto & { usageByScope?: TimelineUsageByScope };
async function mount(value: UsageTurn, liveItems?: ThreadHistoryItemDto[]) {
  const container = document.createElement("div");
  document.body.append(container);
  const root = createRoot(container);
  const render = async (next: UsageTurn, live?: ThreadHistoryItemDto[]) => {
    await act(async () =>
      root.render(
        <ThreadTimeline
          threadId="thr-fixture"
          turns={[next]}
          liveOutput=""
          autoCollapseCompletedTurns={false}
          liveItems={live ? { turnId: next.id, items: live } : null}
        />,
      ),
    );
  };
  cleanup = async () => {
    await act(async () => root.unmount());
    container.remove();
  };
  await render(value, liveItems);
  return { container, render };
}

describe("W5 tool evidence and usage (G10 G11 G12 G14 G17 G41 G43)", () => {
  it.each(["grafico", "cuantico"] as const)(
    "renders the same frozen %s tool contract",
    async (agent) => {
      const { container } = await mount(turn([item(agent)]));
      const tool = container.querySelector<HTMLDetailsElement>(
        '[data-tool-call-id="tool-fixture-1"]',
      )!;
      expect(tool.querySelector("summary")?.textContent).toContain("Completed");
      await act(async () => {
        tool.open = true;
      });
      expect(
        tool.querySelector('[aria-label="Tool arguments"]')?.textContent,
      ).toContain('"precision": "standard"');
      expect(
        tool.querySelector('[aria-label="Tool result summary"]')?.textContent,
      ).toContain("Two immutable frames");
      expect(
        tool.querySelector('[aria-label="Tool log summary"]')?.textContent,
      ).toContain("Task complete");
      expect(tool.textContent).toContain("Full artifacts:");
    },
  );

  it("keeps one open tool with arguments and cumulative logs through streamed and terminal updates", async () => {
    const initial = {
      ...item(),
      progress: { ...item().progress!, status: "running" as const },
    };
    delete initial.progress.completedAt;
    const active = turn([initial], "inProgress");
    const { container, render } = await mount(active);
    const tool = container.querySelector<HTMLDetailsElement>(
      "[data-tool-call-id]",
    )!;
    await act(async () => {
      tool.open = true;
    });
    const update: ThreadHistoryItemDto = {
      id: initial.id,
      kind: initial.kind,
      text: "",
      progress: {
        version: 1,
        callId: initial.progress.callId,
        label: "Scientific calculation",
        status: "running",
        logSummary: "Frame 1\nFrame 2",
      },
    };
    await render(active, [update]);
    expect(container.querySelectorAll("[data-tool-call-id]")).toHaveLength(1);
    expect(container.querySelector("[data-tool-call-id]")).toBe(tool);
    expect(tool.open).toBe(true);
    expect(tool.textContent).toContain("precision");
    expect(
      tool.querySelector('[aria-label="Tool log summary"]')?.textContent,
    ).toContain("Frame 1\nFrame 2");
    await render(turn([initial], "interrupted"), [
      {
        ...update,
        progress: {
          ...update.progress!,
          status: "interrupted",
          completedAt: "2026-10-04T00:00:01.000Z",
        },
      },
    ]);
    expect(tool.querySelector("summary")?.textContent).toContain("Interrupted");
    expect(container.textContent).not.toContain("Working");
    expect(container.querySelector(".thread-graph-turn-footer")).toBeNull();
  });

  it.each(["completed", "failed", "interrupted"] as const)(
    "does not regress %s progress after stale running replay",
    (status) => {
      const previous = { ...item(), progress: { ...item().progress!, status } };
      const next: ThreadHistoryItemDto = {
        id: previous.id,
        kind: "toolCall",
        text: "",
        progress: {
          version: 1,
          callId: previous.progress.callId,
          label: "Scientific calculation",
          status: "running",
        },
      };
      const merged = mergeLiveTurnItems([previous], [next])[0]!;
      expect(progressEvidence(merged).data).toEqual(previous.progress);
    },
  );

  it("rejects malformed or unknown tool versions visibly", async () => {
    const malformed = {
      ...item(),
      progress: { ...item().progress!, version: 2 },
    } as unknown as ThreadHistoryItemDto;
    const { container } = await mount(turn([malformed]));
    expect(container.querySelector('[role="alert"]')?.textContent).toContain(
      "unsupported version",
    );
    expect(container.querySelector("[data-tool-call-id]")).toBeNull();
  });

  it("keeps available reasoning distinct from final Markdown, code and math", async () => {
    const { container } = await mount(
      turn([
        {
          id: "reasoning",
          kind: "reasoning",
          text: "**Reported reasoning**: $x^2$",
        },
        {
          id: "reply",
          kind: "agentMessage",
          text: "# Final reply\n\n```python\nprint(2)\n```\n\n\\(E=mc^2\\)",
        },
      ]),
    );
    await act(async () =>
      container
        .querySelector<HTMLButtonElement>('[aria-label="Expand 1 operation"]')
        ?.click(),
    );
    expect(container.querySelector("details summary")?.textContent).toBe(
      "Reasoning summary",
    );
    expect(container.querySelector('[data-message-id="reasoning"]')).toBeNull();
    expect(container.querySelector("h1")?.textContent).toBe("Final reply");
    expect(container.querySelector("code")?.textContent).toContain("print(2)");
    expect(container.querySelectorAll(".katex").length).toBeGreaterThanOrEqual(
      2,
    );
  });

  it("shows missing turn and room usage as unavailable", async () => {
    const { container } = await mount(turn([]));
    expect(container.textContent).toContain("Room usage unavailable");
    expect(container.textContent).toContain("Turn usage unavailable");
    expect(container.textContent).not.toContain("0 tok");
    expect(container.textContent).not.toContain("$0");
  });

  it("renders usage/updated carriers for room, turn and a separately observed tool", async () => {
    const usage = EXTENSION_FIXTURES.grafico.usage;
    const { container } = await mount({
      ...turn([item()]),
      usageByScope: {
        main: { usage },
        room: {
          usage: {
            ...usage,
            scope: "room",
            scopeId: "thr-fixture",
            tokens: { total: 90 },
          },
        },
        tool: {
          usage: {
            ...usage,
            scope: "tool",
            scopeId: "tool-fixture-1",
            tokens: { output: 3 },
          },
        },
      },
    });
    expect(
      container.querySelector('[aria-label="Room usage"]')?.textContent,
    ).toContain("Total tokens: 90");
    expect(
      container.querySelector('[aria-label="Turn usage"]')?.textContent,
    ).toContain("Input tokens: 20");
    expect(
      container.querySelector('[aria-label="Tool usage"]')?.textContent,
    ).toContain("Output tokens: 3");
  });

  it("labels unresolved tool work as last reported when the enclosing turn ends", async () => {
    const unresolved = {
      ...item(),
      progress: { ...item().progress!, status: "running" as const },
    };
    delete unresolved.progress.completedAt;
    const { container } = await mount(turn([unresolved], "failed"));
    expect(
      container.querySelector("[data-tool-call-id] summary")?.textContent,
    ).toContain("Last reported: Running; turn failed");
    expect(container.querySelector(".animate-spin")).toBeNull();
  });

  it("selects the newest matching scope without adding repeated observations", () => {
    const observation = EXTENSION_FIXTURES.grafico.usage;
    const values = [
      { id: "a", kind: "other", text: "", usage: observation },
      {
        id: "b",
        kind: "other",
        text: "",
        usage: {
          ...observation,
          observedAt: "2026-10-04T00:00:02.000Z",
          tokens: { input: 7 },
        },
      },
      {
        id: "wrong",
        kind: "other",
        text: "",
        usage: {
          ...observation,
          scopeId: "another-turn",
          observedAt: "2026-10-04T00:00:03.000Z",
          tokens: { input: 900 },
        },
      },
    ] as ThreadHistoryItemDto[];
    expect(latestUsage(values, "turn", observation.scopeId)?.tokens).toEqual({
      input: 7,
    });
    const html = renderToStaticMarkup(<TurnUsageInline turn={turn(values)} />);
    expect(html).toContain("Input tokens: 7");
    expect(html).not.toContain("900");
    expect(html).toContain("Cache read tokens: unavailable");
    expect(html).toContain("Total tokens: unavailable");
  });

  it("shows reported zero while retaining missing cache, reasoning and cost fields as unavailable", () => {
    const html = renderToStaticMarkup(
      <StructuredUsageInline
        scope="turn"
        usage={{ ...EXTENSION_FIXTURES.grafico.usage, tokens: { input: 0 } }}
      />,
    );
    expect(html).toContain("Input tokens: 0");
    expect(html).toContain("Output tokens: unavailable");
    expect(html).toContain("Cache write tokens: unavailable");
    expect(html).toContain("Reasoning tokens: unavailable");
    expect(html).toContain("Cost: unavailable");
  });

  it("retains available partial legacy counts without fabricating omitted fields", () => {
    const partial = turn([]);
    partial.tokenUsage = {
      total: { inputTokens: 5 },
      last: {},
      modelContextWindow: null,
    } as unknown as ThreadTurnDto["tokenUsage"];
    const html = renderToStaticMarkup(<TurnUsageInline turn={partial} />);
    expect(html).toContain("Input tokens: 5");
    expect(html).toContain("Cache read tokens: unavailable");
    expect(html).not.toContain("Input tokens: 0");
  });

  it("renders invalid usage as an explicit error, never a zero report", () => {
    const html = renderToStaticMarkup(
      <StructuredUsageInline
        scope="room"
        usage={
          {
            ...EXTENSION_FIXTURES.grafico.unavailableUsage,
            version: 9,
          } as unknown as StructuredUsage
        }
      />,
    );
    expect(html).toContain("Room usage unavailable");
    expect(html).toContain('role="alert"');
    expect(html).not.toContain("tokens: 0");
  });
});

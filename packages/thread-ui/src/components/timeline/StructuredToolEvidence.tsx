import { type RefObject } from "react";
import type { ThreadHistoryItemDto } from "@remote-codex/shared";
import type { ThreadTimelineAdapter } from "../../adapters";
import { GraphChatMarkdownAwareBody } from "../graph-chat/GraphChatMessageBody";
import {
  latestUsage,
  progressEvidence,
  usageEvidenceResult,
} from "./structuredEvidence";
import type { TimelineTurn } from "./timelineItems";
import { StructuredUsageInline } from "./StructuredUsageInline";

const labels = {
  queued: "Queued",
  running: "Running",
  waitingForInput: "Waiting for input",
  completed: "Completed",
  failed: "Failed",
  interrupted: "Interrupted",
};

export function StructuredToolEvidence({
  item,
  scrollRootRef,
  adapter,
  onBeforeResize,
  turnStatus,
}: {
  item: ThreadHistoryItemDto;
  turnStatus?: TimelineTurn["status"] | undefined;
  scrollRootRef: RefObject<HTMLDivElement | null>;
  adapter?: ThreadTimelineAdapter | undefined;
  onBeforeResize?: (() => void) | undefined;
}) {
  const evidence = progressEvidence(item);
  if (!evidence.data)
    return <div role="alert">Tool evidence unavailable: {evidence.error}</div>;
  const progress = evidence.data;
  const terminalTurn =
    turnStatus && ["completed", "failed", "interrupted"].includes(turnStatus);
  const unresolved =
    terminalTurn &&
    !["completed", "failed", "interrupted"].includes(progress.status);
  const running = progress.status === "running";
  return (
    <details
      className="thread-graph-tool-call my-2 min-w-0 rounded-lg border p-3"
      data-tool-call-id={progress.callId}
    >
      <summary
        className="cursor-pointer break-words text-sm"
        onClick={onBeforeResize}
      >
        {progress.label} ·{" "}
        <span aria-label={`Tool status: ${labels[progress.status]}`}>
          {unresolved
            ? `Last reported: ${labels[progress.status]}; turn ${turnStatus}`
            : labels[progress.status]}
        </span>
        {progress.completed !== undefined
          ? ` · ${progress.completed}${progress.total !== undefined ? ` / ${progress.total}` : ""} ${progress.unit ?? ""}`
          : ""}
      </summary>
      <div className="space-y-3 pt-3">
        <div className="break-words text-xs">Call ID: {progress.callId}</div>
        {progress.startedAt ? (
          <div className="text-xs">
            Started:{" "}
            <time dateTime={progress.startedAt}>{progress.startedAt}</time>
          </div>
        ) : null}
        {progress.completedAt ? (
          <div className="text-xs">
            Ended:{" "}
            <time dateTime={progress.completedAt}>{progress.completedAt}</time>
          </div>
        ) : null}
        <section aria-label="Tool arguments">
          <h4>Arguments</h4>
          <pre className="max-h-64 overflow-auto whitespace-pre-wrap break-words text-xs">
            {progress.arguments === undefined
              ? "Arguments unavailable"
              : JSON.stringify(progress.arguments, null, 2)}
          </pre>
        </section>
        <section aria-label="Tool result summary">
          <h4>Result summary</h4>
          {progress.resultSummary === undefined ? (
            <p>Result unavailable</p>
          ) : (
            <GraphChatMarkdownAwareBody
              text={progress.resultSummary}
              scrollRootRef={scrollRootRef}
              messageId={`${item.id}:result`}
              streaming={running}
              onBeforeResize={onBeforeResize}
              workspaceRootPath={adapter?.workspaceRootPath}
              onOpenWorkspaceFile={adapter?.onOpenWorkspaceFile}
              resolveHref={adapter?.resolveHref}
            />
          )}
        </section>
        <section aria-label="Tool log summary">
          <h4>Log summary</h4>
          <pre className="max-h-64 overflow-auto whitespace-pre-wrap break-words text-xs">
            {progress.logSummary ?? "Logs unavailable"}
          </pre>
        </section>
        {progress.artifactIds?.length ? (
          <div className="break-words text-xs">
            Full artifacts: {progress.artifactIds.join(", ")}
          </div>
        ) : null}
        <StructuredUsageInline
          usage={latestUsage([item], "tool", progress.callId)}
          scope="tool"
          error={usageEvidenceResult(item).error}
        />
      </div>
    </details>
  );
}

import { validateUsage, type StructuredUsage } from "@remote-codex/shared";
import { formatCompactTokenCount } from "./tokenFormatting";

export function StructuredUsageInline({
  usage,
  scope,
  error,
}: {
  usage?: StructuredUsage | null | undefined;
  scope: StructuredUsage["scope"];
  error?: string | undefined;
}) {
  let report: StructuredUsage | undefined;
  let validationError = error;
  try {
    if (usage) {
      report = validateUsage(usage);
      if (report.scope !== scope) throw new Error("Usage scope mismatch");
    }
  } catch (caught) {
    report = undefined;
    validationError =
      caught instanceof Error ? caught.message : "Invalid usage report";
  }
  if (validationError) report = undefined;
  const available = report?.availability === "available";
  const fields = [
    ["total", "Total tokens"],
    ["input", "Input tokens"],
    ["output", "Output tokens"],
    ["cacheRead", "Cache read tokens"],
    ["cacheWrite", "Cache write tokens"],
    ["reasoning", "Reasoning tokens"],
  ] as const;
  const title = `${scope[0]!.toUpperCase()}${scope.slice(1)} usage`;
  return (
    <span
      className="thread-turn-usage thread-structured-usage inline-flex flex-wrap gap-x-2 gap-y-1 text-xs"
      aria-label={title}
    >
      <span>
        {title}
        {available ? ":" : " unavailable"}
      </span>
      {available
        ? fields.map(([key, label]) => (
            <span
              key={key}
              title={`${label}: ${report?.tokens?.[key]?.toLocaleString("en-US") ?? "unavailable"}`}
            >
              {label}:{" "}
              {report?.tokens?.[key] === undefined
                ? "unavailable"
                : formatCompactTokenCount(report.tokens[key]!)}
            </span>
          ))
        : null}
      <span title="Reported usage cost; this is not a billing ledger or account balance">
        Cost:{" "}
        {available && report?.cost
          ? `${report.cost.amount.toLocaleString("en-US", { maximumFractionDigits: 8 })} ${report.cost.currency}`
          : "unavailable"}
      </span>
      {validationError ? (
        <span role="alert">Usage unavailable: {validationError}</span>
      ) : null}
    </span>
  );
}

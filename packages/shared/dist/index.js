// src/agent-providers.ts
var agentBackendIds = ["codex", "claude", "opencode", "elagente"];
var defaultAgentBackendId = "codex";
var agentBackendMetadata = {
  elagente: {
    displayName: "ElAgente",
    description: "ElAgente app-server with native scientific runtimes.",
    defaultTransport: "stdio",
    homeEnvVar: "ELAGENTE_STATE_DIR",
    commandEnvVar: "ELAGENTE_APP_COMMAND",
    defaultHomeDir: ".elagente",
    defaultCommand: ""
  },
  codex: {
    displayName: "Codex",
    description: "Local Codex app-server runtime.",
    defaultTransport: "stdio",
    homeEnvVar: "CODEX_HOME",
    commandEnvVar: "CODEX_COMMAND",
    defaultHomeDir: ".codex",
    defaultCommand: "codex"
  },
  claude: {
    displayName: "Claude Code",
    description: "Local Claude Code Agent SDK runtime.",
    defaultTransport: "sdk",
    homeEnvVar: "CLAUDE_HOME",
    commandEnvVar: "CLAUDE_COMMAND",
    defaultHomeDir: ".claude",
    defaultCommand: "claude"
  },
  opencode: {
    displayName: "OpenCode",
    description: "Local OpenCode runtime.",
    defaultTransport: "sdk",
    homeEnvVar: "OPENCODE_HOME",
    commandEnvVar: "OPENCODE_COMMAND",
    defaultHomeDir: ".opencode",
    defaultCommand: "opencode"
  }
};
function isAgentBackendId(value) {
  return typeof value === "string" && agentBackendIds.includes(value);
}
function normalizeAgentBackendId(value) {
  return isAgentBackendId(value) ? value : null;
}

// src/index.ts
var AUTO_THREAD_TITLE_MAX_CHARS = 15;
function normalizeAutoThreadTitleWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}
function truncateAutoThreadTitle(value) {
  const normalized = normalizeAutoThreadTitleWhitespace(value);
  if (!normalized) {
    return "";
  }
  const characters = Array.from(normalized);
  if (characters.length <= AUTO_THREAD_TITLE_MAX_CHARS) {
    return normalized;
  }
  return `${characters.slice(0, AUTO_THREAD_TITLE_MAX_CHARS).join("")}...`;
}
function mergeThreadHistoryItem(current, incoming) {
  if (!current || current.kind !== incoming.kind) return incoming;
  const terminal = (status) => ["completed", "failed", "interrupted", "cancelled", "canceled"].includes(status?.toLowerCase() ?? "");
  const richer = (previous, next) => (previous?.length ?? 0) > (next?.length ?? 0) ? previous : next ?? previous;
  return {
    ...current,
    ...incoming,
    text: richer(current.text, incoming.text) ?? "",
    ...current.detailText != null || incoming.detailText != null ? { detailText: richer(current.detailText, incoming.detailText) ?? "" } : {},
    ...current.previewText != null || incoming.previewText != null ? { previewText: richer(current.previewText, incoming.previewText) ?? "" } : {},
    ...current.status != null || incoming.status != null ? { status: terminal(current.status) && !terminal(incoming.status) ? current.status : incoming.status ?? current.status } : {},
    ...current.sequence != null || incoming.sequence != null ? { sequence: incoming.sequence ?? current.sequence } : {}
  };
}
export {
  agentBackendIds,
  agentBackendMetadata,
  defaultAgentBackendId,
  isAgentBackendId,
  mergeThreadHistoryItem,
  normalizeAgentBackendId,
  truncateAutoThreadTitle
};

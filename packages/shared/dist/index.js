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

// src/extensions.mjs
var EXTENSION_VERSION = 1;
var EXTENSION_TYPES = Object.freeze({
  discovery: "elagente.discovery",
  artifact: "elagente.artifact-metadata",
  progress: "elagente.progress",
  usage: "elagente.usage",
  viewerInput: "elagente.viewer-input",
  viewerAction: "elagente.viewer-action",
  viewerAcknowledgement: "elagente.viewer-acknowledgement"
});
var ExtensionValidationError = class extends Error {
  constructor(code, path, message) {
    super(`${path}: ${message}`);
    this.name = "ExtensionValidationError";
    this.code = code;
    this.path = path;
  }
};
var fail = (path, message, code = "INVALID_EXTENSION") => {
  throw new ExtensionValidationError(code, path, message);
};
var obj = (v, p) => {
  if (!v || typeof v !== "object" || Array.isArray(v) || ![Object.prototype, null].includes(Object.getPrototypeOf(v))) fail(p, "expected object");
};
var str = (v, p, max = 1024) => {
  if (typeof v !== "string" || !v.trim() || v.length > max) fail(p, `expected nonempty string (max ${max})`);
};
var num = (v, p) => {
  if (typeof v !== "number" || !Number.isFinite(v)) fail(p, "expected finite number");
};
var integer = (v, p) => {
  num(v, p);
  if (!Number.isSafeInteger(v) || v < 0) fail(p, "expected nonnegative safe integer");
};
var bool = (v, p) => {
  if (typeof v !== "boolean") fail(p, "expected boolean");
};
var one = (v, values, p) => {
  if (!values.includes(v)) fail(p, `expected one of ${values.join(", ")}`);
};
var version = (v, p) => {
  if (v !== 1) fail(p, "unsupported version (supported: 1)", "UNSUPPORTED_EXTENSION_VERSION");
};
var name = (v, p) => {
  str(v, p, 160);
  if (!/^[a-z][a-z0-9-]*(?:[.:/][a-zA-Z0-9_-]+)+$/.test(v)) fail(p, "expected namespaced ID");
};
var list = (v, p, max = 1e3) => {
  if (!Array.isArray(v) || v.length > max) fail(p, `expected array (max ${max})`);
};
var unique = (v, p) => {
  if (new Set(v).size !== v.length) fail(p, "duplicate IDs");
};
var ids = (v, p) => {
  list(v, p);
  v.forEach((s, i) => str(s, `${p}[${i}]`));
  unique(v, p);
};
var own = (v, key) => Object.hasOwn(v, key);
function json(v, p = "data", depth = 0, budget = { nodes: 0 }) {
  if (++budget.nodes > 1e5 || depth > 32) fail(p, "JSON depth/node limit");
  if (v === null || typeof v === "boolean" || typeof v === "string") {
    if (typeof v === "string" && v.length > 1048576) fail(p, "string limit");
    return;
  }
  if (typeof v === "number") {
    num(v, p);
    return;
  }
  if (Array.isArray(v)) {
    list(v, p, 1e4);
    v.forEach((x, i) => json(x, `${p}[${i}]`, depth + 1, budget));
    return;
  }
  obj(v, p);
  for (const [k, x] of Object.entries(v)) {
    if (["__proto__", "prototype", "constructor"].includes(k)) fail(p, "unsafe JSON key");
    json(x, `${p}.${k}`, depth + 1, budget);
  }
}
var timestamp = (v, p) => {
  str(v, p);
  if (!/^\d{4}-\d\d-\d\dT/.test(v) || !Number.isFinite(Date.parse(v))) fail(p, "expected ISO timestamp");
};
function schema(s, p, depth = 0) {
  obj(s, p);
  if (depth > 8) fail(p, "schema depth limit");
  const keys = { string: ["enum", "maxLength"], number: ["minimum", "maximum"], integer: ["minimum", "maximum"], boolean: [], null: [], array: ["items", "maxItems"], object: ["properties", "required", "additionalProperties"] };
  one(s.type, Object.keys(keys), `${p}.type`);
  for (const k of Object.keys(s)) if (k !== "type" && !keys[s.type].includes(k)) fail(`${p}.${k}`, "unsupported schema keyword");
  if (s.enum !== void 0) {
    ids(s.enum, `${p}.enum`);
    if (!s.enum.length) fail(p, "empty enum");
  }
  if (s.maxLength !== void 0) {
    integer(s.maxLength, p);
    if (s.maxLength > 1048576) fail(p, "maxLength limit");
  }
  for (const k of ["minimum", "maximum"]) if (s[k] !== void 0) num(s[k], `${p}.${k}`);
  if (s.minimum > s.maximum) fail(p, "inverted bounds");
  if (s.type === "array") {
    integer(s.maxItems, `${p}.maxItems`);
    if (s.maxItems > 1e4) fail(p, "maxItems limit");
    schema(s.items, `${p}.items`, depth + 1);
  }
  if (s.type === "object") {
    obj(s.properties, `${p}.properties`);
    if (Object.keys(s.properties).length > 100) fail(p, "property limit");
    one(s.additionalProperties, [false], `${p}.additionalProperties`);
    for (const [k, child] of Object.entries(s.properties)) {
      if (["__proto__", "constructor", "prototype"].includes(k)) fail(p, "unsafe schema key");
      schema(child, `${p}.properties.${k}`, depth + 1);
    }
    if (s.required !== void 0) {
      ids(s.required, `${p}.required`);
      for (const k of s.required) if (!own(s.properties, k)) fail(p, "required key has no schema");
    }
  }
}
function validateValueSchema(v) {
  json(v);
  schema(v, "schema");
}
function payload(s, v, p) {
  if (s.type === "null") {
    one(v, [null], p);
    return;
  }
  if (s.type === "boolean") {
    bool(v, p);
    return;
  }
  if (s.type === "string") {
    if (typeof v !== "string" || v.length > (s.maxLength ?? 1048576)) fail(p, "invalid string");
    if (s.enum && !s.enum.includes(v)) fail(p, "invalid enum value");
    return;
  }
  if (s.type === "number" || s.type === "integer") {
    num(v, p);
    if (s.type === "integer" && !Number.isSafeInteger(v)) fail(p, "expected safe integer");
    if (s.minimum !== void 0 && v < s.minimum || s.maximum !== void 0 && v > s.maximum) fail(p, "out of bounds");
    return;
  }
  if (s.type === "array") {
    list(v, p, s.maxItems);
    v.forEach((x, i) => payload(s.items, x, `${p}[${i}]`));
    return;
  }
  obj(v, p);
  for (const k of s.required ?? []) if (!own(v, k)) fail(`${p}.${k}`, "required");
  for (const [k, x] of Object.entries(v)) {
    if (!own(s.properties, k)) fail(`${p}.${k}`, "unknown payload field");
    payload(s.properties[k], x, `${p}.${k}`);
  }
}
function validatePayload(s, v) {
  validateValueSchema(s);
  json(v);
  payload(s, v, "payload");
}
function validateDiscovery(v) {
  json(v);
  obj(v, "discovery");
  version(v.contractVersion, "contractVersion");
  one(v.viewerState, ["personal-transient"], "viewerState");
  one(v.submission, ["explicit"], "submission");
  obj(v.capabilities, "capabilities");
  for (const [k, x] of Object.entries(v.capabilities)) {
    name(k, "capability");
    bool(x, k);
  }
  for (const key of ["contributions", "options", "actions"]) {
    list(v[key], key, 100);
    unique(v[key].map((x) => x?.id), key);
  }
  for (const o of v.options) {
    obj(o, "option");
    name(o.id, "option.id");
    str(o.label, "option.label");
    if (o.description !== void 0) str(o.description, "option.description", 8192);
    one(o.scope, ["thread", "turn"], "option.scope");
    one(o.apply, ["nextTurn", "restart"], "option.apply");
    bool(o.mutable, "option.mutable");
    if (o.scope === "turn" && o.apply === "restart") fail("option.apply", "turn options cannot restart a runtime");
    validateValueSchema(o.schema);
    if (own(o, "default")) validatePayload(o.schema, o.default);
  }
  for (const a of v.actions) {
    obj(a, "action");
    name(a.id, "action.id");
    str(a.label, "action.label");
    one(a.execution, ["browser", "native"], "action.execution");
    one(a.completion, ["applied"], "action.completion");
    validateValueSchema(a.inputSchema);
    validateValueSchema(a.resultSchema);
  }
  for (const c of v.contributions) {
    obj(c, "contribution");
    name(c.id, "contribution.id");
    name(c.type, "contribution.type");
    version(c.version, "contribution.version");
    version(c.minContractVersion, "contribution.minContractVersion");
    for (const key of ["rendererIds", "panelIds", "actionIds", "optionIds"]) {
      ids(c[key], key);
      c[key].forEach((x) => name(x, key));
    }
    for (const id of c.actionIds) if (!v.actions.some((a) => a.id === id)) fail("actionIds", "undeclared action");
    for (const id of c.optionIds) if (!v.options.some((o) => o.id === id)) fail("optionIds", "undeclared option");
  }
  return v;
}
function hasCapability(discovery, id) {
  return discovery?.contractVersion === 1 && discovery?.capabilities?.[id] === true;
}
function validateOptionValues(discovery, values, scope = "thread") {
  validateDiscovery(discovery);
  json(values);
  obj(values, "options");
  one(scope, ["thread", "turn"], "scope");
  for (const [id, value] of Object.entries(values)) {
    const o = discovery.options.find((x) => x.id === id);
    if (!o || o.scope !== scope) fail(id, "unsupported option/scope", "UNSUPPORTED_CAPABILITY");
    if (!o.mutable) fail(id, "read-only option");
    validatePayload(o.schema, value);
  }
  return values;
}
function validateScientificTarget(v) {
  obj(v, "target");
  for (const k of ["artifactId", "objectId", "sourceRevision"]) str(v[k], `target.${k}`);
  if (typeof v.checksum !== "string" || !/^[a-f0-9]{64}$/.test(v.checksum)) fail("target.checksum", "expected lowercase SHA-256");
  const frame = ["streamId", "frameId", "frameIndex"].some((k) => own(v, k));
  if (frame) {
    str(v.streamId, "target.streamId");
    str(v.frameId, "target.frameId");
    integer(v.frameIndex, "target.frameIndex");
  }
  return v;
}
function validateArtifactMetadata(v) {
  json(v);
  obj(v, "metadata");
  version(v.version, "metadata.version");
  validateScientificTarget({ ...v, artifactId: "metadata", ...v.stream ? { streamId: v.stream.id, frameId: v.stream.frameId, frameIndex: v.stream.frameIndex } : {} });
  str(v.format, "format", 64);
  if (v.stream !== void 0) obj(v.stream, "stream");
  if (v.atoms !== void 0) {
    list(v.atoms, "atoms", 1e4);
    unique(v.atoms.map((a) => a?.id), "atoms");
    for (const a of v.atoms) {
      obj(a, "atom");
      str(a.id, "atom.id");
      if (!/^[A-Z][a-z]?$/.test(a.element)) fail("atom.element", "expected element symbol");
    }
  }
  if (v.bonds !== void 0) {
    if (!v.atoms) fail("bonds", "explicit bonds require stable atom IDs");
    list(v.bonds, "bonds", 1e4);
    const atoms = new Set(v.atoms.map((a) => a.id));
    const seen = /* @__PURE__ */ new Set();
    for (const b of v.bonds) {
      obj(b, "bond");
      list(b.atomIds, "bond.atomIds", 2);
      if (b.atomIds.length !== 2 || b.atomIds[0] === b.atomIds[1] || b.atomIds.some((a) => !atoms.has(a))) fail("bond.atomIds", "expected two distinct existing atom IDs");
      one(b.order, [1, 1.5, 2, 3], "bond.order");
      const key = JSON.stringify([...b.atomIds].sort());
      if (seen.has(key)) fail("bonds", "duplicate bond");
      seen.add(key);
    }
  }
  if (v.cell !== void 0) {
    obj(v.cell, "cell");
    list(v.cell.vectors, "cell.vectors", 3);
    if (v.cell.vectors.length !== 3) fail("cell.vectors", "expected 3 vectors");
    v.cell.vectors.forEach((row) => {
      list(row, "cell.vector", 3);
      if (row.length !== 3) fail("cell.vector", "expected 3 coordinates");
      row.forEach((n) => num(n, "cell.coordinate"));
    });
    const [a, b, c] = v.cell.vectors;
    const det = a[0] * (b[1] * c[2] - b[2] * c[1]) - a[1] * (b[0] * c[2] - b[2] * c[0]) + a[2] * (b[0] * c[1] - b[1] * c[0]);
    if (!Number.isFinite(det) || Math.abs(det) < 1e-12) fail("cell.vectors", "degenerate cell");
    list(v.cell.periodic, "cell.periodic", 3);
    if (v.cell.periodic.length !== 3) fail("cell.periodic", "expected 3 flags");
    v.cell.periodic.forEach((x) => bool(x, "cell.periodic"));
    one(v.cell.unit, ["angstrom", "bohr"], "cell.unit");
  }
  if (v.render !== void 0) {
    obj(v.render, "render");
    one(v.render.coordinateUnit, ["angstrom", "bohr"], "render.coordinateUnit");
    one(v.render.bonding, ["provided", "infer", "none"], "render.bonding");
    if (v.render.bonding === "provided" && !v.bonds) fail("render.bonding", "provided bonds missing");
    if (v.render.style !== void 0) one(v.render.style, ["ball-stick", "stick", "spacefill"], "render.style");
    if (v.render.background !== void 0 && !/^#[a-fA-F0-9]{6}$/.test(v.render.background)) fail("render.background", "expected hex color");
  }
  return v;
}
function action(discovery, id) {
  validateDiscovery(discovery);
  const a = discovery.actions.find((x) => x.id === id);
  if (!a || !hasCapability(discovery, id)) fail("actionId", "action is unavailable", "UNSUPPORTED_CAPABILITY");
  return a;
}
function validateViewerRequest(v, discovery) {
  json(v);
  obj(v, "request");
  version(v.version, "request.version");
  str(v.requestId, "requestId");
  str(v.operationId, "operationId");
  name(v.actionId, "actionId");
  validateScientificTarget(v.target);
  validatePayload(action(discovery, v.actionId).inputSchema, v.payload);
  return v;
}
function validateViewerInput(v, discovery) {
  validateViewerRequest(v, discovery);
  one(v.kind, ["selection", "screenshot", "action"], "kind");
  one(v.submission, ["explicit"], "submission");
  return v;
}
function validateViewerAcknowledgement(v, request, discovery) {
  validateViewerRequest(request, discovery);
  json(v);
  obj(v, "acknowledgement");
  version(v.version, "acknowledgement.version");
  validateScientificTarget(v.target);
  for (const k of ["requestId", "operationId", "actionId"]) if (v[k] !== request[k]) fail(k, "acknowledgement identity mismatch", "STALE_VIEWER_TARGET");
  for (const k of ["artifactId", "objectId", "sourceRevision", "checksum", "streamId", "frameId", "frameIndex"]) if (v.target[k] !== request.target[k]) fail(`target.${k}`, "acknowledgement target mismatch", "STALE_VIEWER_TARGET");
  one(v.status, ["accepted", "applied", "rejected"], "status");
  if (v.status === "rejected") {
    obj(v.error, "error");
    str(v.error.code, "error.code");
    str(v.error.message, "error.message", 8192);
    if (own(v, "result")) fail("result", "rejection cannot have successful result");
  } else {
    if (own(v, "error")) fail("error", "successful acknowledgement cannot have error");
    if (v.status === "accepted" && own(v, "result")) fail("result", "acceptance is not completion");
    if (v.status === "applied") validatePayload(action(discovery, v.actionId).resultSchema, v.result);
  }
  return v;
}
function validateProgress(v) {
  json(v);
  obj(v, "progress");
  version(v.version, "progress.version");
  str(v.callId, "callId");
  str(v.label, "label");
  one(v.status, ["queued", "running", "waitingForInput", "completed", "failed", "interrupted"], "status");
  for (const k of ["startedAt", "completedAt"]) if (v[k] !== void 0) timestamp(v[k], k);
  if (v.completedAt && !["completed", "failed", "interrupted"].includes(v.status)) fail("completedAt", "nonterminal progress");
  if (v.startedAt && v.completedAt && Date.parse(v.completedAt) < Date.parse(v.startedAt)) fail("completedAt", "precedes start");
  for (const k of ["resultSummary", "logSummary"]) if (v[k] !== void 0) str(v[k], k, 8192);
  if (v.artifactIds !== void 0) ids(v.artifactIds, "artifactIds");
  for (const k of ["completed", "total"]) if (v[k] !== void 0) integer(v[k], k);
  if (v.completed > v.total) fail("completed", "exceeds total");
  if (v.unit !== void 0) str(v.unit, "unit");
  if (v.parentCallId !== void 0) str(v.parentCallId, "parentCallId");
  return v;
}
function validateUsage(v) {
  json(v);
  obj(v, "usage");
  version(v.version, "usage.version");
  one(v.scope, ["turn", "room", "tool"], "scope");
  str(v.scopeId, "scopeId");
  timestamp(v.observedAt, "observedAt");
  one(v.availability, ["available", "unavailable"], "availability");
  if (v.availability === "unavailable" && (own(v, "tokens") || own(v, "cost"))) fail("usage", "unavailable usage cannot imply zero/measured usage");
  if (v.tokens !== void 0) {
    obj(v.tokens, "tokens");
    for (const k of ["input", "output", "reasoning", "cacheRead", "cacheWrite", "total"]) if (v.tokens[k] !== void 0) integer(v.tokens[k], `tokens.${k}`);
  }
  if (v.cost !== void 0) {
    obj(v.cost, "cost");
    num(v.cost.amount, "cost.amount");
    if (v.cost.amount < 0) fail("cost.amount", "negative cost");
    if (!/^[A-Z]{3}$/.test(v.cost.currency)) fail("cost.currency", "expected currency code");
  }
  return v;
}
function validateExtension(v, discovery, originatingRequest) {
  json(v);
  obj(v, "extension");
  version(v.version, "extension.version");
  name(v.type, "extension.type");
  if (!own(v, "data")) fail("data", "required");
  const validators = { [EXTENSION_TYPES.discovery]: validateDiscovery, [EXTENSION_TYPES.artifact]: validateArtifactMetadata, [EXTENSION_TYPES.progress]: validateProgress, [EXTENSION_TYPES.usage]: validateUsage };
  if (validators[v.type]) validators[v.type](v.data);
  else if (v.type === EXTENSION_TYPES.viewerInput) validateViewerInput(v.data, discovery);
  else if (v.type === EXTENSION_TYPES.viewerAction) validateViewerRequest(v.data, discovery);
  else if (v.type === EXTENSION_TYPES.viewerAcknowledgement) {
    if (!originatingRequest) fail("type", "validate acknowledgement against its originating request");
    validateViewerAcknowledgement(v.data, originatingRequest, discovery);
  }
  return v;
}
function extensionFallback(v) {
  const envelope = validateExtension(v);
  return { kind: "metadata-text-download", type: envelope.type, text: `Unsupported contribution: ${envelope.type}`, metadata: envelope.data };
}

// src/extension-fixtures.mjs
var fixtures = {
  "grafico": {
    "agentId": "grafico",
    "discovery": {
      "contractVersion": 1,
      "viewerState": "personal-transient",
      "submission": "explicit",
      "capabilities": {
        "elagente.viewer.select": true,
        "elagente.viewer.capture": true,
        "elagente.viewer.style": true,
        "elagente.viewer.program": false,
        "elagente.conversation.export": true,
        "elagente.conversation.share-read": true,
        "elagente.conversation.share-write": false,
        "elagente.conversation.fork": false
      },
      "contributions": [
        {
          "id": "grafico.science",
          "type": "grafico.science",
          "version": 1,
          "minContractVersion": 1,
          "rendererIds": [
            "elagente.structure.xyz"
          ],
          "panelIds": [
            "grafico.workflow"
          ],
          "actionIds": [
            "elagente.viewer.select",
            "elagente.viewer.capture",
            "elagente.viewer.style"
          ],
          "optionIds": [
            "science.precision"
          ]
        }
      ],
      "options": [
        {
          "id": "science.precision",
          "label": "Precision",
          "scope": "thread",
          "apply": "nextTurn",
          "mutable": true,
          "schema": {
            "type": "string",
            "enum": [
              "standard",
              "high"
            ]
          },
          "default": "standard"
        }
      ],
      "actions": [
        {
          "id": "elagente.viewer.select",
          "label": "Submit selection",
          "execution": "native",
          "completion": "applied",
          "inputSchema": {
            "type": "object",
            "properties": {
              "selectedIds": {
                "type": "array",
                "items": {
                  "type": "string",
                  "maxLength": 160
                },
                "maxItems": 1e4
              }
            },
            "required": [
              "selectedIds"
            ],
            "additionalProperties": false
          },
          "resultSchema": {
            "type": "object",
            "properties": {
              "selectedIds": {
                "type": "array",
                "items": {
                  "type": "string",
                  "maxLength": 160
                },
                "maxItems": 1e4
              }
            },
            "required": [
              "selectedIds"
            ],
            "additionalProperties": false
          }
        },
        {
          "id": "elagente.viewer.capture",
          "label": "Capture PNG",
          "execution": "browser",
          "completion": "applied",
          "inputSchema": {
            "type": "object",
            "properties": {},
            "additionalProperties": false
          },
          "resultSchema": {
            "type": "object",
            "properties": {
              "imageArtifactId": {
                "type": "string",
                "maxLength": 160
              },
              "mediaType": {
                "type": "string",
                "enum": [
                  "image/png"
                ]
              },
              "width": {
                "type": "integer",
                "minimum": 1,
                "maximum": 8192
              },
              "height": {
                "type": "integer",
                "minimum": 1,
                "maximum": 8192
              }
            },
            "required": [
              "imageArtifactId",
              "mediaType",
              "width",
              "height"
            ],
            "additionalProperties": false
          }
        },
        {
          "id": "elagente.viewer.style",
          "label": "Change representation",
          "execution": "browser",
          "completion": "applied",
          "inputSchema": {
            "type": "object",
            "properties": {
              "style": {
                "type": "string",
                "enum": [
                  "ball-stick",
                  "stick",
                  "spacefill"
                ]
              }
            },
            "required": [
              "style"
            ],
            "additionalProperties": false
          },
          "resultSchema": {
            "type": "object",
            "properties": {},
            "additionalProperties": false
          }
        }
      ]
    },
    "artifacts": [
      {
        "id": "artifact-grafico-0",
        "version": 1,
        "path": ".artifacts/e746cbb2b2a563e154455da11806903935e4085828d47e61cf5d44da747bfaf2.xyz",
        "name": "grafico-0.xyz",
        "checksum": "e746cbb2b2a563e154455da11806903935e4085828d47e61cf5d44da747bfaf2",
        "size": 53,
        "mediaType": "chemical/x-xyz",
        "kind": "chem.structure",
        "createdAt": "2026-10-04T00:00:00.000Z",
        "turnId": "turn-fixture-1",
        "metadata": {
          "version": 1,
          "objectId": "urn:grafico:water:1",
          "sourceRevision": "native-revision-0",
          "checksum": "e746cbb2b2a563e154455da11806903935e4085828d47e61cf5d44da747bfaf2",
          "format": "xyz",
          "stream": {
            "id": "grafico-stream-1",
            "frameId": "frame-0",
            "frameIndex": 0
          },
          "atoms": [
            {
              "id": "O1",
              "element": "O"
            },
            {
              "id": "H1",
              "element": "H"
            },
            {
              "id": "H2",
              "element": "H"
            }
          ],
          "bonds": [
            {
              "atomIds": [
                "O1",
                "H1"
              ],
              "order": 1
            },
            {
              "atomIds": [
                "O1",
                "H2"
              ],
              "order": 1
            }
          ],
          "cell": {
            "vectors": [
              [
                12,
                0,
                0
              ],
              [
                0,
                12,
                0
              ],
              [
                0,
                0,
                12
              ]
            ],
            "periodic": [
              false,
              false,
              false
            ],
            "unit": "angstrom"
          },
          "render": {
            "coordinateUnit": "angstrom",
            "bonding": "provided",
            "style": "ball-stick"
          }
        },
        "fixtureBytes": "3\nwater frame 0\nO 0 0 0\nH 0.76 0.58 0\nH -0.76 0.58 0\n"
      },
      {
        "id": "artifact-grafico-1",
        "version": 1,
        "path": ".artifacts/fda6088d45ee86c47f58a51fce2c4a61597e0f19b1017a9014bec6c46616a4f6.xyz",
        "name": "grafico-1.xyz",
        "checksum": "fda6088d45ee86c47f58a51fce2c4a61597e0f19b1017a9014bec6c46616a4f6",
        "size": 53,
        "mediaType": "chemical/x-xyz",
        "kind": "chem.structure",
        "createdAt": "2026-10-04T00:00:00.000Z",
        "turnId": "turn-fixture-1",
        "metadata": {
          "version": 1,
          "objectId": "urn:grafico:water:1",
          "sourceRevision": "native-revision-1",
          "checksum": "fda6088d45ee86c47f58a51fce2c4a61597e0f19b1017a9014bec6c46616a4f6",
          "format": "xyz",
          "stream": {
            "id": "grafico-stream-1",
            "frameId": "frame-1",
            "frameIndex": 1
          },
          "atoms": [
            {
              "id": "O1",
              "element": "O"
            },
            {
              "id": "H1",
              "element": "H"
            },
            {
              "id": "H2",
              "element": "H"
            }
          ],
          "bonds": [
            {
              "atomIds": [
                "O1",
                "H1"
              ],
              "order": 1
            },
            {
              "atomIds": [
                "O1",
                "H2"
              ],
              "order": 1
            }
          ],
          "cell": {
            "vectors": [
              [
                12,
                0,
                0
              ],
              [
                0,
                12,
                0
              ],
              [
                0,
                0,
                12
              ]
            ],
            "periodic": [
              false,
              false,
              false
            ],
            "unit": "angstrom"
          },
          "render": {
            "coordinateUnit": "angstrom",
            "bonding": "provided",
            "style": "ball-stick"
          }
        },
        "fixtureBytes": "3\nwater frame 1\nO 0 0 0\nH 0.75 0.59 0\nH -0.75 0.59 0\n"
      }
    ],
    "input": {
      "version": 1,
      "requestId": "grafico-request-1",
      "operationId": "grafico-operation-1",
      "actionId": "elagente.viewer.select",
      "target": {
        "artifactId": "artifact-grafico-0",
        "objectId": "urn:grafico:water:1",
        "sourceRevision": "native-revision-0",
        "checksum": "e746cbb2b2a563e154455da11806903935e4085828d47e61cf5d44da747bfaf2",
        "streamId": "grafico-stream-1",
        "frameId": "frame-0",
        "frameIndex": 0
      },
      "payload": {
        "selectedIds": [
          "O1",
          "H1"
        ]
      },
      "kind": "selection",
      "submission": "explicit"
    },
    "acknowledgements": [
      {
        "version": 1,
        "requestId": "grafico-request-1",
        "operationId": "grafico-operation-1",
        "actionId": "elagente.viewer.select",
        "target": {
          "artifactId": "artifact-grafico-0",
          "objectId": "urn:grafico:water:1",
          "sourceRevision": "native-revision-0",
          "checksum": "e746cbb2b2a563e154455da11806903935e4085828d47e61cf5d44da747bfaf2",
          "streamId": "grafico-stream-1",
          "frameId": "frame-0",
          "frameIndex": 0
        },
        "status": "accepted"
      },
      {
        "version": 1,
        "requestId": "grafico-request-1",
        "operationId": "grafico-operation-1",
        "actionId": "elagente.viewer.select",
        "target": {
          "artifactId": "artifact-grafico-0",
          "objectId": "urn:grafico:water:1",
          "sourceRevision": "native-revision-0",
          "checksum": "e746cbb2b2a563e154455da11806903935e4085828d47e61cf5d44da747bfaf2",
          "streamId": "grafico-stream-1",
          "frameId": "frame-0",
          "frameIndex": 0
        },
        "status": "applied",
        "result": {
          "selectedIds": [
            "O1",
            "H1"
          ]
        }
      }
    ],
    "progress": {
      "version": 1,
      "callId": "tool-fixture-1",
      "label": "Scientific calculation",
      "status": "completed",
      "arguments": {
        "precision": "standard"
      },
      "startedAt": "2026-10-04T00:00:00.000Z",
      "completedAt": "2026-10-04T00:00:01.000Z",
      "resultSummary": "Two immutable frames",
      "logSummary": "Task complete",
      "artifactIds": [
        "artifact-grafico-0",
        "artifact-grafico-1"
      ],
      "completed": 2,
      "total": 2,
      "unit": "frames"
    },
    "usage": {
      "version": 1,
      "scope": "turn",
      "scopeId": "turn-fixture-1",
      "observedAt": "2026-10-04T00:00:01.000Z",
      "availability": "available",
      "tokens": {
        "input": 20,
        "output": 10,
        "cacheRead": 5
      }
    },
    "unavailableUsage": {
      "version": 1,
      "scope": "room",
      "scopeId": "thr-fixture",
      "observedAt": "2026-10-04T00:00:01.000Z",
      "availability": "unavailable"
    },
    "unknownItem": {
      "id": "unknown-fixture",
      "kind": "science.unknown",
      "text": "Scientific data available for download",
      "artifact": {
        "id": "artifact-grafico-0",
        "version": 1,
        "path": ".artifacts/e746cbb2b2a563e154455da11806903935e4085828d47e61cf5d44da747bfaf2.xyz",
        "name": "grafico-0.xyz",
        "checksum": "e746cbb2b2a563e154455da11806903935e4085828d47e61cf5d44da747bfaf2",
        "size": 53,
        "mediaType": "chemical/x-xyz",
        "kind": "chem.structure",
        "createdAt": "2026-10-04T00:00:00.000Z",
        "turnId": "turn-fixture-1",
        "metadata": {
          "version": 1,
          "objectId": "urn:grafico:water:1",
          "sourceRevision": "native-revision-0",
          "checksum": "e746cbb2b2a563e154455da11806903935e4085828d47e61cf5d44da747bfaf2",
          "format": "xyz",
          "stream": {
            "id": "grafico-stream-1",
            "frameId": "frame-0",
            "frameIndex": 0
          },
          "atoms": [
            {
              "id": "O1",
              "element": "O"
            },
            {
              "id": "H1",
              "element": "H"
            },
            {
              "id": "H2",
              "element": "H"
            }
          ],
          "bonds": [
            {
              "atomIds": [
                "O1",
                "H1"
              ],
              "order": 1
            },
            {
              "atomIds": [
                "O1",
                "H2"
              ],
              "order": 1
            }
          ],
          "cell": {
            "vectors": [
              [
                12,
                0,
                0
              ],
              [
                0,
                12,
                0
              ],
              [
                0,
                0,
                12
              ]
            ],
            "periodic": [
              false,
              false,
              false
            ],
            "unit": "angstrom"
          },
          "render": {
            "coordinateUnit": "angstrom",
            "bonding": "provided",
            "style": "ball-stick"
          }
        },
        "fixtureBytes": "3\nwater frame 0\nO 0 0 0\nH 0.76 0.58 0\nH -0.76 0.58 0\n"
      },
      "extension": {
        "version": 1,
        "type": "second-agent.unrecognized",
        "data": {
          "summary": "Preserve metadata; no executable renderer"
        }
      }
    }
  },
  "cuantico": {
    "agentId": "cuantico",
    "discovery": {
      "contractVersion": 1,
      "viewerState": "personal-transient",
      "submission": "explicit",
      "capabilities": {
        "elagente.viewer.select": true,
        "elagente.viewer.capture": true,
        "elagente.viewer.style": true,
        "elagente.viewer.program": false,
        "elagente.conversation.export": true,
        "elagente.conversation.share-read": true,
        "elagente.conversation.share-write": false,
        "elagente.conversation.fork": false
      },
      "contributions": [
        {
          "id": "cuantico.science",
          "type": "cuantico.science",
          "version": 1,
          "minContractVersion": 1,
          "rendererIds": [
            "cuantico.spectrum"
          ],
          "panelIds": [
            "cuantico.workflow"
          ],
          "actionIds": [
            "elagente.viewer.select",
            "elagente.viewer.capture",
            "elagente.viewer.style"
          ],
          "optionIds": [
            "science.precision"
          ]
        }
      ],
      "options": [
        {
          "id": "science.precision",
          "label": "Precision",
          "scope": "thread",
          "apply": "nextTurn",
          "mutable": true,
          "schema": {
            "type": "string",
            "enum": [
              "standard",
              "high"
            ]
          },
          "default": "standard"
        }
      ],
      "actions": [
        {
          "id": "elagente.viewer.select",
          "label": "Submit selection",
          "execution": "native",
          "completion": "applied",
          "inputSchema": {
            "type": "object",
            "properties": {
              "selectedIds": {
                "type": "array",
                "items": {
                  "type": "string",
                  "maxLength": 160
                },
                "maxItems": 1e4
              }
            },
            "required": [
              "selectedIds"
            ],
            "additionalProperties": false
          },
          "resultSchema": {
            "type": "object",
            "properties": {
              "selectedIds": {
                "type": "array",
                "items": {
                  "type": "string",
                  "maxLength": 160
                },
                "maxItems": 1e4
              }
            },
            "required": [
              "selectedIds"
            ],
            "additionalProperties": false
          }
        },
        {
          "id": "elagente.viewer.capture",
          "label": "Capture PNG",
          "execution": "browser",
          "completion": "applied",
          "inputSchema": {
            "type": "object",
            "properties": {},
            "additionalProperties": false
          },
          "resultSchema": {
            "type": "object",
            "properties": {
              "imageArtifactId": {
                "type": "string",
                "maxLength": 160
              },
              "mediaType": {
                "type": "string",
                "enum": [
                  "image/png"
                ]
              },
              "width": {
                "type": "integer",
                "minimum": 1,
                "maximum": 8192
              },
              "height": {
                "type": "integer",
                "minimum": 1,
                "maximum": 8192
              }
            },
            "required": [
              "imageArtifactId",
              "mediaType",
              "width",
              "height"
            ],
            "additionalProperties": false
          }
        },
        {
          "id": "elagente.viewer.style",
          "label": "Change representation",
          "execution": "browser",
          "completion": "applied",
          "inputSchema": {
            "type": "object",
            "properties": {
              "style": {
                "type": "string",
                "enum": [
                  "ball-stick",
                  "stick",
                  "spacefill"
                ]
              }
            },
            "required": [
              "style"
            ],
            "additionalProperties": false
          },
          "resultSchema": {
            "type": "object",
            "properties": {},
            "additionalProperties": false
          }
        }
      ]
    },
    "artifacts": [
      {
        "id": "artifact-cuantico-0",
        "version": 1,
        "path": ".artifacts/971fe507f8dfe21ef73a40a245e25a454bac0854f3530b266d4b0172cb907a5d.csv",
        "name": "cuantico-0.csv",
        "checksum": "971fe507f8dfe21ef73a40a245e25a454bac0854f3530b266d4b0172cb907a5d",
        "size": 36,
        "mediaType": "text/csv",
        "kind": "science.spectrum",
        "createdAt": "2026-10-04T00:00:00.000Z",
        "turnId": "turn-fixture-1",
        "metadata": {
          "version": 1,
          "objectId": "urn:cuantico:spectrum:1",
          "sourceRevision": "native-revision-0",
          "checksum": "971fe507f8dfe21ef73a40a245e25a454bac0854f3530b266d4b0172cb907a5d",
          "format": "csv",
          "stream": {
            "id": "cuantico-stream-1",
            "frameId": "frame-0",
            "frameIndex": 0
          }
        },
        "fixtureBytes": "frequency,intensity\n100,0.5\n200,1.0\n"
      },
      {
        "id": "artifact-cuantico-1",
        "version": 1,
        "path": ".artifacts/1bc4c77c41517f0cfe36e1cc87a5a9f27b01e0ca39e3d02522c58d626f997da9.csv",
        "name": "cuantico-1.csv",
        "checksum": "1bc4c77c41517f0cfe36e1cc87a5a9f27b01e0ca39e3d02522c58d626f997da9",
        "size": 36,
        "mediaType": "text/csv",
        "kind": "science.spectrum",
        "createdAt": "2026-10-04T00:00:00.000Z",
        "turnId": "turn-fixture-1",
        "metadata": {
          "version": 1,
          "objectId": "urn:cuantico:spectrum:1",
          "sourceRevision": "native-revision-1",
          "checksum": "1bc4c77c41517f0cfe36e1cc87a5a9f27b01e0ca39e3d02522c58d626f997da9",
          "format": "csv",
          "stream": {
            "id": "cuantico-stream-1",
            "frameId": "frame-1",
            "frameIndex": 1
          }
        },
        "fixtureBytes": "frequency,intensity\n100,0.6\n200,0.9\n"
      }
    ],
    "input": {
      "version": 1,
      "requestId": "cuantico-request-1",
      "operationId": "cuantico-operation-1",
      "actionId": "elagente.viewer.select",
      "target": {
        "artifactId": "artifact-cuantico-0",
        "objectId": "urn:cuantico:spectrum:1",
        "sourceRevision": "native-revision-0",
        "checksum": "971fe507f8dfe21ef73a40a245e25a454bac0854f3530b266d4b0172cb907a5d",
        "streamId": "cuantico-stream-1",
        "frameId": "frame-0",
        "frameIndex": 0
      },
      "payload": {
        "selectedIds": [
          "sample-100"
        ]
      },
      "kind": "selection",
      "submission": "explicit"
    },
    "acknowledgements": [
      {
        "version": 1,
        "requestId": "cuantico-request-1",
        "operationId": "cuantico-operation-1",
        "actionId": "elagente.viewer.select",
        "target": {
          "artifactId": "artifact-cuantico-0",
          "objectId": "urn:cuantico:spectrum:1",
          "sourceRevision": "native-revision-0",
          "checksum": "971fe507f8dfe21ef73a40a245e25a454bac0854f3530b266d4b0172cb907a5d",
          "streamId": "cuantico-stream-1",
          "frameId": "frame-0",
          "frameIndex": 0
        },
        "status": "accepted"
      },
      {
        "version": 1,
        "requestId": "cuantico-request-1",
        "operationId": "cuantico-operation-1",
        "actionId": "elagente.viewer.select",
        "target": {
          "artifactId": "artifact-cuantico-0",
          "objectId": "urn:cuantico:spectrum:1",
          "sourceRevision": "native-revision-0",
          "checksum": "971fe507f8dfe21ef73a40a245e25a454bac0854f3530b266d4b0172cb907a5d",
          "streamId": "cuantico-stream-1",
          "frameId": "frame-0",
          "frameIndex": 0
        },
        "status": "applied",
        "result": {
          "selectedIds": [
            "sample-100"
          ]
        }
      }
    ],
    "progress": {
      "version": 1,
      "callId": "tool-fixture-1",
      "label": "Scientific calculation",
      "status": "completed",
      "arguments": {
        "precision": "standard"
      },
      "startedAt": "2026-10-04T00:00:00.000Z",
      "completedAt": "2026-10-04T00:00:01.000Z",
      "resultSummary": "Two immutable frames",
      "logSummary": "Task complete",
      "artifactIds": [
        "artifact-cuantico-0",
        "artifact-cuantico-1"
      ],
      "completed": 2,
      "total": 2,
      "unit": "frames"
    },
    "usage": {
      "version": 1,
      "scope": "turn",
      "scopeId": "turn-fixture-1",
      "observedAt": "2026-10-04T00:00:01.000Z",
      "availability": "available",
      "tokens": {
        "input": 20,
        "output": 10,
        "cacheRead": 5
      }
    },
    "unavailableUsage": {
      "version": 1,
      "scope": "room",
      "scopeId": "thr-fixture",
      "observedAt": "2026-10-04T00:00:01.000Z",
      "availability": "unavailable"
    },
    "unknownItem": {
      "id": "unknown-fixture",
      "kind": "science.unknown",
      "text": "Scientific data available for download",
      "artifact": {
        "id": "artifact-cuantico-0",
        "version": 1,
        "path": ".artifacts/971fe507f8dfe21ef73a40a245e25a454bac0854f3530b266d4b0172cb907a5d.csv",
        "name": "cuantico-0.csv",
        "checksum": "971fe507f8dfe21ef73a40a245e25a454bac0854f3530b266d4b0172cb907a5d",
        "size": 36,
        "mediaType": "text/csv",
        "kind": "science.spectrum",
        "createdAt": "2026-10-04T00:00:00.000Z",
        "turnId": "turn-fixture-1",
        "metadata": {
          "version": 1,
          "objectId": "urn:cuantico:spectrum:1",
          "sourceRevision": "native-revision-0",
          "checksum": "971fe507f8dfe21ef73a40a245e25a454bac0854f3530b266d4b0172cb907a5d",
          "format": "csv",
          "stream": {
            "id": "cuantico-stream-1",
            "frameId": "frame-0",
            "frameIndex": 0
          }
        },
        "fixtureBytes": "frequency,intensity\n100,0.5\n200,1.0\n"
      },
      "extension": {
        "version": 1,
        "type": "second-agent.unrecognized",
        "data": {
          "summary": "Preserve metadata; no executable renderer"
        }
      }
    }
  }
};
function freeze(v) {
  if (v && typeof v === "object") {
    Object.values(v).forEach(freeze);
    Object.freeze(v);
  }
  return v;
}
var EXTENSION_FIXTURES = freeze(fixtures);

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
  EXTENSION_FIXTURES,
  EXTENSION_TYPES,
  EXTENSION_VERSION,
  ExtensionValidationError,
  agentBackendIds,
  agentBackendMetadata,
  defaultAgentBackendId,
  extensionFallback,
  hasCapability,
  isAgentBackendId,
  mergeThreadHistoryItem,
  normalizeAgentBackendId,
  truncateAutoThreadTitle,
  validateArtifactMetadata,
  validateDiscovery,
  validateExtension,
  validateOptionValues,
  validatePayload,
  validateProgress,
  validateScientificTarget,
  validateUsage,
  validateValueSchema,
  validateViewerAcknowledgement,
  validateViewerInput,
  validateViewerRequest
};

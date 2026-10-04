// Browser-safe, dependency-free validators. Preserve additive fields verbatim.
export const EXTENSION_VERSION = 1;
export const EXTENSION_TYPES = Object.freeze({
  discovery: 'elagente.discovery', artifact: 'elagente.artifact-metadata',
  progress: 'elagente.progress', usage: 'elagente.usage',
  viewerInput: 'elagente.viewer-input', viewerAction: 'elagente.viewer-action',
  viewerAcknowledgement: 'elagente.viewer-acknowledgement',
});
export class ExtensionValidationError extends Error {
  constructor(code, path, message) { super(`${path}: ${message}`); this.name = 'ExtensionValidationError'; this.code = code; this.path = path; }
}
const fail = (path, message, code = 'INVALID_EXTENSION') => { throw new ExtensionValidationError(code, path, message); };
const obj = (v, p) => { if (!v || typeof v !== 'object' || Array.isArray(v) || ![Object.prototype, null].includes(Object.getPrototypeOf(v))) fail(p, 'expected object'); };
const str = (v, p, max = 1024) => { if (typeof v !== 'string' || !v.trim() || v.length > max) fail(p, `expected nonempty string (max ${max})`); };
const num = (v, p) => { if (typeof v !== 'number' || !Number.isFinite(v)) fail(p, 'expected finite number'); };
const integer = (v, p) => { num(v, p); if (!Number.isSafeInteger(v) || v < 0) fail(p, 'expected nonnegative safe integer'); };
const bool = (v, p) => { if (typeof v !== 'boolean') fail(p, 'expected boolean'); };
const one = (v, values, p) => { if (!values.includes(v)) fail(p, `expected one of ${values.join(', ')}`); };
const version = (v, p) => { if (v !== 1) fail(p, 'unsupported version (supported: 1)', 'UNSUPPORTED_EXTENSION_VERSION'); };
const name = (v, p) => { str(v, p, 160); if (!/^[a-z][a-z0-9-]*(?:[.:/][a-zA-Z0-9_-]+)+$/.test(v)) fail(p, 'expected namespaced ID'); };
const list = (v, p, max = 1000) => { if (!Array.isArray(v) || v.length > max) fail(p, `expected array (max ${max})`); };
const unique = (v, p) => { if (new Set(v).size !== v.length) fail(p, 'duplicate IDs'); };
const ids = (v, p) => { list(v, p); v.forEach((s, i) => str(s, `${p}[${i}]`)); unique(v, p); };
const own = (v, key) => Object.hasOwn(v, key);
function json(v, p = 'data', depth = 0, budget = {nodes: 0}) {
  if (++budget.nodes > 100000 || depth > 32) fail(p, 'JSON depth/node limit');
  if (v === null || typeof v === 'boolean' || typeof v === 'string') { if (typeof v === 'string' && v.length > 1048576) fail(p, 'string limit'); return; }
  if (typeof v === 'number') { num(v, p); return; }
  if (Array.isArray(v)) { list(v, p, 10000); v.forEach((x, i) => json(x, `${p}[${i}]`, depth + 1, budget)); return; }
  obj(v, p);
  for (const [k, x] of Object.entries(v)) {
    if (['__proto__', 'prototype', 'constructor'].includes(k)) fail(p, 'unsafe JSON key');
    json(x, `${p}.${k}`, depth + 1, budget);
  }
}
const timestamp = (v, p) => { str(v, p); if (!/^\d{4}-\d\d-\d\dT/.test(v) || !Number.isFinite(Date.parse(v))) fail(p, 'expected ISO timestamp'); };
function schema(s, p, depth = 0) {
  obj(s, p); if (depth > 8) fail(p, 'schema depth limit');
  const keys = {string: ['enum', 'maxLength'], number: ['minimum', 'maximum'], integer: ['minimum', 'maximum'], boolean: [], null: [], array: ['items', 'maxItems'], object: ['properties', 'required', 'additionalProperties']};
  one(s.type, Object.keys(keys), `${p}.type`);
  for (const k of Object.keys(s)) if (k !== 'type' && !keys[s.type].includes(k)) fail(`${p}.${k}`, 'unsupported schema keyword');
  if (s.enum !== undefined) { ids(s.enum, `${p}.enum`); if (!s.enum.length) fail(p, 'empty enum'); }
  if (s.maxLength !== undefined) { integer(s.maxLength, p); if (s.maxLength > 1048576) fail(p, 'maxLength limit'); }
  for (const k of ['minimum', 'maximum']) if (s[k] !== undefined) num(s[k], `${p}.${k}`);
  if (s.minimum > s.maximum) fail(p, 'inverted bounds');
  if (s.type === 'array') { integer(s.maxItems, `${p}.maxItems`); if (s.maxItems > 10000) fail(p, 'maxItems limit'); schema(s.items, `${p}.items`, depth + 1); }
  if (s.type === 'object') {
    obj(s.properties, `${p}.properties`); if (Object.keys(s.properties).length > 100) fail(p, 'property limit');
    one(s.additionalProperties, [false], `${p}.additionalProperties`);
    for (const [k, child] of Object.entries(s.properties)) { if (['__proto__', 'constructor', 'prototype'].includes(k)) fail(p, 'unsafe schema key'); schema(child, `${p}.properties.${k}`, depth + 1); }
    if (s.required !== undefined) { ids(s.required, `${p}.required`); for (const k of s.required) if (!own(s.properties, k)) fail(p, 'required key has no schema'); }
  }
}
export function validateValueSchema(v) { json(v); schema(v, 'schema'); }
function payload(s, v, p) {
  if (s.type === 'null') { one(v, [null], p); return; }
  if (s.type === 'boolean') { bool(v, p); return; }
  if (s.type === 'string') {
    if (typeof v !== 'string' || v.length > (s.maxLength ?? 1048576)) fail(p, 'invalid string');
    if (s.enum && !s.enum.includes(v)) fail(p, 'invalid enum value'); return;
  }
  if (s.type === 'number' || s.type === 'integer') {
    num(v, p); if (s.type === 'integer' && !Number.isSafeInteger(v)) fail(p, 'expected safe integer');
    if ((s.minimum !== undefined && v < s.minimum) || (s.maximum !== undefined && v > s.maximum)) fail(p, 'out of bounds'); return;
  }
  if (s.type === 'array') { list(v, p, s.maxItems); v.forEach((x, i) => payload(s.items, x, `${p}[${i}]`)); return; }
  obj(v, p); for (const k of s.required ?? []) if (!own(v, k)) fail(`${p}.${k}`, 'required');
  for (const [k, x] of Object.entries(v)) { if (!own(s.properties, k)) fail(`${p}.${k}`, 'unknown payload field'); payload(s.properties[k], x, `${p}.${k}`); }
}
export function validatePayload(s, v) { validateValueSchema(s); json(v); payload(s, v, 'payload'); }
export function validateDiscovery(v) {
  json(v); obj(v, 'discovery'); version(v.contractVersion, 'contractVersion');
  one(v.viewerState, ['personal-transient'], 'viewerState'); one(v.submission, ['explicit'], 'submission');
  obj(v.capabilities, 'capabilities'); for (const [k, x] of Object.entries(v.capabilities)) { name(k, 'capability'); bool(x, k); }
  for (const key of ['contributions', 'options', 'actions']) { list(v[key], key, 100); unique(v[key].map(x => x?.id), key); }
  for (const o of v.options) {
    obj(o, 'option'); name(o.id, 'option.id'); str(o.label, 'option.label'); if (o.description !== undefined) str(o.description, 'option.description', 8192);
    one(o.scope, ['thread', 'turn'], 'option.scope'); one(o.apply, ['nextTurn', 'restart'], 'option.apply'); bool(o.mutable, 'option.mutable');
    if (o.scope === 'turn' && o.apply === 'restart') fail('option.apply', 'turn options cannot restart a runtime');
    validateValueSchema(o.schema); if (own(o, 'default')) validatePayload(o.schema, o.default);
  }
  for (const a of v.actions) {
    obj(a, 'action'); name(a.id, 'action.id'); str(a.label, 'action.label'); one(a.execution, ['browser', 'native'], 'action.execution'); one(a.completion, ['applied'], 'action.completion');
    validateValueSchema(a.inputSchema); validateValueSchema(a.resultSchema);
  }
  for (const c of v.contributions) {
    obj(c, 'contribution'); name(c.id, 'contribution.id'); name(c.type, 'contribution.type'); version(c.version, 'contribution.version'); version(c.minContractVersion, 'contribution.minContractVersion');
    for (const key of ['rendererIds', 'panelIds', 'actionIds', 'optionIds']) { ids(c[key], key); c[key].forEach(x => name(x, key)); }
    for (const id of c.actionIds) if (!v.actions.some(a => a.id === id)) fail('actionIds', 'undeclared action');
    for (const id of c.optionIds) if (!v.options.some(o => o.id === id)) fail('optionIds', 'undeclared option');
  }
  return v;
}
export function hasCapability(discovery, id) { return discovery?.contractVersion === 1 && discovery?.capabilities?.[id] === true; }
export function validateOptionValues(discovery, values, scope = 'thread') {
  validateDiscovery(discovery); json(values); obj(values, 'options'); one(scope, ['thread', 'turn'], 'scope');
  for (const [id, value] of Object.entries(values)) {
    const o = discovery.options.find(x => x.id === id);
    if (!o || o.scope !== scope) fail(id, 'unsupported option/scope', 'UNSUPPORTED_CAPABILITY');
    if (!o.mutable) fail(id, 'read-only option'); validatePayload(o.schema, value);
  }
  return values;
}
export function validateScientificTarget(v) {
  obj(v, 'target'); for (const k of ['artifactId', 'objectId', 'sourceRevision']) str(v[k], `target.${k}`);
  if (typeof v.checksum !== 'string' || !/^[a-f0-9]{64}$/.test(v.checksum)) fail('target.checksum', 'expected lowercase SHA-256');
  const frame = ['streamId', 'frameId', 'frameIndex'].some(k => own(v, k));
  if (frame) { str(v.streamId, 'target.streamId'); str(v.frameId, 'target.frameId'); integer(v.frameIndex, 'target.frameIndex'); }
  return v;
}
export function validateArtifactMetadata(v) {
  json(v); obj(v, 'metadata'); version(v.version, 'metadata.version');
  validateScientificTarget({...v, artifactId: 'metadata', ...(v.stream ? {streamId: v.stream.id, frameId: v.stream.frameId, frameIndex: v.stream.frameIndex} : {})});
  str(v.format, 'format', 64);
  if (v.stream !== undefined) obj(v.stream, 'stream');
  if (v.atoms !== undefined) {
    list(v.atoms, 'atoms', 10000); unique(v.atoms.map(a => a?.id), 'atoms');
    for (const a of v.atoms) { obj(a, 'atom'); str(a.id, 'atom.id'); if (!/^[A-Z][a-z]?$/.test(a.element)) fail('atom.element', 'expected element symbol'); }
  }
  if (v.bonds !== undefined) {
    if (!v.atoms) fail('bonds', 'explicit bonds require stable atom IDs'); list(v.bonds, 'bonds', 10000);
    const atoms = new Set(v.atoms.map(a => a.id)); const seen = new Set();
    for (const b of v.bonds) {
      obj(b, 'bond'); list(b.atomIds, 'bond.atomIds', 2);
      if (b.atomIds.length !== 2 || b.atomIds[0] === b.atomIds[1] || b.atomIds.some(a => !atoms.has(a))) fail('bond.atomIds', 'expected two distinct existing atom IDs');
      one(b.order, [1, 1.5, 2, 3], 'bond.order'); const key = JSON.stringify([...b.atomIds].sort()); if (seen.has(key)) fail('bonds', 'duplicate bond'); seen.add(key);
    }
  }
  if (v.cell !== undefined) {
    obj(v.cell, 'cell'); list(v.cell.vectors, 'cell.vectors', 3); if (v.cell.vectors.length !== 3) fail('cell.vectors', 'expected 3 vectors');
    v.cell.vectors.forEach(row => { list(row, 'cell.vector', 3); if (row.length !== 3) fail('cell.vector', 'expected 3 coordinates'); row.forEach(n => num(n, 'cell.coordinate')); });
    const [a, b, c] = v.cell.vectors; const det = a[0]*(b[1]*c[2]-b[2]*c[1])-a[1]*(b[0]*c[2]-b[2]*c[0])+a[2]*(b[0]*c[1]-b[1]*c[0]);
    if (!Number.isFinite(det) || Math.abs(det) < 1e-12) fail('cell.vectors', 'degenerate cell');
    list(v.cell.periodic, 'cell.periodic', 3); if (v.cell.periodic.length !== 3) fail('cell.periodic', 'expected 3 flags'); v.cell.periodic.forEach(x => bool(x, 'cell.periodic'));
    one(v.cell.unit, ['angstrom', 'bohr'], 'cell.unit');
  }
  if (v.render !== undefined) {
    obj(v.render, 'render'); one(v.render.coordinateUnit, ['angstrom', 'bohr'], 'render.coordinateUnit'); one(v.render.bonding, ['provided', 'infer', 'none'], 'render.bonding');
    if (v.render.bonding === 'provided' && !v.bonds) fail('render.bonding', 'provided bonds missing');
    if (v.render.style !== undefined) one(v.render.style, ['ball-stick', 'stick', 'spacefill'], 'render.style');
    if (v.render.background !== undefined && !/^#[a-fA-F0-9]{6}$/.test(v.render.background)) fail('render.background', 'expected hex color');
  }
  return v;
}
function action(discovery, id) {
  validateDiscovery(discovery); const a = discovery.actions.find(x => x.id === id);
  if (!a || !hasCapability(discovery, id)) fail('actionId', 'action is unavailable', 'UNSUPPORTED_CAPABILITY'); return a;
}
export function validateViewerRequest(v, discovery) {
  json(v); obj(v, 'request'); version(v.version, 'request.version'); str(v.requestId, 'requestId'); str(v.operationId, 'operationId'); name(v.actionId, 'actionId'); validateScientificTarget(v.target);
  validatePayload(action(discovery, v.actionId).inputSchema, v.payload); return v;
}
export function validateViewerInput(v, discovery) {
  validateViewerRequest(v, discovery); one(v.kind, ['selection', 'screenshot', 'action'], 'kind'); one(v.submission, ['explicit'], 'submission'); return v;
}
export function validateViewerAcknowledgement(v, request, discovery) {
  validateViewerRequest(request, discovery); json(v); obj(v, 'acknowledgement'); version(v.version, 'acknowledgement.version'); validateScientificTarget(v.target);
  for (const k of ['requestId', 'operationId', 'actionId']) if (v[k] !== request[k]) fail(k, 'acknowledgement identity mismatch', 'STALE_VIEWER_TARGET');
  for (const k of ['artifactId', 'objectId', 'sourceRevision', 'checksum', 'streamId', 'frameId', 'frameIndex']) if (v.target[k] !== request.target[k]) fail(`target.${k}`, 'acknowledgement target mismatch', 'STALE_VIEWER_TARGET');
  one(v.status, ['accepted', 'applied', 'rejected'], 'status');
  if (v.status === 'rejected') { obj(v.error, 'error'); str(v.error.code, 'error.code'); str(v.error.message, 'error.message', 8192); if (own(v, 'result')) fail('result', 'rejection cannot have successful result'); }
  else {
    if (own(v, 'error')) fail('error', 'successful acknowledgement cannot have error');
    if (v.status === 'accepted' && own(v, 'result')) fail('result', 'acceptance is not completion');
    if (v.status === 'applied') validatePayload(action(discovery, v.actionId).resultSchema, v.result);
  }
  return v;
}
export function validateProgress(v) {
  json(v); obj(v, 'progress'); version(v.version, 'progress.version'); str(v.callId, 'callId'); str(v.label, 'label');
  one(v.status, ['queued', 'running', 'waitingForInput', 'completed', 'failed', 'interrupted'], 'status');
  for (const k of ['startedAt', 'completedAt']) if (v[k] !== undefined) timestamp(v[k], k);
  if (v.completedAt && !['completed', 'failed', 'interrupted'].includes(v.status)) fail('completedAt', 'nonterminal progress');
  if (v.startedAt && v.completedAt && Date.parse(v.completedAt) < Date.parse(v.startedAt)) fail('completedAt', 'precedes start');
  for (const k of ['resultSummary', 'logSummary']) if (v[k] !== undefined) str(v[k], k, 8192);
  if (v.artifactIds !== undefined) ids(v.artifactIds, 'artifactIds');
  for (const k of ['completed', 'total']) if (v[k] !== undefined) integer(v[k], k);
  if (v.completed > v.total) fail('completed', 'exceeds total');
  if (v.unit !== undefined) str(v.unit, 'unit'); if (v.parentCallId !== undefined) str(v.parentCallId, 'parentCallId'); return v;
}
export function validateUsage(v) {
  json(v); obj(v, 'usage'); version(v.version, 'usage.version'); one(v.scope, ['turn', 'room', 'tool'], 'scope'); str(v.scopeId, 'scopeId'); timestamp(v.observedAt, 'observedAt');
  one(v.availability, ['available', 'unavailable'], 'availability');
  if (v.availability === 'unavailable' && (own(v, 'tokens') || own(v, 'cost'))) fail('usage', 'unavailable usage cannot imply zero/measured usage');
  if (v.tokens !== undefined) { obj(v.tokens, 'tokens'); for (const k of ['input', 'output', 'reasoning', 'cacheRead', 'cacheWrite', 'total']) if (v.tokens[k] !== undefined) integer(v.tokens[k], `tokens.${k}`); }
  if (v.cost !== undefined) { obj(v.cost, 'cost'); num(v.cost.amount, 'cost.amount'); if (v.cost.amount < 0) fail('cost.amount', 'negative cost'); if (!/^[A-Z]{3}$/.test(v.cost.currency)) fail('cost.currency', 'expected currency code'); }
  return v;
}
export function validateExtension(v, discovery, originatingRequest) {
  json(v); obj(v, 'extension'); version(v.version, 'extension.version'); name(v.type, 'extension.type'); if (!own(v, 'data')) fail('data', 'required');
  const validators = {[EXTENSION_TYPES.discovery]: validateDiscovery, [EXTENSION_TYPES.artifact]: validateArtifactMetadata, [EXTENSION_TYPES.progress]: validateProgress, [EXTENSION_TYPES.usage]: validateUsage};
  if (validators[v.type]) validators[v.type](v.data);
  else if (v.type === EXTENSION_TYPES.viewerInput) validateViewerInput(v.data, discovery);
  else if (v.type === EXTENSION_TYPES.viewerAction) validateViewerRequest(v.data, discovery);
  else if (v.type === EXTENSION_TYPES.viewerAcknowledgement) {
    if (!originatingRequest) fail('type', 'validate acknowledgement against its originating request');
    validateViewerAcknowledgement(v.data, originatingRequest, discovery);
  }
  // An unknown v1 type is safe data, never a UI module registration.
  return v;
}
export function extensionFallback(v) {
  const envelope = validateExtension(v);
  return {kind: 'metadata-text-download', type: envelope.type, text: `Unsupported contribution: ${envelope.type}`, metadata: envelope.data};
}

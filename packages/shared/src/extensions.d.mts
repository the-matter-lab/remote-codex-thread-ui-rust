/** Additive extension data contract. Transport/feature support must be advertised separately. */
export declare const EXTENSION_VERSION: 1;
export declare const EXTENSION_TYPES: Readonly<Record<string, string>>;
export type JsonValue = null | boolean | number | string | JsonValue[] | {[key: string]: JsonValue};
export interface ExtensionEnvelope<T = JsonValue> {version: 1; type: string; data: T; [field: string]: unknown}
/** A deliberately bounded declarative schema; no refs, code, URLs or dynamic imports. */
export type ValueSchema =
  | {type: 'string'; enum?: string[]; maxLength?: number}
  | {type: 'number' | 'integer'; minimum?: number; maximum?: number}
  | {type: 'boolean' | 'null'}
  | {type: 'array'; items: ValueSchema; maxItems: number}
  | {type: 'object'; properties: Record<string, ValueSchema>; required?: string[]; additionalProperties: false};
export interface OptionDefinition {
  id: string; label: string; description?: string; schema: ValueSchema; default?: JsonValue;
  scope: 'thread' | 'turn'; apply: 'nextTurn' | 'restart'; mutable: boolean;
}
export interface ActionDefinition {
  id: string; label: string; inputSchema: ValueSchema; resultSchema: ValueSchema;
  execution: 'browser' | 'native'; completion: 'applied';
}
export interface ContributionDefinition {
  id: string; type: string; version: 1; minContractVersion: 1;
  rendererIds: string[]; panelIds: string[]; actionIds: string[]; optionIds: string[];
}
export interface ExtensionDiscovery {
  contractVersion: 1; capabilities: Record<string, boolean>;
  contributions: ContributionDefinition[]; options: OptionDefinition[]; actions: ActionDefinition[];
  viewerState: 'personal-transient'; submission: 'explicit';
}
export interface ScientificTarget {
  artifactId: string; objectId: string; sourceRevision: string; checksum: string;
  streamId?: string; frameId?: string; frameIndex?: number;
}
export interface ArtifactMetadata {
  version: 1; objectId: string; sourceRevision: string; checksum: string; format: string;
  stream?: {id: string; frameId: string; frameIndex: number};
  atoms?: {id: string; element: string}[];
  bonds?: {atomIds: [string, string]; order: number}[];
  cell?: {vectors: [[number, number, number], [number, number, number], [number, number, number]]; periodic: [boolean, boolean, boolean]; unit: 'angstrom' | 'bohr'};
  render?: {coordinateUnit: 'angstrom' | 'bohr'; bonding: 'provided' | 'infer' | 'none'; style?: 'ball-stick' | 'stick' | 'spacefill'; background?: string};
  [field: string]: unknown;
}
export interface ViewerRequest {
  version: 1; requestId: string; operationId: string; actionId: string;
  target: ScientificTarget; payload: JsonValue;
}
export interface ViewerInput extends ViewerRequest {
  kind: 'selection' | 'screenshot' | 'action'; submission: 'explicit';
}
export interface ViewerAcknowledgement {
  version: 1; requestId: string; operationId: string; actionId: string;
  target: ScientificTarget; status: 'accepted' | 'applied' | 'rejected';
  result?: JsonValue; error?: {code: string; message: string};
}
export interface StructuredProgress {
  version: 1; callId: string; status: 'queued' | 'running' | 'waitingForInput' | 'completed' | 'failed' | 'interrupted';
  label: string; arguments?: JsonValue; startedAt?: string; completedAt?: string;
  resultSummary?: string; logSummary?: string; artifactIds?: string[];
  completed?: number; total?: number; unit?: string; parentCallId?: string;
}
export interface StructuredUsage {
  version: 1; scope: 'turn' | 'room' | 'tool'; availability: 'available' | 'unavailable';
  scopeId: string; observedAt: string;
  tokens?: {input?: number; output?: number; reasoning?: number; cacheRead?: number; cacheWrite?: number; total?: number};
  cost?: {amount: number; currency: string};
}
export declare class ExtensionValidationError extends Error {code: string; path: string}
export declare function validateValueSchema(value: unknown): asserts value is ValueSchema;
export declare function validatePayload(schema: ValueSchema, value: unknown): asserts value is JsonValue;
export declare function validateDiscovery(value: unknown): ExtensionDiscovery;
export declare function hasCapability(discovery: ExtensionDiscovery | undefined, id: string): boolean;
export declare function validateOptionValues(discovery: ExtensionDiscovery, values: unknown, scope?: 'thread' | 'turn'): Record<string, JsonValue>;
export declare function validateArtifactMetadata(value: unknown): ArtifactMetadata;
export declare function validateScientificTarget(value: unknown): ScientificTarget;
export declare function validateViewerRequest(value: unknown, discovery: ExtensionDiscovery): ViewerRequest;
export declare function validateViewerInput(value: unknown, discovery: ExtensionDiscovery): ViewerInput;
export declare function validateViewerAcknowledgement(value: unknown, request: ViewerRequest, discovery: ExtensionDiscovery): ViewerAcknowledgement;
export declare function validateProgress(value: unknown): StructuredProgress;
export declare function validateUsage(value: unknown): StructuredUsage;
export declare function validateExtension(value: unknown, discovery?: ExtensionDiscovery, originatingRequest?: ViewerRequest): ExtensionEnvelope<unknown>;
/** Unknown types retain data but never select executable UI. */
export declare function extensionFallback(value: unknown): {kind: 'metadata-text-download'; type: string; text: string; metadata: unknown};

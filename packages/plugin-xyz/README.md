# XYZ artifact plugin

Registers plugin ID `elagente.xyz` for `chem.structure`. The host supplies:

```json
{"url":"/artifacts/<thread>/<artifact>","checksum":"<sha256>","name":"water.xyz","format":"xyz"}
```

`StructureView` fetches the fixed artifact, checks its SHA-256 and renders the
shared `GraphMoleculeViewer`. XYZ/extXYZ trajectories use the existing viewer's
playback and local atom selection. The plugin never runs agent-provided JavaScript.

Register `xyzPlugin` through `PluginProvider.builtinPlugins`, as shown by
`apps/elagente-web/src/App.tsx`. Hosts must provide the local 3Dmol script at
`/vendor/3Dmol-min.js`; the ElAgente Vite configuration packages it from the
workspace dependency. Future structure/report plugins can use the same artifact
renderer registry without changing the app-server's conversation protocol.

The same plugin also accepts CIF (including unit-cell controls), PDB, SDF, and MOL artifacts. The host must preserve the file format in the artifact payload; do not label these files as XYZ. All formats retain checksum verification and same-origin downloads.

`onReady(handle)` supplies the currently rendered immutable target, producer
trajectory index, `isAvailable()`, `captureView()`, `captureScreenshot()` and
`execute(request)`. `captureView()` synchronously returns a detached version 1
snapshot with a real PNG data URI, `mediaType: "image/png"`, PNG width/height,
target, trajectoryIndex, eight-value camera and canonical selectedIds. It reads
the live personal camera and selection at invocation. Retained handles reject
after their object/frame/revision changes, during verification, or after
unmount. `captureScreenshot()` remains an adapter returning the PNG string.

`onActive(handle)` reports personal pointer/focus inspection. A host uses it to
select its current workspace viewer, checks DOM visibility and availability,
and resolves ambiguity or missing viewers visibly. Current-view capture must
use that mounted handle; mounting another viewer does not capture the user's
view. The host owns request validation, deadlines, immutable PNG upload and
response transport. The separate versioned current-view capture carrier
resolves the current target without weakening explicit-target W0 ACK fencing.

Explicit Send screenshot invokes async `onScreenshot(snapshot)` with the same
provenance and shows success or rejection. The host uploads the exact PNG as an
immutable artifact before submitting the native screenshot input. G28 wire
fields are imageArtifactId/mediaType/width/height, optional top-level camera and
trajectoryIndex, and optional `provenance: {version: 1, selectedIds}`. The
dedicated current-view capture result instead requires top-level selectedIds,
camera and trajectoryIndex. Neither wire carrier includes PNG data URI bytes.
An artifact-backed action without an upload callback remains unavailable.
Camera and selection remain transient until this explicit submission or an
acknowledged agent capture.

`handle.execute()` accepts advertised W0 browser actions only. The reviewed
`elagente.viewer.command-batch` input is `{version: 1, commands: [...]}` with
at most 128 commands; its applied result is `{commandCount, durationMs}`.
Selection uses canonical selectedIds with optional bounded color/radius,
camera uses a finite eight-value 3Dmol view, and annotations replace the
agent-owned label set with `{id, text, atomId, color?}` entries. Style and
unit-cell commands are also supported. Color accepts #RRGGBB or black, white,
red, green, blue, yellow, orange, purple, cyan, magenta, gray and grey; radius
must be positive and at most 1000. Native adapters must preserve mapped
parameters and reject unsupported native commands instead of dropping them.
User pointer selection resets native highlight color/radius to the ordinary
personal selection style; hover labels are separate from agent annotations.

The executor validates the whole batch before effects, fences exact
object/revision/checksum/frame, deduplicates in-flight and completed operations,
and ACKs only after rendering completes. Unsupported variants, malformed
parameters, stale targets, busy/unmounted viewers and renderer failures reject
visibly. Reusing an operation with different input rejects. The 128-operation
history retains failed operations too; exceeding it rejects without eviction
or replay. Native completion follows the matching applied browser ACK.
`viewer.program` remains unsupported; declarative commands never execute code.

For bounded immutable sources, a host advertising
`elagente.structure.inline-source: true` may retain
`metadata.inlineSource: {version: 1, encoding: "utf8", content}` from the
validated publication. The complete canonical source, including all trajectory
frames, must fit 65,536 UTF-8 bytes and round-trip losslessly. Its SHA-256 must
match both the published artifact checksum and canonical metadata checksum.
The plugin verifies these bytes before exposing the new target or frame; it
does not refetch that artifact. The coordinator derives this payload from its
persisted immutable bytes. Source download and journal replay retain that same
identity. This optimization applies to any supported format, without agent
identity branching.

Missing or disabled inline delivery keeps the HTTP verification path. Large
sources and separate render/canonical representations with different checksums
use that path. Advertised malformed, unknown-version, oversized, lossy or
checksum-mismatched inline data fails visibly and keeps the previous viewer
unavailable for submissions. It never falls back to speculative bytes. LIVE
chooses the latest verified frame during rendering; the model and exact target
are committed before the corresponding frame controls can paint. Personal
historical frame and camera state remain on the retained viewer across appends.

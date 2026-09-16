# XYZ artifact plugin

Registers plugin ID `elagente.xyz` for `chem.structure`. The host supplies:

```json
{"url":"/artifacts/<thread>/<artifact>","checksum":"<sha256>","name":"water.xyz","format":"xyz"}
```

`StructureView` fetches the fixed artifact, checks its SHA-256 and renders the
shared `GraphMoleculeViewer`. XYZ/extXYZ trajectories use the existing viewer's
playback and local atom selection. An optional `onReady` callback supplies
`captureScreenshot()` and the active trajectory index for an acknowledged
`xyz.capture` client action. The plugin never runs agent-provided JavaScript.

Register `xyzPlugin` through `PluginProvider.builtinPlugins`, as shown by
`apps/elagente-web/src/App.tsx`. Hosts must provide the local 3Dmol script at
`/vendor/3Dmol-min.js`; the ElAgente Vite configuration packages it from the
workspace dependency. Future structure/report plugins can use the same artifact
renderer registry without changing the app-server's conversation protocol.

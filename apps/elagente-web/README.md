# ElAgente workspace host

This small host connects the shared thread surface to `elagente.app-server/v1`.
It uses the existing file explorer, Monaco editor and molecular viewer.
The UI repository is React/TypeScript/Vite despite its historical `-rust` name.
The validation branch is `app-server/elagente-validation`.

## Build and run

```sh
pnpm install --frozen-lockfile
pnpm --filter @remote-codex/shared --filter @remote-codex/plugin-runtime --filter @remote-codex/plugin-terminal --filter @remote-codex/thread-ui build
pnpm --filter @elagente/web typecheck
pnpm --filter @elagente/web build
```

The sibling cloud-infrastructure checkout serves `apps/elagente-web/dist`
alongside `/rpc`, `/ws`, `/files` and `/artifacts` on port 4310. See
`cloud-infrastructure/apps/app-server/README.md` for registry generation,
native Python environments and startup. The static same-origin setup is the
browser-verified path. The Vite dev server proxies those routes to port 4310.

The Seguro/Grafico review registry runs separately at `http://127.0.0.1:4311`.
Choose an agent in the left sidebar, then open one of its conversations or use
**New Chat**. The shared responsive rail handles desktop collapse and the mobile
drawer. Unsaved composer drafts are retained in memory when changing conversations.
The standalone host has no per-user identity and is not the hosted product shell.

XYZ artifacts are visible directly below the reply with **Worked for…** collapsed.
The artifact view stays mounted when that work disclosure is toggled. The file
browser remains independently available through **Expand workspace** on desktop
or the folder button on mobile.

There is no hosted login in this local host. When the server uses an operator
token, its same-origin `elagente_token` cookie must be supplied by the host.
Provider credentials and worker command lines are never entered in the UI.

## Integration boundaries

- `src/api.ts` owns HTTP RPC, WebSocket cursor replay, raw file upload/download,
  and the `ThreadWorkspaceAdapter`. Editing requires the revision read by the
  client. A stale save leaves the draft visible and reports a conflict.
- `src/projection.ts` maps authoritative app-server snapshots into shared DTOs.
  `elagente` is an explicit provider identity. Unsupported Codex operations are
  disabled through capabilities.
- `src/App.tsx` owns agent/thread selection, prompt submission, an operation-ID
  outbox, pending approvals/user input, screenshot replies and explicit compute
  cancellation. It does not infer compute cancellation from a stopped turn.
  Its agent selector uses the shared `renderNavigationHeader` slot; no alternate
  sidebar or topbar conversation dropdown is maintained by the host.
- `packages/plugin-xyz` registers `elagente.xyz` for `chem.structure` artifacts.
  It reads immutable bytes, verifies SHA-256 and calls the existing 3Dmol viewer.
  The app packages 3Dmol locally. Plugin code is trusted application code;
  this is not a sandbox for arbitrary downloaded plugins.

The shared package changes expose a `scientific-viewer` entry point, add a
viewer-ready screenshot callback, correct asynchronous viewer initialization,
and add ElAgente provider metadata. Published artifacts are separated from activity
before grouping and rendered after the reply; registered renderers start expanded,
while unknown types keep an inspectable fallback. The navigation header slot and
explicit null workspace scope let a host provide an agent-scoped conversation list.
Mobile navigation restores focus and excludes the closed drawer from keyboard
navigation. Two narrow type corrections address existing
workspace-layout/history DTO use. No replacement thread or file-browser
framework was introduced.

## Acceptance and current limits

The validation registry labels Seguro and Grafico as native agents using offline
models. Grafico's native `bash_exec` produces a two-frame `water.xyz`; `capture`
invokes its screenshot tool and `wait` exercises interruption. Quntur is labelled
an adapter contract fixture: `clarify` requests user input and emits a fixture
XYZ. Its full native factory/Mongo/scientific path has a separate acceptance gate.

The file API currently caps individual files at 20 MiB. Directory archives,
delete/trash and multipart uploads are not implemented. XYZ trajectories and
screenshots are supported; selection-to-native aliases and arbitrary GraphChat
viewer programs are not. Existing history is read after refresh; a crashed
active tool is fenced by the server and is not automatically replayed.

Browser artifacts are written to the ignored `output/playwright/` directory.
Run the shared package's `typecheck` and the focused `PluginProvider` /
`ThreadWorkspaceLayout` / `ThreadTimeline` tests when changing these integration boundaries.
The production build still reports existing large-chunk and Monaco internal
worker-URL warnings; basic Monaco editing and save are browser-verified.

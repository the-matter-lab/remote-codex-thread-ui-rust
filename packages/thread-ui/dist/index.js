import {
  GraphWorkspaceImageLightbox,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  WorkspaceFileLink,
  ZoomableImage,
  externalLinkProps,
  getGraphChatHighlighter,
  localFileHref,
  relativeWorkspacePath
} from "./chunk-MJXXSQ3O.js";
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  cn
} from "./chunk-TZBWAOOO.js";
import {
  styleInject
} from "./chunk-7O5E2ZHX.js";

// src/styles/base.css
styleInject('.thread-ui-shell,\n.thread-graph-dialog {\n  color-scheme: light;\n  --radius: 0.625rem;\n  --background: oklch(1 0 0);\n  --foreground: oklch(0.145 0 0);\n  --card: oklch(1 0 0);\n  --card-foreground: oklch(0.145 0 0);\n  --popover: oklch(1 0 0);\n  --popover-foreground: oklch(0.145 0 0);\n  --primary: oklch(0.205 0 0);\n  --primary-foreground: oklch(0.985 0 0);\n  --secondary: oklch(0.97 0 0);\n  --secondary-foreground: oklch(0.205 0 0);\n  --muted: oklch(0.97 0 0);\n  --muted-foreground: oklch(0.556 0 0);\n  --accent: oklch(0.97 0 0);\n  --accent-foreground: oklch(0.205 0 0);\n  --destructive: oklch(0.577 0.245 27.325);\n  --border: oklch(0.922 0 0);\n  --input: oklch(0.922 0 0);\n  --ring: oklch(0.708 0 0);\n  --sidebar: oklch(0.985 0 0);\n  --sidebar-foreground: oklch(0.145 0 0);\n  --sidebar-accent: oklch(0.97 0 0);\n  --sidebar-accent-foreground: oklch(0.205 0 0);\n  --sidebar-border: oklch(0.922 0 0);\n  --thread-gc-bg: oklch(0.965 0.006 220);\n  --thread-gc-panel: oklch(0.988 0.004 220);\n  --thread-gc-workspace: oklch(0.95 0.008 220);\n  --thread-gc-surface: oklch(0.925 0.011 220);\n  --thread-gc-muted: oklch(0.9 0.012 220);\n  --thread-gc-hover: oklch(0.92 0.016 220);\n  --thread-gc-border: oklch(0.85 0.014 220);\n  --thread-gc-border-strong: oklch(0.77 0.02 220);\n  --thread-gc-border-contrast: oklch(0.62 0.026 220);\n  --thread-gc-fg: oklch(0.22 0.012 235);\n  --thread-gc-fg-soft: oklch(0.38 0.018 235);\n  --thread-gc-fg-muted: oklch(0.5 0.02 235);\n  --thread-gc-primary: oklch(0.7 0.145 76);\n  --thread-gc-primary-hover: oklch(0.65 0.15 72);\n  --thread-gc-primary-fg: oklch(0.19 0.025 76);\n  --thread-gc-accent-soft: oklch(0.93 0.04 76);\n  --thread-gc-accent-strong: oklch(0.48 0.12 70);\n  --thread-gc-accent-border: oklch(0.67 0.11 76);\n  --thread-gc-shadow: none;\n  --theme-bg: var(--thread-gc-bg);\n  --theme-panel: var(--thread-gc-panel);\n  --theme-surface: var(--thread-gc-workspace);\n  --theme-surface-strong: var(--thread-gc-surface);\n  --theme-muted: var(--thread-gc-muted);\n  --theme-hover: var(--thread-gc-hover);\n  --theme-border: var(--thread-gc-border);\n  --theme-border-strong: var(--thread-gc-border-strong);\n  --theme-border-contrast: var(--thread-gc-border-contrast);\n  --theme-fg: var(--thread-gc-fg);\n  --theme-fg-soft: var(--thread-gc-fg-soft);\n  --theme-fg-muted: var(--thread-gc-fg-muted);\n  --theme-accent-solid: var(--thread-gc-primary);\n  --theme-accent-solid-hover: var(--thread-gc-primary-hover);\n  --theme-accent-solid-fg: var(--thread-gc-primary-fg);\n  --theme-accent-soft: var(--thread-gc-accent-soft);\n  --theme-accent-strong: var(--thread-gc-accent-strong);\n  --theme-accent-border: var(--thread-gc-accent-border);\n  --theme-shadow: var(--thread-gc-shadow);\n  background: var(--theme-bg);\n  color: var(--theme-fg);\n  isolation: isolate;\n  font-family:\n    -apple-system,\n    BlinkMacSystemFont,\n    "Segoe UI",\n    system-ui,\n    ui-sans-serif,\n    "Noto Sans CJK SC",\n    "Noto Sans SC",\n    "Microsoft YaHei",\n    "PingFang SC",\n    "Hiragino Sans GB",\n    sans-serif;\n}\n.thread-graph-dialog {\n  background: var(--theme-panel);\n  color: var(--theme-fg);\n}\n.thread-ui-shell.thread-ui-viewport-constrained {\n  height: 100svh;\n  max-height: 100svh;\n  min-height: 0;\n  overflow: hidden;\n  overscroll-behavior: none;\n}\n.thread-ui-shell.thread-ui-theme-dark,\n.thread-ui-shell[data-theme-effective=dark],\n:root[data-theme-effective=dark] .thread-ui-shell,\n.thread-ui-shell.dark,\n.thread-ui-shell[data-theme=dark],\n.thread-ui-shell[data-theme-mode=dark],\n.thread-ui-shell[data-theme-mode=system][data-system-theme=dark],\n.thread-graph-dialog[data-theme-effective=dark],\n.thread-graph-dialog[data-theme-mode=dark],\n.thread-graph-dialog[data-theme-mode=system][data-system-theme=dark] {\n  color-scheme: dark;\n  --background: oklch(0.145 0 0);\n  --foreground: oklch(0.985 0 0);\n  --card: oklch(0.205 0 0);\n  --card-foreground: oklch(0.985 0 0);\n  --popover: oklch(0.205 0 0);\n  --popover-foreground: oklch(0.985 0 0);\n  --primary: oklch(0.922 0 0);\n  --primary-foreground: oklch(0.205 0 0);\n  --secondary: oklch(0.269 0 0);\n  --secondary-foreground: oklch(0.985 0 0);\n  --muted: oklch(0.269 0 0);\n  --muted-foreground: oklch(0.708 0 0);\n  --accent: oklch(0.269 0 0);\n  --accent-foreground: oklch(0.985 0 0);\n  --destructive: oklch(0.704 0.191 22.216);\n  --border: oklch(1 0 0 / 10%);\n  --input: oklch(1 0 0 / 15%);\n  --ring: oklch(0.556 0 0);\n  --sidebar: oklch(0.205 0 0);\n  --sidebar-foreground: oklch(0.985 0 0);\n  --sidebar-accent: oklch(0.269 0 0);\n  --sidebar-accent-foreground: oklch(0.985 0 0);\n  --sidebar-border: oklch(1 0 0 / 10%);\n  --thread-gc-bg: oklch(0.155 0.008 95);\n  --thread-gc-panel: oklch(0.19 0.009 95);\n  --thread-gc-workspace: oklch(0.175 0.008 95);\n  --thread-gc-surface: oklch(0.22 0.01 95);\n  --thread-gc-muted: oklch(0.245 0.01 95);\n  --thread-gc-hover: oklch(0.255 0.013 90);\n  --thread-gc-border: oklch(0.285 0.012 95);\n  --thread-gc-border-strong: oklch(0.34 0.015 95);\n  --thread-gc-border-contrast: oklch(0.45 0.018 95);\n  --thread-gc-fg: oklch(0.94 0.008 90);\n  --thread-gc-fg-soft: oklch(0.79 0.012 90);\n  --thread-gc-fg-muted: oklch(0.64 0.014 90);\n  --thread-gc-primary: oklch(0.78 0.14 76);\n  --thread-gc-primary-hover: oklch(0.83 0.13 76);\n  --thread-gc-primary-fg: oklch(0.19 0.025 76);\n  --thread-gc-accent-soft: oklch(0.265 0.04 76);\n  --thread-gc-accent-strong: oklch(0.84 0.115 76);\n  --thread-gc-accent-border: oklch(0.48 0.085 76);\n  --thread-gc-shadow: none;\n}\n.thread-ui-shell *,\n.thread-ui-shell *::before,\n.thread-ui-shell *::after {\n  box-sizing: border-box;\n}\n.thread-ui-shell .thread-main-panel,\n.thread-ui-shell .thread-detail-surface,\n.thread-ui-shell .thread-sidebar-surface,\n.thread-ui-shell .thread-workspace-panel,\n.thread-ui-shell .thread-workspace-card {\n  border-color: var(--theme-border);\n  background: var(--theme-panel);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-sidebar-surface {\n  background: color-mix(in oklch, var(--theme-panel) 92%, var(--theme-surface));\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-rooms-surface,\n.thread-ui-shell .thread-topbar-surface {\n  border-color: var(--theme-border);\n  background: var(--theme-panel);\n  color: var(--theme-fg);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-rooms-surface,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-rooms-surface,\n:root[data-theme-effective=dark] .thread-ui-shell .thread-graph-rooms-surface,\n.thread-ui-shell.dark .thread-graph-rooms-surface,\n.thread-ui-shell.thread-ui-theme-dark .thread-topbar-surface,\n.thread-ui-shell[data-theme-effective=dark] .thread-topbar-surface,\n:root[data-theme-effective=dark] .thread-ui-shell .thread-topbar-surface,\n.thread-ui-shell.dark .thread-topbar-surface {\n  border-color: var(--theme-border);\n  background: var(--theme-panel);\n  color: var(--theme-fg);\n  box-shadow: none;\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-rooms-surface,\n:root[data-theme-effective=light] .thread-ui-shell .thread-graph-rooms-surface,\n.thread-ui-shell[data-theme-effective=light] .thread-topbar-surface,\n:root[data-theme-effective=light] .thread-ui-shell .thread-topbar-surface {\n  border-color: var(--theme-border);\n  background: var(--theme-panel);\n  color: var(--theme-fg);\n  box-shadow: none;\n}\n.thread-ui-shell[data-theme-effective=dark] .thread-mobile-scrim,\n:root[data-theme-effective=dark] .thread-ui-shell .thread-mobile-scrim,\n.thread-ui-shell.thread-ui-theme-dark .thread-mobile-scrim,\n.thread-ui-shell.dark .thread-mobile-scrim {\n  background: rgb(0 0 0 / 0.55);\n}\n.thread-ui-shell .thread-shell-frame {\n  display: block;\n  height: 100%;\n  min-height: 0;\n  width: 100%;\n}\n.thread-ui-shell .thread-rooms-rail {\n  transform: none;\n  translate: -100% 0;\n  overflow-x: hidden;\n}\n.thread-ui-shell .thread-rooms-rail.translate-x-0 {\n  transform: none;\n  translate: 0 0;\n}\n.thread-ui-shell .thread-shell-main {\n  height: 100%;\n  width: 100%;\n  min-width: 0;\n  min-height: 0;\n  overflow: hidden;\n}\n.thread-ui-shell .thread-shell-card {\n  border-color: transparent;\n}\n.thread-ui-shell .thread-desktop-only-flex,\n.thread-ui-shell .thread-desktop-only-inline-flex,\n.thread-ui-shell .thread-mobile-chat-hidden,\n.thread-ui-shell .thread-mobile-workspace-hidden {\n  display: none;\n}\n.thread-ui-shell .thread-mobile-only-block {\n  display: block;\n}\n.thread-ui-shell .thread-mobile-only-grid {\n  display: grid;\n}\n.thread-ui-shell .thread-mobile-only-inline-flex {\n  display: inline-flex;\n}\n.thread-ui-shell .thread-main-panel,\n.thread-ui-shell .thread-shell-card {\n  height: 100%;\n  min-height: 0;\n}\n.thread-ui-shell .thread-topbar-surface {\n  min-height: 3.5rem;\n}\n.thread-ui-shell .thread-icon-button,\n.thread-ui-shell .thread-secondary-action {\n  border-color: var(--theme-border);\n  background: transparent;\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-icon-button:hover,\n.thread-ui-shell .thread-secondary-action:hover {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-topbar-meta-row {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell button.thread-topbar-meta-row:hover {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-topbar-meta-row[aria-expanded=true] {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-topbar-details-trigger {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-topbar-details-trigger:hover,\n.thread-ui-shell .thread-topbar-details-trigger[aria-expanded=true] {\n  border-color: var(--theme-border-strong);\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-topbar-details-popover {\n  border-color: var(--theme-border);\n  background: var(--theme-panel);\n  color: var(--theme-fg);\n  box-shadow: var(--theme-shadow);\n}\n.thread-ui-shell .thread-topbar-meta-row .font-mono {\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell button.thread-topbar-meta-row:hover .font-mono {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-topbar-actions {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n}\n.thread-ui-shell .thread-graph-topbar-actions > * {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.thread-ui-shell .thread-graph-topbar-actions button,\n.thread-ui-shell .thread-graph-topbar-actions a {\n  min-width: 2rem;\n  height: 2rem;\n  border-radius: 0.375rem;\n  border-color: transparent;\n  background: transparent;\n  color: var(--theme-fg-soft);\n  box-shadow: none;\n}\n.thread-ui-shell .thread-graph-topbar-actions button:hover,\n.thread-ui-shell .thread-graph-topbar-actions a:hover {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-topbar-actions button:disabled,\n.thread-ui-shell .thread-graph-topbar-actions a[aria-disabled=true] {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n.thread-ui-shell .thread-graph-dialog,\n.thread-graph-dialog {\n  border-color: var(--theme-border);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-settings-dialog,\n.thread-graph-settings-dialog,\n.thread-graph-create-thread-dialog {\n  border-color: var(--theme-border);\n  background: var(--theme-panel);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-settings-dialog [data-slot=dialog-description],\n.thread-graph-settings-dialog [data-slot=dialog-description],\n.thread-graph-create-thread-dialog [data-slot=dialog-description] {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-settings-dialog [data-slot=dialog-close],\n.thread-graph-settings-dialog [data-slot=dialog-close],\n.thread-graph-create-thread-dialog [data-slot=dialog-close] {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-settings-dialog [data-slot=dialog-close]:hover,\n.thread-graph-settings-dialog [data-slot=dialog-close]:hover,\n.thread-graph-create-thread-dialog [data-slot=dialog-close]:hover {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-settings-card,\n.thread-ui-shell .thread-graph-theme-mode-group,\n.thread-ui-shell .thread-graph-settings-tabs,\n.thread-graph-settings-dialog .thread-graph-settings-card,\n.thread-graph-settings-dialog .thread-graph-theme-mode-group,\n.thread-graph-settings-dialog .thread-graph-settings-tabs {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n}\n.thread-ui-shell .thread-graph-theme-mode-button,\n.thread-ui-shell .thread-graph-settings-tab-button,\n.thread-graph-settings-dialog .thread-graph-theme-mode-button,\n.thread-graph-settings-dialog .thread-graph-settings-tab-button {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-theme-mode-button:hover:not(:disabled),\n.thread-ui-shell .thread-graph-settings-tab-button:hover:not(:disabled),\n.thread-graph-settings-dialog .thread-graph-theme-mode-button:hover:not(:disabled),\n.thread-graph-settings-dialog .thread-graph-settings-tab-button:hover:not(:disabled) {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-theme-mode-button.is-selected,\n.thread-ui-shell .thread-graph-settings-tab-button.is-active,\n.thread-graph-settings-dialog .thread-graph-theme-mode-button.is-selected,\n.thread-graph-settings-dialog .thread-graph-settings-tab-button.is-active {\n  background: var(--theme-accent-solid);\n  color: var(--theme-accent-solid-fg);\n  box-shadow: 0 1px 2px rgb(15 23 42 / 0.08);\n}\n.thread-ui-shell .thread-graph-theme-mode-button:disabled,\n.thread-ui-shell .thread-graph-settings-tab-button:disabled,\n.thread-graph-settings-dialog .thread-graph-theme-mode-button:disabled,\n.thread-graph-settings-dialog .thread-graph-settings-tab-button:disabled {\n  cursor: not-allowed;\n  opacity: 0.55;\n}\n.thread-graph-settings-dialog .thread-graph-settings-body {\n  max-height: min(62vh, 42rem);\n  color: var(--theme-fg);\n}\n.thread-graph-settings-dialog .thread-graph-settings-global-content {\n  color: var(--theme-fg);\n}\n.thread-graph-settings-dialog .thread-graph-settings-body dt,\n.thread-graph-settings-dialog .thread-graph-settings-body .text-stone-500,\n.thread-graph-settings-dialog .thread-graph-settings-body .text-slate-500,\n.thread-graph-settings-dialog .thread-graph-settings-body .text-stone-400,\n.thread-graph-settings-dialog .thread-graph-settings-body .text-slate-400 {\n  color: var(--theme-fg-muted) !important;\n}\n.thread-graph-settings-dialog .thread-graph-settings-body dd,\n.thread-graph-settings-dialog .thread-graph-settings-body .text-stone-100,\n.thread-graph-settings-dialog .thread-graph-settings-body .text-stone-200,\n.thread-graph-settings-dialog .thread-graph-settings-body .text-stone-300,\n.thread-graph-settings-dialog .thread-graph-settings-body .text-slate-100,\n.thread-graph-settings-dialog .thread-graph-settings-body .text-slate-200,\n.thread-graph-settings-dialog .thread-graph-settings-body .text-slate-300 {\n  color: var(--theme-fg) !important;\n}\n.thread-graph-settings-dialog .thread-graph-settings-body .bg-stone-950,\n.thread-graph-settings-dialog .thread-graph-settings-body .bg-stone-900,\n.thread-graph-settings-dialog .thread-graph-settings-body .bg-slate-950,\n.thread-graph-settings-dialog .thread-graph-settings-body .bg-slate-900 {\n  background: var(--theme-surface-strong) !important;\n}\n.thread-graph-settings-dialog .thread-graph-settings-body .border-stone-800,\n.thread-graph-settings-dialog .thread-graph-settings-body .border-stone-700,\n.thread-graph-settings-dialog .thread-graph-settings-body .border-slate-800,\n.thread-graph-settings-dialog .thread-graph-settings-body .border-slate-700 {\n  border-color: var(--theme-border) !important;\n}\n.thread-graph-create-thread-input {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n  color: var(--theme-fg);\n}\n.thread-graph-create-thread-input::placeholder {\n  color: var(--theme-fg-muted);\n}\n.thread-graph-create-thread-input:focus {\n  border-color: var(--theme-border-contrast);\n  box-shadow: 0 0 0 2px color-mix(in srgb, var(--theme-border-contrast) 18%, transparent);\n}\n.thread-graph-create-thread-submit {\n  background: var(--theme-accent-solid);\n  color: var(--theme-accent-solid-fg);\n}\n.thread-graph-create-thread-submit:hover:not(:disabled) {\n  background: var(--theme-accent-solid-hover);\n}\n.thread-ui-shell .ui-action-danger {\n  border: 1px solid color-mix(in oklch, rgb(244 63 94) 48%, var(--theme-border));\n  background: color-mix(in oklch, rgb(244 63 94) 18%, var(--theme-panel));\n  color: color-mix(in oklch, rgb(254 226 226) 86%, var(--theme-fg));\n}\n.thread-ui-shell .ui-action-danger:hover {\n  background: color-mix(in oklch, rgb(244 63 94) 26%, var(--theme-panel));\n  color: rgb(254 226 226);\n}\n.thread-ui-shell .thread-mobile-segment {\n  background: var(--theme-surface-strong);\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-mobile-segment:hover {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-mobile-segment.is-active {\n  background: var(--theme-accent-solid);\n  color: var(--theme-accent-solid-fg);\n}\n.thread-ui-shell .thread-sidebar-card {\n  border-color: transparent;\n  background: var(--theme-surface-strong);\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-graph-room-card {\n  border-color: transparent;\n  background: transparent;\n  color: var(--theme-fg-soft);\n  box-shadow: none;\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-room-card {\n  border-color: transparent;\n  background: transparent;\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-sidebar-card:hover {\n  border-color: var(--theme-border);\n  background: var(--theme-panel);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-room-card:hover {\n  border-color: transparent;\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-room-card:hover {\n  border-color: transparent;\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-sidebar-card-active {\n  border-color: var(--theme-accent-solid);\n  background: var(--theme-accent-solid);\n  color: var(--theme-accent-solid-fg);\n  box-shadow: 0 12px 30px oklch(0.22 0.024 255 / 0.18);\n}\n.thread-ui-shell .thread-graph-room-card.is-active {\n  border-color: var(--theme-border);\n  background: var(--theme-muted);\n  color: var(--theme-fg);\n  box-shadow: none;\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-room-card.is-active {\n  border-color: var(--theme-border);\n  background: var(--theme-muted);\n  color: var(--theme-fg);\n  box-shadow: none;\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-room-card.is-active,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-room-card.is-active,\n.thread-ui-shell.dark .thread-graph-room-card.is-active {\n  border-color: var(--theme-border);\n  background: var(--theme-muted);\n  color: var(--theme-fg);\n  box-shadow: none;\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-room-card,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-room-card,\n.thread-ui-shell.dark .thread-graph-room-card {\n  border-color: transparent;\n  background: transparent;\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-room-card:hover,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-room-card:hover,\n.thread-ui-shell.dark .thread-graph-room-card:hover {\n  border-color: transparent;\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-sidebar-card-icon {\n  background: var(--theme-panel);\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-room-card-icon {\n  border: 1px solid var(--theme-border);\n  background: transparent;\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-room-card-icon {\n  background: transparent;\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-sidebar-card-icon.is-active {\n  background: color-mix(in oklch, var(--theme-accent-solid-fg) 16%, transparent);\n  color: var(--theme-accent-solid-fg);\n}\n.thread-ui-shell .thread-graph-room-card-icon.is-active {\n  background: var(--theme-surface-strong);\n  color: var(--theme-fg);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-room-card-icon.is-active {\n  background: var(--theme-surface-strong);\n  color: var(--theme-fg);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-room-card-icon.is-active,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-room-card-icon.is-active,\n.thread-ui-shell.dark .thread-graph-room-card-icon.is-active {\n  background: var(--theme-surface-strong);\n  color: var(--theme-fg);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-room-card-icon,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-room-card-icon,\n.thread-ui-shell.dark .thread-graph-room-card-icon {\n  background: transparent;\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-sidebar-card-active .thread-sidebar-card-title,\n.thread-ui-shell .thread-sidebar-card-active p,\n.thread-ui-shell .thread-sidebar-card-active span,\n.thread-ui-shell .thread-sidebar-card-active button,\n.thread-ui-shell .thread-graph-room-card.is-active .thread-graph-room-card-title,\n.thread-ui-shell .thread-graph-room-card.is-active p,\n.thread-ui-shell .thread-graph-room-card.is-active button {\n  color: inherit;\n}\n.thread-ui-shell .thread-card-quiet-button {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-card-quiet-button:hover {\n  background: color-mix(in oklch, var(--theme-hover) 80%, transparent);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-card-session-copy-button {\n  opacity: 0;\n}\n.thread-ui-shell .thread-composer-pending-queue {\n  border-color: var(--theme-border);\n  background: color-mix(in srgb, var(--theme-panel) 94%, transparent);\n  box-shadow: 0 8px 24px color-mix(in srgb, var(--app-bg) 18%, transparent);\n}\n.thread-ui-shell .thread-composer-pending-row {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n}\n.thread-ui-shell .thread-composer-steer-button {\n  border-color: color-mix(in srgb, var(--theme-accent) 35%, var(--theme-border));\n  background: color-mix(in srgb, var(--theme-accent) 10%, var(--theme-surface));\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-composer-steer-button:hover:not(:disabled) {\n  background: color-mix(in srgb, var(--theme-accent) 18%, var(--theme-surface));\n}\n.thread-ui-shell .thread-composer-queue-remove {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-composer-queue-remove:hover:not(:disabled) {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n@media (max-width: 639px) {\n  .thread-ui-shell .thread-composer-pending-queue {\n    margin-bottom: 0.375rem;\n    border-radius: 0.75rem;\n  }\n  .thread-ui-shell .thread-composer-pending-row {\n    min-height: 2.75rem;\n  }\n}\n.thread-ui-shell .thread-graph-room-card:hover .thread-card-session-copy-button,\n.thread-ui-shell .thread-card-session-copy-button:focus-visible,\n.thread-ui-shell .thread-card-session-copy-button:active {\n  opacity: 1;\n}\n.thread-ui-shell .thread-card-danger-button {\n  color: oklch(0.62 0.16 25);\n}\n.thread-ui-shell .thread-card-danger-button:hover {\n  background: rgb(254 226 226);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-card-danger-button:hover,\n.thread-ui-shell[data-theme-effective=dark] .thread-card-danger-button:hover,\n.thread-ui-shell.dark .thread-card-danger-button:hover {\n  background: rgb(127 29 29 / 0.32);\n}\n.thread-ui-shell .thread-new-thread-button,\n.thread-ui-shell .thread-graph-new-room-button {\n  min-width: 0;\n}\n.thread-ui-shell .thread-graph-new-room-strip {\n  border-color: var(--theme-border);\n}\n.thread-ui-shell .thread-graph-new-room-button {\n  background: var(--theme-accent-solid);\n  color: var(--theme-accent-solid-fg);\n  transition: background-color 160ms ease, transform 160ms ease;\n}\n.thread-ui-shell .thread-graph-new-room-button:hover {\n  background: var(--theme-accent-solid-hover);\n  transform: translateY(-1px);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-new-room-button,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-new-room-button,\n.thread-ui-shell.dark .thread-graph-new-room-button {\n  border: 1px solid #343b48;\n  background: #222733;\n  color: rgb(241 245 249);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-new-room-button:hover,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-new-room-button:hover,\n.thread-ui-shell.dark .thread-graph-new-room-button:hover {\n  border-color: #465164;\n  background: #2b313d;\n}\n.thread-graph-settings-dialog {\n  display: block;\n  max-height: calc(100dvh - 2rem);\n  overflow-y: auto;\n  overscroll-behavior: contain;\n  -webkit-overflow-scrolling: touch;\n  touch-action: pan-y;\n}\n.thread-graph-settings-dialog > * + * {\n  margin-top: 1rem;\n}\n.thread-graph-settings-dialog .thread-graph-settings-body {\n  max-height: none;\n  overflow: visible;\n}\n.thread-graph-settings-dialog .thread-graph-settings-global-content {\n  overflow: visible;\n}\n.thread-ui-shell .thread-topbar-details-popover {\n  overflow-wrap: anywhere;\n}\n@media (max-width: 639px) {\n  .thread-ui-shell .thread-topbar-details-popover {\n    position: fixed;\n    left: 0.75rem;\n    right: 0.75rem;\n    top: calc(3rem + env(safe-area-inset-top) + 0.5rem);\n    width: auto;\n    max-height: calc(100dvh - 5rem);\n    overflow-y: auto;\n  }\n}\n.thread-history-earlier {\n  margin-inline: auto;\n  border: 0;\n  background: none;\n  color: var(--theme-fg-muted);\n}\n.thread-history-earlier:hover {\n  color: var(--theme-fg);\n}\n.thread-history-earlier:active .thread-history-arrow {\n  transform: translateY(-3px);\n}\n.thread-history-arrow {\n  display: inline-block;\n  transition: transform 220ms cubic-bezier(.2, 1.6, .4, 1);\n}\n.thread-history-earlier[aria-busy=true] .thread-history-arrow {\n  animation: history-lift 900ms ease-in-out infinite;\n}\n@keyframes history-lift {\n  50% {\n    transform: translateY(-4px);\n    opacity: .45;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .thread-history-arrow {\n    animation: none !important;\n    transition: none;\n  }\n}\n');

// src/styles/timeline-shell.css
styleInject(".thread-ui-shell .thread-detail-surface {\n  border-color: transparent;\n  background: var(--theme-surface);\n  box-shadow: none;\n}\n.thread-ui-shell .thread-graph-chat-panel {\n  background: var(--theme-surface);\n  color: var(--theme-fg);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-chat-panel,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-chat-panel,\n.thread-ui-shell.dark .thread-graph-chat-panel {\n  background: var(--theme-surface);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-scroll-container {\n  background: var(--theme-surface);\n  color: var(--theme-fg);\n  scrollbar-color: rgb(203 213 225) transparent;\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-scroll-container,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-scroll-container,\n.thread-ui-shell.dark .thread-graph-scroll-container {\n  background: var(--theme-surface);\n  color: var(--theme-fg);\n  scrollbar-color: #374151 transparent;\n}\n.thread-ui-shell .thread-graph-scroll-content {\n  min-height: 100%;\n  padding: 1rem 0 max(0rem, var(--thread-graph-chat-scroll-bottom-spacer, 0px));\n}\n.thread-ui-shell .thread-graph-message-list {\n  display: flex;\n  flex-direction: column;\n  gap: 0;\n}\n.thread-ui-shell .thread-graph-message-section {\n  border-top: 0;\n}\n.thread-ui-shell .thread-graph-history-control,\n.thread-ui-shell .thread-graph-empty-state {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-history-button,\n.thread-ui-shell .thread-graph-turn-index {\n  border-color: var(--theme-border);\n  background: var(--theme-panel);\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-history-button:hover {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-turn {\n  border-radius: 0;\n  padding: 0.65rem 1.5rem;\n}\n.thread-ui-shell .thread-graph-turn-header {\n  display: none;\n}\n.thread-ui-shell .thread-graph-turn-time {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-worked-summary {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-worked-summary:hover {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-worked-interrupted {\n  color: color-mix(in srgb, var(--theme-fg-muted) 82%, #f59e0b 18%);\n}\n.thread-ui-shell .thread-graph-worked-rule {\n  background: var(--theme-border);\n}\n.thread-ui-shell .thread-graph-turn-body {\n  margin-top: 0;\n}\n.thread-ui-shell .thread-graph-worked-summary {\n  min-height: 1.65rem;\n  padding: 0.1rem 0;\n  font-size: 0.875rem;\n  flex-wrap: wrap;\n}\n.thread-ui-shell .thread-turn-usage {\n  display: inline-flex;\n  min-width: 0;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.35rem 0.7rem;\n  color: var(--theme-fg-muted);\n  font-size: 0.6875rem;\n  font-weight: 400;\n  line-height: 1.6;\n  font-variant-numeric: tabular-nums;\n}\n.thread-ui-shell .thread-turn-usage-model {\n  min-width: 0;\n  overflow-wrap: anywhere;\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-turn-usage-tokens {\n  display: inline-flex;\n  flex-wrap: wrap;\n  gap: 0.25rem 0.6rem;\n}\n.thread-ui-shell .thread-turn-usage-tokens > span {\n  white-space: nowrap;\n}\n.thread-ui-shell .thread-turn-usage-value {\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-turn-usage-price {\n  white-space: nowrap;\n  border: 1px solid var(--theme-border);\n  border-radius: 0.4rem;\n  padding: 0 0.35rem;\n  color: var(--theme-fg-soft);\n  background: var(--theme-panel);\n}\n.thread-ui-shell .thread-turn-usage-unavailable {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-turn-body > :not([hidden]) ~ :not([hidden]),\n.thread-ui-shell .thread-graph-turn-collapsed-summary > :not([hidden]) ~ :not([hidden]) {\n  margin-top: 0.25rem;\n}\n@media (max-width: 639px) {\n  .thread-ui-shell .thread-graph-scroll-content {\n    padding-top: 0.5rem;\n  }\n  .thread-ui-shell .thread-graph-turn {\n    padding: 0.65rem 0.9rem;\n  }\n}\n.thread-ui-shell :where(.text-stone-100, .text-stone-200, .text-stone-300) {\n  color: var(--theme-fg) !important;\n}\n.thread-ui-shell :where(.text-stone-400, .text-stone-500, .text-stone-600) {\n  color: var(--theme-fg-muted) !important;\n}\n.thread-ui-shell :where(.border-stone-600, .border-stone-700, .border-stone-700\\/90, .border-stone-800, .border-stone-800\\/80) {\n  border-color: var(--theme-border) !important;\n}\n.thread-ui-shell :where(.bg-stone-800, .bg-stone-800\\/60, .bg-stone-800\\/80, .bg-stone-900, .bg-stone-900\\/60, .bg-stone-900\\/70, .bg-stone-900\\/72, .bg-stone-900\\/80, .bg-stone-950, .bg-stone-950\\/70, .bg-stone-950\\/90) {\n  background: var(--theme-surface-strong) !important;\n}\n.thread-ui-shell[data-theme-effective=light] :where(.text-sky-100, .text-sky-50),\n:root[data-theme-effective=light] .thread-ui-shell :where(.text-sky-100, .text-sky-50) {\n  color: rgb(3 105 161);\n}\n.thread-ui-shell[data-theme-effective=light] :where(.text-emerald-100, .text-emerald-50),\n:root[data-theme-effective=light] .thread-ui-shell :where(.text-emerald-100, .text-emerald-50) {\n  color: rgb(21 128 61);\n}\n.thread-ui-shell[data-theme-effective=light] :where(.text-rose-100, .text-rose-50),\n:root[data-theme-effective=light] .thread-ui-shell :where(.text-rose-100, .text-rose-50) {\n  color: rgb(190 24 93);\n}\n.thread-ui-shell[data-theme-effective=light] :where(.text-amber-100, .text-amber-50, .text-amber-200),\n:root[data-theme-effective=light] .thread-ui-shell :where(.text-amber-100, .text-amber-50, .text-amber-200) {\n  color: rgb(120 53 15);\n}\n.thread-ui-shell[data-theme-effective=light] .text-fuchsia-100,\n:root[data-theme-effective=light] .thread-ui-shell .text-fuchsia-100 {\n  color: rgb(162 28 175);\n}\n.thread-ui-shell[data-theme-effective=light] .text-violet-100,\n:root[data-theme-effective=light] .thread-ui-shell .text-violet-100 {\n  color: rgb(109 40 217);\n}\n.thread-ui-shell[data-theme-effective=light] .text-lime-100,\n:root[data-theme-effective=light] .thread-ui-shell .text-lime-100 {\n  color: rgb(77 124 15);\n}\n.thread-ui-shell[data-theme-effective=light] :where(.bg-sky-300\\/10, .bg-sky-300\\/15, .bg-emerald-300\\/10, .bg-emerald-300\\/15, .bg-amber-300\\/10, .bg-amber-300\\/15, .bg-rose-300\\/10, .bg-rose-300\\/15, .bg-fuchsia-300\\/10, .bg-fuchsia-300\\/15, .bg-violet-300\\/10, .bg-violet-300\\/15, .bg-lime-300\\/10, .bg-lime-300\\/15),\n:root[data-theme-effective=light] .thread-ui-shell :where(.bg-sky-300\\/10, .bg-sky-300\\/15, .bg-emerald-300\\/10, .bg-emerald-300\\/15, .bg-amber-300\\/10, .bg-amber-300\\/15, .bg-rose-300\\/10, .bg-rose-300\\/15, .bg-fuchsia-300\\/10, .bg-fuchsia-300\\/15, .bg-violet-300\\/10, .bg-violet-300\\/15, .bg-lime-300\\/10, .bg-lime-300\\/15) {\n  filter: saturate(0.72) brightness(0.97);\n}\n.thread-ui-shell .thread-token-popover {\n  border-color: var(--theme-border);\n  background: var(--theme-panel);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-token-popover-row {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n}\n.thread-ui-shell .thread-token-popover-text {\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-token-popover-strong {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .token-badge-in {\n  border-color: rgb(22 101 52 / 0.32);\n  background: rgb(220 252 231 / 0.72);\n  color: rgb(20 83 45);\n}\n.thread-ui-shell .token-badge-cache {\n  border-color: rgb(3 105 161 / 0.32);\n  background: rgb(224 242 254 / 0.76);\n  color: rgb(7 89 133);\n}\n.thread-ui-shell .token-badge-out {\n  border-color: rgb(109 40 217 / 0.28);\n  background: rgb(237 233 254 / 0.76);\n  color: rgb(91 33 182);\n}\n.thread-ui-shell .token-badge-reason {\n  border-color: rgb(146 64 14 / 0.28);\n  background: rgb(254 243 199 / 0.72);\n  color: rgb(120 53 15);\n}\n.thread-ui-shell .token-badge-total {\n  border-color: rgb(77 124 15 / 0.3);\n  background: rgb(236 252 203 / 0.72);\n  color: rgb(63 98 18);\n}\n.thread-ui-shell .token-badge-empty {\n  border-color: var(--theme-border-strong);\n  background: var(--theme-surface);\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-token-badge-value {\n  color: currentColor;\n}\n.thread-ui-shell[data-theme-effective=dark] .thread-token-popover,\n:root[data-theme-effective=dark] .thread-ui-shell .thread-token-popover,\n.thread-ui-shell.thread-ui-theme-dark .thread-token-popover,\n.thread-ui-shell.dark .thread-token-popover {\n  border-color: #303642;\n  background: #171a22;\n}\n.thread-ui-shell[data-theme-effective=dark] .thread-token-popover-row,\n:root[data-theme-effective=dark] .thread-ui-shell .thread-token-popover-row,\n.thread-ui-shell.thread-ui-theme-dark .thread-token-popover-row,\n.thread-ui-shell.dark .thread-token-popover-row {\n  border-color: #303642;\n  background: #1d222c;\n}\n.thread-ui-shell[data-theme-effective=dark] .token-badge-in,\n.thread-ui-shell[data-theme-effective=dark] .token-badge-cache,\n.thread-ui-shell[data-theme-effective=dark] .token-badge-out,\n.thread-ui-shell[data-theme-effective=dark] .token-badge-reason,\n.thread-ui-shell[data-theme-effective=dark] .token-badge-total,\n:root[data-theme-effective=dark] .thread-ui-shell .token-badge-in,\n:root[data-theme-effective=dark] .thread-ui-shell .token-badge-cache,\n:root[data-theme-effective=dark] .thread-ui-shell .token-badge-out,\n:root[data-theme-effective=dark] .thread-ui-shell .token-badge-reason,\n:root[data-theme-effective=dark] .thread-ui-shell .token-badge-total,\n.thread-ui-shell.thread-ui-theme-dark .token-badge-in,\n.thread-ui-shell.thread-ui-theme-dark .token-badge-cache,\n.thread-ui-shell.thread-ui-theme-dark .token-badge-out,\n.thread-ui-shell.thread-ui-theme-dark .token-badge-reason,\n.thread-ui-shell.thread-ui-theme-dark .token-badge-total,\n.thread-ui-shell.dark .token-badge-in,\n.thread-ui-shell.dark .token-badge-cache,\n.thread-ui-shell.dark .token-badge-out,\n.thread-ui-shell.dark .token-badge-reason,\n.thread-ui-shell.dark .token-badge-total {\n  background-color: color-mix(in oklch, currentColor 12%, transparent);\n}\n.thread-ui-shell[data-theme-effective=dark] .token-badge-in,\n:root[data-theme-effective=dark] .thread-ui-shell .token-badge-in,\n.thread-ui-shell.thread-ui-theme-dark .token-badge-in,\n.thread-ui-shell.dark .token-badge-in {\n  color: rgb(134 239 172);\n}\n.thread-ui-shell[data-theme-effective=dark] .token-badge-cache,\n:root[data-theme-effective=dark] .thread-ui-shell .token-badge-cache,\n.thread-ui-shell.thread-ui-theme-dark .token-badge-cache,\n.thread-ui-shell.dark .token-badge-cache {\n  color: rgb(125 211 252);\n}\n.thread-ui-shell[data-theme-effective=dark] .token-badge-out,\n:root[data-theme-effective=dark] .thread-ui-shell .token-badge-out,\n.thread-ui-shell.thread-ui-theme-dark .token-badge-out,\n.thread-ui-shell.dark .token-badge-out {\n  color: rgb(196 181 253);\n}\n.thread-ui-shell[data-theme-effective=dark] .token-badge-reason,\n:root[data-theme-effective=dark] .thread-ui-shell .token-badge-reason,\n.thread-ui-shell.thread-ui-theme-dark .token-badge-reason,\n.thread-ui-shell.dark .token-badge-reason {\n  color: rgb(252 211 77);\n}\n.thread-ui-shell[data-theme-effective=dark] .token-badge-total,\n:root[data-theme-effective=dark] .thread-ui-shell .token-badge-total,\n.thread-ui-shell.thread-ui-theme-dark .token-badge-total,\n.thread-ui-shell.dark .token-badge-total {\n  color: rgb(190 242 100);\n}\n.thread-ui-shell .thread-graph-event,\n.thread-ui-shell .thread-graph-event-card,\n.thread-ui-shell .thread-graph-history-group,\n.thread-ui-shell .thread-graph-history-group-card {\n  border-color: var(--theme-border);\n  background: var(--theme-panel);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-event-card,\n.thread-ui-shell .thread-graph-history-group-card {\n  background: var(--theme-surface);\n}\n.thread-ui-shell .thread-graph-event-line,\n.thread-ui-shell .thread-graph-history-group-toggle {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-history-group-list {\n  border-color: var(--theme-border);\n}\n.thread-ui-shell .thread-turn-usage-price {\n  color: var(--theme-accent, #7aaca3);\n  cursor: pointer;\n}\n@media (max-width: 640px) {\n  .thread-ui-shell .thread-turn-usage {\n    flex-wrap: nowrap;\n    gap: 0.4rem;\n  }\n  .thread-ui-shell .thread-turn-usage-model {\n    overflow: hidden;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n    overflow-wrap: normal;\n  }\n  .thread-ui-shell .thread-turn-usage-effort,\n  .thread-ui-shell .thread-turn-usage-tokens > span:not(:first-child) {\n    display: none;\n  }\n  .thread-ui-shell .thread-turn-usage-tokens,\n  .thread-ui-shell .thread-turn-usage-price {\n    flex-shrink: 0;\n  }\n  .thread-ui-shell .thread-graph-worked-summary {\n    flex-wrap: nowrap;\n    gap: 0.35rem;\n  }\n}\n.thread-ui-shell .thread-graph-worked-summary + .thread-graph-message {\n  margin-top: 2px;\n}\n.thread-ui-shell .shell-direct-input.shell-is-mobile {\n  padding-bottom: 48px;\n}\n.thread-ui-shell .shell-touch-controls {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: 30;\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  gap: 2px;\n  min-height: 48px;\n  padding: 4px 6px;\n  border-top: 1px solid var(--theme-border);\n  background: var(--theme-bg);\n  color: var(--theme-fg);\n  touch-action: manipulation;\n}\n.thread-ui-shell .shell-touch-controls > button {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 28px;\n  height: 38px;\n  border-radius: 6px;\n  font-size: 12px;\n}\n.thread-ui-shell .shell-touch-controls button:disabled {\n  opacity: .35;\n}\n.thread-ui-shell .shell-touch-controls button[aria-pressed=true] {\n  background: var(--theme-border);\n  color: var(--theme-accent, #e6ba63);\n}\n.thread-ui-shell .shell-session-popover {\n  position: absolute;\n  right: 8px;\n  bottom: calc(100% + 6px);\n  width: min(280px, 85vw);\n  max-height: 40vh;\n  overflow-y: auto;\n  padding: 6px;\n  border-radius: 12px;\n  border: 1px solid var(--theme-border);\n  background: var(--theme-bg);\n  box-shadow: 0 8px 30px #0005;\n}\n.thread-ui-shell .shell-session-popover button {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  width: 100%;\n  padding: 10px;\n  text-align: left;\n  border-radius: 6px;\n}\n.thread-ui-shell .mobile-shell-direct .xterm-helper-textarea {\n  font-size: 16px !important;\n}\n.thread-ui-shell .shell-session-row {\n  display: flex;\n  align-items: center;\n  min-width: 0;\n}\n.thread-ui-shell .shell-session-row > button {\n  width: 36px;\n  flex: 0 0 36px;\n}\n.thread-ui-shell .shell-session-row > .shell-session-select {\n  width: auto;\n  flex: 1;\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.thread-ui-shell .shell-session-row form {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 4px;\n  padding: 4px;\n  width: 100%;\n}\n.thread-ui-shell .shell-session-row input {\n  width: 100%;\n  padding: 8px;\n  background: var(--theme-bg);\n  border: 1px solid var(--theme-border);\n  border-radius: 6px;\n  font-size: 16px;\n}\n.thread-ui-shell .shell-session-row form button {\n  width: auto;\n}\n.thread-ui-shell .mobile-shell-direct .xterm-viewport {\n  z-index: 3;\n  background: transparent !important;\n  overflow-y: auto !important;\n  touch-action: pan-y;\n  overscroll-behavior-y: contain;\n  -webkit-overflow-scrolling: touch;\n}\n.thread-ui-shell .shell-chat-return {\n  position: absolute;\n  right: 20px;\n  bottom: 20px;\n  z-index: 30;\n  display: grid;\n  place-items: center;\n  width: 42px;\n  height: 42px;\n  border-radius: 50%;\n  border: 1px solid var(--theme-border);\n  color: var(--theme-fg);\n  background: var(--theme-panel);\n  box-shadow: 0 3px 12px #0002;\n}\n.thread-ui-shell .shell-chat-return:hover {\n  background: var(--theme-hover);\n}\n");

// src/styles/layout-workspace.css
styleInject('.thread-ui-shell .thread-workspace-panel {\n  background: var(--theme-panel);\n}\n.thread-ui-shell .thread-workspace-card {\n  background: var(--theme-surface);\n}\n.thread-ui-shell .thread-workspace-collapse-tab,\n.thread-ui-shell .thread-workspace-small-toggle,\n.thread-ui-shell .thread-workspace-expand-fab,\n.thread-ui-shell .thread-graph-panel-expand-fab {\n  align-items: center;\n  justify-content: center;\n  width: 2rem;\n  height: 2rem;\n  border: 1px solid var(--theme-border);\n  border-radius: 999px;\n  background: color-mix(in oklch, var(--theme-panel) 92%, transparent);\n  color: var(--theme-fg-soft);\n  box-shadow: 0 10px 26px color-mix(in oklch, var(--theme-bg) 62%, transparent);\n  transition:\n    background-color 160ms ease,\n    border-color 160ms ease,\n    color 160ms ease,\n    transform 160ms ease,\n    box-shadow 160ms ease;\n}\n.thread-ui-shell .thread-workspace-collapse-tab:hover,\n.thread-ui-shell .thread-workspace-small-toggle:hover,\n.thread-ui-shell .thread-workspace-expand-fab:hover,\n.thread-ui-shell .thread-graph-panel-expand-fab:hover {\n  border-color: var(--theme-border-strong);\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n  box-shadow: 0 14px 30px color-mix(in oklch, var(--theme-bg) 72%, transparent);\n}\n.thread-ui-shell .thread-workspace-collapse-tab {\n  position: absolute;\n  left: -1rem;\n  top: 50%;\n  z-index: 30;\n  transform: translateY(-50%);\n}\n.thread-ui-shell .thread-workspace-collapse-tab:hover {\n  transform: translateY(-50%) translateX(-1px);\n}\n.thread-ui-shell .thread-workspace-expand-fab {\n  position: absolute;\n  right: 0.75rem;\n  top: 50%;\n  z-index: 30;\n  transform: translateY(-50%);\n}\n.thread-ui-shell .thread-workspace-expand-fab:hover {\n  transform: translateY(-50%) translateX(-1px);\n}\n.thread-ui-shell .thread-chat-usage-footer {\n  background: var(--theme-surface);\n  color: rgb(148 163 184);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-chat-usage-footer,\n.thread-ui-shell[data-theme-effective=dark] .thread-chat-usage-footer,\n.thread-ui-shell.dark .thread-chat-usage-footer {\n  background: var(--theme-surface);\n  color: rgb(100 116 139);\n}\n.thread-ui-shell .thread-graph-composer-host {\n  border-top: 1px solid rgb(226 232 240);\n  background: var(--theme-surface);\n  padding: 0.5rem 0.75rem calc(env(safe-area-inset-bottom) + 0.5rem);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-composer-host,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-composer-host,\n.thread-ui-shell.dark .thread-graph-composer-host {\n  border-top-color: #2a2f3a;\n  background: var(--theme-surface);\n}\n.thread-ui-shell .thread-graph-composer-host > .thread-composer-layer,\n.thread-ui-shell .thread-graph-composer-host > .thread-graph-composer-layer {\n  width: 100%;\n}\n.thread-ui-shell .thread-split-chat-pane,\n.thread-ui-shell .thread-split-workspace-pane {\n  width: 100%;\n  min-height: 0;\n}\n.thread-ui-shell .thread-split-chat-pane {\n  min-width: 0;\n}\n.thread-ui-shell .thread-split-region,\n.thread-ui-shell .thread-split-container {\n  height: 100%;\n  min-height: 0;\n  overflow: hidden;\n}\n.thread-ui-shell .thread-graph-shell-desktop-split {\n  display: none !important;\n}\n.thread-ui-shell .thread-graph-shell-mobile-split {\n  display: block !important;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-graph-shell-desktop-split {\n  display: flex !important;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-graph-shell-mobile-split {\n  display: none !important;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-graph-shell-desktop-split .thread-split-chat-pane,\n.thread-ui-shell[data-thread-layout=desktop] .thread-graph-shell-desktop-split .thread-split-workspace-pane,\n.thread-ui-shell .thread-graph-shell-desktop-split .thread-split-chat-pane,\n.thread-ui-shell .thread-graph-shell-desktop-split .thread-split-workspace-pane {\n  min-width: 0;\n  height: 100%;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-graph-shell-desktop-split .thread-split-chat-pane,\n.thread-ui-shell[data-thread-layout=desktop] .thread-graph-shell-desktop-split .thread-split-workspace-pane {\n  flex: 1 1 0;\n  min-width: 0;\n  width: auto;\n}\n.thread-ui-shell[data-thread-layout=desktop] {\n  padding: 0.5rem;\n}\n.thread-ui-shell[data-thread-layout=desktop].thread-ui-viewport-constrained {\n  height: 100svh;\n  max-height: 100svh;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-shell-frame {\n  display: grid;\n  grid-template-columns: 264px minmax(0, 1fr);\n  gap: 0.5rem;\n  height: 100%;\n  min-height: 0;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-desktop-only-flex {\n  display: flex !important;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-desktop-only-inline-flex {\n  display: inline-flex !important;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-mobile-only-block,\n.thread-ui-shell[data-thread-layout=desktop] .thread-mobile-only-grid,\n.thread-ui-shell[data-thread-layout=desktop] .thread-mobile-only-inline-flex {\n  display: none !important;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-mobile-chat-hidden,\n.thread-ui-shell[data-thread-layout=desktop] .thread-mobile-workspace-hidden {\n  display: block !important;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-desktop-collapsed-hidden {\n  display: none;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-shell-frame.is-rail-collapsed {\n  grid-template-columns: 56px minmax(0, 1fr);\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-shell-frame.is-rail-hidden {\n  grid-template-columns: minmax(0, 1fr);\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-rooms-rail {\n  position: static;\n  z-index: auto;\n  width: auto;\n  min-width: 0;\n  height: 100%;\n  transform: none;\n  translate: 0 0;\n  pointer-events: auto;\n  border: 1px solid var(--theme-border);\n  border-radius: 12px;\n  box-shadow: var(--theme-shadow);\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-rooms-rail-header {\n  height: 4rem;\n  align-items: center;\n  padding-bottom: 0;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-shell-card {\n  border: 1px solid var(--theme-border);\n  border-radius: 12px;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-topbar-row {\n  min-height: 4rem;\n  padding-left: 1.25rem;\n  padding-right: 1.25rem;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-mobile-view-switch {\n  display: none !important;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-split-region {\n  padding: 0.5rem;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-split-container.has-workspace {\n  display: flex;\n  align-items: stretch;\n  min-width: 0;\n  min-height: 0;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-split-chat-pane {\n  flex: 0 0 var(--thread-chat-percent, 54%);\n  min-width: min(31rem, 100%);\n  width: auto;\n  height: 100%;\n  display: block;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-split-workspace-pane {\n  flex: 0 0 var(--thread-workspace-percent, 46%);\n  min-width: 19rem;\n  width: auto;\n  height: 100%;\n  display: block;\n}\n.thread-ui-shell[data-thread-layout=desktop] .thread-resize-handle {\n  display: flex !important;\n}\n@media (min-width: 640px) {\n  .thread-ui-shell:not([data-thread-layout=mobile]) {\n    padding: 0.5rem;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]).thread-ui-viewport-constrained {\n    height: 100svh;\n    max-height: 100svh;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-shell-frame {\n    display: grid;\n    grid-template-columns: 264px minmax(0, 1fr);\n    gap: 0.5rem;\n    height: 100%;\n    min-height: 0;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-desktop-only-flex {\n    display: flex !important;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-desktop-only-inline-flex {\n    display: inline-flex !important;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-mobile-only-block,\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-mobile-only-grid,\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-mobile-only-inline-flex {\n    display: none !important;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-mobile-chat-hidden,\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-mobile-workspace-hidden {\n    display: block !important;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-desktop-collapsed-hidden {\n    display: none;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-shell-frame.is-rail-collapsed {\n    grid-template-columns: 56px minmax(0, 1fr);\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-shell-frame.is-rail-hidden {\n    grid-template-columns: minmax(0, 1fr);\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-rooms-rail {\n    position: static;\n    z-index: auto;\n    width: auto;\n    min-width: 0;\n    height: 100%;\n    transform: none;\n    translate: 0 0;\n    pointer-events: auto;\n    border: 1px solid var(--theme-border);\n    border-radius: 12px;\n    box-shadow: var(--theme-shadow);\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-rooms-rail-header {\n    height: 4rem;\n    align-items: center;\n    padding-bottom: 0;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-shell-card {\n    border: 1px solid var(--theme-border);\n    border-radius: 12px;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-topbar-row {\n    min-height: 4rem;\n    padding-left: 1.25rem;\n    padding-right: 1.25rem;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-mobile-view-switch {\n    display: none !important;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-split-region {\n    padding: 0.5rem;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-split-container.has-workspace {\n    display: flex;\n    align-items: stretch;\n    min-width: 0;\n    min-height: 0;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-split-chat-pane {\n    flex: 0 0 var(--thread-chat-percent, 54%);\n    min-width: min(31rem, 100%);\n    width: auto;\n    height: 100%;\n    display: block;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-split-workspace-pane {\n    flex: 0 0 var(--thread-workspace-percent, 46%);\n    min-width: 19rem;\n    width: auto;\n    height: 100%;\n    display: block;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-resize-handle {\n    display: flex !important;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-graph-shell-desktop-split {\n    display: flex !important;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-graph-shell-mobile-split {\n    display: none !important;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-graph-shell-desktop-split .thread-split-chat-pane,\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-graph-shell-desktop-split .thread-split-workspace-pane {\n    flex: 1 1 0;\n    min-width: 0;\n    width: auto;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-graph-shell-desktop-split .thread-split-chat-pane {\n    min-width: 0;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-graph-shell-desktop-split .thread-split-workspace-pane {\n    min-width: 0;\n  }\n}\n.thread-ui-shell .thread-resize-handle span {\n  background: var(--theme-border);\n}\n.thread-ui-shell .thread-resize-handle:hover span,\n.thread-ui-shell .thread-resize-handle:focus-visible span {\n  background: var(--theme-border-strong);\n  box-shadow: 0 0 0 3px color-mix(in oklch, var(--theme-accent-border) 24%, transparent);\n}\n.thread-ui-shell .thread-graph-right-tabs {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n}\n.thread-ui-shell .thread-graph-right-tab-secondary {\n  border-color: var(--theme-border);\n}\n.thread-ui-shell .thread-workspace-tab,\n.thread-ui-shell .thread-graph-right-tab {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-workspace-tab:hover,\n.thread-ui-shell .thread-graph-right-tab:hover {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-workspace-tab.is-active,\n.thread-ui-shell .thread-graph-right-tab.is-active {\n  background: var(--theme-surface-strong);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-visualization-panel {\n  background: var(--theme-surface);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-flow {\n  overflow: hidden;\n  border: 1px solid var(--theme-border);\n  border-radius: 12px;\n  background: var(--theme-surface);\n}\n.thread-ui-shell .thread-graph-flow-node {\n  position: relative;\n  min-width: 8rem;\n  max-width: 12rem;\n  border: 1px solid var(--theme-border-strong);\n  border-radius: 8px;\n  background: var(--theme-panel);\n  padding: 0.85rem 1rem;\n  color: var(--theme-fg);\n  text-align: center;\n  box-shadow: var(--theme-shadow);\n}\n.thread-ui-shell .thread-graph-flow .react-flow {\n  background: var(--theme-surface);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-flow .react-flow__edge-path {\n  stroke: var(--theme-border-contrast);\n}\n.thread-ui-shell .thread-graph-flow .react-flow__background {\n  background: var(--theme-surface);\n}\n.thread-ui-shell .thread-graph-flow .react-flow__controls {\n  overflow: hidden;\n  border: 1px solid var(--theme-border);\n  border-radius: 8px;\n  box-shadow: var(--theme-shadow);\n}\n.thread-ui-shell .thread-graph-flow .react-flow__controls-button {\n  border-bottom-color: var(--theme-border);\n  background: var(--theme-panel);\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-graph-flow .react-flow__controls-button:hover {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-flow .react-flow__controls-button svg {\n  fill: currentColor;\n}\n.thread-ui-shell .thread-guide-section {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-guide-icon,\n.thread-ui-shell .thread-guide-tag {\n  background: var(--theme-surface-strong);\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-workspace-mobile-tabs,\n.thread-ui-shell .thread-graph-workspace-mobile-explorer {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n}\n.thread-ui-shell .thread-graph-workspace-mobile-stack,\n.thread-ui-shell .thread-graph-workspace-mobile-viewer {\n  background: var(--theme-surface);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-workspace-resizable {\n  height: 100%;\n  min-width: 0;\n}\n.thread-ui-shell .thread-graph-workspace-explorer-pane {\n  min-width: 0;\n}\n.thread-ui-shell .thread-graph-workspace-viewer-pane {\n  min-width: 0;\n}\n.thread-ui-shell .thread-graph-workspace-resize-handle::after {\n  background: var(--theme-border);\n}\n.thread-ui-shell .thread-graph-workspace-resize-handle:hover::after,\n.thread-ui-shell .thread-graph-workspace-resize-handle:focus-visible::after {\n  background: var(--theme-border-contrast);\n}\n.thread-ui-shell .thread-graph-explorer,\n.thread-ui-shell .thread-graph-viewer {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-explorer-header,\n.thread-ui-shell .thread-graph-viewer-header {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-explorer h2,\n.thread-ui-shell .thread-graph-viewer h2 {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-explorer-icon-button,\n.thread-ui-shell .thread-graph-explorer-collapse-button,\n.thread-ui-shell .thread-graph-viewer-header button {\n  border-color: var(--theme-border);\n  background: var(--theme-surface-strong);\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-graph-explorer-icon-button:hover,\n.thread-ui-shell .thread-graph-explorer-collapse-button:hover,\n.thread-ui-shell .thread-graph-viewer-header button:hover {\n  border-color: var(--theme-border-strong);\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-panel-expand-fab {\n  position: absolute;\n  top: 50%;\n  z-index: 30;\n  display: inline-flex;\n  transform: translateY(-50%);\n}\n.thread-ui-shell {\n  display: flex;\n  flex-direction: column;\n  padding: 0 !important;\n}\n.thread-ui-shell .thread-shell-frame {\n  flex: 1;\n  height: auto;\n  min-height: 0;\n}\n.thread-ui-shell .thread-topbar-surface {\n  border-radius: 0;\n  flex-shrink: 0;\n  padding-top: env(safe-area-inset-top);\n}\n.thread-ui-shell[data-thread-layout] .thread-topbar-row {\n  height: 63px;\n  min-height: 63px;\n  padding: 0 12px;\n}\n.thread-ui-shell .thread-topbar-row > div {\n  gap: 8px;\n}\n.thread-ui-shell .thread-topbar-row > div > div:first-child {\n  gap: 8px;\n}\n.thread-ui-shell .thread-topbar-row button.thread-icon-button[aria-label="Open rooms"] {\n  width: 44px;\n  height: 44px;\n}\n.thread-graph-room-card-icon[data-thread-status=running] {\n  color: var(--status-success-fg, #70cfa3);\n  background: color-mix(in srgb, var(--status-success-fg, #70cfa3) 12%, transparent);\n}\n.thread-graph-room-card-icon[data-thread-status=failed] {\n  color: var(--status-danger-fg, #e78a8a);\n}\n.thread-room-running {\n  animation: thread-room-spin 1.6s linear infinite;\n}\n@keyframes thread-room-spin {\n  to {\n    transform: rotate(360deg);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .thread-room-running {\n    animation: none;\n  }\n}\n.thread-ui-rail-collapsed .thread-graph-room-card {\n  padding-inline: 0;\n}\n.thread-room-tooltip[data-slot=tooltip-content] {\n  max-width: min(280px, calc(100vw - 32px));\n  overflow-wrap: anywhere;\n  padding: 10px 13px;\n  border: 1px solid var(--theme-border, #444);\n  border-radius: 12px;\n  background: var(--theme-panel, #242420);\n  color: var(--theme-fg, #eee);\n  box-shadow: 0 8px 28px #0003;\n}\n.thread-graph-download-preview {\n  display: flex;\n  flex: 1;\n  min-height: 0;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  padding: 32px 20px;\n  overflow: auto;\n  text-align: center;\n  color: var(--theme-fg-muted);\n  font-size: 13px;\n}\n.thread-graph-download-preview strong {\n  max-width: 100%;\n  overflow-wrap: anywhere;\n  color: var(--theme-fg);\n  font-size: 15px;\n}\n.thread-graph-download-preview-icon {\n  box-sizing: content-box;\n  width: 28px;\n  height: 28px;\n  padding: 20px;\n  margin-bottom: 8px;\n  border: 1px solid var(--theme-border);\n  border-radius: 20px;\n}\n.thread-graph-download-preview button {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 10px 16px;\n  border: 1px solid var(--theme-border);\n  border-radius: 10px;\n  color: var(--theme-fg);\n  background: var(--theme-panel);\n  cursor: pointer;\n}\n.thread-graph-download-preview button:hover {\n  background: var(--theme-bg);\n}\n.thread-graph-download-preview button:disabled {\n  opacity: .6;\n  cursor: wait;\n}\n');

// src/styles/history-markdown.css
styleInject('.thread-ui-shell .thread-graph-panel-expand-fab.left-3 {\n  left: 0.75rem;\n}\n.thread-ui-shell .thread-graph-panel-expand-fab.right-3 {\n  right: 0.75rem;\n}\n.thread-ui-shell .thread-graph-panel-expand-fab:hover {\n  transform: translateY(-50%) scale(1.04);\n}\n.thread-ui-shell .thread-graph-workspace-label,\n.thread-ui-shell .thread-graph-workspace-loading,\n.thread-ui-shell .thread-graph-workspace-empty,\n.thread-ui-shell .thread-graph-file-preview-header,\n.thread-ui-shell .thread-graph-file-preview-footer {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-file-preview-header,\n.thread-ui-shell .thread-graph-file-preview-footer {\n  border-color: var(--theme-border);\n}\n.thread-ui-shell .thread-graph-file-preview-footer,\n.thread-ui-shell .thread-graph-file-preview-frame {\n  background: var(--theme-bg);\n}\n.thread-ui-shell .thread-graph-workspace-empty {\n  border-color: var(--theme-border);\n  background: var(--theme-surface-strong);\n}\n.thread-ui-shell .thread-graph-explorer button,\n.thread-ui-shell .thread-graph-viewer button {\n  color: inherit;\n}\n.thread-ui-shell .thread-graph-tree-row {\n  --thread-graph-tree-row-background: transparent;\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-graph-tree-indent-guides span {\n  border-color: color-mix(in oklch, var(--theme-border) 72%, transparent);\n}\n.thread-ui-shell .thread-graph-editor-tabs-shell,\n.thread-ui-shell .thread-graph-editor-tabs,\n.thread-ui-shell .thread-graph-editor-breadcrumbs {\n  border-color: var(--theme-border);\n  background: var(--theme-surface-strong);\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-editor-tabs {\n  scrollbar-width: thin;\n}\n.thread-ui-shell .thread-graph-editor-tab {\n  position: relative;\n  border-color: var(--theme-border);\n  background: var(--theme-surface-strong);\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-editor-tab::after {\n  position: absolute;\n  inset: 0 0 auto;\n  height: 1px;\n  background: transparent;\n  content: "";\n}\n.thread-ui-shell .thread-graph-editor-tab:hover {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-editor-tab.is-active {\n  background: var(--theme-bg);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-editor-tab.is-active::after {\n  background: var(--theme-accent-solid);\n}\n.thread-ui-shell .thread-graph-editor-tab-close {\n  color: var(--theme-fg-muted);\n  opacity: 0;\n}\n.thread-ui-shell .thread-graph-editor-tab:hover .thread-graph-editor-tab-close,\n.thread-ui-shell .thread-graph-editor-tab.is-active .thread-graph-editor-tab-close,\n.thread-ui-shell .thread-graph-editor-tab-close:focus-visible {\n  opacity: 1;\n}\n.thread-ui-shell .thread-graph-editor-tab-close:hover {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-editor-close-confirm {\n  border-color: var(--theme-border);\n  background: color-mix(in oklch, var(--theme-accent-solid) 8%, var(--theme-surface));\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-editor-breadcrumbs {\n  background: var(--theme-bg);\n}\n.thread-ui-shell .thread-graph-editor-toolbar-button,\n.thread-ui-shell .thread-graph-editor-tabs-action button {\n  border: 0;\n  background: transparent;\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-editor-toolbar-button:hover:not(:disabled),\n.thread-ui-shell .thread-graph-editor-toolbar-button:focus-visible,\n.thread-ui-shell .thread-graph-editor-tabs-action button:hover,\n.thread-ui-shell .thread-graph-editor-tabs-action button:focus-visible {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-explorer-header .thread-graph-explorer-icon-button,\n.thread-ui-shell .thread-graph-explorer-header .thread-graph-explorer-collapse-button {\n  border-color: transparent;\n  background: transparent;\n}\n.thread-ui-shell .thread-graph-right-tab {\n  position: relative;\n  border-radius: 0;\n  background: transparent;\n}\n.thread-ui-shell .thread-graph-right-tab.is-active {\n  background: transparent;\n}\n.thread-ui-shell .thread-graph-right-tab.is-active::after {\n  position: absolute;\n  right: 0.5rem;\n  bottom: 0;\n  left: 0.5rem;\n  height: 1px;\n  background: var(--theme-accent-solid);\n  content: "";\n}\n.thread-ui-shell .thread-graph-monaco-editor {\n  background: var(--theme-bg);\n}\n.thread-ui-shell .thread-graph-explorer {\n  container-type: inline-size;\n}\n.thread-ui-shell .thread-graph-tree-row:hover {\n  --thread-graph-tree-row-background: var(--theme-hover);\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-tree-row:focus-within {\n  --thread-graph-tree-row-background: var(--theme-hover);\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-tree-row.is-selected {\n  --thread-graph-tree-row-background: color-mix( in oklch, var(--theme-accent-solid) 13%, var(--theme-panel) );\n  background: var(--thread-graph-tree-row-background);\n  color: var(--theme-fg);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-tree-row.is-selected,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-tree-row.is-selected,\n.thread-ui-shell.dark .thread-graph-tree-row.is-selected {\n  --thread-graph-tree-row-background: color-mix( in oklch, var(--theme-accent-solid) 18%, var(--theme-panel) );\n  background: var(--thread-graph-tree-row-background);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-tree-row.is-focused {\n  outline: 1px solid color-mix(in oklch, var(--theme-accent-solid) 68%, transparent);\n  outline-offset: -1px;\n}\n.thread-ui-shell .thread-graph-tree-row.is-selected svg {\n  color: currentColor;\n}\n.thread-ui-shell .thread-graph-tree-row.is-selected .thread-graph-tree-action,\n.thread-ui-shell .thread-graph-tree-action.is-selected {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-tree-row.is-selected .thread-graph-tree-action:hover,\n.thread-ui-shell .thread-graph-tree-action.is-selected:hover {\n  background: color-mix(in oklch, var(--theme-accent-solid) 12%, transparent);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-tree-action {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-tree-actions {\n  z-index: 1;\n  background: var(--thread-graph-tree-row-background);\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 160ms cubic-bezier(0.16, 1, 0.3, 1);\n}\n.thread-ui-shell .thread-graph-tree-row:hover .thread-graph-tree-actions,\n.thread-ui-shell .thread-graph-tree-row:focus-within .thread-graph-tree-actions {\n  opacity: 1;\n  pointer-events: auto;\n}\n.thread-ui-shell .thread-graph-tree-action:hover {\n  background: var(--theme-surface-strong);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-explorer-filter-mode button {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-explorer-filter-mode button:hover,\n.thread-ui-shell .thread-graph-explorer-filter-mode button:focus-visible {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-explorer-filter-mode button.is-active {\n  background: var(--theme-panel);\n  color: var(--theme-fg);\n  box-shadow: 0 1px 2px color-mix(in oklch, var(--theme-bg) 22%, transparent);\n}\n.thread-ui-shell .thread-graph-molecule-preview {\n  background: var(--theme-surface);\n}\n.thread-ui-shell .thread-graph-molecule-viewer {\n  background: var(--theme-surface);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-molecule-header,\n.thread-ui-shell .thread-graph-molecule-controls {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-molecule-body {\n  display: flex;\n  min-height: 0;\n  flex: 1;\n  flex-direction: column;\n  overflow: hidden;\n}\n.thread-ui-shell .thread-graph-molecule-header h2 {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-molecule-header p,\n.thread-ui-shell .thread-graph-molecule-header span,\n.thread-ui-shell .thread-graph-molecule-trajectory {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-molecule-controls {\n  border-top: 1px solid var(--theme-border);\n  display: flex;\n  flex-direction: column;\n  gap: 0.75rem;\n  max-height: min(42%, 18rem);\n  overflow: auto;\n  padding: 0.75rem;\n}\n.thread-ui-shell .thread-graph-molecule-control-row {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 0.75rem;\n}\n.thread-ui-shell .thread-graph-molecule-control-row > .thread-graph-molecule-button-group {\n  max-width: 100%;\n  flex-wrap: wrap;\n}\n.thread-ui-shell .thread-graph-molecule-control-title {\n  color: var(--theme-fg);\n  font-size: 0.875rem;\n  font-weight: 600;\n  line-height: 1.25rem;\n}\n.thread-ui-shell .thread-graph-molecule-control-subtitle {\n  margin-top: 0.125rem;\n  color: var(--theme-fg-muted);\n  font-size: 0.6875rem;\n  line-height: 1rem;\n}\n.thread-ui-shell .thread-graph-molecule-button-group {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.125rem;\n  border: 1px solid var(--theme-border);\n  border-radius: 0.5rem;\n  background: var(--theme-surface);\n  padding: 0.125rem;\n}\n.thread-ui-shell .thread-graph-molecule-button {\n  display: inline-flex;\n  min-width: 1.75rem;\n  height: 1.75rem;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid transparent;\n  border-radius: 0.375rem;\n  background: transparent;\n  color: var(--theme-fg-soft);\n  transition:\n    background-color 140ms ease,\n    border-color 140ms ease,\n    color 140ms ease,\n    opacity 140ms ease;\n}\n.thread-ui-shell .thread-graph-molecule-button:hover:not(:disabled) {\n  border-color: var(--theme-border);\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-molecule-button:disabled {\n  cursor: not-allowed;\n  color: var(--theme-fg-subtle);\n  opacity: 0.45;\n}\n.thread-ui-shell .thread-graph-molecule-button-divider {\n  width: 1px;\n  align-self: stretch;\n  margin-inline: 0.25rem;\n  background: var(--theme-border);\n}\n.thread-ui-shell .thread-graph-molecule-stage {\n  background: var(--theme-bg);\n}\n.thread-ui-shell .thread-graph-molecule-error {\n  background: color-mix(in oklch, #ef4444 12%, var(--theme-surface));\n  color: var(--theme-danger);\n}\n.thread-ui-shell .thread-graph-molecule-empty {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-molecule-tooltip {\n  border-color: var(--theme-border);\n  background: color-mix(in oklch, var(--theme-surface) 96%, transparent);\n  color: var(--theme-fg);\n  box-shadow: 0 10px 28px color-mix(in oklch, var(--theme-bg) 72%, transparent);\n}\n.thread-ui-shell .thread-graph-molecule-tooltip div,\n.thread-ui-shell .thread-graph-molecule-tooltip span {\n  color: inherit;\n}\n.thread-ui-shell .thread-graph-molecule-viewer.is-timeline {\n  height: auto;\n}\n.thread-ui-shell .is-timeline .thread-graph-molecule-body {\n  flex: none;\n  overflow: visible;\n}\n.thread-ui-shell .is-timeline .thread-graph-molecule-stage {\n  flex: none;\n  height: clamp(240px, 30vw, 360px);\n}\n.thread-ui-shell .is-timeline .thread-graph-molecule-controls {\n  max-height: none;\n  overflow: visible;\n}\n.thread-ui-shell .thread-graph-artifact-file-link,\n.thread-ui-shell .thread-graph-molecule-file-link {\n  color: var(--theme-fg);\n  text-decoration: none;\n}\n.thread-ui-shell .thread-graph-molecule-file-link {\n  display: inline-flex;\n  max-width: 100%;\n  align-items: center;\n  gap: 0.5rem;\n  vertical-align: bottom;\n}\n.thread-ui-shell .thread-graph-artifact-file-link:hover,\n.thread-ui-shell .thread-graph-molecule-file-link:hover {\n  color: var(--theme-accent-strong);\n  text-decoration: underline;\n  text-underline-offset: 3px;\n}\n.thread-ui-shell .thread-graph-molecule-playback-row {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 0.5rem;\n}\n.thread-ui-shell .thread-graph-molecule-play-button {\n  display: inline-flex;\n  height: 2rem;\n  min-width: 4.75rem;\n  align-items: center;\n  justify-content: center;\n  gap: 0.375rem;\n  border: 1px solid var(--theme-border);\n  border-radius: 0.375rem;\n  padding: 0.25rem 0.625rem;\n  background: var(--theme-accent-soft);\n  color: var(--theme-accent-strong);\n  font-size: 0.75rem;\n}\n.thread-ui-shell .thread-graph-molecule-play-button:hover {\n  background: var(--theme-hover);\n}\n.thread-ui-shell .thread-graph-molecule-frame-count {\n  color: var(--theme-fg-muted);\n  font-size: 0.75rem;\n  font-variant-numeric: tabular-nums;\n  white-space: nowrap;\n}\n.thread-ui-shell .thread-graph-molecule-frame-count strong {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-molecule-frame-buttons {\n  display: inline-flex;\n  gap: 0.125rem;\n  margin-left: auto;\n}\n.thread-ui-shell .thread-graph-molecule-scrubber {\n  display: block;\n  appearance: none;\n  width: 100%;\n  height: 24px;\n  margin: 0.5rem 0 0;\n  border: 0;\n  border-radius: 3px;\n  background-color: transparent;\n  background-image: linear-gradient(var(--theme-accent-solid), var(--theme-accent-solid));\n  background-repeat: no-repeat;\n  background-position: left center;\n  cursor: pointer;\n}\n.thread-ui-shell .thread-graph-molecule-scrubber::-webkit-slider-runnable-track {\n  height: 6px;\n  border-radius: 3px;\n  background: color-mix(in srgb, var(--theme-fg-muted) 24%, transparent);\n}\n.thread-ui-shell .thread-graph-molecule-scrubber::-moz-range-track {\n  height: 6px;\n  border-radius: 3px;\n  background: color-mix(in srgb, var(--theme-fg-muted) 24%, transparent);\n}\n.thread-ui-shell .thread-graph-molecule-scrubber::-webkit-slider-thumb {\n  appearance: none;\n  width: 16px;\n  height: 16px;\n  margin-top: -5px;\n  border: 2px solid var(--theme-surface);\n  border-radius: 50%;\n  background: var(--theme-accent-solid);\n  box-shadow: 0 0 0 1px var(--theme-accent-solid);\n}\n.thread-ui-shell .thread-graph-molecule-scrubber::-moz-range-thumb {\n  width: 12px;\n  height: 12px;\n  border: 2px solid var(--theme-surface);\n  border-radius: 50%;\n  background: var(--theme-accent-solid);\n  box-shadow: 0 0 0 1px var(--theme-accent-solid);\n}\n.thread-ui-shell .thread-graph-molecule-scrubber:focus-visible,\n.thread-ui-shell .thread-graph-molecule-file-link:focus-visible {\n  outline: 2px solid var(--theme-accent-solid);\n  outline-offset: 3px;\n}\n.thread-ui-shell .thread-graph-molecule-frame-scale {\n  display: flex;\n  justify-content: space-between;\n  color: var(--theme-fg-muted);\n  font-size: 0.625rem;\n  font-variant-numeric: tabular-nums;\n}\n.thread-ui-shell .thread-graph-molecule-camera {\n  margin-top: 0.75rem;\n  border: 1px solid var(--theme-border);\n  border-radius: 0.5rem;\n  padding: 0.5rem;\n  color: var(--theme-fg-muted);\n  font-size: 0.625rem;\n}\n.thread-ui-shell .thread-graph-molecule-camera-divider {\n  width: 100%;\n  height: 1px;\n  margin-block: 0.5rem;\n  background: var(--theme-border);\n}\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin {\n  height: 100%;\n  min-height: 0;\n  border: 0;\n  border-radius: 0;\n  background: var(--theme-surface);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__header {\n  min-height: 60px;\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n  padding: 0.75rem 1.25rem;\n}\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__header h2 {\n  color: var(--theme-fg);\n  font-size: 0.875rem;\n  font-weight: 650;\n}\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__header p,\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__header span {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__toolbar {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n  padding: 0.5rem 0.625rem;\n}\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__toolbar button,\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__timeline button {\n  border-color: var(--theme-border);\n  background: var(--theme-surface-strong);\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__toolbar button:hover,\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__timeline button:hover {\n  border-color: var(--theme-border-strong);\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__toolbar button:disabled,\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__timeline button:disabled {\n  color: var(--theme-fg-subtle);\n}\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__toolbar-divider {\n  background: var(--theme-border);\n}\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__stage {\n  min-height: 0;\n  background: var(--theme-bg);\n}\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__error {\n  background: color-mix(in oklch, #ef4444 12%, var(--theme-surface));\n  color: var(--theme-danger);\n}\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__empty {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__tooltip {\n  border-color: var(--theme-border);\n  background: color-mix(in oklch, var(--theme-surface) 96%, transparent);\n  color: var(--theme-fg);\n  box-shadow: 0 10px 28px color-mix(in oklch, var(--theme-bg) 72%, transparent);\n}\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__tooltip span {\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__timeline,\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__status {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__timeline input {\n  accent-color: var(--theme-accent-solid);\n}\n.thread-ui-shell .thread-graph-molecule-preview .xyz-viewer-plugin__timeline button.is-live {\n  color: var(--theme-danger);\n}\n.thread-ui-shell .thread-graph-file-preview-header,\n.thread-ui-shell .thread-graph-file-preview-footer {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-load-more-button {\n  border: 1px solid var(--theme-border);\n  background: color-mix(in oklch, var(--theme-accent-solid) 8%, var(--theme-panel));\n  color: var(--theme-fg-soft);\n  transition:\n    background-color 140ms ease,\n    border-color 140ms ease,\n    color 140ms ease;\n}\n.thread-ui-shell .thread-graph-load-more-button:hover:not(:disabled) {\n  border-color: color-mix(in oklch, var(--theme-accent-solid) 28%, var(--theme-border));\n  background: color-mix(in oklch, var(--theme-accent-solid) 14%, var(--theme-panel));\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-code-preview {\n  background: var(--theme-bg);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-code-preview pre,\n.thread-ui-shell .thread-graph-code-preview code {\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    Monaco,\n    Consolas,\n    "Liberation Mono",\n    monospace !important;\n  font-size: 0.78rem;\n  line-height: 1.55;\n}\n.thread-ui-shell .thread-graph-highlighted-code-preview pre {\n  min-height: 100%;\n  margin: 0;\n  padding: 1rem 0;\n  background: transparent !important;\n}\n.thread-ui-shell .thread-graph-highlighted-code-preview code {\n  display: block;\n  min-width: max-content;\n  counter-reset: workspace-code-line;\n}\n.thread-ui-shell .thread-graph-highlighted-code-preview .line {\n  display: block;\n  min-width: max-content;\n  padding-right: 1rem;\n  counter-increment: workspace-code-line;\n}\n.thread-ui-shell .thread-graph-highlighted-code-preview .line::before {\n  content: counter(workspace-code-line);\n  display: inline-block;\n  width: 3.5rem;\n  margin-right: 1rem;\n  border-right: 1px solid var(--theme-border);\n  padding-right: 0.75rem;\n  color: var(--theme-fg-muted);\n  text-align: right;\n  user-select: none;\n}\n.thread-ui-shell .thread-graph-plain-code-preview {\n  min-height: 100%;\n  margin: 0;\n  padding: 1rem;\n  background: transparent;\n  color: var(--theme-fg);\n  white-space: pre;\n}\n.thread-ui-shell .thread-graph-code-line {\n  display: block;\n  min-width: max-content;\n}\n.thread-ui-shell :is(.thread-graph-code-line, .thread-graph-highlighted-code-preview .line).is-focused-line {\n  background: color-mix(in oklch, var(--theme-accent-solid) 16%, transparent);\n  box-shadow: inset 0 0 0 1px color-mix(in oklch, var(--theme-accent-solid) 28%, transparent);\n}\n.thread-ui-shell .thread-graph-code-line-number {\n  display: inline-block;\n  width: 2.5rem;\n  margin-right: 1rem;\n  border-right: 1px solid var(--theme-border);\n  padding-right: 0.75rem;\n  color: var(--theme-fg-muted);\n  text-align: right;\n  user-select: none;\n}\n.thread-ui-shell .thread-graph-markdown-preview {\n  background: var(--theme-bg);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-markdown-preview > * {\n  max-width: 74ch;\n  margin-inline: auto;\n}\n.thread-ui-shell .thread-graph-markdown-preview :where(h1, h2, h3, h4) {\n  margin: 1.4em 0 0.55em;\n  color: var(--theme-fg);\n  font-weight: 650;\n  line-height: 1.25;\n}\n.thread-ui-shell .thread-graph-markdown-preview :where(h1:first-child, h2:first-child, h3:first-child) {\n  margin-top: 0;\n}\n.thread-ui-shell .thread-graph-markdown-preview h1 {\n  font-size: 1.5rem;\n}\n.thread-ui-shell .thread-graph-markdown-preview h2 {\n  font-size: 1.2rem;\n}\n.thread-ui-shell .thread-graph-markdown-preview h3 {\n  font-size: 1rem;\n}\n.thread-ui-shell .thread-graph-markdown-preview :where(p, ul, ol, pre, blockquote, table) {\n  margin-bottom: 0.9rem;\n}\n.thread-ui-shell .thread-graph-markdown-preview :where(ul, ol) {\n  padding-left: 1.35rem;\n}\n.thread-ui-shell .thread-graph-markdown-preview :where(img) {\n  display: block;\n  max-width: 100%;\n  height: auto;\n  margin: 1rem auto;\n  border: 1px solid var(--theme-border);\n  border-radius: 0.375rem;\n  background: var(--theme-surface);\n}\n.thread-ui-shell .thread-graph-zoomable-image-trigger {\n  display: flex;\n  max-width: 100%;\n  max-height: 100%;\n  margin: 0 auto;\n  cursor: zoom-in;\n  align-items: center;\n  justify-content: center;\n  border: 0;\n  background: transparent;\n  padding: 0;\n}\n.thread-ui-shell .thread-graph-zoomable-image-trigger:focus-visible {\n  outline: 2px solid var(--theme-accent-ring);\n  outline-offset: 3px;\n}\n.thread-graph-image-lightbox {\n  position: fixed;\n  z-index: 120;\n  inset: 0;\n  overflow: hidden;\n  background: rgb(8 10 14 / 0.94);\n  color: rgb(241 245 249);\n}\n.thread-graph-image-lightbox-toolbar {\n  position: absolute;\n  z-index: 2;\n  top: max(0.75rem, env(safe-area-inset-top));\n  right: max(0.75rem, env(safe-area-inset-right));\n  display: flex;\n  height: 2.5rem;\n  align-items: center;\n  gap: 0.25rem;\n  border: 1px solid rgb(148 163 184 / 0.3);\n  border-radius: 0.5rem;\n  background: rgb(24 28 36 / 0.96);\n  padding: 0.25rem;\n  box-shadow: 0 12px 32px rgb(0 0 0 / 0.32);\n}\n.thread-graph-image-lightbox-toolbar button {\n  display: inline-flex;\n  width: 2rem;\n  height: 2rem;\n  align-items: center;\n  justify-content: center;\n  border: 0;\n  border-radius: 0.375rem;\n  background: transparent;\n  color: rgb(226 232 240);\n  transition: background-color 160ms ease-out, color 160ms ease-out;\n}\n.thread-graph-image-lightbox-toolbar button:hover:not(:disabled),\n.thread-graph-image-lightbox-toolbar button:focus-visible {\n  background: rgb(71 85 105 / 0.62);\n  color: rgb(248 250 252);\n  outline: none;\n}\n.thread-graph-image-lightbox-toolbar button:disabled {\n  cursor: not-allowed;\n  opacity: 0.35;\n}\n.thread-graph-image-lightbox-toolbar .thread-graph-image-lightbox-scale {\n  width: 4.75rem;\n  gap: 0.35rem;\n  font-variant-numeric: tabular-nums;\n  font-size: 0.75rem;\n}\n.thread-graph-image-lightbox-divider {\n  width: 1px;\n  height: 1.25rem;\n  margin: 0 0.125rem;\n  background: rgb(148 163 184 / 0.3);\n}\n.thread-graph-image-lightbox-viewport {\n  display: flex;\n  width: 100%;\n  height: 100%;\n  touch-action: none;\n  align-items: center;\n  justify-content: center;\n  overflow: hidden;\n  padding: max(4rem, calc(env(safe-area-inset-top) + 3.5rem)) 1rem max(1rem, env(safe-area-inset-bottom));\n}\n.thread-graph-image-lightbox-viewport img {\n  max-width: 100%;\n  max-height: 100%;\n  cursor: grab;\n  object-fit: contain;\n  user-select: none;\n  will-change: transform;\n}\n.thread-graph-image-lightbox-viewport img.is-dragging {\n  cursor: grabbing;\n}\n.thread-ui-shell .thread-graph-markdown-preview :where(pre) {\n  overflow-x: auto;\n  border: 1px solid var(--theme-border);\n  border-radius: 0.375rem;\n  background: var(--theme-surface-strong);\n  padding: 0.85rem;\n}\n.thread-ui-shell .thread-graph-markdown-preview :where(code) {\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    Monaco,\n    Consolas,\n    "Liberation Mono",\n    monospace;\n  font-size: 0.84em;\n}\n.thread-ui-shell .thread-graph-markdown-preview :where(:not(pre) > code) {\n  border-radius: 0.25rem;\n  background: var(--theme-surface-strong);\n  padding: 0.12rem 0.3rem;\n}\n.thread-ui-shell .thread-graph-markdown-preview :where(blockquote) {\n  border-left: 1px solid var(--theme-border-strong);\n  padding-left: 0.85rem;\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-graph-markdown-preview :where(table) {\n  display: block;\n  width: 100%;\n  overflow-x: auto;\n  border-collapse: collapse;\n}\n.thread-ui-shell .thread-graph-markdown-preview :where(th, td) {\n  border: 1px solid var(--theme-border);\n  padding: 0.45rem 0.6rem;\n  text-align: left;\n}\n.thread-ui-shell .thread-graph-markdown-view-switch {\n  border-color: var(--theme-border);\n  background: var(--theme-surface-strong);\n}\n.thread-ui-shell .thread-graph-markdown-view-switch button {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-markdown-view-switch button:hover,\n.thread-ui-shell .thread-graph-markdown-view-switch button:focus-visible {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-markdown-view-switch button.is-active {\n  background: var(--theme-panel);\n  color: var(--theme-fg);\n  box-shadow: 0 1px 2px color-mix(in oklch, var(--theme-bg) 22%, transparent);\n}\n.thread-ui-shell .thread-tool-call {\n  background: var(--theme-panel);\n  color: var(--theme-fg);\n  overflow: hidden;\n}\n.thread-ui-shell .thread-tool-call:hover {\n  border-color: var(--theme-border-strong);\n}\n.thread-ui-shell .thread-graph-tool-call {\n  font-family:\n    Inter,\n    ui-sans-serif,\n    system-ui,\n    -apple-system,\n    BlinkMacSystemFont,\n    "Segoe UI",\n    sans-serif;\n}\n.thread-ui-shell .thread-graph-tool-call,\n.thread-ui-shell .thread-graph-tool-accordion,\n.thread-ui-shell .thread-graph-tool-trigger,\n.thread-ui-shell .thread-graph-tool-content,\n.thread-ui-shell .thread-graph-tool-json,\n.thread-ui-shell .thread-graph-tool-output {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-tool-accordion {\n  overflow: hidden;\n  border: 1px solid var(--theme-border);\n  border-radius: 0.5rem;\n  background: var(--theme-panel);\n  box-shadow: 0 1px 2px color-mix(in oklch, var(--theme-bg) 65%, transparent);\n}\n.thread-ui-shell .thread-graph-tool-trigger {\n  display: flex;\n  width: 100%;\n  min-width: 0;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  border: 0;\n  background: var(--theme-panel);\n  text-align: left;\n  transition: background 160ms ease, color 160ms ease;\n}\n.thread-ui-shell .thread-graph-tool-trigger:hover {\n  background: var(--theme-hover);\n}\n.thread-ui-shell .thread-graph-tool-trigger svg {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-tool-trigger > svg {\n  margin-left: auto;\n}\n.thread-ui-shell .thread-graph-tool-badge {\n  display: inline-flex;\n  min-height: 1.35rem;\n  shrink: 0;\n  align-items: center;\n  gap: 0.25rem;\n  border: 1px solid transparent;\n  border-radius: 999px;\n  padding: 0.1rem 0.5rem;\n  font-size: 0.75rem;\n  font-weight: 400;\n  line-height: 1rem;\n}\n.thread-ui-shell .thread-graph-tool-badge.is-completed {\n  background: oklch(0.94 0.052 155);\n  color: oklch(0.43 0.095 155);\n}\n.thread-ui-shell .thread-graph-tool-badge.is-failed {\n  background: oklch(0.94 0.04 25);\n  color: oklch(0.48 0.125 24);\n}\n.thread-ui-shell .thread-graph-tool-badge.is-pending {\n  background: oklch(0.94 0.03 235);\n  color: oklch(0.43 0.09 242);\n}\n.thread-ui-shell .thread-graph-tool-badge.is-neutral {\n  background: var(--theme-muted);\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-tool-badge.is-completed,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-tool-badge.is-completed,\n.thread-ui-shell.dark .thread-graph-tool-badge.is-completed {\n  background: oklch(0.31 0.05 155);\n  color: oklch(0.8 0.115 155);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-tool-badge.is-failed,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-tool-badge.is-failed,\n.thread-ui-shell.dark .thread-graph-tool-badge.is-failed {\n  background: oklch(0.31 0.052 25);\n  color: oklch(0.78 0.12 25);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-tool-badge.is-pending,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-tool-badge.is-pending,\n.thread-ui-shell.dark .thread-graph-tool-badge.is-pending {\n  background: oklch(0.3 0.042 235);\n  color: oklch(0.77 0.1 235);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-tool-badge.is-neutral,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-tool-badge.is-neutral,\n.thread-ui-shell.dark .thread-graph-tool-badge.is-neutral {\n  background: #222733;\n  color: rgb(148 163 184);\n}\n.thread-ui-shell .thread-graph-tool-content {\n  display: grid;\n  gap: 0.75rem;\n  border-top: 0;\n  background: var(--theme-panel);\n}\n.thread-ui-shell .thread-graph-tool-content h4 {\n  margin: 0.25rem 0 0.5rem;\n  color: var(--theme-fg-muted);\n  font-size: 0.625rem;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n  line-height: 1rem;\n  text-transform: uppercase;\n}\n.thread-ui-shell .thread-graph-tool-json,\n.thread-ui-shell .thread-graph-tool-output {\n  overflow-x: auto;\n  border: 1px solid var(--theme-border);\n  border-radius: 0.375rem;\n  background: var(--theme-surface-strong);\n  padding: 0.75rem;\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    Menlo,\n    Monaco,\n    Consolas,\n    "Liberation Mono",\n    monospace;\n  font-size: 0.78rem;\n  line-height: 1.55;\n  white-space: pre-wrap;\n}\n.thread-ui-shell .thread-graph-tool-json > div {\n  padding-left: 1rem;\n}\n.thread-ui-shell .thread-graph-tool-output {\n  margin-top: 0.5rem;\n}\n.thread-ui-shell .thread-graph-tool-key {\n  color: oklch(0.58 0.18 18);\n}\n.thread-ui-shell .thread-graph-tool-string {\n  color: oklch(0.52 0.12 155);\n}\n.thread-ui-shell .thread-graph-tool-number {\n  color: oklch(0.55 0.13 235);\n}\n.thread-ui-shell .thread-graph-tool-boolean {\n  color: oklch(0.56 0.13 302);\n}\n.thread-ui-shell .thread-graph-tool-null,\n.thread-ui-shell .thread-graph-tool-punctuation,\n.thread-ui-shell .thread-graph-tool-object {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-history-tool {\n  width: 100%;\n  min-width: 0;\n  border: 0;\n  background: transparent !important;\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-history-tool-accordion {\n  background: var(--theme-panel);\n}\n.thread-ui-shell .thread-graph-tool-call {\n  margin: 0.45rem 0;\n}\n.thread-ui-shell .thread-graph-tool-call > .thread-graph-tool-accordion {\n  border: 0;\n  border-radius: 0;\n  background: transparent;\n  box-shadow: none;\n}\n.thread-ui-shell .thread-graph-tool-call > .thread-graph-tool-accordion .thread-graph-tool-trigger {\n  min-height: 2.5rem;\n  padding: 0.45rem 0.25rem;\n  background: transparent;\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-tool-call > .thread-graph-tool-accordion .thread-graph-tool-trigger:hover,\n.thread-ui-shell .thread-graph-tool-call > .thread-graph-tool-accordion .thread-graph-tool-trigger:focus-visible {\n  background: transparent;\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-graph-tool-call > .thread-graph-tool-accordion .thread-graph-tool-trigger > div > svg {\n  height: 1.45rem;\n  width: 1.45rem;\n  padding: 0.28rem;\n  border: 1px solid var(--theme-border-strong);\n  border-radius: 0.35rem;\n  color: currentColor;\n}\n.thread-ui-shell .thread-graph-tool-call .thread-graph-tool-action,\n.thread-ui-shell .thread-graph-tool-call .thread-graph-tool-name {\n  color: currentColor;\n}\n.thread-ui-shell .thread-graph-tool-call .thread-graph-tool-badge.is-completed {\n  display: none;\n}\n.thread-ui-shell .thread-graph-tool-call .thread-graph-tool-content {\n  margin: 0.25rem 0 0 1.95rem;\n  border: 1px solid var(--theme-border);\n  border-radius: 0.5rem;\n  background: var(--theme-panel);\n  padding: 0.8rem;\n}\n.thread-ui-shell .thread-graph-history-tool-trigger {\n  min-height: 2.75rem;\n}\n.thread-ui-shell .thread-graph-history-tool-trigger > div:first-child {\n  min-width: 0;\n}\n.thread-ui-shell .thread-graph-history-tool-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-history-tool.is-command .thread-graph-history-tool-icon {\n  color: oklch(0.63 0.12 75);\n}\n.thread-ui-shell .thread-graph-history-tool.is-tool .thread-graph-history-tool-icon {\n  color: oklch(0.61 0.12 315);\n}\n.thread-ui-shell .thread-graph-history-tool.is-agent .thread-graph-history-tool-icon {\n  color: oklch(0.58 0.11 170);\n}\n.thread-ui-shell .thread-graph-history-tool.is-skill .thread-graph-history-tool-icon {\n  color: oklch(0.58 0.12 285);\n}\n.thread-ui-shell .thread-graph-history-tool.is-search .thread-graph-history-tool-icon {\n  color: oklch(0.58 0.12 235);\n}\n.thread-ui-shell .thread-graph-history-tool.is-file-read .thread-graph-history-tool-icon {\n  color: oklch(0.58 0.1 205);\n}\n.thread-ui-shell .thread-graph-history-tool-summary {\n  display: flex;\n  min-width: 0;\n  align-items: center;\n  gap: 0.5rem;\n  overflow: hidden;\n  border: 1px solid var(--theme-border);\n  border-radius: 0.375rem;\n  background: var(--theme-surface-strong);\n  padding: 0.65rem 0.75rem;\n  color: var(--theme-fg-soft);\n  font-size: 0.875rem;\n  line-height: 1.5;\n}\n.thread-ui-shell .thread-graph-history-tool-summary > span:first-child {\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.thread-ui-shell .thread-graph-history-tool-ellipsis {\n  flex: 0 0 auto;\n  color: var(--theme-fg-muted);\n  font-size: 0.75rem;\n  letter-spacing: 0.16em;\n}\n.thread-ui-shell .thread-graph-history-tool-open {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-graph-history-tool-open:hover {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-history-event {\n  display: flex;\n  min-width: 0;\n  width: 100%;\n  align-items: flex-start;\n  gap: 0.625rem;\n  border: 0;\n  background: transparent !important;\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-history-event-icon {\n  display: inline-flex;\n  height: 1.75rem;\n  width: 1.75rem;\n  flex: 0 0 auto;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid var(--theme-border);\n  border-radius: 999px;\n  background: var(--theme-panel);\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-history-event-card {\n  min-width: 0;\n  flex: 1 1 auto;\n  overflow: hidden;\n  border: 1px solid var(--theme-border);\n  border-radius: 0.5rem;\n  background: var(--theme-panel);\n  color: var(--theme-fg);\n  box-shadow: 0 1px 2px color-mix(in oklch, var(--theme-bg) 65%, transparent);\n}\n.thread-ui-shell .thread-graph-history-event-header {\n  display: flex;\n  min-width: 0;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  padding: 0.75rem 1rem;\n}\n.thread-ui-shell .thread-graph-history-event-heading {\n  flex: 1 1 auto;\n  min-width: 0;\n}\n.thread-ui-shell .thread-graph-history-event-title {\n  flex: 0 0 auto;\n  max-width: min(14rem, 36%);\n}\n.thread-ui-shell .thread-graph-history-event-actions {\n  display: inline-flex;\n  flex: 0 0 auto;\n  align-items: center;\n  gap: 0.5rem;\n}\n.thread-ui-shell .thread-graph-history-event-body {\n  display: grid;\n  gap: 0.625rem;\n  border-top: 1px solid var(--theme-border);\n  padding: 0.75rem 1rem 1rem;\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-graph-history-event-line {\n  display: flex;\n  min-width: 0;\n  align-items: center;\n  gap: 0.5rem;\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-history-event-primary {\n  min-width: 0;\n  color: var(--theme-fg);\n  font-size: 0.875rem;\n  font-weight: 500;\n  line-height: 1.5;\n}\n.thread-ui-shell .thread-graph-history-event-secondary {\n  min-width: 0;\n  color: var(--theme-fg-muted);\n  font-size: 0.75rem;\n  line-height: 1.35;\n}\n.thread-ui-shell .thread-graph-history-event-summary {\n  display: block;\n  width: 100%;\n  min-width: 0;\n  overflow: hidden;\n  border: 1px solid var(--theme-border);\n  border-radius: 0.375rem;\n  background: var(--theme-surface-strong);\n  padding: 0.65rem 0.75rem;\n  color: var(--theme-fg-soft);\n  font-size: 0.875rem;\n  line-height: 1.5;\n  text-align: left;\n}\n.thread-ui-shell .thread-graph-history-event-summary.is-clickable {\n  transition: background 160ms ease, color 160ms ease;\n}\n.thread-ui-shell .thread-graph-history-event-summary.is-clickable:hover {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-history-event-prose {\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-graph-history-event-pre {\n  overflow-x: auto;\n  border: 1px solid var(--theme-border);\n  border-radius: 0.375rem;\n  background: var(--theme-surface-strong);\n  padding: 0.75rem;\n  color: var(--theme-fg-soft);\n  font-size: 0.8125rem;\n  line-height: 1.55;\n  white-space: pre-wrap;\n}\n.thread-ui-shell .thread-graph-history-event-action,\n.thread-ui-shell .thread-graph-history-event-pill {\n  display: inline-flex;\n  align-items: center;\n  gap: 0.375rem;\n  border: 1px solid var(--theme-border);\n  border-radius: 999px;\n  background: var(--theme-surface);\n  padding: 0.25rem 0.55rem;\n  color: var(--theme-fg-muted);\n  font-size: 0.6875rem;\n  font-weight: 500;\n  line-height: 1rem;\n  transition: background 160ms ease, color 160ms ease;\n}\n.thread-ui-shell .thread-graph-history-event-action:hover {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-history-event-path {\n  display: block;\n  max-width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  color: var(--theme-fg-muted);\n  font-size: 0.75rem;\n  line-height: 1.4;\n  text-align: left;\n}\n.thread-ui-shell .thread-graph-history-event-path:hover {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-history-event-image {\n  max-height: 24rem;\n  width: 100%;\n  object-fit: contain;\n  border: 1px solid var(--theme-border);\n  border-radius: 0.5rem;\n  background: var(--theme-surface-strong);\n}\n.thread-ui-shell .thread-graph-history-event.is-plan .thread-graph-history-event-icon {\n  color: oklch(0.58 0.12 235);\n}\n.thread-ui-shell .thread-graph-history-event.is-context .thread-graph-history-event-icon {\n  color: oklch(0.58 0.11 170);\n}\n.thread-ui-shell .thread-graph-history-event.is-image .thread-graph-history-event-icon,\n.thread-ui-shell .thread-graph-history-event.is-artifact .thread-graph-history-event-icon {\n  color: oklch(0.58 0.12 285);\n}\n.thread-ui-shell .thread-graph-history-event.is-file-change .thread-graph-history-event-icon {\n  color: oklch(0.62 0.12 145);\n}\n.thread-ui-shell .thread-graph-history-event.is-hook .thread-graph-history-event-icon {\n  color: oklch(0.61 0.12 315);\n}\n@media (max-width: 639px) {\n  .thread-ui-shell .thread-graph-history-event {\n    gap: 0.5rem;\n  }\n  .thread-ui-shell .thread-graph-history-event-icon {\n    height: 1.5rem;\n    width: 1.5rem;\n  }\n  .thread-ui-shell .thread-graph-history-event-header,\n  .thread-ui-shell .thread-graph-history-event-body {\n    padding-left: 0.75rem;\n    padding-right: 0.75rem;\n  }\n}\n.thread-ui-shell .thread-graph-history-detail-row {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-history-detail-row:hover {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-history-detail-text {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-event-file-change .thread-graph-history-event-card {\n  border-radius: 0.4375rem;\n}\n.thread-ui-shell .thread-graph-event-file-change .thread-graph-history-event-header {\n  min-height: 2.75rem;\n  padding-block: 0.5rem;\n}\n.thread-ui-shell .thread-graph-event-file-change .thread-graph-history-event-heading {\n  flex: 1 1 auto;\n  min-width: 0;\n  gap: 0.375rem;\n}\n.thread-ui-shell .thread-graph-event-file-change .thread-graph-history-event-title {\n  max-width: none;\n  font-size: 0.8125rem;\n}\n.thread-ui-shell .thread-graph-file-change-inline,\n.thread-ui-shell .thread-graph-file-change-inline-button {\n  min-width: 0;\n}\n.thread-ui-shell .thread-graph-file-change-inline {\n  max-width: 100%;\n  gap: 0.375rem;\n}\n.thread-ui-shell .thread-graph-file-change-inline-button {\n  display: block;\n  flex: 1 1 auto;\n  color: inherit;\n}\n.thread-ui-shell .thread-graph-file-change-inline-button:hover .thread-graph-history-detail-text {\n  color: var(--theme-fg);\n  text-decoration: underline;\n  text-decoration-thickness: 1px;\n  text-underline-offset: 2px;\n}\n.thread-ui-shell .thread-graph-history-detail-meta {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-history-delta-badge {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid transparent;\n  border-radius: 999px;\n  padding: 0.125rem 0.375rem;\n  font-size: 0.6875rem;\n  font-weight: 500;\n  line-height: 1rem;\n}\n.thread-ui-shell .thread-graph-history-delta-badge.is-add {\n  border-color: rgb(52 211 153 / 0.28);\n  background: rgb(52 211 153 / 0.1);\n  color: rgb(167 243 208);\n}\n.thread-ui-shell .thread-graph-history-delta-badge.is-remove {\n  border-color: rgb(251 113 133 / 0.3);\n  background: rgb(251 113 133 / 0.1);\n  color: rgb(254 205 211);\n}\n.thread-ui-shell .thread-graph-history-delta-badge.is-neutral {\n  border-color: var(--theme-border);\n  background: var(--theme-muted);\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-history-delta-badge.is-add {\n  border-color: rgb(16 185 129 / 0.25);\n  background: rgb(16 185 129 / 0.1);\n  color: rgb(4 120 87);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-history-delta-badge.is-remove {\n  border-color: rgb(244 63 94 / 0.25);\n  background: rgb(244 63 94 / 0.1);\n  color: rgb(190 18 60);\n}\n@media (max-width: 639px) {\n  .thread-ui-shell .thread-graph-history-tool-trigger {\n    padding-left: 0.75rem;\n    padding-right: 0.75rem;\n  }\n  .thread-ui-shell .thread-graph-history-tool-trigger .thread-graph-tool-badge {\n    max-width: 7.5rem;\n  }\n  .thread-ui-shell .thread-graph-history-tool-content {\n    padding-left: 0.75rem;\n    padding-right: 0.75rem;\n  }\n}\n.thread-ui-shell .xyz-viewer-plugin {\n  border-color: var(--theme-border);\n  border-radius: 0;\n  background: var(--theme-surface);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .xyz-viewer-plugin__header,\n.thread-ui-shell .xyz-viewer-plugin__toolbar,\n.thread-ui-shell .xyz-viewer-plugin__timeline,\n.thread-ui-shell .xyz-viewer-plugin__status {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .xyz-viewer-plugin__header h2 {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .xyz-viewer-plugin__header p,\n.thread-ui-shell .xyz-viewer-plugin__header span,\n.thread-ui-shell .xyz-viewer-plugin__tooltip span {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .xyz-viewer-plugin__toolbar button,\n.thread-ui-shell .xyz-viewer-plugin__timeline button {\n  border-color: var(--theme-border);\n  background: var(--theme-surface-strong);\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .xyz-viewer-plugin__toolbar button:hover,\n.thread-ui-shell .xyz-viewer-plugin__timeline button:hover {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .xyz-viewer-plugin__toolbar-divider {\n  background: var(--theme-border);\n}\n.thread-ui-shell .xyz-viewer-plugin__stage {\n  background: var(--theme-bg);\n}\n.thread-ui-shell .xyz-viewer-plugin__tooltip {\n  border-color: var(--theme-border);\n  background: color-mix(in oklch, var(--theme-panel) 96%, transparent);\n  box-shadow: var(--theme-shadow);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .xyz-viewer-plugin__empty {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .xyz-viewer-plugin__error {\n  background: color-mix(in oklch, oklch(0.62 0.16 25) 14%, var(--theme-panel));\n  color: oklch(0.78 0.12 25);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-tool-key,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-tool-key,\n.thread-ui-shell.dark .thread-graph-tool-key {\n  color: oklch(0.78 0.12 18);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-tool-string,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-tool-string,\n.thread-ui-shell.dark .thread-graph-tool-string {\n  color: oklch(0.79 0.11 155);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-tool-number,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-tool-number,\n.thread-ui-shell.dark .thread-graph-tool-number {\n  color: oklch(0.77 0.1 235);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-tool-boolean,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-tool-boolean,\n.thread-ui-shell.dark .thread-graph-tool-boolean {\n  color: oklch(0.79 0.1 302);\n}\n.thread-ui-shell .thread-timeline-surface,\n.thread-ui-shell .thread-scroll-container {\n  background: var(--theme-surface);\n  color: var(--theme-fg);\n  scrollbar-color: var(--theme-border-strong) transparent;\n}\n.thread-ui-shell .thread-scroll-container > div > .divide-y {\n  border-color: var(--theme-border);\n}\n.thread-ui-shell .timeline-item-frame {\n  border-color: var(--theme-border);\n  background: var(--theme-panel);\n  color: var(--theme-fg);\n  box-shadow: none;\n}\n.thread-ui-shell .timeline-agent {\n  border-color: transparent;\n  background: transparent;\n  box-shadow: none;\n}\n.thread-ui-shell .timeline-user {\n  border-color: transparent;\n  background: oklch(0.94 0.025 214);\n  color: oklch(0.24 0.027 255);\n}\n.thread-ui-shell.thread-ui-theme-dark .timeline-user,\n.thread-ui-shell[data-theme-effective=dark] .timeline-user,\n.thread-ui-shell.dark .timeline-user {\n  background: oklch(0.29 0.034 224);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .timeline-command,\n.thread-ui-shell .timeline-agent-tool,\n.thread-ui-shell .timeline-skill-tool,\n.thread-ui-shell .timeline-action,\n.thread-ui-shell .timeline-file-change,\n.thread-ui-shell .timeline-file-read,\n.thread-ui-shell .timeline-search,\n.thread-ui-shell .timeline-plan,\n.thread-ui-shell .timeline-reasoning,\n.thread-ui-shell .timeline-other,\n.thread-ui-shell .timeline-special-warning,\n.thread-ui-shell .timeline-special-info,\n.thread-ui-shell .timeline-special-file-read,\n.thread-ui-shell .timeline-special-success,\n.thread-ui-shell .timeline-mobile-dense-event,\n.thread-ui-shell .timeline-batch-inner,\n.thread-ui-shell .timeline-item-inner {\n  border-color: var(--theme-border);\n  background: var(--theme-panel);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .timeline-special-warning,\n.thread-ui-shell .timeline-special-info,\n.thread-ui-shell .timeline-special-file-read,\n.thread-ui-shell .timeline-special-success {\n  box-shadow: none;\n}\n.thread-ui-shell .timeline-mobile-dense-command,\n.thread-ui-shell .timeline-mobile-dense-search,\n.thread-ui-shell .timeline-mobile-dense-file-read,\n.thread-ui-shell .timeline-mobile-dense-file {\n  background: var(--theme-panel);\n}\n.thread-ui-shell :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(.border-stone-700, .border-stone-700\\/90, .border-stone-800, .border-stone-800\\/80) {\n  border-color: var(--theme-border) !important;\n}\n.thread-ui-shell :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(.bg-stone-800, .bg-stone-900, .bg-stone-900\\/60, .bg-stone-900\\/72, .bg-stone-900\\/80, .bg-stone-950, .bg-stone-950\\/35, .bg-stone-950\\/40, .bg-stone-950\\/60, .bg-stone-950\\/70, .bg-stone-950\\/90, .bg-stone-950\\/96) {\n  background: var(--theme-surface-strong) !important;\n}\n.thread-ui-shell :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(.text-stone-100, .text-stone-200, .text-stone-300, .text-sky-50, .text-sky-100, .text-emerald-50, .text-emerald-100, .text-amber-100) {\n  color: var(--theme-fg) !important;\n}\n.thread-ui-shell :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(.text-stone-400, .text-stone-500) {\n  color: var(--theme-fg-muted) !important;\n}\n.thread-ui-shell .timeline-kind-agent,\n.thread-ui-shell .timeline-kind-user,\n.thread-ui-shell .timeline-kind-command,\n.thread-ui-shell .timeline-kind-search,\n.thread-ui-shell .timeline-kind-file-read,\n.thread-ui-shell .timeline-kind-reasoning,\n.thread-ui-shell .timeline-kind-agent-tool,\n.thread-ui-shell .timeline-kind-skill-tool,\n.thread-ui-shell .timeline-kind-action,\n.thread-ui-shell .timeline-kind-plan,\n.thread-ui-shell .timeline-kind-file {\n  border-left-width: 1px;\n}\n.thread-ui-shell .timeline-primary-text,\n.thread-ui-shell .timeline-message-content,\n.thread-ui-shell .timeline-mobile-bubble-content,\n.thread-ui-shell .thread-message-prose,\n.thread-ui-shell .thread-message-prose :where(p, li, span, div, strong, em, code) {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .timeline-user .thread-message-prose,\n.thread-ui-shell .timeline-user .thread-message-prose :where(p, li, span, div, strong, em, code) {\n  color: oklch(0.24 0.027 255);\n}\n.thread-ui-shell.thread-ui-theme-dark .timeline-user .thread-message-prose,\n.thread-ui-shell[data-theme-effective=dark] .timeline-user .thread-message-prose,\n.thread-ui-shell.dark .timeline-user .thread-message-prose,\n.thread-ui-shell.thread-ui-theme-dark .timeline-user .thread-message-prose :where(p, li, span, div, strong, em, code),\n.thread-ui-shell[data-theme-effective=dark] .timeline-user .thread-message-prose :where(p, li, span, div, strong, em, code),\n.thread-ui-shell.dark .timeline-user .thread-message-prose :where(p, li, span, div, strong, em, code) {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .timeline-agent .thread-message-prose,\n.thread-ui-shell .timeline-agent .thread-message-prose :where(p, li, span, div, strong, em, code) {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-message {\n  width: 100%;\n  min-width: 0;\n}\n.thread-ui-shell .thread-graph-message-bubble {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-message-bubble.is-user {\n  width: 100%;\n  max-width: 100%;\n  border-radius: 0.75rem;\n  background: #eef5f9;\n  padding: 0.5rem 0.75rem;\n  color: rgb(15 23 42);\n}\n.thread-ui-shell .thread-graph-message-bubble.is-assistant {\n  width: 100%;\n  border: 0;\n  background: transparent;\n  padding: 0;\n  box-shadow: none;\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-message-bubble.is-user,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-message-bubble.is-user,\n.thread-ui-shell.dark .thread-graph-message-bubble.is-user {\n  background: #212b35;\n  color: rgb(241 245 249);\n}\n.thread-ui-shell .thread-graph-message-content.is-user,\n.thread-ui-shell .thread-graph-message-content.is-user .thread-message-prose,\n.thread-ui-shell .thread-graph-message-content.is-user .thread-graph-message-prose,\n.thread-ui-shell .thread-graph-message-content.is-user .thread-graph-markdown,\n.thread-ui-shell .thread-graph-message-content.is-user .thread-graph-plain-text,\n.thread-ui-shell .thread-graph-message-content.is-user .thread-message-prose :where(p, li, span, div, strong, em, code),\n.thread-ui-shell .thread-graph-message-content.is-user .thread-graph-message-prose :where(p, li, span, div, strong, em, code),\n.thread-ui-shell .thread-graph-message-content.is-user .thread-graph-markdown :where(p, li, span, div, strong, em, code) {\n  color: rgb(51 65 85);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-message-content.is-user,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-message-content.is-user,\n.thread-ui-shell.dark .thread-graph-message-content.is-user,\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-message-content.is-user .thread-message-prose,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-message-content.is-user .thread-message-prose,\n.thread-ui-shell.dark .thread-graph-message-content.is-user .thread-message-prose,\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-message-content.is-user .thread-graph-message-prose,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-message-content.is-user .thread-graph-message-prose,\n.thread-ui-shell.dark .thread-graph-message-content.is-user .thread-graph-message-prose,\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-message-content.is-user .thread-graph-markdown,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-message-content.is-user .thread-graph-markdown,\n.thread-ui-shell.dark .thread-graph-message-content.is-user .thread-graph-markdown,\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-message-content.is-user .thread-graph-plain-text,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-message-content.is-user .thread-graph-plain-text,\n.thread-ui-shell.dark .thread-graph-message-content.is-user .thread-graph-plain-text,\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-message-content.is-user .thread-message-prose :where(p, li, span, div, strong, em, code),\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-message-content.is-user .thread-message-prose :where(p, li, span, div, strong, em, code),\n.thread-ui-shell.dark .thread-graph-message-content.is-user .thread-message-prose :where(p, li, span, div, strong, em, code),\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-message-content.is-user .thread-graph-message-prose :where(p, li, span, div, strong, em, code),\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-message-content.is-user .thread-graph-message-prose :where(p, li, span, div, strong, em, code),\n.thread-ui-shell.dark .thread-graph-message-content.is-user .thread-graph-message-prose :where(p, li, span, div, strong, em, code),\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-message-content.is-user .thread-graph-markdown :where(p, li, span, div, strong, em, code),\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-message-content.is-user .thread-graph-markdown :where(p, li, span, div, strong, em, code),\n.thread-ui-shell.dark .thread-graph-message-content.is-user .thread-graph-markdown :where(p, li, span, div, strong, em, code) {\n  color: rgb(226 232 240);\n}\n.thread-ui-shell .thread-graph-message-content.is-assistant,\n.thread-ui-shell .thread-graph-message-content.is-assistant .thread-graph-message-prose,\n.thread-ui-shell .thread-graph-message-content.is-assistant .thread-graph-markdown,\n.thread-ui-shell .thread-graph-message-content.is-assistant .thread-graph-plain-text,\n.thread-ui-shell .thread-graph-message-content.is-assistant .thread-graph-message-prose :where(p, li, span, div, strong, em, code) {\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-message-prose,\n.thread-ui-shell .thread-graph-markdown,\n.thread-ui-shell .thread-graph-plain-text {\n  color: inherit;\n}\n.thread-ui-shell .thread-graph-markdown {\n  max-width: none;\n  font-size: 0.875rem;\n  line-height: 1.7;\n}\n.thread-ui-shell .thread-graph-message-markdown {\n  color: inherit;\n  word-break: break-word;\n}\n.thread-ui-shell .thread-graph-show-more {\n  min-height: 28px;\n  border: 0;\n  background: transparent;\n  font-size: 12px;\n  font-weight: 500;\n  opacity: 0.8;\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-show-more:hover,\n.thread-ui-shell .thread-graph-show-more:focus-visible {\n  opacity: 1;\n  background: transparent;\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-markdown :where(p, ul, ol, pre, blockquote, table, hr) {\n  margin-bottom: 0.75rem;\n}\n.thread-ui-shell .thread-graph-markdown :where(p:last-child, ul:last-child, ol:last-child, pre:last-child, blockquote:last-child, table:last-child, hr:last-child) {\n  margin-bottom: 0;\n}\n.thread-ui-shell .thread-graph-markdown :where(a) {\n  color: rgb(3 105 161);\n  text-decoration: underline;\n  text-underline-offset: 2px;\n}\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-markdown :where(a),\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-markdown :where(a),\n.thread-ui-shell.dark .thread-graph-markdown :where(a) {\n  color: rgb(125 211 252);\n}\n.thread-ui-shell .thread-graph-markdown :where(blockquote) {\n  border-left: 3px solid var(--theme-border-strong);\n  padding-left: 0.85rem;\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-graph-markdown :where(ul, ol) {\n  padding-left: 1.25rem;\n}\n.thread-ui-shell .thread-graph-markdown :where(li) {\n  margin-top: 0.25rem;\n}\n.thread-ui-shell .thread-graph-markdown :where(table) {\n  display: block;\n  width: 100%;\n  overflow-x: auto;\n  border-collapse: collapse;\n}\n.thread-ui-shell .thread-graph-markdown :where(th, td) {\n  border: 1px solid var(--theme-border);\n  padding: 0.4rem 0.55rem;\n  text-align: left;\n}\n.thread-ui-shell .thread-graph-markdown :where(th) {\n  background: var(--theme-surface-strong);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-code-block {\n  border-color: rgb(226 232 240);\n  background: rgb(248 250 252);\n  color: rgb(31 41 55);\n}\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-code-block,\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-code-block,\n.thread-ui-shell.dark .thread-graph-code-block {\n  border-color: #303642;\n  background: #11141a;\n  color: rgb(241 245 249);\n}\n.thread-ui-shell .thread-graph-code-block pre,\n.thread-ui-shell .thread-graph-code-block code {\n  margin: 0;\n  background: transparent;\n  color: inherit;\n}\n.thread-ui-shell .thread-graph-code-copy {\n  background: rgb(255 255 255 / 0.72);\n  color: rgb(51 65 85);\n  box-shadow: 0 4px 12px rgb(15 23 42 / 0.08);\n}\n.thread-ui-shell .thread-graph-code-copy:hover {\n  background: rgb(255 255 255);\n  color: rgb(15 23 42);\n}\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-code-copy,\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-code-copy,\n.thread-ui-shell.dark .thread-graph-code-copy {\n  background: rgb(34 39 51 / 0.82);\n  color: rgb(226 232 240);\n}\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-code-copy:hover,\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-code-copy:hover,\n.thread-ui-shell.dark .thread-graph-code-copy:hover {\n  background: #2b313d;\n  color: rgb(248 250 252);\n}\n.thread-ui-shell .thread-graph-inline-code {\n  background: rgb(241 245 249);\n  color: rgb(31 41 55);\n}\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-inline-code,\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-inline-code,\n.thread-ui-shell.dark .thread-graph-inline-code {\n  background: #222733;\n  color: rgb(241 245 249);\n}\n.thread-ui-shell .thread-graph-message-sender {\n  background: oklch(0.96 0.025 155);\n  color: oklch(0.42 0.11 155);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-message-sender,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-message-sender,\n.thread-ui-shell.dark .thread-graph-message-sender {\n  background: rgb(52 211 153 / 0.1);\n  color: rgb(110 231 183);\n}\n.thread-ui-shell .thread-graph-message-copy {\n  border-color: var(--theme-border);\n  background: var(--theme-panel);\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-thinking-toggle {\n  border-color: var(--theme-border);\n  background: var(--theme-panel);\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-message-copy:hover,\n.thread-ui-shell .thread-graph-thinking-toggle:hover,\n.thread-ui-shell .thread-graph-thinking-toggle.is-open {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-message-header-actions {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-message-time {\n  color: var(--theme-fg-muted);\n  white-space: nowrap;\n}\n.thread-ui-shell .thread-graph-relative-time {\n  border: 0;\n  background: transparent;\n  color: var(--theme-fg-muted);\n  font-size: 0.625rem;\n  font-weight: 400;\n  line-height: 1;\n  white-space: nowrap;\n}\n.thread-ui-shell .thread-graph-relative-time:hover {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-history-tool-time {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-message-status {\n  box-shadow: none;\n}\n.thread-ui-shell .thread-graph-message-status-icon {\n  align-items: center;\n  justify-content: center;\n}\n@media (max-width: 639px) {\n  .thread-ui-shell .thread-graph-message-header {\n    margin-bottom: 0.375rem;\n    flex-wrap: nowrap;\n  }\n  .thread-ui-shell .thread-graph-message-sender {\n    padding: 0.1875rem 0.5rem;\n    font-size: 0.6875rem;\n    line-height: 1rem;\n  }\n  .thread-ui-shell .thread-graph-message-header-actions {\n    gap: 0.25rem;\n  }\n  .thread-ui-shell .thread-graph-message-copy {\n    height: 1.55rem;\n    width: 1.55rem;\n    border-radius: 0.45rem;\n  }\n  .thread-ui-shell .thread-graph-message-time {\n    font-size: 0.625rem;\n  }\n  .thread-ui-shell :where(.thread-graph-message-status, .thread-graph-tool-badge) .thread-graph-status-label {\n    position: absolute;\n    width: 1px;\n    height: 1px;\n    padding: 0;\n    margin: -1px;\n    overflow: hidden;\n    clip: rect(0, 0, 0, 0);\n    white-space: nowrap;\n    border: 0;\n  }\n  .thread-ui-shell :where(.thread-graph-message-status, .thread-graph-tool-badge) {\n    min-width: 1.45rem;\n    justify-content: center;\n    padding-left: 0.25rem !important;\n    padding-right: 0.25rem !important;\n  }\n}\n@media (min-width: 640px) {\n  .thread-ui-shell .thread-graph-message-bubble.is-user {\n    padding: 0.375rem 1rem;\n  }\n}\n.thread-ui-shell .thread-graph-message-stack.is-user {\n  display: flex;\n  width: fit-content;\n  max-width: min(68rem, 72%);\n  flex-direction: column;\n  align-items: flex-end;\n}\n.thread-ui-shell .thread-graph-message-stack.is-assistant {\n  width: 100%;\n}\n.thread-ui-shell .thread-graph-message-bubble.is-user {\n  width: fit-content;\n  max-width: 100%;\n  border-radius: 1.5rem;\n  background: oklch(0.925 0.004 255);\n  padding: 0.95rem 1.35rem;\n  color: var(--theme-fg);\n  box-shadow: none;\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-message-bubble.is-user,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-message-bubble.is-user,\n.thread-ui-shell.dark .thread-graph-message-bubble.is-user {\n  background: oklch(0.265 0.005 255);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-message-bubble.is-assistant {\n  position: relative;\n  width: 100%;\n  padding: 0.3rem 0 0;\n}\n.thread-ui-shell .thread-graph-message-content.is-user,\n.thread-ui-shell .thread-graph-message-content.is-user .thread-graph-plain-text,\n.thread-ui-shell .thread-graph-message-content.is-user .thread-graph-markdown,\n.thread-ui-shell .thread-graph-message-content.is-user .thread-graph-message-prose,\n.thread-ui-shell .thread-graph-message-content.is-user .thread-graph-message-prose :where(p, li, span, div, strong, em, code) {\n  color: inherit;\n}\n.thread-ui-shell .thread-graph-message-content.is-assistant {\n  width: 100%;\n  max-width: none;\n}\n.thread-ui-shell .thread-graph-message-prose,\n.thread-ui-shell .thread-graph-markdown,\n.thread-ui-shell .thread-graph-plain-text {\n  font-size: 1rem;\n  line-height: 1.75;\n  letter-spacing: 0;\n}\n.thread-ui-shell .thread-graph-message-user-meta {\n  min-height: 1.5rem;\n  margin: 0.1rem 0.25rem 0;\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-message-assistant-actions {\n  min-height: 1.75rem;\n  margin-top: 0.15rem;\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-message-copy-desktop {\n  display: none;\n}\n.thread-ui-shell .thread-graph-message-copy-mobile {\n  display: contents;\n}\n.thread-ui-shell .thread-graph-message-leading-actions {\n  margin-bottom: 0.6rem;\n}\n.thread-ui-shell .thread-graph-message-copy {\n  height: 1.75rem;\n  width: 1.75rem;\n  border: 0;\n  border-radius: 0.4rem;\n  background: transparent;\n  color: var(--theme-fg-muted);\n  box-shadow: none;\n}\n.thread-ui-shell .thread-graph-message-copy:hover,\n.thread-ui-shell .thread-graph-message-copy:focus-visible {\n  background: var(--theme-hover);\n  color: var(--theme-fg-soft);\n  outline: none;\n}\n.thread-ui-shell .thread-graph-message-copy:focus-visible {\n  box-shadow: 0 0 0 2px var(--theme-border-contrast);\n}\n.thread-ui-shell .thread-graph-message-time {\n  font-size: 0.75rem;\n  font-variant-numeric: tabular-nums;\n  line-height: 1;\n}\n.thread-ui-shell .thread-graph-message-time-popover {\n  position: sticky;\n  top: 50%;\n  z-index: 20;\n  display: block;\n  width: max-content;\n  height: 1.75rem;\n  margin: 0 auto -1.75rem;\n  padding: 0.42rem 0.62rem;\n  transform: translateY(-0.2rem);\n  border: 1px solid var(--theme-border);\n  border-radius: 0.45rem;\n  background: var(--theme-muted);\n  box-shadow: 0 6px 18px oklch(0.12 0.004 255 / 0.24);\n  color: var(--theme-fg);\n  font-size: 0.75rem;\n  font-variant-numeric: tabular-nums;\n  font-weight: 600;\n  line-height: 1;\n  opacity: 0;\n  pointer-events: none;\n  white-space: nowrap;\n  transition: opacity 140ms cubic-bezier(0.22, 1, 0.36, 1), transform 140ms cubic-bezier(0.22, 1, 0.36, 1);\n}\n.thread-ui-shell .thread-graph-message-time-popover[data-visible=true] {\n  opacity: 1;\n  transform: translateY(0);\n}\n@media (hover: hover) and (pointer: fine) {\n  .thread-ui-shell .thread-graph-message-bubble.is-assistant:hover .thread-graph-message-time-popover,\n  .thread-ui-shell .thread-graph-message-bubble.is-assistant:focus-within .thread-graph-message-time-popover {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.thread-ui-shell .thread-graph-history-tool-accordion {\n  border: 0;\n  border-radius: 0;\n  background: transparent;\n  box-shadow: none;\n}\n.thread-ui-shell .thread-graph-history-tool-trigger {\n  min-height: 2.5rem;\n  padding: 0.45rem 0.25rem;\n  background: transparent;\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-history-tool-trigger:hover,\n.thread-ui-shell .thread-graph-history-tool-trigger:focus-visible {\n  background: transparent;\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-graph-history-tool-trigger:focus-visible {\n  outline: 1px solid var(--theme-border-contrast);\n  outline-offset: 2px;\n}\n.thread-ui-shell .thread-graph-history-tool-label {\n  color: currentColor;\n}\n.thread-ui-shell .thread-graph-history-tool-preview {\n  color: currentColor;\n  font-family:\n    -apple-system,\n    BlinkMacSystemFont,\n    "Segoe UI",\n    system-ui,\n    sans-serif;\n  font-weight: 400;\n}\n.thread-ui-shell .thread-graph-history-tool-preview-ellipsis {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-history-tool-icon {\n  height: 1.45rem;\n  width: 1.45rem;\n  border: 1px solid var(--theme-border-strong);\n  border-radius: 0.35rem;\n  color: currentColor !important;\n}\n.thread-ui-shell .thread-graph-history-tool-icon svg {\n  height: 0.85rem;\n  width: 0.85rem;\n}\n.thread-ui-shell .thread-graph-history-tool-content {\n  margin: 0.25rem 0 0 1.95rem;\n  border: 1px solid var(--theme-border);\n  border-radius: 0.5rem;\n  background: var(--theme-panel);\n  padding: 0.8rem;\n}\n.thread-ui-shell .thread-graph-history-group-command {\n  overflow: visible;\n  border: 0;\n  border-radius: 0;\n  background: transparent;\n  padding: 0.35rem 0.25rem;\n}\n.thread-ui-shell .thread-graph-history-group-command .thread-graph-history-group-card {\n  border: 0;\n  border-radius: 0;\n  background: transparent;\n  padding: 0;\n  box-shadow: none;\n}\n.thread-ui-shell .thread-graph-history-group-command .thread-graph-history-group-icon > span {\n  height: 1.45rem;\n  width: 1.45rem;\n  border-color: var(--theme-border-strong);\n  border-radius: 0.35rem;\n  background: transparent;\n  color: var(--theme-fg-muted);\n  box-shadow: none;\n}\n.thread-ui-shell .thread-graph-history-group-command .thread-graph-history-group-icon > span > span {\n  display: none;\n}\n.thread-ui-shell .thread-graph-history-group-command .thread-graph-history-group-summary {\n  flex-wrap: nowrap;\n  gap: 0.35rem;\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-history-group-verb {\n  color: var(--theme-fg-muted);\n  font-size: 0.875rem;\n  font-weight: 500;\n}\n.thread-ui-shell .thread-graph-history-group-description {\n  min-width: 0;\n  overflow: hidden;\n  color: var(--theme-fg-muted);\n  font-size: 0.875rem;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.thread-ui-shell .thread-graph-markdown .katex-display {\n  max-width: 100%;\n  margin: 0.9rem 0;\n  overflow-x: auto;\n  overflow-y: hidden;\n  padding: 0.2rem 0;\n}\n.thread-ui-shell .thread-graph-markdown .katex {\n  font-size: 1.02em;\n}\n@media (max-width: 639px) {\n  .thread-ui-shell .thread-graph-message-stack.is-user {\n    max-width: 88%;\n  }\n  .thread-ui-shell .thread-graph-message-bubble.is-user {\n    border-radius: 1.25rem;\n    padding: 0.8rem 1rem;\n  }\n  .thread-ui-shell .thread-graph-message-content.is-assistant {\n    max-width: 100%;\n  }\n  .thread-ui-shell .thread-graph-message-prose,\n  .thread-ui-shell .thread-graph-markdown,\n  .thread-ui-shell .thread-graph-plain-text {\n    font-size: 0.9375rem;\n    line-height: 1.7;\n  }\n  .thread-ui-shell .thread-graph-message-copy {\n    height: 2rem;\n    width: 2rem;\n  }\n  .thread-ui-shell .thread-graph-message-user-meta {\n    min-height: 2rem;\n    margin-top: 0.15rem;\n  }\n  .thread-ui-shell .thread-graph-message-assistant-actions {\n    min-height: 2rem;\n    margin-top: 0.15rem;\n  }\n}\n@media (min-width: 640px) {\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-graph-message-copy-mobile {\n    display: none;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-graph-message-user-meta:not(.has-persistent-meta),\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-graph-message-assistant-actions:not(.has-status) {\n    display: none;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-graph-message-bubble.is-user {\n    padding-right: 3.15rem;\n  }\n}\n.thread-ui-shell .thread-graph-turn-footer {\n  min-height: 1.75rem;\n  border: 0;\n  border-radius: 0;\n  background: transparent;\n  padding: 0.2rem 0;\n  color: var(--theme-fg-muted);\n  flex-wrap: wrap;\n}\n.thread-ui-shell .thread-graph-turn-footer-runtime {\n  color: var(--theme-fg-soft);\n  flex: 1 1 18rem;\n}\n.thread-ui-shell .thread-graph-turn-footer-meta {\n  overflow: hidden;\n  font-size: 0.6875rem;\n  text-overflow: ellipsis;\n}\n.thread-ui-shell .thread-graph-turn-footer-price {\n  color: var(--theme-fg-muted);\n}\n@media (max-width: 639px) {\n  .thread-ui-shell .thread-graph-turn-footer {\n    gap: 0.5rem;\n    min-height: 1.65rem;\n    padding: 0.15rem 0;\n  }\n  .thread-ui-shell .thread-graph-turn-footer-runtime {\n    max-width: 100%;\n    align-items: flex-start;\n  }\n  .thread-ui-shell .thread-graph-turn-footer-meta {\n    max-width: 100%;\n    margin-left: auto;\n    font-size: 0.625rem;\n  }\n}\n.thread-ui-shell .thread-graph-history-event,\n.thread-ui-shell .thread-graph-history-group {\n  min-height: 2.5rem;\n  overflow: visible;\n  border: 0 !important;\n  border-radius: 0;\n  background: transparent !important;\n  padding: 0.3rem 0.25rem;\n  color: var(--theme-fg-muted);\n  box-shadow: none;\n}\n.thread-ui-shell .thread-graph-history-event {\n  align-items: flex-start;\n  gap: 0.5rem;\n}\n.thread-ui-shell .thread-graph-history-event-icon,\n.thread-ui-shell .thread-graph-history-group-icon > span {\n  display: inline-flex;\n  height: 1.45rem !important;\n  width: 1.45rem !important;\n  flex: 0 0 auto;\n  align-items: center;\n  justify-content: center;\n  border: 1px solid var(--theme-border-strong) !important;\n  border-radius: 0.35rem !important;\n  background: transparent !important;\n  color: var(--theme-fg-muted) !important;\n  box-shadow: none !important;\n}\n.thread-ui-shell .thread-graph-history-event-icon {\n  margin-top: 0.35rem;\n}\n.thread-ui-shell .thread-graph-history-event-icon svg,\n.thread-ui-shell .thread-graph-history-group-icon svg {\n  height: 0.85rem;\n  width: 0.85rem;\n}\n.thread-ui-shell .thread-graph-history-event-card,\n.thread-ui-shell .thread-graph-history-group-card {\n  min-width: 0;\n  border: 0 !important;\n  border-radius: 0 !important;\n  background: transparent !important;\n  padding: 0 !important;\n  color: inherit;\n  box-shadow: none !important;\n}\n.thread-ui-shell .thread-graph-history-event-header {\n  min-height: 2.15rem;\n  gap: 0.5rem;\n  padding: 0.25rem 0;\n}\n.thread-ui-shell .thread-graph-event-file-change .thread-graph-history-event-header {\n  min-height: 2.15rem;\n  padding-block: 0.25rem;\n}\n.thread-ui-shell .thread-graph-history-event-heading {\n  gap: 0.4rem;\n}\n.thread-ui-shell .thread-graph-artifact-inline-toggle {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-artifact-inline-toggle:hover,\n.thread-ui-shell .thread-graph-artifact-inline-toggle:focus-visible {\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-graph-artifact-inline-toggle:focus-visible {\n  border-radius: 0.35rem;\n  outline: 1px solid var(--theme-border-contrast);\n  outline-offset: 2px;\n}\n.thread-ui-shell .thread-graph-event-artifact .thread-graph-history-event-body > .space-y-2 > button:first-child {\n  display: none;\n}\n.thread-ui-shell .thread-graph-history-event-title {\n  max-width: min(12rem, 34%);\n  color: var(--theme-fg-muted);\n  font-family:\n    -apple-system,\n    BlinkMacSystemFont,\n    "Segoe UI",\n    system-ui,\n    sans-serif;\n  font-size: 0.875rem;\n  font-weight: 500;\n}\n.thread-ui-shell .thread-graph-history-event-actions,\n.thread-ui-shell .thread-graph-history-tool-time,\n.thread-ui-shell .thread-graph-history-group-chevron {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-history-event-body {\n  gap: 0.35rem;\n  border: 0;\n  background: transparent;\n  padding: 0.15rem 0 0.35rem;\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-graph-history-event-summary,\n.thread-ui-shell .thread-graph-history-event-pre {\n  border: 0;\n  border-radius: 0;\n  background: transparent;\n  padding: 0.25rem 0;\n  box-shadow: none;\n}\n.thread-ui-shell .thread-graph-history-event-summary.is-clickable:hover,\n.thread-ui-shell .thread-graph-history-event-action:hover {\n  background: transparent;\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-history-event-action,\n.thread-ui-shell .thread-graph-history-event-pill {\n  border: 0;\n  border-radius: 0.35rem;\n  background: transparent;\n  padding: 0.2rem 0.35rem;\n}\n.thread-ui-shell .thread-graph-history-delta-badge {\n  border: 0;\n  border-radius: 0.25rem;\n  background: transparent !important;\n  padding: 0 0.2rem;\n}\n.thread-ui-shell .thread-graph-history-group > div {\n  align-items: flex-start;\n  gap: 0.5rem;\n}\n.thread-ui-shell .thread-graph-history-group-icon {\n  margin-top: 0.35rem;\n}\n.thread-ui-shell .thread-graph-history-group-icon > span > span {\n  display: none;\n}\n.thread-ui-shell .thread-graph-history-group-toggle {\n  min-height: 2.15rem;\n  gap: 0.5rem;\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-history-group-toggle:hover,\n.thread-ui-shell .thread-graph-history-group-toggle:focus-visible {\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-graph-history-group-toggle:focus-visible {\n  border-radius: 0.35rem;\n  outline: 1px solid var(--theme-border-contrast);\n  outline-offset: 2px;\n}\n.thread-ui-shell .thread-graph-history-group-summary {\n  flex-wrap: nowrap;\n  gap: 0.35rem;\n}\n.thread-ui-shell .thread-graph-history-group-list {\n  margin: 0.1rem 0 0 1.95rem;\n  border: 0;\n  padding: 0.25rem 0 0;\n}\n.thread-ui-shell .thread-graph-history-detail-row {\n  border: 0;\n  background: transparent;\n  padding: 0.4rem 0.25rem;\n}\n.thread-ui-shell .thread-graph-history-detail-row:hover {\n  background: transparent;\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-graph-history-tool {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-history-tool-icon {\n  color: var(--theme-fg-muted) !important;\n}\n@media (max-width: 639px) {\n  .thread-ui-shell .thread-graph-history-event,\n  .thread-ui-shell .thread-graph-history-group {\n    min-height: 2.35rem;\n    padding: 0.25rem 0;\n  }\n  .thread-ui-shell .thread-graph-history-event-title {\n    max-width: 7rem;\n    font-size: 0.8125rem;\n  }\n  .thread-ui-shell .thread-graph-history-event-body {\n    padding: 0.1rem 0 0.25rem;\n  }\n  .thread-ui-shell .thread-graph-history-group-list {\n    margin-left: 1.65rem;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  .thread-ui-shell .thread-graph-message-time-popover {\n    transition: none;\n  }\n}\n.thread-ui-shell .thread-graph-message-time-row {\n  margin: 0;\n  line-height: 10px;\n}\n.thread-ui-shell .thread-graph-message-time-row.is-user {\n  text-align: right;\n}\n.thread-ui-shell .thread-graph-message-time-row .thread-graph-message-time {\n  font-size: 10px;\n  line-height: 10px;\n  color: var(--theme-fg-muted);\n  opacity: .65;\n}\n.thread-ui-shell .thread-graph-message-bubble .thread-graph-message-copy-desktop {\n  display: flex;\n  position: absolute;\n  left: auto;\n  right: 0;\n  bottom: 0;\n  z-index: 10;\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 140ms ease;\n}\n.thread-ui-shell .thread-graph-code-copy {\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 140ms ease;\n}\n.thread-ui-shell .thread-graph-message-bubble[data-touch-actions=true] .thread-graph-message-copy-desktop,\n.thread-ui-shell .thread-graph-code-block[data-touch-actions=true] .thread-graph-code-copy {\n  opacity: .6;\n  pointer-events: auto;\n}\n@media (hover: hover) and (pointer: fine) {\n  .thread-ui-shell .thread-graph-message-bubble:hover .thread-graph-message-copy-desktop,\n  .thread-ui-shell .thread-graph-message-bubble:focus-within .thread-graph-message-copy-desktop,\n  .thread-ui-shell .thread-graph-code-block:hover .thread-graph-code-copy,\n  .thread-ui-shell .thread-graph-code-block:focus-within .thread-graph-code-copy {\n    opacity: .6;\n    pointer-events: auto;\n  }\n}\n.thread-ui-shell .thread-graph-message-time-row + .thread-graph-message-bubble.is-assistant {\n  padding-top: 0;\n}\n.thread-workspace-link-menu {\n  position: fixed;\n  z-index: 120;\n  min-width: 180px;\n  padding: 4px;\n  border: 1px solid #49473e;\n  border-radius: 9px;\n  background: #25241e;\n  color: #e9e7df;\n  box-shadow: 0 8px 24px #0005;\n  font-size: 13px;\n}\n.thread-workspace-link-menu button {\n  display: block;\n  width: 100%;\n  border-radius: 5px;\n  padding: 7px 10px;\n  text-align: left;\n}\n.thread-workspace-link-menu button:hover,\n.thread-workspace-link-menu button:focus-visible {\n  background: #3b392e;\n  outline: none;\n}\nhtml[data-theme-effective=light] .thread-workspace-link-menu {\n  background: #f3f5f5;\n  color: #24292c;\n  border-color: #c8cecd;\n}\nhtml[data-theme-effective=light] .thread-workspace-link-menu button:hover,\nhtml[data-theme-effective=light] .thread-workspace-link-menu button:focus-visible {\n  background: #e0e6e5;\n}\n@keyframes thread-operation-sheen {\n  from {\n    background-position: 150% 0;\n  }\n  to {\n    background-position: -150% 0;\n  }\n}\n.is-running-batch .thread-graph-history-group-verb,\n.is-running-batch .thread-graph-history-group-description {\n  background-image:\n    linear-gradient(\n      105deg,\n      var(--theme-fg-muted) 35%,\n      var(--theme-fg) 50%,\n      var(--theme-fg-muted) 65%);\n  background-size: 250% 100%;\n  background-clip: text;\n  -webkit-background-clip: text;\n  color: transparent;\n  animation: thread-operation-sheen 2.4s linear infinite;\n}\n@media (prefers-reduced-motion: reduce) {\n  .is-running-batch .thread-graph-history-group-verb,\n  .is-running-batch .thread-graph-history-group-description {\n    animation: none;\n    color: var(--theme-fg);\n    background: none;\n  }\n}\n');

// src/styles/composer-plan.css
styleInject(".thread-ui-shell .timeline-soft-text,\n.thread-ui-shell .thread-message-prose :where(blockquote) {\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .timeline-meta-text,\n.thread-ui-shell .thread-message-prose :where(figcaption) {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .timeline-overlay-badge,\n.thread-ui-shell .ui-status-neutral,\n.thread-ui-shell .ui-status-info,\n.thread-ui-shell .ui-status-warning,\n.thread-ui-shell .ui-status-success,\n.thread-ui-shell .ui-status-danger {\n  border-color: transparent;\n  box-shadow: none;\n}\n.thread-ui-shell .timeline-command-status-complete,\n.thread-ui-shell .timeline-command-status-pending,\n.thread-ui-shell .timeline-delta-badge,\n.thread-ui-shell .timeline-live-plan-step {\n  border-color: var(--theme-border);\n  background: var(--theme-muted);\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .ui-status-neutral {\n  background: var(--theme-muted);\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell.thread-ui-theme-dark .ui-status-neutral,\n.thread-ui-shell[data-theme-effective=dark] .ui-status-neutral,\n.thread-ui-shell.dark .ui-status-neutral {\n  border-color: #303642;\n  background: #151923;\n  color: rgb(203 213 225);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-room-card.is-active .ui-status-neutral,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-room-card.is-active .ui-status-neutral,\n.thread-ui-shell.dark .thread-graph-room-card.is-active .ui-status-neutral {\n  border-color: #424b5e;\n  background: #1a1f2a;\n  color: rgb(203 213 225);\n}\n.thread-ui-shell .ui-status-info {\n  background: oklch(0.94 0.03 235);\n  color: oklch(0.43 0.09 242);\n}\n.thread-ui-shell .ui-status-warning {\n  background: oklch(0.94 0.048 84);\n  color: oklch(0.46 0.08 75);\n}\n.thread-ui-shell .ui-status-success {\n  background: oklch(0.94 0.052 155);\n  color: oklch(0.43 0.095 155);\n}\n.thread-ui-shell .ui-status-danger {\n  background: oklch(0.94 0.04 25);\n  color: oklch(0.48 0.125 24);\n}\n.thread-ui-shell.thread-ui-theme-dark .ui-status-info,\n.thread-ui-shell[data-theme-effective=dark] .ui-status-info,\n.thread-ui-shell.dark .ui-status-info {\n  background: oklch(0.3 0.042 235);\n  color: oklch(0.77 0.1 235);\n}\n.thread-ui-shell.thread-ui-theme-dark .ui-status-warning,\n.thread-ui-shell[data-theme-effective=dark] .ui-status-warning,\n.thread-ui-shell.dark .ui-status-warning {\n  background: oklch(0.31 0.045 75);\n  color: oklch(0.83 0.11 80);\n}\n.thread-ui-shell.thread-ui-theme-dark .ui-status-success,\n.thread-ui-shell[data-theme-effective=dark] .ui-status-success,\n.thread-ui-shell.dark .ui-status-success {\n  background: oklch(0.31 0.05 155);\n  color: oklch(0.8 0.115 155);\n}\n.thread-ui-shell.thread-ui-theme-dark .ui-status-danger,\n.thread-ui-shell[data-theme-effective=dark] .ui-status-danger,\n.thread-ui-shell.dark .ui-status-danger {\n  background: oklch(0.31 0.052 25);\n  color: oklch(0.78 0.12 25);\n}\n.thread-ui-shell .thread-message-icon-user,\n.thread-ui-shell .thread-message-icon-agent {\n  border-color: transparent;\n  background: var(--theme-muted);\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-graph-thinking-trigger {\n  display: inline-flex;\n  align-items: center;\n  color: rgb(148 163 184);\n}\n.thread-ui-shell .thread-graph-thinking-trigger:hover,\n.thread-ui-shell .thread-graph-thinking-trigger[data-state=open] {\n  color: rgb(125 211 252);\n}\n.thread-ui-shell .thread-graph-thinking-label {\n  min-width: 0;\n}\n.thread-ui-shell .thread-graph-thinking-body {\n  border-color: rgb(42 47 58);\n  background: #1b1f29;\n  color: rgb(203 213 225);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-thinking-trigger {\n  color: rgb(100 116 139);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-thinking-trigger:hover,\n.thread-ui-shell[data-theme-effective=light] .thread-graph-thinking-trigger[data-state=open] {\n  color: rgb(3 105 161);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-thinking-body {\n  border-color: rgb(226 232 240);\n  background: rgb(248 250 252);\n  color: rgb(51 65 85);\n}\n.thread-ui-shell .timeline-corner-copy-visual {\n  border-color: var(--theme-border);\n  background: color-mix(in oklch, var(--theme-panel) 88%, transparent);\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-composer-form {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n}\n.thread-ui-shell .thread-composer-toolbar,\n.thread-ui-shell .thread-composer-input,\n.thread-ui-shell .thread-composer-menu {\n  border-color: var(--theme-border);\n  background: var(--theme-panel);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-composer-toolbar {\n  border-radius: 0;\n  border: 0;\n  background: transparent;\n  box-shadow: none;\n  order: 2;\n  min-height: 2.75rem;\n  padding: 0.25rem 0.75rem 0.65rem;\n  flex-wrap: wrap;\n  align-items: center;\n}\n.thread-ui-shell .thread-composer-prompt-region {\n  order: 1;\n}\n.thread-ui-shell .thread-composer-input {\n  position: relative;\n  min-height: 5.25rem !important;\n  max-height: 12rem !important;\n  border: 0;\n  border-radius: 0;\n  background: transparent !important;\n  box-shadow: none;\n  overflow: visible;\n  padding-top: 0.7rem;\n  padding-bottom: 0.45rem;\n}\n.thread-ui-shell .thread-composer-input:focus-within {\n  border-color: transparent;\n  box-shadow: none;\n}\n.thread-ui-shell .thread-composer-input [contenteditable],\n.thread-ui-shell .thread-composer-input textarea {\n  display: block;\n  width: 100%;\n  min-width: 0;\n  background: transparent !important;\n  color: var(--theme-fg);\n  font-size: 1rem;\n  line-height: 1.55;\n}\n.thread-ui-shell .thread-composer-input [contenteditable] {\n  min-height: 4.15rem !important;\n  max-height: 9.5rem !important;\n  overflow-y: auto;\n}\n.thread-ui-shell .thread-composer-input textarea {\n  min-height: 4.15rem !important;\n  max-height: 9.5rem !important;\n  overflow-y: auto;\n  resize: none;\n}\n.thread-ui-shell .thread-composer-shell {\n  border: 1px solid var(--theme-border);\n  background: #fbfcfd;\n  box-shadow: 0 4px 18px oklch(0.22 0.024 255 / 0.04);\n}\n.thread-ui-shell .thread-composer-send-button {\n  flex: 0 0 auto;\n}\n.thread-ui-shell .thread-goal-compose-card {\n  border-color: color-mix(in oklch, var(--theme-accent-solid) 18%, var(--theme-border));\n  background: color-mix(in oklch, var(--theme-accent-solid) 7%, var(--theme-panel));\n  color: var(--theme-fg-soft);\n  box-shadow: 0 8px 18px rgb(15 23 42 / 0.05);\n}\n.thread-ui-shell .thread-goal-compose-label {\n  color: color-mix(in oklch, var(--theme-accent-solid) 68%, var(--theme-fg));\n}\n.thread-ui-shell .thread-goal-compose-field {\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-goal-compose-input {\n  border-color: color-mix(in oklch, var(--theme-accent-solid) 20%, var(--theme-border));\n  background: var(--theme-panel);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-goal-compose-input::placeholder {\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .thread-goal-compose-input:focus {\n  border-color: color-mix(in oklch, var(--theme-accent-solid) 48%, var(--theme-border));\n}\n.thread-ui-shell .thread-goal-compose-cancel {\n  border-color: var(--theme-border);\n  background: var(--theme-surface-strong);\n  color: var(--theme-fg-soft);\n}\n.thread-ui-shell .thread-goal-compose-cancel:hover {\n  background: var(--theme-hover);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .thread-goal-compose-error {\n  color: rgb(190 18 60);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-goal-compose-card,\n.thread-ui-shell[data-theme-effective=dark] .thread-goal-compose-card,\n.thread-ui-shell.dark .thread-goal-compose-card {\n  border-color: rgb(125 211 252 / 0.25);\n  background: rgb(125 211 252 / 0.07);\n  color: rgb(226 232 240);\n  box-shadow: 0 8px 18px rgb(0 0 0 / 0.18);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-goal-compose-label,\n.thread-ui-shell[data-theme-effective=dark] .thread-goal-compose-label,\n.thread-ui-shell.dark .thread-goal-compose-label {\n  color: rgb(224 242 254 / 0.9);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-goal-compose-field,\n.thread-ui-shell[data-theme-effective=dark] .thread-goal-compose-field,\n.thread-ui-shell.dark .thread-goal-compose-field {\n  color: rgb(203 213 225);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-goal-compose-input,\n.thread-ui-shell[data-theme-effective=dark] .thread-goal-compose-input,\n.thread-ui-shell.dark .thread-goal-compose-input {\n  border-color: rgb(125 211 252 / 0.25);\n  background: rgb(2 6 23 / 0.46);\n  color: rgb(241 245 249);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-goal-compose-cancel,\n.thread-ui-shell[data-theme-effective=dark] .thread-goal-compose-cancel,\n.thread-ui-shell.dark .thread-goal-compose-cancel {\n  border-color: #343b48;\n  background: #1d222c;\n  color: rgb(203 213 225);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-goal-compose-cancel:hover,\n.thread-ui-shell[data-theme-effective=dark] .thread-goal-compose-cancel:hover,\n.thread-ui-shell.dark .thread-goal-compose-cancel:hover {\n  background: #222733;\n  color: rgb(241 245 249);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-goal-compose-error,\n.thread-ui-shell[data-theme-effective=dark] .thread-goal-compose-error,\n.thread-ui-shell.dark .thread-goal-compose-error {\n  color: rgb(254 205 211);\n}\n@media (min-width: 640px) {\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-composer-shell {\n    border-radius: 16px;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-composer-input {\n    min-height: 5.75rem !important;\n    max-height: 12.5rem !important;\n    padding-top: 0.9rem;\n  }\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-composer-input [contenteditable],\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-composer-input textarea {\n    min-height: 4.5rem !important;\n    max-height: 10rem !important;\n    font-size: 0.875rem;\n  }\n}\n.thread-ui-shell:not([data-thread-layout=mobile]) .thread-composer-form {\n  padding: 0.5rem 1rem 0.75rem;\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-composer-shell,\n.thread-ui-shell[data-theme-effective=dark] .thread-composer-shell,\n.thread-ui-shell.dark .thread-composer-shell {\n  border-color: #303642;\n  background: #181b23;\n  box-shadow: 0 8px 24px oklch(0 0 0 / 0.22);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-composer-toolbar,\n.thread-ui-shell[data-theme-effective=dark] .thread-composer-toolbar,\n.thread-ui-shell.dark .thread-composer-toolbar,\n.thread-ui-shell.thread-ui-theme-dark .thread-composer-input,\n.thread-ui-shell[data-theme-effective=dark] .thread-composer-input,\n.thread-ui-shell.dark .thread-composer-input {\n  border-color: #303642 !important;\n  background: transparent !important;\n  color: rgb(241 245 249) !important;\n  box-shadow: none !important;\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-composer-input [contenteditable],\n.thread-ui-shell[data-theme-effective=dark] .thread-composer-input [contenteditable],\n.thread-ui-shell.dark .thread-composer-input [contenteditable],\n.thread-ui-shell.thread-ui-theme-dark .thread-composer-input textarea,\n.thread-ui-shell[data-theme-effective=dark] .thread-composer-input textarea,\n.thread-ui-shell.dark .thread-composer-input textarea {\n  background: transparent !important;\n  color: rgb(241 245 249) !important;\n}\n.thread-ui-shell .thread-graph-composer-form {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-composer-form,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-composer-form,\n.thread-ui-shell.dark .thread-graph-composer-form {\n  border-color: var(--theme-border);\n  background: var(--theme-surface);\n}\n.thread-ui-shell .thread-graph-composer-shell {\n  border: 1px solid var(--theme-border);\n  background: var(--theme-panel);\n  box-shadow: 0 4px 18px oklch(0.22 0.024 255 / 0.04);\n  overflow: visible !important;\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-composer-shell,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-composer-shell,\n.thread-ui-shell.dark .thread-graph-composer-shell {\n  border-color: var(--theme-border-strong);\n  background: var(--theme-panel);\n  box-shadow: 0 8px 24px oklch(0 0 0 / 0.22);\n}\n.thread-ui-shell .thread-graph-composer-input-group {\n  order: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  height: auto;\n  min-height: 0;\n  color: rgb(30 41 59);\n  overflow: visible !important;\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-composer-input-group,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-composer-input-group,\n.thread-ui-shell.dark .thread-graph-composer-input-group {\n  color: rgb(241 245 249);\n}\n.thread-ui-shell .thread-graph-composer-prompt-region {\n  order: 1;\n}\n.thread-ui-shell .thread-graph-composer-input {\n  position: relative;\n  border: 0;\n  background: transparent;\n  color: rgb(30 41 59);\n  box-shadow: none;\n  overflow-y: auto;\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-composer-input,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-composer-input,\n.thread-ui-shell.dark .thread-graph-composer-input {\n  color: rgb(241 245 249);\n}\n.thread-ui-shell .thread-graph-composer-input [contenteditable] {\n  display: block;\n  width: 100%;\n  min-width: 0;\n  overflow-y: auto;\n  background: transparent;\n  color: inherit;\n}\n.thread-ui-shell .thread-graph-composer-input .thread-composer-attachment-chip,\n.thread-ui-shell .thread-composer-input .thread-composer-attachment-chip {\n  box-sizing: border-box;\n  flex: 0 0 auto;\n  width: max-content !important;\n  max-width: min(100%, 7.25rem) !important;\n  vertical-align: middle;\n}\n.thread-ui-shell .thread-graph-composer-input .thread-composer-attachment-chip-photo,\n.thread-ui-shell .thread-composer-input .thread-composer-attachment-chip-photo {\n  display: inline-flex !important;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 0.25rem;\n  padding: 0.35rem !important;\n}\n.thread-ui-shell .thread-graph-composer-input .thread-composer-attachment-thumb,\n.thread-ui-shell .thread-composer-input .thread-composer-attachment-thumb {\n  display: block;\n  width: 5.75rem !important;\n  height: 3.75rem !important;\n  max-width: 100%;\n  border-radius: 0.6rem !important;\n  object-fit: cover;\n}\n.thread-ui-shell .thread-graph-composer-input .thread-composer-attachment-caption,\n.thread-ui-shell .thread-composer-input .thread-composer-attachment-caption {\n  display: block !important;\n  width: 100%;\n  max-width: 5.75rem !important;\n  margin-left: 0 !important;\n  overflow: hidden;\n  color: rgb(3 105 161);\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-composer-input .thread-composer-attachment-caption,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-composer-input .thread-composer-attachment-caption,\n:root[data-theme-effective=dark] .thread-ui-shell .thread-graph-composer-input .thread-composer-attachment-caption,\n.thread-ui-shell.dark .thread-graph-composer-input .thread-composer-attachment-caption,\n.thread-ui-shell.thread-ui-theme-dark .thread-composer-input .thread-composer-attachment-caption,\n.thread-ui-shell[data-theme-effective=dark] .thread-composer-input .thread-composer-attachment-caption,\n:root[data-theme-effective=dark] .thread-ui-shell .thread-composer-input .thread-composer-attachment-caption,\n.thread-ui-shell.dark .thread-composer-input .thread-composer-attachment-caption {\n  color: rgb(125 211 252);\n}\n.thread-ui-shell .thread-graph-composer-toolbar {\n  order: 2;\n  width: 100%;\n  min-height: 2.75rem;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n  gap: 0.5rem;\n  border: 0;\n  background: transparent;\n  padding: 0 0.5rem 0.5rem;\n  color: rgb(100 116 139);\n  box-shadow: none;\n  overflow: visible !important;\n}\n@media (min-width: 640px) {\n  .thread-ui-shell:not([data-thread-layout=mobile]) .thread-graph-composer-toolbar {\n    flex-wrap: nowrap;\n    padding: 0 0.75rem 0.75rem;\n  }\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-composer-toolbar,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-composer-toolbar,\n.thread-ui-shell.dark .thread-graph-composer-toolbar {\n  color: rgb(148 163 184);\n}\n.thread-ui-shell .thread-graph-composer-send-button {\n  flex: 0 0 auto;\n}\n.thread-ui-shell .thread-graph-composer-stop-button {\n  border-color: rgb(244 63 94 / 0.28) !important;\n  box-shadow: 0 8px 18px rgb(15 23 42 / 0.14);\n}\n.thread-ui-shell .thread-graph-composer-prompt-region .thread-graph-composer-stop-button {\n  position: absolute;\n}\n@media (max-width: 639px) {\n  .thread-ui-shell .thread-graph-composer-form {\n    padding: 0.35rem 0.55rem calc(env(safe-area-inset-bottom) + 0.35rem) !important;\n  }\n  .thread-ui-shell .thread-graph-composer-shell {\n    border-radius: 14px !important;\n  }\n  .thread-ui-shell .thread-graph-composer-input {\n    min-height: 3.65rem !important;\n    max-height: 7.5rem !important;\n    padding: 0.65rem 0.75rem 0.2rem !important;\n  }\n  .thread-ui-shell .thread-graph-composer-input [contenteditable] {\n    min-height: 3rem !important;\n    padding-right: 2.5rem;\n  }\n  .thread-ui-shell .thread-graph-composer-toolbar {\n    min-height: 2.35rem;\n    gap: 0.3rem;\n    padding: 0 0.45rem 0.45rem;\n  }\n  .thread-ui-shell .thread-graph-composer-toolbar > .flex {\n    min-width: 0;\n    gap: 0.3rem;\n  }\n  .thread-ui-shell .thread-graph-composer-icon-button,\n  .thread-ui-shell .thread-graph-composer-send-button {\n    width: 1.95rem !important;\n    height: 1.95rem !important;\n  }\n  .thread-ui-shell .thread-graph-composer-inline-toggle {\n    height: 1.95rem;\n    max-width: 6.75rem !important;\n    padding-left: 0.5rem !important;\n    padding-right: 0.5rem !important;\n    font-size: 0.6875rem;\n  }\n  .thread-ui-shell .thread-graph-composer-stop-button {\n    top: 0.45rem !important;\n    right: 0.45rem !important;\n    width: 1.8rem !important;\n    height: 1.8rem !important;\n  }\n}\n.thread-ui-shell .thread-composer-icon-button,\n.thread-ui-shell .thread-composer-inline-toggle,\n.thread-ui-shell .thread-composer-chip-button,\n.thread-ui-shell .thread-composer-menu-item,\n.thread-ui-shell .thread-composer-panel-button,\n.thread-ui-shell .thread-graph-composer-icon-button,\n.thread-ui-shell .thread-graph-composer-inline-toggle,\n.thread-ui-shell .thread-graph-composer-chip-button,\n.thread-ui-shell .thread-graph-composer-menu-item,\n.thread-ui-shell .thread-graph-composer-panel-button {\n  border-color: var(--theme-border) !important;\n  background: transparent !important;\n  color: var(--theme-fg-soft) !important;\n}\n.thread-ui-shell .thread-composer-icon-button:hover,\n.thread-ui-shell .thread-composer-inline-toggle:hover,\n.thread-ui-shell .thread-composer-chip-button:hover,\n.thread-ui-shell .thread-composer-menu-item:hover,\n.thread-ui-shell .thread-composer-panel-button:hover,\n.thread-ui-shell .thread-graph-composer-icon-button:hover,\n.thread-ui-shell .thread-graph-composer-inline-toggle:hover,\n.thread-ui-shell .thread-graph-composer-chip-button:hover,\n.thread-ui-shell .thread-graph-composer-menu-item:hover,\n.thread-ui-shell .thread-graph-composer-panel-button:hover {\n  background: var(--theme-hover) !important;\n  color: var(--theme-fg) !important;\n}\n.thread-ui-shell .thread-composer-icon-button,\n.thread-ui-shell .thread-graph-composer-icon-button {\n  background: var(--theme-muted) !important;\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-composer-icon-button,\n.thread-ui-shell[data-theme-effective=dark] .thread-composer-icon-button,\n.thread-ui-shell.dark .thread-composer-icon-button,\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-composer-icon-button,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-composer-icon-button,\n.thread-ui-shell.dark .thread-graph-composer-icon-button {\n  border-color: #303642 !important;\n  background: #222733 !important;\n  color: rgb(203 213 225) !important;\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-composer-icon-button:hover,\n.thread-ui-shell[data-theme-effective=dark] .thread-composer-icon-button:hover,\n.thread-ui-shell.dark .thread-composer-icon-button:hover,\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-composer-icon-button:hover,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-composer-icon-button:hover,\n.thread-ui-shell.dark .thread-graph-composer-icon-button:hover {\n  background: #2b313d !important;\n  color: rgb(241 245 249) !important;\n}\n.thread-ui-shell .thread-composer-menu,\n.thread-ui-shell .thread-graph-composer-menu {\n  border-radius: 12px;\n  border-color: var(--theme-border) !important;\n  background: color-mix(in srgb, var(--theme-panel) 88%, transparent) !important;\n  color: var(--theme-fg) !important;\n  box-shadow: 0 16px 38px oklch(0.22 0.024 255 / 0.16);\n  z-index: 80;\n}\n.thread-ui-shell [data-composer-menu-surface=true] {\n  border-color: var(--theme-border) !important;\n  background: color-mix(in srgb, var(--theme-panel) 88%, transparent) !important;\n  color: var(--theme-fg) !important;\n  box-shadow: 0 16px 38px oklch(0.22 0.024 255 / 0.16) !important;\n}\n.thread-ui-shell .thread-graph-composer-menu {\n  max-height: min(27rem, calc(100svh - 8rem));\n  overflow: auto !important;\n}\n.thread-ui-shell .thread-composer-menu-surface {\n  position: fixed;\n  inset: auto;\n  margin: 0;\n  min-width: 0;\n  box-sizing: border-box;\n  overflow: auto;\n  overscroll-behavior: contain;\n  z-index: 100;\n}\n.thread-composer-menu-surface::backdrop {\n  background: transparent;\n  pointer-events: none;\n}\n.thread-ui-shell :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(input, textarea, select) {\n  border-color: var(--theme-border) !important;\n  background: var(--theme-panel) !important;\n  color: var(--theme-fg) !important;\n}\n.thread-ui-shell :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(input, textarea)::placeholder {\n  color: var(--theme-fg-muted) !important;\n}\n.thread-ui-shell :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(input, textarea, select):focus {\n  border-color: color-mix(in oklch, var(--theme-accent-solid) 38%, var(--theme-border)) !important;\n}\n.thread-ui-shell :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(.border-sky-300\\/35, .border-emerald-400\\/45) {\n  border-color: color-mix(in oklch, var(--theme-accent-solid) 24%, var(--theme-border)) !important;\n}\n.thread-ui-shell :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(.bg-sky-300\\/10, .bg-sky-300\\/12, .bg-emerald-400\\/12) {\n  background: color-mix(in oklch, var(--theme-accent-solid) 8%, var(--theme-panel)) !important;\n}\n.thread-ui-shell :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(.text-rose-100\\/90, .text-rose-200) {\n  color: rgb(190 18 60) !important;\n}\n.thread-ui-shell :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(.text-amber-100\\/85, .text-amber-100\\/60) {\n  color: rgb(146 64 14) !important;\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-composer-menu,\n.thread-ui-shell[data-theme-effective=dark] .thread-composer-menu,\n:root[data-theme-effective=dark] .thread-ui-shell .thread-composer-menu,\n.thread-ui-shell.dark .thread-composer-menu,\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-composer-menu,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-composer-menu,\n:root[data-theme-effective=dark] .thread-ui-shell .thread-graph-composer-menu,\n.thread-ui-shell.dark .thread-graph-composer-menu,\n.thread-ui-shell.thread-ui-theme-dark [data-composer-menu-surface=true],\n.thread-ui-shell[data-theme-effective=dark] [data-composer-menu-surface=true],\n:root[data-theme-effective=dark] .thread-ui-shell [data-composer-menu-surface=true],\n.thread-ui-shell.dark [data-composer-menu-surface=true] {\n  border-color: color-mix(in srgb, var(--theme-border) 80%, transparent) !important;\n  background: color-mix(in srgb, var(--theme-panel) 88%, transparent) !important;\n  color: rgb(241 245 249) !important;\n  box-shadow: 0 18px 48px rgb(0 0 0 / 0.28) !important;\n}\n.thread-ui-shell.thread-ui-theme-dark :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(input, textarea, select),\n.thread-ui-shell[data-theme-effective=dark] :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(input, textarea, select),\n:root[data-theme-effective=dark] .thread-ui-shell :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(input, textarea, select),\n.thread-ui-shell.dark :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(input, textarea, select) {\n  border-color: #303642 !important;\n  background: #11141a !important;\n  color: rgb(241 245 249) !important;\n}\n.thread-ui-shell.thread-ui-theme-dark :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(.text-rose-100\\/90, .text-rose-200),\n.thread-ui-shell[data-theme-effective=dark] :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(.text-rose-100\\/90, .text-rose-200),\n:root[data-theme-effective=dark] .thread-ui-shell :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(.text-rose-100\\/90, .text-rose-200),\n.thread-ui-shell.dark :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(.text-rose-100\\/90, .text-rose-200) {\n  color: rgb(254 205 211) !important;\n}\n.thread-ui-shell.thread-ui-theme-dark :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(.text-amber-100\\/85, .text-amber-100\\/60),\n.thread-ui-shell[data-theme-effective=dark] :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(.text-amber-100\\/85, .text-amber-100\\/60),\n:root[data-theme-effective=dark] .thread-ui-shell :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(.text-amber-100\\/85, .text-amber-100\\/60),\n.thread-ui-shell.dark :where(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) :where(.text-amber-100\\/85, .text-amber-100\\/60) {\n  color: rgb(253 230 138) !important;\n}\n.thread-ui-shell .thread-composer-plan-toggle-active,\n.thread-ui-shell .thread-graph-composer-plan-toggle-active {\n  border-color: oklch(0.76 0.17 88 / 0.72) !important;\n  background:\n    linear-gradient(\n      135deg,\n      oklch(0.78 0.16 86 / 0.26),\n      oklch(0.64 0.12 190 / 0.2)),\n    var(--theme-accent-soft) !important;\n  color: oklch(0.92 0.09 92) !important;\n  box-shadow:\n    0 0 0 1px oklch(0.78 0.16 86 / 0.22),\n    0 0 18px oklch(0.78 0.16 86 / 0.28),\n    inset 0 0 0 1px oklch(0.95 0.04 90 / 0.16) !important;\n}\n.thread-ui-shell .thread-jump-latest-badge {\n  border-color: var(--theme-border);\n  background: var(--theme-panel);\n  color: var(--theme-fg-muted);\n}\n.thread-ui-shell .ui-action-primary {\n  background: var(--theme-accent-solid);\n  color: var(--theme-accent-solid-fg);\n}\n.thread-ui-shell .ui-action-primary:hover {\n  background: var(--theme-accent-solid-hover);\n}\n.thread-ui-shell .ui-action-info {\n  background: oklch(0.46 0.1 235);\n  color: oklch(0.98 0.005 235);\n}\n.thread-ui-shell .ui-action-danger {\n  background: oklch(0.56 0.16 25);\n  color: oklch(0.98 0.005 25);\n}\n.thread-ui-shell .thread-composer-send-button.ui-action-danger,\n.thread-ui-shell .thread-graph-composer-send-button.ui-action-danger {\n  border: 1px solid var(--theme-border) !important;\n  background: var(--theme-muted) !important;\n  color: var(--theme-fg-soft) !important;\n}\n.thread-ui-shell.thread-ui-theme-dark .thread-composer-send-button.ui-action-danger,\n.thread-ui-shell[data-theme-effective=dark] .thread-composer-send-button.ui-action-danger,\n.thread-ui-shell.dark .thread-composer-send-button.ui-action-danger,\n.thread-ui-shell.thread-ui-theme-dark .thread-graph-composer-send-button.ui-action-danger,\n.thread-ui-shell[data-theme-effective=dark] .thread-graph-composer-send-button.ui-action-danger,\n.thread-ui-shell.dark .thread-graph-composer-send-button.ui-action-danger {\n  border-color: #303642 !important;\n  background: #222733 !important;\n  color: rgb(241 245 249) !important;\n}\n.thread-ui-shell .thread-composer-send-button.ui-action-danger:hover,\n.thread-ui-shell .thread-graph-composer-send-button.ui-action-danger:hover {\n  background: var(--theme-hover) !important;\n  color: var(--theme-fg) !important;\n}\n.thread-ui-shell .thread-empty-surface,\n.thread-ui-shell .timeline-pending-card,\n.thread-ui-shell .timeline-note-card,\n.thread-ui-shell .timeline-activity-card,\n.thread-ui-shell .timeline-live-plan-card,\n.thread-ui-shell .timeline-question-section,\n.thread-ui-shell .timeline-live-plan-step,\n.thread-ui-shell .timeline-detail-row {\n  border-color: var(--theme-border);\n  background: var(--theme-panel);\n  color: var(--theme-fg);\n}\n.thread-ui-shell .prose,\n.thread-ui-shell .prose :where(p, li, strong, code, pre, blockquote) {\n  color: inherit;\n}\n.thread-ui-shell .prose img {\n  max-width: min(28rem, 100%);\n  height: auto;\n  border-radius: 10px;\n  border: 1px solid var(--theme-border);\n  box-shadow: 0 12px 35px oklch(0.22 0.024 255 / 0.14);\n  margin-top: 0.75rem;\n  margin-bottom: 0.75rem;\n}\n.thread-ui-shell .thread-graph-plan-card {\n  border-color: rgb(42 47 58);\n  background: #1b1f29;\n  color: rgb(241 245 249);\n  box-shadow: none;\n}\n.thread-ui-shell .thread-graph-plan-step {\n  border-color: rgb(48 54 66);\n  background: #181b23;\n  color: rgb(241 245 249);\n}\n.thread-ui-shell .thread-graph-plan-explanation {\n  color: rgb(148 163 184);\n}\n.thread-ui-shell .thread-graph-plan-badge {\n  border-color: transparent;\n  background: rgb(56 189 248 / 0.12);\n  color: rgb(186 230 253);\n  box-shadow: none;\n  text-transform: uppercase;\n  letter-spacing: 0.16em;\n}\n.thread-ui-shell .thread-graph-plan-status {\n  height: 1.75rem;\n  min-width: 1.75rem;\n  padding: 0;\n  border-color: transparent;\n  box-shadow: none;\n}\n.thread-ui-shell .thread-graph-plan-status.is-completed {\n  background: rgb(52 211 153 / 0.14);\n  color: rgb(167 243 208);\n}\n.thread-ui-shell .thread-graph-plan-status.is-running {\n  background: rgb(56 189 248 / 0.14);\n  color: rgb(186 230 253);\n}\n.thread-ui-shell .thread-graph-plan-status.is-pending,\n.thread-ui-shell .thread-graph-plan-status.is-unknown {\n  background: #2b313d;\n  color: rgb(203 213 225);\n}\n.thread-ui-shell .thread-graph-plan-status.is-failed {\n  background: rgb(251 113 133 / 0.14);\n  color: rgb(254 205 211);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-plan-card {\n  border-color: rgb(226 232 240);\n  background: rgb(248 250 252);\n  color: rgb(15 23 42);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-plan-step {\n  border-color: rgb(226 232 240);\n  background: rgb(255 255 255);\n  color: rgb(15 23 42);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-plan-explanation {\n  color: rgb(100 116 139);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-plan-badge {\n  background: rgb(14 165 233 / 0.1);\n  color: rgb(3 105 161);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-plan-status.is-completed {\n  background: rgb(16 185 129 / 0.12);\n  color: rgb(4 120 87);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-plan-status.is-running {\n  background: rgb(14 165 233 / 0.12);\n  color: rgb(3 105 161);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-plan-status.is-pending,\n.thread-ui-shell[data-theme-effective=light] .thread-graph-plan-status.is-unknown {\n  background: rgb(226 232 240);\n  color: rgb(71 85 105);\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-plan-status.is-failed {\n  background: rgb(244 63 94 / 0.12);\n  color: rgb(190 18 60);\n}\n.thread-ui-shell .thread-graph-event {\n  background: transparent !important;\n  color: var(--theme-fg) !important;\n}\n.thread-ui-shell .thread-graph-event-card {\n  background: var(--theme-surface) !important;\n  color: var(--theme-fg) !important;\n}\n.thread-ui-shell .thread-graph-plan-card,\n.thread-ui-shell .thread-graph-plan-step,\n.thread-ui-shell .thread-graph-plan-step-text {\n  color: rgb(241 245 249) !important;\n}\n.thread-ui-shell[data-theme-effective=light] .thread-graph-plan-card,\n.thread-ui-shell[data-theme-effective=light] .thread-graph-plan-step,\n.thread-ui-shell[data-theme-effective=light] .thread-graph-plan-step-text {\n  color: rgb(15 23 42) !important;\n}\n.thread-ui-shell :is(.thread-composer-menu, .thread-graph-composer-menu, [data-composer-menu-surface=true]) {\n  backdrop-filter: blur(18px) saturate(125%);\n  -webkit-backdrop-filter: blur(18px) saturate(125%);\n}\n");

// src/styles/export-dialog.css
styleInject(".thread-export-dialog-root {\n  --export-bg: rgb(248 250 252);\n  --export-panel: rgb(255 255 255);\n  --export-surface: rgb(241 245 249);\n  --export-surface-strong: rgb(226 232 240);\n  --export-border: rgb(203 213 225);\n  --export-fg: rgb(15 23 42);\n  --export-fg-soft: rgb(51 65 85);\n  --export-fg-muted: rgb(100 116 139);\n  --export-accent: rgb(217 119 6);\n  --export-accent-bg: rgb(254 243 199);\n  --export-accent-border: rgb(251 191 36);\n  --export-shadow: rgb(15 23 42 / 0.16);\n  color: var(--export-fg);\n  position: fixed;\n  inset: 0;\n  z-index: 96;\n  display: flex;\n  align-items: flex-end;\n  justify-content: center;\n  overflow: hidden;\n  padding: 0;\n}\n.thread-export-dialog-root.thread-ui-theme-dark,\n.thread-export-dialog-root[data-theme-effective=dark] {\n  --export-bg: #12151c;\n  --export-panel: #181d25;\n  --export-surface: #1d222c;\n  --export-surface-strong: #262c38;\n  --export-border: #343b48;\n  --export-fg: rgb(241 245 249);\n  --export-fg-soft: rgb(203 213 225);\n  --export-fg-muted: rgb(148 163 184);\n  --export-accent: rgb(245 158 11);\n  --export-accent-bg: rgb(245 158 11 / 0.16);\n  --export-accent-border: rgb(245 158 11 / 0.34);\n  --export-shadow: rgb(0 0 0 / 0.36);\n}\n.thread-export-dialog-backdrop {\n  background: color-mix(in oklch, var(--export-bg) 68%, transparent);\n}\n.thread-export-dialog-root.thread-ui-theme-dark .thread-export-dialog-backdrop,\n.thread-export-dialog-root[data-theme-effective=dark] .thread-export-dialog-backdrop {\n  background: rgb(2 6 23 / 0.74);\n}\n.thread-export-dialog-panel {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  width: 100%;\n  max-width: 42rem;\n  flex-direction: column;\n  border-color: var(--export-border);\n  background: var(--export-panel);\n  box-shadow: 0 26px 80px var(--export-shadow);\n  max-height: calc(100% - max(env(safe-area-inset-top), var(--android-safe-area-top, 0px)) - max(0.75rem, env(safe-area-inset-bottom), var(--android-safe-area-bottom, 0px)));\n}\n.thread-export-dialog-header,\n.thread-export-dialog-footer,\n.thread-export-dialog-box-header {\n  border-color: var(--export-border);\n}\n.thread-export-dialog-title,\n.thread-export-dialog-strong,\n.thread-export-dialog-body-text {\n  color: var(--export-fg);\n}\n.thread-export-dialog-subtitle,\n.thread-export-dialog-status-pill {\n  color: var(--export-fg-muted);\n}\n.thread-export-dialog-icon-button,\n.thread-export-dialog-secondary-button,\n.thread-export-dialog-segment,\n.thread-export-dialog-box,\n.thread-export-dialog-status-pill {\n  border-color: var(--export-border);\n  background: var(--export-surface);\n}\n.thread-export-dialog-segment,\n.thread-export-dialog-box {\n  background: color-mix(in oklch, var(--export-surface) 72%, var(--export-panel));\n}\n.thread-export-dialog-icon-button,\n.thread-export-dialog-secondary-button {\n  color: var(--export-fg-soft);\n}\n.thread-export-dialog-icon-button:hover:not(:disabled),\n.thread-export-dialog-secondary-button:hover:not(:disabled),\n.thread-export-dialog-turn-row:hover {\n  background: var(--export-surface-strong);\n  color: var(--export-fg);\n}\n.thread-export-dialog-muted-action {\n  color: var(--export-fg-muted);\n}\n.thread-export-dialog-muted-action:hover {\n  color: var(--export-fg);\n}\n.thread-export-dialog-root .ui-status-warning {\n  border: 1px solid var(--export-accent-border);\n  background: var(--export-accent-bg);\n  color: color-mix(in oklch, var(--export-accent) 72%, var(--export-fg));\n}\n.thread-export-dialog-checkbox {\n  accent-color: var(--export-accent);\n}\n.thread-export-dialog-turn-row {\n  color: var(--export-fg-soft);\n}\n@media (max-width: 639px) {\n  .thread-export-dialog-panel {\n    position: fixed;\n    right: 0;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    max-width: none;\n    border-bottom-right-radius: 0;\n    border-bottom-left-radius: 0;\n    transform: translateZ(0);\n  }\n}\n@media (min-width: 640px) {\n  .thread-export-dialog-root {\n    align-items: center;\n    padding: 1.5rem;\n  }\n}\n.thread-export-dialog-root.thread-ui-theme-dark,\n.thread-export-dialog-root[data-theme-effective=dark] {\n  --export-bg: #12110c;\n  --export-panel: #1e1d17;\n  --export-surface: #25241e;\n  --export-surface-strong: #302f27;\n  --export-border: #3c3a30;\n  --export-fg: #e9e7df;\n  --export-fg-soft: #ccc9bc;\n  --export-fg-muted: #999587;\n}\n.thread-export-dialog-segment {\n  display: flex;\n  flex-wrap: wrap;\n  border: 0;\n  gap: 4px;\n  border-radius: 8px;\n}\n.thread-export-dialog-panel {\n  border-radius: 16px;\n}\n.thread-export-dialog-box,\n.thread-export-dialog-box-header {\n  border-radius: 8px;\n}\n.public-transcript {\n  min-height: 100vh;\n  background: var(--theme-bg);\n  color: var(--theme-fg);\n  font-family: var(--font-sans,ui-sans-serif,system-ui,sans-serif);\n}\n.public-transcript-content {\n  max-width: 56rem;\n  margin: 0 auto;\n  padding: 24px 20px 48px;\n}\n.public-transcript-header {\n  padding-bottom: 20px;\n  margin-bottom: 20px;\n  border-bottom: 1px solid var(--theme-border);\n}\n.public-transcript-header h1 {\n  font-size: 20px;\n  font-weight: 600;\n  line-height: 1.4;\n  overflow-wrap: anywhere;\n}\n.public-transcript-header p {\n  margin-top: 6px;\n  color: var(--theme-fg-muted);\n  font-size: 11px;\n}\n.public-transcript-turn {\n  padding: 8px 0 20px;\n}\n.public-transcript-turn > .thread-graph-message + .thread-graph-message {\n  margin-top: 12px;\n}\n.public-transcript .thread-graph-message-stack.is-assistant {\n  width: 100%;\n}\n.public-transcript img {\n  max-width: 100%;\n  object-fit: contain;\n}\n.public-transcript .thread-graph-code-block {\n  overflow-wrap: anywhere;\n}\n.public-transcript .thread-graph-code-block pre {\n  white-space: pre-wrap;\n}\n@media (max-width: 639px) {\n  .public-transcript-content {\n    padding: 16px 12px 32px;\n  }\n}\n@media print {\n  @page {\n    size: A4;\n    margin: 12mm 10mm;\n  }\n  html,\n  body {\n    height: auto !important;\n    overflow: visible !important;\n  }\n  .public-transcript {\n    min-height: 0;\n    print-color-adjust: exact;\n    -webkit-print-color-adjust: exact;\n  }\n  .public-transcript-content {\n    max-width: none;\n    padding: 0;\n  }\n  .public-transcript-turn,\n  .public-transcript .thread-graph-message,\n  .public-transcript .thread-graph-message-bubble {\n    break-inside: auto;\n  }\n  .public-transcript .thread-graph-worked-summary,\n  .public-transcript .thread-graph-message-time-row,\n  .public-transcript h1,\n  .public-transcript h2,\n  .public-transcript h3 {\n    break-after: avoid;\n  }\n  .public-transcript p,\n  .public-transcript li {\n    orphans: 3;\n    widows: 3;\n  }\n  .public-transcript img,\n  .public-transcript tr {\n    break-inside: avoid;\n  }\n  .public-transcript .thread-graph-code-block {\n    box-decoration-break: clone;\n  }\n}\n");

// src/components/ThreadComposer.tsx
import {
  useCallback as useCallback9,
  useMemo as useMemo2,
  useRef as useRef7,
  useState as useState13
} from "react";

// src/components/composer/composerUtils.ts
function normalizePromptText(value) {
  return value.replace(/\u00a0/g, " ");
}
function tokenizePrompt(prompt, attachments) {
  if (!prompt) {
    return [];
  }
  const segments = [];
  const placeholders = [...attachments].sort(
    (left, right) => right.placeholder.length - left.placeholder.length
  );
  let cursor = 0;
  let textIndex = 0;
  while (cursor < prompt.length) {
    const matchingAttachment = placeholders.find(
      (attachment) => prompt.startsWith(attachment.placeholder, cursor)
    );
    if (matchingAttachment) {
      segments.push({
        type: "attachment",
        key: `${matchingAttachment.clientId}-${cursor}`,
        attachment: matchingAttachment
      });
      cursor += matchingAttachment.placeholder.length;
      continue;
    }
    let nextTokenIndex = prompt.length;
    for (const attachment of placeholders) {
      const candidateIndex = prompt.indexOf(attachment.placeholder, cursor);
      if (candidateIndex !== -1 && candidateIndex < nextTokenIndex) {
        nextTokenIndex = candidateIndex;
      }
    }
    const text = prompt.slice(cursor, nextTokenIndex);
    if (text) {
      segments.push({
        type: "text",
        key: `text-${textIndex}`,
        text
      });
      textIndex += 1;
    }
    cursor = nextTokenIndex;
  }
  return segments;
}
function buildAttachmentPlaceholder(kind, name, usedPlaceholders) {
  const token = kind === "photo" ? "PHOTO" : "FILE";
  let suffix = 0;
  while (true) {
    const label = suffix === 0 ? name : `${name} (${suffix + 1})`;
    const placeholder = `[${token} ${label}]`;
    if (!usedPlaceholders.has(placeholder)) {
      return placeholder;
    }
    suffix += 1;
  }
}
function buildAttachmentInsertionText(basePrompt, insertionPoint, placeholders) {
  const beforeChar = insertionPoint.start > 0 ? basePrompt[insertionPoint.start - 1] : "";
  const afterChar = insertionPoint.end < basePrompt.length ? basePrompt[insertionPoint.end] : "";
  const needsLeadingSpace = Boolean(beforeChar && !/\s/.test(beforeChar));
  const needsTrailingSpace = !afterChar || !/\s/.test(afterChar);
  return `${needsLeadingSpace ? " " : ""}${placeholders.join(" ")}${needsTrailingSpace ? " " : ""}`;
}
function buildComposerAttachmentDrafts({
  files,
  kindForFile,
  usedPlaceholders,
  buildClientId
}) {
  return files.map((file) => {
    const kind = kindForFile(file);
    const originalName = normalizedAttachmentFileName(file, kind);
    const placeholder = buildAttachmentPlaceholder(
      kind,
      normalizeAttachmentLabel(originalName),
      usedPlaceholders
    );
    usedPlaceholders.add(placeholder);
    return {
      clientId: buildClientId(),
      kind,
      originalName,
      placeholder,
      file
    };
  });
}
function buildAttachmentInsertionDraft({
  prompt,
  attachments,
  files,
  selection,
  kindForFile,
  buildClientId
}) {
  const usedPlaceholders = new Set(
    attachments.map((entry) => entry.placeholder)
  );
  const nextAttachments = buildComposerAttachmentDrafts({
    files,
    kindForFile,
    usedPlaceholders,
    buildClientId
  });
  const insertionPoint = selection ? { start: selection.start, end: selection.end } : { start: prompt.length, end: prompt.length };
  const insertionText = buildAttachmentInsertionText(
    prompt,
    insertionPoint,
    nextAttachments.map((entry) => entry.placeholder)
  );
  const nextPrompt = `${prompt.slice(0, insertionPoint.start)}${insertionText}${prompt.slice(
    insertionPoint.end
  )}`;
  const trailingSpacerOffset = insertionText.endsWith(" ") ? 1 : 0;
  const nextCaret = insertionPoint.start + insertionText.length - trailingSpacerOffset;
  return {
    draft: {
      prompt: nextPrompt,
      attachments: [...attachments, ...nextAttachments]
    },
    selection: {
      start: nextCaret,
      end: nextCaret
    },
    insertedAttachmentIds: nextAttachments.map(
      (attachment) => attachment.clientId
    )
  };
}
function buildComposerSubmitInput({
  prompt,
  attachments,
  isShellView
}) {
  if (isShellView) {
    return { prompt };
  }
  const normalizedPrompt = prompt.trim();
  if (!normalizedPrompt) {
    return null;
  }
  const activeAttachments = attachments.filter(
    (attachment) => normalizedPrompt.includes(attachment.placeholder)
  );
  return activeAttachments.length > 0 ? { prompt: normalizedPrompt, attachments: activeAttachments } : { prompt: normalizedPrompt };
}
function derivePromptPasteAction({
  files,
  plainText,
  htmlText,
  htmlToText
}) {
  if (files.length > 0) {
    return { type: "append-files", preventDefault: true, files };
  }
  const text = plainText || htmlToText(htmlText);
  if (!text && !htmlText) {
    return { type: "ignore", preventDefault: false };
  }
  return { type: "insert-text", preventDefault: true, text };
}
function derivePromptFileDragAction(hasFiles) {
  return hasFiles ? {
    type: "accept-files",
    preventDefault: true,
    activateDragTarget: true
  } : { type: "ignore", preventDefault: false, activateDragTarget: false };
}
function derivePromptDropAction(files) {
  return files.length > 0 ? {
    type: "accept-files",
    preventDefault: true,
    activateDragTarget: true,
    files
  } : { type: "ignore", preventDefault: false, activateDragTarget: false };
}
function derivePromptKeyDownAction({
  key,
  metaKey,
  ctrlKey,
  busy,
  disabled
}) {
  const isSubmitShortcut = key === "Enter" && (metaKey || ctrlKey);
  return {
    preventDefault: isSubmitShortcut,
    submit: isSubmitShortcut && !busy && !disabled
  };
}
function deriveComposerSettingsUpdateDecision({
  nextMode,
  previousOptimisticMode
}) {
  return {
    optimisticMode: nextMode ?? null,
    rollbackMode: nextMode ? previousOptimisticMode : null,
    shouldRollbackMode: Boolean(nextMode),
    closeMenuOnSuccess: true
  };
}
function draftSignature(draft) {
  return `${draft.prompt}${draft.attachments.map(
    (attachment) => `${attachment.clientId}${attachment.kind}${attachment.placeholder}${attachment.originalName}`
  ).join("")}`;
}
function formatReasoningEffortLabel(value) {
  if (!value) {
    return "Auto";
  }
  switch (value) {
    case "xhigh":
      return "xhigh";
    default:
      return value;
  }
}
function parseGoalTokenBudgetThousands(value) {
  const normalized = value.trim();
  if (!normalized) {
    return null;
  }
  const thousands = Number(normalized);
  if (!Number.isFinite(thousands) || thousands <= 0) {
    return Number.NaN;
  }
  return Math.round(thousands * 1e3);
}
function formatGoalTokenBudgetThousands(value) {
  if (!value) {
    return "";
  }
  const thousands = value / 1e3;
  return Number.isInteger(thousands) ? String(thousands) : String(Number(thousands.toFixed(1)));
}
function normalizeTomlContent(value) {
  return value.replace(/\r\n/g, "\n");
}
function parseMcpServerName(value) {
  const normalized = value.trim();
  if (!/^[A-Za-z0-9_-]+$/.test(normalized)) {
    return null;
  }
  return normalized;
}
function parseMcpServerNameFromBlock(value) {
  const lines = normalizeTomlContent(value).split("\n").map((line) => line.trim()).filter(Boolean);
  const header = lines.find((line) => /^\[mcp_servers\.[^\]]+\]$/.test(line));
  if (!header) {
    return null;
  }
  const match = header.match(/^\[mcp_servers\.([A-Za-z0-9_-]+)\]$/);
  return match?.[1] ?? null;
}
function renderHttpMcpBlock(name, url) {
  return `[mcp_servers.${name}]
url = ${JSON.stringify(url.trim())}
`;
}
function upsertMcpServerBlock(configContent, serverName, blockContent) {
  const normalizedConfig = normalizeTomlContent(configContent);
  const trimmedBlock = `${normalizeTomlContent(blockContent).trim()}
`;
  const lines = normalizedConfig.split("\n");
  const exactHeader = `[mcp_servers.${serverName}]`;
  const nestedPrefix = `[mcp_servers.${serverName}.`;
  let start = -1;
  let end = lines.length;
  for (let index = 0; index < lines.length; index += 1) {
    const trimmed = lines[index]?.trim() ?? "";
    if (trimmed === exactHeader) {
      start = index;
      break;
    }
  }
  if (start >= 0) {
    for (let index = start + 1; index < lines.length; index += 1) {
      const trimmed = lines[index]?.trim() ?? "";
      if (!trimmed.startsWith("[")) {
        continue;
      }
      if (trimmed === exactHeader || trimmed.startsWith(nestedPrefix)) {
        continue;
      }
      end = index;
      break;
    }
    const before = lines.slice(0, start).join("\n").trimEnd();
    const after = lines.slice(end).join("\n").trim();
    return [before, trimmedBlock.trimEnd(), after].filter(Boolean).join("\n\n").replace(/\n{3,}/g, "\n\n").concat("\n");
  }
  const base = normalizedConfig.trimEnd();
  return base ? `${base}

${trimmedBlock}` : trimmedBlock;
}
function clampPercent(value) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return 0;
  }
  return Math.max(0, Math.min(100, Math.round(value)));
}
function formatContextTokenKilocount(value) {
  const thousands = value / 1e3;
  return Number.isInteger(thousands) ? `${thousands}k` : `${Number(thousands.toFixed(1))}k`;
}
function formatModelContextTitle(model, contextUsage) {
  if (!model) {
    return "Select model";
  }
  if (contextUsage?.availability !== "available" || typeof contextUsage.tokensInContextWindow !== "number" || typeof contextUsage.modelContextWindow !== "number") {
    return `${model} \xB7 context unavailable`;
  }
  const usedTokens = Math.max(contextUsage.tokensInContextWindow, 0);
  const contextTokens = Math.max(contextUsage.modelContextWindow, 0);
  const remainingTokens = Math.max(contextTokens - usedTokens, 0);
  return [
    model,
    `${formatContextTokenKilocount(usedTokens)} used / ${formatContextTokenKilocount(contextTokens)}`,
    `${formatContextTokenKilocount(remainingTokens)} left`,
    `${clampPercent(contextUsage.remainingPercent)}% context left`
  ].join(" \xB7 ");
}
function normalizedAttachmentFileName(file, kind) {
  const trimmed = file.name.trim();
  if (trimmed) {
    return trimmed;
  }
  const fallbackExtension = kind === "photo" ? file.type.includes("png") ? ".png" : file.type.includes("heic") ? ".heic" : file.type.includes("heif") ? ".heif" : file.type.includes("webp") ? ".webp" : ".jpg" : "";
  return `${kind === "photo" ? "photo" : "file"}-${Date.now()}${fallbackExtension}`;
}
function normalizeAttachmentLabel(name) {
  const sanitized = name.replace(/[\r\n[\]]+/g, " ").replace(/\s+/g, " ").trim();
  return sanitized || "attachment";
}
function classifyAttachmentKind(file) {
  return file.type.startsWith("image/") ? "photo" : "file";
}
function extractFilesFromTransfer(items, files) {
  const extractedFiles = [];
  if (items) {
    for (const item of Array.from(items)) {
      if (item.kind !== "file") {
        continue;
      }
      const file = item.getAsFile();
      if (file) {
        extractedFiles.push(file);
      }
    }
  }
  if (extractedFiles.length > 0) {
    return extractedFiles;
  }
  if (files) {
    return Array.from(files);
  }
  return [];
}
function hasTransferFiles(items, files) {
  return extractFilesFromTransfer(items, files).length > 0;
}
function basenameFromAttachmentPath(value) {
  const normalized = value.replace(/[\\/]+$/, "").trim();
  if (!normalized) {
    return "";
  }
  const segments = normalized.split(/[\\/]/).filter(Boolean);
  return segments.at(-1) ?? normalized;
}
function attachmentDisplayLabel(attachment) {
  const placeholderMatch = attachment.placeholder.match(
    /^\[(?:PHOTO|FILE)\s+(.+)\]$/
  );
  if (placeholderMatch?.[1]) {
    return placeholderMatch[1];
  }
  return basenameFromAttachmentPath(attachment.originalName);
}

// src/components/composer/composerPresentation.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var HOOK_EVENT_OPTIONS = [
  { value: "preToolUse", label: "PreToolUse", matcherHint: "Bash" },
  {
    value: "permissionRequest",
    label: "PermissionRequest",
    matcherHint: "Bash"
  },
  { value: "postToolUse", label: "PostToolUse", matcherHint: "Bash" },
  {
    value: "sessionStart",
    label: "SessionStart",
    matcherHint: "startup|resume"
  },
  { value: "userPromptSubmit", label: "UserPromptSubmit", matcherHint: "" },
  { value: "stop", label: "Stop", matcherHint: "" },
  { value: "preCompact", label: "PreCompact", matcherHint: "" },
  { value: "postCompact", label: "PostCompact", matcherHint: "" }
];
function buildComposerControlState({
  goalComposeMode,
  goalBusy,
  threadConnected,
  busy,
  isShellView,
  disabledPlaceholder,
  settingsBusy,
  supportedEffortCount,
  fastMode
}) {
  const promptPlaceholder = goalComposeMode ? "Describe the goal the backend should continue working toward..." : disabledPlaceholder ?? (isShellView ? "Send shell input to the attached terminal..." : "");
  const sendButtonLabel = goalComposeMode ? goalBusy ? "Setting..." : "Set goal" : !threadConnected && busy ? "Connecting..." : !threadConnected ? "Send" : busy && !isShellView ? "Sending..." : "Send";
  const sendButtonClassName = !threadConnected ? "ui-action-danger" : goalComposeMode ? "ui-action-info" : "ui-action-primary";
  const modelControlsDisabled = settingsBusy;
  const effortControlsDisabled = modelControlsDisabled || supportedEffortCount === 0;
  const effortControlTitle = fastMode ? "Fast mode is on. Turn it off from the slash toolbox to edit reasoning." : supportedEffortCount === 0 ? "The selected model does not expose adjustable reasoning effort." : "Select reasoning effort";
  return {
    promptPlaceholder,
    interruptLabel: isShellView ? "Send Ctrl-C" : "Stop Current Turn",
    sendButtonLabel,
    sendButtonClassName,
    modelControlsDisabled,
    effortControlsDisabled,
    effortControlTitle
  };
}
function buildComposerClassNames({
  isShellView,
  edgeToEdgeMobile,
  isMobileShell,
  openMenu,
  isDragTargetActive,
  busy
}) {
  const composerLayerBaseClassName = isShellView ? "thread-composer-layer thread-shell-composer-layer" : "thread-graph-composer-layer";
  const composerFormBaseClassName = isShellView ? "thread-composer-form" : "thread-graph-composer-form";
  const composerFloatingFormClassName = isShellView ? "thread-composer-form-floating" : "thread-graph-composer-form-floating";
  const composerInputClassName = isShellView ? "thread-composer-input" : "thread-graph-composer-input";
  return {
    composerLayerClassName: openMenu ? `${composerLayerBaseClassName} relative z-[80] shrink-0` : `${composerLayerBaseClassName} relative z-20 shrink-0`,
    formClassName: isShellView ? edgeToEdgeMobile || isMobileShell ? `${composerFormBaseClassName} ${composerFloatingFormClassName} relative z-20 shrink-0 border-t border-[var(--theme-border)] bg-[var(--theme-surface)] px-3 py-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] sm:px-4 sm:py-3` : `${composerFormBaseClassName} relative z-20 shrink-0 border-t border-[var(--theme-border)] bg-[var(--theme-surface)] px-3 py-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] sm:px-4 sm:py-3` : `${composerFormBaseClassName} ${edgeToEdgeMobile ? composerFloatingFormClassName : ""} relative z-20 shrink-0 border-t px-3 py-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] sm:px-4 sm:py-3`,
    composerShellClassName: isShellView ? "thread-composer-shell" : "thread-graph-composer-shell",
    composerToolbarClassName: isShellView ? "thread-composer-toolbar" : "thread-graph-composer-toolbar",
    composerInputClassName,
    composerIconButtonClassName: isShellView ? "thread-composer-icon-button" : "thread-graph-composer-icon-button",
    composerMenuClassName: isShellView ? "thread-composer-menu" : "thread-graph-composer-menu",
    composerMenuItemClassName: isShellView ? "thread-composer-menu-item" : "thread-graph-composer-menu-item",
    composerInlineToggleClassName: isShellView ? "thread-composer-inline-toggle" : "thread-graph-composer-inline-toggle",
    composerPanelButtonClassName: isShellView ? "thread-composer-panel-button" : "thread-graph-composer-panel-button",
    composerChipButtonClassName: isShellView ? "thread-composer-chip-button" : "thread-graph-composer-chip-button",
    composerSendButtonClassName: isShellView ? "thread-composer-send-button" : "thread-graph-composer-send-button",
    composerPromptRegionClassName: isShellView ? "thread-composer-prompt-region" : "thread-graph-composer-prompt-region",
    promptInputClassName: `${composerInputClassName} min-h-[5.25rem] w-full px-4 pr-14 pt-3 outline-none transition sm:min-h-[5.75rem] ${isDragTargetActive ? "is-drag-target border-sky-300/80 bg-sky-300/[0.08] shadow-[0_0_0_1px_rgba(125,211,252,0.2)]" : ""}`,
    graphChatInputGroupClassName: `thread-graph-composer-input-group relative border-0 bg-transparent shadow-none ring-0 ${busy ? "bg-amber-50/40 dark:bg-amber-400/10" : "bg-transparent"}`,
    graphChatInputClassName: `${composerInputClassName} min-h-[68px] max-h-32 w-full overflow-y-auto px-3 pt-3 text-[16px] leading-relaxed text-slate-800 outline-none transition sm:min-h-[92px] sm:max-h-40 sm:px-4 sm:pt-4 sm:text-[14px] dark:text-slate-100 ${isDragTargetActive ? "is-drag-target bg-sky-300/[0.08] shadow-[0_0_0_1px_rgba(125,211,252,0.2)]" : ""}`
  };
}
function TerminalIcon() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.35",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx("path", { d: "m4 5 2 2-2 2" }),
        /* @__PURE__ */ jsx("path", { d: "M7.75 9.5h4.25" })
      ]
    }
  );
}
function PlusIcon() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      children: /* @__PURE__ */ jsx("path", { d: "M8 3.25v9.5M3.25 8h9.5" })
    }
  );
}
function SlashIcon() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M10.75 2.5 5.25 13.5" }),
        /* @__PURE__ */ jsx("path", { d: "M4.25 5.25h2.25" }),
        /* @__PURE__ */ jsx("path", { d: "M9.5 10.75h2.25" })
      ]
    }
  );
}
function ChatIcon() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.35",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: /* @__PURE__ */ jsx("path", { d: "M3 4.5A1.75 1.75 0 0 1 4.75 2.75h6.5A1.75 1.75 0 0 1 13 4.5v4A1.75 1.75 0 0 1 11.25 10.25H8l-2.75 2v-2H4.75A1.75 1.75 0 0 1 3 8.5v-4Z" })
    }
  );
}
function WrenchScrewdriverIcon() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 20 20",
      className: "h-3.5 w-3.5 fill-current",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            fillRule: "evenodd",
            d: "M14.5 10C16.9853 10 19 7.98528 19 5.5C19 5.01783 18.9242 4.55338 18.7838 4.11791C18.6792 3.79367 18.2734 3.72683 18.0325 3.96772L15.3402 6.66002C15.2098 6.79041 15.0168 6.84163 14.8466 6.77074C14.1172 6.46695 13.5334 5.88351 13.2292 5.15431C13.1582 4.98403 13.2094 4.79088 13.3398 4.66042L16.0327 1.9676C16.2735 1.72672 16.2067 1.32092 15.8825 1.21636C15.4469 1.07588 14.9823 1 14.5 1C12.0147 1 10 3.01472 10 5.5C10 5.59783 10.0031 5.69494 10.0093 5.79122C10.065 6.66418 9.88174 7.59855 9.20974 8.15855L1.98017 14.1832C1.3591 14.7008 1 15.4674 1 16.2759C1 17.7804 2.21962 19 3.7241 19C4.53256 19 5.29925 18.6409 5.81681 18.0198L11.8414 10.7903C12.4014 10.1183 13.3358 9.93497 14.2088 9.99073C14.3051 9.99688 14.4022 10 14.5 10ZM5 16C5 16.5523 4.55228 17 4 17C3.44772 17 3 16.5523 3 16C3 15.4477 3.44772 15 4 15C4.55228 15 5 15.4477 5 16Z",
            clipRule: "evenodd"
          }
        ),
        /* @__PURE__ */ jsx("path", { d: "M14.5 11.5C14.6731 11.5 14.8445 11.4927 15.0138 11.4783L18.7678 15.2323C19.7441 16.2086 19.7441 17.7915 18.7678 18.7678C17.7915 19.7441 16.2086 19.7441 15.2323 18.7678L10.8216 14.3571L12.9938 11.7505C13.0455 11.6885 13.1413 11.6131 13.3357 11.5552C13.5378 11.4951 13.805 11.468 14.1132 11.4877C14.2413 11.4959 14.3702 11.5 14.5 11.5Z" }),
        /* @__PURE__ */ jsx("path", { d: "M6.00003 4.58582L8.33056 6.91635C8.3027 6.95627 8.27496 6.98497 8.24946 7.00622L6.79994 8.21415L4.58582 6.00003H3.30905C3.11966 6.00003 2.94653 5.89303 2.86184 5.72364L1.1612 2.32237C1.06495 2.12987 1.10268 1.89739 1.25486 1.74521L1.74521 1.25486C1.89739 1.10268 2.12987 1.06495 2.32237 1.1612L5.72364 2.86184C5.89303 2.94653 6.00003 3.11966 6.00003 3.30905V4.58582Z" })
      ]
    }
  );
}
function ClipboardIcon() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.35",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M5.5 3.25h5" }),
        /* @__PURE__ */ jsx("path", { d: "M6.4 2h3.2a.9.9 0 0 1 .9.9v.35h1.3a1.2 1.2 0 0 1 1.2 1.2v7.35a1.2 1.2 0 0 1-1.2 1.2H4.2A1.2 1.2 0 0 1 3 11.8V4.45a1.2 1.2 0 0 1 1.2-1.2h1.3V2.9a.9.9 0 0 1 .9-.9Z" })
      ]
    }
  );
}
function authStatusLabel(value) {
  switch (value) {
    case "bearerToken":
      return "Token";
    case "oAuth":
      return "OAuth";
    case "notLoggedIn":
      return "Login";
    case "unsupported":
      return "Public";
    default:
      return "Unknown";
  }
}
function skillScopeLabel(value) {
  switch (value) {
    case "repo":
      return "Repo";
    case "system":
      return "System";
    case "admin":
      return "Admin";
    case "user":
    default:
      return "User";
  }
}
function hookEventLabel(value) {
  return HOOK_EVENT_OPTIONS.find((entry) => entry.value === value)?.label ?? value;
}
function hookSourceLabel(value) {
  switch (value) {
    case "cloudRequirements":
      return "Cloud";
    case "legacyManagedConfigFile":
    case "legacyManagedConfigMdm":
      return "Managed";
    case "sessionFlags":
      return "Session";
    default:
      return value[0]?.toUpperCase() + value.slice(1);
  }
}
function hookTrustLabel(value) {
  switch (value) {
    case "managed":
      return "Managed";
    case "modified":
      return "Modified";
    case "trusted":
      return "Trusted";
    case "untrusted":
      return "Review";
  }
}
function hookEventJsonKey(value) {
  switch (value) {
    case "preToolUse":
      return "PreToolUse";
    case "permissionRequest":
      return "PermissionRequest";
    case "postToolUse":
      return "PostToolUse";
    case "preCompact":
      return "PreCompact";
    case "postCompact":
      return "PostCompact";
    case "sessionStart":
      return "SessionStart";
    case "userPromptSubmit":
      return "UserPromptSubmit";
    case "stop":
      return "Stop";
  }
}
function hookScopeFromRecord(hook) {
  if (hook.source === "user") {
    return "global";
  }
  if (hook.source === "project") {
    return "project";
  }
  return null;
}
function editableHookTarget(hook) {
  const scope = hookScopeFromRecord(hook);
  if (!scope || hook.handlerType !== "command" || !hook.command || hook.isManaged) {
    return null;
  }
  return {
    scope,
    eventName: hook.eventName,
    matcher: hook.matcher,
    command: hook.command,
    timeoutSec: hook.timeoutSec,
    statusMessage: hook.statusMessage
  };
}
function goalStatusLabel(value) {
  switch (value) {
    case "active":
      return "Active";
    case "paused":
      return "Paused";
    case "budgetLimited":
      return "Budget";
    case "complete":
      return "Complete";
    default:
      return value;
  }
}
function ContextProgressBar({
  contextUsage
}) {
  const availability = contextUsage?.availability ?? "unavailable";
  const percent = clampPercent(contextUsage?.remainingPercent);
  if (availability !== "available") return null;
  const fillColor = percent <= 20 ? "rgba(251,113,133,0.90)" : percent <= 40 ? "rgba(252,211,77,0.85)" : "rgba(125,211,252,0.80)";
  return /* @__PURE__ */ jsx(
    "span",
    {
      "aria-hidden": "true",
      className: "thread-context-progress-track pointer-events-none mt-0.5 block",
      children: /* @__PURE__ */ jsx(
        "span",
        {
          className: "thread-context-progress-fill block",
          style: {
            width: `${percent}%`,
            backgroundColor: fillColor
          }
        }
      )
    }
  );
}
function ToolPill({
  label,
  tone = "stone"
}) {
  const toneClassName = tone === "rose" ? "border-rose-300/35 bg-rose-300/14 text-rose-50" : tone === "sky" ? "border-sky-300/35 bg-sky-300/14 text-sky-50" : "border-stone-700/90 bg-stone-900/80 text-stone-100";
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: `inline-flex min-w-[3rem] items-center justify-center rounded-full border px-2 py-1.5 text-[10px] font-medium tracking-[0.12em] ${toneClassName}`,
      children: label
    }
  );
}

// src/components/composer/composerToolbox.ts
function filterToolboxItemsForCapabilities(toolboxItems, capabilities) {
  return (toolboxItems ?? []).filter((item) => {
    if (item.command.trim().replace(/^\/+/, "").startsWith("$")) return false;
    switch (item.action) {
      case "fast":
        return capabilities.fast;
      case "compact":
        return capabilities.compact;
      case "goal":
        return capabilities.goal;
      case "fork":
        return capabilities.fork;
      case "skills":
        return capabilities.skills;
      case "mcp":
        return capabilities.mcp;
      case "hooks":
        return capabilities.hooks;
      case "harness":
      case "prompt":
      case "unsupported":
        return true;
      default:
        return false;
    }
  });
}
function toolboxItemActionDecision(item, {
  fastMode,
  goalComposeMode
}) {
  switch (item.action) {
    case "fast":
      return { type: "toggleFast", fastMode: !fastMode };
    case "compact":
      return { type: "runCompact" };
    case "goal":
      return goalComposeMode ? { type: "exitGoalCompose" } : { type: "enterGoalCompose" };
    case "fork":
    case "skills":
    case "mcp":
    case "hooks":
      return { type: "openPanel", panel: item.action };
    case "harness":
      return { type: "openHarness" };
    case "prompt":
      return { type: "insertPrompt", text: `${item.command} ` };
    default:
      return { type: "noop" };
  }
}
function toolboxItemStatus(item, {
  fastMode,
  compactBusy,
  goalComposeMode,
  goalStatus,
  busy
}) {
  switch (item.action) {
    case "fast":
      return fastMode ? "On" : "Off";
    case "compact":
      return compactBusy ? "Busy" : "Run";
    case "goal":
      return goalComposeMode ? "Composing" : goalStatus ? goalStatusLabel(goalStatus) : "Open";
    case "fork":
      return busy ? "Idle only" : "Open";
    case "skills":
    case "mcp":
    case "hooks":
    case "harness":
      return "View";
    case "prompt":
      return "Compose";
    case "unsupported":
      return "Unavailable";
    default:
      return "";
  }
}
function toolboxItemDisabled(item, {
  settingsBusy,
  compactBusy,
  busy,
  forkBusy
}) {
  switch (item.action) {
    case "fast":
      return settingsBusy;
    case "compact":
      return compactBusy || busy;
    case "fork":
      return busy || forkBusy;
    case "unsupported":
      return true;
    default:
      return false;
  }
}
function toolboxItemClassName(item, {
  fastMode,
  goalComposeMode,
  goalStatus,
  menuItemClassName: menuItemClassName2
}) {
  const active = item.action === "fast" && fastMode || item.action === "goal" && (goalComposeMode || goalStatus === "active");
  return `${active ? "ui-status-warning" : menuItemClassName2} mt-1 block w-full rounded-xl px-3 py-2 text-left text-sm transition disabled:cursor-not-allowed disabled:opacity-60`;
}

// src/components/composer/contentEditablePrompt.ts
function textFromClipboardHtml(value) {
  if (!value) {
    return "";
  }
  const container = document.createElement("div");
  container.innerHTML = value;
  return serializePromptContent(container, false);
}
function editorContainsStyledRichText(editor) {
  return Array.from(editor.querySelectorAll("[style], font")).some(
    (node) => !node.closest('[data-segment-type="attachment"][contenteditable="false"]')
  );
}
var BLOCK_PROMPT_TAGS = /* @__PURE__ */ new Set(["DIV", "LI", "P"]);
function serializePromptNode(node, currentText) {
  if (node.nodeType === Node.TEXT_NODE) {
    return currentText + (node.textContent ?? "");
  }
  if (!(node instanceof HTMLElement)) {
    return currentText;
  }
  if (node.dataset.segmentType === "attachment" && node.dataset.placeholder) {
    return currentText + node.dataset.placeholder;
  }
  if (node.tagName === "BR") {
    return `${currentText}
`;
  }
  let nextText = currentText;
  if (BLOCK_PROMPT_TAGS.has(node.tagName) && nextText.length > 0 && !nextText.endsWith("\n")) {
    nextText += "\n";
  }
  for (const child of Array.from(node.childNodes)) {
    nextText = serializePromptNode(child, nextText);
  }
  return nextText;
}
function serializePromptContent(root, normalizeNbsp = true) {
  let text = "";
  for (const child of Array.from(root.childNodes)) {
    text = serializePromptNode(child, text);
  }
  return normalizeNbsp ? text.replace(/\u00a0/g, " ") : text;
}
function segmentNodeText(child) {
  if (child instanceof HTMLElement && child.dataset.segmentType === "attachment" && child.dataset.placeholder) {
    return child.dataset.placeholder;
  }
  return serializePromptNode(child, "");
}
function serializeEditorPrompt(editor) {
  return serializePromptContent(editor);
}
function measureSelectionOffset(root, container, offset) {
  let resolvedChild = null;
  let offsetWithinChild = offset;
  if (container === root) {
    const childNodes2 = Array.from(root.childNodes);
    let total2 = 0;
    for (let index = 0; index < Math.min(offset, childNodes2.length); index += 1) {
      const child = childNodes2[index];
      if (child) {
        total2 += segmentNodeText(child).length;
      }
    }
    return total2;
  }
  if (container.nodeType === Node.TEXT_NODE) {
    resolvedChild = container;
  } else {
    const nearestChild = Array.from(root.childNodes).find(
      (child) => child.contains(container)
    );
    if (!nearestChild) {
      return serializeEditorPrompt(root).length;
    }
    resolvedChild = nearestChild;
    if (nearestChild instanceof HTMLElement && nearestChild.dataset.segmentType === "attachment") {
      const range = document.createRange();
      range.selectNodeContents(nearestChild);
      const placeholderLength = segmentNodeText(nearestChild).length;
      try {
        range.setEnd(container, offset);
        const visibleOffset = range.toString().length;
        const attachmentTextLength = nearestChild.textContent?.length ?? 0;
        if (attachmentTextLength === 0) {
          offsetWithinChild = placeholderLength;
        } else {
          offsetWithinChild = Math.round(
            Math.min(1, visibleOffset / attachmentTextLength) * placeholderLength
          );
        }
      } catch {
        offsetWithinChild = placeholderLength;
      }
    } else {
      const range = document.createRange();
      range.selectNodeContents(nearestChild);
      try {
        range.setEnd(container, offset);
        offsetWithinChild = range.toString().length;
      } catch {
        offsetWithinChild = segmentNodeText(nearestChild).length;
      }
    }
  }
  const childNodes = Array.from(root.childNodes);
  let total = 0;
  for (const child of childNodes) {
    if (child === resolvedChild) {
      if (child.nodeType === Node.TEXT_NODE) {
        return total + offsetWithinChild;
      }
      return total + Math.min(offsetWithinChild, segmentNodeText(child).length);
    }
    total += segmentNodeText(child).length;
  }
  return total;
}
function snapshotEditorSelection(editor) {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) {
    return null;
  }
  const range = selection.getRangeAt(0);
  if (!editor.contains(range.startContainer) || !editor.contains(range.endContainer)) {
    return null;
  }
  return {
    start: measureSelectionOffset(
      editor,
      range.startContainer,
      range.startOffset
    ),
    end: measureSelectionOffset(editor, range.endContainer, range.endOffset)
  };
}
function resolveOffsetToDomPosition(root, targetOffset) {
  let remaining = Math.max(0, targetOffset);
  const childNodes = Array.from(root.childNodes);
  for (const [index, child] of childNodes.entries()) {
    const childText = segmentNodeText(child);
    const childLength = childText.length;
    if (child.nodeType === Node.TEXT_NODE) {
      if (remaining <= childLength) {
        return {
          node: child,
          offset: remaining
        };
      }
      remaining -= childLength;
      continue;
    }
    if (child instanceof HTMLElement && child.dataset.segmentType === "attachment") {
      if (remaining === 0) {
        return {
          node: root,
          offset: index
        };
      }
      if (remaining <= childLength) {
        const nextChild = childNodes[index + 1];
        if (remaining === childLength && nextChild?.nodeType === Node.TEXT_NODE) {
          return {
            node: nextChild,
            offset: 0
          };
        }
        return {
          node: root,
          offset: index + 1
        };
      }
      remaining -= childLength;
      continue;
    }
    if (remaining <= childLength) {
      return {
        node: root,
        offset: index + 1
      };
    }
    remaining -= childLength;
  }
  return {
    node: root,
    offset: root.childNodes.length
  };
}
function restoreEditorSelection(editor, selection) {
  const startPosition = resolveOffsetToDomPosition(editor, selection.start);
  const endPosition = resolveOffsetToDomPosition(editor, selection.end);
  const range = document.createRange();
  range.setStart(startPosition.node, startPosition.offset);
  range.setEnd(endPosition.node, endPosition.offset);
  const currentSelection = window.getSelection();
  currentSelection?.removeAllRanges();
  currentSelection?.addRange(range);
}
function restoreSelectionAfterInsertedAttachments(editor, insertedClientIds) {
  if (insertedClientIds.length === 0) {
    return false;
  }
  const lastInsertedClientId = insertedClientIds.at(-1);
  if (!lastInsertedClientId) {
    return false;
  }
  const attachmentNode = Array.from(editor.childNodes).find(
    (child) => child instanceof HTMLElement && child.dataset.segmentType === "attachment" && child.dataset.clientId === lastInsertedClientId
  );
  if (!(attachmentNode instanceof HTMLElement)) {
    return false;
  }
  const range = document.createRange();
  const trailingNode = attachmentNode.nextSibling;
  if (trailingNode?.nodeType === Node.TEXT_NODE) {
    range.setStart(trailingNode, 0);
  } else {
    range.setStartAfter(attachmentNode);
  }
  range.collapse(true);
  const selection = window.getSelection();
  selection?.removeAllRanges();
  selection?.addRange(range);
  return true;
}

// src/components/graph-ui/InputGroup.tsx
import { cva } from "class-variance-authority";
import { jsx as jsx2 } from "react/jsx-runtime";
function InputGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx2(
    "div",
    {
      "data-slot": "input-group",
      role: "group",
      className: cn(
        "group/input-group relative flex w-full min-w-0 items-center rounded-md border shadow-xs outline-none transition-[color,box-shadow]",
        "h-9 has-[>textarea]:h-auto",
        "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col",
        "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col",
        className
      ),
      ...props
    }
  );
}
var inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium select-none [&>svg:not([class*=size-])]:size-4",
  {
    variants: {
      align: {
        "inline-start": "order-first pl-3 has-[>button]:ml-[-0.45rem]",
        "inline-end": "order-last pr-3 has-[>button]:mr-[-0.45rem]",
        "block-start": "order-first w-full justify-start px-3 pt-3",
        "block-end": "order-last w-full justify-start px-3 pb-3"
      }
    },
    defaultVariants: {
      align: "inline-start"
    }
  }
);
function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}) {
  return /* @__PURE__ */ jsx2(
    "div",
    {
      role: "group",
      "data-slot": "input-group-addon",
      "data-align": align,
      className: cn(inputGroupAddonVariants({ align }), className),
      onClick: (event) => {
        if (event.target.closest("button")) {
          return;
        }
        const control = event.currentTarget.parentElement?.querySelector(
          '[data-slot="input-group-control"] [contenteditable="true"], [data-slot="input-group-control"] textarea, [data-slot="input-group-control"] input, [data-slot="input-group-control"]'
        );
        control?.focus();
      },
      ...props
    }
  );
}
var inputGroupButtonVariants = cva("flex items-center gap-2 text-sm shadow-none", {
  variants: {
    size: {
      xs: "h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-2 has-[>svg]:px-2 [&>svg:not([class*=size-])]:size-3.5",
      sm: "h-8 gap-1.5 rounded-md px-2.5 has-[>svg]:px-2.5",
      "icon-xs": "size-6 rounded-[calc(var(--radius)-5px)] p-0 has-[>svg]:p-0",
      "icon-sm": "size-8 p-0 has-[>svg]:p-0"
    }
  },
  defaultVariants: {
    size: "xs"
  }
});
function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}) {
  return /* @__PURE__ */ jsx2(
    Button,
    {
      type,
      "data-size": size,
      variant,
      className: cn(inputGroupButtonVariants({ size }), className),
      ...props
    }
  );
}
function InputGroupText({ className, ...props }) {
  return /* @__PURE__ */ jsx2(
    "span",
    {
      className: cn(
        "flex items-center gap-2 text-sm [&_svg]:pointer-events-none [&_svg:not([class*=size-])]:size-4",
        className
      ),
      ...props
    }
  );
}

// src/components/composer/ComposerHiddenAttachmentInputs.tsx
import { Fragment, jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function ComposerHiddenAttachmentInputs({
  photoInputRef,
  fileInputRef,
  onAppendAttachments
}) {
  function handleInputChange(event, kind) {
    onAppendAttachments(event.target.files, kind);
    event.target.value = "";
  }
  return /* @__PURE__ */ jsxs2(Fragment, { children: [
    /* @__PURE__ */ jsx3(
      "input",
      {
        ref: photoInputRef,
        type: "file",
        accept: "image/*",
        multiple: true,
        tabIndex: -1,
        className: "sr-only",
        onChange: (event) => handleInputChange(event, "photo")
      }
    ),
    /* @__PURE__ */ jsx3(
      "input",
      {
        ref: fileInputRef,
        type: "file",
        multiple: true,
        tabIndex: -1,
        className: "sr-only",
        onChange: (event) => handleInputChange(event, "file")
      }
    )
  ] });
}

// src/components/composer/ComposerSubscriptionUsage.tsx
import { useEffect, useRef, useState } from "react";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function resetLabel(value) {
  if (!value) return "reset time unavailable";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "reset time unavailable" : `resets ${date.toLocaleString()}`;
}
function ComposerSubscriptionUsage({
  usage
}) {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!detailsVisible) return;
    const outside = (event) => {
      if (!ref.current?.contains(event.target)) setDetailsVisible(false);
    };
    const escape = (event) => {
      if (event.key === "Escape") setDetailsVisible(false);
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [detailsVisible]);
  if (!usage || usage.authKind !== "subscription" || usage.windows.length === 0 || usage.stale) {
    return null;
  }
  const windows = usage.windows.filter((window2) => Number.isFinite(window2.usedPercent) && window2.usedPercent >= 0 && (!window2.resetsAt || new Date(window2.resetsAt).getTime() > Date.now())).slice(0, 2);
  if (!windows.length) return null;
  const description = windows.map((window2) => {
    const remaining = Math.max(0, 100 - window2.usedPercent);
    return `${window2.label}: ${remaining}% remaining, ${resetLabel(window2.resetsAt)}`;
  }).join(". ");
  return /* @__PURE__ */ jsxs3(
    "button",
    {
      ref,
      type: "button",
      className: `thread-subscription-usage group pointer-events-auto absolute bottom-0 right-2 inline-flex h-4 items-center gap-1 rounded-t-md border border-b-0 border-stone-500/50 bg-stone-950 px-1 text-[9px] font-normal leading-none text-stone-200 shadow-sm transition-[border-color,background-color,opacity] duration-200 hover:border-stone-400/75 hover:bg-stone-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-200/70 sm:right-3 sm:text-[9px] ${usage.stale ? "opacity-70" : "opacity-95"}`,
      "aria-label": `${usage.provider} subscription usage. ${description}`,
      "aria-expanded": detailsVisible,
      onClick: () => setDetailsVisible((current) => !current),
      children: [
        windows.map((window2) => {
          const remaining = Math.max(0, Math.min(100, 100 - window2.usedPercent));
          const hue = Math.round(18 + remaining / 100 * 190);
          return /* @__PURE__ */ jsxs3("span", { className: "inline-flex items-center gap-0.5", children: [
            /* @__PURE__ */ jsx4("span", { className: "font-normal tracking-[-0.01em]", children: window2.label }),
            /* @__PURE__ */ jsx4(
              "span",
              {
                "data-subscription-window-track": "true",
                className: "h-0.5 w-7 overflow-hidden rounded-full bg-stone-600/55 sm:w-9",
                children: /* @__PURE__ */ jsx4(
                  "span",
                  {
                    className: "block h-full rounded-full transition-[width] duration-500 ease-out",
                    style: {
                      width: `${remaining}%`,
                      backgroundImage: `linear-gradient(90deg, oklch(68% 0.17 ${hue}), oklch(82% 0.13 ${Math.min(hue + 18, 235)}))`
                    }
                  }
                )
              }
            )
          ] }, window2.id);
        }),
        /* @__PURE__ */ jsxs3(
          "span",
          {
            role: "tooltip",
            "aria-hidden": !detailsVisible,
            className: `pointer-events-none absolute right-0 bottom-full mb-1 max-w-[calc(100vw-2rem)] rounded-md border border-stone-600/65 bg-stone-950/95 px-1.5 py-1 text-[9px] font-normal leading-4 text-stone-100 shadow-lg transition-[opacity,transform] duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 ${detailsVisible ? "translate-y-0 opacity-100" : "translate-y-0.5 opacity-0"}`,
            children: [
              windows.map((window2) => /* @__PURE__ */ jsxs3("span", { className: "block", children: [
                window2.label,
                " \xB7 ",
                Math.max(0, Math.round(100 - window2.usedPercent)),
                "% remaining \xB7 ",
                resetLabel(window2.resetsAt)
              ] }, window2.id)),
              usage.stale ? " \xB7 last known" : ""
            ]
          }
        )
      ]
    }
  );
}

// src/components/composer/ComposerJumpLatestButton.tsx
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
function ComposerJumpLatestButton({
  activeView,
  followTail,
  onToggleFollow,
  canJumpToPreviousTurn,
  onJumpToPreviousTurn,
  canJumpToNextTurn,
  onJumpToNextTurn,
  subscriptionUsage
}) {
  if (activeView !== "chat") {
    return null;
  }
  return /* @__PURE__ */ jsxs4("div", { className: "pointer-events-none absolute inset-x-0 top-0 z-[90] h-11 -translate-y-full bg-transparent touch-manipulation sm:h-10", children: [
    /* @__PURE__ */ jsxs4(
      "span",
      {
        role: "group",
        "aria-label": "Timeline navigation",
        className: `thread-jump-latest-badge pointer-events-auto absolute bottom-1 left-1/2 inline-flex h-5 min-w-[7.5rem] -translate-x-1/2 overflow-hidden rounded-[0.7rem] border shadow-sm transition ${followTail ? "is-active border-sky-300/36 bg-sky-300/[0.03] text-sky-100/86" : "border-stone-500/70 bg-stone-950/[0.08] text-stone-200/86"}`,
        children: [
          /* @__PURE__ */ jsx5(
            "button",
            {
              type: "button",
              "aria-label": "Jump to previous turn",
              title: canJumpToPreviousTurn ? "Jump to the start of the previous turn" : "No earlier turn",
              disabled: !canJumpToPreviousTurn,
              onClick: () => onJumpToPreviousTurn?.(),
              className: "inline-flex w-10 items-center justify-center transition hover:bg-sky-300/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-sky-200/70 disabled:cursor-default disabled:opacity-35",
              children: /* @__PURE__ */ jsx5("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", className: "h-3.5 w-3.5 fill-none stroke-current", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx5("path", { d: "M3.5 12h9M8 10V5M6 7l2-2 2 2" }) })
            }
          ),
          /* @__PURE__ */ jsx5("span", { "aria-hidden": "true", className: "w-px bg-current opacity-20" }),
          /* @__PURE__ */ jsx5(
            "button",
            {
              type: "button",
              "aria-label": "Jump to latest",
              title: followTail ? "Latest messages are in view" : "Jump to the bottom",
              onClick: () => onToggleFollow?.(),
              className: "inline-flex w-10 items-center justify-center transition hover:bg-sky-300/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-sky-200/70",
              children: /* @__PURE__ */ jsx5(
                "svg",
                {
                  "aria-hidden": "true",
                  viewBox: "0 0 16 16",
                  className: "h-3.5 w-3.5 fill-none stroke-current",
                  strokeWidth: "1.5",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  children: /* @__PURE__ */ jsx5("path", { d: "m4 5.5 4 4 4-4M3.5 12.5h9" })
                }
              )
            }
          ),
          /* @__PURE__ */ jsx5("span", { "aria-hidden": "true", className: "w-px bg-current opacity-20" }),
          /* @__PURE__ */ jsx5(
            "button",
            {
              type: "button",
              "aria-label": "Jump to next turn",
              title: canJumpToNextTurn ? "Jump to the start of the next turn" : "No later turn",
              disabled: !canJumpToNextTurn,
              onClick: () => onJumpToNextTurn?.(),
              className: "inline-flex w-10 items-center justify-center transition hover:bg-sky-300/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-sky-200/70 disabled:cursor-default disabled:opacity-35",
              children: /* @__PURE__ */ jsx5("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", className: "h-3.5 w-3.5 fill-none stroke-current", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx5("path", { d: "M3.5 4h9M8 6v5m-2-2 2 2 2-2" }) })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx5(ComposerSubscriptionUsage, { usage: subscriptionUsage })
  ] });
}

// src/components/composer/ComposerFrame.tsx
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
function ComposerFrame({
  activeView,
  layerClassName,
  formClassName,
  shellClassName,
  inputGroupClassName,
  error,
  followTail,
  photoInputRef,
  fileInputRef,
  onAppendAttachments,
  onToggleFollow,
  canJumpToPreviousTurn,
  onJumpToPreviousTurn,
  canJumpToNextTurn,
  onJumpToNextTurn,
  subscriptionUsage,
  onSubmit,
  formRef,
  promptSlot,
  pendingQueueSlot,
  toolbarSlot,
  goalSlot,
  shellPromptSlot
}) {
  return /* @__PURE__ */ jsxs5("div", { className: layerClassName, children: [
    /* @__PURE__ */ jsx6(
      ComposerHiddenAttachmentInputs,
      {
        photoInputRef,
        fileInputRef,
        onAppendAttachments
      }
    ),
    /* @__PURE__ */ jsx6(
      ComposerJumpLatestButton,
      {
        activeView,
        followTail,
        onToggleFollow,
        canJumpToPreviousTurn,
        onJumpToPreviousTurn,
        canJumpToNextTurn,
        onJumpToNextTurn,
        subscriptionUsage
      }
    ),
    pendingQueueSlot,
    /* @__PURE__ */ jsxs5(
      "form",
      {
        ref: formRef,
        "data-testid": activeView === "chat" ? "chat-composer" : void 0,
        onSubmit,
        className: formClassName,
        children: [
          /* @__PURE__ */ jsxs5(
            "div",
            {
              className: `${shellClassName} flex w-full flex-col overflow-visible rounded-[16px] sm:rounded-[18px]`,
              children: [
                /* @__PURE__ */ jsxs5(InputGroup, { className: inputGroupClassName, children: [
                  promptSlot,
                  toolbarSlot
                ] }),
                goalSlot,
                shellPromptSlot
              ]
            }
          ),
          error ? /* @__PURE__ */ jsx6("div", { className: "mt-2 rounded-2xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200", children: error }) : null
        ]
      }
    )
  ] });
}

// src/components/composer/ComposerPendingQueue.tsx
import { CornerUpRight, Loader2, X } from "lucide-react";
import { useState as useState2 } from "react";
import { Fragment as Fragment2, jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
function ComposerPendingQueue({
  prompts,
  onSteer,
  onCancel
}) {
  const [busyIds, setBusyIds] = useState2(() => /* @__PURE__ */ new Set());
  async function runAction(id, action) {
    if (!action || busyIds.has(id)) {
      return;
    }
    setBusyIds((current) => new Set(current).add(id));
    try {
      await action(id);
    } catch {
    } finally {
      setBusyIds((current) => {
        const next = new Set(current);
        next.delete(id);
        return next;
      });
    }
  }
  return /* @__PURE__ */ jsxs6(
    "section",
    {
      "aria-label": "Queued prompts",
      className: "thread-composer-pending-queue mx-auto mb-2 w-full max-w-4xl overflow-hidden rounded-xl border",
      children: [
        /* @__PURE__ */ jsxs6("div", { className: "flex items-center justify-between px-3 py-1.5 text-[11px] font-medium text-[var(--theme-fg-muted)]", children: [
          /* @__PURE__ */ jsx7("span", { children: "Queued" }),
          /* @__PURE__ */ jsx7("span", { children: prompts.length })
        ] }),
        /* @__PURE__ */ jsx7("div", { className: "max-h-36 overflow-y-auto", children: prompts.map((prompt) => {
          const busy = busyIds.has(prompt.id);
          return /* @__PURE__ */ jsxs6(
            "div",
            {
              className: "thread-composer-pending-row flex min-h-10 items-center gap-2 border-t px-3 py-2",
              children: [
                /* @__PURE__ */ jsx7(
                  "p",
                  {
                    className: "min-w-0 flex-1 truncate text-sm text-[var(--theme-fg)]",
                    title: prompt.prompt,
                    children: prompt.prompt
                  }
                ),
                prompt.optimistic ? /* @__PURE__ */ jsxs6("span", { className: "inline-flex h-8 items-center gap-1.5 px-1.5 text-xs text-[var(--theme-fg-muted)]", children: [
                  /* @__PURE__ */ jsx7(
                    Loader2,
                    {
                      className: "h-3.5 w-3.5 animate-spin",
                      "aria-hidden": "true"
                    }
                  ),
                  "Queueing"
                ] }) : /* @__PURE__ */ jsxs6(Fragment2, { children: [
                  onSteer ? /* @__PURE__ */ jsxs6(
                    "button",
                    {
                      type: "button",
                      disabled: busy,
                      onClick: () => void runAction(prompt.id, onSteer),
                      className: "thread-composer-steer-button inline-flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-xs font-medium transition disabled:cursor-wait disabled:opacity-60",
                      children: [
                        busy ? /* @__PURE__ */ jsx7(
                          Loader2,
                          {
                            className: "h-3.5 w-3.5 animate-spin",
                            "aria-hidden": "true"
                          }
                        ) : /* @__PURE__ */ jsx7(
                          CornerUpRight,
                          {
                            className: "h-3.5 w-3.5",
                            "aria-hidden": "true"
                          }
                        ),
                        "Steer"
                      ]
                    }
                  ) : null,
                  onCancel ? /* @__PURE__ */ jsx7(
                    "button",
                    {
                      type: "button",
                      disabled: busy,
                      "aria-label": "Remove queued prompt",
                      title: "Remove from queue",
                      onClick: () => void runAction(prompt.id, onCancel),
                      className: "thread-composer-queue-remove inline-flex h-8 w-8 items-center justify-center rounded-lg transition disabled:cursor-wait disabled:opacity-60",
                      children: /* @__PURE__ */ jsx7(X, { className: "h-4 w-4", "aria-hidden": "true" })
                    }
                  ) : null
                ] })
              ]
            },
            prompt.id
          );
        }) })
      ]
    }
  );
}

// src/components/composer/ComposerMenuSurface.tsx
import { useLayoutEffect, useRef as useRef2 } from "react";
import { jsx as jsx8 } from "react/jsx-runtime";
function ComposerMenuSurface({
  align = "start",
  children,
  className = "",
  ...props
}) {
  const menuRef = useRef2(null);
  useLayoutEffect(() => {
    const menu = menuRef.current;
    const trigger = menu?.parentElement?.querySelector(
      '[data-composer-menu-trigger="true"]'
    );
    if (!menu || !trigger) return;
    if (typeof menu.showPopover === "function") {
      menu.showPopover();
    } else {
      menu.removeAttribute("popover");
    }
    const updatePosition = () => {
      const viewport = window.visualViewport;
      const gutter = 8;
      const left = (viewport?.offsetLeft ?? 0) + gutter;
      const top = (viewport?.offsetTop ?? 0) + gutter;
      const width = viewport?.width ?? document.documentElement.clientWidth;
      const height = viewport?.height ?? window.innerHeight;
      const right = left + width - gutter * 2;
      const bottom = top + height - gutter * 2;
      const anchor = trigger.getBoundingClientRect();
      menu.style.maxWidth = `${Math.max(0, right - left)}px`;
      const above = Math.max(0, anchor.top - gutter - top);
      const below = Math.max(0, bottom - anchor.bottom - gutter);
      const naturalHeight = menu.scrollHeight + menu.offsetHeight - menu.clientHeight;
      const openAbove = naturalHeight <= above || above >= below;
      menu.style.maxHeight = `${Math.min(bottom - top, openAbove ? above : below)}px`;
      const bounds = menu.getBoundingClientRect();
      const preferredLeft = align === "end" ? anchor.right - bounds.width : anchor.left;
      const preferredTop = openAbove ? anchor.top - gutter - bounds.height : anchor.bottom + gutter;
      menu.style.left = `${Math.max(left, Math.min(preferredLeft, right - bounds.width))}px`;
      menu.style.top = `${Math.max(top, Math.min(preferredTop, bottom - bounds.height))}px`;
    };
    let frame = 0;
    const schedulePosition = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updatePosition);
    };
    updatePosition();
    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(schedulePosition);
    resizeObserver?.observe(menu);
    resizeObserver?.observe(trigger);
    const form = trigger.closest("form");
    if (form) resizeObserver?.observe(form);
    const mutationObserver = new MutationObserver(schedulePosition);
    mutationObserver.observe(menu, { childList: true, subtree: true, characterData: true });
    window.addEventListener("resize", schedulePosition);
    window.addEventListener("scroll", schedulePosition, true);
    window.visualViewport?.addEventListener("resize", schedulePosition);
    window.visualViewport?.addEventListener("scroll", schedulePosition);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      mutationObserver.disconnect();
      window.removeEventListener("resize", schedulePosition);
      window.removeEventListener("scroll", schedulePosition, true);
      window.visualViewport?.removeEventListener("resize", schedulePosition);
      window.visualViewport?.removeEventListener("scroll", schedulePosition);
      menu.hidePopover?.();
    };
  }, [align]);
  return /* @__PURE__ */ jsx8(
    "div",
    {
      ...props,
      ref: menuRef,
      popover: "manual",
      "data-composer-menu-surface": "true",
      className: `thread-composer-menu-surface ${className}`,
      children
    }
  );
}

// src/components/composer/ComposerAttachmentMenu.tsx
import { jsx as jsx9, jsxs as jsxs7 } from "react/jsx-runtime";
function ComposerAttachmentMenu({
  open,
  iconButtonClassName,
  menuClassName,
  menuItemClassName: menuItemClassName2,
  onToggle,
  onPickPhoto,
  onPickFile
}) {
  return /* @__PURE__ */ jsxs7("div", { className: "relative", children: [
    /* @__PURE__ */ jsx9(
      InputGroupButton,
      {
        type: "button",
        variant: "ghost",
        size: "icon-xs",
        "data-composer-menu-trigger": "true",
        "aria-label": "Add attachment",
        title: "Add attachment",
        onClick: onToggle,
        className: `${iconButtonClassName} h-9 w-9 rounded-full sm:h-8 sm:w-8`,
        children: /* @__PURE__ */ jsx9(PlusIcon, {})
      }
    ),
    open && /* @__PURE__ */ jsx9(
      ComposerMenuSurface,
      {
        align: "start",
        className: `${menuClassName} w-32 rounded-2xl border bg-stone-900/72 shadow-2xl shadow-stone-950/20`,
        children: /* @__PURE__ */ jsxs7("div", { className: "p-2", children: [
          /* @__PURE__ */ jsx9(
            "button",
            {
              type: "button",
              onClick: onPickPhoto,
              className: `${menuItemClassName2} block w-full rounded-xl px-3 py-2 text-left text-sm transition`,
              children: "Photo"
            }
          ),
          /* @__PURE__ */ jsx9(
            "button",
            {
              type: "button",
              onClick: onPickFile,
              className: `${menuItemClassName2} mt-1 block w-full rounded-xl px-3 py-2 text-left text-sm transition`,
              children: "File"
            }
          )
        ] })
      }
    )
  ] });
}

// src/components/composer/ComposerSettingsToolbar.tsx
import { Check, ChevronRight } from "lucide-react";
import { useState as useState3 } from "react";
import { Fragment as Fragment3, jsx as jsx10, jsxs as jsxs8 } from "react/jsx-runtime";
var sandboxOptions = [
  { mode: "read-only", label: "Read only" },
  { mode: "workspace-write", label: "Workspace write" },
  { mode: "danger-full-access", label: "Danger" }
];
function formatSandboxModeLabel(mode) {
  return sandboxOptions.find(
    (entry) => entry.mode === (mode ?? "danger-full-access")
  )?.label ?? "Danger";
}
function formatSandboxModeCompactLabel(mode) {
  switch (mode) {
    case "read-only":
      return "RO";
    case "workspace-write":
      return "WW";
    case "danger-full-access":
      return "Full";
    default:
      return "Full";
  }
}
function ComposerSettingsToolbar({
  openMenu,
  model,
  modelOptions,
  modelContextTitle,
  contextUsage,
  reasoningEffort,
  supportedEfforts,
  sandboxMode,
  sandboxModeAvailable,
  settingsBusy,
  goalComposeMode,
  goalBusy,
  activeView,
  disabled,
  fastMode,
  sendButtonLabel,
  sendButtonClassName,
  modelControlsDisabled,
  effortControlsDisabled,
  effortControlTitle,
  inlineToggleClassName,
  menuItemClassName: menuItemClassName2,
  sendButtonBaseClassName,
  onSetOpenMenu,
  onUpdateSettings
}) {
  const [settingsSection, setSettingsSection] = useState3(null);
  const selectedModelLabel = (modelOptions.find((entry) => entry.model === model)?.displayName || model || "Select model").replace(/\s+\([^)]+\)\s*$/, "");
  return /* @__PURE__ */ jsxs8(Fragment3, { children: [
    /* @__PURE__ */ jsxs8("div", { className: "relative min-w-0", children: [
      /* @__PURE__ */ jsx10(
        InputGroupButton,
        {
          type: "button",
          variant: "ghost",
          size: "xs",
          "data-composer-menu-trigger": "true",
          "aria-haspopup": "menu",
          "aria-expanded": openMenu === "model",
          "aria-label": `Model and effort: ${selectedModelLabel}, ${formatReasoningEffortLabel(reasoningEffort)}`,
          disabled: modelControlsDisabled || modelOptions.length === 0,
          onClick: () => {
            setSettingsSection(null);
            onSetOpenMenu((current) => current === "model" ? null : "model");
          },
          title: fastMode ? `Fast mode is on. Turn it off from the slash toolbox to edit model. ${modelContextTitle}` : modelContextTitle,
          className: `${inlineToggleClassName} relative min-w-0 max-w-[10rem] overflow-hidden rounded-full px-2.5 text-left text-stone-300 disabled:cursor-not-allowed disabled:text-stone-600 sm:max-w-[14rem]`,
          children: /* @__PURE__ */ jsxs8("span", { className: "relative z-[1] block min-w-0 truncate whitespace-nowrap", children: [
            selectedModelLabel,
            " \xB7 ",
            formatReasoningEffortLabel(reasoningEffort)
          ] })
        }
      ),
      model ? /* @__PURE__ */ jsx10(ContextProgressBar, { contextUsage }) : null,
      openMenu === "model" && /* @__PURE__ */ jsxs8(
        ComposerMenuSurface,
        {
          align: "end",
          className: "w-[13.5rem] rounded-xl border border-stone-700 bg-stone-900 p-1.5 shadow-2xl shadow-stone-950/40",
          children: [
            /* @__PURE__ */ jsxs8(
              "button",
              {
                type: "button",
                onClick: () => setSettingsSection("model"),
                className: `${menuItemClassName2} flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-stone-300`,
                children: [
                  /* @__PURE__ */ jsx10("span", { children: "Model" }),
                  /* @__PURE__ */ jsxs8("span", { className: "flex min-w-0 items-center gap-1 text-stone-500", children: [
                    /* @__PURE__ */ jsx10("span", { className: "max-w-[7rem] truncate", children: selectedModelLabel }),
                    /* @__PURE__ */ jsx10(ChevronRight, { className: "h-3.5 w-3.5 shrink-0" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxs8(
              "button",
              {
                type: "button",
                disabled: effortControlsDisabled,
                title: effortControlTitle,
                onClick: () => setSettingsSection("effort"),
                className: `${menuItemClassName2} flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-stone-300 disabled:cursor-not-allowed disabled:text-stone-600`,
                children: [
                  /* @__PURE__ */ jsx10("span", { children: "Effort" }),
                  /* @__PURE__ */ jsxs8("span", { className: "flex items-center gap-1 text-stone-500", children: [
                    formatReasoningEffortLabel(reasoningEffort),
                    /* @__PURE__ */ jsx10(ChevronRight, { className: "h-3.5 w-3.5" })
                  ] })
                ]
              }
            ),
            settingsSection === "model" ? /* @__PURE__ */ jsxs8("div", { className: "mt-1 w-full overflow-hidden border-t border-stone-700 bg-stone-900 p-1.5", children: [
              /* @__PURE__ */ jsx10("p", { className: "px-3 py-1.5 text-xs text-stone-500", children: "Model" }),
              /* @__PURE__ */ jsx10("div", { className: "max-h-72 overflow-auto", children: modelOptions.map((entry) => {
                const selected = entry.model === model;
                return /* @__PURE__ */ jsxs8(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      const nextEffort = reasoningEffort && entry.supportedReasoningEfforts.some(
                        (effort) => effort.reasoningEffort === reasoningEffort
                      ) ? reasoningEffort : entry.defaultReasoningEffort;
                      onUpdateSettings({
                        model: entry.model,
                        reasoningEffort: nextEffort
                      });
                      onSetOpenMenu(() => null);
                    },
                    className: `${menuItemClassName2} flex w-full items-center justify-between rounded-lg px-3 py-2 text-left ${selected ? "ui-status-warning" : "text-stone-300"}`,
                    children: [
                      /* @__PURE__ */ jsx10("span", { className: "truncate text-sm font-medium", children: entry.displayName || entry.model }),
                      selected ? /* @__PURE__ */ jsx10(Check, { className: "h-3.5 w-3.5 shrink-0" }) : null
                    ]
                  },
                  entry.id
                );
              }) })
            ] }) : null,
            settingsSection === "effort" ? /* @__PURE__ */ jsxs8("div", { className: "mt-1 w-full overflow-hidden border-t border-stone-700 bg-stone-900 p-1.5", children: [
              /* @__PURE__ */ jsx10("p", { className: "px-3 py-1.5 text-xs text-stone-500", children: "Effort" }),
              supportedEfforts.map((entry) => {
                const selected = entry.reasoningEffort === reasoningEffort;
                return /* @__PURE__ */ jsxs8(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      onUpdateSettings({
                        reasoningEffort: entry.reasoningEffort
                      });
                      onSetOpenMenu(() => null);
                    },
                    className: `${menuItemClassName2} flex w-full items-center justify-between rounded-lg px-3 py-2 text-left ${selected ? "ui-status-warning" : "text-stone-300"}`,
                    children: [
                      /* @__PURE__ */ jsx10("span", { className: "text-sm font-medium", children: formatReasoningEffortLabel(entry.reasoningEffort) }),
                      selected ? /* @__PURE__ */ jsx10(Check, { className: "h-3.5 w-3.5" }) : null
                    ]
                  },
                  entry.reasoningEffort
                );
              }),
              supportedEfforts.some(
                (entry) => entry.reasoningEffort === "ultra"
              ) ? /* @__PURE__ */ jsx10("p", { className: "px-3 pb-1 pt-2 text-xs leading-4 text-stone-500", children: "Higher effort can consume usage limits faster." }) : null
            ] }) : null,
            /* @__PURE__ */ jsx10("div", { className: "mt-1 border-t border-[var(--theme-border)] px-3 py-2 text-xs leading-5 text-[var(--theme-fg-muted)]", "aria-label": "Context usage", children: modelContextTitle })
          ]
        }
      )
    ] }),
    sandboxModeAvailable && /* @__PURE__ */ jsxs8("div", { className: "relative", children: [
      /* @__PURE__ */ jsx10(
        InputGroupButton,
        {
          type: "button",
          variant: "ghost",
          size: "xs",
          "data-composer-menu-trigger": "true",
          "aria-haspopup": "menu",
          "aria-expanded": openMenu === "sandbox",
          "aria-label": `Sandbox: ${formatSandboxModeLabel(sandboxMode)}`,
          disabled: settingsBusy,
          onClick: () => onSetOpenMenu(
            (current) => current === "sandbox" ? null : "sandbox"
          ),
          title: `Sandbox: ${formatSandboxModeLabel(sandboxMode)}`,
          className: `${inlineToggleClassName} rounded-full px-2.5 text-stone-300 disabled:cursor-not-allowed disabled:text-stone-700`,
          children: formatSandboxModeCompactLabel(sandboxMode)
        }
      ),
      openMenu === "sandbox" && /* @__PURE__ */ jsx10(
        ComposerMenuSurface,
        {
          align: "end",
          className: "w-max min-w-[9rem] rounded-2xl border border-stone-700 bg-stone-900 shadow-2xl shadow-stone-950/40",
          children: /* @__PURE__ */ jsx10("div", { className: "max-h-72 overflow-auto p-2", children: sandboxOptions.map((entry) => /* @__PURE__ */ jsx10(
            "button",
            {
              type: "button",
              onClick: () => onUpdateSettings({
                sandboxMode: entry.mode
              }),
              className: `block w-full rounded-xl px-3 py-2 text-left transition ${entry.mode === (sandboxMode ?? "danger-full-access") ? "ui-status-warning" : `${menuItemClassName2} text-stone-300`}`,
              children: /* @__PURE__ */ jsx10("p", { className: "text-sm font-medium", children: entry.label })
            },
            entry.mode
          )) })
        }
      )
    ] }),
    /* @__PURE__ */ jsx10(
      InputGroupButton,
      {
        type: "submit",
        variant: "default",
        size: "icon-xs",
        "aria-label": goalComposeMode ? "Set goal" : "Send Prompt",
        title: sendButtonLabel,
        disabled: goalBusy || (activeView === "chat" ? disabled : false),
        className: `${sendButtonBaseClassName} h-9 w-9 rounded-full text-sm font-medium disabled:cursor-not-allowed sm:h-8 sm:w-8 ${sendButtonClassName}`,
        children: /* @__PURE__ */ jsxs8(
          "svg",
          {
            "aria-hidden": "true",
            viewBox: "0 0 16 16",
            className: "h-4 w-4 fill-none stroke-current",
            strokeWidth: "1.8",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: [
              /* @__PURE__ */ jsx10("path", { d: "M8 13V3" }),
              /* @__PURE__ */ jsx10("path", { d: "m4 7 4-4 4 4" })
            ]
          }
        )
      }
    )
  ] });
}

// src/components/composer/ComposerShellToolsPanel.tsx
import { jsx as jsx11, jsxs as jsxs9 } from "react/jsx-runtime";
function ComposerShellToolsPanel({
  busy,
  shellControlState,
  onPaste,
  onCopy,
  onClear,
  onShellControl
}) {
  const shellInputEnabled = Boolean(shellControlState?.shellInputEnabled);
  const commandRunning = Boolean(shellControlState?.isCommandRunning);
  return /* @__PURE__ */ jsx11(
    ComposerMenuSurface,
    {
      align: "end",
      className: "w-[11.5rem] rounded-[1rem] border border-stone-700/90 bg-stone-950/96 p-2 shadow-2xl shadow-stone-950/40 sm:w-48",
      onMouseDown: (event) => {
        event.stopPropagation();
      },
      onPointerDown: (event) => {
        event.stopPropagation();
      },
      onTouchStart: (event) => {
        event.stopPropagation();
      },
      children: /* @__PURE__ */ jsxs9("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsx11(
          "button",
          {
            type: "button",
            onClick: onPaste,
            className: "inline-flex items-center justify-center rounded-full border border-sky-300/35 bg-sky-300/12 px-2 py-2 text-sky-50",
            children: /* @__PURE__ */ jsxs9("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx11(ClipboardIcon, {}),
              /* @__PURE__ */ jsx11("span", { className: "text-[10px] font-medium tracking-[0.12em]", children: "Paste" })
            ] })
          }
        ),
        /* @__PURE__ */ jsx11(
          "button",
          {
            type: "button",
            onClick: onCopy,
            className: "inline-flex items-center justify-center rounded-full border border-stone-700/90 bg-stone-900/80 px-2 py-2 text-stone-100",
            children: /* @__PURE__ */ jsxs9("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx11(ClipboardIcon, {}),
              /* @__PURE__ */ jsx11("span", { className: "text-[10px] font-medium tracking-[0.12em]", children: "Copy" })
            ] })
          }
        ),
        /* @__PURE__ */ jsx11(
          "button",
          {
            type: "button",
            disabled: busy,
            onClick: onClear,
            className: "disabled:cursor-not-allowed disabled:opacity-45",
            children: /* @__PURE__ */ jsx11(ToolPill, { label: "CLEAR", tone: "sky" })
          }
        ),
        /* @__PURE__ */ jsx11(
          "button",
          {
            type: "button",
            disabled: !shellInputEnabled || !commandRunning,
            onClick: () => onShellControl("ctrl_c"),
            className: "disabled:cursor-not-allowed disabled:opacity-45",
            children: /* @__PURE__ */ jsx11(ToolPill, { label: "CTRL-C", tone: "rose" })
          }
        ),
        /* @__PURE__ */ jsx11(
          "button",
          {
            type: "button",
            disabled: !shellInputEnabled,
            onClick: () => onShellControl("ctrl_d"),
            className: "disabled:cursor-not-allowed disabled:opacity-45",
            children: /* @__PURE__ */ jsx11(ToolPill, { label: "CTRL-D" })
          }
        ),
        /* @__PURE__ */ jsx11(
          "button",
          {
            type: "button",
            disabled: !shellInputEnabled,
            onClick: () => onShellControl("esc"),
            className: "disabled:cursor-not-allowed disabled:opacity-45",
            children: /* @__PURE__ */ jsx11(ToolPill, { label: "ESC" })
          }
        ),
        /* @__PURE__ */ jsx11(
          "button",
          {
            type: "button",
            disabled: !shellInputEnabled,
            onClick: () => onShellControl("tab"),
            className: "disabled:cursor-not-allowed disabled:opacity-45",
            children: /* @__PURE__ */ jsx11(ToolPill, { label: "TAB" })
          }
        ),
        /* @__PURE__ */ jsx11(
          "button",
          {
            type: "button",
            disabled: !shellInputEnabled,
            onClick: () => onShellControl("up"),
            className: "disabled:cursor-not-allowed disabled:opacity-45",
            children: /* @__PURE__ */ jsx11(ToolPill, { label: "UP" })
          }
        ),
        /* @__PURE__ */ jsx11(
          "button",
          {
            type: "button",
            disabled: !shellInputEnabled,
            onClick: () => onShellControl("down"),
            className: "disabled:cursor-not-allowed disabled:opacity-45",
            children: /* @__PURE__ */ jsx11(ToolPill, { label: "DOWN" })
          }
        )
      ] })
    }
  );
}

// src/components/composer/ComposerForkPanels.tsx
import { jsx as jsx12, jsxs as jsxs10 } from "react/jsx-runtime";
function ComposerForkPanel({
  busy,
  forkBusy,
  forkFromTurnAvailable,
  composerMenuItemClassName,
  onForkLatest,
  onSelectForkTurnPanel
}) {
  return /* @__PURE__ */ jsxs10("div", { className: "p-2", children: [
    /* @__PURE__ */ jsx12(
      "button",
      {
        type: "button",
        disabled: busy || forkBusy,
        onClick: () => void onForkLatest(),
        className: `${composerMenuItemClassName} block w-full rounded-xl px-3 py-2 text-left text-sm transition disabled:cursor-not-allowed disabled:opacity-60`,
        children: /* @__PURE__ */ jsxs10("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsx12("span", { children: "Fork from latest" }),
          /* @__PURE__ */ jsx12("span", { className: "text-[11px] uppercase tracking-[0.16em] text-stone-400", children: forkBusy ? "Forking" : "Run" })
        ] })
      }
    ),
    forkFromTurnAvailable ? /* @__PURE__ */ jsx12(
      "button",
      {
        type: "button",
        disabled: busy || forkBusy,
        onClick: (event) => {
          event.stopPropagation();
          void onSelectForkTurnPanel();
        },
        className: `${composerMenuItemClassName} mt-1 block w-full rounded-xl px-3 py-2 text-left text-sm transition disabled:cursor-not-allowed disabled:opacity-60`,
        children: /* @__PURE__ */ jsxs10("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsx12("span", { children: "Fork from selected turn" }),
          /* @__PURE__ */ jsx12("span", { className: "text-[11px] uppercase tracking-[0.16em] text-stone-400", children: "Pick" })
        ] })
      }
    ) : null,
    busy ? /* @__PURE__ */ jsx12("p", { className: "mt-2 rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-sm text-stone-400", children: "Fork is only available while the thread is idle." }) : null
  ] });
}
function ComposerForkTurnsPanel({
  forkTurnOptionsState,
  forkBusy,
  composerPanelButtonClassName,
  onForkTurn
}) {
  return /* @__PURE__ */ jsxs10("div", { className: "p-2", children: [
    forkTurnOptionsState.status === "loading" && !forkTurnOptionsState.data ? /* @__PURE__ */ jsx12("p", { className: "rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-sm text-stone-400", children: "Loading turns..." }) : null,
    forkTurnOptionsState.error ? /* @__PURE__ */ jsx12("p", { className: "mb-2 rounded-xl border border-rose-500/35 bg-rose-500/10 px-3 py-3 text-sm text-rose-100/90", children: forkTurnOptionsState.error }) : null,
    forkTurnOptionsState.data?.length ? /* @__PURE__ */ jsx12("div", { className: "space-y-2", children: forkTurnOptionsState.data.map((turn) => /* @__PURE__ */ jsx12(
      "button",
      {
        type: "button",
        disabled: forkBusy,
        onClick: () => void onForkTurn(turn.turnId),
        className: `${composerPanelButtonClassName} block w-full rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-left transition disabled:cursor-not-allowed disabled:opacity-60`,
        children: /* @__PURE__ */ jsxs10("div", { className: "flex items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxs10("span", { className: "text-sm text-stone-100", children: [
            "Turn ",
            turn.turnIndex
          ] }),
          /* @__PURE__ */ jsx12("span", { className: "text-[11px] uppercase tracking-[0.16em] text-stone-500", children: forkBusy ? "Forking" : turn.status })
        ] })
      },
      turn.turnId
    )) }) : null,
    forkTurnOptionsState.status !== "loading" && !forkTurnOptionsState.error && (forkTurnOptionsState.data?.length ?? 0) === 0 ? /* @__PURE__ */ jsx12("p", { className: "rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-sm text-stone-400", children: "No turns available to fork yet." }) : null
  ] });
}

// src/components/composer/ComposerHooksPanel.tsx
import { jsx as jsx13, jsxs as jsxs11 } from "react/jsx-runtime";
function ComposerHooksPanel({
  hooksPanelMode,
  hooksState,
  hostConfigFilesAvailable,
  hookTrustAvailable,
  hookConfigBusy,
  hookConfigError,
  hookConfigSuccess,
  editingHookTarget,
  hookScope,
  hookEventName,
  hookMatcher,
  hookCommand,
  hookTimeoutSec,
  hookStatusMessage,
  composerChipButtonClassName,
  onResetHookForm,
  onSetHooksPanelMode,
  onClearHookConfigStatus,
  onSetEditingHookTarget,
  onSetHookScope,
  onSetHookEventName,
  onSetHookMatcher,
  onSetHookCommand,
  onSetHookTimeoutSec,
  onSetHookStatusMessage,
  onSaveHook,
  onStartEditingHook,
  onTrustHook,
  onUntrustHook
}) {
  return /* @__PURE__ */ jsxs11("div", { className: "p-2", children: [
    /* @__PURE__ */ jsxs11("div", { className: "mb-2 flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxs11("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsx13("p", { className: "text-xs text-stone-400", children: "Hook config sources" }),
        /* @__PURE__ */ jsx13("p", { className: "truncate text-[11px] text-stone-500", children: hooksState.data?.projectHooksPath ?? "<workspace hooks config>" })
      ] }),
      hooksPanelMode === "list" && hostConfigFilesAvailable ? /* @__PURE__ */ jsx13(
        "button",
        {
          type: "button",
          onClick: (event) => {
            event.stopPropagation();
            onResetHookForm();
            onSetHooksPanelMode("add");
            onClearHookConfigStatus();
          },
          className: "shrink-0 rounded-full border border-sky-300/35 px-3 py-1.5 text-xs text-sky-100 transition hover:bg-sky-300/10",
          children: "Add Hook"
        }
      ) : null
    ] }),
    hooksState.status === "loading" && !hooksState.data ? /* @__PURE__ */ jsx13("p", { className: "rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-sm text-stone-400", children: "Loading hooks..." }) : null,
    hooksState.error ? /* @__PURE__ */ jsx13("p", { className: "mb-2 rounded-xl border border-rose-500/35 bg-rose-500/10 px-3 py-3 text-sm text-rose-100/90", children: hooksState.error }) : null,
    hookConfigError ? /* @__PURE__ */ jsx13("p", { className: "mb-2 rounded-xl border border-rose-500/35 bg-rose-500/10 px-3 py-3 text-sm text-rose-100/90", children: hookConfigError }) : null,
    hookConfigSuccess ? /* @__PURE__ */ jsx13("p", { className: "mb-2 rounded-xl border border-emerald-500/35 bg-emerald-500/10 px-3 py-3 text-sm text-emerald-100/90", children: hookConfigSuccess }) : null,
    hooksPanelMode === "add" || hooksPanelMode === "edit" ? /* @__PURE__ */ jsxs11("div", { className: "space-y-2 rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3", children: [
      hooksPanelMode === "edit" ? /* @__PURE__ */ jsxs11("p", { className: "rounded-lg border border-stone-800 bg-stone-950 px-3 py-2 text-[11px] text-stone-400", children: [
        "Editing",
        " ",
        hookEventJsonKey(editingHookTarget?.eventName ?? hookEventName),
        " ",
        "in ",
        editingHookTarget?.scope === "global" ? "global" : "project",
        " ",
        "hooks.json"
      ] }) : null,
      /* @__PURE__ */ jsxs11("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsxs11("label", { className: "block text-xs text-stone-400", children: [
          "Scope",
          /* @__PURE__ */ jsxs11(
            "select",
            {
              "aria-label": "Hook scope",
              value: hookScope,
              onChange: (event) => onSetHookScope(event.target.value),
              disabled: hooksPanelMode === "edit",
              className: "mt-1 w-full rounded-lg border border-stone-700 bg-stone-950 px-2.5 py-2 text-sm text-stone-100 outline-none focus:border-sky-300/50",
              children: [
                /* @__PURE__ */ jsx13("option", { value: "project", children: "Project" }),
                /* @__PURE__ */ jsx13("option", { value: "global", children: "Global" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs11("label", { className: "block text-xs text-stone-400", children: [
          "Event",
          /* @__PURE__ */ jsx13(
            "select",
            {
              "aria-label": "Hook event",
              value: hookEventName,
              onChange: (event) => onSetHookEventName(event.target.value),
              className: "mt-1 w-full rounded-lg border border-stone-700 bg-stone-950 px-2.5 py-2 text-sm text-stone-100 outline-none focus:border-sky-300/50",
              children: HOOK_EVENT_OPTIONS.map((eventOption) => /* @__PURE__ */ jsx13("option", { value: eventOption.value, children: eventOption.label }, eventOption.value))
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs11("div", { children: [
        /* @__PURE__ */ jsx13("label", { className: "mb-1 block text-xs text-stone-400", children: "Matcher" }),
        /* @__PURE__ */ jsx13(
          "input",
          {
            "aria-label": "Hook matcher",
            value: hookMatcher,
            onChange: (event) => onSetHookMatcher(event.target.value),
            placeholder: "Bash",
            className: "w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-stone-100 outline-none placeholder:text-stone-500 focus:border-sky-300/50"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs11("div", { children: [
        /* @__PURE__ */ jsx13("label", { className: "mb-1 block text-xs text-stone-400", children: "Command" }),
        /* @__PURE__ */ jsx13(
          "textarea",
          {
            "aria-label": "Hook command",
            value: hookCommand,
            onChange: (event) => onSetHookCommand(event.target.value),
            rows: 3,
            className: "w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 font-mono text-xs text-stone-100 outline-none placeholder:text-stone-500 focus:border-sky-300/50"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs11("div", { className: "grid grid-cols-2 gap-2", children: [
        /* @__PURE__ */ jsxs11("label", { className: "block text-xs text-stone-400", children: [
          "Timeout",
          /* @__PURE__ */ jsx13(
            "input",
            {
              "aria-label": "Hook timeout seconds",
              value: hookTimeoutSec,
              onChange: (event) => onSetHookTimeoutSec(event.target.value),
              inputMode: "numeric",
              className: "mt-1 w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-stone-100 outline-none focus:border-sky-300/50"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs11("label", { className: "block text-xs text-stone-400", children: [
          "Status message",
          /* @__PURE__ */ jsx13(
            "input",
            {
              "aria-label": "Hook status message",
              value: hookStatusMessage,
              onChange: (event) => onSetHookStatusMessage(event.target.value),
              className: "mt-1 w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-stone-100 outline-none focus:border-sky-300/50"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs11("div", { className: "flex items-center justify-between gap-2 pt-1", children: [
        /* @__PURE__ */ jsx13(
          "button",
          {
            type: "button",
            onClick: () => {
              onSetHooksPanelMode("list");
              onSetEditingHookTarget(null);
            },
            className: `${composerChipButtonClassName} rounded-full border border-stone-700 px-3 py-1.5 text-xs text-stone-300 transition`,
            children: "Back"
          }
        ),
        /* @__PURE__ */ jsx13(
          "button",
          {
            type: "button",
            onClick: () => void onSaveHook(),
            disabled: hookConfigBusy,
            className: "ui-status-info rounded-full px-3 py-1.5 text-xs transition disabled:cursor-not-allowed disabled:opacity-60",
            children: hookConfigBusy ? "Saving..." : hooksPanelMode === "edit" ? "Update Hook" : "Write Hook"
          }
        )
      ] })
    ] }) : null,
    hooksPanelMode === "list" && hooksState.data?.warnings.length ? /* @__PURE__ */ jsx13("div", { className: "mb-2 space-y-2", children: hooksState.data.warnings.map((warning) => /* @__PURE__ */ jsx13(
      "p",
      {
        className: "rounded-xl border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-xs text-amber-100/85",
        children: warning
      },
      warning
    )) }) : null,
    hooksPanelMode === "list" && hooksState.data?.errors.length ? /* @__PURE__ */ jsx13("div", { className: "mb-2 space-y-2", children: hooksState.data.errors.map((entry) => /* @__PURE__ */ jsxs11(
      "div",
      {
        className: "rounded-xl border border-rose-500/35 bg-rose-500/10 px-3 py-2 text-xs text-rose-100/90",
        children: [
          /* @__PURE__ */ jsx13("p", { className: "font-medium", children: entry.message }),
          /* @__PURE__ */ jsx13("p", { className: "mt-1 break-all text-rose-100/60", children: entry.path })
        ]
      },
      `${entry.path}:${entry.message}`
    )) }) : null,
    hooksPanelMode === "list" && hooksState.data?.hooks.length ? /* @__PURE__ */ jsx13("div", { className: "space-y-2", children: hooksState.data.hooks.map((hook) => /* @__PURE__ */ jsxs11(
      "div",
      {
        className: "rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-2.5",
        children: [
          /* @__PURE__ */ jsxs11("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxs11("p", { className: "truncate text-sm font-medium text-stone-100", children: [
              hookEventLabel(hook.eventName),
              hook.matcher ? ` \xB7 ${hook.matcher}` : ""
            ] }),
            /* @__PURE__ */ jsx13("p", { className: "mt-0.5 truncate font-mono text-[11px] text-stone-400", children: hook.command ?? hook.handlerType }),
            hook.statusMessage ? /* @__PURE__ */ jsx13("p", { className: "mt-1 truncate text-[11px] text-stone-500", children: hook.statusMessage }) : null
          ] }),
          /* @__PURE__ */ jsxs11("div", { className: "mt-2 flex flex-wrap items-center gap-1.5 text-[10px] uppercase tracking-[0.08em] text-stone-500", children: [
            editableHookTarget(hook) ? /* @__PURE__ */ jsx13(
              "button",
              {
                type: "button",
                onClick: (event) => {
                  event.stopPropagation();
                  onStartEditingHook(hook);
                },
                className: `${composerChipButtonClassName} rounded-full border border-stone-700 px-2 py-0.5 text-[10px] normal-case tracking-normal text-sky-100 transition hover:border-sky-300/35 hover:bg-sky-300/10`,
                children: "Edit"
              }
            ) : null,
            hookTrustAvailable && hook.trustStatus === "trusted" && !hook.isManaged ? /* @__PURE__ */ jsx13(
              "button",
              {
                type: "button",
                disabled: hookConfigBusy,
                onClick: (event) => {
                  event.stopPropagation();
                  void onUntrustHook(hook);
                },
                className: `${composerChipButtonClassName} rounded-full border border-stone-700 px-2 py-0.5 text-[10px] normal-case tracking-normal text-amber-100 transition hover:border-amber-300/35 hover:bg-amber-300/10 disabled:cursor-not-allowed disabled:opacity-50`,
                children: "Untrust"
              }
            ) : null,
            (hook.trustStatus === "untrusted" || hook.trustStatus === "modified") && !hook.isManaged && hookTrustAvailable ? /* @__PURE__ */ jsx13(
              "button",
              {
                type: "button",
                disabled: hookConfigBusy || !hook.currentHash,
                onClick: (event) => {
                  event.stopPropagation();
                  void onTrustHook(hook);
                },
                className: `${composerChipButtonClassName} rounded-full border border-stone-700 px-2 py-0.5 text-[10px] normal-case tracking-normal text-emerald-100 transition hover:border-emerald-300/35 hover:bg-emerald-300/10 disabled:cursor-not-allowed disabled:opacity-50`,
                children: "Trust"
              }
            ) : null,
            /* @__PURE__ */ jsx13("span", { className: "rounded-full border border-stone-700 px-2 py-0.5 text-stone-300", children: hookTrustLabel(hook.trustStatus) })
          ] }),
          /* @__PURE__ */ jsxs11("div", { className: "mt-2 flex flex-wrap items-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-stone-500", children: [
            /* @__PURE__ */ jsx13("span", { className: "rounded-full border border-stone-700 px-2 py-1", children: hookSourceLabel(hook.source) }),
            /* @__PURE__ */ jsx13("span", { className: "rounded-full border border-stone-700 px-2 py-1", children: hook.enabled ? "Enabled" : "Disabled" }),
            /* @__PURE__ */ jsxs11("span", { className: "rounded-full border border-stone-700 px-2 py-1", children: [
              hook.timeoutSec,
              "s"
            ] })
          ] })
        ]
      },
      hook.key
    )) }) : null,
    hooksPanelMode === "list" && hooksState.status !== "loading" && !hooksState.error && (hooksState.data?.hooks.length ?? 0) === 0 ? /* @__PURE__ */ jsx13("p", { className: "rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-sm text-stone-400", children: "No hooks configured for this workspace." }) : null
  ] });
}

// src/components/composer/ComposerGoalsPanel.tsx
import { jsx as jsx14, jsxs as jsxs12 } from "react/jsx-runtime";
function goalKey(goal) {
  return goal.localGoalId ?? `${goal.createdAt}:${goal.objective}`;
}
function mergeGoals(current, history) {
  const goals = current ? [current, ...history] : history;
  const seen = /* @__PURE__ */ new Set();
  return goals.filter((goal) => {
    const key = goalKey(goal);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}
function elapsedLabel(seconds) {
  if (seconds < 60) {
    return `${seconds}s`;
  }
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes}m`;
  }
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}
function statusLabel(status) {
  switch (status) {
    case "budgetLimited":
      return "Budget limited";
    case "complete":
      return "Complete";
    case "terminated":
      return "Terminated";
    case "paused":
      return "Paused";
    default:
      return "Active";
  }
}
function ComposerGoalsPanel({
  goalState,
  goalHistory,
  busy,
  onBack,
  onUpdateGoal
}) {
  const goals = mergeGoals(goalState.data, goalHistory);
  const currentGoalKey = goalState.data ? goalKey(goalState.data) : null;
  return /* @__PURE__ */ jsxs12("div", { className: "min-w-0", children: [
    /* @__PURE__ */ jsxs12("div", { className: "flex min-h-11 items-center justify-between gap-3 border-b border-[var(--theme-border)] px-3 py-2", children: [
      /* @__PURE__ */ jsx14(
        "button",
        {
          type: "button",
          onClick: onBack,
          className: "min-h-9 rounded-lg px-2 text-xs font-medium text-[var(--theme-fg-muted)] transition hover:bg-[var(--theme-hover)] hover:text-[var(--theme-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent-border)]",
          children: "Back"
        }
      ),
      /* @__PURE__ */ jsx14("span", { className: "text-xs font-semibold text-[var(--theme-fg)]", children: "Goals" })
    ] }),
    goalState.error ? /* @__PURE__ */ jsx14("p", { className: "m-3 rounded-lg border border-[var(--status-danger-border)] bg-[var(--status-danger-bg)] px-3 py-2 text-xs text-[var(--status-danger-fg)]", children: goalState.error }) : null,
    goalState.status === "loading" && goals.length === 0 ? /* @__PURE__ */ jsxs12("div", { className: "space-y-2 p-3", role: "status", "aria-label": "Loading goals", children: [
      /* @__PURE__ */ jsx14("div", { className: "h-12 animate-pulse rounded-lg bg-[var(--theme-muted)] motion-reduce:animate-none" }),
      /* @__PURE__ */ jsx14("div", { className: "h-12 animate-pulse rounded-lg bg-[var(--theme-muted)] motion-reduce:animate-none" })
    ] }) : goals.length === 0 ? /* @__PURE__ */ jsx14("p", { className: "px-4 py-5 text-center text-sm text-[var(--theme-fg-muted)]", children: "No goals in this thread yet." }) : /* @__PURE__ */ jsx14("div", { className: "max-h-72 divide-y divide-[var(--theme-border)] overflow-y-auto", children: goals.map((goal) => {
      const actionable = goalKey(goal) === currentGoalKey && ["active", "paused", "budgetLimited"].includes(goal.status);
      return /* @__PURE__ */ jsxs12("div", { className: "px-3 py-3", children: [
        /* @__PURE__ */ jsxs12("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsx14("p", { className: "min-w-0 flex-1 text-sm font-medium leading-5 text-[var(--theme-fg)]", children: goal.objective }),
          /* @__PURE__ */ jsx14("span", { className: "shrink-0 rounded-full border border-[var(--theme-border)] px-2 py-1 text-[10px] font-medium text-[var(--theme-fg-muted)]", children: statusLabel(goal.status) })
        ] }),
        /* @__PURE__ */ jsxs12("p", { className: "mt-1.5 text-[11px] text-[var(--theme-fg-muted)]", children: [
          elapsedLabel(goal.timeUsedSeconds),
          " \xB7 ",
          goal.tokensUsed.toLocaleString(),
          " tokens"
        ] }),
        actionable && onUpdateGoal ? /* @__PURE__ */ jsxs12("div", { className: "mt-2 flex flex-wrap gap-1.5", children: [
          /* @__PURE__ */ jsx14(
            "button",
            {
              type: "button",
              disabled: busy || goal.status === "active",
              onClick: () => void onUpdateGoal({ status: "active" }),
              className: "min-h-9 rounded-lg border border-[var(--theme-border)] px-3 text-xs font-medium text-[var(--theme-fg)] transition hover:bg-[var(--theme-hover)] disabled:cursor-not-allowed disabled:opacity-45",
              children: "Continue"
            }
          ),
          /* @__PURE__ */ jsx14(
            "button",
            {
              type: "button",
              disabled: busy || goal.status === "paused",
              onClick: () => void onUpdateGoal({ status: "paused" }),
              className: "min-h-9 rounded-lg border border-[var(--theme-border)] px-3 text-xs font-medium text-[var(--theme-fg)] transition hover:bg-[var(--theme-hover)] disabled:cursor-not-allowed disabled:opacity-45",
              children: "Pause"
            }
          ),
          /* @__PURE__ */ jsx14(
            "button",
            {
              type: "button",
              disabled: busy,
              onClick: () => void onUpdateGoal({ status: "terminated" }),
              className: "min-h-9 rounded-lg px-3 text-xs font-medium text-[var(--status-danger-fg)] transition hover:bg-[var(--status-danger-bg)] disabled:cursor-not-allowed disabled:opacity-45",
              children: "Terminate"
            }
          )
        ] }) : null
      ] }, goalKey(goal));
    }) })
  ] });
}

// src/components/composer/ComposerMcpPanel.tsx
import { jsx as jsx15, jsxs as jsxs13 } from "react/jsx-runtime";
function ComposerMcpPanel({
  mcpPanelMode,
  mcpState,
  mcpConfigEditing,
  mcpConfigPath,
  mcpConfigError,
  mcpConfigSuccess,
  mcpConfigBusy,
  mcpHttpName,
  mcpHttpUrl,
  mcpRawBlock,
  composerPanelButtonClassName,
  composerChipButtonClassName,
  onSetMcpPanelMode,
  onClearMcpConfigStatus,
  onSetMcpHttpName,
  onSetMcpHttpUrl,
  onSetMcpRawBlock,
  onPrepareRawMcpBlock,
  onSaveHttpMcp,
  onSaveRawMcpBlock
}) {
  return /* @__PURE__ */ jsxs13("div", { className: "p-2", children: [
    /* @__PURE__ */ jsxs13("div", { className: "mb-2 flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxs13("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsx15("p", { className: "text-xs text-stone-400", children: "MCP config source" }),
        /* @__PURE__ */ jsx15("p", { className: "truncate text-[11px] text-stone-500", children: mcpConfigPath ?? "<provider config>" })
      ] }),
      mcpPanelMode === "list" && mcpConfigEditing ? /* @__PURE__ */ jsx15(
        "button",
        {
          type: "button",
          onClick: (event) => {
            event.stopPropagation();
            onSetMcpPanelMode("add");
            onClearMcpConfigStatus();
          },
          className: "shrink-0 rounded-full border border-sky-300/35 px-3 py-1.5 text-xs text-sky-100 transition hover:bg-sky-300/10",
          children: "Add MCP"
        }
      ) : null
    ] }),
    mcpState.status === "loading" && !mcpState.data ? /* @__PURE__ */ jsx15("p", { className: "rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-sm text-stone-400", children: "Loading MCP servers..." }) : null,
    mcpState.error ? /* @__PURE__ */ jsx15("p", { className: "mb-2 rounded-xl border border-rose-500/35 bg-rose-500/10 px-3 py-3 text-sm text-rose-100/90", children: mcpState.error }) : null,
    mcpConfigError ? /* @__PURE__ */ jsx15("p", { className: "mb-2 rounded-xl border border-rose-500/35 bg-rose-500/10 px-3 py-3 text-sm text-rose-100/90", children: mcpConfigError }) : null,
    mcpConfigSuccess ? /* @__PURE__ */ jsx15("p", { className: "mb-2 rounded-xl border border-emerald-500/35 bg-emerald-500/10 px-3 py-3 text-sm text-emerald-100/90", children: mcpConfigSuccess }) : null,
    mcpPanelMode === "add" ? /* @__PURE__ */ jsxs13("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxs13(
        "button",
        {
          type: "button",
          onClick: (event) => {
            event.stopPropagation();
            onSetMcpPanelMode("http");
            onClearMcpConfigStatus();
          },
          className: `${composerPanelButtonClassName} block w-full rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-left transition`,
          children: [
            /* @__PURE__ */ jsxs13("div", { className: "flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsx15("span", { className: "text-sm text-stone-100", children: "HTTP / Streamable HTTP" }),
              /* @__PURE__ */ jsx15("span", { className: "text-[11px] uppercase tracking-[0.16em] text-stone-500", children: "Form" })
            ] }),
            /* @__PURE__ */ jsx15("p", { className: "mt-1 text-xs text-stone-400", children: "Add an MCP server with a name and URL, then write the matching block into provider config." })
          ]
        }
      ),
      /* @__PURE__ */ jsxs13(
        "button",
        {
          type: "button",
          onClick: (event) => {
            event.stopPropagation();
            void onPrepareRawMcpBlock();
          },
          className: `${composerPanelButtonClassName} block w-full rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-left transition`,
          children: [
            /* @__PURE__ */ jsxs13("div", { className: "flex items-center justify-between gap-3", children: [
              /* @__PURE__ */ jsx15("span", { className: "text-sm text-stone-100", children: "stdio / raw block" }),
              /* @__PURE__ */ jsx15("span", { className: "text-[11px] uppercase tracking-[0.16em] text-stone-500", children: "TOML" })
            ] }),
            /* @__PURE__ */ jsx15("p", { className: "mt-1 text-xs text-stone-400", children: "Write a single `[mcp_servers.name]` block, then save it back into provider config." })
          ]
        }
      )
    ] }) : null,
    mcpPanelMode === "http" ? /* @__PURE__ */ jsxs13("div", { className: "space-y-2 rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3", children: [
      /* @__PURE__ */ jsxs13("div", { children: [
        /* @__PURE__ */ jsx15("label", { className: "mb-1 block text-xs text-stone-400", children: "MCP name" }),
        /* @__PURE__ */ jsx15(
          "input",
          {
            "aria-label": "MCP name",
            value: mcpHttpName,
            onChange: (event) => onSetMcpHttpName(event.target.value),
            placeholder: "openaiDeveloperDocs",
            className: "w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-stone-100 outline-none placeholder:text-stone-500 focus:border-sky-300/50"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs13("div", { children: [
        /* @__PURE__ */ jsx15("label", { className: "mb-1 block text-xs text-stone-400", children: "URL" }),
        /* @__PURE__ */ jsx15(
          "input",
          {
            "aria-label": "URL",
            value: mcpHttpUrl,
            onChange: (event) => onSetMcpHttpUrl(event.target.value),
            placeholder: "https://developers.openai.com/mcp",
            className: "w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-stone-100 outline-none placeholder:text-stone-500 focus:border-sky-300/50"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs13("div", { className: "flex items-center justify-between gap-2 pt-1", children: [
        /* @__PURE__ */ jsx15(
          "button",
          {
            type: "button",
            onClick: () => onSetMcpPanelMode("add"),
            className: `${composerChipButtonClassName} rounded-full border border-stone-700 px-3 py-1.5 text-xs text-stone-300 transition`,
            children: "Back"
          }
        ),
        /* @__PURE__ */ jsx15(
          "button",
          {
            type: "button",
            onClick: () => void onSaveHttpMcp(),
            disabled: mcpConfigBusy,
            className: "ui-status-info rounded-full px-3 py-1.5 text-xs transition disabled:cursor-not-allowed disabled:opacity-60",
            children: mcpConfigBusy ? "Saving..." : "Write HTTP MCP"
          }
        )
      ] })
    ] }) : null,
    mcpPanelMode === "stdio" ? /* @__PURE__ */ jsxs13("div", { className: "space-y-2 rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3", children: [
      /* @__PURE__ */ jsx15("label", { className: "block text-xs text-stone-400", children: "MCP block for provider config" }),
      /* @__PURE__ */ jsx15(
        "textarea",
        {
          "aria-label": "MCP block for provider config",
          value: mcpRawBlock,
          onChange: (event) => onSetMcpRawBlock(event.target.value),
          rows: 8,
          className: "w-full rounded-lg border border-stone-700 bg-stone-950 px-3 py-2 text-sm text-stone-100 outline-none placeholder:text-stone-500 focus:border-sky-300/50"
        }
      ),
      /* @__PURE__ */ jsxs13("div", { className: "flex items-center justify-between gap-2 pt-1", children: [
        /* @__PURE__ */ jsx15(
          "button",
          {
            type: "button",
            onClick: () => onSetMcpPanelMode("add"),
            className: `${composerChipButtonClassName} rounded-full border border-stone-700 px-3 py-1.5 text-xs text-stone-300 transition`,
            children: "Back"
          }
        ),
        /* @__PURE__ */ jsx15(
          "button",
          {
            type: "button",
            onClick: () => void onSaveRawMcpBlock(),
            disabled: mcpConfigBusy,
            className: "ui-status-info rounded-full px-3 py-1.5 text-xs transition disabled:cursor-not-allowed disabled:opacity-60",
            children: mcpConfigBusy ? "Saving..." : "Write raw block"
          }
        )
      ] })
    ] }) : null,
    mcpPanelMode === "list" && mcpState.data?.servers.length ? /* @__PURE__ */ jsx15("div", { className: "space-y-2", children: mcpState.data.servers.map((server) => /* @__PURE__ */ jsxs13(
      "div",
      {
        className: "rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-2.5",
        children: [
          /* @__PURE__ */ jsxs13("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxs13("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx15("p", { className: "truncate text-sm font-medium text-stone-100", children: server.name }),
              /* @__PURE__ */ jsxs13("p", { className: "mt-0.5 text-xs text-stone-400", children: [
                server.tools.length,
                " tools \xB7 ",
                server.resourceCount,
                " ",
                "resources \xB7 ",
                server.resourceTemplateCount,
                " templates"
              ] })
            ] }),
            /* @__PURE__ */ jsx15("span", { className: "shrink-0 rounded-full border border-stone-700 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-stone-300", children: authStatusLabel(server.authStatus) })
          ] }),
          server.tools.length > 0 ? /* @__PURE__ */ jsx15("p", { className: "mt-2 line-clamp-2 text-xs text-stone-500", children: server.tools.slice(0, 4).map((tool) => tool.title ?? tool.name).join(" \xB7 ") }) : null
        ]
      },
      server.name
    )) }) : null,
    mcpPanelMode === "list" && mcpState.status !== "loading" && !mcpState.error && (mcpState.data?.servers.length ?? 0) === 0 ? /* @__PURE__ */ jsx15("p", { className: "rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-sm text-stone-400", children: "No MCP servers available right now." }) : null
  ] });
}

// src/components/composer/ComposerSkillsPanel.tsx
import { jsx as jsx16, jsxs as jsxs14 } from "react/jsx-runtime";
function ComposerSkillsPanel({
  skillsState,
  copiedSkillName,
  composerChipButtonClassName,
  onCopySkillInvokeName
}) {
  return /* @__PURE__ */ jsxs14("div", { className: "p-2", children: [
    skillsState.status === "loading" && !skillsState.data ? /* @__PURE__ */ jsx16("p", { className: "rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-sm text-stone-400", children: "Loading skills..." }) : null,
    skillsState.error ? /* @__PURE__ */ jsx16("p", { className: "mb-2 rounded-xl border border-rose-500/35 bg-rose-500/10 px-3 py-3 text-sm text-rose-100/90", children: skillsState.error }) : null,
    skillsState.data?.skills.length ? /* @__PURE__ */ jsx16("div", { className: "space-y-2", children: skillsState.data.skills.map((skill) => /* @__PURE__ */ jsx16(
      "div",
      {
        className: "rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-2.5",
        children: /* @__PURE__ */ jsxs14("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx16("p", { className: "truncate text-sm font-medium text-stone-100", children: skill.interface?.displayName ?? skill.name }),
          /* @__PURE__ */ jsxs14("div", { className: "flex flex-wrap items-center gap-1.5 text-[10px] uppercase tracking-[0.14em]", children: [
            /* @__PURE__ */ jsx16("span", { className: "rounded-full border border-stone-700 px-2 py-1 text-stone-400", children: skillScopeLabel(skill.scope) }),
            /* @__PURE__ */ jsxs14(
              "button",
              {
                type: "button",
                className: `inline-flex items-center gap-1 rounded-full border px-2 py-1 normal-case tracking-normal transition ${copiedSkillName === skill.name ? "border-emerald-400/45 bg-emerald-400/12 text-emerald-100" : `${composerChipButtonClassName} border-stone-700 text-stone-300 hover:border-stone-500`}`,
                onClick: () => void onCopySkillInvokeName(skill.name),
                title: `Copy $${skill.name}`,
                "aria-label": `Copy $${skill.name}`,
                children: [
                  /* @__PURE__ */ jsx16(ClipboardIcon, {}),
                  "$",
                  skill.name
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx16("p", { className: "text-xs leading-5 text-stone-400", children: skill.interface?.shortDescription ?? skill.shortDescription ?? skill.description })
        ] })
      },
      skill.path
    )) }) : null,
    skillsState.data?.errors.length ? /* @__PURE__ */ jsx16("div", { className: "mt-2 space-y-2", children: skillsState.data.errors.map((entry) => /* @__PURE__ */ jsxs14(
      "div",
      {
        className: "rounded-xl border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-xs text-amber-100/85",
        children: [
          /* @__PURE__ */ jsx16("p", { className: "font-medium", children: entry.message }),
          /* @__PURE__ */ jsx16("p", { className: "mt-1 break-all text-amber-100/60", children: entry.path })
        ]
      },
      `${entry.path}:${entry.message}`
    )) }) : null,
    skillsState.status !== "loading" && !skillsState.error && (skillsState.data?.skills.length ?? 0) === 0 && (skillsState.data?.errors.length ?? 0) === 0 ? /* @__PURE__ */ jsx16("p", { className: "rounded-xl border border-stone-800 bg-stone-950/70 px-3 py-3 text-sm text-stone-400", children: "No skills available right now." }) : null
  ] });
}

// src/components/composer/ComposerSlashToolboxMenu.tsx
import { jsx as jsx17, jsxs as jsxs15 } from "react/jsx-runtime";
function ComposerSlashToolboxMenu({
  open,
  slashPanelView,
  availableToolboxItems,
  planModeAvailable,
  forkFromTurnAvailable,
  displayedCollaborationMode,
  settingsBusy,
  busy,
  forkBusy,
  forkError,
  forkTurnOptionsState,
  skillsState,
  goalState,
  goalHistory,
  goalBusy,
  copiedSkillName,
  hooksPanelMode,
  hooksState,
  hostConfigFilesAvailable,
  hookTrustAvailable,
  hookConfigBusy,
  hookConfigError,
  hookConfigSuccess,
  editingHookTarget,
  hookScope,
  hookEventName,
  hookMatcher,
  hookCommand,
  hookTimeoutSec,
  hookStatusMessage,
  mcpPanelMode,
  mcpState,
  mcpConfigEditing,
  mcpConfigPath,
  mcpConfigError,
  mcpConfigSuccess,
  mcpConfigBusy,
  mcpHttpName,
  mcpHttpUrl,
  mcpRawBlock,
  iconButtonClassName,
  menuClassName,
  menuItemClassName: menuItemClassName2,
  panelButtonClassName,
  chipButtonClassName,
  onToggle,
  onToolboxItemClick,
  onUpdateSettings,
  toolboxItemDisabled: toolboxItemDisabled2,
  toolboxItemClassName: toolboxItemClassName2,
  toolboxItemStatus: toolboxItemStatus2,
  onSetSlashPanelView,
  onViewGoals,
  onUpdateGoal,
  onOpenForkTurns,
  onForkLatest,
  onForkTurn,
  onCopySkillInvokeName,
  onResetHookForm,
  onSetHooksPanelMode,
  onClearHookConfigStatus,
  onSetEditingHookTarget,
  onSetHookScope,
  onSetHookEventName,
  onSetHookMatcher,
  onSetHookCommand,
  onSetHookTimeoutSec,
  onSetHookStatusMessage,
  onSaveHook,
  onStartEditingHook,
  onTrustHook,
  onUntrustHook,
  onSetMcpPanelMode,
  onClearMcpConfigStatus,
  onSetMcpHttpName,
  onSetMcpHttpUrl,
  onSetMcpRawBlock,
  onPrepareRawMcpBlock,
  onSaveHttpMcp,
  onSaveRawMcpBlock
}) {
  return /* @__PURE__ */ jsxs15("div", { className: "relative", children: [
    /* @__PURE__ */ jsx17(
      InputGroupButton,
      {
        type: "button",
        variant: "ghost",
        size: "icon-xs",
        "data-composer-menu-trigger": "true",
        "aria-label": "Open slash toolbox",
        title: "Open slash toolbox",
        onClick: onToggle,
        className: `${iconButtonClassName} h-9 w-9 rounded-full sm:h-8 sm:w-8`,
        children: /* @__PURE__ */ jsx17(SlashIcon, {})
      }
    ),
    open && /* @__PURE__ */ jsx17(
      ComposerMenuSurface,
      {
        align: "start",
        className: `${menuClassName} w-72 rounded-2xl border bg-stone-900/72 shadow-2xl shadow-stone-950/20 backdrop-blur-xl`,
        onClick: (event) => {
          event.stopPropagation();
        },
        onMouseDown: (event) => {
          event.stopPropagation();
        },
        onPointerDown: (event) => {
          event.stopPropagation();
        },
        onTouchStart: (event) => {
          event.stopPropagation();
        },
        children: slashPanelView === "root" ? /* @__PURE__ */ jsxs15("div", { className: "p-2", children: [
          planModeAvailable ? /* @__PURE__ */ jsx17(
            "button",
            {
              type: "button",
              "aria-pressed": displayedCollaborationMode === "plan",
              disabled: settingsBusy,
              onClick: () => onUpdateSettings({
                collaborationMode: displayedCollaborationMode === "plan" ? "default" : "plan"
              }),
              className: `${displayedCollaborationMode === "plan" ? "ui-status-warning" : menuItemClassName2} block w-full rounded-xl px-3 py-2 text-left text-sm transition disabled:cursor-not-allowed disabled:opacity-60`,
              title: "Toggle plan mode",
              children: /* @__PURE__ */ jsxs15("div", { className: "flex items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsx17("span", { children: "/plan" }),
                /* @__PURE__ */ jsx17("span", { className: "text-[11px] uppercase tracking-[0.16em] text-stone-400", children: displayedCollaborationMode === "plan" ? "On" : "Off" })
              ] })
            }
          ) : null,
          availableToolboxItems.map(
            (item, index) => item.action === "goal" ? /* @__PURE__ */ jsxs15(
              "div",
              {
                className: `mt-1 flex min-h-11 overflow-hidden rounded-xl border border-[var(--theme-border)] ${index === 0 && !planModeAvailable ? "mt-0" : ""}`,
                title: item.description ?? item.label,
                children: [
                  /* @__PURE__ */ jsx17(
                    "button",
                    {
                      type: "button",
                      disabled: toolboxItemDisabled2(item),
                      onClick: () => {
                        onSetSlashPanelView("goals");
                        void onViewGoals?.();
                      },
                      className: "min-w-0 flex-1 px-3 py-2.5 text-left text-sm text-[var(--theme-fg)] transition hover:bg-[var(--theme-hover)] focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--theme-accent-border)] disabled:cursor-not-allowed disabled:opacity-45",
                      "aria-label": "View goals",
                      children: /* @__PURE__ */ jsx17("span", { children: item.command })
                    }
                  ),
                  /* @__PURE__ */ jsx17(
                    "button",
                    {
                      type: "button",
                      disabled: toolboxItemDisabled2(item),
                      onClick: (event) => onToolboxItemClick(item, event),
                      className: "min-w-14 border-l border-[var(--theme-border)] px-3 text-xs font-semibold text-[var(--theme-fg-muted)] transition hover:bg-[var(--theme-hover)] hover:text-[var(--theme-fg)] focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--theme-accent-border)] disabled:cursor-not-allowed disabled:opacity-45",
                      "aria-label": "Open goal composer",
                      children: "Open"
                    }
                  )
                ]
              },
              `${item.action}:${item.command}`
            ) : /* @__PURE__ */ jsx17(
              "button",
              {
                type: "button",
                disabled: toolboxItemDisabled2(item),
                onClick: (event) => onToolboxItemClick(item, event),
                className: `${toolboxItemClassName2(item)} ${index === 0 && !planModeAvailable ? "mt-0" : ""}`,
                title: item.description ?? item.label,
                children: /* @__PURE__ */ jsxs15("div", { className: "flex items-center justify-between gap-3", children: [
                  /* @__PURE__ */ jsx17("span", { children: item.command }),
                  /* @__PURE__ */ jsx17("span", { className: "text-[11px] uppercase tracking-[0.16em] text-stone-400", children: toolboxItemStatus2(item) })
                ] })
              },
              `${item.action}:${item.command}`
            )
          ),
          availableToolboxItems.length === 0 && !planModeAvailable ? /* @__PURE__ */ jsx17("p", { className: "px-3 py-2 text-sm text-stone-400", children: "No backend tools are available for this thread." }) : null
        ] }) : /* @__PURE__ */ jsxs15("div", { className: "max-h-80 overflow-auto", children: [
          forkError && (slashPanelView === "fork" || slashPanelView === "forkTurns") ? /* @__PURE__ */ jsx17("p", { role: "alert", className: "m-2 rounded-xl border border-rose-500/35 bg-rose-500/10 px-3 py-3 text-sm text-rose-100/90", children: forkError }) : null,
          slashPanelView === "goals" ? /* @__PURE__ */ jsx17(
            ComposerGoalsPanel,
            {
              goalState,
              goalHistory,
              busy: goalBusy,
              onBack: () => onSetSlashPanelView("root"),
              onUpdateGoal
            }
          ) : slashPanelView === "fork" ? /* @__PURE__ */ jsx17(
            ComposerForkPanel,
            {
              busy,
              forkBusy,
              forkFromTurnAvailable,
              composerMenuItemClassName: menuItemClassName2,
              onForkLatest,
              onSelectForkTurnPanel: () => {
                onSetSlashPanelView("forkTurns");
                return onOpenForkTurns();
              }
            }
          ) : slashPanelView === "forkTurns" ? /* @__PURE__ */ jsx17(
            ComposerForkTurnsPanel,
            {
              forkTurnOptionsState,
              forkBusy,
              composerPanelButtonClassName: panelButtonClassName,
              onForkTurn
            }
          ) : slashPanelView === "skills" ? /* @__PURE__ */ jsx17(
            ComposerSkillsPanel,
            {
              skillsState,
              copiedSkillName,
              composerChipButtonClassName: chipButtonClassName,
              onCopySkillInvokeName
            }
          ) : slashPanelView === "hooks" ? /* @__PURE__ */ jsx17(
            ComposerHooksPanel,
            {
              hooksPanelMode,
              hooksState,
              hostConfigFilesAvailable,
              hookTrustAvailable,
              hookConfigBusy,
              hookConfigError,
              hookConfigSuccess,
              editingHookTarget,
              hookScope,
              hookEventName,
              hookMatcher,
              hookCommand,
              hookTimeoutSec,
              hookStatusMessage,
              composerChipButtonClassName: chipButtonClassName,
              onResetHookForm,
              onSetHooksPanelMode,
              onClearHookConfigStatus,
              onSetEditingHookTarget,
              onSetHookScope,
              onSetHookEventName,
              onSetHookMatcher,
              onSetHookCommand,
              onSetHookTimeoutSec,
              onSetHookStatusMessage,
              onSaveHook,
              onStartEditingHook,
              onTrustHook,
              onUntrustHook
            }
          ) : /* @__PURE__ */ jsx17(
            ComposerMcpPanel,
            {
              mcpPanelMode,
              mcpState,
              mcpConfigEditing,
              mcpConfigPath,
              mcpConfigError,
              mcpConfigSuccess,
              mcpConfigBusy,
              mcpHttpName,
              mcpHttpUrl,
              mcpRawBlock,
              composerPanelButtonClassName: panelButtonClassName,
              composerChipButtonClassName: chipButtonClassName,
              onSetMcpPanelMode,
              onClearMcpConfigStatus,
              onSetMcpHttpName,
              onSetMcpHttpUrl,
              onSetMcpRawBlock,
              onPrepareRawMcpBlock,
              onSaveHttpMcp,
              onSaveRawMcpBlock
            }
          )
        ] })
      }
    )
  ] });
}

// src/components/composer/ComposerToolbar.tsx
import { jsx as jsx18, jsxs as jsxs16 } from "react/jsx-runtime";
function ComposerToolbar({
  isShellView,
  canToggleShellView,
  isMobileShell,
  shellPromptLabel,
  openMenu,
  toolbarClassName,
  iconButtonClassName,
  slashToolboxProps,
  attachmentMenuProps,
  settingsToolbarProps,
  shellToolsPanelProps,
  onToggleView,
  onDismissPromptFocus,
  onSetOpenMenu
}) {
  return /* @__PURE__ */ jsxs16(
    InputGroupAddon,
    {
      align: "block-end",
      className: `${toolbarClassName} relative z-[100] mb-0 flex items-center gap-2 text-xs`,
      children: [
        /* @__PURE__ */ jsxs16("div", { className: "flex shrink-0 items-center gap-1.5", children: [
          !isShellView && slashToolboxProps ? /* @__PURE__ */ jsx18(ComposerSlashToolboxMenu, { ...slashToolboxProps }) : null,
          !isShellView && attachmentMenuProps ? /* @__PURE__ */ jsx18(ComposerAttachmentMenu, { ...attachmentMenuProps }) : null,
          canToggleShellView && /* @__PURE__ */ jsx18(
            InputGroupButton,
            {
              type: "button",
              variant: "ghost",
              size: "icon-xs",
              "aria-label": isShellView ? "Switch to chat" : "Switch to shell",
              title: isShellView ? "Switch to chat" : "Switch to shell",
              onClick: () => onToggleView?.(),
              className: `${iconButtonClassName} h-9 w-9 rounded-full sm:h-8 sm:w-8`,
              children: isShellView ? /* @__PURE__ */ jsx18(ChatIcon, {}) : /* @__PURE__ */ jsx18(TerminalIcon, {})
            }
          )
        ] }),
        /* @__PURE__ */ jsxs16("div", { className: "flex min-w-0 flex-1 flex-wrap items-center justify-end gap-1.5", children: [
          !isShellView && settingsToolbarProps ? /* @__PURE__ */ jsx18(ComposerSettingsToolbar, { ...settingsToolbarProps }) : null,
          isShellView && shellPromptLabel ? /* @__PURE__ */ jsx18(
            InputGroupText,
            {
              className: "min-w-0 max-w-[12rem] truncate rounded-full px-1.5 py-1 text-stone-400",
              title: shellPromptLabel,
              children: shellPromptLabel
            }
          ) : null,
          isMobileShell && /* @__PURE__ */ jsxs16("div", { className: "relative", children: [
            /* @__PURE__ */ jsx18(
              "button",
              {
                type: "button",
                "data-composer-menu-trigger": "true",
                "aria-label": openMenu === "shellTools" ? "Close shell tools" : "Open shell tools",
                "aria-haspopup": "menu",
                "aria-expanded": openMenu === "shellTools",
                title: openMenu === "shellTools" ? "Close shell tools" : "Open shell tools",
                onClick: () => {
                  onDismissPromptFocus();
                  onSetOpenMenu(
                    (current) => current === "shellTools" ? null : "shellTools"
                  );
                },
                className: "inline-flex h-7 w-7 items-center justify-center rounded-full border border-stone-700 bg-stone-900/92 text-stone-200 transition hover:bg-stone-800",
                children: /* @__PURE__ */ jsx18(WrenchScrewdriverIcon, {})
              }
            ),
            openMenu === "shellTools" && shellToolsPanelProps ? /* @__PURE__ */ jsx18(ComposerShellToolsPanel, { ...shellToolsPanelProps }) : null
          ] })
        ] })
      ]
    }
  );
}

// src/components/composer/useComposerAttachments.ts
import { useCallback } from "react";
function defaultBuildClientId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `attachment-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
function orderDroppedAttachmentFiles(files) {
  return [
    ...files.filter((file) => classifyAttachmentKind(file) === "photo"),
    ...files.filter((file) => classifyAttachmentKind(file) === "file")
  ];
}
function useComposerAttachments({
  prompt,
  attachments,
  updateDraft,
  getSelection,
  selectionSnapshotRef,
  pendingSelectionRef,
  pendingInsertedAttachmentIdsRef,
  onInserted,
  buildClientId = defaultBuildClientId
}) {
  const applyFiles = useCallback(
    (files, kindForFile) => {
      if (files.length === 0) {
        return false;
      }
      const insertion = buildAttachmentInsertionDraft({
        prompt,
        attachments,
        files,
        selection: getSelection() ?? selectionSnapshotRef.current,
        kindForFile,
        buildClientId
      });
      updateDraft(() => insertion.draft);
      pendingSelectionRef.current = insertion.selection;
      selectionSnapshotRef.current = insertion.selection;
      pendingInsertedAttachmentIdsRef.current = insertion.insertedAttachmentIds;
      onInserted?.();
      return true;
    },
    [
      attachments,
      buildClientId,
      getSelection,
      onInserted,
      pendingInsertedAttachmentIdsRef,
      pendingSelectionRef,
      prompt,
      selectionSnapshotRef,
      updateDraft
    ]
  );
  const appendAttachments = useCallback(
    (files, kind) => {
      if (!files || files.length === 0) {
        return false;
      }
      return applyFiles(Array.from(files), () => kind);
    },
    [applyFiles]
  );
  const appendDroppedAttachments = useCallback(
    (files) => applyFiles(orderDroppedAttachmentFiles(files), classifyAttachmentKind),
    [applyFiles]
  );
  return {
    appendAttachments,
    appendDroppedAttachments
  };
}

// src/components/composer/useAttachmentPreviewUrls.ts
import { useEffect as useEffect2, useRef as useRef3, useState as useState4 } from "react";
function revokeCachedPreviewUrls(previewUrlCache) {
  for (const previewUrl of previewUrlCache.values()) {
    URL.revokeObjectURL(previewUrl);
  }
  previewUrlCache.clear();
}
function useAttachmentPreviewUrls({
  attachments,
  isShellView
}) {
  const previewUrlCacheRef = useRef3(/* @__PURE__ */ new Map());
  const [attachmentPreviewUrls, setAttachmentPreviewUrls] = useState4({});
  useEffect2(() => {
    const previewUrlCache = previewUrlCacheRef.current;
    if (isShellView) {
      revokeCachedPreviewUrls(previewUrlCache);
      setAttachmentPreviewUrls({});
      return;
    }
    const nextPreviewUrls = {};
    const activeClientIds = /* @__PURE__ */ new Set();
    for (const attachment of attachments) {
      if (attachment.kind !== "photo") {
        continue;
      }
      activeClientIds.add(attachment.clientId);
      let previewUrl = previewUrlCache.get(attachment.clientId);
      if (!previewUrl) {
        previewUrl = URL.createObjectURL(attachment.file);
        previewUrlCache.set(attachment.clientId, previewUrl);
      }
      nextPreviewUrls[attachment.clientId] = previewUrl;
    }
    for (const [clientId, previewUrl] of previewUrlCache.entries()) {
      if (activeClientIds.has(clientId)) {
        continue;
      }
      URL.revokeObjectURL(previewUrl);
      previewUrlCache.delete(clientId);
    }
    setAttachmentPreviewUrls(nextPreviewUrls);
  }, [attachments, isShellView]);
  useEffect2(() => {
    const previewUrlCache = previewUrlCacheRef.current;
    return () => {
      revokeCachedPreviewUrls(previewUrlCache);
    };
  }, []);
  return attachmentPreviewUrls;
}

// src/components/composer/useComposerDraft.ts
import {
  useCallback as useCallback2,
  useEffect as useEffect3,
  useLayoutEffect as useLayoutEffect2,
  useRef as useRef4,
  useState as useState5
} from "react";
var DRAFT_SYNC_DELAY_MS = 180;
function toComposerDraft(prompt, attachments) {
  return {
    prompt: prompt ?? "",
    attachments: attachments ?? []
  };
}
function useComposerDraft({
  isShellView,
  draftPrompt,
  draftAttachments,
  onDraftChange
}) {
  const [internalDraft, setInternalDraft] = useState5({
    prompt: "",
    attachments: []
  });
  const [localControlledDraft, setLocalControlledDraft] = useState5(() => toComposerDraft(draftPrompt, draftAttachments));
  const draftSyncTimerRef = useRef4(null);
  const latestLocalDraftRef = useRef4(localControlledDraft);
  const lastSentDraftSignatureRef = useRef4(draftSignature(localControlledDraft));
  const isDraftControlled = !isShellView && draftPrompt !== void 0 && draftAttachments !== void 0 && typeof onDraftChange === "function";
  const controlledPropsSignature = isDraftControlled ? draftSignature(toComposerDraft(draftPrompt, draftAttachments)) : "";
  const lastRenderedControlledPropsSignatureRef = useRef4(
    controlledPropsSignature
  );
  useLayoutEffect2(() => {
    if (!isDraftControlled) {
      lastRenderedControlledPropsSignatureRef.current = "";
      return;
    }
    const hostDraft = toComposerDraft(draftPrompt, draftAttachments);
    const hostSignature = draftSignature(hostDraft);
    if (hostSignature === lastRenderedControlledPropsSignatureRef.current) {
      return;
    }
    lastRenderedControlledPropsSignatureRef.current = hostSignature;
    lastSentDraftSignatureRef.current = hostSignature;
    latestLocalDraftRef.current = hostDraft;
    if (draftSyncTimerRef.current !== null) {
      window.clearTimeout(draftSyncTimerRef.current);
      draftSyncTimerRef.current = null;
    }
    setLocalControlledDraft(hostDraft);
  }, [draftAttachments, draftPrompt, isDraftControlled]);
  const sendDraftToHost = useCallback2((nextDraft) => {
    if (!isDraftControlled || !onDraftChange) {
      return;
    }
    const signature = draftSignature(nextDraft);
    if (signature === lastSentDraftSignatureRef.current) {
      return;
    }
    lastSentDraftSignatureRef.current = signature;
    onDraftChange(() => ({
      prompt: nextDraft.prompt,
      attachments: nextDraft.attachments
    }));
  }, [isDraftControlled, onDraftChange]);
  useEffect3(() => {
    return () => {
      sendDraftToHost(latestLocalDraftRef.current);
      if (draftSyncTimerRef.current !== null) {
        window.clearTimeout(draftSyncTimerRef.current);
      }
    };
  }, [sendDraftToHost]);
  const syncControlledDraftToHost = useCallback2((nextDraft, mode) => {
    if (!isDraftControlled) {
      return;
    }
    if (draftSyncTimerRef.current !== null) {
      window.clearTimeout(draftSyncTimerRef.current);
      draftSyncTimerRef.current = null;
    }
    if (mode === "immediate") {
      sendDraftToHost(nextDraft);
      return;
    }
    draftSyncTimerRef.current = window.setTimeout(() => {
      draftSyncTimerRef.current = null;
      sendDraftToHost(latestLocalDraftRef.current);
    }, DRAFT_SYNC_DELAY_MS);
  }, [isDraftControlled, sendDraftToHost]);
  const flushControlledDraftToHost = useCallback2(
    (nextDraft = latestLocalDraftRef.current) => {
      syncControlledDraftToHost(nextDraft, "immediate");
    },
    [syncControlledDraftToHost]
  );
  const updateDraft = useCallback2((updater, syncMode = "immediate") => {
    if (isDraftControlled) {
      const nextDraft = updater(latestLocalDraftRef.current);
      latestLocalDraftRef.current = nextDraft;
      setLocalControlledDraft(nextDraft);
      syncControlledDraftToHost(nextDraft, syncMode);
      return;
    }
    setInternalDraft((current) => updater(current));
  }, [isDraftControlled, syncControlledDraftToHost]);
  const currentDraft = isDraftControlled ? localControlledDraft : internalDraft;
  return {
    prompt: currentDraft.prompt,
    attachments: currentDraft.attachments,
    isDraftControlled,
    updateDraft,
    flushControlledDraftToHost
  };
}

// src/components/composer/useComposerForkActions.ts
import { useCallback as useCallback3, useEffect as useEffect4, useRef as useRef5, useState as useState6 } from "react";
function useComposerForkActions({
  slashPanelView,
  onForkLatest,
  onForkTurn,
  closeMenu
}) {
  const [forkBusy, setForkBusy] = useState6(false);
  const [forkError, setForkError] = useState6(null);
  const inFlight = useRef5(false);
  useEffect4(() => {
    setForkError(null);
  }, [slashPanelView]);
  const forkLatest = useCallback3(async () => {
    if (inFlight.current) return;
    if (!onForkLatest) {
      setForkError("Fork is unavailable for this thread. Reload the page and try again.");
      return;
    }
    inFlight.current = true;
    setForkError(null);
    setForkBusy(true);
    try {
      await onForkLatest();
      closeMenu();
    } catch (error) {
      setForkError(error instanceof Error ? error.message : "Unable to fork this thread. Please try again.");
    } finally {
      inFlight.current = false;
      setForkBusy(false);
    }
  }, [closeMenu, onForkLatest]);
  const forkTurn = useCallback3(
    async (turnId) => {
      if (inFlight.current) return;
      if (!onForkTurn) {
        setForkError("Fork is unavailable for this thread. Reload the page and try again.");
        return;
      }
      inFlight.current = true;
      setForkError(null);
      setForkBusy(true);
      try {
        await onForkTurn(turnId);
        closeMenu();
      } catch (error) {
        setForkError(error instanceof Error ? error.message : "Unable to fork this turn. Please try again.");
      } finally {
        inFlight.current = false;
        setForkBusy(false);
      }
    },
    [closeMenu, onForkTurn]
  );
  return {
    forkBusy,
    forkError,
    forkLatest,
    forkTurn
  };
}

// src/components/composer/useComposerGoal.ts
import {
  useCallback as useCallback4,
  useState as useState7
} from "react";
function useComposerGoal({
  prompt,
  goalTokenBudgetSource,
  promptRef,
  onOpenGoal,
  onPrepareGoalSubmit,
  onUpdateGoal,
  updateDraft,
  closeMenu,
  resetSlashPanel
}) {
  const [goalComposeMode, setGoalComposeMode] = useState7(false);
  const [goalTokenBudget, setGoalTokenBudget] = useState7("");
  const [goalBusy, setGoalBusy] = useState7(false);
  const [goalLocalError, setGoalLocalError] = useState7(null);
  const submitGoal = useCallback4(async () => {
    const objective = prompt.trim();
    if (!objective) {
      setGoalLocalError("Goal objective cannot be empty.");
      return false;
    }
    const normalizedBudget = goalTokenBudget.trim();
    const tokenBudget = parseGoalTokenBudgetThousands(normalizedBudget);
    if (normalizedBudget.length > 0 && (tokenBudget === null || !Number.isInteger(tokenBudget) || tokenBudget <= 0)) {
      setGoalLocalError("Token budget must be a positive number in thousands.");
      return false;
    }
    if (!onUpdateGoal) {
      setGoalLocalError("/goal is unavailable in this view.");
      return false;
    }
    setGoalBusy(true);
    setGoalLocalError(null);
    try {
      if (onPrepareGoalSubmit) {
        const prepared = await onPrepareGoalSubmit({
          objective,
          tokenBudget
        });
        if (prepared === false) {
          return false;
        }
      }
      await onUpdateGoal({
        objective,
        status: "active",
        tokenBudget
      });
      setGoalTokenBudget("");
      setGoalComposeMode(false);
      updateDraft(() => ({
        prompt: "",
        attachments: []
      }));
      return true;
    } catch (error) {
      setGoalLocalError(
        error instanceof Error ? error.message : "Unable to set goal."
      );
      return false;
    } finally {
      setGoalBusy(false);
    }
  }, [goalTokenBudget, onPrepareGoalSubmit, onUpdateGoal, prompt, updateDraft]);
  const enterGoalComposeMode = useCallback4(() => {
    closeMenu();
    resetSlashPanel();
    setGoalComposeMode(true);
    setGoalTokenBudget(
      formatGoalTokenBudgetThousands(goalTokenBudgetSource?.tokenBudget)
    );
    setGoalLocalError(null);
    void onOpenGoal?.();
    requestAnimationFrame(() => {
      promptRef.current?.focus();
    });
  }, [
    closeMenu,
    goalTokenBudgetSource?.tokenBudget,
    onOpenGoal,
    promptRef,
    resetSlashPanel
  ]);
  const exitGoalComposeMode = useCallback4(() => {
    setGoalComposeMode(false);
    setGoalLocalError(null);
  }, []);
  return {
    goalComposeMode,
    goalTokenBudget,
    goalBusy,
    goalLocalError,
    setGoalTokenBudget,
    submitGoal,
    enterGoalComposeMode,
    exitGoalComposeMode
  };
}

// src/components/composer/useComposerHookConfig.ts
import {
  useCallback as useCallback5,
  useEffect as useEffect5,
  useMemo,
  useState as useState8
} from "react";
var FALLBACK_HOOK_COMMAND = `node -e "process.stdin.resume(); process.stdin.on('end', () => console.error('hook ran'))"`;
function buildHookCommandTemplateMap(hookCommandTemplates) {
  const templates = /* @__PURE__ */ new Map();
  for (const template of hookCommandTemplates ?? []) {
    templates.set(template.eventName, template.command);
  }
  return templates;
}
function useComposerHookConfig({
  slashPanelView,
  hookCommandTemplates,
  onCreateHook,
  onUpdateHook,
  onTrustHook,
  onUntrustHook
}) {
  const [hooksPanelMode, setHooksPanelMode] = useState8("list");
  const [hookScope, setHookScope] = useState8("project");
  const [hookEventName, setHookEventName] = useState8("preToolUse");
  const [hookMatcher, setHookMatcher] = useState8("Bash");
  const [hookCommand, setHookCommand] = useState8(FALLBACK_HOOK_COMMAND);
  const [hookTimeoutSec, setHookTimeoutSec] = useState8("30");
  const [hookStatusMessage, setHookStatusMessage] = useState8("Running hook");
  const [editingHookTarget, setEditingHookTarget] = useState8(null);
  const [hookConfigBusy, setHookConfigBusy] = useState8(false);
  const [hookConfigError, setHookConfigError] = useState8(null);
  const [hookConfigSuccess, setHookConfigSuccess] = useState8(
    null
  );
  const hookCommandTemplateByEvent = useMemo(
    () => buildHookCommandTemplateMap(hookCommandTemplates),
    [hookCommandTemplates]
  );
  const defaultHookCommand = useCallback5(
    (eventName) => hookCommandTemplateByEvent.get(eventName) ?? hookCommandTemplateByEvent.get("preToolUse") ?? FALLBACK_HOOK_COMMAND,
    [hookCommandTemplateByEvent]
  );
  const defaultHookCommands = useMemo(
    () => /* @__PURE__ */ new Set([FALLBACK_HOOK_COMMAND, ...hookCommandTemplateByEvent.values()]),
    [hookCommandTemplateByEvent]
  );
  const clearHookConfigStatus = useCallback5(() => {
    setHookConfigError(null);
    setHookConfigSuccess(null);
  }, []);
  useEffect5(() => {
    if (slashPanelView !== "hooks") {
      setHooksPanelMode("list");
      clearHookConfigStatus();
    }
  }, [clearHookConfigStatus, slashPanelView]);
  useEffect5(() => {
    const selected = HOOK_EVENT_OPTIONS.find(
      (entry) => entry.value === hookEventName
    );
    setHookMatcher((current) => {
      const trimmed = current.trim();
      const knownHints = new Set(
        HOOK_EVENT_OPTIONS.map((entry) => entry.matcherHint).filter(Boolean)
      );
      if (trimmed && !knownHints.has(trimmed)) {
        return current;
      }
      return selected?.matcherHint ?? "";
    });
    setHookCommand(
      (current) => defaultHookCommands.has(current.trim()) ? defaultHookCommand(hookEventName) : current
    );
  }, [defaultHookCommand, defaultHookCommands, hookEventName]);
  const resetHookForm = useCallback5(() => {
    setEditingHookTarget(null);
    setHookScope("project");
    setHookEventName("preToolUse");
    setHookMatcher("Bash");
    setHookCommand(defaultHookCommand("preToolUse"));
    setHookTimeoutSec("30");
    setHookStatusMessage("Running hook");
  }, [defaultHookCommand]);
  const startEditingHook = useCallback5((hook) => {
    const target = editableHookTarget(hook);
    if (!target) {
      setHookConfigError(
        "Only command hooks in global or project hooks.json can be edited here."
      );
      return;
    }
    setEditingHookTarget(target);
    setHookScope(target.scope);
    setHookEventName(target.eventName);
    setHookMatcher(target.matcher ?? "");
    setHookCommand(target.command);
    setHookTimeoutSec(target.timeoutSec ? String(target.timeoutSec) : "");
    setHookStatusMessage(target.statusMessage ?? "");
    setHookConfigError(null);
    setHookConfigSuccess(null);
    setHooksPanelMode("edit");
  }, []);
  const saveHook = useCallback5(async () => {
    if (hooksPanelMode === "edit" && !onUpdateHook) {
      setHookConfigError("Hook editing is unavailable in this view.");
      return;
    }
    if (hooksPanelMode !== "edit" && !onCreateHook) {
      setHookConfigError("Hook editing is unavailable in this view.");
      return;
    }
    if (hooksPanelMode === "edit" && !editingHookTarget) {
      setHookConfigError("Select a hook to edit first.");
      return;
    }
    const command = hookCommand.trim();
    if (!command) {
      setHookConfigError("Hook command cannot be empty.");
      return;
    }
    const normalizedTimeout = hookTimeoutSec.trim();
    const timeoutSec = normalizedTimeout ? Number(normalizedTimeout) : null;
    if (normalizedTimeout && (timeoutSec === null || !Number.isInteger(timeoutSec) || timeoutSec <= 0)) {
      setHookConfigError("Timeout must be a positive number of seconds.");
      return;
    }
    setHookConfigBusy(true);
    setHookConfigError(null);
    setHookConfigSuccess(null);
    try {
      const payload = {
        scope: hookScope,
        eventName: hookEventName,
        matcher: hookMatcher.trim() || null,
        command,
        timeoutSec,
        statusMessage: hookStatusMessage.trim() || null
      };
      if (hooksPanelMode === "edit") {
        await onUpdateHook?.({
          ...payload,
          target: editingHookTarget
        });
      } else {
        await onCreateHook?.(payload);
      }
      setHookConfigSuccess(
        `${hookScope === "project" ? "Project" : "Global"} hook ${hooksPanelMode === "edit" ? "updated" : "written"} in hooks.json and trusted.`
      );
      setHooksPanelMode("list");
      setEditingHookTarget(null);
    } catch (error) {
      setHookConfigError(
        error instanceof Error ? error.message : "Unable to write hooks.json."
      );
    } finally {
      setHookConfigBusy(false);
    }
  }, [
    editingHookTarget,
    hookCommand,
    hookEventName,
    hookMatcher,
    hookScope,
    hookStatusMessage,
    hookTimeoutSec,
    hooksPanelMode,
    onCreateHook,
    onUpdateHook
  ]);
  const trustHook = useCallback5(
    async (hook) => {
      if (!onTrustHook || !hook.currentHash) {
        setHookConfigError("Hook trust is unavailable in this view.");
        return;
      }
      setHookConfigBusy(true);
      setHookConfigError(null);
      setHookConfigSuccess(null);
      try {
        await onTrustHook({
          key: hook.key,
          currentHash: hook.currentHash
        });
        setHookConfigSuccess("Hook trusted.");
      } catch (error) {
        setHookConfigError(
          error instanceof Error ? error.message : "Unable to trust hook."
        );
      } finally {
        setHookConfigBusy(false);
      }
    },
    [onTrustHook]
  );
  const untrustHook = useCallback5(
    async (hook) => {
      if (!onUntrustHook) {
        setHookConfigError("Hook trust is unavailable in this view.");
        return;
      }
      setHookConfigBusy(true);
      setHookConfigError(null);
      setHookConfigSuccess(null);
      try {
        await onUntrustHook({
          key: hook.key
        });
        setHookConfigSuccess("Hook untrusted.");
      } catch (error) {
        setHookConfigError(
          error instanceof Error ? error.message : "Unable to untrust hook."
        );
      } finally {
        setHookConfigBusy(false);
      }
    },
    [onUntrustHook]
  );
  return {
    hooksPanelMode,
    hookScope,
    hookEventName,
    hookMatcher,
    hookCommand,
    hookTimeoutSec,
    hookStatusMessage,
    editingHookTarget,
    hookConfigBusy,
    hookConfigError,
    hookConfigSuccess,
    setHooksPanelMode,
    setEditingHookTarget,
    setHookScope,
    setHookEventName,
    setHookMatcher,
    setHookCommand,
    setHookTimeoutSec,
    setHookStatusMessage,
    clearHookConfigStatus,
    resetHookForm,
    startEditingHook,
    saveHook,
    trustHook,
    untrustHook
  };
}

// src/components/composer/useComposerMcpConfig.ts
import { useCallback as useCallback6, useState as useState9 } from "react";
var DEFAULT_RAW_MCP_BLOCK = '[mcp_servers.example_stdio]\ncommand = "npx"\nargs = ["-y", "your-mcp-server"]\n';
var MCP_CONFIG_SUCCESS_MESSAGE = "MCP entry written to provider config. Restart the backend if it does not appear immediately.";
function useComposerMcpConfig({
  hostConfigFilesAvailable,
  onReadProviderConfig,
  onWriteProviderConfig,
  setMcpPanelMode,
  onOpenMcp
}) {
  const [mcpHttpName, setMcpHttpName] = useState9("");
  const [mcpHttpUrl, setMcpHttpUrl] = useState9("");
  const [mcpRawBlock, setMcpRawBlock] = useState9("");
  const [mcpConfigPath, setMcpConfigPath] = useState9(null);
  const [mcpConfigBusy, setMcpConfigBusy] = useState9(false);
  const [mcpConfigError, setMcpConfigError] = useState9(null);
  const [mcpConfigSuccess, setMcpConfigSuccess] = useState9(null);
  const clearMcpConfigStatus = useCallback6(() => {
    setMcpConfigError(null);
    setMcpConfigSuccess(null);
  }, []);
  const loadProviderConfig = useCallback6(async () => {
    if (!hostConfigFilesAvailable || !onReadProviderConfig) {
      throw new Error(
        "Provider config editing is unavailable for this thread."
      );
    }
    const file = await onReadProviderConfig();
    setMcpConfigPath(file.path);
    return file;
  }, [hostConfigFilesAvailable, onReadProviderConfig]);
  const writeMcpConfig = useCallback6(
    async (nextContent) => {
      if (!hostConfigFilesAvailable || !onWriteProviderConfig) {
        throw new Error(
          "Provider config editing is unavailable for this thread."
        );
      }
      const updated = await onWriteProviderConfig(nextContent);
      setMcpConfigPath(updated.path);
      return updated;
    },
    [hostConfigFilesAvailable, onWriteProviderConfig]
  );
  const saveHttpMcp = useCallback6(async () => {
    const name = parseMcpServerName(mcpHttpName);
    const url = mcpHttpUrl.trim();
    if (!name) {
      setMcpConfigError(
        "MCP name must use only letters, numbers, underscore, or hyphen."
      );
      return;
    }
    if (!/^https?:\/\//i.test(url)) {
      setMcpConfigError("HTTP MCP URL must start with http:// or https://");
      return;
    }
    setMcpConfigBusy(true);
    setMcpConfigError(null);
    setMcpConfigSuccess(null);
    try {
      const file = await loadProviderConfig();
      const nextContent = upsertMcpServerBlock(
        file.content,
        name,
        renderHttpMcpBlock(name, url)
      );
      await writeMcpConfig(nextContent);
      setMcpConfigSuccess(MCP_CONFIG_SUCCESS_MESSAGE);
      setMcpPanelMode("list");
      setMcpHttpName("");
      setMcpHttpUrl("");
      void onOpenMcp?.();
    } catch (error) {
      setMcpConfigError(
        error instanceof Error ? error.message : "Unable to update provider config."
      );
    } finally {
      setMcpConfigBusy(false);
    }
  }, [
    loadProviderConfig,
    mcpHttpName,
    mcpHttpUrl,
    onOpenMcp,
    setMcpPanelMode,
    writeMcpConfig
  ]);
  const prepareRawMcpBlock = useCallback6(async () => {
    setMcpConfigBusy(true);
    setMcpConfigError(null);
    setMcpConfigSuccess(null);
    try {
      await loadProviderConfig();
      setMcpRawBlock((current) => current || DEFAULT_RAW_MCP_BLOCK);
      setMcpPanelMode("stdio");
    } catch (error) {
      setMcpConfigError(
        error instanceof Error ? error.message : "Unable to load provider config."
      );
    } finally {
      setMcpConfigBusy(false);
    }
  }, [loadProviderConfig, setMcpPanelMode]);
  const saveRawMcpBlock = useCallback6(async () => {
    const serverName = parseMcpServerNameFromBlock(mcpRawBlock);
    if (!serverName) {
      setMcpConfigError(
        "The raw MCP block must start with a header like [mcp_servers.name]."
      );
      return;
    }
    setMcpConfigBusy(true);
    setMcpConfigError(null);
    setMcpConfigSuccess(null);
    try {
      const file = await loadProviderConfig();
      const nextContent = upsertMcpServerBlock(
        file.content,
        serverName,
        mcpRawBlock
      );
      await writeMcpConfig(nextContent);
      setMcpConfigSuccess(MCP_CONFIG_SUCCESS_MESSAGE);
      setMcpPanelMode("list");
      void onOpenMcp?.();
    } catch (error) {
      setMcpConfigError(
        error instanceof Error ? error.message : "Unable to update provider config."
      );
    } finally {
      setMcpConfigBusy(false);
    }
  }, [
    loadProviderConfig,
    mcpRawBlock,
    onOpenMcp,
    setMcpPanelMode,
    writeMcpConfig
  ]);
  return {
    mcpHttpName,
    mcpHttpUrl,
    mcpRawBlock,
    mcpConfigPath,
    mcpConfigBusy,
    mcpConfigError,
    mcpConfigSuccess,
    setMcpHttpName,
    setMcpHttpUrl,
    setMcpRawBlock,
    clearMcpConfigStatus,
    prepareRawMcpBlock,
    saveHttpMcp,
    saveRawMcpBlock
  };
}

// src/components/composer/useComposerMenuLifecycle.ts
import {
  useCallback as useCallback7,
  useEffect as useEffect6,
  useState as useState10
} from "react";
function useComposerMenuLifecycle({
  openMenu,
  setOpenMenu,
  slashPanelView,
  setSlashPanelView,
  setMcpPanelMode,
  clearMcpConfigStatus,
  clearHookConfigStatus
}) {
  const [copiedSkillName, setCopiedSkillName] = useState10(null);
  useEffect6(() => {
    if (openMenu !== "slash") {
      setSlashPanelView("root");
      setMcpPanelMode("list");
      clearMcpConfigStatus();
      clearHookConfigStatus();
    }
  }, [
    clearHookConfigStatus,
    clearMcpConfigStatus,
    openMenu,
    setMcpPanelMode,
    setSlashPanelView
  ]);
  useEffect6(() => {
    if (slashPanelView !== "mcp") {
      setMcpPanelMode("list");
      clearMcpConfigStatus();
    }
  }, [clearMcpConfigStatus, setMcpPanelMode, slashPanelView]);
  useEffect6(() => {
    if (!copiedSkillName) {
      return;
    }
    const timer = window.setTimeout(() => {
      setCopiedSkillName(
        (current) => current === copiedSkillName ? null : current
      );
    }, 1400);
    return () => {
      window.clearTimeout(timer);
    };
  }, [copiedSkillName]);
  useEffect6(() => {
    function handleWindowPointerDown(event) {
      const eventPath = typeof event.composedPath === "function" ? event.composedPath() : [];
      const clickedInsideInteractiveMenu = eventPath.some(
        (node) => node instanceof HTMLElement && (node.dataset.composerMenuSurface === "true" || node.dataset.composerMenuTrigger === "true")
      );
      if (clickedInsideInteractiveMenu) {
        return;
      }
      if (openMenu) {
        setOpenMenu(null);
      }
    }
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setOpenMenu(null);
      }
    }
    if (openMenu) {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("pointerdown", handleWindowPointerDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("pointerdown", handleWindowPointerDown);
      };
    }
  }, [openMenu, setOpenMenu]);
  const copySkillInvokeName = useCallback7(async (skillName) => {
    try {
      await navigator.clipboard.writeText(`$${skillName}`);
      setCopiedSkillName(skillName);
    } catch {
      setCopiedSkillName(null);
    }
  }, []);
  return {
    copiedSkillName,
    copySkillInvokeName
  };
}

// src/components/composer/useComposerPromptDomSync.ts
import {
  useLayoutEffect as useLayoutEffect3
} from "react";
function createPromptAttachmentToken(segment, attachmentPreviewUrls) {
  const { attachment } = segment;
  const token = document.createElement("span");
  token.dataset.segmentType = "attachment";
  token.dataset.clientId = attachment.clientId;
  token.dataset.placeholder = attachment.placeholder;
  token.contentEditable = "false";
  token.className = "thread-composer-attachment-chip mx-[0.12rem] inline-flex max-w-full align-baseline";
  if (attachment.kind === "photo") {
    token.classList.add(
      "thread-composer-attachment-chip-photo",
      "rounded-[0.95rem]",
      "border",
      "border-sky-300/35",
      "bg-sky-300/10",
      "p-1",
      "shadow-sm",
      "shadow-stone-950/20"
    );
    const previewUrl = attachmentPreviewUrls[attachment.clientId];
    if (previewUrl) {
      token.setAttribute("role", "button");
      token.setAttribute("aria-label", `Open image preview: ${attachment.originalName || "Pasted image"}`);
      token.tabIndex = 0;
      token.classList.add("cursor-zoom-in");
      const image = document.createElement("img");
      image.src = previewUrl;
      image.alt = attachment.originalName || "Pasted image";
      image.className = "thread-composer-attachment-thumb h-[4.5rem] w-[6rem] rounded-[0.7rem] bg-stone-950 object-contain";
      image.draggable = false;
      token.append(image);
    } else {
      const imagePlaceholder = document.createElement("span");
      imagePlaceholder.className = "thread-composer-attachment-thumb inline-block h-[4.5rem] w-[6rem] rounded-[0.7rem] bg-stone-900/80";
      imagePlaceholder.setAttribute("aria-hidden", "true");
      token.append(imagePlaceholder);
    }
    const caption = document.createElement("span");
    caption.className = "thread-composer-attachment-caption ml-2 inline-flex max-w-[8rem] items-center text-[10px] font-medium tracking-[0.08em] text-sky-50";
    caption.textContent = attachmentDisplayLabel(attachment);
    token.append(caption);
    return token;
  }
  token.classList.add(
    "items-center",
    "gap-2",
    "rounded-[0.95rem]",
    "border",
    "border-emerald-300/35",
    "bg-emerald-300/10",
    "px-2.5",
    "py-2",
    "text-[10px]",
    "font-medium",
    "tracking-[0.08em]",
    "text-emerald-50",
    "shadow-sm",
    "shadow-stone-950/20"
  );
  const icon = document.createElement("span");
  icon.className = "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-200/25 bg-emerald-300/12 text-[9px]";
  icon.textContent = "FILE";
  const label = document.createElement("span");
  label.className = "inline-flex max-w-[10rem] truncate";
  label.textContent = attachmentDisplayLabel(attachment);
  token.append(icon, label);
  return token;
}
function buildPromptFragment(promptSegments, attachmentPreviewUrls) {
  const fragment = document.createDocumentFragment();
  for (const segment of promptSegments) {
    if (segment.type === "text") {
      fragment.append(
        document.createTextNode(segment.text === " " ? "\xA0" : segment.text)
      );
      continue;
    }
    fragment.append(createPromptAttachmentToken(segment, attachmentPreviewUrls));
  }
  return fragment;
}
function useComposerPromptDomSync({
  promptRef,
  isShellView,
  prompt,
  promptSegments,
  attachmentPreviewUrls,
  previewSignature,
  editorSanitizeNonce,
  pendingSelectionRef,
  pendingInsertedAttachmentIdsRef,
  selectionSnapshotRef,
  renderedPreviewSignatureRef,
  renderedSanitizeNonceRef,
  serializeEditorPrompt: serializeEditorPrompt2,
  restoreSelection
}) {
  useLayoutEffect3(() => {
    const editor = promptRef.current;
    if (!editor || isShellView || editor.dataset.imeComposing === "true") {
      return;
    }
    const pendingSelection = pendingSelectionRef.current;
    const shouldSyncDom = serializeEditorPrompt2() !== prompt || renderedPreviewSignatureRef.current !== previewSignature || renderedSanitizeNonceRef.current !== editorSanitizeNonce;
    if (shouldSyncDom) {
      editor.replaceChildren(
        buildPromptFragment(promptSegments, attachmentPreviewUrls)
      );
      renderedPreviewSignatureRef.current = previewSignature;
      renderedSanitizeNonceRef.current = editorSanitizeNonce;
    }
    if (pendingSelection !== null) {
      editor.focus();
      if (!restoreSelectionAfterInsertedAttachments(
        editor,
        pendingInsertedAttachmentIdsRef.current
      )) {
        restoreSelection(pendingSelection);
      }
      selectionSnapshotRef.current = pendingSelection;
    } else if (document.activeElement === editor && shouldSyncDom) {
      restoreSelection(selectionSnapshotRef.current);
    }
    pendingSelectionRef.current = null;
    pendingInsertedAttachmentIdsRef.current = [];
  }, [
    attachmentPreviewUrls,
    editorSanitizeNonce,
    isShellView,
    previewSignature,
    prompt,
    promptRef,
    promptSegments,
    pendingInsertedAttachmentIdsRef,
    pendingSelectionRef,
    renderedPreviewSignatureRef,
    renderedSanitizeNonceRef,
    restoreSelection,
    selectionSnapshotRef,
    serializeEditorPrompt2
  ]);
}

// src/components/composer/ComposerGoalComposeCard.tsx
import { jsx as jsx19, jsxs as jsxs17 } from "react/jsx-runtime";
function ComposerGoalComposeCard({
  tokenBudget,
  error,
  onTokenBudgetChange,
  onCancel
}) {
  return /* @__PURE__ */ jsxs17("div", { className: "thread-goal-compose-card relative z-20 mb-1.5 flex flex-wrap items-center gap-2 rounded-2xl border px-3 py-2 text-xs shadow-sm", children: [
    /* @__PURE__ */ jsx19("span", { className: "thread-goal-compose-label font-medium uppercase tracking-[0.16em]", children: "Goal" }),
    /* @__PURE__ */ jsxs17("label", { className: "thread-goal-compose-field flex items-center gap-2", children: [
      /* @__PURE__ */ jsx19("span", { children: "Max tokens (k)" }),
      /* @__PURE__ */ jsx19(
        "input",
        {
          "aria-label": "Goal token budget",
          value: tokenBudget,
          onChange: (event) => onTokenBudgetChange(event.target.value),
          inputMode: "numeric",
          placeholder: "Optional",
          className: "thread-goal-compose-input h-7 w-24 rounded-full border px-3 text-xs outline-none"
        }
      )
    ] }),
    error ? /* @__PURE__ */ jsx19("span", { className: "thread-goal-compose-error min-w-0 flex-1", children: error }) : null,
    /* @__PURE__ */ jsx19(
      "button",
      {
        type: "button",
        onClick: onCancel,
        className: "thread-goal-compose-cancel rounded-full border px-2.5 py-1 text-[11px] transition",
        children: "Cancel"
      }
    )
  ] });
}

// src/components/composer/ComposerPromptEditor.tsx
import { useRef as useRef6, useState as useState11 } from "react";
import { jsx as jsx20, jsxs as jsxs18 } from "react/jsx-runtime";
function hasIOSNativeBridge() {
  const nativeWindow = window;
  return Boolean(nativeWindow.webkit?.messageHandlers?.remoteCodex);
}
function ComposerPromptEditor({
  promptRef,
  prompt,
  disabled,
  promptPlaceholder,
  canInterrupt,
  interruptLabel,
  composerPromptRegionClassName,
  graphChatInputClassName,
  onInterrupt,
  onInput,
  onPointerDown,
  onPaste,
  onKeyDown,
  onKeyUp,
  onMouseUp,
  onBlur,
  onDragEnter,
  onDragOver,
  onDragLeave,
  onDrop
}) {
  const previewTrigger = useRef6(null);
  const [preview, setPreview] = useState11(null);
  function attachmentImage(target) {
    const chip = target instanceof Element ? target.closest('[data-segment-type="attachment"]') : null;
    if (chip?.querySelector("img")) previewTrigger.current = chip;
    return chip?.querySelector("img");
  }
  return /* @__PURE__ */ jsxs18(
    "div",
    {
      "data-slot": "input-group-control",
      className: `${composerPromptRegionClassName} relative w-full ${canInterrupt ? "z-[90]" : ""}`,
      children: [
        /* @__PURE__ */ jsxs18("div", { className: graphChatInputClassName, children: [
          prompt.length === 0 && promptPlaceholder && /* @__PURE__ */ jsx20(
            "span",
            {
              className: `pointer-events-none absolute left-3 top-3 truncate text-slate-500 sm:left-4 sm:top-4 dark:text-slate-400 ${canInterrupt ? "right-12" : "right-3 sm:right-4"}`,
              children: promptPlaceholder
            }
          ),
          /* @__PURE__ */ jsx20(
            "div",
            {
              ref: promptRef,
              role: "textbox",
              "aria-label": "Prompt",
              "aria-multiline": "true",
              contentEditable: !disabled,
              inputMode: "text",
              suppressContentEditableWarning: true,
              onClick: (event) => {
                const image = attachmentImage(event.target);
                if (image) {
                  event.preventDefault();
                  setPreview({ src: image.src, alt: image.alt });
                }
              },
              onPointerDown: (event) => {
                if (attachmentImage(event.target)) {
                  event.preventDefault();
                  return;
                }
                if (!disabled && document.activeElement !== event.currentTarget && hasIOSNativeBridge()) {
                  event.currentTarget.focus({ preventScroll: true });
                }
                onPointerDown?.(event);
              },
              onCompositionStart: (event) => {
                event.currentTarget.dataset.imeComposing = "true";
              },
              onCompositionEnd: (event) => {
                delete event.currentTarget.dataset.imeComposing;
                onInput();
              },
              onInput,
              onPaste,
              onKeyDown: (event) => {
                if (event.currentTarget.dataset.imeComposing === "true" || event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229) return;
                const image = attachmentImage(event.target);
                if (image && (event.key === "Enter" || event.key === " ")) {
                  event.preventDefault();
                  setPreview({ src: image.src, alt: image.alt });
                  return;
                }
                onKeyDown(event);
              },
              onKeyUp,
              onMouseUp,
              onBlur,
              onDragEnter,
              onDragOver,
              onDragLeave,
              onDrop,
              className: `relative z-[1] min-h-[4.25rem] whitespace-pre-wrap break-words pb-2 outline-none sm:min-h-[4.25rem] ${canInterrupt ? "pr-12" : ""} ${disabled ? "cursor-not-allowed text-slate-500" : ""}`
            }
          )
        ] }),
        preview ? /* @__PURE__ */ jsx20(GraphWorkspaceImageLightbox, { src: preview.src, alt: preview.alt, onClose: () => {
          setPreview(null);
          previewTrigger.current?.focus({ preventScroll: true });
        } }) : null,
        canInterrupt ? /* @__PURE__ */ jsx20(
          InputGroupButton,
          {
            type: "button",
            variant: "ghost",
            size: "icon-xs",
            "aria-label": interruptLabel,
            title: interruptLabel,
            onClick: (event) => {
              event.preventDefault();
              void onInterrupt?.();
            },
            className: "thread-graph-composer-stop-button ui-action-danger absolute right-2 top-2 z-[90] h-8 w-8 rounded-full text-sm font-medium pointer-events-auto",
            children: /* @__PURE__ */ jsx20(
              "span",
              {
                "aria-hidden": "true",
                className: "block h-2.5 w-2.5 rounded-[2px] bg-current"
              }
            )
          }
        ) : null
      ]
    }
  );
}

// src/components/composer/ComposerShellPromptInput.tsx
import { jsx as jsx21, jsxs as jsxs19 } from "react/jsx-runtime";
function ComposerShellPromptInput({
  prompt,
  promptPlaceholder,
  promptRegionClassName,
  promptInputClassName,
  interruptLabel,
  canInterrupt,
  sendButtonLabel,
  sendButtonClassName,
  sendDisabled,
  onPromptChange,
  onPromptKeyDown,
  onInterrupt
}) {
  return /* @__PURE__ */ jsxs19("div", { className: `${promptRegionClassName} relative`, children: [
    /* @__PURE__ */ jsx21(
      "textarea",
      {
        "aria-label": "Prompt",
        disabled: false,
        value: prompt,
        onChange: (event) => onPromptChange(event.target.value),
        onKeyDown: onPromptKeyDown,
        rows: 2,
        placeholder: promptPlaceholder,
        className: `${promptInputClassName} resize-y pb-10`
      }
    ),
    /* @__PURE__ */ jsx21(
      "button",
      {
        type: "button",
        "aria-label": interruptLabel,
        title: interruptLabel,
        onClick: () => void onInterrupt?.(),
        disabled: !canInterrupt,
        className: `absolute right-2.5 top-2.5 inline-flex h-8 w-8 items-center justify-center rounded-full border transition ${canInterrupt ? "border-rose-300/55 bg-rose-300/[0.14] text-rose-50 shadow-lg shadow-rose-950/20 hover:bg-rose-300/[0.22]" : "cursor-not-allowed border-stone-700/30 bg-stone-400/[0.02] text-stone-500/55 opacity-55"}`,
        children: /* @__PURE__ */ jsx21(
          "span",
          {
            "aria-hidden": "true",
            className: "block h-2.5 w-2.5 rounded-[2px] bg-current"
          }
        )
      }
    ),
    /* @__PURE__ */ jsx21(
      "button",
      {
        type: "submit",
        "aria-label": "Send Shell Input",
        onMouseDown: (event) => {
          event.preventDefault();
        },
        onPointerDown: (event) => {
          event.preventDefault();
        },
        onTouchStart: (event) => {
          event.preventDefault();
        },
        disabled: sendDisabled,
        className: `absolute bottom-2.5 right-2.5 rounded-full px-3.5 py-1.5 text-sm font-medium shadow-lg shadow-stone-950/30 transition disabled:cursor-not-allowed disabled:bg-stone-700 disabled:text-stone-300 ${sendButtonClassName}`,
        children: sendButtonLabel
      }
    )
  ] });
}

// src/components/composer/useComposerPromptSlots.tsx
import { jsx as jsx22 } from "react/jsx-runtime";
function useComposerPromptSlots({
  isShellView,
  promptRef,
  prompt,
  disabled,
  promptPlaceholder,
  canInterrupt,
  interruptLabel,
  composerPromptRegionClassName,
  graphChatInputClassName,
  promptInputClassName,
  goalComposeMode,
  goalTokenBudget,
  goalLocalError,
  goalBusy,
  busy,
  sendButtonLabel,
  sendButtonClassName,
  onInterrupt,
  onPromptInput,
  onPromptPaste,
  onPromptKeyDown,
  onPromptKeyUp,
  onPromptMouseUp,
  onPromptBlur,
  onPromptDragEnter,
  onPromptDragOver,
  onPromptDragLeave,
  onPromptDrop,
  onGoalTokenBudgetChange,
  onCancelGoal,
  onShellPromptChange
}) {
  return {
    promptSlot: !isShellView ? /* @__PURE__ */ jsx22(
      ComposerPromptEditor,
      {
        promptRef,
        prompt,
        disabled,
        promptPlaceholder,
        canInterrupt,
        interruptLabel,
        composerPromptRegionClassName,
        graphChatInputClassName,
        onInterrupt,
        onInput: onPromptInput,
        onPaste: onPromptPaste,
        onKeyDown: onPromptKeyDown,
        onKeyUp: onPromptKeyUp,
        onMouseUp: onPromptMouseUp,
        onBlur: onPromptBlur,
        onDragEnter: onPromptDragEnter,
        onDragOver: onPromptDragOver,
        onDragLeave: onPromptDragLeave,
        onDrop: onPromptDrop
      }
    ) : null,
    goalSlot: goalComposeMode && !isShellView ? /* @__PURE__ */ jsx22(
      ComposerGoalComposeCard,
      {
        tokenBudget: goalTokenBudget,
        error: goalLocalError,
        onTokenBudgetChange: onGoalTokenBudgetChange,
        onCancel: onCancelGoal
      }
    ) : null,
    shellPromptSlot: isShellView ? /* @__PURE__ */ jsx22(
      ComposerShellPromptInput,
      {
        prompt,
        promptPlaceholder,
        promptRegionClassName: composerPromptRegionClassName,
        promptInputClassName,
        interruptLabel,
        canInterrupt,
        sendButtonLabel,
        sendButtonClassName,
        sendDisabled: goalBusy || busy,
        onPromptChange: onShellPromptChange,
        onPromptKeyDown,
        onInterrupt
      }
    ) : null
  };
}

// src/components/composer/useComposerSettingsActions.ts
import { useCallback as useCallback8, useEffect as useEffect7, useState as useState12 } from "react";
function useComposerSettingsActions({
  collaborationMode,
  onUpdateSettings,
  closeMenu
}) {
  const [optimisticCollaborationMode, setOptimisticCollaborationMode] = useState12(null);
  const displayedCollaborationMode = optimisticCollaborationMode ?? collaborationMode;
  useEffect7(() => {
    setOptimisticCollaborationMode(null);
  }, [collaborationMode]);
  const updateSettings = useCallback8(
    async (input) => {
      const settingsUpdateDecision = deriveComposerSettingsUpdateDecision({
        nextMode: input.collaborationMode,
        previousOptimisticMode: optimisticCollaborationMode
      });
      if (settingsUpdateDecision.optimisticMode) {
        setOptimisticCollaborationMode(settingsUpdateDecision.optimisticMode);
      }
      try {
        await onUpdateSettings?.(input);
        if (settingsUpdateDecision.closeMenuOnSuccess) {
          closeMenu();
        }
      } catch (error) {
        if (settingsUpdateDecision.shouldRollbackMode) {
          setOptimisticCollaborationMode(settingsUpdateDecision.rollbackMode);
        }
        throw error;
      }
    },
    [closeMenu, onUpdateSettings, optimisticCollaborationMode]
  );
  return {
    displayedCollaborationMode,
    updateSettings
  };
}

// src/components/composer/useComposerToolbarProps.ts
function useComposerToolbarProps({
  isShellView,
  canToggleShellView,
  isMobileShell,
  shellPromptLabel,
  openMenu,
  toolbarClassName,
  iconButtonClassName,
  menuClassName,
  menuItemClassName: menuItemClassName2,
  panelButtonClassName,
  chipButtonClassName,
  inlineToggleClassName,
  sendButtonBaseClassName,
  slashPanelView,
  availableToolboxItems,
  busy,
  settingsBusy,
  compactBusy,
  forkBusy,
  forkError,
  fastMode,
  goalComposeMode,
  goalBusy,
  goalStatus,
  activeView,
  disabled,
  model,
  modelOptions,
  modelContextTitle,
  contextUsage,
  reasoningEffort,
  supportedEfforts,
  displayedCollaborationMode,
  sandboxMode,
  sendButtonLabel,
  sendButtonClassName,
  modelControlsDisabled,
  effortControlsDisabled,
  effortControlTitle,
  forkTurnOptionsState,
  skillsState,
  goalState,
  goalHistory,
  copiedSkillName,
  hooksPanelMode,
  hooksState,
  hookConfigBusy,
  hookConfigError,
  hookConfigSuccess,
  editingHookTarget,
  hookScope,
  hookEventName,
  hookMatcher,
  hookCommand,
  hookTimeoutSec,
  hookStatusMessage,
  mcpPanelMode,
  mcpState,
  mcpConfigPath,
  mcpConfigError,
  mcpConfigSuccess,
  mcpConfigBusy,
  mcpHttpName,
  mcpHttpUrl,
  mcpRawBlock,
  capabilities,
  shellControlState,
  onToggleView,
  onDismissPromptFocus,
  onSetOpenMenu,
  onToolboxItemClick,
  onSetSlashPanelView,
  onViewGoals,
  onUpdateGoal,
  onOpenForkTurns,
  onForkLatest,
  onForkTurn,
  onCopySkillInvokeName,
  onResetHookForm,
  onSetHooksPanelMode,
  onClearHookConfigStatus,
  onSetEditingHookTarget,
  onSetHookScope,
  onSetHookEventName,
  onSetHookMatcher,
  onSetHookCommand,
  onSetHookTimeoutSec,
  onSetHookStatusMessage,
  onSaveHook,
  onStartEditingHook,
  onTrustHook,
  onUntrustHook,
  onSetMcpPanelMode,
  onClearMcpConfigStatus,
  onSetMcpHttpName,
  onSetMcpHttpUrl,
  onSetMcpRawBlock,
  onPrepareRawMcpBlock,
  onSaveHttpMcp,
  onSaveRawMcpBlock,
  onPickPhoto,
  onPickFile,
  onUpdateSettings,
  onPasteShell,
  onCopyShell,
  onClearShell,
  onShellControl
}) {
  const slashToolboxProps = isShellView ? null : {
    open: openMenu === "slash",
    slashPanelView,
    availableToolboxItems,
    planModeAvailable: capabilities.planMode,
    forkFromTurnAvailable: capabilities.forkFromTurn,
    displayedCollaborationMode,
    settingsBusy,
    busy,
    forkBusy,
    forkError,
    forkTurnOptionsState,
    skillsState,
    goalState,
    goalHistory,
    goalBusy,
    copiedSkillName,
    hooksPanelMode,
    hooksState,
    hostConfigFilesAvailable: capabilities.hostConfigFiles,
    hookTrustAvailable: capabilities.hookTrust,
    hookConfigBusy,
    hookConfigError,
    hookConfigSuccess,
    editingHookTarget,
    hookScope,
    hookEventName,
    hookMatcher,
    hookCommand,
    hookTimeoutSec,
    hookStatusMessage,
    mcpPanelMode,
    mcpState,
    mcpConfigEditing: capabilities.mcpConfigEditing,
    mcpConfigPath,
    mcpConfigError,
    mcpConfigSuccess,
    mcpConfigBusy,
    mcpHttpName,
    mcpHttpUrl,
    mcpRawBlock,
    iconButtonClassName,
    menuClassName,
    menuItemClassName: menuItemClassName2,
    panelButtonClassName,
    chipButtonClassName,
    onToggle: () => onSetOpenMenu(
      (current) => current === "slash" ? null : "slash"
    ),
    onToolboxItemClick,
    onUpdateSettings,
    toolboxItemDisabled: (item) => toolboxItemDisabled(item, {
      settingsBusy,
      compactBusy,
      busy,
      forkBusy
    }),
    toolboxItemClassName: (item) => toolboxItemClassName(item, {
      fastMode,
      goalComposeMode,
      goalStatus,
      menuItemClassName: menuItemClassName2
    }),
    toolboxItemStatus: (item) => toolboxItemStatus(item, {
      fastMode,
      compactBusy,
      goalComposeMode,
      goalStatus,
      busy
    }),
    onSetSlashPanelView,
    onViewGoals,
    onUpdateGoal,
    onOpenForkTurns,
    onForkLatest,
    onForkTurn,
    onCopySkillInvokeName,
    onResetHookForm,
    onSetHooksPanelMode,
    onClearHookConfigStatus,
    onSetEditingHookTarget,
    onSetHookScope,
    onSetHookEventName,
    onSetHookMatcher,
    onSetHookCommand,
    onSetHookTimeoutSec,
    onSetHookStatusMessage,
    onSaveHook,
    onStartEditingHook,
    onTrustHook,
    onUntrustHook,
    onSetMcpPanelMode,
    onClearMcpConfigStatus,
    onSetMcpHttpName,
    onSetMcpHttpUrl,
    onSetMcpRawBlock,
    onPrepareRawMcpBlock,
    onSaveHttpMcp,
    onSaveRawMcpBlock
  };
  const attachmentMenuProps = isShellView ? null : {
    open: openMenu === "attachments",
    iconButtonClassName,
    menuClassName,
    menuItemClassName: menuItemClassName2,
    onToggle: () => onSetOpenMenu(
      (current) => current === "attachments" ? null : "attachments"
    ),
    onPickPhoto,
    onPickFile
  };
  const settingsToolbarProps = isShellView ? null : {
    openMenu,
    model,
    modelOptions,
    modelContextTitle,
    contextUsage,
    reasoningEffort,
    supportedEfforts,
    sandboxMode,
    sandboxModeAvailable: capabilities.sandboxMode,
    settingsBusy,
    goalComposeMode,
    goalBusy,
    activeView,
    disabled,
    fastMode,
    sendButtonLabel,
    sendButtonClassName,
    modelControlsDisabled,
    effortControlsDisabled,
    effortControlTitle,
    inlineToggleClassName,
    menuItemClassName: menuItemClassName2,
    sendButtonBaseClassName,
    onSetOpenMenu,
    onUpdateSettings
  };
  const shellToolsPanelProps = openMenu === "shellTools" ? {
    busy,
    shellControlState,
    onPaste: onPasteShell,
    onCopy: onCopyShell,
    onClear: onClearShell,
    onShellControl
  } : null;
  return {
    isShellView,
    canToggleShellView,
    isMobileShell,
    shellPromptLabel,
    openMenu,
    toolbarClassName,
    iconButtonClassName,
    slashToolboxProps,
    attachmentMenuProps,
    settingsToolbarProps,
    shellToolsPanelProps,
    shellControlState,
    onToggleView,
    onDismissPromptFocus,
    onSetOpenMenu
  };
}

// src/components/ThreadComposer.tsx
import { jsx as jsx23 } from "react/jsx-runtime";
function ThreadComposer({
  activeView,
  edgeToEdgeMobile = false,
  busy = false,
  settingsBusy = false,
  compactBusy = false,
  error,
  model = null,
  reasoningEffort = null,
  fastMode = false,
  collaborationMode = "default",
  sandboxMode = null,
  hideSandboxModeControl = false,
  modelOptions = [],
  contextUsage = null,
  capabilities = null,
  toolboxItems = null,
  hookCommandTemplates = null,
  mcpConfigFormat = "none",
  followTail = false,
  threadConnected = true,
  shellAvailable = true,
  disabled = false,
  disabledPlaceholder,
  shellControlState = null,
  draftPrompt,
  draftAttachments,
  onPickAttachment,
  skillsState = {
    status: "idle",
    data: null,
    error: null
  },
  mcpState = {
    status: "idle",
    data: null,
    error: null
  },
  hooksState = {
    status: "idle",
    data: null,
    error: null
  },
  goalState = {
    status: "idle",
    data: null,
    error: null
  },
  goalHistory = [],
  forkTurnOptionsState = {
    status: "idle",
    data: null,
    error: null
  },
  onDraftChange,
  onSubmit,
  onInterrupt,
  onCompact,
  onOpenSkills,
  onOpenMcp,
  onOpenHooks,
  onOpenHarness,
  onCreateHook,
  onUpdateHook,
  onTrustHook,
  onUntrustHook,
  onOpenGoal,
  onPrepareGoalSubmit,
  onUpdateGoal,
  onOpenForkTurns,
  onForkLatest,
  onForkTurn,
  onReadProviderConfig,
  onWriteProviderConfig,
  onToggleFollow,
  canJumpToPreviousTurn,
  onJumpToPreviousTurn,
  canJumpToNextTurn,
  onJumpToNextTurn,
  subscriptionUsage,
  onUpdateSettings,
  onToggleView,
  onShellCopy,
  onShellControl,
  canInterrupt = false,
  pendingPrompts = [],
  onSteerPendingPrompt,
  onCancelPendingPrompt
}) {
  const [openMenu, setOpenMenu] = useState13(null);
  const [slashPanelView, setSlashPanelView] = useState13("root");
  const submitInFlightRef = useRef7(false);
  const [mcpPanelMode, setMcpPanelMode] = useState13("list");
  const slashCapabilities = useMemo2(
    () => ({
      fast: capabilities?.controls.performanceMode ?? false,
      compact: capabilities?.turns.compact ?? false,
      goal: capabilities?.controls.goals ?? false,
      fork: Boolean(capabilities?.branching.fork && onForkLatest),
      forkFromTurn: Boolean((capabilities?.branching.forkAt ?? capabilities?.branching.resumeAt) && onForkTurn && onOpenForkTurns),
      skills: capabilities?.management.skills ?? false,
      mcp: capabilities?.management.mcpStatus ?? false,
      hooks: capabilities?.management.hooks ?? false,
      hostConfigFiles: capabilities?.management.hostConfigFiles ?? false,
      mcpConfigEditing: mcpConfigFormat === "codex-toml" && Boolean(capabilities?.management.hostConfigFiles) && Boolean(onReadProviderConfig) && Boolean(onWriteProviderConfig),
      hookTrust: capabilities?.management.hookTrust ?? false,
      planMode: capabilities?.controls.planMode ?? false,
      sandboxMode: capabilities?.controls.sandboxMode ?? false
    }),
    [
      capabilities,
      onForkLatest,
      onForkTurn,
      onOpenForkTurns,
      mcpConfigFormat,
      onReadProviderConfig,
      onWriteProviderConfig
    ]
  );
  const availableToolboxItems = useMemo2(
    () => filterToolboxItemsForCapabilities(toolboxItems, slashCapabilities),
    [slashCapabilities, toolboxItems]
  );
  const menuRef = useRef7(null);
  const promptRef = useRef7(null);
  const photoInputRef = useRef7(null);
  const fileInputRef = useRef7(null);
  const pendingSelectionRef = useRef7(
    null
  );
  const pendingInsertedAttachmentIdsRef = useRef7([]);
  const selectionSnapshotRef = useRef7(
    null
  );
  const renderedPreviewSignatureRef = useRef7("");
  const renderedSanitizeNonceRef = useRef7(0);
  const isShellView = activeView === "shell";
  const canToggleShellView = shellAvailable || isShellView;
  const isMobileShell = Boolean(
    isShellView && shellControlState?.isMobileShell
  );
  const shellPromptLabel = shellControlState?.promptLabel ?? null;
  const [isDragTargetActive, setIsDragTargetActive] = useState13(false);
  const [editorSanitizeNonce, setEditorSanitizeNonce] = useState13(0);
  const {
    prompt,
    attachments,
    isDraftControlled,
    updateDraft,
    flushControlledDraftToHost
  } = useComposerDraft({
    isShellView,
    draftPrompt,
    draftAttachments,
    onDraftChange
  });
  const attachmentPreviewUrls = useAttachmentPreviewUrls({
    attachments,
    isShellView
  });
  const {
    displayedCollaborationMode,
    updateSettings: handleUpdateSettings
  } = useComposerSettingsActions({
    collaborationMode,
    onUpdateSettings,
    closeMenu: () => setOpenMenu(null)
  });
  const { forkBusy, forkError, forkLatest, forkTurn } = useComposerForkActions({
    slashPanelView,
    onForkLatest,
    onForkTurn,
    closeMenu: () => setOpenMenu(null)
  });
  const {
    hooksPanelMode,
    hookScope,
    hookEventName,
    hookMatcher,
    hookCommand,
    hookTimeoutSec,
    hookStatusMessage,
    editingHookTarget,
    hookConfigBusy,
    hookConfigError,
    hookConfigSuccess,
    setHooksPanelMode,
    setEditingHookTarget,
    setHookScope,
    setHookEventName,
    setHookMatcher,
    setHookCommand,
    setHookTimeoutSec,
    setHookStatusMessage,
    clearHookConfigStatus,
    resetHookForm,
    startEditingHook,
    saveHook,
    trustHook,
    untrustHook
  } = useComposerHookConfig({
    slashPanelView,
    hookCommandTemplates,
    onCreateHook,
    onUpdateHook,
    onTrustHook,
    onUntrustHook
  });
  const {
    goalComposeMode,
    goalTokenBudget,
    goalBusy,
    goalLocalError,
    setGoalTokenBudget,
    submitGoal,
    enterGoalComposeMode,
    exitGoalComposeMode
  } = useComposerGoal({
    prompt,
    goalTokenBudgetSource: goalState.data,
    promptRef,
    onOpenGoal,
    onPrepareGoalSubmit,
    onUpdateGoal,
    updateDraft,
    closeMenu: () => setOpenMenu(null),
    resetSlashPanel: () => setSlashPanelView("root")
  });
  const {
    mcpHttpName,
    mcpHttpUrl,
    mcpRawBlock,
    mcpConfigPath,
    mcpConfigBusy,
    mcpConfigError,
    mcpConfigSuccess,
    setMcpHttpName,
    setMcpHttpUrl,
    setMcpRawBlock,
    clearMcpConfigStatus,
    prepareRawMcpBlock,
    saveHttpMcp,
    saveRawMcpBlock
  } = useComposerMcpConfig({
    hostConfigFilesAvailable: slashCapabilities.hostConfigFiles,
    onReadProviderConfig,
    onWriteProviderConfig,
    setMcpPanelMode,
    onOpenMcp
  });
  const { copiedSkillName, copySkillInvokeName } = useComposerMenuLifecycle({
    openMenu,
    setOpenMenu,
    slashPanelView,
    setSlashPanelView,
    setMcpPanelMode,
    clearMcpConfigStatus,
    clearHookConfigStatus
  });
  const setPrompt = useCallback9((next) => {
    updateDraft((current) => {
      if (typeof next === "function") {
        const resolved = next(current.prompt, current.attachments);
        return {
          prompt: resolved.prompt,
          attachments: resolved.attachments ?? current.attachments
        };
      }
      return {
        prompt: next,
        attachments: current.attachments
      };
    });
  }, [updateDraft]);
  const currentModel = useMemo2(
    () => modelOptions.find((entry) => entry.model === model) ?? null,
    [model, modelOptions]
  );
  const modelContextTitle = formatModelContextTitle(model, contextUsage);
  const supportedEfforts = currentModel?.supportedReasoningEfforts ?? [];
  const promptSegments = useMemo2(
    () => tokenizePrompt(prompt, attachments),
    [attachments, prompt]
  );
  const previewSignature = useMemo2(
    () => Object.entries(attachmentPreviewUrls).sort(([leftId], [rightId]) => leftId.localeCompare(rightId)).map(([clientId, previewUrl]) => `${clientId}:${previewUrl}`).join("|"),
    [attachmentPreviewUrls]
  );
  function handleToolboxItemClick(item, event) {
    event.stopPropagation();
    const decision = toolboxItemActionDecision(item, {
      fastMode,
      goalComposeMode
    });
    switch (decision.type) {
      case "toggleFast":
        void handleUpdateSettings({
          fastMode: decision.fastMode
        });
        break;
      case "runCompact":
        setOpenMenu(null);
        void onCompact?.();
        break;
      case "enterGoalCompose":
        enterGoalComposeMode();
        break;
      case "exitGoalCompose":
        exitGoalComposeMode();
        setOpenMenu(null);
        break;
      case "openPanel":
        setSlashPanelView(decision.panel);
        if (decision.panel === "skills") {
          void onOpenSkills?.();
        } else if (decision.panel === "mcp") {
          void onOpenMcp?.();
        } else if (decision.panel === "hooks") {
          void onOpenHooks?.();
        }
        break;
      case "insertPrompt":
        insertPlainTextIntoPrompt(decision.text);
        setSlashPanelView("root");
        setOpenMenu(null);
        break;
      case "openHarness":
        setOpenMenu(null);
        void onOpenHarness?.();
        break;
      case "noop":
        break;
    }
  }
  function snapshotSelection() {
    const editor = promptRef.current;
    return editor ? snapshotEditorSelection(editor) : null;
  }
  const restoreSelection = useCallback9(
    (selection) => {
      const editor = promptRef.current;
      if (!editor || !selection) {
        return;
      }
      restoreEditorSelection(editor, selection);
    },
    []
  );
  const serializeEditorPrompt2 = useCallback9(() => {
    const editor = promptRef.current;
    return editor ? serializeEditorPrompt(editor) : prompt;
  }, [prompt]);
  const { appendAttachments, appendDroppedAttachments } = useComposerAttachments({
    prompt,
    attachments,
    updateDraft,
    getSelection: snapshotSelection,
    selectionSnapshotRef,
    pendingSelectionRef,
    pendingInsertedAttachmentIdsRef,
    onInserted: () => setOpenMenu(null)
  });
  const pickAttachment = useCallback9(
    (kind, inputRef) => {
      dismissPromptFocus();
      if (onPickAttachment) {
        onPickAttachment({
          kind,
          appendAttachments: (files, overrideKind = kind) => appendAttachments(files, overrideKind),
          defaultPick: () => inputRef.current?.click()
        });
        return;
      }
      inputRef.current?.click();
    },
    [appendAttachments, dismissPromptFocus, onPickAttachment]
  );
  function insertPlainTextIntoPrompt(text) {
    if (!text) {
      return;
    }
    const selection = snapshotSelection() ?? selectionSnapshotRef.current;
    const start = selection?.start ?? prompt.length;
    const end = selection?.end ?? start;
    const normalizedText = normalizePromptText(text);
    const nextPrompt = `${prompt.slice(0, start)}${normalizedText}${prompt.slice(end)}`;
    updateDraft((current) => ({
      prompt: nextPrompt,
      attachments: current.attachments
    }));
    const nextCaret = start + normalizedText.length;
    pendingSelectionRef.current = {
      start: nextCaret,
      end: nextCaret
    };
    selectionSnapshotRef.current = {
      start: nextCaret,
      end: nextCaret
    };
  }
  useComposerPromptDomSync({
    promptRef,
    isShellView,
    prompt,
    promptSegments,
    attachmentPreviewUrls,
    previewSignature,
    editorSanitizeNonce,
    pendingSelectionRef,
    pendingInsertedAttachmentIdsRef,
    selectionSnapshotRef,
    renderedPreviewSignatureRef,
    renderedSanitizeNonceRef,
    serializeEditorPrompt: serializeEditorPrompt2,
    restoreSelection
  });
  function dismissPromptFocus() {
    promptRef.current?.blur();
    if (document.activeElement instanceof HTMLElement && document.activeElement !== document.body) {
      document.activeElement.blur();
    }
  }
  async function pasteClipboardIntoPrompt() {
    dismissPromptFocus();
    setOpenMenu(null);
    if (!navigator.clipboard?.readText) {
      return;
    }
    try {
      const clipboardText = await navigator.clipboard.readText();
      insertPlainTextIntoPrompt(clipboardText);
    } catch {
      return;
    }
  }
  async function submitPrompt() {
    if (submitInFlightRef.current) {
      return;
    }
    submitInFlightRef.current = true;
    try {
      if (isDraftControlled) {
        flushControlledDraftToHost();
      }
      if (goalComposeMode && !isShellView) {
        await submitGoal();
        return;
      }
      const submitInput = buildComposerSubmitInput({
        prompt,
        attachments,
        isShellView
      });
      if (!submitInput) {
        return;
      }
      const submitted = await onSubmit(submitInput);
      if (submitted === false) {
        return;
      }
      updateDraft(() => ({
        prompt: "",
        attachments: []
      }));
    } finally {
      submitInFlightRef.current = false;
    }
  }
  async function handleSubmit(event) {
    event.preventDefault();
    await submitPrompt();
  }
  function handlePromptInput() {
    if (promptRef.current?.dataset.imeComposing === "true") return;
    const nextPrompt = serializeEditorPrompt2();
    const nextSelection = snapshotSelection();
    selectionSnapshotRef.current = nextSelection;
    const editor = promptRef.current;
    const needsPlainTextDomSync = editor ? editorContainsStyledRichText(editor) : false;
    if (needsPlainTextDomSync) {
      pendingSelectionRef.current = nextSelection;
      setEditorSanitizeNonce((current) => current + 1);
    }
    updateDraft((current) => ({
      prompt: nextPrompt,
      attachments: current.attachments.filter(
        (attachment) => nextPrompt.includes(attachment.placeholder)
      )
    }), "deferred");
  }
  function handlePromptPaste(event) {
    const files = extractFilesFromTransfer(
      event.clipboardData?.items,
      event.clipboardData?.files
    );
    const pasteAction = derivePromptPasteAction({
      files,
      plainText: event.clipboardData?.getData("text/plain") ?? "",
      htmlText: event.clipboardData?.getData("text/html") ?? "",
      htmlToText: textFromClipboardHtml
    });
    if (pasteAction.preventDefault) {
      event.preventDefault();
    }
    if (pasteAction.type === "insert-text") {
      insertPlainTextIntoPrompt(pasteAction.text);
    } else if (pasteAction.type === "append-files") {
      appendDroppedAttachments(pasteAction.files);
    }
  }
  function handlePromptDragEnter(event) {
    const dragAction = derivePromptFileDragAction(
      hasTransferFiles(event.dataTransfer?.items, event.dataTransfer?.files)
    );
    if (dragAction.preventDefault) {
      event.preventDefault();
    }
    if (dragAction.activateDragTarget) {
      setIsDragTargetActive(true);
    }
  }
  function handlePromptDragOver(event) {
    const dragAction = derivePromptFileDragAction(
      hasTransferFiles(event.dataTransfer?.items, event.dataTransfer?.files)
    );
    if (dragAction.preventDefault) {
      event.preventDefault();
    }
    if (dragAction.activateDragTarget && event.dataTransfer) {
      event.dataTransfer.dropEffect = "copy";
    }
    if (dragAction.activateDragTarget) {
      setIsDragTargetActive(true);
    }
  }
  function handlePromptDragLeave(event) {
    if (event.currentTarget.contains(event.relatedTarget)) {
      return;
    }
    setIsDragTargetActive(false);
  }
  function handlePromptDrop(event) {
    const files = extractFilesFromTransfer(
      event.dataTransfer?.items,
      event.dataTransfer?.files
    );
    const dropAction = derivePromptDropAction(files);
    if (dropAction.preventDefault) {
      event.preventDefault();
    }
    if (dropAction.type === "accept-files") {
      setIsDragTargetActive(false);
      appendDroppedAttachments(dropAction.files ?? []);
    }
  }
  function handlePromptKeyDown(event) {
    if (event.key === "Enter" && event.repeat) {
      event.preventDefault();
      return;
    }
    if (activeView === "chat" && event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey && !busy && !disabled && availableToolboxItems.length > 0 && serializeEditorPrompt2().trim().length === 0) {
      event.preventDefault();
      setSlashPanelView("root");
      setOpenMenu("slash");
      return;
    }
    const keyAction = derivePromptKeyDownAction({
      key: event.key,
      metaKey: event.metaKey,
      ctrlKey: event.ctrlKey,
      busy,
      disabled
    });
    if (keyAction.preventDefault) {
      event.preventDefault();
    }
    if (keyAction.submit) {
      void submitPrompt();
    }
  }
  const {
    promptPlaceholder,
    interruptLabel,
    sendButtonLabel,
    sendButtonClassName,
    modelControlsDisabled,
    effortControlsDisabled,
    effortControlTitle
  } = buildComposerControlState({
    goalComposeMode,
    goalBusy,
    threadConnected,
    busy,
    isShellView,
    disabledPlaceholder,
    settingsBusy,
    supportedEffortCount: supportedEfforts.length,
    fastMode
  });
  const {
    composerLayerClassName,
    formClassName,
    composerShellClassName,
    composerToolbarClassName,
    composerIconButtonClassName,
    composerMenuClassName,
    composerMenuItemClassName,
    composerInlineToggleClassName,
    composerPanelButtonClassName,
    composerChipButtonClassName,
    composerSendButtonClassName,
    composerPromptRegionClassName,
    promptInputClassName,
    graphChatInputGroupClassName,
    graphChatInputClassName
  } = buildComposerClassNames({
    isShellView,
    edgeToEdgeMobile,
    isMobileShell,
    openMenu: openMenu !== null,
    isDragTargetActive,
    busy
  });
  const toolbarProps = useComposerToolbarProps({
    isShellView,
    canToggleShellView,
    isMobileShell,
    shellPromptLabel,
    openMenu,
    toolbarClassName: composerToolbarClassName,
    iconButtonClassName: composerIconButtonClassName,
    menuClassName: composerMenuClassName,
    menuItemClassName: composerMenuItemClassName,
    panelButtonClassName: composerPanelButtonClassName,
    chipButtonClassName: composerChipButtonClassName,
    inlineToggleClassName: composerInlineToggleClassName,
    sendButtonBaseClassName: composerSendButtonClassName,
    slashPanelView,
    availableToolboxItems,
    busy,
    settingsBusy,
    compactBusy,
    forkBusy,
    forkError,
    fastMode,
    goalComposeMode,
    goalBusy,
    goalStatus: goalState.data?.status,
    activeView,
    disabled,
    model,
    modelOptions,
    modelContextTitle,
    contextUsage,
    reasoningEffort,
    supportedEfforts,
    displayedCollaborationMode,
    sandboxMode,
    sendButtonLabel,
    sendButtonClassName,
    modelControlsDisabled,
    effortControlsDisabled,
    effortControlTitle,
    forkTurnOptionsState,
    skillsState,
    goalState,
    goalHistory,
    copiedSkillName,
    hooksPanelMode,
    hooksState,
    hookConfigBusy,
    hookConfigError,
    hookConfigSuccess,
    editingHookTarget,
    hookScope,
    hookEventName,
    hookMatcher,
    hookCommand,
    hookTimeoutSec,
    hookStatusMessage,
    mcpPanelMode,
    mcpState,
    mcpConfigPath,
    mcpConfigError,
    mcpConfigSuccess,
    mcpConfigBusy,
    mcpHttpName,
    mcpHttpUrl,
    mcpRawBlock,
    capabilities: {
      hostConfigFiles: slashCapabilities.hostConfigFiles,
      hookTrust: slashCapabilities.hookTrust,
      mcpConfigEditing: slashCapabilities.mcpConfigEditing,
      planMode: slashCapabilities.planMode,
      forkFromTurn: slashCapabilities.forkFromTurn,
      sandboxMode: hideSandboxModeControl ? false : slashCapabilities.sandboxMode
    },
    shellControlState,
    onToggleView,
    onDismissPromptFocus: dismissPromptFocus,
    onSetOpenMenu: setOpenMenu,
    onToolboxItemClick: handleToolboxItemClick,
    onSetSlashPanelView: setSlashPanelView,
    onViewGoals: onOpenGoal,
    onUpdateGoal,
    onOpenForkTurns: () => onOpenForkTurns?.(),
    onForkLatest: forkLatest,
    onForkTurn: forkTurn,
    onCopySkillInvokeName: copySkillInvokeName,
    onResetHookForm: resetHookForm,
    onSetHooksPanelMode: setHooksPanelMode,
    onClearHookConfigStatus: clearHookConfigStatus,
    onSetEditingHookTarget: setEditingHookTarget,
    onSetHookScope: setHookScope,
    onSetHookEventName: setHookEventName,
    onSetHookMatcher: setHookMatcher,
    onSetHookCommand: setHookCommand,
    onSetHookTimeoutSec: setHookTimeoutSec,
    onSetHookStatusMessage: setHookStatusMessage,
    onSaveHook: saveHook,
    onStartEditingHook: startEditingHook,
    onTrustHook: trustHook,
    onUntrustHook: untrustHook,
    onSetMcpPanelMode: setMcpPanelMode,
    onClearMcpConfigStatus: clearMcpConfigStatus,
    onSetMcpHttpName: setMcpHttpName,
    onSetMcpHttpUrl: setMcpHttpUrl,
    onSetMcpRawBlock: setMcpRawBlock,
    onPrepareRawMcpBlock: prepareRawMcpBlock,
    onSaveHttpMcp: saveHttpMcp,
    onSaveRawMcpBlock: saveRawMcpBlock,
    onPickPhoto: () => pickAttachment("photo", photoInputRef),
    onPickFile: () => pickAttachment("file", fileInputRef),
    onUpdateSettings: (input) => void handleUpdateSettings(input),
    onPasteShell: () => void pasteClipboardIntoPrompt(),
    onCopyShell: () => {
      dismissPromptFocus();
      setOpenMenu(null);
      void onShellCopy?.();
    },
    onClearShell: () => {
      dismissPromptFocus();
      setOpenMenu(null);
      void onSubmit({ prompt: "clear" });
    },
    onShellControl: (action) => {
      dismissPromptFocus();
      setOpenMenu(null);
      void onShellControl?.(action);
    }
  });
  const {
    promptSlot,
    goalSlot,
    shellPromptSlot
  } = useComposerPromptSlots({
    isShellView,
    promptRef,
    prompt,
    disabled,
    promptPlaceholder,
    canInterrupt,
    interruptLabel,
    composerPromptRegionClassName,
    graphChatInputClassName,
    promptInputClassName,
    goalComposeMode,
    goalTokenBudget,
    goalLocalError,
    goalBusy,
    busy,
    sendButtonLabel,
    sendButtonClassName,
    onInterrupt,
    onPromptInput: handlePromptInput,
    onPromptPaste: handlePromptPaste,
    onPromptKeyDown: handlePromptKeyDown,
    onPromptKeyUp: () => {
      selectionSnapshotRef.current = snapshotSelection();
    },
    onPromptMouseUp: () => {
      selectionSnapshotRef.current = snapshotSelection();
    },
    onPromptBlur: () => {
      selectionSnapshotRef.current = snapshotSelection();
      setIsDragTargetActive(false);
      if (isDraftControlled) {
        flushControlledDraftToHost();
      }
    },
    onPromptDragEnter: handlePromptDragEnter,
    onPromptDragOver: handlePromptDragOver,
    onPromptDragLeave: handlePromptDragLeave,
    onPromptDrop: handlePromptDrop,
    onGoalTokenBudgetChange: setGoalTokenBudget,
    onCancelGoal: exitGoalComposeMode,
    onShellPromptChange: setPrompt
  });
  return /* @__PURE__ */ jsx23(
    ComposerFrame,
    {
      activeView,
      layerClassName: composerLayerClassName,
      formClassName,
      shellClassName: composerShellClassName,
      inputGroupClassName: graphChatInputGroupClassName,
      error,
      followTail,
      photoInputRef,
      fileInputRef,
      onAppendAttachments: appendAttachments,
      onToggleFollow,
      canJumpToPreviousTurn,
      onJumpToPreviousTurn,
      canJumpToNextTurn,
      onJumpToNextTurn,
      subscriptionUsage,
      onSubmit: handleSubmit,
      formRef: menuRef,
      promptSlot,
      pendingQueueSlot: !isShellView && pendingPrompts.length > 0 ? /* @__PURE__ */ jsx23(
        ComposerPendingQueue,
        {
          prompts: pendingPrompts,
          onSteer: onSteerPendingPrompt,
          onCancel: onCancelPendingPrompt
        }
      ) : null,
      toolbarSlot: /* @__PURE__ */ jsx23(ComposerToolbar, { ...toolbarProps }),
      goalSlot,
      shellPromptSlot
    }
  );
}

// src/components/ThreadWorkspaceLayout.tsx
import { useEffect as useEffect10, useMemo as useMemo3, useRef as useRef9, useState as useState14 } from "react";
import {
  ArrowLeft,
  ChevronsLeft,
  ChevronsRight,
  Check as Check2,
  Copy,
  Folder,
  MessageSquare,
  LoaderCircle,
  CircleAlert,
  Monitor,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Pencil,
  Plus,
  Rows3,
  Settings,
  Sun,
  Trash2,
  X as X2
} from "lucide-react";

// src/app-shell/AppShellNavContext.tsx
import { createContext, useContext } from "react";
var AppShellNavContext = createContext(
  null
);
function useAppShellNav() {
  return useContext(AppShellNavContext);
}

// src/components/threadPresentation.ts
function formatShortTimestamp(value) {
  if (!value) {
    return "Time unavailable";
  }
  return new Date(value).toLocaleString([], {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit"
  });
}
function formatLongTimestamp(value) {
  if (!value) {
    return "Time unavailable";
  }
  return new Date(value).toLocaleString();
}
function formatMessageTime(value, precise) {
  if (!value) {
    return "Time unavailable";
  }
  const date = new Date(value);
  const now = /* @__PURE__ */ new Date();
  const isToday = date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate();
  const options = {
    hour: "numeric",
    minute: "2-digit",
    ...precise ? { second: "2-digit" } : {}
  };
  if (isToday) {
    return date.toLocaleTimeString([], options);
  }
  return date.toLocaleString([], {
    ...options,
    month: "short",
    day: "numeric",
    ...date.getFullYear() !== now.getFullYear() ? { year: "numeric" } : {}
  });
}
function formatMessageTimestamp(value) {
  return formatMessageTime(value, false);
}
function formatPreciseMessageTimestamp(value) {
  return formatMessageTime(value, true);
}
function threadStatusLabel(status) {
  switch (status) {
    case "recovering":
      return "Confirming status";
    case "idle":
      return "Idle";
    case "running":
      return "Running";
    case "interrupted":
      return "Interrupted";
    case "failed":
      return "Failed";
    case "not_loaded":
      return "Not Loaded";
    case "system_error":
      return "System Error";
  }
}
function threadStatusClassName(status) {
  switch (status) {
    case "idle":
      return "ui-status-neutral";
    case "running":
      return "ui-status-info";
    case "recovering":
    case "interrupted":
      return "ui-status-warning";
    case "failed":
    case "system_error":
      return "ui-status-danger";
    case "not_loaded":
      return "ui-status-neutral";
  }
}
function turnStatusLabel(status) {
  switch (status) {
    case "recovering":
      return "Confirming status";
    case "sending":
      return "Sending";
    case "completed":
      return "Completed";
    case "interrupted":
      return "Interrupted";
    case "failed":
      return "Failed";
    case "inProgress":
      return "Running";
  }
}
function historyItemAccentClassName(kind) {
  switch (kind) {
    case "userMessage":
      return "timeline-kind-user";
    case "agentMessage":
      return "timeline-kind-agent";
    case "artifact":
      return "timeline-kind-action";
    case "image":
      return "timeline-kind-action";
    case "contextCompaction":
      return "timeline-kind-action";
    case "commandExecution":
      return "timeline-kind-command";
    case "webSearch":
      return "timeline-kind-search";
    case "fileRead":
      return "timeline-kind-file-read";
    case "reasoning":
      return "timeline-kind-reasoning";
    case "agentToolCall":
      return "timeline-kind-agent-tool";
    case "skillToolCall":
      return "timeline-kind-skill-tool";
    case "toolCall":
      return "timeline-kind-action";
    case "plan":
      return "timeline-kind-plan";
    case "fileChange":
      return "timeline-kind-file";
    case "hook":
      return "timeline-kind-action";
    case "other":
      return "ui-status-neutral";
  }
}
function historyItemLabel(kind) {
  switch (kind) {
    case "userMessage":
      return "User";
    case "agentMessage":
      return "Agent";
    case "artifact":
      return "Artifact";
    case "image":
      return "Image";
    case "contextCompaction":
      return "Context";
    case "commandExecution":
      return "Command";
    case "webSearch":
      return "Web Search";
    case "fileRead":
      return "File Read";
    case "reasoning":
      return "Reasoning";
    case "agentToolCall":
      return "Agent";
    case "skillToolCall":
      return "Skill";
    case "toolCall":
      return "Tool";
    case "plan":
      return "Plan";
    case "fileChange":
      return "File Change";
    case "hook":
      return "Hook";
    case "other":
      return "Other";
  }
}

// src/components/RenameDialog.tsx
import { useEffect as useEffect8 } from "react";
import { createPortal } from "react-dom";
import { jsx as jsx24, jsxs as jsxs20 } from "react/jsx-runtime";
function RenameDialog({
  open,
  title,
  label,
  value,
  busy = false,
  onChange,
  onCancel,
  onSubmit
}) {
  useEffect8(() => {
    if (!open) {
      return;
    }
    function handleKeyDown(event) {
      if (event.key === "Escape" && !busy) {
        onCancel();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [busy, onCancel, open]);
  if (!open) {
    return null;
  }
  function handleSubmit(event) {
    event.preventDefault();
    void onSubmit();
  }
  return createPortal(
    /* @__PURE__ */ jsxs20("div", { className: "fixed inset-0 z-[95] flex items-center justify-center p-4 sm:p-6", children: [
      /* @__PURE__ */ jsx24(
        "button",
        {
          type: "button",
          "aria-label": "Close rename dialog",
          onClick: onCancel,
          disabled: busy,
          className: "absolute inset-0 bg-stone-950/78 backdrop-blur-sm disabled:cursor-not-allowed"
        }
      ),
      /* @__PURE__ */ jsxs20(
        "form",
        {
          role: "dialog",
          "aria-modal": "true",
          "aria-label": title,
          onSubmit: handleSubmit,
          className: "relative z-[1] w-full max-w-md rounded-[1.6rem] border border-stone-700 bg-stone-900 p-5 shadow-2xl shadow-stone-950/40 sm:p-6",
          children: [
            /* @__PURE__ */ jsxs20("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxs20("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsx24("p", { className: "text-sm font-medium text-stone-100", children: title }),
                /* @__PURE__ */ jsx24("p", { className: "mt-1 text-sm text-stone-500", children: "Changes are saved only after confirmation." })
              ] }),
              /* @__PURE__ */ jsx24(
                "button",
                {
                  type: "button",
                  "aria-label": "Close dialog",
                  onClick: onCancel,
                  disabled: busy,
                  className: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-700 text-stone-300 transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60",
                  children: /* @__PURE__ */ jsx24("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", className: "h-4 w-4 fill-current", children: /* @__PURE__ */ jsx24("path", { d: "M3.22 2.47 8 7.25l4.78-4.78 1.06 1.06L9.06 8.31l4.78 4.78-1.06 1.06L8 9.37l-4.78 4.78-1.06-1.06 4.78-4.78-4.78-4.78 1.06-1.06Z" }) })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs20("div", { className: "mt-5", children: [
              /* @__PURE__ */ jsx24("label", { htmlFor: "rename-dialog-input", className: "text-sm font-medium text-stone-200", children: label }),
              /* @__PURE__ */ jsx24(
                "input",
                {
                  id: "rename-dialog-input",
                  "aria-label": label,
                  autoFocus: true,
                  value,
                  onChange: (event) => onChange(event.target.value),
                  className: "mt-2 w-full rounded-2xl border border-stone-700 bg-stone-950 px-4 py-3 text-stone-100 outline-none transition focus:border-amber-300"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs20("div", { className: "mt-5 flex items-center justify-end gap-2", children: [
              /* @__PURE__ */ jsx24(
                "button",
                {
                  type: "button",
                  onClick: onCancel,
                  disabled: busy,
                  className: "rounded-full border border-stone-700 px-4 py-2 text-sm font-medium text-stone-300 transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsx24(
                "button",
                {
                  type: "submit",
                  disabled: busy || !value.trim(),
                  className: "ui-action-success rounded-full px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed",
                  children: "Save"
                }
              )
            ] })
          ]
        }
      )
    ] }),
    document.body
  );
}

// src/components/graph-chat/GraphChatShellLayout.tsx
import { useEffect as useEffect9, useRef as useRef8 } from "react";
import { jsx as jsx25 } from "react/jsx-runtime";
function GraphChatShellRoot({
  children,
  effectiveTheme,
  layoutMode,
  themeMode,
  viewportConstrained
}) {
  return /* @__PURE__ */ jsx25(
    "div",
    {
      className: `thread-ui-shell ${effectiveTheme === "dark" ? "thread-ui-theme-dark dark" : ""} ${viewportConstrained ? "thread-ui-viewport-constrained" : ""} ${viewportConstrained ? "h-[100svh] max-h-[100svh] min-h-0 overflow-hidden overscroll-none" : "min-h-[100svh] overflow-hidden"} bg-[#f6f8fb] text-slate-900 transition-colors duration-200 sm:p-2`,
      "data-theme-effective": effectiveTheme,
      "data-theme-mode": themeMode ?? effectiveTheme,
      "data-thread-layout": layoutMode,
      children
    }
  );
}
function GraphChatShellFrame({
  children,
  roomsRailCollapsed,
  hideRoomsRail = false
}) {
  return /* @__PURE__ */ jsx25(
    "div",
    {
      className: `thread-shell-frame relative h-full min-h-0 ${hideRoomsRail ? "is-rail-hidden sm:grid-cols-[minmax(0,1fr)]" : roomsRailCollapsed ? "is-rail-collapsed sm:grid-cols-[56px_minmax(0,1fr)]" : "sm:grid-cols-[264px_minmax(0,1fr)]"}`,
      children
    }
  );
}
function GraphChatMobileScrim({
  onClose,
  open
}) {
  if (!open) {
    return null;
  }
  return /* @__PURE__ */ jsx25(
    "button",
    {
      type: "button",
      "aria-hidden": "true",
      tabIndex: -1,
      className: "thread-mobile-only-block thread-mobile-scrim fixed inset-0 z-40 bg-slate-950/35 backdrop-blur-[1px]",
      onClick: onClose
    }
  );
}
function GraphChatRoomsRailShell({
  children,
  collapsed,
  mobileOpen,
  mobile = false,
  onClose
}) {
  const rail = useRef8(null);
  useEffect9(() => {
    if (!mobile || !mobileOpen) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    rail.current?.querySelector('[aria-label="Close rooms"]')?.focus();
    return () => {
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [mobile, mobileOpen]);
  return /* @__PURE__ */ jsx25(
    "aside",
    {
      ref: rail,
      inert: mobile && !mobileOpen,
      onKeyDown: (event) => {
        if (mobile && event.key === "Escape") {
          event.preventDefault();
          onClose?.();
        }
      },
      className: `thread-graph-rooms-surface thread-rooms-rail fixed inset-y-0 left-0 z-50 flex min-h-0 min-w-0 w-[min(20rem,calc(100vw-2rem))] flex-col overflow-x-hidden border-r border-slate-200/80 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.18)] transition-transform duration-200 ease-out sm:static sm:z-auto sm:w-auto sm:translate-x-0 sm:rounded-[12px] sm:border sm:shadow-[0_10px_30px_rgba(15,23,42,0.04)] ${mobileOpen ? "translate-x-0" : "pointer-events-none -translate-x-full sm:pointer-events-auto"} ${collapsed ? "thread-ui-rail-collapsed sm:items-center" : ""}`,
      style: { paddingTop: "var(--android-safe-area-top, 0px)" },
      children
    }
  );
}
function GraphChatMainShell({ children }) {
  return /* @__PURE__ */ jsx25("main", { className: "thread-shell-main h-full min-h-0 min-w-0 overflow-hidden", children: /* @__PURE__ */ jsx25("div", { className: "thread-main-panel thread-shell-card flex h-full min-h-0 flex-col overflow-hidden bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)] sm:rounded-[12px] sm:border sm:border-slate-200/80", children }) });
}
function GraphChatTopbarShell({ children }) {
  return /* @__PURE__ */ jsx25("div", { className: "thread-topbar-surface flex shrink-0 flex-col border-b border-slate-200 bg-white pt-[env(safe-area-inset-top)] sm:pt-0", children });
}
function GraphChatSplitRegion({ children }) {
  return /* @__PURE__ */ jsx25("div", { className: "thread-split-region min-h-0 flex-1 overflow-hidden p-0 sm:p-2", children });
}

// src/components/graph-ui/Dialog.tsx
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { jsx as jsx26, jsxs as jsxs21 } from "react/jsx-runtime";
function Dialog({ ...props }) {
  return /* @__PURE__ */ jsx26(DialogPrimitive.Root, { "data-slot": "dialog", ...props });
}
function DialogTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx26(DialogPrimitive.Trigger, { "data-slot": "dialog-trigger", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx26(DialogPrimitive.Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx26(
    DialogPrimitive.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  children,
  className,
  showCloseButton = true,
  overlayClassName,
  ...props
}) {
  return /* @__PURE__ */ jsxs21(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsx26(DialogOverlay, { className: overlayClassName }),
    /* @__PURE__ */ jsxs21(
      DialogPrimitive.Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "fixed left-[50%] top-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton ? /* @__PURE__ */ jsxs21(
            DialogPrimitive.Close,
            {
              "data-slot": "dialog-close",
              className: "absolute right-4 top-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsx26(XIcon, {}),
                /* @__PURE__ */ jsx26("span", { className: "sr-only", children: "Close" })
              ]
            }
          ) : null
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx26(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx26(
    DialogPrimitive.Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg font-semibold leading-none", className),
      ...props
    }
  );
}
function DialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx26(
    DialogPrimitive.Description,
    {
      "data-slot": "dialog-description",
      className: cn("text-sm text-muted-foreground", className),
      ...props
    }
  );
}

// src/components/ThreadWorkspaceLayout.tsx
import { Fragment as Fragment4, jsx as jsx27, jsxs as jsxs22 } from "react/jsx-runtime";
var THEME_MODE_OPTIONS = [
  { value: "system", label: "Follow system", icon: Monitor },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "light", label: "Light", icon: Sun }
];
function ThreadCard({
  thread,
  currentThreadId,
  currentWorkspaceId,
  workspaceLabels = {},
  onOpenThread,
  getThreadHref,
  renderThreadLink,
  onBeginRenameThread,
  onDeleteThread,
  showDeleteButton = false,
  showSessionCopyButton = false,
  collapsed = false
}) {
  const [copyState, setCopyState] = useState14(
    "idle"
  );
  const resetTimerRef = useRef9(null);
  const workspaceLabel = workspaceLabels[thread.workspaceId];
  const roomMetaLabel = workspaceLabel && !currentWorkspaceId ? workspaceLabel : null;
  const isCurrentThread = currentThreadId === thread.id;
  useEffect10(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);
  async function handleCopySessionId() {
    const sessionId = thread.providerSessionId;
    if (!sessionId) {
      return;
    }
    try {
      await navigator.clipboard.writeText(sessionId);
      setCopyState("copied");
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
      resetTimerRef.current = window.setTimeout(
        () => setCopyState("idle"),
        1200
      );
    } catch {
      setCopyState("failed");
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
      resetTimerRef.current = window.setTimeout(
        () => setCopyState("idle"),
        1600
      );
    }
  }
  const openThread = () => onOpenThread(thread.id);
  const cardClassName = `thread-graph-room-card group flex w-full items-center gap-3 rounded-xl border text-left transition ${isCurrentThread ? "is-active" : ""} ${collapsed ? "justify-center px-2 py-2" : "px-3 py-2.5"}`;
  const cardContent = /* @__PURE__ */ jsxs22(Fragment4, { children: [
    /* @__PURE__ */ jsx27(
      "div",
      {
        "data-thread-status": thread.status,
        className: `thread-graph-room-card-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${isCurrentThread ? "is-active" : ""}`,
        children: thread.status === "running" ? /* @__PURE__ */ jsx27(LoaderCircle, { className: "thread-room-running h-4 w-4", "aria-label": "Running" }) : thread.status === "failed" ? /* @__PURE__ */ jsx27(CircleAlert, { className: "h-4 w-4", "aria-label": "Failed" }) : /* @__PURE__ */ jsx27(MessageSquare, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsxs22(
      "div",
      {
        className: `min-w-0 flex-1 ${collapsed ? "thread-desktop-collapsed-hidden" : ""}`,
        children: [
          /* @__PURE__ */ jsxs22("div", { className: "flex min-w-0 items-center gap-1", children: [
            /* @__PURE__ */ jsx27(
              "p",
              {
                className: "thread-graph-room-card-title min-w-0 flex-1 truncate text-sm font-medium",
                title: thread.title,
                children: thread.title
              }
            ),
            onBeginRenameThread && !collapsed ? /* @__PURE__ */ jsx27(
              "button",
              {
                type: "button",
                onClick: (event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  onBeginRenameThread(thread);
                },
                "aria-label": `Rename thread ${thread.title}`,
                title: "Rename thread",
                className: "thread-card-quiet-button inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition",
                children: /* @__PURE__ */ jsx27(Pencil, { className: "h-3 w-3" })
              }
            ) : null,
            showSessionCopyButton && thread.providerSessionId ? /* @__PURE__ */ jsx27(
              "button",
              {
                type: "button",
                "aria-label": "Copy session ID",
                title: copyState === "copied" ? "Copied" : copyState === "failed" ? "Copy failed" : "Copy session ID",
                onClick: (event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  void handleCopySessionId();
                },
                className: "thread-card-quiet-button thread-card-session-copy-button inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition",
                children: copyState === "copied" ? /* @__PURE__ */ jsx27(Check2, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsx27(Copy, { className: "h-3.5 w-3.5" })
              }
            ) : null
          ] }),
          /* @__PURE__ */ jsxs22("div", { className: "mt-1 flex min-w-0 items-center gap-2", children: [
            roomMetaLabel ? /* @__PURE__ */ jsx27(
              "p",
              {
                className: "thread-graph-room-card-meta min-w-0 flex-1 truncate text-[11px] text-[var(--theme-fg-muted)]",
                title: roomMetaLabel,
                children: roomMetaLabel
              }
            ) : /* @__PURE__ */ jsx27("span", { className: "min-w-0 flex-1", "aria-hidden": "true" }),
            /* @__PURE__ */ jsx27(
              "span",
              {
                className: `shrink-0 rounded-full border px-1.5 py-0.5 text-[9px] uppercase tracking-normal ${threadStatusClassName(thread.status)}`,
                children: threadStatusLabel(thread.status)
              }
            ),
            /* @__PURE__ */ jsx27(
              "time",
              {
                className: "shrink-0 text-[11px] text-[var(--theme-fg-muted)]",
                dateTime: thread.lastTurnStartedAt ?? thread.updatedAt,
                children: formatShortTimestamp(thread.lastTurnStartedAt ?? thread.updatedAt)
              }
            )
          ] })
        ]
      }
    ),
    showDeleteButton && onDeleteThread && !collapsed ? /* @__PURE__ */ jsx27(
      "button",
      {
        type: "button",
        onClick: (event) => {
          event.stopPropagation();
          event.preventDefault();
          onDeleteThread(thread);
        },
        "aria-label": `Delete thread ${thread.title}`,
        className: "thread-card-danger-button shrink-0 rounded-full p-1 transition",
        title: "Delete thread",
        children: /* @__PURE__ */ jsx27(Trash2, { className: "h-3.5 w-3.5" })
      }
    ) : null
  ] });
  const href = getThreadHref?.(thread.id);
  const card = renderThreadLink ? renderThreadLink({
    thread,
    children: cardContent,
    className: cardClassName,
    onClick: openThread
  }) : href ? /* @__PURE__ */ jsx27("a", { href, onClick: (event) => {
    event.preventDefault();
    openThread();
  }, className: cardClassName, children: cardContent }) : /* @__PURE__ */ jsx27("div", { role: "link", tabIndex: 0, onClick: openThread, onKeyDown: (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openThread();
    }
  }, className: cardClassName, children: cardContent });
  return collapsed ? /* @__PURE__ */ jsxs22(Tooltip, { delayDuration: 180, children: [
    /* @__PURE__ */ jsx27(TooltipTrigger, { asChild: true, children: card }),
    /* @__PURE__ */ jsxs22(TooltipContent, { side: "right", sideOffset: 10, collisionPadding: 12, className: "thread-room-tooltip", children: [
      /* @__PURE__ */ jsx27("span", { className: "block font-medium", children: thread.title }),
      /* @__PURE__ */ jsx27("span", { className: "mt-1 block text-[11px] opacity-70", children: threadStatusLabel(thread.status) })
    ] })
  ] }) : card;
}
function ThreadCards({
  threads,
  currentThreadId,
  currentWorkspaceId,
  workspaceLabels = {},
  onOpenThread,
  getThreadHref,
  renderThreadLink,
  onBeginRenameThread,
  onDeleteThread,
  scrollable = false,
  maxHeightClassName = "max-h-full",
  showDeleteButton = false,
  showSessionCopyButton = false,
  collapsed = false
}) {
  const containerClassName = scrollable ? `min-h-0 min-w-0 overflow-x-hidden overflow-y-auto overscroll-contain pr-1 ${maxHeightClassName}` : "";
  return /* @__PURE__ */ jsx27("div", { className: containerClassName, children: /* @__PURE__ */ jsx27("div", { className: "min-w-0 space-y-1", children: threads.map((thread) => /* @__PURE__ */ jsx27(
    ThreadCard,
    {
      thread,
      currentThreadId,
      currentWorkspaceId,
      workspaceLabels,
      onOpenThread,
      showDeleteButton,
      showSessionCopyButton,
      collapsed,
      ...getThreadHref ? { getThreadHref } : {},
      ...renderThreadLink ? { renderThreadLink } : {},
      ...onBeginRenameThread ? { onBeginRenameThread } : {},
      ...onDeleteThread ? { onDeleteThread } : {}
    },
    thread.id
  )) }) });
}
function ThreadWorkspaceLayout({
  threads,
  status,
  loading = false,
  error,
  viewportConstrained = false,
  layoutMode = "responsive",
  effectiveTheme: effectiveThemeProp,
  themeMode: themeModeProp,
  onThemeModeChange,
  showMobileNewThreadShortcut = true,
  hideRoomsRail = false,
  navigationTitle,
  renderNavigationHeader,
  settingsDialogOpen,
  onSettingsDialogOpenChange,
  mobileHeaderAction,
  currentThreadId,
  currentThreadLabel = null,
  currentWorkspaceId = null,
  currentWorkspaceLabel = null,
  harnessLabel = null,
  sessionLabel = null,
  usageLabel = null,
  threadActionsButton,
  topbarActions,
  metaContent,
  settingsContent,
  globalSettingsContent,
  workspaceLabels = {},
  workspaceReturnHref,
  onWorkspaceReturn,
  getThreadHref,
  onOpenThread,
  getNewThreadHref,
  newThreadHref: explicitNewThreadHref,
  newThreadLabel = "New Chat",
  onNewThread,
  onNewThreadTitle,
  renderNewThreadDialogContent,
  renderThreadLink,
  onCloseAppNavigation,
  onRenameThread,
  onDeleteThread,
  workspaceContent,
  workspaceTitle = "Workspace",
  workspaceActions,
  workspaceRevealRequestKey,
  children
}) {
  const shellNav = useAppShellNav();
  const initialShellMobileViewport = typeof window !== "undefined" ? window.matchMedia("(max-width: 639px)").matches : layoutMode === "mobile";
  const initialWorkspaceFocusViewport = typeof window !== "undefined" ? window.matchMedia("(max-width: 1023px)").matches : layoutMode === "mobile";
  const [systemPrefersDark, setSystemPrefersDark] = useState14(
    () => typeof window !== "undefined" ? window.matchMedia("(prefers-color-scheme: dark)").matches : false
  );
  const themeMode = themeModeProp ?? shellNav?.themeMode ?? "system";
  const effectiveTheme = effectiveThemeProp ?? shellNav?.effectiveTheme ?? (themeMode === "system" ? systemPrefersDark ? "dark" : "light" : themeMode);
  const [mobileRoomsOpen, setMobileRoomsOpen] = useState14(false);
  const [roomsRailCollapsed, setRoomsRailCollapsed] = useState14(false);
  const [workspaceCollapsed, setWorkspaceCollapsed] = useState14(
    !initialWorkspaceFocusViewport
  );
  const [isShellMobileViewport, setIsShellMobileViewport] = useState14(
    initialShellMobileViewport
  );
  const [isWorkspaceFocusViewport, setIsWorkspaceFocusViewport] = useState14(
    initialWorkspaceFocusViewport
  );
  const [mobileWorkspace, setMobileWorkspace] = useState14(
    "chat"
  );
  const [workspaceVisited, setWorkspaceVisited] = useState14(false);
  useEffect10(() => {
    if (mobileWorkspace === "workspace") setWorkspaceVisited(true);
  }, [mobileWorkspace]);
  const [editingThreadId, setEditingThreadId] = useState14(null);
  const [draftTitle, setDraftTitle] = useState14("");
  const [renamingThreadId, setRenamingThreadId] = useState14(null);
  const [createThreadDialogOpen, setCreateThreadDialogOpen] = useState14(false);
  const [newThreadTitleDraft, setNewThreadTitleDraft] = useState14("");
  const [creatingThread, setCreatingThread] = useState14(false);
  const [topbarDetailsOpen, setTopbarDetailsOpen] = useState14(false);
  const [settingsTab, setSettingsTab] = useState14(
    "session"
  );
  useEffect10(() => {
    if (workspaceRevealRequestKey === void 0) {
      return;
    }
    setWorkspaceCollapsed(false);
    setMobileWorkspace("workspace");
  }, [workspaceRevealRequestKey]);
  useEffect10(() => {
    if (typeof window === "undefined") {
      return;
    }
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const handleViewportChange = () => {
      setIsShellMobileViewport(mediaQuery.matches);
    };
    handleViewportChange();
    mediaQuery.addEventListener("change", handleViewportChange);
    return () => {
      mediaQuery.removeEventListener("change", handleViewportChange);
    };
  }, []);
  useEffect10(() => {
    if (typeof window === "undefined") {
      return;
    }
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const handleViewportChange = () => {
      setIsWorkspaceFocusViewport(mediaQuery.matches);
    };
    handleViewportChange();
    mediaQuery.addEventListener("change", handleViewportChange);
    return () => {
      mediaQuery.removeEventListener("change", handleViewportChange);
    };
  }, []);
  useEffect10(() => {
    if (typeof window === "undefined") {
      return;
    }
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      setSystemPrefersDark(mediaQuery.matches);
    };
    handleSystemThemeChange();
    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);
  const visibleThreads = useMemo3(() => {
    const scopedThreads = currentWorkspaceId ? threads.filter((thread) => thread.workspaceId === currentWorkspaceId) : threads;
    return [...scopedThreads].sort((left, right) => {
      if (left.id === currentThreadId) {
        return -1;
      }
      if (right.id === currentThreadId) {
        return 1;
      }
      const leftTimestamp = Date.parse(
        left.lastTurnStartedAt ?? left.updatedAt
      );
      const rightTimestamp = Date.parse(
        right.lastTurnStartedAt ?? right.updatedAt
      );
      return rightTimestamp - leftTimestamp;
    });
  }, [currentThreadId, currentWorkspaceId, threads]);
  const newThreadHref = explicitNewThreadHref ?? getNewThreadHref?.(currentWorkspaceId);
  const topbarWorkspaceLabel = currentWorkspaceLabel ?? currentWorkspaceId ?? "All workspaces";
  const topbarHarnessLabel = harnessLabel ?? "Agent";
  const topbarSessionLabel = sessionLabel ?? currentThreadLabel ?? currentThreadId ?? "default_session";
  const topbarUsageLabel = usageLabel ?? (status?.state ? `runtime ${status.state}` : "waiting for agent usage");
  const setThemeMode = onThemeModeChange ?? shellNav?.setThemeMode;
  const canUpdateThemeMode = Boolean(setThemeMode);
  const closeNavigationSurfaces = () => {
    setMobileRoomsOpen(false);
    onCloseAppNavigation?.();
  };
  async function handleRenameThread(threadId) {
    if (!onRenameThread) {
      return;
    }
    const normalizedTitle = draftTitle.trim();
    if (!normalizedTitle) {
      return;
    }
    setRenamingThreadId(threadId);
    try {
      await onRenameThread(threadId, normalizedTitle);
      setEditingThreadId(null);
      setDraftTitle("");
    } finally {
      setRenamingThreadId(null);
    }
  }
  function beginRenameThread(thread) {
    setEditingThreadId(thread.id);
    setDraftTitle(thread.title);
  }
  function cancelRenameThread() {
    setEditingThreadId(null);
    setDraftTitle("");
  }
  function openThread(threadId) {
    onOpenThread?.(threadId);
    closeNavigationSurfaces();
  }
  function closeCreateThreadDialog() {
    setCreateThreadDialogOpen(false);
    setNewThreadTitleDraft("");
  }
  function buildNewThreadHrefWithTitle(title) {
    if (!newThreadHref || !title.trim()) {
      return newThreadHref;
    }
    try {
      const url = new URL(newThreadHref, window.location.origin);
      url.searchParams.set("title", title.trim());
      return `${url.pathname}${url.search}${url.hash}`;
    } catch {
      const separator = newThreadHref.includes("?") ? "&" : "?";
      return `${newThreadHref}${separator}title=${encodeURIComponent(title.trim())}`;
    }
  }
  async function handleCreateThreadFromDialog() {
    const title = newThreadTitleDraft.trim();
    setCreatingThread(true);
    try {
      if (onNewThreadTitle) {
        await onNewThreadTitle(title);
        setNewThreadTitleDraft("");
        setCreateThreadDialogOpen(false);
        closeNavigationSurfaces();
        return;
      }
      if (newThreadHref) {
        window.location.assign(
          buildNewThreadHrefWithTitle(title) ?? newThreadHref
        );
        return;
      }
      await onNewThread?.();
      setNewThreadTitleDraft("");
      setCreateThreadDialogOpen(false);
      closeNavigationSurfaces();
    } finally {
      setCreatingThread(false);
    }
  }
  function renderNewThreadDialogButton(className, compact = false) {
    const content = compact ? /* @__PURE__ */ jsxs22(Fragment4, { children: [
      /* @__PURE__ */ jsx27(Plus, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsx27("span", { className: "sr-only", children: newThreadLabel })
    ] }) : /* @__PURE__ */ jsxs22(Fragment4, { children: [
      /* @__PURE__ */ jsx27(Plus, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsx27("span", { children: newThreadLabel })
    ] });
    return /* @__PURE__ */ jsxs22(
      Dialog,
      {
        open: createThreadDialogOpen,
        onOpenChange: (open) => {
          if (!creatingThread) {
            setCreateThreadDialogOpen(open);
          }
        },
        children: [
          /* @__PURE__ */ jsx27(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx27(
            "button",
            {
              type: "button",
              "aria-label": compact ? newThreadLabel : void 0,
              title: newThreadLabel,
              className,
              children: content
            }
          ) }),
          /* @__PURE__ */ jsx27(
            DialogContent,
            {
              "data-testid": "create-thread-dialog",
              "data-theme-effective": effectiveTheme,
              "data-theme-mode": themeMode,
              className: "thread-graph-create-thread-dialog thread-graph-dialog max-h-[min(86vh,42rem)] overflow-hidden p-4 sm:max-w-[34rem]",
              children: renderNewThreadDialogContent ? renderNewThreadDialogContent({
                close: closeCreateThreadDialog,
                closeNavigation: closeNavigationSurfaces,
                currentWorkspaceId
              }) : /* @__PURE__ */ jsxs22(Fragment4, { children: [
                /* @__PURE__ */ jsxs22(DialogHeader, { children: [
                  /* @__PURE__ */ jsx27(DialogTitle, { children: "Create New Chat" }),
                  /* @__PURE__ */ jsx27(DialogDescription, { children: "Name the room so it is easy to find later." })
                ] }),
                /* @__PURE__ */ jsxs22("div", { className: "grid gap-3", children: [
                  /* @__PURE__ */ jsx27(
                    "input",
                    {
                      id: "thread-graph-create-thread-title",
                      name: "thread-title",
                      value: newThreadTitleDraft,
                      onChange: (event) => setNewThreadTitleDraft(event.target.value),
                      onKeyDown: (event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          void handleCreateThreadFromDialog();
                        }
                      },
                      placeholder: "Chat name",
                      "aria-label": "Chat name",
                      autoComplete: "off",
                      className: "thread-graph-create-thread-input h-10 rounded-md border px-3 text-sm outline-none transition"
                    }
                  ),
                  /* @__PURE__ */ jsx27(
                    "button",
                    {
                      type: "button",
                      onClick: () => void handleCreateThreadFromDialog(),
                      disabled: creatingThread,
                      className: "thread-graph-create-thread-submit inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60",
                      children: creatingThread ? "Creating..." : "Create"
                    }
                  )
                ] })
              ] })
            }
          )
        ]
      }
    );
  }
  function renderSettingsDialog() {
    if (!settingsContent && !metaContent && !globalSettingsContent && !canUpdateThemeMode) {
      return null;
    }
    const hasSessionSettings = Boolean(settingsContent || metaContent);
    const hasGlobalSettings = Boolean(globalSettingsContent);
    const showSettingsTabs = hasSessionSettings && hasGlobalSettings;
    const activeSettingsTab = settingsTab === "global" && hasGlobalSettings ? "global" : !hasSessionSettings && hasGlobalSettings ? "global" : "session";
    return /* @__PURE__ */ jsxs22(
      Dialog,
      {
        ...settingsDialogOpen !== void 0 ? { open: settingsDialogOpen } : {},
        ...onSettingsDialogOpenChange ? { onOpenChange: onSettingsDialogOpenChange } : {},
        children: [
          /* @__PURE__ */ jsx27(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsx27(
            "button",
            {
              type: "button",
              "aria-label": "Open settings",
              title: "Settings",
              className: "thread-icon-button inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
              children: /* @__PURE__ */ jsx27(Settings, { className: "h-4 w-4" })
            }
          ) }),
          /* @__PURE__ */ jsxs22(
            DialogContent,
            {
              "data-testid": "settings-dialog",
              "data-theme-effective": effectiveTheme,
              "data-theme-mode": themeMode,
              className: "thread-graph-settings-dialog thread-graph-dialog",
              children: [
                /* @__PURE__ */ jsxs22(DialogHeader, { children: [
                  /* @__PURE__ */ jsx27(DialogTitle, { children: "Settings" }),
                  /* @__PURE__ */ jsx27(DialogDescription, { children: "Manage this session and host-wide preferences." })
                ] }),
                canUpdateThemeMode ? /* @__PURE__ */ jsx27("div", { className: "thread-graph-settings-card rounded-lg border p-3", children: /* @__PURE__ */ jsxs22("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between", children: [
                  /* @__PURE__ */ jsxs22("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsx27("p", { className: "font-medium text-[var(--theme-fg)]", children: "Appearance" }),
                    /* @__PURE__ */ jsxs22("p", { className: "mt-1 text-xs leading-5 text-[var(--theme-fg-muted)]", children: [
                      "Current theme: ",
                      effectiveTheme
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx27(
                    "div",
                    {
                      className: "thread-graph-theme-mode-group grid grid-cols-3 gap-1 rounded-lg border p-1",
                      role: "group",
                      "aria-label": "Theme mode",
                      children: THEME_MODE_OPTIONS.map((option) => {
                        const Icon = option.icon;
                        const isSelected = themeMode === option.value;
                        return /* @__PURE__ */ jsxs22(
                          "button",
                          {
                            type: "button",
                            "data-testid": `theme-mode-${option.value}`,
                            "aria-pressed": isSelected,
                            disabled: !canUpdateThemeMode,
                            onClick: () => setThemeMode?.(option.value),
                            className: `thread-graph-theme-mode-button inline-flex min-h-9 items-center justify-center gap-1.5 rounded-md px-2 text-xs font-medium transition ${isSelected ? "is-selected" : ""}`,
                            children: [
                              /* @__PURE__ */ jsx27(Icon, { className: "h-3.5 w-3.5" }),
                              /* @__PURE__ */ jsx27("span", { className: "truncate", children: option.label })
                            ]
                          },
                          option.value
                        );
                      })
                    }
                  )
                ] }) }) : null,
                showSettingsTabs ? /* @__PURE__ */ jsxs22("div", { className: "thread-graph-settings-tabs grid grid-cols-2 gap-1 rounded-lg border p-1", children: [
                  /* @__PURE__ */ jsx27(
                    "button",
                    {
                      type: "button",
                      "aria-pressed": activeSettingsTab === "session",
                      onClick: () => setSettingsTab("session"),
                      className: `thread-graph-settings-tab-button rounded-md px-3 py-2 text-sm font-medium transition ${activeSettingsTab === "session" ? "is-active" : ""}`,
                      children: "Session"
                    }
                  ),
                  /* @__PURE__ */ jsx27(
                    "button",
                    {
                      type: "button",
                      "aria-pressed": activeSettingsTab === "global",
                      onClick: () => setSettingsTab("global"),
                      className: `thread-graph-settings-tab-button rounded-md px-3 py-2 text-sm font-medium transition ${activeSettingsTab === "global" ? "is-active" : ""}`,
                      children: "Global"
                    }
                  )
                ] }) : null,
                /* @__PURE__ */ jsx27("div", { className: "thread-graph-settings-body mt-2 min-h-0 pr-1 text-sm", children: activeSettingsTab === "session" ? /* @__PURE__ */ jsxs22("div", { className: "grid gap-4", children: [
                  settingsContent ? /* @__PURE__ */ jsx27("div", { className: "thread-graph-settings-card rounded-lg border p-3", children: settingsContent }) : null,
                  metaContent ? /* @__PURE__ */ jsx27("div", { className: "thread-graph-settings-card rounded-lg border p-3", children: metaContent }) : null,
                  !hasSessionSettings ? /* @__PURE__ */ jsx27("div", { className: "thread-graph-settings-card rounded-lg border p-3 text-[var(--theme-fg-muted)]", children: "No session settings are available." }) : null
                ] }) : /* @__PURE__ */ jsx27("div", { className: "thread-graph-settings-global-content", children: globalSettingsContent }) })
              ]
            }
          )
        ]
      }
    );
  }
  function renderRoomsRailContent(collapsed = false) {
    return /* @__PURE__ */ jsx27("div", { className: "flex min-h-0 flex-1 flex-col", children: /* @__PURE__ */ jsxs22("section", { className: "flex min-h-0 flex-1 flex-col", children: [
      /* @__PURE__ */ jsxs22(
        "div",
        {
          className: `mb-3 flex items-center gap-2 px-2 text-xs font-medium tracking-normal text-[var(--theme-fg-muted)] ${collapsed ? "justify-center" : ""}`,
          children: [
            /* @__PURE__ */ jsx27(Rows3, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsx27("span", { className: collapsed ? "sr-only" : "", children: "Rooms" }),
            !collapsed && loading ? /* @__PURE__ */ jsx27("span", { className: "ml-auto text-xs text-[var(--theme-fg-muted)]", children: "Refreshing..." }) : null
          ]
        }
      ),
      /* @__PURE__ */ jsxs22("div", { className: "min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto px-1", children: [
        error ? /* @__PURE__ */ jsx27("div", { className: "rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-3 text-sm text-rose-900 dark:text-rose-100", children: error }) : null,
        !error && visibleThreads.length === 0 && !loading ? /* @__PURE__ */ jsx27("div", { className: "rounded-xl border border-dashed border-[var(--theme-border)] bg-[var(--theme-surface)] px-4 py-6 text-sm text-[var(--theme-fg-muted)]", children: "No threads available in this view." }) : null,
        visibleThreads.length > 0 ? /* @__PURE__ */ jsx27(
          ThreadCards,
          {
            threads: visibleThreads,
            currentThreadId,
            currentWorkspaceId,
            workspaceLabels,
            onOpenThread: openThread,
            collapsed,
            ...onRenameThread ? { onBeginRenameThread: beginRenameThread } : {},
            showDeleteButton: Boolean(onDeleteThread),
            ...getThreadHref ? { getThreadHref } : {},
            ...renderThreadLink ? { renderThreadLink } : {},
            ...onDeleteThread ? { onDeleteThread } : {}
          }
        ) : null
      ] })
    ] }) });
  }
  function renderWorkspacePanel() {
    if (workspaceContent) {
      return /* @__PURE__ */ jsxs22("div", { className: "thread-workspace-panel relative flex h-full min-h-0 flex-col overflow-hidden rounded-[12px] border", children: [
        /* @__PURE__ */ jsx27(
          "button",
          {
            type: "button",
            onClick: () => setWorkspaceCollapsed(true),
            className: "thread-workspace-collapse-tab thread-desktop-only-inline-flex",
            title: "Collapse workspace",
            "aria-label": "Collapse workspace",
            children: /* @__PURE__ */ jsx27(ChevronsRight, { className: "h-4 w-4" })
          }
        ),
        workspaceActions ? /* @__PURE__ */ jsx27("div", { className: "pointer-events-none absolute right-12 top-2 z-20 flex items-center gap-1", children: /* @__PURE__ */ jsx27("div", { className: "pointer-events-auto", children: workspaceActions }) }) : null,
        /* @__PURE__ */ jsx27("div", { className: "min-h-0 flex-1 overflow-hidden", children: workspaceContent })
      ] });
    }
    return /* @__PURE__ */ jsxs22("div", { className: "thread-workspace-panel flex h-full min-h-0 flex-col overflow-hidden rounded-[12px] border", children: [
      /* @__PURE__ */ jsxs22("div", { className: "thread-workspace-panel-header flex h-12 shrink-0 items-center justify-between gap-3 border-b border-[var(--theme-border)] px-3 sm:h-[60px] sm:px-4", children: [
        /* @__PURE__ */ jsxs22("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx27("p", { className: "truncate text-base font-semibold text-[var(--theme-fg)] sm:text-[18px]", children: workspaceTitle }),
          /* @__PURE__ */ jsx27("p", { className: "truncate text-xs text-[var(--theme-fg-muted)]", children: currentWorkspaceLabel ?? currentWorkspaceId ?? "Current context" })
        ] }),
        /* @__PURE__ */ jsxs22("div", { className: "flex shrink-0 items-center gap-1", children: [
          workspaceActions,
          /* @__PURE__ */ jsx27(
            "button",
            {
              type: "button",
              onClick: () => setWorkspaceCollapsed(true),
              className: "thread-workspace-small-toggle thread-desktop-only-inline-flex",
              title: "Collapse workspace",
              "aria-label": "Collapse workspace",
              children: /* @__PURE__ */ jsx27(ChevronsRight, { className: "h-4 w-4" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx27("div", { className: "min-h-0 flex-1 overflow-hidden", children: workspaceContent ?? /* @__PURE__ */ jsxs22("div", { className: "grid h-full min-h-0 gap-3 overflow-y-auto p-3 text-sm text-[var(--theme-fg-soft)]", children: [
        /* @__PURE__ */ jsxs22("div", { className: "thread-workspace-card rounded-lg border p-3", children: [
          /* @__PURE__ */ jsx27("p", { className: "text-xs font-medium uppercase tracking-[0.14em] text-[var(--theme-fg-muted)]", children: "Runtime" }),
          /* @__PURE__ */ jsx27("p", { className: "mt-2 text-[var(--theme-fg)]", children: status?.state ?? "unknown" })
        ] }),
        /* @__PURE__ */ jsxs22("div", { className: "thread-workspace-card rounded-lg border p-3", children: [
          /* @__PURE__ */ jsx27("p", { className: "text-xs font-medium uppercase tracking-[0.14em] text-[var(--theme-fg-muted)]", children: "Workspace" }),
          /* @__PURE__ */ jsx27("p", { className: "mt-2 break-words text-[var(--theme-fg)]", children: currentWorkspaceLabel ?? currentWorkspaceId ?? "All threads" })
        ] })
      ] }) })
    ] });
  }
  const hasWorkspace = Boolean(workspaceContent);
  const renderMobileWorkspaceSplit = layoutMode === "mobile" || layoutMode === "responsive" && isShellMobileViewport;
  const renderWorkspaceFocusSplit = layoutMode === "mobile" || layoutMode === "responsive" && isWorkspaceFocusViewport;
  const renderMobileTopbarControls = renderMobileWorkspaceSplit;
  const canReturnToWorkspace = Boolean(
    workspaceReturnHref || onWorkspaceReturn
  );
  const workspaceReturnControl = canReturnToWorkspace ? /* @__PURE__ */ jsx27(
    "a",
    {
      href: workspaceReturnHref ?? "#",
      onClick: (event) => {
        if (onWorkspaceReturn) {
          event.preventDefault();
          onWorkspaceReturn();
        }
      },
      className: "thread-icon-button inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
      title: "Back to workspace",
      "aria-label": "Back to workspace",
      children: /* @__PURE__ */ jsx27(ArrowLeft, { className: "h-4 w-4" })
    }
  ) : null;
  return /* @__PURE__ */ jsxs22(Fragment4, { children: [
    /* @__PURE__ */ jsxs22(
      GraphChatShellRoot,
      {
        effectiveTheme,
        layoutMode,
        themeMode,
        viewportConstrained,
        children: [
          /* @__PURE__ */ jsx27(GraphChatTopbarShell, { children: /* @__PURE__ */ jsx27("div", { className: "thread-topbar-row flex min-h-12 items-center px-3 py-1.5 sm:min-h-12 sm:px-4", children: /* @__PURE__ */ jsxs22("div", { className: "flex w-full items-center justify-between gap-3 sm:gap-4", children: [
            /* @__PURE__ */ jsxs22("div", { className: "flex min-w-0 flex-1 items-center gap-2", children: [
              !hideRoomsRail ? renderMobileTopbarControls ? /* @__PURE__ */ jsx27(
                "button",
                {
                  type: "button",
                  "aria-label": "Open rooms",
                  title: "Open rooms",
                  "aria-expanded": mobileRoomsOpen,
                  onClick: () => setMobileRoomsOpen(true),
                  className: "thread-icon-button inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
                  children: /* @__PURE__ */ jsx27(PanelLeftOpen, { className: "h-4 w-4" })
                }
              ) : renderSettingsDialog() : null,
              workspaceReturnControl,
              /* @__PURE__ */ jsxs22("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx27(
                  "h1",
                  {
                    className: "min-w-0 truncate text-sm font-semibold leading-tight text-[var(--theme-fg)] sm:text-base",
                    title: currentThreadLabel ?? "Shared Workspace",
                    children: currentThreadLabel ?? "Shared Workspace"
                  }
                ),
                /* @__PURE__ */ jsxs22("div", { className: "relative mt-0.5 flex min-w-0 items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxs22(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        setTopbarDetailsOpen((open) => !open);
                      },
                      "aria-expanded": topbarDetailsOpen,
                      "aria-haspopup": "dialog",
                      className: "thread-topbar-meta-row flex min-w-0 max-w-full items-center gap-1 text-left text-[11px] leading-none sm:text-xs",
                      title: "Session and usage",
                      children: [
                        /* @__PURE__ */ jsx27("span", { className: "shrink-0 font-medium text-[var(--theme-fg-soft)]", children: topbarHarnessLabel }),
                        /* @__PURE__ */ jsx27("span", { "aria-hidden": "true", className: "shrink-0", children: "\xB7" }),
                        /* @__PURE__ */ jsx27("span", { className: "truncate", children: topbarWorkspaceLabel })
                      ]
                    }
                  ),
                  topbarDetailsOpen ? /* @__PURE__ */ jsxs22(
                    "div",
                    {
                      className: "thread-topbar-details-popover absolute left-0 top-[calc(100%+0.5rem)] z-50 w-[min(28rem,calc(100vw-1.5rem))] rounded-lg border p-2.5 shadow-lg",
                      role: "dialog",
                      "aria-label": "Session and usage",
                      children: [
                        /* @__PURE__ */ jsxs22(
                          "button",
                          {
                            type: "button",
                            onClick: () => {
                              if (!topbarSessionLabel) {
                                return;
                              }
                              void navigator.clipboard?.writeText(
                                topbarSessionLabel
                              );
                            },
                            className: "thread-topbar-meta-row flex min-w-0 max-w-full items-center gap-2 text-left text-xs leading-5",
                            title: "Copy session ID",
                            children: [
                              /* @__PURE__ */ jsx27("span", { className: "w-14 shrink-0", children: "Session" }),
                              /* @__PURE__ */ jsx27("span", { className: "min-w-0 break-all font-mono", children: topbarSessionLabel })
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxs22(
                          "div",
                          {
                            className: "thread-topbar-meta-row mt-1 flex min-w-0 max-w-full items-start gap-2 text-xs leading-5",
                            title: "Session token usage and estimated cost",
                            children: [
                              /* @__PURE__ */ jsx27("span", { className: "w-14 shrink-0", children: "Usage" }),
                              /* @__PURE__ */ jsx27("span", { className: "min-w-0 whitespace-normal break-words font-mono", children: topbarUsageLabel })
                            ]
                          }
                        )
                      ]
                    }
                  ) : null
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs22("div", { className: "relative z-[1] inline-flex shrink-0 items-center gap-2", children: [
              threadActionsButton || topbarActions ? /* @__PURE__ */ jsxs22("div", { className: "thread-graph-topbar-actions thread-desktop-only-inline-flex items-center rounded-lg border p-0.5 shadow-none", children: [
                threadActionsButton,
                topbarActions
              ] }) : null,
              renderMobileTopbarControls && threadActionsButton ? /* @__PURE__ */ jsx27("div", { className: "thread-mobile-only-inline-flex", children: threadActionsButton }) : null,
              renderWorkspaceFocusSplit && hasWorkspace ? /* @__PURE__ */ jsx27(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setWorkspaceCollapsed(false);
                    setMobileWorkspace(
                      (current) => current === "workspace" ? "chat" : "workspace"
                    );
                  },
                  "aria-label": mobileWorkspace === "workspace" ? "Show chat" : "Show workspace",
                  title: mobileWorkspace === "workspace" ? "Show chat" : "Show workspace",
                  className: "thread-icon-button inline-flex h-10 w-10 items-center justify-center rounded-full",
                  children: mobileWorkspace === "workspace" ? /* @__PURE__ */ jsx27(MessageSquare, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx27(Folder, { className: "h-4 w-4" })
                }
              ) : null,
              renderMobileTopbarControls ? mobileHeaderAction : null,
              renderMobileTopbarControls && showMobileNewThreadShortcut && !hideRoomsRail ? renderNewThreadDialogButton(
                "thread-secondary-action inline-flex h-10 items-center justify-center gap-2 rounded-lg border px-3 text-sm font-medium sm:h-9"
              ) : null
            ] })
          ] }) }) }),
          /* @__PURE__ */ jsxs22(
            GraphChatShellFrame,
            {
              roomsRailCollapsed,
              hideRoomsRail,
              children: [
                !hideRoomsRail ? /* @__PURE__ */ jsx27(
                  GraphChatMobileScrim,
                  {
                    open: mobileRoomsOpen,
                    onClose: () => setMobileRoomsOpen(false)
                  }
                ) : null,
                !hideRoomsRail ? /* @__PURE__ */ jsxs22(
                  GraphChatRoomsRailShell,
                  {
                    collapsed: roomsRailCollapsed && !renderMobileTopbarControls,
                    mobileOpen: mobileRoomsOpen,
                    mobile: renderMobileTopbarControls,
                    onClose: () => setMobileRoomsOpen(false),
                    children: [
                      /* @__PURE__ */ jsx27(
                        "div",
                        {
                          className: `thread-rooms-rail-header flex h-[calc(3rem+env(safe-area-inset-top))] shrink-0 items-end border-b border-[var(--theme-border)] px-4 pb-2 sm:h-16 sm:items-center sm:pb-0 ${roomsRailCollapsed ? "sm:w-full sm:justify-center sm:px-2" : ""}`,
                          children: /* @__PURE__ */ jsxs22(
                            "div",
                            {
                              className: `flex w-full items-center gap-3 ${roomsRailCollapsed ? "sm:justify-center" : "justify-between"}`,
                              children: [
                                /* @__PURE__ */ jsxs22("div", { className: "flex min-w-0 items-center gap-3", children: [
                                  renderMobileTopbarControls ? renderSettingsDialog() : null,
                                  /* @__PURE__ */ jsx27(
                                    "button",
                                    {
                                      type: "button",
                                      onClick: () => setRoomsRailCollapsed((current) => !current),
                                      className: "thread-icon-button thread-desktop-only-flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                                      title: roomsRailCollapsed ? "Expand rooms" : "Collapse rooms",
                                      "aria-label": roomsRailCollapsed ? "Expand rooms" : "Collapse rooms",
                                      children: roomsRailCollapsed ? /* @__PURE__ */ jsx27(PanelLeftOpen, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx27(PanelLeftClose, { className: "h-4 w-4" })
                                    }
                                  ),
                                  navigationTitle && (!roomsRailCollapsed || renderMobileTopbarControls) ? /* @__PURE__ */ jsx27("span", { className: "truncate text-sm font-semibold text-[var(--theme-fg)]", children: navigationTitle }) : null
                                ] }),
                                /* @__PURE__ */ jsx27(
                                  "div",
                                  {
                                    className: `flex shrink-0 items-center gap-1 ${roomsRailCollapsed ? "thread-desktop-collapsed-hidden" : ""}`,
                                    children: /* @__PURE__ */ jsx27(
                                      "button",
                                      {
                                        type: "button",
                                        onClick: () => setMobileRoomsOpen(false),
                                        "aria-label": "Close rooms",
                                        title: "Close rooms",
                                        className: "thread-icon-button thread-mobile-only-inline-flex h-10 w-10 items-center justify-center rounded-full",
                                        children: /* @__PURE__ */ jsx27(X2, { className: "h-4 w-4" })
                                      }
                                    )
                                  }
                                )
                              ]
                            }
                          )
                        }
                      ),
                      renderNavigationHeader?.({
                        collapsed: roomsRailCollapsed && !renderMobileTopbarControls,
                        closeNavigation: closeNavigationSurfaces
                      }),
                      /* @__PURE__ */ jsx27(
                        "div",
                        {
                          className: `thread-graph-new-room-strip flex shrink-0 items-center border-b ${roomsRailCollapsed ? "h-12 w-full justify-center px-2 sm:h-12" : "h-[68px] px-4"}`,
                          children: renderNewThreadDialogButton(
                            `thread-graph-new-room-button inline-flex items-center justify-center rounded-xl font-medium transition ${roomsRailCollapsed && !renderMobileTopbarControls ? "h-9 w-9 p-0" : "h-11 w-full gap-2 px-3 text-sm sm:h-9"}`,
                            roomsRailCollapsed && !renderMobileTopbarControls
                          )
                        }
                      ),
                      /* @__PURE__ */ jsx27(
                        "div",
                        {
                          className: `flex min-h-0 flex-1 flex-col ${roomsRailCollapsed ? "w-full px-2 py-2" : "px-3 py-3"}`,
                          children: renderRoomsRailContent(roomsRailCollapsed && !renderMobileTopbarControls)
                        }
                      )
                    ]
                  }
                ) : null,
                /* @__PURE__ */ jsx27(GraphChatMainShell, { children: /* @__PURE__ */ jsx27(GraphChatSplitRegion, { children: hasWorkspace && !workspaceCollapsed ? renderWorkspaceFocusSplit ? /* @__PURE__ */ jsxs22("div", { className: "thread-split-container h-full min-h-0 overflow-hidden", children: [
                  /* @__PURE__ */ jsx27(
                    "div",
                    {
                      className: `h-full min-h-0 overflow-hidden ${mobileWorkspace === "chat" ? "block" : renderMobileWorkspaceSplit ? "thread-mobile-chat-hidden" : "hidden"}`,
                      children
                    }
                  ),
                  /* @__PURE__ */ jsx27(
                    "div",
                    {
                      className: `h-full min-h-0 overflow-hidden ${mobileWorkspace === "workspace" ? "block" : renderMobileWorkspaceSplit ? "thread-mobile-workspace-hidden" : "hidden"}`,
                      children: mobileWorkspace === "workspace" || workspaceVisited ? renderWorkspacePanel() : null
                    }
                  )
                ] }) : /* @__PURE__ */ jsxs22(
                  ResizablePanelGroup,
                  {
                    direction: "horizontal",
                    className: "thread-split-container thread-graph-shell-resizable thread-graph-shell-desktop-split h-full min-h-0 overflow-hidden",
                    children: [
                      /* @__PURE__ */ jsx27(
                        ResizablePanel,
                        {
                          defaultSize: 47,
                          minSize: 30,
                          maxSize: 75,
                          className: "thread-split-chat-pane min-w-0 overflow-hidden",
                          children
                        }
                      ),
                      /* @__PURE__ */ jsx27(ResizableHandle, { className: "thread-resize-handle w-2 bg-transparent after:w-px after:bg-slate-200/80 after:transition-colors hover:after:bg-slate-300 dark:after:bg-[#303642] dark:hover:after:bg-[#475063]" }),
                      /* @__PURE__ */ jsx27(
                        ResizablePanel,
                        {
                          defaultSize: 53,
                          minSize: 30,
                          maxSize: 70,
                          className: "thread-split-workspace-pane min-w-0 overflow-hidden",
                          children: renderWorkspacePanel()
                        }
                      )
                    ]
                  }
                ) : /* @__PURE__ */ jsxs22("div", { className: "thread-split-container relative h-full min-h-0 overflow-hidden", children: [
                  hasWorkspace && workspaceCollapsed ? /* @__PURE__ */ jsx27(
                    "button",
                    {
                      type: "button",
                      onClick: () => setWorkspaceCollapsed(false),
                      className: "thread-workspace-expand-fab thread-desktop-only-inline-flex",
                      title: "Expand workspace",
                      "aria-label": "Expand workspace",
                      children: /* @__PURE__ */ jsx27(ChevronsLeft, { className: "h-4 w-4" })
                    }
                  ) : null,
                  children
                ] }) }) })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx27(
      RenameDialog,
      {
        open: editingThreadId !== null,
        title: "Rename Thread",
        label: "Thread Title",
        value: draftTitle,
        busy: renamingThreadId !== null,
        onChange: setDraftTitle,
        onCancel: cancelRenameThread,
        onSubmit: () => editingThreadId ? handleRenameThread(editingThreadId) : void 0
      }
    )
  ] });
}

// src/components/ThreadTimeline.tsx
import { mergeThreadHistoryItem as mergeThreadHistoryItem2 } from "@remote-codex/shared";
import { memo as memo6, useCallback as useCallback14, useEffect as useEffect20, useMemo as useMemo8, useRef as useRef17, useState as useState29 } from "react";

// src/components/LongTextDialog.tsx
import { useEffect as useEffect11 } from "react";
import { createPortal as createPortal2 } from "react-dom";
import { jsx as jsx28, jsxs as jsxs23 } from "react/jsx-runtime";
function LongTextDialog({
  open,
  title,
  text,
  onClose
}) {
  useEffect11(() => {
    if (!open) {
      return;
    }
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);
  if (!open) {
    return null;
  }
  return createPortal2(
    /* @__PURE__ */ jsxs23("div", { className: "fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6", children: [
      /* @__PURE__ */ jsx28(
        "button",
        {
          type: "button",
          "aria-label": "Close full text",
          onClick: onClose,
          className: "absolute inset-0 bg-stone-950/78 backdrop-blur-sm"
        }
      ),
      /* @__PURE__ */ jsxs23(
        "div",
        {
          role: "dialog",
          "aria-modal": "true",
          "aria-label": title,
          className: "relative z-[1] flex max-h-[min(82vh,52rem)] w-full max-w-4xl flex-col overflow-hidden rounded-[1.8rem] border border-stone-700 bg-stone-900 shadow-2xl shadow-stone-950/40",
          children: [
            /* @__PURE__ */ jsxs23("div", { className: "flex items-center justify-between gap-3 border-b border-stone-800 px-4 py-3 sm:px-5", children: [
              /* @__PURE__ */ jsx28("p", { className: "truncate text-sm font-medium text-stone-100", children: title }),
              /* @__PURE__ */ jsx28(
                "button",
                {
                  type: "button",
                  "aria-label": "Close dialog",
                  onClick: onClose,
                  className: "inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-700 text-stone-300 transition hover:bg-stone-800",
                  children: /* @__PURE__ */ jsx28(
                    "svg",
                    {
                      "aria-hidden": "true",
                      viewBox: "0 0 16 16",
                      className: "h-4 w-4 fill-current",
                      children: /* @__PURE__ */ jsx28("path", { d: "M3.22 2.47 8 7.25l4.78-4.78 1.06 1.06L9.06 8.31l4.78 4.78-1.06 1.06L8 9.37l-4.78 4.78-1.06-1.06 4.78-4.78-4.78-4.78 1.06-1.06Z" })
                    }
                  )
                }
              )
            ] }),
            /* @__PURE__ */ jsx28("div", { className: "min-h-0 flex-1 overflow-auto px-4 py-4 sm:px-5", children: /* @__PURE__ */ jsx28("pre", { className: "whitespace-pre-wrap break-words text-sm leading-6 text-stone-200", children: text }) })
          ]
        }
      )
    ] }),
    document.body
  );
}

// src/components/graph-chat/GraphChatCompactMessageItem.tsx
import {
  memo as memo3,
  useEffect as useEffect16,
  useRef as useRef12,
  useState as useState20
} from "react";
import { Brain, Check as Check4, Copy as Copy3 } from "lucide-react";

// src/components/graph-chat/GraphChatMessageBody.tsx
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  memo as memo2,
  useCallback as useCallback10,
  useEffect as useEffect15,
  useLayoutEffect as useLayoutEffect4,
  useMemo as useMemo6,
  useRef as useRef11,
  useState as useState18
} from "react";

// src/components/graph-chat/MessageExpansionScope.tsx
import { createContext as createContext2, useContext as useContext2, useEffect as useEffect12, useState as useState15 } from "react";
import { jsx as jsx29 } from "react/jsx-runtime";
var ExpansionContext = createContext2(null);
function MessageExpansionScope({ children }) {
  const [cache] = useState15(() => ({ messages: /* @__PURE__ */ new Map(), live: null }));
  return /* @__PURE__ */ jsx29(ExpansionContext.Provider, { value: cache, children });
}
function useMessageExpansion(messageId, text, streaming) {
  const cache = useContext2(ExpansionContext);
  const remembered = messageId ? cache?.messages.get(messageId) : void 0;
  const inherited = remembered ?? (cache?.live && text.startsWith(cache.live.text) ? cache.live.expanded : false);
  const [choice, setChoice] = useState15({ messageId, expanded: inherited });
  const expanded = choice.messageId === messageId ? choice.expanded : inherited;
  const setExpanded = (next) => {
    if (messageId) cache?.messages.set(messageId, next);
    if (cache && messageId === "live-agent-message") cache.live = { text, expanded: next };
    setChoice({ messageId, expanded: next });
  };
  useEffect12(() => {
    if (!streaming) return;
    if (messageId) cache?.messages.set(messageId, true);
    if (cache && messageId === "live-agent-message" && text) cache.live = { text, expanded: true };
    setChoice((current) => current.messageId === messageId && current.expanded ? current : { messageId, expanded: true });
  }, [cache, messageId, streaming, text]);
  return [expanded, setExpanded];
}

// src/components/markdownHeuristics.ts
var BLOCK_MARKDOWN_PATTERNS = [
  /^(?: {0,3})#{1,6}\s+\S/m,
  /^(?: {0,3})>{1,}\s*\S/m,
  /^(?: {0,3})(?:[-+*]|\d{1,9}[.)])\s+(?:\[[ xX]\]\s+)?\S/m,
  /^(?: {0,3})(?:```|~~~)/m,
  /^(?: {0,3})(?:[-*_]\s*){3,}$/m
];
var TABLE_MARKDOWN_PATTERN = /^(?:\|?[^|\n]+\|[^|\n]+(?:\|[^|\n]+)*\|?\s*\n\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$)/m;
var INLINE_LINK_PATTERN = /!?\[[^\]\n]+\]\([^)]+\)/;
var INLINE_CODE_PATTERN = /`[^`\n]+`/;
var STRONG_EMPHASIS_PATTERN = /(?:\*\*[^*\n]+\*\*|__[^_\n]+__)/;
var EMPHASIS_PATTERN = /(^|[^\w])(?:\*[^*\n]+\*|_[^_\n]+_)(?=[^\w]|$)/;
var STRIKETHROUGH_PATTERN = /~~[^~\n]+~~/;
var INLINE_MATH_PATTERN = /(^|[^\\])\$(?!\s)(?:\\.|[^$\n\\])+\$(?!\d)/;
var BLOCK_MATH_PATTERN = /(^|\n)\s*\$\$[^]*?\$\$\s*(?=\n|$)/;
function hasLikelyMarkdownSyntax(text) {
  const trimmed = text.trim();
  if (!trimmed) {
    return false;
  }
  if (BLOCK_MARKDOWN_PATTERNS.some((pattern) => pattern.test(trimmed)) || TABLE_MARKDOWN_PATTERN.test(trimmed)) {
    return true;
  }
  if (BLOCK_MATH_PATTERN.test(trimmed)) {
    return true;
  }
  if (!/[`[\]*_~!$]/.test(trimmed)) {
    return false;
  }
  return INLINE_LINK_PATTERN.test(trimmed) || INLINE_CODE_PATTERN.test(trimmed) || STRONG_EMPHASIS_PATTERN.test(trimmed) || EMPHASIS_PATTERN.test(trimmed) || STRIKETHROUGH_PATTERN.test(trimmed) || INLINE_MATH_PATTERN.test(trimmed);
}

// src/components/graph-chat/GraphChatMessageContent.tsx
import {
  memo,
  useEffect as useEffect14,
  isValidElement,
  useMemo as useMemo5,
  useRef as useRef10,
  useState as useState17
} from "react";
import { Check as Check3, Copy as Copy2 } from "lucide-react";
import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkCjkFriendly from "remark-cjk-friendly";
import remarkMath from "remark-math";

// src/components/graph-chat/remarkLatex.ts
var tokenize = function(effects, ok, nok) {
  let closing;
  const start = (code) => {
    effects.enter("latexMath");
    effects.consume(code);
    return open;
  };
  const open = (code) => {
    if (code !== 40 && code !== 91) return nok(code);
    closing = code === 40 ? 41 : 93;
    effects.consume(code);
    return body;
  };
  const body = (code) => {
    if (code === null) return nok(code);
    if (code === -5 || code === -4 || code === -3) {
      effects.enter("lineEnding");
      effects.consume(code);
      effects.exit("lineEnding");
      return body;
    }
    effects.enter("latexMathData");
    return data(code);
  };
  const data = (code) => {
    if (code === null) return nok(code);
    if (code === -5 || code === -4 || code === -3) {
      effects.exit("latexMathData");
      return body(code);
    }
    effects.consume(code);
    return code === 92 ? slash : data;
  };
  const slash = (code) => {
    if (code === closing) {
      effects.consume(code);
      effects.exit("latexMathData");
      effects.exit("latexMath");
      return ok;
    }
    if (code === null) return nok(code);
    if (code === 92) {
      effects.consume(code);
      return data;
    }
    return data(code);
  };
  return start;
};
var syntax = { text: { 92: { name: "latexMath", tokenize } } };
var fromMarkdown = {
  enter: {
    latexMath(token) {
      const raw = this.sliceSerialize(token);
      this.enter({
        type: "inlineMath",
        value: raw.slice(2, -2).trim(),
        data: {
          hName: "code",
          hChildren: [{ type: "text", value: raw.slice(2, -2).trim() }],
          hProperties: {
            className: ["language-math", raw[1] === "[" ? "math-display" : "math-inline"]
          }
        }
      }, token);
    }
  },
  exit: { latexMath(token) {
    this.exit(token);
  } }
};
function remarkLatex() {
  const data = this.data();
  (data.micromarkExtensions ??= []).push(syntax);
  (data.fromMarkdownExtensions ??= []).push(fromMarkdown);
}

// src/components/graph-chat/GraphChatMessageContent.tsx
import "katex/dist/katex.min.css";

// src/plugins/usePlugins.ts
import { useContext as useContext3 } from "react";

// src/plugins/plugin-context.ts
import { createContext as createContext3 } from "react";
function mergePluginState(modules, serverPlugins) {
  const byId = new Map(serverPlugins.map((plugin) => [plugin.id, plugin]));
  const merged = modules.map((module) => ({
    ...module.manifest,
    enabled: byId.get(module.manifest.id)?.enabled ?? true,
    source: byId.get(module.manifest.id)?.source ?? "builtin"
  }));
  const moduleIds = new Set(modules.map((module) => module.manifest.id));
  for (const plugin of serverPlugins) {
    if (!moduleIds.has(plugin.id)) {
      merged.push(plugin);
    }
  }
  return merged;
}
function createDefaultPluginContextValue(modules = []) {
  const plugins = mergePluginState(modules, []);
  const enabledModules = modules;
  const renderArtifact = (context) => {
    const module = enabledModules.find(
      (entry) => entry.renderArtifact && entry.manifest.capabilities.artifactTypes.some(
        (type) => type.type === context.artifact.type
      )
    );
    return module?.renderArtifact?.(context) ?? null;
  };
  const renderInlineCode = (context) => {
    for (const module of enabledModules) {
      for (const renderer of module.inlineCodeRenderers ?? []) {
        if (!renderer.languages.includes(context.language.trim().toLowerCase())) {
          continue;
        }
        const rendered = renderer.render(context);
        if (rendered) {
          return rendered;
        }
      }
    }
    return null;
  };
  return {
    plugins,
    loading: false,
    error: null,
    async refresh() {
    },
    async importPluginManifest() {
    },
    async setPluginEnabled() {
    },
    async uninstallPlugin() {
    },
    renderArtifact,
    renderInlineCode,
    hasRendererForArtifact: (artifact) => enabledModules.some(
      (entry) => Boolean(entry.renderArtifact) && entry.manifest.capabilities.artifactTypes.some(
        (type) => type.type === artifact.type
      )
    ),
    getThreadPanels: () => enabledModules.flatMap((module) => module.threadPanels ?? [])
  };
}
var PluginContext = createContext3(createDefaultPluginContextValue());

// src/plugins/usePlugins.ts
function usePlugins() {
  return useContext3(PluginContext) ?? createDefaultPluginContextValue();
}

// src/components/graph-chat/GraphChatToolCall.tsx
import { useEffect as useEffect13, useMemo as useMemo4, useState as useState16 } from "react";
import { CheckCircle2, Loader2 as Loader22, Wrench, XCircle } from "lucide-react";

// src/components/graph-workspace/GraphAccordion.tsx
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";
import { jsx as jsx30, jsxs as jsxs24 } from "react/jsx-runtime";
function classNames(...values) {
  return values.filter(Boolean).join(" ");
}
function Accordion({
  ...props
}) {
  return /* @__PURE__ */ jsx30(AccordionPrimitive.Root, { "data-slot": "accordion", ...props });
}
function AccordionItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx30(
    AccordionPrimitive.Item,
    {
      "data-slot": "accordion-item",
      className: classNames("border-b last:border-b-0", className),
      ...props
    }
  );
}
function AccordionTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx30(AccordionPrimitive.Header, { className: "flex", children: /* @__PURE__ */ jsxs24(
    AccordionPrimitive.Trigger,
    {
      "data-slot": "accordion-trigger",
      className: classNames(
        "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium outline-none transition-all hover:underline disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx30(ChevronDownIcon, { className: "pointer-events-none size-4 shrink-0 translate-y-0.5 text-[var(--theme-fg-muted)] transition-transform duration-200" })
      ]
    }
  ) });
}
function AccordionContent({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsx30(
    AccordionPrimitive.Content,
    {
      "data-slot": "accordion-content",
      className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      ...props,
      children: /* @__PURE__ */ jsx30("div", { className: classNames("pb-4 pt-0", className), children })
    }
  );
}

// src/components/graph-chat/GraphChatToolCall.tsx
import { jsx as jsx31, jsxs as jsxs25 } from "react/jsx-runtime";
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function normalizeObjectEntries(value) {
  if (isRecord(value)) {
    return Object.entries(value);
  }
  if (value === void 0 || value === null || value === "") {
    return [];
  }
  return [["value", value]];
}
function formatPrimitiveValue(value) {
  if (typeof value === "string") {
    return /* @__PURE__ */ jsxs25("span", { className: "thread-graph-tool-string", children: [
      '"',
      value,
      '"'
    ] });
  }
  if (typeof value === "number") {
    return /* @__PURE__ */ jsx31("span", { className: "thread-graph-tool-number", children: value });
  }
  if (typeof value === "boolean") {
    return /* @__PURE__ */ jsx31("span", { className: "thread-graph-tool-boolean", children: String(value) });
  }
  if (value === null) {
    return /* @__PURE__ */ jsx31("span", { className: "thread-graph-tool-null", children: "null" });
  }
  if (typeof value === "object") {
    return /* @__PURE__ */ jsx31("span", { className: "thread-graph-tool-object", children: JSON.stringify(value) });
  }
  return /* @__PURE__ */ jsx31("span", { children: String(value) });
}
function renderResultValue(key, value) {
  if (typeof value === "string" && (key === "stdout" || key === "stderr" || key === "result")) {
    return /* @__PURE__ */ jsx31("pre", { className: "thread-graph-tool-output", children: value || "(empty)" });
  }
  if (typeof value === "object" && value !== null) {
    return /* @__PURE__ */ jsx31("pre", { className: "thread-graph-tool-output", children: JSON.stringify(value, null, 2) });
  }
  return formatPrimitiveValue(value);
}
function GraphChatToolCall({
  callId,
  toolName,
  status,
  parameters,
  result
}) {
  const statusConfig = useMemo4(() => {
    switch (status) {
      case "completed":
        return {
          className: "is-completed",
          icon: /* @__PURE__ */ jsx31(CheckCircle2, { className: "h-3.5 w-3.5" }),
          label: "Completed"
        };
      case "failed":
        return {
          className: "is-failed",
          icon: /* @__PURE__ */ jsx31(XCircle, { className: "h-3.5 w-3.5" }),
          label: "Failed"
        };
      default:
        return {
          className: "is-pending",
          icon: /* @__PURE__ */ jsx31(Loader22, { className: "h-3.5 w-3.5 animate-spin" }),
          label: "Running"
        };
    }
  }, [status]);
  const resultEntries = useMemo4(() => normalizeObjectEntries(result), [result]);
  const parameterEntries = useMemo4(
    () => normalizeObjectEntries(parameters),
    [parameters]
  );
  const shouldAutoOpen = status === "pending";
  const actionLabel = /(?:exec|command|shell|terminal)/i.test(toolName) ? "Ran" : "Used";
  const [openItem, setOpenItem] = useState16(
    shouldAutoOpen ? "item-1" : void 0
  );
  useEffect13(() => {
    if (shouldAutoOpen) {
      setOpenItem("item-1");
    }
  }, [callId, shouldAutoOpen]);
  return /* @__PURE__ */ jsx31("div", { className: "thread-graph-tool-call my-2 w-full font-sans not-prose", children: /* @__PURE__ */ jsx31(
    Accordion,
    {
      type: "single",
      collapsible: true,
      onValueChange: (value) => setOpenItem(value || void 0),
      className: "thread-graph-tool-accordion w-full overflow-hidden rounded-lg border",
      ...openItem !== void 0 ? { value: openItem } : {},
      children: /* @__PURE__ */ jsxs25(AccordionItem, { value: "item-1", className: "border-0", children: [
        /* @__PURE__ */ jsx31(AccordionTrigger, { className: "thread-graph-tool-trigger px-4 py-3 hover:no-underline", children: /* @__PURE__ */ jsxs25("div", { className: "flex min-w-0 items-center gap-2", children: [
          /* @__PURE__ */ jsx31(Wrench, { className: "h-4 w-4 shrink-0" }),
          /* @__PURE__ */ jsx31("span", { className: "thread-graph-tool-action shrink-0 text-sm font-medium", children: actionLabel }),
          /* @__PURE__ */ jsx31("span", { className: "thread-graph-tool-name min-w-0 truncate font-mono text-sm font-normal", children: toolName }),
          /* @__PURE__ */ jsxs25(
            "span",
            {
              className: `thread-graph-tool-badge ${statusConfig.className}`,
              title: statusConfig.label,
              "aria-label": `Status: ${statusConfig.label}`,
              children: [
                statusConfig.icon,
                /* @__PURE__ */ jsx31("span", { className: "thread-graph-status-label", children: statusConfig.label })
              ]
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxs25(AccordionContent, { className: "thread-graph-tool-content px-4 pb-4 pt-1", children: [
          /* @__PURE__ */ jsxs25("section", { children: [
            /* @__PURE__ */ jsx31("h4", { children: "Parameters" }),
            /* @__PURE__ */ jsxs25("div", { className: "thread-graph-tool-json", children: [
              "{",
              /* @__PURE__ */ jsx31("br", {}),
              parameterEntries.length > 0 ? parameterEntries.map(([key, value], index) => /* @__PURE__ */ jsxs25("div", { children: [
                /* @__PURE__ */ jsxs25("span", { className: "thread-graph-tool-key", children: [
                  '"',
                  key,
                  '"'
                ] }),
                /* @__PURE__ */ jsx31("span", { className: "thread-graph-tool-punctuation", children: ": " }),
                formatPrimitiveValue(value),
                index < parameterEntries.length - 1 ? /* @__PURE__ */ jsx31("span", { className: "thread-graph-tool-punctuation", children: "," }) : null
              ] }, key)) : /* @__PURE__ */ jsx31("div", { children: /* @__PURE__ */ jsx31("span", { className: "thread-graph-tool-null", children: "empty" }) }),
              "}"
            ] })
          ] }),
          resultEntries.length > 0 ? /* @__PURE__ */ jsxs25("section", { children: [
            /* @__PURE__ */ jsx31("h4", { children: "Result" }),
            /* @__PURE__ */ jsxs25("div", { className: "thread-graph-tool-json", children: [
              "{",
              /* @__PURE__ */ jsx31("br", {}),
              resultEntries.map(([key, value], index) => /* @__PURE__ */ jsxs25("div", { children: [
                /* @__PURE__ */ jsxs25("span", { className: "thread-graph-tool-key", children: [
                  '"',
                  key,
                  '"'
                ] }),
                /* @__PURE__ */ jsx31("span", { className: "thread-graph-tool-punctuation", children: ": " }),
                renderResultValue(key, value),
                index < resultEntries.length - 1 ? /* @__PURE__ */ jsx31("span", { className: "thread-graph-tool-punctuation", children: "," }) : null
              ] }, key)),
              "}"
            ] })
          ] }) : null
        ] })
      ] })
    }
  ) });
}

// src/components/graph-chat/graphChatToolBlocks.ts
function isRecord2(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function reconstructGraphChatToolArgs(args) {
  if (!args) {
    return {};
  }
  if (isRecord2(args) && Object.prototype.hasOwnProperty.call(args, "0")) {
    try {
      const reconstructedString = Object.keys(args).map(Number).filter((key) => Number.isFinite(key)).sort((left, right) => left - right).map((key) => String(args[String(key)] ?? "")).join("");
      return JSON.parse(reconstructedString);
    } catch {
      return args;
    }
  }
  if (typeof args === "string") {
    try {
      return JSON.parse(args);
    } catch {
      return args;
    }
  }
  return args;
}
function createEmptyGraphChatToolResultState() {
  return {
    finalResult: null,
    stdout: "",
    stderr: ""
  };
}
function normalizeToolResult(result) {
  return typeof result === "string" ? { result } : result;
}
function mergeGraphChatToolResultState(state) {
  const merged = isRecord2(state.finalResult) ? { ...state.finalResult } : state.finalResult != null ? { result: state.finalResult } : {};
  if (state.stdout) {
    merged.stdout = state.stdout;
  }
  if (state.stderr) {
    merged.stderr = state.stderr;
  }
  if (!("status" in merged) && (state.stdout || state.stderr)) {
    merged.status = "pending";
  }
  return merged;
}
function getGraphChatToolUiStatus(result) {
  if (!result) {
    return "pending";
  }
  if (!isRecord2(result)) {
    return "completed";
  }
  const status = result.status;
  if (status === "stream" || status === "pending" || status === "running") {
    return "pending";
  }
  if (status === "failed" || status === "error" || status === "timed_out") {
    return "failed";
  }
  if (typeof result.exit_code === "number" && result.exit_code !== 0) {
    return "failed";
  }
  return "completed";
}
function preprocessGraphChatToolBlocks(content) {
  const resultMap = /* @__PURE__ */ new Map();
  const resultRegex = /```tool-result\s*([\s\S]*?)\s*```/g;
  const contentWithoutOrphanedResults = content.replace(
    resultRegex,
    (fullMatch, jsonContent) => {
      try {
        const data = JSON.parse(jsonContent);
        const callId = data.call_id;
        if (typeof callId !== "string") {
          return fullMatch;
        }
        const normalizedResult = normalizeToolResult(data.result);
        const state = resultMap.get(callId) ?? createEmptyGraphChatToolResultState();
        if (isRecord2(normalizedResult) && normalizedResult.status === "stream" && typeof normalizedResult.chunk === "string") {
          if (normalizedResult.stream === "stderr") {
            state.stderr += normalizedResult.chunk;
          } else {
            state.stdout += normalizedResult.chunk;
          }
        } else {
          state.finalResult = normalizedResult;
        }
        resultMap.set(callId, state);
        return "";
      } catch {
        return fullMatch;
      }
    }
  );
  const callRegex = /```tool-call\s*([\s\S]*?)\s*```/g;
  const processedContent = contentWithoutOrphanedResults.replace(
    callRegex,
    (fullMatch, jsonContent) => {
      try {
        const data = JSON.parse(jsonContent);
        const callId = data.call_id;
        const tool = data.tool;
        if (typeof tool !== "string") {
          return fullMatch;
        }
        const args = reconstructGraphChatToolArgs(data.args);
        if (typeof callId === "string" && resultMap.has(callId)) {
          const resultData = mergeGraphChatToolResultState(
            resultMap.get(callId) ?? createEmptyGraphChatToolResultState()
          );
          const mergedPayload = JSON.stringify(
            {
              call: { tool, args, call_id: callId },
              result: resultData
            },
            null,
            2
          );
          return `\`\`\`tool-merged
${mergedPayload}
\`\`\``;
        }
        return fullMatch;
      } catch {
        return fullMatch;
      }
    }
  );
  return { processedContent, resultMap };
}

// src/components/graph-chat/GraphChatMessageContent.tsx
import { Fragment as Fragment5, jsx as jsx32, jsxs as jsxs26 } from "react/jsx-runtime";
function ensureTransparentShikiBg(html) {
  return html.replace(/background-color:[^;"]+;?/g, "background-color: transparent;").replace(/background:[^;"]+;?/g, "background: transparent;");
}
function textFromReactNode(children) {
  if (Array.isArray(children)) {
    return children.map((child) => String(child)).join("");
  }
  return String(children ?? "");
}
function readMarkdownNodeLineRange(node) {
  if (!node || typeof node !== "object" || !("position" in node)) {
    return { startLine: void 0, endLine: void 0 };
  }
  const position = node.position;
  if (!position || typeof position !== "object") {
    return { startLine: void 0, endLine: void 0 };
  }
  const start = position.start;
  const end = position.end;
  const startLine = start && typeof start === "object" ? start.line : void 0;
  const endLine = end && typeof end === "object" ? end.line : void 0;
  return {
    startLine: typeof startLine === "number" ? startLine : void 0,
    endLine: typeof endLine === "number" ? endLine : void 0
  };
}
function parseWorkspaceFileHref(href, workspaceRootPath) {
  if (!href) {
    return null;
  }
  const candidate = localFileHref(href, typeof window === "undefined" ? void 0 : window.location.origin);
  if (!candidate) return null;
  const lineMatch = candidate.match(/(?:#L|:)(\d+)(?::\d+)?$/);
  const line = lineMatch ? Number.parseInt(lineMatch[1] ?? "", 10) : void 0;
  const rawPath = lineMatch ? candidate.slice(0, -lineMatch[0].length) : candidate;
  const path = workspaceRootPath ? relativeWorkspacePath(rawPath, workspaceRootPath) ?? rawPath : rawPath;
  if (!path || path === "/") {
    return null;
  }
  return {
    path,
    ...Number.isFinite(line) ? { line } : {}
  };
}
function PreRenderer({ children, ...props }) {
  if (isToolCodeElement(children)) {
    return /* @__PURE__ */ jsx32(Fragment5, { children });
  }
  return /* @__PURE__ */ jsx32("pre", { ...props, children });
}
function isToolCodeElement(value) {
  if (!value || typeof value !== "object" || !("props" in value)) {
    return false;
  }
  const className = value.props?.className;
  if (typeof className !== "string") {
    return false;
  }
  return className.includes("language-tool-call") || className.includes("language-tool-merged") || className.includes("language-tool-result");
}
var GraphChatMessageContent = memo(function GraphChatMessageContent2({
  className = "thread-graph-markdown",
  content,
  readOnly = false,
  onOpenWorkspaceFile,
  workspaceRootPath,
  resolveHref
}) {
  const rootRef = useRef10(null);
  const plugins = usePlugins();
  const [highlighter, setHighlighter] = useState17(null);
  const [copyState, setCopyState] = useState17({});
  const [touchCode, setTouchCode] = useState17(null);
  const [dark, setDark] = useState17(false);
  const { processedContent, resultMap } = useMemo5(
    () => readOnly ? { processedContent: content, resultMap: /* @__PURE__ */ new Map() } : preprocessGraphChatToolBlocks(content),
    [content, readOnly]
  );
  useEffect14(() => {
    let alive = true;
    getGraphChatHighlighter().then((loadedHighlighter) => {
      if (alive) {
        setHighlighter(loadedHighlighter);
      }
    }).catch(() => void 0);
    return () => {
      alive = false;
    };
  }, []);
  useEffect14(() => {
    const root = rootRef.current;
    const shell = root?.closest(".thread-ui-shell");
    const readDark = () => {
      if (!shell) {
        return document.documentElement.classList.contains("dark");
      }
      return shell.getAttribute("data-theme-effective") === "dark" || shell.classList.contains("dark") || shell.classList.contains("thread-ui-theme-dark");
    };
    setDark(readDark());
    if (!shell) {
      return;
    }
    const observer = new MutationObserver(() => setDark(readDark()));
    observer.observe(shell, {
      attributes: true,
      attributeFilter: ["class", "data-theme-effective"]
    });
    return () => observer.disconnect();
  }, []);
  async function copyCode(id, value) {
    try {
      await navigator.clipboard.writeText(value);
      setCopyState((current) => ({ ...current, [id]: "copied" }));
      window.setTimeout(() => {
        setCopyState((current) => {
          const next = { ...current };
          delete next[id];
          return next;
        });
      }, 1200);
    } catch {
      setCopyState((current) => ({ ...current, [id]: "failed" }));
    }
  }
  const CodeBlockRenderer = ({
    children,
    className: codeClassName,
    inline,
    node,
    ...props
  }) => {
    const match = /language-(\w+(?:-\w+)*)/.exec(codeClassName || "");
    const language = match ? match[1] ?? "" : "";
    const textContent = textFromReactNode(children).replace(/\n$/, "");
    const { startLine, endLine } = readMarkdownNodeLineRange(node);
    const isFencedOrBlockCode = inline === false || Boolean(codeClassName) || textContent.includes("\n") || startLine !== endLine;
    if (!readOnly && language === "tool-merged") {
      let data = {
        call: { tool: "Unknown", args: {}, call_id: void 0 },
        result: null
      };
      try {
        data = JSON.parse(textContent);
      } catch {
        data = {
          call: { tool: "Error", args: { raw: textContent } },
          result: { status: "failed" }
        };
      }
      const toolName = typeof data.call.tool === "string" ? data.call.tool : "Unknown";
      const callId = typeof data.call.call_id === "string" ? data.call.call_id : void 0;
      return /* @__PURE__ */ jsx32(
        GraphChatToolCall,
        {
          callId,
          toolName,
          status: getGraphChatToolUiStatus(data.result),
          parameters: reconstructGraphChatToolArgs(data.call.args),
          result: data.result
        }
      );
    }
    if (!readOnly && language === "tool-call") {
      let data = {
        tool: "Unknown",
        args: {},
        call_id: void 0
      };
      try {
        data = JSON.parse(textContent);
      } catch {
        data = { tool: "Error", args: { raw: textContent } };
      }
      const callId = typeof data.call_id === "string" ? data.call_id : void 0;
      const liveResult = callId && resultMap.has(callId) ? mergeGraphChatToolResultState(
        resultMap.get(callId) ?? createEmptyGraphChatToolResultState()
      ) : void 0;
      return /* @__PURE__ */ jsx32(
        GraphChatToolCall,
        {
          callId,
          toolName: typeof data.tool === "string" ? data.tool : "Unknown",
          status: liveResult ? getGraphChatToolUiStatus(liveResult) : "pending",
          parameters: reconstructGraphChatToolArgs(data.args),
          result: liveResult
        }
      );
    }
    if (!readOnly && language === "tool-result") {
      return null;
    }
    if (!readOnly && ["xyz", "extxyz", "cif", "pdb"].includes(language)) {
      const rendered = plugins.renderInlineCode({
        code: textContent,
        isIncomplete: false,
        language
      });
      if (isValidElement(rendered)) {
        return rendered;
      }
    }
    if (isFencedOrBlockCode) {
      const loadedLanguages = highlighter?.getLoadedLanguages?.() ?? [];
      const lang = loadedLanguages.includes(language) ? language : "text";
      const theme = dark ? "ayu-dark" : "ayu-light";
      const id = `${language || "text"}:${textContent.length}:${textContent.slice(0, 32)}`;
      let html = "";
      if (highlighter) {
        try {
          html = ensureTransparentShikiBg(
            highlighter.codeToHtml(textContent, { lang, theme })
          );
        } catch {
          html = ensureTransparentShikiBg(
            highlighter.codeToHtml(textContent, { lang: "text", theme })
          );
        }
      }
      return /* @__PURE__ */ jsxs26(
        "div",
        {
          className: "thread-graph-code-block not-prose relative my-3 overflow-auto rounded-xl border p-3 text-sm shadow-sm",
          "data-touch-actions": touchCode === id ? "true" : "false",
          onPointerUp: (event) => {
            if (event.pointerType !== "mouse" && !(event.target instanceof Element && event.target.closest("button"))) {
              event.stopPropagation();
              setTouchCode((current) => current === id ? null : id);
            }
          },
          children: [
            !readOnly && /* @__PURE__ */ jsx32(
              Button,
              {
                type: "button",
                onClick: () => void copyCode(id, textContent),
                variant: "ghost",
                size: "sm",
                className: "thread-graph-code-copy absolute right-2 top-2 z-10 rounded-md p-1.5",
                title: copyState[id] === "copied" ? "Copied" : copyState[id] === "failed" ? "Copy failed" : "Copy",
                "aria-label": "Copy code",
                children: copyState[id] === "copied" ? /* @__PURE__ */ jsx32(Check3, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsx32(Copy2, { className: "h-3.5 w-3.5" })
              }
            ),
            html ? /* @__PURE__ */ jsx32("div", { dangerouslySetInnerHTML: { __html: html } }) : /* @__PURE__ */ jsx32("pre", { children: /* @__PURE__ */ jsx32("code", { className: "whitespace-pre", children: textContent }) })
          ]
        }
      );
    }
    const inlineDisplayText = textFromReactNode(children).replace(/`+/g, "");
    return /* @__PURE__ */ jsx32(
      "code",
      {
        className: `thread-graph-inline-code rounded px-1 py-0.5 font-mono font-normal text-[0.9em] ${codeClassName || ""}`,
        ...props,
        children: inlineDisplayText
      }
    );
  };
  return /* @__PURE__ */ jsx32("div", { ref: rootRef, "data-markdown-ready": highlighter ? "true" : "false", className: `thread-graph-message-markdown ${className}`, children: /* @__PURE__ */ jsx32(
    ReactMarkdown,
    {
      urlTransform: (url) => !readOnly && localFileHref(url, typeof window === "undefined" ? void 0 : window.location.origin) ? url : defaultUrlTransform(url),
      remarkPlugins: [remarkGfm, remarkMath, remarkLatex, remarkCjkFriendly],
      rehypePlugins: [rehypeKatex],
      components: {
        a({ href, children, ...props }) {
          if (readOnly && (!href || !/^https?:\/\//i.test(href))) return /* @__PURE__ */ jsx32("span", { children });
          const workspaceTarget = parseWorkspaceFileHref(href, workspaceRootPath);
          if (workspaceTarget && onOpenWorkspaceFile) {
            return /* @__PURE__ */ jsx32(WorkspaceFileLink, { ...workspaceTarget, onOpen: onOpenWorkspaceFile, children });
          }
          const resolvedHref = href ? resolveHref?.(href) ?? href : href;
          return /* @__PURE__ */ jsx32(
            "a",
            {
              ...props,
              ...externalLinkProps(resolvedHref),
              href: resolvedHref,
              className: "thread-inline-link",
              children
            }
          );
        },
        img({ src, alt }) {
          const resolved = src ? resolveHref?.(src) ?? src : void 0;
          if (readOnly && !resolved?.startsWith("data:image/") && !/^https?:\/\//i.test(resolved ?? "")) return /* @__PURE__ */ jsx32("span", { children: alt || "Image unavailable" });
          return resolved ? /* @__PURE__ */ jsx32(ZoomableImage, { src: resolved, alt: alt ?? "" }) : /* @__PURE__ */ jsx32("span", { children: alt || "Image unavailable" });
        },
        code: CodeBlockRenderer,
        pre: PreRenderer
      },
      children: processedContent
    }
  ) });
});

// src/components/graph-chat/GraphChatMessageBody.tsx
import { Fragment as Fragment6, jsx as jsx33, jsxs as jsxs27 } from "react/jsx-runtime";
var LARGE_MESSAGE_PREVIEW_CHARS = 2400;
var PLAIN_URL_PATTERN = /\b(?:https?:\/\/|www\.)[^\s<>"'`]+/gi;
var TRAILING_URL_PUNCTUATION_PATTERN = /[),.;:!?]+$/;
function normalizeHref(value) {
  return value.startsWith("www.") ? `https://${value}` : value;
}
function basenameFromAssetPath(value) {
  const normalized = value.replace(/[\\/]+$/, "").trim();
  if (!normalized) {
    return "";
  }
  const segments = normalized.split(/[\\/]/).filter(Boolean);
  return segments.at(-1) ?? normalized;
}
function tokenizeUserMessageText(text) {
  if (!text) {
    return [];
  }
  const matcher = /\[(PHOTO|FILE)\s+([^\]]+)\]/g;
  const segments = [];
  let cursor = 0;
  let index = 0;
  for (const match of text.matchAll(matcher)) {
    const start = match.index ?? 0;
    if (start > cursor) {
      segments.push({
        type: "text",
        key: `text-${index}`,
        text: text.slice(cursor, start)
      });
      index += 1;
    }
    const kind = match[1];
    const path = match[2]?.trim() ?? "";
    if (kind === "PHOTO" && path) {
      segments.push({ type: "photo", key: `photo-${index}`, path });
    } else if (kind === "FILE" && path) {
      segments.push({ type: "file", key: `file-${index}`, path });
    } else {
      segments.push({
        type: "text",
        key: `text-${index}`,
        text: match[0]
      });
    }
    index += 1;
    cursor = start + match[0].length;
  }
  if (cursor < text.length) {
    segments.push({
      type: "text",
      key: `text-${index}`,
      text: text.slice(cursor)
    });
  }
  return segments;
}
function GraphChatLinkifiedPlainText({ text }) {
  const parts = [];
  let cursor = 0;
  for (const match of text.matchAll(PLAIN_URL_PATTERN)) {
    const rawMatch = match[0];
    const index = match.index ?? 0;
    const trailingPunctuation = rawMatch.match(TRAILING_URL_PUNCTUATION_PATTERN)?.[0] ?? "";
    const urlText = trailingPunctuation ? rawMatch.slice(0, -trailingPunctuation.length) : rawMatch;
    if (!urlText) {
      continue;
    }
    if (index > cursor) {
      parts.push(text.slice(cursor, index));
    }
    parts.push(
      /* @__PURE__ */ jsx33(
        "a",
        {
          href: normalizeHref(urlText),
          target: "_blank",
          rel: "noreferrer",
          className: "thread-inline-link",
          children: urlText
        },
        `${index}-${urlText}`
      )
    );
    if (trailingPunctuation) {
      parts.push(trailingPunctuation);
    }
    cursor = index + rawMatch.length;
  }
  if (cursor < text.length) {
    parts.push(text.slice(cursor));
  }
  return /* @__PURE__ */ jsx33(Fragment6, { children: parts.length > 0 ? parts : text });
}
var GraphChatMarkdownAwareBody = memo2(
  function GraphChatMarkdownAwareBody2({
    messageId,
    text,
    scrollRootRef,
    streaming = false,
    containerClassName = "",
    plainTextClassName = "thread-graph-plain-text whitespace-pre-wrap break-words text-[15px] leading-6",
    markdownClassName = "thread-graph-markdown",
    onBeforeResize,
    onOpenWorkspaceFile,
    workspaceRootPath,
    resolveHref
  }) {
    const messageRef = useRef11(null);
    const scrollAnchorRef = useRef11(null);
    const [expanded, setExpanded] = useMessageExpansion(messageId, text, streaming);
    const shouldRenderMarkdown = hasLikelyMarkdownSyntax(text);
    const isLargeText = !streaming && text.length > LARGE_MESSAGE_PREVIEW_CHARS;
    const displayText = isLargeText && !expanded ? `${text.slice(0, LARGE_MESSAGE_PREVIEW_CHARS).trimEnd()}

...` : text;
    const [isActivated, setIsActivated] = useState18(
      streaming || typeof IntersectionObserver === "undefined"
    );
    const toggleExpanded = useCallback10(() => {
      const root = scrollRootRef.current;
      const message = messageRef.current;
      const previousTop = message?.getBoundingClientRect().top ?? null;
      onBeforeResize?.();
      scrollAnchorRef.current = root && previousTop !== null ? { root, top: previousTop } : null;
      setExpanded(!expanded);
    }, [expanded, setExpanded, onBeforeResize, scrollRootRef]);
    useLayoutEffect4(() => {
      const anchor = scrollAnchorRef.current;
      const message = messageRef.current;
      if (!anchor || !message) {
        return;
      }
      scrollAnchorRef.current = null;
      const adjustScroll = () => {
        const nextTop = message.getBoundingClientRect().top;
        anchor.root.scrollTop += nextTop - anchor.top;
      };
      adjustScroll();
      const frame = window.requestAnimationFrame(adjustScroll);
      return () => {
        window.cancelAnimationFrame(frame);
      };
    }, [expanded]);
    useEffect15(() => {
      if (streaming || typeof IntersectionObserver === "undefined") {
        setIsActivated(true);
        return;
      }
      if (isActivated || !messageRef.current) {
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setIsActivated(true);
              observer.disconnect();
              break;
            }
          }
        },
        {
          root: scrollRootRef.current,
          threshold: 0
        }
      );
      observer.observe(messageRef.current);
      return () => {
        observer.disconnect();
      };
    }, [isActivated, scrollRootRef, streaming]);
    return /* @__PURE__ */ jsxs27("div", { ref: messageRef, className: containerClassName, children: [
      isActivated && shouldRenderMarkdown ? /* @__PURE__ */ jsx33(
        GraphChatMessageContent,
        {
          content: displayText,
          className: markdownClassName,
          workspaceRootPath,
          onOpenWorkspaceFile,
          resolveHref
        }
      ) : /* @__PURE__ */ jsx33("p", { className: plainTextClassName, children: /* @__PURE__ */ jsx33(GraphChatLinkifiedPlainText, { text: displayText }) }),
      isLargeText ? /* @__PURE__ */ jsxs27(
        "button",
        {
          type: "button",
          onClick: (event) => {
            event.stopPropagation();
            toggleExpanded();
          },
          "aria-expanded": expanded,
          className: "thread-graph-show-more timeline-meta-text mt-1 inline-flex w-fit items-center gap-1 rounded px-1 text-xs transition",
          children: [
            expanded ? /* @__PURE__ */ jsx33(ChevronUp, { size: 14, "aria-hidden": "true" }) : /* @__PURE__ */ jsx33(ChevronDown, { size: 14, "aria-hidden": "true" }),
            /* @__PURE__ */ jsx33("span", { children: expanded ? "Show less" : "Show more" })
          ]
        }
      ) : null
    ] });
  }
);
var GraphChatAgentMessageBody = memo2(
  function GraphChatAgentMessageBody2({
    messageId,
    text,
    scrollRootRef,
    streaming = false,
    onBeforeResize,
    onOpenWorkspaceFile,
    workspaceRootPath,
    resolveHref
  }) {
    return /* @__PURE__ */ jsx33(
      GraphChatMarkdownAwareBody,
      {
        messageId,
        text,
        scrollRootRef,
        streaming,
        containerClassName: "thread-graph-message-prose",
        ...onBeforeResize ? { onBeforeResize } : {},
        workspaceRootPath,
        ...onOpenWorkspaceFile ? { onOpenWorkspaceFile } : {},
        ...resolveHref ? { resolveHref } : {}
      }
    );
  }
);
var GraphChatUserMessageBody = memo2(
  function GraphChatUserMessageBody2({
    threadId,
    text,
    attachmentPreviewUrls,
    getImageAssetUrl
  }) {
    const segments = useMemo6(() => tokenizeUserMessageText(text), [text]);
    return /* @__PURE__ */ jsx33("div", { className: "thread-graph-message-prose whitespace-pre-wrap break-words text-[15px] leading-6", children: segments.map((segment) => {
      if (segment.type === "text") {
        return /* @__PURE__ */ jsx33("span", { children: segment.text }, segment.key);
      }
      if (segment.type === "photo") {
        const imageUrl = attachmentPreviewUrls?.[segment.path] ?? (threadId ? getImageAssetUrl?.({ threadId, path: segment.path }) ?? null : null);
        const label = basenameFromAssetPath(segment.path) || "Attached image";
        return /* @__PURE__ */ jsx33(
          "span",
          {
            className: "mx-[0.14rem] inline-flex align-middle",
            children: /* @__PURE__ */ jsxs27("span", { className: "inline-flex max-w-full flex-col rounded-[1rem] border border-sky-300/28 bg-sky-300/[0.08] p-1.5 shadow-sm shadow-stone-950/20", children: [
              imageUrl ? /* @__PURE__ */ jsx33(
                ZoomableImage,
                {
                  src: imageUrl,
                  alt: label,
                  className: "h-[4.5rem] w-[6rem] rounded-[0.75rem] bg-stone-950 object-contain",
                  loading: "lazy"
                }
              ) : /* @__PURE__ */ jsx33("span", { className: "inline-flex h-[4.5rem] w-[6rem] items-center justify-center rounded-[0.75rem] bg-stone-950 text-[10px] text-sky-100", children: "PHOTO" }),
              /* @__PURE__ */ jsx33(
                "span",
                {
                  className: "mt-1 max-w-[7rem] truncate text-[10px] font-medium tracking-[0.08em] text-sky-50",
                  title: segment.path,
                  children: label
                }
              )
            ] })
          },
          segment.key
        );
      }
      const fileName = basenameFromAssetPath(segment.path) || "Attached file";
      return /* @__PURE__ */ jsx33(
        "span",
        {
          className: "mx-[0.14rem] inline-flex align-middle",
          children: /* @__PURE__ */ jsxs27(
            "span",
            {
              className: "inline-flex max-w-[12rem] items-center gap-2 rounded-[0.95rem] border border-emerald-300/28 bg-emerald-300/[0.08] px-2.5 py-2 text-[10px] font-medium tracking-[0.08em] text-emerald-50 shadow-sm shadow-stone-950/20",
              title: segment.path,
              children: [
                /* @__PURE__ */ jsx33("span", { className: "inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-200/20 bg-emerald-300/12 text-[9px]", children: "FILE" }),
                /* @__PURE__ */ jsx33("span", { className: "min-w-0 truncate", children: fileName })
              ]
            }
          )
        },
        segment.key
      );
    }) });
  }
);

// src/components/graph-chat/GraphChatMessageFrame.tsx
import { useState as useState19 } from "react";
import { CheckCircle2 as CheckCircle22, Circle, Loader2 as Loader23, XCircle as XCircle2 } from "lucide-react";
import { jsx as jsx34, jsxs as jsxs28 } from "react/jsx-runtime";
function GraphChatRunningDots() {
  return /* @__PURE__ */ jsx34("span", { className: "ml-1.5 inline-flex items-center gap-1", "aria-hidden": "true", children: [0, 1, 2].map((index) => /* @__PURE__ */ jsx34(
    "span",
    {
      className: "h-1.5 w-1.5 animate-pulse rounded-full bg-sky-200/90",
      style: { animationDelay: `${index * 180}ms` }
    },
    index
  )) });
}
function GraphChatMessageStatusBadge({
  status
}) {
  if (!status) {
    return null;
  }
  const normalized = status.toLowerCase();
  const isRunning = normalized.includes("running") || normalized.includes("generating") || normalized.includes("steering");
  const isFailed = normalized.includes("failed") || normalized.includes("error");
  const isCompleted = normalized.includes("accepted") || normalized.includes("complete");
  const className = isRunning ? "ui-status-warning" : isFailed ? "ui-status-danger" : isCompleted ? "ui-status-success" : "ui-status-neutral";
  const icon = isRunning ? /* @__PURE__ */ jsx34(Loader23, { className: "h-3.5 w-3.5 animate-spin" }) : isFailed ? /* @__PURE__ */ jsx34(XCircle2, { className: "h-3.5 w-3.5" }) : isCompleted ? /* @__PURE__ */ jsx34(CheckCircle22, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsx34(Circle, { className: "h-3.5 w-3.5" });
  return /* @__PURE__ */ jsxs28(
    "span",
    {
      className: `thread-graph-message-status inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-normal ${className}`,
      title: status,
      "aria-label": `Status: ${status}`,
      children: [
        /* @__PURE__ */ jsx34("span", { className: "thread-graph-message-status-icon inline-flex shrink-0", children: isRunning ? /* @__PURE__ */ jsx34(GraphChatRunningDots, {}) : icon }),
        /* @__PURE__ */ jsx34("span", { className: "thread-graph-status-label", children: status })
      ]
    }
  );
}
function GraphChatMessageFrame({
  children,
  copyButton,
  kind,
  metaControl,
  reasoning,
  status,
  timeLabel,
  timeTitle
}) {
  const isUser = kind === "userMessage";
  const [touchActionsVisible, setTouchActionsVisible] = useState19(false);
  const normalizedStatus = status?.trim().toLowerCase() ?? "";
  const showStatus = Boolean(
    status && normalizedStatus !== "complete" && normalizedStatus !== "completed"
  );
  const timeNode = timeLabel ? /* @__PURE__ */ jsx34(
    "span",
    {
      title: timeTitle ?? void 0,
      className: "thread-graph-message-time text-[10px] leading-none sm:text-[11px]",
      children: timeLabel
    }
  ) : null;
  function handleMessageClick(event) {
    if (event.target instanceof Element && event.target.closest("a, button, input, summary, pre, .thread-graph-code-block")) {
      return;
    }
    setTouchActionsVisible((visible) => !visible);
  }
  return /* @__PURE__ */ jsx34(
    "div",
    {
      "data-testid": "chat-message",
      "data-role": isUser ? "user" : "assistant",
      className: `thread-graph-message flex ${isUser ? "justify-end" : "justify-start"}`,
      children: /* @__PURE__ */ jsxs28(
        "div",
        {
          className: `thread-graph-message-stack min-w-0 ${isUser ? "is-user" : "is-assistant"}`,
          children: [
            timeNode ? /* @__PURE__ */ jsx34("div", { className: `thread-graph-message-time-row ${isUser ? "is-user" : ""}`, children: timeNode }) : null,
            /* @__PURE__ */ jsxs28(
              "div",
              {
                "data-touch-actions": touchActionsVisible ? "true" : "false",
                className: `thread-graph-message-bubble relative min-w-0 ${isUser ? "is-user" : "is-assistant"}`,
                onClick: handleMessageClick,
                children: [
                  !isUser && metaControl ? /* @__PURE__ */ jsx34("div", { className: "thread-graph-message-leading-actions", children: metaControl }) : null,
                  reasoning,
                  /* @__PURE__ */ jsx34(
                    "div",
                    {
                      className: `thread-graph-message-content min-w-0 ${isUser ? "is-user" : "is-assistant"}`,
                      children
                    }
                  ),
                  copyButton ? /* @__PURE__ */ jsx34("div", { className: "thread-graph-message-copy-desktop", children: copyButton }) : null
                ]
              }
            ),
            isUser && showStatus ? /* @__PURE__ */ jsx34(
              "div",
              {
                className: `thread-graph-message-user-meta flex items-center justify-end gap-2 ${showStatus || timeNode ? "has-persistent-meta" : ""}`,
                children: showStatus ? /* @__PURE__ */ jsx34(GraphChatMessageStatusBadge, { status }) : null
              }
            ) : null,
            !isUser && showStatus ? /* @__PURE__ */ jsx34(
              "div",
              {
                className: `thread-graph-message-assistant-actions flex items-center gap-1 ${showStatus ? "has-status" : ""}`,
                children: showStatus ? /* @__PURE__ */ jsx34(GraphChatMessageStatusBadge, { status }) : null
              }
            ) : null
          ]
        }
      )
    }
  );
}

// src/components/graph-chat/GraphChatCompactMessageItem.tsx
import { jsx as jsx35, jsxs as jsxs29 } from "react/jsx-runtime";
function isGraphChatRunningStatus(status) {
  if (!status) {
    return false;
  }
  const normalized = status.toLowerCase();
  return normalized.includes("running") || normalized.includes("inprogress") || normalized.includes("in_progress");
}
function GraphChatRunningDots2({ tone = "amber" }) {
  const dotClassName = tone === "sky" ? "bg-sky-300/90" : "bg-amber-200/90";
  return /* @__PURE__ */ jsx35("span", { className: "ml-1.5 inline-flex items-center gap-1", "aria-hidden": "true", children: [0, 1, 2].map((index) => /* @__PURE__ */ jsx35(
    "span",
    {
      className: `h-1.5 w-1.5 animate-pulse rounded-full ${dotClassName}`,
      style: { animationDelay: `${index * 180}ms` }
    },
    index
  )) });
}
var GraphChatCompactMessageItem = memo3(
  function GraphChatCompactMessageItem2({
    threadId,
    item,
    scrollRootRef,
    streaming = false,
    adapter,
    timeLabel,
    timeTitle,
    onBeforeMessageResize
  }) {
    const [copyState, setCopyState] = useState20(
      "idle"
    );
    const [reasoningOpen, setReasoningOpen] = useState20(false);
    const resetTimerRef = useRef12(null);
    const reasoningItems = item.kind === "agentMessage" ? item.reasoningItems ?? [] : [];
    const reasoningText = reasoningItems.map((entry) => entry.text.trim()).filter(Boolean).join("\n\n");
    const queuedLikeStatus = item.kind === "userMessage" && (item.status === "Steering" || item.status === "Accepted" || item.status === "Awaiting response");
    useEffect16(() => {
      return () => {
        if (resetTimerRef.current !== null) {
          window.clearTimeout(resetTimerRef.current);
        }
      };
    }, []);
    async function handleCopy() {
      try {
        await navigator.clipboard.writeText(item.text);
        setCopyState("copied");
        if (resetTimerRef.current !== null) {
          window.clearTimeout(resetTimerRef.current);
        }
        resetTimerRef.current = window.setTimeout(
          () => setCopyState("idle"),
          1200
        );
      } catch {
        setCopyState("failed");
        if (resetTimerRef.current !== null) {
          window.clearTimeout(resetTimerRef.current);
        }
        resetTimerRef.current = window.setTimeout(
          () => setCopyState("idle"),
          1600
        );
      }
    }
    function toggleReasoning() {
      onBeforeMessageResize?.();
      setReasoningOpen((value) => !value);
    }
    const copyLabel = item.kind === "agentMessage" ? "agent reply" : "prompt";
    const copyButton = /* @__PURE__ */ jsx35(
      "button",
      {
        type: "button",
        "aria-label": `Copy ${copyLabel}`,
        title: copyState === "copied" ? "Copied" : copyState === "failed" ? "Copy failed" : `Copy ${copyLabel}`,
        onClick: () => void handleCopy(),
        className: `thread-graph-message-copy inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border transition ${copyState === "copied" ? "ui-status-info" : copyState === "failed" ? "ui-status-danger" : ""}`,
        children: copyState === "copied" ? /* @__PURE__ */ jsx35(Check4, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsx35(Copy3, { className: "h-3.5 w-3.5" })
      }
    );
    const hasRunningReasoning = reasoningItems.some(
      (entry) => isGraphChatRunningStatus(entry.status)
    );
    const reasoningToggle = item.kind === "agentMessage" && reasoningText ? /* @__PURE__ */ jsxs29(
      "button",
      {
        type: "button",
        "aria-label": reasoningOpen ? "Hide chain of thought" : "Show chain of thought",
        "aria-expanded": reasoningOpen,
        title: reasoningOpen ? "Hide CoT" : "Show CoT",
        onClick: toggleReasoning,
        className: `thread-graph-thinking-toggle inline-flex h-7 shrink-0 items-center gap-1.5 rounded-md border px-2 text-xs font-medium transition ${reasoningOpen ? "is-open" : ""}`,
        children: [
          /* @__PURE__ */ jsx35(
            Brain,
            {
              className: `h-3.5 w-3.5 ${hasRunningReasoning ? "animate-pulse" : ""}`
            }
          ),
          /* @__PURE__ */ jsx35("span", { children: "CoT" }),
          hasRunningReasoning ? /* @__PURE__ */ jsx35(GraphChatRunningDots2, { tone: "sky" }) : null
        ]
      }
    ) : null;
    const reasoning = item.kind === "agentMessage" && reasoningText ? /* @__PURE__ */ jsx35("div", { className: "thread-graph-message-thinking mb-3", children: /* @__PURE__ */ jsx35(
      Accordion,
      {
        type: "single",
        collapsible: true,
        value: reasoningOpen ? "thoughts" : "",
        className: "thread-graph-thinking-accordion w-full border-none",
        onValueChange: (value) => setReasoningOpen(Boolean(value)),
        children: /* @__PURE__ */ jsx35(AccordionItem, { value: "thoughts", className: "border-b-0", children: /* @__PURE__ */ jsx35(AccordionContent, { className: "thread-graph-thinking-content pb-0", children: /* @__PURE__ */ jsx35("pre", { className: "thread-graph-thinking-body my-1 max-h-56 overflow-auto whitespace-pre-wrap break-words rounded-xl border p-3 text-[12px] leading-5", children: /* @__PURE__ */ jsx35(GraphChatLinkifiedPlainText, { text: reasoningText }) }) }) })
      }
    ) }) : null;
    return /* @__PURE__ */ jsx35(
      GraphChatMessageFrame,
      {
        kind: item.kind,
        status: queuedLikeStatus ? item.status : item.kind === "agentMessage" && !isGraphChatRunningStatus(item.status) ? item.status : null,
        copyButton,
        metaControl: reasoningToggle,
        reasoning,
        timeLabel,
        timeTitle,
        children: item.kind === "agentMessage" ? /* @__PURE__ */ jsx35(
          GraphChatAgentMessageBody,
          {
            workspaceRootPath: adapter?.workspaceRootPath,
            messageId: item.id,
            text: item.text,
            scrollRootRef,
            streaming,
            ...onBeforeMessageResize ? { onBeforeResize: onBeforeMessageResize } : {},
            ...adapter?.onOpenWorkspaceFile ? { onOpenWorkspaceFile: adapter.onOpenWorkspaceFile } : {},
            ...adapter?.resolveHref ? { resolveHref: adapter.resolveHref } : {}
          }
        ) : /* @__PURE__ */ jsx35(
          GraphChatUserMessageBody,
          {
            threadId,
            text: item.text,
            attachmentPreviewUrls: item.attachmentPreviewUrls,
            getImageAssetUrl: adapter?.getImageAssetUrl
          }
        )
      }
    );
  }
);

// src/components/timeline/timelineItems.ts
import { mergeThreadHistoryItem } from "@remote-codex/shared";
function isRenderableHistoryItem(item) {
  if (!item || typeof item.id !== "string" || typeof item.kind !== "string") {
    return false;
  }
  return !((item.kind === "agentMessage" || item.kind === "reasoning") && (typeof item.text !== "string" || item.text.trim().length === 0));
}
function renderableHistoryItems(items) {
  return items.filter(isRenderableHistoryItem);
}
function decodeXmlEntities(value) {
  return value.replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&amp;/g, "&");
}
function parseHookPromptText(text) {
  const match = text.trim().match(
    /^<hook_prompt(?:\s+hook_run_id="([^"]+)")?>([\s\S]*)<\/hook_prompt>$/
  );
  if (!match) {
    return null;
  }
  const hookRunId = match[1] ? decodeXmlEntities(match[1]) : null;
  const output = decodeXmlEntities(match[2] ?? "").trim();
  const eventName = hookRunId?.split(":")[0] ?? "hook";
  const eventLabel = eventName === "stop" ? "Stop" : eventName;
  const sourcePath = hookRunId?.split(":").slice(2).join(":") || null;
  return {
    id: `live-hook-prompt:${hookRunId ?? "unknown"}`,
    kind: "hook",
    text: `${eventLabel} hook`,
    previewText: output || `${eventLabel} hook`,
    detailText: output || null,
    status: "Completed",
    hookEventName: eventName,
    hookEventLabel: eventLabel,
    hookHandlerType: "command",
    hookScope: "turn",
    hookSource: sourcePath ? "project" : null,
    hookSourcePath: sourcePath,
    hookStatusMessage: null,
    hookOutputEntries: output ? [{ kind: "warning", text: output }] : []
  };
}
function isCompactChatItem(kind) {
  return kind === "userMessage" || kind === "agentMessage";
}
function isSteerConsumptionHistoryItem(kind) {
  return kind === "agentMessage" || kind === "reasoning" || kind === "agentToolCall" || kind === "skillToolCall" || kind === "toolCall" || kind === "plan";
}
function prepareTurnItemsForRendering(items, active) {
  const renderableItems = renderableHistoryItems(items);
  if (!active) {
    return renderableItems;
  }
  const prepared = [...renderableItems];
  const firstUserIndex = prepared.findIndex(
    (item) => item.kind === "userMessage"
  );
  if (firstUserIndex < 0) {
    return prepared;
  }
  let seenPrimaryUserMessage = false;
  return prepared.map((item, index) => {
    if (item.kind !== "userMessage") {
      return item;
    }
    if (!seenPrimaryUserMessage) {
      seenPrimaryUserMessage = true;
      return item;
    }
    const hasConsumptionAfter = prepared.slice(index + 1).some((nextItem) => isSteerConsumptionHistoryItem(nextItem.kind));
    if (hasConsumptionAfter) {
      return item;
    }
    return {
      ...item,
      status: "Awaiting response"
    };
  });
}
function hasHistoryItemSequence(item) {
  return typeof item.sequence === "number" && Number.isFinite(item.sequence);
}
function historyItemSequence(item) {
  return hasHistoryItemSequence(item) ? item.sequence : Number.POSITIVE_INFINITY;
}
function sortTurnItemsByRecordedSequence(items) {
  const renderableItems = renderableHistoryItems(items);
  const leadingItems = [];
  let index = 0;
  while (index < renderableItems.length && renderableItems[index]?.kind === "userMessage" && !hasHistoryItemSequence(renderableItems[index])) {
    leadingItems.push(renderableItems[index]);
    index += 1;
  }
  const trailingItems = renderableItems.slice(index);
  if (!trailingItems.some(hasHistoryItemSequence)) {
    return renderableItems;
  }
  const sequenceValues = trailingItems.map((item) => historyItemSequence(item)).filter(Number.isFinite);
  const maxSequence = sequenceValues.length > 0 ? Math.max(...sequenceValues) : 0;
  const orderedItems = [];
  let cursor = 0;
  while (cursor < trailingItems.length) {
    const item = trailingItems[cursor];
    if (hasHistoryItemSequence(item)) {
      orderedItems.push({
        item,
        index: cursor,
        order: historyItemSequence(item)
      });
      cursor += 1;
      continue;
    }
    const blockStart = cursor;
    while (cursor < trailingItems.length && !hasHistoryItemSequence(trailingItems[cursor])) {
      cursor += 1;
    }
    const block = trailingItems.slice(blockStart, cursor);
    const previousSequenced = [...trailingItems.slice(0, blockStart)].reverse().find(hasHistoryItemSequence);
    const nextSequenced = trailingItems.slice(cursor).find(hasHistoryItemSequence);
    const previousSequence = previousSequenced ? historyItemSequence(previousSequenced) : null;
    const nextSequence = nextSequenced ? historyItemSequence(nextSequenced) : null;
    block.forEach((blockItem, blockIndex) => {
      let order;
      if (previousSequence === null && nextSequence !== null) {
        order = nextSequence - (block.length - blockIndex) / (block.length + 1);
      } else if (previousSequence !== null && nextSequence !== null && nextSequence > previousSequence) {
        const span = nextSequence - previousSequence;
        order = previousSequence + (blockIndex + 1) / (block.length + 1) * span;
      } else {
        order = maxSequence + 1 + blockIndex / (block.length + 1);
      }
      orderedItems.push({
        item: blockItem,
        index: blockStart + blockIndex,
        order
      });
    });
  }
  const sortedTrailingItems = orderedItems.sort((left, right) => {
    const orderDelta = left.order - right.order;
    return orderDelta === 0 ? left.index - right.index : orderDelta;
  }).map((entry) => entry.item);
  return [...leadingItems, ...sortedTrailingItems];
}
function mergeLiveTurnItems(items, liveItems) {
  const persistedItems = renderableHistoryItems(items);
  const renderableLiveItems = renderableHistoryItems(liveItems ?? []);
  if (renderableLiveItems.length === 0) {
    return sortTurnItemsByRecordedSequence(persistedItems);
  }
  const liveItemsById = new Map(
    renderableLiveItems.map((item) => [item.id, item])
  );
  const mergedItems = persistedItems.map((item) => {
    const liveItem = liveItemsById.get(item.id);
    if (!liveItem) {
      return item;
    }
    liveItemsById.delete(item.id);
    const mergedItem = mergeThreadHistoryItem(item, liveItem);
    return mergedItem;
  });
  const uniqueLiveItems = [...liveItemsById.values()];
  if (uniqueLiveItems.length === 0 && !mergedItems.some(hasHistoryItemSequence)) {
    return mergedItems;
  }
  mergedItems.push(...uniqueLiveItems);
  if (!mergedItems.some(
    (item) => typeof item.sequence === "number" && Number.isFinite(item.sequence)
  )) {
    return mergedItems;
  }
  return sortTurnItemsByRecordedSequence(mergedItems);
}
function getLiveOutputTailForTurn(liveOutput, items) {
  if (!liveOutput) {
    return "";
  }
  const materializedAgentTexts = renderableHistoryItems(items).filter(
    (item) => item.kind === "agentMessage"
  ).map((item) => item.text).filter((text) => text.length > 0);
  const lastMaterializedAgentText = materializedAgentTexts.at(-1) ?? "";
  if (lastMaterializedAgentText) {
    const anchorIndex = liveOutput.lastIndexOf(lastMaterializedAgentText);
    if (anchorIndex >= 0) {
      const anchoredTail = liveOutput.slice(
        anchorIndex + lastMaterializedAgentText.length
      );
      if (!anchoredTail.trim()) {
        return "";
      }
      return anchoredTail;
    }
  }
  const materializedAgentText = materializedAgentTexts.join("");
  if (!materializedAgentText) {
    return liveOutput;
  }
  const sharedPrefixLength = Math.min(
    liveOutput.length,
    materializedAgentText.length
  );
  let consumedLength = 0;
  while (consumedLength < sharedPrefixLength && liveOutput[consumedLength] === materializedAgentText[consumedLength]) {
    consumedLength += 1;
  }
  if (consumedLength === 0) {
    return liveOutput;
  }
  const remainingOutput = liveOutput.slice(consumedLength);
  return remainingOutput.trim() ? remainingOutput : "";
}
function isRunningHistoryStatus(status) {
  if (!status) {
    return false;
  }
  const normalized = status.toLowerCase();
  return normalized.includes("running") || normalized.includes("inprogress") || normalized.includes("in_progress");
}
function isActiveTurnStatus(status) {
  return status === "inProgress" || status === "sending";
}
function groupTimelineHistoryItems(items) {
  return groupAgentActivitySequences(
    groupConsecutiveTimelineHistoryItems(renderableHistoryItems(items))
  );
}
function groupConsecutiveTimelineHistoryItems(items) {
  const entries = [];
  let index = 0;
  while (index < items.length) {
    const current = items[index];
    if (!current) {
      break;
    }
    if (current.kind !== "commandExecution" && current.kind !== "fileChange" && current.kind !== "webSearch" && current.kind !== "fileRead" && current.kind !== "toolCall" && current.kind !== "agentToolCall" && current.kind !== "skillToolCall") {
      entries.push({
        kind: "item",
        key: current.id,
        item: current
      });
      index += 1;
      continue;
    }
    const groupedItems = [];
    while (index < items.length && items[index]?.kind === current.kind) {
      groupedItems.push(items[index]);
      index += 1;
    }
    if (groupedItems.length === 1) {
      entries.push({
        kind: "item",
        key: groupedItems[0].id,
        item: groupedItems[0]
      });
      continue;
    }
    const groupKey = current.id;
    if (current.kind === "commandExecution") {
      entries.push({
        kind: "commandGroup",
        key: groupKey,
        items: groupedItems
      });
      continue;
    }
    if (current.kind === "fileChange") {
      entries.push({
        kind: "fileChangeGroup",
        key: groupKey,
        items: groupedItems
      });
      continue;
    }
    if (current.kind === "fileRead") {
      entries.push({
        kind: "fileReadGroup",
        key: groupKey,
        items: groupedItems
      });
      continue;
    }
    if (current.kind === "toolCall") {
      entries.push({
        kind: "toolCallGroup",
        key: groupKey,
        items: groupedItems
      });
      continue;
    }
    if (current.kind === "agentToolCall") {
      entries.push({
        kind: "agentToolCallGroup",
        key: groupKey,
        items: groupedItems
      });
      continue;
    }
    if (current.kind === "skillToolCall") {
      entries.push({
        kind: "skillToolCallGroup",
        key: groupKey,
        items: groupedItems
      });
      continue;
    }
    entries.push({
      kind: "searchGroup",
      key: groupKey,
      items: groupedItems
    });
  }
  return entries;
}
function isAgentActivityEntry(entry) {
  if (entry.kind !== "item") {
    return entry.kind !== "agentActivityGroup";
  }
  return entry.item.kind === "commandExecution" || entry.item.kind === "fileChange" || entry.item.kind === "webSearch" || entry.item.kind === "fileRead" || entry.item.kind === "toolCall" || entry.item.kind === "agentToolCall" || entry.item.kind === "skillToolCall" || entry.item.kind === "reasoning";
}
function containsReasoningEntry(entries) {
  return entries.some(
    (entry) => entry.kind === "item" && entry.item.kind === "reasoning"
  );
}
function isCompletedAgentNarrative(entry) {
  return entry?.kind === "item" && entry.item.kind === "agentMessage" && entry.item.text.trim().length > 0 && !isRunningHistoryStatus(entry.item.status);
}
function entryItemCount(entry) {
  if (entry.kind === "item") {
    return 1;
  }
  if (entry.kind === "agentActivityGroup") {
    return entry.itemCount;
  }
  return entry.items.length;
}
function groupAgentActivitySequences(entries) {
  const grouped = [];
  let index = 0;
  while (index < entries.length) {
    if (!isAgentActivityEntry(entries[index])) {
      grouped.push(entries[index]);
      index += 1;
      continue;
    }
    const start = index;
    while (index < entries.length && isAgentActivityEntry(entries[index])) {
      index += 1;
    }
    const activityEntries = entries.slice(start, index);
    const itemCount = activityEntries.reduce(
      (total, entry) => total + entryItemCount(entry),
      0
    );
    if (containsReasoningEntry(activityEntries) || activityEntries.length > 1 && isCompletedAgentNarrative(entries[index])) {
      grouped.push({
        kind: "agentActivityGroup",
        key: `agent-activity:${activityEntries[0].key}`,
        entries: activityEntries,
        itemCount
      });
      continue;
    }
    grouped.push(...activityEntries);
  }
  return grouped;
}

// src/components/timeline/timelineAnchors.ts
function buildTurnSequence(visibleTurns, optimisticTurn) {
  return [
    ...visibleTurns.map((turn) => ({
      id: turn.id,
      startedAt: turn.startedAt ?? ""
    })),
    ...optimisticTurn ? [
      {
        id: optimisticTurn.id,
        startedAt: optimisticTurn.startedAt ?? ""
      }
    ] : []
  ];
}
function addToMapList(map, key, value) {
  const current = map.get(key) ?? [];
  current.push(value);
  map.set(key, current);
}
function firstTurnAtOrAfter(turnSequence, createdAt) {
  return turnSequence.find(
    (turn) => createdAt && turn.startedAt && createdAt.localeCompare(turn.startedAt) <= 0
  );
}
function buildRequestEntryAnchors({
  answeredRequestNotes,
  pendingRequests,
  visibleTurns,
  optimisticTurn
}) {
  const visibleTurnIds = new Set(visibleTurns.map((turn) => turn.id));
  const notesByTurnId = /* @__PURE__ */ new Map();
  const pendingRequestsByTurnId = /* @__PURE__ */ new Map();
  const unanchoredAnsweredNotes = [];
  const unanchoredPendingRequests = [];
  for (const note of answeredRequestNotes) {
    if (note.turnId && visibleTurnIds.has(note.turnId)) {
      addToMapList(notesByTurnId, note.turnId, note);
    } else {
      unanchoredAnsweredNotes.push(note);
    }
  }
  for (const request of pendingRequests) {
    if (request.turnId && visibleTurnIds.has(request.turnId)) {
      addToMapList(pendingRequestsByTurnId, request.turnId, request);
    } else {
      unanchoredPendingRequests.push(request);
    }
  }
  const turnSequence = buildTurnSequence(visibleTurns, optimisticTurn);
  const beforeTurnId = /* @__PURE__ */ new Map();
  const trailing = [];
  const entries = [
    ...unanchoredAnsweredNotes.map((note) => ({
      kind: "note",
      id: note.id,
      createdAt: note.createdAt ?? "",
      note
    })),
    ...unanchoredPendingRequests.map((request) => ({
      kind: "request",
      id: request.id,
      createdAt: request.createdAt,
      request
    }))
  ].sort((left, right) => left.createdAt.localeCompare(right.createdAt));
  for (const entry of entries) {
    const anchor = firstTurnAtOrAfter(turnSequence, entry.createdAt);
    if (!anchor) {
      trailing.push(entry);
      continue;
    }
    addToMapList(beforeTurnId, anchor.id, entry);
  }
  return {
    notesByTurnId,
    pendingRequestsByTurnId,
    beforeTurnId,
    trailing
  };
}
function buildActivityNoteAnchors({
  activityNotes,
  visibleTurns,
  optimisticTurn
}) {
  const sortedNotes = [...activityNotes].sort(
    (left, right) => left.createdAt.localeCompare(right.createdAt)
  );
  const turnSequence = buildTurnSequence(visibleTurns, optimisticTurn);
  const leading = [];
  const beforeTurnId = /* @__PURE__ */ new Map();
  const afterTurnId = /* @__PURE__ */ new Map();
  const trailing = [];
  const knownTurnTimes = turnSequence.map((turn) => turn.startedAt).filter((startedAt) => Boolean(startedAt)).sort();
  const latestKnownTurnTime = knownTurnTimes.at(-1) ?? null;
  for (const note of sortedNotes) {
    if (note.anchorTurnId === "__leading__") {
      leading.push(note);
      continue;
    }
    if (note.anchorTurnId) {
      if (turnSequence.some((turn) => turn.id === note.anchorTurnId)) {
        addToMapList(afterTurnId, note.anchorTurnId, note);
      } else {
        leading.push(note);
      }
      continue;
    }
    const anchor = firstTurnAtOrAfter(turnSequence, note.createdAt);
    if (!anchor) {
      if (!latestKnownTurnTime || note.createdAt.localeCompare(latestKnownTurnTime) <= 0) {
        leading.push(note);
      } else {
        trailing.push(note);
      }
      continue;
    }
    addToMapList(beforeTurnId, anchor.id, note);
  }
  return {
    leading,
    beforeTurnId,
    afterTurnId,
    trailing
  };
}

// src/components/timeline/TimelineRequestCards.tsx
import { useState as useState21 } from "react";
import { Fragment as Fragment7, jsx as jsx36, jsxs as jsxs30 } from "react/jsx-runtime";
function PendingRequestCard({
  request,
  busy = false,
  onRespond
}) {
  const [answers, setAnswers] = useState21({});
  const [customAnswers, setCustomAnswers] = useState21({});
  const [selectedPlanDecision, setSelectedPlanDecision] = useState21(null);
  const primaryQuestion = request.questions[0] ?? null;
  const OTHER_SENTINEL = "__other__";
  const isPermissionRequest = request.kind === "permissionRequest";
  const cardTitle = request.kind === "planDecision" ? "Plan" : isPermissionRequest ? "Permission required" : request.kind === "requestUserInput" ? "Answer Required" : request.title;
  function getOptionPresentation(label) {
    const recommended = /\s*\(recommended\)\s*$/i.test(label);
    return {
      rawLabel: label,
      displayLabel: label.replace(/\s*\(recommended\)\s*$/i, "").trim(),
      recommended
    };
  }
  function respondWithSingleAnswer(answer) {
    if (!primaryQuestion) {
      return;
    }
    setSelectedPlanDecision(answer);
    void onRespond?.(request.id, {
      answers: {
        [primaryQuestion.id]: {
          answers: [answer]
        }
      }
    });
  }
  function currentAnswerForQuestion(question) {
    const selected = answers[question.id] ?? "";
    if (Array.isArray(selected)) {
      return selected.map(
        (answer) => answer === OTHER_SENTINEL ? (customAnswers[question.id] ?? "").trim() : answer.trim()
      ).filter(Boolean).join(", ");
    }
    if (selected === OTHER_SENTINEL) {
      return (customAnswers[question.id] ?? "").trim();
    }
    return selected.trim();
  }
  function currentAnswersForQuestion(question) {
    const selected = answers[question.id] ?? "";
    if (Array.isArray(selected)) {
      return selected.map(
        (answer) => answer === OTHER_SENTINEL ? (customAnswers[question.id] ?? "").trim() : answer.trim()
      ).filter(Boolean);
    }
    if (selected === OTHER_SENTINEL) {
      const customAnswer = (customAnswers[question.id] ?? "").trim();
      return customAnswer ? [customAnswer] : [];
    }
    const singleAnswer = selected.trim();
    return singleAnswer ? [singleAnswer] : [];
  }
  function toggleMultiSelectAnswer(questionId, label) {
    setAnswers((current) => {
      const currentAnswers = current[questionId];
      const selectedAnswers = Array.isArray(currentAnswers) ? currentAnswers : [];
      const nextAnswers = selectedAnswers.includes(label) ? selectedAnswers.filter((entry) => entry !== label) : [...selectedAnswers, label];
      return {
        ...current,
        [questionId]: nextAnswers
      };
    });
  }
  return /* @__PURE__ */ jsxs30("div", { className: "timeline-pending-card w-full rounded-[1rem] border px-3 py-3 sm:rounded-[1.2rem] sm:px-4", children: [
    /* @__PURE__ */ jsx36("div", { className: "flex items-center justify-between gap-3", children: /* @__PURE__ */ jsxs30("div", { children: [
      /* @__PURE__ */ jsx36("p", { className: "timeline-primary-text text-sm font-medium", children: cardTitle }),
      request.kind !== "planDecision" && request.description && /* @__PURE__ */ jsx36("p", { className: "timeline-soft-text mt-1 text-[13px] leading-5", children: request.description })
    ] }) }),
    /* @__PURE__ */ jsx36("div", { className: "mt-3 space-y-3", children: request.questions.map((question) => /* @__PURE__ */ jsxs30(
      "div",
      {
        className: "timeline-question-section rounded-xl border p-2.5 sm:p-3",
        children: [
          /* @__PURE__ */ jsx36("p", { className: "timeline-meta-text text-xs uppercase tracking-[0.2em]", children: question.header }),
          /* @__PURE__ */ jsx36("p", { className: "timeline-primary-text mt-1 text-[13px] leading-5 sm:text-sm", children: question.question }),
          (request.kind === "planDecision" || isPermissionRequest) && question.options && question.options.length > 0 ? /* @__PURE__ */ jsx36("div", { className: "mt-3 flex flex-wrap gap-2", children: question.options.map((option, index) => {
            const presentation = getOptionPresentation(option.label);
            const isImplement = presentation.displayLabel.toLowerCase() === "implement";
            const isReject = /reject|cancel/i.test(
              `${option.label} ${option.description}`
            );
            return /* @__PURE__ */ jsxs30(
              "button",
              {
                type: "button",
                disabled: busy,
                onClick: () => respondWithSingleAnswer(option.label),
                className: `relative rounded-2xl border px-2.5 py-1.5 pr-6 text-[12px] leading-4 transition sm:text-[13px] ${isReject ? "border-stone-700 text-stone-300 hover:bg-stone-800" : index === 0 ? "ui-action-info" : "border-stone-700 text-stone-200 hover:bg-stone-800"} disabled:cursor-not-allowed disabled:opacity-60`,
                title: option.description,
                children: [
                  presentation.recommended ? /* @__PURE__ */ jsx36(
                    "span",
                    {
                      "aria-hidden": "true",
                      className: "absolute right-1.5 top-1 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white/18 text-[10px] leading-none text-current",
                      children: "\u2726"
                    }
                  ) : null,
                  busy && selectedPlanDecision === option.label ? isPermissionRequest ? "Submitting..." : isImplement ? "Starting..." : "Saving..." : presentation.displayLabel
                ]
              },
              option.label
            );
          }) }) : question.options && question.options.length > 0 ? /* @__PURE__ */ jsxs30(Fragment7, { children: [
            /* @__PURE__ */ jsxs30("div", { className: "mt-3 flex flex-wrap gap-2", children: [
              question.options.map((option) => {
                const presentation = getOptionPresentation(option.label);
                const selectedAnswer = answers[question.id];
                return /* @__PURE__ */ jsxs30(
                  "button",
                  {
                    type: "button",
                    disabled: busy,
                    onClick: () => question.multiSelect ? toggleMultiSelectAnswer(question.id, option.label) : setAnswers((current) => ({
                      ...current,
                      [question.id]: option.label
                    })),
                    className: `relative rounded-2xl border px-3 py-1.5 pr-6 text-[12px] leading-4 transition sm:text-[13px] ${(question.multiSelect ? Array.isArray(selectedAnswer) && selectedAnswer.includes(option.label) : selectedAnswer === option.label) ? "ui-status-warning" : "border-stone-700 text-stone-300 hover:bg-stone-800"} disabled:cursor-not-allowed disabled:opacity-60`,
                    title: option.description,
                    children: [
                      presentation.recommended ? /* @__PURE__ */ jsx36(
                        "span",
                        {
                          "aria-hidden": "true",
                          className: "absolute right-1.5 top-1 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white/10 text-[10px] leading-none text-amber-100/90",
                          children: "\u2726"
                        }
                      ) : null,
                      presentation.displayLabel
                    ]
                  },
                  option.label
                );
              }),
              question.isOther && (() => {
                const selectedAnswer = answers[question.id];
                return /* @__PURE__ */ jsx36(
                  "button",
                  {
                    type: "button",
                    disabled: busy,
                    onClick: () => question.multiSelect ? toggleMultiSelectAnswer(
                      question.id,
                      OTHER_SENTINEL
                    ) : setAnswers((current) => ({
                      ...current,
                      [question.id]: OTHER_SENTINEL
                    })),
                    className: `rounded-2xl border px-3 py-1.5 text-[12px] leading-4 transition sm:text-[13px] ${(question.multiSelect ? Array.isArray(selectedAnswer) && selectedAnswer.includes(OTHER_SENTINEL) : selectedAnswer === OTHER_SENTINEL) ? "ui-status-info" : "border-stone-700 text-stone-300 hover:bg-stone-800"} disabled:cursor-not-allowed disabled:opacity-60`,
                    children: "Not from above"
                  }
                );
              })()
            ] }),
            question.isOther && (() => {
              const selectedAnswer = answers[question.id];
              const showOtherInput = question.multiSelect ? Array.isArray(selectedAnswer) && selectedAnswer.includes(OTHER_SENTINEL) : selectedAnswer === OTHER_SENTINEL;
              return showOtherInput ? /* @__PURE__ */ jsx36(
                "input",
                {
                  "aria-label": `${question.header} custom answer`,
                  value: customAnswers[question.id] ?? "",
                  onChange: (event) => setCustomAnswers((current) => ({
                    ...current,
                    [question.id]: event.target.value
                  })),
                  placeholder: "Enter a custom answer",
                  className: "mt-3 w-full rounded-xl border border-stone-700 bg-stone-900 px-3 py-2 text-sm text-stone-100 outline-none transition focus:border-sky-300"
                }
              ) : null;
            })()
          ] }) : /* @__PURE__ */ jsx36(
            "input",
            {
              "aria-label": question.header,
              value: answers[question.id] ?? "",
              onChange: (event) => setAnswers((current) => ({
                ...current,
                [question.id]: event.target.value
              })),
              className: "mt-3 w-full rounded-xl border border-stone-700 bg-stone-900 px-3 py-2 text-sm text-stone-100 outline-none transition focus:border-amber-300"
            }
          )
        ]
      },
      question.id
    )) }),
    request.kind !== "planDecision" && !isPermissionRequest && /* @__PURE__ */ jsx36("div", { className: "mt-3 flex justify-end", children: /* @__PURE__ */ jsx36(
      "button",
      {
        type: "button",
        disabled: busy || request.questions.some(
          (question) => !currentAnswerForQuestion(question)
        ),
        onClick: () => void onRespond?.(request.id, {
          answers: Object.fromEntries(
            request.questions.map((question) => [
              question.id,
              {
                answers: currentAnswersForQuestion(question)
              }
            ])
          )
        }),
        className: "ui-action-info rounded-full px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed",
        children: busy ? "Submitting..." : "Submit"
      }
    ) })
  ] });
}
function AnsweredRequestNote({
  note
}) {
  return /* @__PURE__ */ jsxs30("div", { className: "timeline-note-card w-full rounded-2xl border px-3 py-2.5", children: [
    /* @__PURE__ */ jsx36("p", { className: "timeline-meta-text text-[11px] uppercase tracking-[0.2em]", children: note.title }),
    /* @__PURE__ */ jsx36("div", { className: "mt-1 space-y-1", children: note.summaryLines.map((line, index) => /* @__PURE__ */ jsxs30(
      "p",
      {
        className: "timeline-primary-text text-[13px] leading-5",
        children: [
          "You selected ",
          line
        ]
      },
      `${note.id}-${index}`
    )) })
  ] });
}
function ActivityNoteCard({
  note,
  onOpenThread,
  onOpenLinkedThread
}) {
  const title = note.kind === "forkCreated" ? "Fork" : note.kind === "forkSource" ? "Fork source" : note.kind === "goal" ? "Goal" : "System";
  const body = note.kind === "forkCreated" ? `Thread forked from Turn ${note.turnIndex ?? "?"}` : note.kind === "forkSource" ? `Forked from ${note.linkedThreadTitle ?? "source thread"} at Turn ${note.turnIndex ?? "?"}` : note.text ?? "";
  return /* @__PURE__ */ jsxs30("div", { className: "timeline-activity-card w-full rounded-2xl border px-3 py-2.5", children: [
    /* @__PURE__ */ jsxs30("div", { className: "flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsx36("p", { className: "timeline-meta-text text-[11px] uppercase tracking-[0.2em]", children: title }),
      /* @__PURE__ */ jsx36(
        "time",
        {
          dateTime: note.createdAt,
          title: formatLongTimestamp(note.createdAt),
          className: "timeline-meta-text text-[10px]",
          children: formatShortTimestamp(note.createdAt)
        }
      )
    ] }),
    /* @__PURE__ */ jsx36("p", { className: "timeline-primary-text mt-1 text-[13px] leading-5", children: body }),
    note.linkedThreadId ? /* @__PURE__ */ jsx36(
      "button",
      {
        type: "button",
        onClick: () => {
          const linkedThreadId = note.linkedThreadId;
          if (!linkedThreadId) {
            return;
          }
          onOpenLinkedThread?.(linkedThreadId);
          onOpenThread?.(linkedThreadId);
        },
        className: "relative z-10 mt-2 inline-flex cursor-pointer rounded-full border border-amber-300/30 px-3 py-1.5 text-xs text-amber-100 transition hover:bg-amber-300/10",
        children: note.kind === "forkCreated" ? "Open fork" : "Back to source"
      }
    ) : null
  ] });
}
function ActivityNoteSection({
  notes,
  onOpenThread,
  onOpenLinkedThread
}) {
  if (notes.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsx36("div", { className: "thread-graph-message-section space-y-3 px-3 py-4 sm:px-5", children: notes.map((note) => /* @__PURE__ */ jsx36(
    ActivityNoteCard,
    {
      note,
      onOpenThread,
      onOpenLinkedThread
    },
    note.id
  )) });
}
function RequestEntrySection({
  entries,
  respondingRequestId,
  onRespondToRequest
}) {
  if (entries.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsx36("div", { className: "thread-graph-message-section space-y-3 px-3 py-4 sm:px-5", children: entries.map(
    (entry) => entry.kind === "note" ? /* @__PURE__ */ jsx36(AnsweredRequestNote, { note: entry.note }, entry.id) : /* @__PURE__ */ jsx36(
      PendingRequestCard,
      {
        request: entry.request,
        busy: respondingRequestId === entry.request.id,
        onRespond: onRespondToRequest
      },
      entry.id
    )
  ) });
}
function RequestEntrySectionForTurn({
  notes,
  requests,
  respondingRequestId,
  onRespondToRequest
}) {
  const entries = [
    ...notes.map((note) => ({
      kind: "note",
      id: note.id,
      createdAt: note.createdAt ?? "",
      note
    })),
    ...requests.map((request) => ({
      kind: "request",
      id: request.id,
      createdAt: request.createdAt,
      request
    }))
  ].sort((left, right) => left.createdAt.localeCompare(right.createdAt));
  return /* @__PURE__ */ jsx36(
    RequestEntrySection,
    {
      entries,
      respondingRequestId,
      onRespondToRequest
    }
  );
}
function ActivityRequestEntrySection({
  entries,
  respondingRequestId,
  onRespondToRequest,
  onOpenThread,
  onOpenLinkedThread
}) {
  if (entries.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsx36("div", { className: "thread-graph-message-section space-y-3 px-3 py-4 sm:px-5", children: [...entries].sort((left, right) => left.createdAt.localeCompare(right.createdAt)).map(
    (entry) => entry.kind === "activity" ? /* @__PURE__ */ jsx36(
      ActivityNoteCard,
      {
        note: entry.note,
        onOpenThread,
        onOpenLinkedThread
      },
      entry.id
    ) : entry.kind === "note" ? /* @__PURE__ */ jsx36(AnsweredRequestNote, { note: entry.note }, entry.id) : /* @__PURE__ */ jsx36(
      PendingRequestCard,
      {
        request: entry.request,
        busy: respondingRequestId === entry.request.id,
        onRespond: onRespondToRequest
      },
      entry.id
    )
  ) });
}

// src/components/timeline/TimelineTurnRows.tsx
import {
  memo as memo5,
  useCallback as useCallback11,
  useMemo as useMemo7,
  useState as useState26
} from "react";
import { ChevronRight as ChevronRight4 } from "lucide-react";

// src/components/graph-chat/GraphChatHistoryEntries.tsx
import { Fragment as Fragment8, jsx as jsx37 } from "react/jsx-runtime";
function GraphChatHistoryEntries({
  entries,
  expandedGroups,
  onToggleGroupedItem,
  renderCommandGroup,
  renderFileChangeGroup,
  renderFileReadGroup,
  renderItem,
  renderSearchGroup,
  renderToolCallGroup,
  renderAgentActivityGroup
}) {
  return /* @__PURE__ */ jsx37(Fragment8, { children: entries.map((entry) => {
    const expanded = expandedGroups[entry.key] ?? false;
    const onToggleExpanded = () => onToggleGroupedItem(entry.key);
    if (entry.kind === "commandGroup") {
      return renderCommandGroup(
        entry,
        expanded,
        onToggleExpanded
      );
    }
    if (entry.kind === "fileChangeGroup") {
      return renderFileChangeGroup(
        entry,
        expanded,
        onToggleExpanded
      );
    }
    if (entry.kind === "searchGroup") {
      return renderSearchGroup(
        entry,
        expanded,
        onToggleExpanded
      );
    }
    if (entry.kind === "fileReadGroup") {
      return renderFileReadGroup(
        entry,
        expanded,
        onToggleExpanded
      );
    }
    if (entry.kind === "toolCallGroup" || entry.kind === "agentToolCallGroup" || entry.kind === "skillToolCallGroup") {
      return renderToolCallGroup(
        entry,
        expanded,
        onToggleExpanded
      );
    }
    if (entry.kind === "agentActivityGroup") {
      return renderAgentActivityGroup(
        entry,
        expanded,
        onToggleExpanded
      );
    }
    return renderItem(entry);
  }) });
}

// src/components/graph-chat/GraphChatHistoryItems.tsx
import {
  memo as memo4,
  useLayoutEffect as useLayoutEffect5,
  useRef as useRef13,
  useState as useState22
} from "react";
import {
  Archive,
  Bot,
  CheckCircle2 as CheckCircle23,
  ChevronDown as ChevronDown3,
  ChevronRight as ChevronRight3,
  ClipboardList,
  ExternalLink,
  FilePenLine,
  FileText,
  Image as ImageIconLucide,
  Info,
  Loader2 as Loader24,
  PackageOpen,
  Search,
  Sparkles,
  Terminal,
  Webhook,
  Wrench as Wrench2,
  XCircle as XCircle3
} from "lucide-react";

// src/components/graph-chat/GraphChatHistoryGroupFrame.tsx
import { ChevronDown as ChevronDown2, ChevronRight as ChevronRight2 } from "lucide-react";
import { jsx as jsx38, jsxs as jsxs31 } from "react/jsx-runtime";
function GraphChatHistoryGroupFrame({
  children,
  className,
  count,
  countBadgeClassName,
  desktopIconClassName,
  expanded,
  expandedListClassName,
  icon,
  onToggleExpanded,
  runningIndicator,
  summary,
  timeMeta,
  toggleAriaLabel,
  trailingSummary
}) {
  return /* @__PURE__ */ jsx38(
    "div",
    {
      className: `thread-graph-history-group ${className} relative min-w-0 w-full overflow-hidden rounded-[0.9rem] border px-3 py-2.5`,
      children: /* @__PURE__ */ jsxs31("div", { className: "flex items-start gap-2.5", children: [
        /* @__PURE__ */ jsxs31("div", { className: "thread-graph-history-group-icon mt-0.5 flex shrink-0 items-center", children: [
          /* @__PURE__ */ jsxs31(
            "span",
            {
              className: `relative inline-flex h-8 w-8 items-center justify-center rounded-[0.9rem] border shadow-sm shadow-stone-950/20 ${desktopIconClassName}`,
              children: [
                icon,
                /* @__PURE__ */ jsx38(
                  "span",
                  {
                    className: `absolute -right-1 -top-1 inline-flex min-w-[1.1rem] items-center justify-center rounded-full border bg-stone-950/90 px-1 text-[9px] font-semibold leading-4 ${countBadgeClassName}`,
                    children: count
                  }
                )
              ]
            }
          ),
          runningIndicator
        ] }),
        /* @__PURE__ */ jsxs31("div", { className: "thread-graph-history-group-card min-w-0 flex-1 rounded-[0.85rem] border px-3 py-2", children: [
          /* @__PURE__ */ jsxs31(
            "button",
            {
              type: "button",
              "aria-expanded": expanded,
              "aria-label": toggleAriaLabel,
              onClick: onToggleExpanded,
              className: "thread-graph-history-group-toggle flex w-full min-w-0 items-center justify-between gap-3 text-left",
              children: [
                /* @__PURE__ */ jsx38("div", { className: "thread-graph-history-group-summary min-w-0 flex flex-1 flex-wrap items-center gap-2 pr-1", children: summary }),
                trailingSummary || timeMeta ? /* @__PURE__ */ jsxs31("div", { className: "inline-flex shrink-0 items-center gap-2", children: [
                  trailingSummary,
                  timeMeta
                ] }) : null,
                /* @__PURE__ */ jsx38(
                  "span",
                  {
                    className: "thread-graph-history-group-chevron inline-flex shrink-0",
                    "aria-hidden": "true",
                    children: expanded ? /* @__PURE__ */ jsx38(ChevronDown2, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsx38(ChevronRight2, { className: "h-3.5 w-3.5" })
                  }
                )
              ]
            }
          ),
          expanded ? /* @__PURE__ */ jsx38(
            "div",
            {
              className: `thread-graph-history-group-list mt-3 space-y-2 border-t pt-3 ${expandedListClassName}`,
              children
            }
          ) : null
        ] })
      ] })
    }
  );
}

// src/components/graph-ui/Badge.tsx
import { Slot } from "@radix-ui/react-slot";
import { cva as cva2 } from "class-variance-authority";
import { jsx as jsx39 } from "react/jsx-runtime";
var badgeVariants = cva2(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-md border px-2 py-0.5 text-xs font-medium outline-none transition-[color,box-shadow] focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-white",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  asChild = false,
  className,
  variant,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsx39(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant, className })),
      ...props
    }
  );
}

// src/components/graph-chat/GraphChatHistoryItems.tsx
import { Fragment as Fragment9, jsx as jsx40, jsxs as jsxs32 } from "react/jsx-runtime";
function isRunningHistoryStatus2(status) {
  if (!status) return false;
  const normalized = status.trim().toLowerCase();
  return normalized === "running" || normalized === "in_progress" || normalized === "in progress" || normalized === "pending";
}
function FileChangeIcon() {
  return /* @__PURE__ */ jsxs32(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.3",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx40("path", { d: "M5 2.75h4l2 2v6.5a1.5 1.5 0 0 1-1.5 1.5h-4A1.5 1.5 0 0 1 4 11.25v-7A1.5 1.5 0 0 1 5.5 2.75Z" }),
        /* @__PURE__ */ jsx40("path", { d: "M9 2.75v2h2" }),
        /* @__PURE__ */ jsx40("path", { d: "M6.2 8h3.6" }),
        /* @__PURE__ */ jsx40("path", { d: "M6.2 10h1.7" })
      ]
    }
  );
}
function FileReadIcon() {
  return /* @__PURE__ */ jsxs32(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.3",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx40("path", { d: "M5 2.75h4l2 2v6.5a1.5 1.5 0 0 1-1.5 1.5h-4A1.5 1.5 0 0 1 4 11.25v-7A1.5 1.5 0 0 1 5.5 2.75Z" }),
        /* @__PURE__ */ jsx40("path", { d: "M9 2.75v2h2" }),
        /* @__PURE__ */ jsx40("path", { d: "M6.15 7.25h3.7" }),
        /* @__PURE__ */ jsx40("path", { d: "M6.15 9.25h2.8" }),
        /* @__PURE__ */ jsx40("path", { d: "m10.4 10.7 1.2 1.2" }),
        /* @__PURE__ */ jsx40("circle", { cx: "9.25", cy: "9.55", r: "1.45" })
      ]
    }
  );
}
function CommandBatchIcon() {
  return /* @__PURE__ */ jsxs32(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx40("rect", { x: "2.75", y: "3", width: "8.5", height: "3", rx: "1.1" }),
        /* @__PURE__ */ jsx40("rect", { x: "4.25", y: "6.5", width: "8.5", height: "3", rx: "1.1" }),
        /* @__PURE__ */ jsx40("rect", { x: "5.75", y: "10", width: "7.5", height: "3", rx: "1.1" }),
        /* @__PURE__ */ jsx40("path", { d: "m6.25 4.5 1 1-1 1" }),
        /* @__PURE__ */ jsx40("path", { d: "M7.9 5.5h1.7" }),
        /* @__PURE__ */ jsx40("path", { d: "m7.75 8 1 1-1 1" }),
        /* @__PURE__ */ jsx40("path", { d: "M9.4 9h1.7" })
      ]
    }
  );
}
function SearchBatchIcon() {
  return /* @__PURE__ */ jsxs32(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx40("circle", { cx: "6", cy: "6", r: "2.3" }),
        /* @__PURE__ */ jsx40("path", { d: "m8 8 1.6 1.6" }),
        /* @__PURE__ */ jsx40("circle", { cx: "9.3", cy: "8.8", r: "2" }),
        /* @__PURE__ */ jsx40("path", { d: "m10.75 10.25 1.65 1.65" }),
        /* @__PURE__ */ jsx40("circle", { cx: "11.2", cy: "4.75", r: "1.8" }),
        /* @__PURE__ */ jsx40("path", { d: "m12.45 6 1.1 1.1" })
      ]
    }
  );
}
function projectRelativePathLabel(label) {
  const normalized = label.trim();
  if (!normalized) {
    return "";
  }
  const suffixMatch = normalized.match(/(, \+\d+ more.*)$/);
  const suffix = suffixMatch?.[1] ?? "";
  const base = suffix ? normalized.slice(0, -suffix.length) : normalized;
  const slashNormalized = base.replace(/\\/g, "/");
  if (!slashNormalized.startsWith("/")) {
    return `${slashNormalized.replace(/^\.\//, "")}${suffix}`;
  }
  const markers = [
    "/apps/",
    "/packages/",
    "/src/",
    "/test/",
    "/tests/",
    "/docs/",
    "/config/",
    "/scripts/",
    "/e2e/",
    "/.agents/",
    "/.codex/"
  ];
  for (const marker of markers) {
    const markerIndex = slashNormalized.indexOf(marker);
    if (markerIndex >= 0) {
      return `${slashNormalized.slice(markerIndex + 1)}${suffix}`;
    }
  }
  return normalized;
}
function formatTrailingPathLabel(label, maxLength = 42) {
  const normalized = projectRelativePathLabel(label);
  if (!normalized) {
    return "";
  }
  const suffixMatch = normalized.match(/(, \+\d+ more.*)$/);
  const suffix = suffixMatch?.[1] ?? "";
  const base = suffix ? normalized.slice(0, -suffix.length) : normalized;
  if (base.length <= maxLength) {
    return `${base}${suffix}`;
  }
  const normalizedSeparators = base.replace(/\\/g, "/");
  const segments = normalizedSeparators.split("/").filter(Boolean);
  if (segments.length > 1) {
    const keptSegments = [];
    let currentLength = suffix.length + 4;
    for (let index = segments.length - 1; index >= 0; index -= 1) {
      const candidate = segments[index];
      const nextLength = currentLength + candidate.length + (keptSegments.length > 0 ? 1 : 0);
      if (keptSegments.length > 0 && nextLength > maxLength) {
        break;
      }
      keptSegments.unshift(candidate);
      currentLength = nextLength;
    }
    if (keptSegments.length > 0) {
      return `.../${keptSegments.join("/")}${suffix}`;
    }
  }
  return `...${base.slice(-(maxLength - suffix.length - 3))}${suffix}`;
}
function fileChangeSummarySegments(item) {
  const segments = [];
  if (typeof item.changedFiles === "number" && item.changedFiles > 0) {
    segments.push(
      `${item.changedFiles} ${item.changedFiles === 1 ? "file" : "files"}`
    );
  }
  if (typeof item.addedLines === "number" && item.addedLines > 0) {
    segments.push(`+${item.addedLines}`);
  }
  if (typeof item.removedLines === "number" && item.removedLines > 0) {
    segments.push(`-${item.removedLines}`);
  }
  if (segments.length > 0) {
    return segments;
  }
  const fallback = item.previewText?.trim();
  if (!fallback) {
    return [];
  }
  return fallback.replace(/\bfiles changed\b/gi, "files").replace(/\bfile changed\b/gi, "file").split("\xB7").map((segment) => segment.trim()).filter(Boolean);
}
function RunningDots({
  tone = "amber"
}) {
  const dotClassName = tone === "emerald" ? "bg-sky-200/90" : tone === "sky" ? "bg-sky-300/90" : "bg-amber-200/90";
  return /* @__PURE__ */ jsx40("span", { className: "ml-1.5 inline-flex items-center gap-1", "aria-hidden": "true", children: [0, 1, 2].map((index) => /* @__PURE__ */ jsx40(
    "span",
    {
      className: `h-1.5 w-1.5 animate-pulse rounded-full ${dotClassName}`,
      style: { animationDelay: `${index * 180}ms` }
    },
    index
  )) });
}
function normalizeLines(text) {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  while (lines.length > 1 && lines.at(-1)?.trim() === "") {
    lines.pop();
  }
  return lines;
}
function summarizeInlinePreviewText(text) {
  const lines = normalizeLines(text);
  if (lines.length === 1) {
    return {
      firstLine: lines[0] ?? "",
      showGap: false,
      isTruncated: false
    };
  }
  return {
    firstLine: lines[0] ?? "",
    showGap: true,
    isTruncated: true
  };
}
function graphHistoryStatusConfig(status) {
  const normalized = status?.trim().toLowerCase() ?? "";
  if (normalized === "completed" || normalized === "complete" || normalized === "success" || normalized === "succeeded") {
    return {
      className: "is-completed",
      icon: /* @__PURE__ */ jsx40(CheckCircle23, { className: "h-3.5 w-3.5" }),
      label: "Completed"
    };
  }
  if (normalized === "failed" || normalized === "failure" || normalized === "error" || normalized === "errored") {
    return {
      className: "is-failed",
      icon: /* @__PURE__ */ jsx40(XCircle3, { className: "h-3.5 w-3.5" }),
      label: "Failed"
    };
  }
  if (isRunningHistoryStatus2(status)) {
    return {
      className: "is-pending",
      icon: /* @__PURE__ */ jsx40(Loader24, { className: "h-3.5 w-3.5 animate-spin" }),
      label: status?.trim() || "Running"
    };
  }
  return {
    className: "is-neutral",
    icon: null,
    label: status?.trim() || "Event"
  };
}
function graphHistoryToneClassName(tone) {
  switch (tone) {
    case "command":
      return "is-command";
    case "tool":
      return "is-tool";
    case "agent":
      return "is-agent";
    case "skill":
      return "is-skill";
    case "search":
      return "is-search";
    case "fileRead":
      return "is-file-read";
  }
}
function graphHistoryEventToneClassName(tone) {
  switch (tone) {
    case "plan":
      return "is-plan";
    case "context":
      return "is-context";
    case "generic":
      return "is-generic";
    case "image":
      return "is-image";
    case "fileChange":
      return "is-file-change";
    case "artifact":
      return "is-artifact";
    case "hook":
      return "is-hook";
  }
}
function GraphChatHistoryEventFrame({
  actions,
  children,
  className,
  headerMeta,
  icon,
  item,
  timeMeta,
  title,
  tone
}) {
  const statusConfig = graphHistoryStatusConfig(item.status);
  const showStatus = Boolean(
    item.status && statusConfig.className !== "is-completed"
  );
  return /* @__PURE__ */ jsxs32(
    "div",
    {
      className: `thread-graph-event thread-graph-history-event ${graphHistoryEventToneClassName(
        tone
      )} ${className ?? ""}`,
      children: [
        /* @__PURE__ */ jsx40("div", { className: "thread-graph-history-event-icon", "aria-hidden": "true", children: icon }),
        /* @__PURE__ */ jsxs32("div", { className: "thread-graph-history-event-card", children: [
          /* @__PURE__ */ jsxs32("div", { className: "thread-graph-history-event-header", children: [
            /* @__PURE__ */ jsxs32("div", { className: "thread-graph-history-event-heading flex min-w-0 items-center gap-2", children: [
              /* @__PURE__ */ jsx40("span", { className: "thread-graph-history-event-title min-w-0 truncate font-mono text-sm font-semibold", children: title }),
              item.status && showStatus ? /* @__PURE__ */ jsxs32(
                Badge,
                {
                  variant: "outline",
                  className: `thread-graph-tool-badge ${statusConfig.className} rounded-full px-2 py-0.5 text-xs font-normal`,
                  title: statusConfig.label,
                  "aria-label": `Status: ${statusConfig.label}`,
                  children: [
                    statusConfig.icon,
                    /* @__PURE__ */ jsx40("span", { className: "thread-graph-status-label", children: statusConfig.label })
                  ]
                }
              ) : null,
              headerMeta
            ] }),
            actions || timeMeta ? /* @__PURE__ */ jsxs32("div", { className: "thread-graph-history-event-actions", children: [
              actions,
              timeMeta
            ] }) : null
          ] }),
          children ? /* @__PURE__ */ jsx40("div", { className: "thread-graph-history-event-body", children }) : null
        ] })
      ]
    }
  );
}
function GraphChatHistoryToolFrame({
  actionLabel = "Open details",
  actionTitle,
  autoOpen = false,
  className,
  details,
  icon,
  item,
  onOpen,
  preview,
  timeMeta,
  title,
  tone
}) {
  const statusConfig = graphHistoryStatusConfig(item.status);
  const showStatus = Boolean(
    item.status && statusConfig.className !== "is-completed"
  );
  const [openItem, setOpenItem] = useState22(
    autoOpen ? "item-1" : void 0
  );
  const previousAutoOpenRef = useRef13(autoOpen);
  useLayoutEffect5(() => {
    if (autoOpen) {
      setOpenItem("item-1");
    } else if (previousAutoOpenRef.current) {
      setOpenItem(void 0);
    }
    previousAutoOpenRef.current = autoOpen;
  }, [autoOpen, item.id]);
  return /* @__PURE__ */ jsx40(
    "div",
    {
      className: `thread-graph-event thread-graph-history-tool ${graphHistoryToneClassName(tone)} ${className ?? ""}`,
      children: /* @__PURE__ */ jsx40(
        Accordion,
        {
          type: "single",
          collapsible: true,
          onValueChange: (value) => {
            setOpenItem(value || void 0);
          },
          className: "thread-graph-tool-accordion thread-graph-history-tool-accordion w-full overflow-hidden rounded-lg border",
          value: openItem ?? "",
          children: /* @__PURE__ */ jsxs32(AccordionItem, { value: "item-1", className: "border-0", children: [
            /* @__PURE__ */ jsxs32(
              AccordionTrigger,
              {
                "aria-label": `${openItem === "item-1" ? "Collapse" : "Expand"} ${title} history item`,
                className: "thread-graph-tool-trigger thread-graph-history-tool-trigger px-4 py-3 hover:no-underline",
                children: [
                  /* @__PURE__ */ jsxs32("div", { className: "flex min-w-0 flex-1 items-center gap-2", children: [
                    /* @__PURE__ */ jsx40("span", { className: "thread-graph-history-tool-icon shrink-0", children: icon }),
                    /* @__PURE__ */ jsx40("span", { className: "thread-graph-history-tool-label shrink-0 text-sm font-medium", children: title }),
                    /* @__PURE__ */ jsx40("span", { className: "thread-graph-history-tool-preview min-w-0 truncate text-sm", children: preview.firstLine }),
                    preview.showGap ? /* @__PURE__ */ jsx40(
                      "span",
                      {
                        className: "thread-graph-history-tool-preview-ellipsis",
                        "aria-hidden": "true",
                        children: "..."
                      }
                    ) : null,
                    showStatus ? /* @__PURE__ */ jsxs32(
                      Badge,
                      {
                        variant: "outline",
                        className: `thread-graph-tool-badge ${statusConfig.className} rounded-full px-2 py-0.5 text-xs font-normal`,
                        title: statusConfig.label,
                        "aria-label": `Status: ${statusConfig.label}`,
                        children: [
                          statusConfig.icon,
                          /* @__PURE__ */ jsx40("span", { className: "thread-graph-status-label", children: statusConfig.label })
                        ]
                      }
                    ) : null
                  ] }),
                  timeMeta ? /* @__PURE__ */ jsx40("span", { className: "thread-graph-history-tool-time shrink-0", children: timeMeta }) : null
                ]
              }
            ),
            /* @__PURE__ */ jsxs32(AccordionContent, { className: "thread-graph-tool-content thread-graph-history-tool-content px-4 pb-4 pt-1", children: [
              /* @__PURE__ */ jsxs32("section", { children: [
                /* @__PURE__ */ jsx40("h4", { children: "Summary" }),
                /* @__PURE__ */ jsxs32("div", { className: "thread-graph-history-tool-summary", children: [
                  /* @__PURE__ */ jsx40(GraphChatLinkifiedPlainText, { text: preview.firstLine }),
                  preview.showGap ? /* @__PURE__ */ jsx40("span", { className: "thread-graph-history-tool-ellipsis", children: "..." }) : null
                ] })
              ] }),
              details ? /* @__PURE__ */ jsx40("section", { children: details }) : null,
              /* @__PURE__ */ jsxs32(
                "button",
                {
                  type: "button",
                  "aria-label": actionLabel,
                  onClick: onOpen,
                  className: "thread-graph-history-tool-open inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition",
                  children: [
                    /* @__PURE__ */ jsx40(ExternalLink, { className: "h-3.5 w-3.5" }),
                    actionTitle
                  ]
                }
              )
            ] })
          ] })
        }
      )
    }
  );
}
var GraphChatPlanHistoryItem = memo4(function GraphChatPlanHistoryItem2({
  item,
  scrollRootRef,
  onBeforeResize,
  timeMeta
}) {
  return /* @__PURE__ */ jsx40(
    GraphChatHistoryEventFrame,
    {
      className: "thread-graph-event-plan",
      icon: /* @__PURE__ */ jsx40(ClipboardList, { className: "h-4 w-4" }),
      item,
      timeMeta,
      title: "Planned",
      tone: "plan",
      children: /* @__PURE__ */ jsx40("div", { className: "thread-graph-history-event-prose", children: /* @__PURE__ */ jsx40(
        GraphChatMarkdownAwareBody,
        {
          text: item.text,
          scrollRootRef,
          plainTextClassName: "thread-graph-plain-text whitespace-pre-wrap break-words text-sm leading-6",
          markdownClassName: "thread-graph-markdown text-sm",
          ...onBeforeResize ? { onBeforeResize } : {}
        }
      ) })
    }
  );
});
var GraphChatContextCompactionItem = memo4(
  function GraphChatContextCompactionItem2({
    item,
    timeMeta
  }) {
    const isRunning = isRunningHistoryStatus2(item.status) || item.text === "Compacting context";
    const primaryText = isRunning ? "Compacting context" : "Context compacted";
    const secondaryText = item.detailText && item.detailText !== primaryText ? item.detailText : null;
    return /* @__PURE__ */ jsxs32(
      GraphChatHistoryEventFrame,
      {
        className: "thread-graph-event-context",
        icon: /* @__PURE__ */ jsx40(Archive, { className: "h-4 w-4" }),
        item,
        timeMeta,
        title: isRunning ? "Compacting" : "Compacted",
        tone: "context",
        children: [
          /* @__PURE__ */ jsxs32("div", { className: "thread-graph-history-event-line", children: [
            /* @__PURE__ */ jsx40("span", { className: "thread-graph-history-event-primary", children: primaryText }),
            isRunning ? /* @__PURE__ */ jsx40(RunningDots, { tone: "emerald" }) : null
          ] }),
          secondaryText ? /* @__PURE__ */ jsx40(
            "p",
            {
              className: "thread-graph-history-event-secondary",
              title: secondaryText,
              children: secondaryText
            }
          ) : null
        ]
      }
    );
  }
);
var GraphChatGenericHistoryItem = memo4(
  function GraphChatGenericHistoryItem2({
    item,
    timeMeta
  }) {
    return /* @__PURE__ */ jsx40(
      GraphChatHistoryEventFrame,
      {
        className: "thread-graph-event-generic",
        icon: /* @__PURE__ */ jsx40(Info, { className: "h-4 w-4" }),
        item,
        timeMeta,
        title: "Noted",
        tone: "generic",
        children: /* @__PURE__ */ jsx40("pre", { className: "thread-graph-history-event-pre", children: /* @__PURE__ */ jsx40(GraphChatLinkifiedPlainText, { text: item.text }) })
      }
    );
  }
);
var GraphChatCommandItem = memo4(function GraphChatCommandItem2({
  autoOpen,
  item,
  onOpen,
  timeMeta
}) {
  const summary = summarizeInlinePreviewText(item.previewText ?? item.text);
  return /* @__PURE__ */ jsx40(
    GraphChatHistoryToolFrame,
    {
      actionLabel: "Open full command",
      actionTitle: "Command Output",
      autoOpen,
      className: "thread-graph-event-command",
      icon: /* @__PURE__ */ jsx40(Terminal, { className: "h-4 w-4" }),
      item,
      onOpen: () => onOpen(item, "Command Output"),
      preview: summary,
      timeMeta,
      title: "Ran",
      tone: "command"
    }
  );
});
var GraphChatToolCallItem = memo4(function GraphChatToolCallItem2({
  autoOpen,
  item,
  onOpen,
  timeMeta
}) {
  const summary = summarizeInlinePreviewText(item.text);
  return /* @__PURE__ */ jsx40(
    GraphChatHistoryToolFrame,
    {
      actionLabel: "Open full tool call",
      actionTitle: "Tool Call Details",
      autoOpen,
      className: "thread-graph-event-tool",
      icon: /* @__PURE__ */ jsx40(Wrench2, { className: "h-4 w-4" }),
      item,
      onOpen: () => onOpen(item, "Tool Call Details"),
      preview: summary,
      timeMeta,
      title: "Used",
      tone: "tool"
    }
  );
});
var GraphChatAgentToolCallItem = memo4(
  function GraphChatAgentToolCallItem2({
    autoOpen,
    item,
    onOpen,
    timeMeta
  }) {
    const summary = summarizeInlinePreviewText(item.text);
    return /* @__PURE__ */ jsx40(
      GraphChatHistoryToolFrame,
      {
        actionLabel: "Open agent details",
        actionTitle: "Agent Details",
        autoOpen,
        className: "thread-graph-event-agent-tool",
        icon: /* @__PURE__ */ jsx40(Bot, { className: "h-4 w-4" }),
        item,
        onOpen: () => onOpen(item, "Agent Details"),
        preview: summary,
        timeMeta,
        title: "Delegated",
        tone: "agent"
      }
    );
  }
);
var GraphChatSkillToolCallItem = memo4(
  function GraphChatSkillToolCallItem2({
    autoOpen,
    item,
    onOpen,
    timeMeta
  }) {
    const summary = summarizeInlinePreviewText(item.text);
    return /* @__PURE__ */ jsx40(
      GraphChatHistoryToolFrame,
      {
        actionLabel: "Open skill details",
        actionTitle: "Skill Details",
        autoOpen,
        className: "thread-graph-event-skill-tool",
        icon: /* @__PURE__ */ jsx40(Sparkles, { className: "h-4 w-4" }),
        item,
        onOpen: () => onOpen(item, "Skill Details"),
        preview: summary,
        timeMeta,
        title: "Loaded",
        tone: "skill"
      }
    );
  }
);
var GraphChatWebSearchItem = memo4(function GraphChatWebSearchItem2({
  autoOpen,
  item,
  onOpen,
  timeMeta
}) {
  const previewText = item.previewText?.trim() || item.text || "Web search";
  const detailText = item.detailText?.trim() || item.text || "Web search";
  const summary = summarizeInlinePreviewText(previewText);
  return /* @__PURE__ */ jsx40(
    GraphChatHistoryToolFrame,
    {
      actionLabel: "Open full web search",
      actionTitle: "Web Search Details",
      autoOpen,
      className: "thread-graph-event-search",
      icon: /* @__PURE__ */ jsx40(Search, { className: "h-4 w-4" }),
      item,
      onOpen: () => onOpen("Web Search Details", detailText),
      preview: summary,
      timeMeta,
      title: "Searched",
      tone: "search"
    }
  );
});
var GraphChatFileReadItem = memo4(function GraphChatFileReadItem2({
  autoOpen,
  item,
  onOpen,
  timeMeta
}) {
  const previewText = item.previewText?.trim() || item.text || "File read";
  const detailText = item.detailText?.trim() || item.text || "File read";
  const summary = summarizeInlinePreviewText(previewText);
  return /* @__PURE__ */ jsx40(
    GraphChatHistoryToolFrame,
    {
      actionLabel: "Open full file read",
      actionTitle: "File Read Details",
      autoOpen,
      className: "thread-graph-event-file-read",
      icon: /* @__PURE__ */ jsx40(FileText, { className: "h-4 w-4" }),
      item,
      onOpen: () => onOpen("File Read Details", detailText),
      preview: summary,
      timeMeta,
      title: "Read",
      tone: "fileRead"
    }
  );
});
var GraphChatImageItem = memo4(function GraphChatImageItem2({
  threadId,
  item,
  onOpen,
  getImageAssetUrl,
  timeMeta
}) {
  const assetPath = item.assetPath ?? item.detailText ?? null;
  const imageUrl = threadId && assetPath ? getImageAssetUrl?.({ threadId, path: assetPath }) ?? null : null;
  return /* @__PURE__ */ jsxs32(
    GraphChatHistoryEventFrame,
    {
      className: "thread-graph-event-image",
      icon: /* @__PURE__ */ jsx40(ImageIconLucide, { className: "h-4 w-4" }),
      item,
      timeMeta,
      title: "Generated",
      tone: "image",
      children: [
        imageUrl ? /* @__PURE__ */ jsx40(
          "button",
          {
            type: "button",
            onClick: () => onOpen("Image Path", assetPath ?? item.text),
            className: "block w-full text-left",
            children: /* @__PURE__ */ jsx40(
              "img",
              {
                src: imageUrl,
                alt: item.text || "Image preview",
                className: "thread-graph-history-event-image",
                loading: "lazy"
              }
            )
          }
        ) : /* @__PURE__ */ jsx40("div", { className: "thread-graph-history-event-summary", children: item.text }),
        assetPath ? /* @__PURE__ */ jsx40(
          "button",
          {
            type: "button",
            onClick: () => onOpen("Image Path", assetPath),
            className: "thread-graph-history-event-path",
            title: assetPath,
            children: assetPath
          }
        ) : null
      ]
    }
  );
});
var GraphChatFileChangeItem = memo4(function GraphChatFileChangeItem2({
  item,
  onOpen,
  timeMeta
}) {
  const pathSummary = item.previewText?.trim() && item.text.trim() !== item.previewText.trim() ? item.text.trim() : null;
  const detailText = item.detailText?.trim() || null;
  const displayedPath = formatTrailingPathLabel(
    pathSummary ?? item.previewText?.trim() ?? item.text,
    48
  );
  const summarySegments = fileChangeSummarySegments(item);
  const canOpen = Boolean(detailText || item.hasDeferredDetail);
  const summaryContent = /* @__PURE__ */ jsxs32("div", { className: "thread-graph-event-line thread-graph-file-change-inline flex min-w-0 items-center gap-2", children: [
    /* @__PURE__ */ jsx40(
      "span",
      {
        className: "thread-graph-history-detail-text min-w-0 flex-1 overflow-hidden whitespace-nowrap text-clip text-sm",
        title: pathSummary ?? displayedPath,
        children: displayedPath
      }
    ),
    summarySegments.length > 0 && /* @__PURE__ */ jsx40("div", { className: "inline-flex shrink-0 items-center justify-end gap-1.5 text-xs", children: summarySegments.map((segment) => /* @__PURE__ */ jsx40(
      "span",
      {
        className: `thread-graph-history-delta-badge ${segment.startsWith("+") ? "is-add" : segment.startsWith("-") ? "is-remove" : "is-neutral"}`,
        children: segment
      },
      segment
    )) })
  ] });
  const inlineSummary = canOpen ? /* @__PURE__ */ jsx40(
    "button",
    {
      type: "button",
      "aria-label": "Open file change details",
      onClick: () => onOpen("File Change Details", detailText ?? item.text),
      className: "thread-graph-file-change-inline-button min-w-0 flex-1 text-left",
      title: pathSummary ?? displayedPath,
      children: summaryContent
    }
  ) : summaryContent;
  return /* @__PURE__ */ jsx40(
    GraphChatHistoryEventFrame,
    {
      className: "thread-graph-event-file-change",
      headerMeta: inlineSummary,
      icon: /* @__PURE__ */ jsx40(FilePenLine, { className: "h-4 w-4" }),
      item,
      timeMeta,
      title: "Changed",
      tone: "fileChange"
    }
  );
});
var GraphChatArtifactHistoryItem = memo4(
  function GraphChatArtifactHistoryItem2({
    item,
    onSelect,
    timeMeta,
    onOpenWorkspaceFile
  }) {
    const plugins = usePlugins();
    const artifact = item.artifact;
    const [expanded, setExpanded] = useState22(false);
    const rendered = expanded && artifact ? plugins.renderArtifact({
      artifact,
      expanded,
      presentation: "timeline",
      ...artifact.workspacePath && onOpenWorkspaceFile ? { onOpenFile: () => onOpenWorkspaceFile({ path: artifact.workspacePath }) } : {},
      onToggleExpanded: () => setExpanded((current) => !current)
    }) : null;
    return /* @__PURE__ */ jsx40(
      GraphChatHistoryEventFrame,
      {
        actions: /* @__PURE__ */ jsxs32("span", { className: "inline-flex items-center gap-2", children: [
          artifact && !plugins.hasRendererForArtifact(artifact) ? /* @__PURE__ */ jsx40("span", { className: "thread-graph-history-event-secondary", children: "No renderer" }) : null,
          artifact && onSelect ? /* @__PURE__ */ jsxs32(
            "button",
            {
              type: "button",
              "aria-label": `Open artifact inspector for ${artifact.title}`,
              onClick: () => onSelect(item, artifact),
              className: "thread-graph-history-event-action",
              children: [
                /* @__PURE__ */ jsx40(PackageOpen, { className: "h-3.5 w-3.5" }),
                "Inspect"
              ]
            }
          ) : null
        ] }),
        className: "thread-graph-event-artifact",
        headerMeta: /* @__PURE__ */ jsxs32("div", { className: "flex min-w-0 flex-1 items-center gap-2", children: [
          artifact?.workspacePath && onOpenWorkspaceFile ? /* @__PURE__ */ jsx40(
            WorkspaceFileLink,
            {
              path: artifact.workspacePath,
              onOpen: onOpenWorkspaceFile,
              className: "thread-graph-artifact-file-link min-w-0 truncate text-sm",
              children: artifact.workspacePath
            }
          ) : /* @__PURE__ */ jsx40("span", { className: "thread-graph-history-detail-text min-w-0 truncate text-sm", children: artifact?.title ?? item.text }),
          /* @__PURE__ */ jsx40("span", { className: "thread-graph-history-event-secondary min-w-0 truncate", children: artifact?.summaryText ?? item.previewText ?? artifact?.type ?? "" }),
          /* @__PURE__ */ jsx40(
            "button",
            {
              type: "button",
              "aria-expanded": expanded,
              "aria-label": `${expanded ? "Collapse" : "Expand"} artifact ${artifact?.title ?? item.text}`,
              onClick: () => setExpanded((current) => !current),
              className: "thread-graph-artifact-inline-toggle inline-flex shrink-0 items-center justify-center p-2",
              children: expanded ? /* @__PURE__ */ jsx40(ChevronDown3, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsx40(ChevronRight3, { className: "h-3.5 w-3.5" })
            }
          )
        ] }),
        icon: /* @__PURE__ */ jsx40(PackageOpen, { className: "h-4 w-4" }),
        item,
        timeMeta,
        title: "Created",
        tone: "artifact",
        children: expanded ? rendered ?? /* @__PURE__ */ jsx40("pre", { className: "thread-graph-history-event-pre max-h-80 overflow-auto", children: JSON.stringify(artifact?.payload ?? item, null, 2) }) : null
      }
    );
  }
);
var GraphChatHookItem = memo4(function GraphChatHookItem2({
  item,
  timeMeta
}) {
  const outputText = item.hookOutputEntries?.map((entry) => entry.text.trim()).filter(Boolean).join("\n").trim() ?? "";
  const hookLabel = item.hookEventLabel ? `${item.hookEventLabel} hook` : item.text;
  const fallbackText = item.hookStatusMessage?.trim() || (item.previewText && item.previewText !== item.hookStatusMessage ? item.previewText.trim() : "") || item.text.trim();
  const summaryText = outputText || (fallbackText && fallbackText !== hookLabel ? fallbackText : hookLabel);
  const summary = summarizeInlinePreviewText(summaryText);
  const showGap = Boolean(outputText && summary.showGap);
  return /* @__PURE__ */ jsx40(
    GraphChatHistoryEventFrame,
    {
      className: "thread-graph-event-hook",
      icon: /* @__PURE__ */ jsx40(Webhook, { className: "h-4 w-4" }),
      item,
      timeMeta,
      title: "Ran hook",
      tone: "hook",
      children: /* @__PURE__ */ jsxs32("div", { className: "thread-graph-history-event-line", children: [
        /* @__PURE__ */ jsx40("p", { className: "thread-graph-history-detail-text min-w-0 flex-1 overflow-hidden whitespace-nowrap text-clip", children: outputText ? /* @__PURE__ */ jsxs32(Fragment9, { children: [
          /* @__PURE__ */ jsx40("span", { className: "thread-graph-history-event-secondary mr-2 font-sans text-[11px] uppercase", children: hookLabel }),
          /* @__PURE__ */ jsx40(GraphChatLinkifiedPlainText, { text: summary.firstLine })
        ] }) : /* @__PURE__ */ jsx40(
          GraphChatLinkifiedPlainText,
          {
            text: summary.firstLine && summary.firstLine !== hookLabel ? `${hookLabel} \xB7 ${summary.firstLine}` : hookLabel
          }
        ) }),
        showGap ? /* @__PURE__ */ jsx40("span", { className: "thread-graph-history-detail-meta shrink-0 text-[11px] font-medium tracking-[0.28em]", children: "..." }) : null
      ] })
    }
  );
});
var GraphChatCommandGroupItem = memo4(
  function GraphChatCommandGroupItem2({
    items,
    expanded,
    onToggleExpanded,
    onOpen,
    timeMeta
  }) {
    const runningCount = items.filter(
      (item) => isRunningHistoryStatus2(item.status)
    ).length;
    const countLabel = items.length === 1 ? "1 command" : `${items.length} commands`;
    return /* @__PURE__ */ jsx40(
      GraphChatHistoryGroupFrame,
      {
        className: "thread-graph-history-group-command",
        count: items.length,
        countBadgeClassName: "border-amber-200/35 text-amber-100",
        desktopIconClassName: "border-amber-300/30 bg-amber-300/[0.14] text-amber-100",
        expanded,
        expandedListClassName: "border-amber-300/12",
        icon: /* @__PURE__ */ jsx40(CommandBatchIcon, {}),
        onToggleExpanded,
        runningIndicator: runningCount > 0 ? /* @__PURE__ */ jsx40(RunningDots, {}) : null,
        summary: /* @__PURE__ */ jsxs32(Fragment9, { children: [
          /* @__PURE__ */ jsx40("span", { className: "thread-graph-history-group-verb", children: "Ran" }),
          /* @__PURE__ */ jsx40("span", { className: "thread-graph-history-group-description", children: countLabel }),
          runningCount > 0 ? /* @__PURE__ */ jsx40("span", { className: "inline-flex items-center text-xs text-amber-100/90", children: /* @__PURE__ */ jsx40(RunningDots, {}) }) : null
        ] }),
        timeMeta,
        toggleAriaLabel: `${expanded ? "Collapse" : "Expand"} ${items.length} command entries`,
        children: items.map((item, index) => {
          const summary = summarizeInlinePreviewText(item.text);
          return /* @__PURE__ */ jsxs32(
            "button",
            {
              type: "button",
              "aria-label": `Open grouped command ${index + 1}`,
              onClick: () => onOpen(item, `Command Output ${index + 1}`),
              className: "thread-graph-history-detail-row block w-full rounded-md border px-3 py-2 text-left transition",
              children: [
                /* @__PURE__ */ jsxs32("div", { className: "flex flex-wrap items-center gap-2", children: [
                  /* @__PURE__ */ jsxs32("span", { className: "rounded-full border border-amber-300/18 bg-amber-300/[0.07] px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-amber-100", children: [
                    "Step ",
                    index + 1
                  ] }),
                  item.status && /* @__PURE__ */ jsx40("span", { className: "thread-graph-history-detail-meta text-xs", children: item.status })
                ] }),
                /* @__PURE__ */ jsxs32("div", { className: "mt-1 flex min-w-0 items-center gap-2 text-sm leading-6", children: [
                  /* @__PURE__ */ jsx40("p", { className: "thread-graph-history-detail-text min-w-0 flex-1 overflow-hidden whitespace-nowrap text-clip", children: summary.firstLine }),
                  summary.showGap ? /* @__PURE__ */ jsx40("span", { className: "thread-graph-history-detail-meta shrink-0 text-[11px] font-medium tracking-[0.28em]", children: "..." }) : null
                ] })
              ]
            },
            item.id
          );
        })
      }
    );
  }
);
var GraphChatToolCallGroupItem = memo4(
  function GraphChatToolCallGroupItem2({
    items,
    expanded,
    onToggleExpanded,
    onOpen,
    timeMeta
  }) {
    const runningCount = items.filter(
      (item) => isRunningHistoryStatus2(item.status)
    ).length;
    const firstKind = items[0]?.kind ?? "toolCall";
    const label = firstKind === "agentToolCall" ? "agent action" : firstKind === "skillToolCall" ? "skill call" : "tool call";
    const countLabel = items.length === 1 ? `1 ${label}` : `${items.length} ${label}s`;
    return /* @__PURE__ */ jsx40(
      GraphChatHistoryGroupFrame,
      {
        className: "thread-graph-history-group-tool",
        count: items.length,
        countBadgeClassName: "border-teal-200/35 text-teal-100",
        desktopIconClassName: "border-teal-300/30 bg-teal-300/[0.14] text-teal-100",
        expanded,
        expandedListClassName: "border-teal-300/12",
        icon: firstKind === "agentToolCall" ? /* @__PURE__ */ jsx40(Bot, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsx40(Wrench2, { className: "h-3.5 w-3.5" }),
        onToggleExpanded,
        runningIndicator: runningCount > 0 ? /* @__PURE__ */ jsx40(RunningDots, {}) : null,
        summary: /* @__PURE__ */ jsxs32(Fragment9, { children: [
          /* @__PURE__ */ jsx40("span", { className: "thread-graph-history-group-verb", children: firstKind === "agentToolCall" ? "Delegated" : firstKind === "skillToolCall" ? "Loaded" : "Used" }),
          /* @__PURE__ */ jsx40("span", { className: "thread-graph-history-group-description", children: countLabel })
        ] }),
        timeMeta,
        toggleAriaLabel: `${expanded ? "Collapse" : "Expand"} ${countLabel}`,
        children: items.map((item, index) => {
          const summary = summarizeInlinePreviewText(item.text);
          return /* @__PURE__ */ jsx40(
            "button",
            {
              type: "button",
              "aria-label": `Open ${label} ${index + 1}`,
              onClick: () => onOpen(item, `${label} ${index + 1}`),
              className: "thread-graph-history-detail-row block w-full rounded-md border px-3 py-2 text-left transition",
              children: /* @__PURE__ */ jsxs32("div", { className: "flex min-w-0 items-center gap-2 text-sm leading-6", children: [
                /* @__PURE__ */ jsx40("p", { className: "thread-graph-history-detail-text min-w-0 flex-1 overflow-hidden whitespace-nowrap text-clip", children: summary.firstLine }),
                item.status ? /* @__PURE__ */ jsx40("span", { className: "thread-graph-history-detail-meta shrink-0 text-xs", children: item.status }) : null
              ] })
            },
            item.id
          );
        })
      }
    );
  }
);
var GraphChatAgentActivityGroupItem = memo4(
  function GraphChatAgentActivityGroupItem2({
    itemCount,
    running = false,
    expanded,
    onToggleExpanded,
    timeMeta,
    children
  }) {
    const countLabel = itemCount === 1 ? "1 operation" : `${itemCount} operations`;
    return /* @__PURE__ */ jsx40(
      GraphChatHistoryGroupFrame,
      {
        className: `thread-graph-history-group-activity ${running ? "is-running-batch" : ""}`,
        count: itemCount,
        countBadgeClassName: "border-slate-200/35 text-slate-100",
        desktopIconClassName: "border-slate-300/30 bg-slate-300/[0.14] text-slate-100",
        expanded,
        expandedListClassName: "border-slate-300/12",
        icon: /* @__PURE__ */ jsx40(Bot, { className: "h-3.5 w-3.5" }),
        onToggleExpanded,
        summary: /* @__PURE__ */ jsxs32(Fragment9, { children: [
          /* @__PURE__ */ jsx40("span", { className: "thread-graph-history-group-verb", children: "Worked" }),
          /* @__PURE__ */ jsx40("span", { className: "thread-graph-history-group-description", children: countLabel })
        ] }),
        timeMeta,
        toggleAriaLabel: `${expanded ? "Collapse" : "Expand"} ${countLabel}`,
        children
      }
    );
  }
);
var GraphChatSearchGroupItem = memo4(function GraphChatSearchGroupItem2({
  items,
  expanded,
  onToggleExpanded,
  onOpen,
  timeMeta
}) {
  const countLabel = items.length === 1 ? "1 search" : `${items.length} searches`;
  return /* @__PURE__ */ jsx40(
    GraphChatHistoryGroupFrame,
    {
      className: "thread-graph-history-group-search",
      count: items.length,
      countBadgeClassName: "border-sky-200/35 text-sky-100",
      desktopIconClassName: "border-sky-300/30 bg-sky-300/[0.14] text-sky-100",
      expanded,
      expandedListClassName: "border-sky-300/12",
      icon: /* @__PURE__ */ jsx40(SearchBatchIcon, {}),
      onToggleExpanded,
      summary: /* @__PURE__ */ jsxs32(Fragment9, { children: [
        /* @__PURE__ */ jsx40("span", { className: "thread-graph-history-group-verb", children: "Searched" }),
        /* @__PURE__ */ jsx40("span", { className: "thread-graph-history-group-description", children: countLabel })
      ] }),
      timeMeta,
      toggleAriaLabel: `${expanded ? "Collapse" : "Expand"} ${items.length} web search entries`,
      children: items.map((item, index) => {
        const previewText = item.previewText?.trim() || item.text || "Web search";
        const summary = summarizeInlinePreviewText(previewText);
        const detailText = item.detailText?.trim() || item.text || "Web search";
        return /* @__PURE__ */ jsxs32(
          "button",
          {
            type: "button",
            "aria-label": `Open grouped web search ${index + 1}`,
            onClick: () => onOpen(`Web Search ${index + 1}`, detailText),
            className: "thread-graph-history-detail-row block w-full rounded-md border px-3 py-2 text-left transition",
            children: [
              /* @__PURE__ */ jsxs32("div", { className: "flex flex-wrap items-center gap-2", children: [
                /* @__PURE__ */ jsxs32("span", { className: "rounded-full border border-sky-300/18 bg-sky-300/[0.07] px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-sky-100", children: [
                  "Search ",
                  index + 1
                ] }),
                item.status && /* @__PURE__ */ jsx40("span", { className: "thread-graph-history-detail-meta text-xs", children: item.status })
              ] }),
              /* @__PURE__ */ jsxs32("div", { className: "mt-1 flex min-w-0 items-center gap-2 text-sm leading-6", children: [
                /* @__PURE__ */ jsx40("p", { className: "thread-graph-history-detail-text min-w-0 flex-1 overflow-hidden whitespace-nowrap text-clip", children: summary.firstLine }),
                summary.showGap ? /* @__PURE__ */ jsx40("span", { className: "thread-graph-history-detail-meta shrink-0 text-[11px] font-medium tracking-[0.28em]", children: "..." }) : null
              ] })
            ]
          },
          item.id
        );
      })
    }
  );
});
var GraphChatFileReadGroupItem = memo4(
  function GraphChatFileReadGroupItem2({
    items,
    expanded,
    onToggleExpanded,
    onOpen,
    timeMeta
  }) {
    const countLabel = items.length === 1 ? "1 file read" : `${items.length} file reads`;
    return /* @__PURE__ */ jsx40(
      GraphChatHistoryGroupFrame,
      {
        className: "thread-graph-history-group-file-read",
        count: items.length,
        countBadgeClassName: "border-cyan-200/35 text-cyan-100",
        desktopIconClassName: "border-cyan-300/30 bg-cyan-300/[0.14] text-cyan-100",
        expanded,
        expandedListClassName: "border-cyan-300/12",
        icon: /* @__PURE__ */ jsx40(FileReadIcon, {}),
        onToggleExpanded,
        summary: /* @__PURE__ */ jsxs32(Fragment9, { children: [
          /* @__PURE__ */ jsx40("span", { className: "thread-graph-history-group-verb", children: "Read" }),
          /* @__PURE__ */ jsx40("span", { className: "thread-graph-history-group-description", children: countLabel })
        ] }),
        timeMeta,
        toggleAriaLabel: `${expanded ? "Collapse" : "Expand"} ${items.length} file read entries`,
        children: items.map((item, index) => {
          const previewText = item.previewText?.trim() || item.text || "File read";
          const summary = summarizeInlinePreviewText(previewText);
          const detailText = item.detailText?.trim() || item.text || "File read";
          return /* @__PURE__ */ jsxs32(
            "button",
            {
              type: "button",
              "aria-label": `Open grouped file read ${index + 1}`,
              onClick: () => onOpen(`File Read ${index + 1}`, detailText),
              className: "thread-graph-history-detail-row block w-full rounded-md border px-3 py-2 text-left transition",
              children: [
                /* @__PURE__ */ jsxs32("div", { className: "flex flex-wrap items-center gap-2", children: [
                  /* @__PURE__ */ jsxs32("span", { className: "rounded-full border border-cyan-300/18 bg-cyan-300/[0.07] px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-cyan-100", children: [
                    "Read ",
                    index + 1
                  ] }),
                  item.status && /* @__PURE__ */ jsx40("span", { className: "thread-graph-history-detail-meta text-xs", children: item.status })
                ] }),
                /* @__PURE__ */ jsxs32("div", { className: "mt-1 flex min-w-0 items-center gap-2 text-sm leading-6", children: [
                  /* @__PURE__ */ jsx40("p", { className: "thread-graph-history-detail-text min-w-0 flex-1 overflow-hidden whitespace-nowrap text-clip", children: summary.firstLine }),
                  summary.showGap ? /* @__PURE__ */ jsx40("span", { className: "thread-graph-history-detail-meta shrink-0 text-[11px] font-medium tracking-[0.28em]", children: "..." }) : null
                ] })
              ]
            },
            item.id
          );
        })
      }
    );
  }
);
var GraphChatFileChangeGroupItem = memo4(
  function GraphChatFileChangeGroupItem2({
    items,
    expanded,
    onToggleExpanded,
    onOpen,
    timeMeta
  }) {
    const changedFiles = items.reduce(
      (sum, item) => sum + (item.changedFiles ?? 0),
      0
    );
    const addedLines = items.reduce(
      (sum, item) => sum + (item.addedLines ?? 0),
      0
    );
    const removedLines = items.reduce(
      (sum, item) => sum + (item.removedLines ?? 0),
      0
    );
    const batchLabel = items.length === 1 ? "1 file change" : `${items.length} file changes`;
    return /* @__PURE__ */ jsx40(
      GraphChatHistoryGroupFrame,
      {
        className: "thread-graph-history-group-file-change",
        count: items.length,
        countBadgeClassName: "border-lime-200/35 text-lime-100",
        desktopIconClassName: "border-lime-300/30 bg-lime-300/[0.14] text-lime-100",
        expanded,
        expandedListClassName: "border-lime-300/12",
        icon: /* @__PURE__ */ jsx40(FileChangeIcon, {}),
        onToggleExpanded,
        summary: /* @__PURE__ */ jsxs32(Fragment9, { children: [
          /* @__PURE__ */ jsx40("span", { className: "thread-graph-history-group-verb", children: "Changed" }),
          /* @__PURE__ */ jsx40("span", { className: "thread-graph-history-group-description", children: batchLabel }),
          changedFiles > 0 ? /* @__PURE__ */ jsxs32("span", { className: "thread-graph-history-detail-meta text-xs", children: [
            changedFiles,
            " files"
          ] }) : null
        ] }),
        timeMeta,
        toggleAriaLabel: `${expanded ? "Collapse" : "Expand"} ${items.length} file change entries`,
        trailingSummary: /* @__PURE__ */ jsxs32("span", { className: "inline-flex shrink-0 items-center gap-1.5", children: [
          addedLines > 0 ? /* @__PURE__ */ jsxs32("span", { className: "thread-graph-history-delta-badge is-add", children: [
            "+",
            addedLines
          ] }) : null,
          removedLines > 0 ? /* @__PURE__ */ jsxs32("span", { className: "thread-graph-history-delta-badge is-remove", children: [
            "-",
            removedLines
          ] }) : null
        ] }),
        children: items.map((item, index) => {
          const detailText = item.detailText?.trim() || item.previewText?.trim() || item.text;
          const pathSummary = item.previewText?.trim() && item.text.trim() !== item.previewText.trim() ? item.text.trim() : item.previewText?.trim() || item.text;
          return /* @__PURE__ */ jsx40(
            "button",
            {
              type: "button",
              "aria-label": `Open grouped file change ${index + 1}`,
              onClick: () => onOpen(`File Change ${index + 1}`, detailText),
              className: "thread-graph-history-detail-row block w-full rounded-md border px-3 py-2 text-left transition",
              children: /* @__PURE__ */ jsxs32("div", { className: "flex min-w-0 items-center gap-2", children: [
                /* @__PURE__ */ jsx40(
                  "span",
                  {
                    className: "thread-graph-history-detail-text min-w-0 flex-1 text-sm leading-6",
                    title: pathSummary,
                    children: formatTrailingPathLabel(pathSummary, 34)
                  }
                ),
                /* @__PURE__ */ jsxs32("span", { className: "inline-flex shrink-0 items-center gap-1.5", children: [
                  (item.addedLines ?? 0) > 0 ? /* @__PURE__ */ jsxs32("span", { className: "thread-graph-history-delta-badge is-add", children: [
                    "+",
                    item.addedLines
                  ] }) : null,
                  (item.removedLines ?? 0) > 0 ? /* @__PURE__ */ jsxs32("span", { className: "thread-graph-history-delta-badge is-remove", children: [
                    "-",
                    item.removedLines
                  ] }) : null
                ] })
              ] })
            },
            item.id
          );
        })
      }
    );
  }
);

// src/components/graph-chat/GraphChatTurnBody.tsx
import { CheckCircle2 as CheckCircle24, Clock3, Loader2 as Loader25, XCircle as XCircle4 } from "lucide-react";
import { Fragment as Fragment10, jsx as jsx41, jsxs as jsxs33 } from "react/jsx-runtime";
function normalizeGraphChatPlanStepStatus(status) {
  const normalized = status.trim().toLowerCase();
  if (normalized === "completed" || normalized === "done" || normalized === "complete") {
    return "completed";
  }
  if (normalized === "in_progress" || normalized === "in-progress" || normalized === "running" || normalized === "active") {
    return "in_progress";
  }
  if (normalized === "failed" || normalized === "error" || normalized === "cancelled") {
    return "failed";
  }
  if (normalized === "pending" || normalized === "todo") {
    return "pending";
  }
  return "unknown";
}
function GraphChatPlanStepStatusIcon({ status }) {
  const normalized = normalizeGraphChatPlanStepStatus(status);
  const label = normalized === "completed" ? "Plan step status: Completed" : normalized === "in_progress" ? "Plan step status: In progress" : normalized === "pending" ? "Plan step status: Pending" : normalized === "failed" ? "Plan step status: Failed" : `Plan step status: ${status}`;
  const badgeClassName = normalized === "completed" ? "thread-graph-plan-status is-completed" : normalized === "in_progress" ? "thread-graph-plan-status is-running" : normalized === "pending" ? "thread-graph-plan-status is-pending" : normalized === "failed" ? "thread-graph-plan-status is-failed" : "thread-graph-plan-status is-unknown";
  return /* @__PURE__ */ jsx41(
    Badge,
    {
      "aria-label": label,
      title: label.replace("Plan step status: ", ""),
      className: badgeClassName,
      children: normalized === "completed" ? /* @__PURE__ */ jsx41(CheckCircle24, { className: "h-3.5 w-3.5" }) : normalized === "in_progress" ? /* @__PURE__ */ jsx41(Loader25, { className: "h-3.5 w-3.5 animate-spin" }) : normalized === "pending" ? /* @__PURE__ */ jsx41(Clock3, { className: "h-3.5 w-3.5" }) : normalized === "failed" ? /* @__PURE__ */ jsx41(XCircle4, { className: "h-3.5 w-3.5" }) : /* @__PURE__ */ jsx41("span", { className: "text-[10px] font-semibold uppercase tracking-[0.14em]", children: "?" })
    }
  );
}
function GraphChatLivePlanCard({ livePlan }) {
  return /* @__PURE__ */ jsxs33("div", { className: "thread-graph-plan-card rounded-xl border px-3 py-3", children: [
    /* @__PURE__ */ jsxs33("div", { className: "thread-graph-plan-header flex flex-wrap items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsx41("p", { className: "text-sm font-semibold", children: "Plan update" }),
      /* @__PURE__ */ jsx41(Badge, { className: "thread-graph-plan-badge", children: "Live" })
    ] }),
    livePlan.explanation ? /* @__PURE__ */ jsx41("p", { className: "thread-graph-plan-explanation mt-3 text-sm", children: livePlan.explanation }) : null,
    /* @__PURE__ */ jsx41("div", { className: "mt-3 space-y-2", children: livePlan.plan.map((step, index) => /* @__PURE__ */ jsxs33(
      "div",
      {
        className: "thread-graph-plan-step flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-sm",
        children: [
          /* @__PURE__ */ jsx41("span", { className: "thread-graph-plan-step-text min-w-0 flex-1", children: step.step }),
          /* @__PURE__ */ jsx41(GraphChatPlanStepStatusIcon, { status: step.status })
        ]
      },
      `${livePlan.turnId}-${index}`
    )) })
  ] });
}
function GraphChatTurnBody({
  footer,
  history,
  liveHookPrompt,
  liveOutput,
  livePlan
}) {
  return /* @__PURE__ */ jsxs33(Fragment10, { children: [
    history,
    livePlan ? /* @__PURE__ */ jsx41(GraphChatLivePlanCard, { livePlan }) : null,
    liveHookPrompt ?? liveOutput ?? null,
    footer
  ] });
}

// src/components/graph-chat/GraphChatTurnFrame.tsx
import { jsx as jsx42, jsxs as jsxs34 } from "react/jsx-runtime";
function GraphChatTurnFrame({
  absoluteIndex,
  body,
  collapsed,
  collapsedBody,
  error,
  footer,
  headerStatus,
  isActive = false,
  refCallback,
  startedAt,
  timeLabel,
  timeTitle,
  tokenSummary
}) {
  return /* @__PURE__ */ jsxs34(
    "article",
    {
      ref: refCallback,
      "data-testid": "chat-turn",
      "data-turn-active": isActive ? "true" : "false",
      className: "thread-graph-turn px-3 py-2 sm:px-5 sm:py-3",
      children: [
        /* @__PURE__ */ jsx42("div", { className: "thread-graph-turn-header flex items-start justify-between gap-2", children: /* @__PURE__ */ jsxs34("div", { className: "min-w-0 flex flex-1 items-start gap-1.5", children: [
          /* @__PURE__ */ jsxs34("div", { className: "min-w-0 flex flex-1 items-center gap-1.5 overflow-hidden", children: [
            /* @__PURE__ */ jsxs34("span", { className: "thread-graph-turn-index rounded-[0.6rem] border px-1.5 py-0.5 text-[10px] uppercase tracking-[0.16em]", children: [
              "Turn ",
              absoluteIndex
            ] }),
            /* @__PURE__ */ jsx42(
              "time",
              {
                dateTime: startedAt ?? void 0,
                title: timeTitle,
                className: "thread-graph-turn-time shrink-0 text-[10px] sm:text-[11px]",
                children: timeLabel
              }
            ),
            headerStatus,
            error ? /* @__PURE__ */ jsx42("p", { className: "hidden truncate text-[11px] text-rose-200 sm:block", children: error }) : null
          ] }),
          tokenSummary
        ] }) }),
        error ? /* @__PURE__ */ jsx42("p", { className: "mt-1 text-[11px] text-rose-200 sm:hidden", children: error }) : null,
        /* @__PURE__ */ jsxs34("div", { className: "thread-graph-turn-body mt-2 space-y-2", children: [
          collapsed ? collapsedBody : body,
          !collapsed ? footer : null
        ] })
      ]
    }
  );
}

// src/components/timeline/tokenFormatting.tsx
import {
  useEffect as useEffect17,
  useLayoutEffect as useLayoutEffect6,
  useRef as useRef14,
  useState as useState23
} from "react";
import { Fragment as Fragment11, jsx as jsx43, jsxs as jsxs35 } from "react/jsx-runtime";
function TokenInIcon() {
  return /* @__PURE__ */ jsxs35(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.7",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx43("path", { d: "M8 2.75v8" }),
        /* @__PURE__ */ jsx43("path", { d: "m4.75 7.5 3.25 3.25L11.25 7.5" })
      ]
    }
  );
}
function TokenOutIcon() {
  return /* @__PURE__ */ jsxs35(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.7",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx43("path", { d: "M8 13.25v-8" }),
        /* @__PURE__ */ jsx43("path", { d: "m11.25 8.5-3.25-3.25L4.75 8.5" })
      ]
    }
  );
}
function TokenCacheIcon() {
  return /* @__PURE__ */ jsxs35(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.45",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx43("path", { d: "M3.25 5.25 8 2.75l4.75 2.5L8 7.75l-4.75-2.5Z" }),
        /* @__PURE__ */ jsx43("path", { d: "M3.25 8 8 10.5 12.75 8" }),
        /* @__PURE__ */ jsx43("path", { d: "M3.25 10.75 8 13.25l4.75-2.5" }),
        /* @__PURE__ */ jsx43("path", { d: "M3.25 5.25v5.5" }),
        /* @__PURE__ */ jsx43("path", { d: "M12.75 5.25v5.5" })
      ]
    }
  );
}
function TokenReasonIcon() {
  return /* @__PURE__ */ jsxs35(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.45",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx43("path", { d: "M6.2 3.2a2.3 2.3 0 0 0-2.95 3.5A2.4 2.4 0 0 0 4.5 11h.2c.25 1.1 1.1 1.8 2.3 1.8h1.8c1.2 0 2.05-.7 2.3-1.8h.2A2.4 2.4 0 0 0 12.75 6.7 2.3 2.3 0 0 0 9.8 3.2" }),
        /* @__PURE__ */ jsx43("path", { d: "M6.3 6.15c.45-.42 1.02-.65 1.7-.65s1.25.23 1.7.65" }),
        /* @__PURE__ */ jsx43("path", { d: "M8 5.5v4.75" }),
        /* @__PURE__ */ jsx43("path", { d: "M6.75 9.05 8 10.25l1.25-1.2" })
      ]
    }
  );
}
function formatCompactTokenCount(value) {
  if (!Number.isFinite(value) || value <= 0) {
    return "0";
  }
  if (value >= 1e6) {
    const rounded = value >= 1e7 ? Math.round(value / 1e6) : value / 1e6;
    return `${String(rounded.toFixed(1)).replace(/\.0$/, "")}m`;
  }
  if (value >= 1e3) {
    const rounded = value >= 1e4 ? Math.round(value / 1e3) : value / 1e3;
    return `${String(rounded.toFixed(1)).replace(/\.0$/, "")}k`;
  }
  return String(Math.round(value));
}
function formatCompactUsd(value) {
  if (!Number.isFinite(value) || value <= 0) {
    return "$0";
  }
  if (value >= 100) {
    return `$${Math.round(value)}`;
  }
  if (value >= 10) {
    return `$${String(value.toFixed(1)).replace(/\.0$/, "")}`;
  }
  if (value >= 1) {
    return `$${String(value.toFixed(2)).replace(/0$/, "").replace(/\.$/, "")}`;
  }
  if (value >= 0.1) {
    return `$${value.toFixed(2)}`;
  }
  if (value >= 0.01) {
    return `$${value.toFixed(3)}`;
  }
  if (value >= 1e-3) {
    return `$${value.toFixed(4)}`;
  }
  return "<$0.001";
}
function formatDetailedUsd(value) {
  if (!Number.isFinite(value) || value <= 0) {
    return "$0.0000";
  }
  return `$${value.toFixed(4)}`;
}
function proportionalOutputUsd(totalOutputUsd, outputTokens, sliceTokens) {
  const outputUsdValue = totalOutputUsd ?? null;
  if (!Number.isFinite(outputUsdValue ?? NaN) || outputUsdValue === null || outputTokens <= 0 || sliceTokens <= 0) {
    return null;
  }
  return outputUsdValue * sliceTokens / outputTokens;
}
function buildTurnTokenDetails(turn) {
  const usage = turn.tokenUsage?.total;
  if (!usage) {
    return [];
  }
  const nonCachedInputTokens = Math.max(
    usage.inputTokens - usage.cachedInputTokens - (usage.cacheWriteInputTokens ?? 0),
    0
  );
  const cachedInputTokens = Math.max(usage.cachedInputTokens, 0);
  const cacheWriteInputTokens = Math.max(
    usage.cacheWriteInputTokens ?? 0,
    0
  );
  const reasoningOutputTokens = Math.max(usage.reasoningOutputTokens, 0);
  const nonReasoningOutputTokens = Math.max(
    usage.outputTokens - reasoningOutputTokens,
    0
  );
  const details = [
    nonCachedInputTokens > 0 ? {
      id: "in",
      label: "Input",
      tokenCompactValue: formatCompactTokenCount(nonCachedInputTokens),
      tokenRawValue: nonCachedInputTokens,
      usdCompactValue: turn.priceEstimate ? formatDetailedUsd(turn.priceEstimate.inputUsd) : "--",
      usdRawValue: turn.priceEstimate?.inputUsd ?? null,
      className: "token-badge-in",
      icon: /* @__PURE__ */ jsx43(TokenInIcon, {})
    } : null,
    cachedInputTokens > 0 ? {
      id: "cache",
      label: "Cached input",
      tokenCompactValue: formatCompactTokenCount(cachedInputTokens),
      tokenRawValue: cachedInputTokens,
      usdCompactValue: turn.priceEstimate ? formatDetailedUsd(turn.priceEstimate.cachedInputUsd) : "--",
      usdRawValue: turn.priceEstimate?.cachedInputUsd ?? null,
      className: "token-badge-cache",
      icon: /* @__PURE__ */ jsx43(TokenCacheIcon, {})
    } : null,
    cacheWriteInputTokens > 0 ? {
      id: "cache-write",
      label: "Cache write",
      tokenCompactValue: formatCompactTokenCount(cacheWriteInputTokens),
      tokenRawValue: cacheWriteInputTokens,
      usdCompactValue: turn.priceEstimate ? formatDetailedUsd(turn.priceEstimate.cacheWriteInputUsd ?? 0) : "--",
      usdRawValue: turn.priceEstimate?.cacheWriteInputUsd ?? null,
      className: "token-badge-cache",
      icon: /* @__PURE__ */ jsx43(TokenCacheIcon, {})
    } : null,
    nonReasoningOutputTokens > 0 ? {
      id: "out",
      label: "Output",
      tokenCompactValue: formatCompactTokenCount(nonReasoningOutputTokens),
      tokenRawValue: nonReasoningOutputTokens,
      usdCompactValue: turn.priceEstimate ? formatDetailedUsd(
        proportionalOutputUsd(
          turn.priceEstimate.outputUsd,
          Math.max(usage.outputTokens, 0),
          nonReasoningOutputTokens
        ) ?? 0
      ) : "--",
      usdRawValue: proportionalOutputUsd(
        turn.priceEstimate?.outputUsd,
        Math.max(usage.outputTokens, 0),
        nonReasoningOutputTokens
      ),
      className: "token-badge-out",
      icon: /* @__PURE__ */ jsx43(TokenOutIcon, {})
    } : null,
    reasoningOutputTokens > 0 ? {
      id: "reason",
      label: "Reasoning",
      tokenCompactValue: formatCompactTokenCount(reasoningOutputTokens),
      tokenRawValue: reasoningOutputTokens,
      usdCompactValue: turn.priceEstimate ? formatDetailedUsd(
        proportionalOutputUsd(
          turn.priceEstimate.outputUsd,
          Math.max(usage.outputTokens, 0),
          reasoningOutputTokens
        ) ?? 0
      ) : "--",
      usdRawValue: proportionalOutputUsd(
        turn.priceEstimate?.outputUsd,
        Math.max(usage.outputTokens, 0),
        reasoningOutputTokens
      ),
      className: "token-badge-reason",
      icon: /* @__PURE__ */ jsx43(TokenReasonIcon, {})
    } : null
  ];
  return details.filter((detail) => detail !== null);
}
function buildTurnPriceBadge(turn) {
  return {
    label: turn.priceEstimate ? formatCompactUsd(turn.priceEstimate.totalUsd) : "--",
    title: turn.priceEstimate === null || turn.priceEstimate === void 0 ? "Price estimate unavailable for this model." : `Estimated cost: ${formatDetailedUsd(turn.priceEstimate.totalUsd)}`,
    className: turn.priceEstimate ? "token-badge-total" : "token-badge-empty"
  };
}
var TURN_HEADER_BADGE_CLASS_NAME = "inline-flex shrink-0 items-center gap-1 rounded-full border px-1.5 py-0.5 text-[10px] font-normal leading-none sm:text-[11px]";
function TurnTokenSummary({ turn }) {
  const details = buildTurnTokenDetails(turn);
  const priceBadge = buildTurnPriceBadge(turn);
  const [isMobileOpen, setIsMobileOpen] = useState23(false);
  const [isDesktopOpen, setIsDesktopOpen] = useState23(false);
  const [mobilePopoverShift, setMobilePopoverShift] = useState23(0);
  const containerRef = useRef14(null);
  const desktopPriceRef = useRef14(null);
  const mobilePopoverRef = useRef14(null);
  useLayoutEffect6(() => {
    if (!isMobileOpen || details.length === 0) {
      setMobilePopoverShift(0);
      return;
    }
    const updatePopoverShift = () => {
      const anchor = containerRef.current;
      const popover = mobilePopoverRef.current;
      if (!anchor || !popover) {
        return;
      }
      const anchorRect = anchor.getBoundingClientRect();
      const popoverWidth = popover.offsetWidth || popover.getBoundingClientRect().width;
      if (popoverWidth <= 0) {
        return;
      }
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      const viewportPadding = 12;
      const desiredLeft = anchorRect.left + anchorRect.width / 2 - popoverWidth / 2;
      const minLeft = viewportPadding;
      const maxLeft = Math.max(
        minLeft,
        viewportWidth - viewportPadding - popoverWidth
      );
      const clampedLeft = Math.min(Math.max(desiredLeft, minLeft), maxLeft);
      setMobilePopoverShift(Math.round(clampedLeft - desiredLeft));
    };
    updatePopoverShift();
    window.addEventListener("resize", updatePopoverShift);
    return () => {
      window.removeEventListener("resize", updatePopoverShift);
    };
  }, [details.length, isMobileOpen]);
  useEffect17(() => {
    if (!isMobileOpen && !isDesktopOpen) {
      return;
    }
    const handlePointerDown = (event) => {
      if (!(event.target instanceof Node)) {
        return;
      }
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsMobileOpen(false);
      }
      if (desktopPriceRef.current && !desktopPriceRef.current.contains(event.target)) {
        setIsDesktopOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isDesktopOpen, isMobileOpen]);
  if (!priceBadge && details.length === 0) {
    return null;
  }
  const renderBreakdownPopover = () => /* @__PURE__ */ jsx43("div", { className: "thread-token-popover min-w-[12rem] rounded-2xl border p-2.5 shadow-2xl shadow-black/20 backdrop-blur", children: /* @__PURE__ */ jsx43("div", { className: "space-y-1", children: details.map((detail) => /* @__PURE__ */ jsxs35(
    "div",
    {
      className: "thread-token-popover-row flex items-center justify-between gap-3 rounded-xl border px-2.5 py-1.5 text-[11px]",
      title: `${detail.label}: ${detail.tokenRawValue} tokens`,
      children: [
        /* @__PURE__ */ jsxs35("span", { className: "thread-token-popover-text inline-flex min-w-0 items-center gap-2", children: [
          /* @__PURE__ */ jsx43("span", { className: "inline-flex shrink-0", children: detail.icon }),
          /* @__PURE__ */ jsx43("span", { className: "thread-token-popover-strong font-medium", children: detail.usdCompactValue })
        ] }),
        /* @__PURE__ */ jsx43("span", { className: "thread-token-popover-text shrink-0 font-medium", children: detail.tokenCompactValue })
      ]
    },
    detail.id
  )) }) });
  return /* @__PURE__ */ jsxs35(Fragment11, { children: [
    /* @__PURE__ */ jsxs35("div", { className: "hidden shrink-0 items-center gap-1.5 md:inline-flex", children: [
      priceBadge ? /* @__PURE__ */ jsxs35(
        "div",
        {
          ref: desktopPriceRef,
          className: "relative shrink-0",
          onMouseEnter: () => setIsDesktopOpen(true),
          onMouseLeave: () => setIsDesktopOpen(false),
          children: [
            /* @__PURE__ */ jsx43(
              "button",
              {
                type: "button",
                "aria-label": "Show token and price details",
                "aria-expanded": isDesktopOpen,
                onFocus: () => setIsDesktopOpen(true),
                onBlur: () => setIsDesktopOpen(false),
                className: `${TURN_HEADER_BADGE_CLASS_NAME} appearance-none whitespace-nowrap bg-transparent !text-[10px] !font-normal !leading-none transition hover:bg-[var(--theme-hover)] sm:!text-[11px] ${priceBadge.className}`,
                title: priceBadge.title,
                children: priceBadge.label
              }
            ),
            isDesktopOpen && details.length > 0 ? /* @__PURE__ */ jsx43("div", { className: "absolute left-1/2 top-full z-30 mt-1.5 -translate-x-1/2", children: renderBreakdownPopover() }) : null
          ]
        }
      ) : null,
      details.map((detail) => /* @__PURE__ */ jsxs35(
        "span",
        {
          className: `${TURN_HEADER_BADGE_CLASS_NAME} ${detail.className}`,
          title: `${detail.label}: ${detail.usdCompactValue}, ${detail.tokenRawValue} tokens`,
          children: [
            detail.icon,
            /* @__PURE__ */ jsx43("span", { className: "thread-token-badge-value font-medium", children: detail.tokenCompactValue })
          ]
        },
        detail.id
      ))
    ] }),
    /* @__PURE__ */ jsxs35("div", { ref: containerRef, className: "relative shrink-0 md:hidden", children: [
      priceBadge ? /* @__PURE__ */ jsx43(
        "button",
        {
          type: "button",
          "aria-label": "Show token and price details",
          "aria-expanded": isMobileOpen,
          onClick: () => setIsMobileOpen((current) => !current),
          className: `${TURN_HEADER_BADGE_CLASS_NAME} appearance-none whitespace-nowrap bg-transparent !text-[10px] !font-normal !leading-none transition hover:bg-[var(--theme-hover)] sm:!text-[11px] ${priceBadge.className}`,
          title: priceBadge.title,
          children: priceBadge.label
        }
      ) : null,
      isMobileOpen && details.length > 0 ? /* @__PURE__ */ jsx43(
        "div",
        {
          ref: mobilePopoverRef,
          className: "absolute left-1/2 top-full z-30 mt-1.5",
          style: {
            transform: `translateX(${mobilePopoverShift}px) translateX(-50%)`
          },
          children: renderBreakdownPopover()
        }
      ) : null
    ] })
  ] });
}

// src/components/timeline/turnStatus.tsx
import { useEffect as useEffect18, useState as useState25 } from "react";

// src/components/timeline/TurnUsageInline.tsx
import { useState as useState24 } from "react";
import { DollarSign, ArrowDownToLine, ArrowUpFromLine, Database, Brain as Brain2, Save } from "lucide-react";
import { jsx as jsx44, jsxs as jsxs36 } from "react/jsx-runtime";
function formatTurnRuntimeSummary(turn) {
  const model = turn.model?.trim() || "Model unavailable";
  const effort = turn.reasoningEffort?.trim();
  return effort ? `${model} \xB7 ${effort}` : model;
}
function TurnUsageInline({ turn, readOnly = false }) {
  const [detailsOpen, setDetailsOpen] = useState24(false);
  const usage = turn.tokenUsage?.total;
  const price = turn.priceEstimate;
  const uncachedInput = usage ? Math.max(0, usage.inputTokens - usage.cachedInputTokens - (usage.cacheWriteInputTokens ?? 0)) : 0;
  const reasoning = usage ? Math.min(usage.outputTokens, usage.reasoningOutputTokens ?? 0) : 0;
  const reasoningUsd = usage?.outputTokens && price ? price.outputUsd * reasoning / usage.outputTokens : 0;
  const hasPrice = price && Number.isFinite(price.totalUsd) && price.totalUsd >= 0;
  const counts = usage ? [
    { label: "tok", value: usage.totalTokens, title: "Total tokens" },
    {
      label: "in",
      value: uncachedInput,
      title: "Input tokens (excluding cache)"
    },
    {
      label: "out",
      value: usage.outputTokens,
      title: "Output tokens (including reasoning)"
    },
    {
      label: "cached",
      value: usage.cachedInputTokens,
      title: "Cached input tokens"
    },
    ...usage.cacheWriteInputTokens ? [
      {
        label: "cache write",
        value: usage.cacheWriteInputTokens,
        title: "Cache write input tokens"
      }
    ] : []
  ] : [];
  const priceTitle = "API price unavailable for this model or usage report.";
  const details = usage ? [
    { label: "Input", icon: ArrowDownToLine, value: uncachedInput, usd: price?.inputUsd },
    { label: "Cached input", icon: Database, value: usage.cachedInputTokens, usd: price?.cachedInputUsd },
    { label: "Output", icon: ArrowUpFromLine, value: usage.outputTokens - reasoning, usd: price ? price.outputUsd - reasoningUsd : void 0 },
    ...usage.reasoningOutputTokens > 0 ? [{ label: "Reasoning", icon: Brain2, value: reasoning, usd: price ? reasoningUsd : void 0 }] : [],
    ...usage.cacheWriteInputTokens ? [{ label: "Cache write", icon: Save, value: usage.cacheWriteInputTokens, usd: price?.cacheWriteInputUsd }] : []
  ] : [];
  return /* @__PURE__ */ jsxs36("span", { className: "thread-turn-usage", "data-testid": "turn-usage", children: [
    /* @__PURE__ */ jsxs36(
      "span",
      {
        className: "thread-turn-usage-model",
        title: formatTurnRuntimeSummary(turn),
        children: [
          turn.model?.trim() || "Model unavailable",
          turn.reasoningEffort?.trim() ? /* @__PURE__ */ jsxs36("span", { className: "thread-turn-usage-effort", children: [
            " \xB7 ",
            turn.reasoningEffort.trim()
          ] }) : null
        ]
      }
    ),
    counts.length > 0 ? /* @__PURE__ */ jsx44(
      "span",
      {
        className: "thread-turn-usage-tokens",
        "aria-label": "Turn token usage",
        children: counts.map(({ label, value, title }) => /* @__PURE__ */ jsxs36(
          "span",
          {
            title: `${title}: ${value.toLocaleString("en-US")}`,
            children: [
              /* @__PURE__ */ jsx44("span", { className: "thread-turn-usage-value", children: formatCompactTokenCount(value) }),
              " ",
              label
            ]
          },
          label
        ))
      }
    ) : null,
    hasPrice && readOnly ? /* @__PURE__ */ jsx44("span", { className: "thread-turn-usage-price", children: formatCompactUsd(price.totalUsd) }) : hasPrice ? /* @__PURE__ */ jsxs36(Tooltip, { open: detailsOpen, onOpenChange: setDetailsOpen, children: [
      /* @__PURE__ */ jsx44(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx44(
        "button",
        {
          type: "button",
          className: "thread-turn-usage-price",
          "aria-label": `API cost ${formatCompactUsd(price.totalUsd)}. Show token details`,
          "aria-expanded": detailsOpen,
          onClick: (event) => {
            event.preventDefault();
            event.stopPropagation();
            setDetailsOpen((open) => !open);
          },
          children: formatCompactUsd(price.totalUsd)
        }
      ) }),
      /* @__PURE__ */ jsx44(
        TooltipContent,
        {
          side: "top",
          sideOffset: 6,
          className: "thread-usage-details",
          style: { background: "#252622", color: "#f2f1e9", border: "1px solid #484a41", borderRadius: 10, padding: "9px 12px", boxShadow: "0 6px 22px #0005", zIndex: 80 },
          children: /* @__PURE__ */ jsxs36("div", { style: { display: "grid", gridTemplateColumns: "16px auto auto", gap: "6px 12px", alignItems: "center", fontVariantNumeric: "tabular-nums" }, children: [
            /* @__PURE__ */ jsx44(DollarSign, { size: 14, "aria-label": "API cost" }),
            /* @__PURE__ */ jsx44("span", { style: { gridColumn: "span 2", textAlign: "right" }, children: formatCompactUsd(price.totalUsd) }),
            details.map(({ label, icon: Icon, value, usd }) => /* @__PURE__ */ jsxs36("span", { style: { display: "contents" }, children: [
              /* @__PURE__ */ jsx44(Icon, { size: 14, "aria-label": label }),
              /* @__PURE__ */ jsx44("span", { "aria-label": `${label}: ${value.toLocaleString("en-US")} tokens`, title: `${label}: ${value.toLocaleString("en-US")}`, children: formatCompactTokenCount(value) }),
              /* @__PURE__ */ jsx44("span", { "aria-label": `${label} cost`, title: label === "Reasoning" ? "Included in output charges; not an additional fee" : void 0, style: { textAlign: "right" }, children: usd == null ? "\u2014" : formatCompactUsd(usd) })
            ] }, label))
          ] })
        }
      )
    ] }) : usage ? /* @__PURE__ */ jsx44("span", { className: "thread-turn-usage-unavailable", title: priceTitle, children: "Price unavailable" }) : null
  ] });
}

// src/components/timeline/turnStatus.tsx
import { jsx as jsx45, jsxs as jsxs37 } from "react/jsx-runtime";
function RunningDots2({
  tone = "amber"
}) {
  const dotClassName = tone === "emerald" ? "bg-sky-200/90" : tone === "sky" ? "bg-sky-300/90" : "bg-amber-200/90";
  return /* @__PURE__ */ jsx45("span", { className: "ml-1.5 inline-flex items-center gap-1", "aria-hidden": "true", children: [0, 1, 2].map((index) => /* @__PURE__ */ jsx45(
    "span",
    {
      className: `h-1.5 w-1.5 rounded-full animate-pulse ${dotClassName}`,
      style: { animationDelay: `${index * 180}ms` }
    },
    index
  )) });
}
function normalizePlanStepStatus(status) {
  const normalized = status.trim().toLowerCase();
  if (normalized === "completed" || normalized === "done" || normalized === "complete") {
    return "completed";
  }
  if (normalized === "in_progress" || normalized === "in progress" || normalized === "inprogress" || normalized === "running" || normalized === "active") {
    return "in_progress";
  }
  if (normalized === "pending" || normalized === "todo" || normalized === "not_started" || normalized === "not started" || normalized === "queued") {
    return "pending";
  }
  if (normalized === "failed" || normalized === "error") {
    return "failed";
  }
  return "other";
}
function isLivePlanExecutionEvidence(item) {
  switch (item.kind) {
    case "fileChange":
    case "webSearch":
    case "image":
    case "contextCompaction":
      return true;
    case "commandExecution":
    case "toolCall":
      return !isRunningHistoryStatus(item.status);
    default:
      return false;
  }
}
function deriveDisplayedLivePlan(livePlan, items, turnStatus) {
  if (!livePlan || !isActiveTurnStatus(turnStatus)) {
    return livePlan;
  }
  const firstInProgressIndex = livePlan.plan.findIndex(
    (step) => normalizePlanStepStatus(step.status) === "in_progress"
  );
  if (firstInProgressIndex < 0) {
    return livePlan;
  }
  const nextPendingIndex = livePlan.plan.findIndex(
    (step, index) => index > firstInProgressIndex && normalizePlanStepStatus(step.status) === "pending"
  );
  if (nextPendingIndex < 0) {
    return livePlan;
  }
  const hasExecutionEvidence = items.some(
    (item) => isLivePlanExecutionEvidence(item)
  );
  if (!hasExecutionEvidence) {
    return livePlan;
  }
  const nextPlan = livePlan.plan.map((step, index) => {
    if (index === firstInProgressIndex) {
      return { ...step, status: "completed" };
    }
    if (index === nextPendingIndex) {
      return { ...step, status: "in_progress" };
    }
    return step;
  });
  return {
    ...livePlan,
    plan: nextPlan
  };
}
function useSecondClock(enabled) {
  const [now, setNow] = useState25(() => Date.now());
  useEffect18(() => {
    if (!enabled) {
      return;
    }
    setNow(Date.now());
    const interval = window.setInterval(() => setNow(Date.now()), 1e3);
    return () => window.clearInterval(interval);
  }, [enabled]);
  return now;
}
function formatElapsedDuration(startedAt, now) {
  const startedAtMillis = Date.parse(startedAt ?? "");
  if (!Number.isFinite(startedAtMillis)) {
    return null;
  }
  const totalSeconds = Math.max(0, Math.floor((now - startedAtMillis) / 1e3));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds % 3600 / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) {
    return `${hours}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`;
  }
  if (minutes > 0) {
    return `${minutes}m ${String(seconds).padStart(2, "0")}s`;
  }
  return `${seconds}s`;
}
function TurnStatusIndicator({
  status
}) {
  const label = turnStatusLabel(status);
  if (status === "completed") {
    return /* @__PURE__ */ jsx45(
      "span",
      {
        "aria-label": label,
        title: label,
        className: "timeline-status-icon timeline-status-icon-success inline-flex h-4 w-4 items-center justify-center",
        children: /* @__PURE__ */ jsx45(
          "svg",
          {
            "aria-hidden": "true",
            viewBox: "0 0 16 16",
            className: "h-3.5 w-3.5 fill-none stroke-current",
            strokeWidth: "1.8",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: /* @__PURE__ */ jsx45("path", { d: "m3.75 8.25 2.5 2.5 6-6" })
          }
        )
      }
    );
  }
  if (status === "failed") {
    return /* @__PURE__ */ jsx45(
      "span",
      {
        "aria-label": label,
        title: label,
        className: "timeline-status-icon timeline-status-icon-failed inline-flex h-4 w-4 items-center justify-center",
        children: /* @__PURE__ */ jsx45(
          "svg",
          {
            "aria-hidden": "true",
            viewBox: "0 0 16 16",
            className: "h-3.5 w-3.5 fill-none stroke-current",
            strokeWidth: "1.7",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: /* @__PURE__ */ jsx45("path", { d: "m5 5 6 6M11 5l-6 6" })
          }
        )
      }
    );
  }
  if (status === "interrupted") {
    return /* @__PURE__ */ jsx45(
      "span",
      {
        "aria-label": label,
        title: label,
        className: "timeline-status-icon timeline-status-icon-warning inline-flex h-4 w-4 items-center justify-center",
        children: /* @__PURE__ */ jsx45(
          "svg",
          {
            "aria-hidden": "true",
            viewBox: "0 0 16 16",
            className: "h-3.5 w-3.5 fill-none stroke-current",
            strokeWidth: "1.7",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            children: /* @__PURE__ */ jsx45("path", { d: "M6 4.5v7M10 4.5v7" })
          }
        )
      }
    );
  }
  return /* @__PURE__ */ jsx45(
    "span",
    {
      "aria-label": label,
      title: label,
      className: "inline-flex min-w-[1.25rem] items-center justify-center text-sky-200",
      children: /* @__PURE__ */ jsx45(RunningDots2, { tone: "emerald" })
    }
  );
}
function TurnStatusBar({
  turn,
  variant = "header",
  lastActivityAt = null
}) {
  const label = turnStatusLabel(turn.status);
  const runtimeSummary = formatTurnRuntimeSummary(turn);
  const active = isActiveTurnStatus(turn.status);
  const now = useSecondClock(active && variant === "footer");
  const elapsedLabel2 = active ? formatElapsedDuration(turn.startedAt, now) : null;
  const effectiveLastActivityAt = lastActivityAt ?? turn.startedAt;
  const toneClassName = turn.status === "failed" ? "border-rose-300/20 bg-rose-300/[0.06] text-rose-100" : active ? "border-sky-300/22 bg-sky-300/[0.08] text-sky-100" : "border-stone-700/90 bg-stone-900/70 text-stone-200";
  if (variant === "footer") {
    return /* @__PURE__ */ jsxs37("div", { className: "thread-graph-turn-footer flex w-full items-center justify-between gap-3 text-xs", children: [
      /* @__PURE__ */ jsxs37("div", { className: "thread-graph-turn-footer-runtime flex min-w-0 items-center gap-2", children: [
        /* @__PURE__ */ jsx45(TurnStatusIndicator, { status: turn.status }),
        /* @__PURE__ */ jsx45(TurnUsageInline, { turn })
      ] }),
      /* @__PURE__ */ jsxs37("div", { className: "thread-graph-turn-footer-meta timeline-meta-text flex min-w-0 shrink items-center justify-end gap-1 whitespace-nowrap", children: [
        effectiveLastActivityAt ? /* @__PURE__ */ jsx45(
          "time",
          {
            dateTime: effectiveLastActivityAt,
            title: `Last activity ${formatLongTimestamp(effectiveLastActivityAt)}`,
            children: formatShortTimestamp(effectiveLastActivityAt)
          }
        ) : null,
        elapsedLabel2 ? /* @__PURE__ */ jsxs37("span", { "aria-label": `Running for ${elapsedLabel2}`, children: [
          "\xB7 ",
          elapsedLabel2
        ] }) : null
      ] })
    ] });
  }
  const title = `${label} \xB7 ${runtimeSummary}`;
  return /* @__PURE__ */ jsxs37(
    "span",
    {
      className: `inline-flex min-w-0 items-center gap-1.5 rounded-full border px-2 py-1 text-[10px] sm:text-[11px] ${toneClassName}`,
      title,
      children: [
        /* @__PURE__ */ jsx45(TurnStatusIndicator, { status: turn.status }),
        /* @__PURE__ */ jsx45("span", { className: "timeline-meta-text min-w-0 truncate", children: runtimeSummary })
      ]
    }
  );
}

// src/components/timeline/TimelineTurnRows.tsx
import { Fragment as Fragment12, jsx as jsx46, jsxs as jsxs38 } from "react/jsx-runtime";
import { createElement } from "react";
function timestampForHistoryItem(item, fallback) {
  return item.createdAt ?? fallback;
}
var HistoryItemRow = memo5(function HistoryItemRow2({
  threadId,
  item,
  scrollRootRef,
  onOpenExpandedText,
  onOpenCommandDetail,
  onOpenToolCallDetail,
  onOpenDeferredHistoryItemDetail,
  onSelectArtifact,
  onBeforeMessageResize,
  adapter,
  timeLabel,
  timeTitle,
  timeMeta,
  autoOpenToolDetails = false
}) {
  if (isCompactChatItem(item.kind)) {
    return /* @__PURE__ */ jsx46(
      GraphChatCompactMessageItem,
      {
        threadId,
        item,
        scrollRootRef,
        timeLabel,
        timeTitle,
        ...onBeforeMessageResize ? { onBeforeMessageResize } : {},
        ...adapter ? { adapter } : {}
      }
    );
  }
  if (item.kind === "reasoning") {
    return /* @__PURE__ */ jsx46(
      GraphChatCompactMessageItem,
      {
        item: {
          ...item,
          kind: "agentMessage",
          status: item.status ?? null
        },
        scrollRootRef,
        timeLabel,
        timeTitle,
        ...onBeforeMessageResize ? { onBeforeMessageResize } : {}
      }
    );
  }
  if (item.kind === "artifact") {
    return /* @__PURE__ */ jsx46(
      GraphChatArtifactHistoryItem,
      {
        ...adapter?.onOpenWorkspaceFile ? { onOpenWorkspaceFile: adapter.onOpenWorkspaceFile } : {},
        item,
        timeMeta,
        ...onSelectArtifact ? {
          onSelect: (nextItem, artifact) => onSelectArtifact({ item: nextItem, artifact })
        } : {}
      }
    );
  }
  if (item.kind === "commandExecution") {
    return /* @__PURE__ */ jsx46(
      GraphChatCommandItem,
      {
        autoOpen: autoOpenToolDetails,
        item,
        onOpen: onOpenCommandDetail,
        timeMeta
      }
    );
  }
  if (item.kind === "toolCall") {
    return /* @__PURE__ */ jsx46(
      GraphChatToolCallItem,
      {
        autoOpen: autoOpenToolDetails,
        item,
        onOpen: onOpenToolCallDetail,
        timeMeta
      }
    );
  }
  if (item.kind === "agentToolCall") {
    return /* @__PURE__ */ jsx46(
      GraphChatAgentToolCallItem,
      {
        autoOpen: autoOpenToolDetails,
        item,
        onOpen: onOpenToolCallDetail,
        timeMeta
      }
    );
  }
  if (item.kind === "skillToolCall") {
    return /* @__PURE__ */ jsx46(
      GraphChatSkillToolCallItem,
      {
        autoOpen: autoOpenToolDetails,
        item,
        onOpen: onOpenToolCallDetail,
        timeMeta
      }
    );
  }
  if (item.kind === "webSearch") {
    const typedItem = item;
    const detailText = typedItem.detailText?.trim() || typedItem.text || "Web search";
    return /* @__PURE__ */ jsx46(
      GraphChatWebSearchItem,
      {
        autoOpen: autoOpenToolDetails,
        item: typedItem,
        timeMeta,
        onOpen: () => onOpenDeferredHistoryItemDetail(
          typedItem,
          "Web Search Details",
          detailText,
          "Loading full web search details...",
          "Unable to load full web search details."
        )
      }
    );
  }
  if (item.kind === "fileRead") {
    const typedItem = item;
    const detailText = typedItem.detailText?.trim() || typedItem.text || "File read";
    return /* @__PURE__ */ jsx46(
      GraphChatFileReadItem,
      {
        autoOpen: autoOpenToolDetails,
        item: typedItem,
        timeMeta,
        onOpen: () => onOpenDeferredHistoryItemDetail(
          typedItem,
          "File Read Details",
          detailText,
          "Loading full file read details...",
          "Unable to load full file read details."
        )
      }
    );
  }
  if (item.kind === "image") {
    return /* @__PURE__ */ jsx46(
      GraphChatImageItem,
      {
        threadId,
        item,
        onOpen: onOpenExpandedText,
        getImageAssetUrl: adapter?.getImageAssetUrl,
        timeMeta
      }
    );
  }
  if (item.kind === "plan") {
    return /* @__PURE__ */ jsx46(
      GraphChatPlanHistoryItem,
      {
        item,
        scrollRootRef,
        timeMeta,
        ...onBeforeMessageResize ? { onBeforeResize: onBeforeMessageResize } : {}
      }
    );
  }
  if (item.kind === "fileChange") {
    const typedItem = item;
    const detailText = typedItem.detailText?.trim() || typedItem.text || "File change";
    return /* @__PURE__ */ jsx46(
      GraphChatFileChangeItem,
      {
        item: typedItem,
        timeMeta,
        onOpen: () => onOpenDeferredHistoryItemDetail(
          typedItem,
          "File Change Details",
          detailText,
          "Loading full file change details...",
          "Unable to load full file change details."
        )
      }
    );
  }
  if (item.kind === "contextCompaction") {
    return /* @__PURE__ */ jsx46(
      GraphChatContextCompactionItem,
      {
        item,
        timeMeta
      }
    );
  }
  if (item.kind === "hook") {
    return /* @__PURE__ */ jsx46(
      GraphChatHookItem,
      {
        item,
        timeMeta
      }
    );
  }
  return /* @__PURE__ */ jsx46(GraphChatGenericHistoryItem, { item, timeMeta });
});
function isTerminalTurnStatus(status) {
  return status === "completed" || status === "failed" || status === "interrupted";
}
function itemCreatedAtMillis(item) {
  const millis = Date.parse(item.createdAt ?? "");
  return Number.isFinite(millis) ? millis : null;
}
function latestItemTimestamp(items) {
  let latest = null;
  for (const item of items) {
    const millis = itemCreatedAtMillis(item);
    if (millis === null) {
      continue;
    }
    latest = latest === null ? millis : Math.max(latest, millis);
  }
  return latest;
}
function latestActivityTimestamp(startedAt, items, liveActivityAt) {
  const candidates = [
    Date.parse(startedAt ?? ""),
    latestItemTimestamp(items) ?? Number.NaN,
    Date.parse(liveActivityAt ?? "")
  ].filter(Number.isFinite);
  return candidates.length > 0 ? new Date(Math.max(...candidates)).toISOString() : null;
}
function formatWorkedDuration(startedAt, completedAt, items) {
  const startMillis = Date.parse(startedAt ?? "");
  const completedMillis = Date.parse(completedAt ?? "");
  const endMillis = Number.isFinite(completedMillis) ? completedMillis : latestItemTimestamp(items);
  if (!Number.isFinite(startMillis) || endMillis === null || endMillis < startMillis) {
    return "Worked";
  }
  const totalSeconds = Math.max(
    1,
    Math.round((endMillis - startMillis) / 1e3)
  );
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds % 3600 / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) {
    return `Worked for ${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `Worked for ${minutes}m ${seconds}s`;
  }
  return `Worked for ${seconds}s`;
}
function formatRelativeTurnTime(startedAt, timestamp) {
  const startMillis = Date.parse(startedAt ?? "");
  const itemMillis = Date.parse(timestamp ?? "");
  if (!Number.isFinite(startMillis) || !Number.isFinite(itemMillis)) {
    return timestamp ? formatShortTimestamp(timestamp) : "Time unavailable";
  }
  const totalSeconds = Math.max(
    0,
    Math.round((itemMillis - startMillis) / 1e3)
  );
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds % 3600 / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
}
function TimelineTimeToggle({
  absoluteLabel,
  className = "",
  timestamp,
  endTimestamp,
  turnStartedAt
}) {
  const [showAbsolute, setShowAbsolute] = useState26(false);
  if (!timestamp) {
    return null;
  }
  const absoluteTitle = formatLongTimestamp(timestamp);
  const relativeLabel = formatRelativeTurnTime(turnStartedAt, timestamp);
  const hasRange = endTimestamp && endTimestamp !== timestamp;
  const label = showAbsolute ? absoluteLabel + (hasRange ? ` \u2013 ${formatShortTimestamp(endTimestamp)}` : "") : relativeLabel + (hasRange ? ` \u2013 ${formatRelativeTurnTime(turnStartedAt, endTimestamp)}` : "");
  return /* @__PURE__ */ jsx46(
    "span",
    {
      role: "button",
      tabIndex: 0,
      className: `thread-graph-relative-time rounded-full px-1.5 py-0.5 ${className}`,
      title: showAbsolute ? relativeLabel : absoluteTitle,
      "aria-label": `Toggle timestamp, currently ${label}`,
      onClick: (event) => {
        event.stopPropagation();
        setShowAbsolute((value) => !value);
      },
      onKeyDown: (event) => {
        if (event.key !== "Enter" && event.key !== " ") {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        setShowAbsolute((value) => !value);
      },
      children: /* @__PURE__ */ jsx46("time", { dateTime: timestamp, children: label })
    }
  );
}
function firstHistoryEntryTimestamp(entry) {
  if (entry.kind === "item") {
    return entry.item.createdAt ?? null;
  }
  if (entry.kind === "agentActivityGroup") {
    return entry.entries[0] ? firstHistoryEntryTimestamp(entry.entries[0]) : null;
  }
  return entry.items.find((item) => item.createdAt)?.createdAt ?? null;
}
function lastHistoryEntryTimestamp(entry) {
  if (entry.kind === "item") return entry.item.updatedAt ?? entry.item.createdAt ?? null;
  if (entry.kind === "agentActivityGroup") {
    const timestamps = entry.entries.map(lastHistoryEntryTimestamp).filter((value) => Boolean(value));
    return timestamps.sort((a, b) => Date.parse(a) - Date.parse(b)).at(-1) ?? null;
  }
  return entry.items.map((item) => item.updatedAt ?? item.createdAt).filter((value) => Boolean(value)).sort((a, b) => Date.parse(a) - Date.parse(b)).at(-1) ?? null;
}
function collapsedSummaryMessages(entries, active) {
  const itemEntries = entries.filter(
    (entry) => entry.kind === "item"
  );
  const users = itemEntries.map((entry) => entry.item).filter(
    (item) => item.kind === "userMessage"
  );
  const last = entries.at(-1);
  const latestAgent = itemEntries.map((entry) => entry.item).reverse().find(
    (item) => item.kind === "agentMessage" && item.text.trim().length > 0
  );
  const finalAgent = active && !(last?.kind === "item" && last.item.kind === "agentMessage") ? void 0 : latestAgent;
  const hiddenEntries = entries.filter((entry) => {
    if (entry.kind !== "item") {
      return true;
    }
    return entry.item.kind !== "userMessage" && entry.item.id !== finalAgent?.id;
  });
  return {
    users,
    latestAgent,
    finalAgent,
    hiddenEntries
  };
}
var ThreadTurnRow = memo5(function ThreadTurnRow2({
  threadId,
  adapter,
  turn,
  absoluteIndex,
  isCollapsed,
  livePlan,
  liveItems,
  liveActivityAt = null,
  liveOutput,
  forceActive = false,
  onToggleCollapse,
  deferredItemsLoading = false,
  deferredItemsError,
  onOpenExpandedText,
  onOpenCommandDetail,
  onOpenToolCallDetail,
  onOpenDeferredHistoryItemDetail,
  onSelectArtifact,
  onBeforeMessageResize,
  scrollRootRef,
  articleRef,
  isLatestVisibleTurn = false
}) {
  const hasLiveActivity = Boolean(livePlan) || Boolean(liveOutput) || Boolean(liveItems && liveItems.length > 0);
  const activeForRendering = forceActive || isActiveTurnStatus(turn.status) || hasLiveActivity || isLatestVisibleTurn;
  const activeFooterTurn = activeForRendering && !isActiveTurnStatus(turn.status) ? {
    ...turn,
    status: "inProgress"
  } : turn;
  const mergedItems = useMemo7(
    () => mergeLiveTurnItems(turn.items, liveItems),
    [liveItems, turn.items]
  );
  const lastActivityAt = useMemo7(
    () => latestActivityTimestamp(turn.startedAt, mergedItems, liveActivityAt),
    [liveActivityAt, mergedItems, turn.startedAt]
  );
  const displayedLivePlan = useMemo7(
    () => deriveDisplayedLivePlan(livePlan, mergedItems, turn.status),
    [livePlan, mergedItems, turn.status]
  );
  const visibleLiveOutput = useMemo7(
    () => getLiveOutputTailForTurn(liveOutput, mergedItems),
    [liveOutput, mergedItems]
  );
  const preparedItems = useMemo7(
    () => prepareTurnItemsForRendering(mergedItems, activeForRendering),
    [activeForRendering, mergedItems]
  );
  const groupedItems = useMemo7(
    // Published results belong below the reply, outside the work disclosure.
    // Separate them before grouping so a tool/activity group cannot hide them.
    () => groupTimelineHistoryItems(preparedItems.filter((item) => item.kind !== "artifact")),
    [preparedItems]
  );
  const outputItems = preparedItems.filter(
    (item) => item.kind === "artifact"
  );
  const autoOpenLatestToolDetails = forceActive || isActiveTurnStatus(turn.status) || hasLiveActivity;
  const turnTimeLabel = formatShortTimestamp(turn.startedAt);
  const turnTimeTitle = formatLongTimestamp(turn.startedAt);
  const visibleLiveHookPrompt = useMemo7(
    () => parseHookPromptText(visibleLiveOutput),
    [visibleLiveOutput]
  );
  const [expandedGroups, setExpandedGroups] = useState26(
    {}
  );
  const toggleGroupedItem = useCallback11((groupKey) => {
    setExpandedGroups((current) => ({
      ...current,
      [groupKey]: !current[groupKey]
    }));
  }, []);
  const renderHistoryEntries = (entries) => /* @__PURE__ */ jsx46(
    TimelineHistoryEntries,
    {
      entries,
      expandedGroups,
      onToggleGroupedItem: toggleGroupedItem,
      threadId,
      scrollRootRef,
      onOpenExpandedText,
      onOpenCommandDetail,
      onOpenToolCallDetail,
      onOpenDeferredHistoryItemDetail,
      ...onBeforeMessageResize ? { onBeforeMessageResize } : {},
      fallbackTimestamp: turn.startedAt,
      fallbackTimeLabel: turnTimeLabel,
      fallbackTimeTitle: turnTimeTitle,
      turnStartedAt: turn.startedAt,
      autoOpenLatestToolDetails: autoOpenLatestToolDetails && entries.at(-1)?.key === groupedItems.at(-1)?.key,
      ...onSelectArtifact ? { onSelectArtifact } : {},
      ...adapter ? { adapter } : {}
    }
  );
  const historyNode = renderHistoryEntries(groupedItems);
  const liveHookPromptNode = visibleLiveHookPrompt ? /* @__PURE__ */ jsx46(
    HistoryItemRow,
    {
      threadId,
      item: visibleLiveHookPrompt,
      scrollRootRef,
      onOpenExpandedText,
      onOpenCommandDetail,
      onOpenToolCallDetail,
      onOpenDeferredHistoryItemDetail,
      timeLabel: turn.startedAt ? formatPreciseMessageTimestamp(turn.startedAt) : turnTimeLabel,
      timeTitle: turnTimeTitle,
      timeMeta: null,
      ...onSelectArtifact ? { onSelectArtifact } : {},
      ...adapter ? { adapter } : {}
    }
  ) : null;
  const liveOutputNode = !visibleLiveHookPrompt && visibleLiveOutput ? /* @__PURE__ */ jsx46(
    GraphChatCompactMessageItem,
    {
      item: {
        id: "live-agent-message",
        kind: "agentMessage",
        text: visibleLiveOutput
      },
      scrollRootRef,
      timeLabel: turn.startedAt ? formatPreciseMessageTimestamp(turn.startedAt) : turnTimeLabel,
      timeTitle: turnTimeTitle,
      streaming: true,
      ...adapter ? { adapter } : {},
      ...onBeforeMessageResize ? { onBeforeMessageResize } : {}
    }
  ) : null;
  const footerNode = activeForRendering ? /* @__PURE__ */ jsx46(
    TurnStatusBar,
    {
      turn: activeFooterTurn,
      variant: "footer",
      lastActivityAt
    }
  ) : null;
  const collapsedSummary = useMemo7(
    () => collapsedSummaryMessages(groupedItems, activeForRendering),
    [groupedItems, activeForRendering]
  );
  const workedLabel = useMemo7(
    () => turn.status === "recovering" ? "Confirming status" : activeForRendering ? "Working" : formatWorkedDuration(turn.startedAt, turn.completedAt, mergedItems),
    [activeForRendering, mergedItems, turn.completedAt, turn.startedAt, turn.status]
  );
  const interruptedLabel = turn.status === "interrupted" ? /* @__PURE__ */ jsx46("span", { className: "thread-graph-worked-interrupted shrink-0 text-[11px]", children: "Interrupted" }) : null;
  const hasCollapsedHiddenItems = collapsedSummary.hiddenEntries.length > 0 || Boolean(turn.hasDeferredItems);
  const effectiveCollapsed = isCollapsed && hasCollapsedHiddenItems;
  const visibleSummaryAgent = effectiveCollapsed ? collapsedSummary.latestAgent : collapsedSummary.finalAgent;
  const canToggleWorkedSummary = hasCollapsedHiddenItems;
  const terminalWorkedNode = isTerminalTurnStatus(turn.status) && !hasCollapsedHiddenItems ? /* @__PURE__ */ jsxs38("div", { className: "thread-graph-worked-summary flex w-full items-center gap-2 py-2 text-sm", children: [
    /* @__PURE__ */ jsx46("span", { className: "thread-graph-worked-label shrink-0", children: workedLabel }),
    interruptedLabel,
    /* @__PURE__ */ jsx46(TurnUsageInline, { turn }),
    /* @__PURE__ */ jsx46(
      "span",
      {
        className: "thread-graph-worked-rule h-px min-w-0 flex-1",
        "aria-hidden": "true"
      }
    )
  ] }) : null;
  const collapsedSummaryNode = hasCollapsedHiddenItems ? /* @__PURE__ */ jsxs38("div", { className: "thread-graph-turn-collapsed-summary space-y-2", children: [
    collapsedSummary.users.map((item) => /* @__PURE__ */ jsx46(
      GraphChatCompactMessageItem,
      {
        threadId,
        item,
        scrollRootRef,
        timeLabel: item.createdAt ? formatMessageTimestamp(item.createdAt) : formatMessageTimestamp(turn.startedAt),
        timeTitle: item.createdAt ? formatLongTimestamp(item.createdAt) : turnTimeTitle,
        ...onBeforeMessageResize ? { onBeforeMessageResize } : {},
        ...adapter ? { adapter } : {}
      },
      item.id
    )),
    /* @__PURE__ */ jsxs38("div", { className: "thread-graph-worked-summary flex w-full items-center gap-2 py-2 text-sm", children: [
      /* @__PURE__ */ jsxs38(
        "button",
        {
          type: "button",
          className: "group flex shrink-0 items-center gap-2 text-left transition",
          onClick: () => onToggleCollapse(turn, effectiveCollapsed),
          disabled: deferredItemsLoading,
          "aria-label": `${workedLabel}. ${effectiveCollapsed ? "Expand" : "Collapse"} turn ${absoluteIndex}`,
          "aria-expanded": !effectiveCollapsed,
          children: [
            /* @__PURE__ */ jsx46("span", { className: "thread-graph-worked-label shrink-0", children: deferredItemsLoading ? "Loading complete history..." : deferredItemsError ? "History unavailable, retry" : workedLabel }),
            interruptedLabel,
            /* @__PURE__ */ jsx46(ChevronRight4, { className: `h-4 w-4 shrink-0 transition ${effectiveCollapsed ? "" : "rotate-90"}` })
          ]
        }
      ),
      /* @__PURE__ */ jsx46(TurnUsageInline, { turn }),
      /* @__PURE__ */ jsx46(
        "span",
        {
          className: "thread-graph-worked-rule h-px min-w-0 flex-1",
          "aria-hidden": "true"
        }
      )
    ] }),
    !effectiveCollapsed ? renderHistoryEntries(collapsedSummary.hiddenEntries) : null,
    visibleSummaryAgent ? /* @__PURE__ */ jsx46(
      GraphChatCompactMessageItem,
      {
        threadId,
        item: visibleSummaryAgent,
        scrollRootRef,
        timeLabel: visibleSummaryAgent.createdAt ? formatPreciseMessageTimestamp(
          visibleSummaryAgent.createdAt
        ) : formatPreciseMessageTimestamp(turn.startedAt),
        timeTitle: visibleSummaryAgent.createdAt ? formatLongTimestamp(visibleSummaryAgent.createdAt) : turnTimeTitle,
        ...onBeforeMessageResize ? { onBeforeMessageResize } : {},
        ...adapter ? { adapter } : {}
      }
    ) : null,
    activeForRendering ? /* @__PURE__ */ jsx46(
      GraphChatTurnBody,
      {
        footer: footerNode,
        history: null,
        liveHookPrompt: liveHookPromptNode,
        liveOutput: liveOutputNode,
        livePlan: displayedLivePlan
      }
    ) : null
  ] }) : null;
  const turnBody = /* @__PURE__ */ jsx46(
    GraphChatTurnBody,
    {
      footer: footerNode,
      history: /* @__PURE__ */ jsxs38(Fragment12, { children: [
        historyNode,
        terminalWorkedNode
      ] }),
      liveHookPrompt: liveHookPromptNode,
      liveOutput: liveOutputNode,
      livePlan: displayedLivePlan
    }
  );
  const visibleBody = /* @__PURE__ */ jsxs38(Fragment12, { children: [
    canToggleWorkedSummary ? collapsedSummaryNode : turnBody,
    outputItems.length > 0 ? /* @__PURE__ */ jsx46("div", { className: "thread-graph-turn-outputs mt-3 space-y-3", role: "group", "aria-label": "Agent artifacts", children: outputItems.map((item) => /* @__PURE__ */ createElement(
      GraphChatArtifactHistoryItem,
      {
        ...adapter?.onOpenWorkspaceFile ? { onOpenWorkspaceFile: adapter.onOpenWorkspaceFile } : {},
        key: item.id,
        item,
        presentation: "output",
        ...onSelectArtifact ? { onSelect: (selectedItem, artifact) => onSelectArtifact({ item: selectedItem, artifact }) } : {}
      }
    )) }) : null
  ] });
  return /* @__PURE__ */ jsx46(MessageExpansionScope, { children: /* @__PURE__ */ jsx46(
    GraphChatTurnFrame,
    {
      absoluteIndex,
      body: visibleBody,
      collapsed: effectiveCollapsed,
      collapsedBody: visibleBody,
      error: turn.error,
      headerStatus: /* @__PURE__ */ jsx46(TurnStatusBar, { turn }),
      isActive: activeForRendering,
      refCallback: articleRef,
      startedAt: turn.startedAt,
      timeLabel: turnTimeLabel,
      timeTitle: turnTimeTitle,
      tokenSummary: /* @__PURE__ */ jsx46(TurnTokenSummary, { turn })
    }
  ) }, `${threadId ?? ""}:${turn.id}`);
});
function TimelineHistoryEntries({
  entries,
  expandedGroups,
  onToggleGroupedItem,
  threadId,
  scrollRootRef,
  onOpenExpandedText,
  onOpenCommandDetail,
  onOpenToolCallDetail,
  onOpenDeferredHistoryItemDetail,
  onSelectArtifact,
  onBeforeMessageResize,
  adapter,
  fallbackTimestamp,
  fallbackTimeLabel,
  fallbackTimeTitle,
  turnStartedAt,
  autoOpenLatestToolDetails = false
}) {
  const latestEntryKey = entries.at(-1)?.key ?? null;
  const relativeTimeMeta = useCallback11(
    (timestamp, endTimestamp) => timestamp ? /* @__PURE__ */ jsx46(
      TimelineTimeToggle,
      {
        absoluteLabel: formatShortTimestamp(timestamp),
        timestamp,
        endTimestamp,
        turnStartedAt: turnStartedAt ?? fallbackTimestamp
      }
    ) : null,
    [fallbackTimestamp, turnStartedAt]
  );
  return /* @__PURE__ */ jsx46(
    GraphChatHistoryEntries,
    {
      entries,
      expandedGroups,
      onToggleGroupedItem,
      renderCommandGroup: (entry, expanded, onToggleExpanded) => /* @__PURE__ */ jsx46(
        GraphChatCommandGroupItem,
        {
          items: entry.items,
          expanded,
          onToggleExpanded,
          onOpen: onOpenCommandDetail,
          timeMeta: relativeTimeMeta(firstHistoryEntryTimestamp(entry), lastHistoryEntryTimestamp(entry))
        },
        entry.key
      ),
      renderFileChangeGroup: (entry, expanded, onToggleExpanded) => /* @__PURE__ */ jsx46(
        GraphChatFileChangeGroupItem,
        {
          items: entry.items,
          expanded,
          onToggleExpanded,
          onOpen: onOpenExpandedText,
          timeMeta: relativeTimeMeta(firstHistoryEntryTimestamp(entry), lastHistoryEntryTimestamp(entry))
        },
        entry.key
      ),
      renderSearchGroup: (entry, expanded, onToggleExpanded) => /* @__PURE__ */ jsx46(
        GraphChatSearchGroupItem,
        {
          items: entry.items,
          expanded,
          onToggleExpanded,
          onOpen: onOpenExpandedText,
          timeMeta: relativeTimeMeta(firstHistoryEntryTimestamp(entry), lastHistoryEntryTimestamp(entry))
        },
        entry.key
      ),
      renderFileReadGroup: (entry, expanded, onToggleExpanded) => /* @__PURE__ */ jsx46(
        GraphChatFileReadGroupItem,
        {
          items: entry.items,
          expanded,
          onToggleExpanded,
          onOpen: onOpenExpandedText,
          timeMeta: relativeTimeMeta(firstHistoryEntryTimestamp(entry), lastHistoryEntryTimestamp(entry))
        },
        entry.key
      ),
      renderToolCallGroup: (entry, expanded, onToggleExpanded) => /* @__PURE__ */ jsx46(
        GraphChatToolCallGroupItem,
        {
          items: entry.items,
          expanded,
          onToggleExpanded,
          onOpen: onOpenToolCallDetail,
          timeMeta: relativeTimeMeta(firstHistoryEntryTimestamp(entry), lastHistoryEntryTimestamp(entry))
        },
        entry.key
      ),
      renderAgentActivityGroup: (entry, expanded, onToggleExpanded) => /* @__PURE__ */ jsx46(
        GraphChatAgentActivityGroupItem,
        {
          itemCount: entry.itemCount,
          running: autoOpenLatestToolDetails && entry.key === latestEntryKey,
          expanded,
          onToggleExpanded,
          timeMeta: relativeTimeMeta(
            firstHistoryEntryTimestamp(entry),
            lastHistoryEntryTimestamp(entry)
          ),
          children: /* @__PURE__ */ jsx46(
            TimelineHistoryEntries,
            {
              entries: entry.entries,
              expandedGroups,
              onToggleGroupedItem,
              threadId,
              scrollRootRef,
              onOpenExpandedText,
              onOpenCommandDetail,
              onOpenToolCallDetail,
              onOpenDeferredHistoryItemDetail,
              ...onBeforeMessageResize ? { onBeforeMessageResize } : {},
              fallbackTimestamp,
              fallbackTimeLabel,
              fallbackTimeTitle,
              turnStartedAt,
              autoOpenLatestToolDetails: false,
              ...onSelectArtifact ? { onSelectArtifact } : {},
              ...adapter ? { adapter } : {}
            }
          )
        },
        entry.key
      ),
      renderItem: (entry) => {
        const timestamp = timestampForHistoryItem(
          entry.item,
          fallbackTimestamp ?? null
        );
        const isUserMessage = entry.item.kind === "userMessage";
        const isAgentMessage = entry.item.kind === "agentMessage" || entry.item.kind === "reasoning";
        const timeLabel = isUserMessage ? formatMessageTimestamp(timestamp) : isAgentMessage ? formatPreciseMessageTimestamp(timestamp) : fallbackTimeLabel;
        return /* @__PURE__ */ jsx46(
          HistoryItemRow,
          {
            threadId,
            item: entry.item,
            scrollRootRef,
            timeLabel,
            timeTitle: entry.item.createdAt ? formatLongTimestamp(timestamp) : fallbackTimeTitle,
            timeMeta: relativeTimeMeta(timestamp),
            autoOpenToolDetails: autoOpenLatestToolDetails && entry.key === latestEntryKey,
            onOpenExpandedText,
            onOpenCommandDetail,
            onOpenToolCallDetail,
            onOpenDeferredHistoryItemDetail,
            ...onBeforeMessageResize ? { onBeforeMessageResize } : {},
            ...onSelectArtifact ? { onSelectArtifact } : {},
            ...adapter ? { adapter } : {}
          },
          entry.key
        );
      }
    }
  );
}

// src/components/timeline/timelineScroll.ts
var INITIAL_VISIBLE_TURNS = 3;
var LOAD_STEP = 3;
var FOLLOW_TAIL_THRESHOLD_PX = 80;
function isNearBottom(container, threshold = FOLLOW_TAIL_THRESHOLD_PX) {
  const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
  return distanceFromBottom <= threshold;
}
function isElementVisible(container, element) {
  const containerRect = container.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();
  const visibleTop = Math.max(containerRect.top, elementRect.top);
  const visibleBottom = Math.min(containerRect.bottom, elementRect.bottom);
  const visibleHeight = Math.max(0, visibleBottom - visibleTop);
  return visibleHeight > 0;
}
function inferTurnStartedAtFromItems(items) {
  const createdAt = items.map((item) => {
    const value = item.createdAt;
    return typeof value === "string" && value.trim() ? value : null;
  }).filter((value) => Boolean(value)).sort();
  return createdAt[0] ?? null;
}
function buildSyntheticLiveTurn(turnId, items) {
  return {
    id: turnId,
    startedAt: inferTurnStartedAtFromItems(items),
    status: "inProgress",
    error: null,
    model: null,
    reasoningEffort: null,
    reasoningEffortAvailable: null,
    tokenUsage: null,
    priceEstimate: null,
    items: []
  };
}

// src/components/timeline/useDeferredHistoryDetail.ts
import { useCallback as useCallback12, useRef as useRef15, useState as useState27 } from "react";
function inlineDetail(item, title, text) {
  return {
    id: item.id,
    kind: item.kind,
    title,
    text
  };
}
function useDeferredHistoryDetail({
  loadHistoryItemDetail,
  onSelectHistoryItemDetail
}) {
  const requestIdRef = useRef15(0);
  const detailCacheRef = useRef15(
    /* @__PURE__ */ new Map()
  );
  const [expandedText, setExpandedText] = useState27(
    null
  );
  const openExpandedText = useCallback12((title, text) => {
    setExpandedText({ title, text });
  }, []);
  const resolveDetail = useCallback12(
    (item, detail, useSelectionCallback) => {
      if (useSelectionCallback && onSelectHistoryItemDetail) {
        onSelectHistoryItemDetail({ item, detail });
        return;
      }
      setExpandedText({ title: detail.title, text: detail.text });
    },
    [onSelectHistoryItemDetail]
  );
  const openDeferredDetail = useCallback12(
    async ({
      item,
      fallbackTitle,
      fallbackText,
      loadingText,
      errorText,
      useSelectionCallback
    }) => {
      if (!item.hasDeferredDetail || !loadHistoryItemDetail) {
        resolveDetail(
          item,
          inlineDetail(item, fallbackTitle, fallbackText),
          useSelectionCallback
        );
        return;
      }
      const cached = detailCacheRef.current.get(item.id);
      if (cached) {
        resolveDetail(item, cached, useSelectionCallback);
        return;
      }
      const requestId = requestIdRef.current + 1;
      requestIdRef.current = requestId;
      if (!(useSelectionCallback && onSelectHistoryItemDetail)) {
        setExpandedText({ title: fallbackTitle, text: loadingText });
      }
      try {
        const detail = await loadHistoryItemDetail(item.id);
        detailCacheRef.current.set(item.id, detail);
        if (requestIdRef.current !== requestId) {
          return;
        }
        resolveDetail(item, detail, useSelectionCallback);
      } catch (caught) {
        if (requestIdRef.current !== requestId) {
          return;
        }
        resolveDetail(
          item,
          inlineDetail(
            item,
            fallbackTitle,
            caught instanceof Error ? caught.message : errorText
          ),
          useSelectionCallback
        );
      }
    },
    [
      loadHistoryItemDetail,
      onSelectHistoryItemDetail,
      resolveDetail
    ]
  );
  const openCommandDetail = useCallback12(
    async (item, fallbackTitle) => {
      await openDeferredDetail({
        item,
        fallbackTitle,
        fallbackText: item.detailText?.trim() || item.text || "Command output",
        loadingText: "Loading full command output...",
        errorText: "Unable to load full command output.",
        useSelectionCallback: true
      });
    },
    [openDeferredDetail]
  );
  const openToolCallDetail = useCallback12(
    async (item, fallbackTitle) => {
      await openDeferredDetail({
        item,
        fallbackTitle,
        fallbackText: item.detailText?.trim() || item.text || "Tool call",
        loadingText: "Loading full tool call details...",
        errorText: "Unable to load full tool call details.",
        useSelectionCallback: true
      });
    },
    [openDeferredDetail]
  );
  const openDeferredHistoryItemDetail = useCallback12(
    async (item, fallbackTitle, fallbackText, loadingText, errorText) => {
      await openDeferredDetail({
        item,
        fallbackTitle,
        fallbackText,
        loadingText,
        errorText,
        useSelectionCallback: false
      });
    },
    [openDeferredDetail]
  );
  const closeExpandedText = useCallback12(() => {
    requestIdRef.current += 1;
    setExpandedText(null);
  }, []);
  return {
    expandedText,
    openExpandedText,
    openCommandDetail,
    openToolCallDetail,
    openDeferredHistoryItemDetail,
    closeExpandedText
  };
}

// src/components/timeline/useTimelineScroll.ts
import {
  useCallback as useCallback13,
  useEffect as useEffect19,
  useLayoutEffect as useLayoutEffect7,
  useRef as useRef16,
  useState as useState28
} from "react";
function useChangeRevision(inputs) {
  const previousInputsRef = useRef16(null);
  const revisionRef = useRef16(0);
  const previousInputs = previousInputsRef.current;
  const changed = previousInputs === null || previousInputs.length !== inputs.length || inputs.some((input, index) => !Object.is(input, previousInputs[index]));
  if (changed) {
    revisionRef.current += 1;
    previousInputsRef.current = inputs;
  }
  return revisionRef.current;
}
function useTimelineScroll({
  threadId,
  turnsLength,
  totalTurnCount,
  loadingEarlier,
  onLoadEarlier,
  scrollRequestKey,
  bottomSpacer,
  onTailVisibilityChange,
  contentRevisionInputs
}) {
  const scrollContainerRef = useRef16(null);
  const scrollContentRef = useRef16(null);
  const lastHandledScrollRequestKeyRef = useRef16(scrollRequestKey);
  const previousContentRevisionRef = useRef16(null);
  const previousBottomSpacerRef = useRef16(bottomSpacer);
  const lastObservedScrollHeightRef = useRef16(0);
  const lastScrollTopRef = useRef16(0);
  const pendingPrependScrollRef = useRef16(null);
  const tailSentinelRef = useRef16(null);
  const topSentinelRef = useRef16(null);
  const isTailVisibleRef = useRef16(true);
  const shouldStickToBottomRef = useRef16(true);
  const userScrolledAwayFromTailRef = useRef16(false);
  const userScrolledHistoryRef = useRef16(false);
  const autoLoadedEarlierRef = useRef16(false);
  const topLoadArmedRef = useRef16(false);
  const lastTouchYRef = useRef16(null);
  const touchPullDistanceRef = useRef16(0);
  const [visibleCount, setVisibleCount] = useState28(INITIAL_VISIBLE_TURNS);
  const [loadMoreClicks, setLoadMoreClicks] = useState28(0);
  const [isTailVisible, setIsTailVisible] = useState28(true);
  const contentRevision = useChangeRevision(contentRevisionInputs);
  const serverManagedHistory = typeof onLoadEarlier === "function" || totalTurnCount !== void 0;
  const effectiveTotalTurnCount = totalTurnCount ?? turnsLength;
  const startIndex = serverManagedHistory ? 0 : Math.max(0, turnsLength - visibleCount);
  const loadedTurnAbsoluteOffset = serverManagedHistory ? Math.max(0, effectiveTotalTurnCount - turnsLength) : 0;
  const visibleTurnAbsoluteOffset = loadedTurnAbsoluteOffset + startIndex;
  const visibleTurnsLength = serverManagedHistory ? turnsLength : turnsLength - startIndex;
  const loadedHiddenCount = serverManagedHistory ? 0 : turnsLength - visibleTurnsLength;
  const unloadedHiddenCount = serverManagedHistory ? Math.max(0, effectiveTotalTurnCount - turnsLength) : 0;
  const hiddenCount = serverManagedHistory ? unloadedHiddenCount + loadedHiddenCount : loadedHiddenCount;
  const showLoadAll = !serverManagedHistory && hiddenCount > 0 && loadMoreClicks >= 2;
  const canLoadEarlierFromServer = serverManagedHistory && unloadedHiddenCount > 0 && loadedHiddenCount === 0 && typeof onLoadEarlier === "function";
  const rememberPrependScrollPosition = useCallback13(() => {
    const container = scrollContainerRef.current;
    if (!container) {
      pendingPrependScrollRef.current = null;
      return;
    }
    pendingPrependScrollRef.current = {
      scrollHeight: container.scrollHeight,
      scrollTop: container.scrollTop
    };
  }, []);
  const triggerServerLoadEarlier = useCallback13(() => {
    if (!canLoadEarlierFromServer || loadingEarlier || autoLoadedEarlierRef.current) {
      return false;
    }
    rememberPrependScrollPosition();
    autoLoadedEarlierRef.current = true;
    topLoadArmedRef.current = false;
    touchPullDistanceRef.current = 0;
    onLoadEarlier?.();
    return true;
  }, [
    canLoadEarlierFromServer,
    loadingEarlier,
    onLoadEarlier,
    rememberPrependScrollPosition
  ]);
  const recomputeTailVisibility = useCallback13(() => {
    const container = scrollContainerRef.current;
    const tailSentinel = tailSentinelRef.current;
    if (!container) {
      return;
    }
    const nextIsTailVisible = tailSentinel ? isElementVisible(container, tailSentinel) : isNearBottom(container);
    isTailVisibleRef.current = nextIsTailVisible;
    setIsTailVisible(
      (current) => current === nextIsTailVisible ? current : nextIsTailVisible
    );
  }, []);
  const handleScroll = useCallback13(() => {
    const container = scrollContainerRef.current;
    if (container) {
      userScrolledHistoryRef.current = true;
      const nextScrollTop = container.scrollTop;
      const previousScrollTop = lastScrollTopRef.current;
      const delta = nextScrollTop - previousScrollTop;
      lastScrollTopRef.current = nextScrollTop;
      if (isNearBottom(container, 1)) {
        userScrolledAwayFromTailRef.current = false;
        shouldStickToBottomRef.current = true;
      } else if (delta < -1) {
        userScrolledAwayFromTailRef.current = true;
        shouldStickToBottomRef.current = false;
      } else if (delta > 1) {
        shouldStickToBottomRef.current = !userScrolledAwayFromTailRef.current && isNearBottom(container, FOLLOW_TAIL_THRESHOLD_PX);
      }
      if (nextScrollTop <= 0 && userScrolledHistoryRef.current) {
        topLoadArmedRef.current = true;
      } else if (nextScrollTop > 0) {
        topLoadArmedRef.current = false;
        touchPullDistanceRef.current = 0;
      }
    }
    recomputeTailVisibility();
  }, [recomputeTailVisibility]);
  const scrollToBottom = useCallback13(() => {
    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }
    container.scrollTop = container.scrollHeight;
    lastScrollTopRef.current = container.scrollTop;
    lastObservedScrollHeightRef.current = container.scrollHeight;
    isTailVisibleRef.current = true;
    setIsTailVisible((current) => current ? current : true);
    userScrolledAwayFromTailRef.current = false;
    shouldStickToBottomRef.current = true;
  }, []);
  const preserveScrollPositionForResize = useCallback13(() => {
    const container = scrollContainerRef.current;
    if (!container) {
      return;
    }
    lastScrollTopRef.current = container.scrollTop;
    lastObservedScrollHeightRef.current = container.scrollHeight;
    shouldStickToBottomRef.current = false;
    userScrolledAwayFromTailRef.current = true;
  }, []);
  const handleLoadEarlierClick = useCallback13(() => {
    if (serverManagedHistory && loadedHiddenCount === 0) {
      triggerServerLoadEarlier();
      return;
    }
    setVisibleCount((current) => Math.min(turnsLength, current + LOAD_STEP));
    setLoadMoreClicks((current) => current + 1);
  }, [
    loadedHiddenCount,
    serverManagedHistory,
    triggerServerLoadEarlier,
    turnsLength
  ]);
  const handleWheel = useCallback13((event) => {
    const container = scrollContainerRef.current;
    if (!container || event.deltaY >= -8 || container.scrollTop > 0 || !canLoadEarlierFromServer) {
      return;
    }
    if (!topLoadArmedRef.current) {
      topLoadArmedRef.current = true;
      return;
    }
    triggerServerLoadEarlier();
  }, [canLoadEarlierFromServer, triggerServerLoadEarlier]);
  const handleTouchStart = useCallback13((event) => {
    lastTouchYRef.current = event.touches.item(0)?.clientY ?? null;
    touchPullDistanceRef.current = 0;
  }, []);
  const handleTouchMove = useCallback13((event) => {
    const container = scrollContainerRef.current;
    const nextY = event.touches.item(0)?.clientY ?? null;
    const previousY = lastTouchYRef.current;
    lastTouchYRef.current = nextY;
    if (!container || nextY === null || previousY === null || container.scrollTop > 0 || !canLoadEarlierFromServer) {
      touchPullDistanceRef.current = 0;
      return;
    }
    const deltaY = nextY - previousY;
    if (deltaY <= 0) {
      touchPullDistanceRef.current = 0;
      return;
    }
    if (!topLoadArmedRef.current) {
      topLoadArmedRef.current = true;
      touchPullDistanceRef.current = 0;
      return;
    }
    touchPullDistanceRef.current += deltaY;
    if (touchPullDistanceRef.current >= 28) {
      triggerServerLoadEarlier();
    }
  }, [canLoadEarlierFromServer, triggerServerLoadEarlier]);
  const handleTouchEnd = useCallback13(() => {
    lastTouchYRef.current = null;
    touchPullDistanceRef.current = 0;
  }, []);
  const handleLoadAllClick = useCallback13(() => {
    setVisibleCount(turnsLength);
  }, [turnsLength]);
  useLayoutEffect7(() => {
    const frame = window.requestAnimationFrame(() => {
      scrollToBottom();
    });
    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [threadId, scrollToBottom]);
  useEffect19(() => {
    autoLoadedEarlierRef.current = false;
    userScrolledHistoryRef.current = false;
    topLoadArmedRef.current = false;
    pendingPrependScrollRef.current = null;
  }, [threadId]);
  useEffect19(() => {
    if (!loadingEarlier) {
      autoLoadedEarlierRef.current = false;
    }
  }, [loadingEarlier, turnsLength]);
  useLayoutEffect7(() => {
    const anchor = pendingPrependScrollRef.current;
    const container = scrollContainerRef.current;
    if (!anchor || !container || loadingEarlier) {
      return;
    }
    pendingPrependScrollRef.current = null;
    const addedHeight = container.scrollHeight - anchor.scrollHeight;
    if (addedHeight <= 0) {
      lastObservedScrollHeightRef.current = container.scrollHeight;
      lastScrollTopRef.current = container.scrollTop;
      return;
    }
    const nextScrollTop = anchor.scrollTop + addedHeight;
    container.scrollTop = nextScrollTop;
    lastScrollTopRef.current = nextScrollTop;
    lastObservedScrollHeightRef.current = container.scrollHeight;
    userScrolledAwayFromTailRef.current = true;
    shouldStickToBottomRef.current = false;
    topLoadArmedRef.current = false;
  }, [loadingEarlier, turnsLength]);
  useEffect19(() => {
    setVisibleCount((current) => {
      if (current >= turnsLength - 1) {
        return turnsLength;
      }
      return Math.max(current, INITIAL_VISIBLE_TURNS);
    });
  }, [turnsLength]);
  useEffect19(() => {
    const container = scrollContainerRef.current;
    if (container) {
      lastObservedScrollHeightRef.current = container.scrollHeight;
      lastScrollTopRef.current = container.scrollTop;
      if (isNearBottom(container, 1)) {
        userScrolledAwayFromTailRef.current = false;
        shouldStickToBottomRef.current = true;
      } else if (userScrolledAwayFromTailRef.current || !isNearBottom(container, FOLLOW_TAIL_THRESHOLD_PX)) {
        shouldStickToBottomRef.current = false;
      }
    }
    recomputeTailVisibility();
  }, [contentRevision, recomputeTailVisibility, visibleCount]);
  useEffect19(() => {
    const shouldForceScroll = scrollRequestKey !== lastHandledScrollRequestKeyRef.current;
    const contentChanged = previousContentRevisionRef.current !== contentRevision;
    previousContentRevisionRef.current = contentRevision;
    const shouldAutoScroll = shouldForceScroll || contentChanged && shouldStickToBottomRef.current && !userScrolledAwayFromTailRef.current;
    if (!shouldAutoScroll) {
      return;
    }
    const frame = window.requestAnimationFrame(() => {
      scrollToBottom();
    });
    if (scrollRequestKey !== lastHandledScrollRequestKeyRef.current) {
      lastHandledScrollRequestKeyRef.current = scrollRequestKey;
    }
    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [contentRevision, isTailVisible, scrollToBottom, scrollRequestKey]);
  useEffect19(() => {
    const container = scrollContainerRef.current;
    const content = scrollContentRef.current;
    if (!container || !content || typeof ResizeObserver === "undefined") {
      return;
    }
    lastObservedScrollHeightRef.current = container.scrollHeight;
    const observer = new ResizeObserver(() => {
      const nextScrollHeight = container.scrollHeight;
      const previousScrollHeight = lastObservedScrollHeightRef.current;
      lastObservedScrollHeightRef.current = nextScrollHeight;
      if (nextScrollHeight <= previousScrollHeight) {
        return;
      }
      const wasAtBottomBeforeResize = previousScrollHeight > 0 && previousScrollHeight - container.scrollTop - container.clientHeight <= 1;
      if (userScrolledAwayFromTailRef.current || !(shouldStickToBottomRef.current || wasAtBottomBeforeResize || isTailVisibleRef.current)) {
        return;
      }
      window.requestAnimationFrame(() => {
        scrollToBottom();
      });
    });
    observer.observe(content);
    return () => {
      observer.disconnect();
    };
  }, [scrollToBottom]);
  useEffect19(() => {
    if (!shouldStickToBottomRef.current || userScrolledAwayFromTailRef.current) {
      previousBottomSpacerRef.current = bottomSpacer;
      return;
    }
    if (bottomSpacer === previousBottomSpacerRef.current) {
      return;
    }
    previousBottomSpacerRef.current = bottomSpacer;
    const frame = window.requestAnimationFrame(() => {
      scrollToBottom();
    });
    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [bottomSpacer, scrollToBottom]);
  useEffect19(() => {
    onTailVisibilityChange?.(isTailVisible);
  }, [isTailVisible, onTailVisibilityChange]);
  return {
    scrollContainerRef,
    scrollContentRef,
    tailSentinelRef,
    topSentinelRef,
    isTailVisible,
    handleScroll,
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    preserveScrollPositionForResize,
    serverManagedHistory,
    effectiveTotalTurnCount,
    startIndex,
    visibleTurnAbsoluteOffset,
    hiddenCount,
    loadedHiddenCount,
    unloadedHiddenCount,
    showLoadAll,
    handleLoadEarlierClick,
    handleLoadAllClick
  };
}

// src/components/ThreadTimeline.tsx
import { Fragment as Fragment13, jsx as jsx47, jsxs as jsxs39 } from "react/jsx-runtime";
function isTerminalTurnStatus2(status) {
  return status === "completed" || status === "failed" || status === "interrupted";
}
function latestTimestamp(...timestamps) {
  let latest = null;
  for (const timestamp of timestamps) {
    if (!timestamp) {
      continue;
    }
    const millis = Date.parse(timestamp);
    if (Number.isFinite(millis) && (!latest || millis > latest.millis)) {
      latest = { timestamp, millis };
    }
  }
  return latest?.timestamp ?? null;
}
function mergeOptimisticTurnItems(turn, optimisticTurn) {
  if (!optimisticTurn || optimisticTurn.id !== turn.id || optimisticTurn.items.length === 0) {
    return turn;
  }
  const materializedItemIds = new Set(turn.items.map((item) => item.id));
  const optimisticOnlyItems = optimisticTurn.items.filter(
    (item) => !materializedItemIds.has(item.id)
  );
  if (optimisticOnlyItems.length === 0) {
    return turn;
  }
  return {
    ...turn,
    items: [...optimisticOnlyItems, ...turn.items]
  };
}
function ThreadTimelineComponent({
  threadId,
  turns,
  totalTurnCount,
  pendingRequests = [],
  activeTurnId = null,
  threadRunning = false,
  pendingSteers = [],
  livePlan = null,
  liveItems = null,
  respondingRequestId = null,
  onRespondToRequest,
  liveOutput,
  scrollRequestKey = 0,
  previousTurnScrollRequestKey = 0,
  nextTurnScrollRequestKey = 0,
  bottomSpacer = 0,
  className = "",
  onTailVisibilityChange,
  onPreviousTurnAvailabilityChange,
  onNextTurnAvailabilityChange,
  loadingEarlier = false,
  onLoadEarlier,
  ephemeralUserNote = null,
  answeredRequestNotes = [],
  activityNotes = [],
  optimisticSteers = [],
  optimisticTurn = null,
  onLoadHistoryItemDetail,
  onLoadTurnDetail,
  onOpenThread,
  onSelectArtifact,
  onSelectHistoryItemDetail,
  adapter,
  autoCollapseCompletedTurns
}) {
  const shellNav = useAppShellNav();
  const effectiveAutoCollapseCompletedTurns = autoCollapseCompletedTurns ?? shellNav?.autoCollapseCompletedTurns ?? false;
  const [collapsedTurnOverrides, setCollapsedTurnOverrides] = useState29(
    {}
  );
  const [cancelingSteerIds, setCancelingSteerIds] = useState29(
    () => /* @__PURE__ */ new Set()
  );
  const lastPreviousTurnTargetIdRef = useRef17(null);
  const lastNextTurnTargetIdRef = useRef17(null);
  const loadHistoryItemDetail = adapter?.onLoadHistoryItemDetail ?? onLoadHistoryItemDetail;
  const loadTurnDetail = adapter?.onLoadTurnDetail ?? onLoadTurnDetail;
  const [loadedTurnDetails, setLoadedTurnDetails] = useState29({});
  const [loadingTurnDetailIds, setLoadingTurnDetailIds] = useState29(
    () => /* @__PURE__ */ new Set()
  );
  const [turnDetailErrors, setTurnDetailErrors] = useState29({});
  const openLinkedThread = adapter?.onOpenLinkedThread;
  const {
    expandedText,
    openExpandedText: handleOpenExpandedText,
    openCommandDetail: handleOpenCommandDetail,
    openToolCallDetail: handleOpenToolCallDetail,
    openDeferredHistoryItemDetail: handleOpenDeferredHistoryItemDetail,
    closeExpandedText
  } = useDeferredHistoryDetail({
    loadHistoryItemDetail,
    onSelectHistoryItemDetail
  });
  const {
    scrollContainerRef,
    scrollContentRef,
    tailSentinelRef,
    topSentinelRef,
    handleScroll,
    handleWheel,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    preserveScrollPositionForResize,
    serverManagedHistory,
    effectiveTotalTurnCount,
    startIndex,
    visibleTurnAbsoluteOffset,
    hiddenCount,
    loadedHiddenCount,
    unloadedHiddenCount,
    showLoadAll,
    handleLoadEarlierClick,
    handleLoadAllClick
  } = useTimelineScroll({
    threadId,
    turnsLength: turns.length,
    totalTurnCount,
    loadingEarlier,
    onLoadEarlier,
    scrollRequestKey,
    bottomSpacer,
    onTailVisibilityChange,
    contentRevisionInputs: [
      turns,
      pendingRequests,
      pendingSteers,
      optimisticSteers,
      liveOutput,
      livePlan,
      liveItems,
      optimisticTurn,
      answeredRequestNotes,
      activityNotes,
      ephemeralUserNote,
      bottomSpacer
    ]
  });
  useEffect20(() => {
    setCollapsedTurnOverrides({});
    setLoadedTurnDetails({});
    setLoadingTurnDetailIds(/* @__PURE__ */ new Set());
    setTurnDetailErrors({});
  }, [threadId]);
  const handleToggleCollapse = useCallback14((turn, currentCollapsed) => {
    preserveScrollPositionForResize();
    if (!currentCollapsed || !turn.hasDeferredItems || !loadTurnDetail || loadedTurnDetails[turn.id] && isTerminalTurnStatus2(loadedTurnDetails[turn.id].status) && loadedTurnDetails[turn.id].status === turn.status) {
      setCollapsedTurnOverrides((current) => ({
        ...current,
        [turn.id]: !currentCollapsed
      }));
      return;
    }
    if (loadingTurnDetailIds.has(turn.id)) {
      return;
    }
    setLoadingTurnDetailIds((current) => new Set(current).add(turn.id));
    setTurnDetailErrors((current) => ({ ...current, [turn.id]: void 0 }));
    void Promise.resolve(loadTurnDetail(turn.id)).then((loadedTurn) => {
      if (loadedTurn.id !== turn.id) {
        throw new Error("Loaded turn detail did not match the requested turn.");
      }
      setLoadedTurnDetails((current) => ({
        ...current,
        [turn.id]: loadedTurn
      }));
      setCollapsedTurnOverrides((current) => ({
        ...current,
        [turn.id]: false
      }));
    }).catch((caught) => {
      setTurnDetailErrors((current) => ({
        ...current,
        [turn.id]: caught instanceof Error ? caught.message : "Unable to load complete turn history."
      }));
    }).finally(() => {
      setLoadingTurnDetailIds((current) => {
        const next = new Set(current);
        next.delete(turn.id);
        return next;
      });
    });
  }, [loadTurnDetail, loadedTurnDetails, loadingTurnDetailIds, preserveScrollPositionForResize]);
  useEffect20(() => {
    if (!loadTurnDetail) return;
    for (const turn of turns) {
      const loaded = loadedTurnDetails[turn.id];
      if (collapsedTurnOverrides[turn.id] !== false || !loaded || loaded.status !== "inProgress" || !isTerminalTurnStatus2(turn.status) || loadingTurnDetailIds.has(turn.id) || turnDetailErrors[turn.id]) continue;
      setLoadingTurnDetailIds((current) => new Set(current).add(turn.id));
      void Promise.resolve().then(() => loadTurnDetail(turn.id)).then((detail) => {
        if (detail.id !== turn.id) throw new Error("Loaded turn detail did not match the requested turn.");
        setLoadedTurnDetails((current) => ({ ...current, [turn.id]: detail }));
      }).catch((error) => {
        setTurnDetailErrors((current) => ({ ...current, [turn.id]: error instanceof Error ? error.message : "Unable to load complete turn history." }));
      }).finally(() => {
        setLoadingTurnDetailIds((current) => {
          const next = new Set(current);
          next.delete(turn.id);
          return next;
        });
      });
    }
  }, [turns, loadTurnDetail, loadedTurnDetails, collapsedTurnOverrides, loadingTurnDetailIds, turnDetailErrors]);
  const collapsedStateForTurn = useCallback14((turn, input) => {
    const override = collapsedTurnOverrides[turn.id];
    if (override !== void 0) {
      return override;
    }
    return Boolean(
      loadTurnDetail && turn.status === "inProgress" || turn.hasDeferredItems || effectiveAutoCollapseCompletedTurns && isTerminalTurnStatus2(turn.status) && !input.forceActive && !input.hasLiveActivity
    );
  }, [collapsedTurnOverrides, effectiveAutoCollapseCompletedTurns, loadTurnDetail]);
  const visibleTurns = serverManagedHistory ? turns : turns.slice(startIndex);
  const optimisticAbsoluteIndex = effectiveTotalTurnCount + 1;
  const forceLatestTurnActive = threadRunning && (!activeTurnId || !visibleTurns.some((turn) => turn.id === activeTurnId) && optimisticTurn?.id !== activeTurnId);
  const latestVisibleTurnId = optimisticTurn?.id ?? visibleTurns.at(-1)?.id ?? null;
  const shouldForceLatestVisibleTurnActive = forceLatestTurnActive && latestVisibleTurnId !== null;
  const liveItemsAttachedToVisibleTurn = !!liveItems && (visibleTurns.some((turn) => turn.id === liveItems.turnId) || optimisticTurn?.id === liveItems.turnId);
  const liveItemsTargetTurnId = liveItems && liveItemsAttachedToVisibleTurn ? liveItems.turnId : liveItems && shouldForceLatestVisibleTurnActive ? latestVisibleTurnId : null;
  const optimisticLiveItems = optimisticTurn && liveItemsTargetTurnId === optimisticTurn.id ? liveItems?.items ?? null : null;
  const hasStructuredLiveItems = (liveItems?.items.length ?? 0) > 0;
  const unattachedLiveItems = liveItems && liveItemsTargetTurnId === null ? liveItems.items : null;
  const unattachedLiveTurn = useMemo8(
    () => liveItems && liveItemsTargetTurnId === null && liveItems.items.length > 0 ? buildSyntheticLiveTurn(liveItems.turnId, liveItems.items) : null,
    [liveItems, liveItemsTargetTurnId]
  );
  const unattachedLiveTurnIndex = Math.max(
    1,
    effectiveTotalTurnCount + (optimisticTurn ? 1 : 0)
  );
  const liveOutputAttachedToOptimisticTurn = !!liveOutput && !!optimisticTurn && optimisticTurn.status !== "failed" && !optimisticLiveItems;
  const liveOutputTargetTurnId = liveOutput && visibleTurns.length > 0 ? activeTurnId && visibleTurns.some((turn) => turn.id === activeTurnId) ? activeTurnId : visibleTurns.findLast((turn) => isRunningHistoryStatus(turn.status))?.id ?? (shouldForceLatestVisibleTurnActive ? latestVisibleTurnId : null) : null;
  const liveOutputAttachedToVisibleTurn = Boolean(liveOutputTargetTurnId);
  const liveOutputActivityAt = useMemo8(
    () => liveOutput ? (/* @__PURE__ */ new Date()).toISOString() : null,
    [liveOutput]
  );
  const unattachedLiveHookPromptItem = useMemo8(
    () => parseHookPromptText(liveOutput),
    [liveOutput]
  );
  const queuedSteers = [
    ...pendingSteers.filter((steer) => !turns.some(
      (turn) => turn.items.some((item) => item.id === `steer:${steer.id}`)
    )).map((steer) => ({
      id: steer.id,
      prompt: steer.prompt,
      status: "Accepted",
      createdAt: steer.createdAt,
      canCancel: true
    })),
    ...optimisticSteers.map((steer) => ({
      id: steer.id,
      prompt: steer.prompt,
      status: steer.status === "steering" ? "Steering" : null,
      createdAt: steer.createdAt,
      canCancel: false
    }))
  ].sort((left, right) => left.createdAt.localeCompare(right.createdAt));
  const requestEntryAnchors = useMemo8(
    () => buildRequestEntryAnchors({
      answeredRequestNotes,
      pendingRequests,
      visibleTurns,
      optimisticTurn
    }),
    [answeredRequestNotes, optimisticTurn, pendingRequests, visibleTurns]
  );
  const activityNoteAnchors = useMemo8(
    () => buildActivityNoteAnchors({
      activityNotes,
      visibleTurns,
      optimisticTurn
    }),
    [activityNotes, optimisticTurn, visibleTurns]
  );
  const findNextTurn = useCallback14(() => {
    const container = scrollContainerRef.current;
    if (!container) return null;
    const containerTop = container.getBoundingClientRect().top;
    return Array.from(
      container.querySelectorAll("[data-timeline-turn]")
    ).find((element) => element.getBoundingClientRect().top > containerTop + 8) ?? null;
  }, [scrollContainerRef]);
  const findPreviousTurn = useCallback14(() => {
    const container = scrollContainerRef.current;
    if (!container) return null;
    const containerTop = container.getBoundingClientRect().top;
    return Array.from(
      container.querySelectorAll("[data-timeline-turn]")
    ).findLast((element) => element.getBoundingClientRect().top < containerTop - 8) ?? null;
  }, [scrollContainerRef]);
  const updatePreviousTurnAvailability = useCallback14(() => {
    onPreviousTurnAvailabilityChange?.(Boolean(findPreviousTurn()));
  }, [findPreviousTurn, onPreviousTurnAvailabilityChange]);
  const updateNextTurnAvailability = useCallback14(() => {
    onNextTurnAvailabilityChange?.(Boolean(findNextTurn()));
  }, [findNextTurn, onNextTurnAvailabilityChange]);
  const handleTimelineScroll = useCallback14(() => {
    handleScroll();
    updatePreviousTurnAvailability();
    updateNextTurnAvailability();
  }, [handleScroll, updateNextTurnAvailability, updatePreviousTurnAvailability]);
  useEffect20(() => {
    updatePreviousTurnAvailability();
    updateNextTurnAvailability();
  }, [updateNextTurnAvailability, updatePreviousTurnAvailability, visibleTurns]);
  useEffect20(() => {
    if (previousTurnScrollRequestKey === 0) return;
    const container = scrollContainerRef.current;
    const firstCandidate = findPreviousTurn();
    const turns2 = container ? Array.from(container.querySelectorAll("[data-timeline-turn]")) : [];
    const firstCandidateIndex = firstCandidate ? turns2.indexOf(firstCandidate) : -1;
    const previousTurn = firstCandidate && firstCandidate.dataset.turnId === lastPreviousTurnTargetIdRef.current ? turns2[firstCandidateIndex - 1] ?? null : firstCandidate;
    if (!container || !previousTurn) return;
    lastPreviousTurnTargetIdRef.current = previousTurn.dataset.turnId ?? null;
    const offset = previousTurn.getBoundingClientRect().top - container.getBoundingClientRect().top;
    container.scrollTo({ top: container.scrollTop + offset - 8, behavior: "smooth" });
    if (turns2.indexOf(previousTurn) === 0) {
      onPreviousTurnAvailabilityChange?.(false);
    }
  }, [findPreviousTurn, onPreviousTurnAvailabilityChange, previousTurnScrollRequestKey, scrollContainerRef]);
  useEffect20(() => {
    if (nextTurnScrollRequestKey === 0) return;
    const container = scrollContainerRef.current;
    const firstCandidate = findNextTurn();
    const turns2 = container ? Array.from(container.querySelectorAll("[data-timeline-turn]")) : [];
    const firstCandidateIndex = firstCandidate ? turns2.indexOf(firstCandidate) : -1;
    const nextTurn = firstCandidate && firstCandidate.dataset.turnId === lastNextTurnTargetIdRef.current ? turns2[firstCandidateIndex + 1] ?? null : firstCandidate;
    if (!container || !nextTurn) return;
    lastNextTurnTargetIdRef.current = nextTurn.dataset.turnId ?? null;
    const offset = nextTurn.getBoundingClientRect().top - container.getBoundingClientRect().top;
    container.scrollTo({ top: container.scrollTop + offset - 8, behavior: "smooth" });
    if (turns2.indexOf(nextTurn) === turns2.length - 1) {
      onNextTurnAvailabilityChange?.(false);
    }
  }, [findNextTurn, nextTurnScrollRequestKey, onNextTurnAvailabilityChange, scrollContainerRef]);
  return /* @__PURE__ */ jsxs39(Fragment13, { children: [
    /* @__PURE__ */ jsx47("section", { className: `flex min-h-0 flex-1 flex-col ${className}`.trim(), children: /* @__PURE__ */ jsx47(
      "div",
      {
        ref: scrollContainerRef,
        "data-testid": "thread-scroll-container",
        onScroll: handleTimelineScroll,
        onWheel: handleWheel,
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
        onTouchCancel: handleTouchEnd,
        className: "thread-graph-scroll-container min-h-0 flex-1 overflow-y-auto overscroll-contain",
        style: bottomSpacer > 0 ? { paddingBottom: bottomSpacer } : void 0,
        children: /* @__PURE__ */ jsxs39("div", { ref: scrollContentRef, className: "thread-graph-scroll-content", children: [
          /* @__PURE__ */ jsx47("div", { ref: topSentinelRef, "aria-hidden": "true", className: "h-px" }),
          turns.length > 0 && /* @__PURE__ */ jsx47("div", { className: "thread-graph-history-control px-3 pb-1 pt-2 sm:px-5 sm:pb-1.5 sm:pt-3", children: /* @__PURE__ */ jsxs39("div", { className: "flex flex-wrap items-center gap-2.5 text-xs sm:text-sm", children: [
            hiddenCount > 0 && /* @__PURE__ */ jsxs39(
              "button",
              {
                type: "button",
                onClick: handleLoadEarlierClick,
                disabled: loadingEarlier,
                "aria-busy": loadingEarlier,
                className: "thread-history-earlier flex items-center gap-2 px-2 py-2 text-xs transition",
                children: [
                  /* @__PURE__ */ jsx47("span", { className: "thread-history-arrow", "aria-hidden": "true", children: "\u2191" }),
                  loadingEarlier ? "Loading earlier\u2026" : "Earlier messages"
                ]
              }
            ),
            showLoadAll && /* @__PURE__ */ jsx47(
              "button",
              {
                type: "button",
                onClick: handleLoadAllClick,
                className: "rounded-full border border-amber-300/40 px-2.5 py-1.5 text-amber-200 transition hover:bg-amber-300/10",
                children: "Load full history"
              }
            ),
            /* @__PURE__ */ jsxs39("p", { className: "timeline-meta-text", children: [
              "Showing ",
              visibleTurns.length,
              " of ",
              effectiveTotalTurnCount,
              " turns",
              hiddenCount > 0 ? ` \xB7 ${hiddenCount} earlier hidden${loadedHiddenCount > 0 && unloadedHiddenCount > 0 ? ` (${loadedHiddenCount} loaded)` : ""}` : ""
            ] })
          ] }) }),
          turns.length === 0 && !liveOutput && !optimisticTurn && /* @__PURE__ */ jsx47("div", { className: "thread-graph-empty-state px-3 py-8 text-sm sm:px-5", children: "Send the first prompt to start the thread." }),
          (visibleTurns.length > 0 || optimisticTurn || activityNoteAnchors.leading.length > 0 || activityNoteAnchors.trailing.length > 0) && /* @__PURE__ */ jsxs39("div", { className: "thread-graph-message-list", children: [
            activityNoteAnchors.leading.length > 0 ? /* @__PURE__ */ jsx47(
              ActivityNoteSection,
              {
                notes: activityNoteAnchors.leading,
                onOpenThread,
                onOpenLinkedThread: openLinkedThread
              }
            ) : null,
            visibleTurns.map((turn, visibleIndex) => /* @__PURE__ */ jsxs39("div", { "data-timeline-turn": true, "data-turn-id": turn.id, children: [
              (activityNoteAnchors.beforeTurnId.get(turn.id)?.length ?? 0) > 0 ? /* @__PURE__ */ jsx47(
                ActivityNoteSection,
                {
                  notes: activityNoteAnchors.beforeTurnId.get(turn.id) ?? [],
                  onOpenThread,
                  onOpenLinkedThread: openLinkedThread
                }
              ) : null,
              (requestEntryAnchors.beforeTurnId.get(turn.id)?.length ?? 0) > 0 ? /* @__PURE__ */ jsx47(
                RequestEntrySection,
                {
                  entries: requestEntryAnchors.beforeTurnId.get(turn.id) ?? [],
                  respondingRequestId,
                  onRespondToRequest: onRespondToRequest ?? void 0
                }
              ) : null,
              (() => {
                const loadedTurn = loadedTurnDetails[turn.id];
                const mergedItems = new Map(loadedTurn?.items.map((item) => [item.id, item]));
                for (const item of turn.items) mergedItems.set(item.id, mergeThreadHistoryItem2(mergedItems.get(item.id), item));
                const hydratedTurn = loadedTurn ? { ...loadedTurn, ...turn, items: [...mergedItems.values()] } : turn;
                const displayTurn = mergeOptimisticTurnItems(
                  hydratedTurn,
                  optimisticTurn
                );
                const rowLivePlan = livePlan?.turnId === turn.id ? livePlan : null;
                const rowLiveItems = liveItemsTargetTurnId === turn.id ? liveItems?.items ?? null : null;
                const rowLiveOutput = liveOutputTargetTurnId === turn.id ? liveOutput : "";
                const rowLiveActivityAt = latestTimestamp(
                  rowLivePlan?.updatedAt,
                  liveItemsTargetTurnId === turn.id ? liveItems?.updatedAt : null,
                  rowLiveOutput ? liveOutputActivityAt : null
                );
                const rowForceActive = activeTurnId === turn.id || shouldForceLatestVisibleTurnActive && latestVisibleTurnId === turn.id;
                const rowHasLiveActivity = Boolean(rowLivePlan) || Boolean(rowLiveOutput) || Boolean(rowLiveItems && rowLiveItems.length > 0);
                const rowCollapsed = collapsedStateForTurn(displayTurn, {
                  forceActive: rowForceActive,
                  hasLiveActivity: rowHasLiveActivity
                });
                return /* @__PURE__ */ jsx47(
                  ThreadTurnRow,
                  {
                    threadId,
                    ...adapter ? { adapter } : {},
                    turn: displayTurn,
                    absoluteIndex: visibleTurnAbsoluteOffset + visibleIndex + 1,
                    isCollapsed: rowCollapsed,
                    livePlan: rowLivePlan,
                    liveItems: rowLiveItems,
                    liveActivityAt: rowLiveActivityAt,
                    liveOutput: rowLiveOutput,
                    forceActive: rowForceActive,
                    onToggleCollapse: handleToggleCollapse,
                    deferredItemsLoading: loadingTurnDetailIds.has(turn.id),
                    deferredItemsError: turnDetailErrors[turn.id],
                    onOpenExpandedText: handleOpenExpandedText,
                    onOpenCommandDetail: handleOpenCommandDetail,
                    onOpenToolCallDetail: handleOpenToolCallDetail,
                    onOpenDeferredHistoryItemDetail: handleOpenDeferredHistoryItemDetail,
                    onBeforeMessageResize: preserveScrollPositionForResize,
                    ...onSelectArtifact ? { onSelectArtifact } : {},
                    scrollRootRef: scrollContainerRef,
                    articleRef: void 0
                  }
                );
              })(),
              (activityNoteAnchors.afterTurnId.get(turn.id)?.length ?? 0) > 0 ? /* @__PURE__ */ jsx47(
                ActivityNoteSection,
                {
                  notes: activityNoteAnchors.afterTurnId.get(turn.id) ?? [],
                  onOpenThread,
                  onOpenLinkedThread: openLinkedThread
                }
              ) : null,
              requestEntryAnchors.notesByTurnId.get(turn.id)?.length || requestEntryAnchors.pendingRequestsByTurnId.get(turn.id)?.length ? /* @__PURE__ */ jsx47(
                RequestEntrySectionForTurn,
                {
                  notes: requestEntryAnchors.notesByTurnId.get(turn.id) ?? [],
                  requests: requestEntryAnchors.pendingRequestsByTurnId.get(turn.id) ?? [],
                  respondingRequestId,
                  onRespondToRequest: onRespondToRequest ?? void 0
                }
              ) : null
            ] }, turn.id)),
            optimisticTurn && visibleTurns.every((turn) => turn.id !== optimisticTurn.id) && /* @__PURE__ */ jsxs39(Fragment13, { children: [
              (activityNoteAnchors.beforeTurnId.get(optimisticTurn.id)?.length ?? 0) > 0 ? /* @__PURE__ */ jsx47(
                ActivityNoteSection,
                {
                  notes: activityNoteAnchors.beforeTurnId.get(optimisticTurn.id) ?? [],
                  onOpenThread,
                  onOpenLinkedThread: openLinkedThread
                }
              ) : null,
              (requestEntryAnchors.beforeTurnId.get(optimisticTurn.id)?.length ?? 0) > 0 ? /* @__PURE__ */ jsx47(
                RequestEntrySection,
                {
                  entries: requestEntryAnchors.beforeTurnId.get(optimisticTurn.id) ?? [],
                  respondingRequestId,
                  onRespondToRequest: onRespondToRequest ?? void 0
                }
              ) : null,
              (() => {
                const rowLiveOutput = liveOutputAttachedToOptimisticTurn ? liveOutput : "";
                const rowLiveActivityAt = latestTimestamp(
                  liveItemsTargetTurnId === optimisticTurn.id ? liveItems?.updatedAt : null,
                  rowLiveOutput ? liveOutputActivityAt : null
                );
                const rowForceActive = activeTurnId === optimisticTurn.id || shouldForceLatestVisibleTurnActive && latestVisibleTurnId === optimisticTurn.id;
                const rowHasLiveActivity = Boolean(optimisticLiveItems && optimisticLiveItems.length > 0) || Boolean(rowLiveOutput);
                const rowCollapsed = collapsedStateForTurn(optimisticTurn, {
                  forceActive: rowForceActive,
                  hasLiveActivity: rowHasLiveActivity
                });
                return /* @__PURE__ */ jsx47(
                  ThreadTurnRow,
                  {
                    threadId,
                    ...adapter ? { adapter } : {},
                    turn: optimisticTurn,
                    absoluteIndex: optimisticAbsoluteIndex,
                    isCollapsed: rowCollapsed,
                    livePlan: null,
                    liveItems: optimisticLiveItems,
                    liveActivityAt: rowLiveActivityAt,
                    liveOutput: rowLiveOutput,
                    forceActive: rowForceActive,
                    onToggleCollapse: handleToggleCollapse,
                    onOpenExpandedText: handleOpenExpandedText,
                    onOpenCommandDetail: handleOpenCommandDetail,
                    onOpenToolCallDetail: handleOpenToolCallDetail,
                    onOpenDeferredHistoryItemDetail: handleOpenDeferredHistoryItemDetail,
                    onBeforeMessageResize: preserveScrollPositionForResize,
                    ...onSelectArtifact ? { onSelectArtifact } : {},
                    scrollRootRef: scrollContainerRef
                  }
                );
              })(),
              (activityNoteAnchors.afterTurnId.get(optimisticTurn.id)?.length ?? 0) > 0 ? /* @__PURE__ */ jsx47(
                ActivityNoteSection,
                {
                  notes: activityNoteAnchors.afterTurnId.get(optimisticTurn.id) ?? [],
                  onOpenThread,
                  onOpenLinkedThread: openLinkedThread
                }
              ) : null
            ] })
          ] }),
          queuedSteers.length > 0 && /* @__PURE__ */ jsx47("div", { className: "thread-graph-message-section space-y-3 px-3 py-4 sm:px-5", children: queuedSteers.map((steer) => /* @__PURE__ */ jsxs39("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx47(
              GraphChatCompactMessageItem,
              {
                threadId,
                item: {
                  id: steer.id,
                  kind: "userMessage",
                  text: steer.prompt,
                  status: steer.status
                },
                scrollRootRef: scrollContainerRef,
                onBeforeMessageResize: preserveScrollPositionForResize,
                ...adapter ? { adapter } : {}
              }
            ),
            threadId && steer.canCancel && adapter?.cancelPendingSteer ? /* @__PURE__ */ jsx47("div", { className: "flex justify-end px-1", children: /* @__PURE__ */ jsx47(
              "button",
              {
                type: "button",
                className: "thread-graph-history-button rounded-full border px-2.5 py-1 text-xs transition disabled:cursor-not-allowed disabled:opacity-60",
                disabled: cancelingSteerIds.has(steer.id),
                onClick: () => {
                  setCancelingSteerIds((current) => new Set(current).add(steer.id));
                  void Promise.resolve(adapter.cancelPendingSteer?.(threadId, steer.id)).catch(() => void 0).finally(() => {
                    setCancelingSteerIds((current) => {
                      const next = new Set(current);
                      next.delete(steer.id);
                      return next;
                    });
                  });
                },
                children: cancelingSteerIds.has(steer.id) ? "Canceling..." : "Cancel"
              }
            ) }) : null
          ] }, steer.id)) }),
          (requestEntryAnchors.trailing.length > 0 || activityNoteAnchors.trailing.length > 0) && /* @__PURE__ */ jsx47(
            ActivityRequestEntrySection,
            {
              entries: [
                ...activityNoteAnchors.trailing.map((note) => ({
                  kind: "activity",
                  id: note.id,
                  createdAt: note.createdAt,
                  note
                })),
                ...requestEntryAnchors.trailing
              ],
              respondingRequestId,
              onRespondToRequest: onRespondToRequest ?? void 0,
              onOpenThread,
              onOpenLinkedThread: openLinkedThread
            }
          ),
          ephemeralUserNote && /* @__PURE__ */ jsx47("div", { className: "thread-graph-message-section px-3 py-2.5 sm:px-5", children: /* @__PURE__ */ jsx47(
            GraphChatCompactMessageItem,
            {
              threadId,
              item: {
                id: "ephemeral-plan-decision-note",
                kind: "userMessage",
                text: ephemeralUserNote
              },
              scrollRootRef: scrollContainerRef,
              onBeforeMessageResize: preserveScrollPositionForResize
            }
          ) }),
          unattachedLiveTurn && unattachedLiveItems && unattachedLiveItems.length > 0 && /* @__PURE__ */ jsx47(
            ThreadTurnRow,
            {
              threadId,
              ...adapter ? { adapter } : {},
              turn: unattachedLiveTurn,
              absoluteIndex: unattachedLiveTurnIndex,
              isCollapsed: collapsedTurnOverrides[unattachedLiveTurn.id] ?? false,
              livePlan: livePlan?.turnId === unattachedLiveTurn.id ? livePlan : null,
              liveItems: unattachedLiveItems,
              liveActivityAt: latestTimestamp(
                livePlan?.turnId === unattachedLiveTurn.id ? livePlan.updatedAt : null,
                liveItems?.turnId === unattachedLiveTurn.id ? liveItems.updatedAt : null
              ),
              liveOutput: "",
              forceActive: true,
              onToggleCollapse: handleToggleCollapse,
              onOpenExpandedText: handleOpenExpandedText,
              onOpenCommandDetail: handleOpenCommandDetail,
              onOpenToolCallDetail: handleOpenToolCallDetail,
              onOpenDeferredHistoryItemDetail: handleOpenDeferredHistoryItemDetail,
              onBeforeMessageResize: preserveScrollPositionForResize,
              ...onSelectArtifact ? { onSelectArtifact } : {},
              scrollRootRef: scrollContainerRef
            }
          ),
          liveOutput && !liveOutputAttachedToVisibleTurn && !liveOutputAttachedToOptimisticTurn && !hasStructuredLiveItems && /* @__PURE__ */ jsx47("div", { className: "thread-graph-message-section px-3 py-2.5 sm:px-5", children: unattachedLiveHookPromptItem ? /* @__PURE__ */ jsx47(
            HistoryItemRow,
            {
              threadId,
              item: unattachedLiveHookPromptItem,
              scrollRootRef: scrollContainerRef,
              onOpenExpandedText: handleOpenExpandedText,
              onOpenCommandDetail: handleOpenCommandDetail,
              onOpenToolCallDetail: handleOpenToolCallDetail,
              onOpenDeferredHistoryItemDetail: handleOpenDeferredHistoryItemDetail,
              onBeforeMessageResize: preserveScrollPositionForResize,
              ...onSelectArtifact ? { onSelectArtifact } : {},
              ...adapter ? { adapter } : {}
            }
          ) : /* @__PURE__ */ jsx47(
            GraphChatCompactMessageItem,
            {
              threadId,
              item: {
                id: "live-agent-message-fallback",
                kind: "agentMessage",
                text: liveOutput
              },
              scrollRootRef: scrollContainerRef,
              streaming: true,
              onBeforeMessageResize: preserveScrollPositionForResize,
              ...adapter ? { adapter } : {}
            }
          ) }),
          /* @__PURE__ */ jsx47(
            "div",
            {
              ref: tailSentinelRef,
              "aria-hidden": "true",
              className: "h-px w-full"
            }
          )
        ] })
      }
    ) }),
    /* @__PURE__ */ jsx47(
      LongTextDialog,
      {
        open: expandedText !== null,
        title: expandedText?.title ?? "Full text",
        text: expandedText?.text ?? "",
        onClose: closeExpandedText
      }
    )
  ] });
}
var ThreadTimeline = memo6(ThreadTimelineComponent);

// src/components/ThreadShellPanel.tsx
import { MessageSquare as MessageSquare3 } from "lucide-react";
import {
  forwardRef as forwardRef2,
  useCallback as useCallback16,
  useEffect as useEffect24,
  useImperativeHandle as useImperativeHandle2,
  useMemo as useMemo10,
  useRef as useRef20,
  useState as useState32
} from "react";

// src/components/shell/ShellPane.tsx
import {
  forwardRef,
  useCallback as useCallback15,
  useEffect as useEffect22,
  useImperativeHandle,
  useMemo as useMemo9,
  useRef as useRef18,
  useState as useState30
} from "react";
import "xterm/css/xterm.css";

// src/components/shell/shellSnapshot.ts
function controlSequenceForLetter(key) {
  if (!/^[a-z]$/i.test(key)) {
    return null;
  }
  return String.fromCharCode(key.toUpperCase().charCodeAt(0) - 64);
}
function normalizeShellSnapshot(snapshot) {
  return snapshot.replace(/\r\n/g, "\n");
}
function splitShellSnapshotLines(snapshot) {
  const normalized = normalizeShellSnapshot(snapshot);
  const lines = normalized.split("\n");
  if (normalized.endsWith("\n") && lines.at(-1) === "") {
    lines.pop();
  }
  return lines;
}
function looksLikePromptLine(line) {
  const trimmed = line.trim();
  if (!trimmed) {
    return false;
  }
  return /(?:[$%#>])\s*$/.test(trimmed);
}
function stripEchoedCommandLine(lines, command) {
  const commandText = command.trim();
  if (!commandText || lines.length === 0) {
    return lines;
  }
  const [firstLine, ...rest] = lines;
  if (firstLine === void 0) {
    return lines;
  }
  const normalizedFirstLine = firstLine.trim();
  if (normalizedFirstLine === commandText || normalizedFirstLine.endsWith(` ${commandText}`) || normalizedFirstLine.endsWith(`$ ${commandText}`) || normalizedFirstLine.endsWith(`% ${commandText}`) || normalizedFirstLine.endsWith(`# ${commandText}`) || normalizedFirstLine.endsWith(`> ${commandText}`)) {
    return rest;
  }
  return lines;
}
function extractCommandOutput(beforeSnapshot, afterSnapshot, command) {
  const beforeLines = splitShellSnapshotLines(beforeSnapshot);
  const afterLines = splitShellSnapshotLines(afterSnapshot);
  let prefix = 0;
  while (prefix < beforeLines.length && prefix < afterLines.length && beforeLines[prefix] === afterLines[prefix]) {
    prefix += 1;
  }
  let suffix = 0;
  while (suffix < beforeLines.length - prefix && suffix < afterLines.length - prefix && beforeLines[beforeLines.length - 1 - suffix] === afterLines[afterLines.length - 1 - suffix]) {
    suffix += 1;
  }
  let addedLines = afterLines.slice(prefix, afterLines.length - suffix);
  addedLines = stripEchoedCommandLine(addedLines, command);
  while (addedLines.length > 0 && addedLines[0]?.trim() === "") {
    addedLines.shift();
  }
  while (addedLines.length > 0 && (addedLines.at(-1)?.trim() === "" || looksLikePromptLine(addedLines.at(-1) ?? ""))) {
    addedLines.pop();
  }
  return addedLines.join("\n").trimEnd();
}
function shellControlSequence(action) {
  switch (action) {
    case "ctrl_c":
      return "";
    case "ctrl_d":
      return "";
    case "esc":
      return "\x1B";
    case "tab":
      return "	";
    case "up":
      return "\x1B[A";
    case "down":
      return "\x1B[B";
  }
}

// src/components/shell/shellPresentation.tsx
import { jsx as jsx48, jsxs as jsxs40 } from "react/jsx-runtime";
function terminalThemeFor(effectiveTheme) {
  return {
    background: effectiveTheme === "light" ? "#f2ede5" : "#0c1117",
    foreground: effectiveTheme === "light" ? "#3f3a36" : "#d6dde6",
    cursor: effectiveTheme === "light" ? "#3f3a36" : "#d6dde6",
    black: effectiveTheme === "light" ? "#d8cfc2" : "#0f1720",
    brightBlack: effectiveTheme === "light" ? "#8a7f73" : "#475569",
    red: "#f87171",
    brightRed: "#fb7185",
    green: effectiveTheme === "light" ? "#16a34a" : "#86efac",
    brightGreen: effectiveTheme === "light" ? "#22c55e" : "#4ade80",
    yellow: "#fbbf24",
    brightYellow: "#fcd34d",
    blue: effectiveTheme === "light" ? "#2563eb" : "#93c5fd",
    brightBlue: effectiveTheme === "light" ? "#3b82f6" : "#60a5fa",
    magenta: effectiveTheme === "light" ? "#7c3aed" : "#c4b5fd",
    brightMagenta: effectiveTheme === "light" ? "#8b5cf6" : "#a78bfa",
    cyan: effectiveTheme === "light" ? "#0891b2" : "#67e8f9",
    brightCyan: effectiveTheme === "light" ? "#06b6d4" : "#22d3ee",
    white: effectiveTheme === "light" ? "#5b5148" : "#e2e8f0",
    brightWhite: effectiveTheme === "light" ? "#2c2723" : "#f8fafc"
  };
}
function statusLabel2(status) {
  switch (status) {
    case "not_created":
      return "Not created";
    case "creating":
      return "Creating";
    case "running":
      return "Running";
    case "attached":
      return "Attached";
    case "detached":
      return "Detached";
    case "exited":
      return "Exited";
    case "not_found":
      return "Missing";
    case "workspace_missing":
      return "Workspace missing";
  }
}
function basenameFromPath(filePath) {
  if (!filePath) {
    return "";
  }
  const normalized = filePath.replace(/[\\/]+$/, "");
  if (!normalized) {
    return "";
  }
  const segments = normalized.split(/[\\/]/).filter(Boolean);
  return segments.at(-1) ?? normalized;
}
function buildPromptLabel(cwdBaseName, envPrefix) {
  const parts = [envPrefix?.trim(), cwdBaseName?.trim()].filter(Boolean);
  return parts.length > 0 ? parts.join(" ") : null;
}
function clampPaneRatio(value) {
  return Math.min(75, Math.max(25, value));
}
function WrenchScrewdriverIcon2() {
  return /* @__PURE__ */ jsxs40(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 20 20",
      className: "h-4 w-4 fill-current",
      children: [
        /* @__PURE__ */ jsx48(
          "path",
          {
            fillRule: "evenodd",
            d: "M14.5 10C16.9853 10 19 7.98528 19 5.5C19 5.01783 18.9242 4.55338 18.7838 4.11791C18.6792 3.79367 18.2734 3.72683 18.0325 3.96772L15.3402 6.66002C15.2098 6.79041 15.0168 6.84163 14.8466 6.77074C14.1172 6.46695 13.5334 5.88351 13.2292 5.15431C13.1582 4.98403 13.2094 4.79088 13.3398 4.66042L16.0327 1.9676C16.2735 1.72672 16.2067 1.32092 15.8825 1.21636C15.4469 1.07588 14.9823 1 14.5 1C12.0147 1 10 3.01472 10 5.5C10 5.59783 10.0031 5.69494 10.0093 5.79122C10.065 6.66418 9.88174 7.59855 9.20974 8.15855L1.98017 14.1832C1.3591 14.7008 1 15.4674 1 16.2759C1 17.7804 2.21962 19 3.7241 19C4.53256 19 5.29925 18.6409 5.81681 18.0198L11.8414 10.7903C12.4014 10.1183 13.3358 9.93497 14.2088 9.99073C14.3051 9.99688 14.4022 10 14.5 10ZM5 16C5 16.5523 4.55228 17 4 17C3.44772 17 3 16.5523 3 16C3 15.4477 3.44772 15 4 15C4.55228 15 5 15.4477 5 16Z",
            clipRule: "evenodd"
          }
        ),
        /* @__PURE__ */ jsx48("path", { d: "M14.5 11.5C14.6731 11.5 14.8445 11.4927 15.0138 11.4783L18.7678 15.2323C19.7441 16.2086 19.7441 17.7915 18.7678 18.7678C17.7915 19.7441 16.2086 19.7441 15.2323 18.7678L10.8216 14.3571L12.9938 11.7505C13.0455 11.6885 13.1413 11.6131 13.3357 11.5552C13.5378 11.4951 13.805 11.468 14.1132 11.4877C14.2413 11.4959 14.3702 11.5 14.5 11.5Z" }),
        /* @__PURE__ */ jsx48("path", { d: "M6.00003 4.58582L8.33056 6.91635C8.3027 6.95627 8.27496 6.98497 8.24946 7.00622L6.79994 8.21415L4.58582 6.00003H3.30905C3.11966 6.00003 2.94653 5.89303 2.86184 5.72364L1.1612 2.32237C1.06495 2.12987 1.10268 1.89739 1.25486 1.74521L1.74521 1.25486C1.89739 1.10268 2.12987 1.06495 2.32237 1.1612L5.72364 2.86184C5.89303 2.94653 6.00003 3.11966 6.00003 3.30905V4.58582Z" })
      ]
    }
  );
}
function ConnectionIcon({ connected }) {
  if (!connected) {
    return /* @__PURE__ */ jsx48(
      "svg",
      {
        "aria-hidden": "true",
        viewBox: "0 0 24 24",
        className: "h-4.5 w-4.5 fill-none stroke-current",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        children: /* @__PURE__ */ jsx48("path", { d: "M13.181 8.68a4.503 4.503 0 0 1 1.903 6.405m-9.768-2.782L3.56 14.06a4.5 4.5 0 0 0 6.364 6.365l3.129-3.129m5.614-5.615 1.757-1.757a4.5 4.5 0 0 0-6.364-6.365l-4.5 4.5c-.258.26-.479.541-.661.84m1.903 6.405a4.495 4.495 0 0 1-1.242-.88 4.483 4.483 0 0 1-1.062-1.683m6.587 2.345 5.907 5.907m-5.907-5.907L8.898 8.898M2.991 2.99 8.898 8.9" })
      }
    );
  }
  return /* @__PURE__ */ jsx48(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 24 24",
      className: "h-4.5 w-4.5 fill-none stroke-current",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: /* @__PURE__ */ jsx48("path", { d: "M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" })
    }
  );
}
function ClipboardIcon2() {
  return /* @__PURE__ */ jsxs40(
    "svg",
    {
      "aria-hidden": "true",
      viewBox: "0 0 16 16",
      className: "h-3.5 w-3.5 fill-none stroke-current",
      strokeWidth: "1.35",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      children: [
        /* @__PURE__ */ jsx48("path", { d: "M5.5 3.25h5" }),
        /* @__PURE__ */ jsx48("path", { d: "M6.4 2h3.2a.9.9 0 0 1 .9.9v.35h1.3a1.2 1.2 0 0 1 1.2 1.2v7.35a1.2 1.2 0 0 1-1.2 1.2H4.2A1.2 1.2 0 0 1 3 11.8V4.45a1.2 1.2 0 0 1 1.2-1.2h1.3V2.9a.9.9 0 0 1 .9-.9Z" })
      ]
    }
  );
}
function ControlIcon({
  label,
  tone = "stone"
}) {
  const toneClassName = tone === "rose" ? "border-rose-300/35 bg-rose-300/14 text-rose-600 dark:text-rose-50" : tone === "sky" ? "border-sky-300/35 bg-sky-300/14 text-sky-600 dark:text-sky-50" : "shell-control-chip border";
  return /* @__PURE__ */ jsx48(
    "span",
    {
      className: `inline-flex min-w-[3.45rem] items-center justify-center rounded-full border px-2.5 py-1.5 text-[11px] font-medium tracking-[0.12em] ${toneClassName}`,
      children: label
    }
  );
}

// src/components/shell/shellEvents.ts
var SHELL_ATTACH_RETRY_DELAY_MS = 120;
var SHELL_RECONNECT_DELAY_MS = 800;
var SHELL_ATTACH_TIMEOUT_MS = 4e3;
var SHELL_RECONNECT_PROMISE_TIMEOUT_MS = 4500;
var SHELL_ATTACH_TIMEOUT_MESSAGE = "Shell connection timed out. Reconnecting...";
function deriveShellAttachTimeoutAction({
  isCurrentSocket,
  viewerId
}) {
  if (!isCurrentSocket || viewerId) {
    return null;
  }
  return {
    connectionError: SHELL_ATTACH_TIMEOUT_MESSAGE,
    isConnecting: false,
    settleAttachPromise: false,
    closeSocket: true
  };
}
function deriveShellSocketOpenAction({
  isCurrentSocket,
  shellId,
  attachSize
}) {
  if (!isCurrentSocket) {
    return null;
  }
  return {
    message: {
      type: "shell.attach",
      shellId,
      cols: attachSize.cols,
      rows: attachSize.rows
    },
    shouldScheduleAttachTimeout: true
  };
}
function shouldScheduleShellReconnect({
  intentionalDisconnect,
  userDisconnectedShellId,
  shellId
}) {
  return !intentionalDisconnect && userDisconnectedShellId !== shellId;
}
function deriveShellSocketCloseAction({
  isCurrentSocket,
  hadViewer,
  intentionalDisconnect,
  userDisconnectedShellId,
  shellId
}) {
  if (!isCurrentSocket) {
    return null;
  }
  return {
    shouldDetachShell: hadViewer,
    shouldScheduleReconnect: shouldScheduleShellReconnect({
      intentionalDisconnect,
      userDisconnectedShellId,
      shellId
    })
  };
}
function shouldScheduleAttachRetry({
  hasAttachSize,
  hasPendingRetry
}) {
  return !hasAttachSize && !hasPendingRetry;
}
function deriveShellAttachStartAction({
  shellId,
  terminalReady,
  isVisible,
  canAttachShell,
  userDisconnectedShellId,
  hasTerminal,
  attachSize,
  hasPendingAttachRetry,
  hasCurrentSocketForShell,
  hasReconnectTimer
}) {
  if (!shellId || !terminalReady || !isVisible || !canAttachShell || userDisconnectedShellId === shellId || !hasTerminal) {
    return { type: "skip" };
  }
  if (attachSize === void 0) {
    return { type: "measureSize" };
  }
  if (!attachSize) {
    return shouldScheduleAttachRetry({
      hasAttachSize: false,
      hasPendingRetry: hasPendingAttachRetry
    }) ? { type: "scheduleRetry" } : { type: "skip" };
  }
  if (hasCurrentSocketForShell) {
    return {
      type: "reuseSocket",
      shouldClearAttachRetry: hasPendingAttachRetry
    };
  }
  return {
    type: "startAttach",
    attachSize,
    shouldClearAttachRetry: hasPendingAttachRetry,
    shouldClearReconnectTimer: hasReconnectTimer
  };
}
function deriveShellReconnectRequestAction({
  hasShellId,
  terminalReady,
  workspacePathMissing,
  hasViewer,
  hasPendingAttach
}) {
  if (!hasShellId || !terminalReady || workspacePathMissing) {
    return { type: "reject" };
  }
  if (hasViewer) {
    return { type: "alreadyConnected" };
  }
  if (hasPendingAttach) {
    return { type: "joinPending" };
  }
  return { type: "startAttach" };
}
function deriveShellReconnectStartAction({
  shellId,
  userDisconnectedShellId
}) {
  return {
    shouldClearUserDisconnectedShellId: Boolean(shellId) && userDisconnectedShellId === shellId,
    intentionalDisconnect: false,
    connectionError: null,
    isConnecting: true,
    shouldIncrementReconnectKey: true
  };
}
function deriveShellMissingSessionResetAction({
  hasShell
}) {
  if (hasShell) {
    return null;
  }
  return {
    viewerId: null,
    isConnecting: false,
    settleAttachPromise: false,
    connectionError: null,
    runtimePromptLabel: null,
    isCommandRunning: false,
    shellSnapshot: "",
    lastCommandOutput: "",
    pendingCommand: null,
    shouldResetTerminal: true
  };
}
function deriveShellPaneUnmountCleanupAction({
  hasReconnectTimer,
  hasAttachTimeout,
  hasAttachRetry
}) {
  return {
    shouldClearReconnectTimer: hasReconnectTimer,
    shouldClearAttachTimeout: hasAttachTimeout,
    shouldClearAttachRetry: hasAttachRetry,
    settleAttachPromise: false
  };
}
function buildShellDetachMessage({
  shellId,
  viewerId
}) {
  return shellId && viewerId ? {
    type: "shell.detach",
    shellId,
    viewerId
  } : null;
}
function deriveShellManualDisconnectAction({
  shellId,
  viewerId,
  hasSocket
}) {
  return {
    userDisconnectedShellId: shellId,
    intentionalDisconnect: true,
    detachMessage: buildShellDetachMessage({ shellId, viewerId }),
    shouldCloseSocket: hasSocket,
    shouldClearSocketRef: true,
    shouldClearLastSentSize: true,
    shouldDetachShell: Boolean(shellId)
  };
}
function deriveShellSocketEffectCleanupAction({
  shellId,
  viewerId,
  socketReadyState,
  openReadyState,
  hasAttachRetryTimer,
  hasAttachTimeout,
  isCurrentSocket
}) {
  const detachMessage = buildShellDetachMessage({ shellId, viewerId });
  return {
    intentionalDisconnect: true,
    shouldClearAttachRetry: hasAttachRetryTimer,
    detachMessage,
    shouldSendDetachMessage: Boolean(
      detachMessage && socketReadyState === openReadyState
    ),
    shouldClearViewer: true,
    isConnecting: false,
    settleAttachPromise: isCurrentSocket ? false : void 0,
    shouldClearAttachTimeout: hasAttachTimeout,
    shouldCloseSocket: true,
    shouldClearSocketRef: isCurrentSocket
  };
}
function deriveShellResizeDecision({
  size,
  previousSize,
  shellId,
  viewerId,
  syncBackendSize
}) {
  if (!syncBackendSize) {
    return {
      nextLastSentSize: previousSize ?? size,
      message: null
    };
  }
  if (previousSize?.cols === size.cols && previousSize.rows === size.rows) {
    return {
      nextLastSentSize: previousSize,
      message: null
    };
  }
  return {
    nextLastSentSize: size,
    message: shellId && viewerId ? {
      type: "shell.resize",
      shellId,
      viewerId,
      cols: size.cols,
      rows: size.rows
    } : null
  };
}
function normalizeShellOutputEvent(payload, fallbackCwd) {
  const cwdBaseName = typeof payload.cwdBaseName === "string" ? payload.cwdBaseName : null;
  const envPrefix = typeof payload.envPrefix === "string" ? payload.envPrefix : null;
  return {
    data: typeof payload.data === "string" ? payload.data : "",
    replace: payload.replace === true,
    cursorX: typeof payload.cursorX === "number" ? payload.cursorX : void 0,
    cursorY: typeof payload.cursorY === "number" ? payload.cursorY : void 0,
    paneHeight: typeof payload.paneHeight === "number" ? payload.paneHeight : void 0,
    promptLabel: buildPromptLabel(
      cwdBaseName ?? basenameFromPath(fallbackCwd),
      envPrefix
    ),
    isCommandRunning: payload.isCommandRunning === true
  };
}
function updateShellSnapshotFromOutput({
  currentSnapshot,
  data,
  replace,
  isCommandRunning,
  pendingCommand
}) {
  if (!data) {
    return {
      nextSnapshot: currentSnapshot,
      nextPendingCommand: pendingCommand,
      lastCommandOutput: null
    };
  }
  const nextSnapshot = replace ? normalizeShellSnapshot(data) : normalizeShellSnapshot(`${currentSnapshot}${data}`);
  if (!replace || isCommandRunning || !pendingCommand) {
    return {
      nextSnapshot,
      nextPendingCommand: pendingCommand,
      lastCommandOutput: null
    };
  }
  return {
    nextSnapshot,
    nextPendingCommand: null,
    lastCommandOutput: extractCommandOutput(
      pendingCommand.beforeSnapshot,
      nextSnapshot,
      pendingCommand.command
    )
  };
}
function deriveShellLifecycleEventAction({
  event,
  currentViewerId
}) {
  if (event.type === "shell.output") {
    return null;
  }
  if (event.type === "shell.connected") {
    const nextViewerId = String(event.payload.viewerId ?? "");
    return {
      viewerId: nextViewerId || null,
      isConnecting: false,
      settleAttachPromise: Boolean(nextViewerId),
      isCommandRunning: void 0,
      connectionError: void 0,
      intentionalDisconnect: void 0,
      closeSocket: false,
      shellUpdate: {
        status: "attached",
        attachedViewerId: nextViewerId
      }
    };
  }
  if (event.type === "shell.error") {
    return {
      viewerId: void 0,
      isConnecting: false,
      settleAttachPromise: false,
      isCommandRunning: void 0,
      connectionError: String(
        event.payload.message ?? "Shell connection failed."
      ),
      intentionalDisconnect: void 0,
      closeSocket: false,
      shellUpdate: event.payload.code === "viewer_conflict" ? {
        status: "detached",
        attachedViewerId: null
      } : void 0
    };
  }
  if (event.type === "shell.detached") {
    const detachedViewerId = String(event.payload.viewerId ?? "");
    if (!detachedViewerId || detachedViewerId !== currentViewerId) {
      return null;
    }
    const detachedReason = String(event.payload.reason ?? "");
    return {
      viewerId: null,
      isConnecting: false,
      settleAttachPromise: false,
      isCommandRunning: false,
      connectionError: detachedReason === "replaced" ? "This shell connection was taken over by another pane or device." : null,
      intentionalDisconnect: detachedReason === "replaced" ? true : void 0,
      closeSocket: true,
      shellUpdate: {
        status: "detached",
        attachedViewerId: null
      }
    };
  }
  if (event.type === "shell.exited") {
    const nextState2 = event.payload.state === "exited" ? "exited" : "not_found";
    return {
      viewerId: null,
      isConnecting: false,
      settleAttachPromise: false,
      isCommandRunning: false,
      connectionError: void 0,
      intentionalDisconnect: true,
      closeSocket: true,
      shellUpdate: {
        status: nextState2,
        attachedViewerId: null
      }
    };
  }
  const nextState = event.payload.state;
  return {
    viewerId: nextState === "attached" ? void 0 : null,
    isConnecting: nextState === "attached" ? void 0 : false,
    settleAttachPromise: nextState === "attached" ? void 0 : false,
    isCommandRunning: nextState === "attached" ? void 0 : false,
    connectionError: void 0,
    intentionalDisconnect: void 0,
    closeSocket: false,
    shellUpdate: {
      status: nextState,
      attachedViewerId: nextState === "attached" ? void 0 : null
    }
  };
}

// src/components/shell/shellTerminal.ts
function renderShellSnapshot(terminal, snapshot, cursorX, cursorY, paneHeight) {
  const normalizedSnapshot = snapshot.replace(/\r\n/g, "\n");
  const lines = normalizedSnapshot.split("\n");
  if (normalizedSnapshot.endsWith("\n") && lines.at(-1) === "") {
    lines.pop();
  }
  const serializedSnapshot = lines.join("\r\n");
  let frame = serializedSnapshot;
  if (cursorX !== void 0 && cursorY !== void 0) {
    const historyOffset = paneHeight !== void 0 ? Math.max(0, lines.length - paneHeight) : 0;
    const cursorLineIndex = historyOffset + cursorY;
    const linesBelowCursor = Math.max(0, lines.length - cursorLineIndex - 1);
    if (linesBelowCursor > 0) {
      frame += `\x1B[${linesBelowCursor}A`;
    }
    frame += `\r\x1B[${cursorX + 1}G`;
  }
  terminal.reset();
  terminal.write(frame, () => {
    terminal.scrollToBottom();
  });
}
function getVisibleTerminalText(hostNode) {
  if (!hostNode) {
    return "";
  }
  const rows = Array.from(hostNode.querySelectorAll(".xterm-rows > div")).map((row) => row.textContent ?? "").filter((line, index, items) => line.length > 0 || index < items.length - 1);
  return rows.join("\n").trimEnd();
}

// src/components/shell/shellAttachPromise.ts
function createShellAttachPromiseController({
  clearTimeout
}) {
  let pending = null;
  const clearPendingTimer = (entry) => {
    if (entry?.timer !== null && entry?.timer !== void 0) {
      clearTimeout(entry.timer);
    }
  };
  const settle = (connected) => {
    const current = pending;
    if (!current) {
      return;
    }
    pending = null;
    clearPendingTimer(current);
    for (const resolve of current.waiters) {
      resolve(connected);
    }
  };
  return {
    hasPending: () => Boolean(pending),
    joinPending: () => new Promise((resolve) => {
      pending?.waiters.push(resolve);
    }),
    start: ({ timeoutMs, setTimeout, onTimeout }) => new Promise((resolve) => {
      const timer = setTimeout(() => {
        pending = null;
        onTimeout();
        resolve(false);
      }, timeoutMs);
      pending = { waiters: [resolve], timer };
    }),
    settle,
    clear: () => {
      const current = pending;
      pending = null;
      clearPendingTimer(current);
    }
  };
}

// src/components/shell/shellState.ts
var EMPTY_SHELL_PANE_RUNTIME_STATE = {
  status: "not_created",
  shellInputEnabled: false,
  isConnecting: false,
  isCommandRunning: false,
  promptLabel: null,
  error: null,
  hasShell: false
};
function isLiveShell(shell) {
  return shell.status !== "exited" && shell.status !== "not_found";
}
function shellCanAttach({
  shell,
  workspacePathMissing
}) {
  return Boolean(shell && !workspacePathMissing && isLiveShell(shell));
}
function runtimeStatesEqual(left, right) {
  return left.status === right.status && left.shellInputEnabled === right.shellInputEnabled && left.isConnecting === right.isConnecting && left.isCommandRunning === right.isCommandRunning && left.promptLabel === right.promptLabel && left.error === right.error && left.hasShell === right.hasShell;
}
function selectInitialActiveShell(shellState) {
  return (shellState.activeShellId ? shellState.shells.find(
    (shell) => shell.id === shellState.activeShellId && isLiveShell(shell)
  ) : null) ?? (shellState.shell && isLiveShell(shellState.shell) ? shellState.shell : null) ?? shellState.shells.find(isLiveShell) ?? null;
}
function buildConnectionButtonState({
  activeRuntime,
  activeShell,
  busy,
  loading,
  status,
  workspacePathMissing
}) {
  const disabled = busy || loading || status === "creating" || workspacePathMissing;
  const label = activeRuntime.shellInputEnabled ? "Disconnect shell" : activeShell && !isLiveShell(activeShell) ? "Restart shell" : activeShell ? "Connect shell" : "Create shell";
  const className = activeRuntime.shellInputEnabled ? "border-emerald-300/45 bg-emerald-300/18 text-emerald-50 ring-1 ring-emerald-300/20 hover:bg-emerald-300/24" : activeShell && !isLiveShell(activeShell) ? "border-stone-600 bg-stone-800/90 text-stone-100 hover:border-stone-500 hover:bg-stone-800" : workspacePathMissing ? "border-rose-300/35 bg-rose-300/12 text-rose-100" : "border-stone-600 bg-stone-800/90 text-stone-100 hover:border-stone-500 hover:bg-stone-800";
  return { disabled, label, className };
}
function buildShellControlState({
  activeRuntime,
  activeShell,
  connectionButtonDisabled,
  connectionButtonLabel,
  isMobileShell,
  busy,
  loading,
  error
}) {
  return {
    status: activeRuntime.status,
    connectionButtonDisabled,
    connectionButtonLabel,
    shellInputEnabled: activeRuntime.shellInputEnabled,
    isConnecting: activeRuntime.isConnecting,
    isCommandRunning: activeRuntime.isCommandRunning,
    promptLabel: activeRuntime.promptLabel ?? (activeShell ? buildPromptLabel(basenameFromPath(activeShell.cwd), null) : null),
    isMobileShell,
    hasShell: Boolean(activeShell),
    busy,
    loading,
    error: activeRuntime.error ?? error
  };
}

// src/components/shell/useShellSocketLifecycle.ts
import {
  useEffect as useEffect21
} from "react";

// src/components/shell/shellSocketSideEffects.ts
function clearWindowTimerRef(ref) {
  if (ref.current === null) {
    return false;
  }
  window.clearTimeout(ref.current);
  ref.current = null;
  return true;
}
function scheduleShellAttachRetry({
  attachRetryTimerRef,
  setReconnectKey,
  delayMs = SHELL_ATTACH_RETRY_DELAY_MS
}) {
  attachRetryTimerRef.current = window.setTimeout(() => {
    attachRetryTimerRef.current = null;
    setReconnectKey((current) => current + 1);
  }, delayMs);
}
function scheduleShellReconnect({
  reconnectTimerRef,
  setReconnectKey,
  delayMs = SHELL_RECONNECT_DELAY_MS
}) {
  reconnectTimerRef.current = window.setTimeout(() => {
    reconnectTimerRef.current = null;
    setReconnectKey((current) => current + 1);
  }, delayMs);
}
function scheduleShellAttachTimeout({
  shellSocket,
  socketRef,
  viewerIdRef,
  attachTimeoutRef,
  setConnectionError,
  setIsConnecting,
  settleAttachPromise,
  delayMs = SHELL_ATTACH_TIMEOUT_MS
}) {
  attachTimeoutRef.current = window.setTimeout(() => {
    attachTimeoutRef.current = null;
    const action = deriveShellAttachTimeoutAction({
      isCurrentSocket: !shellSocket.socket || socketRef.current?.socket === shellSocket.socket,
      viewerId: viewerIdRef.current
    });
    if (!action) {
      return;
    }
    setConnectionError(action.connectionError);
    setIsConnecting(action.isConnecting);
    settleAttachPromise(action.settleAttachPromise);
    if (action.closeSocket) {
      shellSocket.close?.();
      shellSocket.socket?.close();
    }
  }, delayMs);
}
function applyShellSocketCloseDetachUpdate(entry) {
  return {
    ...entry,
    status: entry.status === "attached" ? "detached" : entry.status,
    attachedViewerId: null
  };
}
function deriveShellSocketCleanupApplicationFromRefs({
  shellId,
  viewerId,
  shellSocket,
  attachRetryTimerRef,
  attachTimeoutRef,
  socketRef,
  openReadyState
}) {
  return deriveShellSocketEffectCleanupAction({
    shellId,
    viewerId,
    socketReadyState: shellSocket.socket.readyState,
    openReadyState,
    hasAttachRetryTimer: attachRetryTimerRef.current !== null,
    hasAttachTimeout: attachTimeoutRef.current !== null,
    isCurrentSocket: socketRef.current?.socket === shellSocket.socket
  });
}
function applyShellSocketCloseEffects({
  closeApplication,
  shellId,
  attachTimeoutRef,
  socketRef,
  reconnectTimerRef,
  setViewerId,
  setIsConnecting,
  settleAttachPromise,
  onShellUpdate,
  setReconnectKey
}) {
  const closeAction = closeApplication.closeAction;
  if (!closeAction) {
    return false;
  }
  if (closeApplication.shouldClearAttachTimeout) {
    clearWindowTimerRef(attachTimeoutRef);
  }
  if (closeApplication.shouldClearSocketRef) {
    socketRef.current = null;
  }
  setViewerId(closeApplication.viewerId);
  setIsConnecting(closeApplication.isConnecting);
  settleAttachPromise(closeApplication.settleAttachPromise);
  if (closeAction.shouldDetachShell) {
    onShellUpdate(
      shellId,
      applyShellSocketCloseDetachUpdate,
      "detached"
    );
  }
  if (closeAction.shouldScheduleReconnect) {
    scheduleShellReconnect({
      reconnectTimerRef,
      setReconnectKey
    });
  }
  return true;
}
function applyShellSocketCleanupEffects({
  cleanupAction,
  shellSocket,
  attachRetryTimerRef,
  attachTimeoutRef,
  socketRef,
  intentionalDisconnectRef,
  setViewerId,
  setIsConnecting,
  settleAttachPromise
}) {
  intentionalDisconnectRef.current = cleanupAction.intentionalDisconnect;
  if (cleanupAction.shouldClearAttachRetry) {
    clearWindowTimerRef(attachRetryTimerRef);
  }
  if (cleanupAction.shouldSendDetachMessage && cleanupAction.detachMessage) {
    shellSocket.send(cleanupAction.detachMessage);
  }
  if (cleanupAction.shouldClearViewer) {
    setViewerId(null);
  }
  setIsConnecting(cleanupAction.isConnecting);
  if (cleanupAction.settleAttachPromise !== void 0) {
    settleAttachPromise(cleanupAction.settleAttachPromise);
  }
  if (cleanupAction.shouldClearAttachTimeout) {
    clearWindowTimerRef(attachTimeoutRef);
  }
  if (cleanupAction.shouldCloseSocket) {
    shellSocket.socket.close();
  }
  if (cleanupAction.shouldClearSocketRef) {
    socketRef.current = null;
  }
}

// src/components/shell/shellSocketLifecycle.ts
function shouldHandleShellSocketEvent({
  eventShellId,
  shellId,
  socketExists,
  isCurrentSocket
}) {
  if (socketExists && !isCurrentSocket) {
    return false;
  }
  return eventShellId === shellId;
}
function deriveInitialShellAttachStartAction(input) {
  return deriveShellAttachStartAction({
    ...input,
    attachSize: void 0
  });
}
function deriveMeasuredShellAttachStartAction({
  attachSize,
  ...input
}) {
  return deriveShellAttachStartAction({
    ...input,
    attachSize
  });
}
function deriveShellSocketOpenApplication({
  isCurrentSocket,
  shellId,
  attachSize,
  hasAttachTimeout
}) {
  const openAction = deriveShellSocketOpenAction({
    isCurrentSocket,
    shellId,
    attachSize
  });
  return {
    openAction,
    shouldClearAttachTimeout: Boolean(openAction && hasAttachTimeout)
  };
}
function deriveShellConnectedEventAction(event) {
  const viewerId = String(event.payload.viewerId ?? "");
  return {
    viewerId: viewerId || null,
    settleAttachPromise: Boolean(viewerId),
    nextShell: (entry) => ({
      ...entry,
      status: "attached",
      attachedViewerId: viewerId
    })
  };
}
function deriveShellOutputEventApplication({
  event,
  shellCwd,
  currentSnapshot,
  pendingCommand
}) {
  const output = normalizeShellOutputEvent(event.payload, shellCwd);
  const snapshotUpdate = output.data ? updateShellSnapshotFromOutput({
    currentSnapshot,
    data: output.data,
    replace: output.replace,
    isCommandRunning: output.isCommandRunning,
    pendingCommand
  }) : null;
  return {
    output,
    snapshotUpdate
  };
}
function deriveShellSocketCloseApplication({
  isCurrentSocket,
  hadViewer,
  intentionalDisconnect,
  userDisconnectedShellId,
  shellId,
  hasAttachTimeout
}) {
  const closeAction = deriveShellSocketCloseAction({
    isCurrentSocket,
    hadViewer,
    intentionalDisconnect,
    userDisconnectedShellId,
    shellId
  });
  return {
    closeAction,
    shouldClearAttachTimeout: Boolean(closeAction && hasAttachTimeout),
    shouldClearSocketRef: Boolean(closeAction),
    viewerId: null,
    isConnecting: false,
    settleAttachPromise: false
  };
}
function applyShellLifecycleEventUpdate(entry, action) {
  if (!action.shellUpdate) {
    return entry;
  }
  return {
    ...entry,
    status: action.shellUpdate.status === "attached" || action.shellUpdate.status === "detached" || action.shellUpdate.status === "exited" || action.shellUpdate.status === "not_found" ? action.shellUpdate.status : entry.status,
    attachedViewerId: action.shellUpdate.attachedViewerId === void 0 ? entry.attachedViewerId : action.shellUpdate.attachedViewerId
  };
}

// src/components/shell/useShellSocketLifecycle.ts
function refValue(ref) {
  return ref.current;
}
function useShellSocketLifecycle({
  shell,
  shellAdapter,
  canAttachShell,
  terminalReady,
  reconnectKey,
  terminalRef,
  socketRef,
  viewerIdRef,
  shellIdRef,
  reconnectTimerRef,
  attachTimeoutRef,
  attachRetryTimerRef,
  isVisibleRef,
  intentionalDisconnectRef,
  userDisconnectedShellIdRef,
  shellSnapshotRef,
  pendingCommandRef,
  lastCommandOutputRef,
  snapshotCursorRef,
  syncTerminalSizeRef,
  setReconnectKey,
  setViewerId,
  setIsConnecting,
  setConnectionError,
  setRuntimePromptLabel,
  setIsCommandRunning,
  settleAttachPromise,
  onShellUpdate
}) {
  const shellId = shell?.id;
  const shellCwd = shell?.cwd;
  useEffect21(() => {
    const terminal = terminalRef.current;
    const baseAttachStartInput = {
      shellId: shellId ?? null,
      terminalReady,
      isVisible: isVisibleRef.current,
      canAttachShell,
      userDisconnectedShellId: userDisconnectedShellIdRef.current,
      hasTerminal: Boolean(terminal),
      hasPendingAttachRetry: attachRetryTimerRef.current !== null,
      hasCurrentSocketForShell: Boolean(
        socketRef.current && shellIdRef.current === shellId
      ),
      hasReconnectTimer: reconnectTimerRef.current !== null
    };
    const initialAttachStartAction = deriveInitialShellAttachStartAction(baseAttachStartInput);
    if (initialAttachStartAction.type === "skip") {
      return;
    }
    const attachSize = syncTerminalSizeRef.current();
    const attachStartAction = deriveMeasuredShellAttachStartAction({
      ...baseAttachStartInput,
      attachSize
    });
    if (attachStartAction.type === "skip" || attachStartAction.type === "measureSize") {
      return;
    }
    if (attachStartAction.type === "scheduleRetry") {
      scheduleShellAttachRetry({
        attachRetryTimerRef,
        setReconnectKey
      });
      return;
    }
    if (attachStartAction.shouldClearAttachRetry) {
      clearWindowTimerRef(attachRetryTimerRef);
    }
    if (attachStartAction.type === "reuseSocket") {
      return;
    }
    if (attachStartAction.shouldClearReconnectTimer) {
      clearWindowTimerRef(reconnectTimerRef);
    }
    if (!shellId || !terminal) {
      return;
    }
    const nextAttachSize = attachStartAction.attachSize;
    shellIdRef.current = shellId;
    terminal.reset();
    setConnectionError(null);
    setViewerId(null);
    setIsConnecting(true);
    intentionalDisconnectRef.current = false;
    const shellSocket = shellAdapter.connectSocket({
      onConnected: () => {
        const existingAttachTimeout = attachTimeoutRef.current;
        const openApplication = deriveShellSocketOpenApplication({
          isCurrentSocket: socketRef.current?.socket === shellSocket.socket,
          shellId,
          attachSize: nextAttachSize,
          hasAttachTimeout: existingAttachTimeout !== null
        });
        const openAction = openApplication.openAction;
        if (!openAction) {
          return;
        }
        shellSocket.send(openAction.message);
        if (openApplication.shouldClearAttachTimeout && existingAttachTimeout !== null) {
          clearWindowTimerRef(attachTimeoutRef);
        }
        if (openAction.shouldScheduleAttachTimeout) {
          scheduleShellAttachTimeout({
            shellSocket,
            socketRef,
            viewerIdRef,
            attachTimeoutRef,
            setConnectionError,
            setIsConnecting,
            settleAttachPromise
          });
        }
      },
      onShellEvent: (event) => {
        const shouldHandleEvent = shouldHandleShellSocketEvent({
          eventShellId: event.shellId,
          shellId,
          socketExists: Boolean(shellSocket.socket),
          isCurrentSocket: socketRef.current?.socket === shellSocket.socket
        });
        if (!shouldHandleEvent) {
          return;
        }
        if (event.type === "shell.connected") {
          clearWindowTimerRef(attachTimeoutRef);
          const connectedAction = deriveShellConnectedEventAction(event);
          setViewerId(connectedAction.viewerId);
          setIsConnecting(false);
          settleAttachPromise(connectedAction.settleAttachPromise);
          onShellUpdate(
            shellId,
            connectedAction.nextShell,
            "attached"
          );
          return;
        }
        if (event.type === "shell.output") {
          const { output, snapshotUpdate } = deriveShellOutputEventApplication({
            event,
            shellCwd,
            currentSnapshot: shellSnapshotRef.current,
            pendingCommand: pendingCommandRef.current
          });
          snapshotCursorRef.current = {
            cursorX: output.cursorX,
            cursorY: output.cursorY,
            paneHeight: output.paneHeight
          };
          setRuntimePromptLabel(output.promptLabel);
          setIsCommandRunning(output.isCommandRunning);
          if (snapshotUpdate) {
            shellSnapshotRef.current = snapshotUpdate.nextSnapshot;
            pendingCommandRef.current = snapshotUpdate.nextPendingCommand;
            if (snapshotUpdate.lastCommandOutput !== null) {
              lastCommandOutputRef.current = snapshotUpdate.lastCommandOutput;
            }
            if (output.replace) {
              renderShellSnapshot(
                terminal,
                output.data,
                output.cursorX,
                output.cursorY,
                output.paneHeight
              );
            } else {
              terminal.write(output.data);
            }
          }
          return;
        }
        const action = deriveShellLifecycleEventAction({
          event,
          currentViewerId: viewerIdRef.current
        });
        if (!action) {
          return;
        }
        if (action.viewerId !== void 0) {
          setViewerId(action.viewerId);
        }
        if (action.isConnecting !== void 0) {
          setIsConnecting(action.isConnecting);
        }
        if (action.settleAttachPromise !== void 0) {
          settleAttachPromise(action.settleAttachPromise);
        }
        if (action.isCommandRunning !== void 0) {
          setIsCommandRunning(action.isCommandRunning);
        }
        if (action.connectionError !== void 0) {
          setConnectionError(action.connectionError);
        }
        if (action.intentionalDisconnect !== void 0) {
          intentionalDisconnectRef.current = action.intentionalDisconnect;
        }
        if (action.shellUpdate) {
          onShellUpdate(
            shellId,
            (entry) => applyShellLifecycleEventUpdate(entry, action),
            action.shellUpdate.status
          );
        }
        if (action.closeSocket) {
          shellSocket.socket.close();
        }
      }
    });
    socketRef.current = shellSocket;
    shellSocket.socket.addEventListener("close", () => {
      const existingAttachTimeout = attachTimeoutRef.current;
      const closeApplication = deriveShellSocketCloseApplication({
        isCurrentSocket: socketRef.current?.socket === shellSocket.socket,
        hadViewer: Boolean(viewerIdRef.current),
        intentionalDisconnect: intentionalDisconnectRef.current,
        userDisconnectedShellId: userDisconnectedShellIdRef.current,
        shellId,
        hasAttachTimeout: existingAttachTimeout !== null
      });
      applyShellSocketCloseEffects({
        closeApplication,
        shellId,
        attachTimeoutRef,
        socketRef,
        reconnectTimerRef,
        setViewerId,
        setIsConnecting,
        settleAttachPromise,
        onShellUpdate,
        setReconnectKey
      });
    });
    return () => {
      const cleanupViewerId = refValue(viewerIdRef);
      const cleanupAction = deriveShellSocketCleanupApplicationFromRefs({
        shellId,
        viewerId: cleanupViewerId,
        shellSocket,
        attachRetryTimerRef,
        attachTimeoutRef,
        socketRef,
        openReadyState: WebSocket.OPEN
      });
      applyShellSocketCleanupEffects({
        cleanupAction,
        shellSocket,
        attachRetryTimerRef,
        attachTimeoutRef,
        socketRef,
        intentionalDisconnectRef,
        setViewerId,
        setIsConnecting,
        settleAttachPromise
      });
    };
  }, [
    attachRetryTimerRef,
    attachTimeoutRef,
    canAttachShell,
    intentionalDisconnectRef,
    isVisibleRef,
    lastCommandOutputRef,
    onShellUpdate,
    pendingCommandRef,
    reconnectKey,
    reconnectTimerRef,
    setConnectionError,
    setIsCommandRunning,
    setIsConnecting,
    setReconnectKey,
    setRuntimePromptLabel,
    setViewerId,
    settleAttachPromise,
    shellCwd,
    shellId,
    shellAdapter,
    shellIdRef,
    shellSnapshotRef,
    snapshotCursorRef,
    socketRef,
    syncTerminalSizeRef,
    terminalReady,
    terminalRef,
    userDisconnectedShellIdRef,
    viewerIdRef
  ]);
}

// src/components/shell/ShellPane.tsx
import { jsx as jsx49, jsxs as jsxs41 } from "react/jsx-runtime";
function refValue2(ref) {
  return ref.current;
}
var ShellPane = forwardRef(
  function ShellPane2({
    inputTransform,
    paneId,
    shell,
    isActive,
    isVisible,
    isMobileShell,
    effectiveTheme,
    workspacePathMissing,
    shellAdapter,
    onActivate,
    onShellUpdate,
    onRuntimeStateChange,
    onFeedback
  }, ref) {
    const transformRef = useRef18(inputTransform);
    transformRef.current = inputTransform;
    const terminalRef = useRef18(null);
    const fitAddonRef = useRef18(null);
    const socketRef = useRef18(null);
    const viewerIdRef = useRef18(null);
    const shellIdRef = useRef18(null);
    const reconnectTimerRef = useRef18(null);
    const attachTimeoutRef = useRef18(null);
    const attachRetryTimerRef = useRef18(null);
    const intentionalDisconnectRef = useRef18(false);
    const userDisconnectedShellIdRef = useRef18(null);
    const shellSnapshotRef = useRef18("");
    const pendingCommandRef = useRef18(null);
    const lastCommandOutputRef = useRef18("");
    const resizeObserverRef = useRef18(null);
    const lastSentSizeRef = useRef18(null);
    const snapshotCursorRef = useRef18({
      cursorX: void 0,
      cursorY: void 0,
      paneHeight: void 0
    });
    const terminalInitializingRef = useRef18(false);
    const terminalInputSubscriptionRef = useRef18(null);
    const isVisibleRef = useRef18(isVisible);
    const isMobileShellRef = useRef18(isMobileShell);
    const sendShellInputRef = useRef18(() => false);
    const syncTerminalSizeRef = useRef18(() => null);
    const refreshTerminalLayoutRef = useRef18(() => {
    });
    const attachPromiseControllerRef = useRef18(
      createShellAttachPromiseController({
        clearTimeout: window.clearTimeout
      })
    );
    const [terminalHostNode, setTerminalHostNode] = useState30(null);
    const [terminalReady, setTerminalReady] = useState30(false);
    const [viewerId, setViewerIdState] = useState30(null);
    const [isConnecting, setIsConnecting] = useState30(false);
    const [connectionError, setConnectionError] = useState30(null);
    const [runtimePromptLabel, setRuntimePromptLabel] = useState30(
      null
    );
    const [isCommandRunning, setIsCommandRunning] = useState30(false);
    const [reconnectKey, setReconnectKey] = useState30(0);
    const shellStatus = shell?.status ?? "not_created";
    const canAttachShell = shellCanAttach({ shell, workspacePathMissing });
    const fallbackPromptLabel = useMemo9(
      () => buildPromptLabel(basenameFromPath(shell?.cwd), null),
      [shell?.cwd]
    );
    const promptLabel = runtimePromptLabel ?? fallbackPromptLabel;
    const setViewerId = useCallback15((nextViewerId) => {
      viewerIdRef.current = nextViewerId;
      setViewerIdState(nextViewerId);
    }, []);
    const settleAttachPromise = useCallback15((connected) => {
      attachPromiseControllerRef.current.settle(connected);
    }, []);
    useEffect22(() => {
      isVisibleRef.current = isVisible;
    }, [isVisible]);
    useEffect22(() => {
      isMobileShellRef.current = isMobileShell;
    }, [isMobileShell]);
    useEffect22(() => {
      shellIdRef.current = shell?.id ?? null;
    }, [shell?.id]);
    const sendShellInput = useCallback15((data) => {
      const socket = socketRef.current;
      const shellId = shellIdRef.current;
      const currentViewerId = viewerIdRef.current;
      if (!socket || !shellId || !currentViewerId) {
        return false;
      }
      socket.send({
        type: "shell.input",
        shellId,
        viewerId: currentViewerId,
        data
      });
      return true;
    }, []);
    useEffect22(() => {
      sendShellInputRef.current = sendShellInput;
    }, [sendShellInput]);
    const sendShellClear = useCallback15(() => {
      const socket = socketRef.current;
      const shellId = shellIdRef.current;
      const currentViewerId = viewerIdRef.current;
      if (!socket || !shellId || !currentViewerId) {
        return false;
      }
      socket.send({
        type: "shell.clear",
        shellId,
        viewerId: currentViewerId
      });
      return true;
    }, []);
    const isTerminalVisible = useCallback15(() => {
      if (!isVisible || !terminalHostNode) {
        return false;
      }
      const rect = terminalHostNode.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    }, [isVisible, terminalHostNode]);
    const syncTerminalSize = useCallback15(
      (options) => {
        const terminal = terminalRef.current;
        const fitAddon = fitAddonRef.current;
        if (!terminal || !fitAddon || !isTerminalVisible()) {
          return null;
        }
        fitAddon.fit();
        if (terminal.cols <= 0 || terminal.rows <= 0) {
          return null;
        }
        const size = { cols: terminal.cols, rows: terminal.rows };
        const resizeDecision = deriveShellResizeDecision({
          size,
          previousSize: lastSentSizeRef.current,
          shellId: shellIdRef.current,
          viewerId: viewerIdRef.current,
          syncBackendSize: options?.syncBackendSize !== false
        });
        if (options?.syncBackendSize === false) {
          return size;
        }
        lastSentSizeRef.current = resizeDecision.nextLastSentSize;
        if (!resizeDecision.message) {
          return size;
        }
        if (socketRef.current) {
          socketRef.current.send(resizeDecision.message);
        }
        return size;
      },
      [isTerminalVisible]
    );
    useEffect22(() => {
      syncTerminalSizeRef.current = syncTerminalSize;
    }, [syncTerminalSize]);
    const refreshTerminalLayout = useCallback15(
      (options) => {
        const terminal = terminalRef.current;
        if (!terminal || !isTerminalVisible()) {
          return;
        }
        syncTerminalSize(
          options?.syncBackendSize === void 0 ? void 0 : { syncBackendSize: options.syncBackendSize }
        );
        if (shellSnapshotRef.current && !getVisibleTerminalText(terminalHostNode)) {
          renderShellSnapshot(
            terminal,
            shellSnapshotRef.current,
            snapshotCursorRef.current.cursorX,
            snapshotCursorRef.current.cursorY,
            snapshotCursorRef.current.paneHeight
          );
        } else {
          terminal.scrollToBottom();
        }
        if (options?.focus && !isMobileShell) {
          terminal.focus();
        }
      },
      [isMobileShell, isTerminalVisible, syncTerminalSize, terminalHostNode]
    );
    useEffect22(() => {
      refreshTerminalLayoutRef.current = () => refreshTerminalLayout();
    }, [refreshTerminalLayout]);
    useEffect22(() => {
      onRuntimeStateChange({
        status: viewerId ? "attached" : shellStatus,
        shellInputEnabled: Boolean(viewerId && shell),
        isConnecting,
        isCommandRunning,
        promptLabel,
        error: connectionError,
        hasShell: Boolean(shell)
      });
    }, [
      connectionError,
      isConnecting,
      isCommandRunning,
      onRuntimeStateChange,
      promptLabel,
      shell,
      shellStatus,
      viewerId
    ]);
    useEffect22(() => {
      if (!terminalHostNode || terminalRef.current || terminalInitializingRef.current) {
        return;
      }
      let cancelled = false;
      terminalInitializingRef.current = true;
      void (async () => {
        const [terminalModule, fitModule] = await Promise.all([
          import("xterm"),
          import("@xterm/addon-fit")
        ]);
        if (cancelled || !terminalHostNode) {
          terminalInitializingRef.current = false;
          return;
        }
        const TerminalConstructor = terminalModule.Terminal ?? terminalModule.default.Terminal;
        const FitConstructor = fitModule.FitAddon ?? fitModule.default.FitAddon;
        const terminal = new TerminalConstructor({
          cursorBlink: true,
          disableStdin: false,
          fontFamily: "IBM Plex Mono, SFMono-Regular, Menlo, monospace",
          fontSize: 13,
          lineHeight: 1.25,
          scrollback: 3e3,
          theme: terminalThemeFor(effectiveTheme)
        });
        const fitAddon = new FitConstructor();
        terminal.loadAddon(fitAddon);
        terminal.open(terminalHostNode);
        terminalRef.current = terminal;
        fitAddonRef.current = fitAddon;
        syncTerminalSizeRef.current();
        terminal.attachCustomKeyEventHandler((event) => {
          if (event.type !== "keydown") {
            return true;
          }
          if (event.ctrlKey && !event.altKey && !event.metaKey && !event.shiftKey) {
            const sequence = controlSequenceForLetter(event.key);
            if (!sequence) {
              return true;
            }
            if (sendShellInputRef.current(sequence)) {
              event.preventDefault();
              return false;
            }
          }
          return true;
        });
        setTerminalReady(true);
        terminalInitializingRef.current = false;
        resizeObserverRef.current = new ResizeObserver(() => {
          refreshTerminalLayoutRef.current();
        });
        resizeObserverRef.current.observe(terminalHostNode);
        terminalInputSubscriptionRef.current = terminal.onData((data) => {
          sendShellInputRef.current(transformRef.current?.(data) ?? data);
        });
      })().catch((error) => {
        if (cancelled) return;
        terminalInitializingRef.current = false;
        setConnectionError(error instanceof Error ? error.message : "Unable to initialize terminal.");
      });
      return () => {
        cancelled = true;
        terminalInitializingRef.current = false;
        terminalInputSubscriptionRef.current?.dispose();
        terminalInputSubscriptionRef.current = null;
        resizeObserverRef.current?.disconnect();
        resizeObserverRef.current = null;
        setTerminalReady(false);
        terminalRef.current?.dispose();
        terminalRef.current = null;
        fitAddonRef.current = null;
        lastSentSizeRef.current = null;
      };
    }, [effectiveTheme, terminalHostNode]);
    useEffect22(() => {
      const resetAction = deriveShellMissingSessionResetAction({
        hasShell: Boolean(shell)
      });
      if (!resetAction) {
        return;
      }
      setViewerId(resetAction.viewerId);
      setIsConnecting(resetAction.isConnecting);
      settleAttachPromise(resetAction.settleAttachPromise);
      setConnectionError(resetAction.connectionError);
      setRuntimePromptLabel(resetAction.runtimePromptLabel);
      setIsCommandRunning(resetAction.isCommandRunning);
      shellSnapshotRef.current = resetAction.shellSnapshot;
      lastCommandOutputRef.current = resetAction.lastCommandOutput;
      pendingCommandRef.current = resetAction.pendingCommand;
      if (resetAction.shouldResetTerminal) {
        terminalRef.current?.reset();
      }
    }, [setViewerId, settleAttachPromise, shell]);
    useEffect22(() => {
      const terminal = terminalRef.current;
      if (!terminal) {
        return;
      }
      terminal.options.theme = terminalThemeFor(effectiveTheme);
    }, [effectiveTheme]);
    useEffect22(() => {
      const terminal = terminalRef.current;
      if (!terminal) {
        return;
      }
      terminal.options.disableStdin = false;
    }, [isMobileShell]);
    useEffect22(() => {
      if (!isVisible || !terminalReady) {
        return;
      }
      const frame = window.requestAnimationFrame(() => {
        refreshTerminalLayout({ focus: isActive, syncBackendSize: false });
        if (!socketRef.current && shell?.id && userDisconnectedShellIdRef.current !== shell.id) {
          setReconnectKey((current) => current + 1);
        }
      });
      return () => {
        window.cancelAnimationFrame(frame);
      };
    }, [isActive, isVisible, refreshTerminalLayout, shell?.id, terminalReady]);
    useEffect22(() => {
      const terminal = terminalRef.current;
      if (!terminalReady || !terminal || !isVisible) return;
      let frame = 0;
      let disposed = false;
      const fit = () => {
        if (disposed || frame) return;
        frame = requestAnimationFrame(() => {
          frame = 0;
          syncTerminalSizeRef.current();
        });
      };
      const rendered = terminal.onRender(fit);
      void document.fonts?.ready.then(fit);
      fit();
      return () => {
        disposed = true;
        cancelAnimationFrame(frame);
        rendered.dispose();
      };
    }, [terminalReady, isVisible]);
    useEffect22(() => {
      if (!isMobileShell || !terminalReady || !terminalHostNode) return;
      const viewport = terminalHostNode.querySelector(".xterm-viewport");
      if (!viewport) return;
      const nativeScroll = (event) => {
        if (terminalRef.current?.buffer.active.type === "normal") event.stopPropagation();
      };
      viewport.addEventListener("touchstart", nativeScroll, { passive: true });
      viewport.addEventListener("touchmove", nativeScroll, { passive: true });
      return () => {
        viewport.removeEventListener("touchstart", nativeScroll);
        viewport.removeEventListener("touchmove", nativeScroll);
      };
    }, [isMobileShell, terminalReady, terminalHostNode]);
    useShellSocketLifecycle({
      shell,
      shellAdapter,
      canAttachShell,
      terminalReady,
      reconnectKey,
      terminalRef,
      socketRef,
      viewerIdRef,
      shellIdRef,
      reconnectTimerRef,
      attachTimeoutRef,
      attachRetryTimerRef,
      isVisibleRef,
      intentionalDisconnectRef,
      userDisconnectedShellIdRef,
      shellSnapshotRef,
      pendingCommandRef,
      lastCommandOutputRef,
      snapshotCursorRef,
      syncTerminalSizeRef,
      setReconnectKey,
      setViewerId,
      setIsConnecting,
      setConnectionError,
      setRuntimePromptLabel,
      setIsCommandRunning,
      settleAttachPromise,
      onShellUpdate
    });
    useEffect22(() => {
      return () => {
        const reconnectTimer = refValue2(reconnectTimerRef);
        const attachTimeout = refValue2(attachTimeoutRef);
        const attachRetry = refValue2(attachRetryTimerRef);
        const cleanupAction = deriveShellPaneUnmountCleanupAction({
          hasReconnectTimer: reconnectTimer !== null,
          hasAttachTimeout: attachTimeout !== null,
          hasAttachRetry: attachRetry !== null
        });
        if (cleanupAction.shouldClearReconnectTimer && reconnectTimer !== null) {
          window.clearTimeout(reconnectTimer);
        }
        if (cleanupAction.shouldClearAttachTimeout && attachTimeout !== null) {
          window.clearTimeout(attachTimeout);
        }
        if (cleanupAction.shouldClearAttachRetry && attachRetry !== null) {
          window.clearTimeout(attachRetry);
        }
        settleAttachPromise(cleanupAction.settleAttachPromise);
      };
    }, [settleAttachPromise]);
    useImperativeHandle(
      ref,
      () => ({
        disconnect() {
          const socket = socketRef.current;
          const shellId = shellIdRef.current;
          const currentViewerId = viewerIdRef.current;
          const action = deriveShellManualDisconnectAction({
            shellId,
            viewerId: currentViewerId,
            hasSocket: Boolean(socket)
          });
          userDisconnectedShellIdRef.current = action.userDisconnectedShellId;
          intentionalDisconnectRef.current = action.intentionalDisconnect;
          if (socket && action.detachMessage) {
            socket.send(action.detachMessage);
          }
          setViewerId(null);
          setIsConnecting(false);
          settleAttachPromise(false);
          if (action.shouldCloseSocket) {
            socket?.socket.close();
          }
          if (action.shouldClearSocketRef) {
            socketRef.current = null;
          }
          if (action.shouldClearLastSentSize) {
            lastSentSizeRef.current = null;
          }
          if (action.shouldDetachShell && shellId) {
            onShellUpdate(
              shellId,
              (entry) => ({
                ...entry,
                status: "detached",
                attachedViewerId: null
              }),
              "detached"
            );
          }
        },
        reconnect() {
          const reconnectAction = deriveShellReconnectRequestAction({
            hasShellId: Boolean(shellIdRef.current),
            terminalReady,
            workspacePathMissing,
            hasViewer: Boolean(viewerIdRef.current),
            hasPendingAttach: attachPromiseControllerRef.current.hasPending()
          });
          if (reconnectAction.type === "reject") {
            return Promise.resolve(false);
          }
          if (reconnectAction.type === "alreadyConnected") {
            return Promise.resolve(true);
          }
          if (reconnectAction.type === "joinPending") {
            return attachPromiseControllerRef.current.joinPending();
          }
          const attachPromise = attachPromiseControllerRef.current.start({
            timeoutMs: SHELL_RECONNECT_PROMISE_TIMEOUT_MS,
            setTimeout: window.setTimeout,
            onTimeout: () => {
              setIsConnecting(false);
            }
          });
          const startAction = deriveShellReconnectStartAction({
            shellId: shellIdRef.current,
            userDisconnectedShellId: userDisconnectedShellIdRef.current
          });
          if (startAction.shouldClearUserDisconnectedShellId) {
            userDisconnectedShellIdRef.current = null;
          }
          intentionalDisconnectRef.current = startAction.intentionalDisconnect;
          setConnectionError(startAction.connectionError);
          setIsConnecting(startAction.isConnecting);
          if (startAction.shouldIncrementReconnectKey) {
            setReconnectKey((current) => current + 1);
          }
          return attachPromise;
        },
        sendInput(data) {
          return sendShellInput(data);
        },
        sendCommand(command) {
          const pendingCommand = {
            command,
            beforeSnapshot: shellSnapshotRef.current
          };
          pendingCommandRef.current = pendingCommand;
          if (command.trim() === "clear") {
            const sent2 = sendShellClear();
            if (!sent2 && pendingCommandRef.current === pendingCommand) {
              pendingCommandRef.current = null;
            }
            return sent2;
          }
          const normalized = command.endsWith("\n") ? command : `${command}
`;
          const sent = sendShellInput(normalized);
          if (!sent && pendingCommandRef.current === pendingCommand) {
            pendingCommandRef.current = null;
          }
          return sent;
        },
        sendControl(action) {
          if (action === "clear") {
            return sendShellClear();
          }
          return sendShellInput(shellControlSequence(action));
        },
        async copyLastCommandOutput() {
          const output = lastCommandOutputRef.current.trim() || getVisibleTerminalText(terminalHostNode);
          if (!output) {
            onFeedback?.("failed", "Nothing to copy");
            return false;
          }
          try {
            await navigator.clipboard.writeText(output);
            onFeedback?.("done", "Copied");
            return true;
          } catch {
            onFeedback?.("failed", "Copy failed");
            return false;
          }
        },
        focus() {
          terminalRef.current?.focus();
        },
        refreshLayout(options) {
          refreshTerminalLayout(options);
        }
      }),
      [
        onFeedback,
        onShellUpdate,
        refreshTerminalLayout,
        sendShellClear,
        sendShellInput,
        setViewerId,
        settleAttachPromise,
        terminalHostNode,
        terminalReady,
        workspacePathMissing
      ]
    );
    return /* @__PURE__ */ jsxs41(
      "div",
      {
        className: `relative min-h-0 flex-1 overflow-hidden ${isActive ? "shell-pane-active" : ""}`,
        onMouseDown: onActivate,
        "data-pane-id": paneId,
        children: [
          /* @__PURE__ */ jsx49(
            "div",
            {
              ref: setTerminalHostNode,
              className: `h-full w-full px-2 py-2 sm:px-3 sm:py-3 ${isMobileShell ? "mobile-shell-direct" : ""}`,
              onClick: () => {
                onActivate();
                terminalRef.current?.focus();
              }
            }
          ),
          isActive && /* @__PURE__ */ jsx49("div", { className: "pointer-events-none absolute right-2 top-2 rounded-md border border-sky-300/30 bg-sky-300/10 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-sky-100", children: "Active" })
        ]
      }
    );
  }
);

// src/components/shell/ShellTouchControls.tsx
import { useEffect as useEffect23, useRef as useRef19, useState as useState31 } from "react";
import { ArrowDown, ArrowLeft as ArrowLeft2, ArrowRight, ArrowUp, MessageSquare as MessageSquare2, PanelsTopLeft, Pencil as Pencil2, Trash2 as Trash22, Plus as Plus2 } from "lucide-react";
import { Fragment as Fragment14, jsx as jsx50, jsxs as jsxs42 } from "react/jsx-runtime";
function useShellKeyboardLayout(visible, mobile) {
  const panelRef = useRef19(null);
  const [layout, setLayout] = useState31({ height: 0, inset: 0 });
  useEffect23(() => {
    const panel = panelRef.current;
    if (!visible || !mobile || !panel) {
      setLayout({ height: 0, inset: 0 });
      return;
    }
    let restingHeight = panel.getBoundingClientRect().height;
    let restingBottom = panel.getBoundingClientRect().bottom;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const viewport = window.visualViewport;
        const visibleBottom = (viewport?.height ?? window.innerHeight) + (viewport?.offsetTop ?? 0);
        const focused = panel.contains(document.activeElement) && document.activeElement?.matches("input, textarea");
        const inset = Math.max(0, restingBottom - visibleBottom);
        if (focused && inset > 80 && (viewport?.scale ?? 1) === 1) {
          setLayout({ height: restingHeight, inset });
        } else {
          setLayout({ height: 0, inset: 0 });
          frame = requestAnimationFrame(() => {
            restingHeight = panel.getBoundingClientRect().height;
            restingBottom = panel.getBoundingClientRect().bottom;
          });
        }
      });
    };
    const observer = new ResizeObserver(update);
    observer.observe(panel);
    window.visualViewport?.addEventListener("resize", update);
    window.visualViewport?.addEventListener("scroll", update);
    window.addEventListener("resize", update);
    panel.addEventListener("focusin", update);
    panel.addEventListener("focusout", update);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.visualViewport?.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      panel.removeEventListener("focusin", update);
      panel.removeEventListener("focusout", update);
    };
  }, [visible, mobile]);
  return { panelRef, layout };
}
function ShellTouchControls({ inset, enabled, ctrl, onCtrl, onInput, onFocus, onChat, onRename, onKill, sessions, activeId, onSelect, onCreate, busy }) {
  const [open, setOpen] = useState31(false);
  const [editing, setEditing] = useState31(null);
  const [name, setName] = useState31("");
  const [saving, setSaving] = useState31(false);
  const [error, setError] = useState31(null);
  async function rename(shell) {
    setSaving(true);
    setError(null);
    try {
      await onRename(shell, name.trim());
      setEditing(null);
    } catch (error2) {
      setError(error2 instanceof Error ? error2.message : "Unable to rename shell.");
    } finally {
      setSaving(false);
    }
  }
  const host = useRef19(null);
  useEffect23(() => {
    if (!open) return;
    const outside = (event) => {
      if (!host.current?.contains(event.target)) setOpen(false);
    };
    const escape = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        onFocus();
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape, true);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape, true);
    };
  }, [open, onFocus]);
  const keys = [
    ["Esc", "\x1B"],
    ["Tab", "	"],
    ["\u2191", "\x1B[A"],
    ["\u2193", "\x1B[B"],
    ["\u2190", "\x1B[D"],
    ["\u2192", "\x1B[C"]
  ];
  const icons = { "\u2191": ArrowUp, "\u2193": ArrowDown, "\u2190": ArrowLeft2, "\u2192": ArrowRight };
  return /* @__PURE__ */ jsxs42("div", { ref: host, className: "shell-touch-controls", style: { transform: `translateY(-${inset}px)` }, role: "toolbar", "aria-label": "Terminal controls", children: [
    onChat && /* @__PURE__ */ jsx50("button", { type: "button", "aria-label": "Back to chat", onClick: onChat, children: /* @__PURE__ */ jsx50(MessageSquare2, { size: 17 }) }),
    /* @__PURE__ */ jsx50("button", { type: "button", "aria-label": "Control modifier", "aria-pressed": ctrl, disabled: !enabled, onPointerDown: (e) => e.preventDefault(), onClick: () => {
      onCtrl();
      onFocus();
    }, children: "Ctrl" }),
    keys.map(([label, data]) => {
      const Icon = icons[label];
      return /* @__PURE__ */ jsx50("button", { type: "button", "aria-label": `Terminal ${label}`, disabled: !enabled, onPointerDown: (e) => e.preventDefault(), onClick: () => {
        onInput(data);
        onFocus();
      }, children: Icon ? /* @__PURE__ */ jsx50(Icon, { size: 17 }) : label }, label);
    }),
    /* @__PURE__ */ jsx50("button", { type: "button", "aria-label": "Switch terminal session", "aria-expanded": open, onPointerDown: (e) => e.preventDefault(), onClick: () => setOpen((v) => !v), children: /* @__PURE__ */ jsx50(PanelsTopLeft, { size: 18 }) }),
    open && /* @__PURE__ */ jsxs42("div", { className: "shell-session-popover", role: "dialog", "aria-label": "Terminal sessions", children: [
      error && /* @__PURE__ */ jsx50("p", { role: "alert", className: "px-2 text-xs text-red-500", children: error }),
      sessions.map((shell, index) => {
        const label = shell.label || `Shell ${index + 1}`;
        return /* @__PURE__ */ jsx50("div", { className: "shell-session-row", "data-shell-id": shell.id, children: editing === shell.id ? /* @__PURE__ */ jsxs42("form", { onSubmit: (event) => {
          event.preventDefault();
          void rename(shell);
        }, children: [
          /* @__PURE__ */ jsx50("input", { "aria-label": "Shell name", autoFocus: true, value: name, onChange: (event) => setName(event.target.value) }),
          /* @__PURE__ */ jsx50("button", { type: "submit", disabled: saving, children: "Save" }),
          /* @__PURE__ */ jsx50("button", { type: "button", onClick: () => setEditing(null), children: "Cancel" })
        ] }) : /* @__PURE__ */ jsxs42(Fragment14, { children: [
          /* @__PURE__ */ jsxs42("button", { className: "shell-session-select", type: "button", "aria-pressed": shell.id === activeId, onPointerDown: (e) => e.preventDefault(), onClick: () => {
            onSelect(shell);
            setOpen(false);
            onFocus();
          }, children: [
            label,
            shell.id === activeId ? " \u2022" : ""
          ] }),
          /* @__PURE__ */ jsx50("button", { type: "button", "aria-label": `Rename ${label}`, title: "Rename shell", disabled: busy, onClick: () => {
            setEditing(shell.id);
            setName(label);
            setError(null);
          }, children: /* @__PURE__ */ jsx50(Pencil2, { size: 16 }) }),
          /* @__PURE__ */ jsx50("button", { type: "button", "aria-label": `Kill ${label}`, title: "Kill shell process", disabled: busy, onPointerDown: (e) => e.preventDefault(), onClick: () => void onKill(shell.id), children: /* @__PURE__ */ jsx50(Trash22, { size: 16 }) })
        ] }) }, shell.id);
      }),
      /* @__PURE__ */ jsxs42("button", { type: "button", disabled: busy, onPointerDown: (e) => e.preventDefault(), onClick: () => {
        onCreate();
        setOpen(false);
      }, children: [
        /* @__PURE__ */ jsx50(Plus2, { size: 16 }),
        " New shell"
      ] })
    ] })
  ] });
}

// src/components/ThreadShellPanel.tsx
import { Fragment as Fragment15, jsx as jsx51, jsxs as jsxs43 } from "react/jsx-runtime";
var ThreadShellPanel = forwardRef2(function ThreadShellPanel2({
  threadId,
  shellAdapter,
  isVisible = true,
  showHeader = true,
  onBackToChat,
  showFloatingToolbox = true,
  effectiveTheme = "dark",
  loadSplitRatio,
  saveSplitRatio,
  onStateChange
}, ref) {
  const primaryPaneRef = useRef20(null);
  const secondaryPaneRef = useRef20(null);
  const feedbackTimerRef = useRef20(null);
  const terminalSplitHostRef = useRef20(null);
  const dragFrameRef = useRef20(null);
  const createShellInFlightRef = useRef20(false);
  const [shellState, setShellState] = useState32(null);
  const [loading, setLoading] = useState32(true);
  const [busy, setBusy] = useState32(false);
  const [error, setError] = useState32(null);
  const [activePaneId, setActivePaneId] = useState32("primary");
  const [primaryShellId, setPrimaryShellId] = useState32(null);
  const [secondaryShellId, setSecondaryShellId] = useState32(null);
  const [splitMode, setSplitMode] = useState32("single");
  const [splitRatio, setSplitRatio] = useState32(50);
  const [renamingShellId, setRenamingShellId] = useState32(null);
  const [renameDraft, setRenameDraft] = useState32("");
  const [isMobileShell, setIsMobileShell] = useState32(false);
  const { panelRef, layout: keyboardLayout } = useShellKeyboardLayout(isVisible, isMobileShell);
  const [ctrlPressed, setCtrlPressed] = useState32(false);
  const ctrlRef = useRef20(false);
  const transformInput = useCallback16((data) => {
    if (!ctrlRef.current) return data;
    ctrlRef.current = false;
    setCtrlPressed(false);
    return data.length === 1 ? controlSequenceForLetter(data) ?? data : data;
  }, []);
  const [toolboxOpen, setToolboxOpen] = useState32(false);
  const [paneRuntime, setPaneRuntime] = useState32({
    primary: EMPTY_SHELL_PANE_RUNTIME_STATE,
    secondary: EMPTY_SHELL_PANE_RUNTIME_STATE
  });
  const [toolboxFeedback, setToolboxFeedback] = useState32(null);
  const status = shellState?.state ?? "not_created";
  const shells = useMemo10(() => shellState?.shells ?? [], [shellState?.shells]);
  const liveShells = useMemo10(
    () => shells.filter(isLiveShell),
    [shells]
  );
  const primaryShell = useMemo10(
    () => liveShells.find((shell) => shell.id === primaryShellId) ?? null,
    [liveShells, primaryShellId]
  );
  const secondaryShell = useMemo10(
    () => liveShells.find((shell) => shell.id === secondaryShellId) ?? null,
    [liveShells, secondaryShellId]
  );
  const activeShell = activePaneId === "secondary" ? secondaryShell : primaryShell;
  const activeRuntime = paneRuntime[activePaneId];
  const workspacePathMissing = shellState?.workspacePathStatus === "missing";
  const activePaneRef = activePaneId === "secondary" ? secondaryPaneRef : primaryPaneRef;
  const connectionButtonState = buildConnectionButtonState({
    activeRuntime,
    activeShell,
    busy,
    loading,
    status,
    workspacePathMissing
  });
  const connectionButtonDisabled = connectionButtonState.disabled;
  const connectionButtonLabel = connectionButtonState.label;
  const connectionButtonClassName = connectionButtonState.className;
  const toolboxFeedbackToneClassName = toolboxFeedback?.tone === "done" ? "shell-floating-feedback shell-floating-feedback-done" : toolboxFeedback?.tone === "failed" ? "shell-floating-feedback shell-floating-feedback-failed" : "shell-floating-feedback";
  const setTransientToolboxFeedback = useCallback16(
    (tone, text) => {
      setToolboxFeedback({ tone, text });
      if (feedbackTimerRef.current !== null) {
        window.clearTimeout(feedbackTimerRef.current);
      }
      feedbackTimerRef.current = window.setTimeout(() => {
        setToolboxFeedback(null);
        feedbackTimerRef.current = null;
      }, 1800);
    },
    []
  );
  const updateShellEntry = useCallback16(
    (shellId, updater, nextState) => {
      setShellState((current) => {
        if (!current) {
          return current;
        }
        const nextShells = current.shells.map(
          (shell) => shell.id === shellId ? updater(shell) : shell
        );
        const nextShell = current.shell?.id === shellId ? updater(current.shell) : nextShells.find((shell) => shell.id === current.shell?.id) ?? current.shell;
        return {
          ...current,
          ...nextState ? { state: nextState } : {},
          shell: nextShell,
          shells: nextShells
        };
      });
    },
    []
  );
  const loadShellState = useCallback16(async () => {
    setLoading(true);
    try {
      const response = await shellAdapter.fetchState(threadId);
      setShellState(response);
      setError(null);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to load shell state.");
    } finally {
      setLoading(false);
    }
  }, [shellAdapter, threadId]);
  useEffect24(() => {
    void loadShellState();
  }, [loadShellState]);
  useEffect24(() => {
    const storedRatio = loadSplitRatio?.(threadId);
    if (storedRatio === null || storedRatio === void 0) {
      setSplitRatio(50);
      return;
    }
    const parsed = typeof storedRatio === "number" ? storedRatio : Number.parseFloat(String(storedRatio));
    setSplitRatio(Number.isFinite(parsed) ? clampPaneRatio(parsed) : 50);
  }, [loadSplitRatio, threadId]);
  useEffect24(() => {
    if (!shellState) {
      setPrimaryShellId(null);
      setSecondaryShellId(null);
      return;
    }
    const nextActiveShell = selectInitialActiveShell(shellState);
    setPrimaryShellId((current) => {
      if (current && shellState.shells.some((shell) => shell.id === current && isLiveShell(shell))) {
        return current;
      }
      return nextActiveShell?.id ?? null;
    });
    setSecondaryShellId((current) => {
      if (splitMode !== "columns") {
        return null;
      }
      if (current && shellState.shells.some((shell) => shell.id === current && isLiveShell(shell))) {
        return current;
      }
      const fallback = shellState.shells.find(
        (shell) => isLiveShell(shell) && shell.id !== nextActiveShell?.id
      );
      return fallback?.id ?? null;
    });
  }, [shellState, splitMode]);
  useEffect24(() => {
    if (splitMode === "columns") {
      return;
    }
    setActivePaneId("primary");
    setSecondaryShellId(null);
  }, [splitMode]);
  useEffect24(() => {
    if (splitMode !== "columns" || secondaryShellId || liveShells.length < 2) {
      return;
    }
    const nextSecondary = liveShells.find((shell) => shell.id !== primaryShell?.id) ?? null;
    if (nextSecondary) {
      setSecondaryShellId(nextSecondary.id);
    }
  }, [liveShells, primaryShell?.id, secondaryShellId, splitMode]);
  useEffect24(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }
    const mediaQuery = window.matchMedia("(max-width: 767px), (hover: none) and (pointer: coarse)");
    const update = () => {
      setIsMobileShell(mediaQuery.matches);
      if (!mediaQuery.matches) {
        setToolboxOpen(false);
      }
    };
    update();
    mediaQuery.addEventListener("change", update);
    return () => {
      mediaQuery.removeEventListener("change", update);
    };
  }, []);
  useEffect24(() => {
    return () => {
      if (feedbackTimerRef.current !== null) {
        window.clearTimeout(feedbackTimerRef.current);
      }
      if (dragFrameRef.current !== null) {
        window.cancelAnimationFrame(dragFrameRef.current);
      }
    };
  }, []);
  const updatePaneRuntime = useCallback16(
    (paneId, nextState) => {
      setPaneRuntime((current) => {
        const previous = current[paneId];
        if (runtimeStatesEqual(previous, nextState)) {
          return current;
        }
        return {
          ...current,
          [paneId]: nextState
        };
      });
    },
    []
  );
  const handlePrimaryRuntimeStateChange = useCallback16(
    (nextState) => updatePaneRuntime("primary", nextState),
    [updatePaneRuntime]
  );
  const handleSecondaryRuntimeStateChange = useCallback16(
    (nextState) => updatePaneRuntime("secondary", nextState),
    [updatePaneRuntime]
  );
  const shellLabel = useCallback16(
    (shell) => {
      if (shell.label?.trim()) {
        return shell.label.trim();
      }
      const index = shells.findIndex((entry) => entry.id === shell.id);
      return `Shell ${index >= 0 ? index + 1 : ""}`.trim();
    },
    [shells]
  );
  const handleStartRenameShell = useCallback16(
    (shell) => {
      setRenamingShellId(shell.id);
      setRenameDraft(shell.label?.trim() || shellLabel(shell));
    },
    [shellLabel]
  );
  const handleCancelRenameShell = useCallback16(() => {
    setRenamingShellId(null);
    setRenameDraft("");
  }, []);
  const handleSubmitRenameShell = useCallback16(async () => {
    if (!renamingShellId) {
      return;
    }
    setBusy(true);
    try {
      const label = renameDraft.trim();
      const updated = await shellAdapter.updateShell(renamingShellId, {
        label: label.length > 0 ? label : null
      });
      setShellState(
        (current) => current ? {
          ...current,
          state: current.activeShellId === updated.id ? updated.status : current.state,
          shell: current.shell?.id === updated.id ? updated : current.shell,
          shells: current.shells.map(
            (shell) => shell.id === updated.id ? updated : shell
          )
        } : current
      );
      setRenamingShellId(null);
      setRenameDraft("");
      setError(null);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to rename shell.");
    } finally {
      setBusy(false);
    }
  }, [renameDraft, renamingShellId, shellAdapter]);
  const setPaneShell = useCallback16((paneId, shellId) => {
    if (paneId === "primary") {
      setPrimaryShellId(shellId);
      setSecondaryShellId((current) => current === shellId ? null : current);
      return;
    }
    setSecondaryShellId(shellId);
    setPrimaryShellId((current) => current === shellId ? null : current);
  }, []);
  const handleClosePane = useCallback16((paneId) => {
    if (paneId === "primary") {
      primaryPaneRef.current?.disconnect();
      setPrimaryShellId(null);
      if (splitMode === "columns") {
        setActivePaneId("secondary");
      }
      return;
    }
    secondaryPaneRef.current?.disconnect();
    setSecondaryShellId(null);
    setActivePaneId("primary");
    setSplitMode("single");
  }, [splitMode]);
  const handleSelectShell = useCallback16(
    (shell, paneId = activePaneId) => {
      const targetPaneId = splitMode === "columns" ? paneId : "primary";
      setPaneShell(targetPaneId, shell.id);
      if (splitMode !== "columns") {
        setSecondaryShellId(null);
      }
      setActivePaneId(targetPaneId);
    },
    [activePaneId, setPaneShell, splitMode]
  );
  const handleCreateShell = useCallback16(
    async (paneId = activePaneId) => {
      if (createShellInFlightRef.current) {
        return;
      }
      createShellInFlightRef.current = true;
      setBusy(true);
      try {
        const response = await shellAdapter.createShell(threadId);
        setShellState((current) => ({
          ...response,
          shells: [...new Map([
            ...(current?.shells ?? []).map((shell) => [shell.id, shell]),
            ...(response.shells ?? (response.shell ? [response.shell] : [])).map((shell) => [shell.id, shell])
          ]).values()]
        }));
        const shellId = response.activeShellId ?? response.shell?.id ?? null;
        if (shellId) {
          const targetPaneId = splitMode === "columns" ? paneId : "primary";
          setPaneShell(targetPaneId, shellId);
          if (splitMode !== "columns") {
            setSecondaryShellId(null);
          }
          setActivePaneId(targetPaneId);
        }
        setError(null);
      } catch (caught) {
        setError(
          caught instanceof Error ? caught.message : "Unable to create shell."
        );
      } finally {
        createShellInFlightRef.current = false;
        setBusy(false);
      }
    },
    [activePaneId, setPaneShell, shellAdapter, splitMode, threadId]
  );
  useEffect24(() => {
    if (!isVisible || !shellState || loading || busy || workspacePathMissing || status === "creating" || liveShells.length > 0) {
      return;
    }
    void handleCreateShell("primary");
  }, [
    busy,
    handleCreateShell,
    isVisible,
    liveShells.length,
    loading,
    shellState,
    status,
    workspacePathMissing
  ]);
  const handleTerminateShell = useCallback16(
    async (shellId = activeShell?.id ?? "") => {
      if (!shellId) {
        return;
      }
      setBusy(true);
      try {
        await shellAdapter.terminateShell(shellId);
        setPrimaryShellId((current) => current === shellId ? null : current);
        setSecondaryShellId((current) => current === shellId ? null : current);
        await loadShellState();
        setError(null);
      } catch (caught) {
        setError(
          caught instanceof Error ? caught.message : "Unable to terminate shell."
        );
      } finally {
        setBusy(false);
      }
    },
    [activeShell?.id, loadShellState, shellAdapter]
  );
  const handleConnectionToggle = useCallback16(async () => {
    if (connectionButtonDisabled) {
      return;
    }
    if (activeRuntime.shellInputEnabled) {
      activePaneRef.current?.disconnect();
      return;
    }
    if (!activeShell || activeShell.status === "exited" || activeShell.status === "not_found") {
      await handleCreateShell(activePaneId);
      return;
    }
    await activePaneRef.current?.reconnect();
  }, [
    activePaneId,
    activePaneRef,
    activeRuntime.shellInputEnabled,
    activeShell,
    connectionButtonDisabled,
    handleCreateShell
  ]);
  const persistSplitRatio = useCallback16(
    (nextRatio) => {
      if (typeof window === "undefined") {
        return;
      }
      saveSplitRatio?.(threadId, clampPaneRatio(nextRatio));
    },
    [saveSplitRatio, threadId]
  );
  const refreshPaneLayouts = useCallback16(() => {
    primaryPaneRef.current?.refreshLayout({ syncBackendSize: true });
    secondaryPaneRef.current?.refreshLayout({ syncBackendSize: true });
  }, []);
  const handleSplitDividerPointerDown = useCallback16(
    (event) => {
      if (splitMode !== "columns") {
        return;
      }
      const host = terminalSplitHostRef.current;
      if (!host) {
        return;
      }
      event.preventDefault();
      event.currentTarget.setPointerCapture?.(event.pointerId);
      const updateRatioFromClientX = (clientX) => {
        const rect = host.getBoundingClientRect();
        if (rect.width <= 0) {
          return;
        }
        const nextRatio = clampPaneRatio((clientX - rect.left) / rect.width * 100);
        setSplitRatio(nextRatio);
        if (dragFrameRef.current !== null) {
          window.cancelAnimationFrame(dragFrameRef.current);
        }
        dragFrameRef.current = window.requestAnimationFrame(() => {
          dragFrameRef.current = null;
          refreshPaneLayouts();
        });
      };
      const handlePointerMove = (moveEvent) => {
        updateRatioFromClientX(moveEvent.clientX);
      };
      const handlePointerUp = (upEvent) => {
        updateRatioFromClientX(upEvent.clientX);
        const rect = host.getBoundingClientRect();
        if (rect.width > 0) {
          persistSplitRatio((upEvent.clientX - rect.left) / rect.width * 100);
        }
        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
      };
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp, { once: true });
    },
    [persistSplitRatio, refreshPaneLayouts, splitMode]
  );
  const handleAssignShellToPane = useCallback16(
    (shell, paneId) => {
      setPaneShell(paneId, shell.id);
      setActivePaneId(paneId);
    },
    [setPaneShell]
  );
  const handleCopyVisibleShellText = useCallback16(async () => {
    const copied = await activePaneRef.current?.copyLastCommandOutput();
    if (!copied) {
      setTransientToolboxFeedback("failed", "Nothing to copy");
      return false;
    }
    return true;
  }, [activePaneRef, setTransientToolboxFeedback]);
  useEffect24(() => {
    onStateChange?.(buildShellControlState({
      activeRuntime,
      activeShell,
      connectionButtonDisabled,
      connectionButtonLabel,
      isMobileShell,
      busy,
      loading,
      error
    }));
  }, [
    activeRuntime,
    activeShell,
    busy,
    connectionButtonDisabled,
    connectionButtonLabel,
    error,
    isMobileShell,
    loading,
    onStateChange
  ]);
  useImperativeHandle2(
    ref,
    () => ({
      async toggleConnection() {
        await handleConnectionToggle();
      },
      sendInput(data) {
        return activePaneRef.current?.sendInput(data) ?? false;
      },
      sendCommand(command) {
        return activePaneRef.current?.sendCommand(command) ?? false;
      },
      sendControl(action) {
        return activePaneRef.current?.sendControl(action) ?? false;
      },
      async copyLastCommandOutput() {
        return await activePaneRef.current?.copyLastCommandOutput() ?? false;
      },
      async terminate() {
        await handleTerminateShell();
      },
      focus() {
        activePaneRef.current?.focus();
      },
      refreshLayout(options) {
        primaryPaneRef.current?.refreshLayout(options);
        if (splitMode === "columns") {
          secondaryPaneRef.current?.refreshLayout(options);
        }
      }
    }),
    [activePaneRef, handleConnectionToggle, handleTerminateShell, splitMode]
  );
  const renderProcessRow = (shell) => /* @__PURE__ */ jsx51(
    "div",
    {
      className: `rounded-md border px-2 py-1.5 text-xs ${shell.id === activeShell?.id ? "border-sky-300/40 bg-sky-300/12 text-sky-50" : "border-stone-800 bg-stone-900/40 text-stone-300"}`,
      children: /* @__PURE__ */ jsxs43("div", { className: "flex items-center justify-between gap-2", children: [
        renamingShellId === shell.id ? /* @__PURE__ */ jsx51(
          "form",
          {
            className: "min-w-0 flex-1",
            onSubmit: (event) => {
              event.preventDefault();
              void handleSubmitRenameShell();
            },
            children: /* @__PURE__ */ jsx51(
              "input",
              {
                value: renameDraft,
                onChange: (event) => setRenameDraft(event.currentTarget.value),
                onKeyDown: (event) => {
                  if (event.key === "Escape") {
                    event.preventDefault();
                    handleCancelRenameShell();
                  }
                },
                autoFocus: true,
                className: "w-full rounded border border-sky-300/35 bg-stone-950/70 px-2 py-1 text-xs text-stone-100 outline-none",
                "aria-label": "Shell name"
              }
            )
          }
        ) : /* @__PURE__ */ jsxs43(
          "button",
          {
            type: "button",
            onClick: () => handleSelectShell(shell),
            onDoubleClick: () => handleStartRenameShell(shell),
            className: "min-w-0 flex-1 text-left",
            title: shell.tmuxSessionName,
            children: [
              /* @__PURE__ */ jsx51("span", { className: "block truncate", children: shellLabel(shell) }),
              /* @__PURE__ */ jsxs43("span", { className: "block truncate text-[10px] text-[var(--theme-fg-muted)]", children: [
                statusLabel2(shell.status),
                " \xB7 ",
                basenameFromPath(shell.cwd) || shell.cwd
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs43("div", { className: "flex shrink-0 items-center gap-1", children: [
          renamingShellId === shell.id ? /* @__PURE__ */ jsxs43(Fragment15, { children: [
            /* @__PURE__ */ jsx51(
              "button",
              {
                type: "button",
                onClick: () => void handleSubmitRenameShell(),
                className: "rounded border border-sky-300/35 bg-sky-300/12 px-1.5 py-1 text-[10px] text-sky-50",
                title: "Save shell name",
                children: "Save"
              }
            ),
            /* @__PURE__ */ jsx51(
              "button",
              {
                type: "button",
                onClick: handleCancelRenameShell,
                className: "rounded border border-stone-700 px-1.5 py-1 text-[10px] text-stone-200",
                title: "Cancel rename",
                children: "Cancel"
              }
            )
          ] }) : /* @__PURE__ */ jsx51(
            "button",
            {
              type: "button",
              onClick: () => handleStartRenameShell(shell),
              className: "rounded border border-stone-700 px-1.5 py-1 text-[10px] text-stone-200 hover:border-sky-300/40",
              title: "Rename shell",
              children: "Rename"
            }
          ),
          splitMode === "columns" && /* @__PURE__ */ jsxs43(Fragment15, { children: [
            /* @__PURE__ */ jsx51(
              "button",
              {
                type: "button",
                onClick: () => handleAssignShellToPane(shell, "primary"),
                className: "rounded border border-stone-700 px-1.5 py-1 text-[10px] text-stone-200 hover:border-sky-300/40",
                title: "Open in left pane",
                children: "L"
              }
            ),
            /* @__PURE__ */ jsx51(
              "button",
              {
                type: "button",
                onClick: () => handleAssignShellToPane(shell, "secondary"),
                className: "rounded border border-stone-700 px-1.5 py-1 text-[10px] text-stone-200 hover:border-sky-300/40",
                title: "Open in right pane",
                children: "R"
              }
            )
          ] }),
          /* @__PURE__ */ jsx51(
            "button",
            {
              type: "button",
              disabled: busy,
              onClick: () => void handleTerminateShell(shell.id),
              className: "rounded border border-rose-300/35 bg-rose-300/12 px-1.5 py-1 text-[10px] text-rose-100 disabled:cursor-not-allowed disabled:opacity-50",
              title: "Kill shell process",
              children: "Kill"
            }
          )
        ] })
      ] })
    },
    shell.id
  );
  return /* @__PURE__ */ jsxs43(
    "div",
    {
      ref: panelRef,
      className: `shell-panel shell-direct-input relative flex min-h-0 flex-1 flex-col ${isMobileShell ? "shell-is-mobile" : ""}`,
      style: keyboardLayout.height ? { height: keyboardLayout.height, flex: "0 0 auto" } : void 0,
      children: [
        showHeader && /* @__PURE__ */ jsxs43("div", { className: "shell-header shrink-0 border-b px-3 py-3 sm:px-5", children: [
          /* @__PURE__ */ jsxs43("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxs43("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx51("p", { className: "text-xs uppercase tracking-[0.24em] text-[var(--theme-fg-muted)]", children: "Shell" }),
              /* @__PURE__ */ jsx51("p", { className: "mt-1 truncate text-sm text-[var(--theme-fg-soft)]", children: activeRuntime.promptLabel ?? activeShell?.cwd ?? "Create a terminal for this thread." })
            ] }),
            /* @__PURE__ */ jsxs43("div", { className: "flex flex-wrap items-center gap-2", children: [
              /* @__PURE__ */ jsx51(
                "button",
                {
                  type: "button",
                  "aria-label": connectionButtonLabel,
                  title: `${connectionButtonLabel} (${statusLabel2(activeRuntime.status)})`,
                  disabled: connectionButtonDisabled,
                  onClick: () => void handleConnectionToggle(),
                  className: `inline-flex h-10 w-10 items-center justify-center rounded-full border shadow-lg shadow-stone-950/25 transition disabled:cursor-not-allowed disabled:opacity-60 ${connectionButtonClassName}`,
                  children: /* @__PURE__ */ jsx51(ConnectionIcon, { connected: activeRuntime.shellInputEnabled })
                }
              ),
              activeShell && /* @__PURE__ */ jsx51(
                "button",
                {
                  type: "button",
                  disabled: busy,
                  onClick: () => void handleTerminateShell(activeShell.id),
                  className: "rounded-full border border-rose-300/35 bg-rose-300/12 px-3 py-2 text-sm text-rose-600 transition hover:bg-rose-300/18 dark:text-rose-100 disabled:cursor-not-allowed disabled:opacity-60",
                  children: "Terminate"
                }
              )
            ] })
          ] }),
          (error || loading || workspacePathMissing) && /* @__PURE__ */ jsxs43("div", { className: "shell-banner mt-3 rounded-2xl border px-3 py-3 text-sm", children: [
            loading && /* @__PURE__ */ jsx51("p", { className: "text-[var(--theme-fg-muted)]", children: "Loading shell state..." }),
            !loading && workspacePathMissing && /* @__PURE__ */ jsx51("p", { className: "text-rose-600 dark:text-rose-100", children: "Workspace path is missing on this machine. Restore the path before creating a shell." }),
            !loading && error && /* @__PURE__ */ jsx51("p", { className: "text-amber-700 dark:text-amber-100", children: error })
          ] })
        ] }),
        /* @__PURE__ */ jsx51("div", { className: "min-h-0 flex-1", children: /* @__PURE__ */ jsxs43("div", { className: "flex h-full min-h-0 flex-col", children: [
          /* @__PURE__ */ jsxs43("div", { className: "shell-terminal-bar flex shrink-0 items-center gap-2 border-b px-2 py-2", children: [
            /* @__PURE__ */ jsxs43("div", { className: "flex min-w-0 flex-1 items-center gap-2 px-1", children: [
              /* @__PURE__ */ jsx51("span", { className: "min-w-0 truncate text-xs text-[var(--theme-fg-soft)]", children: activeShell ? shellLabel(activeShell) : "No live shell process" }),
              activeShell && /* @__PURE__ */ jsx51("span", { className: "shrink-0 text-[10px] uppercase tracking-[0.12em] text-[var(--theme-fg-muted)]", children: statusLabel2(activeRuntime.status) })
            ] }),
            /* @__PURE__ */ jsx51("div", { className: "flex shrink-0 items-center gap-1.5", children: /* @__PURE__ */ jsxs43("span", { className: "hidden text-xs text-[var(--theme-fg-muted)] sm:inline", children: [
              "Live ",
              liveShells.length
            ] }) })
          ] }),
          status === "not_created" || workspacePathMissing ? /* @__PURE__ */ jsx51("div", { className: "flex h-full items-center justify-center px-6 text-center", children: /* @__PURE__ */ jsxs43("div", { className: "shell-empty-state max-w-md rounded-[1.6rem] border px-6 py-8", children: [
            /* @__PURE__ */ jsx51("p", { className: "text-base font-medium text-[var(--theme-fg)]", children: "Durable thread shell" }),
            /* @__PURE__ */ jsx51("p", { className: "mt-3 text-sm leading-6 text-[var(--theme-fg-muted)]", children: "The shell runs under a supervisor-managed PTY and reconnects after browser disconnects. Create it explicitly when you want to inspect or take over the workspace." }),
            !workspacePathMissing && /* @__PURE__ */ jsx51(
              "button",
              {
                type: "button",
                disabled: busy || loading,
                onClick: () => void handleCreateShell("primary"),
                className: "mt-5 rounded-md border border-sky-300/35 bg-sky-300/12 px-3 py-2 text-sm text-sky-50 disabled:cursor-not-allowed disabled:opacity-50",
                children: "New Shell"
              }
            )
          ] }) }) : /* @__PURE__ */ jsxs43("div", { className: "grid h-full min-h-0 grid-cols-1 gap-2 p-2 sm:grid-cols-[minmax(0,1fr)_16rem] sm:p-3", children: [
            /* @__PURE__ */ jsxs43("div", { className: "shell-terminal-frame relative min-h-0 overflow-hidden rounded-[1.4rem] border shadow-inner", children: [
              !isMobileShell && onBackToChat && /* @__PURE__ */ jsx51("button", { type: "button", onClick: onBackToChat, className: "shell-chat-return", "aria-label": "Back to chat", title: "Back to chat", children: /* @__PURE__ */ jsx51(MessageSquare3, { size: 19 }) }),
              !showHeader && (error || loading || workspacePathMissing) && /* @__PURE__ */ jsxs43("div", { className: "shell-banner absolute left-2 right-2 top-2 z-10 rounded-2xl border px-3 py-3 text-sm backdrop-blur sm:left-3 sm:right-3 sm:top-3", children: [
                loading && /* @__PURE__ */ jsx51("p", { className: "text-[var(--theme-fg-muted)]", children: "Loading shell state..." }),
                !loading && workspacePathMissing && /* @__PURE__ */ jsx51("p", { className: "text-rose-600 dark:text-rose-100", children: "Workspace path is missing on this machine. Restore the path before creating a shell." }),
                !loading && error && /* @__PURE__ */ jsx51("p", { className: "text-amber-700 dark:text-amber-100", children: error })
              ] }),
              /* @__PURE__ */ jsxs43(
                "div",
                {
                  ref: terminalSplitHostRef,
                  className: `relative grid h-full min-h-0 ${splitMode === "columns" ? "grid-cols-1 sm:grid-cols-[var(--shell-left)_0.35rem_var(--shell-right)]" : "grid-cols-1"}`,
                  style: splitMode === "columns" ? {
                    "--shell-left": `${splitRatio}fr`,
                    "--shell-right": `${100 - splitRatio}fr`
                  } : void 0,
                  "data-shell-split-ratio": splitRatio,
                  children: [
                    /* @__PURE__ */ jsx51(
                      ShellPane,
                      {
                        ref: primaryPaneRef,
                        paneId: "primary",
                        shell: primaryShell,
                        isActive: activePaneId === "primary",
                        isVisible,
                        inputTransform: transformInput,
                        isMobileShell,
                        effectiveTheme,
                        workspacePathMissing,
                        shellAdapter,
                        onActivate: () => setActivePaneId("primary"),
                        onShellUpdate: updateShellEntry,
                        onRuntimeStateChange: handlePrimaryRuntimeStateChange,
                        onFeedback: setTransientToolboxFeedback
                      }
                    ),
                    splitMode === "columns" && /* @__PURE__ */ jsx51(
                      "button",
                      {
                        type: "button",
                        onClick: () => handleClosePane("primary"),
                        className: "absolute left-2 top-2 z-10 rounded-md border border-stone-700/80 bg-stone-950/70 px-2 py-1 text-[10px] text-stone-200 hover:border-rose-300/40",
                        title: "Close left pane",
                        children: "Close"
                      }
                    ),
                    splitMode === "columns" && /* @__PURE__ */ jsx51(
                      "button",
                      {
                        type: "button",
                        "aria-label": "Resize shell panes",
                        title: "Resize shell panes",
                        onPointerDown: handleSplitDividerPointerDown,
                        className: "hidden cursor-col-resize border-x border-stone-800/80 bg-stone-900/60 transition hover:border-sky-300/40 hover:bg-sky-300/10 sm:block"
                      }
                    ),
                    splitMode === "columns" && /* @__PURE__ */ jsxs43("div", { className: "relative min-h-0 border-t border-stone-800/80 sm:border-l sm:border-t-0", children: [
                      /* @__PURE__ */ jsx51(
                        ShellPane,
                        {
                          ref: secondaryPaneRef,
                          paneId: "secondary",
                          shell: secondaryShell,
                          isActive: activePaneId === "secondary",
                          isVisible,
                          inputTransform: transformInput,
                          isMobileShell,
                          effectiveTheme,
                          workspacePathMissing,
                          shellAdapter,
                          onActivate: () => setActivePaneId("secondary"),
                          onShellUpdate: updateShellEntry,
                          onRuntimeStateChange: handleSecondaryRuntimeStateChange,
                          onFeedback: setTransientToolboxFeedback
                        }
                      ),
                      /* @__PURE__ */ jsx51(
                        "button",
                        {
                          type: "button",
                          onClick: () => handleClosePane("secondary"),
                          className: "absolute left-2 top-2 z-10 rounded-md border border-stone-700/80 bg-stone-950/70 px-2 py-1 text-[10px] text-stone-200 hover:border-rose-300/40",
                          title: "Close right pane",
                          children: "Close"
                        }
                      )
                    ] })
                  ]
                }
              ),
              showFloatingToolbox && isMobileShell && /* @__PURE__ */ jsxs43("div", { className: "pointer-events-none absolute bottom-3 right-3 z-20 flex flex-col items-end gap-2", children: [
                toolboxFeedback && /* @__PURE__ */ jsx51(
                  "div",
                  {
                    className: `pointer-events-auto rounded-full border px-3 py-1.5 text-[11px] shadow-lg shadow-stone-950/30 backdrop-blur ${toolboxFeedbackToneClassName}`,
                    children: toolboxFeedback.text
                  }
                ),
                toolboxOpen && /* @__PURE__ */ jsx51("div", { className: "shell-toolbox pointer-events-auto rounded-[1.2rem] border p-2 shadow-2xl backdrop-blur", children: /* @__PURE__ */ jsxs43("div", { className: "grid grid-cols-2 gap-2", children: [
                  /* @__PURE__ */ jsx51(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        setTransientToolboxFeedback("idle", "Use the prompt box tools to paste");
                      },
                      className: "inline-flex items-center justify-center rounded-full border border-sky-300/35 bg-sky-300/12 px-2.5 py-2 text-sky-600 dark:text-sky-50",
                      children: /* @__PURE__ */ jsxs43("span", { className: "inline-flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsx51(ClipboardIcon2, {}),
                        /* @__PURE__ */ jsx51("span", { className: "text-[11px] font-medium tracking-[0.12em]", children: "Paste" })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsx51(
                    "button",
                    {
                      type: "button",
                      onClick: () => void handleCopyVisibleShellText(),
                      className: "shell-toolbox-copy inline-flex items-center justify-center rounded-full border px-2.5 py-2",
                      children: /* @__PURE__ */ jsxs43("span", { className: "inline-flex items-center gap-1.5", children: [
                        /* @__PURE__ */ jsx51(ClipboardIcon2, {}),
                        /* @__PURE__ */ jsx51("span", { className: "text-[11px] font-medium tracking-[0.12em]", children: "Copy" })
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsx51(
                    "button",
                    {
                      type: "button",
                      disabled: !activeRuntime.shellInputEnabled,
                      onClick: () => {
                        if (activePaneRef.current?.sendControl("clear")) {
                          setTransientToolboxFeedback("done", "Cleared");
                        } else {
                          setTransientToolboxFeedback("failed", "Connect the shell first");
                        }
                      },
                      className: "disabled:opacity-45",
                      children: /* @__PURE__ */ jsx51(ControlIcon, { label: "CLEAR", tone: "sky" })
                    }
                  ),
                  /* @__PURE__ */ jsx51(
                    "button",
                    {
                      type: "button",
                      disabled: !activeRuntime.shellInputEnabled || !activeRuntime.isCommandRunning,
                      onClick: () => {
                        if (activePaneRef.current?.sendInput("")) {
                          setTransientToolboxFeedback("done", "Sent Ctrl-C");
                        } else {
                          setTransientToolboxFeedback("failed", "Connect the shell first");
                        }
                      },
                      className: "disabled:opacity-45",
                      children: /* @__PURE__ */ jsx51(ControlIcon, { label: "CTRL-C", tone: "rose" })
                    }
                  ),
                  ["ctrl_d", "esc", "tab", "up", "down"].map((action) => /* @__PURE__ */ jsx51(
                    "button",
                    {
                      type: "button",
                      disabled: !activeRuntime.shellInputEnabled,
                      onClick: () => {
                        if (activePaneRef.current?.sendControl(action)) {
                          setTransientToolboxFeedback("done", `Sent ${action.toUpperCase().replace("_", "-")}`);
                        } else {
                          setTransientToolboxFeedback("failed", "Connect the shell first");
                        }
                      },
                      className: "disabled:opacity-45",
                      children: /* @__PURE__ */ jsx51(ControlIcon, { label: action.toUpperCase().replace("_", "-"), tone: "stone" })
                    },
                    action
                  ))
                ] }) }),
                /* @__PURE__ */ jsx51(
                  "button",
                  {
                    type: "button",
                    "aria-expanded": toolboxOpen,
                    "aria-label": toolboxOpen ? "Close shell tools" : "Open shell tools",
                    onClick: () => setToolboxOpen((current) => !current),
                    className: "shell-toolbox-trigger pointer-events-auto inline-flex h-11 w-11 items-center justify-center rounded-full border shadow-2xl backdrop-blur transition",
                    children: /* @__PURE__ */ jsx51(WrenchScrewdriverIcon2, {})
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs43("aside", { className: "hidden min-h-0 overflow-hidden rounded-[1rem] border border-stone-800/80 bg-stone-950/30 p-2 sm:flex sm:flex-col", children: [
              /* @__PURE__ */ jsxs43("div", { className: "mb-2 flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ jsx51("p", { className: "text-xs uppercase tracking-[0.16em] text-[var(--theme-fg-muted)]", children: "Processes" }),
                /* @__PURE__ */ jsxs43("span", { className: "text-[10px] text-[var(--theme-fg-muted)]", children: [
                  liveShells.length,
                  " live"
                ] })
              ] }),
              /* @__PURE__ */ jsxs43("div", { className: "min-h-0 flex-1 space-y-1 overflow-y-auto", children: [
                liveShells.map(renderProcessRow),
                liveShells.length === 0 && /* @__PURE__ */ jsx51("p", { className: "px-2 py-3 text-xs text-[var(--theme-fg-muted)]", children: "No live shell processes" })
              ] }),
              /* @__PURE__ */ jsx51("div", { className: "mt-2 flex justify-end border-t border-stone-800/80 pt-2", children: /* @__PURE__ */ jsx51(
                "button",
                {
                  type: "button",
                  "aria-label": "New shell",
                  title: "New shell",
                  disabled: busy || loading || workspacePathMissing,
                  onClick: () => void handleCreateShell(activePaneId),
                  className: "inline-flex h-8 w-8 items-center justify-center rounded-md border border-sky-300/35 bg-sky-300/12 text-base leading-none text-sky-50 disabled:cursor-not-allowed disabled:opacity-50",
                  children: "+"
                }
              ) })
            ] })
          ] })
        ] }) }),
        isMobileShell && /* @__PURE__ */ jsx51(
          ShellTouchControls,
          {
            inset: keyboardLayout.inset,
            enabled: activeRuntime.shellInputEnabled,
            ctrl: ctrlPressed,
            onCtrl: () => {
              ctrlRef.current = !ctrlRef.current;
              setCtrlPressed(ctrlRef.current);
            },
            onInput: (data) => {
              activePaneRef.current?.sendInput(transformInput(data));
            },
            onFocus: () => activePaneRef.current?.focus(),
            onChat: onBackToChat,
            onRename: async (shell, label) => {
              const updated = await shellAdapter.updateShell(shell.id, { label: label || null });
              updateShellEntry(shell.id, () => updated);
            },
            onKill: handleTerminateShell,
            sessions: liveShells,
            activeId: activeShell?.id,
            onSelect: handleSelectShell,
            onCreate: () => void handleCreateShell(activePaneId),
            busy: busy || loading || workspacePathMissing
          }
        )
      ]
    }
  );
});

// src/components/ThreadGraphWorkspacePanelLazy.tsx
import {
  lazy,
  memo as memo7,
  Suspense
} from "react";
import { jsx as jsx52 } from "react/jsx-runtime";
var LazyThreadGraphWorkspacePanel = lazy(async () => {
  const module = await import("./workspace-panel.js");
  return { default: module.ThreadGraphWorkspacePanel };
});
function ThreadGraphWorkspaceLoadingFallback() {
  return /* @__PURE__ */ jsx52("div", { className: "flex h-full min-h-0 flex-1 items-center justify-center px-4 text-sm text-[var(--theme-fg-muted)]", children: "Loading workspace..." });
}
function ThreadGraphWorkspacePanel(props) {
  return /* @__PURE__ */ jsx52(Suspense, { fallback: /* @__PURE__ */ jsx52(ThreadGraphWorkspaceLoadingFallback, {}), children: /* @__PURE__ */ jsx52(LazyThreadGraphWorkspacePanel, { ...props }) });
}
var MemoizedThreadGraphWorkspacePanel = memo7(
  ThreadGraphWorkspacePanel
);

// src/components/ConfirmDialog.tsx
import { useEffect as useEffect25 } from "react";
import { createPortal as createPortal3 } from "react-dom";
import { jsx as jsx53, jsxs as jsxs44 } from "react/jsx-runtime";
function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Delete",
  busyLabel = "Deleting...",
  busy = false,
  onCancel,
  onConfirm
}) {
  useEffect25(() => {
    if (!open) {
      return;
    }
    function handleKeyDown(event) {
      if (event.key === "Escape" && !busy) {
        onCancel();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [busy, onCancel, open]);
  if (!open) {
    return null;
  }
  return createPortal3(
    /* @__PURE__ */ jsxs44("div", { className: "fixed inset-0 z-[95] flex items-center justify-center p-4 sm:p-6", children: [
      /* @__PURE__ */ jsx53(
        "button",
        {
          type: "button",
          "aria-label": "Close confirmation dialog",
          onClick: onCancel,
          disabled: busy,
          className: "absolute inset-0 bg-stone-950/78 backdrop-blur-sm disabled:cursor-not-allowed"
        }
      ),
      /* @__PURE__ */ jsxs44(
        "div",
        {
          role: "dialog",
          "aria-modal": "true",
          "aria-label": title,
          className: "relative z-[1] w-full max-w-md rounded-[1.6rem] border border-stone-700 bg-stone-900 p-5 shadow-2xl shadow-stone-950/40 sm:p-6",
          children: [
            /* @__PURE__ */ jsxs44("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxs44("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsx53("p", { className: "text-sm font-medium text-stone-100", children: title }),
                /* @__PURE__ */ jsx53("p", { className: "mt-2 text-sm leading-6 text-stone-400", children: description })
              ] }),
              /* @__PURE__ */ jsx53(
                "button",
                {
                  type: "button",
                  "aria-label": "Close dialog",
                  onClick: onCancel,
                  disabled: busy,
                  className: "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-700 text-stone-300 transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60",
                  children: /* @__PURE__ */ jsx53("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", className: "h-4 w-4 fill-current", children: /* @__PURE__ */ jsx53("path", { d: "M3.22 2.47 8 7.25l4.78-4.78 1.06 1.06L9.06 8.31l4.78 4.78-1.06 1.06L8 9.37l-4.78 4.78-1.06-1.06 4.78-4.78-4.78-4.78 1.06-1.06Z" }) })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs44("div", { className: "mt-5 flex items-center justify-end gap-2", children: [
              /* @__PURE__ */ jsx53(
                "button",
                {
                  type: "button",
                  onClick: onCancel,
                  disabled: busy,
                  className: "rounded-full border border-stone-700 px-4 py-2 text-sm font-medium text-stone-300 transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsx53(
                "button",
                {
                  type: "button",
                  onClick: () => void onConfirm(),
                  disabled: busy,
                  className: "ui-action-danger rounded-full px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed",
                  children: busy ? busyLabel : confirmLabel
                }
              )
            ] })
          ]
        }
      )
    ] }),
    document.body
  );
}

// src/components/ExportTranscriptDialog.tsx
import { Users, Link2, FileCode, Pencil as Pencil3 } from "lucide-react";
import { useEffect as useEffect26, useMemo as useMemo11, useState as useState33 } from "react";
import { createPortal as createPortal4 } from "react-dom";
import { Fragment as Fragment16, jsx as jsx54, jsxs as jsxs45 } from "react/jsx-runtime";
function formatTurnTime(value) {
  if (!value) {
    return "No time";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}
function statusLabel3(status) {
  switch (status) {
    case "inProgress":
      return "running";
    case "completed":
      return "completed";
    case "interrupted":
      return "interrupted";
    case "failed":
      return "failed";
  }
}
function turnSelectionLabel(mode) {
  switch (mode) {
    case "latest-3":
      return "Latest 3";
    case "latest-10":
      return "Latest 10";
    case "latest-20":
      return "Latest 20";
    case "all-loaded":
      return "All loaded";
    case "custom":
      return "Custom";
  }
}
function latestLimit(mode) {
  switch (mode) {
    case "latest-3":
      return 3;
    case "latest-10":
      return 10;
    case "latest-20":
      return 20;
    default:
      return null;
  }
}
function shareThreadAccessLabel(access) {
  return access === "read" ? "View only" : "Collaborator";
}
function shareWorkspaceAccessLabel(access) {
  switch (access) {
    case "write":
      return "Workspace write";
    case "read":
      return "Workspace read";
    case "none":
    default:
      return "No workspace";
  }
}
function ThreadActionsDialog({
  open,
  busy = false,
  turnsState,
  shareAvailable = false,
  shareUnavailableMessage = "Relay sharing will be enabled after the relay permission model is connected.",
  shareState,
  initialMode = "html",
  onCancel,
  onLoadTurns,
  onExport,
  onCreateShare,
  onRevokeShare,
  onOpenDeviceSharing,
  linkContent,
  onUpdateShare
}) {
  const turns = useMemo11(() => turnsState.data?.turns ?? [], [turnsState.data?.turns]);
  const [actionMode, setActionMode] = useState33(initialMode);
  const [turnSelection, setTurnSelection] = useState33("latest-10");
  const [selectedTurnIds, setSelectedTurnIds] = useState33(
    () => /* @__PURE__ */ new Set()
  );
  const [includeTokenAndPrice, setIncludeTokenAndPrice] = useState33(true);
  const [targetIdentifier, setTargetIdentifier] = useState33("");
  const [threadAccess, setThreadAccess] = useState33("read");
  const [workspaceAccess, setWorkspaceAccess] = useState33("none");
  const [shareLabel, setShareLabel] = useState33("");
  const [editingShare, setEditingShare] = useState33(null);
  const [effectiveTheme, setEffectiveTheme] = useState33(
    () => typeof document !== "undefined" && !document.documentElement.classList.contains("dark") ? "light" : "dark"
  );
  useEffect26(() => {
    if (!open) {
      return;
    }
    setActionMode(initialMode);
    setTurnSelection("latest-10");
    setIncludeTokenAndPrice(true);
    setTargetIdentifier("");
    setThreadAccess("read");
    setWorkspaceAccess("none");
    setShareLabel("");
    setEditingShare(null);
    void onLoadTurns();
  }, [initialMode, onLoadTurns, open]);
  useEffect26(() => {
    if (open && turns.length > 0) {
      setSelectedTurnIds(new Set(turns.slice(0, 10).map((turn) => turn.turnId)));
    }
  }, [open, turns]);
  useEffect26(() => {
    if (!open) {
      return;
    }
    function handleKeyDown(event) {
      if (event.key === "Escape" && !busy) {
        onCancel();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [busy, onCancel, open]);
  useEffect26(() => {
    if (!open) {
      return;
    }
    const shell = document.querySelector(".thread-ui-shell");
    const readTheme = () => {
      if (!shell) {
        return document.documentElement.classList.contains("dark") ? "dark" : "light";
      }
      return shell.getAttribute("data-theme-effective") === "dark" || shell.classList.contains("dark") || shell.classList.contains("thread-ui-theme-dark") ? "dark" : "light";
    };
    setEffectiveTheme(readTheme());
    if (!shell) {
      return;
    }
    const observer = new MutationObserver(() => setEffectiveTheme(readTheme()));
    observer.observe(shell, {
      attributes: true,
      attributeFilter: ["class", "data-theme-effective"]
    });
    return () => observer.disconnect();
  }, [open]);
  if (!open) {
    return null;
  }
  const latestSelectedLimit = latestLimit(turnSelection);
  const selectedCount = latestSelectedLimit !== null ? Math.min(latestSelectedLimit, turnsState.data?.totalTurnCount ?? latestSelectedLimit) : turnSelection === "all-loaded" ? turns.length : selectedTurnIds.size;
  const canExport = !busy && actionMode !== "share" && actionMode !== "link" && (latestSelectedLimit !== null || turnSelection === "all-loaded" || selectedTurnIds.size > 0);
  const canShare = !busy && shareAvailable && Boolean(editingShare ? onUpdateShare : onCreateShare) && targetIdentifier.trim().length > 0;
  function toggleTurn(turnId) {
    setSelectedTurnIds((current) => {
      const next = new Set(current);
      if (next.has(turnId)) {
        next.delete(turnId);
      } else {
        next.add(turnId);
      }
      return next;
    });
  }
  function handleExport() {
    if (actionMode === "share" || actionMode === "link") {
      return;
    }
    const input = {
      format: actionMode,
      ...latestSelectedLimit !== null ? { mode: "latest", limit: latestSelectedLimit } : turnSelection === "all-loaded" ? { mode: "selected", turnIds: turns.map((turn) => turn.turnId) } : { mode: "selected", turnIds: [...selectedTurnIds] },
      profile: "review",
      options: {
        includeTokenAndPrice
      }
    };
    void onExport(input);
  }
  function handleShare(event) {
    event.preventDefault();
    if (!canShare) {
      return;
    }
    const submit = editingShare ? (input) => onUpdateShare?.(editingShare, input) : onCreateShare;
    void Promise.resolve(submit?.({
      targetIdentifier: targetIdentifier.trim(),
      threadAccess,
      workspaceAccess,
      label: shareLabel.trim() || null
    })).then(() => {
      setEditingShare(null);
      setTargetIdentifier("");
    }).catch(() => {
    });
  }
  const actionTabs = [
    { mode: "share", label: "People" },
    ...linkContent ? [{ mode: "link", label: "Share as link" }] : [],
    { mode: "html", label: "HTML" }
  ];
  return createPortal4(
    /* @__PURE__ */ jsxs45(
      "div",
      {
        className: `thread-export-dialog-root thread-ui-theme-${effectiveTheme} fixed inset-0 z-[96] flex items-end justify-center p-0 sm:items-center sm:p-6`,
        "data-theme-effective": effectiveTheme,
        children: [
          /* @__PURE__ */ jsx54(
            "button",
            {
              type: "button",
              "aria-label": "Close thread actions",
              onClick: onCancel,
              disabled: busy,
              className: "thread-export-dialog-backdrop absolute inset-0 backdrop-blur-sm disabled:cursor-not-allowed"
            }
          ),
          /* @__PURE__ */ jsxs45(
            "div",
            {
              role: "dialog",
              "aria-modal": "true",
              "aria-label": "Thread actions",
              className: "thread-export-dialog-panel relative z-[1] flex max-h-[min(48rem,calc(100vh-1rem))] w-full max-w-2xl flex-col rounded-t-[1.6rem] border shadow-2xl sm:rounded-[1.6rem]",
              children: [
                /* @__PURE__ */ jsxs45("div", { className: "thread-export-dialog-header flex items-start justify-between gap-3 border-b px-5 py-4", children: [
                  /* @__PURE__ */ jsxs45("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsx54("p", { className: "thread-export-dialog-title text-sm font-semibold", children: "Share & export" }),
                    /* @__PURE__ */ jsx54("p", { className: "thread-export-dialog-subtitle mt-1 text-xs", children: "Manage access or save a copy." })
                  ] }),
                  /* @__PURE__ */ jsx54(
                    "button",
                    {
                      type: "button",
                      "aria-label": "Close dialog",
                      onClick: onCancel,
                      disabled: busy,
                      className: "thread-export-dialog-icon-button inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition disabled:cursor-not-allowed disabled:opacity-60",
                      children: /* @__PURE__ */ jsx54("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", className: "h-4 w-4 fill-current", children: /* @__PURE__ */ jsx54("path", { d: "M3.22 2.47 8 7.25l4.78-4.78 1.06 1.06L9.06 8.31l4.78 4.78-1.06 1.06L8 9.37l-4.78 4.78-1.06-1.06 4.78-4.78-4.78-4.78 1.06-1.06Z" }) })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs45("div", { className: "min-h-0 flex-1 overflow-auto px-5 py-4", children: [
                  /* @__PURE__ */ jsx54("div", { className: "thread-export-dialog-segment inline-flex rounded-full border p-1", children: actionTabs.map((tab) => /* @__PURE__ */ jsxs45(
                    "button",
                    {
                      type: "button",
                      onClick: () => setActionMode(tab.mode),
                      className: `inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition ${actionMode === tab.mode ? "ui-status-warning" : "thread-export-dialog-muted-action"}`,
                      children: [
                        tab.mode === "share" ? /* @__PURE__ */ jsx54(Users, { size: 16 }) : tab.mode === "link" ? /* @__PURE__ */ jsx54(Link2, { size: 16 }) : /* @__PURE__ */ jsx54(FileCode, { size: 16 }),
                        /* @__PURE__ */ jsx54("span", { children: tab.label })
                      ]
                    },
                    tab.mode
                  )) }),
                  actionMode === "link" ? linkContent : actionMode === "share" ? /* @__PURE__ */ jsxs45("form", { id: "thread-actions-share-form", className: "mt-4 space-y-4", onSubmit: handleShare, children: [
                    /* @__PURE__ */ jsxs45("div", { className: "thread-export-dialog-box rounded-2xl border", children: [
                      /* @__PURE__ */ jsxs45("div", { className: "thread-export-dialog-box-header flex items-center justify-between border-b px-3 py-2.5", children: [
                        /* @__PURE__ */ jsx54("p", { className: "thread-export-dialog-strong text-sm font-medium", children: "People with access" }),
                        /* @__PURE__ */ jsx54("span", { className: "thread-export-dialog-status-pill rounded-full border px-2 py-0.5 text-[10px]", children: shareState?.shares.length ?? 0 })
                      ] }),
                      shareState?.status === "failed" ? /* @__PURE__ */ jsx54("p", { className: "px-3 py-3 text-sm text-rose-500 dark:text-rose-200", children: shareState.error }) : shareState?.shares.length ? /* @__PURE__ */ jsx54("div", { className: "divide-y", children: shareState.shares.map((share) => /* @__PURE__ */ jsxs45("div", { className: "flex flex-wrap items-center justify-between gap-2 px-3 py-2.5 text-sm", children: [
                        /* @__PURE__ */ jsxs45("div", { className: "min-w-0", children: [
                          /* @__PURE__ */ jsx54("p", { className: "thread-export-dialog-strong truncate font-medium", children: share.targetUsername }),
                          /* @__PURE__ */ jsxs45("p", { className: "thread-export-dialog-subtitle mt-0.5 text-xs", children: [
                            share.label ? `${share.label} \xB7 ` : "",
                            shareThreadAccessLabel(share.threadAccess),
                            " / ",
                            shareWorkspaceAccessLabel(share.workspaceAccess)
                          ] })
                        ] }),
                        onUpdateShare && /* @__PURE__ */ jsxs45("button", { type: "button", "aria-label": `Edit permissions for ${share.targetUsername}`, className: "thread-export-dialog-secondary-button ml-auto flex items-center gap-1 rounded-lg border px-2 py-1.5 text-xs", disabled: busy, onClick: () => {
                          setEditingShare(share.id);
                          setTargetIdentifier(share.targetUsername);
                          setThreadAccess(share.threadAccess ?? "read");
                          setWorkspaceAccess(share.workspaceAccess ?? "none");
                          setShareLabel(share.label ?? "");
                        }, children: [
                          /* @__PURE__ */ jsx54(Pencil3, { size: 13 }),
                          "Edit"
                        ] }),
                        onRevokeShare ? /* @__PURE__ */ jsx54(
                          "button",
                          {
                            type: "button",
                            className: "thread-export-dialog-secondary-button rounded-full border px-3 py-1.5 text-xs transition",
                            disabled: busy,
                            onClick: () => void onRevokeShare(share.id),
                            children: "Revoke"
                          }
                        ) : null
                      ] }, share.id)) }) : /* @__PURE__ */ jsx54("p", { className: "thread-export-dialog-subtitle px-3 py-3 text-sm", children: "No active shares for this thread." })
                    ] }),
                    !shareAvailable ? /* @__PURE__ */ jsx54("p", { className: "thread-export-dialog-box thread-export-dialog-subtitle rounded-2xl border px-3 py-3 text-sm", children: shareUnavailableMessage }) : null,
                    shareAvailable && onOpenDeviceSharing ? /* @__PURE__ */ jsxs45("div", { className: "thread-export-dialog-box flex flex-wrap items-center justify-between gap-3 rounded-2xl border px-3 py-3", children: [
                      /* @__PURE__ */ jsxs45("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsx54("p", { className: "thread-export-dialog-strong text-sm font-medium", children: "Share this thread" }),
                        /* @__PURE__ */ jsx54("p", { className: "thread-export-dialog-subtitle mt-1 text-xs", children: "Need broader access? Share the whole device from Relay Portal." })
                      ] }),
                      /* @__PURE__ */ jsx54(
                        "button",
                        {
                          type: "button",
                          className: "thread-export-dialog-secondary-button rounded-full border px-3 py-1.5 text-xs font-medium transition",
                          disabled: busy,
                          onClick: onOpenDeviceSharing,
                          children: "Share whole device"
                        }
                      )
                    ] }) : null,
                    /* @__PURE__ */ jsxs45("label", { className: "thread-export-dialog-body-text block text-sm", children: [
                      editingShare ? "Edit member permissions" : "Invite someone",
                      /* @__PURE__ */ jsx54(
                        "input",
                        {
                          className: "thread-export-dialog-box mt-2 w-full rounded-xl border bg-transparent px-3 py-2 outline-none",
                          disabled: !shareAvailable || busy,
                          onChange: (event) => setTargetIdentifier(event.target.value),
                          readOnly: Boolean(editingShare),
                          placeholder: "username or email",
                          value: targetIdentifier
                        }
                      )
                    ] }),
                    editingShare && /* @__PURE__ */ jsx54("button", { type: "button", className: "thread-export-dialog-muted-action text-xs", onClick: () => {
                      setEditingShare(null);
                      setTargetIdentifier("");
                      setThreadAccess("read");
                      setWorkspaceAccess("none");
                      setShareLabel("");
                    }, children: "Cancel editing" }),
                    /* @__PURE__ */ jsxs45("fieldset", { className: "thread-export-dialog-box rounded-2xl border p-3", children: [
                      /* @__PURE__ */ jsx54("legend", { className: "thread-export-dialog-subtitle px-1 text-xs", children: "Thread access" }),
                      /* @__PURE__ */ jsx54("div", { className: "mt-2 grid gap-2 sm:grid-cols-2", children: [
                        ["read", "View only"],
                        ["control", "Collaborator"]
                      ].map(([value, label]) => /* @__PURE__ */ jsxs45("label", { className: "thread-export-dialog-turn-row flex items-center gap-2 rounded-xl px-2.5 py-2 text-sm", children: [
                        /* @__PURE__ */ jsx54(
                          "input",
                          {
                            type: "radio",
                            checked: threadAccess === value,
                            disabled: !shareAvailable || busy,
                            onChange: () => setThreadAccess(value)
                          }
                        ),
                        label
                      ] }, value)) })
                    ] }),
                    /* @__PURE__ */ jsxs45("fieldset", { className: "thread-export-dialog-box rounded-2xl border p-3", children: [
                      /* @__PURE__ */ jsx54("legend", { className: "thread-export-dialog-subtitle px-1 text-xs", children: "Workspace" }),
                      /* @__PURE__ */ jsx54("div", { className: "mt-2 grid gap-2 sm:grid-cols-3", children: [
                        ["none", "No access"],
                        ["read", "Read files"],
                        ["write", "Read and edit"]
                      ].map(([value, label]) => /* @__PURE__ */ jsxs45("label", { className: "thread-export-dialog-turn-row flex items-center gap-2 rounded-xl px-2.5 py-2 text-sm", children: [
                        /* @__PURE__ */ jsx54(
                          "input",
                          {
                            type: "radio",
                            checked: workspaceAccess === value,
                            disabled: !shareAvailable || busy,
                            onChange: () => setWorkspaceAccess(value)
                          }
                        ),
                        label
                      ] }, value)) })
                    ] }),
                    /* @__PURE__ */ jsxs45("label", { className: "thread-export-dialog-body-text block text-sm", children: [
                      "Label",
                      /* @__PURE__ */ jsx54(
                        "input",
                        {
                          className: "thread-export-dialog-box mt-2 w-full rounded-xl border bg-transparent px-3 py-2 outline-none",
                          disabled: !shareAvailable || busy,
                          onChange: (event) => setShareLabel(event.target.value),
                          placeholder: "optional",
                          value: shareLabel
                        }
                      )
                    ] })
                  ] }) : /* @__PURE__ */ jsxs45(Fragment16, { children: [
                    /* @__PURE__ */ jsxs45("label", { className: "thread-export-dialog-body-text mt-4 block text-sm", children: [
                      "Turns",
                      /* @__PURE__ */ jsx54(
                        "select",
                        {
                          className: "thread-export-dialog-box mt-2 w-full rounded-xl border bg-transparent px-3 py-2 outline-none",
                          value: turnSelection,
                          onChange: (event) => setTurnSelection(event.target.value),
                          children: ["latest-3", "latest-10", "latest-20", "all-loaded", "custom"].map((entry) => /* @__PURE__ */ jsx54("option", { value: entry, children: turnSelectionLabel(entry) }, entry))
                        }
                      )
                    ] }),
                    turnSelection === "custom" ? /* @__PURE__ */ jsxs45("div", { className: "thread-export-dialog-box mt-4 rounded-2xl border", children: [
                      /* @__PURE__ */ jsxs45("div", { className: "thread-export-dialog-box-header flex flex-wrap items-center justify-between gap-2 border-b px-3 py-2.5", children: [
                        /* @__PURE__ */ jsxs45("p", { className: "thread-export-dialog-subtitle text-xs", children: [
                          "Selected ",
                          selectedTurnIds.size,
                          " of ",
                          turnsState.data?.totalTurnCount ?? turns.length
                        ] }),
                        /* @__PURE__ */ jsxs45("div", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsx54(
                            "button",
                            {
                              type: "button",
                              onClick: () => setSelectedTurnIds(new Set(turns.map((turn) => turn.turnId))),
                              className: "thread-export-dialog-secondary-button rounded-full border px-2.5 py-1 text-xs transition",
                              children: "Select all"
                            }
                          ),
                          /* @__PURE__ */ jsx54(
                            "button",
                            {
                              type: "button",
                              onClick: () => setSelectedTurnIds(/* @__PURE__ */ new Set()),
                              className: "thread-export-dialog-secondary-button rounded-full border px-2.5 py-1 text-xs transition",
                              children: "Clear"
                            }
                          )
                        ] })
                      ] }),
                      turnsState.status === "loading" ? /* @__PURE__ */ jsx54("p", { className: "thread-export-dialog-subtitle px-3 py-6 text-sm", children: "Loading turns..." }) : turnsState.status === "failed" ? /* @__PURE__ */ jsx54("p", { className: "px-3 py-6 text-sm text-rose-500 dark:text-rose-200", children: turnsState.error }) : /* @__PURE__ */ jsx54("div", { className: "max-h-80 overflow-auto p-2", children: turns.map((turn) => /* @__PURE__ */ jsxs45(
                        "label",
                        {
                          className: "thread-export-dialog-turn-row flex cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 text-sm transition",
                          children: [
                            /* @__PURE__ */ jsx54(
                              "input",
                              {
                                type: "checkbox",
                                checked: selectedTurnIds.has(turn.turnId),
                                onChange: () => toggleTurn(turn.turnId),
                                className: "thread-export-dialog-checkbox h-4 w-4"
                              }
                            ),
                            /* @__PURE__ */ jsxs45("span", { className: "thread-export-dialog-strong shrink-0 text-xs font-medium", children: [
                              "Turn ",
                              turn.turnNumber
                            ] }),
                            /* @__PURE__ */ jsx54("span", { className: "thread-export-dialog-subtitle shrink-0 text-xs", children: formatTurnTime(turn.startedAt) }),
                            /* @__PURE__ */ jsx54("span", { className: "thread-export-dialog-body-text min-w-0 flex-1 truncate text-left", children: turn.userPromptPreview }),
                            /* @__PURE__ */ jsx54("span", { className: "thread-export-dialog-status-pill hidden shrink-0 rounded-full border px-2 py-0.5 text-[10px] sm:inline", children: statusLabel3(turn.status) })
                          ]
                        },
                        turn.turnId
                      )) })
                    ] }) : null,
                    /* @__PURE__ */ jsxs45("div", { className: "thread-export-dialog-body-text mt-4 grid gap-2 text-sm sm:grid-cols-2", children: [
                      /* @__PURE__ */ jsxs45("label", { className: "thread-export-dialog-box flex items-center gap-2 rounded-xl border px-3 py-2", children: [
                        /* @__PURE__ */ jsx54(
                          "input",
                          {
                            type: "checkbox",
                            checked: includeTokenAndPrice,
                            onChange: (event) => setIncludeTokenAndPrice(event.target.checked),
                            className: "thread-export-dialog-checkbox h-4 w-4"
                          }
                        ),
                        "Token and price"
                      ] }),
                      /* @__PURE__ */ jsx54("p", { className: "thread-export-dialog-box thread-export-dialog-subtitle flex items-center rounded-xl border px-3 py-2 text-xs", children: "HTML keeps the chat styling and omits tool activity." })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs45("div", { className: "thread-export-dialog-footer flex items-center justify-between gap-3 border-t px-5 py-4", children: [
                  /* @__PURE__ */ jsx54("p", { className: "thread-export-dialog-subtitle min-w-0 text-xs", children: actionMode === "link" ? "Read-only \xB7 No login required" : actionMode === "share" ? shareAvailable ? "Only invited members can access this thread." : "Share permissions are not wired yet." : `${selectedCount} ${selectedCount === 1 ? "turn" : "turns"} selected.` }),
                  /* @__PURE__ */ jsxs45("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsx54(
                      "button",
                      {
                        type: "button",
                        onClick: onCancel,
                        disabled: busy,
                        className: "thread-export-dialog-secondary-button rounded-full border px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60",
                        children: "Cancel"
                      }
                    ),
                    actionMode === "link" ? null : actionMode === "share" ? /* @__PURE__ */ jsx54(
                      "button",
                      {
                        type: "submit",
                        form: "thread-actions-share-form",
                        disabled: !canShare,
                        className: "ui-status-warning rounded-full px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60",
                        children: busy ? "Saving..." : editingShare ? "Save permissions" : "Share this thread"
                      }
                    ) : /* @__PURE__ */ jsx54(
                      "button",
                      {
                        type: "button",
                        onClick: handleExport,
                        disabled: !canExport,
                        className: "ui-status-warning rounded-full px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60",
                        children: busy ? "Exporting..." : `Export ${actionMode.toUpperCase()}`
                      }
                    )
                  ] })
                ] })
              ]
            }
          )
        ]
      }
    ),
    document.body
  );
}
var ExportTranscriptDialog = ThreadActionsDialog;

// src/ThreadDetailSurface.tsx
import {
  useMemo as useMemo13
} from "react";

// src/components/graph-chat/GraphChatThreadChatPanel.tsx
import {
  useCallback as useCallback17,
  useEffect as useEffect27,
  useLayoutEffect as useLayoutEffect8,
  useMemo as useMemo12,
  useRef as useRef21,
  useState as useState34
} from "react";
import { jsx as jsx55, jsxs as jsxs46 } from "react/jsx-runtime";
function GraphChatThreadChatPanel({
  detail,
  adapter,
  timelineAdapter,
  TimelineComponent = ThreadTimeline,
  liveOutput = "",
  beforeTimelineContent,
  composerProps,
  timelineProps,
  transcriptItemCount,
  useFloatingMobileComposer = false,
  floatingMobileComposerBottomOffset = 0,
  composerHostRef
}) {
  const [isMobileViewport, setIsMobileViewport] = useState34(false);
  const [mobileComposerHeight, setMobileComposerHeight] = useState34(0);
  const [mobileComposerOverlap, setMobileComposerOverlap] = useState34(0);
  const [mobileKeyboardInset, setMobileKeyboardInset] = useState34(0);
  const [mobilePromptFocused, setMobilePromptFocused] = useState34(false);
  const internalComposerHostRef = useRef21(null);
  const timelineTailVisibilityChange = timelineProps?.onTailVisibilityChange;
  const hasPendingRequests = detail.pendingRequests.length > 0;
  const queuedPrompts = useMemo12(() => {
    const pendingSteers = detail.pendingSteers ?? [];
    const materializedClientRequestIds = new Set(
      pendingSteers.map((prompt) => prompt.clientRequestId).filter((value) => Boolean(value))
    );
    return [
      ...pendingSteers.filter((prompt) => prompt.delivery === "continuation").map((prompt) => ({
        id: prompt.id,
        prompt: prompt.prompt,
        ...prompt.id.startsWith("optimistic-") ? { optimistic: true } : {}
      })),
      ...(timelineProps?.optimisticSteers ?? []).filter(
        (prompt) => !materializedClientRequestIds.has(prompt.clientRequestId)
      ).map((prompt) => ({
        id: prompt.id,
        prompt: prompt.prompt,
        optimistic: true
      }))
    ];
  }, [detail.pendingSteers, timelineProps?.optimisticSteers]);
  const steeredPrompts = useMemo12(
    () => (detail.pendingSteers ?? []).filter(
      (prompt) => prompt.delivery === "steer"
    ),
    [detail.pendingSteers]
  );
  const resolvedComposerProps = useMemo12(
    () => composerProps ? {
      ...composerProps,
      pendingPrompts: queuedPrompts,
      ...adapter.steerPendingPrompt && composerProps.capabilities?.turns.steer ? {
        onSteerPendingPrompt: (pendingPromptId) => adapter.steerPendingPrompt?.(
          detail.thread.id,
          pendingPromptId
        )
      } : {},
      ...adapter.cancelPendingSteer ? {
        onCancelPendingPrompt: (pendingPromptId) => adapter.cancelPendingSteer?.(
          detail.thread.id,
          pendingPromptId
        )
      } : {}
    } : null,
    [
      adapter.cancelPendingSteer,
      adapter.steerPendingPrompt,
      composerProps,
      detail.thread.id,
      queuedPrompts
    ]
  );
  const handleTailVisibilityChange = useCallback17(
    (nextIsTailVisible) => {
      timelineTailVisibilityChange?.(nextIsTailVisible);
    },
    [timelineTailVisibilityChange]
  );
  useEffect27(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const updateViewport = () => setIsMobileViewport(mediaQuery.matches);
    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => {
      mediaQuery.removeEventListener("change", updateViewport);
    };
  }, []);
  useEffect27(() => {
    if (typeof window === "undefined") {
      return;
    }
    const updateKeyboardInset = () => {
      const viewport = window.visualViewport;
      const keyboardInset = viewport ? Math.max(
        0,
        Math.round(window.innerHeight - viewport.height - viewport.offsetTop)
      ) : 0;
      const viewportDelta = viewport ? Math.max(0, Math.round(window.innerHeight - viewport.height)) : keyboardInset;
      const correctedInset = Math.min(keyboardInset, viewportDelta);
      const maxReasonableInset = Math.max(0, Math.round(window.innerHeight * 0.52));
      setMobileKeyboardInset(Math.min(correctedInset, maxReasonableInset));
    };
    updateKeyboardInset();
    window.visualViewport?.addEventListener("resize", updateKeyboardInset);
    window.visualViewport?.addEventListener("scroll", updateKeyboardInset);
    window.addEventListener("resize", updateKeyboardInset);
    return () => {
      window.visualViewport?.removeEventListener("resize", updateKeyboardInset);
      window.visualViewport?.removeEventListener("scroll", updateKeyboardInset);
      window.removeEventListener("resize", updateKeyboardInset);
    };
  }, []);
  useLayoutEffect8(() => {
    const node = internalComposerHostRef.current;
    if (!node || !isMobileViewport) {
      setMobileComposerHeight(0);
      return;
    }
    const updateHeight = () => {
      setMobileComposerHeight(Math.ceil(node.getBoundingClientRect().height));
    };
    updateHeight();
    if (typeof ResizeObserver === "undefined") {
      return;
    }
    const observer = new ResizeObserver(updateHeight);
    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, [isMobileViewport, composerProps, hasPendingRequests]);
  useLayoutEffect8(() => {
    const node = internalComposerHostRef.current;
    if (!node || !isMobileViewport) {
      setMobileComposerOverlap(0);
      return;
    }
    const updateOverlap = () => {
      const rect = node.getBoundingClientRect();
      setMobileComposerOverlap(
        Math.max(0, Math.ceil(window.innerHeight - rect.top))
      );
    };
    updateOverlap();
    window.addEventListener("resize", updateOverlap);
    window.visualViewport?.addEventListener("resize", updateOverlap);
    window.visualViewport?.addEventListener("scroll", updateOverlap);
    let observer = null;
    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(updateOverlap);
      observer.observe(node);
    }
    return () => {
      window.removeEventListener("resize", updateOverlap);
      window.visualViewport?.removeEventListener("resize", updateOverlap);
      window.visualViewport?.removeEventListener("scroll", updateOverlap);
      observer?.disconnect();
    };
  }, [
    isMobileViewport,
    mobileKeyboardInset,
    mobilePromptFocused,
    composerProps,
    hasPendingRequests
  ]);
  useEffect27(() => {
    if (!isMobileViewport) {
      setMobilePromptFocused(false);
      return;
    }
    const handleFocusIn = (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && internalComposerHostRef.current?.contains(target)) {
        setMobilePromptFocused(true);
      }
    };
    const handleFocusOut = (event) => {
      const nextTarget = event.relatedTarget;
      if (nextTarget instanceof HTMLElement && internalComposerHostRef.current?.contains(nextTarget)) {
        return;
      }
      setMobilePromptFocused(false);
    };
    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);
    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, [isMobileViewport]);
  const setComposerHostRefs = useCallback17(
    (node) => {
      internalComposerHostRef.current = node;
      if (composerHostRef) {
        composerHostRef.current = node;
      }
    },
    [composerHostRef]
  );
  const mobileComposerBottomOffset = isMobileViewport && mobilePromptFocused ? Math.max(0, mobileKeyboardInset - floatingMobileComposerBottomOffset) : 0;
  const effectiveMobileComposerHeight = Math.max(mobileComposerHeight, 144);
  const effectiveMobileComposerOverlap = Math.max(
    mobileComposerOverlap,
    effectiveMobileComposerHeight + mobileComposerBottomOffset
  );
  const chatScrollBottomSpacer = isMobileViewport ? effectiveMobileComposerOverlap + 12 : 0;
  const panelStyle = chatScrollBottomSpacer > 0 ? {
    "--thread-graph-chat-scroll-bottom-spacer": `${chatScrollBottomSpacer}px`
  } : void 0;
  const floatingComposerStyle = useFloatingMobileComposer && isMobileViewport ? {
    bottom: `${floatingMobileComposerBottomOffset + mobileComposerBottomOffset}px`,
    paddingBottom: "max(env(safe-area-inset-bottom), var(--android-safe-area-bottom, 0px))"
  } : void 0;
  const timelineElement = useMemo12(() => {
    const threadRunning = detail.thread.status === "running" || detail.thread.activeTurnId !== null;
    return /* @__PURE__ */ jsx55(
      TimelineComponent,
      {
        threadId: detail.thread.id,
        turns: detail.turns,
        totalTurnCount: detail.totalTurnCount ?? detail.turns.length,
        pendingRequests: detail.pendingRequests,
        activeTurnId: detail.thread.activeTurnId,
        threadRunning,
        liveOutput,
        className: "thread-timeline-surface min-h-0 flex-1",
        ...timelineProps,
        pendingSteers: steeredPrompts,
        optimisticSteers: [],
        adapter: timelineAdapter,
        onOpenThread: timelineProps?.onOpenThread ?? adapter.openThread,
        onTailVisibilityChange: handleTailVisibilityChange
      }
    );
  }, [
    TimelineComponent,
    adapter.openThread,
    detail.pendingRequests,
    detail.thread.activeTurnId,
    detail.thread.id,
    detail.thread.status,
    detail.totalTurnCount,
    detail.turns,
    handleTailVisibilityChange,
    liveOutput,
    timelineAdapter,
    timelineProps,
    steeredPrompts
  ]);
  return /* @__PURE__ */ jsxs46(
    "div",
    {
      "data-testid": "chat-panel",
      className: "thread-graph-chat-panel relative flex h-full min-h-0 flex-col",
      style: panelStyle,
      children: [
        beforeTimelineContent,
        timelineElement,
        /* @__PURE__ */ jsx55("div", { className: "thread-chat-usage-footer hidden shrink-0 items-center px-4 py-1 text-[10px] leading-4 sm:flex", children: /* @__PURE__ */ jsxs46("span", { className: "min-w-0", children: [
          detail.turns.length,
          " turn",
          detail.turns.length !== 1 ? "s" : "",
          /* @__PURE__ */ jsx55("span", { className: "mx-1 text-[var(--theme-border-contrast)]", children: "|" }),
          transcriptItemCount,
          " item",
          transcriptItemCount !== 1 ? "s" : ""
        ] }) }),
        resolvedComposerProps ? useFloatingMobileComposer ? /* @__PURE__ */ jsx55(
          "div",
          {
            ref: setComposerHostRefs,
            className: "fixed inset-x-0 bottom-0 z-50 overflow-visible sm:hidden",
            style: floatingComposerStyle ?? {
              bottom: `${floatingMobileComposerBottomOffset}px`,
              paddingBottom: "max(env(safe-area-inset-bottom), var(--android-safe-area-bottom, 0px))"
            },
            children: /* @__PURE__ */ jsx55(
              ThreadComposer,
              {
                ...resolvedComposerProps,
                activeView: "chat",
                edgeToEdgeMobile: true,
                onSubmit: adapter.sendPrompt
              }
            )
          }
        ) : /* @__PURE__ */ jsx55(
          "div",
          {
            ref: setComposerHostRefs,
            className: "thread-graph-composer-host shrink-0",
            children: /* @__PURE__ */ jsx55(
              ThreadComposer,
              {
                ...resolvedComposerProps,
                activeView: "chat",
                onSubmit: adapter.sendPrompt
              }
            )
          }
        ) : null
      ]
    }
  );
}

// src/ThreadDetailSurface.tsx
import { jsx as jsx56, jsxs as jsxs47 } from "react/jsx-runtime";
function summarizeThreadUsage(detail) {
  return detail.turns.reduce(
    (summary, turn) => {
      const usage = turn.tokenUsage?.total;
      if (!usage) {
        return summary;
      }
      return {
        input: summary.input + usage.inputTokens,
        output: summary.output + usage.outputTokens,
        cache: summary.cache + usage.cachedInputTokens,
        cacheWrite: summary.cacheWrite + (usage.cacheWriteInputTokens ?? 0),
        priceUsd: summary.priceUsd + (turn.priceEstimate?.totalUsd ?? 0),
        pricedTurns: summary.pricedTurns + (turn.priceEstimate ? 1 : 0),
        turns: summary.turns + 1
      };
    },
    {
      input: 0,
      output: 0,
      cache: 0,
      cacheWrite: 0,
      priceUsd: 0,
      pricedTurns: 0,
      turns: 0
    }
  );
}
function formatTopbarTokenCount(value) {
  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    return "0";
  }
  if (value >= 1e6) {
    return `${(value / 1e6).toFixed(value >= 1e7 ? 0 : 1)}m`;
  }
  if (value >= 1e3) {
    return `${(value / 1e3).toFixed(value >= 1e4 ? 0 : 1)}k`;
  }
  return String(Math.round(value));
}
function formatTopbarUsageSummary(usage) {
  if (!usage || usage.turns <= 0) {
    return "waiting for agent usage";
  }
  const baseTokenParts = `in ${formatTopbarTokenCount(usage.input)} / out ${formatTopbarTokenCount(
    usage.output
  )} / cache read ${formatTopbarTokenCount(usage.cache)}`;
  const tokenParts = usage.cacheWrite > 0 ? `${baseTokenParts} / cache write ${formatTopbarTokenCount(usage.cacheWrite)}` : baseTokenParts;
  return usage.pricedTurns > 0 ? `${tokenParts} / cost ${formatCompactUsd(usage.priceUsd)}` : tokenParts;
}
function isRenderableHistoryItem2(value) {
  return Boolean(
    value && typeof value === "object" && typeof value.id === "string" && typeof value.kind === "string"
  );
}
function sanitizeThreadDetailHistory(detail) {
  const sanitizeItems = (items) => Array.isArray(items) ? items.filter(isRenderableHistoryItem2) : [];
  return {
    ...detail,
    turns: Array.isArray(detail.turns) ? detail.turns.map((turn) => ({
      ...turn,
      items: sanitizeItems(turn.items)
    })) : [],
    ...detail.liveItems ? {
      liveItems: {
        ...detail.liveItems,
        items: sanitizeItems(detail.liveItems.items)
      }
    } : {}
  };
}
function ThreadDetailSurface({
  threads,
  detail: rawDetail,
  loading,
  error,
  status = null,
  plugins: providedPlugins,
  adapter,
  metaContent,
  settingsContent,
  globalSettingsContent,
  settingsDialogOpen,
  onSettingsDialogOpenChange,
  mobileHeaderAction,
  appMenuButton,
  appNavigationMenu,
  navigationTitle,
  renderNavigationHeader,
  workspaceReturnHref,
  onWorkspaceReturn,
  threadActionsButton,
  surfaceActions,
  floatingPanel,
  workspaceContent,
  workspaceTitle,
  workspaceActions,
  workspaceFeatures,
  workspaceFocusPathRequest = null,
  onNewThreadTitle,
  beforeTimelineContent,
  errorContent,
  workspaceMissingContent,
  dialogs,
  currentThreadId,
  currentWorkspaceId,
  currentWorkspaceLabel,
  onCloseAppNavigation,
  presentation = "workspace",
  className = "thread-detail-surface relative flex h-full min-h-0 flex-1 flex-col overflow-hidden",
  activeView = "chat",
  liveOutput = "",
  timelineProps,
  composerProps,
  shellComposerProps,
  useFloatingMobileComposer = false,
  floatingMobileComposerBottomOffset = 0,
  composerHostRef,
  shellPanelRef,
  shellEffectiveTheme = "dark",
  shellThemeMode = shellEffectiveTheme,
  onShellThemeModeChange,
  onShellStateChange,
  shellUnavailableContent,
  shellDisconnectedContent,
  timelineComponent: TimelineComponent = ThreadTimeline,
  shellPanelComponent: ShellPanelComponent = ThreadShellPanel,
  shellContent,
  loadingContent,
  emptyContent
}) {
  const detail = useMemo13(
    () => rawDetail ? sanitizeThreadDetailHistory(rawDetail) : null,
    [rawDetail]
  );
  const contextPlugins = usePlugins();
  const plugins = providedPlugins ?? contextPlugins ?? createDefaultPluginContextValue();
  const {
    getImageAssetUrl,
    loadHistoryItemDetail,
    loadTurnDetail,
    openWorkspaceFile,
    openThread,
    cancelPendingSteer
  } = adapter;
  const timelineAdapter = useMemo13(
    () => ({
      ...getImageAssetUrl ? {
        getImageAssetUrl: (input) => getImageAssetUrl(input.path)
      } : {},
      resolveHref: (href) => {
        const path = localFileHref(href, typeof window === "undefined" ? void 0 : window.location.origin);
        if (!path || !detail || !adapter.workspace?.getRawFileUrl) return href;
        const relative = relativeWorkspacePath(path, detail.workspace.absPath);
        if (relative === null && !adapter.workspace.statLinkedFile) return "";
        return adapter.workspace.getRawFileUrl({ threadId: detail.thread.id, workspaceId: detail.workspace.id, path: relative ?? path });
      },
      workspaceRootPath: detail?.workspace.absPath,
      onOpenLinkedThread: openThread,
      ...openWorkspaceFile ? { onOpenWorkspaceFile: openWorkspaceFile } : {},
      ...loadHistoryItemDetail ? { onLoadHistoryItemDetail: loadHistoryItemDetail } : {},
      ...loadTurnDetail ? { onLoadTurnDetail: loadTurnDetail } : {},
      ...cancelPendingSteer ? { cancelPendingSteer } : {}
    }),
    [
      detail?.workspace.absPath,
      detail?.workspace.id,
      detail?.thread.id,
      adapter.workspace,
      cancelPendingSteer,
      getImageAssetUrl,
      loadHistoryItemDetail,
      loadTurnDetail,
      openWorkspaceFile,
      openThread
    ]
  );
  const terminalPanelEnabled = plugins.getThreadPanels().some((panel) => panel.kind === "terminal");
  const threadUsageSummary = useMemo13(
    () => detail ? summarizeThreadUsage(detail) : null,
    [detail]
  );
  const topbarUsageLabel = useMemo13(
    () => formatTopbarUsageSummary(threadUsageSummary),
    [threadUsageSummary]
  );
  const transcriptItemCount = useMemo13(
    () => detail ? detail.turns.reduce(
      (count, turn) => count + turn.items.length,
      detail.liveItems?.items.length ?? 0
    ) : 0,
    [detail]
  );
  const resolvedWorkspaceContent = workspaceContent ?? (detail ? /* @__PURE__ */ jsx56(
    ThreadGraphWorkspacePanel,
    {
      detail,
      status,
      plugins,
      workspaceAdapter: adapter.workspace ?? null,
      metaContent,
      settingsContent,
      activeView,
      features: workspaceFeatures,
      focusPathRequest: workspaceFocusPathRequest
    }
  ) : null);
  const defaultContent = loading ? loadingContent ?? /* @__PURE__ */ jsx56("div", { className: "flex flex-1 items-center justify-center px-6 py-12 text-center text-[var(--theme-fg-muted)]", children: "Loading thread detail..." }) : detail ? /* @__PURE__ */ jsxs47("div", { className, children: [
    floatingPanel ? /* @__PURE__ */ jsx56("div", { className: "fixed right-3 top-20 z-50 lg:absolute lg:right-4 lg:top-16", children: floatingPanel }) : null,
    error && !loading && (errorContent ?? /* @__PURE__ */ jsx56("div", { className: "shrink-0 border-b border-rose-500/20 bg-rose-500/10 px-5 py-4 text-sm text-rose-100 sm:px-6", children: error })),
    detail.workspacePathStatus === "missing" && (workspaceMissingContent ?? /* @__PURE__ */ jsxs47("div", { className: "shrink-0 border-b border-rose-500/20 bg-rose-500/10 px-5 py-4 text-sm text-rose-100 sm:px-6", children: [
      /* @__PURE__ */ jsx56("p", { className: "font-medium text-rose-50", children: "Workspace path missing" }),
      /* @__PURE__ */ jsx56("p", { className: "mt-1 break-words text-rose-100/90", children: detail.workspace.absPath })
    ] })),
    /* @__PURE__ */ jsx56(
      "div",
      {
        className: activeView === "chat" ? "flex min-h-0 flex-1 flex-col" : "hidden",
        children: /* @__PURE__ */ jsx56(
          GraphChatThreadChatPanel,
          {
            detail,
            adapter,
            timelineAdapter,
            TimelineComponent,
            liveOutput,
            transcriptItemCount,
            useFloatingMobileComposer,
            floatingMobileComposerBottomOffset,
            ...beforeTimelineContent ? { beforeTimelineContent } : {},
            ...composerProps ? { composerProps } : {},
            ...timelineProps ? { timelineProps } : {},
            ...composerHostRef ? { composerHostRef } : {}
          }
        )
      }
    ),
    /* @__PURE__ */ jsx56(
      "div",
      {
        className: activeView === "shell" ? "flex min-h-0 flex-1 flex-col" : "hidden",
        children: shellContent ?? (detail.thread.isLoaded && terminalPanelEnabled && adapter.shell ? /* @__PURE__ */ jsx56(
          ShellPanelComponent,
          {
            ref: shellPanelRef,
            threadId: detail.thread.id,
            shellAdapter: adapter.shell,
            effectiveTheme: shellEffectiveTheme,
            isVisible: activeView === "shell",
            showHeader: false,
            onBackToChat: shellComposerProps?.onToggleView,
            showFloatingToolbox: false,
            ...onShellStateChange ? { onStateChange: onShellStateChange } : {}
          }
        ) : detail.thread.isLoaded && !terminalPanelEnabled ? shellUnavailableContent ?? /* @__PURE__ */ jsx56("div", { className: "flex min-h-0 flex-1 items-center justify-center p-4 sm:p-6", children: /* @__PURE__ */ jsxs47("div", { className: "thread-empty-surface max-w-md rounded-[1.6rem] border px-6 py-8 text-center", children: [
          /* @__PURE__ */ jsx56("p", { className: "text-base font-medium text-[var(--theme-fg)]", children: "Terminal plugin disabled" }),
          /* @__PURE__ */ jsx56("p", { className: "mt-3 text-sm leading-6 text-[var(--theme-fg-muted)]", children: "Enable the Terminal plugin in Settings to use the shell panel." })
        ] }) }) : shellDisconnectedContent ?? /* @__PURE__ */ jsx56("div", { className: "flex min-h-0 flex-1 items-center justify-center p-4 sm:p-6", children: /* @__PURE__ */ jsxs47("div", { className: "thread-empty-surface max-w-md rounded-[1.6rem] border px-6 py-8 text-center", children: [
          /* @__PURE__ */ jsx56("p", { className: "text-base font-medium text-[var(--theme-fg)]", children: "Thread disconnected" }),
          /* @__PURE__ */ jsx56("p", { className: "mt-3 text-sm leading-6 text-[var(--theme-fg-soft)]", children: "Reconnect this thread before creating or attaching a shell." })
        ] }) }))
      }
    ),
    dialogs
  ] }) : emptyContent ?? /* @__PURE__ */ jsx56("div", { className: "flex flex-1 items-center justify-center px-6 py-12 text-center text-[var(--theme-fg-muted)]", children: "Select a thread to inspect." });
  const surface = /* @__PURE__ */ jsx56(
    ThreadWorkspaceLayout,
    {
      threads,
      status,
      loading,
      error: loading ? null : error,
      viewportConstrained: true,
      currentThreadId: currentThreadId ?? detail?.thread.id,
      currentThreadLabel: detail?.thread.title,
      currentWorkspaceId: currentWorkspaceId !== void 0 ? currentWorkspaceId : detail?.thread.workspaceId,
      currentWorkspaceLabel: currentWorkspaceLabel ?? detail?.workspace.label,
      harnessLabel: composerProps?.agentLabel,
      sessionLabel: detail?.thread.providerSessionId ?? detail?.thread.id,
      usageLabel: topbarUsageLabel,
      threadActionsButton,
      topbarActions: surfaceActions,
      metaContent,
      settingsContent,
      globalSettingsContent,
      ...settingsDialogOpen !== void 0 ? { settingsDialogOpen } : {},
      ...onSettingsDialogOpenChange ? { onSettingsDialogOpenChange } : {},
      mobileHeaderAction,
      effectiveTheme: shellEffectiveTheme,
      themeMode: shellThemeMode,
      appMenuButton,
      appNavigationMenu,
      ...navigationTitle ? { navigationTitle } : {},
      ...renderNavigationHeader ? { renderNavigationHeader } : {},
      workspaceReturnHref,
      ...onWorkspaceReturn ? { onWorkspaceReturn } : {},
      showMobileAppMenu: Boolean(appMenuButton),
      showMobileThreadNavToggle: presentation !== "embedded-single-thread",
      showMobileNewThreadShortcut: false,
      hideRoomsRail: presentation === "embedded-single-thread",
      onOpenThread: adapter.openThread,
      workspaceContent: resolvedWorkspaceContent,
      workspaceTitle: workspaceTitle ?? "Workspace",
      workspaceActions,
      ...workspaceFocusPathRequest ? { workspaceRevealRequestKey: workspaceFocusPathRequest.requestId } : {},
      ...onNewThreadTitle ? { onNewThreadTitle } : {},
      ...onCloseAppNavigation ? { onCloseAppNavigation } : {},
      ...onShellThemeModeChange ? { onThemeModeChange: onShellThemeModeChange } : {},
      ...adapter.getThreadHref ? { getThreadHref: adapter.getThreadHref } : {},
      ...adapter.getNewThreadHref ? { getNewThreadHref: adapter.getNewThreadHref } : {},
      ...adapter.renderNewThreadDialogContent ? { renderNewThreadDialogContent: adapter.renderNewThreadDialogContent } : {},
      ...adapter.renameThread ? { onRenameThread: adapter.renameThread } : {},
      ...adapter.deleteThread ? { onDeleteThread: adapter.deleteThread } : {},
      children: defaultContent
    }
  );
  if (providedPlugins) {
    return /* @__PURE__ */ jsx56(PluginContext.Provider, { value: plugins, children: surface });
  }
  return surface;
}

// src/plugins/PluginProvider.tsx
import {
  useCallback as useCallback18,
  useEffect as useEffect28,
  useMemo as useMemo14,
  useState as useState35
} from "react";
import { jsx as jsx57 } from "react/jsx-runtime";
var DEFAULT_PLUGIN_PROVIDER_ADAPTER = {};
var DEFAULT_BUILTIN_PLUGINS = [];
function PluginProvider({
  adapter = DEFAULT_PLUGIN_PROVIDER_ADAPTER,
  builtinPlugins = DEFAULT_BUILTIN_PLUGINS,
  children
}) {
  const [plugins, setPlugins] = useState35(
    () => mergePluginState(builtinPlugins, [])
  );
  const [loading, setLoading] = useState35(false);
  const [error, setError] = useState35(null);
  const refresh = useCallback18(async () => {
    setLoading(true);
    setError(null);
    try {
      const serverPlugins = adapter.fetchPlugins ? await adapter.fetchPlugins() : [];
      setPlugins(mergePluginState(builtinPlugins, serverPlugins));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load plugins.");
    } finally {
      setLoading(false);
    }
  }, [adapter, builtinPlugins]);
  useEffect28(() => {
    void refresh();
  }, [refresh]);
  const setPluginEnabled = useCallback18(
    async (pluginId, enabled) => {
      let previousEnabled;
      setError(null);
      setPlugins(
        (current) => current.map((plugin) => {
          if (plugin.id !== pluginId) {
            return plugin;
          }
          previousEnabled = plugin.enabled;
          return { ...plugin, enabled };
        })
      );
      if (!adapter.updatePlugin) {
        return;
      }
      try {
        const updated = await adapter.updatePlugin(pluginId, { enabled });
        setPlugins(
          (current) => current.map((plugin) => plugin.id === updated.id ? updated : plugin)
        );
      } catch (err) {
        if (previousEnabled !== void 0) {
          setPlugins(
            (current) => current.map(
              (plugin) => plugin.id === pluginId && plugin.enabled === enabled ? { ...plugin, enabled: previousEnabled } : plugin
            )
          );
        }
        setError(err instanceof Error ? err.message : "Unable to update plugin.");
        throw err;
      }
    },
    [adapter]
  );
  const importPluginManifest = useCallback18(
    async (input) => {
      if (!adapter.importPlugin) {
        throw new Error("Plugin import is not available.");
      }
      const imported = await adapter.importPlugin(input);
      setPlugins((current) => {
        const next = current.filter((plugin) => plugin.id !== imported.id);
        return [...next, imported];
      });
    },
    [adapter]
  );
  const uninstallPlugin = useCallback18(
    async (pluginId) => {
      if (!adapter.deletePlugin) {
        throw new Error("Plugin uninstall is not available.");
      }
      const removed = await adapter.deletePlugin(pluginId);
      setPlugins(
        (current) => current.filter((plugin) => plugin.id !== removed.id)
      );
    },
    [adapter]
  );
  const enabledModules = useMemo14(() => {
    const enabledIds = new Set(
      plugins.filter((plugin) => plugin.enabled).map((plugin) => plugin.id)
    );
    return builtinPlugins.filter(
      (module) => enabledIds.has(module.manifest.id)
    );
  }, [builtinPlugins, plugins]);
  const renderArtifact = useCallback18(
    (context) => {
      const module = enabledModules.find(
        (entry) => entry.renderArtifact && entry.manifest.capabilities.artifactTypes.some(
          (type) => type.type === context.artifact.type
        )
      );
      return module?.renderArtifact?.(context) ?? null;
    },
    [enabledModules]
  );
  const renderInlineCode = useCallback18(
    (context) => {
      for (const module of enabledModules) {
        for (const renderer of module.inlineCodeRenderers ?? []) {
          if (!renderer.languages.includes(context.language.trim().toLowerCase())) {
            continue;
          }
          const rendered = renderer.render(context);
          if (rendered) {
            return rendered;
          }
        }
      }
      return null;
    },
    [enabledModules]
  );
  const hasRendererForArtifact = useCallback18(
    (artifact) => enabledModules.some(
      (entry) => Boolean(entry.renderArtifact) && entry.manifest.capabilities.artifactTypes.some(
        (type) => type.type === artifact.type
      )
    ),
    [enabledModules]
  );
  const getThreadPanels = useCallback18(
    () => enabledModules.flatMap((module) => module.threadPanels ?? []),
    [enabledModules]
  );
  const value = useMemo14(
    () => ({
      plugins,
      loading,
      error,
      refresh,
      importPluginManifest,
      setPluginEnabled,
      uninstallPlugin,
      renderArtifact,
      renderInlineCode,
      hasRendererForArtifact,
      getThreadPanels
    }),
    [
      error,
      getThreadPanels,
      hasRendererForArtifact,
      importPluginManifest,
      loading,
      plugins,
      refresh,
      renderArtifact,
      renderInlineCode,
      setPluginEnabled,
      uninstallPlugin
    ]
  );
  return /* @__PURE__ */ jsx57(PluginContext.Provider, { value, children });
}

// src/app-shell/AppShellNavigation.tsx
import { useEffect as useEffect29, useRef as useRef22, useState as useState36 } from "react";
import { jsx as jsx58, jsxs as jsxs48 } from "react/jsx-runtime";
function MenuIcon() {
  return /* @__PURE__ */ jsx58("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", className: "h-4 w-4 fill-current", children: /* @__PURE__ */ jsx58("path", { d: "M2 3.25h12v1.5H2Zm0 4h12v1.5H2Zm0 4h12v1.5H2Z" }) });
}
function CloseIcon() {
  return /* @__PURE__ */ jsx58("svg", { "aria-hidden": "true", viewBox: "0 0 16 16", className: "h-4 w-4 fill-current", children: /* @__PURE__ */ jsx58("path", { d: "M3.22 2.47 8 7.25l4.78-4.78 1.06 1.06L9.06 8.31l4.78 4.78-1.06 1.06L8 9.37l-4.78 4.78-1.06-1.06 4.78-4.78-4.78-4.78 1.06-1.06Z" }) });
}
function menuItemClassName(disabled = false) {
  return `flex w-full items-center rounded-[0.95rem] px-3 py-2 text-left text-sm transition ${disabled ? "cursor-not-allowed bg-[var(--theme-muted)] text-[var(--theme-fg-muted)]" : "text-[var(--theme-fg)] hover:bg-[var(--theme-hover)]"}`;
}
var themeOptions = [
  {
    value: "light",
    label: "Light",
    description: "Always use the bright theme."
  },
  {
    value: "dark",
    label: "Dark",
    description: "Always use the dark theme."
  },
  {
    value: "system",
    label: "System",
    description: "Follow the operating system appearance."
  }
];
function AppShellMenuButton({ className = "" }) {
  const shellNav = useAppShellNav();
  if (!shellNav) {
    return null;
  }
  return /* @__PURE__ */ jsx58(
    "button",
    {
      type: "button",
      "aria-label": shellNav.navOpen ? "Close Navigation" : "Open Navigation",
      "aria-expanded": shellNav.navOpen,
      "aria-controls": "app-shell-navigation-menu",
      onClick: shellNav.toggleNav,
      className: `inline-flex h-10 w-10 shrink-0 items-center justify-center text-[var(--theme-fg)] transition hover:text-[var(--theme-fg-soft)] ${className}`.trim(),
      children: shellNav.navOpen ? /* @__PURE__ */ jsx58(CloseIcon, {}) : /* @__PURE__ */ jsx58(MenuIcon, {})
    }
  );
}
function AppShellNavigationMenu({
  className = "",
  currentPath = "",
  items = [{ label: "Workspaces", href: "/workspaces" }],
  onNavigate
}) {
  const shellNav = useAppShellNav();
  const menuRef = useRef22(null);
  useEffect29(() => {
    if (!shellNav?.navOpen) {
      return;
    }
    const activeNav = shellNav;
    function handlePointerDown(event) {
      const target = event.target;
      if (!target) {
        return;
      }
      const menuNode = menuRef.current;
      if (menuNode?.contains(target)) {
        return;
      }
      const trigger = target instanceof Element ? target.closest('[aria-controls="app-shell-navigation-menu"]') : null;
      if (trigger) {
        return;
      }
      activeNav.closeNav();
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [shellNav]);
  if (!shellNav?.navOpen) {
    return null;
  }
  return /* @__PURE__ */ jsxs48(
    "div",
    {
      ref: menuRef,
      id: "app-shell-navigation-menu",
      onPointerDown: (event) => event.stopPropagation(),
      onMouseDown: (event) => event.stopPropagation(),
      onTouchStart: (event) => event.stopPropagation(),
      className: `rounded-[1.8rem] border border-[var(--theme-border)] bg-[var(--theme-panel)] p-4 shadow-2xl shadow-black/15 backdrop-blur ${className}`.trim(),
      children: [
        /* @__PURE__ */ jsxs48("div", { children: [
          /* @__PURE__ */ jsx58("p", { className: "text-base font-semibold tracking-wide text-[var(--theme-accent-strong)]", children: "Remote Codex" }),
          /* @__PURE__ */ jsx58("p", { className: "mt-1 text-xs uppercase tracking-[0.24em] text-[var(--theme-fg-muted)]", children: "Navigation" })
        ] }),
        /* @__PURE__ */ jsxs48("nav", { className: "mt-4 flex flex-col gap-1.5 text-sm", children: [
          items.map((item) => {
            const active = currentPath === item.href;
            return /* @__PURE__ */ jsx58(
              "button",
              {
                type: "button",
                disabled: active,
                onClick: () => {
                  if (active) {
                    return;
                  }
                  shellNav.closeNav();
                  onNavigate?.(item.href);
                },
                className: menuItemClassName(active),
                children: item.label
              },
              item.href
            );
          }),
          /* @__PURE__ */ jsx58(
            "button",
            {
              type: "button",
              onClick: shellNav.openSettings,
              className: menuItemClassName(),
              children: "Settings"
            }
          )
        ] })
      ]
    }
  );
}
function defaultImportPluginInput(draft) {
  const trimmed = draft.trim();
  const isManifestJson = trimmed.startsWith("{") || trimmed.startsWith("[");
  return {
    ...isManifestJson ? { manifestJson: trimmed } : { manifestUrl: trimmed },
    enabled: true
  };
}
function AppShellSettingsDialog({
  extraContent,
  importPluginInput = defaultImportPluginInput
} = {}) {
  const shellNav = useAppShellNav();
  const plugins = usePlugins();
  const [pluginImportDraft, setPluginImportDraft] = useState36("");
  const [pluginImportState, setPluginImportState] = useState36({
    busy: false,
    message: null,
    error: null
  });
  const selectedThemeMode = shellNav?.themeMode ?? "system";
  const effectiveTheme = shellNav?.effectiveTheme ?? "dark";
  const autoCollapseCompletedTurns = shellNav?.autoCollapseCompletedTurns ?? true;
  useEffect29(() => {
    if (!shellNav?.settingsOpen) {
      return;
    }
    const activeNav = shellNav;
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        activeNav.closeSettings();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [shellNav]);
  async function handleImportPlugin() {
    const draft = pluginImportDraft.trim();
    if (!draft || pluginImportState.busy) {
      return;
    }
    setPluginImportState({
      busy: true,
      message: null,
      error: null
    });
    try {
      await plugins.importPluginManifest(importPluginInput(draft));
      setPluginImportDraft("");
      setPluginImportState({
        busy: false,
        message: "Plugin imported.",
        error: null
      });
    } catch (error) {
      setPluginImportState({
        busy: false,
        message: null,
        error: error instanceof Error ? error.message : "Unable to import plugin."
      });
    }
  }
  async function handleUninstallPlugin(pluginId, pluginName) {
    const confirmed = window.confirm(`Uninstall ${pluginName}?`);
    if (!confirmed) {
      return;
    }
    try {
      await plugins.uninstallPlugin(pluginId);
    } catch (error) {
      setPluginImportState({
        busy: false,
        message: null,
        error: error instanceof Error ? error.message : "Unable to uninstall plugin."
      });
    }
  }
  if (!shellNav?.settingsOpen) {
    return null;
  }
  return /* @__PURE__ */ jsxs48("div", { className: "fixed inset-0 z-[70] flex items-start justify-center p-4 pt-[max(env(safe-area-inset-top),1rem)] sm:items-center", children: [
    /* @__PURE__ */ jsx58(
      "button",
      {
        type: "button",
        "aria-label": "Close Settings",
        onClick: shellNav.closeSettings,
        className: "ui-overlay-scrim absolute inset-0 backdrop-blur-sm"
      }
    ),
    /* @__PURE__ */ jsxs48(
      "section",
      {
        role: "dialog",
        "aria-modal": "true",
        "aria-label": "Settings",
        className: "relative z-10 flex max-h-[calc(100vh-2rem)] w-full max-w-4xl flex-col overflow-hidden rounded-[1.8rem] border border-[var(--theme-border)] bg-[var(--theme-panel)] shadow-2xl shadow-black/20",
        children: [
          /* @__PURE__ */ jsx58("div", { className: "shrink-0 p-5 pb-0", children: /* @__PURE__ */ jsxs48("div", { className: "flex items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxs48("div", { children: [
              /* @__PURE__ */ jsx58("p", { className: "text-xs uppercase tracking-[0.24em] text-[var(--theme-fg-muted)]", children: "Settings" }),
              /* @__PURE__ */ jsx58("h2", { className: "mt-2 text-xl font-semibold text-[var(--theme-fg)]", children: "Settings" }),
              /* @__PURE__ */ jsx58("p", { className: "mt-2 text-sm leading-6 text-[var(--theme-fg-soft)]", children: "Manage appearance and thread UI plugins." })
            ] }),
            /* @__PURE__ */ jsx58(
              "button",
              {
                type: "button",
                "aria-label": "Close Settings",
                onClick: shellNav.closeSettings,
                className: "inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--theme-border-strong)] bg-[var(--theme-surface-strong)] text-[var(--theme-fg)] transition hover:border-[var(--theme-border-contrast)] hover:bg-[var(--theme-hover)]",
                children: /* @__PURE__ */ jsx58(CloseIcon, {})
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx58("div", { className: "min-h-0 flex-1 overflow-y-auto p-5 pt-5", children: /* @__PURE__ */ jsxs48("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs48("div", { className: "rounded-[1.1rem] border border-[var(--theme-border)] bg-[var(--theme-surface)] px-3 py-3", children: [
              /* @__PURE__ */ jsx58("div", { className: "flex items-start justify-between gap-3", children: /* @__PURE__ */ jsxs48("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx58("p", { className: "text-sm font-medium text-[var(--theme-fg)]", children: "Appearance" }),
                /* @__PURE__ */ jsxs48("p", { className: "mt-1 text-xs leading-5 text-[var(--theme-fg-muted)]", children: [
                  "Choose light, dark, or follow the system setting. Active: ",
                  effectiveTheme,
                  "."
                ] })
              ] }) }),
              /* @__PURE__ */ jsx58("div", { className: "mt-3 grid gap-2 sm:grid-cols-3", children: themeOptions.map((option) => {
                const active = selectedThemeMode === option.value;
                return /* @__PURE__ */ jsxs48(
                  "button",
                  {
                    type: "button",
                    onClick: () => shellNav.setThemeMode(option.value),
                    className: `block rounded-[1rem] border px-3 py-2.5 text-left transition ${active ? "border-[var(--theme-accent-border)] bg-[var(--theme-accent-soft)]" : "border-[var(--theme-border)] bg-[var(--theme-surface-strong)] hover:bg-[var(--theme-hover)]"}`,
                    children: [
                      /* @__PURE__ */ jsxs48("div", { className: "flex items-center justify-between gap-3", children: [
                        /* @__PURE__ */ jsx58("span", { className: "text-sm font-medium text-[var(--theme-fg)]", children: option.label }),
                        active ? /* @__PURE__ */ jsx58("span", { className: "rounded-full border border-[var(--theme-accent-border)] bg-[var(--theme-accent-soft)] px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-[var(--theme-accent-strong)]", children: "Active" }) : null
                      ] }),
                      /* @__PURE__ */ jsx58("p", { className: "mt-1 text-xs leading-5 text-[var(--theme-fg-muted)]", children: option.description })
                    ]
                  },
                  option.value
                );
              }) })
            ] }),
            shellNav?.setAutoCollapseCompletedTurns ? /* @__PURE__ */ jsx58("div", { className: "rounded-[1.1rem] border border-[var(--theme-border)] bg-[var(--theme-surface)] px-3 py-3", children: /* @__PURE__ */ jsxs48("div", { className: "flex items-start justify-between gap-4", children: [
              /* @__PURE__ */ jsxs48("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx58("p", { className: "text-sm font-medium text-[var(--theme-fg)]", children: "Thread timeline" }),
                /* @__PURE__ */ jsx58("p", { className: "mt-1 text-xs leading-5 text-[var(--theme-fg-muted)]", children: "Collapse completed turns into prompt, elapsed work, and final reply." })
              ] }),
              /* @__PURE__ */ jsxs48("label", { className: "inline-flex min-h-10 shrink-0 items-center gap-2 text-xs font-medium text-[var(--theme-fg-soft)]", children: [
                /* @__PURE__ */ jsx58(
                  "input",
                  {
                    type: "checkbox",
                    checked: autoCollapseCompletedTurns,
                    onChange: (event) => shellNav.setAutoCollapseCompletedTurns?.(
                      event.currentTarget.checked
                    ),
                    className: "h-4 w-4 accent-[var(--theme-accent-solid)]"
                  }
                ),
                /* @__PURE__ */ jsx58("span", { children: "Auto collapse" })
              ] })
            ] }) }) : null,
            /* @__PURE__ */ jsxs48("div", { className: "rounded-[1.1rem] border border-[var(--theme-border)] bg-[var(--theme-surface)] px-3 py-3", children: [
              /* @__PURE__ */ jsxs48("div", { className: "flex items-start justify-between gap-3", children: [
                /* @__PURE__ */ jsxs48("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsx58("p", { className: "text-sm font-medium text-[var(--theme-fg)]", children: "Plugins" }),
                  /* @__PURE__ */ jsx58("p", { className: "mt-1 text-xs leading-5 text-[var(--theme-fg-muted)]", children: "Enable renderers and thread extensions loaded by this UI." })
                ] }),
                /* @__PURE__ */ jsx58(
                  "button",
                  {
                    type: "button",
                    onClick: () => void plugins.refresh(),
                    disabled: plugins.loading,
                    className: "rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface-strong)] px-3 py-1.5 text-xs font-medium text-[var(--theme-fg)] transition hover:bg-[var(--theme-hover)] disabled:cursor-not-allowed disabled:text-[var(--theme-fg-muted)]",
                    children: plugins.loading ? "Loading..." : "Refresh"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs48("div", { className: "mt-3 grid gap-2", children: [
                plugins.plugins.map((plugin) => /* @__PURE__ */ jsxs48(
                  "div",
                  {
                    className: "flex items-start justify-between gap-3 rounded-[1rem] border border-[var(--theme-border)] bg-[var(--theme-surface-strong)] px-3 py-2.5",
                    children: [
                      /* @__PURE__ */ jsxs48("span", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsx58("span", { className: "block text-sm font-medium text-[var(--theme-fg)]", children: plugin.name }),
                        /* @__PURE__ */ jsx58("span", { className: "mt-1 block text-xs leading-5 text-[var(--theme-fg-muted)]", children: plugin.description }),
                        /* @__PURE__ */ jsx58("span", { className: "mt-2 block text-[10px] uppercase tracking-[0.16em] text-[var(--theme-fg-muted)]", children: [
                          ...plugin.capabilities.artifactTypes.map((type) => type.type),
                          ...plugin.capabilities.threadPanels.map((panel) => panel.kind ?? panel.id)
                        ].join(", ") || "utility" }),
                        /* @__PURE__ */ jsx58("span", { className: "mt-1 block text-[10px] uppercase tracking-[0.16em] text-[var(--theme-fg-muted)]", children: plugin.source === "imported" ? "Imported manifest" : "Built-in module" })
                      ] }),
                      /* @__PURE__ */ jsxs48("span", { className: "flex shrink-0 items-center gap-2", children: [
                        plugin.source === "imported" ? /* @__PURE__ */ jsx58(
                          "button",
                          {
                            type: "button",
                            onClick: () => void handleUninstallPlugin(plugin.id, plugin.name),
                            className: "rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface)] px-3 py-1.5 text-xs font-medium text-[var(--theme-fg)] transition hover:bg-[var(--theme-hover)]",
                            children: "Uninstall"
                          }
                        ) : null,
                        /* @__PURE__ */ jsxs48("label", { className: "sr-only", htmlFor: `plugin-toggle-${plugin.id}`, children: [
                          "Toggle ",
                          plugin.name
                        ] }),
                        /* @__PURE__ */ jsx58(
                          "input",
                          {
                            id: `plugin-toggle-${plugin.id}`,
                            type: "checkbox",
                            checked: plugin.enabled,
                            onChange: (event) => void plugins.setPluginEnabled(plugin.id, event.currentTarget.checked),
                            className: "h-4 w-4 accent-[var(--theme-accent-solid)]"
                          }
                        )
                      ] })
                    ]
                  },
                  plugin.id
                )),
                plugins.plugins.length === 0 && /* @__PURE__ */ jsx58("p", { className: "rounded-[1rem] border border-[var(--theme-border)] bg-[var(--theme-surface-strong)] px-3 py-3 text-xs text-[var(--theme-fg-muted)]", children: "No plugins are registered." })
              ] }),
              /* @__PURE__ */ jsxs48("div", { className: "mt-3 border-t border-[var(--theme-border)] pt-3", children: [
                /* @__PURE__ */ jsx58("label", { className: "block text-xs font-medium text-[var(--theme-fg)]", children: "Import plugin" }),
                /* @__PURE__ */ jsx58(
                  "textarea",
                  {
                    value: pluginImportDraft,
                    onChange: (event) => {
                      setPluginImportDraft(event.currentTarget.value);
                      if (pluginImportState.message || pluginImportState.error) {
                        setPluginImportState({ busy: false, message: null, error: null });
                      }
                    },
                    placeholder: "Paste plugin.json or manifest URL",
                    rows: 4,
                    className: "mt-2 min-h-28 w-full resize-y rounded-[0.9rem] border border-[var(--theme-border)] bg-[var(--theme-surface-strong)] px-3 py-2 font-mono text-xs leading-5 text-[var(--theme-fg)] outline-none transition placeholder:text-[var(--theme-fg-muted)] focus:border-[var(--theme-accent-border)]"
                  }
                ),
                /* @__PURE__ */ jsxs48("div", { className: "mt-2 flex flex-wrap items-center justify-between gap-2", children: [
                  /* @__PURE__ */ jsx58("p", { className: "max-w-[42rem] text-xs leading-5 text-[var(--theme-fg-muted)]", children: "Imports register manifest-declared artifact types. Rendering code still needs a trusted built-in frontend module." }),
                  /* @__PURE__ */ jsx58(
                    "button",
                    {
                      type: "button",
                      onClick: () => void handleImportPlugin(),
                      disabled: !pluginImportDraft.trim() || pluginImportState.busy,
                      className: "rounded-full border border-[var(--theme-accent-border)] bg-[var(--theme-accent-soft)] px-3 py-1.5 text-xs font-medium text-[var(--theme-accent-strong)] transition hover:bg-[var(--theme-hover)] disabled:cursor-not-allowed disabled:border-[var(--theme-border)] disabled:bg-[var(--theme-muted)] disabled:text-[var(--theme-fg-muted)]",
                      children: pluginImportState.busy ? "Importing..." : "Import"
                    }
                  )
                ] }),
                pluginImportState.error && /* @__PURE__ */ jsx58("p", { className: "mt-2 text-xs text-rose-300", children: pluginImportState.error }),
                pluginImportState.message && /* @__PURE__ */ jsx58("p", { className: "mt-2 text-xs text-emerald-300", children: pluginImportState.message })
              ] }),
              plugins.error && /* @__PURE__ */ jsx58("p", { className: "mt-2 text-xs text-rose-300", children: plugins.error })
            ] }),
            extraContent
          ] }) })
        ]
      }
    )
  ] });
}

// src/components/PublicTranscript.tsx
import { ChevronRight as ChevronRight5 } from "lucide-react";
import { jsx as jsx59, jsxs as jsxs49 } from "react/jsx-runtime";
function transcriptSnapshot(title, turns, theme) {
  return {
    title,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    turnCount: turns.length,
    theme,
    turns: turns.map((turn) => {
      const final = turn.status === "inProgress" ? void 0 : turn.items.findLast((item) => item.kind === "agentMessage" && !("phase" in item && item.phase === "commentary"));
      return {
        startedAt: turn.startedAt ?? null,
        completedAt: turn.completedAt ?? null,
        model: turn.model ?? null,
        reasoningEffort: turn.reasoningEffort ?? null,
        tokenUsage: turn.tokenUsage ?? null,
        priceEstimate: turn.priceEstimate ?? null,
        messages: turn.items.filter((item) => item.kind === "userMessage" || item === final).map((item) => ({
          role: item.kind === "userMessage" ? "user" : "assistant",
          text: item.text,
          createdAt: item.createdAt ?? null
        }))
      };
    })
  };
}
function PublicTranscript({ snapshot }) {
  const message = (item, index) => /* @__PURE__ */ jsx59(
    GraphChatMessageFrame,
    {
      kind: item.role === "user" ? "userMessage" : "agentMessage",
      timeLabel: item.createdAt ? formatMessageTimestamp(item.createdAt) : void 0,
      children: item.role === "user" ? /* @__PURE__ */ jsx59(GraphChatUserMessageBody, { text: item.text, attachmentPreviewUrls: snapshot.images }) : /* @__PURE__ */ jsx59("div", { className: "thread-graph-message-prose", children: /* @__PURE__ */ jsx59(GraphChatMessageContent, { readOnly: true, content: item.text, resolveHref: (href) => snapshot.images?.[href] ?? href }) })
    },
    index
  );
  return /* @__PURE__ */ jsx59("main", { className: "public-transcript thread-ui-shell", "data-theme-effective": snapshot.theme ?? "dark", children: /* @__PURE__ */ jsxs49("div", { className: "public-transcript-content", children: [
    /* @__PURE__ */ jsxs49("header", { className: "public-transcript-header", children: [
      /* @__PURE__ */ jsx59("h1", { children: snapshot.title }),
      /* @__PURE__ */ jsxs49("p", { children: [
        "Read-only snapshot \xB7 ",
        snapshot.turnCount,
        " turns"
      ] })
    ] }),
    snapshot.turns.map((turn, index) => {
      const displayTurn = { id: `snapshot-${index}`, status: "completed", error: null, items: [], startedAt: turn.startedAt ?? null, completedAt: turn.completedAt ?? null, model: turn.model ?? null, reasoningEffort: turn.reasoningEffort ?? null, tokenUsage: turn.tokenUsage ?? null, priceEstimate: turn.priceEstimate ?? null };
      return /* @__PURE__ */ jsxs49("section", { className: "thread-graph-turn public-transcript-turn", children: [
        turn.messages.filter((item) => item.role === "user").map(message),
        /* @__PURE__ */ jsxs49("div", { className: "thread-graph-worked-summary flex w-full items-center gap-2 py-2 text-sm", "aria-label": "Turn summary", children: [
          /* @__PURE__ */ jsx59("span", { className: "thread-graph-worked-label shrink-0", children: formatWorkedDuration(turn.startedAt, turn.completedAt, []) }),
          /* @__PURE__ */ jsx59(ChevronRight5, { className: "h-4 w-4 shrink-0", "aria-hidden": "true" }),
          turn.model || turn.tokenUsage ? /* @__PURE__ */ jsx59(TurnUsageInline, { turn: displayTurn, readOnly: true }) : null,
          /* @__PURE__ */ jsx59("span", { className: "thread-graph-worked-rule h-px min-w-0 flex-1", "aria-hidden": "true" })
        ] }),
        turn.messages.filter((item) => item.role === "assistant").map(message)
      ] }, index);
    })
  ] }) });
}
export {
  AppShellMenuButton,
  AppShellNavContext,
  AppShellNavigationMenu,
  AppShellSettingsDialog,
  ConfirmDialog,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  ExportTranscriptDialog,
  LongTextDialog,
  MemoizedThreadGraphWorkspacePanel,
  PluginContext,
  PluginProvider,
  PublicTranscript,
  ThreadActionsDialog,
  ThreadCards,
  ThreadComposer,
  ThreadDetailSurface,
  ThreadGraphWorkspacePanel,
  ThreadShellPanel,
  ThreadTimeline,
  ThreadWorkspaceLayout,
  createDefaultPluginContextValue,
  formatLongTimestamp,
  formatShortTimestamp,
  hasLikelyMarkdownSyntax,
  historyItemAccentClassName,
  historyItemLabel,
  mergePluginState,
  threadStatusClassName,
  threadStatusLabel,
  transcriptSnapshot,
  turnStatusLabel,
  useAppShellNav,
  usePlugins
};

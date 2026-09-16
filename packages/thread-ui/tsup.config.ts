import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: {
    'builtin-plugins': 'src/builtin-plugins.ts',
    index: 'src/index.ts',
    'scientific-viewer': 'src/scientific-viewer.ts',
    'workspace-editor.worker': 'src/workspace-editor.worker.ts',
    'workspace-panel': 'src/workspace-panel.ts',
  },
  format: ['esm'],
  injectStyle: true,
  noExternal: ['monaco-editor'],
  splitting: true,
});

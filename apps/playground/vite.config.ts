import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const moleculeRuntime = fileURLToPath(
  new URL(
    '../../packages/thread-ui/node_modules/3dmol/build/3Dmol-min.js',
    import.meta.url,
  ),
);

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'playground-local-molecule-runtime',
      configureServer(server) {
        server.middlewares.use('/vendor/3Dmol-min.js', (_request, response) => {
          response.setHeader('Content-Type', 'text/javascript');
          response.end(readFileSync(moleculeRuntime));
        });
      },
      generateBundle() {
        this.emitFile({
          type: 'asset',
          fileName: 'vendor/3Dmol-min.js',
          source: readFileSync(moleculeRuntime),
        });
      },
    },
  ],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        moleculeViewer: fileURLToPath(
          new URL('./molecule-viewer.html', import.meta.url),
        ),
      },
      onwarn(warning, defaultHandler) {
        if (
          warning.code === 'EVAL' &&
          typeof warning.id === 'string' &&
          warning.id.includes('/3dmol/')
        ) {
          return;
        }

        defaultHandler(warning);
      },
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules') && !id.includes('/packages/')) {
            return undefined;
          }

          if (id.includes('/react/') || id.includes('/react-dom/')) {
            return 'vendor-react';
          }
          if (id.includes('/3dmol/')) {
            return 'vendor-3dmol';
          }
          if (id.includes('/xterm/') || id.includes('/@xterm/')) {
            return 'vendor-xterm';
          }
          if (id.includes('/@xyflow/')) {
            return 'vendor-xyflow';
          }
          if (
            id.includes('/react-markdown/') ||
            id.includes('/remark-') ||
            id.includes('/rehype-') ||
            id.includes('/micromark') ||
            id.includes('/mdast-') ||
            id.includes('/hast-') ||
            id.includes('/unist-')
          ) {
            return 'vendor-markdown';
          }
          if (id.includes('/lucide-react/')) {
            return 'vendor-icons';
          }
          if (id.includes('/@remote-codex/thread-ui/dist/workspace-panel')) {
            return 'thread-ui-workspace';
          }
          if (id.includes('/@remote-codex/thread-ui/dist/')) {
            return 'thread-ui-core';
          }
          if (id.includes('/@remote-codex/plugin-')) {
            return 'plugin-runtime';
          }

          return undefined;
        },
      },
    },
  },
  server: {
    port: 5174,
  },
});

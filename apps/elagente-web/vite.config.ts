import path from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const root = path.dirname(fileURLToPath(import.meta.url));
const workspace = path.resolve(root, "../..");

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss(), {
    name: 'elagente-local-molecule-runtime',
    generateBundle() {
      this.emitFile({type: 'asset', fileName: 'vendor/3Dmol-min.js', source: readFileSync(path.join(workspace, 'packages/thread-ui/node_modules/3dmol/build/3Dmol-min.js'))});
    },
    configureServer(server) {
      server.middlewares.use('/vendor/3Dmol-min.js', (_request, response) => {
        response.setHeader('Content-Type', 'text/javascript');
        response.end(readFileSync(path.join(workspace, 'packages/thread-ui/node_modules/3dmol/build/3Dmol-min.js')));
      });
    },
  }],
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  server: {
    proxy: { '/rpc': 'http://127.0.0.1:4310', '/files': 'http://127.0.0.1:4310', '/artifacts': 'http://127.0.0.1:4310', '/ws': {target: 'ws://127.0.0.1:4310', ws: true}},
    fs: {
      allow: [root, workspace],
    },
  },
  build: {
    chunkSizeWarningLimit: 800,
  },
});

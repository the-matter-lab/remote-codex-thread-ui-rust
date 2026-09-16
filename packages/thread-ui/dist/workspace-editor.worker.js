import {
  EditorWorker,
  EditorWorkerHost,
  WebWorkerServer
} from "./chunk-SSOM5P4O.js";

// ../../node_modules/.pnpm/monaco-editor@0.56.0/node_modules/monaco-editor/esm/vs/base/common/worker/webWorkerBootstrap.js
var initialized = false;
function initialize(factory) {
  if (initialized) {
    throw new Error("WebWorker already initialized!");
  }
  initialized = true;
  const webWorkerServer = new WebWorkerServer((msg) => globalThis.postMessage(msg), (workerServer) => factory(workerServer));
  globalThis.onmessage = (e) => {
    webWorkerServer.onmessage(e.data);
  };
  return webWorkerServer;
}

// ../../node_modules/.pnpm/monaco-editor@0.56.0/node_modules/monaco-editor/esm/vs/editor/editor.worker.start.js
function start(createClient) {
  let client;
  const webWorkerServer = initialize((workerServer) => {
    const editorWorkerHost = EditorWorkerHost.getChannel(workerServer);
    const host = new Proxy({}, {
      get(target, prop, receiver) {
        if (prop === "then") {
          return void 0;
        }
        if (typeof prop !== "string") {
          throw new Error(`Not supported`);
        }
        return (...args) => {
          return editorWorkerHost.$fhr(prop, args);
        };
      }
    });
    const ctx = {
      host,
      getMirrorModels: () => {
        return webWorkerServer.requestHandler.getModels();
      }
    };
    client = createClient(ctx);
    return new EditorWorker(client);
  });
  return client;
}

// ../../node_modules/.pnpm/monaco-editor@0.56.0/node_modules/monaco-editor/esm/vs/internal/common/initialize.js
var initialized2 = false;
function isWorkerInitialized() {
  return initialized2;
}

// ../../node_modules/.pnpm/monaco-editor@0.56.0/node_modules/monaco-editor/esm/vs/editor/editor.worker.js
self.onmessage = () => {
  if (!isWorkerInitialized()) {
    start(() => {
      return {};
    });
  }
};

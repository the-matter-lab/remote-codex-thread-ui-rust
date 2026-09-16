import {
  KeyCode,
  KeyMod,
  Uri,
  editor,
  languages
} from "./chunk-JXQIYSAV.js";
import "./chunk-7O5E2ZHX.js";
import "./chunk-SSOM5P4O.js";

// src/components/graph-workspace/GraphWorkspaceMonacoEditor.tsx
import { useEffect, useRef } from "react";

// ../../node_modules/.pnpm/monaco-editor@0.56.0/node_modules/monaco-editor/esm/vs/languages/definitions/_.contribution.js
var languageDefinitions = {};
var lazyLanguageLoaders = {};
var LazyLanguageLoader = class _LazyLanguageLoader {
  static getOrCreate(languageId) {
    if (!lazyLanguageLoaders[languageId]) {
      lazyLanguageLoaders[languageId] = new _LazyLanguageLoader(languageId);
    }
    return lazyLanguageLoaders[languageId];
  }
  constructor(languageId) {
    this._languageId = languageId;
    this._loadingTriggered = false;
    this._lazyLoadPromise = new Promise((resolve, reject) => {
      this._lazyLoadPromiseResolve = resolve;
      this._lazyLoadPromiseReject = reject;
    });
  }
  load() {
    if (!this._loadingTriggered) {
      this._loadingTriggered = true;
      languageDefinitions[this._languageId].loader().then(
        (mod) => this._lazyLoadPromiseResolve(mod),
        (err) => this._lazyLoadPromiseReject(err)
      );
    }
    return this._lazyLoadPromise;
  }
};
function registerLanguage(def) {
  const languageId = def.id;
  languageDefinitions[languageId] = def;
  languages.register(def);
  const lazyLanguageLoader = LazyLanguageLoader.getOrCreate(languageId);
  languages.registerTokensProviderFactory(languageId, {
    create: async () => {
      const mod = await lazyLanguageLoader.load();
      return mod.language;
    }
  });
  languages.onLanguageEncountered(languageId, async () => {
    const mod = await lazyLanguageLoader.load();
    languages.setLanguageConfiguration(languageId, mod.conf);
  });
}

// ../../node_modules/.pnpm/monaco-editor@0.56.0/node_modules/monaco-editor/esm/vs/languages/definitions/cpp/register.js
registerLanguage({
  id: "c",
  extensions: [".c", ".h"],
  aliases: ["C", "c"],
  loader: () => import("./cpp-HURO2CTG.js")
});
registerLanguage({
  id: "cpp",
  extensions: [".cpp", ".cc", ".cxx", ".hpp", ".hh", ".hxx"],
  aliases: ["C++", "Cpp", "cpp"],
  loader: () => import("./cpp-HURO2CTG.js")
});

// ../../node_modules/.pnpm/monaco-editor@0.56.0/node_modules/monaco-editor/esm/vs/languages/definitions/css/register.js
registerLanguage({
  id: "css",
  extensions: [".css"],
  aliases: ["CSS", "css"],
  mimetypes: ["text/css"],
  loader: () => import("./css-6ZLHR632.js")
});

// ../../node_modules/.pnpm/monaco-editor@0.56.0/node_modules/monaco-editor/esm/vs/languages/definitions/html/register.js
registerLanguage({
  id: "html",
  extensions: [".html", ".htm", ".shtml", ".xhtml", ".mdoc", ".jsp", ".asp", ".aspx", ".jshtm"],
  aliases: ["HTML", "htm", "html", "xhtml"],
  mimetypes: ["text/html", "text/x-jshtm", "text/template", "text/ng-template"],
  loader: () => import("./html-GCVVE7WM.js")
});

// ../../node_modules/.pnpm/monaco-editor@0.56.0/node_modules/monaco-editor/esm/vs/languages/definitions/java/register.js
registerLanguage({
  id: "java",
  extensions: [".java", ".jav"],
  aliases: ["Java", "java"],
  mimetypes: ["text/x-java-source", "text/x-java"],
  loader: () => import("./java-56GNWWNK.js")
});

// ../../node_modules/.pnpm/monaco-editor@0.56.0/node_modules/monaco-editor/esm/vs/languages/definitions/javascript/register.js
registerLanguage({
  id: "javascript",
  extensions: [".js", ".es6", ".jsx", ".mjs", ".cjs"],
  firstLine: "^#!.*\\bnode",
  filenames: ["jakefile"],
  aliases: ["JavaScript", "javascript", "js"],
  mimetypes: ["text/javascript"],
  loader: () => import("./javascript-4GX6Q4JK.js")
});

// ../../node_modules/.pnpm/monaco-editor@0.56.0/node_modules/monaco-editor/esm/vs/languages/definitions/markdown/register.js
registerLanguage({
  id: "markdown",
  extensions: [".md", ".markdown", ".mdown", ".mkdn", ".mkd", ".mdwn", ".mdtxt", ".mdtext"],
  aliases: ["Markdown", "markdown"],
  loader: () => import("./markdown-QNYNAWEM.js")
});

// ../../node_modules/.pnpm/monaco-editor@0.56.0/node_modules/monaco-editor/esm/vs/languages/definitions/python/register.js
registerLanguage({
  id: "python",
  extensions: [".py", ".rpy", ".pyw", ".cpy", ".gyp", ".gypi"],
  aliases: ["Python", "py"],
  firstLine: "^#!/.*\\bpython[0-9.-]*\\b",
  loader: () => import("./python-UTQEWHVQ.js")
});

// ../../node_modules/.pnpm/monaco-editor@0.56.0/node_modules/monaco-editor/esm/vs/languages/definitions/rust/register.js
registerLanguage({
  id: "rust",
  extensions: [".rs", ".rlib"],
  aliases: ["Rust", "rust"],
  loader: () => import("./rust-PKGBCSLI.js")
});

// ../../node_modules/.pnpm/monaco-editor@0.56.0/node_modules/monaco-editor/esm/vs/languages/definitions/shell/register.js
registerLanguage({
  id: "shell",
  extensions: [".sh", ".bash"],
  aliases: ["Shell", "sh"],
  loader: () => import("./shell-DXLRZRS6.js")
});

// ../../node_modules/.pnpm/monaco-editor@0.56.0/node_modules/monaco-editor/esm/vs/languages/definitions/sql/register.js
registerLanguage({
  id: "sql",
  extensions: [".sql"],
  aliases: ["SQL"],
  loader: () => import("./sql-V3HBKSUX.js")
});

// ../../node_modules/.pnpm/monaco-editor@0.56.0/node_modules/monaco-editor/esm/vs/languages/definitions/typescript/register.js
registerLanguage({
  id: "typescript",
  extensions: [".ts", ".tsx", ".cts", ".mts"],
  aliases: ["TypeScript", "ts", "typescript"],
  mimetypes: ["text/typescript"],
  loader: () => {
    return import("./typescript-EYV7USKN.js");
  }
});

// ../../node_modules/.pnpm/monaco-editor@0.56.0/node_modules/monaco-editor/esm/vs/languages/definitions/yaml/register.js
registerLanguage({
  id: "yaml",
  extensions: [".yaml", ".yml"],
  aliases: ["YAML", "yaml", "YML", "yml"],
  mimetypes: ["application/x-yaml", "text/x-yaml"],
  loader: () => import("./yaml-ZPES2LA6.js")
});

// src/components/graph-workspace/GraphWorkspaceMonacoEditor.tsx
import { jsx } from "react/jsx-runtime";
window.MonacoEnvironment ??= {
  getWorker: () => {
    return new Worker(new URL("./workspace-editor.worker.js", import.meta.url), {
      type: "module"
    });
  }
};
if (!languages.getLanguages().some(({ id }) => id === "json")) {
  languages.register({
    id: "json",
    extensions: [".json", ".jsonl"],
    aliases: ["JSON", "json"]
  });
  languages.setMonarchTokensProvider("json", {
    tokenizer: {
      root: [
        [/[{}[\]]/, "delimiter.bracket"],
        [/[,:]/, "delimiter"],
        [/"(?:[^"\\]|\\.)*"(?=\s*:)/, "key"],
        [/"(?:[^"\\]|\\.)*"/, "string.value"],
        [/-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/, "number"],
        [/\b(?:true|false|null)\b/, "keyword"]
      ]
    }
  });
}
editor.defineTheme("remote-codex-dark", {
  base: "vs-dark",
  inherit: true,
  rules: [],
  colors: {
    "editor.background": "#111318",
    "editor.foreground": "#d8dde7",
    "editorLineNumber.foreground": "#6f7787",
    "editorLineNumber.activeForeground": "#d8dde7",
    "editor.lineHighlightBackground": "#1b2029",
    "editor.selectionBackground": "#39475d",
    "editor.inactiveSelectionBackground": "#2a3444",
    "editorCursor.foreground": "#e8edf5",
    "editorIndentGuide.background1": "#282e38",
    "editorIndentGuide.activeBackground1": "#505969"
  }
});
editor.defineTheme("remote-codex-light", {
  base: "vs",
  inherit: true,
  rules: [],
  colors: {
    "editor.background": "#f8f9fb",
    "editor.foreground": "#20242c",
    "editorLineNumber.foreground": "#9299a6",
    "editorLineNumber.activeForeground": "#3a404b",
    "editor.lineHighlightBackground": "#eef1f5",
    "editor.selectionBackground": "#c9d8eb",
    "editor.inactiveSelectionBackground": "#dde5ef",
    "editorCursor.foreground": "#242933",
    "editorIndentGuide.background1": "#e1e5eb",
    "editorIndentGuide.activeBackground1": "#aeb6c3"
  }
});
function monacoLanguage(language) {
  const aliases = {
    jsx: "javascript",
    text: "plaintext",
    tsx: "typescript"
  };
  return aliases[language] ?? (language || "plaintext");
}
function GraphWorkspaceMonacoEditor({
  content,
  dark,
  focusLine,
  language,
  onChange,
  onSave,
  path,
  readOnly
}) {
  const hostRef = useRef(null);
  const editorRef = useRef(null);
  const modelRef = useRef(null);
  const applyingContentRef = useRef(false);
  const initialContentRef = useRef(content);
  const initialDarkRef = useRef(dark);
  const initialLanguageRef = useRef(language);
  const initialReadOnlyRef = useRef(readOnly);
  const onChangeRef = useRef(onChange);
  const onSaveRef = useRef(onSave);
  onChangeRef.current = onChange;
  onSaveRef.current = onSave;
  useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      return;
    }
    const uri = Uri.from({
      scheme: "remote-codex-workspace",
      path: `/${path.replace(/^\/+/, "")}`
    });
    const existingModel = editor.getModel(uri);
    const model = existingModel ?? editor.createModel(
      initialContentRef.current,
      monacoLanguage(initialLanguageRef.current),
      uri
    );
    modelRef.current = model;
    const editor2 = editor.create(host, {
      model,
      readOnly: initialReadOnlyRef.current,
      automaticLayout: true,
      theme: initialDarkRef.current ? "remote-codex-dark" : "remote-codex-light",
      ariaLabel: `Workspace editor: ${path}`,
      fontFamily: '"IBM Plex Mono", "SFMono-Regular", Consolas, "Liberation Mono", monospace',
      fontSize: 13,
      lineHeight: 21,
      lineNumbersMinChars: 3,
      minimap: { enabled: false },
      folding: true,
      foldingHighlight: true,
      glyphMargin: false,
      guides: { indentation: true, bracketPairs: true },
      bracketPairColorization: { enabled: true },
      renderLineHighlight: "all",
      renderWhitespace: "selection",
      scrollBeyondLastLine: false,
      smoothScrolling: true,
      wordWrap: "off",
      padding: { top: 10, bottom: 18 },
      overviewRulerBorder: false,
      stickyScroll: { enabled: true }
    });
    editorRef.current = editor2;
    const changeSubscription = model.onDidChangeContent(() => {
      if (!applyingContentRef.current) {
        onChangeRef.current?.(model.getValue());
      }
    });
    editor2.addCommand(KeyMod.CtrlCmd | KeyCode.KeyS, () => {
      onSaveRef.current?.();
    });
    return () => {
      changeSubscription.dispose();
      editor2.dispose();
      editorRef.current = null;
      modelRef.current = null;
      if (!existingModel) {
        model.dispose();
      }
    };
  }, [path]);
  useEffect(() => {
    const model = modelRef.current;
    if (!model || model.getValue() === content) {
      return;
    }
    applyingContentRef.current = true;
    model.setValue(content);
    applyingContentRef.current = false;
  }, [content]);
  useEffect(() => {
    editor.setTheme(dark ? "remote-codex-dark" : "remote-codex-light");
    editorRef.current?.updateOptions({ readOnly });
  }, [dark, readOnly]);
  useEffect(() => {
    const editor2 = editorRef.current;
    if (!editor2 || !focusLine || focusLine < 1) {
      return;
    }
    const lineNumber = Math.min(focusLine, modelRef.current?.getLineCount() ?? focusLine);
    editor2.setPosition({ lineNumber, column: 1 });
    editor2.revealLineInCenter(lineNumber);
  }, [focusLine, path]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: hostRef,
      className: "thread-graph-monaco-editor h-full min-h-0 w-full",
      "data-testid": "workspace-monaco-editor"
    }
  );
}
export {
  GraphWorkspaceMonacoEditor as default
};

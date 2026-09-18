// src/components/graph-workspace/GraphWorkspaceMonacoEditor.tsx
import { useEffect, useRef } from "react";
import * as monaco from "monaco-editor/editor/editor.api.js";
import "monaco-editor/languages/definitions/cpp/register.js";
import "monaco-editor/languages/definitions/css/register.js";
import "monaco-editor/languages/definitions/html/register.js";
import "monaco-editor/languages/definitions/java/register.js";
import "monaco-editor/languages/definitions/javascript/register.js";
import "monaco-editor/languages/definitions/markdown/register.js";
import "monaco-editor/languages/definitions/python/register.js";
import "monaco-editor/languages/definitions/rust/register.js";
import "monaco-editor/languages/definitions/shell/register.js";
import "monaco-editor/languages/definitions/sql/register.js";
import "monaco-editor/languages/definitions/typescript/register.js";
import "monaco-editor/languages/definitions/yaml/register.js";
import { jsx } from "react/jsx-runtime";
window.MonacoEnvironment ??= {
  getWorker: () => {
    return new Worker(new URL("./workspace-editor.worker.js", import.meta.url), {
      type: "module"
    });
  }
};
if (!monaco.languages.getLanguages().some(({ id }) => id === "json")) {
  monaco.languages.register({
    id: "json",
    extensions: [".json", ".jsonl"],
    aliases: ["JSON", "json"]
  });
  monaco.languages.setMonarchTokensProvider("json", {
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
monaco.editor.defineTheme("remote-codex-dark", {
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
monaco.editor.defineTheme("remote-codex-light", {
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
    const uri = monaco.Uri.from({
      scheme: "remote-codex-workspace",
      path: `/${path.replace(/^\/+/, "")}`
    });
    const existingModel = monaco.editor.getModel(uri);
    const model = existingModel ?? monaco.editor.createModel(
      initialContentRef.current,
      monacoLanguage(initialLanguageRef.current),
      uri
    );
    modelRef.current = model;
    const editor2 = monaco.editor.create(host, {
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
    editor2.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
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
    monaco.editor.setTheme(dark ? "remote-codex-dark" : "remote-codex-light");
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

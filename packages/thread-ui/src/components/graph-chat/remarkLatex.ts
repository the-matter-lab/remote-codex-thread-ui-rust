import type { Extension as FromMarkdownExtension } from 'mdast-util-from-markdown';
import type { Extension, State, Tokenizer } from 'micromark-util-types';
import type { Processor } from 'unified';

declare module 'micromark-util-types' {
  interface TokenTypeMap {
    latexMath: 'latexMath';
    latexMathFlow: 'latexMathFlow';
    latexMathData: 'latexMathData';
  }
}

// Parse before Markdown's character escapes, rather than replacing strings:
// code, links, escaped backslashes and existing dollar math retain their syntax.
function tokenizer(flow: boolean): Tokenizer {
  return function (effects, ok, nok) {
    const self = this;
    const tokenType = flow ? 'latexMathFlow' : 'latexMath';
    let closing: number;
    const start: State = (code) => {
      effects.enter(tokenType);
      effects.consume(code);
      return open;
    };
    const open: State = (code) => {
      if (code !== 40 && code !== 91) return nok(code);
      if (flow && code !== 91) return nok(code);
      closing = code === 40 ? 41 : 93;
      effects.consume(code);
      return body;
    };
    const body: State = (code) => {
      if (code === null || (flow && self.parser.lazy[self.now().line]))
        return nok(code);
      if (code === -5 || code === -4 || code === -3) {
        effects.enter('lineEnding');
        effects.consume(code);
        effects.exit('lineEnding');
        return body;
      }
      effects.enter('latexMathData');
      return data(code);
    };
    const data: State = (code) => {
      if (code === null) return nok(code);
      if (code === -5 || code === -4 || code === -3) {
        effects.exit('latexMathData');
        return body(code);
      }
      effects.consume(code);
      return code === 92 ? slash : data;
    };
    const slash: State = (code) => {
      if (code === closing) {
        effects.consume(code);
        effects.exit('latexMathData');
        return flow ? afterClose : finish;
      }
      if (code === null) return nok(code);
      // Consume an escaped backslash as a pair (e.g. a matrix row separator).
      if (code === 92) {
        effects.consume(code);
        return data;
      }
      return data(code);
    };
    const finish: State = (code) => {
      effects.exit(tokenType);
      return ok(code);
    };
    const afterClose: State = (code) => {
      if (code === 32 || code === -2 || code === -1) {
        effects.consume(code);
        return afterClose;
      }
      return code === null || code === -5 || code === -4 || code === -3
        ? finish(code)
        : nok(code);
    };
    return start;
  };
}

const syntax: Extension = {
  text: { 92: { name: 'latexMath', tokenize: tokenizer(false) } },
  // Block parsing must precede setext headings, lists and blank paragraphs.
  flow: {
    92: { name: 'latexMathFlow', tokenize: tokenizer(true), concrete: true },
  },
};
const enterMath: NonNullable<FromMarkdownExtension['enter']>[string] =
  function (token) {
    const raw = this.sliceSerialize(token).trimEnd();
    this.enter(
      {
        type: token.type === 'latexMathFlow' ? 'math' : 'inlineMath',
        value: raw.slice(2, -2).trim(),
        data: {
          hName: 'code',
          hChildren: [{ type: 'text', value: raw.slice(2, -2).trim() }],
          hProperties: {
            className: [
              'language-math',
              raw[1] === '[' ? 'math-display' : 'math-inline',
            ],
          },
        },
      },
      token,
    );
  };
const fromMarkdown: FromMarkdownExtension = {
  enter: { latexMath: enterMath, latexMathFlow: enterMath },
  exit: {
    latexMath(token) {
      this.exit(token);
    },
    latexMathFlow(token) {
      this.exit(token);
    },
  },
};

export function remarkLatex(this: Processor) {
  const data = this.data() as {
    micromarkExtensions?: Extension[];
    fromMarkdownExtensions?: FromMarkdownExtension[];
  };
  (data.micromarkExtensions ??= []).push(syntax);
  (data.fromMarkdownExtensions ??= []).push(fromMarkdown);
}

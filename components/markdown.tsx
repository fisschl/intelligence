import { marked } from "marked";
import { memo, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import "katex/dist/katex.min.css";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

function parseMarkdownIntoBlocks(markdown: string): string[] {
  const tokens = marked.lexer(markdown);
  return tokens.map((token) => token.raw);
}

const MarkdownBlock: React.FC<{ content: string }> = ({ content }) => {
  return (
    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
      {content}
    </ReactMarkdown>
  );
};

const MemoizedMarkdownBlock = memo(MarkdownBlock, (prev, next) => {
  if (prev.content !== next.content) return false;
  return true;
});

const BaseMarkdown: React.FC<{ content: string }> = ({ content }) => {
  const blocks = useMemo(() => parseMarkdownIntoBlocks(content), [content]);

  return (
    <article className="prose dark:prose-invert">
      {blocks.map((block, index) => (
        <MemoizedMarkdownBlock content={block} key={index} />
      ))}
    </article>
  );
};

export const Markdown = memo(BaseMarkdown);

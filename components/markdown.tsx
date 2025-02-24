import { marked } from "marked";
import { memo, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import "katex/dist/katex.min.css";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import TurndownService from "turndown";

const MarkdownBlock: React.FC<{ content: string }> = ({ content }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
    >
      {content}
    </ReactMarkdown>
  );
};

const MemoizedMarkdownBlock = memo(MarkdownBlock, (prev, next) => {
  if (prev.content !== next.content) return false;
  return true;
});

const BracketsPattern =
  /(```[\s\S]*?```|`.*?`)|\\\[([\s\S]*?[^\\])\\]|\\\((.*?)\\\)/g;

const BaseMarkdown: React.FC<{ content: string }> = ({ content }) => {
  const blocks = useMemo(() => {
    const input = content.replaceAll(
      BracketsPattern,
      (
        match: string,
        codeBlock: string,
        squareBracket: string,
        roundBracket: string,
      ) => {
        // 匹配代码块是为了避免其内部的代码被替换
        if (codeBlock) return codeBlock;
        // 将 \[ \] 替换成 $$ $$
        if (squareBracket) return `$$${squareBracket}$$`;
        // 将 \( \) 替换成 $ $
        if (roundBracket) return `$${roundBracket}$`;
        return match;
      },
    );
    const tokens = marked.lexer(input);
    return tokens.map((token) => token.raw);
  }, [content]);

  return (
    <article className="prose dark:prose-invert prose-code:text-base max-w-none">
      {blocks.map((block, index) => (
        <MemoizedMarkdownBlock content={block} key={index} />
      ))}
    </article>
  );
};

export const Markdown = memo(BaseMarkdown);

const turndownService = new TurndownService();

export const html2Markdown = (html?: string) => {
  if (!html?.trim()) return "";
  return turndownService.turndown(html);
};

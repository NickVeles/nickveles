import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { Components } from "react-markdown";
import Image from "next/image";
import { PlaceholderImage } from "@/constants/placeholders";
import "highlight.js/styles/github.css";
import { cn } from "@/lib/utils";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

interface CodeProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface HeadingProps {
  children?: React.ReactNode;
  level?: number;
}

interface BlockquoteProps {
  children?: React.ReactNode;
}

interface ListProps {
  ordered?: boolean;
  children?: React.ReactNode;
}

interface LinkProps {
  href?: string;
  children?: React.ReactNode;
}

interface TableProps {
  children?: React.ReactNode;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className,
}) => {
  const components: Components = {
    // Headings with custom styling
    h1: ({ children }: HeadingProps) => (
      <h1 className="text-3xl font-bold mb-6 text-foreground border-b border-border pb-2">
        {children}
      </h1>
    ),
    h2: ({ children }: HeadingProps) => (
      <h2 className="text-2xl font-semibold mb-4 mt-8 text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }: HeadingProps) => (
      <h3 className="text-xl font-medium mb-3 mt-6 text-foreground">
        {children}
      </h3>
    ),
    h4: ({ children }: HeadingProps) => (
      <h4 className="text-lg font-medium mb-2 mt-4 text-muted-foreground">
        {children}
      </h4>
    ),

    // Paragraphs
    p: ({ children }) => (
      <p className="mb-4 leading-7 text-foreground">{children}</p>
    ),

    // Code blocks and inline code
    code: ({ inline, className, children, ...props }: CodeProps) => {
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "";

      return !inline ? (
        <div className="relative">
          {language && (
            <div className="absolute top-0 right-0 bg-muted text-muted-foreground text-xs px-2 py-1 rounded-bl">
              {language}
            </div>
          )}
          <pre className="bg-muted border border-border rounded-lg p-4 overflow-x-auto mb-4">
            <code className={className} {...props}>
              {children}
            </code>
          </pre>
        </div>
      ) : (
        <code className="bg-muted text-foreground px-1.5 py-0.5 rounded text-sm font-mono">
          {children}
        </code>
      );
    },

    // Blockquotes
    blockquote: ({ children }: BlockquoteProps) => (
      <blockquote className="border-l-4 border-primary bg-muted/50 pl-4 pr-4 py-2 italic my-6 rounded-r">
        <div className="text-muted-foreground">{children}</div>
      </blockquote>
    ),

    // Lists
    ul: ({ children }: ListProps) => (
      <ul className="list-disc list-inside mb-4 space-y-1 text-foreground">
        {children}
      </ul>
    ),
    ol: ({ children }: ListProps) => (
      <ol className="list-decimal list-inside mb-4 space-y-1 text-foreground">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="ml-4">{children}</li>,

    // Links
    a: ({ href, children }: LinkProps) => (
      <a
        href={href}
        className="text-primary hover:text-primary/80 underline decoration-primary/30 hover:decoration-primary/60 transition-colors"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),

    // Tables
    table: ({ children }: TableProps) => (
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border-collapse border border-border">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => <thead className="bg-muted/50">{children}</thead>,
    tbody: ({ children }) => (
      <tbody className="bg-background">{children}</tbody>
    ),
    tr: ({ children }) => (
      <tr className="border-b border-border">{children}</tr>
    ),
    th: ({ children }) => (
      <th className="border border-border px-4 py-2 text-left font-semibold text-foreground">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border border-border px-4 py-2 text-foreground">
        {children}
      </td>
    ),

    // Horizontal rule
    hr: () => <hr className="my-8 border-t border-border" />,

    // Strong and emphasis
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-foreground">{children}</em>
    ),

    // Images
    img: ({ src, alt, title }) => {
      // Handle different src types
      const imageSrc =
        typeof src === "string"
          ? src
          : src instanceof Blob
          ? URL.createObjectURL(src)
          : null;

      return (
        <div className="my-6">
          <Image
            src={imageSrc ?? PlaceholderImage}
            alt={alt || "Article Image"}
            title={title}
            width={800}
            height={600}
            className="max-w-full h-auto rounded-lg shadow-sm border border-border"
            loading="lazy"
          />
          {alt && (
            <p className="text-sm text-muted-foreground text-center mt-2 italic">
              {alt}
            </p>
          )}
        </div>
      );
    },
  };

  return (
    <div className={cn("markdown-content", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;

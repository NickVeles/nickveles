"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { Components } from "react-markdown";
import Image from "next/image";
import { PlaceholderImage } from "@/constants/placeholders";
import { cn } from "@/lib/utils";
import TextLink from "./text-link";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import Loading from "@/app/loading";
import React from "react";
import { CheckIcon, CopyIcon } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

interface CodeProps {
  children?: React.ReactNode;
  className?: string;
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

//TODO: organize this file cuz there's too much clutter
const PreComponent: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const copyToClipboard = async () => {
    try {
      let textContent = "";

      if (preRef.current) {
        // Get the actual rendered text content from the DOM
        const codeElement = preRef.current.querySelector("code");
        textContent =
          codeElement?.textContent || preRef.current.textContent || "";
      }

      if (textContent) {
        await navigator.clipboard.writeText(textContent);
        setCopied(true);
        toast.success("Code copied successfully!", { duration: 2000 });
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      toast.error("Code failed co copy!", { duration: 2000 });
      console.error("Failed to copy text: ", error);
    }
  };

  return (
    <pre
      ref={preRef}
      className="relative bg-muted border border-border rounded-lg p-0 overflow-hidden my-4 last:mb-0 [&>*]:font-mono [&>*]:dyslexic:font-dyslexic-mono group"
    >
      <Button
        variant="outline"
        size="icon"
        onClick={copyToClipboard}
        className="absolute top-1 right-1"
        aria-label="Copy code"
      >
        {copied ? (
          <CheckIcon className="size-4 text-primary-highlighter" />
        ) : (
          <CopyIcon className="size-4" />
        )}
      </Button>
      {children}
    </pre>
  );
};

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className,
}) => {
  const [mounted, setMounted] = useState(false);
  const [stylesLoaded, setStylesLoaded] = useState(false);
  const { resolvedTheme } = useTheme();

  const components: Components = {
    // Headings with custom styling
    h1: ({ children }: HeadingProps) => (
      <h1 className="text-3xl font-bold mb-6 last:mb-0 text-foreground border-b border-border pb-2">
        {children}
      </h1>
    ),
    h2: ({ children }: HeadingProps) => (
      <h2 className="text-2xl font-semibold mb-4 last:mb-0 mt-8 text-foreground">
        {children}
      </h2>
    ),
    h3: ({ children }: HeadingProps) => (
      <h3 className="text-xl font-medium mb-3 last:mb-0 mt-6 text-foreground">
        {children}
      </h3>
    ),
    h4: ({ children }: HeadingProps) => (
      <h4 className="text-lg font-medium mb-2 last:mb-0 mt-4 text-muted-foreground">
        {children}
      </h4>
    ),

    // Paragraphs
    p: ({ children }) => {
      // fix objects in <p> tags
      if (
        React.isValidElement(children) &&
        typeof children.props === "object" &&
        children.props &&
        "src" in children.props
      ) {
        return children;
      }

      return (
        <p className="mb-4 last:mb-0 leading-7 text-foreground inline">
          {children}
        </p>
      );
    },

    // Code blocks
    pre: PreComponent,

    // Inline code
    code: ({ children, className }: CodeProps) => {
      // Check if this code element has highlight.js classes (means it's in a pre block)
      const isInPreBlock =
        className &&
        (className.includes("hljs") || className.includes("language-"));

      if (isInPreBlock) {
        // Return unstyled code for code blocks
        return <code className={className}>{children}</code>;
      }

      // Apply styling only for inline code
      return (
        <code className="bg-muted text-foreground py-0.5 px-1 rounded font-mono dyslexic:font-dyslexic-mono">
          {children}
        </code>
      );
    },

    // Blockquotes
    blockquote: ({ children }: BlockquoteProps) => (
      <blockquote className="border-l-2 border-primary bg-muted/50 pl-4 pr-4 py-2 italic my-6 last:mb-0 rounded-r">
        <div className="text-muted-foreground">{children}</div>
      </blockquote>
    ),

    // Lists
    ul: ({ children }: ListProps) => (
      <ul className="list-disc list-inside mb-4 last:mb-0 space-y-1 text-foreground">
        {children}
      </ul>
    ),
    ol: ({ children }: ListProps) => (
      <ol className="list-decimal list-inside mb-4 last:mb-0 space-y-1 text-foreground">
        {children}
      </ol>
    ),
    li: ({ children }) => <li>{children}</li>,

    // Links
    a: ({ href, children }: LinkProps) => (
      <TextLink href={href ?? ""} target="_blank" isIcon iconSize={14}>
        {children}
      </TextLink>
    ),

    // Tables
    table: ({ children }: TableProps) => (
      <div className="overflow-x-auto mb-6 last:mb-0">
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
        <div className="flex flex-col justify-center items-center my-6 last:mb-0">
          <Image
            src={imageSrc ?? PlaceholderImage}
            alt={alt || "Article Image"}
            title={title}
            width={800}
            height={256}
            className="max-h-64 w-auto rounded-lg shadow-sm border border-border"
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

  useEffect(() => {
    const loadHighlightTheme = async () => {
      try {
        // Remove existing highlight.js stylesheets
        const existingLinks = document.querySelectorAll(
          "link[data-highlight-theme]"
        );
        existingLinks.forEach((link) => link.remove());

        // Create new stylesheet link
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.setAttribute("data-highlight-theme", "true");

        if (resolvedTheme === "dark") {
          link.href =
            "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css";
        } else {
          link.href =
            "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-light.min.css";
        }

        // Wait for stylesheet to load
        link.onload = () => setStylesLoaded(true);
        link.onerror = () => setStylesLoaded(true); // Fallback in case of error

        document.head.appendChild(link);
      } catch (error) {
        console.error("Failed to load highlight theme:", error);
        setStylesLoaded(true);
      }
    };

    if (mounted && resolvedTheme) {
      setStylesLoaded(false);
      loadHighlightTheme();
    }
  }, [resolvedTheme, mounted]);

  // Ensure theme is loaded before rendering
  useEffect(() => setMounted(true), []);
  if (!mounted || !stylesLoaded) {
    return <Loading />;
  }

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

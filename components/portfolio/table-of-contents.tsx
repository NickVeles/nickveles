import { slugify } from "@/lib/utils";
import Link from "next/link";
import React from "react";

// Extract all H2 headings from markdown and generate anchor links
function extractH2Headings(markdown: string) {
  const headingRegex = /^##\s+(.+)$/gim;
  const headings: { text: string; id: string }[] = [];
  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(markdown))) {
    const text = match[1].trim();
    const id = slugify(text);
    headings.push({ text, id });
  }
  return headings;
}

type TableOfContentsProps = {
  content: string;
};

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const headings = extractH2Headings(content);

  if (headings.length === 0) return null;

  return (
    <nav className="mb-12">
      <h2 className="text-lg font-semibold mb-2">Table of Contents</h2>
      <ul className="list-disc list-inside space-y-1">
        {headings.map((h) => (
          <li key={h.id}>
            <Link
              href={`#${h.id}`}
              className="text-foreground hover:underline"
            >
              {h.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;

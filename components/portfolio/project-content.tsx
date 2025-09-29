import { Project } from "@/types/project";
import { Card, CardContent } from "../ui/card";
import MarkdownRenderer from "../utils/markdown-renderer";
import TableOfContents from "./table-of-contents";
import { cn } from "@/lib/utils";

type ProjectContentProps = {
  project: Project;
  className?: string;
};

export default function ProjectContent({
  project,
  className,
}: ProjectContentProps) {
  return (
    <Card className={cn("flex", className)}>
      <CardContent>
        <article className="font-sans dyslexic:font-dyslexic">
          <TableOfContents content={project.markdownContent} />
          <MarkdownRenderer content={project.markdownContent} />
        </article>
      </CardContent>
    </Card>
  );
}

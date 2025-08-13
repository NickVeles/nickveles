import { Project } from "@/types/project";
import { Button } from "../ui/button";
import Link from "next/link";
import { ExternalLinkIcon } from "lucide-react";
import { GitHubIcon } from "../icons";
import { cn } from "@/lib/utils";

type ProjectHeaderProps = {
  project: Project;
  className?: string;
};

export default function ProjectHeader({
  project,
  className,
}: ProjectHeaderProps) {
  return (
    <div className={cn("w-full flex flex-col gap-6", className)}>
      <h1 className="text-2xl md:text-4xl font-bold text-foreground">{project.title}</h1>
      <p className="text-lg md:text-xl text-muted-foreground">
        {project.description}
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        {project.url && (
          <Button asChild>
            <Link
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center"
            >
              <ExternalLinkIcon className="size-4" />
              Visit Site
            </Link>
          </Button>
        )}
        {project.repositoryUrl && (
          <Button variant="outline" asChild>
            <Link
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon className="size-4" />
              View Code
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}

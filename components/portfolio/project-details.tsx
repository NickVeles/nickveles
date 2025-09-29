import { Project } from "@/types/project";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { cn, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { urlFor } from "@/lib/sanity-image";

//! IF YOU EVER ADD ANOTHER CARD TO THIS COMPONENT,
//! CHANGE `lg:top-20` TO `lg:bottom-4` AND
//! CHANGE `lg:self-start` TO `lg:self-end`

type ProjectDetailsProps = {
  project: Project;
  className?: string;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default function ProjectDetails({
  project,
  className,
}: ProjectDetailsProps) {
  return (
    <div className={cn("flex flex-col gap-4 lg:sticky lg:top-20 lg:self-start", className)}>
      <Card className="flex flex-col gap-2 h-fit">
        <CardContent className="flex flex-col gap-4">
          <h3 className="font-semibold">Article Info</h3>
          <div className="flex flex-col gap-1">
            <h4 className="text-sm text-muted-foreground">Author</h4>
            <div className="flex flex-wrap items-center gap-2">
              <Avatar className="size-8">
                <AvatarImage
                  src={urlFor(project.author.image).width(64).height(64).url()}
                  alt={`${project.author.name}'s avatar`}
                />
                <AvatarFallback>
                  {getInitials(project.author.name)}
                </AvatarFallback>
              </Avatar>
              {project.author.name}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-sm text-muted-foreground">Category</h4>
            <Badge variant="outline">{project.category.title}</Badge>
          </div>
          {project.publishedAt && (
            <div className="flex flex-col gap-1">
              <h4 className="text-sm text-muted-foreground">Published</h4>
              <p className="font-medium">{formatDate(project.publishedAt)}</p>
            </div>
          )}
          {project.editedAt && (
            <div className="flex flex-col gap-1">
              <h4 className="text-sm text-muted-foreground">Edited</h4>
              <p className="font-medium">{formatDate(project.editedAt)}</p>
            </div>
          )}
          {project.skills && (
            <div className="flex flex-col gap-1">
              <h4 className="text-sm text-muted-foreground">Skills</h4>
              <div className="flex flex-wrap items-center gap-1">
                {project.skills.map((skill) => (
                  <Badge key={skill._id} variant="outline">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

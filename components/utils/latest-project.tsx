import Project from "@/types/project";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SparklesIcon } from "lucide-react";
import { PlaceholderImage } from "@/constants/placeholders";
import { urlFor } from "@/lib/sanity-image";
import Link from "next/link";

type LatestProjectProps = {
  project: Project;
};

export default function LatestProject({ project }: LatestProjectProps) {
  return (
    <div className="flex-1 w-full max-w-md mx-auto lg:mx-0">
      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <Badge
            variant="outline"
            className="w-fit flex justify-center items-center"
          >
            <SparklesIcon />
            Latest
          </Badge>
        </CardHeader>
        <div className="px-6 pb-3">
          <Image
            src={project.mainImage ? urlFor(project.mainImage).height(200).width(400).url() : PlaceholderImage}
            alt="Latest project preview"
            width={400}
            height={200}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
        <CardHeader className="pt-0">
          <CardTitle className="text-xl">{project.title}</CardTitle>
          {project.description && (
            <CardDescription className="text-base">
              {project.description}
            </CardDescription>
          )}
        </CardHeader>
        <CardFooter className="pt-0">
          <Button variant="outline" className="w-full bg-transparent">
            <Link href={`/portfolio/${project.slug}`}>Read More</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

import Link from "next/link";
import { Button } from "../ui/button";
import { SectionText } from "@/types/section-text";
import { SectionH } from "../ui/typography";

type ProjectsInfoProps = {
  textObject: SectionText;
};

export default function ProjectsInfo({ textObject }: ProjectsInfoProps) {
  return (
    <div className="flex flex-col flex-1 gap-4 max-w-xl">
      <div className="flex flex-col gap-12">
        <SectionH className="md:text-start">
          {textObject.title ?? "Projects"}
        </SectionH>
        <div className="flex flex-col gap-4 text-xl w-full indent-4 text-muted-foreground">
          {textObject.paragraphs?.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
      <div className="w-full flex justify-center md:justify-start">
        <Button size="lg" className="w-fit mt-4" asChild>
          <Link href="/portfolio">See All Projects</Link>
        </Button>
      </div>
    </div>
  );
}

import Link from "next/link";
import { Button } from "../ui/button";
import SectionText from "@/types/section-text";

type ProjectsInfoProps = {
  textObject: SectionText;
};

export default function ProjectsInfo({ textObject }: ProjectsInfoProps) {
  return (
    <div className="flex flex-col flex-1 gap-4 max-w-xl">
      <div className="flex flex-col gap-12">
        <h2 className="font-bold tracking-tighter text-5xl md:text-6xl">
          {textObject.title ?? "Projects"}
        </h2>
        <div className="flex flex-col text-justify gap-4 text-xl w-full indent-4 dyslexic:font-dyslexic dyslexic:text-lg text-muted-foreground">
          {textObject.paragraphs?.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
      <Button size="lg" className="w-fit mt-4" asChild>
        <Link href="/portfolio">See All Projects</Link>
      </Button>
    </div>
  );
}

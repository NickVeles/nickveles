import ProjectList from "@/components/portfolio/project-list";
import { SectionH } from "@/components/ui/typography";
import Section from "@/components/utils/section";

export default async function Portfolio() {
  // Fetch data from Sanity

  return (
    <Section
      id="portfolio"
      className="gap-12 justify-center items-center first:pt-12"
      disableAnims
    >
      <div className="flex flex-col gap-2">
        <SectionH>Portfolio</SectionH>
        <h3 className="text-xl text-center text-muted-foreground">
          Projects, Work, and Blog Articles
        </h3>
      </div>
      <ProjectList />
    </Section>
  );
}

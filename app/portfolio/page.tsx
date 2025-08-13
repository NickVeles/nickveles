import ProjectList from "@/components/portfolio/project-list";
import { SectionH } from "@/components/ui/typography";
import Section from "@/components/utils/section";
import { getSanityData } from "@/lib/get-sanity-data";
import { processProjects, ProjectData } from "@/types/project";

export default async function Portfolio() {
  // Fetch data from Sanity
  const projectsData =
    (await getSanityData<ProjectData[]>(`*[_type == "project"]{
    _id,
    title,
    "slug": slug.current,
    description,
    author->{
      _id,
      name,
      slug,
      titles,
      image
    },
    editor->{
      _id,
      name,
      slug,
      titles,
      image
    },
    mainImage,
    category->{
      _id,
      title
    },
    markdownContent,
    url,
    repositoryUrl,
    publishedAt,
    editedAt
  } | order(publishedAt desc)`)) ?? [];

  const projects = processProjects(projectsData);

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
      <ProjectList projects={projects} />
    </Section>
  );
}

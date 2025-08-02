import Section from "../utils/section";
import ProjectsInfo from "../utils/projects-info";
import { getSanityData } from "@/lib/get-sanity-data";
import SectionText from "@/types/section-text";
import LatestProject from "../utils/latest-project";
import Project from "@/types/project";

export default async function Projects() {
  const sectionText = (
    await getSanityData<SectionText[]>(`*[_type == "sectionText"]{
      _id,
      title,
      paragraphs,
      category->{
        title,
        "slug": slug.current
      }
    }`)
  )?.filter((x) => x.category?.slug === "projects")[0];

  const latestProject = (
    await getSanityData<Project>(`*[_type == "project"]{
      _id,
      title,
      "slug": slug.current,
      description,
      author,
      editor,
      mainImage,
      category->{
        title
      },
      markdownContent,
      url,
      repositoryUrl,
      publishedAt,
      editedAt
    } | order(publishedAt desc)[0]`)
  );

  return (
    <Section id="projects">
      <div className="flex flex-col lg:flex-row w-full gap-16 lg:gap-32 justify-center items-center">
        {sectionText && <ProjectsInfo textObject={sectionText} />}
        {latestProject && <LatestProject project={latestProject} />}
      </div>
    </Section>
  );
}

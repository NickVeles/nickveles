import { notFound } from "next/navigation";
import AllProjectsButton from "@/components/utils/all-projects-button";
import Section from "@/components/utils/section";
import ProjectHeader from "@/components/portfolio/project-header";
import ProjectDetails from "@/components/portfolio/project-details";
import { getSanityData } from "@/lib/get-sanity-data";
import { processProject, ProjectData } from "@/types/project";
import { BackToTopButton } from "@/components/utils/back-to-top-button";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch data from sanity
  const projectData =
    await getSanityData<ProjectData>(`*[_type == "project" && slug.current == "${slug}"]{
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
  } | order(publishedAt desc)[0]`);

  if (!projectData) {
    notFound();
  }

  const project = processProject(projectData);

  return (
    <Section id={project.slug} className="gap-4" disableAnims>
      <div className="flex flex-col gap-12 first:pt-4">
        <BackToTopButton />
        <AllProjectsButton />
        <ProjectHeader project={project} />
      </div>
      <ProjectDetails project={project} />
    </Section>
  );
}

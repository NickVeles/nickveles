import { notFound } from "next/navigation";
import AllProjectsButton from "@/components/utils/all-projects-button";
import Section from "@/components/utils/section";
import ProjectHeader from "@/components/portfolio/project-header";
import ProjectDetails from "@/components/portfolio/project-details";
import { getSanityData } from "@/lib/get-sanity-data";
import { processProject, ProjectData } from "@/types/project";
import { BackToTopButton } from "@/components/utils/back-to-top-button";
import { Metadata } from "next";

// Enable on-demand revalidation
export const revalidate = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Fetch project data for metadata
  const projectData =
    await getSanityData<ProjectData>(`*[_type == "project" && slug.current == "${slug}"]{
    _id,
    title,
    description,
    category->{
      title
    },
    skills[]->{
      name
    },
    mainImage
  }[0]`);

  if (!projectData) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  const project = processProject(projectData);

  const skillNames =
    project.skills?.map((skill) => skill.name).join(", ") || "";
  const categoryName = project.category?.title || "";

  return {
    metadataBase: new URL("https://nickveles.com/"),
    title: project.title,
    description:
      project.description ||
      `${
        project.title
      } - A ${categoryName.toLowerCase()} project by Nick Veles showcasing ${skillNames}.`,
    keywords: [
      project.title,
      "Nick Veles project",
      categoryName,
      ...skillNames.split(", ").filter(Boolean),
      "web development",
      "portfolio project",
      "software development",
      "freelance developer",
    ],
    openGraph: {
      title: `${project.title} | Nick Veles`,
      description:
        project.description ||
        `${
          project.title
        } - A ${categoryName.toLowerCase()} project by Nick Veles.`,
      images: project.mainImageUrl ? [project.mainImageUrl] : ["/og-image.jpg"],
      locale: "en_US",
      type: "article",
    },
  };
}

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
    skills[]->{
      _id,
      name,
      category->{
        _id,
        title
      },
      tags,
      points
    },
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
    <Section id={project.slug} className="gap-6" disableAnims>
      <div className="flex flex-col gap-12 first:pt-4">
        <BackToTopButton />
        <AllProjectsButton />
        <ProjectHeader project={project} />
      </div>
      <ProjectDetails project={project} />
    </Section>
  );
}

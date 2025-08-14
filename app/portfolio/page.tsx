import ProjectList from "@/components/portfolio/project-list";
import { SectionH } from "@/components/ui/typography";
import Section from "@/components/utils/section";
import { getSanityData } from "@/lib/get-sanity-data";
import { processProjects, ProjectData } from "@/types/project";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://nickveles.com/"),
  title: "Portfolio",
  description:
    "Explore Nick Veles's portfolio of web development projects, machine learning applications, and blog articles. Showcasing full-stack development, AI solutions, and technical expertise.",
  keywords: [
    "Nick Veles portfolio",
    "web development portfolio",
    "machine learning projects",
    "full-stack developer portfolio",
    "software engineering projects",
    "React projects",
    "Node.js applications",
    "Python projects",
    "AI applications",
    "data science projects",
    "freelance developer work",
    "technical blog articles",
    "open source projects",
    "web applications",
    "custom software solutions",
  ],
  openGraph: {
    title: "Portfolio | Nick Veles",
    description:
      "Explore Nick Veles's portfolio of web development projects, machine learning applications, and blog articles. Showcasing full-stack development, AI solutions, and technical expertise.",
    images: ["/og-image.jpg"],
    locale: "en_US",
    type: "website",
  },
};

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

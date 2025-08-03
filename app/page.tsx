import AboutMe from "@/components/home/about-me";
import PersonalHeader from "@/components/home/personal-header";
import Projects from "@/components/home/projects";
import Skills from "@/components/home/skills";
import { BackToTopButton } from "@/components/utils/back-to-top-button";

export default function Home() {
  return (
    <>
      <PersonalHeader />
      <AboutMe />
      <Projects />
      <Skills />
      <BackToTopButton />
    </>
  );
}

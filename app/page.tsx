import AboutMe from "@/components/home/about-me";
import Certificates from "@/components/home/certificates";
import PersonalHeader from "@/components/home/personal-header";
import Projects from "@/components/home/projects";
import Skills from "@/components/home/skills";
import Testimonials from "@/components/home/testimonials";
import { BackToTopButton } from "@/components/utils/back-to-top-button";

export default function Home() {
  return (
    <>
      <PersonalHeader />
      <AboutMe />
      <Testimonials />
      <Projects />
      <Skills />
      <Certificates />
      <BackToTopButton />
    </>
  );
}

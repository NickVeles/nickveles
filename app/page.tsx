import AboutMe from "@/components/home/about-me";
import Certificates from "@/components/home/certificates";
import ContactCTA from "@/components/home/contact-cta";
import PersonalHeader from "@/components/home/personal-header";
import Projects from "@/components/home/projects";
import Skills from "@/components/home/skills";
import Testimonials from "@/components/home/testimonials";
import { BackToTopButton } from "@/components/utils/back-to-top-button";

// Enable on-demand revalidation
export const revalidate = false;

export default function Home() {
  return (
    <>
      <BackToTopButton />
      <PersonalHeader />
      <AboutMe />
      <Testimonials />
      <Projects />
      <Skills />
      <Certificates />
      <ContactCTA />
    </>
  );
}

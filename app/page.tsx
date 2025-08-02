import Introduction from "@/components/home/about-me";
import PersonalHeader from "@/components/home/personal-header";
import Projects from "@/components/home/projects";

export default function Home() {
  return (
    <>
      <PersonalHeader />
      <Introduction />
      <Projects />
    </>
  );
}

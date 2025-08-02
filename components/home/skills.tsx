import { SectionH } from "../ui/typography";
import Section from "../utils/section";
import SkillSearch from "../utils/skill-search";

export default async function Skills() {
  // Fetch data

  return (
    <Section id="skills" className="gap-6">
      <SectionH>
        <span className="text-lg tracking-wide">
          The <span className="font-bold text-xl">WALL</span> of{" "}
        </span>
        Skills
      </SectionH>
      <SkillSearch items={[]} />
    </Section>
  );
}

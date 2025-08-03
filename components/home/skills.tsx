import { getSanityData } from "@/lib/get-sanity-data";
import { SectionH } from "../ui/typography";
import Section from "../utils/section";
import SkillSearch from "../utils/skill-search";
import Skill from "@/types/skill";
import SkillCategory from "@/types/skill-category";

export default async function Skills() {
  // Get individual skills
  const skills = await getSanityData<Skill[]>(`*[_type == "skill"]{
    _id,
    name,
    category->{
      level
    },
    tags,
    points
  } | order(points desc, name asc)`);

  // Get skill categories
  const skillCategories = await getSanityData<
    SkillCategory[]
  >(`*[_type == "skillCategory"]{
    _id,
    name,
    description,
    level,
  } | order(level desc)`);

  const isRenderSkills =
    skills &&
    skills.length > 0 &&
    skillCategories &&
    skillCategories.length > 0;

  return (
    <Section id="skills" className="gap-6">
      <SectionH>
        <span className="text-lg tracking-wide">
          The <span className="font-bold text-xl">WALL</span> of{" "}
        </span>
        Skills
      </SectionH>
      {isRenderSkills && (
        <SkillSearch items={skills} categories={skillCategories} />
      )}
    </Section>
  );
}

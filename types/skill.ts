import SkillCategory from "./skill-category";

export default interface Skill {
  _id: string;
  name: string;
  category: SkillCategory;
  tags: string[];
}

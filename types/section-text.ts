import SectionCategory from "./section-category";

export default interface SectionText {
  _id: string;
  title: string;
  paragraphs: string[];
  category: SectionCategory;
}

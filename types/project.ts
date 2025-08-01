import Author from "./author";
import ProjectCategory from "./project-category";

export default interface Project {
  _id: string;
  title: string;
  slug: string;
  author: Author;
  editor?: Author;
  mainImage?: any;
  category: ProjectCategory;
  markdownContent: string;
  url?: string;
  repositoryUrl?: string;
  publishedAt?: string;
  editedAt?: string;
}
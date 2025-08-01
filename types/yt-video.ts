import SectionCategory from "./section-category";

export default interface YouTubeVideo {
  _id: string;
  title: string;
  youtubeUrl: string;
  category?: SectionCategory;
}

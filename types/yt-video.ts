import YouTubeVideoCategory from "./yt-video-category";

export default interface YouTubeVideo {
  _id: string;
  title: string;
  youtubeUrl: string;
  category?: YouTubeVideoCategory;
}

import YouTubeVideo from "@/types/yt-video"
import VideoSelector from "../utils/video-selector";
import { sanityClient } from "@/lib/sanity"

async function GetVideos() : Promise<YouTubeVideo[] | null> {
    const query = `*[_type == "ytVideo"]{_id, title, youtubeUrl, category->{title}}`;
  
    try {
      const data: YouTubeVideo[] = await sanityClient.fetch(query);
  
      if (!data) {
        console.warn("No data found.");
        return null;
      }
  
      return data;
    } catch (error) {
      console.error("Failed to fetch data from Sanity:", error);
      return null;
    }
}

export default async function Introduction() {
  const videos: YouTubeVideo[] = await GetVideos() ?? [];

  return (
    <VideoSelector videos={videos} />
  )
}
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

export default async function AboutMe() {
  const videos: YouTubeVideo[] = await GetVideos() ?? [];

  return (
    <div className="w-full">
      <h1 className="text-7xl text-center font-serif font-bold">About Me</h1>
      <div className="flex flex-col md:flex-row w-full p-4">
        <VideoSelector videos={videos} />
      </div>
    </div>
  )
}
import YouTubeVideo from "@/types/yt-video";
import VideoSelector from "../utils/video-selector";
import { sanityClient } from "@/lib/sanity";
import { Button } from "../ui/button";
import Link from "next/link";
import TextLink from "../utils/text-link";

async function GetVideos(): Promise<YouTubeVideo[] | null> {
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
  const videos: YouTubeVideo[] = (await GetVideos()) ?? [];

  return (
    <section
      id="about-me"
      className="flex flex-col justify-center items-center w-full min-h-screen p-4 sm:py-4 sm:px-[clamp(1rem,5vw,8rem)] gap-12"
    >
      <h2 className="text-6xl text-center font-bold">About Me</h2>
      <div className="flex flex-col lg:flex-row w-full gap-16">
        <VideoSelector videos={videos} />
        <div className="flex flex-col flex-1 gap-4 items-center justify-start">
          <h3 className="text-center text-wrap text-3xl font-semibold">
            Who I Am
          </h3>
          <div className="flex flex-col text-justify font-serif gap-4 p-4 text-xl w-full indent-4 dyslexic:font-dyslexic dyslexic:text-lg">
            <p>
              I'm Nick, a full stack developer with a passion for creating
              practical, user-focused applications&mdash;from desktop automation
              tools to interactive web apps. I specialize in .NET (C#), and
              modern web stacks like Next.js and TypeScript, with a growing
              foundation in machine learning.
            </p>
            <p>
              My experience ranges from building OPC UA-integrated industrial
              apps and ERP systems to crafting engaging personal projects on the
              web. I'm hands-on, self-driven, and deeply curious&mdash;always
              looking to improve both technically and creatively.
            </p>
            <p>
              I thrive in fast-paced environments, enjoy solving complex
              problems, and believe software should make life
              easier&mdash;whether for businesses, users, or entire communities.
            </p>
            <p>
              Undecided? Well, then{" "}
              <TextLink href="/contact">meet me yourself</TextLink>!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

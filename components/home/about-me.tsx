import YouTubeVideo from "@/types/yt-video";
import VideoSelector from "../utils/video-selector";
import { getSanityData } from "@/lib/get-sanity-data";
import SectionText from "@/types/section-text";
import WhoIAm from "../utils/who-i-am";
import Section from "../utils/section";

export default async function AboutMe() {
  // Get videos for about-me section
  const videos = (
    await getSanityData<YouTubeVideo[]>(`*[_type == "ytVideo"]{
    _id,
    title,
    youtubeUrl,
    category->{
      title,
      "slug": slug.current
    }
  }`)
  )?.filter((x) => x.category?.slug === "about-me");

  // Get the text for this section
  const sectionText = (
    await getSanityData<SectionText[]>(`*[_type == "sectionText"]{
    _id,
    title,
    paragraphs,
    category->{
      title,
      "slug": slug.current
    }
  }`)
  )?.filter((x) => x.category?.slug === "about-me")[0];

  return (
    <Section id="about-me">
      <h2 className="text-6xl text-center font-bold text-wrap">About Me</h2>
      <div className="flex flex-col lg:flex-row w-full gap-16">
        {videos && videos.length > 0 && <VideoSelector videos={videos} />}
        {sectionText && <WhoIAm textObject={sectionText} />}
      </div>
    </Section>
  );
}

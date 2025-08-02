import YouTubeVideo from "@/types/yt-video";
import VideoSelector from "../utils/video-selector";
import { getSanityData } from "@/lib/get-sanity-data";
import SectionText from "@/types/section-text";
import WhoIAm from "../utils/who-i-am";

export default async function AboutMe() {
  // Get videos for about-me section
  const videos = (await getSanityData<YouTubeVideo[]>(`*[_type == "ytVideo"]{
    _id,
    title,
    youtubeUrl,
    category->{
      title,
      "slug": slug.current
    }
  }`))?.filter(
    (x) => x.category?.slug === "about-me"
  );

  // Get the text for this section
  const sectionText = (await getSanityData<SectionText[]>(`*[_type == "sectionText"]{
    _id,
    title,
    paragraphs,
    category->{
      title,
      "slug": slug.current
    }
  }`))?.filter(
    (x) => x.category?.slug === "about-me"
  )[0];

  return (
    <section
      id="about-me"
      className="flex flex-col justify-center items-center w-full min-h-screen p-4 sm:py-4 sm:px-[clamp(1rem,5vw,8rem)] gap-12"
    >
      <h2 className="text-6xl text-center font-bold">About Me</h2>
      <div className="flex flex-col lg:flex-row w-full gap-16">
        {videos && videos.length > 0 && <VideoSelector videos={videos} />}
        {sectionText && <WhoIAm textObject={sectionText} />}
      </div>
    </section>
  );
}

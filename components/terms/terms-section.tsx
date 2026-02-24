import { getSanityData } from "@/lib/get-sanity-data";
import { SectionH } from "../ui/typography";
import Section from "../utils/section";
import { SectionText } from "@/types/section-text";

function getDate(date: string) {
  const d = new Date(date);
  return d.toLocaleString();
}

export default async function TermsSection() {
  const tos =
    await getSanityData<SectionText>(`*[_type == "sectionText" && category->title == "TOS"][0]{
    _id,
    _updatedAt,
    title,
    paragraphs,
    category
  }`);

  return (
    <Section
      id="tos"
      className="gap-12 justify-center items-center first:pt-12"
      disableAnims
    >
      <div className="flex flex-col gap-4">
        <SectionH>Terms of Service</SectionH>
        <h3 className="text-xl font-semibold text-muted-foreground text-center">
          a.k.a Terms, Conditions, and Privacy Policy
        </h3>
      </div>
      <div className="w-full max-w-2xl flex flex-col text-base text-muted-foreground gap-4">
        <p>Last update: {tos && getDate(tos._updatedAt!)}</p>
        <ul className="ml-4 list-decimal flex flex-col gap-2">
          {tos?.paragraphs.map((paragraph, index) => (
            <li key={index}>{paragraph}</li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

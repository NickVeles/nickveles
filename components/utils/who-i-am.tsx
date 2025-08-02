import SectionText from "@/types/section-text";
import TextLink from "./text-link";

type WhoIAmProps = {
  textObject: SectionText;
};

export default function WhoIAm({ textObject }: WhoIAmProps) {
  return (
    <div className="flex flex-col flex-1 gap-4 items-center justify-start max-w-5xl">
      <h3 className="text-center text-wrap text-3xl font-semibold">
        {textObject.title ?? "Who I Am"}
      </h3>
      <div className="flex flex-col text-justify gap-4 p-4 text-xl w-full indent-4 dyslexic:font-dyslexic dyslexic:text-lg">
        {textObject.paragraphs?.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        <p>
          Undecided? Well, then{" "}
          <TextLink href="/contact">meet me yourself</TextLink>!
        </p>
      </div>
    </div>
  );
}

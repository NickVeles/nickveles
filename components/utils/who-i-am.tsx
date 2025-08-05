import SectionText from "@/types/section-text";
import TextLink from "./text-link";

type WhoIAmProps = {
  textObject: SectionText;
};

export default function WhoIAm({ textObject }: WhoIAmProps) {
  return (
    <div className="flex flex-col flex-1 gap-4 items-center justify-start max-w-3xl">
      <h3 className="text-center text-wrap text-3xl font-semibold">
        {textObject.title ?? "Who I Am"}
      </h3>
      <div className="flex flex-col gap-4 text-xl w-full indent-4 text-muted-foreground">
        {textObject.paragraphs?.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        <p>
          Curious how I can help your team or project?{" "}
          <TextLink href="/contact">Let's talk</TextLink>.
        </p>
      </div>
    </div>
  );
}

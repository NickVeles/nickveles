import { getSanityData } from "@/lib/get-sanity-data";
import { SectionH } from "../ui/typography";
import Section from "../utils/section";
import { FAQ } from "@/types/faq";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export default async function FAQSection() {
  const faq =
    (await getSanityData<FAQ[]>(`*[_type == "faq"]{
    _id,
    question,
    answer,
  }`)) ?? [];

  if (faq.length === 0) return null;

  return (
    <Section
      id="faq"
      className="gap-12 justify-center items-center first:pt-12"
      disableAnims
    >
      <SectionH>FAQ</SectionH>
      <Accordion
        type="single"
        collapsible
        className="w-full max-w-2xl"
        defaultValue="item-0"
      >
        {faq.map(({ question, answer }, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger>{question}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-muted-foreground">
              {answer.map((paragraph, jndex) => (
                <p key={`${index}-${jndex}`} className="first:font-bold">
                  {paragraph}
                </p>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}

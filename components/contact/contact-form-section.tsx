import { SectionH } from "../ui/typography";
import ContactFormCard from "../utils/contact-form-card";
import Section from "../utils/section";

export default function ContactFormSection() {
  return (
    <Section id="contact-form" className="gap-12 justify-center items-center first:pt-12" disableAnims>
      <SectionH>Contact</SectionH>
      <ContactFormCard />
    </Section>
  )
}
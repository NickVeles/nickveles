import { sitemap } from "@/constants/sitemap";
import { SectionH } from "../ui/typography";
import ContactFormCard from "../utils/contact-form-card";
import Section from "../utils/section";
import TextLink from "../utils/text-link";

export default function ContactFormSection() {
  return (
    <Section
      id="contact-form"
      className="gap-12 justify-center items-center first:pt-12"
      disableAnims
    >
      <SectionH>Contact</SectionH>
      <ContactFormCard />
      <div className="w-full max-w-2xl flex flex-col justify-center items-center gap-6">
        <h3 className="text-xl font-semibold">Other Contact Information</h3>
        <div className="w-full flex flex-col gap-2 text-base text-muted-foreground">
          <p>You can also contact me through one of my social platforms:</p>
          <ul className="flex flex-col gap-2 list-disc ml-4">
            {sitemap.socials.map((social) => (
              <li key={social.url}>
                <TextLink href={social.url} target="_blank" isIcon>
                  {social.name}
                </TextLink>
              </li>
            ))}
          </ul>
          <p>
            To prevent bots and spam, I only share my phone number and direct
            email address with people who already contacted me through my
            contact form or any of my social platforms.
          </p>
        </div>
      </div>
    </Section>
  );
}

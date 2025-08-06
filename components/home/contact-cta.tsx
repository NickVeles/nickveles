import Link from "next/link";
import { Button } from "../ui/button";
import Section from "../utils/section";

export default function ContactCTA() {
  return (
    <Section id="contact-cta" className="gap-6 items-center justify-center">
      <div className="flex flex-col gap-2 justify-center items-center text-center">
        <h3 className="text-xl text-muted-foreground">
          Like what you see or have questions?
        </h3>
        <p className="text-base text-muted-foreground">
          Visit the contact page to talk with me or read the FAQ!
        </p>
      </div>
      <Button size="lg" asChild>
        <Link href="/contact">Go There Now</Link>
      </Button>
    </Section>
  );
}

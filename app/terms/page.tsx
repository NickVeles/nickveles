import TermsSection from "@/components/terms/terms-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://nickveles.com/"),
  title: "Terms of Service",
  description:
    "Terms of Service for Nick Veles freelance web development and machine learning services. Legal terms, conditions, and policies for website use, project collaboration, and service agreements.",
  keywords: [
    "terms of service",
    "freelance developer terms",
    "web development terms",
    "machine learning services terms",
    "service agreement",
    "legal terms",
    "project terms",
    "freelance contract terms",
    "software development terms",
    "consulting terms",
    "Nick Veles terms",
    "service conditions",
  ],
  openGraph: {
    title: "Terms of Service | Nick Veles",
    description:
      "Terms of Service for Nick Veles freelance web development and machine learning services. Legal terms, conditions, and policies for website use, project collaboration, and service agreements.",
    images: ["/og-image.jpg"],
    locale: "en_US",
    type: "website",
  },
};

export default function TOS() {
  return (
    <>
      <TermsSection />
    </>
  );
}

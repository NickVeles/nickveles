import ContactFormSection from "@/components/contact/contact-form-section";
import FAQSection from "@/components/contact/faq-section";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://nickveles.com/"),
  title: "Contact",
  description:
    "Get in touch with Nick Veles for freelance web development and machine learning projects. Contact form and frequently asked questions about services and collaboration.",
  keywords: [
    "contact Nick Veles",
    "freelance web developer contact",
    "machine learning consultant contact",
    "hire web developer",
    "freelance programmer contact",
    "web development services",
    "machine learning services",
    "project consultation",
    "software development inquiry",
    "custom development quote",
    "technical consulting contact",
    "remote developer hire",
  ],
  openGraph: {
    title: "Contact | Nick Veles",
    description:
      "Get in touch with Nick Veles for freelance web development and machine learning projects. Contact form and frequently asked questions about services and collaboration.",
    images: ["/og-image.jpg"],
    locale: "en_US",
    type: "website",
  },
};

export default function Contact() {
  return (
    <>
      <ContactFormSection />
      <FAQSection />
    </>
  );
}

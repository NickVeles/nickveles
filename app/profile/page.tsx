import PasswordProtected from "@/components/profile/password-protected";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://nickveles.com/"),
  title: "Profile",
  description:
    "A profile page with personal information about me, intended for friends and trusted individuals who want to get to know me beyond my professional life.",
  openGraph: {
    title: "Profile | Nick Veles",
    description:
      "A profile page with personal information about me, intended for friends and trusted individuals who want to get to know me beyond my professional life.",
    images: ["/og-image.jpg"],
    locale: "en_US",
    type: "website",
  },
};

export default function ProtectedPage() {
  return <PasswordProtected>test</PasswordProtected>;
}

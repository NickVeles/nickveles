import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Nick Veles – Freelance Web Developer & Machine Learning Expert",
    template: "%s | Nick Veles",
  },
  description:
    "Freelance software engineer specializing in full-stack web development and machine learning. Offering scalable, data-driven solutions tailored to your business needs.",
  openGraph: {
    title: "Nick Veles – Freelance Web Developer & Machine Learning Expert",
    description:
      "Freelance software engineer specializing in full-stack web development and machine learning. Offering scalable, data-driven solutions tailored to your business needs.",
    images: ["/openGraph.jpg"],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en_US">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

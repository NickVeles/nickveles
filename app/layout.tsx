import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Caveat,
  Lora,
  JetBrains_Mono,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { AccessibilityProvider } from "@/components/accessibility/accessibility-provider";
import SkipNavigation from "@/components/accessibility/skip-navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Main from "@/components/main";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const serif = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nickveles.com/"),
  title: {
    default: "Nick Veles – Freelance Web Developer & Machine Learning Expert",
    template: "%s | Nick Veles",
  },
  description:
    "Freelance software engineer specializing in full-stack web development and machine learning. Offering scalable, data-driven solutions tailored to your business needs.",
  keywords: [
    "freelance web developer",
    "machine learning engineer",
    "full-stack developer",
    "software engineer",
    "data scientist",
    "Python developer",
    "JavaScript developer",
    "React developer",
    "Node.js developer",
    "AI consultant",
    "ML specialist",
    "custom software development",
    "web application development",
    "machine learning solutions",
    "data analysis",
    "API development",
    "database design",
    "cloud solutions",
    "scalable web apps",
    "data-driven solutions",
    "technical consulting",
    "software consulting",
    "remote developer",
    "freelance programmer",
    "Nick Veles",
  ],
  openGraph: {
    title: "Nick Veles – Freelance Web Developer & Machine Learning Expert",
    description:
      "Freelance software engineer specializing in full-stack web development and machine learning. Offering scalable, data-driven solutions tailored to your business needs.",
    images: ["/og-image.jpg"],
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
    <html lang="en_US" suppressHydrationWarning>
      <body
        className={`${sans.variable} ${mono.variable} ${serif.variable} ${caveat.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AccessibilityProvider>
            <SkipNavigation />
            <Header />
            <Main>{children}</Main>
            <Footer />
          </AccessibilityProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

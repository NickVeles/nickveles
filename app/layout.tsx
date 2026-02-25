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
import { HybridTooltipProvider, TouchProvider } from "@/components/ui/hybrid-tooltip";
import { Toaster } from "@/components/ui/sonner";
import CookieNotification from "@/components/utils/cookie-notification";

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
    default: "Nick Veles – Performance-First Full-Stack React Developer",
    template: "%s | Nick Veles",
  },
  description:
    "Full-stack React developer specializing in fast, accessible, and SEO-optimized web applications. Building clean, minimalist, and cloud-ready websites with Next.js and TypeScript.",
  keywords: [
    "React developer",
    "Next.js developer",
    "full-stack React developer",
    "accessibility-first web developer",
    "performance-focused web developer",
    "SEO-optimized websites",
    "minimalist web design",
    "TypeScript developer",
    "modern web applications",
    "cloud-ready web apps",
    "AWS web deployment",
    "web performance optimization",
    "accessible UI development",
    "clean web architecture",
    "scalable web applications",
    "freelance React developer",
    "Nick Veles",
  ],
  openGraph: {
    title: "Nick Veles – Accessibility & Performance-Focused React Developer",
    description:
      "I build fast, accessible, and maintainable web applications with React, Next.js, and TypeScript. Clean architecture. Minimalist design. No unnecessary complexity.",
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
    <html lang="en-US" className="scroll-smooth" suppressHydrationWarning>
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
            <TouchProvider>
              <HybridTooltipProvider>
                <SkipNavigation />
                <Header />
                <Main>{children}</Main>
                <Footer />
                <CookieNotification />
                <Toaster />
              </HybridTooltipProvider>
            </TouchProvider>
          </AccessibilityProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

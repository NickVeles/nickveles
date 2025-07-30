import { ReactNode } from "react";
import Image from "next/image";

// custom icons
import DatingSimplifiedIcon from "@/assets/icons/datingsimplified.svg";
import LinkedInIcon from "@/assets/icons/linkedin.svg";
import GitHubIcon from "@/assets/icons/github.svg";
import UpworkIcon from "@/assets/icons/upwork.svg";

const ICON_SIZE = 32;

type SitemapLink = {
  url: string;
  name: string;
  icon?: ReactNode;
};

type Sitemap = {
  navigation: SitemapLink[];
  affiliates: SitemapLink[];
  socials: SitemapLink[];
};

export const sitemap: Sitemap = {
  navigation: [
    {
      url: "/",
      name: "Home",
    },
    {
      url: "/portfolio",
      name: "Portfolio",
    },
    {
      url: "/contact",
      name: "Hire/Contact",
    },
  ],
  affiliates: [
    {
      url: "https://datingsimplified.vercel.app/",
      name: "Dating Simplified",
      icon: (
        <Image
          src={DatingSimplifiedIcon}
          alt="Dating Simplified Logo"
          width={32}
          height={32}
        />
      ),
    },
  ],
  socials: [
    {
      url: "https://www.linkedin.com/in/nickveles/",
      name: "LinkedIn",
      icon: (
        <Image
          src={LinkedInIcon}
          alt="LinkedIn Logo"
          width={ICON_SIZE}
          height={ICON_SIZE}
          className="dark:invert"
        />
      ),
    },
    {
      url: "https://github.com/NickVeles",
      name: "GitHub",
      icon: (
        <Image
          src={GitHubIcon}
          alt="GitHub Logo"
          width={ICON_SIZE}
          height={ICON_SIZE}
          className="dark:invert"
        />
      ),
    },
    {
      url: "https://www.upwork.com/", //TODO: put your Upwork profile link here
      name: "Upwork",
      icon: (
        <Image
          src={UpworkIcon}
          alt="Upwork Logo"
          width={ICON_SIZE}
          height={ICON_SIZE}
          className="dark:invert"
        />
      ),
    },
  ],
};

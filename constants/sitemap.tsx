import { IconBrandLinkedin, IconBrandGithub, IconBrandUpwork } from "@tabler/icons-react"
import { ReactElement } from "react";
import Image from "next/image";

// custom icons
import IconDatingSimplified from "@/assets/icons/datingsimplified.svg";

type SitemapLink = {
  url: string;
  name: string;
  icon?: ReactElement;
}

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
      icon: <Image src={IconDatingSimplified} alt="Dating Simplified Logo" width={32} height={32} />,
    },
  ],
  socials: [
    {
      url: "https://www.linkedin.com/in/nickveles/",
      name: "LinkedIn",
      icon: <IconBrandLinkedin className="size-8"/>,
    },
    {
      url: "https://github.com/NickVeles",
      name: "GitHub",
      icon: <IconBrandGithub className="size-8"/>,
    },
    {
      url: "https://www.upwork.com/", //TODO: put your Upwork profile link here
      name: "Upwork",
      icon: <IconBrandUpwork className="size-8"/>,
    },
  ],
}
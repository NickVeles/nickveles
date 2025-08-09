import { LinkedInIcon, GitHubIcon, UpworkIcon, DatingSimplifiedIcon } from "@/components/icons";

type SitemapLink = {
  url: string;
  name: string;
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  isFooterOnly?: boolean;
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
    {
      url: "/tos",
      name: "Terms and Conditions",
      isFooterOnly: true,
    },
  ],
  affiliates: [
    {
      url: "https://datingsimplified.vercel.app/",
      name: "Dating Simplified",
      Icon: DatingSimplifiedIcon,
    },
  ],
  socials: [
    {
      url: "https://www.linkedin.com/in/nickveles/",
      name: "LinkedIn",
      Icon: LinkedInIcon,
    },
    {
      url: "https://github.com/NickVeles",
      name: "GitHub",
      Icon: GitHubIcon,
    },
    {
      url: "https://www.upwork.com/", //TODO: put your Upwork profile link here
      name: "Upwork",
      Icon: UpworkIcon,
    },
  ],
};

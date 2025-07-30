// custom icons
import DatingSimplifiedIcon from "@/assets/icons/datingsimplified.svg";
import LinkedInIcon from "@/assets/icons/linkedin.svg";
import GitHubIcon from "@/assets/icons/github.svg";
import UpworkIcon from "@/assets/icons/upwork.svg";

type SitemapLink = {
  url: string;
  name: string;
  image?: any;
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
      image: DatingSimplifiedIcon,
    },
  ],
  socials: [
    {
      url: "https://www.linkedin.com/in/nickveles/",
      name: "LinkedIn",
      image: LinkedInIcon,
    },
    {
      url: "https://github.com/NickVeles",
      name: "GitHub",
      image: GitHubIcon,
    },
    {
      url: "https://www.upwork.com/", //TODO: put your Upwork profile link here
      name: "Upwork",
      image: UpworkIcon,
    },
  ],
};

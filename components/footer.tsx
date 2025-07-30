import { sitemap } from "@/constants/sitemap";
import TextLink from "./utils/text-link";

export default function Footer() {
  return (
    <footer className="w-full flex-col justify-center items-center border-t border-border font-sans p-4">
      <nav className="flex flex-col sm:flex-row flex-wrap justify-center items-center sm:items-start gap-8 sm:gap-16 text-center sm:text-start mb-8">
        {/* Navigation */}
        <div className="flex flex-col gap-1">
          <h4 className="text-sm text-muted-foreground sm:text-start">Navigation</h4>
          <ul className="flex flex-col gap-1">
            {sitemap.navigation.map(({ name, url }) => (
              <li key={name}>
                <TextLink
                  href={url}
                  className="text-foreground visited:text-foreground"
                >
                  {name}
                </TextLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Affiliates */}
        <div className="flex flex-col gap-1">
          <h4 className="text-sm text-muted-foreground">Affiliates</h4>
          <ul className="flex flex-col gap-1">
            {sitemap.affiliates.map(({ name, url }) => (
              <li key={name}>
                <TextLink
                  href={url}
                  target="_blank"
                  isIcon
                  className="text-foreground visited:text-foreground"
                >
                  {name}
                </TextLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Career */}
        <div className="flex flex-col gap-1">
          <h4 className="text-sm text-muted-foreground">Career</h4>
          <ul className="flex gap-1">
            {sitemap.socials.map(({ name, icon, url }) => (
              <li key={name}>
                <TextLink
                  href={url}
                  target="_blank"
                  className="text-foreground visited:text-foreground"
                >
                  {icon}
                </TextLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Copyright notice */}
      <span className="flex w-full justify-center text-muted-foreground text-sm">
        © {new Date().getFullYear()} Nick Veles. All rights reserved.
      </span>
    </footer>
  );
}

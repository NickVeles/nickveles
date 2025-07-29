import { sitemap } from "@/constants/sitemap";
import { Link } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full flex-col justify-center items-center border-t border-border font-sans p-4 gap-4">
      <nav className="flex w-full justify-center flex-wrap gap-8">
        {/* Navvigation */}
        <div className="flex flex-col gap-1">
          <h4 className="text-sm text-muted-foreground">Navigation</h4>
          <ul className="flex flex-col gap-1">
            {sitemap.navigation.map(({ name, url }) => (
              <li key={name}>
                <Link href={url}>{name}</Link>
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
                <Link href={url} target="_blank">{name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Career */}
        <div className="flex flex-col gap-1">
          <h4 className="text-sm text-muted-foreground">Career</h4>
          <ul className="flex gap-1">
            {sitemap.navigation.map(({ name, icon, url }) => (
              <li key={name}>
                <Link href={url} target="_blank">{icon}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Copyright notice */}
      <span className="text-muted-foreground text-sm">
        © {new Date().getFullYear()} Nick Veles. All rights reserved.
      </span>
    </footer>
  );
}

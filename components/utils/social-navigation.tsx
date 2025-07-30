import { sitemap } from "@/constants/sitemap";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";

export default function SocialNavigation({
  onClick,
}: {
  onClick?: () => void;
}) {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList className="w-full flex">
        {sitemap.socials.map(({ name, url, icon }) => (
          <NavigationMenuItem key={name}>
            <NavigationMenuLink
              href={url}
              onClick={onClick ? () => onClick() : undefined}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-row items-center text-lg text-foreground"
            >
              {icon}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

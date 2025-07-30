import { sitemap } from "@/constants/sitemap";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import Image from "next/image";

type SocialNavigationProps = {
  iconSize?: number;
  onClick?: () => void;
};

export default function SocialNavigation({
  iconSize = 24,
  onClick,
}: SocialNavigationProps) {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList className="w-full flex">
        {sitemap.socials.map(({ name, url, image }) => (
          <NavigationMenuItem key={name}>
            <NavigationMenuLink
              href={url}
              onClick={onClick ? () => onClick() : undefined}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-row items-center text-lg text-foreground"
            >
              <Image
                src={image}
                alt={name}
                width={iconSize}
                height={iconSize}
                className="dark:invert"
              />
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

import { sitemap } from "@/constants/sitemap";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";

type SocialNavigationProps = {
  iconSize?: number;
  onClick?: () => void;
};

export default function SocialNavigation({
  iconSize = 6,
  onClick,
}: SocialNavigationProps) {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList className="w-full flex">
        {sitemap.socials.map(({ name, url, Icon }) => (
          <NavigationMenuItem key={name}>
            <NavigationMenuLink
              href={url}
              onClick={onClick ? () => onClick() : undefined}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-row items-center text-lg text-foreground"
            >
              {Icon && <Icon className={`size-${iconSize}`}/>}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

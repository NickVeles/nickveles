import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { sitemap } from "@/constants/sitemap";

// Custom data
import LogomarkSVG from "@/assets/icons/logomark.svg";
import { ExternalLinkIcon } from "lucide-react";
import SocialNavigation from "./social-navigation";

type PCMenuProps = {
  className?: string;
};

export default function PCMenu({ className }: PCMenuProps) {
  return (
    <div className={cn("flex justify-between items-center w-full", className)}>
      {/* Left side */}
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/">
              <Image
                src={LogomarkSVG}
                alt="Home"
                width={26}
                height={26}
                className="dark:invert"
              />
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Rest of navigation */}
          {sitemap.navigation.slice(1).map(({ name, url }) => (
            <NavigationMenuItem key={name}>
              <NavigationMenuLink
                href={url}
                className={
                  name === "Hire/Contact"
                    ? "text-accent-foreground rounded-sm hover:bg-primary hover:text-primary-foreground"
                    : ""
                }
              >
                {name}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}

          {/* Affiliates */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="px-2">Affiliates</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="min-w-[250px] gap-1">
                {sitemap.affiliates.map(({ name, url, image }) => (
                  <li key={name} className="w-full">
                    <NavigationMenuLink
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-row items-center w-full"
                    >
                      <Image
                        src={image}
                        alt={name}
                        width={24}
                        height={24}
                        className="dark:invert mr-1"
                      />
                      {name}
                      <ExternalLinkIcon className="ml-auto size-4 text-foreground" />
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Right Side */}
      <SocialNavigation />
    </div>
  );
}

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { sitemap } from "@/constants/sitemap";
import { ExternalLinkIcon } from "lucide-react";
import SocialNavigation from "./social-navigation";
import { Logomark } from "../icons";

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
              <Logomark className="size-6 text-inherit" />
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Rest of navigation */}
          {sitemap.navigation.slice(1).map(({ name, url }) => (
            <NavigationMenuItem key={name}>
              <NavigationMenuLink
                href={url}
                className={
                  name === "Hire/Contact"
                    ? "text-primary-highlighter rounded-sm hover:bg-primary hover:text-primary-foreground"
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
                {sitemap.affiliates.map(({ name, url, Icon }) => (
                  <li key={name} className="w-full">
                    <NavigationMenuLink
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex flex-row items-center w-full"
                    >
                      {Icon && <Icon className="size-6 text-inherit" />}
                      {name}
                      <ExternalLinkIcon className="ml-auto size-4 text-inherit" />
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

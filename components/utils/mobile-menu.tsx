"use client";

import * as React from "react";
import { ExternalLinkIcon, MenuIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { sitemap } from "@/constants/sitemap";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Custom data
import LogoSVG from "@/assets/icons/logo.svg";
import SocialNavigation from "./social-navigation";

type MobileMenuProps = {
  className?: string;
};

export default function MobileMenu({ className }: MobileMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className={cn("rounded-sm", className)}
          size="icon"
          aria-label="Toggle menu"
        >
          <MenuIcon className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px]"
        aria-description="Mobile menu"
      >
        {/* Sheet header */}
        <SheetHeader className="flex h-16 border-b justify-center">
          <SheetClose asChild>
            <Button
              variant="ghost"
              className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute right-4 opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none size-8 flex justify-center items-center rounded-sm"
              size="icon"
              aria-label="Close menu"
            >
              <XIcon className="size-6" />
            </Button>
          </SheetClose>
          <SheetTitle className="text-lg font-semibold">
            <Image
              src={LogoSVG}
              alt="Nick Veles Logo"
              className="h-14 dark:invert"
            />
          </SheetTitle>
        </SheetHeader>

        {/* Navigation */}
        <NavigationMenu
          viewport={false}
          className="flex flex-col w-full h-full justify-start"
        >
          <NavigationMenuList className="flex flex-col gap-12 px-2 items-start">
            {/* Menu */}
            <div className="flex flex-col">
              <h4 className="ml-2 mb-1 text-sm text-muted-foreground">Menu</h4>
              {sitemap.navigation.map(({ name, url }) => (
                <NavigationMenuItem key={name}>
                  <NavigationMenuLink
                    href={url}
                    onClick={() => setIsOpen(false)}
                    className="inline-flex flex-row text-lg"
                  >
                    {name}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </div>

            {/* Affiliates */}
            <div className="flex flex-col">
              <h4 className="ml-2 mb-1 text-sm text-muted-foreground">
                Affiliates
              </h4>
              {sitemap.affiliates.map(({ name, url }) => (
                <NavigationMenuItem key={name}>
                  <NavigationMenuLink
                    href={url}
                    onClick={() => setIsOpen(false)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-row items-center text-lg"
                  >
                    {name}
                    <ExternalLinkIcon className="size-4 text-foreground" />
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </div>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Sidebar footer */}
        <SheetFooter className="flex items-start">
          <SocialNavigation onClick={() => setIsOpen(false)} iconSize={32} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

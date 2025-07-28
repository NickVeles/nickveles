"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAccessibility } from "@/components/accessibility/accessibility-provider";
import {
  IconAccessible,
  IconSun,
  IconMoon,
  IconCheck,
} from "@tabler/icons-react";
import Image from "next/image";

// Custom icons
import IconOpendyslexic from "@/assets/icons/opendyslexic.svg";
import IconOpendyslexicCrossed from "@/assets/icons/opendyslexic-crossed.svg";
import IconFontSizeIncrease from "@/assets/icons/font-size-increase.svg";
import IconFontSizeDecrease from "@/assets/icons/font-size-decrease.svg";

export function AccessibilityButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const {
    isDyslexicFont,
    fontSize,
    toggleDyslexicFont,
    increaseFontSize,
    decreaseFontSize,
  } = useAccessibility();

  const handleThemeChange = (newTheme: string) => {
    if (theme !== newTheme) {
      setTheme(newTheme);
    }
  };

  // Ensure theme is loaded before rendering
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label="Accessibility settings"
        >
          <IconAccessible className="size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end">
        {/* Theme Section */}
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => handleThemeChange("light")}>
          <IconSun className="mr-2 h-4 w-4" />
          <span>Toggle Light Theme</span>
          {theme === "light" && <IconCheck className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
          <IconMoon className="mr-2 h-4 w-4" />
          <span>Toggle Dark Theme</span>
          {theme === "dark" && <IconCheck className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Font Section */}
        <DropdownMenuLabel>Font</DropdownMenuLabel>
        <DropdownMenuItem onClick={toggleDyslexicFont}>
          {isDyslexicFont ? (
            <Image
              src={IconOpendyslexicCrossed}
              alt="Open Dyslexic Crossed"
              width={16}
              height={16}
              className="mr-2 h-4 w-4 dark:invert"
            />
          ) : (
            <Image
              src={IconOpendyslexic}
              alt="Open Dyslexic"
              width={16}
              height={16}
              className="mr-2 h-4 w-4 dark:invert"
            />
          )}
          <span>Toggle Dyslexic Font</span>
          {isDyslexicFont && <IconCheck className="ml-auto h-4 w-4" />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={increaseFontSize} disabled={fontSize >= 2}>
          <Image
            src={IconFontSizeIncrease}
            alt="Increase font size"
            width={16}
            height={16}
            className="mr-2 h-4 w-4 dark:invert"
          />
          <span>Increase Font Size</span>
          <span className="ml-auto text-xs text-muted-foreground">
            {fontSize}x
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={decreaseFontSize} disabled={fontSize <= 1}>
          <Image
            src={IconFontSizeDecrease}
            alt="Decrease font size"
            width={16}
            height={16}
            className="mr-2 h-4 w-4 dark:invert"
          />
          <span>Decrease Font Size</span>
          <span className="ml-auto text-xs text-muted-foreground">
            {fontSize}x
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

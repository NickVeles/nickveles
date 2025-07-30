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
  PersonStandingIcon,
  SunIcon,
  MoonIcon,
  CheckIcon,
  AArrowUpIcon,
  AArrowDownIcon,
} from "lucide-react";
// import {
//   IconAccessible,
//   IconSun,
//   IconMoon,
//   IconCheck,
// } from "@tabler/icons-react";
import Image from "next/image";

// Custom icons
import IconOpendyslexic from "@/assets/icons/opendyslexic.svg";
import IconOpendyslexicCrossed from "@/assets/icons/opendyslexic-crossed.svg";
import IconFontSizeIncrease from "@/assets/icons/font-size-increase.svg";
import IconFontSizeDecrease from "@/assets/icons/font-size-decrease.svg";

const MENUICON_SIZE = 16;

export function AccessibilityButton() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const {
    isDyslexicFont,
    fontSize,
    toggleDyslexicFont,
    increaseFontSize,
    decreaseFontSize,
  } = useAccessibility();

  const handleThemeChange = (newTheme: string) => {
    if (resolvedTheme !== newTheme) {
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
          <PersonStandingIcon className="size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end">
        {/* Theme Section */}
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => handleThemeChange("light")}>
          <SunIcon size={MENUICON_SIZE} className="mr-1" />
          <span>Toggle Light Theme</span>
          {resolvedTheme === "light" && (
            <CheckIcon size={MENUICON_SIZE} className="ml-auto" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
          <MoonIcon size={MENUICON_SIZE} className="mr-1" />
          <span>Toggle Dark Theme</span>
          {resolvedTheme === "dark" && (
            <CheckIcon size={MENUICON_SIZE} className="ml-auto" />
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Font Section */}
        <DropdownMenuLabel>Font</DropdownMenuLabel>
        <DropdownMenuItem onClick={toggleDyslexicFont}>
          {isDyslexicFont ? (
            <Image
              src={IconOpendyslexicCrossed}
              alt="Open Dyslexic Crossed"
              width={MENUICON_SIZE}
              height={MENUICON_SIZE}
              className="mr-1 dark:invert"
            />
          ) : (
            <Image
              src={IconOpendyslexic}
              alt="Open Dyslexic"
              width={MENUICON_SIZE}
              height={MENUICON_SIZE}
              className="mr-1 dark:invert"
            />
          )}
          <span>Toggle Dyslexic Font</span>
          {isDyslexicFont && <CheckIcon size={MENUICON_SIZE} className="ml-auto" />}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={increaseFontSize}
          onSelect={(e) => e.preventDefault()}
          disabled={fontSize >= 1.5}
        >
          <AArrowUpIcon size={MENUICON_SIZE} className="mr-1"/>
          <span>Increase Font Size</span>
          <span className="ml-auto text-xs text-muted-foreground">
            {fontSize}x
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={decreaseFontSize}
          onSelect={(e) => e.preventDefault()}
          disabled={fontSize <= 1}
        >
          <AArrowDownIcon size={MENUICON_SIZE} className="mr-1"/>
          <span>Decrease Font Size</span>
          <span className="ml-auto text-xs text-muted-foreground">
            {fontSize}x
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

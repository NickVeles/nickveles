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
import { OpenDyelxicCrossedIcon, OpenDyelxicIcon } from "../icons";
import { cn } from "@/lib/utils";

type AccessibilityButtonProps = {
  className?: string;
};

const ICON_STYLE = "text-inherit size-4";

export function AccessibilityButton({ className }: AccessibilityButtonProps) {
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
          className={className}
        >
          <PersonStandingIcon className="size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end">
        {/* Theme Section */}
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => handleThemeChange("light")}>
          <SunIcon className={cn("mr-1", ICON_STYLE)} />
          <span>Toggle Light Theme</span>
          {resolvedTheme === "light" && (
            <CheckIcon className={cn("ml-auto", ICON_STYLE)} />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
          <MoonIcon className={cn("mr-1", ICON_STYLE)} />
          <span>Toggle Dark Theme</span>
          {resolvedTheme === "dark" && (
            <CheckIcon className={cn("ml-auto", ICON_STYLE)} />
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Font Section */}
        <DropdownMenuLabel>Font</DropdownMenuLabel>
        <DropdownMenuItem onClick={toggleDyslexicFont}>
          {isDyslexicFont ? (
            <OpenDyelxicCrossedIcon className={cn("mr-1", ICON_STYLE)} />
          ) : (
            <OpenDyelxicIcon className={cn("mr-1", ICON_STYLE)} />
          )}
          <span>Toggle Dyslexic Font</span>
          {isDyslexicFont && (
            <CheckIcon className={cn("ml-auto", ICON_STYLE)} />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={increaseFontSize}
          onSelect={(e) => e.preventDefault()}
          disabled={fontSize >= 1.5}
        >
          <AArrowUpIcon className={cn("mr-1", ICON_STYLE)} />
          <span>Increase Font Size</span>
          <span className="ml-auto text-xs text-inherit">{fontSize}x</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={decreaseFontSize}
          onSelect={(e) => e.preventDefault()}
          disabled={fontSize <= 1}
        >
          <AArrowDownIcon className={cn("mr-1", ICON_STYLE)} />
          <span>Decrease Font Size</span>
          <span className="ml-auto text-xs text-inherit">{fontSize}x</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

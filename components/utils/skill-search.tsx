"use client";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InfoIcon, Search } from "lucide-react";
import { useState, useRef, useMemo, useEffect } from "react";
import { Skill } from "@/types/skill";
import TextLink from "./text-link";
import { SkillCategory } from "@/types/skill-category";
import {
  HybridTooltip,
  HybridTooltipContent,
  HybridTooltipTrigger,
} from "../ui/hybrid-tooltip";
import { motion } from "framer-motion";
import { useDebouncedValue } from "@/hooks/use-debounced-value";

type SkillSearchProps = {
  items: Skill[];
  categories: SkillCategory[];
};

export default function SkillSearch({ items, categories }: SkillSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebouncedValue(searchTerm);
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const searchRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Constants
  const SEARCH_OFFSET = 84; // so the search input doesn't hide behind the sticky header
  const SEARCH_DELAY = 300; // mobile keyboard delay
  const OVERLAY_TRIGGER_HEIGHT = 600;
  const OVERLAY_MAX_HEIGHT = 400;

  const handleSearchFocus = () => {
    // On mobile, scroll the search input to the top when focused
    if (window.innerWidth < 768) {
      setTimeout(() => {
        const inputTop = searchRef.current?.getBoundingClientRect().top;

        if (inputTop !== undefined) {
          window.scrollTo({
            top: window.scrollY + inputTop - SEARCH_OFFSET,
            behavior: "smooth",
          });
        }
      }, SEARCH_DELAY);
    }
  };

  const filteredSkills = useMemo(() => {
    if (!debouncedSearchTerm.trim()) return items;

    const lowercaseSearch = debouncedSearchTerm.toLowerCase().trim();

    return items.filter((skill) => {
      // Search in name
      const nameMatch = skill.name.toLowerCase().includes(lowercaseSearch);

      // Search in tags
      const tagMatch = skill.tags.some((tag) =>
        tag.toLowerCase().includes(lowercaseSearch),
      );

      return nameMatch || tagMatch;
    });
  }, [debouncedSearchTerm, items]);

  // Measure content height whenever filtered skills change
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [filteredSkills]);

  // Determine if overlay should be shown (content > 600px and not expanded)
  const shouldShowOverlay =
    contentHeight > OVERLAY_TRIGGER_HEIGHT && !isExpanded;
  const maxHeight = shouldShowOverlay ? OVERLAY_MAX_HEIGHT : contentHeight;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col gap-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          ref={searchRef}
          type="text"
          placeholder="Search for desired skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={handleSearchFocus}
          className="pl-10 text-base"
        />
      </div>

      <div className="flex flex-col gap-4">
        <div className="text-sm text-muted-foreground ml-1">
          {filteredSkills.length}{" "}
          {filteredSkills.length === 1 ? "result" : "results"}
          {debouncedSearchTerm && <span> for "{debouncedSearchTerm}"</span>}
        </div>

        <div className="relative">
          <motion.div
            ref={contentRef}
            className="flex flex-col gap-6 overflow-hidden"
            animate={{ maxHeight }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {filteredSkills.length > 0 &&
              categories.map((category) => {
                const skillsInCategory = filteredSkills.filter(
                  (skill) => skill.category.level === category.level,
                );

                if (skillsInCategory.length === 0) return null;

                return (
                  <div className="flex flex-col gap-2" key={category._id}>
                    <h3 className="flex items-center gap-1 text-xl font-semibold ml-1">
                      {category.name}
                      <HybridTooltip>
                        <HybridTooltipTrigger
                          aria-label="Info trigger"
                          className="flex justify-center items-center"
                        >
                          <InfoIcon className="size-4" />
                        </HybridTooltipTrigger>
                        <HybridTooltipContent>
                          {category.description}
                        </HybridTooltipContent>
                      </HybridTooltip>
                    </h3>
                    <ul className="flex flex-wrap gap-2">
                      {skillsInCategory.map((skill) => (
                        <li key={skill._id}>
                          <Badge
                            variant="secondary"
                            className="px-3 py-2 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default dyslexic:font-dyslexic dyslexic:text-sx"
                          >
                            {skill.name}
                          </Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
          </motion.div>

          {/* Gradient */}
          {shouldShowOverlay && (
            <div className="absolute inset-x-0 bottom-10 h-32 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
          )}

          {/* Show All Button */}
          {shouldShowOverlay && (
            <div className="relative z-10 flex justify-center transform -translate-y-1/2">
              <Button
                onClick={() => setIsExpanded(true)}
                variant="default"
                size="lg"
              >
                Show All
              </Button>
            </div>
          )}
        </div>

        {filteredSkills.length === 0 && debouncedSearchTerm && (
          <div className="text-center py-4 text-muted-foreground">
            <p className="text-lg font-medium mb-2">No results?</p>
            <div className="text-sm">
              <p>
                <TextLink href="/contact">Contact me</TextLink> and I might
                learn it for <span className="font-stylized text-xl">free</span>
              </p>
              <p>(Also, check your spelling in case you missed your search)</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { InfoIcon, Search } from "lucide-react";
import { useState, useRef, useMemo } from "react";
import Skill from "@/types/skill";
import TextLink from "./text-link";
import SkillCategory from "@/types/skill-category";
import {
  HybridTooltip,
  HybridTooltipContent,
  HybridTooltipTrigger,
} from "../ui/hybrid-tooltip";

type SkillSearchProps = {
  items: Skill[];
  categories: SkillCategory[];
};

export default function SkillSearch({ items, categories }: SkillSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const handleSearchFocus = () => {
    // On mobile, scroll the search input to the top when focused
    if (window.innerWidth < 768) {
      setTimeout(() => {
        searchRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300); // Small delay to allow keyboard to appear
    }
  };

  const filteredSkills = useMemo(() => {
    if (!searchTerm.trim()) return items;

    const lowercaseSearch = searchTerm.toLowerCase().trim();

    return items.filter((skill) => {
      // Search in name
      const nameMatch = skill.name.toLowerCase().includes(lowercaseSearch);

      // Search in tags
      const tagMatch = skill.tags.some((tag) =>
        tag.toLowerCase().includes(lowercaseSearch)
      );

      return nameMatch || tagMatch;
    });
  }, [searchTerm]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 flex flex-col gap-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          ref={searchRef}
          type="text"
          placeholder="Search for whatever skill you need..."
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
          {searchTerm && <span> for "{searchTerm}"</span>}
        </div>

        <div className="flex flex-col gap-6">
          {filteredSkills.length > 0 &&
            categories.map((category) => {
              const skillsInCategory = filteredSkills.filter(
                (skill) => skill.category.level === category.level
              );

              if (skillsInCategory.length === 0) return null;

              return (
                <div className="flex flex-col gap-2" key={category._id}>
                  <h3 className="flex items-center gap-1 text-xl font-semibold ml-1">
                    {category.name}
                    <HybridTooltip>
                      <HybridTooltipTrigger>
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
                          className="px-3 py-2 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer dyslexic:font-dyslexic dyslexic:text-sx"
                        >
                          {skill.name}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
        </div>

        {filteredSkills.length === 0 && searchTerm && (
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

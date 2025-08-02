"use client";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { useState, useRef, useMemo } from "react";
import Skill from "@/types/skill";
import TextLink from "./text-link";

interface Chip {
  id: number;
  name: string;
  tags: string[];
}

type SkillSearchProps = {
  items: Skill[];
};

const skillData: Chip[] = [
  {
    id: 1,
    name: "React",
    tags: ["javascript", "frontend", "library", "ui", "component"],
  },
  {
    id: 2,
    name: "Next.js",
    tags: ["react", "framework", "fullstack", "ssr", "routing"],
  },
  {
    id: 3,
    name: "TypeScript",
    tags: ["javascript", "types", "static", "microsoft", "language"],
  },
  {
    id: 4,
    name: "Tailwind CSS",
    tags: ["css", "utility", "styling", "responsive", "design"],
  },
  {
    id: 5,
    name: "Node.js",
    tags: ["javascript", "backend", "server", "runtime", "npm"],
  },
  {
    id: 6,
    name: "Python",
    tags: ["programming", "backend", "data", "machine learning", "scripting"],
  },
  {
    id: 7,
    name: "Docker",
    tags: [
      "container",
      "deployment",
      "devops",
      "virtualization",
      "microservices",
    ],
  },
  {
    id: 8,
    name: "PostgreSQL",
    tags: ["database", "sql", "relational", "backend", "data"],
  },
  {
    id: 9,
    name: "Redis",
    tags: ["cache", "database", "memory", "performance", "nosql"],
  },
  {
    id: 10,
    name: "GraphQL",
    tags: ["api", "query", "facebook", "data", "flexible"],
  },
  {
    id: 11,
    name: "MongoDB",
    tags: ["database", "nosql", "document", "json", "scalable"],
  },
  {
    id: 12,
    name: "Vue.js",
    tags: ["javascript", "frontend", "framework", "reactive", "component"],
  },
  {
    id: 13,
    name: "Angular",
    tags: ["javascript", "frontend", "framework", "google", "typescript"],
  },
  {
    id: 14,
    name: "Express.js",
    tags: ["node", "backend", "framework", "api", "middleware"],
  },
  {
    id: 15,
    name: "AWS",
    tags: ["cloud", "amazon", "infrastructure", "deployment", "scalable"],
  },
  {
    id: 16,
    name: "Kubernetes",
    tags: ["container", "orchestration", "devops", "scaling", "google"],
  },
  {
    id: 17,
    name: "Git",
    tags: [
      "version control",
      "collaboration",
      "code",
      "repository",
      "distributed",
    ],
  },
  {
    id: 18,
    name: "Figma",
    tags: ["design", "ui", "ux", "prototype", "collaboration"],
  },
  {
    id: 19,
    name: "Stripe",
    tags: ["payment", "api", "ecommerce", "billing", "subscription"],
  },
  {
    id: 20,
    name: "Vercel",
    tags: ["deployment", "hosting", "frontend", "serverless", "nextjs"],
  },
];

export default function SkillSearch({ items }: SkillSearchProps) {
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

  const filteredChips = useMemo(() => {
    if (!searchTerm.trim()) return skillData;

    const lowercaseSearch = searchTerm.toLowerCase().trim();

    return skillData.filter((skill) => {
      // Search in name
      const nameMatch = skill.name.toLowerCase().includes(lowercaseSearch);

      // Search in tags
      const tagMatch = skill.tags.some((tag) =>
        tag.toLowerCase().includes(lowercaseSearch)
      );

      return nameMatch || tagMatch;
    });
  }, [searchTerm]);

  // TODO
  // const skillsTop = filteredChips.filter(
  //   (skill) => skill.category.level === 30
  // );
  // const skillsMid = filteredChips.filter(
  //   (skill) => skill.category.level === 20
  // );
  // const skillsLow = filteredChips.filter(
  //   (skill) => skill.category.level === 10
  // );

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
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

      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          {filteredChips.length}{" "}
          {filteredChips.length === 1 ? "result" : "results"}
          {searchTerm && <span> for "{searchTerm}"</span>}
        </div>

        <div className="flex flex-wrap gap-2">
          {filteredChips.map((chip) => (
            <Badge
              key={chip.id}
              variant="secondary"
              className="px-3 py-2 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
            >
              {chip.name}
            </Badge>
          ))}
        </div>

        {filteredChips.length === 0 && searchTerm && (
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

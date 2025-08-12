"use client";

import { useState, useMemo, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ProjectCategory } from "@/types/project-category";
import { Project } from "@/types/project";
import { PlaceholderImage } from "@/constants/placeholders";
import Loading from "@/app/loading";

// Mock data
const mockCategories: ProjectCategory[] = [
  { _id: "1", title: "Web Development" },
  { _id: "2", title: "Mobile Apps" },
  { _id: "3", title: "Design" },
  { _id: "4", title: "Data Science" },
];

const mockProjects: Project[] = Array.from({ length: 25 }, (_, i) => ({
  _id: `project-${i + 1}`,
  title: `Project ${i + 1}`,
  slug: `project-${i + 1}`,
  author: { _id: "1", name: "1", slug: "1", image: null },
  description: `This is a detailed description of project ${
    i + 1
  }. It showcases various technologies and methodologies used in modern development.`,
  mainImage: PlaceholderImage,
  category: mockCategories[i % mockCategories.length],
  markdownContent: `# Project ${i + 1}\n\nDetailed content here...`,
  url: `https://project-${i + 1}.example.com`,
  repositoryUrl: `https://github.com/user/project-${i + 1}`,
  publishedAt: new Date(
    2024,
    Math.floor(Math.random() * 12),
    Math.floor(Math.random() * 28) + 1
  ).toISOString(),
}));

export default function ProjectList() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [displayCount, setDisplayCount] = useState(12);

  // Filter and search projects
  const filteredProjects = useMemo(() => {
    return mockProjects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || project.category._id === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const displayedProjects = filteredProjects.slice(0, displayCount);
  const hasMoreProjects = displayCount < filteredProjects.length;

  const loadMore = () => {
    setDisplayCount((prev) => prev + 12);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Ensure everything is loaded before rendering
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return <Loading />;
  }

  return (
    <div className="w-full">
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {mockCategories.map((category) => (
              <SelectItem key={category._id} value={category._id}>
                {category.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="ml-1 text-sm text-muted-foreground">
          Showing {displayedProjects.length} of {filteredProjects.length}{" "}
          projects
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {displayedProjects.map((project) => (
          <Card
            key={project._id}
            className="overflow-hidden group cursor-pointer py-0 transition-all duration-300 hover:scale-102 hover:shadow-lg border-border hover:border-primary-highlighter"
            asChild
          >
            <Link href={`/projects/${project.slug}`}>
              <div className="relative overflow-hidden">
                <Image
                  src={project.mainImage || PlaceholderImage}
                  alt={project.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover transition-transform duration-300"
                />
                <Badge
                  variant="outline"
                  className="absolute top-3 left-3 bg-background/90 text-foreground"
                >
                  {project.category.title}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-primary-highlighter transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {project.publishedAt && formatDate(project.publishedAt)}
                  </span>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No items found matching your criteria.
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Load More Button */}
      {hasMoreProjects && (
        <div className="text-center">
          <Button onClick={loadMore} variant="outline" size="lg">
            Load More Items
          </Button>
        </div>
      )}
    </div>
  );
}

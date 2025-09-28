"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { FacebookIcon, LinkedInIcon, RedditIcon, TwitterIcon } from "../icons";
import { Project } from "@/types/project";
import { useEffect, useState } from "react";
import Link from "next/link";

interface ShareModalProps {
  project: Project;
}

export function ShareProjectModal({ project }: ShareModalProps) {
  const [currentUrl, setCurrentUrl] = useState("");
  const { title } = project;

  const getShareUrls = () => {
    return {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        currentUrl
      )}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(currentUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        currentUrl
      )}`,
      reddit: `https://reddit.com/submit?url=${encodeURIComponent(
        currentUrl
      )}&title=${encodeURIComponent(title)}`,
    };
  };

  // Get current URL for sharing
  useEffect(() => setCurrentUrl(window.location.origin + window.location.pathname), []);

  const shareUrls = getShareUrls();

  const sharePlatforms = [
    { name: "LinkedIn", url: shareUrls.linkedin, Icon: LinkedInIcon },
    { name: "Twitter", url: shareUrls.twitter, Icon: TwitterIcon },
    { name: "Facebook", url: shareUrls.facebook, Icon: FacebookIcon },
    { name: "Reddit", url: shareUrls.reddit, Icon: RedditIcon },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Share2 className="size-4" />
          Share
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md sm:w-fit">
        <DialogHeader>
          <DialogTitle>Share this article</DialogTitle>
        </DialogHeader>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 py-6 sm:px-2">
          {sharePlatforms.map(({ name, url, Icon }) => (
            <Button
              key={name}
              variant="ghost"
              size="icon"
              aria-label={`Share on ${name}`}
              asChild
            >
              <Link href={url} target="_blank" rel="noopener noreferrer">
                <Icon className="size-8 text-inherit" />
              </Link>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

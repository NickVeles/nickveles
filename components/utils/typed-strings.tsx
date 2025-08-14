"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type TypedStringsProps = {
  list: string[];
} & React.HTMLAttributes<HTMLParagraphElement>;

export default function TypedStrings({ list, ...props }: TypedStringsProps) {
  const [currentStringIndex, setCurrentStringIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing animation effect
  useEffect(() => {
    const currentString = list[currentStringIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    const timer = setTimeout(() => {
      if (!isDeleting && displayedText === currentString) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && displayedText === "") {
        setIsDeleting(false);
        setCurrentStringIndex((prev) => (prev + 1) % list.length);
      } else {
        setDisplayedText((prev) =>
          isDeleting
            ? prev.slice(0, -1)
            : currentString.slice(0, prev.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentStringIndex, list]);
  
  return (
    <p {...props}>
      {displayedText}
      <span
        className={cn(
          "text-primary-highlighter text-wrap",
          !isDeleting && displayedText === list[currentStringIndex]
            ? "animate-blink"
            : ""
        )}
      >
        |
      </span>
    </p>
  );
}

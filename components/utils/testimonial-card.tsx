"use client";

import ClientAvatar from "../utils/client-avatar";
import Stars from "../utils/stars";
import { BadgeCheckIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Testimonial from "@/types/testimonial";
import { useState, useEffect } from "react";
import Link from "next/link";

type TestimonialCardProps = {
  testimonials: Testimonial[];
};

export default function TestimonialCard({
  testimonials,
}: TestimonialCardProps) {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const TESTIMONIAL_DURATION = 10000; // 10 seconds
  const PROGRESS_UPDATE_INTERVAL = 50; // Update progress every 50ms

  const currentTestimonial = testimonials[currentTestimonialIndex];
  const hasMultipleTestimonials = testimonials.length > 1;

  useEffect(() => {
    if (!hasMultipleTestimonials || isPaused || isMobile) return;

    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = progress + (elapsed / TESTIMONIAL_DURATION) * 100;

      if (newProgress >= 100) {
        setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
        setProgress(0);
      } else {
        setProgress(newProgress);
      }
    }, PROGRESS_UPDATE_INTERVAL);

    return () => clearInterval(timer);
  }, [currentTestimonialIndex, isPaused, hasMultipleTestimonials, isMobile]);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handlePrevious = () => {
    setCurrentTestimonialIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );

    // Reset progress when user manually navigates
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);

    // Reset progress when user manually navigates
    setProgress(0);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Testimonial Card */}
      <Card
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <CardContent className="p-6 pb-10 md:pb-0">
          {/* Proof url */}
          {currentTestimonial.proofUrl && (
            <div className="absolute top-4 right-4 md:right-28">
              <Button
                variant="outline"
                size="icon"
                className="w-12 h-9 md:w-10 md:h-8"
                asChild
              >
                <Link
                  href={currentTestimonial.proofUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Proof of testimonial"
                >
                  <BadgeCheckIcon className="size-6 md:size-4" />
                </Link>
              </Button>
            </div>
          )}

          {/* Prev/Next Testimonial */}
          {hasMultipleTestimonials && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:left-auto md:translate-0 md:top-4 md:right-4">
              <div className="flex gap-4 md:gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                  className="w-12 h-9 md:w-10 md:h-8"
                >
                  <ChevronLeft className="size-6 md:size-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="w-12 h-9 md:w-10 md:h-8"
                >
                  <ChevronRight className="size-6 md:size-4" />
                </Button>
              </div>
            </div>
          )}
          <div className="flex items-start gap-6 mb-6">
            <ClientAvatar
              client={currentTestimonial.client}
              className="hidden md:flex"
            />

            <div className="flex flex-col">
              <div className="flex gap-4 justify-center items-center mb-4 md:mb-0">
                <ClientAvatar
                  client={currentTestimonial.client}
                  className="flex md:hidden"
                />
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-xl font-semibold text-foreground">
                      {currentTestimonial.client.name}
                    </div>
                  </div>

                  {currentTestimonial.client.personTitle && (
                    <div className="text-muted-foreground mb-3">
                      {currentTestimonial.client.personTitle}
                    </div>
                  )}
                </div>
              </div>

              {currentTestimonial.title && (
                <h4 className="text-lg font-semibold text-foreground mb-3">
                  {currentTestimonial.title}
                </h4>
              )}

              {currentTestimonial.score && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1">
                    <Stars score={currentTestimonial.score} />
                  </div>
                </div>
              )}

              <blockquote className="text-foreground text-lg leading-relaxed">
                "{currentTestimonial.content}"
              </blockquote>
            </div>
          </div>
        </CardContent>

        {/* Progress Bar - only show on desktop */}
        {hasMultipleTestimonials && (
          <div className="hidden md:flex absolute bottom-0 left-0 w-full h-1 bg-muted">
            <div
              className="h-full bg-primary transition-all duration-75 ease-linear"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        )}
      </Card>

      {/* Testimonial Counter */}
      {hasMultipleTestimonials && (
        <div className="text-center">
          <span className="text-sm text-muted-foreground">
            {currentTestimonialIndex + 1} of {testimonials.length}
          </span>
        </div>
      )}
    </div>
  );
}

"use client";

import "keen-slider/keen-slider.min.css";
import Certificate from "@/types/certificate";
import { useKeenSlider } from "keen-slider/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ExternalLinkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DotIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { PlaceholderImage } from "@/constants/placeholders";

type CertificateCarouselProps = {
  certificates: Certificate[];
};

export default function CertificateCarousel({
  certificates,
}: CertificateCarouselProps) {
  const [sliderInstanceRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 2 },
      },
      "(min-width: 1280px)": {
        slides: { perView: 3 },
      },
    },
  });

  return (
    <div className="relative flex max-w-[75%] justify-center items-center">
      {/* Navigation Left */}
      <div className="flex justify-between absolute -left-11 top-1/2 -translate-y-1/2">
        <Button
          size="icon"
          variant="outline"
          onClick={() => slider.current?.prev()}
          className="shadow-sm"
        >
          <ChevronLeftIcon className="size-4" />
        </Button>
      </div>

      {/* Carousel */}
      <div ref={sliderInstanceRef} className="keen-slider">
        {certificates.map((cert) => (
          <div key={cert._id} className="keen-slider__slide p-4">
            <Card
              className="h-full transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg border-2 hover:border-primary/20 group-hover:bg-accent/5 pt-0 overflow-hidden"
              asChild
            >
              <Link
                href={cert.url || "https://example.com"}
                className="block h-full group hover:cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                <CardHeader className="p-0 relative overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 rounded-t-lg overflow-hidden relative">
                    <Image
                      src={PlaceholderImage}
                      alt={`${cert.title} certificate`}
                      className="w-full h-full object-cover"
                      width={300}
                      height={200}
                    />
                    <Badge className="absolute top-2 right-2 p-1 bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-colors">
                      <ExternalLinkIcon className="size-3 text-foreground group-hover:text-primary-highlighter transition-colors" />
                    </Badge>
                  </div>
                  <div className="flex flex-col gap-2 p-6 pb-0">
                    <CardTitle className="text-lg group-hover:text-primary-highlighter transition-colors">
                      {cert.title}
                    </CardTitle>
                    <CardDescription className="flex items-center text-sm">
                      <span>{cert.issuer}</span>
                      <DotIcon className="mt-0.5" />
                      <span>{cert.date}</span>
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="px-6">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {cert.description}
                  </p>
                </CardContent>
              </Link>
            </Card>
          </div>
        ))}
      </div>

      {/* Navigation Right */}
      <div className="flex justify-between absolute -right-11 top-1/2 -translate-y-1/2">
        <Button
          size="icon"
          variant="outline"
          onClick={() => slider.current?.next()}
          className="shadow-sm"
        >
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
}

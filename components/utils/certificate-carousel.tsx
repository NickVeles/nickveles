"use client";

import "keen-slider/keen-slider.min.css";
import { Certificate } from "@/types/certificate";
import { useKeenSlider } from "keen-slider/react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleAlertIcon,
} from "lucide-react";
import CertificateCard from "./certificate-card";

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
    <div className="relative max-w-[75%] flex flex-col gap-2 justify-center items-center">
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
            <CertificateCard certificate={cert} />
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

      <p className="px-4 w-full inline text-wrap text-muted-foreground">
        <CircleAlertIcon className="inline size-5 mr-1 align-text-top" />
        <span className="inline font-bold">Disclaimer</span>: Some certificates
        may display my previous name. All credentials are authentic and can be
        verified upon request.
      </p>
    </div>
  );
}

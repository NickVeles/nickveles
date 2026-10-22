"use client";

import "keen-slider/keen-slider.min.css";
import { Certificate } from "@/types/certificate";
import { useKeenSlider } from "keen-slider/react";
import { Button } from "@/components/ui/button";
import {
  ArrowBigLeftDashIcon,
  ArrowBigRightDashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
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
    <div className="relative max-w-full sm:max-w-[75%] flex flex-col gap-2 justify-center items-center">
      {/* Swipe reminder */}
      <div className="w-full flex-col justify-center items-center sm:hidden text-muted-foreground">
        <div className="w-full flex justify-center items-center gap-2">
          <ArrowBigLeftDashIcon className="size-6" />
          <ArrowBigRightDashIcon className="size-6" />
        </div>
        <p className="px-4 text-center text-wrap">
          Swipe to see more certificates
        </p>
      </div>

      {/* Navigation Left */}
      <div className="hidden sm:flex justify-between absolute -left-11 top-1/2 -translate-y-1/2">
        <Button
          size="icon"
          variant="outline"
          onClick={() => slider.current?.prev()}
          className="shadow-sm"
          aria-label="Previous certificate"
        >
          <ChevronLeftIcon className="size-4" />
        </Button>
      </div>
      {/* Carousel */}
      <div ref={sliderInstanceRef} className="keen-slider">
        {/* !IMPORTANT: Remove concat() and indx after getting more than 3 certs */}
        {/* This solution prevents awkward loading to the slider when changing slides */}
        {certificates
          .concat(certificates.length > 3 ? certificates : [])
          .map((cert, indx) => (
            <div key={cert._id + indx} className="keen-slider__slide p-4">
              <CertificateCard certificate={cert} />
            </div>
          ))}
      </div>
      {/* Navigation Right */}
      <div className="hidden sm:flex jjustify-between absolute -right-11 top-1/2 -translate-y-1/2">
        <Button
          size="icon"
          variant="outline"
          onClick={() => slider.current?.next()}
          className="shadow-sm"
          aria-label="Next certificate"
        >
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
}

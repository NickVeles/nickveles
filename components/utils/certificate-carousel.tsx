"use client";

import "swiper/css";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";

import { Certificate } from "@/types/certificate";
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
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);

  return (
    <div className="relative flex max-w-full flex-col items-center justify-center gap-2 sm:max-w-[75%]">
      {/* Swipe reminder */}
      <div className="flex w-full flex-col items-center justify-center text-muted-foreground sm:hidden">
        <div className="flex w-full items-center justify-center gap-2">
          <ArrowBigLeftDashIcon className="size-6" />
          <ArrowBigRightDashIcon className="size-6" />
        </div>

        <p className="px-4 text-center text-wrap">
          Swipe to see more certificates
        </p>
      </div>

      {/* Navigation Left */}
      <div className="absolute -left-11 top-1/2 z-10 hidden -translate-y-1/2 sm:flex">
        <Button
          size="icon"
          variant="outline"
          onClick={() => swiper?.slidePrev()}
          className="shadow-sm"
          aria-label="Previous certificate"
        >
          <ChevronLeftIcon className="size-4" />
        </Button>
      </div>

      {/* Carousel */}
      <Swiper
        className="w-full"
        onSwiper={setSwiper}
        slidesPerView={1}
        spaceBetween={0}
        loop={certificates.length >= 4}
        breakpoints={{
          768: {
            slidesPerView: 2,
          },
          1280: {
            slidesPerView: 3,
          },
        }}
      >
        {certificates.map((cert, indx) => (
          <SwiperSlide key={cert._id + indx} className="p-4">
            <CertificateCard certificate={cert} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Right */}
      <div className="absolute -right-11 top-1/2 z-10 hidden -translate-y-1/2 sm:flex">
        <Button
          size="icon"
          variant="outline"
          onClick={() => swiper?.slideNext()}
          className="shadow-sm"
          aria-label="Next certificate"
        >
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
}

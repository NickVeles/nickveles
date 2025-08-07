"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { YouTubeVideo } from "@/types/yt-video";

type VideoSelectorProps = {
  videos: YouTubeVideo[];
};

export default function VideoSelector({ videos }: VideoSelectorProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleVideoChange = (newIndex: number) => {
    if (newIndex === currentVideoIndex) return;

    setDirection(newIndex > currentVideoIndex ? 1 : -1);
    setCurrentVideoIndex(newIndex);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="flex flex-col flex-1 gap-4 w-full justify-center max-w-5xl">
      {/* Video Title */}
      <motion.div
        key={currentVideoIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center text-wrap"
      >
        <h3 className="text-3xl font-semibold">
          {videos[currentVideoIndex].title}
        </h3>
      </motion.div>

      {/* Video Player Container */}
      <div className="relative w-full">
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentVideoIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              <iframe
                src={`https://www.youtube.com/embed/${videos[currentVideoIndex].youtubeUrl}?autoplay=0&rel=0&modestbranding=1`}
                title={videos[currentVideoIndex].title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Video Selection Buttons */}
      {videos.length > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {videos.map((video, index) => (
            <Button
              key={video._id}
              onClick={() => handleVideoChange(index)}
              variant={currentVideoIndex === index ? "default" : "outline"}
              size="icon"
              className="w-11 h-11 md:w-9 md:h-9"
            >
              <span className="font-bold text-xl md:text-sm">{index + 1}</span>
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

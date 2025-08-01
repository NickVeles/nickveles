"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import YouTubeVideo from "@/types/yt-video"

type VideoSelectorProps = {
  videos: YouTubeVideo[];
}

export default function VideoSelector({ videos } : VideoSelectorProps) {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const handleVideoChange = (newIndex: number) => {
    if (newIndex === currentVideoIndex) return

    setDirection(newIndex > currentVideoIndex ? 1 : -1)
    setCurrentVideoIndex(newIndex)
  }

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
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  return (
    <div className="p-4">
      <div className="max-w-6xl mx-auto">
        {/* Video Title */}
        <motion.div
          key={currentVideoIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4 text-center"
        >
          <h2 className="text-xl font-semibold">{videos[currentVideoIndex].title}</h2>
        </motion.div>

        {/* Video Player Container */}
        <div className="relative w-full max-w-4xl mx-auto">
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
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x)

                  if (swipe < -swipeConfidenceThreshold && currentVideoIndex < videos.length - 1) {
                    handleVideoChange(currentVideoIndex + 1)
                  } else if (swipe > swipeConfidenceThreshold && currentVideoIndex > 0) {
                    handleVideoChange(currentVideoIndex - 1)
                  }
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
        <div className="flex flex-wrap justify-center gap-2 mt-8">
          {videos.map((video, index) => (
            <Button
              key={video._id}
              onClick={() => handleVideoChange(index)}
              variant={currentVideoIndex === index ? "default" : "outline"}
              className={`flex items-center gap-2 ${
                currentVideoIndex === index
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300 border-gray-600"
              }`}
            >
              <span className="font-stylized font-bold">{index + 1}</span>
            </Button>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p>Click the buttons below to switch videos or swipe left/right on the video</p>
        </div>
      </div>
    </div>
  )
}
"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Play } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import VideoModal from "@/components/ui/VideoModal";

const videos = [
  { title: "How Sora Works", duration: "2:34" },
  { title: "The AI Advantage", duration: "3:12" },
  { title: "Client Results", duration: "4:05" },
];

function VideoCard({ video, index, isInView, onPlay }) {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
    >
      <GlassCard hover className="overflow-hidden">
        {/* Thumbnail */}
        <button
          type="button"
          className="relative w-full aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center cursor-pointer group"
          onClick={() => onPlay(video)}
          aria-label={`Play ${video.title}`}
        >
          {/* Coming Soon text */}
          <span className="absolute text-black/30 text-sm font-light">
            Coming Soon
          </span>

          {/* Play button */}
          <motion.div
            className="relative z-10 w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg"
            whileHover={{
              scale: [1, 1.1, 1],
              transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <Play className="w-6 h-6 text-black ml-1" fill="currentColor" />
          </motion.div>

          {/* Duration badge */}
          <span className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
            {video.duration}
          </span>
        </button>

        {/* Title */}
        <div className="p-5">
          <h3 className="font-semibold text-lg text-black">{video.title}</h3>
        </div>
      </GlassCard>
    </motion.div>
  );
}

export default function VideoGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <>
      <section className="py-[100px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <motion.div
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-4xl font-extrabold tracking-tight text-black">
              See Sora in Action
            </h2>
            <p className="mt-4 text-lg font-light tracking-wide text-black/60 max-w-2xl mx-auto">
              Watch how trade businesses are using the system to grow.
            </p>
          </motion.div>

          {/* Grid */}
          <div
            ref={ref}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            {videos.map((video, i) => (
              <VideoCard
                key={video.title}
                video={video}
                index={i}
                isInView={isInView}
                onPlay={setActiveVideo}
              />
            ))}
          </div>
        </div>
      </section>

      <VideoModal
        isOpen={!!activeVideo}
        onClose={() => setActiveVideo(null)}
        title={activeVideo?.title}
      />
    </>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import VideoModal from "@/components/ui/VideoModal";

export default function AboutVideo() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="py-[100px] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold tracking-tight text-black">
          Hear It from Joel
        </h2>
        <p className="text-lg font-light tracking-wide text-black/60 max-w-2xl mx-auto mt-4">
          The story behind Sora &mdash; in his own words.
        </p>

        <motion.div
          className="max-w-3xl mx-auto mt-12"
          initial={{ y: 30, opacity: 0, rotate: -1.5 }}
          whileInView={{ y: 0, opacity: 1, rotate: -1.5 }}
          whileHover={{ rotate: 0, scale: 1.02 }}
          transition={{ type: "spring", damping: 20 }}
          viewport={{ once: true }}
        >
          <GlassCard hover className="overflow-hidden shadow-xl border border-black/5">
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="w-full aspect-video bg-gradient-to-br from-[#090b3c] to-[#222872] flex items-center justify-center cursor-pointer group relative"
            >
              {/* Coming Soon text */}
              <span className="absolute text-white/40 text-base font-light pointer-events-none">
                Coming Soon
              </span>

              {/* Play button */}
              <motion.div
                className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg relative z-10"
                whileHover={{
                  scale: [1, 1.1, 1],
                  transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
              </motion.div>

              {/* Duration badge */}
              <span className="absolute top-4 right-4 bg-black/70 text-white text-xs px-3 py-1.5 rounded-lg">
                Coming Soon
              </span>
            </button>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-black">
                Joel&apos;s Story &mdash; Building Sora from the Ground Up
              </h3>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      <VideoModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Joel's Story"
      />
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import VideoModal from "@/components/ui/VideoModal";

// When the video is ready, set this to the embed URL.
// e.g. "https://player.vimeo.com/video/XXXXXXX?autoplay=1"
const VIDEO_URL = null;

export default function VideoSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="py-[100px] px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-3 mb-5">
            <span
              className="block w-8 h-px"
              style={{ background: "linear-gradient(to right, transparent, var(--color-primary))" }}
            />
            <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-[#9740fe]">
              The Sora System
            </span>
            <span
              className="block w-8 h-px"
              style={{ background: "linear-gradient(to left, transparent, var(--color-primary))" }}
            />
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-black">
            Watch How Sora Works
          </h2>
          <p className="mt-4 text-lg font-light tracking-wide text-black/60 max-w-xl mx-auto">
            A full walkthrough of the system — from lead capture to booked job, in under 2 minutes.
          </p>
        </motion.div>

        {/* Video placeholder */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="relative w-full aspect-video rounded-2xl overflow-hidden group cursor-pointer block"
            aria-label="Play video"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-[#090b3c]" />

            {/* Ambient glow blobs */}
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute w-[55%] aspect-square rounded-full opacity-25 blur-[100px]"
                style={{
                  background: "radial-gradient(circle, #9740fe, transparent 70%)",
                  top: "-15%",
                  left: "-10%",
                }}
              />
              <div
                className="absolute w-[45%] aspect-square rounded-full opacity-20 blur-[80px]"
                style={{
                  background: "radial-gradient(circle, #222872, transparent 70%)",
                  bottom: "-10%",
                  right: "-5%",
                }}
              />
              <div
                className="absolute w-[30%] aspect-square rounded-full opacity-15 blur-[60px]"
                style={{
                  background: "radial-gradient(circle, #d9d0fb, transparent 70%)",
                  top: "30%",
                  right: "20%",
                }}
              />
            </div>

            {/* Subtle grid */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(var(--color-base) 1px, transparent 1px), linear-gradient(90deg, var(--color-base) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />

            {/* Decorative corner brackets */}
            <span className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-sm" />
            <span className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-white/20 rounded-tr-sm" />
            <span className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-white/20 rounded-bl-sm" />
            <span className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-sm" />

            {/* Fake timeline bar at bottom — evokes a video scrubber */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[40%] flex flex-col items-center gap-2 pointer-events-none">
              <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[0%] bg-[#9740fe] rounded-full" />
              </div>
              <div className="flex items-center justify-between w-full">
                <span className="text-[10px] text-white/20 font-mono">0:00</span>
                <span className="text-[10px] text-white/20 font-mono">2:14</span>
              </div>
            </div>

            {/* Centre play button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
              <div className="relative">
                {/* Pulsing ring */}
                <span className="absolute inset-0 rounded-full bg-[#9740fe]/20 animate-ping" />
                <div className="relative w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-[0_0_40px_rgba(151,64,254,0.4)] group-hover:scale-110 group-hover:shadow-[0_0_60px_rgba(151,64,254,0.5)] transition-all duration-300">
                  <Play className="w-8 h-8 text-[#090b3c] ml-1" fill="currentColor" />
                </div>
              </div>

              <span className="text-white/40 text-sm font-light tracking-wide">
                2 min walkthrough
              </span>
            </div>

            {/* "Coming soon" badge — top right inside brackets */}
            <span className="absolute top-5 right-16 bg-white/10 backdrop-blur-sm border border-white/10 text-white/50 text-[10px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full">
              Video coming soon
            </span>
          </button>
        </motion.div>
      </div>

      <VideoModal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="How Sora Works"
        videoUrl={VIDEO_URL}
      />
    </section>
  );
}

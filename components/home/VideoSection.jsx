"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import VideoModal from "@/components/ui/VideoModal";
import ElectricBorder from "@/components/ui/ElectricBorder";

export default function VideoSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });

  useEffect(() => {
    if (!videoRef.current) return;
    if (isInView && !modalOpen) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isInView, modalOpen]);

  return (
    <section className="py-[100px] px-4 sm:px-6 lg:px-8 bg-bluewhite section-shadow">
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

        {/* Video container */}
        <motion.div
          ref={containerRef}
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          {/* Electric animated border */}
          <ElectricBorder
            color="#9740fe"
            borderRadius={16}
            chaos={0.08}
            speed={0.8}
            className="w-full shadow-[0_0_60px_rgba(151,64,254,0.22)] rounded-2xl"
          >
            <div
              className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-pointer group bg-black"
              onClick={() => setModalOpen(true)}
            >
              <video
                ref={videoRef}
                src="/videos/joel-saas-video.mp4"
                poster="/images/home-page/thumbnail.webp"
                muted
                loop
                playsInline
                preload="none"
                className="w-full h-full object-cover"
              />

              {/* Vignette overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, transparent 45%, rgba(9,11,60,0.45) 100%)",
                }}
              />

              {/* Camera viewfinder corners */}
              <div className="absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 border-[#9740fe] pointer-events-none rounded-tl-sm" />
              <div className="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-[#9740fe] pointer-events-none rounded-tr-sm" />
              <div className="absolute bottom-4 left-4 w-7 h-7 border-b-2 border-l-2 border-[#9740fe] pointer-events-none rounded-bl-sm" />
              <div className="absolute bottom-4 right-4 w-7 h-7 border-b-2 border-r-2 border-[#9740fe] pointer-events-none rounded-br-sm" />

              {/* Preview badge */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-[#9740fe]/40 rounded-full px-3 py-1 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-[#9740fe] animate-pulse" />
                <span className="text-white text-[10px] font-semibold tracking-[0.2em] uppercase">
                  Preview
                </span>
              </div>

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110 shadow-[0_0_24px_rgba(151,64,254,0.6)]"
                  style={{ background: "linear-gradient(135deg, #9740fe, #222872)" }}
                >
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[18px] border-l-white ml-1" />
                </div>
              </div>
            </div>
          </ElectricBorder>

          {/* Click-to-unmute hint */}
          <p className="text-center mt-4 text-xs font-light tracking-wide text-black/40">
            Click to watch with sound
          </p>
        </motion.div>
      </div>

      <VideoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        videoSrc="/videos/joel-saas-video.mp4"
        title="How Sora Works"
      />
    </section>
  );
}

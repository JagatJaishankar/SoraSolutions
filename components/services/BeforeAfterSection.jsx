"use client";

import { useState, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { GripVertical } from "lucide-react";

export default function BeforeAfterSection() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const pct = ((clientX - left) / width) * 100;
    setSliderPos(Math.max(0, Math.min(100, pct)));
  }, []);

  const handlePointerDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    if (e.target) e.target.setPointerCapture?.(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <section
      ref={sectionRef}
      className="py-[100px] bg-[#f5f3ff] shadow-[inset_0_8px_16px_-8px_rgba(0,0,0,0.06),inset_0_-8px_16px_-8px_rgba(0,0,0,0.06)]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          className="font-[family-name:var(--font-maven-pro)] text-4xl font-extrabold tracking-tight text-black"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          See the{" "}
          <span className="underline decoration-primary decoration-[3px] underline-offset-[6px]">
            Difference
          </span>
        </motion.h2>
        <motion.p
          className="text-lg font-light text-black/60 mt-4 max-w-2xl mx-auto"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          Drag the slider to compare a typical tradie web presence with a
          Sora-built system.
        </motion.p>

        <motion.div
          ref={containerRef}
          className="relative aspect-[16/9] max-w-4xl mx-auto mt-12 rounded-2xl overflow-hidden select-none touch-none cursor-ew-resize"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {/* Before layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#f5f3ff] to-[#d9d0fb] flex items-center justify-center">
            <span className="text-black/30 text-sm md:text-base font-medium text-center px-8">
              Before — No website, poor Google presence
            </span>
          </div>

          {/* After layer (clipped) */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#d9d0fb] to-[#9740fe]/20 flex items-center justify-center"
            style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
          >
            <span className="text-black/30 text-sm md:text-base font-medium text-center px-8">
              After — Sora-built site, 5-star reviews, optimised GBP
            </span>
          </div>

          {/* Labels */}
          <span className="absolute top-4 left-4 bg-black/50 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
            Before
          </span>
          <span className="absolute top-4 right-4 bg-black/50 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
            After
          </span>

          {/* Divider line + handle */}
          <div
            className="absolute top-0 bottom-0 z-10"
            style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
            onPointerDown={handlePointerDown}
          >
            <div className="w-[2px] h-full bg-white shadow-[0_0_8px_rgba(0,0,0,0.3)] mx-auto" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
              <GripVertical className="text-black/40" size={18} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

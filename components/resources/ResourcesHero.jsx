"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const fade = (delay = 0) => ({
  initial: { y: 20, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut", delay },
  viewport: { once: true },
});

export default function ResourcesHero() {
  return (
    <section className="py-[140px] md:py-[160px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div {...fade(0)}>
          <span className="bg-white/80 backdrop-blur-xl border border-black/5 rounded-full px-4 py-2 inline-flex items-center gap-2 mb-6">
            <BookOpen size={14} className="text-[#9740fe]" />
            <span className="text-xs font-bold tracking-widest uppercase text-black/60">
              Free Resources
            </span>
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-black"
          {...fade(0.2)}
        >
          Everything You Need to Grow
          <br />
          Your Trade Business
        </motion.h1>

        <motion.p
          className="text-lg font-light tracking-wide text-black/60 max-w-2xl mx-auto mt-6"
          {...fade(0.4)}
        >
          Practical guides, strategies, and tools built specifically for
          Australian tradies. No fluff, no jargon &mdash; just what works.
        </motion.p>
      </div>
    </section>
  );
}

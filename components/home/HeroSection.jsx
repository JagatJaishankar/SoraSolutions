"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Badge from "@/components/ui/Badge";
import WordFlip from "./WordFlip";
import TradeRotator from "./TradeRotator";
import OrbRevealLayer from "@/components/effects/OrbRevealLayer";

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-72px)] flex items-center px-4 sm:px-6 lg:px-8">
      <OrbRevealLayer />
      <div className="relative z-[5] max-w-7xl mx-auto py-12 lg:py-0 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-10 xl:gap-16">
          {/* Left column — ~58% */}
          <div className="w-full lg:w-[52%] flex flex-col gap-4">
            {/* Badge */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            >
              <Badge pulse>More Jobs For Your Trade</Badge>
            </motion.div>

            {/* Headline */}
            <h1 className="text-[2.6rem] sm:text-6xl xl:text-7xl font-black tracking-tighter text-black leading-[1.25]">
              <motion.span
                className="block"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
              >
                Your Trade.
              </motion.span>
              <motion.span
                className="block"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
              >
                <span className="gradient-text">Our System.</span>
              </motion.span>
              <motion.span
                className="block"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.7, ease: "easeOut" }}
              >
                More <WordFlip />
              </motion.span>
            </h1>

            {/* Subheadline */}
            <motion.p
              className="text-lg font-light tracking-wide text-black/60 max-w-xl"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
            >
              Sora builds the marketing, AI, and systems that keep your pipeline
              full — so you can stop chasing work and start choosing it.
            </motion.p>

            {/* Trade Rotator */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}
            >
              <TradeRotator />
            </motion.div>
          </div>

          {/* Right column — video placeholder (taller) */}
          <motion.div
            className="w-full lg:w-[48%]"
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden cursor-pointer group border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-[#090b3c] to-[#222872]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-8 h-8 text-black ml-1" fill="currentColor" />
                </div>
                <span className="text-white/50 text-sm mt-4">
                  Watch the 2-min explainer
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

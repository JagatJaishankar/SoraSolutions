"use client";

import { motion } from "framer-motion";
import Badge from "@/components/ui/Badge";
import WordFlip from "./WordFlip";
import TradeRotator from "./TradeRotator";
import HeroForm from "./HeroForm";

export default function HeroSection() {
  return (
    <section className="min-h-[calc(100vh-72px)] flex items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-12 lg:py-0 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-10 xl:gap-16">
          {/* Left column — ~60% */}
          <div className="w-full lg:w-[58%] flex flex-col gap-4">
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
              transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
            >
              <TradeRotator />
            </motion.div>
          </div>

          {/* Right column — ~40% */}
          <div className="w-full lg:w-[42%]">
            <HeroForm />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import ElectricBorder from "@/components/ui/ElectricBorder";
import AboutWordFlip from "./AboutWordFlip";

const fade = (delay = 0) => ({
  initial: { y: 20, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut", delay },
  viewport: { once: true },
});

export default function AboutHero() {
  const scrollToTimeline = () => {
    const el = document.getElementById("joel-timeline");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-[140px] md:py-[160px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Photo */}
        <motion.div
          className="w-full max-w-[320px] md:max-w-[380px] mb-12"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <ElectricBorder
            color="#9740fe"
            borderRadius={20}
            chaos={0.18}
            speed={1.0}
            className="w-full"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden relative">
              {/* Fallback gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#d9d0fb] to-[#9740fe]/30 flex items-center justify-center">
                <span className="text-white/40 text-lg font-medium">
                  Joel Willis
                </span>
              </div>
              {/* Photo */}
              <Image
                src="/images/joel/about-hero-image.webp"
                alt="Joel Willis — Founder of Sora Solutions"
                fill
                sizes="(max-width: 768px) 640px, 760px"
                quality={80}
                priority
                className="object-cover relative z-10"
                style={{ objectPosition: "10% top" }}
              />
            </div>
          </ElectricBorder>
        </motion.div>

        {/* Eyebrow */}
        <motion.div {...fade(0)}>
          <span className="bg-white/80 backdrop-blur-xl border border-black/5 rounded-full px-4 py-2 inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#9740fe] animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase text-black/60">
              The Story Behind Sora
            </span>
          </span>
        </motion.div>

        {/* Heading */}
        <h1>
          <motion.span
            className="block text-4xl md:text-5xl font-extrabold tracking-tight text-black"
            {...fade(0.2)}
          >
            A Tradie Who Built
          </motion.span>
          <motion.span
            className="block text-4xl md:text-5xl font-extrabold tracking-tight text-black"
            {...fade(0.4)}
          >
            Something for
          </motion.span>
          <motion.span
            className="block text-4xl md:text-5xl font-extrabold tracking-tight mt-3"
            {...fade(0.6)}
          >
            <AboutWordFlip />
          </motion.span>
        </h1>

        {/* Subheading */}
        <motion.p
          className="text-lg font-light tracking-wide text-black/60 max-w-xl mt-6"
          {...fade(0.8)}
        >
          Joel Willis spent 6 years swinging a hammer, got his
          builder&apos;s licence, and started his own company. The business
          went well &mdash; but he always knew the right marketing and systems
          could&apos;ve taken it further. So he built them.
        </motion.p>

        {/* Scroll CTA */}
        <motion.button
          type="button"
          onClick={scrollToTimeline}
          className="text-[#9740fe] font-medium text-lg mt-6 inline-flex items-center gap-2 cursor-pointer"
          {...fade(1.0)}
        >
          Read Joel&apos;s Story
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </motion.button>
      </div>
    </section>
  );
}

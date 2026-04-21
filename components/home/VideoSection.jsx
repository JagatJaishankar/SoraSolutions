"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function VideoSection() {
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

        {/* Video placeholder */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
            <Image
              src="/images/home-page/thumbnial.png"
              alt="How Sora Works"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 80vw"
              quality={90}
            />
            <span className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm border border-white/10 text-white text-[11px] font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full">
              Video coming soon
            </span>
          </div>
        </motion.div>
      </div>

    </section>
  );
}

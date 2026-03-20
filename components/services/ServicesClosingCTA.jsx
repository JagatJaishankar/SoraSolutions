"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function ServicesClosingCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-[60px] sm:py-[100px] pb-[100px] sm:pb-[100px] px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          className="font-[family-name:var(--font-maven-pro)] text-2xl sm:text-3xl font-extrabold tracking-tight text-black"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Not Sure Where to Start?
        </motion.h2>
        <motion.p
          className="text-base sm:text-lg font-light text-black/60 mt-4 max-w-xl mx-auto"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          Book a free strategy call. We&apos;ll review your current setup and
          recommend the right services for where your business is at.
        </motion.p>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="mt-8"
        >
          <Link
            href="/contact"
            className="block w-full sm:inline-block sm:w-auto text-center bg-primary text-white font-semibold px-6 sm:px-8 py-4 rounded-xl transition-transform duration-200 hover:scale-[1.02] active:scale-[0.97]"
          >
            Book a Free Strategy Call &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

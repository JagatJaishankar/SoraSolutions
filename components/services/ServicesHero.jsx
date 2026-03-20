"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ServiceWordFlip from "@/components/services/ServiceWordFlip";
import Badge from "@/components/ui/Badge";

export default function ServicesHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const handleScrollToNav = () => {
    const el = document.getElementById("service-nav");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      ref={ref}
      className="py-[80px] sm:py-[120px] lg:min-h-[calc(100vh-72px)] flex items-center"
    >
      <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8 w-full overflow-hidden">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Badge>OUR SERVICES</Badge>
        </motion.div>

        <h1 className="font-[family-name:var(--font-maven-pro)] mt-8">
          <motion.span
            className="block text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black"
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
          >
            Everything Your
          </motion.span>
          <motion.span
            className="block text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-black underline decoration-black decoration-[3px] sm:decoration-[5px] underline-offset-[6px] sm:underline-offset-[8px] mt-1"
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
          >
            Trade Business
          </motion.span>
          <motion.span
            className="block text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black mt-3"
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.6 }}
          >
            Needs to
          </motion.span>
          <motion.span
            className="block text-5xl sm:text-7xl md:text-8xl font-extrabold mt-6 overflow-hidden"
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.8 }}
          >
            <ServiceWordFlip />
          </motion.span>
        </h1>

        <motion.p
          className="text-base sm:text-lg font-light tracking-wide text-black/60 max-w-2xl mx-auto mt-6"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 1.0 }}
        >
          From getting found online to automating your entire pipeline — we
          build the system that keeps your jobs flowing.
        </motion.p>

        <motion.button
          type="button"
          onClick={handleScrollToNav}
          className="text-primary font-medium text-base sm:text-lg mt-8 cursor-pointer hover:opacity-80 transition-opacity"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
        >
          Explore Services
        </motion.button>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle } from "lucide-react";
import HeroForm from "@/components/home/HeroForm";

const TOTAL_SPOTS = 5;
const SPOTS_TAKEN = 3;
const SPOTS_REMAINING = TOTAL_SPOTS - SPOTS_TAKEN;
const FILL_PERCENT = (SPOTS_TAKEN / TOTAL_SPOTS) * 100;

export default function FoundingMemberBlock() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-[100px] bg-bluewhite section-shadow">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">

          {/* Left: Founding member CTA */}
          <motion.div
            className="lg:w-1/2 mb-12 lg:mb-0"
            initial={{ x: -30, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="text-xs tracking-widest uppercase text-primary font-semibold mb-4">
              Founding Members
            </p>

            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-black">
              We&apos;re Taking On {TOTAL_SPOTS} Founding Members
            </h2>
            <p className="text-lg font-light text-black/60 mt-3 leading-relaxed">
              Get in early. Lock in founding member pricing. Help shape the system.
            </p>

            {/* Progress bar */}
            <div className="w-full h-4 rounded-full bg-black/5 overflow-hidden mt-8">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                initial={{ width: "0%" }}
                animate={isInView ? { width: `${FILL_PERCENT}%` } : { width: "0%" }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              />
            </div>

            {/* Spots remaining */}
            <motion.div
              className="flex items-center gap-2 mt-3"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 1.5 }}
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="font-semibold text-black underline decoration-primary decoration-2 underline-offset-4">
                {SPOTS_REMAINING} spots remaining
              </span>
            </motion.div>

            {/* Urgency */}
            <motion.p
              className="text-sm text-black/50 mt-2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 1.7 }}
            >
              &#9889; Founding member pricing won&apos;t last
            </motion.p>
          </motion.div>

          {/* Right: Growth Audit form */}
          <motion.div
            className="lg:w-1/2"
            initial={{ x: 30, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: 30, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <h3 className="text-2xl font-extrabold tracking-tight text-black mb-2">
              Get Your Free Growth Audit
            </h3>
            <p className="text-base font-light tracking-wide text-black/60 mb-5 leading-relaxed">
              Tell us about your trade business and we&apos;ll show you exactly
              where you&apos;re leaving money on the table. Takes 30 seconds.
            </p>
            <div className="flex flex-col gap-3 mb-6">
              {[
                "Personalised recommendations for your trade",
                "See where your competitors are beating you",
                "No obligation — it is completely free",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="text-primary flex-shrink-0" size={20} />
                  <span className="text-sm font-light tracking-wide text-black/60">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <HeroForm />
          </motion.div>

        </div>
      </div>
    </section>
  );
}

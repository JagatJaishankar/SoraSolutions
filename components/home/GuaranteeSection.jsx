"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import PrimaryButton from "@/components/ui/PrimaryButton";

export default function GuaranteeSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-[100px]">
      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Gradient border wrapper */}
        <div className="rounded-2xl bg-gradient-to-br from-primary to-secondary p-[1.5px]">
          <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col items-center text-center">
              {/* Shield icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <ShieldCheck className="w-16 h-16 text-primary" />
              </motion.div>

              {/* Heading */}
              <motion.h2
                className="mt-6 text-4xl font-extrabold tracking-tight text-black"
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              >
                Zero Risk. Total Confidence.
              </motion.h2>

              {/* Body */}
              <motion.div
                className="mt-6 text-base font-light tracking-wide text-black/60 max-w-2xl mx-auto leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              >
                <p>
                  No lock-in contracts. No hidden fees. No 12-month commitments.
                  Every Sora engagement is month-to-month. If we&apos;re not
                  delivering results, you walk away — no questions asked, no
                  penalties, no drama.
                </p>
                <p className="mt-4">
                  We&apos;re confident in what we build because we&apos;ve
                  designed the system from the ground up for trade businesses.
                  But you don&apos;t have to take our word for it. Start with a
                  free strategy call, see exactly what we&apos;d do, and decide
                  if it&apos;s right for you.
                </p>
              </motion.div>

              {/* CTA */}
              <motion.div
                className="mt-8"
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              >
                <PrimaryButton href="#contact">
                  Book a Free Strategy Call &rarr;
                </PrimaryButton>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

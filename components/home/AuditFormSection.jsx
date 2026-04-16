"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle } from "lucide-react";
import HeroForm from "@/components/home/HeroForm";

export default function AuditFormSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="free-audit"
      ref={ref}
      className="py-[100px] px-4 sm:px-6 lg:px-8 bg-[#faf9ff] shadow-[inset_0_8px_16px_-8px_rgba(0,0,0,0.06),inset_0_-8px_16px_-8px_rgba(0,0,0,0.06)]"
    >
      <div className="max-w-7xl mx-auto lg:flex lg:items-center lg:gap-16">
        {/* Left column — text */}
        <motion.div
          className="lg:w-1/2 mb-12 lg:mb-0"
          initial={{ x: -30, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-extrabold tracking-tight text-black">
            Get Your Free Growth Audit
          </h2>
          <p className="text-lg font-light tracking-wide text-black/60 mt-4 leading-relaxed">
            Tell us about your trade business and we&apos;ll show you exactly
            where you&apos;re leaving money on the table. Takes 30 seconds.
          </p>
          <div className="flex flex-col gap-3 mt-6">
            {[
              "Personalised recommendations for your trade",
              "See where your competitors are beating you",
              "No obligation — it is completely free",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle
                  className="text-[#9740fe] flex-shrink-0"
                  size={20}
                />
                <span className="text-sm font-light tracking-wide text-black/60">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right column — form */}
        <motion.div
          className="lg:w-1/2"
          initial={{ x: 30, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <HeroForm />
        </motion.div>
      </div>
    </section>
  );
}

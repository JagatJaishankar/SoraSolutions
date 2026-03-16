"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import PrimaryButton from "@/components/ui/PrimaryButton";

const TOTAL_SPOTS = 5;
const SPOTS_TAKEN = 3;
const SPOTS_REMAINING = TOTAL_SPOTS - SPOTS_TAKEN;
const FILL_PERCENT = (SPOTS_TAKEN / TOTAL_SPOTS) * 100;

export default function FoundingMemberBlock() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-[80px] bg-bluewhite section-shadow">
      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
              <div className="flex flex-col items-center text-center">
                {/* Heading */}
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-black">
                  We&apos;re Taking On {TOTAL_SPOTS} Founding Members
                </h2>
                <p className="text-lg font-light text-black/60 mt-3">
                  Get in early. Lock in founding member pricing. Help shape the
                  system.
                </p>

                {/* Progress bar */}
                <div className="w-full h-4 md:h-5 rounded-full bg-black/5 overflow-hidden mt-8">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: "0%" }}
                    animate={
                      isInView
                        ? { width: `${FILL_PERCENT}%` }
                        : { width: "0%" }
                    }
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

                {/* Urgency line */}
                <motion.p
                  className="text-sm text-black/50 mt-2"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 1.7 }}
                >
                  &#9889; Founding member pricing won&apos;t last
                </motion.p>

                {/* CTA */}
                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={
                    isInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 10 }
                  }
                  transition={{ duration: 0.5, ease: "easeOut", delay: 1.9 }}
                >
                  <PrimaryButton href="#contact" className="shimmer-button">
                    Secure Your Spot &rarr;
                  </PrimaryButton>
                </motion.div>
              </div>
        </motion.div>
      </div>
    </section>
  );
}

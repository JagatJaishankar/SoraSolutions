"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Badge from "@/components/ui/Badge";
import ProfileCard from "@/components/home/ProfileCard";

export default function BuiltByTradie() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-[100px]">
      <div
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
          {/* Text — left 60% */}
          <motion.div
            className="w-full md:w-[60%]"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Badge pulse>The Story Behind Sora</Badge>

            <p className="mt-8 text-lg font-light tracking-wide text-black/70 leading-relaxed">
              Joel Willis spent 6 years as a carpenter, got his builder&apos;s
              licence, and ran his own building company for 4 years. The business
              went well — but he always knew it could&apos;ve gone further with
              the right marketing and systems behind it.
            </p>

            <p className="mt-4 text-lg font-light tracking-wide text-black/70 leading-relaxed">
              That missing piece is exactly what Sora delivers — so you
              don&apos;t just build a good trade business, you build a great one.
            </p>

            {/* Pull quote */}
            <motion.blockquote
              className="mt-10 border-l-2 border-primary pl-6"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            >
              <p className="text-2xl md:text-3xl font-semibold italic text-black">
                &ldquo;I built Sora so no tradie has to leave{" "}
                <span className="underline decoration-black decoration-2 underline-offset-4">
                  growth on the table
                </span>
                .&rdquo;
              </p>
              <cite className="block mt-3 text-sm font-medium text-black/50 not-italic">
                — Joel Willis, Founder
              </cite>
            </motion.blockquote>

            <motion.a
              href="/about"
              className="inline-block mt-8 text-primary font-medium hover:underline"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            >
              Read Joel&apos;s Full Story &rarr;
            </motion.a>
          </motion.div>

          {/* ProfileCard — right 40% */}
          <motion.div
            className="w-full md:w-[40%] flex justify-center"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="w-full max-w-[320px]">
              <ProfileCard
                name="Joel Willis"
                title="Founder, Sora Solutions"
                contactText="Read Full Story →"
                onContactClick={() => {
                  window.location.href = "/about";
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

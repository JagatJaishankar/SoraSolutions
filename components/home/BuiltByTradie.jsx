"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Badge from "@/components/ui/Badge";
import ProfileCard from "@/components/home/ProfileCard";

export default function BuiltByTradie() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-[100px] bg-[#faf9ff] section-shadow">
      <div
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* ProfileCard — left 40% */}
          <motion.div
            className="w-full md:w-[40%] flex justify-center"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="w-full max-w-[320px]">
              <ProfileCard
                name="Joel Willis"
                title="Founder, Sora Solutions"
                avatarUrl="/images/joel/joel-with-whiteboard.webp"
                contactText="Read Full Story →"
                onContactClick={() => {
                  window.location.href = "/about";
                }}
              />
            </div>
          </motion.div>

          {/* Text — right 60% */}
          <motion.div
            className="w-full md:w-[60%]"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Badge pulse>The Story Behind Sora</Badge>

            <motion.blockquote
              className="mt-8 border-l-2 border-primary pl-6"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            >
              <p className="text-xl md:text-2xl font-semibold italic text-black leading-snug">
                &ldquo;I spent 10 years in construction — from apprentice carpenter to running my own building company. I saw firsthand how hard it is to grow a trade business without the right systems behind you. That&apos;s why I built Sora.&rdquo;
              </p>
              <cite className="block mt-4 text-sm font-medium text-black/50 not-italic">
                — Joel Willis, Founder
              </cite>
            </motion.blockquote>

            <motion.a
              href="/about"
              className="inline-block mt-8 text-primary font-medium hover:underline"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.35 }}
            >
              Read Joel&apos;s Full Story &rarr;
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

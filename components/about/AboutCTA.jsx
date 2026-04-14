"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutCTA() {
  return (
    <section className="py-[100px]">
      <motion.div
        className="text-center max-w-3xl mx-auto px-4"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-extrabold tracking-tight text-black">
          Want to Work With Us?
        </h2>
        <p className="text-lg font-light tracking-wide text-black/60 mt-4 max-w-xl mx-auto">
          Book a free strategy call and let&apos;s talk about where your
          business is at and where you want it to go.
        </p>
        <div className="mt-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="inline-block w-full sm:w-auto"
          >
            <Link
              href="/#contact"
              className="block bg-[#9740fe] text-white font-semibold px-10 py-4 rounded-xl text-center"
            >
              Book a Free Strategy Call &rarr;
            </Link>
          </motion.div>
        </div>

        {/* Social proof */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <span className="text-[#F59E0B] text-sm">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
          <span className="text-xs text-black/40">
            Trusted by trade businesses across Australia
          </span>
        </div>
      </motion.div>
    </section>
  );
}

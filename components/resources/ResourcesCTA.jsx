"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ResourcesCTA() {
  return (
    <section className="py-[100px] bg-[#090b3c]">
      <motion.div
        className="max-w-3xl mx-auto px-4 text-center"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-extrabold tracking-tight text-white">
          Ready to Put This Into Action?
        </h2>
        <p className="text-lg font-light tracking-wide text-white/60 mt-4 max-w-xl mx-auto">
          Book a free strategy call and we&apos;ll show you exactly how these
          strategies apply to your trade business.
        </p>
        <motion.div
          className="mt-8"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          <Link
            href="/#contact"
            className="inline-block bg-[#9740fe] text-white font-semibold px-10 py-4 rounded-xl hover:shadow-[0_10px_30px_rgba(151,64,254,0.3)] transition-shadow"
          >
            Book a Free Strategy Call &rarr;
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

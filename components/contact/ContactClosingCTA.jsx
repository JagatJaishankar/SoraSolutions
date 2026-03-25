"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";

export default function ContactClosingCTA() {
  return (
    <section className="py-[80px] px-4 bg-[#f5f3ff] shadow-[inset_0_8px_16px_-8px_rgba(0,0,0,0.06),inset_0_-8px_16px_-8px_rgba(0,0,0,0.06)]">
      <motion.div
        className="text-center"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-black">
          Still not sure? That&apos;s okay.
        </h2>
        <p className="text-base font-light tracking-wide text-black/60 mt-2">
          Reach out anytime. No pressure.
        </p>

        <a
          href="tel:+61409422868"
          className="mt-6 inline-flex items-center justify-center gap-2 text-[#9740fe] font-semibold text-xl hover:underline"
        >
          <Phone size={20} />
          +61 409 422 868
        </a>

        <div className="mt-6 flex items-center justify-center gap-2">
          <span className="text-[#F59E0B] text-sm">
            &#9733;&#9733;&#9733;&#9733;&#9733;
          </span>
          <span className="text-xs text-black/40">
            Trusted by trade businesses across Australia
          </span>
        </div>
      </motion.div>
    </section>
  );
}

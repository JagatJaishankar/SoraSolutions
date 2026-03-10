"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Phone } from "lucide-react";
import PrimaryButton from "@/components/ui/PrimaryButton";
import SecondaryButton from "@/components/ui/SecondaryButton";

export default function FinalCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative bg-[#232872] py-[120px] overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#9741FE]/20 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#9741FE]/20 rounded-full blur-[150px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div
        ref={ref}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Heading */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold tracking-tight text-white"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Ready to Stop Leaving Growth on the Table?
        </motion.h2>

        {/* Subheading */}
        <motion.p
          className="text-lg font-light text-white/80 max-w-2xl mx-auto mt-6"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          Book a free 30-minute strategy call. We&apos;ll review your current
          marketing, show you where the biggest opportunities are, and give you a
          clear plan — whether you work with us or not.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mt-10"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        >
          <PrimaryButton
            href="#contact"
            className="shimmer-button px-8 py-4 text-lg"
          >
            Book a Free Strategy Call
          </PrimaryButton>
          <SecondaryButton
            href="tel:+61409422868"
            className="text-white border-white hover:bg-white hover:text-black hover:border-white px-8 py-4 text-lg"
          >
            <Phone className="w-5 h-5 mr-2" />
            Call +61 409 422 868
          </SecondaryButton>
        </motion.div>
      </div>
    </section>
  );
}

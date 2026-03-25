"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Clock, FileText } from "lucide-react";
import ContactWordFlip from "./ContactWordFlip";

const fade = (delay = 0) => ({
  initial: { y: 20, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut", delay },
  viewport: { once: true },
});

function generateParticles() {
  const particles = [];
  for (let i = 0; i < 14; i++) {
    particles.push({
      left: Math.random() * 90 + 5,
      bottom: Math.random() * 30,
      size: Math.random() * 2 + 2,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.07 + 0.05,
    });
  }
  return particles;
}

export default function ContactHero() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setParticles(generateParticles());
  }, []);

  const scrollToBooking = () => {
    const el = document.getElementById("booking-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-[100px] md:py-[140px] lg:py-[160px]">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#9740fe]"
            style={{
              left: `${p.left}%`,
              bottom: `${p.bottom}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animation: `float-up ${p.duration}s ${p.delay}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <motion.div {...fade(0)}>
          <span className="bg-white/80 backdrop-blur-xl border border-black/5 rounded-full px-4 py-2 inline-flex items-center gap-2 mx-auto mb-6">
            <span className="w-2 h-2 rounded-full bg-[#9740fe] animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase text-black/60">
              Get in Touch
            </span>
          </span>
        </motion.div>

        {/* Heading */}
        <h1>
          <motion.span
            className="block text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-black"
            {...fade(0.2)}
          >
            Let&apos;s Talk About
            <span className="hidden md:inline"> Your</span>
          </motion.span>
          <motion.span
            className="block text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-black md:hidden"
            {...fade(0.3)}
          >
            Your
          </motion.span>
          <motion.span
            className="block text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mt-3"
            {...fade(0.4)}
          >
            <ContactWordFlip />
          </motion.span>
        </h1>

        {/* Subheading */}
        <motion.p
          className="text-lg font-light tracking-wide text-black/60 max-w-2xl mx-auto mt-6"
          {...fade(0.8)}
        >
          Book a free 30-minute strategy call. We&apos;ll review your current
          marketing, show you where the biggest opportunities are, and give you
          a clear plan &mdash; whether you work with us or not.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          {...fade(1.0)}
        >
          <motion.button
            type="button"
            onClick={scrollToBooking}
            className="bg-[#9740fe] text-white font-semibold px-8 py-4 rounded-xl cursor-pointer w-full sm:w-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Book a Free Strategy Call &darr;
          </motion.button>
          <motion.a
            href="tel:+61409422868"
            className="border-2 border-black/10 text-black/70 font-semibold px-8 py-4 rounded-xl w-full sm:w-auto text-center transition-colors duration-300 hover:border-[#9740fe] hover:text-[#9740fe]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            Call Joel Directly &rarr;
          </motion.a>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          className="flex items-center justify-center gap-6 mt-8"
          {...fade(1.2)}
        >
          <span className="flex items-center gap-1.5 text-xs text-black/40 font-medium">
            <ShieldCheck size={14} className="text-[#9740fe]" />
            Free &mdash; No Obligation
          </span>
          <span className="flex items-center gap-1.5 text-xs text-black/40 font-medium">
            <Clock size={14} className="text-[#9740fe]" />
            30 Minutes
          </span>
          <span className="hidden sm:flex items-center gap-1.5 text-xs text-black/40 font-medium">
            <FileText size={14} className="text-[#9740fe]" />
            Personalised Plan
          </span>
        </motion.div>
      </div>
    </section>
  );
}

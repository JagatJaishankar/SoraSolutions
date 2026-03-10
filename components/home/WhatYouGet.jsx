"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import BrowserMockup from "@/components/ui/BrowserMockup";

const dashboards = [
  {
    title: "CRM Pipeline",
    description: "See every lead from first enquiry to booked job.",
    placeholder: "[CRM Pipeline Screenshot]",
  },
  {
    title: "Automated Follow-ups",
    description: "60-second responses. Multi-step sequences. Nothing slips.",
    placeholder: "[Automated Follow-ups Screenshot]",
  },
  {
    title: "Reporting Dashboard",
    description: "Live data. Real metrics. Not a PDF you'll never read.",
    placeholder: "[Reporting Dashboard Screenshot]",
  },
  {
    title: "Booking Calendar",
    description: "Leads book directly into your calendar. No phone tag.",
    placeholder: "[Booking Calendar Screenshot]",
  },
];

function SpotlightMockup({ item }) {
  const overlayRef = useRef(null);
  const containerRef = useRef(null);
  const [revealed, setRevealed] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!overlayRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const mask = `radial-gradient(circle 150px at ${x}px ${y}px, transparent 0%, black 100%)`;
    overlayRef.current.style.maskImage = mask;
    overlayRef.current.style.webkitMaskImage = mask;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!overlayRef.current) return;
    overlayRef.current.style.maskImage = "none";
    overlayRef.current.style.webkitMaskImage = "none";
  }, []);

  const handleTap = useCallback(() => {
    setRevealed((prev) => !prev);
  }, []);

  return (
    <div>
      <BrowserMockup>
        <div
          ref={containerRef}
          className="relative aspect-[4/3] cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleTap}
        >
          {/* Full-colour content layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2362fd]/5 to-[#fd6600]/5 flex items-center justify-center">
            <span className="text-black/30 text-sm font-light select-none">
              {item.placeholder}
            </span>
          </div>

          {/* Desktop overlay with spotlight mask */}
          <div
            ref={overlayRef}
            className="absolute inset-0 bg-black/60 hidden md:block"
          />

          {/* Mobile overlay — tap to toggle */}
          <div
            className={`absolute inset-0 bg-black/60 md:hidden transition-opacity duration-300 ${
              revealed ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          />
        </div>
      </BrowserMockup>

      {/* Label */}
      <div className="mt-4">
        <h3 className="font-semibold text-lg text-black">{item.title}</h3>
        <p className="font-light text-sm text-black/60">{item.description}</p>
      </div>
    </div>
  );
}

export default function WhatYouGet() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="py-[100px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight text-black">
            This Is What&apos;s Working For You — 24/7
          </h2>
          <p className="mt-4 text-lg font-light tracking-wide text-black/60 max-w-2xl mx-auto">
            Every Sora client gets a fully configured system. Here&apos;s what it looks like from the inside.
          </p>
        </div>

        {/* 2×2 Grid */}
        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"
        >
          {dashboards.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: i * 0.1,
              }}
            >
              <SpotlightMockup item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

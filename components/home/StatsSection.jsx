"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import useCountUp from "@/hooks/useCountUp";

const stats = [
  {
    prefix: "",
    target: 391,
    suffix: "%",
    description: "faster response than the industry average",
    image: "/images/home-page/01-rocket.webp",
    numColor: "text-[#4169E1]",
  },
  {
    prefix: "",
    target: 14,
    suffix: " days",
    description: "to full system setup and going live",
    image: "/images/home-page/01-calendar.webp",
    numColor: "text-[#F59E0B]",
  },
  {
    prefix: "",
    target: 60,
    suffix: " sec",
    description: "missed call follow-up, automatically",
    image: "/images/home-page/01-clock.webp",
    numColor: "text-[#22C55E]",
  },
  {
    prefix: "$",
    target: 47,
    suffix: "k",
    description: "average first-year revenue added",
    image: "/images/home-page/01-money.webp",
    numColor: "text-[#EF4444]",
  },
];

function StatCard({ stat, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCountUp(stat.target, 2000, isInView);

  return (
    <motion.div
      ref={ref}
      className="bg-[#f0eeff] rounded-2xl p-5 flex flex-col items-center gap-4 text-center"
      initial={{ y: 30, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
    >
      {/* Number box — white pill */}
      <div className="w-full bg-white rounded-xl px-4 py-3">
        <div className={`text-5xl font-black tracking-tight ${stat.numColor}`}>
          {stat.prefix}{count}{stat.suffix}
        </div>
      </div>

      {/* Description */}
      <p className="text-base font-light tracking-wide text-black/80 leading-relaxed">
        {stat.description}
      </p>

      {/* Illustration */}
      <div className="flex items-end justify-center">
        <Image
          src={stat.image}
          alt={stat.description}
          width={144}
          height={120}
          className="h-auto object-contain"
        />
      </div>
    </motion.div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={sectionRef}
      className="py-[100px] bg-[#faf9ff] section-shadow"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs tracking-widest uppercase text-black/40 text-center mb-8">
          The Numbers
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

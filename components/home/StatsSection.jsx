"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import useCountUp from "@/hooks/useCountUp";

const stats = [
  {
    target: 78,
    suffix: "%",
    description: "of local mobile searches result in a purchase within 24 hours",
    bg: "bg-white/80 border border-black/5",
    text: "text-black",
    descColor: "text-black/60",
    ring: "#9740fe",
  },
  {
    target: 60,
    suffix: " sec",
    description: "average response time with Sora's AI",
    bg: "bg-[#f5f3ff] border border-[#d9d0fb]/50",
    text: "text-black",
    descColor: "text-black/60",
    ring: "#9740fe",
  },
  {
    target: 46,
    suffix: "%",
    description: "of all Google searches are looking for local businesses",
    bg: "bg-[#d9d0fb]",
    text: "text-black",
    descColor: "text-black/70",
    ring: "#9740fe",
  },
  {
    target: 391,
    suffix: "%",
    description: "more conversions when you respond within 1 minute",
    bg: "bg-[#090b3c]",
    text: "text-white",
    descColor: "text-white/60",
    ring: "#d9d0fb",
  },
];

function ProgressRing({ progress, color, size = 48 }) {
  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <svg width={size} height={size} className="mx-auto mb-4">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        className="text-black/5"
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
      />
    </svg>
  );
}

function StatCard({ stat, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useCountUp(stat.target, 2000, isInView);
  const delay = index * 0.2;
  const progress = isInView ? Math.min(stat.target / 400, 1) : 0;

  return (
    <motion.div
      ref={ref}
      className={`${stat.bg} rounded-2xl p-6 text-center`}
      initial={{ y: 30, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      <ProgressRing progress={progress} color={stat.ring} />
      <div className={`text-4xl md:text-5xl font-black ${stat.text}`}>
        {count}
        {stat.suffix}
      </div>
      <p className={`mt-2 text-sm font-light tracking-wide ${stat.descColor}`}>
        {stat.description}
      </p>
    </motion.div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <motion.section
      ref={sectionRef}
      className="py-[100px]"
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
            <StatCard key={stat.target} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import useCountUp from "@/hooks/useCountUp";

const stats = [
  {
    target: 78,
    suffix: "%",
    description: "of local mobile searches result in a purchase within 24 hours",
  },
  {
    target: 60,
    suffix: " sec",
    description: "average response time with Sora's AI",
  },
  {
    target: 46,
    suffix: "%",
    description: "of all Google searches are looking for local businesses",
  },
  {
    target: 391,
    suffix: "%",
    description: "more conversions when you respond within 1 minute",
  },
];

function StatBlock({ stat, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useCountUp(stat.target, 2000, isInView);
  const delay = index * 0.2;

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center text-center"
      initial={{ y: 30, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      <div className="text-5xl md:text-6xl font-black text-black pb-2 border-b-[3px] border-transparent bg-gradient-to-r from-[#9741FE] to-[#232872] bg-[length:100%_3px] bg-[position:0_100%] bg-no-repeat">
        {count}
        {stat.suffix}
      </div>
      <p className="mt-3 text-sm font-light tracking-wide text-black/60 max-w-[200px]">
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
      className="py-[100px] bg-gradient-to-r from-[#9741FE]/10 to-[#232872]/10"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs tracking-widest uppercase text-black/40 text-center mb-8">
          The Numbers
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat, i) => (
            <StatBlock key={stat.target} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

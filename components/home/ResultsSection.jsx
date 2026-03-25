"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import useCountUp from "@/hooks/useCountUp";

const results = [
  {
    tag: "Plumbing",
    tagClasses: "bg-accent text-primary",
    prefix: "$",
    target: 85,
    suffix: "K",
    context: "in pipeline value within the first 60 days of going live.",
  },
  {
    tag: "Electrical",
    tagClasses: "bg-accent text-primary",
    prefix: "#",
    target: 1,
    suffix: "",
    context: "on Google Maps. Page 4 to position #1 in 90 days.",
  },
  {
    tag: "Building",
    tagClasses: "bg-accent text-primary",
    prefix: "",
    target: 340,
    suffix: "%",
    context: "increase in monthly enquiries with Google Ads and AI follow-up.",
  },
];

function ResultCard({ result, index, sectionInView }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useCountUp(result.target, 2000, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ y: 30, opacity: 0 }}
      animate={sectionInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
    >
      <GlassCard className="p-8 overflow-hidden !bg-white" hover>
        {/* Gradient top border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-secondary" />

        {/* Trade tag */}
        <span
          className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${result.tagClasses}`}
        >
          {result.tag}
        </span>

        {/* Hero metric */}
        <div className="mt-6 mb-4 text-5xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {result.prefix}
          {count}
          {result.suffix}
        </div>

        {/* Context */}
        <p className="font-light text-black/60">{result.context}</p>
      </GlassCard>
    </motion.div>
  );
}

export default function ResultsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-[100px] bg-[#090b3c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-extrabold tracking-tight text-white">
            What Happens When the System Kicks In
          </h2>
          <p className="mt-4 text-lg font-light tracking-wide text-white/60 max-w-2xl mx-auto">
            Real results from real trade businesses using Sora.
          </p>
        </motion.div>

        {/* Grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {results.map((result, i) => (
            <ResultCard
              key={result.tag}
              result={result}
              index={i}
              sectionInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { X, Check } from "lucide-react";

const rows = [
  { label: "Understands your trade", agency: "Generic. Treats you like any client.", sora: "Founded by a licensed builder with 10 years in construction." },
  { label: "Communication", agency: "Monthly report you don't understand.", sora: "Direct access. Plain English. Real answers." },
  { label: "Setup time", agency: "4-8 weeks.", sora: "Leads in 2-4 weeks." },
  { label: "Contracts", agency: "12-month lock-in.", sora: "Month-to-month. Leave anytime." },
  { label: "Follow-up system", agency: "'That's not our job.'", sora: "Every lead auto-followed. Missed calls text back in 60 seconds." },
  { label: "Your involvement", agency: "Endless meetings and approvals.", sora: "30 minutes for setup, then we handle everything." },
];

function AgencyPanel() {
  return (
    <div className="bg-[#faf9ff] border border-dashed border-black/10 rounded-2xl p-8 md:p-10 h-full">
      <div className="mb-6">
        <span className="bg-black/10 text-black/40 text-sm font-bold px-4 py-2 rounded-full">
          Most Agencies
        </span>
      </div>
      <div className="flex flex-col">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`py-5 ${i < rows.length - 1 ? "border-b border-black/10" : ""}`}
          >
            <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">
              {row.label}
            </div>
            <div className="text-lg font-light text-black/40 flex items-start">
              <X className="text-black/20 mr-3 flex-shrink-0 w-5 h-5 mt-0.5" />
              {row.agency}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SoraPanel({ revealSora }) {
  return (
    <div className="relative -translate-y-1">
      {/* Glow shadow */}
      <div className="absolute inset-0 shadow-[0_10px_40px_rgba(151,64,254,0.15)] rounded-2xl pointer-events-none" />

      {/* Gradient border wrapper */}
      <div className="rounded-2xl bg-gradient-to-br from-primary to-secondary p-[1.5px] h-full">
        <div className="bg-[#faf9ff] backdrop-blur-xl rounded-[calc(1rem-1.5px)] p-8 md:p-10 h-full">
          <div className="mb-6">
            <span className="bg-accent text-primary text-sm font-bold px-4 py-2 rounded-full">
              With Sora
            </span>
          </div>
          <div className="flex flex-col">
            {rows.map((row, i) => (
              <motion.div
                key={row.label}
                className={`py-5 cursor-default hover:bg-accent/30 rounded-lg transition-colors duration-200 ${
                  i < rows.length - 1 ? "border-b border-black/5" : ""
                }`}
                initial={{ opacity: 0, x: 20 }}
                animate={revealSora ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.5, ease: "easeOut" }}
              >
                <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">
                  {row.label}
                </div>
                <div className="text-lg font-medium text-black flex items-start">
                  <Check className="text-[#9740fe] mr-3 flex-shrink-0 w-5 h-5 mt-0.5" />
                  {row.sora}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ComparisonTable() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [revealSora, setRevealSora] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setRevealSora(true), 800);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section className="py-[100px] bg-bluewhite section-shadow">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight text-black">
            Why{" "}
            <span className="underline decoration-black decoration-2 underline-offset-4">
              Sora
            </span>
            ?
          </h2>
          <p className="mt-4 text-lg font-light tracking-wide text-black/60 max-w-2xl mx-auto">
            You&apos;ve probably worked with agencies before. Here&apos;s how that usually goes — and why this is different.
          </p>
        </div>

        {/* Two-panel split */}
        <motion.div
          ref={ref}
          className="flex flex-col md:flex-row items-stretch gap-6"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="flex-1 min-w-0">
            <AgencyPanel />
          </div>
          <div className="flex-1 min-w-0">
            <SoraPanel revealSora={revealSora} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

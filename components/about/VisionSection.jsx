"use client";

import { motion } from "framer-motion";

const MILESTONES = [
  {
    year: "2025",
    title: "Launch",
    desc: "Build the foundation. First founding members onboarded. Prove the system works.",
    outerDot: "w-10 h-10",
    innerDot: "w-3 h-3",
  },
  {
    year: "2026",
    title: "Scale",
    desc: "100+ trade businesses powered by Sora systems. Expand the team and the platform.",
    outerDot: "w-12 h-12",
    innerDot: "w-4 h-4",
  },
  {
    year: "2027",
    title: "Platform",
    desc: "The leading automation and growth platform for trades in Australia. Every tradie has access to enterprise-level systems.",
    outerDot: "w-14 h-14",
    innerDot: "w-5 h-5",
  },
];

export default function VisionSection() {
  return (
    <section className="py-[100px] bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:flex lg:gap-16 lg:items-start">
        {/* Left column */}
        <motion.div
          className="lg:w-[55%]"
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-xs font-bold tracking-widest uppercase text-[#9740fe] mb-4 block">
            Where We&apos;re Going
          </span>
          <h2 className="text-4xl font-extrabold tracking-tight text-black mb-2">
            The Future of Trade Business
          </h2>
          <p className="text-lg font-light tracking-wide text-black/60 mt-2 mb-6">
            Where Sora is headed &mdash; and why it matters for your business.
          </p>
          <p className="text-base font-light tracking-wide leading-relaxed text-black/60 mb-4">
            Sora&apos;s vision is to become the leading automation and growth
            platform for trade businesses. Not just another agency &mdash; a
            complete operating system that replaces manual processes with smart,
            reliable systems.
          </p>
          <p className="text-base font-light tracking-wide leading-relaxed text-black/60">
            Every trade business deserves the tools to capture every opportunity,
            operate efficiently, and grow with confidence. We&apos;re building
            that future right now.
          </p>
        </motion.div>

        {/* Right column — roadmap */}
        <div className="lg:w-[45%] mt-12 lg:mt-0 relative pl-12">
          {/* Connecting line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#9740fe] via-[#222872] to-[#d9d0fb]" />

          <div className="flex flex-col gap-10">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.year}
                className="flex items-start gap-5"
                initial={{ x: 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                {/* Dot — progressively larger */}
                <div className={`${m.outerDot} rounded-full bg-[#d9d0fb] flex items-center justify-center flex-shrink-0 relative z-10`}>
                  <div className={`${m.innerDot} rounded-full bg-[#9740fe]`} />
                </div>

                {/* Content */}
                <div>
                  <span className="text-sm font-bold text-[#9740fe] mb-1 block">
                    {m.year}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-black mb-1">
                    {m.title}
                  </h3>
                  <p className="text-sm font-light tracking-wide text-black/60 leading-relaxed">
                    {m.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

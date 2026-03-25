"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const dashboards = [
  {
    title: "Booking Calendar",
    rotate: "-4deg",
    content: "calendar",
  },
  {
    title: "Marketing Dashboard",
    rotate: "2deg",
    content: "dashboard",
  },
  {
    title: "Lead Pipeline",
    rotate: "-2deg",
    content: "pipeline",
  },
];

function CalendarContent() {
  const highlighted = [3, 8, 12, 17, 24];
  return (
    <div className="p-4">
      <div className="grid grid-cols-7 gap-1 mb-2">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <div key={i} className="text-[10px] text-white/30 text-center font-medium">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 28 }, (_, i) => (
          <div
            key={i}
            className={`w-full aspect-square rounded flex items-center justify-center text-[10px] ${
              highlighted.includes(i + 1)
                ? "bg-[#9740fe]/30 text-white/80"
                : "bg-white/5 text-white/20"
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardContent() {
  return (
    <div className="p-4 flex flex-col gap-3">
      <div className="flex gap-2 items-end h-20">
        <div className="flex-1 bg-[#9740fe]/40 rounded-t" style={{ height: "60%" }} />
        <div className="flex-1 bg-[#9740fe]/40 rounded-t" style={{ height: "85%" }} />
        <div className="flex-1 bg-[#9740fe]/40 rounded-t" style={{ height: "45%" }} />
      </div>
      <div className="flex gap-3">
        <div className="flex-1 bg-white/5 rounded-lg p-2">
          <div className="text-lg font-bold text-white/60">127</div>
          <div className="text-[9px] text-white/30">Leads</div>
        </div>
        <div className="flex-1 bg-white/5 rounded-lg p-2">
          <div className="text-lg font-bold text-white/60">89%</div>
          <div className="text-[9px] text-white/30">Response</div>
        </div>
      </div>
    </div>
  );
}

function PipelineContent() {
  const stages = [
    { label: "New", cards: 3 },
    { label: "Quoted", cards: 2 },
    { label: "Won", cards: 1 },
    { label: "Done", cards: 2 },
  ];
  return (
    <div className="p-4 flex gap-2 h-full">
      {stages.map((s) => (
        <div key={s.label} className="flex-1 flex flex-col gap-1.5">
          <div className="text-[9px] text-white/30 font-medium text-center mb-1">{s.label}</div>
          {Array.from({ length: s.cards }, (_, i) => (
            <div key={i} className="bg-[#d9d0fb]/20 rounded h-6" />
          ))}
        </div>
      ))}
    </div>
  );
}

function DarkBrowserWindow({ item, index, isMobile }) {
  const ContentComponent =
    item.content === "calendar"
      ? CalendarContent
      : item.content === "dashboard"
      ? DashboardContent
      : PipelineContent;

  return (
    <div
      className="group relative transition-all duration-500 md:hover:scale-105 md:hover:z-20 md:hover:brightness-125 brightness-100 md:brightness-[0.6]"
      style={isMobile ? undefined : { transform: `rotate(${item.rotate})` }}
    >
      <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg transition-transform duration-500 md:group-hover:rotate-0">
        {/* Dark chrome bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-[#090b3c] border-b border-white/5">
          <div className="w-3 h-3 rounded-full bg-white/20" />
          <div className="w-3 h-3 rounded-full bg-white/15" />
          <div className="w-3 h-3 rounded-full bg-white/10" />
          <div className="flex-1 mx-3">
            <div className="h-5 rounded-md bg-white/5 max-w-[200px]" />
          </div>
        </div>

        {/* Dark content area */}
        <div className="bg-[#090b3c] aspect-[4/3] relative transition-all duration-500 md:blur-[2px] md:group-hover:blur-none md:group-hover:brightness-100">
          <ContentComponent />
        </div>
      </div>

      {/* Label — always visible on mobile, hover-reveal on desktop */}
      <div className="text-center mt-4 md:absolute md:bottom-[-20px] md:left-1/2 md:-translate-x-1/2 md:mt-0">
        <span className="bg-[#9740fe] text-white text-sm font-semibold px-4 py-2 rounded-full md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 whitespace-nowrap inline-block">
          {item.title}
        </span>
      </div>
    </div>
  );
}

export default function WhatYouGet() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section className="py-[100px] bg-bluewhite section-shadow">
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

        {/* Tilted dark browser windows */}
        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 md:px-8 pb-8"
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
              <DarkBrowserWindow item={item} index={i} isMobile={isMobile} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

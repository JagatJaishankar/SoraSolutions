"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/*
 * FREE ZONES — areas where fragments can appear without overlapping
 * the hero text (left ~52%) or video (right ~48%).
 * These are the margins/edges outside the max-w-7xl content area.
 *
 * Zone 1: far-left edge    (x: 0-8%,   y: 10-80%)
 * Zone 2: far-right edge   (x: 92-100%, y: 10-80%)
 * Zone 3: bottom-center    (x: 20-80%, y: 82-98%)
 */
const FREE_ZONES = [
  { xMin: -5, xMax: 8, yMin: 10, yMax: 75 },
  { xMin: 92, xMax: 105, yMin: 10, yMax: 75 },
  { xMin: 20, xMax: 80, yMin: 85, yMax: 100 },
];

function generateFragments() {
  const types = ["pipeline", "chat", "calendar"];
  return types.map((type, i) => {
    const zone = FREE_ZONES[i];
    return {
      x: Math.random() * (zone.xMax - zone.xMin) + zone.xMin,
      y: Math.random() * (zone.yMax - zone.yMin) + zone.yMin,
      rotation: Math.random() * 90 - 45,
      type,
    };
  });
}

function PipelineFragment() {
  return (
    <div className="w-[480px] h-[300px] bg-[#090b3c] rounded-xl p-6 border border-white/10 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="text-white/50 text-xs font-semibold tracking-wider uppercase">
          Lead Pipeline
        </div>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-white/20" />
          <div className="w-2 h-2 rounded-full bg-white/15" />
          <div className="w-2 h-2 rounded-full bg-white/10" />
        </div>
      </div>
      <div className="flex gap-3 h-[220px]">
        <div className="flex-1 bg-white/5 rounded-lg p-3 flex flex-col gap-2">
          <div className="text-white/30 text-[9px] font-medium">New</div>
          <div className="h-7 bg-[#9740fe]/40 rounded-md w-full" />
          <div className="h-7 bg-[#9740fe]/30 rounded-md w-[85%]" />
          <div className="h-7 bg-[#9740fe]/25 rounded-md w-[70%]" />
          <div className="h-7 bg-[#9740fe]/20 rounded-md w-[90%]" />
        </div>
        <div className="flex-1 bg-white/5 rounded-lg p-3 flex flex-col gap-2">
          <div className="text-white/30 text-[9px] font-medium">Quoted</div>
          <div className="h-7 bg-[#d9d0fb]/40 rounded-md w-full" />
          <div className="h-7 bg-[#d9d0fb]/30 rounded-md w-[90%]" />
          <div className="h-7 bg-[#d9d0fb]/25 rounded-md w-[75%]" />
        </div>
        <div className="flex-1 bg-white/5 rounded-lg p-3 flex flex-col gap-2">
          <div className="text-white/30 text-[9px] font-medium">Won</div>
          <div className="h-7 bg-[#9740fe]/60 rounded-md w-full" />
          <div className="h-7 bg-[#9740fe]/50 rounded-md w-[75%]" />
          <div className="h-7 bg-[#9740fe]/40 rounded-md w-full" />
          <div className="h-7 bg-[#9740fe]/35 rounded-md w-[60%]" />
          <div className="h-7 bg-[#9740fe]/30 rounded-md w-[85%]" />
        </div>
      </div>
    </div>
  );
}

function ChatFragment() {
  return (
    <div className="w-[420px] h-[300px] bg-[#090b3c] rounded-xl p-6 border border-white/10 shadow-2xl">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-full bg-[#9740fe]/30 flex items-center justify-center">
          <div className="w-3.5 h-3.5 text-[#d9d0fb]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a10 10 0 0110 10 10 10 0 01-10 10A10 10 0 012 12 10 10 0 0112 2z" />
            </svg>
          </div>
        </div>
        <div className="text-white/50 text-xs font-semibold tracking-wider uppercase">
          AI Assistant
        </div>
        <div className="ml-auto w-2.5 h-2.5 rounded-full bg-[#9740fe] animate-pulse" />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-start">
          <div className="bg-white/10 rounded-lg rounded-tl-none px-4 py-2.5 max-w-[80%]">
            <div className="text-white/50 text-[11px]">
              Hi! I&apos;m looking for a plumber in Newcastle. Do you cover that area?
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-[#9740fe]/30 rounded-lg rounded-tr-none px-4 py-2.5 max-w-[80%]">
            <div className="text-white/60 text-[11px]">
              Absolutely! We service all of Newcastle and Lake Macquarie. What do you need help with?
            </div>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="bg-white/10 rounded-lg rounded-tl-none px-4 py-2.5 max-w-[80%]">
            <div className="text-white/50 text-[11px]">
              Bathroom renovation. Can I get a quote?
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="bg-[#9740fe]/30 rounded-lg rounded-tr-none px-4 py-2.5 max-w-[65%]">
            <div className="text-white/60 text-[11px]">
              Of course! I&apos;ll get Joel to call you. What&apos;s a good number?
            </div>
          </div>
        </div>
        <div className="flex justify-start">
          <div className="bg-white/10 rounded-lg rounded-tl-none px-4 py-2.5 max-w-[70%]">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CalendarFragment() {
  return (
    <div className="w-[450px] h-[290px] bg-[#090b3c] rounded-xl p-6 border border-white/10 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="text-white/50 text-xs font-semibold tracking-wider uppercase">
          Booking Calendar
        </div>
        <div className="text-white/30 text-[11px]">March 2026</div>
      </div>
      <div className="grid grid-cols-7 gap-1.5 mb-3">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
          <div key={i} className="text-center text-white/25 text-[9px] font-medium">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {Array.from({ length: 35 }, (_, i) => {
          const dayNum = i - 1;
          const isBooked = [4, 7, 11, 15, 18, 22, 25, 29].includes(i);
          const isAvailable = [5, 8, 12, 16, 19, 23, 26, 30].includes(i);
          const isToday = i === 14;

          return (
            <div
              key={i}
              className={`w-full aspect-square rounded-lg flex items-center justify-center text-[9px] ${
                isToday
                  ? "bg-[#9740fe] text-white font-bold"
                  : isBooked
                  ? "bg-[#9740fe]/30 text-white/60"
                  : isAvailable
                  ? "bg-[#d9d0fb]/20 text-white/40"
                  : "text-white/15"
              }`}
            >
              {dayNum > 0 && dayNum <= 31 ? dayNum : ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const FRAGMENT_COMPONENTS = {
  pipeline: PipelineFragment,
  chat: ChatFragment,
  calendar: CalendarFragment,
};

export default function OrbRevealLayer() {
  const [mounted, setMounted] = useState(false);
  const [fragments, setFragments] = useState([]);
  const containerRef = useRef(null);
  const isVisibleRef = useRef(true);
  const rafRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    setFragments(generateFragments());
  }, []);

  // IntersectionObserver — pause rAF when hero is off-screen
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [mounted]);

  // rAF loop — read existing blob positions (g1-g5 + interactive cursor), apply as CSS mask
  const updateMask = useCallback(() => {
    if (!isVisibleRef.current || !containerRef.current) {
      rafRef.current = requestAnimationFrame(updateMask);
      return;
    }

    const containerRect = containerRef.current.getBoundingClientRect();
    const masks = [];
    const selectors = [".g1", ".g2", ".g3", ".g4", ".g5", ".interactive"];

    for (const sel of selectors) {
      const el = document.querySelector(`.gradient-bg ${sel}`);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2 - containerRect.left;
      const cy = rect.top + rect.height / 2 - containerRect.top;
      masks.push(
        `radial-gradient(circle 350px at ${cx}px ${cy}px, black 0%, transparent 85%)`
      );
    }

    if (masks.length > 0) {
      const maskStr = masks.join(", ");
      containerRef.current.style.WebkitMaskImage = maskStr;
      containerRef.current.style.maskImage = maskStr;
    }

    rafRef.current = requestAnimationFrame(updateMask);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    rafRef.current = requestAnimationFrame(updateMask);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mounted, updateMask]);

  if (!mounted || fragments.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-visible pointer-events-none z-[1] hidden lg:block">
      <div
        ref={containerRef}
        className="absolute inset-0"
        style={{
          WebkitMaskComposite: "source-over",
          maskComposite: "add",
        }}
      >
        {/* UI Fragments — positioned in free zones only (edges/margins), 50% opacity */}
        {fragments.map((frag, i) => {
          const Comp = FRAGMENT_COMPONENTS[frag.type];
          return (
            <div
              key={i}
              className="absolute opacity-50"
              style={{
                left: `${frag.x}%`,
                top: `${frag.y}%`,
                transform: `translate(-50%, -50%) rotate(${frag.rotation}deg)`,
              }}
            >
              <Comp />
            </div>
          );
        })}
      </div>
    </div>
  );
}

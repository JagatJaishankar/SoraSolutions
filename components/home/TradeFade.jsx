"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TRADES = [
  { name: "Plumbers",     emoji: "🔧" },
  { name: "Electricians", emoji: "⚡" },
  { name: "Builders",     emoji: "🏗️" },
  { name: "Roofers",      emoji: "🏠" },
  { name: "Landscapers",  emoji: "🌿" },
  { name: "Painters",     emoji: "🎨" },
  { name: "Concreters",   emoji: "🧱" },
  { name: "HVAC",         emoji: "❄️" },
];

const FADE_MS  = 400;   // fade in / fade out duration
const HOLD_MS  = 2200;  // time the word sits fully visible
const CYCLE_MS = FADE_MS + HOLD_MS + FADE_MS;

export default function TradeFade() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setTimeout(
      () => setIndex((i) => (i + 1) % TRADES.length),
      CYCLE_MS
    );
    return () => clearTimeout(t);
  }, [index]);

  const { name, emoji } = TRADES[index];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
      {/* "Built for" — above pill on mobile */}
      <span className="text-xs font-semibold tracking-widest uppercase text-black/40 sm:hidden">
        Built for
      </span>

      <div className="glass-light min-h-[56px] px-6 py-2.5 inline-flex items-center gap-4">
        <span className="hidden sm:inline text-sm font-semibold tracking-widest uppercase text-black/40">
          Built for
        </span>
        <span className="hidden sm:inline text-black/20">|</span>

        {/*
          Fixed-size container prevents layout shift as trade names change width.
          "Electricians" at text-3xl font-black ≈ 215px; icon + gap ≈ 32px → 250px total.
        */}
        <div className="relative h-9 min-w-[160px] sm:min-w-[250px] flex items-center">
          <AnimatePresence mode="sync">
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: FADE_MS / 1000, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center gap-2.5"
            >
              {/* Emoji */}
              <span className="text-2xl sm:text-3xl leading-none">{emoji}</span>

              {/* Trade name */}
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-black">
                {name}
              </span>
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = [
  { word: "Jobs.", fontVar: "var(--font-plus-jakarta)", fontWeight: 800 },
  { word: "Leads.", fontVar: "var(--font-oswald)", fontWeight: 700 },
  { word: "Reviews.", fontVar: "var(--font-playfair)", fontWeight: 700 },
  { word: "Time.", fontVar: "var(--font-space-mono)", fontWeight: 700 },
  { word: "Cashflow.", fontVar: "var(--font-bebas)", fontWeight: 400 },
  { word: "Bookings.", fontVar: "var(--font-raleway)", fontWeight: 700 },
  { word: "Profit.", fontVar: "var(--font-black-han)", fontWeight: 400 },
  { word: "Freedom.", fontVar: "var(--font-caveat)", fontWeight: 700 },
  { word: "Growth.", fontVar: "var(--font-barlow)", fontWeight: 800 },
  { word: "Scale.", fontVar: "var(--font-barlow)", fontWeight: 600 },
];

export default function WordFlip() {
  const [phase, setPhase] = useState("show");
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (phase === "show") {
      const t = setTimeout(() => setPhase("tick"), 2500);
      return () => clearTimeout(t);
    }
    if (phase === "tick") {
      const t = setTimeout(() => {
        setWordIndex(1);
        setPhase("spinning");
      }, 950);
      return () => clearTimeout(t);
    }
    if (phase === "spinning") {
      if (wordIndex < WORDS.length - 1) {
        const t = setTimeout(() => setWordIndex((i) => i + 1), 240);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          setWordIndex(0);
          setPhase("landing");
        }, 240);
        return () => clearTimeout(t);
      }
    }
    if (phase === "landing") {
      const t = setTimeout(() => setPhase("tick"), 2750);
      return () => clearTimeout(t);
    }
  }, [phase, wordIndex]);

  const isSpin = phase === "spinning";
  const current = WORDS[wordIndex];
  const fontStyle = { fontFamily: current.fontVar, fontWeight: current.fontWeight, color: "#000" };

  return (
    <span className="wordflip-container">
      <span
        style={{
          position: "relative",
          display: "inline-block",
          overflow: "hidden",
          verticalAlign: "bottom",
          paddingRight: "0.08em",
        }}
      >
        {/* Invisible sizer — holds layout width + height */}
        <span
          aria-hidden="true"
          style={{ visibility: "hidden", display: "block", whiteSpace: "nowrap", ...fontStyle }}
        >
          {current.word}
        </span>

        {/* Animated word */}
        <AnimatePresence initial={false}>
          <motion.span
            key={`word-${wordIndex}`}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{
              y: "-100%",
              transition: { duration: 0.06, ease: "linear" },
            }}
            transition={
              isSpin
                ? { duration: 0.06, ease: "linear" }
                : { duration: 0.25, ease: "easeOut" }
            }
            style={{ position: "absolute", top: 0, left: 0, whiteSpace: "nowrap", ...fontStyle }}
          >
            {current.word}
          </motion.span>
        </AnimatePresence>
      </span>

      {/* Tick checkmark */}
      <motion.span
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: phase === "tick" ? 1 : 0,
          opacity: phase === "tick" ? 1 : 0,
        }}
        transition={
          phase === "tick"
            ? { type: "spring", stiffness: 300, damping: 20 }
            : { duration: 0.15 }
        }
        className="wordflip-tick text-black"
      >
        ✓
      </motion.span>
    </span>
  );
}

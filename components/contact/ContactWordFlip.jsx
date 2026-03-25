"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = [
  { word: "Business.", fontVar: null, weight: null },
  { word: "Growth.", fontVar: "--font-oswald", weight: 700 },
  { word: "Pipeline.", fontVar: "--font-playfair", weight: 700 },
  { word: "Strategy.", fontVar: "--font-space-mono", weight: 700 },
  { word: "Future.", fontVar: "--font-bebas", weight: 400 },
  { word: "Revenue.", fontVar: "--font-raleway", weight: 700 },
  { word: "Systems.", fontVar: "--font-barlow", weight: 800 },
  { word: "Success.", fontVar: "--font-caveat", weight: 700 },
];

export default function ContactWordFlip() {
  const [phase, setPhase] = useState("show");
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (phase === "show") {
      const t = setTimeout(() => {
        setWordIndex(1);
        setPhase("spinning");
      }, 3500);
      return () => clearTimeout(t);
    }
    if (phase === "spinning") {
      if (wordIndex < WORDS.length - 1) {
        const t = setTimeout(() => setWordIndex((i) => i + 1), 300);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          setWordIndex(0);
          setPhase("landing");
        }, 300);
        return () => clearTimeout(t);
      }
    }
    if (phase === "landing") {
      const t = setTimeout(() => {
        setWordIndex(1);
        setPhase("spinning");
      }, 3750);
      return () => clearTimeout(t);
    }
  }, [phase, wordIndex]);

  const isSpin = phase === "spinning";
  const current = WORDS[wordIndex];

  const fontFamily = current.fontVar
    ? `var(${current.fontVar})`
    : "var(--font-maven-pro)";
  const fontWeight = current.weight ?? 800;

  const fontStyle = {
    fontFamily,
    fontWeight,
    backgroundImage: "linear-gradient(135deg, #9740fe, #222872)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

  return (
    <span className="wordflip-container">
      <span className="wordflip-slot">
        <span aria-hidden="true" className="wordflip-sizer" style={fontStyle}>
          {current.word}
        </span>

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
            className="wordflip-word"
            style={{ ...fontStyle, width: "100%", textAlign: "center" }}
          >
            {current.word}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}

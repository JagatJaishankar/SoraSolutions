"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = [
  "Get Found.",
  "Get Leads.",
  "Scale Fast.",
  "Win Work.",
  "Book More.",
  "Save Time.",
  "Stand Out.",
  "Grow Online.",
];

const INTERVAL = 800;

export default function ServiceWordFlip() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setWordIndex((i) => (i + 1) % WORDS.length);
    }, INTERVAL);
    return () => clearInterval(t);
  }, []);

  const current = WORDS[wordIndex];
  const fontStyle = {
    fontFamily: "var(--font-caveat)",
    fontWeight: 700,
    backgroundImage: "linear-gradient(135deg, #9740fe, #222872)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  };

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
        {/* Invisible sizer — uses the longest word to prevent width jumps */}
        <span
          aria-hidden="true"
          style={{
            visibility: "hidden",
            display: "block",
            whiteSpace: "nowrap",
            ...fontStyle,
          }}
        >
          Grow Online.
        </span>

        {/* Animated word */}
        <AnimatePresence initial={false}>
          <motion.span
            key={`word-${wordIndex}`}
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{
              y: "-100%",
              transition: { duration: 0.15, ease: "easeIn" },
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              whiteSpace: "nowrap",
              width: "100%",
              textAlign: "center",
              ...fontStyle,
            }}
          >
            {current}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

const TRADES = [
  { name: "Plumbers", emoji: "🔧" },
  { name: "Electricians", emoji: "⚡" },
  { name: "Builders", emoji: "🏗️" },
  { name: "Roofers", emoji: "🏠" },
  { name: "Landscapers", emoji: "🌿" },
  { name: "Painters", emoji: "🎨" },
  { name: "Concreters", emoji: "🧱" },
  { name: "HVAC", emoji: "❄️" },
];

// Phase durations (ms)
const STRIPE_IN = 350;
const TEXT_IN = 400;
const HOLD = 1500;
const TEXT_OUT = 350;
const STRIPE_OUT = 350;

export default function TradeRotator() {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState("stripe-in"); // stripe-in | text-in | hold | text-out | stripe-out
  const timeoutRef = useRef(null);

  const advance = useCallback(() => {
    setIndex((prev) => (prev + 1) % TRADES.length);
    setPhase("stripe-in");
  }, []);

  useEffect(() => {
    clearTimeout(timeoutRef.current);

    const delays = {
      "stripe-in": STRIPE_IN,
      "text-in": TEXT_IN,
      hold: HOLD,
      "text-out": TEXT_OUT,
      "stripe-out": STRIPE_OUT,
    };

    const nextPhase = {
      "stripe-in": "text-in",
      "text-in": "hold",
      hold: "text-out",
      "text-out": "stripe-out",
      "stripe-out": null, // triggers advance
    };

    timeoutRef.current = setTimeout(() => {
      const next = nextPhase[phase];
      if (next) {
        setPhase(next);
      } else {
        advance();
      }
    }, delays[phase]);

    return () => clearTimeout(timeoutRef.current);
  }, [phase, advance]);

  const trade = TRADES[index];

  // Stripe animation
  const showStripe = phase !== "stripe-out" || true; // always mounted, controlled by scaleX
  const stripeScaleX =
    phase === "stripe-in" || phase === "text-in" || phase === "hold" || phase === "text-out"
      ? 1
      : 0;
  const stripeOrigin = "left";

  // Text visibility
  const showText =
    phase === "text-in" || phase === "hold" || phase === "text-out";
  const textOpacity = phase === "text-out" ? 0 : showText ? 1 : 0;


  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
      {/* "Built for" label — above pill on mobile */}
      <span className="text-xs font-semibold tracking-widest uppercase text-black/40 sm:hidden">
        Built for
      </span>

      <div className="glass-light min-h-[56px] px-6 py-2.5 inline-flex items-center gap-4">
        <span className="hidden sm:inline text-sm font-semibold tracking-widest uppercase text-black/40">
          Built for
        </span>
        <span className="hidden sm:inline text-black/20">|</span>

        <span className="relative inline-flex items-center gap-3">
          {/* Emoji — instant pop */}
          <motion.span
            key={trade.emoji}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 15, duration: 0.15 }}
            className="text-3xl sm:text-4xl"
          >
            {trade.emoji}
          </motion.span>

          {/* Trade name + paint stroke */}
          <span className="relative text-3xl sm:text-4xl font-black tracking-tight text-black">
            {/* Text layer */}
            <motion.span
              className="relative z-10"
              animate={{ opacity: textOpacity }}
              transition={{ duration: phase === "text-in" ? 0.4 : 0.35 }}
            >
              {trade.name}
            </motion.span>

            {/* Paint stroke */}
            <motion.span
              animate={{ scaleX: stripeScaleX }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="absolute -inset-x-1.5 bottom-0 h-1/2 bg-[#9741FE]/45 rounded"
              style={{ transformOrigin: stripeOrigin }}
            />
          </span>
        </span>
      </div>
    </div>
  );
}

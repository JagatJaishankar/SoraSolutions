"use client";

import { motion } from "framer-motion";

export default function GlassCard({
  children,
  className = "",
  hover = true,
  gradientBorder = false,
}) {
  const inner = (
    <motion.div
      className={`bg-white/50 backdrop-blur-xl border border-white/20 rounded-2xl ${className}`}
      whileHover={hover ? { y: -4, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" } : undefined}
      transition={hover ? { duration: 0.3 } : undefined}
    >
      {children}
    </motion.div>
  );

  if (gradientBorder) {
    return (
      <div className="p-[1.5px] rounded-2xl bg-gradient-to-br from-[#9741FE] to-[#232872]">
        {inner}
      </div>
    );
  }

  return inner;
}

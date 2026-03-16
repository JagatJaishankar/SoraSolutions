"use client";

import { motion } from "framer-motion";

export default function PrimaryButton({
  children,
  onClick,
  href,
  className = "",
  type = "button",
}) {
  const classes = `shimmer-button inline-flex items-center justify-center bg-primary text-white font-bold rounded-xl px-7 py-3.5 shadow-md cursor-pointer ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}

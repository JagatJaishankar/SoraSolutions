"use client";

import { motion } from "framer-motion";

export default function SecondaryButton({
  children,
  onClick,
  href,
  className = "",
  type = "button",
}) {
  const classes = `inline-flex items-center justify-center border-2 border-current bg-transparent font-bold rounded-xl px-6 py-3 cursor-pointer transition-colors duration-300 hover:bg-primary hover:text-white hover:border-primary ${className}`;

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

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function SectionWrapper({
  children,
  className = "",
  maxWidth = "max-w-7xl",
  padding = "py-[100px]",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className={`${maxWidth} mx-auto px-4 sm:px-6 lg:px-8 ${padding} ${className}`}>
      <motion.div
        ref={ref}
        initial={{ y: 30, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
}

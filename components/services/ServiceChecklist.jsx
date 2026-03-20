"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";

export default function ServiceChecklist({ items }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="flex items-start gap-3"
          initial={{ y: 15, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 15, opacity: 0 }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
            delay: i * 0.08,
          }}
        >
          <span className="w-5 h-5 rounded-full bg-accent flex-shrink-0 flex items-center justify-center mt-0.5">
            <Check className="text-primary" size={14} />
          </span>
          <span className="text-sm font-light text-black/70 leading-relaxed">
            {item}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

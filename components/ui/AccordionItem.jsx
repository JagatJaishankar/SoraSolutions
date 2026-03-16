"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function AccordionItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className={`border-b border-black/10 ${isOpen ? "border-l-2 border-l-primary" : ""}`}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex justify-between items-center cursor-pointer py-5 px-4"
      >
        <span className="font-semibold text-black text-left">{question}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 ml-4 text-black/60"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-5 font-light text-black/60 tracking-wide">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

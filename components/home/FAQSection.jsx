"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import AccordionItem from "@/components/ui/AccordionItem";
import faqData from "@/lib/faqData";

const leftColumn = faqData.slice(0, 6);
const rightColumn = faqData.slice(6, 12);

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-[100px]">
      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-extrabold tracking-tight text-black">
            Got Questions?
          </h2>
          <p className="mt-4 text-lg font-light tracking-wide text-black/60 max-w-2xl mx-auto">
            Here&apos;s what most tradies want to know before getting started.
          </p>
        </motion.div>

        {/* Glass container */}
        <div className="bg-white/50 backdrop-blur-xl border border-white/20 rounded-2xl p-4 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8">
            {/* Left column */}
            <div>
              {leftColumn.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                    delay: i * 0.08,
                  }}
                >
                  <AccordionItem
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndex === i}
                    onToggle={() => handleToggle(i)}
                  />
                </motion.div>
              ))}
            </div>

            {/* Right column */}
            <div>
              {rightColumn.map((faq, i) => {
                const globalIndex = i + 6;
                return (
                  <motion.div
                    key={globalIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut",
                      delay: (i + 6) * 0.08,
                    }}
                  >
                    <AccordionItem
                      question={faq.question}
                      answer={faq.answer}
                      isOpen={openIndex === globalIndex}
                      onToggle={() => handleToggle(globalIndex)}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

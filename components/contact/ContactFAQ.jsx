"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AccordionItem from "@/components/ui/AccordionItem";

const FAQS = [
  {
    question: "What happens on the strategy call?",
    answer:
      "Joel will review your current online presence, identify the biggest opportunities for your trade, and recommend specific services based on your goals and budget. No pressure, no hard sell \u2014 just an honest conversation about where your business is at and what would actually help.",
  },
  {
    question: "Is the call really free?",
    answer:
      "Yes. 30 minutes, no obligation. Even if you don\u2019t work with us, you\u2019ll walk away with a clear picture of what\u2019s working and what\u2019s not in your current marketing.",
  },
  {
    question: "How quickly can you get started?",
    answer:
      "Most clients are onboarded within a week. Websites take 2-3 weeks. Ads can be running within days. AI and CRM go live as soon as the system is configured for your business.",
  },
  {
    question: "Do I need to prepare anything before the call?",
    answer:
      "Not really. It helps if you know your average job value and which services you want to promote, but Joel will guide the conversation. Just show up and be ready to talk about your business.",
  },
];

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-[100px] px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold tracking-tight text-black text-center mb-4">
          Common Questions
        </h2>
        <p className="text-lg font-light tracking-wide text-black/60 text-center mb-12">
          Quick answers before you reach out.
        </p>

        <div>
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
            >
              <AccordionItem
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === i}
                onToggle={() =>
                  setOpenIndex((prev) => (prev === i ? null : i))
                }
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

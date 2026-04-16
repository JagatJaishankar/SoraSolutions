"use client";

import { motion } from "framer-motion";
import { FileText, Brain } from "lucide-react";

const items = [
  {
    icon: FileText,
    title: "The Tradie\u2019s Growth Guide",
    description:
      "A step-by-step playbook for taking your trade business from where it is now to where you want it to be. Covering marketing, systems, and hiring.",
  },
  {
    icon: Brain,
    title: "AI Readiness Quiz",
    description:
      "Find out how ready your trade business is for AI automation. Answer 10 questions and get a personalised report with recommendations.",
  },
];

export default function ComingSoon() {
  return (
    <section id="coming-soon" className="py-[100px] bg-[#faf9ff] shadow-[inset_0_8px_16px_-8px_rgba(0,0,0,0.06),inset_0_-8px_16px_-8px_rgba(0,0,0,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight text-black">
            More Coming Soon
          </h2>
          <p className="text-lg font-light tracking-wide text-black/60 mt-4 max-w-2xl mx-auto">
            We&apos;re building more free tools and resources for tradies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-8 relative overflow-hidden"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="absolute top-4 right-4">
                  <span className="bg-[#d9d0fb] text-[#9740fe] text-xs font-semibold px-3 py-1 rounded-full">
                    Coming Soon
                  </span>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-[#d9d0fb] flex items-center justify-center mb-4">
                  <Icon size={28} className="text-[#9740fe]" />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-black mb-2">
                  {item.title}
                </h3>
                <p className="text-sm font-light tracking-wide text-black/60">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

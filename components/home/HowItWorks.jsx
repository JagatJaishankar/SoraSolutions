"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Radar, Zap, TrendingUp } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import PrimaryButton from "@/components/ui/PrimaryButton";

const steps = [
  {
    number: "01",
    title: "Get Found",
    icon: Radar,
    description:
      "We put your business where customers are already looking. A website that ranks. SEO that puts you on the map. Ads that target the right people at the right time. You stop being invisible.",
    pills: ["Websites", "SEO", "Google Ads", "Facebook Ads"],
  },
  {
    number: "02",
    title: "Convert & Capture",
    icon: Zap,
    description:
      "Every visitor, every caller, every enquiry goes into your system. AI captures their details, qualifies the lead, and follows up instantly — before your competitor even checks their voicemail. Nothing gets lost.",
    pills: ["CRM", "AI Chatbot", "AI Receptionist", "Lead Capture"],
  },
  {
    number: "03",
    title: "Grow & Dominate",
    icon: TrendingUp,
    description:
      "As the data builds, we optimise everything. More of what works, less of what doesn't. Automated review requests build your reputation. Your pipeline gets predictable. You go from chasing work to choosing work.",
    pills: ["Review Automation", "Analytics", "Ongoing Strategy"],
  },
];

function StepCard({ step, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = step.icon;

  return (
    <div ref={ref} className="relative grid grid-cols-[40px_24px_1fr] md:grid-cols-[48px_28px_1fr] items-start">
      {/* Circle node */}
      <div className="flex justify-center z-10">
        <motion.div
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#2362fd] to-[#fd6600] flex items-center justify-center text-white font-bold text-xs md:text-sm shadow-lg"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: [0, 1.15, 1] } : { scale: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", times: [0, 0.6, 1] }}
        >
          {step.number}
        </motion.div>
      </div>

      {/* Horizontal connector */}
      <div className="flex items-center h-10 md:h-12">
        <div className="w-full h-[2px] bg-gradient-to-r from-[#2362fd] to-[#fd6600] opacity-30" />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <GlassCard className="p-6 md:p-8 lg:p-10" hover={false}>
          <div className="flex flex-col md:flex-row md:gap-8">
            {/* Left: icon + title */}
            <div className="flex-shrink-0 md:w-[30%]">
              <div className="w-12 h-12 rounded-xl bg-[#2362fd]/10 flex items-center justify-center mb-3">
                <Icon className="w-6 h-6 text-[#2362fd]" />
              </div>
              <h3 className="text-2xl font-bold text-black mb-3 md:mb-0">{step.title}</h3>
            </div>

            {/* Right: description + pills */}
            <div className="md:w-[70%]">
              <p className="text-base font-light tracking-wide text-black/60 leading-relaxed mb-4">
                {step.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {step.pills.map((pill) => (
                  <span
                    key={pill}
                    className="bg-[#2362fd]/10 text-[#2362fd] text-xs font-semibold rounded-full px-3 py-1"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} className="py-[100px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl font-extrabold tracking-tight text-black">
            How Sora Gets You More Jobs
          </h2>
          <p className="mt-4 text-lg font-light tracking-wide text-black/60 max-w-2xl mx-auto">
            Every trade business is different. But the system that grows them is the same.
          </p>
        </div>

        {/* Timeline — left-aligned */}
        <div className="relative flex flex-col gap-12 md:gap-16">
          {/* Progress line track */}
          <div className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-[2px] md:w-[3px]">
            <div className="absolute inset-0 bg-black/10 rounded-full" />
            <motion.div
              className="absolute top-0 left-0 right-0 origin-top bg-gradient-to-b from-[#2362fd] to-[#fd6600] rounded-full"
              style={{ scaleY: lineScaleY, height: "100%" }}
            />
          </div>

          {/* Steps */}
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16 md:mt-24">
          <PrimaryButton href="#contact">
            Book a Free Strategy Call &rarr;
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";
import PrimaryButton from "@/components/ui/PrimaryButton";
import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Get Found",
    image: "/images/home-page/timeline-section/01-get-found.webp",
    description: "We put your business where customers are already searching.",
    pills: ["Websites", "SEO", "Google Ads", "Social Ads"],
  },
  {
    number: "02",
    title: "Convert & Capture",
    image: "/images/home-page/timeline-section/02-capture-and-convert.webp",
    description: "Every enquiry goes into your system and gets followed up instantly.",
    pills: ["CRM", "AI Follow-up", "Lead Capture", "Missed Call Text-back"],
  },
  {
    number: "03",
    title: "Grow & Dominate",
    image: "/images/home-page/timeline-section/03-grow-and-dominate.webp",
    description: "We optimise what's working and build your reputation on autopilot.",
    pills: ["Review Automation", "Analytics", "Ongoing Strategy"],
  },
];

function StepCard({ step, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="relative grid grid-cols-[40px_24px_1fr] md:grid-cols-[48px_28px_1fr] items-start">
      {/* Circle node */}
      <div className="flex justify-center z-10">
        <motion.div
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xs md:text-sm shadow-lg"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: [0, 1.15, 1] } : { scale: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", times: [0, 0.6, 1] }}
        >
          {step.number}
        </motion.div>
      </div>

      {/* Horizontal connector */}
      <div className="flex items-center h-10 md:h-12">
        <div className="w-full h-[2px] bg-gradient-to-r from-primary to-secondary opacity-30" />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <GlassCard className="p-4 md:p-6" hover={false}>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
            {/* Image */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                <Image
                  src={step.image}
                  alt={step.title}
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center text-left !text-black">
              <h3 className="text-xl md:text-2xl font-bold !text-black mb-2">
                {step.title}
              </h3>
              <p className="text-sm md:text-base font-normal tracking-wide !text-black/60 leading-relaxed mb-4">
                {step.description}
              </p>
              <div className="flex flex-wrap justify-start gap-2">
                {step.pills.map((pill) => (
                  <span
                    key={pill}
                    className="bg-accent text-primary text-xs font-semibold rounded-full px-3 py-1"
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} className="py-[100px]">
      <div className="max-w-[880px] mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="relative flex flex-col gap-16 md:gap-20">
          {/* Progress line track */}
          <div className="absolute left-[19px] md:left-[23px] top-0 bottom-0 w-[2px] md:w-[3px]">
            <div className="absolute inset-0 bg-black/10 rounded-full" />
            {isMobile ? (
              <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-primary to-secondary rounded-full" />
            ) : (
              <motion.div
                className="absolute top-0 left-0 right-0 origin-top bg-gradient-to-b from-primary to-secondary rounded-full"
                style={{ scaleY: lineScaleY, height: "100%" }}
              />
            )}
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

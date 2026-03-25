"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PhoneOff, TrendingDown, Trophy } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FlipCard from "@/components/ui/FlipCard";

const PROBLEMS = [
  {
    icon: PhoneOff,
    title: "Leads Going Cold",
    frontTeaser:
      "Enquiries come in but nobody follows up fast enough. By the time you call back, they have already found someone else.",
    backCopy:
      "You're out on a job, the phone rings — but you can't answer. By the time you call back, they've already booked someone else. Every missed call is money walking out the door.",
    backFooter: "Sora fills this gap \u2192",
    frontBg: "bg-[#f5f3ff]",
    frontBorder: "border-[#d9d0fb]",
    backBg: "bg-[#f5f3ff]",
    backBorder: "border-[#d9d0fb]",
    iconBg: "bg-[#d9d0fb]",
    iconColor: "text-[#9740fe]",
  },
  {
    icon: TrendingDown,
    title: "Wasted Marketing Spend",
    frontTeaser:
      "You have tried ads, maybe even paid an agency. Got a report full of impressions but cannot tell if it brought in a single job.",
    backCopy:
      "You've spent thousands on ads and SEO. The agency sends a report full of numbers you don't understand. But the phone isn't ringing any more than before.",
    backFooter: "Sora fills this gap \u2192",
    frontBg: "bg-[#d9d0fb]",
    frontBorder: "border-[#9740fe]/20",
    backBg: "bg-[#d9d0fb]",
    backBorder: "border-[#9740fe]/20",
    iconBg: "bg-[#9740fe]/20",
    iconColor: "text-[#222872]",
  },
  {
    icon: Trophy,
    title: "Competitors Booked Out",
    frontTeaser:
      "Meanwhile, some of your competitors are booked out months ahead. Not because they are better. Because they have the systems.",
    backCopy:
      "They're not more skilled than you. They just have better marketing, faster follow-up, and systems that capture every lead. That's the only difference.",
    backFooter: "Sora fills this gap \u2192",
    frontBg: "bg-[#090b3c]",
    frontBorder: "border-white/10",
    frontTextColor: "text-white",
    frontDescColor: "text-white/60",
    frontHintColor: "text-white/40",
    backBg: "bg-[#090b3c]",
    backBorder: "border-white/10",
    backTextColor: "text-white/70",
    iconBg: "bg-white/10",
    iconColor: "text-[#d9d0fb]",
  },
];

const entranceVariants = [
  { initial: { x: 40, y: 20, rotate: 3, opacity: 0 }, delay: 0 },
  { initial: { y: 30, opacity: 0 }, delay: 0.15 },
  { initial: { x: -40, y: 20, rotate: -3, opacity: 0 }, delay: 0.3 },
];

export default function ProblemCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-[100px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          heading="Sound Familiar?"
          subheading="These are the problems we hear from tradies every single day. If any of this hits home, you're not alone — and there's a fix."
        />

        <div
          ref={ref}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {PROBLEMS.map((problem, index) => {
            const variant = entranceVariants[index];

            return (
              <motion.div
                key={problem.title}
                initial={variant.initial}
                whileInView={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                transition={{
                  delay: variant.delay,
                  type: "spring",
                  damping: 20,
                  stiffness: 200,
                }}
                viewport={{ once: true, margin: "-80px" }}
              >
                <FlipCard
                  icon={problem.icon}
                  title={problem.title}
                  frontTeaser={problem.frontTeaser}
                  backCopy={problem.backCopy}
                  backFooter={problem.backFooter}
                  frontBg={problem.frontBg}
                  frontBorder={problem.frontBorder}
                  frontTextColor={problem.frontTextColor}
                  frontDescColor={problem.frontDescColor}
                  frontHintColor={problem.frontHintColor}
                  backBg={problem.backBg}
                  backBorder={problem.backBorder}
                  backTextColor={problem.backTextColor}
                  iconBg={problem.iconBg}
                  iconColor={problem.iconColor}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

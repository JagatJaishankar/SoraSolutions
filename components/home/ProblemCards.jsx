"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PhoneOff, Filter, BarChart2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FlipCard from "@/components/ui/FlipCard";

const PROBLEMS = [
  {
    icon: PhoneOff,
    title: "Time Wasters & Missed Calls",
    frontTeaser:
      "Enquiries come in but they're tyre-kickers, or you miss the call and they've moved on by the time you ring back.",
    backCopy:
      "You're out on a job, the phone rings — but you can't answer. By the time you call back, they've already booked someone else. Every missed call is money walking out the door.",
    backFooter: "Sora fills this gap \u2192",
    frontBg: "bg-[#faf9ff]",
    frontBorder: "border-[#d9d0fb]",
    backBg: "bg-[#faf9ff]",
    backBorder: "border-[#d9d0fb]",
    iconBg: "bg-[#d9d0fb]",
    iconColor: "text-[#9740fe]",
  },
  {
    icon: Filter,
    title: "Wrong Type of Jobs",
    frontTeaser:
      "You're getting leads, but they're the wrong ones. Price shoppers, out-of-area, jobs that aren't worth quoting on.",
    backCopy:
      "Not all leads are equal. When your marketing isn't targeted, you waste hours quoting jobs you'd never win — or ones that aren't worth winning. Volume isn't the goal. The right jobs are.",
    backFooter: "Sora fills this gap \u2192",
    frontBg: "bg-[#d9d0fb]",
    frontBorder: "border-[#9740fe]/20",
    backBg: "bg-[#d9d0fb]",
    backBorder: "border-[#9740fe]/20",
    iconBg: "bg-[#9740fe]/20",
    iconColor: "text-[#222872]",
  },
  {
    icon: BarChart2,
    title: "Quiet Then Slammed",
    frontTeaser:
      "One month you're scrambling for work, the next you can't keep up. No consistency, no way to plan ahead.",
    backCopy:
      "The feast-or-famine cycle burns you out and makes it impossible to grow. Without a steady pipeline, you can't hire, can't plan, and can't scale — you're just reacting.",
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
    <section className="hidden md:block py-[100px]">
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

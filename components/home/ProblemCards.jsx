"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PhoneOff, DollarSign, CalendarCheck } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import FlipCard from "@/components/ui/FlipCard";

const cards = [
  {
    icon: PhoneOff,
    title: "Leads Going Cold",
    frontTeaser:
      "You're missing calls on the job and losing potential customers every day.",
    backCopy:
      "You're out on a job, the phone rings — but you can't answer. By the time you call back, they've already booked someone else. Every missed call is money walking out the door.",
    backFooter: "Sora fills this gap \u2192",
  },
  {
    icon: DollarSign,
    title: "Quoting Takes Forever",
    frontTeaser:
      "Hours spent writing quotes at night instead of spending time with family.",
    backCopy:
      "You finish a 10-hour day on site, then sit down at the kitchen table to write up quotes until midnight. Half of them never even get a reply. It's exhausting and unsustainable.",
    backFooter: "Sora fills this gap \u2192",
  },
  {
    icon: CalendarCheck,
    title: "Scheduling Chaos",
    frontTeaser:
      "Double-bookings, no-shows, and constant back-and-forth with customers.",
    backCopy:
      "Your calendar is a mess of scribbled notes and text messages. Customers don't confirm, jobs overlap, and you're driving across town between sites that should have been grouped together.",
    backFooter: "Sora fills this gap \u2192",
  },
];

// Unstack offsets for desktop: left, center, right
const unstackTargets = [
  { x: "-110%", rotate: 0 },
  { x: "0%", rotate: 0 },
  { x: "110%", rotate: 0 },
];

const stackedRotations = [-4, 0, 4];

export default function ProblemCards() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-[100px] bg-gradient-to-r from-[#2362fd]/10 to-[#fd6600]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        heading="Sound Familiar?"
        subheading="These are the problems we hear from tradies every single day. If any of this hits home, you're not alone — and there's a fix."
      />

      {/* Mobile: stagger fade-up grid */}
      <div ref={ref} className="mt-16 grid grid-cols-1 gap-6 lg:hidden">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: i * 0.1,
            }}
          >
            <FlipCard {...card} />
          </motion.div>
        ))}
      </div>

      {/* Desktop: unstack animation */}
      <DesktopUnstack />
      </div>
    </section>
  );
}

function DesktopUnstack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className="mt-16 hidden lg:block relative"
    >
      <div className="grid grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{
              x: `${-unstackTargets[i].x === "0%" ? "0%" : i === 0 ? "110%" : i === 2 ? "-110%" : "0%"}`,
              rotate: stackedRotations[i],
              opacity: 0,
            }}
            animate={
              isInView
                ? { x: "0%", rotate: 0, opacity: 1 }
                : {
                    x: i === 0 ? "110%" : i === 2 ? "-110%" : "0%",
                    rotate: stackedRotations[i],
                    opacity: 0,
                  }
            }
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
              delay: i * 0.15,
            }}
          >
            <FlipCard {...card} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

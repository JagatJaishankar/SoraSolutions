"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Globe,
  Search,
  Target,
  Megaphone,
  Database,
  Bot,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import TiltCard from "@/components/ui/TiltCard";

const services = [
  {
    icon: Globe,
    title: "Websites",
    description:
      "Not a digital brochure \u2014 a conversion engine. Custom-designed for your trade, optimised for Google, and built to turn visitors into booked jobs. Every Sora website comes with AI-powered chat built in.",
    badge: "Leads in 2-4 weeks",
    href: "/services#websites",
  },
  {
    icon: Search,
    title: "SEO",
    description:
      "Rank higher in Google Search and Maps so the right customers find you first. We build local authority through content, optimisation, and strategy that compounds over time.",
    badge: "Leads in 2-3 months",
    href: "/services#seo",
  },
  {
    icon: Target,
    title: "Google Ads",
    description:
      "Show up at the top of Google the day your campaign goes live. We build, manage, and optimise campaigns that bring in real enquiries \u2014 not just clicks and impressions.",
    badge: "Leads in 48 hours",
    href: "/services#google-ads",
  },
  {
    icon: Megaphone,
    title: "Facebook & Instagram Ads",
    description:
      "Get in front of local homeowners before they start Googling. Social ads build awareness and generate demand \u2014 so your pipeline stays full even in quiet months.",
    badge: "Leads in 1-2 weeks",
    href: "/services#social-ads",
  },
  {
    icon: Database,
    title: "CRM & Automation",
    description:
      "One place for every lead, every message, every follow-up. Automated sequences fire within 60 seconds of a new enquiry. Nothing slips through the cracks. Ever.",
    badge: "Instant impact",
    href: "/services#crm",
  },
  {
    icon: Bot,
    title: "AI Tools",
    description:
      "AI chatbot on your website. AI receptionist on your phone line. Automated review requests after every job. Smart follow-up that never sleeps. This is the edge your competitors don\u2019t have yet.",
    badge: "Instant impact",
    href: "/services#ai-tools",
  },
];

export default function ServicesGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-[100px]">
      <SectionHeading
        heading="Everything Your Trade Business Needs to Grow Online"
        subheading="Whether you need one thing done right or the full system working together \u2014 we tailor it to where your business is at and where you want it to go."
      />

      <div
        ref={ref}
        className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      >
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
              delay: i * 0.1,
            }}
          >
            <TiltCard href={service.href} className="h-full" accentLine>
              <ServiceCardContent {...service} />
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ServiceCardContent({ icon: Icon, title, description, badge }) {
  return (
    <div className="flex flex-col h-full p-8 [transform-style:preserve-3d]">
      <div className="will-change-transform [transform:translateZ(60px)]">
        <div className="w-12 h-12 rounded-xl bg-[#2362fd]/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-[#2362fd]" strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-bold tracking-tight text-black mt-4">
          {title}
        </h3>
      </div>

      <div className="will-change-transform [transform:translateZ(0px)] flex-1 flex flex-col mt-2">
        <p className="text-sm font-light tracking-wide text-black/60 leading-relaxed flex-grow">
          {description}
        </p>
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-xs bg-[#fd6600]/10 text-[#fd6600] font-semibold px-3 py-1 rounded-full">
            {badge}
          </span>
          <span className="text-sm text-[#2362fd] font-medium hover:underline">
            Learn more &rarr;
          </span>
        </div>
      </div>
    </div>
  );
}

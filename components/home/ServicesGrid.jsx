"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Globe,
  Search,
  Target,
  Brain,
  Database,
  Megaphone,
} from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";

const SERVICES = [
  {
    title: "Websites",
    subtitle:
      "Not a digital brochure \u2014 a conversion engine. Custom-designed for your trade, optimised for Google, and built to turn visitors into booked jobs.",
    icon: Globe,
    badge: "Leads in 2-4 weeks",
    href: "/services#websites",
    span: "md:col-span-7",
    wide: true,
  },
  {
    title: "SEO",
    subtitle:
      "Be the first name they find. Rank higher in Google Search and Maps so the right customers find you first.",
    icon: Search,
    badge: "Leads in 2-3 months",
    href: "/services#seo",
    span: "md:col-span-5",
  },
  {
    title: "Google Ads",
    subtitle:
      "Stop wasting money on ads that don\u2019t convert. We build campaigns that bring in real enquiries \u2014 not just clicks.",
    icon: Target,
    badge: "Leads in 48 hours",
    href: "/services#google-ads",
    span: "md:col-span-5",
  },
  {
    title: "AI & Automation Intelligence",
    subtitle:
      "AI operating systems for trade businesses. Not chatbots \u2014 custom agents across every department.",
    icon: Brain,
    badge: "Instant impact",
    href: "/services#ai",
    span: "md:col-span-7",
    wide: true,
    dark: true,
  },
  {
    title: "CRM & Automation",
    subtitle:
      "Every lead. Every follow-up. Every job. One place. Automated sequences fire within 60 seconds.",
    icon: Database,
    badge: "Instant impact",
    href: "/services#crm",
    span: "md:col-span-7",
    wide: true,
    lilac: true,
  },
  {
    title: "Facebook & Instagram Ads",
    subtitle:
      "Reach homeowners before they start searching. Fill your pipeline even in quiet months.",
    icon: Megaphone,
    badge: "Leads in 1-2 weeks",
    href: "/services#social-ads",
    span: "md:col-span-5",
  },
];

function WebsiteIllustration() {
  return (
    <div className="bg-[#090b3c] rounded-xl p-4 h-full flex flex-col justify-center gap-2">
      <div className="flex items-center gap-1.5 mb-2">
        <div className="w-2 h-2 rounded-full bg-white/20" />
        <div className="w-2 h-2 rounded-full bg-white/15" />
        <div className="w-2 h-2 rounded-full bg-white/10" />
        <div className="flex-1 h-3 bg-white/5 rounded ml-2 max-w-[80px]" />
      </div>
      <div className="h-2 bg-white/10 rounded-full w-3/4" />
      <div className="h-2 bg-white/10 rounded-full w-full" />
      <div className="h-2 bg-white/10 rounded-full w-1/2" />
      <div className="flex gap-2 mt-2">
        <div className="h-6 bg-[#9740fe]/30 rounded flex-1" />
        <div className="h-6 bg-white/5 rounded flex-1" />
      </div>
      <div className="flex gap-1 mt-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-[#F59E0B]/40" />
        ))}
      </div>
    </div>
  );
}

function AIIllustration() {
  return (
    <div className="h-full flex items-center justify-center">
      <svg width="140" height="100" viewBox="0 0 140 100" className="opacity-60">
        <circle cx="25" cy="25" r="5" fill="#9740fe" opacity="0.6" />
        <circle cx="70" cy="12" r="4" fill="#9740fe" opacity="0.4" />
        <circle cx="115" cy="35" r="6" fill="#9740fe" opacity="0.5">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="45" cy="60" r="4" fill="#9740fe" opacity="0.4" />
        <circle cx="95" cy="70" r="5" fill="#9740fe" opacity="0.6" />
        <circle cx="60" cy="88" r="3" fill="#9740fe" opacity="0.3" />
        <line x1="25" y1="25" x2="70" y2="12" stroke="#9740fe" strokeWidth="0.8" opacity="0.3" />
        <line x1="70" y1="12" x2="115" y2="35" stroke="#9740fe" strokeWidth="0.8" opacity="0.3" />
        <line x1="25" y1="25" x2="45" y2="60" stroke="#9740fe" strokeWidth="0.8" opacity="0.3" />
        <line x1="45" y1="60" x2="95" y2="70" stroke="#9740fe" strokeWidth="0.8" opacity="0.3" />
        <line x1="115" y1="35" x2="95" y2="70" stroke="#9740fe" strokeWidth="0.8" opacity="0.3" />
        <line x1="45" y1="60" x2="60" y2="88" stroke="#9740fe" strokeWidth="0.8" opacity="0.3" />
      </svg>
    </div>
  );
}

function CRMIllustration() {
  return (
    <div className="h-full flex flex-col justify-center gap-3 p-4">
      <div className="flex gap-2 items-end h-16">
        <div className="flex-1 bg-[#9740fe]/20 rounded-t" style={{ height: "40%" }} />
        <div className="flex-1 bg-[#9740fe]/20 rounded-t" style={{ height: "70%" }} />
        <div className="flex-1 bg-[#9740fe]/20 rounded-t" style={{ height: "55%" }} />
        <div className="flex-1 bg-[#9740fe]/20 rounded-t" style={{ height: "90%" }} />
        <div className="flex-1 bg-[#9740fe]/20 rounded-t" style={{ height: "65%" }} />
      </div>
      <div className="flex gap-2">
        <div className="flex-1 bg-white/40 rounded-lg p-2 text-center">
          <div className="text-sm font-bold text-[#9740fe]">127</div>
          <div className="text-[8px] text-black/40">Leads</div>
        </div>
        <div className="flex-1 bg-white/40 rounded-lg p-2 text-center">
          <div className="text-sm font-bold text-[#9740fe]">89%</div>
          <div className="text-[8px] text-black/40">Response</div>
        </div>
      </div>
    </div>
  );
}

function ServiceCardContent({ service }) {
  const Icon = service.icon;

  const bgClass = service.dark
    ? "bg-[#090b3c]"
    : service.lilac
    ? "bg-[#d9d0fb]"
    : "";
  const textColor = service.dark ? "text-white" : "text-black";
  const subtitleColor = service.dark
    ? "text-white/60"
    : service.lilac
    ? "text-black/70"
    : "text-black/60";
  const iconBg = service.dark
    ? "bg-white/10"
    : service.lilac
    ? "bg-white/60"
    : "bg-[#d9d0fb]";
  const iconColor = service.dark ? "text-[#d9d0fb]" : "text-[#9740fe]";
  const badgeBg = service.dark
    ? "bg-white/10"
    : service.lilac
    ? "bg-white/60"
    : "bg-[#d9d0fb]";
  const badgeText = service.dark ? "text-[#d9d0fb]" : "text-[#9740fe]";
  const linkColor = service.dark ? "text-[#d9d0fb]" : "text-[#9740fe]";

  const Illustration =
    service.title === "Websites"
      ? WebsiteIllustration
      : service.title === "AI & Automation Intelligence"
      ? AIIllustration
      : service.title === "CRM & Automation"
      ? CRMIllustration
      : null;

  if (service.wide && Illustration) {
    return (
      <div className={`flex flex-col md:flex-row h-full ${bgClass} rounded-2xl overflow-hidden`}>
        {/* Text side */}
        <div className="flex-1 p-6 md:p-10 flex flex-col">
          <div className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center mb-4`}>
            <Icon className={iconColor} size={28} />
          </div>
          <h3 className={`text-xl font-bold tracking-tight ${textColor} mb-2`}>
            {service.title}
          </h3>
          <p className={`text-sm font-light tracking-wide ${subtitleColor} mb-4 leading-relaxed flex-grow`}>
            {service.subtitle}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className={`${badgeBg} ${badgeText} text-xs font-semibold px-3 py-1.5 rounded-full`}>
              {service.badge}
            </span>
            <span className={`${linkColor} text-sm font-medium hover:underline`}>
              Learn more &rarr;
            </span>
          </div>
        </div>
        {/* Illustration side */}
        <div className="flex-1 hidden md:block min-h-[200px]">
          <Illustration />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full p-6 md:p-10 ${bgClass} rounded-2xl`}>
      <div className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center mb-4`}>
        <Icon className={iconColor} size={28} />
      </div>
      <h3 className={`text-xl font-bold tracking-tight ${textColor} mb-2`}>
        {service.title}
      </h3>
      <p className={`text-sm font-light tracking-wide ${subtitleColor} mb-4 leading-relaxed flex-grow`}>
        {service.subtitle}
      </p>
      <div className="flex items-center justify-between mt-auto">
        <span className={`${badgeBg} ${badgeText} text-xs font-semibold px-3 py-1.5 rounded-full`}>
          {service.badge}
        </span>
        <span className={`${linkColor} text-sm font-medium hover:underline`}>
          Learn more &rarr;
        </span>
      </div>
    </div>
  );
}

export default function ServicesGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-[100px] px-4 sm:px-6 lg:px-8 bg-bluewhite section-shadow">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-extrabold tracking-tight text-black">
            Everything Your Trade Business Needs to Grow Online
          </h2>
          <p className="mt-4 text-lg font-light tracking-wide text-black/60 max-w-2xl mx-auto">
            Whether you need one thing done right or the full system working
            together.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.title}
              className={service.span}
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{
                delay: index * 0.1,
                duration: 0.5,
                ease: "easeOut",
              }}
            >
              <TiltCard
                href={service.href}
                className="h-full"
                accentLine={!service.dark && !service.lilac}
              >
                <ServiceCardContent service={service} />
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

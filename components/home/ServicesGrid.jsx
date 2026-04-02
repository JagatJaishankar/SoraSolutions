"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Target, Brain, Database } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";

const SERVICES = [
  {
    title: "Websites & SEO",
    description: "Custom trade websites + local SEO + Google Business Profile. A website that ranks and converts — not just a digital brochure.",
    icon: Globe,
    badge: "Get found + convert",
    href: "/services#websites",
    span: "md:col-span-7",
    wide: true,
  },
  {
    title: "Pipeline & Follow-Up",
    description: "GoHighLevel setup, automated follow-ups, missed call text-back, booking systems, pipeline management. Every lead tracked. Every follow-up automated.",
    icon: Database,
    badge: "Instant impact",
    href: "/services#crm",
    span: "md:col-span-5",
    lilac: true,
  },
  {
    title: "Marketing Campaigns",
    description: "Google Ads, Meta Ads, review generation, past client reactivation offers, loyalty/reward systems. Targeted campaigns that bring the right customers to your door.",
    icon: Target,
    badge: "Leads in 48 hours",
    href: "/services#google-ads",
    span: "md:col-span-5",
  },
  {
    title: "AI & Automation",
    description: "Intelligent systems for follow-ups, bookings, missed calls, quoting reminders. Smart systems that handle the stuff you don't have time for.",
    icon: Brain,
    badge: "Instant impact",
    href: "/services#ai",
    span: "md:col-span-7",
    wide: true,
    dark: true,
  },
];

function WebsiteSEOIllustration() {
  return (
    <div className="h-full flex flex-col gap-3 p-4 justify-center">
      {/* Browser / website mockup */}
      <div className="bg-[#090b3c] rounded-xl p-3">
        <div className="flex items-center gap-1.5 mb-2.5">
          <div className="w-2 h-2 rounded-full bg-white/20" />
          <div className="w-2 h-2 rounded-full bg-white/15" />
          <div className="w-2 h-2 rounded-full bg-white/10" />
          <div className="flex-1 h-2.5 bg-white/5 rounded ml-2" />
        </div>
        <div className="h-1.5 bg-white/15 rounded-full w-3/4 mb-1.5" />
        <div className="h-1.5 bg-white/10 rounded-full w-full mb-1.5" />
        <div className="h-1.5 bg-white/10 rounded-full w-2/3 mb-3" />
        <div className="flex gap-2">
          <div className="h-7 bg-[#9740fe]/40 rounded-lg flex-1 flex items-center justify-center">
            <div className="h-1.5 bg-white/40 rounded-full w-2/3" />
          </div>
          <div className="h-7 bg-white/5 rounded-lg w-16" />
        </div>
      </div>

      {/* Google Maps 3-pack */}
      <div className="bg-white/70 rounded-xl p-3">
        <div className="text-[7px] font-semibold tracking-widest uppercase text-black/30 mb-2">
          Google Maps
        </div>
        {[
          { name: "Your Business", stars: true },
          { name: "Competitor A", stars: false },
          { name: "Competitor B", stars: false },
        ].map((item, i) => (
          <div
            key={i}
            className={`flex items-center gap-2 rounded-lg px-2 py-1.5 mb-1 ${
              i === 0 ? "bg-[#9740fe]/10" : ""
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center text-[8px] font-bold ${
                i === 0
                  ? "bg-[#9740fe] text-white"
                  : "bg-black/10 text-black/30"
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`text-[9px] font-medium flex-1 truncate ${
                i === 0 ? "text-[#9740fe]" : "text-black/30"
              }`}
            >
              {item.name}
            </span>
            {item.stars && (
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <div
                    key={j}
                    className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]/70"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AIAutomationIllustration() {
  return (
    <div className="h-full flex items-center justify-center">
      <svg width="180" height="150" viewBox="0 0 180 150" className="opacity-75">
        {/* Dashed connection lines */}
        <line x1="90" y1="75" x2="28" y2="30" stroke="#9740fe" strokeWidth="1" opacity="0.35" strokeDasharray="4 3" />
        <line x1="90" y1="75" x2="152" y2="30" stroke="#9740fe" strokeWidth="1" opacity="0.35" strokeDasharray="4 3" />
        <line x1="90" y1="75" x2="28" y2="118" stroke="#9740fe" strokeWidth="1" opacity="0.35" strokeDasharray="4 3" />
        <line x1="90" y1="75" x2="152" y2="118" stroke="#9740fe" strokeWidth="1" opacity="0.35" strokeDasharray="4 3" />

        {/* Central pulsing node */}
        <circle cx="90" cy="75" r="16" fill="#9740fe" opacity="0.12" />
        <circle cx="90" cy="75" r="9" fill="#9740fe" opacity="0.55">
          <animate attributeName="r" values="9;12;9" dur="2.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.55;0.85;0.55" dur="2.2s" repeatCount="indefinite" />
        </circle>

        {/* Top-left — Follow-up */}
        <rect x="8" y="10" width="40" height="40" rx="10" fill="#9740fe" opacity="0.12" />
        <circle cx="28" cy="30" r="5" fill="#9740fe" opacity="0.55" />
        <text x="28" y="58" textAnchor="middle" fill="#9740fe" opacity="0.55" fontSize="7.5" fontFamily="sans-serif">Follow-up</text>

        {/* Top-right — Booking */}
        <rect x="132" y="10" width="40" height="40" rx="10" fill="#9740fe" opacity="0.12" />
        <circle cx="152" cy="30" r="5" fill="#9740fe" opacity="0.55" />
        <text x="152" y="58" textAnchor="middle" fill="#9740fe" opacity="0.55" fontSize="7.5" fontFamily="sans-serif">Booking</text>

        {/* Bottom-left — Missed Call */}
        <rect x="8" y="98" width="40" height="40" rx="10" fill="#9740fe" opacity="0.12" />
        <circle cx="28" cy="118" r="5" fill="#9740fe" opacity="0.55" />
        <text x="28" y="146" textAnchor="middle" fill="#9740fe" opacity="0.55" fontSize="7.5" fontFamily="sans-serif">Missed Call</text>

        {/* Bottom-right — Quoting */}
        <rect x="132" y="98" width="40" height="40" rx="10" fill="#9740fe" opacity="0.12" />
        <circle cx="152" cy="118" r="5" fill="#9740fe" opacity="0.55" />
        <text x="152" y="146" textAnchor="middle" fill="#9740fe" opacity="0.55" fontSize="7.5" fontFamily="sans-serif">Quoting</text>
      </svg>
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
  const taglineColor = service.dark
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
    service.title === "Websites & SEO"
      ? WebsiteSEOIllustration
      : service.title === "AI & Automation"
      ? AIAutomationIllustration
      : null;

  const textSide = (
    <div className="flex-1 p-6 md:p-10 flex flex-col">
      <div
        className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center mb-4`}
      >
        <Icon className={iconColor} size={28} />
      </div>
      <h3 className={`text-2xl font-bold tracking-tight ${textColor} mb-3`}>
        {service.title}
      </h3>
      <p
        className={`text-sm font-light tracking-wide ${taglineColor} mb-4 leading-relaxed flex-grow`}
      >
        {service.description}
      </p>
      <div className="flex items-center justify-between mt-auto">
        <span
          className={`${badgeBg} ${badgeText} text-xs font-semibold px-3 py-1.5 rounded-full`}
        >
          {service.badge}
        </span>
        <span className={`${linkColor} text-sm font-medium hover:underline`}>
          Learn more &rarr;
        </span>
      </div>
    </div>
  );

  if (service.wide && Illustration) {
    return (
      <div
        className={`flex flex-col md:flex-row h-full ${bgClass} rounded-2xl overflow-hidden`}
      >
        {textSide}
        <div className="flex-1 hidden md:block min-h-[200px]">
          <Illustration />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full p-6 md:p-10 ${bgClass} rounded-2xl`}>
      <div
        className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center mb-4`}
      >
        <Icon className={iconColor} size={28} />
      </div>
      <h3 className={`text-2xl font-bold tracking-tight ${textColor} mb-3`}>
        {service.title}
      </h3>
      <p
        className={`text-sm font-light tracking-wide ${taglineColor} mb-4 leading-relaxed flex-grow`}
      >
        {service.description}
      </p>
      <div className="flex items-center justify-between mt-auto">
        <span
          className={`${badgeBg} ${badgeText} text-xs font-semibold px-3 py-1.5 rounded-full`}
        >
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

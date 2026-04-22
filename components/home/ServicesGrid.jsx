"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Target, Brain, Database } from "lucide-react";
import Image from "next/image";
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
    image: "/images/home-page/website-and-seo.webp",
  },
  {
    title: "Pipeline & Follow-Up",
    description: "GoHighLevel setup, automated follow-ups, missed call text-back, booking systems, pipeline management. Every lead tracked. Every follow-up automated.",
    icon: Database,
    badge: "Instant impact",
    href: "/services#crm",
    span: "md:col-span-5",
    lilac: true,
    image: "/images/home-page/pipeline.webp",
  },
  {
    title: "Marketing Campaigns",
    description: "Google Ads, Meta Ads, review generation, past client reactivation offers, loyalty/reward systems. Targeted campaigns that bring the right customers to your door.",
    icon: Target,
    badge: "Leads in 48 hours",
    href: "/services#google-ads",
    span: "md:col-span-5",
    image: "/images/home-page/marketing-campaign.webp",
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
    image: "/images/home-page/ai-service.webp",
  },
];

function WideCardImage({ src, alt, mobileHeight = "h-44" }) {
  return (
    <div className="order-first md:order-none md:flex-1">
      {/* Mobile: centered with padding */}
      <div className="px-8 pt-6 pb-2 md:hidden">
        <div className={`relative ${mobileHeight}`}>
          <Image src={src} alt={alt} fill className="object-contain" sizes="(max-width: 768px) 80vw, 0vw" />
        </div>
      </div>
      {/* Desktop: full bleed */}
      <div className="hidden md:block relative h-full min-h-[240px]">
        <Image src={src} alt={alt} fill className="object-contain object-[right_55%]" sizes="(min-width: 768px) 50vw, 0vw" />
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

  const textSide = (
    <div className="flex-1 p-6 md:p-10 flex flex-col">
      <div className={`w-14 h-14 rounded-2xl ${iconBg} hidden md:flex items-center justify-center mb-4`}>
        <Icon className={iconColor} size={28} />
      </div>
      <h3 className={`text-2xl font-bold tracking-tight ${textColor} mb-3`}>
        {service.title}
      </h3>
      <p className={`text-sm font-light tracking-wide ${taglineColor} mb-4 leading-relaxed flex-grow`}>
        {service.description}
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

  if (service.title === "Websites & SEO") {
    return (
      <div className="flex flex-col md:flex-row h-full rounded-2xl overflow-hidden">
        {textSide}
        <WideCardImage src={service.image} alt="Websites & SEO" mobileHeight="h-40" />
      </div>
    );
  }

  if (service.title === "AI & Automation") {
    return (
      <div className={`flex flex-col md:flex-row h-full ${bgClass} rounded-2xl overflow-hidden`}>
        {textSide}
        <WideCardImage src={service.image} alt="AI & Automation" mobileHeight="h-72" />
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full ${bgClass} rounded-2xl overflow-hidden`}>
      {/* Mobile: image at top, centered with padding */}
      <div className="px-8 pt-6 pb-2 md:hidden">
        <div className="relative h-64">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 80vw, 0vw"
          />
        </div>
      </div>
      <div className="flex flex-col flex-grow p-6 md:p-10">
        {/* Icon: desktop only */}
        <div className={`w-14 h-14 rounded-2xl ${iconBg} hidden md:flex items-center justify-center mb-4`}>
          <Icon className={iconColor} size={28} />
        </div>
        <h3 className={`text-2xl font-bold tracking-tight ${textColor} mb-3`}>
          {service.title}
        </h3>
        <p className={`text-sm font-light tracking-wide ${taglineColor} mb-4 leading-relaxed flex-grow`}>
          {service.description}
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
      {/* Desktop: image at bottom */}
      <div className="relative h-44 overflow-hidden hidden md:block">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-contain object-bottom"
        />
      </div>
    </div>
  );
}

export default function ServicesGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-[100px] px-4 sm:px-6 lg:px-8">
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

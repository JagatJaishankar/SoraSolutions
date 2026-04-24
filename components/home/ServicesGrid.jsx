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
    href: "/services#websites",
    span: "md:col-span-8",
    lilac: true,
    image: "/images/home-page/service-cards/service-website.webp",
  },
  {
    title: "Marketing Campaigns",
    description: "Google Ads, Meta Ads, review generation, past client reactivation offers, loyalty/reward systems. Targeted campaigns that bring the right customers to your door.",
    icon: Target,
    href: "/services#google-ads",
    span: "md:col-span-4",
    image: "/images/home-page/service-cards/service-campaigns.webp",
    mobileScale: "scale-[1.3]",
    mobileHeight: "h-72",
  },
  {
    title: "AI & Automation",
    description: "Intelligent systems for follow-ups, bookings, missed calls, quoting reminders. Smart systems that handle the stuff you don't have time for.",
    icon: Brain,
    href: "/services#ai",
    span: "md:col-span-4",
    image: "/images/home-page/service-cards/service-automation.webp",
    mobileScale: "scale-[1.3]",
    mobileHeight: "h-72",
  },
  {
    title: "Pipeline & Follow-Up",
    description: "GoHighLevel setup, automated follow-ups, missed call text-back, booking systems, pipeline management. Every lead tracked. Every follow-up automated.",
    icon: Database,
    href: "/services#crm",
    span: "md:col-span-8",
    lilac: true,
    image: "/images/home-page/service-cards/service-pipeline.webp",
  },
];

function WideCardImage({ src, alt, paddingClass = "p-5", scaleClass = "scale-100" }) {
  return (
    <div className="hidden md:block md:flex-[1.2]">
      <div className="relative h-full min-h-[280px]">
        <Image src={src} alt={alt} fill className={`object-contain ${paddingClass} ${scaleClass}`} sizes="(min-width: 768px) 50vw, 0vw" />
      </div>
    </div>
  );
}

function ServiceCardContent({ service }) {
  const isLilac = service.lilac;
  const bgClass = isLilac ? "md:bg-[#d9d0fb]" : "";
  const textColor = "text-black";
  const taglineColor = isLilac ? "text-black/70" : "text-black/60";
  const badgeBg = isLilac ? "bg-white/60" : "bg-[#d9d0fb]";
  const badgeText = "text-[#9740fe]";

  const textSide = (
    <div className="flex-1 p-6 md:p-10 flex flex-col">
      <h3 className={`text-2xl font-bold tracking-tight ${textColor} mb-3`}>
        {service.title}
      </h3>
      <p className={`text-sm font-light tracking-wide ${taglineColor} mb-4 leading-relaxed flex-grow`}>
        {service.description}
      </p>
      <div className="mt-auto">
        <span className={`${badgeBg} ${badgeText} text-xs font-semibold px-3 py-1.5 rounded-full inline-block`}>
          Learn More &rarr;
        </span>
      </div>
    </div>
  );

  const isWide = service.span === "md:col-span-8";

  return (
    <div className={`flex flex-col ${isWide ? "md:flex-row" : ""} h-full ${bgClass} rounded-2xl overflow-hidden`}>
      {/* Mobile image — all cards */}
      <div className={`md:hidden ${service.title === "Websites & SEO" ? "" : "pt-4"}`}>
        <div className="relative h-48 w-full">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className={`object-contain ${service.title === "Websites & SEO" ? "object-left" : ""}`}
            sizes="100vw"
          />
        </div>
      </div>
      {textSide}
      {isWide && (
        <WideCardImage
          src={service.image}
          alt={service.title}
          paddingClass={
            service.title === "Websites & SEO"
              ? "pt-16 pb-2 px-5"
              : service.title === "Pipeline & Follow-Up"
              ? "pr-16 pl-2 py-5"
              : "p-5"
          }
          scaleClass={
            service.title === "Websites & SEO"
              ? "scale-[1.2]"
              : "scale-100"
          }
        />
      )}
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
                accentLine={!service.lilac}
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

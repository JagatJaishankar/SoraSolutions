"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const COLUMNS = [
  {
    heading: "Get Found Online",
    items: [
      {
        emoji: "🌐",
        title: "Websites",
        subtitle: "High-converting sites built for your trade",
        badge: "Leads in 2-4 weeks",
        href: "/services#websites",
      },
      {
        emoji: "🔍",
        title: "SEO",
        subtitle: "Get found first on Google Search and Maps",
        badge: "Leads in 2-3 months",
        href: "/services#seo",
      },
    ],
  },
  {
    heading: "Get More Leads",
    items: [
      {
        emoji: "🎯",
        title: "Google Ads",
        subtitle: "Targeted ads that fill your schedule",
        badge: "Leads in 48 hours",
        href: "/services#google-ads",
      },
      {
        emoji: "📱",
        title: "Facebook & Instagram Ads",
        subtitle: "Reach homeowners before they search",
        badge: "Leads in 1-2 weeks",
        href: "/services#social-ads",
      },
    ],
  },
  {
    heading: "Keep and Scale",
    items: [
      {
        emoji: "⚙️",
        title: "CRM & Automation",
        subtitle: "Every lead tracked, every follow-up automated",
        badge: "Instant impact",
        href: "/services#crm",
      },
      {
        emoji: "🤖",
        title: "AI Tools",
        subtitle: "Chatbots, voice AI, and smart automation",
        badge: "Instant impact",
        href: "/services#ai-tools",
      },
    ],
  },
];

export default function ServicesDropdown() {
  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[720px] bg-white border border-black/5 rounded-2xl shadow-xl p-6 z-50"
    >
      <div className="grid grid-cols-3 gap-6">
        {COLUMNS.map((col) => (
          <div key={col.heading}>
            <p className="text-xs font-semibold tracking-widest uppercase text-black/40 mb-3">
              {col.heading}
            </p>
            <div className="flex flex-col gap-2">
              {col.items.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group flex flex-col gap-1 rounded-xl p-3 transition-all duration-200 hover:bg-[#D9D1FB]/30 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{item.emoji}</span>
                    <span className="font-semibold text-sm text-black">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-sm text-black/60 leading-snug">
                    {item.subtitle}
                  </p>
                  <span className="mt-1 inline-block self-start text-xs font-medium text-[#9741FE] bg-[#9741FE]/10 rounded-full px-2 py-0.5">
                    {item.badge}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

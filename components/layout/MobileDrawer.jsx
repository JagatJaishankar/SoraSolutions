"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

const SERVICE_COLUMNS = [
  {
    heading: "Get Found Online",
    items: [
      { emoji: "🌐", title: "Websites", subtitle: "High-converting sites built for your trade", badge: "Leads in 2-4 weeks", href: "/services#websites" },
      { emoji: "🔍", title: "SEO", subtitle: "Get found first on Google Search and Maps", badge: "Leads in 2-3 months", href: "/services#seo" },
    ],
  },
  {
    heading: "Get More Leads",
    items: [
      { emoji: "🎯", title: "Google Ads", subtitle: "Targeted ads that fill your schedule", badge: "Leads in 48 hours", href: "/services#google-ads" },
      { emoji: "📱", title: "Facebook & Instagram Ads", subtitle: "Reach homeowners before they search", badge: "Leads in 1-2 weeks", href: "/services#social-ads" },
    ],
  },
  {
    heading: "Keep and Scale",
    items: [
      { emoji: "⚙️", title: "CRM & Automation", subtitle: "Every lead tracked, every follow-up automated", badge: "Instant impact", href: "/services#crm" },
      { emoji: "🤖", title: "AI Tools", subtitle: "Chatbots, voice AI, and smart automation", badge: "Instant impact", href: "/services#ai-tools" },
    ],
  },
];

const linkVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.1, duration: 0.3, ease: "easeOut" },
  }),
  exit: { y: 20, opacity: 0, transition: { duration: 0.15 } },
};

export default function MobileDrawer({ isOpen, onClose, pathname }) {
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed inset-0 z-50 bg-white/80 backdrop-blur-2xl flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <Link href="/" onClick={onClose} className="bg-white/70 backdrop-blur-2xl border border-white/20 rounded-full px-5 h-12 flex items-center">
              <span className="text-lg font-extrabold tracking-tight text-black">SORA</span>
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="bg-white/70 backdrop-blur-2xl border border-white/20 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer"
              aria-label="Close menu"
            >
              <div className="relative w-5 h-5">
                <motion.span
                  animate={{ rotate: 45, y: 0 }}
                  className="absolute top-1/2 left-0 w-5 h-0.5 bg-black -translate-y-1/2"
                />
                <motion.span
                  animate={{ rotate: -45, y: 0 }}
                  className="absolute top-1/2 left-0 w-5 h-0.5 bg-black -translate-y-1/2"
                />
              </div>
            </button>
          </div>

          {/* Scrollable links */}
          <nav className="flex-1 overflow-y-auto px-6 pt-8 pb-4">
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  custom={i}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {link.hasDropdown ? (
                    <div>
                      <button
                        type="button"
                        onClick={() => setServicesOpen(!servicesOpen)}
                        className="w-full flex items-center justify-between py-4 cursor-pointer"
                      >
                        <span className={`text-2xl font-bold ${pathname === "/services" ? "text-black" : "text-black/70"}`}>
                          {link.label}
                        </span>
                        <motion.span
                          animate={{ rotate: servicesOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-5 h-5 text-black/40" />
                        </motion.span>
                      </button>
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-6 pl-2 pb-4">
                              {SERVICE_COLUMNS.map((col) => (
                                <div key={col.heading}>
                                  <p className="text-xs font-semibold tracking-widest uppercase text-black/40 mb-2">
                                    {col.heading}
                                  </p>
                                  <div className="flex flex-col gap-2">
                                    {col.items.map((item) => (
                                      <Link
                                        key={item.title}
                                        href={item.href}
                                        onClick={onClose}
                                        className="flex flex-col gap-1 rounded-xl p-3 transition-colors duration-200 active:bg-[#D9D1FB]/30"
                                      >
                                        <div className="flex items-center gap-2">
                                          <span className="text-base">{item.emoji}</span>
                                          <span className="font-semibold text-sm text-black">{item.title}</span>
                                        </div>
                                        <p className="text-sm text-black/60">{item.subtitle}</p>
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
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={`block py-4 text-2xl font-bold ${pathname === link.href ? "text-black" : "text-black/70"}`}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </nav>

          {/* Fixed bottom CTAs */}
          <div className="shrink-0 border-t border-black/10 px-6 py-5 bg-white/60 backdrop-blur-xl">
            <div className="flex flex-col gap-3">
              <a
                href="tel:+61409422868"
                className="text-center text-sm font-medium text-black/70"
              >
                +61 409 422 868
              </a>
              <Link
                href="/contact"
                onClick={onClose}
                className="block text-center bg-[#9741FE] text-white font-semibold text-sm px-6 py-3 rounded-full"
              >
                Book a Free Strategy Call
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

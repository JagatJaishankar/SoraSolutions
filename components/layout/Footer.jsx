"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Instagram, Facebook, Linkedin } from "lucide-react";

const services = [
  { label: "Websites", href: "/services" },
  { label: "SEO", href: "/services" },
  { label: "Google Ads", href: "/services" },
  { label: "Facebook & Instagram Ads", href: "/services" },
  { label: "CRM & Automation", href: "/services" },
  { label: "AI Tools", href: "/services" },
];

const company = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

const resources = [
  { label: "The Tradie's Growth Guide", href: "/resources" },
  { label: "AI Readiness Quiz", href: "/resources" },
  { label: "Blog", href: "/resources" },
];

const socials = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

function FooterLink({ href, children }) {
  return (
    <a
      href={href}
      className="group relative text-sm text-white/50 hover:text-accent transition-colors duration-200 w-fit"
    >
      {children}
      <span className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
    </a>
  );
}

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer className="bg-deep">
      {/* Top gradient accent line */}
      <div className="h-[2px] bg-gradient-to-r from-primary to-secondary" />

      <motion.div
        ref={ref}
        className="pt-[80px] pb-[40px]"
        initial={{ y: 30, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 4-column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Column 1 — Brand */}
            <div>
              <img src="/images/sora-logo.png" alt="Sora Solutions" className="h-10 w-auto object-contain brightness-0 invert" />
              <p className="text-sm text-white/50 mt-2">
                Marketing, AI & Growth Systems for Trades
              </p>
              <div className="flex flex-col gap-1.5 mt-4">
                <a
                  href="mailto:hello@sorasolution.com"
                  className="text-sm text-white/60 hover:text-accent transition-colors duration-200"
                >
                  hello@sorasolution.com
                </a>
                <a
                  href="tel:+61409422868"
                  className="text-sm text-white/60 hover:text-accent transition-colors duration-200"
                >
                  +61 409 422 868
                </a>
                <span className="text-sm text-white/40">
                  New South Wales, Australia
                </span>
              </div>
              <div className="flex gap-4 mt-4">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="text-white/50 hover:text-primary transition-colors duration-200"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2 — Services */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">
                Services
              </h4>
              <div className="flex flex-col gap-2">
                {services.map((link) => (
                  <FooterLink key={link.label} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </div>
            </div>

            {/* Column 3 — Company */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">
                Company
              </h4>
              <div className="flex flex-col gap-2">
                {company.map((link) => (
                  <FooterLink key={link.label} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </div>
            </div>

            {/* Column 4 — Free Resources */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">
                Free Resources
              </h4>
              <div className="flex flex-col gap-2">
                {resources.map((link) => (
                  <FooterLink key={link.label} href={link.href}>
                    {link.label}
                  </FooterLink>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-xs text-white/30">
              &copy; 2026 Sora Business Solutions Pty Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-white/40">
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

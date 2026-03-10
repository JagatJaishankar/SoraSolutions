"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ServicesDropdown from "./ServicesDropdown";
import MobileDrawer from "./MobileDrawer";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "About", href: "/about" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const servicesRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleServicesEnter = () => {
    clearTimeout(timeoutRef.current);
    setServicesOpen(true);
  };

  const handleServicesLeave = () => {
    timeoutRef.current = setTimeout(() => setServicesOpen(false), 150);
  };

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className="sticky top-0 z-50 pt-4 px-4 sm:px-6 lg:px-8 pointer-events-none"
      >
        <div className="max-w-7xl mx-auto">
          {/* Desktop */}
          <div className="hidden lg:flex items-center relative h-14">
            {/* Left pill — Logo */}
            <div className={`pointer-events-auto bg-white/70 backdrop-blur-2xl border border-white/20 rounded-full px-5 h-12 flex items-center transition-shadow duration-300 ${scrolled ? "shadow-lg" : ""}`}>
              <Link href="/" className="text-lg font-extrabold tracking-tight text-black">
                SORA
              </Link>
            </div>

            {/* Center pill — Nav links (absolutely centered) */}
            <div className={`pointer-events-auto absolute left-1/2 -translate-x-1/2 bg-white/70 backdrop-blur-2xl border border-white/20 rounded-full px-2 h-12 flex items-center transition-shadow duration-300 ${scrolled ? "shadow-lg" : ""}`}>
              <div className="flex items-center gap-1">
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.href);

                  if (link.hasDropdown) {
                    return (
                      <div
                        key={link.label}
                        ref={servicesRef}
                        className="relative"
                        onMouseEnter={handleServicesEnter}
                        onMouseLeave={handleServicesLeave}
                      >
                        <Link
                          href={link.href}
                          className={`flex items-center gap-1 text-sm font-medium px-3 py-1.5 rounded-full transition-colors duration-200 ${
                            active
                              ? "text-black bg-[#D9D1FB]"
                              : "text-black/70 hover:text-black"
                          }`}
                        >
                          <span className="relative">
                            {link.label}
                            {active && (
                              <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#9741FE]" />
                            )}
                          </span>
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                        </Link>
                        <AnimatePresence>
                          {servicesOpen && <ServicesDropdown />}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={`text-sm font-medium px-3 py-1.5 rounded-full transition-colors duration-200 ${
                        active
                          ? "text-black bg-[#D9D1FB]"
                          : "text-black/70 hover:text-black"
                      }`}
                    >
                      <span className="relative">
                        {link.label}
                        {active && (
                          <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#9741FE]" />
                        )}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right pill — Phone + CTA */}
            <div className={`pointer-events-auto ml-auto bg-white/70 backdrop-blur-2xl border border-white/20 rounded-full px-2 h-12 flex items-center gap-3 transition-shadow duration-300 ${scrolled ? "shadow-lg" : ""}`}>
              <a
                href="tel:+61409422868"
                className="text-sm font-medium text-black/70 hover:text-black transition-colors duration-200 pl-3"
              >
                +61 409 422 868
              </a>
              <span className="text-black/20">|</span>
              <Link
                href="/contact"
                className="bg-[#9741FE] text-white font-semibold text-sm px-4 py-2 rounded-full transition-transform duration-200 hover:scale-[1.02]"
              >
                Book a Free Strategy Call
              </Link>
            </div>
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden items-center justify-between h-14">
            {/* Left pill — Logo */}
            <Link
              href="/"
              className={`pointer-events-auto bg-white/70 backdrop-blur-2xl border border-white/20 rounded-full px-5 h-12 flex items-center transition-shadow duration-300 ${scrolled ? "shadow-lg" : ""}`}
            >
              <span className="text-lg font-extrabold tracking-tight text-black">SORA</span>
            </Link>

            {/* Right pill — Hamburger */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className={`pointer-events-auto bg-white/70 backdrop-blur-2xl border border-white/20 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer transition-shadow duration-300 ${scrolled ? "shadow-lg" : ""}`}
              aria-label="Open menu"
            >
              <div className="flex flex-col gap-1.5">
                <span className="block w-5 h-0.5 bg-black" />
                <span className="block w-5 h-0.5 bg-black" />
                <span className="block w-5 h-0.5 bg-black" />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        pathname={pathname}
      />
    </>
  );
}

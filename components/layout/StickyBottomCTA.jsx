"use client";

import { Phone } from "lucide-react";

export default function StickyBottomCTA() {
  return (
    <a
      href="tel:+61409422868"
      aria-label="Call Sora"
      className="fixed bottom-6 right-6 z-50 lg:hidden w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 active:scale-95 transition-transform duration-150"
    >
      <Phone className="w-6 h-6" />
    </a>
  );
}

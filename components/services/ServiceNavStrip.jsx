"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TABS = [
  { id: "websites", label: "Websites" },
  { id: "seo", label: "SEO" },
  { id: "crm", label: "Pipeline & Follow-Up" },
  { id: "ai", label: "AI Operating System" },
  { id: "google-ads", label: "Google Ads" },
  { id: "social-ads", label: "Social Ads" },
];

export default function ServiceNavStrip() {
  const [activeId, setActiveId] = useState("websites");
  const [visible, setVisible] = useState(false);
  const scrollRef = useRef(null);
  const buttonRefs = useRef({});

  const scrollPillToActive = useCallback((id) => {
    const btn = buttonRefs.current[id];
    const container = scrollRef.current;
    if (!btn || !container) return;

    const btnRect = btn.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const offset =
      btnRect.left -
      containerRect.left -
      containerRect.width / 2 +
      btnRect.width / 2;

    container.scrollBy({ left: offset, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const sectionIds = TABS.map((t) => t.id);
    const visibleSections = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry.boundingClientRect.top);
          } else {
            visibleSections.delete(entry.target.id);
          }
        }

        setVisible(visibleSections.size > 0);

        let bestId = null;
        let bestTop = Infinity;
        for (const [id, top] of visibleSections) {
          const absTop = Math.abs(top);
          if (absTop < bestTop) {
            bestTop = absTop;
            bestId = id;
          }
        }

        if (bestId) {
          setActiveId((prev) => {
            if (prev !== bestId) {
              scrollPillToActive(bestId);
            }
            return bestId;
          });
        }
      },
      { threshold: [0, 0.1, 0.2], rootMargin: "-100px 0px -30% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [scrollPillToActive]);

  const handleClick = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="service-nav"
          className="sticky top-[80px] z-40 flex justify-center px-4 py-2 pointer-events-none"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div
            ref={scrollRef}
            className="pointer-events-auto inline-flex items-center gap-1 bg-white/80 backdrop-blur-xl border border-white/20 rounded-full px-2 py-2 shadow-sm overflow-x-auto scrollbar-hide flex-nowrap max-w-[calc(100vw-32px)]"
          >
            {TABS.map((tab) => (
              <button
                key={tab.id}
                ref={(el) => (buttonRefs.current[tab.id] = el)}
                type="button"
                onClick={() => handleClick(tab.id)}
                className={`flex-shrink-0 text-sm font-medium px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  activeId === tab.id
                    ? "bg-primary text-white shadow-md"
                    : "text-black/50 hover:text-black hover:bg-[#faf9ff]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

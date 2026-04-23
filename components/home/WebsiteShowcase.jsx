"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Image from "next/image";

const SLIDES = [
  {
    feature: "Gym & Fitness",
    name: "Premium Gym Websites That Drive Memberships",
    desc: "Membership tiers, class schedules, recovery suite showcases — every element designed to turn a casual visitor into a signed-up member.",
    img: "/carousel/00-gym-basin.webp",
    url: "https://basin-gym-reorder.vercel.app/",
  },
  {
    feature: "Beauty & Aesthetics",
    name: "Aesthetic Clinics That Attract High-Value Clients",
    desc: "Luxury design, practitioner credentials, treatment galleries, and Afterpay integration — everything a premium cosmetic client needs to book with confidence.",
    img: "/carousel/00-mirror-mirror.webp",
    url: "https://mirror-mirror-aesthetics.vercel.app/",
  },
  {
    feature: "Building & Carpentry",
    name: "Builders Who Look Like Pros Before They Arrive",
    desc: "Fixed-price quotes, licensed credentials, project galleries, and a strong local presence — built to win residential jobs before the competition even calls back.",
    img: "/carousel/00-virtue-building.webp",
    url: "https://virtue-building-v2.vercel.app/",
  },
  {
    feature: "Electrical Contracting",
    name: "Electricians Who Convert Online — Every Time",
    desc: "Clear service pages, lifetime warranty callouts, service area maps, and instant quote forms — turning search traffic into booked jobs around the clock.",
    img: "/carousel/00-conlec-demo.webp",
    url: "https://conlec-demo-site.vercel.app/",
  },
  {
    feature: "Civil & Haulage",
    name: "Haulage Businesses That Book Themselves",
    desc: "Online availability checkers, transparent pricing, compliance credentials, and same-day booking — so your truck is never sitting idle.",
    img: "/carousel/00-la-tippers.webp",
    url: "https://la-tippers-demo.vercel.app/",
  },
  {
    feature: "Property Maintenance",
    name: "Property Services That Look the Part",
    desc: "Before/after galleries, service area coverage, owner-operated trust signals, and free quote CTAs — everything a homeowner needs to pick up the phone.",
    img: "/carousel/00-godfreys-gutter.webp",
    url: "https://godfreys-gutter-cleaning.vercel.app/",
  },
  {
    feature: "Coaching & Online Programs",
    name: "Coaching Businesses That Scale Without You",
    desc: "Tiered program showcases, founder credibility, community previews, and online booking — so your coaching business generates revenue even while you're training.",
    img: "/carousel/00-ablock-academy.webp",
    url: "https://ablock-academy.vercel.app/",
  },
  {
    feature: "AI Operations Platform",
    name: "Custom Proposals That Win Enterprise Clients",
    desc: "Bespoke pitch sites with live demos, AI agent breakdowns, and ROI calculators — tailored proposals that close complex deals without a single in-person meeting.",
    img: "/carousel/00-jl-monin-proposal.webp",
    url: "https://jl-monin-proposal.vercel.app/",
  },
];

const POSITIONS = [
  { tx: -540, tz: -190, ry: 52, s: 0.66, o: 0.2 },
  { tx: -300, tz: -90, ry: 40, s: 0.78, o: 0.58 },
  { tx: 0, tz: 0, ry: 0, s: 1.19, o: 1 },
  { tx: 300, tz: -90, ry: -40, s: 0.78, o: 0.58 },
  { tx: 540, tz: -190, ry: -52, s: 0.66, o: 0.2 },
];

const MOBILE_POSITIONS = [
  { tx: -360, tz: -190, ry: 52, s: 0.66, o: 0.2 },
  { tx: -200, tz: -90, ry: 40, s: 0.78, o: 0.58 },
  { tx: 0, tz: 0, ry: 0, s: 1.19, o: 1 },
  { tx: 200, tz: -90, ry: -40, s: 0.78, o: 0.58 },
  { tx: 360, tz: -190, ry: -52, s: 0.66, o: 0.2 },
];

function getOffset(index, current, total) {
  let diff = index - current;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

export default function WebsiteShowcase() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const navigate = useCallback(
    (dir) => setCurrent((prev) => (prev + dir + SLIDES.length) % SLIDES.length),
    []
  );

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") navigate(-1);
      if (e.key === "ArrowRight") navigate(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [navigate]);



  const positions = isMobile ? MOBILE_POSITIONS : POSITIONS;
  const cardW = isMobile ? 320 : 480;
  // Height derived from image aspect ratio (2764×1310 = 2.11:1) to avoid left/right cropping
  const cardH = isMobile ? 152 : 228;
  // Size container to side-card visual height — active card overflows via overflow-visible
  const containerH = Math.round(cardH * 0.78) + 8;
  const activeOverflow = Math.round(cardH * (1.19 - 0.78) / 2);
  const activeSlide = SLIDES[current];

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative pt-4 pb-[100px] overflow-x-hidden"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Spacer — gives the 1.19× active card room above the container */}
        <div style={{ height: activeOverflow }} aria-hidden="true" />

        {/* Carousel */}
        <div
          className="relative mx-auto overflow-visible touch-pan-y"
          style={{ height: containerH, perspective: "1600px" }}
        >
          {SLIDES.map((slide, i) => {
            const offset = getOffset(i, current, SLIDES.length);
            const absOffset = Math.abs(offset);

            if (absOffset > 2)
              return (
                <div
                  key={i}
                  className="absolute pointer-events-none"
                  style={{ opacity: 0 }}
                />
              );

            const posIndex = offset + 2;
            const pos = positions[posIndex];
            const isActive = offset === 0;

            return (
              <div
                key={i}
                className="absolute cursor-pointer overflow-visible"
                style={{
                  width: cardW,
                  height: cardH,
                  left: "50%",
                  top: "50%",
                  marginLeft: -cardW / 2,
                  marginTop: -cardH / 2,
                  transform: `translateX(${pos.tx}px) translateZ(${pos.tz}px) rotateY(${pos.ry}deg) scale(${pos.s})`,
                  opacity: pos.o,
                  transition:
                    "transform 0.8s cubic-bezier(0.3,0,0.1,1), opacity 0.8s",
                  zIndex: 5 - absOffset,
                  pointerEvents: absOffset > 2 ? "none" : "auto",
                }}
                onClick={() => {
                  if (!isActive) setCurrent(i);
                }}
              >
                <div className="relative w-full h-full overflow-hidden border-0 outline-none">
                  <Image
                    src={slide.img}
                    alt={slide.name}
                    fill
                    sizes="(max-width: 768px) 320px, 480px"
                    loading={isActive ? "eager" : "lazy"}
                    className="object-cover object-top border-0 outline-none"
                    draggable={false}
                  />
                </div>
              </div>
            );
          })}

          {/* Nav buttons */}
          <button
            onClick={() => navigate(-1)}
            className="absolute z-20 top-1/2 -translate-y-1/2 left-0 md:left-2 w-[42px] h-[42px] rounded-full bg-white/80 backdrop-blur-md border border-black/10 text-black/50 flex items-center justify-center cursor-pointer transition-all duration-200 hover:border-primary/30 hover:text-primary hover:bg-accent/30 hover:shadow-md"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate(1)}
            className="absolute z-20 top-1/2 -translate-y-1/2 right-0 md:right-2 w-[42px] h-[42px] rounded-full bg-white/80 backdrop-blur-md border border-black/10 text-black/50 flex items-center justify-center cursor-pointer transition-all duration-200 hover:border-primary/30 hover:text-primary hover:bg-accent/30 hover:shadow-md"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Spacer — gives the 1.19× active card room below the container */}
        <div style={{ height: activeOverflow }} aria-hidden="true" />

        {/* Info panel — fade transition on slide change */}
        <div className="text-center mt-10 min-h-[160px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <p className="text-[10px] tracking-[0.22em] uppercase text-primary mb-2">
                {activeSlide.feature}
              </p>
              <h3 className="text-xl md:text-[28px] font-bold tracking-tight text-black mb-2.5">
                {activeSlide.name}
              </h3>
              <p className="text-[13px] font-light text-black/50 max-w-[440px] mx-auto leading-relaxed mb-3">
                {activeSlide.desc}
              </p>
              {activeSlide.url && (
                <a
                  href={activeSlide.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-black/50 text-[12.5px] border border-black/10 rounded-full px-4 py-1.5 transition-all duration-200 hover:text-primary hover:border-primary/30 hover:bg-accent/30"
                >
                  View live demo
                  <ExternalLink className="w-[11px] h-[11px]" />
                </a>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-[7px] mt-7">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-[3px] rounded-sm cursor-pointer transition-all duration-300 ${
                i === current
                  ? "w-[32px] bg-primary shadow-[0_0_8px_color-mix(in_srgb,var(--color-primary)_40%,transparent)]"
                  : "w-[18px] bg-black/15 hover:bg-black/25"
              }`}
            />
          ))}
        </div>

        {/* Footer note */}
        <div className="flex items-center justify-center gap-4 mt-11">
          <span
            className="block w-14 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, color-mix(in srgb, var(--color-primary) 20%, transparent))",
            }}
          />
          <span className="text-[12.5px] font-light text-black/30">
            Every feature included — no extra cost, no plugins
          </span>
          <span
            className="block w-14 h-px"
            style={{
              background:
                "linear-gradient(to left, transparent, color-mix(in srgb, var(--color-primary) 20%, transparent))",
            }}
          />
        </div>
      </div>
    </motion.section>
  );
}

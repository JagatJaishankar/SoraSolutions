"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

const SLIDES = [
  {
    tag: "Hero Design",
    feature: "First Impressions",
    name: "Instant Authority & Trust",
    desc: "Stunning hero sections with lead forms, star ratings, trust badges, and a clear offer above the fold \u2014 designed to convert from the first second.",
    img: "/carousel/landscaping-hero.png",
    url: "https://landscaping-demo-delta.vercel.app",
  },
  {
    tag: "Trust & Authority",
    feature: "Credentials That Convert",
    name: "Licensed, Insured & Proven",
    desc: "Accreditation badges, lifetime guarantees, and quality promises displayed prominently \u2014 building confidence before they even scroll.",
    img: "/carousel/electrical-features.png",
    url: "https://electrical-demo-pearl.vercel.app",
  },
  {
    tag: "Portfolio",
    feature: "Work Portfolio",
    name: "Results That Speak for Themselves",
    desc: "Photo galleries showcasing real projects with masonry layouts \u2014 so your workmanship does the selling for you.",
    img: "/carousel/plumbing-portfolio.png",
    url: "https://plumbing-deploy.vercel.app",
  },
  {
    tag: "Service Pages",
    feature: "Service Targeting",
    name: "\u201CWhich Best Describes You?\u201D",
    desc: "Segment residential, commercial, and strata clients on one page \u2014 each card speaks directly to their situation and drives its own conversion.",
    img: "/carousel/painters-services.png",
    url: "https://painter-deploy.vercel.app",
  },
  {
    tag: "Transformations",
    feature: "Before & After",
    name: "See the Difference Proper Work Makes",
    desc: "Real project showcases with before and after photography \u2014 proof that builds trust and sets expectations for quality.",
    img: "/carousel/landscaping-transformation.png",
    url: "https://landscaping-demo-delta.vercel.app",
  },
  {
    tag: "Process & Trust",
    feature: "Business Process",
    name: "You Run This \u2014 They Just Show Up",
    desc: "Clear step-by-step process sections set expectations, establish authority, and reduce friction. Clients arrive prepared and confident.",
    img: "/carousel/roofing-process.png",
    url: "https://roofing-deploy.vercel.app",
  },
];

const POSITIONS = [
  { tx: -540, tz: -190, ry: 52, s: 0.66, o: 0.2 },
  { tx: -300, tz: -90, ry: 40, s: 0.84, o: 0.58 },
  { tx: 0, tz: 0, ry: 0, s: 1, o: 1 },
  { tx: 300, tz: -90, ry: -40, s: 0.84, o: 0.58 },
  { tx: 540, tz: -190, ry: -52, s: 0.66, o: 0.2 },
];

const MOBILE_POSITIONS = [
  { tx: -360, tz: -190, ry: 52, s: 0.66, o: 0.2 },
  { tx: -200, tz: -90, ry: 40, s: 0.84, o: 0.58 },
  { tx: 0, tz: 0, ry: 0, s: 1, o: 1 },
  { tx: 200, tz: -90, ry: -40, s: 0.84, o: 0.58 },
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
  const touchStartX = useRef(0);
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

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 48) navigate(dx < 0 ? 1 : -1);
  };

  const positions = isMobile ? MOBILE_POSITIONS : POSITIONS;
  const cardW = isMobile ? 320 : 480;
  const cardH = isMobile ? 210 : 320;
  const activeSlide = SLIDES[current];

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative py-[100px] overflow-hidden bg-gradient-to-r from-[#9741FE]/10 to-[#232872]/10"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-4 mb-5">
            <span
              className="block w-8 h-px"
              style={{
                background: "linear-gradient(to right, transparent, #9741FE)",
              }}
            />
            <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-[#9741FE]">
              What&apos;s Inside Every Site
            </span>
            <span
              className="block w-8 h-px"
              style={{
                background: "linear-gradient(to left, transparent, #9741FE)",
              }}
            />
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-black">
            Built to{" "}
            <span className="underline decoration-[#9741FE] decoration-4 underline-offset-4">
              Win Work
            </span>
          </h2>

          <p className="text-base font-light tracking-wide text-black/60 max-w-xl mx-auto mt-4">
            Every feature engineered to turn visitors into booked jobs — from
            first impression to follow-up.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative mx-auto"
          style={{ height: cardH + 40, perspective: "1600px" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
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
                className="absolute cursor-pointer rounded-[10px] overflow-hidden shadow-lg"
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
                    "transform 0.65s cubic-bezier(0.3,0,0.1,1), opacity 0.65s",
                  zIndex: 5 - absOffset,
                  boxShadow: isActive
                    ? "0 20px 50px rgba(151,65,254,0.15), 0 40px 80px rgba(151,65,254,0.08)"
                    : undefined,
                  pointerEvents: absOffset > 2 ? "none" : "auto",
                }}
                onClick={() => {
                  if (!isActive) setCurrent(i);
                }}
              >
                {/* Tag */}
                <span className="absolute top-3 left-3 z-20 bg-white/80 backdrop-blur-sm border border-black/5 rounded-full px-2.5 py-1 text-[9px] font-semibold tracking-widest uppercase text-black/70">
                  {slide.tag}
                </span>

                {/* Image */}
                <img
                  src={slide.img}
                  alt={slide.name}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            );
          })}

          {/* Nav buttons */}
          <button
            onClick={() => navigate(-1)}
            className="absolute z-20 top-1/2 -translate-y-1/2 left-0 md:left-2 w-[42px] h-[42px] rounded-full bg-white/80 backdrop-blur-md border border-black/10 text-black/50 flex items-center justify-center cursor-pointer transition-all duration-200 hover:border-[#9741FE]/30 hover:text-[#9741FE] hover:bg-[#D9D1FB]/30 hover:shadow-md"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => navigate(1)}
            className="absolute z-20 top-1/2 -translate-y-1/2 right-0 md:right-2 w-[42px] h-[42px] rounded-full bg-white/80 backdrop-blur-md border border-black/10 text-black/50 flex items-center justify-center cursor-pointer transition-all duration-200 hover:border-[#9741FE]/30 hover:text-[#9741FE] hover:bg-[#D9D1FB]/30 hover:shadow-md"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Info panel */}
        <div className="text-center mt-10 min-h-[160px]">
          <p className="text-[10px] tracking-[0.22em] uppercase text-[#9741FE] mb-2">
            {activeSlide.feature}
          </p>
          <h3 className="text-xl md:text-[28px] font-bold tracking-tight text-black mb-2.5">
            {activeSlide.name}
          </h3>
          <p className="text-[13px] font-light text-black/50 max-w-[440px] mx-auto leading-relaxed mb-3">
            {activeSlide.desc}
          </p>
          <a
            href={activeSlide.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-black/50 text-[12.5px] border border-black/10 rounded-full px-4 py-1.5 transition-all duration-200 hover:text-[#9741FE] hover:border-[#9741FE]/30 hover:bg-[#D9D1FB]/30"
          >
            View live demo
            <ExternalLink className="w-[11px] h-[11px]" />
          </a>
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
                  ? "w-[32px] bg-[#9741FE] shadow-[0_0_8px_rgba(151,65,254,0.4)]"
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
                "linear-gradient(to right, transparent, rgba(151,65,254,0.2))",
            }}
          />
          <span className="text-[12.5px] font-light text-black/30">
            Every feature included — no extra cost, no plugins
          </span>
          <span
            className="block w-14 h-px"
            style={{
              background:
                "linear-gradient(to left, transparent, rgba(151,65,254,0.2))",
            }}
          />
        </div>
      </div>
    </motion.section>
  );
}

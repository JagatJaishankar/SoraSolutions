"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Image from "next/image";

const SLIDES = [
  {
    feature: "First Impressions",
    name: "Instant Authority & Trust",
    desc: "Stunning hero sections with lead forms, star ratings, trust badges, and a clear offer above the fold \u2014 designed to convert from the first second.",
    img: "/carousel/waterproofing-hero.webp",
    url: "https://waterproofing-demo.vercel.app",
  },
  {
    feature: "Mobile Optimised",
    name: "Looks Perfect on Every Device",
    desc: "Every site is built mobile-first. Fast load, thumb-friendly CTAs, responsive layouts \u2014 your clients book from their phones, so your site has to perform there.",
    img: "/carousel/mobile-optimised.webp",
    contain: true,
  },
  {
    feature: "Smart Lead Qualification",
    name: "Multi-Step Forms That Filter & Qualify",
    desc: "Job type selectors, photo uploads, timeline pickers \u2014 every enquiry arrives with the detail you need to quote confidently and weed out time-wasters.",
    img: "/carousel/smart-form.webp",
    contain: true,
  },
  {
    feature: "Work Portfolio",
    name: "Craft That Sells Itself",
    desc: "Photo galleries showcasing real projects \u2014 so your workmanship does the selling for you.",
    img: "/carousel/plumbing-collage.webp",
  },
  {
    feature: "Service Targeting",
    name: "\u201CWhich Best Describes You?\u201D",
    desc: "Segment residential, commercial, and strata clients on one page \u2014 each card speaks directly to their situation and drives its own conversion.",
    img: "/carousel/painters-services.webp",
    url: "https://painter-deploy.vercel.app",
  },
  {
    feature: "Interactive Elements",
    name: "Websites That Actually Do Things",
    desc: "Click the lightbulb \u2014 it toggles on and off. Scroll animations, interactive maps, live price calculators. Not just pretty \u2014 engaging.",
    imgA: "/carousel/electrical-lights.webp",
    imgB: "/carousel/electrical-lights-on.webp",
    toggle: true,
    url: "https://electrical-demo-pearl.vercel.app",
  },
  {
    feature: "Service Area Coverage",
    name: "Show Where You Work",
    desc: "Interactive maps with suburb grids \u2014 clients instantly know you cover their area. Builds local trust and pre-qualifies location before they even enquire.",
    img: "/carousel/service-areas.webp",
  },
  {
    feature: "Business Process",
    name: "You Run This \u2014 They Just Show Up",
    desc: "Clear step-by-step process sections set expectations, establish authority, and reduce friction. Clients arrive prepared and confident.",
    img: "/carousel/roofing-process.webp",
    url: "https://roofing-deploy.vercel.app",
  },
];

const TOGGLE_SLIDE_INDEX = 5;

const POSITIONS = [
  { tx: -540, tz: -190, ry: 52, s: 0.66, o: 0.2 },
  { tx: -300, tz: -90, ry: 40, s: 0.78, o: 0.58 },
  { tx: 0, tz: 0, ry: 0, s: 1, o: 1 },
  { tx: 300, tz: -90, ry: -40, s: 0.78, o: 0.58 },
  { tx: 540, tz: -190, ry: -52, s: 0.66, o: 0.2 },
];

const MOBILE_POSITIONS = [
  { tx: -360, tz: -190, ry: 52, s: 0.66, o: 0.2 },
  { tx: -200, tz: -90, ry: 40, s: 0.78, o: 0.58 },
  { tx: 0, tz: 0, ry: 0, s: 1, o: 1 },
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
  const [toggleOn, setToggleOn] = useState(false);
  const touchStartX = useRef(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (current !== TOGGLE_SLIDE_INDEX) {
      setToggleOn(false);
      return;
    }
    const id = setInterval(() => setToggleOn((prev) => !prev), 1800);
    return () => clearInterval(id);
  }, [current]);

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
  const reflectionH = isMobile ? 50 : 80;
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
        {/* Carousel */}
        <div
          className="relative mx-auto overflow-hidden"
          style={{ height: cardH + reflectionH + 20, perspective: "1600px" }}
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
                className="absolute cursor-pointer overflow-visible"
                style={{
                  width: cardW,
                  height: cardH,
                  left: "50%",
                  top: "50%",
                  marginLeft: -cardW / 2,
                  marginTop: -(cardH + reflectionH) / 2,
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
                {/* Main card */}
                <div className="relative w-full overflow-hidden rounded-xl" style={{ height: cardH }}>
                  {isActive && (
                    <div className="absolute inset-0 rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] pointer-events-none z-30" />
                  )}

                  {slide.toggle ? (
                    <>
                      <Image
                        src={slide.imgA}
                        alt={slide.name}
                        fill
                        sizes="(max-width: 768px) 320px, 480px"
                        loading={isActive ? "eager" : "lazy"}
                        className={`object-cover object-top transition-opacity duration-[900ms] ease ${
                          toggleOn ? "opacity-0" : "opacity-100"
                        }`}
                        draggable={false}
                      />
                      <Image
                        src={slide.imgB}
                        alt={`${slide.name} - on`}
                        fill
                        sizes="(max-width: 768px) 320px, 480px"
                        loading={isActive ? "eager" : "lazy"}
                        className={`object-cover object-top transition-opacity duration-[900ms] ease ${
                          toggleOn ? "opacity-100" : "opacity-0"
                        }`}
                        draggable={false}
                      />
                      {isActive && (
                        <span className="absolute bottom-2.5 right-2.5 z-20 bg-white/80 backdrop-blur-sm border border-black/5 rounded-full px-2.5 py-1 text-[9px] font-semibold tracking-widest uppercase text-black/70">
                          ⚡ Click to Toggle
                        </span>
                      )}
                    </>
                  ) : slide.contain ? (
                    <Image
                      src={slide.img}
                      alt={slide.name}
                      fill
                      sizes="(max-width: 768px) 320px, 480px"
                      loading={isActive ? "eager" : "lazy"}
                      className="object-contain object-center"
                      draggable={false}
                    />
                  ) : (
                    <Image
                      src={slide.img}
                      alt={slide.name}
                      fill
                      sizes="(max-width: 768px) 320px, 480px"
                      loading={isActive ? "eager" : "lazy"}
                      className="object-cover object-top"
                      draggable={false}
                    />
                  )}
                </div>

                {/* Reflection — active card only */}
                {isActive && (
                  <div
                    className="w-full overflow-hidden pointer-events-none relative"
                    style={{
                      height: reflectionH,
                      transform: "scaleY(-1) perspective(800px) rotateX(2deg)",
                      maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.08) 40%, transparent 80%)",
                      WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.08) 40%, transparent 80%)",
                      opacity: 0.35,
                      filter: "blur(3px) saturate(0.7)",
                    }}
                  >
                    {slide.toggle ? (
                      <Image
                        src={toggleOn ? slide.imgB : slide.imgA}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 320px, 480px"
                        className="object-cover object-top"
                        draggable={false}
                      />
                    ) : (
                      <Image
                        src={slide.img}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 320px, 480px"
                        className={slide.contain ? "object-contain object-center" : "object-cover object-top"}
                        draggable={false}
                      />
                    )}
                  </div>
                )}
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

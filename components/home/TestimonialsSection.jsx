"use client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    quote:
      "We went from relying on word of mouth to having a full pipeline within 8 weeks. The AI follow-up alone has paid for itself ten times over.",
    name: "Mark T.",
    trade: "Plumber",
    location: "Western Sydney",
    initials: "MT",
  },
  {
    quote:
      "I was sceptical about AI. Now I can't imagine running my business without it. Leads come in, get followed up, and book themselves in. I just do the work.",
    name: "Sarah K.",
    trade: "Electrician",
    location: "Brisbane",
    initials: "SK",
  },
  {
    quote:
      "Joel gets it because he's been there. No other agency understood how a trade business actually works day-to-day.",
    name: "Dave R.",
    trade: "Builder",
    location: "Melbourne",
    initials: "DR",
  },
  {
    quote:
      "Within the first month, we had more qualified leads than the previous quarter combined. The system just works.",
    name: "Tom L.",
    trade: "Roofer",
    location: "Gold Coast",
    initials: "TL",
  },
  {
    quote:
      "Best money I've ever spent on my business. I used to chase every job. Now they come to me.",
    name: "Lisa M.",
    trade: "Painter",
    location: "Perth",
    initials: "LM",
  },
];

function Stars() {
  return (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="w-5 h-5 text-[#9741FE]"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white/50 border border-white/20 rounded-2xl p-6 md:p-8 h-full flex flex-col select-none">
      <Stars />
      <p className="text-lg font-light leading-relaxed text-black flex-1">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3 mt-6">
        <div className="w-12 h-12 rounded-full bg-[#D9D1FB] flex items-center justify-center flex-shrink-0">
          <span className="text-sm font-bold text-[#9741FE]">
            {testimonial.initials}
          </span>
        </div>
        <div>
          <div className="font-semibold text-black">{testimonial.name}</div>
          <div className="text-sm text-black/50">
            {testimonial.trade} — {testimonial.location}
          </div>
        </div>
      </div>
    </div>
  );
}

const SCROLL_SPEED = 60;
const SMOOTH_TAU = 0.25;
const GAP = 24;
const MOBILE_GAP = 16;

export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const seqRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [seqWidth, setSeqWidth] = useState(0);
  const [copyCount, setCopyCount] = useState(3);

  const isHoveredRef = useRef(false);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  const gap = typeof window !== "undefined" && window.innerWidth < 768 ? MOBILE_GAP : GAP;

  // Measure one set of cards and determine copies needed
  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const sequenceWidth = seqRef.current?.getBoundingClientRect()?.width ?? 0;
    if (sequenceWidth > 0) {
      setSeqWidth(Math.ceil(sequenceWidth));
      const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + 2;
      setCopyCount(Math.max(3, copiesNeeded));
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(updateDimensions);
    observer.observe(containerRef.current);
    if (seqRef.current) observer.observe(seqRef.current);
    updateDimensions();
    return () => observer.disconnect();
  }, [updateDimensions]);

  // Continuous rAF scroll loop
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let rafId = null;
    let lastTs = null;

    const tick = (timestamp) => {
      if (lastTs === null) lastTs = timestamp;
      const dt = Math.max(0, timestamp - lastTs) / 1000;
      lastTs = timestamp;

      const sw = seqWidth;
      const target = isHoveredRef.current ? 0 : SCROLL_SPEED;
      const easingFactor = 1 - Math.exp(-dt / SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      if (sw > 0) {
        offsetRef.current =
          (((offsetRef.current + velocityRef.current * dt) % sw) + sw) % sw;
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [seqWidth]);

  const cardWidthClass = "w-[calc(100vw-4rem)] sm:w-[calc(50vw-3.5rem)] lg:w-[calc(33.333vw-3.5rem)] xl:w-[380px]";

  return (
    <section ref={sectionRef} className="py-[100px] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-extrabold tracking-tight text-black">
            What Tradies Are Saying
          </h2>
          <p className="mt-4 text-lg font-light tracking-wide text-black/60 max-w-2xl mx-auto">
            Real feedback from real trade businesses.
          </p>
        </motion.div>
      </div>

      {/* Continuous carousel */}
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        onMouseEnter={() => { isHoveredRef.current = true; }}
        onMouseLeave={() => { isHoveredRef.current = false; }}
        onTouchStart={() => { isHoveredRef.current = true; }}
        onTouchEnd={() => { isHoveredRef.current = false; }}
      >
        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ gap: `${gap}px` }}
        >
          {Array.from({ length: copyCount }, (_, copyIndex) => (
            <div
              key={`copy-${copyIndex}`}
              className="flex flex-shrink-0"
              style={{ gap: `${gap}px` }}
              ref={copyIndex === 0 ? seqRef : undefined}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={`${copyIndex}-${testimonial.initials}`}
                  className={`flex-shrink-0 ${cardWidthClass}`}
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

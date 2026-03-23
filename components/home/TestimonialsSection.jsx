"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const reviews = [
  {
    quote:
      "Testimonial placeholder — real client reviews will be added here once founding members provide feedback.",
    name: "Client A.",
    initials: "CA",
    color: "bg-primary",
    timeAgo: "2 weeks ago",
  },
  {
    quote:
      "Testimonial placeholder — real client reviews will be added here once founding members provide feedback.",
    name: "Client B.",
    initials: "CB",
    color: "bg-secondary",
    timeAgo: "5 weeks ago",
  },
  {
    quote:
      "Testimonial placeholder — real client reviews will be added here once founding members provide feedback.",
    name: "Client C.",
    initials: "CC",
    color: "bg-primary",
    timeAgo: "3 weeks ago",
  },
  {
    quote:
      "Testimonial placeholder — real client reviews will be added here once founding members provide feedback.",
    name: "Client D.",
    initials: "CD",
    color: "bg-secondary",
    timeAgo: "1 week ago",
  },
  {
    quote:
      "Testimonial placeholder — real client reviews will be added here once founding members provide feedback.",
    name: "Client E.",
    initials: "CE",
    color: "bg-primary",
    timeAgo: "4 weeks ago",
  },
];

function StarIcon({ className = "" }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function CardStars() {
  return (
    <div className="flex gap-0.5 mb-4">
      {[...Array(5)].map((_, i) => (
        <StarIcon key={i} className="w-5 h-5 text-star" />
      ))}
    </div>
  );
}

function GoogleIcon() {
  return (
    <Image
      src="/images/logos/g.webp"
      alt="Google"
      width={16}
      height={16}
      className="w-4 h-4"
    />
  );
}

function ReviewCard({ review }) {
  return (
    <div className="bg-white/85 backdrop-blur-xl border border-black/5 rounded-2xl p-6 h-full flex flex-col select-none">
      <CardStars />
      <p className="text-base font-light text-black/70 leading-relaxed flex-1">
        &ldquo;{review.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3 mt-6">
        <div
          className={`w-10 h-10 rounded-full ${review.color} flex items-center justify-center flex-shrink-0`}
        >
          <span className="text-xs font-bold text-white">
            {review.initials}
          </span>
        </div>
        <div>
          <div className="text-sm font-semibold text-black">
            {review.name}
          </div>
          <div className="flex items-center gap-1 text-xs text-black/40">
            <span>{review.timeAgo}</span>
            <span>·</span>
            <GoogleIcon />
            <span>Google</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const SCROLL_SPEED = 40;
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
  const isScrollVisibleRef = useRef(true);

  const gap =
    typeof window !== "undefined" && window.innerWidth < 768
      ? MOBILE_GAP
      : GAP;

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const sequenceWidth =
      seqRef.current?.getBoundingClientRect()?.width ?? 0;
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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isScrollVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let rafId = null;
    let lastTs = null;

    const tick = (timestamp) => {
      if (!isScrollVisibleRef.current) {
        lastTs = null;
        rafId = requestAnimationFrame(tick);
        return;
      }

      if (lastTs === null) lastTs = timestamp;
      const dt = Math.max(0, timestamp - lastTs) / 1000;
      lastTs = timestamp;

      const sw = seqWidth;
      const target = isHoveredRef.current ? 0 : SCROLL_SPEED;
      const easingFactor = 1 - Math.exp(-dt / SMOOTH_TAU);
      velocityRef.current +=
        (target - velocityRef.current) * easingFactor;

      if (sw > 0) {
        offsetRef.current =
          (((offsetRef.current + velocityRef.current * dt) % sw) + sw) %
          sw;
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [seqWidth]);

  const cardWidthClass =
    "w-[calc(100vw-4rem)] sm:w-[calc(50vw-3.5rem)] lg:w-[calc(33.333vw-3.5rem)] xl:w-[380px]";

  return (
    <section ref={sectionRef} className="py-[100px] bg-bluewhite section-shadow overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Eyebrow */}
          <p className="text-xs tracking-widest uppercase text-black/40 mb-6">
            What Our Clients Say
          </p>

          {/* Rating display */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-5xl font-black text-black">4.9</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className="w-8 h-8 text-star"
                />
              ))}
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-sm text-black/50 mb-5">
            Based on 60+ Google Reviews · 500+ jobs completed across the
            region
          </p>

          {/* Google Reviews badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-black/10 rounded-full px-4 py-2 shadow-sm">
            <Image
              src="/images/logos/g.webp"
              alt="Google"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            <span className="text-sm font-medium text-black/70">
              Google Reviews
            </span>
          </div>
        </motion.div>
      </div>

      {/* Continuous carousel */}
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
        onTouchStart={() => {
          isHoveredRef.current = true;
        }}
        onTouchEnd={() => {
          isHoveredRef.current = false;
        }}
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
              {reviews.map((review) => (
                <div
                  key={`${copyIndex}-${review.initials}`}
                  className={`flex-shrink-0 ${cardWidthClass}`}
                >
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

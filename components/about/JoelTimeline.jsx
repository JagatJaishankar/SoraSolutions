"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { Hammer, Award, PhoneMissed, Lightbulb, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import ElectricBorder from "@/components/ui/ElectricBorder";

const ICONS = { Hammer, Award, PhoneMissed, Lightbulb, Zap };

const TUNNELING_PHOTOS = [
  "/images/about/tunneling-carasol/WhatsApp Image 2026-04-15 at 21.56.59 (1).webp",
  "/images/about/tunneling-carasol/WhatsApp Image 2026-04-15 at 21.56.59 (2).webp",
  "/images/about/tunneling-carasol/WhatsApp Image 2026-04-15 at 21.57.02.webp",
  "/images/about/tunneling-carasol/WhatsApp Image 2026-04-15 at 21.57.02 (1).webp",
  "/images/about/tunneling-carasol/WhatsApp Image 2026-04-15 at 21.57.02 (2).webp",
];

const CHAPTERS = [
  {
    number: "01",
    year: "2015",
    title: "Picked Up a Hammer",
    text: "I left school and picked up a hammer. Spent 6 years as a carpenter — residential, commercial, renovations, new builds. Loved every minute of it.",
    icon: "Hammer",
    side: "left",
    image: "/images/about/starting my apprenticeship in 2015..webp",
    imageAlt: "Joel Willis starting his carpentry apprenticeship in 2015",
  },
  {
    number: "02",
    year: "2022",
    title: "Builder's Licence",
    text: "Got my builder's licence and started my own building company. The business went well. We were busy, the work was solid, and we built a good reputation.",
    icon: "Award",
    side: "right",
    image: "/images/about/Photo of me with my building company.webp",
    imageAlt: "Joel Willis with his building company",
  },
  {
    number: "03",
    year: "2023",
    title: "The Gap",
    text: "Looking back, I know we left a lot on the table. We'd miss calls on the job. Quotes went out and follow-ups fell through the cracks. Our marketing was basically word of mouth and hoping the phone kept ringing.",
    icon: "PhoneMissed",
    side: "left",
    image: "/images/about/the-gap.webp",
    imageAlt: "Joel Willis reflecting on missed opportunities and business gaps during his carpentry years",
  },
  {
    number: "04",
    year: "2025",
    title: "The Discovery",
    text: "After 4 years running the company, I moved into tunnelling — great money, steady work, and time to think about what I'd do next. That's when I discovered digital marketing, AI, and business automation. And I saw a massive gap.",
    icon: "Lightbulb",
    side: "right",
    carousel: TUNNELING_PHOTOS,
  },
  {
    number: "05",
    year: "2026",
    title: "Built Sora",
    text: "Trade businesses are some of the most skilled, hardworking businesses in the country. But most of them are leaving growth on the table. So I built Sora. Every strategy we build, every system we set up — it's designed to be the missing piece I wish I'd had.",
    icon: "Zap",
    side: "left",
    image: "/images/about/building-sora.webp",
    imageAlt: "Joel Willis building Sora Solutions",
  },
];

function TunnelingCarousel({ photos }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef(null);

  const go = useCallback((dir) => {
    setDirection(dir);
    setIndex((i) => (i + dir + photos.length) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    timerRef.current = setInterval(() => go(1), 3500);
    return () => clearInterval(timerRef.current);
  }, [go]);

  const pause = () => clearInterval(timerRef.current);
  const resume = () => {
    timerRef.current = setInterval(() => go(1), 3500);
  };

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  return (
    <div
      className="relative w-full h-52 rounded-xl overflow-hidden mt-5 group"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={photos[index]}
            alt={`Joel tunnelling project — photo ${index + 1}`}
            fill
            sizes="(max-width: 768px) 90vw, 45vw"
            className="object-cover object-center"
            quality={80}
          />
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next */}
      <button
        onClick={() => go(-1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Previous photo"
      >
        <ChevronLeft size={14} className="text-white" />
      </button>
      <button
        onClick={() => go(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Next photo"
      >
        <ChevronRight size={14} className="text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "bg-white w-4" : "bg-white/50"
            }`}
            aria-label={`Go to photo ${i + 1}`}
          />
        ))}
      </div>

      {/* Counter */}
      <span className="absolute top-2 right-2 z-10 bg-black/40 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
        {index + 1} / {photos.length}
      </span>
    </div>
  );
}

function ChapterCard({ chapter }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const Icon = ICONS[chapter.icon];
  const isLeft = chapter.side === "left";
  const isLast = chapter.number === "05";

  const cardInner = (
    <>
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#9740fe] to-[#222872]" />

      {/* Watermark number */}
      <span className="absolute top-4 right-6 text-[80px] font-black text-[#9740fe]/[0.08] leading-none pointer-events-none z-0">
        {chapter.number}
      </span>

      {/* Year pill */}
      <span className="bg-[#d9d0fb] text-[#9740fe] text-sm font-bold px-4 py-1.5 rounded-full inline-flex mb-3 relative z-10">
        {chapter.year}
      </span>

      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-[#d9d0fb] flex items-center justify-center mb-3 relative z-10">
        <Icon size={28} className="text-[#9740fe]" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold tracking-tight text-black mb-2 relative z-10">
        {chapter.title}
      </h3>

      {/* Text */}
      <p className="text-base font-light tracking-wide text-black/60 leading-relaxed relative z-10">
        {chapter.text}
      </p>

      {/* Carousel */}
      {chapter.carousel && <TunnelingCarousel photos={chapter.carousel} />}

      {/* Single photo */}
      {chapter.image && !chapter.carousel && (
        <div className="relative w-full h-48 rounded-xl overflow-hidden mt-5 z-10">
          <Image
            src={chapter.image}
            alt={chapter.imageAlt}
            fill
            sizes="(max-width: 768px) 90vw, 45vw"
            className="object-cover object-center"
            quality={80}
          />
        </div>
      )}
    </>
  );

  return (
    <div
      ref={ref}
      className={`relative flex ${
        isLeft ? "lg:justify-start" : "lg:justify-end"
      }`}
    >
      {/* Pulse dot — desktop */}
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-8 z-10 items-center justify-center">
        <div className="w-9 h-9 rounded-full border-2 border-[#d9d0fb] absolute" />
        <div
          className={`w-5 h-5 rounded-full bg-[#9740fe] ${
            isInView ? "animate-[pulse-dot_2s_ease-in-out_infinite]" : ""
          }`}
        />
      </div>

      {/* Pulse dot — mobile */}
      <div className="lg:hidden absolute left-4 -translate-x-1/2 top-8 z-10 flex items-center justify-center">
        <div className="w-9 h-9 rounded-full border-2 border-[#d9d0fb] absolute" />
        <div
          className={`w-5 h-5 rounded-full bg-[#9740fe] ${
            isInView ? "animate-[pulse-dot_2s_ease-in-out_infinite]" : ""
          }`}
        />
      </div>

      {/* Card */}
      <motion.div
        className={`w-full pl-12 lg:pl-0 lg:w-[45%] ${
          isLeft ? "lg:pr-12" : "lg:pl-12"
        }`}
        initial={
          isLeft
            ? { x: -40, opacity: 0, rotate: -3 }
            : { x: 40, opacity: 0, rotate: 3 }
        }
        whileInView={{ x: 0, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {isLast ? (
          <div className="p-[1.5px] rounded-2xl bg-gradient-to-br from-[#9740fe] to-[#222872]">
            <div className="bg-white/80 backdrop-blur-xl rounded-[calc(1rem-1.5px)] p-8 relative overflow-hidden">
              {cardInner}
            </div>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-black/5 relative overflow-hidden">
            {cardInner}
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default function JoelTimeline() {
  const timelineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="joel-timeline"
      className="py-[100px] pt-[140px] px-4 sm:px-6 lg:px-8"
    >
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold tracking-tight text-black mb-4">
          The Journey
        </h2>
        <p className="text-lg font-light tracking-wide text-black/60 max-w-2xl mx-auto">
          From the tools to the tech — here's how Sora came to be.
        </p>
      </div>

      {/* Timeline */}
      <div ref={timelineRef} className="max-w-5xl mx-auto relative">
        {/* Center line — desktop */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2">
          <div className="absolute inset-0 bg-[#d9d0fb]/50" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-[#9740fe] to-[#222872] origin-top"
            style={{ scaleY }}
          />
        </div>

        {/* Left line — mobile */}
        <div className="lg:hidden absolute left-4 top-0 bottom-0 w-[3px]">
          <div className="absolute inset-0 bg-[#d9d0fb]/50" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-[#9740fe] to-[#222872] origin-top"
            style={{ scaleY }}
          />
        </div>

        {/* Chapters */}
        <div className="flex flex-col gap-8 lg:gap-12">
          {CHAPTERS.map((chapter) => (
            <ChapterCard key={chapter.number} chapter={chapter} />
          ))}
        </div>
      </div>

      {/* Pull Quote */}
      <div className="mt-16 max-w-2xl mx-auto">
        <ElectricBorder
          color="#9740fe"
          borderRadius={20}
          chaos={0.15}
          speed={1.0}
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-10 text-center">
            <span className="text-[60px] text-[#9740fe]/20 font-serif leading-none mb-2 block">
              &ldquo;
            </span>

            <p className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#9740fe] to-[#222872] bg-clip-text text-transparent">
              I built Sora so no tradie has to leave growth on the table.
            </p>

            {/* Attribution */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-[#9740fe] text-white text-sm font-bold flex items-center justify-center relative">
                <span>JW</span>
                <Image
                  src="/images/team/joel-circle.webp"
                  alt="Joel Willis"
                  fill
                  sizes="48px"
                  className="object-cover absolute inset-0 scale-150"
                />
              </div>

              <div className="text-left">
                <span className="text-sm font-semibold text-black block">
                  Joel Willis
                </span>
                <span className="text-xs text-black/50 block">
                  Founder, Sora Solutions
                </span>
              </div>
            </div>
          </div>
        </ElectricBorder>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import ServiceChecklist from "./ServiceChecklist";
import BeforeAfterSlider from "./BeforeAfterSlider";
import VariableProximity from "@/components/ui/VariableProximity";

export default function ServiceSection({
  id,
  number,
  icon: Icon,
  title,
  subtitle,
  description,
  inclusions,
  leadTimeBadge,
  ctaText,
  reversed = false,
  tinted = false,
  titleOverride,
  beforeContent,
  afterContent,
  children,
}) {
  const ref = useRef(null);
  const contentRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const paragraphs = description ? description.split("\n").filter(Boolean) : [];

  const contentInitial = { x: reversed ? 30 : -30, opacity: 0 };
  const visualInitial = { x: reversed ? -30 : 30, opacity: 0 };
  const animateTarget = { x: 0, opacity: 1 };

  const renderVisual = () => {
    if (children) return children;
    if (beforeContent && afterContent) {
      return (
        <BeforeAfterSlider
          beforeContent={beforeContent}
          afterContent={afterContent}
        />
      );
    }
    return (
      <div className="aspect-[4/3] bg-[#faf9ff] rounded-2xl flex items-center justify-center border border-black/5">
        <span className="text-black/20 text-sm font-medium">
          {title} Visual — Coming Soon
        </span>
      </div>
    );
  };

  return (
    <section
      id={id}
      className={`section-contain py-[60px] sm:py-[100px] px-4 sm:px-6 lg:px-8 scroll-mt-[140px] ${
        tinted
          ? "bg-[#faf9ff] shadow-[inset_0_8px_16px_-8px_rgba(0,0,0,0.06),inset_0_-8px_16px_-8px_rgba(0,0,0,0.06)]"
          : ""
      }`}
    >
      <div
        ref={ref}
        className={`max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16 items-center ${
          reversed ? "lg:flex-row-reverse" : ""
        }`}
      >
        {/* Content column */}
        <motion.div
          ref={contentRef}
          className="w-full lg:w-[55%]"
          initial={contentInitial}
          animate={isInView ? animateTarget : contentInitial}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Number + line */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-bold tracking-widest text-primary uppercase">
              {number}
            </span>
            <span className="w-8 h-[2px] bg-primary" />
          </div>

          {/* Icon */}
          <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-4">
            <Icon className="text-primary" size={28} />
          </div>

          {/* Title */}
          {titleOverride ||
            (title && (
              <div className="cursor-default mb-2">
                <VariableProximity
                  label={title}
                  fromFontVariationSettings="'wght' 600"
                  toFontVariationSettings="'wght' 1000"
                  containerRef={contentRef}
                  radius={100}
                  falloff="gaussian"
                  className="font-[family-name:var(--font-roboto-flex)] text-3xl sm:text-4xl tracking-tight text-black"
                />
              </div>
            ))}

          {/* Subtitle */}
          <p className="text-lg sm:text-xl font-medium text-black/70 mb-4">
            {subtitle}
          </p>

          {/* Description paragraphs */}
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-base font-light tracking-wide text-black/60 leading-relaxed mb-4"
            >
              {p}
            </p>
          ))}

          {/* Lead time badge */}
          {leadTimeBadge && (
            <div className="inline-flex items-center gap-2 bg-accent text-primary text-sm font-semibold px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-primary" />
              {leadTimeBadge}
            </div>
          )}

          {/* Checklist */}
          {inclusions && <ServiceChecklist items={inclusions} />}

          {/* CTA */}
          {ctaText && (
            <motion.div className="mt-8">
              <Link
                href="/#contact"
                className="block w-full sm:inline-block sm:w-auto text-center bg-primary text-white font-semibold px-6 py-3 rounded-xl transition-transform duration-200 hover:scale-[1.02] active:scale-[0.97]"
              >
                {ctaText}
              </Link>
            </motion.div>
          )}
        </motion.div>

        {/* Visual column */}
        <motion.div
          className="w-full lg:w-[45%]"
          initial={visualInitial}
          animate={isInView ? animateTarget : visualInitial}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          {renderVisual()}
        </motion.div>
      </div>
    </section>
  );
}

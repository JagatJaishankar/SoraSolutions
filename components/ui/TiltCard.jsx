"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import Link from "next/link";

const springValues = { damping: 30, stiffness: 100, mass: 2 };

export default function TiltCard({ children, className = "", href, accentLine = false }) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const spotlightOpacity = useSpring(0, { damping: 20, stiffness: 300 });
  const liftY = useSpring(0, springValues);

  const spotlightBg = useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, color-mix(in srgb, var(--color-primary) 4%, transparent), transparent 100%)`;

  function handleMouse(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    rotateX.set((offsetY / (rect.height / 2)) * -6);
    rotateY.set((offsetX / (rect.width / 2)) * 6);

    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  function handleMouseEnter() {
    setHovered(true);
    spotlightOpacity.set(1);
    liftY.set(-8);
  }

  function handleMouseLeave() {
    setHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    spotlightOpacity.set(0);
    liftY.set(0);
  }

  const card = (
    <div
      ref={ref}
      className={`relative [perspective:800px] ${className}`}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className={`relative h-full border rounded-2xl [transform-style:preserve-3d] will-change-transform [transition:box-shadow_300ms,border-color_300ms] bg-white/80 backdrop-blur-xl ${
          hovered
            ? "border-primary/10 shadow-xl"
            : "border-white/20 shadow-md"
        }`}
        style={{ rotateX, rotateY, y: liftY }}
      >
        {/* Clipping layer for accent line + spotlight (overflow-hidden here won't affect 3D content below) */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none z-10">
          {accentLine && (
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary to-secondary" />
          )}
          <motion.div
            className="absolute inset-0"
            style={{ opacity: spotlightOpacity, background: spotlightBg }}
          />
        </div>

        {/* Card content */}
        <div className="relative z-20 h-full [transform-style:preserve-3d]">
          {children}
        </div>
      </motion.div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {card}
      </Link>
    );
  }

  return card;
}

TiltCard.Layer = function TiltCardLayer({ children, z = 0, className = "" }) {
  return (
    <div
      className={`will-change-transform [transform:translateZ(var(--tz))] ${className}`}
      style={{ "--tz": `${z}px` }}
    >
      {children}
    </div>
  );
};

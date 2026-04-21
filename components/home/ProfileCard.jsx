"use client";

import { useEffect, useRef, useCallback, useMemo, useState } from "react";
import Image from "next/image";

const ANIMATION_CONFIG = {
  INITIAL_DURATION: 1200,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  ENTER_TRANSITION_MS: 180,
};

const clamp = (v, min = 0, max = 100) => Math.min(Math.max(v, min), max);
const round = (v, precision = 3) => parseFloat(v.toFixed(precision));
const adjust = (v, fMin, fMax, tMin, tMax) =>
  round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

export default function ProfileCard({
  avatarUrl,
  name = "Joel Willis",
  title = "Founder, Sora Solutions",
  contactText = "Read Full Story →",
  onContactClick,
  className = "",
}) {
  const wrapRef = useRef(null);
  const shellRef = useRef(null);
  const enterTimerRef = useRef(null);
  const leaveRafRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const tiltEngine = useMemo(() => {
    if (typeof window === "undefined") return null;

    let rafId = null;
    let running = false;
    let lastTs = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const DEFAULT_TAU = 0.14;
    const INITIAL_TAU = 0.6;
    let initialUntil = 0;

    const setVarsFromXY = (x, y) => {
      const shell = shellRef.current;
      const wrap = wrapRef.current;
      if (!shell || !wrap) return;

      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;

      const percentX = clamp((100 / width) * x);
      const percentY = clamp((100 / height) * y);

      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const properties = {
        "--pointer-x": `${percentX}%`,
        "--pointer-y": `${percentY}%`,
        "--background-x": `${adjust(percentX, 0, 100, 35, 65)}%`,
        "--background-y": `${adjust(percentY, 0, 100, 35, 65)}%`,
        "--pointer-from-center": `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        "--pointer-from-top": `${percentY / 100}`,
        "--pointer-from-left": `${percentX / 100}`,
        "--rotate-x": `${round(-(centerX / 6))}deg`,
        "--rotate-y": `${round(centerY / 5)}deg`,
      };

      for (const [k, v] of Object.entries(properties))
        wrap.style.setProperty(k, v);
    };

    const step = (ts) => {
      if (!running) return;
      if (lastTs === 0) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
      const k = 1 - Math.exp(-dt / tau);

      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;

      setVarsFromXY(currentX, currentY);

      const stillFar =
        Math.abs(targetX - currentX) > 0.05 ||
        Math.abs(targetY - currentY) > 0.05;

      if (stillFar || document.hasFocus()) {
        rafId = requestAnimationFrame(step);
      } else {
        running = false;
        lastTs = 0;
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTs = 0;
      rafId = requestAnimationFrame(step);
    };

    return {
      setImmediate(x, y) {
        currentX = x;
        currentY = y;
        setVarsFromXY(currentX, currentY);
      },
      setTarget(x, y) {
        targetX = x;
        targetY = y;
        start();
      },
      toCenter() {
        const shell = shellRef.current;
        if (!shell) return;
        this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
      },
      beginInitial(durationMs) {
        initialUntil = performance.now() + durationMs;
        start();
      },
      getCurrent() {
        return { x: currentX, y: currentY, tx: targetX, ty: targetY };
      },
      cancel() {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        running = false;
        lastTs = 0;
      },
    };
  }, []);

  const getOffsets = (evt, el) => {
    const rect = el.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  };

  const handlePointerMove = useCallback(
    (event) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine || isMobile) return;
      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine, isMobile]
  );

  const handlePointerEnter = useCallback(
    (event) => {
      const shell = shellRef.current;
      if (!shell || !tiltEngine || isMobile) return;

      shell.classList.add("active", "entering");
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      enterTimerRef.current = window.setTimeout(() => {
        shell.classList.remove("entering");
      }, ANIMATION_CONFIG.ENTER_TRANSITION_MS);

      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    },
    [tiltEngine, isMobile]
  );

  const handlePointerLeave = useCallback(() => {
    const shell = shellRef.current;
    if (!shell || !tiltEngine || isMobile) return;

    tiltEngine.toCenter();

    const checkSettle = () => {
      const { x, y, tx, ty } = tiltEngine.getCurrent();
      const settled = Math.hypot(tx - x, ty - y) < 0.6;
      if (settled) {
        shell.classList.remove("active");
        leaveRafRef.current = null;
      } else {
        leaveRafRef.current = requestAnimationFrame(checkSettle);
      }
    };
    if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
    leaveRafRef.current = requestAnimationFrame(checkSettle);
  }, [tiltEngine, isMobile]);

  useEffect(() => {
    if (!tiltEngine || isMobile) return;

    const shell = shellRef.current;
    if (!shell) return;

    shell.addEventListener("pointerenter", handlePointerEnter);
    shell.addEventListener("pointermove", handlePointerMove);
    shell.addEventListener("pointerleave", handlePointerLeave);

    const initialX =
      (shell.clientWidth || 0) - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
    tiltEngine.setImmediate(initialX, initialY);
    tiltEngine.toCenter();
    tiltEngine.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION);

    return () => {
      shell.removeEventListener("pointerenter", handlePointerEnter);
      shell.removeEventListener("pointermove", handlePointerMove);
      shell.removeEventListener("pointerleave", handlePointerLeave);
      if (enterTimerRef.current) window.clearTimeout(enterTimerRef.current);
      if (leaveRafRef.current) cancelAnimationFrame(leaveRafRef.current);
      tiltEngine.cancel();
      shell.classList.remove("entering");
    };
  }, [
    tiltEngine,
    isMobile,
    handlePointerMove,
    handlePointerEnter,
    handlePointerLeave,
  ]);

  const cardVars = {
    "--pointer-x": "50%",
    "--pointer-y": "50%",
    "--pointer-from-center": "0",
    "--pointer-from-top": "0.5",
    "--pointer-from-left": "0.5",
    "--rotate-x": "0deg",
    "--rotate-y": "0deg",
    "--background-x": "50%",
    "--background-y": "50%",
  };

  const shineStyle = {
    filter: "brightness(0.8) contrast(1.1) saturate(0.4) opacity(0.35)",
    mixBlendMode: "color-dodge",
    "--space": "5%",
    "--angle": "-45deg",
    transform: "translate3d(0, 0, 1px)",
    overflow: "hidden",
    zIndex: 3,
    backgroundImage: `
      repeating-linear-gradient(
        0deg,
        color-mix(in srgb, var(--color-primary) 27%, transparent) calc(var(--space) * 1),
        color-mix(in srgb, var(--color-secondary) 27%, transparent) calc(var(--space) * 2),
        color-mix(in srgb, var(--color-accent) 27%, transparent) calc(var(--space) * 3),
        color-mix(in srgb, var(--color-primary) 27%, transparent) calc(var(--space) * 4),
        color-mix(in srgb, var(--color-secondary) 27%, transparent) calc(var(--space) * 5),
        color-mix(in srgb, var(--color-accent) 27%, transparent) calc(var(--space) * 6),
        color-mix(in srgb, var(--color-primary) 27%, transparent) calc(var(--space) * 7)
      ),
      repeating-linear-gradient(
        var(--angle),
        var(--color-bluewhite) 0%,
        hsl(260, 60%, 80%) 3.8%,
        hsl(260, 50%, 85%) 4.5%,
        hsl(260, 60%, 80%) 5.2%,
        var(--color-bluewhite) 10%,
        var(--color-bluewhite) 12%
      ),
      radial-gradient(
        farthest-corner circle at var(--pointer-x) var(--pointer-y),
        hsla(260, 20%, 90%, 0.1) 12%,
        hsla(260, 20%, 80%, 0.15) 20%,
        hsla(260, 20%, 70%, 0.25) 120%
      )
    `.replace(/\s+/g, " "),
    gridArea: "1 / -1",
    borderRadius: "1rem",
    pointerEvents: "none",
  };

  const glareStyle = {
    transform: "translate3d(0, 0, 1.1px)",
    overflow: "hidden",
    backgroundImage: `radial-gradient(
      farthest-corner circle at var(--pointer-x) var(--pointer-y),
      hsl(260, 40%, 90%) 12%,
      hsla(260, 30%, 70%, 0.5) 90%
    )`,
    mixBlendMode: "overlay",
    filter: "brightness(0.9) contrast(1.1)",
    zIndex: 4,
    gridArea: "1 / -1",
    borderRadius: "1rem",
    pointerEvents: "none",
  };

  return (
    <div
      ref={wrapRef}
      className={`relative touch-none ${className}`}
      style={{
        perspective: isMobile ? "none" : "500px",
        transform: "translate3d(0, 0, 0.1px)",
        ...cardVars,
      }}
    >
      {/* Behind glow */}
      {!isMobile && (
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at var(--pointer-x) var(--pointer-y), color-mix(in srgb, var(--color-accent) 40%, transparent) 0%, transparent 50%)",
            filter: "blur(50px) saturate(1.1)",
          }}
        />
      )}
      {isMobile && (
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 60%, color-mix(in srgb, var(--color-accent) 30%, transparent) 0%, transparent 60%)",
            filter: "blur(40px)",
          }}
        />
      )}

      <div ref={shellRef} className="relative z-[1]">
        <section
          className="grid relative overflow-hidden"
          style={{
            aspectRatio: "3/4",
            borderRadius: "1rem",
            boxShadow: isMobile
              ? "0 20px 40px -10px rgba(0, 0, 0, 0.15)"
              : "rgba(0, 0, 0, 0.2) calc((var(--pointer-from-left) * 8px) - 3px) calc((var(--pointer-from-top) * 16px) - 5px) 20px -5px",
            transition: "transform 1s ease",
            transform: "translateZ(0) rotateX(0deg) rotateY(0deg)",
            background:
              "linear-gradient(145deg, var(--color-deep) 0%, var(--color-secondary) 100%)",
          }}
          onMouseEnter={(e) => {
            if (isMobile) return;
            e.currentTarget.style.transition = "none";
            e.currentTarget.style.transform =
              "translateZ(0) rotateX(var(--rotate-y)) rotateY(var(--rotate-x))";
          }}
          onMouseLeave={(e) => {
            if (isMobile) return;
            const shell = shellRef.current;
            e.currentTarget.style.transition = shell?.classList.contains(
              "entering"
            )
              ? "transform 180ms ease-out"
              : "transform 1s ease";
            e.currentTarget.style.transform =
              "translateZ(0) rotateX(0deg) rotateY(0deg)";
          }}
        >
          {/* Inner gradient layer */}
          <div
            className="absolute inset-0"
            style={{
              borderRadius: "1rem",
              display: "grid",
              gridArea: "1 / -1",
            }}
          >
            {/* Full-bleed photo */}
            {avatarUrl && (
              <div
                className="absolute inset-0"
                style={{
                  transform: isMobile ? "none" : "translateZ(2px)",
                  pointerEvents: "none",
                  borderRadius: "1rem",
                  overflow: "hidden",
                }}
              >
                <Image
                  className="object-cover"
                  style={{ objectPosition: "15% center" }}
                  src={avatarUrl}
                  alt={`${name} avatar`}
                  fill
                  sizes="(max-width: 768px) 90vw, 640px"
                  quality={80}
                />
                {/* Gradient overlays for text readability */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(9,11,60,0.55) 0%, rgba(9,11,60,0) 45%, rgba(9,11,60,0) 52%, rgba(9,11,60,0.72) 100%)",
                  }}
                />
              </div>
            )}

            {/* Name + title at top */}
            <div
              className="max-h-full overflow-hidden text-center relative z-[5]"
              style={{
                transform: isMobile
                  ? "none"
                  : "translate3d(calc(var(--pointer-from-left) * -6px + 3px), calc(var(--pointer-from-top) * -6px + 3px), 0.1px)",
                gridArea: "1 / -1",
                borderRadius: "1rem",
                pointerEvents: "none",
              }}
            >
              <div className="w-full absolute flex flex-col top-7 px-5">
                <h3 className="font-bold text-2xl md:text-3xl text-white drop-shadow-md">
                  {name}
                </h3>
                <p className="text-sm font-semibold -mt-0.5 text-white/70">
                  {title}
                </p>
              </div>
            </div>

            {/* Bottom info bar */}
            <div
              className="absolute z-[6] flex items-center justify-center pointer-events-auto bottom-5 left-5 right-5"
              style={{ borderRadius: "0.75rem" }}
            >
              <button
                className="w-full py-3 px-4 text-sm font-bold text-white cursor-pointer transition-all duration-200 hover:-translate-y-px"
                style={{
                  background: "rgba(151, 64, 254, 0.55)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(217, 208, 251, 0.3)",
                  borderRadius: "0.75rem",
                }}
                onClick={onContactClick}
                type="button"
              >
                {contactText}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

"use client";

import { useCallback, useEffect, useMemo, useRef, useState, memo } from "react";
import Image from "next/image";

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2,
};

const cx = (...parts) => parts.filter(Boolean).join(" ");

const LogoLoop = memo(function LogoLoop({
  logos,
  speed = 120,
  direction = "left",
  logoHeight = 28,
  gap = 32,
  hoverSpeed,
  pauseOnHover,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  ariaLabel = "Partner logos",
  className,
}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const seqRef = useRef(null);

  const [seqWidth, setSeqWidth] = useState(0);
  const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const effectiveHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) return hoverSpeed;
    if (pauseOnHover === true) return 0;
    return undefined;
  }, [hoverSpeed, pauseOnHover]);

  const targetVelocity = useMemo(() => {
    const magnitude = Math.abs(speed);
    const dirMultiplier = direction === "left" ? 1 : -1;
    return magnitude * dirMultiplier;
  }, [speed, direction]);

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const sequenceWidth = seqRef.current?.getBoundingClientRect()?.width ?? 0;
    if (sequenceWidth > 0) {
      setSeqWidth(Math.ceil(sequenceWidth));
      const copiesNeeded =
        Math.ceil(containerWidth / sequenceWidth) +
        ANIMATION_CONFIG.COPY_HEADROOM;
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
    }
  }, []);

  // Resize observer
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => updateDimensions();
      window.addEventListener("resize", handleResize);
      updateDimensions();
      return () => window.removeEventListener("resize", handleResize);
    }

    const observers = [];
    [containerRef, seqRef].forEach((ref) => {
      if (ref.current) {
        const observer = new ResizeObserver(updateDimensions);
        observer.observe(ref.current);
        observers.push(observer);
      }
    });
    updateDimensions();
    return () => observers.forEach((o) => o.disconnect());
  }, [updateDimensions, logos, gap, logoHeight]);

  // Image loader
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll("img") ?? [];
    if (images.length === 0) {
      updateDimensions();
      return;
    }
    let remaining = images.length;
    const onLoad = () => {
      remaining -= 1;
      if (remaining === 0) updateDimensions();
    };
    images.forEach((img) => {
      if (img.complete) {
        onLoad();
      } else {
        img.addEventListener("load", onLoad, { once: true });
        img.addEventListener("error", onLoad, { once: true });
      }
    });
    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", onLoad);
        img.removeEventListener("error", onLoad);
      });
    };
  }, [updateDimensions, logos, gap, logoHeight]);

  // Persist animation state across re-renders
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const isHoveredRef = useRef(false);
  const targetVelocityRef = useRef(targetVelocity);
  const effectiveHoverSpeedRef = useRef(effectiveHoverSpeed);
  const seqWidthRef = useRef(seqWidth);

  useEffect(() => {
    targetVelocityRef.current = targetVelocity;
  }, [targetVelocity]);
  useEffect(() => {
    effectiveHoverSpeedRef.current = effectiveHoverSpeed;
  }, [effectiveHoverSpeed]);
  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);
  useEffect(() => {
    seqWidthRef.current = seqWidth;
  }, [seqWidth]);

  // Animation loop — only tears down on mount/unmount
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      track.style.transform = "translate3d(0, 0, 0)";
      return;
    }

    let rafId = null;
    let lastTimestamp = null;

    const animate = (timestamp) => {
      if (lastTimestamp === null) lastTimestamp = timestamp;
      const dt = Math.max(0, timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      const sw = seqWidthRef.current;
      const target =
        isHoveredRef.current && effectiveHoverSpeedRef.current !== undefined
          ? effectiveHoverSpeedRef.current
          : targetVelocityRef.current;
      const easingFactor = 1 - Math.exp(-dt / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      if (sw > 0) {
        offsetRef.current =
          (((offsetRef.current + velocityRef.current * dt) % sw) + sw) % sw;
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleMouseEnter = useCallback(() => {
    if (effectiveHoverSpeed !== undefined) setIsHovered(true);
  }, [effectiveHoverSpeed]);

  const handleMouseLeave = useCallback(() => {
    if (effectiveHoverSpeed !== undefined) setIsHovered(false);
  }, [effectiveHoverSpeed]);

  const cssVariables = useMemo(
    () => ({
      "--logoloop-gap": `${gap}px`,
      "--logoloop-logoHeight": `${logoHeight}px`,
      ...(fadeOutColor && { "--logoloop-fadeColor": fadeOutColor }),
    }),
    [gap, logoHeight, fadeOutColor],
  );

  const renderLogoItem = useCallback(
    (item, key) => (
      <li
        className={cx(
          "flex-none mr-[var(--logoloop-gap)]",
          scaleOnHover && "overflow-visible group/item",
          item.className,
        )}
        key={key}
        role="listitem"
      >
        <Image
          className={cx(
            "h-[var(--logoloop-logoHeight)] w-auto block object-contain",
            "pointer-events-none",
            "motion-reduce:transition-none",
            scaleOnHover &&
              "transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-110",
          )}
          src={item.src}
          alt={item.alt ?? ""}
          title={item.title}
          width={item.width ?? 120}
          height={logoHeight}
          draggable={false}
        />
      </li>
    ),
    [scaleOnHover],
  );

  const logoLists = useMemo(
    () =>
      Array.from({ length: copyCount }, (_, copyIndex) => (
        <ul
          className="flex items-center"
          key={`copy-${copyIndex}`}
          role="list"
          aria-hidden={copyIndex > 0}
          ref={copyIndex === 0 ? seqRef : undefined}
        >
          {logos.map((item, itemIndex) =>
            renderLogoItem(item, `${copyIndex}-${itemIndex}`),
          )}
        </ul>
      )),
    [copyCount, logos, renderLogoItem],
  );

  return (
    <div
      ref={containerRef}
      className={cx(
        "relative group overflow-hidden",
        scaleOnHover && "py-[calc(var(--logoloop-logoHeight)*0.8)]",
        className,
      )}
      style={cssVariables}
      role="region"
      aria-label={ariaLabel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {fadeOut && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[clamp(24px,8%,120px)] bg-[linear-gradient(to_right,var(--logoloop-fadeColor,var(--color-base))_0%,rgba(0,0,0,0)_100%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[clamp(24px,8%,120px)] bg-[linear-gradient(to_left,var(--logoloop-fadeColor,var(--color-base))_0%,rgba(0,0,0,0)_100%)]"
          />
        </>
      )}

      <div
        className="flex flex-row w-max will-change-transform select-none relative z-0 motion-reduce:transform-none"
        ref={trackRef}
      >
        {logoLists}
      </div>
    </div>
  );
});

LogoLoop.displayName = "LogoLoop";

export default LogoLoop;

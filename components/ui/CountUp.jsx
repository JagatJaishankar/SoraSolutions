"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export default function CountUp({
  from = 0,
  to,
  duration = 2,
  separator = "",
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
  onComplete,
}) {
  const ref = useRef(null);
  const motionValue = useMotionValue(from);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 300,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      motionValue.set(to);
      hasAnimated.current = true;
    }
  }, [isInView, to, motionValue]);

  // React to `to` changes after initial animation
  useEffect(() => {
    if (hasAnimated.current) {
      motionValue.set(to);
    }
  }, [to, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        let formatted =
          decimals > 0
            ? latest.toFixed(decimals)
            : Math.round(latest).toString();

        if (separator) {
          const [intPart, decPart] = formatted.split(".");
          const withSeparator = intPart.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            separator
          );
          formatted = decPart ? `${withSeparator}.${decPart}` : withSeparator;
        }

        ref.current.textContent = `${prefix}${formatted}${suffix}`;

        if (Math.round(latest) === to && onComplete) {
          onComplete();
        }
      }
    });

    return () => unsubscribe();
  }, [springValue, separator, prefix, suffix, decimals, to, onComplete]);

  return <span ref={ref} className={className} />;
}

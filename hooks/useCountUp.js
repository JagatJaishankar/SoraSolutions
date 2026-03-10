"use client";

import { useState, useEffect, useRef } from "react";

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export default function useCountUp(target, duration = 2000, trigger = false) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!trigger) return;

    let startTime = null;

    const step = (timestamp) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);

      setValue(Math.round(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [trigger, target, duration]);

  return value;
}

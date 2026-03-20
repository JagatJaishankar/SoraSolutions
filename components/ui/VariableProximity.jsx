"use client";

import { useRef, useEffect, useMemo, useCallback, forwardRef } from "react";

const VariableProximity = forwardRef(
  (
    {
      label,
      fromFontVariationSettings = "'wght' 400",
      toFontVariationSettings = "'wght' 900",
      containerRef,
      radius = 100,
      falloff = "gaussian",
      className,
      onClick,
      style,
    },
    ref
  ) => {
    const letterRefs = useRef([]);
    const rafRef = useRef(null);
    const mousePos = useRef({ x: -9999, y: -9999 });

    const parseFVS = useCallback((str) => {
      const map = {};
      const regex = /'([^']+)'\s+([\d.]+)/g;
      let match;
      while ((match = regex.exec(str)) !== null) {
        map[match[1]] = parseFloat(match[2]);
      }
      return map;
    }, []);

    const fromSettings = useMemo(
      () => parseFVS(fromFontVariationSettings),
      [fromFontVariationSettings, parseFVS]
    );
    const toSettings = useMemo(
      () => parseFVS(toFontVariationSettings),
      [toFontVariationSettings, parseFVS]
    );

    const interpolate = useCallback(
      (from, to, t) => from + (to - from) * t,
      []
    );

    const getFalloffValue = useCallback(
      (distance) => {
        const d = Math.max(0, Math.min(1, distance / radius));
        if (falloff === "linear") return 1 - d;
        if (falloff === "exponential") return Math.pow(1 - d, 2);
        if (falloff === "gaussian") return Math.exp(-((d * 3) ** 2) / 2);
        return 1 - d;
      },
      [radius, falloff]
    );

    const updateLetters = useCallback(() => {
      letterRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.sqrt(
          (mousePos.current.x - cx) ** 2 + (mousePos.current.y - cy) ** 2
        );
        const t = getFalloffValue(dist);

        const fvs = Object.keys(fromSettings)
          .map((axis) => {
            const value = interpolate(fromSettings[axis], toSettings[axis], t);
            return `'${axis}' ${value.toFixed(1)}`;
          })
          .join(", ");

        el.style.fontVariationSettings = fvs;
      });

      rafRef.current = requestAnimationFrame(updateLetters);
    }, [fromSettings, toSettings, getFalloffValue, interpolate]);

    useEffect(() => {
      const container = containerRef?.current;
      if (!container) return;

      const onMove = (e) => {
        mousePos.current = { x: e.clientX, y: e.clientY };
      };
      const onLeave = () => {
        mousePos.current = { x: -9999, y: -9999 };
      };

      container.addEventListener("mousemove", onMove);
      container.addEventListener("mouseleave", onLeave);
      rafRef.current = requestAnimationFrame(updateLetters);

      return () => {
        container.removeEventListener("mousemove", onMove);
        container.removeEventListener("mouseleave", onLeave);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }, [containerRef, updateLetters]);

    const letters = useMemo(
      () =>
        label.split("").map((char, i) => (
          <span
            key={i}
            ref={(el) => (letterRefs.current[i] = el)}
            style={{ fontVariationSettings: fromFontVariationSettings, display: "inline-block" }}
            aria-hidden="true"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        )),
      [label, fromFontVariationSettings]
    );

    return (
      <span
        ref={ref}
        className={className}
        onClick={onClick}
        style={style}
        aria-label={label}
      >
        {letters}
      </span>
    );
  }
);

VariableProximity.displayName = "VariableProximity";
export default VariableProximity;

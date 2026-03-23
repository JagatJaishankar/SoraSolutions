"use client";

import { useRef, useEffect, useCallback } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ElectricBorder({
  children,
  color = "#9740fe",
  borderRadius = 16,
  chaos = 0.08,
  speed = 0.8,
  intensity = 1,
  className,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const timeRef = useRef(0);
  const isVisibleRef = useRef(false);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    timeRef.current += 0.016 * speed;
    const t = timeRef.current;

    const r = borderRadius;
    const padding = 2;
    const x = padding;
    const y = padding;
    const w = width - padding * 2;
    const h = height - padding * 2;

    const points = [];
    const segments = 200;

    for (let i = 0; i <= segments; i++) {
      const progress = i / segments;
      const perimeter = 2 * (w - 2 * r) + 2 * (h - 2 * r) + 2 * Math.PI * r;
      const dist = progress * perimeter;

      let px, py;

      const topLen = w - 2 * r;
      const trLen = (Math.PI / 2) * r;
      const rightLen = h - 2 * r;
      const brLen = (Math.PI / 2) * r;
      const bottomLen = w - 2 * r;
      const blLen = (Math.PI / 2) * r;
      const leftLen = h - 2 * r;

      if (dist <= topLen) {
        px = x + r + dist;
        py = y;
      } else if (dist <= topLen + trLen) {
        const angle = (dist - topLen) / r - Math.PI / 2;
        px = x + w - r + Math.cos(angle) * r;
        py = y + r + Math.sin(angle) * r;
      } else if (dist <= topLen + trLen + rightLen) {
        px = x + w;
        py = y + r + (dist - topLen - trLen);
      } else if (dist <= topLen + trLen + rightLen + brLen) {
        const angle = (dist - topLen - trLen - rightLen) / r;
        px = x + w - r + Math.cos(angle) * r;
        py = y + h - r + Math.sin(angle) * r;
      } else if (dist <= topLen + trLen + rightLen + brLen + bottomLen) {
        px = x + w - r - (dist - topLen - trLen - rightLen - brLen);
        py = y + h;
      } else if (dist <= topLen + trLen + rightLen + brLen + bottomLen + blLen) {
        const angle =
          (dist - topLen - trLen - rightLen - brLen - bottomLen) / r +
          Math.PI / 2;
        px = x + r + Math.cos(angle) * r;
        py = y + h - r + Math.sin(angle) * r;
      } else if (
        dist <=
        topLen + trLen + rightLen + brLen + bottomLen + blLen + leftLen
      ) {
        px = x;
        py =
          y + h - r - (dist - topLen - trLen - rightLen - brLen - bottomLen - blLen);
      } else {
        const angle =
          (dist -
            topLen -
            trLen -
            rightLen -
            brLen -
            bottomLen -
            blLen -
            leftLen) /
            r +
          Math.PI;
        px = x + r + Math.cos(angle) * r;
        py = y + r + Math.sin(angle) * r;
      }

      const noiseX =
        Math.sin(progress * 20 + t * 3) *
        chaos *
        10 *
        Math.sin(progress * 7 + t);
      const noiseY =
        Math.cos(progress * 20 + t * 3) *
        chaos *
        10 *
        Math.cos(progress * 7 + t);

      points.push({ x: px + noiseX, y: py + noiseY, progress });
    }

    for (let layer = 0; layer < 3; layer++) {
      const alpha = layer === 0 ? 0.3 * intensity : layer === 1 ? 0.6 * intensity : 1 * intensity;
      const lineWidth = layer === 0 ? 4 : layer === 1 ? 2 : 1;

      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (layer === 0) {
        ctx.shadowColor = color;
        ctx.shadowBlur = 15;
      } else {
        ctx.shadowColor = "transparent";
        ctx.shadowBlur = 0;
      }

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        if (i === 0) {
          ctx.moveTo(p.x, p.y);
        } else {
          const prev = points[i - 1];
          const cpx = (prev.x + p.x) / 2;
          const cpy = (prev.y + p.y) / 2;
          ctx.quadraticCurveTo(prev.x, prev.y, cpx, cpy);
        }
      }

      ctx.stroke();
    }

    ctx.globalAlpha = 1;
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;

    if (isVisibleRef.current) {
      animationRef.current = requestAnimationFrame(draw);
    }
  }, [color, borderRadius, chaos, speed, intensity]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisibleRef.current = true;
          animationRef.current = requestAnimationFrame(draw);
        } else {
          isVisibleRef.current = false;
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
          }
        }
      },
      { threshold: 0 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [draw]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
      />
      {children}
    </div>
  );
}

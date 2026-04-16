"use client";

import { useEffect, useRef } from "react";

export const GradientBackground = () => {
  const interRef = useRef(null);

  useEffect(() => {
    const interBubble = interRef.current;
    if (!interBubble) return;

    let curX = 0,
      curY = 0,
      tgX = 0,
      tgY = 0;
    let animId;

    const move = () => {
      curX += (tgX - curX) / 20;
      curY += (tgY - curY) / 20;
      interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      if (Math.abs(tgX - curX) > 0.5 || Math.abs(tgY - curY) > 0.5) {
        animId = requestAnimationFrame(move);
      } else {
        animId = null;
      }
    };

    const handleMouseMove = (e) => {
      tgX = e.clientX;
      tgY = e.clientY;
      if (!animId) animId = requestAnimationFrame(move);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animId = requestAnimationFrame(move);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="gradient-bg overflow-hidden" style={{ contain: "paint" }}>
      <div className="opacity-50 absolute inset-0 w-full h-full">
        <svg className="absolute top-0 left-0 w-0 h-0" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        <div className="gradients-container">
          <div className="g1" />
          <div className="g2" />
          <div className="g3" />
          <div className="g4" />
          <div className="g5" />
          <div ref={interRef} className="interactive" />
        </div>
      </div>
    </div>
  );
};

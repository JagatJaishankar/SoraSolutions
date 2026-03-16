"use client";

import { useState, useEffect } from "react";

function tooClose(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy) < 20;
}

const generateLogos = () => {
  const logos = [];
  let attempts = 0;
  while (logos.length < 5 && attempts < 100) {
    const candidate = {
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      size: Math.random() * 88 + 40,
      rotation: Math.random() * 90 - 45,
      opacity: Math.random() * 0.12 + 0.12,
    };
    if (logos.every((l) => !tooClose(candidate, l))) {
      logos.push(candidate);
    }
    attempts++;
  }
  return logos;
};

export default function FloatingLogos() {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    setLogos(generateLogos());
  }, []);

  if (logos.length === 0) return null;

  return (
    <div className="fixed inset-0 z-[2] pointer-events-none overflow-hidden">
      {logos.map((logo, i) => (
        <img
          key={i}
          src="/images/purple-s.svg"
          alt=""
          className="absolute"
          style={{
            left: `${logo.x}%`,
            top: `${logo.y}%`,
            width: `${logo.size}px`,
            height: "auto",
            transform: `rotate(${logo.rotation}deg)`,
            opacity: logo.opacity,
          }}
        />
      ))}
    </div>
  );
}

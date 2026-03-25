"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

function tooClose(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy) < 20;
}

const generateLogos = () => {
  const isMobile = window.innerWidth < 768;
  const maxSize = isMobile ? 80 : 128;
  const minSize = isMobile ? 30 : 40;

  const logos = [];
  let attempts = 0;
  while (logos.length < 5 && attempts < 100) {
    const candidate = {
      x: Math.random() * 60 + 10,
      y: Math.random() * 80 + 10,
      size: Math.random() * (maxSize - minSize) + minSize,
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
    <div className="fixed top-0 left-0 w-full h-full z-[2] pointer-events-none overflow-hidden">
      {logos.map((logo, i) => (
        <Image
          key={i}
          src="/images/purple-s.svg"
          alt=""
          width={Math.round(logo.size)}
          height={Math.round(logo.size)}
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

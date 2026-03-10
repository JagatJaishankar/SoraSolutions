"use client";

import { useState, useCallback } from "react";

export default function FlipCard({
  icon: Icon,
  title,
  frontTeaser,
  backCopy,
  backFooter,
  className = "",
}) {
  const [tapped, setTapped] = useState(false);

  const handleClick = useCallback((e) => {
    // Only toggle on mobile (< 768px) — desktop uses CSS hover
    if (window.matchMedia("(max-width: 767px)").matches) {
      setTapped((prev) => !prev);
    }
  }, []);

  return (
    <div
      className={`perspective-[1000px] h-[360px] group cursor-pointer ${className}`}
      onClick={handleClick}
    >
      <div
        className={`relative w-full h-full transition-transform duration-[600ms] [transform-style:preserve-3d] md:group-hover:[transform:rotateY(180deg)] ${
          tapped ? "max-md:[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front Face */}
        <div className="absolute inset-0 [backface-visibility:hidden] bg-white/50 backdrop-blur-xl border border-white/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#2362fd] to-[#fd6600] flex items-center justify-center mb-5">
            <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-extrabold tracking-tight text-black mb-3">
            {title}
          </h3>
          <p className="text-base font-light tracking-wide text-black/60 leading-relaxed">
            {frontTeaser}
          </p>
          <p className="mt-5 text-sm font-medium text-black/40 hidden md:block">
            Hover to read more
          </p>
          <p className="mt-5 text-sm font-medium text-black/40 md:hidden">
            Tap to read more
          </p>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white/50 backdrop-blur-xl border border-white/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
          <p className="text-base font-light tracking-wide text-black/70 leading-relaxed mb-6">
            {backCopy}
          </p>
          <p className="text-sm font-bold bg-gradient-to-r from-[#2362fd] to-[#fd6600] bg-clip-text text-transparent">
            {backFooter}
          </p>
        </div>
      </div>
    </div>
  );
}

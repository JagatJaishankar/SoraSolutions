"use client";

import { useState, useCallback } from "react";

export default function FlipCard({
  icon: Icon,
  title,
  frontTeaser,
  backCopy,
  backFooter,
  className = "",
  frontBg = "bg-white/80",
  frontBorder = "border-white/20",
  frontTextColor = "text-black",
  frontDescColor = "text-black/60",
  frontHintColor = "text-black/40",
  backBg = "bg-white/80",
  backBorder = "border-white/20",
  backTextColor = "text-black/70",
  iconBg = "bg-gradient-to-br from-primary to-secondary",
  iconColor = "text-white",
}) {
  const [tapped, setTapped] = useState(false);

  const handleClick = useCallback(() => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      setTapped((prev) => !prev);
    }
  }, []);

  return (
    <div
      className={`perspective-[800px] h-[360px] group cursor-pointer ${className}`}
      onClick={handleClick}
    >
      <div
        className={`relative w-full h-full [transition:transform_800ms_cubic-bezier(0.4,0,0.2,1)] [transform-style:preserve-3d] md:group-hover:[transform:rotateY(180deg)] ${
          tapped ? "max-md:[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front Face */}
        <div className={`absolute inset-0 [backface-visibility:hidden] ${frontBg} backdrop-blur-xl border ${frontBorder} rounded-2xl p-8 flex flex-col items-center justify-center text-center`}>
          <div className={`w-14 h-14 rounded-xl ${iconBg} flex items-center justify-center mb-5`}>
            <Icon className={`w-7 h-7 ${iconColor}`} strokeWidth={1.5} />
          </div>
          <h3 className={`text-xl font-extrabold tracking-tight ${frontTextColor} mb-3`}>
            {title}
          </h3>
          <p className={`text-base font-light tracking-wide ${frontDescColor} leading-relaxed`}>
            {frontTeaser}
          </p>
          <p className={`mt-5 text-sm font-medium ${frontHintColor} hidden md:block`}>
            Hover to read more
          </p>
          <p className={`mt-5 text-sm font-medium ${frontHintColor} md:hidden`}>
            Tap to read more
          </p>
        </div>

        {/* Back Face */}
        <div className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] ${backBg} backdrop-blur-xl border ${backBorder} rounded-2xl p-8 flex flex-col items-center justify-center text-center`}>
          <p className={`text-base font-light tracking-wide ${backTextColor} leading-relaxed mb-6`}>
            {backCopy}
          </p>
          <p className="text-sm font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {backFooter}
          </p>
        </div>
      </div>
    </div>
  );
}

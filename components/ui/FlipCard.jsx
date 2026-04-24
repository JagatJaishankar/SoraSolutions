"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

export default function FlipCard({
  icon: Icon,
  title,
  frontTeaser,
  backCopy,
  backFooter,
  className = "",
  frontImage,
  imageAlt,
  frontBg = "bg-white",
  frontBorder = "border-gray-200",
  frontTextColor = "text-black",
  frontDescColor = "text-black/60",
  frontHintColor = "text-black/40",
  backBg = "bg-white",
  backBorder = "border-gray-200",
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
      className={`perspective-[800px] h-[420px] group cursor-pointer ${className}`}
      onClick={handleClick}
    >
      <div
        className={`relative w-full h-full [transition:transform_800ms_cubic-bezier(0.4,0,0.2,1)] [transform-style:preserve-3d] md:group-hover:[transform:rotateY(180deg)] ${
          tapped ? "max-md:[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Front Face */}
        <div className={`absolute inset-0 [backface-visibility:hidden] border ${frontBorder} rounded-2xl flex flex-col overflow-hidden ${frontBg}`}>
          {/* Image Area */}
          {frontImage && (
            <div className="h-[58%] w-full relative bg-white">
              <Image
                src={frontImage}
                alt={imageAlt || title}
                fill
                className="object-contain p-5"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          )}
          {/* Text Area */}
          <div className="flex-1 flex flex-col items-start justify-center px-6 py-5">
            {!frontImage && Icon && (
              <div className={`w-14 h-14 rounded-xl ${iconBg} flex items-center justify-center mb-4`}>
                <Icon className={`w-7 h-7 ${iconColor}`} strokeWidth={1.5} />
              </div>
            )}
            <h3 className={`text-lg font-extrabold tracking-tight ${frontTextColor} mb-2`}>
              {title}
            </h3>
            <p className={`text-sm font-light tracking-wide ${frontDescColor} leading-relaxed line-clamp-3 mb-3`}>
              {frontTeaser}
            </p>
            <p className={`text-xs font-medium ${frontHintColor} hidden md:block`}>
              Hover to read more
            </p>
            <p className={`text-xs font-medium ${frontHintColor} md:hidden`}>
              Tap to read more
            </p>
          </div>
        </div>

        {/* Back Face */}
        <div className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] border ${backBorder} rounded-2xl flex flex-col overflow-hidden ${backBg}`}>
          {/* Image Area */}
          {frontImage && (
            <div className="h-[58%] w-full relative bg-white">
              <Image
                src={frontImage}
                alt={imageAlt || title}
                fill
                className="object-contain p-5"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          )}
          {/* Text Area */}
          <div className="flex-1 flex flex-col items-start justify-center px-6 py-5">
            <p className={`text-sm font-light tracking-wide ${backTextColor} leading-relaxed line-clamp-5`}>
              {backCopy}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

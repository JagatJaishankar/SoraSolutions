"use client";

import { useState, useRef, useCallback } from "react";
import { GripVertical } from "lucide-react";
import ElectricBorder from "@/components/ui/ElectricBorder";

export default function BeforeAfterSlider({ beforeContent, afterContent }) {
  const containerRef = useRef(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const { left, width } = containerRef.current.getBoundingClientRect();
    const pct = ((clientX - left) / width) * 100;
    setSliderPos(Math.max(2, Math.min(98, pct)));
  }, []);

  const handlePointerDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    if (e.target) e.target.setPointerCapture?.(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    updatePosition(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    updatePosition(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <ElectricBorder
      color="#9740fe"
      borderRadius={16}
      chaos={0.08}
      speed={0.8}
      className="w-full overflow-hidden"
    >
      <div
        ref={containerRef}
        className="aspect-[4/3] rounded-2xl overflow-hidden relative select-none cursor-ew-resize"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Before layer */}
        <div className="absolute inset-0 bg-[#faf9ff] flex items-center justify-center p-4 sm:p-6">
          <span className="text-black/40 text-xs sm:text-sm font-medium text-center">
            {beforeContent}
          </span>
        </div>

        {/* After layer (clipped) */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#d9d0fb] to-[#9740fe]/20 flex items-center justify-center p-4 sm:p-6"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <span className="text-primary text-xs sm:text-sm font-medium text-center">
            {afterContent}
          </span>
        </div>

        {/* Labels */}
        <span className="absolute top-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
          Before
        </span>
        <span className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
          After
        </span>

        {/* Divider line + handle */}
        <div
          className="absolute top-0 bottom-0 z-10 touch-none"
          style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
          onPointerDown={handlePointerDown}
          onTouchStart={handleTouchStart}
        >
          <div className="w-[2px] h-full bg-white shadow-[0_0_8px_rgba(0,0,0,0.3)] mx-auto" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
            <GripVertical className="text-black/40" size={18} />
          </div>
        </div>
      </div>
    </ElectricBorder>
  );
}

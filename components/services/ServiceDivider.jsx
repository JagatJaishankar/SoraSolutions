"use client";

import ScrollVelocity from "@/components/ui/ScrollVelocity";

export default function ServiceDivider({ topText, bottomText }) {
  return (
    <div className="py-4 sm:py-6 overflow-hidden">
      <ScrollVelocity
        texts={[topText, bottomText]}
        velocity={80}
        className="font-extrabold text-3xl sm:text-5xl md:text-6xl tracking-tight text-[#9740fe]/[0.08]"
        numCopies={4}
        damping={50}
        stiffness={400}
      />
    </div>
  );
}

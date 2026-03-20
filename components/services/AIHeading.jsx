"use client";

import { useRef } from "react";
import VariableProximity from "@/components/ui/VariableProximity";

export default function AIHeading() {
  const containerRef = useRef(null);

  return (
    <div ref={containerRef} className="cursor-default mb-2">
      <VariableProximity
        label="AI & Automation Intelligence"
        fromFontVariationSettings="'wght' 600"
        toFontVariationSettings="'wght' 1000"
        containerRef={containerRef}
        radius={100}
        falloff="gaussian"
        className="font-[family-name:var(--font-roboto-flex)] text-3xl sm:text-4xl tracking-tight text-black"
      />
    </div>
  );
}

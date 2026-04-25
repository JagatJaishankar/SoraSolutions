"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const dashboards = [
  {
    title: "Workflow Automation",
    rotate: "-6deg",
    image: "/images/home-page/00-automation-flow.webp",
    defaultZ: "z-10",
  },
  {
    title: "Marketing Dashboard",
    rotate: "3deg",
    image: "/images/home-page/00-revenue-reporting-chart.webp",
    defaultZ: "z-20",
  },
  {
    title: "Lead Pipeline",
    rotate: "-3deg",
    image: "/images/home-page/00-pipeline-board.webp",
    defaultZ: "z-10",
  },
];

function Card({ item, isMobile }) {
  return (
    <div
      className="group relative transition-all duration-500 md:hover:scale-105 md:brightness-[0.78] md:hover:brightness-100"
      style={isMobile ? undefined : { transform: `rotate(${item.rotate})` }}
    >
      <div className="rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 md:group-hover:rotate-0">
        <Image
          src={item.image}
          alt={item.title}
          width={960}
          height={720}
          className="w-full h-auto object-contain block"
        />
      </div>

      {/* Label */}
      <div className="text-center mt-4 md:absolute md:bottom-[-22px] md:left-1/2 md:-translate-x-1/2 md:mt-0">
        <span className="bg-[#9740fe] text-white text-sm font-semibold px-4 py-2 rounded-full md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 whitespace-nowrap inline-block shadow-md">
          {item.title}
        </span>
      </div>
    </div>
  );
}

export default function WhatYouGet() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section ref={sectionRef} className="py-[100px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-extrabold tracking-tight text-black">
            This Is What&apos;s Working For You — 24/7
          </h2>
          <p className="mt-4 text-lg font-light tracking-wide text-black/60 max-w-2xl mx-auto">
            Every Sora client gets a fully configured system. Here&apos;s what it looks like from the inside.
          </p>
        </div>

        {/* Overlapping cards */}
        <div
          className="hidden md:flex items-center justify-center pb-12"
        >
          {dashboards.map((item, i) => (
            <motion.div
              key={item.title}
              className={`w-[42%] shrink-0 relative ${item.defaultZ} hover:z-30 ${i > 0 ? "-ml-14" : ""}`}
              initial={{ y: 40, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.15 }}
            >
              <Card item={item} isMobile={false} />
            </motion.div>
          ))}
        </div>

        {/* Mobile: stacked normally */}
        <div className="flex flex-col gap-8 md:hidden pb-8">
          {dashboards.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
            >
              <Card item={item} isMobile={true} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

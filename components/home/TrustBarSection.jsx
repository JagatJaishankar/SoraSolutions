"use client";

import { motion } from "framer-motion";
import LogoLoop from "@/components/ui/LogoLoop";

const logos = [
  {
    src: "/images/logos/google.png",
    alt: "Google",
    title: "Google",
    className: "scale-[1.5] mr-6 ml-3",
  },
  {
    src: "/images/logos/meta.png",
    alt: "Meta",
    title: "Meta",
    className: "scale-[2.5] mx-14",
  },
  {
    src: "/images/logos/gohighlevel.png",
    alt: "GoHighLevel",
    title: "GoHighLevel",
    className: "scale-125 mx-6",
  },
  {
    src: "/images/logos/vercel.png",
    alt: "Vercel",
    title: "Vercel",
    className: "scale-90",
  },
  {
    src: "/images/logos/nextjs.png",
    alt: "Next.js",
    title: "Next.js",
    className: "scale-90",
  },
  {
    src: "/images/logos/Notion.png",
    alt: "Notion",
    title: "Notion",
    className: "scale-[1.2] mx-4",
  },
  {
    src: "/images/logos/claude.png",
    alt: "Claude",
    title: "Claude",
    className: "scale-90",
  },
  {
    src: "/images/logos/airwallex.png",
    alt: "Airwallex",
    title: "Airwallex",
    className: "scale-80 mx-[-10]",
  },
];

export default function TrustBarSection() {
  return (
    <motion.section
      className="w-full py-20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <p className="text-sm text-black/60 text-center tracking-wider mb-8 uppercase">
        Powered by industry-leading platforms
      </p>

      <div>
        <LogoLoop
          logos={logos}
          speed={100}
          direction="left"
          logoHeight={36}
          gap={80}
          hoverSpeed={20}
          scaleOnHover
          fadeOut={false}
          ariaLabel="Technology partners"
        />
      </div>
    </motion.section>
  );
}

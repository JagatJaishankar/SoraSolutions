"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { getPillarArticles } from "@/lib/blogData";

export default function FeaturedArticles() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const pillars = getPillarArticles();

  return (
    <section className="py-[100px] bg-[#faf9ff] shadow-[inset_0_8px_16px_-8px_rgba(0,0,0,0.06),inset_0_-8px_16px_-8px_rgba(0,0,0,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold tracking-tight text-black">
            Complete Guides
          </h2>
          <p className="text-lg font-light tracking-wide text-black/60 mt-4 max-w-2xl mx-auto">
            In-depth pillar guides covering everything you need to know about
            each topic.
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {pillars.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ y: 30, opacity: 0 }}
              animate={
                isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }
              }
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="cursor-pointer"
            >
              <Link href={`/blog/${article.slug}`} className="block">
                <div className="relative overflow-hidden rounded-2xl h-[300px] hover:shadow-xl transition-shadow duration-300">
                  <Image
                    fill
                    className="object-cover"
                    src={article.image}
                    alt={article.title}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.82) 65%, rgba(0,0,0,0.96) 100%)" }} />
                  <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {article.category}
                      </span>
                      <span className="bg-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Complete Guide
                      </span>
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-white mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-xs text-white/50">
                        <Clock size={12} />
                        {article.readTime}
                      </span>
                      <span className="text-sm text-[#d9d0fb] font-medium inline-flex items-center gap-1">
                        Read guide <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

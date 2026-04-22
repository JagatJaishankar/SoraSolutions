"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { getAllArticles, CATEGORIES } from "@/lib/blogData";

export default function BlogGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const allArticles = getAllArticles();
  const filtered =
    activeCategory === "All"
      ? allArticles
      : allArticles.filter((a) => a.category === activeCategory);

  return (
    <section className="py-[100px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold tracking-tight text-black">
            All Articles
          </h2>
          <p className="text-lg font-light tracking-wide text-black/60 mt-4 max-w-2xl mx-auto">
            Browse by topic or read them all.
          </p>
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 md:max-w-[800px] md:mx-auto">
          <button
            type="button"
            onClick={() => setActiveCategory("All")}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
              activeCategory === "All"
                ? "bg-[#9740fe] text-white"
                : "bg-[#d9d0fb] text-[#9740fe] hover:bg-[#9740fe]/20"
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-[#9740fe] text-white"
                  : "bg-[#d9d0fb] text-[#9740fe] hover:bg-[#9740fe]/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ y: 20, opacity: 0 }}
              animate={
                isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }
              }
              transition={{ delay: Math.min(i * 0.05, 0.5), duration: 0.4 }}
              whileHover={{ y: -4 }}
            >
              <Link href={`/blog/${article.slug}`} className="block">
                <div className="relative overflow-hidden rounded-2xl h-[240px] hover:shadow-xl transition-shadow duration-300">
                  <Image
                    fill
                    className="object-cover"
                    src={article.image}
                    alt={article.title}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,0.97) 100%)" }} />
                  <div className="relative z-10 p-6 flex flex-col h-full justify-end">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {article.category}
                      </span>
                      {article.type === "pillar" && (
                        <span className="bg-white/10 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                          Guide
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold tracking-tight text-white mb-1 line-clamp-2">
                      {article.title}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className="flex items-center gap-1 text-xs text-white/50">
                        <Clock size={12} />
                        {article.readTime}
                      </span>
                      <span className="text-sm text-[#d9d0fb] font-medium inline-flex items-center gap-1">
                        Read <ArrowRight size={14} />
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

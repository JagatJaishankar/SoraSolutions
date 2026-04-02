"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
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
            >
              <Link href={`/blog/${article.slug}`} className="block h-full">
                <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 h-full hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-[#d9d0fb] text-[#9740fe] text-xs font-semibold px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                    {article.type === "pillar" && (
                      <span className="bg-[#090b3c] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                        Guide
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-black mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm font-light tracking-wide text-black/60 mb-4 flex-grow line-clamp-2">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="flex items-center gap-1 text-xs text-black/40">
                      <Clock size={12} />
                      {article.readTime}
                    </span>
                    <span className="text-sm text-[#9740fe] font-medium inline-flex items-center gap-1">
                      Read <ArrowRight size={14} />
                    </span>
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

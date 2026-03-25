"use client";

import { motion } from "framer-motion";
import {
  Target,
  Wrench,
  ShieldCheck,
  Brain,
  Hammer,
  Paintbrush,
  Zap,
} from "lucide-react";
import ElectricBorder from "@/components/ui/ElectricBorder";

const cardBase =
  "bg-white/80 backdrop-blur-xl rounded-2xl border border-black/5 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl";

function CardEntrance({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ y: 30, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </motion.div>
  );
}

function ValueIcon({ icon: Icon }) {
  return (
    <div className="w-12 h-12 rounded-xl bg-[#d9d0fb] flex items-center justify-center mb-4">
      <Icon size={24} className="text-[#9740fe]" />
    </div>
  );
}

export default function ValuesBento() {
  return (
    <section className="py-[100px] px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-extrabold tracking-tight text-black mb-4">
          What We Believe
        </h2>
        <p className="text-lg font-light tracking-wide text-black/60 max-w-2xl mx-auto">
          The principles that drive every system we build.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Card 1 — Outcomes Over Activity (7 cols) */}
        <CardEntrance delay={0} className="lg:col-span-7">
          <div className={`${cardBase} p-12`}>
            <span className="absolute bottom-[-20px] right-4 text-[120px] font-black text-[#9740fe]/[0.03] leading-none pointer-events-none select-none">
              847
            </span>
            <div className="relative z-10">
              <ValueIcon icon={Target} />
              <span className="text-xs font-bold tracking-widest text-[#9740fe] uppercase mb-3 block">
                01
              </span>
              <h3 className="text-xl font-bold tracking-tight text-black mb-3">
                Outcomes Over Activity
              </h3>
              <p className="text-sm font-light tracking-wide text-black/60 leading-relaxed">
                We don&apos;t measure success by how busy we are. We measure it
                by how many jobs we put in your schedule.
              </p>
            </div>
          </div>
        </CardEntrance>

        {/* Card 2 — Trades Only (5 cols) */}
        <CardEntrance delay={0.1} className="lg:col-span-5">
          <div className={`${cardBase} p-10`}>
            {/* Scattered icons */}
            <Hammer className="absolute top-8 right-6 w-12 h-12 text-[#9740fe]/[0.05] -rotate-[15deg] pointer-events-none select-none" />
            <Wrench className="absolute top-24 right-16 w-10 h-10 text-[#9740fe]/[0.04] rotate-[20deg] pointer-events-none select-none" />
            <Paintbrush className="absolute bottom-16 right-8 w-14 h-14 text-[#9740fe]/[0.05] -rotate-[30deg] pointer-events-none select-none" />
            <Zap className="absolute bottom-8 right-20 w-8 h-8 text-[#9740fe]/[0.06] rotate-[10deg] pointer-events-none select-none" />

            <div className="relative z-10">
              <ValueIcon icon={Wrench} />
              <span className="text-xs font-bold tracking-widest text-[#9740fe] uppercase mb-3 block">
                02
              </span>
              <h3 className="text-xl font-bold tracking-tight text-black mb-3">
                Trades Only
              </h3>
              <p className="text-sm font-light tracking-wide text-black/60 leading-relaxed">
                We don&apos;t work with cafes, dentists, or e-commerce stores.
                We work with tradies and contractors. That focus makes us better
                at it.
              </p>
            </div>
          </div>
        </CardEntrance>

        {/* Card 3 — No BS (6 cols) */}
        <CardEntrance delay={0.2} className="lg:col-span-6">
          <div className={`${cardBase} p-10 h-full`}>
            <ValueIcon icon={ShieldCheck} />
            <span className="text-xs font-bold tracking-widest text-[#9740fe] uppercase mb-3 block">
              03
            </span>
            <h3 className="text-xl font-bold tracking-tight text-black mb-3">
              No BS
            </h3>
            <p className="text-sm font-light tracking-wide text-black/60 leading-relaxed">
              No lock-in contracts. No hidden fees. No reports designed to
              confuse you. If it&apos;s not working, you&apos;ll know &mdash;
              and you can walk away anytime.
            </p>
          </div>
        </CardEntrance>

        {/* Card 4 — AI Is the Edge (6 cols, same height as No BS) */}
        <CardEntrance delay={0.3} className="lg:col-span-6">
          <ElectricBorder
            color="#9740fe"
            borderRadius={20}
            chaos={0.15}
            speed={1.0}
            className="h-full"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-10 relative overflow-hidden h-full">
              {/* Circuit grid background */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.02]"
                style={{
                  backgroundImage:
                    "linear-gradient(#9740fe 1px, transparent 1px), linear-gradient(90deg, #9740fe 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              />

              <div className="relative z-10">
                <ValueIcon icon={Brain} />
                <span className="text-xs font-bold tracking-widest text-[#9740fe] uppercase mb-3 block">
                  04
                </span>
                <h3 className="text-xl font-bold tracking-tight text-black mb-3">
                  AI Is the Edge
                </h3>
                <p className="text-sm font-light tracking-wide text-black/60 leading-relaxed">
                  The trades are being disrupted by technology whether they like
                  it or not. We make sure our clients are on the right side of
                  that disruption.
                </p>
              </div>
            </div>
          </ElectricBorder>
        </CardEntrance>
      </div>
    </section>
  );
}

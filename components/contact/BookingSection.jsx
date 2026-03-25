"use client";

import { motion } from "framer-motion";
import { Calendar, ShieldCheck, Clock, FileText } from "lucide-react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const AVAILABLE = [3, 10, 12, 18, 24];

function MockCalendar() {
  const cells = [];
  for (let i = 1; i <= 35; i++) {
    const day = i <= 31 ? i : null;
    const isAvailable = AVAILABLE.includes(i);
    cells.push(
      <div
        key={i}
        className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm ${
          !day
            ? ""
            : isAvailable
            ? "bg-[#d9d0fb] text-[#9740fe] font-semibold"
            : "text-black/20"
        }`}
      >
        {day}
      </div>
    );
  }

  return (
    <div className="mt-8 w-full max-w-xs mx-auto">
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map((d) => (
          <div
            key={d}
            className="text-xs text-black/30 font-medium text-center"
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">{cells}</div>
    </div>
  );
}

export default function BookingSection() {
  return (
    <section
      id="booking-section"
      className="py-[100px] px-4 sm:px-6 lg:px-8 bg-[#f5f3ff] shadow-[inset_0_8px_16px_-8px_rgba(0,0,0,0.06),inset_0_-8px_16px_-8px_rgba(0,0,0,0.06)]"
    >
      <h2 className="text-4xl font-extrabold tracking-tight text-black text-center">
        Book Your Free Strategy Call
      </h2>
      <p className="text-lg font-light tracking-wide text-black/60 text-center mt-3 max-w-xl mx-auto">
        Choose a time that works. 30 minutes. No obligation.
      </p>

      {/* Calendar card */}
      <motion.div
        className="max-w-4xl mx-auto mt-12 relative"
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", damping: 20 }}
        viewport={{ once: true }}
      >
        {/* Glow behind card */}
        <div className="absolute inset-[-4px] rounded-[20px] bg-gradient-to-br from-[#9740fe]/20 to-[#222872]/20 blur-xl pointer-events-none z-0 animate-[glow-pulse_3s_ease-in-out_infinite]" />

        {/* Gradient border wrapper */}
        <div className="relative z-10 p-[1.5px] rounded-2xl bg-gradient-to-br from-[#9740fe] to-[#222872]">
          <div className="bg-white/80 backdrop-blur-xl rounded-[calc(1rem-1.5px)] overflow-hidden">
            <div className="min-h-[500px] md:min-h-[550px] flex flex-col items-center justify-center p-12">
              <Calendar className="w-16 h-16 text-[#9740fe]/30 mb-6" />
              <p className="text-xl font-semibold text-black/20">
                GHL Calendar Embed
              </p>
              <p className="text-sm text-black/15 mt-2">
                Booking widget will be integrated here
              </p>
              <MockCalendar />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Personal note */}
      <p className="text-sm text-black/40 text-center italic mt-6">
        Joel will personally review your business before the call.
      </p>

      {/* Trust pills */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
        <span className="bg-white/80 backdrop-blur-xl border border-black/5 rounded-full px-4 py-2 text-xs font-medium text-black/50 flex items-center gap-2">
          <ShieldCheck size={14} className="text-[#9740fe]" />
          Free &mdash; No Obligation
        </span>
        <span className="bg-white/80 backdrop-blur-xl border border-black/5 rounded-full px-4 py-2 text-xs font-medium text-black/50 flex items-center gap-2">
          <Clock size={14} className="text-[#9740fe]" />
          30 Minutes
        </span>
        <span className="hidden sm:flex bg-white/80 backdrop-blur-xl border border-black/5 rounded-full px-4 py-2 text-xs font-medium text-black/50 items-center gap-2">
          <FileText size={14} className="text-[#9740fe]" />
          Personalised Plan
        </span>
      </div>
    </section>
  );
}

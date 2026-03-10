"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TRADES = [
  "Plumber",
  "Electrician",
  "Builder",
  "Roofer",
  "Landscaper",
  "Painter",
  "Concreter",
  "HVAC",
  "Other",
];

const TOTAL_STEPS = 3;

const slideVariants = {
  enter: { x: 40, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -40, opacity: 0 },
};

export default function HeroForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    trade: "",
    website: "",
    name: "",
    email: "",
    phone: "",
  });

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const selectTrade = (trade) => {
    setForm((prev) => ({ ...prev, trade }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      // TODO: wire up submission
      setStep(3);
    }
  };

  const canProceed = () => {
    if (step === 1) return form.website.trim().length > 0;
    if (step === 2) return form.name.trim() && form.email.trim() && form.phone.trim();
    return true;
  };

  return (
    <motion.div
      initial={{ x: 60, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
      className="w-full"
    >
      {/* Gradient border wrapper */}
      <div className="gradient-border-wrapper p-[1.5px] rounded-[25px]">
        <div className="bg-white/85 backdrop-blur-2xl border border-white/20 rounded-[24px] shadow-lg p-6 sm:p-8">
          {/* Title */}
          <h3 className="text-2xl font-extrabold tracking-tight text-black">
            Get Your{" "}
            <span className="gradient-text font-extrabold underline decoration-black decoration-2 underline-offset-4">
              FREE
            </span>{" "}
            Web Audit
          </h3>
          <p className="text-sm text-black/60 mt-1 mb-5">
            See exactly what&apos;s costing you jobs online.
          </p>

          {/* Step indicator dots */}
          <div className="flex items-center gap-1.5 mb-5">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === step
                    ? "w-6 bg-[#fd6600]"
                    : i < step
                    ? "w-1.5 bg-[#fd6600]/50"
                    : "w-1.5 bg-black/15"
                }`}
              />
            ))}
          </div>

          {/* Content area */}
          <div className="min-h-[220px]">
            <AnimatePresence mode="wait">
              {/* Step 0 — Trade */}
              {step === 0 && (
                <motion.div
                  key="step-0"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <p className="text-sm font-semibold text-black mb-3">
                    What trade are you in?
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {TRADES.map((trade) => (
                      <button
                        key={trade}
                        type="button"
                        onClick={() => selectTrade(trade)}
                        className={`rounded-xl px-3 py-2.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
                          form.trade === trade
                            ? "bg-[#fd6600]/10 border-[#fd6600]/30 border text-[#fd6600] font-semibold"
                            : "bg-white/40 border border-white/20 text-black/70 hover:bg-white/60"
                        }`}
                      >
                        {trade}
                      </button>
                    ))}
                  </div>
                  <motion.button
                    type="button"
                    disabled={!form.trade}
                    onClick={() => setStep(1)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="shimmer-button w-full bg-[#fd6600] text-white font-bold text-sm rounded-xl px-6 py-3 mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next →
                  </motion.button>
                </motion.div>
              )}

              {/* Step 1 — Website */}
              {step === 1 && (
                <motion.form
                  key="step-1"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  onSubmit={handleNext}
                  className="flex flex-col gap-4"
                >
                  <p className="text-sm font-semibold text-black mb-1">
                    What&apos;s your website?
                  </p>
                  <div>
                    <label htmlFor="hero-website" className="block text-sm font-semibold text-black mb-1.5">
                      Website URL
                    </label>
                    <input
                      id="hero-website"
                      type="text"
                      placeholder="www.yoursite.com.au"
                      value={form.website}
                      onChange={update("website")}
                      required
                      className="input-glass w-full px-4 py-3 text-sm text-black"
                    />
                  </div>
                  <p className="text-xs text-black/40 -mt-2">
                    Don&apos;t have one? Type &quot;none&quot;
                  </p>
                  <motion.button
                    type="submit"
                    disabled={!canProceed()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="shimmer-button w-full bg-[#fd6600] text-white font-bold text-sm rounded-xl px-6 py-3 mt-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next →
                  </motion.button>
                </motion.form>
              )}

              {/* Step 2 — Contact */}
              {step === 2 && (
                <motion.form
                  key="step-2"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  onSubmit={handleNext}
                  className="flex flex-col gap-3"
                >
                  <p className="text-sm font-semibold text-black mb-1">
                    Your details
                  </p>
                  <div>
                    <label htmlFor="hero-name" className="block text-sm font-semibold text-black mb-1.5">
                      Full Name
                    </label>
                    <input
                      id="hero-name"
                      type="text"
                      placeholder="John Smith"
                      value={form.name}
                      onChange={update("name")}
                      required
                      className="input-glass w-full px-4 py-3 text-sm text-black"
                    />
                  </div>
                  <div>
                    <label htmlFor="hero-email" className="block text-sm font-semibold text-black mb-1.5">
                      Email
                    </label>
                    <input
                      id="hero-email"
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={update("email")}
                      required
                      className="input-glass w-full px-4 py-3 text-sm text-black"
                    />
                  </div>
                  <div>
                    <label htmlFor="hero-phone" className="block text-sm font-semibold text-black mb-1.5">
                      Phone
                    </label>
                    <input
                      id="hero-phone"
                      type="tel"
                      placeholder="0400 000 000"
                      value={form.phone}
                      onChange={update("phone")}
                      required
                      className="input-glass w-full px-4 py-3 text-sm text-black"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={!canProceed()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="shimmer-button w-full bg-[#fd6600] text-white font-bold text-sm rounded-xl px-6 py-3 mt-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Get My Audit →
                  </motion.button>
                </motion.form>
              )}

              {/* Step 3 — Confirmation */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center text-center py-8"
                >
                  <span className="text-4xl mb-3">🎉</span>
                  <h4 className="text-lg font-bold text-black mb-1">
                    You&apos;re in!
                  </h4>
                  <p className="text-sm text-black/60">
                    We&apos;ll send your free audit within 24 hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Trust line */}
          <p className="text-xs text-black/50 text-center mt-4">
            Free. No credit card. Results in 24 hours.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

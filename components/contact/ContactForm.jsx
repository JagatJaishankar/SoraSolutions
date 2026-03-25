"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Mail, MapPin, Instagram } from "lucide-react";

const TRADES = [
  "Plumber",
  "Electrician",
  "Builder",
  "Roofer",
  "Landscaper",
  "Painter",
  "Concreter",
  "HVAC",
  "Tiler",
  "Other",
];

const TOTAL_STEPS = 4;

const slideVariants = {
  enter: { x: 40, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -40, opacity: 0 },
};

export default function ContactForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    trade: "",
    website: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const selectTrade = (trade) => {
    setForm((prev) => ({ ...prev, trade }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep((s) => s + 1);
  };

  const canProceed = () => {
    if (step === 1) return form.website.trim().length > 0;
    if (step === 2)
      return form.name.trim() && form.email.trim() && form.phone.trim();
    return true;
  };

  const scrollToBooking = () => {
    const el = document.getElementById("booking-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-[100px] px-4 sm:px-6 lg:px-8 bg-[#f5f3ff] shadow-[inset_0_8px_16px_-8px_rgba(0,0,0,0.06),inset_0_-8px_16px_-8px_rgba(0,0,0,0.06)]">
      <h2 className="text-4xl font-extrabold tracking-tight text-black text-center">
        Or Send Us a Message
      </h2>
      <p className="text-lg font-light tracking-wide text-black/60 text-center mt-3">
        We&apos;ll get back to you within 24 hours.
      </p>

      <motion.div
        className="max-w-lg mx-auto mt-12"
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", damping: 20 }}
        viewport={{ once: true }}
      >
        {/* Gradient border wrapper */}
        <div className="gradient-border-wrapper p-[1.5px] rounded-[25px]">
          <div className="bg-white/85 backdrop-blur-2xl border border-white/20 rounded-[24px] shadow-lg p-6 sm:p-8">
            {/* Title */}
            <h3 className="text-2xl font-extrabold tracking-tight text-black">
              Get in{" "}
              <span className="gradient-text font-extrabold underline decoration-black decoration-2 underline-offset-4">
                Touch
              </span>
            </h3>
            <p className="text-sm text-black/60 mt-1 mb-5">
              Tell us about your business and we&apos;ll reach out.
            </p>

            {/* Step indicator dots */}
            <div className="flex items-center gap-1.5 mb-5">
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === step
                      ? "w-6 bg-primary"
                      : i < step
                      ? "w-1.5 bg-primary/50"
                      : "w-1.5 bg-black/15"
                  }`}
                />
              ))}
            </div>

            {/* Content area */}
            <div className="min-h-[260px]">
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
                              ? "bg-primary/10 border-primary/30 border text-primary font-semibold"
                              : "bg-white/70 border border-white/20 text-black/70 hover:bg-white/85"
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
                      className="shimmer-button w-full bg-primary text-white font-bold text-sm rounded-xl px-6 py-3 mt-4 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next &rarr;
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
                      <label
                        htmlFor="contact-website"
                        className="block text-sm font-semibold text-black mb-1.5"
                      >
                        Website URL
                      </label>
                      <input
                        id="contact-website"
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
                      className="shimmer-button w-full bg-primary text-white font-bold text-sm rounded-xl px-6 py-3 mt-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next &rarr;
                    </motion.button>
                  </motion.form>
                )}

                {/* Step 2 — Contact details */}
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
                      <label
                        htmlFor="contact-name"
                        className="block text-sm font-semibold text-black mb-1.5"
                      >
                        Full Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        placeholder="John Smith"
                        value={form.name}
                        onChange={update("name")}
                        required
                        className="input-glass w-full px-4 py-3 text-sm text-black"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-semibold text-black mb-1.5"
                      >
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={update("email")}
                        required
                        className="input-glass w-full px-4 py-3 text-sm text-black"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-sm font-semibold text-black mb-1.5"
                      >
                        Phone
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="04XX XXX XXX"
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
                      className="shimmer-button w-full bg-primary text-white font-bold text-sm rounded-xl px-6 py-3 mt-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next &rarr;
                    </motion.button>
                  </motion.form>
                )}

                {/* Step 3 — Message + submit */}
                {step === 3 && (
                  <motion.form
                    key="step-3"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    onSubmit={(e) => {
                      e.preventDefault();
                      setStep(4);
                    }}
                    className="flex flex-col gap-4"
                  >
                    <p className="text-sm font-semibold text-black mb-1">
                      Anything else you&apos;d like us to know?
                    </p>
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-sm font-semibold text-black mb-1.5"
                      >
                        Your Message
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        placeholder="Tell us about your business and what you're looking for..."
                        value={form.message}
                        onChange={update("message")}
                        className="input-glass w-full px-4 py-3 text-sm text-black resize-none"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="shimmer-button w-full bg-primary text-white font-bold text-sm rounded-xl px-6 py-3 mt-1 cursor-pointer"
                    >
                      Send Message &rarr;
                    </motion.button>
                  </motion.form>
                )}

                {/* Step 4 — Confirmation */}
                {step === 4 && (
                  <motion.div
                    key="step-4"
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="flex flex-col items-center justify-center text-center py-8"
                  >
                    <CheckCircle className="w-14 h-14 text-[#9740fe] mb-4" />
                    <h4 className="text-lg font-bold text-black mb-1">
                      Message Sent!
                    </h4>
                    <p className="text-sm text-black/60">
                      We&apos;ll get back to you within 24 hours.
                    </p>
                    <div className="flex items-center gap-4 mt-6">
                      <button
                        type="button"
                        onClick={scrollToBooking}
                        className="text-[#9740fe] font-medium text-sm cursor-pointer"
                      >
                        Book a call &rarr;
                      </button>
                      <a
                        href="tel:+61409422868"
                        className="text-[#9740fe] font-medium text-sm"
                      >
                        Call Joel &rarr;
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Trust line */}
            <p className="text-xs text-black/50 text-center mt-4">
              Free. No obligation. We respond within 24 hours.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Contact details */}
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-10">
        <a
          href="mailto:joel@sorasolution.com"
          className="flex items-center gap-2 text-sm text-black/50 hover:text-[#9740fe] transition-colors"
        >
          <Mail size={16} className="text-[#9740fe]" />
          joel@sorasolution.com
        </a>
        <span className="flex items-center gap-2 text-sm text-black/50">
          <MapPin size={16} className="text-[#9740fe]" />
          New South Wales, Australia
        </span>
        <a
          href="https://instagram.com/sorabusinesssolutions"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-black/50 hover:text-[#9740fe] transition-colors"
        >
          <Instagram size={16} className="text-[#9740fe]" />
          @sorabusinesssolutions
        </a>
      </div>
    </section>
  );
}

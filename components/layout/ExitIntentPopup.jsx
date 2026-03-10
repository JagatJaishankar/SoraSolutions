"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import PrimaryButton from "@/components/ui/PrimaryButton";
import useExitIntent from "@/hooks/useExitIntent";

const trades = [
  "Plumbing",
  "Electrical",
  "Building",
  "Roofing",
  "Landscaping",
  "Painting",
  "Concreting",
  "HVAC",
  "Other",
];

export default function ExitIntentPopup() {
  const { showPopup, setShowPopup } = useExitIntent();

  const close = () => setShowPopup(false);

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={close}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Gradient border wrapper */}
            <div className="rounded-2xl bg-gradient-to-br from-[#2362fd] to-[#fd6600] p-[1.5px]">
              <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-8 relative">
                {/* Close button */}
                <button
                  type="button"
                  onClick={close}
                  className="absolute top-4 right-4 text-black/40 hover:text-black/70 transition-colors duration-200 cursor-pointer"
                  aria-label="Close popup"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Content */}
                <h3 className="text-2xl font-bold text-center text-black">
                  Wait — Get Your Free Web Audit Before You Go
                </h3>
                <p className="text-sm text-black/60 text-center mt-2">
                  See exactly what&apos;s costing you jobs online. Takes 30
                  seconds.
                </p>

                {/* Mini form */}
                <form
                  className="mt-6 flex flex-col gap-3"
                  onSubmit={(e) => {
                    e.preventDefault();
                    close();
                  }}
                >
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    className="bg-white/40 backdrop-blur-md border border-white/20 rounded-xl outline-none transition-all duration-300 focus:border-[#2362fd]/50 w-full px-4 py-3 text-sm text-black"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    required
                    className="bg-white/40 backdrop-blur-md border border-white/20 rounded-xl outline-none transition-all duration-300 focus:border-[#2362fd]/50 w-full px-4 py-3 text-sm text-black"
                  />
                  <select
                    required
                    defaultValue=""
                    className="bg-white/40 backdrop-blur-md border border-white/20 rounded-xl outline-none transition-all duration-300 focus:border-[#2362fd]/50 w-full px-4 py-3 text-sm text-black appearance-none"
                  >
                    <option value="" disabled>
                      Select your trade
                    </option>
                    {trades.map((trade) => (
                      <option key={trade} value={trade}>
                        {trade}
                      </option>
                    ))}
                  </select>
                  <PrimaryButton type="submit" className="w-full mt-1">
                    Get My Free Audit
                  </PrimaryButton>
                </form>

                {/* Dismiss */}
                <p
                  className="text-xs text-black/40 text-center mt-4 cursor-pointer hover:text-black/60 transition-colors duration-200"
                  onClick={close}
                >
                  No thanks, I&apos;ll figure it out myself
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

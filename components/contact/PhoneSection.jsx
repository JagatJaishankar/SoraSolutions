"use client";

import { motion } from "framer-motion";
import { Phone, Clock, Zap } from "lucide-react";
import ElectricBorder from "@/components/ui/ElectricBorder";

export default function PhoneSection() {
  return (
    <section className="py-[100px] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto lg:flex lg:items-center lg:gap-16">
        {/* Left column */}
        <motion.div
          className="lg:w-[50%]"
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-extrabold tracking-tight text-black">
            Prefer to Just Call?
          </h2>
          <p className="text-base font-light tracking-wide text-black/60 leading-relaxed mt-4">
            If you&apos;d rather skip the form and have a chat, give Joel a ring
            directly. He&apos;s usually available during business hours and happy
            to talk through your situation over the phone.
          </p>
          <div className="flex flex-col gap-2 mt-6">
            <span className="flex items-center gap-2 text-sm font-light tracking-wide text-black/60">
              <Clock size={16} className="text-[#9740fe]" />
              Available Mon&ndash;Fri, 8am&ndash;6pm AEST
            </span>
            <span className="flex items-center gap-2 text-sm font-light tracking-wide text-black/60">
              <Zap size={16} className="text-[#9740fe]" />
              Usually responds same day
            </span>
          </div>
        </motion.div>

        {/* Right column — phone card */}
        <motion.div
          className="lg:w-[50%] mt-12 lg:mt-0"
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          viewport={{ once: true }}
        >
          <ElectricBorder
            color="#9740fe"
            borderRadius={24}
            chaos={0.12}
            speed={0.8}
            className="w-full max-w-md mx-auto"
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-10 text-center group">
              {/* Phone icon */}
              <div className="w-20 h-20 rounded-2xl bg-[#d9d0fb] flex items-center justify-center mx-auto mb-6">
                <Phone
                  size={36}
                  className="text-[#9740fe] group-hover:animate-[phone-ring_0.8s_ease-in-out]"
                />
              </div>

              {/* Number */}
              <a
                href="tel:+61409422868"
                className="text-3xl md:text-4xl font-black text-black hover:text-[#9740fe] transition-colors"
              >
                +61 409 422 868
              </a>

              <p className="text-sm font-light tracking-wide text-black/60 mt-3">
                Joel Willis &mdash; Founder
              </p>

              {/* Avatar */}
              <div className="w-12 h-12 rounded-full mx-auto mt-4 overflow-hidden bg-[#9740fe] text-white text-sm font-bold flex items-center justify-center relative">
                <span>JW</span>
                <img
                  src="/images/team/joel-circle.jpg"
                  alt="Joel Willis"
                  className="w-full h-full object-cover absolute inset-0 scale-150"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>

              {/* Tap to call — mobile only */}
              <p className="text-xs text-black/30 mt-2 lg:hidden">
                tap to call
              </p>
            </div>
          </ElectricBorder>
        </motion.div>
      </div>
    </section>
  );
}

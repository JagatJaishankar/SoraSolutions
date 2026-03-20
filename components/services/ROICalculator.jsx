"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import ElasticSlider from "@/components/ui/ElasticSlider";
import CountUp from "@/components/ui/CountUp";

export default function ROICalculator() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [jobValue, setJobValue] = useState(5000);
  const [currentJobs, setCurrentJobs] = useState(8);
  const [extraLeads, setExtraLeads] = useState(15);
  const [conversionRate, setConversionRate] = useState(30);

  const currentRevenue = jobValue * currentJobs;
  const projectedRevenue =
    jobValue * (currentJobs + (extraLeads * conversionRate) / 100);
  const additionalRevenue = projectedRevenue - currentRevenue;

  return (
    <section ref={ref} className="py-[60px] sm:py-[100px] px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="font-[family-name:var(--font-maven-pro)] text-3xl sm:text-4xl font-extrabold tracking-tight text-black text-center"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          What Could Better Systems Do for Your Revenue?
        </motion.h2>
        <motion.p
          className="text-base sm:text-lg font-light text-black/60 text-center mt-3"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
          Adjust the sliders to model your growth.
        </motion.p>

        {/* Dark card */}
        <motion.div
          className="mt-10 p-[1.5px] rounded-2xl bg-gradient-to-br from-[#9740fe] to-[#222872]"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        >
          <div className="bg-[#090b3c] rounded-[calc(1rem-1.5px)] p-6 sm:p-8 md:p-12">
            <p className="text-xs tracking-widest uppercase text-[#d9d0fb] font-semibold mb-8">
              ROI CALCULATOR
            </p>

            {/* 2x2 slider grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Slider 1 — Job Value */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-white/70">
                    Average Job Value
                  </span>
                  <span className="text-sm font-bold text-primary">
                    {new Intl.NumberFormat("en-AU", {
                      style: "currency",
                      currency: "AUD",
                      maximumFractionDigits: 0,
                    }).format(jobValue)}
                  </span>
                </div>
                <ElasticSlider
                  defaultValue={5000}
                  startingValue={500}
                  maxValue={50000}
                  isStepped
                  stepSize={500}
                  onChange={setJobValue}
                  dark
                  leftIcon={
                    <span className="text-xs text-white/30 whitespace-nowrap">
                      $500
                    </span>
                  }
                  rightIcon={
                    <span className="text-xs text-white/30 whitespace-nowrap">
                      $50k
                    </span>
                  }
                />
              </div>

              {/* Slider 2 — Current Jobs */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-white/70">
                    Jobs Per Month (Current)
                  </span>
                  <span className="text-sm font-bold text-primary">
                    {currentJobs} jobs
                  </span>
                </div>
                <ElasticSlider
                  defaultValue={8}
                  startingValue={1}
                  maxValue={50}
                  isStepped
                  stepSize={1}
                  onChange={setCurrentJobs}
                  dark
                  leftIcon={
                    <span className="text-xs text-white/30">1</span>
                  }
                  rightIcon={
                    <span className="text-xs text-white/30">50</span>
                  }
                />
              </div>

              {/* Slider 3 — Extra Leads */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-white/70">
                    Extra Leads from Sora
                  </span>
                  <span className="text-sm font-bold text-primary">
                    {extraLeads} new leads
                  </span>
                </div>
                <ElasticSlider
                  defaultValue={15}
                  startingValue={5}
                  maxValue={50}
                  isStepped
                  stepSize={1}
                  onChange={setExtraLeads}
                  dark
                  leftIcon={
                    <span className="text-xs text-white/30">5</span>
                  }
                  rightIcon={
                    <span className="text-xs text-white/30">50</span>
                  }
                />
              </div>

              {/* Slider 4 — Conversion Rate */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-white/70">
                    Conversion Rate
                  </span>
                  <span className="text-sm font-bold text-primary">
                    {conversionRate}%
                  </span>
                </div>
                <ElasticSlider
                  defaultValue={30}
                  startingValue={10}
                  maxValue={80}
                  isStepped
                  stepSize={5}
                  onChange={setConversionRate}
                  dark
                  leftIcon={
                    <span className="text-xs text-white/30">10%</span>
                  }
                  rightIcon={
                    <span className="text-xs text-white/30">80%</span>
                  }
                />
              </div>
            </div>

            {/* Results */}
            <div className="border-t border-white/10 mt-10 pt-10">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-8">
                {/* Current */}
                <div className="text-center sm:text-left">
                  <div className="flex items-baseline justify-center sm:justify-start gap-1 whitespace-nowrap">
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-white/60">
                      $
                    </span>
                    <CountUp
                      to={currentRevenue}
                      from={0}
                      duration={1}
                      separator=","
                      className="text-xl sm:text-2xl md:text-3xl font-bold text-white/60"
                    />
                  </div>
                  <p className="text-xs text-white/30 mt-1">without Sora</p>
                </div>

                {/* Projected — hero number */}
                <div className="text-center">
                  <div className="flex items-baseline justify-center gap-1 whitespace-nowrap">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-black text-white">
                      $
                    </span>
                    <CountUp
                      to={Math.round(projectedRevenue)}
                      from={0}
                      duration={1}
                      separator=","
                      className="text-3xl sm:text-4xl md:text-5xl font-black text-white"
                    />
                  </div>
                  <p className="text-xs text-primary mt-1">with Sora</p>
                </div>

                {/* Additional */}
                <div className="text-center sm:text-right">
                  <div className="flex items-baseline justify-center sm:justify-end gap-1 whitespace-nowrap">
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-[#d9d0fb]">
                      +$
                    </span>
                    <CountUp
                      to={Math.round(additionalRevenue)}
                      from={0}
                      duration={1}
                      separator=","
                      className="text-xl sm:text-2xl md:text-3xl font-bold text-[#d9d0fb]"
                    />
                  </div>
                  <p className="text-xs text-white/30 mt-1">per month</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-white/20 mt-8 text-center">
              Estimates based on your inputs. Actual results vary by trade,
              location, and competition.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

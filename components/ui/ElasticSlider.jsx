"use client";

import { useState, useRef } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";

const MAX_OVERFLOW = 50;

function Slider({
  value,
  setValue,
  min,
  max,
  isStepped,
  stepSize,
  leftIcon,
  rightIcon,
  onChange,
  dark,
}) {
  const [region, setRegion] = useState("middle");
  const clientX = useMotionValue(0);
  const overflow = useMotionValue(0);
  const scale = useMotionValue(1);
  const ref = useRef(null);

  useMotionValueEvent(clientX, "change", (latest) => {
    if (ref.current) {
      const { left, right } = ref.current.getBoundingClientRect();
      let newValue;
      if (latest < left) {
        setRegion("left");
        newValue = left - latest;
      } else if (latest > right) {
        setRegion("right");
        newValue = latest - right;
      } else {
        setRegion("middle");
        newValue = 0;
      }
      overflow.jump(decay(newValue, MAX_OVERFLOW));
    }
  });

  return (
    <div className="flex items-center gap-3 touch-none select-none">
      <motion.div
        animate={{
          scale: region === "left" ? [1, 1.4, 1] : 1,
          transition: { duration: 0.25 },
        }}
        style={{
          x: useTransform(() =>
            region === "left" ? -overflow.get() * scale.get() : 0
          ),
        }}
      >
        {leftIcon}
      </motion.div>

      <div
        ref={ref}
        className="relative flex flex-grow items-center rounded-full"
        style={{ height: 6 }}
        onPointerDown={(e) => {
          const target = e.target;
          if (target) target.setPointerCapture(e.pointerId);
          clientX.jump(e.clientX);
        }}
        onPointerUp={() => {
          animate(googol, overflow.get(), {
            type: "spring",
            bounce: 0.5,
            onUpdate(latest) {
              overflow.jump(latest);
            },
            onComplete() {
              overflow.jump(0);
            },
          });
        }}
        onPointerMove={(e) => {
          if (e.buttons > 0 && ref.current) {
            const { left, width } = ref.current.getBoundingClientRect();
            let pct = (e.clientX - left) / width;
            pct = Math.max(0, Math.min(1, pct));
            let raw = min + pct * (max - min);
            if (isStepped && stepSize) {
              raw = Math.round(raw / stepSize) * stepSize;
            }
            raw = Math.max(min, Math.min(max, raw));
            setValue(raw);
            onChange?.(raw);
            clientX.jump(e.clientX);
          }
        }}
      >
        {/* Track bg */}
        <div
          className={`absolute inset-0 rounded-full ${dark ? "bg-white/20" : "bg-[#d9d0fb]"}`}
          style={{ overflow: "hidden" }}
        >
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-[#9740fe]"
            style={{
              right: useTransform(() => {
                const pct = ((value - min) / (max - min)) * 100;
                return `${100 - pct}%`;
              }),
            }}
          />
        </div>

        {/* Thumb */}
        <motion.div
          className="absolute"
          style={{
            left: useTransform(() => {
              const pct = ((value - min) / (max - min)) * 100;
              return `calc(${pct}% - 10px)`;
            }),
            scale,
            x: useTransform(() => {
              if (region === "left") return -overflow.get() * 0.5;
              if (region === "right") return overflow.get() * 0.5;
              return 0;
            }),
          }}
        >
          <div className="w-5 h-5 rounded-full bg-white border-2 border-[#9740fe] shadow-md" />
        </motion.div>
      </div>

      <motion.div
        animate={{
          scale: region === "right" ? [1, 1.4, 1] : 1,
          transition: { duration: 0.25 },
        }}
        style={{
          x: useTransform(() =>
            region === "right" ? overflow.get() * scale.get() : 0
          ),
        }}
      >
        {rightIcon}
      </motion.div>
    </div>
  );
}

function decay(value, max) {
  if (max === 0) return 0;
  const entry = value / max;
  const sigmoid = 2 * (1 / (1 + Math.exp(-entry)) - 0.5);
  return sigmoid * max;
}

const googol = 10_000_000_000;

export default function ElasticSlider({
  defaultValue = 50,
  startingValue = 0,
  maxValue = 100,
  isStepped = false,
  stepSize = 1,
  leftIcon,
  rightIcon,
  onChange,
  dark = false,
}) {
  const [value, setValue] = useState(defaultValue);

  const handleSetValue = (v) => {
    setValue(v);
    onChange?.(v);
  };

  return (
    <Slider
      value={value}
      setValue={handleSetValue}
      min={startingValue}
      max={maxValue}
      isStepped={isStepped}
      stepSize={stepSize}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      onChange={onChange}
      dark={dark}
    />
  );
}

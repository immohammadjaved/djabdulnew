"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const ITEMS = [
  "Bollywood",
  "Latin",
  "Tribal",
  "Progressive House",
  "Retro",
  "Hip-Hop",
  "Club",
  "Weddings",
];

// wrap v into [min, max)
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

export function GenreMarquee() {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const boost = useTransform(velocity, [-1500, 0, 1500], [-4, 0, 4], { clamp: false });
  const direction = useRef(1);

  // the track holds two identical halves, so wrapping at -50% is seamless
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const b = boost.get();
    if (b < 0) direction.current = -1;
    else if (b > 0) direction.current = 1;
    const speed = 1.6; // % of track per second
    baseX.set(baseX.get() - direction.current * speed * (delta / 1000) * (1 + Math.abs(b)));
  });

  const loop = [...ITEMS, ...ITEMS];

  return (
    <div className="relative overflow-hidden border-y border-border bg-background py-5">
      <motion.div style={{ x }} className="flex w-max items-center whitespace-nowrap">
        {loop.map((item, i) => (
          <span
            key={i}
            aria-hidden={i >= ITEMS.length}
            className={`flex items-center font-display text-3xl tracking-tight uppercase sm:text-5xl ${
              i % 2 === 1 ? "hero-outline" : "text-foreground"
            }`}
          >
            <span className="px-6 sm:px-10">{item}</span>
            <span className="bg-signal inline-block size-2 rotate-45 sm:size-2.5" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

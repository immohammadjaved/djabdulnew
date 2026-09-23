"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

/** Rolls a number up from `from` once it scrolls into view. */
export function CountUp({
  to,
  from = 0,
  suffix = "",
  duration = 1.6,
}: {
  to: number;
  from?: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduce = useReducedMotion();

  // park at the start value until visible, so the roll-up isn't preceded by a flash of the end value
  useEffect(() => {
    if (!reduce && ref.current && !inView) ref.current.textContent = `${from}${suffix}`;
  }, [reduce, inView, from, suffix]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduce) {
      el.textContent = `${to}${suffix}`;
      return;
    }
    const controls = animate(from, to, {
      duration,
      ease: EASE_OUT,
      onUpdate: (v) => {
        el.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, from, to, suffix, duration, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {`${to}${suffix}`}
    </span>
  );
}

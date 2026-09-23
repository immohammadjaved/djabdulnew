"use client";

import { useRef } from "react";
import Image, { type StaticImageData } from "next/image";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

/**
 * Photo that wipes open from the bottom when it enters the viewport,
 * then drifts slightly against the scroll for depth.
 */
export function RevealImage({
  src,
  alt,
  sizes,
  className = "",
  frameClassName = "aspect-[4/5]",
  caption,
}: {
  src: StaticImageData;
  alt: string;
  sizes: string;
  className?: string;
  frameClassName?: string;
  caption?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // observe the unclipped figure — IntersectionObserver honours clip-path,
  // so a fully clipped frame would never report itself as visible
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);

  return (
    <figure ref={ref} className={className}>
      <motion.div
        initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
        animate={inView ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
        transition={{ duration: 1.1, ease: EASE_OUT }}
        className={`relative w-full overflow-hidden bg-card ${frameClassName}`}
      >
        <motion.div style={{ y }} className="absolute -inset-y-[8%] inset-x-0">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            placeholder="blur"
            className="object-cover"
          />
        </motion.div>
      </motion.div>
      {caption && (
        <figcaption className="mt-3 flex justify-between font-mono text-[10px] tracking-[0.2em] text-foreground/55 uppercase">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

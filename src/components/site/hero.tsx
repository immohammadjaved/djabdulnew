"use client";

import { getImageProps } from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EASE_OUT } from "@/lib/motion";
import heroWide from "@/assets/photos/hero-wide.jpg";
import heroPortrait from "@/assets/photos/hero-portrait.jpg";

const ALT =
  "DJ Abdul in dark sunglasses with headphones around his neck, lit in orange and blue through stage smoke";

function HeroPicture() {
  const common = { alt: ALT, sizes: "100vw", quality: 85, placeholder: "blur" as const };
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, src: heroWide });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    src: heroPortrait,
    loading: "eager",
    fetchPriority: "high",
  });

  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop} />
      <source srcSet={mobile} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt comes from rest */}
      <img
        {...rest}
        className="h-full w-full object-cover object-[50%_20%] md:object-[50%_30%]"
      />
    </picture>
  );
}

function MaskedWord({
  word,
  delay,
  className,
}: {
  word: string;
  delay: number;
  className?: string;
}) {
  return (
    <span className={`flex overflow-hidden ${className ?? ""}`} aria-hidden>
      {word.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "105%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 1, delay: delay + i * 0.045, ease: EASE_OUT }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  // page scroll in px — starts at 0 on server and client alike, so no hydration drift
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 900], [0, reduce ? 0 : 160]);
  const imageScale = useTransform(scrollY, [0, 900], [1, reduce ? 1 : 1.08]);
  const titleY = useTransform(scrollY, [0, 900], [0, reduce ? 0 : -220]);
  const fade = useTransform(scrollY, [0, 520], [1, 0]);

  return (
    <section
      id="home"
      className="grain relative isolate flex h-[100svh] min-h-[640px] flex-col justify-end overflow-hidden"
    >
      {/* photo — clip-path opens like a shutter, then parallaxes on scroll */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={reduce ? false : { clipPath: "inset(14% 18% 14% 18%)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
        transition={{ duration: 1.4, ease: EASE_OUT }}
      >
        <motion.div
          className="h-full w-full"
          style={{ y: imageY, scale: imageScale }}
          initial={reduce ? false : { scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: EASE_OUT }}
        >
          <HeroPicture />
        </motion.div>
        {/* legibility: bottom bleeds into the page, left edge darkens behind type */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent md:from-background/50" />
      </motion.div>

      {/* vertical coordinates rail */}
      <motion.div
        style={{ opacity: fade }}
        className="pointer-events-none absolute top-1/2 right-5 hidden -translate-y-1/2 lg:block"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="font-mono text-[10px] tracking-[0.3em] text-foreground/50 uppercase [writing-mode:vertical-rl]"
        >
          12.97° N, 77.59° E &mdash; Bangalore / Mumbai
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: titleY, opacity: fade }}
        className="mx-auto w-full max-w-6xl px-5 pb-10 sm:pb-14"
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease: EASE_OUT }}
          className="mb-5 flex items-center gap-2.5 font-mono text-xs tracking-[0.2em] text-foreground/75 uppercase"
        >
          <span className="relative flex size-1.5">
            <span className="bg-signal absolute inline-flex size-full animate-ping opacity-60 motion-reduce:hidden" />
            <span className="bg-signal relative inline-flex size-1.5" />
          </span>
          Booking 2026 dates
        </motion.div>

        <h1 className="font-display leading-[0.8] tracking-tight uppercase">
          <span className="sr-only">DJ Abdul</span>
          <MaskedWord
            word="DJ"
            delay={0.35}
            className="hero-outline text-[22vw] sm:text-[16vw] md:text-[10vw]"
          />
          {/* keeps the extracted text as "DJ Abdul" rather than "DJAbdul" */}
          {" "}
          <MaskedWord
            word="Abdul"
            delay={0.45}
            className="-mt-[0.04em] text-[26vw] text-foreground sm:text-[22vw] md:text-[15.5vw] lg:text-[13.5rem]"
          />
        </h1>

        <div className="mt-8 grid grid-cols-1 gap-8 border-t border-foreground/15 pt-6 md:grid-cols-[1fr_auto] md:items-end">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1, ease: EASE_OUT }}
            className="max-w-md text-base leading-relaxed text-foreground/80 sm:text-lg"
          >
            Bollywood, Latin, tribal &amp; progressive house. Behind the decks
            since 1996, and the official DJ for Formula 1 in India.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1, ease: EASE_OUT }}
            className="flex flex-wrap items-center gap-3"
          >
            <Button
              size="lg"
              className="hard-shadow h-11 rounded-none bg-primary px-6 text-primary-foreground hover:bg-primary"
              render={<a href="#booking" />}
              nativeButton={false}
            >
              Book DJ Abdul
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="group h-11 rounded-none px-3 text-foreground hover:bg-transparent hover:text-[var(--signal)]"
              render={<a href="#sound" className="flex items-center gap-1.5" />}
              nativeButton={false}
            >
              Hear the sound
              <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

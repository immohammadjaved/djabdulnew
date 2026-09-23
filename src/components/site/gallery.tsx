"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { Archive } from "@/components/site/archive";
import sideGlance from "@/assets/photos/side-glance.jpg";
import gazeUp from "@/assets/photos/gaze-up.jpg";
import standing from "@/assets/photos/standing.jpg";
import headDown from "@/assets/photos/head-down.jpg";
import front from "@/assets/photos/front.jpg";
import profileRight from "@/assets/photos/profile-right.jpg";
import decksAlt from "@/assets/photos/decks-alt.jpg";

const FRAMES: { src: StaticImageData; alt: string; caption: string }[] = [
  { src: sideGlance, alt: "DJ Abdul in side profile, headphones around his neck, rim-lit in orange", caption: "Side light" },
  { src: standing, alt: "DJ Abdul standing, headphones around his neck", caption: "Stance" },
  { src: gazeUp, alt: "DJ Abdul looking up and away, lit from the side", caption: "Look up" },
  { src: decksAlt, alt: "DJ Abdul mid-set, hands out over the decks", caption: "Cue" },
  { src: headDown, alt: "DJ Abdul with his head down, listening", caption: "Listen" },
  { src: front, alt: "DJ Abdul facing the camera in sunglasses", caption: "Front" },
  { src: profileRight, alt: "DJ Abdul in right profile with headphones", caption: "Profile" },
];

const CREDITS = [
  "Official DJ, Formula 1",
  "Rock Bottom Residency",
  "Mirchi Nights",
  "Bollywood Remix Sessions, Mumbai",
  "MTV Pool Grind",
  "FTV Shows",
  "Smirnoff & Bacardi Blast Grooves",
  "Urban Edge, Bangalore",
];

export function Gallery() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  // how far the track must travel so its right edge lands on the viewport's right edge
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () =>
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 160, damping: 32, mass: 0.4 });
  const x = useTransform(smooth, (p) => -p * distance);
  const counter = useTransform(smooth, (p) =>
    String(Math.round(p * (FRAMES.length - 1)) + 1).padStart(2, "0"),
  );

  return (
    <section id="gallery" className="relative border-b border-border">
      <div
        ref={pinRef}
        style={{ height: `calc(100svh + ${distance}px)` }}
        className="relative"
      >
        <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
          <div className="mx-auto mb-8 flex w-full max-w-6xl items-end justify-between px-5">
            <div>
              <div className="flex items-baseline gap-4">
                <span className="signal font-mono text-sm">05</span>
                <span className="font-mono text-xs tracking-[0.2em] text-foreground/50 uppercase">
                  Frames
                </span>
              </div>
              <h2 className="mt-4 font-display text-5xl tracking-tight uppercase sm:text-6xl">
                Studio sessions
              </h2>
            </div>
            <div className="font-mono text-xs tracking-[0.2em] text-foreground/50 uppercase tabular-nums">
              <motion.span className="text-foreground">{counter}</motion.span>
              {" / "}
              {String(FRAMES.length).padStart(2, "0")}
            </div>
          </div>

          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex w-max items-end gap-4 pr-5 pl-5 will-change-transform sm:gap-6 md:pl-[max(1.25rem,calc((100vw-72rem)/2+1.25rem))]"
          >
            {FRAMES.map((frame, i) => {
              const landscape = frame.src.width > frame.src.height;
              return (
                <figure key={frame.caption} className="group shrink-0">
                  <div
                    className={`relative overflow-hidden bg-card ${
                      landscape
                        ? "h-[38svh] w-[57svh] sm:h-[48svh] sm:w-[72svh]"
                        : "h-[46svh] w-[30.6svh] sm:h-[58svh] sm:w-[38.6svh]"
                    }`}
                  >
                    <Image
                      src={frame.src}
                      alt={frame.alt}
                      fill
                      sizes="(min-width: 640px) 72svh, 60vw"
                      placeholder="blur"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <figcaption className="mt-3 flex items-baseline gap-3 font-mono text-[10px] tracking-[0.2em] text-foreground/55 uppercase">
                    <span className="signal">{String(i + 1).padStart(2, "0")}</span>
                    {frame.caption}
                  </figcaption>
                </figure>
              );
            })}
          </motion.div>

          {/* progress hairline */}
          <div className="mx-auto mt-8 w-full max-w-6xl px-5">
            <div className="h-px w-full bg-border">
              <motion.div
                style={{ scaleX: smooth }}
                className="bg-signal h-px w-full origin-left"
              />
            </div>
          </div>
        </div>
      </div>

      <Archive />

      <div className="mx-auto max-w-6xl px-5 py-24 sm:py-28">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs tracking-[0.2em] text-foreground/50 uppercase">
            Selected credits
          </span>
        </div>
        <ul className="mt-8 grid grid-cols-1 border-t border-border sm:grid-cols-2">
          {CREDITS.map((credit, i) => (
            <motion.li
              key={credit}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.06, ease: EASE_OUT }}
              className="flex items-baseline gap-5 border-b border-border py-5 sm:odd:border-r sm:odd:pr-6 sm:even:pl-6"
            >
              <span className="font-mono text-xs text-foreground/55 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-lg text-foreground/85">{credit}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

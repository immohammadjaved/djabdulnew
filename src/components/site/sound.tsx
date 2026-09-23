"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EASE_OUT } from "@/lib/motion";
import { RevealImage } from "@/components/site/reveal-image";
import listening from "@/assets/photos/listening.jpg";

const STYLES = [
  { n: "01", title: "Bollywood Remixes", tag: "Signature" },
  { n: "02", title: "Latin", tag: "Specialty" },
  { n: "03", title: "Tribal", tag: "Specialty" },
  { n: "04", title: "Progressive House", tag: "Specialty" },
  { n: "05", title: "Retro", tag: "Crowd work" },
  { n: "06", title: "Hip-Hop", tag: "Crowd work" },
];

/** Four bars that idle flat and start pumping when the row is hovered. */
function Eq() {
  return (
    <span aria-hidden className="eq flex h-4 items-end gap-[3px]">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className="eq-bar w-[3px] bg-current" style={{ animationDelay: `${i * -0.23}s` }} />
      ))}
    </span>
  );
}

export function Sound() {
  return (
    <section id="sound" className="relative border-b border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div>
            <div className="flex items-baseline gap-4">
              <span className="signal font-mono text-sm">03</span>
              <span className="font-mono text-xs tracking-[0.2em] text-foreground/50 uppercase">
                Sound
              </span>
            </div>
            <h2 className="mt-4 font-display text-5xl tracking-tight uppercase sm:text-6xl">
              Reads the room,
              <br />
              <span className="text-foreground/45">then moves it.</span>
            </h2>
          </div>
          <Button
            size="lg"
            className="hard-shadow h-11 shrink-0 rounded-none bg-primary px-5 text-primary-foreground hover:bg-primary"
            render={
              <a
                href="https://soundcloud.com/djabdulindia"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              />
            }
            nativeButton={false}
          >
            <Headphones className="size-4" />
            Listen on SoundCloud
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
          <div className="border-t border-border">
            {STYLES.map((style, i) => (
              <motion.a
                key={style.title}
                href="https://soundcloud.com/djabdulindia"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: EASE_OUT }}
                className="invert-row group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 border-b border-border px-2 py-6 sm:grid-cols-[3rem_1fr_auto_auto] sm:gap-8 sm:px-4"
              >
                <span className="font-mono text-xs text-foreground/55 group-hover:text-background/60">
                  {style.n}
                </span>
                <h3 className="flex min-w-0 items-center gap-4 font-display text-2xl tracking-tight uppercase sm:text-4xl">
                  <span className="truncate">{style.title}</span>
                  <span className="signal hidden group-hover:text-background sm:inline-flex">
                    <Eq />
                  </span>
                </h3>
                <span className="hidden font-mono text-xs tracking-wider text-foreground/50 uppercase group-hover:text-background/70 sm:inline-block">
                  {style.tag}
                </span>
                <ArrowUpRight className="size-5 shrink-0 text-foreground/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-background" />
              </motion.a>
            ))}
          </div>

          <RevealImage
            src={listening}
            alt="DJ Abdul in sunglasses and headphones, glancing down through orange and blue stage smoke"
            sizes="(min-width: 1024px) 22rem, 100vw"
            frameClassName="aspect-[4/5]"
            className="lg:sticky lg:top-24 lg:self-start"
            caption="Fig. 02 — Listening"
          />
        </div>
      </div>
    </section>
  );
}

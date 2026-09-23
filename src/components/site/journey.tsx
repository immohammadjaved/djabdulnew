"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const MILESTONES = [
  {
    year: "1996",
    name: "Started as Assistant DJ",
    place: "Conquered, Bangalore",
  },
  {
    year: "1998",
    name: "In-House DJ, Urban Edge",
    place: "Bangalore",
  },
  {
    year: "2000s",
    name: "Bollywood Remix Circuit",
    place: "with DJ Ryan, DJ Akbar & DJ Akhtar — Mumbai",
  },
  {
    year: "2009",
    name: "Official DJ, Formula 1",
    place: "F1 India",
  },
  {
    year: "Ongoing",
    name: "Resident DJ",
    place: "Mirchi & Rock Bottom",
  },
  {
    year: "Ongoing",
    name: "MTV Pool Grind & FTV Shows",
    place: "Smirnoff Blast & Bacardi Blast Grooves",
  },
];

export function Journey() {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="journey" className="relative border-b border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
        >
          <div>
            <div className="flex items-baseline gap-4">
              <span className="signal font-mono text-sm">02</span>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/50">
                Journey
              </span>
            </div>
            <h2 className="mt-4 font-display text-4xl uppercase tracking-tight sm:text-5xl">
              The milestones
            </h2>
          </div>
          <p className="max-w-sm text-sm text-foreground/60">
            From Bangalore&apos;s club scene to the Formula 1 paddock &mdash;
            no fixed dates listed here, follow Instagram for live shows.
          </p>
        </motion.div>

        <div ref={listRef} className="relative border-t border-border">
          {/* scroll-linked progress rail */}
          <motion.div
            aria-hidden
            style={{ scaleY: progress }}
            className="bg-signal absolute top-0 -left-px h-full w-0.5 origin-top"
          />
          {MILESTONES.map((item, i) => (
            <motion.a
              key={item.name}
              href="https://www.instagram.com/djabdulindia/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: EASE_OUT }}
              className="invert-row group grid grid-cols-[3.5rem_1fr_auto] items-center gap-4 border-b border-border px-2 py-5 sm:grid-cols-[6rem_1fr_auto] sm:gap-6 sm:px-4"
            >
              <span className="font-mono text-xs uppercase tracking-wider text-foreground/50 group-hover:text-background/60 sm:text-sm">
                {item.year}
              </span>

              <div className="min-w-0">
                <h3 className="truncate font-display text-xl uppercase tracking-tight sm:text-2xl">
                  {item.name}
                </h3>
                <p className="mt-0.5 truncate text-sm text-foreground/60 group-hover:text-background/70">
                  {item.place}
                </p>
              </div>

              <ArrowUpRight className="size-5 shrink-0 text-foreground/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-background" />
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex justify-center"
        >
          <Button
            className="hard-shadow rounded-none bg-primary text-primary-foreground hover:bg-primary"
            render={
              <a
                href="https://www.instagram.com/djabdulindia/"
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            nativeButton={false}
          >
            Follow for upcoming shows
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { RevealImage } from "@/components/site/reveal-image";
import { CountUp } from "@/components/site/count-up";
import leather from "@/assets/photos/leather.jpg";

const STATS = [
  { to: 30, from: 0, suffix: "", label: "Years behind the decks" },
  { to: 2009, from: 1996, suffix: "", label: "Official F1 DJ" },
  { to: 6, from: 0, suffix: "+", label: "Genres in the crate" },
  { to: 2, from: 0, suffix: "", label: "Home cities" },
];

const rise = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

export function About() {
  return (
    <section id="about" className="relative border-b border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[5fr_7fr] md:gap-16">
          <RevealImage
            src={leather}
            alt="DJ Abdul crouched in a leather jacket, holding a pair of studio headphones"
            sizes="(min-width: 768px) 40vw, 100vw"
            className="order-2 md:order-1 md:sticky md:top-24 md:self-start"
            caption="Fig. 01 — Studio portrait"
          />

          <div className="order-1 md:order-2">
            <motion.div
              {...rise}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="flex items-baseline gap-4"
            >
              <span className="signal font-mono text-sm">01</span>
              <span className="font-mono text-xs tracking-[0.2em] text-foreground/50 uppercase">
                About
              </span>
            </motion.div>

            <motion.h2
              {...rise}
              transition={{ duration: 0.7, delay: 0.05, ease: EASE_OUT }}
              className="mt-6 font-display text-5xl leading-[0.92] tracking-tight uppercase sm:text-6xl lg:text-7xl"
            >
              Nearly three decades
              <span className="text-foreground/35"> behind the decks.</span>
            </motion.h2>

            <div className="mt-10 flex flex-col gap-6 text-lg leading-relaxed text-foreground/75">
              <motion.p {...rise} transition={{ duration: 0.6, ease: EASE_OUT }}>
                Abdul started in 1996 as an assistant DJ at Conquered, Bangalore,
                then took over as in-house DJ at Urban Edge. That residency made
                him one of the city&apos;s most respected names in the booth.
              </motion.p>
              <motion.p {...rise} transition={{ duration: 0.6, delay: 0.08, ease: EASE_OUT }}>
                He went on to play freelance and resident sets at the
                region&apos;s biggest clubs, with Bollywood remixes as his
                signature. In Mumbai he shared the booth with DJ Ryan, DJ Akbar
                and DJ Akhtar before building his own catalogue of productions.
              </motion.p>
            </div>

            <motion.blockquote
              {...rise}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
              className="mt-12 border-l-2 border-[var(--signal)] pl-6"
            >
              <p className="font-display text-2xl leading-tight tracking-tight uppercase sm:text-3xl">
                &ldquo;The love &amp; respect for the music made me a DJ.&rdquo;
              </p>
              <footer className="mt-3 font-mono text-xs tracking-[0.2em] text-foreground/45 uppercase">
                DJ Abdul
              </footer>
            </motion.blockquote>

            <div className="mt-14 grid grid-cols-2 border-t border-border">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: EASE_OUT }}
                  className="border-b border-border py-6 odd:border-r odd:pr-4 even:pl-6"
                >
                  <div className="font-display text-5xl uppercase sm:text-6xl">
                    <CountUp to={stat.to} from={stat.from} suffix={stat.suffix} />
                  </div>
                  <div className="mt-2 font-mono text-[11px] tracking-wider text-foreground/50 uppercase">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

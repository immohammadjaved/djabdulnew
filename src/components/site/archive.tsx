"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { EASE_OUT } from "@/lib/motion";
import e006 from "@/assets/events/event-006.jpg";
import e0020 from "@/assets/events/event-0020.jpg";
import e002 from "@/assets/events/event-002.jpg";
import e007 from "@/assets/events/event-007.jpg";
import e005 from "@/assets/events/event-005.jpg";
import e008 from "@/assets/events/event-008.jpg";
import e0015 from "@/assets/events/event-0015.jpg";
import e003 from "@/assets/events/event-003.jpg";
import e0012 from "@/assets/events/event-0012.jpg";
import e004 from "@/assets/events/event-004.jpg";
import e0019 from "@/assets/events/event-0019.jpg";
import e0021 from "@/assets/events/event-0021.jpg";
import e0011 from "@/assets/events/event-0011.jpg";
import e0013 from "@/assets/events/event-0013.jpg";
import e0016 from "@/assets/events/event-0016.jpg";
import e001 from "@/assets/events/event-001.jpg";

type Shot = { src: StaticImageData; alt: string; caption?: string };

// captions only where the photo itself shows where it was taken
const SHOTS: Shot[] = [
  { src: e006, alt: "DJ Abdul at a Pioneer deck in headphones, smiling at the camera" },
  { src: e0020, alt: "DJ Abdul mixing in a club booth" },
  { src: e007, alt: "DJ Abdul on stage in front of a Skechers Vibrants 2005 banner", caption: "Skechers Vibrants, 2005" },
  { src: e002, alt: "DJ Abdul at the decks in a club booth" },
  { src: e005, alt: "DJ Abdul with a guest in the Z Lounge booth", caption: "Z Lounge" },
  { src: e008, alt: "DJ Abdul and a friend clowning at the decks" },
  { src: e0015, alt: "DJ Abdul with a fellow DJ behind the mixer" },
  { src: e001, alt: "Formula 1 cars through the first corner of a race", caption: "Formula 1" },
  { src: e003, alt: "DJ Abdul and crew crowded around the booth" },
  { src: e0019, alt: "DJ Abdul and fellow DJs in the booth" },
  { src: e0012, alt: "DJ Abdul at the decks with a guest beside him" },
  { src: e004, alt: "DJ Abdul with friends backstage" },
  { src: e0013, alt: "DJ Abdul relaxing with friends in a lounge" },
  { src: e0021, alt: "DJ Abdul with a guest in a packed club" },
  { src: e0011, alt: "DJ Abdul with a guest at a club night" },
  { src: e0016, alt: "DJ Abdul with a guest outside a venue" },
];

const pad = (n: number) => String(n).padStart(2, "0");

function Lightbox({
  index,
  openedFrom,
  onClose,
  onStep,
}: {
  index: number;
  openedFrom: number;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const shot = SHOTS[index];

  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onStep(1);
      else if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      root.style.overflow = prevOverflow;
      prevFocus?.focus();
    };
  }, [onClose, onStep]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-[60] flex flex-col bg-background/95"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: EASE_OUT }}
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-5 py-4 font-mono text-xs tracking-[0.2em] text-foreground/60 uppercase">
        <span className="tabular-nums">
          <span className="text-foreground">{pad(index + 1)}</span> / {pad(SHOTS.length)}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close viewer"
          className="flex size-10 cursor-pointer items-center justify-center text-foreground/80 transition-colors hover:text-[var(--signal)]"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20">
        {/* only the photo that was clicked morphs out of its tile; stepping through cross-fades */}
        <motion.figure
          key={index}
          layoutId={index === openedFrom ? `shot-${index}` : undefined}
          initial={index === openedFrom ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
          onClick={(e) => e.stopPropagation()}
          className="relative"
          style={{ width: `min(${shot.src.width}px, 92vw, calc(78svh * ${shot.src.width / shot.src.height}))` }}
        >
          <Image
            src={shot.src}
            alt={shot.alt}
            sizes="92vw"
            placeholder="blur"
            className="h-auto w-full"
          />
        </motion.figure>

        <button
          type="button"
          aria-label="Previous photo"
          onClick={(e) => {
            e.stopPropagation();
            onStep(-1);
          }}
          className="absolute top-1/2 left-2 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center bg-background/60 text-foreground/80 transition-colors hover:text-[var(--signal)] sm:left-5"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          aria-label="Next photo"
          onClick={(e) => {
            e.stopPropagation();
            onStep(1);
          }}
          className="absolute top-1/2 right-2 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center bg-background/60 text-foreground/80 transition-colors hover:text-[var(--signal)] sm:right-5"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <p className="min-h-14 px-5 py-4 text-center font-mono text-xs tracking-[0.2em] text-foreground/55 uppercase">
        {shot.caption ?? " "}
      </p>
    </motion.div>
  );
}

export function Archive() {
  const [open, setOpen] = useState<number | null>(null);
  const [openedFrom, setOpenedFrom] = useState(0);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpen((i) => (i === null ? i : (i + dir + SHOTS.length) % SHOTS.length)),
    [],
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto max-w-6xl px-5 pt-24 sm:pt-28">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="font-mono text-xs tracking-[0.2em] text-foreground/50 uppercase">
              From the archive
            </span>
            <h3 className="mt-3 font-display text-4xl tracking-tight uppercase sm:text-5xl">
              Booths, backstage &amp; afters
            </h3>
          </div>
          <p className="max-w-xs text-sm text-foreground/55">
            Point-and-shoot memories from the club years. Tap any frame to
            see it in full.
          </p>
        </div>

        <ul className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">
          {SHOTS.map((shot, i) => (
            <motion.li
              key={shot.src.src}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 4) * 0.05, ease: EASE_OUT }}
              className="mb-3 break-inside-avoid sm:mb-4"
            >
              <button
                type="button"
                onClick={() => {
                  setOpenedFrom(i);
                  setOpen(i);
                }}
                aria-label={`Open photo ${i + 1}: ${shot.alt}`}
                className="group block w-full cursor-zoom-in text-left"
              >
                <motion.div
                  layoutId={`shot-${i}`}
                  className="relative overflow-hidden bg-card"
                  style={{ aspectRatio: `${shot.src.width} / ${shot.src.height}` }}
                >
                  <Image
                    src={shot.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 18rem, (min-width: 640px) 33vw, 50vw"
                    placeholder="blur"
                    // one shared grade so mixed cameras & flash read as a single set
                    className="object-cover brightness-[0.8] contrast-[1.1] grayscale-[0.9] transition-[filter,transform] duration-500 ease-out group-hover:scale-[1.03] group-hover:brightness-100 group-hover:grayscale-0 group-focus-visible:grayscale-0"
                  />
                </motion.div>
                {/* columns flow top-to-bottom, so no running numbers here — the viewer shows n / total */}
                {shot.caption && (
                  <span className="mt-2 block font-mono text-[10px] tracking-[0.2em] text-foreground/55 uppercase">
                    {shot.caption}
                  </span>
                )}
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {open !== null && (
          <Lightbox index={open} openedFrom={openedFrom} onClose={close} onStep={step} />
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}

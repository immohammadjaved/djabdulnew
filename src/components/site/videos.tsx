"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { EASE_OUT } from "@/lib/motion";
import { YoutubeIcon } from "@/components/site/social-icons";

const VIDEOS = [
  { id: "HtCmAkrnJRo", title: "Aayi Nai", mix: "Club Mix", with: "DJ Ganesh" },
  { id: "XDfe3pcoqd8", title: "Kaavaalaa", mix: "Circuit Mix", with: "DJ Ganesh" },
  { id: "cHrJYB7l06M", title: "Numb vs 9:59", mix: "Mashup", with: "DJ Ganesh" },
  { id: "3UIopVjsGdw", title: "What Jhumka", mix: "Club Mix", with: "DJ Ganesh" },
  { id: "FcoSFsXdEdo", title: "Talli", mix: "Club Mix", with: "DJ Ganesh" },
  { id: "KJ0N_jHjfVU", title: "Kalaastar", mix: "Mix", with: null },
];

const CHANNEL = "https://www.youtube.com/channel/UCx2W91p0j2Kj6LKh56HMmEQ";

/** Thumbnail first; the iframe only loads once someone presses play. */
function Player({ video }: { video: (typeof VIDEOS)[number] }) {
  const [playing, setPlaying] = useState(false);
  const [thumb, setThumb] = useState(`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`);
  const label = `${video.title} (${video.mix})`;

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-card">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
          title={`${label} by DJ Abdul`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play ${label}`}
          className="group absolute inset-0 cursor-pointer"
        >
          <Image
            src={thumb}
            alt=""
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            // maxres isn't generated for every upload — fall back to the always-present hq frame
            onError={() => setThumb(`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`)}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          {/* thumbnails carry their own title art — just a light scrim for the button */}
          <span className="absolute inset-0 bg-gradient-to-tl from-background/50 via-transparent to-transparent" />
          <span className="bg-signal absolute right-4 bottom-4 flex size-14 shrink-0 items-center justify-center text-background transition-transform duration-200 ease-out group-hover:scale-105 group-active:scale-95 sm:right-6 sm:bottom-6 sm:size-16">
            <Play className="size-5 translate-x-px fill-current" />
          </span>
        </button>
      )}
    </div>
  );
}

export function Videos() {
  const [active, setActive] = useState(0);
  const current = VIDEOS[active];

  return (
    <section id="videos" className="relative border-b border-border py-24 sm:py-32">
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
              <span className="signal font-mono text-sm">04</span>
              <span className="font-mono text-xs tracking-[0.2em] text-foreground/50 uppercase">
                Watch
              </span>
            </div>
            <h2 className="mt-4 font-display text-5xl tracking-tight uppercase sm:text-6xl">
              Latest mixes
            </h2>
          </div>
          <a
            href={CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 font-mono text-xs tracking-wider text-foreground/60 uppercase transition-colors hover:text-[var(--signal)]"
          >
            <YoutubeIcon className="size-4" />
            All videos on YouTube
            <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_20rem] lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE_OUT }}
          >
            {/* keyed so each pick remounts fresh (thumbnail state, iframe) and fades in */}
            <motion.div
              key={current.id}
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
            >
              <Player video={current} />
            </motion.div>
          </motion.div>

          <ol className="border-t border-border" aria-label="Mixes">
            {VIDEOS.map((video, i) => {
              const isActive = i === active;
              return (
                <li key={video.id} className="border-b border-border">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={isActive}
                    className={`group relative grid w-full cursor-pointer grid-cols-[2rem_1fr_auto] items-center gap-3 py-4 pr-2 pl-4 text-left transition-colors duration-200 ${
                      isActive ? "bg-foreground/[0.04]" : "hover:bg-foreground/[0.03]"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="video-active"
                        transition={{ duration: 0.25, ease: EASE_OUT }}
                        className="bg-signal absolute inset-y-0 left-0 w-0.5"
                      />
                    )}
                    <span
                      className={`font-mono text-xs tabular-nums ${
                        isActive ? "signal" : "text-foreground/35"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-display text-xl tracking-tight uppercase">
                        {video.title}
                      </span>
                      <span className="mt-0.5 block truncate font-mono text-[10px] tracking-[0.15em] text-foreground/45 uppercase">
                        {video.mix}
                        {video.with && <> &middot; w/ {video.with}</>}
                      </span>
                    </span>
                    <Play
                      className={`size-3.5 transition-colors ${
                        isActive
                          ? "signal fill-current"
                          : "text-foreground/30 group-hover:text-foreground/70"
                      }`}
                    />
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

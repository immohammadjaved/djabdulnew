import { ArrowUpRight } from "lucide-react";
import { LogoMark, LogoWordmark } from "@/components/site/logo";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/djabdulindia/" },
  { label: "SoundCloud", href: "https://soundcloud.com/djabdulindia" },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCx2W91p0j2Kj6LKh56HMmEQ",
  },
  { label: "Facebook", href: "https://www.facebook.com/djabdulindia" },
];

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#sound", label: "Sound" },
  { href: "#videos", label: "Watch" },
  { href: "#gallery", label: "Frames" },
  { href: "#booking", label: "Booking" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background pt-16 pb-8">
      <div className="mx-auto max-w-6xl px-5">
        <a
          href="#booking"
          className="group flex flex-col items-start justify-between gap-4 border-b border-border pb-12 sm:flex-row sm:items-end"
        >
          <span className="font-display text-5xl uppercase leading-none tracking-tight sm:text-7xl">
            Let&apos;s work
            <br />
            together
          </span>
          <span className="flex shrink-0 items-center gap-2 font-mono text-sm uppercase tracking-wider text-foreground/60 transition-colors group-hover:text-[var(--signal)]">
            Book DJ Abdul
            <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </a>

        <div className="grid grid-cols-2 gap-10 py-12 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <a href="#home" className="flex items-center gap-2.5">
              <LogoMark className="h-8 w-8" />
              <LogoWordmark size="text-lg" />
            </a>
            <p className="mt-4 max-w-[20ch] text-sm text-foreground/60">
              DJ &amp; producer behind the decks since 1996.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/40">
              Navigate
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground/70 transition-colors hover:text-[var(--signal)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/40">
              Follow
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-foreground/70 transition-colors hover:text-[var(--signal)]"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/40">
              Contact
            </h4>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-foreground/70">
              <li>djabdul23@gmail.com</li>
              <li>+91 88673 36482</li>
              <li>Bangalore, India</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-6 font-mono text-xs uppercase tracking-wider text-foreground/40 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} DJ Abdul. All rights reserved.</p>
          <p>Designed for the dance floor.</p>
        </div>
      </div>
    </footer>
  );
}

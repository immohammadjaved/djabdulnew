"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogoMark, LogoWordmark } from "@/components/site/logo";

const NAV_LINKS = [
  { href: "#about", label: "About", index: "01" },
  { href: "#journey", label: "Journey", index: "02" },
  { href: "#sound", label: "Sound", index: "03" },
  { href: "#videos", label: "Watch", index: "04" },
  { href: "#gallery", label: "Frames", index: "05" },
  { href: "#booking", label: "Booking", index: "06" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-border bg-background/95 backdrop-blur-sm"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="#home" className="flex items-center gap-2.5">
          <LogoMark className="h-8 w-8" />
          <LogoWordmark size="text-lg" />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-foreground/70 transition-colors hover:text-foreground"
            >
              <span className="signal">{link.index}</span>
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button
            className="hard-shadow rounded-none bg-primary text-primary-foreground hover:bg-primary"
            render={<a href="#booking" />}
            nativeButton={false}
          >
            Book Now
          </Button>
        </div>

        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="rounded-none text-foreground lg:hidden"
                aria-label="Open menu"
              />
            }
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent
            side="right"
            showCloseButton={false}
            className="w-full max-w-none rounded-none border-border bg-background sm:max-w-none"
          >
            <SheetHeader className="flex-row items-center justify-between border-b border-border px-5 py-4">
              <SheetTitle>
                <span className="flex items-center gap-2">
                  <LogoMark className="h-7 w-7" />
                  <LogoWordmark size="text-base" />
                </span>
              </SheetTitle>
              <SheetClose
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-none"
                    aria-label="Close menu"
                  />
                }
              >
                <X className="size-5" />
              </SheetClose>
            </SheetHeader>
            <div className="flex flex-1 flex-col justify-center gap-2 px-6">
              {NAV_LINKS.map((link) => (
                <SheetClose
                  key={link.href}
                  render={
                    <a
                      href={link.href}
                      className="group flex items-baseline gap-4 border-b border-border py-4"
                    />
                  }
                  nativeButton={false}
                >
                  <span className="signal font-mono text-sm">
                    {link.index}
                  </span>
                  <span className="font-display text-4xl uppercase tracking-wide">
                    {link.label}
                  </span>
                </SheetClose>
              ))}
              <SheetClose
                render={
                  <a
                    href="#booking"
                    className={buttonVariants({
                      className:
                        "mt-6 w-full rounded-none bg-primary text-primary-foreground hover:bg-primary",
                    })}
                  />
                }
                nativeButton={false}
              >
                Book Now
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className={`bg-signal absolute inset-x-0 -bottom-px h-px origin-left transition-opacity duration-300 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />
    </header>
  );
}

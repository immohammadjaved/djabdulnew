"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Mail, MapPin, MessageCircle, Phone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const EMAIL = "djabdul23@gmail.com";
const WHATSAPP = "918867336482";

const CONTACT_INFO = [
  { icon: Mail, label: EMAIL, href: `mailto:${EMAIL}` },
  {
    icon: MessageCircle,
    label: "WhatsApp +91 88673 36482",
    href: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi Abdul, I'd like to book you for an event.")}`,
  },
  { icon: Phone, label: "+91 90315 68816", href: "tel:+919031568816" },
  { icon: MapPin, label: "Based in Bangalore · Touring Pan-India" },
];

const EVENT_LABELS: Record<string, string> = {
  club: "Club Night",
  festival: "Festival",
  wedding: "Wedding",
  private: "Private Event",
  corporate: "Corporate Event",
  other: "Other",
};

export function Booking() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  // no backend yet — hand the enquiry to the visitor's mail app, pre-filled
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const type = EVENT_LABELS[get("event-type")] ?? "Event";
    const subject = `Booking enquiry: ${type}${get("date") ? ` on ${get("date")}` : ""}`;
    const body = [
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      `Event type: ${type}`,
      `Date: ${get("date") || "TBC"}`,
      "",
      get("message"),
    ].join("\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("sent");
  }

  return (
    <section id="booking" className="relative border-b border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-[0.85fr_1.15fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-baseline gap-4">
              <span className="signal font-mono text-sm">06</span>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/50">
                Booking
              </span>
            </div>
            <h2 className="mt-4 font-display text-4xl uppercase tracking-tight sm:text-5xl">
              Book DJ Abdul
            </h2>
            <p className="mt-6 max-w-md text-foreground/70 leading-relaxed">
              Available for club nights, festivals, weddings and private
              events. Tell us about your event and we&apos;ll get back to
              you shortly.
            </p>

            <div className="mt-10 flex flex-col border-t border-border">
              {CONTACT_INFO.map((item) => {
                const inner = (
                  <>
                    <item.icon className="signal size-4 shrink-0" />
                    {item.label}
                  </>
                );
                const cls =
                  "flex items-center gap-3 border-b border-border py-4 text-sm text-foreground/75";
                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    {...(item.href.startsWith("http") && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                    className={`${cls} transition-colors hover:text-[var(--signal)]`}
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={item.label} className={cls}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="border border-border bg-card p-6 sm:p-8"
          >
            {status === "sent" ? (
              <div className="flex min-h-72 flex-col items-center justify-center gap-4 text-center">
                <CheckCircle2 className="signal size-10" />
                <h3 className="font-display text-2xl uppercase tracking-tight">
                  Almost there
                </h3>
                <p className="max-w-xs text-sm text-foreground/60">
                  Your email app should have opened with the details filled
                  in &mdash; just hit send. Nothing opened? Write to{" "}
                  <a href={`mailto:${EMAIL}`} className="underline underline-offset-4 hover:text-[var(--signal)]">
                    {EMAIL}
                  </a>{" "}
                  or message on WhatsApp.
                </p>
                <Button
                  variant="outline"
                  className="mt-2 rounded-none border-border"
                  onClick={() => setStatus("idle")}
                >
                  Send another request
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Full name</Label>
                    <Input
                      id="name"
                      name="name"
                      autoComplete="name"
                      placeholder="Your name"
                      className="h-11 rounded-none"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@email.com"
                      className="h-11 rounded-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="date">Event date</Label>
                    <Input id="date" name="date" type="date" className="h-11 rounded-none" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="event-type">Event type</Label>
                    {/* native select: system picker on phones, no popover JS */}
                    <div className="relative">
                      <select
                        id="event-type"
                        name="event-type"
                        defaultValue=""
                        className="h-11 w-full cursor-pointer appearance-none rounded-none border border-input bg-transparent py-1 pr-8 pl-2.5 text-base outline-none transition-colors invalid:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"
                        required
                      >
                        <option value="" disabled>
                          Select an event type
                        </option>
                        {Object.entries(EVENT_LABELS).map(([value, label]) => (
                          <option key={value} value={value} className="bg-popover text-foreground">
                            {label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="message">Tell us about your event</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Venue, expected crowd size, city, vibe..."
                    className="min-h-32 rounded-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="hard-shadow mt-2 rounded-none bg-primary text-primary-foreground hover:bg-primary"
                >
                  Send Booking Request
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

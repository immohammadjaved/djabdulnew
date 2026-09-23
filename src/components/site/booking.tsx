"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CONTACT_INFO = [
  { icon: Mail, label: "djabdul23@gmail.com" },
  { icon: Phone, label: "+91 88673 36482 · +91 90315 68816" },
  { icon: MapPin, label: "Based in Bangalore · Touring Pan-India" },
];

export function Booking() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 900);
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
              {CONTACT_INFO.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-3 border-b border-border py-4 text-sm text-foreground/75"
                >
                  <item.icon className="signal size-4 shrink-0" />
                  {item.label}
                </div>
              ))}
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
                  Request received
                </h3>
                <p className="max-w-xs text-sm text-foreground/60">
                  Thanks for reaching out. The team will get back to you
                  shortly to confirm the details.
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
                      placeholder="Your name"
                      className="rounded-none"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@email.com"
                      className="rounded-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="date">Event date</Label>
                    <Input id="date" type="date" className="rounded-none" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="event-type">Event type</Label>
                    <Select name="event-type">
                      <SelectTrigger
                        id="event-type"
                        className="w-full rounded-none"
                      >
                        <SelectValue placeholder="Select an event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="club">Club Night</SelectItem>
                        <SelectItem value="festival">Festival</SelectItem>
                        <SelectItem value="wedding">Wedding</SelectItem>
                        <SelectItem value="private">Private Event</SelectItem>
                        <SelectItem value="corporate">
                          Corporate Event
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="message">Tell us about your event</Label>
                  <Textarea
                    id="message"
                    placeholder="Venue, expected crowd size, city, vibe..."
                    className="min-h-32 rounded-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "sending"}
                  className="hard-shadow mt-2 rounded-none bg-primary text-primary-foreground hover:bg-primary"
                >
                  {status === "sending" ? "Sending..." : "Send Booking Request"}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

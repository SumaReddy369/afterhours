"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { WaitlistIntakeFields } from "@/components/forms/WaitlistIntakeFields";
import { easeOut } from "./motion";

export function WaitlistFinalSection() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMsg(null);
    const fd = new FormData(e.currentTarget);

    const situations = fd.getAll("situations").map(String);
    const availability = fd.getAll("availability").map(String);
    const affinity = fd.getAll("affinity").map(String);
    const comfortNotes = String(fd.get("comfortNotes") ?? "").trim();
    const rawVibe = String(fd.get("podVibe") ?? "no_preference");

    if (situations.length === 0 && availability.length === 0 && comfortNotes.length < 5) {
      setStatus("err");
      setMsg(
        "Add at least one situation or availability, or a few words in private notes—so we can match you into a real pod.",
      );
      return;
    }

    const payload = {
      email: String(fd.get("email") ?? ""),
      city: String(fd.get("city") ?? ""),
      timezone: String(fd.get("timezone") ?? ""),
      situations,
      availability,
      affinity,
      comfortNotes,
      podVibe: rawVibe === "no_preference" ? undefined : (rawVibe as "quiet_parallel" | "socially_light"),
      consent: fd.get("consent") === "on",
      website: String(fd.get("website") ?? ""),
    };

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean; message?: string };
      if (!res.ok) {
        setStatus("err");
        setMsg(typeof data.message === "string" ? data.message : "Try again.");
        return;
      }
      setStatus("ok");
      setMsg(typeof data.message === "string" ? data.message : "You’re on the list.");
      e.currentTarget.reset();
    } catch {
      setStatus("err");
      setMsg("Network error. Check your connection and try again.");
    }
  }

  return (
    <section id="waitlist" className="scroll-mt-24 px-4 pb-24 pt-8 sm:px-6 sm:pb-32">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55, ease: easeOut }}
        className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-ah-border/70 bg-gradient-to-br from-ah-accent/10 via-ah-card to-ah-bg-alt/90 p-6 shadow-[0_40px_100px_-48px_rgba(45,90,74,0.35)] sm:p-10 lg:p-12"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ah-ink sm:text-4xl">Get early access</h2>
          <p className="mt-3 text-ah-muted">
            Full intake helps us match you into a six-person pod when your city opens—not just an email blast.
            Prefer a shorter flow?{" "}
            <Link href="/waitlist" className="font-semibold text-ah-accent underline-offset-2 hover:underline">
              Step-by-step form
            </Link>
            .
          </p>
        </div>

        {!mounted ? (
          <div
            className="relative mx-auto mt-10 min-h-[320px] max-w-2xl animate-pulse rounded-2xl bg-ah-bg-alt/40"
            aria-busy="true"
            aria-label="Loading form"
          />
        ) : (
          <form onSubmit={onSubmit} className="relative mx-auto mt-10 max-w-2xl space-y-6" noValidate>
            <WaitlistIntakeFields idPrefix="landing-wl" variant="compact" />

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-ah-border/60 bg-ah-card/80 p-4 text-left text-sm text-ah-muted">
              <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 shrink-0 rounded border-ah-border text-ah-accent" />
              <span>
                I agree to be contacted about AfterHours in my area and understand I can unsubscribe anytime.{" "}
                <span className="text-ah-warm">*</span>
              </span>
            </label>

            <div className="pt-2">
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-full bg-ah-accent py-4 text-sm font-semibold text-white shadow-lg shadow-ah-accent/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-ah-accent-soft hover:shadow-xl disabled:opacity-60"
              >
                {status === "loading" ? "Submitting…" : "Join waitlist with full match profile"}
              </button>
            </div>

            {msg && (
              <p
                role="status"
                className={`text-center text-sm font-medium ${status === "err" ? "text-red-700" : "text-ah-accent"}`}
              >
                {msg}
              </p>
            )}

            <p className="text-center text-xs text-ah-muted">
              AfterHours is for building connection, not crisis care—see the footer for 988 / crisis resources and clinical
              boundaries.
            </p>
          </form>
        )}
      </motion.div>
    </section>
  );
}

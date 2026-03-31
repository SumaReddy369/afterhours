"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { easeOut } from "./motion";

const vibeOptions = [
  { id: "chill", label: "Chill & low-key" },
  { id: "curious", label: "Curious & conversational" },
  { id: "active", label: "Walks & light activity" },
  { id: "creative", label: "Creative / artsy" },
] as const;

const availabilitySlots = [
  { id: "mon", label: "Mon eve" },
  { id: "tue", label: "Tue eve" },
  { id: "wed", label: "Wed eve" },
  { id: "thu", label: "Thu eve" },
  { id: "fri", label: "Fri eve" },
  { id: "sat", label: "Sat pm" },
  { id: "sun", label: "Sun pm" },
] as const;

type DemoPhase = "idle" | "matching" | "slot" | "theme" | "rituals" | "done";

function themeForVibe(vibeId: (typeof vibeOptions)[number]["id"]): string {
  const m: Record<string, string> = {
    chill: "Easy weeknight hangs—no agenda, real presence",
    curious: "Conversation-forward: prompts, not small talk",
    active: "Move together: walks, parks, low-stress outings",
    creative: "Museums, galleries, and maker-adjacent meetups",
  };
  return m[vibeId] ?? m.chill;
}

function slotFromAvailability(ids: string[]): string {
  if (ids.includes("thu")) return "Thursday · 7:00 PM";
  if (ids.includes("wed")) return "Wednesday · 7:00 PM";
  if (ids.includes("tue")) return "Tuesday · 7:00 PM";
  if (ids.includes("mon")) return "Monday · 7:00 PM";
  if (ids.includes("fri")) return "Friday · 7:00 PM";
  if (ids.includes("sat")) return "Saturday · 4:00 PM";
  if (ids.includes("sun")) return "Sunday · 4:00 PM";
  return "Thursday · 7:00 PM";
}

const demoMembers = ["A", "S", "J", "R", "C", "M"];

export function PodFormationDemo() {
  const reduce = useReducedMotion();
  /** Avoid hydration mismatches when extensions inject attributes (e.g. fdprocessedid) into inputs before React attaches. */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [city, setCity] = useState("Phoenix");
  const [vibe, setVibe] = useState<(typeof vibeOptions)[number]["id"]>("chill");
  const [prefs, setPrefs] = useState("Quiet venues first · optional icebreakers · no pressure to perform");
  const [availability, setAvailability] = useState<string[]>(["thu", "wed"]);
  const [phase, setPhase] = useState<DemoPhase>("idle");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const sharedSlot = useMemo(
    () => slotFromAvailability(availability.length > 0 ? availability : ["thu"]),
    [availability],
  );
  const podTheme = useMemo(() => themeForVibe(vibe), [vibe]);

  const rituals = useMemo(
    () => [
      { w: 1, title: "Coffee + structured intros", detail: "Short prompts, easy exits" },
      { w: 2, title: "Neighborhood walk (30 min)", detail: "Same slot, lighter prep" },
      { w: 3, title: "Low-key board games or cards", detail: "Pairs & trios, not a party" },
    ],
    [],
  );

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const toggleAvail = (id: string) => {
    setAvailability((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const runDemo = () => {
    clearTimers();
    if (availability.length === 0) {
      setAvailability(["thu"]);
    }
    const step = reduce ? 120 : 900;
    setPhase("matching");
    const t1 = setTimeout(() => setPhase("slot"), step);
    const t2 = setTimeout(() => setPhase("theme"), step * 2);
    const t3 = setTimeout(() => setPhase("rituals"), step * 2 + (reduce ? 120 : 800));
    const t4 = setTimeout(() => setPhase("done"), step * 3 + (reduce ? 120 : 1100));
    timers.current = [t1, t2, t3, t4];
  };

  const reset = () => {
    clearTimers();
    setPhase("idle");
  };

  const showOutput = phase !== "idle";

  return (
    <section id="pod-demo" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: easeOut }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ah-warm">Live prototype</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ah-ink sm:text-4xl">
            See a pod form in real time
          </h2>
          <p className="mt-3 max-w-2xl text-ah-muted">
            Built for young professionals in a new city who want connection without the churn. Enter your city, when
            you’re free, your vibe, and what &ldquo;low pressure&rdquo; means to you—then watch how AfterHours assembles a
            six-person pod, picks a shared slot, generates a theme, and suggests your first three weekly rituals. This is a
            front-end simulation to show the mechanism (not a live backend).
          </p>
        </motion.div>

        {!mounted ? (
          <div
            className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start"
            aria-busy="true"
            aria-label="Loading interactive demo"
          >
            <div className="min-h-[420px] animate-pulse rounded-3xl bg-ah-bg-alt/50" />
            <div className="min-h-[420px] animate-pulse rounded-3xl bg-ah-bg-alt/40" />
          </div>
        ) : (
        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start lg:gap-10">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="rounded-3xl border border-ah-border/80 bg-ah-card p-6 shadow-sm sm:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-ah-muted">Your inputs</p>
            <label className="mt-5 block">
              <span className="text-sm font-medium text-ah-ink">City</span>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-ah-border/80 bg-ah-bg/80 px-4 py-3 text-ah-ink placeholder:text-ah-muted/70 focus:border-ah-accent/50 focus:outline-none focus:ring-2 focus:ring-ah-accent/20"
                placeholder="e.g. Austin"
                autoComplete="address-level2"
              />
            </label>

            <fieldset className="mt-6">
              <legend className="text-sm font-medium text-ah-ink">Weekly availability</legend>
              <p className="mt-1 text-xs text-ah-muted">We overlap these to pick one shared slot.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {availabilitySlots.map((s) => {
                  const on = availability.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleAvail(s.id)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                        on
                          ? "border-ah-accent bg-ah-accent/10 text-ah-ink"
                          : "border-ah-border/80 bg-ah-bg-alt/60 text-ah-muted hover:border-ah-accent/30"
                      }`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className="mt-6">
              <legend className="text-sm font-medium text-ah-ink">Vibe</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {vibeOptions.map((v) => (
                  <label
                    key={v.id}
                    className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition-colors ${
                      vibe === v.id
                        ? "border-ah-accent bg-ah-accent/8"
                        : "border-ah-border/70 bg-ah-bg-alt/40 hover:border-ah-accent/25"
                    }`}
                  >
                    <input
                      type="radio"
                      name="vibe"
                      className="text-ah-accent focus:ring-ah-accent/30"
                      checked={vibe === v.id}
                      onChange={() => setVibe(v.id)}
                    />
                    <span className="text-ah-ink">{v.label}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="mt-6 block">
              <span className="text-sm font-medium text-ah-ink">Low-pressure preferences</span>
              <textarea
                value={prefs}
                onChange={(e) => setPrefs(e.target.value)}
                rows={3}
                className="mt-1.5 w-full resize-y rounded-xl border border-ah-border/80 bg-ah-bg/80 px-4 py-3 text-sm text-ah-ink placeholder:text-ah-muted/70 focus:border-ah-accent/50 focus:outline-none focus:ring-2 focus:ring-ah-accent/20"
                placeholder="What helps you feel safe showing up?"
              />
            </label>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={runDemo}
                disabled={phase !== "idle" && phase !== "done"}
                className="rounded-full bg-ah-accent px-6 py-3 text-sm font-semibold text-white shadow-md shadow-ah-accent/25 transition-all hover:-translate-y-0.5 hover:bg-ah-accent-soft disabled:pointer-events-none disabled:opacity-50"
              >
                {phase === "idle" || phase === "done" ? "Run live formation demo" : "Forming…"}
              </button>
              {showOutput && (
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-full border border-ah-border bg-ah-bg/80 px-5 py-3 text-sm font-semibold text-ah-ink hover:border-ah-accent/35"
                >
                  Reset
                </button>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative min-h-[420px] overflow-hidden rounded-3xl border border-ah-border/80 bg-gradient-to-br from-ah-bg-alt/90 to-ah-card p-6 shadow-[0_32px_80px_-32px_rgba(20,24,22,0.12)] sm:p-8"
          >
            <div className="pointer-events-none absolute -left-16 top-0 h-48 w-48 rounded-full bg-ah-accent/8 blur-3xl" />
            <p className="relative text-xs font-semibold uppercase tracking-wider text-ah-muted">System output</p>

            {!showOutput ? (
              <div className="relative mt-16 flex flex-col items-center justify-center text-center">
                <p className="max-w-xs text-sm text-ah-muted">
                  Fill in your details and run the demo to see matching, a shared slot, a pod theme, and three starter
                  rituals.
                </p>
              </div>
            ) : (
              <div className="relative mt-6 space-y-5">
                {(phase === "matching" || phase === "slot" || phase === "theme" || phase === "rituals" || phase === "done") && (
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-ah-border/60 bg-ah-card/95 p-4"
                  >
                    <p className="text-xs font-semibold text-ah-warm">6 people matched</p>
                    <p className="mt-1 text-sm text-ah-muted">
                      In <span className="font-medium text-ah-ink">{city.trim() || "your city"}</span> with overlapping
                      availability and compatible low-pressure prefs.
                    </p>
                    <div className="mt-4 flex -space-x-2">
                      {demoMembers.map((m, i) => (
                        <motion.div
                          key={m}
                          initial={reduce ? false : { opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: reduce ? 0 : 0.05 * i }}
                          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ah-card bg-gradient-to-br from-ah-bg-alt to-ah-border/40 text-xs font-semibold text-ah-ink"
                        >
                          {m}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {(phase === "slot" || phase === "theme" || phase === "rituals" || phase === "done") && (
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-ah-border/60 bg-ah-card/95 p-4"
                  >
                    <p className="text-xs font-semibold text-ah-warm">Shared slot selected</p>
                    <p className="mt-1 font-display text-xl font-bold text-ah-ink">{sharedSlot}</p>
                    <p className="mt-1 text-xs text-ah-muted">Same evening every week for the season.</p>
                  </motion.div>
                )}

                {(phase === "theme" || phase === "rituals" || phase === "done") && (
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-ah-border/60 bg-ah-card/95 p-4"
                  >
                    <p className="text-xs font-semibold text-ah-warm">Pod theme generated</p>
                    <p className="mt-2 text-sm leading-relaxed text-ah-ink">{podTheme}</p>
                    <p className="mt-2 text-xs text-ah-muted line-clamp-2">Preferences factored in: {prefs}</p>
                  </motion.div>
                )}

                {(phase === "rituals" || phase === "done") && (
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl border border-ah-border/60 bg-ah-bg/85 p-4"
                  >
                    <p className="text-xs font-semibold text-ah-warm">First 3 weekly rituals suggested</p>
                    <ul className="mt-3 space-y-3">
                      {rituals.map((r) => (
                        <li key={r.w} className="flex gap-3 text-sm">
                          <span className="shrink-0 rounded-lg bg-ah-accent/15 px-2 py-0.5 text-xs font-semibold text-ah-accent">
                            W{r.w}
                          </span>
                          <span>
                            <span className="font-medium text-ah-ink">{r.title}</span>
                            <span className="block text-xs text-ah-muted">{r.detail}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {phase === "done" && (
                  <motion.p
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-xs font-medium text-ah-accent"
                  >
                    Demo complete — that’s the core loop: match → slot → theme → rituals.
                  </motion.p>
                )}
              </div>
            )}
          </motion.div>
        </div>
        )}
      </div>
    </section>
  );
}

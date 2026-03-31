"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeOut, fadeUp, stagger } from "./motion";

const weeks = [
  {
    week: 1,
    headline: "First contact",
    detail: "2 people hesitant, 1 no-show. Conversation prompts keep the thread warm.",
    tone: "normal" as const,
  },
  {
    week: 2,
    headline: "Rhythm appears",
    detail: "Attendance steadies. Micro-host rotates—nobody is the unpaid planner.",
    tone: "normal" as const,
  },
  {
    week: 3,
    headline: "Comfort rising",
    detail: "Group norms form: same slot, low stakes, opt-in depth.",
    tone: "up" as const,
  },
  {
    week: 4,
    headline: "Trust compounds",
    detail: "Inside jokes, honest check-ins. Reporting stays one tap if something’s off.",
    tone: "up" as const,
  },
  {
    week: 5,
    headline: "Depth without pressure",
    detail: "Optional deeper prompts; still easy exits and quiet options.",
    tone: "up" as const,
  },
  {
    week: 6,
    headline: "Choose what’s next",
    detail: "Renew the season, spin off a smaller hangout circle, or pause—your call.",
    tone: "milestone" as const,
  },
];

export function SeasonProgressionSection() {
  const reduce = useReducedMotion();

  return (
    <section id="season-progression" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="font-display text-3xl font-bold tracking-tight text-ah-ink sm:text-4xl"
        >
          Week 1 → week 6: trust through repetition
        </motion.h2>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05, ease: easeOut }}
          className="mt-3 max-w-2xl text-ah-muted"
        >
          Connection gets easier when showing up gets easier—not when you perform harder. AfterHours uses the same people
          and the same weekly slot so familiarity can grow without forcing instant best-friend energy—especially after a
          move when your confidence is tired from starting over.
        </motion.p>

        <motion.ol
          variants={reduce ? undefined : stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {weeks.map((w) => (
            <motion.li
              key={w.week}
              variants={reduce ? undefined : fadeUp}
              transition={{ duration: 0.45, ease: easeOut }}
              className={`relative flex flex-col rounded-2xl border p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
                w.tone === "milestone"
                  ? "border-ah-accent/35 bg-gradient-to-br from-ah-accent/10 to-ah-card"
                  : w.tone === "up"
                    ? "border-ah-border/70 bg-ah-card"
                    : "border-ah-border/80 bg-ah-bg-alt/50"
              }`}
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-ah-warm">Week {w.week}</span>
              <h3 className="mt-2 font-display text-lg font-semibold text-ah-ink">{w.headline}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ah-muted">{w.detail}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

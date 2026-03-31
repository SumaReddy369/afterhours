"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeOut, fadeUp, stagger } from "./motion";

const pillars = [
  {
    title: "No open DMs at the start",
    body: "Connection stays in the pod thread first—less noise, clearer boundaries.",
  },
  {
    title: "Milestone-based unlocks",
    body: "Features open as the group earns continuity (e.g. after week 2 check-in).",
  },
  {
    title: "Group agreements",
    body: "Lightweight norms you agree on together: attendance grace, vibe, opt-out language.",
  },
  {
    title: "Attendance nudges, not guilt",
    body: "RSVP + gentle reminders so the burden isn’t on one person to chase everyone.",
  },
  {
    title: "Easy reporting",
    body: "One-tap report if someone crosses a line—reviewed with care, not buried in settings.",
  },
  {
    title: "Optional identity verification",
    body: "Extra signal for cities where it helps people feel safe meeting strangers.",
  },
];

export function TrustSafetyInlineSection() {
  const reduce = useReducedMotion();

  return (
    <section id="trust-safety" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="font-display text-3xl font-bold tracking-tight text-ah-ink sm:text-4xl"
        >
          Trust & safety as product
        </motion.h2>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05, ease: easeOut }}
          className="mt-3 max-w-2xl text-ah-muted"
        >
          Safety isn’t a separate policy page you hope people read—it’s how the app behaves from day one. These are
          built into the prototype, not bolted on.
        </motion.p>

        <motion.ul
          variants={reduce ? undefined : stagger(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {pillars.map((p) => (
            <motion.li
              key={p.title}
              variants={reduce ? undefined : fadeUp}
              transition={{ duration: 0.45, ease: easeOut }}
              className="rounded-2xl border border-ah-border/80 bg-ah-card p-5 shadow-sm"
            >
              <h3 className="font-display text-base font-semibold text-ah-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ah-muted">{p.body}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

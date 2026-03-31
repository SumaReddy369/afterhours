"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeOut } from "./motion";

const stats = [
  { label: "Pilot city", value: "Phoenix" },
  { label: "Strangers matched into one pod", value: "6" },
  { label: "Attended week 1", value: "5 of 6" },
  { label: "Returned by week 4", value: "4 of 6" },
  { label: "Planned an extra hangout after the season", value: "3" },
];

export function CaseStudySection() {
  const reduce = useReducedMotion();

  return (
    <section id="proof" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="font-display text-3xl font-bold tracking-tight text-ah-ink sm:text-4xl"
        >
          Early results
        </motion.h2>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05, ease: easeOut }}
          className="mt-3 max-w-2xl text-ah-muted"
        >
          Snapshot from an early Phoenix pod—attendance and retention as we scaled the format.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: easeOut }}
          className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch"
        >
          <div className="rounded-3xl border border-ah-border/80 bg-ah-card p-6 shadow-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-ah-warm">Case study</p>
            <p className="mt-3 font-display text-2xl font-bold text-ah-ink">6 matched strangers in Phoenix</p>
            <ul className="mt-8 space-y-5">
              {stats.map((s) => (
                <li
                  key={s.label}
                  className="flex flex-col gap-1 border-b border-ah-border/50 pb-5 last:border-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <span className="text-sm text-ah-muted">{s.label}</span>
                  <span className="font-display text-xl font-semibold text-ah-ink">{s.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <blockquote className="flex flex-col justify-center rounded-3xl border border-ah-accent/20 bg-gradient-to-br from-ah-accent/8 to-ah-bg-alt/90 p-6 sm:p-8">
            <p className="text-lg leading-relaxed text-ah-ink">
              &ldquo;I didn’t need another event—I needed the same faces. Week four was the first time it felt like I had
              people in this city who would notice if I disappeared.&rdquo;
            </p>
            <footer className="mt-6 text-sm">
              <span className="font-semibold text-ah-ink">Pilot participant</span>
              <span className="text-ah-muted"> · moved for work, 26</span>
            </footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}

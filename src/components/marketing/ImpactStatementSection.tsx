"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeOut, fadeUp, stagger } from "./motion";

const pillars = [
  {
    title: "Who it’s for",
    body:
      "Working professionals in their 20s who recently relocated for a job or after school. Your old circle often doesn’t transfer with you—so evenings and weekends can feel thin even when your career is on track.",
  },
  {
    title: "What we do",
    body:
      "Place you in a small pod with one shared weekly slot for six weeks—low pressure, safety-forward, and structured so no one person has to carry the whole group.",
  },
  {
    title: "What you get",
    body:
      "Familiar faces, a rhythm you can plan around, and room for friendship to grow naturally—without treating your social life like a second job.",
  },
];

export function ImpactStatementSection() {
  const reduce = useReducedMotion();

  return (
    <section id="why-product" className="scroll-mt-24 px-4 pb-4 pt-2 sm:px-6 sm:pb-6 sm:pt-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="rounded-2xl border border-ah-border/70 bg-ah-bg-alt/50 px-5 py-6 sm:px-8 sm:py-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ah-warm">Product overview</p>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ah-ink sm:text-3xl">
            Friends after a move—without the churn
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ah-muted sm:text-base">
            AfterHours is built for people building a life in a new city: same small group, same weekly time, six weeks—so
            connection can deepen with repetition.
          </p>

          <motion.ul
            variants={reduce ? undefined : stagger(0.07)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-20px" }}
            className="mt-8 grid gap-4 md:grid-cols-3"
          >
            {pillars.map((p) => (
              <motion.li
                key={p.title}
                variants={reduce ? undefined : fadeUp}
                transition={{ duration: 0.45, ease: easeOut }}
                className="rounded-xl border border-ah-border/60 bg-ah-card/90 p-5 shadow-sm"
              >
                <h3 className="font-display text-base font-semibold text-ah-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ah-muted">{p.body}</p>
              </motion.li>
            ))}
          </motion.ul>

          <div className="mt-8 rounded-xl border border-dashed border-ah-accent/25 bg-ah-accent/[0.04] px-5 py-5 sm:px-6">
            <h3 className="font-display text-sm font-semibold text-ah-ink">How we track quality</h3>
            <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-ah-muted marker:text-ah-accent">
              <li>
                <span className="text-ah-ink/90">Attendance &amp; retention</span> — weekly show-up rate and season
                completion.
              </li>
              <li>
                <span className="text-ah-ink/90">Optional check-ins</span> — short, private prompts (aggregated only) to see
                if pods feel supportive over time.
              </li>
              <li>
                <span className="text-ah-ink/90">Safety &amp; trust</span> — reports handled, renewals vs. pauses—so we know
                if groups feel healthy.
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

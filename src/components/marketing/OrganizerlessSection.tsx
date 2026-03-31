"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeOut, fadeUp, stagger } from "./motion";

const points = [
  {
    title: "Rotating micro-host",
    body: "Each week, a different person kicks things off—2 minutes, not a production.",
  },
  {
    title: "Built-in ritual suggestions",
    body: "The app proposes simple plans so nobody has to invent a “big idea” every week.",
  },
  {
    title: "Automated weekly structure",
    body: "Same slot, same season length, clear arc—continuity without a group chat project manager.",
  },
  {
    title: "No single unpaid social organizer",
    body: "The product carries the scaffolding so one person doesn’t burn out herding six adults.",
  },
];

export function OrganizerlessSection() {
  const reduce = useReducedMotion();

  return (
    <section id="organizerless" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="font-display text-3xl font-bold tracking-tight text-ah-ink sm:text-4xl"
        >
          Organizerless by design
        </motion.h2>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05, ease: easeOut }}
          className="mt-3 max-w-2xl text-ah-muted"
        >
          Most “find friends” ideas quietly depend on one overworked extrovert. AfterHours spreads the load so young
          professionals in a new city can actually sustain a circle—not run a second unpaid job.
        </motion.p>

        <motion.ul
          variants={reduce ? undefined : stagger(0.07)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
          className="mt-12 grid gap-4 md:grid-cols-2"
        >
          {points.map((p) => (
            <motion.li
              key={p.title}
              variants={reduce ? undefined : fadeUp}
              transition={{ duration: 0.45, ease: easeOut }}
              className="flex flex-col rounded-2xl border border-ah-border/80 bg-gradient-to-br from-ah-bg-alt/80 to-ah-card p-6 shadow-sm"
            >
              <h3 className="font-display text-lg font-semibold text-ah-ink">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ah-muted">{p.body}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

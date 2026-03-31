import Link from "next/link";
import { IconArrowRight } from "./DiscoveryIcons";

/** Shown when the user has no pod yet — routes them to real-world next step (waitlist). */
export function PodDiscoveryCard() {
  return (
    <div className="rounded-2xl border border-ah-accent/25 bg-gradient-to-br from-ah-accent/[0.07] via-white/90 to-ah-bg-alt/50 p-5 shadow-[var(--shadow-card)] ring-1 ring-ah-accent/10 sm:flex sm:items-center sm:justify-between sm:gap-6">
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ah-accent">Your weekly pod</p>
        <p className="mt-1 font-display text-lg font-semibold text-ah-ink">Not matched yet</p>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-ah-muted">
          AfterHours places you in a ~6-person pod with one shared evening per week for six weeks—steady connection, not
          another crowded mixer. Join the waitlist with your city and availability so we can open your market.
        </p>
      </div>
      <div className="mt-4 flex shrink-0 flex-col gap-2 sm:mt-0 sm:items-end">
        <Link
          href="/#waitlist"
          className="discovery-btn inline-flex items-center justify-center gap-1.5 rounded-full bg-ah-accent px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-10px_rgba(45,90,74,0.45)] transition hover:bg-ah-accent-soft"
        >
          Join waitlist
          <IconArrowRight className="h-3.5 w-3.5" />
        </Link>
        <Link
          href="/waitlist"
          className="text-center text-xs font-medium text-ah-accent underline-offset-2 hover:underline sm:text-right"
        >
          Full step-by-step intake
        </Link>
      </div>
    </div>
  );
}

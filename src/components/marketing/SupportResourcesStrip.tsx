import Link from "next/link";

/** Crisis resources and clinical boundaries — social product, not medical care. */
export function SupportResourcesStrip({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl border border-ah-border/60 bg-ah-bg-alt/50 px-4 py-4 text-center text-xs leading-relaxed text-ah-muted sm:px-6 sm:text-left ${className}`}
    >
      <p>
        <strong className="font-semibold text-ah-ink">Not a substitute for care.</strong> AfterHours helps you build
        in-person connection; it doesn’t treat mental health conditions. If you’re in crisis in the U.S., call or text{" "}
        <a href="tel:988" className="font-semibold text-ah-accent underline-offset-2 hover:underline">
          988
        </a>{" "}
        (Suicide &amp; Crisis Lifeline) or text{" "}
        <strong className="text-ah-ink">HOME</strong> to{" "}
        <a href="sms:741741" className="font-semibold text-ah-accent underline-offset-2 hover:underline">
          741741
        </a>
        . Outside the U.S., find local resources through your doctor or national helplines.
      </p>
      <p className="mt-2">
        <Link href="/safety" className="font-medium text-ah-accent underline-offset-2 hover:underline">
          Safety &amp; trust
        </Link>{" "}
        ·{" "}
        <Link href="/#waitlist" className="font-medium text-ah-accent underline-offset-2 hover:underline">
          Join waitlist
        </Link>
      </p>
    </div>
  );
}

"use client";

import Link from "next/link";
import {
  AFFINITY_OPTIONS,
  AVAILABILITY_OPTIONS,
  SITUATION_OPTIONS,
} from "@/lib/validation";

const POD_VIBES = [
  { id: "quiet_parallel", label: "Quiet parallel hour first (low chatter)" },
  { id: "socially_light", label: "Light conversation, still low pressure" },
  { id: "no_preference", label: "No preference—match me thoughtfully" },
] as const;

type Props = {
  idPrefix: string;
  /** compact = single column, tighter spacing for bottom-of-page */
  variant?: "default" | "compact";
};

export function WaitlistIntakeFields({ idPrefix, variant = "default" }: Props) {
  const gap = variant === "compact" ? "gap-3" : "gap-4";
  const labelClass = "text-sm font-semibold text-ah-ink";

  return (
    <div className={`flex flex-col ${gap}`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="sm:col-span-2">
          <span className={labelClass}>
            Email <span className="text-ah-warm">*</span>
          </span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="mt-1.5 w-full rounded-xl border border-ah-border/80 bg-ah-card px-4 py-3 text-ah-ink shadow-inner transition-shadow focus:border-ah-accent/50 focus:outline-none focus:ring-2 focus:ring-ah-accent/20"
          />
        </label>
        <label>
          <span className={labelClass}>
            City / metro you moved to <span className="text-ah-warm">*</span>
          </span>
          <input
            name="city"
            type="text"
            required
            autoComplete="address-level2"
            placeholder="e.g., Columbus, OH"
            className="mt-1.5 w-full rounded-xl border border-ah-border/80 bg-ah-card px-4 py-3 text-ah-ink shadow-inner focus:border-ah-accent/50 focus:outline-none focus:ring-2 focus:ring-ah-accent/20"
          />
        </label>
        <label>
          <span className={labelClass}>Timezone</span>
          <input
            name="timezone"
            type="text"
            autoComplete="off"
            placeholder="e.g., America/New_York"
            className="mt-1.5 w-full rounded-xl border border-ah-border/80 bg-ah-card px-4 py-3 text-ah-ink shadow-inner focus:border-ah-accent/50 focus:outline-none focus:ring-2 focus:ring-ah-accent/20"
          />
          <span className="mt-1 block text-xs text-ah-muted">Helps us propose a weekly slot that matches your pod.</span>
        </label>
      </div>

      <fieldset className="rounded-2xl border border-ah-border/60 bg-ah-bg/40 p-4 sm:p-5">
        <legend className={`${labelClass} px-1`}>What sounds like you lately?</legend>
        <p className="mt-1 text-xs text-ah-muted">Select any that apply—this helps us match you into a humane pod.</p>
        <div className="mt-3 space-y-2.5">
          {SITUATION_OPTIONS.map((s) => (
            <label key={s.id} className="flex cursor-pointer gap-2.5 text-sm text-ah-muted">
              <input
                type="checkbox"
                name="situations"
                value={s.id}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-ah-border text-ah-accent focus:ring-ah-accent/30"
              />
              <span>{s.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="rounded-2xl border border-ah-border/60 bg-ah-bg/40 p-4 sm:p-5">
        <legend className={`${labelClass} px-1`}>When could you usually show up?</legend>
        <p className="mt-1 text-xs text-ah-muted">We’ll propose one weekly slot that overlaps the pod.</p>
        <div className="mt-3 space-y-2.5">
          {AVAILABILITY_OPTIONS.map((a) => (
            <label key={a.id} className="flex cursor-pointer gap-2.5 text-sm text-ah-muted">
              <input
                type="checkbox"
                name="availability"
                value={a.id}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-ah-border text-ah-accent focus:ring-ah-accent/30"
              />
              <span>{a.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="rounded-2xl border border-ah-border/60 bg-ah-bg/40 p-4 sm:p-5">
        <legend className={`${labelClass} px-1`}>Optional comfort & affinity</legend>
        <p className="mt-1 text-xs text-ah-muted">
          Nothing required. Skip all if you want.{" "}
          <Link href="/safety#ethnicity-matching" className="font-medium text-ah-accent underline-offset-2 hover:underline">
            How we match with dignity
          </Link>
        </p>
        <div className="mt-3 space-y-2.5">
          {AFFINITY_OPTIONS.map((a) => (
            <label key={a.id} className="flex cursor-pointer gap-2.5 text-sm text-ah-muted">
              <input
                type="checkbox"
                name="affinity"
                value={a.id}
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-ah-border text-ah-accent focus:ring-ah-accent/30"
              />
              <span>{a.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className={`${labelClass}`}>Preferred pod vibe</legend>
        <div className="mt-3 space-y-2">
          {POD_VIBES.map((v) => (
            <label
              key={v.id}
              className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-ah-border/70 bg-ah-card/80 px-3 py-2.5 text-sm text-ah-muted has-[:checked]:border-ah-accent/40 has-[:checked]:bg-ah-accent/5"
            >
              <input
                type="radio"
                name="podVibe"
                value={v.id}
                defaultChecked={v.id === "no_preference"}
                className="mt-0.5 h-4 w-4 shrink-0 border-ah-border text-ah-accent focus:ring-ah-accent/30"
              />
              <span>{v.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label>
        <span className={labelClass}>Private notes (optional)</span>
        <textarea
          id={`${idPrefix}-comfort`}
          name="comfortNotes"
          rows={variant === "compact" ? 3 : 4}
          placeholder="Accessibility, pacing, anything that helps us match you safely—never shared publicly."
          className="mt-1.5 w-full resize-y rounded-xl border border-ah-border/80 bg-ah-card px-4 py-3 text-sm text-ah-ink shadow-inner focus:border-ah-accent/50 focus:outline-none focus:ring-2 focus:ring-ah-accent/20"
        />
      </label>

      <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
    </div>
  );
}

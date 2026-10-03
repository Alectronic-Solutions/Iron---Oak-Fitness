"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarCheck,
  Check,
  Dumbbell,
  Flame,
  Leaf,
  MessageCircle,
  Timer,
} from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getClass } from "@/lib/data/classes";
import { getSlotsByDay, spotsLeft } from "@/lib/data/schedule";
import { formatTime12, STUDIO_ADDRESS } from "@/lib/site";
import { useSearchParam } from "@/lib/useSearchParam";
import { cn, EMAIL_RE, WEEKDAY_LABELS, WEEKDAYS } from "@/lib/utils";
import type { ClassCategory, ScheduleSlot } from "@/types";

const EASE = [0.22, 1, 0.36, 1] as const;

const GOALS: {
  id: string;
  label: string;
  body: string;
  icon: typeof Dumbbell;
  categories: ClassCategory[] | null;
}[] = [
  { id: "strength", label: "Get stronger", body: "Barbells, technique, progress.", icon: Dumbbell, categories: ["Strength"] },
  { id: "fitness", label: "Get fitter", body: "Intervals and conditioning.", icon: Flame, categories: ["Conditioning"] },
  { id: "endurance", label: "Build endurance", body: "Engine work for runners and riders.", icon: Timer, categories: ["Endurance"] },
  { id: "mobility", label: "Move better", body: "Mobility, flow and recovery.", icon: Leaf, categories: ["Mobility"] },
  { id: "pt", label: "Talk to a coach", body: "Free 20-min personal-training consult.", icon: MessageCircle, categories: null },
];

const STEPS = ["Goal", "Class", "Details"];

const fieldClass =
  "h-12 w-full rounded-lg border border-line bg-ink/40 px-4 text-base text-bone placeholder:text-bone-faint focus:border-oak focus:outline-none sm:text-sm";

type Errors = Partial<Record<"name" | "email", string>>;

function recommendedSlots(categories: ClassCategory[] | null): ScheduleSlot[] {
  // Representative week; trial bookings are for the coming week.
  return WEEKDAYS.flatMap((d) => getSlotsByDay(d))
    .filter((s) => spotsLeft(s) > 0)
    .filter((s) => {
      const cat = getClass(s.classSlug)?.category;
      return !categories || (cat && categories.includes(cat));
    })
    .slice(0, 8);
}

export function TrialFlow() {
  const goalParam = useSearchParam("goal");
  const [step, setStep] = useState(0);
  const [pickedGoal, setPickedGoal] = useState<string>();
  const [slotId, setSlotId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [name, setName] = useState("");
  const [done, setDone] = useState(false);

  const goalId = pickedGoal ?? (GOALS.some((g) => g.id === goalParam) ? goalParam! : undefined);
  const goal = GOALS.find((g) => g.id === goalId);
  const isConsult = goal?.id === "pt";
  const slots = goal ? recommendedSlots(goal.categories) : [];
  const slot = slots.find((s) => s.id === slotId) ?? null;
  const slotClass = slot ? getClass(slot.classSlug) : null;

  function next() {
    // Consults skip the class picker.
    setStep((s) => (s === 0 && isConsult ? 2 : s + 1));
  }
  function back() {
    setStep((s) => (s === 2 && isConsult ? 0 : s - 1));
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const n = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const nextErrors: Errors = {};
    if (!n) nextErrors.name = "Please enter your name.";
    if (!email) nextErrors.email = "Please enter your email.";
    else if (!EMAIL_RE.test(email)) nextErrors.email = "That email doesn't look right.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setName(n.split(" ")[0]);
      setDone(true);
    }
  }

  if (done) {
    return (
      <Card className="p-6 text-center sm:p-10">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-300"
        >
          <CalendarCheck className="h-8 w-8" />
        </motion.div>
        <h2 className="mt-5 text-3xl uppercase text-bone sm:text-4xl">
          You&apos;re in, {name}.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-bone-muted">
          {isConsult
            ? "A coach will call you within one business day to set up your free consult."
            : slot && slotClass
              ? `${slotClass.title}, ${WEEKDAY_LABELS[slot.day]} at ${formatTime12(slot.start)}. Arrive 10 minutes early for a quick tour.`
              : "We'll email you a link to pick your class. Arrive 10 minutes early for a quick tour."}
        </p>
        <ul className="mx-auto mt-6 max-w-sm space-y-2 text-left text-sm text-bone-muted">
          {["Confirmation sent to your inbox", `${STUDIO_ADDRESS} · free parking after 6pm`, "Bring water and flat shoes - we've got towels"].map(
            (t) => (
              <li key={t} className="flex gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-oak" />
                {t}
              </li>
            ),
          )}
        </ul>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/classes" variant="secondary">
            Explore classes
          </ButtonLink>
          <ButtonLink href="/membership">See membership</ButtonLink>
        </div>
        <p className="mt-4 text-xs text-bone-faint">Demo only - no booking was made.</p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      {/* Progress */}
      <ol className="grid grid-cols-3 border-b border-line">
        {STEPS.map((label, i) => {
          const skipped = isConsult && i === 1;
          return (
            <li
              key={label}
              aria-current={i === step ? "step" : undefined}
              className={cn(
                "relative px-2 py-3 text-center text-[11px] uppercase tracking-wider sm:text-xs",
                i === step ? "text-bone" : i < step ? "text-oak-soft" : "text-bone-faint",
                skipped && "line-through opacity-50",
              )}
            >
              <span className="font-display">{i + 1}.</span> {label}
              <span
                className={cn(
                  "absolute inset-x-0 bottom-0 h-0.5 transition-colors",
                  i <= step ? "bg-bronze" : "bg-transparent",
                )}
              />
            </li>
          );
        })}
      </ol>

      <div className="p-5 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.22, ease: EASE }}
          >
            {step === 0 && (
              <fieldset>
                <legend className="font-display text-2xl uppercase text-bone">
                  What brings you in?
                </legend>
                <p className="mt-1 text-sm text-bone-muted">
                  We&apos;ll recommend the right first session.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {GOALS.map((g) => {
                    const Icon = g.icon;
                    const active = g.id === goalId;
                    return (
                      <label
                        key={g.id}
                        className={cn(
                          "flex min-h-16 cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors has-focus-visible:outline-2 has-focus-visible:outline-bronze",
                          active
                            ? "border-bronze bg-bronze/10"
                            : "border-line bg-ink/30 hover:border-oak/50",
                        )}
                      >
                        <input
                          type="radio"
                          name="goal"
                          value={g.id}
                          checked={active}
                          onChange={() => {
                            setPickedGoal(g.id);
                            setSlotId(null);
                          }}
                          className="sr-only"
                        />
                        <span
                          className={cn(
                            "grid h-10 w-10 shrink-0 place-items-center rounded-full",
                            active ? "bg-bronze text-ink" : "bg-oak/15 text-oak-soft",
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </span>
                        <span>
                          <span className="block font-display uppercase text-bone">{g.label}</span>
                          <span className="block text-xs text-bone-faint">{g.body}</span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            )}

            {step === 1 && goal && (
              <fieldset>
                <legend className="font-display text-2xl uppercase text-bone">
                  Pick your free class
                </legend>
                <p className="mt-1 text-sm text-bone-muted">
                  Recommended for &ldquo;{goal.label.toLowerCase()}&rdquo;. Not sure? Skip
                  and choose later.
                </p>
                <div className="mt-5 grid gap-2.5">
                  {slots.map((s) => {
                    const cls = getClass(s.classSlug);
                    const active = s.id === slotId;
                    return (
                      <label
                        key={s.id}
                        className={cn(
                          "flex min-h-14 cursor-pointer items-center justify-between gap-4 rounded-xl border px-4 py-3 transition-colors has-focus-visible:outline-2 has-focus-visible:outline-bronze",
                          active
                            ? "border-bronze bg-bronze/10"
                            : "border-line bg-ink/30 hover:border-oak/50",
                        )}
                      >
                        <input
                          type="radio"
                          name="slot"
                          value={s.id}
                          checked={active}
                          onChange={() => setSlotId(s.id)}
                          className="sr-only"
                        />
                        <span>
                          <span className="block font-display uppercase text-bone">{cls?.title}</span>
                          <span className="block text-xs text-bone-faint">
                            {WEEKDAY_LABELS[s.day]} · {formatTime12(s.start)} · {cls?.durationMin} min
                          </span>
                        </span>
                        <span
                          className={cn(
                            "grid h-6 w-6 shrink-0 place-items-center rounded-full border",
                            active ? "border-bronze bg-bronze text-ink" : "border-line",
                          )}
                        >
                          {active && <Check className="h-3.5 w-3.5" />}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
            )}

            {step === 2 && (
              <form id="trial-form" onSubmit={submit} noValidate>
                <h2 className="font-display text-2xl uppercase text-bone">Almost there</h2>
                <p className="mt-1 text-sm text-bone-muted">
                  {isConsult
                    ? "Tell us how to reach you and a coach will be in touch."
                    : slot && slotClass
                      ? `${slotClass.title} · ${WEEKDAY_LABELS[slot.day]} ${formatTime12(slot.start)}`
                      : "We'll send you a link to choose your class."}
                </p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="trial-name" className="mb-1.5 block text-xs uppercase tracking-wider text-bone-faint">
                      Full name
                    </label>
                    <input
                      id="trial-name"
                      name="name"
                      autoComplete="name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "trial-name-error" : undefined}
                      className={cn(fieldClass, errors.name && "border-red-500/60")}
                    />
                    {errors.name && (
                      <p id="trial-name-error" role="alert" className="mt-1.5 text-xs text-red-300">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="trial-email" className="mb-1.5 block text-xs uppercase tracking-wider text-bone-faint">
                      Email
                    </label>
                    <input
                      id="trial-email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "trial-email-error" : undefined}
                      className={cn(fieldClass, errors.email && "border-red-500/60")}
                    />
                    {errors.email && (
                      <p id="trial-email-error" role="alert" className="mt-1.5 text-xs text-red-300">
                        {errors.email}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="trial-phone" className="mb-1.5 block text-xs uppercase tracking-wider text-bone-faint">
                      Phone <span className="normal-case tracking-normal">(optional)</span>
                    </label>
                    <input
                      id="trial-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="trial-exp" className="mb-1.5 block text-xs uppercase tracking-wider text-bone-faint">
                      Training experience
                    </label>
                    <select id="trial-exp" name="experience" className={cn(fieldClass, "cursor-pointer")}>
                      <option>New to training</option>
                      <option>Some experience</option>
                      <option>Train regularly</option>
                      <option>Competitive athlete</option>
                    </select>
                  </div>
                </div>
                <p className="mt-4 text-xs text-bone-faint">
                  By continuing you agree to our{" "}
                  <Link href="/legal/terms" className="underline hover:text-bone">terms</Link> and{" "}
                  <Link href="/legal/privacy" className="underline hover:text-bone">privacy policy</Link>.
                  No card required.
                </p>
              </form>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-5">
          {step > 0 ? (
            <Button variant="ghost" onClick={back} className="-ml-4">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          ) : (
            <span />
          )}
          {step === 0 && (
            <Button onClick={next} disabled={!goal}>
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          )}
          {step === 1 && (
            <div className="flex gap-2">
              {!slot && (
                <Button variant="secondary" onClick={next}>
                  Skip
                </Button>
              )}
              <Button onClick={next} disabled={!slot}>
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
          {step === 2 && (
            <Button type="submit" form="trial-form">
              {isConsult ? "Request consult" : "Book free class"}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

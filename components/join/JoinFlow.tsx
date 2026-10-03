"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, CreditCard, Lock, PartyPopper } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { classPacks, perClass, plans } from "@/lib/data/plans";
import { useSearchParam } from "@/lib/useSearchParam";
import { ANNUAL_DISCOUNT, cn, displayPrice, EMAIL_RE, formatPrice } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const STEPS = ["Choose", "Details", "Payment"];

const fieldClass =
  "h-12 w-full rounded-lg border border-line bg-ink/40 px-4 text-base text-bone placeholder:text-bone-faint focus:border-oak focus:outline-none sm:text-sm";
const labelClass = "mb-1.5 block text-xs uppercase tracking-wider text-bone-faint";

type Product = { kind: "plan" | "pack"; id: string };
type Errors = Record<string, string>;

function Field({
  id,
  label,
  error,
  ...props
}: { id: string; label: string; error?: string } & React.ComponentProps<"input">) {
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(fieldClass, error && "border-red-500/60")}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

export function JoinFlow() {
  const planParam = useSearchParam("plan");
  const packParam = useSearchParam("pack");
  const billingParam = useSearchParam("billing");

  const [picked, setPicked] = useState<Product>();
  const [pickedAnnual, setPickedAnnual] = useState<boolean>();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [firstName, setFirstName] = useState("");
  const [done, setDone] = useState(false);

  const fromUrl: Product | undefined = plans.some((p) => p.id === planParam)
    ? { kind: "plan", id: planParam! }
    : classPacks.some((p) => p.id === packParam)
      ? { kind: "pack", id: packParam! }
      : undefined;
  const product = picked ?? fromUrl ?? { kind: "plan", id: "unlimited" };
  const annual = pickedAnnual ?? billingParam === "annual";

  const plan = product.kind === "plan" ? plans.find((p) => p.id === product.id) : undefined;
  const pack = product.kind === "pack" ? classPacks.find((p) => p.id === product.id) : undefined;

  const monthly = plan ? displayPrice(plan.priceMonthly, annual) : 0;
  const dueToday = plan ? (annual ? monthly * 12 : monthly) : (pack?.price ?? 0);
  const itemName = plan ? `${plan.name} membership` : (pack?.name ?? "");

  function validate(form: HTMLFormElement, fields: [string, string, (v: string) => string | null][]) {
    const data = new FormData(form);
    const next: Errors = {};
    for (const [key, label, check] of fields) {
      const value = String(data.get(key) ?? "").trim();
      const msg = value ? check(value) : `${label} is required.`;
      if (msg) next[key] = msg;
    }
    setErrors(next);
    return { ok: Object.keys(next).length === 0, data };
  }

  if (done) {
    return (
      <Card className="mx-auto max-w-xl p-6 text-center sm:p-10">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: EASE }}
          className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-bronze/15 text-bronze"
        >
          <PartyPopper className="h-8 w-8" />
        </motion.div>
        <h2 className="mt-5 text-3xl uppercase text-bone sm:text-4xl">
          Welcome to the family, {firstName}.
        </h2>
        <p className="mx-auto mt-3 max-w-md text-bone-muted">
          Your {itemName.toLowerCase()} is active. Book your first session from the
          member portal - we&apos;ve emailed your receipt.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/account">Go to member portal</ButtonLink>
          <ButtonLink href="/schedule" variant="secondary">
            Book a class
          </ButtonLink>
        </div>
        <p className="mt-4 text-xs text-bone-faint">Demo only - no payment was taken.</p>
      </Card>
    );
  }

  const summary = (
    <Card className="p-5 sm:p-6">
      <p className="eyebrow">Order summary</p>
      <div className="mt-3 flex items-start justify-between gap-4">
        <div>
          <p className="font-display text-xl uppercase text-bone">{itemName}</p>
          <p className="text-xs text-bone-faint">
            {plan
              ? annual
                ? `Billed annually · ${formatPrice(monthly)}/mo`
                : "Billed monthly · cancel anytime"
              : pack && `${pack.classes} ${pack.classes === 1 ? "class" : "classes"} · valid ${pack.validityDays} days`}
          </p>
        </div>
        <p className="font-display text-xl text-bone">{formatPrice(dueToday)}</p>
      </div>
      <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-bone-muted">Joining fee</dt>
          <dd className="text-bone">
            <s className="mr-1.5 text-bone-faint">$49</s>$0
          </dd>
        </div>
        {plan && annual && (
          <div className="flex justify-between">
            <dt className="text-bone-muted">Annual saving</dt>
            <dd className="text-emerald-300">
              −{formatPrice((plan.priceMonthly - monthly) * 12)}
            </dd>
          </div>
        )}
        <div className="flex justify-between border-t border-line pt-3 font-medium">
          <dt className="text-bone">Due today</dt>
          <dd className="font-display text-2xl text-bone">{formatPrice(dueToday)}</dd>
        </div>
      </dl>
      {plan && (
        <ul className="mt-4 space-y-2 border-t border-line pt-4">
          {plan.perks.slice(0, 4).map((perk) => (
            <li key={perk} className="flex gap-2.5 text-xs text-bone-muted">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-oak" />
              {perk}
            </li>
          ))}
        </ul>
      )}
    </Card>
  );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-start lg:gap-10">
      <Card className="overflow-hidden">
        <ol className="grid grid-cols-3 border-b border-line">
          {STEPS.map((label, i) => (
            <li
              key={label}
              aria-current={i === step ? "step" : undefined}
              className={cn(
                "relative px-2 py-3 text-center text-[11px] uppercase tracking-wider sm:text-xs",
                i === step ? "text-bone" : i < step ? "text-oak-soft" : "text-bone-faint",
              )}
            >
              <span className="font-display">{i + 1}.</span> {label}
              <span
                className={cn(
                  "absolute inset-x-0 bottom-0 h-0.5",
                  i <= step ? "bg-bronze" : "bg-transparent",
                )}
              />
            </li>
          ))}
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
                <div>
                  <h2 className="font-display text-2xl uppercase text-bone">Choose your plan</h2>

                  {/* Billing toggle (plans only) */}
                  <div
                    role="radiogroup"
                    aria-label="Billing period"
                    className="mt-4 inline-flex rounded-full border border-line bg-ink/40 p-1"
                  >
                    {[false, true].map((isAnnual) => (
                      <button
                        key={String(isAnnual)}
                        type="button"
                        role="radio"
                        aria-checked={annual === isAnnual}
                        onClick={() => setPickedAnnual(isAnnual)}
                        className={cn(
                          "min-h-10 cursor-pointer rounded-full px-4 font-display text-xs uppercase tracking-wider transition-colors",
                          annual === isAnnual ? "bg-bronze text-ink" : "text-bone-muted hover:text-bone",
                        )}
                      >
                        {isAnnual ? `Annual · save ${ANNUAL_DISCOUNT * 100}%` : "Monthly"}
                      </button>
                    ))}
                  </div>

                  <fieldset className="mt-5">
                    <legend className="sr-only">Membership</legend>
                    <div className="grid gap-2.5">
                      {plans.map((p) => {
                        const active = product.kind === "plan" && product.id === p.id;
                        return (
                          <label
                            key={p.id}
                            className={cn(
                              "flex min-h-16 cursor-pointer items-center justify-between gap-4 rounded-xl border px-4 py-3 transition-colors has-focus-visible:outline-2 has-focus-visible:outline-bronze",
                              active ? "border-bronze bg-bronze/10" : "border-line bg-ink/30 hover:border-oak/50",
                            )}
                          >
                            <input
                              type="radio"
                              name="product"
                              checked={active}
                              onChange={() => setPicked({ kind: "plan", id: p.id })}
                              className="sr-only"
                            />
                            <span>
                              <span className="flex items-center gap-2 font-display uppercase text-bone">
                                {p.name}
                                {p.badge && <Badge tone="oak">{p.badge}</Badge>}
                              </span>
                              <span className="block text-xs text-bone-faint">{p.blurb}</span>
                            </span>
                            <span className="text-right">
                              <span className="block font-display text-xl text-bone">
                                {formatPrice(displayPrice(p.priceMonthly, annual))}
                              </span>
                              <span className="block text-[11px] text-bone-faint">/ month</span>
                            </span>
                          </label>
                        );
                      })}
                    </div>

                    <p className="mt-6 text-xs uppercase tracking-wider text-bone-faint">
                      Or pay as you go
                    </p>
                    <div className="mt-2 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                      {classPacks.map((p) => {
                        const active = product.kind === "pack" && product.id === p.id;
                        return (
                          <label
                            key={p.id}
                            className={cn(
                              "flex min-h-16 cursor-pointer flex-col justify-center rounded-xl border px-3 py-2.5 transition-colors has-focus-visible:outline-2 has-focus-visible:outline-bronze",
                              active ? "border-bronze bg-bronze/10" : "border-line bg-ink/30 hover:border-oak/50",
                            )}
                          >
                            <input
                              type="radio"
                              name="product"
                              checked={active}
                              onChange={() => setPicked({ kind: "pack", id: p.id })}
                              className="sr-only"
                            />
                            <span className="font-display text-sm uppercase text-bone">{p.name}</span>
                            <span className="text-xs text-bone-faint">
                              {formatPrice(p.price)}
                              {p.classes > 1 && ` · ${formatPrice(perClass(p))}/class`}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </fieldset>
                </div>
              )}

              {step === 1 && (
                <form
                  id="join-details"
                  noValidate
                  onSubmit={(e) => {
                    e.preventDefault();
                    const { ok, data } = validate(e.currentTarget, [
                      ["name", "Name", () => null],
                      ["email", "Email", (v) => (EMAIL_RE.test(v) ? null : "That email doesn't look right.")],
                      ["password", "Password", (v) => (v.length >= 8 ? null : "Use at least 8 characters.")],
                    ]);
                    if (ok) {
                      setFirstName(String(data.get("name")).trim().split(" ")[0]);
                      setStep(2);
                    }
                  }}
                >
                  <h2 className="font-display text-2xl uppercase text-bone">Create your account</h2>
                  <p className="mt-1 text-sm text-bone-muted">
                    Already a member?{" "}
                    <Link href="/login" className="text-oak-soft underline hover:text-bone">
                      Log in
                    </Link>
                  </p>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <Field id="name" label="Full name" autoComplete="name" error={errors.name} />
                    <Field id="email" label="Email" type="email" inputMode="email" autoComplete="email" error={errors.email} />
                    <Field id="phone" label="Phone (optional)" type="tel" inputMode="tel" autoComplete="tel" />
                    <Field
                      id="password"
                      label="Password"
                      type="password"
                      autoComplete="new-password"
                      error={errors.password}
                    />
                  </div>
                </form>
              )}

              {step === 2 && (
                <form
                  id="join-payment"
                  noValidate
                  onSubmit={(e) => {
                    e.preventDefault();
                    const { ok } = validate(e.currentTarget, [
                      ["card", "Card number", (v) => (v.replace(/\s/g, "").length >= 15 ? null : "Enter a full card number.")],
                      ["expiry", "Expiry", (v) => (/^\d{2}\s?\/\s?\d{2}$/.test(v) ? null : "Use MM / YY.")],
                      ["cvc", "CVC", (v) => (/^\d{3,4}$/.test(v) ? null : "3 or 4 digits.")],
                    ]);
                    if (ok) setDone(true);
                  }}
                >
                  <h2 className="flex items-center gap-2 font-display text-2xl uppercase text-bone">
                    <CreditCard className="h-6 w-6 text-oak" />
                    Payment
                  </h2>
                  <p className="mt-2 rounded-lg border border-bronze/30 bg-bronze/10 px-3 py-2 text-xs text-bone-muted">
                    Demo checkout - pre-filled with a test card. Please don&apos;t enter
                    real card details.
                  </p>
                  <div className="mt-5 grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Field
                        id="card"
                        label="Card number"
                        inputMode="numeric"
                        autoComplete="off"
                        defaultValue="4242 4242 4242 4242"
                        error={errors.card}
                      />
                    </div>
                    <Field id="expiry" label="Expiry" placeholder="MM / YY" inputMode="numeric" autoComplete="off" defaultValue="12 / 28" error={errors.expiry} />
                    <Field id="cvc" label="CVC" inputMode="numeric" autoComplete="off" defaultValue="123" error={errors.cvc} />
                  </div>
                  <p className="mt-4 flex items-center gap-2 text-xs text-bone-faint">
                    <Lock className="h-3.5 w-3.5" />
                    {plan
                      ? `You'll be charged ${formatPrice(dueToday)} today, then every ${annual ? "year" : "month"} until you cancel.`
                      : `One-time charge of ${formatPrice(dueToday)}.`}
                  </p>
                </form>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-5">
            {step > 0 ? (
              <Button variant="ghost" className="-ml-4" onClick={() => setStep((s) => s - 1)}>
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            ) : (
              <span />
            )}
            {step === 0 && (
              <Button onClick={() => setStep(1)}>
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            )}
            {step === 1 && (
              <Button type="submit" form="join-details">
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            )}
            {step === 2 && (
              <Button type="submit" form="join-payment">
                Pay {formatPrice(dueToday)}
              </Button>
            )}
          </div>
        </div>
      </Card>

      <aside className="lg:sticky lg:top-24">{summary}</aside>
    </div>
  );
}

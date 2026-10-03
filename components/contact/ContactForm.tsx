"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn, EMAIL_RE } from "@/lib/utils";

// text-base on mobile: iOS Safari zooms the page when focusing inputs < 16px.
const fieldClass =
  "w-full rounded-lg border border-line bg-ink/40 px-4 py-3 text-base text-bone sm:text-sm placeholder:text-bone-faint focus:border-oak focus:outline-none";
const labelClass =
  "mb-1.5 block text-xs uppercase tracking-wider text-bone-faint";
const errorFieldClass = "border-red-500/60 focus:border-red-500/60";

const EASE = [0.22, 1, 0.36, 1] as const;

type Errors = Partial<Record<"name" | "email" | "message", string>>;

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          id={id}
          role="alert"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2, ease: EASE }}
          className="mt-1.5 text-xs text-red-300"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const nextErrors: Errors = {};
    if (!name) nextErrors.name = "Please enter your name.";
    if (!email) nextErrors.email = "Please enter your email.";
    else if (!EMAIL_RE.test(email)) nextErrors.email = "That email doesn't look right.";
    if (!message) nextErrors.message = "Let us know what you're after.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) setSent(true);
  }

  return (
    <Card className="p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="text-center"
          >
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-500/15 text-emerald-300">
              <Check className="h-7 w-7" />
            </div>
            <h2 className="mt-4 font-display text-2xl uppercase text-bone">
              Message sent
            </h2>
            <p className="mt-2 text-sm text-bone-muted">
              Thanks for reaching out - we&apos;ll be in touch within one business
              day.
            </p>
            <Button
              variant="secondary"
              className="mt-6"
              onClick={() => {
                setSent(false);
                setErrors({});
              }}
            >
              Send another
            </Button>
            <p className="mt-3 text-xs text-bone-faint">
              Demo only - nothing was actually sent.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="space-y-4"
            noValidate
          >
            <h2 className="font-display text-2xl uppercase text-bone">Send a message</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelClass}>
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  autoComplete="name"
                  placeholder="Your name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={cn(fieldClass, errors.name && errorFieldClass)}
                />
                <FieldError id="name-error" message={errors.name} />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@email.com"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className={cn(fieldClass, errors.email && errorFieldClass)}
                />
                <FieldError id="email-error" message={errors.email} />
              </div>
            </div>

            <div>
              <label htmlFor="interest" className={labelClass}>
                I&apos;m interested in
              </label>
              <select id="interest" name="interest" className={`${fieldClass} cursor-pointer`}>
                <option>Membership</option>
                <option>Personal training</option>
                <option>Class packs / drop-in</option>
                <option>A free first class</option>
                <option>Something else</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className={labelClass}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell us a little about your goals…"
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className={cn(fieldClass, errors.message && errorFieldClass)}
              />
              <FieldError id="message-error" message={errors.message} />
            </div>

            <Button type="submit" size="lg" className="w-full">
              Send message
            </Button>
            <p className="text-center text-xs text-bone-faint">
              Demo only - this form doesn&apos;t actually send anything.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </Card>
  );
}

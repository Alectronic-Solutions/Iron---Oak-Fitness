"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const fieldClass =
  "w-full rounded-lg border border-line bg-ink/40 px-4 py-3 text-sm text-bone placeholder:text-bone-faint focus:border-oak focus:outline-none";
const labelClass =
  "mb-1.5 block text-xs uppercase tracking-wider text-bone-faint";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <Card className="p-8 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-500/15 text-emerald-300">
          <Check className="h-7 w-7" />
        </div>
        <h3 className="mt-4 font-display text-2xl uppercase text-bone">
          Message sent
        </h3>
        <p className="mt-2 text-sm text-bone-muted">
          Thanks for reaching out - we&apos;ll be in touch within one business
          day.
        </p>
        <Button
          variant="secondary"
          className="mt-6"
          onClick={() => setSent(false)}
        >
          Send another
        </Button>
        <p className="mt-3 text-xs text-bone-faint">
          Demo only - nothing was actually sent.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6 sm:p-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
        className="space-y-4"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClass}>
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              placeholder="Your name"
              className={fieldClass}
            />
          </div>
          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@email.com"
              className={fieldClass}
            />
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
            required
            rows={5}
            placeholder="Tell us a little about your goals…"
            className={fieldClass}
          />
        </div>

        <Button type="submit" size="lg" className="w-full">
          Send message
        </Button>
        <p className="text-center text-xs text-bone-faint">
          Demo only - this form doesn&apos;t actually send anything.
        </p>
      </form>
    </Card>
  );
}

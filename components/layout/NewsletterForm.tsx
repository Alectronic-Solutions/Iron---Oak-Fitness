"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { EMAIL_RE } from "@/lib/utils";

/** Footer newsletter signup. Simulated - nothing is sent. */
export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  if (status === "done") {
    return (
      <p role="status" className="flex items-center gap-2 text-sm text-emerald-300">
        <Check className="h-4 w-4" />
        You&apos;re on the list. Watch your inbox.
      </p>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
        setStatus(EMAIL_RE.test(email) ? "done" : "error");
      }}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex gap-2">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@email.com"
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? "newsletter-error" : undefined}
          className="h-12 min-w-0 flex-1 rounded-full border border-line bg-ink/40 px-5 text-base text-bone placeholder:text-bone-faint focus:border-oak focus:outline-none sm:text-sm"
        />
        <button
          type="submit"
          aria-label="Subscribe"
          className="grid h-12 w-12 shrink-0 cursor-pointer place-items-center rounded-full bg-bronze text-ink transition-colors hover:bg-oak-soft"
        >
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
      {status === "error" && (
        <p id="newsletter-error" role="alert" className="mt-2 text-xs text-red-300">
          Please enter a valid email address.
        </p>
      )}
    </form>
  );
}

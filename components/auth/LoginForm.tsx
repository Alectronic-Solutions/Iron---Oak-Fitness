"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn, EMAIL_RE } from "@/lib/utils";

const fieldClass =
  "h-12 w-full rounded-lg border border-line bg-ink/40 px-4 text-base text-bone placeholder:text-bone-faint focus:border-oak focus:outline-none sm:text-sm";

/** Simulated sign-in: validates locally, then opens the demo portal. */
export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const [pending, setPending] = useState(false);

  return (
    <Card className="p-6 sm:p-8">
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          const email = String(data.get("email") ?? "").trim();
          const password = String(data.get("password") ?? "");
          if (!EMAIL_RE.test(email) || !password) {
            setError("Enter your email and password to continue.");
            return;
          }
          setError(null);
          setPending(true);
          router.push("/account");
        }}
        className="space-y-4"
      >
        <div>
          <label htmlFor="login-email" className="mb-1.5 block text-xs uppercase tracking-wider text-bone-faint">
            Email
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            defaultValue="alex.mercer@example.com"
            className={fieldClass}
          />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="login-password" className="block text-xs uppercase tracking-wider text-bone-faint">
              Password
            </label>
            <Link href="/contact" className="text-xs text-oak-soft hover:text-bone">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="login-password"
              name="password"
              type={show ? "text" : "password"}
              autoComplete="current-password"
              defaultValue="demo-password"
              className={cn(fieldClass, "pr-12")}
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 grid w-12 cursor-pointer place-items-center text-bone-faint hover:text-bone"
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {error && (
          <p role="alert" className="text-sm text-red-300">
            {error}
          </p>
        )}
        <Button type="submit" size="lg" className="w-full" disabled={pending}>
          {pending ? "Signing in…" : "Sign in"}
        </Button>
        <p className="text-center text-xs text-bone-faint">
          Demo account pre-filled - any email and password will work.
        </p>
      </form>
    </Card>
  );
}

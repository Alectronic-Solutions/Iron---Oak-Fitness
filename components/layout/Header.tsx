"use client";

import { startTransition, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/schedule", label: "Schedule" },
  { href: "/training", label: "Training" },
  { href: "/trainers", label: "Trainers" },
  { href: "/membership", label: "Membership" },
];

function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="group flex items-center gap-2.5"
      aria-label="Iron & Oak Fitness - home"
    >
      <span className="grid h-9 w-9 place-items-center rounded-md bg-bronze text-ink transition-transform group-hover:-rotate-6">
        <Dumbbell className="h-5 w-5" />
      </span>
      <span className="font-display text-xl uppercase tracking-[-0.02em] text-bone">
        Iron <span className="text-oak-soft">&amp;</span> Oak
      </span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev;
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    startTransition(() => {
      setOpen(false);
    });
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-line bg-ink/85 backdrop-blur-md transition-shadow duration-300",
        scrolled && "shadow-[0_1px_0_0_rgba(255,255,255,0.06)]",
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Wordmark />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative cursor-pointer font-display text-sm uppercase tracking-wider transition-colors",
                isActive(link.href)
                  ? "text-oak-soft"
                  : "text-bone-muted hover:text-bone",
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-oak-soft" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/account"
            className="hidden cursor-pointer font-display text-sm uppercase tracking-wider text-bone-muted transition-colors hover:text-bone sm:block"
          >
            Sign in
          </Link>
          <ButtonLink
            href="/membership"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Join now
          </ButtonLink>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-md text-bone md:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 z-40 bg-ink md:hidden"
            onClick={() => setOpen(false)}
          >
            <nav className="shell flex flex-col gap-1 py-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "block cursor-pointer border-b border-line py-4 font-display text-2xl uppercase tracking-wide transition-colors",
                      isActive(link.href) ? "text-oak-soft" : "text-bone",
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.06, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href="/account"
                  className="block cursor-pointer py-4 font-display text-2xl uppercase tracking-wide text-bone-muted"
                >
                  Sign in
                </Link>
                <ButtonLink href="/membership" size="lg" className="mt-4 w-full">
                  Join now
                </ButtonLink>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

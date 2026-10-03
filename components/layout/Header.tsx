"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  ChevronDown,
  Clock,
  MapPin,
  Menu,
  Phone,
  UserRound,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { Wordmark } from "@/components/layout/Wordmark";
import { NAV, STUDIO, STUDIO_ADDRESS, type NavGroup } from "@/lib/site";
import { openStatus, useNow } from "@/lib/useNow";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const HOVER_CLOSE_DELAY = 140;

/** Strip query/hash so "/membership#packs" matches the /membership route. */
const pathOf = (href: string) => href.split(/[?#]/)[0];

function isGroupActive(group: NavGroup, pathname: string) {
  return [group.href, ...group.items.map((i) => i.href)].some((href) => {
    const p = pathOf(href);
    return pathname === p || pathname.startsWith(`${p}/`);
  });
}

/* ------------------------------------------------------------------ */
/*  Open / closed indicator                                            */
/* ------------------------------------------------------------------ */
function OpenStatus({ className }: { className?: string }) {
  const now = useNow();
  // Static export: render a neutral line until the client knows the time.
  if (!now) {
    return (
      <span className={cn("inline-flex items-center gap-2", className)}>
        <Clock className="h-3.5 w-3.5 text-oak" />
        Open 7 days
      </span>
    );
  }
  const { open, label } = openStatus(now);
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        className={cn(
          "h-2 w-2 rounded-full",
          open ? "bg-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.2)]" : "bg-bone-faint",
        )}
        aria-hidden
      />
      {label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Utility bar (tablet + desktop)                                     */
/* ------------------------------------------------------------------ */
function TopBar() {
  return (
    <div className="hidden border-b border-line bg-charcoal text-xs text-bone-muted md:block">
      <div className="shell flex h-9 items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <OpenStatus />
          <Link
            href="/contact"
            className="hidden items-center gap-2 transition-colors hover:text-bone lg:inline-flex"
          >
            <MapPin className="h-3.5 w-3.5 text-oak" />
            {STUDIO_ADDRESS}
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <a
            href={STUDIO.phoneHref}
            className="inline-flex items-center gap-2 transition-colors hover:text-bone"
          >
            <Phone className="h-3.5 w-3.5 text-oak" />
            {STUDIO.phone}
          </a>
          <Link href="/free-trial" className="text-oak-soft transition-colors hover:text-bone">
            First class free →
          </Link>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 transition-colors hover:text-bone"
          >
            <UserRound className="h-3.5 w-3.5" />
            Member login
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Desktop dropdown                                                   */
/* ------------------------------------------------------------------ */
function DesktopMenu({
  group,
  open,
  active,
  onOpen,
  onClose,
  onToggle,
}: {
  group: NavGroup;
  open: boolean;
  active: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
}) {
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | null>(null);
  const lastPointer = useRef<string>("");

  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(onClose, HOVER_CLOSE_DELAY);
  };

  useEffect(() => cancelClose, []);

  return (
    <li
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        cancelClose();
        onOpen();
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") scheduleClose();
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          e.stopPropagation();
          onClose();
          triggerRef.current?.focus();
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onPointerDown={(e) => {
          lastPointer.current = e.pointerType;
        }}
        onClick={() => {
          // Hover already opened it for mouse users; a click shouldn't close it.
          if (lastPointer.current === "mouse") onOpen();
          else onToggle();
          lastPointer.current = "";
        }}
        className={cn(
          "relative flex h-16 cursor-pointer items-center gap-1.5 font-display text-sm uppercase tracking-wider transition-colors",
          active || open ? "text-bone" : "text-bone-muted hover:text-bone",
        )}
      >
        {group.label}
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-180")}
          aria-hidden
        />
        {active && (
          <span className="absolute inset-x-0 bottom-4 h-px bg-oak-soft" aria-hidden />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: EASE }}
            className="absolute left-1/2 top-full z-50 -translate-x-1/2"
          >
            <div
              className={cn(
                "grid gap-2 overflow-hidden rounded-2xl border border-line bg-charcoal p-2 shadow-2xl shadow-black/50",
                group.feature ? "w-[38rem] grid-cols-[1fr_15rem]" : "w-80",
              )}
            >
              <ul className="py-1">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group/item block rounded-xl px-4 py-3 transition-colors hover:bg-charcoal-2 focus-visible:bg-charcoal-2"
                    >
                      <span className="flex items-center gap-2 font-display text-sm uppercase tracking-wider text-bone">
                        {item.label}
                        <ArrowRight className="h-3.5 w-3.5 -translate-x-1 text-oak-soft opacity-0 transition-all group-hover/item:translate-x-0 group-hover/item:opacity-100" />
                      </span>
                      {item.description && (
                        <span className="mt-0.5 block text-xs leading-relaxed text-bone-faint">
                          {item.description}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
              {group.feature && (
                <Link
                  href={group.feature.href}
                  onClick={onClose}
                  className="hero-bg group/feat flex flex-col justify-end rounded-xl border border-oak/25 p-5 transition-colors hover:border-oak/60"
                >
                  <span className="eyebrow">{group.feature.eyebrow}</span>
                  <span className="mt-2 font-display text-2xl uppercase leading-none text-bone">
                    {group.feature.title}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-2 font-display text-xs uppercase tracking-[0.12em] text-bronze">
                    {group.feature.cta}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/feat:translate-x-1" />
                  </span>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/*  Mobile drawer                                                      */
/* ------------------------------------------------------------------ */
function MobileDrawer({
  pathname,
  onClose,
}: {
  pathname: string;
  onClose: () => void;
}) {
  const [expanded, setExpanded] = useState<string | null>(
    () => NAV.find((g) => isGroupActive(g, pathname))?.label ?? null,
  );

  return (
    <div className="shell flex min-h-full flex-col pb-[max(2rem,env(safe-area-inset-bottom))] pt-2">
      <ul>
        {NAV.map((group, i) => {
          const isOpen = expanded === group.label;
          const panelId = `mobile-nav-${i}`;
          return (
            <motion.li
              key={group.label}
              className="border-b border-line"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3, ease: EASE }}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setExpanded(isOpen ? null : group.label)}
                className={cn(
                  "flex min-h-16 w-full cursor-pointer items-center justify-between gap-4 text-left font-display text-2xl uppercase tracking-wide transition-colors",
                  isGroupActive(group, pathname) ? "text-oak-soft" : "text-bone",
                )}
              >
                {group.label}
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-bone-faint transition-transform duration-200",
                    isOpen && "rotate-180 text-oak-soft",
                  )}
                  aria-hidden
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.ul
                    id={panelId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="overflow-hidden"
                  >
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          aria-current={pathOf(item.href) === pathname && !item.href.includes("#") ? "page" : undefined}
                          className="flex min-h-12 items-center justify-between gap-3 border-l border-line py-2.5 pl-4 text-bone-muted transition-colors hover:border-oak hover:text-bone aria-[current=page]:border-oak aria-[current=page]:text-bone"
                        >
                          <span>
                            <span className="block text-base">{item.label}</span>
                            {item.description && (
                              <span className="block text-xs text-bone-faint">
                                {item.description}
                              </span>
                            )}
                          </span>
                          <ArrowRight className="h-4 w-4 shrink-0 text-bone-faint" />
                        </Link>
                      </li>
                    ))}
                    <li className="h-3" aria-hidden />
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.li>
          );
        })}
      </ul>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: NAV.length * 0.05, duration: 0.3, ease: EASE }}
        className="mt-6 space-y-6"
      >
        <div className="grid grid-cols-2 gap-3">
          <ButtonLink href="/free-trial" variant="secondary" onClick={onClose}>
            Free class
          </ButtonLink>
          <ButtonLink href="/membership" onClick={onClose}>
            Join now
          </ButtonLink>
        </div>

        <Link
          href="/login"
          onClick={onClose}
          className="flex min-h-12 items-center gap-3 rounded-xl border border-line bg-charcoal px-4 text-bone transition-colors hover:border-oak/50"
        >
          <UserRound className="h-5 w-5 text-oak-soft" />
          <span className="flex-1 font-display uppercase tracking-wider">Member login</span>
          <ArrowRight className="h-4 w-4 text-bone-faint" />
        </Link>

        <div className="space-y-3 rounded-2xl border border-line bg-charcoal p-4 text-sm text-bone-muted">
          <OpenStatus />
          <Link href="/contact" onClick={onClose} className="flex items-center gap-2 hover:text-bone">
            <MapPin className="h-4 w-4 text-oak" />
            {STUDIO_ADDRESS}
          </Link>
          <a href={STUDIO.phoneHref} className="flex items-center gap-2 hover:text-bone">
            <Phone className="h-4 w-4 text-oak" />
            {STUDIO.phone}
          </a>
        </div>

        <SocialLinks />
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Header                                                             */
/* ------------------------------------------------------------------ */
export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const [drawerTop, setDrawerTop] = useState(64);
  const barRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLUListElement>(null);

  // Close menus on navigation (adjusting state during render, per React docs).
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileOpen(false);
    setOpenMenu(null);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Desktop dropdown: close on outside click.
  useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [openMenu]);

  // Mobile drawer: scroll lock, focus trap, Escape, and auto-close on resize.
  useEffect(() => {
    if (!mobileOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const getFocusable = () =>
      Array.from(
        drawerRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [],
      );
    getFocusable()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      // Include the toggle so keyboard users can always reach "close".
      const focusable = [toggleRef.current!, ...getFocusable()];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = () => desktop.matches && setMobileOpen(false);

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [mobileOpen]);

  return (
    <>
      <TopBar />
      <header className="sticky top-0 z-40">
        <div
          ref={barRef}
          className={cn(
            "border-b bg-ink/90 backdrop-blur-md transition-[border-color,box-shadow] duration-300",
            scrolled || mobileOpen
              ? "border-line shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)]"
              : "border-transparent",
          )}
        >
          <div className="shell flex h-16 items-center justify-between gap-4">
            <Wordmark />

            {/* Desktop nav */}
            <nav aria-label="Primary" className="hidden lg:block">
              <ul ref={navRef} className="flex items-center gap-8">
                {NAV.map((group) => (
                  <DesktopMenu
                    key={group.label}
                    group={group}
                    open={openMenu === group.label}
                    active={isGroupActive(group, pathname)}
                    onOpen={() => setOpenMenu(group.label)}
                    onClose={() =>
                      setOpenMenu((cur) => (cur === group.label ? null : cur))
                    }
                    onToggle={() =>
                      setOpenMenu((cur) => (cur === group.label ? null : group.label))
                    }
                  />
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <ButtonLink
                href="/schedule"
                variant="secondary"
                size="sm"
                className="hidden xl:inline-flex"
              >
                Book a class
              </ButtonLink>
              <ButtonLink href="/membership" size="sm" className="hidden sm:inline-flex">
                Join now
              </ButtonLink>

              {/* Mobile / tablet menu toggle */}
              <button
                ref={toggleRef}
                type="button"
                onClick={() => {
                  // Sit flush under the bar, wherever the utility bar left it.
                  const bottom = barRef.current?.getBoundingClientRect().bottom;
                  if (bottom) setDrawerTop(bottom);
                  setMobileOpen((v) => !v);
                }}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                className="-mr-2 grid h-11 w-11 cursor-pointer place-items-center rounded-md text-bone lg:hidden"
              >
                {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer - outside the blurred bar, since backdrop-filter
            would otherwise become the containing block for `fixed`. */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              ref={drawerRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ top: drawerTop }}
              className="fixed inset-x-0 bottom-0 z-40 overflow-y-auto overscroll-contain bg-ink lg:hidden"
            >
              <nav aria-label="Mobile">
                <MobileDrawer pathname={pathname} onClose={() => setMobileOpen(false)} />
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

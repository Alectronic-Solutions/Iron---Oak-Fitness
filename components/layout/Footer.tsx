import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { BackToTop } from "./BackToTop";
import { NewsletterForm } from "./NewsletterForm";
import { SocialLinks } from "./SocialLinks";
import { Wordmark } from "./Wordmark";
import { HOURS, STUDIO, STUDIO_ADDRESS, hoursRange } from "@/lib/site";

const columns = [
  {
    title: "Train",
    links: [
      { href: "/schedule", label: "Class schedule" },
      { href: "/classes", label: "All classes" },
      { href: "/training", label: "Personal training" },
      { href: "/trainers", label: "Our coaches" },
    ],
  },
  {
    title: "Join",
    links: [
      { href: "/membership", label: "Membership" },
      { href: "/membership#packs", label: "Class packs" },
      { href: "/free-trial", label: "Free first class" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    title: "Studio",
    links: [
      { href: "/about", label: "Our story" },
      { href: "/about#facility", label: "The facility" },
      { href: "/contact", label: "Contact" },
      { href: "/login", label: "Member login" },
    ],
  },
];

const legal = [
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/terms", label: "Terms" },
  { href: "/legal/cookies", label: "Cookies" },
];

const linkClass =
  "inline-flex min-h-9 items-center text-sm text-bone-muted transition-colors hover:text-bone";

export function Footer() {
  return (
    <footer className="border-t border-line bg-charcoal">
      {/* Newsletter band */}
      <div className="border-b border-line">
        <div className="shell grid gap-6 py-10 md:grid-cols-2 md:items-center md:gap-12">
          <div>
            <p className="eyebrow">The Iron &amp; Oak letter</p>
            <h2 className="mt-2 text-2xl uppercase text-bone sm:text-3xl">
              Training notes, once a month.
            </h2>
            <p className="mt-2 text-sm text-bone-muted">
              Programming tips, new classes and member events. No spam, ever.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      <div className="shell grid grid-cols-2 gap-x-6 gap-y-10 py-14 sm:grid-cols-3 lg:grid-cols-[1.4fr_repeat(3,1fr)_1.3fr]">
        {/* Brand */}
        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <Wordmark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-bone-muted">
            A boutique strength &amp; conditioning gym. Built on iron, grounded
            in oak, strength that lasts.
          </p>
          <SocialLinks className="mt-5" />
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="eyebrow">{col.title}</h3>
            <ul className="mt-3 space-y-1">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={linkClass}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        {/* Visit */}
        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <h3 className="eyebrow">Visit</h3>
          <address className="mt-4 space-y-3 text-sm not-italic text-bone-muted">
            <p className="flex gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-oak" />
              <Link href="/contact" className="hover:text-bone">
                {STUDIO_ADDRESS}
              </Link>
            </p>
            <p className="flex gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-oak" />
              <a href={STUDIO.phoneHref} className="hover:text-bone">
                {STUDIO.phone}
              </a>
            </p>
            <p className="flex gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-oak" />
              <a href={`mailto:${STUDIO.email}`} className="hover:text-bone">
                {STUDIO.email}
              </a>
            </p>
            <div className="flex gap-2.5 pt-1">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-oak" />
              <dl className="w-full max-w-60 space-y-1">
                {HOURS.map((h) => (
                  <div key={h.label} className="flex justify-between gap-4">
                    <dt>{h.label}</dt>
                    <dd className="text-bone-faint">{hoursRange(h)}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </address>
        </div>
      </div>

      <div className="border-t border-line">
        {/* Extra bottom padding on mobile clears the fixed action bar. */}
        <div className="shell flex flex-col gap-4 pb-28 pt-5 text-xs text-bone-faint md:flex-row md:items-center md:justify-between md:pb-5">
          <p>© {new Date().getFullYear()} Iron &amp; Oak Fitness. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {legal.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-bone-muted">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-between gap-6 sm:justify-start">
            <span>
              Site by{" "}
              <a
                href="https://alectronicsolutions.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-oak-soft"
              >
                Alectronic Solutions
              </a>
            </span>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}

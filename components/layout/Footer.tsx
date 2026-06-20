import Link from "next/link";
import { Clock, Dumbbell, Mail, MapPin, Phone } from "lucide-react";
import { BackToTop } from "./BackToTop";

// lucide-react v1 dropped brand icons, so we inline minimal social glyphs.
type IconProps = { className?: string };

const InstagramIcon = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden
  >
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

const XIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.9l-4.62-6.02L5.7 22H2.44l8.02-9.17L1.5 2h6.9l4.18 5.5L18.244 2Zm-1.2 18h1.9L7.04 4h-2L17.04 20Z" />
  </svg>
);

const YoutubeIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M23 7.5a3 3 0 0 0-2.1-2.1C19 5 12 5 12 5s-7 0-8.9.4A3 3 0 0 0 1 7.5 31 31 0 0 0 .6 12 31 31 0 0 0 1 16.5a3 3 0 0 0 2.1 2.1C5 19 12 19 12 19s7 0 8.9-.4a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.4 12 31 31 0 0 0 23 7.5ZM9.75 15.5v-7l6 3.5-6 3.5Z" />
  </svg>
);

const explore = [
  { href: "/schedule", label: "Class schedule" },
  { href: "/training", label: "Personal training" },
  { href: "/trainers", label: "Our trainers" },
  { href: "/membership", label: "Membership" },
];

const company = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/account", label: "Member portal" },
];

const legal = [
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/terms", label: "Terms of Service" },
  { href: "/legal/cookies", label: "Cookie Policy" },
];

const hours = [
  { days: "Mon – Fri", time: "5:00 – 22:00" },
  { days: "Saturday", time: "7:00 – 18:00" },
  { days: "Sunday", time: "8:00 – 16:00" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-charcoal">
      <div className="shell grid gap-10 py-14 pb-28 sm:grid-cols-3 md:grid-cols-5 md:pb-14">
        {/* Brand */}
        <div className="sm:col-span-3 md:col-span-2">
          <Link href="/" className="flex cursor-pointer items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-bronze text-ink">
              <Dumbbell className="h-5 w-5" />
            </span>
            <span className="font-display text-xl uppercase tracking-wide text-bone">
              Iron <span className="text-oak-soft">&amp;</span> Oak
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-bone-muted">
            A boutique strength &amp; conditioning gym. Built on iron, grounded
            in oak, strength that lasts.
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { Icon: InstagramIcon, href: "https://instagram.com/ironandoakfitness", label: "Instagram" },
              { Icon: XIcon, href: "https://x.com/ironandoakfit", label: "X / Twitter" },
              { Icon: YoutubeIcon, href: "https://youtube.com/@ironandoakfitness", label: "YouTube" },
            ].map(({ Icon, href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-line text-bone-muted transition-colors hover:border-oak hover:text-oak-soft"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <div>
          <h3 className="eyebrow">Explore</h3>
          <ul className="mt-4 space-y-3">
            {explore.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="cursor-pointer text-sm text-bone-muted transition-colors hover:text-bone"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company + Legal */}
        <div>
          <h3 className="eyebrow">Studio</h3>
          <ul className="mt-4 space-y-3">
            {company.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="cursor-pointer text-sm text-bone-muted transition-colors hover:text-bone"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <h3 className="eyebrow">Legal</h3>
            </li>
            {legal.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="cursor-pointer text-sm text-bone-muted transition-colors hover:text-bone"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Visit */}
        <div>
          <h3 className="eyebrow">Visit</h3>
          <ul className="mt-4 space-y-3 text-sm text-bone-muted">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-oak" />
              <span>142 Kiln Street, Eastside</span>
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-oak" />
              <a href="tel:+15550102284" className="cursor-pointer hover:text-bone">
                (555) 010-2284
              </a>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-oak" />
              <a href="mailto:hello@ironandoak.fit" className="cursor-pointer hover:text-bone">
                hello@ironandoak.fit
              </a>
            </li>
            <li className="flex gap-2.5 pt-1">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-oak" />
              <span className="space-y-1">
                {hours.map((h) => (
                  <span key={h.days} className="flex justify-between gap-4">
                    <span>{h.days}</span>
                    <span className="text-bone-faint">{h.time}</span>
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col gap-4 py-5 text-xs text-bone-faint md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Iron &amp; Oak Fitness. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {legal.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="cursor-pointer transition-colors hover:text-bone-muted"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-between gap-4 sm:justify-start">
            <span>
              Site by{" "}
              <a
                href="https://alectronicsolutions.com"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer transition-colors hover:text-oak-soft"
              >
                Alectronic Solutions
              </a>
            </span>
            <BackToTop />
          </div>
        </div>
        <div className="shell pb-4">
          <p className="text-xs text-bone-faint/50">
            Demo project - no real payments are processed and all data is mock.
          </p>
        </div>
      </div>
    </footer>
  );
}

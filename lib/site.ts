import type { Metadata } from "next";

/** Site-wide constants for metadata, sitemap, robots, and structured data.
 *  Kept in one place since the GitHub Pages base path makes the canonical
 *  URL easy to get out of sync across files. */
export const SITE_NAME = "Iron & Oak Fitness";
export const SITE_TAGLINE = "Strength, grounded.";
export const SITE_DESCRIPTION =
  "A premium boutique gym. Group classes, 1-on-1 coaching, and membership built around you. Mobile-first scheduling and membership demo.";

const isProd = process.env.NODE_ENV === "production";
export const BASE_PATH = isProd ? "/Iron---Oak-Fitness" : "";
export const SITE_URL = `https://alectronic-solutions.github.io${BASE_PATH}`;

/* ------------------------------------------------------------------ */
/*  Studio details - shared by header, footer, contact + JSON-LD       */
/* ------------------------------------------------------------------ */
export const STUDIO = {
  street: "142 Kiln Street",
  district: "Eastside",
  city: "Brooklyn",
  region: "NY",
  postalCode: "11201",
  country: "US",
  phone: "(555) 010-2284",
  phoneHref: "tel:+15550102284",
  email: "hello@ironandoak.fit",
  /** Placeholder coordinates for the map embed. */
  geo: { lat: 40.71, lng: -74.0 },
} as const;

export const STUDIO_ADDRESS = `${STUDIO.street}, ${STUDIO.district}`;

export interface HoursRow {
  label: string;
  /** schema.org day names this row covers. */
  days: string[];
  /** 0 = Sunday … 6 = Saturday, matching Date#getDay. */
  dayIndexes: number[];
  open: string;
  close: string;
}

export const HOURS: HoursRow[] = [
  {
    label: "Mon – Fri",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    dayIndexes: [1, 2, 3, 4, 5],
    open: "05:00",
    close: "22:00",
  },
  { label: "Saturday", days: ["Saturday"], dayIndexes: [6], open: "07:00", close: "18:00" },
  { label: "Sunday", days: ["Sunday"], dayIndexes: [0], open: "08:00", close: "16:00" },
];

/** "05:00" -> "5am", "17:30" -> "5:30pm". */
export function formatTime12(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const suffix = h < 12 ? "am" : "pm";
  const hour = h % 12 || 12;
  return m === 0 ? `${hour}${suffix}` : `${hour}:${String(m).padStart(2, "0")}${suffix}`;
}

export function hoursRange(row: HoursRow): string {
  return `${formatTime12(row.open)} – ${formatTime12(row.close)}`;
}

export const SOCIAL = [
  { id: "instagram", label: "Instagram", href: "https://instagram.com" },
  { id: "x", label: "X / Twitter", href: "https://x.com" },
  { id: "youtube", label: "YouTube", href: "https://youtube.com" },
] as const;

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */
export interface NavItem {
  href: string;
  label: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  /** Where the top-level label itself points. */
  href: string;
  items: NavItem[];
  /** Optional promo tile shown in the desktop dropdown. */
  feature?: { eyebrow: string; title: string; href: string; cta: string };
}

export const NAV: NavGroup[] = [
  {
    label: "Classes",
    href: "/schedule",
    items: [
      { href: "/schedule", label: "Class schedule", description: "Book this week's sessions in seconds." },
      { href: "/classes", label: "All classes", description: "Strength, conditioning, mobility and endurance." },
      { href: "/classes/iron-foundations", label: "New here? Start with Foundations", description: "Our barbell on-ramp for every level." },
    ],
    feature: {
      eyebrow: "First class free",
      title: "Try any class on us.",
      href: "/free-trial",
      cta: "Claim your class",
    },
  },
  {
    label: "Training",
    href: "/training",
    items: [
      { href: "/training", label: "Personal training", description: "1-on-1 coaching built around your goals." },
      { href: "/trainers", label: "Meet the coaches", description: "Certified specialists in every discipline." },
      { href: "/training#book", label: "Book a session", description: "Pick a coach and a time that works." },
    ],
    feature: {
      eyebrow: "Free consult",
      title: "20 minutes with a coach, no strings.",
      href: "/free-trial?goal=pt",
      cta: "Book a consult",
    },
  },
  {
    label: "Membership",
    href: "/membership",
    items: [
      { href: "/membership", label: "Plans & pricing", description: "Monthly memberships. No contracts." },
      { href: "/membership#packs", label: "Class packs & drop-ins", description: "Pay as you go, from $17 a class." },
      { href: "/membership#compare", label: "Compare plans", description: "Every plan, side by side." },
      { href: "/faq", label: "FAQ", description: "Freezes, guests, cancellations and more." },
    ],
    feature: {
      eyebrow: "Most popular",
      title: "Unlimited classes from $129/mo.",
      href: "/join?plan=unlimited",
      cta: "Join Unlimited",
    },
  },
  {
    label: "Studio",
    href: "/about",
    items: [
      { href: "/about", label: "Our story", description: "Built on iron. Grounded in oak." },
      { href: "/about#facility", label: "The facility", description: "Platforms, turf, sauna and more." },
      { href: "/contact", label: "Visit & contact", description: "Hours, directions and enquiries." },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Per-page metadata                                                  */
/* ------------------------------------------------------------------ */

/** Page metadata with a self-referencing canonical + matching Open Graph
 *  tags. Relative paths resolve against `metadataBase` (which carries the
 *  GitHub Pages base path). */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      url: path,
      title: `${title} · ${SITE_NAME}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · ${SITE_NAME}`,
      description,
    },
  };
}

import { HOURS, SITE_NAME, SITE_URL, SOCIAL, STUDIO } from "@/lib/site";
import type { MembershipPlan } from "@/types";
import type { Trainer } from "@/types";

/**
 * Prevent schema data from terminating its script element if a future CMS or
 * API supplies text containing HTML-significant characters.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

/** JSON-LD for the gym itself, rendered once in the root layout. */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    name: SITE_NAME,
    description:
      "A premium boutique gym offering group classes, 1-on-1 personal training, and flexible membership.",
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    telephone: STUDIO.phone,
    email: STUDIO.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: STUDIO.street,
      addressLocality: STUDIO.city,
      addressRegion: STUDIO.region,
      postalCode: STUDIO.postalCode,
      addressCountry: STUDIO.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: STUDIO.geo.lat,
      longitude: STUDIO.geo.lng,
    },
    openingHoursSpecification: HOURS.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.open,
      closes: h.close,
    })),
    sameAs: SOCIAL.map((s) => s.href),
  };
}

/** JSON-LD breadcrumb trail. `items` are [label, path] from the root down. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === "/" ? "/" : item.path}`,
    })),
  };
}

/** JSON-LD for a class detail page. */
export function courseSchema(cls: { title: string; description: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: cls.title,
    description: cls.description,
    url: `${SITE_URL}/classes/${cls.slug}`,
    provider: { "@type": "ExerciseGym", name: SITE_NAME, url: SITE_URL },
  };
}

/** JSON-LD for an FAQ page. */
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** JSON-LD offers for the membership plans grid. */
export function membershipOffersSchema(plans: MembershipPlan[]) {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Iron & Oak Fitness memberships",
    itemListElement: plans.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      description: plan.blurb,
      price: plan.priceMonthly,
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: plan.priceMonthly,
        priceCurrency: "USD",
        billingDuration: "P1M",
      },
    })),
  };
}

/** JSON-LD for a trainer profile page. */
export function trainerPersonSchema(trainer: Trainer) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: trainer.name,
    jobTitle: trainer.role,
    image: trainer.image,
    description: trainer.bio,
    worksFor: {
      "@type": "ExerciseGym",
      name: SITE_NAME,
      url: SITE_URL,
    },
    hasCredential: trainer.certifications,
  };
}

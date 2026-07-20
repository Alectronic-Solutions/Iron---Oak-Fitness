import { SITE_NAME, SITE_URL } from "@/lib/site";
import type { MembershipPlan } from "@/types";
import type { Trainer } from "@/types";

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

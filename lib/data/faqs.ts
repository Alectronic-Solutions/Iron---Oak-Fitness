export interface Faq {
  q: string;
  a: string;
}

export interface FaqGroup {
  id: string;
  title: string;
  faqs: Faq[];
}

export const faqGroups: FaqGroup[] = [
  {
    id: "membership",
    title: "Membership & billing",
    faqs: [
      {
        q: "Is there a joining fee?",
        a: "Never. You pay for your membership and nothing else - no sign-up fees, no hidden extras.",
      },
      {
        q: "Can I cancel anytime?",
        a: "Yes. Memberships are month-to-month. Cancel from the member portal or at the front desk with no penalty; you keep access until the end of your billing period.",
      },
      {
        q: "Can I freeze my membership?",
        a: "Absolutely - you can freeze for up to two months each year if travel, injury or life gets in the way. Your rate is locked while frozen.",
      },
      {
        q: "How does annual billing work?",
        a: "Pay for twelve months upfront and save 15% on any plan. Annual plans can be frozen too, and the freeze period is added to the end of your term.",
      },
      {
        q: "Can I switch plans?",
        a: "Any time. Upgrades take effect immediately and are prorated; downgrades apply from your next billing date.",
      },
    ],
  },
  {
    id: "classes",
    title: "Classes & booking",
    faqs: [
      {
        q: "What does the free first class include?",
        a: "Any group class on the timetable, on us. Book it, show up 10 minutes early for a quick tour, and train - no card required.",
      },
      {
        q: "How far ahead can I book?",
        a: "Members can book up to 7 days ahead (Unlimited and Performance members get a 12-hour head start). Class packs and drop-ins open 5 days ahead.",
      },
      {
        q: "What happens if a class is full?",
        a: "Join the waitlist. If a spot opens, you're automatically moved in and we'll text you - up to 2 hours before class.",
      },
      {
        q: "What's the cancellation policy?",
        a: "Cancel up to 8 hours before class at no cost. Late cancellations or no-shows use a class credit (packs) or incur a $10 fee (memberships).",
      },
      {
        q: "Do class packs expire?",
        a: "Packs are valid for the window shown on each pack (30–120 days), giving you flexibility without locking you in.",
      },
    ],
  },
  {
    id: "training",
    title: "Personal training",
    faqs: [
      {
        q: "How long is a personal-training session?",
        a: "60 minutes, including a short warm-up and a cool-down. Your coach logs every session so your program keeps progressing.",
      },
      {
        q: "Are PT sessions included with membership?",
        a: "Unlimited includes one session a month and Performance includes four. Anyone can book additional sessions as add-ons.",
      },
      {
        q: "I'm a complete beginner. Is PT right for me?",
        a: "It's the best place to start. A few sessions will teach you to move well and train safely, so you get more out of every class afterwards.",
      },
    ],
  },
  {
    id: "studio",
    title: "The studio",
    faqs: [
      {
        q: "Is there parking?",
        a: "Free street parking on Kiln Street after 6pm, and a paid lot two minutes' walk away. Covered bike racks are right outside the door.",
      },
      {
        q: "Do you have showers and lockers?",
        a: "Yes - private showers, day lockers (bring a lock or borrow one), towels, and premium toiletries in both changing rooms.",
      },
      {
        q: "Can I bring a guest?",
        a: "Unlimited members get two guest passes a month and Performance members get unlimited. Guests sign a waiver on arrival.",
      },
    ],
  },
];

export function getFaqGroup(id: string): FaqGroup | undefined {
  return faqGroups.find((g) => g.id === id);
}

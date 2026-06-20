import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Iron & Oak Fitness collects, uses, and protects your personal information.",
};

const sections = [
  {
    title: "1. Information We Collect",
    body: [
      "When you create a member account, book a class, or purchase a membership, we collect information you provide directly: your name, email address, phone number, billing address, and payment details.",
      "We also collect information automatically when you use our website: IP address, browser type, pages visited, time spent on pages, and referring URLs. This data is collected via cookies and similar tracking technologies.",
      "If you contact us by phone, email, or through our contact form, we may retain those communications and their contents.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    body: [
      "To create and manage your member account and class bookings.",
      "To process payments and send receipts, booking confirmations, and schedule reminders.",
      "To communicate with you about your membership, upcoming classes, and gym news (you may opt out of marketing emails at any time).",
      "To improve our website, services, and class offerings using aggregated, anonymised analytics.",
      "To comply with legal obligations and resolve disputes.",
    ],
  },
  {
    title: "3. Sharing of Information",
    body: [
      "We do not sell, rent, or trade your personal information to third parties for their marketing purposes.",
      "We may share your information with trusted service providers who assist us in operating our website and running our business (e.g. payment processors, email delivery services, scheduling software). These providers are contractually obligated to keep your information confidential and use it only to perform services on our behalf.",
      "We may disclose your information where required by law, court order, or governmental authority.",
    ],
  },
  {
    title: "4. Cookies",
    body: [
      "We use cookies and similar technologies to remember your preferences, keep you logged in, and understand how visitors use our site. See our Cookie Policy for full details and opt-out instructions.",
    ],
  },
  {
    title: "5. Data Retention",
    body: [
      "We retain your personal data for as long as your account is active or as needed to provide services to you. After account closure, we may retain certain information for up to seven years to comply with tax and legal obligations.",
      "You may request deletion of your account and associated data at any time by emailing hello@ironandoak.fit.",
    ],
  },
  {
    title: "6. Your Rights",
    body: [
      "Depending on your location, you may have the right to: access the personal data we hold about you; correct inaccurate data; request deletion of your data; object to or restrict certain processing; and data portability.",
      "To exercise any of these rights, contact us at hello@ironandoak.fit. We will respond within 30 days.",
    ],
  },
  {
    title: "7. Security",
    body: [
      "We implement industry-standard security measures including TLS encryption in transit and encrypted storage at rest. No method of transmission over the internet is 100% secure; we cannot guarantee absolute security, but we take every reasonable precaution to protect your information.",
    ],
  },
  {
    title: "8. Children's Privacy",
    body: [
      "Our services are intended for individuals aged 16 and over. We do not knowingly collect personal information from children under 16. If you believe we have inadvertently collected such information, please contact us and we will delete it promptly.",
    ],
  },
  {
    title: "9. Changes to This Policy",
    body: [
      "We may update this Privacy Policy from time to time. When we make material changes, we will notify you by email or by posting a notice on our website. The date at the top of this page reflects the most recent revision.",
    ],
  },
  {
    title: "10. Contact Us",
    body: [
      "Iron & Oak Fitness, 142 Kiln Street, Eastside",
      "Email: hello@ironandoak.fit",
      "Phone: (555) 010-2284",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="shell py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <p className="eyebrow mb-3">Legal</p>
        <h1 className="font-display text-4xl uppercase tracking-tight text-bone md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-bone-muted">
          Last updated: June 19, 2026
        </p>
        <p className="mt-6 text-bone-muted leading-relaxed">
          Iron &amp; Oak Fitness (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is committed to protecting
          your privacy. This policy explains what personal information we
          collect, how we use it, and your rights regarding that information.
        </p>

        <div className="mt-12 space-y-10">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="font-display text-lg uppercase tracking-wide text-bone">
                {s.title}
              </h2>
              <ul className="mt-3 space-y-2">
                {s.body.map((p, i) => (
                  <li key={i} className="text-sm leading-relaxed text-bone-muted">
                    {p}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

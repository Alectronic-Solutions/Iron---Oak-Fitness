import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions governing your use of Iron & Oak Fitness services and membership.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: [
      "By accessing our website, creating an account, or purchasing a membership or class pack, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use our services.",
    ],
  },
  {
    title: "2. Membership & Billing",
    body: [
      "Monthly memberships are billed on a recurring basis on the same calendar date each month. Annual memberships are billed in full at the time of purchase.",
      "You authorise Iron & Oak Fitness to charge the payment method on file for all fees. If a payment fails, we may attempt to re-charge and may suspend access to services until the outstanding balance is resolved.",
      "All prices are displayed inclusive of applicable taxes where required by law.",
    ],
  },
  {
    title: "3. Cancellation & Refunds",
    body: [
      "Monthly memberships may be cancelled at any time with 14 days' written notice before the next billing date. You will retain access until the end of the current paid period. No partial-month refunds are issued.",
      "Annual memberships cancelled within 7 days of purchase are eligible for a full refund. After 7 days, the remaining balance may be applied as gym credit at our discretion.",
      "Class packs are non-refundable once any class in the pack has been attended.",
      "To cancel, email hello@ironandoak.fit or visit the Member Portal.",
    ],
  },
  {
    title: "4. Class Bookings & Cancellations",
    body: [
      "Members may book classes up to 7 days in advance, subject to availability. Class spots are confirmed at time of booking.",
      "Cancellations made more than 12 hours before a class start time will be refunded to your account (or pack credit restored). Late cancellations and no-shows may result in a forfeited session.",
      "Waitlisted members will be notified automatically if a spot becomes available. We cannot guarantee waitlist placement.",
    ],
  },
  {
    title: "5. Code of Conduct",
    body: [
      "Members and guests are expected to treat staff and fellow members with respect. Harassment, discrimination, or aggressive behaviour will result in immediate suspension of membership without refund.",
      "Members are responsible for their personal property. Iron & Oak Fitness is not liable for lost, stolen, or damaged items on the premises.",
      "The gym reserves the right to deny entry or terminate membership for any violation of this code.",
    ],
  },
  {
    title: "6. Health & Safety",
    body: [
      "By using our facilities and attending classes, you confirm that you are in suitable physical condition to participate in exercise and have not been advised otherwise by a medical professional.",
      "You assume all risk of injury arising from your participation in gym activities. Iron & Oak Fitness will not be liable for any injury, illness, or loss suffered during use of our facilities, except where caused by our negligence.",
      "You agree to follow all posted gym rules, safety notices, and reasonable instructions from staff.",
    ],
  },
  {
    title: "7. Limitation of Liability",
    body: [
      "To the maximum extent permitted by law, Iron & Oak Fitness shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services, even if we have been advised of the possibility of such damages.",
      "Our total liability for any claim relating to our services shall not exceed the total fees you paid to us in the 3 months preceding the claim.",
    ],
  },
  {
    title: "8. Intellectual Property",
    body: [
      "All content on this website (including text, images, logos, and workout programming) is owned by or licensed to Iron & Oak Fitness. You may not reproduce, distribute, or create derivative works without our written permission.",
    ],
  },
  {
    title: "9. Changes to Terms",
    body: [
      "We reserve the right to update these Terms at any time. Material changes will be communicated by email or a notice on our website at least 14 days before taking effect. Continued use of our services after that date constitutes acceptance of the revised Terms.",
    ],
  },
  {
    title: "10. Governing Law",
    body: [
      "These Terms are governed by the laws of the jurisdiction in which Iron & Oak Fitness is registered. Any disputes shall be resolved in the courts of that jurisdiction.",
    ],
  },
  {
    title: "11. Contact",
    body: [
      "Questions about these Terms? Reach us at hello@ironandoak.fit or (555) 010-2284.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="shell py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <p className="eyebrow mb-3">Legal</p>
        <h1 className="font-display text-4xl uppercase tracking-tight text-bone md:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-bone-muted">
          Last updated: June 19, 2026
        </p>
        <p className="mt-6 text-bone-muted leading-relaxed">
          These Terms of Service govern your access to and use of Iron &amp; Oak
          Fitness facilities, website, and membership services. Please read them
          carefully.
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

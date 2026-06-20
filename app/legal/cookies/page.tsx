import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How Iron & Oak Fitness uses cookies and similar tracking technologies.",
};

const cookieTypes = [
  {
    name: "Strictly Necessary",
    purpose:
      "These cookies are essential for the website to function. They enable core features such as page navigation, secure login sessions, and booking flows. The site cannot function properly without them.",
    examples: "Session token, CSRF protection, booking state",
    canOptOut: false,
  },
  {
    name: "Functional",
    purpose:
      "These cookies remember your preferences (such as your selected class filters, preferred location, and whether you have dismissed a notification) to give you a more personalised experience.",
    examples: "Preference storage, UI state",
    canOptOut: true,
  },
  {
    name: "Analytics",
    purpose:
      "We use analytics cookies to understand how visitors interact with our site: which pages are most popular, where people drop off during booking, and how traffic arrives. All data is aggregated and anonymised.",
    examples: "Page views, session duration, referral source",
    canOptOut: true,
  },
  {
    name: "Marketing",
    purpose:
      "If you interact with one of our advertisements on a third-party platform, a marketing cookie may be set to measure the effectiveness of that campaign and to avoid showing you the same ad repeatedly.",
    examples: "Ad click attribution, frequency capping",
    canOptOut: true,
  },
];

export default function CookiesPage() {
  return (
    <main className="shell py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <p className="eyebrow mb-3">Legal</p>
        <h1 className="font-display text-4xl uppercase tracking-tight text-bone md:text-5xl">
          Cookie Policy
        </h1>
        <p className="mt-4 text-sm text-bone-muted">
          Last updated: June 19, 2026
        </p>
        <p className="mt-6 text-bone-muted leading-relaxed">
          This Cookie Policy explains what cookies are, how Iron &amp; Oak
          Fitness uses them, and the choices you have regarding their use.
        </p>

        <section className="mt-10">
          <h2 className="font-display text-lg uppercase tracking-wide text-bone">
            What are cookies?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-bone-muted">
            Cookies are small text files placed on your device by a website.
            They are widely used to make websites work efficiently, to remember
            your preferences, and to provide reporting information to site
            owners. Cookies may be &ldquo;session&rdquo; cookies (deleted when you close
            your browser) or &ldquo;persistent&rdquo; cookies (which remain until they
            expire or you delete them).
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg uppercase tracking-wide text-bone">
            How we use cookies
          </h2>
          <div className="mt-4 space-y-6">
            {cookieTypes.map((c) => (
              <div
                key={c.name}
                className="rounded-lg border border-line bg-charcoal-2 p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-display text-sm uppercase tracking-wide text-bone">
                    {c.name}
                  </h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      c.canOptOut
                        ? "bg-oak/10 text-oak-soft"
                        : "bg-bone-faint/10 text-bone-muted"
                    }`}
                  >
                    {c.canOptOut ? "Optional" : "Required"}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-bone-muted">
                  {c.purpose}
                </p>
                <p className="mt-2 text-xs text-bone-faint">
                  Examples: {c.examples}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg uppercase tracking-wide text-bone">
            Managing your cookie preferences
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-bone-muted">
            You can control and delete cookies at any time through your browser
            settings. Note that disabling strictly necessary cookies will affect
            the functionality of the site, including your ability to log in and
            book classes.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-bone-muted">
            Most browsers allow you to refuse new cookies, delete existing
            cookies, and set different preferences for first-party and
            third-party cookies. Visit your browser&apos;s help documentation
            for instructions.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg uppercase tracking-wide text-bone">
            Third-party cookies
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-bone-muted">
            Some cookies on our site are set by third-party services we use,
            such as analytics providers and social media platforms. We do not
            control these cookies. Please refer to the respective third-party
            privacy policies for more information.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg uppercase tracking-wide text-bone">
            Changes to this policy
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-bone-muted">
            We may update this Cookie Policy periodically. Material changes will
            be flagged with an updated date at the top of this page.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-lg uppercase tracking-wide text-bone">
            Contact us
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-bone-muted">
            Questions about our use of cookies? Email us at{" "}
            <a
              href="mailto:hello@ironandoak.fit"
              className="text-oak-soft hover:text-bone transition-colors"
            >
              hello@ironandoak.fit
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}

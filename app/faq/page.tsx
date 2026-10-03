import { Mail, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FaqList } from "@/components/ui/FaqList";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqGroups } from "@/lib/data/faqs";
import { pageMetadata, STUDIO } from "@/lib/site";
import { faqSchema, serializeJsonLd } from "@/lib/structuredData";

export const metadata = pageMetadata({
  title: "FAQ",
  description:
    "Answers on Iron & Oak membership, billing, freezes, class booking, cancellations, personal training, parking and more.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(faqSchema(faqGroups.flatMap((g) => g.faqs))),
        }}
      />
      <section className="grain border-b border-line">
        <div className="shell py-10 sm:py-16">
          <Breadcrumbs items={[{ name: "FAQ", path: "/faq" }]} />
          <SectionHeading
            as="h1"
            className="mt-6"
            eyebrow="Good to know"
            title="Questions, answered"
            description="Everything you need to know before your first session. Can't find it? We're a call away."
          />
        </div>
      </section>

      <div className="shell grid grid-cols-1 gap-10 py-10 sm:py-16 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
        {/* Jump nav */}
        <nav aria-label="FAQ topics" className="lg:sticky lg:top-24 lg:self-start">
          <ul className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-col lg:gap-1 lg:px-0">
            {faqGroups.map((g) => (
              <li key={g.id} className="shrink-0">
                <a
                  href={`#${g.id}`}
                  className="inline-flex min-h-10 items-center rounded-full border border-line bg-charcoal px-4 text-xs uppercase tracking-wider text-bone-muted transition-colors hover:border-oak/50 hover:text-bone lg:w-full lg:rounded-lg lg:border-transparent lg:bg-transparent lg:px-3 lg:text-sm lg:normal-case lg:tracking-normal"
                >
                  {g.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-14">
          {faqGroups.map((g) => (
            <section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`}>
              <h2 id={`${g.id}-title`} className="mb-4 text-2xl uppercase text-bone sm:text-3xl">
                {g.title}
              </h2>
              <FaqList faqs={g.faqs} />
            </section>
          ))}

          <Card className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="font-display text-xl uppercase text-bone">Still got questions?</p>
              <p className="mt-1 text-sm text-bone-muted">
                The front desk is staffed whenever we&apos;re open.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={STUDIO.phoneHref} variant="secondary">
                <Phone className="h-4 w-4" /> Call us
              </ButtonLink>
              <ButtonLink href="/contact">
                <Mail className="h-4 w-4" /> Message us
              </ButtonLink>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

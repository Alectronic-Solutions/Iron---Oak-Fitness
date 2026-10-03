import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ClassCard } from "@/components/schedule/ClassCard";
import { classes } from "@/lib/data/classes";
import { getSlotsForClass } from "@/lib/data/schedule";
import { CATEGORIES, CATEGORY_STYLE } from "@/lib/categories";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Classes",
  description:
    "Every Iron & Oak group class - barbell strength, HIIT and kettlebell conditioning, mobility flow and endurance - coached in small groups.",
  path: "/classes",
});

export default function ClassesPage() {
  return (
    <div>
      <section className="grain border-b border-line">
        <div className="shell py-10 sm:py-16">
          <Breadcrumbs items={[{ name: "Classes", path: "/classes" }]} />
          <SectionHeading
            as="h1"
            className="mt-6"
            eyebrow="Group classes"
            title="Find your class"
            description="Eight formats, four disciplines, one standard: every session is coached, capped small, and scalable to your level."
          />
          {/* Jump links */}
          <nav
            aria-label="Class categories"
            className="scrollbar-none -mx-5 mt-8 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0"
          >
            {CATEGORIES.map((cat) => (
              <a
                key={cat}
                href={`#${cat.toLowerCase()}`}
                className="inline-flex min-h-10 shrink-0 items-center rounded-full border border-line bg-charcoal px-4 text-xs font-medium uppercase tracking-wider text-bone-muted transition-colors hover:border-oak/50 hover:text-bone"
              >
                {cat}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {CATEGORIES.map((cat, idx) => {
        const list = classes.filter((c) => c.category === cat);
        if (list.length === 0) return null;
        const sessions = list.reduce((n, c) => n + getSlotsForClass(c.slug).length, 0);
        return (
          <section
            key={cat}
            id={cat.toLowerCase()}
            className={idx % 2 === 1 ? "border-y border-line bg-charcoal" : undefined}
          >
            <div className="shell py-14 sm:py-20">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="max-w-xl">
                  <p className="eyebrow">{sessions} sessions a week</p>
                  <h2 className="mt-2 text-3xl uppercase text-bone sm:text-4xl">{cat}</h2>
                  <p className="mt-2 text-bone-muted">{CATEGORY_STYLE[cat].blurb}</p>
                </div>
              </div>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((c, i) => (
                  <Reveal key={c.slug} delay={i * 0.06} className="h-full">
                    <ClassCard fitnessClass={c} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="grain border-t border-line">
        <div className="shell py-16 text-center sm:py-20">
          <h2 className="mx-auto max-w-2xl text-3xl uppercase leading-tight text-bone sm:text-5xl">
            Not sure where to start?
          </h2>
          <p className="mx-auto mt-4 max-w-md text-bone-muted">
            Most members begin with Iron Foundations. Your first class is on us.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/free-trial" size="lg" className="w-full sm:w-auto">
              Claim your free class
            </ButtonLink>
            <ButtonLink href="/schedule" variant="secondary" size="lg" className="w-full sm:w-auto">
              View schedule <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}

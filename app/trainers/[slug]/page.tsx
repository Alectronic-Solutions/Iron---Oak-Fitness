import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Reveal } from "@/components/ui/Reveal";
import { AppointmentBooker } from "@/components/trainers/AppointmentBooker";
import { CertificationList } from "@/components/trainers/CertificationList";
import { SpecialtyBadges } from "@/components/trainers/SpecialtyBadges";
import { trainers, getTrainerBySlug } from "@/lib/data/trainers";
import { getClassesByCoach } from "@/lib/data/classes";
import { trainerPersonSchema } from "@/lib/structuredData";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return trainers.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const trainer = getTrainerBySlug(slug);
  return {
    title: trainer?.name ?? "Trainer",
    description: trainer ? `${trainer.role} at Iron & Oak Fitness.` : undefined,
  };
}

export default async function TrainerProfilePage({ params }: Params) {
  const { slug } = await params;
  const trainer = getTrainerBySlug(slug);
  if (!trainer) notFound();

  const coachedClasses = getClassesByCoach(trainer.id);

  return (
    <div className="shell py-10 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(trainerPersonSchema(trainer)),
        }}
      />
      <Link
        href="/trainers"
        className="inline-flex items-center gap-2 text-sm text-bone-muted transition-colors hover:text-bone"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to trainers
      </Link>

      <div className="mt-6 grid gap-10 md:grid-cols-[1fr_280px] lg:grid-cols-3">
        {/* Main */}
        <div className="lg:col-span-2">
          <Reveal>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <Avatar initials={trainer.initials} size="xl" image={trainer.image} />
              <div>
                <h1 className="text-4xl uppercase leading-none text-bone sm:text-5xl">
                  {trainer.name}
                </h1>
                <p className="mt-2 text-lg text-oak-soft">{trainer.role}</p>
                <p className="mt-1 text-sm text-bone-faint">
                  {trainer.yearsExperience}+ years coaching
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-bone-muted">
              {trainer.bio}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10">
              <p className="eyebrow">Specialties</p>
              <SpecialtyBadges specialties={trainer.specialties} />
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-10">
              <p className="eyebrow">Certifications</p>
              <CertificationList certifications={trainer.certifications} />
            </div>
          </Reveal>

          {coachedClasses.length > 0 && (
            <Reveal delay={0.18}>
              <div className="mt-10">
                <p className="eyebrow">Classes {trainer.name.split(" ")[0]} leads</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {coachedClasses.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/classes/${c.slug}`}
                      className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-charcoal p-4 transition-colors hover:border-oak/50"
                    >
                      <div>
                        <p className="font-display uppercase text-bone">
                          {c.title}
                        </p>
                        <p className="text-xs text-bone-faint">{c.category}</p>
                      </div>
                      <ArrowUpRight className="h-5 w-5 text-bone-faint transition-colors group-hover:text-oak-soft" />
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </div>

        {/* Sidebar */}
        <aside>
          <div className="lg:sticky lg:top-24">
            <AppointmentBooker trainer={trainer} />
          </div>
        </aside>
      </div>
    </div>
  );
}

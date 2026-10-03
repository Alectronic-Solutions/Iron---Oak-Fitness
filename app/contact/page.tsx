import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { HOURS, STUDIO, STUDIO_ADDRESS, hoursRange, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact & Visit",
  description: `Visit Iron & Oak Fitness at ${STUDIO_ADDRESS}. Opening hours, directions, phone and email - or send us a message.`,
  path: "/contact",
});

const { lat, lng } = STUDIO.geo;
const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.01}%2C${lat - 0.005}%2C${lng + 0.01}%2C${lat + 0.005}&layer=mapnik&marker=${lat}%2C${lng}`;
const directionsHref = `https://www.openstreetmap.org/directions?to=${lat}%2C${lng}`;

export default function ContactPage() {
  return (
    <div>
      <section className="grain border-b border-line">
        <div className="shell py-10 sm:py-16">
          <SectionHeading
            as="h1"
            eyebrow="Contact"
            title="Come say hello"
            description="Questions about membership, training or just want to look around? Send a note or drop by the studio - the door's open."
          />
        </div>
      </section>

      <div className="shell grid gap-8 py-10 sm:py-14 md:grid-cols-2 lg:gap-12">
        <ContactForm />

        <div className="space-y-5">
          {/* Map */}
          <div className="overflow-hidden rounded-2xl border border-line">
            <iframe
              title={`Map showing ${STUDIO_ADDRESS}`}
              src={mapSrc}
              width="100%"
              height="240"
              className="block border-0 [filter:invert(0.9)_hue-rotate(180deg)_saturate(0.6)]"
              loading="lazy"
              referrerPolicy="no-referrer"
              sandbox="allow-scripts allow-popups"
            />
            <div className="flex flex-col gap-3 bg-charcoal p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-start gap-2 text-sm text-bone">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-oak" />
                <span>
                  {STUDIO_ADDRESS}
                  <span className="block text-xs text-bone-faint">
                    {STUDIO.city}, {STUDIO.region} {STUDIO.postalCode}
                  </span>
                </span>
              </p>
              <a
                href={directionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line px-4 font-display text-xs uppercase tracking-[0.12em] text-bone transition-colors hover:border-oak hover:text-oak-soft"
              >
                <Navigation className="h-4 w-4" /> Directions
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <a href={STUDIO.phoneHref} className="group">
              <Card interactive className="h-full p-5">
                <Phone className="h-5 w-5 text-oak" />
                <p className="mt-3 text-xs uppercase tracking-wider text-bone-faint">Call</p>
                <p className="font-display text-lg text-bone group-hover:text-oak-soft">{STUDIO.phone}</p>
              </Card>
            </a>
            <a href={`mailto:${STUDIO.email}`} className="group">
              <Card interactive className="h-full p-5">
                <Mail className="h-5 w-5 text-oak" />
                <p className="mt-3 text-xs uppercase tracking-wider text-bone-faint">Email</p>
                <p className="break-all font-display text-lg text-bone group-hover:text-oak-soft">
                  {STUDIO.email}
                </p>
              </Card>
            </a>
          </div>

          <Card className="p-5">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-oak" />
              <h2 className="text-xs uppercase tracking-wider text-bone-faint">Opening hours</h2>
            </div>
            <dl className="mt-3 space-y-2 text-sm">
              {HOURS.map((h) => (
                <div
                  key={h.label}
                  className="flex justify-between border-b border-line pb-2 text-bone-muted last:border-0 last:pb-0"
                >
                  <dt>{h.label}</dt>
                  <dd className="text-bone">{hoursRange(h)}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-bone-faint">
              Staffed front desk during all opening hours. Holiday hours posted on Instagram.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { Clock, Mail, Phone } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Iron & Oak Fitness - visit, call, or message us.",
};

const hours = [
  { days: "Mon – Fri", time: "5:00 – 22:00" },
  { days: "Saturday", time: "7:00 – 18:00" },
  { days: "Sunday", time: "8:00 – 16:00" },
];

export default function ContactPage() {
  return (
    <div className="shell py-12 sm:py-16">
      <SectionHeading
        eyebrow="Contact"
        title="Come say hello"
        description="Questions about membership, training or just want to look around? Send a note or drop by the studio - the door's open."
      />

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <ContactForm />

        <div className="space-y-6">
          {/* Map */}
          <div className="overflow-hidden rounded-2xl border border-line">
            <iframe
              title="Studio location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-74.0100%2C40.7050%2C-73.9900%2C40.7150&layer=mapnik&marker=40.7100%2C-74.0000"
              width="100%"
              height="224"
              style={{ border: 0, display: "block", filter: "invert(0.9) hue-rotate(180deg) saturate(0.6)" }}
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Card className="p-5">
              <Phone className="h-5 w-5 text-oak" />
              <p className="mt-3 text-xs uppercase tracking-wider text-bone-faint">
                Call
              </p>
              <a
                href="tel:+15550102284"
                className="font-display text-lg text-bone hover:text-oak-soft"
              >
                (555) 010-2284
              </a>
            </Card>
            <Card className="p-5">
              <Mail className="h-5 w-5 text-oak" />
              <p className="mt-3 text-xs uppercase tracking-wider text-bone-faint">
                Email
              </p>
              <a
                href="mailto:hello@ironandoak.fit"
                className="break-all font-display text-lg text-bone hover:text-oak-soft"
              >
                hello@ironandoak.fit
              </a>
            </Card>
          </div>

          <Card className="p-5">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-oak" />
              <p className="text-xs uppercase tracking-wider text-bone-faint">
                Opening hours
              </p>
            </div>
            <ul className="mt-3 space-y-2 text-sm">
              {hours.map((h) => (
                <li
                  key={h.days}
                  className="flex justify-between border-b border-line pb-2 text-bone-muted last:border-0 last:pb-0"
                >
                  <span>{h.days}</span>
                  <span className="text-bone">{h.time}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

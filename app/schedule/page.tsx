import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScheduleCalendar } from "@/components/schedule/ScheduleCalendar";

export const metadata: Metadata = {
  title: "Class Schedule",
  description:
    "Browse the Iron & Oak weekly timetable and book your spot in group classes.",
};

export default function SchedulePage() {
  return (
    <div>
      <section className="grain border-b border-line">
        <div className="shell py-12 sm:py-16">
          <SectionHeading
            eyebrow="Timetable"
            title="Class schedule"
            description="Browse the week, tap a session for details, and book your spot in seconds. Times reflect a typical week at the studio."
          />
          <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-8 text-sm">
            {[
              { label: "Class types", value: "7" },
              { label: "Sessions / week", value: "40+" },
              { label: "Levels welcome", value: "All" },
              { label: "Coaches on floor", value: "12" },
            ].map((s) => (
              <div key={s.label} className="flex items-baseline gap-2">
                <dt className="font-display text-2xl text-bone">{s.value}</dt>
                <dd className="text-bone-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <div className="shell py-10">
        <ScheduleCalendar />
      </div>
    </div>
  );
}

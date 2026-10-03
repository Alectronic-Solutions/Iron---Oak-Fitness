import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScheduleCalendar } from "@/components/schedule/ScheduleCalendar";
import { classes } from "@/lib/data/classes";
import { schedule } from "@/lib/data/schedule";
import { trainers } from "@/lib/data/trainers";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Class Schedule",
  description:
    "Browse the Iron & Oak weekly timetable - strength, conditioning, mobility and endurance classes - and book your spot in seconds.",
  path: "/schedule",
});

const stats = [
  { label: "Sessions / week", value: String(schedule.length) },
  { label: "Class types", value: String(classes.length) },
  { label: "Max class size", value: String(Math.max(...schedule.map((s) => s.capacity))) },
  { label: "Coaches", value: String(trainers.length) },
];

export default function SchedulePage() {
  return (
    <div>
      <section className="grain border-b border-line">
        <div className="shell py-10 sm:py-16">
          <SectionHeading
            as="h1"
            eyebrow="Timetable"
            title="Class schedule"
            description="Pick a day, tap a session, and you're in. Small classes fill fast - book ahead or join the waitlist."
          />
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-6 text-sm sm:flex sm:flex-wrap sm:gap-x-10">
            {stats.map((s) => (
              <div key={s.label} className="flex items-baseline gap-2">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-2xl text-bone">{s.value}</dd>
                <dd className="text-bone-muted" aria-hidden>
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <div className="shell py-8 sm:py-12">
        <ScheduleCalendar />
      </div>
    </div>
  );
}

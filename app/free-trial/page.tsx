import { Check, Star } from "lucide-react";
import { TrialFlow } from "@/components/trial/TrialFlow";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Your First Class Free",
  description:
    "Try any Iron & Oak group class free, or book a free 20-minute consult with a coach. No card, no commitment.",
  path: "/free-trial",
});

const promises = [
  "Any class on the timetable",
  "A coach-led tour of the studio",
  "No card, no commitment",
  "Towels, showers and lockers included",
];

export default function FreeTrialPage() {
  return (
    <div className="hero-bg">
      <div className="shell grid grid-cols-1 gap-10 py-10 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16 lg:py-20">
        <div className="lg:pt-6">
          <p className="eyebrow-ruled inline-flex">First class free</p>
          <h1 className="mt-5 text-5xl uppercase leading-[0.9] text-bone sm:text-6xl lg:text-7xl">
            Your first
            <br />
            <span className="text-gradient-oak">session&apos;s on us.</span>
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-bone-muted">
            Walk in, meet the coaches, and train. Three quick steps and you&apos;re
            booked.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {promises.map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm text-bone">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-oak/15 text-oak-soft">
                  <Check className="h-3.5 w-3.5" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <figure className="mt-10 hidden border-l-2 border-oak/50 pl-5 lg:block">
            <div className="flex gap-1 text-bronze" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" aria-hidden />
              ))}
            </div>
            <blockquote className="mt-3 text-bone-muted">
              &ldquo;I was nervous walking in. Twenty minutes later Marcus had me
              deadlifting with perfect form. Signed up that night.&rdquo;
            </blockquote>
            <figcaption className="mt-2 font-display text-sm uppercase text-bone">
              Dani R. · Member since 2025
            </figcaption>
          </figure>
        </div>

        <TrialFlow />
      </div>
    </div>
  );
}

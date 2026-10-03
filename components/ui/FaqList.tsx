import { Plus } from "lucide-react";
import type { Faq } from "@/lib/data/faqs";

/** Native <details> accordion: works without JS and is keyboard friendly. */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="border-t border-line">
      {faqs.map((faq) => (
        <details key={faq.q} className="group border-b border-line">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-base uppercase tracking-wide text-bone transition-colors hover:text-oak-soft [&::-webkit-details-marker]:hidden">
            {faq.q}
            <Plus
              className="h-5 w-5 shrink-0 text-oak transition-transform duration-200 group-open:rotate-45"
              aria-hidden
            />
          </summary>
          <p className="max-w-2xl pb-5 text-sm leading-relaxed text-bone-muted sm:text-base">
            {faq.a}
          </p>
        </details>
      ))}
    </div>
  );
}

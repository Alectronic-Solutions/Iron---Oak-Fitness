"use client";

import { usePathname } from "next/navigation";
import { ButtonLink } from "@/components/ui/Button";

/** Routes with their own primary action, where the bar would only compete. */
const HIDDEN_ON = ["/join", "/login", "/free-trial"];

/** Persistent mobile action bar. Hidden from md upward (desktop has the
 *  header CTA instead). */
export function MobileCtaBar() {
  const pathname = usePathname();
  if (HIDDEN_ON.includes(pathname)) return null;

  const onSchedule = pathname === "/schedule";

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ink/95 backdrop-blur-md md:hidden">
      <div className="shell flex gap-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3">
        <ButtonLink
          href={onSchedule ? "/free-trial" : "/schedule"}
          variant="secondary"
          className="flex-1"
        >
          {onSchedule ? "Free class" : "Book a class"}
        </ButtonLink>
        <ButtonLink href="/membership" className="flex-1">
          Join now
        </ButtonLink>
      </div>
    </div>
  );
}

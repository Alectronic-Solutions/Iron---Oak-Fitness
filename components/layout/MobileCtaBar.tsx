import { ButtonLink } from "@/components/ui/Button";

/** Persistent mobile action bar. Hidden from md upward (desktop has the
 *  header CTA instead). */
export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ink/95 backdrop-blur-md md:hidden">
      <div className="shell flex gap-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <ButtonLink href="/schedule" variant="secondary" className="flex-1">
          Schedule
        </ButtonLink>
        <ButtonLink href="/membership" className="flex-1">
          Join now
        </ButtonLink>
      </div>
    </div>
  );
}

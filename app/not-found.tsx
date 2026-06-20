import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="grain relative overflow-hidden">
      <div className="shell grid min-h-[75vh] place-items-center py-24 text-center">
        <div>
          <p className="eyebrow">404 — Page not found</p>
          <p
            className="mt-4 font-display text-[clamp(6rem,20vw,14rem)] leading-none text-line"
            aria-hidden
          >
            404
          </p>
          <h1 className="-mt-4 font-display text-4xl uppercase text-bone sm:text-5xl">
            Off the map
          </h1>
          <p className="mx-auto mt-5 max-w-sm text-bone-muted">
            Looks like that page doesn&apos;t exist. Let&apos;s get you back on
            solid ground.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/">Back home</ButtonLink>
            <ButtonLink href="/schedule" variant="secondary">
              View schedule
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}

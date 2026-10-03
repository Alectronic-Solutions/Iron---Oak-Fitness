import { SOCIAL } from "@/lib/site";
import { cn } from "@/lib/utils";

// lucide-react v1 dropped brand icons, so we inline minimal social glyphs.
type IconProps = { className?: string };

const InstagramIcon = ({ className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden
  >
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

const XIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.9l-4.62-6.02L5.7 22H2.44l8.02-9.17L1.5 2h6.9l4.18 5.5L18.244 2Zm-1.2 18h1.9L7.04 4h-2L17.04 20Z" />
  </svg>
);

const YoutubeIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M23 7.5a3 3 0 0 0-2.1-2.1C19 5 12 5 12 5s-7 0-8.9.4A3 3 0 0 0 1 7.5 31 31 0 0 0 .6 12 31 31 0 0 0 1 16.5a3 3 0 0 0 2.1 2.1C5 19 12 19 12 19s7 0 8.9-.4a3 3 0 0 0 2.1-2.1A31 31 0 0 0 23.4 12 31 31 0 0 0 23 7.5ZM9.75 15.5v-7l6 3.5-6 3.5Z" />
  </svg>
);

const icons = { instagram: InstagramIcon, x: XIcon, youtube: YoutubeIcon };

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex gap-3", className)}>
      {SOCIAL.map(({ id, href, label }) => {
        const Icon = icons[id];
        return (
          <a
            key={id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} (opens in a new tab)`}
            className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line text-bone-muted transition-colors hover:border-oak hover:text-oak-soft"
          >
            <Icon className="h-4 w-4" />
          </a>
        );
      })}
    </div>
  );
}

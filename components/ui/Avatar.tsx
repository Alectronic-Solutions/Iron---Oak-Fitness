import { cn } from "@/lib/utils";

interface AvatarProps {
  initials: string;
  size?: "sm" | "md" | "lg" | "xl";
  colorKey?: string;
  image?: string;
  className?: string;
}

const sizes = {
  sm: "h-9 w-9 text-xs",
  md: "h-12 w-12 text-sm",
  lg: "h-16 w-16 text-lg",
  xl: "h-24 w-24 text-2xl",
};

const gradients = [
  "from-oak-soft via-oak to-bronze",
  "from-amber-400 via-orange-500 to-amber-700",
  "from-stone-400 via-stone-500 to-stone-600",
  "from-emerald-400 via-teal-600 to-emerald-800",
  "from-bronze via-oak to-oak-soft",
];

function hashKey(key: string): number {
  return key.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % gradients.length;
}

export function Avatar({ initials, size = "md", colorKey, image, className }: AvatarProps) {
  const gradient = colorKey ? gradients[hashKey(colorKey)] : gradients[0];

  if (image) {
    return (
      <span
        aria-hidden
        className={cn(
          "inline-block overflow-hidden rounded-full",
          sizes[size],
          className,
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={initials}
          className="h-full w-full object-cover"
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden
      className={cn(
        "inline-grid place-items-center rounded-full font-display font-semibold uppercase tracking-wide text-ink",
        "bg-linear-to-br",
        gradient,
        sizes[size],
        className,
      )}
    >
      {initials}
    </span>
  );
}

import { ParallaxBg } from "./ParallaxBg";
import { cn } from "@/lib/utils";

interface PhotoBandProps {
  src: string;
  alt: string;
  overlayClass?: string;
  /** Large centred quote or eyebrow text */
  quote?: string;
  eyebrow?: string;
  className?: string;
}

export function PhotoBand({
  src,
  alt,
  overlayClass,
  quote,
  eyebrow,
  className,
}: PhotoBandProps) {
  return (
    <ParallaxBg
      src={src}
      alt={alt}
      overlayClass={overlayClass}
      className={cn("h-[42vh] min-h-[260px] md:h-[55vh]", className)}
    >
      {(quote || eyebrow) && (
        <div className="flex h-[42vh] min-h-[260px] flex-col items-center justify-center px-4 text-center md:h-[55vh]">
          {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
          {quote && (
            <blockquote className="mx-auto max-w-3xl font-display text-3xl uppercase leading-tight text-bone sm:text-4xl md:text-5xl">
              {quote}
            </blockquote>
          )}
        </div>
      )}
    </ParallaxBg>
  );
}

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { breadcrumbSchema, serializeJsonLd } from "@/lib/structuredData";

interface Crumb {
  name: string;
  path: string;
}

/** Visible breadcrumb trail + matching BreadcrumbList JSON-LD. The last
 *  crumb is the current page. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail = [{ name: "Home", path: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema(trail)) }}
      />
      <ol className="flex flex-wrap items-center gap-1 text-xs text-bone-faint">
        {trail.map((crumb, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-1">
              {last ? (
                <span aria-current="page" className="text-bone-muted">
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link
                    href={crumb.path}
                    className="inline-flex min-h-8 items-center transition-colors hover:text-bone"
                  >
                    {crumb.name}
                  </Link>
                  <ChevronRight className="h-3 w-3" aria-hidden />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_TAGLINE, BASE_PATH } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — ${SITE_TAGLINE}`,
    short_name: SITE_NAME,
    description:
      "Group classes, 1-on-1 coaching, and membership built around you.",
    start_url: `${BASE_PATH}/`,
    display: "standalone",
    background_color: "#0e0f11",
    theme_color: "#0e0f11",
    icons: [
      {
        src: `${BASE_PATH}/icon.png`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

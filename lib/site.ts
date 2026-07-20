/** Site-wide constants for metadata, sitemap, robots, and structured data.
 *  Kept in one place since the GitHub Pages base path makes the canonical
 *  URL easy to get out of sync across files. */
export const SITE_NAME = "Iron & Oak Fitness";
export const SITE_TAGLINE = "Strength, grounded.";
export const SITE_DESCRIPTION =
  "A premium boutique gym. Group classes, 1-on-1 coaching, and membership built around you. Mobile-first scheduling and membership demo.";

const isProd = process.env.NODE_ENV === "production";
export const BASE_PATH = isProd ? "/Iron---Oak-Fitness" : "";
export const SITE_URL = `https://alectronic-solutions.github.io${BASE_PATH}`;

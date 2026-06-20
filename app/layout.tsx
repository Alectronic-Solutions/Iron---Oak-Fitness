import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileCtaBar } from "@/components/layout/MobileCtaBar";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const siteUrl = "https://ironandoakfitness.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Iron & Oak Fitness - Strength, grounded.",
    template: "%s · Iron & Oak Fitness",
  },
  description:
    "A premium boutique gym. Group classes, 1-on-1 coaching, and membership built around you. Mobile-first scheduling and membership demo.",
  icons: {
    icon: { url: "/favicon.svg", type: "image/svg+xml" },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Iron & Oak Fitness",
    title: "Iron & Oak Fitness — Strength, grounded.",
    description:
      "A premium boutique gym. Group classes, 1-on-1 personal training, and flexible membership. Book in seconds.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Iron & Oak Fitness — Strength, grounded.",
    description:
      "A premium boutique gym. Group classes, 1-on-1 personal training, and flexible membership. Book in seconds.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body className="bg-ink text-bone antialiased">
        <div className="flex min-h-dvh flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <MobileCtaBar />
      </body>
    </html>
  );
}

import { Anton, Manrope } from "next/font/google";
import { Metadata } from "next";
import Navigation from "@/components/nav/Navigation";
import Footer from "@/components/footer/Footer";
import Analytics from "@/components/analytics/Analytics";
import LocalBusinessJsonLd from "@/components/seo/LocalBusinessJsonLd";
import CustomCursor from "@/components/effects/CustomCursor";
import { SITE_NAME, SITE_URL, TAGLINE } from "@/lib/site";
import "./globals.css";

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", display: "swap" });
const manrope = Manrope({
  subsets: ["latin"],
  // 400 body, 500 eyebrow/labels. 600/700 unused after typography sweep — saves ~36KB.
  weight: ["400", "500"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${SITE_NAME} — ${TAGLINE}`, template: `%s — ${SITE_NAME}` },
  description: `${TAGLINE} Factory-correct collision repair for Lamborghini, McLaren, Audi R8, and BMW M. Sarasota, FL.`,
  openGraph: {
    title: `${SITE_NAME} — ${TAGLINE}`,
    description: `${TAGLINE} Factory-correct collision repair for exotic cars. Sarasota, FL.`,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: `${SITE_NAME} — ${TAGLINE}`, description: `${TAGLINE} Factory-correct collision repair for exotic cars.` },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${manrope.variable}`}>
      <head>
        <LocalBusinessJsonLd />
        {/* Preload the poster only — it's the LCP candidate. The video element streams on its own; explicit video preload was tanking LCP at 9.8MB. */}
        <link rel="preload" as="image" href="/hero-clips/cinematic-poster.webp" fetchPriority="high" />
      </head>
      <body className="bg-bg text-text font-body antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-bg focus:font-body focus:text-sm focus:uppercase focus:tracking-[0.18em] focus:rounded-md"
        >
          Skip to content
        </a>
        <Navigation />
        <main id="main">{children}</main>
        <Footer />
        <CustomCursor />
        <Analytics />
      </body>
    </html>
  );
}

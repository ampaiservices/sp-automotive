import {
  Anton,
  Big_Shoulders,
  Hanken_Grotesk,
  Michroma,
  Outfit,
  Saira_Extra_Condensed,
  Saira_Semi_Condensed,
  Yellowtail,
} from "next/font/google";
import { Metadata } from "next";
import Navigation from "@/components/nav/Navigation";
import Footer from "@/components/footer/Footer";
import Analytics from "@/components/analytics/Analytics";
import LocalBusinessJsonLd from "@/components/seo/LocalBusinessJsonLd";
import SmoothScroll from "@/components/effects/SmoothScroll";
import { SITE_NAME, SITE_URL, TAGLINE } from "@/lib/site";
import "./globals.css";

// Anton is a free near-equivalent to Druk Wide Heavy. Single weight, no
// italic, no variable axes — globals.css strips italic + opsz/SOFT
// font-variation-settings to match.
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

// Hanken Grotesk — body / editorial / mono surfaces site-wide. Anton stays
// for display headlines (the cinematic Druk identity). See globals.css
// "Type Families" comment for the full role split. Three weights: 400 body,
// 500 labels/medium, 600 emphasis.
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hanken",
  display: "swap",
});

// Per-brand wordmark approximations for BrandShowcaseStrip. Each font is a
// free Google Fonts stand-in for that brand's proprietary identity face —
// nothing else in the site uses these, so single-weight + display:swap keeps
// the marginal payload small.
const lamboFont = Big_Shoulders({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-lambo",
  display: "swap",
});
const mclarenFont = Michroma({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mclaren",
  display: "swap",
});
const audiFont = Outfit({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-audi",
  display: "swap",
});
const bmwFont = Saira_Semi_Condensed({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-bmw",
  display: "swap",
});
const ferrariFont = Yellowtail({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-ferrari",
  display: "swap",
});
const porscheFont = Saira_Extra_Condensed({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-porsche",
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
    <html
      lang="en"
      className={`${anton.variable} ${hanken.variable} ${lamboFont.variable} ${mclarenFont.variable} ${audiFont.variable} ${bmwFont.variable} ${ferrariFont.variable} ${porscheFont.variable}`}
    >
      <head>
        <LocalBusinessJsonLd />
        {/* Preload the home-page hero poster — it's the LCP candidate behind
            hero + chapter 01. The video element streams on its own. */}
        <link rel="preload" as="image" href="/hero-clips/total-loss-poster.jpg" fetchPriority="high" />
      </head>
      <body className="text-bone font-body antialiased film-grain">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-bone focus:text-ink focus:font-body focus:text-sm focus:uppercase focus:tracking-[0.18em] focus:rounded-md"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <Navigation />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

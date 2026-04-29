import { Anton, Inter } from "next/font/google";
import { Metadata } from "next";
import LenisProvider from "@/components/providers/LenisProvider";
import Navigation from "@/components/nav/Navigation";
import Footer from "@/components/footer/Footer";
import Analytics from "@/components/analytics/Analytics";
import LocalBusinessJsonLd from "@/components/seo/LocalBusinessJsonLd";
import CustomCursor from "@/components/effects/CustomCursor";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { FRAMES } from "@/lib/hero-frames";
import "./globals.css";

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s — ${SITE_NAME}` },
  description: "Factory-grade collision repair for exotic cars. Lamborghini, McLaren, Audi R8, BMW. Sarasota, FL.",
  openGraph: {
    title: SITE_NAME,
    description: "Factory-grade collision repair for exotic cars. Sarasota, FL.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: { card: "summary_large_image", title: SITE_NAME, description: "Factory-grade collision repair for exotic cars." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable}`}>
      <head>
        <LocalBusinessJsonLd />
        {FRAMES.slice(0, 3).map((src) => (
          <link key={src} rel="preload" as="image" href={src} />
        ))}
      </head>
      <body className="bg-bg text-text font-body antialiased">
        <LenisProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
        <CustomCursor />
        <Analytics />
      </body>
    </html>
  );
}

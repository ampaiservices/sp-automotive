import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SP Automotive — Collision Repair",
  description:
    "We work directly with your insurance company so you don't have to. Free estimates, expert collision repair.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="bg-white text-charcoal font-sans">{children}</body>
    </html>
  );
}

import { Anton, Inter } from "next/font/google";
import "./globals.css";

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata = {
  title: "SP Automotive Collision & Repair",
  description: "Factory-grade collision repair for exotic cars. Sarasota, FL.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable}`}>
      <body className="bg-bg text-text font-body antialiased">{children}</body>
    </html>
  );
}

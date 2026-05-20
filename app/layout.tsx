import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohith Ramesh — IoT & Software Builder",
  description:
    "MSc AI student in Berlin building IoT systems, embedded devices, and web applications. Looking for working student roles in software, AI, and IoT.",
  keywords: [
    "Mohith Ramesh",
    "portfolio",
    "IoT",
    "software",
    "AI",
    "Berlin",
    "working student",
    "embedded systems",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-[#090a0f] text-[#e2e8f0] antialiased">{children}</body>
    </html>
  );
}

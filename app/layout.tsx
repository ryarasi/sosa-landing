import type { Metadata } from "next";
import { Orbitron, Exo_2, Rajdhani } from "next/font/google";
import "./globals.css";
import ClarityScript from "@/components/ClarityScript";
import CookieConsentBanner from "@/components/CookieConsentBanner";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const exo2 = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo2",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  variable: "--font-rajdhani",
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SoSA - Society of Societal Architects | Decentralized Think Tank",
  description: "Incorruptible research through decentralized governance. Join the Society of Societal Architects in architecting society's future.",
  keywords: "decentralized, think tank, research, governance, society, architecture, policy",
  authors: [{ name: "Society of Societal Architects" }],
  openGraph: {
    title: "SoSA - Society of Societal Architects",
    description: "Incorruptible research through decentralized governance.",
    url: "https://sosa.live",
    siteName: "SoSA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SoSA - Society of Societal Architects",
    description: "Incorruptible research through decentralized governance.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${exo2.variable} ${rajdhani.variable}`}>
      <body className="font-exo2 bg-sosa-dark text-sosa-light antialiased">
        {children}
        <CookieConsentBanner />
        <ClarityScript />
      </body>
    </html>
  );
}

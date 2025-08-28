import type { Metadata } from "next";
import "./globals.css";
import ClarityScript from "@/components/ClarityScript";
import CookieConsentBanner from "@/components/CookieConsentBanner";

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
    <html lang="en">
      <body className="bg-black text-white antialiased">
        {children}
        <CookieConsentBanner />
        <ClarityScript />
      </body>
    </html>
  );
}

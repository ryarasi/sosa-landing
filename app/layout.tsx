import type { Metadata } from "next";
import { Orbitron, Exo_2, Rajdhani } from "next/font/google";
import "./globals.css";
import Script from "next/script";

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
        {/* Microsoft Clarity */}
        <Script
          id="clarity-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "sybdnytrky");
            `,
          }}
        />
      </body>
    </html>
  );
}

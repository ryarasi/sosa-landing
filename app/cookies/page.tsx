import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cookie Policy | SoSA",
  description: "Cookie Policy for the Society of Societal Architects",
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sosa-dark to-black">
      <Navigation />
      
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-4xl font-orbitron font-bold text-sosa-gold mb-8">
          Cookie Policy
        </h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-sosa-light/70 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-rajdhani font-semibold text-sosa-light mb-4">
              What Are Cookies?
            </h2>
            <p className="text-sosa-light/80">
              Cookies are small text files that are placed on your device when you visit a website. They help 
              websites function properly, remember your preferences, and understand how you interact with the site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-rajdhani font-semibold text-sosa-light mb-4">
              How We Use Cookies
            </h2>
            <p className="text-sosa-light/80 mb-4">
              SoSA uses cookies to:
            </p>
            <ul className="list-disc pl-6 text-sosa-light/80 space-y-2">
              <li>Remember your cookie consent preferences</li>
              <li>Analyze how visitors use our website (with your consent)</li>
              <li>Improve website performance and user experience</li>
              <li>Ensure the security and integrity of our services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-rajdhani font-semibold text-sosa-light mb-4">
              Types of Cookies We Use
            </h2>
            
            <div className="space-y-6">
              <div className="bg-sosa-card p-6 rounded-lg border border-sosa-border">
                <h3 className="text-lg font-medium text-sosa-gold mb-2">
                  Necessary Cookies
                </h3>
                <p className="text-sosa-light/80 mb-3">
                  These cookies are essential for the website to function. They cannot be disabled.
                </p>
                <ul className="space-y-2 text-sm text-sosa-light/70">
                  <li>
                    <strong>sosa_cookie_consent</strong> - Stores your cookie preferences (365 days)
                  </li>
                </ul>
              </div>

              <div className="bg-sosa-card p-6 rounded-lg border border-sosa-border">
                <h3 className="text-lg font-medium text-sosa-gold mb-2">
                  Analytics Cookies
                </h3>
                <p className="text-sosa-light/80 mb-3">
                  These cookies help us understand website usage. We only use them with your consent.
                </p>
                <ul className="space-y-2 text-sm text-sosa-light/70">
                  <li>
                    <strong>Microsoft Clarity</strong> - Session recordings and heatmaps
                    <ul className="ml-4 mt-1 space-y-1">
                      <li>• _clck: User ID and preferences (1 year)</li>
                      <li>• _clsk: Session ID (1 day)</li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div className="bg-sosa-card p-6 rounded-lg border border-sosa-border">
                <h3 className="text-lg font-medium text-sosa-gold mb-2">
                  Marketing Cookies
                </h3>
                <p className="text-sosa-light/80">
                  We do not currently use marketing cookies on our website.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-rajdhani font-semibold text-sosa-light mb-4">
              Managing Your Cookie Preferences
            </h2>
            <p className="text-sosa-light/80 mb-4">
              You can manage your cookie preferences:
            </p>
            <ul className="list-disc pl-6 text-sosa-light/80 space-y-2">
              <li>Through our cookie consent banner when you visit the site</li>
              <li>By clearing your browser cookies (this will reset your preferences)</li>
              <li>Through your browser settings (may affect website functionality)</li>
            </ul>
            <p className="text-sosa-light/80 mt-4">
              <strong>For EU/UK/Switzerland visitors:</strong> We will ask for your explicit consent before 
              using any analytics cookies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-rajdhani font-semibold text-sosa-light mb-4">
              Your Rights
            </h2>
            <ul className="list-disc pl-6 text-sosa-light/80 space-y-2">
              <li>Withdraw consent at any time</li>
              <li>Access information about our cookie usage</li>
              <li>Request deletion of data collected through cookies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-rajdhani font-semibold text-sosa-light mb-4">
              Browser Cookie Settings
            </h2>
            <p className="text-sosa-light/80 mb-4">
              Manage cookies through your browser:
            </p>
            <ul className="list-disc pl-6 text-sosa-light/80 space-y-2">
              <li>
                <a href="https://support.google.com/chrome/answer/95647" 
                   className="text-sosa-gold hover:text-sosa-light"
                   target="_blank" rel="noopener noreferrer">
                  Google Chrome
                </a>
              </li>
              <li>
                <a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" 
                   className="text-sosa-gold hover:text-sosa-light"
                   target="_blank" rel="noopener noreferrer">
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" 
                   className="text-sosa-gold hover:text-sosa-light"
                   target="_blank" rel="noopener noreferrer">
                  Safari
                </a>
              </li>
              <li>
                <a href="https://support.microsoft.com/en-us/help/4027947/microsoft-edge-delete-cookies" 
                   className="text-sosa-gold hover:text-sosa-light"
                   target="_blank" rel="noopener noreferrer">
                  Microsoft Edge
                </a>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-rajdhani font-semibold text-sosa-light mb-4">
              Contact Us
            </h2>
            <p className="text-sosa-light/80">
              For questions about our cookie usage:
            </p>
            <p className="text-sosa-light/80 mt-2">
              Email: <a href="mailto:privacy@sosa.live" className="text-sosa-gold hover:text-sosa-light">privacy@sosa.live</a>
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
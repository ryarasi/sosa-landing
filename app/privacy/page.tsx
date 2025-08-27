import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | SoSA",
  description: "Privacy Policy for the Society of Societal Architects",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sosa-dark to-black">
      <Navigation />
      
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-4xl font-orbitron font-bold text-sosa-gold mb-8">
          Privacy Policy
        </h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-sosa-light/70 mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-rajdhani font-semibold text-sosa-light mb-4">
              Introduction
            </h2>
            <p className="text-sosa-light/80">
              The Society of Societal Architects (&quot;SoSA&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting 
              your privacy. This Privacy Policy explains how we collect, use, and protect information when you 
              visit our website sosa.live (&quot;the Website&quot;).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-rajdhani font-semibold text-sosa-light mb-4">
              Information We Collect
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-sosa-light mb-2">
                  Information You Provide
                </h3>
                <ul className="list-disc pl-6 text-sosa-light/80 space-y-2">
                  <li>Email address when you join our waitlist</li>
                  <li>Any information you provide through contact forms</li>
                  <li>Communications you send to us</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-sosa-light mb-2">
                  Information Automatically Collected
                </h3>
                <ul className="list-disc pl-6 text-sosa-light/80 space-y-2">
                  <li>Usage data through Microsoft Clarity (with your consent)</li>
                  <li>Technical information such as browser type and device information</li>
                  <li>Cookies and similar technologies as described in our <Link href="/cookies" className="text-sosa-gold hover:text-sosa-light">Cookie Policy</Link></li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-rajdhani font-semibold text-sosa-light mb-4">
              How We Use Your Information
            </h2>
            <ul className="list-disc pl-6 text-sosa-light/80 space-y-2">
              <li>To notify you about SoSA updates and opportunities</li>
              <li>To respond to your inquiries</li>
              <li>To improve our website and services</li>
              <li>To analyze website usage and performance (with your consent)</li>
              <li>To comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-rajdhani font-semibold text-sosa-light mb-4">
              Analytics and Cookies
            </h2>
            <p className="text-sosa-light/80 mb-4">
              We use Microsoft Clarity to understand how visitors interact with our website. This helps us 
              improve user experience and our services.
            </p>
            <p className="text-sosa-light/80 mb-4">
              For users in the European Economic Area, United Kingdom, and Switzerland, we only use analytics 
              cookies with your explicit consent. You can manage your cookie preferences at any time through 
              our cookie consent banner or by visiting our <Link href="/cookies" className="text-sosa-gold hover:text-sosa-light">Cookie Policy</Link>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-rajdhani font-semibold text-sosa-light mb-4">
              Your Rights
            </h2>
            <p className="text-sosa-light/80 mb-4">
              Depending on your location, you may have certain rights regarding your personal information:
            </p>
            <ul className="list-disc pl-6 text-sosa-light/80 space-y-2">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate data</li>
              <li>Deletion of your data</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
              <li>Withdrawal of consent</li>
              <li>Objection to processing</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-rajdhani font-semibold text-sosa-light mb-4">
              Data Security
            </h2>
            <p className="text-sosa-light/80">
              We implement appropriate technical and organizational measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. However, no method of 
              transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-rajdhani font-semibold text-sosa-light mb-4">
              Contact Information
            </h2>
            <p className="text-sosa-light/80">
              If you have questions about this Privacy Policy or your personal information, please contact us at:
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
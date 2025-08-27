"use client";

import { useState, useEffect } from 'react';
import { useCookieConsent } from '@/app/hooks/useCookieConsent';
import Link from 'next/link';

export default function CookieConsentBanner() {
  const { showBanner, acceptAll, acceptEssential, acceptCustom } = useCookieConsent();
  const [mounted, setMounted] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !showBanner) {
    return null;
  }

  const handleSavePreferences = () => {
    acceptCustom(preferences);
    setShowDetails(false);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-sosa-dark/95 backdrop-blur-md border-t border-sosa-border">
      <div className="container mx-auto max-w-7xl">
        {!showDetails ? (
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sosa-light text-sm md:text-base">
              <p>
                We use cookies to enhance your experience and analyze our traffic. 
                By clicking &quot;Accept All&quot;, you consent to our use of cookies. 
                Read our{' '}
                <Link href="/privacy" className="text-sosa-gold hover:text-sosa-light underline">
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link href="/cookies" className="text-sosa-gold hover:text-sosa-light underline">
                  Cookie Policy
                </Link>.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={acceptAll}
                className="px-6 py-2 bg-sosa-gold text-sosa-dark font-semibold rounded hover:bg-sosa-light transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={acceptEssential}
                className="px-6 py-2 bg-sosa-card text-sosa-light font-semibold rounded border border-sosa-border hover:bg-sosa-border transition-colors"
              >
                Essential Only
              </button>
              <button
                onClick={() => setShowDetails(true)}
                className="px-6 py-2 text-sosa-light font-semibold rounded border border-sosa-border hover:bg-sosa-card transition-colors"
              >
                Customize
              </button>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-sosa-light mb-4">Cookie Preferences</h3>
            
            <div className="space-y-4">
              {/* Necessary Cookies */}
              <div className="bg-sosa-card p-4 rounded-lg border border-sosa-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-sosa-light">Necessary Cookies</h4>
                    <p className="text-sm text-sosa-light/70 mt-1">
                      These cookies are essential for the website to function properly.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="w-5 h-5 cursor-not-allowed opacity-50"
                  />
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="bg-sosa-card p-4 rounded-lg border border-sosa-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-sosa-light">Analytics Cookies</h4>
                    <p className="text-sm text-sosa-light/70 mt-1">
                      Help us understand how visitors interact with our website using Microsoft Clarity.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                    className="w-5 h-5 cursor-pointer"
                  />
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="bg-sosa-card p-4 rounded-lg border border-sosa-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-sosa-light">Marketing Cookies</h4>
                    <p className="text-sm text-sosa-light/70 mt-1">
                      Used to track visitors across websites for marketing purposes.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
                    className="w-5 h-5 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 mt-6">
              <button
                onClick={() => setShowDetails(false)}
                className="px-6 py-2 text-sosa-light font-semibold rounded border border-sosa-border hover:bg-sosa-card transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-6 py-2 bg-sosa-gold text-sosa-dark font-semibold rounded hover:bg-sosa-light transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
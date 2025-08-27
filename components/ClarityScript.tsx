"use client";

import { useEffect } from 'react';
import Script from 'next/script';
import { hasConsent } from '@/app/hooks/useCookieConsent';

declare global {
  interface Window {
    clarity: (action: string, ...args: unknown[]) => void;
  }
}

export default function ClarityScript() {
  const shouldLoadClarity = hasConsent('analytics');

  useEffect(() => {
    // Listen for consent updates
    const handleConsentUpdate = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { preferences } = customEvent.detail;
      
      if (preferences.analytics && window.clarity) {
        window.clarity('consent');
      }
    };

    window.addEventListener('consentUpdated', handleConsentUpdate);
    return () => {
      window.removeEventListener('consentUpdated', handleConsentUpdate);
    };
  }, []);

  if (!shouldLoadClarity) {
    return null;
  }

  return (
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
        `
      }}
      onLoad={() => {
        if (window.clarity) {
          window.clarity('consent');
        }
      }}
    />
  );
}
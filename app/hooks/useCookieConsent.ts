"use client";

import { useState, useEffect } from 'react';

// Cookie consent types
export type ConsentType = 'necessary' | 'analytics' | 'marketing';

export interface ConsentPreferences {
  necessary: boolean; // Always true - required cookies
  analytics: boolean;
  marketing: boolean;
}

export interface ConsentState {
  hasConsented: boolean;
  preferences: ConsentPreferences;
  consentDate: string | null;
}

// Storage keys
const CONSENT_KEY = 'sosa_cookie_consent';
const CONSENT_EXPIRY_DAYS = 365;

// Check if user is in EU/UK/Switzerland
export const isEUUser = (): boolean => {
  // Return false during SSR
  if (typeof window === 'undefined') {
    return false;
  }
  
  // Check for simulation flag first (for testing)
  if (localStorage.getItem('sosa_simulate_eu') === 'true') {
    return true;
  }
  
  // This is a simplified check. In production, you might want to use a geolocation API
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const euTimezones = [
    'Europe/',
    'GB',
    'GMT',
    'BST',
    'WET',
    'CET',
    'EET',
    'MET',
  ];
  
  return euTimezones.some((tz) => timezone.includes(tz));
};

// Get stored consent
export const getStoredConsent = (): ConsentState | null => {
  // Return null during SSR
  if (typeof window === 'undefined') {
    return null;
  }
  
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return null;

    const consent = JSON.parse(stored) as ConsentState;
    const consentDate = new Date(consent.consentDate || '');
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() - CONSENT_EXPIRY_DAYS);

    // Check if consent has expired
    if (consentDate < expiryDate) {
      localStorage.removeItem(CONSENT_KEY);
      return null;
    }

    return consent;
  } catch (error) {
    console.error('Error reading consent:', error);
    return null;
  }
};

// Save consent preferences
export const saveConsent = (preferences: ConsentPreferences): void => {
  // Return early during SSR
  if (typeof window === 'undefined') {
    return;
  }
  
  const consent: ConsentState = {
    hasConsented: true,
    preferences: {
      ...preferences,
      necessary: true, // Always true
    },
    consentDate: new Date().toISOString(),
  };

  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  
  // Dispatch custom event for other parts of the app to react
  window.dispatchEvent(
    new CustomEvent('consentUpdated', { detail: consent })
  );
};

// Revoke consent
export const revokeConsent = (): void => {
  // Return early during SSR
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.removeItem(CONSENT_KEY);
  
  // Clear any analytics cookies
  clearAnalyticsCookies();
  
  // Dispatch event
  window.dispatchEvent(
    new CustomEvent('consentRevoked')
  );
  
  // Reload page to ensure all tracking is stopped
  window.location.reload();
};

// Check if a specific consent type is granted
export const hasConsent = (type: ConsentType): boolean => {
  const consent = getStoredConsent();
  if (!consent) return false;
  
  return consent.preferences[type] === true;
};

// Clear analytics cookies
const clearAnalyticsCookies = (): void => {
  // Return early during SSR
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }
  
  // Clear Microsoft Clarity cookies
  const cookies = document.cookie.split(';');
  
  for (const cookie of cookies) {
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
    
    // Clear cookies that might be from analytics services
    if (
      name.includes('_clck') || // Clarity
      name.includes('_clsk') || // Clarity
      name.includes('_ga') ||   // Google Analytics
      name.includes('_gid')     // Google Analytics
    ) {
      // Clear for current domain and parent domains
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname};`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
    }
  }
};

// Initialize consent check
export const shouldShowConsentBanner = (): boolean => {
  // Always show in EU/UK/Switzerland if no consent is stored
  if (isEUUser()) {
    return !getStoredConsent();
  }
  
  // For non-EU users, we can auto-consent to analytics
  const consent = getStoredConsent();
  if (!consent) {
    // Auto-consent for non-EU users
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: false,
    });
  }
  
  return false;
};

// Custom hook for cookie consent
export const useCookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const shouldShow = shouldShowConsentBanner();
    setShowBanner(shouldShow);
    setIsLoading(false);
  }, []);

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    });
    setShowBanner(false);
  };

  const acceptEssential = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
    });
    setShowBanner(false);
  };

  const acceptCustom = (preferences: ConsentPreferences) => {
    saveConsent(preferences);
    setShowBanner(false);
  };

  return {
    showBanner,
    isLoading,
    acceptAll,
    acceptEssential,
    acceptCustom,
    hasConsent,
    revokeConsent,
  };
};
'use client';

import { useState, FormEvent } from 'react';

const countries = [
  { value: "", label: "Select your country" },
  { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" },
  { value: "CA", label: "Canada" },
  { value: "AU", label: "Australia" },
  { value: "IN", label: "India" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "ES", label: "Spain" },
  { value: "IT", label: "Italy" },
  { value: "JP", label: "Japan" },
  { value: "KR", label: "South Korea" },
  { value: "CN", label: "China" },
  { value: "BR", label: "Brazil" },
  { value: "MX", label: "Mexico" },
  { value: "NL", label: "Netherlands" },
  { value: "SE", label: "Sweden" },
  { value: "CH", label: "Switzerland" },
  { value: "SG", label: "Singapore" },
  { value: "AE", label: "United Arab Emirates" },
  { value: "OTHER", label: "Other" },
];

export default function WaitlistForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    country: '',
    reason: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState('');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.name.length < 2) {
      newErrors.name = 'Please enter your full name';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.country) {
      newErrors.country = 'Please select your country';
    }

    if (formData.reason.length < 50) {
      newErrors.reason = 'Please provide at least 50 characters explaining your interest';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setIsSuccess(true);
    } catch (error) {
      setApiError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <h3 className="font-orbitron text-3xl mb-4 text-sosa-success tracking-wide">
          Welcome to SoSA!
        </h3>
        <p className="text-lg text-sosa-gray">
          Thank you for your interest. We&apos;ll review your application and send you an invitation soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-sosa-card border border-sosa-border p-8 rounded-2xl">
      <div className="mb-6">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-sosa-gray">
          Full Name *
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 bg-sosa-input border border-sosa-border rounded-lg text-sosa-light transition-all duration-300 focus:outline-none focus:border-sosa-accent focus:bg-white/10 focus:shadow-sm focus:shadow-white/10"
          placeholder="John Doe"
        />
        {errors.name && (
          <p className="mt-2 text-sm text-sosa-error">{errors.name}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-sosa-gray">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 bg-sosa-input border border-sosa-border rounded-lg text-sosa-light transition-all duration-300 focus:outline-none focus:border-sosa-accent focus:bg-white/10 focus:shadow-sm focus:shadow-white/10"
          placeholder="john@example.com"
        />
        {errors.email && (
          <p className="mt-2 text-sm text-sosa-error">{errors.email}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="country" className="block mb-2 text-sm font-medium text-sosa-gray">
          Country *
        </label>
        <select
          id="country"
          value={formData.country}
          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
          className="w-full px-4 py-3 bg-sosa-input border border-sosa-border rounded-lg text-sosa-light transition-all duration-300 focus:outline-none focus:border-sosa-accent focus:bg-white/10 focus:shadow-sm focus:shadow-white/10 cursor-pointer"
        >
          {countries.map((country) => (
            <option key={country.value} value={country.value} className="bg-sosa-dark">
              {country.label}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="mt-2 text-sm text-sosa-error">{errors.country}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="reason" className="block mb-2 text-sm font-medium text-sosa-gray">
          Why do you wish to join SoSA? *
        </label>
        <textarea
          id="reason"
          value={formData.reason}
          onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 bg-sosa-input border border-sosa-border rounded-lg text-sosa-light transition-all duration-300 focus:outline-none focus:border-sosa-accent focus:bg-white/10 focus:shadow-sm focus:shadow-white/10 resize-vertical min-h-[120px]"
          placeholder="Tell us about your interest in decentralized governance and how you hope to contribute to our mission... (minimum 50 characters)"
        />
        {errors.reason && (
          <p className="mt-2 text-sm text-sosa-error">{errors.reason}</p>
        )}
      </div>

      {apiError && (
        <div className="mb-6 p-4 bg-sosa-error/10 border border-sosa-error/30 rounded-lg">
          <p className="text-sm text-sosa-error">{apiError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 text-lg font-semibold bg-transparent text-sosa-accent border-2 border-sosa-accent rounded-lg transition-all duration-300 hover:bg-sosa-accent hover:text-sosa-dark hover:transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
      >
        {isSubmitting ? (
          <span className="inline-block w-5 h-5 border-3 border-sosa-accent border-t-transparent rounded-full animate-spin" />
        ) : (
          'Request Access'
        )}
      </button>
    </form>
  );
}
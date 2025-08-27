# SoSA Landing Page

Official landing page for the Society of Societal Architects (SoSA) - a decentralized think tank architecting society's future through incorruptible research and collective intelligence.

## 🏗️ Tech Stack

- **Framework**: Next.js 15.5 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Fonts**: Orbitron, Exo 2, Rajdhani
- **Analytics**: Microsoft Clarity (with consent)
- **Deployment**: Netlify

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
sosa-landing/
├── app/              # Next.js App Router pages
│   ├── api/         # API routes (waitlist)
│   ├── privacy/     # Privacy policy page
│   ├── cookies/     # Cookie policy page
│   └── page.tsx     # Home page
├── components/      # React components
├── public/          # Static assets
└── docs/            # Documentation
```

## 🍪 Cookie Consent & Privacy Compliance

### Overview
This website implements a comprehensive cookie consent management system to ensure GDPR compliance. The system is designed to meet Microsoft Clarity's requirements and must be fully compliant by October 31st, 2025.

### Features
- **Automatic EU Detection**: Detects users from EU/UK/Switzerland using timezone-based geolocation
- **Granular Consent**: Users can control analytics and marketing cookies separately
- **Microsoft Clarity Integration**: Analytics only loads after explicit user consent
- **Privacy-First Design**: Non-EU users are auto-consented to analytics only (not marketing)
- **Persistent Preferences**: Cookie choices are remembered for 365 days

### Testing Cookie Consent
To test the cookie consent banner as an EU user:
```javascript
// In browser console
localStorage.setItem('sosa_simulate_eu', 'true');
// Then refresh the page
```

### Cookie Types
- **Necessary Cookies**: Essential for website functionality (always enabled)
  - `sosa_cookie_consent`: Stores consent preferences
- **Analytics Cookies**: Microsoft Clarity for session recordings and heatmaps (requires consent)
  - Project ID: `sybdnytrky`
- **Marketing Cookies**: Currently not used

### Privacy Pages
- Privacy Policy: `/privacy`
- Cookie Policy: `/cookies`

### Implementation Details
- Consent hook in `/app/hooks/useCookieConsent.ts`
- Cookie banner component in `/components/CookieConsentBanner.tsx`
- Consent-aware Clarity script in `/components/ClarityScript.tsx`
- Footer updated with privacy links

## 🎨 Design System

### Colors
- Background: `sosa-dark` (#0A0A0A)
- Text: `sosa-light` (#FFFFFF)
- Accent: `sosa-gold` (#FFD700)
- Card: `sosa-card` (#1A1A1A)
- Border: `sosa-border` (#2A2A2A)
- Gray: `sosa-gray` (#666666)

### Typography
- Headlines: Orbitron (futuristic)
- Subheadings: Rajdhani (technical)
- Body: Exo 2 (readable)

## 🌐 Environment Variables

```env
# API Configuration (optional)
NEXT_PUBLIC_API_URL=your-api-url
```

## 📊 Analytics

Microsoft Clarity is integrated for session recordings and heatmaps. Analytics only load after user consent in EU/UK/Switzerland regions.

## 🚢 Deployment

The site is configured for Netlify deployment:

```bash
# Build command
npm run build

# Publish directory
.next
```

## 🔒 Security

- GDPR compliant cookie consent
- Privacy-first design
- No unauthorized data collection
- Secure form submissions

---

Built for the Society of Societal Architects - Incorruptible research through decentralized governance.
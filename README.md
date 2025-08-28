# SoSA - Society of Societal Architects

> *Architecting the infrastructure for human liberation through decentralized governance*

## 🏛️ What is SoSA?

The Society of Societal Architects (SoSA) is a decentralized think tank building the freedom infrastructure for unified human civilization. We are creating incorruptible research systems, physical freedom centers, and strategic advisory frameworks that enable every individual to be their own sovereign leader while coordinating effectively with others.

### Our Core Beliefs
- **Individual Sovereignty**: Technology now enables everyone to be their own sovereign leader
- **Distributed Governance**: Decentralized systems outperform centralized control
- **Information Integrity**: Truth emerges from transparent processes, not authorities
- **Aligned Incentives**: Individual benefit can perfectly align with collective progress

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/ryarasi/sosa-landing.git
cd sosa-landing

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

Open [http://localhost:3000](http://localhost:3000) to experience the claims-based navigation system.

## 🏗️ Architecture

### Technology Stack
- **Framework**: Next.js 15.5 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Fonts**: JetBrains Mono (claims), Orbitron & Exo 2 (UI)
- **Analytics**: Microsoft Clarity (with consent)
- **Deployment**: Optimized for Vercel/Netlify

### Key Components
- **Claims System**: Interactive navigation through 80 interconnected claims about freedom and sovereignty
- **Learn More Modal**: Onboarding flow for new architects with Discord invite
- **Login System**: Member authentication for sovereign spaces
- **Globe Background**: Visual representation of global coordination

## 📁 Project Structure

```
sosa-landing/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── learn-more/    # Discord invite flow
│   │   ├── auth/login/    # Member authentication
│   │   └── waitlist/      # Legacy waitlist
│   ├── privacy/           # Privacy policy
│   ├── cookies/           # Cookie policy
│   └── page.tsx           # Homepage with claims
├── components/            # React components
│   ├── ClaimsViewer.tsx   # Main claims navigation
│   ├── LearnMoreModal.tsx # Onboarding modal
│   ├── LoginModal.tsx     # Authentication modal
│   └── ...                # Other components
├── public/
│   └── claims.json        # Claims data structure
└── docs/                  # Vision & documentation
    ├── vision.md          # Core philosophy
    └── manifest.md        # Implementation details
```

## 📚 Documentation

Explore our vision and implementation details:
- [Vision Document](docs/vision.md) - Our mission and philosophical foundation
- [Implementation Manifest](docs/manifest.md) - Technical blueprint for decentralized governance
- [Contributing Guide](CONTRIBUTING.md) - How to join the architecture of freedom

## 🎨 Design System

### Colors
- Background: `sosa-dark` (#0A0A0A)
- Text: `sosa-light` (#FFFFFF)
- Accent: `sosa-accent` (#00FF88)
- Gold: `sosa-gold` (#FFD700)
- Card: `sosa-card` (#1A1A1A)
- Border: `sosa-border` (#2A2A2A)

### Typography
- Claims: JetBrains Mono (monospace)
- Headlines: Orbitron (futuristic)
- Subheadings: Rajdhani (technical)
- Body: Exo 2 (readable)

## 🤝 Contributing

We welcome sovereign individuals who want to co-architect the future of human coordination. See our [Contributing Guide](CONTRIBUTING.md) for details on:
- Understanding our vision
- Code standards and practices
- Submitting pull requests
- Community guidelines

## 🔐 Privacy & Cookie Consent

This website implements comprehensive cookie consent management for GDPR compliance:
- **Automatic EU/UK/Switzerland detection** using timezone-based geolocation
- **Granular consent controls** for analytics and marketing cookies
- **Microsoft Clarity integration** (analytics only with explicit consent)
- **Privacy-first design** with 365-day preference persistence

### Testing Cookie Consent
```javascript
// Simulate EU user in browser console
localStorage.setItem('sosa_simulate_eu', 'true');
// Then refresh the page
```

### Cookie Implementation
- Consent hook: `/app/hooks/useCookieConsent.ts`
- Banner component: `/components/CookieConsentBanner.tsx`
- Clarity integration: `/components/ClarityScript.tsx`
- Privacy pages: `/privacy` and `/cookies`

## 🌍 Deployment

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ryarasi/sosa-landing)

### Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/ryarasi/sosa-landing)

### Environment Variables
Create a `.env.local` file:
```env
# API endpoints (optional)
NEXT_PUBLIC_API_URL=your-api-url
DISCORD_WEBHOOK_URL=your-discord-webhook
DATABASE_URL=your-database-connection
```

## 📊 Success Metrics

We measure success through freedom indicators:
- **Attraction of Freedom Seekers**: Recognition by those yearning for sovereignty
- **Sovereignty Expansion**: Lives transitioning from trapped existence to sovereign living
- **Government Evolution**: Policies reflecting our strategic advice
- **Information Integrity**: Global ecosystem becoming more truthful
- **Contribution Recognition**: Genuine value creators being rewarded

## 🔗 Links

- **Live Site**: [sosa.live](https://sosa.live)
- **Discord**: Join via Learn More on the website
- **GitHub**: [github.com/ryarasi/sosa-landing](https://github.com/ryarasi/sosa-landing)

## 📄 License

This project is open source under the [MIT License](LICENSE). Fork it, improve it, make it yours - that's the path to distributed liberation.

---

**Every line of code is a declaration of independence.**

*Welcome to your sovereignty.*
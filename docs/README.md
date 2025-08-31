# Society of Societal Architects (SoSA)

## Overview

The Society of Societal Architects exists to architect a better future for humanity through incorruptible research and decentralized governance. We are building the infrastructure for trustworthy policy recommendations that serve the collective good rather than special interests.

## 🎯 Mission & Vision

### Our Purpose
SoSA is a decentralized think tank designed to maximize the collaborative efficiency of all those who aspire to build a prosperous future. What makes SoSA unique is that every aspect of the functioning of SoSA is transparent and no central authority decides the course of our enquiry or the outcomes of our research.

### The Problem We Solve
Traditional think tanks and policy research institutions face inherent conflicts:
- **Funding Bias**: Research outcomes influenced by sponsors
- **Opacity**: Decision-making processes hidden from public view
- **Centralization**: Power concentrated in few hands
- **Misalignment**: Research priorities disconnected from societal needs

### Our Solution
SoSA introduces a revolutionary approach to policy research through:

1. **Decentralized Governance** - No single entity controls research direction
2. **Radical Transparency** - All funding sources and methodologies publicly disclosed
3. **Impact-First Design** - Research topics chosen by societal need
4. **Global Accessibility** - Enabling worldwide participation in governance

## 🏗️ Technical Architecture

### Current Implementation
- **Framework**: Next.js 15.5 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Fonts**: JetBrains Mono (claims), Orbitron & Exo 2 (UI)
- **Analytics**: Microsoft Clarity (with consent)
- **Deployment**: Optimized for Vercel/Netlify

### Key Components
- **Claims System**: Interactive navigation through interconnected claims about freedom and sovereignty
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
```

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

## 📋 Core Principles

### Independence
No single sponsor or interest group can influence our research. Decisions are made collectively through transparent governance mechanisms.

### Transparency
All research methodologies, funding sources, and decision processes are publicly accessible. Our algorithms and data are open for scrutiny.

### Impact
We focus on research that creates measurable societal benefit. Every project must demonstrate clear pathways to positive real-world outcomes.

### Global Accessibility
If SoSA only works for the privileged, we have failed. The farmer in Bangladesh must have the same sovereignty as the banker in Zurich.

## 🌍 Our Vision

### The Future We're Building
A world where:
- Policy recommendations serve humanity's collective interests
- Research integrity is guaranteed by design, not trust
- Every voice can contribute to shaping society
- Transparency replaces backroom deals
- Coordination supersedes competition

### Success Metrics
We measure success not by traditional metrics but by freedom indicators:
- **Attraction of Freedom Seekers**: Do people who yearn for freedom recognize SoSA as their path?
- **Sovereignty Expansion**: How many people have transitioned from trapped existence to sovereign living?
- **Government Evolution**: How many policies worldwide reflect our strategic advice?
- **Information Integrity**: Is the global information ecosystem more truthful because of our infrastructure?

## 🤝 Join Our Mission

The Society of Societal Architects is more than a think tank—it's a movement to fundamentally reshape how humanity makes collective decisions. We invite researchers, policymakers, technologists, and citizens to join us in building this future.

Together, we architect tomorrow.

## 📚 Additional Documentation

- **[Roadmap.md](./Roadmap.md)** - Detailed development roadmap and implementation plans

## 🤝 Contributing

This project is part of the SoSA initiative to create transparent, incorruptible research infrastructure. Contributions should align with our core principles of independence, transparency, and impact.

## 📝 License

The SoSA project operates under principles of open governance and transparent operations. Specific licensing details are available in the project repository.
import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'sosa-dark': '#0A0A0A',
        'sosa-light': '#FFFFFF',
        'sosa-gray': '#B3B3B3',
        'sosa-accent': '#FFFFFF',
        'sosa-border': 'rgba(255, 255, 255, 0.2)',
        'sosa-card': 'rgba(255, 255, 255, 0.03)',
        'sosa-input': 'rgba(255, 255, 255, 0.08)',
        'sosa-error': '#FF5555',
        'sosa-success': '#00FF88',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'exo2': ['Exo 2', 'sans-serif'],
        'rajdhani': ['Rajdhani', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
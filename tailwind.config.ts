import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // iOS System Colors
        ios: {
          blue: 'var(--ios-blue)',
          green: 'var(--ios-green)',
          orange: 'var(--ios-orange)',
          red: 'var(--ios-red)',
          purple: 'var(--ios-purple)',
          teal: 'var(--ios-teal)',
          indigo: 'var(--ios-indigo)',
          pink: 'var(--ios-pink)',
          yellow: 'var(--ios-yellow)',
          mint: 'var(--ios-mint)',
        },
        // Dynamic mode backgrounds
        surface: {
          primary: 'var(--background)',
          secondary: 'var(--background-secondary)',
          tertiary: 'var(--background-tertiary)',
          elevated: 'var(--background-elevated)',
          grouped: 'var(--background)',
          'grouped-secondary': 'var(--background-secondary)',
        },
        // Text colors
        label: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          quaternary: 'var(--text-quaternary)',
        },
        // Fills
        fill: {
          primary: 'var(--fill-primary)',
          secondary: 'var(--fill-secondary)',
          tertiary: 'var(--fill-tertiary)',
          quaternary: 'var(--fill-quaternary)',
        },
        // Separators
        separator: {
          DEFAULT: 'var(--separator)',
          opaque: 'var(--separator-opaque)',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'monospace'],
        display: ['Outfit', '-apple-system', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'ios': '14px',
        'ios-lg': '18px',
        'ios-xl': '22px',
        'ios-2xl': '26px',
      },
      animation: {
        'ios-spring': 'ios-spring 0.5s cubic-bezier(0.28, 0.84, 0.42, 1)',
        'ios-fade-in': 'ios-fade-in 0.35s ease-out',
        'ios-slide-up': 'ios-slide-up 0.45s cubic-bezier(0.28, 0.84, 0.42, 1)',
        'ios-scale': 'ios-scale 0.3s cubic-bezier(0.28, 0.84, 0.42, 1)',
        'float': 'float 8s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        'ios-spring': {
          '0%': { transform: 'scale(0.92)', opacity: '0' },
          '60%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'ios-fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'ios-slide-up': {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'ios-scale': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.8' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'ios': '0 2px 10px rgba(0, 0, 0, 0.12)',
        'ios-md': '0 4px 20px rgba(0, 0, 0, 0.2)',
        'ios-lg': '0 8px 40px rgba(0, 0, 0, 0.3)',
        'ios-xl': '0 16px 60px rgba(0, 0, 0, 0.4)',
        'ios-inner': 'inset 0 1px 2px rgba(0, 0, 0, 0.2)',
      },
      spacing: {
        'ios-xs': '4px',
        'ios-sm': '8px',
        'ios-md': '12px',
        'ios-base': '16px',
        'ios-lg': '20px',
        'ios-xl': '24px',
        'ios-2xl': '32px',
        'ios-3xl': '40px',
      },
    },
  },
  plugins: [],
};
export default config;

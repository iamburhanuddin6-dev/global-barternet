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
          blue: '#007AFF',
          green: '#34C759',
          orange: '#FF9500',
          red: '#FF3B30',
          purple: '#AF52DE',
          teal: '#5AC8FA',
          indigo: '#5856D6',
          pink: '#FF2D55',
          yellow: '#FFD60A',
          mint: '#00C7BE',
        },
        // Dark mode backgrounds
        surface: {
          primary: '#000000',
          secondary: '#1C1C1E',
          tertiary: '#2C2C2E',
          elevated: '#1C1C1E',
          grouped: '#000000',
          'grouped-secondary': '#1C1C1E',
        },
        // Text colors
        label: {
          primary: '#FFFFFF',
          secondary: '#8E8E93',
          tertiary: '#636366',
          quaternary: '#48484A',
        },
        // Fills
        fill: {
          primary: 'rgba(120, 120, 128, 0.36)',
          secondary: 'rgba(120, 120, 128, 0.24)',
          tertiary: 'rgba(120, 120, 128, 0.18)',
          quaternary: 'rgba(120, 120, 128, 0.12)',
        },
        // Separators
        separator: {
          DEFAULT: 'rgba(84, 84, 88, 0.36)',
          opaque: '#38383A',
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

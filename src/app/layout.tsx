import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";
import { Web3ConfigProvider } from "@/lib/web3-config";

import ThemeManager from "@/components/ThemeManager";

export const metadata: Metadata = {
  title: "Global BarterNet — AI-Mediated Blockchain Resource Exchange",
  description: "Where AI Meets Blockchain to Create a Post-Currency Economy. Trade resources, knowledge, and services with autonomous AI agents backed by blockchain trust.",
  keywords: ["barter", "blockchain", "AI", "exchange", "decentralized", "Web3", "trading", "resources"],
  openGraph: {
    title: "Global BarterNet",
    description: "AI-Mediated Blockchain Resource Exchange Platform",
    type: "website",
  },
};

import { Viewport } from "next";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      {/* We use global css variables applied dynamically to control body bg and text color */}
      <body className="antialiased font-sans bg-background text-text-primary min-h-screen transition-colors duration-700">
        <Providers>
          <ThemeManager />
          <Web3ConfigProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: 'var(--background-elevated)',
                  color: 'var(--text-primary)',
                  borderRadius: '14px',
                  border: '0.5px solid var(--liquid-glass-border)',
                  fontSize: '14px',
                },
                success: { iconTheme: { primary: 'var(--ios-green)', secondary: '#fff' } },
                error: { iconTheme: { primary: 'var(--ios-red)', secondary: '#fff' } },
              }}
            />
          </Web3ConfigProvider>
        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";
import { Web3ConfigProvider } from "@/lib/web3-config";

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
      <body className="antialiased font-sans bg-black text-white min-h-screen">
        <Providers>
          <Web3ConfigProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: '#1C1C1E',
                  color: '#fff',
                  borderRadius: '14px',
                  border: '0.5px solid rgba(255,255,255,0.1)',
                  fontSize: '14px',
                },
                success: { iconTheme: { primary: '#34C759', secondary: '#fff' } },
                error: { iconTheme: { primary: '#FF3B30', secondary: '#fff' } },
              }}
            />
          </Web3ConfigProvider>
        </Providers>
      </body>
    </html>
  );
}

'use client';

import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useBarterStore } from '@/store/barterStore';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import DashboardPage from '@/components/dashboard/DashboardPage';
import ExchangePage from '@/components/exchange/ExchangePage';
import AIAgentsPage from '@/components/agents/AIAgentsPage';
import AnalyticsPage from '@/components/analytics/AnalyticsPage';
import ReputationPage from '@/components/reputation/ReputationPage';
import BlockchainPage from '@/components/blockchain/BlockchainPage';
import TradesPage from '@/components/trades/TradesPage';
import ResourcesPage from '@/components/resources/ResourcesPage';
import SettingsPage from '@/components/settings/SettingsPage';
import { Loader2 } from 'lucide-react';

const ParticleField = dynamic(
  () => import('@/components/effects/ParticleField'),
  { ssr: false }
);

function PageContent() {
  const { activeTab } = useBarterStore();

  switch (activeTab) {
    case 'dashboard':
      return <DashboardPage />;
    case 'exchange':
      return <ExchangePage />;
    case 'resources':
      return <ResourcesPage />;
    case 'trades':
      return <TradesPage />;
    case 'ai-agents':
      return <AIAgentsPage />;
    case 'analytics':
      return <AnalyticsPage />;
    case 'reputation':
      return <ReputationPage />;
    case 'blockchain':
      return <BlockchainPage />;
    case 'settings':
      return <SettingsPage />;
    default:
      return <DashboardPage />;
  }
}

export default function Home() {
  const { sidebarOpen } = useBarterStore();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center ios-ambient">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-ios-blue animate-spin" />
          <p className="text-[#8E8E93] text-[15px]">Loading BarterNet...</p>
        </div>
      </div>
    );
  }

  // Don't render app until authenticated
  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Subtle ambient background */}
      <ParticleField />
      <div className="fixed inset-0 ios-ambient pointer-events-none z-[1]" />

      {/* Layout */}
      <div className="relative z-10 flex">
        <Sidebar />
        <main
          className="flex-1 transition-all duration-300 ease-[cubic-bezier(0.28,0.84,0.42,1)]"
          style={{ marginLeft: sidebarOpen ? 260 : 72 }}
        >
          <Header />
          <div className="px-6 py-5 max-w-[1600px] mx-auto">
            <PageContent />
          </div>
        </main>
      </div>
    </div>
  );
}


'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import { useBarterStore } from '@/store/barterStore';
import {
    Search,
    Bell,
    Wallet,
    Sparkles,
    X,
    LogOut,
} from 'lucide-react';

export default function Header() {
    const { data: session } = useSession();
    const {
        isWalletConnected, setWalletConnected, activeTab,
        notifications, unreadCount, fetchNotifications, markNotificationsRead,
    } = useBarterStore();
    const [searchFocused, setSearchFocused] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    // Fetch notifications on mount and periodically
    useEffect(() => {
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000); // Every 30s
        return () => clearInterval(interval);
    }, [fetchNotifications]);

    const tabTitles: Record<string, string> = {
        dashboard: 'Dashboard',
        exchange: 'Exchange',
        resources: 'Resources',
        trades: 'My Trades',
        'ai-agents': 'AI Agents',
        analytics: 'Analytics',
        reputation: 'Reputation',
        blockchain: 'Blockchain',
        settings: 'Settings',
    };

    const formatTimeAgo = (dateStr: string) => {
        const diff = Date.now() - new Date(dateStr).getTime();
        const mins = Math.floor(diff / 60000);
        if (mins < 1) return 'just now';
        if (mins < 60) return `${mins}m ago`;
        const hours = Math.floor(mins / 60);
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        return `${days}d ago`;
    };

    const getNotifColor = (type: string) => {
        switch (type) {
            case 'match': return '#34C759';
            case 'trade': return '#007AFF';
            case 'achievement': return '#FF9500';
            case 'system': return 'var(--text-secondary)';
            default: return '#007AFF';
        }
    };

    return (
        <header className="h-14 liquid-glass-header flex items-center justify-between px-6 sticky top-0 z-40">
            {/* Left Section — Large Title */}
            <div className="flex items-center gap-3">
                <motion.h2
                    key={activeTab}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: [0.28, 0.84, 0.42, 1] }}
                    className="text-[17px] font-semibold text-label-primary tracking-tight"
                >
                    {tabTitles[activeTab] || 'BarterNet'}
                </motion.h2>

                {/* Live Indicator */}
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-ios-green/10">
                    <span className="w-[5px] h-[5px] bg-ios-green rounded-full animate-pulse-soft" />
                    <span className="text-[11px] font-medium text-ios-green">Live</span>
                </div>
            </div>

            {/* Center: Search */}
            <div className="flex-1 max-w-md mx-8">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-label-tertiary" />
                    <input
                        type="text"
                        placeholder="Search"
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                        className="ios-search"
                    />
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2.5">
                {/* AI Status */}
                <div className="liquid-glass-pill flex items-center gap-1.5 px-3 py-1.5 rounded-full">
                    <Sparkles className="w-3.5 h-3.5 text-ios-purple" />
                    <span className="text-[11px] font-medium text-ios-purple">AI Active</span>
                    <span className="w-[5px] h-[5px] bg-ios-purple rounded-full animate-pulse-soft" />
                </div>

                {/* Notifications — REAL DATA */}
                <div className="relative">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative w-9 h-9 rounded-full liquid-glass-btn flex items-center justify-center text-label-secondary hover:text-label-primary transition-colors"
                    >
                        <Bell className="w-[18px] h-[18px]" strokeWidth={1.8} />
                        {unreadCount > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 bg-ios-red rounded-full text-[10px] font-bold flex items-center justify-center text-label-primary px-1">
                                {unreadCount}
                            </span>
                        )}
                    </motion.button>

                    <AnimatePresence>
                        {showNotifications && (
                            <motion.div
                                initial={{ opacity: 0, y: 6, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 6, scale: 0.96 }}
                                transition={{ duration: 0.2, ease: [0.28, 0.84, 0.42, 1] }}
                                className="absolute right-0 top-12 w-80 ios-material-ultra rounded-[18px] border border-separator overflow-hidden shadow-ios-xl"
                            >
                                <div className="flex items-center justify-between px-4 py-3 border-b border-separator">
                                    <h3 className="text-[15px] font-semibold">Notifications</h3>
                                    <div className="flex items-center gap-2">
                                        {unreadCount > 0 && (
                                            <button
                                                onClick={() => markNotificationsRead()}
                                                className="text-[11px] text-ios-blue font-medium"
                                            >
                                                Mark all read
                                            </button>
                                        )}
                                        <button onClick={() => setShowNotifications(false)}>
                                            <X className="w-4 h-4 text-label-tertiary" />
                                        </button>
                                    </div>
                                </div>
                                <div className="py-1 max-h-60 overflow-y-auto">
                                    {notifications.length === 0 ? (
                                        <div className="py-8 text-center">
                                            <p className="text-[13px] text-label-tertiary">No notifications yet</p>
                                        </div>
                                    ) : (
                                        notifications.slice(0, 10).map((n) => (
                                            <div
                                                key={n.id}
                                                onClick={() => markNotificationsRead(n.id)}
                                                className={`flex items-start gap-3 px-4 py-3 hover:bg-fill-quaternary transition-colors cursor-pointer ${!n.read ? 'bg-ios-blue/5' : ''}`}
                                            >
                                                <div
                                                    className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                                                    style={{ backgroundColor: getNotifColor(n.type) }}
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[14px] font-medium text-label-primary">{n.title}</p>
                                                    <p className="text-[12px] text-label-secondary mt-0.5">{n.message}</p>
                                                    <p className="text-[11px] text-label-quaternary mt-1">{formatTimeAgo(n.createdAt)}</p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Wallet */}
                <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setWalletConnected(!isWalletConnected)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold transition-all ${isWalletConnected
                            ? 'liquid-glass-pill text-ios-green'
                            : 'liquid-glass-btn bg-ios-blue/60 text-label-primary'
                        }`}
                >
                    <Wallet className="w-4 h-4" strokeWidth={1.8} />
                    {isWalletConnected ? (
                        <span className="font-mono text-[12px]">0x742d...bD18</span>
                    ) : (
                        <span>Connect</span>
                    )}
                </motion.button>

                {/* Sign Out */}
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => signOut({ callbackUrl: '/login' })}
                    className="w-9 h-9 rounded-full liquid-glass-btn flex items-center justify-center text-label-secondary hover:text-ios-red transition-colors"
                    title="Sign out"
                >
                    <LogOut className="w-[16px] h-[16px]" strokeWidth={1.8} />
                </motion.button>
            </div>
        </header>
    );
}

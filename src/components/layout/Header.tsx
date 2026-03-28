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
        <div className="sticky top-4 z-40 w-full px-2 md:px-8 max-w-[1400px] mx-auto flex justify-center pb-4">
            <header className="h-[56px] md:h-[64px] w-full flex items-center justify-between px-3 md:px-6 rounded-[28px] md:rounded-[32px] bg-[var(--liquid-glass-bg)] border border-[var(--liquid-glass-border)] backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
                {/* Left Section — Large Title */}
                <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
                    <motion.h2
                        key={activeTab}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, ease: [0.28, 0.84, 0.42, 1] }}
                        className="text-[14px] md:text-[17px] font-bold text-label-primary tracking-tight ml-1 md:ml-2 truncate max-w-[80px] sm:max-w-none"
                    >
                        {tabTitles[activeTab] || 'BarterNet'}
                    </motion.h2>

                    {/* Live Indicator */}
                    <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--fill-tertiary)] border border-[var(--separator)]">
                        <span className="w-[6px] h-[6px] bg-ios-green rounded-full animate-pulse-soft shadow-[0_0_8px_rgba(52,199,89,0.8)]" />
                        <span className="text-[11px] font-bold text-label-secondary uppercase tracking-wider">Live</span>
                    </div>
                </div>

                {/* Center: Search (Hidden on Mobile) */}
                <div className="hidden md:block flex-1 max-w-sm mx-4 lg:mx-8">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-label-tertiary group-focus-within:text-ios-blue transition-colors" />
                        <input
                            type="text"
                            placeholder="Command K or Search..."
                            onFocus={() => setSearchFocused(true)}
                            onBlur={() => setSearchFocused(false)}
                            className="w-full bg-[var(--fill-quaternary)] border border-[var(--separator)] text-label-primary rounded-full pl-10 pr-4 py-2 text-[14px] outline-none focus:bg-[var(--fill-tertiary)] focus:border-ios-blue/50 focus:ring-1 focus:ring-ios-blue/30 transition-all font-medium placeholder:text-label-tertiary"
                        />
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
                    {/* AI Status (Hidden on Mobile) */}
                    <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ios-purple/10 border border-ios-purple/20">
                        <Sparkles className="w-3.5 h-3.5 text-ios-purple" />
                        <span className="text-[11px] font-bold text-ios-purple uppercase tracking-wider">AI Active</span>
                        <span className="w-[5px] h-[5px] bg-ios-purple rounded-full animate-pulse-soft shadow-[0_0_8px_rgba(191,90,242,0.8)]" />
                    </div>

                    {/* Notifications — REAL DATA */}
                    <div className="relative">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="relative w-9 h-9 md:w-10 md:h-10 rounded-full bg-[var(--fill-tertiary)] hover:bg-[var(--fill-secondary)] border border-[var(--separator)] flex items-center justify-center text-label-secondary hover:text-label-primary transition-colors"
                        >
                            <Bell className="w-[16px] md:w-[18px] h-[16px] md:h-[18px]" strokeWidth={2} />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 min-w-[16px] md:min-w-[18px] h-[16px] md:h-[18px] bg-ios-red rounded-full text-[9px] md:text-[10px] font-bold flex items-center justify-center text-white px-1 shadow-md border border-[var(--background)]">
                                    {unreadCount}
                                </span>
                            )}
                        </motion.button>

                        <AnimatePresence>
                            {showNotifications && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.96 }}
                                    transition={{ duration: 0.2, ease: [0.28, 0.84, 0.42, 1] }}
                                    className="absolute right-[-100px] md:right-0 top-14 w-[300px] sm:w-[340px] rounded-[24px] bg-[var(--liquid-glass-bg)] border border-[var(--liquid-glass-border)] backdrop-blur-3xl overflow-hidden shadow-2xl z-50"
                                >
                                    <div className="flex items-center justify-between px-4 md:px-5 py-3 md:py-4 border-b border-[var(--separator)] bg-[var(--fill-quaternary)]">
                                        <h3 className="text-[15px] md:text-[16px] font-bold text-label-primary">Notifications</h3>
                                        <div className="flex items-center gap-2 md:gap-3">
                                            {unreadCount > 0 && (
                                                <button
                                                    onClick={() => markNotificationsRead()}
                                                    className="text-[11px] md:text-[12px] text-ios-blue font-bold tracking-wide uppercase"
                                                >
                                                    Mark Read
                                                </button>
                                            )}
                                            <button onClick={() => setShowNotifications(false)} className="w-6 h-6 rounded-full bg-[var(--fill-tertiary)] flex items-center justify-center hover:bg-[var(--fill-secondary)] transition-colors">
                                                <X className="w-3.5 h-3.5 text-label-secondary" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="py-2 max-h-[300px] overflow-y-auto custom-scrollbar">
                                        {notifications.length === 0 ? (
                                            <div className="py-8 md:py-10 text-center">
                                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[var(--fill-quaternary)] flex items-center justify-center mx-auto mb-3">
                                                    <Bell className="w-5 h-5 text-label-tertiary" />
                                                </div>
                                                <p className="text-[13px] md:text-[14px] font-medium text-label-secondary">All caught up</p>
                                                <p className="text-[11px] md:text-[12px] text-label-tertiary mt-1">No new notifications</p>
                                            </div>
                                        ) : (
                                            notifications.slice(0, 5).map((n) => (
                                                <div
                                                    key={n.id}
                                                    onClick={() => markNotificationsRead(n.id)}
                                                    className={`flex items-start gap-3 px-4 md:px-5 py-2.5 md:py-3 hover:bg-[var(--fill-quaternary)] transition-colors cursor-pointer ${!n.read ? 'bg-[var(--fill-quaternary)]/50' : ''}`}
                                                >
                                                    <div
                                                        className="w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 shadow-sm"
                                                        style={{ backgroundColor: getNotifColor(n.type) }}
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`text-[13px] md:text-[14px] text-label-primary ${!n.read ? 'font-bold' : 'font-medium'} truncate`}>{n.title}</p>
                                                        <p className="text-[12px] md:text-[13px] text-label-secondary mt-0.5 leading-relaxed line-clamp-2">{n.message}</p>
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
                        className={`flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-full text-[12px] md:text-[13px] font-bold transition-all shadow-sm ${isWalletConnected
                                ? 'bg-ios-green/10 text-ios-green border border-ios-green/20'
                                : 'bg-ios-blue text-[var(--background)] hover:bg-ios-blue/90 border border-transparent'
                            }`}
                    >
                        <Wallet className="w-3.5 md:w-4 h-3.5 md:h-4" strokeWidth={2} />
                        <span className={isWalletConnected ? 'font-mono' : ''}>
                          {isWalletConnected 
                            ? (window.innerWidth < 640 ? '0x74...18' : '0x74...bD18') 
                            : (window.innerWidth < 640 ? 'Connect' : 'Connect Wallet')
                          }
                        </span>
                    </motion.button>

                    {/* Sign Out */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => signOut({ callbackUrl: '/login' })}
                        className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[var(--fill-tertiary)] hover:bg-[var(--fill-secondary)] border border-[var(--separator)] flex items-center justify-center text-label-secondary hover:text-ios-red transition-colors"
                        title="Sign out"
                    >
                        <LogOut className="w-[15px] md:w-[16px] h-[15px] md:h-[16px]" strokeWidth={2} />
                    </motion.button>
                </div>
            </header>
        </div>
    );
}

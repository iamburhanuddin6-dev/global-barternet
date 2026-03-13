'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useBarterStore } from '@/store/barterStore';
import {
    LayoutDashboard,
    Globe,
    Package,
    ArrowLeftRight,
    Bot,
    BarChart3,
    Trophy,
    Shield,
    Settings,
    ChevronLeft,
    ChevronRight,
    Zap,
} from 'lucide-react';

const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'exchange', label: 'Exchange', icon: Globe, badge: null },
    { id: 'resources', label: 'Resources', icon: Package, badge: null },
    { id: 'trades', label: 'My Trades', icon: ArrowLeftRight, badge: null },
    { id: 'ai-agents', label: 'AI Agents', icon: Bot, badge: null },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, badge: null },
    { id: 'reputation', label: 'Reputation', icon: Trophy, badge: null },
    { id: 'blockchain', label: 'Blockchain', icon: Shield, badge: null },
];

const bottomItems = [
    { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
    const { activeTab, setActiveTab, sidebarOpen, setSidebarOpen, currentUser, fetchProfile, unreadCount } = useBarterStore();
    const { data: session } = useSession();

    // Fetch profile when session is available
    useEffect(() => {
        if (session?.user) {
            fetchProfile();
        }
    }, [session, fetchProfile]);

    return (
        <motion.aside
            initial={false}
            animate={{ width: sidebarOpen ? 260 : 72 }}
            transition={{ duration: 0.35, ease: [0.28, 0.84, 0.42, 1] }}
            className="fixed left-0 top-0 h-screen z-50 liquid-glass-sidebar flex flex-col"
        >
            {/* Logo */}
            <div className="flex items-center h-16 px-4 border-b border-separator">
                <motion.div
                    className="flex items-center gap-3 cursor-pointer"
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setActiveTab('dashboard')}
                >
                    <div className="w-9 h-9 rounded-[10px] bg-ios-blue flex items-center justify-center shadow-ios-md">
                        <Zap className="w-5 h-5 text-white" />
                    </div>
                    <AnimatePresence>
                        {sidebarOpen && (
                            <motion.div
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -8 }}
                                transition={{ duration: 0.2 }}
                            >
                                <h1 className="font-display font-bold text-[15px] text-white whitespace-nowrap tracking-tight">
                                    BarterNet
                                </h1>
                                <p className="text-[11px] text-label-tertiary whitespace-nowrap">AI · Blockchain</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = activeTab === item.id;
                    const Icon = item.icon;
                    return (
                        <motion.button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            whileTap={{ scale: 0.96 }}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[12px] transition-all duration-200 group relative ${isActive
                                    ? 'bg-fill-tertiary text-white'
                                    : 'text-label-secondary hover:text-white hover:bg-fill-quaternary'
                                }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeNavIndicator"
                                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-ios-blue rounded-r-full"
                                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                                />
                            )}
                            <Icon className={`w-[20px] h-[20px] flex-shrink-0 ${isActive ? 'text-ios-blue' : ''}`} strokeWidth={isActive ? 2.2 : 1.8} />
                            <AnimatePresence>
                                {sidebarOpen && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -8 }}
                                        className="text-[14px] font-medium whitespace-nowrap"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                            {item.badge && sidebarOpen && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="ml-auto bg-ios-red text-white text-[11px] font-semibold min-w-[20px] h-5 flex items-center justify-center rounded-full px-1.5"
                                >
                                    {item.badge}
                                </motion.span>
                            )}
                        </motion.button>
                    );
                })}
            </nav>

            {/* Bottom Section */}
            <div className="px-2 pb-2 space-y-0.5 border-t border-separator pt-2">
                {bottomItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <motion.button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            whileTap={{ scale: 0.96 }}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[12px] transition-all duration-200 ${isActive
                                ? 'bg-fill-tertiary text-white'
                                : 'text-label-secondary hover:text-white hover:bg-fill-quaternary'
                            }`}
                        >
                            <Icon className={`w-[20px] h-[20px] flex-shrink-0 ${isActive ? 'text-ios-blue' : ''}`} strokeWidth={1.8} />
                            <AnimatePresence>
                                {sidebarOpen && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-[14px] font-medium whitespace-nowrap"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    );
                })}

                {/* User Profile — iOS-style avatar row */}
                {currentUser && (
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-[12px] bg-fill-quaternary mt-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ios-blue to-ios-teal flex items-center justify-center text-[13px] font-semibold flex-shrink-0">
                            {currentUser.name.charAt(0)}
                        </div>
                        <AnimatePresence>
                            {sidebarOpen && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex-1 min-w-0"
                                >
                                    <p className="text-[13px] font-semibold text-white truncate">{currentUser.name}</p>
                                    <p className="text-[11px] text-label-tertiary">Lv.{currentUser.level} · ⭐ {currentUser.reputation}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}

                {/* Collapse Toggle */}
                <motion.button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    whileTap={{ scale: 0.92 }}
                    className="w-full flex items-center justify-center py-2 rounded-[10px] text-label-quaternary hover:text-label-secondary hover:bg-fill-quaternary transition-all mt-1"
                >
                    {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </motion.button>
            </div>
        </motion.aside>
    );
}

'use client';

import { motion } from 'framer-motion';
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
    Settings
} from 'lucide-react';

const dockItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'exchange', label: 'Exchange', icon: Globe },
    { id: 'resources', label: 'Resources', icon: Package },
    { id: 'trades', label: 'My Trades', icon: ArrowLeftRight },
    { id: 'ai-agents', label: 'Agents', icon: Bot },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'reputation', label: 'Reputation', icon: Trophy },
    { id: 'blockchain', label: 'Web3', icon: Shield },
    { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
    const { activeTab, setActiveTab } = useBarterStore();

    return (
        <div className="fixed bottom-6 left-0 right-0 z-[100] flex justify-center pointer-events-none px-4 w-full">
            <motion.div 
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="flex items-center gap-1.5 md:gap-2 p-2 rounded-[24px] pointer-events-auto bg-[var(--liquid-glass-bg)] border border-[var(--liquid-glass-border)] backdrop-blur-3xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative overflow-x-auto overflow-y-hidden max-w-full scrollbar-none snap-x"
            >
                {/* Ethereal Glow inside the dock */}
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--ios-purple)]/10 via-[var(--ios-teal)]/10 to-[var(--ios-blue)]/10 opacity-50 pointer-events-none mix-blend-screen mix-blend-overlay blur-md" />

                {dockItems.map((item) => {
                    const isActive = activeTab === item.id;
                    
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className="relative group flex flex-col items-center justify-center min-w-[44px] h-[44px] md:min-w-[56px] md:h-[56px] rounded-[16px] transition-all duration-300 snap-center shrink-0"
                        >
                            {/* Active background indicator */}
                            {isActive && (
                                <motion.div 
                                    layoutId="dock-indicator"
                                    className="absolute inset-0 rounded-[16px] bg-gradient-to-b from-[var(--liquid-glass-highlight)] to-[rgba(255,255,255,0.01)] border border-[rgba(255,255,255,0.08)] shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
                                    initial={false}
                                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                />
                            )}
                            
                            {/* Icon */}
                            <item.icon 
                                className={`w-[22px] h-[22px] md:w-[24px] md:h-[24px] relative z-10 transition-all duration-300 ${
                                    isActive 
                                    ? 'text-label-primary filter drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] scale-110' 
                                    : 'text-label-tertiary group-hover:text-label-primary group-hover:scale-110'
                                }`} 
                                strokeWidth={isActive ? 2.5 : 2}
                            />
                            
                            {/* Active Dot */}
                            {isActive && (
                                <motion.div 
                                    layoutId="active-dot"
                                    className="absolute -bottom-1 w-[4px] h-[4px] bg-label-primary rounded-full shadow-[0_0_8px_#fff]" 
                                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                />
                            )}
                            
                            {/* Hover Tooltip (Mac OS Style) */}
                            <div className="absolute -top-12 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 pointer-events-none flex items-center justify-center backdrop-blur-xl bg-[var(--background-elevated)] border border-[var(--liquid-glass-border)] text-label-primary text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap z-50">
                                {item.label}
                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-[var(--background-elevated)]" />
                            </div>
                        </button>
                    );
                })}
            </motion.div>
        </div>
    );
}

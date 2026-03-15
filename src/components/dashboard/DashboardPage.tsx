'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useBarterStore } from '@/store/barterStore';
import {
    TrendingUp,
    TrendingDown,
    Users,
    ArrowLeftRight,
    Brain,
    Timer,
    Star,
    DollarSign,
    Activity,
    Zap,
    Globe,
} from 'lucide-react';
import dynamic from 'next/dynamic';

const LiveNetworkGraph = dynamic(
    () => import('./LiveNetworkGraph'),
    { ssr: false, loading: () => <div className="h-full w-full flex items-center justify-center text-label-secondary animate-pulse text-[13px]">Initializing Physics Engine...</div> }
);

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.06 },
    },
};

const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.28, 0.84, 0.42, 1] } },
};

function formatNumber(num: number): string {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

interface MetricCardProps {
    title: string;
    value: string;
    change: number;
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
    color: string;
}

function MetricCard({ title, value, change, icon: Icon, color }: MetricCardProps) {
    const isPositive = change >= 0;
    return (
        <motion.div variants={item} className="liquid-glass-card p-4 rounded-[20px]">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-[11px] font-medium text-label-tertiary uppercase tracking-wide">{title}</p>
                    <motion.p
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
                        className="text-[22px] font-bold text-white mt-1 tracking-tight"
                    >
                        {value}
                    </motion.p>
                    <div className={`flex items-center gap-1 mt-1.5 ${isPositive ? 'text-ios-green' : 'text-ios-red'}`}>
                        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        <span className="text-[12px] font-medium">{isPositive ? '+' : ''}{change}%</span>
                        <span className="text-[11px] text-label-quaternary ml-0.5">7d</span>
                    </div>
                </div>
                <div className="w-10 h-10 rounded-[12px] flex items-center justify-center" style={{ backgroundColor: color + '18' }}>
                    <Icon className="w-5 h-5" style={{ color }} strokeWidth={1.8} />
                </div>
            </div>
        </motion.div>
    );
}

function RecentExchanges() {
    const exchanges = [
        { from: 'GPU Computing Time', to: 'ML Training Dataset', score: 94, status: 'completed', time: '2h ago', fromOwner: 'Alex C.', toOwner: 'Maria S.' },
        { from: 'UX Design Sprint', to: 'Cloud Server Credits', score: 87, status: 'negotiating', time: '45m ago', fromOwner: 'James W.', toOwner: 'Priya P.' },
        { from: 'Blockchain Audit', to: 'React Native Course', score: 91, status: 'pending', time: '12m ago', fromOwner: 'David K.', toOwner: 'Emma W.' },
        { from: 'API Development', to: 'DevOps Pipeline', score: 89, status: 'completed', time: '5h ago', fromOwner: 'Raj M.', toOwner: 'Sarah L.' },
        { from: 'Data Visualization', to: 'Backend Consulting', score: 96, status: 'negotiating', time: '1h ago', fromOwner: 'Chen W.', toOwner: 'Timo P.' },
    ];

    return (
        <motion.div variants={item} className="ios-card p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-semibold text-white flex items-center gap-2">
                    <ArrowLeftRight className="w-4 h-4 text-ios-blue" strokeWidth={1.8} />
                    Recent Exchanges
                </h3>
                <button className="text-[13px] text-ios-blue font-medium">View All</button>
            </div>
            <div className="space-y-1">
                {exchanges.map((ex, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="flex items-center gap-3 p-3 rounded-[12px] hover:bg-fill-quaternary transition-colors cursor-pointer"
                    >
                        <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center text-[12px] font-bold ${ex.score >= 90
                                ? 'bg-ios-green/12 text-ios-green'
                                : 'bg-ios-orange/12 text-ios-orange'
                            }`}>
                            {ex.score}%
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                                <span className="text-[14px] font-medium text-white truncate">{ex.from}</span>
                                <ArrowLeftRight className="w-3 h-3 text-label-quaternary flex-shrink-0" />
                                <span className="text-[14px] font-medium text-white truncate">{ex.to}</span>
                            </div>
                            <p className="text-[11px] text-label-tertiary mt-0.5">{ex.fromOwner} ↔ {ex.toOwner}</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className={`ios-badge ${ex.status === 'completed' ? 'bg-ios-green/12 text-ios-green' :
                                    ex.status === 'negotiating' ? 'bg-ios-orange/12 text-ios-orange' :
                                        'bg-ios-blue/12 text-ios-blue'
                                }`}>
                                {ex.status}
                            </span>
                            <span className="text-[11px] text-label-quaternary">{ex.time}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

function AIAgentSwarm() {
    const { agents } = useBarterStore();

    return (
        <motion.div variants={item} className="ios-card p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-semibold text-white flex items-center gap-2">
                    <Brain className="w-4 h-4 text-ios-purple" strokeWidth={1.8} />
                    AI Agents
                </h3>
                <div className="flex items-center gap-1.5">
                    <span className="w-[5px] h-[5px] bg-ios-green rounded-full animate-pulse-soft" />
                    <span className="text-[11px] text-ios-green font-medium">{agents.filter(a => a.status !== 'idle').length} Active</span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                {agents.slice(0, 4).map((agent, i) => (
                    <motion.div
                        key={agent.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.08 }}
                        className="p-3 rounded-[12px] bg-fill-quaternary hover:bg-fill-tertiary transition-colors cursor-pointer"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-[18px]">{agent.avatar}</span>
                            <div>
                                <p className="text-[13px] font-semibold text-white">{agent.name}</p>
                                <p className="text-[11px] text-label-tertiary capitalize">{agent.type}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className={`text-[11px] font-medium px-1.5 py-0.5 rounded-md ${agent.status === 'scanning' ? 'bg-ios-teal/12 text-ios-teal' :
                                    agent.status === 'negotiating' ? 'bg-ios-orange/12 text-ios-orange' :
                                        agent.status === 'processing' ? 'bg-ios-purple/12 text-ios-purple' :
                                            'bg-fill-tertiary text-label-tertiary'
                                }`}>
                                {agent.status}
                            </span>
                            <span className="text-[11px] text-label-secondary font-medium">{agent.efficiency}%</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

function LiveActivityFeed() {
    const activities = [
        { message: 'AI found 96% match: GPU Time ↔ ML Dataset', time: '12s ago', icon: '🤖' },
        { message: 'Exchange completed: Security Audit ↔ React Course', time: '2m ago', icon: '✅' },
        { message: 'New resource listed: DevOps Consulting by @techguru', time: '5m ago', icon: '📦' },
        { message: '@maria_santos earned "Top Barterer" achievement', time: '8m ago', icon: '🏆' },
        { message: 'Smart contract executed on Polygon: 0xabc...def', time: '15m ago', icon: '⛓️' },
        { message: 'Agent NOVA completed 50 negotiations today', time: '20m ago', icon: '⚡' },
    ];

    return (
        <motion.div variants={item} className="ios-card p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-semibold text-white flex items-center gap-2">
                    <Activity className="w-4 h-4 text-ios-teal" strokeWidth={1.8} />
                    Live Activity
                </h3>
                <span className="flex items-center gap-1.5 text-[11px] text-label-tertiary">
                    <span className="w-[5px] h-[5px] bg-ios-green rounded-full animate-pulse-soft" />
                    Real-time
                </span>
            </div>
            <div className="space-y-2.5">
                {activities.map((a, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="flex items-start gap-3 group"
                    >
                        <div className="w-7 h-7 rounded-[8px] bg-fill-quaternary flex items-center justify-center text-[13px] flex-shrink-0 group-hover:bg-fill-tertiary transition-colors">
                            {a.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[13px] text-label-secondary leading-relaxed">{a.message}</p>
                            <p className="text-[11px] text-label-quaternary mt-0.5">{a.time}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

function NetworkVisualization() {
    return (
        <motion.div variants={item} className="ios-card p-5 relative overflow-hidden min-h-[280px]">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-semibold text-white flex items-center gap-2">
                    <Globe className="w-4 h-4 text-ios-teal" strokeWidth={1.8} />
                    Network
                </h3>
                <div className="ios-segment">
                    {['1H', '24H', '7D', '30D'].map(period => (
                        <button
                            key={period}
                            className={`ios-segment-item ${period === '24H' ? 'ios-segment-item-active' : ''}`}
                        >
                            {period}
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative h-[250px] w-full flex items-center justify-center -mx-2">
                <LiveNetworkGraph />
            </div>

            <div className="flex items-center justify-center gap-5 mt-2">
                {[
                    { label: 'Computing', color: '#5AC8FA' },
                    { label: 'Services', color: '#AF52DE' },
                    { label: 'Education', color: '#FF2D55' },
                    { label: 'Data', color: '#34C759' },
                ].map(l => (
                    <div key={l.label} className="flex items-center gap-1.5">
                        <span className="w-[6px] h-[6px] rounded-full" style={{ backgroundColor: l.color }} />
                        <span className="text-[11px] text-label-tertiary">{l.label}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

function TopResources() {
    const { resources } = useBarterStore();
    return (
        <motion.div variants={item} className="ios-card p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-[15px] font-semibold text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-ios-orange" strokeWidth={1.8} />
                    Trending
                </h3>
                <button className="text-[13px] text-ios-blue font-medium">Browse All</button>
            </div>
            <div className="space-y-1">
                {resources.slice(0, 4).map((resource, i) => (
                    <motion.div
                        key={resource.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.06 }}
                        className="flex items-center gap-3 p-3 rounded-[12px] hover:bg-fill-quaternary transition-colors cursor-pointer"
                    >
                        <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center text-[16px] ${resource.category === 'Computing' ? 'bg-[#5AC8FA]/12' :
                                resource.category === 'Data' ? 'bg-[#AF52DE]/12' :
                                    resource.category === 'Services' ? 'bg-[#FF2D55]/12' :
                                        'bg-[#FF9500]/12'
                            }`}>
                            {resource.category === 'Computing' ? '💻' :
                                resource.category === 'Data' ? '📊' :
                                    resource.category === 'Services' ? '🛠️' : '📚'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[14px] font-medium text-white truncate">{resource.name}</p>
                            <p className="text-[11px] text-label-tertiary">{resource.owner?.name || 'Unknown'} · {resource.category}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[14px] font-semibold text-white">${formatNumber(resource.estimatedValue)}</p>
                            <span className={`text-[11px] font-medium ${resource.status === 'available' ? 'text-ios-green' : 'text-ios-orange'
                                }`}>
                                {resource.status}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

export default function DashboardPage() {
    const { metrics, currentUser, fetchMetrics, fetchResources } = useBarterStore();
    const { data: session } = useSession();

    useEffect(() => {
        fetchMetrics();
        fetchResources({ limit: 6 });
    }, [fetchMetrics, fetchResources]);

    const userName = currentUser?.name?.split(' ')[0] || session?.user?.name?.split(' ')[0] || 'User';

    const metricCards = [
        { title: 'Network Value', value: '$' + formatNumber(metrics.networkValue), change: metrics.networkValueChange, icon: DollarSign, color: '#007AFF' },
        { title: 'Active Users', value: formatNumber(metrics.activeUsers), change: metrics.activeUsersChange, icon: Users, color: '#5AC8FA' },
        { title: 'Exchange Vol.', value: formatNumber(metrics.exchangeVolume) + '/d', change: metrics.volumeChange, icon: ArrowLeftRight, color: '#34C759' },
        { title: 'AI Efficiency', value: metrics.aiEfficiency + '%', change: metrics.efficiencyChange, icon: Brain, color: '#AF52DE' },
        { title: 'Match Time', value: metrics.avgMatchTime + 's', change: metrics.matchTimeChange, icon: Timer, color: '#FF9500' },
        { title: 'Satisfaction', value: metrics.satisfaction + '/5', change: 2, icon: Star, color: '#FF2D55' },
    ];

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-5"
        >
            {/* Welcome Banner — iOS Widget style */}
            <motion.div
                variants={item}
                className="liquid-glass-hero p-6 md:p-7"
            >
                <div className="relative z-10">
                    <h1 className="ios-title-1 text-white">
                        Welcome back, <span className="text-ios-blue">{userName}</span>
                    </h1>
                    <p className="text-label-secondary mt-2 max-w-xl text-[15px] leading-relaxed">
                        Your AI agents found 3 new matches, completed 2 negotiations,
                        and your reputation increased by 0.2 points.
                    </p>
                    <div className="flex items-center gap-3 mt-5">
                        <motion.button
                            whileTap={{ scale: 0.96 }}
                            className="liquid-glass-btn rounded-[14px] px-6 py-3 text-white text-[15px] font-semibold"
                        >
                            List a Resource
                        </motion.button>
                        <motion.button
                            whileTap={{ scale: 0.96 }}
                            className="liquid-glass-btn rounded-[14px] px-6 py-3 text-ios-blue text-[15px] font-semibold"
                        >
                            View Matches
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            {/* Metric Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {metricCards.map((metric, i) => (
                    <MetricCard key={i} {...metric} />
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2 space-y-5">
                    <NetworkVisualization />
                    <RecentExchanges />
                </div>
                <div className="space-y-5">
                    <AIAgentSwarm />
                    <TopResources />
                    <LiveActivityFeed />
                </div>
            </div>
        </motion.div>
    );
}

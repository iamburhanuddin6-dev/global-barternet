'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useBarterStore } from '@/store/barterStore';
import {
    Brain,
    Zap,
    Shield,
    BarChart3,
    Search,
    Activity,
    Cpu,
    Network,
    RefreshCw,
    Play,
    Pause,
    MoreVertical,
    TrendingUp,
} from 'lucide-react';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.28, 0.84, 0.42, 1] } },
};

function AgentCard({ agent, index }: { agent: any; index: number }) {
    const [isActive, setIsActive] = useState(agent.status !== 'idle');

    const typeConfig: Record<string, { color: string; icon: any }> = {
        matcher: { color: '#5AC8FA', icon: Search },
        negotiator: { color: '#AF52DE', icon: Brain },
        validator: { color: '#34C759', icon: Shield },
        analyst: { color: '#FF9500', icon: BarChart3 },
    };

    const config = typeConfig[agent.type];
    const Icon = config.icon;

    return (
        <motion.div
            variants={item}
            className="ios-card p-5 relative overflow-hidden"
        >
            {/* Controls */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5">
                <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={() => setIsActive(!isActive)}
                    className="p-1.5 rounded-full bg-fill-quaternary hover:bg-fill-tertiary transition-all"
                >
                    {isActive ? (
                        <Pause className="w-3.5 h-3.5 text-label-tertiary" strokeWidth={1.8} />
                    ) : (
                        <Play className="w-3.5 h-3.5 text-ios-green" strokeWidth={1.8} />
                    )}
                </motion.button>
                <button className="p-1.5 rounded-full bg-fill-quaternary hover:bg-fill-tertiary transition-all">
                    <MoreVertical className="w-3.5 h-3.5 text-label-tertiary" strokeWidth={1.8} />
                </button>
            </div>

            {/* Agent Info */}
            <div className="flex items-center gap-3.5 mb-5">
                <div className="w-12 h-12 rounded-[14px] flex items-center justify-center shadow-ios-md relative"
                    style={{ backgroundColor: config.color + '18' }}>
                    <span className="text-[22px]">{agent.avatar}</span>
                    {isActive && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-ios-green rounded-full border-2 border-surface-secondary" />
                    )}
                </div>
                <div>
                    <h3 className="text-[17px] font-bold text-white tracking-tight">{agent.name}</h3>
                    <p className="text-[13px] font-medium capitalize" style={{ color: config.color }}>{agent.type} Agent</p>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="p-2.5 rounded-[10px] bg-fill-quaternary text-center">
                    <p className="text-[16px] font-bold text-white">{agent.efficiency}%</p>
                    <p className="text-[10px] text-label-tertiary mt-0.5">Efficiency</p>
                </div>
                <div className="p-2.5 rounded-[10px] bg-fill-quaternary text-center">
                    <p className="text-[16px] font-bold text-white">{agent.matchesFound}</p>
                    <p className="text-[10px] text-label-tertiary mt-0.5">Matches</p>
                </div>
                <div className="p-2.5 rounded-[10px] bg-fill-quaternary text-center">
                    <p className="text-[16px] font-bold text-white">{Math.floor(Math.random() * 50 + 10)}</p>
                    <p className="text-[10px] text-label-tertiary mt-0.5">Active</p>
                </div>
            </div>

            {/* Performance Bar */}
            <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] text-label-tertiary">Performance</span>
                    <span className="text-[12px] font-medium" style={{ color: config.color }}>{agent.efficiency}%</span>
                </div>
                <div className="h-[4px] bg-fill-quaternary rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${agent.efficiency}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: config.color }}
                    />
                </div>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[8px] text-[11px] font-medium`}
                    style={{
                        backgroundColor: (agent.status === 'scanning' ? '#5AC8FA' :
                            agent.status === 'negotiating' ? '#FF9500' :
                                agent.status === 'processing' ? '#AF52DE' : '#636366') + '14',
                        color: agent.status === 'scanning' ? '#5AC8FA' :
                            agent.status === 'negotiating' ? '#FF9500' :
                                agent.status === 'processing' ? '#AF52DE' : '#636366'
                    }}>
                    {agent.status === 'scanning' && <Search className="w-3 h-3" />}
                    {agent.status === 'negotiating' && <Activity className="w-3 h-3" />}
                    {agent.status === 'processing' && <Cpu className="w-3 h-3" />}
                    {agent.status === 'idle' && <RefreshCw className="w-3 h-3" />}
                    {agent.status}
                </span>
                <span className="text-[11px] text-label-quaternary">
                    {Math.floor(Math.random() * 30)}m ago
                </span>
            </div>

            {/* AI Thought Stream */}
            {isActive && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 pt-4 border-t border-separator"
                >
                    <p className="text-[11px] text-label-quaternary uppercase tracking-wider mb-2">Thought Stream</p>
                    <div className="space-y-1.5">
                        {[
                            'Scanning 24 potential matches...',
                            'Evaluating compatibility: 87%',
                            'Optimizing trade path: A → B → C',
                        ].map((thought, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="flex items-center gap-2"
                            >
                                <span className="w-1 h-1 rounded-full" style={{ backgroundColor: config.color }} />
                                <span className="text-[12px] text-label-secondary font-mono">{thought}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}

export default function AIAgentsPage() {
    const { agents } = useBarterStore();
    const activeCount = agents.filter(a => a.status !== 'idle').length;
    const totalMatches = agents.reduce((sum, a) => sum + a.matchesFound, 0);
    const avgEfficiency = (agents.reduce((sum, a) => sum + a.efficiency, 0) / agents.length).toFixed(1);

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-5"
        >
            {/* Hero */}
            <motion.div variants={item} className="liquid-glass-hero p-6 md:p-7">
                <h1 className="ios-title-1 text-white mb-1.5">
                    AI Agent <span className="text-ios-purple">Swarm</span>
                </h1>
                <p className="text-label-secondary max-w-lg text-[15px]">
                    Autonomous AI agents continuously scan, match, and negotiate resource exchanges.
                </p>
            </motion.div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                    { label: 'Active Agents', value: `${activeCount}/${agents.length}`, icon: Network, color: '#34C759' },
                    { label: 'Total Matches', value: totalMatches.toLocaleString(), icon: Zap, color: '#5AC8FA' },
                    { label: 'Avg Efficiency', value: `${avgEfficiency}%`, icon: TrendingUp, color: '#AF52DE' },
                    { label: 'Processing', value: '94.2%', icon: Cpu, color: '#FF9500' },
                ].map((stat, i) => (
                    <motion.div key={i} variants={item} className="ios-card p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-[12px] flex items-center justify-center"
                            style={{ backgroundColor: stat.color + '14' }}>
                            <stat.icon className="w-5 h-5" style={{ color: stat.color }} strokeWidth={1.8} />
                        </div>
                        <div>
                            <p className="text-[17px] font-bold text-white">{stat.value}</p>
                            <p className="text-[11px] text-label-tertiary">{stat.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Agent Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {agents.map((agent, i) => (
                    <AgentCard key={agent.id} agent={agent} index={i} />
                ))}
            </div>
        </motion.div>
    );
}

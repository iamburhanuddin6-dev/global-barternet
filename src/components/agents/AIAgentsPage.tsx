'use client';

import { MotionDiv } from '@/lib/motion';
import {
    Brain,
    Activity,
    Settings,
    PauseCircle,
    PlayCircle,
    Zap,
    Shield,
    Bot,
    TerminalSquare
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: [0.28, 0.84, 0.42, 1] } },
};

const agents = [
    { name: 'NOVA', type: 'Matcher Agent', emoji: '🤖', color: '#007AFF', status: 'Scanning', efficiency: 96, matches: 1247, data: [20, 40, 30, 70, 50, 90, 80] },
    { name: 'ATLAS', type: 'Negotiator', emoji: '🧠', color: '#AF52DE', status: 'Negotiating', efficiency: 92, matches: 843, data: [40, 30, 50, 40, 60, 50, 70] },
    { name: 'SENTINEL', type: 'Validator', emoji: '🛡️', color: '#34C759', status: 'Verifying', efficiency: 99, matches: 4521, data: [80, 85, 90, 85, 95, 90, 100] },
    { name: 'ORACLE', type: 'Market Analyst', emoji: '🔮', color: '#5AC8FA', status: 'Idle', efficiency: 88, matches: 512, data: [50, 40, 60, 70, 50, 80, 60] },
    { name: 'CIPHER', type: 'Privacy Escrow', emoji: '🔐', color: '#FF9500', status: 'Processing', efficiency: 94, matches: 890, data: [30, 50, 40, 80, 60, 70, 90] },
    { name: 'NEXUS', type: 'Liquidity Router', emoji: '⚡', color: '#FF2D55', status: 'Routing', efficiency: 97, matches: 2104, data: [60, 70, 50, 90, 80, 100, 90] },
];

export default function AIAgentsPage() {
    return (
        <MotionDiv variants={container} initial="hidden" animate="show" className="max-w-[1400px] mx-auto flex flex-col xl:flex-row gap-6">
            
            {/* ───── LEFT CONTENT (MAIN AGENTS GRID) ───── */}
            <div className="flex-1 space-y-6">
                
                {/* Header */}
                <MotionDiv variants={item} className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[rgba(255,255,255,0.06)] pb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-[5px] h-[5px] bg-ios-green rounded-full animate-pulse-soft" />
                            <span className="text-[11px] font-medium text-ios-green uppercase tracking-wider">6 Active Agents</span>
                        </div>
                        <h1 className="text-[28px] font-bold text-white tracking-tight flex items-center gap-3">
                            AI Trading Agents
                            <span className="bg-[#AF52DE]/10 text-[#AF52DE] text-[12px] px-2.5 py-1 rounded-md tracking-widest font-bold uppercase">Pro</span>
                        </h1>
                    </div>
                </MotionDiv>

                {/* 2x3 Grid of Agents */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {agents.map((agent, i) => (
                        <MotionDiv
                            key={i}
                            variants={item}
                            className="liquid-glass-card p-6 rounded-[24px] relative group overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[rgba(20,20,22,0.4)] hover:bg-[rgba(30,30,32,0.6)] hover:border-[rgba(255,255,255,0.15)] transition-all duration-500"
                        >
                            {/* Ambient Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 blur-[60px] rounded-full pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-700" style={{ backgroundColor: agent.color }}></div>
                            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                            {/* Top row: Icon & Status */}
                            <div className="flex items-start justify-between mb-6">
                                <div className="w-14 h-14 rounded-[16px] flex items-center justify-center text-[28px] shadow-inner border border-[rgba(255,255,255,0.1)]" style={{ backgroundColor: agent.color + '15' }}>
                                    {agent.emoji}
                                </div>
                                <div className="flex items-center gap-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.05)] px-3 py-1.5 rounded-full">
                                    <span className={\`w-2 h-2 rounded-full \${agent.status === 'Idle' ? 'bg-[#8E8E93]' : 'animate-pulse'}\`} style={{ backgroundColor: agent.status !== 'Idle' ? agent.color : '#8E8E93' }}></span>
                                    <span className="text-[12px] font-bold text-white">{agent.status}</span>
                                </div>
                            </div>

                            {/* Name & Type */}
                            <div className="mb-5">
                                <h3 className="text-[22px] font-bold text-white tracking-tight leading-none mb-1 group-hover:text-ios-blue transition-colors duration-300">
                                    {agent.name}
                                </h3>
                                <p className="text-[13px] font-medium" style={{ color: agent.color }}>{agent.type}</p>
                            </div>

                            {/* Efficiency Ring & Matches */}
                            <div className="flex items-center gap-4 mb-6 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.03)] p-3 rounded-[16px]">
                                <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                                    <svg className="w-12 h-12 transform -rotate-90">
                                        <circle cx="24" cy="24" r="20" stroke="rgba(255,255,255,0.1)" strokeWidth="4" fill="none" />
                                        <circle 
                                            cx="24" cy="24" r="20" 
                                            stroke={agent.color} 
                                            strokeWidth="4" fill="none" 
                                            strokeDasharray="125" 
                                            strokeDashoffset={125 - (125 * agent.efficiency) / 100} 
                                            strokeLinecap="round" 
                                        />
                                    </svg>
                                    <span className="text-[12px] font-bold leading-none text-white absolute">{agent.efficiency}%</span>
                                </div>
                                <div>
                                    <p className="text-[16px] font-bold text-white leading-none">{agent.matches.toLocaleString()}</p>
                                    <p className="text-[11px] text-[#8E8E93] uppercase tracking-wider font-semibold mt-1">Matches Found</p>
                                </div>
                            </div>

                            {/* Mini Sparkline Chart */}
                            <div className="h-10 w-full mb-6">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={agent.data.map((val, idx) => ({ name: idx, value: val }))}>
                                        <defs>
                                            <linearGradient id={\`color\${agent.name}\`} x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor={agent.color} stopOpacity={0.3}/>
                                                <stop offset="95%" stopColor={agent.color} stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <Area type="monotone" dataKey="value" stroke={agent.color} strokeWidth={2} fillOpacity={1} fill={\`url(#color\${agent.name})\`} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                                <button className="flex-1 bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.1)] text-white text-[13px] font-semibold py-2.5 rounded-[12px] flex items-center justify-center gap-2 transition-colors border border-[rgba(255,255,255,0.05)]">
                                    <Settings className="w-4 h-4" />
                                    Configure
                                </button>
                                <button className="w-11 h-11 bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.1)] text-white flex items-center justify-center rounded-[12px] transition-colors border border-[rgba(255,255,255,0.05)]">
                                    {agent.status === 'Idle' ? <PlayCircle className="w-5 h-5 text-ios-green" /> : <PauseCircle className="w-5 h-5 text-ios-orange" />}
                                </button>
                            </div>
                        </MotionDiv>
                    ))}
                </div>
            </div>

            {/* ───── RIGHT SIDEBAR (LIVE ACTIVITY FEED) ───── */}
            <MotionDiv variants={item} className="w-full xl:w-[320px] h-full flex flex-col gap-6">
                <div className="liquid-glass-card rounded-[24px] p-6 relative overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[rgba(20,20,22,0.6)]">
                    <div className="flex items-center gap-2 mb-6">
                        <TerminalSquare className="w-5 h-5 text-ios-blue" />
                        <h3 className="text-[16px] font-semibold text-white tracking-tight">Agent Terminal</h3>
                    </div>

                    <div className="space-y-4 font-mono text-[12px]">
                        {[
                            { agent: 'NOVA', msg: 'Match 96.2% found for Hash 0x9f2a', time: '12s ago', color: '#007AFF' },
                            { agent: 'ATLAS', msg: 'Bidding 340 Credits -> Accepted', time: '45s ago', color: '#AF52DE' },
                            { agent: 'SENTINEL', msg: 'Escrow contract deployed @0xabc', time: '2m ago', color: '#34C759' },
                            { agent: 'NEXUS', msg: 'Routing liquidity pool ETH/BTC', time: '5m ago', color: '#FF2D55' },
                            { agent: 'ORACLE', msg: 'Market volatility detected +12%', time: '8m ago', color: '#5AC8FA' },
                            { agent: 'CIPHER', msg: 'ZK-SNARK proof generated', time: '11m ago', color: '#FF9500' },
                            { agent: 'NOVA', msg: 'Scanning network: 24,891 nodes', time: '14m ago', color: '#007AFF' },
                        ].map((log, i) => (
                            <div key={i} className="flex flex-col gap-1 border-b border-[rgba(255,255,255,0.05)] pb-3 last:border-0 last:pb-0">
                                <div className="flex justify-between items-center text-[#8E8E93]">
                                    <span>[{log.time}]</span>
                                </div>
                                <div className="flex gap-2 text-white">
                                    <span style={{ color: log.color, fontWeight: 'bold' }}>{log.agent}</span>
                                    <span className="text-[#EBEBF5]">> {log.msg}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </MotionDiv>

        </MotionDiv>
    );
}

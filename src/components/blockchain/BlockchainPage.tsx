'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
    Shield,
    Clock,
    CheckCircle,
    ExternalLink,
    Copy,
    Hash,
    Cpu,
    Lock,
    FileCode,
    Layers,
    Activity,
    Search
} from 'lucide-react';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.28, 0.84, 0.42, 1] } },
};

const recentTransactions = [
    { hash: '0xabc123...def456', type: 'Exchange', from: '0x742d...bD18', to: '0x5e6f...7g8h', value: 'GPU ↔ ML Dataset', status: 'Confirmed', block: 48392847, gas: '0.0042 ETH', time: '2 min ago' },
    { hash: '0x789xyz...ghi012', type: 'Escrow', from: '0x9i0j...1k2l', to: 'Contract', value: 'UX Sprint (Locked)', status: 'Confirmed', block: 48392845, gas: '0.0031 ETH', time: '5 min ago' },
    { hash: '0xmno345...pqr678', type: 'Reputation', from: 'System', to: '0x742d...bD18', value: 'Score +0.2', status: 'Pending', block: 48392848, gas: '0.0018 ETH', time: '1 min ago' },
    { hash: '0xstu901...vwx234', type: 'NFT Mint', from: '0x3m4n...5o6p', to: '0x3m4n...5o6p', value: 'Badge: Networker', status: 'Confirmed', block: 48392843, gas: '0.0025 ETH', time: '12 min ago' },
    { hash: '0xyzb567...cde890', type: 'Multi-Party', from: '3 Parties', to: '3 Resources', value: 'Circular Exchange', status: 'Confirmed', block: 48392841, gas: '0.0089 ETH', time: '20 min ago' },
];

const smartContracts = [
    { name: 'BarterProtocol', address: '0x1234...5678', version: 'v2.1.0', calls: '12,847', icon: '📜', status: 'Active' },
    { name: 'EscrowManager', address: '0x9abc...def0', version: 'v1.3.2', calls: '8,923', icon: '🔒', status: 'Active' },
    { name: 'ReputationOracle', address: '0x2468...1357', version: 'v1.5.0', calls: '45,612', icon: '⭐', status: 'Active' },
    { name: 'NFTCertificates', address: '0xfedc...ba98', version: 'v1.0.1', calls: '3,456', icon: '🎨', status: 'Active' },
];

const typeColors: Record<string, string> = {
    Exchange: '#007AFF',
    Escrow: '#FF9500',
    Reputation: '#AF52DE',
    'NFT Mint': '#FF2D55',
    'Multi-Party': '#5AC8FA',
};

function HexBlock({ number, time, delay }: { number: number, time: string, delay: number }) {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay, duration: 0.5 }}
            className="flex flex-col items-center group cursor-pointer"
        >
            <div className="relative w-20 h-24 mb-3">
                <svg viewBox="0 0 100 115" className="absolute inset-0 w-full h-full drop-shadow-[0_0_15px_rgba(0,122,255,0.4)] group-hover:drop-shadow-[0_0_25px_rgba(88,86,214,0.6)] transition-all duration-500">
                    <polygon 
                        points="50 3, 95 28, 95 83, 50 108, 5 83, 5 28" 
                        fill="rgba(20,20,22,0.8)" 
                        stroke="rgba(0,122,255,0.4)" 
                        strokeWidth="2"
                        className="group-hover:fill-[rgba(88,86,214,0.2)] transition-colors duration-500"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 pt-1">
                    <Hash className="w-4 h-4 text-ios-blue mb-1" />
                    <span className="font-mono text-[11px] font-bold">#{number}</span>
                </div>
            </div>
            <span className="text-[11px] text-[#8E8E93] font-mono">{time}</span>
        </motion.div>
    );
}

function GlowLine({ delay }: { delay: number }) {
    return (
        <motion.div 
            initial={{ opacity: 0, width: 0 }} 
            animate={{ opacity: 1, width: 40 }} 
            transition={{ delay, duration: 0.5 }}
            className="h-[2px] w-10 bg-gradient-to-r from-ios-blue to-ios-indigo shadow-[0_0_10px_rgba(0,122,255,0.8)] relative -mt-6"
        >
            <motion.div 
                animate={{ x: [0, 40, 0] }} 
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-2 h-2 rounded-full bg-white absolute -top-[3px] shadow-[0_0_10px_white]"
            />
        </motion.div>
    );
}

export default function BlockchainPage() {
    return (
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-[1400px] mx-auto space-y-6">
            
            {/* ----- HEADER ----- */}
            <motion.div variants={item} className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[rgba(255,255,255,0.06)] pb-6 relative">
                <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-ios-blue/10 blur-[120px] rounded-full pointer-events-none -mt-40"></div>
                <div>
                    <h1 className="text-[28px] font-bold text-white tracking-tight flex items-center gap-3">
                        <Lock className="w-6 h-6 text-ios-indigo" /> 
                        Blockchain Ledger
                    </h1>
                    <div className="flex items-center gap-4 mt-2">
                        <span className="text-[#8E8E93] text-[15px]">12,847 Transactions</span>
                        <span className="text-[rgba(255,255,255,0.1)]">|</span>
                        <div className="flex items-center gap-1.5 text-ios-green text-[13px] font-bold">
                            <span className="w-2 h-2 bg-ios-green rounded-full animate-pulse shadow-[0_0_10px_rgba(52,199,89,0.8)]"></span>
                            99.99% Uptime
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E93]" />
                        <input 
                            type="text" 
                            placeholder="Search Txn Hash, Address, Block..." 
                            className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] text-white rounded-full pl-9 pr-4 py-2 text-[14px] focus:outline-none focus:ring-1 focus:ring-ios-blue transition-all w-full md:w-72 backdrop-blur-xl"
                        />
                    </div>
                </div>
            </motion.div>

            {/* ----- HEX BLOCKCHAIN VISUALIZATION ----- */}
            <motion.div variants={item} className="liquid-glass-card rounded-[24px] p-8 border border-[rgba(255,255,255,0.08)] bg-[rgba(20,20,22,0.4)] relative overflow-hidden flex items-center justify-center min-h-[200px]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[40px] bg-ios-indigo/20 blur-[50px] rounded-full"></div>
                <div className="flex items-center justify-center flex-wrap z-10">
                    <HexBlock number={48392842} time="15:32:01" delay={0.1} />
                    <GlowLine delay={0.3} />
                    <HexBlock number={48392843} time="15:32:14" delay={0.5} />
                    <GlowLine delay={0.7} />
                    <HexBlock number={48392844} time="15:32:27" delay={0.9} />
                    <GlowLine delay={1.1} />
                    <HexBlock number={48392845} time="15:32:40" delay={1.3} />
                    <GlowLine delay={1.5} />
                    <HexBlock number={48392846} time="15:32:53" delay={1.7} />
                </div>
            </motion.div>

            {/* ----- STATS GRID ----- */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Network', value: 'Polygon zkEVM', icon: Shield, color: '#34C759' },
                    { label: 'Block Time', value: '~1.8s', icon: Layers, color: '#007AFF' },
                    { label: 'Gas Efficiency', value: 'Max (Batched)', icon: Cpu, color: '#FF9500' },
                    { label: 'Total Value Locked', value: '$24.5M', icon: Activity, color: '#AF52DE' },
                ].map((stat, i) => (
                    <motion.div key={i} variants={item} className="liquid-glass-card p-5 rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[rgba(20,20,22,0.4)] relative group flex items-start justify-between">
                         <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div>
                            <p className="text-[12px] font-medium text-[#8E8E93] uppercase tracking-wider mb-1">{stat.label}</p>
                            <p className="text-[17px] font-bold text-white tracking-tight">{stat.value}</p>
                        </div>
                        <div className="w-10 h-10 rounded-[12px] flex items-center justify-center border border-[rgba(255,255,255,0.1)] shadow-inner" style={{ backgroundColor: stat.color + '15' }}>
                            <stat.icon className="w-5 h-5" style={{ color: stat.color }} strokeWidth={1.8} />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* ----- TRANSACTIONS TABLE ----- */}
                <motion.div variants={item} className="lg:col-span-2 liquid-glass-card rounded-[24px] p-6 border border-[rgba(255,255,255,0.08)] bg-[rgba(20,20,22,0.4)] relative">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Activity className="w-5 h-5 text-ios-teal" strokeWidth={1.8} />
                            <h3 className="text-[18px] font-bold text-white tracking-tight">Transaction Explorer</h3>
                        </div>
                        <button className="text-[13px] text-ios-blue hover:text-white transition-colors font-medium bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.05)] px-3 py-1.5 rounded-lg">
                            Live Feed
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[rgba(255,255,255,0.06)]">
                                    <th className="py-3 px-4 text-[12px] font-medium text-[#8E8E93] uppercase tracking-wider">Tx Hash</th>
                                    <th className="py-3 px-4 text-[12px] font-medium text-[#8E8E93] uppercase tracking-wider">Action Type</th>
                                    <th className="py-3 px-4 text-[12px] font-medium text-[#8E8E93] uppercase tracking-wider">Value/Payload</th>
                                    <th className="py-3 px-4 text-[12px] font-medium text-[#8E8E93] uppercase tracking-wider">Status</th>
                                    <th className="py-3 px-4 text-[12px] font-medium text-[#8E8E93] uppercase tracking-wider text-right">Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentTransactions.map((tx, i) => (
                                    <motion.tr
                                        key={i}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.04 }}
                                        className="border-b border-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.02)] transition-colors group/row cursor-pointer"
                                    >
                                        <td className="py-4 px-4 text-[13px] font-mono font-medium text-ios-blue cursor-pointer hover:underline flex items-center gap-2">
                                            {tx.hash} 
                                            <Copy className="w-3 h-3 text-[#8E8E93] opacity-0 group-hover/row:opacity-100 transition-opacity" />
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider" style={{ backgroundColor: (typeColors[tx.type] || '#636366') + '20', color: typeColors[tx.type] || '#636366' }}>
                                                {tx.type}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-[13px] text-white">
                                            {tx.value}
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-1.5">
                                                {tx.status === 'Confirmed' ? (
                                                    <CheckCircle className="w-4 h-4 text-ios-green" strokeWidth={2} />
                                                ) : (
                                                    <Clock className="w-4 h-4 text-ios-orange animate-pulse" strokeWidth={2} />
                                                )}
                                                <span className={\`text-[12px] font-bold \${tx.status === 'Confirmed' ? 'text-ios-green' : 'text-ios-orange'}\`}>
                                                    {tx.status}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-right text-[12px] text-[#8E8E93]">
                                            {tx.time}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* ----- SMART CONTRACTS INFO ----- */}
                <motion.div variants={item} className="w-full flex flex-col gap-6">
                    <div className="liquid-glass-card rounded-[24px] p-6 border border-[rgba(255,255,255,0.08)] bg-[rgba(20,20,22,0.4)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-ios-indigo/10 blur-[50px] rounded-full pointer-events-none"></div>
                        
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <FileCode className="w-5 h-5 text-ios-indigo" />
                                <h3 className="text-[18px] font-bold text-white tracking-tight">Verified Contracts</h3>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {smartContracts.map((contract, i) => (
                                <div key={i} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-[16px] p-4 hover:bg-[rgba(255,255,255,0.06)] transition-colors group">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[18px]">{contract.icon}</span>
                                            <h4 className="text-[14px] font-semibold text-white tracking-tight group-hover:text-ios-blue transition-colors">
                                                {contract.name}
                                            </h4>
                                        </div>
                                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-[rgba(52,199,89,0.1)] text-ios-green uppercase">
                                            {contract.status}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1.5 mt-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[11px] text-[#8E8E93] uppercase">Address</span>
                                            <span className="text-[12px] font-mono text-white flex items-center gap-1">
                                                {contract.address} <ExternalLink className="w-3 h-3 text-[#8E8E93]" />
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[11px] text-[#8E8E93] uppercase">Version / Calls</span>
                                            <span className="text-[12px] text-white font-medium">
                                                {contract.version} <span className="text-[rgba(255,255,255,0.2)] mx-1">|</span> {contract.calls}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

            </div>
        </motion.div>
    );
}

'use client';

import { motion } from 'framer-motion';
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
} from 'lucide-react';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.28, 0.84, 0.42, 1] } },
};

const recentTransactions = [
    { hash: '0xabc123...def456', type: 'Exchange', from: '0x742d...bD18', to: '0x5e6f...7g8h', value: 'GPU ↔ ML Dataset', status: 'confirmed', block: 48392847, gas: '0.0042 ETH', time: '2 min ago' },
    { hash: '0x789xyz...ghi012', type: 'Escrow', from: '0x9i0j...1k2l', to: 'Contract', value: 'UX Sprint (Locked)', status: 'confirmed', block: 48392845, gas: '0.0031 ETH', time: '5 min ago' },
    { hash: '0xmno345...pqr678', type: 'Reputation', from: 'System', to: '0x742d...bD18', value: 'Score +0.2', status: 'pending', block: 48392848, gas: '0.0018 ETH', time: '1 min ago' },
    { hash: '0xstu901...vwx234', type: 'NFT Mint', from: '0x3m4n...5o6p', to: '0x3m4n...5o6p', value: 'Badge: Networker', status: 'confirmed', block: 48392843, gas: '0.0025 ETH', time: '12 min ago' },
    { hash: '0xyzb567...cde890', type: 'Multi-Party', from: '3 Parties', to: '3 Resources', value: 'Circular Exchange', status: 'confirmed', block: 48392841, gas: '0.0089 ETH', time: '20 min ago' },
];

const smartContracts = [
    { name: 'BarterProtocol', address: '0x1234...5678', version: 'v2.1.0', calls: '12,847', icon: '📜' },
    { name: 'EscrowManager', address: '0x9abc...def0', version: 'v1.3.2', calls: '8,923', icon: '🔒' },
    { name: 'ReputationOracle', address: '0x2468...1357', version: 'v1.5.0', calls: '45,612', icon: '⭐' },
    { name: 'NFTCertificates', address: '0xfedc...ba98', version: 'v1.0.1', calls: '3,456', icon: '🎨' },
];

const typeColors: Record<string, string> = {
    Exchange: '#007AFF',
    Escrow: '#FF9500',
    Reputation: '#AF52DE',
    'NFT Mint': '#FF2D55',
    'Multi-Party': '#5AC8FA',
};

export default function BlockchainPage() {
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
                    Blockchain <span className="text-ios-indigo">Explorer</span>
                </h1>
                <p className="text-label-secondary max-w-lg text-[15px]">
                    Track transactions, monitor contracts, and verify network integrity.
                </p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                    { label: 'Transactions', value: '124,847', icon: Hash, color: '#007AFF' },
                    { label: 'Block Height', value: '48,392,848', icon: Layers, color: '#5AC8FA' },
                    { label: 'Gas Price', value: '23 Gwei', icon: Cpu, color: '#FF9500' },
                    { label: 'Network', value: 'Polygon zkEVM', icon: Shield, color: '#34C759' },
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

            {/* Smart Contracts */}
            <motion.div variants={item} className="ios-card p-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[15px] font-semibold text-white flex items-center gap-2">
                        <FileCode className="w-4 h-4 text-ios-purple" strokeWidth={1.8} />
                        Smart Contracts
                    </h3>
                    <button className="text-[13px] text-ios-blue font-medium">Deploy New</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {smartContracts.map((contract, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="p-4 rounded-[14px] bg-fill-quaternary hover:bg-fill-tertiary transition-all cursor-pointer group"
                        >
                            <div className="flex items-center justify-between mb-2.5">
                                <div className="flex items-center gap-2.5">
                                    <span className="text-[18px]">{contract.icon}</span>
                                    <div>
                                        <p className="text-[14px] font-semibold text-white">{contract.name}</p>
                                        <p className="text-[11px] text-label-tertiary font-mono">{contract.address}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="ios-badge bg-ios-green/12 text-ios-green">Active</span>
                                    <button className="p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-fill-tertiary transition-all">
                                        <ExternalLink className="w-3 h-3 text-label-tertiary" strokeWidth={1.8} />
                                    </button>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-[11px] text-label-tertiary">{contract.version}</span>
                                <span className="text-[11px] text-label-tertiary">{contract.calls} calls</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Transactions */}
            <motion.div variants={item} className="ios-card p-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[15px] font-semibold text-white flex items-center gap-2">
                        <Activity className="w-4 h-4 text-ios-teal" strokeWidth={1.8} />
                        Recent Transactions
                    </h3>
                    <button className="text-[13px] text-ios-blue font-medium">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-separator">
                                <th className="py-2.5 px-3 text-left text-[11px] text-label-tertiary font-medium">Tx Hash</th>
                                <th className="py-2.5 px-3 text-left text-[11px] text-label-tertiary font-medium">Type</th>
                                <th className="py-2.5 px-3 text-left text-[11px] text-label-tertiary font-medium">Value</th>
                                <th className="py-2.5 px-3 text-left text-[11px] text-label-tertiary font-medium">Block</th>
                                <th className="py-2.5 px-3 text-left text-[11px] text-label-tertiary font-medium">Gas</th>
                                <th className="py-2.5 px-3 text-left text-[11px] text-label-tertiary font-medium">Status</th>
                                <th className="py-2.5 px-3 text-left text-[11px] text-label-tertiary font-medium">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentTransactions.map((tx, i) => (
                                <motion.tr
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.04 }}
                                    className="border-b border-separator/50 hover:bg-fill-quaternary transition-colors group"
                                >
                                    <td className="py-3 px-3">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-[12px] font-mono text-ios-blue">{tx.hash}</span>
                                            <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Copy className="w-3 h-3 text-label-quaternary" strokeWidth={1.8} />
                                            </button>
                                        </div>
                                    </td>
                                    <td className="py-3 px-3">
                                        <span className="ios-badge" style={{
                                            backgroundColor: (typeColors[tx.type] || '#636366') + '14',
                                            color: typeColors[tx.type] || '#636366',
                                        }}>
                                            {tx.type}
                                        </span>
                                    </td>
                                    <td className="py-3 px-3 text-[12px] text-label-secondary">{tx.value}</td>
                                    <td className="py-3 px-3 text-[12px] text-label-tertiary font-mono">{tx.block.toLocaleString()}</td>
                                    <td className="py-3 px-3 text-[12px] text-label-tertiary">{tx.gas}</td>
                                    <td className="py-3 px-3">
                                        <div className="flex items-center gap-1">
                                            {tx.status === 'confirmed' ? (
                                                <CheckCircle className="w-3.5 h-3.5 text-ios-green" strokeWidth={1.8} />
                                            ) : (
                                                <Clock className="w-3.5 h-3.5 text-ios-orange animate-pulse-soft" strokeWidth={1.8} />
                                            )}
                                            <span className={`text-[11px] font-medium ${tx.status === 'confirmed' ? 'text-ios-green' : 'text-ios-orange'}`}>
                                                {tx.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-3 text-[11px] text-label-quaternary">{tx.time}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* ZK-Proof Section */}
            <motion.div variants={item} className="ios-card p-5">
                <div className="flex items-center gap-2 mb-3">
                    <Lock className="w-4 h-4 text-ios-indigo" strokeWidth={1.8} />
                    <h3 className="text-[15px] font-semibold text-white">Zero-Knowledge Proofs</h3>
                </div>
                <p className="text-[13px] text-label-secondary mb-4 max-w-2xl">
                    All reputation scores and sensitive details are verified using ZK-proofs for privacy with trustless verification.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                        { label: 'Proofs Generated', value: '45,612', desc: 'ZK-SNARKs created' },
                        { label: 'Verification Time', value: '< 200ms', desc: 'Average proof verification' },
                        { label: 'Privacy Level', value: 'Maximum', desc: 'Full confidentiality' },
                    ].map((stat, i) => (
                        <div key={i} className="p-4 rounded-[12px] bg-fill-quaternary">
                            <p className="text-[17px] font-bold text-white">{stat.value}</p>
                            <p className="text-[12px] text-label-secondary mt-0.5">{stat.label}</p>
                            <p className="text-[11px] text-label-quaternary mt-1">{stat.desc}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}

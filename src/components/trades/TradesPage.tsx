'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeftRight,
    Clock,
    CheckCircle,
    XCircle,
    MessageSquare,
    Eye,
    ChevronDown,
    Bot,
    Shield,
    Send,
} from 'lucide-react';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.28, 0.84, 0.42, 1] } },
};

const myTrades = [
    { id: 't1', myResource: 'GPU Computing Time', theirResource: 'ML Training Dataset', counterparty: 'Maria Santos', status: 'completed', aiScore: 94, date: '2 hours ago', blockchainTx: '0xabc...def', negotiationSteps: 3 },
    { id: 't2', myResource: 'Cloud Server Credits', theirResource: 'UX Design Sprint', counterparty: 'James Wright', status: 'negotiating', aiScore: 87, date: '45 min ago', blockchainTx: null, negotiationSteps: 2 },
    { id: 't3', myResource: 'React Native Course', theirResource: 'Blockchain Audit', counterparty: 'David Kim', status: 'pending', aiScore: 91, date: '12 min ago', blockchainTx: null, negotiationSteps: 0 },
    { id: 't4', myResource: 'Data Visualization', theirResource: 'API Development', counterparty: 'Raj Mehta', status: 'completed', aiScore: 89, date: '1 day ago', blockchainTx: '0xghi...jkl', negotiationSteps: 4 },
    { id: 't5', myResource: 'DevOps Pipeline', theirResource: 'Mobile App Design', counterparty: 'Lee Min Ho', status: 'cancelled', aiScore: 72, date: '3 days ago', blockchainTx: null, negotiationSteps: 5 },
];

const tabs = ['All', 'Active', 'Completed', 'Cancelled'];

const statusConfig: Record<string, { color: string; icon: any }> = {
    completed: { color: '#34C759', icon: CheckCircle },
    negotiating: { color: '#FF9500', icon: MessageSquare },
    pending: { color: '#007AFF', icon: Clock },
    cancelled: { color: '#FF3B30', icon: XCircle },
};

export default function TradesPage() {
    const [activeFilter, setActiveFilter] = useState('All');
    const [expandedTrade, setExpandedTrade] = useState<string | null>(null);

    const filteredTrades = activeFilter === 'All'
        ? myTrades
        : myTrades.filter(t =>
            activeFilter === 'Active' ? ['pending', 'negotiating'].includes(t.status) :
                activeFilter === 'Completed' ? t.status === 'completed' :
                    t.status === 'cancelled'
        );

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-5"
        >
            {/* Hero */}
            <motion.div variants={item} className="liquid-glass-hero p-6 md:p-7">
                <h1 className="ios-title-1 text-label-primary mb-1.5">
                    My <span className="text-ios-blue">Trades</span>
                </h1>
                <p className="text-label-secondary max-w-lg text-[15px]">
                    Track all your exchanges — from AI matches to blockchain completions.
                </p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                    { label: 'Total', value: '47', icon: ArrowLeftRight, color: '#007AFF' },
                    { label: 'Active', value: '2', icon: Clock, color: '#FF9500' },
                    { label: 'Completed', value: '43', icon: CheckCircle, color: '#34C759' },
                    { label: 'Success Rate', value: '95.7%', icon: Shield, color: '#5AC8FA' },
                ].map((s, i) => (
                    <motion.div key={i} variants={item} className="ios-card p-4 flex items-center gap-3">
                        <s.icon className="w-5 h-5" style={{ color: s.color }} strokeWidth={1.8} />
                        <div>
                            <p className="text-[17px] font-bold text-label-primary">{s.value}</p>
                            <p className="text-[11px] text-label-tertiary">{s.label}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Filter Tabs */}
            <motion.div variants={item} className="flex gap-2">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveFilter(tab)}
                        className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all ${activeFilter === tab
                                ? 'bg-ios-blue text-label-primary'
                                : 'bg-fill-quaternary text-label-secondary hover:bg-fill-tertiary'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </motion.div>

            {/* Trades */}
            <div className="space-y-2">
                {filteredTrades.map((trade) => {
                    const config = statusConfig[trade.status];
                    const StatusIcon = config.icon;
                    return (
                        <motion.div
                            key={trade.id}
                            variants={item}
                            className="ios-card overflow-hidden"
                        >
                            <div
                                className="flex items-center gap-3.5 p-4 cursor-pointer"
                                onClick={() => setExpandedTrade(expandedTrade === trade.id ? null : trade.id)}
                            >
                                <div className="w-10 h-10 rounded-[12px] flex items-center justify-center"
                                    style={{ backgroundColor: config.color + '14' }}>
                                    <StatusIcon className="w-5 h-5" style={{ color: config.color }} strokeWidth={1.8} />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                        <span className="text-[14px] font-semibold text-label-primary">{trade.myResource}</span>
                                        <ArrowLeftRight className="w-3.5 h-3.5 text-label-quaternary flex-shrink-0" />
                                        <span className="text-[14px] font-semibold text-label-primary">{trade.theirResource}</span>
                                    </div>
                                    <p className="text-[12px] text-label-tertiary mt-0.5">
                                        with <span className="text-label-secondary">{trade.counterparty}</span> · {trade.date}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2.5">
                                    <div className="flex items-center gap-1 px-2 py-1 rounded-[8px]"
                                        style={{ backgroundColor: (trade.aiScore >= 90 ? '#34C759' : '#FF9500') + '14' }}>
                                        <Bot className="w-3 h-3" style={{ color: trade.aiScore >= 90 ? '#34C759' : '#FF9500' }} strokeWidth={1.8} />
                                        <span className="text-[11px] font-medium" style={{ color: trade.aiScore >= 90 ? '#34C759' : '#FF9500' }}>
                                            {trade.aiScore}%
                                        </span>
                                    </div>
                                    <span className="ios-badge" style={{
                                        backgroundColor: config.color + '14',
                                        color: config.color,
                                    }}>
                                        {trade.status}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 text-label-quaternary transition-transform ${expandedTrade === trade.id ? 'rotate-180' : ''}`} />
                                </div>
                            </div>

                            <AnimatePresence>
                                {expandedTrade === trade.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-4 pb-4 border-t border-separator pt-3.5">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                <div className="p-3.5 rounded-[12px] bg-fill-quaternary">
                                                    <p className="text-[11px] text-label-tertiary mb-2.5">Negotiation</p>
                                                    <div className="space-y-2">
                                                        {['AI Match Found', 'Terms Proposed', 'Counter-offer', 'Agreement', 'Confirmed'].map((step, si) => {
                                                            const done = si < trade.negotiationSteps;
                                                            const current = si === trade.negotiationSteps;
                                                            return (
                                                                <div key={si} className="flex items-center gap-2">
                                                                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${done ? 'bg-ios-green' : current ? 'bg-ios-blue' : 'bg-fill-tertiary'}`}>
                                                                        {done && <CheckCircle className="w-3 h-3 text-label-primary" strokeWidth={2} />}
                                                                    </div>
                                                                    <span className={`text-[12px] ${done ? 'text-label-secondary' : 'text-label-quaternary'}`}>{step}</span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>

                                                <div className="p-3.5 rounded-[12px] bg-fill-quaternary">
                                                    <p className="text-[11px] text-label-tertiary mb-2.5">Details</p>
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between">
                                                            <span className="text-[12px] text-label-tertiary">AI Score</span>
                                                            <span className="text-[12px] text-label-primary">{trade.aiScore}%</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-[12px] text-label-tertiary">Counterparty</span>
                                                            <span className="text-[12px] text-label-primary">{trade.counterparty}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-[12px] text-label-tertiary">Blockchain Tx</span>
                                                            <span className="text-[12px] text-ios-blue font-mono">{trade.blockchainTx || 'Pending...'}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="p-3.5 rounded-[12px] bg-fill-quaternary">
                                                    <p className="text-[11px] text-label-tertiary mb-2.5">Actions</p>
                                                    <div className="space-y-2">
                                                        {trade.status === 'negotiating' && (
                                                            <>
                                                                <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-[10px] bg-ios-green/12 text-ios-green text-[13px] font-medium">
                                                                    <CheckCircle className="w-3.5 h-3.5" strokeWidth={1.8} />
                                                                    Accept
                                                                </button>
                                                                <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-[10px] bg-ios-blue/12 text-ios-blue text-[13px] font-medium">
                                                                    <Send className="w-3.5 h-3.5" strokeWidth={1.8} />
                                                                    Counter
                                                                </button>
                                                            </>
                                                        )}
                                                        {trade.status === 'pending' && (
                                                            <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-[10px] bg-ios-blue/12 text-ios-blue text-[13px] font-medium">
                                                                <Eye className="w-3.5 h-3.5" strokeWidth={1.8} />
                                                                Review
                                                            </button>
                                                        )}
                                                        <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-[10px] bg-fill-tertiary text-label-secondary text-[13px] font-medium">
                                                            <MessageSquare className="w-3.5 h-3.5" strokeWidth={1.8} />
                                                            Chat
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}

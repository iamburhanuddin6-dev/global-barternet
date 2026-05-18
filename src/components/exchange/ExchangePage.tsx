'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBarterStore } from '@/store/barterStore';
import {
    Search,
    Filter,
    ArrowLeftRight,
    Star,
    Sparkles,
    ChevronDown,
    Activity,
    Code,
    Music,
    Palette,
    Briefcase,
    Brain,
    MessageSquare,
    FileCode,
    Lock,
    Database,
    CheckCircle,
    Loader2,
    X,
    Shield,
    Clock,
    Play,
    Mic
} from 'lucide-react';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.28, 0.84, 0.42, 1] } },
};

const categories = ['All', 'Computing', 'Services', 'Education', 'Design'];

function formatValue(val: number): string {
    if (val >= 1000) return (val / 1000).toFixed(1) + 'k';
    return val.toString();
}

const mockExchangeItems = [
    { title: 'Full-Stack Dev Hours', desc: '10 hours of senior React/Node.js development for your startup.', value: 1200, category: 'Computing', owner: 'Alex C.', stars: 4.9, match: 98, icon: Code, color: '#007AFF' },
    { title: 'Piano Lessons', desc: 'Masterclass in classical piano. 4 sessions of 1 hour each.', value: 400, category: 'Education', owner: 'Elena R.', stars: 4.8, match: 92, icon: Music, color: '#AF52DE' },
    { title: 'Graphic Design Package', desc: 'Complete branding kit: logo, typography, color palette.', value: 850, category: 'Design', owner: 'Marcus L.', stars: 5.0, match: 76, icon: Palette, color: '#FF2D55' },
    { title: 'Cloud Architecture', desc: 'AWS infrastructure setup and optimization consulting.', value: 1500, category: 'Computing', owner: 'Sarah T.', stars: 4.7, match: 89, icon: Activity, color: '#5AC8FA' },
    { title: 'Legal Consultation', desc: 'Contract review and startup incorporation advice.', value: 600, category: 'Services', owner: 'David M.', stars: 4.9, match: 65, icon: Briefcase, color: '#FF9500' },
    { title: 'UI/UX Wireframing', desc: 'High-fidelity Figma wireframes for a 5-page application.', value: 950, category: 'Design', owner: 'Jessica K.', stars: 4.8, match: 84, icon: Palette, color: '#FF2D55' },
];

export default function ExchangePage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    
    // Live Trade Modal State
    const [selectedTrade, setSelectedTrade] = useState<any>(null);
    const [tradeStep, setTradeStep] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [showReceipt, setShowReceipt] = useState(false);
    const [showWorkspace, setShowWorkspace] = useState(false);

    // Dynamic integration
    const { resources, fetchResources, addNotificationLocal, currentUser } = useBarterStore();

    // Dynamically grab the user's listed skill/resource to use as the offered asset
    const myAssetTitle = resources.length > 0 ? resources[0].name : '100 Barter Credits';
    const myAssetCategory = resources.length > 0 ? resources[0].category : 'Currency';

    useEffect(() => {
        if (selectedTrade && tradeStep < 6 && !isComplete) {
            const timer = setTimeout(() => {
                if (tradeStep === 5) {
                    setIsComplete(true);
                    
                    const txHash = '0x' + (Math.random()*1000000).toString(16).slice(0,8).toUpperCase();
                    selectedTrade.txHash = txHash;
                    selectedTrade.offeredAsset = myAssetTitle;
                    
                    // Create the completed exchange directly in local state to bypass API limitations
                    useBarterStore.setState((state) => ({
                        exchanges: [
                            {
                                id: 'trade-' + Date.now(),
                                senderId: currentUser?.id || 'me',
                                receiverId: 'lister',
                                sender: { name: currentUser?.name || 'You', reputation: 5.0 },
                                receiver: { name: selectedTrade.owner, reputation: selectedTrade.stars },
                                requestedResource: { name: selectedTrade.title, category: selectedTrade.category },
                                offeredResource: { name: myAssetTitle, category: myAssetCategory },
                                status: 'completed',
                                aiMatchScore: selectedTrade.match,
                                blockchainTxHash: txHash,
                                createdAt: new Date().toISOString()
                            } as any,
                            ...state.exchanges
                        ]
                    }));

                    // Send Notifications
                    addNotificationLocal(`Trade completed with ${selectedTrade.owner} for ${selectedTrade.title}`, 'success');
                    addNotificationLocal(`Notification sent to ${selectedTrade.owner}: Trade confirmed!`, 'info');

                } else {
                    setTradeStep(prev => prev + 1);
                }
            }, 2500); // 2.5 seconds per step
            return () => clearTimeout(timer);
        }
    }, [selectedTrade, tradeStep, isComplete, addNotificationLocal, currentUser, myAssetTitle, myAssetCategory]);
    
    // Fetch real resources on mount
    useEffect(() => {
        fetchResources({ status: 'available' });
    }, [fetchResources]);

    // Fallback logic for presentation
    const isDBEmpty = resources.length === 0;
    const activeItems = isDBEmpty 
        ? mockExchangeItems 
        : resources.map(r => ({
            title: r.name,
            desc: r.description,
            value: r.estimatedValue,
            category: r.category,
            owner: r.owner?.name || 'Anonymous',
            stars: (r.owner?.reputation || 0).toFixed(1),
            match: Math.floor(Math.random() * 30 + 70), // Simulate match score dynamically
            icon: Sparkles, color: 'var(--ios-blue)'
          }));

    const filteredItems = selectedCategory === 'All'
        ? activeItems
        : activeItems.filter((item: any) => item.category === selectedCategory);

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-[1400px] mx-auto flex flex-col xl:flex-row gap-6">
            
            {/* ----- LEFT CONTENT (MAIN AREA) ----- */}
            <div className="flex-1 space-y-6">
                
                {/* Header & Filter Bar */}
                <motion.div variants={item} className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--liquid-glass-border)] pb-6">
                    <div>
                        <h1 className="text-[28px] font-bold text-label-primary tracking-tight">Exchange Marketplace</h1>
                        <p className="text-[#8E8E93] text-[15px] mt-1">Discover resources to barter or let AI find your perfect match.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E93]" />
                            <input 
                                type="text" 
                                placeholder="Search all listings..." 
                                className="bg-[var(--liquid-glass-bg)] border border-[rgba(255,255,255,0.1)] text-label-primary rounded-full pl-9 pr-4 py-2 text-[14px] focus:outline-none focus:ring-1 focus:ring-ios-blue transition-all w-full md:w-64 backdrop-blur-xl"
                            />
                        </div>
                        <button className="flex items-center gap-2 bg-[var(--liquid-glass-bg)] border border-[rgba(255,255,255,0.1)] text-label-primary rounded-full px-4 py-2 text-[14px] font-medium hover:bg-[rgba(255,255,255,0.1)] transition-colors">
                            <Filter className="w-4 h-4" />
                            Filters
                        </button>
                    </div>
                </motion.div>

                {/* Category Pills */}
                <motion.div variants={item} className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-5 py-2 rounded-full text-[14px] font-semibold whitespace-nowrap transition-all duration-300 ${
                                selectedCategory === cat
                                    ? 'bg-ios-blue text-label-primary shadow-[0_4px_12px_rgba(0,122,255,0.3)]'
                                    : 'bg-[var(--liquid-glass-bg)] text-[#8E8E93] hover:bg-[rgba(255,255,255,0.08)] hover:text-label-primary'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* 3-Column Grid of Trading Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filteredItems.map((resource, i) => (
                        <motion.div
                            key={i}
                            variants={item}
                            layout
                            className="liquid-glass-card p-5 rounded-[20px] relative group border border-[var(--liquid-glass-border)] hover:border-[var(--liquid-glass-border)] transition-colors duration-500 overflow-hidden flex flex-col"
                        >
                            {/* Specular Highlight */}
                            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                            {/* Top row: Thumbnail & Match Score */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-14 h-14 rounded-[14px] flex items-center justify-center border border-[rgba(255,255,255,0.1)] shadow-inner" style={{ backgroundColor: resource.color + '15' }}>
                                    <resource.icon className="w-7 h-7" style={{ color: resource.color }} />
                                </div>
                                <div className="relative w-12 h-12 flex items-center justify-center">
                                    {/* SVG Circular Progress */}
                                    <svg className="w-12 h-12 transform -rotate-90 absolute">
                                        <circle cx="24" cy="24" r="20" stroke="rgba(255,255,255,0.1)" strokeWidth="4" fill="none" />
                                        <circle 
                                            cx="24" cy="24" r="20" 
                                            stroke={resource.match >= 90 ? '#34C759' : resource.match >= 80 ? '#007AFF' : '#FF9500'} 
                                            strokeWidth="4" fill="none" 
                                            strokeDasharray="125" 
                                            strokeDashoffset={125 - (125 * resource.match) / 100} 
                                            strokeLinecap="round" 
                                        />
                                    </svg>
                                    <span className="text-[12px] font-bold text-label-primary relative z-10">{resource.match}%</span>
                                </div>
                            </div>

                            {/* Title & Badge */}
                            <div className="mb-3">
                                <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider mb-2" style={{ backgroundColor: resource.color + '20', color: resource.color }}>
                                    {resource.category}
                                </span>
                                <h3 className="text-[18px] font-bold text-label-primary group-hover:text-ios-blue transition-colors duration-300 leading-tight">
                                    {resource.title}
                                </h3>
                            </div>

                            {/* Description */}
                            <p className="text-[13px] text-[#8E8E93] line-clamp-2 leading-relaxed flex-grow">
                                {resource.desc}
                            </p>

                            {/* Bottom row: Value & Owner */}
                            <div className="mt-5 pt-4 border-t border-[var(--liquid-glass-border)] flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1C1C1E] to-[#2C2C2E] flex items-center justify-center border border-[rgba(255,255,255,0.1)]">
                                        <span className="text-[11px] font-bold text-label-primary">{resource.owner[0]}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[12px] font-semibold text-label-primary truncate max-w-[80px]">{resource.owner}</span>
                                        <span className="flex items-center text-[10px] text-[#FF9500]">
                                            <Star className="w-3 h-3 fill-current mr-0.5" /> {resource.stars}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="block text-[16px] font-bold text-label-primary">
                                        <span className="text-[#8E8E93] mr-1">T</span>{formatValue(resource.value)}
                                    </span>
                                    <span className="text-[10px] text-[#8E8E93] uppercase tracking-wider">Credit Value</span>
                                </div>
                            </div>

                            {/* Hover Propose Button */}
                            <div className="absolute inset-0 bg-background/60 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                <button 
                                    onClick={() => {
                                        setSelectedTrade(resource);
                                        setTradeStep(0);
                                        setIsComplete(false);
                                        setShowReceipt(false);
                                        setShowWorkspace(false);
                                    }}
                                    className="bg-ios-blue text-label-primary font-bold text-[14px] px-6 py-3 rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(0,122,255,0.4)] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <ArrowLeftRight className="w-4 h-4" />
                                    Propose Trade
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* ----- RIGHT SIDEBAR (AI MATCHES) ----- */}
            <motion.div variants={item} className="w-full xl:w-[320px] flex flex-col gap-6">
                <div className="liquid-glass-card rounded-[24px] p-6 relative overflow-hidden border border-[var(--liquid-glass-border)]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-ios-purple/20 blur-[50px] rounded-full pointer-events-none"></div>
                    
                    <div className="flex items-center gap-2 mb-6">
                        <Sparkles className="w-5 h-5 text-ios-purple" />
                        <h3 className="text-[16px] font-semibold text-label-primary tracking-tight">AI Recommended</h3>
                    </div>

                    <div className="space-y-4">
                        {[
                            { name: 'DevOps Pipeline Setup', req: 'Requires: 15h Frontend', match: 99, color: '#34C759' },
                            { name: 'Machine Learning Model', req: 'Requires: DB Optimization', match: 94, color: '#007AFF' },
                            { name: 'Smart Contract Audit', req: 'Requires: UX Audit', match: 88, color: '#FF9500' }
                        ].map((rec, i) => (
                            <div key={i} className="bg-[rgba(255,255,255,0.03)] border border-[var(--liquid-glass-border)] rounded-[16px] p-4 hover:bg-[var(--liquid-glass-bg)] transition-colors cursor-pointer group">
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="text-[14px] font-semibold text-label-primary group-hover:text-ios-blue transition-colors leading-tight pr-2">
                                        {rec.name}
                                    </h4>
                                    <span className="text-[12px] font-bold px-2 py-0.5 rounded-md" style={{ backgroundColor: rec.color + '20', color: rec.color }}>
                                        {rec.match}%
                                    </span>
                                </div>
                                <p className="text-[12px] text-[#8E8E93]">{rec.req}</p>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-6 bg-[var(--liquid-glass-bg)] hover:bg-[rgba(255,255,255,0.1)] transition-colors border border-[var(--liquid-glass-border)] py-3 rounded-[12px] text-[13px] font-semibold text-label-primary text-center">
                        View All Matches
                    </button>
                </div>
            </motion.div>

            {/* Live Cycle Simulation Modal */}
            <AnimatePresence>
                {selectedTrade && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
                    >
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={() => setSelectedTrade(null)} />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-lg max-h-[80vh] flex flex-col ios-material-ultra rounded-[24px] border border-separator shadow-ios-xl overflow-hidden"
                        >
                            {!showReceipt && !showWorkspace && (
                                <>
                                    <div className="p-6 border-b border-separator flex items-center justify-between shrink-0">
                                        <div>
                                            <h2 className="text-[18px] font-bold text-label-primary flex items-center gap-2">
                                                <Activity className="w-5 h-5 text-ios-blue animate-pulse" />
                                                Live Trade Execution
                                            </h2>
                                            <p className="text-[13px] text-label-secondary mt-1">Trading for: <span className="text-label-primary font-semibold">{selectedTrade.title}</span></p>
                                        </div>
                                        <button onClick={() => setSelectedTrade(null)} className="p-2 rounded-full hover:bg-fill-tertiary transition-colors">
                                            <X className="w-5 h-5 text-label-secondary" />
                                        </button>
                                    </div>

                                    <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
                                        {[
                                            { step: 1, title: 'AI-Based Matching', desc: 'Analyzing user preferences, resource availability, and demand patterns.', icon: Brain },
                                            { step: 2, title: 'Communication & Negotiation', desc: 'Agents negotiating exchange terms directly through the platform.', icon: MessageSquare },
                                            { step: 3, title: 'Smart Contract Creation', desc: 'Agreement reached. Generating automated smart contract.', icon: FileCode },
                                            { step: 4, title: 'Transaction Execution', desc: 'Exchange process is executing securely.', icon: Lock },
                                            { step: 5, title: 'Blockchain Ledger Storage', desc: 'Completed transaction stored in decentralized ledger.', icon: Database },
                                            { step: 6, title: 'Reputation Update', desc: 'Updating user ratings and feedback scores.', icon: Star },
                                        ].map((item, idx) => {
                                            const isActive = tradeStep === idx && !isComplete;
                                            const isDone = tradeStep > idx || isComplete;
                                            const Icon = item.icon;
                                            
                                            return (
                                                <div key={idx} className={`flex items-start gap-4 transition-all duration-500 ${isActive || isDone ? 'opacity-100 translate-x-0' : 'opacity-30 -translate-x-2'}`}>
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-colors duration-500 ${isActive ? 'bg-ios-blue/10 border-ios-blue text-ios-blue shadow-[0_0_15px_rgba(0,122,255,0.3)]' : isDone ? 'bg-ios-green/10 border-ios-green text-ios-green' : 'bg-fill-quaternary border-separator text-label-tertiary'}`}>
                                                        {isDone ? <CheckCircle className="w-5 h-5" /> : isActive ? <Loader2 className="w-5 h-5 animate-spin" /> : <Icon className="w-5 h-5" />}
                                                    </div>
                                                    <div>
                                                        <h4 className={`text-[15px] font-bold transition-colors duration-500 ${isActive ? 'text-ios-blue' : isDone ? 'text-label-primary' : 'text-label-secondary'}`}>{item.title}</h4>
                                                        <p className="text-[13px] text-label-tertiary mt-0.5 leading-relaxed">{item.desc}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {isComplete && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="p-6 border-t border-separator bg-ios-green/5 flex items-center justify-between shrink-0"
                                        >
                                            <div className="flex items-center gap-2 text-ios-green font-bold text-[15px]">
                                                <CheckCircle className="w-5 h-5" />
                                                Trade Successfully Completed
                                            </div>
                                            <button onClick={() => setShowReceipt(true)} className="px-5 py-2.5 bg-ios-green text-white text-[13px] font-bold rounded-full shadow-[0_4px_15px_rgba(52,199,89,0.3)] hover:scale-105 transition-transform">
                                                View Receipt
                                            </button>
                                        </motion.div>
                                    )}
                                </>
                            )}
                            
                            {showReceipt && !showWorkspace && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-8 flex flex-col items-center justify-center text-center overflow-y-auto"
                                >
                                    <div className="w-20 h-20 rounded-full bg-ios-green/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(52,199,89,0.2)]">
                                        <CheckCircle className="w-10 h-10 text-ios-green" />
                                    </div>
                                    <h2 className="text-[24px] font-black text-label-primary mb-2">Transaction Confirmed</h2>
                                    <p className="text-[15px] text-label-secondary mb-8">Your smart contract has been successfully deployed to the ledger.</p>
                                    
                                    <div className="w-full bg-fill-quaternary border border-[rgba(255,255,255,0.05)] rounded-2xl p-6 mb-8 text-left space-y-4">
                                        <div className="flex justify-between items-center border-b border-[rgba(255,255,255,0.05)] pb-4">
                                            <span className="text-label-tertiary text-[14px]">You Received</span>
                                            <span className="text-label-primary font-bold text-[15px]">{selectedTrade.title}</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-[rgba(255,255,255,0.05)] pb-4">
                                            <span className="text-label-tertiary text-[14px]">You Offered</span>
                                            <span className="text-label-primary font-bold text-[15px]">{selectedTrade.offeredAsset || '100 Barter Credits'}</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-[rgba(255,255,255,0.05)] pb-4">
                                            <span className="text-label-tertiary text-[14px]">Value Equivalent</span>
                                            <span className="text-label-primary font-bold text-[15px]">${selectedTrade.value}</span>
                                        </div>
                                        <div className="flex justify-between items-center border-b border-[rgba(255,255,255,0.05)] pb-4">
                                            <span className="text-label-tertiary text-[14px]">Smart Contract Hash</span>
                                            <span className="text-ios-blue font-mono text-[14px] bg-ios-blue/10 px-2 py-1 rounded-md">{selectedTrade.txHash || '0x...'}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-label-tertiary text-[14px]">Timestamp</span>
                                            <span className="text-label-primary text-[14px] font-medium">{new Date().toLocaleString()}</span>
                                        </div>
                                    </div>

                                    <button onClick={() => setShowWorkspace(true)} className="w-full py-4 bg-ios-blue border border-[rgba(0,122,255,0.2)] text-white font-bold text-[15px] rounded-full hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,122,255,0.3)]">
                                        <Shield className="w-5 h-5" />
                                        Access Secured Workspace
                                    </button>
                                    <button onClick={() => setSelectedTrade(null)} className="w-full mt-3 py-3 text-label-secondary font-semibold text-[14px] rounded-full hover:bg-fill-tertiary transition-colors">
                                        Close & Return to Market
                                    </button>
                                </motion.div>
                            )}

                            {showWorkspace && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-6 flex flex-col w-full h-[600px] overflow-hidden"
                                >
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-separator shrink-0">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-ios-blue/10 flex items-center justify-center border border-ios-blue/20 shadow-[0_0_20px_rgba(0,122,255,0.2)]">
                                                <Shield className="w-5 h-5 text-ios-blue" />
                                            </div>
                                            <div>
                                                <h2 className="text-[18px] font-black text-label-primary">
                                                    Secured Learning Session
                                                </h2>
                                                <p className="text-[12px] text-label-tertiary">Blockchain escrow active</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[10px] uppercase tracking-wider text-label-tertiary font-bold mb-1">Session Expires In</span>
                                            <div className="flex items-center gap-2 bg-ios-red/10 px-3 py-1.5 rounded-full border border-ios-red/20 shadow-[0_0_10px_rgba(255,59,48,0.1)]">
                                                <Clock className="w-4 h-4 text-ios-red animate-pulse" />
                                                <span className="text-ios-red font-mono font-bold text-[14px]">01:59:45</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Split Screen Learning Interface */}
                                    <div className="flex-1 grid grid-cols-2 gap-4 mb-6 min-h-0">
                                        {/* Left: What I am learning */}
                                        <div className="bg-fill-quaternary border border-separator rounded-2xl p-4 flex flex-col relative overflow-hidden group">
                                            <div className="flex justify-between items-center mb-4 shrink-0">
                                                <span className="text-[12px] uppercase font-bold text-ios-blue tracking-wider">You Are Learning</span>
                                                <span className="text-[10px] bg-ios-blue/10 text-ios-blue px-2 py-0.5 rounded font-bold">RECEIVING</span>
                                            </div>
                                            <h3 className="text-[15px] font-bold text-label-primary mb-1 line-clamp-1">{selectedTrade.title}</h3>
                                            <p className="text-[12px] text-label-secondary mb-4">Instructor: {selectedTrade.owner}</p>
                                            
                                            {/* Fake Video Player */}
                                            <div className="flex-1 bg-[#050505] rounded-xl border border-[rgba(255,255,255,0.05)] relative flex items-center justify-center overflow-hidden shadow-inner">
                                                <Play className="w-10 h-10 text-white/40 group-hover:text-white group-hover:scale-110 transition-all cursor-pointer z-10 drop-shadow-md" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                                                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                        <div className="w-[45%] h-full bg-ios-blue"></div>
                                                    </div>
                                                    <span className="text-[10px] text-white font-mono opacity-80">45%</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right: What I am teaching */}
                                        <div className="bg-fill-quaternary border border-separator rounded-2xl p-4 flex flex-col relative overflow-hidden group">
                                            <div className="flex justify-between items-center mb-4 shrink-0">
                                                <span className="text-[12px] uppercase font-bold text-ios-green tracking-wider">You Are Teaching</span>
                                                <span className="text-[10px] bg-ios-green/10 text-ios-green px-2 py-0.5 rounded flex items-center gap-1 font-bold">
                                                    <Activity className="w-3 h-3 animate-pulse" /> LIVE
                                                </span>
                                            </div>
                                            <h3 className="text-[15px] font-bold text-label-primary mb-1 line-clamp-1">{selectedTrade.offeredAsset || 'Skill'}</h3>
                                            <p className="text-[12px] text-label-secondary mb-4">Student: {selectedTrade.owner}</p>
                                            
                                            {/* Fake Stream Interface */}
                                            <div className="flex-1 bg-[#0a0a0c] rounded-xl border border-[rgba(255,255,255,0.05)] relative flex flex-col items-center justify-center p-4 shadow-inner">
                                                <div className="w-14 h-14 rounded-full border-2 border-ios-green border-dashed animate-[spin_6s_linear_infinite] flex items-center justify-center mb-3">
                                                    <Mic className="w-5 h-5 text-ios-green animate-none" />
                                                </div>
                                                <span className="text-[11px] text-label-tertiary">Screen sharing active...</span>
                                                
                                                {/* Fake Chat overlay */}
                                                <div className="absolute bottom-3 left-3 right-3 space-y-1.5">
                                                    <div className="bg-black/40 backdrop-blur-md rounded-md border border-white/5 px-2 py-1.5 text-[10px] text-label-secondary flex items-start gap-1.5 transform translate-y-2 opacity-50 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                                                        <span className="font-bold text-ios-blue shrink-0">{selectedTrade.owner}:</span> 
                                                        <span className="line-clamp-1">Oh that makes complete sense!</span>
                                                    </div>
                                                    <div className="bg-black/40 backdrop-blur-md rounded-md border border-white/5 px-2 py-1.5 text-[10px] text-label-secondary flex items-start gap-1.5">
                                                        <span className="font-bold text-ios-blue shrink-0">{selectedTrade.owner}:</span> 
                                                        <span className="line-clamp-1">Can you show that last line of code again?</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action bar */}
                                    <div className="flex gap-3 shrink-0">
                                        <button className="flex-1 py-3.5 bg-fill-tertiary border border-separator text-label-primary font-bold text-[14px] rounded-xl hover:bg-fill-quaternary transition-colors flex items-center justify-center gap-2">
                                            <MessageSquare className="w-4 h-4 text-label-secondary" /> Open Platform Chat
                                        </button>
                                        <button onClick={() => setSelectedTrade(null)} className="flex-[0.6] py-3.5 bg-ios-red/10 border border-ios-red/20 text-ios-red font-bold text-[14px] rounded-xl hover:bg-ios-red/20 transition-colors flex items-center justify-center gap-2">
                                            <X className="w-4 h-4" /> End Session
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.div>
    );
}

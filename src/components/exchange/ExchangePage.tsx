'use client';

import { useState } from 'react';
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
    Briefcase
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
    const [selectedCategory, setSelectedCategory] = useState('All');
    
    const filteredItems = selectedCategory === 'All' 
        ? mockExchangeItems 
        : mockExchangeItems.filter(item => item.category === selectedCategory);

    return (
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-[1400px] mx-auto flex flex-col xl:flex-row gap-6">
            
            {/* ----- LEFT CONTENT (MAIN AREA) ----- */}
            <div className="flex-1 space-y-6">
                
                {/* Header & Filter Bar */}
                <motion.div variants={item} className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[rgba(255,255,255,0.06)] pb-6">
                    <div>
                        <h1 className="text-[28px] font-bold text-white tracking-tight">Exchange Marketplace</h1>
                        <p className="text-[#8E8E93] text-[15px] mt-1">Discover resources to barter or let AI find your perfect match.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E93]" />
                            <input 
                                type="text" 
                                placeholder="Search all listings..." 
                                className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] text-white rounded-full pl-9 pr-4 py-2 text-[14px] focus:outline-none focus:ring-1 focus:ring-ios-blue transition-all w-full md:w-64 backdrop-blur-xl"
                            />
                        </div>
                        <button className="flex items-center gap-2 bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] text-white rounded-full px-4 py-2 text-[14px] font-medium hover:bg-[rgba(255,255,255,0.1)] transition-colors">
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
                            className={\`px-5 py-2 rounded-full text-[14px] font-semibold whitespace-nowrap transition-all duration-300 \${
                                selectedCategory === cat
                                    ? 'bg-ios-blue text-white shadow-[0_4px_12px_rgba(0,122,255,0.3)]'
                                    : 'bg-[rgba(255,255,255,0.04)] text-[#8E8E93] hover:bg-[rgba(255,255,255,0.08)] hover:text-white'
                            }\`}
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
                            className="liquid-glass-card p-5 rounded-[20px] relative group border border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)] transition-colors duration-500 overflow-hidden flex flex-col"
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
                                    <span className="text-[12px] font-bold text-white relative z-10">{resource.match}%</span>
                                </div>
                            </div>

                            {/* Title & Badge */}
                            <div className="mb-3">
                                <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider mb-2" style={{ backgroundColor: resource.color + '20', color: resource.color }}>
                                    {resource.category}
                                </span>
                                <h3 className="text-[18px] font-bold text-white group-hover:text-ios-blue transition-colors duration-300 leading-tight">
                                    {resource.title}
                                </h3>
                            </div>

                            {/* Description */}
                            <p className="text-[13px] text-[#8E8E93] line-clamp-2 leading-relaxed flex-grow">
                                {resource.desc}
                            </p>

                            {/* Bottom row: Value & Owner */}
                            <div className="mt-5 pt-4 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1C1C1E] to-[#2C2C2E] flex items-center justify-center border border-[rgba(255,255,255,0.1)]">
                                        <span className="text-[11px] font-bold text-white">{resource.owner[0]}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[12px] font-semibold text-white truncate max-w-[80px]">{resource.owner}</span>
                                        <span className="flex items-center text-[10px] text-[#FF9500]">
                                            <Star className="w-3 h-3 fill-current mr-0.5" /> {resource.stars}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="block text-[16px] font-bold text-white">
                                        <span className="text-[#8E8E93] mr-1">T</span>{formatValue(resource.value)}
                                    </span>
                                    <span className="text-[10px] text-[#8E8E93] uppercase tracking-wider">Credit Value</span>
                                </div>
                            </div>

                            {/* Hover Propose Button */}
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                <button className="bg-ios-blue text-white font-bold text-[14px] px-6 py-3 rounded-full flex items-center gap-2 shadow-[0_0_20px_rgba(0,122,255,0.4)] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
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
                <div className="liquid-glass-card rounded-[24px] p-6 relative overflow-hidden border border-[rgba(255,255,255,0.08)]">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-ios-purple/20 blur-[50px] rounded-full pointer-events-none"></div>
                    
                    <div className="flex items-center gap-2 mb-6">
                        <Sparkles className="w-5 h-5 text-ios-purple" />
                        <h3 className="text-[16px] font-semibold text-white tracking-tight">AI Recommended</h3>
                    </div>

                    <div className="space-y-4">
                        {[
                            { name: 'DevOps Pipeline Setup', req: 'Requires: 15h Frontend', match: 99, color: '#34C759' },
                            { name: 'Machine Learning Model', req: 'Requires: DB Optimization', match: 94, color: '#007AFF' },
                            { name: 'Smart Contract Audit', req: 'Requires: UX Audit', match: 88, color: '#FF9500' }
                        ].map((rec, i) => (
                            <div key={i} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-[16px] p-4 hover:bg-[rgba(255,255,255,0.06)] transition-colors cursor-pointer group">
                                <div className="flex items-start justify-between mb-2">
                                    <h4 className="text-[14px] font-semibold text-white group-hover:text-ios-blue transition-colors leading-tight pr-2">
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

                    <button className="w-full mt-6 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] transition-colors border border-[rgba(255,255,255,0.08)] py-3 rounded-[12px] text-[13px] font-semibold text-white text-center">
                        View All Matches
                    </button>
                </div>
            </motion.div>

        </motion.div>
    );
}

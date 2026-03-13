'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBarterStore } from '@/store/barterStore';
import {
    Search,
    Filter,
    Grid3X3,
    List,
    ArrowLeftRight,
    Heart,
    Eye,
    Sparkles,
    ChevronDown,
} from 'lucide-react';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.28, 0.84, 0.42, 1] } },
};

const categories = ['All', 'Computing', 'Data', 'Services', 'Education', 'Design', 'IoT', 'Blockchain'];

function formatValue(val: number): string {
    if (val >= 1000) return '$' + (val / 1000).toFixed(1) + 'K';
    return '$' + val;
}

export default function ExchangePage() {
    const { resources } = useBarterStore();
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showFilters, setShowFilters] = useState(false);

    const filteredResources = selectedCategory === 'All'
        ? resources
        : resources.filter(r => r.category === selectedCategory);

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-5"
        >
            {/* Hero */}
            <motion.div variants={item} className="liquid-glass-hero p-6 md:p-7">
                <div className="flex items-center gap-2 mb-2">
                    <span className="w-[5px] h-[5px] bg-ios-green rounded-full animate-pulse-soft" />
                    <span className="text-[11px] font-medium text-ios-green uppercase tracking-wider">156 Live Exchanges</span>
                </div>
                <h1 className="ios-title-1 text-white mb-1.5">
                    Resource <span className="text-ios-blue">Marketplace</span>
                </h1>
                <p className="text-label-secondary max-w-lg text-[15px]">
                    Browse resources or let AI find the perfect match for your needs.
                </p>
            </motion.div>

            {/* Search & Filters */}
            <motion.div variants={item} className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-label-tertiary" />
                    <input
                        type="text"
                        placeholder="Search resources, skills, services..."
                        className="ios-search"
                    />
                </div>
                <div className="flex gap-2">
                    <motion.button
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setShowFilters(!showFilters)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-[12px] text-[13px] font-medium transition-all ${showFilters ? 'bg-ios-blue/12 text-ios-blue' : 'bg-fill-tertiary text-label-secondary'
                            }`}
                    >
                        <Filter className="w-4 h-4" strokeWidth={1.8} />
                        Filters
                        <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                    </motion.button>

                    <motion.button
                        whileTap={{ scale: 0.96 }}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-[12px] bg-ios-blue text-white text-[13px] font-semibold shadow-ios-md"
                    >
                        <Sparkles className="w-4 h-4" strokeWidth={1.8} />
                        AI Match
                    </motion.button>

                    <div className="flex rounded-[10px] bg-fill-tertiary overflow-hidden p-0.5">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-[8px] transition-all ${viewMode === 'grid' ? 'bg-surface-tertiary text-white shadow-ios' : 'text-label-tertiary'}`}
                        >
                            <Grid3X3 className="w-4 h-4" strokeWidth={1.8} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-[8px] transition-all ${viewMode === 'list' ? 'bg-surface-tertiary text-white shadow-ios' : 'text-label-tertiary'}`}
                        >
                            <List className="w-4 h-4" strokeWidth={1.8} />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Category Pills — iOS Segmented style */}
            <motion.div variants={item} className="flex gap-2 overflow-x-auto pb-1">
                {categories.map(cat => (
                    <motion.button
                        key={cat}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-1.5 rounded-full text-[13px] font-medium whitespace-nowrap transition-all ${selectedCategory === cat
                                ? 'bg-ios-blue text-white'
                                : 'bg-fill-quaternary text-label-secondary hover:bg-fill-tertiary'
                            }`}
                    >
                        {cat}
                    </motion.button>
                ))}
            </motion.div>

            {/* Resource Grid */}
            <motion.div
                variants={container}
                className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3' : 'space-y-2'}
            >
                {filteredResources.map((resource, i) => (
                    <motion.div
                        key={resource.id}
                        variants={item}
                        layout
                        className={`ios-card cursor-pointer ${viewMode === 'list' ? 'flex items-center gap-4 p-4' : 'p-5'}`}
                    >
                        {viewMode === 'grid' ? (
                            <>
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-11 h-11 rounded-[12px] flex items-center justify-center text-[18px] ${resource.category === 'Computing' ? 'bg-[#5AC8FA]/12' :
                                            resource.category === 'Data' ? 'bg-[#AF52DE]/12' :
                                                resource.category === 'Services' ? 'bg-[#FF2D55]/12' :
                                                    'bg-[#FF9500]/12'
                                        }`}>
                                        {resource.category === 'Computing' ? '💻' :
                                            resource.category === 'Data' ? '📊' :
                                                resource.category === 'Services' ? '🛠️' : '📚'}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <motion.button
                                            whileTap={{ scale: 0.85 }}
                                            className="p-1.5 rounded-full text-label-quaternary hover:text-ios-pink hover:bg-ios-pink/10 transition-all"
                                        >
                                            <Heart className="w-4 h-4" strokeWidth={1.8} />
                                        </motion.button>
                                        <span className={`ios-badge ${resource.status === 'available'
                                                ? 'bg-ios-green/12 text-ios-green'
                                                : 'bg-ios-orange/12 text-ios-orange'
                                            }`}>
                                            {resource.status}
                                        </span>
                                    </div>
                                </div>

                                <h3 className="text-[15px] font-semibold text-white mb-1 group-hover:text-ios-blue transition-colors">
                                    {resource.name}
                                </h3>
                                <p className="text-[13px] text-label-tertiary mb-4 line-clamp-2">{resource.description}</p>

                                <div className="flex flex-wrap gap-1.5 mb-4">
                                    {resource.tags.slice(0, 3).map(tag => (
                                        <span key={tag} className="px-2 py-0.5 rounded-md bg-fill-quaternary text-[11px] font-medium text-label-secondary">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between pt-3 border-t border-separator">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-ios-blue to-ios-teal flex items-center justify-center text-[10px] font-bold">
                                            {resource.owner.charAt(0)}
                                        </div>
                                        <span className="text-[12px] text-label-secondary">{resource.owner}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[15px] font-bold text-white">{formatValue(resource.estimatedValue)}</p>
                                        <p className="text-[11px] text-label-quaternary">est. value</p>
                                    </div>
                                </div>

                                <div className="mt-4 flex gap-2">
                                    <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-[12px] bg-ios-blue/10 text-ios-blue text-[13px] font-medium hover:bg-ios-blue/20 transition-all">
                                        <ArrowLeftRight className="w-3.5 h-3.5" strokeWidth={1.8} />
                                        Propose Trade
                                    </button>
                                    <button className="p-2.5 rounded-[12px] bg-fill-quaternary text-label-secondary hover:text-white transition-all">
                                        <Eye className="w-3.5 h-3.5" strokeWidth={1.8} />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center text-[16px] flex-shrink-0 ${resource.category === 'Computing' ? 'bg-[#5AC8FA]/12' :
                                        resource.category === 'Data' ? 'bg-[#AF52DE]/12' :
                                            resource.category === 'Services' ? 'bg-[#FF2D55]/12' : 'bg-[#FF9500]/12'
                                    }`}>
                                    {resource.category === 'Computing' ? '💻' :
                                        resource.category === 'Data' ? '📊' :
                                            resource.category === 'Services' ? '🛠️' : '📚'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-[14px] font-semibold text-white">{resource.name}</h3>
                                    <p className="text-[12px] text-label-tertiary truncate">{resource.description}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-[14px] font-bold text-white">{formatValue(resource.estimatedValue)}</span>
                                    <span className={`ios-badge ${resource.status === 'available' ? 'bg-ios-green/12 text-ios-green' : 'bg-ios-orange/12 text-ios-orange'}`}>
                                        {resource.status}
                                    </span>
                                    <button className="px-3 py-1.5 rounded-[10px] bg-ios-blue/10 text-ios-blue text-[12px] font-medium hover:bg-ios-blue/20 transition-all">
                                        Trade
                                    </button>
                                </div>
                            </>
                        )}
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}

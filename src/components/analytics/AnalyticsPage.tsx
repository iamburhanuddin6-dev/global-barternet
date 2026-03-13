'use client';

import { motion } from 'framer-motion';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
} from 'recharts';
import {
    TrendingUp,
    BarChart3,
    PieChart as PieIcon,
    Activity,
    Zap,
    Globe,
} from 'lucide-react';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.28, 0.84, 0.42, 1] } },
};

const volumeData = Array.from({ length: 30 }, (_, i) => ({
    day: `${i + 1}`,
    exchanges: Math.floor(Math.random() * 500 + 200),
    value: Math.floor(Math.random() * 50000 + 10000),
    aiMatches: Math.floor(Math.random() * 400 + 150),
}));

const categoryData = [
    { name: 'Computing', value: 35, color: '#5AC8FA' },
    { name: 'Services', value: 25, color: '#AF52DE' },
    { name: 'Education', value: 20, color: '#FF2D55' },
    { name: 'Data', value: 12, color: '#34C759' },
    { name: 'IoT', value: 8, color: '#FF9500' },
];

const weeklyData = [
    { day: 'Mon', exchanges: 145, aiOps: 320 },
    { day: 'Tue', exchanges: 167, aiOps: 380 },
    { day: 'Wed', exchanges: 198, aiOps: 420 },
    { day: 'Thu', exchanges: 234, aiOps: 510 },
    { day: 'Fri', exchanges: 289, aiOps: 580 },
    { day: 'Sat', exchanges: 210, aiOps: 440 },
    { day: 'Sun', exchanges: 178, aiOps: 390 },
];

const radarData = [
    { metric: 'Speed', value: 92 },
    { metric: 'Accuracy', value: 96 },
    { metric: 'Fairness', value: 88 },
    { metric: 'Security', value: 97 },
    { metric: 'Satisfaction', value: 91 },
    { metric: 'Innovation', value: 85 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="ios-material-ultra rounded-[12px] p-3 shadow-ios-lg border border-separator">
                <p className="text-[12px] font-medium text-white mb-1">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <p key={index} className="text-[12px]" style={{ color: entry.color }}>
                        {entry.name}: {entry.value.toLocaleString()}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

export default function AnalyticsPage() {
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
                    Analytics <span className="text-ios-teal">Hub</span>
                </h1>
                <p className="text-label-secondary max-w-lg text-[15px]">
                    Real-time insights into network performance, exchange patterns, and AI efficiency.
                </p>
            </motion.div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Exchange Volume */}
                <motion.div variants={item} className="ios-card p-5">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h3 className="text-[15px] font-semibold text-white flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-ios-blue" strokeWidth={1.8} />
                                Exchange Volume
                            </h3>
                            <p className="text-[11px] text-label-tertiary mt-0.5">Last 30 days</p>
                        </div>
                        <div className="ios-segment">
                            {['1W', '1M', '3M', '1Y'].map(period => (
                                <button
                                    key={period}
                                    className={`ios-segment-item ${period === '1M' ? 'ios-segment-item-active' : ''}`}
                                >
                                    {period}
                                </button>
                            ))}
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={volumeData}>
                            <defs>
                                <linearGradient id="iosGradBlue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#007AFF" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#007AFF" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="iosGradTeal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#5AC8FA" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#5AC8FA" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(84,84,88,0.12)" />
                            <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#636366' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 10, fill: '#636366' }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="exchanges" stroke="#007AFF" fill="url(#iosGradBlue)" strokeWidth={2} />
                            <Area type="monotone" dataKey="aiMatches" stroke="#5AC8FA" fill="url(#iosGradTeal)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                    <div className="flex items-center gap-4 mt-2 justify-center">
                        <div className="flex items-center gap-1.5">
                            <span className="w-[6px] h-[6px] rounded-full bg-ios-blue" />
                            <span className="text-[11px] text-label-tertiary">Exchanges</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="w-[6px] h-[6px] rounded-full bg-ios-teal" />
                            <span className="text-[11px] text-label-tertiary">AI Matches</span>
                        </div>
                    </div>
                </motion.div>

                {/* Weekly Activity */}
                <motion.div variants={item} className="ios-card p-5">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h3 className="text-[15px] font-semibold text-white flex items-center gap-2">
                                <BarChart3 className="w-4 h-4 text-ios-purple" strokeWidth={1.8} />
                                Weekly Activity
                            </h3>
                            <p className="text-[11px] text-label-tertiary mt-0.5">This week overview</p>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={weeklyData} barGap={4}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(84,84,88,0.12)" />
                            <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#636366' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 10, fill: '#636366' }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="exchanges" fill="#007AFF" radius={[6, 6, 0, 0]} />
                            <Bar dataKey="aiOps" fill="#AF52DE" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                    <div className="flex items-center gap-4 mt-2 justify-center">
                        <div className="flex items-center gap-1.5">
                            <span className="w-[6px] h-[6px] rounded-full bg-ios-blue" />
                            <span className="text-[11px] text-label-tertiary">Exchanges</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="w-[6px] h-[6px] rounded-full bg-ios-purple" />
                            <span className="text-[11px] text-label-tertiary">AI Operations</span>
                        </div>
                    </div>
                </motion.div>

                {/* Category Distribution */}
                <motion.div variants={item} className="ios-card p-5">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-[15px] font-semibold text-white flex items-center gap-2">
                            <PieIcon className="w-4 h-4 text-ios-pink" strokeWidth={1.8} />
                            Categories
                        </h3>
                    </div>
                    <div className="flex items-center gap-8">
                        <ResponsiveContainer width="50%" height={200}>
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={80}
                                    paddingAngle={3}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={index} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="flex-1 space-y-3">
                            {categoryData.map((cat, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="w-[8px] h-[8px] rounded-[2px]" style={{ backgroundColor: cat.color }} />
                                        <span className="text-[13px] text-label-secondary">{cat.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-1 bg-fill-quaternary rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${cat.value}%` }}
                                                transition={{ duration: 1, delay: i * 0.1 }}
                                                className="h-full rounded-full"
                                                style={{ backgroundColor: cat.color }}
                                            />
                                        </div>
                                        <span className="text-[13px] font-medium text-white w-8 text-right">{cat.value}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* AI Performance Radar */}
                <motion.div variants={item} className="ios-card p-5">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-[15px] font-semibold text-white flex items-center gap-2">
                            <Activity className="w-4 h-4 text-ios-teal" strokeWidth={1.8} />
                            AI Performance
                        </h3>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <RadarChart data={radarData}>
                            <PolarGrid stroke="rgba(84,84,88,0.15)" />
                            <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: '#8E8E93' }} />
                            <PolarRadiusAxis
                                tick={{ fontSize: 9, fill: '#48484A' }}
                                axisLine={false}
                                domain={[0, 100]}
                            />
                            <Radar
                                name="Performance"
                                dataKey="value"
                                stroke="#007AFF"
                                fill="#007AFF"
                                fillOpacity={0.12}
                                strokeWidth={2}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            {/* Bottom Stats */}
            <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                    { label: 'Total Exchanges', value: '24,847', change: '+12.5%', icon: Zap, color: '#007AFF' },
                    { label: 'Network Health', value: '99.9%', change: '+0.1%', icon: Activity, color: '#34C759' },
                    { label: 'Global Reach', value: '142 Countries', change: '+8', icon: Globe, color: '#5AC8FA' },
                    { label: 'Smart Contracts', value: '1,247', change: '+34', icon: Activity, color: '#AF52DE' },
                ].map((stat, i) => (
                    <motion.div key={i} variants={item} className="ios-card p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <stat.icon className="w-4 h-4" style={{ color: stat.color }} strokeWidth={1.8} />
                            <span className="text-[11px] text-label-tertiary">{stat.label}</span>
                        </div>
                        <p className="text-[20px] font-bold text-white tracking-tight">{stat.value}</p>
                        <p className="text-[12px] text-ios-green mt-1 font-medium">{stat.change}</p>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
}

'use client';

import { MotionDiv } from '@/lib/motion';
import {
    BarChart3,
    TrendingUp,
    TrendingDown,
    Activity,
    Globe,
    Users,
    Zap,
    Download
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
    BarChart, Bar, PieChart, Pie, Cell, Tooltip
} from 'recharts';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.28, 0.84, 0.42, 1] } },
};

/* ───── MOCK DATA ───── */
const volumeData = [
    { name: 'Mon', value: 4000 }, { name: 'Tue', value: 3000 }, { name: 'Wed', value: 5000 },
    { name: 'Thu', value: 2780 }, { name: 'Fri', value: 6890 }, { name: 'Sat', value: 2390 },
    { name: 'Sun', value: 3490 },
];

const matchScoreData = [
    { name: '<60%', value: 120 }, { name: '60-70%', value: 340 }, { name: '70-80%', value: 850 },
    { name: '80-90%', value: 1420 }, { name: '>90%', value: 2150 },
];

const currentCategoryData = [
    { name: 'Computing', value: 35, color: '#5AC8FA' },
    { name: 'Services', value: 30, color: '#AF52DE' },
    { name: 'Data', value: 20, color: '#34C759' },
    { name: 'Education', value: 10, color: '#FF2D55' },
    { name: 'Other', value: 5, color: '#FF9500' },
];

const partnersData = [
    { name: 'Alex C.', volume: '$124.5k', trades: 45, score: 98, trend: '+12%' },
    { name: 'Maria S.', volume: '$98.2k', trades: 32, score: 94, trend: '+8%' },
    { name: 'James W.', volume: '$85.0k', trades: 28, score: 91, trend: '-2%' },
    { name: 'Priya P.', volume: '$64.3k', trades: 19, score: 88, trend: '+5%' },
    { name: 'Sarah T.', volume: '$52.8k', trades: 15, score: 95, trend: '+15%' },
];

export default function AnalyticsPage() {
    return (
        <MotionDiv variants={container} initial="hidden" animate="show" className="max-w-[1400px] mx-auto space-y-6">
            
            {/* ───── HEADER & CONTROLS ───── */}
            <MotionDiv variants={item} className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[rgba(255,255,255,0.06)] pb-6">
                <div>
                    <h1 className="text-[28px] font-bold text-white tracking-tight flex items-center gap-3">
                        <BarChart3 className="w-6 h-6 text-ios-teal" /> 
                        Analytics & Insights
                    </h1>
                    <p className="text-[#8E8E93] text-[15px] mt-1">Deep analysis of your trading activity and network metrics.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex bg-[rgba(255,255,255,0.05)] rounded-[12px] p-1 border border-[rgba(255,255,255,0.05)]">
                        {['7D', '30D', '90D', '1Y'].map((range, i) => (
                            <button key={range} className={\`px-4 py-2 text-[13px] font-semibold rounded-[10px] transition-all \${i === 1 ? 'bg-[rgba(255,255,255,0.1)] text-white shadow-md' : 'text-[#8E8E93] hover:text-white'}\`}>
                                {range}
                            </button>
                        ))}
                    </div>
                    <button className="flex items-center justify-center w-10 h-10 bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] text-white rounded-[12px] hover:bg-[rgba(255,255,255,0.1)] transition-colors">
                        <Download className="w-4 h-4" />
                    </button>
                </div>
            </MotionDiv>

            {/* ───── KPI CARDS ───── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                    { title: 'Total Trade Volume', value: '$845.2K', change: 18.2, period: 'vs last 30d', icon: Activity, color: '#007AFF' },
                    { title: 'Completed Trades', value: '1,248', change: 5.4, period: 'vs last 30d', icon: Zap, color: '#34C759' },
                    { title: 'Avg Match Score', value: '94.2%', change: 1.2, period: 'vs last 30d', icon: Users, color: '#AF52DE' },
                    { title: 'Network Reach', value: '156', change: -2.4, period: 'countries', icon: Globe, color: '#FF9500' },
                ].map((stat, i) => (
                    <MotionDiv key={i} variants={item} className="liquid-glass-card rounded-[20px] p-5 border border-[rgba(255,255,255,0.08)] bg-[rgba(20,20,22,0.4)] relative group overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: stat.color }}></div>
                        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        
                        <div className="flex items-start justify-between">
                            <div className="w-12 h-12 rounded-[14px] flex items-center justify-center border border-[rgba(255,255,255,0.1)] shadow-inner" style={{ backgroundColor: stat.color + '15' }}>
                                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                            </div>
                            <div className={\`flex items-center gap-1.5 px-2 py-1 rounded-md text-[12px] font-bold bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.05)] \${stat.change >= 0 ? 'text-ios-green' : 'text-ios-orange'}\`}>
                                {stat.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                {Math.abs(stat.change)}%
                            </div>
                        </div>
                        <div className="mt-4">
                            <h3 className="text-[28px] font-bold text-white tracking-tight">{stat.value}</h3>
                            <div className="flex items-center justify-between mt-1">
                                <p className="text-[13px] text-[#8E8E93] font-medium">{stat.title}</p>
                                <p className="text-[11px] text-[#8E8E93] uppercase">{stat.period}</p>
                            </div>
                        </div>
                    </MotionDiv>
                ))}
            </div>

            {/* ───── MAIN CHARTS ROW ───── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Volume Area Chart */}
                <MotionDiv variants={item} className="lg:col-span-2 liquid-glass-card rounded-[24px] p-6 border border-[rgba(255,255,255,0.08)] bg-[rgba(20,20,22,0.4)] relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-ios-blue/10 blur-[100px] rounded-full pointer-events-none -mt-40 -mr-40 group-hover:bg-ios-blue/20 transition-colors duration-1000"></div>
                    <div className="mb-6 z-10 relative">
                        <h3 className="text-[18px] font-bold text-white tracking-tight">Trade Volume Over Time</h3>
                        <p className="text-[13px] text-[#8E8E93]">Total network transaction value in Barter Credits</p>
                    </div>
                    <div className="h-[300px] w-full z-10 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={volumeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorNetVol" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#007AFF" stopOpacity={0.4}/>
                                        <stop offset="95%" stopColor="#007AFF" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="name" stroke="#8E8E93" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                                <YAxis stroke="#8E8E93" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => \`$\${val/1000}k\`} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: 'rgba(20,20,22,0.9)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                                    cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }}
                                />
                                <Area type="monotone" dataKey="value" stroke="#007AFF" strokeWidth={4} fillOpacity={1} fill="url(#colorNetVol)" activeDot={{ r: 8, fill: '#007AFF', stroke: '#1C1C1E', strokeWidth: 3 }} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </MotionDiv>

                {/* Match Score Distribution Histogram */}
                <MotionDiv variants={item} className="liquid-glass-card rounded-[24px] p-6 border border-[rgba(255,255,255,0.08)] bg-[rgba(20,20,22,0.4)] relative">
                    <div className="mb-6">
                        <h3 className="text-[18px] font-bold text-white tracking-tight">Match Score Distribution</h3>
                        <p className="text-[13px] text-[#8E8E93]">AI accuracy histogram</p>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={matchScoreData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#AF52DE" stopOpacity={0.9}/>
                                        <stop offset="95%" stopColor="#AF52DE" stopOpacity={0.2}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="name" stroke="#8E8E93" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                                <YAxis stroke="#8E8E93" fontSize={11} tickLine={false} axisLine={false} />
                                <Tooltip 
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }} 
                                    contentStyle={{ backgroundColor: 'rgba(20,20,22,0.9)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                />
                                <Bar dataKey="value" fill="url(#colorBar)" radius={[6, 6, 0, 0]} barSize={32} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </MotionDiv>

            </div>

            {/* ───── BOTTOM ROW ───── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Donut Chart */}
                <MotionDiv variants={item} className="liquid-glass-card rounded-[24px] p-6 border border-[rgba(255,255,255,0.08)] bg-[rgba(20,20,22,0.4)] relative overflow-hidden">
                     <div className="mb-6">
                        <h3 className="text-[18px] font-bold text-white tracking-tight">Category Distribution</h3>
                        <p className="text-[13px] text-[#8E8E93]">Top traded resources by volume</p>
                    </div>
                    <div className="h-[240px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie 
                                    data={currentCategoryData} 
                                    cx="50%" cy="50%" 
                                    innerRadius={75} outerRadius={105} 
                                    paddingAngle={3} dataKey="value" stroke="none"
                                >
                                    {currentCategoryData.map((entry, index) => (
                                        <Cell key={\`cell-\${index}\`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: 'rgba(20,20,22,0.9)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-4">
                            <span className="text-[32px] font-bold text-white tracking-tight">100%</span>
                            <span className="text-[11px] text-[#8E8E93] font-semibold uppercase tracking-widest mt-0.5">Total Share</span>
                        </div>
                    </div>
                </MotionDiv>

                {/* Top Trading Partners */}
                <MotionDiv variants={item} className="lg:col-span-2 liquid-glass-card rounded-[24px] p-6 border border-[rgba(255,255,255,0.08)] bg-[rgba(20,20,22,0.4)] relative">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h3 className="text-[18px] font-bold text-white tracking-tight">Top Trading Partners</h3>
                            <p className="text-[13px] text-[#8E8E93]">Users with highest successful exchange volume</p>
                        </div>
                        <button className="bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.1)] text-white text-[13px] font-medium px-4 py-2 rounded-[10px] transition-colors border border-[rgba(255,255,255,0.05)]">
                            View Leaderboard
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[rgba(255,255,255,0.06)]">
                                    <th className="py-3 px-4 text-[11px] font-medium text-[#8E8E93] uppercase tracking-wider">Partner</th>
                                    <th className="py-3 px-4 text-[11px] font-medium text-[#8E8E93] uppercase tracking-wider">Volume (30D)</th>
                                    <th className="py-3 px-4 text-[11px] font-medium text-[#8E8E93] uppercase tracking-wider">Trades</th>
                                    <th className="py-3 px-4 text-[11px] font-medium text-[#8E8E93] uppercase tracking-wider">AI Score</th>
                                    <th className="py-3 px-4 text-[11px] font-medium text-[#8E8E93] uppercase tracking-wider text-right">Trend</th>
                                </tr>
                            </thead>
                            <tbody>
                                {partnersData.map((partner, i) => (
                                    <tr key={i} className="border-b border-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                                        <td className="py-4 px-4 text-white font-medium flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1C1C1E] to-[#2C2C2E] flex items-center justify-center border border-[rgba(255,255,255,0.1)] text-[11px] text-white">
                                                {partner.name[0]}
                                            </div>
                                            {partner.name}
                                        </td>
                                        <td className="py-4 px-4 text-white font-bold">{partner.volume}</td>
                                        <td className="py-4 px-4 text-[#EBEBF5]">{partner.trades}</td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 bg-[rgba(255,255,255,0.1)] h-1.5 rounded-full overflow-hidden">
                                                    <div className="h-full bg-[#AF52DE] rounded-full" style={{ width: \`\${partner.score}%\` }}></div>
                                                </div>
                                                <span className="text-[12px] text-white">{partner.score}%</span>
                                            </div>
                                        </td>
                                        <td className={\`py-4 px-4 text-[13px] font-bold text-right \${partner.trend.startsWith('+') ? 'text-ios-green' : 'text-ios-red'}\`}>
                                            {partner.trend}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </MotionDiv>

            </div>

        </MotionDiv>
    );
}

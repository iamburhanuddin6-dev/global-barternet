'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useBarterStore } from '@/store/barterStore';
import {
  TrendingUp,
  TrendingDown,
  Users,
  ArrowLeftRight,
  Brain,
  Timer,
  DollarSign,
  Activity,
  Zap,
  Bell,
  Search,
  CheckCircle,
  Clock,
  MoreHorizontal,
  Sparkles,
  ArrowRight,
  Globe,
  Shield,
  Flame,
  ChevronRight,
  Star,
  Award,
  BarChart3,
  Bot
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';

/* ───── ANIMATION VARIANTS ───── */
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

/* ───── ANIMATED COUNTER ───── */
function AnimatedNumber({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else { setCount(start); }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return <>{target >= 100 ? Math.floor(count).toLocaleString() : count.toFixed(1)}</>;
}

/* ───── LIVE PULSE DOT ───── */
function PulseDot({ color }: { color: string }) {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: color }} />
      <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: color }} />
    </span>
  );
}

/* ───── MOCK DATA ───── */
const networkData = [
  { name: 'Mon', volume: 4000, trades: 120 },
  { name: 'Tue', volume: 3200, trades: 98 },
  { name: 'Wed', volume: 5100, trades: 145 },
  { name: 'Thu', volume: 2780, trades: 87 },
  { name: 'Fri', volume: 6890, trades: 201 },
  { name: 'Sat', volume: 4390, trades: 156 },
  { name: 'Sun', volume: 5490, trades: 178 },
];

const distributionData = [
  { name: 'Computing', value: 400, color: '#5AC8FA' },
  { name: 'Services', value: 300, color: '#AF52DE' },
  { name: 'Data', value: 300, color: '#34C759' },
  { name: 'Education', value: 200, color: '#FF2D55' },
];

const weeklyBarData = [
  { day: 'M', value: 35 }, { day: 'T', value: 52 }, { day: 'W', value: 41 },
  { day: 'T', value: 68 }, { day: 'F', value: 55 }, { day: 'S', value: 30 }, { day: 'S', value: 44 },
];

const liveAgentFeed = [
  { agent: 'NOVA', action: 'Found 96.2% match: GPU Hours ↔ ML Dataset', time: 'Just now', color: '#007AFF', emoji: '🤖' },
  { agent: 'ATLAS', action: 'Negotiating trade #1247 — counter-offer sent', time: '2m ago', color: '#AF52DE', emoji: '🧠' },
  { agent: 'SENTINEL', action: 'Verified tx: 0xabc...def on Ethereum ✓', time: '5m ago', color: '#34C759', emoji: '🛡️' },
  { agent: 'ORACLE', action: 'Market insight: Tech resources trending +23%', time: '12m ago', color: '#5AC8FA', emoji: '🔮' },
];

const recentTrades = [
  { traders: ['Alex C.', 'Maria S.'], pair: 'GPU Time ↔ ML Dataset', score: 98, status: 'Completed', time: '2m ago' },
  { traders: ['James W.', 'Priya P.'], pair: 'UX Sprint ↔ Cloud Credits', score: 87, status: 'Pending', time: '14m ago' },
  { traders: ['David K.', 'Emma W.'], pair: 'Smart Contract ↔ React Nav', score: 91, status: 'Negotiating', time: '1h ago' },
  { traders: ['Raj M.', 'Sarah L.'], pair: 'API Dev ↔ DevOps Pipeline', score: 94, status: 'Completed', time: '3h ago' },
];

const achievements = [
  { name: 'First Trade', icon: '🎯', earned: true },
  { name: '10 Exchanges', icon: '🔥', earned: true },
  { name: 'Top Rated', icon: '⭐', earned: true },
  { name: 'AI Expert', icon: '🤖', earned: false },
  { name: 'Blockchain Pro', icon: '⛓️', earned: false },
];

/* ═══════════════════════════════════
   DASHBOARD PAGE
═══════════════════════════════════ */
export default function DashboardPage() {
  const { metrics, fetchMetrics, fetchResources } = useBarterStore();
  const { data: session } = useSession();
  const [selectedRange, setSelectedRange] = useState('7D');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    fetchMetrics();
    fetchResources({ limit: 6 });
  }, [fetchMetrics, fetchResources]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const userName = session?.user?.name?.split(' ')[0] || 'Trader';

  const kpiCards = [
    { title: 'Network Value', value: '$2.4B', numericValue: 2.4, suffix: 'B', change: 12.5, icon: DollarSign, color: '#007AFF', gradient: 'from-[#007AFF]/20 to-[#007AFF]/5' },
    { title: 'Active Users', value: '24,891', numericValue: 24891, change: 8.2, icon: Users, color: '#5AC8FA', gradient: 'from-[#5AC8FA]/20 to-[#5AC8FA]/5' },
    { title: 'Exchange Volume', value: '1,247', numericValue: 1247, change: 15.3, icon: ArrowLeftRight, color: '#34C759', gradient: 'from-[#34C759]/20 to-[#34C759]/5' },
    { title: 'AI Match Rate', value: '99.7%', numericValue: 99.7, change: 0.5, icon: Brain, color: '#AF52DE', gradient: 'from-[#AF52DE]/20 to-[#AF52DE]/5' },
    { title: 'Avg Match Time', value: '0.8s', numericValue: 0.8, suffix: 's', change: -12.4, icon: Timer, color: '#FF9500', gradient: 'from-[#FF9500]/20 to-[#FF9500]/5' },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-[1400px] mx-auto">
      
      {/* ═══ WELCOME HERO SECTION ═══ */}
      <motion.div variants={item} className="relative overflow-hidden rounded-[28px] liquid-glass-hero p-8 md:p-10">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-ios-blue/[0.08] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-1/4 w-[200px] h-[200px] bg-ios-purple/[0.06] rounded-full blur-[60px] translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-[150px] h-[150px] bg-ios-green/[0.04] rounded-full blur-[50px]" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 mb-3"
            >
              <PulseDot color="#34C759" />
              <span className="text-[12px] font-medium text-ios-green uppercase tracking-wider">Network Active</span>
            </motion.div>
            <h1 className="text-[32px] md:text-[38px] font-extrabold text-white tracking-tight leading-tight">
              {greeting}, <span className="bg-gradient-to-r from-ios-blue via-ios-purple to-ios-teal bg-clip-text text-transparent">{userName}</span>
            </h1>
            <p className="text-[#8E8E93] text-[16px] mt-2 max-w-md leading-relaxed">
              Your trading network is thriving. <span className="text-ios-green font-medium">+247 new trades</span> since your last visit.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-5">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-ios-blue text-white text-[14px] font-semibold px-6 py-2.5 rounded-[14px] flex items-center gap-2 shadow-[0_4px_20px_rgba(0,122,255,0.3)] hover:shadow-[0_6px_30px_rgba(0,122,255,0.4)] transition-shadow"
              >
                <Sparkles className="w-4 h-4" />
                Find Matches
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="liquid-glass-btn text-white text-[14px] font-medium px-6 py-2.5 rounded-[14px] flex items-center gap-2"
              >
                <Globe className="w-4 h-4 text-ios-teal" />
                Explore Market
              </motion.button>
            </div>
          </div>

          {/* Quick Stats mini-cards in hero */}
          <div className="flex gap-3 flex-wrap md:flex-nowrap">
            {[
              { label: 'Your Trades', value: '42', icon: ArrowLeftRight, change: '+8', color: '#007AFF' },
              { label: 'Trust Score', value: '94%', icon: Shield, change: '+2.1', color: '#34C759' },
              { label: 'AI Matches', value: '156', icon: Bot, change: '+23', color: '#AF52DE' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="liquid-glass-card px-5 py-4 rounded-[18px] min-w-[130px]"
              >
                <stat.icon className="w-4 h-4 mb-2" style={{ color: stat.color }} />
                <p className="text-[22px] font-bold text-white tracking-tight">{stat.value}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-[11px] text-[#8E8E93]">{stat.label}</p>
                  <span className="text-[10px] text-ios-green font-medium">{stat.change}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ═══ KPI METRIC CARDS ═══ */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {kpiCards.map((kpi, i) => (
          <motion.div key={i} variants={item} className="liquid-glass-card p-5 rounded-[20px] relative overflow-hidden group cursor-pointer">
            {/* Gradient background accent */}
            <div className={`absolute inset-0 bg-gradient-to-br ${kpi.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-[12px] flex items-center justify-center" style={{ backgroundColor: kpi.color + '15' }}>
                  <kpi.icon className="w-5 h-5" style={{ color: kpi.color }} strokeWidth={1.8} />
                </div>
                <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-[12px] font-medium bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.05)] ${kpi.change >= 0 ? 'text-ios-green' : 'text-ios-red'}`}>
                  {kpi.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {Math.abs(kpi.change)}%
                </div>
              </div>
              <p className="text-[24px] font-bold text-white tracking-tight">{kpi.value}</p>
              <p className="text-[13px] text-[#8E8E93] font-medium mt-0.5">{kpi.title}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ═══ MAIN CONTENT GRID ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Network Activity Chart */}
        <motion.div variants={item} className="lg:col-span-2 liquid-glass-card rounded-[24px] p-6 relative group overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-[16px] font-semibold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-ios-blue" />
                Network Activity
              </h3>
              <p className="text-[13px] text-[#8E8E93] mt-0.5">Trade volume & activity over the last 7 days</p>
            </div>
            <div className="flex bg-[rgba(255,255,255,0.05)] rounded-[10px] p-0.5 border border-[rgba(255,255,255,0.05)]">
              {['1D', '7D', '1M'].map((range) => (
                <button 
                  key={range} 
                  onClick={() => setSelectedRange(range)}
                  className={`px-3 py-1.5 text-[12px] font-medium rounded-[8px] transition-all ${
                    selectedRange === range 
                      ? 'bg-ios-blue text-white shadow-md' 
                      : 'text-[#8E8E93] hover:text-white'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={networkData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#007AFF" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#007AFF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="name" stroke="#8E8E93" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#8E8E93" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val / 1000}k`} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(20,20,22,0.9)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', color: '#fff', padding: '12px 16px' }}
                  itemStyle={{ color: '#fff' }}
                  cursor={{ stroke: 'rgba(0,122,255,0.3)', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area type="monotone" dataKey="volume" stroke="#007AFF" strokeWidth={2.5} fillOpacity={1} fill="url(#colorVolume)" activeDot={{ r: 6, fill: '#007AFF', stroke: '#fff', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Resource Distribution */}
        <motion.div variants={item} className="liquid-glass-card rounded-[24px] p-6 relative group overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <h3 className="text-[16px] font-semibold text-white flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-ios-purple" />
            Resource Distribution
          </h3>
          <p className="text-[13px] text-[#8E8E93] mt-0.5 mb-2">Active trades by category</p>
          <div className="h-[200px] w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={distributionData} cx="50%" cy="50%" innerRadius={62} outerRadius={82} paddingAngle={5} dataKey="value" stroke="none">
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(20,20,22,0.9)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[28px] font-bold text-white">1.2K</span>
              <span className="text-[11px] text-[#8E8E93] uppercase tracking-wider font-medium">Total Active</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {distributionData.map(d => (
              <div key={d.name} className="flex items-center gap-2 p-2 rounded-[10px] hover:bg-white/[0.03] transition-colors cursor-pointer">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                <span className="text-[13px] text-white">{d.name}</span>
                <span className="text-[11px] text-[#636366] ml-auto">{d.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ═══ SECOND ROW: AI Feed + Weekly + Achievements ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Live AI Agent Feed */}
        <motion.div variants={item} className="liquid-glass-card rounded-[24px] p-6 relative group overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[16px] font-semibold text-white flex items-center gap-2">
              <Bot className="w-4 h-4 text-ios-blue" />
              AI Agent Feed
            </h3>
            <PulseDot color="#34C759" />
          </div>
          <div className="space-y-3">
            {liveAgentFeed.map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-[14px] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.06)] transition-colors cursor-pointer border border-transparent hover:border-[rgba(255,255,255,0.06)]"
              >
                <span className="text-[18px] mt-0.5">{log.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] leading-relaxed">
                    <span className="font-semibold" style={{ color: log.color }}>{log.agent}</span>
                    <span className="text-[#8E8E93]"> — {log.action}</span>
                  </p>
                  <p className="text-[11px] text-[#48484A] mt-0.5">{log.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Weekly Performance Bar Chart */}
        <motion.div variants={item} className="liquid-glass-card rounded-[24px] p-6 relative group overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <h3 className="text-[16px] font-semibold text-white flex items-center gap-2 mb-1">
            <Flame className="w-4 h-4 text-ios-orange" />
            Weekly Performance
          </h3>
          <p className="text-[13px] text-[#8E8E93] mb-4">Your trading streak this week</p>
          
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyBarData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="day" stroke="#8E8E93" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#8E8E93" fontSize={11} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(20,20,22,0.9)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="value" fill="#FF9500" radius={[6, 6, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
            <div>
              <p className="text-[20px] font-bold text-white">325</p>
              <p className="text-[11px] text-[#8E8E93]">Total this week</p>
            </div>
            <div className="flex items-center gap-1 text-ios-green text-[13px] font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              +18.7%
            </div>
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div variants={item} className="liquid-glass-card rounded-[24px] p-6 relative group overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <h3 className="text-[16px] font-semibold text-white flex items-center gap-2 mb-1">
            <Award className="w-4 h-4 text-ios-yellow" />
            Achievements
          </h3>
          <p className="text-[13px] text-[#8E8E93] mb-4">Your trading milestones</p>

          <div className="space-y-3">
            {achievements.map((ach, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 p-3 rounded-[14px] transition-all ${
                  ach.earned 
                    ? 'bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.06)]' 
                    : 'bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.03)] opacity-50'
                }`}
              >
                <span className="text-[22px]">{ach.icon}</span>
                <span className="text-[14px] font-medium text-white flex-1">{ach.name}</span>
                {ach.earned ? (
                  <CheckCircle className="w-4 h-4 text-ios-green" />
                ) : (
                  <Clock className="w-4 h-4 text-[#636366]" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
            <div className="flex justify-between items-center">
              <span className="text-[13px] text-[#8E8E93]">Progress</span>
              <span className="text-[13px] text-white font-semibold">3/5</span>
            </div>
            <div className="mt-2 w-full h-2 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '60%' }}
                transition={{ delay: 1, duration: 0.8, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-ios-blue to-ios-purple rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ═══ RECENT TRADES TABLE ═══ */}
      <motion.div variants={item} className="liquid-glass-card rounded-[24px] p-6 relative group overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[16px] font-semibold text-white flex items-center gap-2">
            <ArrowLeftRight className="w-4 h-4 text-ios-green" />
            Recent Trades
          </h3>
          <button className="text-[13px] text-ios-blue hover:text-white transition-colors font-medium flex items-center gap-1 group/btn">
            View All
            <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                <th className="py-3 px-4 text-[12px] font-medium text-[#8E8E93] uppercase tracking-wider">Traders</th>
                <th className="py-3 px-4 text-[12px] font-medium text-[#8E8E93] uppercase tracking-wider">Exchange Pair</th>
                <th className="py-3 px-4 text-[12px] font-medium text-[#8E8E93] uppercase tracking-wider">AI Score</th>
                <th className="py-3 px-4 text-[12px] font-medium text-[#8E8E93] uppercase tracking-wider">Status</th>
                <th className="py-3 px-4 text-right"></th>
              </tr>
            </thead>
            <tbody>
              {recentTrades.map((trade, i) => (
                <motion.tr 
                  key={i} 
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.08 }}
                  className="border-b border-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.03)] transition-colors group/row cursor-pointer"
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                       <div className="flex -space-x-2">
                         <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ios-blue to-ios-purple flex items-center justify-center text-[10px] font-bold text-white border-2 border-black z-10">{trade.traders[0][0]}</div>
                         <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ios-teal to-ios-green flex items-center justify-center text-[10px] font-bold text-white border-2 border-black">{trade.traders[1][0]}</div>
                       </div>
                       <span className="text-[14px] text-white flex flex-col leading-tight ml-2">
                         <span className="font-medium">{trade.traders[0]}</span>
                         <span className="text-[12px] text-[#8E8E93]">with {trade.traders[1]}</span>
                       </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 text-[14px] text-white">
                      <Zap className="w-4 h-4 text-ios-orange" />
                      {trade.pair}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                       <div className="w-full bg-[rgba(255,255,255,0.1)] h-1.5 rounded-full max-w-[80px] overflow-hidden">
                         <div className="h-full bg-ios-blue rounded-full transition-all" style={{ width: `${trade.score}%` }} />
                       </div>
                       <span className="text-[13px] text-white font-medium">{trade.score}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5">
                      {trade.status === 'Completed' ? <CheckCircle className="w-4 h-4 text-ios-green" /> : 
                       trade.status === 'Pending' ? <Clock className="w-4 h-4 text-ios-orange" /> :
                       <Activity className="w-4 h-4 text-ios-purple" />}
                      <span className={`text-[13px] font-medium ${trade.status === 'Completed' ? 'text-ios-green' : trade.status === 'Pending' ? 'text-ios-orange' : 'text-ios-purple'}`}>
                        {trade.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button className="text-[#8E8E93] hover:text-white p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

    </motion.div>
  );
}

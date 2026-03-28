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

/* ----- ANIMATION VARIANTS ----- */
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

/* ----- ANIMATED COUNTER ----- */
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

/* ----- LIVE PULSE DOT ----- */
function PulseDot({ color }: { color: string }) {
  return (
    <span className="relative flex h-2.5 w-2.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: color }} />
      <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ backgroundColor: color }} />
    </span>
  );
}

/* ----- MOCK DATA ----- */
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
  const { metrics, exchanges, fetchMetrics, fetchResources, fetchExchanges } = useBarterStore();
  const { data: session } = useSession();
  const [selectedRange, setSelectedRange] = useState('7D');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    fetchMetrics();
    fetchResources({ limit: 6 });
    fetchExchanges({ limit: 4 });
  }, [fetchMetrics, fetchResources, fetchExchanges]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const userName = session?.user?.name?.split(' ')[0] || 'Trader';

  // Dynamic DB Metrics with Mock Data fallback for visually appealing Client Demo when empty
  const isDBEmpty = metrics.networkValue === 0 && metrics.activeUsers === 0;

  const kpiCards = [
    { 
      title: 'Network Value', 
      value: isDBEmpty ? '$2.4B' : `$${(metrics.networkValue / 1000).toFixed(1)}K`, 
      numericValue: isDBEmpty ? 2.4 : metrics.networkValue, 
      suffix: isDBEmpty ? 'B' : 'K', 
      change: isDBEmpty ? 12.5 : metrics.networkValueChange, 
      icon: DollarSign, color: 'var(--ios-blue)', gradient: 'from-[#007AFF]/20 to-[#007AFF]/5' 
    },
    { 
      title: 'Active Users', 
      value: isDBEmpty ? '24,891' : metrics.activeUsers.toLocaleString(), 
      numericValue: isDBEmpty ? 24891 : metrics.activeUsers, 
      change: isDBEmpty ? 8.2 : metrics.activeUsersChange, 
      icon: Users, color: 'var(--ios-teal)', gradient: 'from-[#5AC8FA]/20 to-[#5AC8FA]/5' 
    },
    { 
      title: 'Exchange Volume', 
      value: isDBEmpty ? '1,247' : metrics.exchangeVolume.toLocaleString(), 
      numericValue: isDBEmpty ? 1247 : metrics.exchangeVolume, 
      change: isDBEmpty ? 15.3 : metrics.volumeChange, 
      icon: ArrowLeftRight, color: 'var(--ios-green)', gradient: 'from-[#34C759]/20 to-[#34C759]/5' 
    },
    { 
      title: 'AI Match Rate', 
      value: isDBEmpty ? '99.7%' : `${metrics.aiEfficiency}%`, 
      numericValue: isDBEmpty ? 99.7 : metrics.aiEfficiency, 
      change: isDBEmpty ? 0.5 : metrics.efficiencyChange, 
      icon: Brain, color: 'var(--ios-purple)', gradient: 'from-[#AF52DE]/20 to-[#AF52DE]/5' 
    },
    { 
      title: 'Avg Match Time', 
      value: isDBEmpty ? '0.8s' : `${metrics.avgMatchTime}s`, 
      numericValue: isDBEmpty ? 0.8 : metrics.avgMatchTime, 
      suffix: 's', 
      change: isDBEmpty ? -12.4 : metrics.matchTimeChange, 
      icon: Timer, color: 'var(--ios-orange)', gradient: 'from-[#FF9500]/20 to-[#FF9500]/5' 
    },
  ];

  const dynamicRecentTrades = isDBEmpty || exchanges.length === 0 ? recentTrades : exchanges.slice(0, 4).map(e => ({
    traders: [e.sender?.name || 'Unknown', e.receiver?.name || 'Unknown'],
    pair: `${e.offeredResource?.name || 'Resource'} ↔ ${e.requestedResource?.name || 'Resource'}`,
    score: e.aiMatchScore || 0,
    status: e.status.charAt(0).toUpperCase() + e.status.slice(1),
    time: new Date(e.createdAt).toLocaleDateString()
  }));

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 md:space-y-8 max-w-[1500px] mx-auto pb-20 px-4 md:px-0">
      
      {/* ═══ UNIQUE BENTO ISLAND HERO ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
        
        {/* Left: Interactive Welcome Island (Large) */}
        <motion.div variants={item} className="lg:col-span-3 relative overflow-hidden rounded-[24px] md:rounded-[32px] liquid-glass-hero p-6 md:p-12 min-h-[auto] md:min-h-[300px] flex flex-col justify-center">
          {/* Holographic Background Orbs */}
          <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-ios-blue/[0.12] rounded-full blur-[100px] animate-pulse-soft" />
          <div className="absolute bottom-[-20%] left-[10%] w-[300px] h-[300px] bg-ios-purple/[0.1] rounded-full blur-[80px]" />
          <div className="absolute top-[20%] left-[40%] w-[200px] h-[200px] bg-ios-teal/[0.08] rounded-full blur-[60px]" />
          
          <div className="relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ios-green/10 border border-ios-green/20 mb-6"
            >
              <PulseDot color="var(--ios-green)" />
              <span className="text-[11px] font-bold text-ios-green uppercase tracking-[0.15em]">Neural Link: Active</span>
            </motion.div>
            
            <h1 className="text-[28px] sm:text-[36px] md:text-[48px] font-black text-label-primary tracking-tighter leading-[1.1] mb-4">
              {greeting}, <br/>
              <span className="bg-gradient-to-r from-ios-blue via-ios-purple to-ios-orange bg-clip-text text-transparent italic">
                {userName}.
              </span>
            </h1>
            
            <p className="text-[#8E8E93] text-[17px] max-w-lg leading-relaxed font-medium">
              The aggregate network liquidity has grown by <span className="text-ios-blue">₿ 12.4M</span> today. Our AI matched <span className="text-label-primary">42 high-value trades</span> for your assets.
            </p>
            
            <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-6 md:mt-10">
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-ios-blue text-label-primary text-[14px] md:text-[15px] font-bold px-6 md:px-8 py-3.5 md:py-4 rounded-[16px] md:rounded-[20px] flex items-center justify-center gap-3 shadow-[0_12px_40px_rgba(0,122,255,0.3)] hover:shadow-[0_15px_45px_rgba(0,122,255,0.4)] transition-all"
              >
                <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
                Start Trading
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto liquid-glass-btn text-label-primary text-[14px] md:text-[15px] font-bold px-6 md:px-8 py-3.5 md:py-4 rounded-[16px] md:rounded-[20px] border border-white/10 flex items-center justify-center gap-3"
              >
                <Bot className="w-4 h-4 md:w-5 md:h-5 text-ios-purple" />
                Watch AI Demo
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Right: Trade Coordination Stack (Vertical) */}
        <motion.div variants={item} className="lg:col-span-1 liquid-glass-card rounded-[32px] p-6 flex flex-col group overflow-hidden border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-br from-ios-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
               <h3 className="text-[17px] font-bold text-label-primary">Coordination</h3>
               <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-ios-blue/10 border border-ios-blue/20">
                  <Activity className="w-3 h-3 text-ios-blue animate-pulse" />
                  <span className="text-[10px] font-black text-ios-blue uppercase tracking-widest">Active</span>
               </div>
            </div>
            
            <div className="space-y-3 flex-1">
               {[
                 { label: 'Neural Matching', val: 84, color: 'var(--ios-blue)' },
                 { label: 'Liquidity Bridge', val: 62, color: 'var(--ios-purple)' },
                 { label: 'Protocol Health', val: 99, color: 'var(--ios-green)' }
               ].map((task, idx) => (
                 <div key={idx} className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[11px] font-bold uppercase tracking-wider text-[#8E8E93]">{task.label}</span>
                       <span className="text-[11px] font-black italic" style={{ color: task.color }}>{task.val}%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                       <motion.div 
                          initial={{ width: 0 }} 
                          animate={{ width: `${task.val}%` }} 
                          transition={{ duration: 1, delay: idx * 0.1 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: task.color }}
                       />
                    </div>
                 </div>
               ))}
            </div>

            <div className="pt-4 mt-6 border-t border-white/5 flex items-center justify-between">
               <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-[var(--background)] bg-ios-blue/20 flex items-center justify-center text-[10px] font-bold">A{i}</div>
                  ))}
               </div>
               <span className="text-[10px] font-bold text-[#636366] uppercase">3 Linked Agents</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ═══ METRIC BENTO GRID (Varied Sizes) ═══ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
        
        {/* Large Stat: Network Value */}
        <motion.div variants={item} className="col-span-1 sm:col-span-2 lg:col-span-2 liquid-glass-card rounded-[24px] md:rounded-[28px] p-6 md:p-8 relative group overflow-hidden min-h-[160px] md:min-h-[180px]">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110 duration-700">
            <DollarSign className="w-24 h-24 text-ios-blue" />
          </div>
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <p className="text-[11px] md:text-[13px] font-bold text-[#8E8E93] uppercase tracking-widest mb-1">Aggregate Network Value</p>
              <h2 className="text-[32px] md:text-[42px] font-black text-label-primary tracking-tighter leading-none">
                <AnimatedNumber target={isDBEmpty ? 2.4 : metrics.networkValue / 1000} />{isDBEmpty ? 'B' : 'K'}
              </h2>
            </div>
            <div className="flex items-center gap-2 text-ios-green text-[14px] font-bold mt-4">
              <TrendingUp className="w-4 h-4" />
              +12.5% <span className="text-[#636366] font-normal italic ml-1">last 24h</span>
            </div>
          </div>
        </motion.div>

        {/* Medium Stats: Dynamic Resource Heatmap */}
        <motion.div variants={item} className="col-span-1 sm:col-span-2 lg:col-span-2 liquid-glass-card rounded-[24px] md:rounded-[28px] p-5 md:p-6 group relative overflow-hidden">
           <div className="flex items-center justify-between mb-4">
              <p className="text-[13px] text-[#8E8E93] font-bold uppercase tracking-wider">Demand Heatmap</p>
              <TrendingUp className="w-4 h-4 text-ios-green" />
           </div>
           <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="h-6 rounded-md transition-all hover:scale-110" style={{ 
                  backgroundColor: `rgba(0, 122, 255, ${0.1 + (Math.random() * 0.8)})`,
                  border: '1px solid rgba(255,255,255,0.05)'
                }} />
              ))}
           </div>
           <p className="text-[10px] text-[#636366] mt-4 font-bold uppercase tracking-widest">Global Sector: Energy & Compute</p>
        </motion.div>

        {/* Large Stat: AI Efficiency (Horizontal/Varied) */}
        <motion.div variants={item} className="col-span-1 sm:col-span-2 lg:col-span-1 liquid-glass-card rounded-[24px] md:rounded-[28px] p-5 md:p-6 bg-gradient-to-br from-ios-purple/10 to-transparent flex flex-col justify-between border border-ios-purple/20">
           <div className="flex justify-between items-start">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-[10px] md:rounded-[14px] flex items-center justify-center bg-ios-purple/10">
                 <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-ios-purple" strokeWidth={2} />
              </div>
              <div className="flex items-center gap-1 text-ios-purple text-[10px] md:text-[11px] font-black uppercase tracking-widest border border-ios-purple/20 px-2 py-1 rounded-md">
                 Optimal
              </div>
           </div>
           <div>
              <h2 className="text-[28px] md:text-[32px] font-black text-label-primary tracking-tight">{isDBEmpty ? '99.7%' : `${metrics.aiEfficiency}%`}</h2>
              <p className="text-[11px] md:text-[13px] text-ios-purple/80 font-bold uppercase tracking-widest">Match Efficiency</p>
           </div>
        </motion.div>
      </div>

      {/* ═══ CORE INFRASTRUCTURE VISUALS ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Intelligence Chart (Modern Bento) */}
        <motion.div variants={item} className="lg:col-span-2 liquid-glass-card rounded-[24px] md:rounded-[32px] p-6 md:p-8 relative overflow-hidden group">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-ios-blue/10 flex items-center justify-center border border-ios-blue/20">
                 <Activity className="w-5 h-5 md:w-6 md:h-6 text-ios-blue" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-[16px] md:text-[18px] font-bold text-label-primary">Trade Flux Analysis</h3>
                <p className="text-[12px] md:text-[13px] text-[#8E8E93] font-medium tracking-tight">AI-predicted volatility vs. actual exchange density</p>
              </div>
            </div>
            
            <div className="flex bg-[var(--background)] rounded-full p-1 border border-white/5 self-start sm:self-auto">
              {['1D', '7D', '1M'].map((range) => (
                <button 
                  key={range} 
                  onClick={() => setSelectedRange(range)}
                  className={`px-4 py-2 text-[12px] font-bold rounded-full transition-all ${
                    selectedRange === range 
                      ? 'bg-ios-blue text-label-primary shadow-lg scale-105' 
                      : 'text-[#8E8E93] hover:text-label-primary'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
          
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={networkData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C88A54" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#C88A54" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                <XAxis dataKey="name" stroke="#636366" fontSize={11} fontWeight={600} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#636366" fontSize={11} fontWeight={600} tickLine={false} axisLine={false} tickFormatter={(val) => `${val / 1000}k`} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(28,22,20,0.9)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px' }}
                  itemStyle={{ color: 'var(--text-primary)', fontWeight: 700 }}
                  cursor={{ stroke: 'rgba(200,138,84,0.3)', strokeWidth: 2 }}
                />
                <Area type="monotone" dataKey="volume" stroke="#C88A54" strokeWidth={4} fillOpacity={1} fill="url(#colorVolume)" activeDot={{ r: 8, fill: '#C88A54', stroke: '#fff', strokeWidth: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* AI Agent Real-time Terminal (Narrow Vertical) */}
        <motion.div variants={item} className="lg:col-span-1 liquid-glass-card rounded-[32px] p-8 flex flex-col group border border-ios-blue/10">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-[17px] font-bold text-label-primary flex items-center gap-3">
                 <Bot className="w-5 h-5 text-ios-blue" />
                 Neural Feed
              </h3>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-ios-green/10 border border-ios-green/20">
                 <div className="w-2 h-2 rounded-full bg-ios-green animate-pulse" />
                 <span className="text-[10px] font-black text-ios-green uppercase tracking-widest">Live</span>
              </div>
           </div>

           <div className="flex-1 space-y-6 overflow-hidden">
              {liveAgentFeed.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-5 border-l border-white/5 py-1"
                >
                  <div className="absolute left-[-4.5px] top-2 w-2 h-2 rounded-full bg-label-primary/20 group-hover:bg-ios-blue transition-colors" />
                  <p className="text-[11px] font-bold text-ios-blue uppercase tracking-widest mb-1">{log.agent}</p>
                  <p className="text-[13px] text-label-primary leading-tight font-medium mb-1">{log.action}</p>
                  <p className="text-[10px] text-[#636366] font-bold">{log.time}</p>
                </motion.div>
              ))}
           </div>
           
           <button className="w-full py-4 mt-8 rounded-[18px] bg-white/5 border border-white/5 text-[13px] font-bold text-[#8E8E93] hover:text-label-primary hover:bg-white/10 transition-all uppercase tracking-widest">
              View All Protocol Logs
           </button>
        </motion.div>
      </div>

      {/* ═══ FINAL SECTION: ASYMMETRIC BENTO ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
         
          {/* Distribution Bento */}
          <motion.div variants={item} className="liquid-glass-card rounded-[24px] md:rounded-[32px] p-6 md:p-8 group">
             <h3 className="text-[16px] md:text-[18px] font-bold text-label-primary mb-6 md:mb-8 flex items-center gap-3">
                <PieChart className="w-4 h-4 md:w-5 md:h-5 text-ios-teal" />
                Global Liquidity Pool
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
                <div className="h-[180px] md:h-[220px] relative">
                   <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                       <Pie data={distributionData} cx="50%" cy="50%" innerRadius={Math.min(60, 75)} outerRadius={Math.min(75, 95)} paddingAngle={8} dataKey="value" stroke="none">
                         {distributionData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} />
                         ))}
                       </Pie>
                     </PieChart>
                   </ResponsiveContainer>
                   <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-[24px] md:text-[32px] font-black text-label-primary">1.2K</span>
                      <span className="text-[9px] md:text-[11px] text-[#636366] font-black uppercase tracking-widest">Trades</span>
                   </div>
                </div>
                <div className="space-y-3 md:space-y-4">
                   {distributionData.map(d => (
                     <div key={d.name} className="flex flex-col gap-1 p-2.5 md:p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-2">
                              <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                              <span className="text-[12px] md:text-[14px] font-bold text-label-primary">{d.name}</span>
                           </div>
                           <span className="text-[11px] md:text-[13px] font-black text-[#8E8E93]">{d.value}</span>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </motion.div>
 
          {/* Achievements Island */}
          <motion.div variants={item} className="liquid-glass-card rounded-[24px] md:rounded-[32px] p-6 md:p-8 group overflow-hidden">
             <h3 className="text-[16px] md:text-[18px] font-bold text-label-primary mb-6 md:mb-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <Award className="w-4 h-4 md:w-5 md:h-5 text-ios-yellow" />
                   Neural Trophies
                </div>
                <span className="text-[10px] md:text-[12px] font-black text-[#636366] uppercase tracking-widest">3/5 Milestones</span>
             </h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {achievements.map((ach, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className={`p-4 md:p-5 rounded-2xl flex items-center gap-3 md:gap-4 transition-all relative ${
                      ach.earned 
                        ? 'bg-gradient-to-br from-white/10 to-transparent border border-white/10 shadow-xl' 
                        : 'bg-white/[0.02] border border-white/5 grayscale opacity-40'
                    }`}
                  >
                    <span className="text-[24px] md:text-[28px]">{ach.icon}</span>
                    <div>
                      <p className="text-[14px] md:text-[15px] font-bold text-label-primary leading-none mb-1">{ach.name}</p>
                      <p className="text-[10px] md:text-[11px] text-[#8E8E93] font-medium">{ach.earned ? 'Mission Complete' : 'Protocol Locked'}</p>
                    </div>
                    {ach.earned && <div className="absolute top-3 right-3 w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-ios-green shadow-[0_0_8px_rgba(52,199,89,1)]" />}
                  </motion.div>
                ))}
             </div>
          </motion.div>
      </div>

    </motion.div>
  );
}

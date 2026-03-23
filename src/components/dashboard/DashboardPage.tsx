'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
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
  MoreHorizontal
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.28, 0.84, 0.42, 1] } },
};

function formatValue(val: string | number): string {
  if (typeof val === 'number') {
    if (val >= 1000000000) return (val / 1000000000).toFixed(1) + 'B';
    if (val >= 1000000) return (val / 1000000).toFixed(1) + 'M';
    if (val >= 1000) return (val / 1000).toFixed(1) + 'K';
    return val.toString();
  }
  return val;
}

/* ───── MOCK DATA FOR CHARTS ───── */
const networkData = [
  { name: 'Mon', volume: 4000 },
  { name: 'Tue', volume: 3000 },
  { name: 'Wed', volume: 5000 },
  { name: 'Thu', volume: 2780 },
  { name: 'Fri', volume: 6890 },
  { name: 'Sat', volume: 2390 },
  { name: 'Sun', volume: 3490 },
];

const distributionData = [
  { name: 'Computing', value: 400, color: '#5AC8FA' },
  { name: 'Services', value: 300, color: '#AF52DE' },
  { name: 'Data', value: 300, color: '#34C759' },
  { name: 'Education', value: 200, color: '#FF2D55' },
];

export default function DashboardPage() {
  const { metrics, fetchMetrics, fetchResources } = useBarterStore();
  const { data: session } = useSession();

  useEffect(() => {
    fetchMetrics();
    fetchResources({ limit: 6 });
  }, [fetchMetrics, fetchResources]);

  const userName = session?.user?.name?.split(' ')[0] || 'Trader';

  // Specific 5 KPI cards exactly from prompt
  const kpiCards = [
    { title: 'Network Value', value: '$2.4B', change: 12.5, icon: DollarSign, color: '#007AFF' },
    { title: 'Active Users', value: '24,891', change: 8.2, icon: Users, color: '#5AC8FA' },
    { title: 'Exchange Volume', value: '1,247', change: 15.3, icon: ArrowLeftRight, color: '#34C759' },
    { title: 'AI Match Rate', value: '99.7%', change: 0.5, icon: Brain, color: '#AF52DE' },
    { title: 'Avg Match Time', value: '0.8s', change: -12.4, icon: Timer, color: '#FF9500' },
  ];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6 max-w-[1400px] mx-auto">
      
      {/* ───── TOP HEADER ───── */}
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-white tracking-tight">Dashboard</h1>
          <p className="text-[#8E8E93] text-[15px] mt-1">Welcome back, {userName}. Here's what's happening.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E93]" />
            <input 
              type="text" 
              placeholder="Search network..." 
              className="bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] text-white rounded-full pl-10 pr-4 py-2 text-[14px] focus:outline-none focus:ring-1 focus:ring-ios-blue transition-all w-64 backdrop-blur-xl"
            />
          </div>
          <button className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-white relative hover:bg-[rgba(255,255,255,0.1)] transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-ios-red rounded-full border border-black"></span>
          </button>
        </div>
      </motion.div>

      {/* ───── KPI METRIC CARDS (5 in a row) ───── */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {kpiCards.map((kpi, i) => (
          <motion.div key={i} variants={item} className="liquid-glass-card p-5 rounded-[20px] relative overflow-hidden group">
            {/* Specular shimmer top edge */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
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
          </motion.div>
        ))}
      </div>

      {/* ───── CHARTS ROW ───── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Network Activity Area Chart */}
        <motion.div variants={item} className="lg:col-span-2 liquid-glass-card rounded-[24px] p-6 relative group overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-[16px] font-semibold text-white">Network Activity</h3>
              <p className="text-[13px] text-[#8E8E93]">Trade volume over the last 7 days</p>
            </div>
            <div className="flex bg-[rgba(255,255,255,0.05)] rounded-[10px] p-0.5 border border-[rgba(255,255,255,0.05)]">
              {['1D', '7D', '1M'].map((range, i) => (
                <button key={range} className={`px-3 py-1.5 text-[12px] font-medium rounded-[8px] transition-all ${i === 1 ? 'bg-ios-blue text-white shadow-md' : 'text-[#8E8E93] hover:text-white'}`}>
                  {range}
                </button>
              ))}
            </div>
          </div>
          <div className="h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={networkData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#007AFF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#007AFF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="name" stroke="#8E8E93" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#8E8E93" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => \`\${val / 1000}k\`} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(20,20,22,0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                  cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area type="monotone" dataKey="volume" stroke="#007AFF" strokeWidth={3} fillOpacity={1} fill="url(#colorVolume)" activeDot={{ r: 6, fill: '#007AFF', stroke: '#fff', strokeWidth: 2 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Resource Distribution Donut */}
        <motion.div variants={item} className="liquid-glass-card rounded-[24px] p-6 relative group overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="mb-2">
            <h3 className="text-[16px] font-semibold text-white">Resource Distribution</h3>
            <p className="text-[13px] text-[#8E8E93]">Active trades by category</p>
          </div>
          <div className="h-[220px] w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={distributionData} cx="50%" cy="50%" innerRadius={65} outerRadius={85} paddingAngle={5} dataKey="value" stroke="none">
                  {distributionData.map((entry, index) => (
                    <Cell key={\`cell-\${index}\`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'rgba(20,20,22,0.8)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
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
              <div key={d.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }}></span>
                <span className="text-[13px] text-white">{d.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ───── RECENT TRADES TABLE ───── */}
      <motion.div variants={item} className="liquid-glass-card rounded-[24px] p-6 relative group overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[16px] font-semibold text-white">Recent Trades</h3>
          <button className="text-[13px] text-ios-blue hover:text-white transition-colors font-medium flex items-center gap-1">
            View All
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
              {[
                { traders: ['Alex C.', 'Maria S.'], pair: 'GPU Time ↔ ML Dataset', score: 98, status: 'Completed', time: '2m ago' },
                { traders: ['James W.', 'Priya P.'], pair: 'UX Sprint ↔ Cloud Credits', score: 87, status: 'Pending', time: '14m ago' },
                { traders: ['David K.', 'Emma W.'], pair: 'Smart Contract ↔ React Nav', score: 91, status: 'Negotiating', time: '1h ago' },
                { traders: ['Raj M.', 'Sarah L.'], pair: 'API Dev ↔ DevOps Pipeline', score: 94, status: 'Completed', time: '3h ago' },
              ].map((trade, i) => (
                <tr key={i} className="border-b border-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.02)] transition-colors group/row">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                       <div className="flex -space-x-2">
                         <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ios-blue to-ios-purple flex items-center justify-center text-[10px] font-bold text-white border-2 border-black">{trade.traders[0][0]}</div>
                         <div className="w-8 h-8 rounded-full bg-gradient-to-br from-ios-teal to-ios-green flex items-center justify-center text-[10px] font-bold text-white border-2 border-black">{trade.traders[1][0]}</div>
                       </div>
                       <span className="text-[14px] text-white flex flex-col leading-tight ml-2">
                         <span>{trade.traders[0]} </span>
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
                         <div className="h-full bg-ios-blue rounded-full" style={{ width: \`\${trade.score}%\` }}></div>
                       </div>
                       <span className="text-[13px] text-white font-medium">{trade.score}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5">
                      {trade.status === 'Completed' ? <CheckCircle className="w-4 h-4 text-ios-green" /> : 
                       trade.status === 'Pending' ? <Clock className="w-4 h-4 text-ios-orange" /> :
                       <Activity className="w-4 h-4 text-ios-purple" />}
                      <span className={\`text-[13px] font-medium \${trade.status === 'Completed' ? 'text-ios-green' : trade.status === 'Pending' ? 'text-ios-orange' : 'text-ios-purple'}\`}>
                        {trade.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button className="text-[#8E8E93] hover:text-white p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

    </motion.div>
  );
}

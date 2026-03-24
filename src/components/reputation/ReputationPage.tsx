'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useBarterStore } from '@/store/barterStore';
import {
    Trophy,
    Award,
    Flame,
    Crown,
} from 'lucide-react';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.28, 0.84, 0.42, 1] } },
};

const levels = [
    { level: 1, name: 'Novice', icon: '🌱', minXP: 0, color: '#636366' },
    { level: 2, name: 'Apprentice', icon: '🔧', minXP: 500, color: '#5AC8FA' },
    { level: 3, name: 'Expert', icon: '⚡', minXP: 2000, color: '#AF52DE' },
    { level: 4, name: 'Master', icon: '👑', minXP: 5000, color: '#FF9500' },
    { level: 5, name: 'Legend', icon: '🏆', minXP: 10000, color: '#FF2D55' },
];

const achievements = [
    { id: 'first-blood', name: 'First Blood', desc: 'Complete your first exchange', icon: '⚔️', earned: true, rarity: 'common', color: '#34C759' },
    { id: 'networker', name: 'Networker', desc: 'Connect with 100 users', icon: '🌐', earned: true, rarity: 'uncommon', color: '#5AC8FA' },
    { id: 'ai-whisperer', name: 'AI Whisperer', desc: 'Perfect negotiation score', icon: '🤖', earned: true, rarity: 'rare', color: '#AF52DE' },
    { id: 'time-lord', name: 'Time Lord', desc: 'Complete 30-day streak', icon: '⏰', earned: false, rarity: 'epic', color: '#FF9500' },
    { id: 'philanthropist', name: 'Philanthropist', desc: 'Most resources shared', icon: '💝', earned: false, rarity: 'legendary', color: '#FF2D55' },
    { id: 'chain-master', name: 'Chain Master', desc: '100 blockchain transactions', icon: '⛓️', earned: false, rarity: 'rare', color: '#5856D6' },
    { id: 'data-wizard', name: 'Data Wizard', desc: 'Trade 50 data resources', icon: '📊', earned: false, rarity: 'uncommon', color: '#00C7BE' },
    { id: 'speed-demon', name: 'Speed Demon', desc: 'Trade in under 1 minute', icon: '💨', earned: true, rarity: 'uncommon', color: '#FF9500' },
];

const leaderboard = [
    { rank: 1, name: 'Elena Kowalski', score: 9847, level: 5, trades: 312, badge: '🏆', change: 0 },
    { rank: 2, name: 'Raj Patel', score: 8923, level: 5, trades: 289, badge: '🥈', change: 1 },
    { rank: 3, name: 'Sarah Chen', score: 8456, level: 4, trades: 256, badge: '🥉', change: -1 },
    { rank: 4, name: 'Marcus Johnson', score: 7892, level: 4, trades: 234, badge: '', change: 2 },
    { rank: 5, name: 'Aisha Nouri', score: 7234, level: 4, trades: 201, badge: '', change: 0 },
    { rank: 6, name: 'Arjun Verma', score: 6891, level: 3, trades: 178, badge: '⭐', change: 3 },
    { rank: 7, name: 'Kim Tanaka', score: 6543, level: 3, trades: 165, badge: '', change: -2 },
    { rank: 8, name: 'Lucas Silva', score: 6012, level: 3, trades: 149, badge: '', change: 1 },
];

export default function ReputationPage() {
    const { currentUser } = useBarterStore();
    const currentLevel = levels.find(l => l.level === (currentUser?.level || 1)) || levels[0];
    const nextLevel = levels.find(l => l.level === (currentLevel.level + 1));
    const currentXP = 3200;
    const xpProgress = nextLevel ? ((currentXP - currentLevel.minXP) / (nextLevel.minXP - currentLevel.minXP)) * 100 : 100;

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
                    Reputation & <span className="text-ios-orange">Achievements</span>
                </h1>
                <p className="text-label-secondary max-w-lg text-[15px]">
                    Your trading reputation is built on blockchain — verifiable and tamper-proof.
                </p>
            </motion.div>

            {/* Profile + Achievements */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Profile Card */}
                <motion.div variants={item} className="ios-card p-5 lg:col-span-1">
                    <div className="text-center">
                        <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-ios-blue to-ios-teal flex items-center justify-center text-[28px] font-bold mx-auto mb-3 shadow-ios-md">
                            {currentUser?.name.charAt(0) || 'A'}
                        </div>
                        <h2 className="text-[17px] font-bold text-white">{currentUser?.name}</h2>
                        <p className="text-[12px] text-label-tertiary font-mono mt-1">{currentUser?.walletAddress.slice(0, 10)}...{currentUser?.walletAddress.slice(-4)}</p>

                        {/* Level Badge */}
                        <div className="inline-flex items-center gap-2 mt-3 px-3.5 py-2 rounded-full bg-fill-quaternary">
                            <span className="text-[16px]">{currentLevel.icon}</span>
                            <div className="text-left">
                                <p className="text-[12px] font-bold text-white">Level {currentLevel.level}</p>
                                <p className="text-[10px] text-label-tertiary">{currentLevel.name}</p>
                            </div>
                        </div>

                        {/* XP Bar */}
                        <div className="mt-4">
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[11px] text-label-tertiary">XP Progress</span>
                                <span className="text-[11px] text-label-tertiary">{currentXP} / {nextLevel?.minXP || 'MAX'}</span>
                            </div>
                            <div className="h-[5px] bg-fill-quaternary rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${xpProgress}%` }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="h-full rounded-full bg-ios-blue"
                                />
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-2 mt-4">
                            <div className="p-2.5 rounded-[10px] bg-fill-quaternary">
                                <p className="text-[16px] font-bold text-white">{currentUser?.totalExchanges}</p>
                                <p className="text-[10px] text-label-tertiary">Trades</p>
                            </div>
                            <div className="p-2.5 rounded-[10px] bg-fill-quaternary">
                                <p className="text-[16px] font-bold text-white">{currentUser?.reputation}</p>
                                <p className="text-[10px] text-label-tertiary">Rating</p>
                            </div>
                            <div className="p-2.5 rounded-[10px] bg-fill-quaternary">
                                <p className="text-[16px] font-bold text-white">{currentUser?.badges.length}</p>
                                <p className="text-[10px] text-label-tertiary">Badges</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Achievements */}
                <motion.div variants={item} className="ios-card p-5 lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[15px] font-semibold text-white flex items-center gap-2">
                            <Award className="w-4 h-4 text-ios-orange" strokeWidth={1.8} />
                            Achievements
                        </h3>
                        <span className="text-[13px] text-label-tertiary">
                            {achievements.filter(a => a.earned).length}/{achievements.length}
                        </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                        {achievements.map((ach, i) => (
                            <motion.div
                                key={ach.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.04 }}
                                whileTap={{ scale: 0.96 }}
                                className={`p-3.5 rounded-[14px] text-center cursor-pointer transition-all ${ach.earned
                                        ? 'bg-fill-quaternary hover:bg-fill-tertiary'
                                        : 'bg-fill-quaternary/50 opacity-40'
                                    }`}
                            >
                                <span className="text-[24px] block mb-1.5">{ach.icon}</span>
                                <p className="text-[12px] font-semibold text-white mb-0.5">{ach.name}</p>
                                <p className="text-[10px] text-label-tertiary leading-tight">{ach.desc}</p>
                                <span className="inline-block mt-2 ios-badge" style={{
                                    backgroundColor: ach.color + '14',
                                    color: ach.color,
                                }}>
                                    {ach.rarity}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Level Progression */}
            <motion.div variants={item} className="ios-card p-5">
                <h3 className="text-[15px] font-semibold text-white flex items-center gap-2 mb-5">
                    <Flame className="w-4 h-4 text-ios-orange" strokeWidth={1.8} />
                    Level Progression
                </h3>
                <div className="flex items-center justify-between relative">
                    <div className="absolute top-5 left-0 right-0 h-[2px] bg-fill-quaternary" />
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentLevel.level - 1) / (levels.length - 1)) * 100}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute top-5 left-0 h-[2px] bg-ios-blue"
                    />
                    {levels.map((level, i) => {
                        const isReached = (currentUser?.level || 1) >= level.level;
                        const isCurrent = (currentUser?.level || 1) === level.level;
                        return (
                            <motion.div
                                key={level.level}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.08 }}
                                className="flex flex-col items-center relative z-10"
                            >
                                <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center text-[16px] transition-all ${isCurrent ? 'shadow-ios-md' : ''}`}
                                    style={{
                                        backgroundColor: isReached ? level.color + '20' : 'rgba(120,120,128,0.12)',
                                        border: isCurrent ? `2px solid ${level.color}` : '1px solid rgba(84,84,88,0.2)',
                                    }}>
                                    {level.icon}
                                </div>
                                <p className={`text-[11px] mt-2 font-medium ${isCurrent ? 'text-white' : isReached ? 'text-label-secondary' : 'text-label-quaternary'}`}>
                                    {level.name}
                                </p>
                                <p className="text-[10px] text-label-quaternary mt-0.5">{level.minXP} XP</p>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>

            {/* Leaderboard */}
            <motion.div variants={item} className="ios-card p-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[15px] font-semibold text-white flex items-center gap-2">
                        <Crown className="w-4 h-4 text-ios-orange" strokeWidth={1.8} />
                        Leaderboard
                    </h3>
                    <div className="ios-segment">
                        {['All Time', 'Month', 'Week'].map(period => (
                            <button
                                key={period}
                                className={`ios-segment-item ${period === 'All Time' ? 'ios-segment-item-active' : ''}`}
                            >
                                {period}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="space-y-0.5">
                    {leaderboard.map((user, i) => {
                        const isCurrentUser = user.name === currentUser?.name;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.04 }}
                                className={`flex items-center gap-3.5 p-3 rounded-[12px] transition-all ${isCurrentUser ? 'bg-ios-blue/8 border border-ios-blue/20' : 'hover:bg-fill-quaternary'
                                    }`}
                            >
                                <span className={`w-7 text-center font-bold text-[13px] ${user.rank <= 3 ? 'text-ios-orange' : 'text-label-quaternary'}`}>
                                    {user.badge || `#${user.rank}`}
                                </span>
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                                    style={{
                                        background: user.rank === 1 ? 'linear-gradient(135deg, #FFD60A, #FF9500)' :
                                            user.rank === 2 ? 'linear-gradient(135deg, #8E8E93, #636366)' :
                                                user.rank === 3 ? 'linear-gradient(135deg, #FF9500, #FF3B30)' :
                                                    'linear-gradient(135deg, #48484A, #636366)'
                                    }}>
                                    {user.name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <p className={`text-[14px] font-medium ${isCurrentUser ? 'text-ios-blue' : 'text-white'}`}>
                                        {user.name} {isCurrentUser && <span className="text-[11px] text-ios-blue">(You)</span>}
                                    </p>
                                    <p className="text-[11px] text-label-tertiary">Lv.{user.level} · {user.trades} trades</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[14px] font-bold text-white">{user.score.toLocaleString()}</p>
                                    <span className={`text-[11px] font-medium ${user.change > 0 ? 'text-ios-green' : user.change < 0 ? 'text-ios-red' : 'text-label-quaternary'}`}>
                                        {user.change > 0 ? `↑${user.change}` : user.change < 0 ? `↓${Math.abs(user.change)}` : '—'}
                                    </span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
        </motion.div>
    );
}

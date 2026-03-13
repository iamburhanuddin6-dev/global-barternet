'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { signOut } from 'next-auth/react';
import { useBarterStore } from '@/store/barterStore';
import {
    User,
    Bot,
    Bell,
    Shield,
    ChevronRight,
    Sun,
    Moon,
    Palette,
    Globe,
    Key,
    Smartphone,
    Mail,
    Eye,
    LogOut,
} from 'lucide-react';

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};
const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.28, 0.84, 0.42, 1] } },
};

// iOS-style toggle switch
function IOSToggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
    return (
        <motion.button
            onClick={onChange}
            className={`relative w-[51px] h-[31px] rounded-full transition-colors duration-200 flex-shrink-0 ${enabled ? 'bg-ios-green' : 'bg-fill-primary'
                }`}
        >
            <motion.div
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-[2px] w-[27px] h-[27px] rounded-full bg-white shadow-ios-md"
                style={{ left: enabled ? 22 : 2 }}
            />
        </motion.button>
    );
}

function SettingsRow({ icon: Icon, label, value, color, action, hasChevron }: {
    icon: any; label: string; value?: string; color?: string;
    action?: React.ReactNode; hasChevron?: boolean;
}) {
    return (
        <div className="ios-group-row flex items-center gap-3 cursor-pointer">
            <div className="w-8 h-8 rounded-[8px] flex items-center justify-center"
                style={{ backgroundColor: (color || '#636366') + '18' }}>
                <Icon className="w-4 h-4" style={{ color: color || '#636366' }} strokeWidth={1.8} />
            </div>
            <div className="flex-1 min-w-0">
                <span className="text-[15px] text-white">{label}</span>
            </div>
            {value && <span className="text-[15px] text-label-tertiary">{value}</span>}
            {action}
            {hasChevron && <ChevronRight className="w-4 h-4 text-label-quaternary" />}
        </div>
    );
}

export default function SettingsPage() {
    const { currentUser } = useBarterStore();
    const [emailNotif, setEmailNotif] = useState(true);
    const [pushNotif, setPushNotif] = useState(true);
    const [matchNotif, setMatchNotif] = useState(true);
    const [tradeNotif, setTradeNotif] = useState(false);
    const [autoNegotiate, setAutoNegotiate] = useState(true);
    const [twoFactor, setTwoFactor] = useState(true);
    const [biometric, setBiometric] = useState(false);
    const [darkMode, setDarkMode] = useState(true);
    const [agentRisk, setAgentRisk] = useState(65);

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-5 max-w-2xl"
        >
            {/* Profile Section */}
            <motion.div variants={item} className="liquid-glass-card p-6 rounded-[20px]">
                <div className="flex items-center gap-4 mb-5">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ios-blue to-ios-teal flex items-center justify-center text-[24px] font-bold shadow-ios-md">
                        {currentUser?.name.charAt(0) || 'A'}
                    </div>
                    <div>
                        <h2 className="text-[20px] font-bold text-white">{currentUser?.name || 'Arjun Verma'}</h2>
                        <p className="text-[13px] text-label-tertiary">{currentUser?.email || 'arjun@barternet.io'}</p>
                        <p className="text-[12px] text-label-quaternary font-mono mt-0.5">
                            {currentUser?.walletAddress || '0x742d...bD18'}
                        </p>
                    </div>
                </div>
                <button className="w-full ios-btn-secondary text-center">Edit Profile</button>
            </motion.div>

            {/* AI Agent Configuration */}
            <motion.div variants={item}>
                <h3 className="ios-footnote text-label-tertiary uppercase tracking-wider px-4 mb-2">AI Agent Configuration</h3>
                <div className="ios-group">
                    <SettingsRow
                        icon={Bot}
                        label="Auto-Negotiation"
                        color="#AF52DE"
                        action={<IOSToggle enabled={autoNegotiate} onChange={() => setAutoNegotiate(!autoNegotiate)} />}
                    />
                    <div className="ios-group-row">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-[8px] flex items-center justify-center bg-[#FF9500]/18">
                                <Shield className="w-4 h-4 text-ios-orange" strokeWidth={1.8} />
                            </div>
                            <span className="text-[15px] text-white">Risk Tolerance</span>
                            <span className="ml-auto text-[15px] font-medium text-ios-orange">{agentRisk}%</span>
                        </div>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={agentRisk}
                            onChange={(e) => setAgentRisk(parseInt(e.target.value))}
                            className="w-full accent-ios-orange"
                        />
                        <div className="flex justify-between text-[11px] text-label-quaternary mt-1">
                            <span>Conservative</span>
                            <span>Aggressive</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Notifications */}
            <motion.div variants={item}>
                <h3 className="ios-footnote text-label-tertiary uppercase tracking-wider px-4 mb-2">Notifications</h3>
                <div className="ios-group">
                    <SettingsRow
                        icon={Mail}
                        label="Email Notifications"
                        color="#007AFF"
                        action={<IOSToggle enabled={emailNotif} onChange={() => setEmailNotif(!emailNotif)} />}
                    />
                    <SettingsRow
                        icon={Smartphone}
                        label="Push Notifications"
                        color="#5AC8FA"
                        action={<IOSToggle enabled={pushNotif} onChange={() => setPushNotif(!pushNotif)} />}
                    />
                    <SettingsRow
                        icon={Bot}
                        label="AI Match Alerts"
                        color="#34C759"
                        action={<IOSToggle enabled={matchNotif} onChange={() => setMatchNotif(!matchNotif)} />}
                    />
                    <SettingsRow
                        icon={Bell}
                        label="Trade Updates"
                        color="#FF9500"
                        action={<IOSToggle enabled={tradeNotif} onChange={() => setTradeNotif(!tradeNotif)} />}
                    />
                </div>
            </motion.div>

            {/* Appearance */}
            <motion.div variants={item}>
                <h3 className="ios-footnote text-label-tertiary uppercase tracking-wider px-4 mb-2">Appearance</h3>
                <div className="ios-group">
                    <SettingsRow
                        icon={darkMode ? Moon : Sun}
                        label="Dark Mode"
                        color="#5856D6"
                        action={<IOSToggle enabled={darkMode} onChange={() => setDarkMode(!darkMode)} />}
                    />
                    <SettingsRow icon={Palette} label="Theme" value="Blue" color="#FF2D55" hasChevron />
                    <SettingsRow icon={Globe} label="Language" value="English" color="#5AC8FA" hasChevron />
                </div>
            </motion.div>

            {/* Security */}
            <motion.div variants={item}>
                <h3 className="ios-footnote text-label-tertiary uppercase tracking-wider px-4 mb-2">Security</h3>
                <div className="ios-group">
                    <SettingsRow
                        icon={Key}
                        label="Two-Factor Auth"
                        color="#34C759"
                        action={<IOSToggle enabled={twoFactor} onChange={() => setTwoFactor(!twoFactor)} />}
                    />
                    <SettingsRow
                        icon={Eye}
                        label="Biometric Login"
                        color="#007AFF"
                        action={<IOSToggle enabled={biometric} onChange={() => setBiometric(!biometric)} />}
                    />
                    <SettingsRow icon={Key} label="Change Password" color="#FF9500" hasChevron />
                    <SettingsRow icon={Shield} label="Active Sessions" value="3" color="#AF52DE" hasChevron />
                </div>
            </motion.div>

            {/* Danger */}
            <motion.div variants={item}>
                <div className="ios-group">
                    <div
                        onClick={() => signOut({ callbackUrl: '/login' })}
                        className="ios-group-row flex items-center gap-3 cursor-pointer"
                    >
                        <div className="w-8 h-8 rounded-[8px] flex items-center justify-center bg-ios-red/18">
                            <LogOut className="w-4 h-4 text-ios-red" strokeWidth={1.8} />
                        </div>
                        <span className="text-[15px] text-ios-red font-medium">Sign Out</span>
                    </div>
                </div>
            </motion.div>

            <motion.div variants={item} className="text-center py-4">
                <p className="text-[11px] text-label-quaternary">Global BarterNet v2.1.0</p>
                <p className="text-[11px] text-label-quaternary mt-0.5">© 2024 BarterNet Protocol</p>
            </motion.div>
        </motion.div>
    );
}

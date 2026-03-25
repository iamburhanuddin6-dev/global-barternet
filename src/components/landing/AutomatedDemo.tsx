'use client';

import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Bot, Search, ArrowRight, Zap, Play, CheckCircle2, Shield, ArrowLeftRight, Trophy } from 'lucide-react';

export default function AutomatedDemo() {
    const cursorControls = useAnimation();
    const [step, setStep] = useState(0);
    const [searchValue, setSearchValue] = useState("");
    const [activeTab, setActiveTab] = useState('dashboard');
    const [tradeStatus, setTradeStatus] = useState<'pending' | 'accepted'>('pending');

    useEffect(() => {
        let isSimulating = true;

        const runSimulationSequence = async () => {
            while (isSimulating) {
                // RESET STATE
                setStep(0);
                setActiveTab('dashboard');
                setSearchValue("");
                setTradeStatus('pending');
                cursorControls.set({ x: '50%', y: '80%', opacity: 1 });
                await new Promise(r => setTimeout(r, 1000));

                // STEP 1: Move to Search Bar
                setStep(1);
                await cursorControls.start({ x: '60%', y: '12%', transition: { duration: 1.2, ease: "easeInOut" } });
                await cursorControls.start({ scale: 0.8, transition: { duration: 0.1 } });
                await cursorControls.start({ scale: 1, transition: { duration: 0.1 } });
                
                // Typing effect
                const textToType = "Web Design for Smart Contract";
                for (let i = 0; i <= textToType.length; i++) {
                    if (!isSimulating) break;
                    setSearchValue(textToType.slice(0, i));
                    await new Promise(r => setTimeout(r, 50));
                }
                await new Promise(r => setTimeout(r, 1500));

                // STEP 2: Move to Navigation Dock (AI Agents)
                setStep(2);
                await cursorControls.start({ x: '45%', y: '85%', transition: { duration: 1, ease: "easeInOut" } });
                await cursorControls.start({ scale: 0.8, transition: { duration: 0.1 } });
                setActiveTab('ai-agents');
                await cursorControls.start({ scale: 1, transition: { duration: 0.1 } });
                await new Promise(r => setTimeout(r, 1500));

                // STEP 3: Move to Accept Trade
                setStep(3);
                await cursorControls.start({ x: '75%', y: '50%', transition: { duration: 1.2, ease: "easeInOut" } });
                await cursorControls.start({ scale: 0.8, transition: { duration: 0.1 } });
                setTradeStatus('accepted');
                await cursorControls.start({ scale: 1, transition: { duration: 0.1 } });
                await new Promise(r => setTimeout(r, 3000));
            }
        };

        runSimulationSequence();

        return () => {
            isSimulating = false;
        };
    }, [cursorControls]);

    return (
        <div className="relative w-full h-full bg-[var(--background)] overflow-hidden font-sans border border-[var(--separator)] rounded-2xl select-none">
            
            {/* ═ THE MOCK UI FRAME ═ */}

            {/* Header */}
            <div className="absolute top-0 left-0 right-0 h-14 border-b border-[var(--separator)] bg-[var(--background-secondary)] flex items-center justify-between px-6 z-10">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-ios-blue flex items-center justify-center">
                        <Zap className="w-4 h-4 text-white" />
                    </div>
                </div>
                {/* Search Bar Target */}
                <div className="w-[300px] h-8 rounded-full bg-[var(--background)] border border-[var(--separator)] flex items-center px-4">
                    <Search className="w-3.5 h-3.5 text-label-tertiary mr-2" />
                    <span className={`text-[13px] ${searchValue ? 'text-label-primary' : 'text-label-tertiary'}`}>
                        {searchValue || "Search BarterNet..."}
                    </span>
                    {step === 1 && <span className="w-[2px] h-[14px] bg-ios-blue animate-pulse ml-0.5" />}
                </div>
                <div className="w-8 h-8 rounded-full bg-[var(--fill-secondary)]"></div>
            </div>

            {/* Main Content Area */}
            <div className="absolute inset-x-0 top-14 bottom-24 p-8 overflow-hidden bg-[var(--background)]">
                <AnimatePresence mode="wait">
                    {activeTab === 'dashboard' ? (
                        <motion.div 
                            key="dashboard"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="w-full h-full"
                        >
                            <h2 className="text-[24px] font-bold text-label-primary mb-6">Dashboard</h2>
                            <div className="grid grid-cols-3 gap-6 mb-6">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-28 rounded-xl bg-[var(--background-secondary)] border border-[var(--separator)] p-4 flex flex-col justify-between">
                                        <div className="w-8 h-8 rounded-full border border-[var(--separator)] bg-[var(--fill-tertiary)]" />
                                        <div className="w-1/2 h-3 bg-[var(--fill-secondary)] rounded-full" />
                                    </div>
                                ))}
                            </div>
                            <div className="w-full h-40 rounded-xl bg-[var(--background-secondary)] border border-[var(--separator)]" />
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="ai-agents"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="w-full h-full"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <Bot className="w-8 h-8 text-ios-purple" />
                                <h2 className="text-[24px] font-bold text-label-primary">AI Matching Agent</h2>
                            </div>
                            
                            {/* Live Match Card */}
                            <motion.div 
                                className={`w-full p-6 rounded-2xl border ${tradeStatus === 'accepted' ? 'border-ios-green bg-ios-green/10' : 'border-ios-purple bg-[var(--background-secondary)]'} transition-colors duration-500`}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[12px] font-bold text-label-secondary uppercase tracking-wider">Perfect Match Found</span>
                                    {tradeStatus === 'accepted' ? (
                                        <span className="flex items-center gap-1.5 text-[12px] font-bold text-ios-green">
                                            <CheckCircle2 className="w-4 h-4" /> Secured on-chain
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1.5 text-[12px] font-bold text-ios-purple">
                                            <span className="w-2 h-2 rounded-full bg-ios-purple animate-pulse" /> Negotiating...
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-[20px] font-bold text-label-primary mb-2">Web Design ⟷ Smart Contract Auditing</h3>
                                <p className="text-[14px] text-label-secondary mb-6">User @CryptoDev is offering 10 hours of smart contract auditing for a full landing page design.</p>
                                
                                <div className="flex justify-end relative">
                                    <button 
                                        className={`px-6 py-2.5 rounded-xl text-[14px] font-bold flex items-center gap-2 transition-all ${tradeStatus === 'accepted' ? 'bg-ios-green text-white' : 'bg-ios-blue text-[var(--background)] hover:opacity-90'}`}
                                    >
                                        {tradeStatus === 'accepted' ? 'Trade Accepted' : 'Accept Trade'}
                                        {tradeStatus === 'pending' && <ArrowRight className="w-4 h-4" />}
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Floating Dock Target */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20">
                <div className="flex items-center gap-3 p-2.5 rounded-[20px] bg-[var(--liquid-glass-bg)] border border-[var(--liquid-glass-border)] backdrop-blur-3xl shadow-2xl">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${activeTab === 'dashboard' ? 'bg-[var(--fill-primary)] text-label-primary' : 'text-label-tertiary'}`}>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                    </div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${activeTab === 'ai-agents' ? 'bg-[var(--fill-primary)] text-label-primary' : 'text-label-tertiary'}`}>
                        <Bot className="w-6 h-6" />
                    </div>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-label-tertiary"><ArrowLeftRight className="w-6 h-6" /></div>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-label-tertiary"><Shield className="w-6 h-6" /></div>
                </div>
            </div>

            {/* ═ THE AUTOMATED GHOST CURSOR ═ */}
            <motion.div 
                animate={cursorControls}
                className="absolute top-0 left-0 w-8 h-8 z-50 pointer-events-none drop-shadow-xl"
                style={{ originX: 0.1, originY: 0.1 }}
            >
                {/* Custom glowing cursor arrow */}
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.0166 23.5936L8.43477 7.02534C8.17387 5.819 9.53986 4.88748 10.606 5.54637L25.6171 14.8239C26.6575 15.467 26.5413 17.0298 25.4243 17.519L19.988 19.899H19.9881L14.7712 25.2638C13.9113 26.1481 12.247 24.6593 12.0166 23.5936Z" fill="#FCEFE3" />
                    <path d="M12.0166 23.5936L8.43477 7.02534C8.17387 5.819 9.53986 4.88748 10.606 5.54637L25.6171 14.8239C26.6575 15.467 26.5413 17.0298 25.4243 17.519L19.988 19.899H19.9881L14.7712 25.2638C13.9113 26.1481 12.247 24.6593 12.0166 23.5936Z" stroke="#C88E54" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
            </motion.div>

            {/* ═ THE NARRATIVE TOOLTIPS (VOICEOVER TEXT) ═ */}
            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute top-[80px] left-[55%] -translate-x-1/2 bg-[var(--background-elevated)] border border-[var(--separator)] px-6 py-4 rounded-[16px] shadow-2xl z-40 max-w-sm pointer-events-none"
                    >
                        <p className="text-[15px] text-label-primary leading-relaxed">
                            <strong className="text-ios-blue">Step 1:</strong> List skills or resources you want to trade automatically via the AI search.
                        </p>
                    </motion.div>
                )}
                {step === 2 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute bottom-[90px] left-1/2 -translate-x-1/2 bg-[var(--background-elevated)] border border-[var(--separator)] px-6 py-4 rounded-[16px] shadow-2xl z-40 max-w-sm text-center pointer-events-none"
                    >
                        <p className="text-[15px] text-label-primary leading-relaxed">
                            <strong className="text-ios-purple">Step 2:</strong> Autonomous AI agents scan the network 24/7 to find your exact match.
                        </p>
                    </motion.div>
                )}
                {step === 3 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute top-1/2 right-12 -translate-y-1/2 bg-[var(--background-elevated)] border border-[var(--separator)] px-6 py-4 rounded-[16px] shadow-2xl z-40 max-w-sm pointer-events-none"
                    >
                        <p className="text-[15px] text-label-primary leading-relaxed">
                            <strong className="text-ios-green">Step 3:</strong> The exchange is securely validated on-chain. Zero money involved. Pure value.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

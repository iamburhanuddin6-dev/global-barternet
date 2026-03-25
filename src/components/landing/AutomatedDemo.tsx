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
    const [showListingModal, setShowListingModal] = useState(false);
    const [showReputationXP, setShowReputationXP] = useState(false);

    useEffect(() => {
        let isSimulating = true;

        const runSimulationSequence = async () => {
            while (isSimulating) {
                // RESET STATE
                setStep(0);
                setActiveTab('dashboard');
                setSearchValue("");
                setTradeStatus('pending');
                setShowListingModal(false);
                setShowReputationXP(false);
                cursorControls.set({ x: '10%', y: '50%', opacity: 1 });
                await new Promise(r => setTimeout(r, 1000));

                if (!isSimulating) break;

                // STEP 1: Highlight Network Value Dashboard Widget
                setStep(1);
                await cursorControls.start({ x: '25%', y: '35%', transition: { duration: 1, ease: "easeInOut" } });
                await new Promise(r => setTimeout(r, 2000));
                
                if (!isSimulating) break;

                // STEP 2: Move to External Resources Tab & click "Add Resource"
                setStep(2);
                await cursorControls.start({ x: '60%', y: '85%', transition: { duration: 1.2, ease: "easeInOut" } });
                await cursorControls.start({ scale: 0.8, transition: { duration: 0.1 } });
                setActiveTab('resources');
                await cursorControls.start({ scale: 1, transition: { duration: 0.1 } });
                
                await new Promise(r => setTimeout(r, 800));
                await cursorControls.start({ x: '85%', y: '25%', transition: { duration: 0.8, ease: "easeInOut" } }); // Move to 'Add Listing' button
                await cursorControls.start({ scale: 0.8, transition: { duration: 0.1 } });
                setShowListingModal(true);
                await cursorControls.start({ scale: 1, transition: { duration: 0.1 } });
                await new Promise(r => setTimeout(r, 3000));

                if (!isSimulating) break;

                // STEP 3: Move to AI Agents Dock Icon
                setStep(3);
                setShowListingModal(false); // Close modal
                await cursorControls.start({ x: '45%', y: '85%', transition: { duration: 1.2, ease: "easeInOut" } });
                await cursorControls.start({ scale: 0.8, transition: { duration: 0.1 } });
                setActiveTab('ai-agents');
                await cursorControls.start({ scale: 1, transition: { duration: 0.1 } });
                await new Promise(r => setTimeout(r, 2000));

                if (!isSimulating) break;

                // STEP 4: Smart Contract Acceptance
                setStep(4);
                await cursorControls.start({ x: '75%', y: '55%', transition: { duration: 1.2, ease: "easeInOut" } });
                await cursorControls.start({ scale: 0.8, transition: { duration: 0.1 } });
                setTradeStatus('accepted');
                await cursorControls.start({ scale: 1, transition: { duration: 0.1 } });
                await new Promise(r => setTimeout(r, 2000));

                if (!isSimulating) break;

                // STEP 5: Reputation System
                setStep(5);
                await cursorControls.start({ x: '92%', y: '10%', transition: { duration: 1.5, ease: "easeInOut" } });
                setShowReputationXP(true);
                await new Promise(r => setTimeout(r, 4000));
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
                    <span className="text-[13px] text-label-tertiary">
                        Search BarterNet...
                    </span>
                </div>
                {/* Avatar Target */}
                <div className="relative w-8 h-8 rounded-full bg-[var(--fill-secondary)] border border-[var(--separator)] flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-ios-purple" />
                    {/* Floating XP Animation */}
                    <AnimatePresence>
                        {showReputationXP && (
                            <motion.div
                                initial={{ opacity: 0, y: 0 }}
                                animate={{ opacity: 1, y: -20 }}
                                exit={{ opacity: 0 }}
                                className="absolute -top-6 -right-6 px-2 py-1 bg-ios-purple rounded-md shadow-lg"
                            >
                                <span className="text-[10px] font-bold text-white whitespace-nowrap">+250 XP Rank Up!</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="absolute inset-x-0 top-14 bottom-24 p-8 overflow-hidden bg-[var(--background)]">
                <AnimatePresence mode="wait">
                    {/* DASHBOARD VIEW */}
                    {activeTab === 'dashboard' && (
                        <motion.div 
                            key="dashboard"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="w-full h-full"
                        >
                            <h2 className="text-[24px] font-bold text-label-primary mb-6">Dashboard</h2>
                            <div className="grid grid-cols-3 gap-6 mb-6">
                                <div className={`h-28 rounded-xl bg-[var(--background-secondary)] border border-[var(--separator)] p-4 flex flex-col justify-between transition-all duration-300 ${step === 1 ? 'ring-2 ring-ios-blue shadow-[0_0_30px_rgba(0,122,255,0.2)]' : ''}`}>
                                    <h4 className="text-[12px] uppercase text-label-secondary font-bold tracking-wider">Total Network Value</h4>
                                    <span className="text-[28px] font-bold text-label-primary">₿ 2.1B</span>
                                </div>
                                <div className="h-28 rounded-xl bg-[var(--background-secondary)] border border-[var(--separator)] p-4 flex flex-col justify-between">
                                    <div className="w-8 h-8 rounded-full border border-[var(--separator)] bg-[var(--fill-tertiary)]" />
                                    <div className="w-1/2 h-3 bg-[var(--fill-secondary)] rounded-full" />
                                </div>
                                <div className="h-28 rounded-xl bg-[var(--background-secondary)] border border-[var(--separator)] p-4 flex flex-col justify-between">
                                    <div className="w-8 h-8 rounded-full border border-[var(--separator)] bg-[var(--fill-tertiary)]" />
                                    <div className="w-1/2 h-3 bg-[var(--fill-secondary)] rounded-full" />
                                </div>
                            </div>
                            <div className="w-full h-40 rounded-xl bg-[var(--background-secondary)] border border-[var(--separator)] flex items-center justify-center">
                                <span className="text-label-tertiary">Live Activity Graph</span>
                            </div>
                        </motion.div>
                    )}

                    {/* RESOURCES VIEW */}
                    {activeTab === 'resources' && (
                        <motion.div 
                            key="resources"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="w-full h-full relative"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-[24px] font-bold text-label-primary flex items-center gap-2">
                                    <ArrowLeftRight className="w-6 h-6" /> Your Resources
                                </h2>
                                <button className={`px-4 py-2 bg-ios-blue text-white rounded-lg text-sm font-bold flex items-center gap-2 transition-transform ${step === 2 && !showListingModal ? 'scale-110 shadow-[0_0_20px_rgba(0,122,255,0.4)]' : ''}`}>
                                    List Resource
                                </button>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="h-40 rounded-xl bg-[var(--background-secondary)] border border-[var(--separator)] p-4">
                                    <h3 className="text-[16px] font-bold">10 Hours Web Design</h3>
                                    <p className="text-[12px] text-label-secondary mt-2">Available for Trade</p>
                                </div>
                                <div className="h-40 rounded-xl bg-[var(--background-secondary)] border border-[var(--separator)] p-4 opacity-50 border-dashed flex flex-col items-center justify-center gap-2">
                                    <span className="w-10 h-10 rounded-full border border-dashed flex items-center justify-center">+</span>
                                    <span className="text-[12px] font-medium">Add to vault</span>
                                </div>
                            </div>

                            {/* Floating "Add Listing" Modal */}
                            <AnimatePresence>
                                {showListingModal && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="absolute inset-0 bg-[var(--background-secondary)]/90 backdrop-blur-md rounded-xl border border-[var(--separator)] flex items-center justify-center shadow-2xl"
                                    >
                                        <div className="text-center p-8 bg-[var(--background)] border border-[var(--separator)] rounded-2xl w-[300px]">
                                            <div className="w-12 h-12 mx-auto mb-4 bg-ios-blue/10 rounded-full flex items-center justify-center">
                                                <Search className="w-6 h-6 text-ios-blue" />
                                            </div>
                                            <h3 className="text-[16px] font-bold mb-2">AI Value Scanner</h3>
                                            <p className="text-[12px] text-label-secondary mb-4">Scanning global markets to assign perfect barter value to your skill...</p>
                                            <div className="w-full h-2 bg-[var(--fill-secondary)] rounded-full overflow-hidden">
                                                <motion.div 
                                                    initial={{ width: 0 }}
                                                    animate={{ width: "100%" }}
                                                    transition={{ duration: 2, ease: "linear" }}
                                                    className="h-full bg-ios-blue"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {/* AI AGENTS VIEW */}
                    {activeTab === 'ai-agents' && (
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
                                className={`w-full p-6 rounded-2xl border ${tradeStatus === 'accepted' ? 'border-ios-green bg-ios-green/10 shadow-[0_0_40px_rgba(52,199,89,0.15)]' : 'border-ios-purple bg-[var(--background-secondary)]'} transition-colors duration-500`}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[12px] font-bold text-label-secondary uppercase tracking-wider">Perfect Match Found</span>
                                    {tradeStatus === 'accepted' ? (
                                        <span className="flex items-center gap-1.5 text-[12px] font-bold text-ios-green">
                                            <CheckCircle2 className="w-4 h-4" /> SECURED ON-CHAIN
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1.5 text-[12px] font-bold text-ios-purple">
                                            <span className="w-2 h-2 rounded-full bg-ios-purple animate-pulse" /> AI Negotiating Deal...
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-[20px] font-bold text-label-primary mb-2">Your Web Design ⟷ Smart Contract Auditing</h3>
                                <p className="text-[14px] text-label-secondary mb-6">Agent [NOVA] found user @CryptoDev willing to trade 10 hours of auditing for your design package.</p>
                                
                                <div className="flex justify-end relative">
                                    <button 
                                        className={`px-6 py-2.5 rounded-xl text-[14px] font-bold flex items-center gap-2 transition-all ${tradeStatus === 'accepted' ? 'bg-ios-green text-white' : 'bg-ios-blue text-[var(--background)] hover:opacity-90'} ${step === 4 && tradeStatus === 'pending' ? 'ring-4 ring-ios-blue/30' : ''}`}
                                    >
                                        {tradeStatus === 'accepted' ? 'Smart Contract Deployed' : 'Accept Trade & Seal Smart Contract'}
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
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${activeTab === 'dashboard' ? 'bg-label-primary text-[var(--background)]' : 'text-label-tertiary'} ${step === 0 ? 'ring-2 ring-ios-blue' : ''}`}>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                    </div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${activeTab === 'resources' ? 'bg-label-primary text-[var(--background)]' : 'text-label-tertiary'} ${step === 2 && activeTab !== 'resources' ? 'ring-2 ring-ios-blue' : ''}`}>
                        <ArrowLeftRight className="w-6 h-6" />
                    </div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${activeTab === 'ai-agents' ? 'bg-label-primary text-[var(--background)]' : 'text-label-tertiary'} ${step === 3 && activeTab !== 'ai-agents' ? 'ring-2 ring-ios-blue' : ''}`}>
                        <Bot className="w-6 h-6" />
                    </div>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-label-tertiary"><Shield className="w-6 h-6" /></div>
                </div>
            </div>

            {/* ═ THE AUTOMATED GHOST CURSOR ═ */}
            <motion.div 
                animate={cursorControls}
                className="absolute top-0 left-0 w-8 h-8 z-50 pointer-events-none drop-shadow-2xl"
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
                        key="tip1"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute top-[160px] left-[5%] bg-[var(--background-elevated)] border border-[var(--separator)] px-6 py-4 rounded-[16px] shadow-2xl z-40 max-w-[280px] pointer-events-none"
                    >
                        <p className="text-[14px] text-label-primary leading-relaxed">
                            <strong className="text-ios-blue block mb-1 uppercase tracking-wide text-[11px]">Step 1: Dashboard</strong>
                            Monitor your real-time global network statistics and live exchange data instantly.
                        </p>
                    </motion.div>
                )}
                {step === 2 && (
                    <motion.div 
                        key="tip2"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute bottom-[100px] right-[5%] bg-[var(--background-elevated)] border border-[var(--separator)] px-6 py-4 rounded-[16px] shadow-2xl z-40 max-w-[280px] pointer-events-none"
                    >
                        <p className="text-[14px] text-label-primary leading-relaxed">
                            <strong className="text-ios-blue block mb-1 uppercase tracking-wide text-[11px]">Step 2: List Resources</strong>
                            Add skills or assets to your digital vault. Our AI instantly reads global markets to assign it fair barter value.
                        </p>
                    </motion.div>
                )}
                {step === 3 && (
                    <motion.div 
                        key="tip3"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute bottom-[90px] left-1/2 -translate-x-1/2 bg-[var(--background-elevated)] border border-[var(--separator)] px-6 py-4 rounded-[16px] shadow-2xl z-40 max-w-[320px] text-center pointer-events-none"
                    >
                        <p className="text-[14px] text-label-primary leading-relaxed">
                            <strong className="text-ios-purple block mb-1 uppercase tracking-wide text-[11px]">Step 3: AI Matchmaker</strong>
                            Never search for buyers. Autonomous AI agents scan the globe 24/7 and find exact matches who want your skill.
                        </p>
                    </motion.div>
                )}
                {step === 4 && (
                    <motion.div 
                        key="tip4"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute top-1/2 left-12 -translate-y-1/2 bg-[var(--background-elevated)] border border-[var(--separator)] px-6 py-4 rounded-[16px] shadow-2xl z-40 max-w-[280px] pointer-events-none"
                    >
                        <p className="text-[14px] text-label-primary leading-relaxed">
                            <strong className="text-ios-green block mb-1 uppercase tracking-wide text-[11px]">Step 4: Execute Trade</strong>
                            AI handles fair negotiations flawlessly. Once you accept, the transaction is securely locked on-chain forever.
                        </p>
                    </motion.div>
                )}
                {step === 5 && (
                    <motion.div 
                        key="tip5"
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute top-[70px] right-[5%] bg-[var(--background-elevated)] border border-[var(--separator)] px-6 py-4 rounded-[16px] shadow-2xl z-40 max-w-[280px] pointer-events-none"
                    >
                        <p className="text-[14px] text-label-primary leading-relaxed">
                            <strong className="text-ios-purple block mb-1 uppercase tracking-wide text-[11px]">Step 5: Evolve</strong>
                            Zero cash. Pure value. Each trade levels up your digital reputation on the network. Evolve beyond currency.
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

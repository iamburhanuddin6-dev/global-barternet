'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Zap, Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2, Apple, Globe } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Registration failed');
                return;
            }

            // Auto-login after registration
            const loginResult = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (loginResult?.error) {
                setError('Account created but login failed. Please sign in manually.');
            } else {
                router.push('/');
                router.refresh();
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-background text-label-primary overflow-hidden">
            
            {/* LEFT SIDE: Immersive Brand Presentation */}
            <div className="hidden lg:flex lg:w-[45%] relative flex-col justify-between p-12 overflow-hidden border-r border-[var(--separator-opaque)]">
                {/* Stunning Gradient Mesh Background */}
                <div className="absolute inset-0 bg-[var(--background-secondary)]">
                    <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[var(--ios-purple)] rounded-full mix-blend-screen mix-blend-overlay filter blur-[150px] opacity-30 animate-pulse-soft" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[var(--ios-teal)] rounded-full mix-blend-screen mix-blend-overlay filter blur-[150px] opacity-20" />
                </div>
                
                {/* Floating Elements Visual */}
                <motion.div 
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.5, type: 'spring' }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                    <div className="relative">
                        <div className="w-[320px] h-[320px] rounded-2xl border border-[var(--liquid-glass-border)] bg-[var(--liquid-glass-bg)] backdrop-blur-3xl shadow-2xl flex flex-col items-center justify-center p-8 text-center rotate-[-4deg]">
                            <Globe className="w-16 h-16 text-ios-teal mb-4 drop-shadow-[0_0_15px_var(--ios-teal)]" />
                            <h3 className="text-[20px] font-bold text-label-primary mb-2">Decentralized Trust</h3>
                            <p className="text-[14px] text-label-secondary">Every exchange is brokered by AI and validated via blockchain, completely replacing fiat transactions.</p>
                        </div>
                        <div className="absolute -top-10 -right-16 w-[180px] h-[180px] rounded-full border border-[var(--liquid-glass-border)] bg-[var(--background-elevated)] backdrop-blur-3xl flex items-center justify-center shadow-2xl rotate-[12deg]">
                            <Zap className="w-12 h-12 text-ios-blue drop-shadow-[0_0_10px_var(--ios-blue)]" />
                        </div>
                    </div>
                </motion.div>

                {/* Top Branding */}
                <div className="relative z-10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-ios-blue flex items-center justify-center shadow-[0_0_15px_var(--ios-blue)]">
                        <Zap className="w-5 h-5 text-background" />
                    </div>
                    <span className="text-[20px] font-bold tracking-tight">Global BarterNet</span>
                </div>

                {/* Bottom Value Proposition */}
                <div className="relative z-10 max-w-lg mb-10">
                    <motion.h1 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-[44px] leading-[1.1] font-bold mb-6"
                    >
                        Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-ios-blue to-ios-purple">Post-Currency</span> Era.
                    </motion.h1>
                    <motion.p 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-[18px] text-label-secondary font-medium leading-relaxed"
                    >
                        Create your account to mint your genesis reputation token and start trading resources with zero financial friction.
                    </motion.p>
                </div>
            </div>

            {/* RIGHT SIDE: Application Registration Panel */}
            <div className="w-full lg:w-[55%] flex flex-col justify-center px-8 sm:px-16 lg:px-24 xl:px-32 bg-[var(--background)] shadow-[-20px_0_50px_rgba(0,0,0,0.2)] z-10 py-12 overflow-y-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.28, 0.84, 0.42, 1] }}
                    className="w-full max-w-[460px] mx-auto my-auto"
                >
                    <h2 className="text-[32px] font-bold tracking-tight mb-2">Create Account</h2>
                    <p className="text-[15px] text-label-secondary mb-8">
                        Connect with Google, Apple, or set up your profile manually below.
                    </p>

                    {/* Social OAuth Providers */}
                    <div className="flex gap-4 mb-8">
                        <button className="flex-1 flex items-center justify-center gap-2 bg-[var(--background-elevated)] border border-[var(--separator)] hover:bg-[var(--fill-tertiary)] text-label-primary px-4 py-3.5 rounded-[16px] font-semibold text-[14px] transition-all">
                            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                            Google
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 bg-[var(--background-elevated)] border border-[var(--separator)] hover:bg-[var(--fill-tertiary)] text-label-primary px-4 py-3.5 rounded-[16px] font-semibold text-[14px] transition-all">
                            <Apple className="w-[18px] h-[18px] fill-current" />
                            Apple
                        </button>
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                        <div className="flex-1 h-[1px] bg-[var(--separator)]" />
                        <span className="text-[12px] font-bold text-label-secondary uppercase tracking-wider">Configure Profile</span>
                        <div className="flex-1 h-[1px] bg-[var(--separator)]" />
                    </div>

                    {/* Registration Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-[var(--ios-red)]/10 border border-[var(--ios-red)]/20 rounded-[12px] p-3 text-center"
                            >
                                <p className="text-[var(--ios-red)] text-[13px] font-medium">{error}</p>
                            </motion.div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-[12px] font-semibold text-label-secondary uppercase tracking-wider mb-2 ml-1">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-label-tertiary" />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Alex Chen"
                                        required
                                        className="w-full bg-[var(--background-secondary)] border border-[var(--separator)] text-label-primary rounded-[16px] pl-[46px] pr-4 py-3.5 text-[15px] font-medium outline-none focus:border-ios-blue focus:bg-[var(--background)] focus:ring-1 focus:ring-ios-blue transition-all placeholder:text-label-tertiary placeholder:font-normal"
                                    />
                                </div>
                            </div>
                            
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-[12px] font-semibold text-label-secondary uppercase tracking-wider mb-2 ml-1">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-label-tertiary" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@company.com"
                                        required
                                        className="w-full bg-[var(--background-secondary)] border border-[var(--separator)] text-label-primary rounded-[16px] pl-[46px] pr-4 py-3.5 text-[15px] font-medium outline-none focus:border-ios-blue focus:bg-[var(--background)] focus:ring-1 focus:ring-ios-blue transition-all placeholder:text-label-tertiary placeholder:font-normal"
                                    />
                                </div>
                            </div>

                            <div className="col-span-1">
                                <label className="block text-[12px] font-semibold text-label-secondary uppercase tracking-wider mb-2 ml-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-label-tertiary" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        minLength={8}
                                        className="w-full bg-[var(--background-secondary)] border border-[var(--separator)] text-label-primary rounded-[16px] pl-[40px] pr-10 py-3.5 text-[15px] font-medium outline-none focus:border-ios-blue focus:bg-[var(--background)] focus:ring-1 focus:ring-ios-blue transition-all placeholder:text-label-tertiary"
                                    />
                                </div>
                            </div>

                            <div className="col-span-1">
                                <label className="block text-[12px] font-semibold text-label-secondary uppercase tracking-wider mb-2 ml-1">
                                    Confirm
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-label-tertiary" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        minLength={8}
                                        className="w-full bg-[var(--background-secondary)] border border-[var(--separator)] text-label-primary rounded-[16px] pl-[40px] pr-10 py-3.5 text-[15px] font-medium outline-none focus:border-ios-blue focus:bg-[var(--background)] focus:ring-1 focus:ring-ios-blue transition-all placeholder:text-label-tertiary"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-label-tertiary hover:text-label-primary transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-[16px] h-[16px]" /> : <Eye className="w-[16px] h-[16px]" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <motion.button
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="w-full mt-4 bg-ios-blue text-[var(--background)] rounded-[16px] py-4 text-[16px] font-bold flex items-center justify-center gap-2 hover:opacity-90 shadow-lg shadow-ios-blue/20 transition-all disabled:opacity-50"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Create My Account
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </motion.button>
                    </form>

                    <p className="text-center mt-8 text-[14px] text-label-secondary font-medium">
                        Already have an account?{' '}
                        <Link href="/login" className="text-ios-blue hover:underline">
                            Sign in to continue
                        </Link>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}

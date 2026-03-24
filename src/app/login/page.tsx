
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError(result.error);
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
        <div className="min-h-screen bg-black flex items-center justify-center p-4 ios-ambient">
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.28, 0.84, 0.42, 1] }}
                className="w-full max-w-md"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="w-16 h-16 rounded-[18px] bg-ios-blue mx-auto flex items-center justify-center shadow-lg mb-4"
                    >
                        <Zap className="w-8 h-8 text-white" />
                    </motion.div>
                    <h1 className="text-[28px] font-bold text-white tracking-tight">Welcome back</h1>
                    <p className="text-[#8E8E93] mt-1 text-[15px]">Sign in to Global BarterNet</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="liquid-glass-hero p-6 rounded-[24px]">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="bg-[#FF3B30]/10 border border-[#FF3B30]/20 rounded-[12px] p-3 mb-4"
                        >
                            <p className="text-[#FF3B30] text-[13px] font-medium">{error}</p>
                        </motion.div>
                    )}

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-[11px] font-medium text-[#8E8E93] uppercase tracking-wider mb-2">
                            Email
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#636366]" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                className="w-full bg-[rgba(120,120,128,0.12)] text-white rounded-[12px] pl-10 pr-4 py-3 text-[15px] outline-none focus:ring-2 focus:ring-ios-blue/50 transition-all placeholder:text-[#48484A]"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <label className="block text-[11px] font-medium text-[#8E8E93] uppercase tracking-wider mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#636366]" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full bg-[rgba(120,120,128,0.12)] text-white rounded-[12px] pl-10 pr-12 py-3 text-[15px] outline-none focus:ring-2 focus:ring-ios-blue/50 transition-all placeholder:text-[#48484A]"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#636366] hover:text-white transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <motion.button
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        disabled={loading}
                        className="w-full bg-ios-blue text-white rounded-[14px] py-3.5 text-[15px] font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                        {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <>
                                Sign In
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </motion.button>

                    {/* Register link */}
                    <p className="text-center mt-5 text-[13px] text-[#8E8E93]">
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="text-ios-blue font-medium hover:underline">
                            Create one
                        </Link>
                    </p>
                </form>
            </motion.div>
        </div>
    );
}

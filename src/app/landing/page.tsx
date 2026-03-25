'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import AutomatedDemo from '@/components/landing/AutomatedDemo';
import {
  Brain,
  Shield,
  ArrowLeftRight,
  MessageSquare,
  Star,
  BarChart3,
  Globe,
  Zap,
  ChevronRight,
  Play,
  Github,
  Twitter,
  Linkedin,
  ExternalLink,
  Sparkles,
  Lock,
  Users,
  TrendingUp,
  X,
} from 'lucide-react';

/* ----- Animated counter ----- */
function AnimatedCounter({ target, suffix = '', prefix = '' }: { target: string; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const numericTarget = parseFloat(target.replace(/[^0-9.]/g, ''));

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = numericTarget / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericTarget) {
        setCount(numericTarget);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [numericTarget]);

  const formatted = numericTarget >= 100 ? Math.floor(count).toLocaleString() : count.toFixed(1);
  return <span>{prefix}{formatted}{suffix}</span>;
}

/* ----- Particle Background ----- */
function ParticleHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];

    function resize() {
      canvas!.width = canvas!.offsetWidth * window.devicePixelRatio;
      canvas!.height = canvas!.offsetHeight * window.devicePixelRatio;
      ctx!.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.offsetWidth, canvas!.offsetHeight);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(0, 122, 255, ${0.08 * (1 - dist / 120)})`;
            ctx!.lineWidth = 0.5;
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas!.offsetWidth) p.vx *= -1;
        if (p.y < 0 || p.y > canvas!.offsetHeight) p.vy *= -1;

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(0, 122, 255, ${p.opacity})`;
        ctx!.fill();
      });

      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

/* ----- Feature card data ----- */
const features = [
  { icon: Brain, title: 'AI Matching Engine', desc: 'Autonomous agents scan the network 24/7 to find perfect resource matches using deep learning.', color: '#AF52DE' },
  { icon: Shield, title: 'Blockchain Trust', desc: 'Every transaction is verified and immutable on-chain, ensuring complete transparency.', color: '#007AFF' },
  { icon: ArrowLeftRight, title: 'Real-Time Exchange', desc: 'Instant global trading with sub-second matching across 156 countries.', color: '#34C759' },
  { icon: MessageSquare, title: 'Smart Negotiation', desc: 'AI agents handle deal terms, counter-offers, and fair value assessment automatically.', color: '#FF9500' },
  { icon: Star, title: 'Reputation System', desc: 'Gamified trust scores, achievement badges, and community-driven ratings.', color: '#FF2D55' },
  { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Deep insights, performance metrics, and AI-powered trading recommendations.', color: '#5AC8FA' },
];

/* ----- Steps data ----- */
const steps = [
  { num: '01', title: 'List Your Resource', desc: 'Add skills, services, or items you want to trade. AI categorizes and values them automatically.' },
  { num: '02', title: 'AI Finds Matches', desc: 'Six autonomous agents scan the entire network to find optimal matches in real-time.' },
  { num: '03', title: 'Negotiate Terms', desc: 'AI handles negotiation, suggests fair values, and manages counter-offers seamlessly.' },
  { num: '04', title: 'Complete Trade', desc: 'Exchange is recorded on blockchain, trust scores update, and you earn XP and badges.' },
];

/* ----- Stats data ----- */
const stats = [
  { value: '2.4', suffix: 'M+', label: 'Trades Completed' },
  { value: '156', suffix: '', label: 'Countries Active' },
  { value: '99.7', suffix: '%', label: 'AI Match Rate' },
  { value: '2.1', suffix: 'B', label: 'Network Value', prefix: '₿' },
];

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <div className="min-h-screen bg-background text-label-primary overflow-x-hidden">
      {/* ═══ NAVBAR ═══ */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.28, 0.84, 0.42, 1] }}
        className="fixed top-0 left-0 right-0 z-50 liquid-glass-header"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/landing" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-[10px] bg-ios-blue flex items-center justify-center shadow-[0_0_20px_rgba(0,122,255,0.3)]">
              <Zap className="w-4 h-4 text-label-primary" />
            </div>
            <span className="text-[17px] font-bold tracking-tight">
              Global <span className="text-ios-blue">BarterNet</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {['Features', 'How it Works', 'AI Engine', 'Blockchain'].map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(/ /g, '-')}`} className="text-[14px] text-label-secondary hover:text-label-primary transition-colors font-medium">
                {link}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="text-[14px] text-label-secondary hover:text-label-primary font-medium transition-colors hidden sm:block">
              Sign In
            </Link>
            <Link
              href="/register"
              className="bg-ios-blue text-label-primary text-[14px] font-semibold px-5 py-2 rounded-full hover:opacity-90 active:scale-[0.97] transition-all shadow-[0_0_20px_rgba(0,122,255,0.25)]"
            >
              Launch App
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* ═══ HERO ═══ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-16">
        <ParticleHero />
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-ios-blue/[0.06] rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-ios-purple/[0.05] rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-ios-green/[0.03] rounded-full blur-[100px]" />
        </div>

        <motion.div style={{ opacity: heroOpacity, y: heroY }} className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 liquid-glass-pill rounded-full px-4 py-1.5 mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-ios-blue" />
            <span className="text-[12px] font-medium text-label-secondary">Powered by AI × Blockchain</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-[56px] md:text-[72px] lg:text-[84px] font-extrabold leading-[0.95] tracking-[-0.04em]"
          >
            <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">The Future</span>
            <br />
            <span className="bg-gradient-to-r from-ios-blue via-ios-purple to-ios-teal bg-clip-text text-transparent">of Exchange</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-[18px] md:text-[20px] text-label-secondary mt-6 max-w-2xl mx-auto leading-relaxed font-light"
          >
            Where AI Meets Blockchain to Create a Post-Currency Economy.
            <br className="hidden md:block" />
            Trade resources, knowledge, and services — without money.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Link
              href="/register"
              className="group bg-ios-blue text-[var(--background)] text-[16px] font-bold px-8 py-3.5 rounded-[16px] hover:opacity-90 active:scale-[0.97] transition-all flex items-center gap-2 shadow-[0_4px_20px_var(--ios-blue)]"
            >
              Start Trading
              <ChevronRight className="w-[18px] h-[18px] group-hover:translate-x-1 transition-transform" />
            </Link>
            <button 
              onClick={() => setIsVideoModalOpen(true)}
              className="group liquid-glass-btn text-label-primary text-[16px] font-semibold px-8 py-3.5 rounded-[16px] flex items-center gap-2 hover:bg-[var(--fill-secondary)] transition-all border border-[var(--separator)]"
            >
              <span className="w-6 h-6 rounded-full bg-ios-blue/20 flex items-center justify-center group-hover:bg-ios-blue/40 transition-colors">
                <Play className="w-3 h-3 text-ios-blue ml-0.5" />
              </span>
              Watch Demo
            </button>
          </motion.div>

          {/* Floating glass cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="hidden lg:flex items-center justify-center gap-4 mt-16"
          >
            {[
              { icon: '🤖', label: 'NOVA scanning...', sub: '96.2% efficiency' },
              { icon: '⛓️', label: 'Block #4,521,890', sub: 'Confirmed ✓' },
              { icon: '🔥', label: '+247 trades today', sub: 'Network growing' },
            ].map((card, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -6, 0] }}
                transition={{ delay: i * 0.3, duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="liquid-glass-card px-5 py-3 rounded-[16px] flex items-center gap-3"
              >
                <span className="text-[20px]">{card.icon}</span>
                <div className="text-left">
                  <p className="text-[13px] font-medium text-label-primary">{card.label}</p>
                  <p className="text-[11px] text-label-tertiary">{card.sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[11px] text-label-quaternary font-medium tracking-wider uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border border-label-quaternary flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 bg-label-tertiary rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="relative border-y border-separator">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-[36px] md:text-[44px] font-extrabold tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} prefix={stat.prefix || ''} />
                </p>
                <p className="text-[13px] text-label-secondary mt-1 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-ios-purple/[0.04] rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[12px] font-semibold text-ios-blue uppercase tracking-widest">Why BarterNet</span>
            <h2 className="text-[36px] md:text-[48px] font-bold tracking-tight mt-3">
              Trade Smarter, Not Harder
            </h2>
            <p className="text-label-secondary text-[17px] mt-3 max-w-2xl mx-auto">
              Six pillars of innovation that make Global BarterNet the most advanced trading platform on the planet.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="liquid-glass-card p-7 rounded-[20px] group"
              >
                <div
                  className="w-12 h-12 rounded-[14px] flex items-center justify-center mb-5"
                  style={{ backgroundColor: f.color + '18' }}
                >
                  <f.icon className="w-6 h-6" style={{ color: f.color }} strokeWidth={1.5} />
                </div>
                <h3 className="text-[18px] font-semibold text-label-primary mb-2">{f.title}</h3>
                <p className="text-[14px] text-label-secondary leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how-it-works" className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-ios-green/[0.03] rounded-full blur-[100px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[12px] font-semibold text-ios-green uppercase tracking-widest">How It Works</span>
            <h2 className="text-[36px] md:text-[48px] font-bold tracking-tight mt-3">
              Four Steps to Freedom
            </h2>
            <p className="text-label-secondary text-[17px] mt-3 max-w-xl mx-auto">
              From listing to completion — everything is automated, secure, and instant.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="liquid-glass-card p-6 rounded-[20px] relative"
              >
                <div className="text-[48px] font-extrabold text-ios-blue/10 absolute top-4 right-5">{step.num}</div>
                <div className="w-10 h-10 rounded-[12px] bg-ios-blue/12 flex items-center justify-center mb-4">
                  <span className="text-[16px] font-bold text-ios-blue">{step.num}</span>
                </div>
                <h3 className="text-[17px] font-semibold text-label-primary mb-2">{step.title}</h3>
                <p className="text-[13px] text-label-secondary leading-relaxed">{step.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                    <ChevronRight className="w-5 h-5 text-label-quaternary" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ AI ENGINE ═══ */}
      <section id="ai-engine" className="py-24 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-ios-purple/[0.04] rounded-full blur-[120px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[12px] font-semibold text-ios-purple uppercase tracking-widest">AI Engine</span>
              <h2 className="text-[36px] md:text-[48px] font-bold tracking-tight mt-3">
                Six Autonomous Agents
              </h2>
              <p className="text-label-secondary text-[17px] mt-4 leading-relaxed">
                Our swarm of AI agents works around the clock — scanning, matching, negotiating, and validating trades with superhuman efficiency. Each agent specializes in a unique role.
              </p>
              <div className="grid grid-cols-2 gap-3 mt-8">
                {[
                  { name: 'NOVA', role: 'Matcher', emoji: '🤖', color: '#007AFF' },
                  { name: 'ATLAS', role: 'Negotiator', emoji: '🧠', color: '#AF52DE' },
                  { name: 'SENTINEL', role: 'Validator', emoji: '🛡️', color: '#34C759' },
                  { name: 'ORACLE', role: 'Analyst', emoji: '🔮', color: '#5AC8FA' },
                ].map((agent) => (
                  <div key={agent.name} className="liquid-glass-card p-4 rounded-[16px] flex items-center gap-3">
                    <span className="text-[24px]">{agent.emoji}</span>
                    <div>
                      <p className="text-[14px] font-semibold text-label-primary">{agent.name}</p>
                      <p className="text-[11px]" style={{ color: agent.color }}>{agent.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="hidden lg:block"
            >
              <div className="liquid-glass-hero p-8 rounded-[24px]">
                <div className="space-y-4">
                  {[
                    { agent: 'NOVA', action: 'Found 96% match: GPU Time ↔ ML Dataset', time: '12s ago', color: '#007AFF' },
                    { agent: 'ATLAS', action: 'Negotiating trade #1247 — counter-offer sent', time: '45s ago', color: '#AF52DE' },
                    { agent: 'SENTINEL', action: 'Verified blockchain tx: 0xabc...def ✓', time: '2m ago', color: '#34C759' },
                    { agent: 'ORACLE', action: 'Market report: Tech resources trending +23%', time: '5m ago', color: '#5AC8FA' },
                    { agent: 'NOVA', action: 'Scanning 24,891 active listings...', time: 'now', color: '#007AFF' },
                  ].map((log, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-[12px] bg-fill-quaternary"
                    >
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0 animate-pulse" style={{ backgroundColor: log.color }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px]">
                          <span className="font-semibold" style={{ color: log.color }}>{log.agent}</span>
                          <span className="text-label-secondary"> — {log.action}</span>
                        </p>
                        <p className="text-[11px] text-label-quaternary mt-0.5">{log.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ BLOCKCHAIN ═══ */}
      <section id="blockchain" className="py-24 relative border-t border-separator">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[12px] font-semibold text-ios-indigo uppercase tracking-widest">Blockchain</span>
            <h2 className="text-[36px] md:text-[48px] font-bold tracking-tight mt-3">
              Trust Built On-Chain
            </h2>
            <p className="text-label-secondary text-[17px] mt-3 max-w-2xl mx-auto">
              Every trade is immutably recorded. Every reputation score is verifiable. Zero trust assumptions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: Lock, title: 'Immutable Ledger', desc: 'Trades recorded permanently on Ethereum with full transparency.', value: '12,847', label: 'Transactions', color: '#5856D6' },
              { icon: Users, title: 'Decentralized Trust', desc: 'No central authority. Reputation scores computed from on-chain data.', value: '99.99%', label: 'Uptime', color: '#34C759' },
              { icon: TrendingUp, title: 'Gas Optimized', desc: 'Batched transactions save up to 80% on gas fees via smart contracts.', value: '80%', label: 'Gas Saved', color: '#FF9500' },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="liquid-glass-card p-7 rounded-[20px]"
              >
                <card.icon className="w-8 h-8 mb-4" style={{ color: card.color }} strokeWidth={1.5} />
                <h3 className="text-[18px] font-semibold text-label-primary mb-2">{card.title}</h3>
                <p className="text-[14px] text-label-secondary leading-relaxed mb-5">{card.desc}</p>
                <div className="pt-4 border-t border-separator">
                  <p className="text-[28px] font-bold text-label-primary">{card.value}</p>
                  <p className="text-[12px] text-label-tertiary mt-0.5">{card.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-32 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-ios-blue/[0.06] rounded-full blur-[150px]" />
        </div>
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[40px] md:text-[56px] font-extrabold tracking-tight leading-[1.05]">
              Ready to Trade
              <br />
              <span className="bg-gradient-to-r from-ios-blue to-ios-purple bg-clip-text text-transparent">Without Currency?</span>
            </h2>
            <p className="text-label-secondary text-[18px] mt-5 max-w-lg mx-auto">
              Join 24,000+ traders in the world&apos;s first AI-powered, blockchain-verified exchange network.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
              <Link
                href="/register"
                className="group bg-ios-blue text-label-primary text-[17px] font-bold px-10 py-4 rounded-[16px] hover:opacity-90 active:scale-[0.97] transition-all flex items-center gap-2 shadow-[0_6px_40px_rgba(0,122,255,0.4)]"
              >
                Join the Network
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-separator py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-[8px] bg-ios-blue flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5 text-label-primary" />
                </div>
                <span className="text-[15px] font-bold">Global BarterNet</span>
              </div>
              <p className="text-[13px] text-label-secondary leading-relaxed">
                AI-Mediated Blockchain Resource Exchange. The post-currency economy starts here.
              </p>
            </div>
            {[
              { title: 'Platform', links: ['Exchange', 'AI Agents', 'Blockchain', 'Analytics'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Compliance'] },
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-[12px] font-semibold text-label-tertiary uppercase tracking-wider mb-4">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-[14px] text-label-secondary hover:text-label-primary transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-separator">
            <p className="text-[12px] text-label-quaternary">© 2026 Global BarterNet. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              {[Github, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="text-label-quaternary hover:text-label-primary transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
      {/* Video Demo Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl aspect-video bg-[var(--background-secondary)] rounded-2xl border border-[var(--separator)] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] relative group"
            >
              {/* Close Button */}
              <button 
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 transition-all opacity-0 group-hover:opacity-100"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Actual Automated Demo Simulation */}
              <div className="w-full h-full bg-black flex items-center justify-center relative">
                <AutomatedDemo />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    color: string;
}

const PARTICLE_COLORS = [
    'rgba(0, 122, 255, 0.4)',   // iOS Blue
    'rgba(90, 200, 250, 0.3)',  // iOS Teal
    'rgba(175, 82, 222, 0.25)', // iOS Purple
    'rgba(88, 86, 214, 0.2)',   // iOS Indigo
];

export default function ParticleField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const particlesRef = useRef<Particle[]>([]);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            setDimensions({ width: window.innerWidth, height: window.innerHeight });
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        // Initialize particles — fewer, more subtle
        const particleCount = Math.min(40, Math.floor((window.innerWidth * window.innerHeight) / 35000));
        particlesRef.current = Array.from({ length: particleCount }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.15,
            vy: (Math.random() - 0.5) * 0.15,
            size: Math.random() * 1.5 + 0.5,
            opacity: Math.random() * 0.4 + 0.1,
            color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        }));

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const particles = particlesRef.current;
            const mouse = mouseRef.current;

            particles.forEach((p) => {
                // Subtle mouse repulsion
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    const force = (120 - dist) / 120;
                    p.vx -= (dx / dist) * force * 0.008;
                    p.vy -= (dy / dist) * force * 0.008;
                }

                // Velocity dampening
                p.vx *= 0.998;
                p.vy *= 0.998;

                p.x += p.vx;
                p.y += p.vy;

                // Wrap around
                if (p.x < -10) p.x = canvas.width + 10;
                if (p.x > canvas.width + 10) p.x = -10;
                if (p.y < -10) p.y = canvas.height + 10;
                if (p.y > canvas.height + 10) p.y = -10;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            });

            // Draw connections — very subtle
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 160) {
                        const alpha = (1 - dist / 160) * 0.06;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0, 122, 255, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <motion.canvas
            ref={canvasRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ width: '100%', height: '100%' }}
        />
    );
}

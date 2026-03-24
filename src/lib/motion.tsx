'use client';
import { motion } from 'framer-motion';

// Pre-built motion components to avoid <motion.div> JSX member-expression
// which causes SWC parse errors on Vercel's Linux build environment
export const MotionDiv = motion.div;
export const MotionSpan = motion.span;
export const MotionButton = motion.button;
export const MotionNav = motion.nav;
export const MotionH1 = motion.h1;
export const MotionH2 = motion.h2;
export const MotionP = motion.p;
export const MotionTr = motion.tr;
export const MotionSection = motion.section;
export const MotionA = motion.a;

// Re-export everything else from framer-motion
export { AnimatePresence, useScroll, useTransform } from 'framer-motion';

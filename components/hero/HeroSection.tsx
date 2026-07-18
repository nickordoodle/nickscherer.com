'use client';

import { motion } from 'framer-motion';
import { ArrowDown, FileText, Download } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas';
import { useTheme } from '@/app/providers';

export default function HeroSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: isDark ? 'var(--gradient-hero)' : 'var(--gradient-hero)' }}
    >
      <ParticleCanvas />

      {/* Radial glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full animate-pulse-glow"
          style={{ background: 'radial-gradient(circle, rgba(0,217,255,0.08) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full animate-pulse-glow"
          style={{
            background: 'radial-gradient(circle, rgba(147,51,234,0.08) 0%, transparent 70%)',
            animationDelay: '1s',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 w-full min-w-0 max-w-5xl mx-auto">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div
              className="w-24 h-24 rounded-full border-2 flex items-center justify-center overflow-hidden"
              style={{ borderColor: 'var(--accent-cyan)', background: 'hsl(var(--surface))' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/avatar-placeholder.svg"
                alt="Nick Scherer"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className="absolute -inset-1 rounded-full opacity-40 animate-spin-slow"
              style={{
                background: 'conic-gradient(from 0deg, var(--accent-cyan), var(--accent-purple), transparent, var(--accent-cyan))',
                mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), white calc(100% - 2px))',
                WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), white calc(100% - 2px))',
              }}
            />
          </div>
        </motion.div>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="section-label mb-4"
        >
          VP of Engineering · Agentic AI · Army Veteran
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-6"
        >
          <span className="gradient-text">Nick</span>
          <br />
          <span style={{ color: 'hsl(var(--foreground))' }}>Scherer</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: 'hsl(var(--muted))' }}
        >
          Building at the intersection of{' '}
          <span style={{ color: 'var(--accent-cyan)' }}>Agentic AI</span>,{' '}
          <span style={{ color: 'var(--accent-purple)' }}>Big Data</span>, and{' '}
          <span style={{ color: 'var(--accent-gold)' }}>Music Technology</span>.
          <br className="hidden sm:block" />
          Ex-Amazon · Rostrum Pacific / SpaceHeater · Creator of Avi AI
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap gap-3 sm:gap-4 justify-center"
        >
          <button
            onClick={() => scrollTo('experience')}
            className="px-5 sm:px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-purple))',
              color: '#fff',
              boxShadow: '0 0 30px rgba(0,217,255,0.3)',
            }}
          >
            View My Work
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="px-5 sm:px-8 py-3 rounded-full text-sm font-semibold border transition-all duration-300 hover:scale-105"
            style={{
              borderColor: 'var(--accent-cyan)',
              color: 'var(--accent-cyan)',
              background: 'rgba(0,217,255,0.05)',
            }}
          >
            Let&apos;s Connect
          </button>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 sm:px-8 py-3 rounded-full text-sm font-semibold border transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
            style={{
              borderColor: 'hsl(var(--border))',
              color: 'hsl(var(--muted))',
              background: 'hsl(var(--surface))',
            }}
          >
            <FileText size={14} /> View Resume
          </a>
          <a
            href="/resume.pdf"
            download="Nick_Scherer_Resume.pdf"
            className="px-5 sm:px-8 py-3 rounded-full text-sm font-semibold border transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
            style={{
              borderColor: 'hsl(var(--border))',
              color: 'hsl(var(--muted))',
              background: 'hsl(var(--surface))',
            }}
          >
            <Download size={14} /> Download Resume
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => scrollTo('about')}
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: 'hsl(var(--muted))' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown size={18} style={{ color: 'var(--accent-cyan)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

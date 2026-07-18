'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import { Zap, Shield, Music, Brain } from 'lucide-react';

const pillars = [
  {
    icon: Brain,
    title: 'Agentic AI Builder',
    description:
      'Pioneering multi-agent AI systems that turn complex data into natural language insights — from music royalty analytics to autonomous pipelines.',
    color: 'var(--accent-cyan)',
  },
  {
    icon: Zap,
    title: 'Engineering Leader',
    description:
      'VP-level engineering executive with a track record of building and scaling high-performance engineering teams at startups through acquisition.',
    color: 'var(--accent-purple)',
  },
  {
    icon: Music,
    title: 'Music Tech Innovator',
    description:
      'Building SpaceHeater — the modern music distribution and catalog management platform powering labels, distributors, and catalog owners.',
    color: 'var(--accent-gold)',
  },
  {
    icon: Shield,
    title: 'Army Veteran',
    description:
      'Distinguished Military Graduate. Led 44-person operations, managed $100M+ in assets, and earned multiple Army Commendation Medals.',
    color: '#22c55e',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-padding max-w-7xl mx-auto">
      <ScrollReveal>
        <p className="section-label mb-3">About</p>
        <h2 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: 'hsl(var(--foreground))' }}>
          Building the AI Future
          <br />
          <span className="gradient-text">of Music & Technology</span>
        </h2>
      </ScrollReveal>

      <div className="grid lg:grid-cols-2 gap-12 mt-12">
        <ScrollReveal delay={0.1}>
          <div className="space-y-6 text-lg leading-relaxed" style={{ color: 'hsl(var(--muted))' }}>
            <p>
              I&apos;m Nick Scherer — a VP of Engineering and Agentic AI specialist based in Los Angeles,
              currently leading engineering at{' '}
              <a
                href="https://avi.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium transition-colors hover:underline"
                style={{ color: 'var(--accent-cyan)' }}
              >
                Rostrum Pacific
              </a>{' '}
              where we&apos;re building SpaceHeater, a next-generation music distribution platform.
            </p>
            <p>
              My career spans from{' '}
              <span style={{ color: 'hsl(var(--foreground))' }}>Amazon</span> (Kindle Unlimited &amp;
              Emerging Marketplaces) to founding-engineer roles at seed-stage startups through
              acquisition. I hold a Master&apos;s in Data Science &amp; Engineering from UC San Diego
              and a BS in Computer Science from Rutgers.
            </p>
            <p>
              Before tech, I served as an{' '}
              <span style={{ color: '#22c55e' }}>Infantry Officer in the US Army</span>, leading
              44-person operations and managing over $100M in assets — an experience that shaped
              how I think about leadership, execution under pressure, and building high-trust teams.
            </p>
            <p>
              I&apos;m also the creator of{' '}
              <a
                href="https://avi.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium transition-colors hover:underline"
                style={{ color: 'var(--accent-purple)' }}
              >
                Avi AI
              </a>{' '}
              — a conversational AI platform built to make advanced AI accessible to everyone.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-4">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal key={pillar.title} delay={0.1 + i * 0.08}>
                <div
                  className="p-6 rounded-2xl border h-full transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    background: 'hsl(var(--surface))',
                    borderColor: 'hsl(var(--border))',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${pillar.color}18`, border: `1px solid ${pillar.color}30` }}
                  >
                    <Icon size={20} style={{ color: pillar.color }} />
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: 'hsl(var(--foreground))' }}>
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'hsl(var(--muted))' }}>
                    {pillar.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

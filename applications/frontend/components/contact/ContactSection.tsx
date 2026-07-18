'use client';

import { Linkedin, Github, ExternalLink, MapPin } from 'lucide-react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import TiltCard from '@/components/ui/TiltCard';

const LINKS = [
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/nicholas-scherer',
    href: 'https://www.linkedin.com/in/nicholas-scherer',
    color: '#0a66c2',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/nickordoodle',
    href: 'https://github.com/nickordoodle',
    color: 'hsl(var(--muted))',
  },
  {
    icon: ExternalLink,
    label: 'Avi AI',
    value: 'avi.ai',
    href: 'https://avi.ai',
    color: 'var(--accent-purple)',
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding max-w-7xl mx-auto">
      <ScrollReveal>
        <p className="section-label mb-3">Contact</p>
        <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'hsl(var(--foreground))' }}>
          Let&apos;s <span className="gradient-text">Connect</span>
        </h2>
        <p className="text-lg mb-16" style={{ color: 'hsl(var(--muted))' }}>
          Open to select consulting, advisory roles, and interesting conversations.
        </p>
      </ScrollReveal>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left: Avatar + bio */}
        <ScrollReveal delay={0.1}>
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
            <div className="relative">
              <div
                className="w-32 h-32 rounded-full border-2 overflow-hidden"
                style={{ borderColor: 'var(--accent-cyan)' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/avatar-placeholder.svg"
                  alt="Nick Scherer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute -inset-1 rounded-full opacity-30"
                style={{
                  background: 'conic-gradient(from 0deg, var(--accent-cyan), var(--accent-purple), transparent)',
                  mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), white calc(100% - 2px))',
                  WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), white calc(100% - 2px))',
                }}
              />
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-1" style={{ color: 'hsl(var(--foreground))' }}>
                Nick Scherer
              </h3>
              <p className="font-medium mb-2" style={{ color: 'var(--accent-cyan)' }}>
                VP of Engineering · Agentic AI Builder
              </p>
              <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                <MapPin size={13} style={{ color: 'hsl(var(--muted))' }} />
                <span className="text-sm" style={{ color: 'hsl(var(--muted))' }}>
                  Los Angeles, California
                </span>
              </div>
            </div>

            <p className="text-sm leading-relaxed max-w-md" style={{ color: 'hsl(var(--muted))' }}>
              I&apos;m always interested in connecting with fellow builders, AI enthusiasts, and anyone
              working on interesting problems. Whether it&apos;s a quick chat or a serious engagement — don&apos;t
              hesitate to reach out.
            </p>
          </div>
        </ScrollReveal>

        {/* Right: Contact links */}
        <div className="space-y-4">
          {LINKS.map((link, i) => {
            const Icon = link.icon;
            return (
              <ScrollReveal key={link.label} delay={0.1 + i * 0.08}>
                <TiltCard intensity={5}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-5 rounded-2xl border group transition-all duration-300 hover:scale-[1.01]"
                    style={{
                      background: 'hsl(var(--surface))',
                      borderColor: 'hsl(var(--border))',
                      textDecoration: 'none',
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: `${link.color}12`,
                        border: `1px solid ${link.color}25`,
                      }}
                    >
                      <Icon size={20} style={{ color: link.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'hsl(var(--muted))' }}>
                        {link.label}
                      </p>
                      <p className="text-sm font-medium truncate" style={{ color: 'hsl(var(--foreground))' }}>
                        {link.value}
                      </p>
                    </div>
                    <ExternalLink
                      size={14}
                      className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: link.color }}
                    />
                  </a>
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <ScrollReveal delay={0.3}>
        <div
          className="mt-24 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-sm"
          style={{ borderColor: 'hsl(var(--border))', color: 'hsl(var(--muted))' }}
        >
          <span>© {new Date().getFullYear()} Nick Scherer. All rights reserved.</span>
        </div>
      </ScrollReveal>
    </section>
  );
}

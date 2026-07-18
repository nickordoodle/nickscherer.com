'use client';

import { useState } from 'react';
import { ChevronDown, Briefcase, Shield } from 'lucide-react';
import { roles } from '@/lib/data';
import TiltCard from '@/components/ui/TiltCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';

const SECTOR_COLORS: Record<string, string> = {
  tech: 'var(--accent-cyan)',
  military: '#22c55e',
  education: 'var(--accent-gold)',
};

const SECTOR_LABELS: Record<string, string> = {
  tech: 'Tech',
  military: 'Military',
  education: 'Education',
};

export default function WorkHistory() {
  const [expandedId, setExpandedId] = useState<string | null>('rostrum-vpe');

  return (
    <section id="experience" className="section-padding max-w-7xl mx-auto">
      <ScrollReveal>
        <p className="section-label mb-3">Experience</p>
        <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'hsl(var(--foreground))' }}>
          Career <span className="gradient-text">History</span>
        </h2>
        <p className="text-lg mb-16" style={{ color: 'hsl(var(--muted))' }}>
          From Army Infantry Officer to VP of Engineering — a decade of building, leading, and shipping.
        </p>
      </ScrollReveal>

      <div className="relative">
        {/* Vertical timeline line */}
        <div
          className="absolute left-6 top-0 bottom-0 w-px hidden sm:block"
          style={{
            background: 'linear-gradient(180deg, var(--accent-cyan), var(--accent-purple), transparent)',
          }}
        />

        <div className="space-y-6">
          {roles.map((role, i) => {
            const isExpanded = expandedId === role.id;
            const color = SECTOR_COLORS[role.sector];
            const isFirst = i === 0;

            return (
              <ScrollReveal key={role.id} delay={i * 0.05}>
                {/* Dot is on the outer wrapper so it shares the same left reference as the line */}
                <div className="relative sm:pl-20">
                  <div
                    className="absolute hidden sm:block z-10 top-6 w-4 h-4 rounded-full border-2"
                    style={{
                      left: '1.5rem',
                      transform: 'translateX(-50%)',
                      borderColor: color,
                      background: isFirst ? color : 'hsl(var(--background))',
                      boxShadow: isFirst ? `0 0 12px ${color}` : 'none',
                    }}
                  />

                  <TiltCard intensity={6}>
                    <div
                      className="rounded-2xl border overflow-hidden transition-all duration-300"
                      style={{
                        background: 'hsl(var(--surface))',
                        borderColor: isExpanded ? color : 'hsl(var(--border))',
                        boxShadow: isExpanded ? `0 0 0 1px ${color}20, 0 4px 24px ${color}10` : 'none',
                      }}
                    >
                      {/* Header */}
                      <button
                        className="w-full text-left p-6 flex items-start gap-4"
                        onClick={() => setExpandedId(isExpanded ? null : role.id)}
                      >
                        {/* Icon */}
                        <div
                          className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center mt-0.5"
                          style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                        >
                          {role.sector === 'military' ? (
                            <Shield size={18} style={{ color }} />
                          ) : (
                            <Briefcase size={18} style={{ color }} />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span
                              className="text-xs font-semibold px-2 py-0.5 rounded-full"
                              style={{ background: `${color}15`, color }}
                            >
                              {SECTOR_LABELS[role.sector]}
                            </span>
                            {isFirst && (
                              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400">
                                Current
                              </span>
                            )}
                          </div>
                          <h3
                            className="font-bold text-lg leading-snug"
                            style={{ color: 'hsl(var(--foreground))' }}
                          >
                            {role.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                            <span className="font-semibold text-sm" style={{ color }}>
                              {role.company}
                            </span>
                            <span className="text-xs" style={{ color: 'hsl(var(--muted))' }}>
                              {role.startDate} — {role.endDate}
                            </span>
                            <span className="text-xs" style={{ color: 'hsl(var(--muted))' }}>
                              {role.location}
                            </span>
                          </div>
                        </div>

                        <ChevronDown
                          size={18}
                          className={cn(
                            'flex-shrink-0 mt-1 transition-transform duration-300',
                            isExpanded && 'rotate-180'
                          )}
                          style={{ color: 'hsl(var(--muted))' }}
                        />
                      </button>

                      {/* Expandable body */}
                      <div
                        className={cn(
                          'overflow-hidden transition-all duration-300',
                          isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                        )}
                      >
                        <div className="px-6 pb-6 pt-0 border-t" style={{ borderColor: 'hsl(var(--border))' }}>
                          <p className="text-sm leading-relaxed mt-4 mb-4" style={{ color: 'hsl(var(--muted))' }}>
                            {role.description}
                          </p>
                          <ul className="space-y-2">
                            {role.bullets.map((bullet, bi) => (
                              <li key={bi} className="flex items-start gap-3 text-sm">
                                <span
                                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2"
                                  style={{ background: color }}
                                />
                                <span style={{ color: 'hsl(var(--foreground))' }}>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

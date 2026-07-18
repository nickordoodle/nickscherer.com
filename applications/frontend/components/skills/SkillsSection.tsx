'use client';

import dynamic from 'next/dynamic';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ImpactMetrics from './ImpactMetrics';

const SkillsRadar = dynamic(() => import('./SkillsRadar'), { ssr: false });
const CareerTimelineChart = dynamic(() => import('./CareerTimelineChart'), { ssr: false });
const TechBubbles = dynamic(() => import('./TechBubbles'), { ssr: false });

export default function SkillsSection() {
  return (
    <section id="skills" className="section-padding max-w-7xl mx-auto">
      <ScrollReveal>
        <p className="section-label mb-3">Skills & Data</p>
        <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'hsl(var(--foreground))' }}>
          By the <span className="gradient-text">Numbers</span>
        </h2>
        <p className="text-lg mb-16" style={{ color: 'hsl(var(--muted))' }}>
          A decade of impact — visualized.
        </p>
      </ScrollReveal>

      {/* Impact stats */}
      <ScrollReveal delay={0.1}>
        <div className="mb-16">
          <h3 className="text-sm font-semibold tracking-widest uppercase mb-6" style={{ color: 'hsl(var(--muted))' }}>
            Career Impact
          </h3>
          <ImpactMetrics />
        </div>
      </ScrollReveal>

      {/* Charts grid */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Skills Radar */}
        <ScrollReveal delay={0.1}>
          <div
            className="p-6 rounded-2xl border"
            style={{ background: 'hsl(var(--surface))', borderColor: 'hsl(var(--border))' }}
          >
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'hsl(var(--muted))' }}>
              Skills Proficiency
            </h3>
            <SkillsRadar />
          </div>
        </ScrollReveal>

        {/* Career Timeline */}
        <ScrollReveal delay={0.15}>
          <div
            className="p-6 rounded-2xl border"
            style={{ background: 'hsl(var(--surface))', borderColor: 'hsl(var(--border))' }}
          >
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'hsl(var(--muted))' }}>
              Career Timeline
            </h3>
            <div className="flex gap-4 mb-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
                <span style={{ color: 'hsl(var(--muted))' }}>Military</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00d9ff]" />
                <span style={{ color: 'hsl(var(--muted))' }}>Tech</span>
              </span>
            </div>
            <CareerTimelineChart />
          </div>
        </ScrollReveal>
      </div>

      {/* Tech Bubbles — full width */}
      <ScrollReveal delay={0.1}>
        <div
          className="p-6 rounded-2xl border"
          style={{ background: 'hsl(var(--surface))', borderColor: 'hsl(var(--border))' }}
        >
          <h3 className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: 'hsl(var(--muted))' }}>
            Technology Stack — Years of Experience
          </h3>
          <TechBubbles />
        </div>
      </ScrollReveal>
    </section>
  );
}

'use client';

import { GraduationCap, Award } from 'lucide-react';
import { education, awards } from '@/lib/data';
import TiltCard from '@/components/ui/TiltCard';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function EducationSection() {
  return (
    <section id="education" className="section-padding max-w-7xl mx-auto">
      <ScrollReveal>
        <p className="section-label mb-3">Education & Awards</p>
        <h2 className="text-4xl sm:text-5xl font-bold mb-16" style={{ color: 'hsl(var(--foreground))' }}>
          Credentials &amp; <span className="gradient-text">Recognition</span>
        </h2>
      </ScrollReveal>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Education */}
        <div>
          <ScrollReveal>
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-6" style={{ color: 'hsl(var(--muted))' }}>
              Education
            </h3>
          </ScrollReveal>
          <div className="space-y-4">
            {education.map((edu, i) => (
              <ScrollReveal key={edu.institution} delay={i * 0.08}>
                <TiltCard intensity={6}>
                  <div
                    className="p-6 rounded-2xl border"
                    style={{ background: 'hsl(var(--surface))', borderColor: 'hsl(var(--border))' }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center"
                        style={{
                          background: 'rgba(0,217,255,0.1)',
                          border: '1px solid rgba(0,217,255,0.2)',
                        }}
                      >
                        <GraduationCap size={18} style={{ color: 'var(--accent-cyan)' }} />
                      </div>
                      <div>
                        <h4 className="font-bold" style={{ color: 'hsl(var(--foreground))' }}>
                          {edu.institution}
                        </h4>
                        <p className="text-sm font-medium mt-0.5" style={{ color: 'var(--accent-cyan)' }}>
                          {edu.degree} · {edu.field}
                        </p>
                        <p className="text-xs mt-1" style={{ color: 'hsl(var(--muted))' }}>
                          {edu.startYear} – {edu.endYear}
                        </p>
                        {edu.notes && (
                          <p className="text-xs mt-2" style={{ color: 'hsl(var(--muted))' }}>
                            {edu.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div>
          <ScrollReveal>
            <h3 className="text-sm font-semibold tracking-widest uppercase mb-6" style={{ color: 'hsl(var(--muted))' }}>
              Certifications & Awards
            </h3>
          </ScrollReveal>
          <div className="space-y-3">
            {awards.map((award, i) => (
              <ScrollReveal key={award.title} delay={i * 0.07}>
                <div
                  className="flex items-start gap-4 p-5 rounded-xl border transition-all duration-200 hover:border-[rgba(0,217,255,0.3)]"
                  style={{ background: 'hsl(var(--surface))', borderColor: 'hsl(var(--border))' }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center"
                    style={{ background: 'rgba(240,165,0,0.1)', border: '1px solid rgba(240,165,0,0.2)' }}
                  >
                    <Award size={15} style={{ color: 'var(--accent-gold)' }} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: 'hsl(var(--foreground))' }}>
                      {award.title}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: 'hsl(var(--muted))' }}>
                      {award.org}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

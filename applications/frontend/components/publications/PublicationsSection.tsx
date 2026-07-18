'use client';

import { BookOpen, ExternalLink } from 'lucide-react';
import { publications } from '@/lib/data';
import TiltCard from '@/components/ui/TiltCard';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function PublicationsSection() {
  return (
    <section id="publications" className="section-padding max-w-7xl mx-auto">
      <ScrollReveal>
        <p className="section-label mb-3">Publications</p>
        <h2 className="text-4xl sm:text-5xl font-bold mb-16" style={{ color: 'hsl(var(--foreground))' }}>
          Research &amp; <span className="gradient-text">Writing</span>
        </h2>
      </ScrollReveal>

      <div className="grid gap-6">
        {publications.map((pub, i) => (
          <ScrollReveal key={pub.title} delay={i * 0.1}>
            <TiltCard intensity={5}>
              <div
                className="p-8 rounded-2xl border relative overflow-hidden group"
                style={{ background: 'hsl(var(--surface))', borderColor: 'hsl(var(--border))' }}
              >
                {/* Accent bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
                  style={{ background: 'linear-gradient(180deg, var(--accent-cyan), var(--accent-purple))' }}
                />

                <div className="pl-4 flex items-start gap-6">
                  <div
                    className="w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center"
                    style={{
                      background: 'rgba(0,217,255,0.08)',
                      border: '1px solid rgba(0,217,255,0.15)',
                    }}
                  >
                    <BookOpen size={22} style={{ color: 'var(--accent-cyan)' }} />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-lg font-bold leading-snug" style={{ color: 'hsl(var(--foreground))' }}>
                        {pub.title}
                      </h3>
                      {pub.link && (
                        <a
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
                          style={{ background: 'rgba(0,217,255,0.1)', color: 'var(--accent-cyan)' }}
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>

                    {pub.year && (
                      <p className="text-xs mb-3 font-mono" style={{ color: 'var(--accent-cyan)' }}>
                        Published {pub.year}
                      </p>
                    )}

                    <p className="text-sm leading-relaxed mb-5" style={{ color: 'hsl(var(--muted))' }}>
                      {pub.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {pub.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 rounded-full"
                          style={{
                            background: 'rgba(0,217,255,0.06)',
                            color: 'var(--accent-cyan)',
                            border: '1px solid rgba(0,217,255,0.15)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

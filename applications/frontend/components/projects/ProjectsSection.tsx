'use client';

import { ExternalLink } from 'lucide-react';
import { projects } from '@/lib/data';
import TiltCard from '@/components/ui/TiltCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-padding max-w-7xl mx-auto">
      <ScrollReveal>
        <p className="section-label mb-3">Projects</p>
        <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'hsl(var(--foreground))' }}>
          What I&apos;ve <span className="gradient-text">Built</span>
        </h2>
        <p className="text-lg mb-16" style={{ color: 'hsl(var(--muted))' }}>
          Products shipped, startups scaled, and AI systems deployed.
        </p>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <ScrollReveal key={project.id} delay={i * 0.08}>
            <TiltCard
              className={cn('h-full', project.featured && 'md:first:col-span-2')}
              intensity={8}
            >
              <div
                className="relative h-full p-8 rounded-2xl border overflow-hidden group cursor-default"
                style={{
                  background: 'hsl(var(--surface))',
                  borderColor: 'hsl(var(--border))',
                }}
              >
                {/* Background gradient */}
                <div
                  className={cn(
                    'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500',
                    project.gradient
                  )}
                />

                <div className="relative z-10">
                  {project.featured && (
                    <span
                      className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-4"
                      style={{
                        background: 'rgba(0,217,255,0.1)',
                        color: 'var(--accent-cyan)',
                        border: '1px solid rgba(0,217,255,0.2)',
                      }}
                    >
                      Featured
                    </span>
                  )}

                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="text-xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>
                      {project.name}
                    </h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                        style={{
                          background: 'rgba(0,217,255,0.1)',
                          color: 'var(--accent-cyan)',
                          border: '1px solid rgba(0,217,255,0.2)',
                        }}
                        aria-label={`Visit ${project.name}`}
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>

                  <p className="text-sm font-medium mb-3" style={{ color: 'var(--accent-cyan)' }}>
                    {project.tagline}
                  </p>

                  <p className="text-sm leading-relaxed mb-6" style={{ color: 'hsl(var(--muted))' }}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2.5 py-1 rounded-full font-medium"
                        style={{
                          background: 'hsl(var(--surface-elevated))',
                          color: 'hsl(var(--muted))',
                          border: '1px solid hsl(var(--border))',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
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

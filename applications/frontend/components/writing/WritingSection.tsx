'use client';

import { ExternalLink, Calendar, PenLine } from 'lucide-react';
import TiltCard from '@/components/ui/TiltCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import posts from '@/lib/medium-posts.json';

interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  thumbnail: string;
  categories: string[];
}

function cleanLink(url: string) {
  try {
    const u = new URL(url);
    u.search = '';
    return u.toString();
  } catch {
    return url;
  }
}

function formatDate(pubDate: string) {
  try {
    return new Date(pubDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  } catch {
    return '';
  }
}

export default function WritingSection() {
  return (
    <section id="writing" className="section-padding max-w-7xl mx-auto">
      <ScrollReveal>
        <p className="section-label mb-3">Writing</p>
        <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'hsl(var(--foreground))' }}>
          Articles &amp; <span className="gradient-text">Insights</span>
        </h2>
        <p className="text-lg mb-10" style={{ color: 'hsl(var(--muted))' }}>
          Thoughts on engineering, AI, and lessons learned along the way.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
        {(posts as MediumPost[]).map((post, i) => (
          <ScrollReveal key={post.link} delay={i * 0.06}>
            <TiltCard intensity={5}>
              <a
                href={cleanLink(post.link)}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full rounded-2xl border overflow-hidden group transition-all duration-300"
                style={{ background: 'hsl(var(--surface))', borderColor: 'hsl(var(--border))' }}
              >
                {/* Thumbnail */}
                {post.thumbnail ? (
                  <div className="relative w-full h-44 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.thumbnail}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 50%, hsl(var(--surface)) 100%)' }} />
                  </div>
                ) : (
                  <div
                    className="w-full h-44 flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, rgba(0,217,255,0.08), rgba(168,85,247,0.08))' }}
                  >
                    <PenLine size={32} style={{ color: 'var(--accent-cyan)', opacity: 0.4 }} />
                  </div>
                )}

                <div className="p-6">
                  {/* Date */}
                  <div className="flex items-center gap-1.5 mb-3" style={{ color: 'var(--accent-cyan)' }}>
                    <Calendar size={12} />
                    <span className="text-xs font-mono">{formatDate(post.pubDate)}</span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-base font-bold leading-snug mb-3 group-hover:text-[var(--accent-cyan)] transition-colors duration-200"
                    style={{ color: 'hsl(var(--foreground))' }}
                  >
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-sm leading-relaxed mb-4 line-clamp-3" style={{ color: 'hsl(var(--muted))' }}>
                    {post.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.categories.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full"
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

                  {/* Read link */}
                  <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: 'var(--accent-cyan)' }}>
                    Read on Medium <ExternalLink size={11} />
                  </div>
                </div>
              </a>
            </TiltCard>
          </ScrollReveal>
        ))}
      </div>

      {/* View all link */}
      <ScrollReveal delay={0.3}>
        <div className="flex justify-center">
          <a
            href="https://nickordoodle.medium.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105"
            style={{
              background: 'rgba(0,217,255,0.08)',
              border: '1px solid rgba(0,217,255,0.25)',
              color: 'var(--accent-cyan)',
            }}
          >
            View all articles on Medium <ExternalLink size={14} />
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}

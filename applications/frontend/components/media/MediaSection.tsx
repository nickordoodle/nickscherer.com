'use client';

import { useState } from 'react';
import { Camera, Film, Scissors, Plus } from 'lucide-react';
import TiltCard from '@/components/ui/TiltCard';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';

type Category = 'All' | 'Photography' | 'Videography' | 'Edits';

const CATEGORIES: Category[] = ['All', 'Photography', 'Videography', 'Edits'];

const CATEGORY_ICONS: Record<Category, React.ReactNode> = {
  All: null,
  Photography: <Camera size={13} />,
  Videography: <Film size={13} />,
  Edits: <Scissors size={13} />,
};

const CATEGORY_COLORS: Record<Category, string> = {
  All: 'var(--accent-cyan)',
  Photography: 'var(--accent-cyan)',
  Videography: 'var(--accent-purple)',
  Edits: 'var(--accent-gold)',
};

interface MediaItem {
  id: string;
  category: Exclude<Category, 'All'>;
  label: string;
  aspectRatio: 'landscape' | 'portrait' | 'square';
}

// Placeholder grid — swap src paths in when you have real assets
const MEDIA_ITEMS: MediaItem[] = [
  { id: '1', category: 'Photography', label: 'Photo 01', aspectRatio: 'landscape' },
  { id: '2', category: 'Photography', label: 'Photo 02', aspectRatio: 'portrait' },
  { id: '3', category: 'Videography', label: 'Video 01', aspectRatio: 'landscape' },
  { id: '4', category: 'Photography', label: 'Photo 03', aspectRatio: 'landscape' },
  { id: '5', category: 'Edits', label: 'Edit 01', aspectRatio: 'square' },
  { id: '6', category: 'Videography', label: 'Video 02', aspectRatio: 'portrait' },
  { id: '7', category: 'Photography', label: 'Photo 04', aspectRatio: 'square' },
  { id: '8', category: 'Edits', label: 'Edit 02', aspectRatio: 'landscape' },
  { id: '9', category: 'Photography', label: 'Photo 05', aspectRatio: 'portrait' },
];

const ASPECT_CLASSES: Record<MediaItem['aspectRatio'], string> = {
  landscape: 'aspect-video',
  portrait: 'aspect-[3/4]',
  square: 'aspect-square',
};

export default function MediaSection() {
  const [active, setActive] = useState<Category>('All');

  const filtered =
    active === 'All' ? MEDIA_ITEMS : MEDIA_ITEMS.filter((m) => m.category === active);

  return (
    <section id="media" className="section-padding max-w-7xl mx-auto">
      <ScrollReveal>
        <p className="section-label mb-3">Creative</p>
        <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'hsl(var(--foreground))' }}>
          Photography &amp; <span className="gradient-text">Visual Work</span>
        </h2>
        <p className="text-lg mb-10" style={{ color: 'hsl(var(--muted))' }}>
          Capturing moments through the lens — photography, film, and post-production edits.
        </p>
      </ScrollReveal>

      {/* Category filter */}
      <ScrollReveal delay={0.05}>
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => {
            const isActive = active === cat;
            const color = CATEGORY_COLORS[cat];
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={cn(
                  'inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200'
                )}
                style={{
                  background: isActive ? `${color}18` : 'hsl(var(--surface))',
                  border: `1px solid ${isActive ? color : 'hsl(var(--border))'}`,
                  color: isActive ? color : 'hsl(var(--muted))',
                }}
              >
                {CATEGORY_ICONS[cat]}
                {cat}
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Masonry-style grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {filtered.map((item, i) => (
          <ScrollReveal key={item.id} delay={i * 0.05} className="break-inside-avoid">
            <TiltCard intensity={6}>
              <div
                className={cn(
                  'relative w-full overflow-hidden rounded-2xl border group cursor-pointer',
                  ASPECT_CLASSES[item.aspectRatio]
                )}
                style={{
                  background: 'hsl(var(--surface))',
                  borderColor: 'hsl(var(--border))',
                }}
              >
                {/* Placeholder gradient — replace with <img> or <video> */}
                <div
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg,
                      ${CATEGORY_COLORS[item.category]}10 0%,
                      hsl(var(--surface-elevated)) 40%,
                      ${CATEGORY_COLORS[item.category]}08 100%)`,
                  }}
                />

                {/* Grid pattern overlay */}
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
                    backgroundSize: '32px 32px',
                  }}
                />

                {/* Upload icon — visible until real asset is dropped in */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 opacity-30 group-hover:opacity-50 transition-opacity">
                  {item.category === 'Photography' && <Camera size={28} style={{ color: CATEGORY_COLORS[item.category] }} />}
                  {item.category === 'Videography' && <Film size={28} style={{ color: CATEGORY_COLORS[item.category] }} />}
                  {item.category === 'Edits' && <Scissors size={28} style={{ color: CATEGORY_COLORS[item.category] }} />}
                  <span className="text-xs font-mono" style={{ color: 'hsl(var(--muted))' }}>
                    {item.label}
                  </span>
                </div>

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }}
                >
                  <span
                    className="text-xs font-semibold px-2 py-1 rounded-full"
                    style={{
                      background: `${CATEGORY_COLORS[item.category]}20`,
                      color: CATEGORY_COLORS[item.category],
                      border: `1px solid ${CATEGORY_COLORS[item.category]}30`,
                    }}
                  >
                    {item.category}
                  </span>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        ))}

        {/* Add more placeholder */}
        <ScrollReveal delay={filtered.length * 0.05} className="break-inside-avoid">
          <div
            className="aspect-square w-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-default transition-colors duration-200 hover:border-[var(--accent-cyan)]"
            style={{ borderColor: 'hsl(var(--border))' }}
          >
            <Plus size={24} style={{ color: 'hsl(var(--muted))' }} />
            <span className="text-xs font-medium" style={{ color: 'hsl(var(--muted))' }}>
              More coming soon
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

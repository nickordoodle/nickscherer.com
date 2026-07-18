'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/app/providers';
import { cn } from '@/lib/utils';

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={cn(
        'relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
        'border border-[hsl(var(--border))] hover:border-[var(--accent-cyan)]',
        'bg-[hsl(var(--surface))] hover:bg-[hsl(var(--surface-elevated))]',
        'text-[hsl(var(--muted))] hover:text-[var(--accent-cyan)]',
        className
      )}
    >
      <Sun
        size={16}
        className={cn(
          'absolute transition-all duration-300',
          theme === 'light' ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
        )}
      />
      <Moon
        size={16}
        className={cn(
          'absolute transition-all duration-300',
          theme === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
        )}
      />
    </button>
  );
}

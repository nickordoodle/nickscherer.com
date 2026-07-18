'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/app/providers';

export default function CursorSpotlight() {
  const spotRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const spot = spotRef.current;
    if (!spot) return;

    let raf: number;
    let targetX = -300;
    let targetY = -300;
    let currentX = -300;
    let currentY = -300;

    function onMove(e: MouseEvent | TouchEvent) {
      if ('touches' in e) {
        targetX = e.touches[0].clientX;
        targetY = e.touches[0].clientY;
      } else {
        targetX = (e as MouseEvent).clientX;
        targetY = (e as MouseEvent).clientY;
      }
    }

    function animate() {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      if (spot) {
        spot.style.transform = `translate(${currentX - 300}px, ${currentY - 300}px)`;
      }
      raf = requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', onMove as EventListener);
    window.addEventListener('touchmove', onMove as EventListener, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove as EventListener);
      window.removeEventListener('touchmove', onMove as EventListener);
      cancelAnimationFrame(raf);
    };
  }, []);

  const isDark = theme === 'dark';

  return (
    <div
      ref={spotRef}
      className="pointer-events-none fixed top-0 left-0 z-0 rounded-full"
      aria-hidden="true"
      style={{
        width: 600,
        height: 600,
        background: isDark
          ? 'radial-gradient(circle, rgba(0,217,255,0.06) 0%, rgba(147,51,234,0.04) 40%, transparent 70%)'
          : 'radial-gradient(circle, rgba(2,132,199,0.08) 0%, rgba(124,58,237,0.05) 40%, transparent 70%)',
        willChange: 'transform',
      }}
    />
  );
}

'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { impactStats } from '@/lib/data';
import ScrollReveal from '@/components/ui/ScrollReveal';
import TiltCard from '@/components/ui/TiltCard';

export default function ImpactMetrics() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {impactStats.map((stat, i) => (
        <ScrollReveal key={stat.label} delay={i * 0.07}>
          <TiltCard intensity={8}>
            <div
              className="p-5 rounded-2xl border h-full flex flex-col justify-between"
              style={{
                background: 'hsl(var(--surface))',
                borderColor: 'hsl(var(--border))',
              }}
            >
              <AnimatedValue value={stat.value} color={stat.color} />
              <div>
                <p className="font-semibold text-sm mt-2" style={{ color: 'hsl(var(--foreground))' }}>
                  {stat.label}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'hsl(var(--muted))' }}>
                  {stat.sublabel}
                </p>
              </div>
              <div
                className="mt-3 h-0.5 rounded-full"
                style={{ background: `linear-gradient(90deg, ${stat.color}, transparent)` }}
              />
            </div>
          </TiltCard>
        </ScrollReveal>
      ))}
    </div>
  );
}

function AnimatedValue({ value, color }: { value: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
      className="text-3xl sm:text-4xl font-black font-mono"
      style={{ color }}
    >
      {value}
    </motion.div>
  );
}

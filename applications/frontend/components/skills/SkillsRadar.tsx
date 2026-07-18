'use client';

import ReactECharts from 'echarts-for-react';
import { skillAxes } from '@/lib/data';
import { useTheme } from '@/app/providers';

export default function SkillsRadar() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const option = {
    backgroundColor: 'transparent',
    radar: {
      indicator: skillAxes.map((s) => ({ name: s.name, max: s.max })),
      shape: 'polygon',
      splitNumber: 4,
      // Shrink the polygon so axis labels don't clip at edges
      radius: '58%',
      center: ['50%', '54%'],
      nameGap: 10,
      axisName: {
        color: isDark ? 'rgba(255,255,255,0.75)' : 'rgba(0,0,0,0.7)',
        fontSize: 11,
        fontFamily: 'Inter, sans-serif',
        fontWeight: '500',
      },
      splitLine: {
        lineStyle: {
          color: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)',
        },
      },
      splitArea: {
        areaStyle: {
          color: isDark
            ? ['rgba(0,217,255,0.02)', 'rgba(147,51,234,0.02)']
            : ['rgba(2,132,199,0.03)', 'rgba(124,58,237,0.03)'],
        },
      },
      axisLine: {
        lineStyle: {
          color: isDark ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.1)',
        },
      },
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: skillAxes.map((s) => s.value),
            name: 'Nick Scherer',
            areaStyle: {
              color: {
                type: 'linear',
                x: 0, y: 0, x2: 1, y2: 1,
                colorStops: [
                  { offset: 0, color: 'rgba(0,217,255,0.3)' },
                  { offset: 1, color: 'rgba(147,51,234,0.2)' },
                ],
              },
            },
            lineStyle: { color: '#00d9ff', width: 2 },
            itemStyle: { color: '#00d9ff' },
          },
        ],
        symbol: 'circle',
        symbolSize: 5,
      },
    ],
    tooltip: {
      backgroundColor: isDark ? 'rgba(15,17,23,0.95)' : 'rgba(255,255,255,0.95)',
      borderColor: isDark ? 'rgba(0,217,255,0.3)' : 'rgba(2,132,199,0.3)',
      textStyle: { color: isDark ? '#fff' : '#111', fontSize: 12 },
    },
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: 380, width: '100%' }}
    />
  );
}

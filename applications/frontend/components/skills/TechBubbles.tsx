'use client';

import ReactECharts from 'echarts-for-react';
import { techItems } from '@/lib/data';
import { useTheme } from '@/app/providers';

const CATEGORY_ORDER = ['Languages', 'Cloud', 'AI/ML', 'Data', 'Frontend', 'DevOps'];

const CATEGORY_COLORS: Record<string, string> = {
  Languages: '#00d9ff',
  Cloud: '#9333ea',
  'AI/ML': '#f43f5e',
  Data: '#a78bfa',
  Frontend: '#f0a500',
  DevOps: '#22c55e',
};

export default function TechBubbles() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const textColor = isDark ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.6)';
  const lineColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)';

  // Build one series per category so each gets its own color
  const series = CATEGORY_ORDER.map((cat) => {
    const items = techItems
      .filter((t) => t.category === cat)
      .sort((a, b) => b.years - a.years);

    return {
      name: cat,
      type: 'bar',
      stack: undefined,
      barMaxWidth: 18,
      itemStyle: {
        color: CATEGORY_COLORS[cat],
        borderRadius: [0, 4, 4, 0],
        opacity: 0.85,
      },
      emphasis: {
        itemStyle: { opacity: 1 },
      },
      data: items.map((t) => ({ name: t.name, value: t.years })),
      label: {
        show: true,
        position: 'right',
        color: textColor,
        fontSize: 10,
        formatter: '{b}',
      },
    };
  });

  // Flat sorted list of all items for the y-axis, grouped by category
  const allItems = CATEGORY_ORDER.flatMap((cat) =>
    techItems
      .filter((t) => t.category === cat)
      .sort((a, b) => b.years - a.years)
  );

  const option = {
    backgroundColor: 'transparent',
    legend: {
      data: CATEGORY_ORDER,
      bottom: 0,
      textStyle: { color: textColor, fontSize: 13 },
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 16,
    },
    grid: { left: 16, right: 24, top: 8, bottom: 52, containLabel: true },
    xAxis: {
      type: 'value',
      max: 10,
      axisLabel: {
        color: textColor,
        fontSize: 12,
        formatter: (v: number) => `${v}y`,
      },
      splitLine: { lineStyle: { color: lineColor } },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'category',
      data: allItems.map((t) => t.name),
      axisLabel: { color: textColor, fontSize: 13 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: CATEGORY_ORDER.map((cat) => {
      const items = techItems
        .filter((t) => t.category === cat)
        .sort((a, b) => b.years - a.years);

      // For each y-axis position, emit the bar value only for items in this category
      const data = allItems.map((t) => {
        const match = items.find((i) => i.name === t.name);
        return match ? match.years : 0;
      });

      return {
        name: cat,
        type: 'bar',
        barMaxWidth: 18,
        itemStyle: {
          color: CATEGORY_COLORS[cat],
          borderRadius: [0, 4, 4, 0],
        },
        label: { show: false },
        data,
      };
    }),
    tooltip: {
      trigger: 'item',
      backgroundColor: isDark ? 'rgba(15,17,23,0.95)' : 'rgba(255,255,255,0.95)',
      borderColor: isDark ? 'rgba(0,217,255,0.3)' : 'rgba(2,132,199,0.3)',
      textStyle: { color: isDark ? '#fff' : '#111', fontSize: 12 },
      formatter: (params: { seriesName: string; name: string; value: number }) =>
        params.value > 0
          ? `<b>${params.name}</b><br/>${params.seriesName} · ${params.value} yrs`
          : '',
    },
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: allItems.length * 30 + 90, width: '100%' }}
    />
  );
}

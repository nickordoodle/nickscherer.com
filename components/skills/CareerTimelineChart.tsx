'use client';

import ReactECharts from 'echarts-for-react';
import { careerTimelineData } from '@/lib/data';
import { useTheme } from '@/app/providers';

const SECTOR_COLORS: Record<string, string> = {
  military: '#22c55e',
  tech: '#00d9ff',
};

export default function CareerTimelineChart() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const textColor = isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.55)';
  const lineColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)';

  const names = careerTimelineData.map((d) => d.name);
  // Offset series: transparent bar from 0 → start (pushes the visible bar into position)
  const offsets = careerTimelineData.map((d) => d.start - 2013);
  // Duration series: colored bar from start → end
  const durations = careerTimelineData.map((d) => ({
    value: d.end - d.start,
    itemStyle: {
      color: SECTOR_COLORS[d.sector],
      borderRadius: [0, 4, 4, 0],
    },
  }));

  const option = {
    backgroundColor: 'transparent',
    grid: { left: 16, right: 24, top: 8, bottom: 36, containLabel: true },
    xAxis: {
      type: 'value',
      min: 0,
      max: 2027 - 2013,
      interval: 3,
      axisLabel: {
        color: textColor,
        fontSize: 11,
        formatter: (v: number) => String(2013 + v),
      },
      splitLine: { lineStyle: { color: lineColor } },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'category',
      data: names,
      axisLabel: { color: textColor, fontSize: 11 },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        // Invisible offset — pushes bar to the right start position
        type: 'bar',
        stack: 'career',
        itemStyle: { color: 'transparent' },
        data: offsets,
        barMaxWidth: 20,
        silent: true,
        emphasis: { disabled: true },
      },
      {
        // Visible duration bar
        type: 'bar',
        stack: 'career',
        data: durations,
        barMaxWidth: 20,
        label: {
          show: false,
        },
      },
    ],
    tooltip: {
      trigger: 'item',
      backgroundColor: isDark ? 'rgba(15,17,23,0.95)' : 'rgba(255,255,255,0.95)',
      borderColor: isDark ? 'rgba(0,217,255,0.3)' : 'rgba(2,132,199,0.3)',
      textStyle: { color: isDark ? '#fff' : '#111', fontSize: 12 },
      formatter: (params: { seriesIndex: number; dataIndex: number }) => {
        if (params.seriesIndex === 0) return '';
        const d = careerTimelineData[params.dataIndex];
        return `<b>${d.name}</b><br/>${d.start.toFixed(0)} – ${d.end % 1 === 0 ? d.end : 'Present'}`;
      },
    },
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: 320, width: '100%' }}
    />
  );
}

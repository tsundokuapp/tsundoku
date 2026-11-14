'use client';

import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  getSiteViews10MonthsData,
  SiteViewsData,
} from '@/features/admin/utils/devMock';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/shared/components/ui/chart';

const chartConfig = {
  views: {
    label: 'Visualizações',
    color: '#259cc1',
  },
} satisfies ChartConfig;

// TODO(backend-integration): Endpoint de métricas de visualizações mensais do site (ex: GET /api/admin/estatisticas/views-site?meses=10).
// tsundoku-api não possui telemetria de pageviews ou integração com analytics.
export function ViewsSiteChart() {
  const data: SiteViewsData[] = getSiteViews10MonthsData();

  return (
    <div
      data-testid="chart-views-site"
      className="flex h-[300px] w-full max-w-[500px] flex-col justify-between rounded-[8px] border border-white/5 bg-[#202024] p-5"
    >
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-[#e1e1e6]">Views Site</h4>
          <p className="text-xs font-semibold text-appSidebarMuted">
            Últimos 10 meses
          </p>
        </div>
      </div>

      {data.length > 0 ? (
        <ChartContainer config={chartConfig} className="h-[210px] w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.08)" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              stroke="#a1a1aa"
              tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="views" fill="var(--color-views)" radius={4} />
          </BarChart>
        </ChartContainer>
      ) : (
        <div
          data-testid="chart-views-site-empty"
          className="flex h-[210px] w-full flex-col items-center justify-center rounded-[8px] border border-dashed border-white/10 bg-white/[0.02] p-4 text-center"
        >
          <p className="text-xs font-medium text-[#e1e1e6]">
            Estatísticas de visualização do site indisponíveis em produção
          </p>
          <p className="mt-1 text-[11px] text-appSidebarMuted">
            Aguardando integração com telemetria da Tsundoku API.
          </p>
        </div>
      )}
    </div>
  );
}

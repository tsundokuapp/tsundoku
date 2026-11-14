'use client';

import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  ChapterViewsData,
  getTop10ChaptersViewsData,
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
    color: '#22c55e',
  },
} satisfies ChartConfig;

// TODO(backend-integration): Endpoint de agregação dos capítulos mais visualizados (ex: GET /api/admin/estatisticas/top-capitulos?limit=10).
// tsundoku-api não expõe estatísticas agregadas de visualização de capítulos por período.
export function ViewsCapitulosChart() {
  const data: ChapterViewsData[] = getTop10ChaptersViewsData();

  return (
    <div
      data-testid="chart-views-capitulos"
      className="flex h-[200px] w-full max-w-[320px] flex-col justify-between rounded-[8px] border border-white/5 bg-[#202024] p-4"
    >
      <div className="mb-1 flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-[#e1e1e6]">Views Capítulos</h4>
          <p className="text-[11px] font-semibold text-appSidebarMuted">
            10 capítulos mais vistos
          </p>
        </div>
      </div>

      {data.length > 0 ? (
        <ChartContainer config={chartConfig} className="h-[125px] w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.08)" />
            <XAxis
              dataKey="chapter"
              tickLine={false}
              axisLine={false}
              stroke="#a1a1aa"
              tickMargin={6}
              tickFormatter={(val: string) =>
                typeof val === 'string'
                  ? val.replace('Cap. ', 'C.')
                  : String(val ?? '')
              }
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="views" fill="var(--color-views)" radius={3} />
          </BarChart>
        </ChartContainer>
      ) : (
        <div
          data-testid="chart-views-capitulos-empty"
          className="flex h-[125px] w-full flex-col items-center justify-center rounded-[8px] border border-dashed border-white/10 bg-white/[0.02] p-2 text-center"
        >
          <p className="text-[11px] font-medium text-[#e1e1e6]">
            Métricas de capítulos indisponíveis em produção
          </p>
          <p className="mt-1 text-[10px] text-appSidebarMuted">
            Telemetria pendente.
          </p>
        </div>
      )}
    </div>
  );
}

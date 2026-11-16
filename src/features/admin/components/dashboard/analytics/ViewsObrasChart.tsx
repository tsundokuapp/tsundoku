'use client';

import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  getTop10WorksViewsData,
  WorkViewsData,
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
    color: '#38bdf8',
  },
} satisfies ChartConfig;

// TODO(backend-integration): Endpoint de agregação das obras mais visualizadas (ex: GET /api/admin/estatisticas/top-obras?limit=10).
// A entidade Obra no tsundoku-api possui a coluna Visualizacoes, porém não existe endpoint agregador no Capitulo/ObraController.
export function ViewsObrasChart() {
  const data: WorkViewsData[] = getTop10WorksViewsData();

  return (
    <div
      data-testid="chart-views-obras"
      className="flex h-[300px] w-full max-w-[500px] flex-col justify-between rounded-[8px] border border-white/5 bg-[#202024] p-5"
    >
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-[#e1e1e6]">Views Obras</h4>
          <p className="text-xs font-semibold text-appSidebarMuted">
            10 obras mais vistas
          </p>
        </div>
      </div>

      {data.length > 0 ? (
        <ChartContainer config={chartConfig} className="h-[210px] w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.08)" />
            <XAxis
              dataKey="work"
              tickLine={false}
              axisLine={false}
              stroke="#a1a1aa"
              tickMargin={8}
              tickFormatter={(val: string) =>
                typeof val === 'string'
                  ? val.length > 8
                    ? `${val.slice(0, 7)}…`
                    : val
                  : String(val ?? '')
              }
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="views" fill="var(--color-views)" radius={4} />
          </BarChart>
        </ChartContainer>
      ) : (
        <div
          data-testid="chart-views-obras-empty"
          className="flex h-[210px] w-full flex-col items-center justify-center rounded-[8px] border border-dashed border-white/10 bg-white/[0.02] p-4 text-center"
        >
          <p className="text-xs font-medium text-[#e1e1e6]">
            Métricas de obras indisponíveis em produção
          </p>
          <p className="mt-1 text-[11px] text-appSidebarMuted">
            Aguardando integração com telemetria da Tsundoku API.
          </p>
        </div>
      )}
    </div>
  );
}

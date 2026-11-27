'use client';

import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  getStaffTrackerMonthlyData,
  getStaffTrackerWeeklyData,
  TrackerDeliveryMonthItem,
  TrackerDeliveryWeekItem,
} from '@/features/admin/utils/devMock';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/shared/components/ui/chart';

interface ChartTypeRegistry {
  ByMonth: boolean;
}

const chartConfig = {
  novel: {
    label: 'Novel',
    color: '#259cc1',
  },
  comic: {
    label: 'Comic',
    color: '#60a5fa',
  },
} satisfies ChartConfig;

// TODO(backend-integration): Endpoint de agregação de capítulos entregues por período (ex: GET /api/admin/estatisticas/capitulos-entregues?periodo=semana|mes).
// O backend tsundoku-api não possui serviço de telemetria ou consolidação temporal de entregas por staff.
export const TrackerProjectsStaff = ({ ByMonth = true }: ChartTypeRegistry) => {
  const monthData: TrackerDeliveryMonthItem[] = getStaffTrackerMonthlyData();
  const weekData: TrackerDeliveryWeekItem[] = getStaffTrackerWeeklyData();
  const data = ByMonth ? monthData : weekData;

  if (data.length === 0) {
    return (
      <div
        data-testid="tracker-staff-empty"
        className="flex min-h-[200px] w-full flex-col items-center justify-center rounded-[8px] border border-dashed border-white/10 bg-white/[0.02] p-6 text-center"
      >
        <p className="text-sm font-medium text-[#e1e1e6]">
          Dados estatísticos indisponíveis em produção
        </p>
        <p className="mt-1 text-xs text-appSidebarMuted">
          Aguardando integração com o serviço de telemetria da Tsundoku API.
        </p>
      </div>
    );
  }

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.08)" />
        <XAxis
          dataKey={ByMonth ? 'month' : 'week'}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          stroke="#a1a1aa"
          tickFormatter={(value: string) =>
            typeof value === 'string' ? value.slice(0, 3) : String(value ?? '')
          }
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="novel" fill="var(--color-novel)" radius={4} />
        <Bar dataKey="comic" fill="var(--color-comic)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
};

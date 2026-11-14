'use client';

import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  getHourlyAccess14DaysData,
  HourlyAccessData,
} from '@/features/admin/utils/devMock';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/shared/components/ui/chart';

const chartConfig = {
  accesses: {
    label: 'Acessos por Horário',
    color: '#eab308',
  },
} satisfies ChartConfig;

// TODO(backend-integration): Endpoint de distribuição de tráfego por faixa horária nos últimos 14 dias (ex: GET /api/admin/estatisticas/horarios-acessados?dias=14).
// Atualmente não há tracking de logs de requisição ou hits por hora no backend.
export function HorariosAcessadosChart() {
  const data: HourlyAccessData[] = getHourlyAccess14DaysData();

  return (
    <div
      data-testid="chart-horarios-acessados"
      className="flex h-[200px] w-full max-w-[320px] flex-col justify-between rounded-[8px] border border-white/5 bg-[#202024] p-4"
    >
      <div className="mb-1 flex items-center justify-between">
        <div>
          <h4 className="text-xs font-bold text-[#e1e1e6]">
            Horários mais acessados
          </h4>
          <p className="text-[11px] font-semibold text-appSidebarMuted">
            Últimos 14 dias
          </p>
        </div>
      </div>

      {data.length > 0 ? (
        <ChartContainer config={chartConfig} className="h-[125px] w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.08)" />
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              stroke="#a1a1aa"
              tickMargin={6}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="accesses" fill="var(--color-accesses)" radius={3} />
          </BarChart>
        </ChartContainer>
      ) : (
        <div
          data-testid="chart-horarios-acessados-empty"
          className="flex h-[125px] w-full flex-col items-center justify-center rounded-[8px] border border-dashed border-white/10 bg-white/[0.02] p-2 text-center"
        >
          <p className="text-[11px] font-medium text-[#e1e1e6]">
            Distribuição por horário indisponível em produção
          </p>
          <p className="mt-1 text-[10px] text-appSidebarMuted">
            Telemetria pendente.
          </p>
        </div>
      )}
    </div>
  );
}

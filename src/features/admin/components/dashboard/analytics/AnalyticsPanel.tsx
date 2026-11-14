'use client';

import { BarChart3, Info } from 'lucide-react';
import React from 'react';

import { isDevEnvironment } from '@/features/admin/utils/devMock';

import { AcessosSiteChart } from './AcessosSiteChart';
import { HorariosAcessadosChart } from './HorariosAcessadosChart';
import { ViewsCapitulosChart } from './ViewsCapitulosChart';
import { ViewsObrasChart } from './ViewsObrasChart';
import { ViewsSiteChart } from './ViewsSiteChart';

export function AnalyticsPanel() {
  const isDev = isDevEnvironment();

  return (
    <div
      data-testid="analytics-panel"
      className="mx-auto w-full max-w-[1058px] space-y-6"
    >
      {/* Banner Informativo em Produção */}
      {!isDev && (
        <div
          data-testid="analytics-prod-notice"
          className="flex items-center gap-2 rounded-[8px] border border-cyan-500/30 bg-cyan-950/20 px-4 py-3 text-xs text-[#259cc1]"
        >
          <Info size={16} className="shrink-0" />
          <span>
            Telemetria em integração: os dados analíticos dependem da conclusão
            dos endpoints de métricas na Tsundoku API.
          </span>
        </div>
      )}

      {/* Header do Painel */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="size-5 text-[#259cc1]" aria-hidden="true" />
          <h3 className="text-base font-bold text-[#e1e1e6]">
            Métricas de Audiência e Acesso
          </h3>
        </div>
        <span className="text-xs text-appSidebarMuted">
          {isDev ? 'Modo de Desenvolvimento' : 'Ambiente de Produção'}
        </span>
      </div>

      {/* Linha Superior: 2 Cards Grandes (500x300px) */}
      <div className="grid grid-cols-1 justify-items-center gap-6 lg:grid-cols-2 lg:gap-8">
        <ViewsSiteChart />
        <ViewsObrasChart />
      </div>

      {/* Linha Inferior: 3 Cards Médios (300x180px - 320x200px) */}
      <div className="grid grid-cols-1 justify-items-center gap-6 md:grid-cols-3">
        <ViewsCapitulosChart />
        <AcessosSiteChart />
        <HorariosAcessadosChart />
      </div>
    </div>
  );
}

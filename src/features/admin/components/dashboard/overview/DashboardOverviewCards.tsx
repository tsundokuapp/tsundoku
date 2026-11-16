'use client';

import { Coins, FileCheck, Hourglass, Info } from 'lucide-react';
import React from 'react';

import {
  getDashboardOverviewMetrics,
  isDevEnvironment,
} from '@/features/admin/utils/devMock';

export function DashboardOverviewCards() {
  const isDev = isDevEnvironment();
  const metrics = getDashboardOverviewMetrics();

  return (
    <div
      data-testid="dashboard-overview-cards"
      className="grid w-full grid-cols-1 justify-items-center gap-4 md:grid-cols-3 md:gap-6 lg:gap-8"
    >
      {/* Card 1: Saldo Tsundoku */}
      {/* TODO(backend-integration): Conectar ao endpoint de carteira/saldo de pontos do usuário (GET /api/admin/pontos/saldo). */}
      <div
        data-testid="overview-card-saldo"
        className="flex h-[200px] w-full max-w-[350px] flex-col justify-between rounded-[8px] border border-white/5 bg-[#202024] p-5 md:h-[150px] md:max-w-[300px]"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-[#e1e1e6]">
            Saldo Tsundoku
          </span>
          <Coins className="size-5 text-[#259cc1]" aria-hidden="true" />
        </div>

        <div className="my-auto flex flex-col gap-1">
          <span
            data-testid="overview-balance-value"
            className="text-2xl font-bold tracking-tight text-[#259cc1] lg:text-3xl"
          >
            {isDev && metrics.balance ? metrics.balance : 'T$ --'}
          </span>
          <span className="text-xs text-appSidebarMuted">
            {isDev ? (
              'Disponível para resgate / recompensas'
            ) : (
              <span className="inline-flex items-center gap-1 text-[#a1a1aa]">
                <Info size={12} />
                Saldo indisponível em produção
              </span>
            )}
          </span>
        </div>

        {!isDev && (
          <div className="flex justify-end">
            <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-medium text-appSidebarMuted">
              Integração pendente
            </span>
          </div>
        )}
      </div>

      {/* Card 2: Minhas Pendências */}
      {/* TODO(backend-integration): Conectar ao endpoint de tarefas editoriais pendentes (GET /api/admin/tarefas/pendentes). */}
      <div
        data-testid="overview-card-pendencias"
        className="flex h-[200px] w-full max-w-[350px] flex-col justify-between rounded-[8px] border border-white/5 bg-[#202024] p-5 md:h-[150px] md:max-w-[300px]"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-[#e1e1e6]">
            Minhas Pendências
          </span>
          <Hourglass className="size-5 text-[#eab308]" aria-hidden="true" />
        </div>

        <div className="my-auto flex flex-col gap-1">
          <span
            data-testid="overview-pendencias-value"
            className="text-2xl font-bold tracking-tight text-[#e1e1e6] lg:text-3xl"
          >
            {isDev && typeof metrics.pendingCount === 'number'
              ? `${metrics.pendingCount} Capítulos`
              : '0 Capítulos'}
          </span>
          <span className="text-xs text-appSidebarMuted">
            {isDev
              ? 'Aguardando revisão ou aprovação'
              : 'Nenhuma pendência registrada'}
          </span>
        </div>

        {!isDev && (
          <div className="flex justify-end">
            <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-medium text-appSidebarMuted">
              Sem pendências ativas
            </span>
          </div>
        )}
      </div>

      {/* Card 3: Capítulos Entregues no Mês */}
      {/* TODO(backend-integration): Conectar ao endpoint de métricas de entrega mensal consolidada (GET /api/admin/dashboard/metricas). */}
      <div
        data-testid="overview-card-entregas"
        className="flex h-[200px] w-full max-w-[350px] flex-col justify-between rounded-[8px] border border-white/5 bg-[#202024] p-5 md:h-[150px] md:max-w-[300px]"
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-[#e1e1e6]">
            Capítulos Entregues no Mês
          </span>
          <FileCheck className="size-5 text-[#22c55e]" aria-hidden="true" />
        </div>

        <div className="my-auto flex flex-col gap-1">
          <span
            data-testid="overview-entregas-value"
            className="text-2xl font-bold tracking-tight text-[#e1e1e6] lg:text-3xl"
          >
            {isDev && typeof metrics.deliveredMonthCount === 'number'
              ? `${metrics.deliveredMonthCount} Capítulos`
              : '0 Capítulos'}
          </span>
          <span className="text-xs text-appSidebarMuted">
            {isDev
              ? 'Métrica mensal consolidada'
              : 'Sem entregas registradas no mês'}
          </span>
        </div>

        {!isDev && (
          <div className="flex justify-end">
            <span className="rounded bg-white/5 px-2 py-0.5 text-[10px] font-medium text-appSidebarMuted">
              Telemetria pendente
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

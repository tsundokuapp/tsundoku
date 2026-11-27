'use client';

import { BarChart2, LayoutDashboard } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react';

import { useAuthStore } from '@/core/auth/stores/useAuthStore';
import { AnalyticsPanel } from '@/features/admin/components/dashboard/analytics/AnalyticsPanel';
import { DashboardMainContent } from '@/features/admin/components/dashboard/overview/DashboardMainContent';
import { DashboardOverviewCards } from '@/features/admin/components/dashboard/overview/DashboardOverviewCards';
import { formatDate } from '@/shared/utils/date';

type DashboardTab = 'visao-geral' | 'estatisticas';

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { username } = useAuthStore();
  const dateFormatted = formatDate(new Date(), true, true);

  const queryTab = searchParams.get('tab');
  const initialTab: DashboardTab =
    queryTab === 'estatisticas' || queryTab === 'analytics'
      ? 'estatisticas'
      : 'visao-geral';

  const [activeTab, setActiveTab] = useState<DashboardTab>(initialTab);

  useEffect(() => {
    if (queryTab === 'estatisticas' || queryTab === 'analytics') {
      setActiveTab('estatisticas');
    } else {
      setActiveTab('visao-geral');
    }
  }, [queryTab]);

  const handleTabChange = (tab: DashboardTab) => {
    setActiveTab(tab);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('tab', tab);
    router.replace(`/dashboard?${newParams.toString()}`);
  };

  return (
    <div className="mx-auto w-full max-w-[1058px] px-4 py-6 md:px-6">
      {/* Header do Dashboard */}
      <header className="mb-6 flex flex-col gap-4">
        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
          <div>
            <h1
              data-testid="dashboard-title"
              className="text-base font-bold text-[#e1e1e6]"
            >
              Dashboard
            </h1>
            <h2 className="text-xl font-bold capitalize text-[#e1e1e6] sm:text-2xl md:text-3xl">
              Bem-vindo, {username || 'Administrador'}!
            </h2>
          </div>
          <span
            suppressHydrationWarning
            className="text-xs text-appSidebarMuted sm:text-sm"
          >
            {dateFormatted}
          </span>
        </div>

        {/* Seletor de Abas: Visão Geral vs Estatísticas */}
        <div
          role="tablist"
          aria-label="Seções do Dashboard"
          className="flex w-fit items-center gap-1 rounded-[8px] border border-white/10 bg-[#202024] p-1"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'visao-geral'}
            data-testid="tab-visao-geral"
            onClick={() => handleTabChange('visao-geral')}
            className={`flex items-center gap-2 rounded-[6px] px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === 'visao-geral'
                ? 'bg-[#259cc1] font-semibold text-[#121214]'
                : 'text-[#e1e1e6] hover:bg-white/5 hover:text-[#259cc1]'
            }`}
          >
            <LayoutDashboard size={14} />
            <span>Visão Geral</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'estatisticas'}
            data-testid="tab-estatisticas"
            onClick={() => handleTabChange('estatisticas')}
            className={`flex items-center gap-2 rounded-[6px] px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === 'estatisticas'
                ? 'bg-[#259cc1] font-semibold text-[#121214]'
                : 'text-[#e1e1e6] hover:bg-white/5 hover:text-[#259cc1]'
            }`}
          >
            <BarChart2 size={14} />
            <span>Estatísticas</span>
          </button>
        </div>
      </header>

      {/* Conteúdo da Aba Ativa */}
      {activeTab === 'visao-geral' ? (
        <main className="space-y-6">
          {/* Top 3 Summary Overview Cards */}
          <section aria-label="Resumo Geral">
            <DashboardOverviewCards />
          </section>

          {/* Container Principal de Conteúdo Operacional */}
          <section aria-label="Conteúdo Principal Operacional">
            <DashboardMainContent />
          </section>
        </main>
      ) : (
        <main aria-label="Painel de Estatísticas">
          <AnalyticsPanel />
        </main>
      )}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[400px] w-full items-center justify-center">
          <div className="size-8 animate-spin rounded-full border-2 border-[#259cc1] border-t-transparent" />
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}

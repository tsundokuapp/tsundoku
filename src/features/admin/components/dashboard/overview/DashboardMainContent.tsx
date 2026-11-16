'use client';

import { Activity, Clock, ListTodo } from 'lucide-react';
import React, { useState } from 'react';

import { TrackerProjectsStaff } from '@/features/admin/components/dashboard/chart/TrackerProjectsStaff';
import TablePendingProjects from '@/features/admin/components/dashboard/table/TablePendingProjects';
import TableRecentProjects from '@/features/admin/components/dashboard/table/TableRecentProjects';
import { Button } from '@/shared/components/ui/button/Button';

export function DashboardMainContent() {
  const [byMonth, setByMonth] = useState(true);

  return (
    <div
      data-testid="dashboard-main-content"
      className="mx-auto w-full max-w-[1050px] space-y-6 rounded-[8px] border border-white/5 bg-[#202024] p-4 md:p-6"
    >
      {/* Seção 1: Minhas Pendências */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ListTodo className="size-5 text-[#259cc1]" aria-hidden="true" />
            <h3 className="text-sm font-bold text-[#e1e1e6]">
              Minhas Pendências
            </h3>
          </div>
          <span className="text-xs text-appSidebarMuted">
            Capítulos aguardando revisão ou notas
          </span>
        </div>
        <TablePendingProjects />
      </section>

      {/* Seção 2: Grid com Tracker de Entregas e Projetos Recentes */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Tracker de Capítulos Entregues */}
        <section className="flex flex-col justify-between space-y-3 rounded-[8px] border border-white/5 bg-black/20 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="size-4 text-[#259cc1]" aria-hidden="true" />
              <h4 className="text-sm font-bold text-[#e1e1e6]">
                Capítulos Entregues
              </h4>
            </div>
            <Button
              onClick={() => setByMonth(!byMonth)}
              size="sm"
              className="h-7 border-white/10 bg-white/5 px-3 text-xs text-[#e1e1e6] hover:bg-white/10"
            >
              {byMonth ? 'Por Semana' : 'Por Mês'}
            </Button>
          </div>
          <div className="min-h-[200px] w-full">
            <TrackerProjectsStaff ByMonth={byMonth} />
          </div>
        </section>

        {/* Projetos Recentes */}
        <section className="flex flex-col justify-between space-y-3 rounded-[8px] border border-white/5 bg-black/20 p-4">
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-[#259cc1]" aria-hidden="true" />
            <h4 className="text-sm font-bold text-[#e1e1e6]">
              Projetos Recentes
            </h4>
          </div>
          <TableRecentProjects />
        </section>
      </div>
    </div>
  );
}

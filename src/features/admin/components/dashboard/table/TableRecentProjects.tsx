'use client';

import React from 'react';

import {
  getRecentProjectsData,
  RecentProjectItem,
} from '@/features/admin/utils/devMock';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';

// TODO(backend-integration): Endpoint de auditoria ou histórico de projetos modificados recentemente (ex: GET /api/admin/projetos/recentes).
// Necessita de rota agregadora no backend tsundoku-api unificando atualizações de Novel e Comic.
export default function TableRecentProjects() {
  const data: RecentProjectItem[] = getRecentProjectsData();

  return (
    <div className="w-full overflow-x-auto rounded-[8px] border border-white/10 bg-[#202024]">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-white/10 hover:bg-transparent">
            <TableHead className="w-48 font-medium text-[#e1e1e6]">
              Nome
            </TableHead>
            <TableHead className="font-medium text-[#e1e1e6]">Tipo</TableHead>
            <TableHead className="font-medium text-[#e1e1e6]">
              Capítulo
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((item) => (
              <TableRow
                key={item.id}
                className="border-b border-white/5 transition-colors hover:bg-white/5"
              >
                <TableCell className="font-medium text-[#e1e1e6]">
                  {item.titleProject}
                </TableCell>
                <TableCell className="text-appSidebarMuted">
                  <span className="rounded bg-white/5 px-2 py-0.5 text-xs">
                    {item.typeProject}
                  </span>
                </TableCell>
                <TableCell className="text-[#e1e1e6]">{item.name}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={3}
                className="py-8 text-center text-sm text-appSidebarMuted"
              >
                Nenhum projeto recente registrado.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

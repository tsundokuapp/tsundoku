'use client';

import React from 'react';

import {
  getPendingProjectsData,
  PendingProjectItem,
} from '@/features/admin/utils/devMock';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';

// TODO(backend-integration): Endpoint de pendências e tarefas editoriais atribuídas ao membro do staff (ex: GET /api/admin/tarefas/pendentes).
// O backend tsundoku-api não possui entidade de tarefas, notas ou fluxo de aprovação de capítulos no banco de dados.
export default function TablePendingProjects() {
  const data: PendingProjectItem[] = getPendingProjectsData();

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
            <TableHead className="font-medium text-[#e1e1e6]">Notas</TableHead>
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
                <TableCell className="text-xs text-appSidebarMuted">
                  {item.notes}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="py-8 text-center text-sm text-appSidebarMuted"
              >
                Nenhuma pendência encontrada. Módulo de tarefas em integração.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

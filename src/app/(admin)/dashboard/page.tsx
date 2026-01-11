'use client';

import { ReactNode, useState } from 'react';

import { Button } from '@/components/common/button/Button';
import { TrackerProjectsStaff } from '@/components/dashboard/chart/TrackerProjectsStaff';
import { FileUpload } from '@/components/dashboard/fileDropzone';
import TablePendingProjects from '@/components/dashboard/table/TablePendingProjects';
import TableRecentProjects from '@/components/dashboard/table/TableRecentProjects';
import { formatDate } from '@/helpers/Util';
import { useAuthStore } from '@/store/useAuthStore';

export default function Dashboard() {
  const [registryProjectByMonth, setRegistryProjectByMonth] = useState(true);
  const dateFormatted = formatDate(new Date(), true, true);
  const { username } = useAuthStore();

  const Card = ({ children }: { children: ReactNode }) => {
    return (
      <div className="col-span-2 flex h-full flex-1 flex-col items-center justify-between rounded-md bg-appMenuBackground p-4">
        {children}
      </div>
    );
  };

  const HeaderDashboard = () => {
    return (
      <div className="rounded-b-2x flex w-full max-w-full flex-col justify-between gap-6 p-4 transition-all">
        <div className="flex flex-col justify-between">
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-3xl font-bold capitalize text-appText lg:text-4xl">
              Bem-vindo, {username}!
            </h3>
            <h3 className="hidden text-appText lg:flex">{dateFormatted}</h3>
          </div>
          <p className="text-xl font-bold text-appSubtitle lg:text-3xl">
            T$ 34,00
          </p>
        </div>

        <div className="flex flex-col items-start justify-between gap-2 rounded-md md:flex-row">
          <FileUpload />
          <FileUpload />
        </div>
      </div>
    );
  };

  return (
    <div className="grid min-h-screen w-full grid-cols-1 gap-4 p-4 md:grid-cols-6">
      {/* LADO ESQUERDO */}
      <div className="col-span-4 flex flex-col gap-4">
        <div className="flex-1">
          <HeaderDashboard />
        </div>

        {/* Tabela de Pendências */}
        <div className="h-min-fit">
          <Card>
            <div className="flex min-h-[200px] w-full flex-col items-center justify-center gap-2">
              <p className="text-nowrap text-sm text-appText">
                Minhas Pendências
              </p>
              <TablePendingProjects />
            </div>
          </Card>
        </div>
      </div>

      {/* LADO DIREITO */}
      <div className="col-span-2 flex flex-col gap-4">
        {/* Projetos feitos semana/mês */}
        <Card>
          <div className="mb-2 flex w-full flex-row items-center justify-between gap-4">
            <Button
              onClick={() => setRegistryProjectByMonth(!registryProjectByMonth)}
              size="sm"
            >
              {registryProjectByMonth ? 'Por Semana' : 'Por Mês'}
            </Button>
            <p className="hidden text-nowrap text-center text-sm text-appText lg:block">
              Capítulos Entregues
            </p>
          </div>
          <TrackerProjectsStaff ByMonth={registryProjectByMonth} />
        </Card>

        {/* Projetos recentes */}
        <Card>
          <div className="flex min-h-[200px] w-full flex-col items-center justify-center gap-2">
            <p className="text-nowrap text-sm text-appText">
              Projetos Recentes
            </p>
            <TableRecentProjects />
          </div>
        </Card>
      </div>
    </div>
  );
}

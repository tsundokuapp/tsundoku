'use client';

import { ReactNode, useState } from 'react';

import { Button } from '@/components/common/button/Button';


import TableRecentProjects from '@/components/dashboard/table/TableRecentProjects';
import TablePendingProjects from '@/components/dashboard/table/TablePendingProjects';
import { TrackerProjectsStaff } from '@/components/dashboard/chart/TrackerProjectsStaff';
import { useAuthStore } from '@/store/useAuthStore';
import { formatDate } from '@/helpers/Util';
import FileUpload from '@/components/dashboard/fileDropzone';


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
      <div className="rounded-b-2x flex gap-6 w-full max-w-full flex-col justify-between p-4 transition-all">
        <div className="flex flex-col justify-between">
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-3xl font-bold capitalize text-appText lg:text-4xl">
              Bem-vindo, {username}!
            </h3>
            <h3 className="hidden text-appText lg:flex">{dateFormatted}</h3>
          </div>
          <p className="text-xl font-bold text-appText lg:text-3xl">T$ 34,00</p>
        </div>

        <div className="justify-between items-start flex flex-col gap-2 md:flex-row rounded-md">
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
        <div className='flex-1'>
          <HeaderDashboard />
        </div>

        {/* Tabela de Pendências */}
        <div className="h-min-fit">
          <Card>
            <div className='min-h-[200px] w-full flex flex-col items-center justify-center gap-2'>
              <p className='text-appText text-sm text-nowrap'>Minhas Pendências</p>
              <TablePendingProjects />
            </div>
          </Card>
        </div>
      </div>

      {/* LADO DIREITO */}
      <div className="col-span-2 flex flex-col gap-4">
        {/* Projetos feitos semana/mês */}
        <Card>
          <div className='flex flex-row items-center w-full justify-between mb-2 gap-4'>
            <Button
              onClick={() => setRegistryProjectByMonth(!registryProjectByMonth)}
              size='sm'
            >
              {registryProjectByMonth ? 'Por Semana' : 'Por Mês'}
            </Button>
            <p className='text-appText text-center text-sm text-nowrap lg:block hidden'>Capítulos Entregues</p>
          </div>
          <TrackerProjectsStaff ByMonth={registryProjectByMonth} />
        </Card>

        {/* Projetos recentes */}
        <Card>
          <div className='min-h-[200px] w-full flex flex-col items-center justify-center gap-2'>
            <p className='text-appText text-sm text-nowrap'>Projetos Recentes</p>
            <TableRecentProjects />
          </div>
        </Card>
      </div>
    </div>
  );
}

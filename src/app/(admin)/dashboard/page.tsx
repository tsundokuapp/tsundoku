'use client';

import { FrameCorners } from '@phosphor-icons/react';
import {
  AddressBookTabs,
  Checkerboard,
  IdentificationBadge,
  UsersFour,
  BookOpenText,
  Users,
} from '@phosphor-icons/react/dist/ssr';
import { ChartTypeRegistry } from 'chart.js';
import { CSSProperties, ReactNode, useState } from 'react';

import { TsunButton } from '@/components/common/button/TsunButton';
import { CardInfo } from '@/components/dashboard/cardInfo/CardInfo';
import { DataCharts } from '@/components/dashboard/chart/DataChart';
import {
  lineDataChart,
  lineDataChartYear,
} from '@/components/dashboard/chart/mockData';
import { HeaderDashboard } from '@/components/dashboard/header/HeaderDashboard';
import { CardTransactions } from '@/components/padrim/CardTransaction/CardTransactions';
import { Sidebar, SidebarItem } from '@/components/sidebar/Sidebar';
import { cn } from '@/helpers/twUtils';
import { TableActivityStaff } from '@/components/dashboard/table/TableActivity';

interface ChartProps {
  type: keyof ChartTypeRegistry;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

interface CardDashboardProps {
  children: ReactNode;
  className?: CSSProperties | string;
}

export default function Dashboard() {
  const [currentChart, setCurrentChart] = useState<ChartProps>({
    type: 'line',
    data: lineDataChart,
  });

  const toogleChart = () => {
    if (currentChart.type === 'line') {
      setCurrentChart({ type: 'bar', data: lineDataChartYear });
    } else {
      setCurrentChart({ type: 'line', data: lineDataChart });
    }
  };

  const CardDashboard = ({ children, className }: CardDashboardProps) => {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-between rounded-md bg-[#F8FAFC] p-4',
          className,
        )}
      >
        {children}
      </div>
    );
  };

  return (
    <main className="flex flex-row">
      <Sidebar>
        <hr className="my-3 border-t border-gray-400" />
        <SidebarItem
          icon={<Checkerboard size={24} />}
          text="Dashboard"
          action="/dashboard"
          alert
        />
        <SidebarItem
          icon={<UsersFour size={24} />}
          text="Staff"
          action="/staff"
        />
        <hr className="my-3 border-t border-gray-400" />
        <SidebarItem
          icon={<BookOpenText size={24} />}
          text="Novel"
          action="/noveladmin"
        />
        <SidebarItem
          icon={<AddressBookTabs size={24} />}
          text="Mangá"
          action="/mangaadmin"
        />
        <SidebarItem
          icon={<IdentificationBadge size={24} />}
          text="Permissões"
          action="/staffmanagement"
        />
        <hr className="my-3 border-t border-gray-400" />
        <SidebarItem
          icon={<Users size={24} />}
          text="Usuário"
          action="/usermanagement"
        />
      </Sidebar>
      <div className="flex flex-1 flex-col">
        <HeaderDashboard />
        <CardDashboard className="flex-row gap-x-2 bg-transparent">
          <CardTransactions />
          <div className="flex flex-col rounded-md bg-[#F8FAFC] p-4">
            <div className="flex flex-row items-center justify-between">
              <TsunButton onClick={() => toogleChart()}>
                Trocar Gráfico
              </TsunButton>
              <TsunButton
                onClick={() => toogleChart()}
                icon={<FrameCorners size={24} />}
                sideIcon="right"
              >
                Fullscreen
              </TsunButton>
            </div>
            <DataCharts type={currentChart.type} data={currentChart.data} />
          </div>
          <CardDashboard className="gap-2">
            <CardInfo
              icon={<UsersFour size={24} />}
              title="Total Visitas do Mês"
              data={{ value: '540' }}
              textTooltip="Staffs com mais de 1 mês sem atividade, porcentagem quanto maior, pior."
            />
            <CardInfo
              icon={<UsersFour size={24} />}
              title="Total Visitas do Mês Anterior"
              data={{ value: '371' }}
              textTooltip="Staffs com mais de 1 mês sem atividade, porcentagem quanto maior, pior."
            />
            <CardInfo
              icon={<UsersFour size={24} />}
              title="Total Visitas do Ano"
              data={{ value: '9341' }}
              textTooltip="Staffs com mais de 1 mês sem atividade, porcentagem quanto maior, pior."
            />
          </CardDashboard>
        </CardDashboard>
        <TableActivityStaff />
      </div>
    </main>
  );
}

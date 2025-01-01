'use client';

import { UsersFour, FrameCorners } from '@phosphor-icons/react/dist/ssr';
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
import { TableActivityStaff } from '@/components/dashboard/table/TableActivityStaff';
import { CardTransactions } from '@/components/padrim/CardTransaction/CardTransactions';
import { useModal } from '@/contexts/ModalContext';
import { cn } from '@/helpers/twUtils';

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

  const { Modal, openModal } = useModal();

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
          'flex flex-col items-center justify-between rounded-md bg-gray-50 p-4 dark:bg-gray-800',
          className,
        )}
      >
        {children}
      </div>
    );
  };

  return (
    <div className="flex flex-1 flex-col">
      <HeaderDashboard />

      <CardDashboard className="dark:bg-tranparent w-full flex-row gap-x-2 bg-transparent">
        <CardTransactions />
        <div className="flex-1 flex-col rounded-md bg-gray-50 p-4 dark:bg-gray-800">
          <div className="flex flex-row items-center justify-between">
            <TsunButton onClick={() => toogleChart()}>
              Trocar Gráfico
            </TsunButton>
            <TsunButton
              onClick={openModal}
              icon={<FrameCorners size={24} />}
              sideIcon="right"
            >
              Fullscreen
            </TsunButton>
          </div>
          <DataCharts type={currentChart.type} data={currentChart.data} />
        </div>

        <CardDashboard className="hidden gap-2 lg:flex">
          <CardInfo
            icon={<UsersFour size={24} />}
            title="Total Visitas do Mês"
            data={{ value: '540' }}
          />
          <CardInfo
            icon={<UsersFour size={24} />}
            title="Total Visitas do Mês Anterior"
            data={{ value: '371' }}
          />
          <CardInfo
            icon={<UsersFour size={24} />}
            title="Total Visitas do Ano"
            data={{ value: '9341' }}
          />
        </CardDashboard>
      </CardDashboard>

      <TableActivityStaff />

      <div>
        <Modal title="Gráficos Comparativos">
          <div className="w-screen max-w-[1200px] rounded-lg bg-white p-8 dark:bg-gray-800">
            <DataCharts type={currentChart.type} data={currentChart.data} />
          </div>
        </Modal>
      </div>
    </div>
  );
}

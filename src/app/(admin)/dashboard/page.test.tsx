import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import DashboardPage from '@/app/(admin)/dashboard/page';
import { useAuthStore } from '@/core/auth/stores/useAuthStore';
import * as devMock from '@/features/admin/utils/devMock';

const replaceMock = jest.fn();
let currentSearchParams = new URLSearchParams();

const actualDevMock = jest.requireActual('@/features/admin/utils/devMock');

jest.mock('@/features/admin/utils/devMock', () => {
  const actual = jest.requireActual('@/features/admin/utils/devMock');
  return {
    ...actual,
    isDevEnvironment: jest.fn(),
    getDashboardOverviewMetrics: jest.fn(),
    getPendingProjectsData: jest.fn(),
    getRecentProjectsData: jest.fn(),
    getStaffTrackerMonthlyData: jest.fn(),
    getStaffTrackerWeeklyData: jest.fn(),
  };
});

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: replaceMock,
  }),
  usePathname: () => '/dashboard',
  useSearchParams: () => currentSearchParams,
}));

jest.mock('recharts', () => {
  const original = jest.requireActual('recharts');
  return {
    ...original,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div
        data-testid="responsive-container"
        style={{ width: 500, height: 300 }}
      >
        {children}
      </div>
    ),
  };
});

describe('DashboardPage (/dashboard)', () => {
  const mockedIsDev = devMock.isDevEnvironment as jest.Mock;
  const mockedGetDashboardOverviewMetrics =
    devMock.getDashboardOverviewMetrics as jest.Mock;
  const mockedGetPendingProjectsData =
    devMock.getPendingProjectsData as jest.Mock;
  const mockedGetRecentProjectsData =
    devMock.getRecentProjectsData as jest.Mock;
  const mockedGetStaffTrackerMonthlyData =
    devMock.getStaffTrackerMonthlyData as jest.Mock;
  const mockedGetStaffTrackerWeeklyData =
    devMock.getStaffTrackerWeeklyData as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockedIsDev.mockReturnValue(true);
    mockedGetDashboardOverviewMetrics.mockReturnValue({
      balance: 'T$ 34,00',
      pendingCount: 5,
      deliveredMonthCount: 12,
    });
    mockedGetPendingProjectsData.mockReturnValue([
      {
        id: '1',
        titleProject: 'Bruxa Errante',
        typeProject: 'Novel',
        name: 'C.15 - V.01',
        notes: '3 comentários pendentes',
      },
    ]);
    mockedGetRecentProjectsData.mockReturnValue([
      {
        id: '1',
        titleProject: 'Bruxa Errante',
        typeProject: 'Novel',
        name: 'C.15 - V.01',
      },
    ]);
    mockedGetStaffTrackerMonthlyData.mockReturnValue(
      actualDevMock.getStaffTrackerMonthlyData(),
    );
    mockedGetStaffTrackerWeeklyData.mockReturnValue(
      actualDevMock.getStaffTrackerWeeklyData(),
    );

    currentSearchParams = new URLSearchParams();
    useAuthStore.setState({
      username: 'DevStaff',
      position: 'Staff',
      accessToken: 'valid-token',
      hasHydrated: true,
      isPending: false,
    });
  });

  describe('Estrutura e Layout Geral (Frames 1208:966 e 1321:35679)', () => {
    it('renderiza o título "Dashboard" em destaque conforme Figma', () => {
      render(<DashboardPage />);

      const title = screen.getByTestId('dashboard-title');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('Dashboard');
    });

    it('renderiza a saudação personalizada com o nome do usuário logado', () => {
      render(<DashboardPage />);

      expect(screen.getByText(/Bem-vindo, DevStaff!/i)).toBeInTheDocument();
    });

    it('não renderiza widgets obsoletos de FileUpload no dashboard', () => {
      render(<DashboardPage />);

      expect(
        screen.queryByText(/Envio rápido de arquivos/i),
      ).not.toBeInTheDocument();
      expect(screen.queryByTestId('file-dropzone')).not.toBeInTheDocument();
    });

    it('renderiza a aba "Visão Geral" por padrão com os cards de resumo e o container principal', () => {
      render(<DashboardPage />);

      expect(screen.getByTestId('tab-visao-geral')).toHaveAttribute(
        'aria-selected',
        'true',
      );
      expect(
        screen.getByTestId('dashboard-overview-cards'),
      ).toBeInTheDocument();
      expect(screen.getByTestId('dashboard-main-content')).toBeInTheDocument();
      expect(screen.queryByTestId('analytics-panel')).not.toBeInTheDocument();
    });
  });

  describe('Navegação e Alternador de Abas (Visão Geral vs Estatísticas)', () => {
    it('permite alternar para a aba Estatísticas via clique', () => {
      render(<DashboardPage />);

      const estatisticasTab = screen.getByTestId('tab-estatisticas');
      fireEvent.click(estatisticasTab);

      expect(estatisticasTab).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByTestId('analytics-panel')).toBeInTheDocument();
      expect(
        screen.queryByTestId('dashboard-overview-cards'),
      ).not.toBeInTheDocument();
      expect(replaceMock).toHaveBeenCalledWith('/dashboard?tab=estatisticas');
    });

    it('permite retornar para a aba Visão Geral a partir de Estatísticas', () => {
      render(<DashboardPage />);

      fireEvent.click(screen.getByTestId('tab-estatisticas'));
      expect(screen.getByTestId('analytics-panel')).toBeInTheDocument();

      fireEvent.click(screen.getByTestId('tab-visao-geral'));
      expect(
        screen.getByTestId('dashboard-overview-cards'),
      ).toBeInTheDocument();
      expect(screen.getByTestId('dashboard-main-content')).toBeInTheDocument();
      expect(screen.queryByTestId('analytics-panel')).not.toBeInTheDocument();
      expect(replaceMock).toHaveBeenCalledWith('/dashboard?tab=visao-geral');
    });

    it('inicia diretamente na aba Estatísticas quando a URL contiver ?tab=estatisticas', () => {
      currentSearchParams = new URLSearchParams('tab=estatisticas');
      render(<DashboardPage />);

      expect(screen.getByTestId('tab-estatisticas')).toHaveAttribute(
        'aria-selected',
        'true',
      );
      expect(screen.getByTestId('analytics-panel')).toBeInTheDocument();
      expect(
        screen.queryByTestId('dashboard-overview-cards'),
      ).not.toBeInTheDocument();
    });

    it('sincroniza para a aba Visão Geral quando o parâmetro tab é removido da URL', () => {
      currentSearchParams = new URLSearchParams('tab=estatisticas');
      const { rerender } = render(<DashboardPage />);

      expect(screen.getByTestId('tab-estatisticas')).toHaveAttribute(
        'aria-selected',
        'true',
      );
      expect(screen.getByTestId('analytics-panel')).toBeInTheDocument();

      // Simula navegação de retorno (back) / remoção do parâmetro tab
      currentSearchParams = new URLSearchParams();
      rerender(<DashboardPage />);

      expect(screen.getByTestId('tab-visao-geral')).toHaveAttribute(
        'aria-selected',
        'true',
      );
      expect(
        screen.getByTestId('dashboard-overview-cards'),
      ).toBeInTheDocument();
      expect(screen.getByTestId('dashboard-main-content')).toBeInTheDocument();
      expect(screen.queryByTestId('analytics-panel')).not.toBeInTheDocument();
    });
  });

  describe('Comportamento em Produção vs Desenvolvimento (Requisito R3)', () => {
    it('em produção não vaza saldos fictícios e exibe avisos informativos', () => {
      mockedIsDev.mockReturnValue(false);
      mockedGetDashboardOverviewMetrics.mockReturnValue({
        balance: null,
        pendingCount: null,
        deliveredMonthCount: null,
      });
      mockedGetPendingProjectsData.mockReturnValue([]);
      mockedGetRecentProjectsData.mockReturnValue([]);
      mockedGetStaffTrackerMonthlyData.mockReturnValue([]);
      mockedGetStaffTrackerWeeklyData.mockReturnValue([]);

      render(<DashboardPage />);

      expect(screen.queryByText('T$ 34,00')).not.toBeInTheDocument();
      expect(screen.getByTestId('overview-balance-value')).toHaveTextContent(
        'T$ --',
      );
      expect(
        screen.getByText(
          /Nenhuma pendência encontrada. Módulo de tarefas em integração./i,
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/Nenhum projeto recente registrado./i),
      ).toBeInTheDocument();
    });
  });
});

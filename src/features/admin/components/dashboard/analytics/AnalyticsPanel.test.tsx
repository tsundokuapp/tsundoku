import { render, screen } from '@testing-library/react';
import React from 'react';

import * as devMock from '@/features/admin/utils/devMock';

import { AnalyticsPanel } from './AnalyticsPanel';

jest.mock('@/features/admin/utils/devMock', () => {
  const actual = jest.requireActual('@/features/admin/utils/devMock');
  return {
    ...actual,
    isDevEnvironment: jest.fn(),
    getSiteViews10MonthsData: jest.fn(),
    getTop10WorksViewsData: jest.fn(),
    getTop10ChaptersViewsData: jest.fn(),
    getSiteAccess10MonthsData: jest.fn(),
    getHourlyAccess14DaysData: jest.fn(),
  };
});

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

describe('AnalyticsPanel (Frame 1166:435)', () => {
  const mockedIsDev = devMock.isDevEnvironment as jest.Mock;
  const mockedSiteViews = devMock.getSiteViews10MonthsData as jest.Mock;
  const mockedWorkViews = devMock.getTop10WorksViewsData as jest.Mock;
  const mockedChapterViews = devMock.getTop10ChaptersViewsData as jest.Mock;
  const mockedSiteAccess = devMock.getSiteAccess10MonthsData as jest.Mock;
  const mockedHourlyAccess = devMock.getHourlyAccess14DaysData as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Ambiente de Desenvolvimento (isDevEnvironment = true)', () => {
    beforeEach(() => {
      mockedIsDev.mockReturnValue(true);
      mockedSiteViews.mockReturnValue([
        { month: 'Jan', views: 650 },
        { month: 'Fev', views: 420 },
      ]);
      mockedWorkViews.mockReturnValue([
        { work: 'Bruxa Errante', views: 940 },
        { work: 'Eminence in Shadow', views: 880 },
      ]);
      mockedChapterViews.mockReturnValue([
        { chapter: 'Cap. 15', views: 350 },
        { chapter: 'Cap. 20', views: 320 },
      ]);
      mockedSiteAccess.mockReturnValue([
        { month: 'Jan', accesses: 310 },
        { month: 'Fev', accesses: 280 },
      ]);
      mockedHourlyAccess.mockReturnValue([
        { hour: '00h', accesses: 70 },
        { hour: '02h', accesses: 40 },
      ]);
    });

    it('renderiza os títulos dos 5 gráficos especificados no Figma', () => {
      render(<AnalyticsPanel />);

      expect(screen.getByText('Views Site')).toBeInTheDocument();
      expect(screen.getByText('Views Obras')).toBeInTheDocument();
      expect(screen.getByText('Views Capítulos')).toBeInTheDocument();
      expect(screen.getByText('Acessos ao site')).toBeInTheDocument();
      expect(screen.getByText('Horários mais acessados')).toBeInTheDocument();
    });

    it('renderiza os subtítulos de período correspondentes a cada gráfico', () => {
      render(<AnalyticsPanel />);

      expect(screen.getAllByText('Últimos 10 meses').length).toBe(2);
      expect(screen.getByText('10 obras mais vistas')).toBeInTheDocument();
      expect(screen.getByText('10 capítulos mais vistos')).toBeInTheDocument();
      expect(screen.getByText('Últimos 14 dias')).toBeInTheDocument();
    });

    it('não exibe o aviso de telemetria pendente de produção quando em dev', () => {
      render(<AnalyticsPanel />);

      expect(
        screen.queryByTestId('analytics-prod-notice'),
      ).not.toBeInTheDocument();
    });
  });

  describe('Ambiente de Produção (isDevEnvironment = false — Requisito R3)', () => {
    beforeEach(() => {
      mockedIsDev.mockReturnValue(false);
      mockedSiteViews.mockReturnValue([]);
      mockedWorkViews.mockReturnValue([]);
      mockedChapterViews.mockReturnValue([]);
      mockedSiteAccess.mockReturnValue([]);
      mockedHourlyAccess.mockReturnValue([]);
    });

    it('exibe o banner de telemetria pendente em produção', () => {
      render(<AnalyticsPanel />);

      expect(screen.getByTestId('analytics-prod-notice')).toBeInTheDocument();
      expect(screen.getByText(/Telemetria em integração/i)).toBeInTheDocument();
    });

    it('renderiza estados vazios amigáveis para todos os 5 gráficos sem quebrar o layout', () => {
      render(<AnalyticsPanel />);

      expect(screen.getByTestId('chart-views-site-empty')).toHaveTextContent(
        /Estatísticas de visualização do site indisponíveis em produção/i,
      );
      expect(screen.getByTestId('chart-views-obras-empty')).toHaveTextContent(
        /Métricas de obras indisponíveis em produção/i,
      );
      expect(
        screen.getByTestId('chart-views-capitulos-empty'),
      ).toHaveTextContent(/Métricas de capítulos indisponíveis em produção/i);
      expect(screen.getByTestId('chart-acessos-site-empty')).toHaveTextContent(
        /Estatísticas de acessos indisponíveis em produção/i,
      );
      expect(
        screen.getByTestId('chart-horarios-acessados-empty'),
      ).toHaveTextContent(/Distribuição por horário indisponível em produção/i);
    });
  });
});

import { render, screen } from '@testing-library/react';
import React from 'react';

import * as devMock from '@/features/admin/utils/devMock';

import { DashboardOverviewCards } from './DashboardOverviewCards';

jest.mock('@/features/admin/utils/devMock', () => {
  const actual = jest.requireActual('@/features/admin/utils/devMock');
  return {
    ...actual,
    isDevEnvironment: jest.fn(),
    getDashboardOverviewMetrics: jest.fn(),
  };
});

describe('DashboardOverviewCards', () => {
  const mockedIsDevEnvironment = devMock.isDevEnvironment as jest.Mock;
  const mockedGetDashboardOverviewMetrics =
    devMock.getDashboardOverviewMetrics as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Ambiente de Desenvolvimento (isDevEnvironment = true)', () => {
    beforeEach(() => {
      mockedIsDevEnvironment.mockReturnValue(true);
      mockedGetDashboardOverviewMetrics.mockReturnValue({
        balance: 'T$ 34,00',
        pendingCount: 5,
        deliveredMonthCount: 12,
      });
    });

    it('renderiza os 3 cards com seus respectivos títulos do design Figma', () => {
      render(<DashboardOverviewCards />);

      expect(screen.getByText('Saldo Tsundoku')).toBeInTheDocument();
      expect(screen.getByText('Minhas Pendências')).toBeInTheDocument();
      expect(
        screen.getByText('Capítulos Entregues no Mês'),
      ).toBeInTheDocument();
    });

    it('exibe os valores de mock corretos em desenvolvimento', () => {
      render(<DashboardOverviewCards />);

      expect(screen.getByTestId('overview-balance-value')).toHaveTextContent(
        'T$ 34,00',
      );
      expect(screen.getByTestId('overview-pendencias-value')).toHaveTextContent(
        '5 Capítulos',
      );
      expect(screen.getByTestId('overview-entregas-value')).toHaveTextContent(
        '12 Capítulos',
      );
    });

    it('aplica classes responsivas conforme especificações desktop (300x150) e mobile (350x200)', () => {
      render(<DashboardOverviewCards />);

      const saldoCard = screen.getByTestId('overview-card-saldo');
      expect(saldoCard).toHaveClass('h-[200px]');
      expect(saldoCard).toHaveClass('md:h-[150px]');
      expect(saldoCard).toHaveClass('max-w-[350px]');
      expect(saldoCard).toHaveClass('md:max-w-[300px]');
      expect(saldoCard).toHaveClass('bg-[#202024]');
    });

    it('trata valores undefined de contadores com segurança exibindo "0 Capítulos"', () => {
      mockedGetDashboardOverviewMetrics.mockReturnValue({
        balance: 'T$ 34,00',
        pendingCount: undefined,
        deliveredMonthCount: undefined,
      });

      render(<DashboardOverviewCards />);

      expect(screen.getByTestId('overview-pendencias-value')).toHaveTextContent(
        '0 Capítulos',
      );
      expect(screen.getByTestId('overview-entregas-value')).toHaveTextContent(
        '0 Capítulos',
      );
      expect(
        screen.queryByText(/undefined Capítulos/i),
      ).not.toBeInTheDocument();
    });
  });

  describe('Ambiente de Produção (isDevEnvironment = false — Requisito R3)', () => {
    beforeEach(() => {
      mockedIsDevEnvironment.mockReturnValue(false);
      mockedGetDashboardOverviewMetrics.mockReturnValue({
        balance: null,
        pendingCount: null,
        deliveredMonthCount: null,
      });
    });

    it('não vaza dados fictícios em produção e exibe aviso de indisponibilidade', () => {
      render(<DashboardOverviewCards />);

      expect(screen.queryByText('T$ 34,00')).not.toBeInTheDocument();
      expect(screen.getByTestId('overview-balance-value')).toHaveTextContent(
        'T$ --',
      );
      expect(
        screen.getByText(/Saldo indisponível em produção/i),
      ).toBeInTheDocument();
    });

    it('exibe contadores zerados com avisos informativos para pendências e entregas', () => {
      render(<DashboardOverviewCards />);

      expect(screen.getByTestId('overview-pendencias-value')).toHaveTextContent(
        '0 Capítulos',
      );
      expect(
        screen.getByText(/Nenhuma pendência registrada/i),
      ).toBeInTheDocument();

      expect(screen.getByTestId('overview-entregas-value')).toHaveTextContent(
        '0 Capítulos',
      );
      expect(
        screen.getByText(/Sem entregas registradas no mês/i),
      ).toBeInTheDocument();
    });
  });
});

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import * as devMock from '@/features/admin/utils/devMock';

import { TrackerProjectsStaff } from './TrackerProjectsStaff';

jest.mock('@/features/admin/utils/devMock', () => ({
  getStaffTrackerMonthlyData: jest.fn(),
  getStaffTrackerWeeklyData: jest.fn(),
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

describe('TrackerProjectsStaff', () => {
  const mockedGetMonthlyData = devMock.getStaffTrackerMonthlyData as jest.Mock;
  const mockedGetWeeklyData = devMock.getStaffTrackerWeeklyData as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza o gráfico mensal com dados de entrega e tolera valores indefinidos e não-string sem lançar exceção', () => {
    mockedGetMonthlyData.mockReturnValue([
      { month: 'Janeiro', novel: 4, comic: 8 },
      { month: undefined as unknown as string, novel: 2, comic: 5 },
      { month: null as unknown as string, novel: 1, comic: 3 },
      { month: 123 as unknown as string, novel: 0, comic: 2 },
    ]);
    mockedGetWeeklyData.mockReturnValue([]);

    expect(() => {
      render(<TrackerProjectsStaff ByMonth={true} />);
    }).not.toThrow();

    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
  });

  it('renderiza o gráfico semanal quando ByMonth = false sem falhas', () => {
    mockedGetMonthlyData.mockReturnValue([]);
    mockedGetWeeklyData.mockReturnValue([
      { week: 'Semana 1', novel: 2, comic: 3 },
      { week: undefined as unknown as string, novel: 1, comic: 4 },
    ]);

    expect(() => {
      render(<TrackerProjectsStaff ByMonth={false} />);
    }).not.toThrow();

    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
  });

  it('renderiza estado vazio quando dados estiverem vazios (produção)', () => {
    mockedGetMonthlyData.mockReturnValue([]);
    mockedGetWeeklyData.mockReturnValue([]);

    render(<TrackerProjectsStaff ByMonth={true} />);

    expect(screen.getByTestId('tracker-staff-empty')).toBeInTheDocument();
    expect(
      screen.getByText(/Dados estatísticos indisponíveis em produção/i),
    ).toBeInTheDocument();
  });
});

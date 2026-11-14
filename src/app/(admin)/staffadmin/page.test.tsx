import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import React from 'react';

import StaffAdminPage from './page';

jest.mock('next/navigation', () => ({
  usePathname: () => '/staffadmin',
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
}));

jest.mock('@/core/api', () => ({
  authPrivate: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('StaffAdminPage (/staffadmin)', () => {
  it('renders permissions admin page with header and matrix table', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <StaffAdminPage />
      </QueryClientProvider>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: 'Permissões' }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /matriz de permissões e governança de acessos por cargo/i,
      ),
    ).toBeInTheDocument();
  });
});

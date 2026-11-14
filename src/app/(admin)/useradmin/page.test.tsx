import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import React from 'react';

import UserAdminPage from './page';

jest.mock('next/navigation', () => ({
  usePathname: () => '/useradmin',
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

describe('UserAdminPage (/useradmin)', () => {
  it('renders genuine users page without any novel creation leakage', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <UserAdminPage />
      </QueryClientProvider>,
    );

    expect(
      screen.getByRole('heading', { level: 1, name: 'Usuários' }),
    ).toBeInTheDocument();
    expect(screen.queryByText('Criação de Novels')).not.toBeInTheDocument();
    expect(screen.queryByText('Sinopse')).not.toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Pesquisar Usuários'),
    ).toBeInTheDocument();
  });
});

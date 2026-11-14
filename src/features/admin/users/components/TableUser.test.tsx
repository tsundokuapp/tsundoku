import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { useAuthStore } from '@/core/auth/stores/useAuthStore';
import * as devMock from '@/features/admin/utils/devMock';
import { ToasterProvider } from '@/shared/contexts/ToasterContext';

import { TableUser } from './TableUser';
import * as userAdminApi from '../api/userAdminApi';

jest.mock('@/features/admin/utils/devMock', () => {
  const actual = jest.requireActual('@/features/admin/utils/devMock');
  return {
    ...actual,
    isDevEnvironment: jest.fn(() => true),
  };
});

jest.mock('@/core/api', () => ({
  authPrivate: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
  },
}));

function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ToasterProvider>{ui}</ToasterProvider>
    </QueryClientProvider>,
  );
}

describe('TableUser Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    userAdminApi.resetDevUsersState();
    (devMock.isDevEnvironment as jest.Mock).mockReturnValue(true);
    useAuthStore.setState({ username: 'NERO_SL' });
  });

  it('renders user table with columns and mock users from dev fallback', async () => {
    renderWithProviders(<TableUser />);

    expect(await screen.findByText('Matface')).toBeInTheDocument();
    expect(screen.getByText('deciotartuci')).toBeInTheDocument();
    expect(screen.getByText('Cargo')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('filters users by search input', async () => {
    renderWithProviders(<TableUser />);

    await screen.findByText('Matface');

    const searchInput = screen.getByPlaceholderText('Pesquisar Usuários');
    fireEvent.change(searchInput, { target: { value: 'Bravo' } });

    await waitFor(() => {
      expect(screen.getByText('Bravo')).toBeInTheDocument();
      expect(screen.queryByText('Matface')).not.toBeInTheDocument();
    });
  });

  it('filters users by cargo dropdown', async () => {
    renderWithProviders(<TableUser />);

    await screen.findByText('Matface');

    const roleSelect = screen.getByRole('combobox');
    fireEvent.change(roleSelect, { target: { value: 'Staff' } });

    await waitFor(() => {
      expect(screen.getByText('Matface')).toBeInTheDocument();
      expect(screen.getByText('Plon')).toBeInTheDocument();
      expect(screen.queryByText('deciotartuci')).not.toBeInTheDocument();
    });
  });

  it('opens ModalAddUser when clicking Adicionar button', async () => {
    renderWithProviders(<TableUser />);

    await screen.findByText('Matface');

    const addBtn = screen.getByRole('button', { name: /adicionar/i });
    fireEvent.click(addBtn);

    expect(await screen.findByText('Adicionar Usuário')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nome de usuário')).toBeInTheDocument();
  });

  it('opens ModalEditUser when clicking pencil icon on a user row', async () => {
    renderWithProviders(<TableUser />);

    await screen.findByText('Matface');

    const editBtns = screen.getAllByTitle('Editar Usuário');
    fireEvent.click(editBtns[0]);

    expect(await screen.findByText('Editar Usuário')).toBeInTheDocument();
    expect(
      screen.getByDisplayValue('matface@tsundoku.com.br'),
    ).toBeInTheDocument();
  });

  it('guards against self-deletion when clicking delete on current admin user', async () => {
    renderWithProviders(<TableUser />);

    await screen.findByText('NERO_SL');

    // NERO_SL is user 5
    const searchInput = screen.getByPlaceholderText('Pesquisar Usuários');
    fireEvent.change(searchInput, { target: { value: 'NERO_SL' } });

    await waitFor(() => {
      expect(screen.getByText('NERO_SL')).toBeInTheDocument();
    });

    const singleDeleteBtn = screen.getByTitle('Excluir Usuário');
    fireEvent.click(singleDeleteBtn);

    expect(
      await screen.findByTestId('self-delete-warning'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/você não pode remover sua própria conta/i),
    ).toBeInTheDocument();
  });
});

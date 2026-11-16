import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import * as devMock from '@/features/admin/utils/devMock';
import { ToasterProvider } from '@/shared/contexts/ToasterContext';

import {
  executeRoleDelete,
  PROTECTED_ROLES,
  RoleMatrixTable,
} from './RoleMatrixTable';
import * as permissionsApi from '../api/permissionsApi';

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

describe('RoleMatrixTable Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    permissionsApi.resetDevPermissionsState();
    (devMock.isDevEnvironment as jest.Mock).mockReturnValue(true);
  });

  it('renders matrix table with permission descriptions and role badges', async () => {
    renderWithProviders(<RoleMatrixTable />);

    expect(
      await screen.findByText('Visualizar qualquer obra'),
    ).toBeInTheDocument();
    expect(screen.getByText('Criar capítulos')).toBeInTheDocument();
    expect(screen.getByText('Gerenciar usuários')).toBeInTheDocument();
    expect(
      screen.getByText('Acesso total a todos os recursos'),
    ).toBeInTheDocument();
  });

  it('groups permissions into resources (Obras, Capítulos, Usuários, Global / Sistema)', async () => {
    renderWithProviders(<RoleMatrixTable />);

    expect(await screen.findByText('Obras')).toBeInTheDocument();
    expect(screen.getByText('Capítulos')).toBeInTheDocument();
    expect(screen.getByText('Usuários')).toBeInTheDocument();
    expect(screen.getByText('Global / Sistema')).toBeInTheDocument();
  });

  it('filters permissions via search input', async () => {
    renderWithProviders(<RoleMatrixTable />);

    await screen.findByText('Visualizar qualquer obra');

    const searchInput = screen.getByPlaceholderText(
      /pesquisar permissões por recurso/i,
    );
    fireEvent.change(searchInput, { target: { value: 'capitulo' } });

    await waitFor(() => {
      expect(screen.getByText('Criar capítulos')).toBeInTheDocument();
      expect(
        screen.queryByText('Visualizar qualquer obra'),
      ).not.toBeInTheDocument();
    });
  });

  it('opens ModalAddRole when clicking Novo Cargo', async () => {
    renderWithProviders(<RoleMatrixTable />);

    await screen.findByText('Visualizar qualquer obra');

    const addRoleBtn = screen.getByRole('button', { name: /novo cargo/i });
    fireEvent.click(addRoleBtn);

    expect(await screen.findByText('Adicionar Novo Cargo')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/ex: revisor, editor/i),
    ).toBeInTheDocument();
  });

  it('opens ModalAddPermission when clicking Nova Permissão', async () => {
    renderWithProviders(<RoleMatrixTable />);

    await screen.findByText('Visualizar qualquer obra');

    const addPermBtn = screen.getByRole('button', { name: /nova permissão/i });
    fireEvent.click(addPermBtn);

    expect(await screen.findByText('Nova Permissão Base')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/ex: obra\.aprovar/i),
    ).toBeInTheDocument();
  });

  describe('System Role Protection and Role Deletion Invariants', () => {
    it('defines PROTECTED_ROLES containing admin, staff, tradutor, and leitor', () => {
      expect(PROTECTED_ROLES).toEqual(['admin', 'staff', 'tradutor', 'leitor']);
    });

    it('does NOT render a delete button for any protected system role', async () => {
      renderWithProviders(<RoleMatrixTable />);

      await screen.findByText('Visualizar qualquer obra');

      expect(
        screen.queryByTitle('Excluir cargo admin'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTitle('Excluir cargo staff'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTitle('Excluir cargo tradutor'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByTitle('Excluir cargo leitor'),
      ).not.toBeInTheDocument();
    });

    it('renders a delete button for custom roles (moderador, revisor) and allows deletion', async () => {
      await permissionsApi.createRole('moderador');
      await permissionsApi.createRole('revisor');

      renderWithProviders(<RoleMatrixTable />);

      await screen.findByText('Visualizar qualquer obra');

      const moderadorDeleteBtn = screen.getByTitle('Excluir cargo moderador');
      const revisorDeleteBtn = screen.getByTitle('Excluir cargo revisor');

      expect(moderadorDeleteBtn).toBeInTheDocument();
      expect(revisorDeleteBtn).toBeInTheDocument();

      fireEvent.click(moderadorDeleteBtn);

      await waitFor(async () => {
        const roles = await permissionsApi.getRoles();
        expect(roles.some((r) => r.name === 'moderador')).toBe(false);
        expect(roles.some((r) => r.name === 'revisor')).toBe(true);
      });
    });

    it('triggers a warning and does NOT call mutation when attempting to delete a protected role', async () => {
      const mockToaster = jest.fn();
      const mockMutation = {
        mutateAsync: jest.fn().mockResolvedValue({ success: true }),
      };

      for (const role of [
        'admin',
        'staff',
        'tradutor',
        'leitor',
        'Staff',
        ' ADMIN ',
      ]) {
        const result = await executeRoleDelete(role, mockToaster, mockMutation);
        expect(result.success).toBe(false);
        expect(result.message).toContain('não pode ser excluído');
        expect(mockToaster).toHaveBeenCalledWith({
          type: 'warning',
          msg: expect.stringContaining('não pode ser excluído'),
        });
      }

      expect(mockMutation.mutateAsync).not.toHaveBeenCalled();
    });

    it('defensively rejects deletion of default system roles at the API layer', async () => {
      for (const role of [
        'admin',
        'staff',
        'tradutor',
        'leitor',
        'Staff',
        'ADMIN',
      ]) {
        const result = await permissionsApi.deleteRole(role);
        expect(result.success).toBe(false);
        expect(result.message).toContain('não pode ser excluído');
      }

      // Custom roles can still be deleted
      await permissionsApi.createRole('temporario');
      const customResult = await permissionsApi.deleteRole('temporario');
      expect(customResult.success).toBe(true);
    });
  });
});

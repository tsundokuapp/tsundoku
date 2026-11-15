import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { authPrivate } from '@/core/api';
import * as devMock from '@/features/admin/utils/devMock';

import { ModalAddUser } from './ModalAddUser';

jest.mock('@/features/admin/utils/devMock', () => {
  const actual = jest.requireActual('@/features/admin/utils/devMock');
  return {
    ...actual,
    isDevEnvironment: jest.fn(() => false),
  };
});

const toasterMock = jest.fn();
jest.mock('@/shared/contexts/ToasterContext', () => ({
  useToaster: () => ({ toaster: toasterMock }),
}));

jest.mock('@/core/api', () => ({
  authPrivate: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
  },
}));

const VALID_PASSWORD = 'Senha@123';

const toriiCadastroBody = (idUsuario: number) => ({
  isSuccess: true,
  isFailed: false,
  value: { idUsuario, codigoConfirmacao: 'codigo' },
});

function renderModal(onClose = jest.fn()) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <ModalAddUser isOpen onClose={onClose} />
    </QueryClientProvider>,
  );

  return { onClose };
}

function fillForm({
  senha = VALID_PASSWORD,
  confirmaSenha = VALID_PASSWORD,
  cargo = 'Staff',
} = {}) {
  fireEvent.change(screen.getByLabelText('Email'), {
    target: { value: 'novo@tsundoku.com.br' },
  });
  fireEvent.change(screen.getByLabelText('Login / Usuário'), {
    target: { value: 'novo' },
  });
  fireEvent.change(screen.getByLabelText('Senha'), {
    target: { value: senha },
  });
  fireEvent.change(screen.getByLabelText('Confirmar senha'), {
    target: { value: confirmaSenha },
  });
  fireEvent.change(screen.getByLabelText('Cargo'), {
    target: { value: cargo },
  });
}

describe('ModalAddUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (devMock.isDevEnvironment as jest.Mock).mockReturnValue(false);
  });

  it('exige senha e não envia o cadastro sem ela', async () => {
    renderModal();
    fillForm({ senha: '', confirmaSenha: '' });

    fireEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    expect(
      await screen.findByText('Informe a senha de acesso.', {
        selector: '[role="alert"]',
      }),
    ).toBeInTheDocument();
    expect(authPrivate.post).not.toHaveBeenCalled();
  });

  it('bloqueia confirmação de senha divergente', async () => {
    renderModal();
    fillForm({ confirmaSenha: 'Senha@999' });

    fireEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    expect(
      await screen.findByText('A confirmação de senha não confere.', {
        selector: '[role="alert"]',
      }),
    ).toBeInTheDocument();
    expect(authPrivate.post).not.toHaveBeenCalled();
  });

  it('só exibe sucesso depois de o Torii confirmar o cargo', async () => {
    (authPrivate.post as jest.Mock)
      .mockResolvedValueOnce({ data: toriiCadastroBody(31) })
      .mockResolvedValueOnce({ data: {} });
    (authPrivate.get as jest.Mock).mockResolvedValueOnce({
      data: ['leitor', 'staff'],
    });

    const { onClose } = renderModal();
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    await waitFor(() => expect(onClose).toHaveBeenCalled());
    expect(authPrivate.get).toHaveBeenCalledWith('admin/usuarios/31/roles');
    expect(toasterMock).toHaveBeenCalledWith({
      type: 'success',
      msg: 'Usuário adicionado com sucesso!',
    });
  });

  it('mostra o resultado parcial e retoma a atribuição sem recadastrar', async () => {
    (authPrivate.post as jest.Mock)
      .mockResolvedValueOnce({ data: toriiCadastroBody(31) })
      .mockRejectedValueOnce(
        Object.assign(new Error('500'), {
          response: { status: 500, data: 'Role STAFF does not exist.' },
        }),
      );

    const { onClose } = renderModal();
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    const partial = await screen.findByTestId('add-user-partial');
    expect(partial).toHaveTextContent(
      'Conta novo criada, mas o cargo Staff não foi atribuído.',
    );
    expect(partial).toHaveTextContent('Role STAFF does not exist.');
    expect(onClose).not.toHaveBeenCalled();
    expect(toasterMock).not.toHaveBeenCalledWith(
      expect.objectContaining({ type: 'success' }),
    );
    expect(
      screen.queryByRole('button', { name: 'Adicionar' }),
    ).not.toBeInTheDocument();

    // Retomada: apenas POST de cargo + GET de confirmação.
    (authPrivate.post as jest.Mock).mockResolvedValueOnce({ data: {} });
    (authPrivate.get as jest.Mock).mockResolvedValueOnce({
      data: ['leitor', 'staff'],
    });

    fireEvent.click(
      screen.getByRole('button', { name: 'Tentar atribuir cargo novamente' }),
    );

    await waitFor(() => expect(onClose).toHaveBeenCalled());
    const postCalls = (authPrivate.post as jest.Mock).mock.calls.map(
      (c) => c[0],
    );
    expect(postCalls).toEqual([
      'auth/cadastro',
      'admin/usuarios/31/roles',
      'admin/usuarios/31/roles',
    ]);
    expect(toasterMock).toHaveBeenCalledWith({
      type: 'success',
      msg: 'Cargo Staff atribuído a novo.',
    });
  });

  it('mantém o resultado parcial se a retomada falhar de novo', async () => {
    (authPrivate.post as jest.Mock)
      .mockResolvedValueOnce({ data: toriiCadastroBody(31) })
      .mockRejectedValueOnce(
        Object.assign(new Error('500'), {
          response: { status: 500, data: 'Falha 1' },
        }),
      )
      .mockRejectedValueOnce(
        Object.assign(new Error('500'), {
          response: { status: 500, data: 'Falha 2' },
        }),
      );

    const { onClose } = renderModal();
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    await screen.findByTestId('add-user-partial');
    fireEvent.click(
      screen.getByRole('button', { name: 'Tentar atribuir cargo novamente' }),
    );

    await waitFor(() =>
      expect(screen.getByTestId('add-user-partial')).toHaveTextContent(
        'Falha 2',
      ),
    );
    expect(onClose).not.toHaveBeenCalled();
  });

  it('mostra o erro real do Torii quando o cadastro é recusado', async () => {
    (authPrivate.post as jest.Mock).mockRejectedValueOnce(
      Object.assign(new Error('400'), {
        response: { status: 400, data: 'E-mail já cadastrado' },
      }),
    );

    const { onClose } = renderModal();
    fillForm();
    fireEvent.click(screen.getByRole('button', { name: 'Adicionar' }));

    expect(
      await screen.findByText('E-mail já cadastrado', {
        selector: '[role="alert"]',
      }),
    ).toBeInTheDocument();
    expect(onClose).not.toHaveBeenCalled();
  });
});

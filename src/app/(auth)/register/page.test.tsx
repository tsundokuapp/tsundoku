import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { createUserService } from '@/features/auth/api/authApi';

import RegisterPage from './page';

const pushMock = jest.fn();

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}));

jest.mock('@tanstack/react-query', () => ({
  useMutation: ({
    mutationFn,
  }: {
    mutationFn: (...args: unknown[]) => Promise<unknown>;
  }) => ({
    mutateAsync: jest.fn((variables) => mutationFn(variables)),
  }),
}));

jest.mock('@/features/auth/api/authApi', () => ({
  createUserService: jest.fn(),
}));

describe('RegisterPage', () => {
  const createUserServiceMock = createUserService as jest.MockedFunction<
    typeof createUserService
  >;

  beforeEach(() => {
    pushMock.mockReset();
    createUserServiceMock.mockReset();
  });

  it('cadastra o usuário e volta para login', async () => {
    createUserServiceMock.mockResolvedValue({
      ok: true,
      data: {
        UserName: 'usuario-teste',
        token: 'token-recebido',
      },
    });

    render(<RegisterPage />);

    fireEvent.change(screen.getByLabelText('Usuário'), {
      target: { value: 'usuario-teste' },
    });
    fireEvent.change(screen.getByLabelText('E-mail'), {
      target: { value: 'usuario@teste.com' },
    });
    fireEvent.change(screen.getByLabelText('Senha'), {
      target: { value: 'Senha@123' },
    });
    fireEvent.change(screen.getByLabelText('Confirmar senha'), {
      target: { value: 'Senha@123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Cadastrar' }));

    await waitFor(() => {
      expect(createUserServiceMock).toHaveBeenCalledWith({
        usuario: 'usuario-teste',
        email: 'usuario@teste.com',
        senha: 'Senha@123',
        confirmaSenha: 'Senha@123',
      });
    });

    expect(pushMock).toHaveBeenCalledWith('/login');
  });
});

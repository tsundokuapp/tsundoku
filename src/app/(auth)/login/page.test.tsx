import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { useAuthStore } from '@/core/auth/stores/useAuthStore';
import { loginUserService } from '@/features/auth/api/authApi';

import LoginPage from './page';

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
  loginUserService: jest.fn(),
}));

jest.mock('@/shared/components/ui/form', () => {
  const actual = jest.requireActual('@/shared/components/ui/form');
  return {
    ...actual,
    FormInput: actual.FormInput,
  };
});

jest.mock('@/shared/components/ui/form/FormInput', () => ({
  __esModule: true,
  FormInput: jest.requireActual('@/shared/components/ui/form/FormInput')
    .FormInput,
}));

describe('LoginPage', () => {
  const loginUserServiceMock = loginUserService as jest.MockedFunction<
    typeof loginUserService
  >;

  beforeEach(() => {
    pushMock.mockReset();
    loginUserServiceMock.mockReset();
    useAuthStore.setState({
      username: null,
      accessToken: null,
      tsunId: null,
      position: 'Leitor',
      roles: null,
      isAdmin: false,
      isPending: false,
    });
  });

  it('autentica o usuário e redireciona para a home', async () => {
    const validToken = [
      'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0',
      'eyJleHAiOjQwOTI0NDQ4MDAsInJvbGVzIjpbIkFkbWluIl19',
      '',
    ].join('.');

    loginUserServiceMock.mockResolvedValue({
      ok: true,
      data: {
        usuario: 'usuario-teste',
        accessToken: validToken,
        tsunId: 'tsun-123',
      },
    });

    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText('Usuário'), {
      target: { value: 'usuario-teste' },
    });
    fireEvent.change(screen.getByLabelText('Senha'), {
      target: { value: 'Senha@123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }));

    await waitFor(() => {
      expect(loginUserServiceMock).toHaveBeenCalledWith({
        Usuario: 'usuario-teste',
        Senha: 'Senha@123',
      });
    });

    expect(pushMock).toHaveBeenCalledWith('/');
    expect(useAuthStore.getState()).toMatchObject({
      username: 'usuario-teste',
      tsunId: 'tsun-123',
      accessToken: validToken,
      isAdmin: true,
      position: 'Admin',
    });
  });
});

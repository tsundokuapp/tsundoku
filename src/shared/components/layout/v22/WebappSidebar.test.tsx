import '@testing-library/jest-dom';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import React from 'react';

import { useAuthStore } from '@/core/auth/stores/useAuthStore';
import { LINK_DISCORD } from '@/shared/utils/systemValues';

import { WebappSidebar } from './WebappSidebar';

const pushMock = jest.fn();
const replaceMock = jest.fn();

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

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt }: { alt: string }) => <span role="img" aria-label={alt} />,
}));

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
    replace: replaceMock,
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

describe('<WebappSidebar />', () => {
  const initialState = useAuthStore.getState();

  beforeEach(() => {
    pushMock.mockReset();
    replaceMock.mockReset();
    useAuthStore.setState({
      ...initialState,
      username: null,
      position: null,
      roles: null,
      isAdmin: false,
      isPending: false,
      hasHydrated: false,
    });
  });

  afterEach(() => {
    cleanup();
    act(() => {
      useAuthStore.setState(initialState);
    });
  });

  it('oculta o grupo Admin enquanto a sessão está hidratando ou pendente', () => {
    useAuthStore.setState({
      username: 'admin',
      position: 'Admin',
      hasHydrated: false,
      isPending: true,
    });

    render(<WebappSidebar mobileOpen={false} onCloseMobile={jest.fn()} />);

    expect(
      screen.queryByTestId('v22-sidebar-admin-group'),
    ).not.toBeInTheDocument();
  });

  it('oculta o grupo Admin para visitante e usuários comuns após hidratação', () => {
    const cases: {
      username: string | null;
      position: 'Admin' | 'Staff' | 'Apoiador' | 'Leitor' | null;
    }[] = [
      { username: null, position: 'Leitor' },
      { username: null, position: null },
      { username: 'usuario_leitor', position: 'Leitor' },
      { username: 'usuario_apoiador', position: 'Apoiador' },
    ];

    for (const authCase of cases) {
      useAuthStore.setState({
        username: authCase.username,
        position: authCase.position,
        hasHydrated: true,
        isPending: false,
      });

      const { unmount } = render(
        <WebappSidebar mobileOpen={false} onCloseMobile={jest.fn()} />,
      );

      expect(
        screen.queryByTestId('v22-sidebar-admin-group'),
      ).not.toBeInTheDocument();

      unmount();
    }
  });

  it('exibe o grupo Admin para perfis Staff e Admin após a hidratação', () => {
    for (const role of ['Staff', 'Admin'] as const) {
      useAuthStore.setState({
        username: role === 'Admin' ? 'admin_user' : 'staff_user',
        position: role,
        hasHydrated: true,
        isPending: false,
      });

      const { unmount } = render(
        <WebappSidebar mobileOpen={false} onCloseMobile={jest.fn()} />,
      );

      const adminGroup = screen.getByTestId('v22-sidebar-admin-group');
      expect(adminGroup).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /Dashboard/i })).toHaveAttribute(
        'href',
        '/dashboard',
      );

      unmount();
    }
  });

  it('identifica claramente o item Apoio com destino ao Discord oficial', () => {
    useAuthStore.setState({
      hasHydrated: true,
      isPending: false,
      username: null,
      position: null,
    });

    render(<WebappSidebar mobileOpen={false} onCloseMobile={jest.fn()} />);

    const supportLink = screen.getByRole('link', { name: /Apoio.*Discord/i });
    expect(supportLink).toHaveAttribute('href', LINK_DISCORD);
    expect(supportLink).toHaveTextContent('Apoio (Discord)');
  });

  describe('variant="admin"', () => {
    beforeEach(() => {
      useAuthStore.setState({
        username: 'admin_test',
        position: 'Admin',
        hasHydrated: true,
        isPending: false,
      });
    });

    it('renderiza os grupos administrativos e o card do usuário no desktop expandido', () => {
      const toggleMock = jest.fn();

      render(
        <WebappSidebar
          variant="admin"
          mobileOpen={false}
          onCloseMobile={jest.fn()}
          isCollapsed={false}
          onToggleCollapse={toggleMock}
        />,
      );

      expect(screen.getByText('admin_test')).toBeInTheDocument();
      expect(screen.getByText('Principal')).toBeInTheDocument();
      expect(screen.getByText('Blog')).toBeInTheDocument();
      expect(screen.getByText('Admin')).toBeInTheDocument();
      expect(screen.getByText('Rodapé')).toBeInTheDocument();

      expect(screen.getByRole('link', { name: /Dashboard/i })).toHaveAttribute(
        'href',
        '/dashboard',
      );
      expect(screen.getByRole('link', { name: /Novels/i })).toHaveAttribute(
        'href',
        '/noveladmin',
      );
      expect(screen.getByRole('link', { name: /Mangás/i })).toHaveAttribute(
        'href',
        '/mangaadmin',
      );
      expect(screen.getByRole('link', { name: /Gêneros/i })).toHaveAttribute(
        'href',
        '/admin/generos',
      );
      expect(screen.getByRole('link', { name: /Posts/i })).toHaveAttribute(
        'href',
        '/admin/posts',
      );
      expect(screen.getByRole('link', { name: /Categorias/i })).toHaveAttribute(
        'href',
        '/admin/blog/categorias',
      );
      expect(screen.getByRole('link', { name: /Usuários/i })).toHaveAttribute(
        'href',
        '/useradmin',
      );
      expect(screen.getByRole('link', { name: /Permissões/i })).toHaveAttribute(
        'href',
        '/staffadmin',
      );
      expect(screen.getByRole('link', { name: /Staff/i })).toHaveAttribute(
        'href',
        '/staff',
      );
      expect(
        screen.getByRole('link', { name: /Retornar ao Site/i }),
      ).toHaveAttribute('href', '/');

      const toggleButton = screen.getByRole('button', {
        name: /Recolher menu lateral/i,
      });
      fireEvent.click(toggleButton);
      expect(toggleMock).toHaveBeenCalledTimes(1);
    });

    it('renderiza corretamente no modo colapsado (80px) com labels acessíveis via sr-only', () => {
      const toggleMock = jest.fn();

      render(
        <WebappSidebar
          variant="admin"
          mobileOpen={false}
          onCloseMobile={jest.fn()}
          isCollapsed={true}
          onToggleCollapse={toggleMock}
        />,
      );

      const expandButton = screen.getByRole('button', {
        name: /Expandir menu lateral/i,
      });
      expect(expandButton).toBeInTheDocument();
      fireEvent.click(expandButton);
      expect(toggleMock).toHaveBeenCalledTimes(1);

      const dashboardLink = screen.getByRole('link', { name: /Dashboard/i });
      expect(dashboardLink).toHaveAttribute('href', '/dashboard');
      expect(dashboardLink.className).toContain('w-[34px]');
      expect(dashboardLink.className).toContain('h-[27px]');
    });

    it('renderiza o drawer mobile (207px) com backdrop escuro ao abrir em telas móveis', () => {
      const closeMock = jest.fn();

      render(
        <WebappSidebar
          variant="admin"
          mobileOpen={true}
          onCloseMobile={closeMock}
        />,
      );

      closeMock.mockClear();

      const drawer = screen.getByTestId('v22-mobile-drawer');
      expect(drawer).toBeInTheDocument();
      expect(drawer.className).toContain('w-[207px]');

      const closeButton = screen.getByRole('button', {
        name: /Fechar menu lateral/i,
      });
      fireEvent.click(closeButton);
      expect(closeMock).toHaveBeenCalledTimes(1);
    });

    it('executa logout e redireciona ao clicar no botão Sair', () => {
      render(
        <WebappSidebar
          variant="admin"
          mobileOpen={false}
          onCloseMobile={jest.fn()}
        />,
      );

      const logoutButton = screen.getByRole('button', {
        name: /Sair da conta/i,
      });
      fireEvent.click(logoutButton);

      expect(useAuthStore.getState().username).toBeNull();
      expect(pushMock).toHaveBeenCalledWith('/');
    });
  });
});

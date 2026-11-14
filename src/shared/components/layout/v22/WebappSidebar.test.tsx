import '@testing-library/jest-dom';
import { act, cleanup, render, screen } from '@testing-library/react';
import React from 'react';

import { useAuthStore } from '@/core/auth/stores/useAuthStore';
import { LINK_DISCORD } from '@/shared/utils/systemValues';

import { WebappSidebar } from './WebappSidebar';

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
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

describe('<WebappSidebar />', () => {
  const initialState = useAuthStore.getState();

  beforeEach(() => {
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
});

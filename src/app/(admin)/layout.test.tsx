import '@testing-library/jest-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import React from 'react';

import DashboardLayout from '@/app/(admin)/layout';
import { useAuthStore } from '@/core/auth/stores/useAuthStore';
import {
  createAdminToken,
  createExpiredToken,
  createMockJwt,
  resetAuthStore,
  SEED_ADMIN_CREDENTIALS,
  setupAuthState,
  setupHydratedAdmin,
  setupHydratedApoiador,
  setupHydratedReader,
  setupHydratedStaff,
  setupPendingState,
  setupUnhydratedState,
} from '@/core/auth/test/authTestUtils';

const replaceMock = jest.fn();
const pushMock = jest.fn();
const backMock = jest.fn();

const mockRouter = {
  replace: replaceMock,
  push: pushMock,
  prefetch: jest.fn(),
  back: backMock,
  forward: jest.fn(),
  refresh: jest.fn(),
};

let currentPathname = '/dashboard';

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  usePathname: () => currentPathname,
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
}));

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

jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'theme-dark',
    setTheme: jest.fn(),
  }),
}));

function renderWithProviders(ui: React.ReactElement) {
  const testQueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>,
  );
}

describe('DashboardLayout Integration & RBAC Test Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetAuthStore();
    currentPathname = '/dashboard';
  });

  afterEach(() => {
    cleanup();
    resetAuthStore();
  });

  // =========================================================================
  // TIER 1: Feature Coverage (Layout Shell Wrapping & Protection)
  // =========================================================================
  describe('Tier 1: Feature Coverage', () => {
    it('T1.1: renderiza filhos protegidos e layout shell completo para perfil Admin', () => {
      setupHydratedAdmin('admin');

      renderWithProviders(
        <DashboardLayout>
          <div data-testid="admin-child">Visão Geral do Admin</div>
        </DashboardLayout>,
      );

      expect(screen.getByTestId('admin-child')).toBeInTheDocument();
      expect(screen.getByText('Visão Geral do Admin')).toBeInTheDocument();
      expect(replaceMock).not.toHaveBeenCalled();
    });

    it('T1.2: renderiza filhos protegidos e layout shell completo para perfil Staff', () => {
      setupHydratedStaff('staff_membro');

      renderWithProviders(
        <DashboardLayout>
          <div data-testid="staff-child">Módulo de Capítulos do Staff</div>
        </DashboardLayout>,
      );

      expect(screen.getByTestId('staff-child')).toBeInTheDocument();
      expect(
        screen.getByText('Módulo de Capítulos do Staff'),
      ).toBeInTheDocument();
      expect(replaceMock).not.toHaveBeenCalled();
    });

    it('T1.3: bloqueia usuário Leitor, não renderiza layout nem filhos e redireciona para "/"', async () => {
      setupHydratedReader('leitor_1');

      renderWithProviders(
        <DashboardLayout>
          <div data-testid="forbidden-child">Segredo Proibido</div>
        </DashboardLayout>,
      );

      await waitFor(() => {
        expect(replaceMock).toHaveBeenCalledWith('/');
      });
      expect(screen.queryByTestId('forbidden-child')).not.toBeInTheDocument();
      expect(
        screen.queryByTestId('v22-desktop-sidebar'),
      ).not.toBeInTheDocument();
    });

    it('T1.4: bloqueia usuário Apoiador, não renderiza layout nem filhos e redireciona para "/"', async () => {
      setupHydratedApoiador('apoiador_ouro');

      renderWithProviders(
        <DashboardLayout>
          <div data-testid="forbidden-child">Segredo Proibido</div>
        </DashboardLayout>,
      );

      await waitFor(() => {
        expect(replaceMock).toHaveBeenCalledWith('/');
      });
      expect(screen.queryByTestId('forbidden-child')).not.toBeInTheDocument();
      expect(
        screen.queryByTestId('v22-desktop-sidebar'),
      ).not.toBeInTheDocument();
    });

    it('T1.5: bloqueia visitante anônimo não autenticado e redireciona para "/"', async () => {
      setupAuthState({
        username: null,
        position: null,
        hasHydrated: true,
        isPending: false,
      });

      renderWithProviders(
        <DashboardLayout>
          <div data-testid="forbidden-child">Segredo Proibido</div>
        </DashboardLayout>,
      );

      await waitFor(() => {
        expect(replaceMock).toHaveBeenCalledWith('/');
      });
      expect(screen.queryByTestId('forbidden-child')).not.toBeInTheDocument();
      expect(
        screen.queryByTestId('v22-desktop-sidebar'),
      ).not.toBeInTheDocument();
    });

    it('T1.6: exibe spinner de carregamento e não monta layout shell enquanto sessão está pendente', () => {
      setupPendingState();

      const { container } = renderWithProviders(
        <DashboardLayout>
          <div data-testid="delayed-child">Aguardando...</div>
        </DashboardLayout>,
      );

      expect(container.querySelector('.animate-spin')).toBeInTheDocument();
      expect(screen.queryByTestId('delayed-child')).not.toBeInTheDocument();
      expect(
        screen.queryByTestId('v22-desktop-sidebar'),
      ).not.toBeInTheDocument();
      expect(replaceMock).not.toHaveBeenCalled();
    });

    it('T1.7: autenticação com conta seed admin (admin / !@SenhaDaTsunParaTrocarDepois123) monta layout com sucesso', () => {
      setupHydratedAdmin(SEED_ADMIN_CREDENTIALS.usuario);

      renderWithProviders(
        <DashboardLayout>
          <div data-testid="seed-admin-content">Painel Principal Tsundoku</div>
        </DashboardLayout>,
      );

      expect(screen.getByTestId('seed-admin-content')).toBeInTheDocument();
      expect(replaceMock).not.toHaveBeenCalled();
      expect(useAuthStore.getState().isAdmin).toBe(true);
      expect(screen.getByTestId('v22-desktop-sidebar')).toBeInTheDocument();
    });
  });

  // =========================================================================
  // TIER 2: Boundary & Corner Cases (Layout-Level State Invariants)
  // =========================================================================
  describe('Tier 2: Boundary & Corner Cases', () => {
    it('T2.1: token expirado em rota administrativa limpa a sessão e redireciona para "/"', async () => {
      const expiredToken = createExpiredToken('admin');
      useAuthStore.getState().setAccessToken(expiredToken);
      useAuthStore.getState().setHasHydrated(true);

      renderWithProviders(
        <DashboardLayout>
          <div data-testid="expired-target">Alvo Expirado</div>
        </DashboardLayout>,
      );

      await waitFor(() => {
        expect(replaceMock).toHaveBeenCalledWith('/');
      });
      expect(screen.queryByTestId('expired-target')).not.toBeInTheDocument();
      expect(
        screen.queryByTestId('v22-desktop-sidebar'),
      ).not.toBeInTheDocument();
    });

    it('T2.2: token JWT malformado aciona fallback e impede renderização do layout administrativo', async () => {
      useAuthStore.getState().setAccessToken('jwt.malformado.invalido');
      useAuthStore.getState().setHasHydrated(true);

      renderWithProviders(
        <DashboardLayout>
          <div data-testid="malformed-target">Alvo Malformado</div>
        </DashboardLayout>,
      );

      await waitFor(() => {
        expect(replaceMock).toHaveBeenCalledWith('/');
      });
      expect(screen.queryByTestId('malformed-target')).not.toBeInTheDocument();
      expect(
        screen.queryByTestId('v22-desktop-sidebar'),
      ).not.toBeInTheDocument();
    });

    it('T2.3: token com role ausente cai no fallback de Leitor e é bloqueado no layout administrativo', async () => {
      const tokenWithoutRoles = createMockJwt({
        sub: 'sem-role-id',
        exp: Math.floor(Date.now() / 1000) + 3600,
      });

      useAuthStore.getState().setAccessToken(tokenWithoutRoles);
      useAuthStore.getState().setUsername('usuario_sem_role');
      useAuthStore.getState().setHasHydrated(true);

      renderWithProviders(
        <DashboardLayout>
          <div data-testid="norole-target">Alvo Sem Role</div>
        </DashboardLayout>,
      );

      await waitFor(() => {
        expect(replaceMock).toHaveBeenCalledWith('/');
      });
      expect(screen.queryByTestId('norole-target')).not.toBeInTheDocument();
      expect(
        screen.queryByTestId('v22-desktop-sidebar'),
      ).not.toBeInTheDocument();
    });

    it('T2.4: renderiza múltiplos filhos, fragmentos e elementos aninhados dentro do layout administrativo', () => {
      setupHydratedAdmin('admin');

      renderWithProviders(
        <DashboardLayout>
          <header data-testid="child-header">Título Administrativo</header>
          <section data-testid="child-section">Estatísticas Rápidas</section>
          <footer data-testid="child-footer">Rodapé do Módulo</footer>
        </DashboardLayout>,
      );

      expect(screen.getByTestId('child-header')).toBeInTheDocument();
      expect(screen.getByTestId('child-section')).toBeInTheDocument();
      expect(screen.getByTestId('child-footer')).toBeInTheDocument();
    });

    it('T2.5: botão de menu mobile do topbar abre o drawer lateral responsivo sem erros', () => {
      setupHydratedAdmin('admin');

      renderWithProviders(
        <DashboardLayout>
          <div data-testid="content">Conteúdo</div>
        </DashboardLayout>,
      );

      const mobileMenuTrigger = screen.getByTestId('v22-mobile-menu-trigger');
      expect(mobileMenuTrigger).toBeInTheDocument();

      fireEvent.click(mobileMenuTrigger);

      const mobileDrawer = screen.getByTestId('v22-mobile-drawer');
      expect(mobileDrawer).toBeInTheDocument();
    });
  });

  // =========================================================================
  // TIER 3: Cross-Feature Combinations & State Transitions
  // =========================================================================
  describe('Tier 3: Cross-Feature Combinations', () => {
    it('T3.1: Transição de hidratação no layout: spinner inicial se transforma no layout administrativo quando admin é hidratado', () => {
      setupUnhydratedState();

      const { container, rerender } = renderWithProviders(
        <DashboardLayout>
          <div data-testid="hydration-child">Conteúdo Renderizado</div>
        </DashboardLayout>,
      );

      expect(container.querySelector('.animate-spin')).toBeInTheDocument();
      expect(screen.queryByTestId('hydration-child')).not.toBeInTheDocument();

      act(() => {
        setupHydratedAdmin('admin');
      });

      rerender(
        <QueryClientProvider
          client={
            new QueryClient({
              defaultOptions: { queries: { retry: false } },
            })
          }
        >
          <DashboardLayout>
            <div data-testid="hydration-child">Conteúdo Renderizado</div>
          </DashboardLayout>
        </QueryClientProvider>,
      );

      expect(container.querySelector('.animate-spin')).not.toBeInTheDocument();
      expect(screen.getByTestId('hydration-child')).toBeInTheDocument();
      expect(replaceMock).not.toHaveBeenCalled();
    });

    it('T3.2: Logout em tempo real na tela administrativa: desmonta layout e redireciona para "/"', async () => {
      setupHydratedAdmin('admin');

      const testQueryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
      });

      const { rerender } = render(
        <QueryClientProvider client={testQueryClient}>
          <DashboardLayout>
            <div data-testid="active-dashboard">Painel Operacional Ativo</div>
          </DashboardLayout>
        </QueryClientProvider>,
      );

      expect(screen.getByTestId('active-dashboard')).toBeInTheDocument();

      act(() => {
        useAuthStore.getState().logout();
      });

      rerender(
        <QueryClientProvider client={testQueryClient}>
          <DashboardLayout>
            <div data-testid="active-dashboard">Painel Operacional Ativo</div>
          </DashboardLayout>
        </QueryClientProvider>,
      );

      await waitFor(() => {
        expect(replaceMock).toHaveBeenCalledWith('/');
      });
      expect(screen.queryByTestId('active-dashboard')).not.toBeInTheDocument();
    });

    it('T3.3: Rebaixamento de cargo durante navegação: Admin rebaixado para Leitor desmonta layout', async () => {
      setupHydratedAdmin('demoted_user');

      const testQueryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
      });

      const { rerender } = render(
        <QueryClientProvider client={testQueryClient}>
          <DashboardLayout>
            <div data-testid="demoted-view">Visualização Admin</div>
          </DashboardLayout>
        </QueryClientProvider>,
      );

      expect(screen.getByTestId('demoted-view')).toBeInTheDocument();

      act(() => {
        setupHydratedReader('demoted_user');
      });

      rerender(
        <QueryClientProvider client={testQueryClient}>
          <DashboardLayout>
            <div data-testid="demoted-view">Visualização Admin</div>
          </DashboardLayout>
        </QueryClientProvider>,
      );

      await waitFor(() => {
        expect(replaceMock).toHaveBeenCalledWith('/');
      });
      expect(screen.queryByTestId('demoted-view')).not.toBeInTheDocument();
    });

    it('T3.4: Renderização da Sidebar RBAC: perfil Admin exibe a navegação administrativa com links operacionais', () => {
      setupHydratedAdmin('admin');
      currentPathname = '/dashboard';

      renderWithProviders(
        <DashboardLayout>
          <div>Dashboard</div>
        </DashboardLayout>,
      );

      const desktopSidebar = screen.getByTestId('v22-desktop-sidebar');
      expect(desktopSidebar).toBeInTheDocument();

      const sidebarWithin = within(desktopSidebar);
      const adminNav = sidebarWithin.getByRole('navigation', {
        name: /Navegação administrativa/i,
      });
      expect(adminNav).toBeInTheDocument();

      const dashboardLink = sidebarWithin.getByRole('link', {
        name: /^Dashboard$/i,
      });
      expect(dashboardLink).toHaveAttribute('href', '/dashboard');

      const novelsLink = sidebarWithin.getByRole('link', { name: /^Novels$/i });
      expect(novelsLink).toHaveAttribute('href', '/noveladmin');

      const mangasLink = sidebarWithin.getByRole('link', { name: /^Mangás$/i });
      expect(mangasLink).toHaveAttribute('href', '/mangaadmin');

      const volumesLink = sidebarWithin.getByRole('link', {
        name: /^Volumes$/i,
      });
      expect(volumesLink).toHaveAttribute('href', '/project');
    });

    it('T3.5: Renderização da Sidebar RBAC: perfil Staff também exibe o menu administrativo da sidebar', () => {
      setupHydratedStaff('staff_user');
      currentPathname = '/dashboard';

      renderWithProviders(
        <DashboardLayout>
          <div>Área Staff</div>
        </DashboardLayout>,
      );

      const desktopSidebar = screen.getByTestId('v22-desktop-sidebar');
      expect(desktopSidebar).toBeInTheDocument();

      const adminNav = within(desktopSidebar).getByRole('navigation', {
        name: /Navegação administrativa/i,
      });
      expect(adminNav).toBeInTheDocument();
      expect(useAuthStore.getState().isAdmin).toBe(false);
      expect(useAuthStore.getState().position).toBe('Staff');
    });
  });

  // =========================================================================
  // TIER 4: Real-World Application Scenarios
  // =========================================================================
  describe('Tier 4: Real-World Scenarios', () => {
    it('T4.1: Cenário E2E: Ciclo de vida da sessão administrativa (Cold Start -> Rejeição -> Login Seed -> Acesso -> Expiração)', async () => {
      // 1. Cold start anônimo
      setupAuthState({
        username: null,
        position: null,
        hasHydrated: true,
        isPending: false,
      });

      const testQueryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
      });

      const { rerender } = render(
        <QueryClientProvider client={testQueryClient}>
          <DashboardLayout>
            <div data-testid="lifecycle-child">Dashboard Principal</div>
          </DashboardLayout>
        </QueryClientProvider>,
      );

      // Rejeitado
      await waitFor(() => {
        expect(replaceMock).toHaveBeenCalledWith('/');
      });
      expect(screen.queryByTestId('lifecycle-child')).not.toBeInTheDocument();

      // 2. Login com conta seed admin bem-sucedido
      replaceMock.mockClear();
      act(() => {
        const token = createAdminToken({
          username: SEED_ADMIN_CREDENTIALS.usuario,
        });
        useAuthStore.getState().setAccessToken(token);
        useAuthStore.getState().setUsername(SEED_ADMIN_CREDENTIALS.usuario);
        useAuthStore.getState().setHasHydrated(true);
      });

      rerender(
        <QueryClientProvider client={testQueryClient}>
          <DashboardLayout>
            <div data-testid="lifecycle-child">Dashboard Principal</div>
          </DashboardLayout>
        </QueryClientProvider>,
      );

      // Autorizado
      expect(screen.getByTestId('lifecycle-child')).toBeInTheDocument();
      expect(replaceMock).not.toHaveBeenCalled();
      const desktopSidebar = screen.getByTestId('v22-desktop-sidebar');
      expect(desktopSidebar).toBeInTheDocument();
      expect(
        within(desktopSidebar).getByRole('navigation', {
          name: /Navegação administrativa/i,
        }),
      ).toBeInTheDocument();

      // 3. Expiração do token da sessão
      act(() => {
        useAuthStore.getState().logout();
      });

      rerender(
        <QueryClientProvider client={testQueryClient}>
          <DashboardLayout>
            <div data-testid="lifecycle-child">Dashboard Principal</div>
          </DashboardLayout>
        </QueryClientProvider>,
      );

      // Sessão invalidada
      await waitFor(() => {
        expect(replaceMock).toHaveBeenCalledWith('/');
      });
      expect(screen.queryByTestId('lifecycle-child')).not.toBeInTheDocument();
    });

    it('T4.2: Cenário E2E: Fluxo restrito de Staff vs Admin (Acesso ao Layout concedido, barreira mutativa isAdmin mantida)', () => {
      // Login como Staff
      setupHydratedStaff('staff_tradutor');

      renderWithProviders(
        <DashboardLayout>
          <div data-testid="staff-view">Visualização de Capítulos Staff</div>
        </DashboardLayout>,
      );

      // Staff passa pelo AdminGuard e visualiza a casca administrativa
      expect(screen.getByTestId('staff-view')).toBeInTheDocument();
      expect(replaceMock).not.toHaveBeenCalled();

      // Contrato de mutação granular: Staff não tem isAdmin, preservando a barreira contra alterações estruturais
      const state = useAuthStore.getState();
      expect(state.position).toBe('Staff');
      expect(state.isAdmin).toBe(false);

      // Promove para Admin e verifica elevação do privilégio
      act(() => {
        setupHydratedAdmin('admin_promovido');
      });

      const elevatedState = useAuthStore.getState();
      expect(elevatedState.position).toBe('Admin');
      expect(elevatedState.isAdmin).toBe(true);
    });
  });
});

import '@testing-library/jest-dom';
import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { AdminGuard, canAccessAdmin } from '@/core/auth/components/AdminGuard';
import { useAuthStore } from '@/core/auth/stores/useAuthStore';
import {
  createAdminToken,
  createExpiredToken,
  createMockJwt,
  createStaffToken,
  createTokenWithoutExp,
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

const mockRouter = {
  replace: replaceMock,
  push: pushMock,
  prefetch: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
};

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  usePathname: () => '/dashboard',
  useSearchParams: () => new URLSearchParams(),
}));

describe('AdminGuard & canAccessAdmin Test Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetAuthStore();
  });

  afterEach(() => {
    cleanup();
    resetAuthStore();
  });

  // =========================================================================
  // TIER 1: Feature Coverage (Pure function & Core Guard Behavior)
  // =========================================================================
  describe('Tier 1: Feature Coverage', () => {
    describe('Feature 1.1: Admin Access Authorization', () => {
      it('T1.1.1: canAccessAdmin retorna true para usuário válido com cargo Admin', () => {
        expect(canAccessAdmin('admin', 'Admin')).toBe(true);
      });

      it('T1.1.2: canAccessAdmin aceita outros nomes de usuários com cargo Admin', () => {
        expect(canAccessAdmin('gestor_chefe', 'Admin')).toBe(true);
      });

      it('T1.1.3: AdminGuard renderiza conteúdo protegido para conta Admin hidratada', () => {
        setupHydratedAdmin('admin');

        render(
          <AdminGuard>
            <div data-testid="admin-content">Conteúdo Restrito do Admin</div>
          </AdminGuard>,
        );

        expect(screen.getByTestId('admin-content')).toBeInTheDocument();
        expect(
          screen.getByText('Conteúdo Restrito do Admin'),
        ).toBeInTheDocument();
      });

      it('T1.1.4: AdminGuard não aciona router.replace para usuário Admin', () => {
        setupHydratedAdmin('admin_seguro');

        render(
          <AdminGuard>
            <span data-testid="child-node">Nó Protegido</span>
          </AdminGuard>,
        );

        expect(replaceMock).not.toHaveBeenCalled();
      });

      it('T1.1.5: AdminGuard não renderiza spinner de carregamento quando o Admin está autorizado', () => {
        setupHydratedAdmin('admin');

        const { container } = render(
          <AdminGuard>
            <div>Pronto</div>
          </AdminGuard>,
        );

        expect(
          container.querySelector('.animate-spin'),
        ).not.toBeInTheDocument();
      });
    });

    describe('Feature 1.2: Staff Access Authorization', () => {
      it('T1.2.1: canAccessAdmin retorna true para usuário válido com cargo Staff', () => {
        expect(canAccessAdmin('staff_member', 'Staff')).toBe(true);
      });

      it('T1.2.2: canAccessAdmin aceita diferentes usernames com cargo Staff', () => {
        expect(canAccessAdmin('tradutor_123', 'Staff')).toBe(true);
      });

      it('T1.2.3: AdminGuard renderiza filhos protegidos para usuário Staff', () => {
        setupHydratedStaff('staff_editor');

        render(
          <AdminGuard>
            <p data-testid="staff-accessible">Painel Liberado para Staff</p>
          </AdminGuard>,
        );

        expect(screen.getByTestId('staff-accessible')).toBeInTheDocument();
      });

      it('T1.2.4: AdminGuard não aciona router.replace para usuário Staff', () => {
        setupHydratedStaff('staff_editor');

        render(
          <AdminGuard>
            <div>Conteúdo Staff</div>
          </AdminGuard>,
        );

        expect(replaceMock).not.toHaveBeenCalled();
      });

      it('T1.2.5: AdminGuard remove spinner e libera árvore DOM para Staff', () => {
        setupHydratedStaff('revisor');

        const { container } = render(
          <AdminGuard>
            <div>Ok Staff</div>
          </AdminGuard>,
        );

        expect(
          container.querySelector('.animate-spin'),
        ).not.toBeInTheDocument();
        expect(screen.getByText('Ok Staff')).toBeInTheDocument();
      });
    });

    describe('Feature 1.3: Reader & Apoiador Rejection', () => {
      it('T1.3.1: canAccessAdmin retorna false para cargo Leitor', () => {
        expect(canAccessAdmin('leitor_comum', 'Leitor')).toBe(false);
      });

      it('T1.3.2: canAccessAdmin retorna false para cargo Apoiador', () => {
        expect(canAccessAdmin('apoiador_vip', 'Apoiador')).toBe(false);
      });

      it('T1.3.3: AdminGuard não renderiza filhos protegidos para perfil Leitor', () => {
        setupHydratedReader('leitor_comum');

        render(
          <AdminGuard>
            <div data-testid="secret-panel">Painel Secreto</div>
          </AdminGuard>,
        );

        expect(screen.queryByTestId('secret-panel')).not.toBeInTheDocument();
      });

      it('T1.3.4: AdminGuard redireciona usuário Leitor para "/" via router.replace', async () => {
        setupHydratedReader('leitor_comum');

        render(
          <AdminGuard>
            <div>Não Renderizar</div>
          </AdminGuard>,
        );

        await waitFor(() => {
          expect(replaceMock).toHaveBeenCalledTimes(1);
          expect(replaceMock).toHaveBeenCalledWith('/');
        });
      });

      it('T1.3.5: AdminGuard redireciona usuário Apoiador para "/" e retorna null', async () => {
        setupHydratedApoiador('apoiador_mensal');

        const { container } = render(
          <AdminGuard>
            <span data-testid="should-be-hidden">Bloqueado</span>
          </AdminGuard>,
        );

        await waitFor(() => {
          expect(replaceMock).toHaveBeenCalledWith('/');
        });
        expect(
          screen.queryByTestId('should-be-hidden'),
        ).not.toBeInTheDocument();
        expect(container).toBeEmptyDOMElement();
      });
    });

    describe('Feature 1.4: Unauthenticated Visitor Rejection & Hydration States', () => {
      it('T1.4.1: canAccessAdmin retorna false para username nulo', () => {
        expect(canAccessAdmin(null, 'Admin')).toBe(false);
        expect(canAccessAdmin(null, 'Staff')).toBe(false);
      });

      it('T1.4.2: canAccessAdmin retorna false quando username e position são ambos nulos', () => {
        expect(canAccessAdmin(null, null)).toBe(false);
      });

      it('T1.4.3: AdminGuard exibe spinner e não redireciona quando não está hidratado (!hasHydrated)', () => {
        setupUnhydratedState();

        const { container } = render(
          <AdminGuard>
            <div data-testid="protected-content">Segredo</div>
          </AdminGuard>,
        );

        expect(container.querySelector('.animate-spin')).toBeInTheDocument();
        expect(
          screen.queryByTestId('protected-content'),
        ).not.toBeInTheDocument();
        expect(replaceMock).not.toHaveBeenCalled();
      });

      it('T1.4.4: AdminGuard exibe spinner e não redireciona enquanto isPending for true', () => {
        setupPendingState();

        const { container } = render(
          <AdminGuard>
            <div data-testid="protected-content">Segredo</div>
          </AdminGuard>,
        );

        expect(container.querySelector('.animate-spin')).toBeInTheDocument();
        expect(replaceMock).not.toHaveBeenCalled();
      });

      it('T1.4.5: AdminGuard redireciona visitante anônimo para "/" após hidratação', async () => {
        setupAuthState({
          username: null,
          position: null,
          hasHydrated: true,
          isPending: false,
        });

        render(
          <AdminGuard>
            <div>Área Administrativa</div>
          </AdminGuard>,
        );

        await waitFor(() => {
          expect(replaceMock).toHaveBeenCalledWith('/');
        });
      });
    });

    describe('Feature 1.5: Token Decoding, Roles Normalization & Guard Integration', () => {
      it('T1.5.1: token com claim roles escalar "admin" concede acesso ao AdminGuard', () => {
        const token = createAdminToken();
        useAuthStore.getState().setAccessToken(token);
        useAuthStore.getState().setUsername('admin');
        useAuthStore.getState().setHasHydrated(true);

        render(
          <AdminGuard>
            <div data-testid="admin-panel">Painel Admin</div>
          </AdminGuard>,
        );

        expect(screen.getByTestId('admin-panel')).toBeInTheDocument();
        expect(replaceMock).not.toHaveBeenCalled();
      });

      it('T1.5.2: token com claim roles em array ["staff"] concede acesso ao AdminGuard', () => {
        const token = createStaffToken();
        useAuthStore.getState().setAccessToken(token);
        useAuthStore.getState().setUsername('staff_member');
        useAuthStore.getState().setHasHydrated(true);

        render(
          <AdminGuard>
            <div data-testid="staff-panel">Painel Staff</div>
          </AdminGuard>,
        );

        expect(screen.getByTestId('staff-panel')).toBeInTheDocument();
        expect(replaceMock).not.toHaveBeenCalled();
      });

      it('T1.5.3: token com claim roles em maiúsculo "ADMIN" normaliza e permite acesso', () => {
        const token = createMockJwt({
          sub: 'admin-1',
          roles: 'ADMIN',
          exp: Math.floor(Date.now() / 1000) + 3600,
        });

        useAuthStore.getState().setAccessToken(token);
        useAuthStore.getState().setUsername('admin');
        useAuthStore.getState().setHasHydrated(true);

        render(
          <AdminGuard>
            <div data-testid="normalized-admin">Admin Normalizado</div>
          </AdminGuard>,
        );

        expect(screen.getByTestId('normalized-admin')).toBeInTheDocument();
      });

      it('T1.5.4: token com múltiplos cargos ["staff", "editor"] mapeia para Staff e permite acesso', () => {
        const token = createMockJwt({
          sub: 'staff-multirole',
          roles: ['staff', 'editor'],
          exp: Math.floor(Date.now() / 1000) + 3600,
        });

        useAuthStore.getState().setAccessToken(token);
        useAuthStore.getState().setUsername('staff_user');
        useAuthStore.getState().setHasHydrated(true);

        render(
          <AdminGuard>
            <div data-testid="multi-role-staff">Staff Multi Role</div>
          </AdminGuard>,
        );

        expect(screen.getByTestId('multi-role-staff')).toBeInTheDocument();
      });

      it('T1.5.5: token sem exp válido continua válido e concede acesso ao AdminGuard', () => {
        const token = createTokenWithoutExp('admin');
        useAuthStore.getState().setAccessToken(token);
        useAuthStore.getState().setUsername('admin');
        useAuthStore.getState().setHasHydrated(true);

        render(
          <AdminGuard>
            <div data-testid="no-exp-admin">Admin Sem Exp</div>
          </AdminGuard>,
        );

        expect(screen.getByTestId('no-exp-admin')).toBeInTheDocument();
      });
    });

    describe('Feature 1.6: Seed Admin Credentials Contract Verification', () => {
      it('T1.6.1: valida credenciais seed do contrato (admin / !@SenhaDaTsunParaTrocarDepois123)', () => {
        expect(SEED_ADMIN_CREDENTIALS.usuario).toBe('admin');
        expect(SEED_ADMIN_CREDENTIALS.senha).toBe(
          '!@SenhaDaTsunParaTrocarDepois123',
        );
        expect(SEED_ADMIN_CREDENTIALS.email).toBe(
          'tsundokutraducoes@gmail.com',
        );
      });

      it('T1.6.2: conta seed admin atende à regra canAccessAdmin', () => {
        expect(canAccessAdmin(SEED_ADMIN_CREDENTIALS.usuario, 'Admin')).toBe(
          true,
        );
      });

      it('T1.6.3: sessão hidratada com a conta seed admin renderiza AdminGuard sem redirect', () => {
        setupHydratedAdmin(SEED_ADMIN_CREDENTIALS.usuario);

        render(
          <AdminGuard>
            <h1 data-testid="seed-admin-view">Dashboard Tsundoku Admin</h1>
          </AdminGuard>,
        );

        expect(screen.getByTestId('seed-admin-view')).toBeInTheDocument();
        expect(replaceMock).not.toHaveBeenCalled();
      });

      it('T1.6.4: seed admin possui privilégio elevado isAdmin === true', () => {
        setupHydratedAdmin(SEED_ADMIN_CREDENTIALS.usuario);
        expect(useAuthStore.getState().isAdmin).toBe(true);
      });

      it('T1.6.5: perfil Staff possui isAdmin === false diferenciando permissões mutativas de conteúdo', () => {
        setupHydratedStaff('staff_user');
        expect(useAuthStore.getState().isAdmin).toBe(false);
        expect(
          canAccessAdmin('staff_user', useAuthStore.getState().position),
        ).toBe(true);
      });
    });
  });

  // =========================================================================
  // TIER 2: Boundary & Corner Cases
  // =========================================================================
  describe('Tier 2: Boundary & Corner Cases', () => {
    describe('Feature 2.1: Expired Tokens', () => {
      it('T2.1.1: token expirado rejeitado no setAccessToken resulta em estado não autenticado e redirecionamento', async () => {
        const expiredToken = createExpiredToken('admin');
        useAuthStore.getState().setAccessToken(expiredToken);
        useAuthStore.getState().setHasHydrated(true);

        render(
          <AdminGuard>
            <div data-testid="expired-content">Não deve exibir</div>
          </AdminGuard>,
        );

        await waitFor(() => {
          expect(replaceMock).toHaveBeenCalledWith('/');
        });
        expect(screen.queryByTestId('expired-content')).not.toBeInTheDocument();
      });

      it('T2.1.2: token expirado limpa username e roles na store', () => {
        const expiredToken = createExpiredToken('admin');
        useAuthStore.getState().setAccessToken(expiredToken);

        const state = useAuthStore.getState();
        expect(state.accessToken).toBeNull();
        expect(state.roles).toBeNull();
        expect(state.isAdmin).toBe(false);
      });

      it('T2.1.3: store isTokenExpired retorna true quando não há accessToken', () => {
        resetAuthStore();
        expect(useAuthStore.getState().isTokenExpired()).toBe(true);
      });

      it('T2.1.4: store isTokenExpired retorna true quando accessToken está no passado', () => {
        const expiredToken = createExpiredToken('staff');
        useAuthStore.setState({ accessToken: expiredToken });
        expect(useAuthStore.getState().isTokenExpired()).toBe(true);
      });

      it('T2.1.5: store isTokenExpired retorna false quando accessToken é futuro', () => {
        const validToken = createAdminToken();
        useAuthStore.setState({ accessToken: validToken });
        expect(useAuthStore.getState().isTokenExpired()).toBe(false);
      });
    });

    describe('Feature 2.2: Malformed JWTs', () => {
      it('T2.2.1: token com string aleatória inválida é tratado como expirado/inválido', async () => {
        useAuthStore.getState().setAccessToken('string.invalida.jwt');
        useAuthStore.getState().setHasHydrated(true);

        render(
          <AdminGuard>
            <div>Conteúdo</div>
          </AdminGuard>,
        );

        await waitFor(() => {
          expect(replaceMock).toHaveBeenCalledWith('/');
        });
      });

      it('T2.2.2: token truncado sem payload ou assinatura cai no catch e redireciona', async () => {
        useAuthStore.getState().setAccessToken('eyJhbGciOiJIUzI1NiJ9');
        useAuthStore.getState().setHasHydrated(true);

        render(
          <AdminGuard>
            <div>Conteúdo</div>
          </AdminGuard>,
        );

        await waitFor(() => {
          expect(replaceMock).toHaveBeenCalledWith('/');
        });
      });

      it('T2.2.3: token numérico arbitrário não quebra o guard e redireciona', async () => {
        useAuthStore.getState().setAccessToken('123456789');
        useAuthStore.getState().setHasHydrated(true);

        render(
          <AdminGuard>
            <div>Conteúdo</div>
          </AdminGuard>,
        );

        await waitFor(() => {
          expect(replaceMock).toHaveBeenCalledWith('/');
        });
      });

      it('T2.2.4: passar string vazia "" ao setAccessToken limpa o token e redireciona', async () => {
        setupHydratedAdmin('admin');
        useAuthStore.getState().setAccessToken('');

        render(
          <AdminGuard>
            <div>Conteúdo</div>
          </AdminGuard>,
        );

        await waitFor(() => {
          expect(replaceMock).toHaveBeenCalledWith('/');
        });
      });

      it('T2.2.5: token com JSON malformado no payload não quebra a execução', async () => {
        const badPayloadJwt =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.badpayload.signature';
        useAuthStore.getState().setAccessToken(badPayloadJwt);
        useAuthStore.getState().setHasHydrated(true);

        render(
          <AdminGuard>
            <div>Conteúdo</div>
          </AdminGuard>,
        );

        await waitFor(() => {
          expect(replaceMock).toHaveBeenCalledWith('/');
        });
      });
    });

    describe('Feature 2.3: Missing Role Claims', () => {
      it('T2.3.1: token sem claim roles mapeia para Leitor e é rejeitado pelo AdminGuard', async () => {
        const tokenWithoutRoles = createMockJwt({
          sub: 'user-no-role',
          exp: Math.floor(Date.now() / 1000) + 3600,
        });

        useAuthStore.getState().setAccessToken(tokenWithoutRoles);
        useAuthStore.getState().setUsername('user_no_roles');
        useAuthStore.getState().setHasHydrated(true);

        render(
          <AdminGuard>
            <div>Conteúdo</div>
          </AdminGuard>,
        );

        await waitFor(() => {
          expect(replaceMock).toHaveBeenCalledWith('/');
        });
      });

      it('T2.3.2: token com roles: null mapeia para Leitor e é rejeitado', async () => {
        const tokenNullRoles = createMockJwt({
          sub: 'user-null-roles',
          roles: null,
          exp: Math.floor(Date.now() / 1000) + 3600,
        });

        useAuthStore.getState().setAccessToken(tokenNullRoles);
        useAuthStore.getState().setUsername('user_null_roles');
        useAuthStore.getState().setHasHydrated(true);

        render(
          <AdminGuard>
            <div>Conteúdo</div>
          </AdminGuard>,
        );

        await waitFor(() => {
          expect(replaceMock).toHaveBeenCalledWith('/');
        });
      });

      it('T2.3.3: token com array vazio roles: [] mapeia para Leitor e é rejeitado', async () => {
        const tokenEmptyRoles = createMockJwt({
          sub: 'user-empty-roles',
          roles: [],
          exp: Math.floor(Date.now() / 1000) + 3600,
        });

        useAuthStore.getState().setAccessToken(tokenEmptyRoles);
        useAuthStore.getState().setUsername('user_empty');
        useAuthStore.getState().setHasHydrated(true);

        render(
          <AdminGuard>
            <div>Conteúdo</div>
          </AdminGuard>,
        );

        await waitFor(() => {
          expect(replaceMock).toHaveBeenCalledWith('/');
        });
      });

      it('T2.3.4: token com roles desconhecido ["OutroPerfil"] mapeia para Leitor e é rejeitado', async () => {
        const tokenUnknownRole = createMockJwt({
          sub: 'user-unknown',
          roles: ['OutroPerfil'],
          exp: Math.floor(Date.now() / 1000) + 3600,
        });

        useAuthStore.getState().setAccessToken(tokenUnknownRole);
        useAuthStore.getState().setUsername('user_unknown');
        useAuthStore.getState().setHasHydrated(true);

        render(
          <AdminGuard>
            <div>Conteúdo</div>
          </AdminGuard>,
        );

        await waitFor(() => {
          expect(replaceMock).toHaveBeenCalledWith('/');
        });
      });

      it('T2.3.5: token com role string vazia roles: "" mapeia para Leitor e é rejeitado', async () => {
        const tokenBlankRole = createMockJwt({
          sub: 'user-blank',
          roles: '',
          exp: Math.floor(Date.now() / 1000) + 3600,
        });

        useAuthStore.getState().setAccessToken(tokenBlankRole);
        useAuthStore.getState().setUsername('user_blank');
        useAuthStore.getState().setHasHydrated(true);

        render(
          <AdminGuard>
            <div>Conteúdo</div>
          </AdminGuard>,
        );

        await waitFor(() => {
          expect(replaceMock).toHaveBeenCalledWith('/');
        });
      });
    });

    describe('Feature 2.4: Case Sensitivity & Role Trimming', () => {
      it('T2.4.1: canAccessAdmin diferencia maiúsculas estritas para o cargo (Admin / Staff)', () => {
        expect(canAccessAdmin('admin', 'admin')).toBe(false);
        expect(canAccessAdmin('staff', 'staff')).toBe(false);
        expect(canAccessAdmin('admin', 'ADMIN')).toBe(false);
      });

      it('T2.4.2: useAuthStore normaliza role "ADMIN" para position "Admin"', () => {
        const token = createMockJwt({
          roles: 'ADMIN',
          exp: Math.floor(Date.now() / 1000) + 3600,
        });
        useAuthStore.getState().setAccessToken(token);
        expect(useAuthStore.getState().position).toBe('Admin');
      });

      it('T2.4.3: useAuthStore normaliza role "  staff  " com espaços para position "Staff"', () => {
        const token = createMockJwt({
          roles: '  staff  ',
          exp: Math.floor(Date.now() / 1000) + 3600,
        });
        useAuthStore.getState().setAccessToken(token);
        expect(useAuthStore.getState().position).toBe('Staff');
      });

      it('T2.4.4: useAuthStore normaliza role "aDmIn" misto para position "Admin"', () => {
        const token = createMockJwt({
          roles: ['aDmIn'],
          exp: Math.floor(Date.now() / 1000) + 3600,
        });
        useAuthStore.getState().setAccessToken(token);
        expect(useAuthStore.getState().position).toBe('Admin');
      });

      it('T2.4.5: role "APOIADOR" normaliza para position "Apoiador" e falha no canAccessAdmin', () => {
        const token = createMockJwt({
          roles: 'APOIADOR',
          exp: Math.floor(Date.now() / 1000) + 3600,
        });
        useAuthStore.getState().setAccessToken(token);
        expect(useAuthStore.getState().position).toBe('Apoiador');
        expect(
          canAccessAdmin('usuario', useAuthStore.getState().position),
        ).toBe(false);
      });
    });

    describe('Feature 2.5: Null & Undefined Boundary Values', () => {
      it('T2.5.1: canAccessAdmin(null, "Admin") retorna false', () => {
        expect(canAccessAdmin(null, 'Admin')).toBe(false);
      });

      it('T2.5.2: canAccessAdmin("admin", null) retorna false', () => {
        expect(canAccessAdmin('admin', null)).toBe(false);
      });

      it('T2.5.3: canAccessAdmin(undefined as any, "Admin") retorna false', () => {
        expect(canAccessAdmin(undefined as unknown as string, 'Admin')).toBe(
          false,
        );
      });

      it('T2.5.4: canAccessAdmin("admin", undefined as any) retorna false', () => {
        expect(canAccessAdmin('admin', undefined as unknown as string)).toBe(
          false,
        );
      });

      it('T2.5.5: setAccessToken(null) limpa toda a identidade na store e leva a redirecionamento', async () => {
        setupHydratedAdmin('admin');
        expect(useAuthStore.getState().username).toBe('admin');

        useAuthStore.getState().setAccessToken(null);

        render(
          <AdminGuard>
            <div>Protegido</div>
          </AdminGuard>,
        );

        await waitFor(() => {
          expect(replaceMock).toHaveBeenCalledWith('/');
        });
      });
    });

    describe('Feature 2.6: Empty Positions & Boundary States', () => {
      it('T2.6.1: canAccessAdmin("admin", "") com posição vazia retorna false', () => {
        expect(canAccessAdmin('admin', '')).toBe(false);
      });

      it('T2.6.2: canAccessAdmin("", "Admin") com username vazio retorna false', () => {
        expect(canAccessAdmin('', 'Admin')).toBe(false);
      });

      it('T2.6.3: canAccessAdmin("admin", "   ") com posição em espaços em branco retorna false', () => {
        expect(canAccessAdmin('admin', '   ')).toBe(false);
      });

      it('T2.6.4: store logout() redefine username para null, hasHydrated para true e position para null', () => {
        setupHydratedAdmin('admin');
        useAuthStore.getState().logout();

        const state = useAuthStore.getState();
        expect(state.username).toBeNull();
        expect(state.accessToken).toBeNull();
        expect(state.position).toBeNull();
        expect(state.isAdmin).toBe(false);
        expect(state.hasHydrated).toBe(true);
      });

      it('T2.6.5: invocar logout() após renderizar AdminGuard dispara redirecionamento e desmonta filhos', async () => {
        setupHydratedAdmin('admin');

        const { rerender } = render(
          <AdminGuard>
            <div data-testid="live-content">Sessão Ativa</div>
          </AdminGuard>,
        );

        expect(screen.getByTestId('live-content')).toBeInTheDocument();

        act(() => {
          useAuthStore.getState().logout();
        });

        rerender(
          <AdminGuard>
            <div data-testid="live-content">Sessão Ativa</div>
          </AdminGuard>,
        );

        await waitFor(() => {
          expect(replaceMock).toHaveBeenCalledWith('/');
        });
        expect(screen.queryByTestId('live-content')).not.toBeInTheDocument();
      });
    });

    describe('Feature 2.7: Spinner & Hydration Edge Transitions', () => {
      it('T2.7.1: renderiza spinner com classes exatas de animação e cores', () => {
        setupUnhydratedState();

        const { container } = render(
          <AdminGuard>
            <div>Filho</div>
          </AdminGuard>,
        );

        const spinner = container.querySelector('.animate-spin');
        expect(spinner).toBeInTheDocument();
        expect(spinner).toHaveClass(
          'h-8',
          'w-8',
          'animate-spin',
          'rounded-full',
          'border-4',
          'border-appMenuBorder',
          'border-t-appHeaderHighlight',
        );
      });

      it('T2.7.2: spinner está contido em container centralizado de tela cheia', () => {
        setupUnhydratedState();

        const { container } = render(
          <AdminGuard>
            <div>Filho</div>
          </AdminGuard>,
        );

        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper).toHaveClass(
          'flex',
          'h-screen',
          'w-full',
          'items-center',
          'justify-center',
          'bg-appBackground',
        );
      });

      it('T2.7.3: renderiza spinner quando hasHydrated é false e isPending é true simultaneamente', () => {
        useAuthStore.setState({
          hasHydrated: false,
          isPending: true,
        });

        const { container } = render(
          <AdminGuard>
            <div>Filho</div>
          </AdminGuard>,
        );

        expect(container.querySelector('.animate-spin')).toBeInTheDocument();
        expect(replaceMock).not.toHaveBeenCalled();
      });

      it('T2.7.4: não renderiza spinner quando hasHydrated é true e isPending é false para usuário não autorizado', () => {
        setupAuthState({
          hasHydrated: true,
          isPending: false,
          username: null,
          position: null,
        });

        const { container } = render(
          <AdminGuard>
            <div>Filho</div>
          </AdminGuard>,
        );

        expect(
          container.querySelector('.animate-spin'),
        ).not.toBeInTheDocument();
        expect(container).toBeEmptyDOMElement();
      });

      it('T2.7.5: remove spinner e exibe filhos assim que a hidratação completa com sucesso', () => {
        setupUnhydratedState();

        const { container, rerender } = render(
          <AdminGuard>
            <div data-testid="delayed-content">Conteúdo Pós Hidratação</div>
          </AdminGuard>,
        );

        expect(container.querySelector('.animate-spin')).toBeInTheDocument();
        expect(screen.queryByTestId('delayed-content')).not.toBeInTheDocument();

        act(() => {
          setupHydratedAdmin('admin');
        });

        rerender(
          <AdminGuard>
            <div data-testid="delayed-content">Conteúdo Pós Hidratação</div>
          </AdminGuard>,
        );

        expect(
          container.querySelector('.animate-spin'),
        ).not.toBeInTheDocument();
        expect(screen.getByTestId('delayed-content')).toBeInTheDocument();
      });
    });
  });

  // =========================================================================
  // TIER 3: Cross-Feature Combinations & State Transitions
  // =========================================================================
  describe('Tier 3: Cross-Feature Combinations', () => {
    it('T3.1: Transição de hidratação: pendente -> admin hidratado monta filhos sem redirect', async () => {
      setupPendingState();

      const { rerender } = render(
        <AdminGuard>
          <div data-testid="target-child">Alvo</div>
        </AdminGuard>,
      );

      expect(screen.queryByTestId('target-child')).not.toBeInTheDocument();
      expect(replaceMock).not.toHaveBeenCalled();

      act(() => {
        setupHydratedAdmin('admin_promovido');
      });

      rerender(
        <AdminGuard>
          <div data-testid="target-child">Alvo</div>
        </AdminGuard>,
      );

      expect(screen.getByTestId('target-child')).toBeInTheDocument();
      expect(replaceMock).not.toHaveBeenCalled();
    });

    it('T3.2: Transição de hidratação: pendente -> visitante não autenticado dispara redirect e limpa DOM', async () => {
      setupPendingState();

      const { container, rerender } = render(
        <AdminGuard>
          <div data-testid="target-child">Alvo</div>
        </AdminGuard>,
      );

      expect(replaceMock).not.toHaveBeenCalled();

      act(() => {
        setupAuthState({
          hasHydrated: true,
          isPending: false,
          username: null,
          position: null,
        });
      });

      rerender(
        <AdminGuard>
          <div data-testid="target-child">Alvo</div>
        </AdminGuard>,
      );

      await waitFor(() => {
        expect(replaceMock).toHaveBeenCalledWith('/');
      });
      expect(screen.queryByTestId('target-child')).not.toBeInTheDocument();
      expect(container).toBeEmptyDOMElement();
    });

    it('T3.3: Demissão de cargo em tempo real: Admin demovido para Leitor desmonta imediatamente a tela', async () => {
      setupHydratedAdmin('usuario_rebaixado');

      const { rerender } = render(
        <AdminGuard>
          <div data-testid="protected-admin">Painel de Controle</div>
        </AdminGuard>,
      );

      expect(screen.getByTestId('protected-admin')).toBeInTheDocument();

      act(() => {
        setupHydratedReader('usuario_rebaixado');
      });

      rerender(
        <AdminGuard>
          <div data-testid="protected-admin">Painel de Controle</div>
        </AdminGuard>,
      );

      await waitFor(() => {
        expect(replaceMock).toHaveBeenCalledWith('/');
      });
      expect(screen.queryByTestId('protected-admin')).not.toBeInTheDocument();
    });

    it('T3.4: Alternância de rotas e múltiplos filhos React são preservados com integridade', () => {
      setupHydratedStaff('staff_multichildren');

      render(
        <AdminGuard>
          <header data-testid="header-node">Header Admin</header>
          <main data-testid="main-node">Main Admin</main>
          <footer data-testid="footer-node">Footer Admin</footer>
        </AdminGuard>,
      );

      expect(screen.getByTestId('header-node')).toBeInTheDocument();
      expect(screen.getByTestId('main-node')).toBeInTheDocument();
      expect(screen.getByTestId('footer-node')).toBeInTheDocument();
      expect(replaceMock).not.toHaveBeenCalled();
    });

    it('T3.5: Preserva consistência quando router.replace é invocado repetidas vezes sem loops', async () => {
      setupAuthState({
        hasHydrated: true,
        isPending: false,
        username: 'leitor',
        position: 'Leitor',
      });

      const { rerender } = render(
        <AdminGuard>
          <div>Conteúdo</div>
        </AdminGuard>,
      );

      await waitFor(() => {
        expect(replaceMock).toHaveBeenCalledTimes(1);
      });

      rerender(
        <AdminGuard>
          <div>Conteúdo</div>
        </AdminGuard>,
      );

      // Não deve chamar novamente se o estado não se alterou
      expect(replaceMock).toHaveBeenCalledTimes(1);
    });
  });
});

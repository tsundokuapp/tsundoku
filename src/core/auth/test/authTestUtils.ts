import { useAuthStore } from '@/core/auth/stores/useAuthStore';

export type PositionPossible = 'Admin' | 'Staff' | 'Apoiador' | 'Leitor';

export const SEED_ADMIN_CREDENTIALS = {
  usuario: 'admin',
  senha: '!@SenhaDaTsunParaTrocarDepois123',
  email: 'tsundokutraducoes@gmail.com',
} as const;

/**
 * Creates a compliant Base64Url-encoded mock JWT token.
 */
export function createMockJwt(payload: Record<string, unknown>): string {
  const encode = (value: Record<string, unknown>) =>
    Buffer.from(JSON.stringify(value))
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

  const header = { alg: 'HS256', typ: 'JWT' };
  return `${encode(header)}.${encode(payload)}.signature`;
}

/**
 * Pre-configured token factories
 */
export function createAdminToken(overrides?: Record<string, unknown>): string {
  return createMockJwt({
    sub: 'admin-uuid-1',
    roles: 'admin',
    username: 'admin',
    exp: Math.floor(Date.now() / 1000) + 3600,
    ...overrides,
  });
}

export function createStaffToken(overrides?: Record<string, unknown>): string {
  return createMockJwt({
    sub: 'staff-uuid-2',
    roles: 'staff',
    username: 'staff_user',
    exp: Math.floor(Date.now() / 1000) + 3600,
    ...overrides,
  });
}

export function createReaderToken(overrides?: Record<string, unknown>): string {
  return createMockJwt({
    sub: 'reader-uuid-3',
    roles: 'leitor',
    username: 'reader_user',
    exp: Math.floor(Date.now() / 1000) + 3600,
    ...overrides,
  });
}

export function createApoiadorToken(
  overrides?: Record<string, unknown>,
): string {
  return createMockJwt({
    sub: 'apoiador-uuid-4',
    roles: 'apoiador',
    username: 'apoiador_user',
    exp: Math.floor(Date.now() / 1000) + 3600,
    ...overrides,
  });
}

export function createExpiredToken(
  roles: string | string[] = 'admin',
  overrides?: Record<string, unknown>,
): string {
  return createMockJwt({
    sub: 'expired-uuid-5',
    roles,
    username: 'expired_user',
    exp: Math.floor(Date.now() / 1000) - 3600, // 1 hour ago
    ...overrides,
  });
}

export function createTokenWithoutExp(
  roles: string | string[] = 'admin',
  overrides?: Record<string, unknown>,
): string {
  return createMockJwt({
    sub: 'no-exp-uuid-6',
    roles,
    username: 'no_exp_user',
    ...overrides,
  });
}

/**
 * Zustand Auth Store test helpers
 */
export const DEFAULT_AUTH_STORE_STATE = {
  username: null,
  accessToken: null,
  tsunId: null,
  position: 'Leitor' as PositionPossible,
  roles: null,
  isAdmin: false,
  isPending: false,
  hasHydrated: false,
};

export function resetAuthStore(): void {
  useAuthStore.setState({
    ...DEFAULT_AUTH_STORE_STATE,
  });
}

export function setupAuthState(
  partialState: Partial<ReturnType<typeof useAuthStore.getState>>,
): void {
  useAuthStore.setState({
    ...DEFAULT_AUTH_STORE_STATE,
    ...partialState,
  });
}

export function setupHydratedAdmin(username = 'admin'): void {
  useAuthStore.setState({
    username,
    accessToken: createAdminToken({ username }),
    tsunId: 'tsun-admin-1',
    position: 'Admin',
    roles: ['admin'],
    isAdmin: true,
    isPending: false,
    hasHydrated: true,
  });
}

export function setupHydratedStaff(username = 'staff_user'): void {
  useAuthStore.setState({
    username,
    accessToken: createStaffToken({ username }),
    tsunId: 'tsun-staff-2',
    position: 'Staff',
    roles: ['staff'],
    isAdmin: false,
    isPending: false,
    hasHydrated: true,
  });
}

export function setupHydratedReader(username = 'reader_user'): void {
  useAuthStore.setState({
    username,
    accessToken: createReaderToken({ username }),
    tsunId: 'tsun-reader-3',
    position: 'Leitor',
    roles: ['leitor'],
    isAdmin: false,
    isPending: false,
    hasHydrated: true,
  });
}

export function setupHydratedApoiador(username = 'apoiador_user'): void {
  useAuthStore.setState({
    username,
    accessToken: createApoiadorToken({ username }),
    tsunId: 'tsun-apoiador-4',
    position: 'Apoiador',
    roles: ['apoiador'],
    isAdmin: false,
    isPending: false,
    hasHydrated: true,
  });
}

export function setupUnhydratedState(): void {
  useAuthStore.setState({
    ...DEFAULT_AUTH_STORE_STATE,
    hasHydrated: false,
    isPending: false,
  });
}

export function setupPendingState(): void {
  useAuthStore.setState({
    ...DEFAULT_AUTH_STORE_STATE,
    hasHydrated: true,
    isPending: true,
  });
}

/**
 * Standard Next.js Router Mock Factory
 */
export interface MockRouter {
  replace: jest.Mock;
  push: jest.Mock;
  prefetch: jest.Mock;
  back: jest.Mock;
  forward: jest.Mock;
  refresh: jest.Mock;
}

export function createMockRouter(): MockRouter {
  return {
    replace: jest.fn(),
    push: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  };
}

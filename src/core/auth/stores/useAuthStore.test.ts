import { useAuthStore } from './useAuthStore';

function createTestJwt(payload: Record<string, unknown>): string {
  const encode = (value: Record<string, unknown>) =>
    Buffer.from(JSON.stringify(value))
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

  return `${encode({ alg: 'HS256', typ: 'JWT' })}.${encode(payload)}.signature`;
}

describe('useAuthStore', () => {
  beforeEach(() => {
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

  it('normaliza claim roles escalar ("admin") enviada pelo Torii', () => {
    const token = createTestJwt({
      sub: 'admin-id',
      roles: 'admin',
      exp: Math.floor(Date.now() / 1000) + 3600,
    });

    useAuthStore.getState().setAccessToken(token);

    expect(useAuthStore.getState()).toMatchObject({
      accessToken: token,
      roles: ['admin'],
      isAdmin: true,
      position: 'Admin',
    });
  });

  it('aceita claim roles em array (["staff"]) para perfil Staff', () => {
    const token = createTestJwt({
      sub: 'staff-id',
      roles: ['staff'],
      exp: Math.floor(Date.now() / 1000) + 3600,
    });

    useAuthStore.getState().setAccessToken(token);

    expect(useAuthStore.getState()).toMatchObject({
      accessToken: token,
      roles: ['staff'],
      isAdmin: false,
      position: 'Staff',
    });
  });

  it('limpa a identidade quando o token é removido', () => {
    useAuthStore.setState({
      username: 'usuario-teste',
      accessToken: 'token-antigo',
      tsunId: 'tsun-123',
      position: 'Admin',
      roles: ['Admin'],
      isAdmin: true,
    });

    useAuthStore.getState().setAccessToken(null);

    expect(useAuthStore.getState()).toMatchObject({
      username: null,
      accessToken: null,
      tsunId: null,
      position: null,
      roles: null,
      isAdmin: false,
    });
  });
});

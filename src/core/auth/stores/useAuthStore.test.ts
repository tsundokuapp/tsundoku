import { useAuthStore } from './useAuthStore';

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
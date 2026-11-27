import { act, renderHook, waitFor } from '@testing-library/react';
import { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';

import { authRefresh } from '@/core/api';

import { useAuthHydration } from './useAuthHydration';
import { useAuthStore } from '../stores/useAuthStore';

// refreshToken.ts usa o cliente `authRefresh` (sem interceptors de retry).
jest.mock('@/core/api', () => ({
  authRefresh: {
    get: jest.fn(),
  },
}));

jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn(),
}));

describe('useAuthHydration', () => {
  const refreshGetMock = authRefresh.get as jest.MockedFunction<
    typeof authRefresh.get
  >;
  const jwtDecodeMock = jwtDecode as jest.MockedFunction<typeof jwtDecode>;

  beforeEach(() => {
    refreshGetMock.mockReset();
    jwtDecodeMock.mockReset();
    jwtDecodeMock.mockReturnValue({
      exp: Math.floor(Date.now() / 1000) + 3600,
    });

    useAuthStore.setState({
      username: null,
      accessToken: null,
      tsunId: null,
      position: 'Leitor',
      roles: null,
      isAdmin: false,
      isPending: false,
      hasHydrated: false,
    });
  });

  it('não tenta renovar a sessão novamente depois de detectar um token válido', () => {
    useAuthStore.setState({
      accessToken: 'token-valido',
      username: 'usuario-teste',
      tsunId: 'tsun-123',
    });

    renderHook(() => useAuthHydration());

    expect(refreshGetMock).not.toHaveBeenCalled();

    act(() => {
      useAuthStore.getState().setAccessToken(null);
    });

    expect(refreshGetMock).not.toHaveBeenCalled();
  });

  it('sai do carregamento como visitante quando o Torii responde 401 sem cookie', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(jest.fn());
    refreshGetMock.mockRejectedValueOnce(
      new AxiosError('Unauthorized', '401', undefined, undefined, {
        status: 401,
        statusText: 'Unauthorized',
        data: {},
        headers: {},
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        config: {} as any,
      }),
    );

    renderHook(() => useAuthHydration());

    await waitFor(() => {
      expect(useAuthStore.getState().hasHydrated).toBe(true);
    });

    expect(useAuthStore.getState().isPending).toBe(false);
    expect(useAuthStore.getState().accessToken).toBeNull();
    expect(refreshGetMock).toHaveBeenCalledTimes(1);
    consoleSpy.mockRestore();
  });

  it('hidrata usuário e token quando a renovação é bem-sucedida', async () => {
    refreshGetMock.mockResolvedValueOnce({
      data: {
        accessToken: 'token-renovado',
        usuario: 'admin',
        tsunId: 'tsun-1',
      },
    });

    renderHook(() => useAuthHydration());

    await waitFor(() => {
      expect(useAuthStore.getState().hasHydrated).toBe(true);
    });

    const state = useAuthStore.getState();
    expect(state.isPending).toBe(false);
    expect(state.accessToken).toBe('token-renovado');
    expect(state.username).toBe('admin');
    expect(state.tsunId).toBe('tsun-1');
  });
});

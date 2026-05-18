import { act, renderHook } from '@testing-library/react';
import { jwtDecode } from 'jwt-decode';

import { auth } from '@/core/api';

import { useAuthStore } from '../stores/useAuthStore';
import { useAuthHydration } from './useAuthHydration';

jest.mock('@/core/api', () => ({
  auth: {
    get: jest.fn(),
  },
}));

jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn(),
}));

describe('useAuthHydration', () => {
  const authGetMock = auth.get as jest.MockedFunction<typeof auth.get>;
  const jwtDecodeMock = jwtDecode as jest.MockedFunction<typeof jwtDecode>;

  beforeEach(() => {
    authGetMock.mockReset();
    jwtDecodeMock.mockReset();

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

  it('não tenta renovar a sessão novamente depois de detectar um token válido', () => {
    jwtDecodeMock.mockReturnValue({
      exp: Math.floor(Date.now() / 1000) + 3600,
    });

    useAuthStore.setState({
      accessToken: 'token-valido',
      username: 'usuario-teste',
      tsunId: 'tsun-123',
    });

    renderHook(() => useAuthHydration());

    expect(authGetMock).not.toHaveBeenCalled();

    act(() => {
      useAuthStore.getState().setAccessToken(null);
    });

    expect(authGetMock).not.toHaveBeenCalled();
  });
});

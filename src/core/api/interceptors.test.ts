import {
  AxiosError,
  type AxiosAdapter,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { jwtDecode } from 'jwt-decode';

import { useAuthStore } from '@/core/auth/stores/useAuthStore';

import { apiPrivate, auth, authRefresh } from '.';
import { setupInterceptors } from './interceptors';
import { isRefreshTokenRequest } from './refreshToken';

jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn(),
}));

type Handler = (
  config: InternalAxiosRequestConfig,
) => Promise<AxiosResponse> | AxiosResponse;

const respond = (
  config: InternalAxiosRequestConfig,
  status: number,
  data: unknown = {},
): Promise<AxiosResponse> => {
  const response: AxiosResponse = {
    data,
    status,
    statusText: String(status),
    headers: {},
    config,
    request: {},
  };

  if (status >= 200 && status < 300) return Promise.resolve(response);

  return Promise.reject(
    new AxiosError(
      `Request failed with status code ${status}`,
      AxiosError.ERR_BAD_REQUEST,
      config,
      {},
      response,
    ),
  );
};

/** Rejeita se a promise não terminar: um deadlock vira falha, não timeout do Jest. */
const settleWithin = <T>(promise: Promise<T>, ms = 1000) =>
  Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(
        () => reject(new Error(`promise não concluiu em ${ms}ms`)),
        ms,
      ),
    ),
  ]);

describe('setupInterceptors + refreshAccessToken', () => {
  const refreshHandler = jest.fn<ReturnType<Handler>, Parameters<Handler>>();
  const apiHandler = jest.fn<ReturnType<Handler>, Parameters<Handler>>();

  beforeAll(() => {
    (jwtDecode as jest.Mock).mockReturnValue({
      exp: Math.floor(Date.now() / 1000) + 3600,
      roles: ['admin'],
    });

    authRefresh.defaults.adapter = ((config) =>
      refreshHandler(config)) as AxiosAdapter;
    apiPrivate.defaults.adapter = ((config) =>
      apiHandler(config)) as AxiosAdapter;
    // `auth` simula uma chamada direta a refresh-token feita pelo cliente com
    // interceptors (o cenário que antes ficava preso na própria fila).
    auth.defaults.adapter = ((config) => apiHandler(config)) as AxiosAdapter;

    setupInterceptors();
  });

  beforeEach(() => {
    refreshHandler.mockReset();
    apiHandler.mockReset();
    useAuthStore.getState().setAccessToken('token-expirado-no-servidor');
  });

  it('encerra a tentativa quando o refresh retorna 401 e rejeita a requisição protegida', async () => {
    apiHandler.mockImplementation((config) => respond(config, 401));
    refreshHandler.mockImplementation((config) => respond(config, 401));

    await expect(
      settleWithin(apiPrivate.get('admin/protegido')),
    ).rejects.toMatchObject({ response: { status: 401 } });

    expect(refreshHandler).toHaveBeenCalledTimes(1);
    expect(apiHandler).toHaveBeenCalledTimes(1);
    expect(useAuthStore.getState().accessToken).toBeNull();
  });

  it('libera todas as requisições em espera quando o refresh falha com 401', async () => {
    apiHandler.mockImplementation((config) => respond(config, 401));
    refreshHandler.mockImplementation(
      (config) =>
        new Promise((resolve, reject) =>
          setTimeout(() => respond(config, 401).then(resolve, reject), 20),
        ),
    );

    const results = await settleWithin(
      Promise.allSettled([
        apiPrivate.get('admin/usuarios'),
        apiPrivate.get('admin/roles'),
        apiPrivate.get('admin/permissoes'),
      ]),
    );

    expect(results.map((r) => r.status)).toEqual([
      'rejected',
      'rejected',
      'rejected',
    ]);
    // Uma única renovação compartilhada entre as requisições concorrentes.
    expect(refreshHandler).toHaveBeenCalledTimes(1);
  });

  it('não reentra no retry quando refresh-token é chamado por um cliente com interceptors', async () => {
    apiHandler.mockImplementation((config) => respond(config, 401));

    await expect(settleWithin(auth.get('refresh-token'))).rejects.toMatchObject(
      { response: { status: 401 } },
    );

    expect(refreshHandler).not.toHaveBeenCalled();
  });

  it('renova o token e repete as requisições protegidas com o novo Bearer', async () => {
    apiHandler.mockImplementation((config) => {
      const header = String(config.headers?.Authorization ?? '');
      return header === 'Bearer token-novo'
        ? respond(config, 200, { ok: config.url })
        : respond(config, 401);
    });
    refreshHandler.mockImplementation(
      (config) =>
        new Promise((resolve, reject) =>
          setTimeout(
            () =>
              respond(config, 200, {
                accessToken: 'token-novo',
                usuario: 'admin',
              }).then(resolve, reject),
            20,
          ),
        ),
    );

    const [a, b] = await settleWithin(
      Promise.all([apiPrivate.get('admin/a'), apiPrivate.get('admin/b')]),
    );

    expect(a.data).toEqual({ ok: 'admin/a' });
    expect(b.data).toEqual({ ok: 'admin/b' });
    expect(refreshHandler).toHaveBeenCalledTimes(1);
    expect(refreshHandler.mock.calls[0][0].headers?.Authorization).toBe(
      undefined,
    );
    expect(useAuthStore.getState().accessToken).toBe('token-novo');
  });

  it('não repete a requisição mais de uma vez se o novo token também for recusado', async () => {
    apiHandler.mockImplementation((config) => respond(config, 401));
    refreshHandler.mockImplementation((config) =>
      respond(config, 200, { accessToken: 'token-novo' }),
    );

    await expect(
      settleWithin(apiPrivate.get('admin/protegido')),
    ).rejects.toMatchObject({ response: { status: 401 } });

    expect(apiHandler).toHaveBeenCalledTimes(2);
    expect(refreshHandler).toHaveBeenCalledTimes(1);
  });
});

describe('isRefreshTokenRequest', () => {
  it.each([
    ['refresh-token', true],
    ['/refresh-token', true],
    ['api/refresh-token/', true],
    ['refresh-token?x=1', true],
    ['admin/usuarios', false],
    ['my-refresh-token-history', false],
    [undefined, false],
  ])('%s → %s', (url, expected) => {
    expect(isRefreshTokenRequest(url)).toBe(expected);
  });
});

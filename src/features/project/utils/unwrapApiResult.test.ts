import { unwrapApiArrayResult } from './unwrapApiResult';

describe('unwrapApiArrayResult', () => {
  it('retorna lista diretamente quando payload já é array', () => {
    const result = unwrapApiArrayResult([{ id: 1 }, { id: 2 }]);
    expect(result).toEqual({
      items: [{ id: 1 }, { id: 2 }],
      isApiPayloadError: false,
    });
  });

  it('desembrulha envelope { ok: true, data: [...] }', () => {
    const result = unwrapApiArrayResult({ ok: true, data: ['a', 'b'] });
    expect(result).toEqual({ items: ['a', 'b'], isApiPayloadError: false });
  });

  it('trata HTTP 204 No Content ({ ok: true, data: undefined | null | "" }) como lista vazia sem erro', () => {
    expect(
      unwrapApiArrayResult({ ok: true, data: undefined as unknown as [] }),
    ).toEqual({ items: [], isApiPayloadError: false });
    expect(
      unwrapApiArrayResult({ ok: true, data: null as unknown as [] }),
    ).toEqual({ items: [], isApiPayloadError: false });
    expect(
      unwrapApiArrayResult({ ok: true, data: '' as unknown as [] }),
    ).toEqual({ items: [], isApiPayloadError: false });
  });

  it('sinaliza isApiPayloadError quando payload é { ok: false, error }', () => {
    const result = unwrapApiArrayResult({
      ok: false,
      error: { message: 'Falha na API' },
    });
    expect(result).toEqual({ items: [], isApiPayloadError: true });
  });
});

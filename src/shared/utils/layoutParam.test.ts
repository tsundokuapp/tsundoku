import { withV21LayoutParam } from './layoutParam';

describe('withV21LayoutParam', () => {
  it('adiciona layout=v2.1 em rotas internas quando layoutParam é v2.1', () => {
    expect(withV21LayoutParam('/', 'v2.1')).toBe('/?layout=v2.1');
    expect(withV21LayoutParam('/novels', 'v2.1')).toBe('/novels?layout=v2.1');
    expect(withV21LayoutParam('/novels?origem=japonesas', 'v2.1')).toBe(
      '/novels?origem=japonesas&layout=v2.1',
    );
    expect(withV21LayoutParam('/novels/bruxa-errante#capitulos', 'v2.1')).toBe(
      '/novels/bruxa-errante?layout=v2.1#capitulos',
    );
  });

  it('não duplica o parâmetro quando layout=v2.1 já está presente', () => {
    expect(withV21LayoutParam('/novels?layout=v2.1', 'v2.1')).toBe(
      '/novels?layout=v2.1',
    );
  });

  it('mantém a URL original quando não está na prévia v2.1 ou quando o link é externo', () => {
    expect(withV21LayoutParam('/', null)).toBe('/');
    expect(withV21LayoutParam('/novels', undefined)).toBe('/novels');
    expect(withV21LayoutParam('/novels', 'v2.2')).toBe('/novels');
    expect(withV21LayoutParam('https://tsundoku.com.br/discord', 'v2.1')).toBe(
      'https://tsundoku.com.br/discord',
    );
    expect(withV21LayoutParam('//cdn.example.com/a', 'v2.1')).toBe(
      '//cdn.example.com/a',
    );
  });
});

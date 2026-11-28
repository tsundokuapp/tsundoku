import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { LINK_DISCORD } from '@/shared/utils/systemValues';

import { BannerSupport } from './BannerSupport';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt }: { alt: string }) => <span role="img" aria-label={alt} />,
}));

describe('<BannerSupport />', () => {
  it('Deve direcionar para a comunidade oficial do Discord', () => {
    render(<BannerSupport />);

    const link = screen.getByRole('link', {
      name: /Discord/i,
    });

    const href = link.getAttribute('href');

    expect(href).toBe(LINK_DISCORD);

    expect(() => new URL(href!)).not.toThrow();

    const url = new URL(href!);

    expect(url.protocol).toBe('https:');
    expect(url.hostname).toBe('tsundoku.com.br');
    expect(url.pathname).toBe('/discord');
  });

  it('Não deve exibir informações de apoio não confirmadas', () => {
    render(<BannerSupport />);

    expect(screen.queryByText(/padrim/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/pix/i)).not.toBeInTheDocument();

    expect(
      screen.queryByText(/tsundokutraducoes@gmail\.com/i),
    ).not.toBeInTheDocument();
  });
});

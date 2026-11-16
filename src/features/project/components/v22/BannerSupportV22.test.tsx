import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { LINK_DISCORD } from '@/shared/utils/systemValues';

import { BannerSupportV22 } from './BannerSupportV22';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ alt }: { alt: string }) => <span role="img" aria-label={alt} />,
}));

describe('<BannerSupportV22 />', () => {
  it('alinha texto e destino ao Discord oficial sem instruções não confirmadas de Padrim ou PIX', () => {
    render(<BannerSupportV22 />);

    const link = screen.getByRole('link', {
      name: /Discord/i,
    });
    expect(link).toHaveAttribute('href', LINK_DISCORD);
    expect(
      screen.getByText(/Acessar comunidade no Discord/i),
    ).toBeInTheDocument();

    expect(screen.queryByText(/padrim/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/pix/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/tsundokutraducoes@gmail\.com/i),
    ).not.toBeInTheDocument();
  });
});

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { AuthCoverTile } from './AuthCoverTile';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ComponentProps<'img'>) => <img {...props} />,
}));

describe('AuthCoverTile', () => {
  it('exibe fallback quando a imagem falha ao carregar', () => {
    render(<AuthCoverTile src="/imagem-inexistente.jpg" alt="Capa teste" />);

    fireEvent.error(screen.getByAltText('Capa teste'));

    expect(screen.getByLabelText('Capa teste')).toBeInTheDocument();
    expect(screen.getByText('Imagem indisponível')).toBeInTheDocument();
  });
});

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { LogoLink } from './LogoLink';

describe('Testes para o componente <LogoLink />', () => {
  describe('Testes de renderização', () => {
    it('Deve renderizar LogoLink corretamente', () => {
      // Given
      render(<LogoLink />);

      // When
      const logo = screen.getByRole('link');

      // Then
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveTextContent('Tsundoku');
    });

    it('Deve renderizar LogoLink com classe customizada', () => {
      // Given
      render(<LogoLink className="custom-class" />);

      // When
      const logo = screen.getByRole('link');

      // Then
      expect(logo).toHaveClass('custom-class');
    });
  });
});

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { Banner } from './Banner';

describe('Testes para o componente <Banner />', () => {
  describe('Testes de renderização', () => {
    it('Deve renderizar Banner corretamente', () => {
      // Given
      render(<Banner image="/recrutamento-editor.png" link="/example" />);

      // When
      const link = screen.getByRole('link');
      const image = screen.getByAltText('Recrutamento de editores');

      // Then
      expect(link).toHaveAttribute('href', '/example');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute(
        'src',
        expect.stringMatching(
          /\/_next\/image\?url=.*%2Frecrutamento-editor\.png/,
        ),
      );
    });

    it('Deve renderizar o conteúdo fornecido', () => {
      // Given
      render(
        <Banner image="/recrutamento-editor.png" link="/example">
          <p>Conteúdo personalizado</p>
        </Banner>,
      );

      // Then
      expect(screen.getByText('Conteúdo personalizado')).toBeInTheDocument();
    });

    it('Deve aplicar classes adicionais passadas via prop className', () => {
      // Given
      render(
        <Banner image="/recrutamento-editor.png" className="bg-red-500" />,
      );

      // When
      const banner = screen.getByRole('link').firstChild;

      // Then
      expect(banner).toHaveClass('bg-red-500');
    });
  });

  describe('Testes de interação e comportamento', () => {
    it('Deve usar "#" como link padrão se o link não for fornecido', () => {
      // Given
      render(<Banner image="/recrutamento-editor.png" />);

      // When
      const link = screen.getByRole('link');

      // Then
      expect(link).toHaveAttribute('href', '#');
    });

    it('Deve redirecionar para o link correto ao clicar', async () => {
      // Given
      render(<Banner image="/recrutamento-editor.png" link="/redirect" />);

      // When
      const link = screen.getByRole('link');
      await fireEvent.click(link);

      // Then
      expect(link).toHaveAttribute('href', '/redirect');
    });
  });

  describe('Teste de snapshot', () => {
    it('Deve manter o snapshot do Banner', () => {
      // Given
      const { container } = render(
        <Banner image="/recrutamento-editor.png" link="/example" />,
      );

      // Then
      expect(container).toMatchSnapshot();
    });
  });
});

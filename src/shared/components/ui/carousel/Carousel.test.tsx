import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { Carousel } from './Carousel';

describe('Testes para o componente <Carousel />', () => {
  describe('Testes de renderização', () => {
    it('Deve renderizar Carousel corretamente', () => {
      // Given
      render(
        <Carousel images={['/img1.jpg', '/img2.jpg']} autoSlide={false} />,
      );

      // When
      const firstImage = screen.getByAltText('Slide 0');

      // Then
      expect(firstImage).toBeInTheDocument();
    });

    it('Deve exibir a primeira imagem ao iniciar', () => {
      // Given
      render(
        <Carousel images={['/img1.jpg', '/img2.jpg']} autoSlide={false} />,
      );

      // When
      const firstImage = screen.getByAltText('Slide 0');

      // Then
      expect(firstImage).toHaveAttribute(
        'src',
        expect.stringMatching(/\/_next\/image\?url=%2Fimg1.jpg&/),
      );
    });

    it('Deve renderizar os botões quando a prop "navigation" for true', async () => {
      // Given
      render(
        <Carousel
          images={['/img1.jpg', '/img2.jpg']}
          autoSlide={false}
          navigation
        />,
      );

      // When
      const nextButton = screen.getByTestId('next-button');
      const prevButton = screen.getByTestId('previous-button');

      // Then
      expect(nextButton).toBeInTheDocument();
      expect(prevButton).toBeInTheDocument();
    });

    it('Não deve quebrar se a lista de imagens estiver vazia', () => {
      // Given
      render(<Carousel images={[]} />);

      // Then
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });
  });

  describe('Testes de interação e comportamento', () => {
    jest.useFakeTimers();

    it('Deve avançar para a próxima imagem ao clicar no botão "próximo"', async () => {
      // Given
      render(
        <Carousel
          images={['/img1.jpg', '/img2.jpg']}
          autoSlide={false}
          navigation
        />,
      );

      // When
      const nextButton = screen.getByTestId('next-button');
      fireEvent.click(nextButton);

      // Then
      expect(screen.getByAltText('Slide 1')).toBeInTheDocument();
    });

    it('Deve voltar para a imagem anterior ao clicar no botão "anterior"', async () => {
      // Given
      render(
        <Carousel
          images={['/img1.jpg', '/img2.jpg']}
          autoSlide={false}
          navigation
        />,
      );

      // When
      const prevButton = screen.getByTestId('previous-button');
      fireEvent.click(prevButton);

      // Then
      expect(screen.getByAltText('Slide 1')).toBeInTheDocument(); // Última imagem, pois circula para trás
    });

    it('Deve avançar automaticamente se autoSlide for true', () => {
      // Given
      render(
        <Carousel
          images={['/img1.jpg', '/img2.jpg']}
          autoSlide={true}
          autoSlideInterval={3000}
        />,
      );

      // When
      jest.advanceTimersByTime(3000);

      // Then
      expect(screen.getByAltText('Slide 1')).toBeInTheDocument();
    });

    it('Não deve avançar automaticamente se autoSlide for false', () => {
      // Given
      render(
        <Carousel images={['/img1.jpg', '/img2.jpg']} autoSlide={false} />,
      );

      // When
      jest.advanceTimersByTime(3000);

      // Then
      expect(screen.getByAltText('Slide 0')).toBeInTheDocument();
    });
  });

  describe('Teste de snapshot', () => {
    it('Deve manter o snapshot do Carousel', () => {
      // Given
      const { container } = render(
        <Carousel images={['/img1.jpg', '/img2.jpg']} />,
      );

      // Then
      expect(container).toMatchSnapshot();
    });
  });
});

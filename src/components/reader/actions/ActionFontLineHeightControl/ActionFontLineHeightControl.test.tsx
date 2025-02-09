import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { ActionFontLineHeightControl } from './ActionFontLineHeightControl';

describe('Testes para o componente <ActionFontLineHeightControl />', () => {
  describe('Testes de renderização', () => {
    it('Deve renderizar corretamente', () => {
      // Given
      render(<ActionFontLineHeightControl onChange={jest.fn()} />);

      // When
      const component = screen.getByTestId('font-line-height-control');

      // Then
      expect(component).toBeInTheDocument();
    });

    it('Deve renderizar os botões de aumentar e diminuir espaçamento de linha', () => {
      // Given
      render(<ActionFontLineHeightControl onChange={jest.fn()} />);

      // When
      const buttonOne = screen.getByTestId('decrease-line-height');
      const buttonTwo = screen.getByTestId('increase-line-height');

      // Then
      expect(buttonOne).toBeInTheDocument();
      expect(buttonTwo).toBeInTheDocument();
    });
  });

  describe('Testes de interação e comportamento', () => {
    it('O botão de diminuir deve estar ativado inicialmente', () => {
      // Given
      render(<ActionFontLineHeightControl onChange={jest.fn()} />);

      // When
      const button = screen.getByTestId('decrease-line-height');

      // Then
      expect(button).not.toBeDisabled();
    });

    it('O botão de aumentar deve estar ativado inicialmente', () => {
      // Given
      render(<ActionFontLineHeightControl onChange={jest.fn()} />);

      // When
      const button = screen.getByTestId('increase-line-height');

      // Then
      expect(button).not.toBeDisabled();
    });

    it('Deve chamar onChange ao aumentar o espaçamento da linha', () => {
      const handleChange = jest.fn();

      // Given
      render(<ActionFontLineHeightControl onChange={handleChange} />);

      // When
      fireEvent.click(screen.getByTestId('increase-line-height'));

      // Then
      expect(handleChange).toHaveBeenCalledWith('leading-7'); // O próximo valor da lista
    });

    it('Deve chamar onChange ao diminuir o espaçamento da linha', () => {
      const handleChange = jest.fn();

      // Given
      render(<ActionFontLineHeightControl onChange={handleChange} />);

      // When
      fireEvent.click(screen.getByTestId('decrease-line-height'));

      // Then
      expect(handleChange).toHaveBeenCalledWith('leading-5'); // O valor anterior da lista
    });

    it('O botão de diminuir deve ser desativado ao atingir o menor valor', () => {
      // Given
      render(<ActionFontLineHeightControl onChange={jest.fn()} />);

      // When
      fireEvent.click(screen.getByTestId('decrease-line-height'));

      // Then
      expect(screen.getByTestId('decrease-line-height')).toBeDisabled();
    });

    it('O botão de aumentar deve ser desativado ao atingir o maior valor', () => {
      // Given
      render(<ActionFontLineHeightControl onChange={jest.fn()} />);

      // When
      for (let i = 0; i < 3; i++) {
        fireEvent.click(screen.getByTestId('increase-line-height'));
      }

      // Then
      expect(screen.getByTestId('increase-line-height')).toBeDisabled();
    });

    it('Deve atualizar o espaçamento corretamente ao aumentar e diminuir', () => {
      const handleChange = jest.fn();

      // Given
      render(<ActionFontLineHeightControl onChange={handleChange} />);

      // When and Then
      fireEvent.click(screen.getByTestId('increase-line-height'));
      expect(handleChange).toHaveBeenCalledWith('leading-7');

      fireEvent.click(screen.getByTestId('increase-line-height'));
      expect(handleChange).toHaveBeenCalledWith('leading-8');

      fireEvent.click(screen.getByTestId('decrease-line-height'));
      expect(handleChange).toHaveBeenCalledWith('leading-7');
    });
  });
});

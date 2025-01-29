import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { ActionButtonControl } from './ActionButtonControl';

describe('Testes para o componente <ActionButtonControl />', () => {
  describe('Testes de renderização', () => {
    it('Deve renderizar corretamente com o texto esperado', () => {
      // Given
      render(
        <ActionButtonControl onClick={jest.fn()} disable={false}>
          Clique aqui
        </ActionButtonControl>,
      );

      // Then
      expect(
        screen.getByRole('button', { name: /clique aqui/i }),
      ).toBeInTheDocument();
    });
  });

  describe('Testes de interação e comportamento', () => {
    it('Deve chamar a função onClick ao ser clicado', () => {
      const handleClick = jest.fn();

      // Given
      render(
        <ActionButtonControl onClick={handleClick} disable={false}>
          Clique aqui
        </ActionButtonControl>,
      );

      // When
      fireEvent.click(screen.getByRole('button', { name: /clique aqui/i }));

      // Then
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('Deve estar desativado quando a prop disable for true', () => {
      // Given
      render(
        <ActionButtonControl onClick={jest.fn()} disable={true}>
          Clique aqui
        </ActionButtonControl>,
      );

      // When
      const button = screen.getByRole('button', { name: /clique aqui/i });

      // Then
      expect(button).toBeDisabled();
    });

    it('Não deve chamar onClick quando desativado', () => {
      const handleClick = jest.fn();

      // Given
      render(
        <ActionButtonControl onClick={handleClick} disable={true}>
          Clique aqui
        </ActionButtonControl>,
      );

      // When
      fireEvent.click(screen.getByRole('button', { name: /clique aqui/i }));

      // Then
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Teste de snapshot', () => {
    it('Deve manter o snapshot do ActionButtonControl', () => {
      // Given
      const { container } = render(
        <ActionButtonControl onClick={jest.fn()} disable={false}>
          Clique aqui
        </ActionButtonControl>,
      );

      // Then
      expect(container).toMatchSnapshot();
    });
  });
});

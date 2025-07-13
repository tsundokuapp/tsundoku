import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { type UseFormRegister } from 'react-hook-form';

import { Checkbox } from './Checkbox';

describe('Testes para o componente <Checkbox />', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fakeRegister: UseFormRegister<any> = jest.fn();

  describe('Testes de renderização', () => {
    it('Deve renderizar Checkbox corretamente', () => {
      // Given
      render(
        <Checkbox
          label="Checkbox Teste"
          name="checkboxTeste"
          register={fakeRegister}
        />,
      );

      // When
      const checkbox = screen.getByRole('checkbox');

      // Then
      expect(checkbox).toBeInTheDocument();
    });

    it('Deve renderizar a label do Checkbox corretamente', () => {
      // Given
      render(
        <Checkbox
          label="Checkbox Teste"
          name="checkboxTeste"
          register={fakeRegister}
        />,
      );

      // When
      const label = screen.getByText('Checkbox Teste');

      // Then
      expect(label).toBeInTheDocument();
    });

    it('Deve renderizar o texto de apoio do Checkbox corretamente', () => {
      // Given
      render(
        <Checkbox
          label="Checkbox Teste"
          name="checkboxTeste"
          register={fakeRegister}
          description="Texto de apoio do Checkbox Teste"
        />,
      );

      // When
      const description = document.getElementById('helper-checkbox-text');

      // Then
      expect(description).toHaveTextContent('Texto de apoio do Checkbox Teste');
    });

    it('Deve renderizar a label e o texto de apoio do Checkbox simultaneamente', () => {
      // Given
      render(
        <Checkbox
          label="Checkbox Teste"
          name="checkboxTeste"
          register={fakeRegister}
          description="Texto de apoio do Checkbox Teste"
        />,
      );

      // When
      const label = screen.getByText('Checkbox Teste');
      const description = document.getElementById('helper-checkbox-text');

      // Then
      expect(label).toHaveTextContent('Checkbox Teste');
      expect(description).toHaveTextContent('Texto de apoio do Checkbox Teste');
    });

    it('Deve renderizar Checkbox com tamanhos diferentes baseado em props', () => {
      // Given
      render(
        <div>
          <Checkbox
            label="Checkbox Teste"
            name="checkboxTeste"
            register={fakeRegister}
            size="lg"
          />
          <Checkbox
            label="Checkbox Teste"
            name="checkboxTeste"
            register={fakeRegister}
            id="checkbox-default"
          />
        </div>,
      );

      // When
      const checkbox = document.getElementById('helper-checkbox');
      const checkboxDefault = document.getElementById('checkbox-default');

      // Then
      expect(checkbox).toHaveClass('h-6 w-6');
      expect(checkboxDefault).toHaveClass('h-4 w-4');
    });
  });

  describe('Testes de interação e comportamento', () => {
    it('Deve iniciar "não-checkado" por padrão', () => {
      // Given
      render(
        <Checkbox
          label="Checkbox Teste"
          name="checkboxTeste"
          register={fakeRegister}
        />,
      );

      // When
      const checkbox = screen.getByRole('checkbox');

      // Then
      expect(checkbox).not.toBeChecked();
    });

    it('Deve ficar "checkado" quando clicado', () => {
      // Given
      render(
        <Checkbox
          label="Checkbox Teste"
          name="checkboxTeste"
          register={fakeRegister}
        />,
      );

      // When
      fireEvent.click(screen.getByRole('checkbox'));
      const checkbox = screen.getByRole('checkbox');

      // Then
      expect(checkbox).toBeChecked();
    });

    it('Deve ficar "não-checkado" quando clicado duas vezes', () => {
      // Given
      render(
        <Checkbox
          label="Checkbox Teste"
          name="checkboxTeste"
          register={fakeRegister}
        />,
      );

      // When
      fireEvent.click(screen.getByRole('checkbox'));
      const checkboxCheckado = screen.getByRole('checkbox');
      expect(checkboxCheckado).toBeChecked();
      fireEvent.click(screen.getByRole('checkbox'));

      // Then
      expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('Deve tornar Checkbox inacessível quando desabilitado', () => {
      // Given
      render(
        <Checkbox
          label="Checkbox Teste"
          name="checkboxTeste"
          register={fakeRegister}
          disabled
        />,
      );

      // When
      const checkbox = screen.getByRole('checkbox');

      // Then
      expect(checkbox).toBeDisabled();
    });
  });

  describe('Testes de acessibilidade', () => {
    it('Deve ter o atributo role igual a checkbox', () => {
      // Given
      render(
        <Checkbox
          label="Checkbox Teste"
          name="checkboxTeste"
          register={fakeRegister}
        />,
      );

      // When
      const checkbox = screen.getByRole('checkbox');

      // Then
      expect(checkbox).toBeInTheDocument();
    });

    it('Deve ter o atributo tabindex igual a 0', () => {
      // Given
      render(
        <Checkbox
          label="Checkbox Teste"
          name="checkboxTeste"
          register={fakeRegister}
        />,
      );

      // When
      const checkbox = screen.getByRole('checkbox');

      // Then
      expect(checkbox).toHaveAttribute('tabindex', '0');
    });

    it('Dever ser possível focar no checkbox', () => {
      // Given
      render(
        <Checkbox
          label="Checkbox Teste"
          name="checkboxTeste"
          register={fakeRegister}
          aria-label="Checkbox de teste"
        />,
      );

      // When
      const checkbox = screen.getByRole('checkbox');
      checkbox.focus();

      // Then
      expect(checkbox).toHaveFocus();
    });
  });

  describe('Teste de snapshot', () => {
    it('Deve manter o snapshot do Checkbox', () => {
      // Given
      const { container } = render(
        <Checkbox
          label="Checkbox Teste"
          name="checkboxTeste"
          register={fakeRegister}
        />,
      );

      // Then
      expect(container).toMatchSnapshot();
    });
  });
});

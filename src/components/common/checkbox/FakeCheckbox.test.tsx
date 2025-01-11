import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { FakeCheckbox } from './FakeCheckbox';

describe('Testes para o componente <FakeCheckbox />', () => {
  describe('Testes de renderização', () => {
    it('Deve renderizar FakeCheckbox corretamente', () => {
      // Given
      render(
        <FakeCheckbox
          label="Checkbox Teste"
          name="checkboxTeste"
          checked={false}
        />,
      );

      // When
      const checkbox = screen.getByRole('checkbox');

      // Then
      expect(checkbox).toBeInTheDocument();
    });

    it('Deve renderizar a label do FakeCheckbox corretamente', () => {
      // Given
      render(
        <FakeCheckbox
          label="Checkbox Teste"
          name="checkboxTeste"
          checked={false}
        />,
      );

      // When
      const label = screen.getByText('Checkbox Teste');

      // Then
      expect(label).toBeInTheDocument();
    });

    it('Deve renderizar o texto de apoio do FakeCheckbox corretamente', () => {
      // Given
      render(
        <FakeCheckbox
          label="Checkbox Teste"
          name="checkboxTeste"
          checked={false}
          description="Texto de apoio do Checkbox Teste"
        />,
      );

      // When
      const description = document.getElementById('helper-faker-checkbox-text');

      // Then
      expect(description).toHaveTextContent('Texto de apoio do Checkbox Teste');
    });

    it('Deve renderizar a label e o texto de apoio do FakeCheckbox simultaneamente', () => {
      // Given
      render(
        <FakeCheckbox
          label="Checkbox Teste"
          name="checkboxTeste"
          checked
          description="Texto de apoio do Checkbox Teste"
        />,
      );

      // When
      const label = screen.getByText('Checkbox Teste');
      const description = document.getElementById('helper-faker-checkbox-text');

      // Then
      expect(label).toHaveTextContent('Checkbox Teste');
      expect(description).toHaveTextContent('Texto de apoio do Checkbox Teste');
    });

    it('Deve renderizar FakeCheckbox com tamanhos diferentes baseado em props', () => {
      // Given
      render(
        <div>
          <FakeCheckbox
            label="Checkbox Teste"
            name="checkboxTeste"
            checked={false}
            size="lg"
          />
          <FakeCheckbox
            label="Checkbox Teste"
            name="checkboxTeste"
            checked={false}
            id="checkbox-default"
          />
        </div>,
      );

      // When
      const checkbox = document.getElementById('helper-faker-checkbox');
      const checkboxDefault = document.getElementById('checkbox-default');

      // Then
      expect(checkbox).toHaveClass('h-6 w-6');
      expect(checkboxDefault).toHaveClass('h-4 w-4');
    });
  });

  describe('Testes de interação e comportamento', () => {
    it('Não deve ser possível clicar no FakeCheckbox', () => {
      // Given
      render(
        <FakeCheckbox
          label="Checkbox Teste"
          name="checkboxTeste"
          checked={false}
        />,
      );

      // When
      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);

      // Then
      expect(checkbox).not.toBeChecked();
    });
  });

  describe('Testes de acessibilidade', () => {
    it('Deve ter o atributo role igual a checkbox', () => {
      // Given
      render(
        <FakeCheckbox
          label="Checkbox Teste"
          name="checkboxTeste"
          checked={false}
        />,
      );

      // When
      const checkbox = screen.getByRole('checkbox');

      // Then
      expect(checkbox).toBeInTheDocument();
    });

    it('Deve ter o atributo tabindex igual a -1', () => {
      // Given
      render(
        <FakeCheckbox
          label="Checkbox Teste"
          name="checkboxTeste"
          checked={false}
        />,
      );

      // When
      const checkbox = screen.getByRole('checkbox');

      // Then
      expect(checkbox).toHaveAttribute('tabindex', '-1');
    });

    it('Dever ser possível focar no checkbox', () => {
      // Given
      render(
        <FakeCheckbox
          label="Checkbox Teste"
          name="checkboxTeste"
          aria-label="Checkbox de teste"
          checked={false}
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
        <FakeCheckbox
          label="Checkbox Teste"
          name="checkboxTeste"
          checked={false}
        />,
      );

      // Then
      expect(container).toMatchSnapshot();
    });
  });
});

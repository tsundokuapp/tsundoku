import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import { DropdownContainer } from './DropdownContainer';

describe('Testes para handleToggleDropdown no <DropdownContainer />', () => {
  it('Abre e fecha o dropdown corretamente', () => {
    render(
      <DropdownContainer label="Label Teste" value="Value Teste">
        <div>Opção 1</div>
      </DropdownContainer>,
    );
    expect(screen.queryByText('Label Teste')).not.toBeInTheDocument();
    expect(screen.getByText('Value Teste')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Label Teste')).toBeInTheDocument();
    expect(screen.queryByText('Value Teste')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));
    expect(screen.queryByText('Label Teste')).not.toBeInTheDocument();
    expect(screen.getByText('Value Teste')).toBeInTheDocument();
  });

  it('Foca no primeiro item quando abre', () => {
    render(
      <DropdownContainer label="Label Teste" value="Value Teste">
        <label role="option" aria-selected="true">
          Opção 1
        </label>
        <label role="option" aria-selected="false">
          Opção 2
        </label>
      </DropdownContainer>,
    );
    fireEvent.click(screen.getByRole('button'));
    const primeiroItem = screen.getByText('Opção 1');
    expect(document.activeElement).toBe(primeiroItem);
  });

  it('Clicar novamente no trigger fecha e mantém foco no mesmo', () => {
    render(
      <DropdownContainer label="Label Teste" value="Value Teste">
        <div>Opção 1</div>
      </DropdownContainer>,
    );
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    fireEvent.click(trigger);
    expect(screen.queryByText('Label Teste')).not.toBeInTheDocument();
    expect(document.activeElement).toBe(trigger);
  });
});

import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DropdownContainer } from './DropdownContainer';

describe('<DropdownContainer />', () => {
  const getTrigger = () => screen.getByTestId('dropdown-trigger');

  test('Deve abrir o dropdown corretamente', async () => {
    render(
      <DropdownContainer label="Label Teste" value="Value Teste">
        <div>Opção 1</div>
      </DropdownContainer>,
    );
    const trigger = getTrigger();
    // Verifica estado inicial fechado
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText('Label Teste')).not.toBeInTheDocument();
    expect(screen.getByText('Value Teste')).toBeInTheDocument();
    // Abre o dropdown
    await userEvent.click(trigger);
    expect(screen.getByText('Label Teste')).toBeInTheDocument();
    expect(screen.queryByText('Value Teste')).not.toBeInTheDocument();
  });

  test('Deve fechar o dropdown corretamente', async () => {
    render(
      <DropdownContainer label="Label Teste" value="Value Teste">
        <div>Opção 1</div>
      </DropdownContainer>,
    );
    const trigger = getTrigger();
    // Abre o dropdown
    await userEvent.click(trigger);
    // Fecha o dropdown
    await userEvent.click(trigger);
    expect(screen.queryByText('Label Teste')).not.toBeInTheDocument();
    expect(screen.getByText('Value Teste')).toBeInTheDocument();
  });

  test('Deve atualizar os atributos ARIA corretamente', async () => {
    render(
      <DropdownContainer label="Label Teste" value="Value Teste">
        <div>Opção 1</div>
      </DropdownContainer>,
    );
    const trigger = getTrigger();
    // Inicia fechado
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    // Abre o dropdown
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    // Fecha o dropdown
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  test('Deve fechar o dropdown ao clicar fora', async () => {
    render(
      <div>
        <DropdownContainer label="Label Teste" value="Value Teste">
          <div>Opção 1</div>
        </DropdownContainer>
        <div data-testid="outside">Fora</div>
      </div>,
    );
    const trigger = getTrigger();
    await userEvent.click(trigger);
    expect(screen.getByText('Label Teste')).toBeInTheDocument();

    const outside = screen.getByTestId('outside');
    await userEvent.click(outside);
    expect(screen.queryByText('Label Teste')).not.toBeInTheDocument();
  });

  test('Deve fechar o dropdown ao pressionar a tecla ESC', async () => {
    render(
      <DropdownContainer label="Label Teste" value="Value Teste">
        <div>Opção 1</div>
      </DropdownContainer>,
    );
    const trigger = getTrigger();
    await userEvent.click(trigger);
    expect(screen.getByText('Label Teste')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByText('Label Teste')).not.toBeInTheDocument();
  });

  test('Deve manter o foco no trigger ao fechar o dropdown clicando no próprio trigger', async () => {
    render(
      <DropdownContainer label="Label Teste" value="Value Teste">
        <div>Opção 1</div>
      </DropdownContainer>,
    );
    const trigger = getTrigger();
    await userEvent.click(trigger); // abre o dropdown
    await userEvent.click(trigger); // fecha o dropdown
    expect(document.activeElement).toBe(trigger);
    expect(screen.queryByText('Label Teste')).not.toBeInTheDocument();
  });

  test('Deve manter o dropdown aberto se o foco permanecer dentro do menu', async () => {
    render(
      <DropdownContainer label="Label Teste" value="Value Teste">
        <label role="option" aria-selected="false">
          Opção 1
        </label>
        <label role="option" aria-selected="false">
          Opção 2
        </label>
      </DropdownContainer>,
    );
    const trigger = getTrigger();
    await userEvent.click(trigger);
    const menu = screen.getByRole('menu');
    const firstOption = screen.getByText('Opção 1');
    // Simula focusOut do menu com foco ainda dentro do menu
    fireEvent.focusOut(menu, { relatedTarget: firstOption });
    expect(screen.getByText('Label Teste')).toBeInTheDocument();
  });
});

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';

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
    // Estado inicial fechado
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

  test('Deve chamar onClear ao clicar no botão de limpar filtro', async () => {
    const onClearMock = jest.fn();
    render(
      <DropdownContainer
        label="Label Teste"
        value="Value Teste"
        onClear={onClearMock}
      >
        <div>Opção 1</div>
      </DropdownContainer>,
    );
    const trigger = getTrigger();
    // Abre o dropdown para que o botão de limpar filtro seja renderizado
    await userEvent.click(trigger);
    const cleaner = screen.getByTestId('dropdown-cleaner');
    await userEvent.click(cleaner);
    expect(onClearMock).toHaveBeenCalledTimes(1);
  });

  test('Deve resetar o valor para o label após limpar o filtro', async () => {
    const Wrapper = () => {
      const [value, setValue] = useState('Value Teste');
      return (
        <DropdownContainer
          label="Label Teste"
          value={value}
          onClear={() => setValue('Label Teste')}
        >
          <div>Opção 1</div>
        </DropdownContainer>
      );
    };

    render(<Wrapper />);
    const trigger = getTrigger();
    // Verifica valor inicial quando o dropdown está fechado
    expect(trigger).toHaveTextContent('Value Teste');

    // Abre o dropdown
    await userEvent.click(trigger);
    // Clica no botão de limpar filtro
    const cleaner = screen.getByTestId('dropdown-cleaner');
    await userEvent.click(cleaner);
    // Fecha o dropdown
    await userEvent.click(trigger);
    // Agora o valor deve ter sido resetado para o label
    expect(trigger).toHaveTextContent('Label Teste');
  });
});

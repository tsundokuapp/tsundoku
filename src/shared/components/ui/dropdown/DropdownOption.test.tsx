import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DropdownOption } from './DropdownOption';

describe('<DropdownOption />', () => {
  const mockAction = jest.fn();
  const mockOnClick = jest.fn();
  const mockSetIsOpen = jest.fn();
  const mockTriggerRef = { current: document.createElement('button') };

  beforeEach(() => {
    jest.clearAllMocks();
    if (!document.body.contains(mockTriggerRef.current)) {
      document.body.appendChild(mockTriggerRef.current);
    }
  });

  test('Renderiza label e estado selecionado', () => {
    render(
      <div data-dropdown-options>
        <DropdownOption label="Opção de Teste" value="1" selected />
      </div>,
    );
    const option = screen.getByRole('option');
    expect(option).toHaveTextContent('Opção de Teste');
    expect(option).toHaveAttribute('aria-selected', 'true');
  });

  test('Renderiza label quando não selecionado', () => {
    render(
      <div data-dropdown-options>
        <DropdownOption label="Opção Não Selecionada" value="2" />
      </div>,
    );
    const option = screen.getByRole('option');
    expect(option).toHaveTextContent('Opção Não Selecionada');
    expect(option).toHaveAttribute('aria-selected', 'false');
  });

  test('Clique executa action, onClick, fecha dropdown e foca trigger', async () => {
    render(
      <div data-dropdown-options>
        <DropdownOption
          label="Clique"
          value="3"
          action={mockAction}
          onClick={mockOnClick}
          setIsOpen={mockSetIsOpen}
          triggerRef={mockTriggerRef}
        />
      </div>,
    );
    const option = screen.getByRole('option');
    await userEvent.click(option);
    expect(mockAction).toHaveBeenCalled();
    expect(mockOnClick).toHaveBeenCalled();
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
    expect(document.activeElement).toBe(mockTriggerRef.current);
  });

  test('Enter aciona a ação', async () => {
    render(
      <div data-dropdown-options>
        <DropdownOption
          label="Enter Teste"
          value="4"
          action={mockAction}
          onClick={mockOnClick}
          setIsOpen={mockSetIsOpen}
          triggerRef={mockTriggerRef}
        />
      </div>,
    );
    const option = screen.getByRole('option');
    await userEvent.type(option, '{enter}');
    expect(mockAction).toHaveBeenCalledTimes(1);
    expect(mockAction).toHaveBeenCalledWith(
      expect.objectContaining({ value: '4' }),
    );
  });

  test('Espaço aciona a ação', async () => {
    render(
      <div data-dropdown-options>
        <DropdownOption
          label="Espaço Teste"
          value="5"
          action={mockAction}
          onClick={mockOnClick}
          setIsOpen={mockSetIsOpen}
          triggerRef={mockTriggerRef}
        />
      </div>,
    );
    const option = screen.getByRole('option');
    await userEvent.type(option, '{space}');
    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  test('Tab foca o próximo elemento', () => {
    render(
      <div data-dropdown-options>
        <DropdownOption label="Item 1" value="1" />
        <DropdownOption label="Item 2" value="2" />
      </div>,
    );
    const options = screen.getAllByRole('option');
    options[0].focus();
    fireEvent.keyDown(options[0], { key: 'Tab' });
    expect(document.activeElement).toBe(options[1]);
  });

  test('Shift+Tab foca o elemento anterior', () => {
    render(
      <div data-dropdown-options>
        <DropdownOption label="Item A" value="A" />
        <DropdownOption label="Item B" value="B" />
      </div>,
    );
    const options = screen.getAllByRole('option');
    options[1].focus();
    fireEvent.keyDown(options[1], { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(options[0]);
  });

  test('ArrowDown foca o próximo elemento', () => {
    render(
      <div data-dropdown-options>
        <DropdownOption label="Opção 1" value="1" />
        <DropdownOption label="Opção 2" value="2" />
        <DropdownOption label="Opção 3" value="3" />
      </div>,
    );
    const options = screen.getAllByRole('option');
    options[0].focus();
    fireEvent.keyDown(options[0], { key: 'ArrowDown' });
    expect(document.activeElement).toBe(options[1]);
  });

  test('ArrowUp foca o elemento anterior', () => {
    render(
      <div data-dropdown-options>
        <DropdownOption label="Opção X" value="X" />
        <DropdownOption label="Opção Y" value="Y" />
        <DropdownOption label="Opção Z" value="Z" />
      </div>,
    );
    const options = screen.getAllByRole('option');
    options[2].focus();
    fireEvent.keyDown(options[2], { key: 'ArrowUp' });
    expect(document.activeElement).toBe(options[1]);
  });

  test('Home foca o primeiro elemento', () => {
    render(
      <div data-dropdown-options>
        <DropdownOption label="Primeiro" value="1" />
        <DropdownOption label="Segundo" value="2" />
        <DropdownOption label="Terceiro" value="3" />
      </div>,
    );
    const options = screen.getAllByRole('option');
    options[1].focus();
    fireEvent.keyDown(options[1], { key: 'Home' });
    expect(document.activeElement).toBe(options[0]);
  });

  test('End foca o último elemento', () => {
    render(
      <div data-dropdown-options>
        <DropdownOption label="Um" value="1" />
        <DropdownOption label="Dois" value="2" />
        <DropdownOption label="Três" value="3" />
      </div>,
    );
    const options = screen.getAllByRole('option');
    options[0].focus();
    fireEvent.keyDown(options[0], { key: 'End' });
    expect(document.activeElement).toBe(options[options.length - 1]);
  });
});

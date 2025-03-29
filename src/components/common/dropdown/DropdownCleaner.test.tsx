import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DropdownCleaner from './DropdownCleaner';
import { DropdownOption } from './DropdownOption';

describe('<DropdownCleaner />', () => {
  const mockOnClean = jest.fn();
  const mockSetIsOpen = jest.fn();
  const mockTriggerRef = { current: document.createElement('button') };

  beforeEach(() => {
    jest.clearAllMocks();
    if (!document.body.contains(mockTriggerRef.current)) {
      document.body.appendChild(mockTriggerRef.current);
    }
  });

  test('Renderiza com o texto "Limpar Filtro"', () => {
    render(
      <div data-dropdown-options>
        <DropdownCleaner
          onClean={mockOnClean}
          setIsOpen={mockSetIsOpen}
          triggerRef={mockTriggerRef}
        />
      </div>,
    );
    const cleaner = screen.getByTestId('dropdown-cleaner');
    expect(cleaner).toHaveTextContent('Limpar Filtro');
  });

  test('Clique executa onClean, fecha dropdown e foca trigger', async () => {
    render(
      <div data-dropdown-options>
        <DropdownCleaner
          onClean={mockOnClean}
          setIsOpen={mockSetIsOpen}
          triggerRef={mockTriggerRef}
        />
      </div>,
    );
    const cleaner = screen.getByTestId('dropdown-cleaner');
    await userEvent.click(cleaner);
    expect(mockOnClean).toHaveBeenCalled();
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
    expect(document.activeElement).toBe(mockTriggerRef.current);
  });

  test('Enter aciona a limpeza', async () => {
    render(
      <div data-dropdown-options>
        <DropdownCleaner
          onClean={mockOnClean}
          setIsOpen={mockSetIsOpen}
          triggerRef={mockTriggerRef}
        />
      </div>,
    );
    const cleaner = screen.getByTestId('dropdown-cleaner');
    await userEvent.type(cleaner, '{enter}');
    expect(mockOnClean).toHaveBeenCalledTimes(1);
  });

  test('Espaço aciona a limpeza', async () => {
    render(
      <div data-dropdown-options>
        <DropdownCleaner
          onClean={mockOnClean}
          setIsOpen={mockSetIsOpen}
          triggerRef={mockTriggerRef}
        />
      </div>,
    );
    const cleaner = screen.getByTestId('dropdown-cleaner');
    await userEvent.type(cleaner, '{space}');
    expect(mockOnClean).toHaveBeenCalledTimes(1);
  });

  test('ArrowDown navega do item anterior para o Cleaner', () => {
    render(
      <div data-dropdown-options>
        <DropdownOption label="Opção 1" value="1" />
        <DropdownCleaner
          onClean={mockOnClean}
          setIsOpen={mockSetIsOpen}
          triggerRef={mockTriggerRef}
        />
        <DropdownOption label="Opção 2" value="2" />
      </div>,
    );
    const options = screen.getAllByRole('option');
    options[0].focus();
    fireEvent.keyDown(options[0], { key: 'ArrowDown' });
    expect(document.activeElement).toBe(options[1]);
  });

  test('ArrowUp navega do Cleaner para o item anterior', () => {
    render(
      <div data-dropdown-options>
        <DropdownOption label="Opção A" value="A" />
        <DropdownCleaner
          onClean={mockOnClean}
          setIsOpen={mockSetIsOpen}
          triggerRef={mockTriggerRef}
        />
        <DropdownOption label="Opção B" value="B" />
      </div>,
    );
    const options = screen.getAllByRole('option');
    options[2].focus();
    fireEvent.keyDown(options[2], { key: 'ArrowUp' });
    expect(document.activeElement).toBe(options[1]);
  });

  test('Tab realiza ciclo de foco envolvendo o Cleaner', () => {
    render(
      <div data-dropdown-options>
        <DropdownOption label="Item 1" value="1" />
        <DropdownCleaner
          onClean={mockOnClean}
          setIsOpen={mockSetIsOpen}
          triggerRef={mockTriggerRef}
        />
        <DropdownOption label="Item 2" value="2" />
      </div>,
    );
    const options = screen.getAllByRole('option');
    // Foca o primeiro, Tab para o Cleaner, em seguida para o próximo e ciclo volta ao primeiro
    options[0].focus();
    fireEvent.keyDown(options[0], { key: 'Tab' });
    expect(document.activeElement).toBe(options[1]);
    fireEvent.keyDown(options[1], { key: 'Tab' });
    expect(document.activeElement).toBe(options[2]);
    fireEvent.keyDown(options[2], { key: 'Tab' });
    expect(document.activeElement).toBe(options[0]);
  });
});

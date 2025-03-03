import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import { DropdownOption } from './DropdownOption';

// language: tsx

describe('Testes para <DropdownOption />', () => {
  const mockAction = jest.fn();
  const mockOnClick = jest.fn();
  const mockSetIsOpen = jest.fn();
  const mockTriggerRef = { current: document.createElement('button') };

  beforeEach(() => {
    jest.clearAllMocks();
    document.body.appendChild(mockTriggerRef.current);
  });

  it('Renderiza label e seleciona corretamente', () => {
    render(<DropdownOption label="Teste" value="1" selected />);
    expect(screen.getByText('Teste')).toBeInTheDocument();
    expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'true');
  });

  it('Executa action, onClick, setIsOpen e foca no trigger ao clicar', () => {
    render(
      <DropdownOption
        label="Clique"
        value="2"
        action={mockAction}
        onClick={mockOnClick}
        setIsOpen={mockSetIsOpen}
        triggerRef={mockTriggerRef}
      />,
    );
    fireEvent.click(screen.getByRole('option'));
    expect(mockAction).toHaveBeenCalled();
    expect(mockOnClick).toHaveBeenCalled();
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
    expect(document.activeElement).toBe(mockTriggerRef.current);
  });

  it('Lida com Enter e espaço no teclado', () => {
    render(
      <DropdownOption
        label="Tecla"
        value="3"
        action={mockAction}
        onClick={mockOnClick}
        setIsOpen={mockSetIsOpen}
        triggerRef={mockTriggerRef}
      />,
    );
    const element = screen.getByRole('option');
    fireEvent.keyDown(element, { key: 'Enter' });
    fireEvent.keyDown(element, { key: ' ' });
    expect(mockAction).toHaveBeenCalledTimes(2);
  });

  it('Foca próximo e anterior ao usar ArrowDown e ArrowUp', () => {
    render(
      <div>
        <DropdownOption label="Item 1" value="1" />
        <DropdownOption label="Item 2" value="2" />
      </div>,
    );
    const items = screen.getAllByRole('option');
    items[0].focus();
    fireEvent.keyDown(items[0], { key: 'ArrowDown' });
    expect(document.activeElement).toBe(items[1]);
    fireEvent.keyDown(items[1], { key: 'ArrowUp' });
    expect(document.activeElement).toBe(items[0]);
  });
});

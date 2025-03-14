import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DropdownOption } from './DropdownOption';

describe('Testes abrangentes para <DropdownOption />', () => {
  const mockAction = jest.fn();
  const mockOnClick = jest.fn();
  const mockSetIsOpen = jest.fn();
  // Simula o trigger do dropdown (botão) e garante que ele esteja no DOM
  const mockTriggerRef = { current: document.createElement('button') };

  beforeEach(() => {
    jest.clearAllMocks();
    if (!document.body.contains(mockTriggerRef.current)) {
      document.body.appendChild(mockTriggerRef.current);
    }
  });

  test('Deve renderizar a label e aplicar o estado selecionado corretamente', () => {
    render(<DropdownOption label="Opção de Teste" value="1" selected />);
    const option = screen.getByRole('option');
    expect(option).toHaveTextContent('Opção de Teste');
    expect(option).toHaveAttribute('aria-selected', 'true');
  });

  test('Deve renderizar a label corretamente quando não selecionada', () => {
    render(<DropdownOption label="Opção Não Selecionada" value="2" />);
    const option = screen.getByRole('option');
    expect(option).toHaveTextContent('Opção Não Selecionada');
    expect(option).toHaveAttribute('aria-selected', 'false');
  });

  test('Ao clicar, deve executar action, onClick, setIsOpen e focar no trigger', async () => {
    render(
      <DropdownOption
        label="Clique"
        value="3"
        action={mockAction}
        onClick={mockOnClick}
        setIsOpen={mockSetIsOpen}
        triggerRef={mockTriggerRef}
      />,
    );
    const option = screen.getByRole('option');
    await userEvent.click(option);
    expect(mockAction).toHaveBeenCalled();
    expect(mockOnClick).toHaveBeenCalled();
    expect(mockSetIsOpen).toHaveBeenCalledWith(false);
    expect(document.activeElement).toBe(mockTriggerRef.current);
  });

  test('Deve responder ao pressionar a tecla Enter acionando a ação', async () => {
    render(
      <DropdownOption
        label="Enter Teste"
        value="4"
        action={mockAction}
        onClick={mockOnClick}
        setIsOpen={mockSetIsOpen}
        triggerRef={mockTriggerRef}
      />,
    );
    const option = screen.getByRole('option');
    expect(option).toHaveTextContent('Enter Teste');
    await userEvent.type(option, '{enter}');
    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  test('Deve responder ao pressionar a tecla Espaço acionando a ação', async () => {
    render(
      <DropdownOption
        label="Espaço Teste"
        value="5"
        action={mockAction}
        onClick={mockOnClick}
        setIsOpen={mockSetIsOpen}
        triggerRef={mockTriggerRef}
      />,
    );
    const option = screen.getByRole('option');
    expect(option).toHaveTextContent('Espaço Teste');
    await userEvent.type(option, ' ');
    expect(mockAction).toHaveBeenCalledTimes(1);
  });

  test('Deve navegar entre opções usando Tab (ciclo de foco)', () => {
    render(
      <div>
        <DropdownOption label="Item 1" value="1" />
        <DropdownOption label="Item 2" value="2" />
        <DropdownOption label="Item 3" value="3" />
      </div>,
    );
    const options = screen.getAllByRole('option');
    // Foca o primeiro item
    options[0].focus();
    // Pressiona Tab para ir para o próximo
    fireEvent.keyDown(options[0], { key: 'Tab' });
    expect(document.activeElement).toBe(options[1]);
    // Pressiona Shift+Tab para voltar ao primeiro
    fireEvent.keyDown(options[1], { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(options[0]);
    // No último item, Tab deve ciclar para o primeiro
    options[2].focus();
    fireEvent.keyDown(options[2], { key: 'Tab' });
    expect(document.activeElement).toBe(options[0]);
  });

  test('Deve navegar para o próximo e anterior usando ArrowDown e ArrowUp', () => {
    render(
      <div>
        <DropdownOption label="Item A" value="A" />
        <DropdownOption label="Item B" value="B" />
      </div>,
    );
    const items = screen.getAllByRole('option');
    items[0].focus();
    fireEvent.keyDown(items[0], { key: 'ArrowDown' });
    expect(document.activeElement).toBe(items[1]);
    fireEvent.keyDown(items[1], { key: 'ArrowUp' });
    expect(document.activeElement).toBe(items[0]);
  });

  test('Deve focar o primeiro item ao pressionar Home', () => {
    render(
      <div>
        <DropdownOption label="Home 1" value="1" />
        <DropdownOption label="Home 2" value="2" />
        <DropdownOption label="Home 3" value="3" />
      </div>,
    );
    const items = screen.getAllByRole('option');
    // Foca o item do meio e pressiona Home
    items[1].focus();
    fireEvent.keyDown(items[1], { key: 'Home' });
    expect(document.activeElement).toBe(items[0]);
  });

  test('Deve focar o último item ao pressionar End', () => {
    render(
      <div>
        <DropdownOption label="End 1" value="1" />
        <DropdownOption label="End 2" value="2" />
        <DropdownOption label="End 3" value="3" />
      </div>,
    );
    const items = screen.getAllByRole('option');
    // Foca o primeiro e pressiona End
    items[0].focus();
    fireEvent.keyDown(items[0], { key: 'End' });
    expect(document.activeElement).toBe(items[items.length - 1]);
  });
});

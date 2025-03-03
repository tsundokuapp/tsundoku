import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { HeaderMenu } from './HeaderMenu';

describe('<HeaderMenu />', () => {
  const openDialog = () => {
    const trigger = document.querySelector('button');
    expect(trigger).toBeInTheDocument();
    fireEvent.click(trigger!);
  };

  it('deve renderizar o gatilho do diálogo', () => {
    render(<HeaderMenu />);
    const trigger = document.querySelector('button');
    expect(trigger).toBeInTheDocument();
  });

  it('deve abrir o diálogo e renderizar o título do cabeçalho e os links', () => {
    render(<HeaderMenu />);
    openDialog();
    expect(screen.getByText(/Tsundoku/i)).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Novels')).toBeInTheDocument();
    expect(screen.getByText('Comics')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Sobre Nós')).toBeInTheDocument();
  });

  it('deve renderizar os botões do rodapé e a lista de alternância de tema quando o diálogo estiver aberto', () => {
    render(<HeaderMenu />);
    openDialog();
    expect(screen.getByText('Discord')).toBeInTheDocument();
    expect(screen.getByText('Entrar')).toBeInTheDocument();
    const themeToggleElement = document.querySelector(
      '.theme-toggle-list, [data-testid="theme-toggle-list"]',
    );
    expect(themeToggleElement).toBeInTheDocument();
  });
});

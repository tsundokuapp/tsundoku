import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { HeaderMenu } from './HeaderMenu';

describe('<HeaderMenu />', () => {
  // Função auxiliar para abrir o diálogo
  const openDialog = () => {
    const trigger = screen.getByTestId('header-menu-trigger');
    expect(trigger).toBeInTheDocument();
    fireEvent.click(trigger);
  };

  it('deve renderizar o gatilho do diálogo', () => {
    render(<HeaderMenu />);
    // Alterado para pegar o trigger via data-testid
    const trigger = screen.getByTestId('header-menu-trigger');
    expect(trigger).toBeInTheDocument();
  });

  it('deve abrir o diálogo', () => {
    render(<HeaderMenu />);
    openDialog();
    // Verifica se o diálogo foi aberto verificando a presença do título
    expect(screen.getByText(/Tsundoku/i)).toBeInTheDocument();
  });

  it('deve renderizar o título do cabeçalho e os links internos', () => {
    render(<HeaderMenu />);
    openDialog();
    // Verifica a renderização dos links internos do diálogo
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Novels')).toBeInTheDocument();
    expect(screen.getByText('Comics')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Sobre Nós')).toBeInTheDocument();
  });

  it('deve renderizar os botões do rodapé e a lista de alternância de tema', () => {
    render(<HeaderMenu />);
    openDialog();
    expect(screen.getByText('Discord')).toBeInTheDocument();
    expect(screen.getByText('Entrar')).toBeInTheDocument();
    // Usa data-testid para identificar o elemento de alternância de tema
    const themeToggleElement = screen.getByTestId('theme-toggle-list');
    expect(themeToggleElement).toBeInTheDocument();
  });
});

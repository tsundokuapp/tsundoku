import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { HeaderSearch } from './HeaderSearch';

// language: tsx

describe('Testes para o componente <HeaderSearch />', () => {
  it('Renderiza com placeholder padrão', () => {
    render(<HeaderSearch />);
    expect(screen.getByPlaceholderText('Buscar...')).toBeInTheDocument();
  });

  it('Renderiza com placeholder personalizado', () => {
    render(<HeaderSearch placeholder="Pesquisar..." />);
    expect(screen.getByPlaceholderText('Pesquisar...')).toBeInTheDocument();
  });

  it('Exibe "ENTER" quando icon é "Enter"', () => {
    render(<HeaderSearch icon="Enter" />);
    expect(screen.getByText('ENTER')).toBeInTheDocument();
  });

  it('Exibe ícone quando icon é "Search"', () => {
    render(<HeaderSearch icon="Search" />);
    expect(document.querySelector('svg')).toBeInTheDocument();
  });
});

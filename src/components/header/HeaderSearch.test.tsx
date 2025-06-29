import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { HeaderSearch } from './HeaderSearch';

// testes quebrando pelo uso do useRouter(), problema conhecido no nextjs.
// Criar um mock para o useRouter(), link indicado pela vercel: https://www.npmjs.com/package/next-router-mock
describe.skip('Testes para o componente <HeaderSearch />', () => {
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

    const icon = screen.getByTestId('icon-search');

    expect(icon).toBeInTheDocument();
  });
});

import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { AdminBreadcrumbs } from './AdminBreadcrumbs';

const backMock = jest.fn();
let mockPathname = '/dashboard';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    back: backMock,
  }),
  usePathname: () => mockPathname,
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    children: React.ReactNode;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe('<AdminBreadcrumbs />', () => {
  beforeEach(() => {
    backMock.mockReset();
    mockPathname = '/dashboard';
  });

  afterEach(() => {
    cleanup();
  });

  it('renderiza trilha Admin / Dashboard sem botão voltar na raiz do admin', () => {
    mockPathname = '/dashboard';
    render(<AdminBreadcrumbs />);

    expect(screen.getByRole('link', { name: 'Admin' })).toHaveAttribute(
      'href',
      '/dashboard',
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Voltar/i }),
    ).not.toBeInTheDocument();
  });

  it('renderiza Admin / Gêneros removendo prefixo admin redundante', () => {
    mockPathname = '/admin/generos';
    render(<AdminBreadcrumbs />);

    expect(screen.getByRole('link', { name: 'Admin' })).toBeInTheDocument();
    expect(screen.getByText('Gêneros')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /Voltar/i }),
    ).not.toBeInTheDocument();
  });

  it('renderiza botão voltar e trilha aninhada em subrotas administrativas', () => {
    mockPathname = '/admin/blog/categorias';
    render(<AdminBreadcrumbs />);

    const backButton = screen.getByRole('button', {
      name: /Voltar à página anterior/i,
    });
    expect(backButton).toBeInTheDocument();

    fireEvent.click(backButton);
    expect(backMock).toHaveBeenCalledTimes(1);

    expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute(
      'href',
      '/admin/blog',
    );
    expect(screen.getByText('Categorias')).toBeInTheDocument();
  });
});

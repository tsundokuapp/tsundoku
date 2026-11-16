import { fireEvent, render, screen } from '@testing-library/react';

import { ObrasViewToggle } from './ObrasViewToggle';

describe('ObrasViewToggle', () => {
  it('renders both grid and table view toggle buttons', () => {
    render(<ObrasViewToggle viewMode="grid" onChange={jest.fn()} />);

    expect(screen.getByLabelText('Visualização em grade')).toBeInTheDocument();
    expect(screen.getByLabelText('Visualização em tabela')).toBeInTheDocument();
  });

  it('indicates active state through aria-pressed', () => {
    const { rerender } = render(
      <ObrasViewToggle viewMode="grid" onChange={jest.fn()} />,
    );

    expect(screen.getByLabelText('Visualização em grade')).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByLabelText('Visualização em tabela')).toHaveAttribute(
      'aria-pressed',
      'false',
    );

    rerender(<ObrasViewToggle viewMode="table" onChange={jest.fn()} />);

    expect(screen.getByLabelText('Visualização em grade')).toHaveAttribute(
      'aria-pressed',
      'false',
    );
    expect(screen.getByLabelText('Visualização em tabela')).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('calls onChange with correct mode on button click', () => {
    const handleChange = jest.fn();
    render(<ObrasViewToggle viewMode="grid" onChange={handleChange} />);

    fireEvent.click(screen.getByLabelText('Visualização em tabela'));
    expect(handleChange).toHaveBeenCalledWith('table');

    fireEvent.click(screen.getByLabelText('Visualização em grade'));
    expect(handleChange).toHaveBeenCalledWith('grid');
  });
});

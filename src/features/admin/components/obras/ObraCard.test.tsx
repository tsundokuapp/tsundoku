import { fireEvent, render, screen } from '@testing-library/react';

import { ObraCard } from './ObraCard';

describe('ObraCard', () => {
  const defaultProps = {
    id: 'novel-1',
    title: 'A Jornada de Elaina',
    slug: 'a-jornada-de-elaina',
    worktype: 'novel' as const,
    author: 'Jougi Shiraishi',
    status: 'Em Andamento',
    coverUrl: 'https://example.com/cover.jpg',
  };

  it('renders title, author and status correctly', () => {
    render(<ObraCard {...defaultProps} />);

    expect(screen.getByText('A Jornada de Elaina')).toBeInTheDocument();
    expect(screen.getByText('Jougi Shiraishi')).toBeInTheDocument();
    expect(screen.getByText('Em Andamento')).toBeInTheDocument();
  });

  it('renders quick action buttons for Índice and Editar', () => {
    render(<ObraCard {...defaultProps} />);

    expect(
      screen.getByLabelText('Ver índice de A Jornada de Elaina'),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText('Editar A Jornada de Elaina'),
    ).toBeInTheDocument();
  });

  it('triggers onEdit callback when provided and edit button is clicked', () => {
    const handleEdit = jest.fn();
    render(<ObraCard {...defaultProps} onEdit={handleEdit} />);

    const editBtn = screen.getByLabelText('Editar A Jornada de Elaina');
    fireEvent.click(editBtn);

    expect(handleEdit).toHaveBeenCalledTimes(1);
  });
});

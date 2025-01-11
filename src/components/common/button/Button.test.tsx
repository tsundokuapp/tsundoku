import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Button } from '@/components/common/button/Button';

describe('Testes para o componente <Button />', () => {
  it('Deve renderizar Button corretamente', () => {
    // Given
    render(
      <Button
        onClick={() => {
          /**/
        }}
      >
        clique
      </Button>,
    );

    // When
    const button = screen.getByRole('button');

    // Then
    expect(button).toBeInTheDocument();
  });

  it('Deve renderizar Button com texto correto', () => {
    // Given
    render(
      <Button
        onClick={() => {
          /**/
        }}
      >
        clique
      </Button>,
    );

    // When
    const button = screen.getByRole('button');

    // Then
    expect(button).toHaveTextContent('clique');
  });
});

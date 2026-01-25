import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { AsyncSection } from './AsyncSection';

describe('Testes para o componente <AsyncSection />', () => {
  describe('Testes de renderização', () => {
    it('Deve renderizar o título de AsyncSection corretamente', () => {
      // Given
      render(
        <AsyncSection isLoading={false} title={'Título Teste'}>
          Teste
        </AsyncSection>,
      );

      // When
      const title = screen.getByText('Título Teste');
      // Then
      expect(title).toBeInTheDocument();
    });

    it('Deve renderizar o conteúdo quando isLoading for false', () => {
      // Given
      render(
        <AsyncSection isLoading={false} title={'Título Teste'}>
          Teste
        </AsyncSection>,
      );

      // When
      const content = screen.getByText('Teste');
      // Then
      expect(content).toBeInTheDocument();
    });
  });
});

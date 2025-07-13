import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from '@/components/common/button/Button';

describe('Testes para o componente <Button />', () => {
  describe('Testes de renderização', () => {
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

    it('Deve renderizar Button com ícone na esquerda', () => {
      // Given
      render(
        <Button
          onClick={() => {
            /**/
          }}
          icon={<span>Icon</span>}
        >
          clique
        </Button>,
      );

      // When
      const button = screen.getByText('clique');
      const Icon = screen.getByText('Icon');

      // Then
      expect(button.contains(screen.getByText('Icon'))).toBeTruthy();
      expect(Icon.nextSibling).toHaveTextContent('clique');
    });

    it('Deve renderizar Button com ícone na direita', () => {
      // Given
      render(
        <Button
          onClick={() => {
            /**/
          }}
          icon={<span>Icon</span>}
          sideIcon="right"
        >
          clique
        </Button>,
      );

      // When
      const button = screen.getByText('clique');
      const Icon = screen.getByText('Icon');

      // Then
      expect(button.contains(screen.getByText('Icon'))).toBeTruthy();
      expect(Icon.previousSibling).toHaveTextContent('clique');
    });

    it('Deve renderizar Button com classe customizada', () => {
      // Given
      render(
        <Button
          onClick={() => {
            /**/
          }}
          className="custom-class"
        >
          clique
        </Button>,
      );

      // When
      const button = screen.getByRole('button');

      // Then
      expect(button).toHaveClass('custom-class');
    });

    it('Deve aceitar e sobrepor a classe padrão de Button através da prop style', () => {
      // Given
      render(
        <Button
          onClick={() => {
            /**/
          }}
          style={{ backgroundColor: '#f1f' }}
        >
          clique
        </Button>,
      );

      // When
      const button = screen.getByRole('button');

      // Then
      expect(button.style.backgroundColor).toBe('rgb(255, 17, 255)');
    });
  });

  describe('Testes de interação e comportamento', () => {
    it('Deve chamar a função do onClick quando clicado', () => {
      const handleClick = jest.fn();
      // Given
      render(
        <Button
          onClick={() => {
            handleClick();
          }}
        >
          clique
        </Button>,
      );

      // When
      fireEvent.click(screen.getByRole('button'));

      // Then
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('Deve tornar Button inacessível quando desabilitado', () => {
      const handleClick = jest.fn();
      // Given
      render(
        <Button
          onClick={() => {
            handleClick();
          }}
          disabled
        >
          clique
        </Button>,
      );

      // When
      fireEvent.click(screen.getByRole('button'));

      // Then
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Testes de acessibilidade', () => {
    it('Deve ter o atributo role igual a button', () => {
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

    it('Deve ter o atributo tabindex igual a 0', () => {
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
      expect(button).toHaveAttribute('tabindex', '0');
    });

    it('Deve aplicar o atributo arial-label quando passado', () => {
      // Given
      render(
        <Button
          onClick={() => {
            /**/
          }}
          aria-label="Botão de clique"
        >
          clique
        </Button>,
      );

      // When
      const button = screen.getByRole('button');

      // Then
      expect(button).toHaveAttribute('aria-label', 'Botão de clique');
    });

    it('Dever ser possível focar no botão', () => {
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
      button.focus();

      // Then
      expect(button).toHaveFocus();
    });
  });

  describe('Teste de snapshot', () => {
    it('Deve manter o snapshot do Button', () => {
      // Given
      const { container } = render(
        <Button
          onClick={() => {
            /**/
          }}
        >
          clique
        </Button>,
      );

      // Then
      expect(container).toMatchSnapshot();
    });
  });
});

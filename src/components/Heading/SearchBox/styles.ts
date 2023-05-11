import styled, { DefaultTheme, css } from "styled-components";

interface IInputBuscaProps {
  variante: "primaria" | "secundaria";
  borda: "redonda" | "quadrada";
}

const bordaVariante = (theme: DefaultTheme, borda = "redonda") =>
  ({
    redonda: css`
      border-radius: ${theme.quina.redonda};
    `,
    quadrada: css`
      border-radius: ${theme.quina.media};
    `,
  }[borda]);

const bgVariante = (theme: DefaultTheme, variante = "primaria") =>
  ({
    primaria: css`
      background: ${theme.colors.especial.bgBusca};
    `,
    secundaria: css`
      background: ${theme.colors.bgComponente};
    `,
  }[variante]);

export const InputBusca = styled.label<IInputBuscaProps>`
  display: flex;
  flex: 1;
  align-items: center;

  padding: 1rem;

  ${({ theme, borda }) => bordaVariante(theme, borda)};

  min-width: 18rem;
  width: 100%;
  max-height: 2rem;

  @media (max-width: 500px) {
    min-width: 12rem;
  }

  ${({ theme, variante }) => bgVariante(theme, variante)};
`;

interface IInputProps {
  variante: "primaria" | "secundaria";
}

const colorVariante = (theme: DefaultTheme, variante = "primaria") =>
  ({
    primaria: css`
      color: ${theme.colors.especial.textBusca};
    `,
    secundaria: css`
      color: ${theme.colors.textSec};
    `,
  }[variante]);

export const Input = styled.input<IInputProps>`
  ${({ theme, variante }) => colorVariante(theme, variante)};
  background-color: transparent;
  border: none;
  font-size: ${({ theme }) => theme.texto.paragrafo};

  @media (max-width: 500px) {
    font-size: ${({ theme }) => theme.texto.nota};
  }
`;

export const Icon = styled.span`
  font-size: 1rem;

  margin-left: auto;
  color: ${({ theme }) => theme.colors.especial.textBusca};

  cursor: pointer;
`;

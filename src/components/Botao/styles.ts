import styled, { DefaultTheme, css } from "styled-components";

export const ContainerBotao = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
`;

interface IBotao {
  desativado?: boolean;
  variante: "primaria" | "secundario" | "icone";
}

const estiloVariante = (theme: DefaultTheme, variant = "primaria") =>
  ({
    primaria: css`
      color: #f8f9fa;
      background: #259cc1;
      border: 1px solid transparent;
      :hover {
        filter: brightness(0.8);
      }
    `,
    secundario: css`
      color: #259cc1;
      background: transparent;
      border: 1px solid #259cc1;
      :hover {
        background: rgba(37, 156, 193, 0.08);
      }
    `,
    icone: css`
      color: #f8f9fa;
      background: #259cc1;
      border: none;
      :hover {
        filter: brightness(0.8);
      }
    `,
  }[variant]);

const statusBotao = (theme: DefaultTheme, desativado?: boolean) =>
  desativado
    ? css`
        cursor: not-allowed;
        filter: brightness(0.4);
      `
    : css`
        cursor: pointer;
        transition: filter 0.2s;
      `;

export const Botao = styled.button<IBotao>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;
  white-space: nowrap;

  ${({ theme, variante }) => estiloVariante(theme, variante)};

  border-radius: 0.25rem;
  padding: ${({ variante }) =>
    variante === "icone" ? "0.75rem" : "0.5rem 1rem"};

  font-size: 1rem;
  font-weight: bold;

  ${({ theme, desativado }) => statusBotao(theme, desativado)};

  svg {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: ${({ variante }) => (variante === "icone" ? "0" : "0.5rem")};
  }
`;

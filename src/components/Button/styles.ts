import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  padding-bottom: 0.25rem;
`;

interface IBotao {
  desativado?: boolean;
  variant: "primaria" | "secundario" | "icon";
}

const styleVariant = (variant = "primaria") =>
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

const statusBotao = (desativado?: boolean) =>
  desativado
    ? css`
        cursor: not-allowed;
        filter: brightness(0.4);
      `
    : css`
        cursor: pointer;
        transition: filter 0.2s;
      `;

export const ButtonStyled = styled.button<IBotao>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 90%;
  white-space: nowrap;

  ${({ variant }) => styleVariant(variant)};

  border-radius: 0.25rem;
  padding: ${({ variant }) => (variant === "icon" ? "0.75rem" : "0.5rem 1rem")};

  font-size: 1rem;
  font-weight: bold;

  ${({ desativado }) => statusBotao(desativado)};

  svg {
    width: 1.25rem;
    height: 1.25rem;
    margin-right: ${({ variant }) => (variant === "icon" ? "0" : "0.5rem")};
  }
`;

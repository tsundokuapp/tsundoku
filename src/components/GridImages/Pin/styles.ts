import styled, { DefaultTheme, css } from "styled-components";

interface PinBoxProps {
  size: "small" | "medium" | "large" | string;
}

const sizeVariant = (theme: DefaultTheme, size = "small") =>
  ({
    small: css`
      grid-row-end: span 26;
    `,
    medium: css`
      grid-row-end: span 33;
    `,
    large: css`
      grid-row-end: span 45;
    `,
  }[size]);

export const PinBox = styled.div<PinBoxProps>`
  position: relative;
  margin: 0.25rem;
  padding: 0;
  border-radius: 0.5rem;
  background-color: green;
  border: 2px solid ${({ theme }) => theme.colors.primaria[500]};

  ${({ theme, size }) => sizeVariant(theme, size)};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.2s ease-in-out;
    border-radius: 0.5rem;
  }

  div {
    position: absolute;
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    border-radius: 0.5rem;
    width: 100%;
    height: 100%;
    top: 0;

    transition: all 0.4s ease-in-out;

    color: ${({ theme }) => theme.colors.primaria[500]};
  }

  :hover {
    cursor: pointer;

    img {
      filter: brightness(0.2);
    }

    div {
      display: flex;
    }
  }
`;

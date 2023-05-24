import styled, { DefaultTheme, css } from "styled-components";
import { motion } from "framer-motion";

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

export const PinBox = styled(motion.div)<PinBoxProps>`
  position: relative;
  margin: 0.25rem;
  padding: 0;
  border-radius: 0.5rem;
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

export const ModalMember = styled(motion.div)`
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  :hover {
    cursor: pointer;
  }
`;

export const ModalContent = styled(motion.div)`
  position: fixed;
  top: 20%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  background: ${({ theme }) => theme.colors.bgComponente};
  width: 60%;
  max-width: 500px;
  height: 500px;

  padding: 1rem;

  border-radius: 0.5rem;
  border: 2px solid ${({ theme }) => theme.colors.primaria[500]};
`;

export const BoxImageStaff = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 0 2rem;

  img {
    width: 100%;
    height: 100%;
    min-width: 200px;
    max-height: 200px;
    object-fit: cover;
    border-radius: 0.5rem;
  }

  strong {
    margin-top: 0.5rem;

    :last-child {
      margin-top: 0rem;
    }
  }
`;

export const BoxInfoStaff = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  width: 100%;

  padding: 1.5rem;

  overflow-y: scroll;

  strong {
    margin-top: 1rem;
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.primaria[500]};

    :first-child {
      margin-top: 0rem;
    }
  }

  p {
    margin-top: 0.25rem;
  }
`;

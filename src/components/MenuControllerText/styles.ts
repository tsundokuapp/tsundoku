import styled from "styled-components";
import { motion } from "framer-motion";

export const MenuStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 2rem;
    padding: 0.25rem;
  }
`;

export const MotionButton = styled(motion.button)`
  width: 40px;
  height: 40px;
  border-radius: 0.25rem;
  background: ${({ theme }) => theme.colors.especial.textBusca};
  color: ${({ theme }) => theme.colors.text};
  transition: 0.3s ease;

  :hover {
    background: ${({ theme }) => theme.colors.primaria[700]};
  }
`;

interface IMotionDivProps {
  dataIsOpen: boolean;
}

export const MotionDiv = styled(motion.div)<IMotionDivProps>`
  position: fixed;
  top: 30%;
  right: 0;
  display: flex;
  background: ${({ theme }) => theme.colors.primaria[500]};
  width: 35px;
  height: 35px;
  justify-content: center;
  align-items: center;
  border-radius: 0;

  ${({ dataIsOpen }) =>
    dataIsOpen &&
    ` 
    width: 200px;
    height: 350px;
    border-radius: 0.5rem;
    box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.25);
    border: 3px solid rgba(0, 0, 0, 0.25);
  `}
`;

export const MotionDivChild = styled(motion.button)`
  color: ${({ theme }) => theme.colors.text};
  position: absolute;
  width: 40px;
  height: 40px;
  top: 0px;
  right: 0px;
  background: ${({ theme }) => theme.colors.primaria[500]};

  svg {
    width: 30px;
    height: 30px;
  }
`;

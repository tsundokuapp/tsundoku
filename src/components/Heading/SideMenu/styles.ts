import styled from "styled-components";
import { motion } from "framer-motion";

const zIndexPosition = 20;
interface IBackgroundProps {
  isVisible: boolean;
}

// Componente do index.tsx
export const Nav = styled(motion.nav)<IBackgroundProps>`
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  position: fixed;
  z-index: ${zIndexPosition};

  width: 270px;

  top: 0;
  left: 0;
  bottom: 0;
  background: "transparent";
`;

export const Background = styled(motion.div)<IBackgroundProps>`
  display: ${(props) => (props.isVisible ? "block" : "none")};
  position: absolute;
  z-index: ${zIndexPosition - 1};

  top: 0;
  left: 0;
  bottom: 0;
  width: 270px;

  border-radius: 0 0 1rem 0;
  background: ${(props) => props.theme.colors.background};
  opacity: 0.8;
`;

// Componente do MenuToggle
export const Button = styled.button<IBackgroundProps>`
  display: ${(props) => (props.isVisible ? "flex" : "none")};
  z-index: ${zIndexPosition};
  position: absolute;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  padding: 0 1.5rem;
  top: 0.7rem;
  left: 0px;
  height: 50px;
  background: transparent;

  cursor: pointer;

  outline: none;
  border: none;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`;

export const Logo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 15px;

  color: ${(props) => props.theme.colors.text};
`;

// Componente do Navigation
export const Ul = styled(motion.ul)`
  margin: 0;
  padding: 1.5rem;
  position: absolute;
  z-index: ${zIndexPosition};
  top: 70px;
  width: 230px;
`;

// Componentes do MenuItem
export const Li = styled(motion.li)`
  margin: 0;
  padding: 0;
  list-style: none;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: ${zIndexPosition};
`;

export const IconPlaceholder = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex: 40px 0;
  margin-right: 10px;
  z-index: ${zIndexPosition};
`;

export const TextPlaceholder = styled.div`
  border-radius: 5px;
  flex: 1;
  padding: 0.25rem;
  z-index: ${zIndexPosition};
`;

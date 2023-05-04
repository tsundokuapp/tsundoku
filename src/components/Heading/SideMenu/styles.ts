import styled from "styled-components";
import { motion } from "framer-motion";

// body {
//   width: 100vw;
//   height: 100vh;
//   background: linear-gradient(180deg, #0055ff 0%, rgb(0, 153, 255) 100%);
//   overflow: hidden;
//   padding: 0;
//   margin: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }

const zIndexPosition = 99;

interface IBackgroundProps {
  isVisible: boolean;
}

export const Background = styled(motion.div)<IBackgroundProps>`
  position: absolute;
  z-index: ${zIndexPosition - 1};
  top: 0;
  left: 0;
  bottom: 0;
  width: 300px;
  display: ${(props) => (props.isVisible ? "block" : "none")};
  background: ${(props) => (props.isVisible ? "#fff" : "transparent")};
  border-radius: 0 0 1rem 0;
`;

// Componente do index.tsx
export const Nav = styled(motion.nav)`
  position: absolute;
  z-index: ${zIndexPosition};
  top: 0;
  left: 0;
  bottom: 0;
  width: 300px;
`;

// Componente do MenuToggle
export const Button = styled.button`
  outline: none;
  border: none;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  cursor: pointer;
  position: absolute;
  top: 18px;
  left: 15px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: transparent;
  z-index: ${zIndexPosition};
`;

// Componente do Navigation
export const Ul = styled(motion.ul)`
  margin: 0;
  padding: 0;
  padding: 25px;
  position: absolute;
  z-index: ${zIndexPosition};
  top: 100px;
  width: 230px;
`;

// Componentes do MenuItem
export const Li = styled(motion.li)`
  margin: 0;
  padding: 0;
  list-style: none;
  margin-bottom: 20px;
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
  margin-right: 20px;
  z-index: ${zIndexPosition};
`;

export const TextPlaceholder = styled.div`
  border-radius: 5px;
  width: 200px;
  height: 20px;
  flex: 1;
  z-index: ${zIndexPosition};
`;

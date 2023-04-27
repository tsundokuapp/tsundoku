import styled from "styled-components";
import { motion } from "framer-motion";

export const Base = styled(motion.div)`
  display: flex;
  flex-direction: row;
  position: relative;

  color: white;
  background: ${(props) => props.theme.colors.primaria[500]};
  box-shadow: 3px 3px 15px 0px rgba(0, 0, 0, 0.25);

  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  width: 400px;
  overflow: hidden;
`;

export const IconBox = styled.div`
  align-items: center;
  justify-content: center;
  display: flex;
  width: 50px;
  z-index: 2;
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  z-index: 2;

  padding: 1.5rem 1.5rem 1.5rem 0.5rem;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.div`
  line-height: 1.3;
  font-weight: bold;
  font-size: ${(props) => props.theme.texto.subtitulo};
  margin-bottom: 4px;
`;

export const Description = styled.div`
  line-height: 1.3;
  color: rgba(255, 255, 255, 0.75);
  font-size: ${(props) => props.theme.texto.paragrafo};
`;

export const Footer = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const ButtonClose = styled.button`
  pointer-events: all;
  transition: background-color 0.15s ease-in-out;
  padding: 0.25rem;
  background-color: rgb(255, 255, 255, 0.05);
  outline: 0;
  border: 0;
  border-radius: 0.5rem;
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;

  &:hover {
    background-color: rgb(255, 255, 255, 0.1);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const Button = styled.button`
  pointer-events: all;
  transition: background-color 0.15s ease-in-out;
  padding: 0.5rem;
  background-color: rgb(255, 255, 255, 0.05);
  outline: 0;
  border: 0;
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: rgb(255, 255, 255, 0.1);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const Progress = styled.div`
  width: 250px;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.25);
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
`;

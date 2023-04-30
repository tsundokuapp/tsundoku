import styled from "styled-components";

interface IContainer {
  isPreviusPage: boolean;
}

export const Container = styled.div<IContainer>`
  width: 2rem;
  height: 2rem;
  background-color: ${({ theme }) => theme.colors.primaria[500]};
  color: ${({ theme }) => theme.colors.especial.preto};
  border-radius: ${({ theme }) => theme.quina.redonda};
  box-shadow: rgba(4px 4px 4px #000000);
  text-align: center;
  padding-top: 0.4rem;
  font-size: ${({ theme }) => theme.texto.subtitulo};
  cursor: pointer;

  :hover {
    background-color: ${({ theme }) => theme.colors.primaria[600]};
    transition: 0.3s ease;
  }
`;

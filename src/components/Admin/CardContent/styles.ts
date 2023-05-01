import styled from "styled-components";

interface IContainer {
  width: string;
  height: string;
}

export const Container = styled.div<IContainer>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background: ${({ theme }) => theme.colors.bgComponente};
  border-radius: ${({ theme }) => theme.quina.grande};

  h2 {
    font-size: ${({ theme }) => theme.texto.titulo};
    padding: 1rem 0 0 1rem;
  }
`;

export const ContainerContent = styled.div`
  padding: 1rem 0 0 1.5rem;
`;

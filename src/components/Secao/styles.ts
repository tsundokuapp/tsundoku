import styled from 'styled-components';

interface IContainerSecao {
  direcaoItens: string;
}

export const ContainerSecao = styled.section<IContainerSecao>`
  max-width: 1120px;
  display: flex;
  flex-direction: ${({ direcaoItens }) => direcaoItens};
  align-items: center;
  justify-content: center;
  gap: 1.5rem 0;

  &:last-child {
    margin-bottom: 1.5rem;
  }
`;

// TODO: adicionar uma seção no tema com tamanhos de fontes e bordas
export const Titulo = styled.strong`
  font-size: 1.25rem;
  align-self: start;
`;

import styled from "styled-components";

interface IContainer {
  directionItems: string;
}

export const Container = styled.section<IContainer>`
  max-width: 1120px;
  display: flex;
  flex-direction: ${({ directionItems }) => directionItems};
  align-items: flex-start;
  justify-content: center;
  gap: 1.5rem 0;

  &:last-child {
    margin-bottom: 1.5rem;
  }
`;

export const Title = styled.strong`
  font-size: 1.25rem;
  align-self: start;
`;

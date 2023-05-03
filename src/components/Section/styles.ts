import styled from "styled-components";

interface IContainer {
  directionItems: string;
  wrap: boolean;
}

export const Container = styled.section<IContainer>`
  display: flex;
  flex-direction: ${({ directionItems }) => directionItems};
  align-items: center;
  justify-content: center;
  flex-wrap: ${({ wrap }) => (wrap ? "wrap" : "nowrap")};

  max-width: 1120px;
  gap: 1rem 0;

  &:last-child {
    margin-bottom: 1.5rem;
  }
`;

export const Title = styled.strong`
  font-size: 1.25rem;
  align-self: start;
`;

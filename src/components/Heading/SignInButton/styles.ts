import styled from "styled-components";

export const LinkButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 2rem;
  background: transparent;
  border: 0;
  margin: 0 0.25rem;

  color: ${(props) => props.theme.colors.text};

  svg {
    width: 1.875rem;
    height: 1.875rem;
  }

  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.8);
  }
`;

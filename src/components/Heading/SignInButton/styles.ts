import styled from 'styled-components';

export const LinkButton = styled.button`
  height: 2rem;
  width: 100%;
  border-radius: 2rem;
  background: transparent;
  border: 0;
  padding: 0 1rem;
  margin: 0 0.5rem;

  display: flex;
  align-items: center;
  justify-content: center;

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

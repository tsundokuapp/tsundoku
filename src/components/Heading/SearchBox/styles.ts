import styled from 'styled-components';

export const ContainerSearchBox = styled.label`
  display: flex;
  flex: 1;

  padding: 0.5rem 0.5rem;
  margin: 0;
  border-radius: 1rem;
  max-width: 22rem;
  position: relative;
  max-height: 2rem;
  align-items: center;
  justify-content: space-between;
  // TODO: adicinar uma cor no tema para o placeholder
  background-color: ${({ theme }) => theme.textColor};
`;

export const Input = styled.input`
  color: ${({ theme }) => theme.palette.primary.main};
  background-color: transparent;
  border: none;
  width: 100%;
  height: 100%;
  font-size: 1rem;
`;

export const Icon = styled.div`
  display: flex;
  font-size: 1rem;
  margin: 0 0.25rem;
  height: 100%;
  color: ${({ theme }) => theme.palette.primary.main};

  cursor: pointer;
  transition: opacity 0.3s;

  :hover {
    opacity: 0.7;
  }
`;

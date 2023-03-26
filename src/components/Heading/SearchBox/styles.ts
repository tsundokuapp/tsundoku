import styled from 'styled-components';

export const ContainerSearchBox = styled.label`
  display: flex;
  flex: 1;

  padding: 0.5rem 0.25rem;
  margin: 0 0.5rem;
  border-radius: 1rem;
  max-width: 20rem;
  align-self: center;
  position: relative;
  max-height: 2rem;
  // TODO: adicinar uma cor no tema para o placeholder
  background-color: ${({ theme }) => theme.textColor};
`;

export const Input = styled.input`
  color: ${({ theme }) => theme.palette.primary.main};
  padding: 0 0.25rem;
  margin: 0 0.25rem;
  background-color: transparent;
  border: none;
  width: 100%;
  height: 100%;
  font-size: 1rem;
`;

export const Icon = styled.div`
  font-size: 1rem;
  padding: 0 0.5rem 0 0.25rem;
  margin: 0 0.25rem;
  height: 100%;
  color: red;
`;

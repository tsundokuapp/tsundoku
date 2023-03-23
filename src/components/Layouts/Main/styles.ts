import styled from 'styled-components';

export const Container = styled.main`
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 2rem;
  height: calc(100vh - 5rem);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  // TODO: remover isso depois
  background-color: ${({ theme }) => theme.sucesso};
`;

export const BoxContent = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Titulo = styled.h1`  
      color: ${({ theme }) => theme.colors.primaria[500]};
`;
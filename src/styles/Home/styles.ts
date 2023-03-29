import styled from "styled-components";

export const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem 0;
`;

export const BoxAviso = styled.div`
  width: 100%;
  max-width: 55rem;
  background: ${({ theme }) => theme.palette.secondary.main};
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  cursor: default;

  h2 {
    margin-bottom: 0.25rem;
  }
`
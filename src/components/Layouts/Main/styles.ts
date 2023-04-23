import styled from "styled-components";

export const Container = styled.main`
  max-width: 1120px;
  margin: 0 auto;
  padding: 5rem 2rem 0 2rem;
  height: calc(100% - 5rem);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const BoxContent = styled.div`
  display: flex;
  align-content: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: 1.5rem;
  gap: 1.5rem;
`;

export const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;

  gap: 0.5rem;
  padding: 1.5rem;

  // TODO: Adicionar essa cor no tema
  background-color: #3c4148;
`;

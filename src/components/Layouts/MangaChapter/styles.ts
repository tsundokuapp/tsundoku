import styled from "styled-components";

export const Container = styled.main`
  max-width: 1920px;
  margin: 0 auto;
  padding: 3.5rem 0 0 0;
  height: calc(100% - 5rem);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  max-width: 1120px;
  display: flex;
  align-content: center;
  justify-content: flex-start;
  flex-direction: column;

  width: 100%;
  flex-grow: 1;

  padding-bottom: 1rem;
  margin-bottom: 2rem;
  gap: 1rem;
`;

export const Navigation = styled.nav`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem 2.5rem;
  margin: 1rem 0 0 0;

  width: 100%;

  p {
    font-size: ${({ theme }) => theme.texto.paragrafo};
    cursor: pointer;
  }

  div {
    display: flex;
    flex-direction: row;
    gap: 3rem;
    margin: 0.5rem auto;
  }
`;

export const Cover = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 400px;
  overflow: hidden;

  img {
    width: 100%;
  }
`;

export const Chapter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    display: block;
    margin: 1rem auto;
  }
`;

import styled from "styled-components";

export const Container = styled.main`
  max-width: 1920px;
  min-height: 100%;
  margin: 0 auto;
  padding: 3.5rem 0 0 0;
  height: calc(100% - 5rem);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Capa = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 450px;

  img {
    width: 100%;
    border-radius: ${({ theme }) => theme.quina.media};
  }
`;

export const Conteudo = styled.div`
  display: flex;
  align-content: center;
  justify-content: flex-start;
  flex-direction: column;

  max-width: 1120px;
  width: 100%;
  height: 100%;

  padding-bottom: 2rem;
  gap: 1rem;
`;

export const Navegacao = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  padding: 0.5rem 2.5rem;
  margin: 1rem 0 0 0;
  gap: 1rem;

  h3 {
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.texto.subtitulo};
  }
`;

export const Filtros = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3rem;
  margin: 0.5rem auto;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin: 0 2.5rem;
`;

export const Titulo = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.texto.titulo};
  font-weight: bold;
  margin-left: 1rem;
`;

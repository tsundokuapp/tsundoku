import styled from "styled-components";

export const ContainerIndiceObra = styled.main`
  //max-width: 1120px;
  max-width: 1920px;
  margin: 0 auto;
  padding: 3.5rem 0 0 0;
  height: calc(100% - 5rem);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Conteudo = styled.div`
  display: flex;
  align-content: center;
  justify-content: flex-start;
  flex-direction: column;

  width: 100%;
  height: 100%;

  margin-top: 1.5rem;
  padding-bottom: 1rem;
  margin-bottom: 5rem;
  gap: 1rem;

  background: ${({ theme }) => theme.colors.primaria[500]};
`;

export const Navegacao = styled.nav`
  display: flex;
  align-items: center;
  padding: 0.5rem 2.5rem;
  margin: 1rem 0 0 0;

  p {
    font-size: ${({ theme }) => theme.texto.nota};
    cursor: pointer;
  }
`;

export const Obra = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  position: relative;

  gap: 1.5rem;
  margin: 0 2.5rem;

  height: 100%;
  max-height: 380px;
`;
export const Capa = styled.div`
  display: flex;
  width: 300px;
  height: 450px;

  img {
    width: 100%;
    border-radius: ${({ theme }) => theme.quina.media};
  }
`;

export const Info = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  height: 100%;
  max-height: 360px;

  overflow: hidden;

  gap: 1rem;
  padding-bottom: 0.5rem;
`;

export const Sinopse = styled.div`
  overflow: scroll;
  text-indent: 2em;
  margin-top: 1.5rem;
`;

export const Titulo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  margin-bottom: 1rem;
  h1 {
    font-size: ${({ theme }) => theme.texto.titulo};
  }
  p {
    font-size: ${({ theme }) => theme.texto.subtitulo};
  }
`;

export const Generos = styled.div`
  font-size: ${({ theme }) => theme.texto.paragrafo};
  display: inline-flex;
  p {
    transition: ease-in-out 0.2s;
    :hover {
      cursor: pointer;
      color: ${({ theme }) => theme.colors.primaria[700]};
    }
  }
`;

export const BoxContentFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;

  width: 100%;
  margin: 1rem 0;
  padding: 0 2.5rem;
`;

export const DetalhesObra = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  width: 300px;
  height: 100%;

  h2 {
    font-size: ${({ theme }) => theme.texto.subtitulo};
    margin-bottom: 1rem;
  }

  span {
    font-size: ${({ theme }) => theme.texto.paragrafo};
    margin-bottom: 0.5rem;
    display: inline-flex;

    p {
      font-weight: bold;
    }

    p:last-child {
      margin-left: 0.25rem;
      font-weight: normal;
      color: ${({ theme }) => theme.colors.textSec};
    }
  }
`;

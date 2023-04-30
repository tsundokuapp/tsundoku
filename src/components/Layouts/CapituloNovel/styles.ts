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

export const Conteudo = styled.div`
  max-width: 1120px;
  display: flex;
  align-content: center;
  justify-content: flex-start;
  flex-direction: column;

  width: 100%;
  height: 100%;

  padding-bottom: 1rem;
  margin-bottom: 2rem;
  gap: 1rem;
`;

export const Navegacao = styled.nav`
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

export const Capa = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 400px;
  overflow: hidden;

  img {
    width: 100%;
  }
`;

export const Staff = styled.div`
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

export const Creditos = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;

  width: 100%;
  max-width: 1120px;
`;

export const Apoiadores = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  gap: 1rem;

  h3 {
    text-align: right;
  }

  span {
    display: inline-flex;
    text-align: right;
    color: ${({ theme }) => theme.colors.textSec};
  }
  a {
    display: block;
    color: ${({ theme }) => theme.colors.primaria[500]};

    :hover {
      text-decoration: underline;
      opacity: 0.8;
    }
  }
`;

interface ICapitulosProps {
  fontSize: number;
  lineHeight: number;
}

export const Capitulo = styled.div<ICapitulosProps>`
  text-align: justify;
  text-indent: 2em;

  img {
    display: block;
    margin: 1rem auto;
  }

  h1 {
    font-size: ${({ theme }) => theme.texto.titulo};
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 3rem;
    text-align: center;
  }

  p {
    font-size: ${(props) => props.fontSize}px;
    color: ${({ theme }) => theme.colors.textSec};
    line-height: ${(props) => props.lineHeight};
  }

  p + p {
    margin-bottom: 1rem;
  }
`;

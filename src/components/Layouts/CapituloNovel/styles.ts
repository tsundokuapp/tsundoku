import styled from "styled-components";

export const Container = styled.main`
  max-width: 1920px;
  margin: 0 auto;
  padding: 3.5rem 1rem 1rem 1rem;
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
  height: 100%;

  padding-bottom: 1rem;
  margin-bottom: 2rem;
  gap: 1rem;
`;

export const SectionNavigation = styled.nav`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem;
  margin: 1rem 0 0 0;

  width: 100%;

  @media (max-width: 650px) {
    font-size: ${({ theme }) => theme.texto.nota};
  }

  p {
    font-size: ${({ theme }) => theme.texto.paragrafo};
    cursor: pointer;
  }
`;

export const Cover = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  max-height: 400px;
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

  width: 100%;
  min-width: 300px;
  height: 100%;

  @media (max-width: 650px) {
    align-items: center;
  }

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

  @media (max-width: 650px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

export const Apoiadores = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  gap: 1rem;

  text-align: right;

  @media (max-width: 650px) {
    text-align: center;
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

export const SectionButtonNavigation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin: 0.5rem auto;
`;

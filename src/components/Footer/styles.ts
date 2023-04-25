import styled from "styled-components";

export const Container = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100%;

  gap: 0.5rem;
  padding: 1.5rem;
  margin-top: auto;

  background-color: ${({ theme }) => theme.colors.bgComponente};

  strong {
    font-size: ${({ theme }) => theme.texto.subtitulo};
  }

  p:last-child {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.textSec};
  }
`;

export const SocialMidia = styled.div`
  display: flex;
  align-items: center;
  margin: 0.25rem auto;

  svg {
    width: 30px;
    height: 30px;
    margin: 0.25rem;

    :hover {
      color: ${({ theme }) => theme.colors.primaria[500]};
    }
  }
`;

import styled from "styled-components";

const tamanhoCard = `18rem`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  background-color: ${({ theme }) => theme.colors.primaria[500]};
  border-radius: 1rem;
  margin: 0.5rem;

  height: 100%;
  aspect-ratio: 1/1;
  max-width: ${tamanhoCard};

  @media (max-width: 600px) {
    width: 200px;
  }

  @media (max-width: 450px) {
    width: 150px;
  }

  cursor: pointer;
  transition: transform 0.3s;

  img {
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    object-fit: cover;
  }

  :hover {
    transform: scale(1.05);
  }
`;

export const Shadow = styled.div`
  position: absolute;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  padding-bottom: 0.5rem;

  width: 100%;
  height: 100%;
  background: linear-gradient(0deg, rgba(0, 0, 0, 1), rgba(255, 255, 255, 0));
  border-radius: 1rem;
`;

export const Title = styled.strong`
  color: ${({ theme }) => theme.colors.especial.branco};
  display: inline;
  font-size: ${({ theme }) => theme.texto.paragrafo};

  white-space: wrapping;
  width: 100%;
  padding: 0.25rem;

  @media (max-width: 450px) {
    font-size: ${({ theme }) => theme.texto.nota};
  }
`;

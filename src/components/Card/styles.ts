import styled from "styled-components";

const tamanhoCard = `14rem`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.bgComponente};
  border-radius: 1rem;

  max-width: ${tamanhoCard};

  @media (max-width: 440px) {
    max-width: 11rem;
  }

  padding: 0;
  margin: 0.5rem;

  cursor: pointer;
  transition: transform 0.3s;

  img {
    margin-top: 1rem;
    border-radius: 0.5rem 0.5rem 0 0;
    max-width: 180px;
    width: 90%;
    aspect-ratio: 2/3;
  }

  :hover {
    transform: scale(1.05);
  }
`;

export const ContainerInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const HeaderCardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  min-height: 2rem;
  padding: 0 0.5rem;
  background-color: ${({ theme }) => theme.colors.primaria[500]};

  width: 100%;

  svg {
    height: 1.2rem;
    width: 1.2rem;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.especial.branco};
  }

  button {
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
    height: 1.2rem;
  }
`;

export const TituloCard = styled.strong`
  color: ${({ theme }) => theme.colors.especial.branco};
  display: inline;
  font-size: 1rem;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  max-width: calc(${tamanhoCard} - 2rem);

  @media (max-width: 380px) {
    font-size: 0.9rem;
  }
`;

export const BodyCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 0.5rem 1rem;

  white-space: wrap;
  text-overflow: ellipsis;
  overflow: hidden;

  :last-child {
    align-items: center;
  }

  span {
    font-size: 1rem;
    margin-bottom: 0.3rem;
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: calc(${tamanhoCard} - 2rem);

    @media (max-width: 440px) {
      font-size: 0.8rem;
      width: 9rem;
    }

    p {
      display: inline;
      font-weight: bold;
    }

    p:last-child {
      font-weight: normal;
      color: #259cc1;
    }
  }
`;

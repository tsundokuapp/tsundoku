import styled from 'styled-components';

const tamanhoCard = `14.3rem`;

export const ContainerCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.backgroundSec};
  border-radius: 1rem;

  width: ${tamanhoCard};
  height: 100%;
  min-height: 25rem;

  padding: 0;
  margin: 0.5rem;

  cursor: pointer;
  transition: transform 0.3s;

  img {
    margin-top: 1rem;
    border-radius: 0.5rem 0.5rem 0 0;
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
  flex-direction: row;
  width: 100%;
  height: 100%;
  min-height: 2rem;
  padding: 0 0.5rem;
  background-color: ${({ theme }) => theme.palette.secondary.main};

  svg {
    height: 1.2rem;
    width: 1.2rem;
    cursor: pointer;
    color: ${({ theme }) => theme.palette.common.white};
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
  color: ${({ theme }) => theme.palette.common.white};
  display: inline;
  font-size: 1rem;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  max-width: calc(${tamanhoCard} - 2rem);
`;

export const BodyCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 0.5rem 1rem;

  span {
    font-size: 1rem;
    margin-bottom: 0.3rem;
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: calc(${tamanhoCard} - 2rem);

    p {
      display: inline;
    }

    p:first-child {
      font-weight: bold;
    }
  }
`;
export const ButtonCard = styled.button`
  align-self: center;
  margin: 1rem 1rem 0 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  background-color: ${({ theme }) => theme.palette.secondary.main};
  color: ${({ theme }) => theme.palette.common.white};
`;

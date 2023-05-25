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

export const Cover = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  height: 100%;
  max-height: 450px;

  img {
    width: 100%;
    border-radius: ${({ theme }) => theme.quina.media};
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  max-width: 1120px;
  width: 100%;
  height: 100%;

  padding-bottom: 2rem;
  gap: 1rem;
`;

export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  padding: 0.5rem 2.5rem;
  margin: 1rem 0 0 0;
  gap: 1rem;

  h3 {
    text-align: center;
    color: ${({ theme }) => theme.colors.text};
    font-size: ${({ theme }) => theme.texto.subtitulo};
  }
`;

export const Filters = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  margin: 0.5rem auto;
  flex-wrap: wrap-reverse;
`;

interface IGridProps {
  columns: number;
}

export const Grid = styled.div<IGridProps>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  gap: 1.5rem 1rem;
  padding: 1rem 0;

  @media screen and (max-width: 1050px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and (max-width: 370px) {
    grid-template-columns: repeat(
      ${(props) => props.columns - 2},
      minmax(0, 1fr)
    );
  }
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.texto.titulo};
  font-weight: bold;
  margin-left: 8%;
  align-self: flex-start;
`;

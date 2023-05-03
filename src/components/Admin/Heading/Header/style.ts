import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 9.4rem;
  display: flex;
  flex-direction: column;
`;

export const BoxHead = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding: 0 2.5rem 0 2.5rem;

  .navigation {
    display: flex;
    align-items: center;
    font-weight: bold;

    a {
      font-size: ${({ theme }) => theme.texto.nota};
      margin-top: 2px;

      :hover {
        cursor: pointer;
        color: ${({ theme }) => theme.colors.primaria[700]};
      }
    }

    p {
      margin-top: 1px;
    }
  }
`;

export const BoxTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 0.5rem;
  padding: 0 2.5rem 0 2.5rem;

  font-size: ${({ theme }) => theme.texto.subtitulo};
  font-weight: bold;
`;

export const BoxActions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  padding: 0 2.5rem 0 2.5rem;
`;

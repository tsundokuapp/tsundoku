import styled from "styled-components";

const Container = styled.div`
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.bgComponente};
  //padding: 25px;
  padding: 10px 0 0 0;
  height: 90vh;

  overflow-y: scroll;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primaria[500]};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.primaria[500]};
  }
`;

export default Container;

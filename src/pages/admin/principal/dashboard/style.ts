import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Titulo = styled.h1`  
      color: ${(props) => props.theme.colors.secundaria};
`;



export default Container;
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  a{
      text-decoration: none;
      color: ${(props) => props.theme.colors.branca};
  }

`;

export const SecaoTitulo = styled.div`
    width: 100%;
    height: 50px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const SecaoIndiceCapitulos = styled.div`
    width: 100%;
    margin-bottom: 10px;
    padding: 10px 0 10px 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;    

    >h2{
        margin-bottom: 10px;
    }
`;

export const SecaoConteudoCapitulos = styled.div`
    width: 90%;
    margin: 10px 0 10px 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;   
`;

export default Container;

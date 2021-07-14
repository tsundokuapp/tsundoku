import styled from "styled-components";

const Container = styled.div`
    grid-area: MH;
    background: ${(props) => props.theme.colors.primaria}; 
    color: ${(props) => props.theme.colors.branca}; 
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;

    
`;

export const ContainerNav = styled.nav`
    width: 130px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const BotaoMenu = styled.div`
    cursor: pointer;
    border: none;
    width: 35px;
    height: 30px;
    background-color: ${(props) => props.theme.colors.secundaria};
    border-radius: 3px;
    color: ${(props) => props.theme.colors.branca};
    font-size: 1em;
    display: flex;
    align-items: center;
    padding-left: 5px;

`;

export const BotaoSair = styled.div`
    cursor: pointer;
    border: none;
    width: 70px;
    height: 30px;
    background-color: ${(props) => props.theme.colors.secundaria};
    border-radius: 3px;
    color: ${(props) => props.theme.colors.branca};
    font-size: 1em;
    display: flex;
    align-items: center;
    padding-left: 5px;
    

    > a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.branca};
    padding-left: 3px;
    
  }

`;


export default Container;
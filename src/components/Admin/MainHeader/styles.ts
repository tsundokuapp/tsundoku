import styled from "styled-components";

const Container = styled.div`
    background: ${(props) => props.theme.colors.primaria}; 
    color: ${(props) => props.theme.colors.branca}; 
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    border-bottom: solid 1px ${(props) => props.theme.colors.secundaria};
    height: 10vh;

    @media (max-width: 474px) {
        height: 15vh;   
    }
`;

export const ContainerNav = styled.nav`
    width: auto;
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
    margin-right: 10px;

    :hover{
        opacity: 0.8;
    }
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

    :hover{
        opacity: 0.8;
    }

`;


export default Container;
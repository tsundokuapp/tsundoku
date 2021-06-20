import styled from "styled-components";

export const Container = styled.nav`
    position: absolute;
    width: 100%;
    height: 60px;
    left: 0px;
    top: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${(props) => props.theme.colors.primaria};       
    border: ${(props) => props.theme.colors.borda};  
    box-shadow: ${(props) => props.theme.colors.sombra};
    padding: 0px 30px 0 30px;

    > h2{
        color: ${(props) => props.theme.colors.branca};            
    }
`;



export const EstiloSelect = styled.select`
    
    > EstiloSelect::before{
        content: none;
    }
    
    > EstiloSelect::after{
        content: none;
    }
`;

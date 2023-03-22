import styled from "styled-components";

const Container = styled.div`
    grid-area: AS;    
    background: ${(props) => props.theme.colors.primaria}; 
    padding-left: 20px; 
    color: ${(props) => props.theme.colors.branca};   
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 25px;
    border-right: solid 1px ${(props) => props.theme.colors.secundaria};
`;

export default Container;



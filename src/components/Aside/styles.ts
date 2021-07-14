import styled from "styled-components";

const Container = styled.div`
    grid-area: AS;    
    background: ${(props) => props.theme.colors.primaria}; 
    padding-left: 20px; 
    color: ${(props) => props.theme.colors.branca};   
    display: flex;
    padding: 25px;
`;

export default Container;



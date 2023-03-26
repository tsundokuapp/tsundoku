import styled from "styled-components";

const Container = styled.div`    
    background: ${(props) => props.theme.colors.primaria}; 
    padding-left: 20px; 
    color: ${(props) => props.theme.colors.branca};   
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 25px;
    border-right: solid 1px ${(props) => props.theme.colors.secundaria};
    height: 100vh;

    &.hide{
        display: none;
    }

    @media (max-width: 474px) {

        padding: 25px 5px 0 5px;

        &.hide{
            display: block;
        }
    }
`;

export default Container;



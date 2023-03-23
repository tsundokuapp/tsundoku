import styled from "styled-components";

const Container = styled.div`
    color: ${(props) => props.theme.colors.branca};
    background-color: ${props => props.theme.colors.terciaria};
    //padding: 25px;
    padding: 10px 0 0 0;
    height: 90vh;
    
    overflow-y: scroll;

    ::-webkit-scrollbar{
        width: 10px;
    }

    ::-webkit-scrollbar-thumb{
        background-color: ${props => props.theme.colors.secundaria};
        border-radius: 10px;        
    }

    ::-webkit-scrollbar-track{
        background-color: ${props => props.theme.colors.terciaria};
    }
`;

export default Container;
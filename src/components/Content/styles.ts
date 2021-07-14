import styled from "styled-components";

const Container = styled.div`
    grid-area: CT;
    color: #e8e8e4;
    background-color: ${props => props.theme.colors.terciaria};
    padding: 25px;
    height: calc(100vh - 75px);
`;

export default Container;
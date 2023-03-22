import styled from "styled-components";

const Container = styled.label`   
    cursor: pointer;
    width: 300px;
    margin-left: 5px;
    padding: 5px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.colors.secundaria};
    color: ${(props) => props.theme.colors.branca};
    font-weight: bold;
    text-align: center;
    display: flex;
    justify-content: space-around;
    opacity: 0.7;

    > input {
        display: none;
    }

    :hover {
      opacity: 1;
    }
`;

export default Container;
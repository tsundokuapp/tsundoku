import styled from "styled-components";

const Container = styled.label`
  cursor: pointer;
  width: 300px;
  margin-left: 5px;
  padding: 5px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.especial.bgBusca};
  color: ${(props) => props.theme.colors.especial.textBusca};
  font-weight: bold;
  text-align: center;
  display: flex;
  justify-content: space-around;
  margin: 10px 0 10px 0;

  > input {
    display: none;
  }

  :hover {
    opacity: 0.7;
  }
`;

export default Container;

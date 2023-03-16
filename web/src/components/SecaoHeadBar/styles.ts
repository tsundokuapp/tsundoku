import styled from "styled-components";

const Container = styled.section`
  margin: 10px 0 5px 15px;
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  @media (max-width: 474px) {
    margin: 10px 0 5px 10px;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    > div {
      width: auto;
      margin-top: 7px;
      margin-bottom: 7px;
    }
  }

`;

export default Container;
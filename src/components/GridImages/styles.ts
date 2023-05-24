import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  //left: 50%;
  //transform: translateX(-50%);

  display: grid;
  grid-template-columns: repeat(auto-fill, 230px);
  grid-auto-rows: 10px;
  justify-content: center;
`;

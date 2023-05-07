import styled from "styled-components";
export const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;

  gap: 1rem 0;
  margin: 1rem;
  margin-top: 0;

  strong {
    font-size: 1.25rem;
    align-self: start;
  }

  span {
    font-size: 0.85rem;
    font-weight: normal;
  }

  p {
    font-size: 0.85rem;
    display: inline-block;
  }
`;
